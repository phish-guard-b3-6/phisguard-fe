import DetailReportStatusSection from "@/components/report-status/detail-report-status";
import { ReportUser, ReportApiResponse } from "@/lib/types/report";
import { serverApi } from "@/lib/server-api";

// Paksa halaman selalu di-render ulang di server setiap request.
// Mencegah Next.js men-cache respons antar user yang berbeda.
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getReport(id: string): Promise<ReportUser | null> {
  console.log("cekkkkk=============",id)
  try {
    const res = await serverApi.get<ReportApiResponse>(`/reports/${id}`);
    if (res.data.reports) {
      const raw = res.data.reports;

      const triage_status: ReportUser["triage_status"] =
        raw.triage_status === "confirmed" || raw.triage_status === "false_positive"
          ? raw.triage_status
          : null;
      return { ...raw, triage_status };
    }
    return null;
  } catch {
    return null;
  }
}

export default async function DetailReportStatus({ params }: PageProps) {
  const { id } = await params;
  const report = await getReport(id);

  // Tampilan Not Found / Unauthorized
  if (!report) {
    return (
      <div className="flex flex-col gap-2 w-full justify-center items-center min-h-[50vh] text-red-600">
        <p className="font-bold text-lg">Laporan tidak ditemukan</p>
        <p className="text-sm opacity-80">Pastikan Ticket ID benar atau sesi Anda masih aktif.</p>
      </div>
    );
  }

  return <DetailReportStatusSection report={report} />;
}
