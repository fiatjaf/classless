#!/usr/bin/env node

const path = require('path')
const serve = require('serve')
const mkdirp = require('mkdirp')
const execSync = require('child_process').execSync
const puppeteer = require('puppeteer')

const MOBILE = require('puppeteer/DeviceDescriptors')['Nexus 5']
const PORT = process.env.PORT || 11878

let theme = process.argv[2].replace(/[^\w\d-]/g, '')
console.log('taking screenshots for ' + theme)

let server = serve(process.cwd(), {
  port: PORT,
  ignore: ['node_modules']
})

try {
  execSync(`rm -r screenshots`)
} catch (e) {
  console.log("couldn't remove screenshots from " + process.cwd())
}
mkdirp.sync('screenshots')

takeScreenshots(theme)
  .catch(console.log.bind(console))
  .then(() => {
    server.stop()
    process.exit(0)
  })

async function takeScreenshots (theme) {
  const browser = await puppeteer.launch()

  await takeScreenshot(
    browser,
    'list',
    'http://classless.alhur.es/scenarios/a-list-of-posts-with-a-header/',
    theme,
    false
  )

  await takeScreenshot(
    browser,
    'post',
    'http://classless.alhur.es/scenarios/a-simple-post-with-a-header/',
    theme,
    false
  )

  await takeScreenshot(
    browser,
    'list',
    'http://classless.alhur.es/scenarios/a-list-of-posts/',
    theme,
    true
  )

  await takeScreenshot(
    browser,
    'post',
    'http://classless.alhur.es/scenarios/a-simple-post-with-a-header/',
    theme,
    true
  )
}

async function takeScreenshot (browser, kind, url, theme, mobile) {
  console.log('  taking shot:', theme, url, mobile)

  let screenshotPath = path.join(
    'screenshots',
    theme + '-' + kind + (mobile ? '-mobile' : '') + '.png'
  )

  let localThemeURL = `http://localhost:${PORT}/theme.css`

  let page = await browser.newPage()
  if (mobile) {
    await page.emulate(MOBILE)
  }
  await page.waitFor(2000)
  await page.goto(url + '?theme=' + localThemeURL)
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

  return screenshotPath
}
