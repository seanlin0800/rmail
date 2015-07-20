var merge = require('webpack-merge');

var common = require('./webpack-common');

module.exports = merge(common, {

  devtool: 'eval',

  devServer: {
    contentBase: './build',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }

});