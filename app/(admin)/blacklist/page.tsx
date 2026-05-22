import BlacklistHeader from "@/components/blacklist/BlacklistHeader";
import BlacklistTable from "@/components/blacklist/BlacklistTable";

export const metadata = {
  title: "Blacklist Management | CIMB PhishGuard",
  description: "Kelola daftar blacklist (URL dan Nomor Telepon) untuk CIMB PhishGuard.",
};

export default function BlacklistPage() {
  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-8">
      <BlacklistHeader />
      <BlacklistTable />
    </div>
  );
}
