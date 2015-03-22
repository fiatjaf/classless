all:
	make wardrobe.theme
	make ghostwriter.theme

wardrobe.theme: wardrobe/5-basics.css wardrobe/6-style.css
	cat wardrobe/*.css > wardrobe.css

ghostwriter.theme: ghostwriter/3-style.css ghostwriter/main.coffee
	cat ghostwriter/*.css > ghostwriter.css
	browserify -t coffeeify ghostwriter/main.coffee > ghostwriter.js
