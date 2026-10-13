import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPublishedProject } from "@/lib/db";
const text = (x: unknown) => (typeof x === "string" ? x : "");
export const dynamic = "force-dynamic";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPublishedProject(slug);
  if (!project) return { title: "Project not found", robots: { index: false } };
  return {
    title: text(project.seo_title) || text(project.title),
    description: text(project.seo_description) || text(project.overview),
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: text(project.title),
      description: text(project.overview),
      type: "article",
    },
  };
}
export default async function Project({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPublishedProject(slug);
  if (!p) notFound();
  return (
    <main className="wrap article">
      <Link className="text-link" href="/#work">
        ← Back to selected work
      </Link>
      <p className="eyebrow" style={{ marginTop: 45 }}>
        {text(p.category)}
      </p>
      <h1>{text(p.title)}</h1>
      <p>{text(p.overview)}</p>
      {Array.isArray(p.technologies) && p.technologies.length > 0 && (
        <p>
          <strong>Technologies:</strong> {p.technologies.join(" · ")}
        </p>
      )}
      {[
        ["The problem", p.problem_statement],
        ["Actual role", p.actual_role],
        ["Work performed", p.work_performed],
        ["Testing approach", p.testing_approach],
        ["Verified results", p.verified_results],
      ]
        .filter(([, v]) => v && (!Array.isArray(v) || v.length))
        .map(([label, value]) => (
          <section key={String(label)}>
            <h2>{label}</h2>
            {Array.isArray(value) ? (
              <ul>
                {value.map((s, i) => (
                  <li key={i}>{String(s)}</li>
                ))}
              </ul>
            ) : (
              <p>{text(value)}</p>
            )}
          </section>
        ))}
      {Array.isArray(p.project_images) && p.project_images.length > 0 && (
        <section>
          <h2>Project screenshots</h2>
          <div className="project-grid">
            {p.project_images.map(
              (image: {
                id: string;
                media_id: string;
                media_assets?: { alt_text?: string } | null;
              }) => (
                <Image
                  key={image.id}
                  src={`/api/media/${image.media_id}`}
                  alt={text(image.media_assets?.alt_text) || text(p.title)}
                  width={700}
                  height={420}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              ),
            )}
          </div>
        </section>
      )}
      <section>
        <h2>Links</h2>
        {[
          ["GitHub", p.github_url],
          ["Live demo", p.live_demo_url],
          ["Case study", p.case_study_url],
        ]
          .filter(([, url]) => url)
          .map(([label, url]) => (
            <p key={String(label)}>
              <a
                className="text-link"
                href={text(url)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {label} ↗
              </a>
            </p>
          ))}
      </section>
    </main>
  );
}
