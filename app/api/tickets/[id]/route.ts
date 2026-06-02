import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const url = `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/tickets/${id}`;

  try {
    const backendRes = await fetch(url, {
      method: "PATCH",
      headers,
      body: JSON.stringify(body),
    });

    const text = await backendRes.text();
    let data = {};
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (e) {
        console.error("Gagal parse JSON dari backend (PATCH tickets):", text);
      }
    }

    if (!backendRes.ok) {
      console.error(`[PATCH /api/tickets/${id}] Backend error ${backendRes.status}:`, JSON.stringify(data));
      return NextResponse.json(
        { message: (data as any)?.message ?? "Gagal mengupdate status tiket.", detail: data },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(`Error in PATCH /api/tickets/[id]:`, error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
