all:
	make wardrobe.theme
	make ghostwriter.theme
	make festively.theme
	make dbyll.theme
	make jeen.theme
	make lebo.theme
	make tacit.theme
	make barbieri.theme
	make longform.theme
	make templates.theme

wardrobe.theme: wardrobe/5-basics.css wardrobe/6-style.css
	cat wardrobe/*.css > wardrobe.css

ghostwriter.theme: ghostwriter/3-style.css ghostwriter/main.coffee
	cat ghostwriter/*.css > ghostwriter.css
	browserify -t coffeeify ghostwriter/main.coffee > ghostwriter.js

festively.theme: festively/4-style.css
	cat festively/*.css > festively.css
	browserify -t coffeeify festively/main.coffee > festively.js

aluod.theme: aluod/style.less
	lessc aluod/style.less aluod.css
	browserify -t coffeeify aluod/main.coffee > aluod.js

dbyll.theme: dbyll/2-style.css
	cat dbyll/*.css > dbyll.css

jeen.theme: jeen/style.css
	cat jeen/style.css > jeen.css

lebo.theme: lebo/2-style.css
	cat lebo/*.css > lebo.css

tacit.theme: tacit/style.scss
	scss --sourcemap=none tacit/style.scss tacit.css

barbieri.theme: barbieri/bundle.css
	cat barbieri/*.css > barbieri.css

longform.theme: longform/style.less
	lessc longform/style.less longform.css

templates.theme: templates/3-column.css templates/elements.css
	cp templates/3-column.css templates/3-column.scss
	cp templates/3-column.css templates/3-column.less
	cp templates/elements.css templates/elements.scss
	cp templates/elements.css templates/elements.less
	cat templates/3-column.css templates/elements.css > base-3-column.css
