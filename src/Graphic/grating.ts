import { Elements } from "../Element";
import { nameStyle, Opts, Shape, Style } from "../ezpsy";
import { judgeStyle } from "../Judge/judge";

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
            opts.shape.desity = 20
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
                lineWidth: 1
            }
        }

        nameId++
    }
}

export function makeGrat(grat: Grat,ctx: CanvasRenderingContext2D): Grat{
    let sh = grat.shape;
    // console.dir(sh)
    let num = sh.desity;
    let fill = ctx.createLinearGradient(sh.x-sh.r,sh.y-sh.r,sh.x-sh.r,sh.y+sh.r)
    fill.addColorStop(0,'white')
    for(let i = 1;i < num;i++){
        if(i%2 === 1){
            fill.addColorStop(i/num,'black')
        }
        else{
            fill.addColorStop(i/num,'white')
        }
    }
    fill.addColorStop(1,'white')
    grat.style.fill = fill
    ctx.beginPath();
    ctx.rect(sh.x-sh.r,sh.y-sh.r,sh.x+sh.r,sh.y+sh.r);
    judgeStyle(grat,ctx);
    ctx.closePath()
    ctx.globalCompositeOperation = 'destination-in'
    ctx.beginPath()
    ctx.fillStyle = 'black'
    ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI);
    ctx.fill()
    ctx.closePath();
    return grat;
}