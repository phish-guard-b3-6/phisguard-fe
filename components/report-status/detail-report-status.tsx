import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, Ticket, BookOpen, Clock, ShieldAlert, AlertCircle, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Report } from "@/lib/types/report";
import { formatDate } from "@/lib/utils";
import {
  RISK_CONFIG,
  STATUS_STEP_MAP,
  HANDLING_STEPS,
  mapLabel,
  mapStatus,
} from "@/lib/constants/report";

// ── Props ─────────────────────────────────────────────────────────────────────
interface DetailReportStatusSectionProps {
  report: Report;
}

export default function DetailReportStatusSection({ report }: DetailReportStatusSectionProps) {
  const risk = RISK_CONFIG[mapLabel(report.detection.label)];
  const activeStepIndex = STATUS_STEP_MAP[report.ticket.status] ?? 0;

  const mlEngineResults = [
    "Domain closely resembles the official CIMB Niaga website (Typosquatting).",
    report.is_blacklisted
      ? "Sender's number is listed in the internal Blacklist database."
      : "Sender's number is not currently in the blacklist.",
    "Message contains urgency patterns commonly used by scammers.",
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-10 pb-20">
      {/* Report Successfully Received Card */}
      <Card className="rounded-xl border-gray-200 shadow-sm bg-[#fafafa] px-5">
        <CardContent>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-green-600 stroke-[2.5px]" />
            <h2 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 tracking-tight">Report Successfully Received</h2>
          </div>

          <p className="font-light mb-6 leading-relaxed text-sm lg:text-base">
            Thank you for reporting the suspected phishing. Please save your Ticket ID to track the progress of this case:
          </p>

          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-white border border-gray-300 rounded-sm px-4 py-3 shadow-sm">
              <Ticket className="w-5 h-5 text-gray-500" />
              <span className="text-sm md:text-base font-semibold text-gray-900 tracking-widest">{report.ticket.code}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Alert Card — severity adapts to risk level */}
      <Card className={`relative overflow-hidden rounded-xl border-y border-r border-l-4 border-gray-200 ${risk.borderColor} shadow-sm bg-[#fafafa]`}>
        <div className="hidden md:block md:absolute top-0 right-0 z-0 pointer-events-none" style={{ opacity: risk.bgOpacity }}>
          <Image src={risk.bgIcon} alt="Warning Background" width={200} height={200} className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]" />
        </div>

        <CardContent className="md:p-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Image src={risk.icon} alt="Warning Icon" width={24} height={24} className="w-6 h-6" />
            <h2 className="text-base md:text-xl font-bold text-gray-900 tracking-tight">{risk.alertTitle}</h2>
          </div>

          <p className="font-light text-xs md:text-sm lg:text-base mb-4 leading-relaxed">
            {risk.alertBody}
            <br />
            Please note the following:
          </p>

          <ul className="font-light text-xs md:text-sm lg:text-base list-disc list-outside text-gray-800 mb-4 pl-5">
            {risk.recommendations.map((rec: string, i: number) => (
              <li key={i} className="leading-relaxed">
                {rec}
              </li>
            ))}
          </ul>

          <Button
            asChild
            className={`${risk.btnBg} ${risk.btnHoverBg} text-white p-4 md:p-6 text-sm md:text-sm lg:text-base rounded-xl shadow-md ${risk.btnShadow} transition-all active:scale-[0.98] border-none cursor-pointer`}
          >
            <Link href="/microlearning">
              <BookOpen className="w-5! h-5! mr-2" />
              Learn About This Phishing Method
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Ticket Details & Handling Status Card */}
      <Card className={`rounded-xl border-x border-b border-t-8 border-gray-200 ${risk.topBorder} shadow-sm bg-[#fafafa]`}>
        <CardContent className="px-6 md:px-8 space-y-6">
          {/* Header Section */}
          <div className="flex flex-row justify-between items-start gap-4">
            <div className="space-y-3">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight">Ticket Details</h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-3">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 md:px-3 py-1 md:py-1.5 shadow-sm">
                  <Ticket className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                  <span className="text-xs md:text-sm font-semibold text-gray-700">{report.ticket.code}</span>
                </div>
                <div className={`inline-flex items-center gap-2 ${risk.dateBg} rounded-lg px-2 md:px-3 py-1 md:py-1.5 shadow-sm`}>
                  <Clock className="w-3 h-3 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-bold">{formatDate(report.ticket.created_at)}</span>
                </div>
              </div>
            </div>

            {/* Risk Badge */}
            <div
              className={`flex flex-row items-center gap-2 md:gap-3 border-2 ${risk.badgeBorder} rounded-full px-3 md:px-5 py-1 ${risk.badgeBg} ${risk.badgeShadow} shrink-0`}
            >
              <Image src={risk.icon} alt="Warning" width={36} height={36} className="w-6 h-6 md:w-9 md:h-9 shrink-0" />
              <div className="flex flex-col">
                <p className={`text-[8px] md:text-xs font-bold ${risk.textColor} uppercase tracking-wider`}>{risk.label}</p>
                <p className={`text-lg md:text-xl lg:text-2xl font-black ${risk.textColor} leading-tight`}>{report.detection.score}/100</p>
              </div>
            </div>
          </div>

          <div className={`border-t w-full ${risk.textColor.replace("text-", "border-")}`} />

          {/* Handling Status Timeline */}
          <div className="space-y-6">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold tracking-tight">Handling Status</h3>

            <div className="relative flex flex-col md:grid md:grid-cols-4 gap-6 md:gap-4 px-2">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0" />

              {HANDLING_STEPS.map((step, idx) => {
                const stepStatus = idx < activeStepIndex ? "completed" : idx === activeStepIndex ? "active" : "pending";

                return (
                  <div
                    key={step.id}
                    className="relative flex flex-row md:flex-col items-center md:items-center gap-4 md:gap-0 z-10 text-left md:text-center"
                  >
                    {/* Step Icon */}
                    <div className="flex items-center justify-center shrink-0 w-12 h-12 md:mb-4">
                      {stepStatus === "completed" && (
                        <div className="w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center z-10">
                          <Check className="w-5 h-5 text-gray-400 stroke-[3px]" />
                        </div>
                      )}
                      {stepStatus === "active" && (
                        <div className="relative w-12 h-12 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border-2 border-dotted border-gray-400" />
                          <div className="w-9 h-9 rounded-full border-[3px] border-black bg-white z-10" />
                        </div>
                      )}
                      {stepStatus === "pending" && (
                        <div className="w-10 h-10 bg-white rounded-full border-2 border-gray-300 flex items-center justify-center z-10">
                          <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <p className={`text-base lg:text-lg ${stepStatus === "active" ? "text-gray-900" : "text-gray-400"}`}>{step.title}</p>
                      <p className={`text-xs lg:text-sm max-w-[250px] md:max-w-[120px] font-light ${stepStatus !== "active" ? "text-gray-400" : ""}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ML Engine Analysis */}
          <div className="bg-[#f0f0f0] rounded-xl border border-gray-200 p-6 md:p-8 space-y-4 md:space-y-6 shadow-inset-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-6 h-6 md:w-8 md:h-8 text-gray-900" />
              <h3 className="text-sm md:text-base lg:text-xl font-bold text-gray-900">ML Engine Analysis Results</h3>
            </div>

            <div className="space-y-3">
              {mlEngineResults.map((result, idx) => (
                <div key={idx} className="flex items-center gap-4 bg-gray-200/60 p-4 md:px-6 md:py-5 rounded-lg md:rounded-2xl">
                  <AlertCircle className="w-6 h-6 text-red-600 shrink-0" />
                  <p className="text-gray-800 text-xs md:text-sm lg:text-base font-light leading-tight">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
