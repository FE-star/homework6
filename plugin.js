const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
	constructor(name) {
	}

	apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      compilation.chunks.forEach(function(chunk) {
        chunk.files.forEach(function(filename) {
          var source = compilation.assets[filename].source();
          compilation.assets[filename] = new ConcatSource("define(['require', 'module', 'exports'],function(require, module, exports) { return ", source, "});");
        });
      });
      callback();
    });
	}
}

module.exports = DefPlugin
