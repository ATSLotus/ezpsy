import { Rectangle } from './Graphic/rectangle'
import { Shape,Style} from './DataType/dataType'
import { canvasStyle } from './Canvas/canvas'
import * as ezJudge from './Judge/judge'

export class Elements{
    shape?: Shape
    style?: Style 
    ctx?: CanvasRenderingContext2D
    constructor(){

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
        cStyle = ezJudge.judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
    }
    remove(){
        let ctx = this.ctx
        ctx.save()
        ctx.beginPath()
        ctx.fillStyle="white"	
        ctx.fillRect(0,0,1,1)
        ctx.globalCompositeOperation="destination-in";
        ctx.fillRect(0,0,1,1);
        ctx.closePath()	
        ctx.restore()
        // ctx.globalCompositeOperation='source-over'
    }
    scale(scaleWidth: number,scaleHeight: number){
        let ctx = this.ctx
        this.remove()
        ctx.save()
        ctx.beginPath()
        ctx.scale(scaleWidth,scaleHeight)
        ezJudge.judgeElement(this,ctx)
        ctx.closePath()
        ctx.restore()
    }
    rotate(ang: number){
        let ctx = this.ctx
        this.remove()
        ctx.save()
        ctx.beginPath()
        ctx.rotate(ang)
        ezJudge.judgeElement(this,ctx)
        ctx.closePath()
        ctx.restore()
    }
    translate(x: number,y: number){
        let ctx = this.ctx
        this.remove()
        ctx.save()
        ctx.beginPath()
        ctx.translate(x,y)
        ezJudge.judgeElement(this,ctx);
        ctx.closePath()
        ctx.restore()
    }
    // animate(){
    //     if(this.ctx)
    //     {
    //         this.animate.prototype.done = function(func: Function){
                 
    //         }
    //     }
    //     else{
    //         console.error();
    //     }
        
    // }
}