const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    this.name = name
  }

  apply(compiler) {
    compiler.plugin('compilation', function(compilation){
      compilation.plugin("optimize-chunk-assets", function(chunks, callback) {
        chunks.forEach(function(chunk) {
            chunk.files.forEach(function(file) {
              compilation.assets[file] = new ConcatSource(
                `
                define(['require', 'module', 'exports'],function(require, module, exports) {
                  return ${compilation.assets[file].source()}
                })
                `
              )
            });
        });
        callback();
      });
    })
  }
}

module.exports = DefPlugin