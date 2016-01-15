#!/usr/bin/env fish

set here (dirname (status -f))
set themesdir $here/../themes

cd $themesdir

echo '## Themes'
echo ''

for d in (ls -d */)
    set theme (echo $d | py -x 'x.strip("/")')
    echo "* [$theme]($theme/)"
end

echo ''
echo '![](montage.png)'
