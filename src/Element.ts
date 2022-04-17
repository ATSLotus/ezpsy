import { Rectangle } from './Graphic/rectangle'
import { Shape,Style} from './DataType/dataType'
import { canvasStyle } from './Canvas/canvas'
import { nameStyle } from './DataType/dataType';
import { Storage } from './Storage/storage';
import * as ezTime from "./Time/time"
import * as ezTimer from "./Time/timePerformance"
import * as ezJudge from './Judge/judge'
import { TextLine } from './Graphic/text';

export class Elements{
    name?: nameStyle
    shape?: Shape
    style?: Style 
    textLine?: TextLine
    ctx?: CanvasRenderingContext2D
    storage?: Storage
    scale?: Scale
    translate?: Translate
    rotate?: number
    constructor(){
        this.translate = {
            x: 0,
            y: 0
        }
        this.scale = {
            width: 1,
            height: 1
        }
        this.rotate = 0
    }
    noFill(){
        this.style.fill = 'none';
    }
    noStroke(){
        this.style.lineWidth = 0;
        // if(this.style.fill !== 'none' && this.style.fill !== undefined){
        //     this.style.stroke = this.style.fill
        // }
        // else{
        //     this.style.stroke = "#fff";
        //     console.dir('Error!')
        // }
        this.style.stroke = 'none'
    }
    setCanvasStyle(cStyle: canvasStyle){
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
        let el = this;
        ezJudge.judgeElement(el,ctx)
    }
    remove(){

        let ctx = this.ctx
        
        ctx.save()
        // ctx.beginPath()
        ctx.fillStyle="white"	
        ctx.fillRect(0,0,1,1)
        ctx.globalCompositeOperation="destination-in";
        ctx.fillRect(0,0,1,1);
        // ctx.closePath()	
        ctx.restore()
        ctx.globalCompositeOperation='source-over'

        this.storage.remove(this);
        this.storage.reDraw(ctx);


        // let ctx = this.ctx
        // let c = ctx.canvas;
        // c.width = c.width;
        // c.height = c.height;


        
    }

    animate(func: Function,delay: number){
        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        let ctx = this.ctx;
        let start = performance.now();
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);
        (async function(){
            // while(performance.now() > start)
            // {
                
            while(1){
                console.dir(performance.now())
                func();
                await ezTime.delay_frame(delay);
                that.remove()
                that.storage.push(that)
                that.storage.reDraw(ctx)
            }
                
            //     func();
            //     // await ezTime.WaitSecs0(delay/2)
            //     await ezTimer.sleep(delay)
            //     that.remove()
            //     that.storage.push(that)
            //     that.storage.reDraw(ctx)
            //     // ezJudge.judgeAnimate(that,ctx);
            //     // await that.storage.reDraw(ctx);
            //     // await ezTime.WaitSecs0(delay/2)
            // }
            // window.setInterval(()=>{
            //     func();
            //     // await ezTime.WaitSecs0(delay/2)
            //     ezTimer.sleep(delay).then(()=>{
            //         that.remove()
            //         that.storage.push(that)
            //         that.storage.reDraw(ctx)
            //     })
                
            // },0)
        })()
    }

    // scale(scaleWidth: number,scaleHeight: number){
    //     let ctx = this.ctx
    //     this.remove()
    //     ctx.save()
    //     ctx.beginPath()
    //     ctx.scale(scaleWidth,scaleHeight)
    //     ezJudge.judgeElement(this,ctx)
    //     ctx.closePath()
    //     ctx.restore()
    // }
    // rotate(ang: number){
    //     let ctx = this.ctx
    //     this.remove()
    //     ctx.save()
    //     ctx.beginPath()
    //     ctx.rotate(ang)
    //     ezJudge.judgeElement(this,ctx)
    //     ctx.closePath()
    //     ctx.restore()
    // }
    // translate(x: number,y: number){
    //     let ctx = this.ctx
    //     this.remove()
    //     ctx.save()
    //     ctx.beginPath()
    //     ctx.translate(x,y)
    //     ezJudge.judgeElement(this,ctx);
    //     ctx.closePath()
    //     ctx.restore()
    // }
}

export interface Scale{
    width: number,
    height: number
}

export interface Translate{
    x: number,
    y: number
}