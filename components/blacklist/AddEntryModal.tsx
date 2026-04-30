"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Square, SquareCheck } from "lucide-react";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEntryModal({ isOpen, onClose }: AddEntryModalProps) {
  const [entryType, setEntryType] = React.useState<"URL" | "Sender Phone Number">("URL");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <DialogHeader className="mx-6 pt-4 pb-2 border-b border-black dark:border-white/20">
          <DialogTitle className="text-lg font-bold">Add a New Blacklist Entry</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-4 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Entry Type</span>
            <div className="flex items-center gap-6">
              <button
                type="button"
                onClick={() => setEntryType("URL")}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {entryType === "URL" ? <SquareCheck fill="black" stroke="black" className="h-5 w-5" /> : <Square className="h-5 w-5 text-gray-400" />}
                URL
              </button>

              <button
                type="button"
                onClick={() => setEntryType("Sender Phone Number")}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 transition-colors"
              >
                {entryType === "Sender Phone Number" ? (
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
            <Input placeholder="Example: promo.cimb.vip" className="h-10 border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">Block Reason</span>
            <Textarea
              placeholder="Describe the reason for adding to the blacklist"
              className="min-h-[100px] resize-none border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50"
            />
          </div>
        </div>

        <DialogFooter className="px-6 py-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-auto px-6 font-semibold border-gray-200 dark:border-gray-800">
            Cancel
          </Button>
          <Button className="w-full sm:w-auto px-6 bg-[#E22E2E] hover:bg-[#C92222] text-white font-semibold">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
