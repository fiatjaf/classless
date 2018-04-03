If you're writing a website with raw HTML, the procedure is the following:

  1. Write an HTML that follows [the pattern demonstrated here](https://workflowy.com/s/Q79FgxLKUT). This is not a hard spec, and you don't need to use all the elements there, but the main structure must be kept. There's a simpler [HTML example](https://github.com/fiatjaf/classless/blob/master/explained-structure.html) also.
  2. Include the CSS for the theme you want. You can link directly to the files on GitHub Pages (at `https://fiatjaf.github.io/classless/themes/<theme name>/theme.css`) or [RawGit](https://rawgit.com/), or you can use our CDN (at `https://d27d3vb5d5ixst.cloudfront.net/classless/themes/<theme name>/theme.css`).
    * Insert the following HTML inside the `<head>` of your page HTML: `<link rel="stylesheet" href="https://d27d3vb5d5ixst.cloudfront.net/classless/themes/<theme name>/theme.css">`.
    * As a bonus, whenever the theme gets updated by its author, it will be automatically updated on your website.
  3. If the chosen theme has a Javascript file, you are expected to include it in the end of the page, so do it. The URLs are the same as for the CSS file, expect that they end with `.js` instead of `.css`.
    * Insert the following HTML after the `<body>` of your page HTML: `<script src="https://fiatjaf.github.io/classless/themes/<theme name>/theme.js"></script>`.
  4. That's it.
