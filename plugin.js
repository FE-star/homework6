const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
  	 compiler.plugin('compilation',function(compilation){
  	 	compilation.mainTemplate.plugin('render-with-entry', function(source){
  	 		return new ConcatSource(`global.define(['require','module','exports'],function(require,module,exports){
  	 			 ${source.source()}
  	 		})`)
  	 	})
  	 })
  }
}

module.exports = DefPlugin