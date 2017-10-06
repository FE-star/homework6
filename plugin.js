const OriginalSource = require('webpack-sources').OriginalSource,
      path = require('path')

class DefPlugin {
  constructor(name) {
  }

  apply(compiler) {
    compiler.plugin('compilation', function (compilation) {
      compilation.plugin('succeed-module',function(module){
        let _name = path.join(__dirname, 'src', 'hello.js'), _value, _source
        if(module.userRequest == _name){
          _value = `module.exports = global.define([
                        'require',
                        'module',
                        'exports'
                      ], function(require, module, exports) {
                        module['exports'] = 'hello world'
                      })
                    `
          _source = new OriginalSource(_value, _name)
          module._source = _source
        }
      })
    })
  }
}

module.exports = DefPlugin