import React from "react";
import ListReportStatusSection from "@/components/report-status/list-report-status";
import { ReportListApiResponse, ReportListItem } from "@/lib/types/report";
import { serverApi } from "@/lib/server-api";

async function getReports(): Promise<ReportListItem[]> {
  try {
    const res = await serverApi.get<ReportListApiResponse>(`/reports/reporter`);
    return (res.data.reports ?? []).flatMap((group) => group.reports ?? []);
  } catch {
    return [];
  }
}

export default async function ListReportStatusPage() {
  const reports = await getReports();

  return <ListReportStatusSection reports={reports} />;
}
