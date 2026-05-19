import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const { searchParams } = new URL(req.url);
  const queryString = searchParams.toString();
  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/blacklists${queryString ? "?" + queryString : ""}`;

  try {
    const backendRes = await fetch(url, {
      method: "GET",
      headers,
    });

    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: data?.message ?? "Gagal mengambil daftar blacklist." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/blacklists`;

  try {
    const backendRes = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Gagal parse JSON dari backend (POST):", text);
      }
    }

    if (!backendRes.ok) {
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal menambah data blacklist." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error in POST /api/blacklists:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
