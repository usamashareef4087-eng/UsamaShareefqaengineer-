import Link from 'next/link';
import LoginForm from '@/components/admin/LoginForm';
import '../admin.css';
export const metadata={title:'Admin sign in',robots:{index:false,follow:false}};
export default function Login(){return <main className="auth-page"><div className="auth-card"><Link className="admin-brand" href="/">USAMA SHAREEF<span>Portfolio administration</span></Link><p className="eyebrow">Secure access</p><h1>Sign in</h1><p>Manage your portfolio content and inquiries.</p><LoginForm/></div></main>}
