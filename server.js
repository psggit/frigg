const express = require('express')
const path = require('path')

const app = express()

const env = process.env.NODE_ENV

if (env === 'production') {
  app.get('*.css', (req, res, next) => {
    console.log(req.url);
    req.url += '.gz'
    res.set('Content-Encoding', 'gzip')
  })

  app.get('*.js', (req, res, next) => {
    console.log(req.url);
    const vendorUrlRegex = /vendor.*.js/
    req.url += '.gz'
    res.set('Content-Encoding', 'gzip')
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
