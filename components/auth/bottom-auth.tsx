import React from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import Link from "next/link";

export default function BottomAuth() {
  return (
    <div>
      {/* Oauth Button */}
      <div className="flex flex-col">
        <p className="mt-4 mb-4 text-center text-black">Or continue with</p>
        <Button className="w-full mb-3 bg-white hover:bg-gray-50! text-xs text-black! py-4 px-6 rounded-full border border-gray-200 shadow-sm transition-all active:scale-[0.98] cursor-pointer font-medium flex items-center justify-center gap-3">
          <FcGoogle className="size-6" />
          Sign up with Google
        </Button>
        <Button className="w-full bg-white hover:bg-gray-50! text-xs text-black! py-4 px-6 rounded-full border border-gray-200 shadow-sm transition-all active:scale-[0.98] cursor-pointer font-medium flex items-center justify-center gap-3">
          <FaApple className="size-6" />
          Sign up with Apple
        </Button>
      </div>
    </div>
  );
}
