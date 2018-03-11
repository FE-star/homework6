const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    this.name = name;
  }

  apply(compiler) {
    var that = this;
    // 设置回调访问 compilation 对象
    compiler.plugin('compilation', function(compilation) {
      compilation.templatesPlugin('render-with-entry', function(source, chunk, hash) {
        // console.log(source);
        if (that.name) {
          return new ConcatSource(`global.define([${JSON.stringify(that.name)}, 'module'], function(${that.name}, module) {`, source, "});");
        } else {
          return new ConcatSource(`global.define(['module'], function(module) {`, source, "});");
        }
      });
    });
  }
}

module.exports = DefPlugin
