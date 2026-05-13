import DetailReportStatusSection from "@/components/report-status/detail-report-status";
import { Report, ReportApiResponse } from "@/lib/types/report";
import { serverApi } from "@/lib/server-api";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getReport(id: string): Promise<Report | null> {
  try {
    const res = await serverApi.get<ReportApiResponse>(`/reports/${id}`);
    return res.data.reports ?? null;
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
