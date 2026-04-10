import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, Undo2 } from "lucide-react";
import React from "react";

export default function RestField() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-1 self-start">
        <Undo2 />
        <p>Go Back</p>
      </div>
      {/* Title */}
      <h1 className="text-3xl font-bold my-10">Enter New Password</h1>

      {/* Input */}
      <div className="flex flex-col w-9/12">
        {/* Email Adress */}
        <Field className="flex-1 mb-5">
          <FieldLabel htmlFor="password" className="flex items-center gap-2">
            Password
          </FieldLabel>
          <Input id="password" type="text" placeholder="name@company.com" className="h-12 bg-transparent border-gray-800" />
        </Field>

        {/* Password */}
        <Field className="flex-1  mb-5 w-full">
          <FieldLabel htmlFor="confirm password" className="flex items-center gap-2">
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Input id="confirm password" type="password" className="h-12 bg-transparent border-gray-800 pr-10" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>

        {/* Save Button */}
        <div className="w-1/4 ml-auto">
          <Button className="w-full bg-red-900! hover:bg-red-800! text-white! py-6 text-lg font-semibold rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
