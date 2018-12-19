const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    this.name = name;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation, params) => {
      compilation.plugin('after-optimize-chunk-assets', (chunks, callback) => {
        chunks.forEach(chunk => {
          chunk.files.forEach(file => {
            const source = compilation.assets[file].source();
            // 更改了输出的内容
            compilation.assets[file] = new ConcatSource(`define(['require', 'module', 'exports'],function(require, module, exports) { return ${source}});`)
          })
        })
      })
    })
  }
}

module.exports = DefPlugin