var merge = require('webpack-merge');
var path = require('path');

var common = require('./webpack-common');

var ROOT_PATH = path.resolve(__dirname);
var modulesPath = path.resolve(ROOT_PATH, 'node_modules');

var libs = [
  'react/lib;react/lib',
  'react-router;react-router/umd/ReactRouter.min.js',
  'react-bootstrap;react-bootstrap/dist/react-bootstrap.min.js',
  'react;react/dist/react.min.js',
  'alt/mixins;alt/mixins',
  'alt/utils;alt/utils',
  'alt;alt/dist/alt.min.js',
  'moment;moment/min/moment.min.js'
];

function getAliases(aliases) {
  libs.forEach(function(lib) {
    var parts = lib.split(';');
    var l = parts.length - 1;
    var libPath = path.resolve(modulesPath, parts[l]);

    while (l--) {
      aliases[parts[l]] = libPath;
    }
  });
  return aliases;
}

function getNoParse(excluded) {
  libs.forEach(function(lib) {
    var parts = lib.split(';');
    var libPath = path.resolve(modulesPath, parts[parts.length - 1]);

    if (libPath.slice(-3) === '.js') {
      excluded.push(libPath);
    }
  });
  return excluded;
}

module.exports = merge(common, {

  resolve: {
    alias: getAliases({})
  },

  devtool: 'eval',

  devServer: {
    contentBase: './build',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: path.resolve(modulesPath, 'react-bootstrap/dist/react-bootstrap.min.js'),
        loader: 'imports?React=react'
      },
      {
        test: path.resolve(modulesPath, 'react-router/umd/ReactRouter.min.js'),
        loader: 'imports?React=react'
      },
    ],

    noParse: getNoParse([])
  }

});