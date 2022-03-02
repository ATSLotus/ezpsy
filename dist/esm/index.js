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
function judgeDivStyle(dStyle) {
    if (!dStyle) {
        dStyle = {
            width: 400,
            height: 260,
            border: 'none',
            borderRadius: '20px'
        };
    }
    if (!dStyle.width) {
        dStyle.width = 400;
    }
    if (!dStyle.height) {
        dStyle.height = 400;
    }
    if (!dStyle.border) {
        dStyle.border = 'none';
    }
    if (!dStyle.borderRadius) {
        dStyle.borderRadius = '5px';
    }
    return dStyle;
}
function judgeContentStyle(cStyle, title, content) {
    if (!cStyle) {
        cStyle = {
            title: title,
            content: content,
            btnStr: ['OK'],
            noIcon: false,
            noInt: false,
            confirmPosition: 0
        };
    }
    if (!cStyle.title) {
        cStyle.title = title;
    }
    if (!cStyle.content) {
        cStyle.content = content;
    }
    if (!cStyle.btnStr) {
        cStyle.btnStr = ['OK'];
    }
    if (!cStyle.noIcon) {
        cStyle.noIcon = false;
    }
    if (!cStyle.noInt) {
        cStyle.noInt = false;
    }
    if (!cStyle.confirmPosition) {
        cStyle.confirmPosition = 0;
    }
    if (cStyle.confirmPosition !== 0 && cStyle.confirmPosition !== 1 && cStyle.confirmPosition !== 2) {
        cStyle.confirmPosition = 0;
    }
    return cStyle;
}
function judgeModel(model) {
    if (model === 'error') {
        return ["X", 'red', 'Error Dialogue', 'This is default error string!'];
    }
    else if (model === 'help') {
        return ["!", 'orange', 'Help Dialogue', 'This is default help string!'];
    }
    else if (model === 'quest') {
        return ["?", 'grey', "Quset Dialogue", 'This is default error string!'];
    }
    else if (model === 'warn') {
        return ["!", 'orange', 'Warning Dialogue', 'This is default warning string!'];
    }
    else if (model === 'input') {
        return ['', '', "Input Dialogue", "This is default input string"];
    }
    else if (model === 'select') {
        return ['', '', "Select Dialogue", "This is default select string"];
    }
    else if (model === 'file') {
        return ['', '', 'File Dialogue', 'This is default file string'];
    }
    else {
        return ['～', 'green', 'Dailogue', 'This is default dailogue string'];
    }
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

function KbWait(key) {
    return new Promise((resolve, rejected) => {
        document.onkeydown = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                resolve(true);
            }
            rejected(false);
        };
    });
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
function KbPressWait(key) {
    return new Promise((resolve, rejected) => {
        document.onkeydown = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                resolve(true);
            }
            rejected(false);
        };
    });
}
function KbReleaseWait(key) {
    return new Promise((resolve, rejected) => {
        document.onkeyup = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                resolve(true);
            }
            rejected(false);
        };
    });
}
function GetClick(el) {
    return new Promise((resolve, rejected) => {
        document.onmousedown = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            let x, y;
            if (e.pageX || e.pageY) {
                x = e.pageX;
                y = e.pageY;
            }
            // console.dir(x) 
            // console.dir(y)
            let f = judgeIsInElement([x, y], el);
            // console.dir(f)
            if (f === true) {
                resolve(true);
            }
            rejected(false);
        };
    });
}

function createDiv(dom, dStyle) {
    let div = document.createElement('div');
    dStyle = judgeDivStyle(dStyle);
    div.style.width = dStyle.width.toString();
    div.style.height = dStyle.height.toString();
    div.style.border = dStyle.border;
    div.style.borderRadius = dStyle.borderRadius;
    div.style.visibility = 'hidden';
    div.style.boxShadow = '20px 10px 40px #888888';
    div.style.position = 'absolute';
    div.style.zIndex = '1000';
    div.style.background = 'white';
    // div.style.top = '0px'
    let w = window.innerWidth;
    let h = window.innerHeight;
    // console.dir(w)
    div.style.top = ((h - dStyle.height) / 2).toString() + 'px';
    div.style.left = ((w - dStyle.width) / 2).toString() + 'px';
    dom.append(div);
    return [div, dStyle];
}

let id = 0;
class Dialogue {
    id;
    dom;
    domParent;
    conT;
    dStyle;
    statusValue; //按钮点击状态 true为选择是 false为选择否或取消
    intValue;
    selectValue;
    files;
    constructor(domParent, dStyle) {
        [this.dom, this.dStyle] = createDiv(domParent, dStyle);
        let conT = new Content(this.dom, this.dStyle);
        this.conT = conT;
        this.statusValue = false;
        this.domParent = domParent;
        this.intValue = [];
        this.selectValue = [];
        this.id = id++;
    }
    show(conStyle) {
        conStyle.seledStr = [];
        let that = this;
        this.statusValue = false;
        let topStr = ['20px', '70px', '130px', '210px'];
        if (!conStyle) {
            conStyle = {
                type: 'none'
            };
        }
        let [char, color, title, content] = judgeModel(conStyle.type);
        conStyle = judgeContentStyle(conStyle, title, content);
        if (conStyle.noIcon) {
            if (!conStyle.intStr) {
                topStr = ['20px', '90px', '180px'];
            }
        }
        createDlg(this, conStyle, topStr, char, color, conStyle.btnStr);
        // let btn = that.conT.child[that.conT.child.length - 1].child[0]
        let l = that.conT.child[that.conT.child.length - 1].child.length;
        let int = new Array();
        return new Promise(function (resolve, reject) {
            if (conStyle.intStr) {
                for (let i = 0; i < conStyle.intStr.length; i++) {
                    int[i] = document.getElementById(conStyle.intStr[i]);
                }
            }
            let file = document.getElementById('file');
            for (let i = 0; i < l; i++) {
                let btn = that.conT.child[that.conT.child.length - 1].child[i];
                btn.dom.onmousedown = function () {
                    (async function () {
                        btn.dom.style.background = '#ffffff';
                        btn.dom.style.boxShadow = '2px 2px 20px #008800';
                        btn.dom.style.color = 'blue';
                        await delay_frame(10);
                        if (i === conStyle.confirmPosition || conStyle.btnStr.length === 1) {
                            if (conStyle.intStr) {
                                for (let t = 0; t < conStyle.intStr.length; t++) {
                                    that.intValue.push(conStyle.intStr[t]);
                                    that.intValue.push(int[t].value);
                                }
                            }
                            else {
                                if (conStyle.seledStr) {
                                    for (let t = 0; t < conStyle.seledStr.length; t++) {
                                        if (conStyle.seledStr[t] !== undefined || conStyle.seledStr[t] !== '') {
                                            that.selectValue.push(conStyle.seledStr[t]);
                                        }
                                    }
                                }
                            }
                            if (conStyle.type === 'file') {
                                // let f = file
                                new Promise((resolve, reject) => {
                                    let file_Reader = new FileReader();
                                    file_Reader.onload = result => {
                                        let fc = file_Reader.result;
                                        console.dir(fc);
                                        resolve(fc);
                                    };
                                    // file_Reader.readAsDataURL((<HTMLInputElement>file).files[0])
                                    // file_Reader.readAsText((<HTMLInputElement>file).files[0])
                                    file_Reader.readAsArrayBuffer(file.files[0]);
                                    that.files = file_Reader;
                                });
                            }
                            that.statusValue = true;
                        }
                        await delay_frame(10);
                        that.remove();
                        await delay_frame(10);
                        resolve(that.statusValue);
                    })();
                };
            }
        });
    }
    setDlgStyle(dStyle) {
        dStyle = judgeDivStyle(dStyle);
        let domS = this.dom.style;
        domS.width = dStyle.width.toString() + 'px';
        domS.height = dStyle.height.toString() + 'px';
        domS.border = dStyle.border;
        domS.borderRadius = dStyle.borderRadius;
    }
    inputdlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Input Dialogue', 'This is default input string!');
        conStyle.type = 'input';
        return this.show(conStyle); /*.then()*/
    }
    listdlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Select Dialogue', 'This is default select string!');
        conStyle.type = 'select';
        conStyle.noInt = true;
        this.show(conStyle);
    }
    errordlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Error Dialogue', 'This is default error string!');
        conStyle.type = 'error';
        conStyle.noInt = true;
        conStyle.noSel = true;
        this.show(conStyle);
    }
    helpdlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Help Dialogue', 'This is default help string!');
        conStyle.type = 'help';
        conStyle.noSel = true;
        conStyle.noInt = true;
        this.show(conStyle);
    }
    msgbox(conStyle, model) {
        conStyle = judgeContentStyle(conStyle, 'Error Dialogue', 'This is default error string!');
        conStyle.noSel = true;
        conStyle.noInt = true;
        this.show(conStyle);
    }
    questdlg(conStyle, str) {
        conStyle = judgeContentStyle(conStyle, "Quset Dialogue", 'This is default error string!');
        conStyle.type = 'quest';
        conStyle.noSel = true;
        conStyle.noInt = true;
        this.show(conStyle);
    }
    warndlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Warning Dialogue', 'This is default warning string!');
        conStyle.type = 'warn';
        conStyle.noSel = true;
        conStyle.noInt = true;
        this.show(conStyle);
    }
    remove() {
        let that = this;
        return new Promise(function (resolve, reject) {
            let child = that.dom.lastElementChild;
            while (child) {
                that.dom.removeChild(child);
                child = that.dom.lastElementChild;
                console.dir('a');
            }
            that.conT.child = [];
            // console.dir(that)
            // that.dom.remove()
            that.dom.style.visibility = 'hidden';
            resolve(0);
        });
    }
}
class Content {
    dom;
    parent;
    child;
    dStyle;
    constructor(conT, dStyle) {
        let child = new Array();
        this.child = child;
        if (conT instanceof HTMLElement) {
            this.parent = undefined;
            this.dom = conT;
        }
        else {
            this.dom = document.createElement('div');
            this.dom.style.width = dStyle.width.toString();
            this.dom.style.height = dStyle.height.toString();
            this.dom.style.position = 'absolute';
            this.dom.style.lineHeight = dStyle.height.toString() + 'px';
            this.dom.style.textAlign = 'center';
            this.parent = conT;
            conT.child.push(this);
            // // let h = this.domParent.clientHeight 
            // this.dom.style.background = 'black'
            conT.dom.append(this.dom);
        }
    }
}
function DlgInit(dom, dStyle) {
    let dlg = new Dialogue(dom, dStyle);
    return dlg;
}
function createDlg(dlg, conStyle, top, imgStr, imgColor, str) {
    // console.dir(dlg)
    dlg.dom.style.visibility = 'visible';
    createDlgTitle(dlg, conStyle, top[0]);
    createDlgContent(dlg, conStyle, top[1]);
    if (top.length === 4) {
        createDlgImgDiv(dlg, conStyle, top[2], imgStr, imgColor);
        createDlgBtnDiv(dlg, conStyle, top[3], str);
    }
    else if (top.length === 3) {
        createDlgBtnDiv(dlg, conStyle, top[2], str);
    }
}
function createDlgTitle(dlg, conStyle, top) {
    let titleStyle = {
        width: dlg.dStyle.width,
        height: 50
    };
    let title = new Content(dlg.conT, titleStyle);
    // console.dir(title)
    title.dom.innerText = conStyle.title;
    title.dom.style.fontSize = '26px';
    title.dom.style.fontWeight = 'bold';
    title.dom.style.top = top;
}
function createDlgContent(dlg, conStyle, top) {
    let contentStyle = {
        width: dlg.dStyle.width,
        height: 50
    };
    let content = new Content(dlg.conT, contentStyle);
    content.dom.innerText = conStyle.content;
    content.dom.style.fontSize = '20px';
    content.dom.style.top = top;
}
function createDlgImgDiv(dlg, conStyle, top, str, color) {
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    };
    let imgDiv = new Content(dlg.conT, imgDivStyle);
    imgDiv.dom.style.top = top;
    imgDiv.dom.style.display = 'flex';
    imgDiv.dom.style.justifyContent = 'center';
    if (!conStyle.intStr || conStyle.noInt) {
        dlg.dom.style.height = dlg.dStyle.height.toString() + 'px';
        if (!conStyle.selStr || conStyle.noSel) {
            if (!conStyle.img) {
                if (conStyle.type === 'file') {
                    createDlgFile(imgDiv);
                }
                else {
                    createDlgImg(imgDiv, str, color);
                }
            }
            else {
                createDlgImg0(imgDiv, conStyle);
            }
        }
        else {
            createDlgSelect(imgDiv, conStyle);
        }
    }
    else {
        imgDiv.dom.style.height = (imgDivStyle.height * conStyle.intStr.length).toString() + 'px';
        imgDiv.dom.style.flexDirection = 'column';
        dlg.dom.style.height = (parseInt(dlg.dom.style.height) + imgDivStyle.height * (conStyle.intStr.length - 1)).toString() + 'px';
        // console.dir(conStyle)
        for (let i = 0; i < conStyle.intStr.length; i++) {
            createDlgIntDiv(imgDiv, conStyle.intStr[i]);
        }
    }
}
function createDlgIntDiv(imgDiv, intStr) {
    let intDivStyle = {
        width: parseInt(imgDiv.dom.style.width),
        height: 60
    };
    let intDiv = new Content(imgDiv, intDivStyle);
    intDiv.dom.style.position = 'relative';
    intDiv.dom.style.display = 'flex';
    intDiv.dom.style.justifyContent = 'inherit';
    createDlgInt(intDiv, intStr);
}
function createDlgImg(imgDiv, str, color) {
    let imgStyle = {
        width: 60,
        height: 60
    };
    let img = new Content(imgDiv, imgStyle);
    img.dom.id = 'img';
    img.dom.innerText = str;
    img.dom.style.fontSize = '54px';
    img.dom.style.color = 'white';
    img.dom.style.background = color;
    // img.dom.style.border = '5px solid red'
    img.dom.style.borderRadius = '50%';
}
function createDlgImg0(imgDiv, conStyle) {
    let img = document.createElement('img');
    img.width = 60;
    img.height = 60;
    img.src = conStyle.img;
    imgDiv.dom.append(img);
}
function createDlgInt(imgDiv, intStr) {
    let keyStyle = {
        width: 100,
        height: 60
    };
    let key = new Content(imgDiv, keyStyle);
    key.dom.style.position = 'relative';
    key.dom.style.fontSize = '20px';
    key.dom.innerHTML = intStr + ':';
    let int = document.createElement('input');
    int.id = intStr;
    int.style.width = '200px';
    int.style.height = '40px';
    int.style.borderRadius = '10px';
    int.style.marginTop = '10px';
    imgDiv.dom.append(int);
}
function createDlgFile(imgDiv, dlg) {
    let file = document.createElement('input');
    // file.disabled = true
    file.type = 'file';
    file.id = 'file';
    file.style.width = '160px';
    file.style.lineHeight = '60px';
    imgDiv.dom.append(file);
}
function createDlgSelect(imgDiv, conStyle) {
    let selectStyle = {
        width: 200,
        height: 36
    };
    let index = false;
    let index0 = new Array();
    let index1 = false;
    let selectStr = new Array();
    let Str = '';
    let color = '#3771e0';
    let color0 = '#ffffff';
    let select = new Content(imgDiv, selectStyle);
    select.dom.style.border = '1px solid';
    select.dom.style.borderRadius = '15px';
    select.dom.style.marginTop = '12px';
    select.dom.style.zIndex = '2020';
    let selectText = new Content(select, {
        width: 200,
        height: 36
    });
    selectText.dom.innerText = '展开选择';
    selectText.dom.style.zIndex = '2010';
    selectText.dom.style.top = '0';
    selectText.dom.style.transition = 'top 1s linear';
    selectText.dom.style.borderRadius = '15px';
    selectText.dom.style.color = color;
    let selectDiv = new Content(select, {
        width: 200,
        height: 36
    });
    // selectDiv.dom.style.border = '1px solid'
    selectDiv.dom.style.borderRadius = '15px';
    selectDiv.dom.style.boxShadow = '2px 2px 20px #888888';
    selectDiv.dom.style.zIndex = "2000";
    // selectDiv.dom.style.visibility = 'hidden'
    selectDiv.dom.style.background = color0;
    selectDiv.dom.style.transition = 'all 1s linear';
    selectDiv.dom.style.top = '0px';
    selectDiv.dom.style.opacity = '0';
    selectDiv.dom.style.display = 'flex';
    selectDiv.dom.style.flexDirection = 'column';
    let selectContent = new Array();
    for (let i = 0; i < conStyle.selStr.length; i++) {
        selectContent[i] = new Content(selectDiv, {
            width: 200,
            height: 36 / (conStyle.selStr.length + 2)
        });
        selectContent[i].dom.innerText = conStyle.selStr[i];
        selectContent[i].dom.style.borderRadius = '15px';
        selectContent[i].dom.style.position = 'relative';
        selectContent[i].dom.style.transition = 'all 1s linear';
        selectContent[i].dom.style.lineHeight = (36 / (conStyle.selStr.length + 2)).toString() + "px";
        selectContent[i].dom.style.color = color;
    }
    let selectAll = new Content(selectDiv, {
        width: 200,
        height: 36 / (conStyle.selStr.length + 2)
    });
    selectAll.dom.innerText = 'selectAll';
    selectAll.dom.style.borderRadius = '15px';
    selectAll.dom.style.position = 'relative';
    selectAll.dom.style.transition = 'all 1s linear';
    selectAll.dom.style.lineHeight = (36 / (conStyle.selStr.length + 2)).toString() + "px";
    selectAll.dom.style.color = color;
    if (!conStyle.IsMultiple) {
        selectAll.dom.style.color = 'grey';
        for (let i = 0; i < conStyle.selStr.length; i++) {
            selectContent[i].dom.onclick = e => {
                if (!index0[i]) {
                    selectStr[0] = conStyle.selStr[i];
                    selectContent[i].dom.style.background = color;
                    selectContent[i].dom.style.color = color0;
                    for (let t = 0; t < conStyle.selStr.length; t++) {
                        if (t !== i) {
                            selectContent[t].dom.style.background = color0;
                            selectContent[t].dom.style.color = color;
                            index0[t] = false;
                        }
                    }
                    index0[i] = true;
                }
                else {
                    selectStr[0] = '';
                    selectContent[i].dom.style.background = color0;
                    selectContent[i].dom.style.color = color;
                    index0[i] = false;
                }
            };
        }
    }
    else {
        for (let i = 0; i < conStyle.selStr.length; i++) {
            selectContent[i].dom.onclick = e => {
                if (!index0[i]) {
                    selectStr[i] = conStyle.selStr[i];
                    selectContent[i].dom.style.background = color;
                    selectContent[i].dom.style.color = color0;
                    index0[i] = true;
                }
                else {
                    selectStr[i] = '';
                    selectContent[i].dom.style.background = color0;
                    selectContent[i].dom.style.color = color;
                    selectAll.dom.style.background = color0;
                    selectAll.dom.style.color = color;
                    index1 = false;
                    index0[i] = false;
                }
            };
        }
        selectAll.dom.onclick = e => {
            if (!index1) {
                selectAll.dom.style.background = color;
                selectAll.dom.style.color = color0;
                for (let i = 0; i < conStyle.selStr.length; i++) {
                    selectContent[i].dom.style.background = color;
                    selectContent[i].dom.style.color = color0;
                    selectStr[i] = conStyle.selStr[i];
                }
                index1 = true;
            }
            else {
                selectAll.dom.style.background = color0;
                selectAll.dom.style.color = color;
                for (let i = 0; i < conStyle.selStr.length; i++) {
                    selectContent[i].dom.style.background = color0;
                    selectContent[i].dom.style.color = color;
                    selectStr[i] = '';
                }
                index1 = false;
            }
        };
    }
    selectText.dom.onmousedown = e => {
        selectText.dom.style.background = color;
        selectText.dom.style.color = color0;
    };
    selectText.dom.onmouseup = e => {
        selectText.dom.style.background = color0;
        selectText.dom.style.color = color;
    };
    selectText.dom.onclick = e => {
        if (!index) {
            selectDiv.dom.style.opacity = '1';
            selectDiv.dom.style.zIndex = '2100';
            selectDiv.dom.style.height = (36 * (conStyle.selStr.length + 2)).toString();
            selectDiv.dom.style.top = ((-36) * (conStyle.selStr.length + 1) / 2).toString() + 'px';
            selectText.dom.style.top = (36 * (conStyle.selStr.length + 1) / 2).toString() + 'px';
            selectText.dom.style.zIndex = '2101';
            selectText.dom.innerText = 'Confirm';
            for (let i = 0; i < conStyle.selStr.length; i++) {
                selectContent[i].dom.style.height = '36';
                selectContent[i].dom.style.lineHeight = '36px';
            }
            selectAll.dom.style.height = '36';
            selectAll.dom.style.lineHeight = '36px';
            index = true;
        }
        else {
            selectDiv.dom.style.opacity = '0';
            selectDiv.dom.style.zIndex = '2000';
            selectDiv.dom.style.height = '36';
            selectDiv.dom.style.top = '0';
            for (let i = 0; i < conStyle.selStr.length; i++) {
                selectContent[i].dom.style.height = (36 / (conStyle.selStr.length + 2)).toString();
                selectContent[i].dom.style.lineHeight = (36 / (conStyle.selStr.length + 2)).toString() + "px";
            }
            selectAll.dom.style.height = (36 / (conStyle.selStr.length + 2)).toString();
            selectAll.dom.style.lineHeight = (36 / (conStyle.selStr.length + 2)).toString() + "px";
            selectText.dom.style.top = '0';
            selectText.dom.style.zIndex = '2010';
            Str = '';
            conStyle.seledStr = selectStr;
            for (let i = 0; i < selectStr.length; i++) {
                if (selectStr[i] !== undefined && selectStr[i] !== '') {
                    Str += selectStr[i] + ',';
                }
            }
            Str = Str.substring(0, Str.length - 1);
            Str = cutString(Str, 20);
            if (Str === '' || Str === undefined) {
                Str = '展开选择';
            }
            selectText.dom.innerText = Str;
            index = false;
        }
    };
}
function createDlgBtnDiv(dlg, conStyle, top, str) {
    let BtnDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    };
    let BtnDiv = new Content(dlg.conT, BtnDivStyle);
    let color = '#00d800';
    if (conStyle.intStr && !conStyle.noInt) {
        top = (parseInt(top) + 60 * (conStyle.intStr.length - 1)).toString() + 'px';
    }
    BtnDiv.dom.style.top = top;
    BtnDiv.dom.style.display = 'flex';
    if (!str) {
        str = ['OK'];
    }
    if (str.length === 1) {
        BtnDiv.dom.style.justifyContent = 'center';
        createDlgBtn(BtnDiv, str[0], 120, color);
    }
    else {
        BtnDiv.dom.style.justifyContent = 'space-evenly';
        for (let i = 0; i < str.length; i++) {
            if (i !== 0) {
                color = '#dcdcdc';
            }
            createDlgBtn(BtnDiv, str[i], 100, color);
        }
    }
}
function createDlgBtn(BtnDiv, str, width, color) {
    let btnStyle = {
        width: width,
        height: 35
    };
    let btn = new Content(BtnDiv, btnStyle);
    btn.dom.className = "Button";
    btn.dom.style.position = 'relative';
    btn.dom.style.background = color;
    btn.dom.style.color = 'white';
    btn.dom.style.borderRadius = '14px';
    btn.dom.style.boxShadow = '2px 2px 20px #888888';
    btn.dom.innerHTML = str;
    btn.dom.style.fontSize = '22px';
}
function cutString(str, len) {
    let s;
    let s0, s1;
    let sarr = str.split(',');
    let l = sarr.length;
    if (str.length <= len) {
        return str;
    }
    else {
        if ((sarr[0].length + sarr[1].length) >= (len / 2) - 2) {
            s0 = str.substring(0, (len / 2));
        }
        else {
            s0 = sarr[0] + ',' + sarr[1] + ',';
        }
        if ((sarr[l - 1].length + sarr[l - 2].length) >= (len / 2) - 2) {
            if (sarr[l - 2].length >= (len / 2) - 2) {
                if (sarr[l - 1].length >= (len / 2) - 2) {
                    s1 = sarr[l - 1].substring(0, (len / 2) - 2) + '..';
                }
                else {
                    s1 = sarr[l - 1];
                }
            }
            else {
                s1 = sarr[l - 2] + ',' + sarr[l - 1].substring(0, (len / 2) - 2 - sarr[l - 2].length) + '..';
            }
        }
        else {
            s1 = sarr[l - 2] + ',' + sarr[l - 1];
        }
        // s1 = str.substring(str.length-8,str.length)
        s = s0 + '....' + ',' + s1;
        return s;
    }
}
// function createDlgConfirm(dlg: Dialogue,conStyle: contentStyle,top: string,IsNeedStatus: boolean){
//     let confirmDivStyle = {
//         width: dlg.dStyle.width,
//         height: 35
//     }
//     let confirmDiv = new Content(dlg.dom,confirmDivStyle)
//     confirmDiv.dom.style.top = top
//     confirmDiv.dom.style.display = 'flex'
//     confirmDiv.dom.style.justifyContent = 'center'
//     let confirmStyle = {
//         width: 120,
//         height: 35
//     }
//     let confirm = new Content(confirmDiv.dom,confirmStyle)
//     confirm.dom.style.background = 'white'
//     confirm.dom.style.borderRadius = '10px'
//     confirm.dom.style.boxShadow = '2px 2px 20px #888888'
//     confirm.dom.innerText = 'OK'
//     confirm.dom.style.fontSize = '22px'
//     confirm.dom.onmousedown = function(){
//         (async function(){
//             confirm.dom.style.background = '#eeeeee'
//             confirm.dom.style.boxShadow = '2px 2px 20px #008800'
//             await delay_frame(10)
//             dlg.remove()
//             if(IsNeedStatus === true)
//             {
//                dlg.statusValue = true 
//             }
//             await delay_frame(10)
// 		}())
//     }
// }

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
    Dialogue: Dialogue,
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
    GetClick: GetClick,
    DlgInit: DlgInit
});

export { EZPSY as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9Hcm91cC9ncm91cC50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL0NhbnZhcy9jYW52YXMudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL0Rpdi9kaXYudHMiLCIuLi8uLi9zcmMvRGlhbG9ndWUvZGlhbG9ndWUudHMiLCIuLi8uLi9zcmMvZXpwc3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5sZXQgaWRTdGFydCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiBpZFN0YXJ0Kys7XG59IiwiaW1wb3J0IHsgQ2xhc3MgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsganVkZ2VFbGVtZW50IH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5cbmxldCBncm91cElkID0gMDtcblxuZXhwb3J0IGNsYXNzIEdyb3Vwe1xuICAgIGlkOiBudW1iZXJcbiAgICBsZW5ndGg6IG51bWJlclxuICAgIGdyb3VwTGlzdDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwXG4gICAgXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cCl7XG5cbiAgICAgICAgdGhpcy5pZCA9IGdyb3VwSWQ7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGVsO1xuXG4gICAgICAgIGdyb3VwSWQrKyBcbiAgICB9XG59IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFNoYXBlLFN0eWxlfSBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudHN7XG4gICAgc2hhcGU/OiBTaGFwZVxuICAgIHN0eWxlPzogU3R5bGUgXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBub0ZpbGwoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ25vbmUnO1xuICAgIH1cbiAgICBub1N0cm9rZSgpe1xuICAgICAgICB0aGlzLnN0eWxlLmxpbmVXaWR0aCA9IDA7XG4gICAgICAgIC8vIGlmKHRoaXMuc3R5bGUuZmlsbCAhPT0gJ25vbmUnICYmIHRoaXMuc3R5bGUuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcignRXJyb3IhJylcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJ1xuaW1wb3J0IHtFbGVtZW50c30gZnJvbSAnLi4vRWxlbWVudCdcblxuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxuY2xhc3MgQ2VudGVye1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMueCA9IHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XG4gICAgfVxufVxuXG5jbGFzcyBTaXple1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG59XG5cbmNsYXNzIFNpZGVYWXtcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdEdyb3VwIGV4dGVuZHMgR3JvdXAge1xuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xuICAgICAgICBzdXBlcihlbClcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XG4gICAgfVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICB4OiBudW1iZXJcbi8vICAgICB5OiBudW1iZXJcbi8vICAgICB3aWR0aDogbnVtYmVyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcbi8vIH1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJyZWN0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogUmVjdGFuZ2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuXG4gICAgfVxufVxuXG5jbGFzcyBsb2dpY1JlY3QgZXh0ZW5kcyBSZWN0YW5nbGV7XG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XG4gICAgcmVjdFBhcmVudHMxOiBSZWN0YW5nbGU7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH19KVxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMSA9IHJlY3RQYXJlbnRzMVxuICAgIH1cbn1cblxuY2xhc3MgY2xpcFJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuY2xhc3MgdW5pb25SZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIGluc3RhbmNlb2ZSZWN0YW5nbGUoZTogYW55KTogZSBpcyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICByZXR1cm4gIGluIGU7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcbi8vICAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xuLy8gICAgIGxldCBzdCA9IHJlY3Quc3R5bGU7XG4vLyAgICAgbGV0IGYscztcbi8vICAgICAvLyBjb25zb2xlLmRpcihzdC5zdHJva2UpXG4vLyAgICAgW2N0eCxmLHNdID0ganVkZ2VTdHlsZShyZWN0LGN0eCk7XG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgICAgIGN0eC5zdHJva2VSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCA9PT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBjb25zb2xlLmRpcihcImVycm9yIUl0IGNhbid0IHBhaW50IGEgcmVjdGFuZ2xlIHdpdGhvdXQgZmlsbFN0eWxlIGFuZCBzdHJva2VTdHlsZVwiKVxuLy8gICAgIH1cbiAgICBcbi8vICAgICByZXR1cm4gcmVjdDtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuICAgIGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gcmVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFkam9pblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGZpeGVkU3R5bGU/OiBzdHJpbmd8bnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5ou85o6lIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5ou85o6l55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXG4gICAgbGV0IG5ld1JlY3Q7XG4gICAgaWYoIWZpeGVkU3R5bGUpXG4gICAge1xuICAgICAgICBmaXhlZFN0eWxlID0gJ1JFQ1RMRUZUJ1xuICAgIH1cbiAgICBsZXQgZiA9IGp1ZGdlQ2hhbmdlVHlwZShmaXhlZFN0eWxlKTtcbiAgICAvLyBjb25zb2xlLmRpcignZj0nK2YpO1xuICAgIGlmKGYgPT09IDEpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9MZWZ0KGZpeGVkUmVjdCxyZWN0KTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIobmV3UmVjdClcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAyKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfVG9wKGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAzKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfUmlnaHQoZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDQpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Cb3R0b20oZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IG9yZGVyIScpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfTGVmdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54IC0gcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X1JpZ2h0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9Ub3AoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgLSByZWN0LnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X0JvdHRvbShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RDZW50ZXIocmVjdDogUmVjdGFuZ2xlKTogQ2VudGVye1xuICAgIC8v6I635Y+W55+p5b2i5Lit5b+DXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIocmVjdCk7XG4gICAgcmV0dXJuIGNlbnRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFsaWduUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsc2lkZTA/OiBudW1iZXJ8c3RyaW5nLHNpZGUxPzogbnVtYmVyfHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouWvuem9kCBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heWvuem9kOefqeW9oiBmaXhlZFN0eWxlIOWvuem9kOW9ouW8j1xuICAgIGlmKHNpZGUwID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzaWRlMCA9IDBcbiAgICAgICAgc2lkZTEgPSAwXG4gICAgfVxuICAgIGlmKHNpZGUxID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzaWRlMSA9IDBcbiAgICB9XG5cbiAgICBpZihyZWN0LnNoYXBlLndpZHRoKnJlY3Quc2hhcGUuaGVpZ2h0ID4gZml4ZWRSZWN0LnNoYXBlLndpZHRoKmZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIVRoZSBhcmVhIG9mIGZpZXhlZFJlY3QgIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmVjdCEnKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbGV0IFtmMCxmMV0gPSBqdWRnZVNpZGUoc2lkZTAsc2lkZTEpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihmMCtcIiBcIitmMSk7XG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICBzaGFwZTp7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzID0gbmV3IFNpZGVYWSgpO1xuICAgICAgICBpZihmMCA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDEgfHwgZjEgPT09IDMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMylcbiAgICAgICAge1xuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XG4gICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHMpXG4gICAgICAgIFxuICAgICAgICBuZXdSZWN0LnNoYXBlLnggPSBzLng7XG4gICAgICAgIG5ld1JlY3Quc2hhcGUueSA9IHMueTtcbiAgICAgICAgcmV0dXJuIG5ld1JlY3Q7XG4gICAgfVxuICAgIFxuICAgIFxufVxuXG5mdW5jdGlvbiBBbGlnblhZKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxmOiBudW1iZXIpOiBTaWRlWFl7XG4gICAgbGV0IHMgPSBuZXcgU2lkZVhZKClcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihmaXhlZFJlY3QpO1xuICAgIC8vIGNvbnNvbGUuZGlyKGNlbnRlcilcbiAgICBpZihmID09PSAwKVxuICAgIHsgICBcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSByZWN0LnNoYXBlLndpZHRoLzJcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSByZWN0LnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMSlcbiAgICB7XG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gZml4ZWRSZWN0LnNoYXBlLndpZHRoLzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAyKVxuICAgIHtcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAzKVxuICAgIHtcbiAgICAgICAgcy54ID0gY2VudGVyLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMiAtIHJlY3Quc2hhcGUud2lkdGhcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSA0KVxuICAgIHtcbiAgICAgICAgcy55ID0gY2VudGVyLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LzIgLSByZWN0LnNoYXBlLmhlaWdodFxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPZmZzZXRSZWN0KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5bmz56e7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcnJhbmdlUmVjdHMobjogbnVtYmVyLFt4TnVtYmVyLHlOdW1iZXJdOiBbbnVtYmVyLG51bWJlcl0sd2luZG93UmVjdDogUmVjdGFuZ2xlLHN0eWxlPzogbnVtYmVyKTogUmVjdEdyb3Vwe1xuICAgIC8v5Yib5bu655+p5b2i6Zi15YiXXG4gICAgbGV0IHJlY3QgPSBuZXcgQXJyYXkoKTtcbiAgICBcbiAgICBsZXQgbnVtID0geE51bWJlciAqIHlOdW1iZXJcbiAgICBsZXQgeCA9IHdpbmRvd1JlY3Quc2hhcGUueFxuICAgIGxldCB5ID0gd2luZG93UmVjdC5zaGFwZS55XG4gICAgbGV0IHdpZHRoID0gd2luZG93UmVjdC5zaGFwZS53aWR0aCAvIHhOdW1iZXJcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93UmVjdC5zaGFwZS5oZWlnaHQgLyB5TnVtYmVyXG4gICAgLy8gY29uc29sZS5kaXIoW3gseSx3aWR0aCxoZWlnaHRdKVxuXG4gICAgaWYobiA+IG51bSl7XG4gICAgICAgIG4gPSBudW1cbiAgICB9XG5cbiAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgc3R5bGUgPSAwO1xuICAgIH1cblxuICAgIGlmKHN0eWxlID4gMSlcbiAgICB7XG4gICAgICAgIHN0eWxlID0gMFxuICAgIH1cblxuICAgIGlmKHN0eWxlID09PSAwKVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aWR0aCAqIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLSB3aWR0aCAtIHdpZHRoICogaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuICAgIC8vIGNvbnNvbGUuZGlyKHJlY3QpXG5cbiAgICBsZXQgcmVjdEdyb3VwID0gbmV3IFJlY3RHcm91cCh3aW5kb3dSZWN0LHJlY3QpO1xuICAgIHJldHVybiByZWN0R3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIC8v56e75Yqo55+p5b2i6Iez5p+Q55+p5b2i5Lit5b+DIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5pON5L2c55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXG4gICAgbGV0IG5ld1JlY3QgPSBBbGlnblJlY3QoZml4ZWRSZWN0LHJlY3QsMCwwKTtcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdE9uUG9pbnQocmVjdDogUmVjdGFuZ2xlLFt4LHldOiBbbnVtYmVyLG51bWJlcl0pOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBPZmZzZXRSZWN0KHJlY3QsW3gseV0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RXaWR0aChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLlrr3luqZcbiAgICBsZXQgd2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgcmV0dXJuIHdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0SGVpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICAvL+iOt+WPluefqeW9oumrmOW6plxuICAgIGxldCBoZWlnaHQgPSByZWN0LnNoYXBlLmhlaWdodFxuICAgIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0U2l6ZShyZWN0OiBSZWN0YW5nbGUpOiBTaXple1xuICAgIC8v6I635Y+W55+p5b2i5a696auYXG4gICAgbGV0IHNpemUgPSBuZXcgU2l6ZShyZWN0KVxuICAgIHJldHVybiBzaXplO1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XG4vLyAgICAgLy/nn6nlvaLph43lj6DljLrln59cbi8vICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0MC5zaGFwZS54LHJlY3QwLnNoYXBlLnkscmVjdDAuc2hhcGUud2lkdGgscmVjdDAuc2hhcGUuaGVpZ2h0XVxuLy8gICAgIGxldCBbeDEseTEsdzEsaDFdID0gW3JlY3QxLnNoYXBlLngscmVjdDEuc2hhcGUueSxyZWN0MS5zaGFwZS53aWR0aCxyZWN0MS5zaGFwZS5oZWlnaHRdXG4vLyAgICAgbGV0IFJlY3QseG4seW4sd24saG47XG4vLyAgICAgbGV0IGFyZWEwID0gdzAgKiBoMDtcbi8vICAgICBsZXQgYXJlYTEgPSB3MSAqIGgxO1xuLy8gICAgIGxldCB4LHksdyxoXG4vLyAgICAgbGV0IHh0LHl0LHd0LGh0LHJlY3Rcbi8vICAgICBpZihhcmVhMCA+PSBhcmVhMSlcbi8vICAgICB7XG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MSx5MSx3MSxoMV07XG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDAseTAsdzAsaDBdO1xuLy8gICAgICAgICByZWN0ID0gcmVjdDA7XG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MCx5MCx3MCxoMF07XG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDEseTEsdzEsaDFdO1xuLy8gICAgICAgICByZWN0ID0gcmVjdDE7XG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUuZGlyKFt4LHksdyxoXSk7XG4vLyAgICAgY29uc29sZS5kaXIoW3h0LHl0LHd0LGh0XSlcbi8vICAgICBpZighSXNJblJlY3QoW3gseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseStoXSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3gseStoXSxyZWN0KSl7XG4vLyAgICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgd24gPSBNYXRoLmFicyhNYXRoLm1pbih4MCArIHcwICx4MSArIHcxKSAtIE1hdGgubWF4KHgwLCB4MSkpXG4vLyAgICAgICAgIGhuID0gTWF0aC5hYnMoTWF0aC5taW4oeTAgKyBoMCwgeTEgKyBoMSkgLSBNYXRoLm1heCh5MCwgeTEpKVxuLy8gICAgICAgICBpZihJc0luUmVjdChbeCx5XSxyZWN0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHg7XG4vLyAgICAgICAgICAgICB5biA9IHk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZigoeCA+PSB4dCAmJiB4PD14dCt3dCkgJiYgKHkgPCB5dCB8fCB5ID4geXQraHQpKXtcbi8vICAgICAgICAgICAgIHhuID0geDtcbi8vICAgICAgICAgICAgIHluID0geSArIChoIC0gaG4pO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoKHggPCB4dCB8fCB4ID4geHQrd3QpICYmICh5ID49IHl0ICYmIHkgPD0geXQraHQpKXtcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXG4vLyAgICAgICAgICAgICB5biA9IHlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcbi8vICAgICAgICAgICAgIHluID0geSArIChoIC0gaG4pXG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4vLyAgICAgICAgIFJlY3QgPSBbeG4seW4sd24saG5dO1xuICAgICAgICBcbi8vICAgICB9XG5cbi8vICAgICBsZXQgbmV3UmVjdCA9IG5ldyBjbGlwUmVjdChSZWN0LHJlY3QwLHJlY3QxKTtcblxuLy8gICAgIHJldHVybiBuZXdSZWN0O1xuXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcbiAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xuICAgIGxldCBuZXdSZWN0LFJlY3RcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XG4gICAgbGV0IHgseSx3LGhcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcbiAgICBpZihJc0luUmVjdChbeGwwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeGwxLHliMV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseWIxXSxyZWN0MCkpXG4gICAge1xuICAgICAgICB4ID0gTWF0aC5tYXgoeGwwLHhsMSk7XG4gICAgICAgIHkgPSBNYXRoLm1heCh5dDAseXQxKTtcbiAgICAgICAgdyA9IE1hdGgubWluKHhyMCx4cjEpIC0geDtcbiAgICAgICAgaCA9IE1hdGgubWluKHliMCx5YjEpIC0geTtcbiAgICAgICAgUmVjdCA9IFt4LHksdyxoXVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXG4gICAgfVxuXG4gICAgbmV3UmVjdCA9IG5ldyBjbGlwUmVjdChSZWN0LHJlY3QwLHJlY3QxKTtcblxuICAgIHJldHVybiBuZXdSZWN0O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0luUmVjdChbeCx5XTogW251bWJlcixudW1iZXJdLHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XG4gICAgLy/liKTmlq3ngrnmmK/lkKblnKjnn6nlvaLlhoVcbiAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0LnNoYXBlLngscmVjdC5zaGFwZS55LHJlY3Quc2hhcGUud2lkdGgscmVjdC5zaGFwZS5oZWlnaHRdXG4gICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXG4gICAge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdyb3dSZWN0KGVsOiBSZWN0YW5nbGUvKnxSZWN0R3JvdXB8R3JvdXAqLyxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q2j5pS+6LSf57ypIFxuICAgIC8vIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxuICAgIC8vIHtcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgIHNoYXBlOntcbiAgICAgICAgICAgICAgICB4OmVsLnNoYXBlLnggLSBoLFxuICAgICAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggKyAyKmgsXG4gICAgICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSAtIHYsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCArIDIqdlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gbmV3UmVjdFxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFJlY3RHcm91cClcbiAgICAvLyB7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBHcm91cCl7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKFwi57G75Z6L6ZSZ6K+vXCIpXG4gICAgLy8gfVxufSAgICAgICBcblxuZXhwb3J0IGZ1bmN0aW9uIEluc2V0UmVjdChlbDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mraPnvKnotJ/mlL5cbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDplbC5zaGFwZS54ICs9IGgsXG4gICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoIC09IDIqaCxcbiAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgKz0gdixcbiAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgLT0gMip2XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY2FsZVJlY3QocmVjdDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mr5TkvovnvKnmlL5cbiAgICBsZXQgaDAgPSByZWN0LnNoYXBlLndpZHRoICogKGgtMSkgLyAyXG4gICAgbGV0IHYwID0gcmVjdC5zaGFwZS5oZWlnaHQgKiAodi0xKSAvIDJcbiAgICBjb25zb2xlLmRpcihoMCsnICcrdjApXG4gICAgbGV0IG5ld1JlY3QgPSBHcm93UmVjdChyZWN0LGgwLHYwKVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0VtcHR5UmVjdChyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xuICAgIC8v5Yik5pat55+p6Zi15piv5ZCm5Li656m6XG4gICAgbGV0IGFyZWEgPSByZWN0LnNoYXBlLndpZHRoICogcmVjdC5zaGFwZS5oZWlnaHQ7XG4gICAgaWYoYXJlYSA9PT0gMClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RPZk1hdHJpeCgpe1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0TGVmdChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFJpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54ICsgcmVjdC5zaGFwZS53aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFRvcChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdEJvdG9tKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFVuaW9uUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiB1bmlvblJlY3R7XG4gICAgbGV0IG5ld1JlY3Q7XG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xuICAgIGxldCB4LHksdyxoXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XG4gICAgeCA9IE1hdGgubWluKHhsMCx4bDEpO1xuICAgIHkgPSBNYXRoLm1pbih5dDAseXQxKTtcbiAgICB3ID0gTWF0aC5tYXgoeHIwLHhyMSkgLSB4O1xuICAgIGggPSBNYXRoLm1heCh5YjAseWIxKSAtIHk7XG4gICAgbmV3UmVjdCA9IG5ldyB1bmlvblJlY3QoW3gseSx3LGhdLHJlY3QwLHJlY3QxKTtcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbFJlY3QocmVjdDogUmVjdGFuZ2xlLGZpbGw/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IHJlY3QwID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXG4gICAgICAgICAgICB5OiByZWN0LnNoYXBlLnksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJlY3QwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVJlY3QocmVjdDogUmVjdGFuZ2xlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHJlY3QwID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXG4gICAgICAgICAgICB5OiByZWN0LnNoYXBlLnksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJlY3QwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBDaXJjbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBDaXJjbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcbiAgICBsZXQgc2ggPSBjaXJjbGUuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICBqdWRnZVN0eWxlKGNpcmNsZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIHJldHVybiBjaXJjbGU7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xuICAgIGxldCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcjogclxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNpcmNsZVxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIExpbmVTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgeEVuZDogbnVtYmVyLFxuICAgIHlFbmQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTGluZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBMaW5lU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTGluZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJsaW5lXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogTGluZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xuLy8gICAgIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuLy8gICAgICAgICBsZXQgbCA9IHRoaXMubWFrZUxpbmUobGluZSxjdHgpO1xuLy8gICAgICAgICByZXR1cm4gbDtcbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcbiAgICBsZXQgc2ggPSBsaW5lLnNoYXBlO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueEVuZCxzaC55RW5kKVxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICByZXR1cm4gbGluZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0xpbmVzKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCk6IEdyb3Vwe1xuICAgIC8v57uY5Yi25aSa5p2h57q/IG9wdHM657q/5p2h5bGe5oCnXG4gICAgbGV0IGdyb3VwID0gbmV3IEdyb3VwKGVsKVxuICAgIHJldHVybiBncm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd01saW5lKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sZ2FwPzogbnVtYmVyW10sc3R5bGU/OiBib29sZWFuLHN0aXBwbGU/OiBib29sZWFuLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgZ2Fw57q/5LmL6Ze055qE6Ze06ZqUIHN0eWxlPWZhbHNl5Li65rC05bmz5bmz6KGMLD10cnVl5Li656uW55u05bmz6KGMIHN0aXBwbGU9ZmFsc2XkuLrlrp7nur8sPXRydWXkuLromZrnur9cbiAgICBpZih3aWR0aEdhcCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB3aWR0aEdhcCAhPT0gJ251bWJlcicpXG4gICAge1xuICAgICAgICB3aWR0aEdhcCA9IDEwO1xuICAgICAgICBpZihzdGlwcGxlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0aXBwbGUgIT09ICdib29sZWFuJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3RpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0eWxlICE9PSAnYm9vbGVhbicpe1xuICAgICAgICAgICAgICAgIHN0eWxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYoZ2FwID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBnYXAgPSBbMTAwLDEwMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbGV0IG9wdHMgPSBuZXcgQXJyYXkoKTtcbiAgICBcbiAgICBpZihzdGlwcGxlID09PSBmYWxzZSlcbiAgICB7XG4gICAgICAgIG9wdHNbMF0gPSBuZXcgTGluZSAoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcbiAgICAgICAgICAgICAgICB5RW5kOiB5RW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHN0eWxlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lKHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5K2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZCtnYXBbaS0xXSppXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUgKHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kK2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG9wdHNbMF0gPSBMaW5lU3RpcHBsZShbeCx5LHhFbmQseUVuZF0sd2lkdGhHYXApO1xuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCx5K2dhcFtpLTFdKmkseEVuZCx5RW5kK2dhcFtpLTFdKmldLHdpZHRoR2FwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3grZ2FwW2ktMV0qaSx5LHhFbmQrZ2FwW2ktMV0qaSx5RW5kXSx3aWR0aEdhcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAgICAgXG4gICAgXG4gICAgbGV0IGdyb3VwID0gRHJhd0xpbmVzKG9wdHMpO1xuICAgIHJldHVybiBncm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSx3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIHdpZHRoR2Fw6Ze06ZqUIFxuICAgIGxldCBsaW5lbGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KHhFbmQteCwyKStNYXRoLnBvdyh5RW5kLXksMikpXG4gICAgaWYod2lkdGhHYXA+bGluZWxlbmd0aHx8d2lkdGhHYXA9PT11bmRlZmluZWQpXG4gICAge1xuICAgICAgICB3aWR0aEdhcCA9IGxpbmVsZW5ndGgvMTA7XG4gICAgfVxuICAgIGxldCBudW0gPSBNYXRoLmZsb29yKGxpbmVsZW5ndGgvd2lkdGhHYXApXG4gICAgbGV0IHhnID0gd2lkdGhHYXAqKHhFbmQteCkvbGluZWxlbmd0aFxuICAgIGxldCB5ZyA9IHdpZHRoR2FwKih5RW5kLXkpL2xpbmVsZW5ndGhcbiAgICAvLyBjb25zb2xlLmRpcihudW0pXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsaW5lID0gbmV3IEFycmF5KCk7XG4gICAgd2hpbGUoaTxudW0pXG4gICAge1xuICAgICAgICBsaW5lW2ldID0gbmV3IExpbmUoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICB4OiB4K3hnKmksXG4gICAgICAgICAgICAgICAgeTogeSt5ZyppLFxuICAgICAgICAgICAgICAgIHhFbmQ6IHgreGcqKGkrMSksXG4gICAgICAgICAgICAgICAgeUVuZDogeSt5ZyooaSsxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpKz0yO1xuICAgIH1cbiAgICBsZXQgTGluZVN0aXBwbGUgPSBuZXcgR3JvdXAobGluZSlcbiAgICByZXR1cm4gTGluZVN0aXBwbGVcbn1cblxuLy8gZXhwb3J0IGNsYXNzIFBvbHkgZXh0ZW5kcyBHcm91cHtcbi8vICAgICBzdHlsZTogU3R5bGVcbi8vICAgICBjb25zdHJ1Y3RvcihlbDogTGluZVtdfEdyb3VwW118R3JvdXAsc3R5bGU/OiBTdHlsZSl7XG4vLyAgICAgICAgIHN1cGVyKGVsKVxuLy8gICAgICAgICBpZihzdHlsZSlcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuLy8gICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuLy8gICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQXJjU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBhbmdfZjogbnVtYmVyLFxuICAgIGFuZ19lOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEFyY09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBBcmNTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBBcmMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiYXJjXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogQXJjT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XG4gICAgbGV0IHN0ID0gYXJjLnN0eWxlXG4gICAgaWYoc3QuZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHN0LmZpbGwgPT09ICdub25lJyB8fCBzdC5maWxsID09PSAnI2ZmZicpXG4gICAge1xuICAgICAgICBtYWtlRnJhbWVBcmMoYXJjLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG1ha2VGaWxsQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjO1xufVxuXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxsQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19lKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2UpKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgIGN0eC5zdHJva2UoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lQXJjKGFyYzogQXJjLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBBcmN7XG4gICAgLy/nlLvnspfnur/lvKcgXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICAvLyBqdWRnZVN0eWxlX2V6c3koYXJjKVxuXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFyYzBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxBcmMoYXJjOiBBcmMsZmlsbD86IHN0cmluZyk6IEFyY3tcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEVsbGlwc2VTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg/OiBudW1iZXIsXG4gICAgeT86IG51bWJlcixcbiAgICByYT86IG51bWJlcixcbiAgICByYj86IG51bWJlclxuICAgIC8vcmHkuLrmqKrovbTplb8gcmLkuLrnurXovbTplb9cbn1cblxuaW50ZXJmYWNlIEVsbGlwc2VPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogRWxsaXBzZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZWxsaXBzZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEVsbGlwc2VPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XG4gICAgLy9tYXjmmK/nrYnkuo4x6Zmk5Lul6ZW/6L205YC8YeWSjGLkuK3nmoTovoPlpKfogIVcbiAgICAvL2nmr4/mrKHlvqrnjq/lop7liqAxL21heO+8jOihqOekuuW6puaVsOeahOWinuWKoFxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxuICAgIGxldCBzaCA9IGVsbGlwc2Uuc2hhcGVcbiAgICBsZXQgc3RlcCA9IChzaC5yYSA+IHNoLnJiKSA/IDEgLyBzaC5yYSA6IDEgLyBzaC5yYjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhzaC54ICsgc2gucmEsIHNoLnkpOyAvL+S7juakreWchueahOW3puerr+eCueW8gOWni+e7mOWItlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMiAqIE1hdGguUEk7IGkgKz0gc3RlcClcbiAgICB7XG4gICAgICAgIC8v5Y+C5pWw5pa556iL5Li6eCA9IGEgKiBjb3MoaSksIHkgPSBiICogc2luKGkp77yMXG4gICAgICAgIC8v5Y+C5pWw5Li6ae+8jOihqOekuuW6puaVsO+8iOW8p+W6pu+8iVxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XG4gICAgfVxuICAgIGp1ZGdlU3R5bGUoZWxsaXBzZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gZWxsaXBzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbE92YWwoZWxsaXBzZTogRWxsaXBzZSxmaWxsPzogc3RyaW5nKTogRWxsaXBzZXtcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlbGxpcHNlMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVPdmFsKGVsbGlwc2U6IEVsbGlwc2UsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IEVsbGlwc2V7XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZWxsaXBzZTBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgUG9seWdvblNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4QTogbnVtYmVyW11cbiAgICB5QTogbnVtYmVyW11cbn1cblxuaW50ZXJmYWNlIFBvbHlnb25PcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUG9seWdvblNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicG9seWdvblwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFBvbHlnb25PcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XG4gICAgbGV0IHNoID0gcG9seWdvbi5zaGFwZVxuICAgIGxldCBudW0gPSAwO1xuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgbnVtID0gTWF0aC5taW4oc2gueEEubGVuZ3RoLHNoLnlBLmxlbmd0aClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbnVtID0gc2gueEEubGVuZ3RoXG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKVxuICAgIHtcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcbiAgICB9XG4gICAgY3R4LmxpbmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgcmV0dXJuIHBvbHlnb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUG9seShwb2x5Z29uOiBQb2x5Z29uLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbFBvbHkocG9seWdvbjogUG9seWdvbixmaWxsPzogc3RyaW5nKTogUG9seWdvbntcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcG9seWdvbjBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZV90ZXh0LCBqdWRnZVRleHRTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgVGV4dFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBtYXhXaWR0aD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgVGV4dE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBUZXh0U2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJ0ZXh0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogVGV4dE9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUZXh0KHRleHQ6IFRleHQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBUZXh0e1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpXG5cbiAgICBqdWRnZVRleHRTdHlsZSh0ZXh0LGN0eClcblxuICAgIGp1ZGdlU3R5bGVfdGV4dCh0ZXh0LGN0eClcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXRTdHIoc3RyQTogc3RyaW5nW10pOiBzdHJpbmd7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ckEubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyQVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0clBhZChzdHI6IHN0cmluZyxzdHIwOiBzdHJpbmcsbnVtPzogbnVtYmVyKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBcbiAgICBpZihudW0gPT09IHVuZGVmaW5lZCB8fCBudW0gPT09IDApXG4gICAge1xuICAgICAgICBudW0gPSAxO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyMFxuICAgIH1cbiAgICB0ZXh0ICs9IHN0clxuXG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVxKHN0cjA6IHN0cmluZyxzdHIxOiBzdHJpbmcpOiBib29sZWFue1xuICAgIGxldCByZXN1bHQgPSBmYWxzZVxuICAgIHJlc3VsdCA9IHN0cjAuaW5jbHVkZXMoc3RyMSk7XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVwbGFjZShzdHI6IHN0cmluZyxzdHJfbzogc3RyaW5nLHN0cl9yOiBzdHJpbmcpOnN0cmluZ3tcbiAgICBsZXQgcmVzdWx0ID0gJydcblxuICAgIHJlc3VsdCA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyX28sJ2cnKSxzdHJfcik7XG5cbiAgICByZXR1cm4gcmVzdWx0XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VJbWFnZVNoYXBlLCBqdWRnZVN0eWxlLGp1ZGdlSW1hZ2VTaGFwZV90cnVlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBJbWdTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIGltZzogc3RyaW5nXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgd2lkdGg/OiBudW1iZXJcbiAgICBoZWlnaHQ/OiBudW1iZXJcbiAgICBzeD86IG51bWJlclxuICAgIHN5PzogbnVtYmVyXG4gICAgc3dpZHRoPzogbnVtYmVyXG4gICAgc2hlaWdodD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgSW1nT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEltZ1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxuICAgIEltZz86IGFueVxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmNsYXNzIFJHQkEge1xuICAgIFI6IG51bWJlclxuICAgIEc6IG51bWJlclxuICAgIEI6IG51bWJlclxuICAgIEE6IG51bWJlclxufVxuXG5jbGFzcyBSR0JBX0FycmF5e1xuICAgIFJHQkFfTGlzdDogUkdCQVtdXG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBJbWcgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxuICAgIElzQ2hhbmdlPzogYm9vbGVhblxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEltZ09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICBpZihvcHRzLkltZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgSSA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBJLnNyYyA9IG9wdHMuc2hhcGUuaW1nXG4gICAgICAgICAgICB0aGlzLkltZyA9IEk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuSW1nID0gb3B0cy5JbWdcbiAgICAgICAgfVxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IHtcbiAgICAgICAgLy8gICAgIHRleHR1cmU6IFtdLFxuICAgICAgICAvLyAgICAgd2lkdGg6IDAsXG4gICAgICAgIC8vICAgICBoZWlnaHQ6IDBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZihvcHRzLkltZ0RhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3kgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3dpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3dpZHRoID0gdGhpcy5JbWcud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc2hlaWdodCA9IHRoaXMuSW1nLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLndpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUud2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLmhlaWdodCA9IHRoaXMuSW1nLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXG5cbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5JbWdEYXRhKVxuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgLy8gaWYob3B0cy5zdHlsZSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGVcbiAgICAgICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAgIGMud2lkdGggPSBzY3JlZW4uYXZhaWxXaWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBzY3JlZW4uYXZhaWxIZWlnaHQ7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5JbWcsc2gueCxzaC55KVxuICAgICAgICB0aGlzLkltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKHNoLngsc2gueSx0aGlzLkltZy53aWR0aCx0aGlzLkltZy5oZWlnaHQpO1xuICAgICAgICAvLyB0aGlzLm1ha2VUZXh0dXJlcygpXG4gICAgfVxuICAgIHRvR3JheSgpe1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltZyh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIGltZzogdGhpcy5zaGFwZS5pbWcsXG4gICAgICAgICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxuICAgICAgICAgICAgICAgIHN5OiB0aGlzLnNoYXBlLnN5LFxuICAgICAgICAgICAgICAgIHN3aWR0aDogdGhpcy5zaGFwZS5zd2lkdGgsXG4gICAgICAgICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBpbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgICAgIGxldCBnID0gMFxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGcgPSBNYXRoLmZsb29yKHRoaXMuSW1nRGF0YS5kYXRhWzQqaSswXSAqIDAuMjk5ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzFdICogMC41ODcgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMl0gKiAwLjExNCk7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSszXSA9IHRoaXMuSW1nRGF0YS5kYXRhWzQqaSszXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuICAgIHJlcGxhY2UoKXtcbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIG1ha2VUZXh0dXJlcygpe1xuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0gbmV3IFRleHR1cmVzKHRoaXMpO1xuICAgICAgICBsZXQgaW1nID0gdGhpcy50b0dyYXkoKTtcbiAgICAgICAgbGV0IGRhdGEwID0gaW1nLkltZ0RhdGEuZGF0YTtcbiAgICAgICAgbGV0IGEgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgYXJyID0gJydcbiAgICAgICAgbGV0IG51bUFycjogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbGV0IG51bUFycjA6IG51bWJlcltdID0gW107XG4gICAgICAgIC8vIGxldCBkYXRhID0gdGhpcy5JbWdEYXRhLmRhdGFcbiAgICAgICAgbGV0IHcgPSB0aGlzLkltZ0RhdGEud2lkdGhcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZGF0YSlcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YTAubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAzO3QrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwO2sgPCAzO2srKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEwWzQqaV0gPD0gZGF0YTBbNCooaSsodC0xKSp3K2stMSldIHx8IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoMyp0K2sgIT09IDQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyciArPSBhWzMqdCtrXS50b1N0cmluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoaSsodC0xKSp3K2stMSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbnVtQXJyW2ldID0gcGFyc2VJbnQoYXJyLDIpXG4gICAgICAgICAgICBhcnIgPSAnJ1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IG51bUFyci5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXT1udW1BcnJbaV1cbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdPW51bUFycltpXVxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl09bnVtQXJyW2ldXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW1nKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogSW1ne1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGlmKGltZy5Jc0NoYW5nZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBqdWRnZUltYWdlU2hhcGUoaW1nLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZyxjdHgpO1xuICAgIH1cbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICByZXR1cm4gaW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbVJlYWQoaW1nOiBJbWcpOiBJbWFnZURhdGF7ICAgICAgICAgLy/or7vlj5blm77niYfnn6npmLVcbiAgICByZXR1cm4gaW1nLkltZ0RhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbnBhY2tDb2xvckltYWdlKGltZzogSW1nKTogUkdCQV9BcnJheXtcbiAgICBsZXQgcmdiYSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGRhdGEgPSBpbWcuSW1nRGF0YS5kYXRhXG4gICAgXG4gICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICByZ2JhW2ldID0gbmV3IFJHQkEoKVxuICAgICAgICBcbiAgICAgICAgcmdiYVtpXS5SID0gZGF0YVs0KmkrMF1cbiAgICAgICAgcmdiYVtpXS5HID0gZGF0YVs0KmkrMV1cbiAgICAgICAgcmdiYVtpXS5CID0gZGF0YVs0KmkrMl1cbiAgICAgICAgcmdiYVtpXS5BID0gZGF0YVs0KmkrM11cblxuICAgIH1cblxuICAgIGxldCByZ2JhX2FyciA9IG5ldyBSR0JBX0FycmF5KClcbiAgICByZ2JhX2Fyci5SR0JBX0xpc3QgPSByZ2JhO1xuICAgIHJnYmFfYXJyLndpZHRoID0gaW1nLkltZ0RhdGEud2lkdGhcbiAgICByZ2JhX2Fyci5oZWlnaHQgPSBpbWcuSW1nRGF0YS5oZWlnaHRcblxuICAgIHJldHVybiByZ2JhX2FyclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGFja0NvbG9ySW1hZ2UocmdiYV9hcnI6IFJHQkFfQXJyYXkpOiBJbWFnZURhdGF7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcblxuICAgIGxldCBpbWdkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShyZ2JhX2Fyci53aWR0aCxyZ2JhX2Fyci5oZWlnaHQpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHJnYmFfYXJyLlJHQkFfTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSswXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5SXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMV0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uR1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzJdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSszXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5BXG4gICAgfVxuICAgIHJldHVybiBpbWdkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VJbihpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAxO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9IGFscGhhSW5cbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VPdXQoaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXG4gICAge1xuICAgICAgICBhbHBoYUluID0gMDtcbiAgICB9XG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxuICAgICAgICB9XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSAoMSAtIGFscGhhSW4pXG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW1nSW5pdChpbWc6IEltZ1tdfEdyb3VwKXtcbiAgICBsZXQgSTtcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgSSA9IGltZ1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgSS5ncm91cExpc3RbaV0uaW5pdCgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJlbG9hZFRleHR1cmVzKGltZzogSW1nKTogSW1ne1xuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmUoaW1nOiBJbWcpOiBJbWd7XG4gICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZXMoaW1nOiBJbWdbXXxHcm91cCk6IEdyb3Vwe1xuICAgIGxldCBJO1xuICAgIGxldCB0ZXh0dXJlOiBJbWdbXSA9IFtdXG4gICAgbGV0IFQ7XG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEkgPSBpbWdcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHR1cmVbaV0gPSBEcmF3VGV4dHVyZShJLmdyb3VwTGlzdFtpXSlcbiAgICB9XG4gICAgVCA9IG5ldyBHcm91cCh0ZXh0dXJlKVxuICAgIHJldHVybiBUO1xufSIsImltcG9ydCB7Y2FudmFzU3R5bGV9IGZyb20gJy4uL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgeyBSZWN0YW5nbGUsbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4uL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCcgXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBDaXJjbGUsbWFrZUNpcmNsZSB9IGZyb20gJy4uL0dyYXBoaWMvY2lyY2xlJ1xuaW1wb3J0IHsgTGluZSwgbWFrZUxpbmV9IGZyb20gJy4uL0dyYXBoaWMvbGluZSdcbmltcG9ydCB7IEFyYywgbWFrZUFyYyB9IGZyb20gJy4uL0dyYXBoaWMvYXJjJ1xuaW1wb3J0IHsgRWxsaXBzZSwgbWFrZUVsbGlwc2UgfSBmcm9tICcuLi9HcmFwaGljL2VsbGlwc2UnXG5pbXBvcnQgeyBtYWtlUG9seWdvbiwgUG9seWdvbiB9IGZyb20gJy4uL0dyYXBoaWMvcG9seWdvbidcbmltcG9ydCB7IG1ha2VUZXh0LCBUZXh0IH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xuaW1wb3J0IHsgSW1nLCBtYWtlSW1nIH0gZnJvbSAnLi4vR3JhcGhpYy9pbWFnZSdcbmltcG9ydCB7IGNvbnRlbnRTdHlsZSB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKTpjYW52YXNTdHlsZXtcbiAgICBpZighY1N0eWxlKSBcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFjU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBjU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBjU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIHJldHVybiBjU3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZURpdlN0eWxlKGRTdHlsZTogRGl2U3R5bGUpOiBEaXZTdHlsZXtcbiAgICBpZighZFN0eWxlKSBcbiAgICB7XG4gICAgICAgIGRTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDI2MCxcbiAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighZFN0eWxlLndpZHRoKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLndpZHRoID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuaGVpZ2h0KVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmhlaWdodCA9IDQwMFxuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlcilcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXIgPSAnbm9uZSdcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5ib3JkZXJSYWRpdXMpXG4gICAge1xuICAgICAgICBkU3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCdcbiAgICB9XG4gICAgcmV0dXJuIGRTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ29udGVudFN0eWxlKGNTdHlsZTogY29udGVudFN0eWxlLHRpdGxlOiBzdHJpbmcsY29udGVudDogc3RyaW5nKTogY29udGVudFN0eWxle1xuICAgIGlmKCFjU3R5bGUpXG4gICAge1xuICAgICAgICBjU3R5bGUgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgYnRuU3RyOiBbJ09LJ10sXG4gICAgICAgICAgICBub0ljb246IGZhbHNlLFxuICAgICAgICAgICAgbm9JbnQ6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVBvc2l0aW9uOiAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS50aXRsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZS50aXRsZSA9IHRpdGxlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29udGVudClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5jb250ZW50ID0gY29udGVudFxuICAgIH1cbiAgICBpZighY1N0eWxlLmJ0blN0cil7XG4gICAgICAgIGNTdHlsZS5idG5TdHIgPSBbJ09LJ11cbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ljb24pXG4gICAge1xuICAgICAgICBjU3R5bGUubm9JY29uID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ludClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ludCA9IGZhbHNlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29uZmlybVBvc2l0aW9uKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDA7XG4gICAgfVxuICAgIGlmKGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDAgJiYgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMSAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAyKXtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VNb2RlbChtb2RlbDogc3RyaW5nKTogW3N0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZ117XG4gICAgaWYobW9kZWwgPT09ICdlcnJvcicpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiWFwiLCdyZWQnLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2hlbHAnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnSGVscCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBoZWxwIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAncXVlc3QnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIj9cIiwnZ3JleScsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICd3YXJuJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCIhXCIsJ29yYW5nZScsJ1dhcm5pbmcgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgd2FybmluZyBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2lucHV0JylcbiAgICB7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJJbnB1dCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IGlucHV0IHN0cmluZ1wiXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnc2VsZWN0Jyl7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJTZWxlY3QgRGlhbG9ndWVcIixcIlRoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdmaWxlJyl7XG4gICAgICAgIHJldHVybiBbJycsJycsJ0ZpbGUgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZmlsZSBzdHJpbmcnXVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gWyfvvZ4nLCdncmVlbicsJ0RhaWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGRhaWxvZ3VlIHN0cmluZyddXG4gICAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShzdHlsZTogU3R5bGUpe1xuLy8gICAgIGlmKCFzdHlsZSlcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRWxlbWVudChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIC8vIGNvbnNvbGUuZGlyKFJlY3RhbmdsZSlcbiAgICAvLyBjb25zb2xlLmRpcihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XG4gICAgICAgIG1ha2VSZWN0YW5nbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIG1ha2VDaXJjbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBtYWtlTGluZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgbWFrZUFyYyhlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIG1ha2VFbGxpcHNlKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAge1xuICAgICAgICBtYWtlUG9seWdvbihlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBUZXh0KVxuICAgIHtcbiAgICAgICAgbWFrZVRleHQoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIG1ha2VJbWcoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgICAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAgICAgbGV0IGxpc3QgPSBlbC5ncm91cExpc3Q7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QubGluZVdpZHRoID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzdC5saW5lV2lkdGggPSAxO1xuICAgIH1cbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYoIShzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCkpe1xuICAgIC8vICAgICAvLyBzdC5zdHJva2UgPSAnIzAwMCc7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyAgICAgfVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gY3R4LmZpbGwoKTtcbiAgICAvLyBjdHguc3Ryb2tlKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGVfdGV4dChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGxUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUZXh0U3R5bGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc3QgPSBlbC5zdHlsZVxuICAgIGxldCBmb250U3RyaW5nID0gJyc7XG4gICAgaWYoc3QgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0ID0ge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTdHlsZSAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA8IDMgJiYgc3QuZm9udFN0eWxlID49MClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdpdGFsaWMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U3R5bGUgPSBzdC5mb250U3R5bGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gJ2l0YWxpYycgJiYgc3QuZm9udFN0eWxlICE9PSAnb2JsaXF1ZScgJiYgc3QuZm9udFN0eWxlICE9PSBcIm5vcm1hbFwiKXtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09ICcwJyl7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMScpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzInKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFZhcmlhbnQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250VmFyaWFudCAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFZhcmlhbnQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9IHN0LmZvbnRWYXJpYW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCAhPT0gJ25vcm1hbCcgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdzbWFsbC1jYXBzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250V2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFdlaWdodCAhPT0gJ25vbmUnKXtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gc3QuZm9udFdlaWdodC50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFdlaWdodCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZGVyJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbGlnaHRlcicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRTaXplICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFNpemUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTaXplLmluZGV4T2YoJ3B4JykgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUgKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFNpemUgPSAnMThweCdcbiAgICB9XG4gICAgZm9udFN0cmluZyA9IHN0LmZvbnRTdHlsZSArICcgJyArIHN0LmZvbnRWYXJpYW50ICsgJyAnICsgc3QuZm9udFdlaWdodCArICcgJyArIHN0LmZvbnRTaXplICsgJyAnICsgc3QuZm9udEZhbWlseTtcbiAgICBjdHguZm9udCA9IGZvbnRTdHJpbmc7XG4gICAgY29uc29sZS5kaXIoZm9udFN0cmluZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ2hhbmdlVHlwZShlbDogbnVtYmVyfHN0cmluZyk6IG51bWJlcntcbiAgICBsZXQgeCA9IDE7XG4gICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgaWYodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgIHtcbiAgICAgICAgZWwgPSBlbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZihlbCA9PT0gXCJDRU5URVJcIiB8fCBlbCA9PT0gJ0MnKVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVExFRlQnIHx8IGVsID09PSBcIkxFRlRcIiB8fCBlbCA9PT0gJ0wnKXtcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFRPUCcgfHwgZWwgPT09IFwiVE9QXCIgfHwgZWwgPT09ICdUJyl7XG4gICAgICAgICAgICB4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFJJR0hUJyB8fCBlbCA9PT0gXCJSSUdIVFwiIHx8IGVsID09PSAnUicpe1xuICAgICAgICAgICAgeCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RCT1RUT00nIHx8IGVsID09PSBcIkJPVFRPTVwiIHx8IGVsID09PSAnQicpe1xuICAgICAgICAgICAgeCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiBlbCA9PT0gXCJudW1iZXJcIilcbiAgICB7XG4gICAgICAgIGlmKGVsPDUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHggPSBlbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVNpZGUoc2lkZTA6IG51bWJlcnxzdHJpbmcsc2lkZTE6IG51bWJlcnxzdHJpbmcpOiBbbnVtYmVyLG51bWJlcl17XG4gICAgbGV0IGYwID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUwKTtcbiAgICBsZXQgZjEgPSBqdWRnZUNoYW5nZVR5cGUoc2lkZTEpO1xuICAgIGlmKGYwID09PSAyIHx8IGYwID09PSA0KXtcbiAgICAgICAgaWYoZjEgPT09IDIgfHwgZjEgPT09IDQpe1xuICAgICAgICAgICAgZjEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgdCA9IGYxO1xuICAgICAgICAgICAgZjEgPSBmMDtcbiAgICAgICAgICAgIGYwID0gdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMyl7XG4gICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAzKXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2YwLGYxXVxufSAgIFxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LGltZy5JbWcud2lkdGgsaW1nLkltZy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodCxzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGltZy5zaGFwZVxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnksc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJc0luRWxlbWVudChbeCx5XTogW251bWJlcixudW1iZXJdLGVsOiBFbGVtZW50cyk6IGJvb2xlYW57XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUud2lkdGgsZWwuc2hhcGUuaGVpZ2h0XVxuICAgICAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yXVxuICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXgwLDIpICsgTWF0aC5wb3coeS15MCwyKSlcbiAgICAgICAgaWYociA8PSByMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUueEVuZCxlbC5zaGFwZS55RW5kXVxuICAgICAgICBpZih4MSAhPT0geDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB5dCA9ICh5MS15MCkvKHgxLXgwKSAqICh4IC0geDApICsgeTBcbiAgICAgICAgICAgIGlmKHkgPj0geXQtMTUgJiYgeSA8PSB5dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHh0ID0gKHgxLXgwKS8oeTEteTApICogKHkgLSB5MCkgKyB4MFxuICAgICAgICAgICAgaWYoeSA+PSB4dC0xNSAmJiB5IDw9IHh0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCxyYTAscmIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucmEsZWwuc2hhcGUucmJdXG4gICAgICAgIGxldCB0ID0gTWF0aC5wb3coeC14MCwyKS9NYXRoLnBvdyhyYTAsMikgKyBNYXRoLnBvdyh5LXkwLDIpL01hdGgucG93KHJiMCwyKVxuICAgICAgICBpZih0IDw9IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgIGxldCBqID0gaSArIDFcbiAgICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgICBsZXQgeHQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgeXQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgW3gwLHkwXSA9IFtlbC5zaGFwZS54QSxlbC5zaGFwZS55QV1cbiAgICAgICAgZm9yKGkgPSAwO2k8ZWwuc2hhcGUueEEubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaSA9PT0gZWwuc2hhcGUueEEubGVuZ3RoLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaiA9IGkgKyAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih5MFtpXSAhPT0geTBbal0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeHRbaW5kZXhdID0gKHgwW2ldLXgwW2pdKS8oeTBbaV0teTBbal0pICogKHkgLSB5MFtpXSkgKyB4MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB5dFtpbmRleF0gPSAoeTBbal0teTBbaV0pLyh4MFtqXS14MFtpXSkgKiAoeCAtIHgwW2ldKSArIHkwW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4ID09PSB4dFtpbmRleF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoeHRbaW5kZXhdID49IHgpe1xuICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihpbmRleCUyPT09MClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAgLy8ge1xuICAgIC8vICAgICBsZXQgY1xuICAgIC8vICAgICBsZXQgaSxqXG4gICAgLy8gICAgIGxldCBsID0gZWwuc2hhcGUueUEubGVuZ3RoXG4gICAgLy8gICAgIGZvcihjID0gZmFsc2UsaSA9IC0xLGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIFxuICAgIC8vICAgICAgICAgKCAoZWwuc2hhcGUueUFbaV0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbal0pIHx8IChlbC5zaGFwZS55QVtqXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtpXSkgKSBcbiAgICAvLyAgICAgICAgICYmICh4IDwgKGVsLnNoYXBlLnhBW2pdIC0gZWwuc2hhcGUueEFbaV0pICogKHkgLSBlbC5zaGFwZS55QVtpXSkgLyAoZWwuc2hhcGUueUFbal0gLSBlbC5zaGFwZS55QVtpXSkgKyBlbC5zaGFwZS54QVtpXSkgXG4gICAgLy8gICAgICAgICAmJiAoYyA9ICFjKTsgXG4gICAgLy8gICAgIHJldHVybiBjOyBcbiAgICAvLyB9XG59IiwiaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuZXhwb3J0IGludGVyZmFjZSBjYW52YXNTdHlsZXtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgLy8gbGV0IGNTdHlsZTogY2FudmFzU3R5bGUgPSB7XG4gICAgLy8gICAgIHdpZHRoOiAxMDAsXG4gICAgLy8gICAgIGhlaWdodDogMTAwXG4gICAgLy8gfVxuICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9tLmFwcGVuZChjKTtcbiAgICByZXR1cm4gY3R4O1xufSIsIlxuY2xhc3MgdGltZXtcbiAgICBob3VyOiBudW1iZXJcbiAgICBtaW51dGVzOiBudW1iZXJcbiAgICBzZWNvbmRzOiBudW1iZXJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IHRpbWVcbiAgICBpbnN0YW50VGltZTogdGltZVxuICAgIHRyYW5zaWVudFRpbWU6IHRpbWVbXVxuICAgIHRpbWVWYWx1ZTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBuZXcgdGltZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGljKCk6IFRpbWV7XG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXG4gICAgdC5zdGFydCgpXG4gICAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZSk6IG51bWJlcntcbiAgICBsZXQgdCA9IDA7XG4gICAgbGV0IHRzID0gbmV3IEFycmF5KClcbiAgICB0aW1lLnJlY29yZCgpXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXG4gICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lLm1pbnV0ZXMgLSB0aW1lLnN0YXJ0VGltZS5taW51dGVzXG4gICAgdHNbMl0gPSB0aW1lLmluc3RhbnRUaW1lLnNlY29uZHMgLSB0aW1lLnN0YXJ0VGltZS5zZWNvbmRzXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xuICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4gICAgdGltZS50aW1lVmFsdWUgPSB0O1xuICAgIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xuICAgIGxldCB0ID0gVG9jKHRpbWUpXG4gICAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIsbWVzc2FnZT86IGFueSl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlfZnJhbWUobnVtMSl7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT09bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbn0pfTsiLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBqdWRnZUlzSW5FbGVtZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZXZlbnQgPT57XG4gICAgICAgICAgICBsZXQgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiTmFtZShrZXk6IHN0cmluZ3xudW1iZXIpOm51bWJlcntcbiAgICBsZXQgcmVzO1xuXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICByZXMgPSBrZXkuY2hhckNvZGVBdCgwKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleSlcbiAgICB9XG4gICAgY29uc29sZS5kaXIocmVzKSBcbiAgICByZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYlByZXNzV2FpdChrZXk6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUmVsZWFzZVdhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxldCB4LHlcbiAgICAgICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWFxuICAgICAgICAgICAgICAgIHkgPSBlLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih4KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHkpXG4gICAgICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmKVxuICAgICAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG59XG5cbiIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGl2U3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xuICAgIGJvcmRlcj86IHN0cmluZztcbiAgICBib3JkZXJSYWRpdXM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXYoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU6IERpdlN0eWxlKTogW0hUTUxFbGVtZW50LERpdlN0eWxlXXtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkU3R5bGUgPSBlekp1ZGdlLmp1ZGdlRGl2U3R5bGUoZFN0eWxlKTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcbiAgICBkaXYuc3R5bGUuYm9yZGVyID0gZFN0eWxlLmJvcmRlclxuICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBkU3R5bGUuYm9yZGVyUmFkaXVzXG4gICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgIGRpdi5zdHlsZS5ib3hTaGFkb3cgPSAnMjBweCAxMHB4IDQwcHggIzg4ODg4OCdcbiAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgZGl2LnN0eWxlLnpJbmRleCA9ICcxMDAwJ1xuICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xuICAgIC8vIGRpdi5zdHlsZS50b3AgPSAnMHB4J1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgZGl2LnN0eWxlLnRvcCA9ICgoaC1kU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGRpdi5zdHlsZS5sZWZ0ID0gKCh3LWRTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBkb20uYXBwZW5kKGRpdik7XG4gICAgcmV0dXJuIFtkaXYsZFN0eWxlXVxufSIsImltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCAqIGFzIGV6RGl2IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUgfSBmcm9tICcuLi9UaW1lL3RpbWUnXG5cbmxldCBpZCA9IDBcblxuZXhwb3J0IGNsYXNzIERpYWxvZ3Vle1xuICAgIGlkOiBudW1iZXJcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgZG9tUGFyZW50OiBIVE1MRWxlbWVudFxuICAgIGNvblQ6IENvbnRlbnRcbiAgICBkU3R5bGU/OiBEaXZTdHlsZVxuICAgIHN0YXR1c1ZhbHVlOiBib29sZWFuICAgIC8v5oyJ6ZKu54K55Ye754q25oCBIHRydWXkuLrpgInmi6nmmK8gZmFsc2XkuLrpgInmi6nlkKbmiJblj5bmtohcbiAgICBpbnRWYWx1ZTogQXJyYXk8c3RyaW5nPlxuICAgIHNlbGVjdFZhbHVlOiBBcnJheTxzdHJpbmc+XG4gICAgZmlsZXM6IEZpbGVSZWFkZXJcbiAgICBjb25zdHJ1Y3Rvcihkb21QYXJlbnQ6IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKXtcbiAgICAgICAgW3RoaXMuZG9tLHRoaXMuZFN0eWxlXSA9IGV6RGl2LmNyZWF0ZURpdihkb21QYXJlbnQsZFN0eWxlKVxuICAgICAgICBsZXQgY29uVCA9IG5ldyBDb250ZW50KHRoaXMuZG9tLHRoaXMuZFN0eWxlKVxuICAgICAgICB0aGlzLmNvblQgPSBjb25UXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLmRvbVBhcmVudCA9IGRvbVBhcmVudFxuICAgICAgICB0aGlzLmludFZhbHVlID0gW11cbiAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBpZCsrXG4gICAgfVxuICAgIHNob3coY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlLnNlbGVkU3RyID0gW11cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICBsZXQgdG9wU3RyID0gWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXVxuICAgICAgICBpZighY29uU3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvblN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdub25lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBbY2hhcixjb2xvcix0aXRsZSxjb250ZW50XSA9IGV6SnVkZ2UuanVkZ2VNb2RlbChjb25TdHlsZS50eXBlKVxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsdGl0bGUsY29udGVudClcbiAgICAgICAgaWYoY29uU3R5bGUubm9JY29uKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZighY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvcFN0ciA9IFsnMjBweCcsJzkwcHgnLCcxODBweCddXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsdG9wU3RyLGNoYXIsY29sb3IsY29uU3R5bGUuYnRuU3RyKVxuICAgICAgICAvLyBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFswXVxuICAgICAgICBsZXQgbCA9IHRoYXQuY29uVC5jaGlsZFt0aGF0LmNvblQuY2hpbGQubGVuZ3RoIC0gMV0uY2hpbGQubGVuZ3RoO1xuICAgICAgICBsZXQgaW50ID0gbmV3IEFycmF5KClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGlmKGNvblN0eWxlLmludFN0cilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5pbnRTdHIubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGludFtpXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvblN0eWxlLmludFN0cltpXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJylcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGw7aSsrKVxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFtpXVxuICAgICAgICAgICAgICAgIGJ0bi5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZidcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjMDA4ODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmRvbS5zdHlsZS5jb2xvciA9ICdibHVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSBjb25TdHlsZS5jb25maXJtUG9zaXRpb258fGNvblN0eWxlLmJ0blN0ci5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgY29uU3R5bGUuaW50U3RyLmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW50VmFsdWUucHVzaChjb25TdHlsZS5pbnRTdHJbdF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmludFZhbHVlLnB1c2goaW50W3RdLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCBjb25TdHlsZS5zZWxlZFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyW3RdICE9PSB1bmRlZmluZWQgfHwgY29uU3R5bGUuc2VsZWRTdHJbdF0gIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RWYWx1ZS5wdXNoKGNvblN0eWxlLnNlbGVkU3RyW3RdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25TdHlsZS50eXBlID09PSAnZmlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZiA9IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVfUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV9SZWFkZXIub25sb2FkID0gcmVzdWx0ID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYyA9IGZpbGVfUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihmYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsZV9SZWFkZXIucmVhZEFzRGF0YVVSTCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZmlsZSkuZmlsZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxlX1JlYWRlci5yZWFkQXNUZXh0KCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsZXMgPSBmaWxlX1JlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXR1c1ZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhhdC5zdGF0dXNWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2V0RGxnU3R5bGUoZFN0eWxlOiBEaXZTdHlsZSl7XG4gICAgICAgIGRTdHlsZSA9IGV6SnVkZ2UuanVkZ2VEaXZTdHlsZShkU3R5bGUpXG4gICAgICAgIGxldCBkb21TID0gdGhpcy5kb20uc3R5bGVcbiAgICAgICAgZG9tUy53aWR0aCA9IGRTdHlsZS53aWR0aC50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBkb21TLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgZG9tUy5ib3JkZXIgPSBkU3R5bGUuYm9yZGVyXG4gICAgICAgIGRvbVMuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xuICAgIH1cbiAgICBpbnB1dGRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdJbnB1dCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBpbnB1dCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdpbnB1dCdcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhjb25TdHlsZSkvKi50aGVuKCkqL1xuICAgIH1cbiAgICBsaXN0ZGxnKGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ1NlbGVjdCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnc2VsZWN0J1xuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICBlcnJvcmRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdlcnJvcidcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIGhlbHBkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdoZWxwJ1xuICAgICAgICBjb25TdHlsZS5ub1NlbCA9IHRydWVcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvdyhjb25TdHlsZSlcbiAgICB9XG4gICAgbXNnYm94KGNvblN0eWxlPzogY29udGVudFN0eWxlLG1vZGVsPzogc3RyaW5nKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHF1ZXN0ZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAncXVlc3QnXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICB3YXJuZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdXYXJuaW5nIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IHdhcm5pbmcgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnd2FybidcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHJlbW92ZSgpe1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgICAgICAgICAgICB0aGF0LmRvbS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgICAgICBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgICAgICBjb25zb2xlLmRpcignYScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGF0LmNvblQuY2hpbGQgPSBbXVxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodGhhdClcbiAgICAgICAgICAgIC8vIHRoYXQuZG9tLnJlbW92ZSgpXG4gICAgICAgICAgICB0aGF0LmRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcbiAgICAgICAgICAgIHJlc29sdmUoMClcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIGNvbnRlbnRTdHlsZXtcbiAgICAvL+S8mOWFiOe6pzog6L6T5YWl5qGGID0g6YCJ5oup5qGGID4g5YW25LuWXG4gICAgdHlwZT86IHN0cmluZyAgICAgICAgICAgLy/lr7nor53nsbvlnotcbiAgICB0aXRsZT86IHN0cmluZyAgICAgICAgICAvL+Wvueivneagh+mimFxuICAgIGNvbnRlbnQ/OiBzdHJpbmcgICAgICAgIC8v5a+56K+d5o+Q56S65YaF5a65XG4gICAgaW1nPzogc3RyaW5nICAgICAgICAgICAgLy/oh6rlrprkuYnlm77niYdcbiAgICBidG5TdHI/OiBBcnJheTxzdHJpbmc+ICAvL+aMiemSruWtl+esplxuICAgIGludFN0cj86IEFycmF5PHN0cmluZz4gIC8v6L6T5YWl5qGG5o+Q56S6XG4gICAgc2VsU3RyPzogQXJyYXk8c3RyaW5nPiAgIC8v6YCJ5oup5qGG5YaF5a65XG4gICAgc2VsZWRTdHI/OiBBcnJheTxzdHJpbmc+IC8v5bey6YCJ5oup5YaF5a65XG4gICAgbm9JY29uPzogYm9vbGVhbiAgICAgICAgLy/orr7nva7mmK/lkKbmnInlm77moIdcbiAgICBub0ludD86IGJvb2xlYW4gICAgICAgICAvL+iuvue9ruaYr+WQpuaciei+k+WFpeahhlxuICAgIG5vU2VsPzogYm9vbGVhbiAgICAgICAgIC8v6K6+572u5piv5ZCm5pyJ6YCJ5oup5qGGXG4gICAgY29uZmlybVBvc2l0aW9uPzogbnVtYmVyLy/orr7nva7noa7orqTplK7nmoTkvY3nva7vvIzpu5jorqTkuLow5Y2z5LuO5bem5b6A5Y+z55qE56ys5LiA5LiqXG4gICAgSXNNdWx0aXBsZT86IHN0cmluZyAgICAgLy/mmK/lkKblpJrpgIlcbn1cblxuY2xhc3MgQ29udGVudHtcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgcGFyZW50OiBDb250ZW50XG4gICAgY2hpbGQ6IEFycmF5PENvbnRlbnQ+XG4gICAgZFN0eWxlOiBEaXZTdHlsZVxuICAgIGNvbnN0cnVjdG9yKGNvblQ6IENvbnRlbnR8SFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSl7XG4gICAgICAgIGxldCBjaGlsZCA9IG5ldyBBcnJheSgpXG4gICAgICAgIHRoaXMuY2hpbGQgPSBjaGlsZFxuICAgICAgICBpZihjb25UIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkXG4gICAgICAgICAgICB0aGlzLmRvbSA9IGNvblRcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUuaGVpZ2h0ID0gZFN0eWxlLmhlaWdodC50b1N0cmluZygpXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS50ZXh0QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSBjb25UXG4gICAgICAgICAgICBjb25ULmNoaWxkLnB1c2godGhpcylcbiAgICAgICAgICAgIC8vIC8vIGxldCBoID0gdGhpcy5kb21QYXJlbnQuY2xpZW50SGVpZ2h0IFxuICAgICAgICAgICAgLy8gdGhpcy5kb20uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjaydcbiAgICAgICAgICAgIGNvblQuZG9tLmFwcGVuZCh0aGlzLmRvbSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEbGdJbml0KGRvbTogSFRNTEVsZW1lbnQsZFN0eWxlPzogRGl2U3R5bGUpIHtcbiAgICBsZXQgZGxnID0gbmV3IERpYWxvZ3VlKGRvbSxkU3R5bGUpO1xuICAgIHJldHVybiBkbGc7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZyhkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBBcnJheTxzdHJpbmc+LGltZ1N0cj86IHN0cmluZyxpbWdDb2xvcj86IHN0cmluZyxzdHI/OiBBcnJheTxzdHJpbmc+KXtcbiAgICAvLyBjb25zb2xlLmRpcihkbGcpXG4gICAgZGxnLmRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnXG4gICAgY3JlYXRlRGxnVGl0bGUoZGxnLGNvblN0eWxlLHRvcFswXSlcbiAgICBjcmVhdGVEbGdDb250ZW50KGRsZyxjb25TdHlsZSx0b3BbMV0pXG4gICAgaWYodG9wLmxlbmd0aCA9PT0gNClcbiAgICB7XG4gICAgICAgIGNyZWF0ZURsZ0ltZ0RpdihkbGcsY29uU3R5bGUsdG9wWzJdLGltZ1N0cixpbWdDb2xvcilcbiAgICAgICAgY3JlYXRlRGxnQnRuRGl2KGRsZyxjb25TdHlsZSx0b3BbM10sc3RyKVxuICAgIH1cbiAgICBlbHNlIGlmKHRvcC5sZW5ndGggPT09IDMpXG4gICAge1xuICAgICAgICBjcmVhdGVEbGdCdG5EaXYoZGxnLGNvblN0eWxlLHRvcFsyXSxzdHIpXG4gICAgfVxuICAgIFxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdUaXRsZShkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcpe1xuICAgIGxldCB0aXRsZVN0eWxlID0ge1xuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgIH1cbiAgICBsZXQgdGl0bGUgPSBuZXcgQ29udGVudChkbGcuY29uVCx0aXRsZVN0eWxlKVxuICAgIC8vIGNvbnNvbGUuZGlyKHRpdGxlKVxuICAgIHRpdGxlLmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS50aXRsZVxuICAgIHRpdGxlLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyNnB4J1xuICAgIHRpdGxlLmRvbS5zdHlsZS5mb250V2VpZ2h0ID0gJ2JvbGQnXG4gICAgdGl0bGUuZG9tLnN0eWxlLnRvcCA9IHRvcFxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdDb250ZW50KGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XG4gICAgbGV0IGNvbnRlbnRTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogNTBcbiAgICB9XG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgQ29udGVudChkbGcuY29uVCxjb250ZW50U3R5bGUpXG4gICAgY29udGVudC5kb20uaW5uZXJUZXh0ID0gY29uU3R5bGUuY29udGVudFxuICAgIGNvbnRlbnQuZG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnXG4gICAgY29udGVudC5kb20uc3R5bGUudG9wID0gdG9wXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZ0RpdihkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcsc3RyOiBzdHJpbmcsY29sb3I6IHN0cmluZylcbntcbiAgICBsZXQgaW1nRGl2U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDYwXG4gICAgfVxuICAgIGxldCBpbWdEaXYgPSBuZXcgQ29udGVudChkbGcuY29uVCxpbWdEaXZTdHlsZSlcbiAgICBpbWdEaXYuZG9tLnN0eWxlLnRvcCA9IHRvcFxuICAgIGltZ0Rpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIGltZ0Rpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJ1xuICAgIGlmKCFjb25TdHlsZS5pbnRTdHJ8fGNvblN0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgZGxnLmRvbS5zdHlsZS5oZWlnaHQgPSBkbGcuZFN0eWxlLmhlaWdodC50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBpZighY29uU3R5bGUuc2VsU3RyfHxjb25TdHlsZS5ub1NlbClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIWNvblN0eWxlLmltZylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihjb25TdHlsZS50eXBlID09PSAnZmlsZScpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVEbGdGaWxlKGltZ0RpdixkbGcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURsZ0ltZyhpbWdEaXYsc3RyLGNvbG9yKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY3JlYXRlRGxnSW1nMChpbWdEaXYsY29uU3R5bGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNyZWF0ZURsZ1NlbGVjdChpbWdEaXYsY29uU3R5bGUpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaW1nRGl2LmRvbS5zdHlsZS5oZWlnaHQgPSAoaW1nRGl2U3R5bGUuaGVpZ2h0ICogY29uU3R5bGUuaW50U3RyLmxlbmd0aCkudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgaW1nRGl2LmRvbS5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbidcbiAgICAgICAgZGxnLmRvbS5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoZGxnLmRvbS5zdHlsZS5oZWlnaHQpICsgaW1nRGl2U3R5bGUuaGVpZ2h0ICogKGNvblN0eWxlLmludFN0ci5sZW5ndGgtMSkpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGNvblN0eWxlKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5pbnRTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgY3JlYXRlRGxnSW50RGl2KGltZ0Rpdixjb25TdHlsZS5pbnRTdHJbaV0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ludERpdihpbWdEaXY6IENvbnRlbnQsaW50U3RyOiBzdHJpbmcpXG57XG4gICAgbGV0IGludERpdlN0eWxlID0ge1xuICAgICAgICB3aWR0aDogcGFyc2VJbnQoaW1nRGl2LmRvbS5zdHlsZS53aWR0aCksXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGludERpdiA9IG5ldyBDb250ZW50KGltZ0RpdixpbnREaXZTdHlsZSlcbiAgICBpbnREaXYuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGludERpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIGludERpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnaW5oZXJpdCdcbiAgICBjcmVhdGVEbGdJbnQoaW50RGl2LGludFN0cik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZyhpbWdEaXY6IENvbnRlbnQsc3RyOiBzdHJpbmcsY29sb3I6IHN0cmluZyl7XG4gICAgbGV0IGltZ1N0eWxlID0ge1xuICAgICAgICB3aWR0aDogNjAsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGltZyA9IG5ldyBDb250ZW50KGltZ0RpdixpbWdTdHlsZSlcbiAgICBpbWcuZG9tLmlkID0gJ2ltZydcbiAgICBpbWcuZG9tLmlubmVyVGV4dCA9IHN0clxuICAgIGltZy5kb20uc3R5bGUuZm9udFNpemUgPSAnNTRweCdcbiAgICBpbWcuZG9tLnN0eWxlLmNvbG9yID0gJ3doaXRlJ1xuICAgIGltZy5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgLy8gaW1nLmRvbS5zdHlsZS5ib3JkZXIgPSAnNXB4IHNvbGlkIHJlZCdcbiAgICBpbWcuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZzAoaW1nRGl2OiBDb250ZW50LGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy53aWR0aCA9IDYwXG4gICAgaW1nLmhlaWdodCA9IDYwXG4gICAgaW1nLnNyYyA9IGNvblN0eWxlLmltZ1xuICAgIGltZ0Rpdi5kb20uYXBwZW5kKGltZylcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW50KGltZ0RpdjogQ29udGVudCxpbnRTdHI6IHN0cmluZylcbntcbiAgICBsZXQga2V5U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGtleSA9IG5ldyBDb250ZW50KGltZ0RpdixrZXlTdHlsZSlcbiAgICBrZXkuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGtleS5kb20uc3R5bGUuZm9udFNpemUgPSAnMjBweCdcbiAgICBrZXkuZG9tLmlubmVySFRNTCA9IGludFN0ciArICc6J1xuICAgIGxldCBpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgaW50LmlkID0gaW50U3RyXG4gICAgaW50LnN0eWxlLndpZHRoID0gJzIwMHB4J1xuICAgIGludC5zdHlsZS5oZWlnaHQgPSAnNDBweCdcbiAgICBpbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXG4gICAgaW50LnN0eWxlLm1hcmdpblRvcCA9ICcxMHB4J1xuICAgIGltZ0Rpdi5kb20uYXBwZW5kKGludClcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnRmlsZShpbWdEaXY6IENvbnRlbnQsZGxnOiBEaWFsb2d1ZSl7XG4gICAgbGV0IGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgLy8gZmlsZS5kaXNhYmxlZCA9IHRydWVcbiAgICBmaWxlLnR5cGUgPSAnZmlsZSdcbiAgICBmaWxlLmlkID0gJ2ZpbGUnXG4gICAgZmlsZS5zdHlsZS53aWR0aCA9ICcxNjBweCdcbiAgICBmaWxlLnN0eWxlLmxpbmVIZWlnaHQgPSAnNjBweCdcbiAgICBpbWdEaXYuZG9tLmFwcGVuZChmaWxlKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdTZWxlY3QoaW1nRGl2OiBDb250ZW50LGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgIGxldCBzZWxlY3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH1cbiAgICBsZXQgaW5kZXggPSBmYWxzZVxuICAgIGxldCBpbmRleDAgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBpbmRleDEgPSBmYWxzZVxuICAgIGxldCBzZWxlY3RTdHIgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgU3RyID0gJyc7XG4gICAgbGV0IGNvbG9yID0gJyMzNzcxZTAnXG4gICAgbGV0IGNvbG9yMCA9ICcjZmZmZmZmJ1xuICAgIGxldCBzZWxlY3QgPSBuZXcgQ29udGVudChpbWdEaXYsc2VsZWN0U3R5bGUpXG4gICAgc2VsZWN0LmRvbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkJ1xuICAgIHNlbGVjdC5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0LmRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAnMTJweCdcbiAgICBzZWxlY3QuZG9tLnN0eWxlLnpJbmRleCA9ICcyMDIwJ1xuICAgIGxldCBzZWxlY3RUZXh0ID0gbmV3IENvbnRlbnQoc2VsZWN0LHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH0pXG4gICAgc2VsZWN0VGV4dC5kb20uaW5uZXJUZXh0ID0gJ+WxleW8gOmAieaLqSdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAxMCdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50b3AgPSAnMCdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ3RvcCAxcyBsaW5lYXInXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgIGxldCAgc2VsZWN0RGl2ID0gbmV3IENvbnRlbnQoc2VsZWN0LHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH0pXG4gICAgLy8gc2VsZWN0RGl2LmRvbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSBcIjIwMDBcIlxuICAgIC8vIHNlbGVjdERpdi5kb20uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBsaW5lYXInXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50b3AgPSAnMHB4J1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nXG4gICAgbGV0IHNlbGVjdENvbnRlbnQgPSBuZXcgQXJyYXkoKVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXSA9IG5ldyBDb250ZW50KHNlbGVjdERpdix7XG4gICAgICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKVxuICAgICAgICB9KVxuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBsaW5lYXInXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKCkgKyBcInB4XCIgXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICB9XG4gICAgbGV0IHNlbGVjdEFsbCA9IG5ldyBDb250ZW50KHNlbGVjdERpdix7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMilcbiAgICB9KVxuICAgIHNlbGVjdEFsbC5kb20uaW5uZXJUZXh0ID0gJ3NlbGVjdEFsbCdcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgc2VsZWN0QWxsLmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAxcyBsaW5lYXInXG4gICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpICsgXCJweFwiIFxuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgIGlmKCFjb25TdHlsZS5Jc011bHRpcGxlKVxuICAgIHtcbiAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciA9ICdncmV5J1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFpbmRleDBbaV0pe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbMF0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ICE9PSBpKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbdF0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W3RdLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgwW3RdID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0clswXSA9ICcnXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFpbmRleDBbaV0pXG4gICAgICAgICAgICAgICAgeyAgIFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbaV0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MFtpXSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gJydcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgxID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgwW2ldID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9ICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RBbGwuZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgIGlmKCFpbmRleDEpe1xuICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciAgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbaV0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgxID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yICA9IGNvbG9yXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZXgxID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RUZXh0LmRvbS5vbm1vdXNlZG93biA9IGUgPT57XG4gICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgIH1cbiAgICBzZWxlY3RUZXh0LmRvbS5vbm1vdXNldXAgPSBlID0+e1xuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICBpZighaW5kZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSAnMjEwMCdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2ICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAyKSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50b3AgPSAoKC0zNikgKiAoY29uU3R5bGUuc2VsU3RyLmxlbmd0aCArIDEpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50b3AgPSAoMzYgKiAoY29uU3R5bGUuc2VsU3RyLmxlbmd0aCArIDEpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjEwMSdcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9ICdDb25maXJtJ1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAnMzZweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gJzM2cHgnXG4gICAgICAgICAgICBpbmRleCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnpJbmRleCA9ICcyMDAwJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5oZWlnaHQgPSAnMzYnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnRvcCA9ICcwJ1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5oZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIlxuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gJzAnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAxMCdcbiAgICAgICAgICAgIFN0ciA9ICcnXG4gICAgICAgICAgICBjb25TdHlsZS5zZWxlZFN0ciA9IHNlbGVjdFN0clxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc2VsZWN0U3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0U3RyW2ldIT09dW5kZWZpbmVkJiZzZWxlY3RTdHJbaV0hPT0nJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN0ciArPSBzZWxlY3RTdHJbaV0gKyAnLCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTdHIgPSBTdHIuc3Vic3RyaW5nKDAsU3RyLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICBTdHIgPSBjdXRTdHJpbmcoU3RyLDIwKVxuICAgICAgICAgICAgaWYoU3RyID09PSAnJ3x8U3RyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgU3RyID0gJ+WxleW8gOmAieaLqSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9IFN0clxuICAgICAgICAgICAgaW5kZXggPSBmYWxzZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdCdG5EaXYoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgIGxldCBCdG5EaXZTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogMzVcbiAgICB9XG4gICAgbGV0IEJ0bkRpdiA9IG5ldyBDb250ZW50KGRsZy5jb25ULEJ0bkRpdlN0eWxlKVxuICAgIGxldCBjb2xvciA9ICcjMDBkODAwJ1xuICAgIGlmKGNvblN0eWxlLmludFN0ciYmIWNvblN0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgdG9wID0gKHBhcnNlSW50KHRvcCkgKyA2MCooY29uU3R5bGUuaW50U3RyLmxlbmd0aC0xKSkudG9TdHJpbmcoKSArICdweCdcbiAgICB9XG4gICAgQnRuRGl2LmRvbS5zdHlsZS50b3AgPSB0b3BcbiAgICBCdG5EaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBpZighc3RyKVxuICAgIHtcbiAgICAgICAgc3RyID0gWydPSyddXG4gICAgfVxuICAgIGlmKHN0ci5sZW5ndGggPT09IDEpXG4gICAge1xuICAgICAgICBCdG5EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcbiAgICAgICAgY3JlYXRlRGxnQnRuKEJ0bkRpdixzdHJbMF0sMTIwLGNvbG9yKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBCdG5EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWV2ZW5seSdcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnI2RjZGNkYydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZURsZ0J0bihCdG5EaXYsc3RyW2ldLDEwMCxjb2xvcilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnQnRuKEJ0bkRpdjogQ29udGVudCxzdHI6IHN0cmluZyx3aWR0aDogbnVtYmVyLGNvbG9yOiBzdHJpbmcpe1xuICAgIGxldCBidG5TdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IDM1XG4gICAgfVxuICAgIGxldCBidG4gPSBuZXcgQ29udGVudChCdG5EaXYsYnRuU3R5bGUpXG4gICAgYnRuLmRvbS5jbGFzc05hbWUgPSBcIkJ1dHRvblwiXG4gICAgYnRuLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgIGJ0bi5kb20uc3R5bGUuY29sb3IgPSAnd2hpdGUnXG4gICAgYnRuLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTRweCdcbiAgICBidG4uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzg4ODg4OCdcbiAgICBidG4uZG9tLmlubmVySFRNTCA9IHN0clxuICAgIGJ0bi5kb20uc3R5bGUuZm9udFNpemUgPSAnMjJweCdcbn1cblxuZnVuY3Rpb24gY3V0U3RyaW5nKHN0cjogc3RyaW5nLGxlbjogbnVtYmVyKTogc3RyaW5ne1xuICAgIGxldCBzXG4gICAgbGV0IHMwLHMxXG4gICAgbGV0IHNhcnIgPSBzdHIuc3BsaXQoJywnKVxuICAgIGxldCBsID0gc2Fyci5sZW5ndGhcbiAgICBpZihzdHIubGVuZ3RoIDw9IGxlbilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHJcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgXG4gICAgICAgIGlmKChzYXJyWzBdLmxlbmd0aCArIHNhcnJbMV0ubGVuZ3RoKSA+PSAobGVuLzIpLTIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHMwID0gc3RyLnN1YnN0cmluZygwLChsZW4vMikpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHMwID0gc2FyclswXSArICcsJyArIHNhcnJbMV0gKyAnLCdcbiAgICAgICAgfVxuICAgICAgICBpZigoc2FycltsLTFdLmxlbmd0aCArIHNhcnJbbC0yXS5sZW5ndGgpID49IChsZW4vMiktMilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc2FycltsLTJdLmxlbmd0aCA+PSAobGVuLzIpLTIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc2FycltsLTFdLmxlbmd0aCA+PSAobGVuLzIpLTIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzMSA9IHNhcnJbbC0xXS5zdWJzdHJpbmcoMCwobGVuLzIpLTIpICsgJy4uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzMSA9IHNhcnJbbC0xXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgczEgPSBzYXJyW2wtMl0gKyAnLCcgKyBzYXJyW2wtMV0uc3Vic3RyaW5nKDAsKGxlbi8yKS0yLXNhcnJbbC0yXS5sZW5ndGgpICsgJy4uJ1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzMSA9IHNhcnJbbC0yXSArICcsJyArIHNhcnJbbC0xXVxuICAgICAgICB9XG4gICAgICAgIC8vIHMxID0gc3RyLnN1YnN0cmluZyhzdHIubGVuZ3RoLTgsc3RyLmxlbmd0aClcbiAgICAgICAgcyA9IHMwICsgJy4uLi4nICsgJywnICsgczE7XG4gICAgICAgIHJldHVybiBzXG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiBjcmVhdGVEbGdDb25maXJtKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxJc05lZWRTdGF0dXM6IGJvb2xlYW4pe1xuLy8gICAgIGxldCBjb25maXJtRGl2U3R5bGUgPSB7XG4vLyAgICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuLy8gICAgICAgICBoZWlnaHQ6IDM1XG4vLyAgICAgfVxuLy8gICAgIGxldCBjb25maXJtRGl2ID0gbmV3IENvbnRlbnQoZGxnLmRvbSxjb25maXJtRGl2U3R5bGUpXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUudG9wID0gdG9wXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuLy8gICAgIGNvbmZpcm1EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcbi8vICAgICBsZXQgY29uZmlybVN0eWxlID0ge1xuLy8gICAgICAgICB3aWR0aDogMTIwLFxuLy8gICAgICAgICBoZWlnaHQ6IDM1XG4vLyAgICAgfVxuLy8gICAgIGxldCBjb25maXJtID0gbmV3IENvbnRlbnQoY29uZmlybURpdi5kb20sY29uZmlybVN0eWxlKVxuLy8gICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjODg4ODg4J1xuLy8gICAgIGNvbmZpcm0uZG9tLmlubmVyVGV4dCA9ICdPSydcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xuLy8gICAgIGNvbmZpcm0uZG9tLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oKXtcbi8vICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlZWVlZWUnXG4vLyAgICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICMwMDg4MDAnXG4vLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbi8vICAgICAgICAgICAgIGRsZy5yZW1vdmUoKVxuLy8gICAgICAgICAgICAgaWYoSXNOZWVkU3RhdHVzID09PSB0cnVlKVxuLy8gICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgZGxnLnN0YXR1c1ZhbHVlID0gdHJ1ZSBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxuLy8gXHRcdH0oKSlcbi8vICAgICB9XG4vLyB9XG5cbiIsImltcG9ydCAqIGFzIGV6VXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0ICogYXMgZXpSZWN0YW5nbGUgZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi9FbGVtZW50J1xuXG5cbmV4cG9ydCB7UmVjdGFuZ2xlfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuLy8gZXhwb3J0IHsgQWRqb2luUmVjdCxSZWN0Q2VudGVyIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3BvbHlnb24nXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCAqIGZyb20gJy4vVGltZS90aW1lJ1xuZXhwb3J0ICogZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzcydcbmV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG5leHBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0IHsgQXJjIH0gZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCB7IEVsbGlwc2UgfSBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCB7IFRleHQgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCB7IEltZyB9IGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZSdcbmV4cG9ydCB7IERpYWxvZ3VlIH0gZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcbi8vIGV4cG9ydCB7IG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuIFxuLy8gbGV0IEV6cHN5TGlzdCA9IG5ldyBBcnJheSgpO1xuXG5jbGFzcyBFenBzeSB7XG4gICAgaWQ6IG51bWJlclxuICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIGNTdHlsZT86IGNhbnZhc1N0eWxlXG5cbiAgICAvLyBSZWN0YW5nbGU6IFJlY3RhbmdsZVxuXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcixkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdGhpcy5jU3R5bGUgPSBjU3R5bGU7XG4gICAgICAgIHRoaXMuY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKGRvbSxjU3R5bGUpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLmN0eClcbiAgICB9XG5cbiAgICBzZXRDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xuICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xuICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHQ7XG4gICAgfVxuXG4gICAgYWRkKGVsOiBFbGVtZW50cyl7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKCdzdWNjZXNzJylcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICB9XG5cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHB1c2hFenBzeUxpc3QoZXo6IEV6cHN5KXtcbi8vICAgICBsZXQgbnVtID0gZXouaWQ7XG4vLyAgICAgRXpwc3lMaXN0W251bV0gPSBlejtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSkge1xuICAgIGxldCBleiA9IG5ldyBFenBzeShlelV0aWxzLkNvdW50KCksZG9tLGNTdHlsZSk7XG4gICAgLy8gcHVzaEV6cHN5TGlzdChleik7XG4gICAgLy8gY29uc29sZS5kaXIoRXpwc3lMaXN0KTtcbiAgICByZXR1cm4gZXo7XG59Il0sIm5hbWVzIjpbIm5hbWVJZCIsImV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZSIsImV6SnVkZ2UuanVkZ2VEaXZTdHlsZSIsImV6RGl2LmNyZWF0ZURpdiIsImV6SnVkZ2UuanVkZ2VNb2RlbCIsImV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUiLCJlekNhbnZhcy5jcmVhdGVDYW52YXMiLCJlekp1ZGdlLmp1ZGdlRWxlbWVudCIsImV6VXRpbHMuQ291bnQiXSwibWFwcGluZ3MiOiJBQUNBLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztTQUVBLEtBQUs7SUFDakIsT0FBTyxPQUFPLEVBQUUsQ0FBQztBQUNyQjs7QUNEQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7TUFFSCxLQUFLO0lBQ2QsRUFBRSxDQUFRO0lBQ1YsTUFBTSxDQUFRO0lBQ2QsU0FBUyxDQUEwQjtJQUVuQyxZQUFZLEVBQTRCO1FBRXBDLElBQUksQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO1FBQ2xCLElBQUcsRUFBRSxZQUFZLEtBQUssRUFDdEI7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtTQUNsQjthQUNHO1lBQ0EsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1NBQzNCO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFFcEIsT0FBTyxFQUFFLENBQUE7S0FDWjs7O01DckJRLFFBQVE7SUFDakIsS0FBSyxDQUFRO0lBQ2IsS0FBSyxDQUFRO0lBQ2I7S0FFQztJQUNELE1BQU07UUFDRixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUM7S0FDNUI7SUFDRCxRQUFRO1FBQ0osSUFBSSxDQUFD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QUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxFQUN2TztRQUNJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO1NBQ0c7UUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFD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QUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7SUFDeEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ1osR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBOztJQUdmLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7SUFDeEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ1osR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBOztJQUdmLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUVwQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7QUFDbkIsQ0FBQztTQUVlLFFBQVEsQ0FBQyxHQUFRLEVBQUMsU0FBa0IsRUFBQyxNQUFlOztJQUVoRSxJQUFHLE1BQU0sS0FBSyxTQUFTLElBQUksT0FBTyxNQUFN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RUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2xDO1lBQ0ksSUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDN0I7Z0JBQ0ksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNSO2lCQUNHO2dCQUNBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1o7WUFDRCxJQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2xCO2dCQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDaEU7aUJBQ0c7Z0JBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNoRTtZQUNELElBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDSSxJQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUM7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
