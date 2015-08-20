/* eslint-env node */
/* eslint no-var:0 */
var webpack = require('webpack')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var env = process.env.NODE_ENV || 'development'
var minify = process.env.MINIFY || false

var jsPath = path.resolve('./src/js')
var cssPath = path.resolve('./src/scss')

var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
})

var sassLoader = '!sass?' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules/foundation-sites/scss')) +
  '&' +
  'includePaths[]=' +
    (path.resolve(__dirname, './node_modules'))

module.exports = {
  devtool: 'sourcemap',

  entry: {
    js: jsPath + '/app.js',
    css: cssPath + '/fittable.scss',
  },

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
    new ExtractTextPlugin(minify ? 'fittable.min.css' : 'fittable.css', {
      allChunks: true,
    }),
  ].concat(minify ? [uglifyPlugin] : []),

  module: {
    preLoaders: env === 'development' ? [
    ] : [],
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
