import Link from "next/link";
import Image from "next/image";
import LoginForm from "@/components/admin/LoginForm";
import "../admin.css";
export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};
export default function Login() {
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
        <p className="eyebrow">Secure access</p>
        <h1>Sign in</h1>
        <p>Manage your portfolio content and inquiries.</p>
        <LoginForm />
      </div>
    </main>
  );
}
