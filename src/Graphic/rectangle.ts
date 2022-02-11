import { ENETDOWN } from 'constants'
import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { judgeChangeType,judgeSide,judgeStyle } from '../Judge/judge'
import { Group } from '../Group/group'
import { Class } from 'estree' 
import {Elements} from '../Element'


interface RectangleShape extends Shape{
    x: number,
    y: number,
    width: number,
    height: number
}

interface RectangleOpts extends Opts{
    shape: RectangleShape
    style?: Style
}

class Center{
    rect: Rectangle
    x: number
    y: number
    constructor(rect: Rectangle){
        this.rect = rect;
        this.x = rect.shape.x + rect.shape.width / 2;
        this.y = rect.shape.y + rect.shape.height / 2;
    }
}

class Size{
    rect: Rectangle
    width: number
    height: number
    constructor(rect: Rectangle){
        this.rect = rect;
        this.width = rect.shape.width
        this.height = rect.shape.height
    }
}

class SideXY{
    x: number
    y: number
    constructor(){

    }
}

export class RectGroup extends Group {
    ParentsRect: Rectangle
    constructor(rect: Rectangle,el: Elements[]){
        super(el)
        this.ParentsRect = rect;
    }
}

let nameId = 0;

// class TypeTest implements RectangleShape{
//     x: number
//     y: number
//     width: number
//     height: number
// }

export class Rectangle extends Elements{
    private name?: nameStyle = {
        name: "rect" + nameId.toString(),
        graphicId: nameId
    }
    shape: RectangleShape
    constructor(opts: RectangleOpts){
        super()
        this.shape = opts.shape;
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

class logicRect extends Rectangle{
    rectParents0: Rectangle;
    rectParents1: Rectangle;
    constructor([x,y,width,height]: [number,number,number,number],rectParents0: Rectangle,rectParents1: Rectangle){
        super({shape:{
            x: x,
            y: y,
            width: width,
            height: height
        }})
        this.rectParents0 = rectParents0
        this.rectParents1 = rectParents1
    }
}

class clipRect extends logicRect{
    constructor([x,y,width,height]: [number,number,number,number],rectParents0: Rectangle,rectParents1: Rectangle){
        super([x,y,width,height],rectParents0,rectParents1)
    }
}

class unionRect extends logicRect{
    constructor([x,y,width,height]: [number,number,number,number],rectParents0: Rectangle,rectParents1: Rectangle){
        super([x,y,width,height],rectParents0,rectParents1)
    }
}

// function instanceofRectangle(e: any): e is RectangleShape{
//     return  in e;
// }

// export function makeRectangle(rect: Rectangle,ctx: CanvasRenderingContext2D): Rectangle{
//     let sh = rect.shape;
//     let st = rect.style;
//     let f,s;
//     // console.dir(st.stroke)
//     [ctx,f,s] = judgeStyle(rect,ctx);
//     if(st.fill !== 'none' && st.stroke != 'none'){
//         ctx.fillStyle = st.fill;
//         ctx.strokeStyle = st.stroke;
//         ctx.fillRect(sh.x,sh.y,sh.width,sh.height);
//         ctx.strokeRect(sh.x,sh.y,sh.width,sh.height);
//     }
//     else if(st.fill !== 'none' && st.stroke === 'none'){
//         ctx.fillStyle = st.fill;
//         ctx.fillRect(sh.x,sh.y,sh.width,sh.height);
//     }
//     else if(st.fill === 'none' && st.stroke !== 'none'){
//         ctx.strokeStyle = st.stroke;
//         ctx.rect(sh.x,sh.y,sh.width,sh.height);
//         ctx.stroke();
//     }
//     else{
//         console.dir("error!It can't paint a rectangle without fillStyle and strokeStyle")
//     }
    
//     return rect;
// }

export function makeRectangle(rect: Rectangle,ctx: CanvasRenderingContext2D): Rectangle{
    let sh = rect.shape;
    ctx.beginPath();
    ctx.rect(sh.x,sh.y,sh.width,sh.height);
    judgeStyle(rect,ctx);
    ctx.closePath();
    return rect;
}

export function AdjoinRect(fixedRect: Rectangle,rect: Rectangle,fixedStyle?: string|number): Rectangle{
    //矩形拼接 fixedRect基准矩形 rect待拼接矩形 fixedStyle 拼接形式
    let newRect;
    if(!fixedStyle)
    {
        fixedStyle = 'RECTLEFT'
    }
    let f = judgeChangeType(fixedStyle);
    // console.dir('f='+f);
    if(f === 1){
        newRect = Rect_Left(fixedRect,rect);
        // console.dir(newRect)
    }
    else if(f === 2){
        newRect = Rect_Top(fixedRect,rect);
    }
    else if(f === 3){
        newRect = Rect_Right(fixedRect,rect);
    }
    else if(f === 4){
        newRect = Rect_Bottom(fixedRect,rect);
    }
    else{
        console.dir('Error! Please use the right order!')
    }
    
    
    return newRect
}

function Rect_Left(fixedRect: Rectangle,rect: Rectangle):Rectangle {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x - rect.shape.width,
            y: fixedRect.shape.y + (fixedRect.shape.height - rect.shape.height)/2,
            width: rect.shape.width,
            height: rect.shape.height
        }
    })
    return newRect
}

function Rect_Right(fixedRect: Rectangle,rect: Rectangle):Rectangle {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + fixedRect.shape.width,
            y: fixedRect.shape.y + (fixedRect.shape.height - rect.shape.height)/2,
            width: rect.shape.width,
            height: rect.shape.height
        }
    })
    return newRect
}

function Rect_Top(fixedRect: Rectangle,rect: Rectangle): Rectangle{
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + (fixedRect.shape.width - rect.shape.width)/2,
            y: fixedRect.shape.y - rect.shape.height,
            width: rect.shape.width,
            height: rect.shape.height
        }
    })
    return newRect
}

function Rect_Bottom(fixedRect: Rectangle,rect: Rectangle): Rectangle{
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + (fixedRect.shape.width - rect.shape.width)/2,
            y: fixedRect.shape.y + fixedRect.shape.height,
            width: rect.shape.width,
            height: rect.shape.height
        }
    })
    return newRect
}

export function RectCenter(rect: Rectangle): Center{
    //获取矩形中心
    let center = new Center(rect);
    return center;
}

export function AlignRect(fixedRect: Rectangle,rect: Rectangle,side0?: number|string,side1?: number|string): Rectangle{
    //矩形对齐 fixedRect基准矩形 rect待对齐矩形 fixedStyle 对齐形式
    if(side0 === undefined){
        side0 = 0
        side1 = 0
    }
    if(side1 === undefined){
        side1 = 0
    }

    if(rect.shape.width*rect.shape.height > fixedRect.shape.width*fixedRect.shape.height )
    {
        console.dir('Error!The area of fiexedRect  is smaller than the rect!')
        return null;
    }
    else{
        let [f0,f1] = judgeSide(side0,side1);
        // console.dir(f0+" "+f1);
        let newRect = new Rectangle({
            shape:{
                x: 0,
                y: 0,
                width: 100,
                height: 100
            }
        });
        let s = new SideXY();
        if(f0 === 0)
        {
            if(f1 === 1 || f1 === 1 || f1 === 3)
            {
                s.x = AlignXY(fixedRect,rect,f1).x;
                s.y = AlignXY(fixedRect,rect,f0).y;
            }
            else{
                s.y = AlignXY(fixedRect,rect,f1).y;
                s.x = AlignXY(fixedRect,rect,f0).x;
            }
        }
        else if(f0 === 1 || f0 === 3)
        {
            s.x = AlignXY(fixedRect,rect,f0).x;
            s.y = AlignXY(fixedRect,rect,f1).y;
        }
        else{
            s.y = AlignXY(fixedRect,rect,f0).y;
            s.x = AlignXY(fixedRect,rect,f1).x;
        }
        // console.dir(s)
        
        newRect.shape.x = s.x;
        newRect.shape.y = s.y;
        return newRect;
    }
    
    
}

function AlignXY(fixedRect: Rectangle,rect: Rectangle,f: number): SideXY{
    let s = new SideXY()
    let center = new Center(fixedRect);
    // console.dir(center)
    if(f === 0)
    {   
        s.x = center.x - rect.shape.width/2
        s.y = center.y - rect.shape.height/2
    }
    else if(f === 1)
    {
        s.x = center.x - fixedRect.shape.width/2
    }
    else if(f === 2)
    {
        s.y = center.y - fixedRect.shape.height/2
    }
    else if(f === 3)
    {
        s.x = center.x + fixedRect.shape.width/2 - rect.shape.width
    }
    else if(f === 4)
    {
        s.y = center.y + fixedRect.shape.height/2 - rect.shape.height
    }
    else{
        console.dir('Error! Please use the right instruction!')
    }
    return s
}

export function OffsetRect(rect: Rectangle,[x,y]: [number,number]): Rectangle{
    //矩形平移
    let newRect = new Rectangle({
        shape: {
            x: x,
            y: y,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });

    return newRect
}

export function ArrangeRects(n: number,[xNumber,yNumber]: [number,number],windowRect: Rectangle,style?: number): RectGroup{
    //创建矩形阵列
    let rect = new Array();
    
    let num = xNumber * yNumber
    let x = windowRect.shape.x
    let y = windowRect.shape.y
    let width = windowRect.shape.width / xNumber
    let height = windowRect.shape.height / yNumber
    // console.dir([x,y,width,height])

    if(n > num){
        n = num
    }

    if(style === undefined)
    {
        style = 0;
    }

    if(style > 1)
    {
        style = 0
    }

    if(style === 0)
    {
        for(let i = 0;i < xNumber;i++)
        {
            for(let j = 0;j < yNumber;j++)
            {
                if(i*xNumber+j < n)
                {
                    rect[i*xNumber+j] = new Rectangle({
                        shape: {
                            x: x + width * j,
                            y: y + height * i,
                            width: width,
                            height: height
                        }
                    })
                }
                else{
                    break;
                }
                
            }
        }
    }
    else
    {
        for(let i = 0;i < xNumber;i++)
        {
            for(let j = 0;j < yNumber;j++)
            {
                if(i*xNumber+j < n)
                {
                    rect[i*xNumber+j] = new Rectangle({
                        shape: {
                            x: x + windowRect.shape.width - width - width * j,
                            y: y + height * i,
                            width: width,
                            height: height
                        }
                    })
                }
            }
        }
    }

    

    // console.dir(rect)

    let rectGroup = new RectGroup(windowRect,rect);
    return rectGroup
}

export function CenterRect(fixedRect: Rectangle,rect: Rectangle): Rectangle{
    //移动矩形至某矩形中心 fixedRect基准矩形 rect待操作矩形 fixedStyle 拼接形式
    let newRect = AlignRect(fixedRect,rect,0,0);
    return newRect
}

export function CenterRectOnPoint(rect: Rectangle,[x,y]: [number,number]): Rectangle{
    let newRect = OffsetRect(rect,[x,y])
    return newRect
}

export function RectWidth(rect: Rectangle): number{
    //获取矩形宽度
    let width = rect.shape.width
    return width
}

export function RectHeight(rect: Rectangle): number{
    //获取矩形高度
    let height = rect.shape.height
    return height;
}

export function RectSize(rect: Rectangle): Size{
    //获取矩形宽高
    let size = new Size(rect)
    return size;
}

// export function ClipRect(rect0: Rectangle,rect1: Rectangle): clipRect{
//     //矩形重叠区域
//     let [x0,y0,w0,h0] = [rect0.shape.x,rect0.shape.y,rect0.shape.width,rect0.shape.height]
//     let [x1,y1,w1,h1] = [rect1.shape.x,rect1.shape.y,rect1.shape.width,rect1.shape.height]
//     let Rect,xn,yn,wn,hn;
//     let area0 = w0 * h0;
//     let area1 = w1 * h1;
//     let x,y,w,h
//     let xt,yt,wt,ht,rect
//     if(area0 >= area1)
//     {
//         [x,y,w,h] = [x1,y1,w1,h1];
//         [xt,yt,wt,ht] = [x0,y0,w0,h0];
//         rect = rect0;
//     }
//     else{
//         [x,y,w,h] = [x0,y0,w0,h0];
//         [xt,yt,wt,ht] = [x1,y1,w1,h1];
//         rect = rect1;
//     }
//     console.dir([x,y,w,h]);
//     console.dir([xt,yt,wt,ht])
//     if(!IsInRect([x,y],rect) && !IsInRect([x+w,y+h],rect) && !IsInRect([x+w,y],rect) && !IsInRect([x,y+h],rect)){
//         Rect = [0,0,0,0]
//     }
//     else{
//         wn = Math.abs(Math.min(x0 + w0 ,x1 + w1) - Math.max(x0, x1))
//         hn = Math.abs(Math.min(y0 + h0, y1 + h1) - Math.max(y0, y1))
//         if(IsInRect([x,y],rect)){
//             xn = x;
//             yn = y;
//         }
//         else if((x >= xt && x<=xt+wt) && (y < yt || y > yt+ht)){
//             xn = x;
//             yn = y + (h - hn);
//         }
//         else if((x < xt || x > xt+wt) && (y >= yt && y <= yt+ht)){
//             xn = x + (w - wn)
//             yn = y
//         }
//         else{
//             xn = x + (w - wn)
//             yn = y + (h - hn)
//         }
        
//         Rect = [xn,yn,wn,hn];
        
//     }

//     let newRect = new clipRect(Rect,rect0,rect1);

//     return newRect;

// }

export function ClipRect(rect0: Rectangle,rect1: Rectangle): clipRect{
    //矩形重叠区域
    let newRect,Rect
    let xl0,xr0,yt0,yb0;
    let xl1,xr1,yt1,yb1;
    let x,y,w,h
    [xl0,xr0,yt0,yb0] = [RectLeft(rect0),RectRight(rect0),RectTop(rect0),RectBotom(rect0)];
    [xl1,xr1,yt1,yb1] = [RectLeft(rect1),RectRight(rect1),RectTop(rect1),RectBotom(rect1)];
    if(IsInRect([xl0,yt0],rect1) || IsInRect([xr0,yt0],rect1) || IsInRect([xl0,yb0],rect1) || IsInRect([xr0,yb0],rect1) || IsInRect([xl1,yt1],rect0) || IsInRect([xr1,yt1],rect0) || IsInRect([xl1,yb1],rect0) || IsInRect([xr1,yb1],rect0))
    {
        x = Math.max(xl0,xl1);
        y = Math.max(yt0,yt1);
        w = Math.min(xr0,xr1) - x;
        h = Math.min(yb0,yb1) - y;
        Rect = [x,y,w,h]
    }
    else{
        Rect = [0,0,0,0]
    }

    newRect = new clipRect(Rect,rect0,rect1);

    return newRect;

}

export function IsInRect([x,y]: [number,number],rect: Rectangle): boolean{
    //判断点是否在矩形内
    let [x0,y0,w0,h0] = [rect.shape.x,rect.shape.y,rect.shape.width,rect.shape.height]
    if(x >= x0 && x<=x0+w0 && y >= y0 && y <= y0+h0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

export function GrowRect(el: Rectangle/*|RectGroup|Group*/,h: number,v: number): Rectangle{
    //正放负缩 
    // if(el instanceof Rectangle)
    // {
        let newRect = new Rectangle({
            shape:{
                x:el.shape.x - h,
                y:el.shape.width + 2*h,
                width:el.shape.y - v,
                height:el.shape.height + 2*v
            }
        })
        return newRect
        
    // }
    // else if(el instanceof RectGroup)
    // {
    //     el.ParentsRect.shape.x -= h;
    //     el.ParentsRect.shape.width += 2*h;
    //     el.ParentsRect.shape.y -= v;
    //     el.ParentsRect.shape.height += 2*v;
    //     for(let i = 0;i < el.length;i++)
    //     {
    //         el.groupList[i].shape.x -= h;
    //         el.groupList[i].shape.width += 2*h;
    //         el.groupList[i].shape.y -= v;
    //         el.groupList[i].shape.height += 2*v;
    //     }
    // }
    // else if(el instanceof Group){
    //     for(let i = 0;i < el.length;i++)
    //     {
    //         el.groupList[i].shape.x -= h;
    //         el.groupList[i].shape.width += 2*h;
    //         el.groupList[i].shape.y -= v;
    //         el.groupList[i].shape.height += 2*v;
    //     }
    // }
    // else{
    //     console.dir("类型错误")
    // }
}       

export function InsetRect(el: Rectangle,h: number,v: number): Rectangle{
    //正缩负放
    let newRect = new Rectangle({
        shape: {
            x:el.shape.x += h,
            y:el.shape.width -= 2*h,
            width:el.shape.y += v,
            height:el.shape.height -= 2*v
        }
    })
    return newRect
}

export function ScaleRect(rect: Rectangle,h: number,v: number): Rectangle{
    //比例缩放
    let h0 = rect.shape.width * (h-1) / 2
    let v0 = rect.shape.height * (v-1) / 2
    console.dir(h0+' '+v0)
    let newRect = GrowRect(rect,h0,v0)
    return newRect
}

export function IsEmptyRect(rect: Rectangle): boolean{
    //判断矩阵是否为空
    let area = rect.shape.width * rect.shape.height;
    if(area === 0)
    {
        return false
    }
    else{
        return true
    }
}

export function RectOfMatrix(){

}

export function RectLeft(rect: Rectangle): number{
    return rect.shape.x
}

export function RectRight(rect: Rectangle): number{
    return rect.shape.x + rect.shape.width
}

export function RectTop(rect: Rectangle): number{
    return rect.shape.y
}

export function RectBotom(rect: Rectangle): number{
    return rect.shape.y + rect.shape.height
}

export function UnionRect(rect0: Rectangle,rect1: Rectangle): unionRect{
    let newRect;
    let xl0,xr0,yt0,yb0;
    let xl1,xr1,yt1,yb1;
    let x,y,w,h
    [xl0,xr0,yt0,yb0] = [RectLeft(rect0),RectRight(rect0),RectTop(rect0),RectBotom(rect0)];
    [xl1,xr1,yt1,yb1] = [RectLeft(rect1),RectRight(rect1),RectTop(rect1),RectBotom(rect1)];
    x = Math.min(xl0,xl1);
    y = Math.min(yt0,yt1);
    w = Math.max(xr0,xr1) - x;
    h = Math.max(yb0,yb1) - y;
    newRect = new unionRect([x,y,w,h],rect0,rect1);
    return newRect
}

export function FillRect(rect: Rectangle,fill?: string): Rectangle{
    if(fill === undefined || typeof fill !== 'string')
    {
        fill = '#000'
    }
    let rect0 = new Rectangle({
        shape: {
            x: rect.shape.x,
            y: rect.shape.y,
            width: rect.shape.width,
            height: rect.shape.height
        },
        style: {
            fill: fill
        }
    })
    return rect0
}

export function FrameRect(rect: Rectangle,lineWidth?: number,stroke?: string): Rectangle{
    if(stroke === undefined || typeof stroke !== 'string')
    {
        stroke = '#000'
        if(lineWidth === undefined || typeof lineWidth !== 'number')
        {
            lineWidth = 5;
        }
    }
    let rect0 = new Rectangle({
        shape: {
            x: rect.shape.x,
            y: rect.shape.y,
            width: rect.shape.width,
            height: rect.shape.height
        },
        style: {
            lineWidth: lineWidth,
            stroke: stroke
        }
    })
    return rect0
}