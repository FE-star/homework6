首先分析一下，需要完成以下点：
- 写一个插件
- 能够生成 AMD 模块

先分析结果，生成 AMD 模块。那默认情况下生成的是什么呢？—— CommonJS 规范？

```javascript
compiler.plugin('emit', function (compilation, callback) {
	compilation.chunks.forEach(function (chunk) {
	chunk.files.forEach(function (filename) {
		var source = compilation.assets[filename].source();
		compilation.assets[filename] = new ConcatSource("define(['require', 'module', 'exports'],function(require, module, exports) { return ", source, "});");
	});
	});
	callback();
})
```

因为对不同的模块规范了解不深，感觉无从下手，就分析了下现成的答案，回头搞明白了再来重写：
根据https://www.webpackjs.com/api/compiler-hooks/（或者https://webpack.js.org/api/compiler-hooks/），在emit时把打包生成的源文件source，包裹一层`define`语法（AMD）