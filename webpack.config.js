const path = require('path');
const createWebpackConfig = require('./webpack.common.config');
const env = process.env.NODE_ENV

const scriptsBaseDir = path.resolve(__dirname, './src/client/app/scripts')

const entryPoints = {
  login: path.join(scriptsBaseDir,  'login.js')
}
module.exports = createWebpackConfig(env, entryPoints)
