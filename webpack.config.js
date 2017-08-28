const path = require('path');
const webpack = require('webpack')

module.exports = {
  // context: path.join(__dirname, 'src'),
  entry: [
    './src/main.js',
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: "babel-loader", //make sure u look at PLURAL loader and loaders
        query: {
          presets: ["es2015", "react"]
        },
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
};