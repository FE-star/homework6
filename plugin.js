const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('emit', function (compilation, callback) {

      const assets = compilation.assets
      const keys = Object.keys(assets)
      keys.forEach(key => {
        let source = assets[key].source()
        assets[key] = new ConcatSource('global.define([\'require\', \'module\', \'exports\'], ( require, module, exports) => {', source, '})')
      })

      callback()
    });
  }
}

module.exports = DefPlugin