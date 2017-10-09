const ConcatSource = require('webpack-sources').ConcatSource,
      path = require('path')

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('emit',(compilation, callback)=>{
      let filename = compilation.outputOptions.filename,
          assets = compilation.assets,
          output = `global.define(['require','module','exports'], function(require, module, exports) {
            ${assets[filename]._source.source()}
          })`
      assets[filename]._source = new ConcatSource(output)
      callback()
    })
  }
}

module.exports = DefPlugin