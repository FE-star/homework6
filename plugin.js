const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    this.name = name;
  }

  apply(compiler) {

    compiler.plugin("compilation", (compilation) => {
      const mainTemplate = compilation.mainTemplate;

      const onRenderWithEntry = (source, chunk, hash) => {
        const args = ['require', 'module', 'exports'];
        const deps = JSON.stringify(args);
        
        if(this.name) {
          const name = mainTemplate.getAssetPath(this.name, {
            hash,
            chunk
          });
          return new ConcatSource(
            `define(${JSON.stringify(name)}, ${deps}, function(${args}) {
              return ${source.source()}
            });`
          );
        } else {
          return new ConcatSource(
            `define(${deps}, function(${args}) {
              return ${source.source()}
            });`
          );
        }
      };

      mainTemplate.plugin('render-with-entry', (source, chunk, hash) => {
        return onRenderWithEntry(source, chunk, hash);   
      });
      
    });
  }
}

module.exports = DefPlugin