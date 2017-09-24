const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('compilation', function(compilation, params) {
      compilation.templatesPlugin('render-with-entry', function (source) {
        return new ConcatSource(`define(['require', 'module'], function(require, module) { `, source, '})')
      })
    })
  }
}

module.exports = DefPlugin