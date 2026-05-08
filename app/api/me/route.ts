import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // 1. Ambil token dari cookie httpOnly
  const token = req.cookies.get("auth_token")?.value;

  // [DEBUG]: Print token untuk testing di Postman
  console.log("==================== DEBUG JWT TOKEN ====================");
  console.log(token);
  console.log("=========================================================");

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // 2. Teruskan request ke backend external beserta token di header
    const backendRes = await fetch(`${process.env.API_URL}/users/me`, {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await backendRes.json();

    if (!backendRes.ok) {
      return NextResponse.json({ message: data?.message ?? "Gagal mengambil data user." }, { status: backendRes.status });
    }

    // 3. Kembalikan response penuh dari backend ke frontend React
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
