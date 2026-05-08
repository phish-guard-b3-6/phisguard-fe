import MainLayout from "@/components/layout/main-layout";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
