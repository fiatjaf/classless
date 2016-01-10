all:
	make theme.css
	make theme.js

theme.css: src/3-style.css
	cat src/*.css > theme.css

theme.js: src/main.coffee
	browserify -t coffeeify src/main.coffee > theme.js
