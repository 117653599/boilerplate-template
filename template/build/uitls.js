
exports.cssLoaders = function (options, extractInstance) {

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.env === 'production'
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {})
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.env === 'production') {
      return extractInstance.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return extractInstance.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
      // return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}