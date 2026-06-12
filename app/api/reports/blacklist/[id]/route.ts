import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const token = req.cookies.get("auth_token")?.value;
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const body = await req.json();

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || process.env.API_URL}/reports/blacklist/${id}`,
      {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      }
    );

    const text = await backendRes.text();
    let data: Record<string, any> = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      console.error(`[PROXY PATCH /api/reports/blacklist/${id}] Failed to parse JSON:`, text);
    }

    if (!backendRes.ok) {
      console.error(`[PROXY PATCH /api/reports/blacklist/${id}] Backend ${backendRes.status}:`, text);
      console.error(`[PROXY PATCH /api/reports/blacklist/${id}] Request body:`, JSON.stringify(body));
      return NextResponse.json(
        { message: data?.message ?? "Gagal mengirim data blacklist." },
        { status: backendRes.status }
      );
    }

    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error(`[PROXY PATCH /api/reports/blacklist/${id}] Exception:`, error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
