"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlacklistHeaderProps {
  onAddClick: () => void
}

export default function BlacklistHeader({ onAddClick }: BlacklistHeaderProps) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blacklist Management</h1>
        <p className="text-sm dark:text-gray-400 mt-0.5">Manage a list of URLs and phone numbers suspected of being involved in phishing.</p>
      </div>

      <Button 
        onClick={onAddClick}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl shadow-sm px-4 transition-colors"
      >
        <Plus className="h-4 w-4" />
        Add Entry
      </Button>
    </div>
  );
}
