"use client";

import Link from "next/link";
import { AlertCircle, AlertTriangle, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import TicketDetailModal from "./TicketDetailModal";
import { useFilterStore } from "@/stores/useFilterStore";
import { ReportAdmin, TriageStatus } from "@/lib/types/report";

const statusStyles: Record<TriageStatus, string> = {
  "In Review": "bg-green-400 text-white dark:bg-green-900/40 dark:text-green-400",
  Submitted: "bg-cyan-500 text-white dark:bg-cyan-900/40 dark:text-cyan-500",
  Closed: "bg-gray-300 text-white dark:bg-gray-800 dark:text-gray-300",
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
  title?: string;
  hideLink?: boolean;
  isTicketListPage?: boolean;
  onDetailClick?: (report: ReportAdmin) => void;
  initialReports?: ReportAdmin[]; // Data dari Server Component (SSR), skip useQuery jika ada
}

export default function LatestReportsTable({
  title = "Latest Reports",
  hideLink = false,
  isTicketListPage = false,
  onDetailClick,
  initialReports,
}: LatestReportsTableProps) {
  const [cursor, setCursor] = useState<string>("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const [selectedReport, setSelectedReport] = useState<ReportAdmin | null>(null);
  const queryClient = useQueryClient();
  const { dayBefore } = useFilterStore();

  // Query key didefinisikan sekali — dipakai bersama oleh useQuery dan useMutation
  const adminReportsQueryKey = ["adminReports", { day_before: dayBefore, cursor }] as const;

  // Mutation untuk update status ticket → in_review
  const { mutate: patchInReview } = useMutation({
    mutationFn: (ticketId: string) =>
      fetch(`/api/tickets/${ticketId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "in_review" }),
      }).then((res) => {
        if (!res.ok) throw new Error("Gagal mengupdate status");
      }),
    onSuccess: (_, ticketId) => {
      // Mutasi cache langsung setelah PATCH berhasil
      queryClient.setQueryData(adminReportsQueryKey, (old: any) => {
        if (!old?.reports?.reports) return old;
        return {
          ...old,
          reports: {
            ...old.reports,
            reports: old.reports.reports.map((r: any) =>
              r.ticket?.id === ticketId
                ? { ...r, ticket: { ...r.ticket, status: "in_review" } }
                : r
            ),
          },
        };
      });
    },
    onError: (err) => {
      console.error("Error patching status:", err);
    },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: adminReportsQueryKey,
    queryFn: async () => {
      const res = await fetch(`/api/reports/admin?day_before=${dayBefore}&limit=30&cursor=${cursor}`);
      if (!res.ok) throw new Error("Gagal mengambil data laporan");
      return res.json();
    },
    enabled: !initialReports, // Tidak fetch jika data sudah ada dari SSR
  });

  const rawReports = initialReports ?? data?.reports?.reports ?? [];
  // Jika initialReports sudah berupa ReportAdmin[], langsung pakai. Jika dari API, perlu mapping.
  const reports: ReportAdmin[] = initialReports
    ? initialReports
    : (rawReports as any[]).map((r: any) => {
        let triageStatus: TriageStatus = "Submitted";
        if (r.ticket?.status === "in_review") triageStatus = "In Review";
        else if (r.ticket?.status === "closed") triageStatus = "Closed";

        return {
          id: r.id,
          ticket_id: r.ticket?.id,
          ticketCode: r.ticket?.code,
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
          reportedValue: r.value,
          triage_status: r.triage_status === "confirmed" || r.triage_status === "false_positive" ? r.triage_status : null,
          type: typeof r.value === "string" && r.value.startsWith("http") ? "url" : "phone",
        } as ReportAdmin;
      });

  const handleNextPage = () => {
    const nextCursor = data?.reports?.next_cursor;
    if (nextCursor) {
      setCursorHistory((prev) => [...prev, cursor]);
      setCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    const previousCursor = cursorHistory[cursorHistory.length - 1];
    if (previousCursor !== undefined) {
      setCursorHistory((prev) => prev.slice(0, -1));
      setCursor(previousCursor);
    }
  };

  const handleDetailClick = async (report: ReportAdmin) => {
    if (report.ticket_id && report.id) {
      // Jalankan GET detail dan PATCH status secara paralel — keduanya independen
      const [detailResult] = await Promise.allSettled([
        fetch(`/api/tickets?id=${report.ticket_id}&report_id=${report.id}`).then((res) => {
          if (!res.ok) throw new Error("Gagal mengambil data detail tiket");
          return res.json();
        }),
        // PATCH hanya jika status belum In Review
        report.triageStatus !== "In Review" && report.ticket_id
          ? patchInReview(report.ticket_id)
          : Promise.resolve(),
      ]);

      if (detailResult.status === "fulfilled") {
        console.log("Detail data:", detailResult.value);
      } else {
        console.error("Error fetching ticket detail:", detailResult.reason);
      }
    }

    if (onDetailClick) {
      onDetailClick(report);
    } else {
      setSelectedReport(report);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-900/60 border border-red-300 dark:border-red-900/40 rounded-2xl shadow-sm p-5">
        {/* Table header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
            {isTicketListPage ? `All Ticket Reports (${reports.length})` : title}
          </h2>
          {!hideLink && (
            <Link href="/ticket-list" className="text-xs text-black hover:text-red-600 font-medium transition-colors">
              View All Tickets →
            </Link>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-10 font-medium text-gray-500">Loading tickets...</div>
        ) : isError ? (
          <div className="text-center py-10 text-red-500">Gagal memuat data tiket.</div>
        ) : (
          /* Table */
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-red-300 dark:border-red-900/40">
                  {["Ticket ID", "Report Time", "Platform", "Risk Score", "Status"].map((h) => (
                    <th key={h} className="text-left py-2.5 px-3 text-xs font-semibold dark:text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                  {isTicketListPage && (
                    <th className="text-left py-2.5 px-3 text-xs font-semibold dark:text-gray-500 uppercase tracking-wide">Action</th>
                  )}
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
                        <Button
                          onClick={() => handleDetailClick(r)}
                          disabled={r.triageStatus === "Closed"}
                          variant="ghost"
                          size="sm"
                          className="h-8 gap-1.5 disabled:opacity-45 disabled:text-gray-450 dark:disabled:text-gray-600"
                        >
                          <Eye className="h-4 w-4" />
                          Triage
                        </Button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {isTicketListPage && (
        <div className="flex justify-between items-center mt-6 bg-white dark:bg-gray-900/60 border border-red-300 dark:border-red-900/40 rounded-2xl p-4 shadow-sm">
          <Button onClick={handlePrevPage} disabled={cursor === ""} variant="outline" size="sm" className="text-xs font-semibold">
            ← Previous
          </Button>
          <span className="text-xs text-gray-500 font-medium">Page {cursorHistory.length + 1}</span>
          <Button onClick={handleNextPage} disabled={!data?.reports?.next_cursor} variant="outline" size="sm" className="text-xs font-semibold">
            Next →
          </Button>
        </div>
      )}

      <TicketDetailModal isOpen={selectedReport !== null} onClose={() => setSelectedReport(null)} report={selectedReport} />
    </>
  );
}
