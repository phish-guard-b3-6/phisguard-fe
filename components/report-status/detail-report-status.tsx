import React from "react";
import Image from "next/image";
import { CheckCircle2, Ticket, BookOpen, Clock, ShieldAlert, AlertCircle, Check, Circle, Dot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const handlingStatusSteps = [
  {
    id: 1,
    title: "Submitted",
    description: "Report successfully received by the system.",
    status: "completed",
  },
  {
    id: 2,
    title: "In Review",
    description: "The report is currently being analyzed by the team.",
    status: "active",
  },
  {
    id: 3,
    title: "Confirmed",
    description: "Verified as a confirmed phishing threat.",
    status: "pending",
  },
  {
    id: 4,
    title: "Closed",
    description: "Case closed and mitigation actions completed.",
    status: "pending",
  },
];

const mlEngineResults = [
  "Domain closely resembles the official CIMB Niaga website (Typosquatting).",
  "Sender's number is listed in the internal Blacklist database.",
  "Message contains urgency patterns commonly used by scammers.",
];

export default function DetailReportStatusSection() {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-10 pb-20">
      {/* Report Successfully Received Card */}
      <Card className="rounded-xl border-gray-200 shadow-sm bg-[#fafafa]">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-600 stroke-[2.5px]" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">Report Successfully Received</h2>
          </div>

          <p className="text-gray-700 font-medium mb-6 leading-relaxed">
            Thank you for reporting the suspected phishing. Please save your Ticket ID to track the progress of this case:
          </p>

          <div className="inline-flex items-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 shadow-sm">
            <Ticket className="w-5 h-5 text-gray-500" />
            <span className="text-base font-semibold text-gray-900 tracking-widest">TKT-CIMB-6666</span>
          </div>
        </CardContent>
      </Card>

      {/* High-Level Security Alert Card */}
      <Card className="relative overflow-hidden rounded-xl border-y border-r border-l-4 border-gray-200 border-l-red-600 shadow-sm bg-[#fafafa]">
        {/* Faint watermark image on the right */}
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Image
            src="/icon/warning_red_bg_light.svg"
            alt="Warning Background"
            width={200}
            height={200}
            className="w-[150px] h-[150px] md:w-[200px] md:h-[200px]"
          />
        </div>

        <CardContent className="p-6 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Image src="/icon/warning_red_light.svg" alt="Warning Icon" width={24} height={24} className="w-6 h-6" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">High-Level Security Alert</h2>
          </div>

          <p className="text-gray-700 font-medium mb-4 leading-relaxed">
            Based on our system analysis, your report is highly likely to be a phishing attempt.
            <br />
            Please note the following:
          </p>

          <ul className="list-disc list-inside space-y-3 font-medium text-gray-800 mb-8 pl-1">
            <li>Never click on the provided link.</li>
            <li>Never give your OTP, PIN, or password to anyone.</li>
            <li>Block the sender's number on your device.</li>
          </ul>

          <Button className="bg-[#7a1b1b]! hover:bg-[#631616]! text-white py-6 px-6 text-sm md:text-base font-bold rounded-xl shadow-md shadow-red-100 transition-all active:scale-[0.98] border-none cursor-pointer">
            <BookOpen className="w-5 h-5 mr-3" />
            Learn About This Phishing Method
          </Button>
        </CardContent>
      </Card>

      {/* Ticket Details & Handling Status Card */}
      <Card className="rounded-xl border-x border-b border-t-8 border-gray-200 border-t-red-600 shadow-sm bg-[#fafafa]">
        <CardContent className="p-6 md:p-8 space-y-6">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            <div className="space-y-4">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Ticket Details</h2>
              <div className="flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
                  <Ticket className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-semibold text-gray-700">TKT-CIMB-6666</span>
                </div>
                <div className="inline-flex items-center gap-2 bg-red-300 rounded-lg px-3 py-1.5 shadow-sm">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-bold">4 Apr 2026, 14:45</span>
                </div>
              </div>
            </div>

            {/* Risk Badge */}
            <div className="flex flex-row items-center gap-3 border-2 border-red-700 rounded-full px-5 py-1 bg-white shadow-[inset_0_3px_10px_rgba(220,38,38,0.25)]">
              <Image src="/icon/warning_red_light.svg" alt="Warning" width={36} height={36} className="w-9 h-9 shrink-0" />
              <div className="flex flex-col">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wider">High Risk</p>
                <p className="text-2xl font-black text-red-600 leading-tight">95/100</p>
              </div>
            </div>
          </div>

          <div className="border-t border-red-600 w-full" />

          {/* Handling Status Timeline */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Handling Status</h3>

            <div className="relative grid grid-cols-4 gap-4 px-2">
              {/* Connector Line Background */}
              <div className="absolute top-6 left-[12.5%] right-[12.5%] h-[2px] bg-gray-200 z-0" />

              {handlingStatusSteps.map((step) => (
                <div key={step.id} className="relative flex flex-col items-center text-center z-10">
                  {/* Step Icon Generator based on status */}
                  <div className="flex items-center justify-center bg-[#fafafa] w-12 h-12 mb-4">
                    {step.status === "completed" && (
                      <div className="w-10 h-10 bg-white rounded-full border border-gray-300 flex items-center justify-center z-10">
                        <Check className="w-5 h-5 text-gray-400 stroke-[3px]" />
                      </div>
                    )}
                    {step.status === "active" && (
                      <div className="w-12 h-12 rounded-full border-2 border-gray-900 flex items-center justify-center shadow-md bg-white z-10">
                        <Circle className="w-8 h-8 text-black" fill="transparent" />
                      </div>
                    )}
                    {step.status === "pending" && (
                      <div className="w-8 h-8 bg-white rounded-full border border-gray-300 flex items-center justify-center z-10">
                        <div className="w-2 h-2 bg-gray-300 rounded-full" />
                      </div>
                    )}
                  </div>

                  <p className={`text-base font-semibold mb-1 ${step.status === "active" ? "text-gray-900" : "text-gray-400"}`}>{step.title}</p>
                  <p className={`text-xs max-w-[120px] ${step.status === "active" ? "text-gray-700 font-medium" : "text-gray-400"}`}>
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ML Engine Analysis Box */}
          <div className="bg-[#f0f0f0] rounded-xl border border-gray-200 p-6 md:p-8 space-y-6 shadow-inset-sm">
            <div className="flex items-center gap-3">
              <ShieldAlert className="w-8 h-8 text-gray-900" />
              <h3 className="text-xl font-bold text-gray-900">ML Engine Analysis Results</h3>
            </div>

            <div className="space-y-2">
              {mlEngineResults.map((result, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="mt-0.5">
                    <AlertCircle className="w-5 h-5 text-red-900" />
                  </div>
                  <p className="text-gray-700 text-xs md:text-base font-medium leading-relaxed">{result}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
