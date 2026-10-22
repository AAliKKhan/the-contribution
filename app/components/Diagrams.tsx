/**
 * Themed SVG diagrams — colors follow the design tokens (CSS variables),
 * so they render correctly in both light and dark themes.
 * All diagrams are decorative-with-caption: role="img" + <title> for a11y.
 */

const stroke = "var(--line)";
const ink = "var(--ink)";
const muted = "var(--muted)";
const accent = "var(--accent)";
const card = "var(--card)";

/* ----------------------- 1. The contribution cycle ------------------------ */
export function ContributionCycle() {
  const steps = ["Pick an issue", "Branch + code", "Open PR", "Review", "Merged"];
  const w = 150;
  const gap = 44;
  const total = steps.length * w + (steps.length - 1) * gap;
  return (
    <svg
      viewBox={`0 0 ${total + 24} 110`}
      className="w-full"
      role="img"
      aria-labelledby="cycle-title"
    >
      <title id="cycle-title">
        The contribution cycle: pick an issue, branch and code, open a PR, review, merged
      </title>
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
        </marker>
      </defs>
      {steps.map((s, i) => {
        const x = 12 + i * (w + gap);
        return (
          <g key={s}>
            <rect x={x} y={28} width={w} height={52} rx={10} fill={card} stroke={i === 4 ? accent : stroke} strokeWidth={i === 4 ? 2 : 1.5} />
            <text x={x + w / 2} y={52} textAnchor="middle" fontSize={11} fontWeight={700} fill={i === 4 ? accent : ink}>
              {`0${i + 1}`}
            </text>
            <text x={x + w / 2} y={70} textAnchor="middle" fontSize={12} fill={muted}>
              {s}
            </text>
            {i < steps.length - 1 && (
              <line x1={x + w + 6} y1={54} x2={x + w + gap - 8} y2={54} stroke={accent} strokeWidth={2} markerEnd="url(#arrow)" />
            )}
          </g>
        );
      })}
      {/* loop-back */}
      <path d={`M ${12 + (steps.length - 1) * (w + gap) + w / 2} 84 L ${12 + (steps.length - 1) * (w + gap) + w / 2} 100 L ${12 + w / 2} 100 L ${12 + w / 2} 86`} fill="none" stroke={muted} strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#arrow)" />
      <text x={total / 2 + 12} y={108} textAnchor="middle" fontSize={10.5} fill={muted}>
        …and repeat — your second PR is easier than your first
      </text>
    </svg>
  );
}

/* ------------------------ 2. Fork / remotes map (Ch2) --------------------- */
export function RemotesMap() {
  return (
    <svg viewBox="0 0 720 260" className="w-full" role="img" aria-labelledby="remotes-title">
      <title id="remotes-title">
        Fork and remotes: the original project with an upstream remote, your GitHub fork as origin, and your local clone
      </title>
      <defs>
        <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
        </marker>
      </defs>

      {/* Original project */}
      <rect x={480} y={16} width={210} height={64} rx={12} fill={card} stroke={stroke} strokeWidth={1.5} />
      <text x={585} y={42} textAnchor="middle" fontSize={13} fontWeight={700} fill={ink}>Original project</text>
      <text x={585} y={62} textAnchor="middle" fontSize={11.5} fill={muted}>github.com/owner/repo</text>

      {/* Your fork */}
      <rect x={480} y={176} width={210} height={64} rx={12} fill={card} stroke={accent} strokeWidth={2} />
      <text x={585} y={202} textAnchor="middle" fontSize={13} fontWeight={700} fill={accent}>Your fork (origin)</text>
      <text x={585} y={222} textAnchor="middle" fontSize={11.5} fill={muted}>github.com/you/repo</text>

      {/* Local clone */}
      <rect x={30} y={96} width={210} height={64} rx={12} fill={card} stroke={stroke} strokeWidth={1.5} />
      <text x={135} y={122} textAnchor="middle" fontSize={13} fontWeight={700} fill={ink}>Local clone</text>
      <text x={135} y={142} textAnchor="middle" fontSize={11.5} fill={muted}>your laptop, your editor</text>

      {/* fork arrow (original -> fork) */}
      <path d="M 470 48 L 440 48 L 440 208 L 470 208" fill="none" stroke={muted} strokeWidth={1.5} strokeDasharray="5 4" />
      <text x={430} y={132} textAnchor="middle" fontSize={11} fill={muted} transform="rotate(-90 430 132)">1. fork (click)</text>

      {/* clone/push line local <-> fork */}
      <line x1={244} y1={128} x2={474} y2={196} stroke={accent} strokeWidth={2} markerEnd="url(#arr2)" />
      <text x={352} y={186} textAnchor="middle" fontSize={11} fill={accent}>2. clone ↓ / push ↑</text>

      {/* upstream line local <-> original */}
      <line x1={244} y1={120} x2={474} y2={56} stroke={muted} strokeWidth={2} markerEnd="url(#arr2)" />
      <text x={352} y={72} textAnchor="middle" fontSize={11} fill={muted}>3. upstream — sync from here</text>

      {/* PR line fork -> original */}
      <line x1={585} y1={172} x2={585} y2={86} stroke={accent} strokeWidth={2} markerEnd="url(#arr2)" />
      <text x={648} y={134} textAnchor="middle" fontSize={11} fill={accent} transform="rotate(90 648 134)">4. pull request →</text>
    </svg>
  );
}

/* --------------------- 3. The AI-supervised loop (Ch4) --------------------- */
export function AiLoop() {
  const nodes = [
    { t: "You command", s: "\"Fetch my PR's review\"" },
    { t: "AI fetches", s: "gh pr view / comments" },
    { t: "AI summarizes", s: "each comment + planned fix" },
    { t: "YOU decide", s: "approve / reject / edit" },
    { t: "AI executes", s: "fix → test → push" },
    { t: "You verify", s: "read the new diff" },
  ];
  const w = 106;
  const gap = 14;
  const total = nodes.length * w + (nodes.length - 1) * gap;
  return (
    <svg viewBox={`0 0 ${total + 24} 150`} className="w-full" role="img" aria-labelledby="ailoop-title">
      <title id="ailoop-title">
        The AI-supervised loop: you command, AI fetches, AI summarizes, you decide, AI executes, you verify
      </title>
      <defs>
        <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
        </marker>
      </defs>
      {nodes.map((n, i) => {
        const x = 12 + i * (w + gap);
        const human = i === 0 || i === 3 || i === 5;
        return (
          <g key={n.t}>
            <rect x={x} y={30} width={w} height={64} rx={10} fill={human ? "var(--accent-soft)" : card} stroke={human ? accent : stroke} strokeWidth={human ? 2 : 1.5} />
            <text x={x + w / 2} y={54} textAnchor="middle" fontSize={11} fontWeight={700} fill={human ? accent : ink}>
              {n.t}
            </text>
            <text x={x + w / 2} y={72} textAnchor="middle" fontSize={9} fill={muted}>
              {n.s}
            </text>
            <text x={x + w / 2} y={86} textAnchor="middle" fontSize={8.5} fill={muted}>
              {i === 0 || i === 3 || i === 5 ? "🧑 human" : "🤖 agent"}
            </text>
            {i < nodes.length - 1 && (
              <line x1={x + w + 2} y1={62} x2={x + w + gap - 3} y2={62} stroke={accent} strokeWidth={1.8} markerEnd="url(#arr3)" />
            )}
          </g>
        );
      })}
      <path d={`M ${12 + (nodes.length - 1) * (w + gap) + w / 2} 98 L ${12 + (nodes.length - 1) * (w + gap) + w / 2} 122 L ${12 + w / 2} 122 L ${12 + w / 2} 100`} fill="none" stroke={muted} strokeWidth={1.5} strokeDasharray="5 4" markerEnd="url(#arr3)" />
      <text x={total / 2 + 12} y={140} textAnchor="middle" fontSize={10.5} fill={muted}>
        repeat every review round until the PR is merged
      </text>
    </svg>
  );
}

/* ---------------------- 4. Reputation ladder (Ch5) ------------------------ */
export function ReputationLadder() {
  const rungs = [
    { n: "1", t: "First merged PR", s: "event" },
    { n: "2", t: "Regular contributor", s: "habit" },
    { n: "3", t: "Trusted reviewer", s: "trust" },
    { n: "4", t: "Maintainer", s: "steward" },
  ];
  const bw = 150;
  const bh = [64, 92, 120, 148];
  return (
    <svg viewBox="0 0 660 190" className="w-full" role="img" aria-labelledby="ladder-title">
      <title id="ladder-title">
        The reputation ladder: first merged PR, regular contributor, trusted reviewer, maintainer
      </title>
      {rungs.map((r, i) => {
        const x = 24 + i * (bw + 18);
        const h = bh[i];
        const y = 166 - h;
        return (
          <g key={r.n}>
            <rect x={x} y={y} width={bw} height={h} rx={10} fill={i === 3 ? "var(--accent-soft)" : card} stroke={i === 3 ? accent : stroke} strokeWidth={i === 3 ? 2 : 1.5} />
            <text x={x + bw / 2} y={y + 22} textAnchor="middle" fontSize={11} fontWeight={700} fill={i === 3 ? accent : muted}>
              {`L${r.n} · ${r.s}`}
            </text>
            <text x={x + bw / 2} y={y + 42} textAnchor="middle" fontSize={12} fontWeight={600} fill={ink}>
              {r.t}
            </text>
            {i > 0 && (
              <text x={x - 9} y={y + 16} textAnchor="middle" fontSize={14} fill={accent}>↗</text>
            )}
          </g>
        );
      })}
      <line x1={24} y1={170} x2={636} y2={170} stroke={stroke} strokeWidth={1.5} />
      <text x={330} y={186} textAnchor="middle" fontSize={10.5} fill={muted}>
        each rung takes ~one merged PR more than the last — the ladder never resets
      </text>
    </svg>
  );
}
