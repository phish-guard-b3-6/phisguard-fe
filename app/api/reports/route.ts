import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Baca token dari httpOnly cookie (hanya bisa di server).
  // Jika user sedang login, token akan ada → sertakan ke header Authorization.
  // Jika user adalah tamu (guest), token tidak ada → kirim tanpa Authorization.
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const backendRes = await fetch(`${process.env.API_URL}/reports`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    // Baca response sebagai text terlebih dahulu untuk menghindari error saat backend mengembalikan 201 Created tanpa response body.
    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    if (!backendRes.ok) {
      return NextResponse.json({ message: data?.message ?? "Gagal mengirim laporan." }, { status: backendRes.status });
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
