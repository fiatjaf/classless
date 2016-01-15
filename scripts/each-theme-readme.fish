#!/usr/bin/env fish

set here (dirname (status -f))
set themesdir $here/../themes

cd $themesdir

for d in (ls -d */)
    set theme (echo $d | py -x 'x.strip("/")')
    cd $theme
    echo "## $theme" > README.md
    echo '' >> README.md
    cat desc.md >> README.md
    for s in (ls screenshots/*)
        echo -e '\n---\n' >> README.md
        echo "![]($s)" >> README.md
    end
    cd ..
end
