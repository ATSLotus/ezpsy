let idStart = 0;
function Count() {
    return idStart++;
}

function createCanvas(dom, cStyle) {
    let c = document.createElement('canvas');
    // let cStyle: canvasStyle = {
    //     width: 100,
    //     height: 100
    // }
    c.style.position = 'absolute';
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

class Elements {
    shape;
    style;
    ctx;
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
    setCanvasStyle(cStyle) {
        let c = this.ctx.canvas;
        cStyle = judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
    }
    remove() {
        let ctx = this.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1, 1);
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillRect(0, 0, 1, 1);
        ctx.closePath();
        ctx.restore();
        // ctx.globalCompositeOperation='source-over'
    }
    scale(scaleWidth, scaleHeight) {
        let ctx = this.ctx;
        this.remove();
        ctx.save();
        ctx.beginPath();
        ctx.scale(scaleWidth, scaleHeight);
        judgeElement(this, ctx);
        ctx.closePath();
        ctx.restore();
    }
    rotate(ang) {
        let ctx = this.ctx;
        this.remove();
        ctx.save();
        ctx.beginPath();
        ctx.rotate(ang);
        judgeElement(this, ctx);
        ctx.closePath();
        ctx.restore();
    }
    translate(x, y) {
        let ctx = this.ctx;
        this.remove();
        ctx.save();
        ctx.beginPath();
        ctx.translate(x, y);
        judgeElement(this, ctx);
        ctx.closePath();
        ctx.restore();
    }
}

let groupId = 0;
class Group extends Elements {
    id;
    length;
    // ctx: CanvasRenderingContext2D
    groupList;
    constructor(el) {
        super();
        this.ctx = super.ctx;
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
let nameId$8 = 0;
// class TypeTest implements RectangleShape{
//     x: number
//     y: number
//     width: number
//     height: number
// }
class Rectangle extends Elements {
    name = {
        name: "rect" + nameId$8.toString(),
        graphicId: nameId$8
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$8++;
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

let nameId$7 = 0;
class Circle extends Elements {
    name = {
        name: "circle" + nameId$7.toString(),
        graphicId: nameId$7
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$7++;
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

let nameId$6 = 0;
class Line extends Elements {
    name = {
        name: "line" + nameId$6.toString(),
        graphicId: nameId$6
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$6++;
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

let nameId$5 = 0;
class Arc extends Elements {
    name = {
        name: "arc" + nameId$5.toString(),
        graphicId: nameId$5
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$5++;
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

let nameId$4 = 0;
class Ellipse extends Elements {
    name = {
        name: "ellipse" + nameId$4.toString(),
        graphicId: nameId$4
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$4++;
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

let nameId$3 = 0;
class Polygon extends Elements {
    name = {
        name: "polygon" + nameId$3.toString(),
        graphicId: nameId$3
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        // console.dir(opts.style)
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "#000",
                lineWidth: 2
            };
        }
        nameId$3++;
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

let nameId$2 = 0;
class Text extends Elements {
    name = {
        name: "text" + nameId$2.toString(),
        graphicId: nameId$2
    };
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
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
        nameId$2++;
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

let nameId$1 = 0;
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
        name: "img" + nameId$1.toString(),
        graphicId: nameId$1
    };
    Img;
    ImgData;
    IsChange;
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
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
        nameId$1++;
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

function createGratLinearGradient(ctx, [x0, y0, x1, y1], num, s) {
    let fill = ctx.createLinearGradient(x0, y0 - s, x1, y1 - s);
    fill.addColorStop(0, '#fff');
    for (let i = 1; i < num; i++) {
        if (i % 2 === 1) {
            fill.addColorStop(i / num, '#000');
        }
        else {
            fill.addColorStop(i / num, '#fff');
        }
    }
    fill.addColorStop(1, '#fff');
    return fill;
}

let nameId = 0;
class Grat extends Elements {
    name = {
        name: "grat" + nameId.toString(),
        graphicId: nameId
    };
    constructor(opts) {
        super();
        if (!opts.shape.desity) {
            opts.shape.desity = 35;
        }
        this.shape = opts.shape;
        if (opts.style) {
            this.style = opts.style;
        }
        else {
            this.style = {
                fill: "none",
                stroke: "none",
                lineWidth: 2
            };
        }
        nameId++;
    }
    // play(speed?: number,delay?: number){
    //     if(!delay){
    //         delay = 8
    //         if(!speed)
    //         {
    //             speed = 8
    //         }
    //     }
    //     let ctx = this.ctx
    //     let [x0,y0,x1,y1] = [this.shape.x-this.shape.r,this.shape.y-this.shape.r,this.shape.x-this.shape.r,this.shape.y+3*this.shape.r]
    //     let index = speed;
    //     let that = this;
    //     (async function(){
    //         for(let i = 0;i > -1;i++)
    //         {
    //             let fill = createGratLinearGradient(ctx,[x0,y0,x1,y1],that.shape.desity,index*i);
    //             if(index*i >= 2*that.shape.r)
    //             {
    //                 i = 0
    //             }
    //             updateGrat(that,ctx,fill)
    //             // console.dir(i)
    //             await delay_frame(delay)
    //         }
    //     })()
    // }
    play(speed, delay) {
        if (!delay) {
            delay = 8;
            if (!speed) {
                speed = 8;
            }
        }
        let ctx = this.ctx;
        // console.dir('a')
        // let [x0,y0,x1,y1] = [this.shape.x-this.shape.r,this.shape.y-this.shape.r,this.shape.x-this.shape.r,this.shape.y+3*this.shape.r]
        let index = speed;
        let that = this;
        (async function () {
            for (let i = 0; i > -1; i++) {
                if (index * i >= 2 * that.shape.r) {
                    i = 0;
                }
                updateGrat0(that, ctx, index * i);
                console.dir(i);
                await delay_frame(delay);
            }
        })();
    }
}
function makeGrat(grat, ctx) {
    let sh = grat.shape;
    // console.dir(sh)
    let num = sh.desity;
    // let fill = ctx.createLinearGradient(sh.x-sh.r,sh.y-sh.r,sh.x-sh.r,sh.y+sh.r)
    // fill.addColorStop(0,'white')
    // for(let i = 1;i < num;i++){
    //     if(i%2 === 1){
    //         fill.addColorStop(i/num,'black')
    //     }
    //     else{
    //         fill.addColorStop(i/num,'white')
    //     }
    // }
    // fill.addColorStop(1,'white')
    let fill = createGratLinearGradient(ctx, [sh.x - sh.r, sh.y - sh.r, sh.x - sh.r, sh.y + 3 * sh.r], num, 0);
    let c = ctx.canvas;
    c.style.borderRadius = '50%';
    grat.style.fill = fill;
    ctx.beginPath();
    // ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI)
    ctx.rect(sh.x - sh.r, sh.y - sh.r, sh.x + sh.r, sh.y + 3 * sh.r);
    judgeStyle(grat, ctx);
    ctx.closePath();
    // ctx.save()
    // ctx.beginPath();
    // ctx.rect(sh.x-sh.r,sh.y-sh.r,sh.x+sh.r,sh.y+2*sh.r);
    // judgeStyle(grat,ctx);
    // ctx.closePath()
    // ctx.globalCompositeOperation = 'destination-in'
    // ctx.beginPath()
    // ctx.fillStyle = 'black'
    // ctx.arc(sh.x,sh.y,sh.r,0,2*Math.PI);
    // ctx.fill()
    // ctx.closePath();
    // ctx.restore()
    return grat;
}
function updateGrat0(grat, ctx, num) {
    grat.remove();
    ctx.save();
    ctx.beginPath();
    ctx.translate(0, -num);
    ctx.rect(grat.shape.x - grat.shape.r, grat.shape.y - grat.shape.r, grat.shape.x + grat.shape.r, grat.shape.y + 3 * grat.shape.r);
    judgeStyle(grat, ctx);
    ctx.closePath();
    ctx.restore();
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
    else if (el instanceof Grat) {
        makeGrat(el, ctx);
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
            stroke: '"#000000"',
            lineWidth: 2
        };
    }
    let st = el.style;
    if (st.lineWidth === undefined) {
        st.lineWidth = 2;
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
            st.stroke = '"#000000"';
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
                                        if (conStyle.seledStr[t] !== undefined && conStyle.seledStr[t] !== '') {
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
    let count = 0;
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
    selectText.dom.style.transition = 'top 0.8s linear';
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
    selectDiv.dom.style.transition = 'all 0.8s linear';
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
        if (i === 0) {
            selectContent[i].dom.style.borderRadius = '15px 15px 0px 0px';
        }
        // selectContent[i].dom.style.borderRadius = '15px'
        selectContent[i].dom.style.position = 'relative';
        selectContent[i].dom.style.transition = 'all 0.8s linear';
        selectContent[i].dom.style.lineHeight = (36 / (conStyle.selStr.length + 2)).toString() + "px";
        selectContent[i].dom.style.color = color;
    }
    let selectAll = new Content(selectDiv, {
        width: 200,
        height: 36 / (conStyle.selStr.length + 2)
    });
    selectAll.dom.innerText = 'selectAll';
    // selectAll.dom.style.borderRadius = '15px'
    selectAll.dom.style.position = 'relative';
    selectAll.dom.style.transition = 'all 0.8s linear';
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
                    count++;
                    if (count === conStyle.selStr.length) {
                        selectAll.dom.style.background = color;
                        selectAll.dom.style.color = color0;
                    }
                }
                else {
                    selectStr[i] = '';
                    selectContent[i].dom.style.background = color0;
                    selectContent[i].dom.style.color = color;
                    selectAll.dom.style.background = color0;
                    selectAll.dom.style.color = color;
                    index1 = false;
                    index0[i] = false;
                    count--;
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
                count = conStyle.selStr.length;
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
                count = 0;
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
            selectText.dom.style.borderRadius = '0px 0px 15px 15px';
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
            selectText.dom.style.borderRadius = '15px';
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

// export { animate } from './Animate/animate'
// export { makeRectangle } from './Graphic/rectangle'
// let EzpsyList = new Array();
class Ezpsy {
    id;
    dom;
    ctx;
    ctxList;
    cStyle;
    // Rectangle: Rectangle
    constructor(id, dom, cStyle) {
        this.id = id;
        this.dom = dom;
        cStyle = judgeCanvasStyle(cStyle);
        this.cStyle = cStyle;
        this.ctxList = [];
        // this.ctx = ezCanvas.createCanvas(dom,cStyle);    //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
        // console.dir(this.ctx)
    }
    setCanvasStyle(cStyle) {
        for (let i = 0; i < this.ctxList.length; i++) {
            let c = this.ctxList[i].canvas;
            c.width = cStyle.width;
            c.height = cStyle.height;
        }
    }
    add(el) {
        // console.dir('success')
        this.ctx = createCanvas(this.dom, this.cStyle); //此处创建canvas将创建多个canvas，但可仅清除单一图形，因此也无法使用ez.setCanvasStyle
        this.ctxList.push(this.ctx);
        let ctx = this.ctx;
        if (el instanceof Elements) {
            el.ctx = ctx;
            judgeElement(el, ctx);
        }
        else {
            for (let i = 0; i < el.length; i++) {
                el[i].ctx = ctx;
                judgeElement(el[i], ctx);
            }
        }
    }
    // aliasing(style: string){
    //     this.ctx.globalCompositeOperation = style
    // }
    animate(func, delay) {
        console.dir(func);
        (async function () {
            while (1) {
                func();
                await WaitSecs(delay);
            }
        })();
    }
    clear() {
        let that = this;
        return new Promise(function (resolve, reject) {
            let child = that.dom.lastElementChild;
            while (child) {
                that.dom.removeChild(child);
                child = that.dom.lastElementChild;
            }
            resolve(0);
        });
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
    Grat: Grat,
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
    DlgInit: DlgInit,
    makeGrat: makeGrat
});

export { EZPSY as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3NyYy9KdWRnZS9qdWRnZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzcy50cyIsIi4uLy4uL3NyYy9EaXYvZGl2LnRzIiwiLi4vLi4vc3JjL0RpYWxvZ3VlL2RpYWxvZ3VlLnRzIiwiLi4vLi4vc3JjL2V6cHN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxubGV0IGlkU3RhcnQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaWRTdGFydCsrO1xufSIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgY2FudmFzU3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIC8vIGxldCBjU3R5bGU6IGNhbnZhc1N0eWxlID0ge1xuICAgIC8vICAgICB3aWR0aDogMTAwLFxuICAgIC8vICAgICBoZWlnaHQ6IDEwMFxuICAgIC8vIH1cbiAgICBjLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9tLmFwcGVuZChjKTtcbiAgICByZXR1cm4gY3R4O1xufSIsIlxuY2xhc3MgdGltZXtcbiAgICBob3VyOiBudW1iZXJcbiAgICBtaW51dGVzOiBudW1iZXJcbiAgICBzZWNvbmRzOiBudW1iZXJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IHRpbWVcbiAgICBpbnN0YW50VGltZTogdGltZVxuICAgIHRyYW5zaWVudFRpbWU6IHRpbWVbXVxuICAgIHRpbWVWYWx1ZTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBuZXcgdGltZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGljKCk6IFRpbWV7XG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXG4gICAgdC5zdGFydCgpXG4gICAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZSk6IG51bWJlcntcbiAgICBsZXQgdCA9IDA7XG4gICAgbGV0IHRzID0gbmV3IEFycmF5KClcbiAgICB0aW1lLnJlY29yZCgpXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXG4gICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lLm1pbnV0ZXMgLSB0aW1lLnN0YXJ0VGltZS5taW51dGVzXG4gICAgdHNbMl0gPSB0aW1lLmluc3RhbnRUaW1lLnNlY29uZHMgLSB0aW1lLnN0YXJ0VGltZS5zZWNvbmRzXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xuICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4gICAgdGltZS50aW1lVmFsdWUgPSB0O1xuICAgIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xuICAgIGxldCB0ID0gVG9jKHRpbWUpXG4gICAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIsbWVzc2FnZT86IGFueSl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlfZnJhbWUobnVtMSl7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT09bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbn0pfTsiLCJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRze1xuICAgIHNoYXBlPzogU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlIFxuICAgIGN0eD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIGNvbnN0cnVjdG9yKCl7XG5cbiAgICB9XG4gICAgbm9GaWxsKCl7XG4gICAgICAgIHRoaXMuc3R5bGUuZmlsbCA9ICdub25lJztcbiAgICB9XG4gICAgbm9TdHJva2UoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5saW5lV2lkdGggPSAwO1xuICAgICAgICAvLyBpZih0aGlzLnN0eWxlLmZpbGwgIT09ICdub25lJyAmJiB0aGlzLnN0eWxlLmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IHRoaXMuc3R5bGUuZmlsbFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IFwiI2ZmZlwiO1xuICAgICAgICAvLyAgICAgY29uc29sZS5kaXIoJ0Vycm9yIScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSAnbm9uZSdcbiAgICB9XG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIH1cbiAgICByZW1vdmUoKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGN0eC5maWxsU3R5bGU9XCJ3aGl0ZVwiXHRcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCwxLDEpXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLDEsMSk7XG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKVx0XG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICAgICAgLy8gY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj0nc291cmNlLW92ZXInXG4gICAgfVxuICAgIHNjYWxlKHNjYWxlV2lkdGg6IG51bWJlcixzY2FsZUhlaWdodDogbnVtYmVyKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4LnNjYWxlKHNjYWxlV2lkdGgsc2NhbGVIZWlnaHQpXG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KVxuICAgICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgIH1cbiAgICByb3RhdGUoYW5nOiBudW1iZXIpe1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgdGhpcy5yZW1vdmUoKVxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICBjdHgucm90YXRlKGFuZylcbiAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpXG4gICAgICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgfVxuICAgIHRyYW5zbGF0ZSh4OiBudW1iZXIseTogbnVtYmVyKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIHRoaXMucmVtb3ZlKClcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LHkpXG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KTtcbiAgICAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICB9XG4gICAgLy8gYW5pbWF0ZSgpe1xuICAgIC8vICAgICBpZih0aGlzLmN0eClcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgdGhpcy5hbmltYXRlLnByb3RvdHlwZS5kb25lID0gZnVuY3Rpb24oZnVuYzogRnVuY3Rpb24pe1xuICAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgY29uc29sZS5lcnJvcigpO1xuICAgIC8vICAgICB9XG4gICAgICAgIFxuICAgIC8vIH1cbn0iLCJpbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcblxubGV0IGdyb3VwSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBpZDogbnVtYmVyXG4gICAgbGVuZ3RoOiBudW1iZXJcbiAgICAvLyBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIGdyb3VwTGlzdDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwXG4gICAgXG4gICAgY29uc3RydWN0b3IoZWw6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cCl7XG5cbiAgICAgICAgc3VwZXIoKVxuXG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIHRoaXMuaWQgPSBncm91cElkO1xuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IDFcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSBlbC5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ncm91cExpc3QgPSBlbDtcblxuICAgICAgICBncm91cElkKysgXG4gICAgfVxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBqdWRnZUNoYW5nZVR5cGUsanVkZ2VTaWRlLGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5cblxuaW50ZXJmYWNlIFJlY3RhbmdsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBSZWN0YW5nbGVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUmVjdGFuZ2xlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmNsYXNzIENlbnRlcntcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLnggPSByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy55ID0gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHQgLyAyO1xuICAgIH1cbn1cblxuY2xhc3MgU2l6ZXtcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxufVxuXG5jbGFzcyBTaWRlWFl7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RHcm91cCBleHRlbmRzIEdyb3VwIHtcbiAgICBQYXJlbnRzUmVjdDogUmVjdGFuZ2xlXG4gICAgY29uc3RydWN0b3IocmVjdDogUmVjdGFuZ2xlLGVsOiBFbGVtZW50c1tdKXtcbiAgICAgICAgc3VwZXIoZWwpXG4gICAgICAgIHRoaXMuUGFyZW50c1JlY3QgPSByZWN0O1xuICAgIH1cbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbi8vIGNsYXNzIFR5cGVUZXN0IGltcGxlbWVudHMgUmVjdGFuZ2xlU2hhcGV7XG4vLyAgICAgeDogbnVtYmVyXG4vLyAgICAgeTogbnVtYmVyXG4vLyAgICAgd2lkdGg6IG51bWJlclxuLy8gICAgIGhlaWdodDogbnVtYmVyXG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicmVjdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFJlY3RhbmdsZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eDtcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG5cbiAgICB9XG59XG5cbmNsYXNzIGxvZ2ljUmVjdCBleHRlbmRzIFJlY3RhbmdsZXtcbiAgICByZWN0UGFyZW50czA6IFJlY3RhbmdsZTtcbiAgICByZWN0UGFyZW50czE6IFJlY3RhbmdsZTtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoe3NoYXBlOntcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfX0pXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMwID0gcmVjdFBhcmVudHMwXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMxID0gcmVjdFBhcmVudHMxXG4gICAgfVxufVxuXG5jbGFzcyBjbGlwUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXG4gICAgfVxufVxuXG5jbGFzcyB1bmlvblJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gaW5zdGFuY2VvZlJlY3RhbmdsZShlOiBhbnkpOiBlIGlzIFJlY3RhbmdsZVNoYXBle1xuLy8gICAgIHJldHVybiAgaW4gZTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuLy8gICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4vLyAgICAgbGV0IHN0ID0gcmVjdC5zdHlsZTtcbi8vICAgICBsZXQgZixzO1xuLy8gICAgIC8vIGNvbnNvbGUuZGlyKHN0LnN0cm9rZSlcbi8vICAgICBbY3R4LGYsc10gPSBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbi8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSA9PT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSBpZihzdC5maWxsID09PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIGNvbnNvbGUuZGlyKFwiZXJyb3IhSXQgY2FuJ3QgcGFpbnQgYSByZWN0YW5nbGUgd2l0aG91dCBmaWxsU3R5bGUgYW5kIHN0cm9rZVN0eWxlXCIpXG4vLyAgICAgfVxuICAgIFxuLy8gICAgIHJldHVybiByZWN0O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XG4gICAgbGV0IHNoID0gcmVjdC5zaGFwZTtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LnJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4gICAganVkZ2VTdHlsZShyZWN0LGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiByZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWRqb2luUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZml4ZWRTdHlsZT86IHN0cmluZ3xudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLmi7zmjqUgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmi7zmjqXnn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdDtcbiAgICBpZighZml4ZWRTdHlsZSlcbiAgICB7XG4gICAgICAgIGZpeGVkU3R5bGUgPSAnUkVDVExFRlQnXG4gICAgfVxuICAgIGxldCBmID0ganVkZ2VDaGFuZ2VUeXBlKGZpeGVkU3R5bGUpO1xuICAgIC8vIGNvbnNvbGUuZGlyKCdmPScrZik7XG4gICAgaWYoZiA9PT0gMSl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0xlZnQoZml4ZWRSZWN0LHJlY3QpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihuZXdSZWN0KVxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Ub3AoZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9SaWdodChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNCl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0JvdHRvbShmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgb3JkZXIhJylcbiAgICB9XG4gICAgXG4gICAgXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9MZWZ0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggLSByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfUmlnaHQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X1RvcChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfQm90dG9tKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdENlbnRlcihyZWN0OiBSZWN0YW5nbGUpOiBDZW50ZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLkuK3lv4NcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihyZWN0KTtcbiAgICByZXR1cm4gY2VudGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxzaWRlMD86IG51bWJlcnxzdHJpbmcsc2lkZTE/OiBudW1iZXJ8c3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5a+56b2QIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5a+56b2Q55+p5b2iIGZpeGVkU3R5bGUg5a+56b2Q5b2i5byPXG4gICAgaWYoc2lkZTAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUwID0gMFxuICAgICAgICBzaWRlMSA9IDBcbiAgICB9XG4gICAgaWYoc2lkZTEgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cblxuICAgIGlmKHJlY3Quc2hhcGUud2lkdGgqcmVjdC5zaGFwZS5oZWlnaHQgPiBmaXhlZFJlY3Quc2hhcGUud2lkdGgqZml4ZWRSZWN0LnNoYXBlLmhlaWdodCApXG4gICAge1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhVGhlIGFyZWEgb2YgZmlleGVkUmVjdCAgaXMgc21hbGxlciB0aGFuIHRoZSByZWN0IScpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBsZXQgW2YwLGYxXSA9IGp1ZGdlU2lkZShzaWRlMCxzaWRlMSk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGYwK1wiIFwiK2YxKTtcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgIHNoYXBlOntcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHMgPSBuZXcgU2lkZVhZKCk7XG4gICAgICAgIGlmKGYwID09PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMSB8fCBmMSA9PT0gMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGYwID09PSAxIHx8IGYwID09PSAzKVxuICAgICAgICB7XG4gICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kaXIocylcbiAgICAgICAgXG4gICAgICAgIG5ld1JlY3Quc2hhcGUueCA9IHMueDtcbiAgICAgICAgbmV3UmVjdC5zaGFwZS55ID0gcy55O1xuICAgICAgICByZXR1cm4gbmV3UmVjdDtcbiAgICB9XG4gICAgXG4gICAgXG59XG5cbmZ1bmN0aW9uIEFsaWduWFkoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGY6IG51bWJlcik6IFNpZGVYWXtcbiAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKVxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKGZpeGVkUmVjdCk7XG4gICAgLy8gY29uc29sZS5kaXIoY2VudGVyKVxuICAgIGlmKGYgPT09IDApXG4gICAgeyAgIFxuICAgICAgICBzLnggPSBjZW50ZXIueCAtIHJlY3Quc2hhcGUud2lkdGgvMlxuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAxKVxuICAgIHtcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yIC0gcmVjdC5zaGFwZS53aWR0aFxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDQpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMiAtIHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9mZnNldFJlY3QocmVjdDogUmVjdGFuZ2xlLFt4LHldOiBbbnVtYmVyLG51bWJlcl0pOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlubPnp7tcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFycmFuZ2VSZWN0cyhuOiBudW1iZXIsW3hOdW1iZXIseU51bWJlcl06IFtudW1iZXIsbnVtYmVyXSx3aW5kb3dSZWN0OiBSZWN0YW5nbGUsc3R5bGU/OiBudW1iZXIpOiBSZWN0R3JvdXB7XG4gICAgLy/liJvlu7rnn6nlvaLpmLXliJdcbiAgICBsZXQgcmVjdCA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGxldCBudW0gPSB4TnVtYmVyICogeU51bWJlclxuICAgIGxldCB4ID0gd2luZG93UmVjdC5zaGFwZS54XG4gICAgbGV0IHkgPSB3aW5kb3dSZWN0LnNoYXBlLnlcbiAgICBsZXQgd2lkdGggPSB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC8geE51bWJlclxuICAgIGxldCBoZWlnaHQgPSB3aW5kb3dSZWN0LnNoYXBlLmhlaWdodCAvIHlOdW1iZXJcbiAgICAvLyBjb25zb2xlLmRpcihbeCx5LHdpZHRoLGhlaWdodF0pXG5cbiAgICBpZihuID4gbnVtKXtcbiAgICAgICAgbiA9IG51bVxuICAgIH1cblxuICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDA7XG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPiAxKVxuICAgIHtcbiAgICAgICAgc3R5bGUgPSAwXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IDApXG4gICAge1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpZHRoICogaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2luZG93UmVjdC5zaGFwZS53aWR0aCAtIHdpZHRoIC0gd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG4gICAgLy8gY29uc29sZS5kaXIocmVjdClcblxuICAgIGxldCByZWN0R3JvdXAgPSBuZXcgUmVjdEdyb3VwKHdpbmRvd1JlY3QscmVjdCk7XG4gICAgcmV0dXJuIHJlY3RHcm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgLy/np7vliqjnn6nlvaLoh7Pmn5Dnn6nlvaLkuK3lv4MgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmk43kvZznn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdCA9IEFsaWduUmVjdChmaXhlZFJlY3QscmVjdCwwLDApO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0T25Qb2ludChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IE9mZnNldFJlY3QocmVjdCxbeCx5XSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFdpZHRoKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICAvL+iOt+WPluefqeW9ouWuveW6plxuICAgIGxldCB3aWR0aCA9IHJlY3Quc2hhcGUud2lkdGhcbiAgICByZXR1cm4gd2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RIZWlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i6auY5bqmXG4gICAgbGV0IGhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RTaXplKHJlY3Q6IFJlY3RhbmdsZSk6IFNpemV7XG4gICAgLy/ojrflj5bnn6nlvaLlrr3pq5hcbiAgICBsZXQgc2l6ZSA9IG5ldyBTaXplKHJlY3QpXG4gICAgcmV0dXJuIHNpemU7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcbi8vICAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xuLy8gICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3QwLnNoYXBlLngscmVjdDAuc2hhcGUueSxyZWN0MC5zaGFwZS53aWR0aCxyZWN0MC5zaGFwZS5oZWlnaHRdXG4vLyAgICAgbGV0IFt4MSx5MSx3MSxoMV0gPSBbcmVjdDEuc2hhcGUueCxyZWN0MS5zaGFwZS55LHJlY3QxLnNoYXBlLndpZHRoLHJlY3QxLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgUmVjdCx4bix5bix3bixobjtcbi8vICAgICBsZXQgYXJlYTAgPSB3MCAqIGgwO1xuLy8gICAgIGxldCBhcmVhMSA9IHcxICogaDE7XG4vLyAgICAgbGV0IHgseSx3LGhcbi8vICAgICBsZXQgeHQseXQsd3QsaHQscmVjdFxuLy8gICAgIGlmKGFyZWEwID49IGFyZWExKVxuLy8gICAgIHtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MCx5MCx3MCxoMF07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MDtcbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MSx5MSx3MSxoMV07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MTtcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5kaXIoW3gseSx3LGhdKTtcbi8vICAgICBjb25zb2xlLmRpcihbeHQseXQsd3QsaHRdKVxuLy8gICAgIGlmKCFJc0luUmVjdChbeCx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5K2hdLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHldLHJlY3QpICYmICFJc0luUmVjdChbeCx5K2hdLHJlY3QpKXtcbi8vICAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICB3biA9IE1hdGguYWJzKE1hdGgubWluKHgwICsgdzAgLHgxICsgdzEpIC0gTWF0aC5tYXgoeDAsIHgxKSlcbi8vICAgICAgICAgaG4gPSBNYXRoLmFicyhNYXRoLm1pbih5MCArIGgwLCB5MSArIGgxKSAtIE1hdGgubWF4KHkwLCB5MSkpXG4vLyAgICAgICAgIGlmKElzSW5SZWN0KFt4LHldLHJlY3QpKXtcbi8vICAgICAgICAgICAgIHhuID0geDtcbi8vICAgICAgICAgICAgIHluID0geTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4ID49IHh0ICYmIHg8PXh0K3d0KSAmJiAoeSA8IHl0IHx8IHkgPiB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZigoeCA8IHh0IHx8IHggPiB4dCt3dCkgJiYgKHkgPj0geXQgJiYgeSA8PSB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcbi8vICAgICAgICAgICAgIHluID0geVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobilcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICAgICAgUmVjdCA9IFt4bix5bix3bixobl07XG4gICAgICAgIFxuLy8gICAgIH1cblxuLy8gICAgIGxldCBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4vLyAgICAgcmV0dXJuIG5ld1JlY3Q7XG5cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4gICAgbGV0IG5ld1JlY3QsUmVjdFxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIGlmKElzSW5SZWN0KFt4bDAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4bDEseWIxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5YjFdLHJlY3QwKSlcbiAgICB7XG4gICAgICAgIHggPSBNYXRoLm1heCh4bDAseGwxKTtcbiAgICAgICAgeSA9IE1hdGgubWF4KHl0MCx5dDEpO1xuICAgICAgICB3ID0gTWF0aC5taW4oeHIwLHhyMSkgLSB4O1xuICAgICAgICBoID0gTWF0aC5taW4oeWIwLHliMSkgLSB5O1xuICAgICAgICBSZWN0ID0gW3gseSx3LGhdXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cbiAgICB9XG5cbiAgICBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Q7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzSW5SZWN0KFt4LHldOiBbbnVtYmVyLG51bWJlcl0scmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreeCueaYr+WQpuWcqOefqeW9ouWGhVxuICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3Quc2hhcGUueCxyZWN0LnNoYXBlLnkscmVjdC5zaGFwZS53aWR0aCxyZWN0LnNoYXBlLmhlaWdodF1cbiAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR3Jvd1JlY3QoZWw6IFJlY3RhbmdsZS8qfFJlY3RHcm91cHxHcm91cCovLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mraPmlL7otJ/nvKkgXG4gICAgLy8gaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgLy8ge1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6ZWwuc2hhcGUueCAtIGgsXG4gICAgICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCArIDIqaCxcbiAgICAgICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55IC0gdixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0ICsgMip2XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBuZXdSZWN0XG4gICAgICAgIFxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUmVjdEdyb3VwKVxuICAgIC8vIHtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgY29uc29sZS5kaXIoXCLnsbvlnovplJnor69cIilcbiAgICAvLyB9XG59ICAgICAgIFxuXG5leHBvcnQgZnVuY3Rpb24gSW5zZXRSZWN0KGVsOiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+e8qei0n+aUvlxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OmVsLnNoYXBlLnggKz0gaCxcbiAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggLT0gMipoLFxuICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSArPSB2LFxuICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCAtPSAyKnZcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjYWxlUmVjdChyZWN0OiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+avlOS+i+e8qeaUvlxuICAgIGxldCBoMCA9IHJlY3Quc2hhcGUud2lkdGggKiAoaC0xKSAvIDJcbiAgICBsZXQgdjAgPSByZWN0LnNoYXBlLmhlaWdodCAqICh2LTEpIC8gMlxuICAgIGNvbnNvbGUuZGlyKGgwKycgJyt2MClcbiAgICBsZXQgbmV3UmVjdCA9IEdyb3dSZWN0KHJlY3QsaDAsdjApXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzRW1wdHlSZWN0KHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XG4gICAgLy/liKTmlq3nn6npmLXmmK/lkKbkuLrnqbpcbiAgICBsZXQgYXJlYSA9IHJlY3Quc2hhcGUud2lkdGggKiByZWN0LnNoYXBlLmhlaWdodDtcbiAgICBpZihhcmVhID09PSAwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdE9mTWF0cml4KCl7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RMZWZ0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0UmlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0VG9wKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Qm90b20ocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5pb25SZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IHVuaW9uUmVjdHtcbiAgICBsZXQgbmV3UmVjdDtcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XG4gICAgbGV0IHgseSx3LGhcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcbiAgICB4ID0gTWF0aC5taW4oeGwwLHhsMSk7XG4gICAgeSA9IE1hdGgubWluKHl0MCx5dDEpO1xuICAgIHcgPSBNYXRoLm1heCh4cjAseHIxKSAtIHg7XG4gICAgaCA9IE1hdGgubWF4KHliMCx5YjEpIC0geTtcbiAgICBuZXdSZWN0ID0gbmV3IHVuaW9uUmVjdChbeCx5LHcsaF0scmVjdDAscmVjdDEpO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUmVjdChyZWN0OiBSZWN0YW5nbGUsZmlsbD86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUmVjdChyZWN0OiBSZWN0YW5nbGUsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQ2lyY2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQ2lyY2xlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJjaXJjbGVcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBkZWNsYXJlIHNoYXBlOiBDaXJjbGVTaGFwZVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IENpcmNsZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQ2lyY2xlKGNpcmNsZTogQ2lyY2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQ2lyY2xle1xuICAgIGxldCBzaCA9IGNpcmNsZS5zaGFwZVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpO1xuICAgIGp1ZGdlU3R5bGUoY2lyY2xlLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgcmV0dXJuIGNpcmNsZTtcbn0gXG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3RG90cyhbeCx5LHJdOiBbbnVtYmVyLG51bWJlcixudW1iZXJdLGNvbG9yOiBzdHJpbmcpOiBDaXJjbGV7XG4gICAgbGV0IGNpcmNsZSA9IG5ldyBDaXJjbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICByOiByXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBjb2xvcixcbiAgICAgICAgICAgIHN0cm9rZSA6ICdub25lJ1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gY2lyY2xlXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgTGluZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB4RW5kOiBudW1iZXIsXG4gICAgeUVuZDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBMaW5lT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IExpbmVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImxpbmVcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBMaW5lT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGNsYXNzIGxpbmV7XG4vLyAgICAgbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XG4vLyAgICAgICAgIGxldCBsID0gdGhpcy5tYWtlTGluZShsaW5lLGN0eCk7XG4vLyAgICAgICAgIHJldHVybiBsO1xuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuICAgIGxldCBzaCA9IGxpbmUuc2hhcGU7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54RW5kLHNoLnlFbmQpXG4gICAganVkZ2VTdHlsZShsaW5lLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIHJldHVybiBsaW5lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TGluZXMoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwKTogR3JvdXB7XG4gICAgLy/nu5jliLblpJrmnaHnur8gb3B0czrnur/mnaHlsZ7mgKdcbiAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAoZWwpXG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TWxpbmUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxnYXA/OiBudW1iZXJbXSxzdHlsZT86IGJvb2xlYW4sc3RpcHBsZT86IGJvb2xlYW4sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyBnYXDnur/kuYvpl7TnmoTpl7TpmpQgc3R5bGU9ZmFsc2XkuLrmsLTlubPlubPooYwsPXRydWXkuLrnq5bnm7TlubPooYwgc3RpcHBsZT1mYWxzZeS4uuWunue6vyw9dHJ1ZeS4uuiZmue6v1xuICAgIGlmKHdpZHRoR2FwID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHdpZHRoR2FwICE9PSAnbnVtYmVyJylcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gMTA7XG4gICAgICAgIGlmKHN0aXBwbGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3RpcHBsZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdGlwcGxlID09PSBmYWxzZVxuICAgICAgICAgICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3R5bGUgIT09ICdib29sZWFuJyl7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZihnYXAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IFsxMDAsMTAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsZXQgb3B0cyA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGlmKHN0aXBwbGUgPT09IGZhbHNlKVxuICAgIHtcbiAgICAgICAgb3B0c1swXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kK2dhcFtpLTFdKmlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSAoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgb3B0c1swXSA9IExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXSx3aWR0aEdhcCk7XG4gICAgICAgIGlmKHN0eWxlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4LHkrZ2FwW2ktMV0qaSx4RW5kLHlFbmQrZ2FwW2ktMV0qaV0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCtnYXBbaS0xXSppLHkseEVuZCtnYXBbaS0xXSppLHlFbmRdLHdpZHRoR2FwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICAgICBcbiAgICBcbiAgICBsZXQgZ3JvdXAgPSBEcmF3TGluZXMob3B0cyk7XG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW5lU3RpcHBsZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgd2lkdGhHYXDpl7TpmpQgXG4gICAgbGV0IGxpbmVsZW5ndGggPSBNYXRoLnNxcnQoTWF0aC5wb3coeEVuZC14LDIpK01hdGgucG93KHlFbmQteSwyKSlcbiAgICBpZih3aWR0aEdhcD5saW5lbGVuZ3RofHx3aWR0aEdhcD09PXVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gbGluZWxlbmd0aC8xMDtcbiAgICB9XG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IobGluZWxlbmd0aC93aWR0aEdhcClcbiAgICBsZXQgeGcgPSB3aWR0aEdhcCooeEVuZC14KS9saW5lbGVuZ3RoXG4gICAgbGV0IHlnID0gd2lkdGhHYXAqKHlFbmQteSkvbGluZWxlbmd0aFxuICAgIC8vIGNvbnNvbGUuZGlyKG51bSlcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxpbmUgPSBuZXcgQXJyYXkoKTtcbiAgICB3aGlsZShpPG51bSlcbiAgICB7XG4gICAgICAgIGxpbmVbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgreGcqaSxcbiAgICAgICAgICAgICAgICB5OiB5K3lnKmksXG4gICAgICAgICAgICAgICAgeEVuZDogeCt4ZyooaSsxKSxcbiAgICAgICAgICAgICAgICB5RW5kOiB5K3lnKihpKzEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGkrPTI7XG4gICAgfVxuICAgIGxldCBMaW5lU3RpcHBsZSA9IG5ldyBHcm91cChsaW5lKVxuICAgIHJldHVybiBMaW5lU3RpcHBsZVxufVxuXG4vLyBleHBvcnQgY2xhc3MgUG9seSBleHRlbmRzIEdyb3Vwe1xuLy8gICAgIHN0eWxlOiBTdHlsZVxuLy8gICAgIGNvbnN0cnVjdG9yKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCxzdHlsZT86IFN0eWxlKXtcbi8vICAgICAgICAgc3VwZXIoZWwpXG4vLyAgICAgICAgIGlmKHN0eWxlKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4vLyAgICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4vLyAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbi8vICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBBcmNTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGFuZ19mOiBudW1iZXIsXG4gICAgYW5nX2U6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQXJjT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEFyY1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIEFyYyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJhcmNcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBBcmNPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEFyY3tcbiAgICBsZXQgc3QgPSBhcmMuc3R5bGVcbiAgICBpZihzdC5maWxsID09PSB1bmRlZmluZWQgfHwgc3QuZmlsbCA9PT0gJ25vbmUnIHx8IHN0LmZpbGwgPT09ICcjZmZmJylcbiAgICB7XG4gICAgICAgIG1ha2VGcmFtZUFyYyhhcmMsY3R4KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbWFrZUZpbGxBcmMoYXJjLGN0eCk7XG4gICAgfVxuICAgIHJldHVybiBhcmM7XG59XG5cbmZ1bmN0aW9uIG1ha2VGcmFtZUFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZnVuY3Rpb24gbWFrZUZpbGxBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19mKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2YpKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgIGN0eC5zdHJva2UoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2UpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZSkpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLHNoLmFuZ19mLHNoLmFuZ19lKTtcbiAgICBqdWRnZVN0eWxlKGFyYyxjdHgpO1xuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVBcmMoYXJjOiBBcmMsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IEFyY3tcbiAgICAvL+eUu+eyl+e6v+W8pyBcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcblxuICAgIC8vIGp1ZGdlU3R5bGVfZXpzeShhcmMpXG5cbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogYXJjLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxuICAgICAgICAgICAgYW5nX2Y6IGFyYy5zaGFwZS5hbmdfZixcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJjMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbEFyYyhhcmM6IEFyYyxmaWxsPzogc3RyaW5nKTogQXJje1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFyYzBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgRWxsaXBzZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeD86IG51bWJlcixcbiAgICB5PzogbnVtYmVyLFxuICAgIHJhPzogbnVtYmVyLFxuICAgIHJiPzogbnVtYmVyXG4gICAgLy9yYeS4uuaoqui9tOmVvyByYuS4uue6tei9tOmVv1xufVxuXG5pbnRlcmZhY2UgRWxsaXBzZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBFbGxpcHNlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJlbGxpcHNlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogRWxsaXBzZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRWxsaXBzZShlbGxpcHNlOiBFbGxpcHNlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogRWxsaXBzZXtcbiAgICAvL21heOaYr+etieS6jjHpmaTku6Xplb/ovbTlgLxh5ZKMYuS4reeahOi+g+Wkp+iAhVxuICAgIC8vaeavj+asoeW+queOr+WinuWKoDEvbWF477yM6KGo56S65bqm5pWw55qE5aKe5YqgXG4gICAgLy/ov5nmoLflj6/ku6Xkvb/lvpfmr4/mrKHlvqrnjq/miYDnu5jliLbnmoTot6/lvoTvvIjlvKfnur/vvInmjqXov5Ex5YOP57SgXG4gICAgbGV0IHNoID0gZWxsaXBzZS5zaGFwZVxuICAgIGxldCBzdGVwID0gKHNoLnJhID4gc2gucmIpID8gMSAvIHNoLnJhIDogMSAvIHNoLnJiO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHNoLnggKyBzaC5yYSwgc2gueSk7IC8v5LuO5qSt5ZyG55qE5bem56uv54K55byA5aeL57uY5Yi2XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyICogTWF0aC5QSTsgaSArPSBzdGVwKVxuICAgIHtcbiAgICAgICAgLy/lj4LmlbDmlrnnqIvkuLp4ID0gYSAqIGNvcyhpKSwgeSA9IGIgKiBzaW4oaSnvvIxcbiAgICAgICAgLy/lj4LmlbDkuLpp77yM6KGo56S65bqm5pWw77yI5byn5bqm77yJXG4gICAgICAgIGN0eC5saW5lVG8oc2gueCArIHNoLnJhICogTWF0aC5jb3MoaSksIHNoLnkgKyBzaC5yYiAqIE1hdGguc2luKGkpKTtcbiAgICB9XG4gICAganVkZ2VTdHlsZShlbGxpcHNlLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpO1xuICAgIHJldHVybiBlbGxpcHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGZpbGw/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZU92YWwoZWxsaXBzZTogRWxsaXBzZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogRWxsaXBzZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlbGxpcHNlMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xuICAgIHhBOiBudW1iZXJbXVxuICAgIHlBOiBudW1iZXJbXVxufVxuXG5pbnRlcmZhY2UgUG9seWdvbk9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBQb2x5Z29uU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJwb2x5Z29uXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogUG9seWdvbk9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUG9seWdvbihwb2x5Z29uOiBQb2x5Z29uLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUG9seWdvbntcbiAgICBsZXQgc2ggPSBwb2x5Z29uLnNoYXBlXG4gICAgbGV0IG51bSA9IDA7XG4gICAgaWYoc2gueEEubGVuZ3RoICE9PSBzaC55QS5sZW5ndGgpXG4gICAge1xuICAgICAgICBudW0gPSBNYXRoLm1pbihzaC54QS5sZW5ndGgsc2gueUEubGVuZ3RoKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBudW0gPSBzaC54QS5sZW5ndGhcbiAgICB9XG5cbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLnhBWzBdLHNoLnlBWzBdKVxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspXG4gICAge1xuICAgICAgICBjdHgubGluZVRvKHNoLnhBW2ldLHNoLnlBW2ldKVxuICAgIH1cbiAgICBjdHgubGluZVRvKHNoLnhBWzBdLHNoLnlBWzBdKVxuICAgIGp1ZGdlU3R5bGUocG9seWdvbixjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICByZXR1cm4gcG9seWdvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVQb2x5KHBvbHlnb246IFBvbHlnb24sbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFBvbHlnb257XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBvbHlnb24wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUG9seShwb2x5Z29uOiBQb2x5Z29uLGZpbGw/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlX3RleHQsIGp1ZGdlVGV4dFN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBUZXh0U2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIHRleHQ6IHN0cmluZ1xuICAgIG1heFdpZHRoPzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBUZXh0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IFRleHRTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBUZXh0IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInRleHRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBUZXh0T3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRleHQodGV4dDogVGV4dCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFRleHR7XG5cbiAgICBjdHguYmVnaW5QYXRoKClcblxuICAgIGp1ZGdlVGV4dFN0eWxlKHRleHQsY3R4KVxuXG4gICAganVkZ2VTdHlsZV90ZXh0KHRleHQsY3R4KVxuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENhdFN0cihzdHJBOiBzdHJpbmdbXSk6IHN0cmluZ3tcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgZm9yKGxldCBpID0gMDtpIDwgc3RyQS5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dCArPSBzdHJBW2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RyUGFkKHN0cjogc3RyaW5nLHN0cjA6IHN0cmluZyxudW0/OiBudW1iZXIpOiBzdHJpbmd7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIFxuICAgIGlmKG51bSA9PT0gdW5kZWZpbmVkIHx8IG51bSA9PT0gMClcbiAgICB7XG4gICAgICAgIG51bSA9IDE7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPTA7aTxudW07aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dCArPSBzdHIwXG4gICAgfVxuICAgIHRleHQgKz0gc3RyXG5cbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyZXEoc3RyMDogc3RyaW5nLHN0cjE6IHN0cmluZyk6IGJvb2xlYW57XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXG4gICAgcmVzdWx0ID0gc3RyMC5pbmNsdWRlcyhzdHIxKTtcbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXBsYWNlKHN0cjogc3RyaW5nLHN0cl9vOiBzdHJpbmcsc3RyX3I6IHN0cmluZyk6c3RyaW5ne1xuICAgIGxldCByZXN1bHQgPSAnJ1xuXG4gICAgcmVzdWx0ID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJfbywnZycpLHN0cl9yKTtcblxuICAgIHJldHVybiByZXN1bHRcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZUltYWdlU2hhcGUsIGp1ZGdlU3R5bGUsanVkZ2VJbWFnZVNoYXBlX3RydWUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEltZ1NoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgaW1nOiBzdHJpbmdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB3aWR0aD86IG51bWJlclxuICAgIGhlaWdodD86IG51bWJlclxuICAgIHN4PzogbnVtYmVyXG4gICAgc3k/OiBudW1iZXJcbiAgICBzd2lkdGg/OiBudW1iZXJcbiAgICBzaGVpZ2h0PzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBJbWdPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogSW1nU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuY2xhc3MgUkdCQSB7XG4gICAgUjogbnVtYmVyXG4gICAgRzogbnVtYmVyXG4gICAgQjogbnVtYmVyXG4gICAgQTogbnVtYmVyXG59XG5cbmNsYXNzIFJHQkFfQXJyYXl7XG4gICAgUkdCQV9MaXN0OiBSR0JBW11cbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIEltZyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJpbWdcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBJbWc/OiBhbnlcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXG4gICAgSXNDaGFuZ2U/OiBib29sZWFuXG4gICAgY29uc3RydWN0b3Iob3B0czogSW1nT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIGlmKG9wdHMuSW1nID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBJID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgIEkuc3JjID0gb3B0cy5zaGFwZS5pbWdcbiAgICAgICAgICAgIHRoaXMuSW1nID0gSTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xuICAgICAgICAvLyAgICAgdGV4dHVyZTogW10sXG4gICAgICAgIC8vICAgICB3aWR0aDogMCxcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmKG9wdHMuSW1nRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcbiAgICAgICAgLy8gfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3ggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zd2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zd2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUud2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcblxuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLkltZ0RhdGEpXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICAvLyBpZihvcHRzLnN0eWxlKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxuICAgICAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgYy53aWR0aCA9IHNjcmVlbi5hdmFpbFdpZHRoO1xuICAgICAgICBjLmhlaWdodCA9IHNjcmVlbi5hdmFpbEhlaWdodDtcbiAgICAgICAgY3R4LmRyYXdJbWFnZSh0aGlzLkltZyxzaC54LHNoLnkpXG4gICAgICAgIHRoaXMuSW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoc2gueCxzaC55LHRoaXMuSW1nLndpZHRoLHRoaXMuSW1nLmhlaWdodCk7XG4gICAgICAgIC8vIHRoaXMubWFrZVRleHR1cmVzKClcbiAgICB9XG4gICAgdG9HcmF5KCl7XG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgaW1nOiB0aGlzLnNoYXBlLmltZyxcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnNoYXBlLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5zaGFwZS55LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3g6IHRoaXMuc2hhcGUuc3gsXG4gICAgICAgICAgICAgICAgc3k6IHRoaXMuc2hhcGUuc3ksXG4gICAgICAgICAgICAgICAgc3dpZHRoOiB0aGlzLnNoYXBlLnN3aWR0aCxcbiAgICAgICAgICAgICAgICBzaGVpZ2h0OiB0aGlzLnNoYXBlLnNoZWlnaHQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIHRoaXMuSXNDaGFuZ2UgPSB0cnVlXG4gICAgICAgIGltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICAgICAgbGV0IGcgPSAwXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZyA9IE1hdGguZmxvb3IodGhpcy5JbWdEYXRhLmRhdGFbNCppKzBdICogMC4yOTkgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMV0gKiAwLjU4NyArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsyXSAqIDAuMTE0KTtcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsyXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzNdID0gdGhpcy5JbWdEYXRhLmRhdGFbNCppKzNdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG4gICAgcmVwbGFjZSgpe1xuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgbWFrZVRleHR1cmVzKCl7XG4gICAgICAgIC8vIHRoaXMudGV4dHVyZXMgPSBuZXcgVGV4dHVyZXModGhpcyk7XG4gICAgICAgIGxldCBpbWcgPSB0aGlzLnRvR3JheSgpO1xuICAgICAgICBsZXQgZGF0YTAgPSBpbWcuSW1nRGF0YS5kYXRhO1xuICAgICAgICBsZXQgYSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBhcnIgPSAnJ1xuICAgICAgICBsZXQgbnVtQXJyOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBsZXQgbnVtQXJyMDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLkltZ0RhdGEuZGF0YVxuICAgICAgICBsZXQgdyA9IHRoaXMuSW1nRGF0YS53aWR0aFxuICAgICAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgICAgICAvLyBjb25zb2xlLmRpcihkYXRhKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhMC5sZW5ndGgvNDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IDM7dCsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7ayA8IDM7aysrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YTBbNCppXSA8PSBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gfHwgZGF0YTBbNCooaSsodC0xKSp3K2stMSldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZigzKnQrayAhPT0gNClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyICs9IGFbMyp0K2tdLnRvU3RyaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKChpKyh0LTEpKncray0xKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudW1BcnJbaV0gPSBwYXJzZUludChhcnIsMilcbiAgICAgICAgICAgIGFyciA9ICcnXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbnVtQXJyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdPW51bUFycltpXVxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV09bnVtQXJyW2ldXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsyXT1udW1BcnJbaV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VJbWcoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBJbWd7XG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgaWYoaW1nLklzQ2hhbmdlID09PSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZShpbWcsY3R4KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nLGN0eCk7XG4gICAgfVxuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIHJldHVybiBpbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltUmVhZChpbWc6IEltZyk6IEltYWdlRGF0YXsgICAgICAgICAvL+ivu+WPluWbvueJh+efqemYtVxuICAgIHJldHVybiBpbWcuSW1nRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFVucGFja0NvbG9ySW1hZ2UoaW1nOiBJbWcpOiBSR0JBX0FycmF5e1xuICAgIGxldCByZ2JhID0gbmV3IEFycmF5KClcbiAgICBsZXQgZGF0YSA9IGltZy5JbWdEYXRhLmRhdGFcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIHJnYmFbaV0gPSBuZXcgUkdCQSgpXG4gICAgICAgIFxuICAgICAgICByZ2JhW2ldLlIgPSBkYXRhWzQqaSswXVxuICAgICAgICByZ2JhW2ldLkcgPSBkYXRhWzQqaSsxXVxuICAgICAgICByZ2JhW2ldLkIgPSBkYXRhWzQqaSsyXVxuICAgICAgICByZ2JhW2ldLkEgPSBkYXRhWzQqaSszXVxuXG4gICAgfVxuXG4gICAgbGV0IHJnYmFfYXJyID0gbmV3IFJHQkFfQXJyYXkoKVxuICAgIHJnYmFfYXJyLlJHQkFfTGlzdCA9IHJnYmE7XG4gICAgcmdiYV9hcnIud2lkdGggPSBpbWcuSW1nRGF0YS53aWR0aFxuICAgIHJnYmFfYXJyLmhlaWdodCA9IGltZy5JbWdEYXRhLmhlaWdodFxuXG4gICAgcmV0dXJuIHJnYmFfYXJyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQYWNrQ29sb3JJbWFnZShyZ2JhX2FycjogUkdCQV9BcnJheSk6IEltYWdlRGF0YXtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgbGV0IGltZ2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHJnYmFfYXJyLndpZHRoLHJnYmFfYXJyLmhlaWdodCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmdiYV9hcnIuUkdCQV9MaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzBdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLlJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsxXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5HXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMl0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQlxuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzNdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkFcbiAgICB9XG4gICAgcmV0dXJuIGltZ2RhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZUluKGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxuICAgIHtcbiAgICAgICAgYWxwaGFJbiA9IDE7XG4gICAgfVxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gYWxwaGFJblxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZU91dChpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAwO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9ICgxIC0gYWxwaGFJbilcbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbWdJbml0KGltZzogSW1nW118R3JvdXApe1xuICAgIGxldCBJO1xuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBJID0gaW1nXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBJLmdyb3VwTGlzdFtpXS5pbml0KClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQcmVsb2FkVGV4dHVyZXMoaW1nOiBJbWcpOiBJbWd7XG4gICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZShpbWc6IEltZyk6IEltZ3tcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdUZXh0dXJlcyhpbWc6IEltZ1tdfEdyb3VwKTogR3JvdXB7XG4gICAgbGV0IEk7XG4gICAgbGV0IHRleHR1cmU6IEltZ1tdID0gW11cbiAgICBsZXQgVDtcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgSSA9IGltZ1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dHVyZVtpXSA9IERyYXdUZXh0dXJlKEkuZ3JvdXBMaXN0W2ldKVxuICAgIH1cbiAgICBUID0gbmV3IEdyb3VwKHRleHR1cmUpXG4gICAgcmV0dXJuIFQ7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFt4MCx5MCx4MSx5MV06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLG51bTogbnVtYmVyLHM6IG51bWJlcik6IENhbnZhc0dyYWRpZW50e1xuICAgIGxldCBmaWxsID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHgwLHkwLXMseDEseTEtcylcbiAgICBmaWxsLmFkZENvbG9yU3RvcCgwLCcjZmZmJylcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAgICAgaWYoaSUyID09PSAxKXtcbiAgICAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCcjMDAwJylcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJyNmZmYnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbGwuYWRkQ29sb3JTdG9wKDEsJyNmZmYnKVxuICAgIHJldHVybiBmaWxsXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUsIG5hbWVTdHlsZSwgT3B0cywgU2hhcGUsIFN0eWxlIH0gZnJvbSBcIi4uL2V6cHN5XCI7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQsIGp1ZGdlU3R5bGUgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQgfSBmcm9tIFwiLi4vR3JhZGllbnQvZ3JhZGllbnRcIjtcblxuaW50ZXJmYWNlIEdyYXRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGRlc2l0eTogbnVtYmVyIC8v5a+G6ZuG5bqmXG59XG5cbmludGVyZmFjZSBHcmF0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hwYWU6IEdyYXRTaGFwZSxcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBHcmF0IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImdyYXRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBHcmF0T3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgaWYoIW9wdHMuc2hhcGUuZGVzaXR5KVxuICAgICAgICB7XG4gICAgICAgICAgICBvcHRzLnNoYXBlLmRlc2l0eSA9IDM1XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICAvLyBwbGF5KHNwZWVkPzogbnVtYmVyLGRlbGF5PzogbnVtYmVyKXtcbiAgICAvLyAgICAgaWYoIWRlbGF5KXtcbiAgICAvLyAgICAgICAgIGRlbGF5ID0gOFxuICAgIC8vICAgICAgICAgaWYoIXNwZWVkKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNwZWVkID0gOFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgLy8gICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgIC8vICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDtpID4gLTE7aSsrKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGxldCBmaWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbeDAseTAseDEseTFdLHRoYXQuc2hhcGUuZGVzaXR5LGluZGV4KmkpO1xuICAgIC8vICAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBpID0gMFxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB1cGRhdGVHcmF0KHRoYXQsY3R4LGZpbGwpXG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoaSlcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZShkZWxheSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkoKVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgcGxheShzcGVlZD86IG51bWJlcixkZWxheT86IG51bWJlcil7XG4gICAgICAgIGlmKCFkZWxheSl7XG4gICAgICAgICAgICBkZWxheSA9IDhcbiAgICAgICAgICAgIGlmKCFzcGVlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIoJ2EnKVxuICAgICAgICAvLyBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpID4gLTE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB1cGRhdGVHcmF0MCh0aGF0LGN0eCxpbmRleCppKVxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKGkpXG4gICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoZGVsYXkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlR3JhdChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogR3JhdHtcbiAgICBsZXQgc2ggPSBncmF0LnNoYXBlO1xuICAgIC8vIGNvbnNvbGUuZGlyKHNoKVxuICAgIGxldCBudW0gPSBzaC5kZXNpdHk7XG4gICAgLy8gbGV0IGZpbGwgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueStzaC5yKVxuICAgIC8vIGZpbGwuYWRkQ29sb3JTdG9wKDAsJ3doaXRlJylcbiAgICAvLyBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAvLyAgICAgaWYoaSUyID09PSAxKXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCdibGFjaycpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCd3aGl0ZScpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZmlsbC5hZGRDb2xvclN0b3AoMSwnd2hpdGUnKVxuICAgIGxldCBmaWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueSszKnNoLnJdLG51bSwwKVxuICAgIGxldCBjID0gY3R4LmNhbnZhc1xuICAgIGMuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgZ3JhdC5zdHlsZS5maWxsID0gZmlsbFxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpXG4gICAgY3R4LnJlY3Qoc2gueC1zaC5yLHNoLnktc2gucixzaC54K3NoLnIsc2gueSszKnNoLnIpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyBjdHguc2F2ZSgpXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgIC8vIGN0eC5yZWN0KHNoLngtc2gucixzaC55LXNoLnIsc2gueCtzaC5yLHNoLnkrMipzaC5yKTtcbiAgICAvLyBqdWRnZVN0eWxlKGdyYXQsY3R4KTtcbiAgICAvLyBjdHguY2xvc2VQYXRoKClcbiAgICAvLyBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWluJ1xuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snXG4gICAgLy8gY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSk7XG4gICAgLy8gY3R4LmZpbGwoKVxuICAgIC8vIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAvLyBjdHgucmVzdG9yZSgpXG4gICAgXG4gICAgcmV0dXJuIGdyYXQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxmaWxsOiBDYW52YXNHcmFkaWVudCl7XG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGdyYXQuc3R5bGUuZmlsbCA9IGZpbGxcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKGdyYXQuc2hhcGUueCxncmF0LnNoYXBlLnksZ3JhdC5zaGFwZS5yLDAsMipNYXRoLlBJKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQwKGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsbnVtOiBudW1iZXIpe1xuICAgIGdyYXQucmVtb3ZlKClcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnRyYW5zbGF0ZSgwLC1udW0pXG4gICAgY3R4LnJlY3QoZ3JhdC5zaGFwZS54LWdyYXQuc2hhcGUucixncmF0LnNoYXBlLnktZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueCtncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS55KzMqZ3JhdC5zaGFwZS5yKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxufSIsImltcG9ydCB7Y2FudmFzU3R5bGV9IGZyb20gJy4uL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBEaXZTdHlsZSB9IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgeyBSZWN0YW5nbGUsbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4uL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCcgXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBDaXJjbGUsbWFrZUNpcmNsZSB9IGZyb20gJy4uL0dyYXBoaWMvY2lyY2xlJ1xuaW1wb3J0IHsgTGluZSwgbWFrZUxpbmV9IGZyb20gJy4uL0dyYXBoaWMvbGluZSdcbmltcG9ydCB7IEFyYywgbWFrZUFyYyB9IGZyb20gJy4uL0dyYXBoaWMvYXJjJ1xuaW1wb3J0IHsgRWxsaXBzZSwgbWFrZUVsbGlwc2UgfSBmcm9tICcuLi9HcmFwaGljL2VsbGlwc2UnXG5pbXBvcnQgeyBtYWtlUG9seWdvbiwgUG9seWdvbiB9IGZyb20gJy4uL0dyYXBoaWMvcG9seWdvbidcbmltcG9ydCB7IG1ha2VUZXh0LCBUZXh0IH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xuaW1wb3J0IHsgSW1nLCBtYWtlSW1nIH0gZnJvbSAnLi4vR3JhcGhpYy9pbWFnZSdcbmltcG9ydCB7IGNvbnRlbnRTdHlsZSB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuaW1wb3J0IHsgR3JhdCwgbWFrZUdyYXQgfSBmcm9tICcuLi9HcmFwaGljL2dyYXRpbmcnXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpOmNhbnZhc1N0eWxle1xuICAgIGlmKCFjU3R5bGUpIFxuICAgIHtcbiAgICAgICAgY1N0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS53aWR0aClcbiAgICB7XG4gICAgICAgIGNTdHlsZS53aWR0aCA9IDQwMFxuICAgIH1cbiAgICBpZighY1N0eWxlLmhlaWdodClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5oZWlnaHQgPSA0MDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRGl2U3R5bGUoZFN0eWxlOiBEaXZTdHlsZSk6IERpdlN0eWxle1xuICAgIGlmKCFkU3R5bGUpIFxuICAgIHtcbiAgICAgICAgZFN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogMjYwLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcyMHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFkU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBkU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBkU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuYm9yZGVyKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmJvcmRlciA9ICdub25lJ1xuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlclJhZGl1cylcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXJSYWRpdXMgPSAnNXB4J1xuICAgIH1cbiAgICByZXR1cm4gZFN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDb250ZW50U3R5bGUoY1N0eWxlOiBjb250ZW50U3R5bGUsdGl0bGU6IHN0cmluZyxjb250ZW50OiBzdHJpbmcpOiBjb250ZW50U3R5bGV7XG4gICAgaWYoIWNTdHlsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBidG5TdHI6IFsnT0snXSxcbiAgICAgICAgICAgIG5vSWNvbjogZmFsc2UsXG4gICAgICAgICAgICBub0ludDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtUG9zaXRpb246IDBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighY1N0eWxlLnRpdGxlKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLnRpdGxlID0gdGl0bGVcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb250ZW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbnRlbnQgPSBjb250ZW50XG4gICAgfVxuICAgIGlmKCFjU3R5bGUuYnRuU3RyKXtcbiAgICAgICAgY1N0eWxlLmJ0blN0ciA9IFsnT0snXVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSWNvbilcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ljb24gPSBmYWxzZVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLm5vSW50ID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb25maXJtUG9zaXRpb24pXG4gICAge1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMDtcbiAgICB9XG4gICAgaWYoY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMCAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAxICYmIGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDIpe1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMFxuICAgIH1cbiAgICByZXR1cm4gY1N0eWxlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZU1vZGVsKG1vZGVsOiBzdHJpbmcpOiBbc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nXXtcbiAgICBpZihtb2RlbCA9PT0gJ2Vycm9yJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCJYXCIsJ3JlZCcsJ0Vycm9yIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaGVscCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnLCdIZWxwIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGhlbHAgc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdxdWVzdCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiP1wiLCdncmV5JyxcIlF1c2V0IERpYWxvZ3VlXCIsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3dhcm4nKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnV2FybmluZyBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCB3YXJuaW5nIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaW5wdXQnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIklucHV0IERpYWxvZ3VlXCIsXCJUaGlzIGlzIGRlZmF1bHQgaW5wdXQgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdzZWxlY3QnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIlNlbGVjdCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IHNlbGVjdCBzdHJpbmdcIl1cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2ZpbGUnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJywnRmlsZSBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBmaWxlIHN0cmluZyddXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBbJ++9nicsJ2dyZWVuJywnRGFpbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZGFpbG9ndWUgc3RyaW5nJ11cbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKHN0eWxlOiBTdHlsZSl7XG4vLyAgICAgaWYoIXN0eWxlKVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50KGVsOiBFbGVtZW50c3xHcm91cCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgLy8gY29uc29sZS5kaXIoUmVjdGFuZ2xlKVxuICAgIC8vIGNvbnNvbGUuZGlyKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcbiAgICAgICAgbWFrZVJlY3RhbmdsZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlKVxuICAgIHtcbiAgICAgICAgbWFrZUNpcmNsZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgTGluZSlcbiAgICB7XG4gICAgICAgIG1ha2VMaW5lKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXG4gICAge1xuICAgICAgICBtYWtlQXJjKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgbWFrZUVsbGlwc2UoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICB7XG4gICAgICAgIG1ha2VQb2x5Z29uKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFRleHQpXG4gICAge1xuICAgICAgICBtYWtlVGV4dChlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JhdClcbiAgICB7XG4gICAgICAgIG1ha2VHcmF0KGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBtYWtlSW1nKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xuICAgICAgICAvLyBjb25zb2xlLmRpcihsaXN0WzBdKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgc3Ryb2tlOiAnXCIjMDAwMDAwXCInLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QubGluZVdpZHRoID09PSB1bmRlZmluZWQpe1xuICAgICAgICBzdC5saW5lV2lkdGggPSAyO1xuICAgIH1cbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gJ1wiIzAwMDAwMFwiJ1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBpZighKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKSl7XG4gICAgLy8gICAgIC8vIHN0LnN0cm9rZSA9ICcjMDAwJztcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgIHN0LnN0cm9rZSA9IFwiIzAwMFwiXG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgLy8gICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIC8vICAgICB9XG4gICAgICAgIFxuICAgIC8vIH1cbiAgICAvLyBlbHNle1xuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBcbiAgICAvLyBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAvLyBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgLy8gY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAvLyBjdHguZmlsbCgpO1xuICAgIC8vIGN0eC5zdHJva2UoKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZV90ZXh0KGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdCA9IGVsLnN0eWxlO1xuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuXG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgICAgICBjdHguZmlsbFRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnkpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LnN0cm9rZSA9IFwiIzAwMFwiXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVRleHRTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzdCA9IGVsLnN0eWxlXG4gICAgbGV0IGZvbnRTdHJpbmcgPSAnJztcbiAgICBpZihzdCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgc3QgPSB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoc3QuZm9udFN0eWxlICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFN0eWxlICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlIDwgMyAmJiBzdC5mb250U3R5bGUgPj0wKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gMClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAxKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9IHN0LmZvbnRTdHlsZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlICE9PSAnaXRhbGljJyAmJiBzdC5mb250U3R5bGUgIT09ICdvYmxpcXVlJyAmJiBzdC5mb250U3R5bGUgIT09IFwibm9ybWFsXCIpe1xuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzAnKXtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcxJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdpdGFsaWMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMicpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250VmFyaWFudCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFZhcmlhbnQgPT09ICdib29sZWFuJylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09IGZhbHNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gc3QuZm9udFZhcmlhbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250VmFyaWFudCAhPT0gJ3NtYWxsLWNhcHMnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ID09PSAndHJ1ZScpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbm9uZScpe1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFdlaWdodCA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSBzdC5mb250V2VpZ2h0LnRvU3RyaW5nKClcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc3QuZm9udFdlaWdodCAhPT0gJ25vcm1hbCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGQnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkZXInICYmIHN0LmZvbnRXZWlnaHQgIT09ICdsaWdodGVyJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFNpemUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U2l6ZSAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTaXplID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFNpemUgPSBzdC5mb250U2l6ZS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRTaXplID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc3QuZm9udFNpemUuaW5kZXhPZigncHgnKSA9PT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFNpemUgPSBzdC5mb250U2l6ZSArICdweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3QuZm9udFNpemUgPSAnMThweCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xuICAgIH1cbiAgICBmb250U3RyaW5nID0gc3QuZm9udFN0eWxlICsgJyAnICsgc3QuZm9udFZhcmlhbnQgKyAnICcgKyBzdC5mb250V2VpZ2h0ICsgJyAnICsgc3QuZm9udFNpemUgKyAnICcgKyBzdC5mb250RmFtaWx5O1xuICAgIGN0eC5mb250ID0gZm9udFN0cmluZztcbiAgICBjb25zb2xlLmRpcihmb250U3RyaW5nKVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDaGFuZ2VUeXBlKGVsOiBudW1iZXJ8c3RyaW5nKTogbnVtYmVye1xuICAgIGxldCB4ID0gMTtcbiAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICBpZih0eXBlb2YgZWwgPT09IFwic3RyaW5nXCIpXG4gICAge1xuICAgICAgICBlbCA9IGVsLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgIGlmKGVsID09PSBcIkNFTlRFUlwiIHx8IGVsID09PSAnQycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUTEVGVCcgfHwgZWwgPT09IFwiTEVGVFwiIHx8IGVsID09PSAnTCcpe1xuICAgICAgICAgICAgeCA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUVE9QJyB8fCBlbCA9PT0gXCJUT1BcIiB8fCBlbCA9PT0gJ1QnKXtcbiAgICAgICAgICAgIHggPSAyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUUklHSFQnIHx8IGVsID09PSBcIlJJR0hUXCIgfHwgZWwgPT09ICdSJyl7XG4gICAgICAgICAgICB4ID0gMztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVEJPVFRPTScgfHwgZWwgPT09IFwiQk9UVE9NXCIgfHwgZWwgPT09ICdCJyl7XG4gICAgICAgICAgICB4ID0gNDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBpbnN0cnVjdGlvbiEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYodHlwZW9mIGVsID09PSBcIm51bWJlclwiKVxuICAgIHtcbiAgICAgICAgaWYoZWw8NSlcbiAgICAgICAge1xuICAgICAgICAgICAgeCA9IGVsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhSXQgd2lsbCB1c2UgZGVmYXVsdCBpbnN0cnVjdGlvbiEnKVxuICAgIH1cbiAgICByZXR1cm4geDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU2lkZShzaWRlMDogbnVtYmVyfHN0cmluZyxzaWRlMTogbnVtYmVyfHN0cmluZyk6IFtudW1iZXIsbnVtYmVyXXtcbiAgICBsZXQgZjAgPSBqdWRnZUNoYW5nZVR5cGUoc2lkZTApO1xuICAgIGxldCBmMSA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMSk7XG4gICAgaWYoZjAgPT09IDIgfHwgZjAgPT09IDQpe1xuICAgICAgICBpZihmMSA9PT0gMiB8fCBmMSA9PT0gNCl7XG4gICAgICAgICAgICBmMSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB0ID0gZjE7XG4gICAgICAgICAgICBmMSA9IGYwO1xuICAgICAgICAgICAgZjAgPSB0O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKGYwID09PSAxIHx8IGYwID09PSAzKXtcbiAgICAgICAgaWYoZjEgPT09IDEgfHwgZjEgPT09IDMpe1xuICAgICAgICAgICAgZjEgPSAwO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbZjAsZjFdXG59ICAgXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUltYWdlU2hhcGUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGltZy5zaGFwZVxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGlmKHNoLndpZHRoID09PSB1bmRlZmluZWQgfHwgc2guaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC54LHNoLnkpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHNoLndpZHRoID09PSB1bmRlZmluZWQgfHwgc2guaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodCxzaC54LHNoLnksaW1nLkltZy53aWR0aCxpbWcuSW1nLmhlaWdodClcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUltYWdlU2hhcGVfdHJ1ZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXG4gICAgaWYoc2guc3ggPT09IHVuZGVmaW5lZCB8fCBzaC5zeSA9PT0gdW5kZWZpbmVkIHx8IHNoLnN3aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55KVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUlzSW5FbGVtZW50KFt4LHldOiBbbnVtYmVyLG51bWJlcl0sZWw6IEVsZW1lbnRzKTogYm9vbGVhbntcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XG4gICAgICAgIGxldCBbeDAseTAsdzAsaDBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS53aWR0aCxlbC5zaGFwZS5oZWlnaHRdXG4gICAgICAgIGlmKHggPj0geDAgJiYgeDw9eDArdzAgJiYgeSA+PSB5MCAmJiB5IDw9IHkwK2gwKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCxyMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJdXG4gICAgICAgIGxldCByID0gTWF0aC5zcXJ0KE1hdGgucG93KHgteDAsMikgKyBNYXRoLnBvdyh5LXkwLDIpKVxuICAgICAgICBpZihyIDw9IHIwKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgTGluZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAseDEseTFdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS54RW5kLGVsLnNoYXBlLnlFbmRdXG4gICAgICAgIGlmKHgxICE9PSB4MClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHl0ID0gKHkxLXkwKS8oeDEteDApICogKHggLSB4MCkgKyB5MFxuICAgICAgICAgICAgaWYoeSA+PSB5dC0xNSAmJiB5IDw9IHl0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgeHQgPSAoeDEteDApLyh5MS15MCkgKiAoeSAtIHkwKSArIHgwXG4gICAgICAgICAgICBpZih5ID49IHh0LTE1ICYmIHkgPD0geHQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXG4gICAge1xuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHJhMCxyYjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yYSxlbC5zaGFwZS5yYl1cbiAgICAgICAgbGV0IHQgPSBNYXRoLnBvdyh4LXgwLDIpL01hdGgucG93KHJhMCwyKSArIE1hdGgucG93KHkteTAsMikvTWF0aC5wb3cocmIwLDIpXG4gICAgICAgIGlmKHQgPD0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAge1xuICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgbGV0IGogPSBpICsgMVxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGxldCB4dCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCB5dCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBbeDAseTBdID0gW2VsLnNoYXBlLnhBLGVsLnNoYXBlLnlBXVxuICAgICAgICBmb3IoaSA9IDA7aTxlbC5zaGFwZS54QS5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpID09PSBlbC5zaGFwZS54QS5sZW5ndGgtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBqID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBqID0gaSArIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHkwW2ldICE9PSB5MFtqXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4dFtpbmRleF0gPSAoeDBbaV0teDBbal0pLyh5MFtpXS15MFtqXSkgKiAoeSAtIHkwW2ldKSArIHgwW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHl0W2luZGV4XSA9ICh5MFtqXS15MFtpXSkvKHgwW2pdLXgwW2ldKSAqICh4IC0geDBbaV0pICsgeTBbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHggPT09IHh0W2luZGV4XSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih4dFtpbmRleF0gPj0geCl7XG4gICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGluZGV4JTI9PT0wKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBjXG4gICAgLy8gICAgIGxldCBpLGpcbiAgICAvLyAgICAgbGV0IGwgPSBlbC5zaGFwZS55QS5sZW5ndGhcbiAgICAvLyAgICAgZm9yKGMgPSBmYWxzZSxpID0gLTEsaiA9IGwgLSAxOyArK2kgPCBsOyBqID0gaSkgXG4gICAgLy8gICAgICAgICAoIChlbC5zaGFwZS55QVtpXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtqXSkgfHwgKGVsLnNoYXBlLnlBW2pdIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2ldKSApIFxuICAgIC8vICAgICAgICAgJiYgKHggPCAoZWwuc2hhcGUueEFbal0gLSBlbC5zaGFwZS54QVtpXSkgKiAoeSAtIGVsLnNoYXBlLnlBW2ldKSAvIChlbC5zaGFwZS55QVtqXSAtIGVsLnNoYXBlLnlBW2ldKSArIGVsLnNoYXBlLnhBW2ldKSBcbiAgICAvLyAgICAgICAgICYmIChjID0gIWMpOyBcbiAgICAvLyAgICAgcmV0dXJuIGM7IFxuICAgIC8vIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBqdWRnZUlzSW5FbGVtZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXlkb3duID0gZXZlbnQgPT57XG4gICAgICAgICAgICBsZXQgZSA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudCB8fCBhcmd1bWVudHMuY2FsbGVlLmNhbGxlci5hcmd1bWVudHNbMF07XG4gICAgICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiTmFtZShrZXk6IHN0cmluZ3xudW1iZXIpOm51bWJlcntcbiAgICBsZXQgcmVzO1xuXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICByZXMgPSBrZXkuY2hhckNvZGVBdCgwKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleSlcbiAgICB9XG4gICAgY29uc29sZS5kaXIocmVzKSBcbiAgICByZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYlByZXNzV2FpdChrZXk6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUmVsZWFzZVdhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxldCB4LHlcbiAgICAgICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWFxuICAgICAgICAgICAgICAgIHkgPSBlLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih4KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHkpXG4gICAgICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmKVxuICAgICAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG59XG5cbiIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGl2U3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xuICAgIGJvcmRlcj86IHN0cmluZztcbiAgICBib3JkZXJSYWRpdXM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXYoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU6IERpdlN0eWxlKTogW0hUTUxFbGVtZW50LERpdlN0eWxlXXtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkU3R5bGUgPSBlekp1ZGdlLmp1ZGdlRGl2U3R5bGUoZFN0eWxlKTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcbiAgICBkaXYuc3R5bGUuYm9yZGVyID0gZFN0eWxlLmJvcmRlclxuICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBkU3R5bGUuYm9yZGVyUmFkaXVzXG4gICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgIGRpdi5zdHlsZS5ib3hTaGFkb3cgPSAnMjBweCAxMHB4IDQwcHggIzg4ODg4OCdcbiAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgZGl2LnN0eWxlLnpJbmRleCA9ICcxMDAwJ1xuICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xuICAgIC8vIGRpdi5zdHlsZS50b3AgPSAnMHB4J1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgZGl2LnN0eWxlLnRvcCA9ICgoaC1kU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGRpdi5zdHlsZS5sZWZ0ID0gKCh3LWRTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBkb20uYXBwZW5kKGRpdik7XG4gICAgcmV0dXJuIFtkaXYsZFN0eWxlXVxufSIsImltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCAqIGFzIGV6RGl2IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUgfSBmcm9tICcuLi9UaW1lL3RpbWUnXG5cbmxldCBpZCA9IDBcblxuZXhwb3J0IGNsYXNzIERpYWxvZ3Vle1xuICAgIGlkOiBudW1iZXJcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgZG9tUGFyZW50OiBIVE1MRWxlbWVudFxuICAgIGNvblQ6IENvbnRlbnRcbiAgICBkU3R5bGU/OiBEaXZTdHlsZVxuICAgIHN0YXR1c1ZhbHVlOiBib29sZWFuICAgIC8v5oyJ6ZKu54K55Ye754q25oCBIHRydWXkuLrpgInmi6nmmK8gZmFsc2XkuLrpgInmi6nlkKbmiJblj5bmtohcbiAgICBpbnRWYWx1ZTogQXJyYXk8c3RyaW5nPlxuICAgIHNlbGVjdFZhbHVlOiBBcnJheTxzdHJpbmc+XG4gICAgZmlsZXM6IEZpbGVSZWFkZXJcbiAgICBjb25zdHJ1Y3Rvcihkb21QYXJlbnQ6IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKXtcbiAgICAgICAgW3RoaXMuZG9tLHRoaXMuZFN0eWxlXSA9IGV6RGl2LmNyZWF0ZURpdihkb21QYXJlbnQsZFN0eWxlKVxuICAgICAgICBsZXQgY29uVCA9IG5ldyBDb250ZW50KHRoaXMuZG9tLHRoaXMuZFN0eWxlKVxuICAgICAgICB0aGlzLmNvblQgPSBjb25UXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLmRvbVBhcmVudCA9IGRvbVBhcmVudFxuICAgICAgICB0aGlzLmludFZhbHVlID0gW11cbiAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBpZCsrXG4gICAgfVxuICAgIHNob3coY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlLnNlbGVkU3RyID0gW11cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICBsZXQgdG9wU3RyID0gWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXVxuICAgICAgICBpZighY29uU3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvblN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdub25lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBbY2hhcixjb2xvcix0aXRsZSxjb250ZW50XSA9IGV6SnVkZ2UuanVkZ2VNb2RlbChjb25TdHlsZS50eXBlKVxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsdGl0bGUsY29udGVudClcbiAgICAgICAgaWYoY29uU3R5bGUubm9JY29uKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZighY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvcFN0ciA9IFsnMjBweCcsJzkwcHgnLCcxODBweCddXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsdG9wU3RyLGNoYXIsY29sb3IsY29uU3R5bGUuYnRuU3RyKVxuICAgICAgICAvLyBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFswXVxuICAgICAgICBsZXQgbCA9IHRoYXQuY29uVC5jaGlsZFt0aGF0LmNvblQuY2hpbGQubGVuZ3RoIC0gMV0uY2hpbGQubGVuZ3RoO1xuICAgICAgICBsZXQgaW50ID0gbmV3IEFycmF5KClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGlmKGNvblN0eWxlLmludFN0cilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5pbnRTdHIubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGludFtpXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvblN0eWxlLmludFN0cltpXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJylcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGw7aSsrKVxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFtpXVxuICAgICAgICAgICAgICAgIGJ0bi5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZidcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjMDA4ODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmRvbS5zdHlsZS5jb2xvciA9ICdibHVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSBjb25TdHlsZS5jb25maXJtUG9zaXRpb258fGNvblN0eWxlLmJ0blN0ci5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgY29uU3R5bGUuaW50U3RyLmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW50VmFsdWUucHVzaChjb25TdHlsZS5pbnRTdHJbdF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmludFZhbHVlLnB1c2goaW50W3RdLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCBjb25TdHlsZS5zZWxlZFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyW3RdICE9PSB1bmRlZmluZWQgJiYgY29uU3R5bGUuc2VsZWRTdHJbdF0gIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RWYWx1ZS5wdXNoKGNvblN0eWxlLnNlbGVkU3RyW3RdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25TdHlsZS50eXBlID09PSAnZmlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZiA9IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVfUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV9SZWFkZXIub25sb2FkID0gcmVzdWx0ID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYyA9IGZpbGVfUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihmYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsZV9SZWFkZXIucmVhZEFzRGF0YVVSTCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZmlsZSkuZmlsZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxlX1JlYWRlci5yZWFkQXNUZXh0KCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsZXMgPSBmaWxlX1JlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXR1c1ZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhhdC5zdGF0dXNWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2V0RGxnU3R5bGUoZFN0eWxlOiBEaXZTdHlsZSl7XG4gICAgICAgIGRTdHlsZSA9IGV6SnVkZ2UuanVkZ2VEaXZTdHlsZShkU3R5bGUpXG4gICAgICAgIGxldCBkb21TID0gdGhpcy5kb20uc3R5bGVcbiAgICAgICAgZG9tUy53aWR0aCA9IGRTdHlsZS53aWR0aC50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBkb21TLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgZG9tUy5ib3JkZXIgPSBkU3R5bGUuYm9yZGVyXG4gICAgICAgIGRvbVMuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xuICAgIH1cbiAgICBpbnB1dGRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdJbnB1dCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBpbnB1dCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdpbnB1dCdcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhjb25TdHlsZSkvKi50aGVuKCkqL1xuICAgIH1cbiAgICBsaXN0ZGxnKGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ1NlbGVjdCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnc2VsZWN0J1xuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICBlcnJvcmRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdlcnJvcidcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIGhlbHBkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdoZWxwJ1xuICAgICAgICBjb25TdHlsZS5ub1NlbCA9IHRydWVcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvdyhjb25TdHlsZSlcbiAgICB9XG4gICAgbXNnYm94KGNvblN0eWxlPzogY29udGVudFN0eWxlLG1vZGVsPzogc3RyaW5nKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHF1ZXN0ZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAncXVlc3QnXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICB3YXJuZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdXYXJuaW5nIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IHdhcm5pbmcgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnd2FybidcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHJlbW92ZSgpe1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgICAgICAgICAgICB0aGF0LmRvbS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgICAgICBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuY29uVC5jaGlsZCA9IFtdXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0aGF0KVxuICAgICAgICAgICAgLy8gdGhhdC5kb20ucmVtb3ZlKClcbiAgICAgICAgICAgIHRoYXQuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgICAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgY29udGVudFN0eWxle1xuICAgIC8v5LyY5YWI57qnOiDovpPlhaXmoYYgPiDpgInmi6nmoYYgPiDlhbbku5ZcbiAgICB0eXBlPzogc3RyaW5nICAgICAgICAgICAvL+Wvueivneexu+Wei1xuICAgIHRpdGxlPzogc3RyaW5nICAgICAgICAgIC8v5a+56K+d5qCH6aKYXG4gICAgY29udGVudD86IHN0cmluZyAgICAgICAgLy/lr7nor53mj5DnpLrlhoXlrrlcbiAgICBpbWc/OiBzdHJpbmcgICAgICAgICAgICAvL+iHquWumuS5ieWbvueJh1xuICAgIGJ0blN0cj86IEFycmF5PHN0cmluZz4gIC8v5oyJ6ZKu5a2X56ymXG4gICAgaW50U3RyPzogQXJyYXk8c3RyaW5nPiAgLy/ovpPlhaXmoYbmj5DnpLpcbiAgICBzZWxTdHI/OiBBcnJheTxzdHJpbmc+ICAgLy/pgInmi6nmoYblhoXlrrlcbiAgICBzZWxlZFN0cj86IEFycmF5PHN0cmluZz4gLy/lt7LpgInmi6nlhoXlrrlcbiAgICBub0ljb24/OiBib29sZWFuICAgICAgICAvL+iuvue9ruaYr+WQpuacieWbvuagh1xuICAgIG5vSW50PzogYm9vbGVhbiAgICAgICAgIC8v6K6+572u5piv5ZCm5pyJ6L6T5YWl5qGGXG4gICAgbm9TZWw/OiBib29sZWFuICAgICAgICAgLy/orr7nva7mmK/lkKbmnInpgInmi6nmoYZcbiAgICBjb25maXJtUG9zaXRpb24/OiBudW1iZXIvL+iuvue9ruehruiupOmUrueahOS9jee9ru+8jOm7mOiupOS4ujDljbPku47lt6blvoDlj7PnmoTnrKzkuIDkuKpcbiAgICBJc011bHRpcGxlPzogc3RyaW5nICAgICAvL+aYr+WQpuWkmumAiVxufVxuXG5jbGFzcyBDb250ZW50e1xuICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICBwYXJlbnQ6IENvbnRlbnRcbiAgICBjaGlsZDogQXJyYXk8Q29udGVudD5cbiAgICBkU3R5bGU6IERpdlN0eWxlXG4gICAgY29uc3RydWN0b3IoY29uVDogQ29udGVudHxIVE1MRWxlbWVudCxkU3R5bGU6IERpdlN0eWxlKXtcbiAgICAgICAgbGV0IGNoaWxkID0gbmV3IEFycmF5KClcbiAgICAgICAgdGhpcy5jaGlsZCA9IGNoaWxkXG4gICAgICAgIGlmKGNvblQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRoaXMuZG9tID0gY29uVFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS53aWR0aCA9IGRTdHlsZS53aWR0aC50b1N0cmluZygpXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUubGluZUhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IGNvblRcbiAgICAgICAgICAgIGNvblQuY2hpbGQucHVzaCh0aGlzKVxuICAgICAgICAgICAgLy8gLy8gbGV0IGggPSB0aGlzLmRvbVBhcmVudC5jbGllbnRIZWlnaHQgXG4gICAgICAgICAgICAvLyB0aGlzLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJ1xuICAgICAgICAgICAgY29uVC5kb20uYXBwZW5kKHRoaXMuZG9tKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERsZ0luaXQoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU/OiBEaXZTdHlsZSkge1xuICAgIGxldCBkbGcgPSBuZXcgRGlhbG9ndWUoZG9tLGRTdHlsZSk7XG4gICAgcmV0dXJuIGRsZztcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IEFycmF5PHN0cmluZz4saW1nU3RyPzogc3RyaW5nLGltZ0NvbG9yPzogc3RyaW5nLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgIC8vIGNvbnNvbGUuZGlyKGRsZylcbiAgICBkbGcuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcbiAgICBjcmVhdGVEbGdUaXRsZShkbGcsY29uU3R5bGUsdG9wWzBdKVxuICAgIGNyZWF0ZURsZ0NvbnRlbnQoZGxnLGNvblN0eWxlLHRvcFsxXSlcbiAgICBpZih0b3AubGVuZ3RoID09PSA0KVxuICAgIHtcbiAgICAgICAgY3JlYXRlRGxnSW1nRGl2KGRsZyxjb25TdHlsZSx0b3BbMl0saW1nU3RyLGltZ0NvbG9yKVxuICAgICAgICBjcmVhdGVEbGdCdG5EaXYoZGxnLGNvblN0eWxlLHRvcFszXSxzdHIpXG4gICAgfVxuICAgIGVsc2UgaWYodG9wLmxlbmd0aCA9PT0gMylcbiAgICB7XG4gICAgICAgIGNyZWF0ZURsZ0J0bkRpdihkbGcsY29uU3R5bGUsdG9wWzJdLHN0cilcbiAgICB9XG4gICAgXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ1RpdGxlKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XG4gICAgbGV0IHRpdGxlU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDUwXG4gICAgfVxuICAgIGxldCB0aXRsZSA9IG5ldyBDb250ZW50KGRsZy5jb25ULHRpdGxlU3R5bGUpXG4gICAgLy8gY29uc29sZS5kaXIodGl0bGUpXG4gICAgdGl0bGUuZG9tLmlubmVyVGV4dCA9IGNvblN0eWxlLnRpdGxlXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRTaXplID0gJzI2cHgnXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCdcbiAgICB0aXRsZS5kb20uc3R5bGUudG9wID0gdG9wXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0NvbnRlbnQoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nKXtcbiAgICBsZXQgY29udGVudFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgIH1cbiAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KGRsZy5jb25ULGNvbnRlbnRTdHlsZSlcbiAgICBjb250ZW50LmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS5jb250ZW50XG4gICAgY29udGVudC5kb20uc3R5bGUuZm9udFNpemUgPSAnMjBweCdcbiAgICBjb250ZW50LmRvbS5zdHlsZS50b3AgPSB0b3Bcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW1nRGl2KGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxzdHI6IHN0cmluZyxjb2xvcjogc3RyaW5nKVxue1xuICAgIGxldCBpbWdEaXZTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGltZ0RpdiA9IG5ldyBDb250ZW50KGRsZy5jb25ULGltZ0RpdlN0eWxlKVxuICAgIGltZ0Rpdi5kb20uc3R5bGUudG9wID0gdG9wXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXG4gICAgaWYoIWNvblN0eWxlLmludFN0cnx8Y29uU3R5bGUubm9JbnQpXG4gICAge1xuICAgICAgICBkbGcuZG9tLnN0eWxlLmhlaWdodCA9IGRsZy5kU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGlmKCFjb25TdHlsZS5zZWxTdHJ8fGNvblN0eWxlLm5vU2VsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZighY29uU3R5bGUuaW1nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnR5cGUgPT09ICdmaWxlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURsZ0ZpbGUoaW1nRGl2LGRsZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGxnSW1nKGltZ0RpdixzdHIsY29sb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBjcmVhdGVEbGdJbWcwKGltZ0Rpdixjb25TdHlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3JlYXRlRGxnU2VsZWN0KGltZ0Rpdixjb25TdHlsZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpbWdEaXYuZG9tLnN0eWxlLmhlaWdodCA9IChpbWdEaXZTdHlsZS5oZWlnaHQgKiBjb25TdHlsZS5pbnRTdHIubGVuZ3RoKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBpbWdEaXYuZG9tLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJ1xuICAgICAgICBkbGcuZG9tLnN0eWxlLmhlaWdodCA9IChwYXJzZUludChkbGcuZG9tLnN0eWxlLmhlaWdodCkgKyBpbWdEaXZTdHlsZS5oZWlnaHQgKiAoY29uU3R5bGUuaW50U3RyLmxlbmd0aC0xKSkudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgLy8gY29uc29sZS5kaXIoY29uU3R5bGUpXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLmludFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBjcmVhdGVEbGdJbnREaXYoaW1nRGl2LGNvblN0eWxlLmludFN0cltpXSlcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW50RGl2KGltZ0RpdjogQ29udGVudCxpbnRTdHI6IHN0cmluZylcbntcbiAgICBsZXQgaW50RGl2U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBwYXJzZUludChpbWdEaXYuZG9tLnN0eWxlLndpZHRoKSxcbiAgICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICBsZXQgaW50RGl2ID0gbmV3IENvbnRlbnQoaW1nRGl2LGludERpdlN0eWxlKVxuICAgIGludERpdi5kb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgaW50RGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgaW50RGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdpbmhlcml0J1xuICAgIGNyZWF0ZURsZ0ludChpbnREaXYsaW50U3RyKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW1nKGltZ0RpdjogQ29udGVudCxzdHI6IHN0cmluZyxjb2xvcjogc3RyaW5nKXtcbiAgICBsZXQgaW1nU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiA2MCxcbiAgICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICBsZXQgaW1nID0gbmV3IENvbnRlbnQoaW1nRGl2LGltZ1N0eWxlKVxuICAgIGltZy5kb20uaWQgPSAnaW1nJ1xuICAgIGltZy5kb20uaW5uZXJUZXh0ID0gc3RyXG4gICAgaW1nLmRvbS5zdHlsZS5mb250U2l6ZSA9ICc1NHB4J1xuICAgIGltZy5kb20uc3R5bGUuY29sb3IgPSAnd2hpdGUnXG4gICAgaW1nLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAvLyBpbWcuZG9tLnN0eWxlLmJvcmRlciA9ICc1cHggc29saWQgcmVkJ1xuICAgIGltZy5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSdcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW1nMChpbWdEaXY6IENvbnRlbnQsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgbGV0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgaW1nLndpZHRoID0gNjBcbiAgICBpbWcuaGVpZ2h0ID0gNjBcbiAgICBpbWcuc3JjID0gY29uU3R5bGUuaW1nXG4gICAgaW1nRGl2LmRvbS5hcHBlbmQoaW1nKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdJbnQoaW1nRGl2OiBDb250ZW50LGludFN0cjogc3RyaW5nKVxue1xuICAgIGxldCBrZXlTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgaGVpZ2h0OiA2MFxuICAgIH1cbiAgICBsZXQga2V5ID0gbmV3IENvbnRlbnQoaW1nRGl2LGtleVN0eWxlKVxuICAgIGtleS5kb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAga2V5LmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMHB4J1xuICAgIGtleS5kb20uaW5uZXJIVE1MID0gaW50U3RyICsgJzonXG4gICAgbGV0IGludCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICBpbnQuaWQgPSBpbnRTdHJcbiAgICBpbnQuc3R5bGUud2lkdGggPSAnMjAwcHgnXG4gICAgaW50LnN0eWxlLmhlaWdodCA9ICc0MHB4J1xuICAgIGludC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCdcbiAgICBpbnQuc3R5bGUubWFyZ2luVG9wID0gJzEwcHgnXG4gICAgaW1nRGl2LmRvbS5hcHBlbmQoaW50KVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdGaWxlKGltZ0RpdjogQ29udGVudCxkbGc6IERpYWxvZ3VlKXtcbiAgICBsZXQgZmlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAvLyBmaWxlLmRpc2FibGVkID0gdHJ1ZVxuICAgIGZpbGUudHlwZSA9ICdmaWxlJ1xuICAgIGZpbGUuaWQgPSAnZmlsZSdcbiAgICBmaWxlLnN0eWxlLndpZHRoID0gJzE2MHB4J1xuICAgIGZpbGUuc3R5bGUubGluZUhlaWdodCA9ICc2MHB4J1xuICAgIGltZ0Rpdi5kb20uYXBwZW5kKGZpbGUpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ1NlbGVjdChpbWdEaXY6IENvbnRlbnQsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgbGV0IHNlbGVjdFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICBoZWlnaHQ6IDM2XG4gICAgfVxuICAgIGxldCBpbmRleCA9IGZhbHNlXG4gICAgbGV0IGluZGV4MCA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGluZGV4MSA9IGZhbHNlXG4gICAgbGV0IGNvdW50ID0gMFxuICAgIGxldCBzZWxlY3RTdHIgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgU3RyID0gJyc7XG4gICAgbGV0IGNvbG9yID0gJyMzNzcxZTAnXG4gICAgbGV0IGNvbG9yMCA9ICcjZmZmZmZmJ1xuICAgIGxldCBzZWxlY3QgPSBuZXcgQ29udGVudChpbWdEaXYsc2VsZWN0U3R5bGUpXG4gICAgc2VsZWN0LmRvbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkJ1xuICAgIHNlbGVjdC5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0LmRvbS5zdHlsZS5tYXJnaW5Ub3AgPSAnMTJweCdcbiAgICBzZWxlY3QuZG9tLnN0eWxlLnpJbmRleCA9ICcyMDIwJ1xuICAgIGxldCBzZWxlY3RUZXh0ID0gbmV3IENvbnRlbnQoc2VsZWN0LHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH0pXG4gICAgc2VsZWN0VGV4dC5kb20uaW5uZXJUZXh0ID0gJ+WxleW8gOmAieaLqSdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAxMCdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50b3AgPSAnMCdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ3RvcCAwLjhzIGxpbmVhcidcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgbGV0ICBzZWxlY3REaXYgPSBuZXcgQ29udGVudChzZWxlY3Qse1xuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICBoZWlnaHQ6IDM2XG4gICAgfSlcbiAgICAvLyBzZWxlY3REaXYuZG9tLnN0eWxlLmJvcmRlciA9ICcxcHggc29saWQnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzg4ODg4OCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnpJbmRleCA9IFwiMjAwMFwiXG4gICAgLy8gc2VsZWN0RGl2LmRvbS5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbidcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuOHMgbGluZWFyJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUudG9wID0gJzBweCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLm9wYWNpdHkgPSAnMCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAnY29sdW1uJ1xuICAgIGxldCBzZWxlY3RDb250ZW50ID0gbmV3IEFycmF5KClcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0gPSBuZXcgQ29udGVudChzZWxlY3REaXYse1xuICAgICAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgICAgIGhlaWdodDogMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMilcbiAgICAgICAgfSlcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uaW5uZXJUZXh0ID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgIGlmKGkgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4IDE1cHggMHB4IDBweCdcbiAgICAgICAgfVxuICAgICAgICAvLyBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuOHMgbGluZWFyJ1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpICsgXCJweFwiIFxuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgfVxuICAgIGxldCBzZWxlY3RBbGwgPSBuZXcgQ29udGVudChzZWxlY3REaXYse1xuICAgICAgICB3aWR0aDogMjAwLFxuICAgICAgICBoZWlnaHQ6IDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpXG4gICAgfSlcbiAgICBzZWxlY3RBbGwuZG9tLmlubmVyVGV4dCA9ICdzZWxlY3RBbGwnXG4gICAgLy8gc2VsZWN0QWxsLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICdhbGwgMC44cyBsaW5lYXInXG4gICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpICsgXCJweFwiIFxuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgIGlmKCFjb25TdHlsZS5Jc011bHRpcGxlKVxuICAgIHtcbiAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciA9ICdncmV5J1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFpbmRleDBbaV0pe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbMF0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0ICE9PSBpKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbdF0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W3RdLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXgwW3RdID0gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0clswXSA9ICcnXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmKCFpbmRleDBbaV0pXG4gICAgICAgICAgICAgICAgeyAgIFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbaV0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MFtpXSA9IHRydWVcbiAgICAgICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgICAgICAgICBpZihjb3VudCA9PT0gY29uU3R5bGUuc2VsU3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgfSAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0cltpXSA9ICcnXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGluZGV4MFtpXSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIGNvdW50LS1cbiAgICAgICAgICAgICAgICB9ICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RBbGwuZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgIGlmKCFpbmRleDEpe1xuICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciAgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbaV0gPSBjb25TdHlsZS5zZWxTdHJbaV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnQgPSBjb25TdHlsZS5zZWxTdHIubGVuZ3RoXG4gICAgICAgICAgICAgICAgaW5kZXgxID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yICA9IGNvbG9yXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gJydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY291bnQgPSAwXG4gICAgICAgICAgICAgICAgaW5kZXgxID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWxlY3RUZXh0LmRvbS5vbm1vdXNlZG93biA9IGUgPT57XG4gICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgIH1cbiAgICBzZWxlY3RUZXh0LmRvbS5vbm1vdXNldXAgPSBlID0+e1xuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25jbGljayA9IGUgPT4ge1xuICAgICAgICBpZighaW5kZXgpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUub3BhY2l0eSA9ICcxJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSAnMjEwMCdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2ICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAyKSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50b3AgPSAoKC0zNikgKiAoY29uU3R5bGUuc2VsU3RyLmxlbmd0aCArIDEpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS50b3AgPSAoMzYgKiAoY29uU3R5bGUuc2VsU3RyLmxlbmd0aCArIDEpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjEwMSdcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcwcHggMHB4IDE1cHggMTVweCdcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9ICdDb25maXJtJ1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAnMzZweCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gJzM2cHgnXG4gICAgICAgICAgICBpbmRleCA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnpJbmRleCA9ICcyMDAwJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5oZWlnaHQgPSAnMzYnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnRvcCA9ICcwJ1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpXG4gICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5oZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIlxuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gJzAnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAxMCdcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgICAgICAgICAgU3RyID0gJydcbiAgICAgICAgICAgIGNvblN0eWxlLnNlbGVkU3RyID0gc2VsZWN0U3RyXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzZWxlY3RTdHIubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzZWxlY3RTdHJbaV0hPT11bmRlZmluZWQmJnNlbGVjdFN0cltpXSE9PScnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3RyICs9IHNlbGVjdFN0cltpXSArICcsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFN0ciA9IFN0ci5zdWJzdHJpbmcoMCxTdHIubGVuZ3RoIC0gMSlcbiAgICAgICAgICAgIFN0ciA9IGN1dFN0cmluZyhTdHIsMjApXG4gICAgICAgICAgICBpZihTdHIgPT09ICcnfHxTdHIgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBTdHIgPSAn5bGV5byA6YCJ5oupJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uaW5uZXJUZXh0ID0gU3RyXG4gICAgICAgICAgICBpbmRleCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0J0bkRpdihkbGc6IERpYWxvZ3VlLGNvblN0eWxlOiBjb250ZW50U3R5bGUsdG9wOiBzdHJpbmcsc3RyPzogQXJyYXk8c3RyaW5nPil7XG4gICAgbGV0IEJ0bkRpdlN0eWxlID0ge1xuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiAzNVxuICAgIH1cbiAgICBsZXQgQnRuRGl2ID0gbmV3IENvbnRlbnQoZGxnLmNvblQsQnRuRGl2U3R5bGUpXG4gICAgbGV0IGNvbG9yID0gJyMwMGQ4MDAnXG4gICAgaWYoY29uU3R5bGUuaW50U3RyJiYhY29uU3R5bGUubm9JbnQpXG4gICAge1xuICAgICAgICB0b3AgPSAocGFyc2VJbnQodG9wKSArIDYwKihjb25TdHlsZS5pbnRTdHIubGVuZ3RoLTEpKS50b1N0cmluZygpICsgJ3B4J1xuICAgIH1cbiAgICBCdG5EaXYuZG9tLnN0eWxlLnRvcCA9IHRvcFxuICAgIEJ0bkRpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIGlmKCFzdHIpXG4gICAge1xuICAgICAgICBzdHIgPSBbJ09LJ11cbiAgICB9XG4gICAgaWYoc3RyLmxlbmd0aCA9PT0gMSlcbiAgICB7XG4gICAgICAgIEJ0bkRpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJ1xuICAgICAgICBjcmVhdGVEbGdCdG4oQnRuRGl2LHN0clswXSwxMjAsY29sb3IpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEJ0bkRpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnc3BhY2UtZXZlbmx5J1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaSAhPT0gMClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb2xvciA9ICcjZGNkY2RjJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3JlYXRlRGxnQnRuKEJ0bkRpdixzdHJbaV0sMTAwLGNvbG9yKVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdCdG4oQnRuRGl2OiBDb250ZW50LHN0cjogc3RyaW5nLHdpZHRoOiBudW1iZXIsY29sb3I6IHN0cmluZyl7XG4gICAgbGV0IGJ0blN0eWxlID0ge1xuICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgIGhlaWdodDogMzVcbiAgICB9XG4gICAgbGV0IGJ0biA9IG5ldyBDb250ZW50KEJ0bkRpdixidG5TdHlsZSlcbiAgICBidG4uZG9tLmNsYXNzTmFtZSA9IFwiQnV0dG9uXCJcbiAgICBidG4uZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGJ0bi5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgYnRuLmRvbS5zdHlsZS5jb2xvciA9ICd3aGl0ZSdcbiAgICBidG4uZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNHB4J1xuICAgIGJ0bi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjODg4ODg4J1xuICAgIGJ0bi5kb20uaW5uZXJIVE1MID0gc3RyXG4gICAgYnRuLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xufVxuXG5mdW5jdGlvbiBjdXRTdHJpbmcoc3RyOiBzdHJpbmcsbGVuOiBudW1iZXIpOiBzdHJpbmd7XG4gICAgbGV0IHNcbiAgICBsZXQgczAsczFcbiAgICBsZXQgc2FyciA9IHN0ci5zcGxpdCgnLCcpXG4gICAgbGV0IGwgPSBzYXJyLmxlbmd0aFxuICAgIGlmKHN0ci5sZW5ndGggPD0gbGVuKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHN0clxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBcbiAgICAgICAgaWYoKHNhcnJbMF0ubGVuZ3RoICsgc2FyclsxXS5sZW5ndGgpID49IChsZW4vMiktMilcbiAgICAgICAge1xuICAgICAgICAgICAgczAgPSBzdHIuc3Vic3RyaW5nKDAsKGxlbi8yKSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgczAgPSBzYXJyWzBdICsgJywnICsgc2FyclsxXSArICcsJ1xuICAgICAgICB9XG4gICAgICAgIGlmKChzYXJyW2wtMV0ubGVuZ3RoICsgc2FycltsLTJdLmxlbmd0aCkgPj0gKGxlbi8yKS0yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzYXJyW2wtMl0ubGVuZ3RoID49IChsZW4vMiktMilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzYXJyW2wtMV0ubGVuZ3RoID49IChsZW4vMiktMilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHMxID0gc2FycltsLTFdLnN1YnN0cmluZygwLChsZW4vMiktMikgKyAnLi4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHMxID0gc2FycltsLTFdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzMSA9IHNhcnJbbC0yXSArICcsJyArIHNhcnJbbC0xXS5zdWJzdHJpbmcoMCwobGVuLzIpLTItc2FycltsLTJdLmxlbmd0aCkgKyAnLi4nXG4gICAgICAgICAgICB9ICAgXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHMxID0gc2FycltsLTJdICsgJywnICsgc2FycltsLTFdXG4gICAgICAgIH1cbiAgICAgICAgLy8gczEgPSBzdHIuc3Vic3RyaW5nKHN0ci5sZW5ndGgtOCxzdHIubGVuZ3RoKVxuICAgICAgICBzID0gczAgKyAnLi4uLicgKyAnLCcgKyBzMTtcbiAgICAgICAgcmV0dXJuIHNcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIGNyZWF0ZURsZ0NvbmZpcm0oZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLElzTmVlZFN0YXR1czogYm9vbGVhbil7XG4vLyAgICAgbGV0IGNvbmZpcm1EaXZTdHlsZSA9IHtcbi8vICAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4vLyAgICAgICAgIGhlaWdodDogMzVcbi8vICAgICB9XG4vLyAgICAgbGV0IGNvbmZpcm1EaXYgPSBuZXcgQ29udGVudChkbGcuZG9tLGNvbmZpcm1EaXZTdHlsZSlcbi8vICAgICBjb25maXJtRGl2LmRvbS5zdHlsZS50b3AgPSB0b3Bcbi8vICAgICBjb25maXJtRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnY2VudGVyJ1xuLy8gICAgIGxldCBjb25maXJtU3R5bGUgPSB7XG4vLyAgICAgICAgIHdpZHRoOiAxMjAsXG4vLyAgICAgICAgIGhlaWdodDogMzVcbi8vICAgICB9XG4vLyAgICAgbGV0IGNvbmZpcm0gPSBuZXcgQ29udGVudChjb25maXJtRGl2LmRvbSxjb25maXJtU3R5bGUpXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSdcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTBweCdcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXG4vLyAgICAgY29uZmlybS5kb20uaW5uZXJUZXh0ID0gJ09LJ1xuLy8gICAgIGNvbmZpcm0uZG9tLnN0eWxlLmZvbnRTaXplID0gJzIycHgnXG4vLyAgICAgY29uZmlybS5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xuLy8gICAgICAgICAoYXN5bmMgZnVuY3Rpb24oKXtcbi8vICAgICAgICAgICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnI2VlZWVlZSdcbi8vICAgICAgICAgICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzAwODgwMCdcbi8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxuLy8gICAgICAgICAgICAgZGxnLnJlbW92ZSgpXG4vLyAgICAgICAgICAgICBpZihJc05lZWRTdGF0dXMgPT09IHRydWUpXG4vLyAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICBkbGcuc3RhdHVzVmFsdWUgPSB0cnVlIFxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4vLyBcdFx0fSgpKVxuLy8gICAgIH1cbi8vIH1cblxuIiwiaW1wb3J0ICogYXMgZXpVdGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgZXpDYW52YXMgZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpUaW1lIGZyb20gJy4vVGltZS90aW1lJ1xuaW1wb3J0IHsgY2FudmFzU3R5bGUgfSBmcm9tICcuL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgKiBhcyBlelJlY3RhbmdsZSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5cblxuXG4vLyBleHBvcnQgeyBBZGpvaW5SZWN0LFJlY3RDZW50ZXIgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2xpbmUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvYXJjJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy90ZXh0J1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2ltYWdlJ1xuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWUnXG5leHBvcnQgKiBmcm9tICcuL0tleXByZXNzL2tleXByZXNzJ1xuZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9ncmF0aW5nJ1xuZXhwb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9Hcm91cC9ncm91cCdcbmV4cG9ydCB7IENpcmNsZSB9IGZyb20gJy4vR3JhcGhpYy9jaXJjbGUnXG5leHBvcnQgeyBMaW5lIH0gZnJvbSAnLi9HcmFwaGljL2xpbmUnXG5leHBvcnQgeyBBcmMgfSBmcm9tICcuL0dyYXBoaWMvYXJjJ1xuZXhwb3J0IHsgRWxsaXBzZSB9IGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xuZXhwb3J0IHsgUG9seWdvbiB9IGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xuZXhwb3J0IHsgVGV4dCB9IGZyb20gJy4vR3JhcGhpYy90ZXh0J1xuZXhwb3J0IHsgSW1nIH0gZnJvbSAnLi9HcmFwaGljL2ltYWdlJ1xuZXhwb3J0IHsgVGltZSB9IGZyb20gJy4vVGltZS90aW1lJ1xuZXhwb3J0IHsgRGlhbG9ndWUgfSBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuZXhwb3J0IHsgR3JhdCB9IGZyb20gJy4vR3JhcGhpYy9ncmF0aW5nJ1xuLy8gZXhwb3J0IHsgYW5pbWF0ZSB9IGZyb20gJy4vQW5pbWF0ZS9hbmltYXRlJ1xuLy8gZXhwb3J0IHsgbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG4gXG4vLyBsZXQgRXpwc3lMaXN0ID0gbmV3IEFycmF5KCk7XG5cbmNsYXNzIEV6cHN5IHtcbiAgICBpZDogbnVtYmVyXG4gICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgY3R4TGlzdDogQXJyYXk8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPlxuICAgIGNTdHlsZT86IGNhbnZhc1N0eWxlXG5cbiAgICAvLyBSZWN0YW5nbGU6IFJlY3RhbmdsZVxuXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcixkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIHRoaXMuY1N0eWxlID0gY1N0eWxlO1xuICAgICAgICB0aGlzLmN0eExpc3QgPSBbXVxuICAgICAgICAvLyB0aGlzLmN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyhkb20sY1N0eWxlKTsgICAgLy/mraTlpITliJvlu7pjYW52YXPvvIzlj6/ku4XliJvlu7rkuIDkuKpjYW52YXPvvIzkvYbmmK/nm67liY3ml6Dms5Xku4XmuIXpmaTkuIDkuKrlm77lvaJcbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5jdHgpXG4gICAgfVxuXG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuY3R4TGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgIGxldCBjID0gdGhpcy5jdHhMaXN0W2ldLmNhbnZhcztcbiAgICAgICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGhcbiAgICAgICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdKXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoJ3N1Y2Nlc3MnKVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jdHggPSBlekNhbnZhcy5jcmVhdGVDYW52YXModGhpcy5kb20sdGhpcy5jU3R5bGUpOyAvL+atpOWkhOWIm+W7umNhbnZhc+WwhuWIm+W7uuWkmuS4qmNhbnZhc++8jOS9huWPr+S7hea4hemZpOWNleS4gOWbvuW9ou+8jOWboOatpOS5n+aXoOazleS9v+eUqGV6LnNldENhbnZhc1N0eWxlXG4gICAgICAgIHRoaXMuY3R4TGlzdC5wdXNoKHRoaXMuY3R4KVxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50cylcbiAgICAgICAge1xuICAgICAgICAgICAgZWwuY3R4ID0gY3R4O1xuICAgICAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWwsY3R4KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsW2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsW2ldLGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG5cbiAgICAvLyBhbGlhc2luZyhzdHlsZTogc3RyaW5nKXtcbiAgICAvLyAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gc3R5bGVcbiAgICAvLyB9XG5cbiAgICBhbmltYXRlKGZ1bmM6IEZ1bmN0aW9uLGRlbGF5OiBudW1iZXIpe1xuICAgICAgICBjb25zb2xlLmRpcihmdW5jKTtcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB3aGlsZSgxKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBlelRpbWUuV2FpdFNlY3MoZGVsYXkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICB9XG5cblxuXG4gICAgY2xlYXIoKXtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgICAgICBsZXQgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgICAgICB3aGlsZShjaGlsZCl7XG4gICAgICAgICAgICAgICAgdGhhdC5kb20ucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgICAgICAgICAgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXNvbHZlKDApXG4gICAgICAgIH0pXG4gICAgfVxuXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBwdXNoRXpwc3lMaXN0KGV6OiBFenBzeSl7XG4vLyAgICAgbGV0IG51bSA9IGV6LmlkO1xuLy8gICAgIEV6cHN5TGlzdFtudW1dID0gZXo7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpIHtcbiAgICBsZXQgZXogPSBuZXcgRXpwc3koZXpVdGlscy5Db3VudCgpLGRvbSxjU3R5bGUpO1xuICAgIC8vIHB1c2hFenBzeUxpc3QoZXopO1xuICAgIC8vIGNvbnNvbGUuZGlyKEV6cHN5TGlzdCk7XG4gICAgcmV0dXJuIGV6O1xufSJdLCJuYW1lcyI6WyJlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUiLCJlekp1ZGdlLmp1ZGdlRWxlbWVudCIsIm5hbWVJZCIsImV6SnVkZ2UuanVkZ2VEaXZTdHlsZSIsImV6RGl2LmNyZWF0ZURpdiIsImV6SnVkZ2UuanVkZ2VNb2RlbCIsImV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUiLCJlekNhbnZhcy5jcmVhdGVDYW52YXMiLCJlelRpbWUuV2FpdFNlY3MiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O1NDRWdCLFlBQVksQ0FBQyxHQUFnQixFQUFDLE1BQW9CO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7O0lBS3hDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUM3QixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNkLE9BQU8sR0FBRyxDQUFDO0FBQ2Y7O0FDbEJBLE1BQU0sSUFBSTtJQUNOLElBQUksQ0FBUTtJQUNaLE9BQU8sQ0FBUTtJQUNmLE9BQU8sQ0FBUTtJQUNmLFlBQVksQ0FBUTtJQUNwQjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUE7UUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUE7UUFDaEMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUE7S0FDN0M7Q0FDSjtNQUVZLElBQUk7SUFDYixTQUFTLENBQU07SUFDZixXQUFXLENBQU07SUFDakIsYUFBYSxDQUFRO0lBQ3JCLFNBQVMsQ0FBUTtJQUNqQjtLQUVDO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtLQUM5QjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7S0FDaEM7Q0FDSjtTQUVlLEdBQUc7SUFDZixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0lBQ2xCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUNULE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztTQUVlLEdBQUcsQ0FBQyxJQUFVO0lBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7SUFDcEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2IsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFBO0lBQ25ELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQTtJQUN6RCxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUE7SUFDekQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFBO0lBQ25FLENBQUMsR0FBRyxFQUFFLEdBQUMsRUFBRSxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFBO0lBQy9DLElBQUksQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLE9BQU8sQ0FBQyxDQUFDO0FBQ2IsQ0FBQztTQUVlLE9BQU8sQ0FBQyxJQUFVO0lBQzlCLElBQUksQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQixPQUFPLENBQUMsQ0FBQTtBQUNaLENBQUM7U0FFZSxRQUFRLENBQUMsS0FBYSxFQUFDLE9BQWE7SUFDaEQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFTLE9BQU8sRUFBQyxNQUFNO1FBQ3RDLFVBQVUsQ0FBQzs7WUFFUCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDZCxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ2IsQ0FBQyxDQUFBO0FBQ04sQ0FBQztTQUVlLFdBQVcsQ0FBQyxJQUFJO0lBQzVCLElBQUksUUFBUSxHQUFDLENBQUMsQ0FBQztJQUNmLE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBVSxPQUFPLEVBQUUsTUFBTTtRQUN4QyxDQUFDLFNBQVMsR0FBRztZQUNULFFBQVEsRUFBRSxDQUFDO1lBQ1gsSUFBSSxFQUFFLEdBQUUsTUFBTSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzlDLElBQUksUUFBUSxJQUFFLElBQUksRUFBQztnQkFDZixNQUFNLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNkO1NBQ0osRUFBRSxFQUFDO0tBQ1AsQ0FBQyxDQUFBO0FBQUE7O01DdEVXLFFBQVE7SUFDakIsS0FBSyxDQUFRO0lBQ2IsS0FBSyxDQUFRO0lBQ2IsR0FBRyxDQUEyQjtJQUM5QjtLQUVDO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQztLQUM1QjtJQUNELFFBQVE7UUFDSixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7Ozs7Ozs7O1FBUXpCLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtLQUM3QjtJQUNELGNBQWMsQ0FBQyxNQUFtQjtRQUM5QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QixNQUFNLEdBQUdBLGdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QixDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7S0FDNUI7SUFDRCxNQUFNO1FBQ0YsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNsQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDVixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDZixHQUFHLENBQUMsU0FBUyxHQUFDLE9BQU8sQ0FBQTtRQUNyQixHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyx3QkFBd0IsR0FBQyxnQkFBZ0IsQ0FBQztRQUM5QyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNmLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTs7S0FFaEI7SUFDRCxLQUFLLENBQUMsVUFBa0IsRUFBQyxXQUFtQjtRQUN4QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtRQUNiLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNWLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtRQUNmLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2pDQyxZQUFvQixDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQTtRQUM5QixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDZixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDaEI7SUFDRCxNQUFNLENBQUMsR0FBVztRQUNkLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDbEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBQ2IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNmQSxZQUFvQixDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQTtRQUM5QixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDZixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7S0FDaEI7SUFDRCxTQUFTLENBQUMsQ0FBUyxFQUFDLENBQVM7UUFDekIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNsQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUE7UUFDYixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDVixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7UUFDZixHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUNsQkEsWUFBb0IsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDL0IsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO1FBQ2YsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO0tBQ2hCOzs7QUNyRUwsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BRUgsS0FBTSxTQUFRLFFBQVE7SUFDL0IsRUFBRSxDQUFRO0lBQ1YsTUFBTSxDQUFROztJQUVkLFNBQVMsQ0FBMEI7SUFFbkMsWUFBWSxFQUE0QjtRQUVwQyxLQUFLLEVBQUUsQ0FBQTtRQUVQLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTtRQUNwQixJQUFJLENBQUMsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNsQixJQUFHLEVBQUUsWUFBWSxLQUFLLEVBQ3RCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDbEI7YUFDRztZQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLE9BQU8sRUFBRSxDQUFBO0tBQ1o7OztBQ1ZMLE1BQU0sTUFBTTtJQUNSLElBQUksQ0FBVztJQUNmLENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNULFlBQVksSUFBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNqRDtDQUNKO0FBRUQsTUFBTSxJQUFJO0lBQ04sSUFBSSxDQUFXO0lBQ2YsS0FBSyxDQUFRO0lBQ2IsTUFBTSxDQUFRO0lBQ2QsWUFBWSxJQUFlO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtLQUNsQztDQUNKO0FBRUQsTUFBTSxNQUFNO0lBQ1IsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1Q7S0FFQztDQUNKO01BRVksU0FBVSxTQUFRLEtBQUs7SUFDaEMsV0FBVyxDQUFXO0lBQ3RCLFlBQVksSUFBZSxFQUFDLEVBQWM7UUFDdEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDM0I7Q0FDSjtBQUVELElBQUlDLFFBQU0sR0FBRyxDQUFDLENBQUM7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7TUFFYSxTQUFVLFNBQVEsUUFBUTtJQUMzQixJQUFJLEdBQWU7UUFDdkIsSUFBSSxFQUFFLE1BQU0sR0FBR0EsUUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNoQyxTQUFTLEVBQUVBLFFBQU07S0FDcEIsQ0FBQTtJQUNELFlBQVksSUFBbUI7UUFDM0IsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUVYO0NBQ0o7QUFFRCxNQUFNLFNBQVUsU0FBUSxTQUFTO0lBQzdCLFlBQVksQ0FBWTtJQUN4QixZQUFZLENBQVk7SUFDeEIsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQztnQkFDVCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsTUFBTTthQUNqQixFQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0tBQ25DO0NBQ0o7QUFFRCxNQUFNLFFBQVMsU0FBUSxTQUFTO0lBQzVCLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQWdDLEVBQUMsWUFBdUIsRUFBQyxZQUF1QjtRQUN6RyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7S0FDdEQ7Q0FDSjtBQUVELE1BQU0sU0FBVSxTQUFRLFNBQVM7SUFDN0IsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsQ0FBQTtLQUN0RDtDQUNKO0FBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtTQUVnQixhQUFhLENBQUMsSUFBZSxFQUFDLEdBQTZCO0lBQ3ZFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7U0FFZSxVQUFVLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsVUFBMEI7O0lBRXRGLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBRyxDQUFDLFVBQVUsRUFDZDtRQUNJLFVBQVUsR0FBRyxVQUFVLENBQUE7S0FDMUI7SUFDRCxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBRXBDLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNQLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDOztLQUV2QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNaLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBQ1osT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFDWixPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztLQUN6QztTQUNHO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0tBQ3BEO0lBR0QsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzVDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNyRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDN0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFVBQVUsQ0FBQyxJQUFlOztJQUV0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO1NBRWUsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZSxFQUFDLEtBQXFCLEVBQUMsS0FBcUI7O0lBRXRHLElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBQztRQUNuQixLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQTtLQUNaO0lBQ0QsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUFDO1FBQ25CLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3BGO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7U0FDRztRQUNBLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQzs7UUFFckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDeEIsS0FBSyxFQUFDO2dCQUNGLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLElBQUcsRUFBRSxLQUFLLENBQUMsRUFDWDtZQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ25DO2dCQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztpQkFDRztnQkFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7U0FDSjthQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUM1QjtZQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQ0c7WUFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0Qzs7UUFHRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFHTCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsQ0FBUztJQUMzRCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVuQyxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ1Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO1FBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUE7S0FDdkM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0tBQzNDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNmO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQTtLQUM1QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFDZjtRQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7S0FDOUQ7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0tBQ2hFO1NBQ0c7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7S0FDMUQ7SUFDRCxPQUFPLENBQUMsQ0FBQTtBQUNaLENBQUM7U0FFZSxVQUFVLENBQUMsSUFBZSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBa0I7O0lBRTdELElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUI7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsWUFBWSxDQUFDLENBQVMsRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQWtCLEVBQUMsVUFBcUIsRUFBQyxLQUFjOztJQUUxRyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXZCLElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDM0IsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO0lBQzVDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTs7SUFHOUMsSUFBRyxDQUFDLEdBQUcsR0FBRyxFQUFDO1FBQ1AsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUNWO0lBRUQsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUN0QjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDYjtJQUVELElBQUcsS0FBSyxHQUFHLENBQUMsRUFDWjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsS0FBSyxLQUFLLENBQUMsRUFDZDtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFDN0I7Z0JBQ0ksSUFBRyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xCO29CQUNJLElBQUksQ0FBQyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDO3dCQUM5QixLQUFLLEVBQUU7NEJBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQzs0QkFDaEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQzs0QkFDakIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osTUFBTSxFQUFFLE1BQU07eUJBQ2pCO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDtxQkFDRztvQkFDQSxNQUFNO2lCQUNUO2FBRUo7U0FDSjtLQUNKO1NBRUQ7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUM3QjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO2dCQUNJLElBQUcsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNsQjtvQkFDSSxJQUFJLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQzt3QkFDOUIsS0FBSyxFQUFFOzRCQUNILENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDOzRCQUNqRCxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDOzRCQUNqQixLQUFLLEVBQUUsS0FBSzs0QkFDWixNQUFNLEVBQUUsTUFBTTt5QkFDakI7cUJBQ0osQ0FBQyxDQUFBO2lCQUNMO2FBQ0o7U0FDSjtLQUNKOztJQU1ELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsQ0FBQTtBQUNwQixDQUFDO1NBRWUsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTs7SUFFM0QsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxpQkFBaUIsQ0FBQyxJQUFlLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFrQjtJQUNwRSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEMsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlOztJQUVyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUM1QixPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO1NBRWUsVUFBVSxDQUFDLElBQWU7O0lBRXRDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzlCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7U0FFZSxRQUFRLENBQUMsSUFBZTs7SUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO1NBRWdCLFFBQVEsQ0FBQyxLQUFnQixFQUFDLEtBQWdCOztJQUV0RCxJQUFJLE9BQU8sRUFBQyxJQUFJLENBQUE7SUFDaEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDWCxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLElBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsRUFDdk87UUFDSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7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QUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxD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
