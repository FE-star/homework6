const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      var source = new ConcatSource;
      source.add(compilation.assets['./bundle.js']._source)
      source.add("global.define(['module'], function() {")
      source.add("arguments[0].exports = module.exports")
      source.add("})")
      compilation.assets['./bundle.js']._source = source;
      callback();
    })
  }
}

module.exports = DefPlugin