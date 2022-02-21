import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
module.exports = [
  {
    input: 'index.ts',   //输入文件
    output:[
      {
        file: 'dist/iife/ezpsy.js', //输出文件
        format: 'iife',
        name: 'ezpsy',
      }, 
      {
        file: 'dist/esm/index.js',
        format: "esm",
        name: "ezpsy",
        sourcemap: 'inline'
    }
    ],
    plugins: [
      typescript(),  // 默认从 tsconfig加载数据
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
    })
    ],
  },
]