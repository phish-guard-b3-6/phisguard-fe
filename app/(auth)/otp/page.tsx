import LandingImage from "@/components/auth/landing-image";
import OTPSection from "@/components/auth/otp-section";
import React from "react";

export default function OTP() {
  return (
    <div className="flex h-screen p-8 md:p-10 justify-center items-start lg:items-stretch overflow-x-hidden">
      <div className="w-full flex justify-center lg:justify-start lg:gap-20">
        {/* Input */}
        <div className="w-full lg:flex-3">
          <OTPSection />
        </div>
        {/* CIMB Image */}
        <div className="hidden lg:block lg:flex-4 h-full">
          <LandingImage />
        </div>
      </div>
    </div>
  );
}
