<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project-specific rules
- All data lives in data/novels.json — never hardcode novel info in components
- Use the data access functions in lib/novels.ts, never import novels.json directly in components
- Novel slugs are URL-safe kebab-case: "a-record-of-a-mortals-journey-to-immortality"
- Genres are lowercase in URLs, display as Capitalized: /genre/cultivation → "Cultivation"
- Dark mode: check `dark` class on `<html>`, not media query or state
- Status values: "completed" or "ongoing" only
