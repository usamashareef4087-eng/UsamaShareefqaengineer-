import {NextRequest} from 'next/server';
import {PATCH as patch,DELETE as remove} from '../route';
type Context={params:Promise<{collection:string,id:string}>};
async function adapt(r:NextRequest,c:Context,fn:typeof patch){const p=await c.params;const body=r.method==='DELETE'?{}:await r.json();return fn(new NextRequest(r.url,{method:r.method,headers:r.headers,body:JSON.stringify({...body,id:p.id})}),{params:Promise.resolve({collection:p.collection})})}
export function PATCH(r:NextRequest,c:Context){return adapt(r,c,patch)}
export function DELETE(r:NextRequest,c:Context){return adapt(r,c,remove)}
