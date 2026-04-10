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
    <div>
      {/* Title and Description */}
      <div className="flex flex-col items-center gap-2 my-5 w-full">
        <div className="flex items-center gap-5">
          <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={40} height={40} />
          <h1 className="text-3xl font-bold">CIMB PhishGuard</h1>
        </div>
        <p className="text-lg font-bold text-center w-11/12">
          Machine Learning-Based Phishing Detection System. Report suspicious activity to protect the banking ecosystem.
        </p>
      </div>
      {isSubmitted ? <SubmitReport setIsSubmitted={setIsSubmitted} /> : <CreateNewReport setIsSubmitted={setIsSubmitted} />}
    </div>
  );
}
