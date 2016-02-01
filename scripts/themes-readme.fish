#!/usr/bin/env fish

set here (dirname (status -f))
set themesdir $here/../themes

cd $themesdir

echo '## Themes'
echo ''

for d in (ls -d */)
    set theme (echo $d | py -x 'x.strip("/")')
    set desc (cat $d"desc.md" | head -n 1)
    echo "* [$theme]($theme/) - $desc"
end

echo ''
echo '![](montage.jpg)'
