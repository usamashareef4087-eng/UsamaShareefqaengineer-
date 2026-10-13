import {createClient} from '@supabase/supabase-js';
const url=process.env.NEXT_PUBLIC_SUPABASE_URL;
const key=process.env.SUPABASE_SECRET_KEY;
if(!url||!key)throw new Error('Provide Supabase URL and server secret key through environment variables.');
const password=process.env.ADMIN_BOOTSTRAP_PASSWORD;
if(!password||password.length<12)throw new Error('Supply a unique ADMIN_BOOTSTRAP_PASSWORD of at least 12 characters through a secure environment variable.');
const db=createClient(url,key,{auth:{persistSession:false}});
const {data,error}=await db.auth.admin.createUser({email:'usamashareef4087@gmail.com',password,email_confirm:true});
if(error)throw new Error(error.message);
const {error:roleError}=await db.from('admin_profiles').insert({user_id:data.user.id,role:'admin'});
if(roleError){await db.auth.admin.deleteUser(data.user.id);throw roleError}
console.log('Administrator created. Remove ADMIN_BOOTSTRAP_PASSWORD from the environment and enable MFA after login.');
