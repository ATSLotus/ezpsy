/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 17:24:15
 * @Description: 
 * @FilePath: /ezpsy/rollup.config.js
 */
import typescript from 'rollup-plugin-typescript2';
import babel from '@rollup/plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
// import css from 'rollup-plugin-css-porter';
// import scss from 'rollup-plugin-scss';
// import wasm from 'rollup-plugin-wasm';
import wasm from '@rollup/plugin-wasm';
import replace from '@rollup/plugin-replace'
const postcss = require('rollup-plugin-postcss');
const sass = require('node-sass');

// import eslint from 'rollup-plugin-eslint';
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

// import css from "rollup-plugin-import-css"

// const resolveFile = function(filePath) {
//   let p = path.join(__dirname, '..', filePath)
//   console.dir(p)
//   return p
// }

const isProductionEnv = process.env.NODE_ENV === 'production'

const processSass = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    sass.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err)
      }
    });
  })
}

module.exports = [
  {
    input: './src/index.ts',   //输入文件
    output:[                //输出文件
      {
        file: 'dist/ezpsy.js', 
        format: 'iife',
        name: 'ezpsy'
      }, 
      {
        file: 'dist/index.js',
        format: "esm",
        name: "ezpsy"
      },
    ],
    context: 'that',
    plugins:[
      wasm({
        sync: [
          'static/singrat_bg.wasm'
        ]
      }),
      typescript(),  // 默认从 tsconfig加载数据
      // nodeResolve(),
      // postcss({
      //   extract: true,
      //   minimize: isProductionEnv,
      //   extensions:['css', 'scss'],
      //   process: processSass,
      // }),
      postcss({
        plugins: [
          simplevars(),
          nested(),
          cssnext({ warnForDuplicates: false, }),
          cssnano(),
        ],
        extensions: [ '.css','.scss' ],
      }),
      nodeResolve({
        jsnext: true,
        main: true,
        browser: true,
      }),
      commonjs(),
      // processSass(),
      // scss({ sync: [
      //   "sweetalert2/src/sweetalert2.scss",
      //   "src/Dialogue/dialogue.scss"
      // ] }),
      // replace({
      //   "_loadWasmModule(1,":"_loadWasmModule(0,",
      //   delimiters: ['','']
      // }),
      // eslint({
      //   exclude: [
      //     'src/Style/**',
      //   ]
      // }),
      babel({
        "presets": ['@babel/preset-env'],
        exclude: 'node_modules/**' // 只编译我们的源代码
      }),
      replace({
        "_loadWasmModule(1,":"_loadWasmModule(0,",
        delimiters: ['','']
      }),
      replace({
        ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      })
    ],
  },
]