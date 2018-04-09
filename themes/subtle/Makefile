all: theme.css

theme.css: $(wildcard src/*.styl)
	cd src; stylus < style.styl > ../theme.css
