import React from "react";
import ListReportStatusSection from "@/components/report-status/list-report-status";
import { ReportListApiResponse, ReportUser } from "@/lib/types/report";
import { serverApi } from "@/lib/server-api";

// Paksa halaman selalu di-render ulang di server setiap request.
// Mencegah Next.js men-cache respons antar user yang berbeda.
export const dynamic = "force-dynamic";

async function getReports(): Promise<ReportUser[]> {
  try {
    const res = await serverApi.get<ReportListApiResponse>(`/reports/reporter`);
    return (res.data.reports ?? [])
      .flatMap((group) => group.reports ?? [])
      .map((r) => {
        const triage_status: ReportUser["triage_status"] =
          r.triage_status === "confirmed" || r.triage_status === "false_positive"
            ? r.triage_status
            : null;
        return { ...r, triage_status };
      })
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  } catch {
    return [];
  }
}

export default async function ListReportStatusPage() {
  const reports = await getReports();

  return <ListReportStatusSection reports={reports} />;
}
