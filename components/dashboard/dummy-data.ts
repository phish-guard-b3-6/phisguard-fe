export type TriageStatus = "In Review" | "Submitted" | "Closed";
export type Platform = "Website" | "WhatsApp" | "SMS" | "Email";

export interface Report {
  id?: string;
  ticket_id?: string;
  ticketId: string;
  reportTime: string;
  platform: Platform;
  riskScore: number;
  triageStatus: TriageStatus;
  reportedUrl?: string;
}

export const dashboardDummyData = {
  stats: {
    totalReports: { value: 342, trend: { value: "+12%", direction: "up" as const } },
    highRisk: { value: 128, trend: { value: "24%", direction: "down" as const } },
    pendingTriage: { value: 45, subtitle: "Queue Report" },
  },
  chartPhishingTrends: [
    { date: "5 Mar", total: 80, highRisk: 60 },
    { date: "8 Mar", total: 55, highRisk: 40 },
    { date: "12 Mar", total: 68, highRisk: 45 },
    { date: "15 Mar", total: 72, highRisk: 55 },
    { date: "19 Mar", total: 95, highRisk: 70 },
    { date: "22 Mar", total: 50, highRisk: 30 },
    { date: "26 Mar", total: 65, highRisk: 45 },
    { date: "29 Mar", total: 82, highRisk: 65 },
    { date: "2 Apr", total: 75, highRisk: 50 },
  ],
  chartAttackMethods: [
    { method: "Typequatting", count: 145 },
    { method: "Fake Promo", count: 110 },
    { method: "APK Malware", count: 90 },
    { method: "OTP Stealing", count: 75 },
    { method: "Phishing Email", count: 55 },
  ],
  latestReports: [
    {
      ticketId: "TKT-CIMB-6666",
      reportTime: "4 Apr 2026, 14:45",
      platform: "Website",
      riskScore: 95,
      triageStatus: "In Review" as const,
      reportedUrl: "https://cimb-undian.com",
    },
    {
      ticketId: "TKT-CIMB-6665",
      reportTime: "4 Apr 2026, 14:37",
      platform: "WhatsApp",
      riskScore: 88,
      triageStatus: "Submitted" as const,
      reportedUrl: "https://cimb-hadiahspecial.com",
    },
    {
      ticketId: "TKT-CIMB-6664",
      reportTime: "4 Apr 2026, 14:33",
      platform: "SMS",
      riskScore: 61,
      triageStatus: "In Review" as const,
      reportedUrl: "+6281234500666",
    },
    {
      ticketId: "TKT-CIMB-6663",
      reportTime: "4 Apr 2026, 14:24",
      platform: "Email",
      riskScore: 15,
      triageStatus: "Closed" as const,
      reportedUrl: "security@cimb-notif.com",
    },
    {
      ticketId: "TKT-CIMB-6662",
      reportTime: "4 Apr 2026, 14:11",
      platform: "Website",
      riskScore: 92,
      triageStatus: "Closed" as const,
      reportedUrl: "https://cimb-promo-lebaran.net",
    },
    {
      ticketId: "TKT-CIMB-6661",
      reportTime: "4 Apr 2026, 13:44",
      platform: "WhatsApp",
      riskScore: 53,
      triageStatus: "In Review" as const,
      reportedUrl: "+6289012345678",
    },
    {
      ticketId: "TKT-CIMB-6660",
      reportTime: "4 Apr 2026, 13:27",
      platform: "SMS",
      riskScore: 35,
      triageStatus: "Closed" as const,
      reportedUrl: "+6282211223344",
    },
    {
      ticketId: "TKT-CIMB-6659",
      reportTime: "4 Apr 2026, 12:19",
      platform: "Website",
      riskScore: 78,
      triageStatus: "Closed" as const,
      reportedUrl: "https://reward-cimb-jkt.info",
    },
    {
      ticketId: "TKT-CIMB-6658",
      reportTime: "4 Apr 2026, 12:06",
      platform: "Email",
      riskScore: 82,
      triageStatus: "In Review" as const,
      reportedUrl: "verify@cimb-account-alert.com",
    },
    {
      ticketId: "TKT-CIMB-6657",
      reportTime: "4 Apr 2026, 11:53",
      platform: "WhatsApp",
      riskScore: 46,
      triageStatus: "Submitted" as const,
      reportedUrl: "+6285678901122",
    },
  ] as Report[],
};

export const ticketListDummyData: Report[] = [
  ...dashboardDummyData.latestReports,
  ...dashboardDummyData.latestReports.map((r, i) => ({ ...r, ticketId: `TKT-CIMB-555${i}` })),
  ...dashboardDummyData.latestReports.map((r, i) => ({ ...r, ticketId: `TKT-CIMB-444${i}` })),
];

export type BlacklistType = "URL" | "Phone Number";

export interface BlacklistItem {
  id: string;
  type: BlacklistType;
  value: string;
  reason: string;
  addedBy: string;
  date: string;
}

export const blacklistDummyData: BlacklistItem[] = [
  { id: "BL-001", type: "URL", value: "cimbniaga-reward.vip", reason: "ML Score 98 (Typosquatting)", addedBy: "System (Auto)", date: "4 Apr 2026" },
  {
    id: "BL-002",
    type: "Phone Number",
    value: "+6281234567890",
    reason: "Confirmed Phishing dari TKT-8827",
    addedBy: "Admin Budi",
    date: "4 Apr 2026",
  },
  { id: "BL-003", type: "URL", value: "octomobile-update.com", reason: "ML Score 95", addedBy: "System (Auto)", date: "4 Apr 2026" },
  { id: "BL-004", type: "URL", value: "cimb-promo-gratis.net", reason: "ML Score 91 (Fake Promo)", addedBy: "System (Auto)", date: "3 Apr 2026" },
  { id: "BL-005", type: "Phone Number", value: "+6289876543210", reason: "Dilaporkan 12 pengguna", addedBy: "Admin Sari", date: "3 Apr 2026" },
  {
    id: "BL-006",
    type: "URL",
    value: "reward-cimb-point.info",
    reason: "Confirmed Phishing dari TKT-8801",
    addedBy: "Admin Budi",
    date: "2 Apr 2026",
  },
  { id: "BL-007", type: "URL", value: "cimb-security-alert.org", reason: "ML Score 88", addedBy: "System (Auto)", date: "2 Apr 2026" },
  { id: "BL-008", type: "Phone Number", value: "+6285678901234", reason: "Dilaporkan 8 pengguna", addedBy: "Admin Sari", date: "1 Apr 2026" },
  {
    id: "BL-009",
    type: "URL",
    value: "fake-cimb-login.id",
    reason: "ML Score 99 (Credential Harvest)",
    addedBy: "System (Auto)",
    date: "1 Apr 2026",
  },
  {
    id: "BL-010",
    type: "URL",
    value: "cimb-hadiah-lebaran.com",
    reason: "Confirmed Phishing dari TKT-8790",
    addedBy: "Admin Budi",
    date: "31 Mar 2026",
  },
];
