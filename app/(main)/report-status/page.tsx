"use client";

import React from "react";
import ListReportStatusSection from "@/components/report-status/list-report-status";
import { ReportListApiResponse, ReportListItem } from "@/lib/types/report";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/useAuthStore";
import { Loader2 } from "lucide-react";

export default function ListReportStatusPage() {
  const { user } = useAuthStore();

  // Fetch data menggunakan TanStack Query
  const {
    data: reports = [],
    isLoading,
    error,
  } = useQuery<ReportListItem[]>({
    queryKey: ["reports", user?.userID],
    queryFn: async () => {
      if (!user?.userID) return [];

      // Gunakan fetch ke Next.js BFF proxy /api/reports (bukan axiosInstance)
      // karena token JWT ada di httpOnly cookie — tidak bisa dibaca JS.
      // Proxy yang akan membaca cookie dan menyuntikkannya ke header Authorization.
      const res = await fetch("/api/reports");

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData?.message ?? "Gagal memuat laporan.");
      }

      const data: ReportListApiResponse = await res.json();
      // Backend mungkin mengembalikan null jika belum ada laporan,
      // bukan array kosong [] — tambahkan null guard agar tidak crash.
      return (data.reports ?? []).flatMap((group) => group.reports ?? []);
    },
    enabled: !!user?.userID,
  });

  // Tampilan Loading
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
      </div>
    );
  }

  // Tampilan Error
  if (error) {
    return (
      <div className="flex flex-col gap-2 w-full justify-center items-center min-h-[50vh] text-red-600">
        <p className="font-bold text-lg">Gagal memuat daftar laporan</p>
        <p className="text-sm opacity-80">{error instanceof Error ? error.message : "Terjadi kesalahan tidak dikenal."}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition-colors"
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return <ListReportStatusSection reports={reports} />;
}
