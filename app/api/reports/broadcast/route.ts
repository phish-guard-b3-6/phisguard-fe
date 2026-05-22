import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/reports/broadcast`;

  try {
    const backendRes = await fetch(url, {
      method: "GET",
      headers,
    });

    const text = await backendRes.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Gagal parse JSON dari backend (GET /reports/broadcast):", text);
      }
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal mengambil daftar broadcast." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error in GET /api/reports/broadcast:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
