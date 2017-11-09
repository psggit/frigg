// Module dependancies
const chalk = require("chalk")
const webpack = require("webpack")
const config = require('../config')

function setupHotloading(app) {
  // console notify process status
  console.log(chalk.blue("Setting up hot reload..."));

  var webpackConfig = config.getWebpackDevConfig();
  var compiler = webpack(webpackConfig);

  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }));

  app.use(require("webpack-hot-middleware")(compiler));
}

module.exports = setupHotloading;
