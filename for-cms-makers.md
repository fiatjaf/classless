If you're writing a CMS or a static website generator and you want to quickly support a growing variety of themes without burdening yourself or your users with the task of distributing, finding, fetching and managing HTML files and template files, not to mention the task of writing or porting templates of other blog/website engines to your own custom CMS, you came to the right place.

To automatically support all [classless themes](/themes) on your CMS, you just need to

1. Make the part of your code that renders HTML produce an structure [like this](https://github.com/fiatjaf/classless/blob/master/explained-structure.html).
  * Basically, Classless themes support 2 kinds of pages:
    * _Article_ pages
      * These are the pages in which you have, inside the `<main>` tag, an `article` tag, with a `<header>` and a `<div>` for the article body.
    * _List_ pages
      * These are the pages in which you have, inside the `<main>` tag, a `<section>` with a `<ul>` inside. Each of the `<li>` there should have a `<article>`. The structure of that `<article>` is the same as of a standalone `<article>`, but sometimes you will not want it to have a text content, only the headers, sometimes you will not want the headers to have `<img>`s and so on.
      * _List_ pages also support a `<footer>` as a child of `<main>` for pagination. The basic structure is `footer > nav > ul > li > a`, that last `<a>` affording either a `[rel="next"]` or `[rel="prev"]` for custom theme styling.
    * Or you can _mix both_ by just having a `main > section > ul` and a `main > article` along each other.
2. Let your users choose a theme [on the theme gallery](https://classless.alhur.es/themes) and include the URL given there on their page.
3. That's it.
