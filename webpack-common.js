var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);

module.exports = {

  entry: {
    app: path.resolve(ROOT_PATH, 'app/app.js'),
    vendors: ['react', 'react-router', 'alt',
              'classnames', 'moment', 'object-assign',
              'react-notification-system', 'react-document-title']
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  output: {
    path: path.resolve(ROOT_PATH, 'build'),
    filename: 'bundle.js',
    publicPath: '/rmail/build/'
  },

  module: {
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