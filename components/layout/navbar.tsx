"use client";

import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { LogOut, Menu, Search, User, Sun, Moon, Bell, CircleQuestionMark } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Mencegah mismatch hydration: render ikon setelah mounted di client
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { name: "New Report", href: "/new-report", icon: "new_report" },
    { name: "Report Status", href: "/report-status", icon: "report_status" },
    { name: "Microlearning", href: "/microlearning", icon: "microlearning" },
    { name: "Profile", href: "/profile", icon: "profile" },
  ];

  return (
    <div className="flex items-center gap-x-4 mx-10 p-2 h-fit">
      {isLoggedIn ? (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 flex flex-col">
            <SheetHeader className="p-6 border-b border-red-100 flex flex-row items-center gap-3 space-y-0">
              <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={32} height={32} />
              <SheetTitle className="text-xl font-bold mt-0">CIMB PhishGuard</SheetTitle>
            </SheetHeader>

            <div className="flex-1 px-4 py-8 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                    <div
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${
                        isActive ? "bg-red-500 text-white shadow-md shadow-red-200" : "text-gray-900 hover:bg-gray-100"
                      }`}
                    >
                      <Image src={`/icon/${item.icon}_${isActive ? "light" : "dark"}.svg`} alt={item.name} width={24} height={24} />
                      {item.name}
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="p-6 border-t border-red-100">
              <Button
                variant="ghost"
                className="w-full justify-start px-4 h-12 gap-4 text-gray-900 hover:bg-red-50 hover:text-red-600 rounded-xl cursor-pointer font-semibold transition-all"
                onClick={() => {
                  setIsLoggedIn(false);
                  setIsOpen(false);
                }}
              >
                <LogOut className="h-6 w-6" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <Image src="/icon/logo_dark.svg" alt="Logo Perusahaan" width={25} height={25} />
      )}
      <div className="relative w-3/4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white -scale-x-100" />
        <Input placeholder="Track Report Status (Enter Ticket ID)" className="h-8 w-full pl-10" />
      </div>
      <Separator orientation="vertical" className="bg-gray-400 " />
      <div className="flex gap-x-5 items-center">
        <Bell />
        <CircleQuestionMark />
        {/* Theme Toggle Button */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle Dark Mode"
          className="flex items-center justify-center cursor-pointer hover:opacity-80 transition-opacity"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="h-6 w-6 text-yellow-400" />
            ) : (
              <Moon className="h-6 w-6 text-gray-700" />
            )
          ) : (
            <div className="h-6 w-6" /> // Placeholder selama loading
          )}
        </button>
      </div>
      <Separator orientation="vertical" className="bg-gray-400" />

      {/* Profile or Signin/Signup Button */}
      {isLoggedIn ? (
        <Link href="/profile" className="flex items-center justify-center hover:opacity-80 transition-opacity">
          <div className="h-9 w-9 bg-gray-100 rounded-full flex items-center justify-center border border-gray-200 shadow-sm">
            <User className="h-5 w-5 text-gray-700" />
          </div>
        </Link>
      ) : (
        <div className="flex gap-2">
          <Button className="rounded-4xl py-1 h-fit text-xs" variant="outline" onClick={() => setIsLoggedIn(true)}>
            Sign In
          </Button>
          <Button className="rounded-4xl py-1 h-fit text-xs">Sign Up</Button>
        </div>
      )}
    </div>
  );
}
