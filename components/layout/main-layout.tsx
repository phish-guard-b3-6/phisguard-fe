// components/layout/main-layout.tsx
"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/navbar";
import { useAuthStore } from "@/stores/useAuthStore";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, fetchCurrentUser } = useAuthStore();

  useEffect(() => {
    // Hanya fetch /me jika user belum ada di Zustand.
    // Ini terjadi saat user me-refresh halaman (Zustand in-memory direset).
    // Role guard & redirect sudah ditangani di proxy.ts (server-side)
    // sebelum halaman ini dirender — tidak perlu duplikasi di sini.
    if (!user) {
      fetchCurrentUser();
    }
  }, [user, fetchCurrentUser]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex justify-center w-full flex-1 px-8 md:px-12 lg:px-0 pt-5 md:pt-10">{children}</main>
    </div>
  );
}
