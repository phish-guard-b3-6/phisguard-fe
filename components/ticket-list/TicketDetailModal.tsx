"use client";

import * as React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Report } from "../dashboard/dummy-data";
import { ShieldAlert, ShieldCheck, Info, LayoutGrid, Square, SquareCheck } from "lucide-react";

type Priority = "High" | "Medium" | "Low";
type Decision = "Confirm Phishing" | "False Positive" | "Need More Info" | null;

interface TicketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: Report | null;
}

export default function TicketDetailModal({ isOpen, onClose, report }: TicketDetailModalProps) {
  const [priority, setPriority] = React.useState<Priority | null>(null);
  const [decision, setDecision] = React.useState<Decision>(null);
  const [internalBlacklist, setInternalBlacklist] = React.useState(false);
  const [broadcastWarning, setBroadcastWarning] = React.useState(false);
  const [handlingLog, setHandlingLog] = React.useState("");

  if (!report) return null;

  const isHigh = report.riskScore >= 70;
  const riskLabel = isHigh ? "High" : report.riskScore >= 40 ? "Medium" : "Low";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent showCloseButton={false} className="sm:max-w-2xl p-0 overflow-hidden bg-[#FFF5F5] dark:bg-gray-900 border-0 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-900 border-b border-red-200">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Report Ticket</h2>
            <span className="flex items-center gap-1.5 border border-gray-300 dark:border-gray-700 rounded-md px-2.5 py-0.5 text-xs font-mono text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800">
              <LayoutGrid className="h-3 w-3" />
              {report.ticketId}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-xl font-light transition-colors leading-none"
          >
            ✕
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-5 overflow-y-auto max-h-[70vh]">
          {/* Risk Score Card */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Risk Score</p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-red-500">{report.riskScore}/100</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-500 border border-red-200">{riskLabel}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Reported Data</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 break-all max-w-[300px]">{report.reportedUrl ?? "-"}</p>
            </div>
          </div>

          {/* Set Handling Priorities */}
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white mb-3">Set Handling Priorities</p>
            <div className="flex gap-3">
              {(["High", "Medium", "Low"] as Priority[]).map((p) => {
                const styles: Record<Priority, { active: string; idle: string }> = {
                  High: { active: "bg-red-100 text-red-500 border-red-300", idle: "bg-white text-red-400 border-red-200 hover:bg-red-50" },
                  Medium: {
                    active: "bg-orange-100 text-orange-500 border-orange-300",
                    idle: "bg-white text-orange-400 border-orange-200 hover:bg-orange-50",
                  },
                  Low: { active: "bg-green-100 text-green-600 border-green-300", idle: "bg-white text-green-500 border-green-200 hover:bg-green-50" },
                };
                const s = priority === p ? styles[p].active : styles[p].idle;
                return (
                  <button
                    key={p}
                    onClick={() => setPriority(p)}
                    className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all ${s}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Investigation Decision */}
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white mb-3">Investigation Decision</p>
            <div className="grid grid-cols-3 gap-3">
              {/* Confirm Phishing */}
              <button
                onClick={() => setDecision("Confirm Phishing")}
                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border text-sm font-semibold transition-all
                  ${
                    decision === "Confirm Phishing"
                      ? "bg-red-200 border-red-300 text-red-600"
                      : "bg-red-50 border-red-100 text-red-500 hover:bg-red-100"
                  }`}
              >
                <ShieldAlert className="h-7 w-7" />
                Confirm Phishing
              </button>

              {/* False Positive */}
              <button
                onClick={() => setDecision("False Positive")}
                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border text-sm font-semibold transition-all
                  ${
                    decision === "False Positive"
                      ? "bg-yellow-200 border-yellow-300 text-yellow-700"
                      : "bg-yellow-50 border-yellow-100 text-yellow-600 hover:bg-yellow-100"
                  }`}
              >
                <ShieldCheck className="h-7 w-7" />
                False Positive
              </button>

              {/* Need More Info */}
              <button
                onClick={() => setDecision("Need More Info")}
                className={`flex flex-col items-center justify-center gap-2 py-5 rounded-2xl border text-sm font-semibold transition-all
                  ${
                    decision === "Need More Info"
                      ? "bg-green-200 border-green-300 text-green-700"
                      : "bg-green-50 border-green-100 text-green-600 hover:bg-green-100"
                  }`}
              >
                <Info className="h-7 w-7" />
                Need More Info
              </button>
            </div>
          </div>

          {/* Mitigation Action Recommendations (Conditional) */}
          {decision === "Confirm Phishing" && (
            <div className="bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <p className="text-base font-bold text-gray-900 dark:text-white">Mitigation Action Recommendations</p>
              
              <div className="flex flex-col gap-4">
                {/* Internal Blacklist */}
                <button
                  type="button"
                  onClick={() => setInternalBlacklist(!internalBlacklist)}
                  className="flex items-start gap-3 text-left group transition-colors"
                >
                  <div className="mt-0.5">
                    {internalBlacklist ? (
                      <SquareCheck fill="black" stroke="black" className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Add to Internal Blacklist</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">The system will automatically block future interactions with this indicator.</p>
                  </div>
                </button>

                {/* Broadcast Warning */}
                <button
                  type="button"
                  onClick={() => setBroadcastWarning(!broadcastWarning)}
                  className="flex items-start gap-3 text-left group transition-colors"
                >
                  <div className="mt-0.5">
                    {broadcastWarning ? (
                      <SquareCheck fill="black" stroke="black" className="h-5 w-5" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">Broadcast Warning Template</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Send a (simulated) danger notification to the relevant customer's dashboard.</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Handling Log */}
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white mb-3">Handling Log</p>
            <Textarea
              placeholder="Enter details of findings, reasons, or instructions"
              value={handlingLog}
              onChange={(e) => setHandlingLog(e.target.value)}
              className="min-h-[110px] resize-none bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 flex items-center justify-end gap-3 bg-white dark:bg-gray-900 border-t border-red-200">
          <Button onClick={onClose} className="px-8 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold">
            Cancel
          </Button>
          <Button className="px-8 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-semibold">Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
