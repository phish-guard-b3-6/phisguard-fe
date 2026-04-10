import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

interface SubmitReportProps {
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SubmitReport({ setIsSubmitted }: SubmitReportProps) {
  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <Card className="w-full max-w-lg border-none shadow-xl rounded-[2rem] p-6 md:p-8 bg-white">
        <CardContent className="flex flex-col items-center text-center p-0 space-y-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center h-20 w-20 bg-green-100 rounded-full">
            <CheckCircle className="h-12 w-12 text-[#22c55e] stroke-[1.5px]" />
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Report Submitted</h2>
            <p className="text-base text-gray-500 font-medium px-2">Thank you for helping secure the CIMB Niaga community.</p>
          </div>

          {/* Inner Ticket Card */}
          <div className="w-full bg-[#f8f9fa] border border-gray-100 rounded-[1.2rem] p-6 space-y-5">
            <div className="space-y-1">
              <p className="text-gray-400 font-semibold text-xs tracking-wide uppercase">Ticket ID</p>
              <h3 className="text-2xl font-extrabold text-[#1a1a1a] tracking-tight">TKT-CIMB-6664</h3>
              <p className="text-[10px] text-gray-400 font-medium">Save this ID to check your report status later using the search bar.</p>
            </div>

            <Separator className="bg-gray-200 h-px" />

            <div className="space-y-3">
              <p className="text-gray-600 font-bold text-xs tracking-wide uppercase">Initial Risk Score</p>

              <div className="inline-flex flex-col items-center justify-center bg-white border border-gray-100 rounded-[1.5rem] px-8 py-3 shadow-sm">
                <p className="text-[10px] font-extrabold text-[#22c55e] uppercase tracking-wider">Low Risk</p>
                <p className="text-3xl font-black text-[#22c55e]">35/100</p>
              </div>

              <p className="text-[10px] text-gray-400 font-medium">Score &gt; 70 indicates high probability of phishing.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full pt-2">
            <Button
              className="flex-1 bg-[#7a1b1b]! hover:bg-[#631616]! text-white py-5 h-auto text-sm font-bold rounded-xl shadow-md shadow-red-100 transition-all active:scale-[0.98] border-none cursor-pointer"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Report
            </Button>
            <Link href="/report-status/TKT-CIMB-6664" className="flex-1">
              <Button
                variant="secondary"
                className="w-full bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] py-5 h-auto text-sm font-bold rounded-xl transition-all active:scale-[0.98] border-none cursor-pointer shadow-sm"
              >
                Login to View Full Analysis
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
