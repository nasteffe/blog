---
title: Hello, world
date: 2026-05-28
description: First post — a quick demo of the layout, TOC, and footnotes.
---

This is the first post on the blog. It exists to demonstrate the layout —
serif body type, a sticky table of contents on the right, sidenotes floating
in the left margin[^margin], and a minimal palette inspired by [drobinin.com][1].

[^margin]: On narrow screens the sidenote collapses inline as a tinted block.

[1]: https://drobinin.com/

## What this template does

It builds with [Eleventy][2], renders Markdown through `markdown-it`, and
keeps everything as static HTML. No client-side JavaScript framework, no
server, nothing to maintain beyond writing Markdown[^stack].

[^stack]: The stack is deliberately small: Eleventy, `markdown-it`, three
    plugins, and one Eleventy transform for sidenotes.

[2]: https://www.11ty.dev/

### Sidenotes work

You can drop a sidenote like this[^syntax] anywhere in the text. Authoring
stays standard Markdown footnote syntax — no special directives. A post-build
transform lifts each footnote into an `<aside>` next to its reference and
strips the bottom-of-page section entirely.

[^syntax]: The Markdown is `text[^label]` followed by `[^label]: note
    contents` anywhere later in the file. Edward Tufte popularized this
    layout in *The Visual Display of Quantitative Information*.

## What the data shows

When you have charts or visualizations, the convention here is to export
them as PNG or SVG and place them in `src/assets/images/`, then reference
them in Markdown:

```markdown
![Caption text](/assets/images/my-chart.png)
```

That mirrors the approach drobinin.com uses — visualizations are baked at
authoring time, not rendered live in the browser.

## How to write the next one

1. Create `src/posts/your-slug.md`
2. Add frontmatter: `title`, `date`, optional `description`
3. Write Markdown. Use `##` and `###` headings — they automatically appear
   in the right-side TOC.
4. Run `npm start` and open `http://localhost:8080`.

That's it.
