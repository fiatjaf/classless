all:
	cd wardrobe; make;
	cd ghostwriter; make;
	cd festively; make;
	cd dbyll; make;
	cd jeen; make;
	cd lebo; make;
	cd tacit; make;
	cd barbieri; make;
	cd aluod; make;
	cd longform; make
	cd cyprio; make
	cd subtle; make
	cd freelancer; make
	cd plain; make
	cd creative-portfolio; make
	cd zen; make
	
	make README.md
	make readmes

montage.jpg: */screenshots/*
	montage -border 7 -geometry 400x400+1+1 -tile 3x */screenshots/* montage.jpg
	mogrify montage.jpg -resize 888x

README.md: */desc.md montage.jpg
	fish ../scripts/themes-readme.fish > README.md

readmes: */desc.md */screenshots/*
	fish ../scripts/each-theme-readme.fish
