const path = require('path')
const Plugin = require('./plugin')

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: './index.js',
    output: {
        libraryTarget: 'commonjs2',
        path: path.join(__dirname, 'dist'),
        filename: './bundle.js'
    },
    plugins: [
        new Plugin
    ]
}
