const views = require('./views')

function App(app) {
  app.use(views())
}

module.exports = App
