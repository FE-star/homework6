const ConcatSource = require('webpack-sources').ConcatSource,
      path = require('path')

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('emit',(compilation, callback)=>{
      let filename = compilation.outputOptions.filename,
          assets = compilation.assets,
          src = assets[filename].source(),
          output = `global.define([
            'require',
            'module',
            'exports'
          ], function(require, module, exports) {
            ${src}
          })`
      assets[filename]._source = new ConcatSource(output)
      assets[filename]._cachedSource = undefined
      assets[filename].source()
      callback()
    })
  }
}

module.exports = DefPlugin