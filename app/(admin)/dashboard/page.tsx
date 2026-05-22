import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ChartsSection from "@/components/dashboard/ChartsSection";
import LatestReportsTable from "@/components/ticket-list/LatestReportsTable";
import { serverApi } from "@/lib/server-api";
import { Report, TriageStatus } from "@/components/dashboard/dummy-data";

export const metadata = {
  title: "Security Dashboard | CIMB PhishGuard",
  description: "Daily operational overview and attack analytics for CIMB PhishGuard admins.",
};

async function getDashboardData() {
  try {
    const res = await serverApi.get<any>("/reports/dashboard?day_before=15&limit=10");
    return res.data?.reports ?? null;
  } catch {
    return null;
  }
}

function mapReports(rawReports: any[]): Report[] {
  return rawReports.map((r) => {
    let triageStatus: TriageStatus = "Submitted";
    if (r.ticket?.status === "in_review") triageStatus = "In Review";
    else if (r.ticket?.status === "closed") triageStatus = "Closed";

    return {
      id: r.id,
      ticket_id: r.ticket?.id,
      ticketId: r.ticket?.code || `TKT-${r.id.slice(0, 8).toUpperCase()}`,
      reportTime: new Date(r.created_at).toLocaleDateString("id-ID", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      platform: r.resource ? (r.resource === "sms" ? "SMS" : r.resource.charAt(0).toUpperCase() + r.resource.slice(1)) : "Web",
      riskScore: r.detection?.score || 0,
      triageStatus,
      reportedUrl: r.value,
    };
  });
}

export default async function DashboardPage() {
  const dashboardData = await getDashboardData();

  const stats = {
    totalReports: {
      value: dashboardData?.total_reports,
    },
    highRisk: {
      value: dashboardData?.total_high_risk,
    },
    pendingTriage: {
      value: dashboardData?.total_pending_reports,
      subtitle: "Queue Report",
    },
  };

  const initialReports: Report[] = mapReports(dashboardData?.reports ?? []);

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <DashboardHeader />
      <StatsSection data={stats} />
      <ChartsSection dailyStats={dashboardData?.monthly_stats} phishingChannels={dashboardData?.phishing_channels} />
      <LatestReportsTable initialReports={initialReports} title="Latest 10 Reports" />
    </div>
  );
}
