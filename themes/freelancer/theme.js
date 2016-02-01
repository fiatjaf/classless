var titleElement = document.createElement('div')
titleElement.innerHTML = document.querySelector('body > header h1').textContent

var target = document.querySelector('body > nav')

var list = target.querySelector('ul')

target.insertBefore(titleElement, target.firstChild)

titleElement.style.float = 'left'
titleElement.style.marginTop = getComputedStyle(list).marginTop
