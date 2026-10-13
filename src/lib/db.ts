import "server-only";
import { configured, serverDB } from "./supabase";
export type ContentRecord = Record<string, unknown>;
const names = [
  "projects",
  "experience",
  "services",
  "skills",
  "education",
  "certifications",
  "page_sections",
  "site_settings",
  "seo_settings",
] as const;
export type PublicContent = Record<(typeof names)[number], ContentRecord[]>;
export async function getPublicContent(): Promise<PublicContent> {
  const result = Object.fromEntries(
    names.map((name) => [name, []]),
  ) as unknown as PublicContent;
  if (!configured()) return result;
  const db = await serverDB();
  await Promise.all(
    names.map(async (name) => {
      let query = db.from(name).select("*");
      query = query.eq("published", true).order("display_order");
      const { data, error } = await query;
      if (error)
        throw new Error(`Unable to load published ${name}: ${error.message}`);
      result[name] = data || [];
    }),
  );
  return result;
}
export async function getPublishedProject(slug: string) {
  if (!configured()) return null;
  const db = await serverDB();
  const { data, error } = await db
    .from("projects")
    .select("*, project_images(*, media_assets(*))")
    .eq("slug", slug)
    .eq("published", true)
    .order("display_order", { referencedTable: "project_images" })
    .maybeSingle();
  if (error)
    throw new Error(`Unable to load published project: ${error.message}`);
  return data;
}
