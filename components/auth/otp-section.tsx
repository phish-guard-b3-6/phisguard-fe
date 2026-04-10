"use client";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import React from "react";
import { Label } from "@/components/ui/label";
import { Field, FieldLabel } from "@/components/ui/field";
import { REGEXP_ONLY_DIGITS } from "input-otp";

export default function OTPSection() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-1 self-start">
        <Undo2 />
        <p>Go Back</p>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold mt-10">Enter OTP Code</h1>
      <p className="mb-10">We've sent an email with your code to your email</p>

      {/* Input */}
      <div className="flex flex-col gap-10 w-8/12">
        {/* OTP */}
        <div className="space-y-4">
          <Field className="w-fit">
            <FieldLabel htmlFor="otp">OTP</FieldLabel>
            <InputOTP id="otp" maxLength={6}>
              <InputOTPGroup className="gap-8">
                <InputOTPSlot index={0} className="rounded-sm border-black size-14 text-xl" />
                <InputOTPSlot index={1} className="rounded-sm border-black size-14 text-xl" />
                <InputOTPSlot index={2} className="rounded-sm border-black size-14 text-xl" />
                <InputOTPSlot index={3} className="rounded-sm border-black size-14 text-xl" />
                <InputOTPSlot index={4} className="rounded-sm border-black size-14 text-xl" />
                <InputOTPSlot index={5} className="rounded-sm border-black size-14 text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <div className="flex gap-2 text-sm">
            <span>Resend Code</span>
            <span className="font-bold">00:59</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-6 text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
          Submit
        </Button>
      </div>
    </div>
  );
}
