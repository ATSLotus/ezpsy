import { Elements } from "../Element";
import { delay_frame, nameStyle, Opts, Shape, Style } from "../ezpsy";
import { judgeElement, judgeStyle } from "../Judge/judge";
import * as ezJudge from '../Judge/judge'
import { createGratLinearGradient } from "../Gradient/gradient";

interface GratShape extends Shape{
    x: number,
    y: number,
    r: number,
    desity: number //密集度
}

interface GratOpts extends Opts{
    shpae: GratShape,
    style?: Style
}

let nameId = 0

export class Grat extends Elements{
    private name?: nameStyle = {
        name: "grat" + nameId.toString(),
        graphicId: nameId
    }
    constructor(opts: GratOpts){
        super()
        if(!opts.shape.desity)
        {
            opts.shape.desity = 35
        }
        this.shape = opts.shape;
        if(opts.style)
        {
            this.style = opts.style;
        }
        else{
            this.style = {
                fill: "none",
                stroke: "none",
                lineWidth: 2
            }
        }

        nameId++
    }
    // play(speed?: number,delay?: number){
    //     if(!delay){
    //         delay = 8
    //         if(!speed)
    //         {
    //             speed = 8
    //         }
    //     }
    //     let ctx = this.ctx
    //     let [x0,y0,x1,y1] = [this.shape.x-this.shape.r,this.shape.y-this.shape.r,this.shape.x-this.shape.r,this.shape.y+3*this.shape.r]
    //     let index = speed;
    //     let that = this;
    //     (async function(){
    //         for(let i = 0;i > -1;i++)
    //         {
    //             let fill = createGratLinearGradient(ctx,[x0,y0,x1,y1],that.shape.desity,index*i);
    //             if(index*i >= 2*that.shape.r)
    //             {
    //                 i = 0
    //             }
    //             updateGrat(that,ctx,fill)
    //             // console.dir(i)
    //             await delay_frame(delay)
    //         }
    //     })()
        
    // }
    play(speed?: number,delay?: number){
        if(!delay){
            delay = 8
            if(!speed)
            {
                speed = 8
            }
        }
        let ctx = this.ctx
        // console.dir('a')
        // let [x0,y0,x1,y1] = [this.shape.x-this.shape.r,this.shape.y-this.shape.r,this.shape.x-this.shape.r,this.shape.y+3*this.shape.r]
        let index = speed;
        let that = this;
        (async function(){
            for(let i = 0;i > -1;i++)
            {
                if(index*i >= that.shape.r)
                {
                    i = 0
                }
                updateGrat0(that,ctx,index*i)
                console.dir(i)
                await delay_frame(delay)
            }
        })()
    }
}

export function makeGrat(grat: Grat,ctx: CanvasRenderingContext2D): Grat{
    let sh = grat.shape;
    // console.dir(sh)
    let num = sh.desity;
    // let fill = ctx.createLinearGradient(sh.x-sh.r,sh.y-sh.r,sh.x-sh.r,sh.y+sh.r)
    // fill.addColorStop(0,'white')
    // for(let i = 1;i < num;i++){
    //     if(i%2 === 1){
    //         fill.addColorStop(i/num,'black')
    //     }
    //     else{
    //         fill.addColorStop(i/num,'white')
    //     }
    // }
    // fill.addColorStop(1,'white')
    let fill = createGratLinearGradient(ctx,[sh.x-sh.r,sh.y-sh.r,sh.x-sh.r,sh.y+3*sh.r],num,0)
    let c = ctx.canvas
    c.style.borderRadius = '50%';
    grat.style.fill = fill
    ctx.beginPath()
    // ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI)
    ctx.rect(sh.x-sh.r,sh.y-sh.r,sh.x+sh.r,sh.y+3*sh.r)
    judgeStyle(grat,ctx)
    ctx.closePath()
    // ctx.save()
    // ctx.beginPath();
    // ctx.rect(sh.x-sh.r,sh.y-sh.r,sh.x+sh.r,sh.y+2*sh.r);
    // judgeStyle(grat,ctx);
    // ctx.closePath()
    // ctx.globalCompositeOperation = 'destination-in'
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI);
    // ctx.fill()
    // ctx.closePath();
    // ctx.restore()
    
    return grat;
}

function updateGrat(grat: Grat,ctx: CanvasRenderingContext2D,fill: CanvasGradient){
    grat.remove()
    grat.style.fill = fill
    ctx.beginPath()
    ctx.arc(grat.shape.x,grat.shape.y,grat.shape.r,0,2*Math.PI)
    judgeStyle(grat,ctx)
    ctx.closePath()
}

function updateGrat0(grat: Grat,ctx: CanvasRenderingContext2D,num: number){
    grat.remove()
    ctx.save()
    ctx.beginPath()
    ctx.translate(0,-num)
    ctx.rect(grat.shape.x-grat.shape.r,grat.shape.y-grat.shape.r,grat.shape.x+grat.shape.r,grat.shape.y+3*grat.shape.r)
    judgeStyle(grat,ctx)
    ctx.closePath()
    ctx.restore()
}