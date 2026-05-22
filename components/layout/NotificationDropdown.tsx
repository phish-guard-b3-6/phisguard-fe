"use client";

import { useState, useEffect } from "react";
import { Bell, Megaphone, Info, Ticket } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";

export default function NotificationDropdown({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [seenBroadcasts, setSeenBroadcasts] = useState<string[]>([]);

  // Load seen broadcasts from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("seenBroadcasts");
    if (stored) {
      try {
        setSeenBroadcasts(JSON.parse(stored));
      } catch (e) {}
    }
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["broadcasts"],
    queryFn: async () => {
      const res = await fetch(`/api/reports/broadcast`);
      if (!res.ok) throw new Error("Gagal mengambil data broadcast");
      return res.json();
    },
    // Fetch berjalan di background secara berkala (tiap 1 menit) untuk update red dot
    refetchInterval: 60000,
  });

  // Proses mapping data agar sesuai dengan kembalian backend
  let broadcasts: any[] = [];
  if (data?.reports && Array.isArray(data.reports)) {
    broadcasts = data.reports;
  }

  // Batasi hanya 5 terbaru yang tampil di UI
  broadcasts = broadcasts.slice(0, 5);

  const hasUnread = broadcasts.some((b) => !seenBroadcasts.includes(b.broadcast || ""));

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && broadcasts.length > 0) {
      // Mark all currently fetched as seen
      const newSeen = [...seenBroadcasts];
      let changed = false;
      broadcasts.forEach((b) => {
        const str = b.broadcast || "";
        if (!newSeen.includes(str)) {
          newSeen.push(str);
          changed = true;
        }
      });
      if (changed) {
        // Keep only the last 50 to avoid localStorage bloat
        if (newSeen.length > 50) newSeen.splice(0, newSeen.length - 50);
        setSeenBroadcasts(newSeen);
        localStorage.setItem("seenBroadcasts", JSON.stringify(newSeen));
      }
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
      <DropdownMenuTrigger className={className} asChild>
        <button className="relative flex items-center justify-center cursor-pointer outline-none transition-transform hover:scale-105">
          <Bell className="h-5 w-5 text-gray-700 dark:text-gray-200" />
          {hasUnread && (
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white dark:border-gray-950" />
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-[320px] sm:w-[360px] p-0 rounded-2xl overflow-hidden border border-gray-150 dark:border-gray-800 shadow-xl dark:shadow-2xl dark:shadow-red-900/10"
      >
        <div className="bg-red-50/80 dark:bg-red-950/30 p-4 border-b border-red-100 dark:border-red-900/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-200 dark:border-red-900/50">
              <Megaphone className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">Broadcasts</h3>
          </div>
        </div>

        <div className="max-h-[340px] overflow-y-auto py-1 flex flex-col scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800">
          {isLoading ? (
            <div className="p-8 flex flex-col items-center justify-center gap-3 text-sm text-gray-500">
              <div className="h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              Memuat data...
            </div>
          ) : isError ? (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-red-500">
              <Info className="h-10 w-10 text-red-300 dark:text-red-800 mb-1" />
              <p className="text-sm font-medium">Gagal memuat notifikasi.</p>
            </div>
          ) : broadcasts.length > 0 ? (
            broadcasts.map((item, i) => {
              const broadcastStr = item.broadcast || "";
              const lines = broadcastStr.split("\n");
              const title = lines.length > 0 ? lines[0] : "Pemberitahuan Sistem";
              const description = lines.length > 1 ? lines.slice(1).join(" ") : broadcastStr;

              const isUnread = !seenBroadcasts.includes(broadcastStr);

              return (
                <div
                  key={i}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/40 cursor-pointer transition-colors border-b border-gray-100 dark:border-gray-800/50 last:border-0 flex gap-3 ${isUnread ? "bg-red-50/30 dark:bg-red-900/10" : ""}`}
                >
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`h-9 w-9 rounded-full flex items-center justify-center border ${isUnread ? "bg-red-100 dark:bg-red-900/30 border-red-200 dark:border-red-800" : "bg-gray-50 dark:bg-gray-800 border-gray-150 dark:border-gray-700"}`}
                    >
                      <Ticket className={`h-4 w-4 ${isUnread ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`} />
                    </div>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p
                        className={`text-sm truncate ${isUnread ? "font-bold text-gray-900 dark:text-gray-100" : "font-medium text-gray-700 dark:text-gray-300"}`}
                      >
                        {title}
                      </p>
                    </div>
                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${isUnread ? "font-medium text-gray-800 dark:text-gray-300" : "text-gray-500 dark:text-gray-400"}`}
                    >
                      {description}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center gap-2 text-gray-500">
              <Info className="h-10 w-10 text-gray-200 dark:text-gray-700 mb-1" />
              <p className="text-sm font-medium">Belum ada broadcast terbaru.</p>
              <p className="text-xs text-gray-400">Pembaruan penting akan muncul di sini.</p>
            </div>
          )}
        </div>

        {broadcasts.length > 0 && (
          <div className="p-2 border-t border-gray-100 dark:border-gray-800/50 bg-gray-50 dark:bg-gray-900/50">
            <button className="w-full py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
              Tandai semua dibaca
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
