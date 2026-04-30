"use client";

import { Trash2, Link2, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlacklistItem, BlacklistType } from "../dashboard/dummy-data";

const TypeIcon = ({ type }: { type: BlacklistType }) => {
  if (type === "Phone Number") return <Phone className="h-4 w-4 text-gray-500 shrink-0" />;
  return <Link2 className="h-4 w-4 text-gray-500 shrink-0" />;
};

interface BlacklistTableProps {
  data: BlacklistItem[];
  onDeleteClick: (item: BlacklistItem) => void;
}

export default function BlacklistTable({ data, onDeleteClick }: BlacklistTableProps) {
  return (
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
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                {/* Type with icon */}
                <td className="py-3 px-4">
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium text-sm">
                    <TypeIcon type={item.type} />
                    {item.type}
                  </span>
                </td>

                {/* Value */}
                <td className="py-3 px-4 dark:text-gray-100 text-sm">{item.value}</td>

                {/* Reason */}
                <td className="py-3 px-4 dark:text-gray-300 text-sm">{item.reason}</td>

                {/* Added By */}
                <td className="py-3 px-4 dark:text-gray-400 text-sm">{item.addedBy}</td>

                {/* Date */}
                <td className="py-3 px-4 dark:text-gray-400 text-sm">{item.date}</td>

                {/* Action — delete only */}
                <td className="py-3 px-4">
                  <Button
                    onClick={() => onDeleteClick(item)}
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
  );
}
