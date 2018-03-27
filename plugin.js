const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.templatesPlugin('render-with-entry', (source, chunk, hash) => {
        return new ConcatSource(`global.define(['require','module','exports'],function(require,module,exports){
          ${source.source()}
        })`)
      })
    })
  }
}

module.exports = DefPlugin