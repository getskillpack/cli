# Growth experiments v4 — funnel + star CTA (measurable)

**Parent sprint:** Paperclip **XDE-46** (internal board) / prior closure narrative **XDE-42** in org docs and ticket comments.

**Goal:** Run **two** focused experiments with explicit **baseline → result** rows, without spamming heartbeats. English copy stays aligned with [MARKETING_LANDING_AND_GROWTH.md](MARKETING_LANDING_AND_GROWTH.md).

## Snapshot — baseline (2026-03-28)

Recorded at the start of v4 (same method as v3: GitHub UI or API when repos are public; private org keeps this as the documented checkpoint).

| Repo | Stars (baseline) | Notes |
|------|------------------|--------|
| [getskillpack/cli](https://github.com/getskillpack/cli) | 0 | Flagship CLI |
| [getskillpack/registry](https://github.com/getskillpack/registry) | 0 | Registry |
| [getskillpack/skillget-manager](https://github.com/getskillpack/skillget-manager) | 0 | Install engine |

**Traffic / funnel proxies (same date):** capture **GitHub → Insights → Traffic** (clones, visitors) for `cli` if enabled; note referrers from `getskillpack.github.io` when the landing is live.

## Experiment 1 — Landing CTA placement + attribution (hero vs footer)

**Hypothesis:** Users who click **Star** from the **hero** row are more likely to complete a star than those who only see footer links, but **Source** clicks should remain the primary top-of-funnel path.

**Design:**

- **Instrumentation:** Outbound links from [docs/landing/index.html](landing/index.html) use stable UTM tags:
  - `utm_source=getskillpack-landing`
  - `utm_medium=web`
  - `utm_campaign=growth-v4`
  - `utm_content` ∈ `hero-star` | `hero-source` | `hero-footnote-*` | `footer-star-cli` | `footer-star-registry` | `footer-star-sgm` | `metrics-table-*`
- **Primary read:** GitHub **Traffic** referrers and path activity (where breakdowns exist); optional future: lightweight analytics on Pages if board approves.
- **Guardrails:** No copy change to board-approved one-liners; only link query parameters and ordering experiments approved with FE.

**Result row (fill on review date):**

| Metric | Baseline (2026-03-28) | After (target: +14d) | Delta / notes |
|--------|------------------------|----------------------|---------------|
| Stars `cli` | 0 | _TBD_ | |
| Hero-star attributed sessions (best proxy available) | _TBD_ | _TBD_ | |
| Footer-star attributed sessions | _TBD_ | _TBD_ | |

**Review date:** 2026-04-11 (or first tagged release after deploy, whichever is later) — CMO / board updates this table and the tracking ticket.

## Experiment 2 — GitHub star ask timing in README (`cli`)

**Hypothesis:** A **single** concise star line **after** the reader completes “Quick start” converts better than the same line **above** the fold, because intent is higher once they’ve seen the install path.

**Design:**

- **Phase A (baseline, ≥14 days):** Keep the current star paragraph **immediately after** the lead paragraph at the top of [README.md](../README.md) (current production).
- **Phase B:** Move **only** that star paragraph to **after** the “Быстрый старт (первый запуск за пару минут)” / quick-start block (English copy unchanged); no second star block — one ask, different position.
- **Measurement:** Compare **Δ stars** and **Traffic → Popular content** for `README.md` across equal-length windows before/after the change; avoid overlapping with a major release week if possible.

**Result row:**

| Window | README variant | Stars `cli` (end of window) | Traffic note |
|--------|----------------|----------------------------|--------------|
| Phase A | Star ask at top | _baseline count_ | _TBD_ |
| Phase B | Star ask after quick start | _TBD_ | _TBD_ |

**Owner:** FE / CMO coordinate the flip; record exact merge SHA in the tracking ticket.

## Experiment 3 (optional, copy-only) — Release post template

Not always run as an A/B; use when a release has a strong security or reliability story.

- **Template A (default):** [RELEASE.md](RELEASE.md#github-release-narrative-template) — “What shipped / Why it matters / What’s next”.
- **Template B:** [RELEASE.md](RELEASE.md#github-release-narrative-template-b-problem--fix--upgrade) — shorter “Problem → fix → upgrade” arc.

Pick one per release; log which template was used in the GitHub Release discussion or internal ticket.

## FE / board coordination

- **Founding Engineer** and **Founding Engineer 2:** visual hierarchy for hero CTAs (if reordering buttons) must stay accessible (contrast, focus order). Copy changes only through the marketing doc above.
- **Low noise:** One comment thread per experiment flip, not per heartbeat.

## Related

- [GITHUB_GROWTH_CHECKLIST.md](GITHUB_GROWTH_CHECKLIST.md)
- [MARKETING_LANDING_AND_GROWTH.md](MARKETING_LANDING_AND_GROWTH.md)
- Prior sprint closure narrative: commit `bd1a55a` (v3 checklist + landing CTAs).
