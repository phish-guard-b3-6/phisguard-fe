import ListReportStatusSection from "@/components/report-status/list-report-status";
import { ReportListItem, ReportListApiResponse } from "@/lib/types/report";
import React from "react";

async function getReports(): Promise<ReportListItem[]> {
  // try {
  //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reports`, {
  //     cache: "no-store",
  //   });
  //   if (!res.ok) return [];
  //   const data: ReportListApiResponse = await res.json();
  //   // Flatten nested structure: reports[].reports[]
  //   return data.reports.flatMap((group) => group.reports);
  // } catch {
  //   return [];
  // }

  // Dummy data untuk testing UI
  const dummyResponse: ReportListApiResponse = {
    message: "success",
    reports: [
      {
        reports: [
          {
            id: "019de933-2edc-7a6f-b7a8-235d3055a52f",
            user_id: "675a799c-8d64-49f6-b091-f227e1148009",
            sender_number: "+6281234567890",
            resource: "",
            is_blacklisted: false,
            created_at: "2026-05-02T21:58:59+08:00",
            updated_at: "2026-05-02T21:58:59+08:00",
            ticket: {
              id: "019de933-308b-7540-a569-f06dad8aaeb7",
              report_id: "019de933-2edc-7a6f-b7a8-235d3055a52f",
              code: "TKT-CIMB-9D2F0D475FD8",
              status: "submitted",
              created_at: "2026-05-02T21:58:59+08:00",
              updated_at: "2026-05-02T21:58:59+08:00",
            },
            detection: {
              id: "019de933-308a-7b30-9074-49edb483170f",
              report_id: "019de933-2edc-7a6f-b7a8-235d3055a52f",
              score: 0,
              label: "high_risk",
              created_at: "Sat, 02 May 2026 21:58:59 CST",
            },
          },
        ],
      },
      {
        reports: [
          {
            id: "019de934-4540-75aa-818e-c129247a467c",
            user_id: "675a799c-8d64-49f6-b091-f227e1148009",
            sender_number: "+6281234567890",
            resource: "",
            is_blacklisted: false,
            created_at: "2026-05-02T22:00:10+08:00",
            updated_at: "2026-05-02T22:00:10+08:00",
            ticket: {
              id: "019de934-46df-7c33-9f34-82bfdf0466ec",
              report_id: "019de934-4540-75aa-818e-c129247a467c",
              code: "TKT-CIMB-57F46839EED3",
              status: "in_review",
              created_at: "2026-05-02T22:00:10+08:00",
              updated_at: "2026-05-02T23:27:09+08:00",
            },
            detection: {
              id: "019de934-46de-7b7b-9407-43920c7eb715",
              report_id: "019de934-4540-75aa-818e-c129247a467c",
              score: 95,
              label: "low_risk",
              created_at: "Sat, 02 May 2026 22:00:10 CST",
            },
          },
        ],
      },
      {
        reports: [
          {
            id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
            user_id: "675a799c-8d64-49f6-b091-f227e1148009",
            sender_number: "+6281234567890",
            resource: "sms",
            is_blacklisted: false,
            created_at: "2026-05-03T02:06:13+08:00",
            updated_at: "2026-05-03T02:06:13+08:00",
            ticket: {
              id: "019dea15-8b98-7021-8cf4-d52a54202a41",
              report_id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
              code: "TKT-CIMB-9BE4433BFF30",
              status: "submitted",
              created_at: "2026-05-03T02:06:14+08:00",
              updated_at: "2026-05-03T02:06:14+08:00",
            },
            detection: {
              id: "019dea15-8b99-713c-a287-00986fbbeb87",
              report_id: "019dea15-8b98-7020-ade7-2c0f6e36dfe9",
              score: 95,
              label: "medium_risk",
              created_at: "Sun, 03 May 2026 02:06:13 CST",
            },
          },
        ],
      },
    ],
  };

  // Flatten nested structure: reports[].reports[]
  return dummyResponse.reports.flatMap((group) => group.reports);
}

export default async function ListReportStatus() {
  const reports = await getReports();
  return <ListReportStatusSection reports={reports} />;
}
