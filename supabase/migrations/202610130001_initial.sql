begin;
create extension if not exists pgcrypto;
create table public.admin_profiles (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'admin' check(role='admin'),
 created_at timestamptz not null default now()
);
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = '' as $$
 select exists(select 1 from public.admin_profiles where user_id=auth.uid() and role='admin');
$$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon,authenticated,service_role;
create table public.site_settings (id uuid primary key default gen_random_uuid(),key text unique not null,value jsonb not null default '{}'::jsonb,published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.seo_settings (like public.site_settings including all);
create table public.page_sections (id uuid primary key default gen_random_uuid(),slug text unique not null,title text not null,content jsonb not null default '{}'::jsonb,published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.media_assets (id uuid primary key default gen_random_uuid(),name text not null,storage_path text unique not null,mime_type text not null check(mime_type in ('image/jpeg','image/png','image/webp','image/avif','application/pdf')),size_bytes bigint not null check(size_bytes between 1 and 10485760),alt_text text not null default '',created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.projects (id uuid primary key default gen_random_uuid(),slug text unique not null check(slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),title text not null,category text not null check(category in ('QA Testing Project','Test Automation Project','API Testing Project','Software Development Project','Academic Project','Research Project','Client Case Study')),overview text not null default '',problem_statement text not null default '',actual_role text not null default '',work_performed text[] not null default '{}',technologies text[] not null default '{}',testing_approach text not null default '',verified_results text not null default '',thumbnail_id uuid references public.media_assets(id) on delete restrict,github_url text,live_demo_url text,case_study_url text,project_date date,featured boolean not null default false,seo_title text,seo_description text,published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.project_images (id uuid primary key default gen_random_uuid(),project_id uuid not null references public.projects(id) on delete cascade,media_id uuid not null references public.media_assets(id) on delete restrict,caption text not null default '',display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now(),unique(project_id,media_id));
create table public.experience (id uuid primary key default gen_random_uuid(),company_name text not null,job_title text not null,employment_type text not null default 'Full-time',start_month integer not null check(start_month between 1 and 12),start_year integer not null check(start_year between 1950 and 2100),end_month integer check(end_month between 1 and 12),end_year integer check(end_year between 1950 and 2100),currently_working boolean not null default false,location text not null default '',work_mode text not null default 'Remote' check(work_mode in ('Remote','On-site','Hybrid')),description text not null default '',responsibilities text[] not null default '{}',technologies text[] not null default '{}',logo_id uuid references public.media_assets(id) on delete restrict,published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now(),check((currently_working and end_month is null and end_year is null) or (not currently_working and end_month is not null and end_year is not null)),check(currently_working or end_year*12+end_month >= start_year*12+start_month));
create table public.services (id uuid primary key default gen_random_uuid(),title text not null,description text not null default '',business_problem text not null default '',scope text[] not null default '{}',deliverables text[] not null default '{}',cta_text text not null default 'Discuss your requirements',published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.skills (id uuid primary key default gen_random_uuid(),title text not null,category text not null,description text not null default '',published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.education (id uuid primary key default gen_random_uuid(),institution text not null,degree text not null,field_of_study text not null default '',graduation_year integer check(graduation_year between 1950 and 2100),description text not null default '',published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.certifications (id uuid primary key default gen_random_uuid(),name text not null,issuing_organization text not null,issue_date date,expiration_date date,credential_id text,verification_url text,media_id uuid references public.media_assets(id) on delete restrict,published boolean not null default false,display_order integer not null default 0,created_at timestamptz not null default now(),updated_at timestamptz not null default now(),check(expiration_date is null or issue_date is null or expiration_date>=issue_date));
create table public.contact_inquiries (id uuid primary key default gen_random_uuid(),full_name text not null check(length(full_name) between 2 and 120),email text not null check(length(email)<=254),company_name text check(length(company_name)<=160),service_required text not null check(length(service_required)<=160),project_description text not null check(length(project_description) between 20 and 5000),expected_timeline text check(length(expected_timeline)<=160),status text not null default 'new' check(status in ('new','contacted','closed')),created_at timestamptz not null default now(),updated_at timestamptz not null default now());
create table public.audit_logs (id uuid primary key default gen_random_uuid(),actor_id uuid,table_name text not null,record_id text,action text not null,created_at timestamptz not null default now());
create table public.rate_limits (key text primary key,count integer not null default 1,window_start timestamptz not null default now());
create function public.consume_rate_limit(p_key text,p_limit integer,p_window_seconds integer) returns boolean language plpgsql security definer set search_path='' as $$
declare n integer;
begin
 if p_limit<1 or p_window_seconds<1 then raise exception 'Invalid limits'; end if;
 insert into public.rate_limits as r(key,count,window_start) values(p_key,1,now()) on conflict(key) do update set count=case when r.window_start<now()-make_interval(secs=>p_window_seconds) then 1 else r.count+1 end,window_start=case when r.window_start<now()-make_interval(secs=>p_window_seconds) then now() else r.window_start end returning count into n;
 return n<=p_limit;
end;$$;
revoke all on function public.consume_rate_limit(text,integer,integer) from public,anon,authenticated;
grant execute on function public.consume_rate_limit(text,integer,integer) to service_role;
create function public.touch_updated_at() returns trigger language plpgsql set search_path='' as $$ begin new.updated_at=now(); return new; end;$$;
create function public.record_audit() returns trigger language plpgsql security definer set search_path='' as $$
begin
 insert into public.audit_logs(actor_id,table_name,record_id,action) values(auth.uid(),TG_TABLE_NAME,coalesce(to_jsonb(new)->>'id',to_jsonb(old)->>'id'),TG_OP);
 return coalesce(new,old);
end;$$;
do $$ declare t text; begin
 foreach t in array array['site_settings','seo_settings','page_sections','projects','experience','services','skills','education','certifications'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy public_published on public.%I for select to anon,authenticated using (published)',t);
 execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',t);
 execute format('create trigger touch before update on public.%I for each row execute function public.touch_updated_at()',t);
 execute format('create trigger audit after insert or update or delete on public.%I for each row execute function public.record_audit()',t);
 execute format('create index on public.%I (published,display_order)',t);
 end loop;
 foreach t in array array['media_assets','project_images','contact_inquiries'] loop
 execute format('alter table public.%I enable row level security',t);
 execute format('create policy admin_all on public.%I for all to authenticated using (public.is_admin()) with check (public.is_admin())',t);
 execute format('create trigger touch before update on public.%I for each row execute function public.touch_updated_at()',t);
 execute format('create trigger audit after insert or update or delete on public.%I for each row execute function public.record_audit()',t);
 end loop;
end $$;
alter table public.admin_profiles enable row level security;
create policy own_admin_profile on public.admin_profiles for select to authenticated using(user_id=auth.uid());
alter table public.audit_logs enable row level security;
create policy admin_read on public.audit_logs for select to authenticated using(public.is_admin());
alter table public.rate_limits enable row level security;
create policy public_project_images on public.project_images for select to anon,authenticated using(exists(select 1 from public.projects p where p.id=project_id and p.published));
create policy public_used_media on public.media_assets for select to anon,authenticated using(exists(select 1 from public.projects p where p.published and p.thumbnail_id=media_assets.id) or exists(select 1 from public.project_images i join public.projects p on p.id=i.project_id where p.published and i.media_id=media_assets.id) or exists(select 1 from public.certifications c where c.published and c.media_id=media_assets.id) or exists(select 1 from public.experience e where e.published and e.logo_id=media_assets.id) or exists(select 1 from public.seo_settings s where s.published and (s.value->>'og_image_id'=media_assets.id::text or s.value->>'favicon_id'=media_assets.id::text))); 
create index on public.contact_inquiries(status,created_at desc);
create index on public.project_images(project_id,display_order);
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types) values('portfolio-media','portfolio-media',false,10485760,array['image/jpeg','image/png','image/webp','image/avif','application/pdf']) on conflict(id) do nothing;
create policy admin_storage on storage.objects for all to authenticated using(bucket_id='portfolio-media' and public.is_admin()) with check(bucket_id='portfolio-media' and public.is_admin());
-- Only explicitly published references may be fetched anonymously. Private unused media stays private.
create policy published_storage on storage.objects for select to anon,authenticated using(bucket_id='portfolio-media' and exists(
 select 1 from public.media_assets m where m.storage_path=name and (
 exists(select 1 from public.projects p where p.published and p.thumbnail_id=m.id)
 or exists(select 1 from public.project_images i join public.projects p on p.id=i.project_id where p.published and i.media_id=m.id)
 or exists(select 1 from public.certifications c where c.published and c.media_id=m.id)
 or exists(select 1 from public.experience e where e.published and e.logo_id=m.id)
 or exists(select 1 from public.seo_settings s where s.published and (s.value->>'og_image_id'=m.id::text or s.value->>'favicon_id'=m.id::text))
 )));
revoke all on public.admin_profiles,public.audit_logs,public.rate_limits from anon,authenticated;
grant select on public.site_settings,public.seo_settings,public.page_sections,public.projects,public.project_images,public.media_assets,public.experience,public.services,public.skills,public.education,public.certifications to anon;
grant select,insert,update,delete on public.site_settings,public.seo_settings,public.page_sections,public.projects,public.project_images,public.media_assets,public.experience,public.services,public.skills,public.education,public.certifications,public.contact_inquiries to authenticated;
grant select on public.admin_profiles,public.audit_logs to authenticated;
grant all on all tables in schema public to service_role;
commit;
