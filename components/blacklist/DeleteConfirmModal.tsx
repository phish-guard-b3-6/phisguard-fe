"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
  errorMessage?: string | null;
}

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  errorMessage = null,
}: DeleteConfirmModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] flex flex-col items-center text-center p-8">
        <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center mb-4">
          <Trash2 className="h-8 w-8 text-red-500" />
        </div>

        <DialogHeader className="items-center sm:items-center text-center sm:text-center">
          <DialogTitle className="text-xl font-bold">Remove from the Blacklist?</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mt-2 max-w-[400px]">
            Are you sure you want to remove from the blacklist? Users may be exposed to this threat again.
          </DialogDescription>
        </DialogHeader>

        {/* Error message — hanya muncul jika ada error dari API */}
        {errorMessage && (
          <div className="w-full mt-4 text-xs bg-red-50 dark:bg-red-950/40 px-4 py-2.5 rounded-xl border border-red-100 dark:border-red-900/40 text-red-600 dark:text-red-400 font-mono text-left overflow-x-auto">
            <span className="font-semibold">Error: </span>{errorMessage}
          </div>
        )}

        <DialogFooter className="w-full flex flex-col gap-3 mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:w-[140px] rounded-xl font-semibold order-2 sm:order-1"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:w-[140px] bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold order-1 sm:order-2"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              "Yes, Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
