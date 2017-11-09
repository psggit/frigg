const chalk = require('chalk')
const config = require('./config')

// console.log(config);

function HipbarServer(rootApp) {
  this.rootApp = rootApp
  this.httpServer = null
  this.config = config
}

HipbarServer.prototype.start = function start(externalApp) {
  const app = externalApp || this.rootApp
  // console.log(config);
  this.httpServer = app.listen(config.server.port)
  this.httpServer.on('error', error => console.error(error))
  this.httpServer.on('listening', () => this.logStartMessages())
}

HipbarServer.prototype.logStartMessages = function logStartMessages() {
  const env = process.env.NODE_ENV

  console.log(`${chalk.blue('Hipbar server creation...')} ${chalk.underline('Successfull')}`)
  console.log(`${'Server started in'} ${chalk.white.italic(env)} mode on port ${chalk.white.italic(config.server.port)}`)
  console.log('Press CTRL-C to shutdown\n\n')
}

module.exports = HipbarServer
