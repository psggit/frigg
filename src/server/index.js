const express = require('express')
const chalk = require('chalk')
const middleWare = require('./middleware')
const HipbarServer = require('./hipbar-server')

function init() {
  const hipbarApp = express()
  console.log(chalk.blue('Hipbar server initialised...'))

  middleWare(hipbarApp)

  hipbarApp.use((req, res, next) => {
    console.log(chalk.dim('%s %s'), req.method, req.url)
    next()
  })
  return new HipbarServer(hipbarApp)
}

module.exports = init
