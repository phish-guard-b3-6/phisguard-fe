"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Undo2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import BottomAuth from "@/components/auth/bottom-auth";
import { useAuthStore } from "@/stores/useAuthStore";

// ─── Zod Schema ────────────────────────────────────────────────
const signinSchema = z.object({
  email: z.string().min(1, "Email wajib diisi.").email("Format email tidak valid."),
  password: z.string().min(1, "Password wajib diisi.").min(8, "Password minimal 8 karakter."),
});

type SigninFormValues = z.infer<typeof signinSchema>;

// ───────────────────────────────────────────────────────────────

export default function SigninField() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormValues>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormValues) => {
    setIsLoading(true);
    setServerError("");

    try {
      // Hanya urus login — ambil role dari response /login

      //======================= Buat testing aja =======================
      // const loginRes = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email: data.email, password: data.password }),
      //   credentials: "include",
      // });

      // if (!loginRes.ok) {
      //   const err = await loginRes.json();
      //   throw new Error(err.message || "Email atau password salah.");
      // }

      // const loginData = await loginRes.json();
      // const role = loginData.users?.role;

      // Redirect berdasarkan role — layout tujuan akan fetch /me sendiri
      // Di dalam onSubmit (untuk testing)

      //======================= Buat testing aja =======================
      const testRole = "user" as "user" | "admin";
      const setUser = useAuthStore.getState().setUser({
        userID: "dummy-id",
        firstname: "Mark",
        lastname: "Doe",
        email: "mark@example.com",
        is_verified: true,
        role: testRole,
      });

      router.push(testRole === "admin" ? "/dashboard" : "/new-report");
    } catch (err: any) {
      setServerError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl lg:text-3xl font-bold mt-6 mb-10">Sign In and Stop Threats</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full lg:w-9/12">
        {/* Email */}
        <Field className="flex-1 mb-5">
          <FieldLabel htmlFor="email" className="flex items-center gap-2 text-sm lg:text-base">
            Email Address
          </FieldLabel>
          <Input
            id="email"
            type="text"
            placeholder="name@company.com"
            className="h-8 md:h-12 bg-transparent border-gray-800 rounded-sm lg:rounded-lg text-xs lg:text-base"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </Field>

        {/* Password */}
        <Field className="flex-1 mb-5 w-full">
          <FieldLabel htmlFor="password" className="flex items-center gap-2 text-sm lg:text-base">
            Password
          </FieldLabel>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="h-8 md:h-12 bg-transparent border-gray-800 rounded-sm lg:rounded-lg pr-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
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

        {/* Server Error */}
        {serverError && <p className="text-red-600 text-sm text-center mb-3">{serverError}</p>}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 md:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>
      </form>

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
