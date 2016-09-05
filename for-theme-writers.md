---
title: For theme writers
layout: default
---

> So you want to write a classless theme?
> You've got the urge to write a classless theme?
> You've got the nerve to write a classless theme?
> So go ahead and write a classless theme that we can use.

_[Glenn Gould](https://www.youtube.com/watch?v=QZM4yxbE0ZE)_



You can write a theme just by writing CSS. Basically you can write anything that makes a decent-looking page when applied to a valid Classless HTML page. Most of the themes in https://github.com/websitesfortrello/classless/tree/gh-pages/themes can serve as inspiration, but since many of them are ports from themes written for other HTML structures, they may contain unnecessary complication. A simple yet nice pure-classless theme is, for example, https://github.com/websitesfortrello/classless/blob/gh-pages/themes/barbieri/src/bundle.css. As you can see, a few lines of CSS are sufficient for making a theme.

### Using CSS preprocessors

You can use anything, as long as you tell us what you're using. If you're going to write a `Makefile` (see [Contributing](#Contributing)), just specify the commands there (don't bother with automatic dependencies installation, people here can handle a bit of manual stuff).

### Using CSS frameworks

You can use CSS frameworks. The problem is that most CSS frameworks require a lot of HTML classes, but that's a workaround for that if you're using CSS preprocessors. For example, let's say you are going to use Bootstrap to make buttons prettier. If you're using [Less](http://lesscss.org/), you can do this:

```css
@import "bootstrap.less"

button {
  @btn
}
```

It's done. All `<button>` elements in the Classless website will be styled as Bootstrap styles `.btn` elements.

### Using Javascript

You can include a Javascript file along with your theme, you just have to put it there (see [Contributing](#Contributing) for where to put it if you're publishing your theme). In the normal Classless usage, the JS file are going to be included in the end of the page, after all HTML elements are in place, so you can refer to them easily in the code.

Remember that only one JS file is supported, so if you're including jQuery or something, make sure to bundle everything into a single file.

### Changing the default HTML structure

If you really need to, you can change the HTML structure from the Javascript code. There's no problem in doing this, as long as you don't change the content of the sections.

## Contributing

If you want to contribute your theme (please do!), fork the repository and add your theme under `/themes/`. The directory must contain a `./src/` folder and, if possible, a `./screenshots/` folder. Besides that, a `./LICENSE` of your choice that allows people to use the theme freely, a `./desc.md` with a short description of the theme (that will be used to generate the `README.md`), and a super-simple `./Makefile` that will take files from `./src/` and generate a `./theme.css` and, if needed, a `./theme.js` file.

If you don't understand all these requirements, but still have a theme, we will gladly accept it and do the boring stuff for you.
