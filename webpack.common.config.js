
/**
 * This is a very basic webpack configuration.
 * You can add further loader and plugins for
 * your use case.
 */

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AbsolutePathProviderPlugin = require('abspath-webpack-plugin')

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
    loader: 'style-loader!css-loader!sass-loader',
    exclude: /node_modules/
  }
])

let productionLoaders = loaders.concat([
  // {
  //   test: /\.css$/,
  //   use: ExtractTextPlugin.extract("style-loader", "css-loader"),
  //   loader:
  //   exclude: /node_modules/
  // },
  {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: ['css-loader', 'sass-loader']
    }),
    exclude: /node_modules/
  }
])

const plugins = [
  /**
   * # DefinePlugin
   * Set ENV for compilation process
   */
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),
  new webpack.BannerPlugin('Copyright 2017 Hipbar Pvt. Ltd.'),
  new ExtractTextPlugin("[name].build.css"),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react' // Specify the common bundle's name.
  }),
  new AbsolutePathProviderPlugin(/^@sass/, path.resolve('./src/client/app/sass')),
  new AbsolutePathProviderPlugin(/^@utils/, path.resolve('./src/client/app/utils'))
]

const devPlugins = plugins.concat([
  new webpack.HotModuleReplacementPlugin()
])

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
      _plugins = devPlugins
      _loaders = devLoaders
      break

    case 'hearsay':
      _plugins = plugins
      _loaders = productionLoaders
      break

    case 'production':
      _plugins = productionPlugins
      _loaders = productionLoaders
      break

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
