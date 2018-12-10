const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin("compilation", (compilation) => {
      compilation.plugin("optimize-chunk-assets", (chunks, callback) => {
        chunks.forEach((chunk) => {
          chunk.files.forEach((file) =>
            compilation.assets[file] = new ConcatSource(
              "global.define(['require','module','exports'],function(require, module, exports) {\n", 
              compilation.assets[file],
              "\n})", 
            )
          )
          callback();
        })
      })
    })
  }
}

module.exports = DefPlugin