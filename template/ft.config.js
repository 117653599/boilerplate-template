'use strict';
var path = require('path');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var baseConfig = require('./build/webpack.conf');
var plugins = require('./build/plugins');

exports.mode = 'single';

exports.servers = require('./build/servers.conf');

function resolve(dir) {
  return path.join(__dirname, dir)
}
/** 如果需要严格执行的话，需要做配置
exports.lint = require('./build/lint.conf');
*/

/**
 exports.entryExtNames = {
  css: ['.css', '.scss', '.sass', '.less'],
  js: ['.js', '.jsx', '.vue']
};
 */
function getExtractFilename(env, name) {
  var filename = name + '@[contenthash].css';
  if (env === 'development') {
    filename = name + '@dev.css';
  } else if(env === 'location'){
    filename = name + '.css';
  }
  return filename;
}

exports.config = function () {
  return {
    webpackConfig: function webpackConfig(config, options) {
      config.resolve.alias = {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src')
      };
      var extractBaseCSS = new ExtractTextPlugin({
        filename: getExtractFilename(options.env, 'base')
      });
      var extractStyleCSS = new ExtractTextPlugin({
        filename: getExtractFilename(options.env, 'style')
      });
      config = merge(config, baseConfig(options, extractBaseCSS, extractStyleCSS));
      config.plugins = config.plugins.concat(plugins(options)).concat([extractBaseCSS, extractStyleCSS]);
      return config;
    },
    exports: [
      'main.js'
    ]
  };
};