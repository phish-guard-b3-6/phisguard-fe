"use client";

import { CalendarDays, ChevronDown } from "lucide-react";
import { useFilterStore } from "@/stores/useFilterStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TicketListHeader() {
  const { dayBefore, setDayBefore } = useFilterStore();

  const options = [10, 15, 30];
  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Report Ticket</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage and triage incoming reports from customers.</p>
      </div>
      <div className="flex items-center gap-3">
        {/* Date Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 px-3 py-1.5 h-auto text-sm text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <CalendarDays className="h-4 w-4" />
              <span>Last {dayBefore} Days</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-44" align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Time Range</DropdownMenuLabel>
              {options.map((option) => (
                <DropdownMenuCheckboxItem key={option} checked={dayBefore === option} onCheckedChange={() => setDayBefore(option)}>
                  Last {option} Days
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
