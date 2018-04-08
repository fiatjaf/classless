> So you want to write a classless theme?
> You've got the urge to write a classless theme?
> You've got the nerve to write a classless theme?
> So go ahead and write a classless theme that we can use.

_[Glenn Gould](https://www.youtube.com/watch?v=QZM4yxbE0ZE)_


You can write a theme just by writing CSS. Basically you can write anything that makes a decent-looking page when applied to a valid Classless HTML page. Most of the themes in https://github.com/fiatjaf/classless/tree/master/themes can serve as inspiration, but since many of them are ports from themes written for other HTML structures, they may contain unnecessary complication.

A simple yet nice pure-classless theme is, for example, https://github.com/fiatjaf/classless/blob/master/themes/cocoa/src/style.styl. As you can see, a few lines of CSS (Stylus, in this case, for better reading) are sufficient for making a theme.

## Theme development

We provide integration with [livereload](https://www.npmjs.com/package/livereload) without you having to build a full _Classless_ development environment on your machine. To start developing do as follows:

  1. Set up a local server to host your CSS file (let's say, http://localhost/theme.css).
  2. Run [livereload](https://www.npmjs.com/package/livereload) on that directory. You'll have a URL for the server that livereload starts.
  3. Open any URL on this site, http://classless.alhur.es/scenarios/a-list-of-posts for example.
  4. Set the URL on the widget to `http://localhost/theme.css`.
  5. Click on "set livereload" and paste your livereload server URL there.

Now if you edit your CSS theme locally the changes will be automatically reflected on the website you're seeing.

## Contributing

If you want to contribute your theme (please do!), fork the repository and add your theme under `/themes/`. The directory must contain a `./src/` folder and, if possible, a `./screenshots/` folder. Besides that, a `./LICENSE` of your choice that allows people to use the theme freely, a `./desc.md` with a short description of the theme (that will be used to generate the `README.md`), and a super-simple `./Makefile` that will take files from `./src/` and generate a `./theme.css` and, if needed, a `./theme.js` file.

If you don't understand all these requirements, but still have a theme, we will gladly accept it and do the boring stuff for you.
