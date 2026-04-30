interface ChartBoxProps {
  title: string;
}

function ChartBox({ title }: ChartBoxProps) {
  return (
    <div className="flex-1 bg-white dark:bg-gray-900/60 border border-red-300 dark:border-red-900/40 rounded-2xl shadow-sm p-5 flex flex-col min-h-[220px]">
      <p className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-4">{title}</p>
      {/* Chart placeholder — empty for now */}
      <div className="flex-1 flex items-center justify-center">
        <span className="text-xs text-gray-300 dark:text-gray-600 select-none">Chart coming soon</span>
      </div>
    </div>
  );
}

interface ChartsSectionProps {
  phishingTrendsData: Array<{ date: string; total: number; highRisk: number }>;
  attackMethodsData: Array<{ method: string; count: number }>;
}

export default function ChartsSection({ phishingTrendsData, attackMethodsData }: ChartsSectionProps) {
  return (
    <div className="flex gap-4 mb-6">
      <ChartBox title="Phishing Incident Trends" />
      <ChartBox title="Top 5 Attack Methods" />
    </div>
  );
}
