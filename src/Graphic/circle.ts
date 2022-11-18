import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { judgeStyle, judgeTRS } from '../Judge/judge'

interface CircleShape extends Shape{
    x: number,
    y: number,
    r: number
}

interface CircleOpts extends Opts{
    shape: CircleShape
    style?: Style
}

let nameId = 0;

export class Circle extends Elements{
    readonly name?: nameStyle = {
        name: "circle" + nameId.toString(),
        graphicId: nameId
    }
    declare shape: CircleShape
    constructor(opts: CircleOpts){
        super()
        this.shape = opts.shape;
        // this.ctx = super.ctx
        // console.dir(opts.style)
        if(opts.style)
        {
            this.style = opts.style;
        }
        else{
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            }
        }

        nameId++
    }
}

export function makeCircle(circle: Circle,ctx: CanvasRenderingContext2D): Circle{
    let sh = circle.shape
    ctx.save()
    ctx.beginPath()
    judgeTRS(circle)
    ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI);
    judgeStyle(circle,ctx);
    ctx.closePath()
    ctx.restore()
    return circle;
} 

export function DrawDots([x,y,r]: [number,number,number],color: string): Circle{
    let circle = new Circle({
        shape: {
            x: x,
            y: y,
            r: r
        },
        style: {
            fill: color,
            stroke : 'none'
        }
    })
    return circle
}