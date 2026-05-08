import MainLayout from "@/components/layout/main-layout";
import React from "react";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return <MainLayout role="user">{children}</MainLayout>;
}
//  className={[
//         "flex flex-col min-h-screen",
//         // Light mode: gradient putih ke merah muda
//         "bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_40%,#ffd6d6_100%)]",
//         // Dark mode: gradient hitam ke abu biru gelap
//         "dark:bg-[linear-gradient(to_bottom,#0f0f0f_0%,#0f0f0f_60%,#4a0000_100%)]",
//         //  "dark:bg-[linear-gradient(to_bottom,#0f0f0f_0%,#1a1a2e_50%,#16213e_100%)]",
//       ].join(" ")}
