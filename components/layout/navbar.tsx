"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Input } from "@/components/ui/input";
import { Menu, Search, X, Loader2, Ticket, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import NotificationDropdown from "./NotificationDropdown";
import { useAuthStore } from "@/stores/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@/hooks/useDebounce";

export default function Navbar() {
  const { user, isAuthenticated, isHydrating } = useAuthStore();
  const role = user?.role ?? "user";

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // State untuk input pencarian
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce: API baru dipanggil 400ms setelah user berhenti mengetik
  const debouncedSearch = useDebounce(searchInput, 400);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Query pencarian tiket — hanya dijalankan jika debouncedSearch >= 3 karakter
  const { data: searchResult, isLoading: isSearching, isError: isSearchError } = useQuery({
    queryKey: ["ticket-search", debouncedSearch],
    queryFn: async () => {
      const res = await fetch(`/api/tickets/code?code=${encodeURIComponent(debouncedSearch)}`);
      if (!res.ok) throw new Error("Tiket tidak ditemukan");
      return res.json();
    },
    // Hanya fetch jika sudah minimal 3 karakter
    enabled: debouncedSearch.trim().length >= 3,
    // Jangan retry jika gagal (misal: 404 tiket tidak ditemukan)
    retry: false,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setIsDropdownVisible(true);
  };

  const handleSearchBlur = () => {
    // Delay agar klik pada hasil dropdown sempat terjadi sebelum disembunyikan
    setTimeout(() => setIsDropdownVisible(false), 150);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    setIsDropdownVisible(false);
    setIsSearchOpen(false);
  };

  // Tampilkan dropdown hanya jika sedang focus DAN debouncedSearch sudah >= 3 huruf
  const showDropdown = isDropdownVisible && debouncedSearch.trim().length >= 3;

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

      {/* Search bar */}
      <div className={`${isSearchOpen && isMobile ? "flex flex-1" : "hidden"} md:flex relative w-full items-center gap-4`}>
        {/* Icon search berubah jadi spinner saat loading */}
        {isSearching ? (
          <Loader2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 animate-spin" />
        ) : (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 md:text-white -scale-x-100" />
        )}

        <Input
          ref={inputRef}
          placeholder="Track Report Status (Enter Ticket ID)"
          className="h-10 md:h-8 w-full pl-10 text-xs md:text-base"
          autoFocus={isSearchOpen}
          value={searchInput}
          onChange={handleSearchChange}
          onFocus={() => setIsDropdownVisible(true)}
          onBlur={handleSearchBlur}
        />

        {/* Dropdown hasil pencarian */}
        {showDropdown && (
          <div 
            className="absolute top-full left-0 right-0 mt-2 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
            onMouseDown={(e) => e.preventDefault()}
          >
            {isSearching ? (
              /* Loading state */
              <div className="flex items-center gap-3 px-5 py-4 text-sm text-gray-500">
                <Loader2 className="h-4 w-4 animate-spin shrink-0 text-red-500" />
                <span>Mencari tiket<span className="animate-pulse">...</span></span>
              </div>
            ) : isSearchError ? (
              /* Not found state */
              <div className="flex items-center gap-3 px-5 py-4">
                <div className="h-9 w-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0">
                  <AlertCircle className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Tiket tidak ditemukan</p>
                  <p className="text-xs text-gray-400 mt-0.5">Pastikan kode tiket sudah benar</p>
                </div>
              </div>
            ) : searchResult?.tickets ? (() => {
              /* Found state — render as IIFE to use variables */
              const ticket = searchResult.tickets;
              const statusMap: Record<string, { label: string; cls: string }> = {
                submitted: { label: "Submitted", cls: "bg-blue-100 text-blue-700 border-blue-200" },
                in_review: { label: "In Review", cls: "bg-yellow-100 text-yellow-700 border-yellow-200" },
                closed:    { label: "Closed",    cls: "bg-green-100 text-green-700 border-green-200" },
              };
              const st = statusMap[ticket.status] ?? { label: ticket.status, cls: "bg-gray-100 text-gray-600 border-gray-200" };

              return (
                <Link
                  href={`/report-status/${ticket.report_id || ticket.id}`}
                  className="block group"
                  onClick={() => {
                    setIsDropdownVisible(false);
                    setSearchInput("");
                  }}
                >
                  <div className="px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0 border border-red-100 dark:border-red-900/50">
                        <Search className="h-4 w-4 text-red-500 dark:text-red-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-gray-900 dark:text-gray-100 truncate font-mono tracking-wide">
                          {ticket.code}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 group-hover:text-red-500 transition-colors">Klik untuk lihat detail laporan →</p>
                      </div>
                    </div>
                    {/* Status badge */}
                    <span className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-md border ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                </Link>
              );
            })() : null}
          </div>
        )}

        <Separator orientation="vertical" className="hidden md:flex bg-gray-400 " />
        <NotificationDropdown className="hidden md:block" />
        {isSearchOpen && isMobile && (
          <X className="h-6 w-6 text-gray-600 cursor-pointer" onClick={handleClearSearch} />
        )}
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
