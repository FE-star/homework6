// https://github.com/webpack/webpack/blob/master/lib/AmdMainTemplatePlugin.js
const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    // this.name = name
  }

  apply(compiler) {

    compiler.plugin('compilation', function (compilation) {
    
      compilation.templatesPlugin("render-with-entry", (source, chunk, hash) => {
        return new ConcatSource("define(['module', 'exports'], function(module, exports) { return ", source, "});")
      })

    })
    
  }
}

module.exports = DefPlugin
