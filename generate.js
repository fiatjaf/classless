const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')
const gh = require('gh-got')
const puppeteer = require('puppeteer')
const md5 = require('md5')
const md5dir = require('md5dir-sync')
const {init, end, generatePage, copyStatic} = require('sitio')
const md = require('markdown-it')({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true
})

const MOBILE = require('puppeteer/DeviceDescriptors')['Nexus 5']

const themes = [
  'cyprio',
  'jeen',
  'lebo',
  'tacit',
  'barbieri',
  'wardrobe',
  'zen',
  'creative-portfolio',
  'dbyll'
]

init({
  themes,
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
  .filter(({name}) => name)

generatePage('/scenarios', 'scenarios.js', {
  scenarioList: scenarios.map(scn => scn.name)
})

scenarios.forEach(scn => {
  generatePage('/scenarios/' + scn.name, 'scenarios.js', {
    chosen: scn,
    scenarioList: scenarios.map(scn => scn.name)
  })
})

async function takeScreenshots () {
  var screenshots = {}
  const browser = await puppeteer.launch()

  for (let i = 0; i < themes.length; i++) {
    let theme = themes[i]
    mkdirp.sync('static')
    screenshots[theme] = []

    const hash = md5dir(path.join('themes', theme))

    screenshots[theme].push(
      await takeScreenshot(browser, 'http://classless.alhur.es/scenarios/a-list-of-posts-with-a-header/', theme, false, hash)
    )
    screenshots[theme].push(
      await takeScreenshot(browser, 'http://classless.alhur.es/scenarios/a-simple-post-with-a-header/', theme, false, hash)
    )
    screenshots[theme].push(
      await takeScreenshot(browser, 'http://classless.alhur.es/scenarios/a-list-of-posts/', theme, true, hash)
    )
    screenshots[theme].push(
      await takeScreenshot(browser, 'http://classless.alhur.es/scenarios/a-simple-post-with-a-header/', theme, true, hash)
    )
  }

  return screenshots
}

async function takeScreenshot (browser, url, theme, mobile, hash) {
  console.log(theme, url, mobile)

  let screenshotPath = path.join(
    'static',
    theme + '-' + hash + '-' + md5(url).slice(0, 5) + (mobile ? '-mobile' : '') + '.png'
  )

  try {
    fs.accessSync(screenshotPath)
  } catch (e) {
    let page = await browser.newPage()
    if (mobile) {
      await page.emulate(MOBILE)
    }
    await page.goto(url + '?theme=' + theme)
    await page.waitForSelector('#theme-chooser')
    await page.waitFor(2000)
    await page.evaluate(() => {
      Array.from(document.querySelectorAll('body > *'))
        .filter(el =>
          el.tagName !== 'MAIN' && el.tagName !== 'HEADER' &&
          el.tagName !== 'NAV' && el.tagName !== 'ASIDE' &&
          el.tagName !== 'FOOTER'
        )
        .forEach(el => {
          document.body.removeChild(el)
        })
    })

    await page.screenshot({
      path: screenshotPath
    })
  }

  return screenshotPath
}

async function themeURL (theme) {
  let {body} = await gh('https://api.github.com/repos/fiatjaf/classless/commits')
  let sha = body[0].sha.slice(0, 8)
  return `https://cdn.rawgit.com/fiatjaf/classless/${sha}/themes/${theme}/theme.css`
}

async function buildThemesPages (screenshots) {
  generatePage('/themes', 'sitio/component-utils/list.js', {
    root: '/',
    basepath: '/themes',
    items: Object.keys(screenshots)
      .map(theme => ({
        path: path.join('themes', theme),
        name: theme,
        cover: screenshots[theme][0]
      })),
    page: 1
  })

  for (let theme in screenshots) {
    let screenshotPaths = screenshots[theme]
    var html = md.render(
      fs.readFileSync(path.join('themes', theme, 'desc.md'), 'utf-8')
    )

    let url = await themeURL(theme)
    html += `<br><p>Include URL: <div style="display:inline-block"><code>${url}</code></div></p>`

    html += `<br><div style="display: flex; flex-wrap: wrap;">${screenshotPaths
      .map(p => p.indexOf('mobile') === -1
        ? `
<a href="/${p}">
  <img src="/${p}" style="border: 3px;">
</a>
        `
        : `
<div class="marvel-device nexus5" style="margin: 9px 7px;">
  <div class="top-bar"></div>
  <div class="sleep"></div>
  <div class="volume"></div>
  <div class="camera"></div>
  <div class="screen">
    <img src="/${p}" style="width: 100%; margin: 0; padding: 0; border: 0;">
  </div>
</div>
        `
      )
      .join('')
    }</div>`

    generatePage('/themes/' + theme, 'sitio/component-utils/article.js', {
      html,
      data: {
        name: theme,
        parentName: 'Themes'
      }
    })
  }
}

takeScreenshots()
  .then(buildThemesPages)
  .then(() => {
    copyStatic([
      '*.css',
      'CNAME',
      'static/*'
    ])
    end()
  })
  .catch(console.log.bind(console))
