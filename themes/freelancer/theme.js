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
    if (img.offsetWidth > img.offsetHeight) {
      img.style.width = img.offsetHeight + 'px'
    } else {
      img.style.height = img.offsetWidth + 'px'
    }
  }
}
squareImages()
window.addEventListener('resize', squareImages)

/* hide top header on article pages */
if (location.pathname.length > 1) {
  var target = document.querySelector('body > header')
  target.parentNode.removeChild(target)
}

