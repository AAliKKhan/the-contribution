// ---------------------------------------------------------------------------
// BOOK MOLD — Edit this file to fill in real chapters and sub-chapters.
// Everything on the landing page + reader page reads from here.
// ---------------------------------------------------------------------------

export type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "callout"; text: string }
  | { type: "quote"; text: string; source?: string }
  | { type: "table"; headers: string[]; rows: string[][] }
  | {
      type: "versus";
      left: { label: string; badge: string; items: string[] };
      right: { label: string; badge: string; items: string[] };
    }
  | { type: "diagram"; name: "cycle" | "remotes" | "aiLoop" | "ladder"; caption: string };

export type SubChapter = {
  slug: string;
  title: string;
  content?: Block[];
};

export type Chapter = {
  number: number;
  slug: string;
  title: string;
  summary: string;
  objectives?: string[];
  subChapters: SubChapter[];
};

export const book = {
  siteName: "The Contribution",
  slogan: "by M. Ali Adnan",
  title: "How to Contribute to Open Source",
  subtitle:
    "A practical guide to finding projects, making your first contribution, and growing into a trusted open-source maintainer.",
  tagline: "From your first Issue to your first Merge — step by step.",
  mission:
    "Make your first merged pull request inevitable — and show every reader that open source is a process they can learn, not a club they have to be invited into.",
  author: {
    name: "M. Ali Adnan",
    handle: "AAliKKhan",
    github: "https://github.com/AAliKKhan",
    website: "https://alicodez.com",
    linkedin:
      "https://www.linkedin.com/in/%F0%9D%99%88%F0%9D%99%AA%F0%9D%99%9D%F0%9D%99%96%F0%9D%99%A2%F0%9D%99%A2%F0%9D%99%96%F0%9D%99%99-%F0%9D%98%BC%F0%9D%99%A1%F0%9D%99%9E-%F0%9D%98%BC%F0%9D%99%99%F0%9D%99%A3%F0%9D%99%96%F0%9D%99%A3-48035a2b8/",
    role: "Full-Stack Developer & Agentic AI Builder",
    location: "Karachi, Pakistan",
    avatar: "https://avatars.githubusercontent.com/u/165782963?v=4",
    photo: "/aliheadshot.png",
    story:
      "I started coding publicly on April 2, 2024 with zero open-source experience — just assignments pushed to GitHub. Since then I've shipped 73 public repositories and had 38 pull requests merged into projects people actually use — including google/adk-docs, openai/openai-agents-python, n8n-io/n8n-docs, and openclaw/openclaw. I learned every rule of collaboration the hard way: broken builds, silent reviewers, rejected PRs, and finally merged ones. This book is the guide I needed on day one.",
  },
  stats: {
    publicRepos: 73,
    mergedPRs: 38,
    externalProjects: 4, // google/adk-docs, openai-agents-python, n8n-docs, openclaw
    onGitHubSince: "April 2024",
    yearsInPublic: "2+",
  },
};

/** Where to verify every merged PR (used across landing + book). */
export const prSearchUrl =
  "https://github.com/search?q=author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests";

/** Real merged contributions — referenced by scenario throughout the book. */
type Platform = {
  name: string;
  repo: string;
  count: number;
  /** Local logo file (rendered in a white tile). */
  logo?: string;
  /** Org avatar URL fallback (used when no local logo is provided). */
  avatar?: string;
  url: string;
};

export const platforms: Platform[] = [
  {
    name: "Google ADK Docs",
    repo: "google/adk-docs",
    count: 21,
    logo: "/googleadk.png", // local logo file
    url: "https://github.com/search?q=repo%3Agoogle%2Fadk-docs+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests",
  },
  {
    name: "OpenAI Agents SDK",
    repo: "openai/openai-agents-python",
    count: 7,
    logo: "/openai.jpg", // local logo file
    url: "https://github.com/search?q=repo%3Aopenai%2Fopenai-agents-python+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests",
  },
  {
    name: "OpenClaw",
    repo: "openclaw/openclaw",
    count: 3,
    avatar: "https://avatars.githubusercontent.com/openclaw",
    url: "https://github.com/search?q=repo%3Aopenclaw%2Fopenclaw+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests",
  },
  {
    name: "n8n Docs",
    repo: "n8n-io/n8n-docs",
    count: 1,
    avatar: "https://avatars.githubusercontent.com/n8n-io",
    url: "https://github.com/search?q=repo%3An8n-io%2Fn8n-docs+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests",
  },
];

/** Front-matter shown at the top of the reader. */
export const preface = {
  title: "Preface: How to Read This Book",
  summary:
    "Who this book is for, what you'll be able to do after it, and which of the three reading paths fits you.",
  content: [
    {
      type: "p" as const,
      text: "This book exists for one reason: **your first merged pull request should not be a matter of luck.** Everything here — the commands, the etiquette, the review workflow, the AI-assisted loop in Chapter 4 — comes from doing it the messy way first and writing down the shortcut.",
    },
    { type: "h3" as const, text: "Who this book is for" },
    {
      type: "table" as const,
      headers: ["Reader", "You'll get"],
      rows: [
        ["Students & self-taught devs", "A repeatable path from zero to a merged PR — no CS degree assumed."],
        ["Career-switchers", "Public proof of skill: merged contributions recruiters can click."],
        ["Working developers", "The unwritten rules of review etiquette and maintaining trust."],
        ["The AI-curious (Ch 4)", "A supervised workflow where an AI agent runs the loop with you."],
      ],
    },
    { type: "h3" as const, text: "Find your path" },
    {
      type: "list" as const,
      items: [
        "**Just curious?** Read Chapter 1 and stop — you'll understand what open source is and why it pays.",
        "**Ready to contribute?** Chapters 1 → 3: understand, set up, ship your first PR.",
        "**Already contributing?** Chapter 4 automates your loop; Chapter 5 builds the reputation.",
      ],
    },
    { type: "h3" as const, text: "Prerequisites" },
    {
      type: "list" as const,
      items: [
        "A laptop with a terminal — every command works on Windows, macOS, and Linux.",
        "A free GitHub account.",
        "No prior Git knowledge required; Chapter 2 starts from zero.",
        "Patience for review comments — Chapter 3 turns them from scary to welcome.",
      ],
    },
    {
      type: "callout" as const,
      text: "**Suggested pace:** one chapter per week. Every chapter ends in a concrete outcome — a configured environment, a merged PR, an AI workflow — so progress is visible, not theoretical.",
    },
  ],
};

/** Key terms — rendered on the /glossary page. */
export const glossary: { term: string; def: string }[] = [
  { term: "Open source", def: "Software whose source code is public under a license that allows reading, modifying, and sharing it." },
  { term: "Repository (repo)", def: "A project's folder on GitHub including its full code history." },
  { term: "Git", def: "The version-control system that records changes to files over time; runs on your machine." },
  { term: "GitHub", def: "A website that hosts Git repositories and adds collaboration tools: issues, pull requests, reviews, CI." },
  { term: "Fork", def: "Your personal copy of someone else's repository, under your account, where you can push changes." },
  { term: "Clone", def: "Downloading a repository to your local machine with `git clone`." },
  { term: "origin", def: "The default remote name pointing at *your* fork — you push here." },
  { term: "upstream", def: "The conventional remote name for the *original* project you forked from — you sync from here." },
  { term: "Branch", def: "A parallel line of work inside a repository; contributions always happen on a branch, never directly on `main`." },
  { term: "Commit", def: "A saved snapshot of changes with a message explaining what and why." },
  { term: "Push", def: "Sending local commits to a remote (your fork) on GitHub." },
  { term: "Pull Request (PR)", def: "A request to the project to merge your branch, presented as a diff for review." },
  { term: "Merge", def: "Accepting a PR's changes into the project's main history." },
  { term: "Diff", def: "The line-by-line comparison of what a PR adds, removes, or changes." },
  { term: "Code review", def: "A maintainer's examination of a PR with comments, requests, and approval." },
  { term: "CI (Continuous Integration)", def: "Automated checks (tests, linting) that run on every push and must pass before merge." },
  { term: "Issue", def: "A tracked conversation about a bug, feature, or task in a repository." },
  { term: "good first issue", def: "A label maintainers use to mark work that is scoped and friendly for newcomers." },
  { term: "Label", def: "A tag on issues/PRs (bug, help wanted, good first issue) used for triage and search." },
  { term: "Maintainer", def: "A person trusted to review, merge, and steer a project." },
  { term: "Contributor", def: "Anyone whose work has been merged into a project." },
  { term: "CONTRIBUTING.md", def: "The project's rulebook: how to set up, style code, and get changes accepted. Read it before your first PR." },
  { term: "Draft PR", def: "A pull request marked 'not ready to merge', used to invite early directional feedback." },
  { term: "Squash merge", def: "Merging strategy that collapses all PR commits into a single commit on main." },
  { term: "Rebase", def: "Replaying your commits on top of the latest main to keep history linear." },
  { term: "PAT (Personal Access Token)", def: "A password substitute Git uses to authenticate pushes over HTTPS." },
  { term: "SSH key", def: "A key pair that authenticates your machine to GitHub without passwords." },
  { term: "License", def: "The legal file (MIT, Apache-2.0, GPL…) defining how the project may be used and distributed." },
  { term: "AGENTS.md", def: "A file giving AI coding agents (like OpenCode) persistent instructions for a repository." },
  { term: "MCP (Model Context Protocol)", def: "A standard for connecting AI agents to external tools and data sources." },
];
export const chapters: Chapter[] = [
  {
    number: 1,
    slug: "introduction",
    title: "Introduction to Open Source",
    summary:
      "What open source platforms actually are, what you gain by contributing, and the GitHub / pull request basics that power every collaboration.",
    objectives: [
      "Explain what open source platforms are and where they live",
      "Name at least five concrete benefits of contributing",
      "Describe the fork → PR → merge cycle in your own words",
    ],
    subChapters: [
      {
        slug: "what-are-open-source-platforms",
        title: "1.1 What Are Open Source Platforms?",
        content: [
          { type: "p", text: "Open source means the **source code** of a program is public. Anyone can read it, learn from it, change it, and share it — legally — under a license chosen by the project's owner." },
          { type: "p", text: "An **open source platform** is a place where that code lives and where people collaborate on it. The code itself is stored in a **repository** (a project folder with full history), and the platform gives contributors the tools to work together: issue trackers, code review, discussions, and automation." },
          { type: "h3", text: "The main platforms" },
          { type: "list", items: [
            "GitHub — the largest, where most beginner-friendly projects live. This book uses GitHub.",
            "GitLab — popular for companies that want built-in hosting and CI/CD.",
            "Bitbucket — common in teams already using Jira.",
            "Codeberg & Sourcehut — community-run, non-profit alternatives.",
          ]},
          { type: "p", text: "Notice a pattern: every platform above stores **Git** repositories. Git is the version-control system; the platform is the social layer on top of it." },
          { type: "h3", text: "Open source is already everywhere" },
          { type: "p", text: "The library you `npm install`, the browser you're reading this in, the language runtime your app runs on — odds are, all open source. **Linux** runs most servers and nearly all cloud infrastructure. **VS Code**, **React**, **Next.js**, **Python**, **Firefox** — all open source projects with public repositories you can contribute to today." },
          { type: "h3", text: "What \"open\" really means (and doesn't mean)" },
          { type: "list", items: [
            "It means: the code is public, and an open source license (MIT, Apache-2.0, GPL…) grants you rights to use, modify, and distribute it.",
            "It doesn't mean: anyone can push code directly. Most projects require every change to pass review before it's merged.",
            "It doesn't mean: unpaid chaos. Many projects are backed by companies (Meta, Microsoft, Google) and maintainers who take the work seriously.",
            "It doesn't mean: only expert programmers welcome. Documentation, testing, translation, and design are all valid contributions.",
          ]},
          { type: "callout", text: "Key idea: open source platforms are not just code storage — they're where collaboration happens. The code is public, but the process is disciplined: nothing changes without a reviewed pull request." },
          { type: "p", text: "That process is exactly what the next two sections unpack: what's in it for you, and how a change travels from your laptop into a project everyone uses." },
        ],
      },
      {
        slug: "benefits-of-contributing",
        title: "1.2 Benefits of Contributing — What You Get",
        content: [
          { type: "p", text: "\"Why should I contribute for free?\" — the fair question. The honest answer: contributors get far more than they give, especially early in a career." },
          { type: "h3", text: "1. Proof of work that recruiters actually trust" },
          { type: "p", text: "Anyone can claim skills on a CV. A merged pull request into a project you didn't write cannot be faked — it shows you can read unfamiliar code, follow a process, handle feedback, and deliver. Recruiters and hiring managers increasingly scan GitHub before the interview, and a green contribution graph with real merged PRs stands out far more than a profile full of forked tutorials." },
          { type: "p", text: "**A real example from my own profile:** [38 merged pull requests](https://github.com/search?q=author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests) across four major platforms — 21 in **google/adk-docs**, 7 in **openai/openai-agents-python**, 3 in **openclaw/openclaw**, and 1 in **n8n-io/n8n-docs**. Every one of them is clickable, diffable, and attributed to me — the kind of evidence no resume bullet can match." },
          { type: "h3", text: "2. You learn by reading real production code" },
          { type: "p", text: "Tutorials show you one person's happy path. Open source shows you how software is built at scale: architecture decisions, edge cases, error handling, testing strategies, and performance work — written by people who ship to millions of users." },
          { type: "list", items: [
            "You see how big projects organize files and name things.",
            "You learn Git workflow the way professionals use it: branches, reviews, reverts, releases.",
            "You get code review on YOUR code — free mentorship from maintainers who've seen thousands of contributions.",
          ]},
          { type: "h3", text: "3. A network that compounds" },
          { type: "p", text: "Every pull request is a conversation with people building things you care about. Consistent contributors get noticed — invited to other projects, recommended for jobs, offered maintainership, or pointed at opportunities before they're posted. Opportunities come from people who've already seen you work." },
          { type: "h3", text: "4. Better habits, automatically" },
          { type: "p", text: "Projects won't accept vague commits, giant unexplained diffs, or code with no tests. So you learn to write smaller changes, explain your reasoning, and test before shipping — skills that make you stronger in your day job too." },
          { type: "h3", text: "5. You improve tools you depend on" },
          { type: "p", text: "Hit a bug in a library? Fix it once, and every future user — including you — benefits. That's the closed loop of open source: the tools you rely on get better because the people who rely on them participate." },
          { type: "quote", text: "Contributing isn't charity — it's the fastest on-ramp to being taken seriously as a developer.", source: "This book" },
          { type: "callout", text: "Realistic expectation: your first contributions (typos, docs, small fixes) are small. That's normal and valuable. The habit of shipping merged PRs matters more than the size of any single one." },
        ],
      },
      {
        slug: "github-pull-requests-basics",
        title: "1.3 GitHub, Pull Requests & How Code Gets Merged",
        content: [
          { type: "p", text: "Before contributing, you need to understand the three core objects and the one workflow that connects them." },
          { type: "h3", text: "Git vs GitHub" },
          { type: "list", items: [
            "Git — version control software installed on your computer. It tracks changes to files over time (commits, branches).",
            "GitHub — a website that hosts Git repositories and adds collaboration tools: issues, pull requests, reviews, CI checks.",
            "Your workflow: work locally with Git → publish to GitHub → propose changes with a pull request.",
          ]},
          { type: "h3", text: "The vocabulary in 30 seconds" },
          { type: "list", items: [
            "Repository (repo) — one project with its code and history.",
            "Fork — your personal copy of someone else's repo, under your account.",
            "Branch — a parallel line of work inside a repo. You never edit `main` directly.",
            "Commit — a saved snapshot with a message explaining the change.",
            "Pull Request (PR) — a request asking the project to merge your branch into theirs, with a diff to review.",
            "Merge — accepting the changes and adding them to the project's history.",
          ]},
          { type: "h3", text: "How you send a pull request, step by step" },
          { type: "steps", items: [
            "Fork the repository on GitHub — you now have a copy you can write to.",
            "Clone it to your machine: `git clone https://github.com/you/repo.git`",
            "Create a branch for your change: `git checkout -b fix/typo-in-readme`",
            "Make your edits. Keep the change focused on one thing.",
            "Commit with a clear message: `git commit -m \"Fix broken link in README\"`",
            "Push the branch to your fork: `git push origin fix/typo-in-readme`",
            "Open a Pull Request on GitHub — describe what you changed and why, and link the related issue.",
          ]},
          { type: "h3", text: "How a pull request gets merged" },
          { type: "p", text: "Once your PR is open, the project's maintainers (and automated checks) take over:" },
          { type: "steps", items: [
            "Automated checks (CI) run your code through tests and linting. Failing checks block the merge.",
            "A maintainer reviews the diff — the line-by-line comparison of your changes.",
            "They approve it, or request changes. You push fixes to the same branch and the PR updates automatically.",
            "Once approved and green, they click **Merge** — your changes land on the main branch.",
            "Your branch is deleted, the issue closes, and your name is now part of the project's history.",
          ]},
          { type: "callout", text: "Most beginner PRs never fail because of code skill — they fail on communication: no description, changes bundled together, or ignoring the project's contributing guidelines. Read the CONTRIBUTING.md before you write a line of code." },
          { type: "p", text: "That's the entire loop: **fork → branch → commit → push → pull request → review → merge**. Chapter 2 sets up your toolkit, and Chapter 3 walks you through your first real pull request from start to finish." },
          { type: "diagram", name: "cycle", caption: "The contribution cycle — Chapter 3 covers every arrow in detail." },
        ],
      },
    ],
  },
  {
    number: 2,
    slug: "start-contributing",
    title: "Start Contributing: From Zero to a Working Setup",
    summary:
      "Get hands-on: fork and clone a real project, configure Git and your dev environment the right way, and find issues that are actually meant for beginners.",
    objectives: [
      "Fork, clone, and wire up origin/upstream remotes correctly",
      "Configure Git identity, authentication, and a project dev environment",
      "Find and claim a live good-first-issue the professional way",
    ],
    subChapters: [
      {
        slug: "fork-and-clone",
        title: "2.1 Fork and Clone — Getting the Code on Your Machine",
        content: [
          { type: "p", text: "Every contribution starts the same way: you need a copy of the project you can edit freely. That's what a **fork** and a **clone** give you — in that order." },
          { type: "h3", text: "Why you can't just edit the project directly" },
          { type: "p", text: "You don't have write access to other people's repositories, and that's by design. Instead of getting permission to push, you make your own copy. The flow is:" },
          { type: "list", items: [
            "**Fork** — copy the repo on GitHub's servers, from `their-account/repo` to `your-account/repo`. Happens in the browser, takes one click.",
            "**Clone** — download that fork to your computer so you can edit files locally with your own tools.",
            "You push changes to **your fork**, then offer them back to the original project with a pull request (Chapter 3).",
          ]},
          { type: "h3", text: "How to fork a repository" },
          { type: "steps", items: [
            "Open the project on GitHub (example: `github.com/facebook/react`).",
            "Click the **Fork** button in the top-right.",
            "Confirm the destination — your own account. Keep the repo name as-is.",
            "Wait a few seconds. You now have `github.com/your-username/react`.",
          ]},
          { type: "p", text: "You'll see a note on your fork: *\"forked from facebook/react.\"* That link matters — GitHub uses it to let your pull request target the original project automatically." },
          { type: "h3", text: "How to clone your fork" },
          { type: "p", text: "On your fork's page, press the green **Code** button, copy the HTTPS URL, then in your terminal:" },
          { type: "steps", items: [
            "`git clone https://github.com/your-username/react.git`",
            "`cd react` — you're now inside the project.",
            "`git remote -v` — check your remotes. You should see `origin` pointing at **your** fork.",
          ]},
          { type: "h3", text: "Add the original project as `upstream`" },
          { type: "p", text: "This is the step beginners skip and regret later. Your fork goes stale — it drifts away from the original as others keep pushing code. Fix it once, upfront:" },
          { type: "steps", items: [
            "`git remote add upstream https://github.com/facebook/react.git`",
            "`git remote -v` — now you have two remotes: `origin` (your fork) and `upstream` (the real project).",
            "Sync anytime with `git fetch upstream` then `git merge upstream/main` (or `git pull upstream main`).",
          ]},
          { type: "callout", text: "**origin** = your copy, you push here. **upstream** = the original, you sync from here. Get these two straight and half of all confusing Git errors disappear." },
          { type: "diagram", name: "remotes", caption: "The three copies and the four moves between them." },
          { type: "h3", text: "Verify you can run the project" },
          { type: "p", text: "Before anything else, make sure it works untouched:" },
          { type: "steps", items: [
            "Install dependencies (check the README — usually `npm install`, `pip install -r requirements.txt`, or `cargo build`).",
            "Run the test suite (`npm test`) and the project itself.",
            "If it runs, your setup is correct. If it doesn't, fix that **before** making changes — otherwise you can't tell your bug from an environment bug.",
          ]},
          { type: "quote", text: "Never debug your environment and your contribution at the same time. Get the untouched project green first.", source: "This book" },
        ],
      },
      {
        slug: "git-and-dev-setup",
        title: "2.2 Setting Up Your Git Environment & Dev Setup",
        content: [
          { type: "p", text: "Before your first commit, spend ten minutes configuring Git properly. Skip this and you'll fight identity errors, insecure credential prompts, and inconsistent line endings for months." },
          { type: "h3", text: "Step 1 — Install Git" },
          { type: "steps", items: [
            "Check if it's already there: `git --version`",
            "Windows: install [Git for Windows](https://git-scm.com/download/win) — accept defaults, but choose **Git Bash** as your terminal.",
            "macOS: `xcode-select --install`, or `brew install git`.",
            "Linux: `sudo apt install git` (Debian/Ubuntu) or your distro's equivalent.",
          ]},
          { type: "h3", text: "Step 2 — Set your identity" },
          { type: "p", text: "Every commit is stamped with your name and email. Use the **same email as your GitHub account** so your commits are linked to your profile (or set up GitHub's noreply email in *Settings → Emails* to keep your address private):" },
          { type: "steps", items: [
            "`git config --global user.name \"Your Name\"`",
            "`git config --global user.email \"you@example.com\"`",
            "Verify: `git config --list`",
          ]},
          { type: "h3", text: "Step 3 — Sensible defaults" },
          { type: "steps", items: [
            "`git config --global init.defaultBranch main` — new repos start on `main`, matching modern convention.",
            "`git config --global pull.rebase false` — safer default for beginners; plain merges instead of surprises.",
            "`git config --global --edit` — open the config file and review everything at once.",
          ]},
          { type: "h3", text: "Step 4 — Authentication" },
          { type: "p", text: "You cannot push with your password — GitHub removed that. Pick one:" },
          { type: "list", items: [
            "**HTTPS + Personal Access Token (simplest):** create a token in *GitHub → Settings → Developer settings → Tokens*, then use it as your password when Git prompts.",
            "**SSH keys (best long-term):** run `ssh-keygen -t ed25519 -C \"you@example.com\"`, add the public key to *GitHub → Settings → SSH keys*, test with `ssh -T git@github.com`.",
            "**GitHub CLI (`gh`)** — installs a credential helper for you; also makes PRs from the terminal later.",
          ]},
          { type: "callout", text: "Test it now: `git push` to your fork from a throwaway branch. Fixing authentication on day one beats discovering it mid-contribution." },
          { type: "h3", text: "Step 5 — Your editor & tooling" },
          { type: "list", items: [
            "**Editor:** VS Code is the common choice — install it plus the language extension(s) for the project you picked.",
            "**Terminal:** Git Bash (Windows), zsh/bash (macOS/Linux), or the VS Code integrated terminal.",
            "**Diff viewer:** VS Code's Source Control tab, or `gitk`/lazygit for a visual history.",
            "**Optional GUI:** GitHub Desktop or GitKraken if CLI Git still feels abstract — totally acceptable.",
          ]},
          { type: "h3", text: "Step 6 — Project dev setup (\"it works on my machine\")" },
          { type: "steps", items: [
            "Open `CONTRIBUTING.md` / `README.md` — they list required tool versions and commands. Follow them exactly.",
            "Check for a version pin: `.nvmrc`, `.node-version`, `.python-version`, `mise.toml`. Match it (`nvm install` reads `.nvmrc` automatically).",
            "Install dependencies **in the project folder**, not globally.",
            "Run the project's checks: lint (`npm run lint`), tests (`npm test`), and the dev server.",
            "If the repo uses devcontainers/Docker, prefer that — it gives you the same environment the maintainers use.",
          ]},
          { type: "h3", text: "A branch-per-change habit from day one" },
          { type: "p", text: "From now on, never work on `main`. For every issue you pick:" },
          { type: "steps", items: [
            "`git checkout main` then `git pull` — start from current code.",
            "`git checkout -b fix/issue-42-broken-link` — descriptive branch: type/what.",
            "Make the change, commit, push the branch. `main` stays clean for the next task.",
          ]},
          { type: "quote", text: "Ten minutes of setup saves ten hours of confused debugging. Configure once, contribute smoothly forever.", source: "This book" },
        ],
      },
      {
        slug: "finding-issues",
        title: "2.3 How to Find Issues Meant for You",
        content: [
          { type: "p", text: "The fastest way to stall is picking the wrong task. Choose an issue that's wanted, small, and scoped for newcomers — here's how to find one." },
          { type: "h3", text: "Start with the labels maintainers set for you" },
          { type: "p", text: "Projects mark beginner-friendly work on purpose. Open the repo's **Issues → Labels** and look for:" },
          { type: "list", items: [
            "**good first issue** — the universal newcomer label (also: `first-timers-only`, `beginner`, `starter`).",
            "**help wanted** — maintainers explicitly want outside help here.",
            "**documentation** / **typo** — low-risk, high-confidence first PRs.",
            "**bug** + small scope — after you've done one or two easier ones.",
          ]},
          { type: "h3", text: "GitHub search, done properly" },
          { type: "p", text: "The search bar is more powerful than it looks. Useful patterns:" },
          { type: "list", items: [
            "`label:\"good first issue\" is:issue is:open` — open beginner issues.",
            "`label:\"good first issue\" is:open no:assignee` — not already taken.",
            "`repo:owner/name label:\"help wanted\"` — scoped to one project.",
            "`org:facebook label:\"good first issue\"` — beginner issues across an organization.",
          ]},
          { type: "p", text: "You can also browse aggregated lists: `goodfirstissues.com`, `up-for-grabs.net`, or GitHub's own *Explore → Good first issues*." },
          { type: "h3", text: "Check the issue is actually alive before you invest" },
          { type: "steps", items: [
            "Look at the **last comment date** — anything older than ~6 months may be abandoned or already fixed.",
            "Look for an **assignee** — if someone's on it, move on. Unassigned = yours to claim.",
            "Look for maintainer signals: `bug confirmed`, `ready for PR`, or a 👍 on a volunteer's comment.",
            "Read linked PRs — a closed/merged PR might mean the work is already done even if the issue stays open.",
          ]},
          { type: "h3", text: "Claim it the right way" },
          { type: "p", text: "Comment before you start — respect the project's convention (many ask for a short statement, others want a full plan):" },
          { type: "steps", items: [
            "Comment: *\"Hi, I'd like to work on this. Is it still available?\"*",
            "Wait for a maintainer's OK before writing code — the issue may be complicated, or reserved for a reason.",
            "If the project uses an assignment flow, ask them to `/assign` you.",
          ]},
          { type: "callout", text: "The most common waste of a beginner's weekend: building something nobody asked for. **Comment first, code second.**" },
          { type: "h3", text: "No good first issues available?" },
          { type: "list", items: [
            "Improve the docs — find something confusing and fix it. Docs PRs are always welcome. **This is exactly how most of my own merges started:** for example, [google/adk-docs #2311 — \"fix: correct typos in docs prose\"](https://github.com/google/adk-docs/pull/2311), found simply by reading pages I was already using.",
            "Report a good bug — a clear, reproducible issue with steps and screenshots is a real contribution.",
            "Fix something you hit while running the project locally.",
            "Widen your net — check other repos of the same organization, or projects in your actual stack.",
          ]},
          { type: "h3", text: "Red flags — skip these issues" },
          { type: "list", items: [
            "Vague description: \"something doesn't work\" with no steps to reproduce.",
            "Dozens of comments with no maintainer response — likely unmaintained.",
            "Someone already pushed a PR that solves it.",
            "The issue demands weeks of work as a \"first\" contribution.",
          ]},
          { type: "quote", text: "A great first issue is small, wanted, and confirmed. Check all three before you open your editor.", source: "This book" },
          { type: "p", text: "With the code cloned, your environment configured, and an issue claimed — you're ready for the main event: your first pull request, start to finish, in Chapter 3." },
        ],
      },
    ],
  },
  {
    number: 3,
    slug: "first-contribution",
    title: "Your First Pull Request",
    summary:
      "The full walkthrough: read the issue properly, make the smallest change that solves it, write a PR reviewers enjoy, handle feedback like a professional, and finish strong after the merge.",
    objectives: [
      "Interrogate an issue and reproduce a bug before coding",
      "Ship a small, tested, well-described pull request",
      "Respond to code review calmly and get it merged",
    ],
    subChapters: [
      {
        slug: "read-before-you-code",
        title: "3.1 Read Before You Code: Understanding the Issue",
        content: [
          { type: "p", text: "The most expensive mistake in open source happens *before* any code is written: building the wrong thing. Ten minutes of reading saves a week of rework." },
          { type: "h3", text: "Interrogate the issue" },
          { type: "p", text: "Before you touch the editor, answer these questions — from the issue text, the code, or the maintainers in a comment:" },
          { type: "list", items: [
            "**What exactly is broken (or missing)?** Reproduce the bug yourself. If you can't reproduce it, ask — don't guess.",
            "**What does \"done\" look like?** The acceptance criteria. If the issue doesn't state one, propose one in a comment.",
            "**Is there a linked discussion, prior PR, or design doc?** Read them — old decisions usually have reasons attached.",
            "**What's out of scope?** Good issues have edges. Respecting them is what keeps your PR reviewable.",
          ]},
          { type: "h3", text: "Stalk the area of code you'll change" },
          { type: "steps", items: [
            "Find the file(s) mentioned in the issue — search for error messages or function names from the report.",
            "Read the surrounding code, not just the broken line. Note the style, naming, and patterns in that module.",
            "Check `git log` for that file — recent commits show who cares about this area and how it's evolving.",
            "Look for existing tests near the code. Your fix will likely extend them.",
          ]},
          { type: "h3", text: "Reproduce the bug first (for bug fixes)" },
          { type: "p", text: "Write down the exact steps that show the wrong behavior. This is gold:" },
          { type: "list", items: [
            "It proves the issue is real — and that *you* understand it.",
            "Your new test starts from a **red** state, then your fix turns it **green** — the cleanest possible PR story.",
            "If you **can't** reproduce it, say so publicly. \"I tried X, Y, Z on the latest main and couldn't repro — here's my output\" is a legitimate, respected comment.",
          ]},
          { type: "p", text: "**A real example from my work:** in [google/adk-docs #1996 — \"Fix route key mismatch in conditional-routing.py\"](https://github.com/google/adk-docs/pull/1996), the example's `route_weekend` function yielded route names (`cheap_ideas`, `fancy_ideas`) that didn't exist in the edges dictionary — so the workflow failed at runtime. Running the example *was* the reproduction; the PR body simply showed the failing routes beside the valid ones." },
          { type: "callout", text: "Rule of thumb: if you can't explain the bug in two sentences to a teammate, you don't understand it yet — and your patch will show it." },
        ],
      },
      {
        slug: "make-the-change",
        title: "3.2 Make the Change: Small, Focused, Tested",
        content: [
          { type: "p", text: "You have a branch from Chapter 2 and an understood issue. Now write the fix — with *restraint*." },
          { type: "h3", text: "The smallest change that truly solves it" },
          { type: "list", items: [
            "Resist fixing the four other things you noticed. They're separate PRs — note them in a comment or open new issues.",
            "Match the existing style of the module, even if you'd write it differently. Consistency inside a codebase beats personal taste.",
            "No drive-by refactors, no renaming, no reformatting unrelated lines — every extra line is another line a reviewer must defend.",
            "If the fix feels too big, it probably is: split it into stacked PRs (a small foundation PR, then the real change on top).",
          ]},
          { type: "h3", text: "Tests: the difference between \"looks fixed\" and \"is fixed\"" },
          { type: "steps", items: [
            "Write (or extend) a test that **fails without your change** — this is the proof.",
            "Apply the fix, watch it pass.",
            "Run the full suite — your change may break something two directories away.",
            "Run lint/format exactly as `CONTRIBUTING.md` specifies (CI will reject you otherwise).",
          ]},
          { type: "h3", text: "Commit messages that reviewers appreciate" },
          { type: "list", items: [
            "**Imperative mood, summary line:** \"Fix crash when parsing empty config\" — not \"Fixed\" or \"Fixes issue #42\".",
            "**Explain why in the body** when it isn't obvious; wrap at ~72 characters if the project does.",
            "**Reference the issue:** `Closes #42` in the message or PR description so it auto-closes on merge.",
            "Follow any convention the project documents (Conventional Commits, etc.). Look at the last 20 commits — the truth is in the history, not the docs.",
          ]},
          { type: "quote", text: "A good PR is boring: a handful of lines, a clear message, and a test that proves the point.", source: "This book" },
          { type: "callout", text: "Before every push: `git diff main` — read your own change as a stranger would. Catching your own mistake costs nothing; a reviewer catching it costs goodwill." },
        ],
      },
      {
        slug: "write-the-pr",
        title: "3.3 Write the Pull Request",
        content: [
          { type: "p", text: "The PR is a **sales document for a code change**. Reviewers are busy volunteers — your job is to make approving you easy." },
          { type: "h3", text: "The title" },
          { type: "list", items: [
            "One line, imperative, specific: \"Fix null crash in search when query is empty\".",
            "Include the area if the repo is large: \"docs: add Windows setup steps to README\".",
            "Never: \"Fixes\", \"Update\", \"Changes\", \"First contribution\" — they describe nothing.",
          ]},
          { type: "h3", text: "The description template" },
          { type: "steps", items: [
            "**What & why** — what does this change, and which issue does it close (`Closes #42`).",
            "**How to test** — exact commands or steps a reviewer can follow in 30 seconds.",
            "**Before/after** — for UI or output changes, screenshots or terminal diffs. They end half the questions.",
            "**Trade-offs** — anything you considered and rejected, and why. This shows judgment, not doubt.",
          ]},
          { type: "p", text: "**A real description that got merged:** [n8n-io/n8n-docs #5080](https://github.com/n8n-io/n8n-docs/pull/5080) used exactly this shape — a **What** section, a **Changes** list broken down file by file (\"Cmmon issues\" → \"Common issues\", `items.length` → `len(items)`…), and a **Verification** section stating *how* each fix was checked. Three sections, zero questions from the reviewer, merged in eight days." },
          { type: "h3", text: "Use Draft PRs when you want early feedback" },
          { type: "p", text: "Uncertain about the approach? Open a **Draft pull request**: it signals \"not ready to merge\" while inviting direction. Comment: *\"Draft approach — before I finish, is this the right direction?\"* Ten minutes of early feedback saves a full PR rewrite." },
          { type: "h3", text: "The checklist before you click Create" },
          { type: "list", items: [
            "Branch is up to date with `main` (rebase or merge upstream first).",
            "CI is green locally: tests + lint pass on your machine.",
            "Diff contains only the intended files — no `.env`, no `node_modules`, no debug `console.log`.",
            "Description reads like a stranger wrote it — because a stranger will review it.",
            "You've disclosed AI assistance if the project's policy asks for it.",
          ]},
          { type: "callout", text: "First PR? Say so proudly in the description: *\"My first contribution to this project — happy to follow any conventions I missed.\"* Maintainers mentor people who signal they're coachable." },
        ],
      },
      {
        slug: "handle-code-review",
        title: "3.4 Handle Code Review Without Losing Your Nerve",
        content: [
          { type: "p", text: "Review comments are not criticism of you. They're how a project protects code that thousands of people depend on. Every contributor gets them — the difference between a good and a bad contributor is how they respond." },
          { type: "h3", text: "Reading a comment properly" },
          { type: "steps", items: [
            "Read it fully, then re-read it. Review comments are often shorter than intended.",
            "Classify it: **must change** (correctness, style rules, scope) vs. **suggestion** (preference, alternative) vs. **question** (they want to understand your choice).",
            "If anything is ambiguous — ask. *\"Just to confirm: do you want X, or is Y acceptable if I add a test?\"* is a perfectly good reply.",
            "If you disagree — respond with reasoning, not resistance. *\"I avoided that approach because of A; happy to switch if the edge case matters.\"* You can lose a small battle and win respect.",
          ]},
          { type: "h3", text: "Pushing fixes the right way" },
          { type: "list", items: [
            "Push new commits to the **same branch** — the PR updates itself; never open a second PR.",
            "Reply to **each** comment thread after fixing it: *\"Done — moved the validation into the handler and added a test for the empty case.\"*",
            "If a comment sparked several changes, one grouped reply per thread is fine — just don't leave threads hanging.",
            "Always answer questions, even with just *\"Good catch — fixed in abc123.\"*",
          ]},
          { type: "h3", text: "When review stings" },
          { type: "list", items: [
            "**\"This is all wrong\"** — if truly so, the reviewer usually explains why. Extract the lesson; the PR is still worth finishing.",
            "**Silence for days** — polite one-line bump after a week; then find another issue to keep momentum while waiting.",
            "**A nitpick storm** — often means the project wants a different direction. Ask directly: *\"Should I restructure this, or is this a preference I can note for next time?\"*",
            "**Never** argue publicly while emotional. Draft the reply, wait an hour, send a shorter, kinder version.",
          ]},
          { type: "callout", text: "Maintainers remember contributors who take feedback well far longer than they remember contributors who take feedback badly. Grace under review *is* the reputation." },
          { type: "p", text: "**Where to watch this happen for real:** open any of my [38 merged PRs](https://github.com/search?q=author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests) and read the review threads — e.g. the discussion on [google/adk-docs #1996](https://github.com/google/adk-docs/pull/1996) or the maintainer exchange on [openclaw/openclaw #112691](https://github.com/openclaw/openclaw/pull/112691). Real comments, real revisions, real merges." },
        ],
      },
      {
        slug: "after-the-merge",
        title: "3.5 After the Merge: Finish the Loop",
        content: [
          { type: "p", text: "The merge notification lands. Here's how to close the loop properly — most contributors skip this, and it's free credit." },
          { type: "steps", items: [
            "**Thank the reviewer** — one short comment: *\"Thanks for the careful review, @maintainer — merged!\"* Takes five seconds, remembered for years.",
            "**Sync your fork** — `git checkout main && git pull upstream main && git push origin main` so your next branch starts clean.",
            "**Delete the branch** (GitHub prompts this) — local and remote. No leftover debris.",
            "**Verify the fix in the wild** — check the released version or live site if applicable. Nothing beats seeing your name in a changelog.",
            "**Close the loop on the issue** — if `Closes #N` didn't auto-close it, close it yourself with a link to the PR.",
            "**Pick the next issue within 48 hours** — while the workflow, the repo, and your confidence are warm. One contribution is luck; three is a habit.",
          ]},
          { type: "h3", text: "Capture what you learned" },
          { type: "list", items: [
            "Write down the project's quirks you discovered (branch naming, test commands, review preferences) for your next PR.",
            "Add the merged PR to your portfolio/profile — link it, don't just screenshot it.",
            "Note the humans: which reviewer was helpful? Some projects have more good-first-issue work coming; people remember returning faces.",
          ]},
          { type: "quote", text: "The first merged PR changes how you see yourself. The third one changes how others see you.", source: "This book" },
          { type: "p", text: "You've now done it end to end: issue → code → PR → review → merge. Chapter 4 shows how to run this entire loop with an AI pair contributor — and Chapter 5 turns single PRs into a reputation." },
        ],
      },
    ],
  },
  {
    number: 4,
    slug: "contribute-with-opencode",
    title: "Contribute with OpenCode: Your AI Pair Contributor",
    summary:
      "Install OpenCode, teach it your forked-and-cloned workflow with a system prompt, grant it GitHub access so it can open PRs — then command it to read maintainer review comments and fix them until your PR gets merged.",
    objectives: [
      "Install OpenCode and connect it to a model provider",
      "Grant safe, permission-limited GitHub access (gh CLI / MCP)",
      "Write an AGENTS.md system prompt that runs your contribution workflow",
      "Command the review loop: fetch comments → fix → push → merge",
    ],
    subChapters: [
      {
        slug: "why-an-ai-pair-contributor",
        title: "4.1 Why Let an AI Do the Busywork?",
        content: [
          { type: "p", text: "By now you know the loop: find an issue, fix it, open a PR, wait for review, address comments, repeat. The loop is simple — but it's repetitive. A tool like **OpenCode** (an open source AI coding agent that runs in your terminal) can run most of it for you." },
          { type: "p", text: "The right mental model: OpenCode is a **junior developer with perfect Git manners and no memory of your project**. You give it the repository, the rules, and the approval — it does the typing, you keep the judgment." },
          { type: "h3", text: "What OpenCode will do for you" },
          { type: "list", items: [
            "Scan open issues and propose ones matching your skill level.",
            "Read the codebase, implement the fix, run the tests.",
            "Create the branch, commit, push to **your fork**, and open the pull request.",
            "Later — on your command — fetch every maintainer comment, explain it, fix the code, and push updates until it's merged.",
          ]},
          { type: "h3", text: "What you still own" },
          { type: "versus", left: { label: "Manual loop", badge: "Ch 1–3", items: ["You find the issue", "You type every line", "You run every command", "You fetch review comments"] }, right: { label: "AI-assisted loop", badge: "This chapter", items: ["Agent proposes issues", "Agent writes from your direction", "Agent runs tests & commits", "Agent fetches + summarizes comments"] } },
          { type: "list", items: [
            "**Every push and PR** — you approve each step (Chapter shows you how to enforce this with permissions).",
            "**Understanding your own diff** — if you can't explain the change, don't send it. This is a book about *you* contributing, not about shipping code you've never read.",
            "**The relationship** — replying to maintainers, answering questions on the PR, and being honest that you used AI assistance.",
          ]},
          { type: "callout", text: "Many projects welcome AI-assisted contributions; some restrict them or require you to disclose. **Always read the project's CONTRIBUTING.md and AI policy first** — and never paste a generated PR description that hides how the work was done." },
        ],
      },
      {
        slug: "installing-opencode",
        title: "4.2 Installing OpenCode",
        content: [
          { type: "p", text: "OpenCode runs in your terminal, with a desktop app and web app also available. Pick your install method:" },
          { type: "h3", text: "Step 1 — Install the CLI" },
          { type: "steps", items: [
            "**macOS / Linux:** `curl -fsSL https://opencode.ai/v2/install | bash`",
            "**Homebrew:** `brew install anomalyco/tap/opencode-v2`",
            "**npm (any OS):** `npm install -g @opencode/cli`",
            "Windows: use the npm method or download the standalone Windows binary from [opencode.ai](https://opencode.ai) — Windows *package managers* (winget/scoop/choco) are not supported.",
          ]},
          { type: "h3", text: "Step 2 — Verify" },
          { type: "steps", items: [
            "Open a new terminal, then `opencode --version` — a version number means it's on your PATH.",
            "Also confirm your earlier setup: `git --version` and `gh auth status` (you'll need GitHub CLI in the next section).",
          ]},
          { type: "h3", text: "Step 3 — Connect a model" },
          { type: "p", text: "OpenCode supports many LLM providers. On first launch it will walk you through connecting one:" },
          { type: "steps", items: [
            "Run `opencode` inside your cloned repository.",
            "Use `/connect` in the interface to sign in to a provider (API key or OAuth).",
            "Alternatives: **OpenCode Console** for easy access to top coding models, or **OpenCode Go** — a $10/month subscription that unlocks the best coding models.",
          ]},
          { type: "h3", text: "Step 4 — Learn the two modes you'll use" },
          { type: "list", items: [
            "`opencode` — the interactive terminal UI, for conversations, reviews, and approvals.",
            "`opencode run \"Fix the broken link in the README\"` — one-shot mode: submit a prompt, get the work done, no interface. Perfect for scripts and quick tasks.",
          ]},
          { type: "callout", text: "Always launch `opencode` **from inside the repository folder** — the agent works on the files in the directory you open it in. Wrong folder = wrong project." },
          { type: "quote", text: "One command to install, one command to run. The setup cost of an AI pair contributor is about five minutes.", source: "This book" },
        ],
      },
      {
        slug: "github-access",
        title: "4.3 Giving OpenCode Access to Your GitHub",
        content: [
          { type: "p", text: "OpenCode writes code locally out of the box. To let it **push branches and open pull requests**, it needs authenticated GitHub access on your machine — which it can then use through its shell tool." },
          { type: "h3", text: "Option A — GitHub CLI (`gh`): the simple, reliable way ⭐" },
          { type: "steps", items: [
            "Install the GitHub CLI: `winget install GitHub.cli` (Windows), `brew install gh` (macOS), or `sudo apt install gh` (Linux).",
            "Authenticate: `gh auth login` → choose **GitHub.com** → **HTTPS** → **Login with a web browser** → paste the one-time code.",
            "Verify: `gh auth status` — you should see \"Logged in to github.com as your-username\".",
            "Smoke-test from inside your fork: `gh pr create --fill --dry-run` — it should recognize the repo and your identity.",
          ]},
          { type: "p", text: "That's it. OpenCode can now run commands like `gh issue list`, `gh pr create`, and `gh pr view` — and every request GitHub receives is **as you**, on your fork, exactly like doing it manually." },
          { type: "h3", text: "Option B — GitHub MCP server: richer GitHub tools" },
          { type: "p", text: "For deeper integration (searching issues, reading review threads through dedicated tools instead of shell commands), add GitHub's remote MCP server:" },
          { type: "steps", items: [
            "`opencode mcp add github --global --url <GitHub's remote MCP URL>` (grab the current URL from GitHub's official MCP docs — it may change).",
            "Inside OpenCode, run `/mcps`, select the server, and sign in when it asks to authenticate.",
            "`opencode mcp list` should show `✓ github connected`.",
          ]},
          { type: "h3", text: "Option C — The Git credential helper you already set up" },
          { type: "p", text: "If you configured SSH keys or a personal access token in Chapter 2, plain `git push` from OpenCode already works — the `gh` CLI simply adds issue/PR commands on top of that. Option A + your existing credentials is the setup this book uses." },
          { type: "h3", text: "Lock it down: permissions for safe PR-sending" },
          { type: "p", text: "Give OpenCode the *minimum* power it needs. In your project's `opencode.jsonc`:" },
          { type: "list", items: [
            "Read-only commands (`git status`, `git diff`, `git log`, `gh issue list`, `gh pr view`) → **allow**, so it can explore without nagging you.",
            "Dangerous commands (`git push`, `gh pr create`, `git commit`) → **ask**, so you approve every outbound action.",
            "Destructive commands (`git push --force`, pushing to `main`) → **deny**, hard-blocked no matter what.",
          ]},
          { type: "callout", text: "Rules are checked in order and **the last matching rule wins**, so specific exceptions go *after* the broad \"ask\" rule. A `deny` can never be overridden by an `allow`." },
          { type: "p", text: "When a command resolves to *ask*, you get three choices: **Allow once**, **Allow always** (saves that command pattern for this project), or **Reject**. Choose *Allow always* only for commands you've seen and trust." },
        ],
      },
      {
        slug: "system-prompt",
        title: "4.4 The System Prompt: Forked, Cloned, Fix, PR",
        content: [
          { type: "p", text: "An AI performs well when the rules are written down once instead of retyped every session. OpenCode reads an **`AGENTS.md`** file in your repository as persistent project instructions — that's where your contribution workflow lives." },
          { type: "h3", text: "Create `AGENTS.md` in your fork's root" },
          { type: "list", items: [
            "OpenCode loads a global `~/.config/opencode/AGENTS.md` first, then every `AGENTS.md` from your workspace up to the project root.",
            "Keep universal rules globally; put the per-repository workflow in the project's file.",
            "Instructions from `AGENTS.md` are combined with your config `instructions` array — you can also list `CONTRIBUTING.md` there so the project's own rules are always loaded.",
          ]},
          { type: "h3", text: "The workflow prompt (copy and adapt)" },
          { type: "list", items: [
            "**State of the repo:** \"This is my fork of `upstream` (the original). `origin` = my fork, `upstream` = original project. Never push directly to `main`.\"",
            "**The mission:** \"When I ask you to work on an issue: list open `good first issue` candidates with `gh issue list`, propose 3 with why each fits, and **wait for my pick** before coding.\"",
            "**The fix:** \"Create branch `fix/<issue-number>-<short-description>`, make the smallest change that solves the issue, run the project's lint and tests. Do not proceed if checks fail.\"",
            "**The PR:** \"Commit with a clear message that references the issue (e.g. `Closes #42`), push the branch to `origin`, then open a PR with `gh pr create` — title summarizing the fix, description explaining what/why, linking the issue. **Show me the diff and wait for my approval before pushing.**\"",
          ]},
          { type: "h3", text: "What a session looks like" },
          { type: "steps", items: [
            "You: `cd your-fork && opencode`",
            "You: *\"Find me a good first issue to work on.\"*",
            "OpenCode: lists candidates with reasoning. You pick one.",
            "You: *\"Work on issue #42. Follow AGENTS.md.\"*",
            "OpenCode: implements the fix, runs tests, shows the diff, asks to push.",
            "You: approve → it pushes and opens the PR. You read the final PR on GitHub before considering it done.",
          ]},
          { type: "callout", text: "The `\"wait for my approval\"` line is the heart of the system prompt. Without it, an eager agent may push before you've read a single line of the diff." },
        ],
      },
      {
        slug: "sending-prs",
        title: "4.5 Watching It Send Your First AI-Assisted PR",
        content: [
          { type: "p", text: "Everything from Chapter 2 and 3 now happens in one sitting. Here's the full sequence with real commands." },
          { type: "h3", text: "One-time preparation" },
          { type: "steps", items: [
            "Fork + clone the target repo, and `git remote add upstream <original-url>` (Chapter 2).",
            "Confirm your environment runs the project: install deps, tests pass untouched.",
            "`gh auth status` — GitHub access confirmed.",
            "Write `AGENTS.md` with the workflow prompt above.",
            "Add your `permissions` rules to `opencode.jsonc`.",
          ]},
          { type: "h3", text: "The contribution session" },
          { type: "steps", items: [
            "Run `opencode` in the repo folder.",
            "Prompt: *\"Find good first issues and suggest ones I could take.\"* → pick one together.",
            "Prompt: *\"Implement the fix on a new branch and show me the diff.\"*",
            "You read every line. Ask questions about anything you don't understand — this is free mentorship, use it.",
            "Approve the push. OpenCode commits, pushes to `origin`, and runs `gh pr create`.",
            "Open the PR URL on GitHub. **Read what was actually published** — title, description, files changed.",
          ]},
          { type: "h3", text: "Before you post, sanity-check the PR yourself" },
          { type: "list", items: [
            "Does the diff touch **only** files related to the issue?",
            "Is the PR description honest and clear? Rewrite it in your own words if needed — you own it.",
            "Does it link/close the issue? (`Closes #42`)",
            "Are CI checks green within the first few minutes?",
            "Any secrets, build artifacts, or debug logs accidentally included? Never push those.",
          ]},
          { type: "callout", text: "Treat the AI's PR like a PR from a teammate: **you review it before the maintainer does.** The reviewer who catches their own mistakes first earns trust; the one who doesn't burns it." },
          { type: "quote", text: "The agent types the code. The accountability is 100% yours.", source: "This book" },
        ],
      },
      {
        slug: "review-loop",
        title: "4.6 The Review Loop: Fix What the Maintainers Ask Until It Merges",
        content: [
          { type: "p", text: "PR opened is not \"done.\" Real PRs come back with comments — and this is where an AI pair contributor quietly saves you the most time." },
          { type: "h3", text: "Round 1 — Pull the review on your command" },
          { type: "p", text: "Come back to the session (or start a new one in the repo) and say exactly what you described in the plan:" },
          { type: "steps", items: [
            "You: *\"Check my PR #12 for review comments from the maintainers and address them.\"*",
            "OpenCode fetches them (`gh pr view 12 --comments`, plus the inline review threads via `gh api repos/<owner>/<repo>/pulls/12/comments`).",
            "It **summarizes each comment and its planned fix**, then waits for your approval — your permissions config forces this.",
            "You approve each fix → it edits the code, re-runs lint and tests, commits, and pushes the update to the same branch (the PR refreshes automatically).",
            "Then ask it to *\"reply to each comment explaining what changed\"* — a short, human reply to every reviewer is what gets PRs moving.",
          ]},
          { type: "h3", text: "Round 2+ — Repeat until green" },
          { type: "list", items: [
            "Maintainers review in waves — expect 1–3 rounds on a first contribution. That's healthy, not rejection.",
            "Each round: pull comments → summarize → you approve → fix → test → push → reply.",
            "If a request is unclear or you disagree, say so — have OpenCode draft a clarifying reply, but **you** decide what to post. Professional tone, no defensiveness.",
            "Never mark a comment \"resolved\" without actually changing the code — reviewers notice.",
          ]},
          { type: "h3", text: "The merge" },
          { type: "steps", items: [
            "All checks green, all threads resolved, maintainer approves.",
            "They merge (or give you merge rights on your own PR — you'll see it in the comments).",
            "Ask OpenCode: *\"Clean up: sync my fork with upstream and delete the local branch.\"* → `git fetch upstream && git merge upstream/main`, push `main`, delete the branch.",
            "Your name is on the contribution history. Post the PR link in your portfolio and roll straight into the next issue — repetition is what builds the reputation Chapter 5 is about.",
          ]},
          { type: "h3", text: "Troubleshooting the loop" },
          { type: "list", items: [
            "**CI failed after push** — *\"Check the failing workflow run on PR #12 and fix it.\"* OpenCode reads the logs and patches the issue.",
            "**Comment conflicts with another comment** — reply asking the maintainers which preference wins; don't guess.",
            "**Stale PR (no response for weeks)** — a polite one-line bump comment works; ask OpenCode to check whether the code has moved on (`git fetch upstream`) and rebased first.",
            "**The AI misunderstood the review** — quote the comment back and correct it. The summarizing step exists so *you* catch misunderstandings before they're pushed.",
          ]},
          { type: "callout", text: "The human-in-the-loop rhythm that works: **AI fetches → summarizes → you decide → AI executes → you verify.** Skip the \"you decide\" step often enough and you'll eventually push something you can't defend in review." },
          { type: "diagram", name: "aiLoop", caption: "The supervised review loop — humans own the decision points." },
        ],
      },
    ],
  },
  {
    number: 5,
    slug: "growing",
    title: "Beyond the First PR: Building a Reputation",
    summary:
      "Turn one merged PR into a lasting presence: contribute consistently, communicate so maintainers trust you, take on bigger work, and grow into your first maintainer responsibilities.",
    objectives: [
      "Build a sustainable contribution rhythm and portfolio",
      "Communicate in a way that earns maintainer trust",
      "Escalate from fixes to features using discussion-first work",
      "Take on your first maintainer duties gracefully",
    ],
    subChapters: [
      {
        slug: "consistency",
        title: "5.1 Consistency Beats Heroics",
        content: [
          { type: "p", text: "One merged PR is an event. Regular merged PRs are a reputation. The contributors who get invited to interesting work aren't the most talented — they're the most *reliably present*." },
          { type: "diagram", name: "ladder", caption: "The reputation ladder — every rung is earned by the same loop from Chapter 3." },
          { type: "h3", text: "The sustainable rhythm" },
          { type: "list", items: [
            "**Small and frequent beats big and rare.** Two focused hours weekly ships more than a vanished-then-bursting weekend.",
            "**Work a queue, not a single issue.** Keep 2–3 candidate issues warm: one being worked, one waiting for review, one waiting for maintainer confirmation.",
            "**Follow up before starting.** A PR waiting on review deserves a check-in; a merged PR deserves a sync. Untracked PRs are where contributions go to die.",
            "**Ride the roadmap.** After one good PR, look for `help wanted` on the same area — familiarity makes you 3× faster next time.",
          ]},
          { type: "h3", text: "Track your contributions like a portfolio" },
          { type: "steps", items: [
            "Keep a simple list (a note file or spreadsheet): project, PR link, status, lesson learned.",
            "Review it monthly — you'll spot patterns: which projects respond, which maintainers are kind, which types of work suit you.",
            "Consolidate: after a few merged PRs in one project, that's your *home* project. Depth in one community outweighs breadth across ten.",
          ]},
          { type: "h3", text: "Why projects reward regulars" },
          { type: "p", text: "From a maintainer's seat: reviewing strangers is expensive — every unknown contributor needs full scrutiny. A returning contributor with a track record gets faster reviews, bigger assignments, and the benefit of the doubt. **Your past merged PRs are your interview for the next one.**" },
          { type: "callout", text: "A quiet month is fine; a silent exit is not. If you'll be busy, say so in the project's discussion. Reputation survives absence — disappearing without a word doesn't." },
          { type: "p", text: "**What that looks like in practice:** I built most of my 38 merged PRs the same way — one focused fix at a time, project by project. Twenty-one of them landed in [google/adk-docs](https://github.com/search?q=repo%3Agoogle%2Fadk-docs+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests) because after the first merge I already knew the repo's conventions; each PR after it was faster to write and smoother to review. Familiarity *is* the compounding interest." },
        ],
      },
      {
        slug: "communication",
        title: "5.2 Communication That Makes Maintainers Trust You",
        content: [
          { type: "p", text: "At the contributor level, code skill is the price of entry. **Trust** — the thing that unlocks bigger work — is built almost entirely in text." },
          { type: "h3", text: "The traits of a trusted contributor" },
          { type: "list", items: [
            "**Predictable.** Does what they said, when they said it — or communicates early when plans change.",
            "**Scoped.** PRs that do one thing. Issues that aren't vague hand-grenades.",
            "**Responsive.** Replies within a day or two, even if just *\"on it this weekend.\"*",
            "**Curious, not defensive.** Asks *why* the project does something a certain way instead of assuming their way is better.",
            "**Credit-sharing.** Links the prior art they built on, thanks reviewers by name, never claims someone else's idea.",
          ]},
          { type: "h3", text: "Write comments reviewers want to read" },
          { type: "steps", items: [
            "**Lead with the decision needed:** *\"Should I keep option A or switch to B? A is faster, B matches the existing utils.\"*",
            "**Show, don't wall.** Code snippets, screenshots, reproducible steps — never three paragraphs where a diff belongs.",
            "**Disagree with reasons and an off-ramp:** *\"I went with X because Y breaks on Windows (link). Happy to revisit if portability isn't a goal here.\"*",
            "**Close loops.** When a conversation ends, one line confirms it: *\"Resolved in abc123 — thanks!\"*",
          ]},
          { type: "h3", text: "Navigating disagreement and rejection" },
          { type: "list", items: [
            "Your PR may be closed unmerged after real work. It happens to everyone — sometimes the approach was wrong, sometimes the timing was, sometimes the maintainer misjudged.",
            "Ask for the takeaway once, graciously: *\"Understood. For next time — would a smaller fix around X have been the right shape?\"*",
            "**Never:** guilt-tripping, comparing yourself to other contributors, or re-opening the same debate across five comments.",
            "**Do:** extract the lesson, keep the branch history, and bring that knowledge to your next PR *somewhere else*.",
          ]},
          { type: "quote", text: "Maintainers don't remember your cleverest code. They remember whether working with you was easy.", source: "This book" },
        ],
      },
      {
        slug: "bigger-work",
        title: "5.3 Leveling Up: Features, Discussions & Bigger Changes",
        content: [
          { type: "p", text: "Bug fixes and docs were your training wheels. Now graduate to changes that shape the project — where the skill isn't writing code, but *aligning before writing*." },
          { type: "h3", text: "The escalation ladder" },
          { type: "table", headers: ["Tier", "Work", "Review speed", "Discuss first?" ], rows: [
            ["1", "Fixes & docs", "Fastest", "No"],
            ["2", "Small improvements (tests, errors, perf)", "Fast", "Rarely"],
            ["3", "Features with precedent", "Normal", "Yes — prove demand"],
            ["4", "Net-new behavior", "Slowest", "Always — design issue first"],
          ]},
          { type: "h3", text: "The \"discussion before code\" rule" },
          { type: "p", text: "For anything Tier 3+, open an issue (or the project's RFC/discussions channel) **before** investing days:" },
          { type: "list", items: [
            "State the problem you're solving and who it affects — not your solution first.",
            "Offer 2 options with trade-offs. Maintainers pick; builders propose.",
            "Reference prior issues/PRs so nobody re-litigates old decisions.",
            "Wait for a maintainer signal before implementing. Silence is not approval.",
          ]},
          { type: "h3", text: "Splitting big work so it actually ships" },
          { type: "list", items: [
            "Large PRs don't get reviewed — they get parked. Break work into stacked, individually-mergeable PRs.",
            "Ship the boring foundation first (types, plumbing, tests); the visible change second.",
            "Keep each PR mergeable *without* the next one — maintainers merge whenever they're ready.",
            "Post a checklist issue linking each stack piece so progress stays visible.",
          ]},
          { type: "callout", text: "The promotion signal: a maintainer replies *\"feel free to take a look at issue #X too\"* without being asked. That's organic trust — chase the work that produces these moments." },
          { type: "p", text: "**My own ladder, rung by rung:** I started at Tier 1 — typos and dead links in [google/adk-docs](https://github.com/search?q=repo%3Agoogle%2Fadk-docs+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests). Once maintainers saw I followed instructions, I moved to Tier 2 *code* fixes in [openai/openai-agents-python](https://github.com/search?q=repo%3Aopenai%2Fopenai-agents-python+author%3AAAliKKhan+is%3Apr+is%3Amerged&type=pullrequests) — like [consolidating same-exception re-raises into bare `raise`](https://github.com/openai/openai-agents-python/pull/4023) and [breaking out of the voice audio dispatch loop on session end](https://github.com/openai/openai-agents-python/pull/4044). Docs first, real code second — exactly the escalation order above." },
        ],
      },
      {
        slug: "first-maintainer-duties",
        title: "5.4 Your First Maintainer Duties",
        content: [
          { type: "p", text: "Reputation compounds into responsibility. One day a maintainer asks: *\"Want to help review incoming PRs?\"* — congratulations, you've crossed from consumer to steward." },
          { type: "h3", text: "Reviewing others' PRs" },
          { type: "steps", items: [
            "**Understand intent first, implementation second** — read the description before the diff.",
            "**Categorize every comment** so the author knows what's blocking: \"must\" vs \"nit\", and use Request changes / Comment / Approve properly.",
            "**Ask before prescribing:** *\"What happens if the list is empty?\"* teaches more than *\"This is wrong.\"*",
            "**Praise specifics.** *\"Clean error handling here — nice\"* costs seconds and builds a culture people want to work in.",
            "**Be fast on small PRs.** First-time contributors who wait a week rarely return — speed of first response is a maintainer metric.",
          ]},
          { type: "h3", text: "Triaging issues" },
          { type: "list", items: [
            "Reproduce bugs before labeling — then label (`needs-repro`, `bug`, `good first issue`) so the next contributor inherits a clean queue.",
            "Close stale or duplicate issues with kindness and a link — triage is maintenance, not rejection.",
            "Improve issue templates so reports arrive better than you found them.",
          ]},
          { type: "h3", text: "Keeping the project alive" },
          { type: "list", items: [
            "Green CI and a working release process matter more than new features — protect them.",
            "Answer questions about the project in discussions and forums; you become the person who *knows*.",
            "Write the docs you needed when you started — still the highest-leverage file in any repo.",
          ]},
          { type: "h3", text: "Knowing your limits" },
          { type: "p", text: "Maintainership is a duty, not a badge: unanswered review queues and ghosted issues actively hurt projects. Accept only the responsibility you can sustain, delegate what you can't, and step back openly if you need to — communities respect honest capacity far more than silent overload." },
          { type: "quote", text: "Contributing gets your code merged. Becoming a steward gets your name in the project's story.", source: "This book" },
          { type: "p", text: "This is the arc's final stop: you came in wondering what open source was, and you're leaving as someone who shapes it. Where you go from here — deeper craft, or a career built on this reputation — is exactly what the paths ahead are for." },
        ],
      },
    ],
  },
  // ➕ Add more chapters below...
];
