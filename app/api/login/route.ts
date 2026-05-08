import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // 1. Forward request ke backend
  const backendRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json({ message: data?.message ?? "Login gagal." }, { status: backendRes.status });
  }

  // 2. Ambil token dari dalam data.users.token
  const { token, ...userWithoutToken } = data.users;

  // 3. Buat response untuk frontend (kirim data user, TANPA token)
  const res = NextResponse.json({
    message: "Login berhasil.",
    user: userWithoutToken,
  });

  // 4. Set token sebagai httpOnly cookie
  //    → tidak bisa diakses JS sama sekali (aman dari XSS)
  res.cookies.set("auth_token", token, {
    httpOnly: true, // tidak bisa dibaca JS
    secure: process.env.NODE_ENV === "production", // hanya HTTPS di production
    sameSite: "lax", // proteksi CSRF
    maxAge: 60 * 60 * 24 * 7, // 7 hari
    path: "/",
  });

  return res;
}
