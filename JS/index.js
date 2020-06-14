const puppeteer = require('puppeteer')
const path = require('path')
const fs = require('fs')
// TODO: array of paths to standards HTMLs
const htmlPath = '../Standards/2020_SC_SS/2020_SC_SS.html'
const jsonPath = '../Json/example.json'

const browse = async (URL) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.setViewport({ width: 1290, height: 800 })
    // await page.goto(URL)
    await page.goto(`file:${path.join(__dirname, htmlPath)}`)
    // Create a JSON object representing text contents of HTML
    const json = await page.evaluate(() => {
      const traverseHTML = (el) => {
        const children = el.children
        const arr = Object.keys(children)
        if (arr.length === 0) {
          const content = el.textContent
          if (el.textContent === '') {
            return
          }
          return {
            node: content,
          }
        } else if (arr.length === 1) {
          return traverseHTML(children[0])
        }
        return {
          children: arr.map((key) => traverseHTML(children[key])),
        }
      }
      const root = document.documentElement
      return traverseHTML(root)
    })
    await browser.close()
    return json
  } catch (e) {
    console.error(e)
  }
}

const writeData = (data) => {}
browse(htmlPath).then(async (data) => {
  const jsonData = await JSON.stringify(data)
  fs.writeFile(standardsPath, jsonData, (e) => {
    e && console.log(e)
    console.log('success!')
  })
})
