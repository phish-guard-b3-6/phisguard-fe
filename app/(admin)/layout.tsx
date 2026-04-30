import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import React from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar role={"admin"} />
      <main className="flex justify-center w-full flex-1">{children}</main>
      {/* <Footer /> */}
    </div>
  );
}
