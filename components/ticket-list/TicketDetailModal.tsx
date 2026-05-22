"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Report } from "../dashboard/dummy-data";
import { ShieldAlert, ShieldCheck, LayoutGrid } from "lucide-react";

type HandlingPriorities = "High" | "Medium" | "Low";
type Decision = "Confirm Phishing" | "False Positive" | null;
type Mitigation = "blacklist_internal" | "broadcast_warning" | null;

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
}

export default function TicketDetailModal({ isOpen, onClose, report }: TicketDetailModalProps) {
  const [handlingPriorities, setHandlingPriorities] = React.useState<HandlingPriorities | null>(null);
  const [decision, setDecision] = React.useState<Decision>(null);
  const [handlingLog, setHandlingLog] = React.useState("");
  const [mitigationOptions, setMitigationOptions] = React.useState<Mitigation>(null);

  const toggleMitigationOption = (option: NonNullable<Mitigation>) => {
    setMitigationOptions((prev) => (prev === option ? null : option));
  };

  if (!report) return null;

  const riskScore = report.riskScore;
  const riskLabel = riskScore >= 70 ? "High" : riskScore >= 40 ? "Medium" : "Low";
  const riskColor = riskScore >= 70 ? "text-red-500" : riskScore >= 40 ? "text-orange-500" : "text-green-600";
  const riskBadge =
    riskScore >= 70
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
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1 font-light">Risk Score</p>
              <div className="flex items-center gap-2">
                <span className={`${riskColor}`}>{riskScore}/100</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-light border ${riskBadge}`}>{riskLabel}</span>
              </div>
            </div>
            <div className="text-right flex flex-col items-start">
              <p className="text-xs dark:text-white mb-1 font-light">Reported Data</p>
              <p className="text-sm text-gray-800 dark:text-gray-100 break-all max-w-[200px]">{report.reportedUrl ?? "-"}</p>
            </div>
          </div>

          {/* Set Handling Priorities */}
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

          {/* Investigation Decision */}
          <div>
            <p className="text-gray-900 dark:text-white mb-2.5">Investigation Decision</p>
            <div className="grid grid-cols-2 gap-3">
              {/* Confirm Phishing */}
              <button
                onClick={() => setDecision("Confirm Phishing")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs transition-all ${
                  decision === "Confirm Phishing"
                    ? "bg-red-200 text-red-600 border-current ring-2 ring-current/20 font-bold"
                    : "bg-red-100 dark:bg-red-950/30 border-gray-250/30 dark:border-gray-700 text-red-500 hover:bg-red-100"
                }`}
              >
                <ShieldAlert className="h-6 w-6" strokeWidth={1.5} />
                Confirm Phishing
              </button>

              {/* False Positive */}
              <button
                onClick={() => setDecision("False Positive")}
                className={`flex flex-col items-center justify-center gap-2 py-4 rounded-xl border text-xs transition-all ${
                  decision === "False Positive"
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
          {decision === "Confirm Phishing" && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <p className="text-gray-900 dark:text-white mb-2.5">Mitigation Action Recommendations</p>
              <div className="flex flex-col bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                {/* Blacklist Internal */}
                <label className="flex items-start gap-3 p-3 cursor-pointer transition-colors">
                  <div className="mt-0.5">
                    <Checkbox
                      checked={mitigationOptions === "blacklist_internal"}
                      onCheckedChange={() => toggleMitigationOption("blacklist_internal")}
                      className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Add to Internal Blacklist</p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                      Automatically block this {report.platform === "Website" ? "URL" : "Phone Number"} across all internal CIMB systems.
                    </p>
                  </div>
                </label>

                {/* Broadcast Warning */}
                <label className="flex items-start gap-3 p-3 cursor-pointer transition-colors">
                  <div className="mt-0.5">
                    <Checkbox
                      checked={mitigationOptions === "broadcast_warning"}
                      onCheckedChange={() => toggleMitigationOption("broadcast_warning")}
                      className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Broadcast Warning</p>
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
        <div className="px-5 py-3.5 flex items-center justify-end gap-2.5 border-t border-gray-200 dark:border-gray-700">
          <Button onClick={onClose} size="sm" className="px-6 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold shadow-xs">
            Cancel
          </Button>
          <Button size="sm" className="px-6 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold shadow-xs">
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
