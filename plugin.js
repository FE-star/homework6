// https://github.com/webpack/webpack/blob/master/lib/AmdMainTemplatePlugin.js
const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
  constructor(name) {
    // this.name = name
  }

  apply(compiler) {
    // 完成所有模块构建结束编译过程点
    compiler.plugin('after-compile', function (compilation, callback) {
      // console.log(compilation.mainTemplate)
      const assets = compilation.assets
      for (let key in assets) {
        let str = `global.define(['require', 'module', 'exports'], function ( require, module, exports) {${assets[key].source()}})`
        assets[key] = new ConcatSource(str)
      }

      callback()
    })
  }
}

module.exports = DefPlugin