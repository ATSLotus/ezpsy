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
export function exportContext(init?: initProperties): {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
}{
    let parentEle:HTMLElement = init.el
    let ele:HTMLCanvasElement = document.createElement('canvas')
    // 默认宽高为全屏
    const style = init.style || {
        width: window.innerWidth,
        height: window.innerHeight
    }
    const dpr = window.devicePixelRatio || 1;
    console.log("DPR", dpr)
    const logicalWidth = style.width ? styleValueParse(style.width) : window.innerWidth;
    const logicalHeight = style.height ? styleValueParse(style.height) : window.innerHeight;
    console.log("LOGICAL", logicalWidth, logicalHeight)
    const physicalWidth = logicalWidth * dpr;
    const physicalHeight = logicalHeight * dpr;
    console.log("PHYSICAL", physicalWidth, physicalHeight)
    ele.width = physicalWidth;
    ele.height = physicalHeight
    ele.style.width = `${logicalWidth}px`;
    ele.style.height = `${logicalHeight}px`;
    // ele.width = style.width ? styleValueParse(style.width) : window.innerWidth
    // ele.height = style.height ? styleValueParse(style.height) : window.innerHeight;
    ele.style.position = 'absolute'
    const ctx = ele.getContext('2d');
    ctx.scale(dpr, dpr);
    parentEle.append(ele)
    return {
        canvas: ele,
        ctx: ctx
    };
}

export function refreshContext({
    canvas,
    ctx
}: {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
}) {
    canvas.width = canvas.width
    canvas.height = canvas.height
    const dpr = window.devicePixelRatio || 1;
    ctx.scale(dpr, dpr);
}