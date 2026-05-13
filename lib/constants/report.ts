import React from "react";
import { FaWhatsapp, FaSms } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { RiskConfig, RiskLevel, ReportHandlingStatus } from "@/lib/types/report";

// ─────────────────────────────────────────────────────────────────────────────
// RISK CONFIG
// Menggabungkan config dari list-report-status dan detail-report-status
// menjadi satu sumber kebenaran (Single Source of Truth).
// ─────────────────────────────────────────────────────────────────────────────
export const RISK_CONFIG: Record<RiskLevel, RiskConfig> = {
  "Low Risk": {
    // Border & badge (digunakan di detail)
    borderColor: "border-l-green-600",
    badgeBorder: "border-green-700",
    badgeBg: "bg-white",
    badgeShadow: "shadow-[inset_0_3px_10px_rgba(22,163,74,0.25)]",
    textColor: "text-green-600",
    topBorder: "border-t-green-600",
    // Button (digunakan di detail)
    btnBg: "bg-green-700!",
    btnHoverBg: "hover:bg-green-800!",
    btnShadow: "shadow-green-100",
    // Pesan (digunakan di detail)
    label: "Low Risk",
    alertTitle: "Low-Level Security Notice",
    alertBody:
      "Based on our system analysis, your report has a low probability of being a phishing attempt. Stay cautious.",
    recommendations: [
      "Stay vigilant if asked to provide personal identity data.",
      "Ensure the URL always uses 'https://' and is not a fake website.",
      "Report back if you notice any further strange activities or messages.",
    ],
    // Icon (digunakan di keduanya)
    icon: "/icon/warning_green.svg",
    bgIcon: "/icon/warning_green_bg.svg",
    bgOpacity: 1,
    // Style untuk list card
    border: "border-green-300",
    bg: "bg-green-50",
    text: "text-green-600",
    dateBg: "bg-green-400",
    dateText: "text-white",
    shadow: "shadow-[inset_0_3px_10px_rgba(34,197,94,0.25)]",
  },
  "Medium Risk": {
    borderColor: "border-l-yellow-500",
    badgeBorder: "border-yellow-600",
    badgeBg: "bg-white",
    badgeShadow: "shadow-[inset_0_3px_10px_rgba(234,179,8,0.25)]",
    textColor: "text-yellow-600",
    topBorder: "border-t-yellow-500",
    btnBg: "bg-yellow-600!",
    btnHoverBg: "hover:bg-yellow-700!",
    btnShadow: "shadow-yellow-100",
    label: "Medium Risk",
    alertTitle: "Medium-Level Security Alert",
    alertBody:
      "Based on our system analysis, your report has a moderate probability of being a phishing attempt.",
    recommendations: [
      "Delay any interaction with this link or sender.",
      "Verify the information through the official contacts of the relevant company.",
      "Do not download or open any attached files.",
    ],
    icon: "/icon/warning_yellow.svg",
    bgIcon: "/icon/warning_yellow_bg.svg",
    bgOpacity: 1,
    border: "border-orange-300",
    bg: "bg-orange-50",
    text: "text-orange-500",
    dateBg: "bg-orange-400",
    dateText: "text-white",
    shadow: "shadow-[inset_0_3px_10px_rgba(249,115,22,0.25)]",
  },
  "High Risk": {
    borderColor: "border-l-red-600",
    badgeBorder: "border-red-700",
    badgeBg: "bg-white",
    badgeShadow: "shadow-[inset_0_3px_10px_rgba(220,38,38,0.25)]",
    textColor: "text-red-600",
    topBorder: "border-t-red-600",
    btnBg: "bg-[#7a1b1b]!",
    btnHoverBg: "hover:bg-[#631616]!",
    btnShadow: "shadow-red-100",
    bgOpacity: 0.15,
    label: "High Risk",
    alertTitle: "High-Level Security Alert",
    alertBody:
      "Based on our system analysis, your report is highly likely to be a phishing attempt.",
    recommendations: [
      "Never click on the provided link.",
      "Never give your OTP, PIN, or password to anyone.",
      "Block the sender's number on your device.",
    ],
    icon: "/icon/warning_red.svg",
    bgIcon: "/icon/warning_red_bg.svg",
    border: "border-red-300",
    bg: "bg-red-50",
    text: "text-red-600",
    dateBg: "bg-red-400",
    dateText: "text-white",
    shadow: "shadow-[inset_0_3px_10px_rgba(220,38,38,0.25)]",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// STATUS CONFIG
// Konfigurasi tampilan badge status tiket.
// ─────────────────────────────────────────────────────────────────────────────
export const STATUS_CONFIG: Record<ReportHandlingStatus, { label: string; bg: string; text: string }> = {
  Submitted: { label: "Submitted", bg: "bg-gray-200", text: "text-gray-600" },
  "In Review": { label: "In Review", bg: "bg-green-400", text: "text-white" },
  Confirmed: { label: "Confirmed", bg: "bg-red-300", text: "text-white" },
  Closed: { label: "Closed", bg: "bg-gray-200", text: "text-gray-600" },
};

// ─────────────────────────────────────────────────────────────────────────────
// HANDLING STEPS
// Langkah-langkah penanganan tiket yang ditampilkan di halaman detail.
// ─────────────────────────────────────────────────────────────────────────────
export const STATUS_STEP_MAP: Record<string, number> = {
  submitted: 0,
  in_review: 1,
  confirmed: 2,
  closed: 3,
};

export const HANDLING_STEPS = [
  { id: 1, title: "Submitted", description: "Report successfully received by the system." },
  { id: 2, title: "In Review", description: "The report is currently being analyzed by the team." },
  { id: 3, title: "Confirmed", description: "Verified as a confirmed phishing threat." },
  { id: 4, title: "Closed", description: "Case closed and mitigation actions completed." },
];

// ─────────────────────────────────────────────────────────────────────────────
// CHANNEL ICON
// Pemetaan resource/channel dari API ke komponen ikon React.
// ─────────────────────────────────────────────────────────────────────────────
export const CHANNEL_ICON: Record<string, React.ReactNode> = {
  sms: React.createElement(FaSms),
  whatsapp: React.createElement(FaWhatsapp),
  email: React.createElement(MdOutlineEmail),
  website: React.createElement(CiGlobe),
};

// ─────────────────────────────────────────────────────────────────────────────
// MAPPING HELPERS
// Fungsi-fungsi untuk memetakan nilai API (snake_case) ke nilai tampilan.
// ─────────────────────────────────────────────────────────────────────────────

/** Memetakan label API (low_risk, medium_risk, high_risk) ke RiskLevel display. */
export function mapLabel(label: string): RiskLevel {
  if (label === "high_risk") return "High Risk";
  if (label === "medium_risk") return "Medium Risk";
  return "Low Risk";
}

/** Memetakan status tiket API ke ReportHandlingStatus display. */
export function mapStatus(status: string): ReportHandlingStatus {
  if (status === "in_review") return "In Review";
  if (status === "confirmed") return "Confirmed";
  if (status === "closed") return "Closed";
  return "Submitted";
}

/** Mengkapitalisasi nama channel/resource dari API untuk ditampilkan. */
export function mapChannel(resource: string): string {
  if (!resource) return "Unknown";
  return resource.charAt(0).toUpperCase() + resource.slice(1);
}
