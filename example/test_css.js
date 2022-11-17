/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-11-17 20:39:08
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-17 21:33:22
 * @Description: 
 * @FilePath: /ezpsy/example/test_css.js
 */
import ezpsy from "../../dist/esm/index.js"
let dom = document.querySelector('#test')
let ez = ezpsy.init(dom)
let dlg = ezpsy.DlgInit()

dlg.questDlg({
    tille: '文件删除',
    content: '是否删除该文件'
}).then(e=>{
    console.dir(e)
})

