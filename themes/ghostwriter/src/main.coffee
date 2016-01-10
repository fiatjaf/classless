bonzo = require 'bonzo'
qwery = require 'qwery'

$ = (sel) -> bonzo qwery sel

width = parseInt $('body').css('width')
filled = (parseInt $('body > header').css('width')) + \
         (parseInt $('body > nav').css('width'))

margin = (width - filled) / 2
$('body > header').css('margin-left', margin)
