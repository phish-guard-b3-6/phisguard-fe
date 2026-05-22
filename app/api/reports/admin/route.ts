import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  // Forward headers — biarkan fetch set Content-Type sendiri saat pakai FormData
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    // Terima FormData dari client (mendukung upload file screenshot)
    const formData = await req.formData();

    const backendRes = await fetch(`${process.env.API_URL}/reports`, {
      method: "POST",
      headers,
      body: formData,
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

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/reports${queryString ? '?' + queryString : ''}`;

  try {
    const backendRes = await fetch(url, {
      method: "GET",
      headers,
    });

    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    if (!backendRes.ok) {
      return NextResponse.json({ message: data?.message ?? "Gagal mengambil daftar laporan." }, { status: backendRes.status });
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
