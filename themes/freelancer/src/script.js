var titleElement = document.createElement('div')
titleElement.innerHTML = document.querySelector('body > header h1').textContent

var target = document.querySelector('body > nav')

var list = target.querySelector('ul')

target.insertBefore(titleElement, target.firstChild)

titleElement.style.float = 'left'
titleElement.style.marginTop = getComputedStyle(list).marginTop

function squareImages () {
  var imgs = document.querySelectorAll('li img')
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
