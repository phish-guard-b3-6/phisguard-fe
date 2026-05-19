import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/tickets${queryString ? '?' + queryString : ''}`;

  try {
    const backendRes = await fetch(url, {
      method: "GET",
      headers,
    });

    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data?.message ?? "Gagal mengambil detail tiket." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
