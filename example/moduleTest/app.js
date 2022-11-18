/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 16:36:51
 * @Description: 
 * @FilePath: /ezpsy/example/moduleTest/app.js
 */
import ezpsy from "../../dist/index.js"
let dom = document.querySelector('#dom')
let ez = ezpsy.init(dom)
// let dlg = ezpsy.DlgInit(dom)
window.onresize = function(){
    location.reload();
}

let rect = new ezpsy.Rectangle({
    shape:{
        x: 0,
        y: 0,
        width: 100,
        height: 100
    },
    style:{
        fill: "#f0f0f0"
    }
})

ez.add(rect)