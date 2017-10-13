const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
    constructor(name) {}

    apply(compiler) {
        compiler.plugin('emit', function(compilation, callback) {
            let assets = compilation.assets
            for (let key in compilation.assets) {
                let str = `global.define(['require', 'module', 'exports'], ( require, module, exports) => {${assets[key].source()}})`
                assets[key] = new ConcatSource(str);
            }
            callback();
        })
    }
}

module.exports = DefPlugin