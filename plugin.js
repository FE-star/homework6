const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
	 compiler.plugin('emit', function(compilation, callback) {
	    // 检索每个（构建输出的）chunk：
	    compilation.chunks.forEach(function(chunk) {

	      // 检索由 chunk 生成的每个资源(asset)文件名：
	      chunk.files.forEach(function(filename) {
	        // Get the asset source for each file generated by the chunk:
	        var source = compilation.assets[filename].source();
	        compilation.assets[filename] = 
	        new ConcatSource(
	        	"define(['require', 'module', 'exports'],function(require, module, exports) { return ", source, "});"
	        	);


	      });
	    });
	    callback();
	})
}
}
module.exports = DefPlugin