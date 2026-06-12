"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link2, Phone } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEntryModal({ isOpen, onClose }: AddEntryModalProps) {
  const [entryType, setEntryType] = React.useState<"url" | "phone">("url");
  const [value, setValue] = React.useState("");
  const [reason, setReason] = React.useState("");
  
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/blacklists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: entryType,
          value,
          reason,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Gagal menambah data blacklist");
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blacklists"] });
      // Reset form
      setEntryType("url");
      setValue("");
      setReason("");
      onClose();
    },
    onError: (error) => {
      console.error(error);
      alert("Gagal menambahkan data: " + error.message);
    },
  });

  const handleSave = () => {
    if (!value.trim() || !reason.trim()) {
      alert("Value dan Reason harus diisi!");
      return;
    }
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden bg-white dark:bg-gray-950 border-none shadow-2xl rounded-2xl" aria-describedby={undefined}>
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/20">
          <DialogTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">Add New Blacklist</DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400 mt-1.5">
            Block specific URLs or phone numbers from accessing the system.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 py-6 flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Entry Type</span>
            <div className="flex p-1 space-x-1 bg-gray-100/80 dark:bg-gray-900 rounded-xl">
              <button
                type="button"
                onClick={() => setEntryType("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  entryType === "url" 
                    ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <Link2 className="h-4 w-4" />
                URL
              </button>

              <button
                type="button"
                onClick={() => setEntryType("phone")}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                  entryType === "phone" 
                    ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-white" 
                    : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                }`}
              >
                <Phone className="h-4 w-4" />
                Phone Number
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Value</span>
            <Input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={entryType === "url" ? "Example: promo.cimb.vip" : "Example: +6281234567890"} 
              className="h-11 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus-visible:ring-1 focus-visible:ring-[#E22E2E] focus-visible:border-[#E22E2E] rounded-lg transition-all" 
            />
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Block Reason</span>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the reason for adding to the blacklist"
              className="min-h-[110px] resize-none border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 focus-visible:ring-1 focus-visible:ring-[#E22E2E] focus-visible:border-[#E22E2E] rounded-lg transition-all p-3"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4 border-t border-gray-100 dark:border-gray-800/60 bg-gray-50/50 dark:bg-gray-900/20 flex items-center gap-3 sm:justify-end">
          <Button 
            variant="outline" 
            onClick={onClose} 
            disabled={mutation.isPending} 
            className="w-full sm:w-auto px-5 h-10 font-medium border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:bg-transparent dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={mutation.isPending}
            className="w-full sm:w-auto px-6 h-10 bg-[#E22E2E] hover:bg-[#C92222] text-white font-medium rounded-lg shadow-sm shadow-red-500/20 transition-all"
          >
            {mutation.isPending ? "Saving..." : "Save Entry"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
