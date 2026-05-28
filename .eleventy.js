const rssPlugin = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginTOC = require("eleventy-plugin-toc");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItFootnote = require("markdown-it-footnote");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(rssPlugin);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ["h2", "h3"],
    wrapper: "nav",
    wrapperClass: "toc",
    ul: true,
  });

  const md = markdownIt({ html: true, linkify: true, typographer: true })
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
    })
    .use(markdownItFootnote);
  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

  // Transform: lift markdown-it-footnote output into Tufte-style inline sidenotes.
  // The plugin emits superscript refs in body + a <section class="footnotes"> at
  // the bottom. We move each footnote's content next to its reference as an
  // <aside class="sidenote"> and drop the bottom section.
  eleventyConfig.addTransform("sidenotes", function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
      return content;
    }
    if (!content.includes('class="footnotes"')) return content;

    // 1. Collect each footnote's inner content, keyed by numeric id.
    // The sidenote is wrapped in <span> (not <aside>) so it can live inside
    // a <p> without auto-closing it. So we flatten the paragraph structure:
    // outer <p>...</p> wrappers are stripped, and any internal paragraph
    // breaks become <br><br>.
    const notes = {};
    content.replace(
      /<li id="fn(\d+)" class="footnote-item">([\s\S]*?)<\/li>/g,
      (_, id, body) => {
        let inner = body
          .replace(
            /\s*<a href="#fnref\d+(?::\d+)?" class="footnote-backref">[\s\S]*?<\/a>/g,
            ""
          )
          .trim()
          .replace(/<\/p>\s*<p>/g, "<br><br>")
          .replace(/^<p>/, "")
          .replace(/<\/p>\s*$/, "")
          .trim();
        notes[id] = inner;
        return "";
      }
    );

    // 2. Replace each inline footnote reference with sidenote markup.
    content = content.replace(
      /<sup class="footnote-ref"><a href="#fn(\d+)" id="fnref\1(?::\d+)?">\[(\d+)\]<\/a><\/sup>/g,
      (_, id, num) => {
        const body = notes[id] || "";
        return (
          `<sup class="sidenote-number">${num}</sup>` +
          `<span class="sidenote"><span class="sidenote-num">${num}</span> ${body}</span>`
        );
      }
    );

    // 3. Strip the now-orphaned bottom footnotes block.
    content = content.replace(
      /\s*<hr class="footnotes-sep">\s*<section class="footnotes">[\s\S]*?<\/section>\s*/,
      ""
    );

    return content;
  });

  eleventyConfig.addFilter("readableDate", (d) =>
    new Date(d).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  );
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString());
  eleventyConfig.addFilter("head", (arr, n) =>
    !Array.isArray(arr) ? [] : arr.slice(0, n)
  );

  eleventyConfig.addCollection("posts", (api) =>
    api.getFilteredByGlob("src/posts/*.md").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
