"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm }: DeleteConfirmModalProps) {
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

        <DialogFooter className="w-full flex flex-col gap-3 mt-8 sm:flex-row sm:justify-center sm:gap-4">
          <Button variant="outline" onClick={onClose} className="w-full sm:w-[140px] rounded-xl font-semibold order-2 sm:order-1">
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="w-full sm:w-[140px] bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold order-1 sm:order-2"
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
