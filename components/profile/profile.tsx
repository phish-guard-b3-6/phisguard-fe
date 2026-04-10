import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ProfileSection() {
  return (
    <div className="w-1/2 mx-auto p-6 space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-black">User Profile</h1>

      {/* Main Profile Card */}
      <Card className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
        <CardContent className="p-0 space-y-12">
          {/* Profile Header */}
          <div className="flex items-center gap-8">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-100 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&h=250"
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h2 className="text-xl font-bold tracking-tight text-gray-900">Rina Gunawan</h2>
              <p className="text-gray-500">CIMB Niaga Customers</p>
            </div>
          </div>

          {/* Profile Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
            {/* Username */}
            <div className="space-y-2 pb-2 border-b-2 border-red-50/50">
              <p className="font-medium text-gray-400">Username</p>
              <p className="text-gray-900 font-medium">rinaGun</p>
            </div>

            {/* Email */}
            <div className="space-y-2 pb-2 border-b-2 border-red-50/50">
              <p className="font-medium text-gray-400">Email</p>
              <p className="text-gray-900 font-medium">rina.gunawan@example.com</p>
            </div>

            {/* First Name */}
            <div className="space-y-2 pb-2 border-b-2 border-red-50/50">
              <p className="font-medium text-gray-400">First Name</p>
              <p className="text-gray-900 font-medium">Rina</p>
            </div>

            {/* Last Name */}
            <div className="space-y-2 pb-2 border-b-2 border-red-50/50">
              <p className="font-medium text-gray-400">Last Name</p>
              <p className="text-gray-900 font-medium">Gunawan</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <Button
              variant="secondary"
              className="bg-green-100 hover:bg-green-200 text-green-900 font-semibold px-8 h-12 rounded-xl border-none transition-all active:scale-95"
            >
              Edit Profile
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 h-12 rounded-xl transition-all active:scale-95 border-none">
              Change Password
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
