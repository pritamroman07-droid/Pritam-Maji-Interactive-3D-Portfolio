import { Metadata } from "next";
import { getVisitors, listMessages } from "@/lib/db";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Dashboard — Pritam Maji",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const [visitors, messages] = await Promise.all([getVisitors(), listMessages()]);

  return (
    <main className="min-h-screen pt-10">
      <AdminDashboard initialStats={{ visitors, messages: messages.length }} />
    </main>
  );
}