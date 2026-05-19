import React from "react";
import { Ticket, ShieldAlert, AlertTriangle } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string; // "report_status" | "new_report" | "blacklist"
  trend?: { value: string; direction: "up" | "down" };
  subtitle?: string;
  accentColor?: "green" | "red" | "orange" | "yellow";
}

const iconMap: Record<string, React.ComponentType<any>> = {
  report_status: Ticket,
  new_report: ShieldAlert,
  blacklist: AlertTriangle,
};

const accentMap = {
  green: {
    iconBg: "bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/30",
    iconColor: "text-emerald-500 dark:text-emerald-400",
    trendBg: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  },
  red: {
    iconBg: "bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30",
    iconColor: "text-red-500 dark:text-red-400",
    trendBg: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400",
  },
  orange: {
    iconBg: "bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    trendBg: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
  },
  yellow: {
    iconBg: "bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/30",
    iconColor: "text-orange-500 dark:text-orange-400",
    trendBg: "bg-orange-50 dark:bg-orange-950/30 text-orange-600 dark:text-orange-400",
  },
};

export default function StatCard({ 
  title, 
  value, 
  icon, 
  trend, 
  subtitle, 
  accentColor = "red" 
}: StatCardProps) {
  const accent = accentMap[accentColor] || accentMap.red;
  const IconComponent = iconMap[icon] || Ticket;

  return (
    <div className="flex-1 bg-white dark:bg-gray-900/60 border border-gray-200/60 dark:border-gray-800/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Icon Container */}
      <div className={`h-16 w-16 rounded-2xl ${accent.iconBg} flex items-center justify-center shrink-0`}>
        <IconComponent className={`h-8 w-8 ${accent.iconColor}`} />
      </div>

      {/* Content */}
      <div className="flex flex-col">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">{title}</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{value}</span>
          {trend && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded ${accent.trendBg}`}>
              {trend.direction === "up" ? "↗" : "↘"} {trend.value}
            </span>
          )}
          {subtitle && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              {subtitle}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
