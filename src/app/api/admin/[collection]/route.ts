import {NextRequest,NextResponse} from 'next/server';
import {requireAdmin} from '@/lib/auth';
import {collection,schemas} from '@/lib/validation';
import {assertOrigin,failure} from '@/lib/security';
import {revalidatePath} from 'next/cache';
type Context={params:Promise<{collection:string}>};
export async function GET(_request:NextRequest,context:Context){try{const {supabase}=await requireAdmin();const name=collection((await context.params).collection);const {data,error}=await supabase.from(name).select('*').order('updated_at',{ascending:false});if(error)throw error;return NextResponse.json({data})}catch(e){return failure(e)}}
async function mutate(request:NextRequest,context:Context,method:string){try{assertOrigin(request);const {supabase,user}=await requireAdmin();const name=collection((await context.params).collection);const body=await request.json();const id=body.id;if(method!=='POST'&&(!id||! /^[0-9a-f-]{36}$/i.test(id)))throw new Error('Invalid ID');let query;if(method==='DELETE'){if(name==='media_assets')throw new Error('Use media deletion endpoint');query=supabase.from(name).delete().eq('id',id)}else{if(name==='media_assets'||(name==='contact_inquiries'&&method==='POST'))throw new Error('Forbidden operation');const schema=schemas[name as keyof typeof schemas];const {id:ignored,...fields}=body;void ignored;const input=method==='PATCH'?schema.partial().parse(fields):schema.parse(fields);query=method==='POST'?supabase.from(name).insert(input):supabase.from(name).update(input).eq('id',id)}const {data,error}=await query.select().single();if(error)throw error;void user;revalidatePath('/','layout');return NextResponse.json({data})}catch(e){return failure(e)}}
export async function POST(r:NextRequest,c:Context){return mutate(r,c,'POST')}
export async function PATCH(r:NextRequest,c:Context){return mutate(r,c,'PATCH')}
export async function DELETE(r:NextRequest,c:Context){return mutate(r,c,'DELETE')}
