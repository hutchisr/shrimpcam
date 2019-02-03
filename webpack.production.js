const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const zopfli = require('@gfx/zopfli');

module.exports = {
  plugins: [
    new CleanPlugin('dist/', {
      verbose: true,
      root: path.resolve(__dirname),
    }),
    new UglifyJsPlugin({
      parallel: true,
      cache: true,
      sourceMap: true,
    }),
    new CompressionPlugin({
      test: /(?<!\.php)$/,
      cache: true,
      deleteOriginalAssets: true,
      compressionOptions: {
        numiterations: 15
      },
      algorithm(input, compressionOptions, callback) {
        return zopfli.gzip(input, compressionOptions, callback);
      }
    })
  ]
};
