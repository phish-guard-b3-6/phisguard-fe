// components/layout/main-layout.tsx
"use client";

import React from "react";
// TODO (PRODUCTION): import { useEffect } from "react";
// TODO (PRODUCTION): import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore();
  // TODO (PRODUCTION): const { user, fetchCurrentUser } = useAuthStore();
  // TODO (PRODUCTION): const router = useRouter();

  // ======================= PRODUCTION: Aktifkan kembali saat API sudah siap =======================
  // useEffect(() => {
  //   // Hanya fetch /me jika user belum ada di Zustand.
  //   // Kasus ini terjadi saat user me-refresh halaman (Zustand direset).
  //   if (!user) {
  //     fetchCurrentUser().then((fetchedUser) => {
  //       if (!fetchedUser) {
  //         // Jika fetch /me gagal (sesi habis), arahkan ke halaman login
  //         router.replace("/signin");
  //         return;
  //       }
  //
  //       // Guard: pastikan role yang mengakses sesuai
  //       // Misal user biasa coba akses /dashboard (admin page)
  //       if (fetchedUser.role !== "admin") {
  //         router.replace("/new-report");
  //       } else if (fetchedUser.role === "admin") {
  //         router.replace("/dashboard");
  //       }
  //     });
  //   }
  // }, []);
  // =================================================================================================

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center w-full flex-1 px-8 md:px-12 lg:px-0 pt-5 md:pt-10">{children}</main>
    </div>
  );
}

