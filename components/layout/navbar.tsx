"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Menu, Search, Bell, X } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import NotificationDropdown from "./NotificationDropdown";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Navbar() {
  const { user, isAuthenticated, isHydrating } = useAuthStore();
  const role = user?.role ?? "user";

  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="flex items-center mx-4 md:gap-x-4 md:mx-10 p-2 h-fit">
      {isAuthenticated || isMobile ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className={`cursor-pointer ${isSearchOpen && isMobile ? "hidden" : "flex"}`}>
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>

          <SheetContent side={isMobile ? "top" : "left"} className={isMobile ? "p-0 flex-col h-full!" : "p-0 flex-col w-[350px]"}>
            <Sidebar role={role} setIsOpen={setIsOpen} isLoggedIn={isAuthenticated} isMobile={isMobile} />
          </SheetContent>
        </Sheet>
      ) : (
        <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={25} height={25} />
      )}

      {/* CIMB PHISGUARD Icon when < 768 / mobile  */}
      <div className={`flex-1 ${isSearchOpen && isMobile ? "hidden" : "flex"} md:hidden justify-center items-center gap-2`}>
        <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={15} height={15} />
        <h1 className="text-lg font-bold">CIMB PhishGuard</h1>
      </div>

      {/* Search and bell Icon when < 768 / mobile  */}
      <div className={`${isSearchOpen && isMobile ? "hidden" : "flex"} md:hidden gap-4`}>
        <Search className="h-5 w-5 cursor-pointer" onClick={() => setIsSearchOpen(true)} />
        <NotificationDropdown className="h-5 w-5" />
      </div>

      {/* Search bar when > 768 */}
      <div className={`${isSearchOpen && isMobile ? "flex flex-1" : "hidden"} md:flex relative w-full items-center gap-4`}>
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 md:text-white -scale-x-100" />
        <Input
          placeholder="Track Report Status (Enter Ticket ID)"
          className="h-10 md:h-8 w-full pl-10 text-xs md:text-base"
          autoFocus={isSearchOpen}
        />
        <Separator orientation="vertical" className="hidden md:flex bg-gray-400 " />
        <NotificationDropdown className="hidden md:block" />
        {isSearchOpen && isMobile && <X className="h-6 w-6 text-gray-600 cursor-pointer" onClick={() => setIsSearchOpen(false)} />}
      </div>

      {/* Profile or Signin/Signup Button when > 768 */}
      {isHydrating ? (
        // Tampilkan skeleton bulat selama fetch /me belum selesai — hindari flash Sign In
        <div className="hidden md:flex h-9 w-9 rounded-full bg-gray-200 animate-pulse" />
      ) : isAuthenticated ? (
        <Link href="/profile" className="hidden md:flex items-center justify-center hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 bg-red-600 rounded-full flex items-center justify-center border border-red-700 shadow-sm transition-transform hover:scale-105">
            <span className="text-sm font-bold text-white">
              {user?.firstname ? user.firstname[0].toUpperCase() : role === "admin" ? "A" : "U"}
            </span>
          </div>
        </Link>
      ) : (
        <div className={`${isSearchOpen && isMobile ? "hidden" : "hidden md:flex"} gap-2`}>
          <Button className="rounded-4xl py-1 h-fit text-xs" variant="outline" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button className="rounded-4xl py-1 h-fit text-xs" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      )}
    </div>
  );
}

