import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { judgeStyle } from '../Judge/judge'

interface EllipseShape extends Shape{
    x: number,
    y: number,
    ra: number,
    rb: number
    //ra为横轴长 rb为纵轴长
}

interface EllipseOpts extends Opts{
    shape: EllipseShape
    style?: Style
}

let nameId = 0;

export class Ellipse extends Elements{
    private name?: nameStyle = {
        name: "ellipse" + nameId.toString(),
        graphicId: nameId
    }
    shape: EllipseShape
    constructor(opts: EllipseOpts){
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

export function makeEllipse(ellipse: Ellipse,ctx: CanvasRenderingContext2D): Ellipse{
    //max是等于1除以长轴值a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    let sh = ellipse.shape
    let step = (sh.ra > sh.rb) ? 1 / sh.ra : 1 / sh.rb;
    ctx.beginPath();
    ctx.moveTo(sh.x + sh.ra, sh.y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step)
    {
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctx.lineTo(sh.x + sh.ra * Math.cos(i), sh.y + sh.rb * Math.sin(i));
    }
    judgeStyle(ellipse,ctx);
    ctx.closePath();
    return ellipse
}

export function FillOval(ellipse: Ellipse,fill?: string): Ellipse{
    if(fill === undefined || typeof fill !== 'string')
    {
        fill = '#000'
    }
    let ellipse0 = new Ellipse({
        shape: {
            x: ellipse.shape.x,
            y: ellipse.shape.y,
            ra: ellipse.shape.ra,
            rb: ellipse.shape.rb
        },
        style: {
            fill: fill
        }
    })
    return ellipse0
}

export function FrameOval(ellipse: Ellipse,lineWidth?: number,stroke?: string): Ellipse{
    if(stroke === undefined || typeof stroke !== 'string')
    {
        stroke = '#000'
        if(lineWidth === undefined || typeof lineWidth !== 'number')
        {
            lineWidth = 5;
        }
    }
    let ellipse0 = new Ellipse({
        shape: {
            x: ellipse.shape.x,
            y: ellipse.shape.y,
            ra: ellipse.shape.ra,
            rb: ellipse.shape.rb
        },
        style: {
            lineWidth: lineWidth,
            stroke: stroke
        }
    })
    return ellipse0
}