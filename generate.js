const fs = require('fs')
const path = require('path')
const {init, end, generatePage, copyStatic} = require('sitio')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})

init({
  themes: [
    'cyprio',
    'jeen',
    'lebo',
    'tacit',
    'barbieri',
    'wardrobe'
  ],
  livereload_host: process.env.LIVERELOAD_HOST
})

generatePage('/', 'sitio/component-utils/article.js', {
  html: md.render(fs.readFileSync('introduction.md', 'utf-8')),
  data: {
    name: 'Introduction'
  }
})

generatePage('/for-cms-makers', 'sitio/component-utils/article.js', {
  html: md.render(fs.readFileSync('for-cms-makers.md', 'utf-8')),
  data: {
    name: 'For CMS makers'
  }
})

generatePage('/for-personal-websites', 'sitio/component-utils/article.js', {
  html: md.render(fs.readFileSync('for-personal-websites.md', 'utf-8')),
  data: {
    name: 'For personal websites'
  }
})

generatePage('/for-theme-writers', 'sitio/component-utils/article.js', {
  html: md.render(fs.readFileSync('for-theme-writers.md', 'utf-8')),
  data: {
    name: 'For theme writers'
  }
})

let scenarios = fs.readdirSync('scenarios')
  .map(filename => ({
    name: filename.split('.')[0],
    html: fs.readFileSync(path.join('scenarios', filename), 'utf-8')
  }))

generatePage('/scenarios', 'scenarios.js', {
  scenarioList: scenarios.map(scn => scn.name)
})

scenarios.forEach(scn => {
  generatePage('/scenarios/' + scn.name, 'scenarios.js', {
    chosen: scn,
    scenarioList: scenarios.map(scn => scn.name)
  })
})

copyStatic([
  '*.css',
  'CNAME'
])

end()
