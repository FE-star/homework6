// const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {

  }

  apply(compiler) {
  	compiler.plugin("compile", function(params) {
       console.log("The compiler is starting to compile...");
     });
  	compiler.plugin('emit', function(compilation, callback) {
  		// console.log(compiler.options.entry)
  		  compilation.chunks.forEach(function(chunk) {
  		  	console.log(chunk)
        chunk.modules.forEach(function(module) {
        	// console.log(module._source)
        	// console.log(module)
       });
     // callback在最后必须调用
     callback();
    });
  })
 }
}


module.exports = DefPlugin