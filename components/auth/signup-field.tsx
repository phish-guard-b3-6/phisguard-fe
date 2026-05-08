"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signupSchema, SignupFormValues } from "@/schemas/auth";
import { Field, FieldContent, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Undo2 } from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import BottomAuth from "@/components/auth/bottom-auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { toast } from "sonner";
import { RegisterPayload } from "@/lib/types/auth";

export default function SignupField() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      isAffiliated: true,
    },
  });

  // Mutation tanstack ───────────────────────────────────────────────────────────────
  const { mutate: registerMutation, isPending: isSubmitting } = useMutation({
    mutationFn: (payload: RegisterPayload) => axiosInstance.post("/users/register", payload),
    onSuccess: () => {
      toast.success("Akun berhasil dibuat!", {
        description: "Silakan login untuk melanjutkan.",
      });
      router.push("/signin");
    },
    onError: (err: unknown) => {
      // Axios membungkus response backend di dalam err.response.data
      // Tanpa ini, kita hanya mendapat pesan generic "Request failed with status code 400"
      const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message ?? "Terjadi kesalahan, coba lagi nanti.";
      toast.error("Gagal membuat akun", { description: message });
    },
  });

  const onSubmit = (data: SignupFormValues) => {
    console.log(data.firstname);
    console.log(data.lastname);
    console.log(data.email);
    console.log(data.username);
    console.log(data.password);
    console.log(data.isAffiliated);
    registerMutation({
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      username: data.username,
      password: data.password,
      is_affiliated: data.isAffiliated,
    });
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* Back to home */}
      <div className="flex gap-2 self-start items-center">
        <Undo2 className="h-4 w-4 md:h-6 md:w-6" />
        <p className="text-sm md:text-base">Back to home</p>
      </div>

      {/* Title */}
      <h1 className="text-xl lg:text-3xl font-bold mt-6 mb-10">Join Our Community</h1>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
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
              {...register("firstname")}
            />
            {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname.message}</p>}
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
              {...register("lastname")}
            />
            {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname.message}</p>}
          </Field>
        </div>

        {/* Email Address */}
        <Field className="w-full mb-5 gap-2 lg:gap-3">
          <FieldLabel htmlFor="email" className="flex items-center gap-2 text-sm lg:text-base">
            Email Address
          </FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="name@company.com"
            className="h-8 md:h-12 bg-transparent border-gray-800 text-xs rounded-sm lg:rounded-lg"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </Field>

        {/* Username */}
        <Field className="w-full mb-5 gap-2 lg:gap-3">
          <FieldLabel htmlFor="username" className="flex items-center gap-2 text-sm lg:text-base">
            Username
          </FieldLabel>
          <Input
            id="username"
            type="text"
            placeholder="johndoe123"
            className="h-8 md:h-12 bg-transparent border-gray-800 text-xs rounded-sm lg:rounded-lg"
            {...register("username")}
          />
          {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
        </Field>

        {/* Password Section */}
        <div className="flex flex-row gap-5 md:gap-10 mb-5 w-full">
          <Field className="flex-1 gap-2 lg:gap-3">
            <FieldLabel htmlFor="password" className="flex items-center gap-2 text-sm lg:text-base">
              Password
            </FieldLabel>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                className="h-8 md:h-12 bg-transparent border-gray-800 pr-10 rounded-sm lg:rounded-lg"
                {...register("password")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" /> : <Eye className="h-4 w-4 lg:h-5 lg:w-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </Field>
          <Field className="flex-1 gap-2 lg:gap-3">
            <FieldLabel htmlFor="confirmPassword" className="flex items-center gap-2 text-sm lg:text-base">
              Confirm Password
            </FieldLabel>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="h-8 md:h-12 bg-transparent border-gray-800 pr-10 rounded-sm lg:rounded-lg"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4 lg:h-5 lg:w-5" /> : <Eye className="h-4 w-4 lg:h-5 lg:w-5" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </Field>
        </div>

        {/* CIMB Customer checkbox (is_affiliated) */}
        <div className="w-full mt-2 lg:mt-3 mb-5">
          <FieldGroup className="w-full">
            <Field orientation="horizontal" className="items-center border border-gray-800 p-3 md:p-4 rounded-sm lg:rounded-lg">
              <Controller
                control={control}
                name="isAffiliated"
                render={({ field }) => (
                  <Checkbox id="is-affiliated" checked={field.value} onCheckedChange={field.onChange} className="size-6 rounded-sm lg:rounded-md" />
                )}
              />
              <FieldContent className="flex flex-row items-center justify-between w-full">
                <div>
                  <FieldLabel htmlFor="is-affiliated" className="font-medium mb-1 text-sm lg:text-base">
                    Are you a CIMB Niaga customer?
                  </FieldLabel>
                  <FieldDescription className="mt-0 text-xs">If yes, please check the box.</FieldDescription>
                </div>
              </FieldContent>
            </Field>
          </FieldGroup>
        </div>

        {/* Signup Button */}
        <Button
          type="submit"
          className="w-full bg-red-900! hover:bg-red-800! text-white! py-5 md:py-6 text-base lg:text-lg lg:font-semibold rounded-sm lg:rounded-lg shadow-lg transition-all active:scale-[0.98] cursor-pointer disabled:opacity-60"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="w-full h-px lg:h-[2px] bg-red-500 mt-5 opacity-50"></div>

      {/* OAuth Button */}
      <BottomAuth />

      {/* Sign In link */}
      <p className="mt-6 lg:mt-8 text-center text-black text-sm md:text-base">
        Already have an account?{" "}
        <Link href="/signin" className="text-red-500! font-semibold lg:font-bold hover:underline cursor-pointer">
          Sign in
        </Link>
      </p>
    </div>
  );
}
