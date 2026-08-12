import type { Metadata } from "next";
import { AdminApp } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — Pritam Maji",
  robots: { index: false, follow: false },
};

export default function AdminPage() {
  return (
    <main className="min-h-screen pt-32 lg:pt-36">
      <div className="container-x">
        <AdminApp />
      </div>
    </main>
  );
}