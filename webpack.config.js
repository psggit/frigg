const path = require('path');
const createWebpackConfig = require('./webpack.common.config');
const env = process.env.NODE_ENV

const scriptsBaseDir = path.resolve(__dirname, './src/client/app')

const entryPoints = {
  test: path.join(scriptsBaseDir,  'test.js')
}
module.exports = createWebpackConfig(env, entryPoints)
