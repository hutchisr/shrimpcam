const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

module.exports = () => {
  const config = {
    context: path.resolve(__dirname),
    entry: [
      'babel-polyfill',
      './src/js/index.jsx',
      './src/styles/index.scss'
    ],
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'eval-source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.css', '.scss']
    },
    output: {
      path: path.resolve('dist'),
      filename: 'js/app.[chunkhash:8].js'
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
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true,
                  minimize: process.env.NODE_ENV === 'production'
                }
              }, 
              'resolve-url-loader',
              'sass-loader?sourceMap',
            ],
            // Since we output to css/
            publicPath: '../'
          })
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
      new CleanPlugin('dist/', {
        verbose: true,
        root: path.resolve(__dirname),
      }),
      new ExtractTextPlugin('css/app.[chunkhash:8].css'),
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
}
