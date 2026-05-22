import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = req.cookies.get("auth_token")?.value;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await req.json();

    const backendRes = await fetch(`${process.env.API_URL}/module-progress/${id}`, {
      method: "PATCH",
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
    } catch {
      console.error("Failed to parse backend response as JSON:", text);
    }

    if (!backendRes.ok) {
      console.error("Backend PATCH /module-progress error:", backendRes.status, text);
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal mengupdate module progress." },
        { status: backendRes.status },
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Proxy PATCH /module-progress exception:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
