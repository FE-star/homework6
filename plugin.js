const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  	this.name = name;
  }

  apply(compiler) {
  	compiler.plugin('emit', function(compilation, callback) {
  		// console.log(compilation)
  		compilation.chunks.forEach(function(chunk) {
  			// console.log(chunk)
  			chunk.files.forEach(function(filename) {
  				// console.log(filename)
  				var source = compilation.assets[filename].source();
  				console.log(source);
  				compilation.assets[filename] = new ConcatSource(
  					'define(["require", "module", "exports"], function(require,module,exports) { return ',
  					source,
  					'});');
  			});
  		});
  		callback();
  	});
  }
}

module.exports = DefPlugin;