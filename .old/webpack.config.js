const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = () => {
  const config = {
    mode: 'none',
    context: path.resolve(__dirname),
    entry: [
      '@babel/polyfill',
      './src/js/index.jsx',
      './src/styles/index.scss'
    ],
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss']
    },
    output: {
      path: path.resolve('dist'),
      filename: 'js/app.js',
      chunkFilename: 'js/[name].js'
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.html$/,
          loader: 'html-loader',
          options: {
            minimize: process.env.NODE_ENV === 'production'
          }
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '../'
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            'resolve-url-loader',
            'sass-loader?sourceMap',
          ],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
          },
        }
      ]
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development'
      }),
      new MiniCssExtractPlugin({
        filename: 'css/app.[chunkhash:8].css'
      }),
      new HtmlPlugin({
        template: 'src/index.html',
      }),
      new CopyPlugin([
        { from: 'auth.php' },
        { from: 'shrimpicon/**/*' }
      ], {
        context: path.resolve(__dirname, 'src')
      }),
    ],
    devServer: {
      contentBase: path.resolve('dist')
    }
  };
  return process.env.NODE_ENV === 'production' ? merge(config, require('./webpack.production')) : config;
};
