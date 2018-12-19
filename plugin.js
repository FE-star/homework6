/**
 * created by LynnZhang on 2018/12/15
 */
class DefPlugin {
    apply(compiler) {
        compiler.plugin('emit', (compilation, callback) => {
            let content = compilation.assets['./bundle.js'].source();
            content = `global.define(['require','module','exports'], function(require, module, exports) {
                     ${content}
                 })`;
            // 重写指定输出模块内容
            compilation.assets['./bundle.js'] = {
                source() {
                    return content
                },
                size() {
                    return content.length
                }
            }
            callback()
        })
    }
}

module.exports = DefPlugin
