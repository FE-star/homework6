const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    this.name = name;
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      // console.log(compilation);

      // compilation.plugin("optimize-chunk-assets", (chunks, callback) => { // 这个时机不对，chunk文件已经生成了
			// 	chunks.forEach((chunk) => {
			// 		chunk.files
			// 			.forEach((file) => {
			// 				//console.log(file);

			// 				return compilation.assets[file] = new ConcatSource(compilation.assets[file], "\n", "define");
			// 			});
			// 	});
			// 	callback();
      // });
      
      const mainTemplate = compilation.mainTemplate;

      compilation.templatesPlugin("render-with-entry", (source, chunk, hash) => {
        // console.log(source);

        if(this.name) {
          const name = mainTemplate.applyPluginsWaterfall("asset-path", this.name, {
            hash,
            chunk
          });

          return new ConcatSource(`global.define([${JSON.stringify(name)}, 'module'], function(module) { `, source, "});");
        } else {
          return new ConcatSource(`global.define(['module'], function(module) { `, source, "});");
        }
      });
    });
  }
}

module.exports = DefPlugin