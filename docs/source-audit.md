# Source audit

Inputs reviewed: `design-reference/stitch-code.html`, `design-reference/DESIGN.md`, and `design-reference/screen.png`.

The reference screenshot shows an editorial, white-and-blue portfolio with fine dividers, generous section spacing, a text-only hero and a dark contact section. The YAML/prose design specification sometimes differs on exact background colors and maximum width; the later development brief explicitly specifies `#FAFAF8`, 1200px and 20px mobile margins, so those values take precedence. No stock or generated portrait is needed.

The original HTML is a preview artifact. It loads Tailwind from a CDN and embeds a viewport switcher with Desktop/Tablet/Mobile controls and inline demonstration JavaScript. These are unsuitable as production navigation or a reliable responsive implementation. Its form and links are not wired to a persistence/authentication backend. The visible email and LinkedIn links include superseded or generic destinations, and the footer year is hardcoded.

The source also contains a "10x" defect-cost statement, inconsistent experience dates, unverified job/project descriptions, and a credential that was not supported by supplied evidence. None was imported into the public database. The review register lists each claim awaiting owner confirmation. The supplied contact email and LinkedIn link from the later brief replace the old HTML values.

The rebuild separates public server rendering, private CMS routes, validated API handlers, PostgreSQL tables and media storage. Only published rows reach public content queries. Admin operations verify the Supabase Auth identity, a protected admin role and MFA assurance when enabled. Inquiries are persisted before the UI reports acceptance. Missing external credentials remain an integration and production-verification blocker, not a reason to invent demo success.
