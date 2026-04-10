import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        "flex flex-col min-h-screen",
        // Light mode: gradient putih ke merah muda
        "bg-[linear-gradient(to_bottom,#ffffff_0%,#ffffff_40%,#ffd6d6_100%)]",
        // Dark mode: gradient hitam ke abu biru gelap
        "dark:bg-[linear-gradient(to_bottom,#0f0f0f_0%,#0f0f0f_60%,#4a0000_100%)]",
        //  "dark:bg-[linear-gradient(to_bottom,#0f0f0f_0%,#1a1a2e_50%,#16213e_100%)]",
      ].join(" ")}
    >
      <Navbar />
      <main className="flex justify-center w-full flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
