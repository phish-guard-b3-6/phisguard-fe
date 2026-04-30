import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsSection from "@/components/dashboard/StatsSection";
import ChartsSection from "@/components/dashboard/ChartsSection";
import LatestReportsTable from "@/components/ticket-list/LatestReportsTable";
import { dashboardDummyData } from "@/components/dashboard/dummy-data";

export const metadata = {
  title: "Security Dashboard | CIMB PhishGuard",
  description: "Daily operational overview and attack analytics for CIMB PhishGuard admins.",
};

export default function DashboardPage() {
  const { stats, chartPhishingTrends, chartAttackMethods, latestReports } = dashboardDummyData;

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <DashboardHeader />
      <StatsSection data={stats} />
      <ChartsSection phishingTrendsData={chartPhishingTrends} attackMethodsData={chartAttackMethods} />
      <LatestReportsTable reports={latestReports} />
    </div>
  );
}
