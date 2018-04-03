If you're writing a CMS or a static website generator and you want to quickly support a growing variety of themes without burdening yourself or your users with the task of distributing, finding, fetching and managing HTML files and template files, not to mention the task of writing or porting templates of other blog/website engines to your own custom CMS, you came to the right place.

To automatically support all [classless themes](https://github.com/websitesfortrello/classless/tree/gh-pages/themes) on your CMS, you just need to

  1. make the part of your code that renders HTML render something that resembles the [the pattern demonstrated here](https://workflowy.com/s/Q79FgxLKUT). This is not a hard spec, and you don't need to use all the elements there, but the main structure must be kept. There's a simpler [HTML example](https://github.com/websitesfortrello/classless/blob/gh-pages/explained-structure.html) also.
    * Basically, Classless themes support 2 kinds of pages:
      * _Article_ pages
        * These are the pages in which you have, inside the `<main>` tag, an `article` tag, with a `<header>` and a `<div>` for the article body.
      * _List_ pages
        * These are the pages in which you have, inside the `<main>` tag, a `<section>` with a `<ul>` inside. Each of the `<li>` there should have a `<article>`. The structure of that `<article>` is the same as of a standalone `<article>`, but sometimes you will not want it to have a text content, only the headers, sometimes you will not want the headers to have `<img>`s and so on.
        * _List_ pages also support a `<footer>` as a child of `<main>` for pagination. The basic structure is `footer > nav > ul > li > a`, that last `<a>` affording either a `[rel="next"]` or `[rel="prev"]` for custom theme styling.
    * for more examples, see the HTML source code of any page on [https://reconhecendo.me/](https://reconhecendo.me/) and [https://fiatjaf.on.flowi.es/](https://fiatjaf.on.flowi.es/).
  2. Let your users choose between the [classless theme names](https://github.com/websitesfortrello/classless/tree/gh-pages/themes)
  3. Render your HTML pages all with a `<link rel="stylesheet" href="https://d27d3vb5d5ixst.cloudfront.net/classless/themes/<chosen-theme-name>/theme.css">` at the `<head>` and a `<script src="https://d27d3vb5d5ixst.cloudfront.net/classless/themes/<chosen-theme-name>/theme.js"></script>` after the `<body>` of the page.
    * The themes will be updated automatically as soon as they change in the [GitHub repository](https://github.com/websitesfortrello/classless). If you don't want that, you can use [RawGit CDN](http://rawgit.com/) to serve the themes directly from the GitHub repository, pinning them to a specific commit -- or you can download and serve the themes yourself.
    * Many themes don't come up with a Javascript file. In these cases, a simple failed request shouldn't bother you, and it certainly will not bother the page visitor, since the theme will work well without that file.
  4. That's it.
