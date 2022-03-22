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
    let w = window.innerWidth;
    let h = window.innerHeight;
    // console.dir(w)
    c.style.top = ((h - cStyle.height) / 2).toString() + 'px';
    c.style.left = ((w - cStyle.width) / 2).toString() + 'px';
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
            resolve(1);
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
    scale;
    translate;
    rotate;
    constructor() {
        this.translate = {
            x: 0,
            y: 0
        };
        this.scale = {
            width: 1,
            height: 1
        };
        this.rotate = 0;
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
        let c = ctx.canvas;
        c.remove();
        // ctx.save()
        // // ctx.beginPath()
        // ctx.fillStyle="white"	
        // ctx.fillRect(0,0,1,1)
        // ctx.globalCompositeOperation="destination-in";
        // ctx.fillRect(0,0,1,1);
        // // ctx.closePath()	
        // ctx.restore()
        // ctx.globalCompositeOperation='source-over'
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
    // console.dir(fontString)
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
function judgeAnimate(el) {
    let ctx = el.ctx;
    // console.dir('a')
    el.remove();
    ctx.save();
    ctx.beginPath();
    ctx.translate(el.translate.x, el.translate.y);
    ctx.rotate(el.rotate);
    ctx.scale(el.scale.width, el.scale.height);
    judgeElement(el, ctx);
    ctx.closePath();
    ctx.restore();
}

function KbWait(key, func) {
    return new Promise((resolve, rejected) => {
        document.onkeydown = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                func();
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
    if (!conStyle.intStr || conStyle.noInt || conStyle.type !== "input") {
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
        // console.dir(conStyle)
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
        this.ctx = createCanvas(this.dom, this.cStyle); //此处创建canvas将创建多个canvas
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
    animate(el, func, delay) {
        // let that = this;
        (async function () {
            while (1) {
                func();
                await WaitSecs(delay / 2);
                judgeAnimate(el);
                await WaitSecs(delay / 2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3NyYy9KdWRnZS9qdWRnZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzcy50cyIsIi4uLy4uL3NyYy9EaXYvZGl2LnRzIiwiLi4vLi4vc3JjL0RpYWxvZ3VlL2RpYWxvZ3VlLnRzIiwiLi4vLi4vc3JjL2V6cHN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxubGV0IGlkU3RhcnQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaWRTdGFydCsrO1xufSIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgY2FudmFzU3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIC8vIGxldCBjU3R5bGU6IGNhbnZhc1N0eWxlID0ge1xuICAgIC8vICAgICB3aWR0aDogMTAwLFxuICAgIC8vICAgICBoZWlnaHQ6IDEwMFxuICAgIC8vIH1cbiAgICBjLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgYy5zdHlsZS50b3AgPSAoKGgtY1N0eWxlLmhlaWdodCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBjLnN0eWxlLmxlZnQgPSAoKHctY1N0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9tLmFwcGVuZChjKTtcbiAgICByZXR1cm4gY3R4O1xufSIsIlxuY2xhc3MgdGltZXtcbiAgICBob3VyOiBudW1iZXJcbiAgICBtaW51dGVzOiBudW1iZXJcbiAgICBzZWNvbmRzOiBudW1iZXJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IHRpbWVcbiAgICBpbnN0YW50VGltZTogdGltZVxuICAgIHRyYW5zaWVudFRpbWU6IHRpbWVbXVxuICAgIHRpbWVWYWx1ZTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBuZXcgdGltZSgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gVGljKCk6IFRpbWV7XG4gICAgbGV0IHQgPSBuZXcgVGltZSgpXG4gICAgdC5zdGFydCgpXG4gICAgcmV0dXJuIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZSk6IG51bWJlcntcbiAgICBsZXQgdCA9IDA7XG4gICAgbGV0IHRzID0gbmV3IEFycmF5KClcbiAgICB0aW1lLnJlY29yZCgpXG4gICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lLmhvdXIgLSB0aW1lLnN0YXJ0VGltZS5ob3VyXG4gICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lLm1pbnV0ZXMgLSB0aW1lLnN0YXJ0VGltZS5taW51dGVzXG4gICAgdHNbMl0gPSB0aW1lLmluc3RhbnRUaW1lLnNlY29uZHMgLSB0aW1lLnN0YXJ0VGltZS5zZWNvbmRzXG4gICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lLm1pbGxpc2Vjb25kcyAtIHRpbWUuc3RhcnRUaW1lLm1pbGxpc2Vjb25kc1xuICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4gICAgdGltZS50aW1lVmFsdWUgPSB0O1xuICAgIHJldHVybiB0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lKTogbnVtYmVye1xuICAgIGxldCB0ID0gVG9jKHRpbWUpXG4gICAgcmV0dXJuIHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIsbWVzc2FnZT86IGFueSl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc29sdmUoMSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlfZnJhbWUobnVtMSl7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT09bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbn0pfTsiLCJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRze1xuICAgIHNoYXBlPzogU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlIFxuICAgIGN0eD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIHNjYWxlPzogU2NhbGVcbiAgICB0cmFuc2xhdGU/OiBUcmFuc2xhdGVcbiAgICByb3RhdGU/OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwXG4gICAgfVxuICAgIG5vRmlsbCgpe1xuICAgICAgICB0aGlzLnN0eWxlLmZpbGwgPSAnbm9uZSc7XG4gICAgfVxuICAgIG5vU3Ryb2tlKCl7XG4gICAgICAgIHRoaXMuc3R5bGUubGluZVdpZHRoID0gMDtcbiAgICAgICAgLy8gaWYodGhpcy5zdHlsZS5maWxsICE9PSAnbm9uZScgJiYgdGhpcy5zdHlsZS5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSB0aGlzLnN0eWxlLmZpbGxcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSBcIiNmZmZcIjtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKCdFcnJvciEnKVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gJ25vbmUnXG4gICAgfVxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xuICAgICAgICBsZXQgYyA9IHRoaXMuY3R4LmNhbnZhcztcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICB9XG4gICAgcmVtb3ZlKCl7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBsZXQgYyA9IGN0eC5jYW52YXM7XG4gICAgICAgIGMucmVtb3ZlKCk7XG4gICAgICAgIC8vIGN0eC5zYXZlKClcbiAgICAgICAgLy8gLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIC8vIGN0eC5maWxsU3R5bGU9XCJ3aGl0ZVwiXHRcbiAgICAgICAgLy8gY3R4LmZpbGxSZWN0KDAsMCwxLDEpXG4gICAgICAgIC8vIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICAvLyBjdHguZmlsbFJlY3QoMCwwLDEsMSk7XG4gICAgICAgIC8vIC8vIGN0eC5jbG9zZVBhdGgoKVx0XG4gICAgICAgIC8vIGN0eC5yZXN0b3JlKClcbiAgICAgICAgLy8gY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj0nc291cmNlLW92ZXInXG4gICAgfVxuICAgIC8vIHNjYWxlKHNjYWxlV2lkdGg6IG51bWJlcixzY2FsZUhlaWdodDogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIHRoaXMucmVtb3ZlKClcbiAgICAvLyAgICAgY3R4LnNhdmUoKVxuICAgIC8vICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyAgICAgY3R4LnNjYWxlKHNjYWxlV2lkdGgsc2NhbGVIZWlnaHQpXG4gICAgLy8gICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KVxuICAgIC8vICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIH1cbiAgICAvLyByb3RhdGUoYW5nOiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgdGhpcy5yZW1vdmUoKVxuICAgIC8vICAgICBjdHguc2F2ZSgpXG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vICAgICBjdHgucm90YXRlKGFuZylcbiAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpXG4gICAgLy8gICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vICAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gfVxuICAgIC8vIHRyYW5zbGF0ZSh4OiBudW1iZXIseTogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIHRoaXMucmVtb3ZlKClcbiAgICAvLyAgICAgY3R4LnNhdmUoKVxuICAgIC8vICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyAgICAgY3R4LnRyYW5zbGF0ZSh4LHkpXG4gICAgLy8gICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KTtcbiAgICAvLyAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyB9XG59XG5cbmludGVyZmFjZSBTY2FsZXtcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBUcmFuc2xhdGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlclxufSIsImltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuXG5sZXQgZ3JvdXBJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIEVsZW1lbnRze1xuICAgIGlkOiBudW1iZXJcbiAgICBsZW5ndGg6IG51bWJlclxuICAgIC8vIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgZ3JvdXBMaXN0OiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXBcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwKXtcblxuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgdGhpcy5pZCA9IGdyb3VwSWQ7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGVsO1xuXG4gICAgICAgIGdyb3VwSWQrKyBcbiAgICB9XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IGp1ZGdlQ2hhbmdlVHlwZSxqdWRnZVNpZGUsanVkZ2VTdHlsZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcblxuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxuY2xhc3MgQ2VudGVye1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMueCA9IHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XG4gICAgfVxufVxuXG5jbGFzcyBTaXple1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG59XG5cbmNsYXNzIFNpZGVYWXtcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdEdyb3VwIGV4dGVuZHMgR3JvdXAge1xuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xuICAgICAgICBzdXBlcihlbClcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XG4gICAgfVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICB4OiBudW1iZXJcbi8vICAgICB5OiBudW1iZXJcbi8vICAgICB3aWR0aDogbnVtYmVyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcbi8vIH1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHByaXZhdGUgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJyZWN0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogUmVjdGFuZ2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4O1xuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcblxuICAgIH1cbn1cblxuY2xhc3MgbG9naWNSZWN0IGV4dGVuZHMgUmVjdGFuZ2xle1xuICAgIHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlO1xuICAgIHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlO1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcih7c2hhcGU6e1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICB9fSlcbiAgICAgICAgdGhpcy5yZWN0UGFyZW50czAgPSByZWN0UGFyZW50czBcbiAgICAgICAgdGhpcy5yZWN0UGFyZW50czEgPSByZWN0UGFyZW50czFcbiAgICB9XG59XG5cbmNsYXNzIGNsaXBSZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcbiAgICB9XG59XG5cbmNsYXNzIHVuaW9uUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiBpbnN0YW5jZW9mUmVjdGFuZ2xlKGU6IGFueSk6IGUgaXMgUmVjdGFuZ2xlU2hhcGV7XG4vLyAgICAgcmV0dXJuICBpbiBlO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XG4vLyAgICAgbGV0IHNoID0gcmVjdC5zaGFwZTtcbi8vICAgICBsZXQgc3QgPSByZWN0LnN0eWxlO1xuLy8gICAgIGxldCBmLHM7XG4vLyAgICAgLy8gY29uc29sZS5kaXIoc3Quc3Ryb2tlKVxuLy8gICAgIFtjdHgsZixzXSA9IGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xuLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbi8vICAgICAgICAgY3R4LmZpbGxSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgICAgICBjdHguc3Ryb2tlUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlID09PSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbi8vICAgICAgICAgY3R4LmZpbGxSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgPT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbi8vICAgICAgICAgY3R4LnJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgICAgIGN0eC5zdHJva2UoKTtcbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgY29uc29sZS5kaXIoXCJlcnJvciFJdCBjYW4ndCBwYWludCBhIHJlY3RhbmdsZSB3aXRob3V0IGZpbGxTdHlsZSBhbmQgc3Ryb2tlU3R5bGVcIilcbi8vICAgICB9XG4gICAgXG4vLyAgICAgcmV0dXJuIHJlY3Q7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcbiAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbiAgICBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIHJlY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGpvaW5SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxmaXhlZFN0eWxlPzogc3RyaW5nfG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouaLvOaOpSBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaLvOaOpeefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGlmKCFmaXhlZFN0eWxlKVxuICAgIHtcbiAgICAgICAgZml4ZWRTdHlsZSA9ICdSRUNUTEVGVCdcbiAgICB9XG4gICAgbGV0IGYgPSBqdWRnZUNoYW5nZVR5cGUoZml4ZWRTdHlsZSk7XG4gICAgLy8gY29uc29sZS5kaXIoJ2Y9JytmKTtcbiAgICBpZihmID09PSAxKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfTGVmdChmaXhlZFJlY3QscmVjdCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG5ld1JlY3QpXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMil7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1RvcChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMyl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1JpZ2h0KGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSA0KXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfQm90dG9tKGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBvcmRlciEnKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X0xlZnQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCAtIHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9SaWdodChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfVG9wKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55IC0gcmVjdC5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9Cb3R0b20oZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Q2VudGVyKHJlY3Q6IFJlY3RhbmdsZSk6IENlbnRlcntcbiAgICAvL+iOt+WPluefqeW9ouS4reW/g1xuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKHJlY3QpO1xuICAgIHJldHVybiBjZW50ZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLHNpZGUwPzogbnVtYmVyfHN0cmluZyxzaWRlMT86IG51bWJlcnxzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlr7npvZAgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXlr7npvZDnn6nlvaIgZml4ZWRTdHlsZSDlr7npvZDlvaLlvI9cbiAgICBpZihzaWRlMCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTAgPSAwXG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cbiAgICBpZihzaWRlMSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTEgPSAwXG4gICAgfVxuXG4gICAgaWYocmVjdC5zaGFwZS53aWR0aCpyZWN0LnNoYXBlLmhlaWdodCA+IGZpeGVkUmVjdC5zaGFwZS53aWR0aCpmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFUaGUgYXJlYSBvZiBmaWV4ZWRSZWN0ICBpcyBzbWFsbGVyIHRoYW4gdGhlIHJlY3QhJylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGxldCBbZjAsZjFdID0ganVkZ2VTaWRlKHNpZGUwLHNpZGUxKTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZjArXCIgXCIrZjEpO1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKTtcbiAgICAgICAgaWYoZjAgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAxIHx8IGYxID09PSAzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmRpcihzKVxuICAgICAgICBcbiAgICAgICAgbmV3UmVjdC5zaGFwZS54ID0gcy54O1xuICAgICAgICBuZXdSZWN0LnNoYXBlLnkgPSBzLnk7XG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xuICAgIH1cbiAgICBcbiAgICBcbn1cblxuZnVuY3Rpb24gQWxpZ25YWShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZjogbnVtYmVyKTogU2lkZVhZe1xuICAgIGxldCBzID0gbmV3IFNpZGVYWSgpXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIoZml4ZWRSZWN0KTtcbiAgICAvLyBjb25zb2xlLmRpcihjZW50ZXIpXG4gICAgaWYoZiA9PT0gMClcbiAgICB7ICAgXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gcmVjdC5zaGFwZS53aWR0aC8yXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gcmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDEpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCAtIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMilcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMylcbiAgICB7XG4gICAgICAgIHMueCA9IGNlbnRlci54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLzIgLSByZWN0LnNoYXBlLndpZHRoXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNClcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yIC0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBpbnN0cnVjdGlvbiEnKVxuICAgIH1cbiAgICByZXR1cm4gc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gT2Zmc2V0UmVjdChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouW5s+enu1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJyYW5nZVJlY3RzKG46IG51bWJlcixbeE51bWJlcix5TnVtYmVyXTogW251bWJlcixudW1iZXJdLHdpbmRvd1JlY3Q6IFJlY3RhbmdsZSxzdHlsZT86IG51bWJlcik6IFJlY3RHcm91cHtcbiAgICAvL+WIm+W7uuefqeW9oumYteWIl1xuICAgIGxldCByZWN0ID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgbGV0IG51bSA9IHhOdW1iZXIgKiB5TnVtYmVyXG4gICAgbGV0IHggPSB3aW5kb3dSZWN0LnNoYXBlLnhcbiAgICBsZXQgeSA9IHdpbmRvd1JlY3Quc2hhcGUueVxuICAgIGxldCB3aWR0aCA9IHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLyB4TnVtYmVyXG4gICAgbGV0IGhlaWdodCA9IHdpbmRvd1JlY3Quc2hhcGUuaGVpZ2h0IC8geU51bWJlclxuICAgIC8vIGNvbnNvbGUuZGlyKFt4LHksd2lkdGgsaGVpZ2h0XSlcblxuICAgIGlmKG4gPiBudW0pe1xuICAgICAgICBuID0gbnVtXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0eWxlID0gMDtcbiAgICB9XG5cbiAgICBpZihzdHlsZSA+IDEpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDBcbiAgICB9XG5cbiAgICBpZihzdHlsZSA9PT0gMClcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC0gd2lkdGggLSB3aWR0aCAqIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG5cbiAgICAvLyBjb25zb2xlLmRpcihyZWN0KVxuXG4gICAgbGV0IHJlY3RHcm91cCA9IG5ldyBSZWN0R3JvdXAod2luZG93UmVjdCxyZWN0KTtcbiAgICByZXR1cm4gcmVjdEdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICAvL+enu+WKqOefqeW9ouiHs+afkOefqeW9ouS4reW/gyBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaTjeS9nOefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0ID0gQWxpZ25SZWN0KGZpeGVkUmVjdCxyZWN0LDAsMCk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3RPblBvaW50KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gT2Zmc2V0UmVjdChyZWN0LFt4LHldKVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0V2lkdGgocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i5a695bqmXG4gICAgbGV0IHdpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgIHJldHVybiB3aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdEhlaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLpq5jluqZcbiAgICBsZXQgaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFNpemUocmVjdDogUmVjdGFuZ2xlKTogU2l6ZXtcbiAgICAvL+iOt+WPluefqeW9ouWuvemrmFxuICAgIGxldCBzaXplID0gbmV3IFNpemUocmVjdClcbiAgICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuLy8gICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4vLyAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdDAuc2hhcGUueCxyZWN0MC5zaGFwZS55LHJlY3QwLnNoYXBlLndpZHRoLHJlY3QwLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgW3gxLHkxLHcxLGgxXSA9IFtyZWN0MS5zaGFwZS54LHJlY3QxLnNoYXBlLnkscmVjdDEuc2hhcGUud2lkdGgscmVjdDEuc2hhcGUuaGVpZ2h0XVxuLy8gICAgIGxldCBSZWN0LHhuLHluLHduLGhuO1xuLy8gICAgIGxldCBhcmVhMCA9IHcwICogaDA7XG4vLyAgICAgbGV0IGFyZWExID0gdzEgKiBoMTtcbi8vICAgICBsZXQgeCx5LHcsaFxuLy8gICAgIGxldCB4dCx5dCx3dCxodCxyZWN0XG4vLyAgICAgaWYoYXJlYTAgPj0gYXJlYTEpXG4vLyAgICAge1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDEseTEsdzEsaDFdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QwO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDAseTAsdzAsaDBdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QxO1xuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmRpcihbeCx5LHcsaF0pO1xuLy8gICAgIGNvbnNvbGUuZGlyKFt4dCx5dCx3dCxodF0pXG4vLyAgICAgaWYoIUlzSW5SZWN0KFt4LHldLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHkraF0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4LHkraF0scmVjdCkpe1xuLy8gICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIHduID0gTWF0aC5hYnMoTWF0aC5taW4oeDAgKyB3MCAseDEgKyB3MSkgLSBNYXRoLm1heCh4MCwgeDEpKVxuLy8gICAgICAgICBobiA9IE1hdGguYWJzKE1hdGgubWluKHkwICsgaDAsIHkxICsgaDEpIC0gTWF0aC5tYXgoeTAsIHkxKSlcbi8vICAgICAgICAgaWYoSXNJblJlY3QoW3gseV0scmVjdCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoKHggPj0geHQgJiYgeDw9eHQrd3QpICYmICh5IDwgeXQgfHwgeSA+IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHg7XG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4IDwgeHQgfHwgeCA+IHh0K3d0KSAmJiAoeSA+PSB5dCAmJiB5IDw9IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKVxuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICBSZWN0ID0gW3huLHluLHduLGhuXTtcbiAgICAgICAgXG4vLyAgICAgfVxuXG4vLyAgICAgbGV0IG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbi8vICAgICByZXR1cm4gbmV3UmVjdDtcblxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XG4gICAgLy/nn6nlvaLph43lj6DljLrln59cbiAgICBsZXQgbmV3UmVjdCxSZWN0XG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xuICAgIGxldCB4LHksdyxoXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XG4gICAgaWYoSXNJblJlY3QoW3hsMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hsMSx5YjFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHliMV0scmVjdDApKVxuICAgIHtcbiAgICAgICAgeCA9IE1hdGgubWF4KHhsMCx4bDEpO1xuICAgICAgICB5ID0gTWF0aC5tYXgoeXQwLHl0MSk7XG4gICAgICAgIHcgPSBNYXRoLm1pbih4cjAseHIxKSAtIHg7XG4gICAgICAgIGggPSBNYXRoLm1pbih5YjAseWIxKSAtIHk7XG4gICAgICAgIFJlY3QgPSBbeCx5LHcsaF1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuICAgIH1cblxuICAgIG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNJblJlY3QoW3gseV06IFtudW1iZXIsbnVtYmVyXSxyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xuICAgIC8v5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXG4gICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdC5zaGFwZS54LHJlY3Quc2hhcGUueSxyZWN0LnNoYXBlLndpZHRoLHJlY3Quc2hhcGUuaGVpZ2h0XVxuICAgIGlmKHggPj0geDAgJiYgeDw9eDArdzAgJiYgeSA+PSB5MCAmJiB5IDw9IHkwK2gwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHcm93UmVjdChlbDogUmVjdGFuZ2xlLyp8UmVjdEdyb3VwfEdyb3VwKi8saDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+aUvui0n+e8qSBcbiAgICAvLyBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICAvLyB7XG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICBzaGFwZTp7XG4gICAgICAgICAgICAgICAgeDplbC5zaGFwZS54IC0gaCxcbiAgICAgICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoICsgMipoLFxuICAgICAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgLSB2LFxuICAgICAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgKyAyKnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIG5ld1JlY3RcbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBSZWN0R3JvdXApXG4gICAgLy8ge1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNle1xuICAgIC8vICAgICBjb25zb2xlLmRpcihcIuexu+Wei+mUmeivr1wiKVxuICAgIC8vIH1cbn0gICAgICAgXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnNldFJlY3QoZWw6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q2j57yp6LSf5pS+XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6ZWwuc2hhcGUueCArPSBoLFxuICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCAtPSAyKmgsXG4gICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55ICs9IHYsXG4gICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0IC09IDIqdlxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2NhbGVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q+U5L6L57yp5pS+XG4gICAgbGV0IGgwID0gcmVjdC5zaGFwZS53aWR0aCAqIChoLTEpIC8gMlxuICAgIGxldCB2MCA9IHJlY3Quc2hhcGUuaGVpZ2h0ICogKHYtMSkgLyAyXG4gICAgY29uc29sZS5kaXIoaDArJyAnK3YwKVxuICAgIGxldCBuZXdSZWN0ID0gR3Jvd1JlY3QocmVjdCxoMCx2MClcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNFbXB0eVJlY3QocmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreefqemYteaYr+WQpuS4uuepulxuICAgIGxldCBhcmVhID0gcmVjdC5zaGFwZS53aWR0aCAqIHJlY3Quc2hhcGUuaGVpZ2h0O1xuICAgIGlmKGFyZWEgPT09IDApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0T2ZNYXRyaXgoKXtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdExlZnQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RSaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RUb3AocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RCb3RvbShyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueSArIHJlY3Quc2hhcGUuaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbmlvblJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogdW5pb25SZWN0e1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIHggPSBNYXRoLm1pbih4bDAseGwxKTtcbiAgICB5ID0gTWF0aC5taW4oeXQwLHl0MSk7XG4gICAgdyA9IE1hdGgubWF4KHhyMCx4cjEpIC0geDtcbiAgICBoID0gTWF0aC5tYXgoeWIwLHliMSkgLSB5O1xuICAgIG5ld1JlY3QgPSBuZXcgdW5pb25SZWN0KFt4LHksdyxoXSxyZWN0MCxyZWN0MSk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxSZWN0KHJlY3Q6IFJlY3RhbmdsZSxmaWxsPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBDaXJjbGVTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyXG59XG5cbmludGVyZmFjZSBDaXJjbGVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogQ2lyY2xlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQ2lyY2xlIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImNpcmNsZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGRlY2xhcmUgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgY29uc3RydWN0b3Iob3B0czogQ2lyY2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDaXJjbGUoY2lyY2xlOiBDaXJjbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBDaXJjbGV7XG4gICAgbGV0IHNoID0gY2lyY2xlLnNoYXBlXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSk7XG4gICAganVkZ2VTdHlsZShjaXJjbGUsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICByZXR1cm4gY2lyY2xlO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdEb3RzKFt4LHkscl06IFtudW1iZXIsbnVtYmVyLG51bWJlcl0sY29sb3I6IHN0cmluZyk6IENpcmNsZXtcbiAgICBsZXQgY2lyY2xlID0gbmV3IENpcmNsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHI6IHJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlIDogJ25vbmUnXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjaXJjbGVcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHhFbmQ6IG51bWJlcixcbiAgICB5RW5kOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIExpbmVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogTGluZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwibGluZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IExpbmVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG4vLyBleHBvcnQgY2xhc3MgbGluZXtcbi8vICAgICBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcbi8vICAgICAgICAgbGV0IGwgPSB0aGlzLm1ha2VMaW5lKGxpbmUsY3R4KTtcbi8vICAgICAgICAgcmV0dXJuIGw7XG4vLyAgICAgfVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XG4gICAgbGV0IHNoID0gbGluZS5zaGFwZTtcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLnhFbmQsc2gueUVuZClcbiAgICBqdWRnZVN0eWxlKGxpbmUsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgcmV0dXJuIGxpbmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdMaW5lcyhlbDogTGluZVtdfEdyb3VwW118R3JvdXApOiBHcm91cHtcbiAgICAvL+e7mOWItuWkmuadoee6vyBvcHRzOue6v+adoeWxnuaAp1xuICAgIGxldCBncm91cCA9IG5ldyBHcm91cChlbClcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdNbGluZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLGdhcD86IG51bWJlcltdLHN0eWxlPzogYm9vbGVhbixzdGlwcGxlPzogYm9vbGVhbix3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIGdhcOe6v+S5i+mXtOeahOmXtOmalCBzdHlsZT1mYWxzZeS4uuawtOW5s+W5s+ihjCw9dHJ1ZeS4uuerluebtOW5s+ihjCBzdGlwcGxlPWZhbHNl5Li65a6e57q/LD10cnVl5Li66Jma57q/XG4gICAgaWYod2lkdGhHYXAgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygd2lkdGhHYXAgIT09ICdudW1iZXInKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSAxMDtcbiAgICAgICAgaWYoc3RpcHBsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGlwcGxlICE9PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0aXBwbGUgPT09IGZhbHNlXG4gICAgICAgICAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHlsZSAhPT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmKGdhcCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gWzEwMCwxMDBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGxldCBvcHRzID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgaWYoc3RpcHBsZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBvcHRzWzBdID0gbmV3IExpbmUgKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeStnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmQrZ2FwW2ktMV0qaVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4K2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBvcHRzWzBdID0gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdLHdpZHRoR2FwKTtcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3gseStnYXBbaS0xXSppLHhFbmQseUVuZCtnYXBbaS0xXSppXSx3aWR0aEdhcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4K2dhcFtpLTFdKmkseSx4RW5kK2dhcFtpLTFdKmkseUVuZF0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgICAgIFxuICAgIFxuICAgIGxldCBncm91cCA9IERyYXdMaW5lcyhvcHRzKTtcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyB3aWR0aEdhcOmXtOmalCBcbiAgICBsZXQgbGluZWxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyh4RW5kLXgsMikrTWF0aC5wb3coeUVuZC15LDIpKVxuICAgIGlmKHdpZHRoR2FwPmxpbmVsZW5ndGh8fHdpZHRoR2FwPT09dW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSBsaW5lbGVuZ3RoLzEwO1xuICAgIH1cbiAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihsaW5lbGVuZ3RoL3dpZHRoR2FwKVxuICAgIGxldCB4ZyA9IHdpZHRoR2FwKih4RW5kLXgpL2xpbmVsZW5ndGhcbiAgICBsZXQgeWcgPSB3aWR0aEdhcCooeUVuZC15KS9saW5lbGVuZ3RoXG4gICAgLy8gY29uc29sZS5kaXIobnVtKVxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGluZSA9IG5ldyBBcnJheSgpO1xuICAgIHdoaWxlKGk8bnVtKVxuICAgIHtcbiAgICAgICAgbGluZVtpXSA9IG5ldyBMaW5lKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCt4ZyppLFxuICAgICAgICAgICAgICAgIHk6IHkreWcqaSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4K3hnKihpKzEpLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHkreWcqKGkrMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaSs9MjtcbiAgICB9XG4gICAgbGV0IExpbmVTdGlwcGxlID0gbmV3IEdyb3VwKGxpbmUpXG4gICAgcmV0dXJuIExpbmVTdGlwcGxlXG59XG5cbi8vIGV4cG9ydCBjbGFzcyBQb2x5IGV4dGVuZHMgR3JvdXB7XG4vLyAgICAgc3R5bGU6IFN0eWxlXG4vLyAgICAgY29uc3RydWN0b3IoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwLHN0eWxlPzogU3R5bGUpe1xuLy8gICAgICAgICBzdXBlcihlbClcbi8vICAgICAgICAgaWYoc3R5bGUpXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbi8vICAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbi8vICAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuLy8gICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEFyY1NoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgYW5nX2Y6IG51bWJlcixcbiAgICBhbmdfZTogbnVtYmVyXG59XG5cbmludGVyZmFjZSBBcmNPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogQXJjU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgQXJjIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImFyY1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEFyY09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQXJje1xuICAgIGxldCBzdCA9IGFyYy5zdHlsZVxuICAgIGlmKHN0LmZpbGwgPT09IHVuZGVmaW5lZCB8fCBzdC5maWxsID09PSAnbm9uZScgfHwgc3QuZmlsbCA9PT0gJyNmZmYnKVxuICAgIHtcbiAgICAgICAgbWFrZUZyYW1lQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBtYWtlRmlsbEFyYyhhcmMsY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIGFyYztcbn1cblxuZnVuY3Rpb24gbWFrZUZyYW1lQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLHNoLmFuZ19mLHNoLmFuZ19lKTtcbiAgICBqdWRnZVN0eWxlKGFyYyxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKVxufVxuXG5mdW5jdGlvbiBtYWtlRmlsbEFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2YpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZikpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZSksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19lKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZUFyYyhhcmM6IEFyYyxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogQXJje1xuICAgIC8v55S757KX57q/5bynIFxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgLy8ganVkZ2VTdHlsZV9lenN5KGFyYylcblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQXJjKGFyYzogQXJjLGZpbGw/OiBzdHJpbmcpOiBBcmN7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG5cbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogYXJjLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxuICAgICAgICAgICAgYW5nX2Y6IGFyYy5zaGFwZS5hbmdfZixcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJjMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBFbGxpcHNlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4PzogbnVtYmVyLFxuICAgIHk/OiBudW1iZXIsXG4gICAgcmE/OiBudW1iZXIsXG4gICAgcmI/OiBudW1iZXJcbiAgICAvL3Jh5Li65qiq6L206ZW/IHJi5Li657q16L206ZW/XG59XG5cbmludGVyZmFjZSBFbGxpcHNlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEVsbGlwc2VTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImVsbGlwc2VcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBFbGxpcHNlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VFbGxpcHNlKGVsbGlwc2U6IEVsbGlwc2UsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBFbGxpcHNle1xuICAgIC8vbWF45piv562J5LqOMemZpOS7pemVv+i9tOWAvGHlkoxi5Lit55qE6L6D5aSn6ICFXG4gICAgLy9p5q+P5qyh5b6q546v5aKe5YqgMS9tYXjvvIzooajnpLrluqbmlbDnmoTlop7liqBcbiAgICAvL+i/meagt+WPr+S7peS9v+W+l+avj+asoeW+queOr+aJgOe7mOWItueahOi3r+W+hO+8iOW8p+e6v++8ieaOpei/kTHlg4/ntKBcbiAgICBsZXQgc2ggPSBlbGxpcHNlLnNoYXBlXG4gICAgbGV0IHN0ZXAgPSAoc2gucmEgPiBzaC5yYikgPyAxIC8gc2gucmEgOiAxIC8gc2gucmI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5tb3ZlVG8oc2gueCArIHNoLnJhLCBzaC55KTsgLy/ku47mpK3lnIbnmoTlt6bnq6/ngrnlvIDlp4vnu5jliLZcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKiBNYXRoLlBJOyBpICs9IHN0ZXApXG4gICAge1xuICAgICAgICAvL+WPguaVsOaWueeoi+S4unggPSBhICogY29zKGkpLCB5ID0gYiAqIHNpbihpKe+8jFxuICAgICAgICAvL+WPguaVsOS4umnvvIzooajnpLrluqbmlbDvvIjlvKfluqbvvIlcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54ICsgc2gucmEgKiBNYXRoLmNvcyhpKSwgc2gueSArIHNoLnJiICogTWF0aC5zaW4oaSkpO1xuICAgIH1cbiAgICBqdWRnZVN0eWxlKGVsbGlwc2UsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIGVsbGlwc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxPdmFsKGVsbGlwc2U6IEVsbGlwc2UsZmlsbD86IHN0cmluZyk6IEVsbGlwc2V7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZWxsaXBzZTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIFBvbHlnb25TaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXG4gICAgeEE6IG51bWJlcltdXG4gICAgeUE6IG51bWJlcltdXG59XG5cbmludGVyZmFjZSBQb2x5Z29uT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IFBvbHlnb25TaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBQb2x5Z29uIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInBvbHlnb25cIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBQb2x5Z29uT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQb2x5Z29uKHBvbHlnb246IFBvbHlnb24sY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBQb2x5Z29ue1xuICAgIGxldCBzaCA9IHBvbHlnb24uc2hhcGVcbiAgICBsZXQgbnVtID0gMDtcbiAgICBpZihzaC54QS5sZW5ndGggIT09IHNoLnlBLmxlbmd0aClcbiAgICB7XG4gICAgICAgIG51bSA9IE1hdGgubWluKHNoLnhBLmxlbmd0aCxzaC55QS5sZW5ndGgpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG51bSA9IHNoLnhBLmxlbmd0aFxuICAgIH1cblxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueEFbMF0sc2gueUFbMF0pXG4gICAgZm9yKGxldCBpID0gMTtpIDwgbnVtO2krKylcbiAgICB7XG4gICAgICAgIGN0eC5saW5lVG8oc2gueEFbaV0sc2gueUFbaV0pXG4gICAgfVxuICAgIGN0eC5saW5lVG8oc2gueEFbMF0sc2gueUFbMF0pXG4gICAganVkZ2VTdHlsZShwb2x5Z29uLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIHJldHVybiBwb2x5Z29uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVBvbHkocG9seWdvbjogUG9seWdvbixsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUG9seWdvbntcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcG9seWdvbjBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxQb2x5KHBvbHlnb246IFBvbHlnb24sZmlsbD86IHN0cmluZyk6IFBvbHlnb257XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBvbHlnb24wXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGVfdGV4dCwganVkZ2VUZXh0U3R5bGUgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIFRleHRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgdGV4dDogc3RyaW5nXG4gICAgbWF4V2lkdGg/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFRleHRPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogVGV4dFNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFRleHQgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwidGV4dFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFRleHRPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVGV4dCh0ZXh0OiBUZXh0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogVGV4dHtcblxuICAgIGN0eC5iZWdpblBhdGgoKVxuXG4gICAganVkZ2VUZXh0U3R5bGUodGV4dCxjdHgpXG5cbiAgICBqdWRnZVN0eWxlX3RleHQodGV4dCxjdHgpXG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2F0U3RyKHN0ckE6IHN0cmluZ1tdKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBzdHJBLmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0ckFbaV07XG4gICAgfVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHJQYWQoc3RyOiBzdHJpbmcsc3RyMDogc3RyaW5nLG51bT86IG51bWJlcik6IHN0cmluZ3tcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgXG4gICAgaWYobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSAwKVxuICAgIHtcbiAgICAgICAgbnVtID0gMTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDtpPG51bTtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0cjBcbiAgICB9XG4gICAgdGV4dCArPSBzdHJcblxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJlcShzdHIwOiBzdHJpbmcsc3RyMTogc3RyaW5nKTogYm9vbGVhbntcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcbiAgICByZXN1bHQgPSBzdHIwLmluY2x1ZGVzKHN0cjEpO1xuICAgIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcGxhY2Uoc3RyOiBzdHJpbmcsc3RyX286IHN0cmluZyxzdHJfcjogc3RyaW5nKTpzdHJpbmd7XG4gICAgbGV0IHJlc3VsdCA9ICcnXG5cbiAgICByZXN1bHQgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHN0cl9vLCdnJyksc3RyX3IpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlSW1hZ2VTaGFwZSwganVkZ2VTdHlsZSxqdWRnZUltYWdlU2hhcGVfdHJ1ZSB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgSW1nU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICBpbWc6IHN0cmluZ1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIHdpZHRoPzogbnVtYmVyXG4gICAgaGVpZ2h0PzogbnVtYmVyXG4gICAgc3g/OiBudW1iZXJcbiAgICBzeT86IG51bWJlclxuICAgIHN3aWR0aD86IG51bWJlclxuICAgIHNoZWlnaHQ/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEltZ09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBJbWdTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbiAgICBJbWc/OiBhbnlcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5jbGFzcyBSR0JBIHtcbiAgICBSOiBudW1iZXJcbiAgICBHOiBudW1iZXJcbiAgICBCOiBudW1iZXJcbiAgICBBOiBudW1iZXJcbn1cblxuY2xhc3MgUkdCQV9BcnJheXtcbiAgICBSR0JBX0xpc3Q6IFJHQkFbXVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgSW1nIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcHJpdmF0ZSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImltZ1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIEltZz86IGFueVxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcbiAgICBJc0NoYW5nZT86IGJvb2xlYW5cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBJbWdPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgaWYob3B0cy5JbWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IEkgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgSS5zcmMgPSBvcHRzLnNoYXBlLmltZ1xuICAgICAgICAgICAgdGhpcy5JbWcgPSBJO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLkltZyA9IG9wdHMuSW1nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXG4gICAgICAgIC8vIHRoaXMudGV4dHVyZXMgPSB7XG4gICAgICAgIC8vICAgICB0ZXh0dXJlOiBbXSxcbiAgICAgICAgLy8gICAgIHdpZHRoOiAwLFxuICAgICAgICAvLyAgICAgaGVpZ2h0OiAwXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYob3B0cy5JbWdEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxuICAgICAgICAvLyB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3ggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN3aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnNoZWlnaHQgPSB0aGlzLkltZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS53aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLndpZHRoID0gdGhpcy5JbWcud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5oZWlnaHQgPSB0aGlzLkltZy5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxuXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuSW1nRGF0YSlcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIC8vIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAgICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBjLndpZHRoID0gc2NyZWVuLmF2YWlsV2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoaXMuSW1nLHNoLngsc2gueSlcbiAgICAgICAgdGhpcy5JbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YShzaC54LHNoLnksdGhpcy5JbWcud2lkdGgsdGhpcy5JbWcuaGVpZ2h0KTtcbiAgICAgICAgLy8gdGhpcy5tYWtlVGV4dHVyZXMoKVxuICAgIH1cbiAgICB0b0dyYXkoKXtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWcoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICBpbWc6IHRoaXMuc2hhcGUuaW1nLFxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2hhcGUueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnNoYXBlLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2hhcGUud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzeDogdGhpcy5zaGFwZS5zeCxcbiAgICAgICAgICAgICAgICBzeTogdGhpcy5zaGFwZS5zeSxcbiAgICAgICAgICAgICAgICBzd2lkdGg6IHRoaXMuc2hhcGUuc3dpZHRoLFxuICAgICAgICAgICAgICAgIHNoZWlnaHQ6IHRoaXMuc2hhcGUuc2hlaWdodCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8gdGhpcy5Jc0NoYW5nZSA9IHRydWVcbiAgICAgICAgaW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBsZXQgZyA9IDBcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGhpcy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBnID0gTWF0aC5mbG9vcih0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMF0gKiAwLjI5OSArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsxXSAqIDAuNTg3ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzJdICogMC4xMTQpO1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gPSB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrM11cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cbiAgICByZXBsYWNlKCl7XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICBtYWtlVGV4dHVyZXMoKXtcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IG5ldyBUZXh0dXJlcyh0aGlzKTtcbiAgICAgICAgbGV0IGltZyA9IHRoaXMudG9HcmF5KCk7XG4gICAgICAgIGxldCBkYXRhMCA9IGltZy5JbWdEYXRhLmRhdGE7XG4gICAgICAgIGxldCBhID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IGFyciA9ICcnXG4gICAgICAgIGxldCBudW1BcnI6IG51bWJlcltdID0gW107XG4gICAgICAgIGxldCBudW1BcnIwOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuSW1nRGF0YS5kYXRhXG4gICAgICAgIGxldCB3ID0gdGhpcy5JbWdEYXRhLndpZHRoXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGRhdGEpXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEwLmxlbmd0aC80O2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgMzt0KyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDtrIDwgMztrKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhMFs0KmldIDw9IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSB8fCBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKDMqdCtrICE9PSA0KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIgKz0gYVszKnQra10udG9TdHJpbmcoKTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoKGkrKHQtMSkqdytrLTEpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG51bUFycltpXSA9IHBhcnNlSW50KGFyciwyKVxuICAgICAgICAgICAgYXJyID0gJydcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1BcnIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF09bnVtQXJyW2ldXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXT1udW1BcnJbaV1cbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdPW51bUFycltpXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUltZyhpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEltZ3tcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBpZihpbWcuSXNDaGFuZ2UgPT09IGZhbHNlKVxuICAgIHtcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlKGltZyxjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBqdWRnZUltYWdlU2hhcGVfdHJ1ZShpbWcsY3R4KTtcbiAgICB9XG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgcmV0dXJuIGltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1SZWFkKGltZzogSW1nKTogSW1hZ2VEYXRheyAgICAgICAgIC8v6K+75Y+W5Zu+54mH55+p6Zi1XG4gICAgcmV0dXJuIGltZy5JbWdEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5wYWNrQ29sb3JJbWFnZShpbWc6IEltZyk6IFJHQkFfQXJyYXl7XG4gICAgbGV0IHJnYmEgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBkYXRhID0gaW1nLkltZ0RhdGEuZGF0YVxuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgcmdiYVtpXSA9IG5ldyBSR0JBKClcbiAgICAgICAgXG4gICAgICAgIHJnYmFbaV0uUiA9IGRhdGFbNCppKzBdXG4gICAgICAgIHJnYmFbaV0uRyA9IGRhdGFbNCppKzFdXG4gICAgICAgIHJnYmFbaV0uQiA9IGRhdGFbNCppKzJdXG4gICAgICAgIHJnYmFbaV0uQSA9IGRhdGFbNCppKzNdXG5cbiAgICB9XG5cbiAgICBsZXQgcmdiYV9hcnIgPSBuZXcgUkdCQV9BcnJheSgpXG4gICAgcmdiYV9hcnIuUkdCQV9MaXN0ID0gcmdiYTtcbiAgICByZ2JhX2Fyci53aWR0aCA9IGltZy5JbWdEYXRhLndpZHRoXG4gICAgcmdiYV9hcnIuaGVpZ2h0ID0gaW1nLkltZ0RhdGEuaGVpZ2h0XG5cbiAgICByZXR1cm4gcmdiYV9hcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBhY2tDb2xvckltYWdlKHJnYmFfYXJyOiBSR0JBX0FycmF5KTogSW1hZ2VEYXRhe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBsZXQgaW1nZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEocmdiYV9hcnIud2lkdGgscmdiYV9hcnIuaGVpZ2h0KTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCByZ2JhX2Fyci5SR0JBX0xpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMF0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uUlxuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzFdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkdcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsyXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5CXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrM10gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQVxuICAgIH1cbiAgICByZXR1cm4gaW1nZGF0YVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlSW4oaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXG4gICAge1xuICAgICAgICBhbHBoYUluID0gMTtcbiAgICB9XG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxuICAgICAgICB9XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSBhbHBoYUluXG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlT3V0KGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxuICAgIHtcbiAgICAgICAgYWxwaGFJbiA9IDA7XG4gICAgfVxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gKDEgLSBhbHBoYUluKVxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEltZ0luaXQoaW1nOiBJbWdbXXxHcm91cCl7XG4gICAgbGV0IEk7XG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEkgPSBpbWdcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIEkuZ3JvdXBMaXN0W2ldLmluaXQoKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByZWxvYWRUZXh0dXJlcyhpbWc6IEltZyk6IEltZ3tcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdUZXh0dXJlKGltZzogSW1nKTogSW1ne1xuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmVzKGltZzogSW1nW118R3JvdXApOiBHcm91cHtcbiAgICBsZXQgSTtcbiAgICBsZXQgdGV4dHVyZTogSW1nW10gPSBbXVxuICAgIGxldCBUO1xuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBJID0gaW1nXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICB0ZXh0dXJlW2ldID0gRHJhd1RleHR1cmUoSS5ncm91cExpc3RbaV0pXG4gICAgfVxuICAgIFQgPSBuZXcgR3JvdXAodGV4dHVyZSlcbiAgICByZXR1cm4gVDtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsW3gwLHkwLHgxLHkxXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sbnVtOiBudW1iZXIsczogbnVtYmVyKTogQ2FudmFzR3JhZGllbnR7XG4gICAgbGV0IGZpbGwgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoeDAseTAtcyx4MSx5MS1zKVxuICAgIGZpbGwuYWRkQ29sb3JTdG9wKDAsJyNmZmYnKVxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspe1xuICAgICAgICBpZihpJTIgPT09IDEpe1xuICAgICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJyMwMDAnKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmaWxsLmFkZENvbG9yU3RvcChpL251bSwnI2ZmZicpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlsbC5hZGRDb2xvclN0b3AoMSwnI2ZmZicpXG4gICAgcmV0dXJuIGZpbGxcbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBkZWxheV9mcmFtZSwgbmFtZVN0eWxlLCBPcHRzLCBTaGFwZSwgU3R5bGUgfSBmcm9tIFwiLi4vZXpwc3lcIjtcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCwganVkZ2VTdHlsZSB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudCB9IGZyb20gXCIuLi9HcmFkaWVudC9ncmFkaWVudFwiO1xuXG5pbnRlcmZhY2UgR3JhdFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgZGVzaXR5OiBudW1iZXIgLy/lr4bpm4bluqZcbn1cblxuaW50ZXJmYWNlIEdyYXRPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaHBhZTogR3JhdFNoYXBlLFxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDBcblxuZXhwb3J0IGNsYXNzIEdyYXQgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICBwcml2YXRlIG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZ3JhdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEdyYXRPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICBpZighb3B0cy5zaGFwZS5kZXNpdHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9wdHMuc2hhcGUuZGVzaXR5ID0gMzVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIC8vIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpe1xuICAgIC8vICAgICBpZighZGVsYXkpe1xuICAgIC8vICAgICAgICAgZGVsYXkgPSA4XG4gICAgLy8gICAgICAgICBpZighc3BlZWQpXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAvLyAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgLy8gICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvLyAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFt4MCx5MCx4MSx5MV0sdGhhdC5zaGFwZS5kZXNpdHksaW5kZXgqaSk7XG4gICAgLy8gICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIHVwZGF0ZUdyYXQodGhhdCxjdHgsZmlsbClcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihpKVxuICAgIC8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKGRlbGF5KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KSgpXG4gICAgICAgIFxuICAgIC8vIH1cbiAgICBwbGF5KHNwZWVkPzogbnVtYmVyLGRlbGF5PzogbnVtYmVyKXtcbiAgICAgICAgaWYoIWRlbGF5KXtcbiAgICAgICAgICAgIGRlbGF5ID0gOFxuICAgICAgICAgICAgaWYoIXNwZWVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gOFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcignYScpXG4gICAgICAgIC8vIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHVwZGF0ZUdyYXQwKHRoYXQsY3R4LGluZGV4KmkpXG4gICAgICAgICAgICAgICAgY29uc29sZS5kaXIoaSlcbiAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZShkZWxheSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VHcmF0KGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBHcmF0e1xuICAgIGxldCBzaCA9IGdyYXQuc2hhcGU7XG4gICAgLy8gY29uc29sZS5kaXIoc2gpXG4gICAgbGV0IG51bSA9IHNoLmRlc2l0eTtcbiAgICAvLyBsZXQgZmlsbCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngtc2gucixzaC55K3NoLnIpXG4gICAgLy8gZmlsbC5hZGRDb2xvclN0b3AoMCwnd2hpdGUnKVxuICAgIC8vIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspe1xuICAgIC8vICAgICBpZihpJTIgPT09IDEpe1xuICAgIC8vICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJ2JsYWNrJylcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJ3doaXRlJylcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBmaWxsLmFkZENvbG9yU3RvcCgxLCd3aGl0ZScpXG4gICAgbGV0IGZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFtzaC54LXNoLnIsc2gueS1zaC5yLHNoLngtc2gucixzaC55KzMqc2gucl0sbnVtLDApXG4gICAgbGV0IGMgPSBjdHguY2FudmFzXG4gICAgYy5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICBncmF0LnN0eWxlLmZpbGwgPSBmaWxsXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSlcbiAgICBjdHgucmVjdChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngrc2gucixzaC55KzMqc2gucilcbiAgICBqdWRnZVN0eWxlKGdyYXQsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vIGN0eC5zYXZlKClcbiAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgLy8gY3R4LnJlY3Qoc2gueC1zaC5yLHNoLnktc2gucixzaC54K3NoLnIsc2gueSsyKnNoLnIpO1xuICAgIC8vIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpO1xuICAgIC8vIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24taW4nXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdibGFjaydcbiAgICAvLyBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICAvLyBjdHguZmlsbCgpXG4gICAgLy8gY3R4LmNsb3NlUGF0aCgpO1xuICAgIC8vIGN0eC5yZXN0b3JlKClcbiAgICBcbiAgICByZXR1cm4gZ3JhdDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlR3JhdChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELGZpbGw6IENhbnZhc0dyYWRpZW50KXtcbiAgICBncmF0LnJlbW92ZSgpXG4gICAgZ3JhdC5zdHlsZS5maWxsID0gZmlsbFxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoZ3JhdC5zaGFwZS54LGdyYXQuc2hhcGUueSxncmF0LnNoYXBlLnIsMCwyKk1hdGguUEkpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZnVuY3Rpb24gdXBkYXRlR3JhdDAoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxudW06IG51bWJlcil7XG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgudHJhbnNsYXRlKDAsLW51bSlcbiAgICBjdHgucmVjdChncmF0LnNoYXBlLngtZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueS1ncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS54K2dyYXQuc2hhcGUucixncmF0LnNoYXBlLnkrMypncmF0LnNoYXBlLnIpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG59IiwiaW1wb3J0IHtjYW52YXNTdHlsZX0gZnJvbSAnLi4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCB7IFJlY3RhbmdsZSxtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJyBcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IENpcmNsZSxtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXG5pbXBvcnQgeyBMaW5lLCBtYWtlTGluZX0gZnJvbSAnLi4vR3JhcGhpYy9saW5lJ1xuaW1wb3J0IHsgQXJjLCBtYWtlQXJjIH0gZnJvbSAnLi4vR3JhcGhpYy9hcmMnXG5pbXBvcnQgeyBFbGxpcHNlLCBtYWtlRWxsaXBzZSB9IGZyb20gJy4uL0dyYXBoaWMvZWxsaXBzZSdcbmltcG9ydCB7IG1ha2VQb2x5Z29uLCBQb2x5Z29uIH0gZnJvbSAnLi4vR3JhcGhpYy9wb2x5Z29uJ1xuaW1wb3J0IHsgbWFrZVRleHQsIFRleHQgfSBmcm9tICcuLi9HcmFwaGljL3RleHQnXG5pbXBvcnQgeyBJbWcsIG1ha2VJbWcgfSBmcm9tICcuLi9HcmFwaGljL2ltYWdlJ1xuaW1wb3J0IHsgY29udGVudFN0eWxlIH0gZnJvbSAnLi4vRGlhbG9ndWUvZGlhbG9ndWUnXG5pbXBvcnQgeyBHcmF0LCBtYWtlR3JhdCB9IGZyb20gJy4uL0dyYXBoaWMvZ3JhdGluZydcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSk6Y2FudmFzU3R5bGV7XG4gICAgaWYoIWNTdHlsZSkgXG4gICAge1xuICAgICAgICBjU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogNDAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighY1N0eWxlLndpZHRoKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLndpZHRoID0gNDAwXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuaGVpZ2h0KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmhlaWdodCA9IDQwMFxuICAgIH1cbiAgICByZXR1cm4gY1N0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VEaXZTdHlsZShkU3R5bGU6IERpdlN0eWxlKTogRGl2U3R5bGV7XG4gICAgaWYoIWRTdHlsZSkgXG4gICAge1xuICAgICAgICBkU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogNDAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAyNjAsXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzIwcHgnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWRTdHlsZS53aWR0aClcbiAgICB7XG4gICAgICAgIGRTdHlsZS53aWR0aCA9IDQwMFxuICAgIH1cbiAgICBpZighZFN0eWxlLmhlaWdodClcbiAgICB7XG4gICAgICAgIGRTdHlsZS5oZWlnaHQgPSA0MDBcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5ib3JkZXIpXG4gICAge1xuICAgICAgICBkU3R5bGUuYm9yZGVyID0gJ25vbmUnXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuYm9yZGVyUmFkaXVzKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnXG4gICAgfVxuICAgIHJldHVybiBkU3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNvbnRlbnRTdHlsZShjU3R5bGU6IGNvbnRlbnRTdHlsZSx0aXRsZTogc3RyaW5nLGNvbnRlbnQ6IHN0cmluZyk6IGNvbnRlbnRTdHlsZXtcbiAgICBpZighY1N0eWxlKVxuICAgIHtcbiAgICAgICAgY1N0eWxlID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIGJ0blN0cjogWydPSyddLFxuICAgICAgICAgICAgbm9JY29uOiBmYWxzZSxcbiAgICAgICAgICAgIG5vSW50OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpcm1Qb3NpdGlvbjogMFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFjU3R5bGUudGl0bGUpXG4gICAge1xuICAgICAgICBjU3R5bGUudGl0bGUgPSB0aXRsZVxuICAgIH1cbiAgICBpZighY1N0eWxlLmNvbnRlbnQpXG4gICAge1xuICAgICAgICBjU3R5bGUuY29udGVudCA9IGNvbnRlbnRcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5idG5TdHIpe1xuICAgICAgICBjU3R5bGUuYnRuU3RyID0gWydPSyddXG4gICAgfVxuICAgIGlmKCFjU3R5bGUubm9JY29uKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLm5vSWNvbiA9IGZhbHNlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUubm9JbnQpXG4gICAge1xuICAgICAgICBjU3R5bGUubm9JbnQgPSBmYWxzZVxuICAgIH1cbiAgICBpZighY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbilcbiAgICB7XG4gICAgICAgIGNTdHlsZS5jb25maXJtUG9zaXRpb24gPSAwO1xuICAgIH1cbiAgICBpZihjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAwICYmIGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDEgJiYgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMil7XG4gICAgICAgIGNTdHlsZS5jb25maXJtUG9zaXRpb24gPSAwXG4gICAgfVxuICAgIHJldHVybiBjU3R5bGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlTW9kZWwobW9kZWw6IHN0cmluZyk6IFtzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmdde1xuICAgIGlmKG1vZGVsID09PSAnZXJyb3InKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIlhcIiwncmVkJywnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdoZWxwJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCIhXCIsJ29yYW5nZScsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3F1ZXN0JylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCI/XCIsJ2dyZXknLFwiUXVzZXQgRGlhbG9ndWVcIiwnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnd2FybicpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnLCdXYXJuaW5nIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IHdhcm5pbmcgc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdpbnB1dCcpXG4gICAge1xuICAgICAgICByZXR1cm4gWycnLCcnLFwiSW5wdXQgRGlhbG9ndWVcIixcIlRoaXMgaXMgZGVmYXVsdCBpbnB1dCBzdHJpbmdcIl1cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3NlbGVjdCcpe1xuICAgICAgICByZXR1cm4gWycnLCcnLFwiU2VsZWN0IERpYWxvZ3VlXCIsXCJUaGlzIGlzIGRlZmF1bHQgc2VsZWN0IHN0cmluZ1wiXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnZmlsZScpe1xuICAgICAgICByZXR1cm4gWycnLCcnLCdGaWxlIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGZpbGUgc3RyaW5nJ11cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIFsn772eJywnZ3JlZW4nLCdEYWlsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBkYWlsb2d1ZSBzdHJpbmcnXVxuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGUoc3R5bGU6IFN0eWxlKXtcbi8vICAgICBpZighc3R5bGUpXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUVsZW1lbnQoZWw6IEVsZW1lbnRzfEdyb3VwLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAvLyBjb25zb2xlLmRpcihSZWN0YW5nbGUpXG4gICAgLy8gY29uc29sZS5kaXIoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBtYWtlUmVjdGFuZ2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBtYWtlQ2lyY2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbWFrZUxpbmUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIG1ha2VBcmMoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICBtYWtlRWxsaXBzZShlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbWFrZVBvbHlnb24oZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgVGV4dClcbiAgICB7XG4gICAgICAgIG1ha2VUZXh0KGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBHcmF0KVxuICAgIHtcbiAgICAgICAgbWFrZUdyYXQoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIG1ha2VJbWcoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgICAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAgICAgbGV0IGxpc3QgPSBlbC5ncm91cExpc3Q7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6ICdcIiMwMDAwMDBcIicsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5saW5lV2lkdGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDI7XG4gICAgfVxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSAnXCIjMDAwMDAwXCInXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGlmKCEoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpKXtcbiAgICAvLyAgICAgLy8gc3Quc3Ryb2tlID0gJyMwMDAnO1xuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgIC8vIGN0eC5maWxsKCk7XG4gICAgLy8gY3R4LnN0cm9rZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgICAgIGN0eC5maWxsVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlVGV4dFN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcbiAgICBsZXQgZm9udFN0cmluZyA9ICcnO1xuICAgIGlmKHN0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdCA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzdC5mb250U3R5bGUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U3R5bGUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgIT09ICdpdGFsaWMnICYmIHN0LmZvbnRTdHlsZSAhPT0gJ29ibGlxdWUnICYmIHN0LmZvbnRTdHlsZSAhPT0gXCJub3JtYWxcIil7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAnMCcpe1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzEnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSBzdC5mb250VmFyaWFudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnc21hbGwtY2FwcycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGRlcicgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2xpZ2h0ZXInKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250U2l6ZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTaXplICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U2l6ZS5pbmRleE9mKCdweCcpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgfVxuICAgIGZvbnRTdHJpbmcgPSBzdC5mb250U3R5bGUgKyAnICcgKyBzdC5mb250VmFyaWFudCArICcgJyArIHN0LmZvbnRXZWlnaHQgKyAnICcgKyBzdC5mb250U2l6ZSArICcgJyArIHN0LmZvbnRGYW1pbHk7XG4gICAgY3R4LmZvbnQgPSBmb250U3RyaW5nO1xuICAgIC8vIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XG4gICAgbGV0IHggPSAxO1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICB7XG4gICAgICAgIGVsID0gZWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcbiAgICAgICAge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RMRUZUJyB8fCBlbCA9PT0gXCJMRUZUXCIgfHwgZWwgPT09ICdMJyl7XG4gICAgICAgICAgICB4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RUT1AnIHx8IGVsID09PSBcIlRPUFwiIHx8IGVsID09PSAnVCcpe1xuICAgICAgICAgICAgeCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RSSUdIVCcgfHwgZWwgPT09IFwiUklHSFRcIiB8fCBlbCA9PT0gJ1InKXtcbiAgICAgICAgICAgIHggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUQk9UVE9NJyB8fCBlbCA9PT0gXCJCT1RUT01cIiB8fCBlbCA9PT0gJ0InKXtcbiAgICAgICAgICAgIHggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXG4gICAge1xuICAgICAgICBpZihlbDw1KVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhSXQgd2lsbCB1c2UgZGVmYXVsdCBpbnN0cnVjdGlvbiEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xuICAgIGxldCBmMCA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMCk7XG4gICAgbGV0IGYxID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUxKTtcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XG4gICAgICAgIGlmKGYxID09PSAyIHx8IGYxID09PSA0KXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHQgPSBmMTtcbiAgICAgICAgICAgIGYxID0gZjA7XG4gICAgICAgICAgICBmMCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpe1xuICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMyl7XG4gICAgICAgICAgICBmMSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtmMCxmMV1cbn0gICBcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXG4gICAgaWYoc2guc3ggPT09IHVuZGVmaW5lZCB8fCBzaC5zeSA9PT0gdW5kZWZpbmVkIHx8IHNoLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSXNJbkVsZW1lbnQoW3gseV06IFtudW1iZXIsbnVtYmVyXSxlbDogRWxlbWVudHMpOiBib29sZWFue1xuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcbiAgICAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLndpZHRoLGVsLnNoYXBlLmhlaWdodF1cbiAgICAgICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucl1cbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeC14MCwyKSArIE1hdGgucG93KHkteTAsMikpXG4gICAgICAgIGlmKHIgPD0gcjApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnhFbmQsZWwuc2hhcGUueUVuZF1cbiAgICAgICAgaWYoeDEgIT09IHgwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgeXQgPSAoeTEteTApLyh4MS14MCkgKiAoeCAtIHgwKSArIHkwXG4gICAgICAgICAgICBpZih5ID49IHl0LTE1ICYmIHkgPD0geXQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB4dCA9ICh4MS14MCkvKHkxLXkwKSAqICh5IC0geTApICsgeDBcbiAgICAgICAgICAgIGlmKHkgPj0geHQtMTUgJiYgeSA8PSB4dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscmEwLHJiMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJhLGVsLnNoYXBlLnJiXVxuICAgICAgICBsZXQgdCA9IE1hdGgucG93KHgteDAsMikvTWF0aC5wb3cocmEwLDIpICsgTWF0aC5wb3coeS15MCwyKS9NYXRoLnBvdyhyYjAsMilcbiAgICAgICAgaWYodCA8PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICB7XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBsZXQgaiA9IGkgKyAxXG4gICAgICAgIGxldCBpbmRleCA9IDBcbiAgICAgICAgbGV0IHh0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHl0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IFt4MCx5MF0gPSBbZWwuc2hhcGUueEEsZWwuc2hhcGUueUFdXG4gICAgICAgIGZvcihpID0gMDtpPGVsLnNoYXBlLnhBLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGkgPT09IGVsLnNoYXBlLnhBLmxlbmd0aC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGogPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGogPSBpICsgMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeTBbaV0gIT09IHkwW2pdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHh0W2luZGV4XSA9ICh4MFtpXS14MFtqXSkvKHkwW2ldLXkwW2pdKSAqICh5IC0geTBbaV0pICsgeDBbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgeXRbaW5kZXhdID0gKHkwW2pdLXkwW2ldKS8oeDBbal0teDBbaV0pICogKHggLSB4MFtpXSkgKyB5MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeCA9PT0geHRbaW5kZXhdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHh0W2luZGV4XSA+PSB4KXtcbiAgICAgICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5kZXglMj09PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGNcbiAgICAvLyAgICAgbGV0IGksalxuICAgIC8vICAgICBsZXQgbCA9IGVsLnNoYXBlLnlBLmxlbmd0aFxuICAgIC8vICAgICBmb3IoYyA9IGZhbHNlLGkgPSAtMSxqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSBcbiAgICAvLyAgICAgICAgICggKGVsLnNoYXBlLnlBW2ldIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2pdKSB8fCAoZWwuc2hhcGUueUFbal0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbaV0pICkgXG4gICAgLy8gICAgICAgICAmJiAoeCA8IChlbC5zaGFwZS54QVtqXSAtIGVsLnNoYXBlLnhBW2ldKSAqICh5IC0gZWwuc2hhcGUueUFbaV0pIC8gKGVsLnNoYXBlLnlBW2pdIC0gZWwuc2hhcGUueUFbaV0pICsgZWwuc2hhcGUueEFbaV0pIFxuICAgIC8vICAgICAgICAgJiYgKGMgPSAhYyk7IFxuICAgIC8vICAgICByZXR1cm4gYzsgXG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VBbmltYXRlKGVsOiBFbGVtZW50cyl7XG4gICAgbGV0IGN0eCA9IGVsLmN0eDtcbiAgICAvLyBjb25zb2xlLmRpcignYScpXG4gICAgZWwucmVtb3ZlKClcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnRyYW5zbGF0ZShlbC50cmFuc2xhdGUueCxlbC50cmFuc2xhdGUueSlcbiAgICBjdHgucm90YXRlKGVsLnJvdGF0ZSlcbiAgICBjdHguc2NhbGUoZWwuc2NhbGUud2lkdGgsZWwuc2NhbGUuaGVpZ2h0KVxuICAgIGp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxufSIsImltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSBcIi4uL0VsZW1lbnRcIjtcbmltcG9ydCB7IGp1ZGdlSXNJbkVsZW1lbnQgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIEtiV2FpdChrZXk6IG51bWJlcixmdW5jOiBGdW5jdGlvbik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiTmFtZShrZXk6IHN0cmluZ3xudW1iZXIpOm51bWJlcntcbiAgICBsZXQgcmVzO1xuXG4gICAgaWYodHlwZW9mIGtleSA9PT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICByZXMgPSBrZXkuY2hhckNvZGVBdCgwKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXMgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleSlcbiAgICB9XG4gICAgY29uc29sZS5kaXIocmVzKSBcbiAgICByZXR1cm4gcmVzXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYlByZXNzV2FpdChrZXk6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUmVsZWFzZVdhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxldCB4LHlcbiAgICAgICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWFxuICAgICAgICAgICAgICAgIHkgPSBlLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih4KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHkpXG4gICAgICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmKVxuICAgICAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG59XG5cbiIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgRGl2U3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xuICAgIGJvcmRlcj86IHN0cmluZztcbiAgICBib3JkZXJSYWRpdXM/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEaXYoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU6IERpdlN0eWxlKTogW0hUTUxFbGVtZW50LERpdlN0eWxlXXtcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkU3R5bGUgPSBlekp1ZGdlLmp1ZGdlRGl2U3R5bGUoZFN0eWxlKTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSBkU3R5bGUud2lkdGgudG9TdHJpbmcoKVxuICAgIGRpdi5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcbiAgICBkaXYuc3R5bGUuYm9yZGVyID0gZFN0eWxlLmJvcmRlclxuICAgIGRpdi5zdHlsZS5ib3JkZXJSYWRpdXMgPSBkU3R5bGUuYm9yZGVyUmFkaXVzXG4gICAgZGl2LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgIGRpdi5zdHlsZS5ib3hTaGFkb3cgPSAnMjBweCAxMHB4IDQwcHggIzg4ODg4OCdcbiAgICBkaXYuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgZGl2LnN0eWxlLnpJbmRleCA9ICcxMDAwJ1xuICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJ1xuICAgIC8vIGRpdi5zdHlsZS50b3AgPSAnMHB4J1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgZGl2LnN0eWxlLnRvcCA9ICgoaC1kU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGRpdi5zdHlsZS5sZWZ0ID0gKCh3LWRTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBkb20uYXBwZW5kKGRpdik7XG4gICAgcmV0dXJuIFtkaXYsZFN0eWxlXVxufSIsImltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCAqIGFzIGV6RGl2IGZyb20gJy4uL0Rpdi9kaXYnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUgfSBmcm9tICcuLi9UaW1lL3RpbWUnXG5cbmxldCBpZCA9IDBcblxuZXhwb3J0IGNsYXNzIERpYWxvZ3Vle1xuICAgIGlkOiBudW1iZXJcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgZG9tUGFyZW50OiBIVE1MRWxlbWVudFxuICAgIGNvblQ6IENvbnRlbnRcbiAgICBkU3R5bGU/OiBEaXZTdHlsZVxuICAgIHN0YXR1c1ZhbHVlOiBib29sZWFuICAgIC8v5oyJ6ZKu54K55Ye754q25oCBIHRydWXkuLrpgInmi6nmmK8gZmFsc2XkuLrpgInmi6nlkKbmiJblj5bmtohcbiAgICBpbnRWYWx1ZTogQXJyYXk8c3RyaW5nPlxuICAgIHNlbGVjdFZhbHVlOiBBcnJheTxzdHJpbmc+XG4gICAgZmlsZXM6IEZpbGVSZWFkZXJcbiAgICBjb25zdHJ1Y3Rvcihkb21QYXJlbnQ6IEhUTUxFbGVtZW50LGRTdHlsZT86IERpdlN0eWxlKXtcbiAgICAgICAgW3RoaXMuZG9tLHRoaXMuZFN0eWxlXSA9IGV6RGl2LmNyZWF0ZURpdihkb21QYXJlbnQsZFN0eWxlKVxuICAgICAgICBsZXQgY29uVCA9IG5ldyBDb250ZW50KHRoaXMuZG9tLHRoaXMuZFN0eWxlKVxuICAgICAgICB0aGlzLmNvblQgPSBjb25UXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICB0aGlzLmRvbVBhcmVudCA9IGRvbVBhcmVudFxuICAgICAgICB0aGlzLmludFZhbHVlID0gW11cbiAgICAgICAgdGhpcy5zZWxlY3RWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMuaWQgPSBpZCsrXG4gICAgfVxuICAgIHNob3coY29uU3R5bGU6IGNvbnRlbnRTdHlsZSl7XG4gICAgICAgIGNvblN0eWxlLnNlbGVkU3RyID0gW11cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIHRoaXMuc3RhdHVzVmFsdWUgPSBmYWxzZVxuICAgICAgICBsZXQgdG9wU3RyID0gWycyMHB4JywnNzBweCcsJzEzMHB4JywnMjEwcHgnXVxuICAgICAgICBpZighY29uU3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvblN0eWxlID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdub25lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBbY2hhcixjb2xvcix0aXRsZSxjb250ZW50XSA9IGV6SnVkZ2UuanVkZ2VNb2RlbChjb25TdHlsZS50eXBlKVxuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsdGl0bGUsY29udGVudClcbiAgICAgICAgaWYoY29uU3R5bGUubm9JY29uKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZighY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRvcFN0ciA9IFsnMjBweCcsJzkwcHgnLCcxODBweCddXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY3JlYXRlRGxnKHRoaXMsY29uU3R5bGUsdG9wU3RyLGNoYXIsY29sb3IsY29uU3R5bGUuYnRuU3RyKVxuICAgICAgICAvLyBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFswXVxuICAgICAgICBsZXQgbCA9IHRoYXQuY29uVC5jaGlsZFt0aGF0LmNvblQuY2hpbGQubGVuZ3RoIC0gMV0uY2hpbGQubGVuZ3RoO1xuICAgICAgICBsZXQgaW50ID0gbmV3IEFycmF5KClcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGlmKGNvblN0eWxlLmludFN0cilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5pbnRTdHIubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGludFtpXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNvblN0eWxlLmludFN0cltpXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWxlJylcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGw7aSsrKVxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICBsZXQgYnRuID0gdGhhdC5jb25ULmNoaWxkW3RoYXQuY29uVC5jaGlsZC5sZW5ndGggLSAxXS5jaGlsZFtpXVxuICAgICAgICAgICAgICAgIGJ0bi5kb20ub25tb3VzZWRvd24gPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnI2ZmZmZmZidcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjMDA4ODAwJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmRvbS5zdHlsZS5jb2xvciA9ICdibHVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpID09PSBjb25TdHlsZS5jb25maXJtUG9zaXRpb258fGNvblN0eWxlLmJ0blN0ci5sZW5ndGggPT09IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoY29uU3R5bGUuaW50U3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgY29uU3R5bGUuaW50U3RyLmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuaW50VmFsdWUucHVzaChjb25TdHlsZS5pbnRTdHJbdF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LmludFZhbHVlLnB1c2goaW50W3RdLnZhbHVlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCBjb25TdHlsZS5zZWxlZFN0ci5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnNlbGVkU3RyW3RdICE9PSB1bmRlZmluZWQgJiYgY29uU3R5bGUuc2VsZWRTdHJbdF0gIT09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdC5zZWxlY3RWYWx1ZS5wdXNoKGNvblN0eWxlLnNlbGVkU3RyW3RdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihjb25TdHlsZS50eXBlID09PSAnZmlsZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsZXQgZiA9IGZpbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVfUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZV9SZWFkZXIub25sb2FkID0gcmVzdWx0ID0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmYyA9IGZpbGVfUmVhZGVyLnJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihmYylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGZjKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZmlsZV9SZWFkZXIucmVhZEFzRGF0YVVSTCgoPEhUTUxJbnB1dEVsZW1lbnQ+ZmlsZSkuZmlsZXNbMF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBmaWxlX1JlYWRlci5yZWFkQXNUZXh0KCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVfUmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKCg8SFRNTElucHV0RWxlbWVudD5maWxlKS5maWxlc1swXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQuZmlsZXMgPSBmaWxlX1JlYWRlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnN0YXR1c1ZhbHVlID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMTApXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhhdC5zdGF0dXNWYWx1ZSlcbiAgICAgICAgICAgICAgICAgICAgfSkoKVxuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICB9ICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgc2V0RGxnU3R5bGUoZFN0eWxlOiBEaXZTdHlsZSl7XG4gICAgICAgIGRTdHlsZSA9IGV6SnVkZ2UuanVkZ2VEaXZTdHlsZShkU3R5bGUpXG4gICAgICAgIGxldCBkb21TID0gdGhpcy5kb20uc3R5bGVcbiAgICAgICAgZG9tUy53aWR0aCA9IGRTdHlsZS53aWR0aC50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBkb21TLmhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgZG9tUy5ib3JkZXIgPSBkU3R5bGUuYm9yZGVyXG4gICAgICAgIGRvbVMuYm9yZGVyUmFkaXVzID0gZFN0eWxlLmJvcmRlclJhZGl1c1xuICAgIH1cbiAgICBpbnB1dGRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdJbnB1dCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBpbnB1dCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdpbnB1dCdcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvdyhjb25TdHlsZSkvKi50aGVuKCkqL1xuICAgIH1cbiAgICBsaXN0ZGxnKGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ1NlbGVjdCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnc2VsZWN0J1xuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICBlcnJvcmRsZyhjb25TdHlsZTogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdlcnJvcidcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIGhlbHBkbGcoY29uU3R5bGU/OiBjb250ZW50U3R5bGUpe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUudHlwZSA9ICdoZWxwJ1xuICAgICAgICBjb25TdHlsZS5ub1NlbCA9IHRydWVcbiAgICAgICAgY29uU3R5bGUubm9JbnQgPSB0cnVlXG4gICAgICAgIHRoaXMuc2hvdyhjb25TdHlsZSlcbiAgICB9XG4gICAgbXNnYm94KGNvblN0eWxlPzogY29udGVudFN0eWxlLG1vZGVsPzogc3RyaW5nKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJylcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHF1ZXN0ZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgICAgICBjb25TdHlsZSA9IGV6SnVkZ2UuanVkZ2VDb250ZW50U3R5bGUoY29uU3R5bGUsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAncXVlc3QnXG4gICAgICAgIGNvblN0eWxlLm5vU2VsID0gdHJ1ZVxuICAgICAgICBjb25TdHlsZS5ub0ludCA9IHRydWVcbiAgICAgICAgdGhpcy5zaG93KGNvblN0eWxlKVxuICAgIH1cbiAgICB3YXJuZGxnKGNvblN0eWxlPzogY29udGVudFN0eWxlKXtcbiAgICAgICAgY29uU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ29udGVudFN0eWxlKGNvblN0eWxlLCdXYXJuaW5nIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IHdhcm5pbmcgc3RyaW5nIScpXG4gICAgICAgIGNvblN0eWxlLnR5cGUgPSAnd2FybidcbiAgICAgICAgY29uU3R5bGUubm9TZWwgPSB0cnVlXG4gICAgICAgIGNvblN0eWxlLm5vSW50ID0gdHJ1ZVxuICAgICAgICB0aGlzLnNob3coY29uU3R5bGUpXG4gICAgfVxuICAgIHJlbW92ZSgpe1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgICAgIGxldCBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgICAgICAgICAgICB0aGF0LmRvbS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgICAgICAgICBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoYXQuY29uVC5jaGlsZCA9IFtdXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0aGF0KVxuICAgICAgICAgICAgLy8gdGhhdC5kb20ucmVtb3ZlKClcbiAgICAgICAgICAgIHRoYXQuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJ1xuICAgICAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgY29udGVudFN0eWxle1xuICAgIC8v5LyY5YWI57qnOiDovpPlhaXmoYYgPiDpgInmi6nmoYYgPiDlhbbku5ZcbiAgICB0eXBlPzogc3RyaW5nICAgICAgICAgICAvL+Wvueivneexu+Wei1xuICAgIHRpdGxlPzogc3RyaW5nICAgICAgICAgIC8v5a+56K+d5qCH6aKYXG4gICAgY29udGVudD86IHN0cmluZyAgICAgICAgLy/lr7nor53mj5DnpLrlhoXlrrlcbiAgICBpbWc/OiBzdHJpbmcgICAgICAgICAgICAvL+iHquWumuS5ieWbvueJh1xuICAgIGJ0blN0cj86IEFycmF5PHN0cmluZz4gIC8v5oyJ6ZKu5a2X56ymXG4gICAgaW50U3RyPzogQXJyYXk8c3RyaW5nPiAgLy/ovpPlhaXmoYbmj5DnpLpcbiAgICBzZWxTdHI/OiBBcnJheTxzdHJpbmc+ICAgLy/pgInmi6nmoYblhoXlrrlcbiAgICBzZWxlZFN0cj86IEFycmF5PHN0cmluZz4gLy/lt7LpgInmi6nlhoXlrrlcbiAgICBub0ljb24/OiBib29sZWFuICAgICAgICAvL+iuvue9ruaYr+WQpuacieWbvuagh1xuICAgIG5vSW50PzogYm9vbGVhbiAgICAgICAgIC8v6K6+572u5piv5ZCm5pyJ6L6T5YWl5qGGXG4gICAgbm9TZWw/OiBib29sZWFuICAgICAgICAgLy/orr7nva7mmK/lkKbmnInpgInmi6nmoYZcbiAgICBjb25maXJtUG9zaXRpb24/OiBudW1iZXIvL+iuvue9ruehruiupOmUrueahOS9jee9ru+8jOm7mOiupOS4ujDljbPku47lt6blvoDlj7PnmoTnrKzkuIDkuKpcbiAgICBJc011bHRpcGxlPzogc3RyaW5nICAgICAvL+aYr+WQpuWkmumAiVxufVxuXG5jbGFzcyBDb250ZW50e1xuICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICBwYXJlbnQ6IENvbnRlbnRcbiAgICBjaGlsZDogQXJyYXk8Q29udGVudD5cbiAgICBkU3R5bGU6IERpdlN0eWxlXG4gICAgY29uc3RydWN0b3IoY29uVDogQ29udGVudHxIVE1MRWxlbWVudCxkU3R5bGU6IERpdlN0eWxlKXtcbiAgICAgICAgbGV0IGNoaWxkID0gbmV3IEFycmF5KClcbiAgICAgICAgdGhpcy5jaGlsZCA9IGNoaWxkXG4gICAgICAgIGlmKGNvblQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQgPSB1bmRlZmluZWRcbiAgICAgICAgICAgIHRoaXMuZG9tID0gY29uVFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmRvbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS53aWR0aCA9IGRTdHlsZS53aWR0aC50b1N0cmluZygpXG4gICAgICAgICAgICB0aGlzLmRvbS5zdHlsZS5oZWlnaHQgPSBkU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKClcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgICAgICAgICAgdGhpcy5kb20uc3R5bGUubGluZUhlaWdodCA9IGRTdHlsZS5oZWlnaHQudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgICAgIHRoaXMuZG9tLnN0eWxlLnRleHRBbGlnbiA9ICdjZW50ZXInXG4gICAgICAgICAgICB0aGlzLnBhcmVudCA9IGNvblRcbiAgICAgICAgICAgIGNvblQuY2hpbGQucHVzaCh0aGlzKVxuICAgICAgICAgICAgLy8gLy8gbGV0IGggPSB0aGlzLmRvbVBhcmVudC5jbGllbnRIZWlnaHQgXG4gICAgICAgICAgICAvLyB0aGlzLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJ2JsYWNrJ1xuICAgICAgICAgICAgY29uVC5kb20uYXBwZW5kKHRoaXMuZG9tKVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERsZ0luaXQoZG9tOiBIVE1MRWxlbWVudCxkU3R5bGU/OiBEaXZTdHlsZSkge1xuICAgIGxldCBkbGcgPSBuZXcgRGlhbG9ndWUoZG9tLGRTdHlsZSk7XG4gICAgcmV0dXJuIGRsZztcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IEFycmF5PHN0cmluZz4saW1nU3RyPzogc3RyaW5nLGltZ0NvbG9yPzogc3RyaW5nLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgIC8vIGNvbnNvbGUuZGlyKGRsZylcbiAgICBkbGcuZG9tLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSdcbiAgICBjcmVhdGVEbGdUaXRsZShkbGcsY29uU3R5bGUsdG9wWzBdKVxuICAgIGNyZWF0ZURsZ0NvbnRlbnQoZGxnLGNvblN0eWxlLHRvcFsxXSlcbiAgICBpZih0b3AubGVuZ3RoID09PSA0KVxuICAgIHtcbiAgICAgICAgY3JlYXRlRGxnSW1nRGl2KGRsZyxjb25TdHlsZSx0b3BbMl0saW1nU3RyLGltZ0NvbG9yKVxuICAgICAgICBjcmVhdGVEbGdCdG5EaXYoZGxnLGNvblN0eWxlLHRvcFszXSxzdHIpXG4gICAgfVxuICAgIGVsc2UgaWYodG9wLmxlbmd0aCA9PT0gMylcbiAgICB7XG4gICAgICAgIGNyZWF0ZURsZ0J0bkRpdihkbGcsY29uU3R5bGUsdG9wWzJdLHN0cilcbiAgICB9XG4gICAgXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ1RpdGxlKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyl7XG4gICAgbGV0IHRpdGxlU3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuICAgICAgICBoZWlnaHQ6IDUwXG4gICAgfVxuICAgIGxldCB0aXRsZSA9IG5ldyBDb250ZW50KGRsZy5jb25ULHRpdGxlU3R5bGUpXG4gICAgLy8gY29uc29sZS5kaXIodGl0bGUpXG4gICAgdGl0bGUuZG9tLmlubmVyVGV4dCA9IGNvblN0eWxlLnRpdGxlXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRTaXplID0gJzI2cHgnXG4gICAgdGl0bGUuZG9tLnN0eWxlLmZvbnRXZWlnaHQgPSAnYm9sZCdcbiAgICB0aXRsZS5kb20uc3R5bGUudG9wID0gdG9wXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0NvbnRlbnQoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nKXtcbiAgICBsZXQgY29udGVudFN0eWxlID0ge1xuICAgICAgICB3aWR0aDogZGxnLmRTdHlsZS53aWR0aCxcbiAgICAgICAgaGVpZ2h0OiA1MFxuICAgIH1cbiAgICBsZXQgY29udGVudCA9IG5ldyBDb250ZW50KGRsZy5jb25ULGNvbnRlbnRTdHlsZSlcbiAgICBjb250ZW50LmRvbS5pbm5lclRleHQgPSBjb25TdHlsZS5jb250ZW50XG4gICAgY29udGVudC5kb20uc3R5bGUuZm9udFNpemUgPSAnMjBweCdcbiAgICBjb250ZW50LmRvbS5zdHlsZS50b3AgPSB0b3Bcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW1nRGl2KGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxzdHI6IHN0cmluZyxjb2xvcjogc3RyaW5nKVxue1xuICAgIGxldCBpbWdEaXZTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGltZ0RpdiA9IG5ldyBDb250ZW50KGRsZy5jb25ULGltZ0RpdlN0eWxlKVxuICAgIGltZ0Rpdi5kb20uc3R5bGUudG9wID0gdG9wXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgaW1nRGl2LmRvbS5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdjZW50ZXInXG4gICAgaWYoIWNvblN0eWxlLmludFN0ciB8fCBjb25TdHlsZS5ub0ludCB8fCBjb25TdHlsZS50eXBlICE9PSBcImlucHV0XCIpXG4gICAge1xuICAgICAgICBkbGcuZG9tLnN0eWxlLmhlaWdodCA9IGRsZy5kU3R5bGUuaGVpZ2h0LnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGlmKCFjb25TdHlsZS5zZWxTdHJ8fGNvblN0eWxlLm5vU2VsKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZighY29uU3R5bGUuaW1nKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGNvblN0eWxlLnR5cGUgPT09ICdmaWxlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNyZWF0ZURsZ0ZpbGUoaW1nRGl2LGRsZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgY3JlYXRlRGxnSW1nKGltZ0RpdixzdHIsY29sb3IpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBjcmVhdGVEbGdJbWcwKGltZ0Rpdixjb25TdHlsZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3JlYXRlRGxnU2VsZWN0KGltZ0Rpdixjb25TdHlsZSlcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICAvLyBjb25zb2xlLmRpcihjb25TdHlsZSlcbiAgICAgICAgaW1nRGl2LmRvbS5zdHlsZS5oZWlnaHQgPSAoaW1nRGl2U3R5bGUuaGVpZ2h0ICogY29uU3R5bGUuaW50U3RyLmxlbmd0aCkudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgaW1nRGl2LmRvbS5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbidcbiAgICAgICAgZGxnLmRvbS5zdHlsZS5oZWlnaHQgPSAocGFyc2VJbnQoZGxnLmRvbS5zdHlsZS5oZWlnaHQpICsgaW1nRGl2U3R5bGUuaGVpZ2h0ICogKGNvblN0eWxlLmludFN0ci5sZW5ndGgtMSkpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGNvblN0eWxlKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBjb25TdHlsZS5pbnRTdHIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgY3JlYXRlRGxnSW50RGl2KGltZ0Rpdixjb25TdHlsZS5pbnRTdHJbaV0pXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ludERpdihpbWdEaXY6IENvbnRlbnQsaW50U3RyOiBzdHJpbmcpXG57XG4gICAgbGV0IGludERpdlN0eWxlID0ge1xuICAgICAgICB3aWR0aDogcGFyc2VJbnQoaW1nRGl2LmRvbS5zdHlsZS53aWR0aCksXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGludERpdiA9IG5ldyBDb250ZW50KGltZ0RpdixpbnREaXZTdHlsZSlcbiAgICBpbnREaXYuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGludERpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuICAgIGludERpdi5kb20uc3R5bGUuanVzdGlmeUNvbnRlbnQgPSAnaW5oZXJpdCdcbiAgICBjcmVhdGVEbGdJbnQoaW50RGl2LGludFN0cik7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZyhpbWdEaXY6IENvbnRlbnQsc3RyOiBzdHJpbmcsY29sb3I6IHN0cmluZyl7XG4gICAgbGV0IGltZ1N0eWxlID0ge1xuICAgICAgICB3aWR0aDogNjAsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGltZyA9IG5ldyBDb250ZW50KGltZ0RpdixpbWdTdHlsZSlcbiAgICBpbWcuZG9tLmlkID0gJ2ltZydcbiAgICBpbWcuZG9tLmlubmVyVGV4dCA9IHN0clxuICAgIGltZy5kb20uc3R5bGUuZm9udFNpemUgPSAnNTRweCdcbiAgICBpbWcuZG9tLnN0eWxlLmNvbG9yID0gJ3doaXRlJ1xuICAgIGltZy5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgLy8gaW1nLmRvbS5zdHlsZS5ib3JkZXIgPSAnNXB4IHNvbGlkIHJlZCdcbiAgICBpbWcuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZURsZ0ltZzAoaW1nRGl2OiBDb250ZW50LGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgIGxldCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgIGltZy53aWR0aCA9IDYwXG4gICAgaW1nLmhlaWdodCA9IDYwXG4gICAgaW1nLnNyYyA9IGNvblN0eWxlLmltZ1xuICAgIGltZ0Rpdi5kb20uYXBwZW5kKGltZylcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnSW50KGltZ0RpdjogQ29udGVudCxpbnRTdHI6IHN0cmluZylcbntcbiAgICBsZXQga2V5U3R5bGUgPSB7XG4gICAgICAgIHdpZHRoOiAxMDAsXG4gICAgICAgIGhlaWdodDogNjBcbiAgICB9XG4gICAgbGV0IGtleSA9IG5ldyBDb250ZW50KGltZ0RpdixrZXlTdHlsZSlcbiAgICBrZXkuZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgIGtleS5kb20uc3R5bGUuZm9udFNpemUgPSAnMjBweCdcbiAgICBrZXkuZG9tLmlubmVySFRNTCA9IGludFN0ciArICc6J1xuICAgIGxldCBpbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgaW50LmlkID0gaW50U3RyXG4gICAgaW50LnN0eWxlLndpZHRoID0gJzIwMHB4J1xuICAgIGludC5zdHlsZS5oZWlnaHQgPSAnNDBweCdcbiAgICBpbnQuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXG4gICAgaW50LnN0eWxlLm1hcmdpblRvcCA9ICcxMHB4J1xuICAgIGltZ0Rpdi5kb20uYXBwZW5kKGludClcbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnRmlsZShpbWdEaXY6IENvbnRlbnQsZGxnOiBEaWFsb2d1ZSl7XG4gICAgbGV0IGZpbGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgLy8gZmlsZS5kaXNhYmxlZCA9IHRydWVcbiAgICBmaWxlLnR5cGUgPSAnZmlsZSdcbiAgICBmaWxlLmlkID0gJ2ZpbGUnXG4gICAgZmlsZS5zdHlsZS53aWR0aCA9ICcxNjBweCdcbiAgICBmaWxlLnN0eWxlLmxpbmVIZWlnaHQgPSAnNjBweCdcbiAgICBpbWdEaXYuZG9tLmFwcGVuZChmaWxlKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdTZWxlY3QoaW1nRGl2OiBDb250ZW50LGNvblN0eWxlOiBjb250ZW50U3R5bGUpe1xuICAgIGxldCBzZWxlY3RTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH1cbiAgICBsZXQgaW5kZXggPSBmYWxzZVxuICAgIGxldCBpbmRleDAgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBpbmRleDEgPSBmYWxzZVxuICAgIGxldCBjb3VudCA9IDBcbiAgICBsZXQgc2VsZWN0U3RyID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IFN0ciA9ICcnO1xuICAgIGxldCBjb2xvciA9ICcjMzc3MWUwJ1xuICAgIGxldCBjb2xvcjAgPSAnI2ZmZmZmZidcbiAgICBsZXQgc2VsZWN0ID0gbmV3IENvbnRlbnQoaW1nRGl2LHNlbGVjdFN0eWxlKVxuICAgIHNlbGVjdC5kb20uc3R5bGUuYm9yZGVyID0gJzFweCBzb2xpZCdcbiAgICBzZWxlY3QuZG9tLnN0eWxlLmJvcmRlclJhZGl1cyA9ICcxNXB4J1xuICAgIHNlbGVjdC5kb20uc3R5bGUubWFyZ2luVG9wID0gJzEycHgnXG4gICAgc2VsZWN0LmRvbS5zdHlsZS56SW5kZXggPSAnMjAyMCdcbiAgICBsZXQgc2VsZWN0VGV4dCA9IG5ldyBDb250ZW50KHNlbGVjdCx7XG4gICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgIGhlaWdodDogMzZcbiAgICB9KVxuICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9ICflsZXlvIDpgInmi6knXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIwMTAnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gJzAnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudHJhbnNpdGlvbiA9ICd0b3AgMC44cyBsaW5lYXInXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgIGxldCAgc2VsZWN0RGl2ID0gbmV3IENvbnRlbnQoc2VsZWN0LHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNlxuICAgIH0pXG4gICAgLy8gc2VsZWN0RGl2LmRvbS5zdHlsZS5ib3JkZXIgPSAnMXB4IHNvbGlkJ1xuICAgIHNlbGVjdERpdi5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICM4ODg4ODgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSBcIjIwMDBcIlxuICAgIC8vIHNlbGVjdERpdi5kb20uc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjhzIGxpbmVhcidcbiAgICBzZWxlY3REaXYuZG9tLnN0eWxlLnRvcCA9ICcwcHgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5vcGFjaXR5ID0gJzAnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnXG4gICAgc2VsZWN0RGl2LmRvbS5zdHlsZS5mbGV4RGlyZWN0aW9uID0gJ2NvbHVtbidcbiAgICBsZXQgc2VsZWN0Q29udGVudCA9IG5ldyBBcnJheSgpXG4gICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldID0gbmV3IENvbnRlbnQoc2VsZWN0RGl2LHtcbiAgICAgICAgICAgIHdpZHRoOiAyMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpXG4gICAgICAgIH0pXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLmlubmVyVGV4dCA9IGNvblN0eWxlLnNlbFN0cltpXVxuICAgICAgICBpZihpID09PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCAxNXB4IDBweCAwcHgnXG4gICAgICAgIH1cbiAgICAgICAgLy8gc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJ1xuICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS50cmFuc2l0aW9uID0gJ2FsbCAwLjhzIGxpbmVhcidcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIiBcbiAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgIH1cbiAgICBsZXQgc2VsZWN0QWxsID0gbmV3IENvbnRlbnQoc2VsZWN0RGl2LHtcbiAgICAgICAgd2lkdGg6IDIwMCxcbiAgICAgICAgaGVpZ2h0OiAzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKVxuICAgIH0pXG4gICAgc2VsZWN0QWxsLmRvbS5pbm5lclRleHQgPSAnc2VsZWN0QWxsJ1xuICAgIC8vIHNlbGVjdEFsbC5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzE1cHgnXG4gICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLnRyYW5zaXRpb24gPSAnYWxsIDAuOHMgbGluZWFyJ1xuICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKSArIFwicHhcIiBcbiAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICBpZighY29uU3R5bGUuSXNNdWx0aXBsZSlcbiAgICB7XG4gICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSAnZ3JleSdcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZighaW5kZXgwW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyWzBdID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCBjb25TdHlsZS5zZWxTdHIubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodCAhPT0gaSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W3RdLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFt0XS5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4MFt0XSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW5kZXgwW2ldID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbMF0gPSAnJ1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgwW2ldID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgICAgICAgICBpZighaW5kZXgwW2ldKVxuICAgICAgICAgICAgICAgIHsgICBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSB0cnVlXG4gICAgICAgICAgICAgICAgICAgIGNvdW50KytcbiAgICAgICAgICAgICAgICAgICAgaWYoY291bnQgPT09IGNvblN0eWxlLnNlbFN0ci5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmNvbG9yID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIH0gIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RTdHJbaV0gPSAnJ1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmNvbG9yID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgPSBjb2xvclxuICAgICAgICAgICAgICAgICAgICBpbmRleDEgPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBpbmRleDBbaV0gPSBmYWxzZVxuICAgICAgICAgICAgICAgICAgICBjb3VudC0tXG4gICAgICAgICAgICAgICAgfSAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0QWxsLmRvbS5vbmNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgICBpZighaW5kZXgxKXtcbiAgICAgICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgICAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuY29sb3IgID0gY29sb3IwXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgY29uU3R5bGUuc2VsU3RyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuY29sb3IgPSBjb2xvcjBcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0U3RyW2ldID0gY29uU3R5bGUuc2VsU3RyW2ldXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ID0gY29uU3R5bGUuc2VsU3RyLmxlbmd0aFxuICAgICAgICAgICAgICAgIGluZGV4MSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3IwXG4gICAgICAgICAgICAgICAgc2VsZWN0QWxsLmRvbS5zdHlsZS5jb2xvciAgPSBjb2xvclxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0Q29udGVudFtpXS5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdFN0cltpXSA9ICcnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNvdW50ID0gMFxuICAgICAgICAgICAgICAgIGluZGV4MSA9IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25tb3VzZWRvd24gPSBlID0+e1xuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gY29sb3JcbiAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuY29sb3IgPSBjb2xvcjBcbiAgICB9XG4gICAgc2VsZWN0VGV4dC5kb20ub25tb3VzZXVwID0gZSA9PntcbiAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuYmFja2dyb3VuZCA9IGNvbG9yMFxuICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5jb2xvciA9IGNvbG9yXG4gICAgfVxuICAgIHNlbGVjdFRleHQuZG9tLm9uY2xpY2sgPSBlID0+IHtcbiAgICAgICAgaWYoIWluZGV4KVxuICAgICAgICB7XG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLm9wYWNpdHkgPSAnMSdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuekluZGV4ID0gJzIxMDAnXG4gICAgICAgICAgICBzZWxlY3REaXYuZG9tLnN0eWxlLmhlaWdodCA9ICgzNiAqIChjb25TdHlsZS5zZWxTdHIubGVuZ3RoICsgMikpLnRvU3RyaW5nKClcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUudG9wID0gKCgtMzYpICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAxKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUudG9wID0gKDM2ICogKGNvblN0eWxlLnNlbFN0ci5sZW5ndGggKyAxKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIxMDEnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMHB4IDBweCAxNXB4IDE1cHgnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5pbm5lclRleHQgPSAnQ29uZmlybSdcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmhlaWdodCA9ICczNidcbiAgICAgICAgICAgICAgICBzZWxlY3RDb250ZW50W2ldLmRvbS5zdHlsZS5saW5lSGVpZ2h0ID0gJzM2cHgnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmhlaWdodCA9ICczNidcbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUubGluZUhlaWdodCA9ICczNnB4J1xuICAgICAgICAgICAgaW5kZXggPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUub3BhY2l0eSA9ICcwJ1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS56SW5kZXggPSAnMjAwMCdcbiAgICAgICAgICAgIHNlbGVjdERpdi5kb20uc3R5bGUuaGVpZ2h0ID0gJzM2J1xuICAgICAgICAgICAgc2VsZWN0RGl2LmRvbS5zdHlsZS50b3AgPSAnMCdcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGNvblN0eWxlLnNlbFN0ci5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmhlaWdodCA9ICgzNi8oY29uU3R5bGUuc2VsU3RyLmxlbmd0aCsyKSkudG9TdHJpbmcoKVxuICAgICAgICAgICAgICAgIHNlbGVjdENvbnRlbnRbaV0uZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKCkgKyBcInB4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdEFsbC5kb20uc3R5bGUuaGVpZ2h0ID0gKDM2Lyhjb25TdHlsZS5zZWxTdHIubGVuZ3RoKzIpKS50b1N0cmluZygpXG4gICAgICAgICAgICBzZWxlY3RBbGwuZG9tLnN0eWxlLmxpbmVIZWlnaHQgPSAoMzYvKGNvblN0eWxlLnNlbFN0ci5sZW5ndGgrMikpLnRvU3RyaW5nKCkgKyBcInB4XCJcbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLnN0eWxlLnRvcCA9ICcwJ1xuICAgICAgICAgICAgc2VsZWN0VGV4dC5kb20uc3R5bGUuekluZGV4ID0gJzIwMTAnXG4gICAgICAgICAgICBzZWxlY3RUZXh0LmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTVweCdcbiAgICAgICAgICAgIFN0ciA9ICcnXG4gICAgICAgICAgICBjb25TdHlsZS5zZWxlZFN0ciA9IHNlbGVjdFN0clxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc2VsZWN0U3RyLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0U3RyW2ldIT09dW5kZWZpbmVkJiZzZWxlY3RTdHJbaV0hPT0nJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN0ciArPSBzZWxlY3RTdHJbaV0gKyAnLCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTdHIgPSBTdHIuc3Vic3RyaW5nKDAsU3RyLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICBTdHIgPSBjdXRTdHJpbmcoU3RyLDIwKVxuICAgICAgICAgICAgaWYoU3RyID09PSAnJ3x8U3RyID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgU3RyID0gJ+WxleW8gOmAieaLqSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGVjdFRleHQuZG9tLmlubmVyVGV4dCA9IFN0clxuICAgICAgICAgICAgaW5kZXggPSBmYWxzZVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVEbGdCdG5EaXYoZGxnOiBEaWFsb2d1ZSxjb25TdHlsZTogY29udGVudFN0eWxlLHRvcDogc3RyaW5nLHN0cj86IEFycmF5PHN0cmluZz4pe1xuICAgIGxldCBCdG5EaXZTdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IGRsZy5kU3R5bGUud2lkdGgsXG4gICAgICAgIGhlaWdodDogMzVcbiAgICB9XG4gICAgbGV0IEJ0bkRpdiA9IG5ldyBDb250ZW50KGRsZy5jb25ULEJ0bkRpdlN0eWxlKVxuICAgIGxldCBjb2xvciA9ICcjMDBkODAwJ1xuICAgIGlmKGNvblN0eWxlLmludFN0ciYmIWNvblN0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgdG9wID0gKHBhcnNlSW50KHRvcCkgKyA2MCooY29uU3R5bGUuaW50U3RyLmxlbmd0aC0xKSkudG9TdHJpbmcoKSArICdweCdcbiAgICB9XG4gICAgQnRuRGl2LmRvbS5zdHlsZS50b3AgPSB0b3BcbiAgICBCdG5EaXYuZG9tLnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcbiAgICBpZighc3RyKVxuICAgIHtcbiAgICAgICAgc3RyID0gWydPSyddXG4gICAgfVxuICAgIGlmKHN0ci5sZW5ndGggPT09IDEpXG4gICAge1xuICAgICAgICBCdG5EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcbiAgICAgICAgY3JlYXRlRGxnQnRuKEJ0bkRpdixzdHJbMF0sMTIwLGNvbG9yKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBCdG5EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ3NwYWNlLWV2ZW5seSdcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc3RyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGkgIT09IDApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY29sb3IgPSAnI2RjZGNkYydcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNyZWF0ZURsZ0J0bihCdG5EaXYsc3RyW2ldLDEwMCxjb2xvcilcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRGxnQnRuKEJ0bkRpdjogQ29udGVudCxzdHI6IHN0cmluZyx3aWR0aDogbnVtYmVyLGNvbG9yOiBzdHJpbmcpe1xuICAgIGxldCBidG5TdHlsZSA9IHtcbiAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICBoZWlnaHQ6IDM1XG4gICAgfVxuICAgIGxldCBidG4gPSBuZXcgQ29udGVudChCdG5EaXYsYnRuU3R5bGUpXG4gICAgYnRuLmRvbS5jbGFzc05hbWUgPSBcIkJ1dHRvblwiXG4gICAgYnRuLmRvbS5zdHlsZS5wb3NpdGlvbiA9ICdyZWxhdGl2ZSdcbiAgICBidG4uZG9tLnN0eWxlLmJhY2tncm91bmQgPSBjb2xvclxuICAgIGJ0bi5kb20uc3R5bGUuY29sb3IgPSAnd2hpdGUnXG4gICAgYnRuLmRvbS5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnMTRweCdcbiAgICBidG4uZG9tLnN0eWxlLmJveFNoYWRvdyA9ICcycHggMnB4IDIwcHggIzg4ODg4OCdcbiAgICBidG4uZG9tLmlubmVySFRNTCA9IHN0clxuICAgIGJ0bi5kb20uc3R5bGUuZm9udFNpemUgPSAnMjJweCdcbn1cblxuZnVuY3Rpb24gY3V0U3RyaW5nKHN0cjogc3RyaW5nLGxlbjogbnVtYmVyKTogc3RyaW5ne1xuICAgIGxldCBzXG4gICAgbGV0IHMwLHMxXG4gICAgbGV0IHNhcnIgPSBzdHIuc3BsaXQoJywnKVxuICAgIGxldCBsID0gc2Fyci5sZW5ndGhcbiAgICBpZihzdHIubGVuZ3RoIDw9IGxlbilcbiAgICB7XG4gICAgICAgIHJldHVybiBzdHJcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgXG4gICAgICAgIGlmKChzYXJyWzBdLmxlbmd0aCArIHNhcnJbMV0ubGVuZ3RoKSA+PSAobGVuLzIpLTIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHMwID0gc3RyLnN1YnN0cmluZygwLChsZW4vMikpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHMwID0gc2FyclswXSArICcsJyArIHNhcnJbMV0gKyAnLCdcbiAgICAgICAgfVxuICAgICAgICBpZigoc2FycltsLTFdLmxlbmd0aCArIHNhcnJbbC0yXS5sZW5ndGgpID49IChsZW4vMiktMilcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoc2FycltsLTJdLmxlbmd0aCA+PSAobGVuLzIpLTIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc2FycltsLTFdLmxlbmd0aCA+PSAobGVuLzIpLTIpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzMSA9IHNhcnJbbC0xXS5zdWJzdHJpbmcoMCwobGVuLzIpLTIpICsgJy4uJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzMSA9IHNhcnJbbC0xXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgczEgPSBzYXJyW2wtMl0gKyAnLCcgKyBzYXJyW2wtMV0uc3Vic3RyaW5nKDAsKGxlbi8yKS0yLXNhcnJbbC0yXS5sZW5ndGgpICsgJy4uJ1xuICAgICAgICAgICAgfSAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzMSA9IHNhcnJbbC0yXSArICcsJyArIHNhcnJbbC0xXVxuICAgICAgICB9XG4gICAgICAgIC8vIHMxID0gc3RyLnN1YnN0cmluZyhzdHIubGVuZ3RoLTgsc3RyLmxlbmd0aClcbiAgICAgICAgcyA9IHMwICsgJy4uLi4nICsgJywnICsgczE7XG4gICAgICAgIHJldHVybiBzXG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiBjcmVhdGVEbGdDb25maXJtKGRsZzogRGlhbG9ndWUsY29uU3R5bGU6IGNvbnRlbnRTdHlsZSx0b3A6IHN0cmluZyxJc05lZWRTdGF0dXM6IGJvb2xlYW4pe1xuLy8gICAgIGxldCBjb25maXJtRGl2U3R5bGUgPSB7XG4vLyAgICAgICAgIHdpZHRoOiBkbGcuZFN0eWxlLndpZHRoLFxuLy8gICAgICAgICBoZWlnaHQ6IDM1XG4vLyAgICAgfVxuLy8gICAgIGxldCBjb25maXJtRGl2ID0gbmV3IENvbnRlbnQoZGxnLmRvbSxjb25maXJtRGl2U3R5bGUpXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUudG9wID0gdG9wXG4vLyAgICAgY29uZmlybURpdi5kb20uc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuLy8gICAgIGNvbmZpcm1EaXYuZG9tLnN0eWxlLmp1c3RpZnlDb250ZW50ID0gJ2NlbnRlcidcbi8vICAgICBsZXQgY29uZmlybVN0eWxlID0ge1xuLy8gICAgICAgICB3aWR0aDogMTIwLFxuLy8gICAgICAgICBoZWlnaHQ6IDM1XG4vLyAgICAgfVxuLy8gICAgIGxldCBjb25maXJtID0gbmV3IENvbnRlbnQoY29uZmlybURpdi5kb20sY29uZmlybVN0eWxlKVxuLy8gICAgIGNvbmZpcm0uZG9tLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYm9yZGVyUmFkaXVzID0gJzEwcHgnXG4vLyAgICAgY29uZmlybS5kb20uc3R5bGUuYm94U2hhZG93ID0gJzJweCAycHggMjBweCAjODg4ODg4J1xuLy8gICAgIGNvbmZpcm0uZG9tLmlubmVyVGV4dCA9ICdPSydcbi8vICAgICBjb25maXJtLmRvbS5zdHlsZS5mb250U2l6ZSA9ICcyMnB4J1xuLy8gICAgIGNvbmZpcm0uZG9tLm9ubW91c2Vkb3duID0gZnVuY3Rpb24oKXtcbi8vICAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5iYWNrZ3JvdW5kID0gJyNlZWVlZWUnXG4vLyAgICAgICAgICAgICBjb25maXJtLmRvbS5zdHlsZS5ib3hTaGFkb3cgPSAnMnB4IDJweCAyMHB4ICMwMDg4MDAnXG4vLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxMClcbi8vICAgICAgICAgICAgIGRsZy5yZW1vdmUoKVxuLy8gICAgICAgICAgICAgaWYoSXNOZWVkU3RhdHVzID09PSB0cnVlKVxuLy8gICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgZGxnLnN0YXR1c1ZhbHVlID0gdHJ1ZSBcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEwKVxuLy8gXHRcdH0oKSlcbi8vICAgICB9XG4vLyB9XG5cbiIsImltcG9ydCAqIGFzIGV6VXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6VGltZSBmcm9tICcuL1RpbWUvdGltZSdcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0ICogYXMgZXpSZWN0YW5nbGUgZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xuXG5cblxuLy8gZXhwb3J0IHsgQWRqb2luUmVjdCxSZWN0Q2VudGVyIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3BvbHlnb24nXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCAqIGZyb20gJy4vVGltZS90aW1lJ1xuZXhwb3J0ICogZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzcydcbmV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZ3JhdGluZydcbmV4cG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0IHsgQXJjIH0gZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCB7IEVsbGlwc2UgfSBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCB7IFRleHQgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCB7IEltZyB9IGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZSdcbmV4cG9ydCB7IERpYWxvZ3VlIH0gZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcbmV4cG9ydCB7IEdyYXQgfSBmcm9tICcuL0dyYXBoaWMvZ3JhdGluZydcbi8vIGV4cG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL0FuaW1hdGUvYW5pbWF0ZSdcbi8vIGV4cG9ydCB7IG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuIFxuLy8gbGV0IEV6cHN5TGlzdCA9IG5ldyBBcnJheSgpO1xuXG5jbGFzcyBFenBzeSB7XG4gICAgaWQ6IG51bWJlclxuICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIGN0eExpc3Q6IEFycmF5PENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5cbiAgICBjU3R5bGU/OiBjYW52YXNTdHlsZVxuXG4gICAgLy8gUmVjdGFuZ2xlOiBSZWN0YW5nbGVcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSl7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xuICAgICAgICB0aGlzLmNTdHlsZSA9IGNTdHlsZTtcbiAgICAgICAgdGhpcy5jdHhMaXN0ID0gW11cbiAgICAgICAgLy8gdGhpcy5jdHggPSBlekNhbnZhcy5jcmVhdGVDYW52YXMoZG9tLGNTdHlsZSk7ICAgIC8v5q2k5aSE5Yib5bu6Y2FudmFz77yM5Y+v5LuF5Yib5bu65LiA5LiqY2FudmFz77yM5L2G5piv55uu5YmN5peg5rOV5LuF5riF6Zmk5LiA5Liq5Zu+5b2iXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuY3R4KVxuICAgIH1cblxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmN0eExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICBsZXQgYyA9IHRoaXMuY3R4TGlzdFtpXS5jYW52YXM7XG4gICAgICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoXG4gICAgICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZChlbDogRWxlbWVudHN8RWxlbWVudHNbXSl7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKCdzdWNjZXNzJylcbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKHRoaXMuZG9tLHRoaXMuY1N0eWxlKTsgLy/mraTlpITliJvlu7pjYW52YXPlsIbliJvlu7rlpJrkuKpjYW52YXNcbiAgICAgICAgdGhpcy5jdHhMaXN0LnB1c2godGhpcy5jdHgpXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzKVxuICAgICAgICB7XG4gICAgICAgICAgICBlbC5jdHggPSBjdHg7XG4gICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWxbaV0uY3R4ID0gY3R4XG4gICAgICAgICAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWxbaV0sY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cblxuICAgIC8vIGFsaWFzaW5nKHN0eWxlOiBzdHJpbmcpe1xuICAgIC8vICAgICB0aGlzLmN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSBzdHlsZVxuICAgIC8vIH1cblxuICAgIGFuaW1hdGUoZWw6IEVsZW1lbnRzLGZ1bmM6IEZ1bmN0aW9uLGRlbGF5OiBudW1iZXIpe1xuICAgICAgICAvLyBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgd2hpbGUoMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLldhaXRTZWNzKGRlbGF5LzIpXG4gICAgICAgICAgICAgICAgZXpKdWRnZS5qdWRnZUFuaW1hdGUoZWwpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5XYWl0U2VjcyhkZWxheS8yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgfVxuXG5cblxuICAgIGNsZWFyKCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuICAgICAgICAgICAgbGV0IGNoaWxkID0gdGhhdC5kb20ubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgICAgICAgd2hpbGUoY2hpbGQpe1xuICAgICAgICAgICAgICAgIHRoYXQuZG9tLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAgICAgICAgIGNoaWxkID0gdGhhdC5kb20ubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzb2x2ZSgwKVxuICAgICAgICB9KVxuICAgIH1cblxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gcHVzaEV6cHN5TGlzdChlejogRXpwc3kpe1xuLy8gICAgIGxldCBudW0gPSBlei5pZDtcbi8vICAgICBFenBzeUxpc3RbbnVtXSA9IGV6O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKSB7XG4gICAgbGV0IGV6ID0gbmV3IEV6cHN5KGV6VXRpbHMuQ291bnQoKSxkb20sY1N0eWxlKTtcbiAgICAvLyBwdXNoRXpwc3lMaXN0KGV6KTtcbiAgICAvLyBjb25zb2xlLmRpcihFenBzeUxpc3QpO1xuICAgIHJldHVybiBlejtcbn0iXSwibmFtZXMiOlsiZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlIiwibmFtZUlkIiwiZXpKdWRnZS5qdWRnZURpdlN0eWxlIiwiZXpEaXYuY3JlYXRlRGl2IiwiZXpKdWRnZS5qdWRnZU1vZGVsIiwiZXpKdWRnZS5qdWRnZUNvbnRlbnRTdHlsZSIsImV6Q2FudmFzLmNyZWF0ZUNhbnZhcyIsImV6SnVkZ2UuanVkZ2VFbGVtZW50IiwiZXpUaW1lLldhaXRTZWNzIiwiZXpKdWRnZS5qdWRnZUFuaW1hdGUiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O1NDRWdCLFlBQVksQ0FBQyxHQUFnQixFQUFDLE1BQW9CO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7O0lBS3hDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUM3QixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7SUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTs7SUFFMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7SUFDckQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENB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QUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUNwRTtRQUNJLFlBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7U0FDRztRQUNBLFdBQVcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDeEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFL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LENBQUE7SUFDdEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBOztJQUVmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25ELFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBOzs7Ozs7Ozs7Ozs7O0lBY2YsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQVdELFNBQVMsV0FBVyxDQUFDLElBQVUsRUFBQyxHQUE2QixFQUFDLEdBQVc7SUFDckUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ2IsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ25ILFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lB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LFlBQVksU0FBUyxFQUFDO1FBQ3ZCLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUUsSUFBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBRSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFLEVBQy9DO1lBQ0ksT0FBTyxJQUFJLENBQUM7U0FDZjthQUVEO1lBQ0ksT0FBTyxLQUFLLENBQUM7U0FDaEI7S0FDSjtTQUNJLElBQUcsRUFBRSxZQUFZLE1BQU0sRUFDNUI7UUFDSSxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdEQsSUFBRyxDQUFDLElBQUksRUFBRSxFQUNWO1lBQ0ksT0FBTyxJQUFJLENBQUE7U0FDZDthQUNHO1lBQ0EsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksSUFBSSxFQUMxQjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDdkUsSUFBRyxFQUFFLEtBQUssRUFBRSxFQUNaO1lBQ0ksSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLEdBQUMsRUFBRSxLQUFHLEVBQUUsR0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFBO1lBQ3hDLElBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFO2FBQzNCO2dCQUNJLE9BQU8sSUFBSSxDQUFBO2FBQ2Q7aUJBQ0c7Z0JBQ0EsT0FBTyxLQUFLLENBQUE7YUFDZjtTQUNKO2FBQ0c7WUFDQSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDeEMsSUFBRyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUU7YUFDM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDRztnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7S0FFSjtTQUNJLElBQUcsRUFBRSxZQUFZLEdBQUcsRUFDekIsQ0FFQztTQUNJLElBQUcsRUFBRSxZQUFZLE9BQU8sRUFDN0I7UUFDSSxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3JFLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0UsSUFBRyxDQUFDLElBQUksQ0FBQyxFQUNUO1lBQ0ksT0FBTyxJQUFJLENBQUE7U0FDZDthQUNHO1lBQ0EsT0FBTyxLQUFLLENBQUE7U0FDZjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7UUFDYixJQUFJLEVBQUUsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3BCLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkMsS0FBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2xDO1lBQ0ksSUFBRyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsTUFBTSxHQUFDLENBQUMsRUFDN0I7Z0JBQ0ksQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNSO2lCQUNHO2dCQUNBLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2FBQ1o7WUFDRCxJQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQ2xCO2dCQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7YUFDaEU7aUJBQ0c7Z0JBQ0EsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTthQUNoRTtZQUNELElBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFDbEI7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDSSxJQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUM7Z0JBQ25CLEtBQUssRUFBRSxDQUFBO2FBQ1Y7U0FDSjtRQUNELElBQUcsS0FBSyxHQUFDLENBQUMsS0FBRyxDQUFDLEVBQ2Q7WUFDSSxPQUFPLEtBQUssQ0FBQTtTQUNmO2FBQ0c7WUFDQSxPQUFPLElBQUksQ0FBQTtTQUNkO0tBQ0o7Ozs7Ozs7Ozs7OztBQVlMLENBQUM7U0FFZSxZQUFZLENBQUMsRUFBWTtJQUNyQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDOztJQUVqQixFQUFFLENBQUMsTUFBTSxFQUFFLENBQUE7SUFDWCxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDVixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckIsR0FBRyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3pDLFlBQVksQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO0FBQ2pCOztTQzFvQmdCLE1BQU0sQ0FBQyxHQUFXLEVBQUMsSUFBYztJQUM3QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFDLFFBQVE7UUFDaEMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFDekI7Z0JBQ0ksSUFBSSxFQUFFLENBQUM7Z0JBQ1AsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2hCO1lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xCLENBQUE7S0FDSixDQUFDLENBQUE7QUFDTixDQUFDO1NBRWUsTUFBTSxDQUFDLEdBQWtCO0lBQ3JDLElBQUksR0FBRyxDQUFDO0lBRVIsSUFBRyxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQzFCO1FBQ0ksR0FBRyxHQUFHLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDMUI7U0FDRztRQUNBLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2pDO0lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNoQixPQUFPLEdBQUcsQ0FBQTtBQUNkLENBQUM7U0FFZSxXQUFXLENBQUMsR0FBVztJQUNuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFDLFFBQVE7UUFDaEMsUUFBUSxDQUFDLFNBQVMsR0FBRyxLQUFLO1lBQ3RCLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN0RSxJQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBQztnQkFDdEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2hCO1lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xCLENBQUE7S0FDSixDQUFDLENBQUE7QUFFTixDQUFDO1NBRWUsYUFBYSxDQUFDLEdBQVc7SUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBQyxRQUFRO1FBQ2hDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsS0FBSztZQUNwQixJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBRyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUM7Z0JBQ3RCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTthQUNoQjtZQUNELFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNsQixDQUFBO0tBQ0osQ0FBQyxDQUFBO0FBRU4sQ0FBQztTQUVlLFFBQVEsQ0FBQyxFQUFZO0lBQ2pDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUMsUUFBUTtRQUNoQyxRQUFRLENBQUMsV0FBVyxHQUFHLFVBQVMsS0FBSztZQUNqQyxJQUFJLENBQUMsR0FBRyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdEUsSUFBSSxDQUFDLEVBQUMsQ0FBQyxDQUFBO1lBQ1AsSUFBRyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQ3JCO2dCQUNJLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFBO2dCQUNYLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFBO2FBQ2Q7OztZQUdELElBQUksQ0FBQyxHQUFHLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFBOztZQUVsQyxJQUFHLENBQUMsS0FBSyxJQUFJLEVBQ2I7Z0JBQ0ksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2FBQ2hCO1lBQ0QsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ2xCLENBQUE7S0FDSixDQUFDLENBQUE7QUFFTjs7U0N0RWdCLFNBQVMsQ0FBQyxHQUFnQixFQUFDLE1BQWdCO0lBQ3ZELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkMsTUFBTSxHQUFHQyxhQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUE7SUFDekMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtJQUMzQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO0lBQ2hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUE7SUFDNUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFBO0lBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHdCQUF3QixDQUFBO0lBQzlDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUMvQixHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTyxDQUFBOztJQUU5QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7O0lBRTFCLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLE1BQU0sSUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBQ3ZELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsTUFBTSxDQUFDLEtBQUssSUFBRSxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBQ3ZELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDaEIsT0FBTyxDQUFDLEdBQUcsRUFBQyxNQUFNLENBQUMsQ0FBQTtBQUN2Qjs7QUN4QkEsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO01BRUcsUUFBUTtJQUNqQixFQUFFLENBQVE7SUFDVixHQUFHLENBQWE7SUFDaEIsU0FBUyxDQUFhO0lBQ3RCLElBQUksQ0FBUztJQUNiLE1BQU0sQ0FBVztJQUNqQixXQUFXLENBQVM7SUFDcEIsUUFBUSxDQUFlO0lBQ3ZCLFdBQVcsQ0FBZTtJQUMxQixLQUFLLENBQVk7SUFDakIsWUFBWSxTQUFzQixFQUFDLE1BQWlCO1FBQ2hELENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUdDLFNBQWUsQ0FBQyxTQUFTLEVBQUMsTUFBTSxDQUFDLENBQUE7UUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDNUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7UUFDeEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUE7UUFDMUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQTtLQUNqQjtJQUNELElBQUksQ0FBQyxRQUFzQjtRQUN2QixRQUFRLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQTtRQUN0QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQTtRQUN4QixJQUFJLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQzVDLElBQUcsQ0FBQyxRQUFRLEVBQ1o7WUFDSSxRQUFRLEdBQUc7Z0JBQ1AsSUFBSSxFQUFFLE1BQU07YUFDZixDQUFBO1NBQ0o7UUFDRCxJQUFJLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsT0FBTyxDQUFDLEdBQUdDLFVBQWtCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ2xFLFFBQVEsR0FBR0MsaUJBQXlCLENBQUMsUUFBUSxFQUFDLEtBQUssRUFBQyxPQUFPLENBQUMsQ0FBQTtRQUM1RCxJQUFHLFFBQVEsQ0FBQyxNQUFNLEVBQ2xCO1lBQ0ksSUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQ25CO2dCQUNJLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsT0FBTyxDQUFDLENBQUE7YUFDbkM7U0FDSjtRQUNELFNBQVMsQ0FBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLE1BQU0sRUFBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQTs7UUFFMUQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDakUsSUFBSSxHQUFHLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUNyQixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFDLE1BQU07WUFDdEMsSUFBRyxRQUFRLENBQUMsTUFBTSxFQUNsQjtnQkFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzVDO29CQUNJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtpQkFDdkQ7YUFDSjtZQUNELElBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDMUMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFDdkI7Z0JBQ0ksSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDOUQsR0FBRyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUc7b0JBQ2xCLENBQUM7d0JBQ0csR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTt3QkFDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLHNCQUFzQixDQUFBO3dCQUNoRCxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO3dCQUM1QixNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3QkFDckIsSUFBRyxDQUFDLEtBQUssUUFBUSxDQUFDLGVBQWUsSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQy9EOzRCQUNJLElBQUcsUUFBUSxDQUFDLE1BQU0sRUFDbEI7Z0NBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztvQ0FDSSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7b0NBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtpQ0FDbkM7NkJBQ0o7aUNBQ0c7Z0NBQ0EsSUFBRyxRQUFRLENBQUMsUUFBUSxFQUNwQjtvQ0FDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzlDO3dDQUNJLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQ3BFOzRDQUNJLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt5Q0FDOUM7cUNBQ0o7aUNBQ0o7NkJBQ0o7NEJBQ0QsSUFBRyxRQUFRLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFDM0I7O2dDQUVJLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFDLE1BQU07b0NBQ3ZCLElBQUksV0FBVyxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7b0NBQ2xDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsTUFBTTt3Q0FDdkIsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQzt3Q0FDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3Q0FDZixPQUFPLENBQUMsRUFBRSxDQUFDLENBQUE7cUNBQ2QsQ0FBQTs7O29DQUdELFdBQVcsQ0FBQyxpQkFBaUIsQ0FBb0IsSUFBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29DQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQTtpQ0FDM0IsQ0FBQyxDQUFBOzZCQUNMOzRCQUNELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBO3lCQUMxQjt3QkFDRCxNQUFNLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTt3QkFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFBO3dCQUNiLE1BQU0sV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO3dCQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO3FCQUM1QixHQUFHLENBQUE7aUJBRVAsQ0FBQTthQUNKO1NBQ0osQ0FBQyxDQUFBO0tBQ0w7SUFDRCxXQUFXLENBQUMsTUFBZ0I7UUFDeEIsTUFBTSxHQUFHSCxhQUFxQixDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3RDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO1FBQ3pCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDM0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUM3QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDM0IsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFBO0tBQzFDO0lBQ0QsUUFBUSxDQUFDLFFBQXNCO1FBQzNCLFFBQVEsR0FBR0csaUJBQXlCLENBQUMsUUFBUSxFQUFDLGdCQUFnQixFQUFDLCtCQUErQixDQUFDLENBQUE7UUFDL0YsUUFBUSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7UUFDdkIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQzdCO0lBQ0QsT0FBTyxDQUFDLFFBQXNCO1FBQzFCLFFBQVEsR0FBR0EsaUJBQXlCLENBQUMsUUFBUSxFQUFDLGlCQUFpQixFQUFDLGdDQUFnQyxDQUFDLENBQUE7UUFDakcsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUE7UUFDeEIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUN0QjtJQUNELFFBQVEsQ0FBQyxRQUFzQjtRQUMzQixRQUFRLEdBQUdBLGlCQUF5QixDQUFDLFFBQVEsRUFBQyxnQkFBZ0IsRUFBQywrQkFBK0IsQ0FBQyxDQUFBO1FBQy9GLFFBQVEsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ3ZCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLFFBQVEsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUE7S0FDdEI7SUFDRCxPQUFPLENBQUMsUUFBdUI7UUFDM0IsUUFBUSxHQUFHQSxpQkFBeUIsQ0FBQyxRQUFRLEVBQUMsZUFBZSxFQUFDLDhCQUE4QixDQUFDLENBQUE7UUFDN0YsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7UUFDdEIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDckIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUN0QjtJQUNELE1BQU0sQ0FBQyxRQUF1QixFQUFDLEtBQWM7UUFDekMsUUFBUSxHQUFHQSxpQkFBeUIsQ0FBQyxRQUFRLEVBQUMsZ0JBQWdCLEVBQUMsK0JBQStCLENBQUMsQ0FBQTtRQUMvRixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNyQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3RCO0lBQ0QsUUFBUSxDQUFDLFFBQXVCLEVBQUMsR0FBbUI7UUFDaEQsUUFBUSxHQUFHQSxpQkFBeUIsQ0FBQyxRQUFRLEVBQUMsZ0JBQWdCLEVBQUMsK0JBQStCLENBQUMsQ0FBQTtRQUMvRixRQUFRLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUN2QixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNyQixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0tBQ3RCO0lBQ0QsT0FBTyxDQUFDLFFBQXVCO1FBQzNCLFFBQVEsR0FBR0EsaUJBQXlCLENBQUMsUUFBUSxFQUFDLGtCQUFrQixFQUFDLGlDQUFpQyxDQUFDLENBQUE7UUFDbkcsUUFBUSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUE7UUFDdEIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDckIsUUFBUSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtLQUN0QjtJQUNELE1BQU07UUFDRixJQUFJLElBQUksR0FBRyxJQUFJLENBQUE7UUFDZixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFDLE1BQU07WUFDdEMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQTtZQUNyQyxPQUFNLEtBQUssRUFBQztnQkFDUixJQUFJLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQTtnQkFDM0IsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUE7YUFDcEM7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7OztZQUdwQixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFBO1lBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNiLENBQUMsQ0FBQTtLQUVMO0NBQ0o7QUFtQkQsTUFBTSxPQUFPO0lBQ1QsR0FBRyxDQUFhO0lBQ2hCLE1BQU0sQ0FBUztJQUNmLEtBQUssQ0FBZ0I7SUFDckIsTUFBTSxDQUFVO0lBQ2hCLFlBQVksSUFBeUIsRUFBQyxNQUFnQjtRQUNsRCxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUcsSUFBSSxZQUFZLFdBQVcsRUFDOUI7WUFDSSxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQTtZQUN2QixJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQTtTQUNsQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFBO1lBQ3hDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQzlDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUE7WUFDcEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO1lBQzNELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUE7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7OztZQUdyQixJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDNUI7S0FFSjtDQUNKO1NBRWUsT0FBTyxDQUFDLEdBQWdCLEVBQUMsTUFBaUI7SUFDdEQsSUFBSSxHQUFHLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25DLE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLEdBQWEsRUFBQyxRQUFzQixFQUFDLEdBQWtCLEVBQUMsTUFBZSxFQUFDLFFBQWlCLEVBQUMsR0FBbUI7O0lBRTVILEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUE7SUFDcEMsY0FBYyxDQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbkMsZ0JBQWdCLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQyxJQUFHLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUNuQjtRQUNJLGVBQWUsQ0FBQyxHQUFHLEVBQUMsUUFBUSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUE7UUFDcEQsZUFBZSxDQUFDLEdBQUcsRUFBQyxRQUFRLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQzNDO1NBQ0ksSUFBRyxHQUFHLENBQUMsTUFBTSxLQUFLLENBQUMsRUFDeEI7UUFDSSxlQUFlLENBQUMsR0FBRyxFQUFDLFFBQVEsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLENBQUE7S0FDM0M7QUFFTCxDQUFDO0FBRUQsU0FBUyxjQUFjLENBQUMsR0FBYSxFQUFDLFFBQXNCLEVBQUMsR0FBVztJQUNwRSxJQUFJLFVBQVUsR0FBRztRQUNiLEtBQUssRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUs7UUFDdkIsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFBO0lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQyxVQUFVLENBQUMsQ0FBQTs7SUFFNUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTtJQUNwQyxLQUFLLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO0lBQ2pDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7SUFDbkMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtBQUM3QixDQUFDO0FBRUQsU0FBUyxnQkFBZ0IsQ0FBQyxHQUFhLEVBQUMsUUFBc0IsRUFBQyxHQUFXO0lBQ3RFLElBQUksWUFBWSxHQUFHO1FBQ2YsS0FBSyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSztRQUN2QixNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUE7SUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUE7SUFDeEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQTtJQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0FBQy9CLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFhLEVBQUMsUUFBc0IsRUFBQyxHQUFXLEVBQUMsR0FBVyxFQUFDLEtBQWE7SUFFL0YsSUFBSSxXQUFXLEdBQUc7UUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1FBQ3ZCLE1BQU0sRUFBRSxFQUFFO0tBQ2IsQ0FBQTtJQUNELElBQUksTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQTtJQUMxQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUE7SUFDMUMsSUFBRyxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFDbEU7UUFDSSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQzFELElBQUcsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFFLFFBQVEsQ0FBQyxLQUFLLEVBQ25DO1lBQ0ksSUFBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQ2hCO2dCQUNJLElBQUcsUUFBUSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQzNCO29CQUNJLGFBQWEsQ0FBQyxNQUFVLENBQUMsQ0FBQTtpQkFDNUI7cUJBQ0c7b0JBQ0EsWUFBWSxDQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ2pDO2FBQ0o7aUJBQ0c7Z0JBQ0EsYUFBYSxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQTthQUNqQztTQUNKO2FBQ0c7WUFDQSxlQUFlLENBQUMsTUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFBO1NBQ25DO0tBQ0o7U0FDRzs7UUFFQSxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN6RixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxhQUFhLEdBQUcsUUFBUSxDQUFBO1FBQ3pDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUMsTUFBTSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTs7UUFFM0gsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztZQUNJLGVBQWUsQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQzdDO0tBQ0o7QUFDTCxDQUFDO0FBRUQsU0FBUyxlQUFlLENBQUMsTUFBZSxFQUFDLE1BQWM7SUFFbkQsSUFBSSxXQUFXLEdBQUc7UUFDZCxLQUFLLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztRQUN2QyxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUE7SUFDRCxJQUFJLE1BQU0sR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUMsV0FBVyxDQUFDLENBQUE7SUFDNUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFBO0lBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGNBQWMsR0FBRyxTQUFTLENBQUE7SUFDM0MsWUFBWSxDQUFDLE1BQU0sRUFBQyxNQUFNLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsTUFBZSxFQUFDLEdBQVcsRUFBQyxLQUFhO0lBQzNELElBQUksUUFBUSxHQUFHO1FBQ1gsS0FBSyxFQUFFLEVBQUU7UUFDVCxNQUFNLEVBQUUsRUFBRTtLQUNiLENBQUE7SUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUMsUUFBUSxDQUFDLENBQUE7SUFDdEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFBO0lBQ2xCLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQTtJQUN2QixHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFBO0lBQy9CLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7SUFDN0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTs7SUFFaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQTtBQUN0QyxDQUFDO0FBRUQsU0FBUyxhQUFhLENBQUMsTUFBZSxFQUFDLFFBQXNCO0lBQ3pELElBQUksR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDdkMsR0FBRyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUE7SUFDZCxHQUFHLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQTtJQUN0QixNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUMxQixDQUFDO0FBRUQsU0FBUyxZQUFZLENBQUMsTUFBZSxFQUFDLE1BQWM7SUFFaEQsSUFBSSxRQUFRLEdBQUc7UUFDWCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxFQUFFO0tBQ2IsQ0FBQTtJQUNELElBQUksR0FBRyxHQUFHLElBQUksT0FBTyxDQUFDLE1BQU0sRUFBQyxRQUFRLENBQUMsQ0FBQTtJQUN0QyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUE7SUFDL0IsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsTUFBTSxHQUFHLEdBQUcsQ0FBQTtJQUNoQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3pDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsTUFBTSxDQUFBO0lBQ2YsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO0lBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUE7SUFDL0IsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFBO0lBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQzFCLENBQUM7QUFFRCxTQUFTLGFBQWEsQ0FBQyxNQUFlLEVBQUMsR0FBYTtJQUNoRCxJQUFJLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFBOztJQUUxQyxJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQTtJQUNsQixJQUFJLENBQUMsRUFBRSxHQUFHLE1BQU0sQ0FBQTtJQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxPQUFPLENBQUE7SUFDMUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO0lBQzlCLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQzNCLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxNQUFlLEVBQUMsUUFBc0I7SUFDM0QsSUFBSSxXQUFXLEdBQUc7UUFDZCxLQUFLLEVBQUUsR0FBRztRQUNWLE1BQU0sRUFBRSxFQUFFO0tBQ2IsQ0FBQTtJQUNELElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUNqQixJQUFJLE1BQU0sR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQ3hCLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQTtJQUNsQixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7SUFDYixJQUFJLFNBQVMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQzVCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksS0FBSyxHQUFHLFNBQVMsQ0FBQTtJQUNyQixJQUFJLE1BQU0sR0FBRyxTQUFTLENBQUE7SUFDdEIsSUFBSSxNQUFNLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFDLFdBQVcsQ0FBQyxDQUFBO0lBQzVDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUE7SUFDckMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtJQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFBO0lBQ25DLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7SUFDaEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ2hDLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFDLENBQUE7SUFDRixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUE7SUFDakMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtJQUNwQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO0lBQzlCLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQTtJQUNuRCxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFBO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDbEMsSUFBSyxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ2hDLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLEVBQUU7S0FDYixDQUFDLENBQUE7O0lBRUYsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtJQUN6QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsc0JBQXNCLENBQUE7SUFDdEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTs7SUFFbkMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTtJQUN2QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUE7SUFDbEQsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQTtJQUMvQixTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFBO0lBQ2pDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUE7SUFDcEMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQTtJQUM1QyxJQUFJLGFBQWEsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO0lBQy9CLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDNUM7UUFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFDO1lBQ3JDLEtBQUssRUFBRSxHQUFHO1lBQ1YsTUFBTSxFQUFFLEVBQUUsSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7U0FDeEMsQ0FBQyxDQUFBO1FBQ0YsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ1Y7WUFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUE7U0FDaEU7O1FBRUQsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtRQUNoRCxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsaUJBQWlCLENBQUE7UUFDekQsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxJQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUN6RixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0tBQzNDO0lBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxFQUFDO1FBQ2xDLEtBQUssRUFBRSxHQUFHO1FBQ1YsTUFBTSxFQUFFLEVBQUUsSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUM7S0FDeEMsQ0FBQyxDQUFBO0lBQ0YsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFBOztJQUVyQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQ3pDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQTtJQUNsRCxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxFQUFFLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLEdBQUcsSUFBSSxDQUFBO0lBQ2xGLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDakMsSUFBRyxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQ3ZCO1FBQ0ksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtRQUNsQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzVDO1lBQ0ksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQztnQkFDNUIsSUFBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBQztvQkFDVixTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtvQkFDakMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtvQkFDN0MsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtvQkFDekMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1Qzt3QkFDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ1Y7NEJBQ0ksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTs0QkFDOUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTs0QkFDeEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTt5QkFDcEI7cUJBQ0o7b0JBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQTtpQkFDbkI7cUJBQ0c7b0JBQ0EsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtvQkFDakIsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTtvQkFDOUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtvQkFDeEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQTtpQkFDcEI7YUFDSixDQUFBO1NBQ0o7S0FDSjtTQUNHO1FBQ0EsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztZQUNJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUM7Z0JBQzVCLElBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQ2I7b0JBQ0ksU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7b0JBQ2pDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7b0JBQzdDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUE7b0JBQ3pDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUE7b0JBQ2hCLEtBQUssRUFBRSxDQUFBO29CQUNQLElBQUcsS0FBSyxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUNuQzt3QkFDSSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFBO3dCQUN0QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO3FCQUNyQztpQkFDSjtxQkFDRztvQkFDQSxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO29CQUNqQixhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO29CQUM5QyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO29CQUN4QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO29CQUN2QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO29CQUNqQyxNQUFNLEdBQUcsS0FBSyxDQUFBO29CQUNkLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUE7b0JBQ2pCLEtBQUssRUFBRSxDQUFBO2lCQUNWO2FBQ0osQ0FBQTtTQUNKO1FBQ0QsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQztZQUNyQixJQUFHLENBQUMsTUFBTSxFQUFDO2dCQUNQLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUE7Z0JBQ3RDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBSSxNQUFNLENBQUE7Z0JBQ25DLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQztvQkFDekMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtvQkFDN0MsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQTtvQkFDekMsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUE7aUJBQ3BDO2dCQUNELEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtnQkFDOUIsTUFBTSxHQUFHLElBQUksQ0FBQTthQUNoQjtpQkFDRztnQkFDQSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFBO2dCQUN2QyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUksS0FBSyxDQUFBO2dCQUNsQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7b0JBQ3pDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7b0JBQzlDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7b0JBQ3hDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7aUJBQ3BCO2dCQUNELEtBQUssR0FBRyxDQUFDLENBQUE7Z0JBQ1QsTUFBTSxHQUFHLEtBQUssQ0FBQTthQUNqQjtTQUNKLENBQUE7S0FDSjtJQUNELFVBQVUsQ0FBQyxHQUFHLENBQUMsV0FBVyxHQUFHLENBQUM7UUFDMUIsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUN2QyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFBO0tBQ3RDLENBQUE7SUFDRCxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsR0FBRyxDQUFDO1FBQ3hCLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxNQUFNLENBQUE7UUFDeEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtLQUNyQyxDQUFBO0lBQ0QsVUFBVSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQztRQUN0QixJQUFHLENBQUMsS0FBSyxFQUNUO1lBQ0ksU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQTtZQUNqQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBQ25DLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsQ0FBQTtZQUMzRSxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7WUFDcEYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7WUFDbEYsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtZQUNwQyxVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsbUJBQW1CLENBQUE7WUFDdkQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFBO1lBQ3BDLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDNUM7Z0JBQ0ksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQTtnQkFDeEMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTthQUNqRDtZQUNELFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7WUFDakMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQTtZQUN2QyxLQUFLLEdBQUcsSUFBSSxDQUFBO1NBQ2Y7YUFDRztZQUNBLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUE7WUFDakMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtZQUNuQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFBO1lBQ2pDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUE7WUFDN0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztnQkFDSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7Z0JBQzlFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxDQUFDLEVBQUUsSUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7YUFDNUY7WUFDRCxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLElBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLENBQUE7WUFDdkUsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLENBQUMsRUFBRSxJQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtZQUNsRixVQUFVLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFBO1lBQzlCLFVBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7WUFDcEMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQTtZQUMxQyxHQUFHLEdBQUcsRUFBRSxDQUFBO1lBQ1IsUUFBUSxDQUFDLFFBQVEsR0FBRyxTQUFTLENBQUE7WUFDN0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUMs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
