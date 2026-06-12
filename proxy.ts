import { NextRequest, NextResponse } from "next/server";

// ─── Route categories ────────────────────────────────────────────────────────
/** Route auth — redirect ke halaman utama jika sudah login */
const AUTH_ROUTES = ["/signin", "/signup", "/otp", "/reset-password", "/forgot-password"];

/** Route publik — bisa diakses siapa saja termasuk guest */
const PUBLIC_ROUTES = ["/new-report"];

/** Route hanya untuk admin */
const ADMIN_ONLY_ROUTES = ["/dashboard", "/blacklist", "/ticket-list"];

/** Route hanya untuk user biasa (bukan admin) */
const USER_ONLY_ROUTES = ["/new-report", "/microlearning", "/report-status"];

/** Route yang butuh login, bisa diakses admin maupun user */
const SHARED_PROTECTED_ROUTES = ["/profile"];

// ─── Helper: decode JWT payload tanpa verifikasi signature ───────────────────
// Proxy berjalan di edge/server sebelum render, tidak bisa memanggil backend.
// Kita hanya butuh claim `role` untuk routing — verifikasi signature tetap
// dilakukan backend saat request API sesungguhnya dijalankan.
function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const json = atob(base64);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Baca cookie auth_token yang diset oleh /api/login
  const token = request.cookies.get("auth_token")?.value;
  const payload = token ? decodeJwtPayload(token) : null;

  // Token dianggap valid jika payload ada dan belum expired
  const now = Math.floor(Date.now() / 1000);
  const isAuthenticated = !!payload && (typeof payload.exp !== "number" || payload.exp > now);
  const role = isAuthenticated ? (payload?.role as string | undefined) : undefined;

  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminRoute = ADMIN_ONLY_ROUTES.some((r) => pathname.startsWith(r));
  const isUserRoute = USER_ONLY_ROUTES.some((r) => pathname.startsWith(r));

  // 1. User sudah login → jangan biarkan akses halaman auth (signin/signup dll)
  //    Admin → /dashboard, User biasa → /new-report
  if (isAuthenticated && isAuthRoute) {
    const destination = role === "admin" ? "/dashboard" : "/new-report";
    return NextResponse.redirect(new URL(destination, request.url));
  }

  // 2. Route admin — belum login → ke signin
  if (isAdminRoute && !isAuthenticated) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  // 3. Route admin — sudah login tapi bukan admin → ke /new-report
  if (isAdminRoute && role !== "admin") {
    return NextResponse.redirect(new URL("/new-report", request.url));
  }

  // 4. Route user-only — diakses oleh admin → ke /dashboard
  if (isUserRoute && role === "admin") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // 5. Halaman yang butuh login (bukan public) — belum login → ke signin
  if (!isPublicRoute && !isAdminRoute && !isAuthRoute && !isAuthenticated) {
    const signinUrl = new URL("/signin", request.url);
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Jalankan proxy di semua halaman KECUALI:
     * - /api/*         (route handler Next.js)
     * - /_next/static  (file statis)
     * - /_next/image   (optimasi gambar)
     * - file publik    (svg, png, ico, dll)
     */
    "/((?!api|_next/static|_next/image|favicon\\.ico|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
