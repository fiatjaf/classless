There are multiple benefits of using Classless in your personal website or blog:

1. Since the themes don’t rely on specific features of any engine, you can migrate between blogging platforms, static site generators and CMSes without losing your theme;

2. Since the HTML template is fixed, you can just code it once and don’t bother to change it ever again. Sometimes having some constraints on the potentials of our code or markup can be liberating;

3. Since there are no classes, you don’t ever have to argue with yourself about what are the proper class names.

## How to use

Because Classless is simple, implementing it on your site is simple.

If you're using [Hugo](https://gohugo.io/) or [Hexo](https://hexo.io/), you can just download the premade templates:

* https://themes.gohugo.io/classless-hugo/

* https://github.com/fiatjaf/classless-hexo

If you can easily and completely control the HTML structure of your site, you can follow the following steps to start using Classless:

1. Write or generate HTML [with this structure](https://github.com/fiatjaf/classless/blob/master/explained-structure.html) (see [this](/for-cms-makers) for a brief explanation).

2. Choose a theme [on the theme gallery](https://classless.alhur.es/themes) and include the URL given there on a `<link ref="stylesheet" href="{url-here}">` element inside the `<head>`.

3. That's it.

If, however, you cannot easily control your website's HTML (for example, you're using a Wordpress server with a lot of files and moving parts), move to [something](https://github.com/fiatjaf/sitio) [else](https://staticsitegenerators.net/) or use a [hosted service that supports classless by default](https://sitios.xyz/)!