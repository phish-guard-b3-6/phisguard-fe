"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ShieldAlert, ShieldCheck, LayoutGrid } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReportAdmin } from "@/lib/types/report";

type HandlingPriorities = "High" | "Medium" | "Low";
type Decision = "confirmed" | "false_positive" | null;
type MitigationOption = "blacklist_internal" | "broadcast_warning";

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ReportAdmin | null;
}

export default function TicketDetailModal({ isOpen, onClose, report }: TicketDetailModalProps) {
  const [handlingPriorities, setHandlingPriorities] = React.useState<HandlingPriorities | null>(null);
  const [decision, setDecision] = React.useState<Decision>(null);
  const [handlingLog, setHandlingLog] = React.useState("");
  const [mitigationOptions, setMitigationOptions] = React.useState<MitigationOption[]>([]);

  // Reset state setiap kali modal ditutup
  React.useEffect(() => {
    if (!isOpen) {
      setHandlingPriorities(null);
      setDecision(null);
      setHandlingLog("");
      setMitigationOptions([]);
    }
  }, [isOpen]);

  const toggleMitigationOption = (option: MitigationOption) => {
    setMitigationOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  };

  const queryClient = useQueryClient();

  // Mutation untuk submit blacklist — sinkronisasi cache adminReports setelah berhasil
  const { mutate: submitBlacklist, isPending } = useMutation({
    mutationFn: async () => {
      if (!report?.id) throw new Error("Report ID tidak ditemukan");

      const body = {
        ticket_code: report.ticketCode,
        type: report.type,
        is_blacklisted: true,
        reported_data: report.reportedValue,
        status: decision,
        handling_log: handlingLog,
        label: handlingPriorities?.toLowerCase() ?? null,
        option: mitigationOptions,
      };

      // PATCH ke endpoint blacklist report — backend menangani blacklist_internal melalui field option
      const res = await fetch(`/api/reports/blacklist/${report.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("[TicketDetailModal] PATCH /api/reports/blacklist error:", {
          status: res.status,
          report_id: report.id,
          ticket_code: report.ticketCode,
          body,
          backendMessage: err?.message,
        });
        throw new Error(err?.message ?? "Gagal mengirim data blacklist");
      }

      return res.json();
    },
    onSuccess: () => {
      // Sinkronisasi semua cache adminReports (semua kombinasi cursor/dayBefore)
      queryClient.setQueriesData({ queryKey: ["adminReports"] }, (old: any) => {
        if (!old?.reports?.reports) return old;
        return {
          ...old,
          reports: {
            ...old.reports,
            reports: old.reports.reports.map((r: any) =>
              r.ticket?.id === report?.ticket_id
                ? { ...r, ticket: { ...r.ticket, status: "closed" } }
                : r
            ),
          },
        };
      });
      onClose();
    },
    onError: (err) => {
      console.error("Gagal submit blacklist:", err.message);
    },
  });

  if (!report) return null;

  const riskScore = report.riskScore;
  const isFalsePositive = report.triage_status === "false_positive";
  
  const riskLabel = isFalsePositive ? "Safe" : riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";
  const riskColor = isFalsePositive ? "text-blue-600" : riskScore >= 70 ? "text-red-500" : riskScore >= 40 ? "text-orange-500" : "text-green-600";
  const riskBadge = isFalsePositive
    ? "bg-blue-100 text-blue-600 border-blue-200"
    : riskScore >= 70
      ? "bg-red-100 text-red-500 border-red-200"
      : riskScore >= 40
        ? "bg-orange-100 text-orange-500 border-orange-200"
        : "bg-green-100 text-green-600 border-green-200";


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-md px-4 py-0 overflow-hidden bg-[#FEF2F2] dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl flex flex-col max-h-[calc(100vh-4rem)] rounded-xl"
        aria-describedby={undefined}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-red-800 dark:border-gray-700">
          <div className="flex items-center gap-2.5">
            <DialogTitle className="text-base font-bold text-gray-900 dark:text-white">Report Ticket</DialogTitle>
            <span className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-600 rounded-md px-2 py-0.5 text-xs font-mono text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800">
              <LayoutGrid className="h-3 w-3" />
              {report.ticketId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg font-light transition-colors leading-none w-7 h-7 flex items-center justify-center rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ✕
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4 flex-1 overflow-y-auto">
          {/* Risk Score Card */}
          <div className="shrink-0 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-5 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-gray-100 to-transparent dark:from-gray-700/50 rounded-bl-full z-0 opacity-50" />
            
            <div className="flex flex-col gap-4 relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1">Risk Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-black tracking-tighter ${riskColor}`}>
                      {riskScore}
                    </span>
                    <span className="text-lg text-gray-400 dark:text-gray-500 font-bold">/100</span>
                    <span className={`ml-2 px-2.5 py-0.5 rounded-md text-xs font-bold border shadow-sm ${riskBadge}`}>
                      {riskLabel}
                    </span>
                  </div>
                </div>
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700 shadow-inner">
                  {isFalsePositive ? (
                    <ShieldCheck className="w-6 h-6 text-blue-500" strokeWidth={2} />
                  ) : riskScore >= 70 ? (
                    <ShieldAlert className="w-6 h-6 text-red-500" strokeWidth={2} />
                  ) : (
                    <ShieldAlert className="w-6 h-6 text-orange-500" strokeWidth={2} />
                  )}
                </div>
              </div>

              <div className="h-px w-full bg-gray-100 dark:bg-gray-700/60" />

              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider mb-1.5">Reported Data</p>
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-3 border border-gray-100 dark:border-gray-700/50">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200 break-all leading-tight">
                    {report.reportedValue ?? "-"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Set Handling Priorities */}
          {decision !== "false_positive" && (
            <div>
            <p className="text-base text-gray-900 dark:text-white mb-2.5">Set Handling Priorities</p>
            <div className="grid grid-cols-3 gap-2">
              {(["High", "Medium", "Low"] as HandlingPriorities[]).map((p) => {
                const styles: Record<HandlingPriorities, { active: string; idle: string }> = {
                  High: {
                    active: "bg-red-200 text-red-700",
                    idle: "bg-red-100 text-red-600",
                  },
                  Medium: {
                    active: "bg-yellow-100 text-yellow-700",
                    idle: "bg-yellow-50 text-yellow-600",
                  },
                  Low: {
                    active: "bg-green-200 text-green-700",
                    idle: "bg-green-100 text-green-600",
                  },
                };
                const s = handlingPriorities === p ? styles[p].active : styles[p].idle;
                const isSelected = handlingPriorities === p;
                return (
                  <button
                    key={p}
                    onClick={() => setHandlingPriorities(p)}
                    className={`py-1.5 rounded-lg border text-center transition-all ${s} ${
                      isSelected ? "border-current ring-2 ring-current/20 font-bold" : "border-gray-250/30 dark:border-gray-700"
                    }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
          )}

          {/* Investigation Decision */}
          <div>
            <p className="text-gray-900 dark:text-white mb-2.5">Investigation Decision</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Confirm Phishing */}
              <button
                onClick={() => setDecision("confirmed")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs transition-all ${
                  decision === "confirmed"
                    ? "bg-red-200 text-red-600 border-current ring-2 ring-current/20 font-bold"
                    : "bg-red-100 dark:bg-red-950/30 border-gray-250/30 dark:border-gray-700 text-red-500 hover:bg-red-100"
                }`}
              >
                <ShieldAlert className="h-6 w-6" strokeWidth={1.5} />
                Confirm Phishing
              </button>

              {/* False Positive */}
              <button
                onClick={() => setDecision("false_positive")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs transition-all ${
                  decision === "false_positive"
                    ? "bg-yellow-100 text-yellow-700 border-current ring-2 ring-current/20 font-bold"
                    : "bg-yellow-50 dark:bg-yellow-950/30 border-gray-250/30 dark:border-gray-700 text-yellow-600 hover:bg-yellow-100"
                }`}
              >
                <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                False Positive
              </button>
            </div>
          </div>

          {/* Mitigation Action Recommendations (Only shows if Confirm Phishing) */}
          {decision === "confirmed" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-gray-900 dark:text-white mb-2.5">Mitigation Action Recommendations</p>
              <div className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                {/* Blacklist Internal */}
                <label className="flex items-start gap-3 p-3 cursor-pointer transition-colors">
                  <div className="mt-0.5">
                    <Checkbox
                      checked={mitigationOptions.includes("blacklist_internal")}
                      onCheckedChange={() => toggleMitigationOption("blacklist_internal")}
                      className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black dark:text-gray-100">Add to Internal Blacklist</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Automatically block this {report.platform === "Website" ? "URL" : "Phone Number"} across all internal CIMB systems.
                    </p>
                  </div>
                </label>

                {/* Broadcast Warning */}
                <label className="flex items-start gap-3 p-3 cursor-pointer transition-colors">
                  <div className="mt-0.5">
                    <Checkbox
                      checked={mitigationOptions.includes("broadcast_warning")}
                      onCheckedChange={() => toggleMitigationOption("broadcast_warning")}
                      className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-black dark:text-gray-100">Broadcast Warning</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Send a security alert to users about this active phishing threat.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          )}

          {/* Handling Log */}
          <div>
            <p className="text-gray-900 dark:text-white mb-2.5">Handling Log</p>
            <Textarea
              placeholder="Enter details of findings, reasons, or instructions"
              value={handlingLog}
              onChange={(e) => setHandlingLog(e.target.value)}
              className="min-h-[90px] resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-md text-xs md:text-xs text-neutral-500 dark:text-neutral-400 placeholder:text-neutral-400/70 focus-visible:ring-1 focus-visible:ring-red-500/25 focus-visible:border-red-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 flex items-center justify-end gap-2.5 border-t border-red-800 dark:border-gray-700">
          <Button onClick={onClose} size="sm" className="px-6 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-xs">
            Cancel
          </Button>
          <Button
            size="sm"
            onClick={() => {
              console.log("Mitigation Options:", mitigationOptions);
              submitBlacklist();
            }}
            disabled={isPending}
            className="px-6 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow-xs disabled:opacity-60"
          >
            {isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
