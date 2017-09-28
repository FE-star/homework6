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
  		// console.log(compiler.options.entry)
  		// console.log(compilation.chunks.length)
  		  compilation.chunks.forEach(function(chunk) {
  		  	// console.log(chunk)
        chunk.modules.forEach(function(module) {
        	// console.log(module.dependencies.length)
        	// if(module.dependencies.length>0){
        	// 	console.log(module.dependencies[1])
        	// }
        	console.log(module.index,module._source._value)
        	module._source._value = `
				   global.define(['module','exports'],function (module,exports){
				   		  ${module._source._value}
				    	})
				    `
				   result.add(module._source);

       });
     // callback在最后必须调用
     callback();
    });
    // console.log(compilation.outputOptions.filename)

		// let filelist=`
  // global.define(['module'],function (module,exports){
  //  		module.exports = 'hello world'
  //  	})
  //  `

		//结果装进output文件
		compilation.assets[compilation.outputOptions.filename] = {
      source: function() {
        return result.source();
      },
      size: function() {
        return result.length;
      }

    }

		callback();



  })
 }
}


module.exports = DefPlugin