import Link from "next/link";
import { AlertCircle, AlertTriangle, Eye } from "lucide-react";
import { Report, TriageStatus } from "../dashboard/dummy-data";
import { Button } from "@/components/ui/button";

const statusStyles: Record<TriageStatus, string> = {
  "In Review": "bg-green-400 text-white dark:bg-green-900/40 dark:text-green-400",
  Submitted: "bg-cyan-500 text-white dark:bg-cyan-900/40 dark:text-cyan-500",
  Closed: "bg-gray-300 text-white dark:bg-gray-800 dark:text-gray-300",
  Confirmed: "bg-red-300 text-white dark:bg-red-900/40 dark:text-red-300",
};

function RiskBadge({ score }: { score: number }) {
  const isHigh = score >= 70;
  const isMed = score >= 40;
  const Icon = isHigh ? AlertCircle : AlertTriangle;
  const color = isHigh ? "text-red-500" : isMed ? "text-yellow-500" : "text-green-500";

  return (
    <span className={`flex items-center gap-1 font-semibold text-sm ${color}`}>
      <Icon className="h-4 w-4" />
      {score}
    </span>
  );
}

interface LatestReportsTableProps {
  reports: Report[];
  title?: string;
  hideLink?: boolean;
  isTicketListPage?: boolean;
  onDetailClick?: (report: Report) => void;
}

export default function LatestReportsTable({
  reports,
  title = "10 Latest Reports",
  hideLink = false,
  isTicketListPage = false,
  onDetailClick,
}: LatestReportsTableProps) {
  return (
    <div className="bg-white dark:bg-gray-900/60 border border-red-300 dark:border-red-900/40 rounded-2xl shadow-sm p-5">
      {/* Table header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">{title}</h2>
        {!hideLink && (
          <Link href="/ticket-list" className="text-xs text-black hover:text-red-600 font-medium transition-colors">
            View All Tickets →
          </Link>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-red-300 dark:border-red-900/40">
              {["Ticket ID", "Report Time", "Platform", "Risk Score", "Status"].map((h) => (
                <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold dark:text-gray-500 uppercase tracking-wide">
                  {h}
                </th>
              ))}
              {isTicketListPage && <th className="text-left py-2.5 px-3 text-xs font-semibold dark:text-gray-500 uppercase tracking-wide">Action</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-red-300 dark:divide-red-900/40">
            {reports.map((r) => (
              <tr key={r.ticketId} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                <td className="py-3  font-mono text-xs text-gray-700 dark:text-gray-300 font-medium">{r.ticketId}</td>
                <td className="py-3  text-gray-500 dark:text-gray-400 text-xs">{r.reportTime}</td>
                <td className="py-3 px-3 text-gray-700 dark:text-gray-300">{r.platform}</td>
                <td className="py-3 px-3">
                  <RiskBadge score={r.riskScore} />
                </td>
                <td className="py-3">
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusStyles[r.triageStatus]}`}>
                    {r.triageStatus}
                  </span>
                </td>
                {isTicketListPage && (
                  <td className="py-3 px-3">
                    <Button onClick={() => onDetailClick?.(r)} variant="ghost" size="sm" className="h-8 gap-1.5 hover:bg-red-50 font-semibold">
                      <Eye className="h-4 w-4" />
                      Detail
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
