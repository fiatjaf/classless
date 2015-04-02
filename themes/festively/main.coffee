h = document.querySelector('body > header')
if h
  img = h.querySelector('img')
  if img and img.src
    h.style.backgroundImage = "url(#{img.src})"
