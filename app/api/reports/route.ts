import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Ambil token dari httpOnly cookie (hanya bisa dilakukan di server)
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Teruskan request ke backend external dengan token di header Authorization
    // cache: "no-store" → wajib untuk data private per-user, cegah Next.js cache response
    const backendRes = await fetch(`${process.env.API_URL}/reports/reporter`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data?.message ?? "Gagal mengambil data laporan." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
