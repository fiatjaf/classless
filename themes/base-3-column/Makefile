all:
	make theme.css

theme.css: src/3-column.css src/elements.css
	cp src/3-column.css src/3-column.scss
	cp src/3-column.css src/3-column.less
	cp src/elements.css src/elements.scss
	cp src/elements.css src/elements.less
	cat src/3-column.css src/elements.css > theme.css
