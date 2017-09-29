const ConcatSource = require('webpack-sources').ConcatSource
let result = new ConcatSource();
class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
  	compiler.plugin("compile", function(params) {
       console.log("The compiler is starting to compile...");
     });
  	compiler.plugin('emit', function(compilation, callback) {

  		  compilation.chunks.forEach(function(chunk) {

        chunk.modules.forEach(function(module) {

        	if(!module._cachedSource.source.replacements.length){
        		module._source._value = `
				   global.define(['module','exports'],function (module,exports){
				   		  ${module._source._value}
				    	})
				    `
        	}
       });

    });

		callback();

  })
 }
}
module.exports = DefPlugin