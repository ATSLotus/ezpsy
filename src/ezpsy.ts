import * as ezUtils from './utils'
import * as ezCanvas from './Canvas/canvas'
import { canvasStyle } from './Canvas/canvas'
import * as ezJudge from './Judge/judge'
import * as ezRectangle from './Graphic/rectangle'
import { Rectangle } from './Graphic/rectangle'
import { Class } from 'estree'
import { Elements } from './Element'


export {Rectangle} from './Graphic/rectangle'
// export { AdjoinRect,RectCenter } from './Graphic/rectangle'
export * from './DataType/dataType'
export * from './Graphic/rectangle'
export * from './Graphic/circle'
export * from './Graphic/line'
export * from './Graphic/arc'
export * from './Graphic/ellipse'
export * from './Graphic/polygon'
export * from './Graphic/text'
export * from './Graphic/image'
export * from './Time/time'
export * from './Keypress/keypress'
export * from './Dialogue/dialogue'
export * from './Graphic/grating'
export { Group } from './Group/group'
export { Circle } from './Graphic/circle'
export { Line } from './Graphic/line'
export { Arc } from './Graphic/arc'
export { Ellipse } from './Graphic/ellipse'
export { Polygon } from './Graphic/polygon'
export { Text } from './Graphic/text'
export { Img } from './Graphic/image'
export { Time } from './Time/time'
export { Dialogue } from './Dialogue/dialogue'
export { Grat } from './Graphic/grating'
// export { makeRectangle } from './Graphic/rectangle'
 
// let EzpsyList = new Array();

class Ezpsy {
    id: number
    dom: HTMLElement
    ctx: CanvasRenderingContext2D
    cStyle?: canvasStyle

    // Rectangle: Rectangle

    constructor(id: number,dom: HTMLElement,cStyle?: canvasStyle){
        this.id = id;
        this.dom = dom;
        this.cStyle = cStyle;
        this.ctx = ezCanvas.createCanvas(dom,cStyle);
        // console.dir(this.ctx)
    }

    setCanvasStyle(cStyle: canvasStyle){
        let c = this.ctx.canvas;
        cStyle = ezJudge.judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
    }

    add(el: Elements){
        // console.dir('success')
        let ctx = this.ctx
        el.ctx = ctx;
        ezJudge.judgeElement(el,ctx)
    }

    aliasing(style: string){
        this.ctx.globalCompositeOperation = style
    }

}

// export function pushEzpsyList(ez: Ezpsy){
//     let num = ez.id;
//     EzpsyList[num] = ez;
// }

export function init(dom: HTMLElement,cStyle?: canvasStyle) {
    let ez = new Ezpsy(ezUtils.Count(),dom,cStyle);
    // pushEzpsyList(ez);
    // console.dir(EzpsyList);
    return ez;
}