const ConcatSource = require('webpack-sources').ConcatSource


class DefPlugin {
    constructor(name) {}

    apply(compiler) {
        compiler.plugin("emit", function(compilation, callback) {

            var source = ""; 
            compilation.modules.forEach((e)=>{
                 if(e._source._name.indexOf("hello") != -1){
                    source += e._source._value;        
                 }
            }) 
            
            var targetSource = `global.define(['module', 'exports'], function(module, exports){
                                 ${source}
                            });
                            `
            for (var filename in compilation.assets) {}

            // Insert this list into the webpack build as a new file asset:
            //利用 webpack 生成文件
            compilation.assets[filename] = {
                source: function() {
                    return targetSource;
                },
                size: function() {
                    return targetSource.length;
                }
            };
            callback();
        });
    }
}

module.exports = DefPlugin