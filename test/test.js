let mod = null
const assert = require('assert')

describe('plugin', function () {
  before(() => {
    global.define = function (deps, fn) {
      const module = { exports: {} }
      const args = deps.map(key => {
        if (key === 'require') return function () {}
        if (key === 'module') return module
        if (key === 'exports') return module.exports
      })
      fn.apply(null, args)
      mod = module
    }
  })

  it('可以不使用 Object.definePropery 中的 get 参数', function () {
    const a = require('../dist/bundle')
    assert.equal(mod.exports, 'hello world')
  })

  after(() => {
    global.define = null
    delete global.define
  })
})