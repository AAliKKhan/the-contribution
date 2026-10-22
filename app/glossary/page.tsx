import Link from "next/link";
import { book, glossary } from "../data/book";
import Search from "../components/Search";
import ThemeToggle from "../components/ThemeToggle";

export const metadata = {
  title: `Glossary — ${book.title}`,
  description: "Every key term in the book, defined in one place: fork, upstream, pull request, CI, maintainer, and more.",
};

export default function GlossaryPage() {
  const alphabet = [...new Set(glossary.map((g) => g.term[0].toUpperCase()))].sort();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <header className="no-print sticky top-0 z-50 border-b border-line bg-bg/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-6">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent font-display text-lg leading-none text-accent-ink">TC</span>
            <span className="flex flex-col leading-none">
              <span className="hidden text-sm font-semibold tracking-tight sm:block">{book.siteName}</span>
              <span className="hidden text-[10px] italic tracking-wide text-faint sm:block">{book.slogan}</span>
            </span>
          </Link>
          <nav className="flex items-center gap-3 text-sm text-muted">
            <Search />
            <ThemeToggle />
            <Link
              href="/book"
              className="rounded-full bg-accent px-4 py-2 font-semibold text-accent-ink transition hover:opacity-90"
            >
              Start Reading
            </Link>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-6 py-14">
        <p className="text-sm font-bold text-accent">Reference</p>
        <h1 className="mt-1 text-4xl font-bold">Glossary</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Every key term used across the five chapters, defined once. Bookmark this page — you&apos;ll
          come back to it during your first few pull requests.
        </p>

        {/* Alphabet jump bar */}
        <div className="mt-8 flex flex-wrap gap-1.5">
          {alphabet.map((a) => (
            <a
              key={a}
              href={`#letter-${a}`}
              className="grid h-8 w-8 place-items-center rounded-md border border-line text-sm font-semibold text-muted transition hover:border-accent hover:text-accent"
            >
              {a}
            </a>
          ))}
        </div>

        {/* Definitions grouped by letter */}
        <div className="mt-10 space-y-10">
          {alphabet.map((letter) => {
            const terms = glossary.filter((g) => g.term[0].toUpperCase() === letter);
            return (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-accent">{letter}</h2>
                <dl className="mt-4 divide-y divide-line border-y border-line">
                  {terms.map((g) => (
                    <div key={g.term} className="grid gap-1 py-4 sm:grid-cols-[220px_1fr] sm:gap-6">
                      <dt className="font-semibold text-ink">{g.term}</dt>
                      <dd className="text-muted">
                        {g.def.split(/(`[^`]+`|\*[^*]+\*)/g).map((part, i) =>
                          part.startsWith("`") && part.endsWith("`") ? (
                            <code key={i} className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.85em] text-accent">
                              {part.slice(1, -1)}
                            </code>
                          ) : part.startsWith("*") && part.endsWith("*") && part.length > 2 ? (
                            <em key={i}>{part.slice(1, -1)}</em>
                          ) : (
                            <span key={i}>{part}</span>
                          )
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>

        <div className="mt-14 rounded-2xl border border-accent/25 bg-accent-soft p-8 text-center">
          <p className="font-semibold text-ink">Done with the reference? Back to the story.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <Link
              href="/book"
              className="rounded-full bg-accent px-6 py-2.5 font-semibold text-accent-ink transition hover:opacity-90"
            >
              Continue reading →
            </Link>
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
      </div>
    </main>
  );
}
