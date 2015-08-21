var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

var _vendors = [
  'react',
  'react-router',
  'alt',
  'classnames',
  'moment',
  'object-assign',
  'react-notification-system',
  'react-document-title',
  'nprogress',
  'react-bootstrap'
];

module.exports = {

  entry: {
    app: path.resolve(ROOT_PATH, 'app/app.js'),
    vendors: _vendors
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js'
  },

  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        include: path.resolve(ROOT_PATH, 'app'),
      }
    ],

    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: path.resolve(ROOT_PATH, 'app'),
      },
      {
        // inline base64 URLs for <=8k images
        test: /\.(png|jpg|eot|ttf|svg|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Rmail',
      template: 'template.html'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  ]

};