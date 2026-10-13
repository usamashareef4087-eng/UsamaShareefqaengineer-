export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { AdminNav } from "@/components/admin/AdminNav";
import "../admin.css";
export const metadata = {
  title: "Admin | Usama Shareef",
  robots: { index: false, follow: false },
};
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  try {
    await requireAdmin();
  } catch {
    redirect("/admin/login");
  }
  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <Link
          className="admin-brand admin-brand-image sidebar-brand-image"
          href="/admin"
          aria-label="Usama Shareef portfolio workspace"
        >
          <Image
            src="/usama-shareef-logo-compact.png"
            alt=""
            width={156}
            height={107}
            priority
          />
        </Link>
        <AdminNav />
      </aside>
      <div className="admin-main">
        <header className="admin-top">
          <span>Content management</span>
          <a href="/" target="_blank" rel="noopener noreferrer">
            View website ↗
          </a>
        </header>
        <div className="admin-workspace">{children}</div>
      </div>
    </div>
  );
}
