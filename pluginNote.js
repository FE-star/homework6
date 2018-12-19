const ConcatSource = require('webpack-sources').ConcatSource

class DefPlugin {
    constructor(name) {

    }

    // 这里的compilation指该插件应用时某个任务点的构建对象
apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.moduleTemplate.plugin('module', (source, module, options, dependencyTemplates) => {
            if (/test.js/.test(module.request)) {
                let newSource = source.source().replace(/world/g, 'lynn')
                return newSource
            } else {
                return source
            }
            return module
        })
    })
        // compiler.plugin('compilation', (compilation) => {
        //     compilation.plugin('optimize-chunks', (chunks) => {
        //         modules.map(module => {
        //             if (/test.js/.test(module.request)) {
        //                 console.log(module.source());
        //                 // let newSource = source.source().replace('world', 'lynn')
        //                 // return newSource
        //             } else {
        //                 // return source
        //             }
        //         })
        //         // console.log(module)
        //
        //         // return module
        //     })
        // })
        // compiler.plugin('emit', (compilation, callback) => {
        //     let content = compilation.assets['./bundle.js'].source();
        //     content = content.replace(/hello/g, 'lynn')
        //     // 重写指定输出模块内容
        //     compilation.assets['./bundle.js'] = {
        //         source() {
        //             return content
        //         },
        //         size() {
        //             return content.length
        //         }
        //     }
        //     callback()
        // })

    }
}

module.exports = DefPlugin