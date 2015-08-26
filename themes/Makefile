all:
	make wardrobe.theme
	make ghostwriter.theme
	make festively.theme
	make dbyll.theme
	make jeen.theme
	make lebo.theme
	make tacit.theme

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

dbyll.theme: dbyll/4-style.css
	cat dbyll/*.css > dbyll.css

jeen.theme: jeen/style.css
	cat jeen/style.css > jeen.css

lebo.theme: lebo/2-style.css
	cat lebo/*.css > lebo.css

tacit.theme: tacit/style.scss
	scss --sourcemap=none tacit/style.scss tacit.css
