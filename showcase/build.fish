#!/usr/bin/fish

for theme in (ls screenshots/*-1* | sed -e 's/[^\/]\+\///' | sed -e 's/-.*//')
    mkdir $theme -p
    set notblank (echo $theme | py -x 'json.dumps(x != "blank")')
    set jsfile (ls $theme/js 2>/dev/null > /dev/null; and ls $theme/js | wc -l)
    set js (echo $jsfile | py -x 'json.dumps(bool(x))')
    set screenshots (ls screenshots/$theme* | py -l 'json.dumps(l)')
    echo '{"name": "'$theme'", "screenshots": '$screenshots', "desc": "'(cat $theme/desc.txt)'", "js": '$js', "notblank": '$notblank'}' | mustang -t pages.mustache.html -o $theme/index.html -f json
end
