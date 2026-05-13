// components/layout/main-layout.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, fetchCurrentUser } = useAuthStore();
  const router = useRouter();

  // Daftar halaman yang boleh diakses tanpa login.
  const PUBLIC_ROUTES = ["/new-report"];

  useEffect(() => {
    // Hanya fetch /me jika user belum ada di Zustand.
    // Kasus ini terjadi saat user me-refresh halaman (Zustand in-memory direset).
    // Catatan: middleware.ts sudah menjamin token ada sebelum halaman ini dirender,
    // sehingga fetchCurrentUser() di sini hanya untuk mengisi ulang state Zustand, bukan sebagai mekanisme auth guard utama.
    if (!user) {
      fetchCurrentUser().then((fetchedUser) => {
        if (!fetchedUser) {
          // Jika halaman saat ini adalah public route, tidak perlu redirect ke /signin.
          // Halaman seperti /new-report boleh diakses oleh tamu (guest).
          const isPublicRoute = PUBLIC_ROUTES.some((r) => window.location.pathname.startsWith(r));
          if (isPublicRoute) return;

          // Token ada di cookie tapi /me gagal (misal token expire di sisi backend).
          // Middleware tidak bisa mendeteksi ini karena hanya mengecek keberadaan cookie.
          router.replace("/signin");
          return;
        }

        // Role guard: user biasa tidak boleh akses halaman admin
        if (fetchedUser.role !== "admin" && window.location.pathname.startsWith("/dashboard")) {
          router.replace("/new-report");
        }
      });
    }
  }, [user, fetchCurrentUser, router]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center w-full flex-1 px-8 md:px-12 lg:px-0 pt-5 md:pt-10">{children}</main>
    </div>
  );
}
