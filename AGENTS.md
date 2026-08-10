# meghsohor-blog

Personal blog + portfolio site of Shafiqul Islam (Shuvo). Live at https://www.meghsohor.dev (hosted on Netlify).

## Repo layout

Astro 5 + Tailwind CSS v4, at the repo root. The Gatsby site it replaced was removed in the
`migration_astro` cutover — recover anything you need from git history (`git show d44e55e^:<path>`).

## Commands

```sh
npm install
npm run dev        # dev server at localhost:4321
npm run build      # static build to dist/
npm run preview    # serve the production build locally
npm run lint       # astro check
npm run format:check
```

Node 24 (current LTS; see `.node-version`). CI (`.github/workflows/pr-checks.yml`) and Netlify (`netlify.toml`) both read the same version.

## Architecture

- `src/content/` — content collections: `blog` (9 posts), `portfolio` (6 projects), `career` (8 jobs). Markdown with frontmatter; schemas in `src/content/config.ts`.
- `src/pages/` — file-based routes. Blog post URLs must stay `/blog/<slug>` and paginated lists `/blog/page/<n>` for parity with the old Gatsby site (SEO). Old tag URLs were `/tag/<tag>` (singular).
- `src/components/` — plain `.astro` components only; no framework islands (no React/Vue/etc.). Keep it that way unless a feature genuinely needs client-side JS — prefer a small inline `<script>` in the component.
- `src/config.ts` — site metadata (title, description, author, siteURL).
- `src/styles/global.css` — global styles and the design tokens. Tailwind v4 is configured CSS-first through the `@tailwindcss/vite` plugin (there is no `tailwind.config.js`). Semantic tokens live as `--theme-*` variables on `:root` and are mapped to utilities (`bg-surface`, `text-heading`, …) via `@theme inline`; always use tokens instead of hex values so dark mode keeps working.
- Images live in `public/images/` and are referenced by absolute path (`/images/...`).

## Conventions

- Prettier: no semicolons, `arrowParens: avoid` (see `.prettierrc`); final newline in every file (`.editorconfig`).
- Components use single quotes in frontmatter and attributes.
- Content filenames double as slugs for the `blog` collection — renaming a markdown file changes its URL.
- Posts are pure markdown since the markup refactor; the only classes still referenced from raw HTML in `src/content/blog/*.md` are `.alert`/`.alert-warning`/`.alert-info` and `text-center` — don't rename `.alert*`, and don't add a restrictive `@source` (Tailwind's scan of the `.md` files generates the utilities posts use). Post-section styling lives on `.prose h2/h3/ul/ol/table` in `global.css`.
