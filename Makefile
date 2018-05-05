all: _site themes/README.md

themes/README.md: $(shell find themes/*/desc.md)
	cd themes; \
      echo '## Themes' > README.md; \
      echo '' >> README.md; \
      fish -c 'for theme in (ls -d */); set desc (cat $$theme/desc.md | head -n 1); echo "* [$$theme]($$theme/) - $$desc" >> README.md; end;'

_site: $(shell find *.md *.js themes/*/screenshots/* scenarios/*)
	godotenv sitio generate.js --body=body.js

deploy: _site
	netlify deploy -s classless -p _site

$(shell find themes/*/README.md): themes/%/README.md: themes/%/desc.md themes/%/screenshots/article.png themes/%/screenshots/article-mobile.png themes/%/screenshots/list.png themes/%/screenshots/list-mobile.png
	cd themes/$*; \
      echo '## $*' > themes/$*/README.md; \
      echo '' >> themes/$*/README.md; \
      cat desc.md >> themes/$*/README.md; \
      echo -e '\n---\n' >> themes/$*/README.md; \
      echo '![](screenshots/list.png)' >> themes/$*/README.md; \
      echo '![](screenshots/article.png)' >> themes/$*/README.md; \
      echo '![](screenshots/list-mobile.png)' >> themes/$*/README.md; \
      echo '![](screenshots/article-mobile.png)' >> themes/$*/README.md;

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/article.png): themes/%/screenshots/article.png: themes/%/theme.css $(wildcard scenarios/*)
	cd themes/$*; ../../tasks/take-screenshot.js $* article

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/article-mobile.png): themes/%/screenshots/article-mobile.png: themes/%/theme.css $(wildcard scenarios/*)
	cd themes/$*; ../../tasks/take-screenshot.js $* article mobile

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/list.png): themes/%/screenshots/list.png: themes/%/theme.css $(wildcard scenarios/*)
	cd themes/$*; ../../tasks/take-screenshot.js $* list

$(shell find themes/*/screenshots -type d | xargs -I {} echo {}/list-mobile.png): themes/%/screenshots/list-mobile.png: themes/%/theme.css $(wildcard scenarios/*)
	cd themes/$*; ../../tasks/take-screenshot.js $* list mobile

.SECONDEXPANSION:
$(shell find themes/*/theme.css): themes/%/theme.css: $$(wildcard themes/$$**/src/*)
	cd themes/$*; make
