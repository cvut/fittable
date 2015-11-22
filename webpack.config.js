/* eslint-env node */
/* eslint no-var:0 */
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
require('dotenv').load()

var srcPath = path.resolve('./src')

var NODE_ENV = process.env.NODE_ENV || 'development'

var definePlugin = new webpack.DefinePlugin({
  // Remember this will get replaced with literal contents of string, so we need extra quotes
  'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  'process.env.FITTABLE_SOURCE': JSON.stringify(process.env.FITTABLE_SOURCE || 'faux'),
  '__DEV__': NODE_ENV !== 'production',
})

var sassLoader = '!sass?' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules/foundation-sites/scss')) +
  '&' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules'))

// webpack-dev-server extension
var ENV_COOKIES = {
  /* eslint camelcase:0 */
  oauth_access_token: process.env.OAUTH_ACCESS_TOKEN,
  oauth_username: process.env.OAUTH_USERNAME,
}

function setCookiesMiddleware (req, res, next) {
  for (var name in ENV_COOKIES) {
    var value = ENV_COOKIES[name]
    res.cookie(name, value, {httpOnly: false})
  }
  next()
}

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

  devServer: {
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    contentBase: 'dist/',
    setup: function (app) {
      app.use(setCookiesMiddleware)
    },
  },

}
