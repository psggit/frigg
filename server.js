const express = require('express')
const path = require('path')

const app = express()

const env = process.env.NODE_ENV

if (env === 'production') {
  app.get('*.js', (req, res, next) => {
    const vendorUrlRegex = /vendor.*.js/
    console.log(req.url)
    if (vendorUrlRegex.test(req.url)) {
      res.setHeader('Cache-Control', 'private, max-age=31536000')
    }
    next()
  })
}

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})
app.listen(8080)
console.log('Server is running on port 8080')
