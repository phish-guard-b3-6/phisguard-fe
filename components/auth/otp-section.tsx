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
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl lg:text-3xl font-bold mt-6">Enter OTP Code</h1>
      <p className="mb-10 text-[10px] lg:text-base">We've sent an email with your code to your email</p>

      {/* Input */}
      <div className="flex flex-col gap-10 w-full lg:w-8/12 items-center">
        {/* OTP */}
        <div className="space-y-8 lg:space-y-4">
          <Field className="w-fit">
            <FieldLabel htmlFor="otp" className="text-xs lg:text-base">
              OTP
            </FieldLabel>
            <InputOTP id="otp" maxLength={6}>
              <InputOTPGroup className="gap-4 md:gap-8 w-full justify-start">
                <InputOTPSlot index={0} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
                <InputOTPSlot index={1} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
                <InputOTPSlot index={2} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
                <InputOTPSlot index={3} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
                <InputOTPSlot index={4} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
                <InputOTPSlot index={5} className="rounded-sm border-gray-500 lg:border-black size-10 md:size-14 text-lg lg:text-xl" />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <div className="flex gap-2 text-xs lg:text-sm">
            <span>Resend Code</span>
            <span className="font-semibold lg:font-bold">00:59</span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="w-1/4 md:w-3/4 lg:w-full ml-auto md:ml-0 mt-4">
          <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 lg:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
