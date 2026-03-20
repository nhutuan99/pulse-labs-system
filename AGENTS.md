<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- BEGIN:tailwind-v4-rules -->

# Tailwind v4 — Use Modern Shorthand Utilities

This project uses **Tailwind CSS v4**. Several utility classes have been renamed to shorter forms. The old verbose names are **deprecated** and must NEVER be used.

| ❌ Deprecated (Do NOT use) | ✅ Use Instead         |
| -------------------------- | ---------------------- |
| `flex-shrink-0`            | `shrink-0`             |
| `flex-shrink`              | `shrink`               |
| `flex-grow-0`              | `grow-0`               |
| `flex-grow`                | `grow`                 |
| `overflow-ellipsis`        | `text-ellipsis`        |
| `overflow-clip`            | `text-clip`            |
| `decoration-clone`         | `box-decoration-clone` |
| `decoration-slice`         | `box-decoration-slice` |

Always use the **right column** when generating or editing Tailwind classes.

<!-- END:tailwind-v4-rules -->
