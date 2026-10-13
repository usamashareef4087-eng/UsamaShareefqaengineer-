import {z} from 'zod';
const text=z.string().trim().max(12000);const short=z.string().trim().max(250);const url=z.union([z.literal(''),z.string().url().max(2048).refine(v=>['https:','http:'].includes(new URL(v).protocol))]).nullable().optional();const common={published:z.boolean().optional(),display_order:z.number().int().min(0).max(10000).optional()};const array=z.array(short).max(100);const date=z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional();
export const schemas={
 projects:z.object({...common,title:short.min(1),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),category:short,overview:text,problem_statement:text.optional(),actual_role:text.optional(),work_performed:array.optional(),technologies:array.optional(),testing_approach:text.optional(),verified_results:text.optional(),thumbnail_id:z.string().uuid().nullable().optional(),github_url:url,live_demo_url:url,case_study_url:url,project_date:date,featured:z.boolean().optional(),seo_title:short.optional(),seo_description:short.optional()}),
 experience:z.object({...common,company_name:short.min(1),job_title:short.min(1),employment_type:short,start_month:z.number().int().min(1).max(12),start_year:z.number().int().min(1950).max(2200),end_month:z.number().int().min(1).max(12).nullable().optional(),end_year:z.number().int().min(1950).max(2200).nullable().optional(),currently_working:z.boolean(),location:short,work_mode:short,description:text,responsibilities:array,technologies:array,logo_id:z.string().uuid().nullable().optional()}),
 services:z.object({...common,title:short.min(1),description:text,business_problem:text.optional(),scope:array.optional(),deliverables:array.optional(),cta_text:short.optional()}),
 skills:z.object({...common,title:short.min(1),category:short,description:text.optional()}),
 education:z.object({...common,institution:short.min(1),degree:short,field_of_study:short,graduation_year:z.number().int().min(1950).max(2200),description:text.optional()}),
 certifications:z.object({...common,name:short.min(1),issuing_organization:short,issue_date:date,expiration_date:date,credential_id:short.optional(),verification_url:url,media_id:z.string().uuid().nullable().optional()}),
 page_sections:z.object({...common,slug:short.min(1),title:short,content:z.record(z.string(),z.unknown()).refine(v=>JSON.stringify(v).length<50000)}),
 site_settings:z.object({...common,key:short.regex(/^[a-z_]+$/),value:z.unknown().refine(v=>JSON.stringify(v).length<50000)}),
 seo_settings:z.object({...common,key:short.regex(/^[a-z_]+$/),value:z.unknown().refine(v=>JSON.stringify(v).length<50000)}),
 contact_inquiries:z.object({status:z.enum(['new','contacted','closed'])}),
 project_images:z.object({project_id:z.string().uuid(),media_id:z.string().uuid(),caption:short.optional(),display_order:z.number().int().min(0).max(10000).optional()}),
};
export type Collection=keyof typeof schemas;
export function collection(value:string):Collection|'media_assets'{if(!(value in schemas)&&value!=='media_assets')throw new Error('Invalid collection');return value as Collection|'media_assets'}
export const contactSchema=z.object({full_name:z.string().trim().min(2).max(120),email:z.string().email().max(254),company_name:z.string().trim().max(160).optional(),service_required:z.string().trim().min(1).max(160),project_description:z.string().trim().min(20).max(5000),expected_timeline:z.string().trim().max(160).optional(),website:z.string().max(0).optional()});
