const express = require('express')

const router = express.Router()

function views() {
  router.get('/', (req, res) => {
    res.render('index.html')
  })
  router.get('/login', (req, res) => {
    res.render('login.html')
  })

  router.get('/home', (req, res) => {
    res.render('home.html')
  })

  return router
}

module.exports = views
