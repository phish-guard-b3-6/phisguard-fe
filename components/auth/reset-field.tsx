import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, Undo2 } from "lucide-react";
import React from "react";

export default function RestField() {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-3xl font-bold mt-6 mb-10">Enter New Password</h1>

      {/* Input */}
      <div className="flex flex-col w-full lg:w-9/12">
        {/* Email Adress */}
        <Field className="flex-1 mb-5">
          <FieldLabel htmlFor="password" className="flex items-center gap-2 text-sm lg:text-base">
            Password
          </FieldLabel>
          <Input
            id="password"
            type="text"
            placeholder="name@company.com"
            className="h-8 md:h-12 bg-transparent border-gray-800 text-xs lg:text-base rounded-sm lg:rounded-lg"
          />
        </Field>

        {/* Password */}
        <Field className="flex-1  mb-5 w-full">
          <FieldLabel htmlFor="confirm password" className="flex items-center gap-2 text-sm lg:text-base">
            Confirm Password
          </FieldLabel>
          <div className="relative">
            <Input id="confirm password" type="password" className="h-8 md:h-12 bg-transparent border-gray-800 pr-10 rounded-sm lg:rounded-lg" />
            <Eye className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 lg:h-5 lg:w-5 text-gray-400 cursor-pointer" />
          </div>
        </Field>

        {/* Save Button */}
        <div className="w-1/5 ml-auto">
          <Button className="w-full bg-red-900! hover:bg-red-800! text-white! p-5 lg:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
