const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ZopfliPlugin = require("zopfli-webpack-plugin");

module.exports = {
  plugins: [
    new UglifyJsPlugin({
      parallel: true,
      cache: true,
      sourceMap: true,
    }),
    new ZopfliPlugin({
      test: /(?<!\.php)$/,
      deleteOriginalAssets: true,
    })
  ]
};
