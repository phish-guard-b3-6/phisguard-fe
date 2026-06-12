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
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (parseError) {
      console.error("[PROXY /api/tickets] Failed to parse JSON:", text);
    }

    if (!backendRes.ok) {
      console.error(`[PROXY /api/tickets] Backend returned ${backendRes.status}:`, text);
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal mengambil detail tiket." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(`[PROXY /api/tickets] Internal Server Error:`, error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
