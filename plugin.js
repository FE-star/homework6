const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
    constructor(name) {}

    apply(compiler) {
        compiler.plugin("emit", function(compilation, callback) {
            // 探索每个块（构建后的输出）:
            compilation.chunks.forEach(function(chunk) {
                // 探索块中的每个模块（构建时的输入）：
                /*chunk.forEachModule(function(module) {
                    // 探索模块中包含的的每个源文件路径：
                    module.fileDependencies.forEach(function(filepath) {
                        // 现在我们已经知道了很多的源文件结构了……
                        console.log("filepath==" + filepath);
                    });
                });*/

                // 探索块生成的每个资源文件名
                chunk.files.forEach(function(filename) {
                    // 得到块生成的每个文件资源的源码
                    var source = compilation.assets[filename].source();

                    source = `global.define(['module', 'exports'], function(module, exports){
                                 ${source}
                            });
                            `
                    compilation.assets[filename] = {
                        source: function() {
                            return source;
                        },
                        size: function() {
                            return source;
                        }
                    };
                });
            });

            callback();
        });
    }
}

module.exports = DefPlugin