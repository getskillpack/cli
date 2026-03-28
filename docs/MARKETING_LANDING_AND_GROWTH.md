# Marketing: positioning, landing, and GitHub growth (KPIs, low-noise)

Canonical **English** artifact for public copy and board-aligned growth framing. For Russian internal notes see [MARKETING_LANDING_AND_GROWTH_RU.md](MARKETING_LANDING_AND_GROWTH_RU.md). Wording is approved by board; landing implementation may be split across Paperclip tasks for engineering.

## 1. Positioning (one line each)

| Entity | One-liner | Audience |
|--------|-----------|----------|
| **getskillpack** (org / ecosystem) | Open ecosystem to **discover, version, and install skills** for agents and IDEs — a package manager for reusable agent capabilities. | Skill authors, teams with AI agents, integrators. |
| **registry** ([`getskillpack/registry`](https://github.com/getskillpack/registry)) | HTTP API and storage for skill metadata and artifacts; compatibility contract across versions. | CLI, CI, and service developers. |
| **skillget** (CLI, [`getskillpack/cli`](https://github.com/getskillpack/cli)) | Official CLI: `search`, `install`, `config`, lockfile — the developer entry point. | Repo and CI users. |
| **skillget-manager** | Core install engine (lockfile, fetch, merge) — library behind the CLI. | Maintainers. |

**Public naming:** Prefer **skillget** + **getskillpack** on the landing and README. Treat “skpkg” as historical workspace naming only.

**Value in one paragraph (hero draft):**  
Install a vetted skill in one command, pin versions in your repository, and reproduce the same setup for your team and agents — without zip handoffs or one-off runbooks.

## 2. Landing structure (v2)

Goals: **30 seconds** to understand the product, **~5 minutes** to build or install the CLI and pull a first skill.

**Canonical public URL (GitHub Pages):** https://getskillpack.github.io/landing/ — served from the public repo [`getskillpack/landing`](https://github.com/getskillpack/landing) (mirrors `cli`’s `docs/landing/`).

1. **Hero:** product + CTAs (“Install CLI”, “Registry API docs”, “Source on GitHub”).
2. **North star (short):** we grow **trust and adoption in the open**; **~10k cumulative GitHub stars** across key public repos is a **long-horizon compass**, not a quarterly quota.
3. **How it works:** registry → CLI → `skills.lock` → `.skillget/` install tree.
4. **Quick start:** clone/build or release binary + `SKILLGET_REGISTRY_URL` + `search` / `install`.
5. **Trust:** licenses, org link, releases/issues as roadmap (no public SLA promises pre-GA).
6. **For skill authors:** link to registry contract / publish guides.
7. **Metrics we track:** compact table (stars, clones, traffic proxies) + **reporting cadence** below.
8. **Footer:** org links, link to this doc.

## 3. North star and funnel metrics

| Horizon | Metric (north star / proxy) | Why |
|---------|-----------------------------|-----|
| 12–24 mo | **GitHub stars** (sum across flagship public repos; board compass **~10k**) | Reach and open-source trust signal. |
| Weekly | **Releases:** tags on `cli`, `registry`, `skillget-manager` | Predictability for early adopters. |
| Weekly | **Clones / visitors** (GitHub traffic insights) on main repos | Interest before star conversion. |
| Weekly | **Forks** and **external PRs** | Community depth. |
| Weekly | **Mentions:** light manual log (GitHub, social, communities) — quality over volume | Narrative fit, not spam. |

**Board dashboard (minimum):** one **weekly** table or doc: stars per repo, releases in the week, 1–3 best external mentions, and an “anti-goals” line (what we did *not* do).

## 4. Reporting cadence (no heartbeat spam)

- **Weekly snapshot** (human or CMO summary into the goal/board channel) covers stars, clones/traffic where available, releases, and notable mentions.
- **Agent heartbeats** are for **execution**, not for re-posting “inbox empty” or duplicating the same KPI comment on every run.
- Escalations use Paperclip **only when** something changed, is blocked, or board explicitly asked for a review.

## 5. Growth rules (non-negotiable)

- No mass identical comments, star-for-star schemes, bots, or bought engagement — risks org reputation and ToS.
- Prefer **content**: release notes, migration notes, one thoughtful post per channel per release.
- **DX beats ads:** a five-minute first run in README/landing reduces drop-off more than shoutouts.
- Co-marketing via **docs and examples**, not bulk pinging maintainers.

## 6. Engineering handoff checklist

- [ ] Landing copy from §2 (board sign-off once).
- [ ] Open Graph / share preview for site or repo links.
- [ ] Stable registry API documentation URL.
- [ ] Install screenshot or asciinema in `cli` README.

## Related

- [MARKETING_LANDING_AND_GROWTH_RU.md](MARKETING_LANDING_AND_GROWTH_RU.md) — Russian mirror.
- [AGENT_GITHUB_REPO_WORKFLOW_RU.md](AGENT_GITHUB_REPO_WORKFLOW_RU.md) — PAT hygiene and push.
