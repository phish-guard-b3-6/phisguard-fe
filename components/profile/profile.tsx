import React from "react";
import { Button } from "@/components/ui/button";

export default function ProfileSection() {
  return (
    <div className="w-full md:w-3/4 lg:w-2/5 my-5 md:m-auto px-6 space-y-8">
      {/* Title */}
      <h1 className="text-lg md:text-3xl font-bold text-black">User Profile</h1>

      {/* Main Profile Card */}
      <div className="w-full bg-transparent md:bg-white md:border md:border-gray-200 rounded-2xl md:shadow-sm p-0 md:p-8">
        <div className="p-0 space-y-8 md:space-y-12">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative h-28 w-2h-28 md:h-30 md:w-30 overflow-hidden rounded-full md:border-2 md:border-gray-100 md:shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250"
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1 text-center md:text-left">
              <h2 className="text-lg md:text-2xl font-bold tracking-tight text-gray-900">Rina Gunawan</h2>
              <p className="text-xs md:text-base">CIMB Niaga Customers</p>
            </div>
          </div>
          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 md:gap-y-10">
            {/* Username */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Username</p>
              <p className="text-sm md:text-base break-all">rinaGun</p>
            </div>

            {/* Email */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Email</p>
              <p className="text-sm md:text-base break-all">rina.gunawan@example.com</p>
            </div>

            {/* First Name */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">First Name</p>
              <p className="text-sm md:text-base break-all">Rina</p>
            </div>

            {/* Last Name */}
            <div className="space-y-2 pb-2 border-b border-red-300">
              <p className="text-[10px] md:text-sm font-light">Last Name</p>
              <p className="text-sm md:text-base break-all">Gunawan</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-6">
            <Button
              variant="secondary"
              className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold md:text-base px-8 md:h-12 rounded-lg border-none transition-all active:scale-95"
            >
              Edit Profile
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold md:text-base px-8 md:h-12 rounded-lg transition-all active:scale-95 border-none">
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
