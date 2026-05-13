export interface ReportTicket {
  id: string;
  report_id: string;
  code: string;
  status: "submitted" | "in_review" | "confirmed" | "closed";
  created_at: string;
  updated_at: string;
}

export interface ReportDetection {
  id: string;
  report_id: string;
  score: number;
  label: "low_risk" | "medium_risk" | "high_risk";
  created_at: string;
}

export interface Report {
  id: string;
  user_id: string;
  message: string;
  url: string;
  sender_number: string;
  resource: string;
  description: string;
  is_anonymous: boolean;
  is_blacklisted: boolean;
  created_at: string;
  updated_at: string;
  ticket: ReportTicket;
  detection: ReportDetection;
}

export interface ReportApiResponse {
  success: string;
  reports: Report;
}

export type ResourceOption = "sms" | "whatsapp" | "email" | "web";

export type ReportType = "url" | "phone";

export interface CreateReportPayload {
  message: string;
  value: string; // URL jika type="url", nomor HP jika type="phone"
  type: ReportType; // menentukan isi dari field value
  resource: ResourceOption;
  description: string;
  is_anonymous: boolean;
}

export interface ReportListItem {
  id: string;
  user_id: string;
  message: string;
  url: string;
  sender_number: string;
  resource: string;
  description: string;
  is_anonymous: boolean;
  is_blacklisted: boolean;
  created_at: string;
  updated_at: string;
  ticket: ReportTicket;
  detection: ReportDetection;
}

export interface ReportListGroup {
  reports: ReportListItem[];
}

export interface ReportListApiResponse {
  message: string;
  reports: ReportListGroup[];
}

export type RiskLevel = "Low Risk" | "Medium Risk" | "High Risk";

export type ReportHandlingStatus = "Submitted" | "In Review" | "Confirmed" | "Closed";

export type RiskConfig = {
  borderColor: string;
  badgeBorder: string;
  badgeBg: string;
  badgeShadow: string;
  textColor: string;
  dateBg: string;
  dateText: string;
  topBorder: string;
  icon: string;
  bgIcon: string;
  bgOpacity: number;
  label: string;
  alertTitle: string;
  alertBody: string;
  btnBg: string;
  btnHoverBg: string;
  btnShadow: string;
  border: string;
  bg: string;
  text: string;
  shadow: string;
  recommendations: string[];
};
