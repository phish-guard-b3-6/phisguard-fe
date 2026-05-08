// components/layout/main-layout.tsx
"use client";

import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, fetchCurrentUser } = useAuthStore();
  const router = useRouter();

  // ======================= PRODUCTION: Aktifkan kembali saat API sudah siap =======================
  useEffect(() => {
    // Hanya fetch /me jika user belum ada di Zustand.
    // Kasus ini terjadi saat user me-refresh halaman (Zustand direset).
    if (!user) {
      fetchCurrentUser().then((fetchedUser) => {
        // [TESTING]: Sementara matikan redirect agar bisa akses page (main)
        if (!fetchedUser) {
          // Jika fetch /me gagal (sesi habis), arahkan ke halaman login
          router.replace("/signin");
          return;
        }

        // [TESTING]: Sementara matikan guard role
        // Guard: pastikan role yang mengakses sesuai
        // Misal user biasa coba akses /dashboard (admin page)
        if (fetchedUser.role !== "admin" && window.location.pathname.startsWith("/dashboard")) {
          router.replace("/new-report");
        } else if (fetchedUser.role === "admin" && window.location.pathname.startsWith("/new-report")) {
          router.replace("/dashboard");
        }
      });
    }
  }, [user, fetchCurrentUser, router]);
  // =================================================================================================

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center w-full flex-1 px-8 md:px-12 lg:px-0 pt-5 md:pt-10">{children}</main>
    </div>
  );
}
