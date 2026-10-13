import type {MetadataRoute} from 'next';
import {getPublicContent} from '@/lib/db';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const base=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';const content=await getPublicContent();return [{url:base,lastModified:new Date(),changeFrequency:'monthly',priority:1},{url:`${base}/privacy`,changeFrequency:'yearly',priority:.2},...content.projects.filter(p=>typeof p.slug==='string').map(p=>({url:`${base}/projects/${p.slug}`,lastModified:new Date(String(p.updated_at||Date.now())),changeFrequency:'monthly' as const,priority:.6}))]}
