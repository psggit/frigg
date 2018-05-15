const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const AbsolutePathProviderPlugin = require('abspath-webpack-plugin')
const CompressionPlugin = require("compression-webpack-plugin")

module.exports = {
  entry: {
    app: './src/react-apps/index.js',
    vendor: ['react', 'react-dom', 'react-router', 'react-router-dom']
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: './index.html'
    }),
    new AbsolutePathProviderPlugin(/^@sass/, path.resolve('./src/sass')),
    new AbsolutePathProviderPlugin(/^@utils/, path.resolve('./src/utils')),
    new AbsolutePathProviderPlugin(/^@components/, path.resolve('./src/components')),
    new CompressionPlugin({
      test: /\.js$|\.css$|\.html$/,
      asset: "[path].gz[query]",
      exclude: /node_modules/,
      algortithm: 'gzip',
      threshhold: 10240,
      minRatio: 0.8
    })
  ],
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'

  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          chunks: 'initial',
          name: 'vendor',
          test: 'vendor',
          enforce: true
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },
    runtimeChunk: true
  }
}
