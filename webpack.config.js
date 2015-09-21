/* eslint-env node */
/* eslint no-var:0 */
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var srcPath = path.resolve('./src')

var NODE_ENV = process.env.NODE_ENV || 'development'

var definePlugin = new webpack.DefinePlugin({
  // Remember this will get replaced with literal contents of string, so we need extra quotes
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  '__DEV__': NODE_ENV !== 'production',
})

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
    definePlugin,
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
    alias: {
      'react': path.join(__dirname, 'node_modules', 'react'),
    },
    extensions: ['', '.jsx', '.js'],
  },

  stats: {
    colors: true,
  },

}
