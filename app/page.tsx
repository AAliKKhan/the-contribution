import Link from "next/link";
import { book, chapters, platforms, prSearchUrl } from "./data/book";
import Search from "./components/Search";
import ThemeToggle from "./components/ThemeToggle";
import Reveal from "./components/Reveal";
import { ContributionCycle } from "./components/Diagrams";

const s = book.stats;

/* Shared button treatments — one primary, one ghost, used across the page. */
const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-accent-ink shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md";
const btnGhost =
  "inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 text-sm font-semibold text-ink transition duration-300 hover:-translate-y-0.5 hover:border-accent";

/* Rough reading time for a chapter, from its content length. */
function readingMinutes(ch: (typeof chapters)[number]): number {
  const words = ch.subChapters.reduce((sum, sub) => {
    const t = (sub.content ?? [])
      .map((b) =>
        b.type === "list" || b.type === "steps"
          ? b.items.join(" ")
          : "text" in b
            ? b.text
            : b.type === "table"
              ? b.rows.flat().join(" ")
              : ""
      )
      .join(" ");
    return sum + t.split(/\s+/).length;
  }, 0);
  return Math.max(5, Math.round(words / 220));
}

/* -------------------------------- Fragments ------------------------------- */

/** Editorial section header: numbered kicker + serif headline + lead. */
function SectionHead({
  num,
  kicker,
  title,
  lead,
  className = "",
}: {
  num: string;
  kicker: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <p className="eyebrow">
        <span className="num">{num}</span> — {kicker}
      </p>
      <h2 className="font-display mt-4 text-4xl leading-[1.1] text-ink text-balance md:text-[2.75rem]">
        {title}
      </h2>
      {lead && <p className="mt-4 text-pretty leading-relaxed text-muted">{lead}</p>}
    </div>
  );
}

/* ------------------------------- Sections -------------------------------- */

function Header() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-accent-ink">
            TC
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-semibold tracking-tight">{book.siteName}</span>
            <span className="hidden text-[10px] italic tracking-wide text-faint sm:block">{book.slogan}</span>
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-[13px] text-muted">
          <a href="#about" className="hidden transition hover:text-ink sm:inline">The book</a>
          <a href="#path" className="hidden transition hover:text-ink md:inline">Paths</a>
          <a href="#author" className="hidden transition hover:text-ink lg:inline">Author</a>
          <a href="#journey" className="hidden transition hover:text-ink lg:inline">Journey</a>
          <a href="#chapters" className="hidden transition hover:text-ink sm:inline">Chapters</a>
          <Link href="/glossary" className="hidden transition hover:text-ink md:inline">Glossary</Link>
          <Search />
          <ThemeToggle />
          <Link
            href="/book"
            className="rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-accent-ink transition hover:opacity-90"
          >
            Start reading
          </Link>
        </nav>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      {/* Architectural grid + soft glow */}
      <div className="hero-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-48 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-accent-soft blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 py-24 md:grid-cols-[1.05fr_0.95fr] md:py-32">
        <div>
          <p className="eyebrow">{book.siteName} · Free &amp; open · {chapters.length} chapters published</p>
          <h1 className="font-display mt-6 text-5xl leading-[1.03] text-ink text-balance md:text-6xl lg:text-[4.5rem]">
            How to Contribute to{" "}
            <em className="italic text-accent">Open Source</em>
          </h1>
          <p className="font-display mt-3 text-xl italic text-muted">{book.slogan}</p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty">
            {book.subtitle}
          </p>
          <p className="mt-3 max-w-xl text-sm text-faint">{book.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/book" className={btnPrimary}>
              Start reading <span aria-hidden>→</span>
            </Link>
            <a href="#chapters" className={btnGhost}>
              Browse chapters
            </a>
          </div>

          <p className="mt-10 border-t border-line pt-6 text-sm text-muted">
            <span className="font-display text-3xl leading-none text-accent">{s.mergedPRs}</span>{" "}
            merged pull requests —{" "}
            <a
              href={prSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              Google · OpenAI · n8n · OpenClaw
            </a>
          </p>
        </div>

        {/* Book cover */}
        <div className="flex justify-center md:justify-end">
          <div className="relative">
            <div
              className="absolute -inset-10 rounded-[2.5rem] bg-accent-soft blur-3xl"
              aria-hidden
            />
            <div className="relative w-64 rotate-[-2.5deg] overflow-hidden rounded-xl border border-line shadow-[0_32px_64px_-16px_rgba(0,0,0,0.35)] transition duration-500 hover:rotate-0 md:w-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/book-cover.svg"
                alt={`${book.title} — book cover`}
                className="block w-full"
                width={800}
                height={1200}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Mission() {
  return (
    <section className="border-b border-line py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="eyebrow">Our mission</p>
          <blockquote className="font-display mt-6 text-3xl italic leading-snug text-ink text-balance md:text-4xl">
            &ldquo;{book.mission}&rdquo;
          </blockquote>
          <div className="mx-auto mt-8 h-px w-12 bg-accent" aria-hidden />
        </Reveal>
      </div>
    </section>
  );
}

function About() {
  const points = [
    { title: "Find the right project", text: "Discover projects that match your skill level and interests." },
    { title: "Ship your first PR", text: "A step-by-step walkthrough of fork → branch → pull request → merge." },
    { title: "Master the unwritten rules", text: "Communication, code review etiquette, and issue etiquette maintainers notice." },
    { title: "Grow into a maintainer", text: "Go from first-time contributor to someone trusted with a project's future." },
  ];
  return (
    <section id="about" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          num="01"
          kicker="The book"
          title="What's inside this book?"
          lead="Open source feels intimidating until your first merged pull request. This book removes the guesswork — written from real experience, not theory."
        />

        {/* Hairline feature list — no cards, no emoji */}
        <div className="mt-14 grid gap-x-16 gap-y-10 sm:grid-cols-2">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 60}>
              <div className="border-t border-line pt-6">
                <p className="font-mono text-xs text-faint">0{i + 1}</p>
                <h3 className="font-display mt-2 text-xl text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* The loop this book teaches */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow">The loop this book teaches</p>
              <h3 className="font-display mt-3 text-2xl text-ink text-balance">
                One repeatable cycle — mastered in Chapters 1–3
              </h3>
            </div>
            <div className="mx-auto mt-8 max-w-3xl overflow-x-auto">
              <ContributionCycle />
            </div>
          </div>
        </Reveal>

        {/* Who this book is for */}
        <Reveal className="mt-16">
          <p className="eyebrow">Who this book is for</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-[0.14em] text-faint">
                  <th className="py-3 pr-4 font-semibold">Reader</th>
                  <th className="py-3 font-semibold">What you&apos;ll get</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <tr className="border-b border-line transition hover:bg-card">
                  <td className="py-4 pr-4 font-medium text-ink">Students &amp; self-taught devs</td>
                  <td className="py-4">A repeatable path from zero to a merged PR — no CS degree assumed.</td>
                </tr>
                <tr className="border-b border-line transition hover:bg-card">
                  <td className="py-4 pr-4 font-medium text-ink">Career-switchers</td>
                  <td className="py-4">Public proof of skill: merged contributions recruiters can click.</td>
                </tr>
                <tr className="border-b border-line transition hover:bg-card">
                  <td className="py-4 pr-4 font-medium text-ink">Working developers</td>
                  <td className="py-4">The unwritten rules of review etiquette and maintaining trust.</td>
                </tr>
                <tr className="transition hover:bg-card">
                  <td className="py-4 pr-4 font-medium text-ink">The AI-curious</td>
                  <td className="py-4">Chapter 4: a supervised AI workflow that runs your PR loop with you.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FindYourPath() {
  const paths = [
    {
      title: "Just curious",
      read: "Chapter 1",
      href: "/book#introduction",
      text: "Understand what open source is and why it pays — then decide.",
      time: "~20 min",
    },
    {
      title: "Ready to contribute",
      read: "Chapters 1 → 3",
      href: "/book#first-contribution",
      text: "Understand, set up your toolkit, and ship your first merged PR.",
      time: "~1 hr",
      featured: true,
    },
    {
      title: "Already contributing",
      read: "Chapters 4 → 5",
      href: "/book#contribute-with-opencode",
      text: "Automate the loop with an AI pair contributor, then build reputation.",
      time: "~45 min",
    },
  ];
  return (
    <section id="path" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          num="02"
          kicker="Find your path"
          title="Start where you stand"
          lead="Everyone climbs the same ladder — and you can stop at any rung. Pick the route that matches your experience today."
        />
        <div className="mt-12 border-t border-line">
          {paths.map((p, i) => (
            <Reveal key={p.title} delay={i * 70}>
              <Link
                href={p.href}
                className={`group flex items-start gap-6 border-b border-line px-2 py-8 transition duration-300 hover:bg-card sm:px-6 ${
                  p.featured ? "bg-accent-soft/50" : ""
                }`}
              >
                <span className="font-display w-14 shrink-0 text-3xl leading-none text-faint transition duration-300 group-hover:text-accent">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-2xl text-ink">{p.title}</h3>
                    {p.featured && (
                      <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-ink">
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{p.text}</p>
                  <p className="mt-3 font-mono text-xs text-faint">
                    {p.read} · {p.time}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="mt-2 hidden shrink-0 text-faint transition duration-300 group-hover:translate-x-1 group-hover:text-accent sm:block"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Author() {
  return (
    <section id="author" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_340px]">
          {/* Left — about me */}
          <Reveal>
            <p className="eyebrow">
              <span className="num">03</span> — About the author
            </p>
            <h2 className="font-display mt-4 text-4xl leading-tight text-ink text-balance md:text-5xl">
              {book.author.name}
            </h2>
            <p className="mt-2 font-mono text-sm text-faint">@{book.author.handle}</p>
            <p className="mt-4 text-sm font-medium text-accent">
              {book.author.role} · {book.author.location}
            </p>
            <p className="mt-6 max-w-2xl leading-relaxed text-muted text-pretty">
              {book.author.story}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={book.author.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-1.5 font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                GitHub
              </a>
              <a
                href={book.author.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-1.5 font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href={book.author.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-4 py-1.5 font-medium text-ink transition hover:border-accent hover:text-accent"
              >
                alicodez.com
              </a>
            </div>
          </Reveal>

          {/* Right — photo */}
          <Reveal delay={120} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-accent-soft blur-xl" aria-hidden />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.author.photo}
                alt={book.author.name}
                className="relative h-72 w-72 rounded-full border-2 border-accent/40 bg-card object-cover shadow-2xl"
              />
            </div>
          </Reveal>
        </div>

        {/* Logo slideshow — projects merged into */}
        <div className="mt-16 border-t border-line pt-8">
          <p className="eyebrow text-center">Pull requests merged into</p>
          <div className="marquee mt-6">
            <div className="marquee-track">
              {[...platforms, ...platforms].map((p, i) => (
                <a
                  key={`${p.repo}-${i}`}
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex shrink-0 items-center gap-3 rounded-2xl border border-line bg-card px-6 py-4 transition duration-300 hover:border-accent"
                >
                  {p.logo ? (
                    <span className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.logo} alt="" className="h-8 w-8 object-contain" />
                    </span>
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={p.avatar} alt="" className="h-10 w-10 rounded-xl" />
                  )}
                  <span>
                    <span className="block text-sm font-semibold text-ink">{p.name}</span>
                    <span className="block font-mono text-xs text-faint">
                      {p.repo} · ×{p.count} merged
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Journey() {
  const steps = [
    { year: "Apr 2024", title: "Started in public", text: "First GitHub account. Assignments and experiments pushed openly from day one." },
    { year: "2024–25", title: "Built in the open", text: `${s.publicRepos} public repositories — assignments, projects, and experiments.` },
    { year: "Now", title: "Merged into big projects", text: `${s.mergedPRs} merged pull requests across ${s.externalProjects} major platforms — Google, OpenAI, n8n & OpenClaw.` },
    { year: "Next", title: "Teaching what I learned", text: "This book — everything I wish someone had told me before my first PR." },
  ];
  return (
    <section id="journey" className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHead
          num="04"
          kicker="The journey"
          title="My open source journey"
          lead={`I'm ${book.author.name} (@${book.author.handle}) — ${book.author.role} from ${book.author.location}. Here's the path that made this book possible.`}
        />
        <div className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute bottom-2 left-[5px] top-2 w-px bg-line" aria-hidden />
          {steps.map((step, i) => (
            <Reveal key={i} delay={i * 90}>
              <div className="relative flex gap-8 pb-12 last:pb-0">
                <span
                  className="relative mt-1.5 h-[11px] w-[11px] shrink-0 rounded-full border-2 border-accent bg-bg"
                  aria-hidden
                />
                <div>
                  <p className="eyebrow">{step.year}</p>
                  <h3 className="font-display mt-1.5 text-2xl text-ink">{step.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{step.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    { value: `${s.publicRepos}`, label: "Public repositories" },
    { value: `${s.mergedPRs}`, label: "Merged pull requests", highlight: true },
    { value: `${s.externalProjects}`, label: "Platforms merged into" },
    { value: `${s.yearsInPublic} yrs`, label: "Building in public" },
    { value: `${chapters.length}`, label: "Chapters published" },
  ];
  return (
    <section className="border-b border-line py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <SectionHead
            num="05"
            kicker="Proof, not promises"
            title="Why trust this book?"
            lead="Everything here comes from real, public work on GitHub — verify it yourself."
          />
          <a
            href={book.author.github}
            target="_blank"
            rel="noreferrer"
            className="group flex shrink-0 items-center gap-3 rounded-full border border-line py-2 pl-2 pr-5 transition hover:border-accent"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.author.photo}
              alt={book.author.name}
              className="h-10 w-10 rounded-full border border-line bg-card"
            />
            <span>
              <span className="block text-sm font-semibold text-ink">@{book.author.handle}</span>
              <span className="block text-xs text-faint transition group-hover:text-accent">
                View GitHub profile →
              </span>
            </span>
          </a>
        </div>

        {/* Hairline metric row — serif numbers, no boxes */}
        <Reveal className="mt-14">
          <div className="grid grid-cols-2 border-y border-line lg:grid-cols-5">
            {stats.map((st, i) => (
              <div
                key={st.label}
                className={`border-line px-6 py-9 text-center ${i % 2 === 0 ? "border-r" : ""} ${
                  i < stats.length - 1 ? "border-b lg:border-b-0" : ""
                } lg:border-r lg:last:border-r-0`}
              >
                <div
                  className={`font-display text-5xl leading-none ${
                    st.highlight ? "text-accent" : "text-ink"
                  }`}
                >
                  {st.value}
                </div>
                <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-faint">
                  {st.label}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Every claim is a link, not a bullet —{" "}
            <a
              href={prSearchUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-ink underline decoration-accent/40 underline-offset-4 transition hover:decoration-accent"
            >
              see all {s.mergedPRs} merged pull requests on GitHub
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <section id="chapters" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            num="06"
            kicker="Table of contents"
            title="Chapters"
            lead="Five chapters — read them in order, or jump to the part you need."
          />
          <Link href="/book" className={`${btnGhost} no-print`}>
            Start reading <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-12 border-t border-line">
          {chapters.map((ch, i) => (
            <Reveal key={ch.slug} delay={i * 60}>
              <Link
                href={`/book#${ch.slug}`}
                className="group grid gap-x-8 gap-y-3 border-b border-line py-8 transition duration-300 hover:bg-card sm:grid-cols-[88px_1fr_auto] sm:px-4"
              >
                <span className="font-display text-5xl leading-none text-line transition duration-300 group-hover:text-accent sm:text-6xl">
                  {String(ch.number).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink md:text-[1.75rem]">{ch.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{ch.summary}</p>
                  {ch.objectives && (
                    <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                      {ch.objectives.map((o) => (
                        <li key={o} className="text-[13px] text-muted">
                          <span className="text-accent">✓</span> {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  <p className="mt-3 text-xs leading-relaxed text-faint">
                    {ch.subChapters.map((sub) => sub.title).join(" · ")}
                  </p>
                </div>
                <span className="font-mono text-xs text-faint sm:pt-3">
                  ~{readingMinutes(ch)} min
                </span>
              </Link>
            </Reveal>
          ))}
        </div>

        {/* Final CTA */}
        <Reveal className="mt-16">
          <div className="rounded-2xl border border-accent/25 bg-accent-soft px-8 py-14 text-center">
            <h3 className="font-display text-4xl text-ink text-balance">
              Ready to make your first contribution?
            </h3>
            <p className="mt-3 text-muted">
              Start reading today — it&apos;s free, and it starts with the basics.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/book" className={btnPrimary}>
                Start reading <span aria-hidden>→</span>
              </Link>
              <Link href="/glossary" className={btnGhost}>
                Browse the glossary
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-accent-ink">
              TC
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">{book.siteName}</span>
              <span className="text-[10px] italic tracking-wide text-faint">{book.slogan}</span>
            </span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{book.tagline}</p>
        </div>
        <div>
          <p className="eyebrow">The book</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><Link href="/book" className="transition hover:text-ink">Start reading</Link></li>
            <li><a href="#chapters" className="transition hover:text-ink">Chapters</a></li>
            <li><Link href="/glossary" className="transition hover:text-ink">Glossary</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">The author</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted">
            <li><a href={book.author.github} target="_blank" rel="noreferrer" className="transition hover:text-ink">GitHub</a></li>
            <li><a href={book.author.linkedin} target="_blank" rel="noreferrer" className="transition hover:text-ink">LinkedIn</a></li>
            <li><a href={book.author.website} target="_blank" rel="noreferrer" className="transition hover:text-ink">alicodez.com</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-faint md:flex-row md:items-center md:justify-between">
          <p>© 2026 {book.author.name} — {book.siteName}.</p>
          <p>v1.0 — {chapters.length} chapters live · Ch 6+ roadmap coming</p>
        </div>
      </div>
    </footer>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function Home() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <a href="#main" className="skip-link">Skip to main content</a>
      <Header />
      <div id="main">
        <Hero />
        <Mission />
        <About />
        <FindYourPath />
        <Author />
        <Journey />
        <Stats />
        <Chapters />
      </div>
      <Footer />
    </main>
  );
}
