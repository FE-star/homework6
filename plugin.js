const ConcatSource = require('webpack-sources').ConcatSource
const fs = require('fs')
class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.mainTemplate.plugin('render-with-entry', function (source, chunk, hash) {
        return new ConcatSource(`global.define(['require','module','exports'],function(require, module, exports) { 
					${source.source()} 
				})`);
      })
    })
  }
}
module.exports = DefPlugin