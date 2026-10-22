"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

/**
 * Right-rail "On this page" TOC.
 * Collects h2/h3 headings inside the article (they carry data-toc attr),
 * highlights the one currently in view, and lets readers jump to it.
 */
export default function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("article [data-toc]")
    );
    const list = els
      .map((el) => ({
        id: el.id,
        text: el.getAttribute("data-toc") ?? el.textContent ?? "",
        level: el.tagName === "H3" ? 3 : 2,
      }))
      .filter((h) => h.id);
    setHeadings(list);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -70% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="no-print hidden xl:block"
      style={{ width: 230 }}
    >
      <div className="sticky top-24 max-h-[70vh] overflow-y-auto pr-2">
        <p className="mb-3 text-xs font-bold uppercase tracking-wider text-faint">
          On this page
        </p>
        <ul className="space-y-1.5 border-l border-line">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block -ml-px border-l-2 py-0.5 text-[13px] leading-snug transition ${
                  active === h.id
                    ? "border-accent font-semibold text-accent"
                    : "border-transparent text-muted hover:border-line hover:text-ink"
                } ${h.level === 3 ? "pl-6" : "pl-3"}`}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
