"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import CreateNewReport from "@/components/new-report/create-new-report";
import SubmitReport from "@/components/new-report/submit-report";
import { useAuthStore } from "@/stores/useAuthStore";
import { ReportUser } from "@/lib/types/report";

export default function ReportFlow() {
  const [submittedReport, setSubmittedReport] = useState<ReportUser | null>(null);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!submittedReport) return;

    window.scrollTo({ top: 0, behavior: "smooth" });

    // Jika user sudah login → redirect langsung ke halaman detail laporan
    // Jika tamu (guest) → tampilkan halaman SubmitReport (konfirmasi sederhana)
    if (isAuthenticated) {
      router.push(`/report-status/${submittedReport.id}`);
    }
  }, [submittedReport, isAuthenticated, router]);

  return (
    <div className="w-full md:w-auto">
      {/* Title and Description hanya muncul jika form belum disubmit atau jika guest */}
      {(!submittedReport || !isAuthenticated) && (
        <div className="hidden md:flex flex-col items-center gap-2 w-full">
          <div className="flex items-center gap-5">
            <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={40} height={40} className="md:w-10 md:h-10 lg:w-16 lg:h-16" />
            <h1 className="text-2xl lg:text-3xl font-bold">CIMB PhishGuard</h1>
          </div>
          <p className="flex text-sm lg:text-lg font-bold text-center w-11/12 lg:w-2/3">
            Machine Learning-Based Phishing Detection System. Report suspicious activity to protect the banking ecosystem.
          </p>
        </div>
      )}
      {!submittedReport ? (
        <CreateNewReport onSubmitSuccess={setSubmittedReport} />
      ) : !isAuthenticated ? (
        <SubmitReport
          report={submittedReport}
          setIsSubmitted={() => setSubmittedReport(null)}
        />
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-red-600" />
          <p className="text-sm font-medium text-neutral-500 animate-pulse">
            Menganalisis laporan...
          </p>
        </div>
      )}
    </div>
  );
}
