var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry:  {
	  start: path.join(__dirname, 'src/runningDashboard'),
	  login: path.join(__dirname, 'src/pages/loginPage'), 
  },
  output: {
    path: path.join(path.dirname(__dirname), '/app/static/app'),
	  publicPath: "/static/",
    filename: '[name].js'
  },
  module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        }
      ],
    },
}