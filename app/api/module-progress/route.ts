import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const backendRes = await fetch(`${process.env.API_URL}/module-progress`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const text = await backendRes.text();
    const data = text ? JSON.parse(text) : {};

    if (!backendRes.ok) {
      return NextResponse.json({ message: data?.message ?? "Gagal mengambil module progress." }, { status: backendRes.status });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const backendRes = await fetch(`${process.env.API_URL}/module-progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();
    let data = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch (e) {
      console.error("Failed to parse backend response as JSON:", text);
    }

    if (!backendRes.ok) {
      console.error("Backend POST /module-progress error:", backendRes.status, text);
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal menyimpan module progress.", error_detail: text },
        { status: backendRes.status },
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Proxy POST /module-progress exception:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
