#!/usr/bin/env node

const path = require('path')
const serve = require('serve')
const mkdirp = require('mkdirp')
const puppeteer = require('puppeteer')

const MOBILE = require('puppeteer/DeviceDescriptors')['iPhone 5']
const PORT = process.env.PORT || 11878

const theme = process.argv[2].replace(/[^\w\d-]/g, '')
const kind = process.argv[3].trim()
const mobile = process.argv[4]

let server = serve(process.cwd(), {
  port: PORT,
  ignore: ['node_modules']
})

mkdirp.sync('screenshots')

takeScreenshot(theme, kind, mobile)
  .catch(console.log.bind(console))
  .then(() => {
    server.stop()
    process.exit(0)
  })

async function takeScreenshot (theme, kind, mobile) {
  let url = kind === 'article'
    ? 'http://classless.alhur.es/scenarios/a-simple-post-with-a-header/'
    : 'http://classless.alhur.es/scenarios/a-list-of-posts/'

  const browser = await puppeteer.launch()

  let screenshotPath = path.join(
    'screenshots',
    kind + (mobile ? '-mobile' : '') + '.png'
  )

  const localThemeURL = `http://localhost:${PORT}/theme.css`

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
