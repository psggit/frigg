const path = require('path')
const webpack = require('webpack')

const loaders = [
  {
    test: /\.js$/,
    loader: 'babel-loader',
    exclude: /node_modules/
  },
  {
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.jpe?g$|\.gif$|\.png$|\.otf$/i,
    loader: 'url-loader?limit=10000'
  }
]

const devLoaders = loaders.concat([
  {
    test: /\.scss$/,
    loader: 'style!css!sass',
    exclude: /node_modules/
  }
])

// let productionLoaders = loaders.concat([
//   {
//     test: ''
//   }
// ])

const plugins = [
  new webpack.BannerPlugin('Copyright 2017 Hipbar Pvt. Ltd.')
]

const productionPlugins = plugins.concat([
  new webpack.optimize.UglifyJsPlugin()
])


/**
 * @name createWebpackConfig
 * @param {string} ENV - runtime environment
 * @param {Object} entryPoints - entry points fow webpack build
 */


function createWebpackConfig(ENV, entryPoints) {
  // webpack plugins and loaders based on runtime environment
  let _loaders
  let _plugins
  switch (ENV) {
    case 'development':
      _plugins = plugins
      _loaders = devLoaders
      break

    case 'hearsay':
      _plugins = plugins
      _loaders = productionLoaders

    case 'production':
      _plugins = productionPlugins
      _loaders = loaders

    default:
      _plugins = productionPlugins
  }

  return {
    entry: entryPoints,

    output: {
      path: path.resolve(__dirname, './src/client/build'),
      filename: '[name].build.js',
      publicPath: '/cdn/'
    },

    module: {
      loaders: _loaders
    },

    plugins: _plugins
  }
}

module.exports = createWebpackConfig