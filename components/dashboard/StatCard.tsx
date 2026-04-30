import React from "react";
import Image from "next/image";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string; // icon filename prefix e.g. "new_report"
  trend?: { value: string; direction: "up" | "down" };
  subtitle?: string;
  accentColor?: "red" | "orange" | "yellow";
}

const accentMap = {
  red: {
    bg: "bg-red-50 dark:bg-red-950/40",
    iconBg: "bg-red-100 dark:bg-red-900/50",
    border: "border-red-100 dark:border-red-900/40",
    trendUp: "text-green-600 bg-green-50 dark:bg-green-900/30",
    trendDown: "text-red-500 bg-red-50 dark:bg-red-900/30",
  },
  orange: {
    bg: "bg-orange-50 dark:bg-orange-950/40",
    iconBg: "bg-orange-100 dark:bg-orange-900/50",
    border: "border-orange-100 dark:border-orange-900/40",
    trendUp: "text-green-600 bg-green-50 dark:bg-green-900/30",
    trendDown: "text-red-500 bg-red-50 dark:bg-red-900/30",
  },
  yellow: {
    bg: "bg-yellow-50 dark:bg-yellow-950/40",
    iconBg: "bg-yellow-100 dark:bg-yellow-900/50",
    border: "border-yellow-100 dark:border-yellow-900/40",
    trendUp: "text-green-600 bg-green-50 dark:bg-green-900/30",
    trendDown: "text-red-500 bg-red-50 dark:bg-red-900/30",
  },
};

export default function StatCard({ title, value, icon, trend, subtitle, accentColor = "red" }: StatCardProps) {
  const accent = accentMap[accentColor];

  return (
    <div className={`flex-1 rounded-xl border ${accent.border} ${accent.bg} px-5 py-4 flex items-center gap-4 shadow-sm`}>
      {/* Icon */}
      <div className={`h-12 w-12 rounded-full ${accent.iconBg} flex items-center justify-center shrink-0`}>
        <Image src={`/icon/${icon}_dark.svg`} alt={title} width={24} height={24} />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-0.5">
        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{title}</p>
        <div className="flex items-end gap-2">
          <span className="text-3xl font-extrabold text-gray-900 dark:text-white leading-none">{value}</span>
          {trend && (
            <span
              className={`flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-full mb-0.5 ${
                trend.direction === "up" ? accent.trendUp : accent.trendDown
              }`}
            >
              {trend.direction === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trend.value}
            </span>
          )}
        </div>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}
