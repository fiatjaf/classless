imagesLoaded = require 'imagesloaded'
Masonry = require 'masonry-layout'

containers = document.querySelectorAll('main > section')
for container in containers
  ul = container.querySelector('ul')
  if ul and ul.querySelector('li article')
    container.style['max-width'] = '100%'
    container.style['width'] = '100%'
    M = new Masonry ul,
      itemSelector: 'li'
    M.bindResize()
    window.M = M
