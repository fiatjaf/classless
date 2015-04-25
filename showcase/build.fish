#!/usr/bin/fish

for theme in (ls screenshots/*-1* | sed -e 's/[^\/]\+\///' | sed -e 's/-.*//')
    mkdir $theme -p
    set screenshots (ls screenshots/$theme* | py -l 'json.dumps(l)')
    echo '{"name": "'$theme'", "screenshots": '$screenshots'}' | mustang -t pages.mustache.html -o $theme/index.html -f json
end
