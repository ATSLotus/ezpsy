/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-17 15:19:14
 * @Description: 
 * @FilePath: /ezpsy/rollup.config.js
 */
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import css from 'rollup-plugin-css-porter';
import scss from 'rollup-plugin-scss';
// import wasm from 'rollup-plugin-wasm';
import wasm from '@rollup/plugin-wasm';
import replace from '@rollup/plugin-replace';
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
    plugins:[
      wasm({
        sync: [
          'static/singrat_bg.wasm'
        ]
      }),
      typescript(),  // 默认从 tsconfig加载数据↗
      nodeResolve(),
      commonjs(),
      css(),
      scss(),
      // replace({
      //   "_loadWasmModule(1,":"_loadWasmModule(0,",
      //   delimiters: ['','']
      // }),
      babel({
        exclude: 'node_modules/**' // 只编译我们的源代码
      })
    ],
  },
]