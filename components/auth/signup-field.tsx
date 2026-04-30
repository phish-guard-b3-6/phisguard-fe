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
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl lg:text-3xl font-bold mt-6 mb-10">Join Our Community</h1>

      {/* Firstname & Lastname */}
      <div className="flex md:flex-row gap-5 md:gap-10 mb-5 w-full">
        <Field className="flex-1 gap-2 lg:gap-3">
          <FieldLabel htmlFor="firstname" className="flex items-center gap-2 text-sm lg:text-base">
            First Name
          </FieldLabel>
          <Input
            id="firstname"
            type="text"
            placeholder="First"
            className="h-8 md:h-12 bg-transparent border-gray-800 text-xs lg:text-base rounded-sm lg:rounded-lg"
          />
        </Field>
        <Field className="flex-1 gap-2 lg:gap-3">
          <FieldLabel htmlFor="lastname" className="flex items-center gap-2 text-sm lg:text-base">
            Last Name
          </FieldLabel>
          <Input
            id="lastname"
            type="text"
            placeholder="Last"
            className="h-8 md:h-12 bg-transparent border-gray-800 text-xs lg:text-base rounded-sm lg:rounded-lg"
          />
        </Field>
      </div>

      {/* Email Adress */}
      <Field className="w-full mb-5 gap-2 lg:gap-3">
        <FieldLabel htmlFor="email" className="flex items-center gap-2 text-sm lg:text-base">
          Email Address
        </FieldLabel>
        <Input
          id="email"
          type="text"
          placeholder="name@company.com"
          className="h-8 md:h-12 bg-transparent border-gray-800 text-xs rounded-sm lg:rounded-lg"
        />
      </Field>

      {/* Password Section */}
      <div className="flex flex-row gap-5 md:gap-10 mb-5 w-full">
        <Field className="flex-1 gap-2 lg:gap-3">
          <FieldLabel htmlFor="password" className="flex items-center gap-2 text-sm lg:text-base">
            Password
          </FieldLabel>
          <div className="relative">
            <Input id="password" type="password" className="h-8 md:h-12 bg-transparent border-gray-800 pr-10 rounded-sm lg:rounded-lg" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>
        <Field className="flex-1 gap-2 lg:gap-3">
          <FieldLabel htmlFor="confirmPassword" role="label" className="flex items-center gap-2 text-sm lg:text-base">
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Input id="confirmPassword" type="password" className="h-8 md:h-12 bg-transparent border-gray-800 pr-10 rounded-sm lg:rounded-lg" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>
      </div>

      {/* Checklist anonymus */}
      <div className="w-full mt-2 lg:mt-3 mb-5">
        <FieldGroup className="w-full">
          <Field orientation="horizontal" className="items-center border border-gray-800 p-3 md:p-4 rounded-sm lg:rounded-lg">
            <Checkbox id="terms-checkbox-desc" name="terms-checkbox-desc" className="size-6 rounded-sm lg:rounded-md" defaultChecked />
            <FieldContent className="flex flex-row items-center justify-between w-full">
              <div>
                <FieldLabel htmlFor="terms-checkbox-desc" className="font-medium mb-1 text-sm lg:text-base">
                  Are you a CIMB Niaga customer?
                </FieldLabel>
                <FieldDescription className="mt-0 text-xs">If yes, please check the box.</FieldDescription>
              </div>
            </FieldContent>
          </Field>
        </FieldGroup>
      </div>

      {/* Signup Button */}
      <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 md:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
        Sign Up
      </Button>
      <div className="w-full h-px lg:h-[2px] bg-red-500 mt-5 opacity-50"></div>

      {/* Oauth Button */}
      <BottomAuth />

      {/* SignIn Button */}
      <p className="mt-6 lg:mt-8 text-center text-black text-sm md:text-base">
        Already have an account?{" "}
        <Link href="/login" className="text-red-500! font-semibold lg:font-bold hover:underline cursor-pointer">
          Sign in
        </Link>
      </p>
    </div>
  );
}
