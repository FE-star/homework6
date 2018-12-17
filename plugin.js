const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    // emit（'编译器'对'生成最终资源'这个事件的监听）
    compiler.plugin("emit", function(compilation, callback) {
      // compilation.chunks是块的集合（构建后将要输出的文件，即编译之后得到的结果）
      compilation.chunks.forEach(function(chunk) {
        // 最终生成的文件的集合
        chunk.files.forEach(function(filename) {
          // source()可以得到每个文件的源码
          var source = compilation.assets[filename].source();
          compilation.assets[filename] =
            new ConcatSource(
              "define(['require', 'module', 'exports'],function(require, module, exports) { return ", source, "});"
            );
        });
      })
      callback();
    })
  }
}

module.exports = DefPlugin