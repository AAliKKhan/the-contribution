"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { chapters } from "../data/book";

type Hit = {
  href: string;
  chapter: string;
  title: string;
  context: string;
};

/** Mirrors the reader's heading id scheme: `${sub.slug}-${blockIndex}-${slug}` */
function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Flatten the book into searchable chunks (sub-chapter + paragraphs). */
function buildIndex(): Hit[] {
  const hits: Hit[] = [];
  for (const ch of chapters) {
    for (const sub of ch.subChapters) {
      const base = { href: `/book#${sub.slug}`, chapter: `Ch ${ch.number}`, title: sub.title };
      const text = (sub.content ?? [])
        .map((b) =>
          b.type === "list" || b.type === "steps"
            ? b.items.join(" ")
            : b.type === "table"
              ? b.rows.flat().join(" ")
              : "text" in b
                ? b.text
                : ""
        )
        .join(" ");
      hits.push({ ...base, context: text.slice(0, 240) });
      // Index each h3 section individually for finer hits
      (sub.content ?? []).forEach((b, blockIndex) => {
        if (b.type !== "h3") return;
        const rest: string[] = [];
        for (const c of (sub.content ?? []).slice(blockIndex + 1)) {
          if (c.type === "h3") break;
          rest.push(
            c.type === "list" || c.type === "steps"
              ? c.items.join(" ")
              : c.type === "table"
                ? c.rows.flat().join(" ")
                : "text" in c
                  ? c.text
                  : ""
          );
        }
        hits.push({
          href: `/book#${sub.slug}-${blockIndex}-${slugify(b.text)}`,
          chapter: `Ch ${ch.number}`,
          title: b.text.replace(/\*\*/g, ""),
          context: rest.join(" ").slice(0, 240),
        });
      });
    }
  }
  return hits;
}

function score(hit: Hit, q: string): number {
  const query = q.toLowerCase();
  const title = hit.title.toLowerCase();
  const ctx = hit.context.toLowerCase();
  if (title === query) return 100;
  if (title.startsWith(query)) return 80;
  if (title.includes(query)) return 60;
  if (ctx.includes(query)) return 30;
  // loose word match
  const words = query.split(/\s+/).filter(Boolean);
  if (words.length > 1 && words.every((w) => title.includes(w) || ctx.includes(w)))
    return 40;
  return 0;
}

export default function Search() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const index = useMemo(buildIndex, []);

  const results = useMemo(() => {
    if (!q.trim()) return [];
    return index
      .map((h) => ({ h, s: score(h, q.trim()) }))
      .filter((r) => r.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((r) => r.h);
  }, [q, index]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setSel(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function go(hit?: Hit) {
    if (!hit) return;
    setOpen(false);
    window.location.href = hit.href;
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="no-print hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-faint transition hover:border-accent hover:text-accent md:flex"
        aria-label="Search the book"
      >
        <span>🔍</span>
        <span>Search…</span>
        <kbd className="rounded border border-line px-1.5 py-0.5 text-[10px] font-mono">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <div
      className="no-print fixed inset-0 z-[70] flex items-start justify-center bg-black/50 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-xl border border-line bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Search the book"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setSel(0);
          }}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setSel((s) => Math.min(s + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSel((s) => Math.max(s - 1, 0));
            } else if (e.key === "Enter") {
              go(results[sel]);
            }
          }}
          placeholder="Search chapters, sections, commands…"
          className="w-full border-b border-line bg-transparent px-4 py-3.5 text-ink outline-none placeholder:text-faint"
        />
        <ul className="max-h-80 overflow-y-auto">
          {results.map((hit, i) => (
            <li key={hit.href + hit.title}>
              <button
                onClick={() => go(hit)}
                onMouseEnter={() => setSel(i)}
                className={`block w-full px-4 py-3 text-left transition ${
                  i === sel ? "bg-accent-soft" : ""
                }`}
              >
                <span className="text-xs font-semibold text-accent">{hit.chapter}</span>
                <p className="text-sm font-semibold text-ink">{hit.title}</p>
                <p className="mt-0.5 line-clamp-1 text-xs text-faint">{hit.context}</p>
              </button>
            </li>
          ))}
          {q.trim() && results.length === 0 && (
            <li className="px-4 py-6 text-center text-sm text-faint">
              No matches for “{q}”
            </li>
          )}
          {!q.trim() && (
            <li className="px-4 py-6 text-center text-sm text-faint">
              Type to search all {index.length} sections · <kbd className="font-mono text-xs">↑↓</kbd> to navigate ·{" "}
              <kbd className="font-mono text-xs">Enter</kbd> to open
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
