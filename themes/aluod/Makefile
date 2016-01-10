all:
	make theme.css
	make theme.js

theme.css: src/style.less
	lessc src/style.less theme.css

theme.js: src/main.coffee
	browserify -t coffeeify src/main.coffee > theme.js

