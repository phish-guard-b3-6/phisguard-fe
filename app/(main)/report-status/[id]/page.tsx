import DetailReportStatusSection from "@/components/report-status/detail-report-status";
import { Report } from "@/lib/types/report";
import React from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getReport(id: string): Promise<Report | null> {
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports/${id}`, {
  //     cache: "no-store",
  //   });
  //   if (!res.ok) return null;
  //   const data = await res.json();
  //   return data.reports as Report;
  // } catch {
  //   return null;
  // }

  // Dummy data untuk testing UI
  return {
    id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
    user_id: "675a799c-8d64-49f6-b091-f227e1148009",
    message: "This is a sample report message",
    url: "https://example.com/report",
    sender_number: "+6281234567890",
    resource: "sms",
    description: "Additional details about the report",
    is_anonymous: true,
    is_blacklisted: false,
    created_at: "2026-05-03T02:06:13+08:00",
    updated_at: "2026-05-03T02:06:13+08:00",
    ticket: {
      id: "019dea15-8b98-7021-8cf4-d52a54202a41",
      report_id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
      code: "TKT-CIMB-9BE4433BFF30",
      status: "confirmed",
      created_at: "2026-05-03T02:06:14+08:00",
      updated_at: "2026-05-03T02:06:14+08:00",
    },
    detection: {
      id: "019dea15-8b99-713c-a287-00986fbbeb87",
      report_id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
      score: 95,
      label: "low_risk",
      created_at: "Sun, 03 May 2026 02:06:13 CST",
    },
  } as Report;
}

export default async function DetailReportStatus({ params }: PageProps) {
  const { id } = await params;
  const report = await getReport(id);

  return <DetailReportStatusSection report={report} />;
}
