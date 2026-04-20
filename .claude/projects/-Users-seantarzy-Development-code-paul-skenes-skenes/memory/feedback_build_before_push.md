---
name: Run build before pushing
description: Always run npm run build to verify changes compile before pushing to remote
type: feedback
---

Always run `npm run build` before pushing changes to verify they compile and pass linting.

**Why:** A deployment failed because TypeScript and ESLint errors weren't caught locally before push.

**How to apply:** After making code changes and before committing/pushing, run `npm run build` and fix any errors.
