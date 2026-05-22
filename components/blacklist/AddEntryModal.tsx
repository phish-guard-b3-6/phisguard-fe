"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Square, SquareCheck } from "lucide-react";
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
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden" aria-describedby={undefined}>
        <DialogHeader className="mx-6 pt-4 pb-2 border-b border-black dark:border-white/20">
          <DialogTitle className="text-lg font-bold">Add a New Blacklist Entry</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Entry Type</span>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setEntryType("url")}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {entryType === "url" ? <SquareCheck fill="black" stroke="black" className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-400" />}
                URL
              </button>

              <button
                type="button"
                onClick={() => setEntryType("phone")}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {entryType === "phone" ? (
                  <SquareCheck fill="black" stroke="black" className="h-5 w-5" />
                ) : (
                  <Square className="h-5 w-5 text-gray-400" />
                )}
                Sender Phone Number
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Value</span>
            <Input 
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Example: promo.cimb.vip" 
              className="h-10 border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50" 
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Block Reason</span>
            <Textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the reason for adding to the blacklist"
              className="min-h-[100px] resize-none border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4">
          <Button variant="outline" onClick={onClose} disabled={mutation.isPending} className="w-full sm:w-auto px-6 font-semibold border-gray-200 dark:border-gray-800">
            Cancel
          </Button>
          <Button 
            onClick={handleSave} 
            disabled={mutation.isPending}
            className="w-full sm:w-auto px-6 bg-[#E22E2E] hover:bg-[#C92222] text-white font-semibold"
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
