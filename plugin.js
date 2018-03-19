const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
     compiler.plugin("compile", function(params) {
      
       console.log("The compiler is starting to compile...");
     });

     compiler.plugin("compilation", function(compilation) {
       console.log("The compiler is starting a new compilation...");


      //参考：https://webpack.js.org/api/compilation/
       compilation.plugin("optimize", function() {
         console.log("The compilation is starting to optimize files...");
       });

      compilation.plugin("succeed-module", function(module) {
        console.log("Successfully built: ", module);
      });

      // ....
      
      compilation.plugin("chunk-asset", function(chunk, filename) {
        console.log("An asset from a chunk was added to the compilation ", chunk, filename);
        compilation.assets[filename] = new ConcatSource(`define(["require", "module", "exports"], function(require,module,exports) { 
            return ${compilation.assets[filename].source()}
          });`);
      });
    });
  }
}

module.exports = DefPlugin