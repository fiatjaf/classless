all: $(wildcard */src/*)
	fish -c 'for x in (find . -maxdepth 1 -type d ! -path "."); cd $$x; make; cd ..;end;'
	
	make readmes
	make README.md

montage.jpg: $(wildcard */screenshots)
	montage -border 7 -geometry 400x400+1+1 -tile 3x */screenshots/* montage.jpg
	mogrify montage.jpg -resize 888x

README.md: $(wildcard */desc.md montage.jpg)
	fish ../scripts/themes-readme.fish > README.md

readmes: $(wildcard */desc.md */screenshots)
	fish ../scripts/each-theme-readme.fish

screenshots: $(wildcard */src/*)
	fish -c 'for x in (find . -maxdepth 1 -type d ! -path "."); cd $$x; ../../scripts/take-screenshots.js $$x; cd ..; end;'
