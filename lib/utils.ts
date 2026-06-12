import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Memformat string tanggal ISO ke format tampilan "dd Mon yyyy, hh:mm" dalam WIB (UTC+7).
 * Timezone eksplisit diperlukan agar output konsisten di semua environment
 * (localhost & Vercel yang default-nya berjalan di UTC).
 */
export function formatDate(dateStr: string): string {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Singapore", // UTC+8 (SGT/MYT) — backend CIMB menggunakan timezone Malaysia/Singapura
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}
