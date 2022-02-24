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
            content: content
        };
    }
    if (!cStyle.title) {
        cStyle.title = title;
    }
    if (!cStyle.content) {
        cStyle.content = content;
    }
    return cStyle;
}
function judgeModel(model) {
    if (model === 'error') {
        return ["X", 'red'];
    }
    else if (model === 'help') {
        return ["!", 'orange'];
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
    dStyle;
    statusValue; //按钮点击状态 true为选择是 false为选择否或取消
    constructor(domParent, dStyle) {
        [this.dom, this.dStyle] = createDiv(domParent, dStyle);
        this.statusValue = false;
        this.domParent = domParent;
        this.id = id++;
    }
    errordlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Error Dialogue', 'This is default error string!');
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "X", 'red');
    }
    helpdlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Help Dialogue', 'This is default help string!');
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "!", 'orange');
    }
    msgbox(conStyle, model) {
        conStyle = judgeContentStyle(conStyle, 'Error Dialogue', 'This is default error string!');
        let [str, color] = judgeModel(model);
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], str, color);
    }
    questdlg(conStyle, str) {
        conStyle = judgeContentStyle(conStyle, "Quset Dialogue", 'This is default error string!');
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "?", 'grey', str);
    }
    warndlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Warning Dialogue', 'This is default warning string!');
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "!", 'orange');
    }
    remove() {
        let child = this.dom.lastElementChild;
        while (child) {
            this.dom.removeChild(child);
            child = this.dom.lastElementChild;
        }
        this.dom.remove();
    }
}
class Content {
    dom;
    domParent;
    dStyle;
    constructor(domParent, dStyle) {
        this.dom = document.createElement('div');
        this.domParent = domParent;
        this.dom.style.width = dStyle.width.toString();
        this.dom.style.height = dStyle.height.toString();
        this.dom.style.position = 'absolute';
        this.dom.style.lineHeight = dStyle.height.toString() + 'px';
        this.dom.style.textAlign = 'center';
        // // let h = this.domParent.clientHeight 
        // this.dom.style.background = 'black'
        this.domParent.append(this.dom);
    }
}
function DlgInit(dom, dStyle) {
    let dlg = new Dialogue(dom, dStyle);
    return dlg;
}
function createDlg(dlg, conStyle, top, imgStr, imgColor, str) {
    dlg.dom.style.visibility = 'visible';
    createDlgTitle(dlg, conStyle, top[0]);
    createDlgContent(dlg, conStyle, top[1]);
    if (top.length === 4) {
        if (!conStyle.img) {
            createDlgImg(dlg, conStyle, top[2], imgStr, imgColor);
        }
        else {
            createDlgImg0(dlg, conStyle, top[2]);
        }
        // createDlgConfirm(dlg,conStyle,top[3],false)
        createDlgBtnDiv(dlg, conStyle, top[3], str);
    }
    else if (top.length === 3) {
        // createDlgConfirm(dlg,conStyle,top[2],false)
        createDlgBtnDiv(dlg, conStyle, top[2], str);
    }
}
function createDlgTitle(dlg, conStyle, top) {
    let titleStyle = {
        width: dlg.dStyle.width,
        height: 50
    };
    let title = new Content(dlg.dom, titleStyle);
    console.dir(title);
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
    let content = new Content(dlg.dom, contentStyle);
    content.dom.innerText = conStyle.content;
    content.dom.style.fontSize = '20px';
    content.dom.style.top = top;
}
function createDlgImg(dlg, conStyle, top, str, color) {
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    };
    let imgDiv = new Content(dlg.dom, imgDivStyle);
    imgDiv.dom.style.top = top;
    imgDiv.dom.style.display = 'flex';
    imgDiv.dom.style.justifyContent = 'center';
    let imgStyle = {
        width: 60,
        height: 60
    };
    let img = new Content(imgDiv.dom, imgStyle);
    img.dom.id = 'img';
    img.dom.innerText = str;
    img.dom.style.fontSize = '54px';
    img.dom.style.color = 'white';
    img.dom.style.background = color;
    // img.dom.style.border = '5px solid red'
    img.dom.style.borderRadius = '50%';
}
function createDlgImg0(dlg, conStyle, top, str, color) {
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    };
    let imgDiv = new Content(dlg.dom, imgDivStyle);
    imgDiv.dom.style.top = top;
    imgDiv.dom.style.display = 'flex';
    imgDiv.dom.style.justifyContent = 'center';
    let img = document.createElement('img');
    img.width = 60;
    img.height = 60;
    img.src = conStyle.img;
    imgDiv.dom.append(img);
}
function createDlgBtnDiv(dlg, conStyle, top, str) {
    let BtnDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    };
    let BtnDiv = new Content(dlg.dom, BtnDivStyle);
    BtnDiv.dom.style.top = top;
    BtnDiv.dom.style.display = 'flex';
    if (!str) {
        str = ['OK'];
    }
    if (str.length === 1) {
        BtnDiv.dom.style.justifyContent = 'center';
        createDlgBtn(dlg, BtnDiv, str[0], false, 120);
    }
    else {
        BtnDiv.dom.style.justifyContent = 'space-evenly';
        let f = false;
        for (let i = 0; i < str.length; i++) {
            if (i === 0) {
                f = true;
            }
            else {
                f = false;
            }
            createDlgBtn(dlg, BtnDiv, str[i], f, 100);
        }
    }
}
function createDlgBtn(dlg, BtnDiv, str, status, width) {
    let btnStyle = {
        width: width,
        height: 35
    };
    let btn = new Content(BtnDiv.dom, btnStyle);
    btn.dom.style.position = 'relative';
    btn.dom.style.background = 'white';
    btn.dom.style.borderRadius = '10px';
    btn.dom.style.boxShadow = '2px 2px 20px #888888';
    btn.dom.innerText = str;
    btn.dom.style.fontSize = '22px';
    btn.dom.onmousedown = function () {
        (async function () {
            dlg.statusValue = false;
            btn.dom.style.background = '#eeeeee';
            btn.dom.style.boxShadow = '2px 2px 20px #008800';
            await delay_frame(10);
            dlg.remove();
            dlg.statusValue = status;
            await delay_frame(10);
            // console.dir(dlg.statusValue)
        }());
    };
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9Hcm91cC9ncm91cC50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL0NhbnZhcy9jYW52YXMudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL0Rpdi9kaXYudHMiLCIuLi8uLi9zcmMvRGlhbG9ndWUvZGlhbG9ndWUudHMiLCIuLi8uLi9zcmMvZXpwc3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmxldCBpZFN0YXJ0ID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGlkU3RhcnQrKztcclxufSIsImltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJztcclxuaW1wb3J0IHsganVkZ2VFbGVtZW50IH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuXHJcbmxldCBncm91cElkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cHtcclxuICAgIGlkOiBudW1iZXJcclxuICAgIGxlbmd0aDogbnVtYmVyXHJcbiAgICBncm91cExpc3Q6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwKXtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGdyb3VwSWQ7XHJcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBHcm91cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91cExpc3QgPSBlbDtcclxuXHJcbiAgICAgICAgZ3JvdXBJZCsrIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcblxyXG5leHBvcnQgY2xhc3MgRWxlbWVudHN7XHJcbiAgICBzaGFwZT86IFNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbiAgICBub0ZpbGwoKXtcclxuICAgICAgICB0aGlzLnN0eWxlLmZpbGwgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICBub1N0cm9rZSgpe1xyXG4gICAgICAgIHRoaXMuc3R5bGUubGluZVdpZHRoID0gMDtcclxuICAgICAgICAvLyBpZih0aGlzLnN0eWxlLmZpbGwgIT09ICdub25lJyAmJiB0aGlzLnN0eWxlLmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKCdFcnJvciEnKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnXHJcbmltcG9ydCB7RWxlbWVudHN9IGZyb20gJy4uL0VsZW1lbnQnXHJcblxyXG5cclxuaW50ZXJmYWNlIFJlY3RhbmdsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IFJlY3RhbmdsZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmNsYXNzIENlbnRlcntcclxuICAgIHJlY3Q6IFJlY3RhbmdsZVxyXG4gICAgeDogbnVtYmVyXHJcbiAgICB5OiBudW1iZXJcclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgdGhpcy5yZWN0ID0gcmVjdDtcclxuICAgICAgICB0aGlzLnggPSByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoIC8gMjtcclxuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpemV7XHJcbiAgICByZWN0OiBSZWN0YW5nbGVcclxuICAgIHdpZHRoOiBudW1iZXJcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHJlY3Quc2hhcGUud2lkdGhcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVYWXtcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RHcm91cCBleHRlbmRzIEdyb3VwIHtcclxuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSxlbDogRWxlbWVudHNbXSl7XHJcbiAgICAgICAgc3VwZXIoZWwpXHJcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcclxuLy8gICAgIHg6IG51bWJlclxyXG4vLyAgICAgeTogbnVtYmVyXHJcbi8vICAgICB3aWR0aDogbnVtYmVyXHJcbi8vICAgICBoZWlnaHQ6IG51bWJlclxyXG4vLyB9XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJyZWN0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogUmVjdGFuZ2xlT3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgbG9naWNSZWN0IGV4dGVuZHMgUmVjdGFuZ2xle1xyXG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XHJcbiAgICByZWN0UGFyZW50czE6IFJlY3RhbmdsZTtcclxuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICB9fSlcclxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxyXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMxID0gcmVjdFBhcmVudHMxXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIGNsaXBSZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xyXG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIHVuaW9uUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcclxuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBpbnN0YW5jZW9mUmVjdGFuZ2xlKGU6IGFueSk6IGUgaXMgUmVjdGFuZ2xlU2hhcGV7XHJcbi8vICAgICByZXR1cm4gIGluIGU7XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcclxuLy8gICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XHJcbi8vICAgICBsZXQgc3QgPSByZWN0LnN0eWxlO1xyXG4vLyAgICAgbGV0IGYscztcclxuLy8gICAgIC8vIGNvbnNvbGUuZGlyKHN0LnN0cm9rZSlcclxuLy8gICAgIFtjdHgsZixzXSA9IGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xyXG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xyXG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XHJcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbi8vICAgICAgICAgY3R4LmZpbGxSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZSBpZihzdC5maWxsID09PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSAnbm9uZScpe1xyXG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcclxuLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNle1xyXG4vLyAgICAgICAgIGNvbnNvbGUuZGlyKFwiZXJyb3IhSXQgY2FuJ3QgcGFpbnQgYSByZWN0YW5nbGUgd2l0aG91dCBmaWxsU3R5bGUgYW5kIHN0cm9rZVN0eWxlXCIpXHJcbi8vICAgICB9XHJcbiAgICBcclxuLy8gICAgIHJldHVybiByZWN0O1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XHJcbiAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbiAgICBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQWRqb2luUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZml4ZWRTdHlsZT86IHN0cmluZ3xudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+efqeW9ouaLvOaOpSBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaLvOaOpeefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xyXG4gICAgbGV0IG5ld1JlY3Q7XHJcbiAgICBpZighZml4ZWRTdHlsZSlcclxuICAgIHtcclxuICAgICAgICBmaXhlZFN0eWxlID0gJ1JFQ1RMRUZUJ1xyXG4gICAgfVxyXG4gICAgbGV0IGYgPSBqdWRnZUNoYW5nZVR5cGUoZml4ZWRTdHlsZSk7XHJcbiAgICAvLyBjb25zb2xlLmRpcignZj0nK2YpO1xyXG4gICAgaWYoZiA9PT0gMSl7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfTGVmdChmaXhlZFJlY3QscmVjdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIobmV3UmVjdClcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gMil7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfVG9wKGZpeGVkUmVjdCxyZWN0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gMyl7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfUmlnaHQoZml4ZWRSZWN0LHJlY3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSA0KXtcclxuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Cb3R0b20oZml4ZWRSZWN0LHJlY3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IG9yZGVyIScpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZnVuY3Rpb24gUmVjdF9MZWZ0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggLSByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlY3RfUmlnaHQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xyXG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBSZWN0X1RvcChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XHJcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXHJcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55IC0gcmVjdC5zaGFwZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlY3RfQm90dG9tKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcclxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdENlbnRlcihyZWN0OiBSZWN0YW5nbGUpOiBDZW50ZXJ7XHJcbiAgICAvL+iOt+WPluefqeW9ouS4reW/g1xyXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIocmVjdCk7XHJcbiAgICByZXR1cm4gY2VudGVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxzaWRlMD86IG51bWJlcnxzdHJpbmcsc2lkZTE/OiBudW1iZXJ8c3RyaW5nKTogUmVjdGFuZ2xle1xyXG4gICAgLy/nn6nlvaLlr7npvZAgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXlr7npvZDnn6nlvaIgZml4ZWRTdHlsZSDlr7npvZDlvaLlvI9cclxuICAgIGlmKHNpZGUwID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNpZGUwID0gMFxyXG4gICAgICAgIHNpZGUxID0gMFxyXG4gICAgfVxyXG4gICAgaWYoc2lkZTEgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc2lkZTEgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgaWYocmVjdC5zaGFwZS53aWR0aCpyZWN0LnNoYXBlLmhlaWdodCA+IGZpeGVkUmVjdC5zaGFwZS53aWR0aCpmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhVGhlIGFyZWEgb2YgZmlleGVkUmVjdCAgaXMgc21hbGxlciB0aGFuIHRoZSByZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGxldCBbZjAsZjFdID0ganVkZ2VTaWRlKHNpZGUwLHNpZGUxKTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihmMCtcIiBcIitmMSk7XHJcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgc2hhcGU6e1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzID0gbmV3IFNpZGVYWSgpO1xyXG4gICAgICAgIGlmKGYwID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDEgfHwgZjEgPT09IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XHJcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xyXG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGYwID09PSAxIHx8IGYwID09PSAzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcclxuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcclxuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIocylcclxuICAgICAgICBcclxuICAgICAgICBuZXdSZWN0LnNoYXBlLnggPSBzLng7XHJcbiAgICAgICAgbmV3UmVjdC5zaGFwZS55ID0gcy55O1xyXG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gQWxpZ25YWShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZjogbnVtYmVyKTogU2lkZVhZe1xyXG4gICAgbGV0IHMgPSBuZXcgU2lkZVhZKClcclxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKGZpeGVkUmVjdCk7XHJcbiAgICAvLyBjb25zb2xlLmRpcihjZW50ZXIpXHJcbiAgICBpZihmID09PSAwKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gcmVjdC5zaGFwZS53aWR0aC8yXHJcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSByZWN0LnNoYXBlLmhlaWdodC8yXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDEpXHJcbiAgICB7XHJcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMlxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSAyKVxyXG4gICAge1xyXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDMpXHJcbiAgICB7XHJcbiAgICAgICAgcy54ID0gY2VudGVyLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMiAtIHJlY3Quc2hhcGUud2lkdGhcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gNClcclxuICAgIHtcclxuICAgICAgICBzLnkgPSBjZW50ZXIueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMiAtIHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgIH1cclxuICAgIHJldHVybiBzXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBPZmZzZXRSZWN0KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xyXG4gICAgLy/nn6nlvaLlubPnp7tcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXJyYW5nZVJlY3RzKG46IG51bWJlcixbeE51bWJlcix5TnVtYmVyXTogW251bWJlcixudW1iZXJdLHdpbmRvd1JlY3Q6IFJlY3RhbmdsZSxzdHlsZT86IG51bWJlcik6IFJlY3RHcm91cHtcclxuICAgIC8v5Yib5bu655+p5b2i6Zi15YiXXHJcbiAgICBsZXQgcmVjdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgXHJcbiAgICBsZXQgbnVtID0geE51bWJlciAqIHlOdW1iZXJcclxuICAgIGxldCB4ID0gd2luZG93UmVjdC5zaGFwZS54XHJcbiAgICBsZXQgeSA9IHdpbmRvd1JlY3Quc2hhcGUueVxyXG4gICAgbGV0IHdpZHRoID0gd2luZG93UmVjdC5zaGFwZS53aWR0aCAvIHhOdW1iZXJcclxuICAgIGxldCBoZWlnaHQgPSB3aW5kb3dSZWN0LnNoYXBlLmhlaWdodCAvIHlOdW1iZXJcclxuICAgIC8vIGNvbnNvbGUuZGlyKFt4LHksd2lkdGgsaGVpZ2h0XSlcclxuXHJcbiAgICBpZihuID4gbnVtKXtcclxuICAgICAgICBuID0gbnVtXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBzdHlsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3R5bGUgPiAxKVxyXG4gICAge1xyXG4gICAgICAgIHN0eWxlID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0eWxlID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpZHRoICogaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2luZG93UmVjdC5zaGFwZS53aWR0aCAtIHdpZHRoIC0gd2lkdGggKiBqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBjb25zb2xlLmRpcihyZWN0KVxyXG5cclxuICAgIGxldCByZWN0R3JvdXAgPSBuZXcgUmVjdEdyb3VwKHdpbmRvd1JlY3QscmVjdCk7XHJcbiAgICByZXR1cm4gcmVjdEdyb3VwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcclxuICAgIC8v56e75Yqo55+p5b2i6Iez5p+Q55+p5b2i5Lit5b+DIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5pON5L2c55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXHJcbiAgICBsZXQgbmV3UmVjdCA9IEFsaWduUmVjdChmaXhlZFJlY3QscmVjdCwwLDApO1xyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3RPblBvaW50KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xyXG4gICAgbGV0IG5ld1JlY3QgPSBPZmZzZXRSZWN0KHJlY3QsW3gseV0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdFdpZHRoKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIC8v6I635Y+W55+p5b2i5a695bqmXHJcbiAgICBsZXQgd2lkdGggPSByZWN0LnNoYXBlLndpZHRoXHJcbiAgICByZXR1cm4gd2lkdGhcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RIZWlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xyXG4gICAgLy/ojrflj5bnn6nlvaLpq5jluqZcclxuICAgIGxldCBoZWlnaHQgPSByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RTaXplKHJlY3Q6IFJlY3RhbmdsZSk6IFNpemV7XHJcbiAgICAvL+iOt+WPluefqeW9ouWuvemrmFxyXG4gICAgbGV0IHNpemUgPSBuZXcgU2l6ZShyZWN0KVxyXG4gICAgcmV0dXJuIHNpemU7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcclxuLy8gICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXHJcbi8vICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0MC5zaGFwZS54LHJlY3QwLnNoYXBlLnkscmVjdDAuc2hhcGUud2lkdGgscmVjdDAuc2hhcGUuaGVpZ2h0XVxyXG4vLyAgICAgbGV0IFt4MSx5MSx3MSxoMV0gPSBbcmVjdDEuc2hhcGUueCxyZWN0MS5zaGFwZS55LHJlY3QxLnNoYXBlLndpZHRoLHJlY3QxLnNoYXBlLmhlaWdodF1cclxuLy8gICAgIGxldCBSZWN0LHhuLHluLHduLGhuO1xyXG4vLyAgICAgbGV0IGFyZWEwID0gdzAgKiBoMDtcclxuLy8gICAgIGxldCBhcmVhMSA9IHcxICogaDE7XHJcbi8vICAgICBsZXQgeCx5LHcsaFxyXG4vLyAgICAgbGV0IHh0LHl0LHd0LGh0LHJlY3RcclxuLy8gICAgIGlmKGFyZWEwID49IGFyZWExKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MSx5MSx3MSxoMV07XHJcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MCx5MCx3MCxoMF07XHJcbi8vICAgICAgICAgcmVjdCA9IHJlY3QwO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZXtcclxuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDAseTAsdzAsaDBdO1xyXG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDEseTEsdzEsaDFdO1xyXG4vLyAgICAgICAgIHJlY3QgPSByZWN0MTtcclxuLy8gICAgIH1cclxuLy8gICAgIGNvbnNvbGUuZGlyKFt4LHksdyxoXSk7XHJcbi8vICAgICBjb25zb2xlLmRpcihbeHQseXQsd3QsaHRdKVxyXG4vLyAgICAgaWYoIUlzSW5SZWN0KFt4LHldLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHkraF0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4LHkraF0scmVjdCkpe1xyXG4vLyAgICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cclxuLy8gICAgIH1cclxuLy8gICAgIGVsc2V7XHJcbi8vICAgICAgICAgd24gPSBNYXRoLmFicyhNYXRoLm1pbih4MCArIHcwICx4MSArIHcxKSAtIE1hdGgubWF4KHgwLCB4MSkpXHJcbi8vICAgICAgICAgaG4gPSBNYXRoLmFicyhNYXRoLm1pbih5MCArIGgwLCB5MSArIGgxKSAtIE1hdGgubWF4KHkwLCB5MSkpXHJcbi8vICAgICAgICAgaWYoSXNJblJlY3QoW3gseV0scmVjdCkpe1xyXG4vLyAgICAgICAgICAgICB4biA9IHg7XHJcbi8vICAgICAgICAgICAgIHluID0geTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSBpZigoeCA+PSB4dCAmJiB4PD14dCt3dCkgJiYgKHkgPCB5dCB8fCB5ID4geXQraHQpKXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4O1xyXG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSBpZigoeCA8IHh0IHx8IHggPiB4dCt3dCkgJiYgKHkgPj0geXQgJiYgeSA8PSB5dCtodCkpe1xyXG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxyXG4vLyAgICAgICAgICAgICB5biA9IHlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcclxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobilcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgUmVjdCA9IFt4bix5bix3bixobl07XHJcbiAgICAgICAgXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgbGV0IG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIG5ld1JlY3Q7XHJcblxyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XHJcbiAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xyXG4gICAgbGV0IG5ld1JlY3QsUmVjdFxyXG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcclxuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XHJcbiAgICBsZXQgeCx5LHcsaFxyXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XHJcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcclxuICAgIGlmKElzSW5SZWN0KFt4bDAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4bDEseWIxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5YjFdLHJlY3QwKSlcclxuICAgIHtcclxuICAgICAgICB4ID0gTWF0aC5tYXgoeGwwLHhsMSk7XHJcbiAgICAgICAgeSA9IE1hdGgubWF4KHl0MCx5dDEpO1xyXG4gICAgICAgIHcgPSBNYXRoLm1pbih4cjAseHIxKSAtIHg7XHJcbiAgICAgICAgaCA9IE1hdGgubWluKHliMCx5YjEpIC0geTtcclxuICAgICAgICBSZWN0ID0gW3gseSx3LGhdXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cclxuICAgIH1cclxuXHJcbiAgICBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xyXG5cclxuICAgIHJldHVybiBuZXdSZWN0O1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzSW5SZWN0KFt4LHldOiBbbnVtYmVyLG51bWJlcl0scmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcclxuICAgIC8v5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXHJcbiAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0LnNoYXBlLngscmVjdC5zaGFwZS55LHJlY3Quc2hhcGUud2lkdGgscmVjdC5zaGFwZS5oZWlnaHRdXHJcbiAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHcm93UmVjdChlbDogUmVjdGFuZ2xlLyp8UmVjdEdyb3VwfEdyb3VwKi8saDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcclxuICAgIC8v5q2j5pS+6LSf57ypIFxyXG4gICAgLy8gaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXHJcbiAgICAvLyB7XHJcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgc2hhcGU6e1xyXG4gICAgICAgICAgICAgICAgeDplbC5zaGFwZS54IC0gaCxcclxuICAgICAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggKyAyKmgsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55IC0gdixcclxuICAgICAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgKyAyKnZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG5ld1JlY3RcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBSZWN0R3JvdXApXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueCAtPSBoO1xyXG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS55IC09IHY7XHJcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUuaGVpZ2h0ICs9IDIqdjtcclxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcclxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZXtcclxuICAgIC8vICAgICBjb25zb2xlLmRpcihcIuexu+Wei+mUmeivr1wiKVxyXG4gICAgLy8gfVxyXG59ICAgICAgIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluc2V0UmVjdChlbDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+ato+e8qei0n+aUvlxyXG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OmVsLnNoYXBlLnggKz0gaCxcclxuICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCAtPSAyKmgsXHJcbiAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgKz0gdixcclxuICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCAtPSAyKnZcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNjYWxlUmVjdChyZWN0OiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcclxuICAgIC8v5q+U5L6L57yp5pS+XHJcbiAgICBsZXQgaDAgPSByZWN0LnNoYXBlLndpZHRoICogKGgtMSkgLyAyXHJcbiAgICBsZXQgdjAgPSByZWN0LnNoYXBlLmhlaWdodCAqICh2LTEpIC8gMlxyXG4gICAgY29uc29sZS5kaXIoaDArJyAnK3YwKVxyXG4gICAgbGV0IG5ld1JlY3QgPSBHcm93UmVjdChyZWN0LGgwLHYwKVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzRW1wdHlSZWN0KHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XHJcbiAgICAvL+WIpOaWreefqemYteaYr+WQpuS4uuepulxyXG4gICAgbGV0IGFyZWEgPSByZWN0LnNoYXBlLndpZHRoICogcmVjdC5zaGFwZS5oZWlnaHQ7XHJcbiAgICBpZihhcmVhID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdE9mTWF0cml4KCl7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdExlZnQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xyXG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdFJpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIHJldHVybiByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWN0VG9wKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIHJldHVybiByZWN0LnNoYXBlLnlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RCb3RvbShyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XHJcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuaW9uUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiB1bmlvblJlY3R7XHJcbiAgICBsZXQgbmV3UmVjdDtcclxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XHJcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xyXG4gICAgbGV0IHgseSx3LGhcclxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xyXG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XHJcbiAgICB4ID0gTWF0aC5taW4oeGwwLHhsMSk7XHJcbiAgICB5ID0gTWF0aC5taW4oeXQwLHl0MSk7XHJcbiAgICB3ID0gTWF0aC5tYXgoeHIwLHhyMSkgLSB4O1xyXG4gICAgaCA9IE1hdGgubWF4KHliMCx5YjEpIC0geTtcclxuICAgIG5ld1JlY3QgPSBuZXcgdW5pb25SZWN0KFt4LHksdyxoXSxyZWN0MCxyZWN0MSk7XHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmlsbFJlY3QocmVjdDogUmVjdGFuZ2xlLGZpbGw/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XHJcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIGZpbGwgPSAnIzAwMCdcclxuICAgIH1cclxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcclxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVjdDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUmVjdChyZWN0OiBSZWN0YW5nbGUsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFJlY3RhbmdsZXtcclxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xyXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxyXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVjdDBcclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICByOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IENpcmNsZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IENpcmNsZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcclxuICAgIGxldCBzaCA9IGNpcmNsZS5zaGFwZVxyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcclxuICAgIGp1ZGdlU3R5bGUoY2lyY2xlLGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuICAgIHJldHVybiBjaXJjbGU7XHJcbn0gXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xyXG4gICAgbGV0IGNpcmNsZSA9IG5ldyBDaXJjbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHI6IHJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxyXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGNpcmNsZVxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIExpbmVTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgeEVuZDogbnVtYmVyLFxyXG4gICAgeUVuZDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBMaW5lT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogTGluZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcImxpbmVcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBMaW5lT3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVJZCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xyXG4vLyAgICAgbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XHJcbi8vICAgICAgICAgbGV0IGwgPSB0aGlzLm1ha2VMaW5lKGxpbmUsY3R4KTtcclxuLy8gICAgICAgICByZXR1cm4gbDtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xyXG4gICAgbGV0IHNoID0gbGluZS5zaGFwZTtcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXHJcbiAgICBjdHgubGluZVRvKHNoLnhFbmQsc2gueUVuZClcclxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICByZXR1cm4gbGluZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd0xpbmVzKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCk6IEdyb3Vwe1xyXG4gICAgLy/nu5jliLblpJrmnaHnur8gb3B0czrnur/mnaHlsZ7mgKdcclxuICAgIGxldCBncm91cCA9IG5ldyBHcm91cChlbClcclxuICAgIHJldHVybiBncm91cFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd01saW5lKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sZ2FwPzogbnVtYmVyW10sc3R5bGU/OiBib29sZWFuLHN0aXBwbGU/OiBib29sZWFuLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcclxuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyBnYXDnur/kuYvpl7TnmoTpl7TpmpQgc3R5bGU9ZmFsc2XkuLrmsLTlubPlubPooYwsPXRydWXkuLrnq5bnm7TlubPooYwgc3RpcHBsZT1mYWxzZeS4uuWunue6vyw9dHJ1ZeS4uuiZmue6v1xyXG4gICAgaWYod2lkdGhHYXAgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygd2lkdGhHYXAgIT09ICdudW1iZXInKVxyXG4gICAge1xyXG4gICAgICAgIHdpZHRoR2FwID0gMTA7XHJcbiAgICAgICAgaWYoc3RpcHBsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGlwcGxlICE9PSAnYm9vbGVhbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGlwcGxlID09PSBmYWxzZVxyXG4gICAgICAgICAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHlsZSAhPT0gJ2Jvb2xlYW4nKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihnYXAgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gWzEwMCwxMDBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBvcHRzID0gbmV3IEFycmF5KCk7XHJcbiAgICBcclxuICAgIGlmKHN0aXBwbGUgPT09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIG9wdHNbMF0gPSBuZXcgTGluZSAoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxyXG4gICAgICAgICAgICAgICAgeUVuZDogeUVuZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeStnYXBbaS0xXSppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kK2dhcFtpLTFdKmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xyXG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lICh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCtnYXBbaS0xXSppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kK2dhcFtpLTFdKmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBvcHRzWzBdID0gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdLHdpZHRoR2FwKTtcclxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4LHkrZ2FwW2ktMV0qaSx4RW5kLHlFbmQrZ2FwW2ktMV0qaV0sd2lkdGhHYXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCtnYXBbaS0xXSppLHkseEVuZCtnYXBbaS0xXSppLHlFbmRdLHdpZHRoR2FwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIGxldCBncm91cCA9IERyYXdMaW5lcyhvcHRzKTtcclxuICAgIHJldHVybiBncm91cFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSx3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XHJcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgd2lkdGhHYXDpl7TpmpQgXHJcbiAgICBsZXQgbGluZWxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyh4RW5kLXgsMikrTWF0aC5wb3coeUVuZC15LDIpKVxyXG4gICAgaWYod2lkdGhHYXA+bGluZWxlbmd0aHx8d2lkdGhHYXA9PT11bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgd2lkdGhHYXAgPSBsaW5lbGVuZ3RoLzEwO1xyXG4gICAgfVxyXG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IobGluZWxlbmd0aC93aWR0aEdhcClcclxuICAgIGxldCB4ZyA9IHdpZHRoR2FwKih4RW5kLXgpL2xpbmVsZW5ndGhcclxuICAgIGxldCB5ZyA9IHdpZHRoR2FwKih5RW5kLXkpL2xpbmVsZW5ndGhcclxuICAgIC8vIGNvbnNvbGUuZGlyKG51bSlcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBsaW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB3aGlsZShpPG51bSlcclxuICAgIHtcclxuICAgICAgICBsaW5lW2ldID0gbmV3IExpbmUoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgeDogeCt4ZyppLFxyXG4gICAgICAgICAgICAgICAgeTogeSt5ZyppLFxyXG4gICAgICAgICAgICAgICAgeEVuZDogeCt4ZyooaSsxKSxcclxuICAgICAgICAgICAgICAgIHlFbmQ6IHkreWcqKGkrMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaSs9MjtcclxuICAgIH1cclxuICAgIGxldCBMaW5lU3RpcHBsZSA9IG5ldyBHcm91cChsaW5lKVxyXG4gICAgcmV0dXJuIExpbmVTdGlwcGxlXHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBQb2x5IGV4dGVuZHMgR3JvdXB7XHJcbi8vICAgICBzdHlsZTogU3R5bGVcclxuLy8gICAgIGNvbnN0cnVjdG9yKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCxzdHlsZT86IFN0eWxlKXtcclxuLy8gICAgICAgICBzdXBlcihlbClcclxuLy8gICAgICAgICBpZihzdHlsZSlcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZXtcclxuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuLy8gICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuLy8gICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIEFyY1NoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICByOiBudW1iZXIsXHJcbiAgICBhbmdfZjogbnVtYmVyLFxyXG4gICAgYW5nX2U6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgQXJjT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogQXJjU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxufVxyXG5cclxubGV0IG5hbWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3MgQXJjIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJhcmNcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBBcmNPcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XHJcbiAgICBsZXQgc3QgPSBhcmMuc3R5bGVcclxuICAgIGlmKHN0LmZpbGwgPT09IHVuZGVmaW5lZCB8fCBzdC5maWxsID09PSAnbm9uZScgfHwgc3QuZmlsbCA9PT0gJyNmZmYnKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VGcmFtZUFyYyhhcmMsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgbWFrZUZpbGxBcmMoYXJjLGN0eCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJjO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xyXG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRmlsbEFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXHJcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxyXG4gICAgY3R4LnN0cm9rZSgpXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICAvLyBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxyXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2UpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZSkpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcclxuICAgIGN0eC5zdHJva2UoKVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLHNoLmFuZ19mLHNoLmFuZ19lKTtcclxuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XHJcbiAgICBcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVBcmMoYXJjOiBBcmMsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IEFyY3tcclxuICAgIC8v55S757KX57q/5bynIFxyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vIGp1ZGdlU3R5bGVfZXpzeShhcmMpXHJcblxyXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxyXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxyXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBhcmMwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsQXJjKGFyYzogQXJjLGZpbGw/OiBzdHJpbmcpOiBBcmN7XHJcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIGZpbGwgPSAnIzAwMCdcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcclxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXHJcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXHJcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBhcmMwXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBFbGxpcHNlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIHg/OiBudW1iZXIsXHJcbiAgICB5PzogbnVtYmVyLFxyXG4gICAgcmE/OiBudW1iZXIsXHJcbiAgICByYj86IG51bWJlclxyXG4gICAgLy9yYeS4uuaoqui9tOmVvyByYuS4uue6tei9tOmVv1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRWxsaXBzZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IEVsbGlwc2VTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJlbGxpcHNlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogRWxsaXBzZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XHJcbiAgICAvL21heOaYr+etieS6jjHpmaTku6Xplb/ovbTlgLxh5ZKMYuS4reeahOi+g+Wkp+iAhVxyXG4gICAgLy9p5q+P5qyh5b6q546v5aKe5YqgMS9tYXjvvIzooajnpLrluqbmlbDnmoTlop7liqBcclxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxyXG4gICAgbGV0IHNoID0gZWxsaXBzZS5zaGFwZVxyXG4gICAgbGV0IHN0ZXAgPSAoc2gucmEgPiBzaC5yYikgPyAxIC8gc2gucmEgOiAxIC8gc2gucmI7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHNoLnggKyBzaC5yYSwgc2gueSk7IC8v5LuO5qSt5ZyG55qE5bem56uv54K55byA5aeL57uY5Yi2XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKiBNYXRoLlBJOyBpICs9IHN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgLy/lj4LmlbDmlrnnqIvkuLp4ID0gYSAqIGNvcyhpKSwgeSA9IGIgKiBzaW4oaSnvvIxcclxuICAgICAgICAvL+WPguaVsOS4umnvvIzooajnpLrluqbmlbDvvIjlvKfluqbvvIlcclxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XHJcbiAgICB9XHJcbiAgICBqdWRnZVN0eWxlKGVsbGlwc2UsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIHJldHVybiBlbGxpcHNlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGZpbGw/OiBzdHJpbmcpOiBFbGxpcHNle1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxyXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZWxsaXBzZTBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBFbGxpcHNle1xyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcclxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXHJcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGVsbGlwc2UwXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXHJcbiAgICB4QTogbnVtYmVyW11cclxuICAgIHlBOiBudW1iZXJbXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUG9seWdvbk9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IFBvbHlnb25TaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2x5Z29uIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJwb2x5Z29uXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogUG9seWdvbk9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XHJcbiAgICBsZXQgc2ggPSBwb2x5Z29uLnNoYXBlXHJcbiAgICBsZXQgbnVtID0gMDtcclxuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIG51bSA9IE1hdGgubWluKHNoLnhBLmxlbmd0aCxzaC55QS5sZW5ndGgpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIG51bSA9IHNoLnhBLmxlbmd0aFxyXG4gICAgfVxyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcclxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcclxuICAgIH1cclxuICAgIGN0eC5saW5lVG8oc2gueEFbMF0sc2gueUFbMF0pXHJcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgcmV0dXJuIHBvbHlnb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUG9seShwb2x5Z29uOiBQb2x5Z29uLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBQb2x5Z29ue1xyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcclxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHBvbHlnb24wXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsUG9seShwb2x5Z29uOiBQb2x5Z29uLGZpbGw/OiBzdHJpbmcpOiBQb2x5Z29ue1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXHJcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcG9seWdvbjBcclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsganVkZ2VTdHlsZV90ZXh0LCBqdWRnZVRleHRTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIFRleHRTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB0ZXh0OiBzdHJpbmdcclxuICAgIG1heFdpZHRoPzogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBUZXh0T3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogVGV4dFNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcInRleHRcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBUZXh0T3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRleHQodGV4dDogVGV4dCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFRleHR7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcblxyXG4gICAganVkZ2VUZXh0U3R5bGUodGV4dCxjdHgpXHJcblxyXG4gICAganVkZ2VTdHlsZV90ZXh0KHRleHQsY3R4KVxyXG4gICAgXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2F0U3RyKHN0ckE6IHN0cmluZ1tdKTogc3RyaW5ne1xyXG4gICAgbGV0IHRleHQgPSAnJ1xyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgc3RyQS5sZW5ndGg7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRleHQgKz0gc3RyQVtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJQYWQoc3RyOiBzdHJpbmcsc3RyMDogc3RyaW5nLG51bT86IG51bWJlcik6IHN0cmluZ3tcclxuICAgIGxldCB0ZXh0ID0gJydcclxuICAgIFxyXG4gICAgaWYobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIG51bSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpPTA7aTxudW07aSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRleHQgKz0gc3RyMFxyXG4gICAgfVxyXG4gICAgdGV4dCArPSBzdHJcclxuXHJcbiAgICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyZXEoc3RyMDogc3RyaW5nLHN0cjE6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcclxuICAgIHJlc3VsdCA9IHN0cjAuaW5jbHVkZXMoc3RyMSk7XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZXBsYWNlKHN0cjogc3RyaW5nLHN0cl9vOiBzdHJpbmcsc3RyX3I6IHN0cmluZyk6c3RyaW5ne1xyXG4gICAgbGV0IHJlc3VsdCA9ICcnXHJcblxyXG4gICAgcmVzdWx0ID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJfbywnZycpLHN0cl9yKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xyXG5pbXBvcnQgeyBqdWRnZUltYWdlU2hhcGUsIGp1ZGdlU3R5bGUsanVkZ2VJbWFnZVNoYXBlX3RydWUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBJbWdTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgaW1nOiBzdHJpbmdcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB3aWR0aD86IG51bWJlclxyXG4gICAgaGVpZ2h0PzogbnVtYmVyXHJcbiAgICBzeD86IG51bWJlclxyXG4gICAgc3k/OiBudW1iZXJcclxuICAgIHN3aWR0aD86IG51bWJlclxyXG4gICAgc2hlaWdodD86IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1nT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogSW1nU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxuICAgIEltZz86IGFueVxyXG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmNsYXNzIFJHQkEge1xyXG4gICAgUjogbnVtYmVyXHJcbiAgICBHOiBudW1iZXJcclxuICAgIEI6IG51bWJlclxyXG4gICAgQTogbnVtYmVyXHJcbn1cclxuXHJcbmNsYXNzIFJHQkFfQXJyYXl7XHJcbiAgICBSR0JBX0xpc3Q6IFJHQkFbXVxyXG4gICAgd2lkdGg6IG51bWJlclxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltZyBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgSW1nPzogYW55XHJcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXHJcbiAgICBJc0NoYW5nZT86IGJvb2xlYW5cclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEltZ09wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICBpZihvcHRzLkltZyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IEkgPSBuZXcgSW1hZ2UoKVxyXG4gICAgICAgICAgICBJLnNyYyA9IG9wdHMuc2hhcGUuaW1nXHJcbiAgICAgICAgICAgIHRoaXMuSW1nID0gSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcclxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xyXG4gICAgICAgIC8vICAgICB0ZXh0dXJlOiBbXSxcclxuICAgICAgICAvLyAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihvcHRzLkltZ0RhdGEgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3dpZHRoID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN3aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc2hlaWdodCA9IHRoaXMuSW1nLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS53aWR0aCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5oZWlnaHQgPSB0aGlzLkltZy5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuSW1nRGF0YSlcclxuICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIC8vIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIG5hbWVJZCsrXHJcbiAgICB9XHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxyXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgICAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICAgICAgYy53aWR0aCA9IHNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gICAgICAgIGMuaGVpZ2h0ID0gc2NyZWVuLmF2YWlsSGVpZ2h0O1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5JbWcsc2gueCxzaC55KVxyXG4gICAgICAgIHRoaXMuSW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoc2gueCxzaC55LHRoaXMuSW1nLndpZHRoLHRoaXMuSW1nLmhlaWdodCk7XHJcbiAgICAgICAgLy8gdGhpcy5tYWtlVGV4dHVyZXMoKVxyXG4gICAgfVxyXG4gICAgdG9HcmF5KCl7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWcoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgaW1nOiB0aGlzLnNoYXBlLmltZyxcclxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2hhcGUueCxcclxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNoYXBlLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxyXG4gICAgICAgICAgICAgICAgc3k6IHRoaXMuc2hhcGUuc3ksXHJcbiAgICAgICAgICAgICAgICBzd2lkdGg6IHRoaXMuc2hhcGUuc3dpZHRoLFxyXG4gICAgICAgICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgICAgIGltZy5Jc0NoYW5nZSA9IHRydWVcclxuICAgICAgICBsZXQgZyA9IDBcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnID0gTWF0aC5mbG9vcih0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMF0gKiAwLjI5OSArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsxXSAqIDAuNTg3ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzJdICogMC4xMTQpO1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXSA9IGdcclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV0gPSBnXHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdID0gZ1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSszXSA9IHRoaXMuSW1nRGF0YS5kYXRhWzQqaSszXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG4gICAgcmVwbGFjZSgpe1xyXG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcbiAgICBtYWtlVGV4dHVyZXMoKXtcclxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0gbmV3IFRleHR1cmVzKHRoaXMpO1xyXG4gICAgICAgIGxldCBpbWcgPSB0aGlzLnRvR3JheSgpO1xyXG4gICAgICAgIGxldCBkYXRhMCA9IGltZy5JbWdEYXRhLmRhdGE7XHJcbiAgICAgICAgbGV0IGEgPSBuZXcgQXJyYXkoKVxyXG4gICAgICAgIGxldCBhcnIgPSAnJ1xyXG4gICAgICAgIGxldCBudW1BcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgbGV0IG51bUFycjA6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLkltZ0RhdGEuZGF0YVxyXG4gICAgICAgIGxldCB3ID0gdGhpcy5JbWdEYXRhLndpZHRoXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihkYXRhKVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEwLmxlbmd0aC80O2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IDM7dCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwO2sgPCAzO2srKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhMFs0KmldIDw9IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSB8fCBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoMyp0K2sgIT09IDQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIgKz0gYVszKnQra10udG9TdHJpbmcoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKChpKyh0LTEpKncray0xKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bUFycltpXSA9IHBhcnNlSW50KGFyciwyKVxyXG4gICAgICAgICAgICBhcnIgPSAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1BcnIubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdPW51bUFycltpXVxyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXT1udW1BcnJbaV1cclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl09bnVtQXJyW2ldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbWc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW1nKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogSW1ne1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBpZihpbWcuSXNDaGFuZ2UgPT09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZShpbWcsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nLGN0eCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG4gICAgcmV0dXJuIGltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1SZWFkKGltZzogSW1nKTogSW1hZ2VEYXRheyAgICAgICAgIC8v6K+75Y+W5Zu+54mH55+p6Zi1XHJcbiAgICByZXR1cm4gaW1nLkltZ0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVbnBhY2tDb2xvckltYWdlKGltZzogSW1nKTogUkdCQV9BcnJheXtcclxuICAgIGxldCByZ2JhID0gbmV3IEFycmF5KClcclxuICAgIGxldCBkYXRhID0gaW1nLkltZ0RhdGEuZGF0YVxyXG4gICAgXHJcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aC80O2krKylcclxuICAgIHtcclxuICAgICAgICByZ2JhW2ldID0gbmV3IFJHQkEoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJnYmFbaV0uUiA9IGRhdGFbNCppKzBdXHJcbiAgICAgICAgcmdiYVtpXS5HID0gZGF0YVs0KmkrMV1cclxuICAgICAgICByZ2JhW2ldLkIgPSBkYXRhWzQqaSsyXVxyXG4gICAgICAgIHJnYmFbaV0uQSA9IGRhdGFbNCppKzNdXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZ2JhX2FyciA9IG5ldyBSR0JBX0FycmF5KClcclxuICAgIHJnYmFfYXJyLlJHQkFfTGlzdCA9IHJnYmE7XHJcbiAgICByZ2JhX2Fyci53aWR0aCA9IGltZy5JbWdEYXRhLndpZHRoXHJcbiAgICByZ2JhX2Fyci5oZWlnaHQgPSBpbWcuSW1nRGF0YS5oZWlnaHRcclxuXHJcbiAgICByZXR1cm4gcmdiYV9hcnJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBhY2tDb2xvckltYWdlKHJnYmFfYXJyOiBSR0JBX0FycmF5KTogSW1hZ2VEYXRhe1xyXG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIGxldCBpbWdkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShyZ2JhX2Fyci53aWR0aCxyZ2JhX2Fyci5oZWlnaHQpO1xyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmdiYV9hcnIuUkdCQV9MaXN0Lmxlbmd0aDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSswXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5SXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsxXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5HXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsyXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5CXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSszXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5BXHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW1nZGF0YVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlSW4oaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xyXG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcclxuICAgIHtcclxuICAgICAgICBhbHBoYUluID0gMTtcclxuICAgIH1cclxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXHJcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcclxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxyXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gYWxwaGFJblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcmV0dXJuIG5ld0ltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlT3V0KGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcclxuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXHJcbiAgICB7XHJcbiAgICAgICAgYWxwaGFJbiA9IDA7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxyXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXHJcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcclxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9ICgxIC0gYWxwaGFJbilcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHJldHVybiBuZXdJbWdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEltZ0luaXQoaW1nOiBJbWdbXXxHcm91cCl7XHJcbiAgICBsZXQgSTtcclxuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcclxuICAgIHtcclxuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgSSA9IGltZ1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcclxuICAgIHtcclxuICAgICAgICBJLmdyb3VwTGlzdFtpXS5pbml0KClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFByZWxvYWRUZXh0dXJlcyhpbWc6IEltZyk6IEltZ3tcclxuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XHJcbiAgICByZXR1cm4gbmV3SW1nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZShpbWc6IEltZyk6IEltZ3tcclxuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XHJcbiAgICByZXR1cm4gbmV3SW1nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZXMoaW1nOiBJbWdbXXxHcm91cCk6IEdyb3Vwe1xyXG4gICAgbGV0IEk7XHJcbiAgICBsZXQgdGV4dHVyZTogSW1nW10gPSBbXVxyXG4gICAgbGV0IFQ7XHJcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXHJcbiAgICB7XHJcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIEkgPSBpbWdcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dHVyZVtpXSA9IERyYXdUZXh0dXJlKEkuZ3JvdXBMaXN0W2ldKVxyXG4gICAgfVxyXG4gICAgVCA9IG5ldyBHcm91cCh0ZXh0dXJlKVxyXG4gICAgcmV0dXJuIFQ7XHJcbn0iLCJpbXBvcnQge2NhbnZhc1N0eWxlfSBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xyXG5pbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXHJcbmltcG9ydCB7IFJlY3RhbmdsZSxtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnIFxyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IENpcmNsZSxtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXHJcbmltcG9ydCB7IExpbmUsIG1ha2VMaW5lfSBmcm9tICcuLi9HcmFwaGljL2xpbmUnXHJcbmltcG9ydCB7IEFyYywgbWFrZUFyYyB9IGZyb20gJy4uL0dyYXBoaWMvYXJjJ1xyXG5pbXBvcnQgeyBFbGxpcHNlLCBtYWtlRWxsaXBzZSB9IGZyb20gJy4uL0dyYXBoaWMvZWxsaXBzZSdcclxuaW1wb3J0IHsgbWFrZVBvbHlnb24sIFBvbHlnb24gfSBmcm9tICcuLi9HcmFwaGljL3BvbHlnb24nXHJcbmltcG9ydCB7IG1ha2VUZXh0LCBUZXh0IH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xyXG5pbXBvcnQgeyBJbWcsIG1ha2VJbWcgfSBmcm9tICcuLi9HcmFwaGljL2ltYWdlJ1xyXG5pbXBvcnQgeyBjb250ZW50U3R5bGUgfSBmcm9tICcuLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpOmNhbnZhc1N0eWxle1xyXG4gICAgaWYoIWNTdHlsZSkgXHJcbiAgICB7XHJcbiAgICAgICAgY1N0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKCFjU3R5bGUud2lkdGgpXHJcbiAgICB7XHJcbiAgICAgICAgY1N0eWxlLndpZHRoID0gNDAwXHJcbiAgICB9XHJcbiAgICBpZighY1N0eWxlLmhlaWdodClcclxuICAgIHtcclxuICAgICAgICBjU3R5bGUuaGVpZ2h0ID0gNDAwXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY1N0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VEaXZTdHlsZShkU3R5bGU6IERpdlN0eWxlKTogRGl2U3R5bGV7XHJcbiAgICBpZighZFN0eWxlKSBcclxuICAgIHtcclxuICAgICAgICBkU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMjYwLFxyXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZighZFN0eWxlLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIGRTdHlsZS53aWR0aCA9IDQwMFxyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5oZWlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmhlaWdodCA9IDQwMFxyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5ib3JkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmJvcmRlciA9ICdub25lJ1xyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5ib3JkZXJSYWRpdXMpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZFN0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDb250ZW50U3R5bGUoY1N0eWxlOiBjb250ZW50U3R5bGUsdGl0bGU6IHN0cmluZyxjb250ZW50OiBzdHJpbmcpOiBjb250ZW50U3R5bGV7XHJcbiAgICBpZighY1N0eWxlKVxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIWNTdHlsZS50aXRsZSlcclxuICAgIHtcclxuICAgICAgICBjU3R5bGUudGl0bGUgPSB0aXRsZVxyXG4gICAgfVxyXG4gICAgaWYoIWNTdHlsZS5jb250ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZS5jb250ZW50ID0gY29udGVudFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNTdHlsZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VNb2RlbChtb2RlbDogc3RyaW5nKTogc3RyaW5ne1xyXG4gICAgaWYobW9kZWwgPT09ICdlcnJvcicpXHJcbiAgICB7XHJcbiAgICAgICAgcmV0dXJuIFtcIlhcIiwncmVkJ11cclxuICAgIH1cclxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdoZWxwJylcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnXVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShzdHlsZTogU3R5bGUpe1xyXG4vLyAgICAgaWYoIXN0eWxlKVxyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50KGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICAvLyBjb25zb2xlLmRpcihlbClcclxuICAgIC8vIGNvbnNvbGUuZGlyKFJlY3RhbmdsZSlcclxuICAgIC8vIGNvbnNvbGUuZGlyKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxyXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIG1ha2VSZWN0YW5nbGUoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUNpcmNsZShlbCxjdHgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUxpbmUoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUFyYyhlbCxjdHgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUVsbGlwc2UoZWwsY3R4KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZVBvbHlnb24oZWwsY3R4KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZVRleHQoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBJbWcpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUltZyhlbCxjdHgpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxyXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBlbC5zdHlsZSA9IHtcclxuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXHJcbiAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBzdCA9IGVsLnN0eWxlO1xyXG4gICAgaWYoc3QubGluZVdpZHRoID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDE7XHJcbiAgICB9XHJcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYoIShzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCkpe1xyXG4gICAgLy8gICAgIC8vIHN0LnN0cm9rZSA9ICcjMDAwJztcclxuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcclxuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2V7XHJcbiAgICAvLyAgICAgICAgIHN0LnN0cm9rZSA9IFwiIzAwMFwiXHJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgIC8vICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2V7XHJcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAvLyBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xyXG4gICAgLy8gY3R4LmZpbGwoKTtcclxuICAgIC8vIGN0eC5zdHJva2UoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcclxuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZWwuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXHJcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcclxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcclxuICAgICAgICBjdHguZmlsbFRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVRleHRTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcclxuICAgIGxldCBmb250U3RyaW5nID0gJyc7XHJcbiAgICBpZihzdCA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHN0ID0ge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxyXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoc3QuZm9udFN0eWxlICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFN0eWxlICE9PSAnbm9uZScpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gJ2l0YWxpYycgJiYgc3QuZm9udFN0eWxlICE9PSAnb2JsaXF1ZScgJiYgc3QuZm9udFN0eWxlICE9PSBcIm5vcm1hbFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzAnKXtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcxJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgIH1cclxuXHJcbiAgICBpZihzdC5mb250VmFyaWFudCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnbm9uZScpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9IHN0LmZvbnRWYXJpYW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250VmFyaWFudCAhPT0gJ3NtYWxsLWNhcHMnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gJ3RydWUnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZGVyJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbGlnaHRlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3QuZm9udFNpemUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U2l6ZSAhPT0gJ25vbmUnKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRTaXplID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTaXplLmluZGV4T2YoJ3B4JykgPT09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xyXG4gICAgfVxyXG4gICAgZm9udFN0cmluZyA9IHN0LmZvbnRTdHlsZSArICcgJyArIHN0LmZvbnRWYXJpYW50ICsgJyAnICsgc3QuZm9udFdlaWdodCArICcgJyArIHN0LmZvbnRTaXplICsgJyAnICsgc3QuZm9udEZhbWlseTtcclxuICAgIGN0eC5mb250ID0gZm9udFN0cmluZztcclxuICAgIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XHJcbiAgICBsZXQgeCA9IDE7XHJcbiAgICAvLyBjb25zb2xlLmRpcihlbClcclxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcclxuICAgIHtcclxuICAgICAgICBlbCA9IGVsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVExFRlQnIHx8IGVsID09PSBcIkxFRlRcIiB8fCBlbCA9PT0gJ0wnKXtcclxuICAgICAgICAgICAgeCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUVE9QJyB8fCBlbCA9PT0gXCJUT1BcIiB8fCBlbCA9PT0gJ1QnKXtcclxuICAgICAgICAgICAgeCA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUUklHSFQnIHx8IGVsID09PSBcIlJJR0hUXCIgfHwgZWwgPT09ICdSJyl7XHJcbiAgICAgICAgICAgIHggPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVEJPVFRPTScgfHwgZWwgPT09IFwiQk9UVE9NXCIgfHwgZWwgPT09ICdCJyl7XHJcbiAgICAgICAgICAgIHggPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZWw8NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgIH1cclxuICAgIHJldHVybiB4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xyXG4gICAgbGV0IGYwID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUwKTtcclxuICAgIGxldCBmMSA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMSk7XHJcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XHJcbiAgICAgICAgaWYoZjEgPT09IDIgfHwgZjEgPT09IDQpe1xyXG4gICAgICAgICAgICBmMSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCB0ID0gZjE7XHJcbiAgICAgICAgICAgIGYxID0gZjA7XHJcbiAgICAgICAgICAgIGYwID0gdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMyl7XHJcbiAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDMpe1xyXG4gICAgICAgICAgICBmMSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtmMCxmMV1cclxufSAgIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcclxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUltYWdlU2hhcGVfdHJ1ZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcclxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJc0luRWxlbWVudChbeCx5XTogW251bWJlcixudW1iZXJdLGVsOiBFbGVtZW50cyk6IGJvb2xlYW57XHJcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XHJcbiAgICAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLndpZHRoLGVsLnNoYXBlLmhlaWdodF1cclxuICAgICAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgW3gwLHkwLHIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucl1cclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXgwLDIpICsgTWF0aC5wb3coeS15MCwyKSlcclxuICAgICAgICBpZihyIDw9IHIwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnhFbmQsZWwuc2hhcGUueUVuZF1cclxuICAgICAgICBpZih4MSAhPT0geDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgeXQgPSAoeTEteTApLyh4MS14MCkgKiAoeCAtIHgwKSArIHkwXHJcbiAgICAgICAgICAgIGlmKHkgPj0geXQtMTUgJiYgeSA8PSB5dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHh0ID0gKHgxLXgwKS8oeTEteTApICogKHkgLSB5MCkgKyB4MFxyXG4gICAgICAgICAgICBpZih5ID49IHh0LTE1ICYmIHkgPD0geHQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBbeDAseTAscmEwLHJiMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJhLGVsLnNoYXBlLnJiXVxyXG4gICAgICAgIGxldCB0ID0gTWF0aC5wb3coeC14MCwyKS9NYXRoLnBvdyhyYTAsMikgKyBNYXRoLnBvdyh5LXkwLDIpL01hdGgucG93KHJiMCwyKVxyXG4gICAgICAgIGlmKHQgPD0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIGxldCBqID0gaSArIDFcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgbGV0IHh0ID0gbmV3IEFycmF5KClcclxuICAgICAgICBsZXQgeXQgPSBuZXcgQXJyYXkoKVxyXG4gICAgICAgIGxldCBbeDAseTBdID0gW2VsLnNoYXBlLnhBLGVsLnNoYXBlLnlBXVxyXG4gICAgICAgIGZvcihpID0gMDtpPGVsLnNoYXBlLnhBLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpID09PSBlbC5zaGFwZS54QS5sZW5ndGgtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaiA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaiA9IGkgKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoeTBbaV0gIT09IHkwW2pdKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4dFtpbmRleF0gPSAoeDBbaV0teDBbal0pLyh5MFtpXS15MFtqXSkgKiAoeSAtIHkwW2ldKSArIHgwW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHl0W2luZGV4XSA9ICh5MFtqXS15MFtpXSkvKHgwW2pdLXgwW2ldKSAqICh4IC0geDBbaV0pICsgeTBbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih4ID09PSB4dFtpbmRleF0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih4dFtpbmRleF0gPj0geCl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXglMj09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgY1xyXG4gICAgLy8gICAgIGxldCBpLGpcclxuICAgIC8vICAgICBsZXQgbCA9IGVsLnNoYXBlLnlBLmxlbmd0aFxyXG4gICAgLy8gICAgIGZvcihjID0gZmFsc2UsaSA9IC0xLGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIFxyXG4gICAgLy8gICAgICAgICAoIChlbC5zaGFwZS55QVtpXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtqXSkgfHwgKGVsLnNoYXBlLnlBW2pdIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2ldKSApIFxyXG4gICAgLy8gICAgICAgICAmJiAoeCA8IChlbC5zaGFwZS54QVtqXSAtIGVsLnNoYXBlLnhBW2ldKSAqICh5IC0gZWwuc2hhcGUueUFbaV0pIC8gKGVsLnNoYXBlLnlBW2pdIC0gZWwuc2hhcGUueUFbaV0pICsgZWwuc2hhcGUueEFbaV0pIFxyXG4gICAgLy8gICAgICAgICAmJiAoYyA9ICFjKTsgXHJcbiAgICAvLyAgICAgcmV0dXJuIGM7IFxyXG4gICAgLy8gfVxyXG59IiwiaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY2FudmFzU3R5bGV7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEe1xyXG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XHJcbiAgICAvLyBsZXQgY1N0eWxlOiBjYW52YXNTdHlsZSA9IHtcclxuICAgIC8vICAgICB3aWR0aDogMTAwLFxyXG4gICAgLy8gICAgIGhlaWdodDogMTAwXHJcbiAgICAvLyB9XHJcbiAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xyXG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xyXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGRvbS5hcHBlbmQoYyk7XHJcbiAgICByZXR1cm4gY3R4O1xyXG59IiwiXHJcbmNsYXNzIHRpbWV7XHJcbiAgICBob3VyOiBudW1iZXJcclxuICAgIG1pbnV0ZXM6IG51bWJlclxyXG4gICAgc2Vjb25kczogbnVtYmVyXHJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcclxuICAgICAgICB0aGlzLm1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKVxyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpXHJcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1le1xyXG4gICAgc3RhcnRUaW1lOiB0aW1lXHJcbiAgICBpbnN0YW50VGltZTogdGltZVxyXG4gICAgdHJhbnNpZW50VGltZTogdGltZVtdXHJcbiAgICB0aW1lVmFsdWU6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IHRpbWUoKVxyXG4gICAgfVxyXG4gICAgcmVjb3JkKCl7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50VGltZSA9IG5ldyB0aW1lKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRpYygpOiBUaW1le1xyXG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXHJcbiAgICB0LnN0YXJ0KClcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVG9jKHRpbWU6IFRpbWUpOiBudW1iZXJ7XHJcbiAgICBsZXQgdCA9IDA7XHJcbiAgICBsZXQgdHMgPSBuZXcgQXJyYXkoKVxyXG4gICAgdGltZS5yZWNvcmQoKVxyXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXHJcbiAgICB0c1sxXSA9IHRpbWUuaW5zdGFudFRpbWUubWludXRlcyAtIHRpbWUuc3RhcnRUaW1lLm1pbnV0ZXNcclxuICAgIHRzWzJdID0gdGltZS5pbnN0YW50VGltZS5zZWNvbmRzIC0gdGltZS5zdGFydFRpbWUuc2Vjb25kc1xyXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xyXG4gICAgdCA9IDYwKjYwKnRzWzBdICsgNjAqdHNbMV0gKyB0c1syXSArIHRzWzNdLzEwMDBcclxuICAgIHRpbWUudGltZVZhbHVlID0gdDtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xyXG4gICAgbGV0IHQgPSBUb2ModGltZSlcclxuICAgIHJldHVybiB0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBXYWl0U2VjcyhkZWxheTogbnVtYmVyLG1lc3NhZ2U/OiBhbnkpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5X2ZyYW1lKG51bTEpe1xyXG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgKGZ1bmN0aW9uIHJhZigpe1xyXG4gICAgICAgICAgICB0aW1lX251bSsrO1xyXG4gICAgICAgICAgICBsZXQgaWQgPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcclxuICAgICAgICBpZiggdGltZV9udW09PW51bTEpe1xyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xyXG4gICAgICAgICAgICByZXNvbHZlKDApO1xyXG4gICAgICAgIH1cclxuICAgIH0oKSlcclxufSl9OyIsImltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSBcIi4uL0VsZW1lbnRcIjtcclxuaW1wb3J0IHsganVkZ2VJc0luRWxlbWVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEtiV2FpdChrZXk6IG51bWJlcixGdW5jOiBGdW5jdGlvbil7XHJcbiAgICBkb2N1bWVudC5vbmtleWRvd249ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcclxuICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KXtcclxuICAgICAgICAgICAgRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEtiTmFtZShrZXk6IHN0cmluZ3xudW1iZXIpOm51bWJlcntcclxuICAgIGxldCByZXM7XHJcblxyXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgcmVzID0ga2V5LmNoYXJDb2RlQXQoMClcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgcmVzID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmRpcihyZXMpIFxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gS2JQcmVzc1dhaXQoa2V5OiBudW1iZXIsRnVuYzogRnVuY3Rpb24pe1xyXG4gICAgZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XHJcbiAgICAgICAgICAgIEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBLYlJlbGVhc2VXYWl0KGtleTogbnVtYmVyLEZ1bmM6IEZ1bmN0aW9uKXtcclxuICAgIGRvY3VtZW50Lm9ua2V5dXA9ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcclxuICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KXtcclxuICAgICAgICAgICAgRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyxGdW5jOiBGdW5jdGlvbil7XHJcbiAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBsZXQgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgbGV0IHgseVxyXG4gICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSBlLnBhZ2VYXHJcbiAgICAgICAgICAgIHkgPSBlLnBhZ2VZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZGlyKHgpXHJcbiAgICAgICAgY29uc29sZS5kaXIoeSlcclxuICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZilcclxuICAgICAgICBpZihmID09PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnVuYygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaXZTdHlsZXtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgYm9yZGVyPzogc3RyaW5nO1xyXG4gICAgYm9yZGVyUmFkaXVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KGRvbTogSFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSk6IFtIVE1MRWxlbWVudCxEaXZTdHlsZV17XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGRTdHlsZSA9IGV6SnVkZ2UuanVkZ2VEaXZTdHlsZShkU3R5bGUpO1xyXG4gICAgZGl2LnN0eWxlLndpZHRoID0gZFN0eWxlLndpZHRoLnRvU3RyaW5nKClcclxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcclxuICAgIGRpdi5zdHlsZS5ib3JkZXIgPSBkU3R5bGUuYm9yZGVyXHJcbiAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xyXG4gICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG4gICAgZGl2LnN0eWxlLmJveFNoYWRvdyA9ICcyMHB4IDEwcHggNDBweCAjODg4ODg4J1xyXG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgZGl2LnN0eWxlLnpJbmRleCA9ICcxMDAwJ1xyXG4gICAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnXHJcbiAgICAvLyBkaXYuc3R5bGUudG9wID0gJzBweCdcclxuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICAvLyBjb25zb2xlLmRpcih3KVxyXG4gICAgZGl2LnN0eWxlLnRvcCA9ICgoaC1kU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xyXG4gICAgZGl2LnN0eWxlLmxlZnQgPSAoKHctZFN0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xyXG4gICAgZG9tLmFwcGVuZChkaXYpO1xyXG4gICAgcmV0dXJuIFtkaXYsZFN0eWxlXVxyXG59IiwiaW1wb3J0IHsgRGl2U3R5bGUgfSBmcm9tICcuLi9EaXYvZGl2J1xyXG5pbXBvcnQgKiBhcyBlekRpdiBmcm9tICcuLi9EaXYvZGl2J1xyXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5pbXBvcnQgeyBkZWxheV9mcmFtZSB9IGZyb20gJy4uL1RpbWUvdGltZSdcclxuXHJcbmxldCBpZCA9IDBcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2d1ZXtcclxuICAgIGlkOiBudW1iZXJcclxuICAgIGRvbTogSFRNTEVsZW1lbnRcclxuICAgIGRvbVBhcmVudDogSFRNTEVsZW1lbnRcclxuICAgIGRTdHlsZT86IERpdlN0eWxlXHJcbiAgICBzdGF0dXNWYWx1ZTogYm9vbGVhbiAgICAvL+aMiemSrueCueWHu+eKtuaAgSB0cnVl5Li66YCJ5oup5pivIGZhbHNl5Li66YCJ5oup5ZCm5oiW5Y+W5raIXHJcbiAgICBjb25zdHJ1Y3Rvcihkb21QYXJlbnQ6IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKXtcclxuICAgICAgICBbdGhpcy5kb20sdGhpcy5kU3R5bGVdID0gZXpEaXYuY3JlYXRlRGl2KGRvbVBhcmVudCxkU3R5bGUpXHJcbiAgICAgICAgdGhpcy5zdGF0dXNWYWx1ZSA9IGZhbHNlXHJcbiAgICAgICAgdGhpcy5kb21QYXJlbnQgPSBkb21QYXJlbnRcclxuICAgICAgICB0aGlzLmlkID0gaWQrK1xyXG4gICAgfVxyXG4gICAgZXJyb3JkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUpe1xyXG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXHJcbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXSxcIlhcIiwncmVkJyk7XHJcbiAgICB9XHJcbiAgICBoZWxwZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcclxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJylcclxuICAgICAgICBjcmVhdGVEbGcodGhpcyxjb25TdHlsZSxbJzIwcHgnLCc3MHB4JywnMTMwcHgnLCcyMTBweCddLFwiIVwiLCdvcmFuZ2UnKTtcclxuICAgIH1cclxuICAgIG1zZ2JveChjb25TdHlsZT86IGNvbnRlbnRTdHlsZSxtb2RlbD86IHN0cmluZyl7XHJcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcclxuICAgICAgICBsZXQgW3N0cixjb2xvcl0gPSBlekp1ZGdlLmp1ZGdlTW9kZWwobW9kZWwpXHJcbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXSxzdHIsY29sb3IpO1xyXG4gICAgfVxyXG4gICAgcXVlc3RkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUsc3RyPzogQXJyYXk8c3RyaW5nPil7XHJcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLFwiUXVzZXQgRGlhbG9ndWVcIiwnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnKVxyXG4gICAgICAgIGNyZWF0ZURsZyh0aGlzLGNvblN0eWxlLFsnMjBweCcsJzcwcHgnLCcxMzBweCcsJzIxMHB4J10sXCI/XCIsJ2dyZXknLHN0cik7XHJcbiAgICB9XHJcbiAgICB3YXJuZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcclxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ1dhcm5pbmcgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgd2FybmluZyBzdHJpbmchJylcclxuICAgICAgICBjcmVhdGVEbGcodGhpcyxjb25TdHlsZSxbJzIwcHgnLCc3MHB4JywnMTMwcHgnLCcyMTBweCddLFwiIVwiLCdvcmFuZ2UnKTtcclxuICAgIH1cclxuICAgIHJlbW92ZSgpe1xyXG4gICAgICAgIGxldCBjaGlsZCA9IHRoaXMuZG9tLmxhc3RFbGVtZW50Q2hpbGRcclxuICAgICAgICB3aGlsZShjaGlsZCl7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tLnJlbW92ZUNoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICBjaGlsZCA9IHRoaXMuZG9tLmxhc3RFbGVtZW50Q2hpbGRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kb20ucmVtb3ZlKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBjb250ZW50U3R5bGV7XHJcbiAgICB0aXRsZT86IHN0cmluZ1xyXG4gICAgY29udGVudD86IHN0cmluZyAgXHJcbiAgICBpbWc/OiBzdHJpbmdcclxufVxyXG5cclxuY2xhc3MgQ29udGVudHtcclxuICAgIGRvbTogSFRNTEVsZW1lbnRcclxuICAgIGRvbVBhcmVudDogSFRNTEVsZW1lbnRcclxuICAgIGRTdHlsZTogRGl2U3R5bGVcclxuICAgIGNvbnN0cnVjdG9yKGRvbVBhcmVudDogSFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSl7XHJcbiAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHRoaXMuZG9tUGFyZW50ID0gZG9tUGFyZW50XHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKVxyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcidcclxuICAgICAgICAvLyAvLyBsZXQgaCA9IHRoaXMuZG9tUGFyZW50LmNsaWVudEhlaWdodCBcclxuICAgICAgICAvLyB0aGlzLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJ1xyXG4gICAgICAgIHRoaXMuZG9tUGFyZW50LmFwcGVuZCh0aGlzLmRvbSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERsZ0luaXQoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU/OiBEaXZTdHlsZSkge1xyXG4gICAgbGV0IGRsZyA9IG5ldyBEaWFsb2d1ZShkb20sZFN0eWxlKTtcclxuICAgIHJldHVybiBkbGc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZyhkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBBcnJheTxzdHJpbmc+LGltZ1N0cj86IHN0cmluZyxpbWdDb2xvcj86IHN0cmluZyxzdHI/OiBBcnJheTxzdHJpbmc+KXtcclxuICAgIGRsZy5kb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xyXG4gICAgY3JlYXRlRGxnVGl0bGUoZGxnLGNvblN0eWxlLHRvcFswXSlcclxuICAgIGNyZWF0ZURsZ0NvbnRlbnQoZGxnLGNvblN0eWxlLHRvcFsxXSlcclxuICAgIGlmKHRvcC5sZW5ndGggPT09IDQpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoIWNvblN0eWxlLmltZylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGNyZWF0ZURsZ0ltZyhkbGcsY29uU3R5bGUsdG9wWzJdLGltZ1N0cixpbWdDb2xvcilcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY3JlYXRlRGxnSW1nMChkbGcsY29uU3R5bGUsdG9wWzJdLGltZ1N0cixpbWdDb2xvcilcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY3JlYXRlRGxnQ29uZmlybShkbGcsY29uU3R5bGUsdG9wWzNdLGZhbHNlKVxyXG4gICAgICAgIGNyZWF0ZURsZ0J0bkRpdihkbGcsY29uU3R5bGUsdG9wWzNdLHN0cilcclxuICAgIH1cclxuICAgIGVsc2UgaWYodG9wLmxlbmd0aCA9PT0gMylcclxuICAgIHtcclxuICAgICAgICAvLyBjcmVhdGVEbGdDb25maXJtKGRsZyxjb25TdHlsZSx0b3BbMl0sZmFsc2UpXHJcbiAgICAgICAgY3JlYXRlRGxnQnRuRGl2KGRsZyxjb25TdHlsZSx0b3BbMl0sc3RyKVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZ1RpdGxlKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XHJcbiAgICBsZXQgdGl0bGVTdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IDUwXHJcbiAgICB9XHJcbiAgICBsZXQgdGl0bGUgPSBuZXcgQ29udGVudChkbGcuZG9tLHRpdGxlU3R5bGUpXHJcbiAgICBjb25zb2xlLmRpcih0aXRsZSlcclxuICAgIHRpdGxlLmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS50aXRsZVxyXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRTaXplID0gJzI2cHgnXHJcbiAgICB0aXRsZS5kb20uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJ1xyXG4gICAgdGl0bGUuZG9tLnN0eWxlLnRvcCA9IHRvcFxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEbGdDb250ZW50KGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XHJcbiAgICBsZXQgY29udGVudFN0eWxlID0ge1xyXG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogNTBcclxuICAgIH1cclxuICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoZGxnLmRvbSxjb250ZW50U3R5bGUpXHJcbiAgICBjb250ZW50LmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS5jb250ZW50XHJcbiAgICBjb250ZW50LmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4J1xyXG4gICAgY29udGVudC5kb20uc3R5bGUudG9wID0gdG9wXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZyhkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcsc3RyOiBzdHJpbmcsY29sb3I6IHN0cmluZyl7XHJcbiAgICBsZXQgaW1nRGl2U3R5bGUgPSB7XHJcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiA2MFxyXG4gICAgfVxyXG4gICAgbGV0IGltZ0RpdiA9IG5ldyBDb250ZW50KGRsZy5kb20saW1nRGl2U3R5bGUpXHJcbiAgICBpbWdEaXYuZG9tLnN0eWxlLnRvcCA9IHRvcFxyXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICBpbWdEaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcclxuICAgIGxldCBpbWdTdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogNjAsXHJcbiAgICAgICAgaGVpZ2h0OiA2MFxyXG4gICAgfVxyXG4gICAgbGV0IGltZyA9IG5ldyBDb250ZW50KGltZ0Rpdi5kb20saW1nU3R5bGUpXHJcbiAgICBpbWcuZG9tLmlkID0gJ2ltZydcclxuICAgIGltZy5kb20uaW5uZXJUZXh0ID0gc3RyXHJcbiAgICBpbWcuZG9tLnN0eWxlLmZvbnRTaXplID0gJzU0cHgnXHJcbiAgICBpbWcuZG9tLnN0eWxlLmNvbG9yID0gJ3doaXRlJ1xyXG4gICAgaW1nLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcclxuICAgIC8vIGltZy5kb20uc3R5bGUuYm9yZGVyID0gJzVweCBzb2xpZCByZWQnXHJcbiAgICBpbWcuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZzAoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLHN0cjogc3RyaW5nLGNvbG9yOiBzdHJpbmcpe1xyXG4gICAgbGV0IGltZ0RpdlN0eWxlID0ge1xyXG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogNjBcclxuICAgIH1cclxuICAgIGxldCBpbWdEaXYgPSBuZXcgQ29udGVudChkbGcuZG9tLGltZ0RpdlN0eWxlKVxyXG4gICAgaW1nRGl2LmRvbS5zdHlsZS50b3AgPSB0b3BcclxuICAgIGltZ0Rpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXHJcbiAgICBsZXQgaW1nU3R5bGUgPSB7XHJcbiAgICAgICAgd2lkdGg6IDYwLFxyXG4gICAgICAgIGhlaWdodDogNjBcclxuICAgIH1cclxuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxyXG4gICAgaW1nLndpZHRoID0gNjBcclxuICAgIGltZy5oZWlnaHQgPSA2MFxyXG4gICAgaW1nLnNyYyA9IGNvblN0eWxlLmltZ1xyXG4gICAgaW1nRGl2LmRvbS5hcHBlbmQoaW1nKVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVEbGdCdG5EaXYoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLHN0cj86IEFycmF5PHN0cmluZz4pe1xyXG4gICAgbGV0IEJ0bkRpdlN0eWxlID0ge1xyXG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxyXG4gICAgICAgIGhlaWdodDogMzVcclxuICAgIH1cclxuICAgIGxldCBCdG5EaXYgPSBuZXcgQ29udGVudChkbGcuZG9tLEJ0bkRpdlN0eWxlKVxyXG4gICAgQnRuRGl2LmRvbS5zdHlsZS50b3AgPSB0b3BcclxuICAgIEJ0bkRpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xyXG4gICAgaWYoIXN0cilcclxuICAgIHtcclxuICAgICAgICBzdHIgPSBbJ09LJ11cclxuICAgIH1cclxuICAgIGlmKHN0ci5sZW5ndGggPT09IDEpXHJcbiAgICB7XHJcbiAgICAgICAgQnRuRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXHJcbiAgICAgICAgY3JlYXRlRGxnQnRuKGRsZyxCdG5EaXYsc3RyWzBdLGZhbHNlLDEyMClcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgQnRuRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZS1ldmVubHknXHJcbiAgICAgICAgbGV0IGYgPSBmYWxzZVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ci5sZW5ndGg7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoaSA9PT0gMClcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZiA9IHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgZiA9IGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY3JlYXRlRGxnQnRuKGRsZyxCdG5EaXYsc3RyW2ldLGYsMTAwKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGxnQnRuKGRsZzogRGlhbG9ndWUsQnRuRGl2OiBDb250ZW50LHN0cjogc3RyaW5nLHN0YXR1czogYm9vbGVhbix3aWR0aDogbnVtYmVyKXtcclxuICAgIGxldCBidG5TdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiAzNVxyXG4gICAgfVxyXG4gICAgbGV0IGJ0biA9IG5ldyBDb250ZW50KEJ0bkRpdi5kb20sYnRuU3R5bGUpXHJcbiAgICBidG4uZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xyXG4gICAgYnRuLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xyXG4gICAgYnRuLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCdcclxuICAgIGJ0bi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjODg4ODg4J1xyXG4gICAgYnRuLmRvbS5pbm5lclRleHQgPSBzdHJcclxuICAgIGJ0bi5kb20uc3R5bGUuZm9udFNpemUgPSAnMjJweCdcclxuICAgIGJ0bi5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBkbGcuc3RhdHVzVmFsdWUgPSBmYWxzZVxyXG4gICAgICAgICAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnI2VlZWVlZSdcclxuICAgICAgICAgICAgYnRuLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICMwMDg4MDAnXHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxyXG4gICAgICAgICAgICBkbGcucmVtb3ZlKClcclxuICAgICAgICAgICAgZGxnLnN0YXR1c1ZhbHVlID0gc3RhdHVzIFxyXG4gICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcclxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoZGxnLnN0YXR1c1ZhbHVlKVxyXG5cdFx0fSgpKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBjcmVhdGVEbGdDb25maXJtKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxJc05lZWRTdGF0dXM6IGJvb2xlYW4pe1xyXG4vLyAgICAgbGV0IGNvbmZpcm1EaXZTdHlsZSA9IHtcclxuLy8gICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcclxuLy8gICAgICAgICBoZWlnaHQ6IDM1XHJcbi8vICAgICB9XHJcbi8vICAgICBsZXQgY29uZmlybURpdiA9IG5ldyBDb250ZW50KGRsZy5kb20sY29uZmlybURpdlN0eWxlKVxyXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUudG9wID0gdG9wXHJcbi8vICAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbi8vICAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXHJcbi8vICAgICBsZXQgY29uZmlybVN0eWxlID0ge1xyXG4vLyAgICAgICAgIHdpZHRoOiAxMjAsXHJcbi8vICAgICAgICAgaGVpZ2h0OiAzNVxyXG4vLyAgICAgfVxyXG4vLyAgICAgbGV0IGNvbmZpcm0gPSBuZXcgQ29udGVudChjb25maXJtRGl2LmRvbSxjb25maXJtU3R5bGUpXHJcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xyXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXHJcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXHJcbi8vICAgICBjb25maXJtLmRvbS5pbm5lclRleHQgPSAnT0snXHJcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xyXG4vLyAgICAgY29uZmlybS5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xyXG4vLyAgICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xyXG4vLyAgICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlZWVlZWUnXHJcbi8vICAgICAgICAgICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzAwODgwMCdcclxuLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXHJcbi8vICAgICAgICAgICAgIGRsZy5yZW1vdmUoKVxyXG4vLyAgICAgICAgICAgICBpZihJc05lZWRTdGF0dXMgPT09IHRydWUpXHJcbi8vICAgICAgICAgICAgIHtcclxuLy8gICAgICAgICAgICAgICAgZGxnLnN0YXR1c1ZhbHVlID0gdHJ1ZSBcclxuLy8gICAgICAgICAgICAgfVxyXG4vLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcclxuLy8gXHRcdH0oKSlcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuIiwiaW1wb3J0ICogYXMgZXpVdGlscyBmcm9tICcuL3V0aWxzJ1xyXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuL0NhbnZhcy9jYW52YXMnXHJcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xyXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCAqIGFzIGV6UmVjdGFuZ2xlIGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4vRWxlbWVudCdcclxuXHJcblxyXG5leHBvcnQge1JlY3RhbmdsZX0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuLy8gZXhwb3J0IHsgQWRqb2luUmVjdCxSZWN0Q2VudGVyIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2xpbmUnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9hcmMnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3RleHQnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcclxuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWUnXHJcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MnXHJcbmV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXHJcbmV4cG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9Hcm91cC9ncm91cCdcclxuZXhwb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcclxuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xyXG5leHBvcnQgeyBBcmMgfSBmcm9tICcuL0dyYXBoaWMvYXJjJ1xyXG5leHBvcnQgeyBFbGxpcHNlIH0gZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXHJcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcclxuZXhwb3J0IHsgVGV4dCB9IGZyb20gJy4vR3JhcGhpYy90ZXh0J1xyXG5leHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXHJcbmV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZSdcclxuZXhwb3J0IHsgRGlhbG9ndWUgfSBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xyXG4vLyBleHBvcnQgeyBtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuIFxyXG4vLyBsZXQgRXpwc3lMaXN0ID0gbmV3IEFycmF5KCk7XHJcblxyXG5jbGFzcyBFenBzeSB7XHJcbiAgICBpZDogbnVtYmVyXHJcbiAgICBkb206IEhUTUxFbGVtZW50XHJcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxyXG4gICAgY1N0eWxlPzogY2FudmFzU3R5bGVcclxuXHJcbiAgICAvLyBSZWN0YW5nbGU6IFJlY3RhbmdsZVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSl7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuZG9tID0gZG9tO1xyXG4gICAgICAgIHRoaXMuY1N0eWxlID0gY1N0eWxlO1xyXG4gICAgICAgIHRoaXMuY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKGRvbSxjU3R5bGUpO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuY3R4KVxyXG4gICAgfVxyXG5cclxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xyXG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xyXG4gICAgICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xyXG4gICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XHJcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIGFkZChlbDogRWxlbWVudHMpe1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKCdzdWNjZXNzJylcclxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcclxuICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24gcHVzaEV6cHN5TGlzdChlejogRXpwc3kpe1xyXG4vLyAgICAgbGV0IG51bSA9IGV6LmlkO1xyXG4vLyAgICAgRXpwc3lMaXN0W251bV0gPSBlejtcclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSkge1xyXG4gICAgbGV0IGV6ID0gbmV3IEV6cHN5KGV6VXRpbHMuQ291bnQoKSxkb20sY1N0eWxlKTtcclxuICAgIC8vIHB1c2hFenBzeUxpc3QoZXopO1xyXG4gICAgLy8gY29uc29sZS5kaXIoRXpwc3lMaXN0KTtcclxuICAgIHJldHVybiBlejtcclxufSJdLCJuYW1lcyI6WyJuYW1lSWQiLCJlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUiLCJlekp1ZGdlLmp1ZGdlRGl2U3R5bGUiLCJlekRpdi5jcmVhdGVEaXYiLCJlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlIiwiZXpKdWRnZS5qdWRnZU1vZGVsIiwiZXpDYW52YXMuY3JlYXRlQ2FudmFzIiwiZXpKdWRnZS5qdWRnZUVsZW1lbnQiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O0FDREEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BRUgsS0FBSztJQUNkLEVBQUUsQ0FBUTtJQUNWLE1BQU0sQ0FBUTtJQUNkLFNBQVMsQ0FBMEI7SUFFbkMsWUFBWSxFQUE0QjtRQUVwQyxJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNsQixJQUFHLEVBQUUsWUFBWSxLQUFLLEVBQ3RCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDbEI7YUFDRztZQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLE9BQU8sRUFBRSxDQUFBO0tBQ1o7OztNQ3JCUSxRQUFRO0lBQ2pCLEtBQUssQ0FBUTtJQUNiLEtBQUssQ0FBUTtJQUNiO0tB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RyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLElBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsRUFDdk87UUFDSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENB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RUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7U0FFZSxRQUFRLENBQUMsR0FBUSxFQUFDLFNBQWtCLEVBQUMsTUFBZTs7SUFFaEUsSUFBRyxNQUFNLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFDckQ7UUFDSSxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ2YsSUFBRyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFDM0Q7WUFDSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7O0lBS0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDZixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDekI7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNqQjtLQUNKLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLE9BQU8sQ0FBQyxHQUFRLEVBQUMsSUFBYTtJQUMxQyxJQUFHLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUNqRDtRQUNJLElBQUksR0FBRyxNQUFNLENBQUE7S0FDaEI7SUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNmLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSztTQUN6QjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJO1NBQ2I7S0FDSixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksQ0FBQTtBQUNmOztBQzFIQSxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO01BRUYsT0FBUSxTQUFRLFFBQVE7SUFDekIsSUFBSSxHQUFlO1FBQ3ZCLElBQUksRUFBRSxTQUFTLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDbkMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQWlCO1FBQ3pCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDOztRQUV4QixJQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2I7WUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7YUFDRztZQUNBLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLE1BQU07Z0JBQ2QsU0FBUyxFQUFFLENBQUM7YUFDZixDQUFBO1NBQ0o7UUFFREEsUUFBTSxFQUFFLENBQUE7S0FDWDtDQUNKO1NBRWUsV0FBVyxDQUFDLE9BQWdCLEVBQUMsR0FBNkI7Ozs7SUFJdEUsSUFBSSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQTtJQUN0QixJQUFJLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztJQUNuRCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9CLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksSUFBSSxFQUMxQzs7O1FBR0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3RFO0lBQ0QsVUFBVSxDQUFDLE9BQU8sRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN4QixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEIsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFFBQVEsQ0FBQyxPQUFnQixFQUFDLElBQWE7SUFDbkQsSUFBRyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFDakQ7UUFDSSxJQUFJLEdBQUcsTUFBTSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUM7UUFDdkIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN2QjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJO1NBQ2I7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLFFBQVEsQ0FBQTtBQUNuQixDQUFDO1NBRWUsU0FBUyxDQUFDLE9BQWdCLEVBQUMsU0FBa0IsRUFBQyxNQUFlO0lBQ3pFLElBQUcsTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQ3JEO1FBQ0ksTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNmLElBQUcsU0FBUyxLQUFLLFNBQVMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQzNEO1lBQ0ksU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUM7UUFDdkIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNsQixDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN2QjtRQUNELEtBQUssRUFBRTtZQUNILFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE1BQU0sRUFBRSxNQUFNO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxRQUFRLENBQUE7QUFDbkI7O0FDekZBLElBQUlBLFFBQU0sR0FBRyxDQUFDLENBQUM7TUFFRixPQUFRLFNBQVEsUUFBUTtJQUN6QixJQUFJLEdBQWU7UUFDdkIsSUFBSSxFQUFFLFNBQVMsR0FBR0EsUUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNuQyxTQUFTLEVBQUVBLFFBQU07S0FDcEIsQ0FBQTtJQUNELFlBQVksSUFBaUI7UUFDekIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRXhCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0NBQ0o7U0FFZSxXQUFXLENBQUMsT0FBZ0IsRUFBQyxHQUE2QjtJQUN0RSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO0lBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQ2hDO1FBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUM1QztTQUNHO1FBQ0EsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFBO0tBQ3JCO0lBRUQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM3QixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxFQUFDLENBQUMsRUFBRSxFQUN6QjtRQUNJLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDaEM7SUFDRCxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdCLFVBQVUsQ0FBQyxPQUFPLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBRWYsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxPQUFnQixFQUFDLFNBQWtCLEVBQUMsTUFBZTtJQUN6RSxJQUFHLE1BQU0sS0FBSyxTQUFTLElBQUksT0FBTyxNQUFNLEtBQUssUUFBUSxFQUNyRDtRQUNJLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDZixJQUFHLFNBQVMsS0FBSyxTQUFTLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUMzRDtZQUNJLFNBQVMsR0FBRyxDQUFDLENBQUM7U0FDakI7S0FDSjtJQUNELElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDO1FBQ3ZCLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN2QjtRQUNELEtBQUssRUFBRTtZQUNILFNBQVMsRUFBRSxTQUFTO1lBQ3BCLE1BQU0sRUFBRSxNQUFNO1NBQ2pCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxRQUFRLENBQUE7QUFDbkIsQ0FBQztTQUVlLFFBQVEsQ0FBQyxPQUFnQixFQUFDLElBQWE7SUFDbkQsSUFBRyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFDakQ7UUFDSSxJQUFJLEdBQUcsTUFBTSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxRQUFRLEdBQUcsSUFBSSxPQUFPLENBQUM7UUFDdkIsS0FBSyxFQUFFO1lBQ0gsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1NBQ3ZCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLElBQUk7U0FDYjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sUUFBUSxDQUFBO0FBQ25COztBQ3RGQSxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO01BRUYsSUFBSyxTQUFRLFFBQVE7SUFDdEIsSUFBSSxHQUFlO1FBQ3ZCLElBQUksRUFBRSxNQUFNLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQWM7UUFDdEIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7O1FBRXhCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxRQUFRLEVBQUUsTUFBTTtnQkFDaEIsV0FBVyxFQUFFLFFBQVE7Z0JBQ3JCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixTQUFTLEVBQUUsUUFBUTthQUN0QixDQUFBO1NBQ0o7UUFFREEsUUFBTSxFQUFFLENBQUE7S0FDWDtDQUNKO1NBRWUsUUFBUSxDQUFDLElBQVUsRUFBQyxHQUE2QjtJQUU3RCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFFZixjQUFjLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXhCLGVBQWUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFFekIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBRWYsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO1NBRWUsTUFBTSxDQUFDLElBQWM7SUFDakMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2pDO1FBQ0ksSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNuQjtJQUNELE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLE1BQU0sQ0FBQyxHQUFXLEVBQUMsSUFBWSxFQUFDLEdBQVk7SUFDeEQsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBRWIsSUFBRyxHQUFHLEtBQUssU0FBUyxJQUFJLEdBQUcsS0FBSyxDQUFDLEVBQ2pDO1FBQ0ksR0FBRyxHQUFHLENBQUMsQ0FBQztLQUNYO0lBRUQsS0FBSSxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFDckI7UUFDSSxJQUFJLElBQUksSUFBSSxDQUFBO0tBQ2Y7SUFDRCxJQUFJLElBQUksR0FBRyxDQUFBO0lBRVgsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO1NBRWUsS0FBSyxDQUFDLElBQVksRUFBQyxJQUFZO0lBQzNDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUNsQixNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO1NBRWUsT0FBTyxDQUFDLEdBQVcsRUFBQyxLQUFhLEVBQUMsS0FBYTtJQUMzRCxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7SUFFZixNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLENBQUM7SUFFbEQsT0FBTyxNQUFNLENBQUE7QUFDakI7O0FDeEVBLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQztBQUVmLE1BQU0sSUFBSTtJQUNOLENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtDQUNaO0FBRUQsTUFBTSxVQUFVO0lBQ1osU0FBUyxDQUFRO0lBQ2pCLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtDQUNqQjtNQUVZLEdBQUksU0FBUSxRQUFRO0lBQ3JCLElBQUksR0FBZTtRQUN2QixJQUFJLEVBQUUsS0FBSyxHQUFHLE1BQU0sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsU0FBUyxFQUFFLE1BQU07S0FDcEIsQ0FBQTtJQUNELEdBQUcsQ0FBTTtJQUNULE9BQU8sQ0FBWTtJQUNuQixRQUFRLENBQVU7SUFDbEIsWUFBWSxJQUFhO1FBQ3JCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUcsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQ3pCO1lBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtZQUNuQixDQUFDLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFBO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO1NBQ2hCO2FBQ0c7WUFDQSxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7U0FDdEI7UUFDRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTs7Ozs7Ozs7OztRQVVyQixJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFDOUI7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsRUFDOUI7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDckI7UUFDRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFDbEM7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUN0QztRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUNuQztZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1NBQ3hDO1FBQ0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQ2pDO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDckM7UUFDRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFDbEM7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQTtTQUN0QztRQUNELElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzs7Ozs7Ozs7UUFZWixNQUFNLEVBQUUsQ0FBQTtLQUNYO0lBQ0QsSUFBSTtRQUNBLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUM1QixDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDOUIsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2pDLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzs7S0FFN0U7SUFDRCxNQUFNO1FBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUM7WUFDZCxLQUFLLEVBQUU7Z0JBQ0gsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztnQkFDbkIsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNmLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7Z0JBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ3pCLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ3pCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87YUFDOUI7U0FDSixDQUFDLENBQUE7O1FBRUYsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ2hEO1lBQ0ksQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQztZQUN2SCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUMzQixHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7U0FDckQ7UUFDRCxPQUFPLEdBQUcsQ0FBQztLQUNkO0lBQ0QsT0FBTztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNkO0lBQ0QsWUFBWTs7UUFFUixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUNuQixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7UUFDWixJQUFJLE1BQU0sR0FBYSxFQUFFLENBQUM7O1FBRzFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFBOzs7UUFHMUIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUNwQztZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ3ZCO2dCQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ3ZCO29CQUNJLElBQUcsS0FBSyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUUsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsSUFBRSxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUNuRjt3QkFDSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7cUJBQ2Y7eUJBQ0c7d0JBQ0EsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO3FCQUNmO29CQUNELElBQUcsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLEtBQUssQ0FBQyxFQUNkO3dCQUNJLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztxQkFDOUI7O2lCQUVKO2FBRUo7WUFDRCxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtZQUMzQixHQUFHLEdBQUcsRUFBRSxDQUFBO1NBQ1g7UUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDbkM7WUFDSSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNwQztRQUNELE9BQU8sR0FBRyxDQUFDO0tBQ2Q7Q0FDSjtTQUVlLE9BQU8sQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDMUQsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsSUFBRyxHQUFHLENBQUMsUUFBUSxLQUFLLEtBQUssRUFDekI7UUFDSSxlQUFlLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzVCO1NBQ0c7UUFDQSxvQkFBb0IsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDakM7SUFFRCxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixPQUFPLEdBQUcsQ0FBQTtBQUNkLENBQUM7U0FFZSxNQUFNLENBQUMsR0FBUTtJQUMzQixPQUFPLEdBQUcsQ0FBQyxPQUFPLENBQUM7QUFDdkIsQ0FBQztTQUVlLGdCQUFnQixDQUFDLEdBQVE7SUFDckMsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUN0QixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQTtJQUUzQixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ25DO1FBQ0ksSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFFcEIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQTtLQUUxQjtJQUVELElBQUksUUFBUSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7SUFDL0IsUUFBUSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7SUFDMUIsUUFBUSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQTtJQUNsQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFBO0lBRXBDLE9BQU8sUUFBUSxDQUFBO0FBQ25CLENBQUM7U0FFZSxjQUFjLENBQUMsUUFBb0I7SUFDL0MsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN4QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBRTVCLElBQUksT0FBTyxHQUFHLEdBQUcsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDbEUsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUMvQztRQUNJLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUM3QyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzdDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNoRDtJQUNELE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxXQUFXLENBQUMsR0FBUSxFQUFDLE9BQWU7SUFDaEQsSUFBRyxPQUFPLEdBQUMsQ0FBQyxJQUFJLE9BQU8sR0FBQyxDQUFDLEVBQ3pCO1FBQ0ksT0FBTyxHQUFHLENBQUMsQ0FBQztLQUNmO0lBQ0QsSUFBSSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDakIsS0FBSyxFQUFFO1lBQ0gsR0FBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNsQixDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQjtLQUNKLENBQUMsQ0FBQTs7O0lBR0YsTUFBTSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUE7SUFDdEIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQy9DO1FBQ0ksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsSUFBSSxPQUFPLENBQUE7S0FDeEM7SUFHRCxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO1NBRWUsWUFBWSxDQUFDLEdBQVEsRUFBQyxPQUFlO0lBQ2pELElBQUcsT0FBTyxHQUFDLENBQUMsSUFBSSxPQUFPLEdBQUMsQ0FBQyxFQUN6QjtRQUNJLE9BQU8sR0FBRyxDQUFDLENBQUM7S0FDZjtJQUNELElBQUksTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDO1FBQ2pCLEtBQUssRUFBRTtZQUNILEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDbEIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDakI7S0FDSixDQUFDLENBQUE7OztJQUdGLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO0lBQ3RCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUMvQztRQUNJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFBO0tBQzlDO0lBR0QsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztTQUVlLE9BQU8sQ0FBQyxHQUFnQjtJQUNwQyxJQUFJLENBQUMsQ0FBQztJQUNOLElBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFZLEdBQUcsRUFDeEI7UUFDSSxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDckI7U0FDRztRQUNBLENBQUMsR0FBRyxHQUFHLENBQUE7S0FDVjtJQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDeEM7UUFDSSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ3hCO0FBQ0wsQ0FBQztTQUVlLGVBQWUsQ0FBQyxHQUFRO0lBQ3BDLElBQUksTUFBTSxHQUFHLEdBQUcsQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUNoQyxPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO1NBRWUsV0FBVyxDQUFDLEdBQVE7SUFDaEMsSUFBSSxNQUFNLEdBQUcsR0FBRyxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQ2hDLE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7U0FFZSxZQUFZLENBQUMsR0FBZ0I7SUFDekMsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFJLE9BQU8sR0FBVSxFQUFFLENBQUE7SUFDdkIsSUFBSSxDQUFDLENBQUM7SUFDTixJQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsWUFBWSxHQUFHLEVBQ3hCO1FBQ0ksQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ3JCO1NBQ0c7UUFDQSxDQUFDLEdBQUcsR0FBRyxDQUFBO0tBQ1Y7SUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ3hDO1FBQ0ksT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDM0M7SUFDRCxDQUFDLEdBQUcsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDdEIsT0FBTyxDQUFDLENBQUM7QUFDYjs7U0N0VWdCLGdCQUFnQixDQUFDLE1BQW1CO0lBQ2hELElBQUcsQ0FBQyxNQUFNLEVBQ1Y7UUFDSSxNQUFNLEdBQUc7WUFDTCxLQUFLLEVBQUUsR0FBRztZQUNWLE1BQU0sRUFBRSxHQUFHO1NBQ2QsQ0FBQTtLQUNKO0lBQ0QsSUFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQ2hCO1FBQ0ksTUFBTSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUE7S0FDckI7SUFDRCxJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDakI7UUFDSSxNQUFNLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtLQUN0QjtJQUNELE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7U0FFZSxhQUFhLENBQUMsTUFBZ0I7SUFDMUMsSUFBRyxDQUFDLE1BQU0sRUFDVjtRQUNJLE1BQU0sR0FBRztZQUNMLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEdBQUc7WUFDWCxNQUFNLEVBQUUsTUFBTTtZQUNkLFlBQVksRUFBRSxNQUFNO1NBQ3ZCLENBQUE7S0FDSjtJQUNELElBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUNoQjtRQUNJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFBO0tBQ3JCO0lBQ0QsSUFBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ2pCO1FBQ0ksTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7S0FDdEI7SUFDRCxJQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFDakI7UUFDSSxNQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtLQUN6QjtJQUNELElBQUcsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUN2QjtRQUNJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFBO0tBQzlCO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztTQUVlLGlCQUFpQixDQUFDLE1BQW9CLEVBQUMsS0FBYSxFQUFDLE9BQWU7SUFDaEYsSUFBRyxDQUFDLE1BQU0sRUFDVjtRQUNJLE1BQU0sR0FBRztZQUNMLEtBQUssRUFBRSxLQUFLO1lBQ1osT0FBTyxFQUFFLE9BQU87U0FDbkIsQ0FBQTtLQUNKO0lBQ0QsSUFBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQ2hCO1FBQ0ksTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7S0FDdkI7SUFDRCxJQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFDbEI7UUFDSSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtLQUMzQjtJQUNELE9BQU8sTUFBTSxDQUFBO0FBQ2pCLENBQUM7U0FFZSxVQUFVLENBQUMsS0FBYTtJQUNwQyxJQUFHLEtBQUssS0FBSyxPQUFPLEVBQ3BCO1FBQ0ksT0FBTyxDQUFDLEdBQUcsRUFBQyxLQUFLLENBQUMsQ0FBQTtLQUNyQjtTQUNJLElBQUcsS0FBSyxLQUFLLE1BQU0sRUFDeEI7UUFDSSxPQUFPLENBQUMsR0FBRyxFQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3hCO0FBQ0wsQ0FBQztBQUVEO0FBQ0E7QUFDQTtTQUVnQixZQUFZLENBQUMsRUFBWSxFQUFDLEdBQTZCOzs7O0lBSW5FLElBQUcsRUFBRSxZQUFZLFNBQVMsRUFBQztRQUN2QixhQUFhLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3pCO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLFVBQVUsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEI7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksUUFBUSxDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQztLQUNwQjtTQUNJLElBQUcsRUFBRSxZQUFZLEdBQUcsRUFDekI7UUFDSSxPQUFPLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25CO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLFdBQVcsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUE7S0FDdEI7U0FDSSxJQUFHLEVBQUUsWUFBWSxPQUFPLEVBQzdCO1FBQ0ksV0FBVyxDQUFDLEVBQUUsRUFBQyxHQUFHLENBQUMsQ0FBQTtLQUN0QjtTQUNJLElBQUcsRUFBRSxZQUFZLElBQUksRUFDMUI7UUFDSSxRQUFRLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3BCO1NBQ0ksSUFBRyxFQUFFLFlBQVksR0FBRyxFQUN6QjtRQUNJLE9BQU8sQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUE7S0FDbEI7U0FDSSxJQUFHLEVBQUUsWUFBWSxLQUFLLEVBQUM7O1FBRXhCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUM7O1FBRXhCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUMvQjtZQUNJLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUM7U0FDN0I7S0FDSjtBQUNMLENBQUM7U0FFZSxVQUFVLENBQUMsRUFBWSxFQUFDLEdBQTZCO0lBQ2pFLElBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQ3pCO1FBQ0ksRUFBRSxDQUFDLEtBQUssR0FBRztZQUNQLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxTQUFTLEVBQUUsQ0FBQztTQUNmLENBQUE7S0FDSjtJQUNELElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDbEIsSUFBRyxFQUFFLENBQUMsU0FBUyxLQUFLLFNBQVMsRUFBQztRQUMxQixFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQztLQUNwQjtJQUNELElBQUcsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUM7UUFFM0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNYLElBQUcsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7WUFDL0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM3QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEI7S0FFSjtTQUNHO1FBQ0EsSUFBRyxFQUFFLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQztZQUMvQyxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsU0FBUyxDQUFDO1lBQzdCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztTQUNoQjthQUNHO1lBQ0EsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDbEIsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUM3QixHQUFHLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDaEI7S0FDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCTCxDQUFDO1NBR2UsZUFBZSxDQUFDLEVBQVksRUFBQyxHQUE2QjtJQUN0RSxJQUFHLEVBQUUsQ0FBQyxLQUFLLEtBQUssU0FBUyxFQUN6QjtRQUNJLEVBQUUsQ0FBQyxLQUFLLEdBQUc7WUFDUCxRQUFRLEVBQUUsTUFBTTtZQUNoQixXQUFXLEVBQUUsUUFBUTtZQUNyQixVQUFVLEVBQUUsUUFBUTtZQUNwQixTQUFTLEVBQUUsUUFBUTtTQUN0QixDQUFBO0tBQ0o7SUFDRCxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2xCLElBQUcsRUFBRSxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUM7UUFFM0MsR0FBRyxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3hCLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUNyRDtTQUNHO1FBQ0EsSUFBRyxFQUFFLENBQUMsTUFBTSxLQUFLLE1BQU0sSUFBSSxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsRUFBQztZQUMvQyxHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO2FBQ0c7WUFDQSxFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtZQUNsQixHQUFHLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3ZEO0tBQ0o7QUFDTCxDQUFDO1NBRWUsY0FBYyxDQUFDLEVBQVksRUFBQyxHQUE2QjtJQUNyRSxJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFBO0lBQ2pCLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztJQUNwQixJQUFHLEVBQUUsS0FBSyxTQUFTLEVBQ25CO1FBQ0ksRUFBRSxHQUFHO1lBQ0QsUUFBUSxFQUFFLE1BQU07WUFDaEIsV0FBVyxFQUFFLFFBQVE7WUFDckIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsU0FBUyxFQUFFLFFBQVE7U0FDdEIsQ0FBQTtLQUNKO0lBQ0QsSUFBRyxFQUFFLENBQUMsU0FBUyxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFDeEQ7UUFDSSxJQUFHLE9BQU8sRUFBRSxDQUFDLFNBQVMsS0FBSyxRQUFRLEVBQ25DO1lBQ0ksSUFBRyxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUMsU0FBUyxJQUFHLENBQUMsRUFDdkM7Z0JBQ0ksSUFBRyxFQUFFLENBQUMsU0FBUyxLQUFLLENBQUMsRUFDckI7b0JBQ0ksRUFBRSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7aUJBQzFCO3FCQUNJLElBQUcsRUFBRSxDQUFDLFNBQVMsS0FBSyxDQUFDLEVBQzFCO29CQUNJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO2lCQUMxQjtxQkFFRDtvQkFDSSxFQUFFLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQTtpQkFDM0I7YUFDSjtpQkFDRztnQkFDQSxFQUFFLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTthQUMxQjtTQUNKO2FBQ0ksSUFBRyxPQUFPLEVBQUUsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUN4QztZQUNJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxJQUFHLEVBQUUsQ0FBQyxTQUFTLEtBQUssUUFBUSxJQUFJLEVBQUUsQ0FBQyxTQUFTLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEtBQUssUUFBUSxFQUFDO2dCQUNwRixJQUFHLEVBQUUsQ0FBQyxTQUFTLEtBQUssR0FBRyxFQUFDO29CQUNwQixFQUFFLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtpQkFDMUI7cUJBQ0ksSUFBRyxFQUFFLENBQUMsU0FBUyxLQUFLLEdBQUcsRUFDNUI7b0JBQ0ksRUFBRSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7aUJBQzFCO3FCQUNJLElBQUcsRUFBRSxDQUFDLFNBQVMsS0FBSyxHQUFHLEVBQzVCO29CQUNJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO2lCQUMzQjtxQkFDRztvQkFDQSxFQUFFLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQTtpQkFDMUI7YUFDSjtTQUNKO0tBQ0o7U0FDRztRQUNBLEVBQUUsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFBO0tBQzFCO0lBRUQsSUFBRyxFQUFFLENBQUMsV0FBVyxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFDNUQ7UUFDSSxJQUFHLE9BQU8sRUFBRSxDQUFDLFdBQVcsS0FBSyxTQUFTLEVBQ3RDO1lBQ0ksSUFBRyxFQUFFLENBQUMsV0FBVyxLQUFLLEtBQUssRUFDM0I7Z0JBQ0ksRUFBRSxDQUFDLFdBQVcsR0FBRyxRQUFRLENBQUE7YUFDNUI7aUJBQ0c7Z0JBQ0EsRUFBRSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUE7YUFDaEM7U0FDSjthQUNJLElBQUcsT0FBTyxFQUFFLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFDMUM7WUFDSSxFQUFFLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsSUFBRyxFQUFFLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsV0FBVyxLQUFLLFlBQVksRUFDakU7Z0JBQ0ksSUFBRyxFQUFFLENBQUMsV0FBVyxLQUFLLE1BQU0sRUFDNUI7b0JBQ0ksRUFBRSxDQUFDLFdBQVcsR0FBRyxZQUFZLENBQUE7aUJBQ2hDO3FCQUNHO29CQUNBLEVBQUUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO2lCQUM1QjthQUNKO1NBQ0o7YUFDRztZQUNBLEVBQUUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO1NBQzVCO0tBQ0o7U0FDRztRQUNBLEVBQUUsQ0FBQyxXQUFXLEdBQUcsUUFBUSxDQUFBO0tBQzVCO0lBRUQsSUFBRyxFQUFFLENBQUMsVUFBVSxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsVUFBVSxLQUFLLE1BQU0sRUFBQztRQUN2RCxJQUFHLE9BQU8sRUFBRSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQ3BDO1lBQ0ksRUFBRSxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFBO1NBQzNDO2FBQ0ksSUFBRyxPQUFPLEVBQUUsQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUN6QztZQUNJLElBQUcsRUFBRSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLFVBQVUsS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksRUFBRSxDQUFDLFVBQVUsS0FBSyxTQUFTLEVBQ3RIO2dCQUNJLEVBQUUsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFBO2FBQzNCO1NBQ0o7YUFDRztZQUNBLEVBQUUsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFBO1NBQzNCO0tBQ0o7U0FDRztRQUNBLEVBQUUsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFBO0tBQzNCO0lBRUQsSUFBRyxFQUFFLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxFQUFFLENBQUMsUUFBUSxLQUFLLE1BQU0sRUFDdEQ7UUFDSSxJQUFHLE9BQU8sRUFBRSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQ2xDO1lBQ0ksRUFBRSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtTQUM5QzthQUNJLElBQUcsT0FBTyxFQUFFLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFDdkM7WUFDSSxJQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUNuQztnQkFDSSxFQUFFLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO2FBQ25DO1NBQ0o7YUFDRztZQUNBLEVBQUUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO1NBQ3ZCO0tBQ0o7U0FDRztRQUNBLEVBQUUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO0tBQ3ZCO0lBQ0QsVUFBVSxHQUFHLEVBQUUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUM7SUFDakgsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDdEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtBQUMzQixDQUFDO1NBRWUsZUFBZSxDQUFDLEVBQWlCO0lBQzdDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7SUFFVixJQUFHLE9BQU8sRUFBRSxLQUFLLFFBQVEsRUFDekI7UUFDSSxFQUFFLEdBQUcsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLElBQUcsRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLEtBQUssR0FBRyxFQUNoQztZQUNJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDVDthQUNJLElBQUcsRUFBRSxLQUFLLFVBQVUsSUFBSSxFQUFFLEtBQUssTUFBTSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUM7WUFDckQsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNUO2FBRUksSUFBRyxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxLQUFLLElBQUksRUFBRSxLQUFLLEdBQUcsRUFBQztZQUNuRCxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ1Q7YUFDSSxJQUFHLEVBQUUsS0FBSyxXQUFXLElBQUksRUFBRSxLQUFLLE9BQU8sSUFBSSxFQUFFLEtBQUssR0FBRyxFQUFDO1lBQ3ZELENBQUMsR0FBRyxDQUFDLENBQUM7U0FDVDthQUNJLElBQUcsRUFBRSxLQUFLLFlBQVksSUFBSSxFQUFFLEtBQUssUUFBUSxJQUFJLEVBQUUsS0FBSyxHQUFHLEVBQUM7WUFDekQsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUNUO2FBQ0c7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7U0FDMUQ7S0FDSjtTQUNJLElBQUcsT0FBTyxFQUFFLEtBQUssUUFBUSxFQUM5QjtRQUNJLElBQUcsRUFBRSxHQUFDLENBQUMsRUFDUDtZQUNJLENBQUMsR0FBRyxFQUFFLENBQUM7U0FDVjthQUVEO1lBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFBO1NBQ3hEO0tBQ0o7U0FFRDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtLQUN4RDtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztTQUVlLFNBQVMsQ0FBQyxLQUFvQixFQUFDLEtBQW9CO0lBQy9ELElBQUksRUFBRSxHQUFHLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNoQyxJQUFJLEVBQUUsR0FBRyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsSUFBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUM7UUFDcEIsSUFBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUM7WUFDcEIsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNWO2FBQ0c7WUFDQSxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7WUFDWCxFQUFFLEdBQUcsRUFBRSxDQUFDO1lBQ1IsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNWO0tBQ0o7SUFDRCxJQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQztRQUNwQixJQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFBQztZQUNwQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ1Y7S0FDSjtJQUNELE9BQU8sQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLENBQUE7QUFDbEIsQ0FBQztTQUVlLGVBQWUsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDbEUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixJQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUN4RTtRQUNJLElBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQ3BEO1lBQ0ksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ25DO2FBQ0c7WUFDQSxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ3REO0tBQ0o7U0FDRztRQUNBLElBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQ3BEO1lBQ0ksR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDakc7YUFDRztZQUNBLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxFQUFFLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUN2RjtLQUNKO0FBQ0wsQ0FBQztTQUVlLG9CQUFvQixDQUFDLEdBQVEsRUFBQyxHQUE2QjtJQUN2RSxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQ2xCLElBQUcsRUFBRSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLElBQUksRUFBRSxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQ3BHO1FBQ0ksR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQzFDO1NBQ0c7UUFDQSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMzRTtBQUNMLENBQUM7U0FFZSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQWtCLEVBQUMsRUFBWTtJQUNoRSxJQUFHLEVBQUUsWUFBWSxTQUFTLEVBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRSxJQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsRUFDL0M7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBRUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFHLEVBQUUsS0FBSyxFQUFFLEVBQ1o7WUFDSSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDeEMsSUFBRyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUU7YUFDM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDRztnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7YUFDRztZQUNBLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsS0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN4QyxJQUFHLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRTthQUMzQjtnQkFDSSxPQUFPLElBQUksQ0FBQTthQUNkO2lCQUNHO2dCQUNBLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7U0FDSjtLQUVKO1NBQ0ksSUFBRyxFQUFFLFlBQVksR0FBRyxFQUN6QixDQUVDO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRSxJQUFHLENBQUMsSUFBSSxDQUFDLEVBQ1Q7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxPQUFPLEVBQzdCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDbEM7WUFDSSxJQUFHLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDLEVB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
