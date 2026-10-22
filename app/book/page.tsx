import Link from "next/link";
import { book, chapters, preface, prSearchUrl, type Block, type Chapter } from "../data/book";
import Search from "../components/Search";
import ThemeToggle from "../components/ThemeToggle";
import ReadingProgress from "../components/ReadingProgress";
import OnThisPage from "../components/OnThisPage";
import MobileToc from "../components/MobileToc";
import {
  ContributionCycle,
  RemotesMap,
  AiLoop,
  ReputationLadder,
} from "../components/Diagrams";

export const metadata = {
  title: `Read — ${book.title}`,
  description: book.subtitle,
};

/* ------------------------------ Text helpers ------------------------------ */

function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\)|`[^`]+`)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-ink">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const external = link[2].startsWith("http");
          return (
            <a
              key={i}
              href={link[2]}
              {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              className="font-medium text-accent underline underline-offset-2 hover:opacity-80"
            >
              {link[1]}
            </a>
          );
        }
        if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
          return (
            <code key={i} className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Heading with copy-link anchor (h3 inside content). */
function H3({ text, id }: { text: string; id: string }) {
  return (
    <h3 id={id} data-toc={text.replace(/\*\*/g, "")} className="mt-12 scroll-mt-24 text-xl font-semibold text-ink">
      <RichText text={text} />
      <a href={`#${id}`} className="heading-anchor" aria-label={`Link to ${text}`}>
        #
      </a>
    </h3>
  );
}

/* ---------------------------- Block renderer ------------------------------ */

function BlockRenderer({ block, h3Base }: { block: Block; h3Base: string }) {
  switch (block.type) {
    case "p":
      return (
        <p className="mt-6 text-muted">
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      // id assigned by parent via h3Base counter — handled outside for uniqueness
      return <H3 text={block.text} id={`${h3Base}-${slugify(block.text)}`} />;
    case "list":
      return (
        <ul className="mt-6 list-disc space-y-3 pl-7 text-muted marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-6 list-decimal space-y-3 pl-7 text-muted marker:font-bold marker:text-accent">
          {block.items.map((item, i) => (
            <li key={i}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "callout":
      return (
        <div className="mt-8 rounded-r-xl border-l-[3px] border-accent bg-accent-soft px-6 py-5 leading-relaxed text-ink">
          <p className="eyebrow mb-2 text-accent!">Note</p>
          <RichText text={block.text} />
        </div>
      );
    case "quote":
      return (
        <blockquote className="my-12 border-l-2 border-line pl-7 font-display text-xl italic leading-relaxed text-muted">
          <RichText text={block.text} />
          {block.source && <footer className="mt-3 text-xs not-italic text-faint">— {block.source}</footer>}
        </blockquote>
      );
    case "diagram":
      return (
        <figure className="my-10 rounded-2xl border border-line bg-card p-6 sm:p-8">
          {block.name === "cycle" && <ContributionCycle />}
          {block.name === "remotes" && <RemotesMap />}
          {block.name === "aiLoop" && <AiLoop />}
          {block.name === "ladder" && <ReputationLadder />}
          <figcaption className="mt-4 text-center text-xs text-faint">{block.caption}</figcaption>
        </figure>
      );
    case "table":
      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full min-w-[480px] border-collapse text-left text-[0.95rem]">
            <thead>
              <tr className="border-b border-line text-faint">
                {block.headers.map((h, i) => (
                  <th key={i} className="py-3 pr-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-muted">
              {block.rows.map((row, ri) => (
                <tr key={ri} className="border-b border-line transition last:border-0 hover:bg-card">
                  {row.map((cell, ci) => (
                    <td key={ci} className="py-3.5 pr-4 last:pr-0 [&:first-child]:font-medium [&:first-child]:text-ink">
                      <RichText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "versus":
      return (
        <div className="my-8 grid gap-5 sm:grid-cols-2">
          {([block.left, block.right] as const).map((side, i) => (
            <div
              key={i}
              className={`rounded-2xl border p-6 ${
                i === 1 ? "border-accent/40 bg-accent-soft" : "border-line bg-card"
              }`}
            >
              <div className="flex items-center justify-between">
                <p className="font-semibold text-ink">{side.label}</p>
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${
                    i === 1 ? "bg-accent text-accent-ink" : "border border-line text-faint"
                  }`}
                >
                  {side.badge}
                </span>
              </div>
              <ul className="mt-4 space-y-2.5 text-[0.95rem] text-muted">
                {side.items.map((it, j) => (
                  <li key={j}>
                    <span className={i === 1 ? "text-accent" : "text-faint"}>{i === 1 ? "→" : "·"}</span>{" "}
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );
  }
}

function Content({ blocks, h3Base }: { blocks: Block[]; h3Base: string }) {
  return (
    <>
      {blocks.map((block, i) => (
        <BlockRenderer key={i} block={block} h3Base={`${h3Base}-${i}`} />
      ))}
    </>
  );
}

/* -------------------------------- Chrome --------------------------------- */

function ReaderHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-6">
        <Link href="/" className="flex items-center gap-2.5 text-ink">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-accent-ink">TC</span>
          <span className="flex flex-col leading-none">
            <span className="hidden text-sm font-semibold tracking-tight sm:block">{book.siteName}</span>
            <span className="hidden text-[10px] italic tracking-wide text-faint sm:block">{book.slogan}</span>
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-[13px] text-muted">
          <Link href="/glossary" className="hidden transition hover:text-ink md:inline">Glossary</Link>
          <Search />
          <ThemeToggle />
          <Link
            href="/"
            className="rounded-full border border-line px-4 py-2 text-[13px] font-semibold text-ink transition hover:border-accent"
          >
            ← Home
          </Link>
        </nav>
      </div>
    </header>
  );
}

/* -------------------------------- Chapter -------------------------------- */

function ChapterSection({ ch, prev, next }: { ch: Chapter; prev?: Chapter; next?: Chapter }) {
  const minutes = Math.max(
    3,
    Math.round(
      ch.subChapters.reduce((sum, sub) => {
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
      }, 0) / 220
    )
  );

  return (
    <section id={ch.slug} className="mb-28 scroll-mt-24" data-toc-mobile={`Chapter ${ch.number}: ${ch.title}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="eyebrow">Chapter <span className="num">{String(ch.number).padStart(2, "0")}</span></p>
        <p className="no-print eyebrow">≈ {minutes} min read</p>
      </div>
      <h1 className="font-display mt-3 text-4xl leading-tight text-ink text-balance md:text-5xl">{ch.title}</h1>
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{ch.summary}</p>

      {ch.objectives && (
        <div className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-7">
          <p className="eyebrow">In this chapter you&apos;ll learn to</p>
          <ul className="mt-4 space-y-2.5">
            {ch.objectives.map((o) => (
              <li key={o} className="text-[0.95rem] text-muted">
                <span className="font-semibold text-accent">✓</span> {o}
              </li>
            ))}
          </ul>
        </div>
      )}

      {ch.subChapters.map((sub) => (
        <div key={sub.slug} id={sub.slug} className="mt-16 scroll-mt-24" data-toc-mobile={sub.title}>
          <span className="mb-5 block h-px w-10 bg-accent" aria-hidden />
          <h2 data-toc={sub.title} className="font-display scroll-mt-24 text-[1.75rem] leading-snug text-ink text-balance">
            {sub.title}
          </h2>
          {sub.content ? (
            <Content blocks={sub.content} h3Base={sub.slug} />
          ) : (
            <p className="mt-5 rounded-xl border border-dashed border-line p-5 text-[0.95rem] text-faint">
              Content for “{sub.title}” will be added here.
            </p>
          )}
        </div>
      ))}

      {/* Chapter footer nav */}
      <div className="no-print mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/book#${prev.slug}`}
            className="rounded-2xl border border-line p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-accent"
          >
            <span className="eyebrow">← Previous</span>
            <p className="font-display mt-2 text-xl text-ink">
              Ch {prev.number}. {prev.title}
            </p>
          </Link>
        ) : (
          <Link
            href="/"
            className="rounded-2xl border border-line p-5 text-left transition duration-300 hover:-translate-y-0.5 hover:border-accent"
          >
            <span className="eyebrow">← Back</span>
            <p className="font-display mt-2 text-xl text-ink">Landing page</p>
          </Link>
        )}
        {next && (
          <Link
            href={`/book#${next.slug}`}
            className="rounded-2xl border border-line p-5 text-right transition duration-300 hover:-translate-y-0.5 hover:border-accent sm:col-start-2"
          >
            <span className="eyebrow">Next →</span>
            <p className="font-display mt-2 text-xl text-ink">
              Ch {next.number}. {next.title}
            </p>
          </Link>
        )}
      </div>
    </section>
  );
}

/* --------------------------------- Page ---------------------------------- */

export default function BookPage() {
  return (
    <main className="min-h-screen bg-bg text-ink">
      <a href="#chapter-content" className="skip-link">Skip to chapter content</a>
      <ReadingProgress />
      <ReaderHeader />
      <MobileToc />

      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[260px_minmax(0,1fr)] xl:grid-cols-[260px_minmax(0,1fr)_230px]">
        {/* Left sidebar: table of contents */}
        <aside className="no-print hidden h-fit lg:sticky lg:top-24 lg:block">
          <p className="text-xs font-bold uppercase tracking-wider text-faint">Table of Contents</p>
          <ol className="mt-4 space-y-4">
            <li>
              <a href="#preface" className="block text-sm font-semibold text-ink hover:text-accent">
                <span className="text-accent">·</span> Preface
              </a>
            </li>
            {chapters.map((ch) => (
              <li key={ch.slug}>
                <p className="text-sm font-semibold text-ink">
                  <span className="text-accent">Ch {ch.number}.</span> {ch.title}
                </p>
                <ul className="mt-1 space-y-1 pl-4">
                  {ch.subChapters.map((sub) => (
                    <li key={sub.slug} className="text-sm">
                      <a href={`#${sub.slug}`} className="text-muted hover:text-accent">
                        – {sub.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
            <li>
              <Link href="/glossary" className="block text-sm font-semibold text-ink hover:text-accent">
                <span className="text-accent">·</span> Glossary
              </Link>
            </li>
          </ol>
        </aside>

        {/* Center: content */}
        <article id="chapter-content" className="article-body min-w-0">
          {/* Preface */}
          <section id="preface" className="mb-24 scroll-mt-24 border-b border-line pb-14" data-toc-mobile={preface.title}>
            <p className="eyebrow">Start here</p>
            <h1 className="font-display mt-3 text-4xl leading-tight text-ink text-balance md:text-5xl">{preface.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted text-pretty">{preface.summary}</p>
            <div className="mt-8">
              <Content blocks={preface.content} h3Base="preface" />
            </div>
          </section>

          {chapters.map((ch, i) => (
            <ChapterSection
              key={ch.slug}
              ch={ch}
              prev={chapters[i - 1]}
              next={chapters[i + 1]}
            />
          ))}

          {/* End-of-book CTA */}
          <div className="rounded-2xl border border-accent/25 bg-accent-soft p-10 text-center sm:p-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={book.author.photo}
              alt={book.author.name}
              className="mx-auto h-16 w-16 rounded-full border-2 border-accent/40 bg-card"
            />
            <p className="font-display mt-5 text-3xl text-ink">You&apos;ve reached the end of Volume 1.</p>
            <p className="mt-3 text-muted">
              — {book.author.name}, Karachi · thanks for reading every line.
            </p>
            <p className="mt-1 text-sm text-muted">
              Next issues in the roadmap: debugging real codebases · open source as a career.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="rounded-full bg-accent px-6 py-2.5 font-semibold text-accent-ink transition hover:opacity-90"
              >
                ← Back to landing page
              </Link>
              <a
                href={prSearchUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-2.5 font-semibold text-ink transition hover:border-accent"
              >
                See the author&apos;s {book.stats.mergedPRs} merged PRs
              </a>
              <a
                href={book.author.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-2.5 font-semibold text-ink transition hover:border-accent"
              >
                Connect on LinkedIn
              </a>
              <a
                href={book.author.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-line px-6 py-2.5 font-semibold text-ink transition hover:border-accent"
              >
                alicodez.com
              </a>
            </div>
          </div>
        </article>

        {/* Right rail: on this page */}
        <OnThisPage />
      </div>
    </main>
  );
}
