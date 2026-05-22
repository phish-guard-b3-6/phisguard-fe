"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";

interface DailyStat {
  date: string;
  total_reports: number;
  high_risk_count: number;
  medium_risk_count: number;
  low_risk_count: number;
}

interface PhishingChannels {
  [key: string]: number;
}

interface ChartsSectionProps {
  dailyStats?: DailyStat[];
  phishingChannels?: PhishingChannels;
}

export default function ChartsSection({ dailyStats = [], phishingChannels = {} }: ChartsSectionProps) {
  // 1. Prepare data for Phishing Incident Trends (Stacked Bar - Aggregated by Month for 2026)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const trendsData = months.map((m) => ({
    name: m,
    ReportTotal: 0,
    HighRisk: 0,
    OtherReports: 0,
  }));

  dailyStats.forEach((stat) => {
    const d = new Date(stat.date);
    if (d.getFullYear() === 2026) {
      const monthIndex = d.getMonth();
      trendsData[monthIndex].ReportTotal += stat.total_reports;
      trendsData[monthIndex].HighRisk += stat.high_risk_count;
      trendsData[monthIndex].OtherReports += stat.total_reports - stat.high_risk_count;
    }
  });

  // 2. Prepare data for Top 5 Attack Methods (Horizontal Bar)
  const channelColors: Record<string, string> = {
    Email: "#EF4444", // Red
    Whatsapp: "#F59E0B", // Yellow/Orange
    Sms: "#4F46E5", // Indigo/Blue
    Website: "#4F46E5", // Indigo/Blue
  };

  const methodsData = Object.entries(phishingChannels)
    .map(([key, value]) => {
      // Capitalize first letter
      const formattedKey = key.charAt(0).toUpperCase() + key.slice(1).toLowerCase();
      return {
        name: formattedKey === "Sms" ? "SMS" : formattedKey,
        count: value,
        fill: channelColors[formattedKey] || "#6B7280",
      };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Phishing Incident Trends */}
      <div className="flex-1 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col min-h-[450px] w-full md:w-1/2">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Phishing Incident Trends</p>
        <div className="flex-1 w-full min-h-[350px] -ml-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendsData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} dy={10} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#6B7280" }}
                domain={[0, 100]}
                ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                interval={0}
              />
              <Tooltip
                cursor={{ fill: "#F3F4F6", opacity: 0.6 }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
                formatter={(value: any, name: any) => [value, name === "Report Total" ? "Non-High Risk" : "High Risk"]}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="square"
                iconSize={10}
                formatter={(value) => (
                  <span className="text-xs text-gray-500 font-medium ml-1">{value === "Report Total" ? "Report Total" : "High Risk"}</span>
                )}
              />
              {/* Stack bars */}
              <Bar dataKey="OtherReports" stackId="a" fill="#9CA3AF" name="Report Total" radius={[0, 0, 0, 0]} barSize={8} />
              <Bar dataKey="HighRisk" stackId="a" fill="#EF4444" name="High Risk" radius={[4, 4, 0, 0]} barSize={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top 5 Phishing Channel */}
      <div className="flex-1 bg-white dark:bg-gray-900/60 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm p-5 md:p-6 flex flex-col min-h-[450px] w-full md:w-1/2">
        <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Top 5 Phishing Channel</p>
        <div className="flex-1 w-full min-h-[350px] -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={methodsData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
              <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#6B7280" }} />
              <YAxis
                dataKey="name"
                type="category"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#4B5563", fontWeight: 500 }}
                width={70}
              />
              <Tooltip
                cursor={{ fill: "#F3F4F6", opacity: 0.6 }}
                contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={16}>
                {methodsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
