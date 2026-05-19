import StatCard from "./StatCard";

interface StatsSectionProps {
  data: {
    totalReports: { value: string | number; trend?: { value: string; direction: "up" | "down" } };
    highRisk: { value: string | number; trend?: { value: string; direction: "up" | "down" } };
    pendingTriage: { value: string | number; subtitle?: string };
  };
}

export default function StatsSection({ data }: StatsSectionProps) {
  return (
    <div className="flex gap-4 mb-6">
      <StatCard
        title="Total Reports (Active)"
        value={data.totalReports.value}
        icon="report_status"
        accentColor="green"
        trend={data.totalReports.trend}
      />
      <StatCard title="High Risk Detected" value={data.highRisk.value} icon="new_report" accentColor="red" trend={data.highRisk.trend} />
      <StatCard
        title="Pending Triage"
        value={data.pendingTriage.value}
        icon="blacklist"
        accentColor="yellow"
        subtitle={data.pendingTriage.subtitle}
      />
    </div>
  );
}
