# Blog

A minimalist Eleventy blog inspired by drobinin.com.

## Local development

```bash
npm install
npm start
```

Then open http://localhost:8080.

## Build

```bash
npm run build
```

Output goes to `_site/`.

## Writing a post

1. Create `src/posts/your-slug.md`
2. Add frontmatter:
   ```yaml
   ---
   title: Your title
   date: 2026-05-28
   description: Short summary used in <meta> and RSS.
   ---
   ```
3. Use `##` and `###` headings — they auto-populate the right-side TOC.
4. Footnotes use standard markdown: `text[^1]` and `[^1]: note`.

## Layout map

```
src/
  _includes/layouts/    base.njk (shell), post.njk (with TOC), page.njk
  _data/site.json        site title, nav, author
  assets/css/style.css   typography & layout
  posts/                 markdown posts (auto-tagged "posts")
  index.njk              homepage
  posts.njk              /posts/ index
  about.md               /about/
  feed.njk               /feed.xml (Atom)
.eleventy.js             config: plugins, filters, collections
netlify.toml             deploy config for Netlify
```

## Deploy

### Netlify
1. Push this repo to GitHub
2. In Netlify, "Add new site" → "Import from Git" → pick the repo
3. Build settings auto-detected from `netlify.toml`
4. Add your custom domain in Netlify's Domain settings

### Cloudflare Pages
1. Push to GitHub
2. In Cloudflare Pages, "Create a project" → connect repo
3. Build command: `npm run build`, output directory: `_site`
4. Node version: set `NODE_VERSION=20` in env vars

## Customization checklist

- [ ] Edit `src/_data/site.json` — title, description, URL, author
- [ ] Replace `Victor's Blog` placeholder
- [ ] Edit `src/about.md`
- [ ] Adjust accent color in `src/assets/css/style.css` (`--accent`)
- [ ] Drop a `favicon.ico` in `src/`
