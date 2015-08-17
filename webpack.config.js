/* eslint-env node */
/* eslint no-var:0 */
var webpack = require('webpack')
var path = require('path')
var env = process.env.NODE_ENV || 'development'
var minify = process.env.MINIFY || false

var jsPath = path.resolve('./src/js')

var eslintLoader = {
  test: /\.jsx?$/,
  loaders: ['eslint'],
  include: jsPath,
}

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
})

module.exports = {
  devtool: 'sourcemap',

  entry: jsPath + '/app.js',

  output: {
    filename: minify ? 'fittable.min.js' : 'fittable.js',
    path: path.resolve('./dist'),
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"' + env + '"',
      },
    }),
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
    preLoaders: env === 'development' ? [
    ] : [],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: jsPath,
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },

  resolve: {
    extensions: ['', '.jsx', '.js'],
  },

  stats: {
    colors: true,
  },

  /*eslint: {
    configFile: './.eslintrc',
  },*/
}
