var mammoth = require('mammoth')
const fs = require('fs')
const path = require('path')
const docxInput = '../Standards/2020_SC_SS/2020_SC_SS.docx'
const htmlOutput = 'Standards/2020_SC_SS/2020_SC_SC.html'

// TODO: Programmatically find and convert all .docx files in the Standards folder

mammoth
  .convertToHtml({ path: path.join(__dirname, docxInput) })
  .then(function (result) {
    var html = result.value // The generated HTML
    var messages = result.messages // Any messages, such as warnings during conversion
    fs.writeFile(htmlOutput, html, (e) => {
      e && console.error(e)
      console.log('Written!')
    })
  })
  .done()
