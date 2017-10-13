const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
    constructor(name) {}

    apply(compiler) {
        compiler.plugin('emit', function(compilation, callback) {
            let assets = compilation.assets
            for (let key in compilation.assets) {
                console.log(key);
                let str = assets[key].source();
                str = `global.define(['require', 'module', 'exports'], ( require, module, exports) => {${str}})`
                assets[key] = new ConcatSource(str);
            }
            callback();
        })
    }
}

module.exports = DefPlugin