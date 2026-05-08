"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import CreateNewReport from "@/components/new-report/create-new-report";
import SubmitReport from "@/components/new-report/submit-report";

export default function ReportFlow() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isSubmitted]);

  return (
    <div className="w-full md:w-auto">
      {/* Title and Description */}
      <div className="hidden md:flex flex-col items-center gap-2 w-full">
        <div className="flex items-center gap-5">
          <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={40} height={40} className="md:w-10 md:h-10 lg:w-16 lg:h-16" />
          <h1 className="text-2xl lg:text-3xl font-bold">CIMB PhishGuard</h1>
        </div>
        <p className="flex text-sm lg:text-lg font-bold text-center w-11/12 lg:w-2/3">
          Machine Learning-Based Phishing Detection System. Report suspicious activity to protect the banking ecosystem.
        </p>
      </div>
      {isSubmitted ? <SubmitReport setIsSubmitted={setIsSubmitted} /> : <CreateNewReport setIsSubmitted={setIsSubmitted} />}
    </div>
  );
}
