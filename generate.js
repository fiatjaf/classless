const fs = require('fs')
const path = require('path')
const {init, end, generatePage, copyStatic} = require('sitio')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})

const themes = [
  'cyprio',
  'jeen',
  'lebo',
  'barbieri',
  'wardrobe',
  'subtle',
  'zen',
  'creative-portfolio',
  'dbyll',
  'ghostwriter',
  'cocoa',
  'numa'
]

async function main () {
  await init({
    themes
  })

  await generatePage('/', 'sitio/component-utils/article.js', {
    html: md.render(fs.readFileSync('introduction.md', 'utf-8')),
    data: {
      name: 'Introduction'
    }
  })

  await generatePage('/for-cms-makers', 'sitio/component-utils/article.js', {
    html: md.render(fs.readFileSync('for-cms-makers.md', 'utf-8')),
    data: {
      name: 'For CMS makers'
    }
  })

  await generatePage('/for-personal-websites', 'sitio/component-utils/article.js', {
    html: md.render(fs.readFileSync('for-personal-websites.md', 'utf-8')),
    data: {
      name: 'For personal websites'
    }
  })

  await generatePage('/for-theme-writers', 'sitio/component-utils/article.js', {
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
    .filter(({name}) => name)

  await generatePage('/scenarios', 'scenarios.js', {
    scenarioList: scenarios.map(scn => scn.name)
  })

  scenarios.forEach(async scn => {
    await generatePage('/scenarios/' + scn.name, 'scenarios.js', {
      chosen: scn,
      scenarioList: scenarios.map(scn => scn.name)
    })
  })

  // themes pages
  var screenshots = {}
  for (let i = 0; i < themes.length; i++) {
    let theme = themes[i]
    screenshots[theme] = fs.readdirSync(path.join('themes', theme, 'screenshots'))
      .map(filename => path.join('themes', theme, 'screenshots', filename))
  }

  for (let theme in screenshots) {
    await generatePage('/themes/' + theme, 'show-theme.js', {
      theme,
      descHTML: md.render(
        fs.readFileSync(path.join('themes', theme, 'desc.md'), 'utf-8')
      ),
      screenshots: [
        screenshots[theme].filter(n => n.endsWith('article.png'))[0],
        screenshots[theme].filter(n => n.endsWith('list.png'))[0],
        screenshots[theme].filter(n => n.endsWith('article-mobile.png'))[0],
        screenshots[theme].filter(n => n.endsWith('list-mobile.png'))[0]
      ]
    })
  }

  await generatePage('/themes', 'sitio/component-utils/list.js', {
    root: '/',
    basepath: '/themes',
    items: Object.keys(screenshots)
      .map(theme => ({
        path: path.join('themes', theme),
        name: theme,
        cover: '/' + screenshots[theme].filter(n => n.endsWith('list.png'))[0]
      })),
    page: 1
  })

  await copyStatic([
    '*.css',
    'CNAME',
    'themes/*/screenshots/*'
  ])

  await end()
}

main()
