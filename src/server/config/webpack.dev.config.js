const path = require('path');
const createWebpackConfig = require('./../../../webpack.common.config');
const env = process.env.NODE_ENV

const scriptsBaseDir = path.resolve(__dirname, './../../client/app')
// console.log(scriptsBaseDir);

const entryPoints = {
  test: [
    'webpack-hot-middleware/client',
    path.join(scriptsBaseDir,  'test.js')
  ]
}
module.exports = createWebpackConfig(env, entryPoints)
