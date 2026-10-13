import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { getPublicContent } from "@/lib/db";
import { configured } from "@/lib/supabase";
import { ContactForm } from "@/components/portfolio/ContactForm";
import { MobileMenu } from "@/components/portfolio/MobileMenu";
export const dynamic = "force-dynamic";
type Row = Record<string, unknown>;
const asText = (value: unknown, fallback = "") =>
  typeof value === "string" && value.trim() ? value : fallback;
const rows = (value: unknown): Row[] =>
  Array.isArray(value) ? (value as Row[]) : [];
const nav = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];
const baseServices: Row[] = [
  {
    title: "Manual Software Testing",
    description:
      "Structured checks of user journeys, functionality and regression risks before release.",
    business_problem: "Discover issues before they reach customers.",
  },
  {
    title: "Test Automation",
    description:
      "Repeatable checks for selected critical paths where automation makes maintenance practical.",
    business_problem: "Reduce repeated manual checks across releases.",
  },
  {
    title: "API Testing",
    description:
      "Validation of endpoints, responses and integrations against agreed requirements.",
    business_problem: "Find integration issues earlier.",
  },
  {
    title: "QA Process & Release Support",
    description:
      "Test planning, defect reporting and release checks with clear communication across the team.",
    business_problem: "Make release decisions with better information.",
  },
];
const expertise = [
  {
    title: "Manual & Functional Testing",
    detail:
      "Explore expected behavior, edge cases and user journeys through structured manual checks.",
  },
  {
    title: "Test Automation",
    detail:
      "Design repeatable checks for high-value workflows and support sustainable test suites.",
  },
  {
    title: "API & Integration Testing",
    detail:
      "Verify requests, responses and the handoffs between connected services.",
  },
  {
    title: "Performance & Load Testing",
    detail:
      "Assess behavior under agreed traffic and workload scenarios when the project requires it.",
  },
  {
    title: "Web & Mobile Testing",
    detail:
      "Review interactions, compatibility and usability across relevant devices and browsers.",
  },
  {
    title: "QA Process & Team Leadership",
    detail:
      "Coordinate test priorities, defect communication and release validation with delivery teams.",
  },
];
const approach = [
  {
    title: "Understand",
    text: "Learn the product, its users, the release context and the highest-risk workflows.",
  },
  {
    title: "Plan",
    text: "Agree on scope, priorities, environments and practical acceptance criteria.",
  },
  {
    title: "Validate",
    text: "Execute focused checks, document findings and retest fixes.",
  },
  {
    title: "Communicate",
    text: "Share clear evidence and concise release information with the team.",
  },
];
const date = (row: Row, prefix: "start" | "end") => {
  const y = Number(row[`${prefix}_year`]);
  const m = Number(row[`${prefix}_month`]);
  if (!Number.isInteger(y) || y < 1900) return "";
  return m >= 1 && m <= 12
    ? `${new Date(y, m - 1).toLocaleString("en", { month: "short" })} ${y}`
    : String(y);
};
export async function generateMetadata(): Promise<Metadata> {
  const data = await getPublicContent();
  const seo = data.seo_settings.find((item) => item.key === "homepage");
  const value =
    seo?.value && typeof seo.value === "object" ? (seo.value as Row) : {};
  const title = asText(
    value.title,
    "Usama Shareef | Software Quality Assurance Consultant",
  );
  const description = asText(
    value.description,
    "Software quality assurance services for startups and software teams.",
  );
  const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonical = (() => {
    if (typeof value.canonical_url === "string") {
      try {
        const candidate = new URL(value.canonical_url);
        if (candidate.origin === new URL(site).origin) return candidate.href;
      } catch {
        // Invalid CMS values fall back to the configured site URL.
      }
    }
    return site;
  })();
  const image =
    typeof value.og_image_id === "string" &&
    /^[0-9a-f-]{36}$/i.test(value.og_image_id)
      ? `/api/media/${value.og_image_id}`
      : undefined;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: asText(value.og_title, title),
      description: asText(value.og_description, description),
      images: image ? [image] : undefined,
    },
    icons:
      typeof value.favicon_id === "string" &&
      /^[0-9a-f-]{36}$/i.test(value.favicon_id)
        ? { icon: `/api/media/${value.favicon_id}` }
        : undefined,
    robots: {
      index: value.indexing !== false,
      follow: value.indexing !== false,
    },
  };
}
export default async function Home() {
  const data = await getPublicContent();
  const projects = rows(data.projects);
  const jobs = rows(data.experience);
  const services = rows(data.services);
  const education = rows(data.education);
  const certifications = rows(data.certifications);
  const settings = rows(data.site_settings);
  const sections = rows(data.page_sections);
  const profileValue = settings.find((r) => r.key === "profile")?.value;
  const profile =
    profileValue && typeof profileValue === "object"
      ? (profileValue as Row)
      : {};
  const publicEmail =
    typeof profile.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)
      ? profile.email
      : "usamashareef4087@gmail.com";
  const linkedin =
    typeof profile.linkedin === "string" &&
    profile.linkedin.startsWith("https://www.linkedin.com/in/")
      ? profile.linkedin
      : "https://www.linkedin.com/in/usama-shareef-sqa/";
  const configuredSite = configured();
  const visibilityValue = settings.find(
    (r) => r.key === "sections_visibility",
  )?.value;
  const visibility =
    visibilityValue && typeof visibilityValue === "object"
      ? (visibilityValue as Row)
      : {};
  const visible = (key: string) => visibility[key] !== false;
  const getSetting = (key: string, fallback: string) => {
    const item = settings.find((r) => r.key === key);
    return asText(item?.value, fallback);
  };
  const section = (slug: string) => sections.find((r) => r.slug === slug);
  const sectionText = (slug: string, key: string, fallback: string) => {
    const value = section(slug)?.content;
    return typeof value === "object" && value !== null
      ? asText((value as Row)[key], fallback)
      : fallback;
  };
  const stepsContent = section("approach")?.content;
  const steps =
    typeof stepsContent === "object" &&
    stepsContent !== null &&
    Array.isArray((stepsContent as Row).steps)
      ? ((stepsContent as Row).steps as Row[]).map((r) => ({
          title: asText(r.title),
          text: asText(r.description),
        }))
      : approach;
  const heroHeadline = getSetting(
    "hero_headline",
    asText(
      section("hero")?.title,
      "Reliable Software. Confident Releases. Better User Experiences.",
    ),
  );
  const heroDescription = getSetting(
    "hero_description",
    sectionText(
      "hero",
      "description",
      "I’m Usama Shareef, a QA professional helping startups, software agencies, and growing businesses improve software reliability through manual testing, test automation, API testing, and structured quality assurance.",
    ),
  );
  const themeValue = settings.find((r) => r.key === "theme")?.value;
  const theme =
    themeValue && typeof themeValue === "object" ? (themeValue as Row) : {};
  const color = (value: unknown, fallback: string) =>
    typeof value === "string" && /^#[0-9a-f]{6}$/i.test(value)
      ? value
      : fallback;
  const appearance = {
    "--blue": color(theme.accent, "#2563EB"),
    "--paper": color(theme.background, "#FAFAF8"),
    "--navy": color(theme.dark_contact, "#101D32"),
    "--button-radius":
      typeof theme.button_radius === "number" &&
      theme.button_radius >= 0 &&
      theme.button_radius <= 12
        ? `${theme.button_radius}px`
        : "4px",
  } as CSSProperties;
  const navigationValue = settings.find(
    (r) => r.key === "navigation_labels",
  )?.value;
  const navigation =
    navigationValue && typeof navigationValue === "object"
      ? (navigationValue as Row)
      : {};
  const footerText = getSetting("footer_text", "All rights reserved.");
  const primaryCTA = sectionText(
    "hero",
    "primary_cta",
    "Discuss Your QA Requirements",
  );
  const secondaryCTA = sectionText("hero", "secondary_cta", "Explore My Work");
  const secondaryTarget =
    projects.length > 0 && visible("work")
      ? "#work"
      : visible("approach")
        ? "#approach"
        : "#contact";
  const pageNav = nav
    .filter((item) => visible(item.label.toLowerCase()))
    .map((item) =>
      item.label === "Experience" && jobs.length === 0
        ? { ...item, href: linkedin }
        : item.label === "Work" && projects.length === 0
          ? { ...item, href: secondaryTarget }
          : item,
    )
    .map((item) => ({
      ...item,
      label: asText(navigation[item.label.toLowerCase()], item.label),
    }));
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    mainEntity: {
      "@type": "Person",
      name: "Usama Shareef",
      url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      sameAs: [linkedin],
      email: publicEmail,
      jobTitle: "Software Quality Assurance Engineer",
    },
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
        }}
      />
      <div style={appearance}>
        <header className="site-header">
          <div className="wrap header-inner">
            <Link href="/" className="wordmark" aria-label="Usama Shareef home">
              USAMA SHAREEF<span>Software Quality Assurance</span>
            </Link>
            <nav className="desktop-nav" aria-label="Main navigation">
              {pageNav.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.label}
                </a>
              ))}
            </nav>
            <a href="#contact" className="button button-primary header-cta">
              Let’s Talk <span aria-hidden="true">↗</span>
            </a>
            <MobileMenu items={pageNav} />
          </div>
        </header>
        <main>
          <section className="hero">
            <div className="wrap hero-grid">
              <div>
                <p className="eyebrow">
                  Independent software quality assurance
                </p>
                <h1>
                  {heroHeadline ===
                  "Reliable Software. Confident Releases. Better User Experiences." ? (
                    <>
                      Reliable Software. <em>Confident Releases.</em> Better
                      User Experiences.
                    </>
                  ) : (
                    heroHeadline
                  )}
                </h1>
                <p className="hero-lead">{heroDescription}</p>
                <div className="hero-actions">
                  <a className="button button-primary" href="#contact">
                    {primaryCTA} <span aria-hidden="true">↗</span>
                  </a>
                  <a className="button button-outline" href={secondaryTarget}>
                    {secondaryCTA} <span aria-hidden="true">↘</span>
                  </a>
                </div>
              </div>
              <div className="hero-aside">
                <div className="availability-pill">
                  <span aria-hidden="true" /> Open to QA conversations
                </div>
                <p className="aside-title">A clearer path to release</p>
                <p className="aside-copy">
                  Practical testing that turns product risk into focused,
                  actionable information.
                </p>
                <div className="quality-signals" aria-label="QA approach">
                  <div>
                    <span>01</span>
                    <strong>Risk-led scope</strong>
                    <small>Focus effort where failure matters most.</small>
                  </div>
                  <div>
                    <span>02</span>
                    <strong>Evidence-first reporting</strong>
                    <small>Make every finding easier to reproduce.</small>
                  </div>
                  <div>
                    <span>03</span>
                    <strong>Release-ready clarity</strong>
                    <small>Know what was checked and what remains.</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="expertise-strip">
            <div className="wrap">
              Manual Testing &nbsp;/&nbsp; Test Automation &nbsp;/&nbsp; API
              Testing &nbsp;/&nbsp; QA Leadership
            </div>
          </div>
          <section
            className="section section-alt"
            aria-labelledby="problems-title"
          >
            <div className="wrap">
              <div className="section-intro">
                <p className="eyebrow">Where quality matters</p>
                <h2 id="problems-title">
                  Software issues shouldn’t become business problems.
                </h2>
                <p>
                  Clear testing and early communication help teams see risks
                  before a release reaches customers.
                </p>
              </div>
              <div className="problem-grid">
                <div className="problem">
                  <span className="number">01 / LATE DISCOVERY</span>
                  <h3>Bugs Discovered Too Late</h3>
                  <p>
                    Defects found near launch can disrupt plans and require
                    urgent rework. Prioritized testing helps surface issues
                    while there is still time to respond.
                  </p>
                </div>
                <div className="problem">
                  <span className="number">02 / INCONSISTENCY</span>
                  <h3>Inconsistent Product Quality</h3>
                  <p>
                    When releases move quickly, important workflows can be
                    checked unevenly. A repeatable approach makes coverage and
                    remaining gaps easier to see.
                  </p>
                </div>
                <div className="problem">
                  <span className="number">03 / RELEASE RISK</span>
                  <h3>Uncertainty Before Release</h3>
                  <p>
                    Teams need useful evidence for release decisions. Clear
                    findings and retesting show what has been checked and what
                    still requires attention.
                  </p>
                </div>
              </div>
            </div>
          </section>
          {visible("about") && (
            <section className="section" id="about">
              <div className="wrap two-col">
                <div>
                  <p className="eyebrow">About Usama</p>
                  <h2>
                    A quality-focused professional with a practical approach.
                  </h2>
                </div>
                <div className="about-copy">
                  <p>
                    {sectionText(
                      "about",
                      "description",
                      "I’m Usama Shareef, a software quality assurance professional focused on practical testing and clear communication. I work with teams to understand product requirements, identify defects and support release validation.",
                    )}
                  </p>
                  <p>
                    My work spans functional testing, API checks, test
                    automation and collaboration with development and product
                    teams. I focus on documenting findings that people can act
                    on.
                  </p>
                  <a
                    className="text-link"
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View LinkedIn profile <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
            </section>
          )}
          {visible("expertise") && (
            <section className="section section-alt" id="expertise">
              <div className="wrap">
                <div className="section-intro">
                  <p className="eyebrow">Expertise</p>
                  <h2>Six foundations of high-reliability testing.</h2>
                  <p>
                    Methods can be adapted to the product, team and stage of
                    delivery. Scope is agreed for each engagement.
                  </p>
                </div>
                <div className="expertise-grid">
                  {(data.skills.length
                    ? data.skills.map((row) => ({
                        title: asText(row.title),
                        detail: asText(
                          row.description,
                          expertise.find((item) => item.title === row.title)
                            ?.detail ||
                            "Discuss the right approach for the project.",
                        ),
                      }))
                    : configuredSite
                      ? []
                      : expertise
                  ).map((item, i) => (
                    <div className="expertise-item" key={item.title}>
                      <span className="number">0{i + 1}</span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {visible("services") && (
            <section className="section" id="services">
              <div className="wrap">
                <div className="section-intro">
                  <p className="eyebrow">Services</p>
                  <h2>
                    Independent QA support for teams that care about quality.
                  </h2>
                  <p>
                    Choose a focused testing need or discuss a broader release
                    challenge. The exact scope and deliverables are agreed
                    together.
                  </p>
                </div>
                <div className="service-grid">
                  {(services.length
                    ? services
                    : configuredSite
                      ? []
                      : baseServices
                  ).map((service, i) => (
                    <article
                      className="service"
                      key={String("id" in service ? service.id : i)}
                    >
                      <span className="number">SERVICE / 0{i + 1}</span>
                      <h3>{asText(service.title)}</h3>
                      <p>{asText(service.description)}</p>
                      {Array.isArray(service.deliverables) &&
                        service.deliverables.length > 0 && (
                          <ul className="service-deliverables">
                            {service.deliverables.map(
                              (item: unknown, i: number) => (
                                <li key={i}>{asText(item)}</li>
                              ),
                            )}
                          </ul>
                        )}
                      <a href="#contact" className="text-link">
                        {asText(
                          "cta_text" in service ? service.cta_text : null,
                          "Discuss this service",
                        )}{" "}
                        <span aria-hidden="true">↗</span>
                      </a>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}
          {visible("experience") && jobs.length > 0 && (
            <section className="section section-alt" id="experience">
              <div className="wrap">
                <div className="section-intro">
                  <p className="eyebrow">Experience</p>
                  <h2>
                    Experience built through real-world quality assurance.
                  </h2>
                  <p>
                    Employment details are added after dates, titles and
                    responsibilities are confirmed.
                  </p>
                </div>
                {jobs.length ? (
                  <div>
                    {jobs.map((row) => (
                      <article className="experience-row" key={String(row.id)}>
                        <div>
                          <h3>{asText(row.job_title)}</h3>
                          <p>{asText(row.company_name)}</p>
                        </div>
                        <div>
                          <div className="experience-date">
                            {date(row, "start")} —{" "}
                            {row.currently_working
                              ? "Present"
                              : date(row, "end")}{" "}
                            · {asText(row.work_mode)}
                          </div>
                          <p>{asText(row.description)}</p>
                          {Array.isArray(row.responsibilities) &&
                            row.responsibilities.length > 0 && (
                              <ul className="experience-list">
                                {row.responsibilities.map(
                                  (item: unknown, i: number) => (
                                    <li key={i}>{asText(item)}</li>
                                  ),
                                )}
                              </ul>
                            )}
                        </div>
                      </article>
                    ))}
                  </div>
                ) : (
                  <a
                    className="text-link"
                    href={linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See current professional profile{" "}
                    <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </section>
          )}
          {visible("work") && projects.length > 0 && (
            <section className="section" id="work">
              <div className="wrap">
                <div className="section-intro">
                  <p className="eyebrow">Selected work</p>
                  <h2>Quality work grounded in the project’s needs.</h2>
                  <p>
                    Case studies are published here after project details and
                    permission to share them are confirmed.
                  </p>
                </div>
                {projects.length > 0 && (
                  <div className="project-grid">
                    {projects.map((row) => (
                      <article className="project" key={String(row.id)}>
                        {typeof row.thumbnail_id === "string" && (
                          <Image
                            src={`/api/media/${row.thumbnail_id}`}
                            alt={asText(row.title)}
                            width={560}
                            height={300}
                            style={{
                              width: "100%",
                              height: "auto",
                              marginBottom: 18,
                            }}
                          />
                        )}
                        <span className="number">
                          {asText(row.category, "PROJECT")}
                        </span>
                        <h3>{asText(row.title)}</h3>
                        <p>{asText(row.overview)}</p>
                        <Link
                          className="text-link"
                          href={`/projects/${encodeURIComponent(asText(row.slug))}`}
                        >
                          Read project details <span aria-hidden="true">↗</span>
                        </Link>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}
          {visible("approach") && (
            <section className="section section-alt" id="approach">
              <div className="wrap">
                <div className="section-intro">
                  <p className="eyebrow">Working approach</p>
                  <h2>A clear, structured approach to software quality.</h2>
                  <p>
                    Every product is different. The process stays transparent
                    from the first conversation through release checks.
                  </p>
                </div>
                <div className="approach">
                  {steps.map((step, i) => (
                    <div className="approach-step" key={step.title}>
                      <span className="number">0{i + 1} / 04</span>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          {visible("credentials") &&
            (education.length > 0 || certifications.length > 0) && (
              <section className="section">
                <div className="wrap">
                  <div className="section-intro">
                    <p className="eyebrow">Credentials</p>
                    <h2>Education and professional learning.</h2>
                  </div>
                  <div className="credential-grid">
                    {education.map((row) => (
                      <div className="credential" key={String(row.id)}>
                        <h3>{asText(row.degree)}</h3>
                        <p>
                          {asText(row.institution)}
                          {row.graduation_year
                            ? ` · ${String(row.graduation_year)}`
                            : ""}
                        </p>
                      </div>
                    ))}
                    {certifications.map((row) => (
                      <div className="credential" key={String(row.id)}>
                        <h3>{asText(row.name)}</h3>
                        <p>{asText(row.issuing_organization)}</p>
                        {Boolean(row.verification_url) && (
                          <a
                            className="text-link"
                            href={asText(row.verification_url)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Verify credential ↗
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}
          <section className="section contact" id="contact">
            <div className="wrap contact-grid">
              <div>
                <p className="eyebrow">Contact</p>
                <h2>
                  Planning a release? Let’s make quality part of the
                  conversation.
                </h2>
                <p className="section-copy">
                  Tell me about your product, your testing needs and what you
                  want to achieve. I’ll review the details and respond directly.
                </p>
                <div className="contact-links">
                  <a href={`mailto:${publicEmail}`}>{publicEmail} ↗</a>
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    Connect on LinkedIn ↗
                  </a>
                </div>
              </div>
              <ContactForm />
            </div>
          </section>
        </main>
        <footer className="site-footer">
          <div className="wrap footer-inner">
            <span>
              © {new Date().getFullYear()} Usama Shareef. {footerText}
            </span>
            <nav aria-label="Footer navigation">
              {visible("about") && <a href="#about">About</a>}
              {visible("services") && <a href="#services">Services</a>}
              {(visible("approach") ||
                (visible("work") && projects.length > 0)) && (
                <a href={secondaryTarget}>Work</a>
              )}
              <a href="#contact">Contact</a>
              <a href="/privacy">Privacy</a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
