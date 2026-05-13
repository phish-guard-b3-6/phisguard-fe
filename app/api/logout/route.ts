import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  // Hapus cookie dengan atribut yang IDENTIK dengan saat cookie di-set di /api/login.
  // Jika atribut berbeda (path, sameSite), browser tidak akan mengenalinya sebagai
  // cookie yang sama dan tidak akan menghapusnya.
  response.cookies.set("auth_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });

  return response;
}
