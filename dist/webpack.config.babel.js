"use strict";

var _path = _interopRequireDefault(require("path"));

var _miniCssExtractPlugin = _interopRequireDefault(require("mini-css-extract-plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const mode = process.env.NODE_ENV || 'development';
module.exports = {
  mode,
  devtool: 'source-map',
  // entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: _path.default.join(__dirname, 'dist', 'public') // publicPath: '/assets/',

  },
  devServer: {
    host: 'localhost',
    // contentBase: path.join(__dirname, 'dist', 'public'),
    publicPath: '/assets/',
    port: 8080,
    compress: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [_miniCssExtractPlugin.default.loader, 'css-loader']
    }]
  },
  plugins: [new _miniCssExtractPlugin.default()]
};