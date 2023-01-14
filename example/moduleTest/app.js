/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-20 09:36:34
 * @Description: 
 * @FilePath: /ezpsy/example/moduleTest/app.js
 */
import ezpsy from "../../dist/index.js"
// let dom = document.querySelector('#dom')
let ez = ezpsy.init()
// let dlg = ezpsy.DlgInit(dom)
window.onresize = function(){
    location.reload();
}

ez.setCanvasStyle({
    width: window.innerWidth,
    height: window.innerHeight
})

let singrat = new ezpsy.sinGrating({
    shape:{
        x: window.innerWidth/2,                 
        y: window.innerHeight/2,                 
        r: 120,    
        // pixelsPerDegree: 57, 
        // spatialFrequency: 2,
        // angle: 90, 
        // contrast: 1, 
        // phase: 0,
        // level: 0.5,
        // gamma: 1
    }
})

ez.add(singrat)
singrat.play()

// let rect = new ezpsy.Rectangle({
//     shape:{
//         x: 0,
//         y: 0,
//         width: 100,
//         height: 100
//     },
//     style:{
//         fill: "#f0f0f0"
//     }
// })

// ez.add(rect)