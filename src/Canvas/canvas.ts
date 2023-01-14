/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 19:51:16
 * @Description: 
 * @FilePath: /ezpsy/src/Canvas/canvas.ts
 */
import * as ezJudge from '../Judge/judge'

export interface canvasStyle{
    width?: number;
    height?: number;
    backColor?: string
}

export interface initProperties{
    el?: HTMLElement,
    style?:canvasStyle
}

// export function createCanvas(dom: HTMLElement,cStyle?: canvasStyle): CanvasRenderingContext2D{
//     let c = document.createElement('canvas')
//     // let cStyle: canvasStyle = {
//     //     width: 100,
//     //     height: 100
//     // }
//     c.style.position = 'absolute'
//     c.width = cStyle.width;
//     c.height = cStyle.height;
//     let w = window.innerWidth
//     let h = window.innerHeight
//     // console.dir(w)
//     c.style.top = ((h-cStyle.height)/2).toString() + 'px'
//     c.style.left = ((w-cStyle.width)/2).toString() + 'px'
//     let ctx = c.getContext('2d');
//     dom.append(c);
//     return ctx;
// }
const styleValueParse = (attr: string | number) => {
    if (typeof(attr) == 'number') {
        return attr
    }else {
        return parseInt(attr.endsWith('px') ? attr.split('px')[0] : attr)
    }
}
export function exportContext(init?: initProperties): CanvasRenderingContext2D{
    let parentEle:HTMLElement = init.el
    console.log(parentEle);
    
    let ele:HTMLCanvasElement = document.createElement('canvas')
    // let cStyle: canvasStyle = {
    //     width: 100,
    //     height: 100
    // }
    const style = init.style
    if (style.width) {
        ele.width = styleValueParse(style.width);
    }else {
        ele.width = window.innerWidth;
    }
    if (style.height) {
        ele.height = styleValueParse(style.height);
    }else {
        ele.height = window.innerHeight;
    }
    ele.style.position = 'absolute'
    // c.height = cStyle.height;
    let ctx = ele.getContext('2d');
    parentEle.append(ele)
    return ctx;
}