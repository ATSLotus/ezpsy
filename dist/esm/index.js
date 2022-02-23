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
    constructor(domParent, dStyle) {
        [this.dom, this.dStyle] = createDiv(domParent, dStyle);
        this.domParent = domParent;
        this.id = id++;
    }
    errordlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Error Dialogue', 'This is default error string!');
        // conStyle.img = '../src/image/error.png'
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "X", 'red');
    }
    helpdlg(conStyle) {
        conStyle = judgeContentStyle(conStyle, 'Help Dialogue', 'This is default help string!');
        createDlg(this, conStyle, ['20px', '70px', '130px', '210px'], "!", 'orange');
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
function createDlg(dlg, conStyle, top, imgStr, imgColor) {
    dlg.dom.style.visibility = 'visible';
    createDlgTitle(dlg, conStyle, top[0]);
    createDlgContent(dlg, conStyle, top[1]);
    if (top.length === 4) {
        createDlgImg(dlg, conStyle, top[2], imgStr, imgColor);
        createDlgConfirm(dlg, conStyle, top[3]);
    }
    else if (top.length === 3) {
        createDlgConfirm(dlg, conStyle, top[2]);
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
function createDlgConfirm(dlg, conStyle, top) {
    let confirmDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    };
    let confirmDiv = new Content(dlg.dom, confirmDivStyle);
    confirmDiv.dom.style.top = top;
    confirmDiv.dom.style.display = 'flex';
    confirmDiv.dom.style.justifyContent = 'center';
    let confirmStyle = {
        width: 120,
        height: 35
    };
    let confirm = new Content(confirmDiv.dom, confirmStyle);
    confirm.dom.style.background = 'white';
    confirm.dom.style.borderRadius = '10px';
    confirm.dom.style.boxShadow = '2px 2px 20px #888888';
    confirm.dom.innerText = 'OK';
    confirm.dom.style.fontSize = '22px';
    confirm.dom.onmousedown = function () {
        (async function () {
            confirm.dom.style.background = '#eeeeee';
            confirm.dom.style.boxShadow = '2px 2px 20px #008800';
            await delay_frame(10);
            let child = dlg.dom.lastElementChild;
            while (child) {
                dlg.dom.removeChild(child);
                child = dlg.dom.lastElementChild;
            }
            dlg.dom.remove();
            await delay_frame(10);
        }());
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9Hcm91cC9ncm91cC50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL0NhbnZhcy9jYW52YXMudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL0Rpdi9kaXYudHMiLCIuLi8uLi9zcmMvRGlhbG9ndWUvZGlhbG9ndWUudHMiLCIuLi8uLi9zcmMvZXpwc3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXHJcbmxldCBpZFN0YXJ0ID0gMDtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDb3VudCgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIGlkU3RhcnQrKztcclxufSIsImltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJztcclxuaW1wb3J0IHsganVkZ2VFbGVtZW50IH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuXHJcbmxldCBncm91cElkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBHcm91cHtcclxuICAgIGlkOiBudW1iZXJcclxuICAgIGxlbmd0aDogbnVtYmVyXHJcbiAgICBncm91cExpc3Q6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cFxyXG4gICAgXHJcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwKXtcclxuXHJcbiAgICAgICAgdGhpcy5pZCA9IGdyb3VwSWQ7XHJcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBHcm91cClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ncm91cExpc3QgPSBlbDtcclxuXHJcbiAgICAgICAgZ3JvdXBJZCsrIFxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcblxyXG5leHBvcnQgY2xhc3MgRWxlbWVudHN7XHJcbiAgICBzaGFwZT86IFNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlIFxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbiAgICBub0ZpbGwoKXtcclxuICAgICAgICB0aGlzLnN0eWxlLmZpbGwgPSAnbm9uZSc7XHJcbiAgICB9XHJcbiAgICBub1N0cm9rZSgpe1xyXG4gICAgICAgIHRoaXMuc3R5bGUubGluZVdpZHRoID0gMDtcclxuICAgICAgICAvLyBpZih0aGlzLnN0eWxlLmZpbGwgIT09ICdub25lJyAmJiB0aGlzLnN0eWxlLmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXHJcbiAgICAgICAgLy8gfVxyXG4gICAgICAgIC8vIGVsc2V7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XHJcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKCdFcnJvciEnKVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnXHJcbmltcG9ydCB7RWxlbWVudHN9IGZyb20gJy4uL0VsZW1lbnQnXHJcblxyXG5cclxuaW50ZXJmYWNlIFJlY3RhbmdsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICB3aWR0aDogbnVtYmVyLFxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IFJlY3RhbmdsZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmNsYXNzIENlbnRlcntcclxuICAgIHJlY3Q6IFJlY3RhbmdsZVxyXG4gICAgeDogbnVtYmVyXHJcbiAgICB5OiBudW1iZXJcclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgdGhpcy5yZWN0ID0gcmVjdDtcclxuICAgICAgICB0aGlzLnggPSByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoIC8gMjtcclxuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpemV7XHJcbiAgICByZWN0OiBSZWN0YW5nbGVcclxuICAgIHdpZHRoOiBudW1iZXJcclxuICAgIGhlaWdodDogbnVtYmVyXHJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XHJcbiAgICAgICAgdGhpcy53aWR0aCA9IHJlY3Quc2hhcGUud2lkdGhcclxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNpZGVYWXtcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICBjb25zdHJ1Y3Rvcigpe1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFJlY3RHcm91cCBleHRlbmRzIEdyb3VwIHtcclxuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSxlbDogRWxlbWVudHNbXSl7XHJcbiAgICAgICAgc3VwZXIoZWwpXHJcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XHJcbiAgICB9XHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcclxuLy8gICAgIHg6IG51bWJlclxyXG4vLyAgICAgeTogbnVtYmVyXHJcbi8vICAgICB3aWR0aDogbnVtYmVyXHJcbi8vICAgICBoZWlnaHQ6IG51bWJlclxyXG4vLyB9XHJcblxyXG5leHBvcnQgY2xhc3MgUmVjdGFuZ2xlIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJyZWN0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogUmVjdGFuZ2xlT3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgbG9naWNSZWN0IGV4dGVuZHMgUmVjdGFuZ2xle1xyXG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XHJcbiAgICByZWN0UGFyZW50czE6IFJlY3RhbmdsZTtcclxuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICB9fSlcclxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxyXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMxID0gcmVjdFBhcmVudHMxXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIGNsaXBSZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xyXG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XHJcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIHVuaW9uUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcclxuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBmdW5jdGlvbiBpbnN0YW5jZW9mUmVjdGFuZ2xlKGU6IGFueSk6IGUgaXMgUmVjdGFuZ2xlU2hhcGV7XHJcbi8vICAgICByZXR1cm4gIGluIGU7XHJcbi8vIH1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcclxuLy8gICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XHJcbi8vICAgICBsZXQgc3QgPSByZWN0LnN0eWxlO1xyXG4vLyAgICAgbGV0IGYscztcclxuLy8gICAgIC8vIGNvbnNvbGUuZGlyKHN0LnN0cm9rZSlcclxuLy8gICAgIFtjdHgsZixzXSA9IGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xyXG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xyXG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XHJcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbi8vICAgICAgICAgY3R4LmZpbGxSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZSBpZihzdC5maWxsID09PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSAnbm9uZScpe1xyXG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcclxuLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbi8vICAgICB9XHJcbi8vICAgICBlbHNle1xyXG4vLyAgICAgICAgIGNvbnNvbGUuZGlyKFwiZXJyb3IhSXQgY2FuJ3QgcGFpbnQgYSByZWN0YW5nbGUgd2l0aG91dCBmaWxsU3R5bGUgYW5kIHN0cm9rZVN0eWxlXCIpXHJcbi8vICAgICB9XHJcbiAgICBcclxuLy8gICAgIHJldHVybiByZWN0O1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XHJcbiAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xyXG4gICAgY3R4LnJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XHJcbiAgICBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIHJldHVybiByZWN0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQWRqb2luUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZml4ZWRTdHlsZT86IHN0cmluZ3xudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+efqeW9ouaLvOaOpSBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaLvOaOpeefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xyXG4gICAgbGV0IG5ld1JlY3Q7XHJcbiAgICBpZighZml4ZWRTdHlsZSlcclxuICAgIHtcclxuICAgICAgICBmaXhlZFN0eWxlID0gJ1JFQ1RMRUZUJ1xyXG4gICAgfVxyXG4gICAgbGV0IGYgPSBqdWRnZUNoYW5nZVR5cGUoZml4ZWRTdHlsZSk7XHJcbiAgICAvLyBjb25zb2xlLmRpcignZj0nK2YpO1xyXG4gICAgaWYoZiA9PT0gMSl7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfTGVmdChmaXhlZFJlY3QscmVjdCk7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIobmV3UmVjdClcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gMil7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfVG9wKGZpeGVkUmVjdCxyZWN0KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gMyl7XHJcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfUmlnaHQoZml4ZWRSZWN0LHJlY3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSA0KXtcclxuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Cb3R0b20oZml4ZWRSZWN0LHJlY3QpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IG9yZGVyIScpXHJcbiAgICB9XHJcbiAgICBcclxuICAgIFxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZnVuY3Rpb24gUmVjdF9MZWZ0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggLSByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlY3RfUmlnaHQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xyXG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5mdW5jdGlvbiBSZWN0X1RvcChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XHJcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXHJcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55IC0gcmVjdC5zaGFwZS5oZWlnaHQsXHJcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxuICAgIHJldHVybiBuZXdSZWN0XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFJlY3RfQm90dG9tKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcclxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdENlbnRlcihyZWN0OiBSZWN0YW5nbGUpOiBDZW50ZXJ7XHJcbiAgICAvL+iOt+WPluefqeW9ouS4reW/g1xyXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIocmVjdCk7XHJcbiAgICByZXR1cm4gY2VudGVyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxzaWRlMD86IG51bWJlcnxzdHJpbmcsc2lkZTE/OiBudW1iZXJ8c3RyaW5nKTogUmVjdGFuZ2xle1xyXG4gICAgLy/nn6nlvaLlr7npvZAgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXlr7npvZDnn6nlvaIgZml4ZWRTdHlsZSDlr7npvZDlvaLlvI9cclxuICAgIGlmKHNpZGUwID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHNpZGUwID0gMFxyXG4gICAgICAgIHNpZGUxID0gMFxyXG4gICAgfVxyXG4gICAgaWYoc2lkZTEgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgc2lkZTEgPSAwXHJcbiAgICB9XHJcblxyXG4gICAgaWYocmVjdC5zaGFwZS53aWR0aCpyZWN0LnNoYXBlLmhlaWdodCA+IGZpeGVkUmVjdC5zaGFwZS53aWR0aCpmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IClcclxuICAgIHtcclxuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhVGhlIGFyZWEgb2YgZmlleGVkUmVjdCAgaXMgc21hbGxlciB0aGFuIHRoZSByZWN0IScpXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGxldCBbZjAsZjFdID0ganVkZ2VTaWRlKHNpZGUwLHNpZGUxKTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihmMCtcIiBcIitmMSk7XHJcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgc2hhcGU6e1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAxMDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBzID0gbmV3IFNpZGVYWSgpO1xyXG4gICAgICAgIGlmKGYwID09PSAwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDEgfHwgZjEgPT09IDMpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XHJcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xyXG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGYwID09PSAxIHx8IGYwID09PSAzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcclxuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcclxuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIocylcclxuICAgICAgICBcclxuICAgICAgICBuZXdSZWN0LnNoYXBlLnggPSBzLng7XHJcbiAgICAgICAgbmV3UmVjdC5zaGFwZS55ID0gcy55O1xyXG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBcclxufVxyXG5cclxuZnVuY3Rpb24gQWxpZ25YWShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZjogbnVtYmVyKTogU2lkZVhZe1xyXG4gICAgbGV0IHMgPSBuZXcgU2lkZVhZKClcclxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKGZpeGVkUmVjdCk7XHJcbiAgICAvLyBjb25zb2xlLmRpcihjZW50ZXIpXHJcbiAgICBpZihmID09PSAwKVxyXG4gICAgeyAgIFxyXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gcmVjdC5zaGFwZS53aWR0aC8yXHJcbiAgICAgICAgcy55ID0gY2VudGVyLnkgLSByZWN0LnNoYXBlLmhlaWdodC8yXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDEpXHJcbiAgICB7XHJcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMlxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihmID09PSAyKVxyXG4gICAge1xyXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGYgPT09IDMpXHJcbiAgICB7XHJcbiAgICAgICAgcy54ID0gY2VudGVyLnggKyBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMiAtIHJlY3Quc2hhcGUud2lkdGhcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZiA9PT0gNClcclxuICAgIHtcclxuICAgICAgICBzLnkgPSBjZW50ZXIueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMiAtIHJlY3Quc2hhcGUuaGVpZ2h0XHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgIH1cclxuICAgIHJldHVybiBzXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBPZmZzZXRSZWN0KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xyXG4gICAgLy/nn6nlvaLlubPnp7tcclxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgeTogeSxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQXJyYW5nZVJlY3RzKG46IG51bWJlcixbeE51bWJlcix5TnVtYmVyXTogW251bWJlcixudW1iZXJdLHdpbmRvd1JlY3Q6IFJlY3RhbmdsZSxzdHlsZT86IG51bWJlcik6IFJlY3RHcm91cHtcclxuICAgIC8v5Yib5bu655+p5b2i6Zi15YiXXHJcbiAgICBsZXQgcmVjdCA9IG5ldyBBcnJheSgpO1xyXG4gICAgXHJcbiAgICBsZXQgbnVtID0geE51bWJlciAqIHlOdW1iZXJcclxuICAgIGxldCB4ID0gd2luZG93UmVjdC5zaGFwZS54XHJcbiAgICBsZXQgeSA9IHdpbmRvd1JlY3Quc2hhcGUueVxyXG4gICAgbGV0IHdpZHRoID0gd2luZG93UmVjdC5zaGFwZS53aWR0aCAvIHhOdW1iZXJcclxuICAgIGxldCBoZWlnaHQgPSB3aW5kb3dSZWN0LnNoYXBlLmhlaWdodCAvIHlOdW1iZXJcclxuICAgIC8vIGNvbnNvbGUuZGlyKFt4LHksd2lkdGgsaGVpZ2h0XSlcclxuXHJcbiAgICBpZihuID4gbnVtKXtcclxuICAgICAgICBuID0gbnVtXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBzdHlsZSA9IDA7XHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3R5bGUgPiAxKVxyXG4gICAge1xyXG4gICAgICAgIHN0eWxlID0gMFxyXG4gICAgfVxyXG5cclxuICAgIGlmKHN0eWxlID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpZHRoICogaixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2luZG93UmVjdC5zaGFwZS53aWR0aCAtIHdpZHRoIC0gd2lkdGggKiBqLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBjb25zb2xlLmRpcihyZWN0KVxyXG5cclxuICAgIGxldCByZWN0R3JvdXAgPSBuZXcgUmVjdEdyb3VwKHdpbmRvd1JlY3QscmVjdCk7XHJcbiAgICByZXR1cm4gcmVjdEdyb3VwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcclxuICAgIC8v56e75Yqo55+p5b2i6Iez5p+Q55+p5b2i5Lit5b+DIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5pON5L2c55+p5b2iIGZpeGVkU3R5bGUg5ou85o6l5b2i5byPXHJcbiAgICBsZXQgbmV3UmVjdCA9IEFsaWduUmVjdChmaXhlZFJlY3QscmVjdCwwLDApO1xyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3RPblBvaW50KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xyXG4gICAgbGV0IG5ld1JlY3QgPSBPZmZzZXRSZWN0KHJlY3QsW3gseV0pXHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdFdpZHRoKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIC8v6I635Y+W55+p5b2i5a695bqmXHJcbiAgICBsZXQgd2lkdGggPSByZWN0LnNoYXBlLndpZHRoXHJcbiAgICByZXR1cm4gd2lkdGhcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RIZWlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xyXG4gICAgLy/ojrflj5bnn6nlvaLpq5jluqZcclxuICAgIGxldCBoZWlnaHQgPSByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgcmV0dXJuIGhlaWdodDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RTaXplKHJlY3Q6IFJlY3RhbmdsZSk6IFNpemV7XHJcbiAgICAvL+iOt+WPluefqeW9ouWuvemrmFxyXG4gICAgbGV0IHNpemUgPSBuZXcgU2l6ZShyZWN0KVxyXG4gICAgcmV0dXJuIHNpemU7XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcclxuLy8gICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXHJcbi8vICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0MC5zaGFwZS54LHJlY3QwLnNoYXBlLnkscmVjdDAuc2hhcGUud2lkdGgscmVjdDAuc2hhcGUuaGVpZ2h0XVxyXG4vLyAgICAgbGV0IFt4MSx5MSx3MSxoMV0gPSBbcmVjdDEuc2hhcGUueCxyZWN0MS5zaGFwZS55LHJlY3QxLnNoYXBlLndpZHRoLHJlY3QxLnNoYXBlLmhlaWdodF1cclxuLy8gICAgIGxldCBSZWN0LHhuLHluLHduLGhuO1xyXG4vLyAgICAgbGV0IGFyZWEwID0gdzAgKiBoMDtcclxuLy8gICAgIGxldCBhcmVhMSA9IHcxICogaDE7XHJcbi8vICAgICBsZXQgeCx5LHcsaFxyXG4vLyAgICAgbGV0IHh0LHl0LHd0LGh0LHJlY3RcclxuLy8gICAgIGlmKGFyZWEwID49IGFyZWExKVxyXG4vLyAgICAge1xyXG4vLyAgICAgICAgIFt4LHksdyxoXSA9IFt4MSx5MSx3MSxoMV07XHJcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MCx5MCx3MCxoMF07XHJcbi8vICAgICAgICAgcmVjdCA9IHJlY3QwO1xyXG4vLyAgICAgfVxyXG4vLyAgICAgZWxzZXtcclxuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDAseTAsdzAsaDBdO1xyXG4vLyAgICAgICAgIFt4dCx5dCx3dCxodF0gPSBbeDEseTEsdzEsaDFdO1xyXG4vLyAgICAgICAgIHJlY3QgPSByZWN0MTtcclxuLy8gICAgIH1cclxuLy8gICAgIGNvbnNvbGUuZGlyKFt4LHksdyxoXSk7XHJcbi8vICAgICBjb25zb2xlLmRpcihbeHQseXQsd3QsaHRdKVxyXG4vLyAgICAgaWYoIUlzSW5SZWN0KFt4LHldLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHkraF0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4LHkraF0scmVjdCkpe1xyXG4vLyAgICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cclxuLy8gICAgIH1cclxuLy8gICAgIGVsc2V7XHJcbi8vICAgICAgICAgd24gPSBNYXRoLmFicyhNYXRoLm1pbih4MCArIHcwICx4MSArIHcxKSAtIE1hdGgubWF4KHgwLCB4MSkpXHJcbi8vICAgICAgICAgaG4gPSBNYXRoLmFicyhNYXRoLm1pbih5MCArIGgwLCB5MSArIGgxKSAtIE1hdGgubWF4KHkwLCB5MSkpXHJcbi8vICAgICAgICAgaWYoSXNJblJlY3QoW3gseV0scmVjdCkpe1xyXG4vLyAgICAgICAgICAgICB4biA9IHg7XHJcbi8vICAgICAgICAgICAgIHluID0geTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSBpZigoeCA+PSB4dCAmJiB4PD14dCt3dCkgJiYgKHkgPCB5dCB8fCB5ID4geXQraHQpKXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4O1xyXG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZSBpZigoeCA8IHh0IHx8IHggPiB4dCt3dCkgJiYgKHkgPj0geXQgJiYgeSA8PSB5dCtodCkpe1xyXG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxyXG4vLyAgICAgICAgICAgICB5biA9IHlcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZXtcclxuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcclxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobilcclxuLy8gICAgICAgICB9XHJcbiAgICAgICAgXHJcbi8vICAgICAgICAgUmVjdCA9IFt4bix5bix3bixobl07XHJcbiAgICAgICAgXHJcbi8vICAgICB9XHJcblxyXG4vLyAgICAgbGV0IG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XHJcblxyXG4vLyAgICAgcmV0dXJuIG5ld1JlY3Q7XHJcblxyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XHJcbiAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xyXG4gICAgbGV0IG5ld1JlY3QsUmVjdFxyXG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcclxuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XHJcbiAgICBsZXQgeCx5LHcsaFxyXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XHJcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcclxuICAgIGlmKElzSW5SZWN0KFt4bDAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4bDEseWIxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5YjFdLHJlY3QwKSlcclxuICAgIHtcclxuICAgICAgICB4ID0gTWF0aC5tYXgoeGwwLHhsMSk7XHJcbiAgICAgICAgeSA9IE1hdGgubWF4KHl0MCx5dDEpO1xyXG4gICAgICAgIHcgPSBNYXRoLm1pbih4cjAseHIxKSAtIHg7XHJcbiAgICAgICAgaCA9IE1hdGgubWluKHliMCx5YjEpIC0geTtcclxuICAgICAgICBSZWN0ID0gW3gseSx3LGhdXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cclxuICAgIH1cclxuXHJcbiAgICBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xyXG5cclxuICAgIHJldHVybiBuZXdSZWN0O1xyXG5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzSW5SZWN0KFt4LHldOiBbbnVtYmVyLG51bWJlcl0scmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcclxuICAgIC8v5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXHJcbiAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtyZWN0LnNoYXBlLngscmVjdC5zaGFwZS55LHJlY3Quc2hhcGUud2lkdGgscmVjdC5zaGFwZS5oZWlnaHRdXHJcbiAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGVsc2VcclxuICAgIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBHcm93UmVjdChlbDogUmVjdGFuZ2xlLyp8UmVjdEdyb3VwfEdyb3VwKi8saDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcclxuICAgIC8v5q2j5pS+6LSf57ypIFxyXG4gICAgLy8gaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXHJcbiAgICAvLyB7XHJcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICAgICAgc2hhcGU6e1xyXG4gICAgICAgICAgICAgICAgeDplbC5zaGFwZS54IC0gaCxcclxuICAgICAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggKyAyKmgsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55IC0gdixcclxuICAgICAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgKyAyKnZcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIG5ld1JlY3RcclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBSZWN0R3JvdXApXHJcbiAgICAvLyB7XHJcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueCAtPSBoO1xyXG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS55IC09IHY7XHJcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUuaGVpZ2h0ICs9IDIqdjtcclxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcclxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxyXG4gICAgLy8gICAgIHtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnkgLT0gdjtcclxuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gfVxyXG4gICAgLy8gZWxzZXtcclxuICAgIC8vICAgICBjb25zb2xlLmRpcihcIuexu+Wei+mUmeivr1wiKVxyXG4gICAgLy8gfVxyXG59ICAgICAgIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEluc2V0UmVjdChlbDogUmVjdGFuZ2xlLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XHJcbiAgICAvL+ato+e8qei0n+aUvlxyXG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OmVsLnNoYXBlLnggKz0gaCxcclxuICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCAtPSAyKmgsXHJcbiAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgKz0gdixcclxuICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCAtPSAyKnZcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFNjYWxlUmVjdChyZWN0OiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcclxuICAgIC8v5q+U5L6L57yp5pS+XHJcbiAgICBsZXQgaDAgPSByZWN0LnNoYXBlLndpZHRoICogKGgtMSkgLyAyXHJcbiAgICBsZXQgdjAgPSByZWN0LnNoYXBlLmhlaWdodCAqICh2LTEpIC8gMlxyXG4gICAgY29uc29sZS5kaXIoaDArJyAnK3YwKVxyXG4gICAgbGV0IG5ld1JlY3QgPSBHcm93UmVjdChyZWN0LGgwLHYwKVxyXG4gICAgcmV0dXJuIG5ld1JlY3RcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIElzRW1wdHlSZWN0KHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XHJcbiAgICAvL+WIpOaWreefqemYteaYr+WQpuS4uuepulxyXG4gICAgbGV0IGFyZWEgPSByZWN0LnNoYXBlLndpZHRoICogcmVjdC5zaGFwZS5oZWlnaHQ7XHJcbiAgICBpZihhcmVhID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdE9mTWF0cml4KCl7XHJcblxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdExlZnQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xyXG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gUmVjdFJpZ2h0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIHJldHVybiByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZWN0VG9wKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcclxuICAgIHJldHVybiByZWN0LnNoYXBlLnlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RCb3RvbShyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XHJcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHRcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFVuaW9uUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiB1bmlvblJlY3R7XHJcbiAgICBsZXQgbmV3UmVjdDtcclxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XHJcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xyXG4gICAgbGV0IHgseSx3LGhcclxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xyXG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XHJcbiAgICB4ID0gTWF0aC5taW4oeGwwLHhsMSk7XHJcbiAgICB5ID0gTWF0aC5taW4oeXQwLHl0MSk7XHJcbiAgICB3ID0gTWF0aC5tYXgoeHIwLHhyMSkgLSB4O1xyXG4gICAgaCA9IE1hdGgubWF4KHliMCx5YjEpIC0geTtcclxuICAgIG5ld1JlY3QgPSBuZXcgdW5pb25SZWN0KFt4LHksdyxoXSxyZWN0MCxyZWN0MSk7XHJcbiAgICByZXR1cm4gbmV3UmVjdFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRmlsbFJlY3QocmVjdDogUmVjdGFuZ2xlLGZpbGw/OiBzdHJpbmcpOiBSZWN0YW5nbGV7XHJcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIGZpbGwgPSAnIzAwMCdcclxuICAgIH1cclxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcclxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxyXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVjdDBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUmVjdChyZWN0OiBSZWN0YW5nbGUsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFJlY3RhbmdsZXtcclxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xyXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiByZWN0LnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcclxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxyXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcmVjdDBcclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICByOiBudW1iZXJcclxufVxyXG5cclxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IENpcmNsZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IENpcmNsZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcclxuICAgIGxldCBzaCA9IGNpcmNsZS5zaGFwZVxyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcclxuICAgIGp1ZGdlU3R5bGUoY2lyY2xlLGN0eCk7XHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuICAgIHJldHVybiBjaXJjbGU7XHJcbn0gXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xyXG4gICAgbGV0IGNpcmNsZSA9IG5ldyBDaXJjbGUoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IHgsXHJcbiAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgIHI6IHJcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxyXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGNpcmNsZVxyXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIExpbmVTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgeDogbnVtYmVyLFxyXG4gICAgeTogbnVtYmVyLFxyXG4gICAgeEVuZDogbnVtYmVyLFxyXG4gICAgeUVuZDogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBMaW5lT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogTGluZVNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcImxpbmVcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBMaW5lT3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXHJcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxyXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG5hbWVJZCsrXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xyXG4vLyAgICAgbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XHJcbi8vICAgICAgICAgbGV0IGwgPSB0aGlzLm1ha2VMaW5lKGxpbmUsY3R4KTtcclxuLy8gICAgICAgICByZXR1cm4gbDtcclxuLy8gICAgIH1cclxuLy8gfVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xyXG4gICAgbGV0IHNoID0gbGluZS5zaGFwZTtcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXHJcbiAgICBjdHgubGluZVRvKHNoLnhFbmQsc2gueUVuZClcclxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICByZXR1cm4gbGluZVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd0xpbmVzKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCk6IEdyb3Vwe1xyXG4gICAgLy/nu5jliLblpJrmnaHnur8gb3B0czrnur/mnaHlsZ7mgKdcclxuICAgIGxldCBncm91cCA9IG5ldyBHcm91cChlbClcclxuICAgIHJldHVybiBncm91cFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRHJhd01saW5lKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sZ2FwPzogbnVtYmVyW10sc3R5bGU/OiBib29sZWFuLHN0aXBwbGU/OiBib29sZWFuLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcclxuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyBnYXDnur/kuYvpl7TnmoTpl7TpmpQgc3R5bGU9ZmFsc2XkuLrmsLTlubPlubPooYwsPXRydWXkuLrnq5bnm7TlubPooYwgc3RpcHBsZT1mYWxzZeS4uuWunue6vyw9dHJ1ZeS4uuiZmue6v1xyXG4gICAgaWYod2lkdGhHYXAgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygd2lkdGhHYXAgIT09ICdudW1iZXInKVxyXG4gICAge1xyXG4gICAgICAgIHdpZHRoR2FwID0gMTA7XHJcbiAgICAgICAgaWYoc3RpcHBsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGlwcGxlICE9PSAnYm9vbGVhbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdGlwcGxlID09PSBmYWxzZVxyXG4gICAgICAgICAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHlsZSAhPT0gJ2Jvb2xlYW4nKXtcclxuICAgICAgICAgICAgICAgIHN0eWxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBpZihnYXAgPT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gWzEwMCwxMDBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBvcHRzID0gbmV3IEFycmF5KCk7XHJcbiAgICBcclxuICAgIGlmKHN0aXBwbGUgPT09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIG9wdHNbMF0gPSBuZXcgTGluZSAoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgIHk6IHksXHJcbiAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxyXG4gICAgICAgICAgICAgICAgeUVuZDogeUVuZFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeStnYXBbaS0xXSppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kK2dhcFtpLTFdKmlcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xyXG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lICh7XHJcbiAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCtnYXBbaS0xXSppLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB4RW5kOiB4RW5kK2dhcFtpLTFdKmksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBvcHRzWzBdID0gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdLHdpZHRoR2FwKTtcclxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4LHkrZ2FwW2ktMV0qaSx4RW5kLHlFbmQrZ2FwW2ktMV0qaV0sd2lkdGhHYXApXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCtnYXBbaS0xXSppLHkseEVuZCtnYXBbaS0xXSppLHlFbmRdLHdpZHRoR2FwKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICAgICAgXHJcbiAgICBcclxuICAgIGxldCBncm91cCA9IERyYXdMaW5lcyhvcHRzKTtcclxuICAgIHJldHVybiBncm91cFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSx3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XHJcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgd2lkdGhHYXDpl7TpmpQgXHJcbiAgICBsZXQgbGluZWxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyh4RW5kLXgsMikrTWF0aC5wb3coeUVuZC15LDIpKVxyXG4gICAgaWYod2lkdGhHYXA+bGluZWxlbmd0aHx8d2lkdGhHYXA9PT11bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgd2lkdGhHYXAgPSBsaW5lbGVuZ3RoLzEwO1xyXG4gICAgfVxyXG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IobGluZWxlbmd0aC93aWR0aEdhcClcclxuICAgIGxldCB4ZyA9IHdpZHRoR2FwKih4RW5kLXgpL2xpbmVsZW5ndGhcclxuICAgIGxldCB5ZyA9IHdpZHRoR2FwKih5RW5kLXkpL2xpbmVsZW5ndGhcclxuICAgIC8vIGNvbnNvbGUuZGlyKG51bSlcclxuICAgIGxldCBpID0gMDtcclxuICAgIGxldCBsaW5lID0gbmV3IEFycmF5KCk7XHJcbiAgICB3aGlsZShpPG51bSlcclxuICAgIHtcclxuICAgICAgICBsaW5lW2ldID0gbmV3IExpbmUoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgeDogeCt4ZyppLFxyXG4gICAgICAgICAgICAgICAgeTogeSt5ZyppLFxyXG4gICAgICAgICAgICAgICAgeEVuZDogeCt4ZyooaSsxKSxcclxuICAgICAgICAgICAgICAgIHlFbmQ6IHkreWcqKGkrMSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgaSs9MjtcclxuICAgIH1cclxuICAgIGxldCBMaW5lU3RpcHBsZSA9IG5ldyBHcm91cChsaW5lKVxyXG4gICAgcmV0dXJuIExpbmVTdGlwcGxlXHJcbn1cclxuXHJcbi8vIGV4cG9ydCBjbGFzcyBQb2x5IGV4dGVuZHMgR3JvdXB7XHJcbi8vICAgICBzdHlsZTogU3R5bGVcclxuLy8gICAgIGNvbnN0cnVjdG9yKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCxzdHlsZT86IFN0eWxlKXtcclxuLy8gICAgICAgICBzdXBlcihlbClcclxuLy8gICAgICAgICBpZihzdHlsZSlcclxuLy8gICAgICAgICB7XHJcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgICAgZWxzZXtcclxuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuLy8gICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4vLyAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuLy8gICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4vLyAgICAgICAgICAgICB9XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfVxyXG4vLyB9IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcclxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xyXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcclxuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIEFyY1NoYXBlIGV4dGVuZHMgU2hhcGV7XHJcbiAgICB4OiBudW1iZXIsXHJcbiAgICB5OiBudW1iZXIsXHJcbiAgICByOiBudW1iZXIsXHJcbiAgICBhbmdfZjogbnVtYmVyLFxyXG4gICAgYW5nX2U6IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgQXJjT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogQXJjU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxufVxyXG5cclxubGV0IG5hbWVJZCA9IDA7XHJcblxyXG5leHBvcnQgY2xhc3MgQXJjIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJhcmNcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBBcmNPcHRzKXtcclxuICAgICAgICBzdXBlcigpXHJcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcclxuICAgICAgICBpZihvcHRzLnN0eWxlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcclxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbmFtZUlkKytcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XHJcbiAgICBsZXQgc3QgPSBhcmMuc3R5bGVcclxuICAgIGlmKHN0LmZpbGwgPT09IHVuZGVmaW5lZCB8fCBzdC5maWxsID09PSAnbm9uZScgfHwgc3QuZmlsbCA9PT0gJyNmZmYnKVxyXG4gICAge1xyXG4gICAgICAgIG1ha2VGcmFtZUFyYyhhcmMsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgbWFrZUZpbGxBcmMoYXJjLGN0eCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXJjO1xyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXHJcbiAgICBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xyXG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBtYWtlRmlsbEFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXHJcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XHJcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxyXG4gICAgY3R4LnN0cm9rZSgpXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICAvLyBjdHguYmVnaW5QYXRoKClcclxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxyXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2UpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZSkpO1xyXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcclxuICAgIGN0eC5zdHJva2UoKVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLHNoLmFuZ19mLHNoLmFuZ19lKTtcclxuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XHJcbiAgICBcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVBcmMoYXJjOiBBcmMsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IEFyY3tcclxuICAgIC8v55S757KX57q/5bynIFxyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIC8vIGp1ZGdlU3R5bGVfZXpzeShhcmMpXHJcblxyXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxyXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxyXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBhcmMwXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsQXJjKGFyYzogQXJjLGZpbGw/OiBzdHJpbmcpOiBBcmN7XHJcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxyXG4gICAge1xyXG4gICAgICAgIGZpbGwgPSAnIzAwMCdcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xyXG4gICAgICAgIHNoYXBlOiB7XHJcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcclxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXHJcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXHJcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0eWxlOiB7XHJcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiBhcmMwXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBFbGxpcHNlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIHg/OiBudW1iZXIsXHJcbiAgICB5PzogbnVtYmVyLFxyXG4gICAgcmE/OiBudW1iZXIsXHJcbiAgICByYj86IG51bWJlclxyXG4gICAgLy9yYeS4uuaoqui9tOmVvyByYuS4uue6tei9tOmVv1xyXG59XHJcblxyXG5pbnRlcmZhY2UgRWxsaXBzZU9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IEVsbGlwc2VTaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJlbGxpcHNlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogRWxsaXBzZU9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XHJcbiAgICAvL21heOaYr+etieS6jjHpmaTku6Xplb/ovbTlgLxh5ZKMYuS4reeahOi+g+Wkp+iAhVxyXG4gICAgLy9p5q+P5qyh5b6q546v5aKe5YqgMS9tYXjvvIzooajnpLrluqbmlbDnmoTlop7liqBcclxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxyXG4gICAgbGV0IHNoID0gZWxsaXBzZS5zaGFwZVxyXG4gICAgbGV0IHN0ZXAgPSAoc2gucmEgPiBzaC5yYikgPyAxIC8gc2gucmEgOiAxIC8gc2gucmI7XHJcbiAgICBjdHguYmVnaW5QYXRoKCk7XHJcbiAgICBjdHgubW92ZVRvKHNoLnggKyBzaC5yYSwgc2gueSk7IC8v5LuO5qSt5ZyG55qE5bem56uv54K55byA5aeL57uY5Yi2XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKiBNYXRoLlBJOyBpICs9IHN0ZXApXHJcbiAgICB7XHJcbiAgICAgICAgLy/lj4LmlbDmlrnnqIvkuLp4ID0gYSAqIGNvcyhpKSwgeSA9IGIgKiBzaW4oaSnvvIxcclxuICAgICAgICAvL+WPguaVsOS4umnvvIzooajnpLrluqbmlbDvvIjlvKfluqbvvIlcclxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XHJcbiAgICB9XHJcbiAgICBqdWRnZVN0eWxlKGVsbGlwc2UsY3R4KTtcclxuICAgIGN0eC5jbG9zZVBhdGgoKTtcclxuICAgIHJldHVybiBlbGxpcHNlXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGZpbGw/OiBzdHJpbmcpOiBFbGxpcHNle1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXHJcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxyXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gZWxsaXBzZTBcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBFbGxpcHNle1xyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXHJcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcclxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXHJcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIGVsbGlwc2UwXHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZXtcclxuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXHJcbiAgICB4QTogbnVtYmVyW11cclxuICAgIHlBOiBudW1iZXJbXVxyXG59XHJcblxyXG5pbnRlcmZhY2UgUG9seWdvbk9wdHMgZXh0ZW5kcyBPcHRze1xyXG4gICAgc2hhcGU6IFBvbHlnb25TaGFwZVxyXG4gICAgc3R5bGU/OiBTdHlsZVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQb2x5Z29uIGV4dGVuZHMgRWxlbWVudHN7XHJcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XHJcbiAgICAgICAgbmFtZTogXCJwb2x5Z29uXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3Iob3B0czogUG9seWdvbk9wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcclxuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxyXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcclxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XHJcbiAgICBsZXQgc2ggPSBwb2x5Z29uLnNoYXBlXHJcbiAgICBsZXQgbnVtID0gMDtcclxuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxyXG4gICAge1xyXG4gICAgICAgIG51bSA9IE1hdGgubWluKHNoLnhBLmxlbmd0aCxzaC55QS5sZW5ndGgpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIG51bSA9IHNoLnhBLmxlbmd0aFxyXG4gICAgfVxyXG5cclxuICAgIGN0eC5iZWdpblBhdGgoKVxyXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcclxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcclxuICAgIH1cclxuICAgIGN0eC5saW5lVG8oc2gueEFbMF0sc2gueUFbMF0pXHJcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxyXG4gICAgY3R4LmNsb3NlUGF0aCgpXHJcblxyXG4gICAgcmV0dXJuIHBvbHlnb25cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUG9seShwb2x5Z29uOiBQb2x5Z29uLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBQb2x5Z29ue1xyXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXHJcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcclxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdHlsZToge1xyXG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcclxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgcmV0dXJuIHBvbHlnb24wXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBGaWxsUG9seShwb2x5Z29uOiBQb2x5Z29uLGZpbGw/OiBzdHJpbmcpOiBQb2x5Z29ue1xyXG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcclxuICAgIHtcclxuICAgICAgICBmaWxsID0gJyMwMDAnXHJcbiAgICB9XHJcbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXHJcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3R5bGU6IHtcclxuICAgICAgICAgICAgZmlsbDogZmlsbFxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICByZXR1cm4gcG9seWdvbjBcclxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcclxuaW1wb3J0IHsganVkZ2VTdHlsZV90ZXh0LCBqdWRnZVRleHRTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuaW50ZXJmYWNlIFRleHRTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB0ZXh0OiBzdHJpbmdcclxuICAgIG1heFdpZHRoPzogbnVtYmVyXHJcbn1cclxuXHJcbmludGVyZmFjZSBUZXh0T3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogVGV4dFNoYXBlXHJcbiAgICBzdHlsZT86IFN0eWxlXHJcbn1cclxuXHJcbmxldCBuYW1lSWQgPSAwO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBFbGVtZW50c3tcclxuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcclxuICAgICAgICBuYW1lOiBcInRleHRcIiArIG5hbWVJZC50b1N0cmluZygpLFxyXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBUZXh0T3B0cyl7XHJcbiAgICAgICAgc3VwZXIoKVxyXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xyXG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcclxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBuYW1lSWQrK1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRleHQodGV4dDogVGV4dCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFRleHR7XHJcblxyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcblxyXG4gICAganVkZ2VUZXh0U3R5bGUodGV4dCxjdHgpXHJcblxyXG4gICAganVkZ2VTdHlsZV90ZXh0KHRleHQsY3R4KVxyXG4gICAgXHJcbiAgICBjdHguY2xvc2VQYXRoKClcclxuXHJcbiAgICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gQ2F0U3RyKHN0ckE6IHN0cmluZ1tdKTogc3RyaW5ne1xyXG4gICAgbGV0IHRleHQgPSAnJ1xyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgc3RyQS5sZW5ndGg7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRleHQgKz0gc3RyQVtpXTtcclxuICAgIH1cclxuICAgIHJldHVybiB0ZXh0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBTdHJQYWQoc3RyOiBzdHJpbmcsc3RyMDogc3RyaW5nLG51bT86IG51bWJlcik6IHN0cmluZ3tcclxuICAgIGxldCB0ZXh0ID0gJydcclxuICAgIFxyXG4gICAgaWYobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSAwKVxyXG4gICAge1xyXG4gICAgICAgIG51bSA9IDE7XHJcbiAgICB9XHJcblxyXG4gICAgZm9yKGxldCBpPTA7aTxudW07aSsrKVxyXG4gICAge1xyXG4gICAgICAgIHRleHQgKz0gc3RyMFxyXG4gICAgfVxyXG4gICAgdGV4dCArPSBzdHJcclxuXHJcbiAgICByZXR1cm4gdGV4dFxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc3RyZXEoc3RyMDogc3RyaW5nLHN0cjE6IHN0cmluZyk6IGJvb2xlYW57XHJcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcclxuICAgIHJlc3VsdCA9IHN0cjAuaW5jbHVkZXMoc3RyMSk7XHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBSZXBsYWNlKHN0cjogc3RyaW5nLHN0cl9vOiBzdHJpbmcsc3RyX3I6IHN0cmluZyk6c3RyaW5ne1xyXG4gICAgbGV0IHJlc3VsdCA9ICcnXHJcblxyXG4gICAgcmVzdWx0ID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJfbywnZycpLHN0cl9yKTtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0XHJcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xyXG5pbXBvcnQgeyBqdWRnZUltYWdlU2hhcGUsIGp1ZGdlU3R5bGUsanVkZ2VJbWFnZVNoYXBlX3RydWUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmludGVyZmFjZSBJbWdTaGFwZSBleHRlbmRzIFNoYXBle1xyXG4gICAgaW1nOiBzdHJpbmdcclxuICAgIHg6IG51bWJlclxyXG4gICAgeTogbnVtYmVyXHJcbiAgICB3aWR0aD86IG51bWJlclxyXG4gICAgaGVpZ2h0PzogbnVtYmVyXHJcbiAgICBzeD86IG51bWJlclxyXG4gICAgc3k/OiBudW1iZXJcclxuICAgIHN3aWR0aD86IG51bWJlclxyXG4gICAgc2hlaWdodD86IG51bWJlclxyXG59XHJcblxyXG5pbnRlcmZhY2UgSW1nT3B0cyBleHRlbmRzIE9wdHN7XHJcbiAgICBzaGFwZTogSW1nU2hhcGVcclxuICAgIHN0eWxlPzogU3R5bGVcclxuICAgIEltZz86IGFueVxyXG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxyXG59XHJcblxyXG5sZXQgbmFtZUlkID0gMDtcclxuXHJcbmNsYXNzIFJHQkEge1xyXG4gICAgUjogbnVtYmVyXHJcbiAgICBHOiBudW1iZXJcclxuICAgIEI6IG51bWJlclxyXG4gICAgQTogbnVtYmVyXHJcbn1cclxuXHJcbmNsYXNzIFJHQkFfQXJyYXl7XHJcbiAgICBSR0JBX0xpc3Q6IFJHQkFbXVxyXG4gICAgd2lkdGg6IG51bWJlclxyXG4gICAgaGVpZ2h0OiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEltZyBleHRlbmRzIEVsZW1lbnRze1xyXG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xyXG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcclxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxyXG4gICAgfVxyXG4gICAgSW1nPzogYW55XHJcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXHJcbiAgICBJc0NoYW5nZT86IGJvb2xlYW5cclxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEltZ09wdHMpe1xyXG4gICAgICAgIHN1cGVyKClcclxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcclxuICAgICAgICBpZihvcHRzLkltZyA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbGV0IEkgPSBuZXcgSW1hZ2UoKVxyXG4gICAgICAgICAgICBJLnNyYyA9IG9wdHMuc2hhcGUuaW1nXHJcbiAgICAgICAgICAgIHRoaXMuSW1nID0gSTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcclxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xyXG4gICAgICAgIC8vICAgICB0ZXh0dXJlOiBbXSxcclxuICAgICAgICAvLyAgICAgd2lkdGg6IDAsXHJcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICAvLyBpZihvcHRzLkltZ0RhdGEgIT09IHVuZGVmaW5lZClcclxuICAgICAgICAvLyB7XHJcbiAgICAgICAgLy8gICAgIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxyXG4gICAgICAgIC8vIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN4ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeSA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3dpZHRoID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN3aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc2hlaWdodCA9IHRoaXMuSW1nLmhlaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYob3B0cy5zaGFwZS53aWR0aCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZihvcHRzLnNoYXBlLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5zaGFwZS5oZWlnaHQgPSB0aGlzLkltZy5oZWlnaHRcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gdGhpcy5JbWdEYXRhID0gb3B0cy5JbWdEYXRhXHJcblxyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuSW1nRGF0YSlcclxuICAgICAgICBcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxyXG4gICAgICAgIC8vIGlmKG9wdHMuc3R5bGUpXHJcbiAgICAgICAgLy8ge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIG5hbWVJZCsrXHJcbiAgICB9XHJcbiAgICBpbml0KCl7XHJcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxyXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcclxuICAgICAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXHJcbiAgICAgICAgYy53aWR0aCA9IHNjcmVlbi5hdmFpbFdpZHRoO1xyXG4gICAgICAgIGMuaGVpZ2h0ID0gc2NyZWVuLmF2YWlsSGVpZ2h0O1xyXG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhpcy5JbWcsc2gueCxzaC55KVxyXG4gICAgICAgIHRoaXMuSW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoc2gueCxzaC55LHRoaXMuSW1nLndpZHRoLHRoaXMuSW1nLmhlaWdodCk7XHJcbiAgICAgICAgLy8gdGhpcy5tYWtlVGV4dHVyZXMoKVxyXG4gICAgfVxyXG4gICAgdG9HcmF5KCl7XHJcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWcoe1xyXG4gICAgICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICAgICAgaW1nOiB0aGlzLnNoYXBlLmltZyxcclxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2hhcGUueCxcclxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNoYXBlLndpZHRoLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNoYXBlLmhlaWdodCxcclxuICAgICAgICAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxyXG4gICAgICAgICAgICAgICAgc3k6IHRoaXMuc2hhcGUuc3ksXHJcbiAgICAgICAgICAgICAgICBzd2lkdGg6IHRoaXMuc2hhcGUuc3dpZHRoLFxyXG4gICAgICAgICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgICAgIGltZy5Jc0NoYW5nZSA9IHRydWVcclxuICAgICAgICBsZXQgZyA9IDBcclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBnID0gTWF0aC5mbG9vcih0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMF0gKiAwLjI5OSArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsxXSAqIDAuNTg3ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzJdICogMC4xMTQpO1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXSA9IGdcclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV0gPSBnXHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdID0gZ1xyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSszXSA9IHRoaXMuSW1nRGF0YS5kYXRhWzQqaSszXVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaW1nO1xyXG4gICAgfVxyXG4gICAgcmVwbGFjZSgpe1xyXG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxyXG4gICAgICAgIHRoaXMuaW5pdCgpXHJcbiAgICB9XHJcbiAgICBtYWtlVGV4dHVyZXMoKXtcclxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0gbmV3IFRleHR1cmVzKHRoaXMpO1xyXG4gICAgICAgIGxldCBpbWcgPSB0aGlzLnRvR3JheSgpO1xyXG4gICAgICAgIGxldCBkYXRhMCA9IGltZy5JbWdEYXRhLmRhdGE7XHJcbiAgICAgICAgbGV0IGEgPSBuZXcgQXJyYXkoKVxyXG4gICAgICAgIGxldCBhcnIgPSAnJ1xyXG4gICAgICAgIGxldCBudW1BcnI6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgbGV0IG51bUFycjA6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLkltZ0RhdGEuZGF0YVxyXG4gICAgICAgIGxldCB3ID0gdGhpcy5JbWdEYXRhLndpZHRoXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcclxuICAgICAgICAvLyBjb25zb2xlLmRpcihkYXRhKVxyXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEwLmxlbmd0aC80O2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IDM7dCsrKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwO2sgPCAzO2srKylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBpZihkYXRhMFs0KmldIDw9IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSB8fCBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDFcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYoMyp0K2sgIT09IDQpXHJcbiAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIgKz0gYVszKnQra10udG9TdHJpbmcoKTsgXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKChpKyh0LTEpKncray0xKSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG51bUFycltpXSA9IHBhcnNlSW50KGFyciwyKVxyXG4gICAgICAgICAgICBhcnIgPSAnJ1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1BcnIubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdPW51bUFycltpXVxyXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXT1udW1BcnJbaV1cclxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl09bnVtQXJyW2ldXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpbWc7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW1nKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogSW1ne1xyXG4gICAgY3R4LmJlZ2luUGF0aCgpXHJcbiAgICBpZihpbWcuSXNDaGFuZ2UgPT09IGZhbHNlKVxyXG4gICAge1xyXG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZShpbWcsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nLGN0eCk7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGN0eC5jbG9zZVBhdGgoKVxyXG4gICAgcmV0dXJuIGltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW1SZWFkKGltZzogSW1nKTogSW1hZ2VEYXRheyAgICAgICAgIC8v6K+75Y+W5Zu+54mH55+p6Zi1XHJcbiAgICByZXR1cm4gaW1nLkltZ0RhdGE7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBVbnBhY2tDb2xvckltYWdlKGltZzogSW1nKTogUkdCQV9BcnJheXtcclxuICAgIGxldCByZ2JhID0gbmV3IEFycmF5KClcclxuICAgIGxldCBkYXRhID0gaW1nLkltZ0RhdGEuZGF0YVxyXG4gICAgXHJcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aC80O2krKylcclxuICAgIHtcclxuICAgICAgICByZ2JhW2ldID0gbmV3IFJHQkEoKVxyXG4gICAgICAgIFxyXG4gICAgICAgIHJnYmFbaV0uUiA9IGRhdGFbNCppKzBdXHJcbiAgICAgICAgcmdiYVtpXS5HID0gZGF0YVs0KmkrMV1cclxuICAgICAgICByZ2JhW2ldLkIgPSBkYXRhWzQqaSsyXVxyXG4gICAgICAgIHJnYmFbaV0uQSA9IGRhdGFbNCppKzNdXHJcblxyXG4gICAgfVxyXG5cclxuICAgIGxldCByZ2JhX2FyciA9IG5ldyBSR0JBX0FycmF5KClcclxuICAgIHJnYmFfYXJyLlJHQkFfTGlzdCA9IHJnYmE7XHJcbiAgICByZ2JhX2Fyci53aWR0aCA9IGltZy5JbWdEYXRhLndpZHRoXHJcbiAgICByZ2JhX2Fyci5oZWlnaHQgPSBpbWcuSW1nRGF0YS5oZWlnaHRcclxuXHJcbiAgICByZXR1cm4gcmdiYV9hcnJcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFBhY2tDb2xvckltYWdlKHJnYmFfYXJyOiBSR0JBX0FycmF5KTogSW1hZ2VEYXRhe1xyXG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxyXG5cclxuICAgIGxldCBpbWdkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShyZ2JhX2Fyci53aWR0aCxyZ2JhX2Fyci5oZWlnaHQpO1xyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmdiYV9hcnIuUkdCQV9MaXN0Lmxlbmd0aDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSswXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5SXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsxXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5HXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsyXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5CXHJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSszXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5BXHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW1nZGF0YVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlSW4oaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xyXG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcclxuICAgIHtcclxuICAgICAgICBhbHBoYUluID0gMTtcclxuICAgIH1cclxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcclxuICAgICAgICBzaGFwZToge1xyXG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXHJcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxyXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcclxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxyXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gYWxwaGFJblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgcmV0dXJuIG5ld0ltZ1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlT3V0KGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcclxuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXHJcbiAgICB7XHJcbiAgICAgICAgYWxwaGFJbiA9IDA7XHJcbiAgICB9XHJcbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XHJcbiAgICAgICAgc2hhcGU6IHtcclxuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxyXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcclxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXHJcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcclxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxyXG4gICAge1xyXG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9ICgxIC0gYWxwaGFJbilcclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIHJldHVybiBuZXdJbWdcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEltZ0luaXQoaW1nOiBJbWdbXXxHcm91cCl7XHJcbiAgICBsZXQgSTtcclxuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcclxuICAgIHtcclxuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgSSA9IGltZ1xyXG4gICAgfVxyXG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcclxuICAgIHtcclxuICAgICAgICBJLmdyb3VwTGlzdFtpXS5pbml0KClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFByZWxvYWRUZXh0dXJlcyhpbWc6IEltZyk6IEltZ3tcclxuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XHJcbiAgICByZXR1cm4gbmV3SW1nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZShpbWc6IEltZyk6IEltZ3tcclxuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XHJcbiAgICByZXR1cm4gbmV3SW1nXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZXMoaW1nOiBJbWdbXXxHcm91cCk6IEdyb3Vwe1xyXG4gICAgbGV0IEk7XHJcbiAgICBsZXQgdGV4dHVyZTogSW1nW10gPSBbXVxyXG4gICAgbGV0IFQ7XHJcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXHJcbiAgICB7XHJcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIEkgPSBpbWdcclxuICAgIH1cclxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXHJcbiAgICB7XHJcbiAgICAgICAgdGV4dHVyZVtpXSA9IERyYXdUZXh0dXJlKEkuZ3JvdXBMaXN0W2ldKVxyXG4gICAgfVxyXG4gICAgVCA9IG5ldyBHcm91cCh0ZXh0dXJlKVxyXG4gICAgcmV0dXJuIFQ7XHJcbn0iLCJpbXBvcnQge2NhbnZhc1N0eWxlfSBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xyXG5pbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXHJcbmltcG9ydCB7IFJlY3RhbmdsZSxtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9yZWN0YW5nbGUnXHJcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnIFxyXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXHJcbmltcG9ydCB7IENpcmNsZSxtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXHJcbmltcG9ydCB7IExpbmUsIG1ha2VMaW5lfSBmcm9tICcuLi9HcmFwaGljL2xpbmUnXHJcbmltcG9ydCB7IEFyYywgbWFrZUFyYyB9IGZyb20gJy4uL0dyYXBoaWMvYXJjJ1xyXG5pbXBvcnQgeyBFbGxpcHNlLCBtYWtlRWxsaXBzZSB9IGZyb20gJy4uL0dyYXBoaWMvZWxsaXBzZSdcclxuaW1wb3J0IHsgbWFrZVBvbHlnb24sIFBvbHlnb24gfSBmcm9tICcuLi9HcmFwaGljL3BvbHlnb24nXHJcbmltcG9ydCB7IG1ha2VUZXh0LCBUZXh0IH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xyXG5pbXBvcnQgeyBJbWcsIG1ha2VJbWcgfSBmcm9tICcuLi9HcmFwaGljL2ltYWdlJ1xyXG5pbXBvcnQgeyBjb250ZW50U3R5bGUsZXJyQ29uU3R5bGUgfSBmcm9tICcuLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpOmNhbnZhc1N0eWxle1xyXG4gICAgaWYoIWNTdHlsZSkgXHJcbiAgICB7XHJcbiAgICAgICAgY1N0eWxlID0ge1xyXG4gICAgICAgICAgICB3aWR0aDogNDAwLFxyXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmKCFjU3R5bGUud2lkdGgpXHJcbiAgICB7XHJcbiAgICAgICAgY1N0eWxlLndpZHRoID0gNDAwXHJcbiAgICB9XHJcbiAgICBpZighY1N0eWxlLmhlaWdodClcclxuICAgIHtcclxuICAgICAgICBjU3R5bGUuaGVpZ2h0ID0gNDAwXHJcbiAgICB9XHJcbiAgICByZXR1cm4gY1N0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VEaXZTdHlsZShkU3R5bGU6IERpdlN0eWxlKTogRGl2U3R5bGV7XHJcbiAgICBpZighZFN0eWxlKSBcclxuICAgIHtcclxuICAgICAgICBkU3R5bGUgPSB7XHJcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXHJcbiAgICAgICAgICAgIGhlaWdodDogMjYwLFxyXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcclxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZighZFN0eWxlLndpZHRoKVxyXG4gICAge1xyXG4gICAgICAgIGRTdHlsZS53aWR0aCA9IDQwMFxyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5oZWlnaHQpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmhlaWdodCA9IDQwMFxyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5ib3JkZXIpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmJvcmRlciA9ICdub25lJ1xyXG4gICAgfVxyXG4gICAgaWYoIWRTdHlsZS5ib3JkZXJSYWRpdXMpXHJcbiAgICB7XHJcbiAgICAgICAgZFN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnXHJcbiAgICB9XHJcbiAgICByZXR1cm4gZFN0eWxlO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDb250ZW50U3R5bGUoY1N0eWxlOiBjb250ZW50U3R5bGUsdGl0bGU6IHN0cmluZyxjb250ZW50OiBzdHJpbmcpOiBjb250ZW50U3R5bGV8ZXJyQ29uU3R5bGV7XHJcbiAgICBpZighY1N0eWxlKVxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZSA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxyXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoIWNTdHlsZS50aXRsZSlcclxuICAgIHtcclxuICAgICAgICBjU3R5bGUudGl0bGUgPSB0aXRsZVxyXG4gICAgfVxyXG4gICAgaWYoIWNTdHlsZS5jb250ZW50KVxyXG4gICAge1xyXG4gICAgICAgIGNTdHlsZS5jb250ZW50ID0gY29udGVudFxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNTdHlsZVxyXG59XHJcblxyXG4vLyBleHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShzdHlsZTogU3R5bGUpe1xyXG4vLyAgICAgaWYoIXN0eWxlKVxyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50KGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICAvLyBjb25zb2xlLmRpcihlbClcclxuICAgIC8vIGNvbnNvbGUuZGlyKFJlY3RhbmdsZSlcclxuICAgIC8vIGNvbnNvbGUuZGlyKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxyXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xyXG4gICAgICAgIG1ha2VSZWN0YW5nbGUoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUNpcmNsZShlbCxjdHgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUxpbmUoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUFyYyhlbCxjdHgpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUVsbGlwc2UoZWwsY3R4KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZVBvbHlnb24oZWwsY3R4KVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFRleHQpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZVRleHQoZWwsY3R4KTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBJbWcpXHJcbiAgICB7XHJcbiAgICAgICAgbWFrZUltZyhlbCxjdHgpXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxyXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXHJcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBlbC5zdHlsZSA9IHtcclxuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXHJcbiAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXHJcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxldCBzdCA9IGVsLnN0eWxlO1xyXG4gICAgaWYoc3QubGluZVdpZHRoID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDE7XHJcbiAgICB9XHJcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcclxuXHJcbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAgICAgY3R4LmZpbGwoKTtcclxuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xyXG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xyXG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLy8gaWYoIShzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCkpe1xyXG4gICAgLy8gICAgIC8vIHN0LnN0cm9rZSA9ICcjMDAwJztcclxuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcclxuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XHJcbiAgICAvLyAgICAgfVxyXG4gICAgLy8gICAgIGVsc2V7XHJcbiAgICAvLyAgICAgICAgIHN0LnN0cm9rZSA9IFwiIzAwMFwiXHJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgIC8vICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcclxuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgICAgICBcclxuICAgIC8vIH1cclxuICAgIC8vIGVsc2V7XHJcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xyXG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xyXG4gICAgLy8gICAgIH1cclxuICAgIC8vIH1cclxuICAgIFxyXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XHJcbiAgICAvLyBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xyXG4gICAgLy8gY3R4LmZpbGwoKTtcclxuICAgIC8vIGN0eC5zdHJva2UoKTtcclxufVxyXG5cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcclxuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgZWwuc3R5bGUgPSB7XHJcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXHJcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcclxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcclxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xyXG5cclxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcclxuICAgICAgICBjdHguZmlsbFRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcclxuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxyXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XHJcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVRleHRTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xyXG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcclxuICAgIGxldCBmb250U3RyaW5nID0gJyc7XHJcbiAgICBpZihzdCA9PT0gdW5kZWZpbmVkKVxyXG4gICAge1xyXG4gICAgICAgIHN0ID0ge1xyXG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxyXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXHJcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxyXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoc3QuZm9udFN0eWxlICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFN0eWxlICE9PSAnbm9uZScpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gMClcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2VcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdzdHJpbmcnKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gJ2l0YWxpYycgJiYgc3QuZm9udFN0eWxlICE9PSAnb2JsaXF1ZScgJiYgc3QuZm9udFN0eWxlICE9PSBcIm5vcm1hbFwiKXtcclxuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzAnKXtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcxJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcclxuICAgIH1cclxuXHJcbiAgICBpZihzdC5mb250VmFyaWFudCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnbm9uZScpXHJcbiAgICB7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnYm9vbGVhbicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ3N0cmluZycpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9IHN0LmZvbnRWYXJpYW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250VmFyaWFudCAhPT0gJ3NtYWxsLWNhcHMnKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gJ3RydWUnKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XHJcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdudW1iZXInKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZGVyJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbGlnaHRlcicpXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXHJcbiAgICB9XHJcblxyXG4gICAgaWYoc3QuZm9udFNpemUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U2l6ZSAhPT0gJ25vbmUnKVxyXG4gICAge1xyXG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ251bWJlcicpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRTaXplID09PSAnc3RyaW5nJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTaXplLmluZGV4T2YoJ3B4JykgPT09IC0xKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xyXG4gICAgfVxyXG4gICAgZm9udFN0cmluZyA9IHN0LmZvbnRTdHlsZSArICcgJyArIHN0LmZvbnRWYXJpYW50ICsgJyAnICsgc3QuZm9udFdlaWdodCArICcgJyArIHN0LmZvbnRTaXplICsgJyAnICsgc3QuZm9udEZhbWlseTtcclxuICAgIGN0eC5mb250ID0gZm9udFN0cmluZztcclxuICAgIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XHJcbiAgICBsZXQgeCA9IDE7XHJcbiAgICAvLyBjb25zb2xlLmRpcihlbClcclxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcclxuICAgIHtcclxuICAgICAgICBlbCA9IGVsLnRvVXBwZXJDYXNlKCk7XHJcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVExFRlQnIHx8IGVsID09PSBcIkxFRlRcIiB8fCBlbCA9PT0gJ0wnKXtcclxuICAgICAgICAgICAgeCA9IDE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUVE9QJyB8fCBlbCA9PT0gXCJUT1BcIiB8fCBlbCA9PT0gJ1QnKXtcclxuICAgICAgICAgICAgeCA9IDI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUUklHSFQnIHx8IGVsID09PSBcIlJJR0hUXCIgfHwgZWwgPT09ICdSJyl7XHJcbiAgICAgICAgICAgIHggPSAzO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVEJPVFRPTScgfHwgZWwgPT09IFwiQk9UVE9NXCIgfHwgZWwgPT09ICdCJyl7XHJcbiAgICAgICAgICAgIHggPSA0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXHJcbiAgICB7XHJcbiAgICAgICAgaWYoZWw8NSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSBlbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlXHJcbiAgICB7XHJcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcclxuICAgIH1cclxuICAgIHJldHVybiB4O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xyXG4gICAgbGV0IGYwID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUwKTtcclxuICAgIGxldCBmMSA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMSk7XHJcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XHJcbiAgICAgICAgaWYoZjEgPT09IDIgfHwgZjEgPT09IDQpe1xyXG4gICAgICAgICAgICBmMSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIGxldCB0ID0gZjE7XHJcbiAgICAgICAgICAgIGYxID0gZjA7XHJcbiAgICAgICAgICAgIGYwID0gdDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMyl7XHJcbiAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDMpe1xyXG4gICAgICAgICAgICBmMSA9IDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIFtmMCxmMV1cclxufSAgIFxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcclxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZClcclxuICAgIHtcclxuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZXtcclxuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUltYWdlU2hhcGVfdHJ1ZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XHJcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcclxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXHJcbiAgICB7XHJcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXHJcbiAgICB9XHJcbiAgICBlbHNle1xyXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJc0luRWxlbWVudChbeCx5XTogW251bWJlcixudW1iZXJdLGVsOiBFbGVtZW50cyk6IGJvb2xlYW57XHJcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XHJcbiAgICAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLndpZHRoLGVsLnNoYXBlLmhlaWdodF1cclxuICAgICAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcclxuICAgIHtcclxuICAgICAgICBsZXQgW3gwLHkwLHIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucl1cclxuICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXgwLDIpICsgTWF0aC5wb3coeS15MCwyKSlcclxuICAgICAgICBpZihyIDw9IHIwKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXHJcbiAgICB7XHJcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnhFbmQsZWwuc2hhcGUueUVuZF1cclxuICAgICAgICBpZih4MSAhPT0geDApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBsZXQgeXQgPSAoeTEteTApLyh4MS14MCkgKiAoeCAtIHgwKSArIHkwXHJcbiAgICAgICAgICAgIGlmKHkgPj0geXQtMTUgJiYgeSA8PSB5dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgbGV0IHh0ID0gKHgxLXgwKS8oeTEteTApICogKHkgLSB5MCkgKyB4MFxyXG4gICAgICAgICAgICBpZih5ID49IHh0LTE1ICYmIHkgPD0geHQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcclxuICAgIHtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBbeDAseTAscmEwLHJiMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJhLGVsLnNoYXBlLnJiXVxyXG4gICAgICAgIGxldCB0ID0gTWF0aC5wb3coeC14MCwyKS9NYXRoLnBvdyhyYTAsMikgKyBNYXRoLnBvdyh5LXkwLDIpL01hdGgucG93KHJiMCwyKVxyXG4gICAgICAgIGlmKHQgPD0gMSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxyXG4gICAge1xyXG4gICAgICAgIGxldCBpID0gMFxyXG4gICAgICAgIGxldCBqID0gaSArIDFcclxuICAgICAgICBsZXQgaW5kZXggPSAwXHJcbiAgICAgICAgbGV0IHh0ID0gbmV3IEFycmF5KClcclxuICAgICAgICBsZXQgeXQgPSBuZXcgQXJyYXkoKVxyXG4gICAgICAgIGxldCBbeDAseTBdID0gW2VsLnNoYXBlLnhBLGVsLnNoYXBlLnlBXVxyXG4gICAgICAgIGZvcihpID0gMDtpPGVsLnNoYXBlLnhBLmxlbmd0aDtpKyspXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBpZihpID09PSBlbC5zaGFwZS54QS5sZW5ndGgtMSlcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaiA9IDBcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNle1xyXG4gICAgICAgICAgICAgICAgaiA9IGkgKyAxXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYoeTBbaV0gIT09IHkwW2pdKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICB4dFtpbmRleF0gPSAoeDBbaV0teDBbal0pLyh5MFtpXS15MFtqXSkgKiAoeSAtIHkwW2ldKSArIHgwW2ldXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgICAgIHl0W2luZGV4XSA9ICh5MFtqXS15MFtpXSkvKHgwW2pdLXgwW2ldKSAqICh4IC0geDBbaV0pICsgeTBbaV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih4ID09PSB4dFtpbmRleF0pXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSBpZih4dFtpbmRleF0gPj0geCl7XHJcbiAgICAgICAgICAgICAgICBpbmRleCsrXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoaW5kZXglMj09PTApXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcclxuICAgIC8vIHtcclxuICAgIC8vICAgICBsZXQgY1xyXG4gICAgLy8gICAgIGxldCBpLGpcclxuICAgIC8vICAgICBsZXQgbCA9IGVsLnNoYXBlLnlBLmxlbmd0aFxyXG4gICAgLy8gICAgIGZvcihjID0gZmFsc2UsaSA9IC0xLGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIFxyXG4gICAgLy8gICAgICAgICAoIChlbC5zaGFwZS55QVtpXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtqXSkgfHwgKGVsLnNoYXBlLnlBW2pdIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2ldKSApIFxyXG4gICAgLy8gICAgICAgICAmJiAoeCA8IChlbC5zaGFwZS54QVtqXSAtIGVsLnNoYXBlLnhBW2ldKSAqICh5IC0gZWwuc2hhcGUueUFbaV0pIC8gKGVsLnNoYXBlLnlBW2pdIC0gZWwuc2hhcGUueUFbaV0pICsgZWwuc2hhcGUueEFbaV0pIFxyXG4gICAgLy8gICAgICAgICAmJiAoYyA9ICFjKTsgXHJcbiAgICAvLyAgICAgcmV0dXJuIGM7IFxyXG4gICAgLy8gfVxyXG59IiwiaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY2FudmFzU3R5bGV7XHJcbiAgICB3aWR0aD86IG51bWJlcjtcclxuICAgIGhlaWdodD86IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEe1xyXG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG4gICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XHJcbiAgICAvLyBsZXQgY1N0eWxlOiBjYW52YXNTdHlsZSA9IHtcclxuICAgIC8vICAgICB3aWR0aDogMTAwLFxyXG4gICAgLy8gICAgIGhlaWdodDogMTAwXHJcbiAgICAvLyB9XHJcbiAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xyXG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xyXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgIGRvbS5hcHBlbmQoYyk7XHJcbiAgICByZXR1cm4gY3R4O1xyXG59IiwiXHJcbmNsYXNzIHRpbWV7XHJcbiAgICBob3VyOiBudW1iZXJcclxuICAgIG1pbnV0ZXM6IG51bWJlclxyXG4gICAgc2Vjb25kczogbnVtYmVyXHJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcclxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcclxuICAgICAgICB0aGlzLm1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKVxyXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpXHJcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUaW1le1xyXG4gICAgc3RhcnRUaW1lOiB0aW1lXHJcbiAgICBpbnN0YW50VGltZTogdGltZVxyXG4gICAgdHJhbnNpZW50VGltZTogdGltZVtdXHJcbiAgICB0aW1lVmFsdWU6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoKXtcclxuXHJcbiAgICB9XHJcbiAgICBzdGFydCgpe1xyXG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IHRpbWUoKVxyXG4gICAgfVxyXG4gICAgcmVjb3JkKCl7XHJcbiAgICAgICAgdGhpcy5pbnN0YW50VGltZSA9IG5ldyB0aW1lKClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIFRpYygpOiBUaW1le1xyXG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXHJcbiAgICB0LnN0YXJ0KClcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gVG9jKHRpbWU6IFRpbWUpOiBudW1iZXJ7XHJcbiAgICBsZXQgdCA9IDA7XHJcbiAgICBsZXQgdHMgPSBuZXcgQXJyYXkoKVxyXG4gICAgdGltZS5yZWNvcmQoKVxyXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXHJcbiAgICB0c1sxXSA9IHRpbWUuaW5zdGFudFRpbWUubWludXRlcyAtIHRpbWUuc3RhcnRUaW1lLm1pbnV0ZXNcclxuICAgIHRzWzJdID0gdGltZS5pbnN0YW50VGltZS5zZWNvbmRzIC0gdGltZS5zdGFydFRpbWUuc2Vjb25kc1xyXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xyXG4gICAgdCA9IDYwKjYwKnRzWzBdICsgNjAqdHNbMV0gKyB0c1syXSArIHRzWzNdLzEwMDBcclxuICAgIHRpbWUudGltZVZhbHVlID0gdDtcclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xyXG4gICAgbGV0IHQgPSBUb2ModGltZSlcclxuICAgIHJldHVybiB0XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBXYWl0U2VjcyhkZWxheTogbnVtYmVyLG1lc3NhZ2U/OiBhbnkpe1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XHJcbiAgICAgICAgfSwgZGVsYXkpO1xyXG4gICAgfSlcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5X2ZyYW1lKG51bTEpe1xyXG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcclxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XHJcbiAgICAgICAgKGZ1bmN0aW9uIHJhZigpe1xyXG4gICAgICAgICAgICB0aW1lX251bSsrO1xyXG4gICAgICAgICAgICBsZXQgaWQgPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcclxuICAgICAgICBpZiggdGltZV9udW09PW51bTEpe1xyXG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xyXG4gICAgICAgICAgICByZXNvbHZlKDApO1xyXG4gICAgICAgIH1cclxuICAgIH0oKSlcclxufSl9OyIsImltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSBcIi4uL0VsZW1lbnRcIjtcclxuaW1wb3J0IHsganVkZ2VJc0luRWxlbWVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEtiV2FpdChrZXk6IG51bWJlcixGdW5jOiBGdW5jdGlvbil7XHJcbiAgICBkb2N1bWVudC5vbmtleWRvd249ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcclxuICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KXtcclxuICAgICAgICAgICAgRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEtiTmFtZShrZXk6IHN0cmluZ3xudW1iZXIpOm51bWJlcntcclxuICAgIGxldCByZXM7XHJcblxyXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXHJcbiAgICB7XHJcbiAgICAgICAgcmVzID0ga2V5LmNoYXJDb2RlQXQoMClcclxuICAgIH1cclxuICAgIGVsc2V7XHJcbiAgICAgICAgcmVzID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpXHJcbiAgICB9XHJcbiAgICBjb25zb2xlLmRpcihyZXMpIFxyXG4gICAgcmV0dXJuIHJlc1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gS2JQcmVzc1dhaXQoa2V5OiBudW1iZXIsRnVuYzogRnVuY3Rpb24pe1xyXG4gICAgZG9jdW1lbnQub25rZXlkb3duPWZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICB2YXIgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XHJcbiAgICAgICAgICAgIEZ1bmMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBLYlJlbGVhc2VXYWl0KGtleTogbnVtYmVyLEZ1bmM6IEZ1bmN0aW9uKXtcclxuICAgIGRvY3VtZW50Lm9ua2V5dXA9ZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgICAgIHZhciBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcclxuICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KXtcclxuICAgICAgICAgICAgRnVuYygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyxGdW5jOiBGdW5jdGlvbil7XHJcbiAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgICAgICBsZXQgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XHJcbiAgICAgICAgbGV0IHgseVxyXG4gICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIHggPSBlLnBhZ2VYXHJcbiAgICAgICAgICAgIHkgPSBlLnBhZ2VZXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnNvbGUuZGlyKHgpXHJcbiAgICAgICAgY29uc29sZS5kaXIoeSlcclxuICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZilcclxuICAgICAgICBpZihmID09PSB0cnVlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgRnVuYygpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBEaXZTdHlsZXtcclxuICAgIHdpZHRoPzogbnVtYmVyO1xyXG4gICAgaGVpZ2h0PzogbnVtYmVyO1xyXG4gICAgYm9yZGVyPzogc3RyaW5nO1xyXG4gICAgYm9yZGVyUmFkaXVzPzogc3RyaW5nO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRGl2KGRvbTogSFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSk6IFtIVE1MRWxlbWVudCxEaXZTdHlsZV17XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcclxuICAgIGRTdHlsZSA9IGV6SnVkZ2UuanVkZ2VEaXZTdHlsZShkU3R5bGUpO1xyXG4gICAgZGl2LnN0eWxlLndpZHRoID0gZFN0eWxlLndpZHRoLnRvU3RyaW5nKClcclxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcclxuICAgIGRpdi5zdHlsZS5ib3JkZXIgPSBkU3R5bGUuYm9yZGVyXHJcbiAgICBkaXYuc3R5bGUuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xyXG4gICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xyXG4gICAgZGl2LnN0eWxlLmJveFNoYWRvdyA9ICcyMHB4IDEwcHggNDBweCAjODg4ODg4J1xyXG4gICAgZGl2LnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgZGl2LnN0eWxlLnpJbmRleCA9ICcxMDAwJ1xyXG4gICAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnXHJcbiAgICAvLyBkaXYuc3R5bGUudG9wID0gJzBweCdcclxuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcclxuICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XHJcbiAgICAvLyBjb25zb2xlLmRpcih3KVxyXG4gICAgZGl2LnN0eWxlLnRvcCA9ICgoaC1kU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xyXG4gICAgZGl2LnN0eWxlLmxlZnQgPSAoKHctZFN0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xyXG4gICAgZG9tLmFwcGVuZChkaXYpO1xyXG4gICAgcmV0dXJuIFtkaXYsZFN0eWxlXVxyXG59IiwiaW1wb3J0IHsgRGl2U3R5bGUgfSBmcm9tICcuLi9EaXYvZGl2J1xyXG5pbXBvcnQgKiBhcyBlekRpdiBmcm9tICcuLi9EaXYvZGl2J1xyXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xyXG5pbXBvcnQgeyBkZWxheV9mcmFtZSB9IGZyb20gJy4uL1RpbWUvdGltZSdcclxuXHJcbmxldCBpZCA9IDBcclxuXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2d1ZXtcclxuICAgIGlkOiBudW1iZXJcclxuICAgIGRvbTogSFRNTEVsZW1lbnRcclxuICAgIGRvbVBhcmVudDogSFRNTEVsZW1lbnRcclxuICAgIGRTdHlsZT86IERpdlN0eWxlXHJcbiAgICBjb25zdHJ1Y3Rvcihkb21QYXJlbnQ6IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKXtcclxuICAgICAgICBbdGhpcy5kb20sdGhpcy5kU3R5bGVdID0gZXpEaXYuY3JlYXRlRGl2KGRvbVBhcmVudCxkU3R5bGUpXHJcbiAgICAgICAgdGhpcy5kb21QYXJlbnQgPSBkb21QYXJlbnRcclxuICAgICAgICB0aGlzLmlkID0gaWQrK1xyXG4gICAgfVxyXG4gICAgZXJyb3JkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUpe1xyXG4gICAgICAgIGNvblN0eWxlID0gZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZShjb25TdHlsZSwnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXHJcbiAgICAgICAgLy8gY29uU3R5bGUuaW1nID0gJy4uL3NyYy9pbWFnZS9lcnJvci5wbmcnXHJcbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXSxcIlhcIiwncmVkJyk7XHJcbiAgICB9XHJcbiAgICBoZWxwZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcclxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJylcclxuICAgICAgICBjcmVhdGVEbGcodGhpcyxjb25TdHlsZSxbJzIwcHgnLCc3MHB4JywnMTMwcHgnLCcyMTBweCddLFwiIVwiLCdvcmFuZ2UnKTtcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgY29udGVudFN0eWxle1xyXG4gICAgdGl0bGU6IHN0cmluZ1xyXG4gICAgY29udGVudDogc3RyaW5nICBcclxufVxyXG5cclxuY2xhc3MgQ29udGVudHtcclxuICAgIGRvbTogSFRNTEVsZW1lbnRcclxuICAgIGRvbVBhcmVudDogSFRNTEVsZW1lbnRcclxuICAgIGRTdHlsZTogRGl2U3R5bGVcclxuICAgIGNvbnN0cnVjdG9yKGRvbVBhcmVudDogSFRNTEVsZW1lbnQsZFN0eWxlOiBEaXZTdHlsZSl7XHJcbiAgICAgICAgdGhpcy5kb20gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICAgIHRoaXMuZG9tUGFyZW50ID0gZG9tUGFyZW50XHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKVxyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xyXG4gICAgICAgIHRoaXMuZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXHJcbiAgICAgICAgdGhpcy5kb20uc3R5bGUudGV4dEFsaWduID0gJ2NlbnRlcidcclxuICAgICAgICAvLyAvLyBsZXQgaCA9IHRoaXMuZG9tUGFyZW50LmNsaWVudEhlaWdodCBcclxuICAgICAgICAvLyB0aGlzLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJ1xyXG4gICAgICAgIHRoaXMuZG9tUGFyZW50LmFwcGVuZCh0aGlzLmRvbSlcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIERsZ0luaXQoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU/OiBEaXZTdHlsZSkge1xyXG4gICAgbGV0IGRsZyA9IG5ldyBEaWFsb2d1ZShkb20sZFN0eWxlKTtcclxuICAgIHJldHVybiBkbGc7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZyhkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBBcnJheTxzdHJpbmc+LGltZ1N0cj86IHN0cmluZyxpbWdDb2xvcj86IHN0cmluZyl7XHJcbiAgICBkbGcuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcclxuICAgIGNyZWF0ZURsZ1RpdGxlKGRsZyxjb25TdHlsZSx0b3BbMF0pXHJcbiAgICBjcmVhdGVEbGdDb250ZW50KGRsZyxjb25TdHlsZSx0b3BbMV0pXHJcbiAgICBpZih0b3AubGVuZ3RoID09PSA0KVxyXG4gICAge1xyXG4gICAgICAgIGNyZWF0ZURsZ0ltZyhkbGcsY29uU3R5bGUsdG9wWzJdLGltZ1N0cixpbWdDb2xvcilcclxuICAgICAgICBjcmVhdGVEbGdDb25maXJtKGRsZyxjb25TdHlsZSx0b3BbM10pXHJcbiAgICB9XHJcbiAgICBlbHNlIGlmKHRvcC5sZW5ndGggPT09IDMpXHJcbiAgICB7XHJcbiAgICAgICAgY3JlYXRlRGxnQ29uZmlybShkbGcsY29uU3R5bGUsdG9wWzJdKVxyXG4gICAgfVxyXG4gICAgXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZ1RpdGxlKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XHJcbiAgICBsZXQgdGl0bGVTdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IDUwXHJcbiAgICB9XHJcbiAgICBsZXQgdGl0bGUgPSBuZXcgQ29udGVudChkbGcuZG9tLHRpdGxlU3R5bGUpXHJcbiAgICBjb25zb2xlLmRpcih0aXRsZSlcclxuICAgIHRpdGxlLmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS50aXRsZVxyXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRTaXplID0gJzI2cHgnXHJcbiAgICB0aXRsZS5kb20uc3R5bGUudG9wID0gdG9wXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZURsZ0NvbnRlbnQoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nKXtcclxuICAgIGxldCBjb250ZW50U3R5bGUgPSB7XHJcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXHJcbiAgICAgICAgaGVpZ2h0OiA1MFxyXG4gICAgfVxyXG4gICAgbGV0IGNvbnRlbnQgPSBuZXcgQ29udGVudChkbGcuZG9tLGNvbnRlbnRTdHlsZSlcclxuICAgIGNvbnRlbnQuZG9tLmlubmVyVGV4dCA9IGNvblN0eWxlLmNvbnRlbnRcclxuICAgIGNvbnRlbnQuZG9tLnN0eWxlLmZvbnRTaXplID0gJzIwcHgnXHJcbiAgICBjb250ZW50LmRvbS5zdHlsZS50b3AgPSB0b3BcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGxnSW1nKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxzdHI6IHN0cmluZyxjb2xvcjogc3RyaW5nKXtcclxuICAgIGxldCBpbWdEaXZTdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IDYwXHJcbiAgICB9XHJcbiAgICBsZXQgaW1nRGl2ID0gbmV3IENvbnRlbnQoZGxnLmRvbSxpbWdEaXZTdHlsZSlcclxuICAgIGltZ0Rpdi5kb20uc3R5bGUudG9wID0gdG9wXHJcbiAgICBpbWdEaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcclxuICAgIGltZ0Rpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJ1xyXG4gICAgbGV0IGltZ1N0eWxlID0ge1xyXG4gICAgICAgIHdpZHRoOiA2MCxcclxuICAgICAgICBoZWlnaHQ6IDYwXHJcbiAgICB9XHJcbiAgICBsZXQgaW1nID0gbmV3IENvbnRlbnQoaW1nRGl2LmRvbSxpbWdTdHlsZSlcclxuICAgIGltZy5kb20uaWQgPSAnaW1nJ1xyXG4gICAgaW1nLmRvbS5pbm5lclRleHQgPSBzdHJcclxuICAgIGltZy5kb20uc3R5bGUuZm9udFNpemUgPSAnNTRweCdcclxuICAgIGltZy5kb20uc3R5bGUuY29sb3IgPSAnd2hpdGUnXHJcbiAgICBpbWcuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxyXG4gICAgLy8gaW1nLmRvbS5zdHlsZS5ib3JkZXIgPSAnNXB4IHNvbGlkIHJlZCdcclxuICAgIGltZy5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSdcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlRGxnQ29uZmlybShkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcpe1xyXG4gICAgbGV0IGNvbmZpcm1EaXZTdHlsZSA9IHtcclxuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcclxuICAgICAgICBoZWlnaHQ6IDM1XHJcbiAgICB9XHJcbiAgICBsZXQgY29uZmlybURpdiA9IG5ldyBDb250ZW50KGRsZy5kb20sY29uZmlybURpdlN0eWxlKVxyXG4gICAgY29uZmlybURpdi5kb20uc3R5bGUudG9wID0gdG9wXHJcbiAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXHJcbiAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXHJcbiAgICBsZXQgY29uZmlybVN0eWxlID0ge1xyXG4gICAgICAgIHdpZHRoOiAxMjAsXHJcbiAgICAgICAgaGVpZ2h0OiAzNVxyXG4gICAgfVxyXG4gICAgbGV0IGNvbmZpcm0gPSBuZXcgQ29udGVudChjb25maXJtRGl2LmRvbSxjb25maXJtU3R5bGUpXHJcbiAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xyXG4gICAgY29uZmlybS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXHJcbiAgICBjb25maXJtLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXHJcbiAgICBjb25maXJtLmRvbS5pbm5lclRleHQgPSAnT0snXHJcbiAgICBjb25maXJtLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xyXG4gICAgY29uZmlybS5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlZWVlZWUnXHJcbiAgICAgICAgICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzAwODgwMCdcclxuICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXHJcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IGRsZy5kb20ubGFzdEVsZW1lbnRDaGlsZFxyXG4gICAgICAgICAgICB3aGlsZShjaGlsZCl7XHJcbiAgICAgICAgICAgICAgICBkbGcuZG9tLnJlbW92ZUNoaWxkKGNoaWxkKVxyXG4gICAgICAgICAgICAgICAgY2hpbGQgPSBkbGcuZG9tLmxhc3RFbGVtZW50Q2hpbGRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkbGcuZG9tLnJlbW92ZSgpXHJcbiAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxyXG5cdFx0fSgpKVxyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgKiBhcyBlelV0aWxzIGZyb20gJy4vdXRpbHMnXHJcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4vQ2FudmFzL2NhbnZhcydcclxuaW1wb3J0IHsgY2FudmFzU3R5bGUgfSBmcm9tICcuL0NhbnZhcy9jYW52YXMnXHJcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcclxuaW1wb3J0ICogYXMgZXpSZWN0YW5nbGUgZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcclxuaW1wb3J0IHsgQ2xhc3MgfSBmcm9tICdlc3RyZWUnXHJcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi9FbGVtZW50J1xyXG5cclxuXHJcbmV4cG9ydCB7UmVjdGFuZ2xlfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xyXG4vLyBleHBvcnQgeyBBZGpvaW5SZWN0LFJlY3RDZW50ZXIgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvbGluZSdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2FyYydcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXHJcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xyXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvdGV4dCdcclxuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2ltYWdlJ1xyXG5leHBvcnQgKiBmcm9tICcuL1RpbWUvdGltZSdcclxuZXhwb3J0ICogZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzcydcclxuZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcclxuZXhwb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xyXG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xyXG5leHBvcnQgeyBMaW5lIH0gZnJvbSAnLi9HcmFwaGljL2xpbmUnXHJcbmV4cG9ydCB7IEFyYyB9IGZyb20gJy4vR3JhcGhpYy9hcmMnXHJcbmV4cG9ydCB7IEVsbGlwc2UgfSBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcclxuZXhwb3J0IHsgUG9seWdvbiB9IGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xyXG5leHBvcnQgeyBUZXh0IH0gZnJvbSAnLi9HcmFwaGljL3RleHQnXHJcbmV4cG9ydCB7IEltZyB9IGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcclxuZXhwb3J0IHsgVGltZSB9IGZyb20gJy4vVGltZS90aW1lJ1xyXG5leHBvcnQgeyBEaWFsb2d1ZSB9IGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXHJcbi8vIGV4cG9ydCB7IG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xyXG4gXHJcbi8vIGxldCBFenBzeUxpc3QgPSBuZXcgQXJyYXkoKTtcclxuXHJcbmNsYXNzIEV6cHN5IHtcclxuICAgIGlkOiBudW1iZXJcclxuICAgIGRvbTogSFRNTEVsZW1lbnRcclxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXHJcbiAgICBjU3R5bGU/OiBjYW52YXNTdHlsZVxyXG5cclxuICAgIC8vIFJlY3RhbmdsZTogUmVjdGFuZ2xlXHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcixkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKXtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5kb20gPSBkb207XHJcbiAgICAgICAgdGhpcy5jU3R5bGUgPSBjU3R5bGU7XHJcbiAgICAgICAgdGhpcy5jdHggPSBlekNhbnZhcy5jcmVhdGVDYW52YXMoZG9tLGNTdHlsZSk7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5jdHgpXHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XHJcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XHJcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XHJcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcclxuICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgYWRkKGVsOiBFbGVtZW50cyl7XHJcbiAgICAgICAgLy8gY29uc29sZS5kaXIoJ3N1Y2Nlc3MnKVxyXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxyXG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8vIGV4cG9ydCBmdW5jdGlvbiBwdXNoRXpwc3lMaXN0KGV6OiBFenBzeSl7XHJcbi8vICAgICBsZXQgbnVtID0gZXouaWQ7XHJcbi8vICAgICBFenBzeUxpc3RbbnVtXSA9IGV6O1xyXG4vLyB9XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaW5pdChkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKSB7XHJcbiAgICBsZXQgZXogPSBuZXcgRXpwc3koZXpVdGlscy5Db3VudCgpLGRvbSxjU3R5bGUpO1xyXG4gICAgLy8gcHVzaEV6cHN5TGlzdChleik7XHJcbiAgICAvLyBjb25zb2xlLmRpcihFenBzeUxpc3QpO1xyXG4gICAgcmV0dXJuIGV6O1xyXG59Il0sIm5hbWVzIjpbIm5hbWVJZCIsImV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZSIsImV6SnVkZ2UuanVkZ2VEaXZTdHlsZSIsImV6RGl2LmNyZWF0ZURpdiIsImV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUiLCJlekNhbnZhcy5jcmVhdGVDYW52YXMiLCJlekp1ZGdlLmp1ZGdlRWxlbWVudCIsImV6VXRpbHMuQ291bnQiXSwibWFwcGluZ3MiOiJBQUNBLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztTQUVBLEtBQUs7SUFDakIsT0FBTyxPQUFPLEVBQUUsQ0FBQztBQUNyQjs7QUNEQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7TUFFSCxLQUFLO0lBQ2QsRUFBRSxDQUFRO0lBQ1YsTUFBTSxDQUFRO0lBQ2QsU0FBUyxDQUEwQjtJQUVuQyxZQUFZLEVB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LEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUNYLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxFQUN2TztRQUNJLENBQUMsR0FBRyxJQUFJLENBQUMs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RUFBRSxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDMUMsVUFBVSxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUNwQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7QUFDbkIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLEdBQVEsRUFBQyxHQUE2QjtJQUN2RCxJQUFJLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUE7SUFDeEIsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ1osR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBOztJQUdmLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdEUsR0FBRyxDQUFDLFdBQVcsR0FB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LEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMzRTtBQUNMLENBQUM7U0FFZSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQWtCLEVBQUMsRUFBWTtJQUNoRSxJQUFHLEVBQUUsWUFBWSxTQUFTLEVBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRSxJQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsRUFDL0M7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBRUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFHLEVBQUUsS0FBSyxFQUFFLEVBQ1o7WUFDSSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDeEMsSUFBRyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUU7YUFDM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDRztnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7YUFDRztZQUNBLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsS0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN4QyxJQUFHLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRTthQUMzQjtnQkFDSSxPQUFPLElBQUksQ0FBQTthQUNkO2lCQUNHO2dCQUNBLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7U0FDSjtLQUVKO1NBQ0ksSUFBRyxFQUFFLFlBQVksR0FBRyxFQUN6QixDQUVDO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRSxJQUFHLENBQUMsSUFBSSxDQUFDLEVBQ1Q7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxPQUFPLEVBQzdCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVB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
