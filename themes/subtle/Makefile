all:
	make theme.css
	make theme.js

theme.css: src/style.less
	lessc src/style.less theme.css

theme.js: src/script.js
	cp src/script.js theme.js
