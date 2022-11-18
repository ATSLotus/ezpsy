import * as ezUtils from './utils'
import * as ezCanvas from './Canvas/canvas'
import * as ezTime from './Time/time'
import { canvasStyle } from './Canvas/canvas'
import * as ezJudge from './Judge/judge'
import { Elements } from './Element'
import { Group } from './Group/group'
import { Storage } from './Storage/storage'
import { TextLine,Texts } from './Graphic/text'
// import { GratOpts,sinGrat } from './Graphic/sinGrat'



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
// export * from './Graphic/imageCV'
export * from './Time/time'
// export * from './Keypress/keypress'
// export * from './Dialogue/dialogue'
export * from './Graphic/grating'
export * from './Graphic/sinGrat'
export * from './Time/timePerformance'
export * from './Keypress/keypress0'
export * from './Dialogue/dialogue0'
export * from './Graphic/sinGrating'
export { Rectangle } from './Graphic/rectangle'
export { Group } from './Group/group'
export { Circle } from './Graphic/circle'
export { Line } from './Graphic/line'
export { Arc } from './Graphic/arc'
export { Ellipse } from './Graphic/ellipse'
export { Polygon } from './Graphic/polygon'
export { Texts } from './Graphic/text'
export { Img } from './Graphic/image'
// export { Img } from './Graphic/imageCV'
export { Keypress } from './Keypress/keypress0'
// export { Time } from './Time/time'
// export { Dialogue_0} from './Dialogue/dialogue'
export { sinGrating } from './Graphic/sinGrating'
export { Grat } from './Graphic/grating'
export { Time } from './Time/timePerformance'
export { RandomDot } from './Graphic/randomDot'
export { RandomFunctions } from './Functions';

// export { animate } from './Animate/animate'
// export { makeRectangle } from './Graphic/rectangle'
 
// let EzpsyList = new Array();

class Ezpsy {
    readonly id: number
    dom: HTMLElement
    readonly ctx: CanvasRenderingContext2D
    private storage: Storage
    cStyle?: canvasStyle

    // Rectangle: Rectangle

    // constructor(id: number,dom: HTMLElement,cStyle?: canvasStyle){
    //     this.id = id;
    //     this.dom = dom;
    //     this.storage = new Storage()
    //     cStyle = ezJudge.judgeCanvasStyle(cStyle);
    //     this.cStyle = cStyle;
    //     this.ctx = ezCanvas.createCanvas(dom,cStyle);    //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
    // }
    constructor(id: number,cStyle?: canvasStyle){
        this.id = id;
        // this.dom = dom;
        this.storage = new Storage()
        cStyle = ezJudge.judgeCanvasStyle(cStyle);
        this.cStyle = cStyle;
        this.ctx = ezCanvas.createCanvas(cStyle);    //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
    }

    setCanvasStyle(cStyle: canvasStyle){
        // for(let i = 0;i < this.ctxList.length;i++){
        //     let c = this.ctxList[i].canvas;
        //     c.width = cStyle.width
        //     c.height = cStyle.height
        // }
        // let el = this.storage.ElementsList
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
        this.cStyle = {
            width: cStyle.width,
            height: cStyle.height
        }
        this.storage.reDraw(ctx);
    }

    refresh(){
        // console.dir(this.storage.ElementsList)
        // this.storage.ElementsList = new Array();
        let c = this.ctx.canvas;
        c.width = this.cStyle.width
        c.height = this.cStyle.height
        this.storage.reDraw(this.ctx)
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
        let ctx = this.ctx
        let st = this.storage
        let name = st.getElementsName(el)
        let index = st.searchElementsName(name)
        
        if(el instanceof Elements||el instanceof Group)
        {
            if(index !== -1)
            {
                el.remove()
                this.add(el)
                this.refresh()
            }
            else{
                this.storage.push(el)
                el.ctx = ctx;
                el.storage = this.storage
                ezJudge.judgeElement(el,ctx)
            }
            
        }
        else{
            for(let i = 0;i < el.length;i++)
            {
                let e = el[i]
                this.add(e)
                // el[i].ctx = ctx
                // el[i].storage = this.storage
                // ezJudge.judgeElement(el[i],ctx)
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

    animate(el: Elements|Elements[],func: Function,delay: number){

        if(el instanceof Array)
        {
            for(let i = 0;i < el.length;i++){
                el[i].IsAnimation = true;
                el[i].IsPause = true
            }
        }
        else{
            el.IsAnimation = true;
        }

        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        let ctx = this.ctx;

        let pause = false;
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);

        (async function () {
            while((<Elements>el).IsAnimation || (<Array<Elements>>el)[0].IsAnimation){
                if(el instanceof Elements)
                    pause = el.IsPause
                else
                    pause = el[0].IsPause
                if(pause)
                {
                    console.dir("The animation has paused !");
                    await ezTime.delay_frame(delay);
                }
                else{
                    func();
                    await ezTime.delay_frame(delay);
                    that.remove(el)
                    that.add(el);
                }
            }
        })()
    }

    setTextLine(textLine: TextLine)
    {
        let c = this.ctx.canvas;
        c.width = this.cStyle.width
        c.height = this.cStyle.height
        let st = this.storage
        st.textLine = textLine
        if(textLine)
        {
            if(textLine.textA)
            {
                // this.textLine.textA = textLine.textA
                for(let i = 0;i < st.ElementsList.length;i++)
                {
                    if(st.ElementsList[i] instanceof Texts)
                        st.ElementsList[i].textLine.textA = textLine.textA
                    else if(st.ElementsList[i] instanceof Group)
                    {
                        for(let t = 0;t < (<Group>st.ElementsList[i]).groupList.length;t++)
                        {
                            if((<Group>st.ElementsList[i]).groupList[t] instanceof Texts)
                            {
                                (<Group>st.ElementsList[i]).groupList[t].textLine.textA = textLine.textA
                            }
                        }
                    }
                }
            }
            if(textLine.textB)
            {
                // this.textLine.textB = textLine.textB
                for(let i = 0;i < st.ElementsList.length;i++)
                {
                    if(st.ElementsList[i] instanceof Texts)
                        st.ElementsList[i].textLine.textB = textLine.textB
                    else if(st.ElementsList[i] instanceof Group)
                    {
                        for(let t = 0;t < (<Group>st.ElementsList[i]).groupList.length;t++)
                        {
                            if((<Group>st.ElementsList[i]).groupList[t] instanceof Texts)
                            {
                                (<Group>st.ElementsList[i]).groupList[t].textLine.textB = textLine.textB
                            }
                        }
                    }
                }
            }
        }
        st.reDraw(this.ctx);
    }

    clear(){
        // let that = this;
        // this.storage.ElementsList = new Array();
        // return new Promise(function(resolve,reject){
        //     let child = that.dom.lastElementChild
        //     while(child){
        //         that.dom.removeChild(child)
        //         child = that.dom.lastElementChild
        //     }
        //     resolve(0)
        // })
        this.storage = new Storage();
        let c = this.ctx.canvas;
        c.width = this.cStyle.width
        c.height = this.cStyle.height
    }

}

// export function init(dom: HTMLElement,cStyle?: canvasStyle) {
//     let ez = new Ezpsy(ezUtils.Count(),cStyle);
//     // pushEzpsyList(ez);
//     // console.dir(EzpsyList);
//     return ez;
// }
export function init(cStyle?: canvasStyle) {
    let ez = new Ezpsy(ezUtils.Count(),cStyle);
    // pushEzpsyList(ez);
    // console.dir(EzpsyList);
    return ez;
}


 


// export function pushEzpsyList(ez: Ezpsy){
//     let num = ez.id;
//     EzpsyList[num] = ez;
// }

