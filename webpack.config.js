/* eslint-env node */
/* eslint no-var:0 */
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var jsPath = path.resolve('./src/js')
var cssPath = path.resolve('./src/scss')

var sassLoader = '!sass?' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules/foundation-sites/scss')) +
  '&' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules'))

module.exports = {
  entry: {
    js: jsPath + '/app.js',
    css: cssPath + '/fittable.scss',
  },

  output: {
    filename: 'fittable.js',
    path: path.resolve('./dist'),
  },

  plugins: [
    new ExtractTextPlugin('fittable.css', {
      allChunks: true,
    }),
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: jsPath,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!autoprefixer' + sassLoader + ''),
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file',
      },
    ],
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
  },

  stats: {
    colors: true,
  },

  devServer: {
    contentBase: './dist',
    hot: true,
    // inline: true,
  },
}
