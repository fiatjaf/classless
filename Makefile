all: _site themes/README.md

themes/README.md: $(shell find themes/*/README.md)
	fish tasks/themes-readme.fish > themes/README.md

_site: $(shell find *.md *.js themes/*/screenshots/*)
	npm run generate

$(shell find themes/*/README.md): themes/%/README.md: themes/%/desc.md themes/%/screenshots/article.png themes/%/screenshots/article-mobile.png themes/%/screenshots/list.png themes/%/screenshots/list-mobile.png
	cd themes/$*; \
      echo '## $*' > README.md; \
      echo '' >> README.md; \
      cat desc.md >> README.md; \
      echo -e '\n---\n' >> README.md; \
      echo '![](screenshots/list.png)' >> README.md; \
      echo '![](screenshots/article.png)' >> README.md; \
      echo '![](screenshots/list-mobile.png)' >> README.md; \
      echo '![](screenshots/article-mobile.png)' >> README.md;

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/article.png): themes/%/screenshots/article.png: themes/%/theme.css
	cd themes/$*; ../../tasks/take-screenshot.js $* article

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/article-mobile.png): themes/%/screenshots/article-mobile.png: themes/%/theme.css
	cd themes/$*; ../../tasks/take-screenshot.js $* article mobile

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/list.png): themes/%/screenshots/list.png: themes/%/theme.css
	cd themes/$*; ../../tasks/take-screenshot.js $* list

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/list-mobile.png): themes/%/screenshots/list-mobile.png: themes/%/theme.css
	cd themes/$*; ../../tasks/take-screenshot.js $* list mobile

.SECONDEXPANSION:
$(shell find themes/*/theme.css): themes/%/theme.css: $$(wildcard themes/$$**/src/*)
	cd themes/$*; make
