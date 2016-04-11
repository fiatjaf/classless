all:
	make theme.css
	make theme.js

theme.css: src/style.styl
	stylus < src/style.styl > theme.css

theme.js: src/script.js
	cat src/imagesloaded.pkgd.min.js src/script.js > theme.js
