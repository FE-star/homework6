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
        	//想通过判断replacements是否有内容，判断是不是没有依赖其他文件，只给依赖文件加上global.define，借助webpack处理依赖关系
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