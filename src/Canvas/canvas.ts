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
        return `${attr}px`
    }else {
        return attr.endsWith('px') ? attr : `${attr}px`
    }
}
export function exportContext(init?: initProperties): CanvasRenderingContext2D{
    let parentEle:HTMLElement = init.el
    let ele:HTMLCanvasElement = document.createElement('canvas')
    // let cStyle: canvasStyle = {
    //     width: 100,
    //     height: 100
    // }
    const style = init.style
    if (style.width) {
        ele.style.width = styleValueParse(style.width);
    }else {
        ele.style.width = `${window.innerWidth}px`;
    }
    if (style.height) {
        ele.style.height = styleValueParse(style.height);
    }else {
        ele.style.height = `${window.innerHeight}px`;
    }
    ele.style.position = 'absolute'
    ele.style.width = styleValueParse(style.width);
    ele.style.height = styleValueParse(style.height);
    // c.height = cStyle.height;
    let ctx = ele.getContext('2d');
    parentEle.append(ele)
    return ctx;
}