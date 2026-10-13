import Link from "next/link";
import Image from "next/image";
import ResetForm from "@/components/admin/ResetForm";
import "../admin.css";
export const metadata = {
  title: "Reset admin password",
  robots: { index: false, follow: false },
};
export default function Reset() {
  return (
    <main className="auth-page">
      <div className="auth-card">
        <Link
          className="admin-brand admin-brand-image"
          href="/"
          aria-label="Usama Shareef portfolio home"
        >
          <Image
            src="/usama-shareef-logo-compact.png"
            alt=""
            width={190}
            height={130}
            priority
          />
        </Link>
        <h1>Reset your password</h1>
        <p>Enter your admin email to receive a recovery link.</p>
        <ResetForm />
      </div>
    </main>
  );
}
