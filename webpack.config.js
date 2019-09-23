const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({path: __dirname + './.env'});

const htmlPlugin = new HtmlWebPackPlugin({
  template: './client/src/index.html',
  favicon: './client/static/icons8-opened-folder-64.png'
});

module.exports = {
  entry: './client/src/index.tsx',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: [['@babel/plugin-proposal-decorators', { legacy: true }]]
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'awesome-typescript-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: [{
            loader: 'url-loader',
          options: {
              limit: 8192
          }
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [htmlPlugin, new webpack.DefinePlugin({
    'process.env': dotenv.parsed
  })],
  devServer: {
    historyApiFallback: true
  }
};