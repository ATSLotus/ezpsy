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
class Time0 {
    startTime;
    instantTime;
    timeStamp;
    item;
    timeValue;
    constructor() {
        this.item = 0;
        this.startTime = new time();
        this.instantTime = [];
        this.instantTime.push(this.startTime);
        this.timeValue = [];
        this.timeStamp = [];
    }
    start() {
        this.startTime = new time();
    }
    record() {
        let t = new time();
        this.instantTime.push(t);
        this.item++;
    }
}
// export function Tic(): Time0{
//     let t = new Time0()
//     t.start()
//     return t;
// }
// export function Toc(time: Time0): number{
//     let t = 0;
//     let ts = new Array()
//     time.record()
//     ts[0] = time.instantTime[time.item].hour - time.instantTime[time.item-1].hour
//     ts[1] = time.instantTime[time.item].minutes - time.instantTime[time.item-1].minutes
//     ts[2] = time.instantTime[time.item].seconds - time.instantTime[time.item-1].seconds
//     ts[3] = time.instantTime[time.item].milliseconds - time.instantTime[time.item-1].milliseconds
//     t = 60*60*ts[0] + 60*ts[1] + ts[2] + ts[3]/1000
//     // t.toFixed(3)
//     time.timeValue.push(t);
//     return t;
// }
// export function setTimeTtamp(T: Time0){
//     let t = new time();
//     T.timeStamp.push(t);
// } 
// export function getToc(time: Time0): Array<number>{
//     let tA = new Array();
//     let ts = new Array();
//     let t = time.timeStamp
//     for(let i = 0;i < Math.floor(t.length/2);i++){
//         if(t[2*i+1] === undefined)
//         {
//             break;
//         }
//         else{
//             ts[0] = t[2*i+1].hour - t[2*i].hour
//             ts[1] = t[2*i+1].minutes - t[2*i].minutes
//             ts[2] = t[2*i+1].seconds - t[2*i].seconds
//             ts[3] = t[2*i+1].milliseconds - t[2*i].milliseconds
//             tA[i] = 60*60*ts[0] + 60*ts[1] + ts[2] + ts[3]/1000
//             // tA[i] = Math.round(tA[i]*1000)/1000
//             // console.dir(tA[i])
//         }
//     }
//     return tA;
// }
// export function GetSecs(time: Time0): number{
//     let t = Toc(time)
//     return t
// }
function WaitSecs0(delay, message) {
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
            if (time_num > num1) {
                window.cancelAnimationFrame(id);
                resolve(0);
            }
        }());
    });
}

class Elements {
    name;
    shape;
    style;
    textLine;
    ctx;
    storage;
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
        let ctx = this.ctx;
        cStyle = judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
        let w = window.innerWidth;
        let h = window.innerHeight;
        // console.dir(w)
        c.style.top = ((h - cStyle.height) / 2).toString() + 'px';
        c.style.left = ((w - cStyle.width) / 2).toString() + 'px';
        let el = this;
        judgeElement(el, ctx);
    }
    remove() {
        let ctx = this.ctx;
        ctx.save();
        // ctx.beginPath()
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 1, 1);
        ctx.globalCompositeOperation = "destination-in";
        ctx.fillRect(0, 0, 1, 1);
        // ctx.closePath()	
        ctx.restore();
        ctx.globalCompositeOperation = 'source-over';
        this.storage.remove(this);
        this.storage.reDraw(ctx);
        // let ctx = this.ctx
        // let c = ctx.canvas;
        // c.width = c.width;
        // c.height = c.height;
    }
    animate(func, delay) {
        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        let ctx = this.ctx;
        // let start = performance.now();
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);
        (async function () {
            // while(performance.now() > start)
            // {
            while (1) {
                console.dir(performance.now());
                func();
                await delay_frame(delay);
                that.remove();
                that.storage.push(that);
                that.storage.reDraw(ctx);
            }
            //     func();
            //     // await ezTime.WaitSecs0(delay/2)
            //     await ezTimer.sleep(delay)
            //     that.remove()
            //     that.storage.push(that)
            //     that.storage.reDraw(ctx)
            //     // ezJudge.judgeAnimate(that,ctx);
            //     // await that.storage.reDraw(ctx);
            //     // await ezTime.WaitSecs0(delay/2)
            // }
            // window.setInterval(()=>{
            //     func();
            //     // await ezTime.WaitSecs0(delay/2)
            //     ezTimer.sleep(delay).then(()=>{
            //         that.remove()
            //         that.storage.push(that)
            //         that.storage.reDraw(ctx)
            //     })
            // },0)
        })();
    }
}

let groupId = 0;
class Group extends Elements {
    name = {
        name: "group" + groupId.toString(),
        graphicId: groupId
    };
    length;
    // ctx: CanvasRenderingContext2D
    groupList;
    constructor(el) {
        super();
        this.ctx = super.ctx;
        // this.id = groupId;
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
    ctx.save();
    ctx.beginPath();
    judgeTRS(rect);
    ctx.rect(sh.x, sh.y, sh.width, sh.height);
    judgeStyle(rect, ctx);
    ctx.closePath();
    ctx.restore();
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
    ctx.save();
    ctx.beginPath();
    judgeTRS(circle);
    ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI);
    judgeStyle(circle, ctx);
    ctx.closePath();
    ctx.restore();
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
    ctx.save();
    ctx.beginPath();
    judgeTRS(line);
    ctx.moveTo(sh.x, sh.y);
    ctx.lineTo(sh.xEnd, sh.yEnd);
    judgeStyle(line, ctx);
    ctx.closePath();
    ctx.restore();
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
    ctx.save();
    ctx.beginPath();
    judgeTRS(arc);
    ctx.arc(sh.x, sh.y, sh.r, sh.ang_f, sh.ang_e);
    judgeStyle(arc, ctx);
    ctx.restore();
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
    //max是等于1除以长轴值，即a和b中的较大者
    //i每次循环增加1/max，表示度数的增加
    //这样可以使得每次循环所绘制的路径（弧线）接近1像素
    let sh = ellipse.shape;
    let step = (sh.ra > sh.rb) ? 1 / sh.ra : 1 / sh.rb;
    ctx.save();
    ctx.beginPath();
    judgeTRS(ellipse);
    ctx.moveTo(sh.x + sh.ra, sh.y); //从椭圆的左端点开始绘制
    for (var i = 0; i < 2 * Math.PI; i += step) {
        //参数方程为x = a * cos(i), y = b * sin(i)，
        //参数为i，表示度数（弧度）
        ctx.lineTo(sh.x + sh.ra * Math.cos(i), sh.y + sh.rb * Math.sin(i));
    }
    judgeStyle(ellipse, ctx);
    ctx.closePath();
    ctx.restore();
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
    ctx.save();
    ctx.beginPath();
    judgeTRS(polygon);
    ctx.moveTo(sh.xA[0], sh.yA[0]);
    for (let i = 1; i < num; i++) {
        ctx.lineTo(sh.xA[i], sh.yA[i]);
    }
    ctx.lineTo(sh.xA[0], sh.yA[0]);
    judgeStyle(polygon, ctx);
    ctx.closePath();
    ctx.restore();
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
class Texts extends Elements {
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
        if (opts.textLine) {
            this.textLine = opts.textLine;
        }
        else {
            this.textLine = {
                textA: 'start',
                textB: 'alphabetic'
            };
        }
        nameId$2++;
    }
    setTextLine(textLine) {
        if (textLine) {
            if (textLine.textA) {
                this.textLine.textA = textLine.textA;
            }
            if (textLine.textB) {
                this.textLine.textB = textLine.textB;
            }
        }
    }
}
function makeText(text, ctx) {
    ctx.save();
    ctx.beginPath();
    // judgeTRS(text)
    ctx.textAlign = text.textLine.textA;
    ctx.textBaseline = text.textLine.textB;
    judgeTextStyle(text, ctx);
    judgeStyle_text(text, ctx);
    ctx.closePath();
    ctx.restore();
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
            I.crossOrigin = '';
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
        let that = this;
        c.width = screen.availWidth;
        c.height = screen.availHeight;
        ctx.drawImage(that.Img, sh.x, sh.y);
        that.ImgData = ctx.getImageData(sh.x, sh.y, that.Img.width, that.Img.height);
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
    ctx.save();
    ctx.beginPath();
    // judgeTRS(img)
    if (img.IsChange === false) {
        judgeImageShape(img, ctx);
    }
    else {
        judgeImageShape_true(img, ctx);
    }
    ctx.closePath();
    ctx.restore();
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
        let sh = this.shape;
        let c = document.createElement("canvas");
        let ctx = c.getContext("2d");
        this.style = {
            fill: createGratLinearGradient(ctx, [sh.x - sh.r, sh.y - sh.r, sh.x - sh.r, sh.y + 3 * sh.r], sh.desity, 0),
            stroke: 'none',
            lineWidth: 2
        };
        // if(opts.style)
        // {
        //     this.style = opts.style;
        // }
        // else{
        //     this.style = {
        //         fill: "none",
        //         stroke: "none",
        //         lineWidth: 2
        //     }
        // }
        nameId++;
    }
    play(speed, delay) {
        if (!delay) {
            delay = 6;
            if (!speed) {
                speed = 8;
            }
        }
        let ctx = this.ctx;
        let [x0, y0, x1, y1] = [this.shape.x - this.shape.r, this.shape.y - this.shape.r, this.shape.x - this.shape.r, this.shape.y + 3 * this.shape.r];
        let index = speed;
        let that = this;
        let i = 0;
        this.animate(() => {
            that.style.fill = createGratLinearGradient(ctx, [x0, y0, x1, y1], that.shape.desity, index * i);
            if (index * i >= 2 * that.shape.r) {
                i = 0;
            }
            // console.dir(that)
            i++;
        }, delay);
    }
}
function makeGrat(grat, ctx) {
    let sh = grat.shape;
    // console.dir(sh)
    // let num = sh.desity;
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
    // let fill = createGratLinearGradient(ctx,[sh.x-sh.r,sh.y-sh.r,sh.x-sh.r,sh.y+3*sh.r],num,0)
    // let c = ctx.canvas
    // c.style.borderRadius = '50%';
    // grat.style.fill = fill
    ctx.save();
    ctx.beginPath();
    // ezJudge.judgeTRS(grat)
    ctx.arc(sh.x, sh.y, sh.r, 0, 2 * Math.PI);
    // ctx.rect(sh.x-sh.r,sh.y-sh.r,sh.x+sh.r,sh.y+3*sh.r)
    judgeStyle(grat, ctx);
    ctx.closePath();
    ctx.restore();
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
    else if (el instanceof Texts) {
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
            list[i].ctx = ctx;
            judgeElement(list[i], ctx);
        }
    }
    // else if(el instanceof Array){
    //     let list = el;
    //     for(let i = 0;i < el.length;i++)
    //     {
    //         judgeElement(list[i],ctx);
    //     }
    // }
}
function judgeStyle(el, ctx) {
    // judgeAnimate(el);
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
    if (el.shape.maxWidth === undefined) {
        el.shape.maxWidth = ctx.canvas.width;
    }
    let st = el.style;
    if (st.fill !== 'none' && st.fill !== undefined) {
        ctx.fillStyle = st.fill;
        ctx.fillText(el.shape.text, el.shape.x, el.shape.y, el.shape.maxWidth);
    }
    else {
        if (st.stroke !== 'none' && st.stroke !== undefined) {
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text, el.shape.x, el.shape.y, el.shape.maxWidth);
        }
        else {
            st.stroke = "#000";
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text, el.shape.x, el.shape.y, el.shape.maxWidth);
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
function judgeTRS(el) {
    let ctx = el.ctx;
    ctx.translate(el.translate.x, el.translate.y);
    ctx.rotate(el.rotate);
    ctx.scale(el.scale.width, el.scale.height);
}
function judgeKey(keyCode, keyCodeDictionary) {
    let key = keyCodeDictionary[keyCode];
    return key;
}
function judgeDlgContent(dlgContent, title, content, ok, cancel) {
    if (ok === undefined) {
        ok = 'OK';
    }
    if (cancel === undefined) {
        cancel = 'Cancel';
    }
    if (dlgContent === undefined) {
        return dlgContent = {
            title: title,
            content: content,
            confirm: ok,
            cancel: cancel
        };
    }
    else {
        if (dlgContent.title === undefined) {
            dlgContent.title = title;
        }
        if (content !== undefined) {
            if (dlgContent.content === undefined) {
                dlgContent.content = content;
            }
        }
        if (dlgContent.confirm === undefined) {
            dlgContent.confirm = ok;
        }
        if (dlgContent.cancel === undefined) {
            dlgContent.cancel = cancel;
        }
        return dlgContent;
    }
}

class Storage {
    ElementsList;
    textLine;
    constructor() {
        this.ElementsList = [];
    }
    push(el) {
        if (el instanceof Elements || el instanceof Group) {
            this.ElementsList.push(el);
        }
        else {
            for (let i = 0; i < el.length; i++) {
                this.ElementsList.push(el[i]);
            }
        }
    }
    remove(el) {
        let name = this.getElementsName(el);
        let index = this.searchElementsName(name);
        if (index !== undefined) {
            if (index instanceof Array) {
                index.sort();
                for (let i = index.length - 1; i >= 0; i--) {
                    this.ElementsList.splice(index[i], 1);
                }
            }
            else {
                this.ElementsList.splice(index, 1);
            }
        }
    }
    getElementsName(el) {
        if (el instanceof Elements || el instanceof Group) {
            let name = el.name;
            return name;
        }
        else {
            let name = new Array();
            for (let i = 0; i < el.length; i++) {
                name[i] = el[i].name;
            }
            return name;
        }
    }
    searchElementsName(name) {
        if (name instanceof Array) {
            let index = new Array();
            for (let i = 0; i < name.length; i++) {
                for (let t = 0; t < this.ElementsList.length; t++) {
                    if (name[i].name === this.ElementsList[t].name.name) {
                        index[i] = t;
                        break;
                    }
                }
            }
            return index;
        }
        else {
            let index = -1;
            for (let t = 0; t < this.ElementsList.length; t++) {
                if (name.name === this.ElementsList[t].name.name) {
                    index = t;
                    break;
                }
            }
            return index;
        }
    }
    reDraw(ctx) {
        let el = this.ElementsList;
        for (let i = 0; i < el.length; i++) {
            el[i].ctx = ctx;
            judgeElement(el[i], ctx);
        }
    }
}

function KbWait(key, func) {
    return new Promise((resolve, rejected) => {
        document.onkeydown = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                if (func) {
                    func();
                }
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
    // console.dir(res) 
    return res;
}
function KbPressWait(key) {
    return new Promise((resolve, rejected) => {
        let keyC = new Array();
        if (typeof key === 'number') {
            keyC = [key];
        }
        else {
            keyC = key;
        }
        document.onkeydown = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            for (let i = 0; i < keyC.length; i++) {
                if (e && e.keyCode === keyC[i]) {
                    resolve(e.keyCode);
                }
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

class Time {
    startTime;
    timeStamp;
    timeContinueValue;
    timeIntervalValue;
    constructor() {
        this.startTime = performance.now();
        this.timeStamp = [];
        this.timeContinueValue = [];
        this.timeIntervalValue = [];
    }
    record() {
        this.timeStamp.push(performance.now());
    }
    getStamp() {
        return this.timeStamp;
    }
    getContinueValue() {
        for (let i = 1; i < this.timeStamp.length; i++) {
            this.timeContinueValue.push(this.timeStamp[i] - this.timeStamp[i - 1]);
        }
        return this.timeContinueValue;
    }
    getIntervalValue() {
        for (let i = 1; i < this.timeStamp.length; i += 2) {
            if (this.timeStamp)
                this.timeIntervalValue.push(this.timeStamp[i] - this.timeStamp[i - 1]);
        }
        return this.timeIntervalValue;
    }
}
// export function sleep(delay: number): Promise<number>{
//     return new Promise((res,rej)=>{
//         var startTime = performance.now() + delay;
//         while(performance.now() < startTime) {}
//         res(1)
//     })
// }
function sleep(delay) {
    let time_num = 0;
    delay = Math.floor(delay / 1000 * 60);
    return new Promise(function (resolve, reject) {
        (function raf() {
            time_num++;
            let id = window.requestAnimationFrame(raf);
            if (time_num > delay) {
                window.cancelAnimationFrame(id);
                resolve(0);
            }
        }());
    });
}
function WaitSecs(delay) {
    return new Promise((res, rej) => {
        var startTime = performance.now() + delay;
        while (performance.now() < startTime) { }
        res(1);
    });
}

class Keypress {
    keyType;
    keyEvent;
    key;
    keyCombination;
    constructor(keyType) {
        if (keyType) {
            if (keyType === 'keydown' || keyType === 'keyup' || keyType === 'keypress') {
                this.keyType = keyType;
            }
            else {
                this.keyType = 'keydown';
            }
        }
        else {
            this.keyType = 'keydown';
        }
        this.key = [];
        this.keyEvent = new KeyboardEvent(this.keyType);
    }
    listen(key, fun, IsDestroy) {
        // console.dir(param);
        let func = {
            funcList: []
        };
        if (IsDestroy === undefined) {
            IsDestroy = true;
        }
        return new Promise((res, rej) => {
            this.key = new Array();
            if (key) {
                if (fun instanceof Function) {
                    func.funcList = [fun];
                }
                else {
                    func = fun;
                }
                if (key instanceof Array) {
                    this.key = key;
                }
                else {
                    this.key.push(key);
                }
                for (let i = 0; i < this.key.length; i++) {
                    if (typeof this.key[i] === 'number')
                        this.key[i] = judgeKey(this.key[i], keyCodeDictionary);
                }
                // console.dir(func);
                listen(this.key, this.keyType, func, IsDestroy)
                    .then(e => {
                    // console.dir(e)
                    // if(e.index >= 0)
                    // {
                    //     if(func.complete)
                    //         func.complete()
                    // }
                    // if(func)
                    // {
                    //     if(func.funcList[e.index])
                    //         func.funcList[e.index]()
                    //     else
                    //         console.dir(e.key)
                    //         // console.error('func['+e+'] is undefined !');
                    // }
                    // else
                    //     console.dir(e.key)
                    //     // console.error("func is undefinde");
                    res(e);
                });
            }
            else {
                console.error("You shouldn't use this function without Parametric key !!!");
            }
        });
    }
}
function KeypressInit(keyType) {
    let keypress = new Keypress();
    return keypress;
}
function listen(key, keyType, func, IsDestroy) {
    let res = {
        index: -1,
        key: 'null'
    };
    return new Promise((resolve, reject) => {
        document.addEventListener(keyType, linstenner);
        // debugger;
        function linstenner(e) {
            // console.dir((<KeyboardEvent>e).key)
            for (let i = 0; i < key.length; i++) {
                if (key[i] === e.key) {
                    res = {
                        index: i,
                        key: e.key
                    };
                    if (res.index >= 0) {
                        if (func.complete)
                            func.complete();
                    }
                    if (func) {
                        if (func.funcList[res.index])
                            func.funcList[res.index]();
                        else
                            console.dir(res.key);
                        // console.error('func['+e+'] is undefined !');
                    }
                    else
                        console.dir(res.key);
                    // console.error("func is undefinde");
                    // res(e);
                    if (IsDestroy)
                        document.removeEventListener(keyType, linstenner);
                    resolve(res);
                }
            }
        }
    });
}
let keyCodeDictionary = {
    8: 'Backspace',
    9: 'Tab',
    12: 'Clear',
    13: 'Enter',
    16: 'Shift',
    17: 'Control',
    18: 'Alt',
    19: 'Pause',
    20: 'CapsLock',
    27: 'Escape',
    32: ' ',
    33: 'Prior',
    34: 'Next',
    35: 'End',
    36: 'Home',
    37: 'Left',
    38: 'Up',
    39: 'Right',
    40: 'Down',
    41: 'Select',
    42: 'Print',
    43: 'Execute',
    45: 'Insert',
    46: 'Delete',
    47: 'Help',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    65: 'a',
    66: 'b',
    67: 'c',
    68: 'd',
    69: 'e',
    70: 'f',
    71: 'g',
    72: 'h',
    73: 'i',
    74: 'j',
    75: 'k',
    76: 'l',
    77: 'm',
    78: 'n',
    79: 'o',
    80: 'p',
    81: 'q',
    82: 'r',
    83: 's',
    84: 't',
    85: 'u',
    86: 'v',
    87: 'w',
    88: 'x',
    89: 'y',
    90: 'z',
    96: 'KP_0',
    97: 'KP_1',
    98: 'KP_2',
    99: 'KP_3',
    100: 'KP_4',
    101: 'KP_5',
    102: 'KP_6',
    103: 'KP_7',
    104: 'KP_8',
    105: 'KP_9',
    106: 'KP_Multiply',
    107: 'KP_Add',
    108: 'KP_Separator',
    109: 'KP_Subtract',
    110: 'KP_Decimal',
    111: 'KP_Divide',
    112: 'F1',
    113: 'F2',
    114: 'F3',
    115: 'F4',
    116: 'F5',
    117: 'F6',
    118: 'F7',
    119: 'F8',
    120: 'F9',
    121: 'F10',
    122: 'F11',
    123: 'F12',
    124: 'F13',
    125: 'F14',
    126: 'F15',
    127: 'F16',
    128: 'F17',
    129: 'F18',
    130: 'F19',
    131: 'F20',
    132: 'F21',
    133: 'F22',
    134: 'F23',
    135: 'F24',
};

const consolePrefix = 'SweetAlert2:';

/**
 * Filter the unique values into a new array
 * @param arr
 */
const uniqueArray = (arr) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i]);
    }
  }
  return result
};

/**
 * Capitalize the first letter of a string
 * @param {string} str
 * @returns {string}
 */
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);

/**
 * @param {NodeList | HTMLCollection | NamedNodeMap} nodeList
 * @returns {array}
 */
const toArray = (nodeList) => Array.prototype.slice.call(nodeList);

/**
 * Standardize console warnings
 * @param {string | array} message
 */
const warn = (message) => {
  console.warn(`${consolePrefix} ${typeof message === 'object' ? message.join(' ') : message}`);
};

/**
 * Standardize console errors
 * @param {string} message
 */
const error = (message) => {
  console.error(`${consolePrefix} ${message}`);
};

/**
 * Private global state for `warnOnce`
 * @type {Array}
 * @private
 */
const previousWarnOnceMessages = [];

/**
 * Show a console warning, but only if it hasn't already been shown
 * @param {string} message
 */
const warnOnce = (message) => {
  if (!previousWarnOnceMessages.includes(message)) {
    previousWarnOnceMessages.push(message);
    warn(message);
  }
};

/**
 * Show a one-time console warning about deprecated params/methods
 */
const warnAboutDeprecation = (deprecatedParam, useInstead) => {
  warnOnce(
    `"${deprecatedParam}" is deprecated and will be removed in the next major release. Please use "${useInstead}" instead.`
  );
};

/**
 * If `arg` is a function, call it (with no arguments or context) and return the result.
 * Otherwise, just pass the value through
 * @param arg
 */
const callIfFunction = (arg) => (typeof arg === 'function' ? arg() : arg);

const hasToPromiseFn = (arg) => arg && typeof arg.toPromise === 'function';

const asPromise = (arg) => (hasToPromiseFn(arg) ? arg.toPromise() : Promise.resolve(arg));

const isPromise = (arg) => arg && Promise.resolve(arg) === arg;

const defaultParams = {
  title: '',
  titleText: '',
  text: '',
  html: '',
  footer: '',
  icon: undefined,
  iconColor: undefined,
  iconHtml: undefined,
  template: undefined,
  toast: false,
  showClass: {
    popup: 'swal2-show',
    backdrop: 'swal2-backdrop-show',
    icon: 'swal2-icon-show',
  },
  hideClass: {
    popup: 'swal2-hide',
    backdrop: 'swal2-backdrop-hide',
    icon: 'swal2-icon-hide',
  },
  customClass: {},
  target: 'body',
  color: undefined,
  backdrop: true,
  heightAuto: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  allowEnterKey: true,
  stopKeydownPropagation: true,
  keydownListenerCapture: false,
  showConfirmButton: true,
  showDenyButton: false,
  showCancelButton: false,
  preConfirm: undefined,
  preDeny: undefined,
  confirmButtonText: 'OK',
  confirmButtonAriaLabel: '',
  confirmButtonColor: undefined,
  denyButtonText: 'No',
  denyButtonAriaLabel: '',
  denyButtonColor: undefined,
  cancelButtonText: 'Cancel',
  cancelButtonAriaLabel: '',
  cancelButtonColor: undefined,
  buttonsStyling: true,
  reverseButtons: false,
  focusConfirm: true,
  focusDeny: false,
  focusCancel: false,
  returnFocus: true,
  showCloseButton: false,
  closeButtonHtml: '&times;',
  closeButtonAriaLabel: 'Close this dialog',
  loaderHtml: '',
  showLoaderOnConfirm: false,
  showLoaderOnDeny: false,
  imageUrl: undefined,
  imageWidth: undefined,
  imageHeight: undefined,
  imageAlt: '',
  timer: undefined,
  timerProgressBar: false,
  width: undefined,
  padding: undefined,
  background: undefined,
  input: undefined,
  inputPlaceholder: '',
  inputLabel: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputAttributes: {},
  inputValidator: undefined,
  returnInputValueOnDeny: false,
  validationMessage: undefined,
  grow: false,
  position: 'center',
  progressSteps: [],
  currentProgressStep: undefined,
  progressStepsDistance: undefined,
  willOpen: undefined,
  didOpen: undefined,
  didRender: undefined,
  willClose: undefined,
  didClose: undefined,
  didDestroy: undefined,
  scrollbarPadding: true,
};

const updatableParams = [
  'allowEscapeKey',
  'allowOutsideClick',
  'background',
  'buttonsStyling',
  'cancelButtonAriaLabel',
  'cancelButtonColor',
  'cancelButtonText',
  'closeButtonAriaLabel',
  'closeButtonHtml',
  'color',
  'confirmButtonAriaLabel',
  'confirmButtonColor',
  'confirmButtonText',
  'currentProgressStep',
  'customClass',
  'denyButtonAriaLabel',
  'denyButtonColor',
  'denyButtonText',
  'didClose',
  'didDestroy',
  'footer',
  'hideClass',
  'html',
  'icon',
  'iconColor',
  'iconHtml',
  'imageAlt',
  'imageHeight',
  'imageUrl',
  'imageWidth',
  'preConfirm',
  'preDeny',
  'progressSteps',
  'returnFocus',
  'reverseButtons',
  'showCancelButton',
  'showCloseButton',
  'showConfirmButton',
  'showDenyButton',
  'text',
  'title',
  'titleText',
  'willClose',
];

const deprecatedParams = {};

const toastIncompatibleParams = [
  'allowOutsideClick',
  'allowEnterKey',
  'backdrop',
  'focusConfirm',
  'focusDeny',
  'focusCancel',
  'returnFocus',
  'heightAuto',
  'keydownListenerCapture',
];

/**
 * Is valid parameter
 * @param {string} paramName
 */
const isValidParameter = (paramName) => {
  return Object.prototype.hasOwnProperty.call(defaultParams, paramName)
};

/**
 * Is valid parameter for Swal.update() method
 * @param {string} paramName
 */
const isUpdatableParameter = (paramName) => {
  return updatableParams.indexOf(paramName) !== -1
};

/**
 * Is deprecated parameter
 * @param {string} paramName
 */
const isDeprecatedParameter = (paramName) => {
  return deprecatedParams[paramName]
};

const checkIfParamIsValid = (param) => {
  if (!isValidParameter(param)) {
    warn(`Unknown parameter "${param}"`);
  }
};

const checkIfToastParamIsValid = (param) => {
  if (toastIncompatibleParams.includes(param)) {
    warn(`The parameter "${param}" is incompatible with toasts`);
  }
};

const checkIfParamIsDeprecated = (param) => {
  if (isDeprecatedParameter(param)) {
    warnAboutDeprecation(param, isDeprecatedParameter(param));
  }
};

/**
 * Show relevant warnings for given params
 *
 * @param params
 */
const showWarningsForParams = (params) => {
  if (!params.backdrop && params.allowOutsideClick) {
    warn('"allowOutsideClick" parameter requires `backdrop` parameter to be set to `true`');
  }

  for (const param in params) {
    checkIfParamIsValid(param);

    if (params.toast) {
      checkIfToastParamIsValid(param);
    }

    checkIfParamIsDeprecated(param);
  }
};

const swalPrefix = 'swal2-';

const prefix = (items) => {
  const result = {};
  for (const i in items) {
    result[items[i]] = swalPrefix + items[i];
  }
  return result
};

const swalClasses = prefix([
  'container',
  'shown',
  'height-auto',
  'iosfix',
  'popup',
  'modal',
  'no-backdrop',
  'no-transition',
  'toast',
  'toast-shown',
  'show',
  'hide',
  'close',
  'title',
  'html-container',
  'actions',
  'confirm',
  'deny',
  'cancel',
  'default-outline',
  'footer',
  'icon',
  'icon-content',
  'image',
  'input',
  'file',
  'range',
  'select',
  'radio',
  'checkbox',
  'label',
  'textarea',
  'inputerror',
  'input-label',
  'validation-message',
  'progress-steps',
  'active-progress-step',
  'progress-step',
  'progress-step-line',
  'loader',
  'loading',
  'styled',
  'top',
  'top-start',
  'top-end',
  'top-left',
  'top-right',
  'center',
  'center-start',
  'center-end',
  'center-left',
  'center-right',
  'bottom',
  'bottom-start',
  'bottom-end',
  'bottom-left',
  'bottom-right',
  'grow-row',
  'grow-column',
  'grow-fullscreen',
  'rtl',
  'timer-progress-bar',
  'timer-progress-bar-container',
  'scrollbar-measure',
  'icon-success',
  'icon-warning',
  'icon-info',
  'icon-question',
  'icon-error',
]);

const iconTypes = prefix(['success', 'warning', 'info', 'question', 'error']);

/**
 * Gets the popup container which contains the backdrop and the popup itself.
 *
 * @returns {HTMLElement | null}
 */
const getContainer = () => document.body.querySelector(`.${swalClasses.container}`);

const elementBySelector = (selectorString) => {
  const container = getContainer();
  return container ? container.querySelector(selectorString) : null
};

const elementByClass = (className) => {
  return elementBySelector(`.${className}`)
};

const getPopup = () => elementByClass(swalClasses.popup);

const getIcon = () => elementByClass(swalClasses.icon);

const getTitle = () => elementByClass(swalClasses.title);

const getHtmlContainer = () => elementByClass(swalClasses['html-container']);

const getImage = () => elementByClass(swalClasses.image);

const getProgressSteps$1 = () => elementByClass(swalClasses['progress-steps']);

const getValidationMessage = () => elementByClass(swalClasses['validation-message']);

const getConfirmButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.confirm}`);

const getDenyButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.deny}`);

const getInputLabel = () => elementByClass(swalClasses['input-label']);

const getLoader = () => elementBySelector(`.${swalClasses.loader}`);

const getCancelButton = () => elementBySelector(`.${swalClasses.actions} .${swalClasses.cancel}`);

const getActions = () => elementByClass(swalClasses.actions);

const getFooter = () => elementByClass(swalClasses.footer);

const getTimerProgressBar = () => elementByClass(swalClasses['timer-progress-bar']);

const getCloseButton = () => elementByClass(swalClasses.close);

// https://github.com/jkup/focusable/blob/master/index.js
const focusable = `
  a[href],
  area[href],
  input:not([disabled]),
  select:not([disabled]),
  textarea:not([disabled]),
  button:not([disabled]),
  iframe,
  object,
  embed,
  [tabindex="0"],
  [contenteditable],
  audio[controls],
  video[controls],
  summary
`;

const getFocusableElements = () => {
  const focusableElementsWithTabindex = toArray(
    getPopup().querySelectorAll('[tabindex]:not([tabindex="-1"]):not([tabindex="0"])')
  )
    // sort according to tabindex
    .sort((a, b) => {
      const tabindexA = parseInt(a.getAttribute('tabindex'));
      const tabindexB = parseInt(b.getAttribute('tabindex'));
      if (tabindexA > tabindexB) {
        return 1
      } else if (tabindexA < tabindexB) {
        return -1
      }
      return 0
    });

  const otherFocusableElements = toArray(getPopup().querySelectorAll(focusable)).filter(
    (el) => el.getAttribute('tabindex') !== '-1'
  );

  return uniqueArray(focusableElementsWithTabindex.concat(otherFocusableElements)).filter((el) => isVisible$1(el))
};

const isModal = () => {
  return (
    hasClass(document.body, swalClasses.shown) &&
    !hasClass(document.body, swalClasses['toast-shown']) &&
    !hasClass(document.body, swalClasses['no-backdrop'])
  )
};

const isToast = () => {
  return getPopup() && hasClass(getPopup(), swalClasses.toast)
};

const isLoading = () => {
  return getPopup().hasAttribute('data-loading')
};

// Remember state in cases where opening and handling a modal will fiddle with it.
const states = {
  previousBodyPadding: null,
};

/**
 * Securely set innerHTML of an element
 * https://github.com/sweetalert2/sweetalert2/issues/1926
 *
 * @param {HTMLElement} elem
 * @param {string} html
 */
const setInnerHtml = (elem, html) => {
  elem.textContent = '';
  if (html) {
    const parser = new DOMParser();
    const parsed = parser.parseFromString(html, `text/html`);
    toArray(parsed.querySelector('head').childNodes).forEach((child) => {
      elem.appendChild(child);
    });
    toArray(parsed.querySelector('body').childNodes).forEach((child) => {
      elem.appendChild(child);
    });
  }
};

/**
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {boolean}
 */
const hasClass = (elem, className) => {
  if (!className) {
    return false
  }
  const classList = className.split(/\s+/);
  for (let i = 0; i < classList.length; i++) {
    if (!elem.classList.contains(classList[i])) {
      return false
    }
  }
  return true
};

const removeCustomClasses = (elem, params) => {
  toArray(elem.classList).forEach((className) => {
    if (
      !Object.values(swalClasses).includes(className) &&
      !Object.values(iconTypes).includes(className) &&
      !Object.values(params.showClass).includes(className)
    ) {
      elem.classList.remove(className);
    }
  });
};

const applyCustomClass = (elem, params, className) => {
  removeCustomClasses(elem, params);

  if (params.customClass && params.customClass[className]) {
    if (typeof params.customClass[className] !== 'string' && !params.customClass[className].forEach) {
      return warn(
        `Invalid type of customClass.${className}! Expected string or iterable object, got "${typeof params.customClass[
          className
        ]}"`
      )
    }

    addClass(elem, params.customClass[className]);
  }
};

/**
 * @param {HTMLElement} popup
 * @param {string} inputType
 * @returns {HTMLInputElement | null}
 */
const getInput$1 = (popup, inputType) => {
  if (!inputType) {
    return null
  }
  switch (inputType) {
    case 'select':
    case 'textarea':
    case 'file':
      return popup.querySelector(`.${swalClasses.popup} > .${swalClasses[inputType]}`)
    case 'checkbox':
      return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.checkbox} input`)
    case 'radio':
      return (
        popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:checked`) ||
        popup.querySelector(`.${swalClasses.popup} > .${swalClasses.radio} input:first-child`)
      )
    case 'range':
      return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.range} input`)
    default:
      return popup.querySelector(`.${swalClasses.popup} > .${swalClasses.input}`)
  }
};

/**
 * @param {HTMLInputElement} input
 */
const focusInput = (input) => {
  input.focus();

  // place cursor at end of text in text input
  if (input.type !== 'file') {
    // http://stackoverflow.com/a/2345915
    const val = input.value;
    input.value = '';
    input.value = val;
  }
};

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[]} classList
 * @param {boolean} condition
 */
const toggleClass = (target, classList, condition) => {
  if (!target || !classList) {
    return
  }
  if (typeof classList === 'string') {
    classList = classList.split(/\s+/).filter(Boolean);
  }
  classList.forEach((className) => {
    if (Array.isArray(target)) {
      target.forEach((elem) => {
        condition ? elem.classList.add(className) : elem.classList.remove(className);
      });
    } else {
      condition ? target.classList.add(className) : target.classList.remove(className);
    }
  });
};

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[]} classList
 */
const addClass = (target, classList) => {
  toggleClass(target, classList, true);
};

/**
 * @param {HTMLElement | HTMLElement[] | null} target
 * @param {string | string[]} classList
 */
const removeClass = (target, classList) => {
  toggleClass(target, classList, false);
};

/**
 * Get direct child of an element by class name
 *
 * @param {HTMLElement} elem
 * @param {string} className
 * @returns {HTMLElement | null}
 */
const getDirectChildByClass = (elem, className) => {
  const childNodes = toArray(elem.childNodes);
  for (let i = 0; i < childNodes.length; i++) {
    if (hasClass(childNodes[i], className)) {
      return childNodes[i]
    }
  }
};

/**
 * @param {HTMLElement} elem
 * @param {string} property
 * @param {*} value
 */
const applyNumericalStyle = (elem, property, value) => {
  if (value === `${parseInt(value)}`) {
    value = parseInt(value);
  }
  if (value || parseInt(value) === 0) {
    elem.style[property] = typeof value === 'number' ? `${value}px` : value;
  } else {
    elem.style.removeProperty(property);
  }
};

/**
 * @param {HTMLElement} elem
 * @param {string} display
 */
const show = (elem, display = 'flex') => {
  elem.style.display = display;
};

/**
 * @param {HTMLElement} elem
 */
const hide = (elem) => {
  elem.style.display = 'none';
};

const setStyle = (parent, selector, property, value) => {
  const el = parent.querySelector(selector);
  if (el) {
    el.style[property] = value;
  }
};

const toggle = (elem, condition, display) => {
  condition ? show(elem, display) : hide(elem);
};

// borrowed from jquery $(elem).is(':visible') implementation
const isVisible$1 = (elem) => !!(elem && (elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));

const allButtonsAreHidden = () =>
  !isVisible$1(getConfirmButton()) && !isVisible$1(getDenyButton()) && !isVisible$1(getCancelButton());

const isScrollable = (elem) => !!(elem.scrollHeight > elem.clientHeight);

// borrowed from https://stackoverflow.com/a/46352119
const hasCssAnimation = (elem) => {
  const style = window.getComputedStyle(elem);

  const animDuration = parseFloat(style.getPropertyValue('animation-duration') || '0');
  const transDuration = parseFloat(style.getPropertyValue('transition-duration') || '0');

  return animDuration > 0 || transDuration > 0
};

const animateTimerProgressBar = (timer, reset = false) => {
  const timerProgressBar = getTimerProgressBar();
  if (isVisible$1(timerProgressBar)) {
    if (reset) {
      timerProgressBar.style.transition = 'none';
      timerProgressBar.style.width = '100%';
    }
    setTimeout(() => {
      timerProgressBar.style.transition = `width ${timer / 1000}s linear`;
      timerProgressBar.style.width = '0%';
    }, 10);
  }
};

const stopTimerProgressBar = () => {
  const timerProgressBar = getTimerProgressBar();
  const timerProgressBarWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
  timerProgressBar.style.removeProperty('transition');
  timerProgressBar.style.width = '100%';
  const timerProgressBarFullWidth = parseInt(window.getComputedStyle(timerProgressBar).width);
  const timerProgressBarPercent = (timerProgressBarWidth / timerProgressBarFullWidth) * 100;
  timerProgressBar.style.removeProperty('transition');
  timerProgressBar.style.width = `${timerProgressBarPercent}%`;
};

/**
 * Detect Node env
 *
 * @returns {boolean}
 */
const isNodeEnv = () => typeof window === 'undefined' || typeof document === 'undefined';

const RESTORE_FOCUS_TIMEOUT = 100;

const globalState = {};

const focusPreviousActiveElement = () => {
  if (globalState.previousActiveElement && globalState.previousActiveElement.focus) {
    globalState.previousActiveElement.focus();
    globalState.previousActiveElement = null;
  } else if (document.body) {
    document.body.focus();
  }
};

// Restore previous active (focused) element
const restoreActiveElement = (returnFocus) => {
  return new Promise((resolve) => {
    if (!returnFocus) {
      return resolve()
    }
    const x = window.scrollX;
    const y = window.scrollY;

    globalState.restoreFocusTimeout = setTimeout(() => {
      focusPreviousActiveElement();
      resolve();
    }, RESTORE_FOCUS_TIMEOUT); // issues/900

    window.scrollTo(x, y);
  })
};

const sweetHTML = `
 <div aria-labelledby="${swalClasses.title}" aria-describedby="${swalClasses['html-container']}" class="${swalClasses.popup}" tabindex="-1">
   <button type="button" class="${swalClasses.close}"></button>
   <ul class="${swalClasses['progress-steps']}"></ul>
   <div class="${swalClasses.icon}"></div>
   <img class="${swalClasses.image}" />
   <h2 class="${swalClasses.title}" id="${swalClasses.title}"></h2>
   <div class="${swalClasses['html-container']}" id="${swalClasses['html-container']}"></div>
   <input class="${swalClasses.input}" />
   <input type="file" class="${swalClasses.file}" />
   <div class="${swalClasses.range}">
     <input type="range" />
     <output></output>
   </div>
   <select class="${swalClasses.select}"></select>
   <div class="${swalClasses.radio}"></div>
   <label for="${swalClasses.checkbox}" class="${swalClasses.checkbox}">
     <input type="checkbox" />
     <span class="${swalClasses.label}"></span>
   </label>
   <textarea class="${swalClasses.textarea}"></textarea>
   <div class="${swalClasses['validation-message']}" id="${swalClasses['validation-message']}"></div>
   <div class="${swalClasses.actions}">
     <div class="${swalClasses.loader}"></div>
     <button type="button" class="${swalClasses.confirm}"></button>
     <button type="button" class="${swalClasses.deny}"></button>
     <button type="button" class="${swalClasses.cancel}"></button>
   </div>
   <div class="${swalClasses.footer}"></div>
   <div class="${swalClasses['timer-progress-bar-container']}">
     <div class="${swalClasses['timer-progress-bar']}"></div>
   </div>
 </div>
`.replace(/(^|\n)\s*/g, '');

const resetOldContainer = () => {
  const oldContainer = getContainer();
  if (!oldContainer) {
    return false
  }

  oldContainer.remove();
  removeClass(
    [document.documentElement, document.body],
    [swalClasses['no-backdrop'], swalClasses['toast-shown'], swalClasses['has-column']]
  );

  return true
};

const resetValidationMessage$1 = () => {
  globalState.currentInstance.resetValidationMessage();
};

const addInputChangeListeners = () => {
  const popup = getPopup();

  const input = getDirectChildByClass(popup, swalClasses.input);
  const file = getDirectChildByClass(popup, swalClasses.file);
  const range = popup.querySelector(`.${swalClasses.range} input`);
  const rangeOutput = popup.querySelector(`.${swalClasses.range} output`);
  const select = getDirectChildByClass(popup, swalClasses.select);
  const checkbox = popup.querySelector(`.${swalClasses.checkbox} input`);
  const textarea = getDirectChildByClass(popup, swalClasses.textarea);

  input.oninput = resetValidationMessage$1;
  file.onchange = resetValidationMessage$1;
  select.onchange = resetValidationMessage$1;
  checkbox.onchange = resetValidationMessage$1;
  textarea.oninput = resetValidationMessage$1;

  range.oninput = () => {
    resetValidationMessage$1();
    rangeOutput.value = range.value;
  };

  range.onchange = () => {
    resetValidationMessage$1();
    range.nextSibling.value = range.value;
  };
};

const getTarget = (target) => (typeof target === 'string' ? document.querySelector(target) : target);

const setupAccessibility = (params) => {
  const popup = getPopup();

  popup.setAttribute('role', params.toast ? 'alert' : 'dialog');
  popup.setAttribute('aria-live', params.toast ? 'polite' : 'assertive');
  if (!params.toast) {
    popup.setAttribute('aria-modal', 'true');
  }
};

const setupRTL = (targetElement) => {
  if (window.getComputedStyle(targetElement).direction === 'rtl') {
    addClass(getContainer(), swalClasses.rtl);
  }
};

/*
 * Add modal + backdrop to DOM
 */
const init$1 = (params) => {
  // Clean up the old popup container if it exists
  const oldContainerExisted = resetOldContainer();

  /* istanbul ignore if */
  if (isNodeEnv()) {
    error('SweetAlert2 requires document to initialize');
    return
  }

  const container = document.createElement('div');
  container.className = swalClasses.container;
  if (oldContainerExisted) {
    addClass(container, swalClasses['no-transition']);
  }
  setInnerHtml(container, sweetHTML);

  const targetElement = getTarget(params.target);
  targetElement.appendChild(container);

  setupAccessibility(params);
  setupRTL(targetElement);
  addInputChangeListeners();
};

/**
 * @param {HTMLElement | object | string} param
 * @param {HTMLElement} target
 */
const parseHtmlToContainer = (param, target) => {
  // DOM element
  if (param instanceof HTMLElement) {
    target.appendChild(param);
  }

  // Object
  else if (typeof param === 'object') {
    handleObject(param, target);
  }

  // Plain string
  else if (param) {
    setInnerHtml(target, param);
  }
};

/**
 * @param {object} param
 * @param {HTMLElement} target
 */
const handleObject = (param, target) => {
  // JQuery element(s)
  if (param.jquery) {
    handleJqueryElem(target, param);
  }

  // For other objects use their string representation
  else {
    setInnerHtml(target, param.toString());
  }
};

const handleJqueryElem = (target, elem) => {
  target.textContent = '';
  if (0 in elem) {
    for (let i = 0; i in elem; i++) {
      target.appendChild(elem[i].cloneNode(true));
    }
  } else {
    target.appendChild(elem.cloneNode(true));
  }
};

const animationEndEvent = (() => {
  // Prevent run in Node env
  /* istanbul ignore if */
  if (isNodeEnv()) {
    return false
  }

  const testEl = document.createElement('div');
  const transEndEventNames = {
    WebkitAnimation: 'webkitAnimationEnd', // Chrome, Safari and Opera
    animation: 'animationend', // Standard syntax
  };
  for (const i in transEndEventNames) {
    if (Object.prototype.hasOwnProperty.call(transEndEventNames, i) && typeof testEl.style[i] !== 'undefined') {
      return transEndEventNames[i]
    }
  }

  return false
})();

// Measure scrollbar width for padding body during modal show/hide
// https://github.com/twbs/bootstrap/blob/master/js/src/modal.js
const measureScrollbar = () => {
  const scrollDiv = document.createElement('div');
  scrollDiv.className = swalClasses['scrollbar-measure'];
  document.body.appendChild(scrollDiv);
  const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);
  return scrollbarWidth
};

const renderActions = (instance, params) => {
  const actions = getActions();
  const loader = getLoader();

  // Actions (buttons) wrapper
  if (!params.showConfirmButton && !params.showDenyButton && !params.showCancelButton) {
    hide(actions);
  } else {
    show(actions);
  }

  // Custom class
  applyCustomClass(actions, params, 'actions');

  // Render all the buttons
  renderButtons(actions, loader, params);

  // Loader
  setInnerHtml(loader, params.loaderHtml);
  applyCustomClass(loader, params, 'loader');
};

function renderButtons(actions, loader, params) {
  const confirmButton = getConfirmButton();
  const denyButton = getDenyButton();
  const cancelButton = getCancelButton();

  // Render buttons
  renderButton(confirmButton, 'confirm', params);
  renderButton(denyButton, 'deny', params);
  renderButton(cancelButton, 'cancel', params);
  handleButtonsStyling(confirmButton, denyButton, cancelButton, params);

  if (params.reverseButtons) {
    if (params.toast) {
      actions.insertBefore(cancelButton, confirmButton);
      actions.insertBefore(denyButton, confirmButton);
    } else {
      actions.insertBefore(cancelButton, loader);
      actions.insertBefore(denyButton, loader);
      actions.insertBefore(confirmButton, loader);
    }
  }
}

function handleButtonsStyling(confirmButton, denyButton, cancelButton, params) {
  if (!params.buttonsStyling) {
    return removeClass([confirmButton, denyButton, cancelButton], swalClasses.styled)
  }

  addClass([confirmButton, denyButton, cancelButton], swalClasses.styled);

  // Buttons background colors
  if (params.confirmButtonColor) {
    confirmButton.style.backgroundColor = params.confirmButtonColor;
    addClass(confirmButton, swalClasses['default-outline']);
  }
  if (params.denyButtonColor) {
    denyButton.style.backgroundColor = params.denyButtonColor;
    addClass(denyButton, swalClasses['default-outline']);
  }
  if (params.cancelButtonColor) {
    cancelButton.style.backgroundColor = params.cancelButtonColor;
    addClass(cancelButton, swalClasses['default-outline']);
  }
}

function renderButton(button, buttonType, params) {
  toggle(button, params[`show${capitalizeFirstLetter(buttonType)}Button`], 'inline-block');
  setInnerHtml(button, params[`${buttonType}ButtonText`]); // Set caption text
  button.setAttribute('aria-label', params[`${buttonType}ButtonAriaLabel`]); // ARIA label

  // Add buttons custom classes
  button.className = swalClasses[buttonType];
  applyCustomClass(button, params, `${buttonType}Button`);
  addClass(button, params[`${buttonType}ButtonClass`]);
}

function handleBackdropParam(container, backdrop) {
  if (typeof backdrop === 'string') {
    container.style.background = backdrop;
  } else if (!backdrop) {
    addClass([document.documentElement, document.body], swalClasses['no-backdrop']);
  }
}

function handlePositionParam(container, position) {
  if (position in swalClasses) {
    addClass(container, swalClasses[position]);
  } else {
    warn('The "position" parameter is not valid, defaulting to "center"');
    addClass(container, swalClasses.center);
  }
}

function handleGrowParam(container, grow) {
  if (grow && typeof grow === 'string') {
    const growClass = `grow-${grow}`;
    if (growClass in swalClasses) {
      addClass(container, swalClasses[growClass]);
    }
  }
}

const renderContainer = (instance, params) => {
  const container = getContainer();

  if (!container) {
    return
  }

  handleBackdropParam(container, params.backdrop);

  handlePositionParam(container, params.position);
  handleGrowParam(container, params.grow);

  // Custom class
  applyCustomClass(container, params, 'container');
};

/**
 * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

var privateProps = {
  awaitingPromise: new WeakMap(),
  promise: new WeakMap(),
  innerParams: new WeakMap(),
  domCache: new WeakMap(),
};

const inputTypes = ['input', 'file', 'range', 'select', 'radio', 'checkbox', 'textarea'];

const renderInput = (instance, params) => {
  const popup = getPopup();
  const innerParams = privateProps.innerParams.get(instance);
  const rerender = !innerParams || params.input !== innerParams.input;

  inputTypes.forEach((inputType) => {
    const inputClass = swalClasses[inputType];
    const inputContainer = getDirectChildByClass(popup, inputClass);

    // set attributes
    setAttributes(inputType, params.inputAttributes);

    // set class
    inputContainer.className = inputClass;

    if (rerender) {
      hide(inputContainer);
    }
  });

  if (params.input) {
    if (rerender) {
      showInput(params);
    }
    // set custom class
    setCustomClass(params);
  }
};

const showInput = (params) => {
  if (!renderInputType[params.input]) {
    return error(
      `Unexpected type of input! Expected "text", "email", "password", "number", "tel", "select", "radio", "checkbox", "textarea", "file" or "url", got "${params.input}"`
    )
  }

  const inputContainer = getInputContainer(params.input);
  const input = renderInputType[params.input](inputContainer, params);
  show(input);

  // input autofocus
  setTimeout(() => {
    focusInput(input);
  });
};

const removeAttributes = (input) => {
  for (let i = 0; i < input.attributes.length; i++) {
    const attrName = input.attributes[i].name;
    if (!['type', 'value', 'style'].includes(attrName)) {
      input.removeAttribute(attrName);
    }
  }
};

const setAttributes = (inputType, inputAttributes) => {
  const input = getInput$1(getPopup(), inputType);
  if (!input) {
    return
  }

  removeAttributes(input);

  for (const attr in inputAttributes) {
    input.setAttribute(attr, inputAttributes[attr]);
  }
};

const setCustomClass = (params) => {
  const inputContainer = getInputContainer(params.input);
  if (params.customClass) {
    addClass(inputContainer, params.customClass.input);
  }
};

const setInputPlaceholder = (input, params) => {
  if (!input.placeholder || params.inputPlaceholder) {
    input.placeholder = params.inputPlaceholder;
  }
};

const setInputLabel = (input, prependTo, params) => {
  if (params.inputLabel) {
    input.id = swalClasses.input;
    const label = document.createElement('label');
    const labelClass = swalClasses['input-label'];
    label.setAttribute('for', input.id);
    label.className = labelClass;
    addClass(label, params.customClass.inputLabel);
    label.innerText = params.inputLabel;
    prependTo.insertAdjacentElement('beforebegin', label);
  }
};

const getInputContainer = (inputType) => {
  const inputClass = swalClasses[inputType] ? swalClasses[inputType] : swalClasses.input;
  return getDirectChildByClass(getPopup(), inputClass)
};

const renderInputType = {};

renderInputType.text =
  renderInputType.email =
  renderInputType.password =
  renderInputType.number =
  renderInputType.tel =
  renderInputType.url =
    (input, params) => {
      if (typeof params.inputValue === 'string' || typeof params.inputValue === 'number') {
        input.value = params.inputValue;
      } else if (!isPromise(params.inputValue)) {
        warn(
          `Unexpected type of inputValue! Expected "string", "number" or "Promise", got "${typeof params.inputValue}"`
        );
      }
      setInputLabel(input, input, params);
      setInputPlaceholder(input, params);
      input.type = params.input;
      return input
    };

renderInputType.file = (input, params) => {
  setInputLabel(input, input, params);
  setInputPlaceholder(input, params);
  return input
};

renderInputType.range = (range, params) => {
  const rangeInput = range.querySelector('input');
  const rangeOutput = range.querySelector('output');
  rangeInput.value = params.inputValue;
  rangeInput.type = params.input;
  rangeOutput.value = params.inputValue;
  setInputLabel(rangeInput, range, params);
  return range
};

renderInputType.select = (select, params) => {
  select.textContent = '';
  if (params.inputPlaceholder) {
    const placeholder = document.createElement('option');
    setInnerHtml(placeholder, params.inputPlaceholder);
    placeholder.value = '';
    placeholder.disabled = true;
    placeholder.selected = true;
    select.appendChild(placeholder);
  }
  setInputLabel(select, select, params);
  return select
};

renderInputType.radio = (radio) => {
  radio.textContent = '';
  return radio
};

renderInputType.checkbox = (checkboxContainer, params) => {
  /** @type {HTMLInputElement} */
  const checkbox = getInput$1(getPopup(), 'checkbox');
  checkbox.value = '1';
  checkbox.id = swalClasses.checkbox;
  checkbox.checked = Boolean(params.inputValue);
  const label = checkboxContainer.querySelector('span');
  setInnerHtml(label, params.inputPlaceholder);
  return checkboxContainer
};

renderInputType.textarea = (textarea, params) => {
  textarea.value = params.inputValue;
  setInputPlaceholder(textarea, params);
  setInputLabel(textarea, textarea, params);

  const getMargin = (el) =>
    parseInt(window.getComputedStyle(el).marginLeft) + parseInt(window.getComputedStyle(el).marginRight);

  // https://github.com/sweetalert2/sweetalert2/issues/2291
  setTimeout(() => {
    // https://github.com/sweetalert2/sweetalert2/issues/1699
    if ('MutationObserver' in window) {
      const initialPopupWidth = parseInt(window.getComputedStyle(getPopup()).width);
      const textareaResizeHandler = () => {
        const textareaWidth = textarea.offsetWidth + getMargin(textarea);
        if (textareaWidth > initialPopupWidth) {
          getPopup().style.width = `${textareaWidth}px`;
        } else {
          getPopup().style.width = null;
        }
      };
      new MutationObserver(textareaResizeHandler).observe(textarea, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }
  });

  return textarea
};

const renderContent = (instance, params) => {
  const htmlContainer = getHtmlContainer();

  applyCustomClass(htmlContainer, params, 'htmlContainer');

  // Content as HTML
  if (params.html) {
    parseHtmlToContainer(params.html, htmlContainer);
    show(htmlContainer, 'block');
  }

  // Content as plain text
  else if (params.text) {
    htmlContainer.textContent = params.text;
    show(htmlContainer, 'block');
  }

  // No content
  else {
    hide(htmlContainer);
  }

  renderInput(instance, params);
};

const renderFooter = (instance, params) => {
  const footer = getFooter();

  toggle(footer, params.footer);

  if (params.footer) {
    parseHtmlToContainer(params.footer, footer);
  }

  // Custom class
  applyCustomClass(footer, params, 'footer');
};

const renderCloseButton = (instance, params) => {
  const closeButton = getCloseButton();

  setInnerHtml(closeButton, params.closeButtonHtml);

  // Custom class
  applyCustomClass(closeButton, params, 'closeButton');

  toggle(closeButton, params.showCloseButton);
  closeButton.setAttribute('aria-label', params.closeButtonAriaLabel);
};

const renderIcon = (instance, params) => {
  const innerParams = privateProps.innerParams.get(instance);
  const icon = getIcon();

  // if the given icon already rendered, apply the styling without re-rendering the icon
  if (innerParams && params.icon === innerParams.icon) {
    // Custom or default content
    setContent(icon, params);

    applyStyles(icon, params);
    return
  }

  if (!params.icon && !params.iconHtml) {
    return hide(icon)
  }

  if (params.icon && Object.keys(iconTypes).indexOf(params.icon) === -1) {
    error(`Unknown icon! Expected "success", "error", "warning", "info" or "question", got "${params.icon}"`);
    return hide(icon)
  }

  show(icon);

  // Custom or default content
  setContent(icon, params);

  applyStyles(icon, params);

  // Animate icon
  addClass(icon, params.showClass.icon);
};

const applyStyles = (icon, params) => {
  for (const iconType in iconTypes) {
    if (params.icon !== iconType) {
      removeClass(icon, iconTypes[iconType]);
    }
  }
  addClass(icon, iconTypes[params.icon]);

  // Icon color
  setColor(icon, params);

  // Success icon background color
  adjustSuccessIconBackgroundColor();

  // Custom class
  applyCustomClass(icon, params, 'icon');
};

// Adjust success icon background color to match the popup background color
const adjustSuccessIconBackgroundColor = () => {
  const popup = getPopup();
  const popupBackgroundColor = window.getComputedStyle(popup).getPropertyValue('background-color');
  const successIconParts = popup.querySelectorAll('[class^=swal2-success-circular-line], .swal2-success-fix');
  for (let i = 0; i < successIconParts.length; i++) {
    successIconParts[i].style.backgroundColor = popupBackgroundColor;
  }
};

const successIconHtml = `
  <div class="swal2-success-circular-line-left"></div>
  <span class="swal2-success-line-tip"></span> <span class="swal2-success-line-long"></span>
  <div class="swal2-success-ring"></div> <div class="swal2-success-fix"></div>
  <div class="swal2-success-circular-line-right"></div>
`;

const errorIconHtml = `
  <span class="swal2-x-mark">
    <span class="swal2-x-mark-line-left"></span>
    <span class="swal2-x-mark-line-right"></span>
  </span>
`;

const setContent = (icon, params) => {
  icon.textContent = '';

  if (params.iconHtml) {
    setInnerHtml(icon, iconContent(params.iconHtml));
  } else if (params.icon === 'success') {
    setInnerHtml(icon, successIconHtml);
  } else if (params.icon === 'error') {
    setInnerHtml(icon, errorIconHtml);
  } else {
    const defaultIconHtml = {
      question: '?',
      warning: '!',
      info: 'i',
    };
    setInnerHtml(icon, iconContent(defaultIconHtml[params.icon]));
  }
};

const setColor = (icon, params) => {
  if (!params.iconColor) {
    return
  }
  icon.style.color = params.iconColor;
  icon.style.borderColor = params.iconColor;
  for (const sel of [
    '.swal2-success-line-tip',
    '.swal2-success-line-long',
    '.swal2-x-mark-line-left',
    '.swal2-x-mark-line-right',
  ]) {
    setStyle(icon, sel, 'backgroundColor', params.iconColor);
  }
  setStyle(icon, '.swal2-success-ring', 'borderColor', params.iconColor);
};

const iconContent = (content) => `<div class="${swalClasses['icon-content']}">${content}</div>`;

const renderImage = (instance, params) => {
  const image = getImage();

  if (!params.imageUrl) {
    return hide(image)
  }

  show(image, '');

  // Src, alt
  image.setAttribute('src', params.imageUrl);
  image.setAttribute('alt', params.imageAlt);

  // Width, height
  applyNumericalStyle(image, 'width', params.imageWidth);
  applyNumericalStyle(image, 'height', params.imageHeight);

  // Class
  image.className = swalClasses.image;
  applyCustomClass(image, params, 'image');
};

const createStepElement = (step) => {
  const stepEl = document.createElement('li');
  addClass(stepEl, swalClasses['progress-step']);
  setInnerHtml(stepEl, step);
  return stepEl
};

const createLineElement = (params) => {
  const lineEl = document.createElement('li');
  addClass(lineEl, swalClasses['progress-step-line']);
  if (params.progressStepsDistance) {
    lineEl.style.width = params.progressStepsDistance;
  }
  return lineEl
};

const renderProgressSteps = (instance, params) => {
  const progressStepsContainer = getProgressSteps$1();
  if (!params.progressSteps || params.progressSteps.length === 0) {
    return hide(progressStepsContainer)
  }

  show(progressStepsContainer);
  progressStepsContainer.textContent = '';
  if (params.currentProgressStep >= params.progressSteps.length) {
    warn(
      'Invalid currentProgressStep parameter, it should be less than progressSteps.length ' +
        '(currentProgressStep like JS arrays starts from 0)'
    );
  }

  params.progressSteps.forEach((step, index) => {
    const stepEl = createStepElement(step);
    progressStepsContainer.appendChild(stepEl);
    if (index === params.currentProgressStep) {
      addClass(stepEl, swalClasses['active-progress-step']);
    }

    if (index !== params.progressSteps.length - 1) {
      const lineEl = createLineElement(params);
      progressStepsContainer.appendChild(lineEl);
    }
  });
};

const renderTitle = (instance, params) => {
  const title = getTitle();

  toggle(title, params.title || params.titleText, 'block');

  if (params.title) {
    parseHtmlToContainer(params.title, title);
  }

  if (params.titleText) {
    title.innerText = params.titleText;
  }

  // Custom class
  applyCustomClass(title, params, 'title');
};

const renderPopup = (instance, params) => {
  const container = getContainer();
  const popup = getPopup();

  // Width
  // https://github.com/sweetalert2/sweetalert2/issues/2170
  if (params.toast) {
    applyNumericalStyle(container, 'width', params.width);
    popup.style.width = '100%';
    popup.insertBefore(getLoader(), getIcon());
  } else {
    applyNumericalStyle(popup, 'width', params.width);
  }

  // Padding
  applyNumericalStyle(popup, 'padding', params.padding);

  // Color
  if (params.color) {
    popup.style.color = params.color;
  }

  // Background
  if (params.background) {
    popup.style.background = params.background;
  }

  hide(getValidationMessage());

  // Classes
  addClasses$1(popup, params);
};

const addClasses$1 = (popup, params) => {
  // Default Class + showClass when updating Swal.update({})
  popup.className = `${swalClasses.popup} ${isVisible$1(popup) ? params.showClass.popup : ''}`;

  if (params.toast) {
    addClass([document.documentElement, document.body], swalClasses['toast-shown']);
    addClass(popup, swalClasses.toast);
  } else {
    addClass(popup, swalClasses.modal);
  }

  // Custom class
  applyCustomClass(popup, params, 'popup');
  if (typeof params.customClass === 'string') {
    addClass(popup, params.customClass);
  }

  // Icon class (#1842)
  if (params.icon) {
    addClass(popup, swalClasses[`icon-${params.icon}`]);
  }
};

const render = (instance, params) => {
  renderPopup(instance, params);
  renderContainer(instance, params);

  renderProgressSteps(instance, params);
  renderIcon(instance, params);
  renderImage(instance, params);
  renderTitle(instance, params);
  renderCloseButton(instance, params);

  renderContent(instance, params);
  renderActions(instance, params);
  renderFooter(instance, params);

  if (typeof params.didRender === 'function') {
    params.didRender(getPopup());
  }
};

const DismissReason = Object.freeze({
  cancel: 'cancel',
  backdrop: 'backdrop',
  close: 'close',
  esc: 'esc',
  timer: 'timer',
});

// From https://developer.paciellogroup.com/blog/2018/06/the-current-state-of-modal-dialog-accessibility/
// Adding aria-hidden="true" to elements outside of the active modal dialog ensures that
// elements not within the active modal dialog will not be surfaced if a user opens a screen
// reader’s list of elements (headings, form controls, landmarks, etc.) in the document.

const setAriaHidden = () => {
  const bodyChildren = toArray(document.body.children);
  bodyChildren.forEach((el) => {
    if (el === getContainer() || el.contains(getContainer())) {
      return
    }

    if (el.hasAttribute('aria-hidden')) {
      el.setAttribute('data-previous-aria-hidden', el.getAttribute('aria-hidden'));
    }
    el.setAttribute('aria-hidden', 'true');
  });
};

const unsetAriaHidden = () => {
  const bodyChildren = toArray(document.body.children);
  bodyChildren.forEach((el) => {
    if (el.hasAttribute('data-previous-aria-hidden')) {
      el.setAttribute('aria-hidden', el.getAttribute('data-previous-aria-hidden'));
      el.removeAttribute('data-previous-aria-hidden');
    } else {
      el.removeAttribute('aria-hidden');
    }
  });
};

const swalStringParams = ['swal-title', 'swal-html', 'swal-footer'];

const getTemplateParams = (params) => {
  const template = typeof params.template === 'string' ? document.querySelector(params.template) : params.template;
  if (!template) {
    return {}
  }
  /** @type {DocumentFragment} */
  const templateContent = template.content;

  showWarningsForElements(templateContent);

  const result = Object.assign(
    getSwalParams(templateContent),
    getSwalButtons(templateContent),
    getSwalImage(templateContent),
    getSwalIcon(templateContent),
    getSwalInput(templateContent),
    getSwalStringParams(templateContent, swalStringParams)
  );
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const getSwalParams = (templateContent) => {
  const result = {};
  toArray(templateContent.querySelectorAll('swal-param')).forEach((param) => {
    showWarningsForAttributes(param, ['name', 'value']);
    const paramName = param.getAttribute('name');
    const value = param.getAttribute('value');
    if (typeof defaultParams[paramName] === 'boolean' && value === 'false') {
      result[paramName] = false;
    }
    if (typeof defaultParams[paramName] === 'object') {
      result[paramName] = JSON.parse(value);
    }
  });
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const getSwalButtons = (templateContent) => {
  const result = {};
  toArray(templateContent.querySelectorAll('swal-button')).forEach((button) => {
    showWarningsForAttributes(button, ['type', 'color', 'aria-label']);
    const type = button.getAttribute('type');
    result[`${type}ButtonText`] = button.innerHTML;
    result[`show${capitalizeFirstLetter(type)}Button`] = true;
    if (button.hasAttribute('color')) {
      result[`${type}ButtonColor`] = button.getAttribute('color');
    }
    if (button.hasAttribute('aria-label')) {
      result[`${type}ButtonAriaLabel`] = button.getAttribute('aria-label');
    }
  });
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const getSwalImage = (templateContent) => {
  const result = {};
  /** @type {HTMLElement} */
  const image = templateContent.querySelector('swal-image');
  if (image) {
    showWarningsForAttributes(image, ['src', 'width', 'height', 'alt']);
    if (image.hasAttribute('src')) {
      result.imageUrl = image.getAttribute('src');
    }
    if (image.hasAttribute('width')) {
      result.imageWidth = image.getAttribute('width');
    }
    if (image.hasAttribute('height')) {
      result.imageHeight = image.getAttribute('height');
    }
    if (image.hasAttribute('alt')) {
      result.imageAlt = image.getAttribute('alt');
    }
  }
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const getSwalIcon = (templateContent) => {
  const result = {};
  /** @type {HTMLElement} */
  const icon = templateContent.querySelector('swal-icon');
  if (icon) {
    showWarningsForAttributes(icon, ['type', 'color']);
    if (icon.hasAttribute('type')) {
      result.icon = icon.getAttribute('type');
    }
    if (icon.hasAttribute('color')) {
      result.iconColor = icon.getAttribute('color');
    }
    result.iconHtml = icon.innerHTML;
  }
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const getSwalInput = (templateContent) => {
  const result = {};
  /** @type {HTMLElement} */
  const input = templateContent.querySelector('swal-input');
  if (input) {
    showWarningsForAttributes(input, ['type', 'label', 'placeholder', 'value']);
    result.input = input.getAttribute('type') || 'text';
    if (input.hasAttribute('label')) {
      result.inputLabel = input.getAttribute('label');
    }
    if (input.hasAttribute('placeholder')) {
      result.inputPlaceholder = input.getAttribute('placeholder');
    }
    if (input.hasAttribute('value')) {
      result.inputValue = input.getAttribute('value');
    }
  }
  const inputOptions = templateContent.querySelectorAll('swal-input-option');
  if (inputOptions.length) {
    result.inputOptions = {};
    toArray(inputOptions).forEach((option) => {
      showWarningsForAttributes(option, ['value']);
      const optionValue = option.getAttribute('value');
      const optionName = option.innerHTML;
      result.inputOptions[optionValue] = optionName;
    });
  }
  return result
};

/**
 * @param {DocumentFragment} templateContent
 * @param {string[]} paramNames
 */
const getSwalStringParams = (templateContent, paramNames) => {
  const result = {};
  for (const i in paramNames) {
    const paramName = paramNames[i];
    /** @type {HTMLElement} */
    const tag = templateContent.querySelector(paramName);
    if (tag) {
      showWarningsForAttributes(tag, []);
      result[paramName.replace(/^swal-/, '')] = tag.innerHTML.trim();
    }
  }
  return result
};

/**
 * @param {DocumentFragment} templateContent
 */
const showWarningsForElements = (templateContent) => {
  const allowedElements = swalStringParams.concat([
    'swal-param',
    'swal-button',
    'swal-image',
    'swal-icon',
    'swal-input',
    'swal-input-option',
  ]);
  toArray(templateContent.children).forEach((el) => {
    const tagName = el.tagName.toLowerCase();
    if (allowedElements.indexOf(tagName) === -1) {
      warn(`Unrecognized element <${tagName}>`);
    }
  });
};

/**
 * @param {HTMLElement} el
 * @param {string[]} allowedAttributes
 */
const showWarningsForAttributes = (el, allowedAttributes) => {
  toArray(el.attributes).forEach((attribute) => {
    if (allowedAttributes.indexOf(attribute.name) === -1) {
      warn([
        `Unrecognized attribute "${attribute.name}" on <${el.tagName.toLowerCase()}>.`,
        `${
          allowedAttributes.length
            ? `Allowed attributes are: ${allowedAttributes.join(', ')}`
            : 'To set the value, use HTML within the element.'
        }`,
      ]);
    }
  });
};

var defaultInputValidators = {
  email: (string, validationMessage) => {
    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string)
      ? Promise.resolve()
      : Promise.resolve(validationMessage || 'Invalid email address')
  },
  url: (string, validationMessage) => {
    // taken from https://stackoverflow.com/a/3809435 with a small change from #1306 and #2013
    return /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-z]{2,63}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)$/.test(string)
      ? Promise.resolve()
      : Promise.resolve(validationMessage || 'Invalid URL')
  },
};

function setDefaultInputValidators(params) {
  // Use default `inputValidator` for supported input types if not provided
  if (!params.inputValidator) {
    Object.keys(defaultInputValidators).forEach((key) => {
      if (params.input === key) {
        params.inputValidator = defaultInputValidators[key];
      }
    });
  }
}

function validateCustomTargetElement(params) {
  // Determine if the custom target element is valid
  if (
    !params.target ||
    (typeof params.target === 'string' && !document.querySelector(params.target)) ||
    (typeof params.target !== 'string' && !params.target.appendChild)
  ) {
    warn('Target parameter is not valid, defaulting to "body"');
    params.target = 'body';
  }
}

/**
 * Set type, text and actions on popup
 *
 * @param params
 */
function setParameters(params) {
  setDefaultInputValidators(params);

  // showLoaderOnConfirm && preConfirm
  if (params.showLoaderOnConfirm && !params.preConfirm) {
    warn(
      'showLoaderOnConfirm is set to true, but preConfirm is not defined.\n' +
        'showLoaderOnConfirm should be used together with preConfirm, see usage example:\n' +
        'https://sweetalert2.github.io/#ajax-request'
    );
  }

  validateCustomTargetElement(params);

  // Replace newlines with <br> in title
  if (typeof params.title === 'string') {
    params.title = params.title.split('\n').join('<br />');
  }

  init$1(params);
}

class Timer {
  constructor(callback, delay) {
    this.callback = callback;
    this.remaining = delay;
    this.running = false;

    this.start();
  }

  start() {
    if (!this.running) {
      this.running = true;
      this.started = new Date();
      this.id = setTimeout(this.callback, this.remaining);
    }
    return this.remaining
  }

  stop() {
    if (this.running) {
      this.running = false;
      clearTimeout(this.id);
      this.remaining -= new Date().getTime() - this.started.getTime();
    }
    return this.remaining
  }

  increase(n) {
    const running = this.running;
    if (running) {
      this.stop();
    }
    this.remaining += n;
    if (running) {
      this.start();
    }
    return this.remaining
  }

  getTimerLeft() {
    if (this.running) {
      this.stop();
      this.start();
    }
    return this.remaining
  }

  isRunning() {
    return this.running
  }
}

const fixScrollbar = () => {
  // for queues, do not do this more than once
  if (states.previousBodyPadding !== null) {
    return
  }
  // if the body has overflow
  if (document.body.scrollHeight > window.innerHeight) {
    // add padding so the content doesn't shift after removal of scrollbar
    states.previousBodyPadding = parseInt(window.getComputedStyle(document.body).getPropertyValue('padding-right'));
    document.body.style.paddingRight = `${states.previousBodyPadding + measureScrollbar()}px`;
  }
};

const undoScrollbar = () => {
  if (states.previousBodyPadding !== null) {
    document.body.style.paddingRight = `${states.previousBodyPadding}px`;
    states.previousBodyPadding = null;
  }
};

/* istanbul ignore file */

// Fix iOS scrolling http://stackoverflow.com/q/39626302

const iOSfix = () => {
  const iOS =
    // @ts-ignore
    (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (iOS && !hasClass(document.body, swalClasses.iosfix)) {
    const offset = document.body.scrollTop;
    document.body.style.top = `${offset * -1}px`;
    addClass(document.body, swalClasses.iosfix);
    lockBodyScroll();
    addBottomPaddingForTallPopups();
  }
};

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1948
 */
const addBottomPaddingForTallPopups = () => {
  const ua = navigator.userAgent;
  const iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i);
  const webkit = !!ua.match(/WebKit/i);
  const iOSSafari = iOS && webkit && !ua.match(/CriOS/i);
  if (iOSSafari) {
    const bottomPanelHeight = 44;
    if (getPopup().scrollHeight > window.innerHeight - bottomPanelHeight) {
      getContainer().style.paddingBottom = `${bottomPanelHeight}px`;
    }
  }
};

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1246
 */
const lockBodyScroll = () => {
  const container = getContainer();
  let preventTouchMove;
  container.ontouchstart = (e) => {
    preventTouchMove = shouldPreventTouchMove(e);
  };
  container.ontouchmove = (e) => {
    if (preventTouchMove) {
      e.preventDefault();
      e.stopPropagation();
    }
  };
};

const shouldPreventTouchMove = (event) => {
  const target = event.target;
  const container = getContainer();
  if (isStylus(event) || isZoom(event)) {
    return false
  }
  if (target === container) {
    return true
  }
  if (
    !isScrollable(container) &&
    target.tagName !== 'INPUT' && // #1603
    target.tagName !== 'TEXTAREA' && // #2266
    !(
      isScrollable(getHtmlContainer()) && // #1944
      getHtmlContainer().contains(target)
    )
  ) {
    return true
  }
  return false
};

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1786
 *
 * @param {*} event
 * @returns {boolean}
 */
const isStylus = (event) => {
  return event.touches && event.touches.length && event.touches[0].touchType === 'stylus'
};

/**
 * https://github.com/sweetalert2/sweetalert2/issues/1891
 *
 * @param {TouchEvent} event
 * @returns {boolean}
 */
const isZoom = (event) => {
  return event.touches && event.touches.length > 1
};

const undoIOSfix = () => {
  if (hasClass(document.body, swalClasses.iosfix)) {
    const offset = parseInt(document.body.style.top, 10);
    removeClass(document.body, swalClasses.iosfix);
    document.body.style.top = '';
    document.body.scrollTop = offset * -1;
  }
};

const SHOW_CLASS_TIMEOUT = 10;

/**
 * Open popup, add necessary classes and styles, fix scrollbar
 *
 * @param params
 */
const openPopup = (params) => {
  const container = getContainer();
  const popup = getPopup();

  if (typeof params.willOpen === 'function') {
    params.willOpen(popup);
  }

  const bodyStyles = window.getComputedStyle(document.body);
  const initialBodyOverflow = bodyStyles.overflowY;
  addClasses(container, popup, params);

  // scrolling is 'hidden' until animation is done, after that 'auto'
  setTimeout(() => {
    setScrollingVisibility(container, popup);
  }, SHOW_CLASS_TIMEOUT);

  if (isModal()) {
    fixScrollContainer(container, params.scrollbarPadding, initialBodyOverflow);
    setAriaHidden();
  }

  if (!isToast() && !globalState.previousActiveElement) {
    globalState.previousActiveElement = document.activeElement;
  }

  if (typeof params.didOpen === 'function') {
    setTimeout(() => params.didOpen(popup));
  }

  removeClass(container, swalClasses['no-transition']);
};

const swalOpenAnimationFinished = (event) => {
  const popup = getPopup();
  if (event.target !== popup) {
    return
  }
  const container = getContainer();
  popup.removeEventListener(animationEndEvent, swalOpenAnimationFinished);
  container.style.overflowY = 'auto';
};

const setScrollingVisibility = (container, popup) => {
  if (animationEndEvent && hasCssAnimation(popup)) {
    container.style.overflowY = 'hidden';
    popup.addEventListener(animationEndEvent, swalOpenAnimationFinished);
  } else {
    container.style.overflowY = 'auto';
  }
};

const fixScrollContainer = (container, scrollbarPadding, initialBodyOverflow) => {
  iOSfix();

  if (scrollbarPadding && initialBodyOverflow !== 'hidden') {
    fixScrollbar();
  }

  // sweetalert2/issues/1247
  setTimeout(() => {
    container.scrollTop = 0;
  });
};

const addClasses = (container, popup, params) => {
  addClass(container, params.showClass.backdrop);
  // this workaround with opacity is needed for https://github.com/sweetalert2/sweetalert2/issues/2059
  popup.style.setProperty('opacity', '0', 'important');
  show(popup, 'grid');
  setTimeout(() => {
    // Animate popup right after showing it
    addClass(popup, params.showClass.popup);
    // and remove the opacity workaround
    popup.style.removeProperty('opacity');
  }, SHOW_CLASS_TIMEOUT); // 10ms in order to fix #2062

  addClass([document.documentElement, document.body], swalClasses.shown);
  if (params.heightAuto && params.backdrop && !params.toast) {
    addClass([document.documentElement, document.body], swalClasses['height-auto']);
  }
};

/**
 * Shows loader (spinner), this is useful with AJAX requests.
 * By default the loader be shown instead of the "Confirm" button.
 */
const showLoading = (buttonToReplace) => {
  let popup = getPopup();
  if (!popup) {
    new Swal(); // eslint-disable-line no-new
  }
  popup = getPopup();
  const loader = getLoader();

  if (isToast()) {
    hide(getIcon());
  } else {
    replaceButton(popup, buttonToReplace);
  }
  show(loader);

  popup.setAttribute('data-loading', true);
  popup.setAttribute('aria-busy', true);
  popup.focus();
};

const replaceButton = (popup, buttonToReplace) => {
  const actions = getActions();
  const loader = getLoader();

  if (!buttonToReplace && isVisible$1(getConfirmButton())) {
    buttonToReplace = getConfirmButton();
  }

  show(actions);
  if (buttonToReplace) {
    hide(buttonToReplace);
    loader.setAttribute('data-button-to-replace', buttonToReplace.className);
  }
  loader.parentNode.insertBefore(loader, buttonToReplace);
  addClass([popup, actions], swalClasses.loading);
};

const handleInputOptionsAndValue = (instance, params) => {
  if (params.input === 'select' || params.input === 'radio') {
    handleInputOptions(instance, params);
  } else if (
    ['text', 'email', 'number', 'tel', 'textarea'].includes(params.input) &&
    (hasToPromiseFn(params.inputValue) || isPromise(params.inputValue))
  ) {
    showLoading(getConfirmButton());
    handleInputValue(instance, params);
  }
};

const getInputValue = (instance, innerParams) => {
  const input = instance.getInput();
  if (!input) {
    return null
  }
  switch (innerParams.input) {
    case 'checkbox':
      return getCheckboxValue(input)
    case 'radio':
      return getRadioValue(input)
    case 'file':
      return getFileValue(input)
    default:
      return innerParams.inputAutoTrim ? input.value.trim() : input.value
  }
};

const getCheckboxValue = (input) => (input.checked ? 1 : 0);

const getRadioValue = (input) => (input.checked ? input.value : null);

const getFileValue = (input) =>
  input.files.length ? (input.getAttribute('multiple') !== null ? input.files : input.files[0]) : null;

const handleInputOptions = (instance, params) => {
  const popup = getPopup();
  const processInputOptions = (inputOptions) =>
    populateInputOptions[params.input](popup, formatInputOptions(inputOptions), params);
  if (hasToPromiseFn(params.inputOptions) || isPromise(params.inputOptions)) {
    showLoading(getConfirmButton());
    asPromise(params.inputOptions).then((inputOptions) => {
      instance.hideLoading();
      processInputOptions(inputOptions);
    });
  } else if (typeof params.inputOptions === 'object') {
    processInputOptions(params.inputOptions);
  } else {
    error(`Unexpected type of inputOptions! Expected object, Map or Promise, got ${typeof params.inputOptions}`);
  }
};

const handleInputValue = (instance, params) => {
  const input = instance.getInput();
  hide(input);
  asPromise(params.inputValue)
    .then((inputValue) => {
      input.value = params.input === 'number' ? parseFloat(inputValue) || 0 : `${inputValue}`;
      show(input);
      input.focus();
      instance.hideLoading();
    })
    .catch((err) => {
      error(`Error in inputValue promise: ${err}`);
      input.value = '';
      show(input);
      input.focus();
      instance.hideLoading();
    });
};

const populateInputOptions = {
  select: (popup, inputOptions, params) => {
    const select = getDirectChildByClass(popup, swalClasses.select);
    const renderOption = (parent, optionLabel, optionValue) => {
      const option = document.createElement('option');
      option.value = optionValue;
      setInnerHtml(option, optionLabel);
      option.selected = isSelected(optionValue, params.inputValue);
      parent.appendChild(option);
    };
    inputOptions.forEach((inputOption) => {
      const optionValue = inputOption[0];
      const optionLabel = inputOption[1];
      // <optgroup> spec:
      // https://www.w3.org/TR/html401/interact/forms.html#h-17.6
      // "...all OPTGROUP elements must be specified directly within a SELECT element (i.e., groups may not be nested)..."
      // check whether this is a <optgroup>
      if (Array.isArray(optionLabel)) {
        // if it is an array, then it is an <optgroup>
        const optgroup = document.createElement('optgroup');
        optgroup.label = optionValue;
        optgroup.disabled = false; // not configurable for now
        select.appendChild(optgroup);
        optionLabel.forEach((o) => renderOption(optgroup, o[1], o[0]));
      } else {
        // case of <option>
        renderOption(select, optionLabel, optionValue);
      }
    });
    select.focus();
  },

  radio: (popup, inputOptions, params) => {
    const radio = getDirectChildByClass(popup, swalClasses.radio);
    inputOptions.forEach((inputOption) => {
      const radioValue = inputOption[0];
      const radioLabel = inputOption[1];
      const radioInput = document.createElement('input');
      const radioLabelElement = document.createElement('label');
      radioInput.type = 'radio';
      radioInput.name = swalClasses.radio;
      radioInput.value = radioValue;
      if (isSelected(radioValue, params.inputValue)) {
        radioInput.checked = true;
      }
      const label = document.createElement('span');
      setInnerHtml(label, radioLabel);
      label.className = swalClasses.label;
      radioLabelElement.appendChild(radioInput);
      radioLabelElement.appendChild(label);
      radio.appendChild(radioLabelElement);
    });
    const radios = radio.querySelectorAll('input');
    if (radios.length) {
      radios[0].focus();
    }
  },
};

/**
 * Converts `inputOptions` into an array of `[value, label]`s
 * @param inputOptions
 */
const formatInputOptions = (inputOptions) => {
  const result = [];
  if (typeof Map !== 'undefined' && inputOptions instanceof Map) {
    inputOptions.forEach((value, key) => {
      let valueFormatted = value;
      if (typeof valueFormatted === 'object') {
        // case of <optgroup>
        valueFormatted = formatInputOptions(valueFormatted);
      }
      result.push([key, valueFormatted]);
    });
  } else {
    Object.keys(inputOptions).forEach((key) => {
      let valueFormatted = inputOptions[key];
      if (typeof valueFormatted === 'object') {
        // case of <optgroup>
        valueFormatted = formatInputOptions(valueFormatted);
      }
      result.push([key, valueFormatted]);
    });
  }
  return result
};

const isSelected = (optionValue, inputValue) => {
  return inputValue && inputValue.toString() === optionValue.toString()
};

/**
 * Hides loader and shows back the button which was hidden by .showLoading()
 */
function hideLoading() {
  // do nothing if popup is closed
  const innerParams = privateProps.innerParams.get(this);
  if (!innerParams) {
    return
  }
  const domCache = privateProps.domCache.get(this);
  hide(domCache.loader);
  if (isToast()) {
    if (innerParams.icon) {
      show(getIcon());
    }
  } else {
    showRelatedButton(domCache);
  }
  removeClass([domCache.popup, domCache.actions], swalClasses.loading);
  domCache.popup.removeAttribute('aria-busy');
  domCache.popup.removeAttribute('data-loading');
  domCache.confirmButton.disabled = false;
  domCache.denyButton.disabled = false;
  domCache.cancelButton.disabled = false;
}

const showRelatedButton = (domCache) => {
  const buttonToReplace = domCache.popup.getElementsByClassName(domCache.loader.getAttribute('data-button-to-replace'));
  if (buttonToReplace.length) {
    show(buttonToReplace[0], 'inline-block');
  } else if (allButtonsAreHidden()) {
    hide(domCache.actions);
  }
};

/**
 * Gets the input DOM node, this method works with input parameter.
 * @returns {HTMLElement | null}
 */
function getInput(instance) {
  const innerParams = privateProps.innerParams.get(instance || this);
  const domCache = privateProps.domCache.get(instance || this);
  if (!domCache) {
    return null
  }
  return getInput$1(domCache.popup, innerParams.input)
}

/**
 * This module contains `WeakMap`s for each effectively-"private  property" that a `Swal` has.
 * For example, to set the private property "foo" of `this` to "bar", you can `privateProps.foo.set(this, 'bar')`
 * This is the approach that Babel will probably take to implement private methods/fields
 *   https://github.com/tc39/proposal-private-methods
 *   https://github.com/babel/babel/pull/7555
 * Once we have the changes from that PR in Babel, and our core class fits reasonable in *one module*
 *   then we can use that language feature.
 */

var privateMethods = {
  swalPromiseResolve: new WeakMap(),
  swalPromiseReject: new WeakMap(),
};

/*
 * Global function to determine if SweetAlert2 popup is shown
 */
const isVisible = () => {
  return isVisible$1(getPopup())
};

/*
 * Global function to click 'Confirm' button
 */
const clickConfirm = () => getConfirmButton() && getConfirmButton().click();

/*
 * Global function to click 'Deny' button
 */
const clickDeny = () => getDenyButton() && getDenyButton().click();

/*
 * Global function to click 'Cancel' button
 */
const clickCancel = () => getCancelButton() && getCancelButton().click();

const removeKeydownHandler = (globalState) => {
  if (globalState.keydownTarget && globalState.keydownHandlerAdded) {
    globalState.keydownTarget.removeEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture,
    });
    globalState.keydownHandlerAdded = false;
  }
};

const addKeydownHandler = (instance, globalState, innerParams, dismissWith) => {
  removeKeydownHandler(globalState);
  if (!innerParams.toast) {
    globalState.keydownHandler = (e) => keydownHandler(instance, e, dismissWith);
    globalState.keydownTarget = innerParams.keydownListenerCapture ? window : getPopup();
    globalState.keydownListenerCapture = innerParams.keydownListenerCapture;
    globalState.keydownTarget.addEventListener('keydown', globalState.keydownHandler, {
      capture: globalState.keydownListenerCapture,
    });
    globalState.keydownHandlerAdded = true;
  }
};

// Focus handling
const setFocus = (innerParams, index, increment) => {
  const focusableElements = getFocusableElements();
  // search for visible elements and select the next possible match
  if (focusableElements.length) {
    index = index + increment;

    // rollover to first item
    if (index === focusableElements.length) {
      index = 0;

      // go to last item
    } else if (index === -1) {
      index = focusableElements.length - 1;
    }

    return focusableElements[index].focus()
  }
  // no visible focusable elements, focus the popup
  getPopup().focus();
};

const arrowKeysNextButton = ['ArrowRight', 'ArrowDown'];

const arrowKeysPreviousButton = ['ArrowLeft', 'ArrowUp'];

const keydownHandler = (instance, e, dismissWith) => {
  const innerParams = privateProps.innerParams.get(instance);

  if (!innerParams) {
    return // This instance has already been destroyed
  }

  // Ignore keydown during IME composition
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event#ignoring_keydown_during_ime_composition
  // https://github.com/sweetalert2/sweetalert2/issues/720
  // https://github.com/sweetalert2/sweetalert2/issues/2406
  if (e.isComposing || e.keyCode === 229) {
    return
  }

  if (innerParams.stopKeydownPropagation) {
    e.stopPropagation();
  }

  // ENTER
  if (e.key === 'Enter') {
    handleEnter(instance, e, innerParams);
  }

  // TAB
  else if (e.key === 'Tab') {
    handleTab(e, innerParams);
  }

  // ARROWS - switch focus between buttons
  else if ([...arrowKeysNextButton, ...arrowKeysPreviousButton].includes(e.key)) {
    handleArrows(e.key);
  }

  // ESC
  else if (e.key === 'Escape') {
    handleEsc(e, innerParams, dismissWith);
  }
};

const handleEnter = (instance, e, innerParams) => {
  // https://github.com/sweetalert2/sweetalert2/issues/2386
  if (!callIfFunction(innerParams.allowEnterKey)) {
    return
  }

  if (e.target && instance.getInput() && e.target.outerHTML === instance.getInput().outerHTML) {
    if (['textarea', 'file'].includes(innerParams.input)) {
      return // do not submit
    }

    clickConfirm();
    e.preventDefault();
  }
};

const handleTab = (e, innerParams) => {
  const targetElement = e.target;

  const focusableElements = getFocusableElements();
  let btnIndex = -1;
  for (let i = 0; i < focusableElements.length; i++) {
    if (targetElement === focusableElements[i]) {
      btnIndex = i;
      break
    }
  }

  // Cycle to the next button
  if (!e.shiftKey) {
    setFocus(innerParams, btnIndex, 1);
  }

  // Cycle to the prev button
  else {
    setFocus(innerParams, btnIndex, -1);
  }

  e.stopPropagation();
  e.preventDefault();
};

const handleArrows = (key) => {
  const confirmButton = getConfirmButton();
  const denyButton = getDenyButton();
  const cancelButton = getCancelButton();
  if (![confirmButton, denyButton, cancelButton].includes(document.activeElement)) {
    return
  }
  const sibling = arrowKeysNextButton.includes(key) ? 'nextElementSibling' : 'previousElementSibling';
  let buttonToFocus = document.activeElement;
  for (let i = 0; i < getActions().children.length; i++) {
    buttonToFocus = buttonToFocus[sibling];
    if (!buttonToFocus) {
      return
    }
    if (isVisible$1(buttonToFocus) && buttonToFocus instanceof HTMLButtonElement) {
      break
    }
  }
  if (buttonToFocus instanceof HTMLButtonElement) {
    buttonToFocus.focus();
  }
};

const handleEsc = (e, innerParams, dismissWith) => {
  if (callIfFunction(innerParams.allowEscapeKey)) {
    e.preventDefault();
    dismissWith(DismissReason.esc);
  }
};

/*
 * Instance method to close sweetAlert
 */

function removePopupAndResetState(instance, container, returnFocus, didClose) {
  if (isToast()) {
    triggerDidCloseAndDispose(instance, didClose);
  } else {
    restoreActiveElement(returnFocus).then(() => triggerDidCloseAndDispose(instance, didClose));
    removeKeydownHandler(globalState);
  }

  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  // workaround for #2088
  // for some reason removing the container in Safari will scroll the document to bottom
  if (isSafari) {
    container.setAttribute('style', 'display:none !important');
    container.removeAttribute('class');
    container.innerHTML = '';
  } else {
    container.remove();
  }

  if (isModal()) {
    undoScrollbar();
    undoIOSfix();
    unsetAriaHidden();
  }

  removeBodyClasses();
}

function removeBodyClasses() {
  removeClass(
    [document.documentElement, document.body],
    [swalClasses.shown, swalClasses['height-auto'], swalClasses['no-backdrop'], swalClasses['toast-shown']]
  );
}

function close(resolveValue) {
  resolveValue = prepareResolveValue(resolveValue);

  const swalPromiseResolve = privateMethods.swalPromiseResolve.get(this);

  const didClose = triggerClosePopup(this);

  if (this.isAwaitingPromise()) {
    // A swal awaiting for a promise (after a click on Confirm or Deny) cannot be dismissed anymore #2335
    if (!resolveValue.isDismissed) {
      handleAwaitingPromise(this);
      swalPromiseResolve(resolveValue);
    }
  } else if (didClose) {
    // Resolve Swal promise
    swalPromiseResolve(resolveValue);
  }
}

function isAwaitingPromise() {
  return !!privateProps.awaitingPromise.get(this)
}

const triggerClosePopup = (instance) => {
  const popup = getPopup();

  if (!popup) {
    return false
  }

  const innerParams = privateProps.innerParams.get(instance);
  if (!innerParams || hasClass(popup, innerParams.hideClass.popup)) {
    return false
  }

  removeClass(popup, innerParams.showClass.popup);
  addClass(popup, innerParams.hideClass.popup);

  const backdrop = getContainer();
  removeClass(backdrop, innerParams.showClass.backdrop);
  addClass(backdrop, innerParams.hideClass.backdrop);

  handlePopupAnimation(instance, popup, innerParams);

  return true
};

function rejectPromise(error) {
  const rejectPromise = privateMethods.swalPromiseReject.get(this);
  handleAwaitingPromise(this);
  if (rejectPromise) {
    // Reject Swal promise
    rejectPromise(error);
  }
}

const handleAwaitingPromise = (instance) => {
  if (instance.isAwaitingPromise()) {
    privateProps.awaitingPromise.delete(instance);
    // The instance might have been previously partly destroyed, we must resume the destroy process in this case #2335
    if (!privateProps.innerParams.get(instance)) {
      instance._destroy();
    }
  }
};

const prepareResolveValue = (resolveValue) => {
  // When user calls Swal.close()
  if (typeof resolveValue === 'undefined') {
    return {
      isConfirmed: false,
      isDenied: false,
      isDismissed: true,
    }
  }

  return Object.assign(
    {
      isConfirmed: false,
      isDenied: false,
      isDismissed: false,
    },
    resolveValue
  )
};

const handlePopupAnimation = (instance, popup, innerParams) => {
  const container = getContainer();
  // If animation is supported, animate
  const animationIsSupported = animationEndEvent && hasCssAnimation(popup);

  if (typeof innerParams.willClose === 'function') {
    innerParams.willClose(popup);
  }

  if (animationIsSupported) {
    animatePopup(instance, popup, container, innerParams.returnFocus, innerParams.didClose);
  } else {
    // Otherwise, remove immediately
    removePopupAndResetState(instance, container, innerParams.returnFocus, innerParams.didClose);
  }
};

const animatePopup = (instance, popup, container, returnFocus, didClose) => {
  globalState.swalCloseEventFinishedCallback = removePopupAndResetState.bind(
    null,
    instance,
    container,
    returnFocus,
    didClose
  );
  popup.addEventListener(animationEndEvent, function (e) {
    if (e.target === popup) {
      globalState.swalCloseEventFinishedCallback();
      delete globalState.swalCloseEventFinishedCallback;
    }
  });
};

const triggerDidCloseAndDispose = (instance, didClose) => {
  setTimeout(() => {
    if (typeof didClose === 'function') {
      didClose.bind(instance.params)();
    }
    instance._destroy();
  });
};

function setButtonsDisabled(instance, buttons, disabled) {
  const domCache = privateProps.domCache.get(instance);
  buttons.forEach((button) => {
    domCache[button].disabled = disabled;
  });
}

function setInputDisabled(input, disabled) {
  if (!input) {
    return false
  }
  if (input.type === 'radio') {
    const radiosContainer = input.parentNode.parentNode;
    const radios = radiosContainer.querySelectorAll('input');
    for (let i = 0; i < radios.length; i++) {
      radios[i].disabled = disabled;
    }
  } else {
    input.disabled = disabled;
  }
}

function enableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], false);
}

function disableButtons() {
  setButtonsDisabled(this, ['confirmButton', 'denyButton', 'cancelButton'], true);
}

function enableInput() {
  return setInputDisabled(this.getInput(), false)
}

function disableInput() {
  return setInputDisabled(this.getInput(), true)
}

// Show block with validation message
function showValidationMessage(error) {
  const domCache = privateProps.domCache.get(this);
  const params = privateProps.innerParams.get(this);
  setInnerHtml(domCache.validationMessage, error);
  domCache.validationMessage.className = swalClasses['validation-message'];
  if (params.customClass && params.customClass.validationMessage) {
    addClass(domCache.validationMessage, params.customClass.validationMessage);
  }
  show(domCache.validationMessage);

  const input = this.getInput();
  if (input) {
    input.setAttribute('aria-invalid', true);
    input.setAttribute('aria-describedby', swalClasses['validation-message']);
    focusInput(input);
    addClass(input, swalClasses.inputerror);
  }
}

// Hide block with validation message
function resetValidationMessage() {
  const domCache = privateProps.domCache.get(this);
  if (domCache.validationMessage) {
    hide(domCache.validationMessage);
  }

  const input = this.getInput();
  if (input) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    removeClass(input, swalClasses.inputerror);
  }
}

function getProgressSteps() {
  const domCache = privateProps.domCache.get(this);
  return domCache.progressSteps
}

/**
 * Updates popup parameters.
 */
function update(params) {
  const popup = getPopup();
  const innerParams = privateProps.innerParams.get(this);

  if (!popup || hasClass(popup, innerParams.hideClass.popup)) {
    return warn(
      `You're trying to update the closed or closing popup, that won't work. Use the update() method in preConfirm parameter or show a new popup.`
    )
  }

  const validUpdatableParams = filterValidParams(params);

  const updatedParams = Object.assign({}, innerParams, validUpdatableParams);

  render(this, updatedParams);

  privateProps.innerParams.set(this, updatedParams);
  Object.defineProperties(this, {
    params: {
      value: Object.assign({}, this.params, params),
      writable: false,
      enumerable: true,
    },
  });
}

const filterValidParams = (params) => {
  const validUpdatableParams = {};
  Object.keys(params).forEach((param) => {
    if (isUpdatableParameter(param)) {
      validUpdatableParams[param] = params[param];
    } else {
      warn(
        `Invalid parameter to update: "${param}". Updatable params are listed here: https://github.com/sweetalert2/sweetalert2/blob/master/src/utils/params.js\n\nIf you think this parameter should be updatable, request it here: https://github.com/sweetalert2/sweetalert2/issues/new?template=02_feature_request.md`
      );
    }
  });
  return validUpdatableParams
};

function _destroy() {
  const domCache = privateProps.domCache.get(this);
  const innerParams = privateProps.innerParams.get(this);

  if (!innerParams) {
    disposeWeakMaps(this); // The WeakMaps might have been partly destroyed, we must recall it to dispose any remaining WeakMaps #2335
    return // This instance has already been destroyed
  }

  // Check if there is another Swal closing
  if (domCache.popup && globalState.swalCloseEventFinishedCallback) {
    globalState.swalCloseEventFinishedCallback();
    delete globalState.swalCloseEventFinishedCallback;
  }

  // Check if there is a swal disposal defer timer
  if (globalState.deferDisposalTimer) {
    clearTimeout(globalState.deferDisposalTimer);
    delete globalState.deferDisposalTimer;
  }

  if (typeof innerParams.didDestroy === 'function') {
    innerParams.didDestroy();
  }
  disposeSwal(this);
}

const disposeSwal = (instance) => {
  disposeWeakMaps(instance);
  // Unset this.params so GC will dispose it (#1569)
  delete instance.params;
  // Unset globalState props so GC will dispose globalState (#1569)
  delete globalState.keydownHandler;
  delete globalState.keydownTarget;
  // Unset currentInstance
  delete globalState.currentInstance;
};

const disposeWeakMaps = (instance) => {
  // If the current instance is awaiting a promise result, we keep the privateMethods to call them once the promise result is retrieved #2335
  if (instance.isAwaitingPromise()) {
    unsetWeakMaps(privateProps, instance);
    privateProps.awaitingPromise.set(instance, true);
  } else {
    unsetWeakMaps(privateMethods, instance);
    unsetWeakMaps(privateProps, instance);
  }
};

const unsetWeakMaps = (obj, instance) => {
  for (const i in obj) {
    obj[i].delete(instance);
  }
};

var instanceMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    hideLoading: hideLoading,
    disableLoading: hideLoading,
    getInput: getInput,
    close: close,
    isAwaitingPromise: isAwaitingPromise,
    rejectPromise: rejectPromise,
    handleAwaitingPromise: handleAwaitingPromise,
    closePopup: close,
    closeModal: close,
    closeToast: close,
    enableButtons: enableButtons,
    disableButtons: disableButtons,
    enableInput: enableInput,
    disableInput: disableInput,
    showValidationMessage: showValidationMessage,
    resetValidationMessage: resetValidationMessage,
    getProgressSteps: getProgressSteps,
    update: update,
    _destroy: _destroy
});

const handleConfirmButtonClick = (instance) => {
  const innerParams = privateProps.innerParams.get(instance);
  instance.disableButtons();
  if (innerParams.input) {
    handleConfirmOrDenyWithInput(instance, 'confirm');
  } else {
    confirm(instance, true);
  }
};

const handleDenyButtonClick = (instance) => {
  const innerParams = privateProps.innerParams.get(instance);
  instance.disableButtons();
  if (innerParams.returnInputValueOnDeny) {
    handleConfirmOrDenyWithInput(instance, 'deny');
  } else {
    deny(instance, false);
  }
};

const handleCancelButtonClick = (instance, dismissWith) => {
  instance.disableButtons();
  dismissWith(DismissReason.cancel);
};

const handleConfirmOrDenyWithInput = (instance, type /* 'confirm' | 'deny' */) => {
  const innerParams = privateProps.innerParams.get(instance);
  if (!innerParams.input) {
    return error(
      `The "input" parameter is needed to be set when using returnInputValueOn${capitalizeFirstLetter(type)}`
    )
  }
  const inputValue = getInputValue(instance, innerParams);
  if (innerParams.inputValidator) {
    handleInputValidator(instance, inputValue, type);
  } else if (!instance.getInput().checkValidity()) {
    instance.enableButtons();
    instance.showValidationMessage(innerParams.validationMessage);
  } else if (type === 'deny') {
    deny(instance, inputValue);
  } else {
    confirm(instance, inputValue);
  }
};

const handleInputValidator = (instance, inputValue, type /* 'confirm' | 'deny' */) => {
  const innerParams = privateProps.innerParams.get(instance);
  instance.disableInput();
  const validationPromise = Promise.resolve().then(() =>
    asPromise(innerParams.inputValidator(inputValue, innerParams.validationMessage))
  );
  validationPromise.then((validationMessage) => {
    instance.enableButtons();
    instance.enableInput();
    if (validationMessage) {
      instance.showValidationMessage(validationMessage);
    } else if (type === 'deny') {
      deny(instance, inputValue);
    } else {
      confirm(instance, inputValue);
    }
  });
};

const deny = (instance, value) => {
  const innerParams = privateProps.innerParams.get(instance || that);

  if (innerParams.showLoaderOnDeny) {
    showLoading(getDenyButton());
  }

  if (innerParams.preDeny) {
    privateProps.awaitingPromise.set(instance || that, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preDeny's promise is received
    const preDenyPromise = Promise.resolve().then(() =>
      asPromise(innerParams.preDeny(value, innerParams.validationMessage))
    );
    preDenyPromise
      .then((preDenyValue) => {
        if (preDenyValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          instance.closePopup({ isDenied: true, value: typeof preDenyValue === 'undefined' ? value : preDenyValue });
        }
      })
      .catch((error) => rejectWith(instance || that, error));
  } else {
    instance.closePopup({ isDenied: true, value });
  }
};

const succeedWith = (instance, value) => {
  instance.closePopup({ isConfirmed: true, value });
};

const rejectWith = (instance, error) => {
  instance.rejectPromise(error);
};

const confirm = (instance, value) => {
  const innerParams = privateProps.innerParams.get(instance || that);

  if (innerParams.showLoaderOnConfirm) {
    showLoading();
  }

  if (innerParams.preConfirm) {
    instance.resetValidationMessage();
    privateProps.awaitingPromise.set(instance || that, true); // Flagging the instance as awaiting a promise so it's own promise's reject/resolve methods doesn't get destroyed until the result from this preConfirm's promise is received
    const preConfirmPromise = Promise.resolve().then(() =>
      asPromise(innerParams.preConfirm(value, innerParams.validationMessage))
    );
    preConfirmPromise
      .then((preConfirmValue) => {
        if (isVisible$1(getValidationMessage()) || preConfirmValue === false) {
          instance.hideLoading();
          handleAwaitingPromise(instance);
        } else {
          succeedWith(instance, typeof preConfirmValue === 'undefined' ? value : preConfirmValue);
        }
      })
      .catch((error) => rejectWith(instance || that, error));
  } else {
    succeedWith(instance, value);
  }
};

const handlePopupClick = (instance, domCache, dismissWith) => {
  const innerParams = privateProps.innerParams.get(instance);
  if (innerParams.toast) {
    handleToastClick(instance, domCache, dismissWith);
  } else {
    // Ignore click events that had mousedown on the popup but mouseup on the container
    // This can happen when the user drags a slider
    handleModalMousedown(domCache);

    // Ignore click events that had mousedown on the container but mouseup on the popup
    handleContainerMousedown(domCache);

    handleModalClick(instance, domCache, dismissWith);
  }
};

const handleToastClick = (instance, domCache, dismissWith) => {
  // Closing toast by internal click
  domCache.popup.onclick = () => {
    const innerParams = privateProps.innerParams.get(instance);
    if (innerParams && (isAnyButtonShown(innerParams) || innerParams.timer || innerParams.input)) {
      return
    }
    dismissWith(DismissReason.close);
  };
};

/**
 * @param {*} innerParams
 * @returns {boolean}
 */
const isAnyButtonShown = (innerParams) => {
  return (
    innerParams.showConfirmButton ||
    innerParams.showDenyButton ||
    innerParams.showCancelButton ||
    innerParams.showCloseButton
  )
};

let ignoreOutsideClick = false;

const handleModalMousedown = (domCache) => {
  domCache.popup.onmousedown = () => {
    domCache.container.onmouseup = function (e) {
      domCache.container.onmouseup = undefined;
      // We only check if the mouseup target is the container because usually it doesn't
      // have any other direct children aside of the popup
      if (e.target === domCache.container) {
        ignoreOutsideClick = true;
      }
    };
  };
};

const handleContainerMousedown = (domCache) => {
  domCache.container.onmousedown = () => {
    domCache.popup.onmouseup = function (e) {
      domCache.popup.onmouseup = undefined;
      // We also need to check if the mouseup target is a child of the popup
      if (e.target === domCache.popup || domCache.popup.contains(e.target)) {
        ignoreOutsideClick = true;
      }
    };
  };
};

const handleModalClick = (instance, domCache, dismissWith) => {
  domCache.container.onclick = (e) => {
    const innerParams = privateProps.innerParams.get(instance);
    if (ignoreOutsideClick) {
      ignoreOutsideClick = false;
      return
    }
    if (e.target === domCache.container && callIfFunction(innerParams.allowOutsideClick)) {
      dismissWith(DismissReason.backdrop);
    }
  };
};

const isJqueryElement = (elem) => typeof elem === 'object' && elem.jquery;
const isElement = (elem) => elem instanceof Element || isJqueryElement(elem);

const argsToParams = (args) => {
  const params = {};
  if (typeof args[0] === 'object' && !isElement(args[0])) {
    Object.assign(params, args[0]);
  } else {
['title', 'html', 'icon'].forEach((name, index) => {
      const arg = args[index];
      if (typeof arg === 'string' || isElement(arg)) {
        params[name] = arg;
      } else if (arg !== undefined) {
        error(`Unexpected type of ${name}! Expected "string" or "Element", got ${typeof arg}`);
      }
    });
  }
  return params
};

function fire(...args) {
  const Swal = this; // eslint-disable-line @typescript-eslint/no-this-alias
  return new Swal(...args)
}

/**
 * Returns an extended version of `Swal` containing `params` as defaults.
 * Useful for reusing Swal configuration.
 *
 * For example:
 *
 * Before:
 * const textPromptOptions = { input: 'text', showCancelButton: true }
 * const {value: firstName} = await Swal.fire({ ...textPromptOptions, title: 'What is your first name?' })
 * const {value: lastName} = await Swal.fire({ ...textPromptOptions, title: 'What is your last name?' })
 *
 * After:
 * const TextPrompt = Swal.mixin({ input: 'text', showCancelButton: true })
 * const {value: firstName} = await TextPrompt('What is your first name?')
 * const {value: lastName} = await TextPrompt('What is your last name?')
 *
 * @param mixinParams
 */
function mixin(mixinParams) {
  class MixinSwal extends this {
    _main(params, priorityMixinParams) {
      return super._main(params, Object.assign({}, mixinParams, priorityMixinParams))
    }
  }

  return MixinSwal
}

/**
 * If `timer` parameter is set, returns number of milliseconds of timer remained.
 * Otherwise, returns undefined.
 */
const getTimerLeft = () => {
  return globalState.timeout && globalState.timeout.getTimerLeft()
};

/**
 * Stop timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
const stopTimer = () => {
  if (globalState.timeout) {
    stopTimerProgressBar();
    return globalState.timeout.stop()
  }
};

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
const resumeTimer = () => {
  if (globalState.timeout) {
    const remaining = globalState.timeout.start();
    animateTimerProgressBar(remaining);
    return remaining
  }
};

/**
 * Resume timer. Returns number of milliseconds of timer remained.
 * If `timer` parameter isn't set, returns undefined.
 */
const toggleTimer = () => {
  const timer = globalState.timeout;
  return timer && (timer.running ? stopTimer() : resumeTimer())
};

/**
 * Increase timer. Returns number of milliseconds of an updated timer.
 * If `timer` parameter isn't set, returns undefined.
 */
const increaseTimer = (n) => {
  if (globalState.timeout) {
    const remaining = globalState.timeout.increase(n);
    animateTimerProgressBar(remaining, true);
    return remaining
  }
};

/**
 * Check if timer is running. Returns true if timer is running
 * or false if timer is paused or stopped.
 * If `timer` parameter isn't set, returns undefined
 */
const isTimerRunning = () => {
  return globalState.timeout && globalState.timeout.isRunning()
};

let bodyClickListenerAdded = false;
const clickHandlers = {};

function bindClickHandler(attr = 'data-swal-template') {
  clickHandlers[attr] = this;

  if (!bodyClickListenerAdded) {
    document.body.addEventListener('click', bodyClickListener);
    bodyClickListenerAdded = true;
  }
}

const bodyClickListener = (event) => {
  for (let el = event.target; el && el !== document; el = el.parentNode) {
    for (const attr in clickHandlers) {
      const template = el.getAttribute(attr);
      if (template) {
        clickHandlers[attr].fire({ template });
        return
      }
    }
  }
};

var staticMethods = /*#__PURE__*/Object.freeze({
    __proto__: null,
    isValidParameter: isValidParameter,
    isUpdatableParameter: isUpdatableParameter,
    isDeprecatedParameter: isDeprecatedParameter,
    argsToParams: argsToParams,
    getContainer: getContainer,
    getPopup: getPopup,
    getTitle: getTitle,
    getHtmlContainer: getHtmlContainer,
    getImage: getImage,
    getIcon: getIcon,
    getInputLabel: getInputLabel,
    getCloseButton: getCloseButton,
    getActions: getActions,
    getConfirmButton: getConfirmButton,
    getDenyButton: getDenyButton,
    getCancelButton: getCancelButton,
    getLoader: getLoader,
    getFooter: getFooter,
    getTimerProgressBar: getTimerProgressBar,
    getFocusableElements: getFocusableElements,
    getValidationMessage: getValidationMessage,
    isLoading: isLoading,
    isVisible: isVisible,
    clickConfirm: clickConfirm,
    clickDeny: clickDeny,
    clickCancel: clickCancel,
    fire: fire,
    mixin: mixin,
    showLoading: showLoading,
    enableLoading: showLoading,
    getTimerLeft: getTimerLeft,
    stopTimer: stopTimer,
    resumeTimer: resumeTimer,
    toggleTimer: toggleTimer,
    increaseTimer: increaseTimer,
    isTimerRunning: isTimerRunning,
    bindClickHandler: bindClickHandler
});

let currentInstance;

class SweetAlert {
  constructor(...args) {
    // Prevent run in Node env
    if (typeof window === 'undefined') {
      return
    }

    currentInstance = this;

    // @ts-ignore
    const outerParams = Object.freeze(this.constructor.argsToParams(args));

    Object.defineProperties(this, {
      params: {
        value: outerParams,
        writable: false,
        enumerable: true,
        configurable: true,
      },
    });

    // @ts-ignore
    const promise = this._main(this.params);
    privateProps.promise.set(this, promise);
  }

  _main(userParams, mixinParams = {}) {
    showWarningsForParams(Object.assign({}, mixinParams, userParams));

    if (globalState.currentInstance) {
      globalState.currentInstance._destroy();
      if (isModal()) {
        unsetAriaHidden();
      }
    }
    globalState.currentInstance = this;

    const innerParams = prepareParams(userParams, mixinParams);
    setParameters(innerParams);
    Object.freeze(innerParams);

    // clear the previous timer
    if (globalState.timeout) {
      globalState.timeout.stop();
      delete globalState.timeout;
    }

    // clear the restore focus timeout
    clearTimeout(globalState.restoreFocusTimeout);

    const domCache = populateDomCache(this);

    render(this, innerParams);

    privateProps.innerParams.set(this, innerParams);

    return swalPromise(this, domCache, innerParams)
  }

  // `catch` cannot be the name of a module export, so we define our thenable methods here instead
  then(onFulfilled) {
    const promise = privateProps.promise.get(this);
    return promise.then(onFulfilled)
  }

  finally(onFinally) {
    const promise = privateProps.promise.get(this);
    return promise.finally(onFinally)
  }
}

const swalPromise = (instance, domCache, innerParams) => {
  return new Promise((resolve, reject) => {
    // functions to handle all closings/dismissals
    const dismissWith = (dismiss) => {
      instance.closePopup({ isDismissed: true, dismiss });
    };

    privateMethods.swalPromiseResolve.set(instance, resolve);
    privateMethods.swalPromiseReject.set(instance, reject);

    domCache.confirmButton.onclick = () => handleConfirmButtonClick(instance);
    domCache.denyButton.onclick = () => handleDenyButtonClick(instance);
    domCache.cancelButton.onclick = () => handleCancelButtonClick(instance, dismissWith);

    domCache.closeButton.onclick = () => dismissWith(DismissReason.close);

    handlePopupClick(instance, domCache, dismissWith);

    addKeydownHandler(instance, globalState, innerParams, dismissWith);

    handleInputOptionsAndValue(instance, innerParams);

    openPopup(innerParams);

    setupTimer(globalState, innerParams, dismissWith);

    initFocus(domCache, innerParams);

    // Scroll container to top on open (#1247, #1946)
    setTimeout(() => {
      domCache.container.scrollTop = 0;
    });
  })
};

const prepareParams = (userParams, mixinParams) => {
  const templateParams = getTemplateParams(userParams);
  const params = Object.assign({}, defaultParams, mixinParams, templateParams, userParams); // precedence is described in #2131
  params.showClass = Object.assign({}, defaultParams.showClass, params.showClass);
  params.hideClass = Object.assign({}, defaultParams.hideClass, params.hideClass);
  return params
};

const populateDomCache = (instance) => {
  const domCache = {
    popup: getPopup(),
    container: getContainer(),
    actions: getActions(),
    confirmButton: getConfirmButton(),
    denyButton: getDenyButton(),
    cancelButton: getCancelButton(),
    loader: getLoader(),
    closeButton: getCloseButton(),
    validationMessage: getValidationMessage(),
    progressSteps: getProgressSteps$1(),
  };
  privateProps.domCache.set(instance, domCache);

  return domCache
};

const setupTimer = (globalState, innerParams, dismissWith) => {
  const timerProgressBar = getTimerProgressBar();
  hide(timerProgressBar);
  if (innerParams.timer) {
    globalState.timeout = new Timer(() => {
      dismissWith('timer');
      delete globalState.timeout;
    }, innerParams.timer);
    if (innerParams.timerProgressBar) {
      show(timerProgressBar);
      applyCustomClass(timerProgressBar, innerParams, 'timerProgressBar');
      setTimeout(() => {
        if (globalState.timeout && globalState.timeout.running) {
          // timer can be already stopped or unset at this point
          animateTimerProgressBar(innerParams.timer);
        }
      });
    }
  }
};

const initFocus = (domCache, innerParams) => {
  if (innerParams.toast) {
    return
  }

  if (!callIfFunction(innerParams.allowEnterKey)) {
    return blurActiveElement()
  }

  if (!focusButton(domCache, innerParams)) {
    setFocus(innerParams, -1, 1);
  }
};

const focusButton = (domCache, innerParams) => {
  if (innerParams.focusDeny && isVisible$1(domCache.denyButton)) {
    domCache.denyButton.focus();
    return true
  }

  if (innerParams.focusCancel && isVisible$1(domCache.cancelButton)) {
    domCache.cancelButton.focus();
    return true
  }

  if (innerParams.focusConfirm && isVisible$1(domCache.confirmButton)) {
    domCache.confirmButton.focus();
    return true
  }

  return false
};

const blurActiveElement = () => {
  if (document.activeElement instanceof HTMLElement && typeof document.activeElement.blur === 'function') {
    document.activeElement.blur();
  }
};

// Assign instance methods from src/instanceMethods/*.js to prototype
Object.assign(SweetAlert.prototype, instanceMethods);

// Assign static methods from src/staticMethods/*.js to constructor
Object.assign(SweetAlert, staticMethods);

// Proxy to instance methods to constructor, for now, for backwards compatibility
Object.keys(instanceMethods).forEach((key) => {
  SweetAlert[key] = function (...args) {
    if (currentInstance) {
      return currentInstance[key](...args)
    }
  };
});

SweetAlert.DismissReason = DismissReason;

SweetAlert.version = '11.4.8';

const Swal = SweetAlert;
// @ts-ignore
Swal.default = Swal;

function test() {
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    });
    console.dir(Swal);
}
// let swal = Swal.fire;
let DlgId = 0;
class Dialogue {
    id;
    inputValue;
    constructor() {
        this.id = DlgId;
        DlgId++;
    }
    inputDlg(dlgContent) {
        let that = this;
        let int = new Array();
        let value = new Array();
        let number = 0;
        let inputId = "ezpsy-dlg-input" + number;
        let dom = new Array();
        dlgContent = judgeDlgContent(dlgContent, '输入对话');
        console.dir(dlgContent);
        if (dlgContent.input) {
            if (typeof dlgContent.input === 'string') {
                int.push(dlgContent.input);
            }
            else {
                int = dlgContent.input;
            }
        }
        else {
            console.error('Please set input in your object!');
        }
        if (dlgContent.value) {
            if (typeof dlgContent.value === 'string') {
                value.push(dlgContent.value);
            }
            else {
                value = dlgContent.value;
            }
        }
        else {
            for (let i = 0; i < int.length; i++) {
                value.push('');
            }
        }
        for (let i = 0; i < int.length; i++) {
            if (value[i] === undefined) {
                value[i] = '';
            }
        }
        let text = '';
        for (let i = 0; i < int.length; i++) {
            text = text + "<div class='ezpsy-dlg-input-title'>" + int[i] + "</div>"
                + " <input type='text' class='ezpsy-dlg-input' name= '"
                + inputId + "' id='" + inputId + "' value='" + value[i] + "' /><br>";
            number++;
            inputId = "ezpsy-dlg-input" + number;
        }
        // console.dir(text)
        return Swal.fire({
            title: dlgContent.title,
            html: text,
            confirmButtonColor: '#4983d0',
            showCancelButton: true,
            confirmButtonText: dlgContent.confirm,
            cancelButtonText: dlgContent.cancel,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn',
                cancelButton: 'ezpsy-dlg-btn'
            },
            preConfirm: () => {
                for (let i = 0; i < int.length; i++) {
                    let htmlDom = document.getElementById("ezpsy-dlg-input" + i);
                    let data = {
                        dataName: int[i],
                        data: htmlDom.value
                    };
                    dom.push(data);
                }
                that.inputValue = dom;
                return dom;
            }
        }).then(e => {
            return new Promise((res, rej) => {
                if (e.isConfirmed) {
                    Swal.fire({
                        title: 'Success',
                        confirmButtonColor: '#4983d0',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'ezpsy-dlg-btn'
                        },
                    });
                    res(e.value);
                }
                else {
                    res('null');
                }
            });
        });
    }
    errorDlg(dlgContent) {
        dlgContent = judgeDlgContent(dlgContent, '错误对话', '错误信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'error'
        });
    }
    helpDlg(dlgContent) {
        dlgContent = judgeDlgContent(dlgContent, '帮助对话', '帮助信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'info'
        });
    }
    listDlg(dlgContent) {
        dlgContent = judgeDlgContent(dlgContent, '列表选择对话');
        let dom = new Array();
        let that = this;
        if (dlgContent.IsMulti) {
            let text = '';
            let key = Object.keys(dlgContent.list);
            let value = Object.values(dlgContent.list);
            text += "<div class='ezpsy-dlg-MultiDiv'>按住Shift或Control键进行多选</div>";
            text += "<select id='ezpsy-dlg-select0' class='ezpsy-dlg-multiSelect swal2-select' style='display: flex' multiple='true'>\n";
            // text += "   <option value disabled>Select</option>\n"
            for (let i = 0; i < key.length; i++) {
                if (value[i] instanceof Object) {
                    let key0 = Object.keys(value[i]);
                    let value0 = Object.values(value[i]);
                    text += "   <optgroup label='" + key[i] + "' >\n";
                    for (let j = 0; j < key0.length; j++)
                        text += "       <option value='" + key0[j] + "'>" + value0[j] + "</option>\n";
                    text += '</optgroup>';
                }
                else {
                    text += "   <option value='" + key[i] + "'>" + value[i] + "</option>\n";
                }
                // let selectId = "ezpsy-dlg-select" + number
                // number++;
                // text += "   <select id='"+ selectId +"' class='swal2-select' style='display: flex'>\n";
                // text += "   <option value= 'disabled'>"+ key[i] +"</option>\n"
                // if(value[i] instanceof Object)
                // {
                //     let key0 = Object.keys(value[i])
                //     let value0 = Object.values(value[i])
                //     for(let j = 0;j < key0.length;j++)
                //     {
                //         text += "       <option value='"+ key0[j] +"'>"+ value0[j] +"</option>\n"
                //     }
                // }
                // else{
                //     text += "       <option value='"+ key[i] +"'>"+ value[i] +"</option>\n"
                // }
                // text += '</select>\n'
            }
            text += "</select>";
            return Swal.fire({
                title: dlgContent.title,
                html: text,
                confirmButtonColor: '#4983d0',
                showCancelButton: true,
                confirmButtonText: dlgContent.confirm,
                cancelButtonText: dlgContent.cancel,
                customClass: {
                    confirmButton: 'ezpsy-dlg-btn',
                    cancelButton: 'ezpsy-dlg-btn'
                },
                preConfirm: () => {
                    let htmlDom = document.getElementById('ezpsy-dlg-select0');
                    // console.dir(htmlDom)
                    for (let i = 0; i < htmlDom.length; i++) {
                        if (htmlDom.options[i].selected) {
                            let optgroup = htmlDom.options[i].parentElement;
                            let data;
                            if (optgroup instanceof HTMLSelectElement) {
                                data = {
                                    dataName: htmlDom.options[i].label,
                                    data: htmlDom.options[i].value
                                };
                            }
                            else {
                                data = {
                                    dataName: optgroup.label,
                                    data: htmlDom.options[i].value
                                };
                            }
                            dom.push(data);
                        }
                    }
                    // let sel = Object.keys(dlgContent.list)
                    // for(let i = 0;i < sel.length;i++)
                    // {
                    //     let htmlDom = document.getElementById("ezpsy-dlg-select"+i);
                    //     let data: Data = {
                    //         dataName: sel[i],
                    //         data: (<HTMLInputElement>htmlDom).value
                    //     }
                    //     dom.push(data);
                    // }
                    that.inputValue = dom;
                    return dom;
                }
            }).then(e => {
                return new Promise((res, rej) => {
                    if (e.isConfirmed) {
                        Swal.fire({
                            title: 'Success',
                            confirmButtonColor: '#4983d0',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'ezpsy-dlg-btn'
                            },
                        });
                    }
                    res(e.value);
                });
            });
        }
        else {
            return Swal.fire({
                title: dlgContent.title,
                input: 'select',
                confirmButtonColor: '#4983d0',
                inputOptions: dlgContent.list,
                inputPlaceholder: 'Select',
                showCancelButton: true,
                confirmButtonText: dlgContent.confirm,
                cancelButtonText: dlgContent.cancel,
                customClass: {
                    confirmButton: 'ezpsy-dlg-btn',
                    cancelButton: 'ezpsy-dlg-btn',
                    input: 'ezpsy-dlg-select'
                },
                preConfirm: () => {
                    let htmlDom = document.getElementsByClassName('swal2-select')[0];
                    for (let i = 0; i < htmlDom.length; i++) {
                        if (htmlDom.options[i].selected) {
                            let optgroup = htmlDom.options[i].parentElement;
                            let data;
                            if (optgroup instanceof HTMLSelectElement) {
                                data = {
                                    dataName: htmlDom.options[i].label,
                                    data: htmlDom.value
                                };
                            }
                            else {
                                data = {
                                    dataName: optgroup.label,
                                    data: htmlDom.value
                                };
                            }
                            dom.push(data);
                            break;
                        }
                    }
                    that.inputValue = dom;
                    return dom;
                }
            }).then(e => {
                return new Promise((res, rej) => {
                    if (e.isConfirmed) {
                        Swal.fire({
                            title: 'Success',
                            confirmButtonColor: '#4983d0',
                            icon: 'success',
                            customClass: {
                                confirmButton: 'ezpsy-dlg-btn'
                            },
                        });
                        res(e.value);
                    }
                    else {
                        res("null");
                    }
                });
            });
        }
    }
    questDlg(dlgContent) {
        dlgContent = judgeDlgContent(dlgContent, '询问对话', '询问信息');
        return Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            showCancelButton: true,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn',
                cancelButton: 'ezpsy-dlg-btn'
            },
            icon: 'question'
        }).then(e => {
            return new Promise((res, rej) => {
                if (e.isConfirmed) {
                    Swal.fire({
                        title: 'Success',
                        confirmButtonColor: '#4983d0',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'ezpsy-dlg-btn'
                        },
                    });
                    res(e.value);
                }
                else {
                    res(false);
                }
            });
        });
    }
    warnDlg(dlgContent) {
        dlgContent = judgeDlgContent(dlgContent, '帮助对话', '帮助信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'warning'
        });
    }
    msgDlg(dlgContent) {
        if (dlgContent.imgUrl === undefined)
            dlgContent.imgUrl = 'https://unsplash.it/400/200';
        if (dlgContent.imgWidth === undefined)
            dlgContent.imgWidth = 400;
        if (dlgContent.imgHeight === undefined)
            dlgContent.imgHeight = 200;
        return Swal.fire({
            text: dlgContent.content,
            width: 1.2 * dlgContent.imgWidth,
            heightAuto: true,
            confirmButtonColor: '#4983d0',
            confirmButtonText: dlgContent.confirm,
            imageUrl: dlgContent.imgUrl,
            imageWidth: dlgContent.imgWidth,
            imageHeight: dlgContent.imgHeight,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            }
        }).then(e => {
            return new Promise((res, rej) => {
                if (e.isConfirmed) {
                    res(e.value);
                }
            });
        });
    }
}
function DlgInit() {
    let dlg = new Dialogue();
    return dlg;
}

// export { animate } from './Animate/animate'
// export { makeRectangle } from './Graphic/rectangle'
// let EzpsyList = new Array();
class Ezpsy {
    id;
    dom;
    ctx;
    // ctxList: Array<CanvasRenderingContext2D>
    storage;
    cStyle;
    // Rectangle: Rectangle
    constructor(id, dom, cStyle) {
        this.id = id;
        this.dom = dom;
        this.storage = new Storage();
        cStyle = judgeCanvasStyle(cStyle);
        this.cStyle = cStyle;
        // this.ctxList = []
        this.ctx = createCanvas(dom, cStyle); //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
        // this.ctxList.push(this.ctx)
        // console.dir(this.ctx)
    }
    setCanvasStyle(cStyle) {
        // for(let i = 0;i < this.ctxList.length;i++){
        //     let c = this.ctxList[i].canvas;
        //     c.width = cStyle.width
        //     c.height = cStyle.height
        // }
        // let el = this.storage.ElementsList
        let c = this.ctx.canvas;
        let ctx = this.ctx;
        cStyle = judgeCanvasStyle(cStyle);
        c.width = cStyle.width;
        c.height = cStyle.height;
        let w = window.innerWidth;
        let h = window.innerHeight;
        // console.dir(w)
        c.style.top = ((h - cStyle.height) / 2).toString() + 'px';
        c.style.left = ((w - cStyle.width) / 2).toString() + 'px';
        this.cStyle = {
            width: cStyle.width,
            height: cStyle.height
        };
        this.storage.reDraw(ctx);
    }
    refresh() {
        // console.dir(this.storage.ElementsList)
        // this.storage.ElementsList = new Array();
        let c = this.ctx.canvas;
        c.width = this.cStyle.width;
        c.height = this.cStyle.height;
        this.storage.reDraw(this.ctx);
    }
    // setAnimateCanvasStyle(cStyle: canvasStyle){
    //     for(let i = 1;i < this.ctxList.length;i++)
    //     {
    //         let c = this.ctxList[i].canvas;
    //         c.width = cStyle.width
    //         c.height = cStyle.height
    //     }
    // }
    add(el) {
        let ctx = this.ctx;
        let st = this.storage;
        let name = st.getElementsName(el);
        let index = st.searchElementsName(name);
        if (el instanceof Elements || el instanceof Group) {
            if (index !== -1) {
                el.remove();
                this.add(el);
                this.refresh();
            }
            else {
                this.storage.push(el);
                el.ctx = ctx;
                el.storage = this.storage;
                judgeElement(el, ctx);
            }
        }
        else {
            for (let i = 0; i < el.length; i++) {
                let e = el[i];
                this.add(e);
                // el[i].ctx = ctx
                // el[i].storage = this.storage
                // ezJudge.judgeElement(el[i],ctx)
            }
        }
    }
    remove(el) {
        let ctx = this.ctx;
        let c = ctx.canvas;
        c.width = this.cStyle.width;
        c.height = this.cStyle.height;
        this.storage.remove(el);
        this.storage.reDraw(ctx);
    }
    // aliasing(style: string){
    //     this.ctx.globalCompositeOperation = style
    // }
    animate(el, func, delay) {
        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        this.ctx;
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);
        (async function () {
            while (1) {
                func();
                await delay_frame(delay);
                el.remove();
                that.add(el);
            }
        })();
        // window.setInterval(()=>{
        //     // let a = performance.now()
        //     func();
        //     // ezTime.WaitSecs0(delay/2)
        //     ezTimer.sleep(delay).then(()=>{
        //         el.remove()
        //         that.add(el);
        //         // console.dir(performance.now() - a - 100)
        //     })
        // },0)
        // (async function(){
        //     for(let i = 0;i < 10;i++)
        //     {
        //         await func();
        //         // await ezTime.WaitSecs0(delay/2)
        //         await ezTimer.sleep(delay)
        //         await el.remove()
        //         await that.add(el);
        //         // that.storage.push(el)
        //         // that.storage.reDraw(ctx)
        //         // ezJudge.judgeAnimate(el,ctx);
        //         // await that.storage.reDraw(ctx);
        //         // await ezTime.WaitSecs0(delay/2)
        //     }
        // })()
    }
    setTextLine(textLine) {
        let c = this.ctx.canvas;
        c.width = this.cStyle.width;
        c.height = this.cStyle.height;
        let st = this.storage;
        st.textLine = textLine;
        if (textLine) {
            if (textLine.textA) {
                // this.textLine.textA = textLine.textA
                for (let i = 0; i < st.ElementsList.length; i++) {
                    if (st.ElementsList[i] instanceof Texts)
                        st.ElementsList[i].textLine.textA = textLine.textA;
                    else if (st.ElementsList[i] instanceof Group) {
                        for (let t = 0; t < st.ElementsList[i].groupList.length; t++) {
                            if (st.ElementsList[i].groupList[t] instanceof Texts) {
                                st.ElementsList[i].groupList[t].textLine.textA = textLine.textA;
                            }
                        }
                    }
                }
            }
            if (textLine.textB) {
                // this.textLine.textB = textLine.textB
                for (let i = 0; i < st.ElementsList.length; i++) {
                    if (st.ElementsList[i] instanceof Texts)
                        st.ElementsList[i].textLine.textB = textLine.textB;
                    else if (st.ElementsList[i] instanceof Group) {
                        for (let t = 0; t < st.ElementsList[i].groupList.length; t++) {
                            if (st.ElementsList[i].groupList[t] instanceof Texts) {
                                st.ElementsList[i].groupList[t].textLine.textB = textLine.textB;
                            }
                        }
                    }
                }
            }
        }
        st.reDraw(this.ctx);
    }
    clear() {
        // let that = this;
        // this.storage.ElementsList = new Array();
        // return new Promise(function(resolve,reject){
        //     let child = that.dom.lastElementChild
        //     while(child){
        //         that.dom.removeChild(child)
        //         child = that.dom.lastElementChild
        //     }
        //     resolve(0)
        // })
        this.storage = new Storage();
        let c = this.ctx.canvas;
        c.width = this.cStyle.width;
        c.height = this.cStyle.height;
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
    Texts: Texts,
    Img: Img,
    Keypress: Keypress,
    Grat: Grat,
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
    Time0: Time0,
    WaitSecs0: WaitSecs0,
    delay_frame: delay_frame,
    KbWait: KbWait,
    KbName: KbName,
    KbPressWait: KbPressWait,
    KbReleaseWait: KbReleaseWait,
    GetClick: GetClick,
    makeGrat: makeGrat,
    sleep: sleep,
    WaitSecs: WaitSecs,
    KeypressInit: KeypressInit,
    test: test,
    Dialogue: Dialogue,
    DlgInit: DlgInit
});

export { EZPSY as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3NyYy9KdWRnZS9qdWRnZS50cyIsIi4uLy4uL3NyYy9TdG9yYWdlL3N0b3JhZ2UudHMiLCIuLi8uLi9zcmMvS2V5cHJlc3Mva2V5cHJlc3MudHMiLCIuLi8uLi9zcmMvVGltZS90aW1lUGVyZm9ybWFuY2UudHMiLCIuLi8uLi9zcmMvS2V5cHJlc3Mva2V5cHJlc3MwLnRzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy91dGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvcGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9jbGFzc2VzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vZ2V0dGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2RvbVV0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9pc05vZGVFbnYuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2NvbnN0YW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvZ2xvYmFsU3RhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9pbml0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcGFyc2VIdG1sVG9Db250YWluZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9hbmltYXRpb25FbmRFdmVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL21lYXN1cmVTY3JvbGxiYXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyQWN0aW9ucy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJDb250YWluZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3ByaXZhdGVQcm9wcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJJbnB1dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJDb250ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckZvb3Rlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJDbG9zZUJ1dHRvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJJY29uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckltYWdlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlclByb2dyZXNzU3RlcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyVGl0bGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyUG9wdXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9EaXNtaXNzUmVhc29uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9hcmlhLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9nZXRUZW1wbGF0ZVBhcmFtcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZGVmYXVsdElucHV0VmFsaWRhdG9ycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvc2V0UGFyYW1ldGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvVGltZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL3Njcm9sbGJhckZpeC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvaW9zRml4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9vcGVuUG9wdXAuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvc2hvd0xvYWRpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9pbnB1dFV0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvaGlkZUxvYWRpbmcuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9nZXRJbnB1dC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvcHJpdmF0ZU1ldGhvZHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvZG9tLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9rZXlkb3duLWhhbmRsZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9jbG9zZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2VuYWJsZS1kaXNhYmxlLWVsZW1lbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvdmFsaWRhdGlvbi1tZXNzYWdlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvcHJvZ3Jlc3Mtc3RlcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy91cGRhdGUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9fZGVzdHJveS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvYnV0dG9ucy1oYW5kbGVycy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvcG9wdXAtY2xpY2staGFuZGxlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9hcmdzVG9QYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvZmlyZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9taXhpbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy90aW1lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9iaW5kQ2xpY2tIYW5kbGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9Td2VldEFsZXJ0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zd2VldGFsZXJ0Mi5qcyIsIi4uLy4uL3NyYy9EaWFsb2d1ZS9kaWFsb2d1ZTAudHMiLCIuLi8uLi9zcmMvZXpwc3kudHMiXSwic291cmNlc0NvbnRlbnQiOlsiXG5sZXQgaWRTdGFydCA9IDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBDb3VudCgpOiBudW1iZXIge1xuICAgIHJldHVybiBpZFN0YXJ0Kys7XG59IiwiaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuZXhwb3J0IGludGVyZmFjZSBjYW52YXNTdHlsZXtcbiAgICB3aWR0aD86IG51bWJlcjtcbiAgICBoZWlnaHQ/OiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDYW52YXMoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSk6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgLy8gbGV0IGNTdHlsZTogY2FudmFzU3R5bGUgPSB7XG4gICAgLy8gICAgIHdpZHRoOiAxMDAsXG4gICAgLy8gICAgIGhlaWdodDogMTAwXG4gICAgLy8gfVxuICAgIGMuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnXG4gICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHQ7XG4gICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgLy8gY29uc29sZS5kaXIodylcbiAgICBjLnN0eWxlLnRvcCA9ICgoaC1jU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGMuc3R5bGUubGVmdCA9ICgody1jU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICBkb20uYXBwZW5kKGMpO1xuICAgIHJldHVybiBjdHg7XG59IiwiXG5jbGFzcyB0aW1le1xuICAgIGhvdXI6IG51bWJlclxuICAgIG1pbnV0ZXM6IG51bWJlclxuICAgIHNlY29uZHM6IG51bWJlclxuICAgIG1pbGxpc2Vjb25kczogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICAgIHRoaXMuaG91ciA9IGRhdGUuZ2V0SG91cnMoKVxuICAgICAgICB0aGlzLm1pbnV0ZXMgPSBkYXRlLmdldE1pbnV0ZXMoKVxuICAgICAgICB0aGlzLnNlY29uZHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgICAgICB0aGlzLm1pbGxpc2Vjb25kcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUaW1lMHtcbiAgICBzdGFydFRpbWU6IHRpbWVcbiAgICBpbnN0YW50VGltZTogQXJyYXk8dGltZT5cbiAgICB0aW1lU3RhbXA6IEFycmF5PHRpbWU+XG4gICAgaXRlbTogbnVtYmVyXG4gICAgdGltZVZhbHVlOiBBcnJheTxudW1iZXI+XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5pdGVtID0gMDtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgdGltZSgpXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUgPSBbXVxuICAgICAgICB0aGlzLmluc3RhbnRUaW1lLnB1c2godGhpcy5zdGFydFRpbWUpXG4gICAgICAgIHRoaXMudGltZVZhbHVlID0gW11cbiAgICAgICAgdGhpcy50aW1lU3RhbXAgPSBbXVxuICAgIH1cbiAgICBzdGFydCgpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIGxldCB0ID0gbmV3IHRpbWUoKVxuICAgICAgICB0aGlzLmluc3RhbnRUaW1lLnB1c2godClcbiAgICAgICAgdGhpcy5pdGVtKytcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBUaWMoKTogVGltZTB7XG4vLyAgICAgbGV0IHQgPSBuZXcgVGltZTAoKVxuLy8gICAgIHQuc3RhcnQoKVxuLy8gICAgIHJldHVybiB0O1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gVG9jKHRpbWU6IFRpbWUwKTogbnVtYmVye1xuLy8gICAgIGxldCB0ID0gMDtcbi8vICAgICBsZXQgdHMgPSBuZXcgQXJyYXkoKVxuLy8gICAgIHRpbWUucmVjb3JkKClcbi8vICAgICB0c1swXSA9IHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtXS5ob3VyIC0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW0tMV0uaG91clxuLy8gICAgIHRzWzFdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLm1pbnV0ZXMgLSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbS0xXS5taW51dGVzXG4vLyAgICAgdHNbMl0gPSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbV0uc2Vjb25kcyAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLnNlY29uZHNcbi8vICAgICB0c1szXSA9IHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtXS5taWxsaXNlY29uZHMgLSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbS0xXS5taWxsaXNlY29uZHNcbi8vICAgICB0ID0gNjAqNjAqdHNbMF0gKyA2MCp0c1sxXSArIHRzWzJdICsgdHNbM10vMTAwMFxuLy8gICAgIC8vIHQudG9GaXhlZCgzKVxuLy8gICAgIHRpbWUudGltZVZhbHVlLnB1c2godCk7XG4vLyAgICAgcmV0dXJuIHQ7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzZXRUaW1lVHRhbXAoVDogVGltZTApe1xuLy8gICAgIGxldCB0ID0gbmV3IHRpbWUoKTtcbi8vICAgICBULnRpbWVTdGFtcC5wdXNoKHQpO1xuLy8gfSBcblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldFRvYyh0aW1lOiBUaW1lMCk6IEFycmF5PG51bWJlcj57XG4vLyAgICAgbGV0IHRBID0gbmV3IEFycmF5KCk7XG4vLyAgICAgbGV0IHRzID0gbmV3IEFycmF5KCk7XG4vLyAgICAgbGV0IHQgPSB0aW1lLnRpbWVTdGFtcFxuLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IE1hdGguZmxvb3IodC5sZW5ndGgvMik7aSsrKXtcbi8vICAgICAgICAgaWYodFsyKmkrMV0gPT09IHVuZGVmaW5lZClcbi8vICAgICAgICAge1xuLy8gICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHRzWzBdID0gdFsyKmkrMV0uaG91ciAtIHRbMippXS5ob3VyXG4vLyAgICAgICAgICAgICB0c1sxXSA9IHRbMippKzFdLm1pbnV0ZXMgLSB0WzIqaV0ubWludXRlc1xuLy8gICAgICAgICAgICAgdHNbMl0gPSB0WzIqaSsxXS5zZWNvbmRzIC0gdFsyKmldLnNlY29uZHNcbi8vICAgICAgICAgICAgIHRzWzNdID0gdFsyKmkrMV0ubWlsbGlzZWNvbmRzIC0gdFsyKmldLm1pbGxpc2Vjb25kc1xuLy8gICAgICAgICAgICAgdEFbaV0gPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4vLyAgICAgICAgICAgICAvLyB0QVtpXSA9IE1hdGgucm91bmQodEFbaV0qMTAwMCkvMTAwMFxuLy8gICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodEFbaV0pXG4vLyAgICAgICAgIH1cbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIHRBO1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gR2V0U2Vjcyh0aW1lOiBUaW1lMCk6IG51bWJlcntcbi8vICAgICBsZXQgdCA9IFRvYyh0aW1lKVxuLy8gICAgIHJldHVybiB0XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBXYWl0U2VjczAoZGVsYXk6IG51bWJlcixtZXNzYWdlPzogYW55KXtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICAgICAgcmVzb2x2ZSgxKTtcbiAgICAgICAgfSwgZGVsYXkpO1xuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxheV9mcmFtZShudW0xKXtcbiAgICBsZXQgdGltZV9udW09MDsgICAgIFxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIChmdW5jdGlvbiByYWYoKXtcbiAgICAgICAgICAgIHRpbWVfbnVtKys7XG4gICAgICAgICAgICBsZXQgaWQgPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgaWYoIHRpbWVfbnVtPm51bTEpe1xuICAgICAgICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKTtcbiAgICAgICAgICAgIHJlc29sdmUoMCk7XG4gICAgICAgIH1cbiAgICB9KCkpXG59KX07IiwiaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFNoYXBlLFN0eWxlfSBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgY2FudmFzU3R5bGUgfSBmcm9tICcuL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBuYW1lU3R5bGUgfSBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJztcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL1N0b3JhZ2Uvc3RvcmFnZSc7XG5pbXBvcnQgKiBhcyBlelRpbWUgZnJvbSBcIi4vVGltZS90aW1lXCJcbmltcG9ydCAqIGFzIGV6VGltZXIgZnJvbSBcIi4vVGltZS90aW1lUGVyZm9ybWFuY2VcIlxuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgVGV4dExpbmUgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCc7XG5cbmV4cG9ydCBjbGFzcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlXG4gICAgc2hhcGU/OiBTaGFwZVxuICAgIHN0eWxlPzogU3R5bGUgXG4gICAgdGV4dExpbmU/OiBUZXh0TGluZVxuICAgIGN0eD86IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIHN0b3JhZ2U/OiBTdG9yYWdlXG4gICAgc2NhbGU/OiBTY2FsZVxuICAgIHRyYW5zbGF0ZT86IFRyYW5zbGF0ZVxuICAgIHJvdGF0ZT86IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMudHJhbnNsYXRlID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNjYWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgICAgICBoZWlnaHQ6IDFcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJvdGF0ZSA9IDBcbiAgICB9XG4gICAgbm9GaWxsKCl7XG4gICAgICAgIHRoaXMuc3R5bGUuZmlsbCA9ICdub25lJztcbiAgICB9XG4gICAgbm9TdHJva2UoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5saW5lV2lkdGggPSAwO1xuICAgICAgICAvLyBpZih0aGlzLnN0eWxlLmZpbGwgIT09ICdub25lJyAmJiB0aGlzLnN0eWxlLmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IHRoaXMuc3R5bGUuZmlsbFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9IFwiI2ZmZlwiO1xuICAgICAgICAvLyAgICAgY29uc29sZS5kaXIoJ0Vycm9yIScpXG4gICAgICAgIC8vIH1cbiAgICAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSAnbm9uZSdcbiAgICB9XG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICAgICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgICAgICBjLnN0eWxlLnRvcCA9ICgoaC1jU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBjLnN0eWxlLmxlZnQgPSAoKHctY1N0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBsZXQgZWwgPSB0aGlzO1xuICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgfVxuICAgIHJlbW92ZSgpe1xuXG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBcbiAgICAgICAgY3R4LnNhdmUoKVxuICAgICAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICAgICAgY3R4LmZpbGxTdHlsZT1cIndoaXRlXCJcdFxuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLDEsMSlcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj1cImRlc3RpbmF0aW9uLWluXCI7XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsMSwxKTtcbiAgICAgICAgLy8gY3R4LmNsb3NlUGF0aCgpXHRcbiAgICAgICAgY3R4LnJlc3RvcmUoKVxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPSdzb3VyY2Utb3ZlcidcblxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVtb3ZlKHRoaXMpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eCk7XG5cblxuICAgICAgICAvLyBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgLy8gbGV0IGMgPSBjdHguY2FudmFzO1xuICAgICAgICAvLyBjLndpZHRoID0gYy53aWR0aDtcbiAgICAgICAgLy8gYy5oZWlnaHQgPSBjLmhlaWdodDtcblxuXG4gICAgICAgIFxuICAgIH1cblxuICAgIGFuaW1hdGUoZnVuYzogRnVuY3Rpb24sZGVsYXk6IG51bWJlcil7XG4gICAgICAgIC8vIGVsLmN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIGVsLnJlbW92ZSgpO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIC8vIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAvLyBsZXQgY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKHRoaXMuZG9tLHRoaXMuY1N0eWxlKTsgXG4gICAgICAgIC8vIHRoaXMuY3R4TGlzdC5wdXNoKGN0eCk7XG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPiBzdGFydClcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlKDEpe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHBlcmZvcm1hbmNlLm5vdygpKVxuICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICBhd2FpdCBlelRpbWUuZGVsYXlfZnJhbWUoZGVsYXkpO1xuICAgICAgICAgICAgICAgIHRoYXQucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB0aGF0LnN0b3JhZ2UucHVzaCh0aGF0KVxuICAgICAgICAgICAgICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gICAgIGZ1bmMoKTtcbiAgICAgICAgICAgIC8vICAgICAvLyBhd2FpdCBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgICAgICAvLyAgICAgYXdhaXQgZXpUaW1lci5zbGVlcChkZWxheSlcbiAgICAgICAgICAgIC8vICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAvLyAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdClcbiAgICAgICAgICAgIC8vICAgICB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eClcbiAgICAgICAgICAgIC8vICAgICAvLyBlekp1ZGdlLmp1ZGdlQW5pbWF0ZSh0aGF0LGN0eCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gYXdhaXQgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIC8vIHdpbmRvdy5zZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAgICAgLy8gICAgIGZ1bmMoKTtcbiAgICAgICAgICAgIC8vICAgICAvLyBhd2FpdCBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgICAgICAvLyAgICAgZXpUaW1lci5zbGVlcChkZWxheSkudGhlbigoKT0+e1xuICAgICAgICAgICAgLy8gICAgICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoYXQuc3RvcmFnZS5wdXNoKHRoYXQpXG4gICAgICAgICAgICAvLyAgICAgICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAgICAgLy8gICAgIH0pXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyB9LDApXG4gICAgICAgIH0pKClcbiAgICB9XG5cbiAgICAvLyBzY2FsZShzY2FsZVdpZHRoOiBudW1iZXIsc2NhbGVIZWlnaHQ6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC5zY2FsZShzY2FsZVdpZHRoLHNjYWxlSGVpZ2h0KVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eClcbiAgICAvLyAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyB9XG4gICAgLy8gcm90YXRlKGFuZzogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIHRoaXMucmVtb3ZlKClcbiAgICAvLyAgICAgY3R4LnNhdmUoKVxuICAgIC8vICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyAgICAgY3R4LnJvdGF0ZShhbmcpXG4gICAgLy8gICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KVxuICAgIC8vICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIH1cbiAgICAvLyB0cmFuc2xhdGUoeDogbnVtYmVyLHk6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC50cmFuc2xhdGUoeCx5KVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eCk7XG4gICAgLy8gICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vICAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxle1xuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlclxufSIsImltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgbmFtZVN0eWxlIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnO1xuXG5sZXQgZ3JvdXBJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZ3JvdXBcIiArIGdyb3VwSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBncm91cElkXG4gICAgfVxuICAgIGxlbmd0aDogbnVtYmVyXG4gICAgLy8gY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICBncm91cExpc3Q6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXApe1xuXG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyB0aGlzLmlkID0gZ3JvdXBJZDtcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gZWwubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZWw7XG5cbiAgICAgICAgZ3JvdXBJZCsrIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcblxuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxuY2xhc3MgQ2VudGVye1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMueCA9IHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XG4gICAgfVxufVxuXG5jbGFzcyBTaXple1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG59XG5cbmNsYXNzIFNpZGVYWXtcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdEdyb3VwIGV4dGVuZHMgR3JvdXAge1xuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xuICAgICAgICBzdXBlcihlbClcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XG4gICAgfVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICB4OiBudW1iZXJcbi8vICAgICB5OiBudW1iZXJcbi8vICAgICB3aWR0aDogbnVtYmVyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcbi8vIH1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicmVjdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFJlY3RhbmdsZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eDtcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG5cbiAgICB9XG59XG5cbmNsYXNzIGxvZ2ljUmVjdCBleHRlbmRzIFJlY3RhbmdsZXtcbiAgICByZWN0UGFyZW50czA6IFJlY3RhbmdsZTtcbiAgICByZWN0UGFyZW50czE6IFJlY3RhbmdsZTtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoe3NoYXBlOntcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfX0pXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMwID0gcmVjdFBhcmVudHMwXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMxID0gcmVjdFBhcmVudHMxXG4gICAgfVxufVxuXG5jbGFzcyBjbGlwUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXG4gICAgfVxufVxuXG5jbGFzcyB1bmlvblJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gaW5zdGFuY2VvZlJlY3RhbmdsZShlOiBhbnkpOiBlIGlzIFJlY3RhbmdsZVNoYXBle1xuLy8gICAgIHJldHVybiAgaW4gZTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuLy8gICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4vLyAgICAgbGV0IHN0ID0gcmVjdC5zdHlsZTtcbi8vICAgICBsZXQgZixzO1xuLy8gICAgIC8vIGNvbnNvbGUuZGlyKHN0LnN0cm9rZSlcbi8vICAgICBbY3R4LGYsc10gPSBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbi8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSA9PT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSBpZihzdC5maWxsID09PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIGNvbnNvbGUuZGlyKFwiZXJyb3IhSXQgY2FuJ3QgcGFpbnQgYSByZWN0YW5nbGUgd2l0aG91dCBmaWxsU3R5bGUgYW5kIHN0cm9rZVN0eWxlXCIpXG4vLyAgICAgfVxuICAgIFxuLy8gICAgIHJldHVybiByZWN0O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XG4gICAgbGV0IHNoID0gcmVjdC5zaGFwZTtcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGp1ZGdlVFJTKHJlY3QpO1xuICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuICAgIGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIHJlY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGpvaW5SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxmaXhlZFN0eWxlPzogc3RyaW5nfG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouaLvOaOpSBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaLvOaOpeefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGlmKCFmaXhlZFN0eWxlKVxuICAgIHtcbiAgICAgICAgZml4ZWRTdHlsZSA9ICdSRUNUTEVGVCdcbiAgICB9XG4gICAgbGV0IGYgPSBqdWRnZUNoYW5nZVR5cGUoZml4ZWRTdHlsZSk7XG4gICAgLy8gY29uc29sZS5kaXIoJ2Y9JytmKTtcbiAgICBpZihmID09PSAxKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfTGVmdChmaXhlZFJlY3QscmVjdCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG5ld1JlY3QpXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMil7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1RvcChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMyl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1JpZ2h0KGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSA0KXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfQm90dG9tKGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBvcmRlciEnKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X0xlZnQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCAtIHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9SaWdodChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfVG9wKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55IC0gcmVjdC5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9Cb3R0b20oZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Q2VudGVyKHJlY3Q6IFJlY3RhbmdsZSk6IENlbnRlcntcbiAgICAvL+iOt+WPluefqeW9ouS4reW/g1xuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKHJlY3QpO1xuICAgIHJldHVybiBjZW50ZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLHNpZGUwPzogbnVtYmVyfHN0cmluZyxzaWRlMT86IG51bWJlcnxzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlr7npvZAgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXlr7npvZDnn6nlvaIgZml4ZWRTdHlsZSDlr7npvZDlvaLlvI9cbiAgICBpZihzaWRlMCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTAgPSAwXG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cbiAgICBpZihzaWRlMSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTEgPSAwXG4gICAgfVxuXG4gICAgaWYocmVjdC5zaGFwZS53aWR0aCpyZWN0LnNoYXBlLmhlaWdodCA+IGZpeGVkUmVjdC5zaGFwZS53aWR0aCpmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFUaGUgYXJlYSBvZiBmaWV4ZWRSZWN0ICBpcyBzbWFsbGVyIHRoYW4gdGhlIHJlY3QhJylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGxldCBbZjAsZjFdID0ganVkZ2VTaWRlKHNpZGUwLHNpZGUxKTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZjArXCIgXCIrZjEpO1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKTtcbiAgICAgICAgaWYoZjAgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAxIHx8IGYxID09PSAzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmRpcihzKVxuICAgICAgICBcbiAgICAgICAgbmV3UmVjdC5zaGFwZS54ID0gcy54O1xuICAgICAgICBuZXdSZWN0LnNoYXBlLnkgPSBzLnk7XG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xuICAgIH1cbiAgICBcbiAgICBcbn1cblxuZnVuY3Rpb24gQWxpZ25YWShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZjogbnVtYmVyKTogU2lkZVhZe1xuICAgIGxldCBzID0gbmV3IFNpZGVYWSgpXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIoZml4ZWRSZWN0KTtcbiAgICAvLyBjb25zb2xlLmRpcihjZW50ZXIpXG4gICAgaWYoZiA9PT0gMClcbiAgICB7ICAgXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gcmVjdC5zaGFwZS53aWR0aC8yXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gcmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDEpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCAtIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMilcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMylcbiAgICB7XG4gICAgICAgIHMueCA9IGNlbnRlci54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLzIgLSByZWN0LnNoYXBlLndpZHRoXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNClcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yIC0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBpbnN0cnVjdGlvbiEnKVxuICAgIH1cbiAgICByZXR1cm4gc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gT2Zmc2V0UmVjdChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouW5s+enu1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJyYW5nZVJlY3RzKG46IG51bWJlcixbeE51bWJlcix5TnVtYmVyXTogW251bWJlcixudW1iZXJdLHdpbmRvd1JlY3Q6IFJlY3RhbmdsZSxzdHlsZT86IG51bWJlcik6IFJlY3RHcm91cHtcbiAgICAvL+WIm+W7uuefqeW9oumYteWIl1xuICAgIGxldCByZWN0ID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgbGV0IG51bSA9IHhOdW1iZXIgKiB5TnVtYmVyXG4gICAgbGV0IHggPSB3aW5kb3dSZWN0LnNoYXBlLnhcbiAgICBsZXQgeSA9IHdpbmRvd1JlY3Quc2hhcGUueVxuICAgIGxldCB3aWR0aCA9IHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLyB4TnVtYmVyXG4gICAgbGV0IGhlaWdodCA9IHdpbmRvd1JlY3Quc2hhcGUuaGVpZ2h0IC8geU51bWJlclxuICAgIC8vIGNvbnNvbGUuZGlyKFt4LHksd2lkdGgsaGVpZ2h0XSlcblxuICAgIGlmKG4gPiBudW0pe1xuICAgICAgICBuID0gbnVtXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0eWxlID0gMDtcbiAgICB9XG5cbiAgICBpZihzdHlsZSA+IDEpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDBcbiAgICB9XG5cbiAgICBpZihzdHlsZSA9PT0gMClcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC0gd2lkdGggLSB3aWR0aCAqIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG5cbiAgICAvLyBjb25zb2xlLmRpcihyZWN0KVxuXG4gICAgbGV0IHJlY3RHcm91cCA9IG5ldyBSZWN0R3JvdXAod2luZG93UmVjdCxyZWN0KTtcbiAgICByZXR1cm4gcmVjdEdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICAvL+enu+WKqOefqeW9ouiHs+afkOefqeW9ouS4reW/gyBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaTjeS9nOefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0ID0gQWxpZ25SZWN0KGZpeGVkUmVjdCxyZWN0LDAsMCk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3RPblBvaW50KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gT2Zmc2V0UmVjdChyZWN0LFt4LHldKVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0V2lkdGgocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i5a695bqmXG4gICAgbGV0IHdpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgIHJldHVybiB3aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdEhlaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLpq5jluqZcbiAgICBsZXQgaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFNpemUocmVjdDogUmVjdGFuZ2xlKTogU2l6ZXtcbiAgICAvL+iOt+WPluefqeW9ouWuvemrmFxuICAgIGxldCBzaXplID0gbmV3IFNpemUocmVjdClcbiAgICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuLy8gICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4vLyAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdDAuc2hhcGUueCxyZWN0MC5zaGFwZS55LHJlY3QwLnNoYXBlLndpZHRoLHJlY3QwLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgW3gxLHkxLHcxLGgxXSA9IFtyZWN0MS5zaGFwZS54LHJlY3QxLnNoYXBlLnkscmVjdDEuc2hhcGUud2lkdGgscmVjdDEuc2hhcGUuaGVpZ2h0XVxuLy8gICAgIGxldCBSZWN0LHhuLHluLHduLGhuO1xuLy8gICAgIGxldCBhcmVhMCA9IHcwICogaDA7XG4vLyAgICAgbGV0IGFyZWExID0gdzEgKiBoMTtcbi8vICAgICBsZXQgeCx5LHcsaFxuLy8gICAgIGxldCB4dCx5dCx3dCxodCxyZWN0XG4vLyAgICAgaWYoYXJlYTAgPj0gYXJlYTEpXG4vLyAgICAge1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDEseTEsdzEsaDFdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QwO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDAseTAsdzAsaDBdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QxO1xuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmRpcihbeCx5LHcsaF0pO1xuLy8gICAgIGNvbnNvbGUuZGlyKFt4dCx5dCx3dCxodF0pXG4vLyAgICAgaWYoIUlzSW5SZWN0KFt4LHldLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHkraF0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4LHkraF0scmVjdCkpe1xuLy8gICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIHduID0gTWF0aC5hYnMoTWF0aC5taW4oeDAgKyB3MCAseDEgKyB3MSkgLSBNYXRoLm1heCh4MCwgeDEpKVxuLy8gICAgICAgICBobiA9IE1hdGguYWJzKE1hdGgubWluKHkwICsgaDAsIHkxICsgaDEpIC0gTWF0aC5tYXgoeTAsIHkxKSlcbi8vICAgICAgICAgaWYoSXNJblJlY3QoW3gseV0scmVjdCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoKHggPj0geHQgJiYgeDw9eHQrd3QpICYmICh5IDwgeXQgfHwgeSA+IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHg7XG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4IDwgeHQgfHwgeCA+IHh0K3d0KSAmJiAoeSA+PSB5dCAmJiB5IDw9IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKVxuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICBSZWN0ID0gW3huLHluLHduLGhuXTtcbiAgICAgICAgXG4vLyAgICAgfVxuXG4vLyAgICAgbGV0IG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbi8vICAgICByZXR1cm4gbmV3UmVjdDtcblxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XG4gICAgLy/nn6nlvaLph43lj6DljLrln59cbiAgICBsZXQgbmV3UmVjdCxSZWN0XG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xuICAgIGxldCB4LHksdyxoXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XG4gICAgaWYoSXNJblJlY3QoW3hsMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hsMSx5YjFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHliMV0scmVjdDApKVxuICAgIHtcbiAgICAgICAgeCA9IE1hdGgubWF4KHhsMCx4bDEpO1xuICAgICAgICB5ID0gTWF0aC5tYXgoeXQwLHl0MSk7XG4gICAgICAgIHcgPSBNYXRoLm1pbih4cjAseHIxKSAtIHg7XG4gICAgICAgIGggPSBNYXRoLm1pbih5YjAseWIxKSAtIHk7XG4gICAgICAgIFJlY3QgPSBbeCx5LHcsaF1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuICAgIH1cblxuICAgIG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNJblJlY3QoW3gseV06IFtudW1iZXIsbnVtYmVyXSxyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xuICAgIC8v5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXG4gICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdC5zaGFwZS54LHJlY3Quc2hhcGUueSxyZWN0LnNoYXBlLndpZHRoLHJlY3Quc2hhcGUuaGVpZ2h0XVxuICAgIGlmKHggPj0geDAgJiYgeDw9eDArdzAgJiYgeSA+PSB5MCAmJiB5IDw9IHkwK2gwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHcm93UmVjdChlbDogUmVjdGFuZ2xlLyp8UmVjdEdyb3VwfEdyb3VwKi8saDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+aUvui0n+e8qSBcbiAgICAvLyBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICAvLyB7XG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICBzaGFwZTp7XG4gICAgICAgICAgICAgICAgeDplbC5zaGFwZS54IC0gaCxcbiAgICAgICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoICsgMipoLFxuICAgICAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgLSB2LFxuICAgICAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgKyAyKnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIG5ld1JlY3RcbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBSZWN0R3JvdXApXG4gICAgLy8ge1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNle1xuICAgIC8vICAgICBjb25zb2xlLmRpcihcIuexu+Wei+mUmeivr1wiKVxuICAgIC8vIH1cbn0gICAgICAgXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnNldFJlY3QoZWw6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q2j57yp6LSf5pS+XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6ZWwuc2hhcGUueCArPSBoLFxuICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCAtPSAyKmgsXG4gICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55ICs9IHYsXG4gICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0IC09IDIqdlxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2NhbGVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q+U5L6L57yp5pS+XG4gICAgbGV0IGgwID0gcmVjdC5zaGFwZS53aWR0aCAqIChoLTEpIC8gMlxuICAgIGxldCB2MCA9IHJlY3Quc2hhcGUuaGVpZ2h0ICogKHYtMSkgLyAyXG4gICAgY29uc29sZS5kaXIoaDArJyAnK3YwKVxuICAgIGxldCBuZXdSZWN0ID0gR3Jvd1JlY3QocmVjdCxoMCx2MClcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNFbXB0eVJlY3QocmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreefqemYteaYr+WQpuS4uuepulxuICAgIGxldCBhcmVhID0gcmVjdC5zaGFwZS53aWR0aCAqIHJlY3Quc2hhcGUuaGVpZ2h0O1xuICAgIGlmKGFyZWEgPT09IDApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0T2ZNYXRyaXgoKXtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdExlZnQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RSaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RUb3AocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RCb3RvbShyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueSArIHJlY3Quc2hhcGUuaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbmlvblJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogdW5pb25SZWN0e1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIHggPSBNYXRoLm1pbih4bDAseGwxKTtcbiAgICB5ID0gTWF0aC5taW4oeXQwLHl0MSk7XG4gICAgdyA9IE1hdGgubWF4KHhyMCx4cjEpIC0geDtcbiAgICBoID0gTWF0aC5tYXgoeWIwLHliMSkgLSB5O1xuICAgIG5ld1JlY3QgPSBuZXcgdW5pb25SZWN0KFt4LHksdyxoXSxyZWN0MCxyZWN0MSk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxSZWN0KHJlY3Q6IFJlY3RhbmdsZSxmaWxsPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQ2lyY2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQ2lyY2xlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBDaXJjbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcbiAgICBsZXQgc2ggPSBjaXJjbGUuc2hhcGVcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAganVkZ2VUUlMoY2lyY2xlKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpO1xuICAgIGp1ZGdlU3R5bGUoY2lyY2xlLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBjaXJjbGU7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xuICAgIGxldCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcjogclxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNpcmNsZVxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHhFbmQ6IG51bWJlcixcbiAgICB5RW5kOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIExpbmVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogTGluZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImxpbmVcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBMaW5lT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGNsYXNzIGxpbmV7XG4vLyAgICAgbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XG4vLyAgICAgICAgIGxldCBsID0gdGhpcy5tYWtlTGluZShsaW5lLGN0eCk7XG4vLyAgICAgICAgIHJldHVybiBsO1xuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuICAgIGxldCBzaCA9IGxpbmUuc2hhcGU7XG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGp1ZGdlVFJTKGxpbmUpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54RW5kLHNoLnlFbmQpXG4gICAganVkZ2VTdHlsZShsaW5lLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGxpbmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdMaW5lcyhlbDogTGluZVtdfEdyb3VwW118R3JvdXApOiBHcm91cHtcbiAgICAvL+e7mOWItuWkmuadoee6vyBvcHRzOue6v+adoeWxnuaAp1xuICAgIGxldCBncm91cCA9IG5ldyBHcm91cChlbClcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdNbGluZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLGdhcD86IG51bWJlcltdLHN0eWxlPzogYm9vbGVhbixzdGlwcGxlPzogYm9vbGVhbix3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIGdhcOe6v+S5i+mXtOeahOmXtOmalCBzdHlsZT1mYWxzZeS4uuawtOW5s+W5s+ihjCw9dHJ1ZeS4uuerluebtOW5s+ihjCBzdGlwcGxlPWZhbHNl5Li65a6e57q/LD10cnVl5Li66Jma57q/XG4gICAgaWYod2lkdGhHYXAgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygd2lkdGhHYXAgIT09ICdudW1iZXInKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSAxMDtcbiAgICAgICAgaWYoc3RpcHBsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGlwcGxlICE9PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0aXBwbGUgPT09IGZhbHNlXG4gICAgICAgICAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHlsZSAhPT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmKGdhcCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gWzEwMCwxMDBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGxldCBvcHRzID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgaWYoc3RpcHBsZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBvcHRzWzBdID0gbmV3IExpbmUgKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeStnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmQrZ2FwW2ktMV0qaVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4K2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBvcHRzWzBdID0gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdLHdpZHRoR2FwKTtcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3gseStnYXBbaS0xXSppLHhFbmQseUVuZCtnYXBbaS0xXSppXSx3aWR0aEdhcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4K2dhcFtpLTFdKmkseSx4RW5kK2dhcFtpLTFdKmkseUVuZF0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgICAgIFxuICAgIFxuICAgIGxldCBncm91cCA9IERyYXdMaW5lcyhvcHRzKTtcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyB3aWR0aEdhcOmXtOmalCBcbiAgICBsZXQgbGluZWxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyh4RW5kLXgsMikrTWF0aC5wb3coeUVuZC15LDIpKVxuICAgIGlmKHdpZHRoR2FwPmxpbmVsZW5ndGh8fHdpZHRoR2FwPT09dW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSBsaW5lbGVuZ3RoLzEwO1xuICAgIH1cbiAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihsaW5lbGVuZ3RoL3dpZHRoR2FwKVxuICAgIGxldCB4ZyA9IHdpZHRoR2FwKih4RW5kLXgpL2xpbmVsZW5ndGhcbiAgICBsZXQgeWcgPSB3aWR0aEdhcCooeUVuZC15KS9saW5lbGVuZ3RoXG4gICAgLy8gY29uc29sZS5kaXIobnVtKVxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGluZSA9IG5ldyBBcnJheSgpO1xuICAgIHdoaWxlKGk8bnVtKVxuICAgIHtcbiAgICAgICAgbGluZVtpXSA9IG5ldyBMaW5lKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCt4ZyppLFxuICAgICAgICAgICAgICAgIHk6IHkreWcqaSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4K3hnKihpKzEpLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHkreWcqKGkrMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaSs9MjtcbiAgICB9XG4gICAgbGV0IExpbmVTdGlwcGxlID0gbmV3IEdyb3VwKGxpbmUpXG4gICAgcmV0dXJuIExpbmVTdGlwcGxlXG59XG5cbi8vIGV4cG9ydCBjbGFzcyBQb2x5IGV4dGVuZHMgR3JvdXB7XG4vLyAgICAgc3R5bGU6IFN0eWxlXG4vLyAgICAgY29uc3RydWN0b3IoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwLHN0eWxlPzogU3R5bGUpe1xuLy8gICAgICAgICBzdXBlcihlbClcbi8vICAgICAgICAgaWYoc3R5bGUpXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbi8vICAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbi8vICAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuLy8gICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBBcmNTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGFuZ19mOiBudW1iZXIsXG4gICAgYW5nX2U6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQXJjT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEFyY1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIEFyYyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiYXJjXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogQXJjT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XG4gICAgbGV0IHN0ID0gYXJjLnN0eWxlXG4gICAgaWYoc3QuZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHN0LmZpbGwgPT09ICdub25lJyB8fCBzdC5maWxsID09PSAnI2ZmZicpXG4gICAge1xuICAgICAgICBtYWtlRnJhbWVBcmMoYXJjLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG1ha2VGaWxsQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjO1xufVxuXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBqdWRnZVRSUyhhcmMpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxsQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19lKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2UpKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgIGN0eC5zdHJva2UoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lQXJjKGFyYzogQXJjLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBBcmN7XG4gICAgLy/nlLvnspfnur/lvKcgXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICAvLyBqdWRnZVN0eWxlX2V6c3koYXJjKVxuXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFyYzBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxBcmMoYXJjOiBBcmMsZmlsbD86IHN0cmluZyk6IEFyY3tcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBFbGxpcHNlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4PzogbnVtYmVyLFxuICAgIHk/OiBudW1iZXIsXG4gICAgcmE/OiBudW1iZXIsXG4gICAgcmI/OiBudW1iZXJcbiAgICAvL3Jh5Li65qiq5Y2K6L206ZW/IHJi5Li657q15Y2K6L206ZW/XG59XG5cbmludGVyZmFjZSBFbGxpcHNlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEVsbGlwc2VTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJlbGxpcHNlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogRWxsaXBzZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRWxsaXBzZShlbGxpcHNlOiBFbGxpcHNlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogRWxsaXBzZXtcbiAgICAvL21heOaYr+etieS6jjHpmaTku6Xplb/ovbTlgLzvvIzljbNh5ZKMYuS4reeahOi+g+Wkp+iAhVxuICAgIC8vaeavj+asoeW+queOr+WinuWKoDEvbWF477yM6KGo56S65bqm5pWw55qE5aKe5YqgXG4gICAgLy/ov5nmoLflj6/ku6Xkvb/lvpfmr4/mrKHlvqrnjq/miYDnu5jliLbnmoTot6/lvoTvvIjlvKfnur/vvInmjqXov5Ex5YOP57SgXG4gICAgbGV0IHNoID0gZWxsaXBzZS5zaGFwZVxuICAgIGxldCBzdGVwID0gKHNoLnJhID4gc2gucmIpID8gMSAvIHNoLnJhIDogMSAvIHNoLnJiO1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAganVkZ2VUUlMoZWxsaXBzZSk7XG4gICAgY3R4Lm1vdmVUbyhzaC54ICsgc2gucmEsIHNoLnkpOyAvL+S7juakreWchueahOW3puerr+eCueW8gOWni+e7mOWItlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMiAqIE1hdGguUEk7IGkgKz0gc3RlcClcbiAgICB7XG4gICAgICAgIC8v5Y+C5pWw5pa556iL5Li6eCA9IGEgKiBjb3MoaSksIHkgPSBiICogc2luKGkp77yMXG4gICAgICAgIC8v5Y+C5pWw5Li6ae+8jOihqOekuuW6puaVsO+8iOW8p+W6pu+8iVxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XG4gICAgfVxuICAgIGp1ZGdlU3R5bGUoZWxsaXBzZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGVsbGlwc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxPdmFsKGVsbGlwc2U6IEVsbGlwc2UsZmlsbD86IHN0cmluZyk6IEVsbGlwc2V7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZWxsaXBzZTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xuICAgIHhBOiBudW1iZXJbXVxuICAgIHlBOiBudW1iZXJbXVxufVxuXG5pbnRlcmZhY2UgUG9seWdvbk9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBQb2x5Z29uU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicG9seWdvblwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFBvbHlnb25PcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XG4gICAgbGV0IHNoID0gcG9seWdvbi5zaGFwZVxuICAgIGxldCBudW0gPSAwO1xuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgbnVtID0gTWF0aC5taW4oc2gueEEubGVuZ3RoLHNoLnlBLmxlbmd0aClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbnVtID0gc2gueEEubGVuZ3RoXG4gICAgfVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBqdWRnZVRSUyhwb2x5Z29uKVxuICAgIGN0eC5tb3ZlVG8oc2gueEFbMF0sc2gueUFbMF0pXG4gICAgZm9yKGxldCBpID0gMTtpIDwgbnVtO2krKylcbiAgICB7XG4gICAgICAgIGN0eC5saW5lVG8oc2gueEFbaV0sc2gueUFbaV0pXG4gICAgfVxuICAgIGN0eC5saW5lVG8oc2gueEFbMF0sc2gueUFbMF0pXG4gICAganVkZ2VTdHlsZShwb2x5Z29uLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIHBvbHlnb25cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUG9seShwb2x5Z29uOiBQb2x5Z29uLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRmlsbFBvbHkocG9seWdvbjogUG9seWdvbixmaWxsPzogc3RyaW5nKTogUG9seWdvbntcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcG9seWdvbjBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZV90ZXh0LCBqdWRnZVRleHRTdHlsZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIFRleHRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIC8v6aG65pe26ZKI5aGr5YaZ5Z2Q5qCH5oiW6aG657uY5Yi26Lev57q/5aGr5YaZ5Z2Q5qCHXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgdGV4dDogc3RyaW5nXG4gICAgbWF4V2lkdGg/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFRleHRPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogVGV4dFNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxuICAgIHRleHRMaW5lPzogVGV4dExpbmVcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUZXh0TGluZXtcbiAgICB0ZXh0QTogQ2FudmFzVGV4dEFsaWduXG4gICAgdGV4dEI6IENhbnZhc1RleHRCYXNlbGluZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFRleHRzIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJ0ZXh0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogVGV4dE9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihvcHRzLnRleHRMaW5lKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnRleHRMaW5lID0gb3B0cy50ZXh0TGluZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy50ZXh0TGluZSA9IHtcbiAgICAgICAgICAgICAgICB0ZXh0QTogJ3N0YXJ0JyxcbiAgICAgICAgICAgICAgICB0ZXh0QjogJ2FscGhhYmV0aWMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICBzZXRUZXh0TGluZSh0ZXh0TGluZTogVGV4dExpbmUpe1xuICAgICAgICBpZih0ZXh0TGluZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGV4dExpbmUudGV4dEEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0TGluZS50ZXh0QSA9IHRleHRMaW5lLnRleHRBXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0ZXh0TGluZS50ZXh0QilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRMaW5lLnRleHRCID0gdGV4dExpbmUudGV4dEJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VUZXh0KHRleHQ6IFRleHRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogVGV4dHN7XG5cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG5cbiAgICAvLyBqdWRnZVRSUyh0ZXh0KVxuICAgIGN0eC50ZXh0QWxpZ24gPSB0ZXh0LnRleHRMaW5lLnRleHRBXG4gICAgY3R4LnRleHRCYXNlbGluZSA9IHRleHQudGV4dExpbmUudGV4dEJcblxuICAgIGp1ZGdlVGV4dFN0eWxlKHRleHQsY3R4KVxuXG4gICAganVkZ2VTdHlsZV90ZXh0KHRleHQsY3R4KVxuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2F0U3RyKHN0ckE6IHN0cmluZ1tdKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBzdHJBLmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0ckFbaV07XG4gICAgfVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHJQYWQoc3RyOiBzdHJpbmcsc3RyMDogc3RyaW5nLG51bT86IG51bWJlcik6IHN0cmluZ3tcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgXG4gICAgaWYobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSAwKVxuICAgIHtcbiAgICAgICAgbnVtID0gMTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDtpPG51bTtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0cjBcbiAgICB9XG4gICAgdGV4dCArPSBzdHJcblxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJlcShzdHIwOiBzdHJpbmcsc3RyMTogc3RyaW5nKTogYm9vbGVhbntcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcbiAgICByZXN1bHQgPSBzdHIwLmluY2x1ZGVzKHN0cjEpO1xuICAgIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcGxhY2Uoc3RyOiBzdHJpbmcsc3RyX286IHN0cmluZyxzdHJfcjogc3RyaW5nKTpzdHJpbmd7XG4gICAgbGV0IHJlc3VsdCA9ICcnXG5cbiAgICByZXN1bHQgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHN0cl9vLCdnJyksc3RyX3IpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlSW1hZ2VTaGFwZSwganVkZ2VTdHlsZSxqdWRnZUltYWdlU2hhcGVfdHJ1ZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEltZ1NoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgaW1nOiBzdHJpbmdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB3aWR0aD86IG51bWJlclxuICAgIGhlaWdodD86IG51bWJlclxuICAgIHN4PzogbnVtYmVyXG4gICAgc3k/OiBudW1iZXJcbiAgICBzd2lkdGg/OiBudW1iZXJcbiAgICBzaGVpZ2h0PzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBJbWdPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogSW1nU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuY2xhc3MgUkdCQSB7XG4gICAgUjogbnVtYmVyXG4gICAgRzogbnVtYmVyXG4gICAgQjogbnVtYmVyXG4gICAgQTogbnVtYmVyXG59XG5cbmNsYXNzIFJHQkFfQXJyYXl7XG4gICAgUkdCQV9MaXN0OiBSR0JBW11cbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIEltZyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxuICAgIElzQ2hhbmdlPzogYm9vbGVhblxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEltZ09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICBpZihvcHRzLkltZyA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgSSA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICBJLnNyYyA9IG9wdHMuc2hhcGUuaW1nXG4gICAgICAgICAgICBJLmNyb3NzT3JpZ2luID0gJyc7IFxuICAgICAgICAgICAgdGhpcy5JbWcgPSBJO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLkltZyA9IG9wdHMuSW1nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXG4gICAgICAgIC8vIHRoaXMudGV4dHVyZXMgPSB7XG4gICAgICAgIC8vICAgICB0ZXh0dXJlOiBbXSxcbiAgICAgICAgLy8gICAgIHdpZHRoOiAwLFxuICAgICAgICAvLyAgICAgaGVpZ2h0OiAwXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYob3B0cy5JbWdEYXRhICE9PSB1bmRlZmluZWQpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxuICAgICAgICAvLyB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3ggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zeSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnN3aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLnNoZWlnaHQgPSB0aGlzLkltZy5oZWlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS53aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnNoYXBlLndpZHRoID0gdGhpcy5JbWcud2lkdGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5oZWlnaHQgPSB0aGlzLkltZy5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMuSW1nRGF0YSA9IG9wdHMuSW1nRGF0YVxuXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuSW1nRGF0YSlcbiAgICAgICAgXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIC8vIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICAvLyB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG4gICAgaW5pdCgpe1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAgICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGMud2lkdGggPSBzY3JlZW4uYXZhaWxXaWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBzY3JlZW4uYXZhaWxIZWlnaHQ7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UodGhhdC5JbWcsc2gueCxzaC55KVxuICAgICAgICB0aGF0LkltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKHNoLngsc2gueSx0aGF0LkltZy53aWR0aCx0aGF0LkltZy5oZWlnaHQpO1xuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5tYWtlVGV4dHVyZXMoKVxuICAgIH1cbiAgICB0b0dyYXkoKXtcbiAgICAgICAgbGV0IGltZyA9IG5ldyBJbWcoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICBpbWc6IHRoaXMuc2hhcGUuaW1nLFxuICAgICAgICAgICAgICAgIHg6IHRoaXMuc2hhcGUueCxcbiAgICAgICAgICAgICAgICB5OiB0aGlzLnNoYXBlLnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMuc2hhcGUud2lkdGgsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB0aGlzLnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgICAgICBzeDogdGhpcy5zaGFwZS5zeCxcbiAgICAgICAgICAgICAgICBzeTogdGhpcy5zaGFwZS5zeSxcbiAgICAgICAgICAgICAgICBzd2lkdGg6IHRoaXMuc2hhcGUuc3dpZHRoLFxuICAgICAgICAgICAgICAgIHNoZWlnaHQ6IHRoaXMuc2hhcGUuc2hlaWdodCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLy8gdGhpcy5Jc0NoYW5nZSA9IHRydWVcbiAgICAgICAgaW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBsZXQgZyA9IDBcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGhpcy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBnID0gTWF0aC5mbG9vcih0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMF0gKiAwLjI5OSArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsxXSAqIDAuNTg3ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzJdICogMC4xMTQpO1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gPSB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrM11cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cbiAgICByZXBsYWNlKCl7XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICBtYWtlVGV4dHVyZXMoKXtcbiAgICAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IG5ldyBUZXh0dXJlcyh0aGlzKTtcbiAgICAgICAgbGV0IGltZyA9IHRoaXMudG9HcmF5KCk7XG4gICAgICAgIGxldCBkYXRhMCA9IGltZy5JbWdEYXRhLmRhdGE7XG4gICAgICAgIGxldCBhID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IGFyciA9ICcnXG4gICAgICAgIGxldCBudW1BcnI6IG51bWJlcltdID0gW107XG4gICAgICAgIGxldCBudW1BcnIwOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuSW1nRGF0YS5kYXRhXG4gICAgICAgIGxldCB3ID0gdGhpcy5JbWdEYXRhLndpZHRoXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGRhdGEpXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEwLmxlbmd0aC80O2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgMzt0KyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBrID0gMDtrIDwgMztrKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihkYXRhMFs0KmldIDw9IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSB8fCBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAwXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKDMqdCtrICE9PSA0KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIgKz0gYVszKnQra10udG9TdHJpbmcoKTsgXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoKGkrKHQtMSkqdytrLTEpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG51bUFycltpXSA9IHBhcnNlSW50KGFyciwyKVxuICAgICAgICAgICAgYXJyID0gJydcbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1BcnIubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF09bnVtQXJyW2ldXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXT1udW1BcnJbaV1cbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdPW51bUFycltpXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUltZyhpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEltZ3tcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8ganVkZ2VUUlMoaW1nKVxuICAgIGlmKGltZy5Jc0NoYW5nZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBqdWRnZUltYWdlU2hhcGUoaW1nLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZyxjdHgpO1xuICAgIH1cbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1SZWFkKGltZzogSW1nKTogSW1hZ2VEYXRheyAgICAgICAgIC8v6K+75Y+W5Zu+54mH55+p6Zi1XG4gICAgcmV0dXJuIGltZy5JbWdEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5wYWNrQ29sb3JJbWFnZShpbWc6IEltZyk6IFJHQkFfQXJyYXl7XG4gICAgbGV0IHJnYmEgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBkYXRhID0gaW1nLkltZ0RhdGEuZGF0YVxuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgcmdiYVtpXSA9IG5ldyBSR0JBKClcbiAgICAgICAgXG4gICAgICAgIHJnYmFbaV0uUiA9IGRhdGFbNCppKzBdXG4gICAgICAgIHJnYmFbaV0uRyA9IGRhdGFbNCppKzFdXG4gICAgICAgIHJnYmFbaV0uQiA9IGRhdGFbNCppKzJdXG4gICAgICAgIHJnYmFbaV0uQSA9IGRhdGFbNCppKzNdXG5cbiAgICB9XG5cbiAgICBsZXQgcmdiYV9hcnIgPSBuZXcgUkdCQV9BcnJheSgpXG4gICAgcmdiYV9hcnIuUkdCQV9MaXN0ID0gcmdiYTtcbiAgICByZ2JhX2Fyci53aWR0aCA9IGltZy5JbWdEYXRhLndpZHRoXG4gICAgcmdiYV9hcnIuaGVpZ2h0ID0gaW1nLkltZ0RhdGEuaGVpZ2h0XG5cbiAgICByZXR1cm4gcmdiYV9hcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBhY2tDb2xvckltYWdlKHJnYmFfYXJyOiBSR0JBX0FycmF5KTogSW1hZ2VEYXRhe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG5cbiAgICBsZXQgaW1nZGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEocmdiYV9hcnIud2lkdGgscmdiYV9hcnIuaGVpZ2h0KTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCByZ2JhX2Fyci5SR0JBX0xpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMF0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uUlxuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzFdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkdcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsyXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5CXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrM10gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQVxuICAgIH1cbiAgICByZXR1cm4gaW1nZGF0YVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlSW4oaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXG4gICAge1xuICAgICAgICBhbHBoYUluID0gMTtcbiAgICB9XG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxuICAgICAgICB9XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSBhbHBoYUluXG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTWFza0ltYWdlT3V0KGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxuICAgIHtcbiAgICAgICAgYWxwaGFJbiA9IDA7XG4gICAgfVxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gKDEgLSBhbHBoYUluKVxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEltZ0luaXQoaW1nOiBJbWdbXXxHcm91cCl7XG4gICAgbGV0IEk7XG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEkgPSBpbWdcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIEkuZ3JvdXBMaXN0W2ldLmluaXQoKVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFByZWxvYWRUZXh0dXJlcyhpbWc6IEltZyk6IEltZ3tcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdUZXh0dXJlKGltZzogSW1nKTogSW1ne1xuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmVzKGltZzogSW1nW118R3JvdXApOiBHcm91cHtcbiAgICBsZXQgSTtcbiAgICBsZXQgdGV4dHVyZTogSW1nW10gPSBbXVxuICAgIGxldCBUO1xuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBJID0gaW1nXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICB0ZXh0dXJlW2ldID0gRHJhd1RleHR1cmUoSS5ncm91cExpc3RbaV0pXG4gICAgfVxuICAgIFQgPSBuZXcgR3JvdXAodGV4dHVyZSlcbiAgICByZXR1cm4gVDtcbn0iLCJcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsW3gwLHkwLHgxLHkxXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sbnVtOiBudW1iZXIsczogbnVtYmVyKTogQ2FudmFzR3JhZGllbnR7XG4gICAgbGV0IGZpbGwgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoeDAseTAtcyx4MSx5MS1zKVxuICAgIGZpbGwuYWRkQ29sb3JTdG9wKDAsJyNmZmYnKVxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspe1xuICAgICAgICBpZihpJTIgPT09IDEpe1xuICAgICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJyMwMDAnKVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmaWxsLmFkZENvbG9yU3RvcChpL251bSwnI2ZmZicpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZmlsbC5hZGRDb2xvclN0b3AoMSwnI2ZmZicpXG4gICAgcmV0dXJuIGZpbGxcbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBkZWxheV9mcmFtZSwgbmFtZVN0eWxlLCBPcHRzLCBTaGFwZSwgU3R5bGUgfSBmcm9tIFwiLi4vZXpwc3lcIjtcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCwganVkZ2VTdHlsZSB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudCB9IGZyb20gXCIuLi9HcmFkaWVudC9ncmFkaWVudFwiO1xuXG5pbnRlcmZhY2UgR3JhdFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgZGVzaXR5OiBudW1iZXIgLy/lr4bpm4bluqZcbn1cblxuaW50ZXJmYWNlIEdyYXRPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaHBhZTogR3JhdFNoYXBlLFxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDBcblxuZXhwb3J0IGNsYXNzIEdyYXQgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImdyYXRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBHcmF0T3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgaWYoIW9wdHMuc2hhcGUuZGVzaXR5KVxuICAgICAgICB7XG4gICAgICAgICAgICBvcHRzLnNoYXBlLmRlc2l0eSA9IDM1XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGVcbiAgICAgICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1xuICAgICAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KFwiMmRcIik7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICBmaWxsOiBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFtzaC54LXNoLnIsc2gueS1zaC5yLHNoLngtc2gucixzaC55KzMqc2gucl0sc2guZGVzaXR5LDApLFxuICAgICAgICAgICAgc3Ryb2tlOiAnbm9uZScsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgfVxuICAgICAgICAvLyBpZihvcHRzLnN0eWxlKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgLy8gICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgLy8gICAgICAgICBzdHJva2U6IFwibm9uZVwiLFxuICAgICAgICAvLyAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG4gICAgcGxheShzcGVlZD86IG51bWJlcixkZWxheT86IG51bWJlcilcbiAgICB7XG4gICAgICAgIGlmKCFkZWxheSl7XG4gICAgICAgICAgICBkZWxheSA9IDZcbiAgICAgICAgICAgIGlmKCFzcGVlZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDhcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnktdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55KzMqdGhpcy5zaGFwZS5yXVxuICAgICAgICBsZXQgaW5kZXggPSBzcGVlZDtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHRoaXMuYW5pbWF0ZSgoKT0+e1xuICAgICAgICAgICAgdGhhdC5zdHlsZS5maWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbeDAseTAseDEseTFdLHRoYXQuc2hhcGUuZGVzaXR5LGluZGV4KmkpO1xuICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodGhhdClcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfSxkZWxheSlcbiAgICB9XG4gICAgLy8gcGxheShzcGVlZD86IG51bWJlcixkZWxheT86IG51bWJlcil7XG4gICAgLy8gICAgIGlmKCFkZWxheSl7XG4gICAgLy8gICAgICAgICBkZWxheSA9IDhcbiAgICAvLyAgICAgICAgIGlmKCFzcGVlZClcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcGVlZCA9IDhcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnktdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55KzMqdGhpcy5zaGFwZS5yXVxuICAgIC8vICAgICBsZXQgaW5kZXggPSBzcGVlZDtcbiAgICAvLyAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8vICAgICAoYXN5bmMgZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA+IC0xO2krKylcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBsZXQgZmlsbCA9IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHgsW3gwLHkwLHgxLHkxXSx0aGF0LnNoYXBlLmRlc2l0eSxpbmRleCppKTtcbiAgICAvLyAgICAgICAgICAgICBpZihpbmRleCppID49IDIqdGhhdC5zaGFwZS5yKVxuICAgIC8vICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgaSA9IDBcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgdXBkYXRlR3JhdCh0aGF0LGN0eCxmaWxsKVxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGkpXG4gICAgLy8gICAgICAgICAgICAgLy8gdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpO1xuICAgIC8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKGRlbGF5KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KSgpXG4gICAgICAgIFxuICAgIC8vIH1cbiAgICAvLyBwbGF5KHNwZWVkPzogbnVtYmVyLGRlbGF5PzogbnVtYmVyKXtcbiAgICAvLyAgICAgaWYoIWRlbGF5KXtcbiAgICAvLyAgICAgICAgIGRlbGF5ID0gOFxuICAgIC8vICAgICAgICAgaWYoIXNwZWVkKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNwZWVkID0gOFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICAvLyBjb25zb2xlLmRpcignYScpXG4gICAgLy8gICAgIC8vIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAvLyAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgLy8gICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvLyAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIHVwZGF0ZUdyYXQwKHRoYXQsY3R4LGluZGV4KmkpXG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoaSlcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZShkZWxheSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkoKVxuICAgIC8vIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VHcmF0KGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBHcmF0e1xuICAgIGxldCBzaCA9IGdyYXQuc2hhcGU7XG4gICAgLy8gY29uc29sZS5kaXIoc2gpXG4gICAgLy8gbGV0IG51bSA9IHNoLmRlc2l0eTtcbiAgICAvLyBsZXQgZmlsbCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngtc2gucixzaC55K3NoLnIpXG4gICAgLy8gZmlsbC5hZGRDb2xvclN0b3AoMCwnd2hpdGUnKVxuICAgIC8vIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspe1xuICAgIC8vICAgICBpZihpJTIgPT09IDEpe1xuICAgIC8vICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJ2JsYWNrJylcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJ3doaXRlJylcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBmaWxsLmFkZENvbG9yU3RvcCgxLCd3aGl0ZScpXG4gICAgLy8gbGV0IGZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFtzaC54LXNoLnIsc2gueS1zaC5yLHNoLngtc2gucixzaC55KzMqc2gucl0sbnVtLDApXG4gICAgLy8gbGV0IGMgPSBjdHguY2FudmFzXG4gICAgLy8gYy5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnNTAlJztcbiAgICAvLyBncmF0LnN0eWxlLmZpbGwgPSBmaWxsXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGV6SnVkZ2UuanVkZ2VUUlMoZ3JhdClcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKVxuICAgIC8vIGN0eC5yZWN0KHNoLngtc2gucixzaC55LXNoLnIsc2gueCtzaC5yLHNoLnkrMypzaC5yKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIGN0eC5zYXZlKClcbiAgICAvLyBjdHguYmVnaW5QYXRoKCk7XG4gICAgLy8gY3R4LnJlY3Qoc2gueC1zaC5yLHNoLnktc2gucixzaC54K3NoLnIsc2gueSsyKnNoLnIpO1xuICAgIC8vIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpO1xuICAgIC8vIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24taW4nXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9ICdibGFjaydcbiAgICAvLyBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICAvLyBjdHguZmlsbCgpXG4gICAgLy8gY3R4LmNsb3NlUGF0aCgpO1xuICAgIC8vIGN0eC5yZXN0b3JlKClcbiAgICBcbiAgICByZXR1cm4gZ3JhdDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlR3JhdChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELGZpbGw6IENhbnZhc0dyYWRpZW50KXtcbiAgICBncmF0LnJlbW92ZSgpXG4gICAgZ3JhdC5zdHlsZS5maWxsID0gZmlsbFxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoZ3JhdC5zaGFwZS54LGdyYXQuc2hhcGUueSxncmF0LnNoYXBlLnIsMCwyKk1hdGguUEkpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZnVuY3Rpb24gdXBkYXRlR3JhdDAoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxudW06IG51bWJlcil7XG4gICAgLy8gY29uc29sZS5kaXIoZ3JhdClcbiAgICBncmF0LnJlbW92ZSgpXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC50cmFuc2xhdGUoMCwtbnVtKVxuICAgIGN0eC5yZWN0KGdyYXQuc2hhcGUueC1ncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS55LWdyYXQuc2hhcGUucixncmF0LnNoYXBlLngrZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueSszKmdyYXQuc2hhcGUucilcbiAgICBqdWRnZVN0eWxlKGdyYXQsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbn0iLCJpbXBvcnQge2NhbnZhc1N0eWxlfSBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0IHsgRGl2U3R5bGUgfSBmcm9tICcuLi9EaXYvZGl2J1xuaW1wb3J0IHsgUmVjdGFuZ2xlLG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnIFxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgQ2lyY2xlLG1ha2VDaXJjbGUgfSBmcm9tICcuLi9HcmFwaGljL2NpcmNsZSdcbmltcG9ydCB7IExpbmUsIG1ha2VMaW5lfSBmcm9tICcuLi9HcmFwaGljL2xpbmUnXG5pbXBvcnQgeyBBcmMsIG1ha2VBcmMgfSBmcm9tICcuLi9HcmFwaGljL2FyYydcbmltcG9ydCB7IEVsbGlwc2UsIG1ha2VFbGxpcHNlIH0gZnJvbSAnLi4vR3JhcGhpYy9lbGxpcHNlJ1xuaW1wb3J0IHsgbWFrZVBvbHlnb24sIFBvbHlnb24gfSBmcm9tICcuLi9HcmFwaGljL3BvbHlnb24nXG5pbXBvcnQgeyBtYWtlVGV4dCwgVGV4dHMgfSBmcm9tICcuLi9HcmFwaGljL3RleHQnXG5pbXBvcnQgeyBJbWcsIG1ha2VJbWcgfSBmcm9tICcuLi9HcmFwaGljL2ltYWdlJ1xuaW1wb3J0IHsgY29udGVudFN0eWxlIH0gZnJvbSAnLi4vRGlhbG9ndWUvZGlhbG9ndWUnXG5pbXBvcnQgeyBHcmF0LCBtYWtlR3JhdCB9IGZyb20gJy4uL0dyYXBoaWMvZ3JhdGluZydcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4uL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgeyBEbGdDb250ZW50IH0gZnJvbSAnLi4vZXpwc3knXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpOmNhbnZhc1N0eWxle1xuICAgIGlmKCFjU3R5bGUpIFxuICAgIHtcbiAgICAgICAgY1N0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS53aWR0aClcbiAgICB7XG4gICAgICAgIGNTdHlsZS53aWR0aCA9IDQwMFxuICAgIH1cbiAgICBpZighY1N0eWxlLmhlaWdodClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5oZWlnaHQgPSA0MDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRGl2U3R5bGUoZFN0eWxlOiBEaXZTdHlsZSk6IERpdlN0eWxle1xuICAgIGlmKCFkU3R5bGUpIFxuICAgIHtcbiAgICAgICAgZFN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogMjYwLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcyMHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFkU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBkU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBkU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuYm9yZGVyKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmJvcmRlciA9ICdub25lJ1xuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlclJhZGl1cylcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXJSYWRpdXMgPSAnNXB4J1xuICAgIH1cbiAgICByZXR1cm4gZFN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDb250ZW50U3R5bGUoY1N0eWxlOiBjb250ZW50U3R5bGUsdGl0bGU6IHN0cmluZyxjb250ZW50OiBzdHJpbmcpOiBjb250ZW50U3R5bGV7XG4gICAgaWYoIWNTdHlsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBidG5TdHI6IFsnT0snXSxcbiAgICAgICAgICAgIG5vSWNvbjogZmFsc2UsXG4gICAgICAgICAgICBub0ludDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtUG9zaXRpb246IDBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighY1N0eWxlLnRpdGxlKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLnRpdGxlID0gdGl0bGVcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb250ZW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbnRlbnQgPSBjb250ZW50XG4gICAgfVxuICAgIGlmKCFjU3R5bGUuYnRuU3RyKXtcbiAgICAgICAgY1N0eWxlLmJ0blN0ciA9IFsnT0snXVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSWNvbilcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ljb24gPSBmYWxzZVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLm5vSW50ID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb25maXJtUG9zaXRpb24pXG4gICAge1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMDtcbiAgICB9XG4gICAgaWYoY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMCAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAxICYmIGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDIpe1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMFxuICAgIH1cbiAgICByZXR1cm4gY1N0eWxlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZU1vZGVsKG1vZGVsOiBzdHJpbmcpOiBbc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nXXtcbiAgICBpZihtb2RlbCA9PT0gJ2Vycm9yJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCJYXCIsJ3JlZCcsJ0Vycm9yIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaGVscCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnLCdIZWxwIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGhlbHAgc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdxdWVzdCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiP1wiLCdncmV5JyxcIlF1c2V0IERpYWxvZ3VlXCIsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3dhcm4nKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnV2FybmluZyBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCB3YXJuaW5nIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaW5wdXQnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIklucHV0IERpYWxvZ3VlXCIsXCJUaGlzIGlzIGRlZmF1bHQgaW5wdXQgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdzZWxlY3QnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIlNlbGVjdCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IHNlbGVjdCBzdHJpbmdcIl1cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2ZpbGUnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJywnRmlsZSBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBmaWxlIHN0cmluZyddXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBbJ++9nicsJ2dyZWVuJywnRGFpbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZGFpbG9ndWUgc3RyaW5nJ11cbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKHN0eWxlOiBTdHlsZSl7XG4vLyAgICAgaWYoIXN0eWxlKVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50KGVsOiBFbGVtZW50c3xHcm91cHxFbGVtZW50c1tdLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAvLyBjb25zb2xlLmRpcihSZWN0YW5nbGUpXG4gICAgLy8gY29uc29sZS5kaXIoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBtYWtlUmVjdGFuZ2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBtYWtlQ2lyY2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbWFrZUxpbmUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIG1ha2VBcmMoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICBtYWtlRWxsaXBzZShlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbWFrZVBvbHlnb24oZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgVGV4dHMpXG4gICAge1xuICAgICAgICBtYWtlVGV4dChlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JhdClcbiAgICB7XG4gICAgICAgIG1ha2VHcmF0KGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBtYWtlSW1nKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xuICAgICAgICAvLyBjb25zb2xlLmRpcihsaXN0WzBdKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaXN0W2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAganVkZ2VFbGVtZW50KGxpc3RbaV0sY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgIC8vICAgICBsZXQgbGlzdCA9IGVsO1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGp1ZGdlQW5pbWF0ZShlbCk7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6ICdcIiMwMDAwMDBcIicsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5saW5lV2lkdGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDI7XG4gICAgfVxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSAnXCIjMDAwMDAwXCInXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGlmKCEoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpKXtcbiAgICAvLyAgICAgLy8gc3Quc3Ryb2tlID0gJyMwMDAnO1xuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgIC8vIGN0eC5maWxsKCk7XG4gICAgLy8gY3R4LnN0cm9rZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZWwuc2hhcGUubWF4V2lkdGggPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnNoYXBlLm1heFdpZHRoID0gY3R4LmNhbnZhcy53aWR0aDtcbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgICAgIGN0eC5maWxsVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5tYXhXaWR0aCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlVGV4dFN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcbiAgICBsZXQgZm9udFN0cmluZyA9ICcnO1xuICAgIGlmKHN0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdCA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzdC5mb250U3R5bGUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U3R5bGUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgIT09ICdpdGFsaWMnICYmIHN0LmZvbnRTdHlsZSAhPT0gJ29ibGlxdWUnICYmIHN0LmZvbnRTdHlsZSAhPT0gXCJub3JtYWxcIil7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAnMCcpe1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzEnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSBzdC5mb250VmFyaWFudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnc21hbGwtY2FwcycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGRlcicgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2xpZ2h0ZXInKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250U2l6ZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTaXplICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U2l6ZS5pbmRleE9mKCdweCcpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgfVxuICAgIGZvbnRTdHJpbmcgPSBzdC5mb250U3R5bGUgKyAnICcgKyBzdC5mb250VmFyaWFudCArICcgJyArIHN0LmZvbnRXZWlnaHQgKyAnICcgKyBzdC5mb250U2l6ZSArICcgJyArIHN0LmZvbnRGYW1pbHk7XG4gICAgY3R4LmZvbnQgPSBmb250U3RyaW5nO1xuICAgIC8vIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XG4gICAgbGV0IHggPSAxO1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICB7XG4gICAgICAgIGVsID0gZWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcbiAgICAgICAge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RMRUZUJyB8fCBlbCA9PT0gXCJMRUZUXCIgfHwgZWwgPT09ICdMJyl7XG4gICAgICAgICAgICB4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RUT1AnIHx8IGVsID09PSBcIlRPUFwiIHx8IGVsID09PSAnVCcpe1xuICAgICAgICAgICAgeCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RSSUdIVCcgfHwgZWwgPT09IFwiUklHSFRcIiB8fCBlbCA9PT0gJ1InKXtcbiAgICAgICAgICAgIHggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUQk9UVE9NJyB8fCBlbCA9PT0gXCJCT1RUT01cIiB8fCBlbCA9PT0gJ0InKXtcbiAgICAgICAgICAgIHggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXG4gICAge1xuICAgICAgICBpZihlbDw1KVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhSXQgd2lsbCB1c2UgZGVmYXVsdCBpbnN0cnVjdGlvbiEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xuICAgIGxldCBmMCA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMCk7XG4gICAgbGV0IGYxID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUxKTtcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XG4gICAgICAgIGlmKGYxID09PSAyIHx8IGYxID09PSA0KXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHQgPSBmMTtcbiAgICAgICAgICAgIGYxID0gZjA7XG4gICAgICAgICAgICBmMCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpe1xuICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMyl7XG4gICAgICAgICAgICBmMSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtmMCxmMV1cbn0gICBcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXG4gICAgaWYoc2guc3ggPT09IHVuZGVmaW5lZCB8fCBzaC5zeSA9PT0gdW5kZWZpbmVkIHx8IHNoLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSXNJbkVsZW1lbnQoW3gseV06IFtudW1iZXIsbnVtYmVyXSxlbDogRWxlbWVudHMpOiBib29sZWFue1xuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcbiAgICAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLndpZHRoLGVsLnNoYXBlLmhlaWdodF1cbiAgICAgICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucl1cbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeC14MCwyKSArIE1hdGgucG93KHkteTAsMikpXG4gICAgICAgIGlmKHIgPD0gcjApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnhFbmQsZWwuc2hhcGUueUVuZF1cbiAgICAgICAgaWYoeDEgIT09IHgwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgeXQgPSAoeTEteTApLyh4MS14MCkgKiAoeCAtIHgwKSArIHkwXG4gICAgICAgICAgICBpZih5ID49IHl0LTE1ICYmIHkgPD0geXQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB4dCA9ICh4MS14MCkvKHkxLXkwKSAqICh5IC0geTApICsgeDBcbiAgICAgICAgICAgIGlmKHkgPj0geHQtMTUgJiYgeSA8PSB4dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscmEwLHJiMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJhLGVsLnNoYXBlLnJiXVxuICAgICAgICBsZXQgdCA9IE1hdGgucG93KHgteDAsMikvTWF0aC5wb3cocmEwLDIpICsgTWF0aC5wb3coeS15MCwyKS9NYXRoLnBvdyhyYjAsMilcbiAgICAgICAgaWYodCA8PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICB7XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBsZXQgaiA9IGkgKyAxXG4gICAgICAgIGxldCBpbmRleCA9IDBcbiAgICAgICAgbGV0IHh0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHl0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IFt4MCx5MF0gPSBbZWwuc2hhcGUueEEsZWwuc2hhcGUueUFdXG4gICAgICAgIGZvcihpID0gMDtpPGVsLnNoYXBlLnhBLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGkgPT09IGVsLnNoYXBlLnhBLmxlbmd0aC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGogPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGogPSBpICsgMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeTBbaV0gIT09IHkwW2pdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHh0W2luZGV4XSA9ICh4MFtpXS14MFtqXSkvKHkwW2ldLXkwW2pdKSAqICh5IC0geTBbaV0pICsgeDBbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgeXRbaW5kZXhdID0gKHkwW2pdLXkwW2ldKS8oeDBbal0teDBbaV0pICogKHggLSB4MFtpXSkgKyB5MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeCA9PT0geHRbaW5kZXhdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHh0W2luZGV4XSA+PSB4KXtcbiAgICAgICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5kZXglMj09PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGNcbiAgICAvLyAgICAgbGV0IGksalxuICAgIC8vICAgICBsZXQgbCA9IGVsLnNoYXBlLnlBLmxlbmd0aFxuICAgIC8vICAgICBmb3IoYyA9IGZhbHNlLGkgPSAtMSxqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSBcbiAgICAvLyAgICAgICAgICggKGVsLnNoYXBlLnlBW2ldIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2pdKSB8fCAoZWwuc2hhcGUueUFbal0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbaV0pICkgXG4gICAgLy8gICAgICAgICAmJiAoeCA8IChlbC5zaGFwZS54QVtqXSAtIGVsLnNoYXBlLnhBW2ldKSAqICh5IC0gZWwuc2hhcGUueUFbaV0pIC8gKGVsLnNoYXBlLnlBW2pdIC0gZWwuc2hhcGUueUFbaV0pICsgZWwuc2hhcGUueEFbaV0pIFxuICAgIC8vICAgICAgICAgJiYgKGMgPSAhYyk7IFxuICAgIC8vICAgICByZXR1cm4gYzsgXG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VBbmltYXRlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8gY29uc29sZS5kaXIoJ2EnKVxuXG4gICAgZWwucmVtb3ZlKClcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnRyYW5zbGF0ZShlbC50cmFuc2xhdGUueCxlbC50cmFuc2xhdGUueSlcbiAgICBjdHgucm90YXRlKGVsLnJvdGF0ZSlcbiAgICBjdHguc2NhbGUoZWwuc2NhbGUud2lkdGgsZWwuc2NhbGUuaGVpZ2h0KVxuICAgIGp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUUlMoZWw6IEVsZW1lbnRzKXtcbiAgICBsZXQgY3R4ID0gZWwuY3R4XG4gICAgY3R4LnRyYW5zbGF0ZShlbC50cmFuc2xhdGUueCxlbC50cmFuc2xhdGUueSlcbiAgICBjdHgucm90YXRlKGVsLnJvdGF0ZSlcbiAgICBjdHguc2NhbGUoZWwuc2NhbGUud2lkdGgsZWwuc2NhbGUuaGVpZ2h0KVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VLZXkoa2V5Q29kZTogbnVtYmVyLGtleUNvZGVEaWN0aW9uYXJ5OiBPYmplY3QpOiBzdHJpbmd7XG4gICAgbGV0IGtleSA9IGtleUNvZGVEaWN0aW9uYXJ5W2tleUNvZGVdO1xuICAgIHJldHVybiBrZXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudDogRGxnQ29udGVudCx0aXRsZTogc3RyaW5nLGNvbnRlbnQ/OiBzdHJpbmcsb2s/OiBzdHJpbmcsY2FuY2VsPzogc3RyaW5nKTogRGxnQ29udGVudHtcbiAgICBpZihvayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgb2sgPSAnT0snXG4gICAgfVxuICAgIGlmKGNhbmNlbCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgY2FuY2VsID0gJ0NhbmNlbCdcbiAgICB9XG4gICAgaWYoZGxnQ29udGVudCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGRsZ0NvbnRlbnQgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgY29uZmlybTogb2ssXG4gICAgICAgICAgICBjYW5jZWw6IGNhbmNlbFxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQudGl0bGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgZGxnQ29udGVudC50aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbnRlbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoZGxnQ29udGVudC5jb250ZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGxnQ29udGVudC5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LmNvbmZpcm0gPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgZGxnQ29udGVudC5jb25maXJtID0gb2tcbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LmNhbmNlbCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuY2FuY2VsID0gY2FuY2VsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkbGdDb250ZW50O1xuICAgIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBuYW1lU3R5bGUsIFRleHRMaW5lIH0gZnJvbSBcIi4uL2V6cHN5XCI7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gXCIuLi9Hcm91cC9ncm91cFwiO1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuXG5leHBvcnQgY2xhc3MgU3RvcmFnZXtcbiAgICBFbGVtZW50c0xpc3Q6IEFycmF5PEVsZW1lbnRzPlxuICAgIHRleHRMaW5lOiBUZXh0TGluZVxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuRWxlbWVudHNMaXN0ID0gW107XG4gICAgfVxuICAgIHB1c2goZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzIHx8IGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnB1c2goZWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnB1c2goZWxbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZShlbDogRWxlbWVudHMgfCBBcnJheTxFbGVtZW50cz4gfCBHcm91cCl7XG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5nZXRFbGVtZW50c05hbWUoZWwpO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNlYXJjaEVsZW1lbnRzTmFtZShuYW1lKTtcbiAgICAgICAgaWYoaW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaW5kZXggaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbmRleC5zb3J0KCk7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gaW5kZXgubGVuZ3RoLTE7aSA+PSAwO2ktLSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnNwbGljZShpbmRleFtpXSwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50c05hbWUoZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzIHx8IGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZWwubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IG5ldyBBcnJheSgpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWVbaV0gPSBlbFtpXS5uYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1lbnRzTmFtZShuYW1lOiBuYW1lU3R5bGUgfCBBcnJheTxuYW1lU3R5bGU+KXtcbiAgICAgICAgaWYobmFtZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBuZXcgQXJyYXkoKVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbmFtZS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IHRoaXMuRWxlbWVudHNMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihuYW1lW2ldLm5hbWUgPT09IHRoaXMuRWxlbWVudHNMaXN0W3RdLm5hbWUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhbaV0gPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCB0aGlzLkVsZW1lbnRzTGlzdC5sZW5ndGg7dCsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKG5hbWUubmFtZSA9PT0gdGhpcy5FbGVtZW50c0xpc3RbdF0ubmFtZS5uYW1lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVEcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAgICAgbGV0IGVsID0gdGhpcy5FbGVtZW50c0xpc3RcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZWxbaV0uY3R4ID0gY3R4XG4gICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbFtpXSxjdHgpXG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsganVkZ2VJc0luRWxlbWVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gS2JXYWl0KGtleTogbnVtYmVyLGZ1bmM/OiBGdW5jdGlvbik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZnVuYylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JOYW1lKGtleTogc3RyaW5nfG51bWJlcik6bnVtYmVye1xuICAgIGxldCByZXM7XG5cbiAgICBpZih0eXBlb2Yga2V5ID09PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHJlcyA9IGtleS5jaGFyQ29kZUF0KDApXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJlcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5KVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmRpcihyZXMpIFxuICAgIHJldHVybiByZXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUHJlc3NXYWl0KGtleTogbnVtYmVyfEFycmF5PG51bWJlcj4pOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgbGV0IGtleUMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgaWYodHlwZW9mIGtleSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtleUMgPSBba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAga2V5QyA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGtleUMubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5Q1tpXSl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZS5rZXlDb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUmVsZWFzZVdhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxldCB4LHlcbiAgICAgICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWFxuICAgICAgICAgICAgICAgIHkgPSBlLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih4KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHkpXG4gICAgICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmKVxuICAgICAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG59IiwiZXhwb3J0IGNsYXNzIFRpbWV7XG4gICAgc3RhcnRUaW1lOiBudW1iZXJcbiAgICB0aW1lU3RhbXA6IEFycmF5PG51bWJlcj5cbiAgICB0aW1lQ29udGludWVWYWx1ZTogQXJyYXk8bnVtYmVyPlxuICAgIHRpbWVJbnRlcnZhbFZhbHVlOiBBcnJheTxudW1iZXI+XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IFtdXG4gICAgICAgIHRoaXMudGltZUNvbnRpbnVlVmFsdWUgPSBbXVxuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlID0gW11cbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMudGltZVN0YW1wLnB1c2gocGVyZm9ybWFuY2Uubm93KCkpXG4gICAgfVxuICAgIGdldFN0YW1wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVTdGFtcFxuICAgIH1cbiAgICBnZXRDb250aW51ZVZhbHVlKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMudGltZVN0YW1wLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGltZUNvbnRpbnVlVmFsdWUucHVzaCh0aGlzLnRpbWVTdGFtcFtpXSAtIHRoaXMudGltZVN0YW1wW2ktMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVDb250aW51ZVZhbHVlO1xuICAgIH1cbiAgICBnZXRJbnRlcnZhbFZhbHVlKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMudGltZVN0YW1wLmxlbmd0aDtpKz0yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLnRpbWVTdGFtcClcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlLnB1c2godGhpcy50aW1lU3RhbXBbaV0gLSB0aGlzLnRpbWVTdGFtcFtpLTFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50aW1lSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzbGVlcChkZWxheTogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+e1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9Pntcbi8vICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICsgZGVsYXk7XG4vLyAgICAgICAgIHdoaWxlKHBlcmZvcm1hbmNlLm5vdygpIDwgc3RhcnRUaW1lKSB7fVxuLy8gICAgICAgICByZXMoMSlcbi8vICAgICB9KVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gc2xlZXAoZGVsYXk6IG51bWJlcil7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICBkZWxheSA9IE1hdGguZmxvb3IoZGVsYXkvMTAwMCAqIDYwKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT5kZWxheSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgICAgICB9KCkpICAgIFxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBXYWl0U2VjcyhkZWxheTogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICsgZGVsYXk7XG4gICAgICAgIHdoaWxlKHBlcmZvcm1hbmNlLm5vdygpIDwgc3RhcnRUaW1lKSB7fVxuICAgICAgICByZXMoMSlcbiAgICB9KVxufSIsImltcG9ydCB7IGp1ZGdlS2V5IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCJcblxuXG5leHBvcnQgY2xhc3MgS2V5cHJlc3N7XG4gICAga2V5VHlwZTogc3RyaW5nXG4gICAga2V5RXZlbnQ6IEtleWJvYXJkRXZlbnRcbiAgICBrZXk6IEFycmF5PGFueT5cbiAgICBrZXlDb21iaW5hdGlvbjogQXJyYXk8YW55PlxuICAgIGNvbnN0cnVjdG9yKGtleVR5cGU/OiBzdHJpbmcpe1xuICAgICAgICBpZihrZXlUeXBlKXtcbiAgICAgICAgICAgIGlmKGtleVR5cGUgPT09ICdrZXlkb3duJyB8fCBrZXlUeXBlID09PSAna2V5dXAnIHx8IGtleVR5cGUgPT09ICdrZXlwcmVzcycpe1xuICAgICAgICAgICAgICAgIHRoaXMua2V5VHlwZSA9IGtleVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0gJ2tleWRvd24nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMua2V5VHlwZSA9ICdrZXlkb3duJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0gW11cbiAgICAgICAgdGhpcy5rZXlFdmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KHRoaXMua2V5VHlwZSk7XG4gICAgfVxuICAgIGxpc3RlbihrZXk6IHN0cmluZyB8IG51bWJlciB8IEFycmF5PHN0cmluZz4gfCBBcnJheTxudW1iZXI+LGZ1bj86IEZ1bmMgfCBGdW5jdGlvbixJc0Rlc3Ryb3k/OiBib29sZWFuKTogUHJvbWlzZTxSRVM+e1xuICAgICAgICAvLyBjb25zb2xlLmRpcihwYXJhbSk7XG4gICAgICAgIGxldCBmdW5jOiBGdW5jPXtcbiAgICAgICAgICAgIGZ1bmNMaXN0OiBbXVxuICAgICAgICB9O1xuICAgICAgICBpZihJc0Rlc3Ryb3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgSXNEZXN0cm95ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICB0aGlzLmtleSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgaWYoa2V5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGZ1biBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5mdW5jTGlzdCA9IFtmdW5dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBmdW5jID0gZnVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihrZXkgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5LnB1c2goa2V5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmtleS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMua2V5W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2V5W2ldID0ganVkZ2VLZXkodGhpcy5rZXlbaV0sa2V5Q29kZURpY3Rpb25hcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmdW5jKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW4odGhpcy5rZXksdGhpcy5rZXlUeXBlLGZ1bmMsSXNEZXN0cm95KVxuICAgICAgICAgICAgICAgIC50aGVuKGU9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoZS5pbmRleCA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZihmdW5jLmNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGZ1bmMuY29tcGxldGUoKVxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGZ1bmMpXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGZ1bmMuZnVuY0xpc3RbZS5pbmRleF0pXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZnVuYy5mdW5jTGlzdFtlLmluZGV4XSgpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZS5rZXkpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5lcnJvcignZnVuY1snK2UrJ10gaXMgdW5kZWZpbmVkICEnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmRpcihlLmtleSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJmdW5jIGlzIHVuZGVmaW5kZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJZb3Ugc2hvdWxkbid0IHVzZSB0aGlzIGZ1bmN0aW9uIHdpdGhvdXQgUGFyYW1ldHJpYyBrZXkgISEhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlwcmVzc0luaXQoa2V5VHlwZT86IHN0cmluZyl7XG4gICAgbGV0IGtleXByZXNzID0gbmV3IEtleXByZXNzKCk7XG4gICAgcmV0dXJuIGtleXByZXNzXG59XG5cbmZ1bmN0aW9uIGxpc3RlbihrZXk6IEFycmF5PHN0cmluZz4sa2V5VHlwZTogc3RyaW5nLGZ1bmM6IEZ1bmMsSXNEZXN0cm95OiBib29sZWFuKTogUHJvbWlzZTxSRVM+e1xuICAgIGxldCByZXM6UkVTPXtcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICBrZXk6ICdudWxsJ1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2U8UkVTPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoa2V5VHlwZSxsaW5zdGVubmVyKTtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIGZ1bmN0aW9uIGxpbnN0ZW5uZXIoZSl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoPEtleWJvYXJkRXZlbnQ+ZSkua2V5KVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwga2V5Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoa2V5W2ldID09PSAoPEtleWJvYXJkRXZlbnQ+ZSkua2V5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICg8S2V5Ym9hcmRFdmVudD5lKS5rZXlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuaW5kZXggPj0gMClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnVuYy5jb21wbGV0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jLmNvbXBsZXRlKClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihmdW5jKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmdW5jLmZ1bmNMaXN0W3Jlcy5pbmRleF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuYy5mdW5jTGlzdFtyZXMuaW5kZXhdKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXMua2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ2Z1bmNbJytlKyddIGlzIHVuZGVmaW5lZCAhJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzLmtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJmdW5jIGlzIHVuZGVmaW5kZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzKGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihJc0Rlc3Ryb3kpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGtleVR5cGUsbGluc3Rlbm5lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmludGVyZmFjZSBGdW5je1xuICAgIGZ1bmNMaXN0OiBBcnJheTxGdW5jdGlvbj5cbiAgICBjb21wbGV0ZT86IEZ1bmN0aW9uXG59XG5pbnRlcmZhY2UgUkVTe1xuICAgIGluZGV4OiBudW1iZXJcbiAgICBrZXk6IHN0cmluZ1xufVxuXG5sZXQga2V5Q29kZURpY3Rpb25hcnkgPSB7XG4gICAgODogJ0JhY2tzcGFjZScsXG4gICAgOTogJ1RhYicsIFxuICAgIDEyOiAnQ2xlYXInLFxuICAgIDEzOiAnRW50ZXInLCBcbiAgICAxNjogJ1NoaWZ0JyxcbiAgICAxNzogJ0NvbnRyb2wnLCBcbiAgICAxODogJ0FsdCcsIFxuICAgIDE5OiAnUGF1c2UnLFxuICAgIDIwOiAnQ2Fwc0xvY2snLCBcbiAgICAyNzogJ0VzY2FwZScsXG4gICAgMzI6ICcgJywgXG4gICAgMzM6ICdQcmlvcicsIFxuICAgIDM0OiAnTmV4dCcsXG4gICAgMzU6ICdFbmQnLCBcbiAgICAzNjogJ0hvbWUnLCBcbiAgICAzNzogJ0xlZnQnLCBcbiAgICAzODogJ1VwJywgXG4gICAgMzk6ICdSaWdodCcsIFxuICAgIDQwOiAnRG93bicsIFxuICAgIDQxOiAnU2VsZWN0JywgXG4gICAgNDI6ICdQcmludCcsIFxuICAgIDQzOiAnRXhlY3V0ZScsIFxuICAgIDQ1OiAnSW5zZXJ0JywgXG4gICAgNDY6ICdEZWxldGUnLCBcbiAgICA0NzogJ0hlbHAnLCBcbiAgICA0ODogJzAnLCBcbiAgICA0OTogJzEnLFxuICAgIDUwOiAnMicsXG4gICAgNTE6ICczJyxcbiAgICA1MjogJzQnLCBcbiAgICA1MzogJzUnLFxuICAgIDU0OiAnNicsXG4gICAgNTU6ICc3JywgXG4gICAgNTY6ICc4JywgXG4gICAgNTc6ICc5JywgXG4gICAgNjU6ICdhJywgXG4gICAgNjY6ICdiJywgXG4gICAgNjc6ICdjJywgXG4gICAgNjg6ICdkJywgXG4gICAgNjk6ICdlJywgIFxuICAgIDcwOiAnZicsIFxuICAgIDcxOiAnZycsIFxuICAgIDcyOiAnaCcsIFxuICAgIDczOiAnaScsIFxuICAgIDc0OiAnaicsIFxuICAgIDc1OiAnaycsIFxuICAgIDc2OiAnbCcsIFxuICAgIDc3OiAnbScsIFxuICAgIDc4OiAnbicsIFxuICAgIDc5OiAnbycsIFxuICAgIDgwOiAncCcsIFxuICAgIDgxOiAncScsXG4gICAgODI6ICdyJywgXG4gICAgODM6ICdzJywgXG4gICAgODQ6ICd0JywgXG4gICAgODU6ICd1JywgXG4gICAgODY6ICd2JywgXG4gICAgODc6ICd3JywgXG4gICAgODg6ICd4JywgXG4gICAgODk6ICd5JywgXG4gICAgOTA6ICd6JywgXG4gICAgOTY6ICdLUF8wJywgXG4gICAgOTc6ICdLUF8xJywgXG4gICAgOTg6ICdLUF8yJywgXG4gICAgOTk6ICdLUF8zJywgXG4gICAgMTAwOiAnS1BfNCcsIFxuICAgIDEwMTogJ0tQXzUnLCBcbiAgICAxMDI6ICdLUF82JywgXG4gICAgMTAzOiAnS1BfNycsIFxuICAgIDEwNDogJ0tQXzgnLCBcbiAgICAxMDU6ICdLUF85JywgXG4gICAgMTA2OiAnS1BfTXVsdGlwbHknLFxuICAgIDEwNzogJ0tQX0FkZCcsIFxuICAgIDEwODogJ0tQX1NlcGFyYXRvcicsXG4gICAgMTA5OiAnS1BfU3VidHJhY3QnLFxuICAgIDExMDogJ0tQX0RlY2ltYWwnLFxuICAgIDExMTogJ0tQX0RpdmlkZScsIFxuICAgIDExMjogJ0YxJywgXG4gICAgMTEzOiAnRjInLCBcbiAgICAxMTQ6ICdGMycsIFxuICAgIDExNTogJ0Y0JywgXG4gICAgMTE2OiAnRjUnLCBcbiAgICAxMTc6ICdGNicsIFxuICAgIDExODogJ0Y3JywgXG4gICAgMTE5OiAnRjgnLCBcbiAgICAxMjA6ICdGOScsIFxuICAgIDEyMTogJ0YxMCcsIFxuICAgIDEyMjogJ0YxMScsIFxuICAgIDEyMzogJ0YxMicsIFxuICAgIDEyNDogJ0YxMycsIFxuICAgIDEyNTogJ0YxNCcsIFxuICAgIDEyNjogJ0YxNScsIFxuICAgIDEyNzogJ0YxNicsIFxuICAgIDEyODogJ0YxNycsIFxuICAgIDEyOTogJ0YxOCcsIFxuICAgIDEzMDogJ0YxOScsIFxuICAgIDEzMTogJ0YyMCcsIFxuICAgIDEzMjogJ0YyMScsIFxuICAgIDEzMzogJ0YyMicsIFxuICAgIDEzNDogJ0YyMycsIFxuICAgIDEzNTogJ0YyNCcsIFxufSIsImV4cG9ydCBjb25zdCBjb25zb2xlUHJlZml4ID0gJ1N3ZWV0QWxlcnQyOidcblxuLyoqXG4gKiBGaWx0ZXIgdGhlIHVuaXF1ZSB2YWx1ZXMgaW50byBhIG5ldyBhcnJheVxuICogQHBhcmFtIGFyclxuICovXG5leHBvcnQgY29uc3QgdW5pcXVlQXJyYXkgPSAoYXJyKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHJlc3VsdC5pbmRleE9mKGFycltpXSkgPT09IC0xKSB7XG4gICAgICByZXN1bHQucHVzaChhcnJbaV0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBDYXBpdGFsaXplIHRoZSBmaXJzdCBsZXR0ZXIgb2YgYSBzdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAoc3RyKSA9PiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSlcblxuLyoqXG4gKiBAcGFyYW0ge05vZGVMaXN0IHwgSFRNTENvbGxlY3Rpb24gfCBOYW1lZE5vZGVNYXB9IG5vZGVMaXN0XG4gKiBAcmV0dXJucyB7YXJyYXl9XG4gKi9cbmV4cG9ydCBjb25zdCB0b0FycmF5ID0gKG5vZGVMaXN0KSA9PiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChub2RlTGlzdClcblxuLyoqXG4gKiBTdGFuZGFyZGl6ZSBjb25zb2xlIHdhcm5pbmdzXG4gKiBAcGFyYW0ge3N0cmluZyB8IGFycmF5fSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBjb25zdCB3YXJuID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc29sZS53YXJuKGAke2NvbnNvbGVQcmVmaXh9ICR7dHlwZW9mIG1lc3NhZ2UgPT09ICdvYmplY3QnID8gbWVzc2FnZS5qb2luKCcgJykgOiBtZXNzYWdlfWApXG59XG5cbi8qKlxuICogU3RhbmRhcmRpemUgY29uc29sZSBlcnJvcnNcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBjb25zdCBlcnJvciA9IChtZXNzYWdlKSA9PiB7XG4gIGNvbnNvbGUuZXJyb3IoYCR7Y29uc29sZVByZWZpeH0gJHttZXNzYWdlfWApXG59XG5cbi8qKlxuICogUHJpdmF0ZSBnbG9iYWwgc3RhdGUgZm9yIGB3YXJuT25jZWBcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IHByZXZpb3VzV2Fybk9uY2VNZXNzYWdlcyA9IFtdXG5cbi8qKlxuICogU2hvdyBhIGNvbnNvbGUgd2FybmluZywgYnV0IG9ubHkgaWYgaXQgaGFzbid0IGFscmVhZHkgYmVlbiBzaG93blxuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IHdhcm5PbmNlID0gKG1lc3NhZ2UpID0+IHtcbiAgaWYgKCFwcmV2aW91c1dhcm5PbmNlTWVzc2FnZXMuaW5jbHVkZXMobWVzc2FnZSkpIHtcbiAgICBwcmV2aW91c1dhcm5PbmNlTWVzc2FnZXMucHVzaChtZXNzYWdlKVxuICAgIHdhcm4obWVzc2FnZSlcbiAgfVxufVxuXG4vKipcbiAqIFNob3cgYSBvbmUtdGltZSBjb25zb2xlIHdhcm5pbmcgYWJvdXQgZGVwcmVjYXRlZCBwYXJhbXMvbWV0aG9kc1xuICovXG5leHBvcnQgY29uc3Qgd2FybkFib3V0RGVwcmVjYXRpb24gPSAoZGVwcmVjYXRlZFBhcmFtLCB1c2VJbnN0ZWFkKSA9PiB7XG4gIHdhcm5PbmNlKFxuICAgIGBcIiR7ZGVwcmVjYXRlZFBhcmFtfVwiIGlzIGRlcHJlY2F0ZWQgYW5kIHdpbGwgYmUgcmVtb3ZlZCBpbiB0aGUgbmV4dCBtYWpvciByZWxlYXNlLiBQbGVhc2UgdXNlIFwiJHt1c2VJbnN0ZWFkfVwiIGluc3RlYWQuYFxuICApXG59XG5cbi8qKlxuICogSWYgYGFyZ2AgaXMgYSBmdW5jdGlvbiwgY2FsbCBpdCAod2l0aCBubyBhcmd1bWVudHMgb3IgY29udGV4dCkgYW5kIHJldHVybiB0aGUgcmVzdWx0LlxuICogT3RoZXJ3aXNlLCBqdXN0IHBhc3MgdGhlIHZhbHVlIHRocm91Z2hcbiAqIEBwYXJhbSBhcmdcbiAqL1xuZXhwb3J0IGNvbnN0IGNhbGxJZkZ1bmN0aW9uID0gKGFyZykgPT4gKHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbicgPyBhcmcoKSA6IGFyZylcblxuZXhwb3J0IGNvbnN0IGhhc1RvUHJvbWlzZUZuID0gKGFyZykgPT4gYXJnICYmIHR5cGVvZiBhcmcudG9Qcm9taXNlID09PSAnZnVuY3Rpb24nXG5cbmV4cG9ydCBjb25zdCBhc1Byb21pc2UgPSAoYXJnKSA9PiAoaGFzVG9Qcm9taXNlRm4oYXJnKSA/IGFyZy50b1Byb21pc2UoKSA6IFByb21pc2UucmVzb2x2ZShhcmcpKVxuXG5leHBvcnQgY29uc3QgaXNQcm9taXNlID0gKGFyZykgPT4gYXJnICYmIFByb21pc2UucmVzb2x2ZShhcmcpID09PSBhcmdcbiIsImltcG9ydCB7IHdhcm4sIHdhcm5BYm91dERlcHJlY2F0aW9uIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5cbmV4cG9ydCBjb25zdCBkZWZhdWx0UGFyYW1zID0ge1xuICB0aXRsZTogJycsXG4gIHRpdGxlVGV4dDogJycsXG4gIHRleHQ6ICcnLFxuICBodG1sOiAnJyxcbiAgZm9vdGVyOiAnJyxcbiAgaWNvbjogdW5kZWZpbmVkLFxuICBpY29uQ29sb3I6IHVuZGVmaW5lZCxcbiAgaWNvbkh0bWw6IHVuZGVmaW5lZCxcbiAgdGVtcGxhdGU6IHVuZGVmaW5lZCxcbiAgdG9hc3Q6IGZhbHNlLFxuICBzaG93Q2xhc3M6IHtcbiAgICBwb3B1cDogJ3N3YWwyLXNob3cnLFxuICAgIGJhY2tkcm9wOiAnc3dhbDItYmFja2Ryb3Atc2hvdycsXG4gICAgaWNvbjogJ3N3YWwyLWljb24tc2hvdycsXG4gIH0sXG4gIGhpZGVDbGFzczoge1xuICAgIHBvcHVwOiAnc3dhbDItaGlkZScsXG4gICAgYmFja2Ryb3A6ICdzd2FsMi1iYWNrZHJvcC1oaWRlJyxcbiAgICBpY29uOiAnc3dhbDItaWNvbi1oaWRlJyxcbiAgfSxcbiAgY3VzdG9tQ2xhc3M6IHt9LFxuICB0YXJnZXQ6ICdib2R5JyxcbiAgY29sb3I6IHVuZGVmaW5lZCxcbiAgYmFja2Ryb3A6IHRydWUsXG4gIGhlaWdodEF1dG86IHRydWUsXG4gIGFsbG93T3V0c2lkZUNsaWNrOiB0cnVlLFxuICBhbGxvd0VzY2FwZUtleTogdHJ1ZSxcbiAgYWxsb3dFbnRlcktleTogdHJ1ZSxcbiAgc3RvcEtleWRvd25Qcm9wYWdhdGlvbjogdHJ1ZSxcbiAga2V5ZG93bkxpc3RlbmVyQ2FwdHVyZTogZmFsc2UsXG4gIHNob3dDb25maXJtQnV0dG9uOiB0cnVlLFxuICBzaG93RGVueUJ1dHRvbjogZmFsc2UsXG4gIHNob3dDYW5jZWxCdXR0b246IGZhbHNlLFxuICBwcmVDb25maXJtOiB1bmRlZmluZWQsXG4gIHByZURlbnk6IHVuZGVmaW5lZCxcbiAgY29uZmlybUJ1dHRvblRleHQ6ICdPSycsXG4gIGNvbmZpcm1CdXR0b25BcmlhTGFiZWw6ICcnLFxuICBjb25maXJtQnV0dG9uQ29sb3I6IHVuZGVmaW5lZCxcbiAgZGVueUJ1dHRvblRleHQ6ICdObycsXG4gIGRlbnlCdXR0b25BcmlhTGFiZWw6ICcnLFxuICBkZW55QnV0dG9uQ29sb3I6IHVuZGVmaW5lZCxcbiAgY2FuY2VsQnV0dG9uVGV4dDogJ0NhbmNlbCcsXG4gIGNhbmNlbEJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGNhbmNlbEJ1dHRvbkNvbG9yOiB1bmRlZmluZWQsXG4gIGJ1dHRvbnNTdHlsaW5nOiB0cnVlLFxuICByZXZlcnNlQnV0dG9uczogZmFsc2UsXG4gIGZvY3VzQ29uZmlybTogdHJ1ZSxcbiAgZm9jdXNEZW55OiBmYWxzZSxcbiAgZm9jdXNDYW5jZWw6IGZhbHNlLFxuICByZXR1cm5Gb2N1czogdHJ1ZSxcbiAgc2hvd0Nsb3NlQnV0dG9uOiBmYWxzZSxcbiAgY2xvc2VCdXR0b25IdG1sOiAnJnRpbWVzOycsXG4gIGNsb3NlQnV0dG9uQXJpYUxhYmVsOiAnQ2xvc2UgdGhpcyBkaWFsb2cnLFxuICBsb2FkZXJIdG1sOiAnJyxcbiAgc2hvd0xvYWRlck9uQ29uZmlybTogZmFsc2UsXG4gIHNob3dMb2FkZXJPbkRlbnk6IGZhbHNlLFxuICBpbWFnZVVybDogdW5kZWZpbmVkLFxuICBpbWFnZVdpZHRoOiB1bmRlZmluZWQsXG4gIGltYWdlSGVpZ2h0OiB1bmRlZmluZWQsXG4gIGltYWdlQWx0OiAnJyxcbiAgdGltZXI6IHVuZGVmaW5lZCxcbiAgdGltZXJQcm9ncmVzc0JhcjogZmFsc2UsXG4gIHdpZHRoOiB1bmRlZmluZWQsXG4gIHBhZGRpbmc6IHVuZGVmaW5lZCxcbiAgYmFja2dyb3VuZDogdW5kZWZpbmVkLFxuICBpbnB1dDogdW5kZWZpbmVkLFxuICBpbnB1dFBsYWNlaG9sZGVyOiAnJyxcbiAgaW5wdXRMYWJlbDogJycsXG4gIGlucHV0VmFsdWU6ICcnLFxuICBpbnB1dE9wdGlvbnM6IHt9LFxuICBpbnB1dEF1dG9UcmltOiB0cnVlLFxuICBpbnB1dEF0dHJpYnV0ZXM6IHt9LFxuICBpbnB1dFZhbGlkYXRvcjogdW5kZWZpbmVkLFxuICByZXR1cm5JbnB1dFZhbHVlT25EZW55OiBmYWxzZSxcbiAgdmFsaWRhdGlvbk1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgZ3JvdzogZmFsc2UsXG4gIHBvc2l0aW9uOiAnY2VudGVyJyxcbiAgcHJvZ3Jlc3NTdGVwczogW10sXG4gIGN1cnJlbnRQcm9ncmVzc1N0ZXA6IHVuZGVmaW5lZCxcbiAgcHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlOiB1bmRlZmluZWQsXG4gIHdpbGxPcGVuOiB1bmRlZmluZWQsXG4gIGRpZE9wZW46IHVuZGVmaW5lZCxcbiAgZGlkUmVuZGVyOiB1bmRlZmluZWQsXG4gIHdpbGxDbG9zZTogdW5kZWZpbmVkLFxuICBkaWRDbG9zZTogdW5kZWZpbmVkLFxuICBkaWREZXN0cm95OiB1bmRlZmluZWQsXG4gIHNjcm9sbGJhclBhZGRpbmc6IHRydWUsXG59XG5cbmV4cG9ydCBjb25zdCB1cGRhdGFibGVQYXJhbXMgPSBbXG4gICdhbGxvd0VzY2FwZUtleScsXG4gICdhbGxvd091dHNpZGVDbGljaycsXG4gICdiYWNrZ3JvdW5kJyxcbiAgJ2J1dHRvbnNTdHlsaW5nJyxcbiAgJ2NhbmNlbEJ1dHRvbkFyaWFMYWJlbCcsXG4gICdjYW5jZWxCdXR0b25Db2xvcicsXG4gICdjYW5jZWxCdXR0b25UZXh0JyxcbiAgJ2Nsb3NlQnV0dG9uQXJpYUxhYmVsJyxcbiAgJ2Nsb3NlQnV0dG9uSHRtbCcsXG4gICdjb2xvcicsXG4gICdjb25maXJtQnV0dG9uQXJpYUxhYmVsJyxcbiAgJ2NvbmZpcm1CdXR0b25Db2xvcicsXG4gICdjb25maXJtQnV0dG9uVGV4dCcsXG4gICdjdXJyZW50UHJvZ3Jlc3NTdGVwJyxcbiAgJ2N1c3RvbUNsYXNzJyxcbiAgJ2RlbnlCdXR0b25BcmlhTGFiZWwnLFxuICAnZGVueUJ1dHRvbkNvbG9yJyxcbiAgJ2RlbnlCdXR0b25UZXh0JyxcbiAgJ2RpZENsb3NlJyxcbiAgJ2RpZERlc3Ryb3knLFxuICAnZm9vdGVyJyxcbiAgJ2hpZGVDbGFzcycsXG4gICdodG1sJyxcbiAgJ2ljb24nLFxuICAnaWNvbkNvbG9yJyxcbiAgJ2ljb25IdG1sJyxcbiAgJ2ltYWdlQWx0JyxcbiAgJ2ltYWdlSGVpZ2h0JyxcbiAgJ2ltYWdlVXJsJyxcbiAgJ2ltYWdlV2lkdGgnLFxuICAncHJlQ29uZmlybScsXG4gICdwcmVEZW55JyxcbiAgJ3Byb2dyZXNzU3RlcHMnLFxuICAncmV0dXJuRm9jdXMnLFxuICAncmV2ZXJzZUJ1dHRvbnMnLFxuICAnc2hvd0NhbmNlbEJ1dHRvbicsXG4gICdzaG93Q2xvc2VCdXR0b24nLFxuICAnc2hvd0NvbmZpcm1CdXR0b24nLFxuICAnc2hvd0RlbnlCdXR0b24nLFxuICAndGV4dCcsXG4gICd0aXRsZScsXG4gICd0aXRsZVRleHQnLFxuICAnd2lsbENsb3NlJyxcbl1cblxuZXhwb3J0IGNvbnN0IGRlcHJlY2F0ZWRQYXJhbXMgPSB7fVxuXG5jb25zdCB0b2FzdEluY29tcGF0aWJsZVBhcmFtcyA9IFtcbiAgJ2FsbG93T3V0c2lkZUNsaWNrJyxcbiAgJ2FsbG93RW50ZXJLZXknLFxuICAnYmFja2Ryb3AnLFxuICAnZm9jdXNDb25maXJtJyxcbiAgJ2ZvY3VzRGVueScsXG4gICdmb2N1c0NhbmNlbCcsXG4gICdyZXR1cm5Gb2N1cycsXG4gICdoZWlnaHRBdXRvJyxcbiAgJ2tleWRvd25MaXN0ZW5lckNhcHR1cmUnLFxuXVxuXG4vKipcbiAqIElzIHZhbGlkIHBhcmFtZXRlclxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtTmFtZVxuICovXG5leHBvcnQgY29uc3QgaXNWYWxpZFBhcmFtZXRlciA9IChwYXJhbU5hbWUpID0+IHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChkZWZhdWx0UGFyYW1zLCBwYXJhbU5hbWUpXG59XG5cbi8qKlxuICogSXMgdmFsaWQgcGFyYW1ldGVyIGZvciBTd2FsLnVwZGF0ZSgpIG1ldGhvZFxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtTmFtZVxuICovXG5leHBvcnQgY29uc3QgaXNVcGRhdGFibGVQYXJhbWV0ZXIgPSAocGFyYW1OYW1lKSA9PiB7XG4gIHJldHVybiB1cGRhdGFibGVQYXJhbXMuaW5kZXhPZihwYXJhbU5hbWUpICE9PSAtMVxufVxuXG4vKipcbiAqIElzIGRlcHJlY2F0ZWQgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc0RlcHJlY2F0ZWRQYXJhbWV0ZXIgPSAocGFyYW1OYW1lKSA9PiB7XG4gIHJldHVybiBkZXByZWNhdGVkUGFyYW1zW3BhcmFtTmFtZV1cbn1cblxuY29uc3QgY2hlY2tJZlBhcmFtSXNWYWxpZCA9IChwYXJhbSkgPT4ge1xuICBpZiAoIWlzVmFsaWRQYXJhbWV0ZXIocGFyYW0pKSB7XG4gICAgd2FybihgVW5rbm93biBwYXJhbWV0ZXIgXCIke3BhcmFtfVwiYClcbiAgfVxufVxuXG5jb25zdCBjaGVja0lmVG9hc3RQYXJhbUlzVmFsaWQgPSAocGFyYW0pID0+IHtcbiAgaWYgKHRvYXN0SW5jb21wYXRpYmxlUGFyYW1zLmluY2x1ZGVzKHBhcmFtKSkge1xuICAgIHdhcm4oYFRoZSBwYXJhbWV0ZXIgXCIke3BhcmFtfVwiIGlzIGluY29tcGF0aWJsZSB3aXRoIHRvYXN0c2ApXG4gIH1cbn1cblxuY29uc3QgY2hlY2tJZlBhcmFtSXNEZXByZWNhdGVkID0gKHBhcmFtKSA9PiB7XG4gIGlmIChpc0RlcHJlY2F0ZWRQYXJhbWV0ZXIocGFyYW0pKSB7XG4gICAgd2FybkFib3V0RGVwcmVjYXRpb24ocGFyYW0sIGlzRGVwcmVjYXRlZFBhcmFtZXRlcihwYXJhbSkpXG4gIH1cbn1cblxuLyoqXG4gKiBTaG93IHJlbGV2YW50IHdhcm5pbmdzIGZvciBnaXZlbiBwYXJhbXNcbiAqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKi9cbmV4cG9ydCBjb25zdCBzaG93V2FybmluZ3NGb3JQYXJhbXMgPSAocGFyYW1zKSA9PiB7XG4gIGlmICghcGFyYW1zLmJhY2tkcm9wICYmIHBhcmFtcy5hbGxvd091dHNpZGVDbGljaykge1xuICAgIHdhcm4oJ1wiYWxsb3dPdXRzaWRlQ2xpY2tcIiBwYXJhbWV0ZXIgcmVxdWlyZXMgYGJhY2tkcm9wYCBwYXJhbWV0ZXIgdG8gYmUgc2V0IHRvIGB0cnVlYCcpXG4gIH1cblxuICBmb3IgKGNvbnN0IHBhcmFtIGluIHBhcmFtcykge1xuICAgIGNoZWNrSWZQYXJhbUlzVmFsaWQocGFyYW0pXG5cbiAgICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgICBjaGVja0lmVG9hc3RQYXJhbUlzVmFsaWQocGFyYW0pXG4gICAgfVxuXG4gICAgY2hlY2tJZlBhcmFtSXNEZXByZWNhdGVkKHBhcmFtKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmF1bHRQYXJhbXNcbiIsImV4cG9ydCBjb25zdCBzd2FsUHJlZml4ID0gJ3N3YWwyLSdcblxuZXhwb3J0IGNvbnN0IHByZWZpeCA9IChpdGVtcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBmb3IgKGNvbnN0IGkgaW4gaXRlbXMpIHtcbiAgICByZXN1bHRbaXRlbXNbaV1dID0gc3dhbFByZWZpeCArIGl0ZW1zW2ldXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgY29uc3Qgc3dhbENsYXNzZXMgPSBwcmVmaXgoW1xuICAnY29udGFpbmVyJyxcbiAgJ3Nob3duJyxcbiAgJ2hlaWdodC1hdXRvJyxcbiAgJ2lvc2ZpeCcsXG4gICdwb3B1cCcsXG4gICdtb2RhbCcsXG4gICduby1iYWNrZHJvcCcsXG4gICduby10cmFuc2l0aW9uJyxcbiAgJ3RvYXN0JyxcbiAgJ3RvYXN0LXNob3duJyxcbiAgJ3Nob3cnLFxuICAnaGlkZScsXG4gICdjbG9zZScsXG4gICd0aXRsZScsXG4gICdodG1sLWNvbnRhaW5lcicsXG4gICdhY3Rpb25zJyxcbiAgJ2NvbmZpcm0nLFxuICAnZGVueScsXG4gICdjYW5jZWwnLFxuICAnZGVmYXVsdC1vdXRsaW5lJyxcbiAgJ2Zvb3RlcicsXG4gICdpY29uJyxcbiAgJ2ljb24tY29udGVudCcsXG4gICdpbWFnZScsXG4gICdpbnB1dCcsXG4gICdmaWxlJyxcbiAgJ3JhbmdlJyxcbiAgJ3NlbGVjdCcsXG4gICdyYWRpbycsXG4gICdjaGVja2JveCcsXG4gICdsYWJlbCcsXG4gICd0ZXh0YXJlYScsXG4gICdpbnB1dGVycm9yJyxcbiAgJ2lucHV0LWxhYmVsJyxcbiAgJ3ZhbGlkYXRpb24tbWVzc2FnZScsXG4gICdwcm9ncmVzcy1zdGVwcycsXG4gICdhY3RpdmUtcHJvZ3Jlc3Mtc3RlcCcsXG4gICdwcm9ncmVzcy1zdGVwJyxcbiAgJ3Byb2dyZXNzLXN0ZXAtbGluZScsXG4gICdsb2FkZXInLFxuICAnbG9hZGluZycsXG4gICdzdHlsZWQnLFxuICAndG9wJyxcbiAgJ3RvcC1zdGFydCcsXG4gICd0b3AtZW5kJyxcbiAgJ3RvcC1sZWZ0JyxcbiAgJ3RvcC1yaWdodCcsXG4gICdjZW50ZXInLFxuICAnY2VudGVyLXN0YXJ0JyxcbiAgJ2NlbnRlci1lbmQnLFxuICAnY2VudGVyLWxlZnQnLFxuICAnY2VudGVyLXJpZ2h0JyxcbiAgJ2JvdHRvbScsXG4gICdib3R0b20tc3RhcnQnLFxuICAnYm90dG9tLWVuZCcsXG4gICdib3R0b20tbGVmdCcsXG4gICdib3R0b20tcmlnaHQnLFxuICAnZ3Jvdy1yb3cnLFxuICAnZ3Jvdy1jb2x1bW4nLFxuICAnZ3Jvdy1mdWxsc2NyZWVuJyxcbiAgJ3J0bCcsXG4gICd0aW1lci1wcm9ncmVzcy1iYXInLFxuICAndGltZXItcHJvZ3Jlc3MtYmFyLWNvbnRhaW5lcicsXG4gICdzY3JvbGxiYXItbWVhc3VyZScsXG4gICdpY29uLXN1Y2Nlc3MnLFxuICAnaWNvbi13YXJuaW5nJyxcbiAgJ2ljb24taW5mbycsXG4gICdpY29uLXF1ZXN0aW9uJyxcbiAgJ2ljb24tZXJyb3InLFxuXSlcblxuZXhwb3J0IGNvbnN0IGljb25UeXBlcyA9IHByZWZpeChbJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdpbmZvJywgJ3F1ZXN0aW9uJywgJ2Vycm9yJ10pXG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyB0b0FycmF5LCB1bmlxdWVBcnJheSB9IGZyb20gJy4uL3V0aWxzLmpzJ1xuaW1wb3J0IHsgaGFzQ2xhc3MsIGlzVmlzaWJsZSB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5cbi8qKlxuICogR2V0cyB0aGUgcG9wdXAgY29udGFpbmVyIHdoaWNoIGNvbnRhaW5zIHRoZSBiYWNrZHJvcCBhbmQgdGhlIHBvcHVwIGl0c2VsZi5cbiAqXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29udGFpbmVyID0gKCkgPT4gZG9jdW1lbnQuYm9keS5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5jb250YWluZXJ9YClcblxuZXhwb3J0IGNvbnN0IGVsZW1lbnRCeVNlbGVjdG9yID0gKHNlbGVjdG9yU3RyaW5nKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGdldENvbnRhaW5lcigpXG4gIHJldHVybiBjb250YWluZXIgPyBjb250YWluZXIucXVlcnlTZWxlY3RvcihzZWxlY3RvclN0cmluZykgOiBudWxsXG59XG5cbmNvbnN0IGVsZW1lbnRCeUNsYXNzID0gKGNsYXNzTmFtZSkgPT4ge1xuICByZXR1cm4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke2NsYXNzTmFtZX1gKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0UG9wdXAgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5wb3B1cClcblxuZXhwb3J0IGNvbnN0IGdldEljb24gPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5pY29uKVxuXG5leHBvcnQgY29uc3QgZ2V0VGl0bGUgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy50aXRsZSlcblxuZXhwb3J0IGNvbnN0IGdldEh0bWxDb250YWluZXIgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1snaHRtbC1jb250YWluZXInXSlcblxuZXhwb3J0IGNvbnN0IGdldEltYWdlID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuaW1hZ2UpXG5cbmV4cG9ydCBjb25zdCBnZXRQcm9ncmVzc1N0ZXBzID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ3Byb2dyZXNzLXN0ZXBzJ10pXG5cbmV4cG9ydCBjb25zdCBnZXRWYWxpZGF0aW9uTWVzc2FnZSA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXSlcblxuZXhwb3J0IGNvbnN0IGdldENvbmZpcm1CdXR0b24gPSAoKSA9PiBlbGVtZW50QnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMuYWN0aW9uc30gLiR7c3dhbENsYXNzZXMuY29uZmlybX1gKVxuXG5leHBvcnQgY29uc3QgZ2V0RGVueUJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfSAuJHtzd2FsQ2xhc3Nlcy5kZW55fWApXG5cbmV4cG9ydCBjb25zdCBnZXRJbnB1dExhYmVsID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ2lucHV0LWxhYmVsJ10pXG5cbmV4cG9ydCBjb25zdCBnZXRMb2FkZXIgPSAoKSA9PiBlbGVtZW50QnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMubG9hZGVyfWApXG5cbmV4cG9ydCBjb25zdCBnZXRDYW5jZWxCdXR0b24gPSAoKSA9PiBlbGVtZW50QnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMuYWN0aW9uc30gLiR7c3dhbENsYXNzZXMuY2FuY2VsfWApXG5cbmV4cG9ydCBjb25zdCBnZXRBY3Rpb25zID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuYWN0aW9ucylcblxuZXhwb3J0IGNvbnN0IGdldEZvb3RlciA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmZvb3RlcilcblxuZXhwb3J0IGNvbnN0IGdldFRpbWVyUHJvZ3Jlc3NCYXIgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1sndGltZXItcHJvZ3Jlc3MtYmFyJ10pXG5cbmV4cG9ydCBjb25zdCBnZXRDbG9zZUJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmNsb3NlKVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vamt1cC9mb2N1c2FibGUvYmxvYi9tYXN0ZXIvaW5kZXguanNcbmNvbnN0IGZvY3VzYWJsZSA9IGBcbiAgYVtocmVmXSxcbiAgYXJlYVtocmVmXSxcbiAgaW5wdXQ6bm90KFtkaXNhYmxlZF0pLFxuICBzZWxlY3Q6bm90KFtkaXNhYmxlZF0pLFxuICB0ZXh0YXJlYTpub3QoW2Rpc2FibGVkXSksXG4gIGJ1dHRvbjpub3QoW2Rpc2FibGVkXSksXG4gIGlmcmFtZSxcbiAgb2JqZWN0LFxuICBlbWJlZCxcbiAgW3RhYmluZGV4PVwiMFwiXSxcbiAgW2NvbnRlbnRlZGl0YWJsZV0sXG4gIGF1ZGlvW2NvbnRyb2xzXSxcbiAgdmlkZW9bY29udHJvbHNdLFxuICBzdW1tYXJ5XG5gXG5cbmV4cG9ydCBjb25zdCBnZXRGb2N1c2FibGVFbGVtZW50cyA9ICgpID0+IHtcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHNXaXRoVGFiaW5kZXggPSB0b0FycmF5KFxuICAgIGdldFBvcHVwKCkucXVlcnlTZWxlY3RvckFsbCgnW3RhYmluZGV4XTpub3QoW3RhYmluZGV4PVwiLTFcIl0pOm5vdChbdGFiaW5kZXg9XCIwXCJdKScpXG4gIClcbiAgICAvLyBzb3J0IGFjY29yZGluZyB0byB0YWJpbmRleFxuICAgIC5zb3J0KChhLCBiKSA9PiB7XG4gICAgICBjb25zdCB0YWJpbmRleEEgPSBwYXJzZUludChhLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIGNvbnN0IHRhYmluZGV4QiA9IHBhcnNlSW50KGIuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgaWYgKHRhYmluZGV4QSA+IHRhYmluZGV4Qikge1xuICAgICAgICByZXR1cm4gMVxuICAgICAgfSBlbHNlIGlmICh0YWJpbmRleEEgPCB0YWJpbmRleEIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICByZXR1cm4gMFxuICAgIH0pXG5cbiAgY29uc3Qgb3RoZXJGb2N1c2FibGVFbGVtZW50cyA9IHRvQXJyYXkoZ2V0UG9wdXAoKS5xdWVyeVNlbGVjdG9yQWxsKGZvY3VzYWJsZSkpLmZpbHRlcihcbiAgICAoZWwpID0+IGVsLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSAhPT0gJy0xJ1xuICApXG5cbiAgcmV0dXJuIHVuaXF1ZUFycmF5KGZvY3VzYWJsZUVsZW1lbnRzV2l0aFRhYmluZGV4LmNvbmNhdChvdGhlckZvY3VzYWJsZUVsZW1lbnRzKSkuZmlsdGVyKChlbCkgPT4gaXNWaXNpYmxlKGVsKSlcbn1cblxuZXhwb3J0IGNvbnN0IGlzTW9kYWwgPSAoKSA9PiB7XG4gIHJldHVybiAoXG4gICAgaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuc2hvd24pICYmXG4gICAgIWhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddKSAmJlxuICAgICFoYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlc1snbm8tYmFja2Ryb3AnXSlcbiAgKVxufVxuXG5leHBvcnQgY29uc3QgaXNUb2FzdCA9ICgpID0+IHtcbiAgcmV0dXJuIGdldFBvcHVwKCkgJiYgaGFzQ2xhc3MoZ2V0UG9wdXAoKSwgc3dhbENsYXNzZXMudG9hc3QpXG59XG5cbmV4cG9ydCBjb25zdCBpc0xvYWRpbmcgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRQb3B1cCgpLmhhc0F0dHJpYnV0ZSgnZGF0YS1sb2FkaW5nJylcbn1cbiIsImltcG9ydCB7IGdldENhbmNlbEJ1dHRvbiwgZ2V0Q29uZmlybUJ1dHRvbiwgZ2V0RGVueUJ1dHRvbiwgZ2V0VGltZXJQcm9ncmVzc0JhciB9IGZyb20gJy4vZ2V0dGVycy5qcydcbmltcG9ydCB7IGljb25UeXBlcywgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgdG9BcnJheSwgd2FybiB9IGZyb20gJy4uL3V0aWxzLmpzJ1xuXG4vLyBSZW1lbWJlciBzdGF0ZSBpbiBjYXNlcyB3aGVyZSBvcGVuaW5nIGFuZCBoYW5kbGluZyBhIG1vZGFsIHdpbGwgZmlkZGxlIHdpdGggaXQuXG5leHBvcnQgY29uc3Qgc3RhdGVzID0ge1xuICBwcmV2aW91c0JvZHlQYWRkaW5nOiBudWxsLFxufVxuXG4vKipcbiAqIFNlY3VyZWx5IHNldCBpbm5lckhUTUwgb2YgYW4gZWxlbWVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xOTI2XG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IGh0bWxcbiAqL1xuZXhwb3J0IGNvbnN0IHNldElubmVySHRtbCA9IChlbGVtLCBodG1sKSA9PiB7XG4gIGVsZW0udGV4dENvbnRlbnQgPSAnJ1xuICBpZiAoaHRtbCkge1xuICAgIGNvbnN0IHBhcnNlciA9IG5ldyBET01QYXJzZXIoKVxuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcoaHRtbCwgYHRleHQvaHRtbGApXG4gICAgdG9BcnJheShwYXJzZWQucXVlcnlTZWxlY3RvcignaGVhZCcpLmNoaWxkTm9kZXMpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gICAgdG9BcnJheShwYXJzZWQucXVlcnlTZWxlY3RvcignYm9keScpLmNoaWxkTm9kZXMpLmZvckVhY2goKGNoaWxkKSA9PiB7XG4gICAgICBlbGVtLmFwcGVuZENoaWxkKGNoaWxkKVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGhhc0NsYXNzID0gKGVsZW0sIGNsYXNzTmFtZSkgPT4ge1xuICBpZiAoIWNsYXNzTmFtZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGNvbnN0IGNsYXNzTGlzdCA9IGNsYXNzTmFtZS5zcGxpdCgvXFxzKy8pXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2xhc3NMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKCFlbGVtLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc0xpc3RbaV0pKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgcmVtb3ZlQ3VzdG9tQ2xhc3NlcyA9IChlbGVtLCBwYXJhbXMpID0+IHtcbiAgdG9BcnJheShlbGVtLmNsYXNzTGlzdCkuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgaWYgKFxuICAgICAgIU9iamVjdC52YWx1ZXMoc3dhbENsYXNzZXMpLmluY2x1ZGVzKGNsYXNzTmFtZSkgJiZcbiAgICAgICFPYmplY3QudmFsdWVzKGljb25UeXBlcykuaW5jbHVkZXMoY2xhc3NOYW1lKSAmJlxuICAgICAgIU9iamVjdC52YWx1ZXMocGFyYW1zLnNob3dDbGFzcykuaW5jbHVkZXMoY2xhc3NOYW1lKVxuICAgICkge1xuICAgICAgZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICB9XG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCBhcHBseUN1c3RvbUNsYXNzID0gKGVsZW0sIHBhcmFtcywgY2xhc3NOYW1lKSA9PiB7XG4gIHJlbW92ZUN1c3RvbUNsYXNzZXMoZWxlbSwgcGFyYW1zKVxuXG4gIGlmIChwYXJhbXMuY3VzdG9tQ2xhc3MgJiYgcGFyYW1zLmN1c3RvbUNsYXNzW2NsYXNzTmFtZV0pIHtcbiAgICBpZiAodHlwZW9mIHBhcmFtcy5jdXN0b21DbGFzc1tjbGFzc05hbWVdICE9PSAnc3RyaW5nJyAmJiAhcGFyYW1zLmN1c3RvbUNsYXNzW2NsYXNzTmFtZV0uZm9yRWFjaCkge1xuICAgICAgcmV0dXJuIHdhcm4oXG4gICAgICAgIGBJbnZhbGlkIHR5cGUgb2YgY3VzdG9tQ2xhc3MuJHtjbGFzc05hbWV9ISBFeHBlY3RlZCBzdHJpbmcgb3IgaXRlcmFibGUgb2JqZWN0LCBnb3QgXCIke3R5cGVvZiBwYXJhbXMuY3VzdG9tQ2xhc3NbXG4gICAgICAgICAgY2xhc3NOYW1lXG4gICAgICAgIF19XCJgXG4gICAgICApXG4gICAgfVxuXG4gICAgYWRkQ2xhc3MoZWxlbSwgcGFyYW1zLmN1c3RvbUNsYXNzW2NsYXNzTmFtZV0pXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3B1cFxuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0VHlwZVxuICogQHJldHVybnMge0hUTUxJbnB1dEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0SW5wdXQgPSAocG9wdXAsIGlucHV0VHlwZSkgPT4ge1xuICBpZiAoIWlucHV0VHlwZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgc3dpdGNoIChpbnB1dFR5cGUpIHtcbiAgICBjYXNlICdzZWxlY3QnOlxuICAgIGNhc2UgJ3RleHRhcmVhJzpcbiAgICBjYXNlICdmaWxlJzpcbiAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVdfWApXG4gICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLmNoZWNrYm94fSBpbnB1dGApXG4gICAgY2FzZSAncmFkaW8nOlxuICAgICAgcmV0dXJuIChcbiAgICAgICAgcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMucmFkaW99IGlucHV0OmNoZWNrZWRgKSB8fFxuICAgICAgICBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5yYWRpb30gaW5wdXQ6Zmlyc3QtY2hpbGRgKVxuICAgICAgKVxuICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5yYW5nZX0gaW5wdXRgKVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMuaW5wdXR9YClcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTElucHV0RWxlbWVudH0gaW5wdXRcbiAqL1xuZXhwb3J0IGNvbnN0IGZvY3VzSW5wdXQgPSAoaW5wdXQpID0+IHtcbiAgaW5wdXQuZm9jdXMoKVxuXG4gIC8vIHBsYWNlIGN1cnNvciBhdCBlbmQgb2YgdGV4dCBpbiB0ZXh0IGlucHV0XG4gIGlmIChpbnB1dC50eXBlICE9PSAnZmlsZScpIHtcbiAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMzQ1OTE1XG4gICAgY29uc3QgdmFsID0gaW5wdXQudmFsdWVcbiAgICBpbnB1dC52YWx1ZSA9ICcnXG4gICAgaW5wdXQudmFsdWUgPSB2YWxcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudFtdIHwgbnVsbH0gdGFyZ2V0XG4gKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBjbGFzc0xpc3RcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uZGl0aW9uXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVDbGFzcyA9ICh0YXJnZXQsIGNsYXNzTGlzdCwgY29uZGl0aW9uKSA9PiB7XG4gIGlmICghdGFyZ2V0IHx8ICFjbGFzc0xpc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpZiAodHlwZW9mIGNsYXNzTGlzdCA9PT0gJ3N0cmluZycpIHtcbiAgICBjbGFzc0xpc3QgPSBjbGFzc0xpc3Quc3BsaXQoL1xccysvKS5maWx0ZXIoQm9vbGVhbilcbiAgfVxuICBjbGFzc0xpc3QuZm9yRWFjaCgoY2xhc3NOYW1lKSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgdGFyZ2V0LmZvckVhY2goKGVsZW0pID0+IHtcbiAgICAgICAgY29uZGl0aW9uID8gZWxlbS5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkgOiBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZGl0aW9uID8gdGFyZ2V0LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSA6IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50W10gfCBudWxsfSB0YXJnZXRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGNsYXNzTGlzdFxuICovXG5leHBvcnQgY29uc3QgYWRkQ2xhc3MgPSAodGFyZ2V0LCBjbGFzc0xpc3QpID0+IHtcbiAgdG9nZ2xlQ2xhc3ModGFyZ2V0LCBjbGFzc0xpc3QsIHRydWUpXG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50W10gfCBudWxsfSB0YXJnZXRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGNsYXNzTGlzdFxuICovXG5leHBvcnQgY29uc3QgcmVtb3ZlQ2xhc3MgPSAodGFyZ2V0LCBjbGFzc0xpc3QpID0+IHtcbiAgdG9nZ2xlQ2xhc3ModGFyZ2V0LCBjbGFzc0xpc3QsIGZhbHNlKVxufVxuXG4vKipcbiAqIEdldCBkaXJlY3QgY2hpbGQgb2YgYW4gZWxlbWVudCBieSBjbGFzcyBuYW1lXG4gKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge0hUTUxFbGVtZW50IHwgbnVsbH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldERpcmVjdENoaWxkQnlDbGFzcyA9IChlbGVtLCBjbGFzc05hbWUpID0+IHtcbiAgY29uc3QgY2hpbGROb2RlcyA9IHRvQXJyYXkoZWxlbS5jaGlsZE5vZGVzKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaGFzQ2xhc3MoY2hpbGROb2Rlc1tpXSwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIGNoaWxkTm9kZXNbaV1cbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gcHJvcGVydHlcbiAqIEBwYXJhbSB7Kn0gdmFsdWVcbiAqL1xuZXhwb3J0IGNvbnN0IGFwcGx5TnVtZXJpY2FsU3R5bGUgPSAoZWxlbSwgcHJvcGVydHksIHZhbHVlKSA9PiB7XG4gIGlmICh2YWx1ZSA9PT0gYCR7cGFyc2VJbnQodmFsdWUpfWApIHtcbiAgICB2YWx1ZSA9IHBhcnNlSW50KHZhbHVlKVxuICB9XG4gIGlmICh2YWx1ZSB8fCBwYXJzZUludCh2YWx1ZSkgPT09IDApIHtcbiAgICBlbGVtLnN0eWxlW3Byb3BlcnR5XSA9IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgPyBgJHt2YWx1ZX1weGAgOiB2YWx1ZVxuICB9IGVsc2Uge1xuICAgIGVsZW0uc3R5bGUucmVtb3ZlUHJvcGVydHkocHJvcGVydHkpXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gZGlzcGxheVxuICovXG5leHBvcnQgY29uc3Qgc2hvdyA9IChlbGVtLCBkaXNwbGF5ID0gJ2ZsZXgnKSA9PiB7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9IGRpc3BsYXlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKi9cbmV4cG9ydCBjb25zdCBoaWRlID0gKGVsZW0pID0+IHtcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG59XG5cbmV4cG9ydCBjb25zdCBzZXRTdHlsZSA9IChwYXJlbnQsIHNlbGVjdG9yLCBwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgY29uc3QgZWwgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgaWYgKGVsKSB7XG4gICAgZWwuc3R5bGVbcHJvcGVydHldID0gdmFsdWVcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdG9nZ2xlID0gKGVsZW0sIGNvbmRpdGlvbiwgZGlzcGxheSkgPT4ge1xuICBjb25kaXRpb24gPyBzaG93KGVsZW0sIGRpc3BsYXkpIDogaGlkZShlbGVtKVxufVxuXG4vLyBib3Jyb3dlZCBmcm9tIGpxdWVyeSAkKGVsZW0pLmlzKCc6dmlzaWJsZScpIGltcGxlbWVudGF0aW9uXG5leHBvcnQgY29uc3QgaXNWaXNpYmxlID0gKGVsZW0pID0+ICEhKGVsZW0gJiYgKGVsZW0ub2Zmc2V0V2lkdGggfHwgZWxlbS5vZmZzZXRIZWlnaHQgfHwgZWxlbS5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCkpXG5cbmV4cG9ydCBjb25zdCBhbGxCdXR0b25zQXJlSGlkZGVuID0gKCkgPT5cbiAgIWlzVmlzaWJsZShnZXRDb25maXJtQnV0dG9uKCkpICYmICFpc1Zpc2libGUoZ2V0RGVueUJ1dHRvbigpKSAmJiAhaXNWaXNpYmxlKGdldENhbmNlbEJ1dHRvbigpKVxuXG5leHBvcnQgY29uc3QgaXNTY3JvbGxhYmxlID0gKGVsZW0pID0+ICEhKGVsZW0uc2Nyb2xsSGVpZ2h0ID4gZWxlbS5jbGllbnRIZWlnaHQpXG5cbi8vIGJvcnJvd2VkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzQ2MzUyMTE5XG5leHBvcnQgY29uc3QgaGFzQ3NzQW5pbWF0aW9uID0gKGVsZW0pID0+IHtcbiAgY29uc3Qgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKVxuXG4gIGNvbnN0IGFuaW1EdXJhdGlvbiA9IHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnYW5pbWF0aW9uLWR1cmF0aW9uJykgfHwgJzAnKVxuICBjb25zdCB0cmFuc0R1cmF0aW9uID0gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2l0aW9uLWR1cmF0aW9uJykgfHwgJzAnKVxuXG4gIHJldHVybiBhbmltRHVyYXRpb24gPiAwIHx8IHRyYW5zRHVyYXRpb24gPiAwXG59XG5cbmV4cG9ydCBjb25zdCBhbmltYXRlVGltZXJQcm9ncmVzc0JhciA9ICh0aW1lciwgcmVzZXQgPSBmYWxzZSkgPT4ge1xuICBjb25zdCB0aW1lclByb2dyZXNzQmFyID0gZ2V0VGltZXJQcm9ncmVzc0JhcigpXG4gIGlmIChpc1Zpc2libGUodGltZXJQcm9ncmVzc0JhcikpIHtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUudHJhbnNpdGlvbiA9ICdub25lJ1xuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcxMDAlJ1xuICAgIH1cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAke3RpbWVyIC8gMTAwMH1zIGxpbmVhcmBcbiAgICAgIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSAnMCUnXG4gICAgfSwgMTApXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHN0b3BUaW1lclByb2dyZXNzQmFyID0gKCkgPT4ge1xuICBjb25zdCB0aW1lclByb2dyZXNzQmFyID0gZ2V0VGltZXJQcm9ncmVzc0JhcigpXG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXJXaWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRpbWVyUHJvZ3Jlc3NCYXIpLndpZHRoKVxuICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uJylcbiAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcxMDAlJ1xuICBjb25zdCB0aW1lclByb2dyZXNzQmFyRnVsbFdpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGltZXJQcm9ncmVzc0Jhcikud2lkdGgpXG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXJQZXJjZW50ID0gKHRpbWVyUHJvZ3Jlc3NCYXJXaWR0aCAvIHRpbWVyUHJvZ3Jlc3NCYXJGdWxsV2lkdGgpICogMTAwXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24nKVxuICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gYCR7dGltZXJQcm9ncmVzc0JhclBlcmNlbnR9JWBcbn1cbiIsIi8qKlxuICogRGV0ZWN0IE5vZGUgZW52XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBpc05vZGVFbnYgPSAoKSA9PiB0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnXG4iLCJleHBvcnQgY29uc3QgUkVTVE9SRV9GT0NVU19USU1FT1VUID0gMTAwXG4iLCJpbXBvcnQgeyBSRVNUT1JFX0ZPQ1VTX1RJTUVPVVQgfSBmcm9tICcuL2NvbnN0YW50cy5qcydcblxuY29uc3QgZ2xvYmFsU3RhdGUgPSB7fVxuXG5leHBvcnQgZGVmYXVsdCBnbG9iYWxTdGF0ZVxuXG5jb25zdCBmb2N1c1ByZXZpb3VzQWN0aXZlRWxlbWVudCA9ICgpID0+IHtcbiAgaWYgKGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudCAmJiBnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMpIHtcbiAgICBnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQuZm9jdXMoKVxuICAgIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IG51bGxcbiAgfSBlbHNlIGlmIChkb2N1bWVudC5ib2R5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5mb2N1cygpXG4gIH1cbn1cblxuLy8gUmVzdG9yZSBwcmV2aW91cyBhY3RpdmUgKGZvY3VzZWQpIGVsZW1lbnRcbmV4cG9ydCBjb25zdCByZXN0b3JlQWN0aXZlRWxlbWVudCA9IChyZXR1cm5Gb2N1cykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICBpZiAoIXJldHVybkZvY3VzKSB7XG4gICAgICByZXR1cm4gcmVzb2x2ZSgpXG4gICAgfVxuICAgIGNvbnN0IHggPSB3aW5kb3cuc2Nyb2xsWFxuICAgIGNvbnN0IHkgPSB3aW5kb3cuc2Nyb2xsWVxuXG4gICAgZ2xvYmFsU3RhdGUucmVzdG9yZUZvY3VzVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZm9jdXNQcmV2aW91c0FjdGl2ZUVsZW1lbnQoKVxuICAgICAgcmVzb2x2ZSgpXG4gICAgfSwgUkVTVE9SRV9GT0NVU19USU1FT1VUKSAvLyBpc3N1ZXMvOTAwXG5cbiAgICB3aW5kb3cuc2Nyb2xsVG8oeCwgeSlcbiAgfSlcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGdldENvbnRhaW5lciwgZ2V0UG9wdXAgfSBmcm9tICcuL2dldHRlcnMuanMnXG5pbXBvcnQgeyBhZGRDbGFzcywgZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzLCByZW1vdmVDbGFzcywgc2V0SW5uZXJIdG1sIH0gZnJvbSAnLi9kb21VdGlscy5qcydcbmltcG9ydCB7IGlzTm9kZUVudiB9IGZyb20gJy4uL2lzTm9kZUVudi5qcydcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnLi4vdXRpbHMuanMnXG5pbXBvcnQgZ2xvYmFsU3RhdGUgZnJvbSAnLi4vLi4vZ2xvYmFsU3RhdGUuanMnXG5cbmNvbnN0IHN3ZWV0SFRNTCA9IGBcbiA8ZGl2IGFyaWEtbGFiZWxsZWRieT1cIiR7c3dhbENsYXNzZXMudGl0bGV9XCIgYXJpYS1kZXNjcmliZWRieT1cIiR7c3dhbENsYXNzZXNbJ2h0bWwtY29udGFpbmVyJ119XCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnBvcHVwfVwiIHRhYmluZGV4PVwiLTFcIj5cbiAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5jbG9zZX1cIj48L2J1dHRvbj5cbiAgIDx1bCBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ3Byb2dyZXNzLXN0ZXBzJ119XCI+PC91bD5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmljb259XCI+PC9kaXY+XG4gICA8aW1nIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5pbWFnZX1cIiAvPlxuICAgPGgyIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy50aXRsZX1cIiBpZD1cIiR7c3dhbENsYXNzZXMudGl0bGV9XCI+PC9oMj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddfVwiIGlkPVwiJHtzd2FsQ2xhc3Nlc1snaHRtbC1jb250YWluZXInXX1cIj48L2Rpdj5cbiAgIDxpbnB1dCBjbGFzcz1cIiR7c3dhbENsYXNzZXMuaW5wdXR9XCIgLz5cbiAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5maWxlfVwiIC8+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5yYW5nZX1cIj5cbiAgICAgPGlucHV0IHR5cGU9XCJyYW5nZVwiIC8+XG4gICAgIDxvdXRwdXQ+PC9vdXRwdXQ+XG4gICA8L2Rpdj5cbiAgIDxzZWxlY3QgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnNlbGVjdH1cIj48L3NlbGVjdD5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnJhZGlvfVwiPjwvZGl2PlxuICAgPGxhYmVsIGZvcj1cIiR7c3dhbENsYXNzZXMuY2hlY2tib3h9XCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmNoZWNrYm94fVwiPlxuICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgLz5cbiAgICAgPHNwYW4gY2xhc3M9XCIke3N3YWxDbGFzc2VzLmxhYmVsfVwiPjwvc3Bhbj5cbiAgIDwvbGFiZWw+XG4gICA8dGV4dGFyZWEgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnRleHRhcmVhfVwiPjwvdGV4dGFyZWE+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ119XCIgaWQ9XCIke3N3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXX1cIj48L2Rpdj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmFjdGlvbnN9XCI+XG4gICAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmxvYWRlcn1cIj48L2Rpdj5cbiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmNvbmZpcm19XCI+PC9idXR0b24+XG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5kZW55fVwiPjwvYnV0dG9uPlxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY2FuY2VsfVwiPjwvYnV0dG9uPlxuICAgPC9kaXY+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5mb290ZXJ9XCI+PC9kaXY+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1sndGltZXItcHJvZ3Jlc3MtYmFyLWNvbnRhaW5lciddfVwiPlxuICAgICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1sndGltZXItcHJvZ3Jlc3MtYmFyJ119XCI+PC9kaXY+XG4gICA8L2Rpdj5cbiA8L2Rpdj5cbmAucmVwbGFjZSgvKF58XFxuKVxccyovZywgJycpXG5cbmNvbnN0IHJlc2V0T2xkQ29udGFpbmVyID0gKCkgPT4ge1xuICBjb25zdCBvbGRDb250YWluZXIgPSBnZXRDb250YWluZXIoKVxuICBpZiAoIW9sZENvbnRhaW5lcikge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgb2xkQ29udGFpbmVyLnJlbW92ZSgpXG4gIHJlbW92ZUNsYXNzKFxuICAgIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLFxuICAgIFtzd2FsQ2xhc3Nlc1snbm8tYmFja2Ryb3AnXSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ10sIHN3YWxDbGFzc2VzWydoYXMtY29sdW1uJ11dXG4gIClcblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZXNldFZhbGlkYXRpb25NZXNzYWdlID0gKCkgPT4ge1xuICBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2UucmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpXG59XG5cbmNvbnN0IGFkZElucHV0Q2hhbmdlTGlzdGVuZXJzID0gKCkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGdldFBvcHVwKClcblxuICBjb25zdCBpbnB1dCA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuaW5wdXQpXG4gIGNvbnN0IGZpbGUgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLmZpbGUpXG4gIGNvbnN0IHJhbmdlID0gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucmFuZ2V9IGlucHV0YClcbiAgY29uc3QgcmFuZ2VPdXRwdXQgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5yYW5nZX0gb3V0cHV0YClcbiAgY29uc3Qgc2VsZWN0ID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5zZWxlY3QpXG4gIGNvbnN0IGNoZWNrYm94ID0gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMuY2hlY2tib3h9IGlucHV0YClcbiAgY29uc3QgdGV4dGFyZWEgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnRleHRhcmVhKVxuXG4gIGlucHV0Lm9uaW5wdXQgPSByZXNldFZhbGlkYXRpb25NZXNzYWdlXG4gIGZpbGUub25jaGFuZ2UgPSByZXNldFZhbGlkYXRpb25NZXNzYWdlXG4gIHNlbGVjdC5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgY2hlY2tib3gub25jaGFuZ2UgPSByZXNldFZhbGlkYXRpb25NZXNzYWdlXG4gIHRleHRhcmVhLm9uaW5wdXQgPSByZXNldFZhbGlkYXRpb25NZXNzYWdlXG5cbiAgcmFuZ2Uub25pbnB1dCA9ICgpID0+IHtcbiAgICByZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbiAgICByYW5nZU91dHB1dC52YWx1ZSA9IHJhbmdlLnZhbHVlXG4gIH1cblxuICByYW5nZS5vbmNoYW5nZSA9ICgpID0+IHtcbiAgICByZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbiAgICByYW5nZS5uZXh0U2libGluZy52YWx1ZSA9IHJhbmdlLnZhbHVlXG4gIH1cbn1cblxuY29uc3QgZ2V0VGFyZ2V0ID0gKHRhcmdldCkgPT4gKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpIDogdGFyZ2V0KVxuXG5jb25zdCBzZXR1cEFjY2Vzc2liaWxpdHkgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZ2V0UG9wdXAoKVxuXG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgncm9sZScsIHBhcmFtcy50b2FzdCA/ICdhbGVydCcgOiAnZGlhbG9nJylcbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLWxpdmUnLCBwYXJhbXMudG9hc3QgPyAncG9saXRlJyA6ICdhc3NlcnRpdmUnKVxuICBpZiAoIXBhcmFtcy50b2FzdCkge1xuICAgIHBvcHVwLnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJylcbiAgfVxufVxuXG5jb25zdCBzZXR1cFJUTCA9ICh0YXJnZXRFbGVtZW50KSA9PiB7XG4gIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXRFbGVtZW50KS5kaXJlY3Rpb24gPT09ICdydGwnKSB7XG4gICAgYWRkQ2xhc3MoZ2V0Q29udGFpbmVyKCksIHN3YWxDbGFzc2VzLnJ0bClcbiAgfVxufVxuXG4vKlxuICogQWRkIG1vZGFsICsgYmFja2Ryb3AgdG8gRE9NXG4gKi9cbmV4cG9ydCBjb25zdCBpbml0ID0gKHBhcmFtcykgPT4ge1xuICAvLyBDbGVhbiB1cCB0aGUgb2xkIHBvcHVwIGNvbnRhaW5lciBpZiBpdCBleGlzdHNcbiAgY29uc3Qgb2xkQ29udGFpbmVyRXhpc3RlZCA9IHJlc2V0T2xkQ29udGFpbmVyKClcblxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzTm9kZUVudigpKSB7XG4gICAgZXJyb3IoJ1N3ZWV0QWxlcnQyIHJlcXVpcmVzIGRvY3VtZW50IHRvIGluaXRpYWxpemUnKVxuICAgIHJldHVyblxuICB9XG5cbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29udGFpbmVyLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmNvbnRhaW5lclxuICBpZiAob2xkQ29udGFpbmVyRXhpc3RlZCkge1xuICAgIGFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbJ25vLXRyYW5zaXRpb24nXSlcbiAgfVxuICBzZXRJbm5lckh0bWwoY29udGFpbmVyLCBzd2VldEhUTUwpXG5cbiAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGdldFRhcmdldChwYXJhbXMudGFyZ2V0KVxuICB0YXJnZXRFbGVtZW50LmFwcGVuZENoaWxkKGNvbnRhaW5lcilcblxuICBzZXR1cEFjY2Vzc2liaWxpdHkocGFyYW1zKVxuICBzZXR1cFJUTCh0YXJnZXRFbGVtZW50KVxuICBhZGRJbnB1dENoYW5nZUxpc3RlbmVycygpXG59XG4iLCJpbXBvcnQgeyBzZXRJbm5lckh0bWwgfSBmcm9tICcuL2RvbVV0aWxzLmpzJ1xuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBvYmplY3QgfCBzdHJpbmd9IHBhcmFtXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqL1xuZXhwb3J0IGNvbnN0IHBhcnNlSHRtbFRvQ29udGFpbmVyID0gKHBhcmFtLCB0YXJnZXQpID0+IHtcbiAgLy8gRE9NIGVsZW1lbnRcbiAgaWYgKHBhcmFtIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQocGFyYW0pXG4gIH1cblxuICAvLyBPYmplY3RcbiAgZWxzZSBpZiAodHlwZW9mIHBhcmFtID09PSAnb2JqZWN0Jykge1xuICAgIGhhbmRsZU9iamVjdChwYXJhbSwgdGFyZ2V0KVxuICB9XG5cbiAgLy8gUGxhaW4gc3RyaW5nXG4gIGVsc2UgaWYgKHBhcmFtKSB7XG4gICAgc2V0SW5uZXJIdG1sKHRhcmdldCwgcGFyYW0pXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyYW1cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICovXG5jb25zdCBoYW5kbGVPYmplY3QgPSAocGFyYW0sIHRhcmdldCkgPT4ge1xuICAvLyBKUXVlcnkgZWxlbWVudChzKVxuICBpZiAocGFyYW0uanF1ZXJ5KSB7XG4gICAgaGFuZGxlSnF1ZXJ5RWxlbSh0YXJnZXQsIHBhcmFtKVxuICB9XG5cbiAgLy8gRm9yIG90aGVyIG9iamVjdHMgdXNlIHRoZWlyIHN0cmluZyByZXByZXNlbnRhdGlvblxuICBlbHNlIHtcbiAgICBzZXRJbm5lckh0bWwodGFyZ2V0LCBwYXJhbS50b1N0cmluZygpKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUpxdWVyeUVsZW0gPSAodGFyZ2V0LCBlbGVtKSA9PiB7XG4gIHRhcmdldC50ZXh0Q29udGVudCA9ICcnXG4gIGlmICgwIGluIGVsZW0pIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSBpbiBlbGVtOyBpKyspIHtcbiAgICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbGVtW2ldLmNsb25lTm9kZSh0cnVlKSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW0uY2xvbmVOb2RlKHRydWUpKVxuICB9XG59XG4iLCJpbXBvcnQgeyBpc05vZGVFbnYgfSBmcm9tICcuLi9pc05vZGVFbnYuanMnXG5cbmV4cG9ydCBjb25zdCBhbmltYXRpb25FbmRFdmVudCA9ICgoKSA9PiB7XG4gIC8vIFByZXZlbnQgcnVuIGluIE5vZGUgZW52XG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNOb2RlRW52KCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IHRlc3RFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnN0IHRyYW5zRW5kRXZlbnROYW1lcyA9IHtcbiAgICBXZWJraXRBbmltYXRpb246ICd3ZWJraXRBbmltYXRpb25FbmQnLCAvLyBDaHJvbWUsIFNhZmFyaSBhbmQgT3BlcmFcbiAgICBhbmltYXRpb246ICdhbmltYXRpb25lbmQnLCAvLyBTdGFuZGFyZCBzeW50YXhcbiAgfVxuICBmb3IgKGNvbnN0IGkgaW4gdHJhbnNFbmRFdmVudE5hbWVzKSB7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh0cmFuc0VuZEV2ZW50TmFtZXMsIGkpICYmIHR5cGVvZiB0ZXN0RWwuc3R5bGVbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdHJhbnNFbmRFdmVudE5hbWVzW2ldXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59KSgpXG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5cbi8vIE1lYXN1cmUgc2Nyb2xsYmFyIHdpZHRoIGZvciBwYWRkaW5nIGJvZHkgZHVyaW5nIG1vZGFsIHNob3cvaGlkZVxuLy8gaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL2pzL3NyYy9tb2RhbC5qc1xuZXhwb3J0IGNvbnN0IG1lYXN1cmVTY3JvbGxiYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHNjcm9sbERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIHNjcm9sbERpdi5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlc1snc2Nyb2xsYmFyLW1lYXN1cmUnXVxuICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHNjcm9sbERpdilcbiAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChzY3JvbGxEaXYpXG4gIHJldHVybiBzY3JvbGxiYXJXaWR0aFxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IGNhcGl0YWxpemVGaXJzdExldHRlciB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQWN0aW9ucyA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBkb20uZ2V0QWN0aW9ucygpXG4gIGNvbnN0IGxvYWRlciA9IGRvbS5nZXRMb2FkZXIoKVxuXG4gIC8vIEFjdGlvbnMgKGJ1dHRvbnMpIHdyYXBwZXJcbiAgaWYgKCFwYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24gJiYgIXBhcmFtcy5zaG93RGVueUJ1dHRvbiAmJiAhcGFyYW1zLnNob3dDYW5jZWxCdXR0b24pIHtcbiAgICBkb20uaGlkZShhY3Rpb25zKVxuICB9IGVsc2Uge1xuICAgIGRvbS5zaG93KGFjdGlvbnMpXG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoYWN0aW9ucywgcGFyYW1zLCAnYWN0aW9ucycpXG5cbiAgLy8gUmVuZGVyIGFsbCB0aGUgYnV0dG9uc1xuICByZW5kZXJCdXR0b25zKGFjdGlvbnMsIGxvYWRlciwgcGFyYW1zKVxuXG4gIC8vIExvYWRlclxuICBkb20uc2V0SW5uZXJIdG1sKGxvYWRlciwgcGFyYW1zLmxvYWRlckh0bWwpXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGxvYWRlciwgcGFyYW1zLCAnbG9hZGVyJylcbn1cblxuZnVuY3Rpb24gcmVuZGVyQnV0dG9ucyhhY3Rpb25zLCBsb2FkZXIsIHBhcmFtcykge1xuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9tLmdldENvbmZpcm1CdXR0b24oKVxuICBjb25zdCBkZW55QnV0dG9uID0gZG9tLmdldERlbnlCdXR0b24oKVxuICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb20uZ2V0Q2FuY2VsQnV0dG9uKClcblxuICAvLyBSZW5kZXIgYnV0dG9uc1xuICByZW5kZXJCdXR0b24oY29uZmlybUJ1dHRvbiwgJ2NvbmZpcm0nLCBwYXJhbXMpXG4gIHJlbmRlckJ1dHRvbihkZW55QnV0dG9uLCAnZGVueScsIHBhcmFtcylcbiAgcmVuZGVyQnV0dG9uKGNhbmNlbEJ1dHRvbiwgJ2NhbmNlbCcsIHBhcmFtcylcbiAgaGFuZGxlQnV0dG9uc1N0eWxpbmcoY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uLCBwYXJhbXMpXG5cbiAgaWYgKHBhcmFtcy5yZXZlcnNlQnV0dG9ucykge1xuICAgIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICAgIGFjdGlvbnMuaW5zZXJ0QmVmb3JlKGNhbmNlbEJ1dHRvbiwgY29uZmlybUJ1dHRvbilcbiAgICAgIGFjdGlvbnMuaW5zZXJ0QmVmb3JlKGRlbnlCdXR0b24sIGNvbmZpcm1CdXR0b24pXG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGlvbnMuaW5zZXJ0QmVmb3JlKGNhbmNlbEJ1dHRvbiwgbG9hZGVyKVxuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoZGVueUJ1dHRvbiwgbG9hZGVyKVxuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoY29uZmlybUJ1dHRvbiwgbG9hZGVyKVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVCdXR0b25zU3R5bGluZyhjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b24sIHBhcmFtcykge1xuICBpZiAoIXBhcmFtcy5idXR0b25zU3R5bGluZykge1xuICAgIHJldHVybiBkb20ucmVtb3ZlQ2xhc3MoW2NvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbl0sIHN3YWxDbGFzc2VzLnN0eWxlZClcbiAgfVxuXG4gIGRvbS5hZGRDbGFzcyhbY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uXSwgc3dhbENsYXNzZXMuc3R5bGVkKVxuXG4gIC8vIEJ1dHRvbnMgYmFja2dyb3VuZCBjb2xvcnNcbiAgaWYgKHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3IpIHtcbiAgICBjb25maXJtQnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5jb25maXJtQnV0dG9uQ29sb3JcbiAgICBkb20uYWRkQ2xhc3MoY29uZmlybUJ1dHRvbiwgc3dhbENsYXNzZXNbJ2RlZmF1bHQtb3V0bGluZSddKVxuICB9XG4gIGlmIChwYXJhbXMuZGVueUJ1dHRvbkNvbG9yKSB7XG4gICAgZGVueUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuZGVueUJ1dHRvbkNvbG9yXG4gICAgZG9tLmFkZENsYXNzKGRlbnlCdXR0b24sIHN3YWxDbGFzc2VzWydkZWZhdWx0LW91dGxpbmUnXSlcbiAgfVxuICBpZiAocGFyYW1zLmNhbmNlbEJ1dHRvbkNvbG9yKSB7XG4gICAgY2FuY2VsQnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5jYW5jZWxCdXR0b25Db2xvclxuICAgIGRvbS5hZGRDbGFzcyhjYW5jZWxCdXR0b24sIHN3YWxDbGFzc2VzWydkZWZhdWx0LW91dGxpbmUnXSlcbiAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJCdXR0b24oYnV0dG9uLCBidXR0b25UeXBlLCBwYXJhbXMpIHtcbiAgZG9tLnRvZ2dsZShidXR0b24sIHBhcmFtc1tgc2hvdyR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKGJ1dHRvblR5cGUpfUJ1dHRvbmBdLCAnaW5saW5lLWJsb2NrJylcbiAgZG9tLnNldElubmVySHRtbChidXR0b24sIHBhcmFtc1tgJHtidXR0b25UeXBlfUJ1dHRvblRleHRgXSkgLy8gU2V0IGNhcHRpb24gdGV4dFxuICBidXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgcGFyYW1zW2Ake2J1dHRvblR5cGV9QnV0dG9uQXJpYUxhYmVsYF0pIC8vIEFSSUEgbGFiZWxcblxuICAvLyBBZGQgYnV0dG9ucyBjdXN0b20gY2xhc3Nlc1xuICBidXR0b24uY2xhc3NOYW1lID0gc3dhbENsYXNzZXNbYnV0dG9uVHlwZV1cbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoYnV0dG9uLCBwYXJhbXMsIGAke2J1dHRvblR5cGV9QnV0dG9uYClcbiAgZG9tLmFkZENsYXNzKGJ1dHRvbiwgcGFyYW1zW2Ake2J1dHRvblR5cGV9QnV0dG9uQ2xhc3NgXSlcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi8uLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmZ1bmN0aW9uIGhhbmRsZUJhY2tkcm9wUGFyYW0oY29udGFpbmVyLCBiYWNrZHJvcCkge1xuICBpZiAodHlwZW9mIGJhY2tkcm9wID09PSAnc3RyaW5nJykge1xuICAgIGNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kID0gYmFja2Ryb3BcbiAgfSBlbHNlIGlmICghYmFja2Ryb3ApIHtcbiAgICBkb20uYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZVBvc2l0aW9uUGFyYW0oY29udGFpbmVyLCBwb3NpdGlvbikge1xuICBpZiAocG9zaXRpb24gaW4gc3dhbENsYXNzZXMpIHtcbiAgICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1twb3NpdGlvbl0pXG4gIH0gZWxzZSB7XG4gICAgd2FybignVGhlIFwicG9zaXRpb25cIiBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkLCBkZWZhdWx0aW5nIHRvIFwiY2VudGVyXCInKVxuICAgIGRvbS5hZGRDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzLmNlbnRlcilcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVHcm93UGFyYW0oY29udGFpbmVyLCBncm93KSB7XG4gIGlmIChncm93ICYmIHR5cGVvZiBncm93ID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGdyb3dDbGFzcyA9IGBncm93LSR7Z3Jvd31gXG4gICAgaWYgKGdyb3dDbGFzcyBpbiBzd2FsQ2xhc3Nlcykge1xuICAgICAgZG9tLmFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbZ3Jvd0NsYXNzXSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHJlbmRlckNvbnRhaW5lciA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuXG4gIGlmICghY29udGFpbmVyKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBoYW5kbGVCYWNrZHJvcFBhcmFtKGNvbnRhaW5lciwgcGFyYW1zLmJhY2tkcm9wKVxuXG4gIGhhbmRsZVBvc2l0aW9uUGFyYW0oY29udGFpbmVyLCBwYXJhbXMucG9zaXRpb24pXG4gIGhhbmRsZUdyb3dQYXJhbShjb250YWluZXIsIHBhcmFtcy5ncm93KVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhjb250YWluZXIsIHBhcmFtcywgJ2NvbnRhaW5lcicpXG59XG4iLCIvKipcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIGBXZWFrTWFwYHMgZm9yIGVhY2ggZWZmZWN0aXZlbHktXCJwcml2YXRlICBwcm9wZXJ0eVwiIHRoYXQgYSBgU3dhbGAgaGFzLlxuICogRm9yIGV4YW1wbGUsIHRvIHNldCB0aGUgcHJpdmF0ZSBwcm9wZXJ0eSBcImZvb1wiIG9mIGB0aGlzYCB0byBcImJhclwiLCB5b3UgY2FuIGBwcml2YXRlUHJvcHMuZm9vLnNldCh0aGlzLCAnYmFyJylgXG4gKiBUaGlzIGlzIHRoZSBhcHByb2FjaCB0aGF0IEJhYmVsIHdpbGwgcHJvYmFibHkgdGFrZSB0byBpbXBsZW1lbnQgcHJpdmF0ZSBtZXRob2RzL2ZpZWxkc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcml2YXRlLW1ldGhvZHNcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL3B1bGwvNzU1NVxuICogT25jZSB3ZSBoYXZlIHRoZSBjaGFuZ2VzIGZyb20gdGhhdCBQUiBpbiBCYWJlbCwgYW5kIG91ciBjb3JlIGNsYXNzIGZpdHMgcmVhc29uYWJsZSBpbiAqb25lIG1vZHVsZSpcbiAqICAgdGhlbiB3ZSBjYW4gdXNlIHRoYXQgbGFuZ3VhZ2UgZmVhdHVyZS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIGF3YWl0aW5nUHJvbWlzZTogbmV3IFdlYWtNYXAoKSxcbiAgcHJvbWlzZTogbmV3IFdlYWtNYXAoKSxcbiAgaW5uZXJQYXJhbXM6IG5ldyBXZWFrTWFwKCksXG4gIGRvbUNhY2hlOiBuZXcgV2Vha01hcCgpLFxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZXJyb3IsIGlzUHJvbWlzZSwgd2FybiB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vLi4vLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5jb25zdCBpbnB1dFR5cGVzID0gWydpbnB1dCcsICdmaWxlJywgJ3JhbmdlJywgJ3NlbGVjdCcsICdyYWRpbycsICdjaGVja2JveCcsICd0ZXh0YXJlYSddXG5cbmV4cG9ydCBjb25zdCByZW5kZXJJbnB1dCA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBjb25zdCByZXJlbmRlciA9ICFpbm5lclBhcmFtcyB8fCBwYXJhbXMuaW5wdXQgIT09IGlubmVyUGFyYW1zLmlucHV0XG5cbiAgaW5wdXRUeXBlcy5mb3JFYWNoKChpbnB1dFR5cGUpID0+IHtcbiAgICBjb25zdCBpbnB1dENsYXNzID0gc3dhbENsYXNzZXNbaW5wdXRUeXBlXVxuICAgIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZG9tLmdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgaW5wdXRDbGFzcylcblxuICAgIC8vIHNldCBhdHRyaWJ1dGVzXG4gICAgc2V0QXR0cmlidXRlcyhpbnB1dFR5cGUsIHBhcmFtcy5pbnB1dEF0dHJpYnV0ZXMpXG5cbiAgICAvLyBzZXQgY2xhc3NcbiAgICBpbnB1dENvbnRhaW5lci5jbGFzc05hbWUgPSBpbnB1dENsYXNzXG5cbiAgICBpZiAocmVyZW5kZXIpIHtcbiAgICAgIGRvbS5oaWRlKGlucHV0Q29udGFpbmVyKVxuICAgIH1cbiAgfSlcblxuICBpZiAocGFyYW1zLmlucHV0KSB7XG4gICAgaWYgKHJlcmVuZGVyKSB7XG4gICAgICBzaG93SW5wdXQocGFyYW1zKVxuICAgIH1cbiAgICAvLyBzZXQgY3VzdG9tIGNsYXNzXG4gICAgc2V0Q3VzdG9tQ2xhc3MocGFyYW1zKVxuICB9XG59XG5cbmNvbnN0IHNob3dJbnB1dCA9IChwYXJhbXMpID0+IHtcbiAgaWYgKCFyZW5kZXJJbnB1dFR5cGVbcGFyYW1zLmlucHV0XSkge1xuICAgIHJldHVybiBlcnJvcihcbiAgICAgIGBVbmV4cGVjdGVkIHR5cGUgb2YgaW5wdXQhIEV4cGVjdGVkIFwidGV4dFwiLCBcImVtYWlsXCIsIFwicGFzc3dvcmRcIiwgXCJudW1iZXJcIiwgXCJ0ZWxcIiwgXCJzZWxlY3RcIiwgXCJyYWRpb1wiLCBcImNoZWNrYm94XCIsIFwidGV4dGFyZWFcIiwgXCJmaWxlXCIgb3IgXCJ1cmxcIiwgZ290IFwiJHtwYXJhbXMuaW5wdXR9XCJgXG4gICAgKVxuICB9XG5cbiAgY29uc3QgaW5wdXRDb250YWluZXIgPSBnZXRJbnB1dENvbnRhaW5lcihwYXJhbXMuaW5wdXQpXG4gIGNvbnN0IGlucHV0ID0gcmVuZGVySW5wdXRUeXBlW3BhcmFtcy5pbnB1dF0oaW5wdXRDb250YWluZXIsIHBhcmFtcylcbiAgZG9tLnNob3coaW5wdXQpXG5cbiAgLy8gaW5wdXQgYXV0b2ZvY3VzXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGRvbS5mb2N1c0lucHV0KGlucHV0KVxuICB9KVxufVxuXG5jb25zdCByZW1vdmVBdHRyaWJ1dGVzID0gKGlucHV0KSA9PiB7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW5wdXQuYXR0cmlidXRlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGF0dHJOYW1lID0gaW5wdXQuYXR0cmlidXRlc1tpXS5uYW1lXG4gICAgaWYgKCFbJ3R5cGUnLCAndmFsdWUnLCAnc3R5bGUnXS5pbmNsdWRlcyhhdHRyTmFtZSkpIHtcbiAgICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZShhdHRyTmFtZSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2V0QXR0cmlidXRlcyA9IChpbnB1dFR5cGUsIGlucHV0QXR0cmlidXRlcykgPT4ge1xuICBjb25zdCBpbnB1dCA9IGRvbS5nZXRJbnB1dChkb20uZ2V0UG9wdXAoKSwgaW5wdXRUeXBlKVxuICBpZiAoIWlucHV0KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICByZW1vdmVBdHRyaWJ1dGVzKGlucHV0KVxuXG4gIGZvciAoY29uc3QgYXR0ciBpbiBpbnB1dEF0dHJpYnV0ZXMpIHtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoYXR0ciwgaW5wdXRBdHRyaWJ1dGVzW2F0dHJdKVxuICB9XG59XG5cbmNvbnN0IHNldEN1c3RvbUNsYXNzID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBpbnB1dENvbnRhaW5lciA9IGdldElucHV0Q29udGFpbmVyKHBhcmFtcy5pbnB1dClcbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcykge1xuICAgIGRvbS5hZGRDbGFzcyhpbnB1dENvbnRhaW5lciwgcGFyYW1zLmN1c3RvbUNsYXNzLmlucHV0KVxuICB9XG59XG5cbmNvbnN0IHNldElucHV0UGxhY2Vob2xkZXIgPSAoaW5wdXQsIHBhcmFtcykgPT4ge1xuICBpZiAoIWlucHV0LnBsYWNlaG9sZGVyIHx8IHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKSB7XG4gICAgaW5wdXQucGxhY2Vob2xkZXIgPSBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlclxuICB9XG59XG5cbmNvbnN0IHNldElucHV0TGFiZWwgPSAoaW5wdXQsIHByZXBlbmRUbywgcGFyYW1zKSA9PiB7XG4gIGlmIChwYXJhbXMuaW5wdXRMYWJlbCkge1xuICAgIGlucHV0LmlkID0gc3dhbENsYXNzZXMuaW5wdXRcbiAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICBjb25zdCBsYWJlbENsYXNzID0gc3dhbENsYXNzZXNbJ2lucHV0LWxhYmVsJ11cbiAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2ZvcicsIGlucHV0LmlkKVxuICAgIGxhYmVsLmNsYXNzTmFtZSA9IGxhYmVsQ2xhc3NcbiAgICBkb20uYWRkQ2xhc3MobGFiZWwsIHBhcmFtcy5jdXN0b21DbGFzcy5pbnB1dExhYmVsKVxuICAgIGxhYmVsLmlubmVyVGV4dCA9IHBhcmFtcy5pbnB1dExhYmVsXG4gICAgcHJlcGVuZFRvLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlYmVnaW4nLCBsYWJlbClcbiAgfVxufVxuXG5jb25zdCBnZXRJbnB1dENvbnRhaW5lciA9IChpbnB1dFR5cGUpID0+IHtcbiAgY29uc3QgaW5wdXRDbGFzcyA9IHN3YWxDbGFzc2VzW2lucHV0VHlwZV0gPyBzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVdIDogc3dhbENsYXNzZXMuaW5wdXRcbiAgcmV0dXJuIGRvbS5nZXREaXJlY3RDaGlsZEJ5Q2xhc3MoZG9tLmdldFBvcHVwKCksIGlucHV0Q2xhc3MpXG59XG5cbmNvbnN0IHJlbmRlcklucHV0VHlwZSA9IHt9XG5cbnJlbmRlcklucHV0VHlwZS50ZXh0ID1cbiAgcmVuZGVySW5wdXRUeXBlLmVtYWlsID1cbiAgcmVuZGVySW5wdXRUeXBlLnBhc3N3b3JkID1cbiAgcmVuZGVySW5wdXRUeXBlLm51bWJlciA9XG4gIHJlbmRlcklucHV0VHlwZS50ZWwgPVxuICByZW5kZXJJbnB1dFR5cGUudXJsID1cbiAgICAoaW5wdXQsIHBhcmFtcykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBwYXJhbXMuaW5wdXRWYWx1ZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHBhcmFtcy5pbnB1dFZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICBpbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gICAgICB9IGVsc2UgaWYgKCFpc1Byb21pc2UocGFyYW1zLmlucHV0VmFsdWUpKSB7XG4gICAgICAgIHdhcm4oXG4gICAgICAgICAgYFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dFZhbHVlISBFeHBlY3RlZCBcInN0cmluZ1wiLCBcIm51bWJlclwiIG9yIFwiUHJvbWlzZVwiLCBnb3QgXCIke3R5cGVvZiBwYXJhbXMuaW5wdXRWYWx1ZX1cImBcbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgc2V0SW5wdXRMYWJlbChpbnB1dCwgaW5wdXQsIHBhcmFtcylcbiAgICAgIHNldElucHV0UGxhY2Vob2xkZXIoaW5wdXQsIHBhcmFtcylcbiAgICAgIGlucHV0LnR5cGUgPSBwYXJhbXMuaW5wdXRcbiAgICAgIHJldHVybiBpbnB1dFxuICAgIH1cblxucmVuZGVySW5wdXRUeXBlLmZpbGUgPSAoaW5wdXQsIHBhcmFtcykgPT4ge1xuICBzZXRJbnB1dExhYmVsKGlucHV0LCBpbnB1dCwgcGFyYW1zKVxuICBzZXRJbnB1dFBsYWNlaG9sZGVyKGlucHV0LCBwYXJhbXMpXG4gIHJldHVybiBpbnB1dFxufVxuXG5yZW5kZXJJbnB1dFR5cGUucmFuZ2UgPSAocmFuZ2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCByYW5nZUlucHV0ID0gcmFuZ2UucXVlcnlTZWxlY3RvcignaW5wdXQnKVxuICBjb25zdCByYW5nZU91dHB1dCA9IHJhbmdlLnF1ZXJ5U2VsZWN0b3IoJ291dHB1dCcpXG4gIHJhbmdlSW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZVxuICByYW5nZUlucHV0LnR5cGUgPSBwYXJhbXMuaW5wdXRcbiAgcmFuZ2VPdXRwdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZVxuICBzZXRJbnB1dExhYmVsKHJhbmdlSW5wdXQsIHJhbmdlLCBwYXJhbXMpXG4gIHJldHVybiByYW5nZVxufVxuXG5yZW5kZXJJbnB1dFR5cGUuc2VsZWN0ID0gKHNlbGVjdCwgcGFyYW1zKSA9PiB7XG4gIHNlbGVjdC50ZXh0Q29udGVudCA9ICcnXG4gIGlmIChwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcikge1xuICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICBkb20uc2V0SW5uZXJIdG1sKHBsYWNlaG9sZGVyLCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcilcbiAgICBwbGFjZWhvbGRlci52YWx1ZSA9ICcnXG4gICAgcGxhY2Vob2xkZXIuZGlzYWJsZWQgPSB0cnVlXG4gICAgcGxhY2Vob2xkZXIuc2VsZWN0ZWQgPSB0cnVlXG4gICAgc2VsZWN0LmFwcGVuZENoaWxkKHBsYWNlaG9sZGVyKVxuICB9XG4gIHNldElucHV0TGFiZWwoc2VsZWN0LCBzZWxlY3QsIHBhcmFtcylcbiAgcmV0dXJuIHNlbGVjdFxufVxuXG5yZW5kZXJJbnB1dFR5cGUucmFkaW8gPSAocmFkaW8pID0+IHtcbiAgcmFkaW8udGV4dENvbnRlbnQgPSAnJ1xuICByZXR1cm4gcmFkaW9cbn1cblxucmVuZGVySW5wdXRUeXBlLmNoZWNrYm94ID0gKGNoZWNrYm94Q29udGFpbmVyLCBwYXJhbXMpID0+IHtcbiAgLyoqIEB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSAqL1xuICBjb25zdCBjaGVja2JveCA9IGRvbS5nZXRJbnB1dChkb20uZ2V0UG9wdXAoKSwgJ2NoZWNrYm94JylcbiAgY2hlY2tib3gudmFsdWUgPSAnMSdcbiAgY2hlY2tib3guaWQgPSBzd2FsQ2xhc3Nlcy5jaGVja2JveFxuICBjaGVja2JveC5jaGVja2VkID0gQm9vbGVhbihwYXJhbXMuaW5wdXRWYWx1ZSlcbiAgY29uc3QgbGFiZWwgPSBjaGVja2JveENvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdzcGFuJylcbiAgZG9tLnNldElubmVySHRtbChsYWJlbCwgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpXG4gIHJldHVybiBjaGVja2JveENvbnRhaW5lclxufVxuXG5yZW5kZXJJbnB1dFR5cGUudGV4dGFyZWEgPSAodGV4dGFyZWEsIHBhcmFtcykgPT4ge1xuICB0ZXh0YXJlYS52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gIHNldElucHV0UGxhY2Vob2xkZXIodGV4dGFyZWEsIHBhcmFtcylcbiAgc2V0SW5wdXRMYWJlbCh0ZXh0YXJlYSwgdGV4dGFyZWEsIHBhcmFtcylcblxuICBjb25zdCBnZXRNYXJnaW4gPSAoZWwpID0+XG4gICAgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLm1hcmdpbkxlZnQpICsgcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwpLm1hcmdpblJpZ2h0KVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjI5MVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE2OTlcbiAgICBpZiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgICAgY29uc3QgaW5pdGlhbFBvcHVwV2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb20uZ2V0UG9wdXAoKSkud2lkdGgpXG4gICAgICBjb25zdCB0ZXh0YXJlYVJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRhcmVhV2lkdGggPSB0ZXh0YXJlYS5vZmZzZXRXaWR0aCArIGdldE1hcmdpbih0ZXh0YXJlYSlcbiAgICAgICAgaWYgKHRleHRhcmVhV2lkdGggPiBpbml0aWFsUG9wdXBXaWR0aCkge1xuICAgICAgICAgIGRvbS5nZXRQb3B1cCgpLnN0eWxlLndpZHRoID0gYCR7dGV4dGFyZWFXaWR0aH1weGBcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb20uZ2V0UG9wdXAoKS5zdHlsZS53aWR0aCA9IG51bGxcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbmV3IE11dGF0aW9uT2JzZXJ2ZXIodGV4dGFyZWFSZXNpemVIYW5kbGVyKS5vYnNlcnZlKHRleHRhcmVhLCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXG4gICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzdHlsZSddLFxuICAgICAgfSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIHRleHRhcmVhXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgcmVuZGVySW5wdXQgfSBmcm9tICcuL3JlbmRlcklucHV0LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ29udGVudCA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGh0bWxDb250YWluZXIgPSBkb20uZ2V0SHRtbENvbnRhaW5lcigpXG5cbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoaHRtbENvbnRhaW5lciwgcGFyYW1zLCAnaHRtbENvbnRhaW5lcicpXG5cbiAgLy8gQ29udGVudCBhcyBIVE1MXG4gIGlmIChwYXJhbXMuaHRtbCkge1xuICAgIGRvbS5wYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMuaHRtbCwgaHRtbENvbnRhaW5lcilcbiAgICBkb20uc2hvdyhodG1sQ29udGFpbmVyLCAnYmxvY2snKVxuICB9XG5cbiAgLy8gQ29udGVudCBhcyBwbGFpbiB0ZXh0XG4gIGVsc2UgaWYgKHBhcmFtcy50ZXh0KSB7XG4gICAgaHRtbENvbnRhaW5lci50ZXh0Q29udGVudCA9IHBhcmFtcy50ZXh0XG4gICAgZG9tLnNob3coaHRtbENvbnRhaW5lciwgJ2Jsb2NrJylcbiAgfVxuXG4gIC8vIE5vIGNvbnRlbnRcbiAgZWxzZSB7XG4gICAgZG9tLmhpZGUoaHRtbENvbnRhaW5lcilcbiAgfVxuXG4gIHJlbmRlcklucHV0KGluc3RhbmNlLCBwYXJhbXMpXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyRm9vdGVyID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgZm9vdGVyID0gZG9tLmdldEZvb3RlcigpXG5cbiAgZG9tLnRvZ2dsZShmb290ZXIsIHBhcmFtcy5mb290ZXIpXG5cbiAgaWYgKHBhcmFtcy5mb290ZXIpIHtcbiAgICBkb20ucGFyc2VIdG1sVG9Db250YWluZXIocGFyYW1zLmZvb3RlciwgZm9vdGVyKVxuICB9XG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGZvb3RlciwgcGFyYW1zLCAnZm9vdGVyJylcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJDbG9zZUJ1dHRvbiA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNsb3NlQnV0dG9uID0gZG9tLmdldENsb3NlQnV0dG9uKClcblxuICBkb20uc2V0SW5uZXJIdG1sKGNsb3NlQnV0dG9uLCBwYXJhbXMuY2xvc2VCdXR0b25IdG1sKVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhjbG9zZUJ1dHRvbiwgcGFyYW1zLCAnY2xvc2VCdXR0b24nKVxuXG4gIGRvbS50b2dnbGUoY2xvc2VCdXR0b24sIHBhcmFtcy5zaG93Q2xvc2VCdXR0b24pXG4gIGNsb3NlQnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHBhcmFtcy5jbG9zZUJ1dHRvbkFyaWFMYWJlbClcbn1cbiIsImltcG9ydCB7IGljb25UeXBlcywgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICcuLi8uLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uLy4uLy4uL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckljb24gPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGNvbnN0IGljb24gPSBkb20uZ2V0SWNvbigpXG5cbiAgLy8gaWYgdGhlIGdpdmVuIGljb24gYWxyZWFkeSByZW5kZXJlZCwgYXBwbHkgdGhlIHN0eWxpbmcgd2l0aG91dCByZS1yZW5kZXJpbmcgdGhlIGljb25cbiAgaWYgKGlubmVyUGFyYW1zICYmIHBhcmFtcy5pY29uID09PSBpbm5lclBhcmFtcy5pY29uKSB7XG4gICAgLy8gQ3VzdG9tIG9yIGRlZmF1bHQgY29udGVudFxuICAgIHNldENvbnRlbnQoaWNvbiwgcGFyYW1zKVxuXG4gICAgYXBwbHlTdHlsZXMoaWNvbiwgcGFyYW1zKVxuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCFwYXJhbXMuaWNvbiAmJiAhcGFyYW1zLmljb25IdG1sKSB7XG4gICAgcmV0dXJuIGRvbS5oaWRlKGljb24pXG4gIH1cblxuICBpZiAocGFyYW1zLmljb24gJiYgT2JqZWN0LmtleXMoaWNvblR5cGVzKS5pbmRleE9mKHBhcmFtcy5pY29uKSA9PT0gLTEpIHtcbiAgICBlcnJvcihgVW5rbm93biBpY29uISBFeHBlY3RlZCBcInN1Y2Nlc3NcIiwgXCJlcnJvclwiLCBcIndhcm5pbmdcIiwgXCJpbmZvXCIgb3IgXCJxdWVzdGlvblwiLCBnb3QgXCIke3BhcmFtcy5pY29ufVwiYClcbiAgICByZXR1cm4gZG9tLmhpZGUoaWNvbilcbiAgfVxuXG4gIGRvbS5zaG93KGljb24pXG5cbiAgLy8gQ3VzdG9tIG9yIGRlZmF1bHQgY29udGVudFxuICBzZXRDb250ZW50KGljb24sIHBhcmFtcylcblxuICBhcHBseVN0eWxlcyhpY29uLCBwYXJhbXMpXG5cbiAgLy8gQW5pbWF0ZSBpY29uXG4gIGRvbS5hZGRDbGFzcyhpY29uLCBwYXJhbXMuc2hvd0NsYXNzLmljb24pXG59XG5cbmNvbnN0IGFwcGx5U3R5bGVzID0gKGljb24sIHBhcmFtcykgPT4ge1xuICBmb3IgKGNvbnN0IGljb25UeXBlIGluIGljb25UeXBlcykge1xuICAgIGlmIChwYXJhbXMuaWNvbiAhPT0gaWNvblR5cGUpIHtcbiAgICAgIGRvbS5yZW1vdmVDbGFzcyhpY29uLCBpY29uVHlwZXNbaWNvblR5cGVdKVxuICAgIH1cbiAgfVxuICBkb20uYWRkQ2xhc3MoaWNvbiwgaWNvblR5cGVzW3BhcmFtcy5pY29uXSlcblxuICAvLyBJY29uIGNvbG9yXG4gIHNldENvbG9yKGljb24sIHBhcmFtcylcblxuICAvLyBTdWNjZXNzIGljb24gYmFja2dyb3VuZCBjb2xvclxuICBhZGp1c3RTdWNjZXNzSWNvbkJhY2tncm91bmRDb2xvcigpXG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGljb24sIHBhcmFtcywgJ2ljb24nKVxufVxuXG4vLyBBZGp1c3Qgc3VjY2VzcyBpY29uIGJhY2tncm91bmQgY29sb3IgdG8gbWF0Y2ggdGhlIHBvcHVwIGJhY2tncm91bmQgY29sb3JcbmNvbnN0IGFkanVzdFN1Y2Nlc3NJY29uQmFja2dyb3VuZENvbG9yID0gKCkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IHBvcHVwQmFja2dyb3VuZENvbG9yID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUocG9wdXApLmdldFByb3BlcnR5VmFsdWUoJ2JhY2tncm91bmQtY29sb3InKVxuICBjb25zdCBzdWNjZXNzSWNvblBhcnRzID0gcG9wdXAucXVlcnlTZWxlY3RvckFsbCgnW2NsYXNzXj1zd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmVdLCAuc3dhbDItc3VjY2Vzcy1maXgnKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Y2Nlc3NJY29uUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBzdWNjZXNzSWNvblBhcnRzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBvcHVwQmFja2dyb3VuZENvbG9yXG4gIH1cbn1cblxuY29uc3Qgc3VjY2Vzc0ljb25IdG1sID0gYFxuICA8ZGl2IGNsYXNzPVwic3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lLWxlZnRcIj48L2Rpdj5cbiAgPHNwYW4gY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWxpbmUtdGlwXCI+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nXCI+PC9zcGFuPlxuICA8ZGl2IGNsYXNzPVwic3dhbDItc3VjY2Vzcy1yaW5nXCI+PC9kaXY+IDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWZpeFwiPjwvZGl2PlxuICA8ZGl2IGNsYXNzPVwic3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lLXJpZ2h0XCI+PC9kaXY+XG5gXG5cbmNvbnN0IGVycm9ySWNvbkh0bWwgPSBgXG4gIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmstbGluZS1sZWZ0XCI+PC9zcGFuPlxuICAgIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrLWxpbmUtcmlnaHRcIj48L3NwYW4+XG4gIDwvc3Bhbj5cbmBcblxuY29uc3Qgc2V0Q29udGVudCA9IChpY29uLCBwYXJhbXMpID0+IHtcbiAgaWNvbi50ZXh0Q29udGVudCA9ICcnXG5cbiAgaWYgKHBhcmFtcy5pY29uSHRtbCkge1xuICAgIGRvbS5zZXRJbm5lckh0bWwoaWNvbiwgaWNvbkNvbnRlbnQocGFyYW1zLmljb25IdG1sKSlcbiAgfSBlbHNlIGlmIChwYXJhbXMuaWNvbiA9PT0gJ3N1Y2Nlc3MnKSB7XG4gICAgZG9tLnNldElubmVySHRtbChpY29uLCBzdWNjZXNzSWNvbkh0bWwpXG4gIH0gZWxzZSBpZiAocGFyYW1zLmljb24gPT09ICdlcnJvcicpIHtcbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIGVycm9ySWNvbkh0bWwpXG4gIH0gZWxzZSB7XG4gICAgY29uc3QgZGVmYXVsdEljb25IdG1sID0ge1xuICAgICAgcXVlc3Rpb246ICc/JyxcbiAgICAgIHdhcm5pbmc6ICchJyxcbiAgICAgIGluZm86ICdpJyxcbiAgICB9XG4gICAgZG9tLnNldElubmVySHRtbChpY29uLCBpY29uQ29udGVudChkZWZhdWx0SWNvbkh0bWxbcGFyYW1zLmljb25dKSlcbiAgfVxufVxuXG5jb25zdCBzZXRDb2xvciA9IChpY29uLCBwYXJhbXMpID0+IHtcbiAgaWYgKCFwYXJhbXMuaWNvbkNvbG9yKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWNvbi5zdHlsZS5jb2xvciA9IHBhcmFtcy5pY29uQ29sb3JcbiAgaWNvbi5zdHlsZS5ib3JkZXJDb2xvciA9IHBhcmFtcy5pY29uQ29sb3JcbiAgZm9yIChjb25zdCBzZWwgb2YgW1xuICAgICcuc3dhbDItc3VjY2Vzcy1saW5lLXRpcCcsXG4gICAgJy5zd2FsMi1zdWNjZXNzLWxpbmUtbG9uZycsXG4gICAgJy5zd2FsMi14LW1hcmstbGluZS1sZWZ0JyxcbiAgICAnLnN3YWwyLXgtbWFyay1saW5lLXJpZ2h0JyxcbiAgXSkge1xuICAgIGRvbS5zZXRTdHlsZShpY29uLCBzZWwsICdiYWNrZ3JvdW5kQ29sb3InLCBwYXJhbXMuaWNvbkNvbG9yKVxuICB9XG4gIGRvbS5zZXRTdHlsZShpY29uLCAnLnN3YWwyLXN1Y2Nlc3MtcmluZycsICdib3JkZXJDb2xvcicsIHBhcmFtcy5pY29uQ29sb3IpXG59XG5cbmNvbnN0IGljb25Db250ZW50ID0gKGNvbnRlbnQpID0+IGA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1snaWNvbi1jb250ZW50J119XCI+JHtjb250ZW50fTwvZGl2PmBcbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJJbWFnZSA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGltYWdlID0gZG9tLmdldEltYWdlKClcblxuICBpZiAoIXBhcmFtcy5pbWFnZVVybCkge1xuICAgIHJldHVybiBkb20uaGlkZShpbWFnZSlcbiAgfVxuXG4gIGRvbS5zaG93KGltYWdlLCAnJylcblxuICAvLyBTcmMsIGFsdFxuICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIHBhcmFtcy5pbWFnZVVybClcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdhbHQnLCBwYXJhbXMuaW1hZ2VBbHQpXG5cbiAgLy8gV2lkdGgsIGhlaWdodFxuICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShpbWFnZSwgJ3dpZHRoJywgcGFyYW1zLmltYWdlV2lkdGgpXG4gIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKGltYWdlLCAnaGVpZ2h0JywgcGFyYW1zLmltYWdlSGVpZ2h0KVxuXG4gIC8vIENsYXNzXG4gIGltYWdlLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmltYWdlXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGltYWdlLCBwYXJhbXMsICdpbWFnZScpXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5jb25zdCBjcmVhdGVTdGVwRWxlbWVudCA9IChzdGVwKSA9PiB7XG4gIGNvbnN0IHN0ZXBFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgZG9tLmFkZENsYXNzKHN0ZXBFbCwgc3dhbENsYXNzZXNbJ3Byb2dyZXNzLXN0ZXAnXSlcbiAgZG9tLnNldElubmVySHRtbChzdGVwRWwsIHN0ZXApXG4gIHJldHVybiBzdGVwRWxcbn1cblxuY29uc3QgY3JlYXRlTGluZUVsZW1lbnQgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGxpbmVFbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgZG9tLmFkZENsYXNzKGxpbmVFbCwgc3dhbENsYXNzZXNbJ3Byb2dyZXNzLXN0ZXAtbGluZSddKVxuICBpZiAocGFyYW1zLnByb2dyZXNzU3RlcHNEaXN0YW5jZSkge1xuICAgIGxpbmVFbC5zdHlsZS53aWR0aCA9IHBhcmFtcy5wcm9ncmVzc1N0ZXBzRGlzdGFuY2VcbiAgfVxuICByZXR1cm4gbGluZUVsXG59XG5cbmV4cG9ydCBjb25zdCByZW5kZXJQcm9ncmVzc1N0ZXBzID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lciA9IGRvbS5nZXRQcm9ncmVzc1N0ZXBzKClcbiAgaWYgKCFwYXJhbXMucHJvZ3Jlc3NTdGVwcyB8fCBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZG9tLmhpZGUocHJvZ3Jlc3NTdGVwc0NvbnRhaW5lcilcbiAgfVxuXG4gIGRvbS5zaG93KHByb2dyZXNzU3RlcHNDb250YWluZXIpXG4gIHByb2dyZXNzU3RlcHNDb250YWluZXIudGV4dENvbnRlbnQgPSAnJ1xuICBpZiAocGFyYW1zLmN1cnJlbnRQcm9ncmVzc1N0ZXAgPj0gcGFyYW1zLnByb2dyZXNzU3RlcHMubGVuZ3RoKSB7XG4gICAgd2FybihcbiAgICAgICdJbnZhbGlkIGN1cnJlbnRQcm9ncmVzc1N0ZXAgcGFyYW1ldGVyLCBpdCBzaG91bGQgYmUgbGVzcyB0aGFuIHByb2dyZXNzU3RlcHMubGVuZ3RoICcgK1xuICAgICAgICAnKGN1cnJlbnRQcm9ncmVzc1N0ZXAgbGlrZSBKUyBhcnJheXMgc3RhcnRzIGZyb20gMCknXG4gICAgKVxuICB9XG5cbiAgcGFyYW1zLnByb2dyZXNzU3RlcHMuZm9yRWFjaCgoc3RlcCwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzdGVwRWwgPSBjcmVhdGVTdGVwRWxlbWVudChzdGVwKVxuICAgIHByb2dyZXNzU3RlcHNDb250YWluZXIuYXBwZW5kQ2hpbGQoc3RlcEVsKVxuICAgIGlmIChpbmRleCA9PT0gcGFyYW1zLmN1cnJlbnRQcm9ncmVzc1N0ZXApIHtcbiAgICAgIGRvbS5hZGRDbGFzcyhzdGVwRWwsIHN3YWxDbGFzc2VzWydhY3RpdmUtcHJvZ3Jlc3Mtc3RlcCddKVxuICAgIH1cblxuICAgIGlmIChpbmRleCAhPT0gcGFyYW1zLnByb2dyZXNzU3RlcHMubGVuZ3RoIC0gMSkge1xuICAgICAgY29uc3QgbGluZUVsID0gY3JlYXRlTGluZUVsZW1lbnQocGFyYW1zKVxuICAgICAgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChsaW5lRWwpXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlclRpdGxlID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgdGl0bGUgPSBkb20uZ2V0VGl0bGUoKVxuXG4gIGRvbS50b2dnbGUodGl0bGUsIHBhcmFtcy50aXRsZSB8fCBwYXJhbXMudGl0bGVUZXh0LCAnYmxvY2snKVxuXG4gIGlmIChwYXJhbXMudGl0bGUpIHtcbiAgICBkb20ucGFyc2VIdG1sVG9Db250YWluZXIocGFyYW1zLnRpdGxlLCB0aXRsZSlcbiAgfVxuXG4gIGlmIChwYXJhbXMudGl0bGVUZXh0KSB7XG4gICAgdGl0bGUuaW5uZXJUZXh0ID0gcGFyYW1zLnRpdGxlVGV4dFxuICB9XG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKHRpdGxlLCBwYXJhbXMsICd0aXRsZScpXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyUG9wdXAgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuXG4gIC8vIFdpZHRoXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjE3MFxuICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUoY29udGFpbmVyLCAnd2lkdGgnLCBwYXJhbXMud2lkdGgpXG4gICAgcG9wdXAuc3R5bGUud2lkdGggPSAnMTAwJSdcbiAgICBwb3B1cC5pbnNlcnRCZWZvcmUoZG9tLmdldExvYWRlcigpLCBkb20uZ2V0SWNvbigpKVxuICB9IGVsc2Uge1xuICAgIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKHBvcHVwLCAnd2lkdGgnLCBwYXJhbXMud2lkdGgpXG4gIH1cblxuICAvLyBQYWRkaW5nXG4gIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKHBvcHVwLCAncGFkZGluZycsIHBhcmFtcy5wYWRkaW5nKVxuXG4gIC8vIENvbG9yXG4gIGlmIChwYXJhbXMuY29sb3IpIHtcbiAgICBwb3B1cC5zdHlsZS5jb2xvciA9IHBhcmFtcy5jb2xvclxuICB9XG5cbiAgLy8gQmFja2dyb3VuZFxuICBpZiAocGFyYW1zLmJhY2tncm91bmQpIHtcbiAgICBwb3B1cC5zdHlsZS5iYWNrZ3JvdW5kID0gcGFyYW1zLmJhY2tncm91bmRcbiAgfVxuXG4gIGRvbS5oaWRlKGRvbS5nZXRWYWxpZGF0aW9uTWVzc2FnZSgpKVxuXG4gIC8vIENsYXNzZXNcbiAgYWRkQ2xhc3Nlcyhwb3B1cCwgcGFyYW1zKVxufVxuXG5jb25zdCBhZGRDbGFzc2VzID0gKHBvcHVwLCBwYXJhbXMpID0+IHtcbiAgLy8gRGVmYXVsdCBDbGFzcyArIHNob3dDbGFzcyB3aGVuIHVwZGF0aW5nIFN3YWwudXBkYXRlKHt9KVxuICBwb3B1cC5jbGFzc05hbWUgPSBgJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gJHtkb20uaXNWaXNpYmxlKHBvcHVwKSA/IHBhcmFtcy5zaG93Q2xhc3MucG9wdXAgOiAnJ31gXG5cbiAgaWYgKHBhcmFtcy50b2FzdCkge1xuICAgIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ10pXG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy50b2FzdClcbiAgfSBlbHNlIHtcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLm1vZGFsKVxuICB9XG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKHBvcHVwLCBwYXJhbXMsICdwb3B1cCcpXG4gIGlmICh0eXBlb2YgcGFyYW1zLmN1c3RvbUNsYXNzID09PSAnc3RyaW5nJykge1xuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgcGFyYW1zLmN1c3RvbUNsYXNzKVxuICB9XG5cbiAgLy8gSWNvbiBjbGFzcyAoIzE4NDIpXG4gIGlmIChwYXJhbXMuaWNvbikge1xuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXNbYGljb24tJHtwYXJhbXMuaWNvbn1gXSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgZ2V0UG9wdXAgfSBmcm9tICcuLi9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyQWN0aW9ucyB9IGZyb20gJy4vcmVuZGVyQWN0aW9ucy5qcydcbmltcG9ydCB7IHJlbmRlckNvbnRhaW5lciB9IGZyb20gJy4vcmVuZGVyQ29udGFpbmVyLmpzJ1xuaW1wb3J0IHsgcmVuZGVyQ29udGVudCB9IGZyb20gJy4vcmVuZGVyQ29udGVudC5qcydcbmltcG9ydCB7IHJlbmRlckZvb3RlciB9IGZyb20gJy4vcmVuZGVyRm9vdGVyLmpzJ1xuaW1wb3J0IHsgcmVuZGVyQ2xvc2VCdXR0b24gfSBmcm9tICcuL3JlbmRlckNsb3NlQnV0dG9uLmpzJ1xuaW1wb3J0IHsgcmVuZGVySWNvbiB9IGZyb20gJy4vcmVuZGVySWNvbi5qcydcbmltcG9ydCB7IHJlbmRlckltYWdlIH0gZnJvbSAnLi9yZW5kZXJJbWFnZS5qcydcbmltcG9ydCB7IHJlbmRlclByb2dyZXNzU3RlcHMgfSBmcm9tICcuL3JlbmRlclByb2dyZXNzU3RlcHMuanMnXG5pbXBvcnQgeyByZW5kZXJUaXRsZSB9IGZyb20gJy4vcmVuZGVyVGl0bGUuanMnXG5pbXBvcnQgeyByZW5kZXJQb3B1cCB9IGZyb20gJy4vcmVuZGVyUG9wdXAuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXIgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICByZW5kZXJQb3B1cChpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJDb250YWluZXIoaW5zdGFuY2UsIHBhcmFtcylcblxuICByZW5kZXJQcm9ncmVzc1N0ZXBzKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckljb24oaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVySW1hZ2UoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyVGl0bGUoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyQ2xvc2VCdXR0b24oaW5zdGFuY2UsIHBhcmFtcylcblxuICByZW5kZXJDb250ZW50KGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckFjdGlvbnMoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyRm9vdGVyKGluc3RhbmNlLCBwYXJhbXMpXG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMuZGlkUmVuZGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcGFyYW1zLmRpZFJlbmRlcihnZXRQb3B1cCgpKVxuICB9XG59XG4iLCJleHBvcnQgY29uc3QgRGlzbWlzc1JlYXNvbiA9IE9iamVjdC5mcmVlemUoe1xuICBjYW5jZWw6ICdjYW5jZWwnLFxuICBiYWNrZHJvcDogJ2JhY2tkcm9wJyxcbiAgY2xvc2U6ICdjbG9zZScsXG4gIGVzYzogJ2VzYycsXG4gIHRpbWVyOiAndGltZXInLFxufSlcbiIsImltcG9ydCB7IGdldENvbnRhaW5lciB9IGZyb20gJy4vZG9tL2dldHRlcnMuanMnXG5pbXBvcnQgeyB0b0FycmF5IH0gZnJvbSAnLi91dGlscy5qcydcblxuLy8gRnJvbSBodHRwczovL2RldmVsb3Blci5wYWNpZWxsb2dyb3VwLmNvbS9ibG9nLzIwMTgvMDYvdGhlLWN1cnJlbnQtc3RhdGUtb2YtbW9kYWwtZGlhbG9nLWFjY2Vzc2liaWxpdHkvXG4vLyBBZGRpbmcgYXJpYS1oaWRkZW49XCJ0cnVlXCIgdG8gZWxlbWVudHMgb3V0c2lkZSBvZiB0aGUgYWN0aXZlIG1vZGFsIGRpYWxvZyBlbnN1cmVzIHRoYXRcbi8vIGVsZW1lbnRzIG5vdCB3aXRoaW4gdGhlIGFjdGl2ZSBtb2RhbCBkaWFsb2cgd2lsbCBub3QgYmUgc3VyZmFjZWQgaWYgYSB1c2VyIG9wZW5zIGEgc2NyZWVuXG4vLyByZWFkZXLigJlzIGxpc3Qgb2YgZWxlbWVudHMgKGhlYWRpbmdzLCBmb3JtIGNvbnRyb2xzLCBsYW5kbWFya3MsIGV0Yy4pIGluIHRoZSBkb2N1bWVudC5cblxuZXhwb3J0IGNvbnN0IHNldEFyaWFIaWRkZW4gPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHlDaGlsZHJlbiA9IHRvQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbilcbiAgYm9keUNoaWxkcmVuLmZvckVhY2goKGVsKSA9PiB7XG4gICAgaWYgKGVsID09PSBnZXRDb250YWluZXIoKSB8fCBlbC5jb250YWlucyhnZXRDb250YWluZXIoKSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1wcmV2aW91cy1hcmlhLWhpZGRlbicsIGVsLmdldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSlcbiAgICB9XG4gICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJylcbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IHVuc2V0QXJpYUhpZGRlbiA9ICgpID0+IHtcbiAgY29uc3QgYm9keUNoaWxkcmVuID0gdG9BcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKVxuICBib2R5Q2hpbGRyZW4uZm9yRWFjaCgoZWwpID0+IHtcbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJykpIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcHJldmlvdXMtYXJpYS1oaWRkZW4nKSlcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1wcmV2aW91cy1hcmlhLWhpZGRlbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKVxuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCBkZWZhdWx0UGFyYW1zIGZyb20gJy4vcGFyYW1zLmpzJ1xuaW1wb3J0IHsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLCB0b0FycmF5LCB3YXJuIH0gZnJvbSAnLi91dGlscy5qcydcblxuY29uc3Qgc3dhbFN0cmluZ1BhcmFtcyA9IFsnc3dhbC10aXRsZScsICdzd2FsLWh0bWwnLCAnc3dhbC1mb290ZXInXVxuXG5leHBvcnQgY29uc3QgZ2V0VGVtcGxhdGVQYXJhbXMgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlID0gdHlwZW9mIHBhcmFtcy50ZW1wbGF0ZSA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtcy50ZW1wbGF0ZSkgOiBwYXJhbXMudGVtcGxhdGVcbiAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgIHJldHVybiB7fVxuICB9XG4gIC8qKiBAdHlwZSB7RG9jdW1lbnRGcmFnbWVudH0gKi9cbiAgY29uc3QgdGVtcGxhdGVDb250ZW50ID0gdGVtcGxhdGUuY29udGVudFxuXG4gIHNob3dXYXJuaW5nc0ZvckVsZW1lbnRzKHRlbXBsYXRlQ29udGVudClcblxuICBjb25zdCByZXN1bHQgPSBPYmplY3QuYXNzaWduKFxuICAgIGdldFN3YWxQYXJhbXModGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsQnV0dG9ucyh0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxJbWFnZSh0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxJY29uKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbElucHV0KHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbFN0cmluZ1BhcmFtcyh0ZW1wbGF0ZUNvbnRlbnQsIHN3YWxTdHJpbmdQYXJhbXMpXG4gIClcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxQYXJhbXMgPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHRvQXJyYXkodGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N3YWwtcGFyYW0nKSkuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKHBhcmFtLCBbJ25hbWUnLCAndmFsdWUnXSlcbiAgICBjb25zdCBwYXJhbU5hbWUgPSBwYXJhbS5nZXRBdHRyaWJ1dGUoJ25hbWUnKVxuICAgIGNvbnN0IHZhbHVlID0gcGFyYW0uZ2V0QXR0cmlidXRlKCd2YWx1ZScpXG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0UGFyYW1zW3BhcmFtTmFtZV0gPT09ICdib29sZWFuJyAmJiB2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgcmVzdWx0W3BhcmFtTmFtZV0gPSBmYWxzZVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGRlZmF1bHRQYXJhbXNbcGFyYW1OYW1lXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtwYXJhbU5hbWVdID0gSlNPTi5wYXJzZSh2YWx1ZSlcbiAgICB9XG4gIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBnZXRTd2FsQnV0dG9ucyA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgdG9BcnJheSh0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc3dhbC1idXR0b24nKSkuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhidXR0b24sIFsndHlwZScsICdjb2xvcicsICdhcmlhLWxhYmVsJ10pXG4gICAgY29uc3QgdHlwZSA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgIHJlc3VsdFtgJHt0eXBlfUJ1dHRvblRleHRgXSA9IGJ1dHRvbi5pbm5lckhUTUxcbiAgICByZXN1bHRbYHNob3cke2NhcGl0YWxpemVGaXJzdExldHRlcih0eXBlKX1CdXR0b25gXSA9IHRydWVcbiAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgnY29sb3InKSkge1xuICAgICAgcmVzdWx0W2Ake3R5cGV9QnV0dG9uQ29sb3JgXSA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2NvbG9yJylcbiAgICB9XG4gICAgaWYgKGJ1dHRvbi5oYXNBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKSkge1xuICAgICAgcmVzdWx0W2Ake3R5cGV9QnV0dG9uQXJpYUxhYmVsYF0gPSBidXR0b24uZ2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJylcbiAgICB9XG4gIH0pXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBnZXRTd2FsSW1hZ2UgPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG4gIGNvbnN0IGltYWdlID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3N3YWwtaW1hZ2UnKVxuICBpZiAoaW1hZ2UpIHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGltYWdlLCBbJ3NyYycsICd3aWR0aCcsICdoZWlnaHQnLCAnYWx0J10pXG4gICAgaWYgKGltYWdlLmhhc0F0dHJpYnV0ZSgnc3JjJykpIHtcbiAgICAgIHJlc3VsdC5pbWFnZVVybCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnc3JjJylcbiAgICB9XG4gICAgaWYgKGltYWdlLmhhc0F0dHJpYnV0ZSgnd2lkdGgnKSkge1xuICAgICAgcmVzdWx0LmltYWdlV2lkdGggPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ3dpZHRoJylcbiAgICB9XG4gICAgaWYgKGltYWdlLmhhc0F0dHJpYnV0ZSgnaGVpZ2h0JykpIHtcbiAgICAgIHJlc3VsdC5pbWFnZUhlaWdodCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnaGVpZ2h0JylcbiAgICB9XG4gICAgaWYgKGltYWdlLmhhc0F0dHJpYnV0ZSgnYWx0JykpIHtcbiAgICAgIHJlc3VsdC5pbWFnZUFsdCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnYWx0JylcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxJY29uID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICBjb25zdCBpY29uID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3N3YWwtaWNvbicpXG4gIGlmIChpY29uKSB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhpY29uLCBbJ3R5cGUnLCAnY29sb3InXSlcbiAgICBpZiAoaWNvbi5oYXNBdHRyaWJ1dGUoJ3R5cGUnKSkge1xuICAgICAgcmVzdWx0Lmljb24gPSBpY29uLmdldEF0dHJpYnV0ZSgndHlwZScpXG4gICAgfVxuICAgIGlmIChpY29uLmhhc0F0dHJpYnV0ZSgnY29sb3InKSkge1xuICAgICAgcmVzdWx0Lmljb25Db2xvciA9IGljb24uZ2V0QXR0cmlidXRlKCdjb2xvcicpXG4gICAgfVxuICAgIHJlc3VsdC5pY29uSHRtbCA9IGljb24uaW5uZXJIVE1MXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxJbnB1dCA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgY29uc3QgaW5wdXQgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3dhbC1pbnB1dCcpXG4gIGlmIChpbnB1dCkge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMoaW5wdXQsIFsndHlwZScsICdsYWJlbCcsICdwbGFjZWhvbGRlcicsICd2YWx1ZSddKVxuICAgIHJlc3VsdC5pbnB1dCA9IGlucHV0LmdldEF0dHJpYnV0ZSgndHlwZScpIHx8ICd0ZXh0J1xuICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ2xhYmVsJykpIHtcbiAgICAgIHJlc3VsdC5pbnB1dExhYmVsID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdsYWJlbCcpXG4gICAgfVxuICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJykpIHtcbiAgICAgIHJlc3VsdC5pbnB1dFBsYWNlaG9sZGVyID0gaW5wdXQuZ2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicpXG4gICAgfVxuICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ3ZhbHVlJykpIHtcbiAgICAgIHJlc3VsdC5pbnB1dFZhbHVlID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpXG4gICAgfVxuICB9XG4gIGNvbnN0IGlucHV0T3B0aW9ucyA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzd2FsLWlucHV0LW9wdGlvbicpXG4gIGlmIChpbnB1dE9wdGlvbnMubGVuZ3RoKSB7XG4gICAgcmVzdWx0LmlucHV0T3B0aW9ucyA9IHt9XG4gICAgdG9BcnJheShpbnB1dE9wdGlvbnMpLmZvckVhY2goKG9wdGlvbikgPT4ge1xuICAgICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhvcHRpb24sIFsndmFsdWUnXSlcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gb3B0aW9uLmdldEF0dHJpYnV0ZSgndmFsdWUnKVxuICAgICAgY29uc3Qgb3B0aW9uTmFtZSA9IG9wdGlvbi5pbm5lckhUTUxcbiAgICAgIHJlc3VsdC5pbnB1dE9wdGlvbnNbb3B0aW9uVmFsdWVdID0gb3B0aW9uTmFtZVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBwYXJhbU5hbWVzXG4gKi9cbmNvbnN0IGdldFN3YWxTdHJpbmdQYXJhbXMgPSAodGVtcGxhdGVDb250ZW50LCBwYXJhbU5hbWVzKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGZvciAoY29uc3QgaSBpbiBwYXJhbU5hbWVzKSB7XG4gICAgY29uc3QgcGFyYW1OYW1lID0gcGFyYW1OYW1lc1tpXVxuICAgIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG4gICAgY29uc3QgdGFnID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1OYW1lKVxuICAgIGlmICh0YWcpIHtcbiAgICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXModGFnLCBbXSlcbiAgICAgIHJlc3VsdFtwYXJhbU5hbWUucmVwbGFjZSgvXnN3YWwtLywgJycpXSA9IHRhZy5pbm5lckhUTUwudHJpbSgpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBzaG93V2FybmluZ3NGb3JFbGVtZW50cyA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgYWxsb3dlZEVsZW1lbnRzID0gc3dhbFN0cmluZ1BhcmFtcy5jb25jYXQoW1xuICAgICdzd2FsLXBhcmFtJyxcbiAgICAnc3dhbC1idXR0b24nLFxuICAgICdzd2FsLWltYWdlJyxcbiAgICAnc3dhbC1pY29uJyxcbiAgICAnc3dhbC1pbnB1dCcsXG4gICAgJ3N3YWwtaW5wdXQtb3B0aW9uJyxcbiAgXSlcbiAgdG9BcnJheSh0ZW1wbGF0ZUNvbnRlbnQuY2hpbGRyZW4pLmZvckVhY2goKGVsKSA9PiB7XG4gICAgY29uc3QgdGFnTmFtZSA9IGVsLnRhZ05hbWUudG9Mb3dlckNhc2UoKVxuICAgIGlmIChhbGxvd2VkRWxlbWVudHMuaW5kZXhPZih0YWdOYW1lKSA9PT0gLTEpIHtcbiAgICAgIHdhcm4oYFVucmVjb2duaXplZCBlbGVtZW50IDwke3RhZ05hbWV9PmApXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBhbGxvd2VkQXR0cmlidXRlc1xuICovXG5jb25zdCBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzID0gKGVsLCBhbGxvd2VkQXR0cmlidXRlcykgPT4ge1xuICB0b0FycmF5KGVsLmF0dHJpYnV0ZXMpLmZvckVhY2goKGF0dHJpYnV0ZSkgPT4ge1xuICAgIGlmIChhbGxvd2VkQXR0cmlidXRlcy5pbmRleE9mKGF0dHJpYnV0ZS5uYW1lKSA9PT0gLTEpIHtcbiAgICAgIHdhcm4oW1xuICAgICAgICBgVW5yZWNvZ25pemVkIGF0dHJpYnV0ZSBcIiR7YXR0cmlidXRlLm5hbWV9XCIgb24gPCR7ZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpfT4uYCxcbiAgICAgICAgYCR7XG4gICAgICAgICAgYWxsb3dlZEF0dHJpYnV0ZXMubGVuZ3RoXG4gICAgICAgICAgICA/IGBBbGxvd2VkIGF0dHJpYnV0ZXMgYXJlOiAke2FsbG93ZWRBdHRyaWJ1dGVzLmpvaW4oJywgJyl9YFxuICAgICAgICAgICAgOiAnVG8gc2V0IHRoZSB2YWx1ZSwgdXNlIEhUTUwgd2l0aGluIHRoZSBlbGVtZW50LidcbiAgICAgICAgfWAsXG4gICAgICBdKVxuICAgIH1cbiAgfSlcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcbiAgZW1haWw6IChzdHJpbmcsIHZhbGlkYXRpb25NZXNzYWdlKSA9PiB7XG4gICAgcmV0dXJuIC9eW2EtekEtWjAtOS4rXy1dK0BbYS16QS1aMC05Li1dK1xcLlthLXpBLVowLTktXXsyLDI0fSQvLnRlc3Qoc3RyaW5nKVxuICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgOiBQcm9taXNlLnJlc29sdmUodmFsaWRhdGlvbk1lc3NhZ2UgfHwgJ0ludmFsaWQgZW1haWwgYWRkcmVzcycpXG4gIH0sXG4gIHVybDogKHN0cmluZywgdmFsaWRhdGlvbk1lc3NhZ2UpID0+IHtcbiAgICAvLyB0YWtlbiBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8zODA5NDM1IHdpdGggYSBzbWFsbCBjaGFuZ2UgZnJvbSAjMTMwNiBhbmQgIzIwMTNcbiAgICByZXR1cm4gL15odHRwcz86XFwvXFwvKHd3d1xcLik/Wy1hLXpBLVowLTlAOiUuXyt+Iz1dezEsMjU2fVxcLlthLXpdezIsNjN9XFxiKFstYS16QS1aMC05QDolXysufiM/Ji89XSopJC8udGVzdChzdHJpbmcpXG4gICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWxpZGF0aW9uTWVzc2FnZSB8fCAnSW52YWxpZCBVUkwnKVxuICB9LFxufVxuIiwiaW1wb3J0IHsgd2FybiB9IGZyb20gJy4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5pbXBvcnQgZGVmYXVsdElucHV0VmFsaWRhdG9ycyBmcm9tICcuL2RlZmF1bHRJbnB1dFZhbGlkYXRvcnMuanMnXG5cbmZ1bmN0aW9uIHNldERlZmF1bHRJbnB1dFZhbGlkYXRvcnMocGFyYW1zKSB7XG4gIC8vIFVzZSBkZWZhdWx0IGBpbnB1dFZhbGlkYXRvcmAgZm9yIHN1cHBvcnRlZCBpbnB1dCB0eXBlcyBpZiBub3QgcHJvdmlkZWRcbiAgaWYgKCFwYXJhbXMuaW5wdXRWYWxpZGF0b3IpIHtcbiAgICBPYmplY3Qua2V5cyhkZWZhdWx0SW5wdXRWYWxpZGF0b3JzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGlmIChwYXJhbXMuaW5wdXQgPT09IGtleSkge1xuICAgICAgICBwYXJhbXMuaW5wdXRWYWxpZGF0b3IgPSBkZWZhdWx0SW5wdXRWYWxpZGF0b3JzW2tleV1cbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIHZhbGlkYXRlQ3VzdG9tVGFyZ2V0RWxlbWVudChwYXJhbXMpIHtcbiAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBjdXN0b20gdGFyZ2V0IGVsZW1lbnQgaXMgdmFsaWRcbiAgaWYgKFxuICAgICFwYXJhbXMudGFyZ2V0IHx8XG4gICAgKHR5cGVvZiBwYXJhbXMudGFyZ2V0ID09PSAnc3RyaW5nJyAmJiAhZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJhbXMudGFyZ2V0KSkgfHxcbiAgICAodHlwZW9mIHBhcmFtcy50YXJnZXQgIT09ICdzdHJpbmcnICYmICFwYXJhbXMudGFyZ2V0LmFwcGVuZENoaWxkKVxuICApIHtcbiAgICB3YXJuKCdUYXJnZXQgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCwgZGVmYXVsdGluZyB0byBcImJvZHlcIicpXG4gICAgcGFyYW1zLnRhcmdldCA9ICdib2R5J1xuICB9XG59XG5cbi8qKlxuICogU2V0IHR5cGUsIHRleHQgYW5kIGFjdGlvbnMgb24gcG9wdXBcbiAqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNldFBhcmFtZXRlcnMocGFyYW1zKSB7XG4gIHNldERlZmF1bHRJbnB1dFZhbGlkYXRvcnMocGFyYW1zKVxuXG4gIC8vIHNob3dMb2FkZXJPbkNvbmZpcm0gJiYgcHJlQ29uZmlybVxuICBpZiAocGFyYW1zLnNob3dMb2FkZXJPbkNvbmZpcm0gJiYgIXBhcmFtcy5wcmVDb25maXJtKSB7XG4gICAgd2FybihcbiAgICAgICdzaG93TG9hZGVyT25Db25maXJtIGlzIHNldCB0byB0cnVlLCBidXQgcHJlQ29uZmlybSBpcyBub3QgZGVmaW5lZC5cXG4nICtcbiAgICAgICAgJ3Nob3dMb2FkZXJPbkNvbmZpcm0gc2hvdWxkIGJlIHVzZWQgdG9nZXRoZXIgd2l0aCBwcmVDb25maXJtLCBzZWUgdXNhZ2UgZXhhbXBsZTpcXG4nICtcbiAgICAgICAgJ2h0dHBzOi8vc3dlZXRhbGVydDIuZ2l0aHViLmlvLyNhamF4LXJlcXVlc3QnXG4gICAgKVxuICB9XG5cbiAgdmFsaWRhdGVDdXN0b21UYXJnZXRFbGVtZW50KHBhcmFtcylcblxuICAvLyBSZXBsYWNlIG5ld2xpbmVzIHdpdGggPGJyPiBpbiB0aXRsZVxuICBpZiAodHlwZW9mIHBhcmFtcy50aXRsZSA9PT0gJ3N0cmluZycpIHtcbiAgICBwYXJhbXMudGl0bGUgPSBwYXJhbXMudGl0bGUuc3BsaXQoJ1xcbicpLmpvaW4oJzxiciAvPicpXG4gIH1cblxuICBkb20uaW5pdChwYXJhbXMpXG59XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBUaW1lciB7XG4gIGNvbnN0cnVjdG9yKGNhbGxiYWNrLCBkZWxheSkge1xuICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFja1xuICAgIHRoaXMucmVtYWluaW5nID0gZGVsYXlcbiAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZVxuXG4gICAgdGhpcy5zdGFydCgpXG4gIH1cblxuICBzdGFydCgpIHtcbiAgICBpZiAoIXRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5ydW5uaW5nID0gdHJ1ZVxuICAgICAgdGhpcy5zdGFydGVkID0gbmV3IERhdGUoKVxuICAgICAgdGhpcy5pZCA9IHNldFRpbWVvdXQodGhpcy5jYWxsYmFjaywgdGhpcy5yZW1haW5pbmcpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSBmYWxzZVxuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuaWQpXG4gICAgICB0aGlzLnJlbWFpbmluZyAtPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMuc3RhcnRlZC5nZXRUaW1lKClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBpbmNyZWFzZShuKSB7XG4gICAgY29uc3QgcnVubmluZyA9IHRoaXMucnVubmluZ1xuICAgIGlmIChydW5uaW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKVxuICAgIH1cbiAgICB0aGlzLnJlbWFpbmluZyArPSBuXG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RhcnQoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdcbiAgfVxuXG4gIGdldFRpbWVyTGVmdCgpIHtcbiAgICBpZiAodGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnN0b3AoKVxuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1xuICB9XG5cbiAgaXNSdW5uaW5nKCkge1xuICAgIHJldHVybiB0aGlzLnJ1bm5pbmdcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgZml4U2Nyb2xsYmFyID0gKCkgPT4ge1xuICAvLyBmb3IgcXVldWVzLCBkbyBub3QgZG8gdGhpcyBtb3JlIHRoYW4gb25jZVxuICBpZiAoZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nICE9PSBudWxsKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgLy8gaWYgdGhlIGJvZHkgaGFzIG92ZXJmbG93XG4gIGlmIChkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgIC8vIGFkZCBwYWRkaW5nIHNvIHRoZSBjb250ZW50IGRvZXNuJ3Qgc2hpZnQgYWZ0ZXIgcmVtb3ZhbCBvZiBzY3JvbGxiYXJcbiAgICBkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KS5nZXRQcm9wZXJ0eVZhbHVlKCdwYWRkaW5nLXJpZ2h0JykpXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgKyBkb20ubWVhc3VyZVNjcm9sbGJhcigpfXB4YFxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB1bmRvU2Nyb2xsYmFyID0gKCkgPT4ge1xuICBpZiAoZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nICE9PSBudWxsKSB7XG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHtkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmd9cHhgXG4gICAgZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nID0gbnVsbFxuICB9XG59XG4iLCIvKiBpc3RhbmJ1bCBpZ25vcmUgZmlsZSAqL1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi91dGlscy9jbGFzc2VzLmpzJ1xuXG4vLyBGaXggaU9TIHNjcm9sbGluZyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcS8zOTYyNjMwMlxuXG5leHBvcnQgY29uc3QgaU9TZml4ID0gKCkgPT4ge1xuICBjb25zdCBpT1MgPVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICAoL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvdy5NU1N0cmVhbSkgfHxcbiAgICAobmF2aWdhdG9yLnBsYXRmb3JtID09PSAnTWFjSW50ZWwnICYmIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDEpXG4gIGlmIChpT1MgJiYgIWRvbS5oYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxUb3BcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9IGAke29mZnNldCAqIC0xfXB4YFxuICAgIGRvbS5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpXG4gICAgbG9ja0JvZHlTY3JvbGwoKVxuICAgIGFkZEJvdHRvbVBhZGRpbmdGb3JUYWxsUG9wdXBzKClcbiAgfVxufVxuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTk0OFxuICovXG5jb25zdCBhZGRCb3R0b21QYWRkaW5nRm9yVGFsbFBvcHVwcyA9ICgpID0+IHtcbiAgY29uc3QgdWEgPSBuYXZpZ2F0b3IudXNlckFnZW50XG4gIGNvbnN0IGlPUyA9ICEhdWEubWF0Y2goL2lQYWQvaSkgfHwgISF1YS5tYXRjaCgvaVBob25lL2kpXG4gIGNvbnN0IHdlYmtpdCA9ICEhdWEubWF0Y2goL1dlYktpdC9pKVxuICBjb25zdCBpT1NTYWZhcmkgPSBpT1MgJiYgd2Via2l0ICYmICF1YS5tYXRjaCgvQ3JpT1MvaSlcbiAgaWYgKGlPU1NhZmFyaSkge1xuICAgIGNvbnN0IGJvdHRvbVBhbmVsSGVpZ2h0ID0gNDRcbiAgICBpZiAoZG9tLmdldFBvcHVwKCkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0IC0gYm90dG9tUGFuZWxIZWlnaHQpIHtcbiAgICAgIGRvbS5nZXRDb250YWluZXIoKS5zdHlsZS5wYWRkaW5nQm90dG9tID0gYCR7Ym90dG9tUGFuZWxIZWlnaHR9cHhgXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xMjQ2XG4gKi9cbmNvbnN0IGxvY2tCb2R5U2Nyb2xsID0gKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgbGV0IHByZXZlbnRUb3VjaE1vdmVcbiAgY29udGFpbmVyLm9udG91Y2hzdGFydCA9IChlKSA9PiB7XG4gICAgcHJldmVudFRvdWNoTW92ZSA9IHNob3VsZFByZXZlbnRUb3VjaE1vdmUoZSlcbiAgfVxuICBjb250YWluZXIub250b3VjaG1vdmUgPSAoZSkgPT4ge1xuICAgIGlmIChwcmV2ZW50VG91Y2hNb3ZlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICB9XG4gIH1cbn1cblxuY29uc3Qgc2hvdWxkUHJldmVudFRvdWNoTW92ZSA9IChldmVudCkgPT4ge1xuICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXRcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGlmIChpc1N0eWx1cyhldmVudCkgfHwgaXNab29tKGV2ZW50KSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmICh0YXJnZXQgPT09IGNvbnRhaW5lcikge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgaWYgKFxuICAgICFkb20uaXNTY3JvbGxhYmxlKGNvbnRhaW5lcikgJiZcbiAgICB0YXJnZXQudGFnTmFtZSAhPT0gJ0lOUFVUJyAmJiAvLyAjMTYwM1xuICAgIHRhcmdldC50YWdOYW1lICE9PSAnVEVYVEFSRUEnICYmIC8vICMyMjY2XG4gICAgIShcbiAgICAgIGRvbS5pc1Njcm9sbGFibGUoZG9tLmdldEh0bWxDb250YWluZXIoKSkgJiYgLy8gIzE5NDRcbiAgICAgIGRvbS5nZXRIdG1sQ29udGFpbmVyKCkuY29udGFpbnModGFyZ2V0KVxuICAgIClcbiAgKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICByZXR1cm4gZmFsc2Vcbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE3ODZcbiAqXG4gKiBAcGFyYW0geyp9IGV2ZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNTdHlsdXMgPSAoZXZlbnQpID0+IHtcbiAgcmV0dXJuIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggJiYgZXZlbnQudG91Y2hlc1swXS50b3VjaFR5cGUgPT09ICdzdHlsdXMnXG59XG5cbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xODkxXG4gKlxuICogQHBhcmFtIHtUb3VjaEV2ZW50fSBldmVudFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzWm9vbSA9IChldmVudCkgPT4ge1xuICByZXR1cm4gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCA+IDFcbn1cblxuZXhwb3J0IGNvbnN0IHVuZG9JT1NmaXggPSAoKSA9PiB7XG4gIGlmIChkb20uaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KSkge1xuICAgIGNvbnN0IG9mZnNldCA9IHBhcnNlSW50KGRvY3VtZW50LmJvZHkuc3R5bGUudG9wLCAxMClcbiAgICBkb20ucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KVxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gJydcbiAgICBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IG9mZnNldCAqIC0xXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZml4U2Nyb2xsYmFyIH0gZnJvbSAnLi9zY3JvbGxiYXJGaXguanMnXG5pbXBvcnQgeyBpT1NmaXggfSBmcm9tICcuL2lvc0ZpeC5qcydcbmltcG9ydCB7IHNldEFyaWFIaWRkZW4gfSBmcm9tICcuL2FyaWEuanMnXG5pbXBvcnQgZ2xvYmFsU3RhdGUgZnJvbSAnLi4vZ2xvYmFsU3RhdGUuanMnXG5cbmV4cG9ydCBjb25zdCBTSE9XX0NMQVNTX1RJTUVPVVQgPSAxMFxuXG4vKipcbiAqIE9wZW4gcG9wdXAsIGFkZCBuZWNlc3NhcnkgY2xhc3NlcyBhbmQgc3R5bGVzLCBmaXggc2Nyb2xsYmFyXG4gKlxuICogQHBhcmFtIHBhcmFtc1xuICovXG5leHBvcnQgY29uc3Qgb3BlblBvcHVwID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuXG4gIGlmICh0eXBlb2YgcGFyYW1zLndpbGxPcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcGFyYW1zLndpbGxPcGVuKHBvcHVwKVxuICB9XG5cbiAgY29uc3QgYm9keVN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpXG4gIGNvbnN0IGluaXRpYWxCb2R5T3ZlcmZsb3cgPSBib2R5U3R5bGVzLm92ZXJmbG93WVxuICBhZGRDbGFzc2VzKGNvbnRhaW5lciwgcG9wdXAsIHBhcmFtcylcblxuICAvLyBzY3JvbGxpbmcgaXMgJ2hpZGRlbicgdW50aWwgYW5pbWF0aW9uIGlzIGRvbmUsIGFmdGVyIHRoYXQgJ2F1dG8nXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHNldFNjcm9sbGluZ1Zpc2liaWxpdHkoY29udGFpbmVyLCBwb3B1cClcbiAgfSwgU0hPV19DTEFTU19USU1FT1VUKVxuXG4gIGlmIChkb20uaXNNb2RhbCgpKSB7XG4gICAgZml4U2Nyb2xsQ29udGFpbmVyKGNvbnRhaW5lciwgcGFyYW1zLnNjcm9sbGJhclBhZGRpbmcsIGluaXRpYWxCb2R5T3ZlcmZsb3cpXG4gICAgc2V0QXJpYUhpZGRlbigpXG4gIH1cblxuICBpZiAoIWRvbS5pc1RvYXN0KCkgJiYgIWdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudCkge1xuICAgIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgfVxuXG4gIGlmICh0eXBlb2YgcGFyYW1zLmRpZE9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHBhcmFtcy5kaWRPcGVuKHBvcHVwKSlcbiAgfVxuXG4gIGRvbS5yZW1vdmVDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzWyduby10cmFuc2l0aW9uJ10pXG59XG5cbmNvbnN0IHN3YWxPcGVuQW5pbWF0aW9uRmluaXNoZWQgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBwb3B1cCkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBwb3B1cC5yZW1vdmVFdmVudExpc3RlbmVyKGRvbS5hbmltYXRpb25FbmRFdmVudCwgc3dhbE9wZW5BbmltYXRpb25GaW5pc2hlZClcbiAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJ1xufVxuXG5jb25zdCBzZXRTY3JvbGxpbmdWaXNpYmlsaXR5ID0gKGNvbnRhaW5lciwgcG9wdXApID0+IHtcbiAgaWYgKGRvbS5hbmltYXRpb25FbmRFdmVudCAmJiBkb20uaGFzQ3NzQW5pbWF0aW9uKHBvcHVwKSkge1xuICAgIGNvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSAnaGlkZGVuJ1xuICAgIHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoZG9tLmFuaW1hdGlvbkVuZEV2ZW50LCBzd2FsT3BlbkFuaW1hdGlvbkZpbmlzaGVkKVxuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSAnYXV0bydcbiAgfVxufVxuXG5jb25zdCBmaXhTY3JvbGxDb250YWluZXIgPSAoY29udGFpbmVyLCBzY3JvbGxiYXJQYWRkaW5nLCBpbml0aWFsQm9keU92ZXJmbG93KSA9PiB7XG4gIGlPU2ZpeCgpXG5cbiAgaWYgKHNjcm9sbGJhclBhZGRpbmcgJiYgaW5pdGlhbEJvZHlPdmVyZmxvdyAhPT0gJ2hpZGRlbicpIHtcbiAgICBmaXhTY3JvbGxiYXIoKVxuICB9XG5cbiAgLy8gc3dlZXRhbGVydDIvaXNzdWVzLzEyNDdcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgY29udGFpbmVyLnNjcm9sbFRvcCA9IDBcbiAgfSlcbn1cblxuY29uc3QgYWRkQ2xhc3NlcyA9IChjb250YWluZXIsIHBvcHVwLCBwYXJhbXMpID0+IHtcbiAgZG9tLmFkZENsYXNzKGNvbnRhaW5lciwgcGFyYW1zLnNob3dDbGFzcy5iYWNrZHJvcClcbiAgLy8gdGhpcyB3b3JrYXJvdW5kIHdpdGggb3BhY2l0eSBpcyBuZWVkZWQgZm9yIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjA1OVxuICBwb3B1cC5zdHlsZS5zZXRQcm9wZXJ0eSgnb3BhY2l0eScsICcwJywgJ2ltcG9ydGFudCcpXG4gIGRvbS5zaG93KHBvcHVwLCAnZ3JpZCcpXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vIEFuaW1hdGUgcG9wdXAgcmlnaHQgYWZ0ZXIgc2hvd2luZyBpdFxuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgcGFyYW1zLnNob3dDbGFzcy5wb3B1cClcbiAgICAvLyBhbmQgcmVtb3ZlIHRoZSBvcGFjaXR5IHdvcmthcm91bmRcbiAgICBwb3B1cC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnb3BhY2l0eScpXG4gIH0sIFNIT1dfQ0xBU1NfVElNRU9VVCkgLy8gMTBtcyBpbiBvcmRlciB0byBmaXggIzIwNjJcblxuICBkb20uYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzLnNob3duKVxuICBpZiAocGFyYW1zLmhlaWdodEF1dG8gJiYgcGFyYW1zLmJhY2tkcm9wICYmICFwYXJhbXMudG9hc3QpIHtcbiAgICBkb20uYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzWydoZWlnaHQtYXV0byddKVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IFN3YWwgZnJvbSAnLi4vc3dlZXRhbGVydDIuanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5cbi8qKlxuICogU2hvd3MgbG9hZGVyIChzcGlubmVyKSwgdGhpcyBpcyB1c2VmdWwgd2l0aCBBSkFYIHJlcXVlc3RzLlxuICogQnkgZGVmYXVsdCB0aGUgbG9hZGVyIGJlIHNob3duIGluc3RlYWQgb2YgdGhlIFwiQ29uZmlybVwiIGJ1dHRvbi5cbiAqL1xuY29uc3Qgc2hvd0xvYWRpbmcgPSAoYnV0dG9uVG9SZXBsYWNlKSA9PiB7XG4gIGxldCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGlmICghcG9wdXApIHtcbiAgICBuZXcgU3dhbCgpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tbmV3XG4gIH1cbiAgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBsb2FkZXIgPSBkb20uZ2V0TG9hZGVyKClcblxuICBpZiAoZG9tLmlzVG9hc3QoKSkge1xuICAgIGRvbS5oaWRlKGRvbS5nZXRJY29uKCkpXG4gIH0gZWxzZSB7XG4gICAgcmVwbGFjZUJ1dHRvbihwb3B1cCwgYnV0dG9uVG9SZXBsYWNlKVxuICB9XG4gIGRvbS5zaG93KGxvYWRlcilcblxuICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ2RhdGEtbG9hZGluZycsIHRydWUpXG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgnYXJpYS1idXN5JywgdHJ1ZSlcbiAgcG9wdXAuZm9jdXMoKVxufVxuXG5jb25zdCByZXBsYWNlQnV0dG9uID0gKHBvcHVwLCBidXR0b25Ub1JlcGxhY2UpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IGRvbS5nZXRBY3Rpb25zKClcbiAgY29uc3QgbG9hZGVyID0gZG9tLmdldExvYWRlcigpXG5cbiAgaWYgKCFidXR0b25Ub1JlcGxhY2UgJiYgZG9tLmlzVmlzaWJsZShkb20uZ2V0Q29uZmlybUJ1dHRvbigpKSkge1xuICAgIGJ1dHRvblRvUmVwbGFjZSA9IGRvbS5nZXRDb25maXJtQnV0dG9uKClcbiAgfVxuXG4gIGRvbS5zaG93KGFjdGlvbnMpXG4gIGlmIChidXR0b25Ub1JlcGxhY2UpIHtcbiAgICBkb20uaGlkZShidXR0b25Ub1JlcGxhY2UpXG4gICAgbG9hZGVyLnNldEF0dHJpYnV0ZSgnZGF0YS1idXR0b24tdG8tcmVwbGFjZScsIGJ1dHRvblRvUmVwbGFjZS5jbGFzc05hbWUpXG4gIH1cbiAgbG9hZGVyLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxvYWRlciwgYnV0dG9uVG9SZXBsYWNlKVxuICBkb20uYWRkQ2xhc3MoW3BvcHVwLCBhY3Rpb25zXSwgc3dhbENsYXNzZXMubG9hZGluZylcbn1cblxuZXhwb3J0IHsgc2hvd0xvYWRpbmcsIHNob3dMb2FkaW5nIGFzIGVuYWJsZUxvYWRpbmcgfVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MgfSBmcm9tICcuL2RvbVV0aWxzLmpzJ1xuaW1wb3J0IHsgYXNQcm9taXNlLCBlcnJvciwgaGFzVG9Qcm9taXNlRm4sIGlzUHJvbWlzZSB9IGZyb20gJy4uL3V0aWxzLmpzJ1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuLi8uLi9zdGF0aWNNZXRob2RzL3Nob3dMb2FkaW5nLmpzJ1xuXG5leHBvcnQgY29uc3QgaGFuZGxlSW5wdXRPcHRpb25zQW5kVmFsdWUgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBpZiAocGFyYW1zLmlucHV0ID09PSAnc2VsZWN0JyB8fCBwYXJhbXMuaW5wdXQgPT09ICdyYWRpbycpIHtcbiAgICBoYW5kbGVJbnB1dE9wdGlvbnMoaW5zdGFuY2UsIHBhcmFtcylcbiAgfSBlbHNlIGlmIChcbiAgICBbJ3RleHQnLCAnZW1haWwnLCAnbnVtYmVyJywgJ3RlbCcsICd0ZXh0YXJlYSddLmluY2x1ZGVzKHBhcmFtcy5pbnB1dCkgJiZcbiAgICAoaGFzVG9Qcm9taXNlRm4ocGFyYW1zLmlucHV0VmFsdWUpIHx8IGlzUHJvbWlzZShwYXJhbXMuaW5wdXRWYWx1ZSkpXG4gICkge1xuICAgIHNob3dMb2FkaW5nKGRvbS5nZXRDb25maXJtQnV0dG9uKCkpXG4gICAgaGFuZGxlSW5wdXRWYWx1ZShpbnN0YW5jZSwgcGFyYW1zKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRJbnB1dFZhbHVlID0gKGluc3RhbmNlLCBpbm5lclBhcmFtcykgPT4ge1xuICBjb25zdCBpbnB1dCA9IGluc3RhbmNlLmdldElucHV0KClcbiAgaWYgKCFpbnB1dCkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgc3dpdGNoIChpbm5lclBhcmFtcy5pbnB1dCkge1xuICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgIHJldHVybiBnZXRDaGVja2JveFZhbHVlKGlucHV0KVxuICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgIHJldHVybiBnZXRSYWRpb1ZhbHVlKGlucHV0KVxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgcmV0dXJuIGdldEZpbGVWYWx1ZShpbnB1dClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGlubmVyUGFyYW1zLmlucHV0QXV0b1RyaW0gPyBpbnB1dC52YWx1ZS50cmltKCkgOiBpbnB1dC52YWx1ZVxuICB9XG59XG5cbmNvbnN0IGdldENoZWNrYm94VmFsdWUgPSAoaW5wdXQpID0+IChpbnB1dC5jaGVja2VkID8gMSA6IDApXG5cbmNvbnN0IGdldFJhZGlvVmFsdWUgPSAoaW5wdXQpID0+IChpbnB1dC5jaGVja2VkID8gaW5wdXQudmFsdWUgOiBudWxsKVxuXG5jb25zdCBnZXRGaWxlVmFsdWUgPSAoaW5wdXQpID0+XG4gIGlucHV0LmZpbGVzLmxlbmd0aCA/IChpbnB1dC5nZXRBdHRyaWJ1dGUoJ211bHRpcGxlJykgIT09IG51bGwgPyBpbnB1dC5maWxlcyA6IGlucHV0LmZpbGVzWzBdKSA6IG51bGxcblxuY29uc3QgaGFuZGxlSW5wdXRPcHRpb25zID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBwcm9jZXNzSW5wdXRPcHRpb25zID0gKGlucHV0T3B0aW9ucykgPT5cbiAgICBwb3B1bGF0ZUlucHV0T3B0aW9uc1twYXJhbXMuaW5wdXRdKHBvcHVwLCBmb3JtYXRJbnB1dE9wdGlvbnMoaW5wdXRPcHRpb25zKSwgcGFyYW1zKVxuICBpZiAoaGFzVG9Qcm9taXNlRm4ocGFyYW1zLmlucHV0T3B0aW9ucykgfHwgaXNQcm9taXNlKHBhcmFtcy5pbnB1dE9wdGlvbnMpKSB7XG4gICAgc2hvd0xvYWRpbmcoZG9tLmdldENvbmZpcm1CdXR0b24oKSlcbiAgICBhc1Byb21pc2UocGFyYW1zLmlucHV0T3B0aW9ucykudGhlbigoaW5wdXRPcHRpb25zKSA9PiB7XG4gICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgICBwcm9jZXNzSW5wdXRPcHRpb25zKGlucHV0T3B0aW9ucylcbiAgICB9KVxuICB9IGVsc2UgaWYgKHR5cGVvZiBwYXJhbXMuaW5wdXRPcHRpb25zID09PSAnb2JqZWN0Jykge1xuICAgIHByb2Nlc3NJbnB1dE9wdGlvbnMocGFyYW1zLmlucHV0T3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBlcnJvcihgVW5leHBlY3RlZCB0eXBlIG9mIGlucHV0T3B0aW9ucyEgRXhwZWN0ZWQgb2JqZWN0LCBNYXAgb3IgUHJvbWlzZSwgZ290ICR7dHlwZW9mIHBhcmFtcy5pbnB1dE9wdGlvbnN9YClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVJbnB1dFZhbHVlID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBpbnN0YW5jZS5nZXRJbnB1dCgpXG4gIGRvbS5oaWRlKGlucHV0KVxuICBhc1Byb21pc2UocGFyYW1zLmlucHV0VmFsdWUpXG4gICAgLnRoZW4oKGlucHV0VmFsdWUpID0+IHtcbiAgICAgIGlucHV0LnZhbHVlID0gcGFyYW1zLmlucHV0ID09PSAnbnVtYmVyJyA/IHBhcnNlRmxvYXQoaW5wdXRWYWx1ZSkgfHwgMCA6IGAke2lucHV0VmFsdWV9YFxuICAgICAgZG9tLnNob3coaW5wdXQpXG4gICAgICBpbnB1dC5mb2N1cygpXG4gICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgfSlcbiAgICAuY2F0Y2goKGVycikgPT4ge1xuICAgICAgZXJyb3IoYEVycm9yIGluIGlucHV0VmFsdWUgcHJvbWlzZTogJHtlcnJ9YClcbiAgICAgIGlucHV0LnZhbHVlID0gJydcbiAgICAgIGRvbS5zaG93KGlucHV0KVxuICAgICAgaW5wdXQuZm9jdXMoKVxuICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgIH0pXG59XG5cbmNvbnN0IHBvcHVsYXRlSW5wdXRPcHRpb25zID0ge1xuICBzZWxlY3Q6IChwb3B1cCwgaW5wdXRPcHRpb25zLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCBzZWxlY3QgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnNlbGVjdClcbiAgICBjb25zdCByZW5kZXJPcHRpb24gPSAocGFyZW50LCBvcHRpb25MYWJlbCwgb3B0aW9uVmFsdWUpID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICBvcHRpb24udmFsdWUgPSBvcHRpb25WYWx1ZVxuICAgICAgZG9tLnNldElubmVySHRtbChvcHRpb24sIG9wdGlvbkxhYmVsKVxuICAgICAgb3B0aW9uLnNlbGVjdGVkID0gaXNTZWxlY3RlZChvcHRpb25WYWx1ZSwgcGFyYW1zLmlucHV0VmFsdWUpXG4gICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgIH1cbiAgICBpbnB1dE9wdGlvbnMuZm9yRWFjaCgoaW5wdXRPcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IG9wdGlvblZhbHVlID0gaW5wdXRPcHRpb25bMF1cbiAgICAgIGNvbnN0IG9wdGlvbkxhYmVsID0gaW5wdXRPcHRpb25bMV1cbiAgICAgIC8vIDxvcHRncm91cD4gc3BlYzpcbiAgICAgIC8vIGh0dHBzOi8vd3d3LnczLm9yZy9UUi9odG1sNDAxL2ludGVyYWN0L2Zvcm1zLmh0bWwjaC0xNy42XG4gICAgICAvLyBcIi4uLmFsbCBPUFRHUk9VUCBlbGVtZW50cyBtdXN0IGJlIHNwZWNpZmllZCBkaXJlY3RseSB3aXRoaW4gYSBTRUxFQ1QgZWxlbWVudCAoaS5lLiwgZ3JvdXBzIG1heSBub3QgYmUgbmVzdGVkKS4uLlwiXG4gICAgICAvLyBjaGVjayB3aGV0aGVyIHRoaXMgaXMgYSA8b3B0Z3JvdXA+XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25MYWJlbCkpIHtcbiAgICAgICAgLy8gaWYgaXQgaXMgYW4gYXJyYXksIHRoZW4gaXQgaXMgYW4gPG9wdGdyb3VwPlxuICAgICAgICBjb25zdCBvcHRncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGdyb3VwJylcbiAgICAgICAgb3B0Z3JvdXAubGFiZWwgPSBvcHRpb25WYWx1ZVxuICAgICAgICBvcHRncm91cC5kaXNhYmxlZCA9IGZhbHNlIC8vIG5vdCBjb25maWd1cmFibGUgZm9yIG5vd1xuICAgICAgICBzZWxlY3QuYXBwZW5kQ2hpbGQob3B0Z3JvdXApXG4gICAgICAgIG9wdGlvbkxhYmVsLmZvckVhY2goKG8pID0+IHJlbmRlck9wdGlvbihvcHRncm91cCwgb1sxXSwgb1swXSkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBjYXNlIG9mIDxvcHRpb24+XG4gICAgICAgIHJlbmRlck9wdGlvbihzZWxlY3QsIG9wdGlvbkxhYmVsLCBvcHRpb25WYWx1ZSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHNlbGVjdC5mb2N1cygpXG4gIH0sXG5cbiAgcmFkaW86IChwb3B1cCwgaW5wdXRPcHRpb25zLCBwYXJhbXMpID0+IHtcbiAgICBjb25zdCByYWRpbyA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMucmFkaW8pXG4gICAgaW5wdXRPcHRpb25zLmZvckVhY2goKGlucHV0T3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCByYWRpb1ZhbHVlID0gaW5wdXRPcHRpb25bMF1cbiAgICAgIGNvbnN0IHJhZGlvTGFiZWwgPSBpbnB1dE9wdGlvblsxXVxuICAgICAgY29uc3QgcmFkaW9JbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcbiAgICAgIGNvbnN0IHJhZGlvTGFiZWxFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuICAgICAgcmFkaW9JbnB1dC50eXBlID0gJ3JhZGlvJ1xuICAgICAgcmFkaW9JbnB1dC5uYW1lID0gc3dhbENsYXNzZXMucmFkaW9cbiAgICAgIHJhZGlvSW5wdXQudmFsdWUgPSByYWRpb1ZhbHVlXG4gICAgICBpZiAoaXNTZWxlY3RlZChyYWRpb1ZhbHVlLCBwYXJhbXMuaW5wdXRWYWx1ZSkpIHtcbiAgICAgICAgcmFkaW9JbnB1dC5jaGVja2VkID0gdHJ1ZVxuICAgICAgfVxuICAgICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgIGRvbS5zZXRJbm5lckh0bWwobGFiZWwsIHJhZGlvTGFiZWwpXG4gICAgICBsYWJlbC5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlcy5sYWJlbFxuICAgICAgcmFkaW9MYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQocmFkaW9JbnB1dClcbiAgICAgIHJhZGlvTGFiZWxFbGVtZW50LmFwcGVuZENoaWxkKGxhYmVsKVxuICAgICAgcmFkaW8uYXBwZW5kQ2hpbGQocmFkaW9MYWJlbEVsZW1lbnQpXG4gICAgfSlcbiAgICBjb25zdCByYWRpb3MgPSByYWRpby5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG4gICAgaWYgKHJhZGlvcy5sZW5ndGgpIHtcbiAgICAgIHJhZGlvc1swXS5mb2N1cygpXG4gICAgfVxuICB9LFxufVxuXG4vKipcbiAqIENvbnZlcnRzIGBpbnB1dE9wdGlvbnNgIGludG8gYW4gYXJyYXkgb2YgYFt2YWx1ZSwgbGFiZWxdYHNcbiAqIEBwYXJhbSBpbnB1dE9wdGlvbnNcbiAqL1xuY29uc3QgZm9ybWF0SW5wdXRPcHRpb25zID0gKGlucHV0T3B0aW9ucykgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBpZiAodHlwZW9mIE1hcCAhPT0gJ3VuZGVmaW5lZCcgJiYgaW5wdXRPcHRpb25zIGluc3RhbmNlb2YgTWFwKSB7XG4gICAgaW5wdXRPcHRpb25zLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIGxldCB2YWx1ZUZvcm1hdHRlZCA9IHZhbHVlXG4gICAgICBpZiAodHlwZW9mIHZhbHVlRm9ybWF0dGVkID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBjYXNlIG9mIDxvcHRncm91cD5cbiAgICAgICAgdmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRJbnB1dE9wdGlvbnModmFsdWVGb3JtYXR0ZWQpXG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZUZvcm1hdHRlZF0pXG4gICAgfSlcbiAgfSBlbHNlIHtcbiAgICBPYmplY3Qua2V5cyhpbnB1dE9wdGlvbnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgbGV0IHZhbHVlRm9ybWF0dGVkID0gaW5wdXRPcHRpb25zW2tleV1cbiAgICAgIGlmICh0eXBlb2YgdmFsdWVGb3JtYXR0ZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGNhc2Ugb2YgPG9wdGdyb3VwPlxuICAgICAgICB2YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdElucHV0T3B0aW9ucyh2YWx1ZUZvcm1hdHRlZClcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFtrZXksIHZhbHVlRm9ybWF0dGVkXSlcbiAgICB9KVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuY29uc3QgaXNTZWxlY3RlZCA9IChvcHRpb25WYWx1ZSwgaW5wdXRWYWx1ZSkgPT4ge1xuICByZXR1cm4gaW5wdXRWYWx1ZSAmJiBpbnB1dFZhbHVlLnRvU3RyaW5nKCkgPT09IG9wdGlvblZhbHVlLnRvU3RyaW5nKClcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuLyoqXG4gKiBIaWRlcyBsb2FkZXIgYW5kIHNob3dzIGJhY2sgdGhlIGJ1dHRvbiB3aGljaCB3YXMgaGlkZGVuIGJ5IC5zaG93TG9hZGluZygpXG4gKi9cbmZ1bmN0aW9uIGhpZGVMb2FkaW5nKCkge1xuICAvLyBkbyBub3RoaW5nIGlmIHBvcHVwIGlzIGNsb3NlZFxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQodGhpcylcbiAgaWYgKCFpbm5lclBhcmFtcykge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICBkb20uaGlkZShkb21DYWNoZS5sb2FkZXIpXG4gIGlmIChkb20uaXNUb2FzdCgpKSB7XG4gICAgaWYgKGlubmVyUGFyYW1zLmljb24pIHtcbiAgICAgIGRvbS5zaG93KGRvbS5nZXRJY29uKCkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHNob3dSZWxhdGVkQnV0dG9uKGRvbUNhY2hlKVxuICB9XG4gIGRvbS5yZW1vdmVDbGFzcyhbZG9tQ2FjaGUucG9wdXAsIGRvbUNhY2hlLmFjdGlvbnNdLCBzd2FsQ2xhc3Nlcy5sb2FkaW5nKVxuICBkb21DYWNoZS5wb3B1cC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtYnVzeScpXG4gIGRvbUNhY2hlLnBvcHVwLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1sb2FkaW5nJylcbiAgZG9tQ2FjaGUuY29uZmlybUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG4gIGRvbUNhY2hlLmRlbnlCdXR0b24uZGlzYWJsZWQgPSBmYWxzZVxuICBkb21DYWNoZS5jYW5jZWxCdXR0b24uZGlzYWJsZWQgPSBmYWxzZVxufVxuXG5jb25zdCBzaG93UmVsYXRlZEJ1dHRvbiA9IChkb21DYWNoZSkgPT4ge1xuICBjb25zdCBidXR0b25Ub1JlcGxhY2UgPSBkb21DYWNoZS5wb3B1cC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGRvbUNhY2hlLmxvYWRlci5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnV0dG9uLXRvLXJlcGxhY2UnKSlcbiAgaWYgKGJ1dHRvblRvUmVwbGFjZS5sZW5ndGgpIHtcbiAgICBkb20uc2hvdyhidXR0b25Ub1JlcGxhY2VbMF0sICdpbmxpbmUtYmxvY2snKVxuICB9IGVsc2UgaWYgKGRvbS5hbGxCdXR0b25zQXJlSGlkZGVuKCkpIHtcbiAgICBkb20uaGlkZShkb21DYWNoZS5hY3Rpb25zKVxuICB9XG59XG5cbmV4cG9ydCB7IGhpZGVMb2FkaW5nLCBoaWRlTG9hZGluZyBhcyBkaXNhYmxlTG9hZGluZyB9XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5cbi8qKlxuICogR2V0cyB0aGUgaW5wdXQgRE9NIG5vZGUsIHRoaXMgbWV0aG9kIHdvcmtzIHdpdGggaW5wdXQgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0hUTUxFbGVtZW50IHwgbnVsbH1cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElucHV0KGluc3RhbmNlKSB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQoaW5zdGFuY2UgfHwgdGhpcylcbiAgaWYgKCFkb21DYWNoZSkge1xuICAgIHJldHVybiBudWxsXG4gIH1cbiAgcmV0dXJuIGRvbS5nZXRJbnB1dChkb21DYWNoZS5wb3B1cCwgaW5uZXJQYXJhbXMuaW5wdXQpXG59XG4iLCIvKipcbiAqIFRoaXMgbW9kdWxlIGNvbnRhaW5zIGBXZWFrTWFwYHMgZm9yIGVhY2ggZWZmZWN0aXZlbHktXCJwcml2YXRlICBwcm9wZXJ0eVwiIHRoYXQgYSBgU3dhbGAgaGFzLlxuICogRm9yIGV4YW1wbGUsIHRvIHNldCB0aGUgcHJpdmF0ZSBwcm9wZXJ0eSBcImZvb1wiIG9mIGB0aGlzYCB0byBcImJhclwiLCB5b3UgY2FuIGBwcml2YXRlUHJvcHMuZm9vLnNldCh0aGlzLCAnYmFyJylgXG4gKiBUaGlzIGlzIHRoZSBhcHByb2FjaCB0aGF0IEJhYmVsIHdpbGwgcHJvYmFibHkgdGFrZSB0byBpbXBsZW1lbnQgcHJpdmF0ZSBtZXRob2RzL2ZpZWxkc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1wcml2YXRlLW1ldGhvZHNcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL2JhYmVsL2JhYmVsL3B1bGwvNzU1NVxuICogT25jZSB3ZSBoYXZlIHRoZSBjaGFuZ2VzIGZyb20gdGhhdCBQUiBpbiBCYWJlbCwgYW5kIG91ciBjb3JlIGNsYXNzIGZpdHMgcmVhc29uYWJsZSBpbiAqb25lIG1vZHVsZSpcbiAqICAgdGhlbiB3ZSBjYW4gdXNlIHRoYXQgbGFuZ3VhZ2UgZmVhdHVyZS5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHN3YWxQcm9taXNlUmVzb2x2ZTogbmV3IFdlYWtNYXAoKSxcbiAgc3dhbFByb21pc2VSZWplY3Q6IG5ldyBXZWFrTWFwKCksXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0ICogYXMgZG9tVXRpbHMgZnJvbSAnLi4vdXRpbHMvZG9tL2RvbVV0aWxzLmpzJ1xuXG5leHBvcnQge1xuICBnZXRDb250YWluZXIsXG4gIGdldFBvcHVwLFxuICBnZXRUaXRsZSxcbiAgZ2V0SHRtbENvbnRhaW5lcixcbiAgZ2V0SW1hZ2UsXG4gIGdldEljb24sXG4gIGdldElucHV0TGFiZWwsXG4gIGdldENsb3NlQnV0dG9uLFxuICBnZXRBY3Rpb25zLFxuICBnZXRDb25maXJtQnV0dG9uLFxuICBnZXREZW55QnV0dG9uLFxuICBnZXRDYW5jZWxCdXR0b24sXG4gIGdldExvYWRlcixcbiAgZ2V0Rm9vdGVyLFxuICBnZXRUaW1lclByb2dyZXNzQmFyLFxuICBnZXRGb2N1c2FibGVFbGVtZW50cyxcbiAgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UsXG4gIGlzTG9hZGluZyxcbn0gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGRldGVybWluZSBpZiBTd2VldEFsZXJ0MiBwb3B1cCBpcyBzaG93blxuICovXG5leHBvcnQgY29uc3QgaXNWaXNpYmxlID0gKCkgPT4ge1xuICByZXR1cm4gZG9tVXRpbHMuaXNWaXNpYmxlKGRvbS5nZXRQb3B1cCgpKVxufVxuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGNsaWNrICdDb25maXJtJyBidXR0b25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsaWNrQ29uZmlybSA9ICgpID0+IGRvbS5nZXRDb25maXJtQnV0dG9uKCkgJiYgZG9tLmdldENvbmZpcm1CdXR0b24oKS5jbGljaygpXG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gY2xpY2sgJ0RlbnknIGJ1dHRvblxuICovXG5leHBvcnQgY29uc3QgY2xpY2tEZW55ID0gKCkgPT4gZG9tLmdldERlbnlCdXR0b24oKSAmJiBkb20uZ2V0RGVueUJ1dHRvbigpLmNsaWNrKClcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBjbGljayAnQ2FuY2VsJyBidXR0b25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsaWNrQ2FuY2VsID0gKCkgPT4gZG9tLmdldENhbmNlbEJ1dHRvbigpICYmIGRvbS5nZXRDYW5jZWxCdXR0b24oKS5jbGljaygpXG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBEaXNtaXNzUmVhc29uIH0gZnJvbSAnLi91dGlscy9EaXNtaXNzUmVhc29uLmpzJ1xuaW1wb3J0IHsgY2FsbElmRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgY2xpY2tDb25maXJtIH0gZnJvbSAnLi9zdGF0aWNNZXRob2RzL2RvbS5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi9wcml2YXRlUHJvcHMuanMnXG5cbmV4cG9ydCBjb25zdCByZW1vdmVLZXlkb3duSGFuZGxlciA9IChnbG9iYWxTdGF0ZSkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUua2V5ZG93blRhcmdldCAmJiBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlckFkZGVkKSB7XG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93blRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXIsIHtcbiAgICAgIGNhcHR1cmU6IGdsb2JhbFN0YXRlLmtleWRvd25MaXN0ZW5lckNhcHR1cmUsXG4gICAgfSlcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlckFkZGVkID0gZmFsc2VcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgYWRkS2V5ZG93bkhhbmRsZXIgPSAoaW5zdGFuY2UsIGdsb2JhbFN0YXRlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpID0+IHtcbiAgcmVtb3ZlS2V5ZG93bkhhbmRsZXIoZ2xvYmFsU3RhdGUpXG4gIGlmICghaW5uZXJQYXJhbXMudG9hc3QpIHtcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlciA9IChlKSA9PiBrZXlkb3duSGFuZGxlcihpbnN0YW5jZSwgZSwgZGlzbWlzc1dpdGgpXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93blRhcmdldCA9IGlubmVyUGFyYW1zLmtleWRvd25MaXN0ZW5lckNhcHR1cmUgPyB3aW5kb3cgOiBkb20uZ2V0UG9wdXAoKVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25MaXN0ZW5lckNhcHR1cmUgPSBpbm5lclBhcmFtcy5rZXlkb3duTGlzdGVuZXJDYXB0dXJlXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93blRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXIsIHtcbiAgICAgIGNhcHR1cmU6IGdsb2JhbFN0YXRlLmtleWRvd25MaXN0ZW5lckNhcHR1cmUsXG4gICAgfSlcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlckFkZGVkID0gdHJ1ZVxuICB9XG59XG5cbi8vIEZvY3VzIGhhbmRsaW5nXG5leHBvcnQgY29uc3Qgc2V0Rm9jdXMgPSAoaW5uZXJQYXJhbXMsIGluZGV4LCBpbmNyZW1lbnQpID0+IHtcbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBkb20uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKVxuICAvLyBzZWFyY2ggZm9yIHZpc2libGUgZWxlbWVudHMgYW5kIHNlbGVjdCB0aGUgbmV4dCBwb3NzaWJsZSBtYXRjaFxuICBpZiAoZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgaW5kZXggPSBpbmRleCArIGluY3JlbWVudFxuXG4gICAgLy8gcm9sbG92ZXIgdG8gZmlyc3QgaXRlbVxuICAgIGlmIChpbmRleCA9PT0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoKSB7XG4gICAgICBpbmRleCA9IDBcblxuICAgICAgLy8gZ28gdG8gbGFzdCBpdGVtXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PT0gLTEpIHtcbiAgICAgIGluZGV4ID0gZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoIC0gMVxuICAgIH1cblxuICAgIHJldHVybiBmb2N1c2FibGVFbGVtZW50c1tpbmRleF0uZm9jdXMoKVxuICB9XG4gIC8vIG5vIHZpc2libGUgZm9jdXNhYmxlIGVsZW1lbnRzLCBmb2N1cyB0aGUgcG9wdXBcbiAgZG9tLmdldFBvcHVwKCkuZm9jdXMoKVxufVxuXG5jb25zdCBhcnJvd0tleXNOZXh0QnV0dG9uID0gWydBcnJvd1JpZ2h0JywgJ0Fycm93RG93biddXG5cbmNvbnN0IGFycm93S2V5c1ByZXZpb3VzQnV0dG9uID0gWydBcnJvd0xlZnQnLCAnQXJyb3dVcCddXG5cbmNvbnN0IGtleWRvd25IYW5kbGVyID0gKGluc3RhbmNlLCBlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG5cbiAgaWYgKCFpbm5lclBhcmFtcykge1xuICAgIHJldHVybiAvLyBUaGlzIGluc3RhbmNlIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXG4gIH1cblxuICAvLyBJZ25vcmUga2V5ZG93biBkdXJpbmcgSU1FIGNvbXBvc2l0aW9uXG4gIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9rZXlkb3duX2V2ZW50I2lnbm9yaW5nX2tleWRvd25fZHVyaW5nX2ltZV9jb21wb3NpdGlvblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzcyMFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzI0MDZcbiAgaWYgKGUuaXNDb21wb3NpbmcgfHwgZS5rZXlDb2RlID09PSAyMjkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5zdG9wS2V5ZG93blByb3BhZ2F0aW9uKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICB9XG5cbiAgLy8gRU5URVJcbiAgaWYgKGUua2V5ID09PSAnRW50ZXInKSB7XG4gICAgaGFuZGxlRW50ZXIoaW5zdGFuY2UsIGUsIGlubmVyUGFyYW1zKVxuICB9XG5cbiAgLy8gVEFCXG4gIGVsc2UgaWYgKGUua2V5ID09PSAnVGFiJykge1xuICAgIGhhbmRsZVRhYihlLCBpbm5lclBhcmFtcylcbiAgfVxuXG4gIC8vIEFSUk9XUyAtIHN3aXRjaCBmb2N1cyBiZXR3ZWVuIGJ1dHRvbnNcbiAgZWxzZSBpZiAoWy4uLmFycm93S2V5c05leHRCdXR0b24sIC4uLmFycm93S2V5c1ByZXZpb3VzQnV0dG9uXS5pbmNsdWRlcyhlLmtleSkpIHtcbiAgICBoYW5kbGVBcnJvd3MoZS5rZXkpXG4gIH1cblxuICAvLyBFU0NcbiAgZWxzZSBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XG4gICAgaGFuZGxlRXNjKGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVFbnRlciA9IChpbnN0YW5jZSwgZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMzg2XG4gIGlmICghY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dFbnRlcktleSkpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmIChlLnRhcmdldCAmJiBpbnN0YW5jZS5nZXRJbnB1dCgpICYmIGUudGFyZ2V0Lm91dGVySFRNTCA9PT0gaW5zdGFuY2UuZ2V0SW5wdXQoKS5vdXRlckhUTUwpIHtcbiAgICBpZiAoWyd0ZXh0YXJlYScsICdmaWxlJ10uaW5jbHVkZXMoaW5uZXJQYXJhbXMuaW5wdXQpKSB7XG4gICAgICByZXR1cm4gLy8gZG8gbm90IHN1Ym1pdFxuICAgIH1cblxuICAgIGNsaWNrQ29uZmlybSgpXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlVGFiID0gKGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBlLnRhcmdldFxuXG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gZG9tLmdldEZvY3VzYWJsZUVsZW1lbnRzKClcbiAgbGV0IGJ0bkluZGV4ID0gLTFcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIGlmICh0YXJnZXRFbGVtZW50ID09PSBmb2N1c2FibGVFbGVtZW50c1tpXSkge1xuICAgICAgYnRuSW5kZXggPSBpXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIEN5Y2xlIHRvIHRoZSBuZXh0IGJ1dHRvblxuICBpZiAoIWUuc2hpZnRLZXkpIHtcbiAgICBzZXRGb2N1cyhpbm5lclBhcmFtcywgYnRuSW5kZXgsIDEpXG4gIH1cblxuICAvLyBDeWNsZSB0byB0aGUgcHJldiBidXR0b25cbiAgZWxzZSB7XG4gICAgc2V0Rm9jdXMoaW5uZXJQYXJhbXMsIGJ0bkluZGV4LCAtMSlcbiAgfVxuXG4gIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgZS5wcmV2ZW50RGVmYXVsdCgpXG59XG5cbmNvbnN0IGhhbmRsZUFycm93cyA9IChrZXkpID0+IHtcbiAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvbS5nZXRDb25maXJtQnV0dG9uKClcbiAgY29uc3QgZGVueUJ1dHRvbiA9IGRvbS5nZXREZW55QnV0dG9uKClcbiAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9tLmdldENhbmNlbEJ1dHRvbigpXG4gIGlmICghW2NvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbl0uaW5jbHVkZXMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBzaWJsaW5nID0gYXJyb3dLZXlzTmV4dEJ1dHRvbi5pbmNsdWRlcyhrZXkpID8gJ25leHRFbGVtZW50U2libGluZycgOiAncHJldmlvdXNFbGVtZW50U2libGluZydcbiAgbGV0IGJ1dHRvblRvRm9jdXMgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZG9tLmdldEFjdGlvbnMoKS5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgIGJ1dHRvblRvRm9jdXMgPSBidXR0b25Ub0ZvY3VzW3NpYmxpbmddXG4gICAgaWYgKCFidXR0b25Ub0ZvY3VzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGRvbS5pc1Zpc2libGUoYnV0dG9uVG9Gb2N1cykgJiYgYnV0dG9uVG9Gb2N1cyBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICBpZiAoYnV0dG9uVG9Gb2N1cyBpbnN0YW5jZW9mIEhUTUxCdXR0b25FbGVtZW50KSB7XG4gICAgYnV0dG9uVG9Gb2N1cy5mb2N1cygpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRXNjID0gKGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBpZiAoY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dFc2NhcGVLZXkpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZGlzbWlzc1dpdGgoRGlzbWlzc1JlYXNvbi5lc2MpXG4gIH1cbn1cbiIsImltcG9ydCB7IHVuZG9TY3JvbGxiYXIgfSBmcm9tICcuLi91dGlscy9zY3JvbGxiYXJGaXguanMnXG5pbXBvcnQgeyB1bmRvSU9TZml4IH0gZnJvbSAnLi4vdXRpbHMvaW9zRml4LmpzJ1xuaW1wb3J0IHsgdW5zZXRBcmlhSGlkZGVuIH0gZnJvbSAnLi4vdXRpbHMvYXJpYS5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5pbXBvcnQgZ2xvYmFsU3RhdGUsIHsgcmVzdG9yZUFjdGl2ZUVsZW1lbnQgfSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHByaXZhdGVNZXRob2RzIGZyb20gJy4uL3ByaXZhdGVNZXRob2RzLmpzJ1xuaW1wb3J0IHsgcmVtb3ZlS2V5ZG93bkhhbmRsZXIgfSBmcm9tICcuLi9rZXlkb3duLWhhbmRsZXIuanMnXG5cbi8qXG4gKiBJbnN0YW5jZSBtZXRob2QgdG8gY2xvc2Ugc3dlZXRBbGVydFxuICovXG5cbmZ1bmN0aW9uIHJlbW92ZVBvcHVwQW5kUmVzZXRTdGF0ZShpbnN0YW5jZSwgY29udGFpbmVyLCByZXR1cm5Gb2N1cywgZGlkQ2xvc2UpIHtcbiAgaWYgKGRvbS5pc1RvYXN0KCkpIHtcbiAgICB0cmlnZ2VyRGlkQ2xvc2VBbmREaXNwb3NlKGluc3RhbmNlLCBkaWRDbG9zZSlcbiAgfSBlbHNlIHtcbiAgICByZXN0b3JlQWN0aXZlRWxlbWVudChyZXR1cm5Gb2N1cykudGhlbigoKSA9PiB0cmlnZ2VyRGlkQ2xvc2VBbmREaXNwb3NlKGluc3RhbmNlLCBkaWRDbG9zZSkpXG4gICAgcmVtb3ZlS2V5ZG93bkhhbmRsZXIoZ2xvYmFsU3RhdGUpXG4gIH1cblxuICBjb25zdCBpc1NhZmFyaSA9IC9eKCg/IWNocm9tZXxhbmRyb2lkKS4pKnNhZmFyaS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgLy8gd29ya2Fyb3VuZCBmb3IgIzIwODhcbiAgLy8gZm9yIHNvbWUgcmVhc29uIHJlbW92aW5nIHRoZSBjb250YWluZXIgaW4gU2FmYXJpIHdpbGwgc2Nyb2xsIHRoZSBkb2N1bWVudCB0byBib3R0b21cbiAgaWYgKGlzU2FmYXJpKSB7XG4gICAgY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnc3R5bGUnLCAnZGlzcGxheTpub25lICFpbXBvcnRhbnQnKVxuICAgIGNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoJ2NsYXNzJylcbiAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJydcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIucmVtb3ZlKClcbiAgfVxuXG4gIGlmIChkb20uaXNNb2RhbCgpKSB7XG4gICAgdW5kb1Njcm9sbGJhcigpXG4gICAgdW5kb0lPU2ZpeCgpXG4gICAgdW5zZXRBcmlhSGlkZGVuKClcbiAgfVxuXG4gIHJlbW92ZUJvZHlDbGFzc2VzKClcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQm9keUNsYXNzZXMoKSB7XG4gIGRvbS5yZW1vdmVDbGFzcyhcbiAgICBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSxcbiAgICBbc3dhbENsYXNzZXMuc2hvd24sIHN3YWxDbGFzc2VzWydoZWlnaHQtYXV0byddLCBzd2FsQ2xhc3Nlc1snbm8tYmFja2Ryb3AnXSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ11dXG4gIClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlKHJlc29sdmVWYWx1ZSkge1xuICByZXNvbHZlVmFsdWUgPSBwcmVwYXJlUmVzb2x2ZVZhbHVlKHJlc29sdmVWYWx1ZSlcblxuICBjb25zdCBzd2FsUHJvbWlzZVJlc29sdmUgPSBwcml2YXRlTWV0aG9kcy5zd2FsUHJvbWlzZVJlc29sdmUuZ2V0KHRoaXMpXG5cbiAgY29uc3QgZGlkQ2xvc2UgPSB0cmlnZ2VyQ2xvc2VQb3B1cCh0aGlzKVxuXG4gIGlmICh0aGlzLmlzQXdhaXRpbmdQcm9taXNlKCkpIHtcbiAgICAvLyBBIHN3YWwgYXdhaXRpbmcgZm9yIGEgcHJvbWlzZSAoYWZ0ZXIgYSBjbGljayBvbiBDb25maXJtIG9yIERlbnkpIGNhbm5vdCBiZSBkaXNtaXNzZWQgYW55bW9yZSAjMjMzNVxuICAgIGlmICghcmVzb2x2ZVZhbHVlLmlzRGlzbWlzc2VkKSB7XG4gICAgICBoYW5kbGVBd2FpdGluZ1Byb21pc2UodGhpcylcbiAgICAgIHN3YWxQcm9taXNlUmVzb2x2ZShyZXNvbHZlVmFsdWUpXG4gICAgfVxuICB9IGVsc2UgaWYgKGRpZENsb3NlKSB7XG4gICAgLy8gUmVzb2x2ZSBTd2FsIHByb21pc2VcbiAgICBzd2FsUHJvbWlzZVJlc29sdmUocmVzb2x2ZVZhbHVlKVxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0F3YWl0aW5nUHJvbWlzZSgpIHtcbiAgcmV0dXJuICEhcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5nZXQodGhpcylcbn1cblxuY29uc3QgdHJpZ2dlckNsb3NlUG9wdXAgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuXG4gIGlmICghcG9wdXApIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaWYgKCFpbm5lclBhcmFtcyB8fCBkb20uaGFzQ2xhc3MocG9wdXAsIGlubmVyUGFyYW1zLmhpZGVDbGFzcy5wb3B1cCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIGRvbS5yZW1vdmVDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuc2hvd0NsYXNzLnBvcHVwKVxuICBkb20uYWRkQ2xhc3MocG9wdXAsIGlubmVyUGFyYW1zLmhpZGVDbGFzcy5wb3B1cClcblxuICBjb25zdCBiYWNrZHJvcCA9IGRvbS5nZXRDb250YWluZXIoKVxuICBkb20ucmVtb3ZlQ2xhc3MoYmFja2Ryb3AsIGlubmVyUGFyYW1zLnNob3dDbGFzcy5iYWNrZHJvcClcbiAgZG9tLmFkZENsYXNzKGJhY2tkcm9wLCBpbm5lclBhcmFtcy5oaWRlQ2xhc3MuYmFja2Ryb3ApXG5cbiAgaGFuZGxlUG9wdXBBbmltYXRpb24oaW5zdGFuY2UsIHBvcHVwLCBpbm5lclBhcmFtcylcblxuICByZXR1cm4gdHJ1ZVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVqZWN0UHJvbWlzZShlcnJvcikge1xuICBjb25zdCByZWplY3RQcm9taXNlID0gcHJpdmF0ZU1ldGhvZHMuc3dhbFByb21pc2VSZWplY3QuZ2V0KHRoaXMpXG4gIGhhbmRsZUF3YWl0aW5nUHJvbWlzZSh0aGlzKVxuICBpZiAocmVqZWN0UHJvbWlzZSkge1xuICAgIC8vIFJlamVjdCBTd2FsIHByb21pc2VcbiAgICByZWplY3RQcm9taXNlKGVycm9yKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVBd2FpdGluZ1Byb21pc2UgPSAoaW5zdGFuY2UpID0+IHtcbiAgaWYgKGluc3RhbmNlLmlzQXdhaXRpbmdQcm9taXNlKCkpIHtcbiAgICBwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLmRlbGV0ZShpbnN0YW5jZSlcbiAgICAvLyBUaGUgaW5zdGFuY2UgbWlnaHQgaGF2ZSBiZWVuIHByZXZpb3VzbHkgcGFydGx5IGRlc3Ryb3llZCwgd2UgbXVzdCByZXN1bWUgdGhlIGRlc3Ryb3kgcHJvY2VzcyBpbiB0aGlzIGNhc2UgIzIzMzVcbiAgICBpZiAoIXByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpKSB7XG4gICAgICBpbnN0YW5jZS5fZGVzdHJveSgpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHByZXBhcmVSZXNvbHZlVmFsdWUgPSAocmVzb2x2ZVZhbHVlKSA9PiB7XG4gIC8vIFdoZW4gdXNlciBjYWxscyBTd2FsLmNsb3NlKClcbiAgaWYgKHR5cGVvZiByZXNvbHZlVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzQ29uZmlybWVkOiBmYWxzZSxcbiAgICAgIGlzRGVuaWVkOiBmYWxzZSxcbiAgICAgIGlzRGlzbWlzc2VkOiB0cnVlLFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKFxuICAgIHtcbiAgICAgIGlzQ29uZmlybWVkOiBmYWxzZSxcbiAgICAgIGlzRGVuaWVkOiBmYWxzZSxcbiAgICAgIGlzRGlzbWlzc2VkOiBmYWxzZSxcbiAgICB9LFxuICAgIHJlc29sdmVWYWx1ZVxuICApXG59XG5cbmNvbnN0IGhhbmRsZVBvcHVwQW5pbWF0aW9uID0gKGluc3RhbmNlLCBwb3B1cCwgaW5uZXJQYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIC8vIElmIGFuaW1hdGlvbiBpcyBzdXBwb3J0ZWQsIGFuaW1hdGVcbiAgY29uc3QgYW5pbWF0aW9uSXNTdXBwb3J0ZWQgPSBkb20uYW5pbWF0aW9uRW5kRXZlbnQgJiYgZG9tLmhhc0Nzc0FuaW1hdGlvbihwb3B1cClcblxuICBpZiAodHlwZW9mIGlubmVyUGFyYW1zLndpbGxDbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlubmVyUGFyYW1zLndpbGxDbG9zZShwb3B1cClcbiAgfVxuXG4gIGlmIChhbmltYXRpb25Jc1N1cHBvcnRlZCkge1xuICAgIGFuaW1hdGVQb3B1cChpbnN0YW5jZSwgcG9wdXAsIGNvbnRhaW5lciwgaW5uZXJQYXJhbXMucmV0dXJuRm9jdXMsIGlubmVyUGFyYW1zLmRpZENsb3NlKVxuICB9IGVsc2Uge1xuICAgIC8vIE90aGVyd2lzZSwgcmVtb3ZlIGltbWVkaWF0ZWx5XG4gICAgcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlKGluc3RhbmNlLCBjb250YWluZXIsIGlubmVyUGFyYW1zLnJldHVybkZvY3VzLCBpbm5lclBhcmFtcy5kaWRDbG9zZSlcbiAgfVxufVxuXG5jb25zdCBhbmltYXRlUG9wdXAgPSAoaW5zdGFuY2UsIHBvcHVwLCBjb250YWluZXIsIHJldHVybkZvY3VzLCBkaWRDbG9zZSkgPT4ge1xuICBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2sgPSByZW1vdmVQb3B1cEFuZFJlc2V0U3RhdGUuYmluZChcbiAgICBudWxsLFxuICAgIGluc3RhbmNlLFxuICAgIGNvbnRhaW5lcixcbiAgICByZXR1cm5Gb2N1cyxcbiAgICBkaWRDbG9zZVxuICApXG4gIHBvcHVwLmFkZEV2ZW50TGlzdGVuZXIoZG9tLmFuaW1hdGlvbkVuZEV2ZW50LCBmdW5jdGlvbiAoZSkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gcG9wdXApIHtcbiAgICAgIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjaygpXG4gICAgICBkZWxldGUgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrXG4gICAgfVxuICB9KVxufVxuXG5jb25zdCB0cmlnZ2VyRGlkQ2xvc2VBbmREaXNwb3NlID0gKGluc3RhbmNlLCBkaWRDbG9zZSkgPT4ge1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBpZiAodHlwZW9mIGRpZENsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBkaWRDbG9zZS5iaW5kKGluc3RhbmNlLnBhcmFtcykoKVxuICAgIH1cbiAgICBpbnN0YW5jZS5fZGVzdHJveSgpXG4gIH0pXG59XG5cbmV4cG9ydCB7IGNsb3NlIGFzIGNsb3NlUG9wdXAsIGNsb3NlIGFzIGNsb3NlTW9kYWwsIGNsb3NlIGFzIGNsb3NlVG9hc3QgfVxuIiwiaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5cbmZ1bmN0aW9uIHNldEJ1dHRvbnNEaXNhYmxlZChpbnN0YW5jZSwgYnV0dG9ucywgZGlzYWJsZWQpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KGluc3RhbmNlKVxuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGRvbUNhY2hlW2J1dHRvbl0uZGlzYWJsZWQgPSBkaXNhYmxlZFxuICB9KVxufVxuXG5mdW5jdGlvbiBzZXRJbnB1dERpc2FibGVkKGlucHV0LCBkaXNhYmxlZCkge1xuICBpZiAoIWlucHV0KSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKGlucHV0LnR5cGUgPT09ICdyYWRpbycpIHtcbiAgICBjb25zdCByYWRpb3NDb250YWluZXIgPSBpbnB1dC5wYXJlbnROb2RlLnBhcmVudE5vZGVcbiAgICBjb25zdCByYWRpb3MgPSByYWRpb3NDb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmFkaW9zLmxlbmd0aDsgaSsrKSB7XG4gICAgICByYWRpb3NbaV0uZGlzYWJsZWQgPSBkaXNhYmxlZFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpbnB1dC5kaXNhYmxlZCA9IGRpc2FibGVkXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUJ1dHRvbnMoKSB7XG4gIHNldEJ1dHRvbnNEaXNhYmxlZCh0aGlzLCBbJ2NvbmZpcm1CdXR0b24nLCAnZGVueUJ1dHRvbicsICdjYW5jZWxCdXR0b24nXSwgZmFsc2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlQnV0dG9ucygpIHtcbiAgc2V0QnV0dG9uc0Rpc2FibGVkKHRoaXMsIFsnY29uZmlybUJ1dHRvbicsICdkZW55QnV0dG9uJywgJ2NhbmNlbEJ1dHRvbiddLCB0cnVlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlSW5wdXQoKSB7XG4gIHJldHVybiBzZXRJbnB1dERpc2FibGVkKHRoaXMuZ2V0SW5wdXQoKSwgZmFsc2UpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNhYmxlSW5wdXQoKSB7XG4gIHJldHVybiBzZXRJbnB1dERpc2FibGVkKHRoaXMuZ2V0SW5wdXQoKSwgdHJ1ZSlcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuLy8gU2hvdyBibG9jayB3aXRoIHZhbGlkYXRpb24gbWVzc2FnZVxuZXhwb3J0IGZ1bmN0aW9uIHNob3dWYWxpZGF0aW9uTWVzc2FnZShlcnJvcikge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQodGhpcylcbiAgY29uc3QgcGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuICBkb20uc2V0SW5uZXJIdG1sKGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlLCBlcnJvcilcbiAgZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UuY2xhc3NOYW1lID0gc3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddXG4gIGlmIChwYXJhbXMuY3VzdG9tQ2xhc3MgJiYgcGFyYW1zLmN1c3RvbUNsYXNzLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgZG9tLmFkZENsYXNzKGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlLCBwYXJhbXMuY3VzdG9tQ2xhc3MudmFsaWRhdGlvbk1lc3NhZ2UpXG4gIH1cbiAgZG9tLnNob3coZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UpXG5cbiAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0KClcbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWludmFsaWQnLCB0cnVlKVxuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHN3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXSlcbiAgICBkb20uZm9jdXNJbnB1dChpbnB1dClcbiAgICBkb20uYWRkQ2xhc3MoaW5wdXQsIHN3YWxDbGFzc2VzLmlucHV0ZXJyb3IpXG4gIH1cbn1cblxuLy8gSGlkZSBibG9jayB3aXRoIHZhbGlkYXRpb24gbWVzc2FnZVxuZXhwb3J0IGZ1bmN0aW9uIHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICBpZiAoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBkb20uaGlkZShkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSlcbiAgfVxuXG4gIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dCgpXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJylcbiAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknKVxuICAgIGRvbS5yZW1vdmVDbGFzcyhpbnB1dCwgc3dhbENsYXNzZXMuaW5wdXRlcnJvcilcbiAgfVxufVxuIiwiaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9ncmVzc1N0ZXBzKCkge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQodGhpcylcbiAgcmV0dXJuIGRvbUNhY2hlLnByb2dyZXNzU3RlcHNcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9zcmMvdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uLy4uL3NyYy91dGlscy91dGlscy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHsgaXNVcGRhdGFibGVQYXJhbWV0ZXIgfSBmcm9tICcuLi8uLi9zcmMvdXRpbHMvcGFyYW1zLmpzJ1xuXG4vKipcbiAqIFVwZGF0ZXMgcG9wdXAgcGFyYW1ldGVycy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZShwYXJhbXMpIHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQodGhpcylcblxuICBpZiAoIXBvcHVwIHx8IGRvbS5oYXNDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLnBvcHVwKSkge1xuICAgIHJldHVybiB3YXJuKFxuICAgICAgYFlvdSdyZSB0cnlpbmcgdG8gdXBkYXRlIHRoZSBjbG9zZWQgb3IgY2xvc2luZyBwb3B1cCwgdGhhdCB3b24ndCB3b3JrLiBVc2UgdGhlIHVwZGF0ZSgpIG1ldGhvZCBpbiBwcmVDb25maXJtIHBhcmFtZXRlciBvciBzaG93IGEgbmV3IHBvcHVwLmBcbiAgICApXG4gIH1cblxuICBjb25zdCB2YWxpZFVwZGF0YWJsZVBhcmFtcyA9IGZpbHRlclZhbGlkUGFyYW1zKHBhcmFtcylcblxuICBjb25zdCB1cGRhdGVkUGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgaW5uZXJQYXJhbXMsIHZhbGlkVXBkYXRhYmxlUGFyYW1zKVxuXG4gIGRvbS5yZW5kZXIodGhpcywgdXBkYXRlZFBhcmFtcylcblxuICBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuc2V0KHRoaXMsIHVwZGF0ZWRQYXJhbXMpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICBwYXJhbXM6IHtcbiAgICAgIHZhbHVlOiBPYmplY3QuYXNzaWduKHt9LCB0aGlzLnBhcmFtcywgcGFyYW1zKSxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgfSxcbiAgfSlcbn1cblxuY29uc3QgZmlsdGVyVmFsaWRQYXJhbXMgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IHZhbGlkVXBkYXRhYmxlUGFyYW1zID0ge31cbiAgT2JqZWN0LmtleXMocGFyYW1zKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgIGlmIChpc1VwZGF0YWJsZVBhcmFtZXRlcihwYXJhbSkpIHtcbiAgICAgIHZhbGlkVXBkYXRhYmxlUGFyYW1zW3BhcmFtXSA9IHBhcmFtc1twYXJhbV1cbiAgICB9IGVsc2Uge1xuICAgICAgd2FybihcbiAgICAgICAgYEludmFsaWQgcGFyYW1ldGVyIHRvIHVwZGF0ZTogXCIke3BhcmFtfVwiLiBVcGRhdGFibGUgcGFyYW1zIGFyZSBsaXN0ZWQgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2Jsb2IvbWFzdGVyL3NyYy91dGlscy9wYXJhbXMuanNcXG5cXG5JZiB5b3UgdGhpbmsgdGhpcyBwYXJhbWV0ZXIgc2hvdWxkIGJlIHVwZGF0YWJsZSwgcmVxdWVzdCBpdCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzL25ldz90ZW1wbGF0ZT0wMl9mZWF0dXJlX3JlcXVlc3QubWRgXG4gICAgICApXG4gICAgfVxuICB9KVxuICByZXR1cm4gdmFsaWRVcGRhdGFibGVQYXJhbXNcbn1cbiIsImltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHByaXZhdGVNZXRob2RzIGZyb20gJy4uL3ByaXZhdGVNZXRob2RzLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gX2Rlc3Ryb3koKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQodGhpcylcblxuICBpZiAoIWlubmVyUGFyYW1zKSB7XG4gICAgZGlzcG9zZVdlYWtNYXBzKHRoaXMpIC8vIFRoZSBXZWFrTWFwcyBtaWdodCBoYXZlIGJlZW4gcGFydGx5IGRlc3Ryb3llZCwgd2UgbXVzdCByZWNhbGwgaXQgdG8gZGlzcG9zZSBhbnkgcmVtYWluaW5nIFdlYWtNYXBzICMyMzM1XG4gICAgcmV0dXJuIC8vIFRoaXMgaW5zdGFuY2UgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFub3RoZXIgU3dhbCBjbG9zaW5nXG4gIGlmIChkb21DYWNoZS5wb3B1cCAmJiBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2spIHtcbiAgICBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2soKVxuICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2tcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgc3dhbCBkaXNwb3NhbCBkZWZlciB0aW1lclxuICBpZiAoZ2xvYmFsU3RhdGUuZGVmZXJEaXNwb3NhbFRpbWVyKSB7XG4gICAgY2xlYXJUaW1lb3V0KGdsb2JhbFN0YXRlLmRlZmVyRGlzcG9zYWxUaW1lcilcbiAgICBkZWxldGUgZ2xvYmFsU3RhdGUuZGVmZXJEaXNwb3NhbFRpbWVyXG4gIH1cblxuICBpZiAodHlwZW9mIGlubmVyUGFyYW1zLmRpZERlc3Ryb3kgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpbm5lclBhcmFtcy5kaWREZXN0cm95KClcbiAgfVxuICBkaXNwb3NlU3dhbCh0aGlzKVxufVxuXG5jb25zdCBkaXNwb3NlU3dhbCA9IChpbnN0YW5jZSkgPT4ge1xuICBkaXNwb3NlV2Vha01hcHMoaW5zdGFuY2UpXG4gIC8vIFVuc2V0IHRoaXMucGFyYW1zIHNvIEdDIHdpbGwgZGlzcG9zZSBpdCAoIzE1NjkpXG4gIGRlbGV0ZSBpbnN0YW5jZS5wYXJhbXNcbiAgLy8gVW5zZXQgZ2xvYmFsU3RhdGUgcHJvcHMgc28gR0Mgd2lsbCBkaXNwb3NlIGdsb2JhbFN0YXRlICgjMTU2OSlcbiAgZGVsZXRlIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyXG4gIGRlbGV0ZSBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0XG4gIC8vIFVuc2V0IGN1cnJlbnRJbnN0YW5jZVxuICBkZWxldGUgZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlXG59XG5cbmNvbnN0IGRpc3Bvc2VXZWFrTWFwcyA9IChpbnN0YW5jZSkgPT4ge1xuICAvLyBJZiB0aGUgY3VycmVudCBpbnN0YW5jZSBpcyBhd2FpdGluZyBhIHByb21pc2UgcmVzdWx0LCB3ZSBrZWVwIHRoZSBwcml2YXRlTWV0aG9kcyB0byBjYWxsIHRoZW0gb25jZSB0aGUgcHJvbWlzZSByZXN1bHQgaXMgcmV0cmlldmVkICMyMzM1XG4gIGlmIChpbnN0YW5jZS5pc0F3YWl0aW5nUHJvbWlzZSgpKSB7XG4gICAgdW5zZXRXZWFrTWFwcyhwcml2YXRlUHJvcHMsIGluc3RhbmNlKVxuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2Uuc2V0KGluc3RhbmNlLCB0cnVlKVxuICB9IGVsc2Uge1xuICAgIHVuc2V0V2Vha01hcHMocHJpdmF0ZU1ldGhvZHMsIGluc3RhbmNlKVxuICAgIHVuc2V0V2Vha01hcHMocHJpdmF0ZVByb3BzLCBpbnN0YW5jZSlcbiAgfVxufVxuXG5jb25zdCB1bnNldFdlYWtNYXBzID0gKG9iaiwgaW5zdGFuY2UpID0+IHtcbiAgZm9yIChjb25zdCBpIGluIG9iaikge1xuICAgIG9ialtpXS5kZWxldGUoaW5zdGFuY2UpXG4gIH1cbn1cbiIsImltcG9ydCB7IGlzVmlzaWJsZSB9IGZyb20gJy4vdXRpbHMvZG9tL2RvbVV0aWxzLmpzJ1xuaW1wb3J0IHsgZ2V0SW5wdXRWYWx1ZSB9IGZyb20gJy4vdXRpbHMvZG9tL2lucHV0VXRpbHMuanMnXG5pbXBvcnQgeyBnZXREZW55QnV0dG9uLCBnZXRWYWxpZGF0aW9uTWVzc2FnZSB9IGZyb20gJy4vdXRpbHMvZG9tL2dldHRlcnMuanMnXG5pbXBvcnQgeyBhc1Byb21pc2UsIGNhcGl0YWxpemVGaXJzdExldHRlciwgZXJyb3IgfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgc2hvd0xvYWRpbmcgfSBmcm9tICcuL3N0YXRpY01ldGhvZHMvc2hvd0xvYWRpbmcuanMnXG5pbXBvcnQgeyBEaXNtaXNzUmVhc29uIH0gZnJvbSAnLi91dGlscy9EaXNtaXNzUmVhc29uLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCB7IGhhbmRsZUF3YWl0aW5nUHJvbWlzZSB9IGZyb20gJy4vaW5zdGFuY2VNZXRob2RzLmpzJ1xuXG5leHBvcnQgY29uc3QgaGFuZGxlQ29uZmlybUJ1dHRvbkNsaWNrID0gKGluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaW5zdGFuY2UuZGlzYWJsZUJ1dHRvbnMoKVxuICBpZiAoaW5uZXJQYXJhbXMuaW5wdXQpIHtcbiAgICBoYW5kbGVDb25maXJtT3JEZW55V2l0aElucHV0KGluc3RhbmNlLCAnY29uZmlybScpXG4gIH0gZWxzZSB7XG4gICAgY29uZmlybShpbnN0YW5jZSwgdHJ1ZSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlRGVueUJ1dHRvbkNsaWNrID0gKGluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaW5zdGFuY2UuZGlzYWJsZUJ1dHRvbnMoKVxuICBpZiAoaW5uZXJQYXJhbXMucmV0dXJuSW5wdXRWYWx1ZU9uRGVueSkge1xuICAgIGhhbmRsZUNvbmZpcm1PckRlbnlXaXRoSW5wdXQoaW5zdGFuY2UsICdkZW55JylcbiAgfSBlbHNlIHtcbiAgICBkZW55KGluc3RhbmNlLCBmYWxzZSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2sgPSAoaW5zdGFuY2UsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGluc3RhbmNlLmRpc2FibGVCdXR0b25zKClcbiAgZGlzbWlzc1dpdGgoRGlzbWlzc1JlYXNvbi5jYW5jZWwpXG59XG5cbmNvbnN0IGhhbmRsZUNvbmZpcm1PckRlbnlXaXRoSW5wdXQgPSAoaW5zdGFuY2UsIHR5cGUgLyogJ2NvbmZpcm0nIHwgJ2RlbnknICovKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaWYgKCFpbm5lclBhcmFtcy5pbnB1dCkge1xuICAgIHJldHVybiBlcnJvcihcbiAgICAgIGBUaGUgXCJpbnB1dFwiIHBhcmFtZXRlciBpcyBuZWVkZWQgdG8gYmUgc2V0IHdoZW4gdXNpbmcgcmV0dXJuSW5wdXRWYWx1ZU9uJHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIodHlwZSl9YFxuICAgIClcbiAgfVxuICBjb25zdCBpbnB1dFZhbHVlID0gZ2V0SW5wdXRWYWx1ZShpbnN0YW5jZSwgaW5uZXJQYXJhbXMpXG4gIGlmIChpbm5lclBhcmFtcy5pbnB1dFZhbGlkYXRvcikge1xuICAgIGhhbmRsZUlucHV0VmFsaWRhdG9yKGluc3RhbmNlLCBpbnB1dFZhbHVlLCB0eXBlKVxuICB9IGVsc2UgaWYgKCFpbnN0YW5jZS5nZXRJbnB1dCgpLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgIGluc3RhbmNlLmVuYWJsZUJ1dHRvbnMoKVxuICAgIGluc3RhbmNlLnNob3dWYWxpZGF0aW9uTWVzc2FnZShpbm5lclBhcmFtcy52YWxpZGF0aW9uTWVzc2FnZSlcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnZGVueScpIHtcbiAgICBkZW55KGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICB9IGVsc2Uge1xuICAgIGNvbmZpcm0oaW5zdGFuY2UsIGlucHV0VmFsdWUpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlSW5wdXRWYWxpZGF0b3IgPSAoaW5zdGFuY2UsIGlucHV0VmFsdWUsIHR5cGUgLyogJ2NvbmZpcm0nIHwgJ2RlbnknICovKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaW5zdGFuY2UuZGlzYWJsZUlucHV0KClcbiAgY29uc3QgdmFsaWRhdGlvblByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+XG4gICAgYXNQcm9taXNlKGlubmVyUGFyYW1zLmlucHV0VmFsaWRhdG9yKGlucHV0VmFsdWUsIGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKSlcbiAgKVxuICB2YWxpZGF0aW9uUHJvbWlzZS50aGVuKCh2YWxpZGF0aW9uTWVzc2FnZSkgPT4ge1xuICAgIGluc3RhbmNlLmVuYWJsZUJ1dHRvbnMoKVxuICAgIGluc3RhbmNlLmVuYWJsZUlucHV0KClcbiAgICBpZiAodmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICAgIGluc3RhbmNlLnNob3dWYWxpZGF0aW9uTWVzc2FnZSh2YWxpZGF0aW9uTWVzc2FnZSlcbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZW55Jykge1xuICAgICAgZGVueShpbnN0YW5jZSwgaW5wdXRWYWx1ZSlcbiAgICB9IGVsc2Uge1xuICAgICAgY29uZmlybShpbnN0YW5jZSwgaW5wdXRWYWx1ZSlcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IGRlbnkgPSAoaW5zdGFuY2UsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuXG4gIGlmIChpbm5lclBhcmFtcy5zaG93TG9hZGVyT25EZW55KSB7XG4gICAgc2hvd0xvYWRpbmcoZ2V0RGVueUJ1dHRvbigpKVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLnByZURlbnkpIHtcbiAgICBwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLnNldChpbnN0YW5jZSB8fCB0aGlzLCB0cnVlKSAvLyBGbGFnZ2luZyB0aGUgaW5zdGFuY2UgYXMgYXdhaXRpbmcgYSBwcm9taXNlIHNvIGl0J3Mgb3duIHByb21pc2UncyByZWplY3QvcmVzb2x2ZSBtZXRob2RzIGRvZXNuJ3QgZ2V0IGRlc3Ryb3llZCB1bnRpbCB0aGUgcmVzdWx0IGZyb20gdGhpcyBwcmVEZW55J3MgcHJvbWlzZSBpcyByZWNlaXZlZFxuICAgIGNvbnN0IHByZURlbnlQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PlxuICAgICAgYXNQcm9taXNlKGlubmVyUGFyYW1zLnByZURlbnkodmFsdWUsIGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKSlcbiAgICApXG4gICAgcHJlRGVueVByb21pc2VcbiAgICAgIC50aGVuKChwcmVEZW55VmFsdWUpID0+IHtcbiAgICAgICAgaWYgKHByZURlbnlWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgaGFuZGxlQXdhaXRpbmdQcm9taXNlKGluc3RhbmNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlLmNsb3NlUG9wdXAoeyBpc0RlbmllZDogdHJ1ZSwgdmFsdWU6IHR5cGVvZiBwcmVEZW55VmFsdWUgPT09ICd1bmRlZmluZWQnID8gdmFsdWUgOiBwcmVEZW55VmFsdWUgfSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdFdpdGgoaW5zdGFuY2UgfHwgdGhpcywgZXJyb3IpKVxuICB9IGVsc2Uge1xuICAgIGluc3RhbmNlLmNsb3NlUG9wdXAoeyBpc0RlbmllZDogdHJ1ZSwgdmFsdWUgfSlcbiAgfVxufVxuXG5jb25zdCBzdWNjZWVkV2l0aCA9IChpbnN0YW5jZSwgdmFsdWUpID0+IHtcbiAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzQ29uZmlybWVkOiB0cnVlLCB2YWx1ZSB9KVxufVxuXG5jb25zdCByZWplY3RXaXRoID0gKGluc3RhbmNlLCBlcnJvcikgPT4ge1xuICBpbnN0YW5jZS5yZWplY3RQcm9taXNlKGVycm9yKVxufVxuXG5jb25zdCBjb25maXJtID0gKGluc3RhbmNlLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UgfHwgdGhpcylcblxuICBpZiAoaW5uZXJQYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSkge1xuICAgIHNob3dMb2FkaW5nKClcbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5wcmVDb25maXJtKSB7XG4gICAgaW5zdGFuY2UucmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5zZXQoaW5zdGFuY2UgfHwgdGhpcywgdHJ1ZSkgLy8gRmxhZ2dpbmcgdGhlIGluc3RhbmNlIGFzIGF3YWl0aW5nIGEgcHJvbWlzZSBzbyBpdCdzIG93biBwcm9taXNlJ3MgcmVqZWN0L3Jlc29sdmUgbWV0aG9kcyBkb2Vzbid0IGdldCBkZXN0cm95ZWQgdW50aWwgdGhlIHJlc3VsdCBmcm9tIHRoaXMgcHJlQ29uZmlybSdzIHByb21pc2UgaXMgcmVjZWl2ZWRcbiAgICBjb25zdCBwcmVDb25maXJtUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT5cbiAgICAgIGFzUHJvbWlzZShpbm5lclBhcmFtcy5wcmVDb25maXJtKHZhbHVlLCBpbm5lclBhcmFtcy52YWxpZGF0aW9uTWVzc2FnZSkpXG4gICAgKVxuICAgIHByZUNvbmZpcm1Qcm9taXNlXG4gICAgICAudGhlbigocHJlQ29uZmlybVZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChpc1Zpc2libGUoZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoKSkgfHwgcHJlQ29uZmlybVZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBoYW5kbGVBd2FpdGluZ1Byb21pc2UoaW5zdGFuY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VjY2VlZFdpdGgoaW5zdGFuY2UsIHR5cGVvZiBwcmVDb25maXJtVmFsdWUgPT09ICd1bmRlZmluZWQnID8gdmFsdWUgOiBwcmVDb25maXJtVmFsdWUpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3RXaXRoKGluc3RhbmNlIHx8IHRoaXMsIGVycm9yKSlcbiAgfSBlbHNlIHtcbiAgICBzdWNjZWVkV2l0aChpbnN0YW5jZSwgdmFsdWUpXG4gIH1cbn1cbiIsImltcG9ydCB7IGNhbGxJZkZ1bmN0aW9uIH0gZnJvbSAnLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5leHBvcnQgY29uc3QgaGFuZGxlUG9wdXBDbGljayA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgaWYgKGlubmVyUGFyYW1zLnRvYXN0KSB7XG4gICAgaGFuZGxlVG9hc3RDbGljayhpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKVxuICB9IGVsc2Uge1xuICAgIC8vIElnbm9yZSBjbGljayBldmVudHMgdGhhdCBoYWQgbW91c2Vkb3duIG9uIHRoZSBwb3B1cCBidXQgbW91c2V1cCBvbiB0aGUgY29udGFpbmVyXG4gICAgLy8gVGhpcyBjYW4gaGFwcGVuIHdoZW4gdGhlIHVzZXIgZHJhZ3MgYSBzbGlkZXJcbiAgICBoYW5kbGVNb2RhbE1vdXNlZG93bihkb21DYWNoZSlcblxuICAgIC8vIElnbm9yZSBjbGljayBldmVudHMgdGhhdCBoYWQgbW91c2Vkb3duIG9uIHRoZSBjb250YWluZXIgYnV0IG1vdXNldXAgb24gdGhlIHBvcHVwXG4gICAgaGFuZGxlQ29udGFpbmVyTW91c2Vkb3duKGRvbUNhY2hlKVxuXG4gICAgaGFuZGxlTW9kYWxDbGljayhpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVRvYXN0Q2xpY2sgPSAoaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICAvLyBDbG9zaW5nIHRvYXN0IGJ5IGludGVybmFsIGNsaWNrXG4gIGRvbUNhY2hlLnBvcHVwLm9uY2xpY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICAgIGlmIChpbm5lclBhcmFtcyAmJiAoaXNBbnlCdXR0b25TaG93bihpbm5lclBhcmFtcykgfHwgaW5uZXJQYXJhbXMudGltZXIgfHwgaW5uZXJQYXJhbXMuaW5wdXQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgZGlzbWlzc1dpdGgoRGlzbWlzc1JlYXNvbi5jbG9zZSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7Kn0gaW5uZXJQYXJhbXNcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc0FueUJ1dHRvblNob3duID0gKGlubmVyUGFyYW1zKSA9PiB7XG4gIHJldHVybiAoXG4gICAgaW5uZXJQYXJhbXMuc2hvd0NvbmZpcm1CdXR0b24gfHxcbiAgICBpbm5lclBhcmFtcy5zaG93RGVueUJ1dHRvbiB8fFxuICAgIGlubmVyUGFyYW1zLnNob3dDYW5jZWxCdXR0b24gfHxcbiAgICBpbm5lclBhcmFtcy5zaG93Q2xvc2VCdXR0b25cbiAgKVxufVxuXG5sZXQgaWdub3JlT3V0c2lkZUNsaWNrID0gZmFsc2VcblxuY29uc3QgaGFuZGxlTW9kYWxNb3VzZWRvd24gPSAoZG9tQ2FjaGUpID0+IHtcbiAgZG9tQ2FjaGUucG9wdXAub25tb3VzZWRvd24gPSAoKSA9PiB7XG4gICAgZG9tQ2FjaGUuY29udGFpbmVyLm9ubW91c2V1cCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBkb21DYWNoZS5jb250YWluZXIub25tb3VzZXVwID0gdW5kZWZpbmVkXG4gICAgICAvLyBXZSBvbmx5IGNoZWNrIGlmIHRoZSBtb3VzZXVwIHRhcmdldCBpcyB0aGUgY29udGFpbmVyIGJlY2F1c2UgdXN1YWxseSBpdCBkb2Vzbid0XG4gICAgICAvLyBoYXZlIGFueSBvdGhlciBkaXJlY3QgY2hpbGRyZW4gYXNpZGUgb2YgdGhlIHBvcHVwXG4gICAgICBpZiAoZS50YXJnZXQgPT09IGRvbUNhY2hlLmNvbnRhaW5lcikge1xuICAgICAgICBpZ25vcmVPdXRzaWRlQ2xpY2sgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUNvbnRhaW5lck1vdXNlZG93biA9IChkb21DYWNoZSkgPT4ge1xuICBkb21DYWNoZS5jb250YWluZXIub25tb3VzZWRvd24gPSAoKSA9PiB7XG4gICAgZG9tQ2FjaGUucG9wdXAub25tb3VzZXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRvbUNhY2hlLnBvcHVwLm9ubW91c2V1cCA9IHVuZGVmaW5lZFxuICAgICAgLy8gV2UgYWxzbyBuZWVkIHRvIGNoZWNrIGlmIHRoZSBtb3VzZXVwIHRhcmdldCBpcyBhIGNoaWxkIG9mIHRoZSBwb3B1cFxuICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb21DYWNoZS5wb3B1cCB8fCBkb21DYWNoZS5wb3B1cC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgaWdub3JlT3V0c2lkZUNsaWNrID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBoYW5kbGVNb2RhbENsaWNrID0gKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgZG9tQ2FjaGUuY29udGFpbmVyLm9uY2xpY2sgPSAoZSkgPT4ge1xuICAgIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgICBpZiAoaWdub3JlT3V0c2lkZUNsaWNrKSB7XG4gICAgICBpZ25vcmVPdXRzaWRlQ2xpY2sgPSBmYWxzZVxuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChlLnRhcmdldCA9PT0gZG9tQ2FjaGUuY29udGFpbmVyICYmIGNhbGxJZkZ1bmN0aW9uKGlubmVyUGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSkge1xuICAgICAgZGlzbWlzc1dpdGgoRGlzbWlzc1JlYXNvbi5iYWNrZHJvcClcbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCB7IGVycm9yIH0gZnJvbSAnLi4vdXRpbHMvdXRpbHMuanMnXG5cbmNvbnN0IGlzSnF1ZXJ5RWxlbWVudCA9IChlbGVtKSA9PiB0eXBlb2YgZWxlbSA9PT0gJ29iamVjdCcgJiYgZWxlbS5qcXVlcnlcbmNvbnN0IGlzRWxlbWVudCA9IChlbGVtKSA9PiBlbGVtIGluc3RhbmNlb2YgRWxlbWVudCB8fCBpc0pxdWVyeUVsZW1lbnQoZWxlbSlcblxuZXhwb3J0IGNvbnN0IGFyZ3NUb1BhcmFtcyA9IChhcmdzKSA9PiB7XG4gIGNvbnN0IHBhcmFtcyA9IHt9XG4gIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ29iamVjdCcgJiYgIWlzRWxlbWVudChhcmdzWzBdKSkge1xuICAgIE9iamVjdC5hc3NpZ24ocGFyYW1zLCBhcmdzWzBdKVxuICB9IGVsc2Uge1xuICAgIDtbJ3RpdGxlJywgJ2h0bWwnLCAnaWNvbiddLmZvckVhY2goKG5hbWUsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCBhcmcgPSBhcmdzW2luZGV4XVxuICAgICAgaWYgKHR5cGVvZiBhcmcgPT09ICdzdHJpbmcnIHx8IGlzRWxlbWVudChhcmcpKSB7XG4gICAgICAgIHBhcmFtc1tuYW1lXSA9IGFyZ1xuICAgICAgfSBlbHNlIGlmIChhcmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBlcnJvcihgVW5leHBlY3RlZCB0eXBlIG9mICR7bmFtZX0hIEV4cGVjdGVkIFwic3RyaW5nXCIgb3IgXCJFbGVtZW50XCIsIGdvdCAke3R5cGVvZiBhcmd9YClcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIHJldHVybiBwYXJhbXNcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBmaXJlKC4uLmFyZ3MpIHtcbiAgY29uc3QgU3dhbCA9IHRoaXMgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICByZXR1cm4gbmV3IFN3YWwoLi4uYXJncylcbn1cbiIsIi8qKlxuICogUmV0dXJucyBhbiBleHRlbmRlZCB2ZXJzaW9uIG9mIGBTd2FsYCBjb250YWluaW5nIGBwYXJhbXNgIGFzIGRlZmF1bHRzLlxuICogVXNlZnVsIGZvciByZXVzaW5nIFN3YWwgY29uZmlndXJhdGlvbi5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBCZWZvcmU6XG4gKiBjb25zdCB0ZXh0UHJvbXB0T3B0aW9ucyA9IHsgaW5wdXQ6ICd0ZXh0Jywgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSB9XG4gKiBjb25zdCB7dmFsdWU6IGZpcnN0TmFtZX0gPSBhd2FpdCBTd2FsLmZpcmUoeyAuLi50ZXh0UHJvbXB0T3B0aW9ucywgdGl0bGU6ICdXaGF0IGlzIHlvdXIgZmlyc3QgbmFtZT8nIH0pXG4gKiBjb25zdCB7dmFsdWU6IGxhc3ROYW1lfSA9IGF3YWl0IFN3YWwuZmlyZSh7IC4uLnRleHRQcm9tcHRPcHRpb25zLCB0aXRsZTogJ1doYXQgaXMgeW91ciBsYXN0IG5hbWU/JyB9KVxuICpcbiAqIEFmdGVyOlxuICogY29uc3QgVGV4dFByb21wdCA9IFN3YWwubWl4aW4oeyBpbnB1dDogJ3RleHQnLCBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlIH0pXG4gKiBjb25zdCB7dmFsdWU6IGZpcnN0TmFtZX0gPSBhd2FpdCBUZXh0UHJvbXB0KCdXaGF0IGlzIHlvdXIgZmlyc3QgbmFtZT8nKVxuICogY29uc3Qge3ZhbHVlOiBsYXN0TmFtZX0gPSBhd2FpdCBUZXh0UHJvbXB0KCdXaGF0IGlzIHlvdXIgbGFzdCBuYW1lPycpXG4gKlxuICogQHBhcmFtIG1peGluUGFyYW1zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBtaXhpbihtaXhpblBhcmFtcykge1xuICBjbGFzcyBNaXhpblN3YWwgZXh0ZW5kcyB0aGlzIHtcbiAgICBfbWFpbihwYXJhbXMsIHByaW9yaXR5TWl4aW5QYXJhbXMpIHtcbiAgICAgIHJldHVybiBzdXBlci5fbWFpbihwYXJhbXMsIE9iamVjdC5hc3NpZ24oe30sIG1peGluUGFyYW1zLCBwcmlvcml0eU1peGluUGFyYW1zKSlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gTWl4aW5Td2FsXG59XG4iLCJpbXBvcnQgeyBhbmltYXRlVGltZXJQcm9ncmVzc0Jhciwgc3RvcFRpbWVyUHJvZ3Jlc3NCYXIgfSBmcm9tICcuLi91dGlscy9kb20vZG9tVXRpbHMuanMnXG5pbXBvcnQgZ2xvYmFsU3RhdGUgZnJvbSAnLi4vZ2xvYmFsU3RhdGUuanMnXG5cbi8qKlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXMgc2V0LCByZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgdGltZXIgcmVtYWluZWQuXG4gKiBPdGhlcndpc2UsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgZ2V0VGltZXJMZWZ0ID0gKCkgPT4ge1xuICByZXR1cm4gZ2xvYmFsU3RhdGUudGltZW91dCAmJiBnbG9iYWxTdGF0ZS50aW1lb3V0LmdldFRpbWVyTGVmdCgpXG59XG5cbi8qKlxuICogU3RvcCB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHRpbWVyIHJlbWFpbmVkLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHN0b3BUaW1lciA9ICgpID0+IHtcbiAgaWYgKGdsb2JhbFN0YXRlLnRpbWVvdXQpIHtcbiAgICBzdG9wVGltZXJQcm9ncmVzc0JhcigpXG4gICAgcmV0dXJuIGdsb2JhbFN0YXRlLnRpbWVvdXQuc3RvcCgpXG4gIH1cbn1cblxuLyoqXG4gKiBSZXN1bWUgdGltZXIuIFJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCByZXN1bWVUaW1lciA9ICgpID0+IHtcbiAgaWYgKGdsb2JhbFN0YXRlLnRpbWVvdXQpIHtcbiAgICBjb25zdCByZW1haW5pbmcgPSBnbG9iYWxTdGF0ZS50aW1lb3V0LnN0YXJ0KClcbiAgICBhbmltYXRlVGltZXJQcm9ncmVzc0JhcihyZW1haW5pbmcpXG4gICAgcmV0dXJuIHJlbWFpbmluZ1xuICB9XG59XG5cbi8qKlxuICogUmVzdW1lIHRpbWVyLiBSZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgdGltZXIgcmVtYWluZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlVGltZXIgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVyID0gZ2xvYmFsU3RhdGUudGltZW91dFxuICByZXR1cm4gdGltZXIgJiYgKHRpbWVyLnJ1bm5pbmcgPyBzdG9wVGltZXIoKSA6IHJlc3VtZVRpbWVyKCkpXG59XG5cbi8qKlxuICogSW5jcmVhc2UgdGltZXIuIFJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiBhbiB1cGRhdGVkIHRpbWVyLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGluY3JlYXNlVGltZXIgPSAobikgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGdsb2JhbFN0YXRlLnRpbWVvdXQuaW5jcmVhc2UobilcbiAgICBhbmltYXRlVGltZXJQcm9ncmVzc0JhcihyZW1haW5pbmcsIHRydWUpXG4gICAgcmV0dXJuIHJlbWFpbmluZ1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGltZXIgaXMgcnVubmluZy4gUmV0dXJucyB0cnVlIGlmIHRpbWVyIGlzIHJ1bm5pbmdcbiAqIG9yIGZhbHNlIGlmIHRpbWVyIGlzIHBhdXNlZCBvciBzdG9wcGVkLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZFxuICovXG5leHBvcnQgY29uc3QgaXNUaW1lclJ1bm5pbmcgPSAoKSA9PiB7XG4gIHJldHVybiBnbG9iYWxTdGF0ZS50aW1lb3V0ICYmIGdsb2JhbFN0YXRlLnRpbWVvdXQuaXNSdW5uaW5nKClcbn1cbiIsImxldCBib2R5Q2xpY2tMaXN0ZW5lckFkZGVkID0gZmFsc2VcbmNvbnN0IGNsaWNrSGFuZGxlcnMgPSB7fVxuXG5leHBvcnQgZnVuY3Rpb24gYmluZENsaWNrSGFuZGxlcihhdHRyID0gJ2RhdGEtc3dhbC10ZW1wbGF0ZScpIHtcbiAgY2xpY2tIYW5kbGVyc1thdHRyXSA9IHRoaXNcblxuICBpZiAoIWJvZHlDbGlja0xpc3RlbmVyQWRkZWQpIHtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm9keUNsaWNrTGlzdGVuZXIpXG4gICAgYm9keUNsaWNrTGlzdGVuZXJBZGRlZCA9IHRydWVcbiAgfVxufVxuXG5jb25zdCBib2R5Q2xpY2tMaXN0ZW5lciA9IChldmVudCkgPT4ge1xuICBmb3IgKGxldCBlbCA9IGV2ZW50LnRhcmdldDsgZWwgJiYgZWwgIT09IGRvY3VtZW50OyBlbCA9IGVsLnBhcmVudE5vZGUpIHtcbiAgICBmb3IgKGNvbnN0IGF0dHIgaW4gY2xpY2tIYW5kbGVycykge1xuICAgICAgY29uc3QgdGVtcGxhdGUgPSBlbC5nZXRBdHRyaWJ1dGUoYXR0cilcbiAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICBjbGlja0hhbmRsZXJzW2F0dHJdLmZpcmUoeyB0ZW1wbGF0ZSB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsImltcG9ydCBkZWZhdWx0UGFyYW1zLCB7IHNob3dXYXJuaW5nc0ZvclBhcmFtcyB9IGZyb20gJy4vdXRpbHMvcGFyYW1zLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgY2FsbElmRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgRGlzbWlzc1JlYXNvbiB9IGZyb20gJy4vdXRpbHMvRGlzbWlzc1JlYXNvbi5qcydcbmltcG9ydCB7IHVuc2V0QXJpYUhpZGRlbiB9IGZyb20gJy4vdXRpbHMvYXJpYS5qcydcbmltcG9ydCB7IGdldFRlbXBsYXRlUGFyYW1zIH0gZnJvbSAnLi91dGlscy9nZXRUZW1wbGF0ZVBhcmFtcy5qcydcbmltcG9ydCBzZXRQYXJhbWV0ZXJzIGZyb20gJy4vdXRpbHMvc2V0UGFyYW1ldGVycy5qcydcbmltcG9ydCBUaW1lciBmcm9tICcuL3V0aWxzL1RpbWVyLmpzJ1xuaW1wb3J0IHsgb3BlblBvcHVwIH0gZnJvbSAnLi91dGlscy9vcGVuUG9wdXAuanMnXG5pbXBvcnQgeyBoYW5kbGVJbnB1dE9wdGlvbnNBbmRWYWx1ZSB9IGZyb20gJy4vdXRpbHMvZG9tL2lucHV0VXRpbHMuanMnXG5pbXBvcnQgeyBoYW5kbGVDYW5jZWxCdXR0b25DbGljaywgaGFuZGxlQ29uZmlybUJ1dHRvbkNsaWNrLCBoYW5kbGVEZW55QnV0dG9uQ2xpY2sgfSBmcm9tICcuL2J1dHRvbnMtaGFuZGxlcnMuanMnXG5pbXBvcnQgeyBoYW5kbGVQb3B1cENsaWNrIH0gZnJvbSAnLi9wb3B1cC1jbGljay1oYW5kbGVyLmpzJ1xuaW1wb3J0IHsgYWRkS2V5ZG93bkhhbmRsZXIsIHNldEZvY3VzIH0gZnJvbSAnLi9rZXlkb3duLWhhbmRsZXIuanMnXG5pbXBvcnQgKiBhcyBzdGF0aWNNZXRob2RzIGZyb20gJy4vc3RhdGljTWV0aG9kcy5qcydcbmltcG9ydCAqIGFzIGluc3RhbmNlTWV0aG9kcyBmcm9tICcuL2luc3RhbmNlTWV0aG9kcy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgcHJpdmF0ZU1ldGhvZHMgZnJvbSAnLi9wcml2YXRlTWV0aG9kcy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuL2dsb2JhbFN0YXRlLmpzJ1xuXG5sZXQgY3VycmVudEluc3RhbmNlXG5cbmNsYXNzIFN3ZWV0QWxlcnQge1xuICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgLy8gUHJldmVudCBydW4gaW4gTm9kZSBlbnZcbiAgICBpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGN1cnJlbnRJbnN0YW5jZSA9IHRoaXNcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBvdXRlclBhcmFtcyA9IE9iamVjdC5mcmVlemUodGhpcy5jb25zdHJ1Y3Rvci5hcmdzVG9QYXJhbXMoYXJncykpXG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgICBwYXJhbXM6IHtcbiAgICAgICAgdmFsdWU6IG91dGVyUGFyYW1zLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBwcm9taXNlID0gdGhpcy5fbWFpbih0aGlzLnBhcmFtcylcbiAgICBwcml2YXRlUHJvcHMucHJvbWlzZS5zZXQodGhpcywgcHJvbWlzZSlcbiAgfVxuXG4gIF9tYWluKHVzZXJQYXJhbXMsIG1peGluUGFyYW1zID0ge30pIHtcbiAgICBzaG93V2FybmluZ3NGb3JQYXJhbXMoT2JqZWN0LmFzc2lnbih7fSwgbWl4aW5QYXJhbXMsIHVzZXJQYXJhbXMpKVxuXG4gICAgaWYgKGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZSkge1xuICAgICAgZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlLl9kZXN0cm95KClcbiAgICAgIGlmIChkb20uaXNNb2RhbCgpKSB7XG4gICAgICAgIHVuc2V0QXJpYUhpZGRlbigpXG4gICAgICB9XG4gICAgfVxuICAgIGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZSA9IHRoaXNcblxuICAgIGNvbnN0IGlubmVyUGFyYW1zID0gcHJlcGFyZVBhcmFtcyh1c2VyUGFyYW1zLCBtaXhpblBhcmFtcylcbiAgICBzZXRQYXJhbWV0ZXJzKGlubmVyUGFyYW1zKVxuICAgIE9iamVjdC5mcmVlemUoaW5uZXJQYXJhbXMpXG5cbiAgICAvLyBjbGVhciB0aGUgcHJldmlvdXMgdGltZXJcbiAgICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgICAgZ2xvYmFsU3RhdGUudGltZW91dC5zdG9wKClcbiAgICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS50aW1lb3V0XG4gICAgfVxuXG4gICAgLy8gY2xlYXIgdGhlIHJlc3RvcmUgZm9jdXMgdGltZW91dFxuICAgIGNsZWFyVGltZW91dChnbG9iYWxTdGF0ZS5yZXN0b3JlRm9jdXNUaW1lb3V0KVxuXG4gICAgY29uc3QgZG9tQ2FjaGUgPSBwb3B1bGF0ZURvbUNhY2hlKHRoaXMpXG5cbiAgICBkb20ucmVuZGVyKHRoaXMsIGlubmVyUGFyYW1zKVxuXG4gICAgcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLnNldCh0aGlzLCBpbm5lclBhcmFtcylcblxuICAgIHJldHVybiBzd2FsUHJvbWlzZSh0aGlzLCBkb21DYWNoZSwgaW5uZXJQYXJhbXMpXG4gIH1cblxuICAvLyBgY2F0Y2hgIGNhbm5vdCBiZSB0aGUgbmFtZSBvZiBhIG1vZHVsZSBleHBvcnQsIHNvIHdlIGRlZmluZSBvdXIgdGhlbmFibGUgbWV0aG9kcyBoZXJlIGluc3RlYWRcbiAgdGhlbihvbkZ1bGZpbGxlZCkge1xuICAgIGNvbnN0IHByb21pc2UgPSBwcml2YXRlUHJvcHMucHJvbWlzZS5nZXQodGhpcylcbiAgICByZXR1cm4gcHJvbWlzZS50aGVuKG9uRnVsZmlsbGVkKVxuICB9XG5cbiAgZmluYWxseShvbkZpbmFsbHkpIHtcbiAgICBjb25zdCBwcm9taXNlID0gcHJpdmF0ZVByb3BzLnByb21pc2UuZ2V0KHRoaXMpXG4gICAgcmV0dXJuIHByb21pc2UuZmluYWxseShvbkZpbmFsbHkpXG4gIH1cbn1cblxuY29uc3Qgc3dhbFByb21pc2UgPSAoaW5zdGFuY2UsIGRvbUNhY2hlLCBpbm5lclBhcmFtcykgPT4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIC8vIGZ1bmN0aW9ucyB0byBoYW5kbGUgYWxsIGNsb3NpbmdzL2Rpc21pc3NhbHNcbiAgICBjb25zdCBkaXNtaXNzV2l0aCA9IChkaXNtaXNzKSA9PiB7XG4gICAgICBpbnN0YW5jZS5jbG9zZVBvcHVwKHsgaXNEaXNtaXNzZWQ6IHRydWUsIGRpc21pc3MgfSlcbiAgICB9XG5cbiAgICBwcml2YXRlTWV0aG9kcy5zd2FsUHJvbWlzZVJlc29sdmUuc2V0KGluc3RhbmNlLCByZXNvbHZlKVxuICAgIHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVqZWN0LnNldChpbnN0YW5jZSwgcmVqZWN0KVxuXG4gICAgZG9tQ2FjaGUuY29uZmlybUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gaGFuZGxlQ29uZmlybUJ1dHRvbkNsaWNrKGluc3RhbmNlKVxuICAgIGRvbUNhY2hlLmRlbnlCdXR0b24ub25jbGljayA9ICgpID0+IGhhbmRsZURlbnlCdXR0b25DbGljayhpbnN0YW5jZSlcbiAgICBkb21DYWNoZS5jYW5jZWxCdXR0b24ub25jbGljayA9ICgpID0+IGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrKGluc3RhbmNlLCBkaXNtaXNzV2l0aClcblxuICAgIGRvbUNhY2hlLmNsb3NlQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmNsb3NlKVxuXG4gICAgaGFuZGxlUG9wdXBDbGljayhpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKVxuXG4gICAgYWRkS2V5ZG93bkhhbmRsZXIoaW5zdGFuY2UsIGdsb2JhbFN0YXRlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpXG5cbiAgICBoYW5kbGVJbnB1dE9wdGlvbnNBbmRWYWx1ZShpbnN0YW5jZSwgaW5uZXJQYXJhbXMpXG5cbiAgICBvcGVuUG9wdXAoaW5uZXJQYXJhbXMpXG5cbiAgICBzZXR1cFRpbWVyKGdsb2JhbFN0YXRlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpXG5cbiAgICBpbml0Rm9jdXMoZG9tQ2FjaGUsIGlubmVyUGFyYW1zKVxuXG4gICAgLy8gU2Nyb2xsIGNvbnRhaW5lciB0byB0b3Agb24gb3BlbiAoIzEyNDcsICMxOTQ2KVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgZG9tQ2FjaGUuY29udGFpbmVyLnNjcm9sbFRvcCA9IDBcbiAgICB9KVxuICB9KVxufVxuXG5jb25zdCBwcmVwYXJlUGFyYW1zID0gKHVzZXJQYXJhbXMsIG1peGluUGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRlbXBsYXRlUGFyYW1zID0gZ2V0VGVtcGxhdGVQYXJhbXModXNlclBhcmFtcylcbiAgY29uc3QgcGFyYW1zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcmFtcywgbWl4aW5QYXJhbXMsIHRlbXBsYXRlUGFyYW1zLCB1c2VyUGFyYW1zKSAvLyBwcmVjZWRlbmNlIGlzIGRlc2NyaWJlZCBpbiAjMjEzMVxuICBwYXJhbXMuc2hvd0NsYXNzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcmFtcy5zaG93Q2xhc3MsIHBhcmFtcy5zaG93Q2xhc3MpXG4gIHBhcmFtcy5oaWRlQ2xhc3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyYW1zLmhpZGVDbGFzcywgcGFyYW1zLmhpZGVDbGFzcylcbiAgcmV0dXJuIHBhcmFtc1xufVxuXG5jb25zdCBwb3B1bGF0ZURvbUNhY2hlID0gKGluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IGRvbUNhY2hlID0ge1xuICAgIHBvcHVwOiBkb20uZ2V0UG9wdXAoKSxcbiAgICBjb250YWluZXI6IGRvbS5nZXRDb250YWluZXIoKSxcbiAgICBhY3Rpb25zOiBkb20uZ2V0QWN0aW9ucygpLFxuICAgIGNvbmZpcm1CdXR0b246IGRvbS5nZXRDb25maXJtQnV0dG9uKCksXG4gICAgZGVueUJ1dHRvbjogZG9tLmdldERlbnlCdXR0b24oKSxcbiAgICBjYW5jZWxCdXR0b246IGRvbS5nZXRDYW5jZWxCdXR0b24oKSxcbiAgICBsb2FkZXI6IGRvbS5nZXRMb2FkZXIoKSxcbiAgICBjbG9zZUJ1dHRvbjogZG9tLmdldENsb3NlQnV0dG9uKCksXG4gICAgdmFsaWRhdGlvbk1lc3NhZ2U6IGRvbS5nZXRWYWxpZGF0aW9uTWVzc2FnZSgpLFxuICAgIHByb2dyZXNzU3RlcHM6IGRvbS5nZXRQcm9ncmVzc1N0ZXBzKCksXG4gIH1cbiAgcHJpdmF0ZVByb3BzLmRvbUNhY2hlLnNldChpbnN0YW5jZSwgZG9tQ2FjaGUpXG5cbiAgcmV0dXJuIGRvbUNhY2hlXG59XG5cbmNvbnN0IHNldHVwVGltZXIgPSAoZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBjb25zdCB0aW1lclByb2dyZXNzQmFyID0gZG9tLmdldFRpbWVyUHJvZ3Jlc3NCYXIoKVxuICBkb20uaGlkZSh0aW1lclByb2dyZXNzQmFyKVxuICBpZiAoaW5uZXJQYXJhbXMudGltZXIpIHtcbiAgICBnbG9iYWxTdGF0ZS50aW1lb3V0ID0gbmV3IFRpbWVyKCgpID0+IHtcbiAgICAgIGRpc21pc3NXaXRoKCd0aW1lcicpXG4gICAgICBkZWxldGUgZ2xvYmFsU3RhdGUudGltZW91dFxuICAgIH0sIGlubmVyUGFyYW1zLnRpbWVyKVxuICAgIGlmIChpbm5lclBhcmFtcy50aW1lclByb2dyZXNzQmFyKSB7XG4gICAgICBkb20uc2hvdyh0aW1lclByb2dyZXNzQmFyKVxuICAgICAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3ModGltZXJQcm9ncmVzc0JhciwgaW5uZXJQYXJhbXMsICd0aW1lclByb2dyZXNzQmFyJylcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCAmJiBnbG9iYWxTdGF0ZS50aW1lb3V0LnJ1bm5pbmcpIHtcbiAgICAgICAgICAvLyB0aW1lciBjYW4gYmUgYWxyZWFkeSBzdG9wcGVkIG9yIHVuc2V0IGF0IHRoaXMgcG9pbnRcbiAgICAgICAgICBkb20uYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIoaW5uZXJQYXJhbXMudGltZXIpXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGluaXRGb2N1cyA9IChkb21DYWNoZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgaWYgKGlubmVyUGFyYW1zLnRvYXN0KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoIWNhbGxJZkZ1bmN0aW9uKGlubmVyUGFyYW1zLmFsbG93RW50ZXJLZXkpKSB7XG4gICAgcmV0dXJuIGJsdXJBY3RpdmVFbGVtZW50KClcbiAgfVxuXG4gIGlmICghZm9jdXNCdXR0b24oZG9tQ2FjaGUsIGlubmVyUGFyYW1zKSkge1xuICAgIHNldEZvY3VzKGlubmVyUGFyYW1zLCAtMSwgMSlcbiAgfVxufVxuXG5jb25zdCBmb2N1c0J1dHRvbiA9IChkb21DYWNoZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgaWYgKGlubmVyUGFyYW1zLmZvY3VzRGVueSAmJiBkb20uaXNWaXNpYmxlKGRvbUNhY2hlLmRlbnlCdXR0b24pKSB7XG4gICAgZG9tQ2FjaGUuZGVueUJ1dHRvbi5mb2N1cygpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5mb2N1c0NhbmNlbCAmJiBkb20uaXNWaXNpYmxlKGRvbUNhY2hlLmNhbmNlbEJ1dHRvbikpIHtcbiAgICBkb21DYWNoZS5jYW5jZWxCdXR0b24uZm9jdXMoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMuZm9jdXNDb25maXJtICYmIGRvbS5pc1Zpc2libGUoZG9tQ2FjaGUuY29uZmlybUJ1dHRvbikpIHtcbiAgICBkb21DYWNoZS5jb25maXJtQnV0dG9uLmZvY3VzKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNvbnN0IGJsdXJBY3RpdmVFbGVtZW50ID0gKCkgPT4ge1xuICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIHR5cGVvZiBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKVxuICB9XG59XG5cbi8vIEFzc2lnbiBpbnN0YW5jZSBtZXRob2RzIGZyb20gc3JjL2luc3RhbmNlTWV0aG9kcy8qLmpzIHRvIHByb3RvdHlwZVxuT2JqZWN0LmFzc2lnbihTd2VldEFsZXJ0LnByb3RvdHlwZSwgaW5zdGFuY2VNZXRob2RzKVxuXG4vLyBBc3NpZ24gc3RhdGljIG1ldGhvZHMgZnJvbSBzcmMvc3RhdGljTWV0aG9kcy8qLmpzIHRvIGNvbnN0cnVjdG9yXG5PYmplY3QuYXNzaWduKFN3ZWV0QWxlcnQsIHN0YXRpY01ldGhvZHMpXG5cbi8vIFByb3h5IHRvIGluc3RhbmNlIG1ldGhvZHMgdG8gY29uc3RydWN0b3IsIGZvciBub3csIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuT2JqZWN0LmtleXMoaW5zdGFuY2VNZXRob2RzKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgU3dlZXRBbGVydFtrZXldID0gZnVuY3Rpb24gKC4uLmFyZ3MpIHtcbiAgICBpZiAoY3VycmVudEluc3RhbmNlKSB7XG4gICAgICByZXR1cm4gY3VycmVudEluc3RhbmNlW2tleV0oLi4uYXJncylcbiAgICB9XG4gIH1cbn0pXG5cblN3ZWV0QWxlcnQuRGlzbWlzc1JlYXNvbiA9IERpc21pc3NSZWFzb25cblxuU3dlZXRBbGVydC52ZXJzaW9uID0gJzExLjQuOCdcblxuZXhwb3J0IGRlZmF1bHQgU3dlZXRBbGVydFxuIiwiaW1wb3J0IFN3ZWV0QWxlcnQgZnJvbSAnLi9Td2VldEFsZXJ0LmpzJ1xuXG5jb25zdCBTd2FsID0gU3dlZXRBbGVydFxuLy8gQHRzLWlnbm9yZVxuU3dhbC5kZWZhdWx0ID0gU3dhbFxuXG5leHBvcnQgZGVmYXVsdCBTd2FsXG4iLCJpbXBvcnQgU3dhbCBmcm9tIFwic3dlZXRhbGVydDJcIjtcbmltcG9ydCAnc3dlZXRhbGVydDIvc3JjL3N3ZWV0YWxlcnQyLnNjc3MnXG5pbXBvcnQgeyBqdWRnZURsZ0NvbnRlbnQgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcbmltcG9ydCAnLi9kaWFsb2d1ZS5zY3NzJ1xuXG5leHBvcnQgZnVuY3Rpb24gdGVzdCgpe1xuICAgIFN3YWwuZmlyZSh7XG4gICAgICAgIHRpdGxlOiAnRXJyb3IhJyxcbiAgICAgICAgdGV4dDogJ0RvIHlvdSB3YW50IHRvIGNvbnRpbnVlJyxcbiAgICAgICAgaWNvbjogJ2Vycm9yJyxcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6ICdDb29sJ1xuICAgIH0pXG4gICAgY29uc29sZS5kaXIoU3dhbClcbn1cblxuLy8gbGV0IHN3YWwgPSBTd2FsLmZpcmU7XG5sZXQgRGxnSWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBEaWFsb2d1ZXtcbiAgICBpZDogbnVtYmVyXG4gICAgaW5wdXRWYWx1ZTogQXJyYXk8RGF0YT5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLmlkID0gRGxnSWQ7XG4gICAgICAgIERsZ0lkKys7XG4gICAgfVxuICAgIGlucHV0RGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCBpbnQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgdmFsdWUgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IGlucHV0SWQgPSBcImV6cHN5LWRsZy1pbnB1dFwiICsgbnVtYmVyO1xuICAgICAgICBsZXQgZG9tID0gbmV3IEFycmF5KClcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfovpPlhaXlr7nor50nKTtcbiAgICAgICAgY29uc29sZS5kaXIoZGxnQ29udGVudClcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbnB1dCl7XG4gICAgICAgICAgICBpZih0eXBlb2YgZGxnQ29udGVudC5pbnB1dCA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW50LnB1c2goZGxnQ29udGVudC5pbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGludCA9IGRsZ0NvbnRlbnQuaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ1BsZWFzZSBzZXQgaW5wdXQgaW4geW91ciBvYmplY3QhJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGxnQ29udGVudC52YWx1ZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodHlwZW9mIGRsZ0NvbnRlbnQudmFsdWUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goZGxnQ29udGVudC52YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBkbGdDb250ZW50LnZhbHVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGludC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhbHVlLnB1c2goJycpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHZhbHVlW2ldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWVbaV0gPSAnJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGludC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0ID0gdGV4dCAgKyBcIjxkaXYgY2xhc3M9J2V6cHN5LWRsZy1pbnB1dC10aXRsZSc+XCIgK2ludFtpXSsgXCI8L2Rpdj5cIiBcbiAgICAgICAgICAgICAgICArIFwiIDxpbnB1dCB0eXBlPSd0ZXh0JyBjbGFzcz0nZXpwc3ktZGxnLWlucHV0JyBuYW1lPSAnXCJcbiAgICAgICAgICAgICAgICArIGlucHV0SWQgK1wiJyBpZD0nXCIgKyBpbnB1dElkICsgXCInIHZhbHVlPSdcIisgdmFsdWVbaV0gKyBcIicgLz48YnI+XCI7XG4gICAgICAgICAgICBudW1iZXIrKztcbiAgICAgICAgICAgIGlucHV0SWQgPSBcImV6cHN5LWRsZy1pbnB1dFwiICsgbnVtYmVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRleHQpXG4gICAgICAgIHJldHVybiBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICBodG1sOiB0ZXh0LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY29uZmlybSxcbiAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY2FuY2VsLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bicsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmVDb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGludC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV6cHN5LWRsZy1pbnB1dFwiK2kpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiBpbnRbaV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxJbnB1dEVsZW1lbnQ+aHRtbERvbSkudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkb20ucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlID0gZG9tO1xuICAgICAgICAgICAgICAgIHJldHVybiBkb21cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAgICAgaWYoZS5pc0NvbmZpcm1lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzKCdudWxsJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBlcnJvckRsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfplJnor6/lr7nor50nLCfplJnor6/kv6Hmga8nKTtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICdlcnJvcidcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaGVscERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfluK7liqnlr7nor50nLCfluK7liqnkv6Hmga8nKTtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICdpbmZvJ1xuICAgICAgICB9KVxuICAgIH1cbiAgICBsaXN0RGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+WIl+ihqOmAieaLqeWvueivnScpXG4gICAgICAgIGxldCBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgZG9tID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuSXNNdWx0aSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyhkbGdDb250ZW50Lmxpc3QpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0LnZhbHVlcyhkbGdDb250ZW50Lmxpc3QpO1xuICAgICAgICAgICAgdGV4dCArPSBcIjxkaXYgY2xhc3M9J2V6cHN5LWRsZy1NdWx0aURpdic+5oyJ5L2PU2hpZnTmiJZDb250cm9s6ZSu6L+b6KGM5aSa6YCJPC9kaXY+XCJcbiAgICAgICAgICAgIHRleHQgKz0gXCI8c2VsZWN0IGlkPSdlenBzeS1kbGctc2VsZWN0MCcgY2xhc3M9J2V6cHN5LWRsZy1tdWx0aVNlbGVjdCBzd2FsMi1zZWxlY3QnIHN0eWxlPSdkaXNwbGF5OiBmbGV4JyBtdWx0aXBsZT0ndHJ1ZSc+XFxuXCI7XG4gICAgICAgICAgICAvLyB0ZXh0ICs9IFwiICAgPG9wdGlvbiB2YWx1ZSBkaXNhYmxlZD5TZWxlY3Q8L29wdGlvbj5cXG5cIlxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBrZXkubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZVtpXSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkwID0gT2JqZWN0LmtleXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTAgPSBPYmplY3QudmFsdWVzKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgPG9wdGdyb3VwIGxhYmVsPSdcIisga2V5W2ldICtcIicgPlxcblwiXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IGtleTAubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCIgICAgICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleTBbal0gK1wiJz5cIisgdmFsdWUwW2pdICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gJzwvb3B0Z3JvdXA+J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleVtpXSArXCInPlwiKyB2YWx1ZVtpXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBsZXQgc2VsZWN0SWQgPSBcImV6cHN5LWRsZy1zZWxlY3RcIiArIG51bWJlclxuICAgICAgICAgICAgICAgIC8vIG51bWJlcisrO1xuICAgICAgICAgICAgICAgIC8vIHRleHQgKz0gXCIgICA8c2VsZWN0IGlkPSdcIisgc2VsZWN0SWQgK1wiJyBjbGFzcz0nc3dhbDItc2VsZWN0JyBzdHlsZT0nZGlzcGxheTogZmxleCc+XFxuXCI7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCArPSBcIiAgIDxvcHRpb24gdmFsdWU9ICdkaXNhYmxlZCc+XCIrIGtleVtpXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIC8vIGlmKHZhbHVlW2ldIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGtleTAgPSBPYmplY3Qua2V5cyh2YWx1ZVtpXSlcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHZhbHVlMCA9IE9iamVjdC52YWx1ZXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgaiA9IDA7aiA8IGtleTAubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICAvLyAgICAge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGV4dCArPSBcIiAgICAgICA8b3B0aW9uIHZhbHVlPSdcIisga2V5MFtqXSArXCInPlwiKyB2YWx1ZTBbal0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNle1xuICAgICAgICAgICAgICAgIC8vICAgICB0ZXh0ICs9IFwiICAgICAgIDxvcHRpb24gdmFsdWU9J1wiKyBrZXlbaV0gK1wiJz5cIisgdmFsdWVbaV0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gdGV4dCArPSAnPC9zZWxlY3Q+XFxuJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IFwiPC9zZWxlY3Q+XCJcblxuICAgICAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgaHRtbDogdGV4dCxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJlQ29uZmlybTogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXpwc3ktZGxnLXNlbGVjdDAnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihodG1sRG9tKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTwoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5zZWxlY3RlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGdyb3VwID0gKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IERhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0Z3JvdXAgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxPcHRHcm91cEVsZW1lbnQ+b3B0Z3JvdXApLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHNlbCA9IE9iamVjdC5rZXlzKGRsZ0NvbnRlbnQubGlzdClcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpIDwgc2VsLmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlenBzeS1kbGctc2VsZWN0XCIraSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZGF0YTogRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkYXRhTmFtZTogc2VsW2ldLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRhdGE6ICg8SFRNTElucHV0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlID0gZG9tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9tXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXMoZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgaW5wdXQ6ICdzZWxlY3QnLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLCAgXG4gICAgICAgICAgICAgICAgaW5wdXRPcHRpb25zOiBkbGdDb250ZW50Lmxpc3QsXG4gICAgICAgICAgICAgICAgaW5wdXRQbGFjZWhvbGRlcjogJ1NlbGVjdCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY2FuY2VsLFxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bicsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiAnZXpwc3ktZGxnLXNlbGVjdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByZUNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3dhbDItc2VsZWN0JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPCg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0Z3JvdXAgPSAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRncm91cCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxPcHRHcm91cEVsZW1lbnQ+b3B0Z3JvdXApLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRWYWx1ZSA9IGRvbTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnRoZW4oZT0+e1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoZS5pc0NvbmZpcm1lZClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXMoZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhcIm51bGxcIik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgcXVlc3REbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn6K+i6Zeu5a+56K+dJywn6K+i6Zeu5L+h5oGvJyk7XG4gICAgICAgIHJldHVybiBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICdxdWVzdGlvbidcbiAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAgICAgaWYoZS5pc0NvbmZpcm1lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ1N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICB3YXJuRGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+W4ruWKqeWvueivnScsJ+W4ruWKqeS/oeaBrycpO1xuICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnXG4gICAgICAgIH0pXG4gICAgfVxuICAgIG1zZ0RsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbWdVcmwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuaW1nVXJsID0gJ2h0dHBzOi8vdW5zcGxhc2guaXQvNDAwLzIwMCdcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbWdXaWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZGxnQ29udGVudC5pbWdXaWR0aCA9IDQwMFxuICAgICAgICBpZihkbGdDb250ZW50LmltZ0hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZGxnQ29udGVudC5pbWdIZWlnaHQgPSAyMDBcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICB3aWR0aDogMS4yICogZGxnQ29udGVudC5pbWdXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodEF1dG86IHRydWUsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICBpbWFnZVVybDogZGxnQ29udGVudC5pbWdVcmwsXG4gICAgICAgICAgICBpbWFnZVdpZHRoOiBkbGdDb250ZW50LmltZ1dpZHRoLFxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IGRsZ0NvbnRlbnQuaW1nSGVpZ2h0LFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAgICAgaWYoZS5pc0NvbmZpcm1lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgRGF0YXtcbiAgICBkYXRhTmFtZTogc3RyaW5nXG4gICAgZGF0YTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGxnQ29udGVudHtcbiAgICB0aXRsZTogc3RyaW5nXG4gICAgY29udGVudD86IHN0cmluZ1xuICAgIGltZ1VybD86IHN0cmluZ1xuICAgIGltZ1dpZHRoPzogbnVtYmVyXG4gICAgaW1nSGVpZ2h0PzogbnVtYmVyXG4gICAgY29uZmlybT86IHN0cmluZ1xuICAgIGNhbmNlbD86IHN0cmluZ1xuICAgIGlucHV0PzogQXJyYXk8c3RyaW5nPiB8IHN0cmluZ1xuICAgIHZhbHVlPzogQXJyYXk8c3RyaW5nPiB8IHN0cmluZ1xuICAgIGxpc3Q/OiBPYmplY3RcbiAgICBJc011bHRpPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGxnSW5pdCgpe1xuICAgIGxldCBkbGcgPSBuZXcgRGlhbG9ndWUoKTtcbiAgICByZXR1cm4gZGxnO1xufSIsImltcG9ydCAqIGFzIGV6VXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6VGltZSBmcm9tICcuL1RpbWUvdGltZSdcbmltcG9ydCAqIGFzIGV6VGltZXIgZnJvbSAnLi9UaW1lL3RpbWVQZXJmb3JtYW5jZSdcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0ICogYXMgZXpSZWN0YW5nbGUgZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9Hcm91cC9ncm91cCdcbmltcG9ydCB7IFN0b3JhZ2UgfSBmcm9tICcuL1N0b3JhZ2Uvc3RvcmFnZSdcbmltcG9ydCB7IFRleHRMaW5lLFRleHRzIH0gZnJvbSAnLi9HcmFwaGljL3RleHQnXG5cblxuXG4vLyBleHBvcnQgeyBBZGpvaW5SZWN0LFJlY3RDZW50ZXIgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2xpbmUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvYXJjJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy90ZXh0J1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2ltYWdlJ1xuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWUnXG5leHBvcnQgKiBmcm9tICcuL0tleXByZXNzL2tleXByZXNzJ1xuLy8gZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9ncmF0aW5nJ1xuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWVQZXJmb3JtYW5jZSdcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MwJ1xuZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZTAnXG5leHBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xuZXhwb3J0IHsgQ2lyY2xlIH0gZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcbmV4cG9ydCB7IExpbmUgfSBmcm9tICcuL0dyYXBoaWMvbGluZSdcbmV4cG9ydCB7IEFyYyB9IGZyb20gJy4vR3JhcGhpYy9hcmMnXG5leHBvcnQgeyBFbGxpcHNlIH0gZnJvbSAnLi9HcmFwaGljL2VsbGlwc2UnXG5leHBvcnQgeyBQb2x5Z29uIH0gZnJvbSAnLi9HcmFwaGljL3BvbHlnb24nXG5leHBvcnQgeyBUZXh0cyB9IGZyb20gJy4vR3JhcGhpYy90ZXh0J1xuZXhwb3J0IHsgSW1nIH0gZnJvbSAnLi9HcmFwaGljL2ltYWdlJ1xuZXhwb3J0IHsgS2V5cHJlc3MgfSBmcm9tICcuL0tleXByZXNzL2tleXByZXNzMCdcbi8vIGV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZSdcbi8vIGV4cG9ydCB7IERpYWxvZ3VlXzB9IGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG5leHBvcnQgeyBHcmF0IH0gZnJvbSAnLi9HcmFwaGljL2dyYXRpbmcnXG5leHBvcnQgeyBUaW1lIH0gZnJvbSAnLi9UaW1lL3RpbWVQZXJmb3JtYW5jZSdcblxuLy8gZXhwb3J0IHsgYW5pbWF0ZSB9IGZyb20gJy4vQW5pbWF0ZS9hbmltYXRlJ1xuLy8gZXhwb3J0IHsgbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG4gXG4vLyBsZXQgRXpwc3lMaXN0ID0gbmV3IEFycmF5KCk7XG5cbmNsYXNzIEV6cHN5IHtcbiAgICByZWFkb25seSBpZDogbnVtYmVyXG4gICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIHJlYWRvbmx5IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgLy8gY3R4TGlzdDogQXJyYXk8Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEPlxuICAgIHByaXZhdGUgc3RvcmFnZTogU3RvcmFnZVxuICAgIGNTdHlsZT86IGNhbnZhc1N0eWxlXG5cbiAgICAvLyBSZWN0YW5nbGU6IFJlY3RhbmdsZVxuXG4gICAgY29uc3RydWN0b3IoaWQ6IG51bWJlcixkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgdGhpcy5jU3R5bGUgPSBjU3R5bGU7XG4gICAgICAgIC8vIHRoaXMuY3R4TGlzdCA9IFtdXG4gICAgICAgIHRoaXMuY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKGRvbSxjU3R5bGUpOyAgICAvL+atpOWkhOWIm+W7umNhbnZhc++8jOWPr+S7heWIm+W7uuS4gOS4qmNhbnZhc++8jOS9huaYr+ebruWJjeaXoOazleS7hea4hemZpOS4gOS4quWbvuW9olxuICAgICAgICAvLyB0aGlzLmN0eExpc3QucHVzaCh0aGlzLmN0eClcbiAgICAgICAgLy8gY29uc29sZS5kaXIodGhpcy5jdHgpXG4gICAgfVxuXG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuY3R4TGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgIGxldCBjID0gdGhpcy5jdHhMaXN0W2ldLmNhbnZhcztcbiAgICAgICAgLy8gICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGhcbiAgICAgICAgLy8gICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBlbCA9IHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3RcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgICAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGMuc3R5bGUubGVmdCA9ICgody1jU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIHRoaXMuY1N0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IGNTdHlsZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogY1N0eWxlLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCl7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QpXG4gICAgICAgIC8vIHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGMud2lkdGggPSB0aGlzLmNTdHlsZS53aWR0aFxuICAgICAgICBjLmhlaWdodCA9IHRoaXMuY1N0eWxlLmhlaWdodFxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KHRoaXMuY3R4KVxuICAgIH1cblxuICAgIC8vIHNldEFuaW1hdGVDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy5jdHhMaXN0Lmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGxldCBjID0gdGhpcy5jdHhMaXN0W2ldLmNhbnZhcztcbiAgICAvLyAgICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGhcbiAgICAvLyAgICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodFxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgYWRkKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdfEdyb3VwKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBzdCA9IHRoaXMuc3RvcmFnZVxuICAgICAgICBsZXQgbmFtZSA9IHN0LmdldEVsZW1lbnRzTmFtZShlbClcbiAgICAgICAgbGV0IGluZGV4ID0gc3Quc2VhcmNoRWxlbWVudHNOYW1lKG5hbWUpXG4gICAgICAgIFxuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzfHxlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChlbClcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UucHVzaChlbClcbiAgICAgICAgICAgICAgICBlbC5jdHggPSBjdHg7XG4gICAgICAgICAgICAgICAgZWwuc3RvcmFnZSA9IHRoaXMuc3RvcmFnZVxuICAgICAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBlID0gZWxbaV1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZChlKVxuICAgICAgICAgICAgICAgIC8vIGVsW2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAgICAgIC8vIGVsW2ldLnN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAvLyBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbFtpXSxjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmUoZWw6IEVsZW1lbnRzfEVsZW1lbnRzW118R3JvdXApXG4gICAge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgbGV0IGMgID0gY3R4LmNhbnZhc1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShlbCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTsgICBcbiAgICB9XG5cbiAgICAvLyBhbGlhc2luZyhzdHlsZTogc3RyaW5nKXtcbiAgICAvLyAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gc3R5bGVcbiAgICAvLyB9XG5cbiAgICBhbmltYXRlKGVsOiBFbGVtZW50cyxmdW5jOiBGdW5jdGlvbixkZWxheTogbnVtYmVyKXtcbiAgICAgICAgLy8gZWwuY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gZWwucmVtb3ZlKCk7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcbiAgICAgICAgLy8gbGV0IGN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyh0aGlzLmRvbSx0aGlzLmNTdHlsZSk7IFxuICAgICAgICAvLyB0aGlzLmN0eExpc3QucHVzaChjdHgpO1xuXG4gICAgICAgIChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSgxKXtcbiAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKGRlbGF5KTtcbiAgICAgICAgICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIHRoYXQuYWRkKGVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKVxuXG4gICAgICAgIC8vIHdpbmRvdy5zZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAvLyAgICAgLy8gbGV0IGEgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAvLyAgICAgLy8gZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAvLyAgICAgZXpUaW1lci5zbGVlcChkZWxheSkudGhlbigoKT0+e1xuICAgICAgICAvLyAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIC8vICAgICAgICAgdGhhdC5hZGQoZWwpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHBlcmZvcm1hbmNlLm5vdygpIC0gYSAtIDEwMClcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfSwwKVxuXG5cbiAgICAgICAgLy8gKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCAxMDtpKyspXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgZnVuYygpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgLy8gICAgICAgICBhd2FpdCBlelRpbWVyLnNsZWVwKGRlbGF5KVxuICAgICAgICAvLyAgICAgICAgIGF3YWl0IGVsLnJlbW92ZSgpXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgdGhhdC5hZGQoZWwpO1xuICAgICAgICAvLyAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5wdXNoKGVsKVxuICAgICAgICAvLyAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAvLyAgICAgICAgIC8vIGV6SnVkZ2UuanVkZ2VBbmltYXRlKGVsLGN0eCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gYXdhaXQgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSkoKVxuICAgIH1cblxuICAgIHNldFRleHRMaW5lKHRleHRMaW5lOiBUZXh0TGluZSlcbiAgICB7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgbGV0IHN0ID0gdGhpcy5zdG9yYWdlXG4gICAgICAgIHN0LnRleHRMaW5lID0gdGV4dExpbmVcbiAgICAgICAgaWYodGV4dExpbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRBKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0LkVsZW1lbnRzTGlzdC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdC5FbGVtZW50c0xpc3RbaV0udGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LkVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XSBpbnN0YW5jZW9mIFRleHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XS50ZXh0TGluZS50ZXh0QSA9IHRleHRMaW5lLnRleHRBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dExpbmUudGV4dEIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc3QuRWxlbWVudHNMaXN0Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihzdC5FbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBUZXh0cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0LkVsZW1lbnRzTGlzdFtpXS50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8ICg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3QubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdLnRleHRMaW5lLnRleHRCID0gdGV4dExpbmUudGV4dEJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3QucmVEcmF3KHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBjbGVhcigpe1xuICAgICAgICAvLyBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgLy8gICAgIGxldCBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgLy8gICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgICAgLy8gICAgICAgICB0aGF0LmRvbS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgLy8gICAgICAgICBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJlc29sdmUoMClcbiAgICAgICAgLy8gfSlcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGMud2lkdGggPSB0aGlzLmNTdHlsZS53aWR0aFxuICAgICAgICBjLmhlaWdodCA9IHRoaXMuY1N0eWxlLmhlaWdodFxuICAgIH1cblxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gcHVzaEV6cHN5TGlzdChlejogRXpwc3kpe1xuLy8gICAgIGxldCBudW0gPSBlei5pZDtcbi8vICAgICBFenBzeUxpc3RbbnVtXSA9IGV6O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKSB7XG4gICAgbGV0IGV6ID0gbmV3IEV6cHN5KGV6VXRpbHMuQ291bnQoKSxkb20sY1N0eWxlKTtcbiAgICAvLyBwdXNoRXpwc3lMaXN0KGV6KTtcbiAgICAvLyBjb25zb2xlLmRpcihFenBzeUxpc3QpO1xuICAgIHJldHVybiBlejtcbn0iXSwibmFtZXMiOlsiZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlIiwiZXpKdWRnZS5qdWRnZUVsZW1lbnQiLCJlelRpbWUuZGVsYXlfZnJhbWUiLCJuYW1lSWQiLCJnZXRQcm9ncmVzc1N0ZXBzIiwiaXNWaXNpYmxlIiwiZ2V0SW5wdXQiLCJyZXNldFZhbGlkYXRpb25NZXNzYWdlIiwiaW5pdCIsImRvbS5nZXRBY3Rpb25zIiwiZG9tLmdldExvYWRlciIsImRvbS5oaWRlIiwiZG9tLnNob3ciLCJkb20uYXBwbHlDdXN0b21DbGFzcyIsImRvbS5zZXRJbm5lckh0bWwiLCJkb20uZ2V0Q29uZmlybUJ1dHRvbiIsImRvbS5nZXREZW55QnV0dG9uIiwiZG9tLmdldENhbmNlbEJ1dHRvbiIsImRvbS5yZW1vdmVDbGFzcyIsImRvbS5hZGRDbGFzcyIsImRvbS50b2dnbGUiLCJkb20uZ2V0Q29udGFpbmVyIiwiZG9tLmdldFBvcHVwIiwiZG9tLmdldERpcmVjdENoaWxkQnlDbGFzcyIsImRvbS5mb2N1c0lucHV0IiwiZG9tLmdldElucHV0IiwiZG9tLmdldEh0bWxDb250YWluZXIiLCJkb20ucGFyc2VIdG1sVG9Db250YWluZXIiLCJkb20uZ2V0Rm9vdGVyIiwiZG9tLmdldENsb3NlQnV0dG9uIiwiZG9tLmdldEljb24iLCJkb20uc2V0U3R5bGUiLCJkb20uZ2V0SW1hZ2UiLCJkb20uYXBwbHlOdW1lcmljYWxTdHlsZSIsImRvbS5nZXRQcm9ncmVzc1N0ZXBzIiwiZG9tLmdldFRpdGxlIiwiZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlIiwiYWRkQ2xhc3NlcyIsImRvbS5pc1Zpc2libGUiLCJkb20uaW5pdCIsImRvbS5zdGF0ZXMiLCJkb20ubWVhc3VyZVNjcm9sbGJhciIsImRvbS5oYXNDbGFzcyIsImRvbS5pc1Njcm9sbGFibGUiLCJkb20uaXNNb2RhbCIsImRvbS5pc1RvYXN0IiwiZG9tLmFuaW1hdGlvbkVuZEV2ZW50IiwiZG9tLmhhc0Nzc0FuaW1hdGlvbiIsImRvbS5hbGxCdXR0b25zQXJlSGlkZGVuIiwiZG9tVXRpbHMuaXNWaXNpYmxlIiwiZG9tLmdldEZvY3VzYWJsZUVsZW1lbnRzIiwiZG9tLnJlbmRlciIsInRoaXMiLCJkb20uZ2V0VGltZXJQcm9ncmVzc0JhciIsImRvbS5hbmltYXRlVGltZXJQcm9ncmVzc0JhciIsImV6Q2FudmFzLmNyZWF0ZUNhbnZhcyIsImV6VXRpbHMuQ291bnQiXSwibWFwcGluZ3MiOiJBQUNBLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztTQUVBLEtBQUs7SUFDakIsT0FBTyxPQUFPLEVBQUUsQ0FBQztBQUNyQjs7U0NFZ0IsWUFBWSxDQUFDLEdBQWdCLEVBQUMsTUFBb0I7SUFDOUQsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7SUFLeEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQzdCLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN2QixD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Q0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsSUFBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxFQUN2TztRQUNJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLElBQUksR0FBRyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO1NBQ0c7UUFDQSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQjtJQUVELE9BQU8sR0FBRyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXpDLE9BQU8sT0FBTyxDQUFDO0FBRW5CLENBQUM7U0FFZSxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFrQixFQUFDLElBQWU7O0lBRTNELElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDbEYsSUFBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsSUFBRSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBQyxFQUFFLEVBQy9DO1FBQ0ksT0FBTyxJQUFJLENBQUM7S0FDZjtTQUVEO1FBQ0ksT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO1NBRWUsUUFBUSxDQUFDLEVBQWEsdUJBQXFCLENBQVMsRUFBQyxDQUFTOzs7O0lBSXRFLElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBQztZQUNGLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hCLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEdBQUMsQ0FBQztZQUN0QixLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNwQixNQUFNLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxHQUFDLENBQUM7U0FDL0I7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLE9BQU8sQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZCdEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxFQUFhLEVBQUMsQ0FBUyxFQUFDLENBQVM7O0lBRXZELElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ2pCLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQztZQUN2QixLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQixNQUFNLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxHQUFDLENBQUM7U0FDaEM7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsU0FBUyxDQUFDLElBQWUsRUFBQyxDQUFTLEVBQUMsQ0FBUzs7SUFFekQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3RDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFDLEdBQUcsR0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN0QixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQTtJQUNsQyxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsV0FBVyxDQUFDLElBQWU7O0lBRXZDLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2hELElBQUcsSUFBSSxLQUFLLENBQUMsRUFDYjtRQUNJLE9BQU8sS0FBSyxDQUFBO0tBQ2Y7U0FDRztRQUNBLE9BQU8sSUFBSSxDQUFBO0tBQ2Q7QUFDTCxDQUFDO1NBRWUsWUFBWTtBQUU1QixDQUFDO1NBRWUsUUFBUSxDQUFDLElBQWU7SUFDcEMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN2QixDQUFDO1NBRWUsU0FBUyxDQUFDLElBQWU7SUFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtBQUMxQyxDQUFDO1NBRWUsT0FBTyxDQUFDLElBQWU7SUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtBQUN2QixDQUFDO1NBRWUsU0FBUyxDQUFDLElBQWU7SUFDckMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtBQUMzQyxDQUFDO1NBRWUsU0FBUyxDQUFDLEtBQWdCLEVBQUMsS0FBZ0I7SUFDdkQsSUFBSSxPQUFPLENBQUM7SUFDWixJQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQztJQUNwQixJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQTtJQUNYLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDMUIsT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBQy9DLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxRQUFRLENBQUMsSUFBZSxFQUFDLElBQWE7SUFDbEQsSUFBRyxJQUFJLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFDakQ7UUFDSSxJQUFJLEdBQUcsTUFBTSxDQUFBO0tBQ2hCO0lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDdEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNmLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUI7UUFDRCxLQUFLLEVBQUU7WUFDSCxJQUFJLEVBQUUsSUFBSTtTQUNiO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlLEVBQUMsU0FBa0IsRUFBQyxNQUFlO0lBQ3hFLElBQUcsTUFBTSxLQUFLLFNBQVMsSUFBSSxPQUFPLE1BQU0sS0FBSyxRQUFRLEVBQ3JEO1FBQ0ksTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNmLElBQUcsU0FBUyxLQUFLLFNBQVMsSUFBSSxPQUFPLFNBQVMsS0FBSyxRQUFRLEVBQzNEO1lBQ0ksU0FBUyxHQUFHLENBQUMsQ0FBQztTQUNqQjtLQUNKO0lBQ0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDdEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNmLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUI7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNqQjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sS0FBSyxDQUFBO0FBQ2hCOztBQ2hyQkEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQztNQUVGLE1BQU8sU0FBUSxRQUFRO0lBQ3ZCLElBQUksR0FBZTtRQUN4QixJQUFJLEVBQUUsUUFBUSxHQUFHQSxRQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2xDLFNBQVMsRUFBRUEsUUFBTTtLQUNwQixDQUFBO0lBRUQsWUFBWSxJQUFnQjtRQUN4QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7O1FBRXBCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0NBQ0o7U0FFZSxVQUFVLENBQUMsTUFBYyxFQUFDLEdBQTZCO0lBQ25FLElBQUksRUFBRSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDckIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ2hCLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDcEMsVUFBVSxDQUFDLE1BQU0sRUFBQyxHQUFHLENBQUMsQ0FBQztJQUN2QixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDYixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO1NBRWUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQXlCLEVBQUMsS0FBYTtJQUNsRSxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQztRQUNwQixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUDtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxLQUFLO1lBQ1gsTUFBTSxFQUFHLE1BQU07U0FDbEI7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLE1BQU0sQ0FBQTtBQUNqQjs7QUNwREEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQztNQUVGLElBQUssU0FBUSxRQUFRO0lBQ3JCLElBQUksR0FBZTtRQUN4QixJQUFJLEVBQUUsTUFBTSxHQUFHQSxRQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2hDLFNBQVMsRUFBRUEsUUFBTTtLQUNwQixDQUFBO0lBQ0QsWUFBWSxJQUFjO1FBQ3RCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTs7UUFFcEIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2FBQ2YsQ0FBQTtTQUNKO1FBRURBLFFBQU0sRUFBRSxDQUFBO0tBQ1g7Q0FDSjtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtTQUVnQixRQUFRLENBQUMsSUFBVSxFQUFDLEdBQTZCO0lBQzdELElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzNCLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUE7SUFDcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2IsT0FBTyxJQUFJLENBQUE7QUFDZixDQUFDO1NBRWUsU0FBUyxDQUFDLEVBQXdCOztJQUU5QyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUN6QixPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO1NBRWUsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxDQUFnQyxFQUFDLEdBQWMsRUFBQyxLQUFlLEVBQUMsT0FBaUIsRUFBQyxRQUFpQjs7SUFFdkksSUFBRyxRQUFRLEtBQUssU0FBUyxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFDekQ7UUFDSSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBRyxPQUFPLEtBQUssU0FBUyxJQUFJLE9BQU8sT0FBTyxLQUFLLFNBQVMsRUFDeEQ7WUFFSSxJQUFHLEtBQUssS0FBSyxTQUFTLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFDO2dCQUNqRCxLQUFLLEdBQUcsS0FBSyxDQUFDO2dCQUNkLElBQUcsR0FBRyxLQUFLLFNBQVMsRUFBQztvQkFDakIsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNsQjthQUNKO1NBQ0o7S0FDSjtJQUVELElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFFdkIsSUFBRyxPQUFPLEtBQUssS0FBSyxFQUNwQjtRQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBRTtZQUNoQixLQUFLLEVBQUU7Z0JBQ0gsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLElBQUk7YUFDYjtTQUNKLENBQUMsQ0FBQTtRQUNGLElBQUcsS0FBSyxLQUFLLEtBQUssRUFDbEI7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQUM7Z0JBQy9CLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQztvQkFDZixLQUFLLEVBQUU7d0JBQ0gsQ0FBQyxFQUFFLENBQUM7d0JBQ0osQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7d0JBQ2YsSUFBSSxFQUFFLElBQUk7d0JBQ1YsSUFBSSxFQUFFLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7cUJBQ3hCO2lCQUNKLENBQUMsQ0FBQTthQUNMO1NBQ0o7YUFDRztZQUNBLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztnQkFDL0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksSUFBSSxDQUFFO29CQUNoQixLQUFLLEVBQUU7d0JBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7d0JBQ2YsQ0FBQyxFQUFFLENBQUM7d0JBQ0osSUFBSSxFQUFFLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUM7d0JBQ3JCLElBQUksRUFBRSxJQUFJO3FCQUNiO2lCQUNKLENBQUMsQ0FBQTthQUNMO1NBQ0o7S0FDSjtTQUNHO1FBQ0EsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELElBQUcsS0FBSyxLQUFLLEtBQUssRUFDbEI7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ2hDO2dCQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQTthQUN4RTtTQUNKO2FBQ0c7WUFDQSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFLEVBQ2hDO2dCQUNJLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLElBQUksR0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxJQUFJLENBQUMsRUFBQyxRQUFRLENBQUMsQ0FBQTthQUN4RTtTQUNKO0tBQ0o7SUFJRCxJQUFJLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztTQUVlLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksQ0FBZ0MsRUFBQyxRQUFpQjs7SUFFeEYsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksR0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDakUsSUFBRyxRQUFRLEdBQUMsVUFBVSxJQUFFLFFBQVEsS0FBRyxTQUFTLEVBQzVDO1FBQ0ksUUFBUSxHQUFHLFVBQVUsR0FBQyxFQUFFLENBQUM7S0FDNUI7SUFDRCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBQyxRQUFRLENBQUMsQ0FBQTtJQUN6QyxJQUFJLEVBQUUsR0FBRyxRQUFRLElBQUUsSUFBSSxHQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQTtJQUNyQyxJQUFJLEVBQUUsR0FBRyxRQUFRLElBQUUsSUFBSSxHQUFDLENBQUMsQ0FBQyxHQUFDLFVBQVUsQ0FBQTs7SUFFckMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1YsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN2QixPQUFNLENBQUMsR0FBQyxHQUFHLEVBQ1g7UUFDSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUM7WUFDZixLQUFLLEVBQUU7Z0JBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBQyxFQUFFLEdBQUMsQ0FBQztnQkFDVCxDQUFDLEVBQUUsQ0FBQyxHQUFDLEVBQUUsR0FBQyxDQUFDO2dCQUNULElBQUksRUFBRSxDQUFDLEdBQUMsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUM7Z0JBQ2hCLElBQUksRUFBRSxDQUFDLEdBQUMsRUFBRSxJQUFFLENBQUMsR0FBQyxDQUFDLENBQUM7YUFDbkI7U0FDSixDQUFDLENBQUE7UUFDRixDQUFDLElBQUUsQ0FBQyxDQUFDO0tBQ1I7SUFDRCxJQUFJLFdBQVcsR0FBRyxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNqQyxPQUFPLFdBQVcsQ0FBQTtBQUN0QixDQUFDO0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoTEEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQztNQUVGLEdBQUksU0FBUSxRQUFRO0lBQ3BCLElBQUksR0FBZTtRQUN4QixJQUFJLEVBQUUsS0FBSyxHQUFHQSxRQUFNLENBQUMsUUFBUSxFQUFFO1FBQy9CLFNBQVMsRUFBRUEsUUFBTTtLQUNwQixDQUFBO0lBQ0QsWUFBWSxJQUFhO1FBQ3JCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTs7UUFFcEIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2FBQ2YsQ0FBQTtTQUNKO1FBRURBLFFBQU0sRUFBRSxDQUFBO0tBQ1g7Q0FDSjtTQUVlLE9BQU8sQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDMUQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixJQUFHLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUNwRTtRQUNJLFlBQVksQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7U0FDRztRQUNBLFdBQVcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7S0FDeEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFFRCxTQUFTLFlBQVksQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDeEQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDVixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDYixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDcEIsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2IsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkQsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7SUFDZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3RFLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFBO0lBQ3hCLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNaLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFDLFVBQVUsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFFcEIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0FBQ25CLENBQUM7U0FFZSxRQUFRLENBQUMsR0FBUSxFQUFDLFNBQWtCLEVBQUMsTUFBZTs7SUFFaEUsSUFBRyxNQUFNLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFDckQ7UUFDSSxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ2YsSUFBRyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFDM0Q7WUFDSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7O0lBS0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUM7UUFDZixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7U0FDekI7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNqQjtLQUNKLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLE9BQU8sQ0FBQyxHQUFRLEVBQUMsSUFBYTtJQUMxQyxJQUFHLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUNqRDtRQUNJLElBQUksR0FBRyxNQUFNLENBQUE7S0FDaEI7SUFFRCxJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQztRQUNmLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDZCxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2QsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNkLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdEIsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSztTQUN6QjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJO1NBQ2I7S0FDSixDQUFDLENBQUE7SUFFRixPQUFPLElBQUksQ0FBQTtBQUNmOztBQzlIQSxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO01BRUYsT0FBUSxTQUFRLFFBQVE7SUFDeEIsSUFBSSxHQUFlO1FBQ3hCLElBQUksRUFBRSxTQUFTLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDbkMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQWlCO1FBQ3pCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTs7UUFFcEIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNULElBQUksRUFBRSxNQUFNO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2dCQUNkLFNBQVMsRUFBRSxDQUFDO2FBQ2YsQ0FBQTtTQUNKO1FBRURBLFFBQU0sRUFBRSxDQUFBO0tBQ1g7Q0FDSjtTQUVlLFdBQVcsQ0FBQyxPQUFnQixFQUFDLEdBQTZCOzs7O0lBSXRFLElBQUksRUFBRSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUE7SUFDdEIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7SUFDbkQsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNsQixHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsSUFBSSxJQUFJLEVBQzFDOzs7UUFHSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDdEU7SUFDRCxVQUFVLENBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDYixPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsUUFBUSxDQUFDLE9BQWdCLEVBQUMsSUFBYTtJQUNuRCxJQUFHLElBQUksS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUNqRDtRQUNJLElBQUksR0FBRyxNQUFNLENBQUE7S0FDaEI7SUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztRQUN2QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1NBQ3ZCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLElBQUk7U0FDYjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sUUFBUSxDQUFBO0FBQ25CLENBQUM7U0FFZSxTQUFTLENBQUMsT0FBZ0IsRUFBQyxTQUFrQixFQUFDLE1BQWU7SUFDekUsSUFBRyxNQUFNLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFDckQ7UUFDSSxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ2YsSUFBRyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFDM0Q7WUFDSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztRQUN2QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2xCLENBQUMsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNwQixFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1NBQ3ZCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsU0FBUyxFQUFFLFNBQVM7WUFDcEIsTUFBTSxFQUFFLE1BQU07U0FDakI7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLFFBQVEsQ0FBQTtBQUNuQjs7QUM3RkEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQztNQUVGLE9BQVEsU0FBUSxRQUFRO0lBQ3hCLElBQUksR0FBZTtRQUN4QixJQUFJLEVBQUUsU0FBUyxHQUFHQSxRQUFNLENBQUMsUUFBUSxFQUFFO1FBQ25DLFNBQVMsRUFBRUEsUUFBTTtLQUNwQixDQUFBO0lBQ0QsWUFBWSxJQUFpQjtRQUN6QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7O1FBRXBCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0NBQ0o7U0FFZSxXQUFXLENBQUMsT0FBZ0IsRUFBQyxHQUE2QjtJQUN0RSxJQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFBO0lBQ3RCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQztJQUNaLElBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQ2hDO1FBQ0ksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQTtLQUM1QztTQUNHO1FBQ0EsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFBO0tBQ3JCO0lBQ0QsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFBO0lBQ2YsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDN0IsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsRUFBQyxDQUFDLEVBQUUsRUFDekI7UUFDSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2hDO0lBQ0QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUM3QixVQUFVLENBQUMsT0FBTyxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3ZCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNiLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxTQUFTLENBQUMsT0FBZ0IsRUFBQyxTQUFrQixFQUFDLE1BQWU7SUFDekUsSUFBRyxNQUFNLEtBQUssU0FBUyxJQUFJLE9BQU8sTUFBTSxLQUFLLFFBQVEsRUFDckQ7UUFDSSxNQUFNLEdBQUcsTUFBTSxDQUFBO1FBQ2YsSUFBRyxTQUFTLEtBQUssU0FBUyxJQUFJLE9BQU8sU0FBUyxLQUFLLFFBQVEsRUFDM0Q7WUFDSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO1NBQ2pCO0tBQ0o7SUFDRCxJQUFJLFFBQVEsR0FBRyxJQUFJLE9BQU8sQ0FBQztRQUN2QixLQUFLLEVBQUU7WUFDSCxFQUFFLEVBQUUsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3BCLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7U0FDdkI7UUFDRCxLQUFLLEVBQUU7WUFDSCxTQUFTLEVBQUUsU0FBUztZQUNwQixNQUFNLEVBQUUsTUFBTTtTQUNqQjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sUUFBUSxDQUFBO0FBQ25CLENBQUM7U0FFZSxRQUFRLENBQUMsT0FBZ0IsRUFBQyxJQUFhO0lBQ25ELElBQUcsSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQ2pEO1FBQ0ksSUFBSSxHQUFHLE1BQU0sQ0FBQTtLQUNoQjtJQUNELElBQUksUUFBUSxHQUFHLElBQUksT0FBTyxDQUFDO1FBQ3ZCLEtBQUssRUFBRTtZQUNILEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDcEIsRUFBRSxFQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtTQUN2QjtRQUNELEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxJQUFJO1NBQ2I7S0FDSixDQUFDLENBQUE7SUFDRixPQUFPLFFBQVEsQ0FBQTtBQUNuQjs7QUNsRkEsSUFBSUEsUUFBTSxHQUFHLENBQUMsQ0FBQztNQUVGLEtBQU0sU0FBUSxRQUFRO0lBQ3RCLElBQUksR0FBZTtRQUN4QixJQUFJLEVBQUUsTUFBTSxHQUFHQSxRQUFNLENBQUMsUUFBUSxFQUFFO1FBQ2hDLFNBQVMsRUFBRUEsUUFBTTtLQUNwQixDQUFBO0lBQ0QsWUFBWSxJQUFjO1FBQ3RCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTs7UUFFcEIsSUFBRyxJQUFJLENBQUMsS0FBSyxFQUNiO1lBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQzNCO2FBQ0c7WUFDQSxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNULFFBQVEsRUFBRSxNQUFNO2dCQUNoQixXQUFXLEVBQUUsUUFBUTtnQkFDckIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLFNBQVMsRUFBRSxRQUFRO2FBQ3RCLENBQUE7U0FDSjtRQUVELElBQUcsSUFBSSxDQUFDLFFBQVEsRUFDaEI7WUFDSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7U0FDakM7YUFDRztZQUNBLElBQUksQ0FBQyxRQUFRLEdBQUc7Z0JBQ1osS0FBSyxFQUFFLE9BQU87Z0JBQ2QsS0FBSyxFQUFFLFlBQVk7YUFDdEIsQ0FBQTtTQUNKO1FBRURBLFFBQU0sRUFBRSxDQUFBO0tBQ1g7SUFDRCxXQUFXLENBQUMsUUFBa0I7UUFDMUIsSUFBRyxRQUFRLEVBQ1g7WUFDSSxJQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQ2pCO2dCQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7YUFDdkM7WUFDRCxJQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQ2pCO2dCQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7YUFDdkM7U0FDSjtLQUNKO0NBQ0o7U0FFZSxRQUFRLENBQUMsSUFBVyxFQUFDLEdBQTZCO0lBRTlELEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNWLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTs7SUFHZixHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUE7SUFFdEMsY0FBYyxDQUFDLElBQUksRUFBQyxHQUFHLENBQUMsQ0FBQTtJQUV4QixlQUFlLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRXpCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNmLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNiLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLE1BQU0sQ0FBQyxJQUFjO0lBQ2pDLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUNiLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUNqQztRQUNJLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDbkI7SUFDRCxPQUFPLElBQUksQ0FBQTtBQUNmLENBQUM7U0FFZSxNQUFNLENBQUMsR0FBVyxFQUFDLElBQVksRUFBQyxHQUFZO0lBQ3hELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQUViLElBQUcsR0FBRyxLQUFLLFNBQVMsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUNqQztRQUNJLEdBQUcsR0FBRyxDQUFDLENBQUM7S0FDWDtJQUVELEtBQUksSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxHQUFHLEVBQUMsQ0FBQyxFQUFFLEVBQ3JCO1FBQ0ksSUFBSSxJQUFJLElBQUksQ0FBQTtLQUNmO0lBQ0QsSUFBSSxJQUFJLEdBQUcsQ0FBQTtJQUVYLE9BQU8sSUFBSSxDQUFBO0FBQ2YsQ0FBQztTQUVlLEtBQUssQ0FBQyxJQUFZLEVBQUMsSUFBWTtJQUMzQyxJQUFJLE1BQU0sR0FBRyxLQUFLLENBQUE7SUFDbEIsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsT0FBTyxNQUFNLENBQUE7QUFDakIsQ0FBQztTQUVlLE9BQU8sQ0FBQyxHQUFXLEVBQUMsS0FBYSxFQUFDLEtBQWE7SUFDM0QsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFBO0lBRWYsTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDO0lBRWxELE9BQU8sTUFBTSxDQUFBO0FBQ2pCOztBQzVHQSxJQUFJQSxRQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWYsTUFBTSxJQUFJO0lBQ04sQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0NBQ1o7QUFFRCxNQUFNLFVBQVU7SUFDWixTQUFTLENBQVE7SUFDakIsS0FBSyxDQUFRO0lBQ2IsTUFBTSxDQUFRO0NBQ2pCO01BRVksR0FBSSxTQUFRLFFBQVE7SUFDcEIsSUFBSSxHQUFlO1FBQ3hCLElBQUksRUFBRSxLQUFLLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDL0IsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxHQUFHLENBQU07SUFDVCxPQUFPLENBQVk7SUFDbkIsUUFBUSxDQUFVO0lBQ2xCLFlBQVksSUFBYTtRQUNyQixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN4QixJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUE7UUFDcEIsSUFBRyxJQUFJLENBQUMsR0FBRyxLQUFLLFNBQVMsRUFDekI7WUFDSSxJQUFJLENBQUMsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1lBQ25CLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUE7WUFDdEIsQ0FBQyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7U0FDaEI7YUFDRztZQUNBLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtTQUN0QjtRQUNELElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFBOzs7Ozs7Ozs7O1FBVXJCLElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUM5QjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssU0FBUyxFQUM5QjtZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNyQjtRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUNsQztZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDO1NBQ3RDO1FBQ0QsSUFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxTQUFTLEVBQ25DO1lBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUM7U0FDeEM7UUFDRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsRUFDakM7WUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztTQUNyQztRQUNELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxFQUNsQztZQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFBO1NBQ3RDO1FBQ0QsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDOzs7Ozs7OztRQVlaQSxRQUFNLEVBQUUsQ0FBQTtLQUNYO0lBQ0QsSUFBSTtRQUNBLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUE7UUFDbkIsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN4QyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzVCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDNUIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFDO1FBQzlCLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7O0tBRzdFO0lBQ0QsTUFBTTtRQUNGLElBQUksR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1lBQ2QsS0FBSyxFQUFFO2dCQUNILEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQ25CLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2YsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDZixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO2dCQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2dCQUN6QixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqQixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO2dCQUN6QixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPO2FBQzlCO1NBQ0osQ0FBQyxDQUFBOztRQUVGLEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ25CLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNULEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUNoRDtZQUNJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUM7WUFDdkgsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDM0IsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3JEO1FBQ0QsT0FBTyxHQUFHLENBQUM7S0FDZDtJQUNELE9BQU87UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7S0FDZDtJQUNELFlBQVk7O1FBRVIsSUFBSSxHQUFHLEdBQUcsSUFB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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJMLENBQUM7U0FHZSxlQUFlLENBQUMsRUFBWSxFQUFDLEdBQTZCO0lBQ3RFLElBQUcsRUFBRSxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQ3pCO1FBQ0ksRUFBRSxDQUFDLEtBQUssR0FBRztZQUNQLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxRQUFRO1lBQ3JCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLFNBQVMsRUFBRSxRQUFRO1NBQ3RCLENBQUE7S0FDSjtJQUNELElBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxFQUNsQztRQUNJLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ3hDO0lBQ0QsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNsQixJQUFHLEVBQUUsQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEVBQUUsQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFDO1FBRTNDLEdBQUcsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztRQUN4QixHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDdkU7U0FDRztRQUNBLElBQUcsRUFBRSxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksRUFBRSxDQUFDLE1BQU0sS0FBSyxTQUFTLEVBQUM7WUFDL0MsR0FBRyxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQzVCLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVB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QUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMzRTtBQUNMLENBQUM7U0FFZSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQWtCLEVBQUMsRUFBWTtJQUNoRSxJQUFHLEVBQUUsWUFBWSxTQUFTLEVBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRSxJQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsRUFDL0M7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBRUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFHLEVBQUUsS0FBSyxFQUFFLEVBQ1o7WUFDSSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFBRSxHQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUE7WUFDeEMsSUFBRyxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUU7YUFDM0I7Z0JBQ0ksT0FBTyxJQUFJLENBQUE7YUFDZDtpQkFDRztnQkFDQSxPQUFPLEtBQUssQ0FBQTthQUNmO1NBQ0o7YUFDRztZQUNBLElBQUksRUFBRSxHQUFHLENBQUMsRUFBRSxHQUFDLEVBQUUsS0FBRyxFQUFFLEdBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtZQUN4QyxJQUFHLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxFQUFFLEdBQUMsRUFBRTthQUMzQjtnQkFDSSxPQUFPLElBQUksQ0FBQTthQUNkO2lCQUNHO2dCQUNBLE9BQU8sS0FBSyxDQUFBO2FBQ2Y7U0FDSjtLQUVKO1NBQ0ksSUFBRyxFQUFFLFlBQVksR0FBRyxFQUN6QixDQUVDO1NBQ0ksSUFBRyxFQUFFLFlBQVksT0FBTyxFQUM3QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDckUsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRSxJQUFHLENBQUMsSUFBSSxDQUFDLEVBQ1Q7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxPQUFPLEVBQzdCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNiLElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxFQUFFLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtRQUNwQixJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QyxLQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFD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Q1IsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsT0FBTztJQUNYLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLFNBQVM7SUFDYixFQUFFLEVBQUUsS0FBSztJQUNULEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLFVBQVU7SUFDZCxFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxLQUFLO0lBQ1QsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxJQUFJO0lBQ1IsRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLE9BQU87SUFDWCxFQUFFLEVBQUUsU0FBUztJQUNiLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLFFBQVE7SUFDWixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxNQUFNO0lBQ1YsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxNQUFNO0lBQ1YsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLGFBQWE7SUFDbEIsR0FBRyxFQUFFLFFBQVE7SUFDYixHQUFHLEVBQUUsY0FBYztJQUNuQixHQUFHLEVBQUUsYUFBYTtJQUNsQixHQUFHLEVBQUUsWUFBWTtJQUNqQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsR0FBRyxFQUFFLElBQUk7SUFDVCxHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsR0FBRyxFQUFFLElBQUk7SUFDVCxHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsR0FBRyxFQUFFLElBQUk7SUFDVCxHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLEtBQUs7SUFDVixHQUFHLEVBQUUsS0FBSztJQUNWLEdBQUcsRUFBRSxLQUFLO0lBQ1YsR0FBRyxFQUFFLEtB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QyxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sV0FBVyxHQUFHLENBQUMsTUFBTSxFQUFFLFNBQVMsS0FBSztBQUNsRCxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBQztBQUN2QyxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsU0FBUyxLQUFLO0FBQzFELEVBQUUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUM7QUFDN0MsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM5QyxJQUFJLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsRUFBRTtBQUM1QyxNQUFNLE9BQU8sVUFBVSxDQUFDLENBQUMsQ0FBQztBQUMxQixLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLG1CQUFtQixHQUFHLENBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEtBQUs7QUFDOUQsRUFBRSxJQUFJLEtBQUssS0FBSyxDQUFDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtBQUN0QyxJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFDO0FBQzNCLEdBQUc7QUFDSCxFQUFFLElBQUksS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDdEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLE9BQU8sS0FBSyxLQUFLLFFBQVEsR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQUs7QUFDM0UsR0FBRyxNQUFNO0FBQ1QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUM7QUFDdkMsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsT0FBTyxHQUFHLE1BQU0sS0FBSztBQUNoRCxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLFFBQU87QUFDOUIsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUs7QUFDOUIsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxPQUFNO0FBQzdCLEVBQUM7QUFDRDtBQUNPLE1BQU0sUUFBUSxHQUFHLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsS0FBSyxLQUFLO0FBQy9ELEVBQUUsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUM7QUFDM0MsRUFBRSxJQUFJLEVBQUUsRUFBRTtBQUNWLElBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFLO0FBQzlCLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDTyxNQUFNLE1BQU0sR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsT0FBTyxLQUFLO0FBQ3BELEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksRUFBQztBQUM5QyxFQUFDO0FBQ0Q7QUFDQTtBQUNPLE1BQU1ELFdBQVMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxLQUFLLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsTUFBTSxDQUFDLEVBQUM7QUFDdEg7QUFDTyxNQUFNLG1CQUFtQixHQUFHO0FBQ25DLEVBQUUsQ0FBQ0EsV0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDQSxXQUFTLENBQUMsYUFBYSxFQUFFLENBQUMsSUFBSSxDQUFDQSxXQUFTLENBQUMsZUFBZSxFQUFFLEVBQUM7QUFDaEc7QUFDTyxNQUFNLFlBQVksR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFDO0FBQy9FO0FBQ0E7QUFDTyxNQUFNLGVBQWUsR0FBRyxDQUFDLElBQUksS0FBSztBQUN6QyxFQUFFLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUM7QUFDN0M7QUFDQSxFQUFFLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsSUFBSSxHQUFHLEVBQUM7QUFDdEYsRUFBRSxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLHFCQUFxQixDQUFDLElBQUksR0FBRyxFQUFDO0FBQ3hGO0FBQ0EsRUFBRSxPQUFPLFlBQVksR0FBRyxDQUFDLElBQUksYUFBYSxHQUFHLENBQUM7QUFDOUMsRUFBQztBQUNEO0FBQ08sTUFBTSx1QkFBdUIsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEdBQUcsS0FBSyxLQUFLO0FBQ2pFLEVBQUUsTUFBTSxnQkFBZ0IsR0FBRyxtQkFBbUIsR0FBRTtBQUNoRCxFQUFFLElBQUlBLFdBQVMsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO0FBQ25DLElBQUksSUFBSSxLQUFLLEVBQUU7QUFDZixNQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsT0FBTTtBQUNoRCxNQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTTtBQUMzQyxLQUFLO0FBQ0wsSUFBSSxVQUFVLENBQUMsTUFBTTtBQUNyQixNQUFNLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQyxNQUFNLEVBQUUsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUM7QUFDekUsTUFBTSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUk7QUFDekMsS0FBSyxFQUFFLEVBQUUsRUFBQztBQUNWLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDTyxNQUFNLG9CQUFvQixHQUFHLE1BQU07QUFDMUMsRUFBRSxNQUFNLGdCQUFnQixHQUFHLG1CQUFtQixHQUFFO0FBQ2hELEVBQUUsTUFBTSxxQkFBcUIsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUMsS0FBSyxFQUFDO0FBQ3pGLEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUM7QUFDckQsRUFBRSxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU07QUFDdkMsRUFBRSxNQUFNLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxLQUFLLEVBQUM7QUFDN0YsRUFBRSxNQUFNLHVCQUF1QixHQUFHLENBQUMscUJBQXFCLEdBQUcseUJBQXlCLElBQUksSUFBRztBQUMzRixFQUFFLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFDO0FBQ3JELEVBQUUsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsdUJBQXVCLENBQUMsQ0FBQyxFQUFDO0FBQzlEOztBQ2pRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxTQUFTLEdBQUcsTUFBTSxPQUFPLE1BQU0sS0FBSyxXQUFXLElBQUksT0FBTyxRQUFRLEtBQUs7O0FDTDdFLE1BQU0scUJBQXFCLEdBQUc7O0FDRXJDLE1BQU0sV0FBVyxHQUFHLEdBQUU7QUFHdEI7QUFDQSxNQUFNLDBCQUEwQixHQUFHLE1BQU07QUFDekMsRUFBRSxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsSUFBSSxXQUFXLENBQUMscUJBQXFCLENBQUMsS0FBSyxFQUFFO0FBQ3BGLElBQUksV0FBVyxDQUFDLHFCQUFxQixDQUFDLEtBQUssR0FBRTtBQUM3QyxJQUFJLFdBQVcsQ0FBQyxxQkFBcUIsR0FBRyxLQUFJO0FBQzVDLEdBQUcsTUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7QUFDNUIsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRTtBQUN6QixHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0E7QUFDTyxNQUFNLG9CQUFvQixHQUFHLENBQUMsV0FBVyxLQUFLO0FBQ3JELEVBQUUsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sS0FBSztBQUNsQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDdEIsTUFBTSxPQUFPLE9BQU8sRUFBRTtBQUN0QixLQUFLO0FBQ0wsSUFBSSxNQUFNLENBQUMsR0FBRyxNQUFNLENBQUMsUUFBTztBQUM1QixJQUFJLE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQyxRQUFPO0FBQzVCO0FBQ0EsSUFBSSxXQUFXLENBQUMsbUJBQW1CLEdBQUcsVUFBVSxDQUFDLE1BQU07QUFDdkQsTUFBTSwwQkFBMEIsR0FBRTtBQUNsQyxNQUFNLE9BQU8sR0FBRTtBQUNmLEtBQUssRUFBRSxxQkFBcUIsRUFBQztBQUM3QjtBQUNBLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ3pCLEdBQUcsQ0FBQztBQUNKOztBQ3hCQSxNQUFNLFNBQVMsR0FBRyxDQUFDO0FBQ25CLHVCQUF1QixFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDNUgsZ0NBQWdDLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUNwRCxjQUFjLEVBQUUsV0FBVyxDQUFDLGdCQUFnQixDQUFDLENBQUM7QUFDOUMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDbEMsZUFBZSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDbkMsY0FBYyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDNUQsZUFBZSxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNyRixpQkFBaUIsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDO0FBQ3JDLDZCQUE2QixFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDaEQsZUFBZSxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUN2QyxlQUFlLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUNuQyxlQUFlLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQztBQUN0RTtBQUNBLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUM7QUFDdEM7QUFDQSxvQkFBb0IsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDO0FBQzNDLGVBQWUsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDN0YsZUFBZSxFQUFFLFdBQVcsQ0FBQyxPQUFPLENBQUM7QUFDckMsaUJBQWlCLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUN0QyxrQ0FBa0MsRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDO0FBQ3hELGtDQUFrQyxFQUFFLFdBQVcsQ0FBQyxJQUFJLENBQUM7QUFDckQsa0NBQWtDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUN2RDtBQUNBLGVBQWUsRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDO0FBQ3BDLGVBQWUsRUFBRSxXQUFXLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM3RCxpQkFBaUIsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUNyRDtBQUNBO0FBQ0EsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsRUFBRSxFQUFDO0FBQzNCO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQ2hDLEVBQUUsTUFBTSxZQUFZLEdBQUcsWUFBWSxHQUFFO0FBQ3JDLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRTtBQUNyQixJQUFJLE9BQU8sS0FBSztBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUU7QUFDdkIsRUFBRSxXQUFXO0FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztBQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDdkYsSUFBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLElBQUk7QUFDYixFQUFDO0FBQ0Q7QUFDQSxNQUFNRSx3QkFBc0IsR0FBRyxNQUFNO0FBQ3JDLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxzQkFBc0IsR0FBRTtBQUN0RCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLHVCQUF1QixHQUFHLE1BQU07QUFDdEMsRUFBRSxNQUFNLEtBQUssR0FBRyxRQUFRLEdBQUU7QUFDMUI7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLHFCQUFxQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsS0FBSyxFQUFDO0FBQy9ELEVBQUUsTUFBTSxJQUFJLEdBQUcscUJBQXFCLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUM7QUFDN0QsRUFBRSxNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUM7QUFDbEUsRUFBRSxNQUFNLFdBQVcsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUM7QUFDekUsRUFBRSxNQUFNLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLE1BQU0sRUFBQztBQUNqRSxFQUFFLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBQztBQUN4RSxFQUFFLE1BQU0sUUFBUSxHQUFHLHFCQUFxQixDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFDO0FBQ3JFO0FBQ0EsRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFHQSx5QkFBc0I7QUFDeEMsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHQSx5QkFBc0I7QUFDeEMsRUFBRSxNQUFNLENBQUMsUUFBUSxHQUFHQSx5QkFBc0I7QUFDMUMsRUFBRSxRQUFRLENBQUMsUUFBUSxHQUFHQSx5QkFBc0I7QUFDNUMsRUFBRSxRQUFRLENBQUMsT0FBTyxHQUFHQSx5QkFBc0I7QUFDM0M7QUFDQSxFQUFFLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTTtBQUN4QixJQUFJQSx3QkFBc0IsR0FBRTtBQUM1QixJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQUs7QUFDbkMsSUFBRztBQUNIO0FBQ0EsRUFBRSxLQUFLLENBQUMsUUFBUSxHQUFHLE1BQU07QUFDekIsSUFBSUEsd0JBQXNCLEdBQUU7QUFDNUIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBSztBQUN6QyxJQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLE1BQU0sT0FBTyxNQUFNLEtBQUssUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxFQUFDO0FBQ3BHO0FBQ0EsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLE1BQU0sS0FBSztBQUN2QyxFQUFFLE1BQU0sS0FBSyxHQUFHLFFBQVEsR0FBRTtBQUMxQjtBQUNBLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxPQUFPLEdBQUcsUUFBUSxFQUFDO0FBQy9ELEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsTUFBTSxDQUFDLEtBQUssR0FBRyxRQUFRLEdBQUcsV0FBVyxFQUFDO0FBQ3hFLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDckIsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLEVBQUM7QUFDNUMsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sUUFBUSxHQUFHLENBQUMsYUFBYSxLQUFLO0FBQ3BDLEVBQUUsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtBQUNsRSxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQUUsRUFBRSxXQUFXLENBQUMsR0FBRyxFQUFDO0FBQzdDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNQyxNQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUs7QUFDaEM7QUFDQSxFQUFFLE1BQU0sbUJBQW1CLEdBQUcsaUJBQWlCLEdBQUU7QUFDakQ7QUFDQTtBQUNBLEVBQUUsSUFBSSxTQUFTLEVBQUUsRUFBRTtBQUNuQixJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsRUFBQztBQUN4RCxJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO0FBQ2pELEVBQUUsU0FBUyxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsVUFBUztBQUM3QyxFQUFFLElBQUksbUJBQW1CLEVBQUU7QUFDM0IsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxlQUFlLENBQUMsRUFBQztBQUNyRCxHQUFHO0FBQ0gsRUFBRSxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQztBQUNwQztBQUNBLEVBQUUsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUM7QUFDaEQsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBQztBQUN0QztBQUNBLEVBQUUsa0JBQWtCLENBQUMsTUFBTSxFQUFDO0FBQzVCLEVBQUUsUUFBUSxDQUFDLGFBQWEsRUFBQztBQUN6QixFQUFFLHVCQUF1QixHQUFFO0FBQzNCOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxLQUFLO0FBQ3ZEO0FBQ0EsRUFBRSxJQUFJLEtBQUssWUFBWSxXQUFXLEVBQUU7QUFDcEMsSUFBSSxNQUFNLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQztBQUM3QixHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU8sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7QUFDdEMsSUFBSSxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUMvQixHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU8sSUFBSSxLQUFLLEVBQUU7QUFDbEIsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBQztBQUMvQixHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDeEM7QUFDQSxFQUFFLElBQUksS0FBSyxDQUFDLE1BQU0sRUFBRTtBQUNwQixJQUFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7QUFDbkMsR0FBRztBQUNIO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsSUFBSSxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUUsRUFBQztBQUMxQyxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJLEtBQUs7QUFDM0MsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUU7QUFDekIsRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7QUFDakIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BDLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFDO0FBQ2pELEtBQUs7QUFDTCxHQUFHLE1BQU07QUFDVCxJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBQztBQUM1QyxHQUFHO0FBQ0g7O0FDOUNPLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxNQUFNO0FBQ3hDO0FBQ0E7QUFDQSxFQUFFLElBQUksU0FBUyxFQUFFLEVBQUU7QUFDbkIsSUFBSSxPQUFPLEtBQUs7QUFDaEIsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBQztBQUM5QyxFQUFFLE1BQU0sa0JBQWtCLEdBQUc7QUFDN0IsSUFBSSxlQUFlLEVBQUUsb0JBQW9CO0FBQ3pDLElBQUksU0FBUyxFQUFFLGNBQWM7QUFDN0IsSUFBRztBQUNILEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsRUFBRTtBQUN0QyxJQUFJLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxXQUFXLEVBQUU7QUFDL0csTUFBTSxPQUFPLGtCQUFrQixDQUFDLENBQUMsQ0FBQztBQUNsQyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLEtBQUs7QUFDZCxDQUFDOztBQ25CRDtBQUNBO0FBQ08sTUFBTSxnQkFBZ0IsR0FBRyxNQUFNO0FBQ3RDLEVBQUUsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUM7QUFDakQsRUFBRSxTQUFTLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsRUFBQztBQUN4RCxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBQztBQUN0QyxFQUFFLE1BQU0sY0FBYyxHQUFHLFNBQVMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssR0FBRyxTQUFTLENBQUMsWUFBVztBQUN4RixFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBQztBQUN0QyxFQUFFLE9BQU8sY0FBYztBQUN2Qjs7QUNQTyxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDbkQsRUFBRSxNQUFNLE9BQU8sR0FBR0MsVUFBYyxHQUFFO0FBQ2xDLEVBQUUsTUFBTSxNQUFNLEdBQUdDLFNBQWEsR0FBRTtBQUNoQztBQUNBO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtBQUN2RixJQUFJQyxJQUFRLENBQUMsT0FBTyxFQUFDO0FBQ3JCLEdBQUcsTUFBTTtBQUNULElBQUlDLElBQVEsQ0FBQyxPQUFPLEVBQUM7QUFDckIsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFQyxnQkFBb0IsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBQztBQUNsRDtBQUNBO0FBQ0EsRUFBRSxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUM7QUFDeEM7QUFDQTtBQUNBLEVBQUVDLFlBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUM7QUFDN0MsRUFBRUQsZ0JBQW9CLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUM7QUFDaEQsRUFBQztBQUNEO0FBQ0EsU0FBUyxhQUFhLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUU7QUFDaEQsRUFBRSxNQUFNLGFBQWEsR0FBR0UsZ0JBQW9CLEdBQUU7QUFDOUMsRUFBRSxNQUFNLFVBQVUsR0FBR0MsYUFBaUIsR0FBRTtBQUN4QyxFQUFFLE1BQU0sWUFBWSxHQUFHQyxlQUFtQixHQUFFO0FBQzVDO0FBQ0E7QUFDQSxFQUFFLFlBQVksQ0FBQyxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQztBQUNoRCxFQUFFLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztBQUMxQyxFQUFFLFlBQVksQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUM5QyxFQUFFLG9CQUFvQixDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBQztBQUN2RTtBQUNBLEVBQUUsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO0FBQzdCLElBQUksSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO0FBQ3RCLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsYUFBYSxFQUFDO0FBQ3ZELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsYUFBYSxFQUFDO0FBQ3JELEtBQUssTUFBTTtBQUNYLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxFQUFDO0FBQ2hELE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxVQUFVLEVBQUUsTUFBTSxFQUFDO0FBQzlDLE1BQU0sT0FBTyxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFDO0FBQ2pELEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsU0FBUyxvQkFBb0IsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUU7QUFDL0UsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtBQUM5QixJQUFJLE9BQU9DLFdBQWUsQ0FBQyxDQUFDLGFBQWEsRUFBRSxVQUFVLEVBQUUsWUFBWSxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQztBQUN6RixHQUFHO0FBQ0g7QUFDQSxFQUFFQyxRQUFZLENBQUMsQ0FBQyxhQUFhLEVBQUUsVUFBVSxFQUFFLFlBQVksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDN0U7QUFDQTtBQUNBLEVBQUUsSUFBSSxNQUFNLENBQUMsa0JBQWtCLEVBQUU7QUFDakMsSUFBSSxhQUFhLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsbUJBQWtCO0FBQ25FLElBQUlBLFFBQVksQ0FBQyxhQUFhLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUM7QUFDL0QsR0FBRztBQUNILEVBQUUsSUFBSSxNQUFNLENBQUMsZUFBZSxFQUFFO0FBQzlCLElBQUksVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsTUFBTSxDQUFDLGdCQUFlO0FBQzdELElBQUlBLFFBQVksQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUM7QUFDNUQsR0FBRztBQUNILEVBQUUsSUFBSSxNQUFNLENBQUMsaUJBQWlCLEVBQUU7QUFDaEMsSUFBSSxZQUFZLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUMsa0JBQWlCO0FBQ2pFLElBQUlBLFFBQVksQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLEVBQUM7QUFDOUQsR0FBRztBQUNILENBQUM7QUFDRDtBQUNBLFNBQVMsWUFBWSxDQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFO0FBQ2xELEVBQUVDLE1BQVUsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsSUFBSSxFQUFFLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFDO0FBQzlGLEVBQUVOLFlBQWdCLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLEVBQUUsVUFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUM7QUFDN0QsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQyxFQUFDO0FBQzNFO0FBQ0E7QUFDQSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLFVBQVUsRUFBQztBQUM1QyxFQUFFRCxnQkFBb0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLENBQUMsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUM7QUFDN0QsRUFBRU0sUUFBWSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxFQUFFLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxFQUFDO0FBQzFEOztBQzVFQSxTQUFTLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDbEQsRUFBRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtBQUNwQyxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsVUFBVSxHQUFHLFNBQVE7QUFDekMsR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDeEIsSUFBSUEsUUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFDO0FBQ3ZGLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUU7QUFDbEQsRUFBRSxJQUFJLFFBQVEsSUFBSSxXQUFXLEVBQUU7QUFDL0IsSUFBSUEsUUFBWSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDbEQsR0FBRyxNQUFNO0FBQ1QsSUFBSSxJQUFJLENBQUMsK0RBQStELEVBQUM7QUFDekUsSUFBSUEsUUFBWSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFDO0FBQy9DLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDQSxTQUFTLGVBQWUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxFQUFFO0FBQzFDLEVBQUUsSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO0FBQ3hDLElBQUksTUFBTSxTQUFTLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEVBQUM7QUFDcEMsSUFBSSxJQUFJLFNBQVMsSUFBSSxXQUFXLEVBQUU7QUFDbEMsTUFBTUEsUUFBWSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEVBQUM7QUFDckQsS0FBSztBQUNMLEdBQUc7QUFDSCxDQUFDO0FBQ0Q7QUFDTyxNQUFNLGVBQWUsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDckQsRUFBRSxNQUFNLFNBQVMsR0FBR0UsWUFBZ0IsR0FBRTtBQUN0QztBQUNBLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRTtBQUNsQixJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFDO0FBQ2pEO0FBQ0EsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUNqRCxFQUFFLGVBQWUsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLElBQUksRUFBQztBQUN6QztBQUNBO0FBQ0EsRUFBRVIsZ0JBQW9CLENBQUMsU0FBUyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUM7QUFDdEQ7O0FDNUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQWU7QUFDZixFQUFFLGVBQWUsRUFBRSxJQUFJLE9BQU8sRUFBRTtBQUNoQyxFQUFFLE9BQU8sRUFBRSxJQUFJLE9BQU8sRUFBRTtBQUN4QixFQUFFLFdBQVcsRUFBRSxJQUFJLE9BQU8sRUFBRTtBQUM1QixFQUFFLFFBQVEsRUFBRSxJQUFJLE9BQU8sRUFBRTtBQUN6Qjs7QUNWQSxNQUFNLFVBQVUsR0FBRyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQztBQUN4RjtBQUNPLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUNqRCxFQUFFLE1BQU0sS0FBSyxHQUFHUyxRQUFZLEdBQUU7QUFDOUIsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7QUFDNUQsRUFBRSxNQUFNLFFBQVEsR0FBRyxDQUFDLFdBQVcsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFdBQVcsQ0FBQyxNQUFLO0FBQ3JFO0FBQ0EsRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxLQUFLO0FBQ3BDLElBQUksTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBQztBQUM3QyxJQUFJLE1BQU0sY0FBYyxHQUFHQyxxQkFBeUIsQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFDO0FBQ3ZFO0FBQ0E7QUFDQSxJQUFJLGFBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLGVBQWUsRUFBQztBQUNwRDtBQUNBO0FBQ0EsSUFBSSxjQUFjLENBQUMsU0FBUyxHQUFHLFdBQVU7QUFDekM7QUFDQSxJQUFJLElBQUksUUFBUSxFQUFFO0FBQ2xCLE1BQU1aLElBQVEsQ0FBQyxjQUFjLEVBQUM7QUFDOUIsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDcEIsSUFBSSxJQUFJLFFBQVEsRUFBRTtBQUNsQixNQUFNLFNBQVMsQ0FBQyxNQUFNLEVBQUM7QUFDdkIsS0FBSztBQUNMO0FBQ0EsSUFBSSxjQUFjLENBQUMsTUFBTSxFQUFDO0FBQzFCLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sS0FBSztBQUM5QixFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3RDLElBQUksT0FBTyxLQUFLO0FBQ2hCLE1BQU0sQ0FBQyxrSkFBa0osRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUMxSyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFDO0FBQ3hELEVBQUUsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxjQUFjLEVBQUUsTUFBTSxFQUFDO0FBQ3JFLEVBQUVDLElBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDakI7QUFDQTtBQUNBLEVBQUUsVUFBVSxDQUFDLE1BQU07QUFDbkIsSUFBSVksVUFBYyxDQUFDLEtBQUssRUFBQztBQUN6QixHQUFHLEVBQUM7QUFDSixFQUFDO0FBQ0Q7QUFDQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBSyxLQUFLO0FBQ3BDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELElBQUksTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFJO0FBQzdDLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7QUFDeEQsTUFBTSxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBQztBQUNyQyxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sYUFBYSxHQUFHLENBQUMsU0FBUyxFQUFFLGVBQWUsS0FBSztBQUN0RCxFQUFFLE1BQU0sS0FBSyxHQUFHQyxVQUFZLENBQUNILFFBQVksRUFBRSxFQUFFLFNBQVMsRUFBQztBQUN2RCxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDZCxJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLGdCQUFnQixDQUFDLEtBQUssRUFBQztBQUN6QjtBQUNBLEVBQUUsS0FBSyxNQUFNLElBQUksSUFBSSxlQUFlLEVBQUU7QUFDdEMsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUM7QUFDbkQsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sY0FBYyxHQUFHLENBQUMsTUFBTSxLQUFLO0FBQ25DLEVBQUUsTUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBQztBQUN4RCxFQUFFLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtBQUMxQixJQUFJSCxRQUFZLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFDO0FBQzFELEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLG1CQUFtQixHQUFHLENBQUMsS0FBSyxFQUFFLE1BQU0sS0FBSztBQUMvQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtBQUNyRCxJQUFJLEtBQUssQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLGlCQUFnQjtBQUMvQyxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLE1BQU0sS0FBSztBQUNwRCxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsRUFBRTtBQUN6QixJQUFJLEtBQUssQ0FBQyxFQUFFLEdBQUcsV0FBVyxDQUFDLE1BQUs7QUFDaEMsSUFBSSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBQztBQUNqRCxJQUFJLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxhQUFhLEVBQUM7QUFDakQsSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFDO0FBQ3ZDLElBQUksS0FBSyxDQUFDLFNBQVMsR0FBRyxXQUFVO0FBQ2hDLElBQUlBLFFBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUM7QUFDdEQsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxXQUFVO0FBQ3ZDLElBQUksU0FBUyxDQUFDLHFCQUFxQixDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUM7QUFDekQsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxTQUFTLEtBQUs7QUFDekMsRUFBRSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFLO0FBQ3hGLEVBQUUsT0FBT0kscUJBQXlCLENBQUNELFFBQVksRUFBRSxFQUFFLFVBQVUsQ0FBQztBQUM5RCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLGVBQWUsR0FBRyxHQUFFO0FBQzFCO0FBQ0EsZUFBZSxDQUFDLElBQUk7QUFDcEIsRUFBRSxlQUFlLENBQUMsS0FBSztBQUN2QixFQUFFLGVBQWUsQ0FBQyxRQUFRO0FBQzFCLEVBQUUsZUFBZSxDQUFDLE1BQU07QUFDeEIsRUFBRSxlQUFlLENBQUMsR0FBRztBQUNyQixFQUFFLGVBQWUsQ0FBQyxHQUFHO0FBQ3JCLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxLQUFLO0FBQ3ZCLE1BQU0sSUFBSSxPQUFPLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLE9BQU8sTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7QUFDMUYsUUFBUSxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFVO0FBQ3ZDLE9BQU8sTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNoRCxRQUFRLElBQUk7QUFDWixVQUFVLENBQUMsOEVBQThFLEVBQUUsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUN0SCxVQUFTO0FBQ1QsT0FBTztBQUNQLE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ3pDLE1BQU0sbUJBQW1CLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBQztBQUN4QyxNQUFNLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQUs7QUFDL0IsTUFBTSxPQUFPLEtBQUs7QUFDbEIsTUFBSztBQUNMO0FBQ0EsZUFBZSxDQUFDLElBQUksR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDMUMsRUFBRSxhQUFhLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUM7QUFDckMsRUFBRSxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ3BDLEVBQUUsT0FBTyxLQUFLO0FBQ2QsRUFBQztBQUNEO0FBQ0EsZUFBZSxDQUFDLEtBQUssR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDM0MsRUFBRSxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBQztBQUNqRCxFQUFFLE1BQU0sV0FBVyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDO0FBQ25ELEVBQUUsVUFBVSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsV0FBVTtBQUN0QyxFQUFFLFVBQVUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQUs7QUFDaEMsRUFBRSxXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFVO0FBQ3ZDLEVBQUUsYUFBYSxDQUFDLFVBQVUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQzFDLEVBQUUsT0FBTyxLQUFLO0FBQ2QsRUFBQztBQUNEO0FBQ0EsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLEtBQUs7QUFDN0MsRUFBRSxNQUFNLENBQUMsV0FBVyxHQUFHLEdBQUU7QUFDekIsRUFBRSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtBQUMvQixJQUFJLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFDO0FBQ3hELElBQUlSLFlBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBQztBQUMxRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLEdBQUcsR0FBRTtBQUMxQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEdBQUcsS0FBSTtBQUMvQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEdBQUcsS0FBSTtBQUMvQixJQUFJLE1BQU0sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFDO0FBQ25DLEdBQUc7QUFDSCxFQUFFLGFBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBQztBQUN2QyxFQUFFLE9BQU8sTUFBTTtBQUNmLEVBQUM7QUFDRDtBQUNBLGVBQWUsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxLQUFLLEtBQUs7QUFDbkMsRUFBRSxLQUFLLENBQUMsV0FBVyxHQUFHLEdBQUU7QUFDeEIsRUFBRSxPQUFPLEtBQUs7QUFDZCxFQUFDO0FBQ0Q7QUFDQSxlQUFlLENBQUMsUUFBUSxHQUFHLENBQUMsaUJBQWlCLEVBQUUsTUFBTSxLQUFLO0FBQzFEO0FBQ0EsRUFBRSxNQUFNLFFBQVEsR0FBR1csVUFBWSxDQUFDSCxRQUFZLEVBQUUsRUFBRSxVQUFVLEVBQUM7QUFDM0QsRUFBRSxRQUFRLENBQUMsS0FBSyxHQUFHLElBQUc7QUFDdEIsRUFBRSxRQUFRLENBQUMsRUFBRSxHQUFHLFdBQVcsQ0FBQyxTQUFRO0FBQ3BDLEVBQUUsUUFBUSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBQztBQUMvQyxFQUFFLE1BQU0sS0FBSyxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUM7QUFDdkQsRUFBRVIsWUFBZ0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLGdCQUFnQixFQUFDO0FBQ2xELEVBQUUsT0FBTyxpQkFBaUI7QUFDMUIsRUFBQztBQUNEO0FBQ0EsZUFBZSxDQUFDLFFBQVEsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDakQsRUFBRSxRQUFRLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxXQUFVO0FBQ3BDLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUN2QyxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUMzQztBQUNBLEVBQUUsTUFBTSxTQUFTLEdBQUcsQ0FBQyxFQUFFO0FBQ3ZCLElBQUksUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBQztBQUN4RztBQUNBO0FBQ0EsRUFBRSxVQUFVLENBQUMsTUFBTTtBQUNuQjtBQUNBLElBQUksSUFBSSxrQkFBa0IsSUFBSSxNQUFNLEVBQUU7QUFDdEMsTUFBTSxNQUFNLGlCQUFpQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUNRLFFBQVksRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFDO0FBQ3ZGLE1BQU0sTUFBTSxxQkFBcUIsR0FBRyxNQUFNO0FBQzFDLFFBQVEsTUFBTSxhQUFhLEdBQUcsUUFBUSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFDO0FBQ3hFLFFBQVEsSUFBSSxhQUFhLEdBQUcsaUJBQWlCLEVBQUU7QUFDL0MsVUFBVUEsUUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUUsYUFBYSxDQUFDLEVBQUUsRUFBQztBQUMzRCxTQUFTLE1BQU07QUFDZixVQUFVQSxRQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUk7QUFDM0MsU0FBUztBQUNULFFBQU87QUFDUCxNQUFNLElBQUksZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFO0FBQ3BFLFFBQVEsVUFBVSxFQUFFLElBQUk7QUFDeEIsUUFBUSxlQUFlLEVBQUUsQ0FBQyxPQUFPLENBQUM7QUFDbEMsT0FBTyxFQUFDO0FBQ1IsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKO0FBQ0EsRUFBRSxPQUFPLFFBQVE7QUFDakI7O0FDeE1PLE1BQU0sYUFBYSxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUNuRCxFQUFFLE1BQU0sYUFBYSxHQUFHSSxnQkFBb0IsR0FBRTtBQUM5QztBQUNBLEVBQUViLGdCQUFvQixDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsZUFBZSxFQUFDO0FBQzlEO0FBQ0E7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNuQixJQUFJYyxvQkFBd0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGFBQWEsRUFBQztBQUN4RCxJQUFJZixJQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBQztBQUNwQyxHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU8sSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO0FBQ3hCLElBQUksYUFBYSxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsS0FBSTtBQUMzQyxJQUFJQSxJQUFRLENBQUMsYUFBYSxFQUFFLE9BQU8sRUFBQztBQUNwQyxHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU87QUFDUCxJQUFJRCxJQUFRLENBQUMsYUFBYSxFQUFDO0FBQzNCLEdBQUc7QUFDSDtBQUNBLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDL0I7O0FDeEJPLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUNsRCxFQUFFLE1BQU0sTUFBTSxHQUFHaUIsU0FBYSxHQUFFO0FBQ2hDO0FBQ0EsRUFBRVIsTUFBVSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxFQUFDO0FBQ25DO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7QUFDckIsSUFBSU8sb0JBQXdCLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUM7QUFDbkQsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFZCxnQkFBb0IsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBQztBQUNoRDs7QUNYTyxNQUFNLGlCQUFpQixHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUN2RCxFQUFFLE1BQU0sV0FBVyxHQUFHZ0IsY0FBa0IsR0FBRTtBQUMxQztBQUNBLEVBQUVmLFlBQWdCLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUM7QUFDdkQ7QUFDQTtBQUNBLEVBQUVELGdCQUFvQixDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsYUFBYSxFQUFDO0FBQzFEO0FBQ0EsRUFBRU8sTUFBVSxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFDO0FBQ2pELEVBQUUsV0FBVyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUUsTUFBTSxDQUFDLG9CQUFvQixFQUFDO0FBQ3JFOztBQ1BPLE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUNoRCxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUM1RCxFQUFFLE1BQU0sSUFBSSxHQUFHVSxPQUFXLEdBQUU7QUFDNUI7QUFDQTtBQUNBLEVBQUUsSUFBSSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO0FBQ3ZEO0FBQ0EsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztBQUM1QjtBQUNBLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDN0IsSUFBSSxNQUFNO0FBQ1YsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDeEMsSUFBSSxPQUFPbkIsSUFBUSxDQUFDLElBQUksQ0FBQztBQUN6QixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7QUFDekUsSUFBSSxLQUFLLENBQUMsQ0FBQyxpRkFBaUYsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQzdHLElBQUksT0FBT0EsSUFBUSxDQUFDLElBQUksQ0FBQztBQUN6QixHQUFHO0FBQ0g7QUFDQSxFQUFFQyxJQUFRLENBQUMsSUFBSSxFQUFDO0FBQ2hCO0FBQ0E7QUFDQSxFQUFFLFVBQVUsQ0FBQyxJQUFJLEVBQUUsTUFBTSxFQUFDO0FBQzFCO0FBQ0EsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFFLE1BQU0sRUFBQztBQUMzQjtBQUNBO0FBQ0EsRUFBRU8sUUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksRUFBQztBQUMzQyxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFdBQVcsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEtBQUs7QUFDdEMsRUFBRSxLQUFLLE1BQU0sUUFBUSxJQUFJLFNBQVMsRUFBRTtBQUNwQyxJQUFJLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7QUFDbEMsTUFBTUQsV0FBZSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsUUFBUSxDQUFDLEVBQUM7QUFDaEQsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFQyxRQUFZLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUM7QUFDNUM7QUFDQTtBQUNBLEVBQUUsUUFBUSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUM7QUFDeEI7QUFDQTtBQUNBLEVBQUUsZ0NBQWdDLEdBQUU7QUFDcEM7QUFDQTtBQUNBLEVBQUVOLGdCQUFvQixDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFDO0FBQzVDLEVBQUM7QUFDRDtBQUNBO0FBQ0EsTUFBTSxnQ0FBZ0MsR0FBRyxNQUFNO0FBQy9DLEVBQUUsTUFBTSxLQUFLLEdBQUdTLFFBQVksR0FBRTtBQUM5QixFQUFFLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFDO0FBQ2xHLEVBQUUsTUFBTSxnQkFBZ0IsR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsMERBQTBELEVBQUM7QUFDN0csRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3BELElBQUksZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLGVBQWUsR0FBRyxxQkFBb0I7QUFDcEUsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sZUFBZSxHQUFHLENBQUM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQSxNQUFNLGFBQWEsR0FBRyxDQUFDO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxLQUFLO0FBQ3JDLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFFO0FBQ3ZCO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7QUFDdkIsSUFBSVIsWUFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQztBQUN4RCxHQUFHLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtBQUN4QyxJQUFJQSxZQUFnQixDQUFDLElBQUksRUFBRSxlQUFlLEVBQUM7QUFDM0MsR0FBRyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7QUFDdEMsSUFBSUEsWUFBZ0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFDO0FBQ3pDLEdBQUcsTUFBTTtBQUNULElBQUksTUFBTSxlQUFlLEdBQUc7QUFDNUIsTUFBTSxRQUFRLEVBQUUsR0FBRztBQUNuQixNQUFNLE9BQU8sRUFBRSxHQUFHO0FBQ2xCLE1BQU0sSUFBSSxFQUFFLEdBQUc7QUFDZixNQUFLO0FBQ0wsSUFBSUEsWUFBZ0IsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBQztBQUNyRSxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxJQUFJLEVBQUUsTUFBTSxLQUFLO0FBQ25DLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUU7QUFDekIsSUFBSSxNQUFNO0FBQ1YsR0FBRztBQUNILEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLFVBQVM7QUFDckMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBUztBQUMzQyxFQUFFLEtBQUssTUFBTSxHQUFHLElBQUk7QUFDcEIsSUFBSSx5QkFBeUI7QUFDN0IsSUFBSSwwQkFBMEI7QUFDOUIsSUFBSSx5QkFBeUI7QUFDN0IsSUFBSSwwQkFBMEI7QUFDOUIsR0FBRyxFQUFFO0FBQ0wsSUFBSWlCLFFBQVksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUM7QUFDaEUsR0FBRztBQUNILEVBQUVBLFFBQVksQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUUsYUFBYSxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUM7QUFDNUUsRUFBQztBQUNEO0FBQ0EsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLEtBQUssQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsTUFBTTs7QUNqSHZGLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSztBQUNqRCxFQUFFLE1BQU0sS0FBSyxHQUFHQyxRQUFZLEdBQUU7QUFDOUI7QUFDQSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO0FBQ3hCLElBQUksT0FBT3JCLElBQVEsQ0FBQyxLQUFLLENBQUM7QUFDMUIsR0FBRztBQUNIO0FBQ0EsRUFBRUMsSUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUM7QUFDckI7QUFDQTtBQUNBLEVBQUUsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUM1QyxFQUFFLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUM7QUFDNUM7QUFDQTtBQUNBLEVBQUVxQixtQkFBdUIsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUM7QUFDNUQsRUFBRUEsbUJBQXVCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFDO0FBQzlEO0FBQ0E7QUFDQSxFQUFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQUs7QUFDckMsRUFBRXBCLGdCQUFvQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDO0FBQzlDOztBQ25CQSxNQUFNLGlCQUFpQixHQUFHLENBQUMsSUFBSSxLQUFLO0FBQ3BDLEVBQUUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUM7QUFDN0MsRUFBRU0sUUFBWSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQUM7QUFDcEQsRUFBRUwsWUFBZ0IsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO0FBQ2hDLEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sS0FBSztBQUN0QyxFQUFFLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFDO0FBQzdDLEVBQUVLLFFBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLG9CQUFvQixDQUFDLEVBQUM7QUFDekQsRUFBRSxJQUFJLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRTtBQUNwQyxJQUFJLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxzQkFBcUI7QUFDckQsR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ08sTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDekQsRUFBRSxNQUFNLHNCQUFzQixHQUFHZSxrQkFBb0IsR0FBRTtBQUN2RCxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUNsRSxJQUFJLE9BQU92QixJQUFRLENBQUMsc0JBQXNCLENBQUM7QUFDM0MsR0FBRztBQUNIO0FBQ0EsRUFBRUMsSUFBUSxDQUFDLHNCQUFzQixFQUFDO0FBQ2xDLEVBQUUsc0JBQXNCLENBQUMsV0FBVyxHQUFHLEdBQUU7QUFDekMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRTtBQUNqRSxJQUFJLElBQUk7QUFDUixNQUFNLHFGQUFxRjtBQUMzRixRQUFRLG9EQUFvRDtBQUM1RCxNQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEtBQUs7QUFDaEQsSUFBSSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLEVBQUM7QUFDMUMsSUFBSSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDO0FBQzlDLElBQUksSUFBSSxLQUFLLEtBQUssTUFBTSxDQUFDLG1CQUFtQixFQUFFO0FBQzlDLE1BQU1PLFFBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLHNCQUFzQixDQUFDLEVBQUM7QUFDL0QsS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEtBQUssS0FBSyxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7QUFDbkQsTUFBTSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUM7QUFDOUMsTUFBTSxzQkFBc0IsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFDO0FBQ2hELEtBQUs7QUFDTCxHQUFHLEVBQUM7QUFDSjs7QUM3Q08sTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLO0FBQ2pELEVBQUUsTUFBTSxLQUFLLEdBQUdnQixRQUFZLEdBQUU7QUFDOUI7QUFDQSxFQUFFZixNQUFVLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUM7QUFDOUQ7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtBQUNwQixJQUFJTyxvQkFBd0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBQztBQUNqRCxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsRUFBRTtBQUN4QixJQUFJLEtBQUssQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLFVBQVM7QUFDdEMsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFZCxnQkFBb0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztBQUM5Qzs7QUNkTyxNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDakQsRUFBRSxNQUFNLFNBQVMsR0FBR1EsWUFBZ0IsR0FBRTtBQUN0QyxFQUFFLE1BQU0sS0FBSyxHQUFHQyxRQUFZLEdBQUU7QUFDOUI7QUFDQTtBQUNBO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDcEIsSUFBSVcsbUJBQXVCLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO0FBQzdELElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTTtBQUM5QixJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUN2QixTQUFhLEVBQUUsRUFBRW9CLE9BQVcsRUFBRSxFQUFDO0FBQ3RELEdBQUcsTUFBTTtBQUNULElBQUlHLG1CQUF1QixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBQztBQUN6RCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUVBLG1CQUF1QixDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxDQUFDLE9BQU8sRUFBQztBQUMzRDtBQUNBO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUU7QUFDcEIsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBSztBQUNwQyxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO0FBQ3pCLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFdBQVU7QUFDOUMsR0FBRztBQUNIO0FBQ0EsRUFBRXRCLElBQVEsQ0FBQ3lCLG9CQUF3QixFQUFFLEVBQUM7QUFDdEM7QUFDQTtBQUNBLEVBQUVDLFlBQVUsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQzNCLEVBQUM7QUFDRDtBQUNBLE1BQU1BLFlBQVUsR0FBRyxDQUFDLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDdEM7QUFDQSxFQUFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFQyxXQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEVBQUM7QUFDaEc7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtBQUNwQixJQUFJbkIsUUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFDO0FBQ3ZGLElBQUlBLFFBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBQztBQUMxQyxHQUFHLE1BQU07QUFDVCxJQUFJQSxRQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUM7QUFDMUMsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFTixnQkFBb0IsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztBQUM5QyxFQUFFLElBQUksT0FBTyxNQUFNLENBQUMsV0FBVyxLQUFLLFFBQVEsRUFBRTtBQUM5QyxJQUFJTSxRQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUM7QUFDM0MsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtBQUNuQixJQUFJQSxRQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQzNELEdBQUc7QUFDSDs7QUM3Q08sTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLO0FBQzVDLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDL0IsRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUNuQztBQUNBLEVBQUUsbUJBQW1CLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUN2QyxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQzlCLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDL0IsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUMvQixFQUFFLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDckM7QUFDQSxFQUFFLGFBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQ2pDLEVBQUUsYUFBYSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDakMsRUFBRSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBQztBQUNoQztBQUNBLEVBQUUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQzlDLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBQztBQUNoQyxHQUFHO0FBQ0g7O0FDN0JPLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDM0MsRUFBRSxNQUFNLEVBQUUsUUFBUTtBQUNsQixFQUFFLFFBQVEsRUFBRSxVQUFVO0FBQ3RCLEVBQUUsS0FBSyxFQUFFLE9BQU87QUFDaEIsRUFBRSxHQUFHLEVBQUUsS0FBSztBQUNaLEVBQUUsS0FBSyxFQUFFLE9BQU87QUFDaEIsQ0FBQzs7QUNIRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxhQUFhLEdBQUcsTUFBTTtBQUNuQyxFQUFFLE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztBQUN0RCxFQUFFLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEtBQUs7QUFDL0IsSUFBSSxJQUFJLEVBQUUsS0FBSyxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDLEVBQUU7QUFDOUQsTUFBTSxNQUFNO0FBQ1osS0FBSztBQUNMO0FBQ0EsSUFBSSxJQUFJLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDeEMsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLEVBQUM7QUFDbEYsS0FBSztBQUNMLElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFDO0FBQzFDLEdBQUcsRUFBQztBQUNKLEVBQUM7QUFDRDtBQUNPLE1BQU0sZUFBZSxHQUFHLE1BQU07QUFDckMsRUFBRSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUM7QUFDdEQsRUFBRSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxLQUFLO0FBQy9CLElBQUksSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLDJCQUEyQixDQUFDLEVBQUU7QUFDdEQsTUFBTSxFQUFFLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLDJCQUEyQixDQUFDLEVBQUM7QUFDbEYsTUFBTSxFQUFFLENBQUMsZUFBZSxDQUFDLDJCQUEyQixFQUFDO0FBQ3JELEtBQUssTUFBTTtBQUNYLE1BQU0sRUFBRSxDQUFDLGVBQWUsQ0FBQyxhQUFhLEVBQUM7QUFDdkMsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKOztBQzdCQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxhQUFhLEVBQUM7QUFDbkU7QUFDTyxNQUFNLGlCQUFpQixHQUFHLENBQUMsTUFBTSxLQUFLO0FBQzdDLEVBQUUsTUFBTSxRQUFRLEdBQUcsT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxNQUFNLENBQUMsU0FBUTtBQUNsSCxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUU7QUFDakIsSUFBSSxPQUFPLEVBQUU7QUFDYixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sZUFBZSxHQUFHLFFBQVEsQ0FBQyxRQUFPO0FBQzFDO0FBQ0EsRUFBRSx1QkFBdUIsQ0FBQyxlQUFlLEVBQUM7QUFDMUM7QUFDQSxFQUFFLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNO0FBQzlCLElBQUksYUFBYSxDQUFDLGVBQWUsQ0FBQztBQUNsQyxJQUFJLGNBQWMsQ0FBQyxlQUFlLENBQUM7QUFDbkMsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDO0FBQ2pDLElBQUksV0FBVyxDQUFDLGVBQWUsQ0FBQztBQUNoQyxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUM7QUFDakMsSUFBSSxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsZ0JBQWdCLENBQUM7QUFDMUQsSUFBRztBQUNILEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxlQUFlLEtBQUs7QUFDM0MsRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFFO0FBQ25CLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssS0FBSztBQUM3RSxJQUFJLHlCQUF5QixDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBQztBQUN2RCxJQUFJLE1BQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDO0FBQ2hELElBQUksTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUM7QUFDN0MsSUFBSSxJQUFJLE9BQU8sYUFBYSxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssT0FBTyxFQUFFO0FBQzVFLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQUs7QUFDL0IsS0FBSztBQUNMLElBQUksSUFBSSxPQUFPLGFBQWEsQ0FBQyxTQUFTLENBQUMsS0FBSyxRQUFRLEVBQUU7QUFDdEQsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUM7QUFDM0MsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKLEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxjQUFjLEdBQUcsQ0FBQyxlQUFlLEtBQUs7QUFDNUMsRUFBRSxNQUFNLE1BQU0sR0FBRyxHQUFFO0FBQ25CLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSztBQUMvRSxJQUFJLHlCQUF5QixDQUFDLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsWUFBWSxDQUFDLEVBQUM7QUFDdEUsSUFBSSxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBQztBQUM1QyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVM7QUFDbEQsSUFBSSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFJO0FBQzdELElBQUksSUFBSSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3RDLE1BQU0sTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQztBQUNqRSxLQUFLO0FBQ0wsSUFBSSxJQUFJLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEVBQUU7QUFDM0MsTUFBTSxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFDO0FBQzFFLEtBQUs7QUFDTCxHQUFHLEVBQUM7QUFDSixFQUFFLE9BQU8sTUFBTTtBQUNmLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsZUFBZSxLQUFLO0FBQzFDLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUNuQjtBQUNBLEVBQUUsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUM7QUFDM0QsRUFBRSxJQUFJLEtBQUssRUFBRTtBQUNiLElBQUkseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsS0FBSyxDQUFDLEVBQUM7QUFDdkUsSUFBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbkMsTUFBTSxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDO0FBQ2pELEtBQUs7QUFDTCxJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNyQyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUM7QUFDckQsS0FBSztBQUNMLElBQUksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxFQUFFO0FBQ3RDLE1BQU0sTUFBTSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBQztBQUN2RCxLQUFLO0FBQ0wsSUFBSSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbkMsTUFBTSxNQUFNLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFDO0FBQ2pELEtBQUs7QUFDTCxHQUFHO0FBQ0gsRUFBRSxPQUFPLE1BQU07QUFDZixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFdBQVcsR0FBRyxDQUFDLGVBQWUsS0FBSztBQUN6QyxFQUFFLE1BQU0sTUFBTSxHQUFHLEdBQUU7QUFDbkI7QUFDQSxFQUFFLE1BQU0sSUFBSSxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFDO0FBQ3pELEVBQUUsSUFBSSxJQUFJLEVBQUU7QUFDWixJQUFJLHlCQUF5QixDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsRUFBQztBQUN0RCxJQUFJLElBQUksSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRTtBQUNuQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUM7QUFDN0MsS0FBSztBQUNMLElBQUksSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3BDLE1BQU0sTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBQztBQUNuRCxLQUFLO0FBQ0wsSUFBSSxNQUFNLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFTO0FBQ3BDLEdBQUc7QUFDSCxFQUFFLE9BQU8sTUFBTTtBQUNmLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsZUFBZSxLQUFLO0FBQzFDLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUNuQjtBQUNBLEVBQUUsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLGFBQWEsQ0FBQyxZQUFZLEVBQUM7QUFDM0QsRUFBRSxJQUFJLEtBQUssRUFBRTtBQUNiLElBQUkseUJBQXlCLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxhQUFhLEVBQUUsT0FBTyxDQUFDLEVBQUM7QUFDL0UsSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksT0FBTTtBQUN2RCxJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNyQyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUM7QUFDckQsS0FBSztBQUNMLElBQUksSUFBSSxLQUFLLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQzNDLE1BQU0sTUFBTSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUFDO0FBQ2pFLEtBQUs7QUFDTCxJQUFJLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsRUFBRTtBQUNyQyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUM7QUFDckQsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFFLE1BQU0sWUFBWSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxtQkFBbUIsRUFBQztBQUM1RSxFQUFFLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtBQUMzQixJQUFJLE1BQU0sQ0FBQyxZQUFZLEdBQUcsR0FBRTtBQUM1QixJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEtBQUs7QUFDOUMsTUFBTSx5QkFBeUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBQztBQUNsRCxNQUFNLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFDO0FBQ3RELE1BQU0sTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVM7QUFDekMsTUFBTSxNQUFNLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFdBQVU7QUFDbkQsS0FBSyxFQUFDO0FBQ04sR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLG1CQUFtQixHQUFHLENBQUMsZUFBZSxFQUFFLFVBQVUsS0FBSztBQUM3RCxFQUFFLE1BQU0sTUFBTSxHQUFHLEdBQUU7QUFDbkIsRUFBRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLFVBQVUsRUFBRTtBQUM5QixJQUFJLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxDQUFDLEVBQUM7QUFDbkM7QUFDQSxJQUFJLE1BQU0sR0FBRyxHQUFHLGVBQWUsQ0FBQyxhQUFhLENBQUMsU0FBUyxFQUFDO0FBQ3hELElBQUksSUFBSSxHQUFHLEVBQUU7QUFDYixNQUFNLHlCQUF5QixDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUM7QUFDeEMsTUFBTSxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRTtBQUNwRSxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSx1QkFBdUIsR0FBRyxDQUFDLGVBQWUsS0FBSztBQUNyRCxFQUFFLE1BQU0sZUFBZSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQztBQUNsRCxJQUFJLFlBQVk7QUFDaEIsSUFBSSxhQUFhO0FBQ2pCLElBQUksWUFBWTtBQUNoQixJQUFJLFdBQVc7QUFDZixJQUFJLFlBQVk7QUFDaEIsSUFBSSxtQkFBbUI7QUFDdkIsR0FBRyxFQUFDO0FBQ0osRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSztBQUNwRCxJQUFJLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQyxPQUFPLENBQUMsV0FBVyxHQUFFO0FBQzVDLElBQUksSUFBSSxlQUFlLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO0FBQ2pELE1BQU0sSUFBSSxDQUFDLENBQUMsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQy9DLEtBQUs7QUFDTCxHQUFHLEVBQUM7QUFDSixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0seUJBQXlCLEdBQUcsQ0FBQyxFQUFFLEVBQUUsaUJBQWlCLEtBQUs7QUFDN0QsRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsS0FBSztBQUNoRCxJQUFJLElBQUksaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtBQUMxRCxNQUFNLElBQUksQ0FBQztBQUNYLFFBQVEsQ0FBQyx3QkFBd0IsRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsQ0FBQztBQUN0RixRQUFRLENBQUM7QUFDVCxVQUFVLGlCQUFpQixDQUFDLE1BQU07QUFDbEMsY0FBYyxDQUFDLHdCQUF3QixFQUFFLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0FBQ3ZFLGNBQWMsZ0RBQWdEO0FBQzlELFNBQVMsQ0FBQztBQUNWLE9BQU8sRUFBQztBQUNSLEtBQUs7QUFDTCxHQUFHLEVBQUM7QUFDSjs7QUN0TUEsNkJBQWU7QUFDZixFQUFFLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsS0FBSztBQUN4QyxJQUFJLE9BQU8sdURBQXVELENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztBQUMvRSxRQUFRLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDekIsUUFBUSxPQUFPLENBQUMsT0FBTyxDQUFDLGlCQUFpQixJQUFJLHVCQUF1QixDQUFDO0FBQ3JFLEdBQUc7QUFDSCxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsS0FBSztBQUN0QztBQUNBLElBQUksT0FBTyw2RkFBNkYsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0FBQ3JILFFBQVEsT0FBTyxDQUFDLE9BQU8sRUFBRTtBQUN6QixRQUFRLE9BQU8sQ0FBQyxPQUFPLENBQUMsaUJBQWlCLElBQUksYUFBYSxDQUFDO0FBQzNELEdBQUc7QUFDSDs7QUNSQSxTQUFTLHlCQUF5QixDQUFDLE1BQU0sRUFBRTtBQUMzQztBQUNBLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7QUFDOUIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLO0FBQ3pELE1BQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEdBQUcsRUFBRTtBQUNoQyxRQUFRLE1BQU0sQ0FBQyxjQUFjLEdBQUcsc0JBQXNCLENBQUMsR0FBRyxFQUFDO0FBQzNELE9BQU87QUFDUCxLQUFLLEVBQUM7QUFDTixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsU0FBUywyQkFBMkIsQ0FBQyxNQUFNLEVBQUU7QUFDN0M7QUFDQSxFQUFFO0FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNO0FBQ2xCLEtBQUssT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2pGLEtBQUssT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDO0FBQ3JFLElBQUk7QUFDSixJQUFJLElBQUksQ0FBQyxxREFBcUQsRUFBQztBQUMvRCxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsT0FBTTtBQUMxQixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNlLFNBQVMsYUFBYSxDQUFDLE1BQU0sRUFBRTtBQUM5QyxFQUFFLHlCQUF5QixDQUFDLE1BQU0sRUFBQztBQUNuQztBQUNBO0FBQ0EsRUFBRSxJQUFJLE1BQU0sQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7QUFDeEQsSUFBSSxJQUFJO0FBQ1IsTUFBTSxzRUFBc0U7QUFDNUUsUUFBUSxtRkFBbUY7QUFDM0YsUUFBUSw2Q0FBNkM7QUFDckQsTUFBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsMkJBQTJCLENBQUMsTUFBTSxFQUFDO0FBQ3JDO0FBQ0E7QUFDQSxFQUFFLElBQUksT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtBQUN4QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBQztBQUMxRCxHQUFHO0FBQ0g7QUFDQSxFQUFFb0IsTUFBUSxDQUFDLE1BQU0sRUFBQztBQUNsQjs7QUNwRGUsTUFBTSxLQUFLLENBQUM7QUFDM0IsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRTtBQUMvQixJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsU0FBUTtBQUM1QixJQUFJLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBSztBQUMxQixJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBSztBQUN4QjtBQUNBLElBQUksSUFBSSxDQUFDLEtBQUssR0FBRTtBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLEtBQUssR0FBRztBQUNWLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDdkIsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUk7QUFDekIsTUFBTSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksSUFBSSxHQUFFO0FBQy9CLE1BQU0sSUFBSSxDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFDO0FBQ3pELEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVM7QUFDekIsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLEdBQUc7QUFDVCxJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUN0QixNQUFNLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBSztBQUMxQixNQUFNLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFDO0FBQzNCLE1BQU0sSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFFO0FBQ3JFLEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVM7QUFDekIsR0FBRztBQUNIO0FBQ0EsRUFBRSxRQUFRLENBQUMsQ0FBQyxFQUFFO0FBQ2QsSUFBSSxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBTztBQUNoQyxJQUFJLElBQUksT0FBTyxFQUFFO0FBQ2pCLE1BQU0sSUFBSSxDQUFDLElBQUksR0FBRTtBQUNqQixLQUFLO0FBQ0wsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLEVBQUM7QUFDdkIsSUFBSSxJQUFJLE9BQU8sRUFBRTtBQUNqQixNQUFNLElBQUksQ0FBQyxLQUFLLEdBQUU7QUFDbEIsS0FBSztBQUNMLElBQUksT0FBTyxJQUFJLENBQUMsU0FBUztBQUN6QixHQUFHO0FBQ0g7QUFDQSxFQUFFLFlBQVksR0FBRztBQUNqQixJQUFJLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTtBQUN0QixNQUFNLElBQUksQ0FBQyxJQUFJLEdBQUU7QUFDakIsTUFBTSxJQUFJLENBQUMsS0FBSyxHQUFFO0FBQ2xCLEtBQUs7QUFDTCxJQUFJLE9BQU8sSUFBSSxDQUFDLFNBQVM7QUFDekIsR0FBRztBQUNIO0FBQ0EsRUFBRSxTQUFTLEdBQUc7QUFDZCxJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU87QUFDdkIsR0FBRztBQUNIOztBQ2hETyxNQUFNLFlBQVksR0FBRyxNQUFNO0FBQ2xDO0FBQ0EsRUFBRSxJQUFJQyxNQUFVLENBQUMsbUJBQW1CLEtBQUssSUFBSSxFQUFFO0FBQy9DLElBQUksTUFBTTtBQUNWLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3ZEO0FBQ0EsSUFBSUEsTUFBVSxDQUFDLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxFQUFDO0FBQ3ZILElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLENBQUMsRUFBRUEsTUFBVSxDQUFDLG1CQUFtQixHQUFHQyxnQkFBb0IsRUFBRSxDQUFDLEVBQUUsRUFBQztBQUNyRyxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ08sTUFBTSxhQUFhLEdBQUcsTUFBTTtBQUNuQyxFQUFFLElBQUlELE1BQVUsQ0FBQyxtQkFBbUIsS0FBSyxJQUFJLEVBQUU7QUFDL0MsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsQ0FBQyxFQUFFQSxNQUFVLENBQUMsbUJBQW1CLENBQUMsRUFBRSxFQUFDO0FBQzVFLElBQUlBLE1BQVUsQ0FBQyxtQkFBbUIsR0FBRyxLQUFJO0FBQ3pDLEdBQUc7QUFDSDs7QUNwQkE7QUFHQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLE1BQU0sR0FBRyxNQUFNO0FBQzVCLEVBQUUsTUFBTSxHQUFHO0FBQ1g7QUFDQSxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRO0FBQ3JFLEtBQUssU0FBUyxDQUFDLFFBQVEsS0FBSyxVQUFVLElBQUksU0FBUyxDQUFDLGNBQWMsR0FBRyxDQUFDLEVBQUM7QUFDdkUsRUFBRSxJQUFJLEdBQUcsSUFBSSxDQUFDRSxRQUFZLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDL0QsSUFBSSxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVM7QUFDMUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxFQUFFLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUM7QUFDaEQsSUFBSXZCLFFBQVksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDbkQsSUFBSSxjQUFjLEdBQUU7QUFDcEIsSUFBSSw2QkFBNkIsR0FBRTtBQUNuQyxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSw2QkFBNkIsR0FBRyxNQUFNO0FBQzVDLEVBQUUsTUFBTSxFQUFFLEdBQUcsU0FBUyxDQUFDLFVBQVM7QUFDaEMsRUFBRSxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUM7QUFDMUQsRUFBRSxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUM7QUFDdEMsRUFBRSxNQUFNLFNBQVMsR0FBRyxHQUFHLElBQUksTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUM7QUFDeEQsRUFBRSxJQUFJLFNBQVMsRUFBRTtBQUNqQixJQUFJLE1BQU0saUJBQWlCLEdBQUcsR0FBRTtBQUNoQyxJQUFJLElBQUlHLFFBQVksRUFBRSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxHQUFHLGlCQUFpQixFQUFFO0FBQzlFLE1BQU1ELFlBQWdCLEVBQUUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLENBQUMsRUFBRSxpQkFBaUIsQ0FBQyxFQUFFLEVBQUM7QUFDdkUsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQzdCLEVBQUUsTUFBTSxTQUFTLEdBQUdBLFlBQWdCLEdBQUU7QUFDdEMsRUFBRSxJQUFJLGlCQUFnQjtBQUN0QixFQUFFLFNBQVMsQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLEtBQUs7QUFDbEMsSUFBSSxnQkFBZ0IsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLEVBQUM7QUFDaEQsSUFBRztBQUNILEVBQUUsU0FBUyxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsS0FBSztBQUNqQyxJQUFJLElBQUksZ0JBQWdCLEVBQUU7QUFDMUIsTUFBTSxDQUFDLENBQUMsY0FBYyxHQUFFO0FBQ3hCLE1BQU0sQ0FBQyxDQUFDLGVBQWUsR0FBRTtBQUN6QixLQUFLO0FBQ0wsSUFBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxLQUFLLEtBQUs7QUFDMUMsRUFBRSxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsT0FBTTtBQUM3QixFQUFFLE1BQU0sU0FBUyxHQUFHQSxZQUFnQixHQUFFO0FBQ3RDLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFO0FBQ3hDLElBQUksT0FBTyxLQUFLO0FBQ2hCLEdBQUc7QUFDSCxFQUFFLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtBQUM1QixJQUFJLE9BQU8sSUFBSTtBQUNmLEdBQUc7QUFDSCxFQUFFO0FBQ0YsSUFBSSxDQUFDc0IsWUFBZ0IsQ0FBQyxTQUFTLENBQUM7QUFDaEMsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLE9BQU87QUFDOUIsSUFBSSxNQUFNLENBQUMsT0FBTyxLQUFLLFVBQVU7QUFDakMsSUFBSTtBQUNKLE1BQU1BLFlBQWdCLENBQUNqQixnQkFBb0IsRUFBRSxDQUFDO0FBQzlDLE1BQU1BLGdCQUFvQixFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQztBQUM3QyxLQUFLO0FBQ0wsSUFBSTtBQUNKLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNILEVBQUUsT0FBTyxLQUFLO0FBQ2QsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFLLEtBQUs7QUFDNUIsRUFBRSxPQUFPLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEtBQUssUUFBUTtBQUN6RixFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE1BQU0sR0FBRyxDQUFDLEtBQUssS0FBSztBQUMxQixFQUFFLE9BQU8sS0FBSyxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDO0FBQ2xELEVBQUM7QUFDRDtBQUNPLE1BQU0sVUFBVSxHQUFHLE1BQU07QUFDaEMsRUFBRSxJQUFJZ0IsUUFBWSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ3ZELElBQUksTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUM7QUFDeEQsSUFBSXhCLFdBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDdEQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsR0FBRTtBQUNoQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sR0FBRyxDQUFDLEVBQUM7QUFDekMsR0FBRztBQUNIOztBQ2hHTyxNQUFNLGtCQUFrQixHQUFHLEdBQUU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLEtBQUs7QUFDckMsRUFBRSxNQUFNLFNBQVMsR0FBR0csWUFBZ0IsR0FBRTtBQUN0QyxFQUFFLE1BQU0sS0FBSyxHQUFHQyxRQUFZLEdBQUU7QUFDOUI7QUFDQSxFQUFFLElBQUksT0FBTyxNQUFNLENBQUMsUUFBUSxLQUFLLFVBQVUsRUFBRTtBQUM3QyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFDO0FBQzFCLEdBQUc7QUFDSDtBQUNBLEVBQUUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUM7QUFDM0QsRUFBRSxNQUFNLG1CQUFtQixHQUFHLFVBQVUsQ0FBQyxVQUFTO0FBQ2xELEVBQUUsVUFBVSxDQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ3RDO0FBQ0E7QUFDQSxFQUFFLFVBQVUsQ0FBQyxNQUFNO0FBQ25CLElBQUksc0JBQXNCLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBQztBQUM1QyxHQUFHLEVBQUUsa0JBQWtCLEVBQUM7QUFDeEI7QUFDQSxFQUFFLElBQUlzQixPQUFXLEVBQUUsRUFBRTtBQUNyQixJQUFJLGtCQUFrQixDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsbUJBQW1CLEVBQUM7QUFDL0UsSUFBSSxhQUFhLEdBQUU7QUFDbkIsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUNDLE9BQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLHFCQUFxQixFQUFFO0FBQzVELElBQUksV0FBVyxDQUFDLHFCQUFxQixHQUFHLFFBQVEsQ0FBQyxjQUFhO0FBQzlELEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO0FBQzVDLElBQUksVUFBVSxDQUFDLE1BQU0sTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQztBQUMzQyxHQUFHO0FBQ0g7QUFDQSxFQUFFM0IsV0FBZSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsZUFBZSxDQUFDLEVBQUM7QUFDMUQsRUFBQztBQUNEO0FBQ0EsTUFBTSx5QkFBeUIsR0FBRyxDQUFDLEtBQUssS0FBSztBQUM3QyxFQUFFLE1BQU0sS0FBSyxHQUFHSSxRQUFZLEdBQUU7QUFDOUIsRUFBRSxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQzlCLElBQUksTUFBTTtBQUNWLEdBQUc7QUFDSCxFQUFFLE1BQU0sU0FBUyxHQUFHRCxZQUFnQixHQUFFO0FBQ3RDLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixDQUFDeUIsaUJBQXFCLEVBQUUseUJBQXlCLEVBQUM7QUFDN0UsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxPQUFNO0FBQ3BDLEVBQUM7QUFDRDtBQUNBLE1BQU0sc0JBQXNCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsS0FBSyxLQUFLO0FBQ3JELEVBQUUsSUFBSUEsaUJBQXFCLElBQUlDLGVBQW1CLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDM0QsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxTQUFRO0FBQ3hDLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDRCxpQkFBcUIsRUFBRSx5QkFBeUIsRUFBQztBQUM1RSxHQUFHLE1BQU07QUFDVCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLE9BQU07QUFDdEMsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsZ0JBQWdCLEVBQUUsbUJBQW1CLEtBQUs7QUFDakYsRUFBRSxNQUFNLEdBQUU7QUFDVjtBQUNBLEVBQUUsSUFBSSxnQkFBZ0IsSUFBSSxtQkFBbUIsS0FBSyxRQUFRLEVBQUU7QUFDNUQsSUFBSSxZQUFZLEdBQUU7QUFDbEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLFVBQVUsQ0FBQyxNQUFNO0FBQ25CLElBQUksU0FBUyxDQUFDLFNBQVMsR0FBRyxFQUFDO0FBQzNCLEdBQUcsRUFBQztBQUNKLEVBQUM7QUFDRDtBQUNBLE1BQU0sVUFBVSxHQUFHLENBQUMsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEtBQUs7QUFDakQsRUFBRTNCLFFBQVksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUM7QUFDcEQ7QUFDQSxFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFDO0FBQ3RELEVBQUVQLElBQVEsQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFDO0FBQ3pCLEVBQUUsVUFBVSxDQUFDLE1BQU07QUFDbkI7QUFDQSxJQUFJTyxRQUFZLENBQUMsS0FBSyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDO0FBQy9DO0FBQ0EsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTLEVBQUM7QUFDekMsR0FBRyxFQUFFLGtCQUFrQixFQUFDO0FBQ3hCO0FBQ0EsRUFBRUEsUUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLGVBQWUsRUFBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBQztBQUM1RSxFQUFFLElBQUksTUFBTSxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRTtBQUM3RCxJQUFJQSxRQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUM7QUFDdkYsR0FBRztBQUNIOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sV0FBVyxHQUFHLENBQUMsZUFBZSxLQUFLO0FBQ3pDLEVBQUUsSUFBSSxLQUFLLEdBQUdHLFFBQVksR0FBRTtBQUM1QixFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDZCxJQUFJLElBQUksSUFBSSxHQUFFO0FBQ2QsR0FBRztBQUNILEVBQUUsS0FBSyxHQUFHQSxRQUFZLEdBQUU7QUFDeEIsRUFBRSxNQUFNLE1BQU0sR0FBR1osU0FBYSxHQUFFO0FBQ2hDO0FBQ0EsRUFBRSxJQUFJbUMsT0FBVyxFQUFFLEVBQUU7QUFDckIsSUFBSWxDLElBQVEsQ0FBQ21CLE9BQVcsRUFBRSxFQUFDO0FBQzNCLEdBQUcsTUFBTTtBQUNULElBQUksYUFBYSxDQUFDLEtBQUssRUFBRSxlQUFlLEVBQUM7QUFDekMsR0FBRztBQUNILEVBQUVsQixJQUFRLENBQUMsTUFBTSxFQUFDO0FBQ2xCO0FBQ0EsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLEVBQUM7QUFDMUMsRUFBRSxLQUFLLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7QUFDdkMsRUFBRSxLQUFLLENBQUMsS0FBSyxHQUFFO0FBQ2YsRUFBQztBQUNEO0FBQ0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFLLEVBQUUsZUFBZSxLQUFLO0FBQ2xELEVBQUUsTUFBTSxPQUFPLEdBQUdILFVBQWMsR0FBRTtBQUNsQyxFQUFFLE1BQU0sTUFBTSxHQUFHQyxTQUFhLEdBQUU7QUFDaEM7QUFDQSxFQUFFLElBQUksQ0FBQyxlQUFlLElBQUk0QixXQUFhLENBQUN2QixnQkFBb0IsRUFBRSxDQUFDLEVBQUU7QUFDakUsSUFBSSxlQUFlLEdBQUdBLGdCQUFvQixHQUFFO0FBQzVDLEdBQUc7QUFDSDtBQUNBLEVBQUVILElBQVEsQ0FBQyxPQUFPLEVBQUM7QUFDbkIsRUFBRSxJQUFJLGVBQWUsRUFBRTtBQUN2QixJQUFJRCxJQUFRLENBQUMsZUFBZSxFQUFDO0FBQzdCLElBQUksTUFBTSxDQUFDLFlBQVksQ0FBQyx3QkFBd0IsRUFBRSxlQUFlLENBQUMsU0FBUyxFQUFDO0FBQzVFLEdBQUc7QUFDSCxFQUFFLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUM7QUFDekQsRUFBRVEsUUFBWSxDQUFDLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxFQUFFLFdBQVcsQ0FBQyxPQUFPLEVBQUM7QUFDckQ7O0FDckNPLE1BQU0sMEJBQTBCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLO0FBQ2hFLEVBQUUsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLE9BQU8sRUFBRTtBQUM3RCxJQUFJLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUM7QUFDeEMsR0FBRyxNQUFNO0FBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztBQUN6RSxLQUFLLGNBQWMsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUN2RSxJQUFJO0FBQ0osSUFBSSxXQUFXLENBQUNKLGdCQUFvQixFQUFFLEVBQUM7QUFDdkMsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQ3RDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDTyxNQUFNLGFBQWEsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEtBQUs7QUFDeEQsRUFBRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFFO0FBQ25DLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNkLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNILEVBQUUsUUFBUSxXQUFXLENBQUMsS0FBSztBQUMzQixJQUFJLEtBQUssVUFBVTtBQUNuQixNQUFNLE9BQU8sZ0JBQWdCLENBQUMsS0FBSyxDQUFDO0FBQ3BDLElBQUksS0FBSyxPQUFPO0FBQ2hCLE1BQU0sT0FBTyxhQUFhLENBQUMsS0FBSyxDQUFDO0FBQ2pDLElBQUksS0FBSyxNQUFNO0FBQ2YsTUFBTSxPQUFPLFlBQVksQ0FBQyxLQUFLLENBQUM7QUFDaEMsSUFBSTtBQUNKLE1BQU0sT0FBTyxXQUFXLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLEtBQUs7QUFDekUsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxLQUFLLE1BQU0sS0FBSyxDQUFDLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFDO0FBQzNEO0FBQ0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxLQUFLLE1BQU0sS0FBSyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxHQUFHLElBQUksRUFBQztBQUNyRTtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBSztBQUMzQixFQUFFLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxHQUFHLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFJO0FBQ3RHO0FBQ0EsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDakQsRUFBRSxNQUFNLEtBQUssR0FBR08sUUFBWSxHQUFFO0FBQzlCLEVBQUUsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFlBQVk7QUFDM0MsSUFBSSxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBQztBQUN2RixFQUFFLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxFQUFFO0FBQzdFLElBQUksV0FBVyxDQUFDUCxnQkFBb0IsRUFBRSxFQUFDO0FBQ3ZDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxZQUFZLEtBQUs7QUFDMUQsTUFBTSxRQUFRLENBQUMsV0FBVyxHQUFFO0FBQzVCLE1BQU0sbUJBQW1CLENBQUMsWUFBWSxFQUFDO0FBQ3ZDLEtBQUssRUFBQztBQUNOLEdBQUcsTUFBTSxJQUFJLE9BQU8sTUFBTSxDQUFDLFlBQVksS0FBSyxRQUFRLEVBQUU7QUFDdEQsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFDO0FBQzVDLEdBQUcsTUFBTTtBQUNULElBQUksS0FBSyxDQUFDLENBQUMsc0VBQXNFLEVBQUUsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBQztBQUNoSCxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQVEsRUFBRSxNQUFNLEtBQUs7QUFDL0MsRUFBRSxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsUUFBUSxHQUFFO0FBQ25DLEVBQUVKLElBQVEsQ0FBQyxLQUFLLEVBQUM7QUFDakIsRUFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUM5QixLQUFLLElBQUksQ0FBQyxDQUFDLFVBQVUsS0FBSztBQUMxQixNQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssS0FBSyxRQUFRLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxDQUFDLEVBQUM7QUFDN0YsTUFBTUMsSUFBUSxDQUFDLEtBQUssRUFBQztBQUNyQixNQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUU7QUFDbkIsTUFBTSxRQUFRLENBQUMsV0FBVyxHQUFFO0FBQzVCLEtBQUssQ0FBQztBQUNOLEtBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLO0FBQ3BCLE1BQU0sS0FBSyxDQUFDLENBQUMsNkJBQTZCLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBQztBQUNsRCxNQUFNLEtBQUssQ0FBQyxLQUFLLEdBQUcsR0FBRTtBQUN0QixNQUFNQSxJQUFRLENBQUMsS0FBSyxFQUFDO0FBQ3JCLE1BQU0sS0FBSyxDQUFDLEtBQUssR0FBRTtBQUNuQixNQUFNLFFBQVEsQ0FBQyxXQUFXLEdBQUU7QUFDNUIsS0FBSyxFQUFDO0FBQ04sRUFBQztBQUNEO0FBQ0EsTUFBTSxvQkFBb0IsR0FBRztBQUM3QixFQUFFLE1BQU0sRUFBRSxDQUFDLEtBQUssRUFBRSxZQUFZLEVBQUUsTUFBTSxLQUFLO0FBQzNDLElBQUksTUFBTSxNQUFNLEdBQUcscUJBQXFCLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUM7QUFDbkUsSUFBSSxNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sRUFBRSxXQUFXLEVBQUUsV0FBVyxLQUFLO0FBQy9ELE1BQU0sTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUM7QUFDckQsTUFBTSxNQUFNLENBQUMsS0FBSyxHQUFHLFlBQVc7QUFDaEMsTUFBTUUsWUFBZ0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFDO0FBQzNDLE1BQU0sTUFBTSxDQUFDLFFBQVEsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUM7QUFDbEUsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBQztBQUNoQyxNQUFLO0FBQ0wsSUFBSSxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxLQUFLO0FBQzFDLE1BQU0sTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBQztBQUN4QyxNQUFNLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLEVBQUM7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtBQUN0QztBQUNBLFFBQVEsTUFBTSxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxVQUFVLEVBQUM7QUFDM0QsUUFBUSxRQUFRLENBQUMsS0FBSyxHQUFHLFlBQVc7QUFDcEMsUUFBUSxRQUFRLENBQUMsUUFBUSxHQUFHLE1BQUs7QUFDakMsUUFBUSxNQUFNLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBQztBQUNwQyxRQUFRLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUM7QUFDdEUsT0FBTyxNQUFNO0FBQ2I7QUFDQSxRQUFRLFlBQVksQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBQztBQUN0RCxPQUFPO0FBQ1AsS0FBSyxFQUFDO0FBQ04sSUFBSSxNQUFNLENBQUMsS0FBSyxHQUFFO0FBQ2xCLEdBQUc7QUFDSDtBQUNBLEVBQUUsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLFlBQVksRUFBRSxNQUFNLEtBQUs7QUFDMUMsSUFBSSxNQUFNLEtBQUssR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssRUFBQztBQUNqRSxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEtBQUs7QUFDMUMsTUFBTSxNQUFNLFVBQVUsR0FBRyxXQUFXLENBQUMsQ0FBQyxFQUFDO0FBQ3ZDLE1BQU0sTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLENBQUMsRUFBQztBQUN2QyxNQUFNLE1BQU0sVUFBVSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsT0FBTyxFQUFDO0FBQ3hELE1BQU0sTUFBTSxpQkFBaUIsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBQztBQUMvRCxNQUFNLFVBQVUsQ0FBQyxJQUFJLEdBQUcsUUFBTztBQUMvQixNQUFNLFVBQVUsQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDLE1BQUs7QUFDekMsTUFBTSxVQUFVLENBQUMsS0FBSyxHQUFHLFdBQVU7QUFDbkMsTUFBTSxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ3JELFFBQVEsVUFBVSxDQUFDLE9BQU8sR0FBRyxLQUFJO0FBQ2pDLE9BQU87QUFDUCxNQUFNLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO0FBQ2xELE1BQU1BLFlBQWdCLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBQztBQUN6QyxNQUFNLEtBQUssQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDLE1BQUs7QUFDekMsTUFBTSxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFDO0FBQy9DLE1BQU0saUJBQWlCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQztBQUMxQyxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUM7QUFDMUMsS0FBSyxFQUFDO0FBQ04sSUFBSSxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFDO0FBQ2xELElBQUksSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQ3ZCLE1BQU0sTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRTtBQUN2QixLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxrQkFBa0IsR0FBRyxDQUFDLFlBQVksS0FBSztBQUM3QyxFQUFFLE1BQU0sTUFBTSxHQUFHLEdBQUU7QUFDbkIsRUFBRSxJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsSUFBSSxZQUFZLFlBQVksR0FBRyxFQUFFO0FBQ2pFLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEtBQUs7QUFDekMsTUFBTSxJQUFJLGNBQWMsR0FBRyxNQUFLO0FBQ2hDLE1BQU0sSUFBSSxPQUFPLGNBQWMsS0FBSyxRQUFRLEVBQUU7QUFDOUM7QUFDQSxRQUFRLGNBQWMsR0FBRyxrQkFBa0IsQ0FBQyxjQUFjLEVBQUM7QUFDM0QsT0FBTztBQUNQLE1BQU0sTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsRUFBQztBQUN4QyxLQUFLLEVBQUM7QUFDTixHQUFHLE1BQU07QUFDVCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxLQUFLO0FBQy9DLE1BQU0sSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLEdBQUcsRUFBQztBQUM1QyxNQUFNLElBQUksT0FBTyxjQUFjLEtBQUssUUFBUSxFQUFFO0FBQzlDO0FBQ0EsUUFBUSxjQUFjLEdBQUcsa0JBQWtCLENBQUMsY0FBYyxFQUFDO0FBQzNELE9BQU87QUFDUCxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLEVBQUM7QUFDeEMsS0FBSyxFQUFDO0FBQ04sR0FBRztBQUNILEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEVBQUUsVUFBVSxLQUFLO0FBQ2hELEVBQUUsT0FBTyxVQUFVLElBQUksVUFBVSxDQUFDLFFBQVEsRUFBRSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUU7QUFDdkU7O0FDbktBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsV0FBVyxHQUFHO0FBQ3ZCO0FBQ0EsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUM7QUFDeEQsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ3BCLElBQUksTUFBTTtBQUNWLEdBQUc7QUFDSCxFQUFFLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUNsRCxFQUFFSCxJQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBQztBQUMzQixFQUFFLElBQUlrQyxPQUFXLEVBQUUsRUFBRTtBQUNyQixJQUFJLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtBQUMxQixNQUFNakMsSUFBUSxDQUFDa0IsT0FBVyxFQUFFLEVBQUM7QUFDN0IsS0FBSztBQUNMLEdBQUcsTUFBTTtBQUNULElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFDO0FBQy9CLEdBQUc7QUFDSCxFQUFFWixXQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxXQUFXLENBQUMsT0FBTyxFQUFDO0FBQzFFLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsV0FBVyxFQUFDO0FBQzdDLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsY0FBYyxFQUFDO0FBQ2hELEVBQUUsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLEdBQUcsTUFBSztBQUN6QyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxHQUFHLE1BQUs7QUFDdEMsRUFBRSxRQUFRLENBQUMsWUFBWSxDQUFDLFFBQVEsR0FBRyxNQUFLO0FBQ3hDLENBQUM7QUFDRDtBQUNBLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEtBQUs7QUFDeEMsRUFBRSxNQUFNLGVBQWUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLHdCQUF3QixDQUFDLEVBQUM7QUFDdkgsRUFBRSxJQUFJLGVBQWUsQ0FBQyxNQUFNLEVBQUU7QUFDOUIsSUFBSU4sSUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUM7QUFDaEQsR0FBRyxNQUFNLElBQUlvQyxtQkFBdUIsRUFBRSxFQUFFO0FBQ3hDLElBQUlyQyxJQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBQztBQUM5QixHQUFHO0FBQ0g7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sU0FBUyxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ25DLEVBQUUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLElBQUksRUFBQztBQUNwRSxFQUFFLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUM7QUFDOUQsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2pCLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNILEVBQUUsT0FBT2MsVUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4RDs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFlO0FBQ2YsRUFBRSxrQkFBa0IsRUFBRSxJQUFJLE9BQU8sRUFBRTtBQUNuQyxFQUFFLGlCQUFpQixFQUFFLElBQUksT0FBTyxFQUFFO0FBQ2xDOztBQ1dBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sU0FBUyxHQUFHLE1BQU07QUFDL0IsRUFBRSxPQUFPd0IsV0FBa0IsQ0FBQzNCLFFBQVksRUFBRSxDQUFDO0FBQzNDLEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sWUFBWSxHQUFHLE1BQU1QLGdCQUFvQixFQUFFLElBQUlBLGdCQUFvQixFQUFFLENBQUMsS0FBSyxHQUFFO0FBQzFGO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxTQUFTLEdBQUcsTUFBTUMsYUFBaUIsRUFBRSxJQUFJQSxhQUFpQixFQUFFLENBQUMsS0FBSyxHQUFFO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxXQUFXLEdBQUcsTUFBTUMsZUFBbUIsRUFBRSxJQUFJQSxlQUFtQixFQUFFLENBQUMsS0FBSzs7QUN0QzlFLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxXQUFXLEtBQUs7QUFDckQsRUFBRSxJQUFJLFdBQVcsQ0FBQyxhQUFhLElBQUksV0FBVyxDQUFDLG1CQUFtQixFQUFFO0FBQ3BFLElBQUksV0FBVyxDQUFDLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLGNBQWMsRUFBRTtBQUN6RixNQUFNLE9BQU8sRUFBRSxXQUFXLENBQUMsc0JBQXNCO0FBQ2pELEtBQUssRUFBQztBQUNOLElBQUksV0FBVyxDQUFDLG1CQUFtQixHQUFHLE1BQUs7QUFDM0MsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNPLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEtBQUs7QUFDdEYsRUFBRSxvQkFBb0IsQ0FBQyxXQUFXLEVBQUM7QUFDbkMsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUMxQixJQUFJLFdBQVcsQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLEtBQUssY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxFQUFDO0FBQ2hGLElBQUksV0FBVyxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsc0JBQXNCLEdBQUcsTUFBTSxHQUFHSyxRQUFZLEdBQUU7QUFDNUYsSUFBSSxXQUFXLENBQUMsc0JBQXNCLEdBQUcsV0FBVyxDQUFDLHVCQUFzQjtBQUMzRSxJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxjQUFjLEVBQUU7QUFDdEYsTUFBTSxPQUFPLEVBQUUsV0FBVyxDQUFDLHNCQUFzQjtBQUNqRCxLQUFLLEVBQUM7QUFDTixJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsR0FBRyxLQUFJO0FBQzFDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNPLE1BQU0sUUFBUSxHQUFHLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEtBQUs7QUFDM0QsRUFBRSxNQUFNLGlCQUFpQixHQUFHNEIsb0JBQXdCLEdBQUU7QUFDdEQ7QUFDQSxFQUFFLElBQUksaUJBQWlCLENBQUMsTUFBTSxFQUFFO0FBQ2hDLElBQUksS0FBSyxHQUFHLEtBQUssR0FBRyxVQUFTO0FBQzdCO0FBQ0E7QUFDQSxJQUFJLElBQUksS0FBSyxLQUFLLGlCQUFpQixDQUFDLE1BQU0sRUFBRTtBQUM1QyxNQUFNLEtBQUssR0FBRyxFQUFDO0FBQ2Y7QUFDQTtBQUNBLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsRUFBRTtBQUM3QixNQUFNLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEdBQUcsRUFBQztBQUMxQyxLQUFLO0FBQ0w7QUFDQSxJQUFJLE9BQU8saUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQzNDLEdBQUc7QUFDSDtBQUNBLEVBQUU1QixRQUFZLEVBQUUsQ0FBQyxLQUFLLEdBQUU7QUFDeEIsRUFBQztBQUNEO0FBQ0EsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLFlBQVksRUFBRSxXQUFXLEVBQUM7QUFDdkQ7QUFDQSxNQUFNLHVCQUF1QixHQUFHLENBQUMsV0FBVyxFQUFFLFNBQVMsRUFBQztBQUN4RDtBQUNBLE1BQU0sY0FBYyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxXQUFXLEtBQUs7QUFDckQsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7QUFDNUQ7QUFDQSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUU7QUFDcEIsSUFBSSxNQUFNO0FBQ1YsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFLElBQUksQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtBQUMxQyxJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksV0FBVyxDQUFDLHNCQUFzQixFQUFFO0FBQzFDLElBQUksQ0FBQyxDQUFDLGVBQWUsR0FBRTtBQUN2QixHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLE9BQU8sRUFBRTtBQUN6QixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBQztBQUN6QyxHQUFHO0FBQ0g7QUFDQTtBQUNBLE9BQU8sSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEtBQUssRUFBRTtBQUM1QixJQUFJLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxFQUFDO0FBQzdCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsT0FBTyxJQUFJLENBQUMsR0FBRyxtQkFBbUIsRUFBRSxHQUFHLHVCQUF1QixDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNqRixJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFDO0FBQ3ZCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsT0FBTyxJQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUssUUFBUSxFQUFFO0FBQy9CLElBQUksU0FBUyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDO0FBQzFDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsV0FBVyxLQUFLO0FBQ2xEO0FBQ0EsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUNsRCxJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEtBQUssUUFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRTtBQUMvRixJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUMxRCxNQUFNLE1BQU07QUFDWixLQUFLO0FBQ0w7QUFDQSxJQUFJLFlBQVksR0FBRTtBQUNsQixJQUFJLENBQUMsQ0FBQyxjQUFjLEdBQUU7QUFDdEIsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLFdBQVcsS0FBSztBQUN0QyxFQUFFLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQyxPQUFNO0FBQ2hDO0FBQ0EsRUFBRSxNQUFNLGlCQUFpQixHQUFHNEIsb0JBQXdCLEdBQUU7QUFDdEQsRUFBRSxJQUFJLFFBQVEsR0FBRyxDQUFDLEVBQUM7QUFDbkIsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JELElBQUksSUFBSSxhQUFhLEtBQUssaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEVBQUU7QUFDaEQsTUFBTSxRQUFRLEdBQUcsRUFBQztBQUNsQixNQUFNLEtBQUs7QUFDWCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFO0FBQ25CLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxFQUFDO0FBQ3RDLEdBQUc7QUFDSDtBQUNBO0FBQ0EsT0FBTztBQUNQLElBQUksUUFBUSxDQUFDLFdBQVcsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDLEVBQUM7QUFDdkMsR0FBRztBQUNIO0FBQ0EsRUFBRSxDQUFDLENBQUMsZUFBZSxHQUFFO0FBQ3JCLEVBQUUsQ0FBQyxDQUFDLGNBQWMsR0FBRTtBQUNwQixFQUFDO0FBQ0Q7QUFDQSxNQUFNLFlBQVksR0FBRyxDQUFDLEdBQUcsS0FBSztBQUM5QixFQUFFLE1BQU0sYUFBYSxHQUFHbkMsZ0JBQW9CLEdBQUU7QUFDOUMsRUFBRSxNQUFNLFVBQVUsR0FBR0MsYUFBaUIsR0FBRTtBQUN4QyxFQUFFLE1BQU0sWUFBWSxHQUFHQyxlQUFtQixHQUFFO0FBQzVDLEVBQUUsSUFBSSxDQUFDLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxFQUFFO0FBQ25GLElBQUksTUFBTTtBQUNWLEdBQUc7QUFDSCxFQUFFLE1BQU0sT0FBTyxHQUFHLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxvQkFBb0IsR0FBRyx5QkFBd0I7QUFDckcsRUFBRSxJQUFJLGFBQWEsR0FBRyxRQUFRLENBQUMsY0FBYTtBQUM1QyxFQUFFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBR1IsVUFBYyxFQUFFLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3RCxJQUFJLGFBQWEsR0FBRyxhQUFhLENBQUMsT0FBTyxFQUFDO0FBQzFDLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtBQUN4QixNQUFNLE1BQU07QUFDWixLQUFLO0FBQ0wsSUFBSSxJQUFJNkIsV0FBYSxDQUFDLGFBQWEsQ0FBQyxJQUFJLGFBQWEsWUFBWSxpQkFBaUIsRUFBRTtBQUNwRixNQUFNLEtBQUs7QUFDWCxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsSUFBSSxhQUFhLFlBQVksaUJBQWlCLEVBQUU7QUFDbEQsSUFBSSxhQUFhLENBQUMsS0FBSyxHQUFFO0FBQ3pCLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxLQUFLO0FBQ25ELEVBQUUsSUFBSSxjQUFjLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxFQUFFO0FBQ2xELElBQUksQ0FBQyxDQUFDLGNBQWMsR0FBRTtBQUN0QixJQUFJLFdBQVcsQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFDO0FBQ2xDLEdBQUc7QUFDSDs7QUMxSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLHdCQUF3QixDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsRUFBRTtBQUM5RSxFQUFFLElBQUlPLE9BQVcsRUFBRSxFQUFFO0FBQ3JCLElBQUkseUJBQXlCLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBQztBQUNqRCxHQUFHLE1BQU07QUFDVCxJQUFJLG9CQUFvQixDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLHlCQUF5QixDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsRUFBQztBQUMvRixJQUFJLG9CQUFvQixDQUFDLFdBQVcsRUFBQztBQUNyQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sUUFBUSxHQUFHLGdDQUFnQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFDO0FBQzdFO0FBQ0E7QUFDQSxFQUFFLElBQUksUUFBUSxFQUFFO0FBQ2hCLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUM7QUFDOUQsSUFBSSxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBQztBQUN0QyxJQUFJLFNBQVMsQ0FBQyxTQUFTLEdBQUcsR0FBRTtBQUM1QixHQUFHLE1BQU07QUFDVCxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUU7QUFDdEIsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJRCxPQUFXLEVBQUUsRUFBRTtBQUNyQixJQUFJLGFBQWEsR0FBRTtBQUNuQixJQUFJLFVBQVUsR0FBRTtBQUNoQixJQUFJLGVBQWUsR0FBRTtBQUNyQixHQUFHO0FBQ0g7QUFDQSxFQUFFLGlCQUFpQixHQUFFO0FBQ3JCLENBQUM7QUFDRDtBQUNBLFNBQVMsaUJBQWlCLEdBQUc7QUFDN0IsRUFBRTFCLFdBQWU7QUFDakIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLEVBQUUsUUFBUSxDQUFDLElBQUksQ0FBQztBQUM3QyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxDQUFDLGFBQWEsQ0FBQyxFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQztBQUMzRyxJQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ08sU0FBUyxLQUFLLENBQUMsWUFBWSxFQUFFO0FBQ3BDLEVBQUUsWUFBWSxHQUFHLG1CQUFtQixDQUFDLFlBQVksRUFBQztBQUNsRDtBQUNBLEVBQUUsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUN4RTtBQUNBLEVBQUUsTUFBTSxRQUFRLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxFQUFDO0FBQzFDO0FBQ0EsRUFBRSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO0FBQ2hDO0FBQ0EsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRTtBQUNuQyxNQUFNLHFCQUFxQixDQUFDLElBQUksRUFBQztBQUNqQyxNQUFNLGtCQUFrQixDQUFDLFlBQVksRUFBQztBQUN0QyxLQUFLO0FBQ0wsR0FBRyxNQUFNLElBQUksUUFBUSxFQUFFO0FBQ3ZCO0FBQ0EsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLEVBQUM7QUFDcEMsR0FBRztBQUNILENBQUM7QUFDRDtBQUNPLFNBQVMsaUJBQWlCLEdBQUc7QUFDcEMsRUFBRSxPQUFPLENBQUMsQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUM7QUFDakQsQ0FBQztBQUNEO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLFFBQVEsS0FBSztBQUN4QyxFQUFFLE1BQU0sS0FBSyxHQUFHSSxRQUFZLEdBQUU7QUFDOUI7QUFDQSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7QUFDZCxJQUFJLE9BQU8sS0FBSztBQUNoQixHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUM1RCxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUlvQixRQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDeEUsSUFBSSxPQUFPLEtBQUs7QUFDaEIsR0FBRztBQUNIO0FBQ0EsRUFBRXhCLFdBQWUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUM7QUFDckQsRUFBRUMsUUFBWSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBQztBQUNsRDtBQUNBLEVBQUUsTUFBTSxRQUFRLEdBQUdFLFlBQWdCLEdBQUU7QUFDckMsRUFBRUgsV0FBZSxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBQztBQUMzRCxFQUFFQyxRQUFZLENBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFDO0FBQ3hEO0FBQ0EsRUFBRSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLFdBQVcsRUFBQztBQUNwRDtBQUNBLEVBQUUsT0FBTyxJQUFJO0FBQ2IsRUFBQztBQUNEO0FBQ08sU0FBUyxhQUFhLENBQUMsS0FBSyxFQUFFO0FBQ3JDLEVBQUUsTUFBTSxhQUFhLEdBQUcsY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUM7QUFDbEUsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLEVBQUM7QUFDN0IsRUFBRSxJQUFJLGFBQWEsRUFBRTtBQUNyQjtBQUNBLElBQUksYUFBYSxDQUFDLEtBQUssRUFBQztBQUN4QixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ08sTUFBTSxxQkFBcUIsR0FBRyxDQUFDLFFBQVEsS0FBSztBQUNuRCxFQUFFLElBQUksUUFBUSxDQUFDLGlCQUFpQixFQUFFLEVBQUU7QUFDcEMsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUM7QUFDakQ7QUFDQSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsRUFBRTtBQUNqRCxNQUFNLFFBQVEsQ0FBQyxRQUFRLEdBQUU7QUFDekIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLG1CQUFtQixHQUFHLENBQUMsWUFBWSxLQUFLO0FBQzlDO0FBQ0EsRUFBRSxJQUFJLE9BQU8sWUFBWSxLQUFLLFdBQVcsRUFBRTtBQUMzQyxJQUFJLE9BQU87QUFDWCxNQUFNLFdBQVcsRUFBRSxLQUFLO0FBQ3hCLE1BQU0sUUFBUSxFQUFFLEtBQUs7QUFDckIsTUFBTSxXQUFXLEVBQUUsSUFBSTtBQUN2QixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNO0FBQ3RCLElBQUk7QUFDSixNQUFNLFdBQVcsRUFBRSxLQUFLO0FBQ3hCLE1BQU0sUUFBUSxFQUFFLEtBQUs7QUFDckIsTUFBTSxXQUFXLEVBQUUsS0FBSztBQUN4QixLQUFLO0FBQ0wsSUFBSSxZQUFZO0FBQ2hCLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLG9CQUFvQixHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxXQUFXLEtBQUs7QUFDL0QsRUFBRSxNQUFNLFNBQVMsR0FBR0UsWUFBZ0IsR0FBRTtBQUN0QztBQUNBLEVBQUUsTUFBTSxvQkFBb0IsR0FBR3lCLGlCQUFxQixJQUFJQyxlQUFtQixDQUFDLEtBQUssRUFBQztBQUNsRjtBQUNBLEVBQUUsSUFBSSxPQUFPLFdBQVcsQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFO0FBQ25ELElBQUksV0FBVyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUM7QUFDaEMsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLG9CQUFvQixFQUFFO0FBQzVCLElBQUksWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxDQUFDLFFBQVEsRUFBQztBQUMzRixHQUFHLE1BQU07QUFDVDtBQUNBLElBQUksd0JBQXdCLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUM7QUFDaEcsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sWUFBWSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFFBQVEsS0FBSztBQUM1RSxFQUFFLFdBQVcsQ0FBQyw4QkFBOEIsR0FBRyx3QkFBd0IsQ0FBQyxJQUFJO0FBQzVFLElBQUksSUFBSTtBQUNSLElBQUksUUFBUTtBQUNaLElBQUksU0FBUztBQUNiLElBQUksV0FBVztBQUNmLElBQUksUUFBUTtBQUNaLElBQUc7QUFDSCxFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQ0QsaUJBQXFCLEVBQUUsVUFBVSxDQUFDLEVBQUU7QUFDN0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssS0FBSyxFQUFFO0FBQzVCLE1BQU0sV0FBVyxDQUFDLDhCQUE4QixHQUFFO0FBQ2xELE1BQU0sT0FBTyxXQUFXLENBQUMsK0JBQThCO0FBQ3ZELEtBQUs7QUFDTCxHQUFHLEVBQUM7QUFDSixFQUFDO0FBQ0Q7QUFDQSxNQUFNLHlCQUF5QixHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsS0FBSztBQUMxRCxFQUFFLFVBQVUsQ0FBQyxNQUFNO0FBQ25CLElBQUksSUFBSSxPQUFPLFFBQVEsS0FBSyxVQUFVLEVBQUU7QUFDeEMsTUFBTSxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRTtBQUN0QyxLQUFLO0FBQ0wsSUFBSSxRQUFRLENBQUMsUUFBUSxHQUFFO0FBQ3ZCLEdBQUcsRUFBQztBQUNKOztBQzdLQSxTQUFTLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFO0FBQ3pELEVBQUUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO0FBQ3RELEVBQUUsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sS0FBSztBQUM5QixJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUTtBQUN4QyxHQUFHLEVBQUM7QUFDSixDQUFDO0FBQ0Q7QUFDQSxTQUFTLGdCQUFnQixDQUFDLEtBQUssRUFBRSxRQUFRLEVBQUU7QUFDM0MsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFO0FBQ2QsSUFBSSxPQUFPLEtBQUs7QUFDaEIsR0FBRztBQUNILEVBQUUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtBQUM5QixJQUFJLE1BQU0sZUFBZSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsV0FBVTtBQUN2RCxJQUFJLE1BQU0sTUFBTSxHQUFHLGVBQWUsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUM7QUFDNUQsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM1QyxNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsU0FBUTtBQUNuQyxLQUFLO0FBQ0wsR0FBRyxNQUFNO0FBQ1QsSUFBSSxLQUFLLENBQUMsUUFBUSxHQUFHLFNBQVE7QUFDN0IsR0FBRztBQUNILENBQUM7QUFDRDtBQUNPLFNBQVMsYUFBYSxHQUFHO0FBQ2hDLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxFQUFFLENBQUMsZUFBZSxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUMsRUFBRSxLQUFLLEVBQUM7QUFDbEYsQ0FBQztBQUNEO0FBQ08sU0FBUyxjQUFjLEdBQUc7QUFDakMsRUFBRSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxlQUFlLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBQztBQUNqRixDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsR0FBRztBQUM5QixFQUFFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQztBQUNqRCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFlBQVksR0FBRztBQUMvQixFQUFFLE9BQU8sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLElBQUksQ0FBQztBQUNoRDs7QUNsQ0E7QUFDTyxTQUFTLHFCQUFxQixDQUFDLEtBQUssRUFBRTtBQUM3QyxFQUFFLE1BQU0sUUFBUSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUNsRCxFQUFFLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUNuRCxFQUFFaEMsWUFBZ0IsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsS0FBSyxFQUFDO0FBQ3JELEVBQUUsUUFBUSxDQUFDLGlCQUFpQixDQUFDLFNBQVMsR0FBRyxXQUFXLENBQUMsb0JBQW9CLEVBQUM7QUFDMUUsRUFBRSxJQUFJLE1BQU0sQ0FBQyxXQUFXLElBQUksTUFBTSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRTtBQUNsRSxJQUFJSyxRQUFZLENBQUMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxXQUFXLENBQUMsaUJBQWlCLEVBQUM7QUFDbEYsR0FBRztBQUNILEVBQUVQLElBQVEsQ0FBQyxRQUFRLENBQUMsaUJBQWlCLEVBQUM7QUFDdEM7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUU7QUFDL0IsRUFBRSxJQUFJLEtBQUssRUFBRTtBQUNiLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxjQUFjLEVBQUUsSUFBSSxFQUFDO0FBQzVDLElBQUksS0FBSyxDQUFDLFlBQVksQ0FBQyxrQkFBa0IsRUFBRSxXQUFXLENBQUMsb0JBQW9CLENBQUMsRUFBQztBQUM3RSxJQUFJWSxVQUFjLENBQUMsS0FBSyxFQUFDO0FBQ3pCLElBQUlMLFFBQVksQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFVBQVUsRUFBQztBQUMvQyxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0E7QUFDTyxTQUFTLHNCQUFzQixHQUFHO0FBQ3pDLEVBQUUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDO0FBQ2xELEVBQUUsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7QUFDbEMsSUFBSVIsSUFBUSxDQUFDLFFBQVEsQ0FBQyxpQkFBaUIsRUFBQztBQUN4QyxHQUFHO0FBQ0g7QUFDQSxFQUFFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUU7QUFDL0IsRUFBRSxJQUFJLEtBQUssRUFBRTtBQUNiLElBQUksS0FBSyxDQUFDLGVBQWUsQ0FBQyxjQUFjLEVBQUM7QUFDekMsSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLGtCQUFrQixFQUFDO0FBQzdDLElBQUlPLFdBQWUsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLFVBQVUsRUFBQztBQUNsRCxHQUFHO0FBQ0g7O0FDbkNPLFNBQVMsZ0JBQWdCLEdBQUc7QUFDbkMsRUFBRSxNQUFNLFFBQVEsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUM7QUFDbEQsRUFBRSxPQUFPLFFBQVEsQ0FBQyxhQUFhO0FBQy9COztBQ0FBO0FBQ0E7QUFDQTtBQUNPLFNBQVMsTUFBTSxDQUFDLE1BQU0sRUFBRTtBQUMvQixFQUFFLE1BQU0sS0FBSyxHQUFHSSxRQUFZLEdBQUU7QUFDOUIsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUM7QUFDeEQ7QUFDQSxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUlvQixRQUFZLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUU7QUFDbEUsSUFBSSxPQUFPLElBQUk7QUFDZixNQUFNLENBQUMsMElBQTBJLENBQUM7QUFDbEosS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBLEVBQUUsTUFBTSxvQkFBb0IsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUM7QUFDeEQ7QUFDQSxFQUFFLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxvQkFBb0IsRUFBQztBQUM1RTtBQUNBLEVBQUVTLE1BQVUsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFDO0FBQ2pDO0FBQ0EsRUFBRSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFDO0FBQ25ELEVBQUUsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUNoQyxJQUFJLE1BQU0sRUFBRTtBQUNaLE1BQU0sS0FBSyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO0FBQ25ELE1BQU0sUUFBUSxFQUFFLEtBQUs7QUFDckIsTUFBTSxVQUFVLEVBQUUsSUFBSTtBQUN0QixLQUFLO0FBQ0wsR0FBRyxFQUFDO0FBQ0osQ0FBQztBQUNEO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLE1BQU0sS0FBSztBQUN0QyxFQUFFLE1BQU0sb0JBQW9CLEdBQUcsR0FBRTtBQUNqQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxLQUFLO0FBQ3pDLElBQUksSUFBSSxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNyQyxNQUFNLG9CQUFvQixDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLEVBQUM7QUFDakQsS0FBSyxNQUFNO0FBQ1gsTUFBTSxJQUFJO0FBQ1YsUUFBUSxDQUFDLDhCQUE4QixFQUFFLEtBQUssQ0FBQyx5UUFBeVEsQ0FBQztBQUN6VCxRQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKLEVBQUUsT0FBTyxvQkFBb0I7QUFDN0I7O0FDMUNPLFNBQVMsUUFBUSxHQUFHO0FBQzNCLEVBQUUsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDO0FBQ2xELEVBQUUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDO0FBQ3hEO0FBQ0EsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFO0FBQ3BCLElBQUksZUFBZSxDQUFDLElBQUksRUFBQztBQUN6QixJQUFJLE1BQU07QUFDVixHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxRQUFRLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyw4QkFBOEIsRUFBRTtBQUNwRSxJQUFJLFdBQVcsQ0FBQyw4QkFBOEIsR0FBRTtBQUNoRCxJQUFJLE9BQU8sV0FBVyxDQUFDLCtCQUE4QjtBQUNyRCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxXQUFXLENBQUMsa0JBQWtCLEVBQUU7QUFDdEMsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLGtCQUFrQixFQUFDO0FBQ2hELElBQUksT0FBTyxXQUFXLENBQUMsbUJBQWtCO0FBQ3pDLEdBQUc7QUFDSDtBQUNBLEVBQUUsSUFBSSxPQUFPLFdBQVcsQ0FBQyxVQUFVLEtBQUssVUFBVSxFQUFFO0FBQ3BELElBQUksV0FBVyxDQUFDLFVBQVUsR0FBRTtBQUM1QixHQUFHO0FBQ0gsRUFBRSxXQUFXLENBQUMsSUFBSSxFQUFDO0FBQ25CLENBQUM7QUFDRDtBQUNBLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxLQUFLO0FBQ2xDLEVBQUUsZUFBZSxDQUFDLFFBQVEsRUFBQztBQUMzQjtBQUNBLEVBQUUsT0FBTyxRQUFRLENBQUMsT0FBTTtBQUN4QjtBQUNBLEVBQUUsT0FBTyxXQUFXLENBQUMsZUFBYztBQUNuQyxFQUFFLE9BQU8sV0FBVyxDQUFDLGNBQWE7QUFDbEM7QUFDQSxFQUFFLE9BQU8sV0FBVyxDQUFDLGdCQUFlO0FBQ3BDLEVBQUM7QUFDRDtBQUNBLE1BQU0sZUFBZSxHQUFHLENBQUMsUUFBUSxLQUFLO0FBQ3RDO0FBQ0EsRUFBRSxJQUFJLFFBQVEsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO0FBQ3BDLElBQUksYUFBYSxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUM7QUFDekMsSUFBSSxZQUFZLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxFQUFDO0FBQ3BELEdBQUcsTUFBTTtBQUNULElBQUksYUFBYSxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUM7QUFDM0MsSUFBSSxhQUFhLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBQztBQUN6QyxHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLEVBQUUsUUFBUSxLQUFLO0FBQ3pDLEVBQUUsS0FBSyxNQUFNLENBQUMsSUFBSSxHQUFHLEVBQUU7QUFDdkIsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBQztBQUMzQixHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoRE8sTUFBTSx3QkFBd0IsR0FBRyxDQUFDLFFBQVEsS0FBSztBQUN0RCxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUM1RCxFQUFFLFFBQVEsQ0FBQyxjQUFjLEdBQUU7QUFDM0IsRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDekIsSUFBSSw0QkFBNEIsQ0FBQyxRQUFRLEVBQUUsU0FBUyxFQUFDO0FBQ3JELEdBQUcsTUFBTTtBQUNULElBQUksT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDM0IsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNPLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxRQUFRLEtBQUs7QUFDbkQsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7QUFDNUQsRUFBRSxRQUFRLENBQUMsY0FBYyxHQUFFO0FBQzNCLEVBQUUsSUFBSSxXQUFXLENBQUMsc0JBQXNCLEVBQUU7QUFDMUMsSUFBSSw0QkFBNEIsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQ2xELEdBQUcsTUFBTTtBQUNULElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUM7QUFDekIsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNPLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsV0FBVyxLQUFLO0FBQ2xFLEVBQUUsUUFBUSxDQUFDLGNBQWMsR0FBRTtBQUMzQixFQUFFLFdBQVcsQ0FBQyxhQUFhLENBQUMsTUFBTSxFQUFDO0FBQ25DLEVBQUM7QUFDRDtBQUNBLE1BQU0sNEJBQTRCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsSUFBSSw4QkFBOEI7QUFDbEYsRUFBRSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7QUFDNUQsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtBQUMxQixJQUFJLE9BQU8sS0FBSztBQUNoQixNQUFNLENBQUMsdUVBQXVFLEVBQUUscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUM3RyxLQUFLO0FBQ0wsR0FBRztBQUNILEVBQUUsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLFFBQVEsRUFBRSxXQUFXLEVBQUM7QUFDekQsRUFBRSxJQUFJLFdBQVcsQ0FBQyxjQUFjLEVBQUU7QUFDbEMsSUFBSSxvQkFBb0IsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQztBQUNwRCxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxhQUFhLEVBQUUsRUFBRTtBQUNuRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEdBQUU7QUFDNUIsSUFBSSxRQUFRLENBQUMscUJBQXFCLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFDO0FBQ2pFLEdBQUcsTUFBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7QUFDOUIsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBQztBQUM5QixHQUFHLE1BQU07QUFDVCxJQUFJLE9BQU8sQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFDO0FBQ2pDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLG9CQUFvQixHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsRUFBRSxJQUFJLDhCQUE4QjtBQUN0RixFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUM1RCxFQUFFLFFBQVEsQ0FBQyxZQUFZLEdBQUU7QUFDekIsRUFBRSxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDbkQsSUFBSSxTQUFTLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDcEYsSUFBRztBQUNILEVBQUUsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUMsaUJBQWlCLEtBQUs7QUFDaEQsSUFBSSxRQUFRLENBQUMsYUFBYSxHQUFFO0FBQzVCLElBQUksUUFBUSxDQUFDLFdBQVcsR0FBRTtBQUMxQixJQUFJLElBQUksaUJBQWlCLEVBQUU7QUFDM0IsTUFBTSxRQUFRLENBQUMscUJBQXFCLENBQUMsaUJBQWlCLEVBQUM7QUFDdkQsS0FBSyxNQUFNLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTtBQUNoQyxNQUFNLElBQUksQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFDO0FBQ2hDLEtBQUssTUFBTTtBQUNYLE1BQU0sT0FBTyxDQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUM7QUFDbkMsS0FBSztBQUNMLEdBQUcsRUFBQztBQUNKLEVBQUM7QUFDRDtBQUNBLE1BQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSztBQUNsQyxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSUMsSUFBSSxFQUFDO0FBQ3BFO0FBQ0EsRUFBRSxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUNwQyxJQUFJLFdBQVcsQ0FBQyxhQUFhLEVBQUUsRUFBQztBQUNoQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUMzQixJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSUEsSUFBSSxFQUFFLElBQUksRUFBQztBQUM1RCxJQUFJLE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUM7QUFDbEQsTUFBTSxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLGlCQUFpQixDQUFDLENBQUM7QUFDMUUsTUFBSztBQUNMLElBQUksY0FBYztBQUNsQixPQUFPLElBQUksQ0FBQyxDQUFDLFlBQVksS0FBSztBQUM5QixRQUFRLElBQUksWUFBWSxLQUFLLEtBQUssRUFBRTtBQUNwQyxVQUFVLFFBQVEsQ0FBQyxXQUFXLEdBQUU7QUFDaEMsVUFBVSxxQkFBcUIsQ0FBQyxRQUFRLEVBQUM7QUFDekMsU0FBUyxNQUFNO0FBQ2YsVUFBVSxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxZQUFZLEtBQUssV0FBVyxHQUFHLEtBQUssR0FBRyxZQUFZLEVBQUUsRUFBQztBQUNwSCxTQUFTO0FBQ1QsT0FBTyxDQUFDO0FBQ1IsT0FBTyxLQUFLLENBQUMsQ0FBQyxLQUFLLEtBQUssVUFBVSxDQUFDLFFBQVEsSUFBSUEsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFDO0FBQzVELEdBQUcsTUFBTTtBQUNULElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUM7QUFDbEQsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSztBQUN6QyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFDO0FBQ25ELEVBQUM7QUFDRDtBQUNBLE1BQU0sVUFBVSxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSztBQUN4QyxFQUFFLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO0FBQy9CLEVBQUM7QUFDRDtBQUNBLE1BQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxFQUFFLEtBQUssS0FBSztBQUNyQyxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSUEsSUFBSSxFQUFDO0FBQ3BFO0FBQ0EsRUFBRSxJQUFJLFdBQVcsQ0FBQyxtQkFBbUIsRUFBRTtBQUN2QyxJQUFJLFdBQVcsR0FBRTtBQUNqQixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksV0FBVyxDQUFDLFVBQVUsRUFBRTtBQUM5QixJQUFJLFFBQVEsQ0FBQyxzQkFBc0IsR0FBRTtBQUNyQyxJQUFJLFlBQVksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSUEsSUFBSSxFQUFFLElBQUksRUFBQztBQUM1RCxJQUFJLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQztBQUNyRCxNQUFNLFNBQVMsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUM3RSxNQUFLO0FBQ0wsSUFBSSxpQkFBaUI7QUFDckIsT0FBTyxJQUFJLENBQUMsQ0FBQyxlQUFlLEtBQUs7QUFDakMsUUFBUSxJQUFJL0MsV0FBUyxDQUFDLG9CQUFvQixFQUFFLENBQUMsSUFBSSxlQUFlLEtBQUssS0FBSyxFQUFFO0FBQzVFLFVBQVUsUUFBUSxDQUFDLFdBQVcsR0FBRTtBQUNoQyxVQUFVLHFCQUFxQixDQUFDLFFBQVEsRUFBQztBQUN6QyxTQUFTLE1BQU07QUFDZixVQUFVLFdBQVcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxlQUFlLEtBQUssV0FBVyxHQUFHLEtBQUssR0FBRyxlQUFlLEVBQUM7QUFDakcsU0FBUztBQUNULE9BQU8sQ0FBQztBQUNSLE9BQU8sS0FBSyxDQUFDLENBQUMsS0FBSyxLQUFLLFVBQVUsQ0FBQyxRQUFRLElBQUkrQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUM7QUFDNUQsR0FBRyxNQUFNO0FBQ1QsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFLEtBQUssRUFBQztBQUNoQyxHQUFHO0FBQ0g7O0FDbElPLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsS0FBSztBQUNyRSxFQUFFLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBQztBQUM1RCxFQUFFLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRTtBQUN6QixJQUFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDO0FBQ3JELEdBQUcsTUFBTTtBQUNUO0FBQ0E7QUFDQSxJQUFJLG9CQUFvQixDQUFDLFFBQVEsRUFBQztBQUNsQztBQUNBO0FBQ0EsSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLEVBQUM7QUFDdEM7QUFDQSxJQUFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsV0FBVyxFQUFDO0FBQ3JELEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxXQUFXLEtBQUs7QUFDOUQ7QUFDQSxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU07QUFDakMsSUFBSSxNQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUM7QUFDOUQsSUFBSSxJQUFJLFdBQVcsS0FBSyxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLENBQUMsS0FBSyxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtBQUNsRyxNQUFNLE1BQU07QUFDWixLQUFLO0FBQ0wsSUFBSSxXQUFXLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBQztBQUNwQyxJQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGdCQUFnQixHQUFHLENBQUMsV0FBVyxLQUFLO0FBQzFDLEVBQUU7QUFDRixJQUFJLFdBQVcsQ0FBQyxpQkFBaUI7QUFDakMsSUFBSSxXQUFXLENBQUMsY0FBYztBQUM5QixJQUFJLFdBQVcsQ0FBQyxnQkFBZ0I7QUFDaEMsSUFBSSxXQUFXLENBQUMsZUFBZTtBQUMvQixHQUFHO0FBQ0gsRUFBQztBQUNEO0FBQ0EsSUFBSSxrQkFBa0IsR0FBRyxNQUFLO0FBQzlCO0FBQ0EsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLFFBQVEsS0FBSztBQUMzQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLE1BQU07QUFDckMsSUFBSSxRQUFRLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsRUFBRTtBQUNoRCxNQUFNLFFBQVEsQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQVM7QUFDOUM7QUFDQTtBQUNBLE1BQU0sSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxTQUFTLEVBQUU7QUFDM0MsUUFBUSxrQkFBa0IsR0FBRyxLQUFJO0FBQ2pDLE9BQU87QUFDUCxNQUFLO0FBQ0wsSUFBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sd0JBQXdCLEdBQUcsQ0FBQyxRQUFRLEtBQUs7QUFDL0MsRUFBRSxRQUFRLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRyxNQUFNO0FBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDLEVBQUU7QUFDNUMsTUFBTSxRQUFRLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxVQUFTO0FBQzFDO0FBQ0EsTUFBTSxJQUFJLENBQUMsQ0FBQyxNQUFNLEtBQUssUUFBUSxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUU7QUFDNUUsUUFBUSxrQkFBa0IsR0FBRyxLQUFJO0FBQ2pDLE9BQU87QUFDUCxNQUFLO0FBQ0wsSUFBRztBQUNILEVBQUM7QUFDRDtBQUNBLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsS0FBSztBQUM5RCxFQUFFLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLO0FBQ3RDLElBQUksTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFDO0FBQzlELElBQUksSUFBSSxrQkFBa0IsRUFBRTtBQUM1QixNQUFNLGtCQUFrQixHQUFHLE1BQUs7QUFDaEMsTUFBTSxNQUFNO0FBQ1osS0FBSztBQUNMLElBQUksSUFBSSxDQUFDLENBQUMsTUFBTSxLQUFLLFFBQVEsQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0FBQzFGLE1BQU0sV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLEVBQUM7QUFDekMsS0FBSztBQUNMLElBQUc7QUFDSDs7QUNoRkEsTUFBTSxlQUFlLEdBQUcsQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFNO0FBQ3pFLE1BQU0sU0FBUyxHQUFHLENBQUMsSUFBSSxLQUFLLElBQUksWUFBWSxPQUFPLElBQUksZUFBZSxDQUFDLElBQUksRUFBQztBQUM1RTtBQUNPLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBSSxLQUFLO0FBQ3RDLEVBQUUsTUFBTSxNQUFNLEdBQUcsR0FBRTtBQUNuQixFQUFFLElBQUksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO0FBQzFELElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFDO0FBQ2xDLEdBQUcsTUFBTTtBQUNKLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxLQUFLO0FBQ3hELE1BQU0sTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztBQUM3QixNQUFNLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtBQUNyRCxRQUFRLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFHO0FBQzFCLE9BQU8sTUFBTSxJQUFJLEdBQUcsS0FBSyxTQUFTLEVBQUU7QUFDcEMsUUFBUSxLQUFLLENBQUMsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsc0NBQXNDLEVBQUUsT0FBTyxHQUFHLENBQUMsQ0FBQyxFQUFDO0FBQzlGLE9BQU87QUFDUCxLQUFLLEVBQUM7QUFDTixHQUFHO0FBQ0gsRUFBRSxPQUFPLE1BQU07QUFDZjs7QUNwQk8sU0FBUyxJQUFJLENBQUMsR0FBRyxJQUFJLEVBQUU7QUFDOUIsRUFBRSxNQUFNLElBQUksR0FBRyxLQUFJO0FBQ25CLEVBQUUsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQztBQUMxQjs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxTQUFTLEtBQUssQ0FBQyxXQUFXLEVBQUU7QUFDbkMsRUFBRSxNQUFNLFNBQVMsU0FBUyxJQUFJLENBQUM7QUFDL0IsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFLG1CQUFtQixFQUFFO0FBQ3ZDLE1BQU0sT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxXQUFXLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztBQUNyRixLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLFNBQVM7QUFDbEI7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxZQUFZLEdBQUcsTUFBTTtBQUNsQyxFQUFFLE9BQU8sV0FBVyxDQUFDLE9BQU8sSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtBQUNsRSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sU0FBUyxHQUFHLE1BQU07QUFDL0IsRUFBRSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDM0IsSUFBSSxvQkFBb0IsR0FBRTtBQUMxQixJQUFJLE9BQU8sV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7QUFDckMsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxXQUFXLEdBQUcsTUFBTTtBQUNqQyxFQUFFLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUMzQixJQUFJLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFFO0FBQ2pELElBQUksdUJBQXVCLENBQUMsU0FBUyxFQUFDO0FBQ3RDLElBQUksT0FBTyxTQUFTO0FBQ3BCLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPLE1BQU0sV0FBVyxHQUFHLE1BQU07QUFDakMsRUFBRSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsUUFBTztBQUNuQyxFQUFFLE9BQU8sS0FBSyxLQUFLLEtBQUssQ0FBQyxPQUFPLEdBQUcsU0FBUyxFQUFFLEdBQUcsV0FBVyxFQUFFLENBQUM7QUFDL0QsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQUMsS0FBSztBQUNwQyxFQUFFLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtBQUMzQixJQUFJLE1BQU0sU0FBUyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBQztBQUNyRCxJQUFJLHVCQUF1QixDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUM7QUFDNUMsSUFBSSxPQUFPLFNBQVM7QUFDcEIsR0FBRztBQUNILEVBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLGNBQWMsR0FBRyxNQUFNO0FBQ3BDLEVBQUUsT0FBTyxXQUFXLENBQUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFO0FBQy9EOztBQzlEQSxJQUFJLHNCQUFzQixHQUFHLE1BQUs7QUFDbEMsTUFBTSxhQUFhLEdBQUcsR0FBRTtBQUN4QjtBQUNPLFNBQVMsZ0JBQWdCLENBQUMsSUFBSSxHQUFHLG9CQUFvQixFQUFFO0FBQzlELEVBQUUsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUk7QUFDNUI7QUFDQSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRTtBQUMvQixJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLGlCQUFpQixFQUFDO0FBQzlELElBQUksc0JBQXNCLEdBQUcsS0FBSTtBQUNqQyxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQUssS0FBSztBQUNyQyxFQUFFLEtBQUssSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLFFBQVEsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLFVBQVUsRUFBRTtBQUN6RSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksYUFBYSxFQUFFO0FBQ3RDLE1BQU0sTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUM7QUFDNUMsTUFBTSxJQUFJLFFBQVEsRUFBRTtBQUNwQixRQUFRLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxRQUFRLEVBQUUsRUFBQztBQUM5QyxRQUFRLE1BQU07QUFDZCxPQUFPO0FBQ1AsS0FBSztBQUNMLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0hBLElBQUksZ0JBQWU7QUFDbkI7QUFDQSxNQUFNLFVBQVUsQ0FBQztBQUNqQixFQUFFLFdBQVcsQ0FBQyxHQUFHLElBQUksRUFBRTtBQUN2QjtBQUNBLElBQUksSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7QUFDdkMsTUFBTSxNQUFNO0FBQ1osS0FBSztBQUNMO0FBQ0EsSUFBSSxlQUFlLEdBQUcsS0FBSTtBQUMxQjtBQUNBO0FBQ0EsSUFBSSxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxFQUFDO0FBQzFFO0FBQ0EsSUFBSSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFO0FBQ2xDLE1BQU0sTUFBTSxFQUFFO0FBQ2QsUUFBUSxLQUFLLEVBQUUsV0FBVztBQUMxQixRQUFRLFFBQVEsRUFBRSxLQUFLO0FBQ3ZCLFFBQVEsVUFBVSxFQUFFLElBQUk7QUFDeEIsUUFBUSxZQUFZLEVBQUUsSUFBSTtBQUMxQixPQUFPO0FBQ1AsS0FBSyxFQUFDO0FBQ047QUFDQTtBQUNBLElBQUksTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFDO0FBQzNDLElBQUksWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBQztBQUMzQyxHQUFHO0FBQ0g7QUFDQSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUUsV0FBVyxHQUFHLEVBQUUsRUFBRTtBQUN0QyxJQUFJLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFdBQVcsRUFBRSxVQUFVLENBQUMsRUFBQztBQUNyRTtBQUNBLElBQUksSUFBSSxXQUFXLENBQUMsZUFBZSxFQUFFO0FBQ3JDLE1BQU0sV0FBVyxDQUFDLGVBQWUsQ0FBQyxRQUFRLEdBQUU7QUFDNUMsTUFBTSxJQUFJUixPQUFXLEVBQUUsRUFBRTtBQUN6QixRQUFRLGVBQWUsR0FBRTtBQUN6QixPQUFPO0FBQ1AsS0FBSztBQUNMLElBQUksV0FBVyxDQUFDLGVBQWUsR0FBRyxLQUFJO0FBQ3RDO0FBQ0EsSUFBSSxNQUFNLFdBQVcsR0FBRyxhQUFhLENBQUMsVUFBVSxFQUFFLFdBQVcsRUFBQztBQUM5RCxJQUFJLGFBQWEsQ0FBQyxXQUFXLEVBQUM7QUFDOUIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLFdBQVcsRUFBQztBQUM5QjtBQUNBO0FBQ0EsSUFBSSxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7QUFDN0IsTUFBTSxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRTtBQUNoQyxNQUFNLE9BQU8sV0FBVyxDQUFDLFFBQU87QUFDaEMsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsbUJBQW1CLEVBQUM7QUFDakQ7QUFDQSxJQUFJLE1BQU0sUUFBUSxHQUFHLGdCQUFnQixDQUFDLElBQUksRUFBQztBQUMzQztBQUNBLElBQUlPLE1BQVUsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFDO0FBQ2pDO0FBQ0EsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsV0FBVyxFQUFDO0FBQ25EO0FBQ0EsSUFBSSxPQUFPLFdBQVcsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQztBQUNuRCxHQUFHO0FBQ0g7QUFDQTtBQUNBLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRTtBQUNwQixJQUFJLE1BQU0sT0FBTyxHQUFHLFlBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBQztBQUNsRCxJQUFJLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7QUFDcEMsR0FBRztBQUNIO0FBQ0EsRUFBRSxPQUFPLENBQUMsU0FBUyxFQUFFO0FBQ3JCLElBQUksTUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFDO0FBQ2xELElBQUksT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQztBQUNyQyxHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsTUFBTSxXQUFXLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsS0FBSztBQUN6RCxFQUFFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxLQUFLO0FBQzFDO0FBQ0EsSUFBSSxNQUFNLFdBQVcsR0FBRyxDQUFDLE9BQU8sS0FBSztBQUNyQyxNQUFNLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFDO0FBQ3pELE1BQUs7QUFDTDtBQUNBLElBQUksY0FBYyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFDO0FBQzVELElBQUksY0FBYyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFDO0FBQzFEO0FBQ0EsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLE9BQU8sR0FBRyxNQUFNLHdCQUF3QixDQUFDLFFBQVEsRUFBQztBQUM3RSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsT0FBTyxHQUFHLE1BQU0scUJBQXFCLENBQUMsUUFBUSxFQUFDO0FBQ3ZFLElBQUksUUFBUSxDQUFDLFlBQVksQ0FBQyxPQUFPLEdBQUcsTUFBTSx1QkFBdUIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFDO0FBQ3hGO0FBQ0EsSUFBSSxRQUFRLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxNQUFNLFdBQVcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFDO0FBQ3pFO0FBQ0EsSUFBSSxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBQztBQUNyRDtBQUNBLElBQUksaUJBQWlCLENBQUMsUUFBUSxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFDO0FBQ3RFO0FBQ0EsSUFBSSwwQkFBMEIsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFDO0FBQ3JEO0FBQ0EsSUFBSSxTQUFTLENBQUMsV0FBVyxFQUFDO0FBQzFCO0FBQ0EsSUFBSSxVQUFVLENBQUMsV0FBVyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUM7QUFDckQ7QUFDQSxJQUFJLFNBQVMsQ0FBQyxRQUFRLEVBQUUsV0FBVyxFQUFDO0FBQ3BDO0FBQ0E7QUFDQSxJQUFJLFVBQVUsQ0FBQyxNQUFNO0FBQ3JCLE1BQU0sUUFBUSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEdBQUcsRUFBQztBQUN0QyxLQUFLLEVBQUM7QUFDTixHQUFHLENBQUM7QUFDSixFQUFDO0FBQ0Q7QUFDQSxNQUFNLGFBQWEsR0FBRyxDQUFDLFVBQVUsRUFBRSxXQUFXLEtBQUs7QUFDbkQsRUFBRSxNQUFNLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLEVBQUM7QUFDdEQsRUFBRSxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxhQUFhLEVBQUUsV0FBVyxFQUFFLGNBQWMsRUFBRSxVQUFVLEVBQUM7QUFDMUYsRUFBRSxNQUFNLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBQztBQUNqRixFQUFFLE1BQU0sQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsYUFBYSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFDO0FBQ2pGLEVBQUUsT0FBTyxNQUFNO0FBQ2YsRUFBQztBQUNEO0FBQ0EsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQVEsS0FBSztBQUN2QyxFQUFFLE1BQU0sUUFBUSxHQUFHO0FBQ25CLElBQUksS0FBSyxFQUFFN0IsUUFBWSxFQUFFO0FBQ3pCLElBQUksU0FBUyxFQUFFRCxZQUFnQixFQUFFO0FBQ2pDLElBQUksT0FBTyxFQUFFWixVQUFjLEVBQUU7QUFDN0IsSUFBSSxhQUFhLEVBQUVNLGdCQUFvQixFQUFFO0FBQ3pDLElBQUksVUFBVSxFQUFFQyxhQUFpQixFQUFFO0FBQ25DLElBQUksWUFBWSxFQUFFQyxlQUFtQixFQUFFO0FBQ3ZDLElBQUksTUFBTSxFQUFFUCxTQUFhLEVBQUU7QUFDM0IsSUFBSSxXQUFXLEVBQUVtQixjQUFrQixFQUFFO0FBQ3JDLElBQUksaUJBQWlCLEVBQUVPLG9CQUF3QixFQUFFO0FBQ2pELElBQUksYUFBYSxFQUFFRixrQkFBb0IsRUFBRTtBQUN6QyxJQUFHO0FBQ0gsRUFBRSxZQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFDO0FBQy9DO0FBQ0EsRUFBRSxPQUFPLFFBQVE7QUFDakIsRUFBQztBQUNEO0FBQ0EsTUFBTSxVQUFVLEdBQUcsQ0FBQyxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsS0FBSztBQUM5RCxFQUFFLE1BQU0sZ0JBQWdCLEdBQUdtQixtQkFBdUIsR0FBRTtBQUNwRCxFQUFFMUMsSUFBUSxDQUFDLGdCQUFnQixFQUFDO0FBQzVCLEVBQUUsSUFBSSxXQUFXLENBQUMsS0FBSyxFQUFFO0FBQ3pCLElBQUksV0FBVyxDQUFDLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxNQUFNO0FBQzFDLE1BQU0sV0FBVyxDQUFDLE9BQU8sRUFBQztBQUMxQixNQUFNLE9BQU8sV0FBVyxDQUFDLFFBQU87QUFDaEMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxLQUFLLEVBQUM7QUFDekIsSUFBSSxJQUFJLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRTtBQUN0QyxNQUFNQyxJQUFRLENBQUMsZ0JBQWdCLEVBQUM7QUFDaEMsTUFBTUMsZ0JBQW9CLENBQUMsZ0JBQWdCLEVBQUUsV0FBVyxFQUFFLGtCQUFrQixFQUFDO0FBQzdFLE1BQU0sVUFBVSxDQUFDLE1BQU07QUFDdkIsUUFBUSxJQUFJLFdBQVcsQ0FBQyxPQUFPLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7QUFDaEU7QUFDQSxVQUFVeUMsdUJBQTJCLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBQztBQUN4RCxTQUFTO0FBQ1QsT0FBTyxFQUFDO0FBQ1IsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFNBQVMsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEtBQUs7QUFDN0MsRUFBRSxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUU7QUFDekIsSUFBSSxNQUFNO0FBQ1YsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsRUFBRTtBQUNsRCxJQUFJLE9BQU8saUJBQWlCLEVBQUU7QUFDOUIsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxXQUFXLENBQUMsRUFBRTtBQUMzQyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFDO0FBQ2hDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQSxNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxXQUFXLEtBQUs7QUFDL0MsRUFBRSxJQUFJLFdBQVcsQ0FBQyxTQUFTLElBQUloQixXQUFhLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO0FBQ25FLElBQUksUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEdBQUU7QUFDL0IsSUFBSSxPQUFPLElBQUk7QUFDZixHQUFHO0FBQ0g7QUFDQSxFQUFFLElBQUksV0FBVyxDQUFDLFdBQVcsSUFBSUEsV0FBYSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsRUFBRTtBQUN2RSxJQUFJLFFBQVEsQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFFO0FBQ2pDLElBQUksT0FBTyxJQUFJO0FBQ2YsR0FBRztBQUNIO0FBQ0EsRUFBRSxJQUFJLFdBQVcsQ0FBQyxZQUFZLElBQUlBLFdBQWEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUU7QUFDekUsSUFBSSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssR0FBRTtBQUNsQyxJQUFJLE9BQU8sSUFBSTtBQUNmLEdBQUc7QUFDSDtBQUNBLEVBQUUsT0FBTyxLQUFLO0FBQ2QsRUFBQztBQUNEO0FBQ0EsTUFBTSxpQkFBaUIsR0FBRyxNQUFNO0FBQ2hDLEVBQUUsSUFBSSxRQUFRLENBQUMsYUFBYSxZQUFZLFdBQVcsSUFBSSxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtBQUMxRyxJQUFJLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxHQUFFO0FBQ2pDLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxlQUFlLEVBQUM7QUFDcEQ7QUFDQTtBQUNBLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsRUFBQztBQUN4QztBQUNBO0FBQ0EsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEtBQUs7QUFDOUMsRUFBRSxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsVUFBVSxHQUFHLElBQUksRUFBRTtBQUN2QyxJQUFJLElBQUksZUFBZSxFQUFFO0FBQ3pCLE1BQU0sT0FBTyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDMUMsS0FBSztBQUNMLElBQUc7QUFDSCxDQUFDLEVBQUM7QUFDRjtBQUNBLFVBQVUsQ0FBQyxhQUFhLEdBQUcsY0FBYTtBQUN4QztBQUNBLFVBQVUsQ0FBQyxPQUFPLEdBQUc7O0FDcE9yQixNQUFNLElBQUksR0FBRyxXQUFVO0FBQ3ZCO0FBQ0EsSUFBSSxDQUFDLE9BQU8sR0FBRzs7U0NDQyxJQUFJO0lBQ2hCLElBQUksQ0FBQyxJQUFJLENBQUM7UUFDTixLQUFLLEVBQUUsUUFBUTtRQUNmLElBQUksRUFBRSx5QkFBeUI7UUFDL0IsSUFBSSxFQUFFLE9BQU87UUFDYixpQkFBaUIsRUFBRSxNQUFNO0tBQzVCLENBQUMsQ0FBQTtJQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDckIsQ0FBQztBQUVEO0FBQ0EsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO01BRUEsUUFBUTtJQUNqQixFQUFFLENBQVE7SUFDVixVQUFVLENBQWE7SUFDdkI7UUFDSSxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQztRQUNoQixLQUFLLEVBQUUsQ0FBQztLQUNYO0lBQ0QsUUFBUSxDQUFDLFVBQXNCO1FBQzNCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztRQUNoQixJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3JCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDdkIsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxPQUFPLEdBQUcsaUJBQWlCLEdBQUcsTUFBTSxDQUFDO1FBQ3pDLElBQUksR0FBRyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7UUFDckIsVUFBVSxHQUFHLGVBQWUsQ0FBQyxVQUFVLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN2QixJQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQUM7WUFDaEIsSUFBRyxPQUFPLFVBQVUsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUN2QztnQkFDSSxHQUFHLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUM5QjtpQkFDRztnQkFDQSxHQUFHLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQzthQUMxQjtTQUNKO2FBQ0c7WUFDQSxPQUFPLENBQUMsS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7U0FDckQ7UUFDRCxJQUFHLFVBQVUsQ0FBQyxLQUFLLEVBQ25CO1lBQ0ksSUFBRyxPQUFPLFVBQVUsQ0FBQyxLQUFLLEtBQUssUUFBUSxFQUN2QztnQkFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUMvQjtpQkFDRztnQkFDQSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQTthQUMzQjtTQUNKO2FBQ0c7WUFDQSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDaEM7Z0JBQ0ksS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTthQUNqQjtTQUNKO1FBQ0QsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2hDO1lBQ0ksSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssU0FBUyxFQUN6QjtnQkFDSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFBO2FBQ2hCO1NBQ0o7UUFDRCxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7UUFDZCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDaEM7WUFDSSxJQUFJLEdBQUcsSUFBSSxHQUFJLHFDQUFxQyxHQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRSxRQUFRO2tCQUNoRSxxREFBcUQ7a0JBQ3JELE9BQU8sR0FBRSxRQUFRLEdBQUcsT0FBTyxHQUFHLFdBQVcsR0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDO1lBQ3ZFLE1BQU0sRUFBRSxDQUFDO1lBQ1QsT0FBTyxHQUFHLGlCQUFpQixHQUFHLE1BQU0sQ0FBQztTQUN4Qzs7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDYixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7WUFDdkIsSUFBSSxFQUFFLElBQUk7WUFDVixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLE9BQU87WUFDckMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLE1BQU07WUFDbkMsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxlQUFlO2dCQUM5QixZQUFZLEVBQUUsZUFBZTthQUNoQztZQUNELFVBQVUsRUFBRTtnQkFDUixLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDaEM7b0JBQ0ksSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxpQkFBaUIsR0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0QsSUFBSSxJQUFJLEdBQVM7d0JBQ2IsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7d0JBQ2hCLElBQUksRUFBcUIsT0FBUSxDQUFDLEtBQUs7cUJBQzFDLENBQUE7b0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDbEI7Z0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7Z0JBQ3RCLE9BQU8sR0FBRyxDQUFBO2FBQ2I7U0FDSixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDTCxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUc7Z0JBQ3ZCLElBQUcsQ0FBQyxDQUFDLFdBQVcsRUFDaEI7b0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzt3QkFDTixLQUFLLEVBQUUsU0FBUzt3QkFDaEIsa0JBQWtCLEVBQUUsU0FBUzt3QkFDN0IsSUFBSSxFQUFFLFNBQVM7d0JBQ2YsV0FBVyxFQUFFOzRCQUNULGFBQWEsRUFBRSxlQUFlO3lCQUNqQztxQkFDSixDQUFDLENBQUM7b0JBQ0gsR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDaEI7cUJBQ0c7b0JBQ0EsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2lCQUNkO2FBRUosQ0FBQyxDQUFBO1NBQ0wsQ0FBQyxDQUFBO0tBQ0w7SUFDRCxRQUFRLENBQUMsVUFBc0I7UUFDM0IsVUFBVSxHQUFHLGVBQWUsQ0FBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7WUFDdkIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPO1lBQ3hCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxlQUFlO2FBQ2pDO1lBQ0QsSUFBSSxFQUFFLE9BQU87U0FDaEIsQ0FBQyxDQUFBO0tBQ0w7SUFDRCxPQUFPLENBQUMsVUFBc0I7UUFDMUIsVUFBVSxHQUFHLGVBQWUsQ0FBQyxVQUFVLEVBQUMsTUFBTSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUM7WUFDTixLQUFLLEVBQUUsVUFBVSxDQUFDLEtBQUs7WUFDdkIsSUFBSSxFQUFFLFVBQVUsQ0FBQyxPQUFPO1lBQ3hCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxlQUFlO2FBQ2pDO1lBQ0QsSUFBSSxFQUFFLE1BQU07U0FDZixDQUFDLENBQUE7S0FDTDtJQUNELE9BQU8sQ0FBQyxVQUFzQjtRQUMxQixVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQTtRQUVqRCxJQUFJLEdBQUcsR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFBO1FBQ3JCLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNmLElBQUcsVUFBVSxDQUFDLE9BQU8sRUFDckI7WUFDSSxJQUFJLElBQUksR0FBRyxFQUFFLENBQUM7WUFDZCxJQUFJLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxJQUFJLElBQUksNERBQTRELENBQUE7WUFDcEUsSUFBSSxJQUFJLG9IQUFvSCxDQUFDOztZQUc3SCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDaEM7Z0JBQ0ksSUFBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksTUFBTSxFQUM3QjtvQkFDSSxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNoQyxJQUFJLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO29CQUNwQyxJQUFJLElBQUksc0JBQXNCLEdBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFFLE9BQU8sQ0FBQTtvQkFDL0MsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFO3dCQUM3QixJQUFJLElBQUksd0JBQXdCLEdBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFFLElBQUksR0FBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUUsYUFBYSxDQUFBO29CQUM3RSxJQUFJLElBQUksYUFBYSxDQUFBO2lCQUN4QjtxQkFDRztvQkFDQSxJQUFJLElBQUksb0JBQW9CLEdBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFFLElBQUksR0FBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUUsYUFBYSxDQUFBO2lCQUN0RTs7Ozs7Ozs7Ozs7Ozs7Ozs7O2FBa0JKO1lBRUQsSUFBSSxJQUFJLFdBQVcsQ0FBQTtZQUVuQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO2dCQUN2QixJQUFJLEVBQUUsSUFBSTtnQkFDVixrQkFBa0IsRUFBRSxTQUFTO2dCQUM3QixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixpQkFBaUIsRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDckMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ25DLFdBQVcsRUFBRTtvQkFDVCxhQUFhLEVBQUUsZUFBZTtvQkFDOUIsWUFBWSxFQUFFLGVBQWU7aUJBQ2hDO2dCQUNELFVBQVUsRUFBRTtvQkFDUixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUE7O29CQUUxRCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQXFCLE9BQVEsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQUM7d0JBQ25ELElBQXdCLE9BQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFDOzRCQUNqRCxJQUFJLFFBQVEsR0FBdUIsT0FBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUM7NEJBQ3JFLElBQUksSUFBVSxDQUFDOzRCQUNmLElBQUcsUUFBUSxZQUFZLGlCQUFpQixFQUN4QztnQ0FDSSxJQUFJLEdBQUc7b0NBQ0gsUUFBUSxFQUFzQixPQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUs7b0NBQ3ZELElBQUksRUFBc0IsT0FBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLO2lDQUN0RCxDQUFBOzZCQUNKO2lDQUNHO2dDQUNBLElBQUksR0FBRztvQ0FDSCxRQUFRLEVBQXdCLFFBQVMsQ0FBQyxLQUFLO29DQUMvQyxJQUFJLEVBQXNCLE9BQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztpQ0FDdEQsQ0FBQTs2QkFDSjs0QkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUNsQjtxQkFDSjs7Ozs7Ozs7Ozs7b0JBV0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxDQUFBO2lCQUNiO2FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRztvQkFDdkIsSUFBRyxDQUFDLENBQUMsV0FBVyxFQUNoQjt3QkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNOLEtBQUssRUFBRSxTQUFTOzRCQUNoQixrQkFBa0IsRUFBRSxTQUFTOzRCQUM3QixJQUFJLEVBQUUsU0FBUzs0QkFDZixXQUFXLEVBQUU7Z0NBQ1QsYUFBYSxFQUFFLGVBQWU7NkJBQ2pDO3lCQUNKLENBQUMsQ0FBQztxQkFDTjtvQkFDRCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQixDQUFDLENBQUE7YUFDTCxDQUFDLENBQUE7U0FFTDthQUNHO1lBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO2dCQUNiLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztnQkFDdkIsS0FBSyxFQUFFLFFBQVE7Z0JBQ2Ysa0JBQWtCLEVBQUUsU0FBUztnQkFDN0IsWUFBWSxFQUFFLFVBQVUsQ0FBQyxJQUFJO2dCQUM3QixnQkFBZ0IsRUFBRSxRQUFRO2dCQUMxQixnQkFBZ0IsRUFBRSxJQUFJO2dCQUN0QixpQkFBaUIsRUFBRSxVQUFVLENBQUMsT0FBTztnQkFDckMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLE1BQU07Z0JBQ25DLFdBQVcsRUFBRTtvQkFDVCxhQUFhLEVBQUUsZUFBZTtvQkFDOUIsWUFBWSxFQUFFLGVBQWU7b0JBQzdCLEtBQUssRUFBRSxrQkFBa0I7aUJBQzVCO2dCQUNELFVBQVUsRUFBRTtvQkFDUixJQUFJLE9BQU8sR0FBRyxRQUFRLENBQUMsc0JBQXNCLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pFLEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBcUIsT0FBUSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFBQzt3QkFDbkQsSUFBd0IsT0FBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUM7NEJBQ2pELElBQUksUUFBUSxHQUF1QixPQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQzs0QkFDckUsSUFBSSxJQUFVLENBQUM7NEJBQ2YsSUFBRyxRQUFRLFlBQVksaUJBQWlCLEVBQ3hDO2dDQUNJLElBQUksR0FBRztvQ0FDSCxRQUFRLEVBQXNCLE9BQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSztvQ0FDdkQsSUFBSSxFQUFzQixPQUFRLENBQUMsS0FBSztpQ0FDM0MsQ0FBQTs2QkFDSjtpQ0FDRztnQ0FDQSxJQUFJLEdBQUc7b0NBQ0gsUUFBUSxFQUF3QixRQUFTLENBQUMsS0FBSztvQ0FDL0MsSUFBSSxFQUFzQixPQUFRLENBQUMsS0FBSztpQ0FDM0MsQ0FBQTs2QkFDSjs0QkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNmLE1BQU07eUJBQ1Q7cUJBQ0o7b0JBQ0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxDQUFBO2lCQUNiO2FBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRztvQkFDdkIsSUFBRyxDQUFDLENBQUMsV0FBVyxFQUNoQjt3QkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzRCQUNOLEtBQUssRUFBRSxTQUFTOzRCQUNoQixrQkFBa0IsRUFBRSxTQUFTOzRCQUM3QixJQUFJLEVBQUUsU0FBUzs0QkFDZixXQUFXLEVBQUU7Z0NBQ1QsYUFBYSxFQUFFLGVBQWU7NkJBQ2pDO3lCQUNKLENBQUMsQ0FBQzt3QkFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO3FCQUNoQjt5QkFDRzt3QkFDQSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2Y7aUJBQ0osQ0FBQyxDQUFBO2FBQ0wsQ0FBQyxDQUFBO1NBQ0w7S0FFSjtJQUNELFFBQVEsQ0FBQyxVQUFzQjtRQUMzQixVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ2IsS0FBSyxFQUFFLFVBQVUsQ0FBQyxLQUFLO1lBQ3ZCLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTztZQUN4QixrQkFBa0IsRUFBRSxTQUFTO1lBQzdCLGdCQUFnQixFQUFFLElBQUk7WUFDdEIsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxlQUFlO2dCQUM5QixZQUFZLEVBQUUsZUFBZTthQUNoQztZQUNELElBQUksRUFBRSxVQUFVO1NBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRztnQkFDdkIsSUFBRyxDQUFDLENBQUMsV0FBVyxFQUNoQjtvQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDO3dCQUNOLEtBQUssRUFBRSxTQUFTO3dCQUNoQixrQkFBa0IsRUFBRSxTQUFTO3dCQUM3QixJQUFJLEVBQUUsU0FBUzt3QkFDZixXQUFXLEVBQUU7NEJBQ1QsYUFBYSxFQUFFLGVBQWU7eUJBQ2pDO3FCQUNKLENBQUMsQ0FBQztvQkFDSCxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQjtxQkFDRztvQkFDQSxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2Q7YUFDSixDQUFDLENBQUE7U0FDTCxDQUFDLENBQUE7S0FDTDtJQUNELE9BQU8sQ0FBQyxVQUFzQjtRQUMxQixVQUFVLEdBQUcsZUFBZSxDQUFDLFVBQVUsRUFBQyxNQUFNLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNOLEtBQUssRUFBRSxVQUFVLENBQUMsS0FBSztZQUN2QixJQUFJLEVBQUUsVUFBVSxDQUFDLE9BQU87WUFDeEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixXQUFXLEVBQUU7Z0JBQ1QsYUFBYSxFQUFFLGVBQWU7YUFDakM7WUFDRCxJQUFJLEVBQUUsU0FBUztTQUNsQixDQUFDLENBQUE7S0FDTDtJQUNELE1BQU0sQ0FBQyxVQUFzQjtRQUN6QixJQUFHLFVBQVUsQ0FBQyxNQUFNLEtBQUssU0FBUztZQUM5QixVQUFVLENBQUMsTUFBTSxHQUFHLDZCQUE2QixDQUFBO1FBQ3JELElBQUcsVUFBVSxDQUFDLFFBQVEsS0FBSyxTQUFTO1lBQ2hDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFBO1FBQzdCLElBQUcsVUFBVSxDQUFDLFNBQVMsS0FBSyxTQUFTO1lBQ2pDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQztZQUNiLElBQUksRUFBRSxVQUFVLENBQUMsT0FBTztZQUN4QixLQUFLLEVBQUUsR0FBRyxHQUFHLFVBQVUsQ0FBQyxRQUFRO1lBQ2hDLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLE9BQU87WUFDckMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxNQUFNO1lBQzNCLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUTtZQUMvQixXQUFXLEVBQUUsVUFBVSxDQUFDLFNBQVM7WUFDakMsV0FBVyxFQUFFO2dCQUNULGFBQWEsRUFBRSxlQUFlO2FBQ2pDO1NBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0wsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHO2dCQUN2QixJQUFHLENBQUMsQ0FBQyxXQUFXLEVBQ2hCO29CQUNJLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7aUJBQ2Y7YUFDSixDQUFDLENBQUE7U0FDTCxDQUFDLENBQUE7S0FDTDtDQUNKO1NBcUJlLE9BQU87SUFDbkIsSUFBSSxHQUFHLEdBQUcsSUFBSSxRQUFRLEVBQUUsQ0FBQztJQUN6QixPQUFPLEdBQUcsQ0FBQztBQUNmOztBQ3RYQTtBQUNBO0FBRUE7QUFFQSxNQUFNLEtBQUs7SUFDRSxFQUFFLENBQVE7SUFDbkIsR0FBRyxDQUFhO0lBQ1AsR0FBRyxDQUEwQjs7SUFFOUIsT0FBTyxDQUFTO0lBQ3hCLE1BQU0sQ0FBYzs7SUFJcEIsWUFBWSxFQUFVLEVBQUMsR0FBZ0IsRUFBQyxNQUFvQjtRQUN4RCxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLE9BQU8sRUFBRSxDQUFBO1FBQzVCLE1BQU0sR0FBR3RDLGdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztRQUVyQixJQUFJLENBQUMsR0FBRyxHQUFHdUQsWUFBcUIsQ0FBQyxHQUFHLEVBQUMsTUFBTSxDQUFDLENBQUM7OztLQUdoRDtJQUVELGNBQWMsQ0FBQyxNQUFtQjs7Ozs7OztRQU85QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFBO1FBQ2xCLE1BQU0sR0FBR3ZELGdCQUF3QixDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUN2QixDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUN6QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFBOztRQUUxQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNyRCxJQUFJLENBQUMsTUFBTSxHQUFHO1lBQ1YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLO1lBQ25CLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTTtTQUN4QixDQUFBO1FBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7SUFFRCxPQUFPOzs7UUFHSCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQzNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2hDOzs7Ozs7Ozs7SUFXRCxHQUFHLENBQUMsRUFBNkI7UUFDN0IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQTtRQUNsQixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDakMsSUFBSSxLQUFLLEdBQUcsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXZDLElBQUcsRUFBRSxZQUFZLFFBQVEsSUFBRSxFQUFFLFlBQVksS0FBSyxFQUM5QztZQUNJLElBQUcsS0FBSyxLQUFLLENBQUMsQ0FBQyxFQUNmO2dCQUNJLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFDWCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO2dCQUNaLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTthQUNqQjtpQkFDRztnQkFDQSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFDckIsRUFBRSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7Z0JBQ2IsRUFBRSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO2dCQUN6QkMsWUFBb0IsQ0FBQyxFQUFFLEVBQUMsR0FBRyxDQUFDLENBQUE7YUFDL0I7U0FFSjthQUNHO1lBQ0EsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQy9CO2dCQUNJLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDYixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBOzs7O2FBSWQ7U0FDSjtLQUNKO0lBRUQsTUFBTSxDQUFDLEVBQTZCO1FBRWhDLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDbEIsSUFBSSxDQUFDLEdBQUksR0FBRyxDQUFDLE1BQU0sQ0FBQTtRQUNuQixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQzNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDNUI7Ozs7SUFNRCxPQUFPLENBQUMsRUFBWSxFQUFDLElBQWMsRUFBQyxLQUFhOztRQUU3QyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O1FBRU4sSUFBSSxDQUFDLElBQUk7OztRQUluQixDQUFDO1lBQ0csT0FBTSxDQUFDLEVBQUM7Z0JBQ0osSUFBSSxFQUFFLENBQUM7Z0JBQ1AsTUFBTUMsV0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDaEMsRUFBRSxDQUFDLE1BQU0sRUFBRSxDQUFBO2dCQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUM7YUFDaEI7U0FDSixHQUFHLENBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBK0JQO0lBRUQsV0FBVyxDQUFDLFFBQWtCO1FBRTFCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hCLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDM0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQTtRQUM3QixJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFBO1FBQ3JCLEVBQUUsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO1FBQ3RCLElBQUcsUUFBUSxFQUNYO1lBQ0ksSUFBRyxRQUFRLENBQUMsS0FBSyxFQUNqQjs7Z0JBRUksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM1QztvQkFDSSxJQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSzt3QkFDbEMsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7eUJBQ2pELElBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQzNDO3dCQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQ2xFOzRCQUNJLElBQVcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksS0FBSyxFQUM1RDtnQ0FDWSxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUE7NkJBQzNFO3lCQUNKO3FCQUNKO2lCQUNKO2FBQ0o7WUFDRCxJQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQ2pCOztnQkFFSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzVDO29CQUNJLElBQUcsRUFBRSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLO3dCQUNsQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTt5QkFDakQsSUFBRyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLEtBQUssRUFDM0M7d0JBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFXLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFFLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDbEU7NEJBQ0ksSUFBVyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxLQUFLLEVBQzVEO2dDQUNZLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQTs2QkFDM0U7eUJBQ0o7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdkI7SUFFRCxLQUFLOzs7Ozs7Ozs7OztRQVdELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUN4QixDQUFDLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQzNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7S0FDaEM7Q0FFSjtBQUVEO0FBQ0E7QUFDQTtBQUNBO1NBRWdCLElBQUksQ0FBQyxHQUFnQixFQUFDLE1BQW9CO0lBQ3RELElBQUksRUFBRSxHQUFHLElBQUksS0FBSyxDQUFDc0QsS0FBYSxFQUFFLEVBQUMsR0FBRyxFQUFDLE1BQU0sQ0FBQyxDQUFDOzs7SUFHL0MsT0FBTyxFQUFFLENBQUM7QUFDZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
