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


       compilation.plugin("optimize", function() {
         console.log("The compilation is starting to optimize files...");
       });
     });

     compiler.plugin("emit", function(compilation, callback) {
       console.log("The compilation is going to emit files...");
      let assets = compilation.assets;
      for (const asset in assets) {
        let source = assets[asset].source();
        // console.log(source);
        assets[asset] = new ConcatSource(
          `define(["require", "module", "exports"], function(require,module,exports) { 
            return ${source}
          });`);
      }
       callback();
     });
  }
}

module.exports = DefPlugin