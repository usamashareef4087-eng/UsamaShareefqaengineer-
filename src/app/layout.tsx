import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
const inter=Inter({subsets:['latin'],display:'swap'});
const base=process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
export const metadata: Metadata={metadataBase:new URL(base),title:{default:'Usama Shareef | Software Quality Assurance',template:'%s | Usama Shareef'},description:'Usama Shareef supports software teams with manual testing, test automation, API testing and quality assurance leadership.',alternates:{canonical:'/'},openGraph:{title:'Usama Shareef | Software Quality Assurance',description:'Reliable software. Confident releases. Better user experiences.',type:'profile',url:base},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={inter.className}>{children}</body></html>}
