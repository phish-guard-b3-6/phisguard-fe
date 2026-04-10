import React from "react";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Eye, Info, Link as LucideLink, Phone, Undo2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import BottomAuth from "@/components/auth/bottom-auth";

export default function SignupField() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-1 self-start">
        <Undo2 />
        <p>Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold my-10">Join Our Community</h1>

      {/* Firstname & Lastname */}
      <div className="flex gap-10 mb-5 w-full">
        <Field className="flex-1">
          <FieldLabel htmlFor="firstname" className="flex items-center gap-2">
            First Name
          </FieldLabel>
          <Input id="firstname" type="text" placeholder="First" className="h-12 bg-transparent border-gray-800" />
        </Field>
        <Field className="flex-1">
          <FieldLabel htmlFor="lastname" className="flex items-center gap-2">
            Last Name
          </FieldLabel>
          <Input id="lastname" type="text" placeholder="Last" className="h-12 bg-transparent border-gray-800" />
        </Field>
      </div>

      {/* Email Adress */}
      <Field className="flex-1 mb-5">
        <FieldLabel htmlFor="email" className="flex items-center gap-2">
          Email Address
        </FieldLabel>
        <Input id="email" type="text" placeholder="name@company.com" className="h-12 bg-transparent border-gray-800" />
      </Field>

      {/* Password Section */}
      <div className="flex gap-10 mb-5 w-full">
        <Field className="flex-1">
          <FieldLabel htmlFor="password" className="flex items-center gap-2">
            Password
          </FieldLabel>
          <div className="relative">
            <Input id="password" type="password" className="h-12 bg-transparent border-gray-800 pr-10" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>
        <Field className="flex-1">
          <FieldLabel htmlFor="confirmPassword" role="label" className="flex items-center gap-2">
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Input id="confirmPassword" type="password" className="h-12 bg-transparent border-gray-800 pr-10" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>
      </div>

      {/* Checklist anonymus */}
      <div className="w-full mb-5">
        <FieldGroup className="w-full">
          <Field orientation="horizontal" className="items-center border border-gray-800 p-4 rounded-lg">
            <Checkbox id="terms-checkbox-desc" name="terms-checkbox-desc" className="size-6" defaultChecked />
            <FieldContent className="flex flex-row items-center justify-between w-full">
              <div>
                <FieldLabel htmlFor="terms-checkbox-desc" className="font-medium mb-1">
                  Are you a CIMB Niaga customer?
                </FieldLabel>
                <FieldDescription className="mt-0 text-xs">If yes, please check the box.</FieldDescription>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>

      {/* Signup Button */}
      <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-6 text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
        Sign Up
      </Button>
      <div className="w-full h-[2px] bg-red-500 mt-5 opacity-50"></div>
      {/* Oauth Button */}
      <BottomAuth />

      {/* SignIn Button */}
      <p className="mt-8 text-center text-black">
        Already have an account?{" "}
        <Link href="/login" className="text-red-500! font-bold hover:underline cursor-pointer">
          Sign in
        </Link>
      </p>
    </div>
  );
}
