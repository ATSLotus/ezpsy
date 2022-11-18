import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { judgeStyle, judgeTRS } from '../Judge/judge'

interface PolygonShape extends Shape{
    //顺时针填写坐标或顺绘制路线填写坐标
    xA: number[]
    yA: number[]
}

interface PolygonOpts extends Opts{
    shape: PolygonShape
    style?: Style
}

let nameId = 0;

export class Polygon extends Elements{
    readonly name?: nameStyle = {
        name: "polygon" + nameId.toString(),
        graphicId: nameId
    }
    constructor(opts: PolygonOpts){
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

export function makePolygon(polygon: Polygon,ctx: CanvasRenderingContext2D): Polygon{
    let sh = polygon.shape
    let num = 0;
    if(sh.xA.length !== sh.yA.length)
    {
        num = Math.min(sh.xA.length,sh.yA.length)
    }
    else{
        num = sh.xA.length
    }
    ctx.save()
    ctx.beginPath()
    // judgeTRS(polygon) 
    ctx.moveTo(sh.xA[0],sh.yA[0])
    for(let i = 1;i < num;i++)
    {
        ctx.lineTo(sh.xA[i],sh.yA[i])
    }
    ctx.lineTo(sh.xA[0],sh.yA[0])
    judgeStyle(polygon,ctx)
    ctx.closePath()
    ctx.restore()
    return polygon
}

export function FramePoly(polygon: Polygon,lineWidth?: number,stroke?: string): Polygon{
    if(stroke === undefined || typeof stroke !== 'string')
    {
        stroke = '#000'
        if(lineWidth === undefined || typeof lineWidth !== 'number')
        {
            lineWidth = 5;
        }
    }
    let polygon0 = new Polygon({
        shape: {
            xA: polygon.shape.xA,
            yA: polygon.shape.yA,
        },
        style: {
            lineWidth: lineWidth,
            stroke: stroke
        }
    })
    return polygon0
}

export function FillPoly(polygon: Polygon,fill?: string): Polygon{
    if(fill === undefined || typeof fill !== 'string')
    {
        fill = '#000'
    }
    let polygon0 = new Polygon({
        shape: {
            xA: polygon.shape.xA,
            yA: polygon.shape.yA,
        },
        style: {
            fill: fill
        }
    })
    return polygon0
}