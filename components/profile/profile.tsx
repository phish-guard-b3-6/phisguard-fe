"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export default function ProfileSection() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  // Skeleton while data not yet available
  if (!isAuthenticated || !user) {
    return (
      <div className="w-full md:w-3/4 lg:w-3/5 my-5 md:m-auto px-6 space-y-8 pb-10 animate-pulse">
        <div className="h-7 w-40 bg-gray-200 rounded" />
        <div className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-10">
          <div className="flex items-center gap-6">
            <div className="h-28 w-28 rounded-full bg-gray-200 shrink-0" />
            <div className="space-y-3">
              <div className="h-5 w-36 bg-gray-200 rounded" />
              <div className="h-4 w-24 bg-gray-100 rounded" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2 pb-2 border-b border-gray-100">
                <div className="h-3 w-16 bg-gray-100 rounded" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const fullName = `${user.firstname} ${user.lastname}`.trim();
  // Generate avatar initials fallback
  const initials = `${user.firstname.charAt(0)}${user.lastname.charAt(0)}`.toUpperCase();
  const roleLabel = user.role === "admin" ? "CIMB Niaga Admin" : "CIMB Niaga Customer";

  return (
    <div className="w-full md:w-3/4 lg:w-3/5 my-5 md:m-auto px-6 space-y-8 pb-10">
      {/* Title */}
      <h1 className="text-lg md:text-2xl font-bold text-black">User Profile</h1>

      {/* Main Profile Card */}
      <div className="w-full bg-transparent md:bg-white md:border md:border-gray-200 rounded-2xl md:shadow-sm p-0 md:p-8">
        <div className="p-0 space-y-8 md:space-y-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Avatar — initials fallback, no broken external image */}
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full md:border-2 md:border-gray-100 md:shadow-md bg-red-100 flex items-center justify-center">
              <span className="text-3xl font-bold text-red-600 select-none">{initials}</span>
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">{fullName}</h2>
              <p className="text-xs md:text-sm text-gray-500">{roleLabel}</p>
              {user.is_verified && (
                <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">
                  ✓ Verified
                </span>
              )}
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 md:gap-y-8">
            {/* First Name */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">First Name</p>
              <p className="text-sm md:text-sm break-all">{user.firstname}</p>
            </div>

            {/* Last Name */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Last Name</p>
              <p className="text-sm md:text-sm break-all">{user.lastname}</p>
            </div>

            {/* Email */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Email</p>
              <p className="text-sm md:text-sm break-all">{user.email}</p>
            </div>

            {/* Role */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Role</p>
              <p className="text-sm md:text-sm capitalize">{user.role}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6">
            <Button
              variant="secondary"
              className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold md:text-sm px-8 md:h-10 rounded-lg border-none transition-all active:scale-95"
            >
              Edit Profile
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold md:text-sm px-8 md:h-10 rounded-lg transition-all active:scale-95 border-none">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
