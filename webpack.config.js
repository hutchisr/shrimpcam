const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = env => ({
  context: path.resolve(__dirname, 'src'),
  entry: [
    'babel-polyfill',
    './js/index.jsx',
    './styles/index.scss'
  ],
  devtool: 'source-map',
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
        loader: 'html-loader'
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
        })
      },
    ]
  },
  plugins: [
    new CleanPlugin('dist/', {
      verbose: true,
      root: path.resolve(__dirname),
    }),
    new ExtractTextPlugin('css/app.[chunkhash:8].css'),
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new CopyWebpackPlugin([
      { from: 'auth.php' },
      { from: 'shrimpicon/**/* '}
    ]),
    new CompressionPlugin({
      test: /(?<!\.php)$/,
      deleteOriginalAssets: true
    }),
  ]
})