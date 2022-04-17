import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-porter';
import scss from 'rollup-plugin-scss'
module.exports = [
  {
    input: 'index.ts',   //输入文件
    output:[
      {
        file: 'dist/iife/ezpsy.js', //输出文件
        format: 'iife',
        name: 'ezpsy'
      }, 
      {
        file: 'dist/esm/index.js',
        format: "esm",
        name: "ezpsy",
        sourcemap: 'inline'
      },
    ],
    context: 'that',
    plugins: [
      typescript(),  // 默认从 tsconfig加载数据
      nodeResolve(),
      commonjs(),
      css(),
      scss(),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ],
  },
]