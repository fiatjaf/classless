var header = document.querySelector('body > header')
var aside = document.querySelector('body > aside')
header.appendChild(aside)

var main = document.querySelector('body > main')
var nav = document.querySelector('body > nav')
main.insertBefore(nav, main.firstChild)

main.appendChild(document.querySelector('body > footer'))
