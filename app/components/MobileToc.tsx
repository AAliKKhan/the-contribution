"use client";

import { useEffect, useState } from "react";

/**
 * Mobile floating TOC button + drawer.
 * Reads the chapter/sub-chapter structure rendered in the article.
 */
export default function MobileToc() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ id: string; text: string; sub?: boolean }[]>([]);

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("article [data-toc-mobile]")
    );
    setItems(
      els
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          text: el.getAttribute("data-toc-mobile") ?? "",
          sub: el.tagName === "H3",
        }))
    );
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="no-print xl:hidden">
      <button
        onClick={() => setOpen(true)}
        aria-label="Open table of contents"
        className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-accent-ink shadow-lg"
      >
        ☰
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-y-0 left-0 w-72 max-w-[85vw] overflow-y-auto bg-surface p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-faint">
                Contents
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close contents"
                className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink"
              >
                ✕
              </button>
            </div>
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it.id}>
                  <a
                    href={`#${it.id}`}
                    onClick={() => setOpen(false)}
                    className={`block text-sm leading-snug ${
                      it.sub
                        ? "pl-4 text-muted"
                        : "font-semibold text-ink"
                    }`}
                  >
                    {it.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
