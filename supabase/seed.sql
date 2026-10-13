-- User-approved editorial positioning only. No invented employment, credentials or case studies.
begin;
insert into public.page_sections(slug,title,content,published,display_order) values
('hero','Reliable Software. Confident Releases. Better User Experiences.', '{"description":"I’m Usama Shareef, a QA professional helping startups, software agencies, and growing businesses improve software reliability through manual testing, test automation, API testing, and structured quality assurance.","primary_cta":"Discuss Your QA Requirements","secondary_cta":"Explore My Work","expertise_line":"Manual Testing / Test Automation / API Testing / QA Leadership"}',true,0),
('about','Quality assurance with a clear purpose','{"description":"I focus on understanding product requirements, validating functionality, documenting defects clearly, and collaborating with development teams on release validation. My professional focus includes manual testing, API testing, test automation, and QA leadership."}',true,20),
('approach','A clear approach to quality','{"steps":[{"title":"Understand","description":"Clarify the product, users, risks, and release priorities."},{"title":"Plan","description":"Agree testing scope, priorities, and reporting expectations."},{"title":"Validate","description":"Test agreed workflows and document findings clearly."},{"title":"Communicate","description":"Share evidence, open risks, and practical next steps."}]}',true,70)
on conflict(slug) do nothing;
insert into public.site_settings(key,value,published) values
('profile','{"name":"Usama Shareef","email":"usamashareef4087@gmail.com","linkedin":"https://www.linkedin.com/in/usama-shareef-sqa/","positioning":"QA Team Lead | Software Quality Assurance Engineer | Software Testing Consultant"}',true)
on conflict(key) do nothing;
insert into public.site_settings(key,value,published) values
('theme','{"accent":"#2563EB","background":"#FAFAF8","dark_contact":"#101D32"}',true) on conflict(key) do nothing;
insert into public.site_settings(key,value,published) values
('sections_visibility','{"about":true,"expertise":true,"services":true,"experience":true,"work":true,"approach":true,"credentials":true}',true) on conflict(key) do nothing;
insert into public.seo_settings(key,value,published) values
('homepage','{"title":"Usama Shareef | Software Quality Assurance Consultant","description":"Manual testing, test automation, API testing and structured quality assurance for startups and software teams.","indexing":true,"og_title":"Usama Shareef | Software Quality Assurance Consultant","og_description":"Structured QA services for software teams."}',true)
on conflict(key) do nothing;
-- The supplied brief explicitly requests these broad service/expertise categories; no results or credentials are implied.
insert into public.services(title,description,business_problem,published,display_order)
select v.title,v.description,v.problem,true,v.ord from (values
('Manual Software Testing','Functional and regression testing tailored to agreed product requirements.','Bugs discovered too late',0),
('Test Automation','Discuss automation coverage for repeatable, high-priority workflows.','Repetitive validation work',1),
('API Testing','Validate agreed API behavior and integration scenarios.','Integration uncertainty',2),
('QA Process & Release Support','Clarify testing priorities, defect reporting, and release validation.','Uncertainty before release',3)
) v(title,description,problem,ord) where not exists(select 1 from public.services);
insert into public.skills(title,category,description,published,display_order)
select v.title,v.category,'',true,v.ord from (values
('Manual & Functional Testing','Manual Testing',0),('Test Automation','Automation',1),('API & Integration Testing','API Testing',2),('Performance & Load Testing','Performance Testing',3),('Web & Mobile Testing','Manual Testing',4),('QA Process & Team Leadership','Leadership',5)
) v(title,category,ord) where not exists(select 1 from public.skills);
commit;
