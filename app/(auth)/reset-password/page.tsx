import LandingImage from "@/components/auth/landing-image";
import ResetField from "@/components/auth/reset-field";
import React from "react";

export default function ResetPassword() {
  return (
    <div className="flex h-screen p-8 md:p-10 justify-center items-start lg:items-stretch">
      <div className="w-full flex justify-center lg:justify-start lg:gap-20">
        {/* Input */}
        <div className="w-full lg:flex-3">
          <ResetField />
        </div>
        {/* CIMB Image */}
        <div className="hidden lg:block lg:flex-4 h-full">
          <LandingImage />
        </div>
      </div>
    </div>
  );
}
