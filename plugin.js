const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor() {
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('compilation', (compilation) => {
      compilation.hooks.afterOptimizeAssets.tap('after', (assets) => {
        Object.keys(assets).map(filename => {
          assets[filename] = new ConcatSource(
            `define(["require","module","exports"],function(require,module,exports) {${assets[filename].source()}})`
          )
        })
      })
    })
  }
}

module.exports = DefPlugin