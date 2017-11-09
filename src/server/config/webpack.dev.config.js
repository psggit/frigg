const path = require('path');
const createWebpackConfig = require('./../../../webpack.common.config');
const env = process.env.NODE_ENV

const scriptsBaseDir = path.resolve(__dirname, './../../client/app/scripts')
// console.log(scriptsBaseDir);

const entryPoints = {
  login: [
    'webpack-hot-middleware/client',
    path.join(scriptsBaseDir,  'login.js')
  ]
}
module.exports = createWebpackConfig(env, entryPoints)
