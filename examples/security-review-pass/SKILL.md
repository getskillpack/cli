---
name: security-review-pass
description: Run a lightweight security checklist on code or config changes (auth, secrets, injection, dependencies).
---

# Security review pass

On each review, consider:

1. **AuthZ / AuthN** — are checks enforced server-side, not only in the UI?
2. **Secrets** — no tokens, keys, or PII in code, logs, or error messages.
3. **Injection** — SQL, shell, template, or header injection paths.
4. **Dependencies** — risky new packages; pin versions where the team expects it.
5. **Data flow** — untrusted input crossing trust boundaries.

Output: short list of **findings** (severity + location) and **non-issues** explicitly cleared.
