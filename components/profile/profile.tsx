"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/useAuthStore";
import { User, Mail, Shield, Edit3, Key, BadgeCheck } from "lucide-react";

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

  return (
    <div className="w-full md:w-4/5 lg:w-3/4 my-4 md:my-6 md:m-auto px-4 md:px-6 space-y-4 md:space-y-6 pb-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Profile Settings</h1>
      </div>

      {/* Main Profile Card */}
      <div className="w-full bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-900 rounded-3xl shadow-2xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden group">
        
        {/* Stunning Banner */}
        <div className="h-24 md:h-32 w-full bg-linear-to-r from-red-600 via-[#E22E2E] to-red-400 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-white/20 rounded-full blur-3xl"></div>
          <div className="absolute -top-8 -left-8 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
        </div>

        <div className="px-6 pb-6 md:px-8 md:pb-8 relative z-10 -mt-12 md:-mt-16">
          {/* Profile Header (Avatar overlaps banner) */}
          <div className="flex justify-between items-end gap-4">
            
            {/* Avatar */}
            <div className="relative h-24 w-24 md:h-32 md:w-32 shrink-0 overflow-hidden rounded-full border-4 border-white dark:border-gray-950 shadow-xl bg-white dark:bg-gray-900 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
              <div className="w-full h-full bg-linear-to-br from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-900/10 flex items-center justify-center">
                <span className="text-3xl md:text-5xl font-extrabold text-red-600 dark:text-red-400 select-none tracking-tighter">{initials}</span>
              </div>
            </div>

            {/* Top Action Button - Edit (Desktop) */}
            <div className="hidden md:block mb-3">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-semibold h-10 rounded-xl border-gray-200 dark:border-gray-800 transition-all shadow-sm hover:shadow-md"
              >
                <Edit3 className="w-4 h-4" />
                Edit Profile
              </Button>
            </div>
          </div>
            
          {/* Name and Role Section */}
          <div className="mt-3 md:mt-4 space-y-1 text-center md:text-left">
            <h2 className="text-xl md:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-2 md:gap-3">
              {fullName}
              {user.is_verified && (
                <BadgeCheck className="w-5 h-5 md:w-7 md:h-7 text-blue-500 dark:text-blue-400 drop-shadow-sm" />
              )}
            </h2>
            
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-3 mt-1.5">
              {user.is_verified && (
                <>
                  <span className="inline-flex items-center gap-1.5 text-[10px] md:text-xs text-green-700 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200/50 dark:border-green-800/50 shadow-sm">
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    Verified
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="w-full h-px bg-gray-100 dark:bg-gray-800/80 my-5 md:my-6"></div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {/* First Name */}
            <div className="bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl md:rounded-2xl p-4 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 group/field relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E22E2E] scale-y-0 group-hover/field:scale-y-100 origin-top transition-transform duration-300"></div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 bg-white dark:bg-gray-950 rounded-md md:rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover/field:border-red-200 dark:group-hover/field:border-red-900/50 transition-colors">
                  <User className="w-3.5 h-3.5 text-gray-400 group-hover/field:text-[#E22E2E] transition-colors" />
                </div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">First Name</p>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pl-1">{user.firstname}</p>
            </div>

            {/* Last Name */}
            <div className="bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl md:rounded-2xl p-4 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 group/field relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E22E2E] scale-y-0 group-hover/field:scale-y-100 origin-top transition-transform duration-300"></div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 bg-white dark:bg-gray-950 rounded-md md:rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover/field:border-red-200 dark:group-hover/field:border-red-900/50 transition-colors">
                  <User className="w-3.5 h-3.5 text-gray-400 group-hover/field:text-[#E22E2E] transition-colors" />
                </div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Last Name</p>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pl-1">{user.lastname}</p>
            </div>

            {/* Email Address */}
            <div className="bg-gray-50/50 dark:bg-gray-900/30 border border-gray-100 dark:border-gray-800 rounded-xl md:rounded-2xl p-4 hover:bg-white dark:hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-none hover:-translate-y-1 transition-all duration-300 group/field relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E22E2E] scale-y-0 group-hover/field:scale-y-100 origin-top transition-transform duration-300"></div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-1.5 bg-white dark:bg-gray-950 rounded-md md:rounded-lg shadow-sm border border-gray-100 dark:border-gray-800 group-hover/field:border-red-200 dark:group-hover/field:border-red-900/50 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-gray-400 group-hover/field:text-[#E22E2E] transition-colors" />
                </div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest">Email Address</p>
              </div>
              <p className="text-base md:text-lg font-semibold text-gray-900 dark:text-white pl-1 break-all">{user.email}</p>
            </div>

          </div>

          {/* Action Buttons (Mobile + Extra Actions) */}
          <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            <Button 
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#E22E2E] hover:bg-[#C92222] text-white font-semibold text-xs md:text-sm px-6 md:px-8 h-10 md:h-11 rounded-xl transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/40 hover:-translate-y-0.5 border-none"
            >
              <Key className="w-4 h-4" />
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto md:hidden flex items-center justify-center gap-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-semibold h-10 rounded-xl border-gray-200 dark:border-gray-800 transition-all shadow-sm"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
