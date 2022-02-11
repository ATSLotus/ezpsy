import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { Group } from '../Group/group';
import { judgeStyle } from '../Judge/judge'

interface ArcShape extends Shape{
    x: number,
    y: number,
    r: number,
    ang_f: number,
    ang_e: number
}

interface ArcOpts extends Opts{
    shape: ArcShape
    style?: Style
}

let nameId = 0;

export class Arc extends Elements{
    private name?: nameStyle = {
        name: "arc" + nameId.toString(),
        graphicId: nameId
    }
    constructor(opts: ArcOpts){
        super()
        this.shape = opts.shape;
        // console.dir(opts.style)
        if(opts.style)
        {
            this.style = opts.style;
        }
        else{
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            }
        }

        nameId++
    }
}

export function makeArc(arc: Arc,ctx: CanvasRenderingContext2D): Arc{
    let st = arc.style
    if(st.fill === undefined || st.fill === 'none' || st.fill === '#fff')
    {
        makeFrameArc(arc,ctx);
    }
    else{
        makeFillArc(arc,ctx);
    }
    return arc;
}

function makeFrameArc(arc: Arc,ctx: CanvasRenderingContext2D){
    let sh = arc.shape
    ctx.beginPath()
    ctx.arc(sh.x,sh.y,sh.r,sh.ang_f,sh.ang_e);
    judgeStyle(arc,ctx);
    ctx.closePath()
}

function makeFillArc(arc: Arc,ctx: CanvasRenderingContext2D){
    let sh = arc.shape
    ctx.beginPath()
    ctx.moveTo(sh.x,sh.y)
    ctx.lineTo(sh.x+sh.r*Math.cos(sh.ang_f),sh.y+sh.r*Math.sin(sh.ang_f));
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    ctx.closePath()

    // ctx.beginPath()
    ctx.moveTo(sh.x,sh.y)
    ctx.lineTo(sh.x+sh.r*Math.cos(sh.ang_e),sh.y+sh.r*Math.sin(sh.ang_e));
    ctx.strokeStyle = "#fff"
    ctx.stroke()
    ctx.closePath()

    // ctx.beginPath()
    ctx.arc(sh.x,sh.y,sh.r,sh.ang_f,sh.ang_e);
    judgeStyle(arc,ctx);
    
    ctx.closePath()
}

export function FrameArc(arc: Arc,lineWidth?: number,stroke?: string): Arc{
    //画粗线弧 
    if(stroke === undefined || typeof stroke !== 'string')
    {
        stroke = '#000'
        if(lineWidth === undefined || typeof lineWidth !== 'number')
        {
            lineWidth = 5;
        }
    }
    

    // judgeStyle_ezsy(arc)

    let arc0 = new Arc({
        shape: {
            x: arc.shape.x,
            y: arc.shape.y,
            r: arc.shape.r,
            ang_f: arc.shape.ang_f,
            ang_e: arc.shape.ang_e
        },
        style: {
            lineWidth: lineWidth,
            stroke: stroke
        }
    })

    return arc0
}

export function FillArc(arc: Arc,fill?: string): Arc{
    if(fill === undefined || typeof fill !== 'string')
    {
        fill = '#000'
    }

    let arc0 = new Arc({
        shape: {
            x: arc.shape.x,
            y: arc.shape.y,
            r: arc.shape.r,
            ang_f: arc.shape.ang_f,
            ang_e: arc.shape.ang_e
        },
        style: {
            fill: fill
        }
    })

    return arc0
}