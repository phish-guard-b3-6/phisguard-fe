import LandingImage from "@/components/auth/landing-image";
import ResetField from "@/components/auth/reset-field";
import React from "react";

export default function ResetPassword() {
  return (
    <div className="flex h-screen p-10 justify-center">
      <div className="w-full flex gap-20">
        {/* Input */}
        <div className="flex-3">
          <ResetField />
        </div>
        {/* CIMB Image */}
        <div className="flex-4 h-full">
          <LandingImage />
        </div>
      </div>
    </div>
  );
}
