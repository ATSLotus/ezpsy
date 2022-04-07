import * as ezUtils from './utils'
import * as ezCanvas from './Canvas/canvas'
import * as ezTime from './Time/time'
import { canvasStyle } from './Canvas/canvas'
import * as ezJudge from './Judge/judge'
import * as ezRectangle from './Graphic/rectangle'
import { Rectangle } from './Graphic/rectangle'
import { Elements } from './Element'
import { Group } from './Group/group'
import { Storage } from './Storage/storage'



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
export { Rectangle } from './Graphic/rectangle'
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
// export { animate } from './Animate/animate'
// export { makeRectangle } from './Graphic/rectangle'
 
// let EzpsyList = new Array();

class Ezpsy {
    id: number
    dom: HTMLElement
    ctx: CanvasRenderingContext2D
    // ctxList: Array<CanvasRenderingContext2D>
    storage: Storage
    cStyle?: canvasStyle

    // Rectangle: Rectangle

    constructor(id: number,dom: HTMLElement,cStyle?: canvasStyle){
        this.id = id;
        this.dom = dom;
        this.storage = new Storage()
        cStyle = ezJudge.judgeCanvasStyle(cStyle);
        this.cStyle = cStyle;
        // this.ctxList = []
        this.ctx = ezCanvas.createCanvas(dom,cStyle);    //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
        // this.ctxList.push(this.ctx)
        // console.dir(this.ctx)
    }

    setCanvasStyle(cStyle: canvasStyle){
        // for(let i = 0;i < this.ctxList.length;i++){
        //     let c = this.ctxList[i].canvas;
        //     c.width = cStyle.width
        //     c.height = cStyle.height
        // }
        let el = this.storage.ElementsList
        let c = this.ctx.canvas;
        let ctx = this.ctx
        cStyle = ezJudge.judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
        let w = window.innerWidth
        let h = window.innerHeight
        // console.dir(w)
        c.style.top = ((h-cStyle.height)/2).toString() + 'px'
        c.style.left = ((w-cStyle.width)/2).toString() + 'px'
        this.storage.reDraw(ctx);
    }

    refresh(){
        // console.dir(this.storage.ElementsList)
        this.storage.ElementsList = new Array();
        let c = this.ctx.canvas;
        c.width = this.cStyle.width
        c.height = this.cStyle.height
    }

    // setAnimateCanvasStyle(cStyle: canvasStyle){
    //     for(let i = 1;i < this.ctxList.length;i++)
    //     {
    //         let c = this.ctxList[i].canvas;
    //         c.width = cStyle.width
    //         c.height = cStyle.height
    //     }
    // }

    add(el: Elements|Elements[]|Group){
        // console.dir('success')

        this.storage.push(el)
        
        // this.ctx = ezCanvas.createCanvas(this.dom,this.cStyle); //此处创建canvas将创建多个canvas
        // this.ctxList.push(this.ctx)
        let ctx = this.ctx
        if(el instanceof Elements||el instanceof Group)
        {
            el.ctx = ctx;
            el.storage = this.storage
            ezJudge.judgeElement(el,ctx)
        }
        else{
            for(let i = 0;i < el.length;i++)
            {
                el[i].ctx = ctx
                el[i].storage = this.storage
                ezJudge.judgeElement(el[i],ctx)
            }
        }
        
    }

    remove(el: Elements|Elements[]|Group)
    {
        let ctx = this.ctx
        let c  = ctx.canvas
        c.width = this.cStyle.width
        c.height = this.cStyle.height
        this.storage.remove(el);
        this.storage.reDraw(ctx);   
    }

    // aliasing(style: string){
    //     this.ctx.globalCompositeOperation = style
    // }

    animate(el: Elements,func: Function,delay: number){
        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        let ctx = this.ctx;
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);
        (async function(){
            while(1)
            {
                
                func();
                await ezTime.WaitSecs(delay/2)
                el.remove()
                that.add(el);
                // that.storage.push(el)
                // that.storage.reDraw(ctx)
                // ezJudge.judgeAnimate(el,ctx);
                // await that.storage.reDraw(ctx);
                await ezTime.WaitSecs(delay/2)
            }
        })()
    }



    clear(){
        let that = this
        return new Promise(function(resolve,reject){
            let child = that.dom.lastElementChild
            while(child){
                that.dom.removeChild(child)
                child = that.dom.lastElementChild
            }
            resolve(0)
        })
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