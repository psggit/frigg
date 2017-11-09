const webpackDevConfig = require('./webpack.dev.config')

const env = process.env.NODE_ENV
const SERVER_PORT = env === 'development' ? 8001 : 9002

function ConfigManager() {
  return {
    server: {
      port: SERVER_PORT
    },
    getWebpackDevConfig() {
      return webpackDevConfig
    }
  }
}

// ConfigManager.prototype.getWebpackDevConfig = function getWebpackDevConfig() {
//   return webpackDevConfig
// }

module.exports = ConfigManager()
