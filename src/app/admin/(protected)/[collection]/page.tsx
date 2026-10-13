export const dynamic='force-dynamic';
import {notFound} from 'next/navigation';
import CmsManager from '@/components/admin/CmsManager';
import {collections} from '@/components/admin/schema';
import {MediaManager} from '@/components/admin/MediaManager';
export default async function CollectionPage({params}:{params:Promise<{collection:string}>}){const {collection}=await params;if(collection==='media')return <MediaManager/>;if(!Object.hasOwn(collections,collection))notFound();return <CmsManager collection={collection}/>}
