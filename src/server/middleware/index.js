const path = require('path')
const express = require('express')
const swig = require('swig')
const chalk = require('chalk')
const routes = require('./../routes')
const setupHotReloading = require('./hot-reload')

function setupMiddleWare(app) {
  console.log(chalk.blue('Setting up middleWare...'))

  const env = process.env.NODE_ENV

  app.engine("html", swig.renderFile);
  // app.use(express.static(path.join(__dirname, '../../client/app/views')))
  app.set("views", path.resolve(__dirname, "../../client/app/views"));


  routes(app)
  if (env === 'development') {
    setupHotReloading(app)
  }

  if (env === 'production') {
    app.get('*.js', (req, res, next) => {
      req.url += '.gz'
      res.set('Content-Encoding', 'gzip')
      next()
    })
  }

  app.use((req, res, next) => {
    res.status(404)

    // if (req.accepts('html')) {
    //   res.render('static/404.html', { url: req.url })
    //   return
    // }

    if (req.accepts('json')) {
      res.send({ error: 'Not found' })
      return
    }

    res.type('text').send('Not found')
    next()
  })
}

module.exports = setupMiddleWare
