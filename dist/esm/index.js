let idStart = 0;
function Count() {
    return idStart++;
}

let groupId = 0;
class Group {
    id;
    length;
    groupList;
    constructor(el) {
        this.id = groupId;
        if (el instanceof Group) {
            this.length = 1;
        }
        else {
            this.length = el.length;
        }
        this.groupList = el;
        groupId++;
    }
}

class Elements {
    shape;
    style;
    constructor() {
    }
    noFill() {
        this.style.fill = 'none';
    }
    noStroke() {
        this.style.lineWidth = 0;
        // if(this.style.fill !== 'none' && this.style.fill !== undefined){
        //     this.style.stroke = this.style.fill
        // }
        // else{
        //     this.style.stroke = "#fff";
        //     console.dir('Error!')
        // }
        this.style.stroke = 'none';
    }
}

class Center {
    rect;
    x;
    y;
    constructor(rect) {
        this.rect = rect;
        this.x = rect.shape.x + rect.shape.width / 2;
        this.y = rect.shape.y + rect.shape.height / 2;
    }
}
class Size {
    rect;
    width;
    height;
    constructor(rect) {
        this.rect = rect;
        this.width = rect.shape.width;
        this.height = rect.shape.height;
    }
}
class SideXY {
    x;
    y;
    constructor() {
    }
}
class RectGroup extends Group {
    ParentsRect;
    constructor(rect, el) {
        super(el);
        this.ParentsRect = rect;
    }
}
let nameId$7 = 0;
// class TypeTest implements RectangleShape{
//     x: number
//     y: number
//     width: number
//     height: number
// }
class Rectangle extends Elements {
    name = {
        name: "rect" + nameId$7.toString(),
        graphicId: nameId$7
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$7++;
    }
}
class logicRect extends Rectangle {
    rectParents0;
    rectParents1;
    constructor([x, y, width, height], rectParents0, rectParents1) {
        super({ shape: {
                x: x,
                y: y,
                width: width,
                height: height
            } });
        this.rectParents0 = rectParents0;
        this.rectParents1 = rectParents1;
    }
}
class clipRect extends logicRect {
    constructor([x, y, width, height], rectParents0, rectParents1) {
        super([x, y, width, height], rectParents0, rectParents1);
    }
}
class unionRect extends logicRect {
    constructor([x, y, width, height], rectParents0, rectParents1) {
        super([x, y, width, height], rectParents0, rectParents1);
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
function makeRectangle(rect, ctx) {
    let sh = rect.shape;
    ctx.beginPath();
    ctx.rect(sh.x, sh.y, sh.width, sh.height);
    judgeStyle(rect, ctx);
    ctx.closePath();
    return rect;
}
function AdjoinRect(fixedRect, rect, fixedStyle) {
    //矩形拼接 fixedRect基准矩形 rect待拼接矩形 fixedStyle 拼接形式
    let newRect;
    if (!fixedStyle) {
        fixedStyle = 'RECTLEFT';
    }
    let f = judgeChangeType(fixedStyle);
    // console.dir('f='+f);
    if (f === 1) {
        newRect = Rect_Left(fixedRect, rect);
        // console.dir(newRect)
    }
    else if (f === 2) {
        newRect = Rect_Top(fixedRect, rect);
    }
    else if (f === 3) {
        newRect = Rect_Right(fixedRect, rect);
    }
    else if (f === 4) {
        newRect = Rect_Bottom(fixedRect, rect);
    }
    else {
        console.dir('Error! Please use the right order!');
    }
    return newRect;
}
function Rect_Left(fixedRect, rect) {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x - rect.shape.width,
            y: fixedRect.shape.y + (fixedRect.shape.height - rect.shape.height) / 2,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });
    return newRect;
}
function Rect_Right(fixedRect, rect) {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + fixedRect.shape.width,
            y: fixedRect.shape.y + (fixedRect.shape.height - rect.shape.height) / 2,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });
    return newRect;
}
function Rect_Top(fixedRect, rect) {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + (fixedRect.shape.width - rect.shape.width) / 2,
            y: fixedRect.shape.y - rect.shape.height,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });
    return newRect;
}
function Rect_Bottom(fixedRect, rect) {
    let newRect = new Rectangle({
        shape: {
            x: fixedRect.shape.x + (fixedRect.shape.width - rect.shape.width) / 2,
            y: fixedRect.shape.y + fixedRect.shape.height,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });
    return newRect;
}
function RectCenter(rect) {
    //获取矩形中心
    let center = new Center(rect);
    return center;
}
function AlignRect(fixedRect, rect, side0, side1) {
    //矩形对齐 fixedRect基准矩形 rect待对齐矩形 fixedStyle 对齐形式
    if (side0 === undefined) {
        side0 = 0;
        side1 = 0;
    }
    if (side1 === undefined) {
        side1 = 0;
    }
    if (rect.shape.width * rect.shape.height > fixedRect.shape.width * fixedRect.shape.height) {
        console.dir('Error!The area of fiexedRect  is smaller than the rect!');
        return null;
    }
    else {
        let [f0, f1] = judgeSide(side0, side1);
        // console.dir(f0+" "+f1);
        let newRect = new Rectangle({
            shape: {
                x: 0,
                y: 0,
                width: 100,
                height: 100
            }
        });
        let s = new SideXY();
        if (f0 === 0) {
            if (f1 === 1 || f1 === 1 || f1 === 3) {
                s.x = AlignXY(fixedRect, rect, f1).x;
                s.y = AlignXY(fixedRect, rect, f0).y;
            }
            else {
                s.y = AlignXY(fixedRect, rect, f1).y;
                s.x = AlignXY(fixedRect, rect, f0).x;
            }
        }
        else if (f0 === 1 || f0 === 3) {
            s.x = AlignXY(fixedRect, rect, f0).x;
            s.y = AlignXY(fixedRect, rect, f1).y;
        }
        else {
            s.y = AlignXY(fixedRect, rect, f0).y;
            s.x = AlignXY(fixedRect, rect, f1).x;
        }
        // console.dir(s)
        newRect.shape.x = s.x;
        newRect.shape.y = s.y;
        return newRect;
    }
}
function AlignXY(fixedRect, rect, f) {
    let s = new SideXY();
    let center = new Center(fixedRect);
    // console.dir(center)
    if (f === 0) {
        s.x = center.x - rect.shape.width / 2;
        s.y = center.y - rect.shape.height / 2;
    }
    else if (f === 1) {
        s.x = center.x - fixedRect.shape.width / 2;
    }
    else if (f === 2) {
        s.y = center.y - fixedRect.shape.height / 2;
    }
    else if (f === 3) {
        s.x = center.x + fixedRect.shape.width / 2 - rect.shape.width;
    }
    else if (f === 4) {
        s.y = center.y + fixedRect.shape.height / 2 - rect.shape.height;
    }
    else {
        console.dir('Error! Please use the right instruction!');
    }
    return s;
}
function OffsetRect(rect, [x, y]) {
    //矩形平移
    let newRect = new Rectangle({
        shape: {
            x: x,
            y: y,
            width: rect.shape.width,
            height: rect.shape.height
        }
    });
    return newRect;
}
function ArrangeRects(n, [xNumber, yNumber], windowRect, style) {
    //创建矩形阵列
    let rect = new Array();
    let num = xNumber * yNumber;
    let x = windowRect.shape.x;
    let y = windowRect.shape.y;
    let width = windowRect.shape.width / xNumber;
    let height = windowRect.shape.height / yNumber;
    // console.dir([x,y,width,height])
    if (n > num) {
        n = num;
    }
    if (style === undefined) {
        style = 0;
    }
    if (style > 1) {
        style = 0;
    }
    if (style === 0) {
        for (let i = 0; i < xNumber; i++) {
            for (let j = 0; j < yNumber; j++) {
                if (i * xNumber + j < n) {
                    rect[i * xNumber + j] = new Rectangle({
                        shape: {
                            x: x + width * j,
                            y: y + height * i,
                            width: width,
                            height: height
                        }
                    });
                }
                else {
                    break;
                }
            }
        }
    }
    else {
        for (let i = 0; i < xNumber; i++) {
            for (let j = 0; j < yNumber; j++) {
                if (i * xNumber + j < n) {
                    rect[i * xNumber + j] = new Rectangle({
                        shape: {
                            x: x + windowRect.shape.width - width - width * j,
                            y: y + height * i,
                            width: width,
                            height: height
                        }
                    });
                }
            }
        }
    }
    // console.dir(rect)
    let rectGroup = new RectGroup(windowRect, rect);
    return rectGroup;
}
function CenterRect(fixedRect, rect) {
    //移动矩形至某矩形中心 fixedRect基准矩形 rect待操作矩形 fixedStyle 拼接形式
    let newRect = AlignRect(fixedRect, rect, 0, 0);
    return newRect;
}
function CenterRectOnPoint(rect, [x, y]) {
    let newRect = OffsetRect(rect, [x, y]);
    return newRect;
}
function RectWidth(rect) {
    //获取矩形宽度
    let width = rect.shape.width;
    return width;
}
function RectHeight(rect) {
    //获取矩形高度
    let height = rect.shape.height;
    return height;
}
function RectSize(rect) {
    //获取矩形宽高
    let size = new Size(rect);
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
function ClipRect(rect0, rect1) {
    //矩形重叠区域
    let newRect, Rect;
    let xl0, xr0, yt0, yb0;
    let xl1, xr1, yt1, yb1;
    let x, y, w, h;
    [xl0, xr0, yt0, yb0] = [RectLeft(rect0), RectRight(rect0), RectTop(rect0), RectBotom(rect0)];
    [xl1, xr1, yt1, yb1] = [RectLeft(rect1), RectRight(rect1), RectTop(rect1), RectBotom(rect1)];
    if (IsInRect([xl0, yt0], rect1) || IsInRect([xr0, yt0], rect1) || IsInRect([xl0, yb0], rect1) || IsInRect([xr0, yb0], rect1) || IsInRect([xl1, yt1], rect0) || IsInRect([xr1, yt1], rect0) || IsInRect([xl1, yb1], rect0) || IsInRect([xr1, yb1], rect0)) {
        x = Math.max(xl0, xl1);
        y = Math.max(yt0, yt1);
        w = Math.min(xr0, xr1) - x;
        h = Math.min(yb0, yb1) - y;
        Rect = [x, y, w, h];
    }
    else {
        Rect = [0, 0, 0, 0];
    }
    newRect = new clipRect(Rect, rect0, rect1);
    return newRect;
}
function IsInRect([x, y], rect) {
    //判断点是否在矩形内
    let [x0, y0, w0, h0] = [rect.shape.x, rect.shape.y, rect.shape.width, rect.shape.height];
    if (x >= x0 && x <= x0 + w0 && y >= y0 && y <= y0 + h0) {
        return true;
    }
    else {
        return false;
    }
}
function GrowRect(el /*|RectGroup|Group*/, h, v) {
    //正放负缩 
    // if(el instanceof Rectangle)
    // {
    let newRect = new Rectangle({
        shape: {
            x: el.shape.x - h,
            y: el.shape.width + 2 * h,
            width: el.shape.y - v,
            height: el.shape.height + 2 * v
        }
    });
    return newRect;
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
function InsetRect(el, h, v) {
    //正缩负放
    let newRect = new Rectangle({
        shape: {
            x: el.shape.x += h,
            y: el.shape.width -= 2 * h,
            width: el.shape.y += v,
            height: el.shape.height -= 2 * v
        }
    });
    return newRect;
}
function ScaleRect(rect, h, v) {
    //比例缩放
    let h0 = rect.shape.width * (h - 1) / 2;
    let v0 = rect.shape.height * (v - 1) / 2;
    console.dir(h0 + ' ' + v0);
    let newRect = GrowRect(rect, h0, v0);
    return newRect;
}
function IsEmptyRect(rect) {
    //判断矩阵是否为空
    let area = rect.shape.width * rect.shape.height;
    if (area === 0) {
        return false;
    }
    else {
        return true;
    }
}
function RectOfMatrix() {
}
function RectLeft(rect) {
    return rect.shape.x;
}
function RectRight(rect) {
    return rect.shape.x + rect.shape.width;
}
function RectTop(rect) {
    return rect.shape.y;
}
function RectBotom(rect) {
    return rect.shape.y + rect.shape.height;
}
function UnionRect(rect0, rect1) {
    let newRect;
    let xl0, xr0, yt0, yb0;
    let xl1, xr1, yt1, yb1;
    let x, y, w, h;
    [xl0, xr0, yt0, yb0] = [RectLeft(rect0), RectRight(rect0), RectTop(rect0), RectBotom(rect0)];
    [xl1, xr1, yt1, yb1] = [RectLeft(rect1), RectRight(rect1), RectTop(rect1), RectBotom(rect1)];
    x = Math.min(xl0, xl1);
    y = Math.min(yt0, yt1);
    w = Math.max(xr0, xr1) - x;
    h = Math.max(yb0, yb1) - y;
    newRect = new unionRect([x, y, w, h], rect0, rect1);
    return newRect;
}
function FillRect(rect, fill) {
    if (fill === undefined || typeof fill !== 'string') {
        fill = '#000';
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
    });
    return rect0;
}
function FrameRect(rect, lineWidth, stroke) {
    if (stroke === undefined || typeof stroke !== 'string') {
        stroke = '#000';
        if (lineWidth === undefined || typeof lineWidth !== 'number') {
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
    });
    return rect0;
}

let nameId$6 = 0;
class Circle extends Elements {
    name = {
        name: "circle" + nameId$6.toString(),
        graphicId: nameId$6
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$6++;
    }
}
function makeCircle(circle, ctx) {
    let sh = circle.shape;
    ctx.beginPath();
    ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI);
    judgeStyle(circle, ctx);
    ctx.closePath();
    return circle;
}
function DrawDots([x, y, r], color) {
    let circle = new Circle({
        shape: {
            x: x,
            y: y,
            r: r
        },
        style: {
            fill: color,
            stroke: 'none'
        }
    });
    return circle;
}

let nameId$5 = 0;
class Line extends Elements {
    name = {
        name: "line" + nameId$5.toString(),
        graphicId: nameId$5
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$5++;
    }
}
// export class line{
//     makeLine(line: Line,ctx: CanvasRenderingContext2D): Line{
//         let l = this.makeLine(line,ctx);
//         return l;
//     }
// }
function makeLine(line, ctx) {
    let sh = line.shape;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.xEnd, sh.yEnd);
    judgeStyle(line, ctx);
    ctx.closePath();
    return line;
}
function DrawLines(el) {
    //绘制多条线 opts:线条属性
    let group = new Group(el);
    return group;
}
function DrawMline([x, y, xEnd, yEnd], gap, style, stipple, widthGap) {
    //绘制平行线 [x,y,xEnd,yEnd]初始线的两端坐标 gap线之间的间隔 style=false为水平平行,=true为竖直平行 stipple=false为实线,=true为虚线
    if (widthGap === undefined || typeof widthGap !== 'number') {
        widthGap = 10;
        if (stipple === undefined || typeof stipple !== 'boolean') {
            if (style === undefined || typeof style !== 'boolean') {
                style = false;
                if (gap === undefined) {
                    gap = [100, 100];
                }
            }
        }
    }
    let opts = new Array();
    if (stipple === false) {
        opts[0] = new Line({
            shape: {
                x: x,
                y: y,
                xEnd: xEnd,
                yEnd: yEnd
            }
        });
        if (style === false) {
            for (let i = 1; i < gap.length + 1; i++) {
                opts[i] = new Line({
                    shape: {
                        x: x,
                        y: y + gap[i - 1] * i,
                        xEnd: xEnd,
                        yEnd: yEnd + gap[i - 1] * i
                    }
                });
            }
        }
        else {
            for (let i = 1; i < gap.length + 1; i++) {
                opts[i] = new Line({
                    shape: {
                        x: x + gap[i - 1] * i,
                        y: y,
                        xEnd: xEnd + gap[i - 1] * i,
                        yEnd: yEnd
                    }
                });
            }
        }
    }
    else {
        opts[0] = LineStipple([x, y, xEnd, yEnd], widthGap);
        if (style === false) {
            for (let i = 1; i < gap.length + 1; i++) {
                opts[i] = LineStipple([x, y + gap[i - 1] * i, xEnd, yEnd + gap[i - 1] * i], widthGap);
            }
        }
        else {
            for (let i = 1; i < gap.length + 1; i++) {
                opts[i] = LineStipple([x + gap[i - 1] * i, y, xEnd + gap[i - 1] * i, yEnd], widthGap);
            }
        }
    }
    let group = DrawLines(opts);
    return group;
}
function LineStipple([x, y, xEnd, yEnd], widthGap) {
    //绘制平行线 [x,y,xEnd,yEnd]初始线的两端坐标 widthGap间隔 
    let linelength = Math.sqrt(Math.pow(xEnd - x, 2) + Math.pow(yEnd - y, 2));
    if (widthGap > linelength || widthGap === undefined) {
        widthGap = linelength / 10;
    }
    let num = Math.floor(linelength / widthGap);
    let xg = widthGap * (xEnd - x) / linelength;
    let yg = widthGap * (yEnd - y) / linelength;
    // console.dir(num)
    let i = 0;
    let line = new Array();
    while (i < num) {
        line[i] = new Line({
            shape: {
                x: x + xg * i,
                y: y + yg * i,
                xEnd: x + xg * (i + 1),
                yEnd: y + yg * (i + 1)
            }
        });
        i += 2;
    }
    let LineStipple = new Group(line);
    return LineStipple;
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

let nameId$4 = 0;
class Arc extends Elements {
    name = {
        name: "arc" + nameId$4.toString(),
        graphicId: nameId$4
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$4++;
    }
}
function makeArc(arc, ctx) {
    let st = arc.style;
    if (st.fill === undefined || st.fill === 'none' || st.fill === '#fff') {
        makeFrameArc(arc, ctx);
    }
    else {
        makeFillArc(arc, ctx);
    }
    return arc;
}
function makeFrameArc(arc, ctx) {
    let sh = arc.shape;
    ctx.beginPath();
    ctx.arc(sh.x, sh.y, sh.r, sh.ang_f, sh.ang_e);
    judgeStyle(arc, ctx);
    ctx.closePath();
}
function makeFillArc(arc, ctx) {
    let sh = arc.shape;
    ctx.beginPath();
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x + sh.r * Math.cos(sh.ang_f), sh.y + sh.r * Math.sin(sh.ang_f));
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
    // ctx.beginPath()
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.x + sh.r * Math.cos(sh.ang_e), sh.y + sh.r * Math.sin(sh.ang_e));
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.closePath();
    // ctx.beginPath()
    ctx.arc(sh.x, sh.y, sh.r, sh.ang_f, sh.ang_e);
    judgeStyle(arc, ctx);
    ctx.closePath();
}
function FrameArc(arc, lineWidth, stroke) {
    //画粗线弧 
    if (stroke === undefined || typeof stroke !== 'string') {
        stroke = '#000';
        if (lineWidth === undefined || typeof lineWidth !== 'number') {
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
    });
    return arc0;
}
function FillArc(arc, fill) {
    if (fill === undefined || typeof fill !== 'string') {
        fill = '#000';
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
    });
    return arc0;
}

let nameId$3 = 0;
class Ellipse extends Elements {
    name = {
        name: "ellipse" + nameId$3.toString(),
        graphicId: nameId$3
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$3++;
    }
}
function makeEllipse(ellipse, ctx) {
    //max是等于1除以长轴值a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    let sh = ellipse.shape;
    let step = (sh.ra > sh.rb) ? 1 / sh.ra : 1 / sh.rb;
    ctx.beginPath();
    ctx.moveTo(sh.x + sh.ra, sh.y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step) {
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctx.lineTo(sh.x + sh.ra * Math.cos(i), sh.y + sh.rb * Math.sin(i));
    }
    judgeStyle(ellipse, ctx);
    ctx.closePath();
    return ellipse;
}
function FillOval(ellipse, fill) {
    if (fill === undefined || typeof fill !== 'string') {
        fill = '#000';
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
    });
    return ellipse0;
}
function FrameOval(ellipse, lineWidth, stroke) {
    if (stroke === undefined || typeof stroke !== 'string') {
        stroke = '#000';
        if (lineWidth === undefined || typeof lineWidth !== 'number') {
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
    });
    return ellipse0;
}

let nameId$2 = 0;
class Polygon extends Elements {
    name = {
        name: "polygon" + nameId$2.toString(),
        graphicId: nameId$2
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 1
            };
        }
        nameId$2++;
    }
}
function makePolygon(polygon, ctx) {
    let sh = polygon.shape;
    let num = 0;
    if (sh.xA.length !== sh.yA.length) {
        num = Math.min(sh.xA.length, sh.yA.length);
    }
    else {
        num = sh.xA.length;
    }
    ctx.beginPath();
    ctx.moveTo(sh.xA[0], sh.yA[0]);
    for (let i = 1; i < num; i++) {
        ctx.lineTo(sh.xA[i], sh.yA[i]);
    }
    ctx.lineTo(sh.xA[0], sh.yA[0]);
    judgeStyle(polygon, ctx);
    ctx.closePath();
    return polygon;
}
function FramePoly(polygon, lineWidth, stroke) {
    if (stroke === undefined || typeof stroke !== 'string') {
        stroke = '#000';
        if (lineWidth === undefined || typeof lineWidth !== 'number') {
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
    });
    return polygon0;
}
function FillPoly(polygon, fill) {
    if (fill === undefined || typeof fill !== 'string') {
        fill = '#000';
    }
    let polygon0 = new Polygon({
        shape: {
            xA: polygon.shape.xA,
            yA: polygon.shape.yA,
        },
        style: {
            fill: fill
        }
    });
    return polygon0;
}

let nameId$1 = 0;
class Text extends Elements {
    name = {
        name: "text" + nameId$1.toString(),
        graphicId: nameId$1
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fontSize: '18px',
                fontVariant: 'normal',
                fontWeight: 'normal',
                fontStyle: 'normal'
            };
        }
        nameId$1++;
    }
}
function makeText(text, ctx) {
    ctx.beginPath();
    judgeTextStyle(text, ctx);
    judgeStyle_text(text, ctx);
    ctx.closePath();
    return text;
}
function CatStr(strA) {
    let text = '';
    for (let i = 0; i < strA.length; i++) {
        text += strA[i];
    }
    return text;
}
function StrPad(str, str0, num) {
    let text = '';
    if (num === undefined || num === 0) {
        num = 1;
    }
    for (let i = 0; i < num; i++) {
        text += str0;
    }
    text += str;
    return text;
}
function streq(str0, str1) {
    let result = false;
    result = str0.includes(str1);
    return result;
}
function Replace(str, str_o, str_r) {
    let result = '';
    result = str.replace(new RegExp(str_o, 'g'), str_r);
    return result;
}

let nameId = 0;
class RGBA {
    R;
    G;
    B;
    A;
}
class RGBA_Array {
    RGBA_List;
    width;
    height;
}
class Img extends Elements {
    name = {
        name: "img" + nameId.toString(),
        graphicId: nameId
    };
    Img;
    ImgData;
    IsChange;
    constructor(opts) {
        super();
        this.shape = opts.shape;
        if (opts.Img === undefined) {
            let I = new Image();
            I.src = opts.shape.img;
            this.Img = I;
        }
        else {
            this.Img = opts.Img;
        }
        this.IsChange = false;
        // this.textures = {
        //     texture: [],
        //     width: 0,
        //     height: 0
        // }
        // if(opts.ImgData !== undefined)
        // {
        //     this.ImgData = opts.ImgData
        // }
        if (opts.shape.sx === undefined) {
            this.shape.sx = 0;
        }
        if (opts.shape.sy === undefined) {
            this.shape.sy = 0;
        }
        if (opts.shape.swidth === undefined) {
            this.shape.swidth = this.Img.width;
        }
        if (opts.shape.sheight === undefined) {
            this.shape.sheight = this.Img.height;
        }
        if (opts.shape.width === undefined) {
            this.shape.width = this.Img.width;
        }
        if (opts.shape.height === undefined) {
            this.shape.height = this.Img.height;
        }
        this.init();
        // this.ImgData = opts.ImgData
        // console.dir(this.ImgData)
        // console.dir(opts.style)
        // if(opts.style)
        // {
        //     this.style = opts.style;
        // }
        nameId++;
    }
    init() {
        let sh = this.shape;
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        c.width = screen.availWidth;
        c.height = screen.availHeight;
        ctx.drawImage(this.Img, sh.x, sh.y);
        this.ImgData = ctx.getImageData(sh.x, sh.y, this.Img.width, this.Img.height);
        // this.makeTextures()
    }
    toGray() {
        let img = new Img({
            shape: {
                img: this.shape.img,
                x: this.shape.x,
                y: this.shape.y,
                width: this.shape.width,
                height: this.shape.height,
                sx: this.shape.sx,
                sy: this.shape.sy,
                swidth: this.shape.swidth,
                sheight: this.shape.sheight,
            }
        });
        // this.IsChange = true
        img.IsChange = true;
        let g = 0;
        for (let i = 0; i < this.ImgData.data.length / 4; i++) {
            g = Math.floor(this.ImgData.data[4 * i + 0] * 0.299 + this.ImgData.data[4 * i + 1] * 0.587 + this.ImgData.data[4 * i + 2] * 0.114);
            img.ImgData.data[4 * i + 0] = g;
            img.ImgData.data[4 * i + 1] = g;
            img.ImgData.data[4 * i + 2] = g;
            img.ImgData.data[4 * i + 3] = this.ImgData.data[4 * i + 3];
        }
        return img;
    }
    replace() {
        this.IsChange = false;
        this.init();
    }
    makeTextures() {
        // this.textures = new Textures(this);
        let img = this.toGray();
        let data0 = img.ImgData.data;
        let a = new Array();
        let arr = '';
        let numArr = [];
        // let data = this.ImgData.data
        let w = this.ImgData.width;
        // console.dir(w)
        // console.dir(data)
        for (let i = 0; i < data0.length / 4; i++) {
            for (let t = 0; t < 3; t++) {
                for (let k = 0; k < 3; k++) {
                    if (data0[4 * i] <= data0[4 * (i + (t - 1) * w + k - 1)] || data0[4 * (i + (t - 1) * w + k - 1)] === undefined) {
                        a[3 * t + k] = 0;
                    }
                    else {
                        a[3 * t + k] = 1;
                    }
                    if (3 * t + k !== 4) {
                        arr += a[3 * t + k].toString();
                    }
                    // console.dir((i+(t-1)*w+k-1))
                }
            }
            numArr[i] = parseInt(arr, 2);
            arr = '';
        }
        for (let i = 0; i < numArr.length; i++) {
            img.ImgData.data[4 * i + 0] = numArr[i];
            img.ImgData.data[4 * i + 1] = numArr[i];
            img.ImgData.data[4 * i + 2] = numArr[i];
        }
        return img;
    }
}
function makeImg(img, ctx) {
    ctx.beginPath();
    if (img.IsChange === false) {
        judgeImageShape(img, ctx);
    }
    else {
        judgeImageShape_true(img, ctx);
    }
    ctx.closePath();
    return img;
}
function imRead(img) {
    return img.ImgData;
}
function UnpackColorImage(img) {
    let rgba = new Array();
    let data = img.ImgData.data;
    for (let i = 0; i < data.length / 4; i++) {
        rgba[i] = new RGBA();
        rgba[i].R = data[4 * i + 0];
        rgba[i].G = data[4 * i + 1];
        rgba[i].B = data[4 * i + 2];
        rgba[i].A = data[4 * i + 3];
    }
    let rgba_arr = new RGBA_Array();
    rgba_arr.RGBA_List = rgba;
    rgba_arr.width = img.ImgData.width;
    rgba_arr.height = img.ImgData.height;
    return rgba_arr;
}
function PackColorImage(rgba_arr) {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    let imgdata = ctx.createImageData(rgba_arr.width, rgba_arr.height);
    for (let i = 0; i < rgba_arr.RGBA_List.length; i++) {
        imgdata.data[4 * i + 0] = rgba_arr.RGBA_List[i].R;
        imgdata.data[4 * i + 1] = rgba_arr.RGBA_List[i].G;
        imgdata.data[4 * i + 2] = rgba_arr.RGBA_List[i].B;
        imgdata.data[4 * i + 3] = rgba_arr.RGBA_List[i].A;
    }
    return imgdata;
}
function MaskImageIn(img, alphaIn) {
    if (alphaIn > 1 || alphaIn < 0) {
        alphaIn = 1;
    }
    let newImg = new Img({
        shape: {
            img: img.shape.img,
            x: img.shape.x,
            y: img.shape.y
        }
    });
    // console.dir(img.ImgData)
    // console.dir(newImg.ImgData)
    newImg.IsChange = true;
    for (let i = 0; i < img.ImgData.data.length / 4; i++) {
        newImg.ImgData.data[4 * i + 3] *= alphaIn;
    }
    return newImg;
}
function MaskImageOut(img, alphaIn) {
    if (alphaIn > 1 || alphaIn < 0) {
        alphaIn = 0;
    }
    let newImg = new Img({
        shape: {
            img: img.shape.img,
            x: img.shape.x,
            y: img.shape.y
        }
    });
    // console.dir(img.ImgData)
    // console.dir(newImg.ImgData)
    newImg.IsChange = true;
    for (let i = 0; i < img.ImgData.data.length / 4; i++) {
        newImg.ImgData.data[4 * i + 3] *= (1 - alphaIn);
    }
    return newImg;
}
function ImgInit(img) {
    let I;
    if (img[0] instanceof Img) {
        I = new Group(img);
    }
    else {
        I = img;
    }
    for (let i = 0; i < I.groupList.length; i++) {
        I.groupList[i].init();
    }
}
function PreloadTextures(img) {
    let newImg = img.makeTextures();
    return newImg;
}
function DrawTexture(img) {
    let newImg = img.makeTextures();
    return newImg;
}
function DrawTextures(img) {
    let I;
    let texture = [];
    let T;
    if (img[0] instanceof Img) {
        I = new Group(img);
    }
    else {
        I = img;
    }
    for (let i = 0; i < I.groupList.length; i++) {
        texture[i] = DrawTexture(I.groupList[i]);
    }
    T = new Group(texture);
    return T;
}

function judgeCanvasStyle(cStyle) {
    if (!cStyle) {
        cStyle = {
            width: 400,
            height: 400
        };
    }
    if (!cStyle.width) {
        cStyle.width = 400;
    }
    if (!cStyle.height) {
        cStyle.height = 400;
    }
    return cStyle;
}
// export function judgeStyle(style: Style){
//     if(!style)
// }
function judgeElement(el, ctx) {
    // console.dir(el)
    // console.dir(Rectangle)
    // console.dir(el instanceof Rectangle)
    if (el instanceof Rectangle) {
        makeRectangle(el, ctx);
    }
    else if (el instanceof Circle) {
        makeCircle(el, ctx);
    }
    else if (el instanceof Line) {
        makeLine(el, ctx);
    }
    else if (el instanceof Arc) {
        makeArc(el, ctx);
    }
    else if (el instanceof Ellipse) {
        makeEllipse(el, ctx);
    }
    else if (el instanceof Polygon) {
        makePolygon(el, ctx);
    }
    else if (el instanceof Text) {
        makeText(el, ctx);
    }
    else if (el instanceof Img) {
        makeImg(el, ctx);
    }
    else if (el instanceof Group) {
        // console.dir(el)
        let list = el.groupList;
        // console.dir(list[0])
        for (let i = 0; i < el.length; i++) {
            judgeElement(list[i], ctx);
        }
    }
}
function judgeStyle(el, ctx) {
    if (el.style === undefined) {
        el.style = {
            fill: "none",
            stroke: "#000",
            lineWidth: 1
        };
    }
    let st = el.style;
    if (st.lineWidth === undefined) {
        st.lineWidth = 1;
    }
    if (st.fill !== 'none' && st.fill !== undefined) {
        ctx.fillStyle = st.fill;
        ctx.fill();
        if (st.stroke !== 'none' && st.stroke !== undefined) {
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = st.lineWidth;
            ctx.stroke();
        }
    }
    else {
        if (st.stroke !== 'none' && st.stroke !== undefined) {
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = st.lineWidth;
            ctx.stroke();
        }
        else {
            st.stroke = "#000";
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = st.lineWidth;
            ctx.stroke();
        }
    }
    // if(!(st.stroke !== 'none' && st.stroke !== undefined)){
    //     // st.stroke = '#000';
    //     if(st.fill !== 'none' && st.fill !== undefined){
    //         ctx.fillStyle = st.fill;
    //         ctx.fill();
    //     }
    //     else{
    //         st.stroke = "#000"
    //         ctx.strokeStyle = st.stroke;
    //         ctx.lineWidth = st.lineWidth;
    //         ctx.stroke();
    //     }
    // }
    // else{
    //     if(st.fill !== 'none' && st.fill !== undefined){
    //         ctx.fillStyle = st.fill;
    //         ctx.fill();
    //     }
    // }
    // ctx.fillStyle = st.fill;
    // ctx.strokeStyle = st.stroke;
    // ctx.lineWidth = st.lineWidth;
    // ctx.fill();
    // ctx.stroke();
}
function judgeStyle_text(el, ctx) {
    if (el.style === undefined) {
        el.style = {
            fontSize: '18px',
            fontVariant: 'normal',
            fontWeight: 'normal',
            fontStyle: 'normal'
        };
    }
    let st = el.style;
    if (st.fill !== 'none' && st.fill !== undefined) {
        ctx.fillStyle = st.fill;
        ctx.fillText(el.shape.text, el.shape.x, el.shape.y);
    }
    else {
        if (st.stroke !== 'none' && st.stroke !== undefined) {
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text, el.shape.x, el.shape.y);
        }
        else {
            st.stroke = "#000";
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text, el.shape.x, el.shape.y);
        }
    }
}
function judgeTextStyle(el, ctx) {
    let st = el.style;
    let fontString = '';
    if (st === undefined) {
        st = {
            fontSize: '18px',
            fontVariant: 'normal',
            fontWeight: 'normal',
            fontStyle: 'normal'
        };
    }
    if (st.fontStyle !== undefined && st.fontStyle !== 'none') {
        if (typeof st.fontStyle === 'number') {
            if (st.fontStyle < 3 && st.fontStyle >= 0) {
                if (st.fontStyle === 0) {
                    st.fontStyle = 'normal';
                }
                else if (st.fontStyle === 1) {
                    st.fontStyle = 'italic';
                }
                else {
                    st.fontStyle = 'oblique';
                }
            }
            else {
                st.fontStyle = 'normal';
            }
        }
        else if (typeof st.fontStyle === 'string') {
            st.fontStyle = st.fontStyle.toLowerCase();
            if (st.fontStyle !== 'italic' && st.fontStyle !== 'oblique' && st.fontStyle !== "normal") {
                if (st.fontStyle === '0') {
                    st.fontStyle = 'normal';
                }
                else if (st.fontStyle === '1') {
                    st.fontStyle = 'italic';
                }
                else if (st.fontStyle === '2') {
                    st.fontStyle = 'oblique';
                }
                else {
                    st.fontStyle = 'normal';
                }
            }
        }
    }
    else {
        st.fontStyle = 'normal';
    }
    if (st.fontVariant !== undefined && st.fontVariant !== 'none') {
        if (typeof st.fontVariant === 'boolean') {
            if (st.fontVariant === false) {
                st.fontVariant = 'normal';
            }
            else {
                st.fontVariant = 'small-caps';
            }
        }
        else if (typeof st.fontVariant === 'string') {
            st.fontVariant = st.fontVariant.toLowerCase();
            if (st.fontVariant !== 'normal' && st.fontVariant !== 'small-caps') {
                if (st.fontVariant === 'true') {
                    st.fontVariant = 'small-caps';
                }
                else {
                    st.fontVariant = 'normal';
                }
            }
        }
        else {
            st.fontVariant = 'normal';
        }
    }
    else {
        st.fontVariant = 'normal';
    }
    if (st.fontWeight !== undefined && st.fontWeight !== 'none') {
        if (typeof st.fontWeight === 'number') {
            st.fontWeight = st.fontWeight.toString();
        }
        else if (typeof st.fontWeight === 'string') {
            if (st.fontWeight !== 'normal' && st.fontWeight !== 'bold' && st.fontWeight !== 'bolder' && st.fontWeight !== 'lighter') {
                st.fontWeight = 'normal';
            }
        }
        else {
            st.fontWeight = 'normal';
        }
    }
    else {
        st.fontWeight = 'normal';
    }
    if (st.fontSize !== undefined && st.fontSize !== 'none') {
        if (typeof st.fontSize === 'number') {
            st.fontSize = st.fontSize.toString() + 'px';
        }
        else if (typeof st.fontSize === 'string') {
            if (st.fontSize.indexOf('px') === -1) {
                st.fontSize = st.fontSize + 'px';
            }
        }
        else {
            st.fontSize = '18px';
        }
    }
    else {
        st.fontSize = '18px';
    }
    fontString = st.fontStyle + ' ' + st.fontVariant + ' ' + st.fontWeight + ' ' + st.fontSize + ' ' + st.fontFamily;
    ctx.font = fontString;
    console.dir(fontString);
}
function judgeChangeType(el) {
    let x = 1;
    // console.dir(el)
    if (typeof el === "string") {
        el = el.toUpperCase();
        if (el === "CENTER" || el === 'C') {
            x = 0;
        }
        else if (el === 'RECTLEFT' || el === "LEFT" || el === 'L') {
            x = 1;
        }
        else if (el === 'RECTTOP' || el === "TOP" || el === 'T') {
            x = 2;
        }
        else if (el === 'RECTRIGHT' || el === "RIGHT" || el === 'R') {
            x = 3;
        }
        else if (el === 'RECTBOTTOM' || el === "BOTTOM" || el === 'B') {
            x = 4;
        }
        else {
            console.dir('Error! Please use the right instruction!');
        }
    }
    else if (typeof el === "number") {
        if (el < 5) {
            x = el;
        }
        else {
            console.dir('Error!It will use default instruction!');
        }
    }
    else {
        console.dir('Error!It will use default instruction!');
    }
    return x;
}
function judgeSide(side0, side1) {
    let f0 = judgeChangeType(side0);
    let f1 = judgeChangeType(side1);
    if (f0 === 2 || f0 === 4) {
        if (f1 === 2 || f1 === 4) {
            f1 = 0;
        }
        else {
            let t = f1;
            f1 = f0;
            f0 = t;
        }
    }
    if (f0 === 1 || f0 === 3) {
        if (f1 === 1 || f1 === 3) {
            f1 = 0;
        }
    }
    return [f0, f1];
}
function judgeImageShape(img, ctx) {
    let sh = img.shape;
    if (sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined) {
        if (sh.width === undefined || sh.height === undefined) {
            ctx.drawImage(img.Img, sh.x, sh.y);
        }
        else {
            ctx.drawImage(img.Img, sh.x, sh.y, sh.width, sh.height);
        }
    }
    else {
        if (sh.width === undefined || sh.height === undefined) {
            ctx.drawImage(img.Img, sh.sx, sh.sy, sh.swidth, sh.sheight, sh.x, sh.y, img.Img.width, img.Img.height);
        }
        else {
            ctx.drawImage(img.Img, sh.sx, sh.sy, sh.swidth, sh.sheight, sh.x, sh.y, sh.width, sh.height);
        }
    }
}
function judgeImageShape_true(img, ctx) {
    let sh = img.shape;
    if (sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined) {
        ctx.putImageData(img.ImgData, sh.x, sh.y);
    }
    else {
        ctx.putImageData(img.ImgData, sh.x, sh.y, sh.sx, sh.sy, sh.swidth, sh.sheight);
    }
}
function judgeIsInElement([x, y], el) {
    if (el instanceof Rectangle) {
        let [x0, y0, w0, h0] = [el.shape.x, el.shape.y, el.shape.width, el.shape.height];
        if (x >= x0 && x <= x0 + w0 && y >= y0 && y <= y0 + h0) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (el instanceof Circle) {
        let [x0, y0, r0] = [el.shape.x, el.shape.y, el.shape.r];
        let r = Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2));
        if (r <= r0) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (el instanceof Line) {
        let [x0, y0, x1, y1] = [el.shape.x, el.shape.y, el.shape.xEnd, el.shape.yEnd];
        if (x1 !== x0) {
            let yt = (y1 - y0) / (x1 - x0) * (x - x0) + y0;
            if (y >= yt - 15 && y <= yt + 15) //扩大范围以便操作
             {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            let xt = (x1 - x0) / (y1 - y0) * (y - y0) + x0;
            if (y >= xt - 15 && y <= xt + 15) //扩大范围以便操作
             {
                return true;
            }
            else {
                return false;
            }
        }
    }
    else if (el instanceof Arc) ;
    else if (el instanceof Ellipse) {
        let [x0, y0, ra0, rb0] = [el.shape.x, el.shape.y, el.shape.ra, el.shape.rb];
        let t = Math.pow(x - x0, 2) / Math.pow(ra0, 2) + Math.pow(y - y0, 2) / Math.pow(rb0, 2);
        if (t <= 1) {
            return true;
        }
        else {
            return false;
        }
    }
    else if (el instanceof Polygon) {
        let i = 0;
        let j = i + 1;
        let index = 0;
        let xt = new Array();
        let yt = new Array();
        let [x0, y0] = [el.shape.xA, el.shape.yA];
        for (i = 0; i < el.shape.xA.length; i++) {
            if (i === el.shape.xA.length - 1) {
                j = 0;
            }
            else {
                j = i + 1;
            }
            if (y0[i] !== y0[j]) {
                xt[index] = (x0[i] - x0[j]) / (y0[i] - y0[j]) * (y - y0[i]) + x0[i];
            }
            else {
                yt[index] = (y0[j] - y0[i]) / (x0[j] - x0[i]) * (x - x0[i]) + y0[i];
            }
            if (x === xt[index]) {
                return true;
            }
            else if (xt[index] >= x) {
                index++;
            }
        }
        if (index % 2 === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    // else if(el instanceof Polygon)
    // {
    //     let c
    //     let i,j
    //     let l = el.shape.yA.length
    //     for(c = false,i = -1,j = l - 1; ++i < l; j = i) 
    //         ( (el.shape.yA[i] <= y && y < el.shape.yA[j]) || (el.shape.yA[j] <= y && y < el.shape.yA[i]) ) 
    //         && (x < (el.shape.xA[j] - el.shape.xA[i]) * (y - el.shape.yA[i]) / (el.shape.yA[j] - el.shape.yA[i]) + el.shape.xA[i]) 
    //         && (c = !c); 
    //     return c; 
    // }
}

function createCanvas(dom, cStyle) {
    let c = document.createElement('canvas');
    cStyle = judgeCanvasStyle(cStyle);
    // let cStyle: canvasStyle = {
    //     width: 100,
    //     height: 100
    // }
    c.width = cStyle.width;
    c.height = cStyle.height;
    let ctx = c.getContext('2d');
    dom.append(c);
    return ctx;
}

class time {
    hour;
    minutes;
    seconds;
    milliseconds;
    constructor() {
        let date = new Date();
        this.hour = date.getHours();
        this.minutes = date.getMinutes();
        this.seconds = date.getSeconds();
        this.milliseconds = date.getMilliseconds();
    }
}
class Time {
    startTime;
    instantTime;
    transientTime;
    timeValue;
    constructor() {
    }
    start() {
        this.startTime = new time();
    }
    record() {
        this.instantTime = new time();
    }
}
function Tic() {
    let t = new Time();
    t.start();
    return t;
}
function Toc(time) {
    let t = 0;
    let ts = new Array();
    time.record();
    ts[0] = time.instantTime.hour - time.startTime.hour;
    ts[1] = time.instantTime.minutes - time.startTime.minutes;
    ts[2] = time.instantTime.seconds - time.startTime.seconds;
    ts[3] = time.instantTime.milliseconds - time.startTime.milliseconds;
    t = 60 * 60 * ts[0] + 60 * ts[1] + ts[2] + ts[3] / 1000;
    time.timeValue = t;
    return t;
}
function GetSecs(time) {
    let t = Toc(time);
    return t;
}
function WaitSecs(delay, message) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            // console.log(message);
            resolve(0);
        }, delay);
    });
}
function delay_frame(num1) {
    let time_num = 0;
    return new Promise(function (resolve, reject) {
        (function raf() {
            time_num++;
            let id = window.requestAnimationFrame(raf);
            if (time_num == num1) {
                window.cancelAnimationFrame(id);
                resolve(0);
            }
        }());
    });
}

function KbWait(key, Func) {
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === key) {
            Func();
        }
    };
}
function KbName(key) {
    let res;
    if (typeof key === 'string') {
        res = key.charCodeAt(0);
    }
    else {
        res = String.fromCharCode(key);
    }
    console.dir(res);
    return res;
}
function KbPressWait(key, Func) {
    document.onkeydown = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === key) {
            Func();
        }
    };
}
function KbReleaseWait(key, Func) {
    document.onkeyup = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode === key) {
            Func();
        }
    };
}
function GetClick(el, Func) {
    document.onmousedown = function (event) {
        let e = event || window.event || arguments.callee.caller.arguments[0];
        let x, y;
        if (e.pageX || e.pageY) {
            x = e.pageX;
            y = e.pageY;
        }
        console.dir(x);
        console.dir(y);
        let f = judgeIsInElement([x, y], el);
        // console.dir(f)
        if (f === true) {
            Func();
        }
    };
}

// export { makeRectangle } from './Graphic/rectangle'
// let EzpsyList = new Array();
class Ezpsy {
    id;
    dom;
    ctx;
    cStyle;
    // Rectangle: Rectangle
    constructor(id, dom, cStyle) {
        this.id = id;
        this.dom = dom;
        this.cStyle = cStyle;
        this.ctx = createCanvas(dom, cStyle);
        // console.dir(this.ctx)
    }
    setCanvasStyle(cStyle) {
        let c = this.ctx.canvas;
        cStyle = judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
    }
    add(el) {
        // console.dir('success')
        let ctx = this.ctx;
        judgeElement(el, ctx);
    }
}
// export function pushEzpsyList(ez: Ezpsy){
//     let num = ez.id;
//     EzpsyList[num] = ez;
// }
function init(dom, cStyle) {
    let ez = new Ezpsy(Count(), dom, cStyle);
    // pushEzpsyList(ez);
    // console.dir(EzpsyList);
    return ez;
}

var EZPSY = /*#__PURE__*/Object.freeze({
    __proto__: null,
    init: init,
    Rectangle: Rectangle,
    Group: Group,
    Circle: Circle,
    Line: Line,
    Arc: Arc,
    Ellipse: Ellipse,
    Polygon: Polygon,
    Text: Text,
    Img: Img,
    Time: Time,
    RectGroup: RectGroup,
    makeRectangle: makeRectangle,
    AdjoinRect: AdjoinRect,
    RectCenter: RectCenter,
    AlignRect: AlignRect,
    OffsetRect: OffsetRect,
    ArrangeRects: ArrangeRects,
    CenterRect: CenterRect,
    CenterRectOnPoint: CenterRectOnPoint,
    RectWidth: RectWidth,
    RectHeight: RectHeight,
    RectSize: RectSize,
    ClipRect: ClipRect,
    IsInRect: IsInRect,
    GrowRect: GrowRect,
    InsetRect: InsetRect,
    ScaleRect: ScaleRect,
    IsEmptyRect: IsEmptyRect,
    RectOfMatrix: RectOfMatrix,
    RectLeft: RectLeft,
    RectRight: RectRight,
    RectTop: RectTop,
    RectBotom: RectBotom,
    UnionRect: UnionRect,
    FillRect: FillRect,
    FrameRect: FrameRect,
    makeCircle: makeCircle,
    DrawDots: DrawDots,
    makeLine: makeLine,
    DrawLines: DrawLines,
    DrawMline: DrawMline,
    LineStipple: LineStipple,
    makeArc: makeArc,
    FrameArc: FrameArc,
    FillArc: FillArc,
    makeEllipse: makeEllipse,
    FillOval: FillOval,
    FrameOval: FrameOval,
    makePolygon: makePolygon,
    FramePoly: FramePoly,
    FillPoly: FillPoly,
    makeText: makeText,
    CatStr: CatStr,
    StrPad: StrPad,
    streq: streq,
    Replace: Replace,
    makeImg: makeImg,
    imRead: imRead,
    UnpackColorImage: UnpackColorImage,
    PackColorImage: PackColorImage,
    MaskImageIn: MaskImageIn,
    MaskImageOut: MaskImageOut,
    ImgInit: ImgInit,
    PreloadTextures: PreloadTextures,
    DrawTexture: DrawTexture,
    DrawTextures: DrawTextures,
    Tic: Tic,
    Toc: Toc,
    GetSecs: GetSecs,
    WaitSecs: WaitSecs,
    delay_frame: delay_frame,
    KbWait: KbWait,
    KbName: KbName,
    KbPressWait: KbPressWait,
    KbReleaseWait: KbReleaseWait,
    GetClick: GetClick
});

export { EZPSY as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9Hcm91cC9ncm91cC50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL0NhbnZhcy9jYW52YXMudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL2V6cHN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxyXG5sZXQgaWRTdGFydCA9IDA7XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ291bnQoKTogbnVtYmVyIHtcclxuICAgIHJldHVybiBpZFN0YXJ0Kys7XHJcbn0iLCJpbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSc7XHJcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcblxyXG5sZXQgZ3JvdXBJZCA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3MgR3JvdXB7XHJcbiAgICBpZDogbnVtYmVyXHJcbiAgICBsZW5ndGg6IG51bWJlclxyXG4gICAgZ3JvdXBMaXN0OiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXBcclxuICAgIFxyXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cCl7XHJcblxyXG4gICAgICAgIHRoaXMuaWQgPSBncm91cElkO1xyXG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDFcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBlbC5sZW5ndGg7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZWw7XHJcblxyXG4gICAgICAgIGdyb3VwSWQrKyBcclxuICAgIH1cclxufSIsImltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IFNoYXBlLFN0eWxlfSBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5cclxuZXhwb3J0IGNsYXNzIEVsZW1lbnRze1xyXG4gICAgc2hhcGU/OiBTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZSBcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG4gICAgbm9GaWxsKCl7XHJcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ25vbmUnO1xyXG4gICAgfVxyXG4gICAgbm9TdHJva2UoKXtcclxuICAgICAgICB0aGlzLnN0eWxlLmxpbmVXaWR0aCA9IDA7XHJcbiAgICAgICAgLy8gaWYodGhpcy5zdHlsZS5maWxsICE9PSAnbm9uZScgJiYgdGhpcy5zdHlsZS5maWxsICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IHRoaXMuc3R5bGUuZmlsbFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBlbHNle1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IFwiI2ZmZlwiO1xyXG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcignRXJyb3IhJylcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSAnbm9uZSdcclxuICAgIH1cclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IGp1ZGdlQ2hhbmdlVHlwZSxqdWRnZVNpZGUsanVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJ1xyXG5pbXBvcnQge0VsZW1lbnRzfSBmcm9tICcuLi9FbGVtZW50J1xyXG5cclxuXHJcbmludGVyZmFjZSBSZWN0YW5nbGVTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgd2lkdGg6IG51bWJlcixcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBSZWN0YW5nbGVPcHRzIGV4dGVuZHMgT3B0c3tcclxuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5jbGFzcyBDZW50ZXJ7XHJcbiAgICByZWN0OiBSZWN0YW5nbGVcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgdGhpcy54ID0gcmVjdC5zaGFwZS54ICsgcmVjdC5zaGFwZS53aWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy55ID0gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHQgLyAyO1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTaXple1xyXG4gICAgcmVjdDogUmVjdGFuZ2xlXHJcbiAgICB3aWR0aDogbnVtYmVyXHJcbiAgICBoZWlnaHQ6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IocmVjdDogUmVjdGFuZ2xlKXtcclxuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXHJcbiAgICAgICAgdGhpcy5oZWlnaHQgPSByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBTaWRlWFl7XHJcbiAgICB4OiBudW1iZXJcclxuICAgIHk6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWN0R3JvdXAgZXh0ZW5kcyBHcm91cCB7XHJcbiAgICBQYXJlbnRzUmVjdDogUmVjdGFuZ2xlXHJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xyXG4gICAgICAgIHN1cGVyKGVsKVxyXG4gICAgICAgIHRoaXMuUGFyZW50c1JlY3QgPSByZWN0O1xyXG4gICAgfVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbi8vIGNsYXNzIFR5cGVUZXN0IGltcGxlbWVudHMgUmVjdGFuZ2xlU2hhcGV7XHJcbi8vICAgICB4OiBudW1iZXJcclxuLy8gICAgIHk6IG51bWJlclxyXG4vLyAgICAgd2lkdGg6IG51bWJlclxyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcclxuLy8gfVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwicmVjdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFJlY3RhbmdsZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIGxvZ2ljUmVjdCBleHRlbmRzIFJlY3RhbmdsZXtcclxuICAgIHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlO1xyXG4gICAgcmVjdFBhcmVudHMxOiBSZWN0YW5nbGU7XHJcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcclxuICAgICAgICBzdXBlcih7c2hhcGU6e1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgfX0pXHJcbiAgICAgICAgdGhpcy5yZWN0UGFyZW50czAgPSByZWN0UGFyZW50czBcclxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMSA9IHJlY3RQYXJlbnRzMVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBjbGlwUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcclxuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyB1bmlvblJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XHJcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcclxuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcclxuICAgIH1cclxufVxyXG5cclxuLy8gZnVuY3Rpb24gaW5zdGFuY2VvZlJlY3RhbmdsZShlOiBhbnkpOiBlIGlzIFJlY3RhbmdsZVNoYXBle1xyXG4vLyAgICAgcmV0dXJuICBpbiBlO1xyXG4vLyB9XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XHJcbi8vICAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xyXG4vLyAgICAgbGV0IHN0ID0gcmVjdC5zdHlsZTtcclxuLy8gICAgIGxldCBmLHM7XHJcbi8vICAgICAvLyBjb25zb2xlLmRpcihzdC5zdHJva2UpXHJcbi8vICAgICBbY3R4LGYsc10gPSBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcclxuLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT0gJ25vbmUnKXtcclxuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcclxuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbi8vICAgICAgICAgY3R4LmZpbGxSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xyXG4vLyAgICAgICAgIGN0eC5zdHJva2VSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZSBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlID09PSAnbm9uZScpe1xyXG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcclxuLy8gICAgIH1cclxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCA9PT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gJ25vbmUnKXtcclxuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbi8vICAgICAgICAgY3R4LnJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbi8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZXtcclxuLy8gICAgICAgICBjb25zb2xlLmRpcihcImVycm9yIUl0IGNhbid0IHBhaW50IGEgcmVjdGFuZ2xlIHdpdGhvdXQgZmlsbFN0eWxlIGFuZCBzdHJva2VTdHlsZVwiKVxyXG4vLyAgICAgfVxyXG4gICAgXHJcbi8vICAgICByZXR1cm4gcmVjdDtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xyXG4gICAgbGV0IHNoID0gcmVjdC5zaGFwZTtcclxuICAgIGN0eC5iZWdpblBhdGgoKTtcclxuICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xyXG4gICAganVkZ2VTdHlsZShyZWN0LGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICByZXR1cm4gcmVjdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFkam9pblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGZpeGVkU3R5bGU/OiBzdHJpbmd8bnVtYmVyKTogUmVjdGFuZ2xle1xyXG4gICAgLy/nn6nlvaLmi7zmjqUgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmi7zmjqXnn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cclxuICAgIGxldCBuZXdSZWN0O1xyXG4gICAgaWYoIWZpeGVkU3R5bGUpXHJcbiAgICB7XHJcbiAgICAgICAgZml4ZWRTdHlsZSA9ICdSRUNUTEVGVCdcclxuICAgIH1cclxuICAgIGxldCBmID0ganVkZ2VDaGFuZ2VUeXBlKGZpeGVkU3R5bGUpO1xyXG4gICAgLy8gY29uc29sZS5kaXIoJ2Y9JytmKTtcclxuICAgIGlmKGYgPT09IDEpe1xyXG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0xlZnQoZml4ZWRSZWN0LHJlY3QpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG5ld1JlY3QpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDIpe1xyXG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1RvcChmaXhlZFJlY3QscmVjdCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDMpe1xyXG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1JpZ2h0KGZpeGVkUmVjdCxyZWN0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gNCl7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfQm90dG9tKGZpeGVkUmVjdCxyZWN0KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBvcmRlciEnKVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlY3RfTGVmdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XHJcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54IC0gcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBSZWN0X1JpZ2h0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZnVuY3Rpb24gUmVjdF9Ub3AoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xyXG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxyXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBSZWN0X0JvdHRvbShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XHJcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXHJcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodCxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RDZW50ZXIocmVjdDogUmVjdGFuZ2xlKTogQ2VudGVye1xyXG4gICAgLy/ojrflj5bnn6nlvaLkuK3lv4NcclxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKHJlY3QpO1xyXG4gICAgcmV0dXJuIGNlbnRlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFsaWduUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsc2lkZTA/OiBudW1iZXJ8c3RyaW5nLHNpZGUxPzogbnVtYmVyfHN0cmluZyk6IFJlY3RhbmdsZXtcclxuICAgIC8v55+p5b2i5a+56b2QIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5a+56b2Q55+p5b2iIGZpeGVkU3R5bGUg5a+56b2Q5b2i5byPXHJcbiAgICBpZihzaWRlMCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzaWRlMCA9IDBcclxuICAgICAgICBzaWRlMSA9IDBcclxuICAgIH1cclxuICAgIGlmKHNpZGUxID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNpZGUxID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGlmKHJlY3Quc2hhcGUud2lkdGgqcmVjdC5zaGFwZS5oZWlnaHQgPiBmaXhlZFJlY3Quc2hhcGUud2lkdGgqZml4ZWRSZWN0LnNoYXBlLmhlaWdodCApXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIVRoZSBhcmVhIG9mIGZpZXhlZFJlY3QgIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmVjdCEnKVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBsZXQgW2YwLGYxXSA9IGp1ZGdlU2lkZShzaWRlMCxzaWRlMSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZjArXCIgXCIrZjEpO1xyXG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgIHNoYXBlOntcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKTtcclxuICAgICAgICBpZihmMCA9PT0gMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAxIHx8IGYxID09PSAzKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xyXG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcclxuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XHJcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XHJcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHMpXHJcbiAgICAgICAgXHJcbiAgICAgICAgbmV3UmVjdC5zaGFwZS54ID0gcy54O1xyXG4gICAgICAgIG5ld1JlY3Quc2hhcGUueSA9IHMueTtcclxuICAgICAgICByZXR1cm4gbmV3UmVjdDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIEFsaWduWFkoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGY6IG51bWJlcik6IFNpZGVYWXtcclxuICAgIGxldCBzID0gbmV3IFNpZGVYWSgpXHJcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihmaXhlZFJlY3QpO1xyXG4gICAgLy8gY29uc29sZS5kaXIoY2VudGVyKVxyXG4gICAgaWYoZiA9PT0gMClcclxuICAgIHsgICBcclxuICAgICAgICBzLnggPSBjZW50ZXIueCAtIHJlY3Quc2hhcGUud2lkdGgvMlxyXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gcmVjdC5zaGFwZS5oZWlnaHQvMlxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSAxKVxyXG4gICAge1xyXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gZml4ZWRSZWN0LnNoYXBlLndpZHRoLzJcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gMilcclxuICAgIHtcclxuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMlxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSAzKVxyXG4gICAge1xyXG4gICAgICAgIHMueCA9IGNlbnRlci54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLzIgLSByZWN0LnNoYXBlLndpZHRoXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDQpXHJcbiAgICB7XHJcbiAgICAgICAgcy55ID0gY2VudGVyLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LzIgLSByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gT2Zmc2V0UmVjdChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcclxuICAgIC8v55+p5b2i5bmz56e7XHJcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEFycmFuZ2VSZWN0cyhuOiBudW1iZXIsW3hOdW1iZXIseU51bWJlcl06IFtudW1iZXIsbnVtYmVyXSx3aW5kb3dSZWN0OiBSZWN0YW5nbGUsc3R5bGU/OiBudW1iZXIpOiBSZWN0R3JvdXB7XHJcbiAgICAvL+WIm+W7uuefqeW9oumYteWIl1xyXG4gICAgbGV0IHJlY3QgPSBuZXcgQXJyYXkoKTtcclxuICAgIFxyXG4gICAgbGV0IG51bSA9IHhOdW1iZXIgKiB5TnVtYmVyXHJcbiAgICBsZXQgeCA9IHdpbmRvd1JlY3Quc2hhcGUueFxyXG4gICAgbGV0IHkgPSB3aW5kb3dSZWN0LnNoYXBlLnlcclxuICAgIGxldCB3aWR0aCA9IHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLyB4TnVtYmVyXHJcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93UmVjdC5zaGFwZS5oZWlnaHQgLyB5TnVtYmVyXHJcbiAgICAvLyBjb25zb2xlLmRpcihbeCx5LHdpZHRoLGhlaWdodF0pXHJcblxyXG4gICAgaWYobiA+IG51bSl7XHJcbiAgICAgICAgbiA9IG51bVxyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgc3R5bGUgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0eWxlID4gMSlcclxuICAgIHtcclxuICAgICAgICBzdHlsZSA9IDBcclxuICAgIH1cclxuXHJcbiAgICBpZihzdHlsZSA9PT0gMClcclxuICAgIHtcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aWR0aCAqIGosXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLSB3aWR0aCAtIHdpZHRoICogaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgXHJcblxyXG4gICAgLy8gY29uc29sZS5kaXIocmVjdClcclxuXHJcbiAgICBsZXQgcmVjdEdyb3VwID0gbmV3IFJlY3RHcm91cCh3aW5kb3dSZWN0LHJlY3QpO1xyXG4gICAgcmV0dXJuIHJlY3RHcm91cFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+enu+WKqOefqeW9ouiHs+afkOefqeW9ouS4reW/gyBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaTjeS9nOefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xyXG4gICAgbGV0IG5ld1JlY3QgPSBBbGlnblJlY3QoZml4ZWRSZWN0LHJlY3QsMCwwKTtcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0T25Qb2ludChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcclxuICAgIGxldCBuZXdSZWN0ID0gT2Zmc2V0UmVjdChyZWN0LFt4LHldKVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RXaWR0aChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XHJcbiAgICAvL+iOt+WPluefqeW9ouWuveW6plxyXG4gICAgbGV0IHdpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxyXG4gICAgcmV0dXJuIHdpZHRoXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWN0SGVpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIC8v6I635Y+W55+p5b2i6auY5bqmXHJcbiAgICBsZXQgaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgIHJldHVybiBoZWlnaHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWN0U2l6ZShyZWN0OiBSZWN0YW5nbGUpOiBTaXple1xyXG4gICAgLy/ojrflj5bnn6nlvaLlrr3pq5hcclxuICAgIGxldCBzaXplID0gbmV3IFNpemUocmVjdClcclxuICAgIHJldHVybiBzaXplO1xyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XHJcbi8vICAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xyXG4vLyAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdDAuc2hhcGUueCxyZWN0MC5zaGFwZS55LHJlY3QwLnNoYXBlLndpZHRoLHJlY3QwLnNoYXBlLmhlaWdodF1cclxuLy8gICAgIGxldCBbeDEseTEsdzEsaDFdID0gW3JlY3QxLnNoYXBlLngscmVjdDEuc2hhcGUueSxyZWN0MS5zaGFwZS53aWR0aCxyZWN0MS5zaGFwZS5oZWlnaHRdXHJcbi8vICAgICBsZXQgUmVjdCx4bix5bix3bixobjtcclxuLy8gICAgIGxldCBhcmVhMCA9IHcwICogaDA7XHJcbi8vICAgICBsZXQgYXJlYTEgPSB3MSAqIGgxO1xyXG4vLyAgICAgbGV0IHgseSx3LGhcclxuLy8gICAgIGxldCB4dCx5dCx3dCxodCxyZWN0XHJcbi8vICAgICBpZihhcmVhMCA+PSBhcmVhMSlcclxuLy8gICAgIHtcclxuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDEseTEsdzEsaDFdO1xyXG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDAseTAsdzAsaDBdO1xyXG4vLyAgICAgICAgIHJlY3QgPSByZWN0MDtcclxuLy8gICAgIH1cclxuLy8gICAgIGVsc2V7XHJcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gwLHkwLHcwLGgwXTtcclxuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gxLHkxLHcxLGgxXTtcclxuLy8gICAgICAgICByZWN0ID0gcmVjdDE7XHJcbi8vICAgICB9XHJcbi8vICAgICBjb25zb2xlLmRpcihbeCx5LHcsaF0pO1xyXG4vLyAgICAgY29uc29sZS5kaXIoW3h0LHl0LHd0LGh0XSlcclxuLy8gICAgIGlmKCFJc0luUmVjdChbeCx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5K2hdLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHldLHJlY3QpICYmICFJc0luUmVjdChbeCx5K2hdLHJlY3QpKXtcclxuLy8gICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNle1xyXG4vLyAgICAgICAgIHduID0gTWF0aC5hYnMoTWF0aC5taW4oeDAgKyB3MCAseDEgKyB3MSkgLSBNYXRoLm1heCh4MCwgeDEpKVxyXG4vLyAgICAgICAgIGhuID0gTWF0aC5hYnMoTWF0aC5taW4oeTAgKyBoMCwgeTEgKyBoMSkgLSBNYXRoLm1heCh5MCwgeTEpKVxyXG4vLyAgICAgICAgIGlmKElzSW5SZWN0KFt4LHldLHJlY3QpKXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4O1xyXG4vLyAgICAgICAgICAgICB5biA9IHk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGVsc2UgaWYoKHggPj0geHQgJiYgeDw9eHQrd3QpICYmICh5IDwgeXQgfHwgeSA+IHl0K2h0KSl7XHJcbi8vICAgICAgICAgICAgIHhuID0geDtcclxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobik7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGVsc2UgaWYoKHggPCB4dCB8fCB4ID4geHQrd3QpICYmICh5ID49IHl0ICYmIHkgPD0geXQraHQpKXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcclxuLy8gICAgICAgICAgICAgeW4gPSB5XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGVsc2V7XHJcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXHJcbi8vICAgICAgICAgICAgIHluID0geSArIChoIC0gaG4pXHJcbi8vICAgICAgICAgfVxyXG4gICAgICAgIFxyXG4vLyAgICAgICAgIFJlY3QgPSBbeG4seW4sd24saG5dO1xyXG4gICAgICAgIFxyXG4vLyAgICAgfVxyXG5cclxuLy8gICAgIGxldCBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xyXG5cclxuLy8gICAgIHJldHVybiBuZXdSZWN0O1xyXG5cclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xyXG4gICAgLy/nn6nlvaLph43lj6DljLrln59cclxuICAgIGxldCBuZXdSZWN0LFJlY3RcclxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XHJcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xyXG4gICAgbGV0IHgseSx3LGhcclxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xyXG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XHJcbiAgICBpZihJc0luUmVjdChbeGwwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeGwxLHliMV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseWIxXSxyZWN0MCkpXHJcbiAgICB7XHJcbiAgICAgICAgeCA9IE1hdGgubWF4KHhsMCx4bDEpO1xyXG4gICAgICAgIHkgPSBNYXRoLm1heCh5dDAseXQxKTtcclxuICAgICAgICB3ID0gTWF0aC5taW4oeHIwLHhyMSkgLSB4O1xyXG4gICAgICAgIGggPSBNYXRoLm1pbih5YjAseWIxKSAtIHk7XHJcbiAgICAgICAgUmVjdCA9IFt4LHksdyxoXVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXHJcbiAgICB9XHJcblxyXG4gICAgbmV3UmVjdCA9IG5ldyBjbGlwUmVjdChSZWN0LHJlY3QwLHJlY3QxKTtcclxuXHJcbiAgICByZXR1cm4gbmV3UmVjdDtcclxuXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc0luUmVjdChbeCx5XTogW251bWJlcixudW1iZXJdLHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XHJcbiAgICAvL+WIpOaWreeCueaYr+WQpuWcqOefqeW9ouWGhVxyXG4gICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdC5zaGFwZS54LHJlY3Quc2hhcGUueSxyZWN0LnNoYXBlLndpZHRoLHJlY3Quc2hhcGUuaGVpZ2h0XVxyXG4gICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR3Jvd1JlY3QoZWw6IFJlY3RhbmdsZS8qfFJlY3RHcm91cHxHcm91cCovLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+ato+aUvui0n+e8qSBcclxuICAgIC8vIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxyXG4gICAgLy8ge1xyXG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgIHNoYXBlOntcclxuICAgICAgICAgICAgICAgIHg6ZWwuc2hhcGUueCAtIGgsXHJcbiAgICAgICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoICsgMipoLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSAtIHYsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0ICsgMip2XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBuZXdSZWN0XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUmVjdEdyb3VwKVxyXG4gICAgLy8ge1xyXG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnggLT0gaDtcclxuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS53aWR0aCArPSAyKmg7XHJcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueSAtPSB2O1xyXG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLmhlaWdodCArPSAyKnY7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBHcm91cCl7XHJcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcclxuICAgIC8vICAgICB7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XHJcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2V7XHJcbiAgICAvLyAgICAgY29uc29sZS5kaXIoXCLnsbvlnovplJnor69cIilcclxuICAgIC8vIH1cclxufSAgICAgICBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbnNldFJlY3QoZWw6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xyXG4gICAgLy/mraPnvKnotJ/mlL5cclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDplbC5zaGFwZS54ICs9IGgsXHJcbiAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggLT0gMipoLFxyXG4gICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55ICs9IHYsXHJcbiAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgLT0gMip2XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTY2FsZVJlY3QocmVjdDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+avlOS+i+e8qeaUvlxyXG4gICAgbGV0IGgwID0gcmVjdC5zaGFwZS53aWR0aCAqIChoLTEpIC8gMlxyXG4gICAgbGV0IHYwID0gcmVjdC5zaGFwZS5oZWlnaHQgKiAodi0xKSAvIDJcclxuICAgIGNvbnNvbGUuZGlyKGgwKycgJyt2MClcclxuICAgIGxldCBuZXdSZWN0ID0gR3Jvd1JlY3QocmVjdCxoMCx2MClcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJc0VtcHR5UmVjdChyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xyXG4gICAgLy/liKTmlq3nn6npmLXmmK/lkKbkuLrnqbpcclxuICAgIGxldCBhcmVhID0gcmVjdC5zaGFwZS53aWR0aCAqIHJlY3Quc2hhcGUuaGVpZ2h0O1xyXG4gICAgaWYoYXJlYSA9PT0gMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RPZk1hdHJpeCgpe1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RMZWZ0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIHJldHVybiByZWN0LnNoYXBlLnhcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RSaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XHJcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54ICsgcmVjdC5zaGFwZS53aWR0aFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdFRvcChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XHJcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWN0Qm90b20ocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xyXG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueSArIHJlY3Quc2hhcGUuaGVpZ2h0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVbmlvblJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogdW5pb25SZWN0e1xyXG4gICAgbGV0IG5ld1JlY3Q7XHJcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xyXG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcclxuICAgIGxldCB4LHksdyxoXHJcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcclxuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xyXG4gICAgeCA9IE1hdGgubWluKHhsMCx4bDEpO1xyXG4gICAgeSA9IE1hdGgubWluKHl0MCx5dDEpO1xyXG4gICAgdyA9IE1hdGgubWF4KHhyMCx4cjEpIC0geDtcclxuICAgIGggPSBNYXRoLm1heCh5YjAseWIxKSAtIHk7XHJcbiAgICBuZXdSZWN0ID0gbmV3IHVuaW9uUmVjdChbeCx5LHcsaF0scmVjdDAscmVjdDEpO1xyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxSZWN0KHJlY3Q6IFJlY3RhbmdsZSxmaWxsPzogc3RyaW5nKTogUmVjdGFuZ2xle1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJlY3QwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVJlY3QocmVjdDogUmVjdGFuZ2xlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XHJcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBzdHJva2UgPSAnIzAwMCdcclxuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlY3QwID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiByZWN0LnNoYXBlLnksXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHJlY3QwXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBDaXJjbGVTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgcjogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBDaXJjbGVPcHRzIGV4dGVuZHMgT3B0c3tcclxuICAgIHNoYXBlOiBDaXJjbGVTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcImNpcmNsZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcclxuICAgIH1cclxuICAgIGRlY2xhcmUgc2hhcGU6IENpcmNsZVNoYXBlXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBDaXJjbGVPcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDaXJjbGUoY2lyY2xlOiBDaXJjbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBDaXJjbGV7XHJcbiAgICBsZXQgc2ggPSBjaXJjbGUuc2hhcGVcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSk7XHJcbiAgICBqdWRnZVN0eWxlKGNpcmNsZSxjdHgpO1xyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcbiAgICByZXR1cm4gY2lyY2xlO1xyXG59IFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyYXdEb3RzKFt4LHkscl06IFtudW1iZXIsbnVtYmVyLG51bWJlcl0sY29sb3I6IHN0cmluZyk6IENpcmNsZXtcclxuICAgIGxldCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiB4LFxyXG4gICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICByOiByXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBmaWxsOiBjb2xvcixcclxuICAgICAgICAgICAgc3Ryb2tlIDogJ25vbmUnXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBjaXJjbGVcclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIHg6IG51bWJlcixcclxuICAgIHk6IG51bWJlcixcclxuICAgIHhFbmQ6IG51bWJlcixcclxuICAgIHlFbmQ6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgTGluZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IExpbmVTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJsaW5lXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogTGluZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgbGluZXtcclxuLy8gICAgIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xyXG4vLyAgICAgICAgIGxldCBsID0gdGhpcy5tYWtlTGluZShsaW5lLGN0eCk7XHJcbi8vICAgICAgICAgcmV0dXJuIGw7XHJcbi8vICAgICB9XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcclxuICAgIGxldCBzaCA9IGxpbmUuc2hhcGU7XHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxyXG4gICAgY3R4LmxpbmVUbyhzaC54RW5kLHNoLnlFbmQpXHJcbiAgICBqdWRnZVN0eWxlKGxpbmUsY3R4KVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgcmV0dXJuIGxpbmVcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyYXdMaW5lcyhlbDogTGluZVtdfEdyb3VwW118R3JvdXApOiBHcm91cHtcclxuICAgIC8v57uY5Yi25aSa5p2h57q/IG9wdHM657q/5p2h5bGe5oCnXHJcbiAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAoZWwpXHJcbiAgICByZXR1cm4gZ3JvdXBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERyYXdNbGluZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLGdhcD86IG51bWJlcltdLHN0eWxlPzogYm9vbGVhbixzdGlwcGxlPzogYm9vbGVhbix3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XHJcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgZ2Fw57q/5LmL6Ze055qE6Ze06ZqUIHN0eWxlPWZhbHNl5Li65rC05bmz5bmz6KGMLD10cnVl5Li656uW55u05bmz6KGMIHN0aXBwbGU9ZmFsc2XkuLrlrp7nur8sPXRydWXkuLromZrnur9cclxuICAgIGlmKHdpZHRoR2FwID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHdpZHRoR2FwICE9PSAnbnVtYmVyJylcclxuICAgIHtcclxuICAgICAgICB3aWR0aEdhcCA9IDEwO1xyXG4gICAgICAgIGlmKHN0aXBwbGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3RpcHBsZSAhPT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3RpcHBsZSA9PT0gZmFsc2VcclxuICAgICAgICAgICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3R5bGUgIT09ICdib29sZWFuJyl7XHJcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgaWYoZ2FwID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IFsxMDAsMTAwXVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZXQgb3B0cyA9IG5ldyBBcnJheSgpO1xyXG4gICAgXHJcbiAgICBpZihzdGlwcGxlID09PSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBvcHRzWzBdID0gbmV3IExpbmUgKHtcclxuICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcclxuICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XHJcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkrZ2FwW2ktMV0qaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZCtnYXBbaS0xXSppXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSAoe1xyXG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgrZ2FwW2ktMV0qaSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCtnYXBbaS0xXSppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgb3B0c1swXSA9IExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXSx3aWR0aEdhcCk7XHJcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCx5K2dhcFtpLTFdKmkseEVuZCx5RW5kK2dhcFtpLTFdKmldLHdpZHRoR2FwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3grZ2FwW2ktMV0qaSx5LHhFbmQrZ2FwW2ktMV0qaSx5RW5kXSx3aWR0aEdhcClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgICAgIFxyXG4gICAgXHJcbiAgICBsZXQgZ3JvdXAgPSBEcmF3TGluZXMob3B0cyk7XHJcbiAgICByZXR1cm4gZ3JvdXBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xyXG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIHdpZHRoR2Fw6Ze06ZqUIFxyXG4gICAgbGV0IGxpbmVsZW5ndGggPSBNYXRoLnNxcnQoTWF0aC5wb3coeEVuZC14LDIpK01hdGgucG93KHlFbmQteSwyKSlcclxuICAgIGlmKHdpZHRoR2FwPmxpbmVsZW5ndGh8fHdpZHRoR2FwPT09dW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHdpZHRoR2FwID0gbGluZWxlbmd0aC8xMDtcclxuICAgIH1cclxuICAgIGxldCBudW0gPSBNYXRoLmZsb29yKGxpbmVsZW5ndGgvd2lkdGhHYXApXHJcbiAgICBsZXQgeGcgPSB3aWR0aEdhcCooeEVuZC14KS9saW5lbGVuZ3RoXHJcbiAgICBsZXQgeWcgPSB3aWR0aEdhcCooeUVuZC15KS9saW5lbGVuZ3RoXHJcbiAgICAvLyBjb25zb2xlLmRpcihudW0pXHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICBsZXQgbGluZSA9IG5ldyBBcnJheSgpO1xyXG4gICAgd2hpbGUoaTxudW0pXHJcbiAgICB7XHJcbiAgICAgICAgbGluZVtpXSA9IG5ldyBMaW5lKHtcclxuICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgIHg6IHgreGcqaSxcclxuICAgICAgICAgICAgICAgIHk6IHkreWcqaSxcclxuICAgICAgICAgICAgICAgIHhFbmQ6IHgreGcqKGkrMSksXHJcbiAgICAgICAgICAgICAgICB5RW5kOiB5K3lnKihpKzEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIGkrPTI7XHJcbiAgICB9XHJcbiAgICBsZXQgTGluZVN0aXBwbGUgPSBuZXcgR3JvdXAobGluZSlcclxuICAgIHJldHVybiBMaW5lU3RpcHBsZVxyXG59XHJcblxyXG4vLyBleHBvcnQgY2xhc3MgUG9seSBleHRlbmRzIEdyb3Vwe1xyXG4vLyAgICAgc3R5bGU6IFN0eWxlXHJcbi8vICAgICBjb25zdHJ1Y3RvcihlbDogTGluZVtdfEdyb3VwW118R3JvdXAsc3R5bGU/OiBTdHlsZSl7XHJcbi8vICAgICAgICAgc3VwZXIoZWwpXHJcbi8vICAgICAgICAgaWYoc3R5bGUpXHJcbi8vICAgICAgICAge1xyXG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIGVsc2V7XHJcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbi8vICAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuLy8gICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbi8vICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgIH1cclxuLy8gICAgIH1cclxuLy8gfSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBBcmNTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgcjogbnVtYmVyLFxyXG4gICAgYW5nX2Y6IG51bWJlcixcclxuICAgIGFuZ19lOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIEFyY09wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IEFyY1NoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFyYyBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiYXJjXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogQXJjT3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVJZCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQXJje1xyXG4gICAgbGV0IHN0ID0gYXJjLnN0eWxlXHJcbiAgICBpZihzdC5maWxsID09PSB1bmRlZmluZWQgfHwgc3QuZmlsbCA9PT0gJ25vbmUnIHx8IHN0LmZpbGwgPT09ICcjZmZmJylcclxuICAgIHtcclxuICAgICAgICBtYWtlRnJhbWVBcmMoYXJjLGN0eCk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIG1ha2VGaWxsQXJjKGFyYyxjdHgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyYztcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUZyYW1lQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcclxuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLHNoLmFuZ19mLHNoLmFuZ19lKTtcclxuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZUZpbGxBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxyXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2YpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZikpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcclxuICAgIGN0eC5zdHJva2UoKVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcclxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19lKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2UpKTtcclxuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXHJcbiAgICBjdHguc3Ryb2tlKClcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG5cclxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XHJcbiAgICBqdWRnZVN0eWxlKGFyYyxjdHgpO1xyXG4gICAgXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lQXJjKGFyYzogQXJjLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBBcmN7XHJcbiAgICAvL+eUu+eyl+e6v+W8pyBcclxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xyXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICAvLyBqdWRnZVN0eWxlX2V6c3koYXJjKVxyXG5cclxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogYXJjLnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxyXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcclxuICAgICAgICAgICAgYW5nX2Y6IGFyYy5zaGFwZS5hbmdfZixcclxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXHJcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gYXJjMFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmlsbEFyYyhhcmM6IEFyYyxmaWxsPzogc3RyaW5nKTogQXJje1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxyXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxyXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBmaWxsOiBmaWxsXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICByZXR1cm4gYXJjMFxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcblxyXG5pbnRlcmZhY2UgRWxsaXBzZVNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4PzogbnVtYmVyLFxyXG4gICAgeT86IG51bWJlcixcclxuICAgIHJhPzogbnVtYmVyLFxyXG4gICAgcmI/OiBudW1iZXJcclxuICAgIC8vcmHkuLrmqKrovbTplb8gcmLkuLrnurXovbTplb9cclxufVxyXG5cclxuaW50ZXJmYWNlIEVsbGlwc2VPcHRzIGV4dGVuZHMgT3B0c3tcclxuICAgIHNoYXBlOiBFbGxpcHNlU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxufVxyXG5cclxubGV0IG5hbWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiZWxsaXBzZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEVsbGlwc2VPcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbGxpcHNlKGVsbGlwc2U6IEVsbGlwc2UsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBFbGxpcHNle1xyXG4gICAgLy9tYXjmmK/nrYnkuo4x6Zmk5Lul6ZW/6L205YC8YeWSjGLkuK3nmoTovoPlpKfogIVcclxuICAgIC8vaeavj+asoeW+queOr+WinuWKoDEvbWF477yM6KGo56S65bqm5pWw55qE5aKe5YqgXHJcbiAgICAvL+i/meagt+WPr+S7peS9v+W+l+avj+asoeW+queOr+aJgOe7mOWItueahOi3r+W+hO+8iOW8p+e6v++8ieaOpei/kTHlg4/ntKBcclxuICAgIGxldCBzaCA9IGVsbGlwc2Uuc2hhcGVcclxuICAgIGxldCBzdGVwID0gKHNoLnJhID4gc2gucmIpID8gMSAvIHNoLnJhIDogMSAvIHNoLnJiO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4Lm1vdmVUbyhzaC54ICsgc2gucmEsIHNoLnkpOyAvL+S7juakreWchueahOW3puerr+eCueW8gOWni+e7mOWItlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyICogTWF0aC5QSTsgaSArPSBzdGVwKVxyXG4gICAge1xyXG4gICAgICAgIC8v5Y+C5pWw5pa556iL5Li6eCA9IGEgKiBjb3MoaSksIHkgPSBiICogc2luKGkp77yMXHJcbiAgICAgICAgLy/lj4LmlbDkuLpp77yM6KGo56S65bqm5pWw77yI5byn5bqm77yJXHJcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54ICsgc2gucmEgKiBNYXRoLmNvcyhpKSwgc2gueSArIHNoLnJiICogTWF0aC5zaW4oaSkpO1xyXG4gICAgfVxyXG4gICAganVkZ2VTdHlsZShlbGxpcHNlLGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKCk7XHJcbiAgICByZXR1cm4gZWxsaXBzZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmlsbE92YWwoZWxsaXBzZTogRWxsaXBzZSxmaWxsPzogc3RyaW5nKTogRWxsaXBzZXtcclxuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xyXG4gICAgfVxyXG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxyXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcclxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGVsbGlwc2UwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFtZU92YWwoZWxsaXBzZTogRWxsaXBzZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogRWxsaXBzZXtcclxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xyXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxyXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXHJcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBlbGxpcHNlMFxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcblxyXG5pbnRlcmZhY2UgUG9seWdvblNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xyXG4gICAgeEE6IG51bWJlcltdXHJcbiAgICB5QTogbnVtYmVyW11cclxufVxyXG5cclxuaW50ZXJmYWNlIFBvbHlnb25PcHRzIGV4dGVuZHMgT3B0c3tcclxuICAgIHNoYXBlOiBQb2x5Z29uU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxufVxyXG5cclxubGV0IG5hbWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwicG9seWdvblwiICsgbmFtZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFBvbHlnb25PcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQb2x5Z29uKHBvbHlnb246IFBvbHlnb24sY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBQb2x5Z29ue1xyXG4gICAgbGV0IHNoID0gcG9seWdvbi5zaGFwZVxyXG4gICAgbGV0IG51bSA9IDA7XHJcbiAgICBpZihzaC54QS5sZW5ndGggIT09IHNoLnlBLmxlbmd0aClcclxuICAgIHtcclxuICAgICAgICBudW0gPSBNYXRoLm1pbihzaC54QS5sZW5ndGgsc2gueUEubGVuZ3RoKVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBudW0gPSBzaC54QS5sZW5ndGhcclxuICAgIH1cclxuXHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5tb3ZlVG8oc2gueEFbMF0sc2gueUFbMF0pXHJcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKVxyXG4gICAge1xyXG4gICAgICAgIGN0eC5saW5lVG8oc2gueEFbaV0sc2gueUFbaV0pXHJcbiAgICB9XHJcbiAgICBjdHgubGluZVRvKHNoLnhBWzBdLHNoLnlBWzBdKVxyXG4gICAganVkZ2VTdHlsZShwb2x5Z29uLGN0eClcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG5cclxuICAgIHJldHVybiBwb2x5Z29uXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVBvbHkocG9seWdvbjogUG9seWdvbixsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUG9seWdvbntcclxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xyXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXHJcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXHJcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBwb2x5Z29uMFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmlsbFBvbHkocG9seWdvbjogUG9seWdvbixmaWxsPzogc3RyaW5nKTogUG9seWdvbntcclxuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xyXG4gICAgfVxyXG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxyXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHBvbHlnb24wXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGVfdGV4dCwganVkZ2VUZXh0U3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBUZXh0U2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXHJcbiAgICB4OiBudW1iZXJcclxuICAgIHk6IG51bWJlclxyXG4gICAgdGV4dDogc3RyaW5nXHJcbiAgICBtYXhXaWR0aD86IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgVGV4dE9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IFRleHRTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJ0ZXh0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogVGV4dE9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXHJcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUZXh0KHRleHQ6IFRleHQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBUZXh0e1xyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG5cclxuICAgIGp1ZGdlVGV4dFN0eWxlKHRleHQsY3R4KVxyXG5cclxuICAgIGp1ZGdlU3R5bGVfdGV4dCh0ZXh0LGN0eClcclxuICAgIFxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgcmV0dXJuIHRleHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENhdFN0cihzdHJBOiBzdHJpbmdbXSk6IHN0cmluZ3tcclxuICAgIGxldCB0ZXh0ID0gJydcclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ckEubGVuZ3RoO2krKylcclxuICAgIHtcclxuICAgICAgICB0ZXh0ICs9IHN0ckFbaV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gU3RyUGFkKHN0cjogc3RyaW5nLHN0cjA6IHN0cmluZyxudW0/OiBudW1iZXIpOiBzdHJpbmd7XHJcbiAgICBsZXQgdGV4dCA9ICcnXHJcbiAgICBcclxuICAgIGlmKG51bSA9PT0gdW5kZWZpbmVkIHx8IG51bSA9PT0gMClcclxuICAgIHtcclxuICAgICAgICBudW0gPSAxO1xyXG4gICAgfVxyXG5cclxuICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKylcclxuICAgIHtcclxuICAgICAgICB0ZXh0ICs9IHN0cjBcclxuICAgIH1cclxuICAgIHRleHQgKz0gc3RyXHJcblxyXG4gICAgcmV0dXJuIHRleHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVxKHN0cjA6IHN0cmluZyxzdHIxOiBzdHJpbmcpOiBib29sZWFue1xyXG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXHJcbiAgICByZXN1bHQgPSBzdHIwLmluY2x1ZGVzKHN0cjEpO1xyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVwbGFjZShzdHI6IHN0cmluZyxzdHJfbzogc3RyaW5nLHN0cl9yOiBzdHJpbmcpOnN0cmluZ3tcclxuICAgIGxldCByZXN1bHQgPSAnJ1xyXG5cclxuICAgIHJlc3VsdCA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyX28sJ2cnKSxzdHJfcik7XHJcblxyXG4gICAgcmV0dXJuIHJlc3VsdFxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcclxuaW1wb3J0IHsganVkZ2VJbWFnZVNoYXBlLCBqdWRnZVN0eWxlLGp1ZGdlSW1hZ2VTaGFwZV90cnVlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcblxyXG5pbnRlcmZhY2UgSW1nU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIGltZzogc3RyaW5nXHJcbiAgICB4OiBudW1iZXJcclxuICAgIHk6IG51bWJlclxyXG4gICAgd2lkdGg/OiBudW1iZXJcclxuICAgIGhlaWdodD86IG51bWJlclxyXG4gICAgc3g/OiBudW1iZXJcclxuICAgIHN5PzogbnVtYmVyXHJcbiAgICBzd2lkdGg/OiBudW1iZXJcclxuICAgIHNoZWlnaHQ/OiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIEltZ09wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IEltZ1NoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbiAgICBJbWc/OiBhbnlcclxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcclxufVxyXG5cclxubGV0IG5hbWVJZCA9IDA7XHJcblxyXG5jbGFzcyBSR0JBIHtcclxuICAgIFI6IG51bWJlclxyXG4gICAgRzogbnVtYmVyXHJcbiAgICBCOiBudW1iZXJcclxuICAgIEE6IG51bWJlclxyXG59XHJcblxyXG5jbGFzcyBSR0JBX0FycmF5e1xyXG4gICAgUkdCQV9MaXN0OiBSR0JBW11cclxuICAgIHdpZHRoOiBudW1iZXJcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJbWcgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcImltZ1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXHJcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcclxuICAgIH1cclxuICAgIEltZz86IGFueVxyXG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxyXG4gICAgSXNDaGFuZ2U/OiBib29sZWFuXHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBJbWdPcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgaWYob3B0cy5JbWcgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGxldCBJID0gbmV3IEltYWdlKClcclxuICAgICAgICAgICAgSS5zcmMgPSBvcHRzLnNoYXBlLmltZ1xyXG4gICAgICAgICAgICB0aGlzLkltZyA9IEk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuSW1nID0gb3B0cy5JbWdcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXHJcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IHtcclxuICAgICAgICAvLyAgICAgdGV4dHVyZTogW10sXHJcbiAgICAgICAgLy8gICAgIHdpZHRoOiAwLFxyXG4gICAgICAgIC8vICAgICBoZWlnaHQ6IDBcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgLy8gaWYob3B0cy5JbWdEYXRhICE9PSB1bmRlZmluZWQpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeCA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3kgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3kgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5zd2lkdGggPSB0aGlzLkltZy53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlLnNoZWlnaHQgPSB0aGlzLkltZy5oZWlnaHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMuc2hhcGUud2lkdGggPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUud2lkdGggPSB0aGlzLkltZy53aWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS5oZWlnaHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxyXG5cclxuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLkltZ0RhdGEpXHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICAvLyBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIC8vIHtcclxuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG4gICAgaW5pdCgpe1xyXG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGVcclxuICAgICAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbiAgICAgICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxyXG4gICAgICAgIGMud2lkdGggPSBzY3JlZW4uYXZhaWxXaWR0aDtcclxuICAgICAgICBjLmhlaWdodCA9IHNjcmVlbi5hdmFpbEhlaWdodDtcclxuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuSW1nLHNoLngsc2gueSlcclxuICAgICAgICB0aGlzLkltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKHNoLngsc2gueSx0aGlzLkltZy53aWR0aCx0aGlzLkltZy5oZWlnaHQpO1xyXG4gICAgICAgIC8vIHRoaXMubWFrZVRleHR1cmVzKClcclxuICAgIH1cclxuICAgIHRvR3JheSgpe1xyXG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1nKHtcclxuICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgIGltZzogdGhpcy5zaGFwZS5pbWcsXHJcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnNoYXBlLngsXHJcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnNoYXBlLnksXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zaGFwZS5oZWlnaHQsXHJcbiAgICAgICAgICAgICAgICBzeDogdGhpcy5zaGFwZS5zeCxcclxuICAgICAgICAgICAgICAgIHN5OiB0aGlzLnNoYXBlLnN5LFxyXG4gICAgICAgICAgICAgICAgc3dpZHRoOiB0aGlzLnNoYXBlLnN3aWR0aCxcclxuICAgICAgICAgICAgICAgIHNoZWlnaHQ6IHRoaXMuc2hhcGUuc2hlaWdodCxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLy8gdGhpcy5Jc0NoYW5nZSA9IHRydWVcclxuICAgICAgICBpbWcuSXNDaGFuZ2UgPSB0cnVlXHJcbiAgICAgICAgbGV0IGcgPSAwXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGhpcy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZyA9IE1hdGguZmxvb3IodGhpcy5JbWdEYXRhLmRhdGFbNCppKzBdICogMC4yOTkgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMV0gKiAwLjU4NyArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsyXSAqIDAuMTE0KTtcclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF0gPSBnXHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdID0gZ1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsyXSA9IGdcclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gPSB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrM11cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGltZztcclxuICAgIH1cclxuICAgIHJlcGxhY2UoKXtcclxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcclxuICAgICAgICB0aGlzLmluaXQoKVxyXG4gICAgfVxyXG4gICAgbWFrZVRleHR1cmVzKCl7XHJcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IG5ldyBUZXh0dXJlcyh0aGlzKTtcclxuICAgICAgICBsZXQgaW1nID0gdGhpcy50b0dyYXkoKTtcclxuICAgICAgICBsZXQgZGF0YTAgPSBpbWcuSW1nRGF0YS5kYXRhO1xyXG4gICAgICAgIGxldCBhID0gbmV3IEFycmF5KClcclxuICAgICAgICBsZXQgYXJyID0gJydcclxuICAgICAgICBsZXQgbnVtQXJyOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIGxldCBudW1BcnIwOiBudW1iZXJbXSA9IFtdO1xyXG4gICAgICAgIC8vIGxldCBkYXRhID0gdGhpcy5JbWdEYXRhLmRhdGFcclxuICAgICAgICBsZXQgdyA9IHRoaXMuSW1nRGF0YS53aWR0aFxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZGF0YSlcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhMC5sZW5ndGgvNDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAzO3QrKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDtrIDwgMztrKyspXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YTBbNCppXSA8PSBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gfHwgZGF0YTBbNCooaSsodC0xKSp3K2stMSldID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDBcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAxXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmKDMqdCtrICE9PSA0KVxyXG4gICAgICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYXJyICs9IGFbMyp0K2tdLnRvU3RyaW5nKCk7IFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoaSsodC0xKSp3K2stMSkpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBudW1BcnJbaV0gPSBwYXJzZUludChhcnIsMilcclxuICAgICAgICAgICAgYXJyID0gJydcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbnVtQXJyLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXT1udW1BcnJbaV1cclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV09bnVtQXJyW2ldXHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdPW51bUFycltpXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUltZyhpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEltZ3tcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgaWYoaW1nLklzQ2hhbmdlID09PSBmYWxzZSlcclxuICAgIHtcclxuICAgICAgICBqdWRnZUltYWdlU2hhcGUoaW1nLGN0eCk7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZyxjdHgpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuICAgIHJldHVybiBpbWdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGltUmVhZChpbWc6IEltZyk6IEltYWdlRGF0YXsgICAgICAgICAvL+ivu+WPluWbvueJh+efqemYtVxyXG4gICAgcmV0dXJuIGltZy5JbWdEYXRhO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVW5wYWNrQ29sb3JJbWFnZShpbWc6IEltZyk6IFJHQkFfQXJyYXl7XHJcbiAgICBsZXQgcmdiYSA9IG5ldyBBcnJheSgpXHJcbiAgICBsZXQgZGF0YSA9IGltZy5JbWdEYXRhLmRhdGFcclxuICAgIFxyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YS5sZW5ndGgvNDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgcmdiYVtpXSA9IG5ldyBSR0JBKClcclxuICAgICAgICBcclxuICAgICAgICByZ2JhW2ldLlIgPSBkYXRhWzQqaSswXVxyXG4gICAgICAgIHJnYmFbaV0uRyA9IGRhdGFbNCppKzFdXHJcbiAgICAgICAgcmdiYVtpXS5CID0gZGF0YVs0KmkrMl1cclxuICAgICAgICByZ2JhW2ldLkEgPSBkYXRhWzQqaSszXVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBsZXQgcmdiYV9hcnIgPSBuZXcgUkdCQV9BcnJheSgpXHJcbiAgICByZ2JhX2Fyci5SR0JBX0xpc3QgPSByZ2JhO1xyXG4gICAgcmdiYV9hcnIud2lkdGggPSBpbWcuSW1nRGF0YS53aWR0aFxyXG4gICAgcmdiYV9hcnIuaGVpZ2h0ID0gaW1nLkltZ0RhdGEuaGVpZ2h0XHJcblxyXG4gICAgcmV0dXJuIHJnYmFfYXJyXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQYWNrQ29sb3JJbWFnZShyZ2JhX2FycjogUkdCQV9BcnJheSk6IEltYWdlRGF0YXtcclxuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcclxuXHJcbiAgICBsZXQgaW1nZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEocmdiYV9hcnIud2lkdGgscmdiYV9hcnIuaGVpZ2h0KTtcclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IHJnYmFfYXJyLlJHQkFfTGlzdC5sZW5ndGg7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMF0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uUlxyXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMV0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uR1xyXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMl0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQlxyXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrM10gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGltZ2RhdGFcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZUluKGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcclxuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXHJcbiAgICB7XHJcbiAgICAgICAgYWxwaGFJbiA9IDE7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxyXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXHJcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcclxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9IGFscGhhSW5cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHJldHVybiBuZXdJbWdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZU91dChpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XHJcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxyXG4gICAge1xyXG4gICAgICAgIGFscGhhSW4gPSAwO1xyXG4gICAgfVxyXG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcclxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxyXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXHJcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXHJcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcclxuICAgIHtcclxuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSAoMSAtIGFscGhhSW4pXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICByZXR1cm4gbmV3SW1nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBJbWdJbml0KGltZzogSW1nW118R3JvdXApe1xyXG4gICAgbGV0IEk7XHJcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXHJcbiAgICB7XHJcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIEkgPSBpbWdcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgSS5ncm91cExpc3RbaV0uaW5pdCgpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBQcmVsb2FkVGV4dHVyZXMoaW1nOiBJbWcpOiBJbWd7XHJcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xyXG4gICAgcmV0dXJuIG5ld0ltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmUoaW1nOiBJbWcpOiBJbWd7XHJcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xyXG4gICAgcmV0dXJuIG5ld0ltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmVzKGltZzogSW1nW118R3JvdXApOiBHcm91cHtcclxuICAgIGxldCBJO1xyXG4gICAgbGV0IHRleHR1cmU6IEltZ1tdID0gW11cclxuICAgIGxldCBUO1xyXG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxyXG4gICAge1xyXG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBJID0gaW1nXHJcbiAgICB9XHJcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRleHR1cmVbaV0gPSBEcmF3VGV4dHVyZShJLmdyb3VwTGlzdFtpXSlcclxuICAgIH1cclxuICAgIFQgPSBuZXcgR3JvdXAodGV4dHVyZSlcclxuICAgIHJldHVybiBUO1xyXG59IiwiaW1wb3J0IHtjYW52YXNTdHlsZX0gZnJvbSAnLi4vQ2FudmFzL2NhbnZhcydcclxuaW1wb3J0IHsgUmVjdGFuZ2xlLG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCcgXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsgQ2lyY2xlLG1ha2VDaXJjbGUgfSBmcm9tICcuLi9HcmFwaGljL2NpcmNsZSdcclxuaW1wb3J0IHsgTGluZSwgbWFrZUxpbmV9IGZyb20gJy4uL0dyYXBoaWMvbGluZSdcclxuaW1wb3J0IHsgQXJjLCBtYWtlQXJjIH0gZnJvbSAnLi4vR3JhcGhpYy9hcmMnXHJcbmltcG9ydCB7IEVsbGlwc2UsIG1ha2VFbGxpcHNlIH0gZnJvbSAnLi4vR3JhcGhpYy9lbGxpcHNlJ1xyXG5pbXBvcnQgeyBtYWtlUG9seWdvbiwgUG9seWdvbiB9IGZyb20gJy4uL0dyYXBoaWMvcG9seWdvbidcclxuaW1wb3J0IHsgbWFrZVRleHQsIFRleHQgfSBmcm9tICcuLi9HcmFwaGljL3RleHQnXHJcbmltcG9ydCB7IEltZywgbWFrZUltZyB9IGZyb20gJy4uL0dyYXBoaWMvaW1hZ2UnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKTpjYW52YXNTdHlsZXtcclxuICAgIGlmKCFjU3R5bGUpIFxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZSA9IHtcclxuICAgICAgICAgICAgd2lkdGg6IDQwMCxcclxuICAgICAgICAgICAgaGVpZ2h0OiA0MDBcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZighY1N0eWxlLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZS53aWR0aCA9IDQwMFxyXG4gICAgfVxyXG4gICAgaWYoIWNTdHlsZS5oZWlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgY1N0eWxlLmhlaWdodCA9IDQwMFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNTdHlsZTtcclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGUoc3R5bGU6IFN0eWxlKXtcclxuLy8gICAgIGlmKCFzdHlsZSlcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRWxlbWVudChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgLy8gY29uc29sZS5kaXIoZWwpXHJcbiAgICAvLyBjb25zb2xlLmRpcihSZWN0YW5nbGUpXHJcbiAgICAvLyBjb25zb2xlLmRpcihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcclxuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcclxuICAgICAgICBtYWtlUmVjdGFuZ2xlKGVsLGN0eCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VDaXJjbGUoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VMaW5lKGVsLGN0eCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VBcmMoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VFbGxpcHNlKGVsLGN0eClcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VQb2x5Z29uKGVsLGN0eClcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBUZXh0KVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VUZXh0KGVsLGN0eCk7XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgSW1nKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VJbWcoZWwsY3R4KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihlbClcclxuICAgICAgICBsZXQgbGlzdCA9IGVsLmdyb3VwTGlzdDtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihsaXN0WzBdKVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcclxuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZWwuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcclxuICAgIGlmKHN0LmxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkKXtcclxuICAgICAgICBzdC5saW5lV2lkdGggPSAxO1xyXG4gICAgfVxyXG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcblxyXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4gICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHN0LnN0cm9rZSA9IFwiIzAwMFwiXHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGlmKCEoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpKXtcclxuICAgIC8vICAgICAvLyBzdC5zdHJva2UgPSAnIzAwMCc7XHJcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vICAgICBlbHNle1xyXG4gICAgLy8gICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxyXG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAvLyAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XHJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAvLyB9XHJcbiAgICAvLyBlbHNle1xyXG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xyXG4gICAgLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcclxuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgIC8vICAgICB9XHJcbiAgICAvLyB9XHJcbiAgICBcclxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4gICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xyXG4gICAgLy8gY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgIC8vIGN0eC5maWxsKCk7XHJcbiAgICAvLyBjdHguc3Ryb2tlKCk7XHJcbn1cclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZV90ZXh0KGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIGVsLnN0eWxlID0ge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxyXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XHJcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAgICAgY3R4LmZpbGxUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUZXh0U3R5bGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcclxuICAgIGxldCBzdCA9IGVsLnN0eWxlXHJcbiAgICBsZXQgZm9udFN0cmluZyA9ICcnO1xyXG4gICAgaWYoc3QgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBzdCA9IHtcclxuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcclxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTdHlsZSAhPT0gJ25vbmUnKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlIDwgMyAmJiBzdC5mb250U3R5bGUgPj0wKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09IDApXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAxKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdpdGFsaWMnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9IHN0LmZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgIT09ICdpdGFsaWMnICYmIHN0LmZvbnRTdHlsZSAhPT0gJ29ibGlxdWUnICYmIHN0LmZvbnRTdHlsZSAhPT0gXCJub3JtYWxcIil7XHJcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09ICcwJyl7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMScpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMicpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3QuZm9udFZhcmlhbnQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250VmFyaWFudCAhPT0gJ25vbmUnKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ2Jvb2xlYW4nKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09IGZhbHNlKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFZhcmlhbnQgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSBzdC5mb250VmFyaWFudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCAhPT0gJ25vcm1hbCcgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdzbWFsbC1jYXBzJylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09ICd0cnVlJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbm9uZScpe1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnbnVtYmVyJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSBzdC5mb250V2VpZ2h0LnRvU3RyaW5nKClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFdlaWdodCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGRlcicgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2xpZ2h0ZXInKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0LmZvbnRTaXplICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFNpemUgIT09ICdub25lJylcclxuICAgIHtcclxuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFNpemUgPSBzdC5mb250U2l6ZS50b1N0cmluZygpICsgJ3B4J1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250U2l6ZS5pbmRleE9mKCdweCcpID09PSAtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgc3QuZm9udFNpemUgPSBzdC5mb250U2l6ZSArICdweCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFNpemUgPSAnMThweCdcclxuICAgIH1cclxuICAgIGZvbnRTdHJpbmcgPSBzdC5mb250U3R5bGUgKyAnICcgKyBzdC5mb250VmFyaWFudCArICcgJyArIHN0LmZvbnRXZWlnaHQgKyAnICcgKyBzdC5mb250U2l6ZSArICcgJyArIHN0LmZvbnRGYW1pbHk7XHJcbiAgICBjdHguZm9udCA9IGZvbnRTdHJpbmc7XHJcbiAgICBjb25zb2xlLmRpcihmb250U3RyaW5nKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDaGFuZ2VUeXBlKGVsOiBudW1iZXJ8c3RyaW5nKTogbnVtYmVye1xyXG4gICAgbGV0IHggPSAxO1xyXG4gICAgLy8gY29uc29sZS5kaXIoZWwpXHJcbiAgICBpZih0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXHJcbiAgICB7XHJcbiAgICAgICAgZWwgPSBlbC50b1VwcGVyQ2FzZSgpO1xyXG4gICAgICAgIGlmKGVsID09PSBcIkNFTlRFUlwiIHx8IGVsID09PSAnQycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RMRUZUJyB8fCBlbCA9PT0gXCJMRUZUXCIgfHwgZWwgPT09ICdMJyl7XHJcbiAgICAgICAgICAgIHggPSAxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFRPUCcgfHwgZWwgPT09IFwiVE9QXCIgfHwgZWwgPT09ICdUJyl7XHJcbiAgICAgICAgICAgIHggPSAyO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFJJR0hUJyB8fCBlbCA9PT0gXCJSSUdIVFwiIHx8IGVsID09PSAnUicpe1xyXG4gICAgICAgICAgICB4ID0gMztcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RCT1RUT00nIHx8IGVsID09PSBcIkJPVFRPTVwiIHx8IGVsID09PSAnQicpe1xyXG4gICAgICAgICAgICB4ID0gNDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBpbnN0cnVjdGlvbiEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYodHlwZW9mIGVsID09PSBcIm51bWJlclwiKVxyXG4gICAge1xyXG4gICAgICAgIGlmKGVsPDUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4ID0gZWw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2VcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZVxyXG4gICAge1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXHJcbiAgICB9XHJcbiAgICByZXR1cm4geDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU2lkZShzaWRlMDogbnVtYmVyfHN0cmluZyxzaWRlMTogbnVtYmVyfHN0cmluZyk6IFtudW1iZXIsbnVtYmVyXXtcclxuICAgIGxldCBmMCA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMCk7XHJcbiAgICBsZXQgZjEgPSBqdWRnZUNoYW5nZVR5cGUoc2lkZTEpO1xyXG4gICAgaWYoZjAgPT09IDIgfHwgZjAgPT09IDQpe1xyXG4gICAgICAgIGlmKGYxID09PSAyIHx8IGYxID09PSA0KXtcclxuICAgICAgICAgICAgZjEgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBsZXQgdCA9IGYxO1xyXG4gICAgICAgICAgICBmMSA9IGYwO1xyXG4gICAgICAgICAgICBmMCA9IHQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpe1xyXG4gICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAzKXtcclxuICAgICAgICAgICAgZjEgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiBbZjAsZjFdXHJcbn0gICBcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUltYWdlU2hhcGUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXHJcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC54LHNoLnkpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodCxzaC54LHNoLnksaW1nLkltZy53aWR0aCxpbWcuSW1nLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXHJcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55KVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSXNJbkVsZW1lbnQoW3gseV06IFtudW1iZXIsbnVtYmVyXSxlbDogRWxlbWVudHMpOiBib29sZWFue1xyXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIGxldCBbeDAseTAsdzAsaDBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS53aWR0aCxlbC5zaGFwZS5oZWlnaHRdXHJcbiAgICAgICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IFt4MCx5MCxyMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJdXHJcbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeC14MCwyKSArIE1hdGgucG93KHkteTAsMikpXHJcbiAgICAgICAgaWYociA8PSByMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBbeDAseTAseDEseTFdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS54RW5kLGVsLnNoYXBlLnlFbmRdXHJcbiAgICAgICAgaWYoeDEgIT09IHgwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IHl0ID0gKHkxLXkwKS8oeDEteDApICogKHggLSB4MCkgKyB5MFxyXG4gICAgICAgICAgICBpZih5ID49IHl0LTE1ICYmIHkgPD0geXQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCB4dCA9ICh4MS14MCkvKHkxLXkwKSAqICh5IC0geTApICsgeDBcclxuICAgICAgICAgICAgaWYoeSA+PSB4dC0xNSAmJiB5IDw9IHh0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXHJcbiAgICB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgW3gwLHkwLHJhMCxyYjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yYSxlbC5zaGFwZS5yYl1cclxuICAgICAgICBsZXQgdCA9IE1hdGgucG93KHgteDAsMikvTWF0aC5wb3cocmEwLDIpICsgTWF0aC5wb3coeS15MCwyKS9NYXRoLnBvdyhyYjAsMilcclxuICAgICAgICBpZih0IDw9IDEpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcclxuICAgIHtcclxuICAgICAgICBsZXQgaSA9IDBcclxuICAgICAgICBsZXQgaiA9IGkgKyAxXHJcbiAgICAgICAgbGV0IGluZGV4ID0gMFxyXG4gICAgICAgIGxldCB4dCA9IG5ldyBBcnJheSgpXHJcbiAgICAgICAgbGV0IHl0ID0gbmV3IEFycmF5KClcclxuICAgICAgICBsZXQgW3gwLHkwXSA9IFtlbC5zaGFwZS54QSxlbC5zaGFwZS55QV1cclxuICAgICAgICBmb3IoaSA9IDA7aTxlbC5zaGFwZS54QS5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaSA9PT0gZWwuc2hhcGUueEEubGVuZ3RoLTEpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGogPSAwXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIGogPSBpICsgMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmKHkwW2ldICE9PSB5MFtqXSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgeHRbaW5kZXhdID0gKHgwW2ldLXgwW2pdKS8oeTBbaV0teTBbal0pICogKHkgLSB5MFtpXSkgKyB4MFtpXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICB5dFtpbmRleF0gPSAoeTBbal0teTBbaV0pLyh4MFtqXS14MFtpXSkgKiAoeCAtIHgwW2ldKSArIHkwW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoeCA9PT0geHRbaW5kZXhdKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2UgaWYoeHRbaW5kZXhdID49IHgpe1xyXG4gICAgICAgICAgICAgICAgaW5kZXgrK1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKGluZGV4JTI9PT0wKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgbGV0IGNcclxuICAgIC8vICAgICBsZXQgaSxqXHJcbiAgICAvLyAgICAgbGV0IGwgPSBlbC5zaGFwZS55QS5sZW5ndGhcclxuICAgIC8vICAgICBmb3IoYyA9IGZhbHNlLGkgPSAtMSxqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSBcclxuICAgIC8vICAgICAgICAgKCAoZWwuc2hhcGUueUFbaV0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbal0pIHx8IChlbC5zaGFwZS55QVtqXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtpXSkgKSBcclxuICAgIC8vICAgICAgICAgJiYgKHggPCAoZWwuc2hhcGUueEFbal0gLSBlbC5zaGFwZS54QVtpXSkgKiAoeSAtIGVsLnNoYXBlLnlBW2ldKSAvIChlbC5zaGFwZS55QVtqXSAtIGVsLnNoYXBlLnlBW2ldKSArIGVsLnNoYXBlLnhBW2ldKSBcclxuICAgIC8vICAgICAgICAgJiYgKGMgPSAhYyk7IFxyXG4gICAgLy8gICAgIHJldHVybiBjOyBcclxuICAgIC8vIH1cclxufSIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIGNhbnZhc1N0eWxle1xyXG4gICAgd2lkdGg/OiBudW1iZXI7XHJcbiAgICBoZWlnaHQ/OiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHtcclxuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xyXG4gICAgLy8gbGV0IGNTdHlsZTogY2FudmFzU3R5bGUgPSB7XHJcbiAgICAvLyAgICAgd2lkdGg6IDEwMCxcclxuICAgIC8vICAgICBoZWlnaHQ6IDEwMFxyXG4gICAgLy8gfVxyXG4gICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcclxuICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcclxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICBkb20uYXBwZW5kKGMpO1xyXG4gICAgcmV0dXJuIGN0eDtcclxufSIsIlxyXG5jbGFzcyB0aW1le1xyXG4gICAgaG91cjogbnVtYmVyXHJcbiAgICBtaW51dGVzOiBudW1iZXJcclxuICAgIHNlY29uZHM6IG51bWJlclxyXG4gICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXHJcbiAgICAgICAgdGhpcy5ob3VyID0gZGF0ZS5nZXRIb3VycygpXHJcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcclxuICAgICAgICB0aGlzLnNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKVxyXG4gICAgICAgIHRoaXMubWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGltZXtcclxuICAgIHN0YXJ0VGltZTogdGltZVxyXG4gICAgaW5zdGFudFRpbWU6IHRpbWVcclxuICAgIHRyYW5zaWVudFRpbWU6IHRpbWVbXVxyXG4gICAgdGltZVZhbHVlOiBudW1iZXJcclxuICAgIGNvbnN0cnVjdG9yKCl7XHJcblxyXG4gICAgfVxyXG4gICAgc3RhcnQoKXtcclxuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcclxuICAgIH1cclxuICAgIHJlY29yZCgpe1xyXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBuZXcgdGltZSgpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBUaWMoKTogVGltZXtcclxuICAgIGxldCB0ID0gbmV3IFRpbWUoKVxyXG4gICAgdC5zdGFydCgpXHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRvYyh0aW1lOiBUaW1lKTogbnVtYmVye1xyXG4gICAgbGV0IHQgPSAwO1xyXG4gICAgbGV0IHRzID0gbmV3IEFycmF5KClcclxuICAgIHRpbWUucmVjb3JkKClcclxuICAgIHRzWzBdID0gdGltZS5pbnN0YW50VGltZS5ob3VyIC0gdGltZS5zdGFydFRpbWUuaG91clxyXG4gICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lLm1pbnV0ZXMgLSB0aW1lLnN0YXJ0VGltZS5taW51dGVzXHJcbiAgICB0c1syXSA9IHRpbWUuaW5zdGFudFRpbWUuc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLnNlY29uZHNcclxuICAgIHRzWzNdID0gdGltZS5pbnN0YW50VGltZS5taWxsaXNlY29uZHMgLSB0aW1lLnN0YXJ0VGltZS5taWxsaXNlY29uZHNcclxuICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXHJcbiAgICB0aW1lLnRpbWVWYWx1ZSA9IHQ7XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldFNlY3ModGltZTogVGltZSk6IG51bWJlcntcclxuICAgIGxldCB0ID0gVG9jKHRpbWUpXHJcbiAgICByZXR1cm4gdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gV2FpdFNlY3MoZGVsYXk6IG51bWJlcixtZXNzYWdlPzogYW55KXtcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICByZXNvbHZlKDApO1xyXG4gICAgICAgIH0sIGRlbGF5KTtcclxuICAgIH0pXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBkZWxheV9mcmFtZShudW0xKXtcclxuICAgIGxldCB0aW1lX251bT0wOyAgICAgXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIChmdW5jdGlvbiByYWYoKXtcclxuICAgICAgICAgICAgdGltZV9udW0rKztcclxuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XHJcbiAgICAgICAgaWYoIHRpbWVfbnVtPT1udW0xKXtcclxuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcclxuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcclxuICAgICAgICB9XHJcbiAgICB9KCkpXHJcbn0pfTsiLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XHJcbmltcG9ydCB7IGp1ZGdlSXNJbkVsZW1lbnQgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIsRnVuYzogRnVuY3Rpb24pe1xyXG4gICAgZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XHJcbiAgICAgICAgICAgIEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBLYk5hbWUoa2V5OiBzdHJpbmd8bnVtYmVyKTpudW1iZXJ7XHJcbiAgICBsZXQgcmVzO1xyXG5cclxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHJlcyA9IGtleS5jaGFyQ29kZUF0KDApXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIHJlcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5KVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5kaXIocmVzKSBcclxuICAgIHJldHVybiByZXNcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEtiUHJlc3NXYWl0KGtleTogbnVtYmVyLEZ1bmM6IEZ1bmN0aW9uKXtcclxuICAgIGRvY3VtZW50Lm9ua2V5ZG93bj1mdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgdmFyIGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xyXG4gICAgICAgICAgICBGdW5jKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gS2JSZWxlYXNlV2FpdChrZXk6IG51bWJlcixGdW5jOiBGdW5jdGlvbil7XHJcbiAgICBkb2N1bWVudC5vbmtleXVwPWZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XHJcbiAgICAgICAgICAgIEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHZXRDbGljayhlbDogRWxlbWVudHMsRnVuYzogRnVuY3Rpb24pe1xyXG4gICAgZG9jdW1lbnQub25tb3VzZWRvd24gPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xyXG4gICAgICAgIGxldCB4LHlcclxuICAgICAgICBpZihlLnBhZ2VYIHx8IGUucGFnZVkpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB4ID0gZS5wYWdlWFxyXG4gICAgICAgICAgICB5ID0gZS5wYWdlWVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zb2xlLmRpcih4KVxyXG4gICAgICAgIGNvbnNvbGUuZGlyKHkpXHJcbiAgICAgICAgbGV0IGYgPSBqdWRnZUlzSW5FbGVtZW50KFt4LHldLGVsKVxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGYpXHJcbiAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIEZ1bmMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuIiwiaW1wb3J0ICogYXMgZXpVdGlscyBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuL0NhbnZhcy9jYW52YXMnXHJcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xyXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCAqIGFzIGV6UmVjdGFuZ2xlIGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4vRWxlbWVudCdcclxuXHJcblxyXG5leHBvcnQge1JlY3RhbmdsZX0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuLy8gZXhwb3J0IHsgQWRqb2luUmVjdCxSZWN0Q2VudGVyIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2xpbmUnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9hcmMnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3RleHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcclxuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MnXHJcbmV4cG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9Hcm91cC9ncm91cCdcclxuZXhwb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcclxuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xyXG5leHBvcnQgeyBBcmMgfSBmcm9tICcuL0dyYXBoaWMvYXJjJ1xyXG5leHBvcnQgeyBFbGxpcHNlIH0gZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXHJcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcclxuZXhwb3J0IHsgVGV4dCB9IGZyb20gJy4vR3JhcGhpYy90ZXh0J1xyXG5leHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXHJcbmV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZSdcclxuLy8gZXhwb3J0IHsgbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbiBcclxuLy8gbGV0IEV6cHN5TGlzdCA9IG5ldyBBcnJheSgpO1xyXG5cclxuY2xhc3MgRXpwc3kge1xyXG4gICAgaWQ6IG51bWJlclxyXG4gICAgZG9tOiBIVE1MRWxlbWVudFxyXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcclxuICAgIGNTdHlsZT86IGNhbnZhc1N0eWxlXHJcblxyXG4gICAgLy8gUmVjdGFuZ2xlOiBSZWN0YW5nbGVcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpe1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcclxuICAgICAgICB0aGlzLmNTdHlsZSA9IGNTdHlsZTtcclxuICAgICAgICB0aGlzLmN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyhkb20sY1N0eWxlKTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLmN0eClcclxuICAgIH1cclxuXHJcbiAgICBzZXRDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcclxuICAgICAgICBsZXQgYyA9IHRoaXMuY3R4LmNhbnZhcztcclxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcclxuICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xyXG4gICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBhZGQoZWw6IEVsZW1lbnRzKXtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcignc3VjY2VzcycpXHJcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XHJcbiAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWwsY3R4KVxyXG4gICAgfVxyXG5cclxufVxyXG5cclxuLy8gZXhwb3J0IGZ1bmN0aW9uIHB1c2hFenBzeUxpc3QoZXo6IEV6cHN5KXtcclxuLy8gICAgIGxldCBudW0gPSBlei5pZDtcclxuLy8gICAgIEV6cHN5TGlzdFtudW1dID0gZXo7XHJcbi8vIH1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBpbml0KGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpIHtcclxuICAgIGxldCBleiA9IG5ldyBFenBzeShlelV0aWxzLkNvdW50KCksZG9tLGNTdHlsZSk7XHJcbiAgICAvLyBwdXNoRXpwc3lMaXN0KGV6KTtcclxuICAgIC8vIGNvbnNvbGUuZGlyKEV6cHN5TGlzdCk7XHJcbiAgICByZXR1cm4gZXo7XHJcbn0iXSwibmFtZXMiOlsibmFtZUlkIiwiZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlIiwiZXpDYW52YXMuY3JlYXRlQ2FudmFzIiwiZXpKdWRnZS5qdWRnZUVsZW1lbnQiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O0FDREEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BRUgsS0FBSztJQUNkLEVBQUUsQ0FBUTtJQUNWLE1BQU0sQ0FBUTtJQUNkLFNBQVMsQ0FBMEI7SUFFbkMsWUFBWSxFQUE0QjtRQUVwQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNsQixJQUFHLEVBQUUsWUFBWSxLQUFLLEVBQ3RCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDbEI7YUFDRztZQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLE9BQU8sRUFBRSxDQUFBO0tBQ1o7OztNQ3JCUSxRQUFRO0lBQ2pCLEtBQUssQ0FBUTtJQUNiLEtBQUssQ0FBUTtJQUNiO0tBRUM7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQzVCO0lBQ0QsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7UUFRekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQzdCOzs7QUNKTCxNQUFNLE1BQU07SUFDUixJQUFJLENBQVc7SUFDZixDQUFDLENBQVE7SUFDVCxDQUFDLENBQVE7SUFDVCxZQUFZLElBQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDakQ7Q0FDSjtBQUVELE1BQU0sSUFBSTtJQUNOLElBQUksQ0FBVztJQUNmLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtJQUNkLFlBQVksSUFBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUE7S0FDbEM7Q0FDSjtBQUVELE1BQU0sTUFBTTtJQUNSLENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNUO0tBRUM7Q0FDSjtNQUVZLFNBQVUsU0FBUSxLQUFLO0lBQ2hDLFdBQVcsQ0FBVztJQUN0QixZQUFZLElBQWUsRUFBQyxFQUFjO1FBQ3RDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQzNCO0NBQ0o7QUFFRCxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO01BRWEsU0FBVSxTQUFRLFFBQVE7SUFDM0IsSUFBSSxHQUFlO1FBQ3ZCLElBQUksRUFBRSxNQUFNLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQW1CO1FBQzNCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUVYO0NBQ0o7QUFFRCxNQUFNLFNBQVUsU0FBUSxTQUFTO0lBQzdCLFlBQVksQ0FBWTtJQUN4QixZQUFZLENBQVk7SUFDeEIsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQztnQkFDVCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsTUFBTTthQUNqQixFQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0tBQ25DO0NBQ0o7QUFFRCxNQUFNLFFBQVMsU0FBUSxTQUFTO0lBQzVCLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQWdDLEVBQUMsWUFBdUIsRUFBQyxZQUF1QjtRQUN6RyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7S0FDdEQ7Q0FDSjtBQUVELE1BQU0sU0FBVSxTQUFRLFNBQVM7SUFDN0IsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsQ0FBQTtLQUN0RDtDQUNKO0FBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtTQUVnQixhQUFhLENBQUMsSUFBZSxFQUFDLEdBQTZCO0lBQ3ZFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7U0FFZSxVQUFVLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsVUFBMEI7O0lBRXRGLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBRyxDQUFDLFVBQVUsRUFDZDtRQUNJLFVBQVUsR0FBRyxVQUFVLENBQUE7S0FDMUI7SUFDRCxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBRXBDLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNQLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDOztLQUV2QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNaLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBQ1osT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFDWixPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztLQUN6QztTQUNHO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0tBQ3BEO0lBR0QsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzVDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNyRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDN0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFVBQVUsQ0FBQyxJQUFlOztJQUV0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO1NBRWUsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZSxFQUFDLEtBQXFCLEVBQUMsS0FBcUI7O0lBRXRHLElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBQztRQUNuQixLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQTtLQUNaO0lBQ0QsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUFDO1FBQ25CLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3BGO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7U0FDRztRQUNBLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQzs7UUFFckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDeEIsS0FBSyxFQUFDO2dCQUNGLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLElBQUcsRUFBRSxLQUFLLENBQUMsRUFDWDtZQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ25DO2dCQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztpQkFDRztnQkFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7U0FDSjthQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUM1QjtZQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQ0c7WUFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0Qzs7UUFHRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFHTCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsQ0FBUztJQUMzRCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVuQyxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ1Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO1FBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUE7S0FDdkM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0tBQzNDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNmO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQTtLQUM1QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFDZjtRQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7S0FDOUQ7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0tBQ2hFO1NBQ0c7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7S0FDMUQ7SUFDRCxPQUFPLENBQUMsQ0FBQTtBQUNaLENBQUM7U0FFZSxVQUFVLENBQUMsSUFBZSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBa0I7O0lBRTdELElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUI7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsWUFBWSxDQUFDLENBQVMsRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQWtCLEVBQUMsVUFBcUIsRUFBQyxLQUFjOztJQUUxRyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXZCLElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDM0IsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO0lBQzVDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTs7SUFHOUMsSUFBRyxDQUFDLEdBQUcsR0FBRyxFQUFDO1FBQ1AsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUNWO0lBRUQsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUN0QjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDYjtJQUVELElBQUcsS0FBSyxHQUFHLENBQUMsRUFDWjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsS0FBSyxLQUFLLENBQUMsRUFDZDtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFDN0I7Z0JBQ0ksSUFBRyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xCO29CQUNJLElBQUksQ0FBQyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDO3dCQUM5QixLQUFLLEVBQUU7NEJBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQzs0QkFDaEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQzs0QkFDakIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osTUFBTSxFQUFFLE1BQU07eUJBQ2pCO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDtxQkFDRztvQkFDQSxNQUFNO2lCQUNUO2FBRUo7U0FDSjtLQUNKO1NBRUQ7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUM3QjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO2dCQUNJLElBQUcsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNsQjtvQkFDSSxJQUFJLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQzt3QkFDOUIsS0FBSyxFQUFFOzRCQUNILENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDOzRCQUNqRCxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDOzRCQUNqQixLQUFLLEVBQUUsS0FBSzs0QkFDWixNQUFNLEVBQUUsTUFBTTt5QkFDakI7cUJBQ0osQ0FBQyxDQUFBO2lCQUNMO2FBQ0o7U0FDSjtLQUNKOztJQU1ELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsQ0FBQTtBQUNwQixDQUFDO1NBRWUsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTs7SUFFM0QsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxpQkFBaUIsQ0FBQyxJQUFlLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFrQjtJQUNwRSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEMsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlOztJQUVyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUM1QixPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO1NBRWUsVUFBVSxDQUFDLElBQWU7O0lBRXRDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzlCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7U0FFZSxRQUFRLENBQUMsSUFBZTs7SUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO1NBRWdCLFFBQVEsQ0FBQyxLQUFnQixFQUFDLEtBQWdCOztJQUV0RCxJQUFJLE9BQU8sRUFBQyxJQUFJLENBQUE7SUFDaEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDWCxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLElBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsRUFDdk87UUFDSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQjtTQUNHO1FBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FDbkI7SUFFRCxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztJQUV6QyxPQUFPLE9BQU8sQ0FBQztBQUVuQixDQUFDO1NBRWUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBa0IsRUFBQyxJQUFlOztJQUUzRCxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2xGLElBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUUsRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxFQUMvQztRQUNJLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7U0FFRDtRQUNJLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0FBQ0wsQ0FBQztTQUVlLFFBQVEsQ0FBQyxFQUFhLHVCQUFxQixDQUFTLEVBQUMsQ0FBUzs7OztJQUl0RSxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUM7WUFDRixDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNoQixDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFDLENBQUM7WUFDdEIsS0FBSyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUM7WUFDcEIsTUFBTSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBQyxDQUFDO1NBQy9CO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QnRCLENBQUM7U0FFZSxTQUFTLENBQUMsRUFBYSxFQUFDLENBQVMsRUFBQyxDQUFTOztJQUV2RCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNqQixDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUM7WUFDdkIsS0FBSyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckIsTUFBTSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBQyxDQUFDO1NBQ2hDO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlLEVBQUMsQ0FBUyxFQUFDLENBQVM7O0lBRXpELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDckMsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBQyxHQUFHLEdBQUMsRUFBRSxDQUFDLENBQUE7SUFDdEIsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7SUFDbEMsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFdBQVcsQ0FBQyxJQUFlOztJQUV2QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztJQUNoRCxJQUFHLElBQUksS0FBSyxDQUFDLEVBQ2I7UUFDSSxPQUFPLEtBQUssQ0FBQTtLQUNmO1NBQ0c7UUFDQSxPQUFPLElBQUksQ0FBQTtLQUNkO0FBQ0wsQ0FBQztTQUVlLFlBQVk7QUFFNUIsQ0FBQztTQUVlLFFBQVEsQ0FBQyxJQUFlO0lBQ3BDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDdkIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7QUFDMUMsQ0FBQztTQUVlLE9BQU8sQ0FBQyxJQUFlO0lBQ25DLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7QUFDdkIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlO0lBQ3JDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUE7QUFDM0MsQ0FBQztTQUVlLFNBQVMsQ0FBQyxLQUFnQixFQUFDLEtBQWdCO0lBQ3ZELElBQUksT0FBTyxDQUFDO0lBQ1osSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDWCxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztJQUMvQyxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsUUFBUSxDQUFDLElBQWUsRUFBQyxJQUFhO0lBQ2xELElBQUcsSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQ2pEO1FBQ0ksSUFBSSxHQUFHLE1BQU0sQ0FBQTtLQUNoQjtJQUNELElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLElBQUk7U0FDYjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sS0FBSyxDQUFBO0FBQ2hCLENBQUM7U0FFZSxTQUFTLENBQUMsSUFBZSxFQUFDLFNBQWtCLEVBQUMsTUFBZTtJQUN4RSxJQUFHLE1BQU0sS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUNyRDtRQUNJLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDZixJQUFHLFNBQVMsS0FBSyxTQUFTLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUMzRDtZQUNJLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELElBQUksS0FBSyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3RCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsU0FBUyxFQUFFLFNBQVM7WUFDcEIsTUFBTSxFQUFFLE1BQU07U0FDakI7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLEtBQUssQ0FBQTtBQUNoQjs7QUM1cUJBLElBQUlBLFFBQU0sR0FBRyxDQUFDLENBQUM7TUFFRixNQUFPLFNBQVEsUUFBUTtJQUN4QixJQUFJLEdBQWU7UUFDdkIsSUFBSSxFQUFFLFFBQVEsR0FBR0EsUUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNsQyxTQUFTLEVBQUVBLFFBQU07S0FDcEIsQ0FBQTtJQUVELFlBQVksSUFBZ0I7UUFDeEIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRXhCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0NBQ0o7U0FFZSxVQUFVLENBQUMsTUFBYyxFQUFDLEdBQTZCO0lBQ25FLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDckIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwQyxVQUFVLENBQUMsTUFBTSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNmLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7U0FFZSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBeUIsRUFBQyxLQUFhO0lBQ2xFLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDO1FBQ3BCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixDQUFDLEVBQUUsQ0FBQztTQUNQO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLEtBQUs7WUFDWCxNQUFNLEVBQUcsTUFBTTtTQUNsQjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sTUFBTSxDQUFBO0FBQ2pCOztBQ2hEQSxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO01BRUYsSUFBSyxTQUFRLFFBQVE7SUFDdEIsSUFBSSxHQUFlO1FBQ3ZCLElBQUksRUFBRSxNQUFNLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQWM7UUFDdEIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRXhCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0NBQ0o7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7U0FFZ0IsUUFBUSxDQUFDLElBQVUsRUFBQyxHQUE2QjtJQUM3RCxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMzQixVQUFVLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3BCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUVmLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLFNBQVMsQ0FBQyxFQUF3Qjs7SUFFOUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDekIsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBZ0MsRUFBQyxHQUFjLEVBQUMsS0FBZSxFQUFDLE9BQWlCLEVBQUMsUUFBaUI7O0lBRXZJLElBQUcsUUFBUSxLQUFLLFNBQVMsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQ3pEO1FBQ0ksUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNkLElBQUcsT0FBTyxLQUFLLFNBQVMsSUFBSSxPQUFPLE9BQU8sS0FBSyxTQUFTLEVBQ3hEO1lBRUksSUFBRyxLQUFLLEtBQUssU0FBUyxJQUFJLE9BQU8sS0FBSyxLQUFLLFNBQVMsRUFBQztnQkFDakQsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDZCxJQUFHLEdBQUcsS0FBSyxTQUFTLEVBQUM7b0JBQ2pCLEdBQUcsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQTtpQkFDbEI7YUFDSjtTQUNKO0tBQ0o7SUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXZCLElBQUcsT0FBTyxLQUFLLEtBQUssRUFDcEI7UUFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUU7WUFDaEIsS0FBSyxFQUFFO2dCQUNILENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUFDLENBQUE7UUFDRixJQUFHLEtBQUssS0FBSyxLQUFLLEVBQ2xCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUFDO2dCQUMvQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7b0JBQ2YsS0FBSyxFQUFFO3dCQUNILENBQUMsRUFBRSxDQUFDO3dCQUNKLENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO3dCQUNmLElBQUksRUFBRSxJQUFJO3dCQUNWLElBQUksRUFBRSxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO3FCQUN4QjtpQkFDSixDQUFDLENBQUE7YUFDTDtTQUNKO2FBQ0c7WUFDQSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBRTtvQkFDaEIsS0FBSyxFQUFFO3dCQUNILENBQUMsRUFBRSxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO3dCQUNmLENBQUMsRUFBRSxDQUFDO3dCQUNKLElBQUksRUFBRSxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDO3dCQUNyQixJQUFJLEVBQUUsSUFBSTtxQkFDYjtpQkFDSixDQUFDLENBQUE7YUFDTDtTQUNKO0tBQ0o7U0FDRztRQUNBLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxJQUFHLEtBQUssS0FBSyxLQUFLLEVBQ2xCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUNoQztnQkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUE7YUFDeEU7U0FDSjthQUNHO1lBQ0EsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUNoQztnQkFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxDQUFDLENBQUE7YUFDeEU7U0FDSjtLQUNKO0lBSUQsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzVCLE9BQU8sS0FBSyxDQUFBO0FBQ2hCLENBQUM7U0FFZSxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLENBQWdDLEVBQUMsUUFBaUI7O0lBRXhGLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxHQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ2pFLElBQUcsUUFBUSxHQUFDLFVBQVUsSUFBRSxRQUFRLEtBQUcsU0FBUyxFQUM1QztRQUNJLFFBQVEsR0FBRyxVQUFVLEdBQUMsRUFBRSxDQUFDO0tBQzVCO0lBQ0QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUMsUUFBUSxDQUFDLENBQUE7SUFDekMsSUFBSSxFQUFFLEdBQUcsUUFBUSxJQUFFLElBQUksR0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUE7SUFDckMsSUFBSSxFQUFFLEdBQUcsUUFBUSxJQUFFLElBQUksR0FBQyxDQUFDLENBQUMsR0FBQyxVQUFVLENBQUE7O0lBRXJDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkIsT0FBTSxDQUFDLEdBQUMsR0FBRyxFQUNYO1FBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQ2YsS0FBSyxFQUFFO2dCQUNILENBQUMsRUFBRSxDQUFDLEdBQUMsRUFBRSxHQUFDLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsQ0FBQztnQkFDVCxJQUFJLEVBQUUsQ0FBQyxHQUFDLEVBQUUsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDO2dCQUNoQixJQUFJLEVBQUUsQ0FBQyxHQUFDLEVBQUUsSUFBRSxDQUFDLEdBQUMsQ0FBQyxDQUFDO2FBQ25CO1NBQ0osQ0FBQyxDQUFBO1FBQ0YsQ0FBQyxJQUFFLENBQUMsQ0FBQztLQUNSO0lBQ0QsSUFBSSxXQUFXLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDakMsT0FBTyxXQUFXLENBQUE7QUFDdEIsQ0FBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0tBLElBQUlBLFFBQU0sR0FBRyxDQUFDLENBQUM7TUFFRixHQUFJLFNBQVEsUUFBUTtJQUNyQixJQUFJLEdBQWU7UUFDdkIsSUFBSSxFQUFFLEtBQUssR0FBR0EsUUFBTSxDQUFDLFFBQVEsRUFBRTtRQUMvQixTQUFTLEVBQUVBLFFBQU07S0FDcEIsQ0FBQTtJQUNELFlBQVksSUFBYTtRQUNyQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQzs7UUFFeEIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2FBQ2YsQ0FBQTtTQUNKO1FBRURBLFFBQU0sRUFBRSxDQUFBO0tBQ1g7Q0FDSjtTQUVlLE9BQU8sQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDMUQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixJQUFHLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUNwRTtRQUNJLFlBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7U0FDRztRQUNBLFdBQVcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDeEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxD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SUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ2hEO1lBQ0ksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2SCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNkO0lBQ0QsWUFB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RSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFLEVBQy9DO1lBQ0ksT0FBTyxJQUFJLENBQUM7U0FDZjthQUVEO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjtTQUNJLElBQUcsRUFBRSxZQUFZLE1BQU0sRUFDNUI7UUFDSSxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEQsSUFBRyxDQUFDLElBQUksRUFBRSxFQUNWO1lBQ0ksT0FBTyxJQUFJLENBQUE7U0FDZDthQUNHO1lBQ0EsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksSUFBSSxFQUMxQjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkUsSUFBRyxFQUFFLEtBQUssRUFBRSxFQUNaO1lBQ0ksSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxLQUFHLEVBQUUsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQ3hDLElBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFO2FBQzNCO2dCQUNJLE9BQU8sSUFBSSxDQUFBO2FBQ2Q7aUJBQ0c7Z0JBQ0EsT0FBTyxLQUFLLENBQUE7YUFDZjtTQUNKO2FBQ0c7WUFDQSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDeEMsSUFBRyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUU7YUFDM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDRztnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7S0FFSjtTQUNJLElBQUcsRUFBRSxZQUFZLEdBQUcsRUFDekIsQ0FFQztTQUNJLElBQUcsRUFBRSxZQUFZLE9BQU8sRUFDN0I7UUFDSSxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0UsSUFBRyxDQUFDLElBQUksQ0FBQyxFQUNUO1lBQ0ksT0FBTyxJQUFJLENBQUE7U0FDZDthQUNHO1lBQ0EsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2xDO1lBQ0ksSUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDN0I7Z0JBQ0ksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNSO2lCQUNHO2dCQUNBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1o7WUFDRCxJQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2xCO2dCQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxD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
