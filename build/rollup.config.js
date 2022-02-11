const path = require('path');
const buble = require('@rollup/plugin-buble'); 
const typescript = require('@rollup/plugin-typescript');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    input: resolveFile('src/ezpsy.ts'),   //输入文件
    output: {
      file: resolveFile('dist/ezpsy.js'), //输出文件
      format: 'iife',
      name: 'ezpsy',
    }, 
    plugins: [
      typescript(),
      buble(),
    ],
  },
]