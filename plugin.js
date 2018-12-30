const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
  	compiler.plugin('emit', function(compilation, callback){
	  		compilation.chunks.forEach(chunks => {
	  			chunks.files.forEach(files => {
  				compilation.assets[files] = new ConcatSource(
  					`define(["require","module","exports"],function(require,module,exports){${compilation.assets[files].source()}})`)
  			})})
	  			callback();
  	})
  }
}

module.exports = DefPlugin
