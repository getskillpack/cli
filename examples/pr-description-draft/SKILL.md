---
name: pr-description-draft
description: Draft a pull request description with summary, test plan, and risk notes from a diff or bullet list.
---

# PR description draft

Given a change summary or diff context, produce a PR description with:

- **Title** — concise, present tense or imperative.
- **Summary** — what changed and why (user-facing when relevant).
- **Test plan** — commands run or scenarios checked.
- **Risks / rollout** — migrations, feature flags, or follow-ups.

Keep formatting in Markdown. Avoid vague phrases; prefer concrete file or module names when known.
