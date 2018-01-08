var path = require('path');
var utils = require('./uitls');

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = function (options, extractBaseCSS, extractStyleCSS) {
  return {
    module: {
      rules: [{
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: utils.cssLoaders(options, extractStyleCSS)
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            cacheDirectory: resolve('.cache/babel-loader')
          },
          include: [resolve('src')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }, {
          test: /\.css$/,
          use: extractBaseCSS.extract({
            fallback: 'style-loader',
            use: 'css-loader'
          })
        }, {
          test: /\.less$/,
          use: extractBaseCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'less-loader']
          })
        }, {
          test: /\.(scss|sass)$/,
          use: extractBaseCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
        }
      ]
    }
  };
}