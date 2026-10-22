# The Contribution — *by M. Ali Adnan*

**How to Contribute to Open Source** — a free, open book that takes you from your first issue to your first merge, step by step.

🌐 **Live:** [the-contribution.vercel.app](https://the-contribution.vercel.app) · 👤 [alicodez.com](https://alicodez.com) · 🔗 [LinkedIn](https://www.linkedin.com/in/%F0%9D%99%88%F0%9D%99%AA%F0%9D%99%9D%F0%9D%99%96%F0%9D%99%A2%F0%9D%99%A2%F0%9D%99%96%F0%9D%99%99-%F0%9D%98%BC%F0%9D%99%A1%F0%9D%99%9E-%F0%9D%98%BC%F0%9D%99%99%F0%9D%99%A3%F0%9D%99%96%F0%9D%99%A3-48035a2b8/)

## What's inside

| | Chapter | You'll learn |
|---|---|---|
| 1 | Introduction to Open Source | What open source is, what you gain, how code actually gets merged |
| 2 | Start Contributing | Fork/clone, git environment, finding issues meant for you |
| 3 | Your First Pull Request | Read → change → PR → review → merge, the complete loop |
| 4 | Contribute with OpenCode | An AI pair contributor that runs the PR loop with you |
| 5 | Building a Reputation | Consistency, communication, leveling up to maintainer |

Plus a preface, a 30-term glossary, and four theme-adaptive SVG diagrams woven into the text.

Every claim in the book is backed by real merged work — [38 merged pull requests](https://github.com/search?q=author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests) across Google ADK Docs, OpenAI Agents SDK, OpenClaw, and n8n Docs.

## Tech

- [Next.js 16](https://nextjs.org) (App Router, React 19) — statically prerendered
- [Tailwind CSS 4](https://tailwindcss.com) with a CSS-variable design-token system
- Instrument Serif + Geist Sans/Mono via `next/font`
- Zero external UI dependencies — all components hand-built in `app/components/`
- Light/dark themes, Ctrl+K search, scroll-spy TOC, reading progress, print stylesheet

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the build
```

## Edit the book

All content lives in a single file: [`app/data/book.ts`](app/data/book.ts) — chapters, sub-chapters, preface, glossary, author info, and stats. Both the landing page and the reader render from it.

## Deploy

Pushed to GitHub and deployed on [Vercel](https://vercel.com). Any commit to `main` auto-deploys.

---

© 2026 M. Ali Adnan — The Contribution. Free to read, share, and learn from.
