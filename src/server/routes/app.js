const views = require('./views')
const assets = require('./assets')

function App(app) {
  app.use(views())
  assets(app)
}

module.exports = App
