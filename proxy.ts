import { NextRequest, NextResponse } from "next/server";

/** Route publik yang hanya bisa diakses TANPA login. Jika sudah login, redirect ke halaman utama. */
const AUTH_ROUTES = ["/signin", "/signup", "/otp", "/reset-password"];

/** Route publik yang bisa diakses oleh siapa saja (login maupun tidak). */
const PUBLIC_ROUTES = ["/new-report"];

/** Route yang WAJIB login (user atau admin). */
const PROTECTED_ROUTES = ["/report-status", "/profile", "/microlearning"];

/** Route yang HANYA bisa diakses oleh admin. */
const ADMIN_ROUTES = ["/dashboard", "/blacklist", "/ticket-list"];

/** Route internal Next.js (API, _next, assets) yang tidak perlu dicek. */
const BYPASS_PREFIXES = ["/api", "/_next", "/favicon.ico", "/public"];

// ─────────────────────────────────────────────────────────────────────────────

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1. Lewati request untuk aset statis dan API internal
  if (BYPASS_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("auth_token")?.value;
  const isAuthRoute = AUTH_ROUTES.some((r) => pathname.startsWith(r));
  const isProtectedRoute = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAdminRoute = ADMIN_ROUTES.some((r) => pathname.startsWith(r));

  // 2. Jika user SUDAH LOGIN dan mencoba akses halaman auth (signin/signup)
  //    → redirect ke halaman utama agar tidak bisa balik ke login
  const isPublicRoute = PUBLIC_ROUTES.some((r) => pathname.startsWith(r));

  // 2. Jika user SUDAH LOGIN dan mencoba akses halaman auth (signin/signup)
  //    → redirect ke halaman utama
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/new-report", req.url));
  }

  // 3. Izinkan semua orang mengakses public routes tanpa perlu login
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // 4. Jika user BELUM LOGIN dan mencoba akses halaman protected atau admin
  //    → redirect ke signin. Cookie akan dihapus jika expired oleh browser otomatis.
  if (!token && (isProtectedRoute || isAdminRoute)) {
    const signinUrl = new URL("/signin", req.url);
    // Simpan halaman tujuan awal agar bisa diarahkan balik setelah login
    signinUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signinUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
