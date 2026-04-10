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
      <div className="flex gap-1 self-start">
        <Undo2 />
        <p>Back to home</p>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold my-10">Sign In and Stop Threats</h1>

      {/* Input */}
      <div className="flex flex-col w-9/12">
        {/* Email Adress */}
        <Field className="flex-1 mb-5">
          <FieldLabel htmlFor="email" className="flex items-center gap-2">
            Email Address
          </FieldLabel>
          <Input id="email" type="text" placeholder="name@company.com" className="h-12 bg-transparent border-gray-800" />
        </Field>

        {/* Password */}
        <Field className="flex-1  mb-5 w-full">
          <FieldLabel htmlFor="password" className="flex items-center gap-2">
            Password
          </FieldLabel>
          <div className="relative">
            <Input id="password" type="password" className="h-12 bg-transparent border-gray-800 pr-10" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>

        {/* Signin Button */}
        <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-6 text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
          Sign In
        </Button>
      </div>

      <div className="w-full h-[2px] bg-red-500 mt-5 opacity-50"></div>

      {/* Oauth Button */}
      <BottomAuth />

      {/* SignUp Button */}
      <p className="mt-8 text-center text-black">
        Not a member?{" "}
        <Link href="/login" className="text-red-500! font-bold hover:underline cursor-pointer">
          Sign up
        </Link>
      </p>
    </div>
  );
}
