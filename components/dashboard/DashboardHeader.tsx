"use client";

import { CalendarDays, ChevronDown } from "lucide-react";

export default function DashboardHeader() {
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Security Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Daily operational overview and attack analytics.</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Date Filter */}
        <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          <CalendarDays className="h-4 w-4" />
          <span>Last 30 Days</span>
          <ChevronDown className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
