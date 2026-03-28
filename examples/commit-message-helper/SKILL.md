---
name: commit-message-helper
description: Suggest conventional commit messages and clear subject lines from a short change summary.
---

# Commit message helper

When the user describes what changed, propose:

1. **Type** — one of `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `ci`.
2. **Scope** — optional, short noun (e.g. `cli`, `registry`).
3. **Subject** — imperative mood, ~50 characters, no trailing period.
4. **Body** — optional bullets for breaking changes or migration notes.

Prefer one commit per logical change. If the change mixes concerns, suggest splitting.
