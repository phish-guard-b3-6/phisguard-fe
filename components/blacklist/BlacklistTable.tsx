"use client";

import { useState } from "react";
import { Trash2, Link2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DeleteConfirmModal from "./DeleteConfirmModal";
import { BlacklistItem, BlacklistType } from "@/lib/types/report";

const TypeIcon = ({ type }: { type: BlacklistType }) => {
  if (type === "phone") return <Phone className="h-4 w-4 text-gray-500 shrink-0" />;
  return <Link2 className="h-4 w-4 text-gray-500 shrink-0" />;
};

/** Membaca body respons secara aman. Tidak akan throw meskipun body kosong atau bukan JSON. */
async function safeParseResponse(res: Response): Promise<Record<string, any>> {
  try {
    const text = await res.text();
    return text ? JSON.parse(text) : {};
  } catch {
    return {};
  }
}

/** Melempar Error dengan pesan detail dari respons API ketika statusnya tidak ok. */
async function throwApiError(res: Response, fallback: string): Promise<never> {
  const body = await safeParseResponse(res);
  const message = body.message || body.error || `HTTP Error ${res.status}`;
  throw new Error(`${fallback} (${message})`);
}

export default function BlacklistTable() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<BlacklistItem | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [cursor, setCursor] = useState<string>("");
  const [cursorHistory, setCursorHistory] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const blacklistQueryKey = ["blacklists", { cursor }] as const;

  const { data, isLoading, isError, error } = useQuery({
    queryKey: blacklistQueryKey,
    queryFn: async () => {
      const res = await fetch(`/api/blacklists?limit=10&cursor=${cursor}`);
      if (!res.ok) await throwApiError(res, "Gagal mengambil data blacklist");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/blacklists/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await safeParseResponse(res);
        return { success: false, message: body.message || body.error || `HTTP Error ${res.status} (Internal Server Error)` };
      }
      await safeParseResponse(res);
      return { success: true };
    },
    onSuccess: async (result) => {
      await queryClient.invalidateQueries({ queryKey: blacklistQueryKey });
      if (result.success) {
        setIsDeleteModalOpen(false);
        setSelectedItem(null);
        setDeleteError(null);
      } else {
        setDeleteError(result.message || "Gagal menghapus data blacklist");
      }
    },
    onError: () => {
      // Fallback jika terjadi network crash yang parah
      setDeleteError("Terjadi kesalahan jaringan saat menghapus data.");
    },
  });

  const handleDeleteClick = (item: BlacklistItem) => {
    setSelectedItem(item);
    setDeleteError(null);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedItem?.id) {
      deleteMutation.mutate(selectedItem.id);
    }
  };

  const handleNextPage = () => {
    const nextCursor = data?.blacklists?.next_cursor;
    if (nextCursor) {
      setCursorHistory((prev) => [...prev, cursor]);
      setCursor(nextCursor);
    }
  };

  const handlePrevPage = () => {
    const prev = [...cursorHistory];
    const prevCursor = prev.pop() ?? "";
    setCursorHistory(prev);
    setCursor(prevCursor);
  };

  const blacklists: BlacklistItem[] = (Array.isArray(data?.blacklists?.blacklists) ? data.blacklists.blacklists : []).map((item: any) => ({
    id: item.id,
    type: item.type === "phone" ? "phone" : "url",
    value: item.value,
    reason: item.reason || "-",
    addedBy: item.added_by || "System",
    date: new Date(item.created_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "Asia/Singapore", // UTC+8 (SGT/MYT) — backend CIMB menggunakan timezone Malaysia/Singapura
    }),
  }));

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm p-10 text-center text-sm font-medium text-gray-500">
        Loading blacklist...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white dark:bg-gray-900/60 border border-red-200 dark:border-red-900/40 rounded-2xl shadow-sm p-10 flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-1 text-center">
          <p className="font-bold text-base text-gray-900 dark:text-gray-100">Gagal Memuat Data Blacklist</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Terjadi kesalahan saat menghubungi server backend.</p>
        </div>
        <div className="text-xs bg-red-50 dark:bg-red-950/40 px-4 py-2.5 rounded-xl border border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400 max-w-md font-mono text-left overflow-x-auto w-full">
          <span className="font-semibold">Detail Error: </span>
          {error instanceof Error ? error.message : JSON.stringify(error)}
        </div>
        <button
          onClick={() => queryClient.invalidateQueries({ queryKey: blacklistQueryKey })}
          className="mt-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm shadow-red-600/20"
        >
          Coba Ulang
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden py-5">
        <div className="overflow-x-auto px-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-red-300 dark:border-red-900/40 dark:bg-white/5">
                {["Type", "Value", "Reason", "Added by", "Date", "Action"].map((h) => (
                  <th key={h} className="text-left py-3 px-4 text-xs font-bold dark:text-gray-400 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-red-200 dark:divide-red-900/30">
              {blacklists.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium text-sm">
                      <TypeIcon type={item.type} />
                      {item.type === "url" ? "URL" : "Phone Number"}
                    </span>
                  </td>
                  <td className="py-3 px-4 dark:text-gray-100 text-sm">{item.value}</td>
                  <td className="py-3 px-4 dark:text-gray-300 text-sm">{item.reason}</td>
                  <td className="py-3 px-4 dark:text-gray-400 text-sm">{item.addedBy}</td>
                  <td className="py-3 px-4 dark:text-gray-400 text-sm">{item.date}</td>
                  <td className="py-3 px-4">
                    <Button
                      onClick={() => handleDeleteClick(item)}
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6 bg-white dark:bg-gray-900/60 border border-red-300 dark:border-red-900/40 rounded-2xl p-4 shadow-sm">
        <Button
          onClick={handlePrevPage}
          disabled={cursorHistory.length === 0}
          variant="outline"
          size="sm"
          className="text-xs font-semibold"
        >
          ← Previous
        </Button>
        <span className="text-xs text-gray-500 font-medium">Page {cursorHistory.length + 1}</span>
        <Button
          onClick={handleNextPage}
          disabled={!data?.blacklists?.next_cursor}
          variant="outline"
          size="sm"
          className="text-xs font-semibold"
        >
          Next →
        </Button>
      </div>

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteError(null);
        }}
        onConfirm={handleDeleteConfirm}
        isLoading={deleteMutation.isPending}
        errorMessage={deleteError}
      />
    </>
  );
}
