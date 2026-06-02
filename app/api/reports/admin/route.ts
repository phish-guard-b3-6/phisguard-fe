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

    // ── Verifikasi reCAPTCHA v3 (hanya untuk user yang belum login) ──────────
    // User yang sudah login dianggap sudah terverifikasi melalui proses autentikasi,
    // sehingga tidak perlu dikenakan CAPTCHA lagi untuk mengurangi friction.
    const isAuthenticated = !!token;

    if (!isAuthenticated) {
      const captchaToken = formData.get("captcha_token") as string | null;

      if (!captchaToken) {
        return NextResponse.json({ message: "Token CAPTCHA tidak ditemukan." }, { status: 400 });
      }

      const secretKey = process.env.RECAPTCHA_SECRET_KEY;
      const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secretKey}&response=${captchaToken}`,
      });

      const recaptchaData = await verifyRes.json();

      // Tolak jika gagal verifikasi atau skor bot terlalu tinggi (< 0.5 = kemungkinan bot)
      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.warn("reCAPTCHA gagal:", recaptchaData);
        return NextResponse.json(
          { message: "Permintaan ditolak karena terdeteksi sebagai bot." },
          { status: 403 }
        );
      }
    }

    // Hapus captcha_token sebelum diteruskan ke backend eksternal (aman meskipun tidak ada)
    formData.delete("captcha_token");
    // ─────────────────────────────────────────────────────────────────────────

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
