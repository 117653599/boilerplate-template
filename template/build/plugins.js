var path = require('path');
var webpack = require('webpack');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function (options) {

  var plugins = [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(options.env === 'production' ? options.env : 'development')
      },
      BASE_URL: JSON.stringify('https://www.easy-mock.com/mock/590c349f87cce4690fed000b/boui')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    })
  ];

  if (options.env === 'production') {
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    plugins.push(new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }));
  }

  return plugins;
}