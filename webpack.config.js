/* eslint-env node */
/* eslint no-var:0 */
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var srcPath = path.resolve('./src')

var sassLoader = '!sass?' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules/foundation-sites/scss')) +
  '&' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules'))

module.exports = {
  entry: {
    js: srcPath + '/app.js',
    css: srcPath + '/stylesheets/fittable.scss',
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
        include: srcPath,
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

}
