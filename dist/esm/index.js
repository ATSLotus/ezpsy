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
        // console.dir(x) 
        // console.dir(y)
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9Hcm91cC9ncm91cC50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL0NhbnZhcy9jYW52YXMudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL0Rpdi9kaXYudHMiLCIuLi8uLi9zcmMvRGlhbG9ndWUvZGlhbG9ndWUudHMiLCIuLi8uLi9zcmMvZXpwc3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5sZXQgaWRTdGFydCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiBpZFN0YXJ0Kys7XG59IiwiaW1wb3J0IHsgQ2xhc3MgfSBmcm9tICdlc3RyZWUnO1xuaW1wb3J0IHsganVkZ2VFbGVtZW50IH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5cbmxldCBncm91cElkID0gMDtcblxuZXhwb3J0IGNsYXNzIEdyb3Vwe1xuICAgIGlkOiBudW1iZXJcbiAgICBsZW5ndGg6IG51bWJlclxuICAgIGdyb3VwTGlzdDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwXG4gICAgXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cCl7XG5cbiAgICAgICAgdGhpcy5pZCA9IGdyb3VwSWQ7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGVsO1xuXG4gICAgICAgIGdyb3VwSWQrKyBcbiAgICB9XG59IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFNoYXBlLFN0eWxlfSBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudHN7XG4gICAgc2hhcGU/OiBTaGFwZVxuICAgIHN0eWxlPzogU3R5bGUgXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBub0ZpbGwoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ25vbmUnO1xuICAgIH1cbiAgICBub1N0cm9rZSgpe1xuICAgICAgICB0aGlzLnN0eWxlLmxpbmVXaWR0aCA9IDA7XG4gICAgICAgIC8vIGlmKHRoaXMuc3R5bGUuZmlsbCAhPT0gJ25vbmUnICYmIHRoaXMuc3R5bGUuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcignRXJyb3IhJylcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xuICAgIH1cbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJ1xuaW1wb3J0IHtFbGVtZW50c30gZnJvbSAnLi4vRWxlbWVudCdcblxuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxuY2xhc3MgQ2VudGVye1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMueCA9IHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XG4gICAgfVxufVxuXG5jbGFzcyBTaXple1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG59XG5cbmNsYXNzIFNpZGVYWXtcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdEdyb3VwIGV4dGVuZHMgR3JvdXAge1xuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xuICAgICAgICBzdXBlcihlbClcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XG4gICAgfVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICB4OiBudW1iZXJcbi8vICAgICB5OiBudW1iZXJcbi8vICAgICB3aWR0aDogbnVtYmVyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcbi8vIH1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJyZWN0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogUmVjdGFuZ2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuXG4gICAgfVxufVxuXG5jbGFzcyBsb2dpY1JlY3QgZXh0ZW5kcyBSZWN0YW5nbGV7XG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XG4gICAgcmVjdFBhcmVudHMxOiBSZWN0YW5nbGU7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH19KVxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMSA9IHJlY3RQYXJlbnRzMVxuICAgIH1cbn1cblxuY2xhc3MgY2xpcFJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuY2xhc3MgdW5pb25SZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIGluc3RhbmNlb2ZSZWN0YW5nbGUoZTogYW55KTogZSBpcyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICByZXR1cm4gIGluIGU7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcbi8vICAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xuLy8gICAgIGxldCBzdCA9IHJlY3Quc3R5bGU7XG4vLyAgICAgbGV0IGYscztcbi8vICAgICAvLyBjb25zb2xlLmRpcihzdC5zdHJva2UpXG4vLyAgICAgW2N0eCxmLHNdID0ganVkZ2VTdHlsZShyZWN0LGN0eCk7XG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgICAgIGN0eC5zdHJva2VSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCA9PT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBjb25zb2xlLmRpcihcImVycm9yIUl0IGNhbid0IHBhaW50IGEgcmVjdGFuZ2xlIHdpdGhvdXQgZmlsbFN0eWxlIGFuZCBzdHJva2VTdHlsZVwiKVxuLy8gICAgIH1cbiAgICBcbi8vICAgICByZXR1cm4gcmVjdDtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuICAgIGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gcmVjdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFkam9pblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGZpeGVkU3R5bGU/OiBzdHJpbmd8bnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5ou85o6lIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5ou85o6l55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXG4gICAgbGV0IG5ld1JlY3Q7XG4gICAgaWYoIWZpeGVkU3R5bGUpXG4gICAge1xuICAgICAgICBmaXhlZFN0eWxlID0gJ1JFQ1RMRUZUJ1xuICAgIH1cbiAgICBsZXQgZiA9IGp1ZGdlQ2hhbmdlVHlwZShmaXhlZFN0eWxlKTtcbiAgICAvLyBjb25zb2xlLmRpcignZj0nK2YpO1xuICAgIGlmKGYgPT09IDEpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9MZWZ0KGZpeGVkUmVjdCxyZWN0KTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIobmV3UmVjdClcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAyKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfVG9wKGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAzKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfUmlnaHQoZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDQpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Cb3R0b20oZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IG9yZGVyIScpXG4gICAgfVxuICAgIFxuICAgIFxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfTGVmdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54IC0gcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X1JpZ2h0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9Ub3AoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgLSByZWN0LnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X0JvdHRvbShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RDZW50ZXIocmVjdDogUmVjdGFuZ2xlKTogQ2VudGVye1xuICAgIC8v6I635Y+W55+p5b2i5Lit5b+DXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIocmVjdCk7XG4gICAgcmV0dXJuIGNlbnRlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFsaWduUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsc2lkZTA/OiBudW1iZXJ8c3RyaW5nLHNpZGUxPzogbnVtYmVyfHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouWvuem9kCBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heWvuem9kOefqeW9oiBmaXhlZFN0eWxlIOWvuem9kOW9ouW8j1xuICAgIGlmKHNpZGUwID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzaWRlMCA9IDBcbiAgICAgICAgc2lkZTEgPSAwXG4gICAgfVxuICAgIGlmKHNpZGUxID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzaWRlMSA9IDBcbiAgICB9XG5cbiAgICBpZihyZWN0LnNoYXBlLndpZHRoKnJlY3Quc2hhcGUuaGVpZ2h0ID4gZml4ZWRSZWN0LnNoYXBlLndpZHRoKmZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgKVxuICAgIHtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIVRoZSBhcmVhIG9mIGZpZXhlZFJlY3QgIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmVjdCEnKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbGV0IFtmMCxmMV0gPSBqdWRnZVNpZGUoc2lkZTAsc2lkZTEpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihmMCtcIiBcIitmMSk7XG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICBzaGFwZTp7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBzID0gbmV3IFNpZGVYWSgpO1xuICAgICAgICBpZihmMCA9PT0gMClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDEgfHwgZjEgPT09IDMpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMylcbiAgICAgICAge1xuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XG4gICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHMpXG4gICAgICAgIFxuICAgICAgICBuZXdSZWN0LnNoYXBlLnggPSBzLng7XG4gICAgICAgIG5ld1JlY3Quc2hhcGUueSA9IHMueTtcbiAgICAgICAgcmV0dXJuIG5ld1JlY3Q7XG4gICAgfVxuICAgIFxuICAgIFxufVxuXG5mdW5jdGlvbiBBbGlnblhZKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxmOiBudW1iZXIpOiBTaWRlWFl7XG4gICAgbGV0IHMgPSBuZXcgU2lkZVhZKClcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihmaXhlZFJlY3QpO1xuICAgIC8vIGNvbnNvbGUuZGlyKGNlbnRlcilcbiAgICBpZihmID09PSAwKVxuICAgIHsgICBcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSByZWN0LnNoYXBlLndpZHRoLzJcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSByZWN0LnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMSlcbiAgICB7XG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gZml4ZWRSZWN0LnNoYXBlLndpZHRoLzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAyKVxuICAgIHtcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAzKVxuICAgIHtcbiAgICAgICAgcy54ID0gY2VudGVyLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMiAtIHJlY3Quc2hhcGUud2lkdGhcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSA0KVxuICAgIHtcbiAgICAgICAgcy55ID0gY2VudGVyLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LzIgLSByZWN0LnNoYXBlLmhlaWdodFxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiBzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBPZmZzZXRSZWN0KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5bmz56e7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBcnJhbmdlUmVjdHMobjogbnVtYmVyLFt4TnVtYmVyLHlOdW1iZXJdOiBbbnVtYmVyLG51bWJlcl0sd2luZG93UmVjdDogUmVjdGFuZ2xlLHN0eWxlPzogbnVtYmVyKTogUmVjdEdyb3Vwe1xuICAgIC8v5Yib5bu655+p5b2i6Zi15YiXXG4gICAgbGV0IHJlY3QgPSBuZXcgQXJyYXkoKTtcbiAgICBcbiAgICBsZXQgbnVtID0geE51bWJlciAqIHlOdW1iZXJcbiAgICBsZXQgeCA9IHdpbmRvd1JlY3Quc2hhcGUueFxuICAgIGxldCB5ID0gd2luZG93UmVjdC5zaGFwZS55XG4gICAgbGV0IHdpZHRoID0gd2luZG93UmVjdC5zaGFwZS53aWR0aCAvIHhOdW1iZXJcbiAgICBsZXQgaGVpZ2h0ID0gd2luZG93UmVjdC5zaGFwZS5oZWlnaHQgLyB5TnVtYmVyXG4gICAgLy8gY29uc29sZS5kaXIoW3gseSx3aWR0aCxoZWlnaHRdKVxuXG4gICAgaWYobiA+IG51bSl7XG4gICAgICAgIG4gPSBudW1cbiAgICB9XG5cbiAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgc3R5bGUgPSAwO1xuICAgIH1cblxuICAgIGlmKHN0eWxlID4gMSlcbiAgICB7XG4gICAgICAgIHN0eWxlID0gMFxuICAgIH1cblxuICAgIGlmKHN0eWxlID09PSAwKVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aWR0aCAqIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLSB3aWR0aCAtIHdpZHRoICogaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBcblxuICAgIC8vIGNvbnNvbGUuZGlyKHJlY3QpXG5cbiAgICBsZXQgcmVjdEdyb3VwID0gbmV3IFJlY3RHcm91cCh3aW5kb3dSZWN0LHJlY3QpO1xuICAgIHJldHVybiByZWN0R3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIC8v56e75Yqo55+p5b2i6Iez5p+Q55+p5b2i5Lit5b+DIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5pON5L2c55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXG4gICAgbGV0IG5ld1JlY3QgPSBBbGlnblJlY3QoZml4ZWRSZWN0LHJlY3QsMCwwKTtcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdE9uUG9pbnQocmVjdDogUmVjdGFuZ2xlLFt4LHldOiBbbnVtYmVyLG51bWJlcl0pOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBPZmZzZXRSZWN0KHJlY3QsW3gseV0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RXaWR0aChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLlrr3luqZcbiAgICBsZXQgd2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgcmV0dXJuIHdpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0SGVpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICAvL+iOt+WPluefqeW9oumrmOW6plxuICAgIGxldCBoZWlnaHQgPSByZWN0LnNoYXBlLmhlaWdodFxuICAgIHJldHVybiBoZWlnaHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0U2l6ZShyZWN0OiBSZWN0YW5nbGUpOiBTaXple1xuICAgIC8v6I635Y+W55+p5b2i5a696auYXG4gICAgbGV0IHNpemUgPSBuZXcgU2l6ZShyZWN0KVxuICAgIHJldHVybiBzaXplO1xufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XG4vLyAgICAgLy/nn6nlvaLph43lj6DljLrln59cbi8vICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0MC5zaGFwZS54LHJlY3QwLnNoYXBlLnkscmVjdDAuc2hhcGUud2lkdGgscmVjdDAuc2hhcGUuaGVpZ2h0XVxuLy8gICAgIGxldCBbeDEseTEsdzEsaDFdID0gW3JlY3QxLnNoYXBlLngscmVjdDEuc2hhcGUueSxyZWN0MS5zaGFwZS53aWR0aCxyZWN0MS5zaGFwZS5oZWlnaHRdXG4vLyAgICAgbGV0IFJlY3QseG4seW4sd24saG47XG4vLyAgICAgbGV0IGFyZWEwID0gdzAgKiBoMDtcbi8vICAgICBsZXQgYXJlYTEgPSB3MSAqIGgxO1xuLy8gICAgIGxldCB4LHksdyxoXG4vLyAgICAgbGV0IHh0LHl0LHd0LGh0LHJlY3Rcbi8vICAgICBpZihhcmVhMCA+PSBhcmVhMSlcbi8vICAgICB7XG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MSx5MSx3MSxoMV07XG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDAseTAsdzAsaDBdO1xuLy8gICAgICAgICByZWN0ID0gcmVjdDA7XG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MCx5MCx3MCxoMF07XG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDEseTEsdzEsaDFdO1xuLy8gICAgICAgICByZWN0ID0gcmVjdDE7XG4vLyAgICAgfVxuLy8gICAgIGNvbnNvbGUuZGlyKFt4LHksdyxoXSk7XG4vLyAgICAgY29uc29sZS5kaXIoW3h0LHl0LHd0LGh0XSlcbi8vICAgICBpZighSXNJblJlY3QoW3gseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseStoXSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3gseStoXSxyZWN0KSl7XG4vLyAgICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgd24gPSBNYXRoLmFicyhNYXRoLm1pbih4MCArIHcwICx4MSArIHcxKSAtIE1hdGgubWF4KHgwLCB4MSkpXG4vLyAgICAgICAgIGhuID0gTWF0aC5hYnMoTWF0aC5taW4oeTAgKyBoMCwgeTEgKyBoMSkgLSBNYXRoLm1heCh5MCwgeTEpKVxuLy8gICAgICAgICBpZihJc0luUmVjdChbeCx5XSxyZWN0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHg7XG4vLyAgICAgICAgICAgICB5biA9IHk7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZigoeCA+PSB4dCAmJiB4PD14dCt3dCkgJiYgKHkgPCB5dCB8fCB5ID4geXQraHQpKXtcbi8vICAgICAgICAgICAgIHhuID0geDtcbi8vICAgICAgICAgICAgIHluID0geSArIChoIC0gaG4pO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoKHggPCB4dCB8fCB4ID4geHQrd3QpICYmICh5ID49IHl0ICYmIHkgPD0geXQraHQpKXtcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXG4vLyAgICAgICAgICAgICB5biA9IHlcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcbi8vICAgICAgICAgICAgIHluID0geSArIChoIC0gaG4pXG4vLyAgICAgICAgIH1cbiAgICAgICAgXG4vLyAgICAgICAgIFJlY3QgPSBbeG4seW4sd24saG5dO1xuICAgICAgICBcbi8vICAgICB9XG5cbi8vICAgICBsZXQgbmV3UmVjdCA9IG5ldyBjbGlwUmVjdChSZWN0LHJlY3QwLHJlY3QxKTtcblxuLy8gICAgIHJldHVybiBuZXdSZWN0O1xuXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcbiAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xuICAgIGxldCBuZXdSZWN0LFJlY3RcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XG4gICAgbGV0IHgseSx3LGhcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcbiAgICBpZihJc0luUmVjdChbeGwwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeGwxLHliMV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseWIxXSxyZWN0MCkpXG4gICAge1xuICAgICAgICB4ID0gTWF0aC5tYXgoeGwwLHhsMSk7XG4gICAgICAgIHkgPSBNYXRoLm1heCh5dDAseXQxKTtcbiAgICAgICAgdyA9IE1hdGgubWluKHhyMCx4cjEpIC0geDtcbiAgICAgICAgaCA9IE1hdGgubWluKHliMCx5YjEpIC0geTtcbiAgICAgICAgUmVjdCA9IFt4LHksdyxoXVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXG4gICAgfVxuXG4gICAgbmV3UmVjdCA9IG5ldyBjbGlwUmVjdChSZWN0LHJlY3QwLHJlY3QxKTtcblxuICAgIHJldHVybiBuZXdSZWN0O1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0luUmVjdChbeCx5XTogW251bWJlcixudW1iZXJdLHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XG4gICAgLy/liKTmlq3ngrnmmK/lkKblnKjnn6nlvaLlhoVcbiAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0LnNoYXBlLngscmVjdC5zaGFwZS55LHJlY3Quc2hhcGUud2lkdGgscmVjdC5zaGFwZS5oZWlnaHRdXG4gICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXG4gICAge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdyb3dSZWN0KGVsOiBSZWN0YW5nbGUvKnxSZWN0R3JvdXB8R3JvdXAqLyxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q2j5pS+6LSf57ypIFxuICAgIC8vIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxuICAgIC8vIHtcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgIHNoYXBlOntcbiAgICAgICAgICAgICAgICB4OmVsLnNoYXBlLnggLSBoLFxuICAgICAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggKyAyKmgsXG4gICAgICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSAtIHYsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCArIDIqdlxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gbmV3UmVjdFxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFJlY3RHcm91cClcbiAgICAvLyB7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBHcm91cCl7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUud2lkdGggKz0gMipoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKFwi57G75Z6L6ZSZ6K+vXCIpXG4gICAgLy8gfVxufSAgICAgICBcblxuZXhwb3J0IGZ1bmN0aW9uIEluc2V0UmVjdChlbDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mraPnvKnotJ/mlL5cbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDplbC5zaGFwZS54ICs9IGgsXG4gICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoIC09IDIqaCxcbiAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgKz0gdixcbiAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgLT0gMip2XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTY2FsZVJlY3QocmVjdDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mr5TkvovnvKnmlL5cbiAgICBsZXQgaDAgPSByZWN0LnNoYXBlLndpZHRoICogKGgtMSkgLyAyXG4gICAgbGV0IHYwID0gcmVjdC5zaGFwZS5oZWlnaHQgKiAodi0xKSAvIDJcbiAgICBjb25zb2xlLmRpcihoMCsnICcrdjApXG4gICAgbGV0IG5ld1JlY3QgPSBHcm93UmVjdChyZWN0LGgwLHYwKVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJc0VtcHR5UmVjdChyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xuICAgIC8v5Yik5pat55+p6Zi15piv5ZCm5Li656m6XG4gICAgbGV0IGFyZWEgPSByZWN0LnNoYXBlLndpZHRoICogcmVjdC5zaGFwZS5oZWlnaHQ7XG4gICAgaWYoYXJlYSA9PT0gMClcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RPZk1hdHJpeCgpe1xuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0TGVmdChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFJpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54ICsgcmVjdC5zaGFwZS53aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFRvcChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdEJvdG9tKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFVuaW9uUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiB1bmlvblJlY3R7XG4gICAgbGV0IG5ld1JlY3Q7XG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xuICAgIGxldCB4LHksdyxoXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XG4gICAgeCA9IE1hdGgubWluKHhsMCx4bDEpO1xuICAgIHkgPSBNYXRoLm1pbih5dDAseXQxKTtcbiAgICB3ID0gTWF0aC5tYXgoeHIwLHhyMSkgLSB4O1xuICAgIGggPSBNYXRoLm1heCh5YjAseWIxKSAtIHk7XG4gICAgbmV3UmVjdCA9IG5ldyB1bmlvblJlY3QoW3gseSx3LGhdLHJlY3QwLHJlY3QxKTtcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbFJlY3QocmVjdDogUmVjdGFuZ2xlLGZpbGw/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IHJlY3QwID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXG4gICAgICAgICAgICB5OiByZWN0LnNoYXBlLnksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJlY3QwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVJlY3QocmVjdDogUmVjdGFuZ2xlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHJlY3QwID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXG4gICAgICAgICAgICB5OiByZWN0LnNoYXBlLnksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHJlY3QwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBDaXJjbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBDaXJjbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcbiAgICBsZXQgc2ggPSBjaXJjbGUuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICBqdWRnZVN0eWxlKGNpcmNsZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIHJldHVybiBjaXJjbGU7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xuICAgIGxldCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcjogclxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNpcmNsZVxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIExpbmVTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgeEVuZDogbnVtYmVyLFxuICAgIHlFbmQ6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgTGluZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBMaW5lU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgTGluZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJsaW5lXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogTGluZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xuLy8gICAgIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuLy8gICAgICAgICBsZXQgbCA9IHRoaXMubWFrZUxpbmUobGluZSxjdHgpO1xuLy8gICAgICAgICByZXR1cm4gbDtcbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcbiAgICBsZXQgc2ggPSBsaW5lLnNoYXBlO1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueEVuZCxzaC55RW5kKVxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICByZXR1cm4gbGluZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0xpbmVzKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCk6IEdyb3Vwe1xuICAgIC8v57uY5Yi25aSa5p2h57q/IG9wdHM657q/5p2h5bGe5oCnXG4gICAgbGV0IGdyb3VwID0gbmV3IEdyb3VwKGVsKVxuICAgIHJldHVybiBncm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd01saW5lKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sZ2FwPzogbnVtYmVyW10sc3R5bGU/OiBib29sZWFuLHN0aXBwbGU/OiBib29sZWFuLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgZ2Fw57q/5LmL6Ze055qE6Ze06ZqUIHN0eWxlPWZhbHNl5Li65rC05bmz5bmz6KGMLD10cnVl5Li656uW55u05bmz6KGMIHN0aXBwbGU9ZmFsc2XkuLrlrp7nur8sPXRydWXkuLromZrnur9cbiAgICBpZih3aWR0aEdhcCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB3aWR0aEdhcCAhPT0gJ251bWJlcicpXG4gICAge1xuICAgICAgICB3aWR0aEdhcCA9IDEwO1xuICAgICAgICBpZihzdGlwcGxlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0aXBwbGUgIT09ICdib29sZWFuJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3RpcHBsZSA9PT0gZmFsc2VcbiAgICAgICAgICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0eWxlICE9PSAnYm9vbGVhbicpe1xuICAgICAgICAgICAgICAgIHN0eWxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYoZ2FwID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgICAgICAgICBnYXAgPSBbMTAwLDEwMF1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgbGV0IG9wdHMgPSBuZXcgQXJyYXkoKTtcbiAgICBcbiAgICBpZihzdGlwcGxlID09PSBmYWxzZSlcbiAgICB7XG4gICAgICAgIG9wdHNbMF0gPSBuZXcgTGluZSAoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcbiAgICAgICAgICAgICAgICB5RW5kOiB5RW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGlmKHN0eWxlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lKHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5K2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZCtnYXBbaS0xXSppXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUgKHtcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHg6IHgrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kK2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG9wdHNbMF0gPSBMaW5lU3RpcHBsZShbeCx5LHhFbmQseUVuZF0sd2lkdGhHYXApO1xuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCx5K2dhcFtpLTFdKmkseEVuZCx5RW5kK2dhcFtpLTFdKmldLHdpZHRoR2FwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3grZ2FwW2ktMV0qaSx5LHhFbmQrZ2FwW2ktMV0qaSx5RW5kXSx3aWR0aEdhcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAgICAgXG4gICAgXG4gICAgbGV0IGdyb3VwID0gRHJhd0xpbmVzKG9wdHMpO1xuICAgIHJldHVybiBncm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSx3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIHdpZHRoR2Fw6Ze06ZqUIFxuICAgIGxldCBsaW5lbGVuZ3RoID0gTWF0aC5zcXJ0KE1hdGgucG93KHhFbmQteCwyKStNYXRoLnBvdyh5RW5kLXksMikpXG4gICAgaWYod2lkdGhHYXA+bGluZWxlbmd0aHx8d2lkdGhHYXA9PT11bmRlZmluZWQpXG4gICAge1xuICAgICAgICB3aWR0aEdhcCA9IGxpbmVsZW5ndGgvMTA7XG4gICAgfVxuICAgIGxldCBudW0gPSBNYXRoLmZsb29yKGxpbmVsZW5ndGgvd2lkdGhHYXApXG4gICAgbGV0IHhnID0gd2lkdGhHYXAqKHhFbmQteCkvbGluZWxlbmd0aFxuICAgIGxldCB5ZyA9IHdpZHRoR2FwKih5RW5kLXkpL2xpbmVsZW5ndGhcbiAgICAvLyBjb25zb2xlLmRpcihudW0pXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBsaW5lID0gbmV3IEFycmF5KCk7XG4gICAgd2hpbGUoaTxudW0pXG4gICAge1xuICAgICAgICBsaW5lW2ldID0gbmV3IExpbmUoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICB4OiB4K3hnKmksXG4gICAgICAgICAgICAgICAgeTogeSt5ZyppLFxuICAgICAgICAgICAgICAgIHhFbmQ6IHgreGcqKGkrMSksXG4gICAgICAgICAgICAgICAgeUVuZDogeSt5ZyooaSsxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpKz0yO1xuICAgIH1cbiAgICBsZXQgTGluZVN0aXBwbGUgPSBuZXcgR3JvdXAobGluZSlcbiAgICByZXR1cm4gTGluZVN0aXBwbGVcbn1cblxuLy8gZXhwb3J0IGNsYXNzIFBvbHkgZXh0ZW5kcyBHcm91cHtcbi8vICAgICBzdHlsZTogU3R5bGVcbi8vICAgICBjb25zdHJ1Y3RvcihlbDogTGluZVtdfEdyb3VwW118R3JvdXAsc3R5bGU/OiBTdHlsZSl7XG4vLyAgICAgICAgIHN1cGVyKGVsKVxuLy8gICAgICAgICBpZihzdHlsZSlcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHN0eWxlO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuLy8gICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuLy8gICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4vLyAgICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyB9IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQXJjU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBhbmdfZjogbnVtYmVyLFxuICAgIGFuZ19lOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEFyY09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBBcmNTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBBcmMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiYXJjXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogQXJjT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XG4gICAgbGV0IHN0ID0gYXJjLnN0eWxlXG4gICAgaWYoc3QuZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHN0LmZpbGwgPT09ICdub25lJyB8fCBzdC5maWxsID09PSAnI2ZmZicpXG4gICAge1xuICAgICAgICBtYWtlRnJhbWVBcmMoYXJjLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG1ha2VGaWxsQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjO1xufVxuXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxsQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19lKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2UpKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgIGN0eC5zdHJva2UoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lQXJjKGFyYzogQXJjLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBBcmN7XG4gICAgLy/nlLvnspfnur/lvKcgXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICAvLyBqdWRnZVN0eWxlX2V6c3koYXJjKVxuXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFyYzBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxBcmMoYXJjOiBBcmMsZmlsbD86IHN0cmluZyk6IEFyY3tcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEVsbGlwc2VTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg/OiBudW1iZXIsXG4gICAgeT86IG51bWJlcixcbiAgICByYT86IG51bWJlcixcbiAgICByYj86IG51bWJlclxuICAgIC8vcmHkuLrmqKrovbTplb8gcmLkuLrnurXovbTplb9cbn1cblxuaW50ZXJmYWNlIEVsbGlwc2VPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogRWxsaXBzZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIEVsbGlwc2UgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZWxsaXBzZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEVsbGlwc2VPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XG4gICAgLy9tYXjmmK/nrYnkuo4x6Zmk5Lul6ZW/6L205YC8YeWSjGLkuK3nmoTovoPlpKfogIVcbiAgICAvL2nmr4/mrKHlvqrnjq/lop7liqAxL21heO+8jOihqOekuuW6puaVsOeahOWinuWKoFxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxuICAgIGxldCBzaCA9IGVsbGlwc2Uuc2hhcGVcbiAgICBsZXQgc3RlcCA9IChzaC5yYSA+IHNoLnJiKSA/IDEgLyBzaC5yYSA6IDEgLyBzaC5yYjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhzaC54ICsgc2gucmEsIHNoLnkpOyAvL+S7juakreWchueahOW3puerr+eCueW8gOWni+e7mOWItlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMiAqIE1hdGguUEk7IGkgKz0gc3RlcClcbiAgICB7XG4gICAgICAgIC8v5Y+C5pWw5pa556iL5Li6eCA9IGEgKiBjb3MoaSksIHkgPSBiICogc2luKGkp77yMXG4gICAgICAgIC8v5Y+C5pWw5Li6ae+8jOihqOekuuW6puaVsO+8iOW8p+W6pu+8iVxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XG4gICAgfVxuICAgIGp1ZGdlU3R5bGUoZWxsaXBzZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gZWxsaXBzZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbE92YWwoZWxsaXBzZTogRWxsaXBzZSxmaWxsPzogc3RyaW5nKTogRWxsaXBzZXtcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlbGxpcHNlMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVPdmFsKGVsbGlwc2U6IEVsbGlwc2UsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IEVsbGlwc2V7XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZWxsaXBzZTBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgUG9seWdvblNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4QTogbnVtYmVyW11cbiAgICB5QTogbnVtYmVyW11cbn1cblxuaW50ZXJmYWNlIFBvbHlnb25PcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUG9seWdvblNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicG9seWdvblwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFBvbHlnb25PcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XG4gICAgbGV0IHNoID0gcG9seWdvbi5zaGFwZVxuICAgIGxldCBudW0gPSAwO1xuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgbnVtID0gTWF0aC5taW4oc2gueEEubGVuZ3RoLHNoLnlBLmxlbmd0aClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbnVtID0gc2gueEEubGVuZ3RoXG4gICAgfVxuXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKVxuICAgIHtcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcbiAgICB9XG4gICAgY3R4LmxpbmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgcmV0dXJuIHBvbHlnb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUG9seShwb2x5Z29uOiBQb2x5Z29uLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbFBvbHkocG9seWdvbjogUG9seWdvbixmaWxsPzogc3RyaW5nKTogUG9seWdvbntcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcG9seWdvbjBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZV90ZXh0LCBqdWRnZVRleHRTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgVGV4dFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBtYXhXaWR0aD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgVGV4dE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBUZXh0U2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgVGV4dCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJ0ZXh0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogVGV4dE9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUZXh0KHRleHQ6IFRleHQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBUZXh0e1xuXG4gICAgY3R4LmJlZ2luUGF0aCgpXG5cbiAgICBqdWRnZVRleHRTdHlsZSh0ZXh0LGN0eClcblxuICAgIGp1ZGdlU3R5bGVfdGV4dCh0ZXh0LGN0eClcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXRTdHIoc3RyQTogc3RyaW5nW10pOiBzdHJpbmd7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ckEubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyQVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0clBhZChzdHI6IHN0cmluZyxzdHIwOiBzdHJpbmcsbnVtPzogbnVtYmVyKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBcbiAgICBpZihudW0gPT09IHVuZGVmaW5lZCB8fCBudW0gPT09IDApXG4gICAge1xuICAgICAgICBudW0gPSAxO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyMFxuICAgIH1cbiAgICB0ZXh0ICs9IHN0clxuXG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVxKHN0cjA6IHN0cmluZyxzdHIxOiBzdHJpbmcpOiBib29sZWFue1xuICAgIGxldCByZXN1bHQgPSBmYWxzZVxuICAgIHJlc3VsdCA9IHN0cjAuaW5jbHVkZXMoc3RyMSk7XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVwbGFjZShzdHI6IHN0cmluZyxzdHJfbzogc3RyaW5nLHN0cl9yOiBzdHJpbmcpOnN0cmluZ3tcbiAgICBsZXQgcmVzdWx0ID0gJydcblxuICAgIHJlc3VsdCA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyX28sJ2cnKSxzdHJfcik7XG5cbiAgICByZXR1cm4gcmVzdWx0XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VJbWFnZVNoYXBlLCBqdWRnZVN0eWxlLGp1ZGdlSW1hZ2VTaGFwZV90cnVlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBJbWdTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIGltZzogc3RyaW5nXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgd2lkdGg/OiBudW1iZXJcbiAgICBoZWlnaHQ/OiBudW1iZXJcbiAgICBzeD86IG51bWJlclxuICAgIHN5PzogbnVtYmVyXG4gICAgc3dpZHRoPzogbnVtYmVyXG4gICAgc2hlaWdodD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgSW1nT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEltZ1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxuICAgIEltZz86IGFueVxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmNsYXNzIFJHQkEge1xuICAgIFI6IG51bWJlclxuICAgIEc6IG51bWJlclxuICAgIEI6IG51bWJlclxuICAgIEE6IG51bWJlclxufVxuXG5jbGFzcyBSR0JBX0FycmF5e1xuICAgIFJHQkFfTGlzdDogUkdCQVtdXG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBJbWcgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxuICAgIElzQ2hhbmdlPzogYm9vbGVhblxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEltZ09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICBpZihvcHRzLkltZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgSSA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBJLnNyYyA9IG9wdHMuc2hhcGUuaW1nXG4gICAgICAgICAgICB0aGlzLkltZyA9IEk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuSW1nID0gb3B0cy5JbWdcbiAgICAgICAgfVxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IHtcbiAgICAgICAgLy8gICAgIHRleHR1cmU6IFtdLFxuICAgICAgICAvLyAgICAgd2lkdGg6IDAsXG4gICAgICAgIC8vICAgICBoZWlnaHQ6IDBcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZihvcHRzLkltZ0RhdGEgIT09IHVuZGVmaW5lZClcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXG4gICAgICAgIC8vIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN5ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3kgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3dpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3dpZHRoID0gdGhpcy5JbWcud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc2hlaWdodCA9IHRoaXMuSW1nLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLndpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUud2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLmhlaWdodCA9IHRoaXMuSW1nLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXG5cbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5JbWdEYXRhKVxuICAgICAgICBcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgLy8gaWYob3B0cy5zdHlsZSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIC8vIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGVcbiAgICAgICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgICAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgICAgIGMud2lkdGggPSBzY3JlZW4uYXZhaWxXaWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBzY3JlZW4uYXZhaWxIZWlnaHQ7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5JbWcsc2gueCxzaC55KVxuICAgICAgICB0aGlzLkltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKHNoLngsc2gueSx0aGlzLkltZy53aWR0aCx0aGlzLkltZy5oZWlnaHQpO1xuICAgICAgICAvLyB0aGlzLm1ha2VUZXh0dXJlcygpXG4gICAgfVxuICAgIHRvR3JheSgpe1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltZyh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIGltZzogdGhpcy5zaGFwZS5pbWcsXG4gICAgICAgICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxuICAgICAgICAgICAgICAgIHN5OiB0aGlzLnNoYXBlLnN5LFxuICAgICAgICAgICAgICAgIHN3aWR0aDogdGhpcy5zaGFwZS5zd2lkdGgsXG4gICAgICAgICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBpbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgICAgIGxldCBnID0gMFxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGcgPSBNYXRoLmZsb29yKHRoaXMuSW1nRGF0YS5kYXRhWzQqaSswXSAqIDAuMjk5ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzFdICogMC41ODcgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMl0gKiAwLjExNCk7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSszXSA9IHRoaXMuSW1nRGF0YS5kYXRhWzQqaSszXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuICAgIHJlcGxhY2UoKXtcbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIG1ha2VUZXh0dXJlcygpe1xuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0gbmV3IFRleHR1cmVzKHRoaXMpO1xuICAgICAgICBsZXQgaW1nID0gdGhpcy50b0dyYXkoKTtcbiAgICAgICAgbGV0IGRhdGEwID0gaW1nLkltZ0RhdGEuZGF0YTtcbiAgICAgICAgbGV0IGEgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgYXJyID0gJydcbiAgICAgICAgbGV0IG51bUFycjogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbGV0IG51bUFycjA6IG51bWJlcltdID0gW107XG4gICAgICAgIC8vIGxldCBkYXRhID0gdGhpcy5JbWdEYXRhLmRhdGFcbiAgICAgICAgbGV0IHcgPSB0aGlzLkltZ0RhdGEud2lkdGhcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZGF0YSlcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YTAubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAzO3QrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwO2sgPCAzO2srKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEwWzQqaV0gPD0gZGF0YTBbNCooaSsodC0xKSp3K2stMSldIHx8IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoMyp0K2sgIT09IDQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyciArPSBhWzMqdCtrXS50b1N0cmluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoaSsodC0xKSp3K2stMSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbnVtQXJyW2ldID0gcGFyc2VJbnQoYXJyLDIpXG4gICAgICAgICAgICBhcnIgPSAnJ1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IG51bUFyci5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXT1udW1BcnJbaV1cbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdPW51bUFycltpXVxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl09bnVtQXJyW2ldXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW1nKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogSW1ne1xuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGlmKGltZy5Jc0NoYW5nZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBqdWRnZUltYWdlU2hhcGUoaW1nLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZyxjdHgpO1xuICAgIH1cbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICByZXR1cm4gaW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbVJlYWQoaW1nOiBJbWcpOiBJbWFnZURhdGF7ICAgICAgICAgLy/or7vlj5blm77niYfnn6npmLVcbiAgICByZXR1cm4gaW1nLkltZ0RhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbnBhY2tDb2xvckltYWdlKGltZzogSW1nKTogUkdCQV9BcnJheXtcbiAgICBsZXQgcmdiYSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGRhdGEgPSBpbWcuSW1nRGF0YS5kYXRhXG4gICAgXG4gICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICByZ2JhW2ldID0gbmV3IFJHQkEoKVxuICAgICAgICBcbiAgICAgICAgcmdiYVtpXS5SID0gZGF0YVs0KmkrMF1cbiAgICAgICAgcmdiYVtpXS5HID0gZGF0YVs0KmkrMV1cbiAgICAgICAgcmdiYVtpXS5CID0gZGF0YVs0KmkrMl1cbiAgICAgICAgcmdiYVtpXS5BID0gZGF0YVs0KmkrM11cblxuICAgIH1cblxuICAgIGxldCByZ2JhX2FyciA9IG5ldyBSR0JBX0FycmF5KClcbiAgICByZ2JhX2Fyci5SR0JBX0xpc3QgPSByZ2JhO1xuICAgIHJnYmFfYXJyLndpZHRoID0gaW1nLkltZ0RhdGEud2lkdGhcbiAgICByZ2JhX2Fyci5oZWlnaHQgPSBpbWcuSW1nRGF0YS5oZWlnaHRcblxuICAgIHJldHVybiByZ2JhX2FyclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGFja0NvbG9ySW1hZ2UocmdiYV9hcnI6IFJHQkFfQXJyYXkpOiBJbWFnZURhdGF7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcblxuICAgIGxldCBpbWdkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShyZ2JhX2Fyci53aWR0aCxyZ2JhX2Fyci5oZWlnaHQpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHJnYmFfYXJyLlJHQkFfTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSswXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5SXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMV0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uR1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzJdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSszXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5BXG4gICAgfVxuICAgIHJldHVybiBpbWdkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VJbihpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAxO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9IGFscGhhSW5cbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VPdXQoaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXG4gICAge1xuICAgICAgICBhbHBoYUluID0gMDtcbiAgICB9XG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxuICAgICAgICB9XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSAoMSAtIGFscGhhSW4pXG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW1nSW5pdChpbWc6IEltZ1tdfEdyb3VwKXtcbiAgICBsZXQgSTtcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgSSA9IGltZ1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgSS5ncm91cExpc3RbaV0uaW5pdCgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJlbG9hZFRleHR1cmVzKGltZzogSW1nKTogSW1ne1xuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmUoaW1nOiBJbWcpOiBJbWd7XG4gICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZXMoaW1nOiBJbWdbXXxHcm91cCk6IEdyb3Vwe1xuICAgIGxldCBJO1xuICAgIGxldCB0ZXh0dXJlOiBJbWdbXSA9IFtdXG4gICAgbGV0IFQ7XG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEkgPSBpbWdcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHR1cmVbaV0gPSBEcmF3VGV4dHVyZShJLmdyb3VwTGlzdFtpXSlcbiAgICB9XG4gICAgVCA9IG5ldyBHcm91cCh0ZXh0dXJlKVxuICAgIHJldHVybiBUO1xufSIsImltcG9ydCB7Y2FudmFzU3R5bGV9IGZyb20gJy4uL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgeyBSZWN0YW5nbGUsbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4uL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCcgXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBDaXJjbGUsbWFrZUNpcmNsZSB9IGZyb20gJy4uL0dyYXBoaWMvY2lyY2xlJ1xuaW1wb3J0IHsgTGluZSwgbWFrZUxpbmV9IGZyb20gJy4uL0dyYXBoaWMvbGluZSdcbmltcG9ydCB7IEFyYywgbWFrZUFyYyB9IGZyb20gJy4uL0dyYXBoaWMvYXJjJ1xuaW1wb3J0IHsgRWxsaXBzZSwgbWFrZUVsbGlwc2UgfSBmcm9tICcuLi9HcmFwaGljL2VsbGlwc2UnXG5pbXBvcnQgeyBtYWtlUG9seWdvbiwgUG9seWdvbiB9IGZyb20gJy4uL0dyYXBoaWMvcG9seWdvbidcbmltcG9ydCB7IG1ha2VUZXh0LCBUZXh0IH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xuaW1wb3J0IHsgSW1nLCBtYWtlSW1nIH0gZnJvbSAnLi4vR3JhcGhpYy9pbWFnZSdcbmltcG9ydCB7IGNvbnRlbnRTdHlsZSB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKTpjYW52YXNTdHlsZXtcbiAgICBpZighY1N0eWxlKSBcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFjU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBjU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBjU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIHJldHVybiBjU3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZURpdlN0eWxlKGRTdHlsZTogRGl2U3R5bGUpOiBEaXZTdHlsZXtcbiAgICBpZighZFN0eWxlKSBcbiAgICB7XG4gICAgICAgIGRTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDI2MCxcbiAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighZFN0eWxlLndpZHRoKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLndpZHRoID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuaGVpZ2h0KVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmhlaWdodCA9IDQwMFxuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlcilcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXIgPSAnbm9uZSdcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5ib3JkZXJSYWRpdXMpXG4gICAge1xuICAgICAgICBkU3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCdcbiAgICB9XG4gICAgcmV0dXJuIGRTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ29udGVudFN0eWxlKGNTdHlsZTogY29udGVudFN0eWxlLHRpdGxlOiBzdHJpbmcsY29udGVudDogc3RyaW5nKTogY29udGVudFN0eWxle1xuICAgIGlmKCFjU3R5bGUpXG4gICAge1xuICAgICAgICBjU3R5bGUgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgYnRuU3RyOiBbJ09LJ10sXG4gICAgICAgICAgICBub0ljb246IGZhbHNlLFxuICAgICAgICAgICAgbm9JbnQ6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVBvc2l0aW9uOiAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS50aXRsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZS50aXRsZSA9IHRpdGxlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29udGVudClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5jb250ZW50ID0gY29udGVudFxuICAgIH1cbiAgICBpZighY1N0eWxlLmJ0blN0cil7XG4gICAgICAgIGNTdHlsZS5idG5TdHIgPSBbJ09LJ11cbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ljb24pXG4gICAge1xuICAgICAgICBjU3R5bGUubm9JY29uID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ludClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ludCA9IGZhbHNlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29uZmlybVBvc2l0aW9uKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDA7XG4gICAgfVxuICAgIGlmKGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDAgJiYgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMSAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAyKXtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VNb2RlbChtb2RlbDogc3RyaW5nKTogW3N0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZ117XG4gICAgaWYobW9kZWwgPT09ICdlcnJvcicpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiWFwiLCdyZWQnLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2hlbHAnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnSGVscCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBoZWxwIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAncXVlc3QnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIj9cIiwnZ3JleScsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICd3YXJuJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCIhXCIsJ29yYW5nZScsJ1dhcm5pbmcgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgd2FybmluZyBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2lucHV0JylcbiAgICB7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJJbnB1dCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IGlucHV0IHN0cmluZ1wiXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnc2VsZWN0Jyl7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJTZWxlY3QgRGlhbG9ndWVcIixcIlRoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdmaWxlJyl7XG4gICAgICAgIHJldHVybiBbJycsJycsJ0ZpbGUgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZmlsZSBzdHJpbmcnXVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gWyfvvZ4nLCdncmVlbicsJ0RhaWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGRhaWxvZ3VlIHN0cmluZyddXG4gICAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShzdHlsZTogU3R5bGUpe1xuLy8gICAgIGlmKCFzdHlsZSlcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRWxlbWVudChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIC8vIGNvbnNvbGUuZGlyKFJlY3RhbmdsZSlcbiAgICAvLyBjb25zb2xlLmRpcihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XG4gICAgICAgIG1ha2VSZWN0YW5nbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIG1ha2VDaXJjbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBtYWtlTGluZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgbWFrZUFyYyhlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIG1ha2VFbGxpcHNlKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAge1xuICAgICAgICBtYWtlUG9seWdvbihlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBUZXh0KVxuICAgIHtcbiAgICAgICAgbWFrZVRleHQoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIG1ha2VJbWcoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgICAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAgICAgbGV0IGxpc3QgPSBlbC5ncm91cExpc3Q7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAxXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QubGluZVdpZHRoID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzdC5saW5lV2lkdGggPSAxO1xuICAgIH1cbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYoIShzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCkpe1xuICAgIC8vICAgICAvLyBzdC5zdHJva2UgPSAnIzAwMCc7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyAgICAgfVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gY3R4LmZpbGwoKTtcbiAgICAvLyBjdHguc3Ryb2tlKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGVfdGV4dChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGxUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUZXh0U3R5bGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc3QgPSBlbC5zdHlsZVxuICAgIGxldCBmb250U3RyaW5nID0gJyc7XG4gICAgaWYoc3QgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0ID0ge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTdHlsZSAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA8IDMgJiYgc3QuZm9udFN0eWxlID49MClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdpdGFsaWMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U3R5bGUgPSBzdC5mb250U3R5bGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gJ2l0YWxpYycgJiYgc3QuZm9udFN0eWxlICE9PSAnb2JsaXF1ZScgJiYgc3QuZm9udFN0eWxlICE9PSBcIm5vcm1hbFwiKXtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09ICcwJyl7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMScpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzInKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFZhcmlhbnQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250VmFyaWFudCAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFZhcmlhbnQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9IHN0LmZvbnRWYXJpYW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCAhPT0gJ25vcm1hbCcgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdzbWFsbC1jYXBzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250V2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFdlaWdodCAhPT0gJ25vbmUnKXtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gc3QuZm9udFdlaWdodC50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFdlaWdodCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZGVyJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbGlnaHRlcicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRTaXplICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFNpemUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTaXplLmluZGV4T2YoJ3B4JykgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUgKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFNpemUgPSAnMThweCdcbiAgICB9XG4gICAgZm9udFN0cmluZyA9IHN0LmZvbnRTdHlsZSArICcgJyArIHN0LmZvbnRWYXJpYW50ICsgJyAnICsgc3QuZm9udFdlaWdodCArICcgJyArIHN0LmZvbnRTaXplICsgJyAnICsgc3QuZm9udEZhbWlseTtcbiAgICBjdHguZm9udCA9IGZvbnRTdHJpbmc7XG4gICAgY29uc29sZS5kaXIoZm9udFN0cmluZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ2hhbmdlVHlwZShlbDogbnVtYmVyfHN0cmluZyk6IG51bWJlcntcbiAgICBsZXQgeCA9IDE7XG4gICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgaWYodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgIHtcbiAgICAgICAgZWwgPSBlbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZihlbCA9PT0gXCJDRU5URVJcIiB8fCBlbCA9PT0gJ0MnKVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVExFRlQnIHx8IGVsID09PSBcIkxFRlRcIiB8fCBlbCA9PT0gJ0wnKXtcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFRPUCcgfHwgZWwgPT09IFwiVE9QXCIgfHwgZWwgPT09ICdUJyl7XG4gICAgICAgICAgICB4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFJJR0hUJyB8fCBlbCA9PT0gXCJSSUdIVFwiIHx8IGVsID09PSAnUicpe1xuICAgICAgICAgICAgeCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RCT1RUT00nIHx8IGVsID09PSBcIkJPVFRPTVwiIHx8IGVsID09PSAnQicpe1xuICAgICAgICAgICAgeCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiBlbCA9PT0gXCJudW1iZXJcIilcbiAgICB7XG4gICAgICAgIGlmKGVsPDUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHggPSBlbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVNpZGUoc2lkZTA6IG51bWJlcnxzdHJpbmcsc2lkZTE6IG51bWJlcnxzdHJpbmcpOiBbbnVtYmVyLG51bWJlcl17XG4gICAgbGV0IGYwID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUwKTtcbiAgICBsZXQgZjEgPSBqdWRnZUNoYW5nZVR5cGUoc2lkZTEpO1xuICAgIGlmKGYwID09PSAyIHx8IGYwID09PSA0KXtcbiAgICAgICAgaWYoZjEgPT09IDIgfHwgZjEgPT09IDQpe1xuICAgICAgICAgICAgZjEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgdCA9IGYxO1xuICAgICAgICAgICAgZjEgPSBmMDtcbiAgICAgICAgICAgIGYwID0gdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMyl7XG4gICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAzKXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2YwLGYxXVxufSAgIFxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LGltZy5JbWcud2lkdGgsaW1nLkltZy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodCxzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGltZy5zaGFwZVxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnksc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJc0luRWxlbWVudChbeCx5XTogW251bWJlcixudW1iZXJdLGVsOiBFbGVtZW50cyk6IGJvb2xlYW57XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUud2lkdGgsZWwuc2hhcGUuaGVpZ2h0XVxuICAgICAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yXVxuICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXgwLDIpICsgTWF0aC5wb3coeS15MCwyKSlcbiAgICAgICAgaWYociA8PSByMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUueEVuZCxlbC5zaGFwZS55RW5kXVxuICAgICAgICBpZih4MSAhPT0geDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB5dCA9ICh5MS15MCkvKHgxLXgwKSAqICh4IC0geDApICsgeTBcbiAgICAgICAgICAgIGlmKHkgPj0geXQtMTUgJiYgeSA8PSB5dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHh0ID0gKHgxLXgwKS8oeTEteTApICogKHkgLSB5MCkgKyB4MFxuICAgICAgICAgICAgaWYoeSA+PSB4dC0xNSAmJiB5IDw9IHh0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCxyYTAscmIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucmEsZWwuc2hhcGUucmJdXG4gICAgICAgIGxldCB0ID0gTWF0aC5wb3coeC14MCwyKS9NYXRoLnBvdyhyYTAsMikgKyBNYXRoLnBvdyh5LXkwLDIpL01hdGgucG93KHJiMCwyKVxuICAgICAgICBpZih0IDw9IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgIGxldCBqID0gaSArIDFcbiAgICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgICBsZXQgeHQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgeXQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgW3gwLHkwXSA9IFtlbC5zaGFwZS54QSxlbC5zaGFwZS55QV1cbiAgICAgICAgZm9yKGkgPSAwO2k8ZWwuc2hhcGUueEEubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaSA9PT0gZWwuc2hhcGUueEEubGVuZ3RoLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaiA9IGkgKyAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih5MFtpXSAhPT0geTBbal0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeHRbaW5kZXhdID0gKHgwW2ldLXgwW2pdKS8oeTBbaV0teTBbal0pICogKHkgLSB5MFtpXSkgKyB4MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB5dFtpbmRleF0gPSAoeTBbal0teTBbaV0pLyh4MFtqXS14MFtpXSkgKiAoeCAtIHgwW2ldKSArIHkwW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4ID09PSB4dFtpbmRleF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoeHRbaW5kZXhdID49IHgpe1xuICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihpbmRleCUyPT09MClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAgLy8ge1xuICAgIC8vICAgICBsZXQgY1xuICAgIC8vICAgICBsZXQgaSxqXG4gICAgLy8gICAgIGxldCBsID0gZWwuc2hhcGUueUEubGVuZ3RoXG4gICAgLy8gICAgIGZvcihjID0gZmFsc2UsaSA9IC0xLGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIFxuICAgIC8vICAgICAgICAgKCAoZWwuc2hhcGUueUFbaV0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbal0pIHx8IChlbC5zaGFwZS55QVtqXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtpXSkgKSBcbiAgICAvLyAgICAgICAgICYmICh4IDwgKGVsLnNoYXBlLnhBW2pdIC0gZWwuc2hhcGUueEFbaV0pICogKHkgLSBlbC5zaGFwZS55QVtpXSkgLyAoZWwuc2hhcGUueUFbal0gLSBlbC5zaGFwZS55QVtpXSkgKyBlbC5zaGFwZS54QVtpXSkgXG4gICAgLy8gICAgICAgICAmJiAoYyA9ICFjKTsgXG4gICAgLy8gICAgIHJldHVybiBjOyBcbiAgICAvLyB9XG59IiwiaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuZXhwb3J0IGludGVyZmFjZSBjYW52YXNTdHlsZXtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgLy8gbGV0IGNTdHlsZTogY2FudmFzU3R5bGUgPSB7XG4gICAgLy8gICAgIHdpZHRoOiAxMDAsXG4gICAgLy8gICAgIGhlaWdodDogMTAwXG4gICAgLy8gfVxuICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9tLmFwcGVuZChjKTtcbiAgICByZXR1cm4gY3R4O1xufSIsIlxuY2xhc3MgdGltZXtcbiAgICBob3VyOiBudW1iZXJcbiAgICBtaW51dGVzOiBudW1iZXJcbiAgICBzZWNvbmRzOiBudW1iZXJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IHRpbWVcbiAgICBpbnN0YW50VGltZTogdGltZVxuICAgIHRyYW5zaWVudFRpbWU6IHRpbWVbXVxuICAgIHRpbWVWYWx1ZTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBuZXcgdGltZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGljKCk6IFRpbWV7XG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXG4gICAgdC5zdGFydCgpXG4gICAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZSk6IG51bWJlcntcbiAgICBsZXQgdCA9IDA7XG4gICAgbGV0IHRzID0gbmV3IEFycmF5KClcbiAgICB0aW1lLnJlY29yZCgpXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXG4gICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lLm1pbnV0ZXMgLSB0aW1lLnN0YXJ0VGltZS5taW51dGVzXG4gICAgdHNbMl0gPSB0aW1lLmluc3RhbnRUaW1lLnNlY29uZHMgLSB0aW1lLnN0YXJ0VGltZS5zZWNvbmRzXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xuICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4gICAgdGltZS50aW1lVmFsdWUgPSB0O1xuICAgIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xuICAgIGxldCB0ID0gVG9jKHRpbWUpXG4gICAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIsbWVzc2FnZT86IGFueSl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlfZnJhbWUobnVtMSl7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT09bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbn0pfTsiLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBqdWRnZUlzSW5FbGVtZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIsRnVuYzogRnVuY3Rpb24pe1xuICAgIGRvY3VtZW50Lm9ua2V5ZG93bj1mdW5jdGlvbihldmVudCl7XG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XG4gICAgICAgICAgICBGdW5jKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYk5hbWUoa2V5OiBzdHJpbmd8bnVtYmVyKTpudW1iZXJ7XG4gICAgbGV0IHJlcztcblxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgcmVzID0ga2V5LmNoYXJDb2RlQXQoMClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmVzID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpXG4gICAgfVxuICAgIGNvbnNvbGUuZGlyKHJlcykgXG4gICAgcmV0dXJuIHJlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JQcmVzc1dhaXQoa2V5OiBudW1iZXIsRnVuYzogRnVuY3Rpb24pe1xuICAgIGRvY3VtZW50Lm9ua2V5ZG93bj1mdW5jdGlvbihldmVudCl7XG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XG4gICAgICAgICAgICBGdW5jKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYlJlbGVhc2VXYWl0KGtleTogbnVtYmVyLEZ1bmM6IEZ1bmN0aW9uKXtcbiAgICBkb2N1bWVudC5vbmtleXVwPWZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgdmFyIGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KXtcbiAgICAgICAgICAgIEZ1bmMoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyxGdW5jOiBGdW5jdGlvbil7XG4gICAgZG9jdW1lbnQub25tb3VzZWRvd24gPSBmdW5jdGlvbihldmVudCl7XG4gICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgbGV0IHgseVxuICAgICAgICBpZihlLnBhZ2VYIHx8IGUucGFnZVkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHggPSBlLnBhZ2VYXG4gICAgICAgICAgICB5ID0gZS5wYWdlWVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHgpIFxuICAgICAgICAvLyBjb25zb2xlLmRpcih5KVxuICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGYpXG4gICAgICAgIGlmKGYgPT09IHRydWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIEZ1bmMoKVxuICAgICAgICB9XG4gICAgfVxufVxuXG4iLCJpbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIERpdlN0eWxle1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbiAgICBib3JkZXI/OiBzdHJpbmc7XG4gICAgYm9yZGVyUmFkaXVzPzogc3RyaW5nO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KGRvbTogSFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSk6IFtIVE1MRWxlbWVudCxEaXZTdHlsZV17XG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZFN0eWxlID0gZXpKdWRnZS5qdWRnZURpdlN0eWxlKGRTdHlsZSk7XG4gICAgZGl2LnN0eWxlLndpZHRoID0gZFN0eWxlLndpZHRoLnRvU3RyaW5nKClcbiAgICBkaXYuc3R5bGUuaGVpZ2h0ID0gZFN0eWxlLmhlaWdodC50b1N0cmluZygpXG4gICAgZGl2LnN0eWxlLmJvcmRlciA9IGRTdHlsZS5ib3JkZXJcbiAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xuICAgIGRpdi5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcbiAgICBkaXYuc3R5bGUuYm94U2hhZG93ID0gJzIwcHggMTBweCA0MHB4ICM4ODg4ODgnXG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgIGRpdi5zdHlsZS56SW5kZXggPSAnMTAwMCdcbiAgICBkaXYuc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSdcbiAgICAvLyBkaXYuc3R5bGUudG9wID0gJzBweCdcbiAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgIGRpdi5zdHlsZS50b3AgPSAoKGgtZFN0eWxlLmhlaWdodCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBkaXYuc3R5bGUubGVmdCA9ICgody1kU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgZG9tLmFwcGVuZChkaXYpO1xuICAgIHJldHVybiBbZGl2LGRTdHlsZV1cbn0iLCJpbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgKiBhcyBlekRpdiBmcm9tICcuLi9EaXYvZGl2J1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IGRlbGF5X2ZyYW1lIH0gZnJvbSAnLi4vVGltZS90aW1lJ1xuXG5sZXQgaWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBEaWFsb2d1ZXtcbiAgICBpZDogbnVtYmVyXG4gICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIGRvbVBhcmVudDogSFRNTEVsZW1lbnRcbiAgICBjb25UOiBDb250ZW50XG4gICAgZFN0eWxlPzogRGl2U3R5bGVcbiAgICBzdGF0dXNWYWx1ZTogYm9vbGVhbiAgICAvL+aMiemSrueCueWHu+eKtuaAgSB0cnVl5Li66YCJ5oup5pivIGZhbHNl5Li66YCJ5oup5ZCm5oiW5Y+W5raIXG4gICAgaW50VmFsdWU6IEFycmF5PHN0cmluZz5cbiAgICBzZWxlY3RWYWx1ZTogQXJyYXk8c3RyaW5nPlxuICAgIGZpbGVzOiBGaWxlUmVhZGVyXG4gICAgY29uc3RydWN0b3IoZG9tUGFyZW50OiBIVE1MRWxlbWVudCxkU3R5bGU/OiBEaXZTdHlsZSl7XG4gICAgICAgIFt0aGlzLmRvbSx0aGlzLmRTdHlsZV0gPSBlekRpdi5jcmVhdGVEaXYoZG9tUGFyZW50LGRTdHlsZSlcbiAgICAgICAgbGV0IGNvblQgPSBuZXcgQ29udGVudCh0aGlzLmRvbSx0aGlzLmRTdHlsZSlcbiAgICAgICAgdGhpcy5jb25UID0gY29uVFxuICAgICAgICB0aGlzLnN0YXR1c1ZhbHVlID0gZmFsc2VcbiAgICAgICAgdGhpcy5kb21QYXJlbnQgPSBkb21QYXJlbnRcbiAgICAgICAgdGhpcy5pbnRWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMuc2VsZWN0VmFsdWUgPSBbXVxuICAgICAgICB0aGlzLmlkID0gaWQrK1xuICAgIH1cbiAgICBzaG93KGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZS5zZWxlZFN0ciA9IFtdXG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICB0aGlzLnN0YXR1c1ZhbHVlID0gZmFsc2VcbiAgICAgICAgbGV0IHRvcFN0ciA9IFsnMjBweCcsJzcwcHgnLCcxMzBweCcsJzIxMHB4J11cbiAgICAgICAgaWYoIWNvblN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25TdHlsZSA9IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbm9uZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgW2NoYXIsY29sb3IsdGl0bGUsY29udGVudF0gPSBlekp1ZGdlLmp1ZGdlTW9kZWwoY29uU3R5bGUudHlwZSlcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLHRpdGxlLGNvbnRlbnQpXG4gICAgICAgIGlmKGNvblN0eWxlLm5vSWNvbilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoIWNvblN0eWxlLmludFN0cilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b3BTdHIgPSBbJzIwcHgnLCc5MHB4JywnMTgwcHgnXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNyZWF0ZURsZyh0aGlzLGNvblN0eWxlLHRvcFN0cixjaGFyLGNvbG9yLGNvblN0eWxlLmJ0blN0cilcbiAgICAgICAgLy8gbGV0IGJ0biA9IHRoYXQuY29uVC5jaGlsZFt0aGF0LmNvblQuY2hpbGQubGVuZ3RoIC0gMV0uY2hpbGRbMF1cbiAgICAgICAgbGV0IGwgPSB0aGF0LmNvblQuY2hpbGRbdGhhdC5jb25ULmNoaWxkLmxlbmd0aCAtIDFdLmNoaWxkLmxlbmd0aDtcbiAgICAgICAgbGV0IGludCA9IG5ldyBBcnJheSgpXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgICAgICBpZihjb25TdHlsZS5pbnRTdHIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuaW50U3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpbnRbaV0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChjb25TdHlsZS5pbnRTdHJbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGZpbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsZScpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBsO2krKylcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgbGV0IGJ0biA9IHRoYXQuY29uVC5jaGlsZFt0aGF0LmNvblQuY2hpbGQubGVuZ3RoIC0gMV0uY2hpbGRbaV1cbiAgICAgICAgICAgICAgICBidG4uZG9tLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNmZmZmZmYnXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzAwODgwMCdcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5kb20uc3R5bGUuY29sb3IgPSAnYmx1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSA9PT0gY29uU3R5bGUuY29uZmlybVBvc2l0aW9ufHxjb25TdHlsZS5idG5TdHIubGVuZ3RoID09PSAxKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLmludFN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IGNvblN0eWxlLmludFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmludFZhbHVlLnB1c2goY29uU3R5bGUuaW50U3RyW3RdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnRWYWx1ZS5wdXNoKGludFt0XS52YWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25TdHlsZS5zZWxlZFN0cilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgY29uU3R5bGUuc2VsZWRTdHIubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25TdHlsZS5zZWxlZFN0clt0XSAhPT0gdW5kZWZpbmVkIHx8IGNvblN0eWxlLnNlbGVkU3RyW3RdICE9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuc2VsZWN0VmFsdWUucHVzaChjb25TdHlsZS5zZWxlZFN0clt0XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uU3R5bGUudHlwZSA9PT0gJ2ZpbGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGV0IGYgPSBmaWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWxlX1JlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfUmVhZGVyLm9ubG9hZCA9IHJlc3VsdCA9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmMgPSBmaWxlX1JlYWRlci5yZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIoZmMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShmYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZpbGVfUmVhZGVyLnJlYWRBc0RhdGFVUkwoKDxIVE1MSW5wdXRFbGVtZW50PmZpbGUpLmZpbGVzWzBdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsZV9SZWFkZXIucmVhZEFzVGV4dCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZmlsZSkuZmlsZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlX1JlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcigoPEhUTUxJbnB1dEVsZW1lbnQ+ZmlsZSkuZmlsZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmZpbGVzID0gZmlsZV9SZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zdGF0dXNWYWx1ZSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoYXQuc3RhdHVzVmFsdWUpXG4gICAgICAgICAgICAgICAgICAgIH0pKClcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHNldERsZ1N0eWxlKGRTdHlsZTogRGl2U3R5bGUpe1xuICAgICAgICBkU3R5bGUgPSBlekp1ZGdlLmp1ZGdlRGl2U3R5bGUoZFN0eWxlKVxuICAgICAgICBsZXQgZG9tUyA9IHRoaXMuZG9tLnN0eWxlXG4gICAgICAgIGRvbVMud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgZG9tUy5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGRvbVMuYm9yZGVyID0gZFN0eWxlLmJvcmRlclxuICAgICAgICBkb21TLmJvcmRlclJhZGl1cyA9IGRTdHlsZS5ib3JkZXJSYWRpdXNcbiAgICB9XG4gICAgaW5wdXRkbGcoY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnSW5wdXQgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaW5wdXQgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnaW5wdXQnXG4gICAgICAgIHJldHVybiB0aGlzLnNob3coY29uU3R5bGUpLyoudGhlbigpKi9cbiAgICB9XG4gICAgbGlzdGRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdTZWxlY3QgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgc2VsZWN0IHN0cmluZyEnKVxuICAgICAgICBjb25TdHlsZS50eXBlID0gJ3NlbGVjdCdcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvdyhjb25TdHlsZSlcbiAgICB9XG4gICAgZXJyb3JkbGcoY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnZXJyb3InXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub1NlbCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICBoZWxwZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdIZWxwIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGhlbHAgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnaGVscCdcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIG1zZ2JveChjb25TdHlsZT86IGNvbnRlbnRTdHlsZSxtb2RlbD86IHN0cmluZyl7XG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICBxdWVzdGRsZyhjb25TdHlsZT86IGNvbnRlbnRTdHlsZSxzdHI/OiBBcnJheTxzdHJpbmc+KXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLFwiUXVzZXQgRGlhbG9ndWVcIiwnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnKVxuICAgICAgICBjb25TdHlsZS50eXBlID0gJ3F1ZXN0J1xuICAgICAgICBjb25TdHlsZS5ub1NlbCA9IHRydWVcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvdyhjb25TdHlsZSlcbiAgICB9XG4gICAgd2FybmRsZyhjb25TdHlsZT86IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnV2FybmluZyBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCB3YXJuaW5nIHN0cmluZyEnKVxuICAgICAgICBjb25TdHlsZS50eXBlID0gJ3dhcm4nXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICByZW1vdmUoKXtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgICAgICB3aGlsZShjaGlsZCl7XG4gICAgICAgICAgICAgICAgdGhhdC5kb20ucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICAgICAgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoJ2EnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhhdC5jb25ULmNoaWxkID0gW11cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQpXG4gICAgICAgICAgICAvLyB0aGF0LmRvbS5yZW1vdmUoKVxuICAgICAgICAgICAgdGhhdC5kb20uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gICAgICAgICAgICByZXNvbHZlKDApXG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBjb250ZW50U3R5bGV7XG4gICAgLy/kvJjlhYjnuqc6IOi+k+WFpeahhiA9IOmAieaLqeahhiA+IOWFtuS7llxuICAgIHR5cGU/OiBzdHJpbmcgICAgICAgICAgIC8v5a+56K+d57G75Z6LXG4gICAgdGl0bGU/OiBzdHJpbmcgICAgICAgICAgLy/lr7nor53moIfpophcbiAgICBjb250ZW50Pzogc3RyaW5nICAgICAgICAvL+WvueivneaPkOekuuWGheWuuVxuICAgIGltZz86IHN0cmluZyAgICAgICAgICAgIC8v6Ieq5a6a5LmJ5Zu+54mHXG4gICAgYnRuU3RyPzogQXJyYXk8c3RyaW5nPiAgLy/mjInpkq7lrZfnrKZcbiAgICBpbnRTdHI/OiBBcnJheTxzdHJpbmc+ICAvL+i+k+WFpeahhuaPkOekulxuICAgIHNlbFN0cj86IEFycmF5PHN0cmluZz4gICAvL+mAieaLqeahhuWGheWuuVxuICAgIHNlbGVkU3RyPzogQXJyYXk8c3RyaW5nPiAvL+W3sumAieaLqeWGheWuuVxuICAgIG5vSWNvbj86IGJvb2xlYW4gICAgICAgIC8v6K6+572u5piv5ZCm5pyJ5Zu+5qCHXG4gICAgbm9JbnQ/OiBib29sZWFuICAgICAgICAgLy/orr7nva7mmK/lkKbmnInovpPlhaXmoYZcbiAgICBub1NlbD86IGJvb2xlYW4gICAgICAgICAvL+iuvue9ruaYr+WQpuaciemAieaLqeahhlxuICAgIGNvbmZpcm1Qb3NpdGlvbj86IG51bWJlci8v6K6+572u56Gu6K6k6ZSu55qE5L2N572u77yM6buY6K6k5Li6MOWNs+S7juW3puW+gOWPs+eahOesrOS4gOS4qlxuICAgIElzTXVsdGlwbGU/OiBzdHJpbmcgICAgIC8v5piv5ZCm5aSa6YCJXG59XG5cbmNsYXNzIENvbnRlbnR7XG4gICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIHBhcmVudDogQ29udGVudFxuICAgIGNoaWxkOiBBcnJheTxDb250ZW50PlxuICAgIGRTdHlsZTogRGl2U3R5bGVcbiAgICBjb25zdHJ1Y3Rvcihjb25UOiBDb250ZW50fEhUTUxFbGVtZW50LGRTdHlsZTogRGl2U3R5bGUpe1xuICAgICAgICBsZXQgY2hpbGQgPSBuZXcgQXJyYXkoKVxuICAgICAgICB0aGlzLmNoaWxkID0gY2hpbGRcbiAgICAgICAgaWYoY29uVCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgICAgICAgICAgdGhpcy5kb20gPSBjb25UXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuZG9tID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLndpZHRoID0gZFN0eWxlLndpZHRoLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKVxuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gZFN0eWxlLmhlaWdodC50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcidcbiAgICAgICAgICAgIHRoaXMucGFyZW50ID0gY29uVFxuICAgICAgICAgICAgY29uVC5jaGlsZC5wdXNoKHRoaXMpXG4gICAgICAgICAgICAvLyAvLyBsZXQgaCA9IHRoaXMuZG9tUGFyZW50LmNsaWVudEhlaWdodCBcbiAgICAgICAgICAgIC8vIHRoaXMuZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnYmxhY2snXG4gICAgICAgICAgICBjb25ULmRvbS5hcHBlbmQodGhpcy5kb20pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGxnSW5pdChkb206IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKSB7XG4gICAgbGV0IGRsZyA9IG5ldyBEaWFsb2d1ZShkb20sZFN0eWxlKTtcbiAgICByZXR1cm4gZGxnO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGcoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogQXJyYXk8c3RyaW5nPixpbWdTdHI/OiBzdHJpbmcsaW1nQ29sb3I/OiBzdHJpbmcsc3RyPzogQXJyYXk8c3RyaW5nPil7XG4gICAgLy8gY29uc29sZS5kaXIoZGxnKVxuICAgIGRsZy5kb20uc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJ1xuICAgIGNyZWF0ZURsZ1RpdGxlKGRsZyxjb25TdHlsZSx0b3BbMF0pXG4gICAgY3JlYXRlRGxnQ29udGVudChkbGcsY29uU3R5bGUsdG9wWzFdKVxuICAgIGlmKHRvcC5sZW5ndGggPT09IDQpXG4gICAge1xuICAgICAgICBjcmVhdGVEbGdJbWdEaXYoZGxnLGNvblN0eWxlLHRvcFsyXSxpbWdTdHIsaW1nQ29sb3IpXG4gICAgICAgIGNyZWF0ZURsZ0J0bkRpdihkbGcsY29uU3R5bGUsdG9wWzNdLHN0cilcbiAgICB9XG4gICAgZWxzZSBpZih0b3AubGVuZ3RoID09PSAzKVxuICAgIHtcbiAgICAgICAgY3JlYXRlRGxnQnRuRGl2KGRsZyxjb25TdHlsZSx0b3BbMl0sc3RyKVxuICAgIH1cbiAgICBcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnVGl0bGUoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nKXtcbiAgICBsZXQgdGl0bGVTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogNTBcbiAgICB9XG4gICAgbGV0IHRpdGxlID0gbmV3IENvbnRlbnQoZGxnLmNvblQsdGl0bGVTdHlsZSlcbiAgICAvLyBjb25zb2xlLmRpcih0aXRsZSlcbiAgICB0aXRsZS5kb20uaW5uZXJUZXh0ID0gY29uU3R5bGUudGl0bGVcbiAgICB0aXRsZS5kb20uc3R5bGUuZm9udFNpemUgPSAnMjZweCdcbiAgICB0aXRsZS5kb20uc3R5bGUuZm9udFdlaWdodCA9ICdib2xkJ1xuICAgIHRpdGxlLmRvbS5zdHlsZS50b3AgPSB0b3Bcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnQ29udGVudChkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcpe1xuICAgIGxldCBjb250ZW50U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDUwXG4gICAgfVxuICAgIGxldCBjb250ZW50ID0gbmV3IENvbnRlbnQoZGxnLmNvblQsY29udGVudFN0eWxlKVxuICAgIGNvbnRlbnQuZG9tLmlubmVyVGV4dCA9IGNvblN0eWxlLmNvbnRlbnRcbiAgICBjb250ZW50LmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4J1xuICAgIGNvbnRlbnQuZG9tLnN0eWxlLnRvcCA9IHRvcFxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdJbWdEaXYoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLHN0cjogc3RyaW5nLGNvbG9yOiBzdHJpbmcpXG57XG4gICAgbGV0IGltZ0RpdlN0eWxlID0ge1xuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICBsZXQgaW1nRGl2ID0gbmV3IENvbnRlbnQoZGxnLmNvblQsaW1nRGl2U3R5bGUpXG4gICAgaW1nRGl2LmRvbS5zdHlsZS50b3AgPSB0b3BcbiAgICBpbWdEaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBpbWdEaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcbiAgICBpZighY29uU3R5bGUuaW50U3RyfHxjb25TdHlsZS5ub0ludClcbiAgICB7XG4gICAgICAgIGRsZy5kb20uc3R5bGUuaGVpZ2h0ID0gZGxnLmRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgaWYoIWNvblN0eWxlLnNlbFN0cnx8Y29uU3R5bGUubm9TZWwpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKCFjb25TdHlsZS5pbWcpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoY29uU3R5bGUudHlwZSA9PT0gJ2ZpbGUnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGxnRmlsZShpbWdEaXYsZGxnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBjcmVhdGVEbGdJbWcoaW1nRGl2LHN0cixjb2xvcilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNyZWF0ZURsZ0ltZzAoaW1nRGl2LGNvblN0eWxlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjcmVhdGVEbGdTZWxlY3QoaW1nRGl2LGNvblN0eWxlKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGltZ0Rpdi5kb20uc3R5bGUuaGVpZ2h0ID0gKGltZ0RpdlN0eWxlLmhlaWdodCAqIGNvblN0eWxlLmludFN0ci5sZW5ndGgpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGltZ0Rpdi5kb20uc3R5bGUuZmxleERpcmVjdGlvbiA9ICdjb2x1bW4nXG4gICAgICAgIGRsZy5kb20uc3R5bGUuaGVpZ2h0ID0gKHBhcnNlSW50KGRsZy5kb20uc3R5bGUuaGVpZ2h0KSArIGltZ0RpdlN0eWxlLmhlaWdodCAqIChjb25TdHlsZS5pbnRTdHIubGVuZ3RoLTEpKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAvLyBjb25zb2xlLmRpcihjb25TdHlsZSlcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuaW50U3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNyZWF0ZURsZ0ludERpdihpbWdEaXYsY29uU3R5bGUuaW50U3RyW2ldKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdJbnREaXYoaW1nRGl2OiBDb250ZW50LGludFN0cjogc3RyaW5nKVxue1xuICAgIGxldCBpbnREaXZTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHBhcnNlSW50KGltZ0Rpdi5kb20uc3R5bGUud2lkdGgpLFxuICAgICAgICBoZWlnaHQ6IDYwXG4gICAgfVxuICAgIGxldCBpbnREaXYgPSBuZXcgQ29udGVudChpbWdEaXYsaW50RGl2U3R5bGUpXG4gICAgaW50RGl2LmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICBpbnREaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBpbnREaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2luaGVyaXQnXG4gICAgY3JlYXRlRGxnSW50KGludERpdixpbnRTdHIpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdJbWcoaW1nRGl2OiBDb250ZW50LHN0cjogc3RyaW5nLGNvbG9yOiBzdHJpbmcpe1xuICAgIGxldCBpbWdTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IDYwLFxuICAgICAgICBoZWlnaHQ6IDYwXG4gICAgfVxuICAgIGxldCBpbWcgPSBuZXcgQ29udGVudChpbWdEaXYsaW1nU3R5bGUpXG4gICAgaW1nLmRvbS5pZCA9ICdpbWcnXG4gICAgaW1nLmRvbS5pbm5lclRleHQgPSBzdHJcbiAgICBpbWcuZG9tLnN0eWxlLmZvbnRTaXplID0gJzU0cHgnXG4gICAgaW1nLmRvbS5zdHlsZS5jb2xvciA9ICd3aGl0ZSdcbiAgICBpbWcuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgIC8vIGltZy5kb20uc3R5bGUuYm9yZGVyID0gJzVweCBzb2xpZCByZWQnXG4gICAgaW1nLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJ1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdJbWcwKGltZ0RpdjogQ29udGVudCxjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICBsZXQgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICBpbWcud2lkdGggPSA2MFxuICAgIGltZy5oZWlnaHQgPSA2MFxuICAgIGltZy5zcmMgPSBjb25TdHlsZS5pbWdcbiAgICBpbWdEaXYuZG9tLmFwcGVuZChpbWcpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ludChpbWdEaXY6IENvbnRlbnQsaW50U3RyOiBzdHJpbmcpXG57XG4gICAgbGV0IGtleVN0eWxlID0ge1xuICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICBoZWlnaHQ6IDYwXG4gICAgfVxuICAgIGxldCBrZXkgPSBuZXcgQ29udGVudChpbWdEaXYsa2V5U3R5bGUpXG4gICAga2V5LmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICBrZXkuZG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnXG4gICAga2V5LmRvbS5pbm5lckhUTUwgPSBpbnRTdHIgKyAnOidcbiAgICBsZXQgaW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIGludC5pZCA9IGludFN0clxuICAgIGludC5zdHlsZS53aWR0aCA9ICcyMDBweCdcbiAgICBpbnQuc3R5bGUuaGVpZ2h0ID0gJzQwcHgnXG4gICAgaW50LnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4J1xuICAgIGludC5zdHlsZS5tYXJnaW5Ub3AgPSAnMTBweCdcbiAgICBpbWdEaXYuZG9tLmFwcGVuZChpbnQpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ZpbGUoaW1nRGl2OiBDb250ZW50LGRsZzogRGlhbG9ndWUpe1xuICAgIGxldCBmaWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgIC8vIGZpbGUuZGlzYWJsZWQgPSB0cnVlXG4gICAgZmlsZS50eXBlID0gJ2ZpbGUnXG4gICAgZmlsZS5pZCA9ICdmaWxlJ1xuICAgIGZpbGUuc3R5bGUud2lkdGggPSAnMTYwcHgnXG4gICAgZmlsZS5zdHlsZS5saW5lSGVpZ2h0ID0gJzYwcHgnXG4gICAgaW1nRGl2LmRvbS5hcHBlbmQoZmlsZSlcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnU2VsZWN0KGltZ0RpdjogQ29udGVudCxjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICBsZXQgc2VsZWN0U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzZcbiAgICB9XG4gICAgbGV0IGluZGV4ID0gZmFsc2VcbiAgICBsZXQgaW5kZXgwID0gbmV3IEFycmF5KClcbiAgICBsZXQgaW5kZXgxID0gZmFsc2VcbiAgICBsZXQgc2VsZWN0U3RyID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IFN0ciA9ICcnO1xuICAgIGxldCBjb2xvciA9ICcjMzc3MWUwJ1xuICAgIGxldCBjb2xvcjAgPSAnI2ZmZmZmZidcbiAgICBsZXQgc2VsZWN0ID0gbmV3IENvbnRlbnQoaW1nRGl2LHNlbGVjdFN0eWxlKVxuICAgIHNlbGVjdC5kb20uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCdcbiAgICBzZWxlY3QuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgIHNlbGVjdC5kb20uc3R5bGUubWFyZ2luVG9wID0gJzEycHgnXG4gICAgc2VsZWN0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAyMCdcbiAgICBsZXQgc2VsZWN0VGV4dCA9IG5ldyBDb250ZW50KHNlbGVjdCx7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzZcbiAgICB9KVxuICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9ICflsZXlvIDpgInmi6knXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIwMTAnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gJzAnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICd0b3AgMXMgbGluZWFyJ1xuICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICBsZXQgIHNlbGVjdERpdiA9IG5ldyBDb250ZW50KHNlbGVjdCx7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzZcbiAgICB9KVxuICAgIC8vIHNlbGVjdERpdi5kb20uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjODg4ODg4J1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuekluZGV4ID0gXCIyMDAwXCJcbiAgICAvLyBzZWxlY3REaXYuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgIHNlbGVjdERpdi5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgbGluZWFyJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUudG9wID0gJzBweCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJ1xuICAgIGxldCBzZWxlY3RDb250ZW50ID0gbmV3IEFycmF5KClcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0gPSBuZXcgQ29udGVudChzZWxlY3REaXYse1xuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGhlaWdodDogMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMilcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uaW5uZXJUZXh0ID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgbGluZWFyJ1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpICsgXCJweFwiIFxuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgfVxuICAgIGxldCBzZWxlY3RBbGwgPSBuZXcgQ29udGVudChzZWxlY3REaXYse1xuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICBoZWlnaHQ6IDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpXG4gICAgfSlcbiAgICBzZWxlY3RBbGwuZG9tLmlubmVyVGV4dCA9ICdzZWxlY3RBbGwnXG4gICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMXMgbGluZWFyJ1xuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIiBcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICBpZighY29uU3R5bGUuSXNNdWx0aXBsZSlcbiAgICB7XG4gICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSAnZ3JleSdcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZighaW5kZXgwW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyWzBdID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodCAhPT0gaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W3RdLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFt0XS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4MFt0XSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXgwW2ldID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbMF0gPSAnJ1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgwW2ldID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZighaW5kZXgwW2ldKVxuICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0cltpXSA9ICcnXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MFtpXSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfSAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0QWxsLmRvbS5vbmNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgICBpZighaW5kZXgxKXtcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgID0gY29sb3IwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4MSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciAgPSBjb2xvclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0cltpXSA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGV4MSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25tb3VzZWRvd24gPSBlID0+e1xuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuY29sb3IgPSBjb2xvcjBcbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25tb3VzZXVwID0gZSA9PntcbiAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgfVxuICAgIHNlbGVjdFRleHQuZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgaWYoIWluZGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuekluZGV4ID0gJzIxMDAnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmhlaWdodCA9ICgzNiAqIChjb25TdHlsZS5zZWxTdHIubGVuZ3RoICsgMikpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUudG9wID0gKCgtMzYpICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAxKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gKDM2ICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAxKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIxMDEnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5pbm5lclRleHQgPSAnQ29uZmlybSdcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmhlaWdodCA9ICczNidcbiAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gJzM2cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmhlaWdodCA9ICczNidcbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICczNnB4J1xuICAgICAgICAgICAgaW5kZXggPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSAnMjAwMCdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50b3AgPSAnMCdcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKCkgKyBcInB4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpXG4gICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKCkgKyBcInB4XCJcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLnRvcCA9ICcwJ1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIwMTAnXG4gICAgICAgICAgICBTdHIgPSAnJ1xuICAgICAgICAgICAgY29uU3R5bGUuc2VsZWRTdHIgPSBzZWxlY3RTdHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHNlbGVjdFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHNlbGVjdFN0cltpXSE9PXVuZGVmaW5lZCYmc2VsZWN0U3RyW2ldIT09JycpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTdHIgKz0gc2VsZWN0U3RyW2ldICsgJywnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgU3RyID0gU3RyLnN1YnN0cmluZygwLFN0ci5sZW5ndGggLSAxKVxuICAgICAgICAgICAgU3RyID0gY3V0U3RyaW5nKFN0ciwyMClcbiAgICAgICAgICAgIGlmKFN0ciA9PT0gJyd8fFN0ciA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIFN0ciA9ICflsZXlvIDpgInmi6knXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5pbm5lclRleHQgPSBTdHJcbiAgICAgICAgICAgIGluZGV4ID0gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnQnRuRGl2KGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxzdHI/OiBBcnJheTxzdHJpbmc+KXtcbiAgICBsZXQgQnRuRGl2U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDM1XG4gICAgfVxuICAgIGxldCBCdG5EaXYgPSBuZXcgQ29udGVudChkbGcuY29uVCxCdG5EaXZTdHlsZSlcbiAgICBsZXQgY29sb3IgPSAnIzAwZDgwMCdcbiAgICBpZihjb25TdHlsZS5pbnRTdHImJiFjb25TdHlsZS5ub0ludClcbiAgICB7XG4gICAgICAgIHRvcCA9IChwYXJzZUludCh0b3ApICsgNjAqKGNvblN0eWxlLmludFN0ci5sZW5ndGgtMSkpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgfVxuICAgIEJ0bkRpdi5kb20uc3R5bGUudG9wID0gdG9wXG4gICAgQnRuRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgaWYoIXN0cilcbiAgICB7XG4gICAgICAgIHN0ciA9IFsnT0snXVxuICAgIH1cbiAgICBpZihzdHIubGVuZ3RoID09PSAxKVxuICAgIHtcbiAgICAgICAgQnRuRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXG4gICAgICAgIGNyZWF0ZURsZ0J0bihCdG5EaXYsc3RyWzBdLDEyMCxjb2xvcilcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgQnRuRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdzcGFjZS1ldmVubHknXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ci5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpICE9PSAwKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvbG9yID0gJyNkY2RjZGMnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjcmVhdGVEbGdCdG4oQnRuRGl2LHN0cltpXSwxMDAsY29sb3IpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0J0bihCdG5EaXY6IENvbnRlbnQsc3RyOiBzdHJpbmcsd2lkdGg6IG51bWJlcixjb2xvcjogc3RyaW5nKXtcbiAgICBsZXQgYnRuU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgaGVpZ2h0OiAzNVxuICAgIH1cbiAgICBsZXQgYnRuID0gbmV3IENvbnRlbnQoQnRuRGl2LGJ0blN0eWxlKVxuICAgIGJ0bi5kb20uY2xhc3NOYW1lID0gXCJCdXR0b25cIlxuICAgIGJ0bi5kb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgYnRuLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICBidG4uZG9tLnN0eWxlLmNvbG9yID0gJ3doaXRlJ1xuICAgIGJ0bi5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE0cHgnXG4gICAgYnRuLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXG4gICAgYnRuLmRvbS5pbm5lckhUTUwgPSBzdHJcbiAgICBidG4uZG9tLnN0eWxlLmZvbnRTaXplID0gJzIycHgnXG59XG5cbmZ1bmN0aW9uIGN1dFN0cmluZyhzdHI6IHN0cmluZyxsZW46IG51bWJlcik6IHN0cmluZ3tcbiAgICBsZXQgc1xuICAgIGxldCBzMCxzMVxuICAgIGxldCBzYXJyID0gc3RyLnNwbGl0KCcsJylcbiAgICBsZXQgbCA9IHNhcnIubGVuZ3RoXG4gICAgaWYoc3RyLmxlbmd0aCA8PSBsZW4pXG4gICAge1xuICAgICAgICByZXR1cm4gc3RyXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIFxuICAgICAgICBpZigoc2FyclswXS5sZW5ndGggKyBzYXJyWzFdLmxlbmd0aCkgPj0gKGxlbi8yKS0yKVxuICAgICAgICB7XG4gICAgICAgICAgICBzMCA9IHN0ci5zdWJzdHJpbmcoMCwobGVuLzIpKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzMCA9IHNhcnJbMF0gKyAnLCcgKyBzYXJyWzFdICsgJywnXG4gICAgICAgIH1cbiAgICAgICAgaWYoKHNhcnJbbC0xXS5sZW5ndGggKyBzYXJyW2wtMl0ubGVuZ3RoKSA+PSAobGVuLzIpLTIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHNhcnJbbC0yXS5sZW5ndGggPj0gKGxlbi8yKS0yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHNhcnJbbC0xXS5sZW5ndGggPj0gKGxlbi8yKS0yKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgczEgPSBzYXJyW2wtMV0uc3Vic3RyaW5nKDAsKGxlbi8yKS0yKSArICcuLidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgczEgPSBzYXJyW2wtMV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHMxID0gc2FycltsLTJdICsgJywnICsgc2FycltsLTFdLnN1YnN0cmluZygwLChsZW4vMiktMi1zYXJyW2wtMl0ubGVuZ3RoKSArICcuLidcbiAgICAgICAgICAgIH0gICBcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgczEgPSBzYXJyW2wtMl0gKyAnLCcgKyBzYXJyW2wtMV1cbiAgICAgICAgfVxuICAgICAgICAvLyBzMSA9IHN0ci5zdWJzdHJpbmcoc3RyLmxlbmd0aC04LHN0ci5sZW5ndGgpXG4gICAgICAgIHMgPSBzMCArICcuLi4uJyArICcsJyArIHMxO1xuICAgICAgICByZXR1cm4gc1xuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gY3JlYXRlRGxnQ29uZmlybShkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcsSXNOZWVkU3RhdHVzOiBib29sZWFuKXtcbi8vICAgICBsZXQgY29uZmlybURpdlN0eWxlID0ge1xuLy8gICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbi8vICAgICAgICAgaGVpZ2h0OiAzNVxuLy8gICAgIH1cbi8vICAgICBsZXQgY29uZmlybURpdiA9IG5ldyBDb250ZW50KGRsZy5kb20sY29uZmlybURpdlN0eWxlKVxuLy8gICAgIGNvbmZpcm1EaXYuZG9tLnN0eWxlLnRvcCA9IHRvcFxuLy8gICAgIGNvbmZpcm1EaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbi8vICAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXG4vLyAgICAgbGV0IGNvbmZpcm1TdHlsZSA9IHtcbi8vICAgICAgICAgd2lkdGg6IDEyMCxcbi8vICAgICAgICAgaGVpZ2h0OiAzNVxuLy8gICAgIH1cbi8vICAgICBsZXQgY29uZmlybSA9IG5ldyBDb250ZW50KGNvbmZpcm1EaXYuZG9tLGNvbmZpcm1TdHlsZSlcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xuLy8gICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxMHB4J1xuLy8gICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzg4ODg4OCdcbi8vICAgICBjb25maXJtLmRvbS5pbm5lclRleHQgPSAnT0snXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuZm9udFNpemUgPSAnMjJweCdcbi8vICAgICBjb25maXJtLmRvbS5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuLy8gICAgICAgICAgICAgY29uZmlybS5kb20uc3R5bGUuYmFja2dyb3VuZCA9ICcjZWVlZWVlJ1xuLy8gICAgICAgICAgICAgY29uZmlybS5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjMDA4ODAwJ1xuLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4vLyAgICAgICAgICAgICBkbGcucmVtb3ZlKClcbi8vICAgICAgICAgICAgIGlmKElzTmVlZFN0YXR1cyA9PT0gdHJ1ZSlcbi8vICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgIGRsZy5zdGF0dXNWYWx1ZSA9IHRydWUgXG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbi8vIFx0XHR9KCkpXG4vLyAgICAgfVxuLy8gfVxuXG4iLCJpbXBvcnQgKiBhcyBlelV0aWxzIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcbmltcG9ydCAqIGFzIGV6UmVjdGFuZ2xlIGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgQ2xhc3MgfSBmcm9tICdlc3RyZWUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4vRWxlbWVudCdcblxuXG5leHBvcnQge1JlY3RhbmdsZX0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbi8vIGV4cG9ydCB7IEFkam9pblJlY3QsUmVjdENlbnRlciB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgKiBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9jaXJjbGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvbGluZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9hcmMnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG5leHBvcnQgKiBmcm9tICcuL1RpbWUvdGltZSdcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MnXG5leHBvcnQgKiBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuZXhwb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xuZXhwb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcbmV4cG9ydCB7IExpbmUgfSBmcm9tICcuL0dyYXBoaWMvbGluZSdcbmV4cG9ydCB7IEFyYyB9IGZyb20gJy4vR3JhcGhpYy9hcmMnXG5leHBvcnQgeyBFbGxpcHNlIH0gZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXG5leHBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi9HcmFwaGljL3BvbHlnb24nXG5leHBvcnQgeyBUZXh0IH0gZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG5leHBvcnQgeyBUaW1lIH0gZnJvbSAnLi9UaW1lL3RpbWUnXG5leHBvcnQgeyBEaWFsb2d1ZSB9IGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG4vLyBleHBvcnQgeyBtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbiBcbi8vIGxldCBFenBzeUxpc3QgPSBuZXcgQXJyYXkoKTtcblxuY2xhc3MgRXpwc3kge1xuICAgIGlkOiBudW1iZXJcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICBjU3R5bGU/OiBjYW52YXNTdHlsZVxuXG4gICAgLy8gUmVjdGFuZ2xlOiBSZWN0YW5nbGVcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSl7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuY1N0eWxlID0gY1N0eWxlO1xuICAgICAgICB0aGlzLmN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyhkb20sY1N0eWxlKTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5jdHgpXG4gICAgfVxuXG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIH1cblxuICAgIGFkZChlbDogRWxlbWVudHMpe1xuICAgICAgICAvLyBjb25zb2xlLmRpcignc3VjY2VzcycpXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgfVxuXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBwdXNoRXpwc3lMaXN0KGV6OiBFenBzeSl7XG4vLyAgICAgbGV0IG51bSA9IGV6LmlkO1xuLy8gICAgIEV6cHN5TGlzdFtudW1dID0gZXo7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpIHtcbiAgICBsZXQgZXogPSBuZXcgRXpwc3koZXpVdGlscy5Db3VudCgpLGRvbSxjU3R5bGUpO1xuICAgIC8vIHB1c2hFenBzeUxpc3QoZXopO1xuICAgIC8vIGNvbnNvbGUuZGlyKEV6cHN5TGlzdCk7XG4gICAgcmV0dXJuIGV6O1xufSJdLCJuYW1lcyI6WyJuYW1lSWQiLCJlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUiLCJlekp1ZGdlLmp1ZGdlRGl2U3R5bGUiLCJlekRpdi5jcmVhdGVEaXYiLCJlekp1ZGdlLmp1ZGdlTW9kZWwiLCJlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlIiwiZXpDYW52YXMuY3JlYXRlQ2FudmFzIiwiZXpKdWRnZS5qdWRnZUVsZW1lbnQiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O0FDREEsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BRUgsS0FBSztJQUNkLEVBQUUsQ0FBUTtJQUNWLE1BQU0sQ0FBUTtJQUNkLFNB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QyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDWCxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLElBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsRUFDdk87UUFD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QyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lB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Q0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztnQkFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7Z0JBQzlFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7YUFDNUY7WUFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7WUFDdkUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxJQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtZQUNsRixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1lBQzlCLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDcEMsR0FBRyxHQUFHLEVBQUUsQ0FBQTtZQUNSLFFBQVEsQ0FBQyxRQUFRLEdBQUcsU0FBUyxDQUFBO1lBQzdCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUN0QztnQkFDSSxJQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsS0FBRyxTQUFTLElBQUUsU0FBUyxDQUFDLENBQUMsQ0FB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
