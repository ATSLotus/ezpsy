import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { Group } from '../Group/group';
import { judgeStyle } from '../Judge/judge'

interface LineShape extends Shape{
    x: number,
    y: number,
    xEnd: number,
    yEnd: number
}

interface LineOpts extends Opts{
    shape: LineShape
    style?: Style
}

let nameId = 0;

export class Line extends Elements{
    private name?: nameStyle = {
        name: "line" + nameId.toString(),
        graphicId: nameId
    }
    shape: LineShape
    constructor(opts: LineOpts){
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

// export class line{
//     makeLine(line: Line,ctx: CanvasRenderingContext2D): Line{
//         let l = this.makeLine(line,ctx);
//         return l;
//     }
// }

export function makeLine(line: Line,ctx: CanvasRenderingContext2D): Line{
    let sh = line.shape;
    ctx.beginPath()
    ctx.moveTo(sh.x,sh.y)
    ctx.lineTo(sh.xEnd,sh.yEnd)
    judgeStyle(line,ctx)
    ctx.closePath()

    return line
}

export function DrawLines(el: Line[]|Group[]|Group): Group{
    //绘制多条线 opts:线条属性
    let group = new Group(el)
    return group
}

export function DrawMline([x,y,xEnd,yEnd]: [number,number,number,number],gap?: number[],style?: boolean,stipple?: boolean,widthGap?: number):Group{
    //绘制平行线 [x,y,xEnd,yEnd]初始线的两端坐标 gap线之间的间隔 style=false为水平平行,=true为竖直平行 stipple=false为实线,=true为虚线
    if(widthGap === undefined || typeof widthGap !== 'number')
    {
        widthGap = 10;
        if(stipple === undefined || typeof stipple !== 'boolean')
        {
            stipple === false
            if(style === undefined || typeof style !== 'boolean'){
                style = false;
                if(gap === undefined){
                    gap = [100,100]
                }
            }
        }
    }
    
    let opts = new Array();
    
    if(stipple === false)
    {
        opts[0] = new Line ({
            shape: {
                x: x,
                y: y,
                xEnd: xEnd,
                yEnd: yEnd
            }
        })
        if(style === false)
        {
            for(let i = 1;i < gap.length+1;i++){
                opts[i] = new Line({
                    shape: {
                        x: x,
                        y: y+gap[i-1]*i,
                        xEnd: xEnd,
                        yEnd: yEnd+gap[i-1]*i
                    }
                })
            }
        }
        else{
            for(let i = 1;i < gap.length+1;i++){
                opts[i] = new Line ({
                    shape: {
                        x: x+gap[i-1]*i,
                        y: y,
                        xEnd: xEnd+gap[i-1]*i,
                        yEnd: yEnd
                    }
                })
            }
        }
    }
    else{
        opts[0] = LineStipple([x,y,xEnd,yEnd],widthGap);
        if(style === false)
        {
            for(let i = 1;i<gap.length+1;i++)
            {
                opts[i] = LineStipple([x,y+gap[i-1]*i,xEnd,yEnd+gap[i-1]*i],widthGap)
            }
        }
        else{
            for(let i = 1;i<gap.length+1;i++)
            {
                opts[i] = LineStipple([x+gap[i-1]*i,y,xEnd+gap[i-1]*i,yEnd],widthGap)
            }
        }
    }
    
        
    
    let group = DrawLines(opts);
    return group
}

export function LineStipple([x,y,xEnd,yEnd]: [number,number,number,number],widthGap?: number):Group{
    //绘制平行线 [x,y,xEnd,yEnd]初始线的两端坐标 widthGap间隔 
    let linelength = Math.sqrt(Math.pow(xEnd-x,2)+Math.pow(yEnd-y,2))
    if(widthGap>linelength||widthGap===undefined)
    {
        widthGap = linelength/10;
    }
    let num = Math.floor(linelength/widthGap)
    let xg = widthGap*(xEnd-x)/linelength
    let yg = widthGap*(yEnd-y)/linelength
    // console.dir(num)
    let i = 0;
    let line = new Array();
    while(i<num)
    {
        line[i] = new Line({
            shape: {
                x: x+xg*i,
                y: y+yg*i,
                xEnd: x+xg*(i+1),
                yEnd: y+yg*(i+1)
            }
        })
        i+=2;
    }
    let LineStipple = new Group(line)
    return LineStipple
}

// export class Poly extends Group{
//     style: Style
//     constructor(el: Line[]|Group[]|Group,style?: Style){
//         super(el)
//         if(style)
//         {
//             this.style = style;
//         }
//         else{
//             this.style = {
//                 fill: "none",
//                 stroke: "#000",
//                 lineWidth: 1
//             }
//         }
//     }
// }