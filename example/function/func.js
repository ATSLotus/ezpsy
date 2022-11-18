/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-11-18 20:33:43
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 21:41:45
 * @Description: 
 * @FilePath: /ezpsy/example/function/func.js
 */
import ezpsy from "../../dist/index.js"


let keypress = ezpsy.KeypressInit('keyup');
let ez = ezpsy.init()
let c0 = new ezpsy.Circle({
    shape: {
        x: 200,
        y: 200,
        r: 100
    },
    style: {
        fill: 'blue'
    }
})
let c1 = new ezpsy.Circle({
    shape: {
        x: 200,
        y: 200,
        r: 100
    },
    style: {
        fill: 'orange'
    }
})
let f = new ezpsy.RandomFunctions({
    els: [() => {ez.remove([c0,c1]);ez.add(c0);},() => {ez.remove([c0,c1]);ez.add(c1)}]
})
console.dir(f);
keypress.listen(' ',()=>{
    f.run()
    console.dir(f.getIndex())
},false)

