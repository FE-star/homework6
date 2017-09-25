const ConcatSource = require('webpack-sources').ConcatSource


class DefPlugin {
    constructor(name) {}

    apply(compiler) {

        compiler.plugin("compile", function(params) {
            console.log("The compiler is starting to compile...");
        });

        compiler.plugin("compilation", function(compilation) {
            console.log("The compiler is starting a new compilation...");
            //console.log(compilation.getStats());
          /*  compilation.mainTemplate.plugin('startup', function(source, module, hash) {
		       console.log("dddddd"+module);
		       //return source;
		    });*/


           /* compilation.plugin("optimize", function() {
                console.log("The compilation is starting to optimize files...");
            });

            compilation.plugin('after-optimize-chunk-assets', function(chunks) {
                //console.info(chunks); 
            });

            compilation.plugin('succeed-module', function(module) {
                 console.log('succeed module');
                 console.log(module);
             })*/
        });

        /* compiler.plugin("emit", function(compilation, callback) {
             console.log("The compilation is going to emit files...");
             callback();
         });*/

        compiler.plugin("emit", function(compilation, callback) {

            console.info(compilation.getStats())   
            /* compilation.plugin('optimize-chunks', function(chunks) {
                 console.log(111)
                 console.log(chunks);
             });


             compilation.plugin('succeed-module', function(module) {
                 console.log('succeed module');
                 console.log(module);
             });*/

            //console.log(compilation.assets);
            // Create a header string for the generated file:
            var filelist = `global.define(['module', 'exports'], function(module, exports){
                                module.exports =  'hello world'
                            });
                            `

            // Loop through all compiled assets,
            // adding a new line item for each filename.
            for (var filename in compilation.assets) {
                //console.log(compilation.chunks);
                //console.info(compilation.assets[filename]._source.children[0].children[1].children[5]);
                //filelist += ('- ' + filename + '\n');
            }

            // Insert this list into the webpack build as a new file asset:
            //利用 webpack 生成文件
            compilation.assets[filename] = {
                source: function() {
                    return filelist;
                },
                size: function() {
                    return filelist.length;
                }
            };
            callback();
        });
    }
}

module.exports = DefPlugin