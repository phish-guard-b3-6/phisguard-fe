import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FileSearch, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GrLinkNext } from "react-icons/gr";
import { ReportListItem } from "@/lib/types/report";
import { formatDate } from "@/lib/utils";
import {
  RISK_CONFIG,
  STATUS_CONFIG,
  CHANNEL_ICON,
  mapLabel,
  mapStatus,
  mapChannel,
} from "@/lib/constants/report";

// ─────────────────────────────────────────────
// Empty State Component
// ─────────────────────────────────────────────
function EmptyReportStatus() {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-2 md:space-y-6 bg-[#f9f9f9] border border-gray-200 rounded-2xl shadow-sm">
      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-200/60">
        <FileSearch className="w-10 h-10 text-gray-400" />
      </div>
      <div className="space-y-1 md:space-y-3 max-w-2xl">
        <h3 className="text-base md:text-xl lg:text-xl font-bold text-gray-900">No Reports Yet</h3>
        <p className="text-[10px] md:text-xs lg:text-sm leading-relaxed font-light">
          You have not submitted any phishing reports. If you come across any suspicious links, text messages, or WhatsApp messages claiming to be
          from CIMB Niaga, please report them immediately so we can investigate.
        </p>
      </div>
      <Button
        asChild
        className="bg-[#7a1b1b]! hover:bg-[#631616]! text-[10px]! md:text-sm! text-white px-10 py-2 md:py-3 mt-4 h-auto font-bold rounded-sm! md:rounded-md! transition-all active:scale-[0.98] cursor-pointer"
      >
        <Link href="/new-report">Create New Report</Link>
      </Button>
    </div>
  );
}

// ─────────────────────────────────────────────
// Single Report Card Component
// ─────────────────────────────────────────────
function ReportStatusCard({ report }: { report: ReportListItem }) {
  const riskLevel = mapLabel(report.detection.label);
  const status = mapStatus(report.ticket.status);
  const channelKey = report.resource.toLowerCase();
  const risk = RISK_CONFIG[riskLevel];
  const statusStyle = STATUS_CONFIG[status];
  const icon = CHANNEL_ICON[channelKey] ?? <Clock className="w-4 h-4" />;

  return (
    <Card className="group px-4 md:px-10 rounded-lg md:rounded-2xl border border-gray-200 shadow-md bg-neutral-50 transition-all duration-200 overflow-hidden">
      <CardContent className="p-0">
        {/* Top Row */}
        <div className="flex items-stretch md:items-start justify-between md:pt-4 pb-4">
          {/* Left: Ticket ID + Date */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-bold text-gray-800 border border-gray-400 rounded-sm md:rounded-lg px-3 py-1.5">{report.ticket.code}</span>
            <div
              className={`flex items-center gap-1.5 ${risk.dateBg} ${risk.dateText} text-[10px] md:text-xs font-bold rounded-sm md:rounded-full px-3 py-1.5`}
            >
              <Clock className="w-3.5 h-3.5" />
              {formatDate(report.ticket.created_at)}
            </div>
          </div>

          {/* Right: Status + Channel */}
          <div className="flex flex-col items-end gap-2 justify-between">
            <span className={`text-[10px] md:text-xs font-bold px-2 py-1 md:px-4 md:py-1.5 rounded-full ${statusStyle.bg} ${statusStyle.text}`}>
              {statusStyle.label}
            </span>
            <div className="flex items-center gap-1.5 text-gray-600 text-sm font-medium">
              {icon}
              <span>{mapChannel(report.resource)}</span>
            </div>
          </div>
        </div>

        {/* Separator */}
        <div className="w-full h-px bg-red-300" />

        {/* Bottom Row */}
        <div className="flex items-center justify-between pt-4 md:pb-4">
          {/* Risk Badge */}
          <div className={`flex flex-row items-center gap-3 border-2 ${risk.border} ${risk.bg} rounded-full px-2 py-1 bg-white ${risk.shadow}`}>
            <Image src={risk.icon} alt="Warning" width={20} height={20} className="w-6 h-6 shrink-0" />
            <div className="flex flex-col">
              <span className={`text-[8px] uppercase tracking-wider ${risk.text}`}>{riskLevel}</span>
              <span className={`text-xs leading-tight ${risk.text}`}>{report.detection.score}/100</span>
            </div>
          </div>

          {/* Arrow — link to detail by report ID */}
          <Link href={`/report-status/${report.id}`} className="transition-transform hover:scale-110 active:scale-95">
            <GrLinkNext className="w-4 h-4 md:w-6 md:h-6 text-gray-400 hover:text-gray-700 cursor-pointer" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// ─────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────
interface ListReportStatusSectionProps {
  reports?: ReportListItem[];
}

export default function ListReportStatusSection({ reports = [] }: ListReportStatusSectionProps) {
  const hasData = reports.length > 0;

  return (
    <div className="w-full md:w-4/5 lg:w-1/2 mx-auto pb-20">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col items-start justify-between mb-6 gap-2">
          <h2 className="text-lg md:text-xl lg:text-2xl font-extrabold text-gray-900">Reporting History</h2>
          <p className="text-xs md:text-sm lg:text-base w-11/12">A list of all the phishing reports you have submitted.</p>
        </div>
        {hasData ? (
          <div className="flex flex-col gap-5">
            {reports.map((report) => (
              <ReportStatusCard key={report.id} report={report} />
            ))}
          </div>
        ) : (
          <EmptyReportStatus />
        )}
      </div>
    </div>
  );
}
