const path = require('path');

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
        test: /\.js$/,
        loader: "babel-loader", //make sure u look at PLURAL loader and loaders
        query: {
          presets: ["es2015", "react"]
        },
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ],
  },
};
