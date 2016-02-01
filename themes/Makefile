all:
	cd base-3-column; make
	cd wardrobe; make; cp theme.css ../wardrobe.css
	cd ghostwriter; make; cp theme.css ../ghostwriter.css; cp theme.js ../ghostwriter.js
	cd festively; make; cp theme.css ../festively.css; cp theme.js ../festively.js
	cd dbyll; make; cp theme.css ../dbyll.css
	cd jeen; make; cp theme.css ../jeen.css
	cd lebo; make; cp theme.css ../lebo.css
	cd tacit; make; cp theme.css ../tacit.css
	cd barbieri; make; cp theme.css ../barbieri.css
	cd aluod; make; cp theme.css ../aluod.css; cp theme.js ../aluod.js
	cd longform; make
	cd cyprio; make
	cd subtle; make
	cd freelancer; make
	
	make README.md
	make readmes

montage.png: */screenshots/*
	montage -border 7 -geometry 400x400+1+1 -tile 3x */screenshots/* montage.png

README.md: */desc.md montage.png
	fish ../scripts/themes-readme.fish > README.md

readmes: */desc.md */screenshots/*
	fish ../scripts/each-theme-readme.fish
