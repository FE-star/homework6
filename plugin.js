const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {

    compiler.plugin('emit', function(compilation, callback){
      compilation.chunks.forEach(chunk=>{
        chunk.files.forEach(filename=>{
          var source = compilation.assets[filename].source()
          compilation.assets[filename] = new ConcatSource('global.define(["require", "module", "exports"],\
            function(require, module, exports){', '\n', source, '\n', '})'

          )


        })
      })
      callback()
    })

    
  }
}

module.exports = DefPlugin