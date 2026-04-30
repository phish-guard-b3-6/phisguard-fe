import React from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Eye, Info, Link as LucideLink, Phone, Undo2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import BottomAuth from "@/components/auth/bottom-auth";

export default function SigninField() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl lg:text-3xl font-bold mt-6 mb-10">Sign In and Stop Threats</h1>

      {/* Input */}
      <div className="flex flex-col w-full lg:w-9/12">
        {/* Email Adress */}
        <Field className="flex-1 mb-5">
          <FieldLabel htmlFor="email" className="flex items-center gap-2 text-sm lg:text-base">
            Email Address
          </FieldLabel>
          <Input
            id="email"
            type="text"
            placeholder="name@company.com"
            className="h-8 md:h-12 bg-transparent border-gray-800 rounded-sm lg:rounded-lg text-xs lg:text-base"
          />
        </Field>

        {/* Password */}
        <Field className="flex-1 mb-5 w-full">
          <FieldLabel htmlFor="password" className="flex items-center gap-2 text-sm lg:text-base">
            Password
          </FieldLabel>
          <div className="relative">
            <Input id="password" type="password" className="h-8 md:h-12 bg-transparent border-gray-800 rounded-sm lg:rounded-lg pr-10" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>

        {/* Remember Me & Forgot Password */}
        <div className="flex w-full items-center justify-between mb-5 px-1">
          <label htmlFor="remember-me" className="flex items-center gap-2 cursor-pointer">
            <Checkbox id="remember-me" className="size-4 rounded-[3px] border-gray-400" />
            <span className="text-xs md:text-sm text-black">Remember me</span>
          </label>
          <Link href="/forgot-password" className="text-xs md:text-sm text-black hover:underline">
            Forgot Password
          </Link>
        </div>

        {/* Signin Button */}
        <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 md:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
          Sign In
        </Button>
      </div>

      <div className="w-full h-[2px] bg-red-500 mt-5 opacity-50"></div>

      {/* Oauth Button */}
      <BottomAuth />

      {/* SignUp Button */}
      <p className="mt-6 lg:mt-8 text-center text-black text-sm md:text-base">
        Not a member?{" "}
        <Link href="/login" className="text-red-500! font-semibold lg:font-bold hover:underline cursor-pointer">
          Sign up
        </Link>
      </p>
    </div>
  );
}
