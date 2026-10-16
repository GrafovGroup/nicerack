# Project workflow

- After completing each phase, immediately commit and publish its implementation and completion report to GitHub. Do not leave completed phases only in local commits or ask again for permission to publish them.
- Preserve remote changes: fetch and integrate the current base before pushing; never force push.
- Verify the remote branch contains the report and provide its GitHub link in the completion message.
- Clearly distinguish completed phases from partial increments and GitHub publication from live hosting deployment.
- Follow the website defaults and image uniqueness requirements supplied by the user in this chat.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
