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
    <div className="flex flex-col items-center justify-center w-full py-4">
      <Card className="w-full border-none shadow-xl rounded-xl md:rounded-2xl p-6 lg:p-8 bg-white">
        <CardContent className="flex flex-col items-center text-center p-0 space-y-6">
          {/* Success Icon */}
          <div className="flex items-center justify-center h-14 w-14 md:h-16 md:w-16 lg:h-20 lg:w-20 bg-green-100 rounded-full">
            <CheckCircle className="h-6 w-6 md:h-12 md:w-12 text-[#22c55e] stroke-[1.5px]" />
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 tracking-tight">Report Submitted</h2>
            <p className="text-[8px] md:text-sm font-medium px-2">Thank you for helping secure the CIMB Niaga community.</p>
          </div>

          {/* Inner Ticket Card */}
          <div className="w-full md:w-3/4 lg:w-1/2 bg-[#f8f9fa] border border-gray-100 rounded-xl md:rounded-2xl px-3 md:px-6 py-3 md:py-6 space-y-2">
            <div className="space-y-1 md:space-y-3">
              <p className="text-[10px] md:text-sm tracking-wide uppercase font-heading">Ticket ID</p>
              <h3 className="text-sm md:text-2xl font-bold text-[#1a1a1a] tracking-tight">TKT-CIMB-6664</h3>
              <p className="text-[8px] md:text-xs font-light">Save this ID to check your report status later using the search bar.</p>
            </div>

            <Separator className="bg-black my-2 md:my-5" />

            <div className="space-y-1 md:space-y-3">
              <p className="text-[10px] md:text-sm tracking-wide uppercase">Initial Risk Score</p>

              <div className="inline-flex flex-col items-center justify-center bg-white border border-gray-100 rounded-3xl px-4 md:px-8 py-1 md:py-3 shadow-sm">
                <p className="text-[7px] md:text-[10px] text-[#22c55e] uppercase tracking-wider">Low Risk</p>
                <p className="text-sm md:text-3xl text-[#22c55e] font-semibold">35/100</p>
              </div>

              <p className="text-[8px] md:text-xs font-light mt-2">Score &gt; 70 indicates high probability of phishing.</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 md:w-3/4 lg:w-1/2 pt-2">
            <Button
              className="flex-1 w-full bg-[#7a1b1b]! hover:bg-[#631616]! text-white py-3 h-auto text-[10px] md:text-sm rounded-md md:rounded-xl shadow-md shadow-red-100 transition-all active:scale-[0.98] border-none cursor-pointer"
              onClick={() => setIsSubmitted(false)}
            >
              Submit Another Report
            </Button>
            <Link href="/signin" className="flex-1 w-full">
              <Button
                variant="secondary"
                className="w-full bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#166534] py-3 h-auto text-[10px] md:text-sm rounded-md md:rounded-xl transition-all active:scale-[0.98] border-none cursor-pointer shadow-sm"
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
