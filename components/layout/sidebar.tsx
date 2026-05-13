"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useAuthStore } from "@/stores/useAuthStore";

interface SidebarProps {
  role: string;
  isLoggedIn: boolean;
  isMobile: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ role, setIsOpen, isLoggedIn, isMobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const userItems = [
    { name: "New Report", href: "/new-report", icon: "new_report" },
    { name: "Report Status", href: "/report-status", icon: "report_status" },
    { name: "Microlearning", href: "/microlearning", icon: "microlearning" },
    { name: "Profile", href: "/profile", icon: "profile" },
  ];

  const adminItems = [
    { name: "Dashboard", href: "/dashboard", icon: "dashboard" },
    { name: "Ticket List", href: "/ticket-list", icon: "ticketlist" },
    { name: "Blacklist", href: "/blacklist", icon: "blacklist" },
    { name: "Profile", href: "/profile", icon: "profile" },
  ];

  const navItems = role === "admin" ? adminItems : userItems;

  const handleLogout = async () => {
    try {
      // 1. Minta server menghapus httpOnly cookie
      await fetch("/api/logout", { method: "POST" });
    } catch (error) {
      console.error("Gagal melakukan logout di server", error);
    } finally {
      // 2. Bersihkan state client-side
      setUser(null);
      setIsOpen(false);
      // 3. Arahkan ke halaman login
      router.push("/signin");
    }
  };

  return (
    <>
      <div className="border-b border-red-500">
        {!isLoggedIn && isMobile ? (
          <SheetHeader className="flex flex-col gap-8 px-4 pb-4 pt-14 items-center space-y-0">
            <SheetTitle className="text-center text-sm font-normal text-black">Log in into your account</SheetTitle>
            <SheetDescription className="sr-only">Authentication sidebar for mobile guest users.</SheetDescription>
            <Button
              variant="outline"
              className="w-full h-12 rounded-lg bg-red-800 text-white font-semibold cursor-pointer"
              asChild
            >
              <Link href="/signin" onClick={() => setIsOpen(false)}>Sign In</Link>
            </Button>
          </SheetHeader>
        ) : (
          <SheetHeader className="p-6 flex flex-row items-center gap-3 space-y-0">
            <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={32} height={32} />
            <SheetTitle className="text-lg md:text-xl font-bold mt-0">CIMB PhishGuard</SheetTitle>
            <SheetDescription className="sr-only">Main navigation sidebar.</SheetDescription>
          </SheetHeader>
        )}
      </div>

      <div className="flex-1 px-4 py-8 space-y-2 flex flex-col ">
        {isLoggedIn ? (
          navItems.map((item) => {
            // Menu aktif jika pathname sama persis, ATAU jika pathname adalah sub-path dari menu tersebut
            // (misal: /report-status/123 akan membuat menu /report-status aktif)
            const isActive = pathname === item.href || (pathname.startsWith(item.href + "/") && item.href !== "/");
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                <div
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                    isActive ? "bg-red-500 text-white shadow-md shadow-red-200" : "text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  <Image src={`/icon/${item.icon}_${isActive ? "light" : "dark"}.svg`} alt={item.name} width={24} height={24} />
                  <p className="text-sm md:text-base">{item.name}</p>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex flex-col items-start gap-4 px-8">
            <p className="text-center text-black text-sm">
              New?{" "}
              <Link href="/signup" className="text-red-700! hover:underline cursor-pointer">
                Join our Community
              </Link>
            </p>
            <Link href="/reset-password" className="hover:underline cursor-pointer">
              Forgot Password
            </Link>
          </div>
        )}

        {!isLoggedIn && isMobile && <div className="mt-auto pt-6 space-y-3"></div>}
      </div>

      {isLoggedIn && (
        <div className="p-6 border-t border-red-500">
          <Button
            variant="ghost"
            className="w-full justify-start px-4 h-12 gap-4 text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-xl cursor-pointer font-semibold transition-all"
            onClick={handleLogout}
          >
            <LogOut className="h-6 w-6" />
            Logout
          </Button>
        </div>
      )}
    </>
  );
}

