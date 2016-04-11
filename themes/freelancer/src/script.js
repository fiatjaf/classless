/* global getComputedStyle, location, imagesLoaded */

/* the site title at the top bar */
var titleElement = document.createElement('a')
var siteTitle = document.querySelector('body > header h1')
titleElement.innerHTML = siteTitle.textContent

var target = document.querySelector('body > nav')
var list = target.querySelector('ul')
target.insertBefore(titleElement, target.firstChild)

var a = siteTitle.querySelector('a')
titleElement.href = a ? a.href : '/'
titleElement.style.display = 'block'
titleElement.style.float = 'left'
titleElement.style.marginTop = getComputedStyle(list).marginTop

/* square images */
function squareImages () {
  var imgs = document.querySelectorAll('section li img, body > header img')
  for (var i = 0; i < imgs.length; i++) {
    var img = imgs[i]

    // cleanup
    img.style.width = ''
    img.style.height = ''

    if (img.offsetWidth > img.offsetHeight) {
      img.style.width = img.offsetHeight + 'px'
    } else {
      img.style.height = img.offsetWidth + 'px'
    }
  }
}
imagesLoaded('section li img, body > header img', squareImages)
window.addEventListener('resize', squareImages)

/* hide top header on article pages */
var t
if (location.pathname.length > 1) {
  t = document.querySelector('body > header')
  t.parentNode.removeChild(t)
}

