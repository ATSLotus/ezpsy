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
                // console.dir(performance.now())
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
let nameId$9 = 0;
// class TypeTest implements RectangleShape{
//     x: number
//     y: number
//     width: number
//     height: number
// }
class Rectangle extends Elements {
    name = {
        name: "rect" + nameId$9.toString(),
        graphicId: nameId$9
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
        nameId$9++;
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

let nameId$8 = 0;
class Circle extends Elements {
    name = {
        name: "circle" + nameId$8.toString(),
        graphicId: nameId$8
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
        nameId$8++;
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

let nameId$7 = 0;
class Line extends Elements {
    name = {
        name: "line" + nameId$7.toString(),
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

let nameId$6 = 0;
class Arc extends Elements {
    name = {
        name: "arc" + nameId$6.toString(),
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

let nameId$5 = 0;
class Ellipse extends Elements {
    name = {
        name: "ellipse" + nameId$5.toString(),
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

let nameId$4 = 0;
class Polygon extends Elements {
    name = {
        name: "polygon" + nameId$4.toString(),
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
    // judgeTRS(polygon) 
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

let nameId$3 = 0;
class Texts extends Elements {
    name = {
        name: "text" + nameId$3.toString(),
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
        nameId$3++;
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

let nameId$2 = 0;
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
        name: "img" + nameId$2.toString(),
        graphicId: nameId$2
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
        nameId$2++;
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

let nameId$1 = 0;
class Grat extends Elements {
    name = {
        name: "grat" + nameId$1.toString(),
        graphicId: nameId$1
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
        nameId$1++;
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
    judgeTRS(grat);
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

let nameId = 0;
//光栅
//pixelsPerDegree=57, spatialFrequency=1 对应一度视角
class sinGrat extends Elements {
    name = {
        name: "singrat" + nameId.toString(),
        graphicId: nameId
    };
    sinGrat; //光栅图片数据
    imgDataList; //用于储存参与动画的图片
    isNoise;
    // singratParam;   //用于储存 左上角坐标, 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位等信息
    // level;          //噪声等级(此类型默认为0)
    constructor(opts) {
        //x,y为光栅的左上角坐标, 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位
        super();
        this.shape = opts.shape;
        let sh = this.shape;
        if (!opts.isNoise)
            this.isNoise = false;
        else
            this.isNoise = opts.isNoise;
        if (!this.isNoise)
            this.sinGrat = getSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase);
        else {
            if (!sh.level)
                sh.level = 1;
            this.sinGrat = getNoiseSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.level);
        }
        this.imgDataList = new Array();
    }
    //绘制方法, 参数ctx为canvas.getContext('2d')
    draw() {
        this.ctx.putImageData(this.sinGrat, this.shape.x, this.shape.y);
    }
    //给原有光栅加上噪声, 参数level为噪声等级
    imNoise(level) {
        let th = this.shape;
        this.isNoise = true;
        this.sinGrat = getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase, level);
        th.level = level;
    }
    //运动方法, 参数ctx为canvas.getContext('2d') 参数cycle为每秒运行光栅的周期数(默认为1)
    play(cycle) {
        if (!cycle)
            cycle = 1;
        let that = this;
        let ctx = this.ctx;
        let num = Math.floor(60 / cycle);
        let th = this.shape;
        for (let i = 0; i < num; i++) {
            if (this.isNoise)
                this.imgDataList.push(getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase + 2 * i * Math.PI / num, this.shape.level));
            else
                this.imgDataList.push(getSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase + 2 * i * Math.PI / num));
        }
        //异步函数
        (async function () {
            for (let i = 0; i > -1; i++) {
                i = i % num;
                ctx.putImageData(that.imgDataList[i], that.shape.x, that.shape.y);
                // console.dir(that.storage)
                await delay_frame(1);
                that.clear(ctx);
            }
        })();
    }
    //清除光栅所在位置的矩形区域
    clear(ctx) {
        let width = 2 * this.shape.r + 1;
        let height = 2 * this.shape.r + 1;
        ctx.clearRect(this.shape.x, this.shape.y, width, height);
    }
}
//生成噪声光栅, 参数: 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位, 噪声等级
//返回imageData图片信息
function getNoiseSingrat(radius, pixelsPerDegree, spatialFrequency, angle, contrast, phase, level) {
    if (level === undefined)
        level = 1;
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let [x, y] = meshgrid(imagesize);
    let mask = new Array();
    for (let i = 0; i < x.length; i++) {
        let m = Math.pow(x[i], 2) + Math.pow(y[i], 2);
        let n = Math.pow(radius, 2);
        mask.push(Math.exp(-m / n));
        mask[i] *= Math.E;
        if (mask[i] >= 1)
            mask[i] = 1;
    }
    let w = 2 * Math.PI * spatialFrequency / pixelsPerDegree;
    let a = Math.cos(angle * Math.PI / 180) * w;
    let b = Math.sin(angle * Math.PI / 180) * w;
    let param = new Array();
    for (let i = 0; i < x.length; i++) {
        param[i] = 0.5 + 0.5 * mask[i] * contrast * Math.sin(a * x[i] + b * y[i] + phase);
    }
    let noise = getNoise(radius);
    let noiseSinGrat = GratAddNoise(param, noise, radius, level);
    return noiseSinGrat;
}
//光栅加噪声, 参数: 光栅灰度信息, 噪声灰度信息, 半径, 噪声等级
//返回imageData图片信息
function GratAddNoise(param, noise, radius, level) {
    let c = document.createElement('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    let ctx = c.getContext('2d');
    let NoiseGratDegree = new Array();
    let i = 0;
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let M = 2 * imagesize + 1;
    let NoiseGrat = ctx.createImageData(M, M);
    let [x, y] = meshgrid(imagesize);
    let mask = new Array();
    for (let i = 0; i < x.length; i++) {
        let m = Math.pow(x[i], 2) + Math.pow(y[i], 2);
        let n = Math.pow(radius, 2);
        mask.push(Math.exp(-m / n));
        mask[i] *= Math.E;
        if (mask[i] >= 1)
            mask[i] = 1;
    }
    //相加
    for (i = 0; i < M * M; i++) {
        if (param[i] > 0.5)
            NoiseGratDegree[i] = 0.5 + level * noise[i];
        else
            NoiseGratDegree[i] = (param[i] + level * noise[i]);
        // NoiseGratDegree[i] = NoiseGratDegree[i]+0.5*mask[i] 
    }
    for (let i = 0, j = 0; i < NoiseGrat.data.length; i += 4, j++) {
        NoiseGrat.data[i + 0] = NoiseGratDegree[j] * 255;
        NoiseGrat.data[i + 1] = NoiseGratDegree[j] * 255;
        NoiseGrat.data[i + 2] = NoiseGratDegree[j] * 255;
        NoiseGrat.data[i + 3] = 255;
    }
    // NoiseGrat = ToCircle(NoiseGrat,radius)
    return NoiseGrat;
}
//生成噪声图片, 参数: 半径
//返回噪声灰度数组
function getNoise(radius) {
    let noise = new Array();
    let mask = new Array();
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let [x, y] = meshgrid(imagesize);
    for (let i = 0; i < x.length; i++) {
        let m = Math.pow(x[i], 2) + Math.pow(y[i], 2);
        let n = Math.pow(radius, 2);
        mask.push(Math.exp(-m / n));
        mask[i] *= Math.E;
        if (mask[i] >= 1)
            mask[i] = 1;
    }
    for (let i = 0; i < mask.length; i++) {
        let greyDegree = mask[i] * Math.floor(Math.random() * 256) / 255;
        noise.push(greyDegree);
    }
    // for (let i=0;i < 4*(imagesize*2+1)*(imagesize*2+1);i+=4)
    // {
    //     let greyDegree = Math.floor(Math.random()* 256); 
    //     noise.push(greyDegree/255);
    // }
    // console.dir(noise)
    return noise;
}
//生成光栅 参数: 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位
//返回imageData图片信息
function getSingrat(radius, pixelsPerDegree, spatialFrequency, angle, contrast, phase) {
    let c = document.createElement('canvas');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    let ctx = c.getContext('2d');
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let [x, y] = meshgrid(imagesize);
    let w = 2 * Math.PI * spatialFrequency / pixelsPerDegree;
    let a = Math.cos(angle * Math.PI / 180) * w;
    let b = Math.sin(angle * Math.PI / 180) * w;
    let param = new Array();
    let mask = new Array();
    for (let i = 0; i < x.length; i++) {
        let m = Math.pow(x[i], 2) + Math.pow(y[i], 2);
        let n = Math.pow(radius, 2);
        mask.push(Math.exp(-m / n));
        mask[i] *= Math.E;
        if (mask[i] >= 1)
            mask[i] = 1;
    }
    // let maskShadow = mask(radius);
    // console.dir(maskShadow)
    for (let i = 0; i < x.length; i++) {
        param[i] = 0.5 + 0.5 * contrast * mask[i] * Math.sin(a * x[i] + b * y[i] + phase);
    }
    // let maskShadow = mask(radius)
    // for(let )
    let imgData = ctx.createImageData(imagesize * 2 + 1, imagesize * 2 + 1);
    for (let i = 0, j = 0; i < imgData.data.length; i += 4, j++) {
        imgData.data[i + 0] = param[j] * 255;
        imgData.data[i + 1] = param[j] * 255;
        imgData.data[i + 2] = param[j] * 255;
        imgData.data[i + 3] = 255;
    }
    // imgData = ToCircle(imgData,radius/2)
    return imgData;
}
//生成网格采样点 参数: 半径
//返回x, y两个采样数组
function meshgrid(radius) {
    let x = new Array();
    let y = new Array();
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            x.push(i);
            y.push(j);
        }
    }
    return [x, y];
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
    else if (el instanceof sinGrat) {
        el.draw();
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
    let [x, y] = judgeElementsCenter(el);
    if (el.rotate) {
        ctx.translate(x, y);
        ctx.rotate(el.rotate * Math.PI / 180);
        ctx.translate(-x, -y);
    }
    ctx.translate(x, y);
    ctx.scale(el.scale.width, el.scale.height);
    ctx.translate(-x, -y);
    ctx.translate(el.translate.x, el.translate.y);
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
function judgeElementsCenter(el) {
    let x, y;
    if (el instanceof Rectangle) {
        x = el.shape.x + el.shape.width / 2;
        y = el.shape.y + el.shape.height / 2;
    }
    else if (el instanceof Circle || el instanceof Arc || el instanceof Grat || el instanceof Ellipse) {
        x = el.shape.x;
        y = el.shape.y;
    }
    else if (el instanceof Line) {
        x = Math.abs(el.shape.x - el.shape.xEnd) / 2;
        y = Math.abs(el.shape.y - el.shape.yEnd) / 2;
    }
    else if (el instanceof sinGrat) {
        x = Math.ceil((2 * el.shape.r + 1) / 2);
        y = Math.ceil((2 * el.shape.r + 1) / 2);
    }
    return [x, y];
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
    // sinGratPlay(opts: GratOpts){
    //     let sinGratList = new Array();
    //     let sh = opts.shape;
    //     for(let i = 0;i < Math.floor(60*sh.cycle);i++)
    //     {
    //         let singrat = new sinGrat({
    //             shape: {
    //                 x: sh.x,
    //                 y: sh.y,
    //                 r: sh.r,
    //                 pixelsPerDegree: sh.pixelsPerDegree, 
    //                 spatialFrequency: sh.spatialFrequency,
    //                 angle: sh.angle, 
    //                 contrast: sh.contrast, 
    //                 phase: sh.phase + 2*i*Math.PI/60,
    //                 cycle: sh.cycle,
    //                 speed: sh.speed
    //             }
    //         });
    //         sinGratList.push(singrat);
    //     }
    //     console.dir(sinGratList);
    //     (async ()=>{
    //         for(let i = 0;i < sinGratList.length;i+=sh.speed)
    //         {
    //             this.add(sinGratList[i])
    //             await ezTime.delay_frame(1);
    //             if(i!==sinGratList.length-sh.speed)
    //                 sinGratList[i].remove();
    //         }
    //     })()
    // }
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
    sinGrat: sinGrat,
    sleep: sleep,
    WaitSecs: WaitSecs,
    KeypressInit: KeypressInit,
    test: test,
    Dialogue: Dialogue,
    DlgInit: DlgInit
});

export { EZPSY as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL3NpbkdyYXQudHMiLCIuLi8uLi9zcmMvSnVkZ2UvanVkZ2UudHMiLCIuLi8uLi9zcmMvU3RvcmFnZS9zdG9yYWdlLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZVBlcmZvcm1hbmNlLnRzIiwiLi4vLi4vc3JjL0tleXByZXNzL2tleXByZXNzMC50cyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvdXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL3BhcmFtcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvY2xhc3Nlcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2dldHRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9kb21VdGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvaXNOb2RlRW52LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9jb25zdGFudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2dsb2JhbFN0YXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vaW5pdC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3BhcnNlSHRtbFRvQ29udGFpbmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vYW5pbWF0aW9uRW5kRXZlbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9tZWFzdXJlU2Nyb2xsYmFyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckFjdGlvbnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyQ29udGFpbmVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9wcml2YXRlUHJvcHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVySW5wdXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyQ29udGVudC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJGb290ZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyQ2xvc2VCdXR0b24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVySWNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJJbWFnZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJQcm9ncmVzc1N0ZXBzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlclRpdGxlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlclBvcHVwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvRGlzbWlzc1JlYXNvbi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvYXJpYS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZ2V0VGVtcGxhdGVQYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RlZmF1bHRJbnB1dFZhbGlkYXRvcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL3NldFBhcmFtZXRlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL1RpbWVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9zY3JvbGxiYXJGaXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2lvc0ZpeC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvb3BlblBvcHVwLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL3Nob3dMb2FkaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vaW5wdXRVdGlscy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2hpZGVMb2FkaW5nLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvZ2V0SW5wdXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3ByaXZhdGVNZXRob2RzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2RvbS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMva2V5ZG93bi1oYW5kbGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvY2xvc2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9lbmFibGUtZGlzYWJsZS1lbGVtZW50cy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL3ZhbGlkYXRpb24tbWVzc2FnZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL3Byb2dyZXNzLXN0ZXBzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvdXBkYXRlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvX2Rlc3Ryb3kuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2J1dHRvbnMtaGFuZGxlcnMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3BvcHVwLWNsaWNrLWhhbmRsZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvYXJnc1RvUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2ZpcmUuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvbWl4aW4uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvdGltZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N0YXRpY01ldGhvZHMvYmluZENsaWNrSGFuZGxlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvU3dlZXRBbGVydC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3dlZXRhbGVydDIuanMiLCIuLi8uLi9zcmMvRGlhbG9ndWUvZGlhbG9ndWUwLnRzIiwiLi4vLi4vc3JjL2V6cHN5LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIlxubGV0IGlkU3RhcnQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gaWRTdGFydCsrO1xufSIsImltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmV4cG9ydCBpbnRlcmZhY2UgY2FudmFzU3R5bGV7XG4gICAgd2lkdGg/OiBudW1iZXI7XG4gICAgaGVpZ2h0PzogbnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzKGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIC8vIGxldCBjU3R5bGU6IGNhbnZhc1N0eWxlID0ge1xuICAgIC8vICAgICB3aWR0aDogMTAwLFxuICAgIC8vICAgICBoZWlnaHQ6IDEwMFxuICAgIC8vIH1cbiAgICBjLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJ1xuICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgYy5zdHlsZS50b3AgPSAoKGgtY1N0eWxlLmhlaWdodCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBjLnN0eWxlLmxlZnQgPSAoKHctY1N0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJyk7XG4gICAgZG9tLmFwcGVuZChjKTtcbiAgICByZXR1cm4gY3R4O1xufSIsIlxuY2xhc3MgdGltZXtcbiAgICBob3VyOiBudW1iZXJcbiAgICBtaW51dGVzOiBudW1iZXJcbiAgICBzZWNvbmRzOiBudW1iZXJcbiAgICBtaWxsaXNlY29uZHM6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgICB0aGlzLmhvdXIgPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgdGhpcy5taW51dGVzID0gZGF0ZS5nZXRNaW51dGVzKClcbiAgICAgICAgdGhpcy5zZWNvbmRzID0gZGF0ZS5nZXRTZWNvbmRzKClcbiAgICAgICAgdGhpcy5taWxsaXNlY29uZHMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGltZTB7XG4gICAgc3RhcnRUaW1lOiB0aW1lXG4gICAgaW5zdGFudFRpbWU6IEFycmF5PHRpbWU+XG4gICAgdGltZVN0YW1wOiBBcnJheTx0aW1lPlxuICAgIGl0ZW06IG51bWJlclxuICAgIHRpbWVWYWx1ZTogQXJyYXk8bnVtYmVyPlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuaXRlbSA9IDA7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IHRpbWUoKVxuICAgICAgICB0aGlzLmluc3RhbnRUaW1lID0gW11cbiAgICAgICAgdGhpcy5pbnN0YW50VGltZS5wdXNoKHRoaXMuc3RhcnRUaW1lKVxuICAgICAgICB0aGlzLnRpbWVWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gW11cbiAgICB9XG4gICAgc3RhcnQoKXtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgdGltZSgpXG4gICAgfVxuICAgIHJlY29yZCgpe1xuICAgICAgICBsZXQgdCA9IG5ldyB0aW1lKClcbiAgICAgICAgdGhpcy5pbnN0YW50VGltZS5wdXNoKHQpXG4gICAgICAgIHRoaXMuaXRlbSsrXG4gICAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gVGljKCk6IFRpbWUwe1xuLy8gICAgIGxldCB0ID0gbmV3IFRpbWUwKClcbi8vICAgICB0LnN0YXJ0KClcbi8vICAgICByZXR1cm4gdDtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIFRvYyh0aW1lOiBUaW1lMCk6IG51bWJlcntcbi8vICAgICBsZXQgdCA9IDA7XG4vLyAgICAgbGV0IHRzID0gbmV3IEFycmF5KClcbi8vICAgICB0aW1lLnJlY29yZCgpXG4vLyAgICAgdHNbMF0gPSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbV0uaG91ciAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLmhvdXJcbi8vICAgICB0c1sxXSA9IHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtXS5taW51dGVzIC0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW0tMV0ubWludXRlc1xuLy8gICAgIHRzWzJdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLnNlY29uZHMgLSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbS0xXS5zZWNvbmRzXG4vLyAgICAgdHNbM10gPSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbV0ubWlsbGlzZWNvbmRzIC0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW0tMV0ubWlsbGlzZWNvbmRzXG4vLyAgICAgdCA9IDYwKjYwKnRzWzBdICsgNjAqdHNbMV0gKyB0c1syXSArIHRzWzNdLzEwMDBcbi8vICAgICAvLyB0LnRvRml4ZWQoMylcbi8vICAgICB0aW1lLnRpbWVWYWx1ZS5wdXNoKHQpO1xuLy8gICAgIHJldHVybiB0O1xuLy8gfVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gc2V0VGltZVR0YW1wKFQ6IFRpbWUwKXtcbi8vICAgICBsZXQgdCA9IG5ldyB0aW1lKCk7XG4vLyAgICAgVC50aW1lU3RhbXAucHVzaCh0KTtcbi8vIH0gXG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBnZXRUb2ModGltZTogVGltZTApOiBBcnJheTxudW1iZXI+e1xuLy8gICAgIGxldCB0QSA9IG5ldyBBcnJheSgpO1xuLy8gICAgIGxldCB0cyA9IG5ldyBBcnJheSgpO1xuLy8gICAgIGxldCB0ID0gdGltZS50aW1lU3RhbXBcbi8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBNYXRoLmZsb29yKHQubGVuZ3RoLzIpO2krKyl7XG4vLyAgICAgICAgIGlmKHRbMippKzFdID09PSB1bmRlZmluZWQpXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIGJyZWFrO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB0c1swXSA9IHRbMippKzFdLmhvdXIgLSB0WzIqaV0uaG91clxuLy8gICAgICAgICAgICAgdHNbMV0gPSB0WzIqaSsxXS5taW51dGVzIC0gdFsyKmldLm1pbnV0ZXNcbi8vICAgICAgICAgICAgIHRzWzJdID0gdFsyKmkrMV0uc2Vjb25kcyAtIHRbMippXS5zZWNvbmRzXG4vLyAgICAgICAgICAgICB0c1szXSA9IHRbMippKzFdLm1pbGxpc2Vjb25kcyAtIHRbMippXS5taWxsaXNlY29uZHNcbi8vICAgICAgICAgICAgIHRBW2ldID0gNjAqNjAqdHNbMF0gKyA2MCp0c1sxXSArIHRzWzJdICsgdHNbM10vMTAwMFxuLy8gICAgICAgICAgICAgLy8gdEFbaV0gPSBNYXRoLnJvdW5kKHRBW2ldKjEwMDApLzEwMDBcbi8vICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRBW2ldKVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiB0QTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIEdldFNlY3ModGltZTogVGltZTApOiBudW1iZXJ7XG4vLyAgICAgbGV0IHQgPSBUb2ModGltZSlcbi8vICAgICByZXR1cm4gdFxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gV2FpdFNlY3MwKGRlbGF5OiBudW1iZXIsbWVzc2FnZT86IGFueSl7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgICAgIHJlc29sdmUoMSk7XG4gICAgICAgIH0sIGRlbGF5KTtcbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVsYXlfZnJhbWUobnVtMSl7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT5udW0xKXtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICAgICAgICByZXNvbHZlKDApO1xuICAgICAgICB9XG4gICAgfSgpKVxuICAgIH0pXG59OyIsImltcG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBTaGFwZSxTdHlsZX0gZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0IHsgbmFtZVN0eWxlIH0gZnJvbSAnLi9EYXRhVHlwZS9kYXRhVHlwZSc7XG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9TdG9yYWdlL3N0b3JhZ2UnO1xuaW1wb3J0ICogYXMgZXpUaW1lIGZyb20gXCIuL1RpbWUvdGltZVwiXG5pbXBvcnQgKiBhcyBlelRpbWVyIGZyb20gXCIuL1RpbWUvdGltZVBlcmZvcm1hbmNlXCJcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IFRleHRMaW5lIH0gZnJvbSAnLi9HcmFwaGljL3RleHQnO1xuXG5leHBvcnQgY2xhc3MgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZVxuICAgIHNoYXBlPzogU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlIFxuICAgIHRleHRMaW5lPzogVGV4dExpbmVcbiAgICBjdHg/OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICBzdG9yYWdlPzogU3RvcmFnZVxuICAgIHNjYWxlPzogU2NhbGVcbiAgICB0cmFuc2xhdGU/OiBUcmFuc2xhdGVcbiAgICByb3RhdGU/OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwXG4gICAgfVxuICAgIG5vRmlsbCgpe1xuICAgICAgICB0aGlzLnN0eWxlLmZpbGwgPSAnbm9uZSc7XG4gICAgfVxuICAgIG5vU3Ryb2tlKCl7XG4gICAgICAgIHRoaXMuc3R5bGUubGluZVdpZHRoID0gMDtcbiAgICAgICAgLy8gaWYodGhpcy5zdHlsZS5maWxsICE9PSAnbm9uZScgJiYgdGhpcy5zdHlsZS5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSB0aGlzLnN0eWxlLmZpbGxcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBlbHNle1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZS5zdHJva2UgPSBcIiNmZmZcIjtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKCdFcnJvciEnKVxuICAgICAgICAvLyB9XG4gICAgICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gJ25vbmUnXG4gICAgfVxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xuICAgICAgICBsZXQgYyA9IHRoaXMuY3R4LmNhbnZhcztcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xuICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xuICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHQ7XG4gICAgICAgIGxldCB3ID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcbiAgICAgICAgYy5zdHlsZS50b3AgPSAoKGgtY1N0eWxlLmhlaWdodCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgYy5zdHlsZS5sZWZ0ID0gKCh3LWNTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgbGV0IGVsID0gdGhpcztcbiAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWwsY3R4KVxuICAgIH1cbiAgICByZW1vdmUoKXtcblxuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgXG4gICAgICAgIGN0eC5zYXZlKClcbiAgICAgICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgICAgIGN0eC5maWxsU3R5bGU9XCJ3aGl0ZVwiXHRcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCwxLDEpXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249XCJkZXN0aW5hdGlvbi1pblwiO1xuICAgICAgICBjdHguZmlsbFJlY3QoMCwwLDEsMSk7XG4gICAgICAgIC8vIGN0eC5jbG9zZVBhdGgoKVx0XG4gICAgICAgIGN0eC5yZXN0b3JlKClcbiAgICAgICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbj0nc291cmNlLW92ZXInXG5cbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlRHJhdyhjdHgpO1xuXG5cbiAgICAgICAgLy8gbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIC8vIGxldCBjID0gY3R4LmNhbnZhcztcbiAgICAgICAgLy8gYy53aWR0aCA9IGMud2lkdGg7XG4gICAgICAgIC8vIGMuaGVpZ2h0ID0gYy5oZWlnaHQ7XG5cblxuICAgICAgICBcbiAgICB9XG5cbiAgICBhbmltYXRlKGZ1bmM6IEZ1bmN0aW9uLGRlbGF5OiBudW1iZXIpe1xuICAgICAgICAvLyBlbC5jdHggPSB0aGlzLmN0eDtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAvLyBlbC5yZW1vdmUoKTtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAvLyBsZXQgc3RhcnQgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgLy8gbGV0IGN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyh0aGlzLmRvbSx0aGlzLmNTdHlsZSk7IFxuICAgICAgICAvLyB0aGlzLmN0eExpc3QucHVzaChjdHgpO1xuICAgICAgICAoYXN5bmMgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIC8vIHdoaWxlKHBlcmZvcm1hbmNlLm5vdygpID4gc3RhcnQpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB3aGlsZSgxKXtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihwZXJmb3JtYW5jZS5ub3coKSlcbiAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKGRlbGF5KTtcbiAgICAgICAgICAgICAgICB0aGF0LnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdClcbiAgICAgICAgICAgICAgICB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICAgICBmdW5jKCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAgICAgLy8gICAgIGF3YWl0IGV6VGltZXIuc2xlZXAoZGVsYXkpXG4gICAgICAgICAgICAvLyAgICAgdGhhdC5yZW1vdmUoKVxuICAgICAgICAgICAgLy8gICAgIHRoYXQuc3RvcmFnZS5wdXNoKHRoYXQpXG4gICAgICAgICAgICAvLyAgICAgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgICAgICAgICAvLyAgICAgLy8gZXpKdWRnZS5qdWRnZUFuaW1hdGUodGhhdCxjdHgpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAgICAgICAgIC8vICAgICAvLyBhd2FpdCBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyB3aW5kb3cuc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgICAgIC8vICAgICBmdW5jKCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAgICAgLy8gICAgIGV6VGltZXIuc2xlZXAoZGVsYXkpLnRoZW4oKCk9PntcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhhdC5yZW1vdmUoKVxuICAgICAgICAgICAgLy8gICAgICAgICB0aGF0LnN0b3JhZ2UucHVzaCh0aGF0KVxuICAgICAgICAgICAgLy8gICAgICAgICB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eClcbiAgICAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gfSwwKVxuICAgICAgICB9KSgpXG4gICAgfVxuXG4gICAgLy8gcm90YXRlKGFuZ2xlOiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgbGV0IHggPSB0aGlzLnNoYXBlLnhcbiAgICAvLyAgICAgbGV0IHkgPSB0aGlzLnNoYXBlLnlcbiAgICAvLyAgICAgdGhpcy5zaGFwZS54ID0gMDtcbiAgICAvLyAgICAgdGhpcy5zaGFwZS55ID0gMDtcbiAgICAvLyAgICAgY3R4LnRyYW5zbGF0ZSh4LHkpO1xuICAgIC8vICAgICBjdHgucm90YXRlKGFuZ2xlKVxuICAgIC8vICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eClcbiAgICAvLyB9XG5cbiAgICAvLyBzY2FsZShzY2FsZVdpZHRoOiBudW1iZXIsc2NhbGVIZWlnaHQ6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC5zY2FsZShzY2FsZVdpZHRoLHNjYWxlSGVpZ2h0KVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eClcbiAgICAvLyAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyB9XG4gICAgLy8gcm90YXRlKGFuZzogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIHRoaXMucmVtb3ZlKClcbiAgICAvLyAgICAgY3R4LnNhdmUoKVxuICAgIC8vICAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyAgICAgY3R4LnJvdGF0ZShhbmcpXG4gICAgLy8gICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHRoaXMsY3R4KVxuICAgIC8vICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIH1cbiAgICAvLyB0cmFuc2xhdGUoeDogbnVtYmVyLHk6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC50cmFuc2xhdGUoeCx5KVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eCk7XG4gICAgLy8gICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vICAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNjYWxle1xuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlclxufSIsImltcG9ydCB7IENsYXNzIH0gZnJvbSAnZXN0cmVlJztcbmltcG9ydCB7IGp1ZGdlRWxlbWVudCB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgbmFtZVN0eWxlIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnO1xuXG5sZXQgZ3JvdXBJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBHcm91cCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZ3JvdXBcIiArIGdyb3VwSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBncm91cElkXG4gICAgfVxuICAgIGxlbmd0aDogbnVtYmVyXG4gICAgLy8gY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICBncm91cExpc3Q6IEVsZW1lbnRzW118R3JvdXBbXXxHcm91cFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKGVsOiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXApe1xuXG4gICAgICAgIHN1cGVyKClcblxuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyB0aGlzLmlkID0gZ3JvdXBJZDtcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5sZW5ndGggPSAxXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gZWwubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZ3JvdXBMaXN0ID0gZWw7XG5cbiAgICAgICAgZ3JvdXBJZCsrIFxuICAgIH1cbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsganVkZ2VDaGFuZ2VUeXBlLGp1ZGdlU2lkZSxqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcblxuXG5pbnRlcmZhY2UgUmVjdGFuZ2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHdpZHRoOiBudW1iZXIsXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJlY3RhbmdsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSZWN0YW5nbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxuY2xhc3MgQ2VudGVye1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMueCA9IHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGggLyAyO1xuICAgICAgICB0aGlzLnkgPSByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodCAvIDI7XG4gICAgfVxufVxuXG5jbGFzcyBTaXple1xuICAgIHJlY3Q6IFJlY3RhbmdsZVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxuICAgIGNvbnN0cnVjdG9yKHJlY3Q6IFJlY3RhbmdsZSl7XG4gICAgICAgIHRoaXMucmVjdCA9IHJlY3Q7XG4gICAgICAgIHRoaXMud2lkdGggPSByZWN0LnNoYXBlLndpZHRoXG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG59XG5cbmNsYXNzIFNpZGVYWXtcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgUmVjdEdyb3VwIGV4dGVuZHMgR3JvdXAge1xuICAgIFBhcmVudHNSZWN0OiBSZWN0YW5nbGVcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUsZWw6IEVsZW1lbnRzW10pe1xuICAgICAgICBzdXBlcihlbClcbiAgICAgICAgdGhpcy5QYXJlbnRzUmVjdCA9IHJlY3Q7XG4gICAgfVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy8gY2xhc3MgVHlwZVRlc3QgaW1wbGVtZW50cyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICB4OiBudW1iZXJcbi8vICAgICB5OiBudW1iZXJcbi8vICAgICB3aWR0aDogbnVtYmVyXG4vLyAgICAgaGVpZ2h0OiBudW1iZXJcbi8vIH1cblxuZXhwb3J0IGNsYXNzIFJlY3RhbmdsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicmVjdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFJlY3RhbmdsZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eDtcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG5cbiAgICB9XG59XG5cbmNsYXNzIGxvZ2ljUmVjdCBleHRlbmRzIFJlY3RhbmdsZXtcbiAgICByZWN0UGFyZW50czA6IFJlY3RhbmdsZTtcbiAgICByZWN0UGFyZW50czE6IFJlY3RhbmdsZTtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoe3NoYXBlOntcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgfX0pXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMwID0gcmVjdFBhcmVudHMwXG4gICAgICAgIHRoaXMucmVjdFBhcmVudHMxID0gcmVjdFBhcmVudHMxXG4gICAgfVxufVxuXG5jbGFzcyBjbGlwUmVjdCBleHRlbmRzIGxvZ2ljUmVjdHtcbiAgICBjb25zdHJ1Y3RvcihbeCx5LHdpZHRoLGhlaWdodF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHJlY3RQYXJlbnRzMDogUmVjdGFuZ2xlLHJlY3RQYXJlbnRzMTogUmVjdGFuZ2xlKXtcbiAgICAgICAgc3VwZXIoW3gseSx3aWR0aCxoZWlnaHRdLHJlY3RQYXJlbnRzMCxyZWN0UGFyZW50czEpXG4gICAgfVxufVxuXG5jbGFzcyB1bmlvblJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gaW5zdGFuY2VvZlJlY3RhbmdsZShlOiBhbnkpOiBlIGlzIFJlY3RhbmdsZVNoYXBle1xuLy8gICAgIHJldHVybiAgaW4gZTtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuLy8gICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4vLyAgICAgbGV0IHN0ID0gcmVjdC5zdHlsZTtcbi8vICAgICBsZXQgZixzO1xuLy8gICAgIC8vIGNvbnNvbGUuZGlyKHN0LnN0cm9rZSlcbi8vICAgICBbY3R4LGYsc10gPSBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbi8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZVJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSA9PT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4vLyAgICAgICAgIGN0eC5maWxsUmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICB9XG4vLyAgICAgZWxzZSBpZihzdC5maWxsID09PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4vLyAgICAgICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIGNvbnNvbGUuZGlyKFwiZXJyb3IhSXQgY2FuJ3QgcGFpbnQgYSByZWN0YW5nbGUgd2l0aG91dCBmaWxsU3R5bGUgYW5kIHN0cm9rZVN0eWxlXCIpXG4vLyAgICAgfVxuICAgIFxuLy8gICAgIHJldHVybiByZWN0O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVJlY3RhbmdsZShyZWN0OiBSZWN0YW5nbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBSZWN0YW5nbGV7XG4gICAgbGV0IHNoID0gcmVjdC5zaGFwZTtcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGp1ZGdlVFJTKHJlY3QpO1xuICAgIGN0eC5yZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuICAgIGp1ZGdlU3R5bGUocmVjdCxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIHJlY3Q7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBZGpvaW5SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxmaXhlZFN0eWxlPzogc3RyaW5nfG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouaLvOaOpSBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaLvOaOpeefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGlmKCFmaXhlZFN0eWxlKVxuICAgIHtcbiAgICAgICAgZml4ZWRTdHlsZSA9ICdSRUNUTEVGVCdcbiAgICB9XG4gICAgbGV0IGYgPSBqdWRnZUNoYW5nZVR5cGUoZml4ZWRTdHlsZSk7XG4gICAgLy8gY29uc29sZS5kaXIoJ2Y9JytmKTtcbiAgICBpZihmID09PSAxKXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfTGVmdChmaXhlZFJlY3QscmVjdCk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG5ld1JlY3QpXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMil7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1RvcChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMyl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X1JpZ2h0KGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSA0KXtcbiAgICAgICAgbmV3UmVjdCA9IFJlY3RfQm90dG9tKGZpeGVkUmVjdCxyZWN0KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBvcmRlciEnKVxuICAgIH1cbiAgICBcbiAgICBcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X0xlZnQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCAtIHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSArIChmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IC0gcmVjdC5zaGFwZS5oZWlnaHQpLzIsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9SaWdodChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOlJlY3RhbmdsZSB7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfVG9wKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55IC0gcmVjdC5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9Cb3R0b20oZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIChmaXhlZFJlY3Quc2hhcGUud2lkdGggLSByZWN0LnNoYXBlLndpZHRoKS8yLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyBmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Q2VudGVyKHJlY3Q6IFJlY3RhbmdsZSk6IENlbnRlcntcbiAgICAvL+iOt+WPluefqeW9ouS4reW/g1xuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKHJlY3QpO1xuICAgIHJldHVybiBjZW50ZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBBbGlnblJlY3QoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLHNpZGUwPzogbnVtYmVyfHN0cmluZyxzaWRlMT86IG51bWJlcnxzdHJpbmcpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlr7npvZAgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXlr7npvZDnn6nlvaIgZml4ZWRTdHlsZSDlr7npvZDlvaLlvI9cbiAgICBpZihzaWRlMCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTAgPSAwXG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cbiAgICBpZihzaWRlMSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc2lkZTEgPSAwXG4gICAgfVxuXG4gICAgaWYocmVjdC5zaGFwZS53aWR0aCpyZWN0LnNoYXBlLmhlaWdodCA+IGZpeGVkUmVjdC5zaGFwZS53aWR0aCpmaXhlZFJlY3Quc2hhcGUuaGVpZ2h0IClcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFUaGUgYXJlYSBvZiBmaWV4ZWRSZWN0ICBpcyBzbWFsbGVyIHRoYW4gdGhlIHJlY3QhJylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGxldCBbZjAsZjFdID0ganVkZ2VTaWRlKHNpZGUwLHNpZGUxKTtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZjArXCIgXCIrZjEpO1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAwLFxuICAgICAgICAgICAgICAgIGhlaWdodDogMTAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKTtcbiAgICAgICAgaWYoZjAgPT09IDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAxIHx8IGYxID09PSAzKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLng7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS55O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzLnkgPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS55O1xuICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueDtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmRpcihzKVxuICAgICAgICBcbiAgICAgICAgbmV3UmVjdC5zaGFwZS54ID0gcy54O1xuICAgICAgICBuZXdSZWN0LnNoYXBlLnkgPSBzLnk7XG4gICAgICAgIHJldHVybiBuZXdSZWN0O1xuICAgIH1cbiAgICBcbiAgICBcbn1cblxuZnVuY3Rpb24gQWxpZ25YWShmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZjogbnVtYmVyKTogU2lkZVhZe1xuICAgIGxldCBzID0gbmV3IFNpZGVYWSgpXG4gICAgbGV0IGNlbnRlciA9IG5ldyBDZW50ZXIoZml4ZWRSZWN0KTtcbiAgICAvLyBjb25zb2xlLmRpcihjZW50ZXIpXG4gICAgaWYoZiA9PT0gMClcbiAgICB7ICAgXG4gICAgICAgIHMueCA9IGNlbnRlci54IC0gcmVjdC5zaGFwZS53aWR0aC8yXG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gcmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDEpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCAtIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMilcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55IC0gZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gMylcbiAgICB7XG4gICAgICAgIHMueCA9IGNlbnRlci54ICsgZml4ZWRSZWN0LnNoYXBlLndpZHRoLzIgLSByZWN0LnNoYXBlLndpZHRoXG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNClcbiAgICB7XG4gICAgICAgIHMueSA9IGNlbnRlci55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodC8yIC0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yISBQbGVhc2UgdXNlIHRoZSByaWdodCBpbnN0cnVjdGlvbiEnKVxuICAgIH1cbiAgICByZXR1cm4gc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gT2Zmc2V0UmVjdChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICAvL+efqeW9ouW5s+enu1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQXJyYW5nZVJlY3RzKG46IG51bWJlcixbeE51bWJlcix5TnVtYmVyXTogW251bWJlcixudW1iZXJdLHdpbmRvd1JlY3Q6IFJlY3RhbmdsZSxzdHlsZT86IG51bWJlcik6IFJlY3RHcm91cHtcbiAgICAvL+WIm+W7uuefqeW9oumYteWIl1xuICAgIGxldCByZWN0ID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgbGV0IG51bSA9IHhOdW1iZXIgKiB5TnVtYmVyXG4gICAgbGV0IHggPSB3aW5kb3dSZWN0LnNoYXBlLnhcbiAgICBsZXQgeSA9IHdpbmRvd1JlY3Quc2hhcGUueVxuICAgIGxldCB3aWR0aCA9IHdpbmRvd1JlY3Quc2hhcGUud2lkdGggLyB4TnVtYmVyXG4gICAgbGV0IGhlaWdodCA9IHdpbmRvd1JlY3Quc2hhcGUuaGVpZ2h0IC8geU51bWJlclxuICAgIC8vIGNvbnNvbGUuZGlyKFt4LHksd2lkdGgsaGVpZ2h0XSlcblxuICAgIGlmKG4gPiBudW0pe1xuICAgICAgICBuID0gbnVtXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0eWxlID0gMDtcbiAgICB9XG5cbiAgICBpZihzdHlsZSA+IDEpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDBcbiAgICB9XG5cbiAgICBpZihzdHlsZSA9PT0gMClcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgeE51bWJlcjtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IHlOdW1iZXI7aisrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGkqeE51bWJlcitqIDwgbilcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlY3RbaSp4TnVtYmVyK2pdID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHg6IHggKyB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC0gd2lkdGggLSB3aWR0aCAqIGosXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeTogeSArIGhlaWdodCAqIGksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXG5cbiAgICAvLyBjb25zb2xlLmRpcihyZWN0KVxuXG4gICAgbGV0IHJlY3RHcm91cCA9IG5ldyBSZWN0R3JvdXAod2luZG93UmVjdCxyZWN0KTtcbiAgICByZXR1cm4gcmVjdEdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICAvL+enu+WKqOefqeW9ouiHs+afkOefqeW9ouS4reW/gyBmaXhlZFJlY3Tln7rlh4bnn6nlvaIgcmVjdOW+heaTjeS9nOefqeW9oiBmaXhlZFN0eWxlIOaLvOaOpeW9ouW8j1xuICAgIGxldCBuZXdSZWN0ID0gQWxpZ25SZWN0KGZpeGVkUmVjdCxyZWN0LDAsMCk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENlbnRlclJlY3RPblBvaW50KHJlY3Q6IFJlY3RhbmdsZSxbeCx5XTogW251bWJlcixudW1iZXJdKTogUmVjdGFuZ2xle1xuICAgIGxldCBuZXdSZWN0ID0gT2Zmc2V0UmVjdChyZWN0LFt4LHldKVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0V2lkdGgocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i5a695bqmXG4gICAgbGV0IHdpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgIHJldHVybiB3aWR0aFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdEhlaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLpq5jluqZcbiAgICBsZXQgaGVpZ2h0ID0gcmVjdC5zaGFwZS5oZWlnaHRcbiAgICByZXR1cm4gaGVpZ2h0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFNpemUocmVjdDogUmVjdGFuZ2xlKTogU2l6ZXtcbiAgICAvL+iOt+WPluefqeW9ouWuvemrmFxuICAgIGxldCBzaXplID0gbmV3IFNpemUocmVjdClcbiAgICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuLy8gICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4vLyAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdDAuc2hhcGUueCxyZWN0MC5zaGFwZS55LHJlY3QwLnNoYXBlLndpZHRoLHJlY3QwLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgW3gxLHkxLHcxLGgxXSA9IFtyZWN0MS5zaGFwZS54LHJlY3QxLnNoYXBlLnkscmVjdDEuc2hhcGUud2lkdGgscmVjdDEuc2hhcGUuaGVpZ2h0XVxuLy8gICAgIGxldCBSZWN0LHhuLHluLHduLGhuO1xuLy8gICAgIGxldCBhcmVhMCA9IHcwICogaDA7XG4vLyAgICAgbGV0IGFyZWExID0gdzEgKiBoMTtcbi8vICAgICBsZXQgeCx5LHcsaFxuLy8gICAgIGxldCB4dCx5dCx3dCxodCxyZWN0XG4vLyAgICAgaWYoYXJlYTAgPj0gYXJlYTEpXG4vLyAgICAge1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDEseTEsdzEsaDFdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QwO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBbeCx5LHcsaF0gPSBbeDAseTAsdzAsaDBdO1xuLy8gICAgICAgICBbeHQseXQsd3QsaHRdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgcmVjdCA9IHJlY3QxO1xuLy8gICAgIH1cbi8vICAgICBjb25zb2xlLmRpcihbeCx5LHcsaF0pO1xuLy8gICAgIGNvbnNvbGUuZGlyKFt4dCx5dCx3dCxodF0pXG4vLyAgICAgaWYoIUlzSW5SZWN0KFt4LHldLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHkraF0scmVjdCkgJiYgIUlzSW5SZWN0KFt4K3cseV0scmVjdCkgJiYgIUlzSW5SZWN0KFt4LHkraF0scmVjdCkpe1xuLy8gICAgICAgICBSZWN0ID0gWzAsMCwwLDBdXG4vLyAgICAgfVxuLy8gICAgIGVsc2V7XG4vLyAgICAgICAgIHduID0gTWF0aC5hYnMoTWF0aC5taW4oeDAgKyB3MCAseDEgKyB3MSkgLSBNYXRoLm1heCh4MCwgeDEpKVxuLy8gICAgICAgICBobiA9IE1hdGguYWJzKE1hdGgubWluKHkwICsgaDAsIHkxICsgaDEpIC0gTWF0aC5tYXgoeTAsIHkxKSlcbi8vICAgICAgICAgaWYoSXNJblJlY3QoW3gseV0scmVjdCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5O1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2UgaWYoKHggPj0geHQgJiYgeDw9eHQrd3QpICYmICh5IDwgeXQgfHwgeSA+IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHg7XG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4IDwgeHQgfHwgeCA+IHh0K3d0KSAmJiAoeSA+PSB5dCAmJiB5IDw9IHl0K2h0KSl7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHhuID0geCArICh3IC0gd24pXG4vLyAgICAgICAgICAgICB5biA9IHkgKyAoaCAtIGhuKVxuLy8gICAgICAgICB9XG4gICAgICAgIFxuLy8gICAgICAgICBSZWN0ID0gW3huLHluLHduLGhuXTtcbiAgICAgICAgXG4vLyAgICAgfVxuXG4vLyAgICAgbGV0IG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbi8vICAgICByZXR1cm4gbmV3UmVjdDtcblxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gQ2xpcFJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogY2xpcFJlY3R7XG4gICAgLy/nn6nlvaLph43lj6DljLrln59cbiAgICBsZXQgbmV3UmVjdCxSZWN0XG4gICAgbGV0IHhsMCx4cjAseXQwLHliMDtcbiAgICBsZXQgeGwxLHhyMSx5dDEseWIxO1xuICAgIGxldCB4LHksdyxoXG4gICAgW3hsMCx4cjAseXQwLHliMF0gPSBbUmVjdExlZnQocmVjdDApLFJlY3RSaWdodChyZWN0MCksUmVjdFRvcChyZWN0MCksUmVjdEJvdG9tKHJlY3QwKV07XG4gICAgW3hsMSx4cjEseXQxLHliMV0gPSBbUmVjdExlZnQocmVjdDEpLFJlY3RSaWdodChyZWN0MSksUmVjdFRvcChyZWN0MSksUmVjdEJvdG9tKHJlY3QxKV07XG4gICAgaWYoSXNJblJlY3QoW3hsMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeHIwLHl0MF0scmVjdDEpIHx8IElzSW5SZWN0KFt4bDAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5YjBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4cjEseXQxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hsMSx5YjFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHliMV0scmVjdDApKVxuICAgIHtcbiAgICAgICAgeCA9IE1hdGgubWF4KHhsMCx4bDEpO1xuICAgICAgICB5ID0gTWF0aC5tYXgoeXQwLHl0MSk7XG4gICAgICAgIHcgPSBNYXRoLm1pbih4cjAseHIxKSAtIHg7XG4gICAgICAgIGggPSBNYXRoLm1pbih5YjAseWIxKSAtIHk7XG4gICAgICAgIFJlY3QgPSBbeCx5LHcsaF1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuICAgIH1cblxuICAgIG5ld1JlY3QgPSBuZXcgY2xpcFJlY3QoUmVjdCxyZWN0MCxyZWN0MSk7XG5cbiAgICByZXR1cm4gbmV3UmVjdDtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNJblJlY3QoW3gseV06IFtudW1iZXIsbnVtYmVyXSxyZWN0OiBSZWN0YW5nbGUpOiBib29sZWFue1xuICAgIC8v5Yik5pat54K55piv5ZCm5Zyo55+p5b2i5YaFXG4gICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbcmVjdC5zaGFwZS54LHJlY3Quc2hhcGUueSxyZWN0LnNoYXBlLndpZHRoLHJlY3Quc2hhcGUuaGVpZ2h0XVxuICAgIGlmKHggPj0geDAgJiYgeDw9eDArdzAgJiYgeSA+PSB5MCAmJiB5IDw9IHkwK2gwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBHcm93UmVjdChlbDogUmVjdGFuZ2xlLyp8UmVjdEdyb3VwfEdyb3VwKi8saDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+aUvui0n+e8qSBcbiAgICAvLyBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICAvLyB7XG4gICAgICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgICAgICBzaGFwZTp7XG4gICAgICAgICAgICAgICAgeDplbC5zaGFwZS54IC0gaCxcbiAgICAgICAgICAgICAgICB5OmVsLnNoYXBlLndpZHRoICsgMipoLFxuICAgICAgICAgICAgICAgIHdpZHRoOmVsLnNoYXBlLnkgLSB2LFxuICAgICAgICAgICAgICAgIGhlaWdodDplbC5zaGFwZS5oZWlnaHQgKyAyKnZcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIG5ld1JlY3RcbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBSZWN0R3JvdXApXG4gICAgLy8ge1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS54IC09IGg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS5oZWlnaHQgKz0gMip2O1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLndpZHRoICs9IDIqaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS55IC09IHY7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICAvLyBlbHNle1xuICAgIC8vICAgICBjb25zb2xlLmRpcihcIuexu+Wei+mUmeivr1wiKVxuICAgIC8vIH1cbn0gICAgICAgXG5cbmV4cG9ydCBmdW5jdGlvbiBJbnNldFJlY3QoZWw6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q2j57yp6LSf5pS+XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6ZWwuc2hhcGUueCArPSBoLFxuICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCAtPSAyKmgsXG4gICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55ICs9IHYsXG4gICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0IC09IDIqdlxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU2NhbGVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxoOiBudW1iZXIsdjogbnVtYmVyKTogUmVjdGFuZ2xle1xuICAgIC8v5q+U5L6L57yp5pS+XG4gICAgbGV0IGgwID0gcmVjdC5zaGFwZS53aWR0aCAqIChoLTEpIC8gMlxuICAgIGxldCB2MCA9IHJlY3Quc2hhcGUuaGVpZ2h0ICogKHYtMSkgLyAyXG4gICAgY29uc29sZS5kaXIoaDArJyAnK3YwKVxuICAgIGxldCBuZXdSZWN0ID0gR3Jvd1JlY3QocmVjdCxoMCx2MClcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gSXNFbXB0eVJlY3QocmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreefqemYteaYr+WQpuS4uuepulxuICAgIGxldCBhcmVhID0gcmVjdC5zaGFwZS53aWR0aCAqIHJlY3Quc2hhcGUuaGVpZ2h0O1xuICAgIGlmKGFyZWEgPT09IDApXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0T2ZNYXRyaXgoKXtcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdExlZnQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RSaWdodChyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueCArIHJlY3Quc2hhcGUud2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RUb3AocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RCb3RvbShyZWN0OiBSZWN0YW5nbGUpOiBudW1iZXJ7XG4gICAgcmV0dXJuIHJlY3Quc2hhcGUueSArIHJlY3Quc2hhcGUuaGVpZ2h0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbmlvblJlY3QocmVjdDA6IFJlY3RhbmdsZSxyZWN0MTogUmVjdGFuZ2xlKTogdW5pb25SZWN0e1xuICAgIGxldCBuZXdSZWN0O1xuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIHggPSBNYXRoLm1pbih4bDAseGwxKTtcbiAgICB5ID0gTWF0aC5taW4oeXQwLHl0MSk7XG4gICAgdyA9IE1hdGgubWF4KHhyMCx4cjEpIC0geDtcbiAgICBoID0gTWF0aC5tYXgoeWIwLHliMSkgLSB5O1xuICAgIG5ld1JlY3QgPSBuZXcgdW5pb25SZWN0KFt4LHksdyxoXSxyZWN0MCxyZWN0MSk7XG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxSZWN0KHJlY3Q6IFJlY3RhbmdsZSxmaWxsPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVSZWN0KHJlY3Q6IFJlY3RhbmdsZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCByZWN0MCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogcmVjdC5zaGFwZS54LFxuICAgICAgICAgICAgeTogcmVjdC5zaGFwZS55LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiByZWN0MFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQ2lyY2xlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQ2lyY2xlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIENpcmNsZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiY2lyY2xlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgZGVjbGFyZSBzaGFwZTogQ2lyY2xlU2hhcGVcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBDaXJjbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUNpcmNsZShjaXJjbGU6IENpcmNsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IENpcmNsZXtcbiAgICBsZXQgc2ggPSBjaXJjbGUuc2hhcGVcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAganVkZ2VUUlMoY2lyY2xlKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpO1xuICAgIGp1ZGdlU3R5bGUoY2lyY2xlLGN0eCk7XG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBjaXJjbGU7XG59IFxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd0RvdHMoW3gseSxyXTogW251bWJlcixudW1iZXIsbnVtYmVyXSxjb2xvcjogc3RyaW5nKTogQ2lyY2xle1xuICAgIGxldCBjaXJjbGUgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgcjogclxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogY29sb3IsXG4gICAgICAgICAgICBzdHJva2UgOiAnbm9uZSdcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGNpcmNsZVxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBMaW5lU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHhFbmQ6IG51bWJlcixcbiAgICB5RW5kOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIExpbmVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogTGluZVNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIExpbmUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImxpbmVcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBMaW5lT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGNsYXNzIGxpbmV7XG4vLyAgICAgbWFrZUxpbmUobGluZTogTGluZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IExpbmV7XG4vLyAgICAgICAgIGxldCBsID0gdGhpcy5tYWtlTGluZShsaW5lLGN0eCk7XG4vLyAgICAgICAgIHJldHVybiBsO1xuLy8gICAgIH1cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuICAgIGxldCBzaCA9IGxpbmUuc2hhcGU7XG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGp1ZGdlVFJTKGxpbmUpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54RW5kLHNoLnlFbmQpXG4gICAganVkZ2VTdHlsZShsaW5lLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGxpbmVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdMaW5lcyhlbDogTGluZVtdfEdyb3VwW118R3JvdXApOiBHcm91cHtcbiAgICAvL+e7mOWItuWkmuadoee6vyBvcHRzOue6v+adoeWxnuaAp1xuICAgIGxldCBncm91cCA9IG5ldyBHcm91cChlbClcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdNbGluZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLGdhcD86IG51bWJlcltdLHN0eWxlPzogYm9vbGVhbixzdGlwcGxlPzogYm9vbGVhbix3aWR0aEdhcD86IG51bWJlcik6R3JvdXB7XG4gICAgLy/nu5jliLblubPooYznur8gW3gseSx4RW5kLHlFbmRd5Yid5aeL57q/55qE5Lik56uv5Z2Q5qCHIGdhcOe6v+S5i+mXtOeahOmXtOmalCBzdHlsZT1mYWxzZeS4uuawtOW5s+W5s+ihjCw9dHJ1ZeS4uuerluebtOW5s+ihjCBzdGlwcGxlPWZhbHNl5Li65a6e57q/LD10cnVl5Li66Jma57q/XG4gICAgaWYod2lkdGhHYXAgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygd2lkdGhHYXAgIT09ICdudW1iZXInKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSAxMDtcbiAgICAgICAgaWYoc3RpcHBsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdGlwcGxlICE9PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0aXBwbGUgPT09IGZhbHNlXG4gICAgICAgICAgICBpZihzdHlsZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHlsZSAhPT0gJ2Jvb2xlYW4nKXtcbiAgICAgICAgICAgICAgICBzdHlsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmKGdhcCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgICAgICAgICAgZ2FwID0gWzEwMCwxMDBdXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGxldCBvcHRzID0gbmV3IEFycmF5KCk7XG4gICAgXG4gICAgaWYoc3RpcHBsZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBvcHRzWzBdID0gbmV3IExpbmUgKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBpZihzdHlsZSA9PT0gZmFsc2UpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeStnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmQrZ2FwW2ktMV0qaVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgZ2FwLmxlbmd0aCsxO2krKyl7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4OiB4K2dhcFtpLTFdKmksXG4gICAgICAgICAgICAgICAgICAgICAgICB5OiB5LFxuICAgICAgICAgICAgICAgICAgICAgICAgeEVuZDogeEVuZCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeUVuZDogeUVuZFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBvcHRzWzBdID0gTGluZVN0aXBwbGUoW3gseSx4RW5kLHlFbmRdLHdpZHRoR2FwKTtcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2k8Z2FwLmxlbmd0aCsxO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gTGluZVN0aXBwbGUoW3gseStnYXBbaS0xXSppLHhFbmQseUVuZCtnYXBbaS0xXSppXSx3aWR0aEdhcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4K2dhcFtpLTFdKmkseSx4RW5kK2dhcFtpLTFdKmkseUVuZF0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgICAgIFxuICAgIFxuICAgIGxldCBncm91cCA9IERyYXdMaW5lcyhvcHRzKTtcbiAgICByZXR1cm4gZ3JvdXBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyB3aWR0aEdhcOmXtOmalCBcbiAgICBsZXQgbGluZWxlbmd0aCA9IE1hdGguc3FydChNYXRoLnBvdyh4RW5kLXgsMikrTWF0aC5wb3coeUVuZC15LDIpKVxuICAgIGlmKHdpZHRoR2FwPmxpbmVsZW5ndGh8fHdpZHRoR2FwPT09dW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgd2lkdGhHYXAgPSBsaW5lbGVuZ3RoLzEwO1xuICAgIH1cbiAgICBsZXQgbnVtID0gTWF0aC5mbG9vcihsaW5lbGVuZ3RoL3dpZHRoR2FwKVxuICAgIGxldCB4ZyA9IHdpZHRoR2FwKih4RW5kLXgpL2xpbmVsZW5ndGhcbiAgICBsZXQgeWcgPSB3aWR0aEdhcCooeUVuZC15KS9saW5lbGVuZ3RoXG4gICAgLy8gY29uc29sZS5kaXIobnVtKVxuICAgIGxldCBpID0gMDtcbiAgICBsZXQgbGluZSA9IG5ldyBBcnJheSgpO1xuICAgIHdoaWxlKGk8bnVtKVxuICAgIHtcbiAgICAgICAgbGluZVtpXSA9IG5ldyBMaW5lKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogeCt4ZyppLFxuICAgICAgICAgICAgICAgIHk6IHkreWcqaSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4K3hnKihpKzEpLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHkreWcqKGkrMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaSs9MjtcbiAgICB9XG4gICAgbGV0IExpbmVTdGlwcGxlID0gbmV3IEdyb3VwKGxpbmUpXG4gICAgcmV0dXJuIExpbmVTdGlwcGxlXG59XG5cbi8vIGV4cG9ydCBjbGFzcyBQb2x5IGV4dGVuZHMgR3JvdXB7XG4vLyAgICAgc3R5bGU6IFN0eWxlXG4vLyAgICAgY29uc3RydWN0b3IoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwLHN0eWxlPzogU3R5bGUpe1xuLy8gICAgICAgICBzdXBlcihlbClcbi8vICAgICAgICAgaWYoc3R5bGUpXG4vLyAgICAgICAgIHtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBzdHlsZTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbi8vICAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbi8vICAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuLy8gICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG4vLyAgICAgfVxuLy8gfSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBBcmNTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGFuZ19mOiBudW1iZXIsXG4gICAgYW5nX2U6IG51bWJlclxufVxuXG5pbnRlcmZhY2UgQXJjT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEFyY1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIEFyYyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiYXJjXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogQXJjT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBBcmN7XG4gICAgbGV0IHN0ID0gYXJjLnN0eWxlXG4gICAgaWYoc3QuZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHN0LmZpbGwgPT09ICdub25lJyB8fCBzdC5maWxsID09PSAnI2ZmZicpXG4gICAge1xuICAgICAgICBtYWtlRnJhbWVBcmMoYXJjLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG1ha2VGaWxsQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICByZXR1cm4gYXJjO1xufVxuXG5mdW5jdGlvbiBtYWtlRnJhbWVBcmMoYXJjOiBBcmMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGFyYy5zaGFwZVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBqdWRnZVRSUyhhcmMpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIG1ha2VGaWxsQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZiksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19mKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueCtzaC5yKk1hdGguY29zKHNoLmFuZ19lKSxzaC55K3NoLnIqTWF0aC5zaW4oc2guYW5nX2UpKTtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBcIiNmZmZcIlxuICAgIGN0eC5zdHJva2UoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2gucixzaC5hbmdfZixzaC5hbmdfZSk7XG4gICAganVkZ2VTdHlsZShhcmMsY3R4KTtcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lQXJjKGFyYzogQXJjLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBBcmN7XG4gICAgLy/nlLvnspfnur/lvKcgXG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG5cbiAgICAvLyBqdWRnZVN0eWxlX2V6c3koYXJjKVxuXG4gICAgbGV0IGFyYzAgPSBuZXcgQXJjKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGFyYy5zaGFwZS54LFxuICAgICAgICAgICAgeTogYXJjLnNoYXBlLnksXG4gICAgICAgICAgICByOiBhcmMuc2hhcGUucixcbiAgICAgICAgICAgIGFuZ19mOiBhcmMuc2hhcGUuYW5nX2YsXG4gICAgICAgICAgICBhbmdfZTogYXJjLnNoYXBlLmFuZ19lXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGFyYzBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxBcmMoYXJjOiBBcmMsZmlsbD86IHN0cmluZyk6IEFyY3tcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBFbGxpcHNlU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4PzogbnVtYmVyLFxuICAgIHk/OiBudW1iZXIsXG4gICAgcmE/OiBudW1iZXIsXG4gICAgcmI/OiBudW1iZXJcbiAgICAvL3Jh5Li65qiq5Y2K6L206ZW/IHJi5Li657q15Y2K6L206ZW/XG59XG5cbmludGVyZmFjZSBFbGxpcHNlT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEVsbGlwc2VTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBFbGxpcHNlIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJlbGxpcHNlXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogRWxsaXBzZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlRWxsaXBzZShlbGxpcHNlOiBFbGxpcHNlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogRWxsaXBzZXtcbiAgICAvL21heOaYr+etieS6jjHpmaTku6Xplb/ovbTlgLzvvIzljbNh5ZKMYuS4reeahOi+g+Wkp+iAhVxuICAgIC8vaeavj+asoeW+queOr+WinuWKoDEvbWF477yM6KGo56S65bqm5pWw55qE5aKe5YqgXG4gICAgLy/ov5nmoLflj6/ku6Xkvb/lvpfmr4/mrKHlvqrnjq/miYDnu5jliLbnmoTot6/lvoTvvIjlvKfnur/vvInmjqXov5Ex5YOP57SgXG4gICAgbGV0IHNoID0gZWxsaXBzZS5zaGFwZVxuICAgIGxldCBzdGVwID0gKHNoLnJhID4gc2gucmIpID8gMSAvIHNoLnJhIDogMSAvIHNoLnJiO1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAganVkZ2VUUlMoZWxsaXBzZSk7XG4gICAgY3R4Lm1vdmVUbyhzaC54ICsgc2gucmEsIHNoLnkpOyAvL+S7juakreWchueahOW3puerr+eCueW8gOWni+e7mOWItlxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMiAqIE1hdGguUEk7IGkgKz0gc3RlcClcbiAgICB7XG4gICAgICAgIC8v5Y+C5pWw5pa556iL5Li6eCA9IGEgKiBjb3MoaSksIHkgPSBiICogc2luKGkp77yMXG4gICAgICAgIC8v5Y+C5pWw5Li6ae+8jOihqOekuuW6puaVsO+8iOW8p+W6pu+8iVxuICAgICAgICBjdHgubGluZVRvKHNoLnggKyBzaC5yYSAqIE1hdGguY29zKGkpLCBzaC55ICsgc2gucmIgKiBNYXRoLnNpbihpKSk7XG4gICAgfVxuICAgIGp1ZGdlU3R5bGUoZWxsaXBzZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGVsbGlwc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxPdmFsKGVsbGlwc2U6IEVsbGlwc2UsZmlsbD86IHN0cmluZyk6IEVsbGlwc2V7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IGVsbGlwc2UwID0gbmV3IEVsbGlwc2Uoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZWxsaXBzZS5zaGFwZS54LFxuICAgICAgICAgICAgeTogZWxsaXBzZS5zaGFwZS55LFxuICAgICAgICAgICAgcmE6IGVsbGlwc2Uuc2hhcGUucmEsXG4gICAgICAgICAgICByYjogZWxsaXBzZS5zaGFwZS5yYlxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZWxsaXBzZTBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGxpbmVXaWR0aD86IG51bWJlcixzdHJva2U/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBQb2x5Z29uU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xuICAgIHhBOiBudW1iZXJbXVxuICAgIHlBOiBudW1iZXJbXVxufVxuXG5pbnRlcmZhY2UgUG9seWdvbk9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBQb2x5Z29uU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgUG9seWdvbiBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwicG9seWdvblwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFBvbHlnb25PcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVBvbHlnb24ocG9seWdvbjogUG9seWdvbixjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFBvbHlnb257XG4gICAgbGV0IHNoID0gcG9seWdvbi5zaGFwZVxuICAgIGxldCBudW0gPSAwO1xuICAgIGlmKHNoLnhBLmxlbmd0aCAhPT0gc2gueUEubGVuZ3RoKVxuICAgIHtcbiAgICAgICAgbnVtID0gTWF0aC5taW4oc2gueEEubGVuZ3RoLHNoLnlBLmxlbmd0aClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgbnVtID0gc2gueEEubGVuZ3RoXG4gICAgfVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyBqdWRnZVRSUyhwb2x5Z29uKSBcbiAgICBjdHgubW92ZVRvKHNoLnhBWzBdLHNoLnlBWzBdKVxuICAgIGZvcihsZXQgaSA9IDE7aSA8IG51bTtpKyspXG4gICAge1xuICAgICAgICBjdHgubGluZVRvKHNoLnhBW2ldLHNoLnlBW2ldKVxuICAgIH1cbiAgICBjdHgubGluZVRvKHNoLnhBWzBdLHNoLnlBWzBdKVxuICAgIGp1ZGdlU3R5bGUocG9seWdvbixjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBwb2x5Z29uXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZVBvbHkocG9seWdvbjogUG9seWdvbixsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogUG9seWdvbntcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcG9seWdvbjAgPSBuZXcgUG9seWdvbih7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4QTogcG9seWdvbi5zaGFwZS54QSxcbiAgICAgICAgICAgIHlBOiBwb2x5Z29uLnNoYXBlLnlBLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcG9seWdvbjBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZpbGxQb2x5KHBvbHlnb246IFBvbHlnb24sZmlsbD86IHN0cmluZyk6IFBvbHlnb257XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBvbHlnb24wXG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGp1ZGdlU3R5bGVfdGV4dCwganVkZ2VUZXh0U3R5bGUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBUZXh0U2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICAvL+mhuuaXtumSiOWhq+WGmeWdkOagh+aIlumhuue7mOWItui3r+e6v+Whq+WGmeWdkOagh1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIHRleHQ6IHN0cmluZ1xuICAgIG1heFdpZHRoPzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBUZXh0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IFRleHRTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbiAgICB0ZXh0TGluZT86IFRleHRMaW5lXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGV4dExpbmV7XG4gICAgdGV4dEE6IENhbnZhc1RleHRBbGlnblxuICAgIHRleHRCOiBDYW52YXNUZXh0QmFzZWxpbmVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBUZXh0cyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwidGV4dFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IFRleHRPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYob3B0cy50ZXh0TGluZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50ZXh0TGluZSA9IG9wdHMudGV4dExpbmU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMudGV4dExpbmUgPSB7XG4gICAgICAgICAgICAgICAgdGV4dEE6ICdzdGFydCcsXG4gICAgICAgICAgICAgICAgdGV4dEI6ICdhbHBoYWJldGljJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG4gICAgc2V0VGV4dExpbmUodGV4dExpbmU6IFRleHRMaW5lKXtcbiAgICAgICAgaWYodGV4dExpbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRBKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dExpbmUudGV4dEIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlVGV4dCh0ZXh0OiBUZXh0cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFRleHRze1xuXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuXG4gICAgLy8ganVkZ2VUUlModGV4dClcbiAgICBjdHgudGV4dEFsaWduID0gdGV4dC50ZXh0TGluZS50ZXh0QVxuICAgIGN0eC50ZXh0QmFzZWxpbmUgPSB0ZXh0LnRleHRMaW5lLnRleHRCXG5cbiAgICBqdWRnZVRleHRTdHlsZSh0ZXh0LGN0eClcblxuICAgIGp1ZGdlU3R5bGVfdGV4dCh0ZXh0LGN0eClcbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENhdFN0cihzdHJBOiBzdHJpbmdbXSk6IHN0cmluZ3tcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgZm9yKGxldCBpID0gMDtpIDwgc3RyQS5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dCArPSBzdHJBW2ldO1xuICAgIH1cbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gU3RyUGFkKHN0cjogc3RyaW5nLHN0cjA6IHN0cmluZyxudW0/OiBudW1iZXIpOiBzdHJpbmd7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIFxuICAgIGlmKG51bSA9PT0gdW5kZWZpbmVkIHx8IG51bSA9PT0gMClcbiAgICB7XG4gICAgICAgIG51bSA9IDE7XG4gICAgfVxuXG4gICAgZm9yKGxldCBpPTA7aTxudW07aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dCArPSBzdHIwXG4gICAgfVxuICAgIHRleHQgKz0gc3RyXG5cbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gc3RyZXEoc3RyMDogc3RyaW5nLHN0cjE6IHN0cmluZyk6IGJvb2xlYW57XG4gICAgbGV0IHJlc3VsdCA9IGZhbHNlXG4gICAgcmVzdWx0ID0gc3RyMC5pbmNsdWRlcyhzdHIxKTtcbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZXBsYWNlKHN0cjogc3RyaW5nLHN0cl9vOiBzdHJpbmcsc3RyX3I6IHN0cmluZyk6c3RyaW5ne1xuICAgIGxldCByZXN1bHQgPSAnJ1xuXG4gICAgcmVzdWx0ID0gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJfbywnZycpLHN0cl9yKTtcblxuICAgIHJldHVybiByZXN1bHRcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZUltYWdlU2hhcGUsIGp1ZGdlU3R5bGUsanVkZ2VJbWFnZVNoYXBlX3RydWUsIGp1ZGdlVFJTIH0gZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cbmludGVyZmFjZSBJbWdTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIGltZzogc3RyaW5nXG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgd2lkdGg/OiBudW1iZXJcbiAgICBoZWlnaHQ/OiBudW1iZXJcbiAgICBzeD86IG51bWJlclxuICAgIHN5PzogbnVtYmVyXG4gICAgc3dpZHRoPzogbnVtYmVyXG4gICAgc2hlaWdodD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgSW1nT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEltZ1NoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxuICAgIEltZz86IGFueVxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmNsYXNzIFJHQkEge1xuICAgIFI6IG51bWJlclxuICAgIEc6IG51bWJlclxuICAgIEI6IG51bWJlclxuICAgIEE6IG51bWJlclxufVxuXG5jbGFzcyBSR0JBX0FycmF5e1xuICAgIFJHQkFfTGlzdDogUkdCQVtdXG4gICAgd2lkdGg6IG51bWJlclxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBjbGFzcyBJbWcgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImltZ1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIEltZz86IGFueVxuICAgIEltZ0RhdGE/OiBJbWFnZURhdGFcbiAgICBJc0NoYW5nZT86IGJvb2xlYW5cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBJbWdPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgaWYob3B0cy5JbWcgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IEkgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgSS5zcmMgPSBvcHRzLnNoYXBlLmltZ1xuICAgICAgICAgICAgSS5jcm9zc09yaWdpbiA9ICcnOyBcbiAgICAgICAgICAgIHRoaXMuSW1nID0gSTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xuICAgICAgICAvLyAgICAgdGV4dHVyZTogW10sXG4gICAgICAgIC8vICAgICB3aWR0aDogMCxcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmKG9wdHMuSW1nRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcbiAgICAgICAgLy8gfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3ggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zd2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zd2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUud2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcblxuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLkltZ0RhdGEpXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICAvLyBpZihvcHRzLnN0eWxlKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxuICAgICAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjLndpZHRoID0gc2NyZWVuLmF2YWlsV2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICAgICAgICBjdHguZHJhd0ltYWdlKHRoYXQuSW1nLHNoLngsc2gueSlcbiAgICAgICAgdGhhdC5JbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YShzaC54LHNoLnksdGhhdC5JbWcud2lkdGgsdGhhdC5JbWcuaGVpZ2h0KTtcbiAgICAgICAgXG4gICAgICAgIC8vIHRoaXMubWFrZVRleHR1cmVzKClcbiAgICB9XG4gICAgdG9HcmF5KCl7XG4gICAgICAgIGxldCBpbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgaW1nOiB0aGlzLnNoYXBlLmltZyxcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnNoYXBlLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5zaGFwZS55LFxuICAgICAgICAgICAgICAgIHdpZHRoOiB0aGlzLnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy5zaGFwZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3g6IHRoaXMuc2hhcGUuc3gsXG4gICAgICAgICAgICAgICAgc3k6IHRoaXMuc2hhcGUuc3ksXG4gICAgICAgICAgICAgICAgc3dpZHRoOiB0aGlzLnNoYXBlLnN3aWR0aCxcbiAgICAgICAgICAgICAgICBzaGVpZ2h0OiB0aGlzLnNoYXBlLnNoZWlnaHQsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIHRoaXMuSXNDaGFuZ2UgPSB0cnVlXG4gICAgICAgIGltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICAgICAgbGV0IGcgPSAwXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZyA9IE1hdGguZmxvb3IodGhpcy5JbWdEYXRhLmRhdGFbNCppKzBdICogMC4yOTkgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMV0gKiAwLjU4NyArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsyXSAqIDAuMTE0KTtcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsyXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzNdID0gdGhpcy5JbWdEYXRhLmRhdGFbNCppKzNdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG4gICAgcmVwbGFjZSgpe1xuICAgICAgICB0aGlzLklzQ2hhbmdlID0gZmFsc2VcbiAgICAgICAgdGhpcy5pbml0KClcbiAgICB9XG4gICAgbWFrZVRleHR1cmVzKCl7XG4gICAgICAgIC8vIHRoaXMudGV4dHVyZXMgPSBuZXcgVGV4dHVyZXModGhpcyk7XG4gICAgICAgIGxldCBpbWcgPSB0aGlzLnRvR3JheSgpO1xuICAgICAgICBsZXQgZGF0YTAgPSBpbWcuSW1nRGF0YS5kYXRhO1xuICAgICAgICBsZXQgYSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBhcnIgPSAnJ1xuICAgICAgICBsZXQgbnVtQXJyOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBsZXQgbnVtQXJyMDogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgLy8gbGV0IGRhdGEgPSB0aGlzLkltZ0RhdGEuZGF0YVxuICAgICAgICBsZXQgdyA9IHRoaXMuSW1nRGF0YS53aWR0aFxuICAgICAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgICAgICAvLyBjb25zb2xlLmRpcihkYXRhKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhMC5sZW5ndGgvNDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IDM7dCsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgayA9IDA7ayA8IDM7aysrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZGF0YTBbNCppXSA8PSBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gfHwgZGF0YTBbNCooaSsodC0xKSp3K2stMSldID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDFcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZigzKnQrayAhPT0gNClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyICs9IGFbMyp0K2tdLnRvU3RyaW5nKCk7IFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKChpKyh0LTEpKncray0xKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBudW1BcnJbaV0gPSBwYXJzZUludChhcnIsMilcbiAgICAgICAgICAgIGFyciA9ICcnXG4gICAgICAgIH1cbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbnVtQXJyLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzBdPW51bUFycltpXVxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMV09bnVtQXJyW2ldXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsyXT1udW1BcnJbaV1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VJbWcoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBJbWd7XG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGp1ZGdlVFJTKGltZylcbiAgICBpZihpbWcuSXNDaGFuZ2UgPT09IGZhbHNlKVxuICAgIHtcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlKGltZyxjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBqdWRnZUltYWdlU2hhcGVfdHJ1ZShpbWcsY3R4KTtcbiAgICB9XG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBpbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGltUmVhZChpbWc6IEltZyk6IEltYWdlRGF0YXsgICAgICAgICAvL+ivu+WPluWbvueJh+efqemYtVxuICAgIHJldHVybiBpbWcuSW1nRGF0YTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFVucGFja0NvbG9ySW1hZ2UoaW1nOiBJbWcpOiBSR0JBX0FycmF5e1xuICAgIGxldCByZ2JhID0gbmV3IEFycmF5KClcbiAgICBsZXQgZGF0YSA9IGltZy5JbWdEYXRhLmRhdGFcbiAgICBcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBkYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIHJnYmFbaV0gPSBuZXcgUkdCQSgpXG4gICAgICAgIFxuICAgICAgICByZ2JhW2ldLlIgPSBkYXRhWzQqaSswXVxuICAgICAgICByZ2JhW2ldLkcgPSBkYXRhWzQqaSsxXVxuICAgICAgICByZ2JhW2ldLkIgPSBkYXRhWzQqaSsyXVxuICAgICAgICByZ2JhW2ldLkEgPSBkYXRhWzQqaSszXVxuXG4gICAgfVxuXG4gICAgbGV0IHJnYmFfYXJyID0gbmV3IFJHQkFfQXJyYXkoKVxuICAgIHJnYmFfYXJyLlJHQkFfTGlzdCA9IHJnYmE7XG4gICAgcmdiYV9hcnIud2lkdGggPSBpbWcuSW1nRGF0YS53aWR0aFxuICAgIHJnYmFfYXJyLmhlaWdodCA9IGltZy5JbWdEYXRhLmhlaWdodFxuXG4gICAgcmV0dXJuIHJnYmFfYXJyXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQYWNrQ29sb3JJbWFnZShyZ2JhX2FycjogUkdCQV9BcnJheSk6IEltYWdlRGF0YXtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuXG4gICAgbGV0IGltZ2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHJnYmFfYXJyLndpZHRoLHJnYmFfYXJyLmhlaWdodCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmdiYV9hcnIuUkdCQV9MaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzBdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLlJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsxXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5HXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMl0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQlxuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzNdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkFcbiAgICB9XG4gICAgcmV0dXJuIGltZ2RhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZUluKGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxuICAgIHtcbiAgICAgICAgYWxwaGFJbiA9IDE7XG4gICAgfVxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gYWxwaGFJblxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZU91dChpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAwO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9ICgxIC0gYWxwaGFJbilcbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbWdJbml0KGltZzogSW1nW118R3JvdXApe1xuICAgIGxldCBJO1xuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBJID0gaW1nXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBJLmdyb3VwTGlzdFtpXS5pbml0KClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBQcmVsb2FkVGV4dHVyZXMoaW1nOiBJbWcpOiBJbWd7XG4gICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZShpbWc6IEltZyk6IEltZ3tcbiAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdUZXh0dXJlcyhpbWc6IEltZ1tdfEdyb3VwKTogR3JvdXB7XG4gICAgbGV0IEk7XG4gICAgbGV0IHRleHR1cmU6IEltZ1tdID0gW11cbiAgICBsZXQgVDtcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgSSA9IGltZ1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgdGV4dHVyZVtpXSA9IERyYXdUZXh0dXJlKEkuZ3JvdXBMaXN0W2ldKVxuICAgIH1cbiAgICBUID0gbmV3IEdyb3VwKHRleHR1cmUpXG4gICAgcmV0dXJuIFQ7XG59IiwiXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFt4MCx5MCx4MSx5MV06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLG51bTogbnVtYmVyLHM6IG51bWJlcik6IENhbnZhc0dyYWRpZW50e1xuICAgIGxldCBmaWxsID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHgwLHkwLXMseDEseTEtcylcbiAgICBmaWxsLmFkZENvbG9yU3RvcCgwLCcjZmZmJylcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAgICAgaWYoaSUyID09PSAxKXtcbiAgICAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCcjMDAwJylcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJyNmZmYnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbGwuYWRkQ29sb3JTdG9wKDEsJyNmZmYnKVxuICAgIHJldHVybiBmaWxsXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUsIG5hbWVTdHlsZSwgT3B0cywgU2hhcGUsIFN0eWxlIH0gZnJvbSBcIi4uL2V6cHN5XCI7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQsIGp1ZGdlU3R5bGUgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQgfSBmcm9tIFwiLi4vR3JhZGllbnQvZ3JhZGllbnRcIjtcblxuaW50ZXJmYWNlIEdyYXRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGRlc2l0eTogbnVtYmVyIC8v5a+G6ZuG5bqmXG59XG5cbmludGVyZmFjZSBHcmF0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEdyYXRTaGFwZSxcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBHcmF0IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJncmF0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogR3JhdE9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIGlmKCFvcHRzLnNoYXBlLmRlc2l0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgb3B0cy5zaGFwZS5kZXNpdHkgPSAzNVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueSszKnNoLnJdLHNoLmRlc2l0eSwwKSxcbiAgICAgICAgICAgIHN0cm9rZTogJ25vbmUnLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYob3B0cy5zdHlsZSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgIC8vICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgIC8vICAgICAgICAgc3Ryb2tlOiBcIm5vbmVcIixcbiAgICAgICAgLy8gICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpXG4gICAge1xuICAgICAgICBpZighZGVsYXkpe1xuICAgICAgICAgICAgZGVsYXkgPSA2XG4gICAgICAgICAgICBpZighc3BlZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB0aGlzLmFuaW1hdGUoKCk9PntcbiAgICAgICAgICAgIHRoYXQuc3R5bGUuZmlsbCA9IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHgsW3gwLHkwLHgxLHkxXSx0aGF0LnNoYXBlLmRlc2l0eSxpbmRleCppKTtcbiAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQpXG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sZGVsYXkpXG4gICAgfVxuICAgIC8vIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpe1xuICAgIC8vICAgICBpZighZGVsYXkpe1xuICAgIC8vICAgICAgICAgZGVsYXkgPSA4XG4gICAgLy8gICAgICAgICBpZighc3BlZWQpXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAvLyAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgLy8gICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvLyAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFt4MCx5MCx4MSx5MV0sdGhhdC5zaGFwZS5kZXNpdHksaW5kZXgqaSk7XG4gICAgLy8gICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIHVwZGF0ZUdyYXQodGhhdCxjdHgsZmlsbClcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihpKVxuICAgIC8vICAgICAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZShkZWxheSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkoKVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gcGxheShzcGVlZD86IG51bWJlcixkZWxheT86IG51bWJlcil7XG4gICAgLy8gICAgIGlmKCFkZWxheSl7XG4gICAgLy8gICAgICAgICBkZWxheSA9IDhcbiAgICAvLyAgICAgICAgIGlmKCFzcGVlZClcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcGVlZCA9IDhcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgLy8gY29uc29sZS5kaXIoJ2EnKVxuICAgIC8vICAgICAvLyBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgLy8gICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgIC8vICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDtpID4gLTE7aSsrKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBpID0gMFxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB1cGRhdGVHcmF0MCh0aGF0LGN0eCxpbmRleCppKVxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGkpXG4gICAgLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoZGVsYXkpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pKClcbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlR3JhdChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogR3JhdHtcbiAgICBsZXQgc2ggPSBncmF0LnNoYXBlO1xuICAgIC8vIGNvbnNvbGUuZGlyKHNoKVxuICAgIC8vIGxldCBudW0gPSBzaC5kZXNpdHk7XG4gICAgLy8gbGV0IGZpbGwgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueStzaC5yKVxuICAgIC8vIGZpbGwuYWRkQ29sb3JTdG9wKDAsJ3doaXRlJylcbiAgICAvLyBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAvLyAgICAgaWYoaSUyID09PSAxKXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCdibGFjaycpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCd3aGl0ZScpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZmlsbC5hZGRDb2xvclN0b3AoMSwnd2hpdGUnKVxuICAgIC8vIGxldCBmaWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueSszKnNoLnJdLG51bSwwKVxuICAgIC8vIGxldCBjID0gY3R4LmNhbnZhc1xuICAgIC8vIGMuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgLy8gZ3JhdC5zdHlsZS5maWxsID0gZmlsbFxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBlekp1ZGdlLmp1ZGdlVFJTKGdyYXQpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSlcbiAgICAvLyBjdHgucmVjdChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngrc2gucixzaC55KzMqc2gucilcbiAgICBqdWRnZVN0eWxlKGdyYXQsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyBjdHguc2F2ZSgpXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgIC8vIGN0eC5yZWN0KHNoLngtc2gucixzaC55LXNoLnIsc2gueCtzaC5yLHNoLnkrMipzaC5yKTtcbiAgICAvLyBqdWRnZVN0eWxlKGdyYXQsY3R4KTtcbiAgICAvLyBjdHguY2xvc2VQYXRoKClcbiAgICAvLyBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWluJ1xuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snXG4gICAgLy8gY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSk7XG4gICAgLy8gY3R4LmZpbGwoKVxuICAgIC8vIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAvLyBjdHgucmVzdG9yZSgpXG4gICAgXG4gICAgcmV0dXJuIGdyYXQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxmaWxsOiBDYW52YXNHcmFkaWVudCl7XG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGdyYXQuc3R5bGUuZmlsbCA9IGZpbGxcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKGdyYXQuc2hhcGUueCxncmF0LnNoYXBlLnksZ3JhdC5zaGFwZS5yLDAsMipNYXRoLlBJKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQwKGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsbnVtOiBudW1iZXIpe1xuICAgIC8vIGNvbnNvbGUuZGlyKGdyYXQpXG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgudHJhbnNsYXRlKDAsLW51bSlcbiAgICBjdHgucmVjdChncmF0LnNoYXBlLngtZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueS1ncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS54K2dyYXQuc2hhcGUucixncmF0LnNoYXBlLnkrMypncmF0LnNoYXBlLnIpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUsIG5hbWVTdHlsZSwgT3B0cywgU2hhcGUsIFN0eWxlIH0gZnJvbSBcIi4uL2V6cHN5XCI7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQsIGp1ZGdlU3R5bGUgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQgfSBmcm9tIFwiLi4vR3JhZGllbnQvZ3JhZGllbnRcIjtcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSBcInpyZW5kZXJcIjtcbmltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tIFwienJlbmRlci9saWIvc3ZnL2NvcmVcIjtcblxuXG5pbnRlcmZhY2UgR3JhdFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgcGl4ZWxzUGVyRGVncmVlPzogbnVtYmVyLCBcbiAgICBzcGF0aWFsRnJlcXVlbmN5PzogbnVtYmVyLFxuICAgIGFuZ2xlPzogbnVtYmVyLCBcbiAgICBjb250cmFzdD86IG51bWJlciwgXG4gICAgcGhhc2U/OiBudW1iZXIsXG4gICAgbGV2ZWw/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcmF0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEdyYXRTaGFwZSxcbiAgICBzdHlsZT86IFN0eWxlLFxuICAgIGlzTm9pc2U/OiBib29sZWFuXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG4vL+WFieaghVxuLy9waXhlbHNQZXJEZWdyZWU9NTcsIHNwYXRpYWxGcmVxdWVuY3k9MSDlr7nlupTkuIDluqbop4bop5JcbmV4cG9ydCBjbGFzcyBzaW5HcmF0IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJzaW5ncmF0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgc2luR3JhdDogSW1hZ2VEYXRhOyAgICAgICAgLy/lhYnmoIXlm77niYfmlbDmja5cbiAgICBpbWdEYXRhTGlzdDogQXJyYXk8SW1hZ2VEYXRhPjsgICAgLy/nlKjkuo7lgqjlrZjlj4LkuI7liqjnlLvnmoTlm77niYdcbiAgICBpc05vaXNlOiBib29sZWFuO1xuICAgIC8vIHNpbmdyYXRQYXJhbTsgICAvL+eUqOS6juWCqOWtmCDlt6bkuIrop5LlnZDmoIcsIOWNiuW+hCwgcGl4ZWxzUGVyRGVncmVlLCBzcGF0aWFsRnJlcXVlbmN5LCDop5LluqYsIOWvueavlOW6piwg55u45L2N562J5L+h5oGvXG4gICAgLy8gbGV2ZWw7ICAgICAgICAgIC8v5Zmq5aOw562J57qnKOatpOexu+Wei+m7mOiupOS4ujApXG4gICAgY29uc3RydWN0b3Iob3B0czogR3JhdE9wdHMpe1xuICAgICAgICAvL3gseeS4uuWFieagheeahOW3puS4iuinkuWdkOaghywg5Y2K5b6ELCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIOinkuW6piwg5a+55q+U5bqmLCDnm7jkvY1cbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGU7XG4gICAgICAgIGlmKCFvcHRzLmlzTm9pc2UpXG4gICAgICAgICAgICB0aGlzLmlzTm9pc2UgPSBmYWxzZVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmlzTm9pc2UgPSBvcHRzLmlzTm9pc2VcbiAgICAgICAgXG4gICAgICAgIGlmKCF0aGlzLmlzTm9pc2UpXG4gICAgICAgICAgICB0aGlzLnNpbkdyYXQgPSBnZXRTaW5ncmF0KHNoLnIsIHNoLnBpeGVsc1BlckRlZ3JlZSwgc2guc3BhdGlhbEZyZXF1ZW5jeSwgc2guYW5nbGUsIHNoLmNvbnRyYXN0LCBzaC5waGFzZSlcbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGlmKCFzaC5sZXZlbClcbiAgICAgICAgICAgICAgICBzaC5sZXZlbCA9IDFcbiAgICAgICAgICAgIHRoaXMuc2luR3JhdCA9IGdldE5vaXNlU2luZ3JhdChzaC5yLCBzaC5waXhlbHNQZXJEZWdyZWUsIHNoLnNwYXRpYWxGcmVxdWVuY3ksIHNoLmFuZ2xlLCBzaC5jb250cmFzdCwgc2gucGhhc2UsIHNoLmxldmVsKSAgICBcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmltZ0RhdGFMaXN0ID0gbmV3IEFycmF5PEltYWdlRGF0YT4oKTtcbiAgICB9XG4gICAgLy/nu5jliLbmlrnms5UsIOWPguaVsGN0eOS4umNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgZHJhdygpe1xuICAgICAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEodGhpcy5zaW5HcmF0LHRoaXMuc2hhcGUueCx0aGlzLnNoYXBlLnkpXG4gICAgfVxuICAgIC8v57uZ5Y6f5pyJ5YWJ5qCF5Yqg5LiK5Zmq5aOwLCDlj4LmlbBsZXZlbOS4uuWZquWjsOetiee6p1xuICAgIGltTm9pc2UobGV2ZWwpe1xuICAgICAgICBsZXQgdGggPSB0aGlzLnNoYXBlXG4gICAgICAgIHRoaXMuaXNOb2lzZSA9IHRydWVcbiAgICAgICAgdGhpcy5zaW5HcmF0ID0gZ2V0Tm9pc2VTaW5ncmF0KHRoLnIsIHRoLnBpeGVsc1BlckRlZ3JlZSwgdGguc3BhdGlhbEZyZXF1ZW5jeSwgdGguYW5nbGUsIHRoLmNvbnRyYXN0LCB0aC5waGFzZSwgbGV2ZWwpXG4gICAgICAgIHRoLmxldmVsID0gbGV2ZWw7XG4gICAgfVxuICAgIC8v6L+Q5Yqo5pa55rOVLCDlj4LmlbBjdHjkuLpjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSDlj4LmlbBjeWNsZeS4uuavj+enkui/kOihjOWFieagheeahOWRqOacn+aVsCjpu5jorqTkuLoxKVxuICAgIHBsYXkoY3ljbGUpe1xuICAgICAgICBpZighY3ljbGUpXG4gICAgICAgICAgICBjeWNsZSA9IDE7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgbnVtID0gTWF0aC5mbG9vcig2MC9jeWNsZSk7XG4gICAgICAgIGxldCB0aCA9IHRoaXMuc2hhcGVcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbnVtO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGhpcy5pc05vaXNlKVxuICAgICAgICAgICAgICAgIHRoaXMuaW1nRGF0YUxpc3QucHVzaChnZXROb2lzZVNpbmdyYXQodGguciwgdGgucGl4ZWxzUGVyRGVncmVlLCB0aC5zcGF0aWFsRnJlcXVlbmN5LCB0aC5hbmdsZSwgdGguY29udHJhc3QsIHRoLnBoYXNlKzIqaSpNYXRoLlBJL251bSwgdGhpcy5zaGFwZS5sZXZlbCkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdEYXRhTGlzdC5wdXNoKGdldFNpbmdyYXQodGguciwgdGgucGl4ZWxzUGVyRGVncmVlLCB0aC5zcGF0aWFsRnJlcXVlbmN5LCB0aC5hbmdsZSwgdGguY29udHJhc3QsIHRoLnBoYXNlKzIqaSpNYXRoLlBJL251bSkpXG4gICAgICAgIH1cbiAgICAgICAgLy/lvILmraXlh73mlbBcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaSA9IGklbnVtO1xuICAgICAgICAgICAgICAgIGN0eC5wdXRJbWFnZURhdGEodGhhdC5pbWdEYXRhTGlzdFtpXSx0aGF0LnNoYXBlLngsdGhhdC5zaGFwZS55KVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQuc3RvcmFnZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxKTtcbiAgICAgICAgICAgICAgICB0aGF0LmNsZWFyKGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKSAgICBcbiAgICB9XG4gICAgLy/muIXpmaTlhYnmoIXmiYDlnKjkvY3nva7nmoTnn6nlvaLljLrln59cbiAgICBjbGVhcihjdHgpXG4gICAge1xuICAgICAgICBsZXQgd2lkdGggPSAyKnRoaXMuc2hhcGUucisxXG4gICAgICAgIGxldCBoZWlnaHQgPSAyKnRoaXMuc2hhcGUucisxXG4gICAgICAgIGN0eC5jbGVhclJlY3QodGhpcy5zaGFwZS54LHRoaXMuc2hhcGUueSx3aWR0aCxoZWlnaHQpO1xuICAgIH1cbn1cblxuLy/nlJ/miJDlmarlo7DlhYnmoIUsIOWPguaVsDog5Y2K5b6ELCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIOinkuW6piwg5a+55q+U5bqmLCDnm7jkvY0sIOWZquWjsOetiee6p1xuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIGdldE5vaXNlU2luZ3JhdChyYWRpdXMsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSwgbGV2ZWwpXG57XG4gICAgaWYobGV2ZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgbGV2ZWwgPSAxO1xuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgbGV0IHcgPSAyICogTWF0aC5QSSAqIHNwYXRpYWxGcmVxdWVuY3kgLyBwaXhlbHNQZXJEZWdyZWU7XG4gICAgbGV0IGEgPSBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApICogdztcbiAgICBsZXQgYiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBwYXJhbSA9IG5ldyBBcnJheSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJhbVtpXSA9IDAuNSArIDAuNSAqIG1hc2tbaV0gKiBjb250cmFzdCAqIE1hdGguc2luKGEgKiB4W2ldICsgYiAqIHlbaV0gKyBwaGFzZSk7XG4gICAgfVxuICAgIGxldCBub2lzZSA9IGdldE5vaXNlKHJhZGl1cyk7XG4gICAgbGV0IG5vaXNlU2luR3JhdCA9IEdyYXRBZGROb2lzZShwYXJhbSxub2lzZSxyYWRpdXMsbGV2ZWwpO1xuICAgIHJldHVybiBub2lzZVNpbkdyYXQ7XG59XG5cbi8v5YWJ5qCF5Yqg5Zmq5aOwLCDlj4LmlbA6IOWFieagheeBsOW6puS/oeaBrywg5Zmq5aOw54Gw5bqm5L+h5oGvLCDljYrlvoQsIOWZquWjsOetiee6p1xuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIEdyYXRBZGROb2lzZShwYXJhbSxub2lzZSxyYWRpdXMsbGV2ZWwpe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgbGV0IE5vaXNlR3JhdERlZ3JlZSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IE0gPSAyKmltYWdlc2l6ZSsxO1xuICAgIGxldCBOb2lzZUdyYXQgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKE0sTSk7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgLy/nm7jliqBcbiAgICBmb3IoaSA9IDA7aSA8IE0qTTtpKyspe1xuICAgICAgICBpZihwYXJhbVtpXT4wLjUpXG4gICAgICAgICAgICBOb2lzZUdyYXREZWdyZWVbaV0gPSAwLjUrbGV2ZWwqbm9pc2VbaV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgTm9pc2VHcmF0RGVncmVlW2ldID0gKHBhcmFtW2ldK2xldmVsKm5vaXNlW2ldKVxuICAgICAgICAgICAgLy8gTm9pc2VHcmF0RGVncmVlW2ldID0gTm9pc2VHcmF0RGVncmVlW2ldKzAuNSptYXNrW2ldIFxuICAgIH1cbiAgICBmb3IgKGxldCBpPTAsaj0wO2k8Tm9pc2VHcmF0LmRhdGEubGVuZ3RoO2krPTQsaisrKVxuICAgIHtcbiAgICAgICAgTm9pc2VHcmF0LmRhdGFbaSswXT1Ob2lzZUdyYXREZWdyZWVbal0qMjU1O1xuICAgICAgICBOb2lzZUdyYXQuZGF0YVtpKzFdPU5vaXNlR3JhdERlZ3JlZVtqXSoyNTU7XG4gICAgICAgIE5vaXNlR3JhdC5kYXRhW2krMl09Tm9pc2VHcmF0RGVncmVlW2pdKjI1NTtcbiAgICAgICAgTm9pc2VHcmF0LmRhdGFbaSszXT0yNTU7XG4gICAgfVxuICAgIC8vIE5vaXNlR3JhdCA9IFRvQ2lyY2xlKE5vaXNlR3JhdCxyYWRpdXMpXG4gICAgcmV0dXJuIE5vaXNlR3JhdDtcbn1cblxuLy/nlJ/miJDlmarlo7Dlm77niYcsIOWPguaVsDog5Y2K5b6EXG4vL+i/lOWbnuWZquWjsOeBsOW6puaVsOe7hFxuZnVuY3Rpb24gZ2V0Tm9pc2UocmFkaXVzKXtcbiAgICBsZXQgbm9pc2UgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IG1hc2tCYW5kID0gMS41ICogcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gsIHldID0gbWVzaGdyaWQoaW1hZ2VzaXplKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgbWFzay5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IGdyZXlEZWdyZWUgPSBtYXNrW2ldKk1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSogMjU2KS8yNTU7XG4gICAgICAgIG5vaXNlLnB1c2goZ3JleURlZ3JlZSlcbiAgICB9XG4gICAgLy8gZm9yIChsZXQgaT0wO2kgPCA0KihpbWFnZXNpemUqMisxKSooaW1hZ2VzaXplKjIrMSk7aSs9NClcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBncmV5RGVncmVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKiAyNTYpOyBcbiAgICAvLyAgICAgbm9pc2UucHVzaChncmV5RGVncmVlLzI1NSk7XG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUuZGlyKG5vaXNlKVxuICAgIHJldHVybiBub2lzZTtcbn1cblxuLy/nlJ/miJDlhYnmoIUg5Y+C5pWwOiDljYrlvoQsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwg6KeS5bqmLCDlr7nmr5TluqYsIOebuOS9jVxuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIGdldFNpbmdyYXQocmFkaXVzLCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIGFuZ2xlLCBjb250cmFzdCwgcGhhc2UpIHtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IHcgPSAyICogTWF0aC5QSSAqIHNwYXRpYWxGcmVxdWVuY3kgLyBwaXhlbHNQZXJEZWdyZWU7XG4gICAgbGV0IGEgPSBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApICogdztcbiAgICBsZXQgYiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBwYXJhbSA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgeC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnBvdyh4W2ldLDIpK01hdGgucG93KHlbaV0sMik7XG4gICAgICAgIGxldCBuID0gTWF0aC5wb3cocmFkaXVzLDIpO1xuICAgICAgICBtYXNrLnB1c2goTWF0aC5leHAoLW0vbikpO1xuICAgICAgICBtYXNrW2ldICo9IE1hdGguRTtcbiAgICAgICAgaWYobWFza1tpXSA+PSAxKVxuICAgICAgICAgICAgbWFza1tpXSA9IDE7XG4gICAgfVxuICAgIC8vIGxldCBtYXNrU2hhZG93ID0gbWFzayhyYWRpdXMpO1xuICAgIC8vIGNvbnNvbGUuZGlyKG1hc2tTaGFkb3cpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmFtW2ldID0gMC41ICsgMC41ICogY29udHJhc3QgKiBtYXNrW2ldICogTWF0aC5zaW4oYSAqIHhbaV0gKyBiICogeVtpXSArIHBoYXNlKTtcbiAgICB9XG4gICAgLy8gbGV0IG1hc2tTaGFkb3cgPSBtYXNrKHJhZGl1cylcbiAgICAvLyBmb3IobGV0IClcbiAgICBsZXQgaW1nRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEoaW1hZ2VzaXplICogMiArIDEsIGltYWdlc2l6ZSAqIDIgKyAxKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCBpbWdEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQsIGorKykge1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDBdID0gcGFyYW1bal0gKiAyNTU7XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMV0gPSBwYXJhbVtqXSAqIDI1NTtcbiAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAyXSA9IHBhcmFtW2pdICogMjU1O1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDNdID0gMjU1O1xuICAgIH1cbiAgICAvLyBpbWdEYXRhID0gVG9DaXJjbGUoaW1nRGF0YSxyYWRpdXMvMilcbiAgICByZXR1cm4gaW1nRGF0YTtcbn1cblxuLy/lvIPnlKggICAgIOWwhuefqeW9ouWFieagheWItuaIkOWchuW9olxuZnVuY3Rpb24gVG9DaXJjbGUoaW1nRGF0YSxyYWRpdXMpe1xuICAgIC8vIGxldCBtID0gMDtcbiAgICAvLyBsZXQgUiA9IHJhZGl1cztcbiAgICAvLyBmb3IobGV0IHkgPSAwO3kgPCBpbWdEYXRhLmhlaWdodDt5KyspXG4gICAgLy8ge1xuICAgIC8vICAgICBmb3IobGV0IHggPSAwO3ggPCBpbWdEYXRhLndpZHRoO3grKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgbSA9IE1hdGguc3FydChNYXRoLnBvdyh4LXJhZGl1cywyKSArIE1hdGgucG93KHktcmFkaXVzLDIpKTtcbiAgICAvLyAgICAgICAgIGlmKG0gPj0gUilcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBpbWdEYXRhLmRhdGFbNCp5KmltZ0RhdGEud2lkdGgrNCp4KzNdID0gMDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nRGF0YSwwLDApXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1hdG9wJ1xuICAgIGN0eC5hcmMocmFkaXVzKzAuNSxyYWRpdXMrMC41LHJhZGl1cywwLDIqTWF0aC5QSSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgY3R4LmZpbGwoKVxuICAgIGltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCwyKnJhZGl1cysxLDIqcmFkaXVzKzEpXG5cbiAgICByZXR1cm4gaW1nRGF0YTtcbn1cblxuLy/nlJ/miJDkuozpmLbpq5jmlq/liIbluIMg5Y+C5pWwOiDljYrlvoRcbi8v6L+U5Zue5LqM6Zi25YiG5biD5YC855qE5pWw57uEXG5mdW5jdGlvbiBtYXNrKHJhZGl1cyl7XG4gICAgbGV0IG1hc2tCYW5kID0gcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gseV0gPSBtZXNoZ3JpZChpbWFnZXNpemUpO1xuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgeC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnBvdyh4W2ldLDIpK01hdGgucG93KHlbaV0sMik7XG4gICAgICAgIGxldCBuID0gTWF0aC5wb3cocmFkaXVzLDIpO1xuICAgICAgICBtYXNrLnB1c2goTWF0aC5leHAoLW0vbikpO1xuICAgICAgICBtYXNrW2ldICo9IE1hdGguRTtcbiAgICAgICAgaWYobWFza1tpXSA+PSAxKVxuICAgICAgICAgICAgbWFza1tpXSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBtYXNrO1xufVxuXG4vL+eUn+aIkOe9keagvOmHh+agt+eCuSDlj4LmlbA6IOWNiuW+hFxuLy/ov5Tlm554LCB55Lik5Liq6YeH5qC35pWw57uEXG5mdW5jdGlvbiBtZXNoZ3JpZChyYWRpdXMpIHtcbiAgICBsZXQgeCA9IG5ldyBBcnJheSgpO1xuICAgIGxldCB5ID0gbmV3IEFycmF5KCk7XG4gICAgZm9yIChsZXQgaSA9IC1yYWRpdXM7IGkgPD0gcmFkaXVzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IC1yYWRpdXM7IGogPD0gcmFkaXVzOyBqKyspIHtcbiAgICAgICAgICAgIHgucHVzaChpKTtcbiAgICAgICAgICAgIHkucHVzaChqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3gsIHldO1xufVxuIiwiaW1wb3J0IHtjYW52YXNTdHlsZX0gZnJvbSAnLi4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCB7IFJlY3RhbmdsZSxtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJyBcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IENpcmNsZSxtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXG5pbXBvcnQgeyBMaW5lLCBtYWtlTGluZX0gZnJvbSAnLi4vR3JhcGhpYy9saW5lJ1xuaW1wb3J0IHsgQXJjLCBtYWtlQXJjIH0gZnJvbSAnLi4vR3JhcGhpYy9hcmMnXG5pbXBvcnQgeyBFbGxpcHNlLCBtYWtlRWxsaXBzZSB9IGZyb20gJy4uL0dyYXBoaWMvZWxsaXBzZSdcbmltcG9ydCB7IG1ha2VQb2x5Z29uLCBQb2x5Z29uIH0gZnJvbSAnLi4vR3JhcGhpYy9wb2x5Z29uJ1xuaW1wb3J0IHsgbWFrZVRleHQsIFRleHRzIH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xuaW1wb3J0IHsgSW1nLCBtYWtlSW1nIH0gZnJvbSAnLi4vR3JhcGhpYy9pbWFnZSdcbmltcG9ydCB7IGNvbnRlbnRTdHlsZSB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuaW1wb3J0IHsgR3JhdCwgbWFrZUdyYXQgfSBmcm9tICcuLi9HcmFwaGljL2dyYXRpbmcnXG5cbmltcG9ydCAqIGFzIGV6U2luR3JhdCBmcm9tICcuLi9HcmFwaGljL3NpbkdyYXQnXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0IHsgRGxnQ29udGVudCB9IGZyb20gJy4uL2V6cHN5J1xuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKTpjYW52YXNTdHlsZXtcbiAgICBpZighY1N0eWxlKSBcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDQwMFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFjU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBjU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBjU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIHJldHVybiBjU3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZURpdlN0eWxlKGRTdHlsZTogRGl2U3R5bGUpOiBEaXZTdHlsZXtcbiAgICBpZighZFN0eWxlKSBcbiAgICB7XG4gICAgICAgIGRTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiA0MDAsXG4gICAgICAgICAgICBoZWlnaHQ6IDI2MCxcbiAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiAnMjBweCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighZFN0eWxlLndpZHRoKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLndpZHRoID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuaGVpZ2h0KVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmhlaWdodCA9IDQwMFxuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlcilcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXIgPSAnbm9uZSdcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5ib3JkZXJSYWRpdXMpXG4gICAge1xuICAgICAgICBkU3R5bGUuYm9yZGVyUmFkaXVzID0gJzVweCdcbiAgICB9XG4gICAgcmV0dXJuIGRTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ29udGVudFN0eWxlKGNTdHlsZTogY29udGVudFN0eWxlLHRpdGxlOiBzdHJpbmcsY29udGVudDogc3RyaW5nKTogY29udGVudFN0eWxle1xuICAgIGlmKCFjU3R5bGUpXG4gICAge1xuICAgICAgICBjU3R5bGUgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgYnRuU3RyOiBbJ09LJ10sXG4gICAgICAgICAgICBub0ljb246IGZhbHNlLFxuICAgICAgICAgICAgbm9JbnQ6IGZhbHNlLFxuICAgICAgICAgICAgY29uZmlybVBvc2l0aW9uOiAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS50aXRsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZS50aXRsZSA9IHRpdGxlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29udGVudClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5jb250ZW50ID0gY29udGVudFxuICAgIH1cbiAgICBpZighY1N0eWxlLmJ0blN0cil7XG4gICAgICAgIGNTdHlsZS5idG5TdHIgPSBbJ09LJ11cbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ljb24pXG4gICAge1xuICAgICAgICBjU3R5bGUubm9JY29uID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5ub0ludClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ludCA9IGZhbHNlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuY29uZmlybVBvc2l0aW9uKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDA7XG4gICAgfVxuICAgIGlmKGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDAgJiYgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMSAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAyKXtcbiAgICAgICAgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiA9IDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VNb2RlbChtb2RlbDogc3RyaW5nKTogW3N0cmluZyxzdHJpbmcsc3RyaW5nLHN0cmluZ117XG4gICAgaWYobW9kZWwgPT09ICdlcnJvcicpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiWFwiLCdyZWQnLCdFcnJvciBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2hlbHAnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnSGVscCBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBoZWxwIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAncXVlc3QnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIj9cIiwnZ3JleScsXCJRdXNldCBEaWFsb2d1ZVwiLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICd3YXJuJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCIhXCIsJ29yYW5nZScsJ1dhcm5pbmcgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgd2FybmluZyBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2lucHV0JylcbiAgICB7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJJbnB1dCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IGlucHV0IHN0cmluZ1wiXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnc2VsZWN0Jyl7XG4gICAgICAgIHJldHVybiBbJycsJycsXCJTZWxlY3QgRGlhbG9ndWVcIixcIlRoaXMgaXMgZGVmYXVsdCBzZWxlY3Qgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdmaWxlJyl7XG4gICAgICAgIHJldHVybiBbJycsJycsJ0ZpbGUgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZmlsZSBzdHJpbmcnXVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICByZXR1cm4gWyfvvZ4nLCdncmVlbicsJ0RhaWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGRhaWxvZ3VlIHN0cmluZyddXG4gICAgfVxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShzdHlsZTogU3R5bGUpe1xuLy8gICAgIGlmKCFzdHlsZSlcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRWxlbWVudChlbDogRWxlbWVudHN8R3JvdXB8RWxlbWVudHNbXSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgLy8gY29uc29sZS5kaXIoUmVjdGFuZ2xlKVxuICAgIC8vIGNvbnNvbGUuZGlyKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcbiAgICAgICAgbWFrZVJlY3RhbmdsZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlKVxuICAgIHtcbiAgICAgICAgbWFrZUNpcmNsZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgTGluZSlcbiAgICB7XG4gICAgICAgIG1ha2VMaW5lKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXG4gICAge1xuICAgICAgICBtYWtlQXJjKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgbWFrZUVsbGlwc2UoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICB7XG4gICAgICAgIG1ha2VQb2x5Z29uKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFRleHRzKVxuICAgIHtcbiAgICAgICAgbWFrZVRleHQoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyYXQpXG4gICAge1xuICAgICAgICBtYWtlR3JhdChlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgbWFrZUltZyhlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBlelNpbkdyYXQuc2luR3JhdClcbiAgICB7XG4gICAgICAgICg8ZXpTaW5HcmF0LnNpbkdyYXQ+ZWwpLmRyYXcoKTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xuICAgICAgICAvLyBjb25zb2xlLmRpcihsaXN0WzBdKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaXN0W2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAganVkZ2VFbGVtZW50KGxpc3RbaV0sY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgIC8vICAgICBsZXQgbGlzdCA9IGVsO1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGp1ZGdlQW5pbWF0ZShlbCk7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6ICdcIiMwMDAwMDBcIicsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5saW5lV2lkdGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDI7XG4gICAgfVxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSAnXCIjMDAwMDAwXCInXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGlmKCEoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpKXtcbiAgICAvLyAgICAgLy8gc3Quc3Ryb2tlID0gJyMwMDAnO1xuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgIC8vIGN0eC5maWxsKCk7XG4gICAgLy8gY3R4LnN0cm9rZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZWwuc2hhcGUubWF4V2lkdGggPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnNoYXBlLm1heFdpZHRoID0gY3R4LmNhbnZhcy53aWR0aDtcbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgICAgIGN0eC5maWxsVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5tYXhXaWR0aCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlVGV4dFN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcbiAgICBsZXQgZm9udFN0cmluZyA9ICcnO1xuICAgIGlmKHN0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdCA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzdC5mb250U3R5bGUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U3R5bGUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgIT09ICdpdGFsaWMnICYmIHN0LmZvbnRTdHlsZSAhPT0gJ29ibGlxdWUnICYmIHN0LmZvbnRTdHlsZSAhPT0gXCJub3JtYWxcIil7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAnMCcpe1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzEnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSBzdC5mb250VmFyaWFudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnc21hbGwtY2FwcycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGRlcicgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2xpZ2h0ZXInKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250U2l6ZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTaXplICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U2l6ZS5pbmRleE9mKCdweCcpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgfVxuICAgIGZvbnRTdHJpbmcgPSBzdC5mb250U3R5bGUgKyAnICcgKyBzdC5mb250VmFyaWFudCArICcgJyArIHN0LmZvbnRXZWlnaHQgKyAnICcgKyBzdC5mb250U2l6ZSArICcgJyArIHN0LmZvbnRGYW1pbHk7XG4gICAgY3R4LmZvbnQgPSBmb250U3RyaW5nO1xuICAgIC8vIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XG4gICAgbGV0IHggPSAxO1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICB7XG4gICAgICAgIGVsID0gZWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcbiAgICAgICAge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RMRUZUJyB8fCBlbCA9PT0gXCJMRUZUXCIgfHwgZWwgPT09ICdMJyl7XG4gICAgICAgICAgICB4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RUT1AnIHx8IGVsID09PSBcIlRPUFwiIHx8IGVsID09PSAnVCcpe1xuICAgICAgICAgICAgeCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RSSUdIVCcgfHwgZWwgPT09IFwiUklHSFRcIiB8fCBlbCA9PT0gJ1InKXtcbiAgICAgICAgICAgIHggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUQk9UVE9NJyB8fCBlbCA9PT0gXCJCT1RUT01cIiB8fCBlbCA9PT0gJ0InKXtcbiAgICAgICAgICAgIHggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXG4gICAge1xuICAgICAgICBpZihlbDw1KVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhSXQgd2lsbCB1c2UgZGVmYXVsdCBpbnN0cnVjdGlvbiEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xuICAgIGxldCBmMCA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMCk7XG4gICAgbGV0IGYxID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUxKTtcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XG4gICAgICAgIGlmKGYxID09PSAyIHx8IGYxID09PSA0KXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHQgPSBmMTtcbiAgICAgICAgICAgIGYxID0gZjA7XG4gICAgICAgICAgICBmMCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpe1xuICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMyl7XG4gICAgICAgICAgICBmMSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtmMCxmMV1cbn0gICBcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gaW1nLnNoYXBlXG4gICAgaWYoc2guc3ggPT09IHVuZGVmaW5lZCB8fCBzaC5zeSA9PT0gdW5kZWZpbmVkIHx8IHNoLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSXNJbkVsZW1lbnQoW3gseV06IFtudW1iZXIsbnVtYmVyXSxlbDogRWxlbWVudHMpOiBib29sZWFue1xuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKXtcbiAgICAgICAgbGV0IFt4MCx5MCx3MCxoMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLndpZHRoLGVsLnNoYXBlLmhlaWdodF1cbiAgICAgICAgaWYoeCA+PSB4MCAmJiB4PD14MCt3MCAmJiB5ID49IHkwICYmIHkgPD0geTAraDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucl1cbiAgICAgICAgbGV0IHIgPSBNYXRoLnNxcnQoTWF0aC5wb3coeC14MCwyKSArIE1hdGgucG93KHkteTAsMikpXG4gICAgICAgIGlmKHIgPD0gcjApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCx4MSx5MV0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnhFbmQsZWwuc2hhcGUueUVuZF1cbiAgICAgICAgaWYoeDEgIT09IHgwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgeXQgPSAoeTEteTApLyh4MS14MCkgKiAoeCAtIHgwKSArIHkwXG4gICAgICAgICAgICBpZih5ID49IHl0LTE1ICYmIHkgPD0geXQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCB4dCA9ICh4MS14MCkvKHkxLXkwKSAqICh5IC0geTApICsgeDBcbiAgICAgICAgICAgIGlmKHkgPj0geHQtMTUgJiYgeSA8PSB4dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscmEwLHJiMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJhLGVsLnNoYXBlLnJiXVxuICAgICAgICBsZXQgdCA9IE1hdGgucG93KHgteDAsMikvTWF0aC5wb3cocmEwLDIpICsgTWF0aC5wb3coeS15MCwyKS9NYXRoLnBvdyhyYjAsMilcbiAgICAgICAgaWYodCA8PSAxKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICB7XG4gICAgICAgIGxldCBpID0gMFxuICAgICAgICBsZXQgaiA9IGkgKyAxXG4gICAgICAgIGxldCBpbmRleCA9IDBcbiAgICAgICAgbGV0IHh0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHl0ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IFt4MCx5MF0gPSBbZWwuc2hhcGUueEEsZWwuc2hhcGUueUFdXG4gICAgICAgIGZvcihpID0gMDtpPGVsLnNoYXBlLnhBLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGkgPT09IGVsLnNoYXBlLnhBLmxlbmd0aC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGogPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGogPSBpICsgMVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeTBbaV0gIT09IHkwW2pdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHh0W2luZGV4XSA9ICh4MFtpXS14MFtqXSkvKHkwW2ldLXkwW2pdKSAqICh5IC0geTBbaV0pICsgeDBbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgeXRbaW5kZXhdID0gKHkwW2pdLXkwW2ldKS8oeDBbal0teDBbaV0pICogKHggLSB4MFtpXSkgKyB5MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoeCA9PT0geHRbaW5kZXhdKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmKHh0W2luZGV4XSA+PSB4KXtcbiAgICAgICAgICAgICAgICBpbmRleCsrXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoaW5kZXglMj09PTApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGNcbiAgICAvLyAgICAgbGV0IGksalxuICAgIC8vICAgICBsZXQgbCA9IGVsLnNoYXBlLnlBLmxlbmd0aFxuICAgIC8vICAgICBmb3IoYyA9IGZhbHNlLGkgPSAtMSxqID0gbCAtIDE7ICsraSA8IGw7IGogPSBpKSBcbiAgICAvLyAgICAgICAgICggKGVsLnNoYXBlLnlBW2ldIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2pdKSB8fCAoZWwuc2hhcGUueUFbal0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbaV0pICkgXG4gICAgLy8gICAgICAgICAmJiAoeCA8IChlbC5zaGFwZS54QVtqXSAtIGVsLnNoYXBlLnhBW2ldKSAqICh5IC0gZWwuc2hhcGUueUFbaV0pIC8gKGVsLnNoYXBlLnlBW2pdIC0gZWwuc2hhcGUueUFbaV0pICsgZWwuc2hhcGUueEFbaV0pIFxuICAgIC8vICAgICAgICAgJiYgKGMgPSAhYyk7IFxuICAgIC8vICAgICByZXR1cm4gYzsgXG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VBbmltYXRlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8gY29uc29sZS5kaXIoJ2EnKVxuXG4gICAgZWwucmVtb3ZlKClcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnRyYW5zbGF0ZShlbC50cmFuc2xhdGUueCxlbC50cmFuc2xhdGUueSlcbiAgICBjdHgucm90YXRlKGVsLnJvdGF0ZSlcbiAgICBjdHguc2NhbGUoZWwuc2NhbGUud2lkdGgsZWwuc2NhbGUuaGVpZ2h0KVxuICAgIGp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUUlMoZWw6IEVsZW1lbnRzKXtcbiAgICBsZXQgY3R4ID0gZWwuY3R4XG5cbiAgICBsZXQgW3gseV0gPSBqdWRnZUVsZW1lbnRzQ2VudGVyKGVsKTtcbiAgICBcbiAgICBpZihlbC5yb3RhdGUpXG4gICAge1xuICAgICAgICBjdHgudHJhbnNsYXRlKHgseSlcbiAgICAgICAgY3R4LnJvdGF0ZShlbC5yb3RhdGUqTWF0aC5QSS8xODApXG4gICAgICAgIGN0eC50cmFuc2xhdGUoLXgsLXkpXG4gICAgfVxuICAgIGN0eC50cmFuc2xhdGUoeCx5KVxuICAgIGN0eC5zY2FsZShlbC5zY2FsZS53aWR0aCxlbC5zY2FsZS5oZWlnaHQpXG4gICAgY3R4LnRyYW5zbGF0ZSgteCwteSlcblxuICAgIGN0eC50cmFuc2xhdGUoZWwudHJhbnNsYXRlLngsZWwudHJhbnNsYXRlLnkpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUtleShrZXlDb2RlOiBudW1iZXIsa2V5Q29kZURpY3Rpb25hcnk6IE9iamVjdCk6IHN0cmluZ3tcbiAgICBsZXQga2V5ID0ga2V5Q29kZURpY3Rpb25hcnlba2V5Q29kZV07XG4gICAgcmV0dXJuIGtleTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50OiBEbGdDb250ZW50LHRpdGxlOiBzdHJpbmcsY29udGVudD86IHN0cmluZyxvaz86IHN0cmluZyxjYW5jZWw/OiBzdHJpbmcpOiBEbGdDb250ZW50e1xuICAgIGlmKG9rID09PSB1bmRlZmluZWQpe1xuICAgICAgICBvayA9ICdPSydcbiAgICB9XG4gICAgaWYoY2FuY2VsID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBjYW5jZWwgPSAnQ2FuY2VsJ1xuICAgIH1cbiAgICBpZihkbGdDb250ZW50ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICByZXR1cm4gZGxnQ29udGVudCA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtOiBvayxcbiAgICAgICAgICAgIGNhbmNlbDogY2FuY2VsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoZGxnQ29udGVudC50aXRsZSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBkbGdDb250ZW50LnRpdGxlID0gdGl0bGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29udGVudCAhPT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihkbGdDb250ZW50LmNvbnRlbnQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkbGdDb250ZW50LmNvbnRlbnQgPSBjb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuY29uZmlybSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBkbGdDb250ZW50LmNvbmZpcm0gPSBva1xuICAgICAgICB9XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuY2FuY2VsID09PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgZGxnQ29udGVudC5jYW5jZWwgPSBjYW5jZWw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRsZ0NvbnRlbnQ7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50c0NlbnRlcihlbDogRWxlbWVudHMpOiBbbnVtYmVyLG51bWJlcl17XG4gICAgbGV0IHgseTtcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICB7XG4gICAgICAgIHggPSBlbC5zaGFwZS54ICsgZWwuc2hhcGUud2lkdGgvMlxuICAgICAgICB5ID0gZWwuc2hhcGUueSArIGVsLnNoYXBlLmhlaWdodC8yXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUgfHwgZWwgaW5zdGFuY2VvZiBBcmMgfHwgZWwgaW5zdGFuY2VvZiBHcmF0IHx8IGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIHggPSBlbC5zaGFwZS54XG4gICAgICAgIHkgPSBlbC5zaGFwZS55XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgeCA9IE1hdGguYWJzKGVsLnNoYXBlLnggLSBlbC5zaGFwZS54RW5kKS8yXG4gICAgICAgIHkgPSBNYXRoLmFicyhlbC5zaGFwZS55IC0gZWwuc2hhcGUueUVuZCkvMlxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgZXpTaW5HcmF0LnNpbkdyYXQpXG4gICAge1xuICAgICAgICB4ID0gTWF0aC5jZWlsKCgyKmVsLnNoYXBlLnIrMSkvMilcbiAgICAgICAgeSA9IE1hdGguY2VpbCgoMiplbC5zaGFwZS5yKzEpLzIpXG4gICAgfVxuXG4gICAgcmV0dXJuIFt4LHldXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgbmFtZVN0eWxlLCBUZXh0TGluZSB9IGZyb20gXCIuLi9lenBzeVwiO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiLi4vR3JvdXAvZ3JvdXBcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2V7XG4gICAgRWxlbWVudHNMaXN0OiBBcnJheTxFbGVtZW50cz5cbiAgICB0ZXh0TGluZTogVGV4dExpbmVcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdCA9IFtdO1xuICAgIH1cbiAgICBwdXNoKGVsOiBFbGVtZW50cyB8IEFycmF5PEVsZW1lbnRzPiB8IEdyb3VwKXtcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50cyB8fCBlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5wdXNoKGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5wdXNoKGVsW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmUoZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0RWxlbWVudHNOYW1lKGVsKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zZWFyY2hFbGVtZW50c05hbWUobmFtZSk7XG4gICAgICAgIGlmKGluZGV4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGluZGV4IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaW5kZXguc29ydCgpO1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IGluZGV4Lmxlbmd0aC0xO2kgPj0gMDtpLS0pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5zcGxpY2UoaW5kZXhbaV0sMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RWxlbWVudHNOYW1lKGVsOiBFbGVtZW50cyB8IEFycmF5PEVsZW1lbnRzPiB8IEdyb3VwKXtcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50cyB8fCBlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IGVsLm5hbWU7XG4gICAgICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBuZXcgQXJyYXkoKVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBuYW1lW2ldID0gZWxbaV0ubmFtZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZWFyY2hFbGVtZW50c05hbWUobmFtZTogbmFtZVN0eWxlIHwgQXJyYXk8bmFtZVN0eWxlPil7XG4gICAgICAgIGlmKG5hbWUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gbmV3IEFycmF5KClcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IG5hbWUubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCB0aGlzLkVsZW1lbnRzTGlzdC5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobmFtZVtpXS5uYW1lID09PSB0aGlzLkVsZW1lbnRzTGlzdFt0XS5uYW1lLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4W2ldID0gdDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluZGV4XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IC0xO1xuICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgdGhpcy5FbGVtZW50c0xpc3QubGVuZ3RoO3QrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihuYW1lLm5hbWUgPT09IHRoaXMuRWxlbWVudHNMaXN0W3RdLm5hbWUubmFtZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gdDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlRHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgICAgIGxldCBlbCA9IHRoaXMuRWxlbWVudHNMaXN0IFxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBlbFtpXS5jdHggPSBjdHhcbiAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsW2ldLGN0eClcbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBqdWRnZUlzSW5FbGVtZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIsZnVuYz86IEZ1bmN0aW9uKTogUHJvbWlzZTxib29sZWFuPntcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0ZWQpPT57XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGV2ZW50ID0+e1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihmdW5jKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYk5hbWUoa2V5OiBzdHJpbmd8bnVtYmVyKTpudW1iZXJ7XG4gICAgbGV0IHJlcztcblxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgcmVzID0ga2V5LmNoYXJDb2RlQXQoMClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmVzID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpXG4gICAgfVxuICAgIC8vIGNvbnNvbGUuZGlyKHJlcykgXG4gICAgcmV0dXJuIHJlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JQcmVzc1dhaXQoa2V5OiBudW1iZXJ8QXJyYXk8bnVtYmVyPik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBsZXQga2V5QyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBpZih0eXBlb2Yga2V5ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAga2V5QyA9IFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBrZXlDID0ga2V5O1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGV2ZW50ID0+e1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwga2V5Qy5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXlDW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlLmtleUNvZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JSZWxlYXNlV2FpdChrZXk6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleXVwID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0Q2xpY2soZWw6IEVsZW1lbnRzKTogUHJvbWlzZTxib29sZWFuPntcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0ZWQpPT57XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgbGV0IHgseVxuICAgICAgICAgICAgaWYoZS5wYWdlWCB8fCBlLnBhZ2VZKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHggPSBlLnBhZ2VYXG4gICAgICAgICAgICAgICAgeSA9IGUucGFnZVlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHgpIFxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoeSlcbiAgICAgICAgICAgIGxldCBmID0ganVkZ2VJc0luRWxlbWVudChbeCx5XSxlbClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGYpXG4gICAgICAgICAgICBpZihmID09PSB0cnVlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn0iLCJleHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IG51bWJlclxuICAgIHRpbWVTdGFtcDogQXJyYXk8bnVtYmVyPlxuICAgIHRpbWVDb250aW51ZVZhbHVlOiBBcnJheTxudW1iZXI+XG4gICAgdGltZUludGVydmFsVmFsdWU6IEFycmF5PG51bWJlcj5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gW11cbiAgICAgICAgdGhpcy50aW1lQ29udGludWVWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMudGltZUludGVydmFsVmFsdWUgPSBbXVxuICAgIH1cbiAgICByZWNvcmQoKXtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAucHVzaChwZXJmb3JtYW5jZS5ub3coKSlcbiAgICB9XG4gICAgZ2V0U3RhbXAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZVN0YW1wXG4gICAgfVxuICAgIGdldENvbnRpbnVlVmFsdWUoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy50aW1lU3RhbXAubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50aW1lQ29udGludWVWYWx1ZS5wdXNoKHRoaXMudGltZVN0YW1wW2ldIC0gdGhpcy50aW1lU3RhbXBbaS0xXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGltZUNvbnRpbnVlVmFsdWU7XG4gICAgfVxuICAgIGdldEludGVydmFsVmFsdWUoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy50aW1lU3RhbXAubGVuZ3RoO2krPTIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGltZVN0YW1wKVxuICAgICAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsVmFsdWUucHVzaCh0aGlzLnRpbWVTdGFtcFtpXSAtIHRoaXMudGltZVN0YW1wW2ktMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKGRlbGF5OiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj57XG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuLy8gICAgICAgICB2YXIgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgKyBkZWxheTtcbi8vICAgICAgICAgd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPCBzdGFydFRpbWUpIHt9XG4vLyAgICAgICAgIHJlcygxKVxuLy8gICAgIH0pXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChkZWxheTogbnVtYmVyKXtcbiAgICBsZXQgdGltZV9udW09MDsgICAgIFxuICAgIGRlbGF5ID0gTWF0aC5mbG9vcihkZWxheS8xMDAwICogNjApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIChmdW5jdGlvbiByYWYoKXtcbiAgICAgICAgICAgIHRpbWVfbnVtKys7XG4gICAgICAgICAgICBsZXQgaWQgPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgaWYoIHRpbWVfbnVtPmRlbGF5KXtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICAgICAgICByZXNvbHZlKDApO1xuICAgICAgICB9XG4gICAgICAgIH0oKSkgICAgXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICB2YXIgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgKyBkZWxheTtcbiAgICAgICAgd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPCBzdGFydFRpbWUpIHt9XG4gICAgICAgIHJlcygxKVxuICAgIH0pXG59IiwiaW1wb3J0IHsganVkZ2VLZXkgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIlxuXG5cbmV4cG9ydCBjbGFzcyBLZXlwcmVzc3tcbiAgICBrZXlUeXBlOiBzdHJpbmdcbiAgICBrZXlFdmVudDogS2V5Ym9hcmRFdmVudFxuICAgIGtleTogQXJyYXk8YW55PlxuICAgIGtleUNvbWJpbmF0aW9uOiBBcnJheTxhbnk+XG4gICAgY29uc3RydWN0b3Ioa2V5VHlwZT86IHN0cmluZyl7XG4gICAgICAgIGlmKGtleVR5cGUpe1xuICAgICAgICAgICAgaWYoa2V5VHlwZSA9PT0gJ2tleWRvd24nIHx8IGtleVR5cGUgPT09ICdrZXl1cCcgfHwga2V5VHlwZSA9PT0gJ2tleXByZXNzJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0ga2V5VHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmtleVR5cGUgPSAna2V5ZG93bidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0gJ2tleWRvd24nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBbXVxuICAgICAgICB0aGlzLmtleUV2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQodGhpcy5rZXlUeXBlKTtcbiAgICB9XG4gICAgbGlzdGVuKGtleTogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nPiB8IEFycmF5PG51bWJlcj4sZnVuPzogRnVuYyB8IEZ1bmN0aW9uLElzRGVzdHJveT86IGJvb2xlYW4pOiBQcm9taXNlPFJFUz57XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHBhcmFtKTtcbiAgICAgICAgbGV0IGZ1bmM6IEZ1bmM9e1xuICAgICAgICAgICAgZnVuY0xpc3Q6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGlmKElzRGVzdHJveSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBJc0Rlc3Ryb3kgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgIHRoaXMua2V5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBpZihrZXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZnVuIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmdW5jLmZ1bmNMaXN0ID0gW2Z1bl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMgPSBmdW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGtleSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkucHVzaChrZXkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMua2V5Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5rZXlbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlbaV0gPSBqdWRnZUtleSh0aGlzLmtleVtpXSxrZXlDb2RlRGljdGlvbmFyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGZ1bmMpO1xuICAgICAgICAgICAgICAgIGxpc3Rlbih0aGlzLmtleSx0aGlzLmtleVR5cGUsZnVuYyxJc0Rlc3Ryb3kpXG4gICAgICAgICAgICAgICAgLnRoZW4oZT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihlKVxuICAgICAgICAgICAgICAgICAgICAvLyBpZihlLmluZGV4ID49IDApXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGZ1bmMuY29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZnVuYy5jb21wbGV0ZSgpXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoZnVuYylcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoZnVuYy5mdW5jTGlzdFtlLmluZGV4XSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBmdW5jLmZ1bmNMaXN0W2UuaW5kZXhdKClcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmRpcihlLmtleSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdmdW5jWycrZSsnXSBpcyB1bmRlZmluZWQgIScpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKGUua2V5KVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5lcnJvcihcImZ1bmMgaXMgdW5kZWZpbmRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXMoZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSBzaG91bGRuJ3QgdXNlIHRoaXMgZnVuY3Rpb24gd2l0aG91dCBQYXJhbWV0cmljIGtleSAhISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtleXByZXNzSW5pdChrZXlUeXBlPzogc3RyaW5nKXtcbiAgICBsZXQga2V5cHJlc3MgPSBuZXcgS2V5cHJlc3MoKTtcbiAgICByZXR1cm4ga2V5cHJlc3Ncbn1cblxuZnVuY3Rpb24gbGlzdGVuKGtleTogQXJyYXk8c3RyaW5nPixrZXlUeXBlOiBzdHJpbmcsZnVuYzogRnVuYyxJc0Rlc3Ryb3k6IGJvb2xlYW4pOiBQcm9taXNlPFJFUz57XG4gICAgbGV0IHJlczpSRVM9e1xuICAgICAgICBpbmRleDogLTEsXG4gICAgICAgIGtleTogJ251bGwnXG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSRVM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihrZXlUeXBlLGxpbnN0ZW5uZXIpO1xuICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgZnVuY3Rpb24gbGluc3Rlbm5lcihlKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKCg8S2V5Ym9hcmRFdmVudD5lKS5rZXkpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBrZXkubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihrZXlbaV0gPT09ICg8S2V5Ym9hcmRFdmVudD5lKS5rZXkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogKDxLZXlib2FyZEV2ZW50PmUpLmtleVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5pbmRleCA+PSAwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmdW5jLmNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMuY29tcGxldGUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKGZ1bmMpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGZ1bmMuZnVuY0xpc3RbcmVzLmluZGV4XSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jLmZ1bmNMaXN0W3Jlcy5pbmRleF0oKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlcy5rZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcignZnVuY1snK2UrJ10gaXMgdW5kZWZpbmVkICEnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXMua2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5lcnJvcihcImZ1bmMgaXMgdW5kZWZpbmRlXCIpO1xuICAgICAgICAgICAgICAgICAgICAvLyByZXMoZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKElzRGVzdHJveSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoa2V5VHlwZSxsaW5zdGVubmVyKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbn1cblxuaW50ZXJmYWNlIEZ1bmN7XG4gICAgZnVuY0xpc3Q6IEFycmF5PEZ1bmN0aW9uPlxuICAgIGNvbXBsZXRlPzogRnVuY3Rpb25cbn1cbmludGVyZmFjZSBSRVN7XG4gICAgaW5kZXg6IG51bWJlclxuICAgIGtleTogc3RyaW5nXG59XG5cbmxldCBrZXlDb2RlRGljdGlvbmFyeSA9IHtcbiAgICA4OiAnQmFja3NwYWNlJyxcbiAgICA5OiAnVGFiJywgXG4gICAgMTI6ICdDbGVhcicsXG4gICAgMTM6ICdFbnRlcicsIFxuICAgIDE2OiAnU2hpZnQnLFxuICAgIDE3OiAnQ29udHJvbCcsIFxuICAgIDE4OiAnQWx0JywgXG4gICAgMTk6ICdQYXVzZScsXG4gICAgMjA6ICdDYXBzTG9jaycsIFxuICAgIDI3OiAnRXNjYXBlJyxcbiAgICAzMjogJyAnLCBcbiAgICAzMzogJ1ByaW9yJywgXG4gICAgMzQ6ICdOZXh0JyxcbiAgICAzNTogJ0VuZCcsIFxuICAgIDM2OiAnSG9tZScsIFxuICAgIDM3OiAnTGVmdCcsIFxuICAgIDM4OiAnVXAnLCBcbiAgICAzOTogJ1JpZ2h0JywgXG4gICAgNDA6ICdEb3duJywgXG4gICAgNDE6ICdTZWxlY3QnLCBcbiAgICA0MjogJ1ByaW50JywgXG4gICAgNDM6ICdFeGVjdXRlJywgXG4gICAgNDU6ICdJbnNlcnQnLCBcbiAgICA0NjogJ0RlbGV0ZScsIFxuICAgIDQ3OiAnSGVscCcsIFxuICAgIDQ4OiAnMCcsIFxuICAgIDQ5OiAnMScsXG4gICAgNTA6ICcyJyxcbiAgICA1MTogJzMnLFxuICAgIDUyOiAnNCcsIFxuICAgIDUzOiAnNScsXG4gICAgNTQ6ICc2JyxcbiAgICA1NTogJzcnLCBcbiAgICA1NjogJzgnLCBcbiAgICA1NzogJzknLCBcbiAgICA2NTogJ2EnLCBcbiAgICA2NjogJ2InLCBcbiAgICA2NzogJ2MnLCBcbiAgICA2ODogJ2QnLCBcbiAgICA2OTogJ2UnLCAgXG4gICAgNzA6ICdmJywgXG4gICAgNzE6ICdnJywgXG4gICAgNzI6ICdoJywgXG4gICAgNzM6ICdpJywgXG4gICAgNzQ6ICdqJywgXG4gICAgNzU6ICdrJywgXG4gICAgNzY6ICdsJywgXG4gICAgNzc6ICdtJywgXG4gICAgNzg6ICduJywgXG4gICAgNzk6ICdvJywgXG4gICAgODA6ICdwJywgXG4gICAgODE6ICdxJyxcbiAgICA4MjogJ3InLCBcbiAgICA4MzogJ3MnLCBcbiAgICA4NDogJ3QnLCBcbiAgICA4NTogJ3UnLCBcbiAgICA4NjogJ3YnLCBcbiAgICA4NzogJ3cnLCBcbiAgICA4ODogJ3gnLCBcbiAgICA4OTogJ3knLCBcbiAgICA5MDogJ3onLCBcbiAgICA5NjogJ0tQXzAnLCBcbiAgICA5NzogJ0tQXzEnLCBcbiAgICA5ODogJ0tQXzInLCBcbiAgICA5OTogJ0tQXzMnLCBcbiAgICAxMDA6ICdLUF80JywgXG4gICAgMTAxOiAnS1BfNScsIFxuICAgIDEwMjogJ0tQXzYnLCBcbiAgICAxMDM6ICdLUF83JywgXG4gICAgMTA0OiAnS1BfOCcsIFxuICAgIDEwNTogJ0tQXzknLCBcbiAgICAxMDY6ICdLUF9NdWx0aXBseScsXG4gICAgMTA3OiAnS1BfQWRkJywgXG4gICAgMTA4OiAnS1BfU2VwYXJhdG9yJyxcbiAgICAxMDk6ICdLUF9TdWJ0cmFjdCcsXG4gICAgMTEwOiAnS1BfRGVjaW1hbCcsXG4gICAgMTExOiAnS1BfRGl2aWRlJywgXG4gICAgMTEyOiAnRjEnLCBcbiAgICAxMTM6ICdGMicsIFxuICAgIDExNDogJ0YzJywgXG4gICAgMTE1OiAnRjQnLCBcbiAgICAxMTY6ICdGNScsIFxuICAgIDExNzogJ0Y2JywgXG4gICAgMTE4OiAnRjcnLCBcbiAgICAxMTk6ICdGOCcsIFxuICAgIDEyMDogJ0Y5JywgXG4gICAgMTIxOiAnRjEwJywgXG4gICAgMTIyOiAnRjExJywgXG4gICAgMTIzOiAnRjEyJywgXG4gICAgMTI0OiAnRjEzJywgXG4gICAgMTI1OiAnRjE0JywgXG4gICAgMTI2OiAnRjE1JywgXG4gICAgMTI3OiAnRjE2JywgXG4gICAgMTI4OiAnRjE3JywgXG4gICAgMTI5OiAnRjE4JywgXG4gICAgMTMwOiAnRjE5JywgXG4gICAgMTMxOiAnRjIwJywgXG4gICAgMTMyOiAnRjIxJywgXG4gICAgMTMzOiAnRjIyJywgXG4gICAgMTM0OiAnRjIzJywgXG4gICAgMTM1OiAnRjI0JywgXG59IiwiZXhwb3J0IGNvbnN0IGNvbnNvbGVQcmVmaXggPSAnU3dlZXRBbGVydDI6J1xuXG4vKipcbiAqIEZpbHRlciB0aGUgdW5pcXVlIHZhbHVlcyBpbnRvIGEgbmV3IGFycmF5XG4gKiBAcGFyYW0gYXJyXG4gKi9cbmV4cG9ydCBjb25zdCB1bmlxdWVBcnJheSA9IChhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIENhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZUxpc3QgfCBIVE1MQ29sbGVjdGlvbiB8IE5hbWVkTm9kZU1hcH0gbm9kZUxpc3RcbiAqIEByZXR1cm5zIHthcnJheX1cbiAqL1xuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAobm9kZUxpc3QpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KVxuXG4vKipcbiAqIFN0YW5kYXJkaXplIGNvbnNvbGUgd2FybmluZ3NcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXl9IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IHdhcm4gPSAobWVzc2FnZSkgPT4ge1xuICBjb25zb2xlLndhcm4oYCR7Y29uc29sZVByZWZpeH0gJHt0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgPyBtZXNzYWdlLmpvaW4oJyAnKSA6IG1lc3NhZ2V9YClcbn1cblxuLyoqXG4gKiBTdGFuZGFyZGl6ZSBjb25zb2xlIGVycm9yc1xuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IGVycm9yID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc29sZS5lcnJvcihgJHtjb25zb2xlUHJlZml4fSAke21lc3NhZ2V9YClcbn1cblxuLyoqXG4gKiBQcml2YXRlIGdsb2JhbCBzdGF0ZSBmb3IgYHdhcm5PbmNlYFxuICogQHR5cGUge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzID0gW11cblxuLyoqXG4gKiBTaG93IGEgY29uc29sZSB3YXJuaW5nLCBidXQgb25seSBpZiBpdCBoYXNuJ3QgYWxyZWFkeSBiZWVuIHNob3duXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICovXG5leHBvcnQgY29uc3Qgd2Fybk9uY2UgPSAobWVzc2FnZSkgPT4ge1xuICBpZiAoIXByZXZpb3VzV2Fybk9uY2VNZXNzYWdlcy5pbmNsdWRlcyhtZXNzYWdlKSkge1xuICAgIHByZXZpb3VzV2Fybk9uY2VNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG4gICAgd2FybihtZXNzYWdlKVxuICB9XG59XG5cbi8qKlxuICogU2hvdyBhIG9uZS10aW1lIGNvbnNvbGUgd2FybmluZyBhYm91dCBkZXByZWNhdGVkIHBhcmFtcy9tZXRob2RzXG4gKi9cbmV4cG9ydCBjb25zdCB3YXJuQWJvdXREZXByZWNhdGlvbiA9IChkZXByZWNhdGVkUGFyYW0sIHVzZUluc3RlYWQpID0+IHtcbiAgd2Fybk9uY2UoXG4gICAgYFwiJHtkZXByZWNhdGVkUGFyYW19XCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuIFBsZWFzZSB1c2UgXCIke3VzZUluc3RlYWR9XCIgaW5zdGVhZC5gXG4gIClcbn1cblxuLyoqXG4gKiBJZiBgYXJnYCBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0ICh3aXRoIG5vIGFyZ3VtZW50cyBvciBjb250ZXh0KSBhbmQgcmV0dXJuIHRoZSByZXN1bHQuXG4gKiBPdGhlcndpc2UsIGp1c3QgcGFzcyB0aGUgdmFsdWUgdGhyb3VnaFxuICogQHBhcmFtIGFyZ1xuICovXG5leHBvcnQgY29uc3QgY2FsbElmRnVuY3Rpb24gPSAoYXJnKSA9PiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJyA/IGFyZygpIDogYXJnKVxuXG5leHBvcnQgY29uc3QgaGFzVG9Qcm9taXNlRm4gPSAoYXJnKSA9PiBhcmcgJiYgdHlwZW9mIGFyZy50b1Byb21pc2UgPT09ICdmdW5jdGlvbidcblxuZXhwb3J0IGNvbnN0IGFzUHJvbWlzZSA9IChhcmcpID0+IChoYXNUb1Byb21pc2VGbihhcmcpID8gYXJnLnRvUHJvbWlzZSgpIDogUHJvbWlzZS5yZXNvbHZlKGFyZykpXG5cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAoYXJnKSA9PiBhcmcgJiYgUHJvbWlzZS5yZXNvbHZlKGFyZykgPT09IGFyZ1xuIiwiaW1wb3J0IHsgd2Fybiwgd2FybkFib3V0RGVwcmVjYXRpb24gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQYXJhbXMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgdGl0bGVUZXh0OiAnJyxcbiAgdGV4dDogJycsXG4gIGh0bWw6ICcnLFxuICBmb290ZXI6ICcnLFxuICBpY29uOiB1bmRlZmluZWQsXG4gIGljb25Db2xvcjogdW5kZWZpbmVkLFxuICBpY29uSHRtbDogdW5kZWZpbmVkLFxuICB0ZW1wbGF0ZTogdW5kZWZpbmVkLFxuICB0b2FzdDogZmFsc2UsXG4gIHNob3dDbGFzczoge1xuICAgIHBvcHVwOiAnc3dhbDItc2hvdycsXG4gICAgYmFja2Ryb3A6ICdzd2FsMi1iYWNrZHJvcC1zaG93JyxcbiAgICBpY29uOiAnc3dhbDItaWNvbi1zaG93JyxcbiAgfSxcbiAgaGlkZUNsYXNzOiB7XG4gICAgcG9wdXA6ICdzd2FsMi1oaWRlJyxcbiAgICBiYWNrZHJvcDogJ3N3YWwyLWJhY2tkcm9wLWhpZGUnLFxuICAgIGljb246ICdzd2FsMi1pY29uLWhpZGUnLFxuICB9LFxuICBjdXN0b21DbGFzczoge30sXG4gIHRhcmdldDogJ2JvZHknLFxuICBjb2xvcjogdW5kZWZpbmVkLFxuICBiYWNrZHJvcDogdHJ1ZSxcbiAgaGVpZ2h0QXV0bzogdHJ1ZSxcbiAgYWxsb3dPdXRzaWRlQ2xpY2s6IHRydWUsXG4gIGFsbG93RXNjYXBlS2V5OiB0cnVlLFxuICBhbGxvd0VudGVyS2V5OiB0cnVlLFxuICBzdG9wS2V5ZG93blByb3BhZ2F0aW9uOiB0cnVlLFxuICBrZXlkb3duTGlzdGVuZXJDYXB0dXJlOiBmYWxzZSxcbiAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXG4gIHNob3dEZW55QnV0dG9uOiBmYWxzZSxcbiAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXG4gIHByZUNvbmZpcm06IHVuZGVmaW5lZCxcbiAgcHJlRGVueTogdW5kZWZpbmVkLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGNvbmZpcm1CdXR0b25Db2xvcjogdW5kZWZpbmVkLFxuICBkZW55QnV0dG9uVGV4dDogJ05vJyxcbiAgZGVueUJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGRlbnlCdXR0b25Db2xvcjogdW5kZWZpbmVkLFxuICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnJyxcbiAgY2FuY2VsQnV0dG9uQ29sb3I6IHVuZGVmaW5lZCxcbiAgYnV0dG9uc1N0eWxpbmc6IHRydWUsXG4gIHJldmVyc2VCdXR0b25zOiBmYWxzZSxcbiAgZm9jdXNDb25maXJtOiB0cnVlLFxuICBmb2N1c0Rlbnk6IGZhbHNlLFxuICBmb2N1c0NhbmNlbDogZmFsc2UsXG4gIHJldHVybkZvY3VzOiB0cnVlLFxuICBzaG93Q2xvc2VCdXR0b246IGZhbHNlLFxuICBjbG9zZUJ1dHRvbkh0bWw6ICcmdGltZXM7JyxcbiAgY2xvc2VCdXR0b25BcmlhTGFiZWw6ICdDbG9zZSB0aGlzIGRpYWxvZycsXG4gIGxvYWRlckh0bWw6ICcnLFxuICBzaG93TG9hZGVyT25Db25maXJtOiBmYWxzZSxcbiAgc2hvd0xvYWRlck9uRGVueTogZmFsc2UsXG4gIGltYWdlVXJsOiB1bmRlZmluZWQsXG4gIGltYWdlV2lkdGg6IHVuZGVmaW5lZCxcbiAgaW1hZ2VIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgaW1hZ2VBbHQ6ICcnLFxuICB0aW1lcjogdW5kZWZpbmVkLFxuICB0aW1lclByb2dyZXNzQmFyOiBmYWxzZSxcbiAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgcGFkZGluZzogdW5kZWZpbmVkLFxuICBiYWNrZ3JvdW5kOiB1bmRlZmluZWQsXG4gIGlucHV0OiB1bmRlZmluZWQsXG4gIGlucHV0UGxhY2Vob2xkZXI6ICcnLFxuICBpbnB1dExhYmVsOiAnJyxcbiAgaW5wdXRWYWx1ZTogJycsXG4gIGlucHV0T3B0aW9uczoge30sXG4gIGlucHV0QXV0b1RyaW06IHRydWUsXG4gIGlucHV0QXR0cmlidXRlczoge30sXG4gIGlucHV0VmFsaWRhdG9yOiB1bmRlZmluZWQsXG4gIHJldHVybklucHV0VmFsdWVPbkRlbnk6IGZhbHNlLFxuICB2YWxpZGF0aW9uTWVzc2FnZTogdW5kZWZpbmVkLFxuICBncm93OiBmYWxzZSxcbiAgcG9zaXRpb246ICdjZW50ZXInLFxuICBwcm9ncmVzc1N0ZXBzOiBbXSxcbiAgY3VycmVudFByb2dyZXNzU3RlcDogdW5kZWZpbmVkLFxuICBwcm9ncmVzc1N0ZXBzRGlzdGFuY2U6IHVuZGVmaW5lZCxcbiAgd2lsbE9wZW46IHVuZGVmaW5lZCxcbiAgZGlkT3BlbjogdW5kZWZpbmVkLFxuICBkaWRSZW5kZXI6IHVuZGVmaW5lZCxcbiAgd2lsbENsb3NlOiB1bmRlZmluZWQsXG4gIGRpZENsb3NlOiB1bmRlZmluZWQsXG4gIGRpZERlc3Ryb3k6IHVuZGVmaW5lZCxcbiAgc2Nyb2xsYmFyUGFkZGluZzogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0YWJsZVBhcmFtcyA9IFtcbiAgJ2FsbG93RXNjYXBlS2V5JyxcbiAgJ2FsbG93T3V0c2lkZUNsaWNrJyxcbiAgJ2JhY2tncm91bmQnLFxuICAnYnV0dG9uc1N0eWxpbmcnLFxuICAnY2FuY2VsQnV0dG9uQXJpYUxhYmVsJyxcbiAgJ2NhbmNlbEJ1dHRvbkNvbG9yJyxcbiAgJ2NhbmNlbEJ1dHRvblRleHQnLFxuICAnY2xvc2VCdXR0b25BcmlhTGFiZWwnLFxuICAnY2xvc2VCdXR0b25IdG1sJyxcbiAgJ2NvbG9yJyxcbiAgJ2NvbmZpcm1CdXR0b25BcmlhTGFiZWwnLFxuICAnY29uZmlybUJ1dHRvbkNvbG9yJyxcbiAgJ2NvbmZpcm1CdXR0b25UZXh0JyxcbiAgJ2N1cnJlbnRQcm9ncmVzc1N0ZXAnLFxuICAnY3VzdG9tQ2xhc3MnLFxuICAnZGVueUJ1dHRvbkFyaWFMYWJlbCcsXG4gICdkZW55QnV0dG9uQ29sb3InLFxuICAnZGVueUJ1dHRvblRleHQnLFxuICAnZGlkQ2xvc2UnLFxuICAnZGlkRGVzdHJveScsXG4gICdmb290ZXInLFxuICAnaGlkZUNsYXNzJyxcbiAgJ2h0bWwnLFxuICAnaWNvbicsXG4gICdpY29uQ29sb3InLFxuICAnaWNvbkh0bWwnLFxuICAnaW1hZ2VBbHQnLFxuICAnaW1hZ2VIZWlnaHQnLFxuICAnaW1hZ2VVcmwnLFxuICAnaW1hZ2VXaWR0aCcsXG4gICdwcmVDb25maXJtJyxcbiAgJ3ByZURlbnknLFxuICAncHJvZ3Jlc3NTdGVwcycsXG4gICdyZXR1cm5Gb2N1cycsXG4gICdyZXZlcnNlQnV0dG9ucycsXG4gICdzaG93Q2FuY2VsQnV0dG9uJyxcbiAgJ3Nob3dDbG9zZUJ1dHRvbicsXG4gICdzaG93Q29uZmlybUJ1dHRvbicsXG4gICdzaG93RGVueUJ1dHRvbicsXG4gICd0ZXh0JyxcbiAgJ3RpdGxlJyxcbiAgJ3RpdGxlVGV4dCcsXG4gICd3aWxsQ2xvc2UnLFxuXVxuXG5leHBvcnQgY29uc3QgZGVwcmVjYXRlZFBhcmFtcyA9IHt9XG5cbmNvbnN0IHRvYXN0SW5jb21wYXRpYmxlUGFyYW1zID0gW1xuICAnYWxsb3dPdXRzaWRlQ2xpY2snLFxuICAnYWxsb3dFbnRlcktleScsXG4gICdiYWNrZHJvcCcsXG4gICdmb2N1c0NvbmZpcm0nLFxuICAnZm9jdXNEZW55JyxcbiAgJ2ZvY3VzQ2FuY2VsJyxcbiAgJ3JldHVybkZvY3VzJyxcbiAgJ2hlaWdodEF1dG8nLFxuICAna2V5ZG93bkxpc3RlbmVyQ2FwdHVyZScsXG5dXG5cbi8qKlxuICogSXMgdmFsaWQgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbGlkUGFyYW1ldGVyID0gKHBhcmFtTmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRQYXJhbXMsIHBhcmFtTmFtZSlcbn1cblxuLyoqXG4gKiBJcyB2YWxpZCBwYXJhbWV0ZXIgZm9yIFN3YWwudXBkYXRlKCkgbWV0aG9kXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VwZGF0YWJsZVBhcmFtZXRlciA9IChwYXJhbU5hbWUpID0+IHtcbiAgcmV0dXJuIHVwZGF0YWJsZVBhcmFtcy5pbmRleE9mKHBhcmFtTmFtZSkgIT09IC0xXG59XG5cbi8qKlxuICogSXMgZGVwcmVjYXRlZCBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbU5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRGVwcmVjYXRlZFBhcmFtZXRlciA9IChwYXJhbU5hbWUpID0+IHtcbiAgcmV0dXJuIGRlcHJlY2F0ZWRQYXJhbXNbcGFyYW1OYW1lXVxufVxuXG5jb25zdCBjaGVja0lmUGFyYW1Jc1ZhbGlkID0gKHBhcmFtKSA9PiB7XG4gIGlmICghaXNWYWxpZFBhcmFtZXRlcihwYXJhbSkpIHtcbiAgICB3YXJuKGBVbmtub3duIHBhcmFtZXRlciBcIiR7cGFyYW19XCJgKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrSWZUb2FzdFBhcmFtSXNWYWxpZCA9IChwYXJhbSkgPT4ge1xuICBpZiAodG9hc3RJbmNvbXBhdGlibGVQYXJhbXMuaW5jbHVkZXMocGFyYW0pKSB7XG4gICAgd2FybihgVGhlIHBhcmFtZXRlciBcIiR7cGFyYW19XCIgaXMgaW5jb21wYXRpYmxlIHdpdGggdG9hc3RzYClcbiAgfVxufVxuXG5jb25zdCBjaGVja0lmUGFyYW1Jc0RlcHJlY2F0ZWQgPSAocGFyYW0pID0+IHtcbiAgaWYgKGlzRGVwcmVjYXRlZFBhcmFtZXRlcihwYXJhbSkpIHtcbiAgICB3YXJuQWJvdXREZXByZWNhdGlvbihwYXJhbSwgaXNEZXByZWNhdGVkUGFyYW1ldGVyKHBhcmFtKSlcbiAgfVxufVxuXG4vKipcbiAqIFNob3cgcmVsZXZhbnQgd2FybmluZ3MgZm9yIGdpdmVuIHBhcmFtc1xuICpcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3dXYXJuaW5nc0ZvclBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgaWYgKCFwYXJhbXMuYmFja2Ryb3AgJiYgcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSB7XG4gICAgd2FybignXCJhbGxvd091dHNpZGVDbGlja1wiIHBhcmFtZXRlciByZXF1aXJlcyBgYmFja2Ryb3BgIHBhcmFtZXRlciB0byBiZSBzZXQgdG8gYHRydWVgJylcbiAgfVxuXG4gIGZvciAoY29uc3QgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgY2hlY2tJZlBhcmFtSXNWYWxpZChwYXJhbSlcblxuICAgIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICAgIGNoZWNrSWZUb2FzdFBhcmFtSXNWYWxpZChwYXJhbSlcbiAgICB9XG5cbiAgICBjaGVja0lmUGFyYW1Jc0RlcHJlY2F0ZWQocGFyYW0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFBhcmFtc1xuIiwiZXhwb3J0IGNvbnN0IHN3YWxQcmVmaXggPSAnc3dhbDItJ1xuXG5leHBvcnQgY29uc3QgcHJlZml4ID0gKGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGZvciAoY29uc3QgaSBpbiBpdGVtcykge1xuICAgIHJlc3VsdFtpdGVtc1tpXV0gPSBzd2FsUHJlZml4ICsgaXRlbXNbaV1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBjb25zdCBzd2FsQ2xhc3NlcyA9IHByZWZpeChbXG4gICdjb250YWluZXInLFxuICAnc2hvd24nLFxuICAnaGVpZ2h0LWF1dG8nLFxuICAnaW9zZml4JyxcbiAgJ3BvcHVwJyxcbiAgJ21vZGFsJyxcbiAgJ25vLWJhY2tkcm9wJyxcbiAgJ25vLXRyYW5zaXRpb24nLFxuICAndG9hc3QnLFxuICAndG9hc3Qtc2hvd24nLFxuICAnc2hvdycsXG4gICdoaWRlJyxcbiAgJ2Nsb3NlJyxcbiAgJ3RpdGxlJyxcbiAgJ2h0bWwtY29udGFpbmVyJyxcbiAgJ2FjdGlvbnMnLFxuICAnY29uZmlybScsXG4gICdkZW55JyxcbiAgJ2NhbmNlbCcsXG4gICdkZWZhdWx0LW91dGxpbmUnLFxuICAnZm9vdGVyJyxcbiAgJ2ljb24nLFxuICAnaWNvbi1jb250ZW50JyxcbiAgJ2ltYWdlJyxcbiAgJ2lucHV0JyxcbiAgJ2ZpbGUnLFxuICAncmFuZ2UnLFxuICAnc2VsZWN0JyxcbiAgJ3JhZGlvJyxcbiAgJ2NoZWNrYm94JyxcbiAgJ2xhYmVsJyxcbiAgJ3RleHRhcmVhJyxcbiAgJ2lucHV0ZXJyb3InLFxuICAnaW5wdXQtbGFiZWwnLFxuICAndmFsaWRhdGlvbi1tZXNzYWdlJyxcbiAgJ3Byb2dyZXNzLXN0ZXBzJyxcbiAgJ2FjdGl2ZS1wcm9ncmVzcy1zdGVwJyxcbiAgJ3Byb2dyZXNzLXN0ZXAnLFxuICAncHJvZ3Jlc3Mtc3RlcC1saW5lJyxcbiAgJ2xvYWRlcicsXG4gICdsb2FkaW5nJyxcbiAgJ3N0eWxlZCcsXG4gICd0b3AnLFxuICAndG9wLXN0YXJ0JyxcbiAgJ3RvcC1lbmQnLFxuICAndG9wLWxlZnQnLFxuICAndG9wLXJpZ2h0JyxcbiAgJ2NlbnRlcicsXG4gICdjZW50ZXItc3RhcnQnLFxuICAnY2VudGVyLWVuZCcsXG4gICdjZW50ZXItbGVmdCcsXG4gICdjZW50ZXItcmlnaHQnLFxuICAnYm90dG9tJyxcbiAgJ2JvdHRvbS1zdGFydCcsXG4gICdib3R0b20tZW5kJyxcbiAgJ2JvdHRvbS1sZWZ0JyxcbiAgJ2JvdHRvbS1yaWdodCcsXG4gICdncm93LXJvdycsXG4gICdncm93LWNvbHVtbicsXG4gICdncm93LWZ1bGxzY3JlZW4nLFxuICAncnRsJyxcbiAgJ3RpbWVyLXByb2dyZXNzLWJhcicsXG4gICd0aW1lci1wcm9ncmVzcy1iYXItY29udGFpbmVyJyxcbiAgJ3Njcm9sbGJhci1tZWFzdXJlJyxcbiAgJ2ljb24tc3VjY2VzcycsXG4gICdpY29uLXdhcm5pbmcnLFxuICAnaWNvbi1pbmZvJyxcbiAgJ2ljb24tcXVlc3Rpb24nLFxuICAnaWNvbi1lcnJvcicsXG5dKVxuXG5leHBvcnQgY29uc3QgaWNvblR5cGVzID0gcHJlZml4KFsnc3VjY2VzcycsICd3YXJuaW5nJywgJ2luZm8nLCAncXVlc3Rpb24nLCAnZXJyb3InXSlcbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHRvQXJyYXksIHVuaXF1ZUFycmF5IH0gZnJvbSAnLi4vdXRpbHMuanMnXG5pbXBvcnQgeyBoYXNDbGFzcywgaXNWaXNpYmxlIH0gZnJvbSAnLi9kb21VdGlscy5qcydcblxuLyoqXG4gKiBHZXRzIHRoZSBwb3B1cCBjb250YWluZXIgd2hpY2ggY29udGFpbnMgdGhlIGJhY2tkcm9wIGFuZCB0aGUgcG9wdXAgaXRzZWxmLlxuICpcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb250YWluZXIgPSAoKSA9PiBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmNvbnRhaW5lcn1gKVxuXG5leHBvcnQgY29uc3QgZWxlbWVudEJ5U2VsZWN0b3IgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKClcbiAgcmV0dXJuIGNvbnRhaW5lciA/IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKSA6IG51bGxcbn1cblxuY29uc3QgZWxlbWVudEJ5Q2xhc3MgPSAoY2xhc3NOYW1lKSA9PiB7XG4gIHJldHVybiBlbGVtZW50QnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG59XG5cbmV4cG9ydCBjb25zdCBnZXRQb3B1cCA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLnBvcHVwKVxuXG5leHBvcnQgY29uc3QgZ2V0SWNvbiA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmljb24pXG5cbmV4cG9ydCBjb25zdCBnZXRUaXRsZSA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLnRpdGxlKVxuXG5leHBvcnQgY29uc3QgZ2V0SHRtbENvbnRhaW5lciA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddKVxuXG5leHBvcnQgY29uc3QgZ2V0SW1hZ2UgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5pbWFnZSlcblxuZXhwb3J0IGNvbnN0IGdldFByb2dyZXNzU3RlcHMgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcHMnXSlcblxuZXhwb3J0IGNvbnN0IGdldFZhbGlkYXRpb25NZXNzYWdlID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddKVxuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlybUJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfSAuJHtzd2FsQ2xhc3Nlcy5jb25maXJtfWApXG5cbmV4cG9ydCBjb25zdCBnZXREZW55QnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmFjdGlvbnN9IC4ke3N3YWxDbGFzc2VzLmRlbnl9YClcblxuZXhwb3J0IGNvbnN0IGdldElucHV0TGFiZWwgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1snaW5wdXQtbGFiZWwnXSlcblxuZXhwb3J0IGNvbnN0IGdldExvYWRlciA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5sb2FkZXJ9YClcblxuZXhwb3J0IGNvbnN0IGdldENhbmNlbEJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfSAuJHtzd2FsQ2xhc3Nlcy5jYW5jZWx9YClcblxuZXhwb3J0IGNvbnN0IGdldEFjdGlvbnMgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5hY3Rpb25zKVxuXG5leHBvcnQgY29uc3QgZ2V0Rm9vdGVyID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuZm9vdGVyKVxuXG5leHBvcnQgY29uc3QgZ2V0VGltZXJQcm9ncmVzc0JhciA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXInXSlcblxuZXhwb3J0IGNvbnN0IGdldENsb3NlQnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuY2xvc2UpXG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qa3VwL2ZvY3VzYWJsZS9ibG9iL21hc3Rlci9pbmRleC5qc1xuY29uc3QgZm9jdXNhYmxlID0gYFxuICBhW2hyZWZdLFxuICBhcmVhW2hyZWZdLFxuICBpbnB1dDpub3QoW2Rpc2FibGVkXSksXG4gIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksXG4gIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxcbiAgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSxcbiAgaWZyYW1lLFxuICBvYmplY3QsXG4gIGVtYmVkLFxuICBbdGFiaW5kZXg9XCIwXCJdLFxuICBbY29udGVudGVkaXRhYmxlXSxcbiAgYXVkaW9bY29udHJvbHNdLFxuICB2aWRlb1tjb250cm9sc10sXG4gIHN1bW1hcnlcbmBcblxuZXhwb3J0IGNvbnN0IGdldEZvY3VzYWJsZUVsZW1lbnRzID0gKCkgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50c1dpdGhUYWJpbmRleCA9IHRvQXJyYXkoXG4gICAgZ2V0UG9wdXAoKS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSk6bm90KFt0YWJpbmRleD1cIjBcIl0pJylcbiAgKVxuICAgIC8vIHNvcnQgYWNjb3JkaW5nIHRvIHRhYmluZGV4XG4gICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHRhYmluZGV4QSA9IHBhcnNlSW50KGEuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgY29uc3QgdGFiaW5kZXhCID0gcGFyc2VJbnQoYi5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICBpZiAodGFiaW5kZXhBID4gdGFiaW5kZXhCKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKHRhYmluZGV4QSA8IHRhYmluZGV4Qikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIHJldHVybiAwXG4gICAgfSlcblxuICBjb25zdCBvdGhlckZvY3VzYWJsZUVsZW1lbnRzID0gdG9BcnJheShnZXRQb3B1cCgpLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlKSkuZmlsdGVyKFxuICAgIChlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpICE9PSAnLTEnXG4gIClcblxuICByZXR1cm4gdW5pcXVlQXJyYXkoZm9jdXNhYmxlRWxlbWVudHNXaXRoVGFiaW5kZXguY29uY2F0KG90aGVyRm9jdXNhYmxlRWxlbWVudHMpKS5maWx0ZXIoKGVsKSA9PiBpc1Zpc2libGUoZWwpKVxufVxuXG5leHBvcnQgY29uc3QgaXNNb2RhbCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBoYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5zaG93bikgJiZcbiAgICAhaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ10pICYmXG4gICAgIWhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddKVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBpc1RvYXN0ID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0UG9wdXAoKSAmJiBoYXNDbGFzcyhnZXRQb3B1cCgpLCBzd2FsQ2xhc3Nlcy50b2FzdClcbn1cblxuZXhwb3J0IGNvbnN0IGlzTG9hZGluZyA9ICgpID0+IHtcbiAgcmV0dXJuIGdldFBvcHVwKCkuaGFzQXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnKVxufVxuIiwiaW1wb3J0IHsgZ2V0Q2FuY2VsQnV0dG9uLCBnZXRDb25maXJtQnV0dG9uLCBnZXREZW55QnV0dG9uLCBnZXRUaW1lclByb2dyZXNzQmFyIH0gZnJvbSAnLi9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgaWNvblR5cGVzLCBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyB0b0FycmF5LCB3YXJuIH0gZnJvbSAnLi4vdXRpbHMuanMnXG5cbi8vIFJlbWVtYmVyIHN0YXRlIGluIGNhc2VzIHdoZXJlIG9wZW5pbmcgYW5kIGhhbmRsaW5nIGEgbW9kYWwgd2lsbCBmaWRkbGUgd2l0aCBpdC5cbmV4cG9ydCBjb25zdCBzdGF0ZXMgPSB7XG4gIHByZXZpb3VzQm9keVBhZGRpbmc6IG51bGwsXG59XG5cbi8qKlxuICogU2VjdXJlbHkgc2V0IGlubmVySFRNTCBvZiBhbiBlbGVtZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE5MjZcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuICovXG5leHBvcnQgY29uc3Qgc2V0SW5uZXJIdG1sID0gKGVsZW0sIGh0bWwpID0+IHtcbiAgZWxlbS50ZXh0Q29udGVudCA9ICcnXG4gIGlmIChodG1sKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBgdGV4dC9odG1sYClcbiAgICB0b0FycmF5KHBhcnNlZC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgICB0b0FycmF5KHBhcnNlZC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQ2xhc3MgPSAoZWxlbSwgY2xhc3NOYW1lKSA9PiB7XG4gIGlmICghY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgY2xhc3NMaXN0ID0gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTGlzdFtpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZW1vdmVDdXN0b21DbGFzc2VzID0gKGVsZW0sIHBhcmFtcykgPT4ge1xuICB0b0FycmF5KGVsZW0uY2xhc3NMaXN0KS5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAhT2JqZWN0LnZhbHVlcyhzd2FsQ2xhc3NlcykuaW5jbHVkZXMoY2xhc3NOYW1lKSAmJlxuICAgICAgIU9iamVjdC52YWx1ZXMoaWNvblR5cGVzKS5pbmNsdWRlcyhjbGFzc05hbWUpICYmXG4gICAgICAhT2JqZWN0LnZhbHVlcyhwYXJhbXMuc2hvd0NsYXNzKS5pbmNsdWRlcyhjbGFzc05hbWUpXG4gICAgKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFwcGx5Q3VzdG9tQ2xhc3MgPSAoZWxlbSwgcGFyYW1zLCBjbGFzc05hbWUpID0+IHtcbiAgcmVtb3ZlQ3VzdG9tQ2xhc3NlcyhlbGVtLCBwYXJhbXMpXG5cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcyAmJiBwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXSkge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zLmN1c3RvbUNsYXNzW2NsYXNzTmFtZV0gIT09ICdzdHJpbmcnICYmICFwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXS5mb3JFYWNoKSB7XG4gICAgICByZXR1cm4gd2FybihcbiAgICAgICAgYEludmFsaWQgdHlwZSBvZiBjdXN0b21DbGFzcy4ke2NsYXNzTmFtZX0hIEV4cGVjdGVkIHN0cmluZyBvciBpdGVyYWJsZSBvYmplY3QsIGdvdCBcIiR7dHlwZW9mIHBhcmFtcy5jdXN0b21DbGFzc1tcbiAgICAgICAgICBjbGFzc05hbWVcbiAgICAgICAgXX1cImBcbiAgICAgIClcbiAgICB9XG5cbiAgICBhZGRDbGFzcyhlbGVtLCBwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBvcHVwXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRUeXBlXG4gKiBAcmV0dXJucyB7SFRNTElucHV0RWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRJbnB1dCA9IChwb3B1cCwgaW5wdXRUeXBlKSA9PiB7XG4gIGlmICghaW5wdXRUeXBlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBzd2l0Y2ggKGlucHV0VHlwZSkge1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgY2FzZSAndGV4dGFyZWEnOlxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzW2lucHV0VHlwZV19YClcbiAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMuY2hlY2tib3h9IGlucHV0YClcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5yYWRpb30gaW5wdXQ6Y2hlY2tlZGApIHx8XG4gICAgICAgIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLnJhZGlvfSBpbnB1dDpmaXJzdC1jaGlsZGApXG4gICAgICApXG4gICAgY2FzZSAncmFuZ2UnOlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLnJhbmdlfSBpbnB1dGApXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5pbnB1dH1gKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICovXG5leHBvcnQgY29uc3QgZm9jdXNJbnB1dCA9IChpbnB1dCkgPT4ge1xuICBpbnB1dC5mb2N1cygpXG5cbiAgLy8gcGxhY2UgY3Vyc29yIGF0IGVuZCBvZiB0ZXh0IGluIHRleHQgaW5wdXRcbiAgaWYgKGlucHV0LnR5cGUgIT09ICdmaWxlJykge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIzNDU5MTVcbiAgICBjb25zdCB2YWwgPSBpbnB1dC52YWx1ZVxuICAgIGlucHV0LnZhbHVlID0gJydcbiAgICBpbnB1dC52YWx1ZSA9IHZhbFxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50W10gfCBudWxsfSB0YXJnZXRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGNsYXNzTGlzdFxuICogQHBhcmFtIHtib29sZWFufSBjb25kaXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUNsYXNzID0gKHRhcmdldCwgY2xhc3NMaXN0LCBjb25kaXRpb24pID0+IHtcbiAgaWYgKCF0YXJnZXQgfHwgIWNsYXNzTGlzdCkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnc3RyaW5nJykge1xuICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKVxuICB9XG4gIGNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICB0YXJnZXQuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25kaXRpb24gPyBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSA6IGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25kaXRpb24gPyB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpIDogdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGx9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gY2xhc3NMaXN0XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDbGFzcyA9ICh0YXJnZXQsIGNsYXNzTGlzdCkgPT4ge1xuICB0b2dnbGVDbGFzcyh0YXJnZXQsIGNsYXNzTGlzdCwgdHJ1ZSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGx9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gY2xhc3NMaXN0XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDbGFzcyA9ICh0YXJnZXQsIGNsYXNzTGlzdCkgPT4ge1xuICB0b2dnbGVDbGFzcyh0YXJnZXQsIGNsYXNzTGlzdCwgZmFsc2UpXG59XG5cbi8qKlxuICogR2V0IGRpcmVjdCBjaGlsZCBvZiBhbiBlbGVtZW50IGJ5IGNsYXNzIG5hbWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzID0gKGVsZW0sIGNsYXNzTmFtZSkgPT4ge1xuICBjb25zdCBjaGlsZE5vZGVzID0gdG9BcnJheShlbGVtLmNoaWxkTm9kZXMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNDbGFzcyhjaGlsZE5vZGVzW2ldLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gY2hpbGROb2Rlc1tpXVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgYXBwbHlOdW1lcmljYWxTdHlsZSA9IChlbGVtLCBwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlID09PSBgJHtwYXJzZUludCh2YWx1ZSl9YCkge1xuICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpXG4gIH1cbiAgaWYgKHZhbHVlIHx8IHBhcnNlSW50KHZhbHVlKSA9PT0gMCkge1xuICAgIGVsZW0uc3R5bGVbcHJvcGVydHldID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IGAke3ZhbHVlfXB4YCA6IHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgZWxlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gKGVsZW0sIGRpc3BsYXkgPSAnZmxleCcpID0+IHtcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSAoZWxlbSkgPT4ge1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cblxuZXhwb3J0IGNvbnN0IHNldFN0eWxlID0gKHBhcmVudCwgc2VsZWN0b3IsIHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBlbCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICBpZiAoZWwpIHtcbiAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGUgPSAoZWxlbSwgY29uZGl0aW9uLCBkaXNwbGF5KSA9PiB7XG4gIGNvbmRpdGlvbiA/IHNob3coZWxlbSwgZGlzcGxheSkgOiBoaWRlKGVsZW0pXG59XG5cbi8vIGJvcnJvd2VkIGZyb20ganF1ZXJ5ICQoZWxlbSkuaXMoJzp2aXNpYmxlJykgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBjb25zdCBpc1Zpc2libGUgPSAoZWxlbSkgPT4gISEoZWxlbSAmJiAoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKSlcblxuZXhwb3J0IGNvbnN0IGFsbEJ1dHRvbnNBcmVIaWRkZW4gPSAoKSA9PlxuICAhaXNWaXNpYmxlKGdldENvbmZpcm1CdXR0b24oKSkgJiYgIWlzVmlzaWJsZShnZXREZW55QnV0dG9uKCkpICYmICFpc1Zpc2libGUoZ2V0Q2FuY2VsQnV0dG9uKCkpXG5cbmV4cG9ydCBjb25zdCBpc1Njcm9sbGFibGUgPSAoZWxlbSkgPT4gISEoZWxlbS5zY3JvbGxIZWlnaHQgPiBlbGVtLmNsaWVudEhlaWdodClcblxuLy8gYm9ycm93ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDYzNTIxMTlcbmV4cG9ydCBjb25zdCBoYXNDc3NBbmltYXRpb24gPSAoZWxlbSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG5cbiAgY29uc3QgYW5pbUR1cmF0aW9uID0gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdhbmltYXRpb24tZHVyYXRpb24nKSB8fCAnMCcpXG4gIGNvbnN0IHRyYW5zRHVyYXRpb24gPSBwYXJzZUZsb2F0KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zaXRpb24tZHVyYXRpb24nKSB8fCAnMCcpXG5cbiAgcmV0dXJuIGFuaW1EdXJhdGlvbiA+IDAgfHwgdHJhbnNEdXJhdGlvbiA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IGFuaW1hdGVUaW1lclByb2dyZXNzQmFyID0gKHRpbWVyLCByZXNldCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBnZXRUaW1lclByb2dyZXNzQmFyKClcbiAgaWYgKGlzVmlzaWJsZSh0aW1lclByb2dyZXNzQmFyKSkge1xuICAgIGlmIChyZXNldCkge1xuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoICR7dGltZXIgLyAxMDAwfXMgbGluZWFyYFxuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcwJSdcbiAgICB9LCAxMClcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyUHJvZ3Jlc3NCYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBnZXRUaW1lclByb2dyZXNzQmFyKClcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhcldpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGltZXJQcm9ncmVzc0Jhcikud2lkdGgpXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24nKVxuICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXJGdWxsV2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aW1lclByb2dyZXNzQmFyKS53aWR0aClcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhclBlcmNlbnQgPSAodGltZXJQcm9ncmVzc0JhcldpZHRoIC8gdGltZXJQcm9ncmVzc0JhckZ1bGxXaWR0aCkgKiAxMDBcbiAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbicpXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHt0aW1lclByb2dyZXNzQmFyUGVyY2VudH0lYFxufVxuIiwiLyoqXG4gKiBEZXRlY3QgTm9kZSBlbnZcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZUVudiA9ICgpID0+IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCdcbiIsImV4cG9ydCBjb25zdCBSRVNUT1JFX0ZPQ1VTX1RJTUVPVVQgPSAxMDBcbiIsImltcG9ydCB7IFJFU1RPUkVfRk9DVVNfVElNRU9VVCB9IGZyb20gJy4vY29uc3RhbnRzLmpzJ1xuXG5jb25zdCBnbG9iYWxTdGF0ZSA9IHt9XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFN0YXRlXG5cbmNvbnN0IGZvY3VzUHJldmlvdXNBY3RpdmVFbGVtZW50ID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ICYmIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cykge1xuICAgIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpXG4gICAgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gbnVsbFxuICB9IGVsc2UgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICBkb2N1bWVudC5ib2R5LmZvY3VzKClcbiAgfVxufVxuXG4vLyBSZXN0b3JlIHByZXZpb3VzIGFjdGl2ZSAoZm9jdXNlZCkgZWxlbWVudFxuZXhwb3J0IGNvbnN0IHJlc3RvcmVBY3RpdmVFbGVtZW50ID0gKHJldHVybkZvY3VzKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGlmICghcmV0dXJuRm9jdXMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICB9XG4gICAgY29uc3QgeCA9IHdpbmRvdy5zY3JvbGxYXG4gICAgY29uc3QgeSA9IHdpbmRvdy5zY3JvbGxZXG5cbiAgICBnbG9iYWxTdGF0ZS5yZXN0b3JlRm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb2N1c1ByZXZpb3VzQWN0aXZlRWxlbWVudCgpXG4gICAgICByZXNvbHZlKClcbiAgICB9LCBSRVNUT1JFX0ZPQ1VTX1RJTUVPVVQpIC8vIGlzc3Vlcy85MDBcblxuICAgIHdpbmRvdy5zY3JvbGxUbyh4LCB5KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZ2V0Q29udGFpbmVyLCBnZXRQb3B1cCB9IGZyb20gJy4vZ2V0dGVycy5qcydcbmltcG9ydCB7IGFkZENsYXNzLCBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MsIHJlbW92ZUNsYXNzLCBzZXRJbm5lckh0bWwgfSBmcm9tICcuL2RvbVV0aWxzLmpzJ1xuaW1wb3J0IHsgaXNOb2RlRW52IH0gZnJvbSAnLi4vaXNOb2RlRW52LmpzJ1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICcuLi91dGlscy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi8uLi9nbG9iYWxTdGF0ZS5qcydcblxuY29uc3Qgc3dlZXRIVE1MID0gYFxuIDxkaXYgYXJpYS1sYWJlbGxlZGJ5PVwiJHtzd2FsQ2xhc3Nlcy50aXRsZX1cIiBhcmlhLWRlc2NyaWJlZGJ5PVwiJHtzd2FsQ2xhc3Nlc1snaHRtbC1jb250YWluZXInXX1cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMucG9wdXB9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmNsb3NlfVwiPjwvYnV0dG9uPlxuICAgPHVsIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcHMnXX1cIj48L3VsPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuaWNvbn1cIj48L2Rpdj5cbiAgIDxpbWcgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmltYWdlfVwiIC8+XG4gICA8aDIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnRpdGxlfVwiIGlkPVwiJHtzd2FsQ2xhc3Nlcy50aXRsZX1cIj48L2gyPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ2h0bWwtY29udGFpbmVyJ119XCIgaWQ9XCIke3N3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddfVwiPjwvZGl2PlxuICAgPGlucHV0IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5pbnB1dH1cIiAvPlxuICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmZpbGV9XCIgLz5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnJhbmdlfVwiPlxuICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgLz5cbiAgICAgPG91dHB1dD48L291dHB1dD5cbiAgIDwvZGl2PlxuICAgPHNlbGVjdCBjbGFzcz1cIiR7c3dhbENsYXNzZXMuc2VsZWN0fVwiPjwvc2VsZWN0PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMucmFkaW99XCI+PC9kaXY+XG4gICA8bGFiZWwgZm9yPVwiJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH1cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY2hlY2tib3h9XCI+XG4gICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICA8c3BhbiBjbGFzcz1cIiR7c3dhbENsYXNzZXMubGFiZWx9XCI+PC9zcGFuPlxuICAgPC9sYWJlbD5cbiAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7c3dhbENsYXNzZXMudGV4dGFyZWF9XCI+PC90ZXh0YXJlYT5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXX1cIiBpZD1cIiR7c3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddfVwiPjwvZGl2PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuYWN0aW9uc31cIj5cbiAgICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMubG9hZGVyfVwiPjwvZGl2PlxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY29uZmlybX1cIj48L2J1dHRvbj5cbiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmRlbnl9XCI+PC9idXR0b24+XG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5jYW5jZWx9XCI+PC9idXR0b24+XG4gICA8L2Rpdj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmZvb3Rlcn1cIj48L2Rpdj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXItY29udGFpbmVyJ119XCI+XG4gICAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXInXX1cIj48L2Rpdj5cbiAgIDwvZGl2PlxuIDwvZGl2PlxuYC5yZXBsYWNlKC8oXnxcXG4pXFxzKi9nLCAnJylcblxuY29uc3QgcmVzZXRPbGRDb250YWluZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG9sZENvbnRhaW5lciA9IGdldENvbnRhaW5lcigpXG4gIGlmICghb2xkQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBvbGRDb250YWluZXIucmVtb3ZlKClcbiAgcmVtb3ZlQ2xhc3MoXG4gICAgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sXG4gICAgW3N3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXSwgc3dhbENsYXNzZXNbJ2hhcy1jb2x1bW4nXV1cbiAgKVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UgPSAoKSA9PiB7XG4gIGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZS5yZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbn1cblxuY29uc3QgYWRkSW5wdXRDaGFuZ2VMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZ2V0UG9wdXAoKVxuXG4gIGNvbnN0IGlucHV0ID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5pbnB1dClcbiAgY29uc3QgZmlsZSA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuZmlsZSlcbiAgY29uc3QgcmFuZ2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5yYW5nZX0gaW5wdXRgKVxuICBjb25zdCByYW5nZU91dHB1dCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnJhbmdlfSBvdXRwdXRgKVxuICBjb25zdCBzZWxlY3QgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnNlbGVjdClcbiAgY29uc3QgY2hlY2tib3ggPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH0gaW5wdXRgKVxuICBjb25zdCB0ZXh0YXJlYSA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMudGV4dGFyZWEpXG5cbiAgaW5wdXQub25pbnB1dCA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgZmlsZS5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgc2VsZWN0Lm9uY2hhbmdlID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuICBjaGVja2JveC5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgdGV4dGFyZWEub25pbnB1dCA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcblxuICByYW5nZS5vbmlucHV0ID0gKCkgPT4ge1xuICAgIHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxuICAgIHJhbmdlT3V0cHV0LnZhbHVlID0gcmFuZ2UudmFsdWVcbiAgfVxuXG4gIHJhbmdlLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgIHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxuICAgIHJhbmdlLm5leHRTaWJsaW5nLnZhbHVlID0gcmFuZ2UudmFsdWVcbiAgfVxufVxuXG5jb25zdCBnZXRUYXJnZXQgPSAodGFyZ2V0KSA9PiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkgOiB0YXJnZXQpXG5cbmNvbnN0IHNldHVwQWNjZXNzaWJpbGl0eSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBnZXRQb3B1cCgpXG5cbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdyb2xlJywgcGFyYW1zLnRvYXN0ID8gJ2FsZXJ0JyA6ICdkaWFsb2cnKVxuICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsIHBhcmFtcy50b2FzdCA/ICdwb2xpdGUnIDogJ2Fzc2VydGl2ZScpXG4gIGlmICghcGFyYW1zLnRvYXN0KSB7XG4gICAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKVxuICB9XG59XG5cbmNvbnN0IHNldHVwUlRMID0gKHRhcmdldEVsZW1lbnQpID0+IHtcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsZW1lbnQpLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICBhZGRDbGFzcyhnZXRDb250YWluZXIoKSwgc3dhbENsYXNzZXMucnRsKVxuICB9XG59XG5cbi8qXG4gKiBBZGQgbW9kYWwgKyBiYWNrZHJvcCB0byBET01cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAocGFyYW1zKSA9PiB7XG4gIC8vIENsZWFuIHVwIHRoZSBvbGQgcG9wdXAgY29udGFpbmVyIGlmIGl0IGV4aXN0c1xuICBjb25zdCBvbGRDb250YWluZXJFeGlzdGVkID0gcmVzZXRPbGRDb250YWluZXIoKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNOb2RlRW52KCkpIHtcbiAgICBlcnJvcignU3dlZXRBbGVydDIgcmVxdWlyZXMgZG9jdW1lbnQgdG8gaW5pdGlhbGl6ZScpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb250YWluZXIuY2xhc3NOYW1lID0gc3dhbENsYXNzZXMuY29udGFpbmVyXG4gIGlmIChvbGRDb250YWluZXJFeGlzdGVkKSB7XG4gICAgYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1snbm8tdHJhbnNpdGlvbiddKVxuICB9XG4gIHNldElubmVySHRtbChjb250YWluZXIsIHN3ZWV0SFRNTClcblxuICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZ2V0VGFyZ2V0KHBhcmFtcy50YXJnZXQpXG4gIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXG4gIHNldHVwQWNjZXNzaWJpbGl0eShwYXJhbXMpXG4gIHNldHVwUlRMKHRhcmdldEVsZW1lbnQpXG4gIGFkZElucHV0Q2hhbmdlTGlzdGVuZXJzKClcbn1cbiIsImltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IG9iamVjdCB8IHN0cmluZ30gcGFyYW1cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VIdG1sVG9Db250YWluZXIgPSAocGFyYW0sIHRhcmdldCkgPT4ge1xuICAvLyBET00gZWxlbWVudFxuICBpZiAocGFyYW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChwYXJhbSlcbiAgfVxuXG4gIC8vIE9iamVjdFxuICBlbHNlIGlmICh0eXBlb2YgcGFyYW0gPT09ICdvYmplY3QnKSB7XG4gICAgaGFuZGxlT2JqZWN0KHBhcmFtLCB0YXJnZXQpXG4gIH1cblxuICAvLyBQbGFpbiBzdHJpbmdcbiAgZWxzZSBpZiAocGFyYW0pIHtcbiAgICBzZXRJbm5lckh0bWwodGFyZ2V0LCBwYXJhbSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKi9cbmNvbnN0IGhhbmRsZU9iamVjdCA9IChwYXJhbSwgdGFyZ2V0KSA9PiB7XG4gIC8vIEpRdWVyeSBlbGVtZW50KHMpXG4gIGlmIChwYXJhbS5qcXVlcnkpIHtcbiAgICBoYW5kbGVKcXVlcnlFbGVtKHRhcmdldCwgcGFyYW0pXG4gIH1cblxuICAvLyBGb3Igb3RoZXIgb2JqZWN0cyB1c2UgdGhlaXIgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gIGVsc2Uge1xuICAgIHNldElubmVySHRtbCh0YXJnZXQsIHBhcmFtLnRvU3RyaW5nKCkpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlSnF1ZXJ5RWxlbSA9ICh0YXJnZXQsIGVsZW0pID0+IHtcbiAgdGFyZ2V0LnRleHRDb250ZW50ID0gJydcbiAgaWYgKDAgaW4gZWxlbSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIGluIGVsZW07IGkrKykge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1baV0uY2xvbmVOb2RlKHRydWUpKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWxlbS5jbG9uZU5vZGUodHJ1ZSkpXG4gIH1cbn1cbiIsImltcG9ydCB7IGlzTm9kZUVudiB9IGZyb20gJy4uL2lzTm9kZUVudi5qcydcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkVuZEV2ZW50ID0gKCgpID0+IHtcbiAgLy8gUHJldmVudCBydW4gaW4gTm9kZSBlbnZcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc05vZGVFbnYoKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3QgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgIFdlYmtpdEFuaW1hdGlvbjogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsIC8vIENocm9tZSwgU2FmYXJpIGFuZCBPcGVyYVxuICAgIGFuaW1hdGlvbjogJ2FuaW1hdGlvbmVuZCcsIC8vIFN0YW5kYXJkIHN5bnRheFxuICB9XG4gIGZvciAoY29uc3QgaSBpbiB0cmFuc0VuZEV2ZW50TmFtZXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRyYW5zRW5kRXZlbnROYW1lcywgaSkgJiYgdHlwZW9mIHRlc3RFbC5zdHlsZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbaV1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn0pKClcbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcblxuLy8gTWVhc3VyZSBzY3JvbGxiYXIgd2lkdGggZm9yIHBhZGRpbmcgYm9keSBkdXJpbmcgbW9kYWwgc2hvdy9oaWRlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvanMvc3JjL21vZGFsLmpzXG5leHBvcnQgY29uc3QgbWVhc3VyZVNjcm9sbGJhciA9ICgpID0+IHtcbiAgY29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzWydzY3JvbGxiYXItbWVhc3VyZSddXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KVxuICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aFxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJBY3Rpb25zID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IGRvbS5nZXRBY3Rpb25zKClcbiAgY29uc3QgbG9hZGVyID0gZG9tLmdldExvYWRlcigpXG5cbiAgLy8gQWN0aW9ucyAoYnV0dG9ucykgd3JhcHBlclxuICBpZiAoIXBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiAmJiAhcGFyYW1zLnNob3dEZW55QnV0dG9uICYmICFwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgIGRvbS5oaWRlKGFjdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgZG9tLnNob3coYWN0aW9ucylcbiAgfVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhhY3Rpb25zLCBwYXJhbXMsICdhY3Rpb25zJylcblxuICAvLyBSZW5kZXIgYWxsIHRoZSBidXR0b25zXG4gIHJlbmRlckJ1dHRvbnMoYWN0aW9ucywgbG9hZGVyLCBwYXJhbXMpXG5cbiAgLy8gTG9hZGVyXG4gIGRvbS5zZXRJbm5lckh0bWwobG9hZGVyLCBwYXJhbXMubG9hZGVySHRtbClcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MobG9hZGVyLCBwYXJhbXMsICdsb2FkZXInKVxufVxuXG5mdW5jdGlvbiByZW5kZXJCdXR0b25zKGFjdGlvbnMsIGxvYWRlciwgcGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb20uZ2V0Q29uZmlybUJ1dHRvbigpXG4gIGNvbnN0IGRlbnlCdXR0b24gPSBkb20uZ2V0RGVueUJ1dHRvbigpXG4gIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvbS5nZXRDYW5jZWxCdXR0b24oKVxuXG4gIC8vIFJlbmRlciBidXR0b25zXG4gIHJlbmRlckJ1dHRvbihjb25maXJtQnV0dG9uLCAnY29uZmlybScsIHBhcmFtcylcbiAgcmVuZGVyQnV0dG9uKGRlbnlCdXR0b24sICdkZW55JywgcGFyYW1zKVxuICByZW5kZXJCdXR0b24oY2FuY2VsQnV0dG9uLCAnY2FuY2VsJywgcGFyYW1zKVxuICBoYW5kbGVCdXR0b25zU3R5bGluZyhjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b24sIHBhcmFtcylcblxuICBpZiAocGFyYW1zLnJldmVyc2VCdXR0b25zKSB7XG4gICAgaWYgKHBhcmFtcy50b2FzdCkge1xuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoY2FuY2VsQnV0dG9uLCBjb25maXJtQnV0dG9uKVxuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoZGVueUJ1dHRvbiwgY29uZmlybUJ1dHRvbilcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoY2FuY2VsQnV0dG9uLCBsb2FkZXIpXG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShkZW55QnV0dG9uLCBsb2FkZXIpXG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShjb25maXJtQnV0dG9uLCBsb2FkZXIpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJ1dHRvbnNTdHlsaW5nKGNvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbiwgcGFyYW1zKSB7XG4gIGlmICghcGFyYW1zLmJ1dHRvbnNTdHlsaW5nKSB7XG4gICAgcmV0dXJuIGRvbS5yZW1vdmVDbGFzcyhbY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uXSwgc3dhbENsYXNzZXMuc3R5bGVkKVxuICB9XG5cbiAgZG9tLmFkZENsYXNzKFtjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b25dLCBzd2FsQ2xhc3Nlcy5zdHlsZWQpXG5cbiAgLy8gQnV0dG9ucyBiYWNrZ3JvdW5kIGNvbG9yc1xuICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIGNvbmZpcm1CdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvclxuICAgIGRvbS5hZGRDbGFzcyhjb25maXJtQnV0dG9uLCBzd2FsQ2xhc3Nlc1snZGVmYXVsdC1vdXRsaW5lJ10pXG4gIH1cbiAgaWYgKHBhcmFtcy5kZW55QnV0dG9uQ29sb3IpIHtcbiAgICBkZW55QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5kZW55QnV0dG9uQ29sb3JcbiAgICBkb20uYWRkQ2xhc3MoZGVueUJ1dHRvbiwgc3dhbENsYXNzZXNbJ2RlZmF1bHQtb3V0bGluZSddKVxuICB9XG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uQ29sb3IpIHtcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNhbmNlbEJ1dHRvbkNvbG9yXG4gICAgZG9tLmFkZENsYXNzKGNhbmNlbEJ1dHRvbiwgc3dhbENsYXNzZXNbJ2RlZmF1bHQtb3V0bGluZSddKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckJ1dHRvbihidXR0b24sIGJ1dHRvblR5cGUsIHBhcmFtcykge1xuICBkb20udG9nZ2xlKGJ1dHRvbiwgcGFyYW1zW2BzaG93JHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIoYnV0dG9uVHlwZSl9QnV0dG9uYF0sICdpbmxpbmUtYmxvY2snKVxuICBkb20uc2V0SW5uZXJIdG1sKGJ1dHRvbiwgcGFyYW1zW2Ake2J1dHRvblR5cGV9QnV0dG9uVGV4dGBdKSAvLyBTZXQgY2FwdGlvbiB0ZXh0XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwYXJhbXNbYCR7YnV0dG9uVHlwZX1CdXR0b25BcmlhTGFiZWxgXSkgLy8gQVJJQSBsYWJlbFxuXG4gIC8vIEFkZCBidXR0b25zIGN1c3RvbSBjbGFzc2VzXG4gIGJ1dHRvbi5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlc1tidXR0b25UeXBlXVxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhidXR0b24sIHBhcmFtcywgYCR7YnV0dG9uVHlwZX1CdXR0b25gKVxuICBkb20uYWRkQ2xhc3MoYnV0dG9uLCBwYXJhbXNbYCR7YnV0dG9uVHlwZX1CdXR0b25DbGFzc2BdKVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZnVuY3Rpb24gaGFuZGxlQmFja2Ryb3BQYXJhbShjb250YWluZXIsIGJhY2tkcm9wKSB7XG4gIGlmICh0eXBlb2YgYmFja2Ryb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSBiYWNrZHJvcFxuICB9IGVsc2UgaWYgKCFiYWNrZHJvcCkge1xuICAgIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10pXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUG9zaXRpb25QYXJhbShjb250YWluZXIsIHBvc2l0aW9uKSB7XG4gIGlmIChwb3NpdGlvbiBpbiBzd2FsQ2xhc3Nlcykge1xuICAgIGRvbS5hZGRDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzW3Bvc2l0aW9uXSlcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdUaGUgXCJwb3NpdGlvblwiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQsIGRlZmF1bHRpbmcgdG8gXCJjZW50ZXJcIicpXG4gICAgZG9tLmFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXMuY2VudGVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdyb3dQYXJhbShjb250YWluZXIsIGdyb3cpIHtcbiAgaWYgKGdyb3cgJiYgdHlwZW9mIGdyb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZ3Jvd0NsYXNzID0gYGdyb3ctJHtncm93fWBcbiAgICBpZiAoZ3Jvd0NsYXNzIGluIHN3YWxDbGFzc2VzKSB7XG4gICAgICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1tncm93Q2xhc3NdKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyQ29udGFpbmVyID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG5cbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGhhbmRsZUJhY2tkcm9wUGFyYW0oY29udGFpbmVyLCBwYXJhbXMuYmFja2Ryb3ApXG5cbiAgaGFuZGxlUG9zaXRpb25QYXJhbShjb250YWluZXIsIHBhcmFtcy5wb3NpdGlvbilcbiAgaGFuZGxlR3Jvd1BhcmFtKGNvbnRhaW5lciwgcGFyYW1zLmdyb3cpXG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGNvbnRhaW5lciwgcGFyYW1zLCAnY29udGFpbmVyJylcbn1cbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgYFdlYWtNYXBgcyBmb3IgZWFjaCBlZmZlY3RpdmVseS1cInByaXZhdGUgIHByb3BlcnR5XCIgdGhhdCBhIGBTd2FsYCBoYXMuXG4gKiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBwcml2YXRlIHByb3BlcnR5IFwiZm9vXCIgb2YgYHRoaXNgIHRvIFwiYmFyXCIsIHlvdSBjYW4gYHByaXZhdGVQcm9wcy5mb28uc2V0KHRoaXMsICdiYXInKWBcbiAqIFRoaXMgaXMgdGhlIGFwcHJvYWNoIHRoYXQgQmFiZWwgd2lsbCBwcm9iYWJseSB0YWtlIHRvIGltcGxlbWVudCBwcml2YXRlIG1ldGhvZHMvZmllbGRzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByaXZhdGUtbWV0aG9kc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvcHVsbC83NTU1XG4gKiBPbmNlIHdlIGhhdmUgdGhlIGNoYW5nZXMgZnJvbSB0aGF0IFBSIGluIEJhYmVsLCBhbmQgb3VyIGNvcmUgY2xhc3MgZml0cyByZWFzb25hYmxlIGluICpvbmUgbW9kdWxlKlxuICogICB0aGVuIHdlIGNhbiB1c2UgdGhhdCBsYW5ndWFnZSBmZWF0dXJlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXdhaXRpbmdQcm9taXNlOiBuZXcgV2Vha01hcCgpLFxuICBwcm9taXNlOiBuZXcgV2Vha01hcCgpLFxuICBpbm5lclBhcmFtczogbmV3IFdlYWtNYXAoKSxcbiAgZG9tQ2FjaGU6IG5ldyBXZWFrTWFwKCksXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBlcnJvciwgaXNQcm9taXNlLCB3YXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi8uLi8uLi9wcml2YXRlUHJvcHMuanMnXG5cbmNvbnN0IGlucHV0VHlwZXMgPSBbJ2lucHV0JywgJ2ZpbGUnLCAncmFuZ2UnLCAnc2VsZWN0JywgJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3RleHRhcmVhJ11cblxuZXhwb3J0IGNvbnN0IHJlbmRlcklucHV0ID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGNvbnN0IHJlcmVuZGVyID0gIWlubmVyUGFyYW1zIHx8IHBhcmFtcy5pbnB1dCAhPT0gaW5uZXJQYXJhbXMuaW5wdXRcblxuICBpbnB1dFR5cGVzLmZvckVhY2goKGlucHV0VHlwZSkgPT4ge1xuICAgIGNvbnN0IGlucHV0Q2xhc3MgPSBzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVdXG4gICAgY29uc3QgaW5wdXRDb250YWluZXIgPSBkb20uZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBpbnB1dENsYXNzKVxuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXNcbiAgICBzZXRBdHRyaWJ1dGVzKGlucHV0VHlwZSwgcGFyYW1zLmlucHV0QXR0cmlidXRlcylcblxuICAgIC8vIHNldCBjbGFzc1xuICAgIGlucHV0Q29udGFpbmVyLmNsYXNzTmFtZSA9IGlucHV0Q2xhc3NcblxuICAgIGlmIChyZXJlbmRlcikge1xuICAgICAgZG9tLmhpZGUoaW5wdXRDb250YWluZXIpXG4gICAgfVxuICB9KVxuXG4gIGlmIChwYXJhbXMuaW5wdXQpIHtcbiAgICBpZiAocmVyZW5kZXIpIHtcbiAgICAgIHNob3dJbnB1dChwYXJhbXMpXG4gICAgfVxuICAgIC8vIHNldCBjdXN0b20gY2xhc3NcbiAgICBzZXRDdXN0b21DbGFzcyhwYXJhbXMpXG4gIH1cbn1cblxuY29uc3Qgc2hvd0lucHV0ID0gKHBhcmFtcykgPT4ge1xuICBpZiAoIXJlbmRlcklucHV0VHlwZVtwYXJhbXMuaW5wdXRdKSB7XG4gICAgcmV0dXJuIGVycm9yKFxuICAgICAgYFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dCEgRXhwZWN0ZWQgXCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcIm51bWJlclwiLCBcInRlbFwiLCBcInNlbGVjdFwiLCBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiwgXCJ0ZXh0YXJlYVwiLCBcImZpbGVcIiBvciBcInVybFwiLCBnb3QgXCIke3BhcmFtcy5pbnB1dH1cImBcbiAgICApXG4gIH1cblxuICBjb25zdCBpbnB1dENvbnRhaW5lciA9IGdldElucHV0Q29udGFpbmVyKHBhcmFtcy5pbnB1dClcbiAgY29uc3QgaW5wdXQgPSByZW5kZXJJbnB1dFR5cGVbcGFyYW1zLmlucHV0XShpbnB1dENvbnRhaW5lciwgcGFyYW1zKVxuICBkb20uc2hvdyhpbnB1dClcblxuICAvLyBpbnB1dCBhdXRvZm9jdXNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9tLmZvY3VzSW5wdXQoaW5wdXQpXG4gIH0pXG59XG5cbmNvbnN0IHJlbW92ZUF0dHJpYnV0ZXMgPSAoaW5wdXQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXR0ck5hbWUgPSBpbnB1dC5hdHRyaWJ1dGVzW2ldLm5hbWVcbiAgICBpZiAoIVsndHlwZScsICd2YWx1ZScsICdzdHlsZSddLmluY2x1ZGVzKGF0dHJOYW1lKSkge1xuICAgICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzZXRBdHRyaWJ1dGVzID0gKGlucHV0VHlwZSwgaW5wdXRBdHRyaWJ1dGVzKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZG9tLmdldElucHV0KGRvbS5nZXRQb3B1cCgpLCBpbnB1dFR5cGUpXG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZXMoaW5wdXQpXG5cbiAgZm9yIChjb25zdCBhdHRyIGluIGlucHV0QXR0cmlidXRlcykge1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShhdHRyLCBpbnB1dEF0dHJpYnV0ZXNbYXR0cl0pXG4gIH1cbn1cblxuY29uc3Qgc2V0Q3VzdG9tQ2xhc3MgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZ2V0SW5wdXRDb250YWluZXIocGFyYW1zLmlucHV0KVxuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzKSB7XG4gICAgZG9tLmFkZENsYXNzKGlucHV0Q29udGFpbmVyLCBwYXJhbXMuY3VzdG9tQ2xhc3MuaW5wdXQpXG4gIH1cbn1cblxuY29uc3Qgc2V0SW5wdXRQbGFjZWhvbGRlciA9IChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gIGlmICghaW5wdXQucGxhY2Vob2xkZXIgfHwgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpIHtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyXG4gIH1cbn1cblxuY29uc3Qgc2V0SW5wdXRMYWJlbCA9IChpbnB1dCwgcHJlcGVuZFRvLCBwYXJhbXMpID0+IHtcbiAgaWYgKHBhcmFtcy5pbnB1dExhYmVsKSB7XG4gICAgaW5wdXQuaWQgPSBzd2FsQ2xhc3Nlcy5pbnB1dFxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSBzd2FsQ2xhc3Nlc1snaW5wdXQtbGFiZWwnXVxuICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgaW5wdXQuaWQpXG4gICAgbGFiZWwuY2xhc3NOYW1lID0gbGFiZWxDbGFzc1xuICAgIGRvbS5hZGRDbGFzcyhsYWJlbCwgcGFyYW1zLmN1c3RvbUNsYXNzLmlucHV0TGFiZWwpXG4gICAgbGFiZWwuaW5uZXJUZXh0ID0gcGFyYW1zLmlucHV0TGFiZWxcbiAgICBwcmVwZW5kVG8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIGxhYmVsKVxuICB9XG59XG5cbmNvbnN0IGdldElucHV0Q29udGFpbmVyID0gKGlucHV0VHlwZSkgPT4ge1xuICBjb25zdCBpbnB1dENsYXNzID0gc3dhbENsYXNzZXNbaW5wdXRUeXBlXSA/IHN3YWxDbGFzc2VzW2lucHV0VHlwZV0gOiBzd2FsQ2xhc3Nlcy5pbnB1dFxuICByZXR1cm4gZG9tLmdldERpcmVjdENoaWxkQnlDbGFzcyhkb20uZ2V0UG9wdXAoKSwgaW5wdXRDbGFzcylcbn1cblxuY29uc3QgcmVuZGVySW5wdXRUeXBlID0ge31cblxucmVuZGVySW5wdXRUeXBlLnRleHQgPVxuICByZW5kZXJJbnB1dFR5cGUuZW1haWwgPVxuICByZW5kZXJJbnB1dFR5cGUucGFzc3dvcmQgPVxuICByZW5kZXJJbnB1dFR5cGUubnVtYmVyID1cbiAgcmVuZGVySW5wdXRUeXBlLnRlbCA9XG4gIHJlbmRlcklucHV0VHlwZS51cmwgPVxuICAgIChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcy5pbnB1dFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcGFyYW1zLmlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJvbWlzZShwYXJhbXMuaW5wdXRWYWx1ZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBgVW5leHBlY3RlZCB0eXBlIG9mIGlucHV0VmFsdWUhIEV4cGVjdGVkIFwic3RyaW5nXCIsIFwibnVtYmVyXCIgb3IgXCJQcm9taXNlXCIsIGdvdCBcIiR7dHlwZW9mIHBhcmFtcy5pbnB1dFZhbHVlfVwiYFxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZXRJbnB1dExhYmVsKGlucHV0LCBpbnB1dCwgcGFyYW1zKVxuICAgICAgc2V0SW5wdXRQbGFjZWhvbGRlcihpbnB1dCwgcGFyYW1zKVxuICAgICAgaW5wdXQudHlwZSA9IHBhcmFtcy5pbnB1dFxuICAgICAgcmV0dXJuIGlucHV0XG4gICAgfVxuXG5yZW5kZXJJbnB1dFR5cGUuZmlsZSA9IChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gIHNldElucHV0TGFiZWwoaW5wdXQsIGlucHV0LCBwYXJhbXMpXG4gIHNldElucHV0UGxhY2Vob2xkZXIoaW5wdXQsIHBhcmFtcylcbiAgcmV0dXJuIGlucHV0XG59XG5cbnJlbmRlcklucHV0VHlwZS5yYW5nZSA9IChyYW5nZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHJhbmdlSW5wdXQgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gIGNvbnN0IHJhbmdlT3V0cHV0ID0gcmFuZ2UucXVlcnlTZWxlY3Rvcignb3V0cHV0JylcbiAgcmFuZ2VJbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gIHJhbmdlSW5wdXQudHlwZSA9IHBhcmFtcy5pbnB1dFxuICByYW5nZU91dHB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gIHNldElucHV0TGFiZWwocmFuZ2VJbnB1dCwgcmFuZ2UsIHBhcmFtcylcbiAgcmV0dXJuIHJhbmdlXG59XG5cbnJlbmRlcklucHV0VHlwZS5zZWxlY3QgPSAoc2VsZWN0LCBwYXJhbXMpID0+IHtcbiAgc2VsZWN0LnRleHRDb250ZW50ID0gJydcbiAgaWYgKHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgIGRvbS5zZXRJbm5lckh0bWwocGxhY2Vob2xkZXIsIHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKVxuICAgIHBsYWNlaG9sZGVyLnZhbHVlID0gJydcbiAgICBwbGFjZWhvbGRlci5kaXNhYmxlZCA9IHRydWVcbiAgICBwbGFjZWhvbGRlci5zZWxlY3RlZCA9IHRydWVcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXIpXG4gIH1cbiAgc2V0SW5wdXRMYWJlbChzZWxlY3QsIHNlbGVjdCwgcGFyYW1zKVxuICByZXR1cm4gc2VsZWN0XG59XG5cbnJlbmRlcklucHV0VHlwZS5yYWRpbyA9IChyYWRpbykgPT4ge1xuICByYWRpby50ZXh0Q29udGVudCA9ICcnXG4gIHJldHVybiByYWRpb1xufVxuXG5yZW5kZXJJbnB1dFR5cGUuY2hlY2tib3ggPSAoY2hlY2tib3hDb250YWluZXIsIHBhcmFtcykgPT4ge1xuICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovXG4gIGNvbnN0IGNoZWNrYm94ID0gZG9tLmdldElucHV0KGRvbS5nZXRQb3B1cCgpLCAnY2hlY2tib3gnKVxuICBjaGVja2JveC52YWx1ZSA9ICcxJ1xuICBjaGVja2JveC5pZCA9IHN3YWxDbGFzc2VzLmNoZWNrYm94XG4gIGNoZWNrYm94LmNoZWNrZWQgPSBCb29sZWFuKHBhcmFtcy5pbnB1dFZhbHVlKVxuICBjb25zdCBsYWJlbCA9IGNoZWNrYm94Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICBkb20uc2V0SW5uZXJIdG1sKGxhYmVsLCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcilcbiAgcmV0dXJuIGNoZWNrYm94Q29udGFpbmVyXG59XG5cbnJlbmRlcklucHV0VHlwZS50ZXh0YXJlYSA9ICh0ZXh0YXJlYSwgcGFyYW1zKSA9PiB7XG4gIHRleHRhcmVhLnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgc2V0SW5wdXRQbGFjZWhvbGRlcih0ZXh0YXJlYSwgcGFyYW1zKVxuICBzZXRJbnB1dExhYmVsKHRleHRhcmVhLCB0ZXh0YXJlYSwgcGFyYW1zKVxuXG4gIGNvbnN0IGdldE1hcmdpbiA9IChlbCkgPT5cbiAgICBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkubWFyZ2luTGVmdCkgKyBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkubWFyZ2luUmlnaHQpXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMjkxXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTY5OVxuICAgIGlmICgnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgICBjb25zdCBpbml0aWFsUG9wdXBXaWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbS5nZXRQb3B1cCgpKS53aWR0aClcbiAgICAgIGNvbnN0IHRleHRhcmVhUmVzaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dGFyZWFXaWR0aCA9IHRleHRhcmVhLm9mZnNldFdpZHRoICsgZ2V0TWFyZ2luKHRleHRhcmVhKVxuICAgICAgICBpZiAodGV4dGFyZWFXaWR0aCA+IGluaXRpYWxQb3B1cFdpZHRoKSB7XG4gICAgICAgICAgZG9tLmdldFBvcHVwKCkuc3R5bGUud2lkdGggPSBgJHt0ZXh0YXJlYVdpZHRofXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbS5nZXRQb3B1cCgpLnN0eWxlLndpZHRoID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcih0ZXh0YXJlYVJlc2l6ZUhhbmRsZXIpLm9ic2VydmUodGV4dGFyZWEsIHtcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJ10sXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gdGV4dGFyZWFcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyByZW5kZXJJbnB1dCB9IGZyb20gJy4vcmVuZGVySW5wdXQuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJDb250ZW50ID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaHRtbENvbnRhaW5lciA9IGRvbS5nZXRIdG1sQ29udGFpbmVyKClcblxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhodG1sQ29udGFpbmVyLCBwYXJhbXMsICdodG1sQ29udGFpbmVyJylcblxuICAvLyBDb250ZW50IGFzIEhUTUxcbiAgaWYgKHBhcmFtcy5odG1sKSB7XG4gICAgZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyKHBhcmFtcy5odG1sLCBodG1sQ29udGFpbmVyKVxuICAgIGRvbS5zaG93KGh0bWxDb250YWluZXIsICdibG9jaycpXG4gIH1cblxuICAvLyBDb250ZW50IGFzIHBsYWluIHRleHRcbiAgZWxzZSBpZiAocGFyYW1zLnRleHQpIHtcbiAgICBodG1sQ29udGFpbmVyLnRleHRDb250ZW50ID0gcGFyYW1zLnRleHRcbiAgICBkb20uc2hvdyhodG1sQ29udGFpbmVyLCAnYmxvY2snKVxuICB9XG5cbiAgLy8gTm8gY29udGVudFxuICBlbHNlIHtcbiAgICBkb20uaGlkZShodG1sQ29udGFpbmVyKVxuICB9XG5cbiAgcmVuZGVySW5wdXQoaW5zdGFuY2UsIHBhcmFtcylcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJGb290ZXIgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBmb290ZXIgPSBkb20uZ2V0Rm9vdGVyKClcblxuICBkb20udG9nZ2xlKGZvb3RlciwgcGFyYW1zLmZvb3RlcilcblxuICBpZiAocGFyYW1zLmZvb3Rlcikge1xuICAgIGRvbS5wYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMuZm9vdGVyLCBmb290ZXIpXG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoZm9vdGVyLCBwYXJhbXMsICdmb290ZXInKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNsb3NlQnV0dG9uID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb20uZ2V0Q2xvc2VCdXR0b24oKVxuXG4gIGRvbS5zZXRJbm5lckh0bWwoY2xvc2VCdXR0b24sIHBhcmFtcy5jbG9zZUJ1dHRvbkh0bWwpXG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGNsb3NlQnV0dG9uLCBwYXJhbXMsICdjbG9zZUJ1dHRvbicpXG5cbiAgZG9tLnRvZ2dsZShjbG9zZUJ1dHRvbiwgcGFyYW1zLnNob3dDbG9zZUJ1dHRvbilcbiAgY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgcGFyYW1zLmNsb3NlQnV0dG9uQXJpYUxhYmVsKVxufVxuIiwiaW1wb3J0IHsgaWNvblR5cGVzLCBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vLi4vLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVySWNvbiA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgY29uc3QgaWNvbiA9IGRvbS5nZXRJY29uKClcblxuICAvLyBpZiB0aGUgZ2l2ZW4gaWNvbiBhbHJlYWR5IHJlbmRlcmVkLCBhcHBseSB0aGUgc3R5bGluZyB3aXRob3V0IHJlLXJlbmRlcmluZyB0aGUgaWNvblxuICBpZiAoaW5uZXJQYXJhbXMgJiYgcGFyYW1zLmljb24gPT09IGlubmVyUGFyYW1zLmljb24pIHtcbiAgICAvLyBDdXN0b20gb3IgZGVmYXVsdCBjb250ZW50XG4gICAgc2V0Q29udGVudChpY29uLCBwYXJhbXMpXG5cbiAgICBhcHBseVN0eWxlcyhpY29uLCBwYXJhbXMpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoIXBhcmFtcy5pY29uICYmICFwYXJhbXMuaWNvbkh0bWwpIHtcbiAgICByZXR1cm4gZG9tLmhpZGUoaWNvbilcbiAgfVxuXG4gIGlmIChwYXJhbXMuaWNvbiAmJiBPYmplY3Qua2V5cyhpY29uVHlwZXMpLmluZGV4T2YocGFyYW1zLmljb24pID09PSAtMSkge1xuICAgIGVycm9yKGBVbmtub3duIGljb24hIEV4cGVjdGVkIFwic3VjY2Vzc1wiLCBcImVycm9yXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiBvciBcInF1ZXN0aW9uXCIsIGdvdCBcIiR7cGFyYW1zLmljb259XCJgKVxuICAgIHJldHVybiBkb20uaGlkZShpY29uKVxuICB9XG5cbiAgZG9tLnNob3coaWNvbilcblxuICAvLyBDdXN0b20gb3IgZGVmYXVsdCBjb250ZW50XG4gIHNldENvbnRlbnQoaWNvbiwgcGFyYW1zKVxuXG4gIGFwcGx5U3R5bGVzKGljb24sIHBhcmFtcylcblxuICAvLyBBbmltYXRlIGljb25cbiAgZG9tLmFkZENsYXNzKGljb24sIHBhcmFtcy5zaG93Q2xhc3MuaWNvbilcbn1cblxuY29uc3QgYXBwbHlTdHlsZXMgPSAoaWNvbiwgcGFyYW1zKSA9PiB7XG4gIGZvciAoY29uc3QgaWNvblR5cGUgaW4gaWNvblR5cGVzKSB7XG4gICAgaWYgKHBhcmFtcy5pY29uICE9PSBpY29uVHlwZSkge1xuICAgICAgZG9tLnJlbW92ZUNsYXNzKGljb24sIGljb25UeXBlc1tpY29uVHlwZV0pXG4gICAgfVxuICB9XG4gIGRvbS5hZGRDbGFzcyhpY29uLCBpY29uVHlwZXNbcGFyYW1zLmljb25dKVxuXG4gIC8vIEljb24gY29sb3JcbiAgc2V0Q29sb3IoaWNvbiwgcGFyYW1zKVxuXG4gIC8vIFN1Y2Nlc3MgaWNvbiBiYWNrZ3JvdW5kIGNvbG9yXG4gIGFkanVzdFN1Y2Nlc3NJY29uQmFja2dyb3VuZENvbG9yKClcblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoaWNvbiwgcGFyYW1zLCAnaWNvbicpXG59XG5cbi8vIEFkanVzdCBzdWNjZXNzIGljb24gYmFja2dyb3VuZCBjb2xvciB0byBtYXRjaCB0aGUgcG9wdXAgYmFja2dyb3VuZCBjb2xvclxuY29uc3QgYWRqdXN0U3VjY2Vzc0ljb25CYWNrZ3JvdW5kQ29sb3IgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgcG9wdXBCYWNrZ3JvdW5kQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwb3B1cCkuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gIGNvbnN0IHN1Y2Nlc3NJY29uUGFydHMgPSBwb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3NePXN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZV0sIC5zd2FsMi1zdWNjZXNzLWZpeCcpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3VjY2Vzc0ljb25QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHN1Y2Nlc3NJY29uUGFydHNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcG9wdXBCYWNrZ3JvdW5kQ29sb3JcbiAgfVxufVxuXG5jb25zdCBzdWNjZXNzSWNvbkh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtbGVmdFwiPjwvZGl2PlxuICA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS10aXBcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwic3dhbDItc3VjY2Vzcy1saW5lLWxvbmdcIj48L3NwYW4+XG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLXJpbmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtZml4XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHRcIj48L2Rpdj5cbmBcblxuY29uc3QgZXJyb3JJY29uSHRtbCA9IGBcbiAgPHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmtcIj5cbiAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFyay1saW5lLWxlZnRcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmstbGluZS1yaWdodFwiPjwvc3Bhbj5cbiAgPC9zcGFuPlxuYFxuXG5jb25zdCBzZXRDb250ZW50ID0gKGljb24sIHBhcmFtcykgPT4ge1xuICBpY29uLnRleHRDb250ZW50ID0gJydcblxuICBpZiAocGFyYW1zLmljb25IdG1sKSB7XG4gICAgZG9tLnNldElubmVySHRtbChpY29uLCBpY29uQ29udGVudChwYXJhbXMuaWNvbkh0bWwpKVxuICB9IGVsc2UgaWYgKHBhcmFtcy5pY29uID09PSAnc3VjY2VzcycpIHtcbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIHN1Y2Nlc3NJY29uSHRtbClcbiAgfSBlbHNlIGlmIChwYXJhbXMuaWNvbiA9PT0gJ2Vycm9yJykge1xuICAgIGRvbS5zZXRJbm5lckh0bWwoaWNvbiwgZXJyb3JJY29uSHRtbClcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkZWZhdWx0SWNvbkh0bWwgPSB7XG4gICAgICBxdWVzdGlvbjogJz8nLFxuICAgICAgd2FybmluZzogJyEnLFxuICAgICAgaW5mbzogJ2knLFxuICAgIH1cbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIGljb25Db250ZW50KGRlZmF1bHRJY29uSHRtbFtwYXJhbXMuaWNvbl0pKVxuICB9XG59XG5cbmNvbnN0IHNldENvbG9yID0gKGljb24sIHBhcmFtcykgPT4ge1xuICBpZiAoIXBhcmFtcy5pY29uQ29sb3IpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpY29uLnN0eWxlLmNvbG9yID0gcGFyYW1zLmljb25Db2xvclxuICBpY29uLnN0eWxlLmJvcmRlckNvbG9yID0gcGFyYW1zLmljb25Db2xvclxuICBmb3IgKGNvbnN0IHNlbCBvZiBbXG4gICAgJy5zd2FsMi1zdWNjZXNzLWxpbmUtdGlwJyxcbiAgICAnLnN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nJyxcbiAgICAnLnN3YWwyLXgtbWFyay1saW5lLWxlZnQnLFxuICAgICcuc3dhbDIteC1tYXJrLWxpbmUtcmlnaHQnLFxuICBdKSB7XG4gICAgZG9tLnNldFN0eWxlKGljb24sIHNlbCwgJ2JhY2tncm91bmRDb2xvcicsIHBhcmFtcy5pY29uQ29sb3IpXG4gIH1cbiAgZG9tLnNldFN0eWxlKGljb24sICcuc3dhbDItc3VjY2Vzcy1yaW5nJywgJ2JvcmRlckNvbG9yJywgcGFyYW1zLmljb25Db2xvcilcbn1cblxuY29uc3QgaWNvbkNvbnRlbnQgPSAoY29udGVudCkgPT4gYDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWydpY29uLWNvbnRlbnQnXX1cIj4ke2NvbnRlbnR9PC9kaXY+YFxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckltYWdlID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaW1hZ2UgPSBkb20uZ2V0SW1hZ2UoKVxuXG4gIGlmICghcGFyYW1zLmltYWdlVXJsKSB7XG4gICAgcmV0dXJuIGRvbS5oaWRlKGltYWdlKVxuICB9XG5cbiAgZG9tLnNob3coaW1hZ2UsICcnKVxuXG4gIC8vIFNyYywgYWx0XG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgcGFyYW1zLmltYWdlVXJsKVxuICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHBhcmFtcy5pbWFnZUFsdClcblxuICAvLyBXaWR0aCwgaGVpZ2h0XG4gIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKGltYWdlLCAnd2lkdGgnLCBwYXJhbXMuaW1hZ2VXaWR0aClcbiAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUoaW1hZ2UsICdoZWlnaHQnLCBwYXJhbXMuaW1hZ2VIZWlnaHQpXG5cbiAgLy8gQ2xhc3NcbiAgaW1hZ2UuY2xhc3NOYW1lID0gc3dhbENsYXNzZXMuaW1hZ2VcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoaW1hZ2UsIHBhcmFtcywgJ2ltYWdlJylcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi8uLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmNvbnN0IGNyZWF0ZVN0ZXBFbGVtZW50ID0gKHN0ZXApID0+IHtcbiAgY29uc3Qgc3RlcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICBkb20uYWRkQ2xhc3Moc3RlcEVsLCBzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcCddKVxuICBkb20uc2V0SW5uZXJIdG1sKHN0ZXBFbCwgc3RlcClcbiAgcmV0dXJuIHN0ZXBFbFxufVxuXG5jb25zdCBjcmVhdGVMaW5lRWxlbWVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgbGluZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICBkb20uYWRkQ2xhc3MobGluZUVsLCBzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcC1saW5lJ10pXG4gIGlmIChwYXJhbXMucHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlKSB7XG4gICAgbGluZUVsLnN0eWxlLndpZHRoID0gcGFyYW1zLnByb2dyZXNzU3RlcHNEaXN0YW5jZVxuICB9XG4gIHJldHVybiBsaW5lRWxcbn1cblxuZXhwb3J0IGNvbnN0IHJlbmRlclByb2dyZXNzU3RlcHMgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyID0gZG9tLmdldFByb2dyZXNzU3RlcHMoKVxuICBpZiAoIXBhcmFtcy5wcm9ncmVzc1N0ZXBzIHx8IHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBkb20uaGlkZShwcm9ncmVzc1N0ZXBzQ29udGFpbmVyKVxuICB9XG5cbiAgZG9tLnNob3cocHJvZ3Jlc3NTdGVwc0NvbnRhaW5lcilcbiAgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnXG4gIGlmIChwYXJhbXMuY3VycmVudFByb2dyZXNzU3RlcCA+PSBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5sZW5ndGgpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgY3VycmVudFByb2dyZXNzU3RlcCBwYXJhbWV0ZXIsIGl0IHNob3VsZCBiZSBsZXNzIHRoYW4gcHJvZ3Jlc3NTdGVwcy5sZW5ndGggJyArXG4gICAgICAgICcoY3VycmVudFByb2dyZXNzU3RlcCBsaWtlIEpTIGFycmF5cyBzdGFydHMgZnJvbSAwKSdcbiAgICApXG4gIH1cblxuICBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5mb3JFYWNoKChzdGVwLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHN0ZXBFbCA9IGNyZWF0ZVN0ZXBFbGVtZW50KHN0ZXApXG4gICAgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdGVwRWwpXG4gICAgaWYgKGluZGV4ID09PSBwYXJhbXMuY3VycmVudFByb2dyZXNzU3RlcCkge1xuICAgICAgZG9tLmFkZENsYXNzKHN0ZXBFbCwgc3dhbENsYXNzZXNbJ2FjdGl2ZS1wcm9ncmVzcy1zdGVwJ10pXG4gICAgfVxuXG4gICAgaWYgKGluZGV4ICE9PSBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5sZW5ndGggLSAxKSB7XG4gICAgICBjb25zdCBsaW5lRWwgPSBjcmVhdGVMaW5lRWxlbWVudChwYXJhbXMpXG4gICAgICBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpbmVFbClcbiAgICB9XG4gIH0pXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGl0bGUgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvbS5nZXRUaXRsZSgpXG5cbiAgZG9tLnRvZ2dsZSh0aXRsZSwgcGFyYW1zLnRpdGxlIHx8IHBhcmFtcy50aXRsZVRleHQsICdibG9jaycpXG5cbiAgaWYgKHBhcmFtcy50aXRsZSkge1xuICAgIGRvbS5wYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMudGl0bGUsIHRpdGxlKVxuICB9XG5cbiAgaWYgKHBhcmFtcy50aXRsZVRleHQpIHtcbiAgICB0aXRsZS5pbm5lclRleHQgPSBwYXJhbXMudGl0bGVUZXh0XG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3ModGl0bGUsIHBhcmFtcywgJ3RpdGxlJylcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJQb3B1cCA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgLy8gV2lkdGhcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMTcwXG4gIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShjb250YWluZXIsICd3aWR0aCcsIHBhcmFtcy53aWR0aClcbiAgICBwb3B1cC5zdHlsZS53aWR0aCA9ICcxMDAlJ1xuICAgIHBvcHVwLmluc2VydEJlZm9yZShkb20uZ2V0TG9hZGVyKCksIGRvbS5nZXRJY29uKCkpXG4gIH0gZWxzZSB7XG4gICAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUocG9wdXAsICd3aWR0aCcsIHBhcmFtcy53aWR0aClcbiAgfVxuXG4gIC8vIFBhZGRpbmdcbiAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUocG9wdXAsICdwYWRkaW5nJywgcGFyYW1zLnBhZGRpbmcpXG5cbiAgLy8gQ29sb3JcbiAgaWYgKHBhcmFtcy5jb2xvcikge1xuICAgIHBvcHVwLnN0eWxlLmNvbG9yID0gcGFyYW1zLmNvbG9yXG4gIH1cblxuICAvLyBCYWNrZ3JvdW5kXG4gIGlmIChwYXJhbXMuYmFja2dyb3VuZCkge1xuICAgIHBvcHVwLnN0eWxlLmJhY2tncm91bmQgPSBwYXJhbXMuYmFja2dyb3VuZFxuICB9XG5cbiAgZG9tLmhpZGUoZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlKCkpXG5cbiAgLy8gQ2xhc3Nlc1xuICBhZGRDbGFzc2VzKHBvcHVwLCBwYXJhbXMpXG59XG5cbmNvbnN0IGFkZENsYXNzZXMgPSAocG9wdXAsIHBhcmFtcykgPT4ge1xuICAvLyBEZWZhdWx0IENsYXNzICsgc2hvd0NsYXNzIHdoZW4gdXBkYXRpbmcgU3dhbC51cGRhdGUoe30pXG4gIHBvcHVwLmNsYXNzTmFtZSA9IGAke3N3YWxDbGFzc2VzLnBvcHVwfSAke2RvbS5pc1Zpc2libGUocG9wdXApID8gcGFyYW1zLnNob3dDbGFzcy5wb3B1cCA6ICcnfWBcblxuICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgZG9tLmFkZENsYXNzKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXSlcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnRvYXN0KVxuICB9IGVsc2Uge1xuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMubW9kYWwpXG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MocG9wdXAsIHBhcmFtcywgJ3BvcHVwJylcbiAgaWYgKHR5cGVvZiBwYXJhbXMuY3VzdG9tQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBwYXJhbXMuY3VzdG9tQ2xhc3MpXG4gIH1cblxuICAvLyBJY29uIGNsYXNzICgjMTg0MilcbiAgaWYgKHBhcmFtcy5pY29uKSB7XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlc1tgaWNvbi0ke3BhcmFtcy5pY29ufWBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRQb3B1cCB9IGZyb20gJy4uL2dldHRlcnMuanMnXG5pbXBvcnQgeyByZW5kZXJBY3Rpb25zIH0gZnJvbSAnLi9yZW5kZXJBY3Rpb25zLmpzJ1xuaW1wb3J0IHsgcmVuZGVyQ29udGFpbmVyIH0gZnJvbSAnLi9yZW5kZXJDb250YWluZXIuanMnXG5pbXBvcnQgeyByZW5kZXJDb250ZW50IH0gZnJvbSAnLi9yZW5kZXJDb250ZW50LmpzJ1xuaW1wb3J0IHsgcmVuZGVyRm9vdGVyIH0gZnJvbSAnLi9yZW5kZXJGb290ZXIuanMnXG5pbXBvcnQgeyByZW5kZXJDbG9zZUJ1dHRvbiB9IGZyb20gJy4vcmVuZGVyQ2xvc2VCdXR0b24uanMnXG5pbXBvcnQgeyByZW5kZXJJY29uIH0gZnJvbSAnLi9yZW5kZXJJY29uLmpzJ1xuaW1wb3J0IHsgcmVuZGVySW1hZ2UgfSBmcm9tICcuL3JlbmRlckltYWdlLmpzJ1xuaW1wb3J0IHsgcmVuZGVyUHJvZ3Jlc3NTdGVwcyB9IGZyb20gJy4vcmVuZGVyUHJvZ3Jlc3NTdGVwcy5qcydcbmltcG9ydCB7IHJlbmRlclRpdGxlIH0gZnJvbSAnLi9yZW5kZXJUaXRsZS5qcydcbmltcG9ydCB7IHJlbmRlclBvcHVwIH0gZnJvbSAnLi9yZW5kZXJQb3B1cC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIHJlbmRlclBvcHVwKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckNvbnRhaW5lcihpbnN0YW5jZSwgcGFyYW1zKVxuXG4gIHJlbmRlclByb2dyZXNzU3RlcHMoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVySWNvbihpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJJbWFnZShpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJUaXRsZShpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJDbG9zZUJ1dHRvbihpbnN0YW5jZSwgcGFyYW1zKVxuXG4gIHJlbmRlckNvbnRlbnQoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyQWN0aW9ucyhpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJGb290ZXIoaW5zdGFuY2UsIHBhcmFtcylcblxuICBpZiAodHlwZW9mIHBhcmFtcy5kaWRSZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwYXJhbXMuZGlkUmVuZGVyKGdldFBvcHVwKCkpXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBEaXNtaXNzUmVhc29uID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGNhbmNlbDogJ2NhbmNlbCcsXG4gIGJhY2tkcm9wOiAnYmFja2Ryb3AnLFxuICBjbG9zZTogJ2Nsb3NlJyxcbiAgZXNjOiAnZXNjJyxcbiAgdGltZXI6ICd0aW1lcicsXG59KVxuIiwiaW1wb3J0IHsgZ2V0Q29udGFpbmVyIH0gZnJvbSAnLi9kb20vZ2V0dGVycy5qcydcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICcuL3V0aWxzLmpzJ1xuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL2Jsb2cvMjAxOC8wNi90aGUtY3VycmVudC1zdGF0ZS1vZi1tb2RhbC1kaWFsb2ctYWNjZXNzaWJpbGl0eS9cbi8vIEFkZGluZyBhcmlhLWhpZGRlbj1cInRydWVcIiB0byBlbGVtZW50cyBvdXRzaWRlIG9mIHRoZSBhY3RpdmUgbW9kYWwgZGlhbG9nIGVuc3VyZXMgdGhhdFxuLy8gZWxlbWVudHMgbm90IHdpdGhpbiB0aGUgYWN0aXZlIG1vZGFsIGRpYWxvZyB3aWxsIG5vdCBiZSBzdXJmYWNlZCBpZiBhIHVzZXIgb3BlbnMgYSBzY3JlZW5cbi8vIHJlYWRlcuKAmXMgbGlzdCBvZiBlbGVtZW50cyAoaGVhZGluZ3MsIGZvcm0gY29udHJvbHMsIGxhbmRtYXJrcywgZXRjLikgaW4gdGhlIGRvY3VtZW50LlxuXG5leHBvcnQgY29uc3Qgc2V0QXJpYUhpZGRlbiA9ICgpID0+IHtcbiAgY29uc3QgYm9keUNoaWxkcmVuID0gdG9BcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKVxuICBib2R5Q2hpbGRyZW4uZm9yRWFjaCgoZWwpID0+IHtcbiAgICBpZiAoZWwgPT09IGdldENvbnRhaW5lcigpIHx8IGVsLmNvbnRhaW5zKGdldENvbnRhaW5lcigpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJywgZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKVxuICAgIH1cbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5zZXRBcmlhSGlkZGVuID0gKCkgPT4ge1xuICBjb25zdCBib2R5Q2hpbGRyZW4gPSB0b0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pXG4gIGJvZHlDaGlsZHJlbi5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcHJldmlvdXMtYXJpYS1oaWRkZW4nKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcmV2aW91cy1hcmlhLWhpZGRlbicpKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9wYXJhbXMuanMnXG5pbXBvcnQgeyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIsIHRvQXJyYXksIHdhcm4gfSBmcm9tICcuL3V0aWxzLmpzJ1xuXG5jb25zdCBzd2FsU3RyaW5nUGFyYW1zID0gWydzd2FsLXRpdGxlJywgJ3N3YWwtaHRtbCcsICdzd2FsLWZvb3RlciddXG5cbmV4cG9ydCBjb25zdCBnZXRUZW1wbGF0ZVBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSB0eXBlb2YgcGFyYW1zLnRlbXBsYXRlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLnRlbXBsYXRlKSA6IHBhcmFtcy50ZW1wbGF0ZVxuICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbiAgLyoqIEB0eXBlIHtEb2N1bWVudEZyYWdtZW50fSAqL1xuICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50XG5cbiAgc2hvd1dhcm5pbmdzRm9yRWxlbWVudHModGVtcGxhdGVDb250ZW50KVxuXG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgZ2V0U3dhbFBhcmFtcyh0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxCdXR0b25zKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbEltYWdlKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbEljb24odGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsSW5wdXQodGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsU3RyaW5nUGFyYW1zKHRlbXBsYXRlQ29udGVudCwgc3dhbFN0cmluZ1BhcmFtcylcbiAgKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbFBhcmFtcyA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgdG9BcnJheSh0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc3dhbC1wYXJhbScpKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMocGFyYW0sIFsnbmFtZScsICd2YWx1ZSddKVxuICAgIGNvbnN0IHBhcmFtTmFtZSA9IHBhcmFtLmdldEF0dHJpYnV0ZSgnbmFtZScpXG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICBpZiAodHlwZW9mIGRlZmF1bHRQYXJhbXNbcGFyYW1OYW1lXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICByZXN1bHRbcGFyYW1OYW1lXSA9IGZhbHNlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFBhcmFtc1twYXJhbU5hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W3BhcmFtTmFtZV0gPSBKU09OLnBhcnNlKHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxCdXR0b25zID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICB0b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzd2FsLWJ1dHRvbicpKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGJ1dHRvbiwgWyd0eXBlJywgJ2NvbG9yJywgJ2FyaWEtbGFiZWwnXSlcbiAgICBjb25zdCB0eXBlID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgndHlwZScpXG4gICAgcmVzdWx0W2Ake3R5cGV9QnV0dG9uVGV4dGBdID0gYnV0dG9uLmlubmVySFRNTFxuICAgIHJlc3VsdFtgc2hvdyR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHR5cGUpfUJ1dHRvbmBdID0gdHJ1ZVxuICAgIGlmIChidXR0b24uaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICByZXN1bHRbYCR7dHlwZX1CdXR0b25Db2xvcmBdID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnY29sb3InKVxuICAgIH1cbiAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSB7XG4gICAgICByZXN1bHRbYCR7dHlwZX1CdXR0b25BcmlhTGFiZWxgXSA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxJbWFnZSA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgY29uc3QgaW1hZ2UgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3dhbC1pbWFnZScpXG4gIGlmIChpbWFnZSkge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMoaW1hZ2UsIFsnc3JjJywgJ3dpZHRoJywgJ2hlaWdodCcsICdhbHQnXSlcbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdzcmMnKSkge1xuICAgICAgcmVzdWx0LmltYWdlVXJsID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCd3aWR0aCcpKSB7XG4gICAgICByZXN1bHQuaW1hZ2VXaWR0aCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdoZWlnaHQnKSkge1xuICAgICAgcmVzdWx0LmltYWdlSGVpZ2h0ID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdhbHQnKSkge1xuICAgICAgcmVzdWx0LmltYWdlQWx0ID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhbHQnKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbEljb24gPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG4gIGNvbnN0IGljb24gPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3dhbC1pY29uJylcbiAgaWYgKGljb24pIHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGljb24sIFsndHlwZScsICdjb2xvciddKVxuICAgIGlmIChpY29uLmhhc0F0dHJpYnV0ZSgndHlwZScpKSB7XG4gICAgICByZXN1bHQuaWNvbiA9IGljb24uZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgICB9XG4gICAgaWYgKGljb24uaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICByZXN1bHQuaWNvbkNvbG9yID0gaWNvbi5nZXRBdHRyaWJ1dGUoJ2NvbG9yJylcbiAgICB9XG4gICAgcmVzdWx0Lmljb25IdG1sID0gaWNvbi5pbm5lckhUTUxcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbElucHV0ID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICBjb25zdCBpbnB1dCA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yKCdzd2FsLWlucHV0JylcbiAgaWYgKGlucHV0KSB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhpbnB1dCwgWyd0eXBlJywgJ2xhYmVsJywgJ3BsYWNlaG9sZGVyJywgJ3ZhbHVlJ10pXG4gICAgcmVzdWx0LmlucHV0ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgJ3RleHQnXG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgnbGFiZWwnKSkge1xuICAgICAgcmVzdWx0LmlucHV0TGFiZWwgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2xhYmVsJylcbiAgICB9XG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSkge1xuICAgICAgcmVzdWx0LmlucHV0UGxhY2Vob2xkZXIgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJylcbiAgICB9XG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgcmVzdWx0LmlucHV0VmFsdWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICB9XG4gIH1cbiAgY29uc3QgaW5wdXRPcHRpb25zID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N3YWwtaW5wdXQtb3B0aW9uJylcbiAgaWYgKGlucHV0T3B0aW9ucy5sZW5ndGgpIHtcbiAgICByZXN1bHQuaW5wdXRPcHRpb25zID0ge31cbiAgICB0b0FycmF5KGlucHV0T3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKG9wdGlvbiwgWyd2YWx1ZSddKVxuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpXG4gICAgICBjb25zdCBvcHRpb25OYW1lID0gb3B0aW9uLmlubmVySFRNTFxuICAgICAgcmVzdWx0LmlucHV0T3B0aW9uc1tvcHRpb25WYWx1ZV0gPSBvcHRpb25OYW1lXG4gICAgfSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhcmFtTmFtZXNcbiAqL1xuY29uc3QgZ2V0U3dhbFN0cmluZ1BhcmFtcyA9ICh0ZW1wbGF0ZUNvbnRlbnQsIHBhcmFtTmFtZXMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgZm9yIChjb25zdCBpIGluIHBhcmFtTmFtZXMpIHtcbiAgICBjb25zdCBwYXJhbU5hbWUgPSBwYXJhbU5hbWVzW2ldXG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgICBjb25zdCB0YWcgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvcihwYXJhbU5hbWUpXG4gICAgaWYgKHRhZykge1xuICAgICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyh0YWcsIFtdKVxuICAgICAgcmVzdWx0W3BhcmFtTmFtZS5yZXBsYWNlKC9ec3dhbC0vLCAnJyldID0gdGFnLmlubmVySFRNTC50cmltKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IHNob3dXYXJuaW5nc0ZvckVsZW1lbnRzID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCBhbGxvd2VkRWxlbWVudHMgPSBzd2FsU3RyaW5nUGFyYW1zLmNvbmNhdChbXG4gICAgJ3N3YWwtcGFyYW0nLFxuICAgICdzd2FsLWJ1dHRvbicsXG4gICAgJ3N3YWwtaW1hZ2UnLFxuICAgICdzd2FsLWljb24nLFxuICAgICdzd2FsLWlucHV0JyxcbiAgICAnc3dhbC1pbnB1dC1vcHRpb24nLFxuICBdKVxuICB0b0FycmF5KHRlbXBsYXRlQ29udGVudC5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGFsbG93ZWRFbGVtZW50cy5pbmRleE9mKHRhZ05hbWUpID09PSAtMSkge1xuICAgICAgd2FybihgVW5yZWNvZ25pemVkIGVsZW1lbnQgPCR7dGFnTmFtZX0+YClcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nW119IGFsbG93ZWRBdHRyaWJ1dGVzXG4gKi9cbmNvbnN0IHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMgPSAoZWwsIGFsbG93ZWRBdHRyaWJ1dGVzKSA9PiB7XG4gIHRvQXJyYXkoZWwuYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgaWYgKGFsbG93ZWRBdHRyaWJ1dGVzLmluZGV4T2YoYXR0cmlidXRlLm5hbWUpID09PSAtMSkge1xuICAgICAgd2FybihbXG4gICAgICAgIGBVbnJlY29nbml6ZWQgYXR0cmlidXRlIFwiJHthdHRyaWJ1dGUubmFtZX1cIiBvbiA8JHtlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCl9Pi5gLFxuICAgICAgICBgJHtcbiAgICAgICAgICBhbGxvd2VkQXR0cmlidXRlcy5sZW5ndGhcbiAgICAgICAgICAgID8gYEFsbG93ZWQgYXR0cmlidXRlcyBhcmU6ICR7YWxsb3dlZEF0dHJpYnV0ZXMuam9pbignLCAnKX1gXG4gICAgICAgICAgICA6ICdUbyBzZXQgdGhlIHZhbHVlLCB1c2UgSFRNTCB3aXRoaW4gdGhlIGVsZW1lbnQuJ1xuICAgICAgICB9YCxcbiAgICAgIF0pXG4gICAgfVxuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBlbWFpbDogKHN0cmluZywgdmFsaWRhdGlvbk1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gL15bYS16QS1aMC05LitfLV0rQFthLXpBLVowLTkuLV0rXFwuW2EtekEtWjAtOS1dezIsMjR9JC8udGVzdChzdHJpbmcpXG4gICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWxpZGF0aW9uTWVzc2FnZSB8fCAnSW52YWxpZCBlbWFpbCBhZGRyZXNzJylcbiAgfSxcbiAgdXJsOiAoc3RyaW5nLCB2YWxpZGF0aW9uTWVzc2FnZSkgPT4ge1xuICAgIC8vIHRha2VuIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM4MDk0MzUgd2l0aCBhIHNtYWxsIGNoYW5nZSBmcm9tICMxMzA2IGFuZCAjMjAxM1xuICAgIHJldHVybiAvXmh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fK34jPV17MSwyNTZ9XFwuW2Etel17Miw2M31cXGIoWy1hLXpBLVowLTlAOiVfKy5+Iz8mLz1dKikkLy50ZXN0KHN0cmluZylcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbGlkYXRpb25NZXNzYWdlIHx8ICdJbnZhbGlkIFVSTCcpXG4gIH0sXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS9pbmRleC5qcydcbmltcG9ydCBkZWZhdWx0SW5wdXRWYWxpZGF0b3JzIGZyb20gJy4vZGVmYXVsdElucHV0VmFsaWRhdG9ycy5qcydcblxuZnVuY3Rpb24gc2V0RGVmYXVsdElucHV0VmFsaWRhdG9ycyhwYXJhbXMpIHtcbiAgLy8gVXNlIGRlZmF1bHQgYGlucHV0VmFsaWRhdG9yYCBmb3Igc3VwcG9ydGVkIGlucHV0IHR5cGVzIGlmIG5vdCBwcm92aWRlZFxuICBpZiAoIXBhcmFtcy5pbnB1dFZhbGlkYXRvcikge1xuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRJbnB1dFZhbGlkYXRvcnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKHBhcmFtcy5pbnB1dCA9PT0ga2V5KSB7XG4gICAgICAgIHBhcmFtcy5pbnB1dFZhbGlkYXRvciA9IGRlZmF1bHRJbnB1dFZhbGlkYXRvcnNba2V5XVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDdXN0b21UYXJnZXRFbGVtZW50KHBhcmFtcykge1xuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGN1c3RvbSB0YXJnZXQgZWxlbWVudCBpcyB2YWxpZFxuICBpZiAoXG4gICAgIXBhcmFtcy50YXJnZXQgfHxcbiAgICAodHlwZW9mIHBhcmFtcy50YXJnZXQgPT09ICdzdHJpbmcnICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtcy50YXJnZXQpKSB8fFxuICAgICh0eXBlb2YgcGFyYW1zLnRhcmdldCAhPT0gJ3N0cmluZycgJiYgIXBhcmFtcy50YXJnZXQuYXBwZW5kQ2hpbGQpXG4gICkge1xuICAgIHdhcm4oJ1RhcmdldCBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkLCBkZWZhdWx0aW5nIHRvIFwiYm9keVwiJylcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ2JvZHknXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdHlwZSwgdGV4dCBhbmQgYWN0aW9ucyBvbiBwb3B1cFxuICpcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcbiAgc2V0RGVmYXVsdElucHV0VmFsaWRhdG9ycyhwYXJhbXMpXG5cbiAgLy8gc2hvd0xvYWRlck9uQ29uZmlybSAmJiBwcmVDb25maXJtXG4gIGlmIChwYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSAmJiAhcGFyYW1zLnByZUNvbmZpcm0pIHtcbiAgICB3YXJuKFxuICAgICAgJ3Nob3dMb2FkZXJPbkNvbmZpcm0gaXMgc2V0IHRvIHRydWUsIGJ1dCBwcmVDb25maXJtIGlzIG5vdCBkZWZpbmVkLlxcbicgK1xuICAgICAgICAnc2hvd0xvYWRlck9uQ29uZmlybSBzaG91bGQgYmUgdXNlZCB0b2dldGhlciB3aXRoIHByZUNvbmZpcm0sIHNlZSB1c2FnZSBleGFtcGxlOlxcbicgK1xuICAgICAgICAnaHR0cHM6Ly9zd2VldGFsZXJ0Mi5naXRodWIuaW8vI2FqYXgtcmVxdWVzdCdcbiAgICApXG4gIH1cblxuICB2YWxpZGF0ZUN1c3RvbVRhcmdldEVsZW1lbnQocGFyYW1zKVxuXG4gIC8vIFJlcGxhY2UgbmV3bGluZXMgd2l0aCA8YnI+IGluIHRpdGxlXG4gIGlmICh0eXBlb2YgcGFyYW1zLnRpdGxlID09PSAnc3RyaW5nJykge1xuICAgIHBhcmFtcy50aXRsZSA9IHBhcmFtcy50aXRsZS5zcGxpdCgnXFxuJykuam9pbignPGJyIC8+JylcbiAgfVxuXG4gIGRvbS5pbml0KHBhcmFtcylcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy5yZW1haW5pbmcgPSBkZWxheVxuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG5cbiAgICB0aGlzLnN0YXJ0KClcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSBuZXcgRGF0ZSgpXG4gICAgICB0aGlzLmlkID0gc2V0VGltZW91dCh0aGlzLmNhbGxiYWNrLCB0aGlzLnJlbWFpbmluZylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5pZClcbiAgICAgIHRoaXMucmVtYWluaW5nIC09IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydGVkLmdldFRpbWUoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdcbiAgfVxuXG4gIGluY3JlYXNlKG4pIHtcbiAgICBjb25zdCBydW5uaW5nID0gdGhpcy5ydW5uaW5nXG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpXG4gICAgfVxuICAgIHRoaXMucmVtYWluaW5nICs9IG5cbiAgICBpZiAocnVubmluZykge1xuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1xuICB9XG5cbiAgZ2V0VGltZXJMZWZ0KCkge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpXG4gICAgICB0aGlzLnN0YXJ0KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucnVubmluZ1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCBmaXhTY3JvbGxiYXIgPSAoKSA9PiB7XG4gIC8vIGZvciBxdWV1ZXMsIGRvIG5vdCBkbyB0aGlzIG1vcmUgdGhhbiBvbmNlXG4gIGlmIChkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICByZXR1cm5cbiAgfVxuICAvLyBpZiB0aGUgYm9keSBoYXMgb3ZlcmZsb3dcbiAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgLy8gYWRkIHBhZGRpbmcgc28gdGhlIGNvbnRlbnQgZG9lc24ndCBzaGlmdCBhZnRlciByZW1vdmFsIG9mIHNjcm9sbGJhclxuICAgIGRvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSlcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2RvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyArIGRvbS5tZWFzdXJlU2Nyb2xsYmFyKCl9cHhgXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVuZG9TY3JvbGxiYXIgPSAoKSA9PiB7XG4gIGlmIChkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2RvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZ31weGBcbiAgICBkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgPSBudWxsXG4gIH1cbn1cbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5cbi8vIEZpeCBpT1Mgc2Nyb2xsaW5nIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xLzM5NjI2MzAyXG5cbmV4cG9ydCBjb25zdCBpT1NmaXggPSAoKSA9PiB7XG4gIGNvbnN0IGlPUyA9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhd2luZG93Lk1TU3RyZWFtKSB8fFxuICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSlcbiAgaWYgKGlPUyAmJiAhZG9tLmhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeCkpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gYCR7b2Zmc2V0ICogLTF9cHhgXG4gICAgZG9tLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeClcbiAgICBsb2NrQm9keVNjcm9sbCgpXG4gICAgYWRkQm90dG9tUGFkZGluZ0ZvclRhbGxQb3B1cHMoKVxuICB9XG59XG5cbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xOTQ4XG4gKi9cbmNvbnN0IGFkZEJvdHRvbVBhZGRpbmdGb3JUYWxsUG9wdXBzID0gKCkgPT4ge1xuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3QgaU9TID0gISF1YS5tYXRjaCgvaVBhZC9pKSB8fCAhIXVhLm1hdGNoKC9pUGhvbmUvaSlcbiAgY29uc3Qgd2Via2l0ID0gISF1YS5tYXRjaCgvV2ViS2l0L2kpXG4gIGNvbnN0IGlPU1NhZmFyaSA9IGlPUyAmJiB3ZWJraXQgJiYgIXVhLm1hdGNoKC9DcmlPUy9pKVxuICBpZiAoaU9TU2FmYXJpKSB7XG4gICAgY29uc3QgYm90dG9tUGFuZWxIZWlnaHQgPSA0NFxuICAgIGlmIChkb20uZ2V0UG9wdXAoKS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBib3R0b21QYW5lbEhlaWdodCkge1xuICAgICAgZG9tLmdldENvbnRhaW5lcigpLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBgJHtib3R0b21QYW5lbEhlaWdodH1weGBcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzEyNDZcbiAqL1xuY29uc3QgbG9ja0JvZHlTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBsZXQgcHJldmVudFRvdWNoTW92ZVxuICBjb250YWluZXIub250b3VjaHN0YXJ0ID0gKGUpID0+IHtcbiAgICBwcmV2ZW50VG91Y2hNb3ZlID0gc2hvdWxkUHJldmVudFRvdWNoTW92ZShlKVxuICB9XG4gIGNvbnRhaW5lci5vbnRvdWNobW92ZSA9IChlKSA9PiB7XG4gICAgaWYgKHByZXZlbnRUb3VjaE1vdmUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzaG91bGRQcmV2ZW50VG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgaWYgKGlzU3R5bHVzKGV2ZW50KSB8fCBpc1pvb20oZXZlbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKHRhcmdldCA9PT0gY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBpZiAoXG4gICAgIWRvbS5pc1Njcm9sbGFibGUoY29udGFpbmVyKSAmJlxuICAgIHRhcmdldC50YWdOYW1lICE9PSAnSU5QVVQnICYmIC8vICMxNjAzXG4gICAgdGFyZ2V0LnRhZ05hbWUgIT09ICdURVhUQVJFQScgJiYgLy8gIzIyNjZcbiAgICAhKFxuICAgICAgZG9tLmlzU2Nyb2xsYWJsZShkb20uZ2V0SHRtbENvbnRhaW5lcigpKSAmJiAvLyAjMTk0NFxuICAgICAgZG9tLmdldEh0bWxDb250YWluZXIoKS5jb250YWlucyh0YXJnZXQpXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTc4NlxuICpcbiAqIEBwYXJhbSB7Kn0gZXZlbnRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1N0eWx1cyA9IChldmVudCkgPT4ge1xuICByZXR1cm4gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCAmJiBldmVudC50b3VjaGVzWzBdLnRvdWNoVHlwZSA9PT0gJ3N0eWx1cydcbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE4OTFcbiAqXG4gKiBAcGFyYW0ge1RvdWNoRXZlbnR9IGV2ZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNab29tID0gKGV2ZW50KSA9PiB7XG4gIHJldHVybiBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMVxufVxuXG5leHBvcnQgY29uc3QgdW5kb0lPU2ZpeCA9ICgpID0+IHtcbiAgaWYgKGRvbS5oYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQoZG9jdW1lbnQuYm9keS5zdHlsZS50b3AsIDEwKVxuICAgIGRvbS5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSAnJ1xuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gb2Zmc2V0ICogLTFcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBmaXhTY3JvbGxiYXIgfSBmcm9tICcuL3Njcm9sbGJhckZpeC5qcydcbmltcG9ydCB7IGlPU2ZpeCB9IGZyb20gJy4vaW9zRml4LmpzJ1xuaW1wb3J0IHsgc2V0QXJpYUhpZGRlbiB9IGZyb20gJy4vYXJpYS5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcblxuZXhwb3J0IGNvbnN0IFNIT1dfQ0xBU1NfVElNRU9VVCA9IDEwXG5cbi8qKlxuICogT3BlbiBwb3B1cCwgYWRkIG5lY2Vzc2FyeSBjbGFzc2VzIGFuZCBzdHlsZXMsIGZpeCBzY3JvbGxiYXJcbiAqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKi9cbmV4cG9ydCBjb25zdCBvcGVuUG9wdXAgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMud2lsbE9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBwYXJhbXMud2lsbE9wZW4ocG9wdXApXG4gIH1cblxuICBjb25zdCBib2R5U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgY29uc3QgaW5pdGlhbEJvZHlPdmVyZmxvdyA9IGJvZHlTdHlsZXMub3ZlcmZsb3dZXG4gIGFkZENsYXNzZXMoY29udGFpbmVyLCBwb3B1cCwgcGFyYW1zKVxuXG4gIC8vIHNjcm9sbGluZyBpcyAnaGlkZGVuJyB1bnRpbCBhbmltYXRpb24gaXMgZG9uZSwgYWZ0ZXIgdGhhdCAnYXV0bydcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0U2Nyb2xsaW5nVmlzaWJpbGl0eShjb250YWluZXIsIHBvcHVwKVxuICB9LCBTSE9XX0NMQVNTX1RJTUVPVVQpXG5cbiAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICBmaXhTY3JvbGxDb250YWluZXIoY29udGFpbmVyLCBwYXJhbXMuc2Nyb2xsYmFyUGFkZGluZywgaW5pdGlhbEJvZHlPdmVyZmxvdylcbiAgICBzZXRBcmlhSGlkZGVuKClcbiAgfVxuXG4gIGlmICghZG9tLmlzVG9hc3QoKSAmJiAhZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMuZGlkT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcGFyYW1zLmRpZE9wZW4ocG9wdXApKVxuICB9XG5cbiAgZG9tLnJlbW92ZUNsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbJ25vLXRyYW5zaXRpb24nXSlcbn1cblxuY29uc3Qgc3dhbE9wZW5BbmltYXRpb25GaW5pc2hlZCA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGlmIChldmVudC50YXJnZXQgIT09IHBvcHVwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIHBvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tLmFuaW1hdGlvbkVuZEV2ZW50LCBzd2FsT3BlbkFuaW1hdGlvbkZpbmlzaGVkKVxuICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nXG59XG5cbmNvbnN0IHNldFNjcm9sbGluZ1Zpc2liaWxpdHkgPSAoY29udGFpbmVyLCBwb3B1cCkgPT4ge1xuICBpZiAoZG9tLmFuaW1hdGlvbkVuZEV2ZW50ICYmIGRvbS5oYXNDc3NBbmltYXRpb24ocG9wdXApKSB7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihkb20uYW5pbWF0aW9uRW5kRXZlbnQsIHN3YWxPcGVuQW5pbWF0aW9uRmluaXNoZWQpXG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJ1xuICB9XG59XG5cbmNvbnN0IGZpeFNjcm9sbENvbnRhaW5lciA9IChjb250YWluZXIsIHNjcm9sbGJhclBhZGRpbmcsIGluaXRpYWxCb2R5T3ZlcmZsb3cpID0+IHtcbiAgaU9TZml4KClcblxuICBpZiAoc2Nyb2xsYmFyUGFkZGluZyAmJiBpbml0aWFsQm9keU92ZXJmbG93ICE9PSAnaGlkZGVuJykge1xuICAgIGZpeFNjcm9sbGJhcigpXG4gIH1cblxuICAvLyBzd2VldGFsZXJ0Mi9pc3N1ZXMvMTI0N1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gMFxuICB9KVxufVxuXG5jb25zdCBhZGRDbGFzc2VzID0gKGNvbnRhaW5lciwgcG9wdXAsIHBhcmFtcykgPT4ge1xuICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBwYXJhbXMuc2hvd0NsYXNzLmJhY2tkcm9wKVxuICAvLyB0aGlzIHdvcmthcm91bmQgd2l0aCBvcGFjaXR5IGlzIG5lZWRlZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMDU5XG4gIHBvcHVwLnN0eWxlLnNldFByb3BlcnR5KCdvcGFjaXR5JywgJzAnLCAnaW1wb3J0YW50JylcbiAgZG9tLnNob3cocG9wdXAsICdncmlkJylcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gQW5pbWF0ZSBwb3B1cCByaWdodCBhZnRlciBzaG93aW5nIGl0XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBwYXJhbXMuc2hvd0NsYXNzLnBvcHVwKVxuICAgIC8vIGFuZCByZW1vdmUgdGhlIG9wYWNpdHkgd29ya2Fyb3VuZFxuICAgIHBvcHVwLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvcGFjaXR5JylcbiAgfSwgU0hPV19DTEFTU19USU1FT1VUKSAvLyAxMG1zIGluIG9yZGVyIHRvIGZpeCAjMjA2MlxuXG4gIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXMuc2hvd24pXG4gIGlmIChwYXJhbXMuaGVpZ2h0QXV0byAmJiBwYXJhbXMuYmFja2Ryb3AgJiYgIXBhcmFtcy50b2FzdCkge1xuICAgIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXNbJ2hlaWdodC1hdXRvJ10pXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgU3dhbCBmcm9tICcuLi9zd2VldGFsZXJ0Mi5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcblxuLyoqXG4gKiBTaG93cyBsb2FkZXIgKHNwaW5uZXIpLCB0aGlzIGlzIHVzZWZ1bCB3aXRoIEFKQVggcmVxdWVzdHMuXG4gKiBCeSBkZWZhdWx0IHRoZSBsb2FkZXIgYmUgc2hvd24gaW5zdGVhZCBvZiB0aGUgXCJDb25maXJtXCIgYnV0dG9uLlxuICovXG5jb25zdCBzaG93TG9hZGluZyA9IChidXR0b25Ub1JlcGxhY2UpID0+IHtcbiAgbGV0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgaWYgKCFwb3B1cCkge1xuICAgIG5ldyBTd2FsKCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfVxuICBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IGxvYWRlciA9IGRvbS5nZXRMb2FkZXIoKVxuXG4gIGlmIChkb20uaXNUb2FzdCgpKSB7XG4gICAgZG9tLmhpZGUoZG9tLmdldEljb24oKSlcbiAgfSBlbHNlIHtcbiAgICByZXBsYWNlQnV0dG9uKHBvcHVwLCBidXR0b25Ub1JlcGxhY2UpXG4gIH1cbiAgZG9tLnNob3cobG9hZGVyKVxuXG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgnZGF0YS1sb2FkaW5nJywgdHJ1ZSlcbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCB0cnVlKVxuICBwb3B1cC5mb2N1cygpXG59XG5cbmNvbnN0IHJlcGxhY2VCdXR0b24gPSAocG9wdXAsIGJ1dHRvblRvUmVwbGFjZSkgPT4ge1xuICBjb25zdCBhY3Rpb25zID0gZG9tLmdldEFjdGlvbnMoKVxuICBjb25zdCBsb2FkZXIgPSBkb20uZ2V0TG9hZGVyKClcblxuICBpZiAoIWJ1dHRvblRvUmVwbGFjZSAmJiBkb20uaXNWaXNpYmxlKGRvbS5nZXRDb25maXJtQnV0dG9uKCkpKSB7XG4gICAgYnV0dG9uVG9SZXBsYWNlID0gZG9tLmdldENvbmZpcm1CdXR0b24oKVxuICB9XG5cbiAgZG9tLnNob3coYWN0aW9ucylcbiAgaWYgKGJ1dHRvblRvUmVwbGFjZSkge1xuICAgIGRvbS5oaWRlKGJ1dHRvblRvUmVwbGFjZSlcbiAgICBsb2FkZXIuc2V0QXR0cmlidXRlKCdkYXRhLWJ1dHRvbi10by1yZXBsYWNlJywgYnV0dG9uVG9SZXBsYWNlLmNsYXNzTmFtZSlcbiAgfVxuICBsb2FkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobG9hZGVyLCBidXR0b25Ub1JlcGxhY2UpXG4gIGRvbS5hZGRDbGFzcyhbcG9wdXAsIGFjdGlvbnNdLCBzd2FsQ2xhc3Nlcy5sb2FkaW5nKVxufVxuXG5leHBvcnQgeyBzaG93TG9hZGluZywgc2hvd0xvYWRpbmcgYXMgZW5hYmxlTG9hZGluZyB9XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGdldERpcmVjdENoaWxkQnlDbGFzcyB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5pbXBvcnQgeyBhc1Byb21pc2UsIGVycm9yLCBoYXNUb1Byb21pc2VGbiwgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbHMuanMnXG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4uLy4uL3N0YXRpY01ldGhvZHMvc2hvd0xvYWRpbmcuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVJbnB1dE9wdGlvbnNBbmRWYWx1ZSA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGlmIChwYXJhbXMuaW5wdXQgPT09ICdzZWxlY3QnIHx8IHBhcmFtcy5pbnB1dCA9PT0gJ3JhZGlvJykge1xuICAgIGhhbmRsZUlucHV0T3B0aW9ucyhpbnN0YW5jZSwgcGFyYW1zKVxuICB9IGVsc2UgaWYgKFxuICAgIFsndGV4dCcsICdlbWFpbCcsICdudW1iZXInLCAndGVsJywgJ3RleHRhcmVhJ10uaW5jbHVkZXMocGFyYW1zLmlucHV0KSAmJlxuICAgIChoYXNUb1Byb21pc2VGbihwYXJhbXMuaW5wdXRWYWx1ZSkgfHwgaXNQcm9taXNlKHBhcmFtcy5pbnB1dFZhbHVlKSlcbiAgKSB7XG4gICAgc2hvd0xvYWRpbmcoZG9tLmdldENvbmZpcm1CdXR0b24oKSlcbiAgICBoYW5kbGVJbnB1dFZhbHVlKGluc3RhbmNlLCBwYXJhbXMpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldElucHV0VmFsdWUgPSAoaW5zdGFuY2UsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gaW5zdGFuY2UuZ2V0SW5wdXQoKVxuICBpZiAoIWlucHV0KSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBzd2l0Y2ggKGlubmVyUGFyYW1zLmlucHV0KSB7XG4gICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpXG4gICAgY2FzZSAncmFkaW8nOlxuICAgICAgcmV0dXJuIGdldFJhZGlvVmFsdWUoaW5wdXQpXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgICByZXR1cm4gZ2V0RmlsZVZhbHVlKGlucHV0KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gaW5uZXJQYXJhbXMuaW5wdXRBdXRvVHJpbSA/IGlucHV0LnZhbHVlLnRyaW0oKSA6IGlucHV0LnZhbHVlXG4gIH1cbn1cblxuY29uc3QgZ2V0Q2hlY2tib3hWYWx1ZSA9IChpbnB1dCkgPT4gKGlucHV0LmNoZWNrZWQgPyAxIDogMClcblxuY29uc3QgZ2V0UmFkaW9WYWx1ZSA9IChpbnB1dCkgPT4gKGlucHV0LmNoZWNrZWQgPyBpbnB1dC52YWx1ZSA6IG51bGwpXG5cbmNvbnN0IGdldEZpbGVWYWx1ZSA9IChpbnB1dCkgPT5cbiAgaW5wdXQuZmlsZXMubGVuZ3RoID8gKGlucHV0LmdldEF0dHJpYnV0ZSgnbXVsdGlwbGUnKSAhPT0gbnVsbCA/IGlucHV0LmZpbGVzIDogaW5wdXQuZmlsZXNbMF0pIDogbnVsbFxuXG5jb25zdCBoYW5kbGVJbnB1dE9wdGlvbnMgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IHByb2Nlc3NJbnB1dE9wdGlvbnMgPSAoaW5wdXRPcHRpb25zKSA9PlxuICAgIHBvcHVsYXRlSW5wdXRPcHRpb25zW3BhcmFtcy5pbnB1dF0ocG9wdXAsIGZvcm1hdElucHV0T3B0aW9ucyhpbnB1dE9wdGlvbnMpLCBwYXJhbXMpXG4gIGlmIChoYXNUb1Byb21pc2VGbihwYXJhbXMuaW5wdXRPcHRpb25zKSB8fCBpc1Byb21pc2UocGFyYW1zLmlucHV0T3B0aW9ucykpIHtcbiAgICBzaG93TG9hZGluZyhkb20uZ2V0Q29uZmlybUJ1dHRvbigpKVxuICAgIGFzUHJvbWlzZShwYXJhbXMuaW5wdXRPcHRpb25zKS50aGVuKChpbnB1dE9wdGlvbnMpID0+IHtcbiAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICAgIHByb2Nlc3NJbnB1dE9wdGlvbnMoaW5wdXRPcHRpb25zKVxuICAgIH0pXG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcy5pbnB1dE9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgcHJvY2Vzc0lucHV0T3B0aW9ucyhwYXJhbXMuaW5wdXRPcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGVycm9yKGBVbmV4cGVjdGVkIHR5cGUgb2YgaW5wdXRPcHRpb25zISBFeHBlY3RlZCBvYmplY3QsIE1hcCBvciBQcm9taXNlLCBnb3QgJHt0eXBlb2YgcGFyYW1zLmlucHV0T3B0aW9uc31gKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUlucHV0VmFsdWUgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBpbnB1dCA9IGluc3RhbmNlLmdldElucHV0KClcbiAgZG9tLmhpZGUoaW5wdXQpXG4gIGFzUHJvbWlzZShwYXJhbXMuaW5wdXRWYWx1ZSlcbiAgICAudGhlbigoaW5wdXRWYWx1ZSkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXQgPT09ICdudW1iZXInID8gcGFyc2VGbG9hdChpbnB1dFZhbHVlKSB8fCAwIDogYCR7aW5wdXRWYWx1ZX1gXG4gICAgICBkb20uc2hvdyhpbnB1dClcbiAgICAgIGlucHV0LmZvY3VzKClcbiAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgaW4gaW5wdXRWYWx1ZSBwcm9taXNlOiAke2Vycn1gKVxuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgICAgZG9tLnNob3coaW5wdXQpXG4gICAgICBpbnB1dC5mb2N1cygpXG4gICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgfSlcbn1cblxuY29uc3QgcG9wdWxhdGVJbnB1dE9wdGlvbnMgPSB7XG4gIHNlbGVjdDogKHBvcHVwLCBpbnB1dE9wdGlvbnMsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuc2VsZWN0KVxuICAgIGNvbnN0IHJlbmRlck9wdGlvbiA9IChwYXJlbnQsIG9wdGlvbkxhYmVsLCBvcHRpb25WYWx1ZSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvblZhbHVlXG4gICAgICBkb20uc2V0SW5uZXJIdG1sKG9wdGlvbiwgb3B0aW9uTGFiZWwpXG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSBpc1NlbGVjdGVkKG9wdGlvblZhbHVlLCBwYXJhbXMuaW5wdXRWYWx1ZSlcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfVxuICAgIGlucHV0T3B0aW9ucy5mb3JFYWNoKChpbnB1dE9wdGlvbikgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBpbnB1dE9wdGlvblswXVxuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBpbnB1dE9wdGlvblsxXVxuICAgICAgLy8gPG9wdGdyb3VwPiBzcGVjOlxuICAgICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw0MDEvaW50ZXJhY3QvZm9ybXMuaHRtbCNoLTE3LjZcbiAgICAgIC8vIFwiLi4uYWxsIE9QVEdST1VQIGVsZW1lbnRzIG11c3QgYmUgc3BlY2lmaWVkIGRpcmVjdGx5IHdpdGhpbiBhIFNFTEVDVCBlbGVtZW50IChpLmUuLCBncm91cHMgbWF5IG5vdCBiZSBuZXN0ZWQpLi4uXCJcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhpcyBpcyBhIDxvcHRncm91cD5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbkxhYmVsKSkge1xuICAgICAgICAvLyBpZiBpdCBpcyBhbiBhcnJheSwgdGhlbiBpdCBpcyBhbiA8b3B0Z3JvdXA+XG4gICAgICAgIGNvbnN0IG9wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKVxuICAgICAgICBvcHRncm91cC5sYWJlbCA9IG9wdGlvblZhbHVlXG4gICAgICAgIG9wdGdyb3VwLmRpc2FibGVkID0gZmFsc2UgLy8gbm90IGNvbmZpZ3VyYWJsZSBmb3Igbm93XG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRncm91cClcbiAgICAgICAgb3B0aW9uTGFiZWwuZm9yRWFjaCgobykgPT4gcmVuZGVyT3B0aW9uKG9wdGdyb3VwLCBvWzFdLCBvWzBdKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNhc2Ugb2YgPG9wdGlvbj5cbiAgICAgICAgcmVuZGVyT3B0aW9uKHNlbGVjdCwgb3B0aW9uTGFiZWwsIG9wdGlvblZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgc2VsZWN0LmZvY3VzKClcbiAgfSxcblxuICByYWRpbzogKHBvcHVwLCBpbnB1dE9wdGlvbnMsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHJhZGlvID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5yYWRpbylcbiAgICBpbnB1dE9wdGlvbnMuZm9yRWFjaCgoaW5wdXRPcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHJhZGlvVmFsdWUgPSBpbnB1dE9wdGlvblswXVxuICAgICAgY29uc3QgcmFkaW9MYWJlbCA9IGlucHV0T3B0aW9uWzFdXG4gICAgICBjb25zdCByYWRpb0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgY29uc3QgcmFkaW9MYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICByYWRpb0lucHV0LnR5cGUgPSAncmFkaW8nXG4gICAgICByYWRpb0lucHV0Lm5hbWUgPSBzd2FsQ2xhc3Nlcy5yYWRpb1xuICAgICAgcmFkaW9JbnB1dC52YWx1ZSA9IHJhZGlvVmFsdWVcbiAgICAgIGlmIChpc1NlbGVjdGVkKHJhZGlvVmFsdWUsIHBhcmFtcy5pbnB1dFZhbHVlKSkge1xuICAgICAgICByYWRpb0lucHV0LmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgZG9tLnNldElubmVySHRtbChsYWJlbCwgcmFkaW9MYWJlbClcbiAgICAgIGxhYmVsLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmxhYmVsXG4gICAgICByYWRpb0xhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChyYWRpb0lucHV0KVxuICAgICAgcmFkaW9MYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWwpXG4gICAgICByYWRpby5hcHBlbmRDaGlsZChyYWRpb0xhYmVsRWxlbWVudClcbiAgICB9KVxuICAgIGNvbnN0IHJhZGlvcyA9IHJhZGlvLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICBpZiAocmFkaW9zLmxlbmd0aCkge1xuICAgICAgcmFkaW9zWzBdLmZvY3VzKClcbiAgICB9XG4gIH0sXG59XG5cbi8qKlxuICogQ29udmVydHMgYGlucHV0T3B0aW9uc2AgaW50byBhbiBhcnJheSBvZiBgW3ZhbHVlLCBsYWJlbF1gc1xuICogQHBhcmFtIGlucHV0T3B0aW9uc1xuICovXG5jb25zdCBmb3JtYXRJbnB1dE9wdGlvbnMgPSAoaW5wdXRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJyAmJiBpbnB1dE9wdGlvbnMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICBpbnB1dE9wdGlvbnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgbGV0IHZhbHVlRm9ybWF0dGVkID0gdmFsdWVcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVGb3JtYXR0ZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGNhc2Ugb2YgPG9wdGdyb3VwPlxuICAgICAgICB2YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdElucHV0T3B0aW9ucyh2YWx1ZUZvcm1hdHRlZClcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFtrZXksIHZhbHVlRm9ybWF0dGVkXSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIE9iamVjdC5rZXlzKGlucHV0T3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgdmFsdWVGb3JtYXR0ZWQgPSBpbnB1dE9wdGlvbnNba2V5XVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZUZvcm1hdHRlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gY2FzZSBvZiA8b3B0Z3JvdXA+XG4gICAgICAgIHZhbHVlRm9ybWF0dGVkID0gZm9ybWF0SW5wdXRPcHRpb25zKHZhbHVlRm9ybWF0dGVkKVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVGb3JtYXR0ZWRdKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBpc1NlbGVjdGVkID0gKG9wdGlvblZhbHVlLCBpbnB1dFZhbHVlKSA9PiB7XG4gIHJldHVybiBpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUudG9TdHJpbmcoKSA9PT0gb3B0aW9uVmFsdWUudG9TdHJpbmcoKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG4vKipcbiAqIEhpZGVzIGxvYWRlciBhbmQgc2hvd3MgYmFjayB0aGUgYnV0dG9uIHdoaWNoIHdhcyBoaWRkZW4gYnkgLnNob3dMb2FkaW5nKClcbiAqL1xuZnVuY3Rpb24gaGlkZUxvYWRpbmcoKSB7XG4gIC8vIGRvIG5vdGhpbmcgaWYgcG9wdXAgaXMgY2xvc2VkXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuICBpZiAoIWlubmVyUGFyYW1zKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGRvbS5oaWRlKGRvbUNhY2hlLmxvYWRlcilcbiAgaWYgKGRvbS5pc1RvYXN0KCkpIHtcbiAgICBpZiAoaW5uZXJQYXJhbXMuaWNvbikge1xuICAgICAgZG9tLnNob3coZG9tLmdldEljb24oKSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2hvd1JlbGF0ZWRCdXR0b24oZG9tQ2FjaGUpXG4gIH1cbiAgZG9tLnJlbW92ZUNsYXNzKFtkb21DYWNoZS5wb3B1cCwgZG9tQ2FjaGUuYWN0aW9uc10sIHN3YWxDbGFzc2VzLmxvYWRpbmcpXG4gIGRvbUNhY2hlLnBvcHVwLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1idXN5JylcbiAgZG9tQ2FjaGUucG9wdXAucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnKVxuICBkb21DYWNoZS5jb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgZG9tQ2FjaGUuZGVueUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG4gIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG59XG5cbmNvbnN0IHNob3dSZWxhdGVkQnV0dG9uID0gKGRvbUNhY2hlKSA9PiB7XG4gIGNvbnN0IGJ1dHRvblRvUmVwbGFjZSA9IGRvbUNhY2hlLnBvcHVwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZG9tQ2FjaGUubG9hZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1idXR0b24tdG8tcmVwbGFjZScpKVxuICBpZiAoYnV0dG9uVG9SZXBsYWNlLmxlbmd0aCkge1xuICAgIGRvbS5zaG93KGJ1dHRvblRvUmVwbGFjZVswXSwgJ2lubGluZS1ibG9jaycpXG4gIH0gZWxzZSBpZiAoZG9tLmFsbEJ1dHRvbnNBcmVIaWRkZW4oKSkge1xuICAgIGRvbS5oaWRlKGRvbUNhY2hlLmFjdGlvbnMpXG4gIH1cbn1cblxuZXhwb3J0IHsgaGlkZUxvYWRpbmcsIGhpZGVMb2FkaW5nIGFzIGRpc2FibGVMb2FkaW5nIH1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuLyoqXG4gKiBHZXRzIHRoZSBpbnB1dCBET00gbm9kZSwgdGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBpbnB1dCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXQoaW5zdGFuY2UpIHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuICBpZiAoIWRvbUNhY2hlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICByZXR1cm4gZG9tLmdldElucHV0KGRvbUNhY2hlLnBvcHVwLCBpbm5lclBhcmFtcy5pbnB1dClcbn1cbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgYFdlYWtNYXBgcyBmb3IgZWFjaCBlZmZlY3RpdmVseS1cInByaXZhdGUgIHByb3BlcnR5XCIgdGhhdCBhIGBTd2FsYCBoYXMuXG4gKiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBwcml2YXRlIHByb3BlcnR5IFwiZm9vXCIgb2YgYHRoaXNgIHRvIFwiYmFyXCIsIHlvdSBjYW4gYHByaXZhdGVQcm9wcy5mb28uc2V0KHRoaXMsICdiYXInKWBcbiAqIFRoaXMgaXMgdGhlIGFwcHJvYWNoIHRoYXQgQmFiZWwgd2lsbCBwcm9iYWJseSB0YWtlIHRvIGltcGxlbWVudCBwcml2YXRlIG1ldGhvZHMvZmllbGRzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByaXZhdGUtbWV0aG9kc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvcHVsbC83NTU1XG4gKiBPbmNlIHdlIGhhdmUgdGhlIGNoYW5nZXMgZnJvbSB0aGF0IFBSIGluIEJhYmVsLCBhbmQgb3VyIGNvcmUgY2xhc3MgZml0cyByZWFzb25hYmxlIGluICpvbmUgbW9kdWxlKlxuICogICB0aGVuIHdlIGNhbiB1c2UgdGhhdCBsYW5ndWFnZSBmZWF0dXJlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3dhbFByb21pc2VSZXNvbHZlOiBuZXcgV2Vha01hcCgpLFxuICBzd2FsUHJvbWlzZVJlamVjdDogbmV3IFdlYWtNYXAoKSxcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgKiBhcyBkb21VdGlscyBmcm9tICcuLi91dGlscy9kb20vZG9tVXRpbHMuanMnXG5cbmV4cG9ydCB7XG4gIGdldENvbnRhaW5lcixcbiAgZ2V0UG9wdXAsXG4gIGdldFRpdGxlLFxuICBnZXRIdG1sQ29udGFpbmVyLFxuICBnZXRJbWFnZSxcbiAgZ2V0SWNvbixcbiAgZ2V0SW5wdXRMYWJlbCxcbiAgZ2V0Q2xvc2VCdXR0b24sXG4gIGdldEFjdGlvbnMsXG4gIGdldENvbmZpcm1CdXR0b24sXG4gIGdldERlbnlCdXR0b24sXG4gIGdldENhbmNlbEJ1dHRvbixcbiAgZ2V0TG9hZGVyLFxuICBnZXRGb290ZXIsXG4gIGdldFRpbWVyUHJvZ3Jlc3NCYXIsXG4gIGdldEZvY3VzYWJsZUVsZW1lbnRzLFxuICBnZXRWYWxpZGF0aW9uTWVzc2FnZSxcbiAgaXNMb2FkaW5nLFxufSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIFN3ZWV0QWxlcnQyIHBvcHVwIGlzIHNob3duXG4gKi9cbmV4cG9ydCBjb25zdCBpc1Zpc2libGUgPSAoKSA9PiB7XG4gIHJldHVybiBkb21VdGlscy5pc1Zpc2libGUoZG9tLmdldFBvcHVwKCkpXG59XG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gY2xpY2sgJ0NvbmZpcm0nIGJ1dHRvblxuICovXG5leHBvcnQgY29uc3QgY2xpY2tDb25maXJtID0gKCkgPT4gZG9tLmdldENvbmZpcm1CdXR0b24oKSAmJiBkb20uZ2V0Q29uZmlybUJ1dHRvbigpLmNsaWNrKClcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBjbGljayAnRGVueScgYnV0dG9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGlja0RlbnkgPSAoKSA9PiBkb20uZ2V0RGVueUJ1dHRvbigpICYmIGRvbS5nZXREZW55QnV0dG9uKCkuY2xpY2soKVxuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGNsaWNrICdDYW5jZWwnIGJ1dHRvblxuICovXG5leHBvcnQgY29uc3QgY2xpY2tDYW5jZWwgPSAoKSA9PiBkb20uZ2V0Q2FuY2VsQnV0dG9uKCkgJiYgZG9tLmdldENhbmNlbEJ1dHRvbigpLmNsaWNrKClcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgeyBjYWxsSWZGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBjbGlja0NvbmZpcm0gfSBmcm9tICcuL3N0YXRpY01ldGhvZHMvZG9tLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUtleWRvd25IYW5kbGVyID0gKGdsb2JhbFN0YXRlKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0ICYmIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQpIHtcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlciwge1xuICAgICAgY2FwdHVyZTogZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSxcbiAgICB9KVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQgPSBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRLZXlkb3duSGFuZGxlciA9IChpbnN0YW5jZSwgZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aCkgPT4ge1xuICByZW1vdmVLZXlkb3duSGFuZGxlcihnbG9iYWxTdGF0ZSlcbiAgaWYgKCFpbm5lclBhcmFtcy50b2FzdCkge1xuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyID0gKGUpID0+IGtleWRvd25IYW5kbGVyKGluc3RhbmNlLCBlLCBkaXNtaXNzV2l0aClcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0ID0gaW5uZXJQYXJhbXMua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSA/IHdpbmRvdyA6IGRvbS5nZXRQb3B1cCgpXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSA9IGlubmVyUGFyYW1zLmtleWRvd25MaXN0ZW5lckNhcHR1cmVcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlciwge1xuICAgICAgY2FwdHVyZTogZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSxcbiAgICB9KVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQgPSB0cnVlXG4gIH1cbn1cblxuLy8gRm9jdXMgaGFuZGxpbmdcbmV4cG9ydCBjb25zdCBzZXRGb2N1cyA9IChpbm5lclBhcmFtcywgaW5kZXgsIGluY3JlbWVudCkgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IGRvbS5nZXRGb2N1c2FibGVFbGVtZW50cygpXG4gIC8vIHNlYXJjaCBmb3IgdmlzaWJsZSBlbGVtZW50cyBhbmQgc2VsZWN0IHRoZSBuZXh0IHBvc3NpYmxlIG1hdGNoXG4gIGlmIChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICBpbmRleCA9IGluZGV4ICsgaW5jcmVtZW50XG5cbiAgICAvLyByb2xsb3ZlciB0byBmaXJzdCBpdGVtXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gMFxuXG4gICAgICAvLyBnbyB0byBsYXN0IGl0ZW1cbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXG4gICAgfVxuXG4gICAgcmV0dXJuIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4XS5mb2N1cygpXG4gIH1cbiAgLy8gbm8gdmlzaWJsZSBmb2N1c2FibGUgZWxlbWVudHMsIGZvY3VzIHRoZSBwb3B1cFxuICBkb20uZ2V0UG9wdXAoKS5mb2N1cygpXG59XG5cbmNvbnN0IGFycm93S2V5c05leHRCdXR0b24gPSBbJ0Fycm93UmlnaHQnLCAnQXJyb3dEb3duJ11cblxuY29uc3QgYXJyb3dLZXlzUHJldmlvdXNCdXR0b24gPSBbJ0Fycm93TGVmdCcsICdBcnJvd1VwJ11cblxuY29uc3Qga2V5ZG93bkhhbmRsZXIgPSAoaW5zdGFuY2UsIGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcblxuICBpZiAoIWlubmVyUGFyYW1zKSB7XG4gICAgcmV0dXJuIC8vIFRoaXMgaW5zdGFuY2UgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcbiAgfVxuXG4gIC8vIElnbm9yZSBrZXlkb3duIGR1cmluZyBJTUUgY29tcG9zaXRpb25cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2tleWRvd25fZXZlbnQjaWdub3Jpbmdfa2V5ZG93bl9kdXJpbmdfaW1lX2NvbXBvc2l0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvNzIwXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjQwNlxuICBpZiAoZS5pc0NvbXBvc2luZyB8fCBlLmtleUNvZGUgPT09IDIyOSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLnN0b3BLZXlkb3duUHJvcGFnYXRpb24pIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gIH1cblxuICAvLyBFTlRFUlxuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBoYW5kbGVFbnRlcihpbnN0YW5jZSwgZSwgaW5uZXJQYXJhbXMpXG4gIH1cblxuICAvLyBUQUJcbiAgZWxzZSBpZiAoZS5rZXkgPT09ICdUYWInKSB7XG4gICAgaGFuZGxlVGFiKGUsIGlubmVyUGFyYW1zKVxuICB9XG5cbiAgLy8gQVJST1dTIC0gc3dpdGNoIGZvY3VzIGJldHdlZW4gYnV0dG9uc1xuICBlbHNlIGlmIChbLi4uYXJyb3dLZXlzTmV4dEJ1dHRvbiwgLi4uYXJyb3dLZXlzUHJldmlvdXNCdXR0b25dLmluY2x1ZGVzKGUua2V5KSkge1xuICAgIGhhbmRsZUFycm93cyhlLmtleSlcbiAgfVxuXG4gIC8vIEVTQ1xuICBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICBoYW5kbGVFc2MoZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUVudGVyID0gKGluc3RhbmNlLCBlLCBpbm5lclBhcmFtcykgPT4ge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzIzODZcbiAgaWYgKCFjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd0VudGVyS2V5KSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGUudGFyZ2V0ICYmIGluc3RhbmNlLmdldElucHV0KCkgJiYgZS50YXJnZXQub3V0ZXJIVE1MID09PSBpbnN0YW5jZS5nZXRJbnB1dCgpLm91dGVySFRNTCkge1xuICAgIGlmIChbJ3RleHRhcmVhJywgJ2ZpbGUnXS5pbmNsdWRlcyhpbm5lclBhcmFtcy5pbnB1dCkpIHtcbiAgICAgIHJldHVybiAvLyBkbyBub3Qgc3VibWl0XG4gICAgfVxuXG4gICAgY2xpY2tDb25maXJtKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVUYWIgPSAoZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0XG5cbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBkb20uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKVxuICBsZXQgYnRuSW5kZXggPSAtMVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRhcmdldEVsZW1lbnQgPT09IGZvY3VzYWJsZUVsZW1lbnRzW2ldKSB7XG4gICAgICBidG5JbmRleCA9IGlcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gQ3ljbGUgdG8gdGhlIG5leHQgYnV0dG9uXG4gIGlmICghZS5zaGlmdEtleSkge1xuICAgIHNldEZvY3VzKGlubmVyUGFyYW1zLCBidG5JbmRleCwgMSlcbiAgfVxuXG4gIC8vIEN5Y2xlIHRvIHRoZSBwcmV2IGJ1dHRvblxuICBlbHNlIHtcbiAgICBzZXRGb2N1cyhpbm5lclBhcmFtcywgYnRuSW5kZXgsIC0xKVxuICB9XG5cbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICBlLnByZXZlbnREZWZhdWx0KClcbn1cblxuY29uc3QgaGFuZGxlQXJyb3dzID0gKGtleSkgPT4ge1xuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9tLmdldENvbmZpcm1CdXR0b24oKVxuICBjb25zdCBkZW55QnV0dG9uID0gZG9tLmdldERlbnlCdXR0b24oKVxuICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb20uZ2V0Q2FuY2VsQnV0dG9uKClcbiAgaWYgKCFbY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uXS5pbmNsdWRlcyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHNpYmxpbmcgPSBhcnJvd0tleXNOZXh0QnV0dG9uLmluY2x1ZGVzKGtleSkgPyAnbmV4dEVsZW1lbnRTaWJsaW5nJyA6ICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJ1xuICBsZXQgYnV0dG9uVG9Gb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb20uZ2V0QWN0aW9ucygpLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgYnV0dG9uVG9Gb2N1cyA9IGJ1dHRvblRvRm9jdXNbc2libGluZ11cbiAgICBpZiAoIWJ1dHRvblRvRm9jdXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZG9tLmlzVmlzaWJsZShidXR0b25Ub0ZvY3VzKSAmJiBidXR0b25Ub0ZvY3VzIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChidXR0b25Ub0ZvY3VzIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25Ub0ZvY3VzLmZvY3VzKClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVFc2MgPSAoZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGlmIChjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd0VzY2FwZUtleSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmVzYylcbiAgfVxufVxuIiwiaW1wb3J0IHsgdW5kb1Njcm9sbGJhciB9IGZyb20gJy4uL3V0aWxzL3Njcm9sbGJhckZpeC5qcydcbmltcG9ydCB7IHVuZG9JT1NmaXggfSBmcm9tICcuLi91dGlscy9pb3NGaXguanMnXG5pbXBvcnQgeyB1bnNldEFyaWFIaWRkZW4gfSBmcm9tICcuLi91dGlscy9hcmlhLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSwgeyByZXN0b3JlQWN0aXZlRWxlbWVudCB9IGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgcHJpdmF0ZU1ldGhvZHMgZnJvbSAnLi4vcHJpdmF0ZU1ldGhvZHMuanMnXG5pbXBvcnQgeyByZW1vdmVLZXlkb3duSGFuZGxlciB9IGZyb20gJy4uL2tleWRvd24taGFuZGxlci5qcydcblxuLypcbiAqIEluc3RhbmNlIG1ldGhvZCB0byBjbG9zZSBzd2VldEFsZXJ0XG4gKi9cblxuZnVuY3Rpb24gcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlKGluc3RhbmNlLCBjb250YWluZXIsIHJldHVybkZvY3VzLCBkaWRDbG9zZSkge1xuICBpZiAoZG9tLmlzVG9hc3QoKSkge1xuICAgIHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UoaW5zdGFuY2UsIGRpZENsb3NlKVxuICB9IGVsc2Uge1xuICAgIHJlc3RvcmVBY3RpdmVFbGVtZW50KHJldHVybkZvY3VzKS50aGVuKCgpID0+IHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UoaW5zdGFuY2UsIGRpZENsb3NlKSlcbiAgICByZW1vdmVLZXlkb3duSGFuZGxlcihnbG9iYWxTdGF0ZSlcbiAgfVxuXG4gIGNvbnN0IGlzU2FmYXJpID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICAvLyB3b3JrYXJvdW5kIGZvciAjMjA4OFxuICAvLyBmb3Igc29tZSByZWFzb24gcmVtb3ZpbmcgdGhlIGNvbnRhaW5lciBpbiBTYWZhcmkgd2lsbCBzY3JvbGwgdGhlIGRvY3VtZW50IHRvIGJvdHRvbVxuICBpZiAoaXNTYWZhcmkpIHtcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUgIWltcG9ydGFudCcpXG4gICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5yZW1vdmUoKVxuICB9XG5cbiAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICB1bmRvU2Nyb2xsYmFyKClcbiAgICB1bmRvSU9TZml4KClcbiAgICB1bnNldEFyaWFIaWRkZW4oKVxuICB9XG5cbiAgcmVtb3ZlQm9keUNsYXNzZXMoKVxufVxuXG5mdW5jdGlvbiByZW1vdmVCb2R5Q2xhc3NlcygpIHtcbiAgZG9tLnJlbW92ZUNsYXNzKFxuICAgIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLFxuICAgIFtzd2FsQ2xhc3Nlcy5zaG93biwgc3dhbENsYXNzZXNbJ2hlaWdodC1hdXRvJ10sIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXV1cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2UocmVzb2x2ZVZhbHVlKSB7XG4gIHJlc29sdmVWYWx1ZSA9IHByZXBhcmVSZXNvbHZlVmFsdWUocmVzb2x2ZVZhbHVlKVxuXG4gIGNvbnN0IHN3YWxQcm9taXNlUmVzb2x2ZSA9IHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVzb2x2ZS5nZXQodGhpcylcblxuICBjb25zdCBkaWRDbG9zZSA9IHRyaWdnZXJDbG9zZVBvcHVwKHRoaXMpXG5cbiAgaWYgKHRoaXMuaXNBd2FpdGluZ1Byb21pc2UoKSkge1xuICAgIC8vIEEgc3dhbCBhd2FpdGluZyBmb3IgYSBwcm9taXNlIChhZnRlciBhIGNsaWNrIG9uIENvbmZpcm0gb3IgRGVueSkgY2Fubm90IGJlIGRpc21pc3NlZCBhbnltb3JlICMyMzM1XG4gICAgaWYgKCFyZXNvbHZlVmFsdWUuaXNEaXNtaXNzZWQpIHtcbiAgICAgIGhhbmRsZUF3YWl0aW5nUHJvbWlzZSh0aGlzKVxuICAgICAgc3dhbFByb21pc2VSZXNvbHZlKHJlc29sdmVWYWx1ZSlcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGlkQ2xvc2UpIHtcbiAgICAvLyBSZXNvbHZlIFN3YWwgcHJvbWlzZVxuICAgIHN3YWxQcm9taXNlUmVzb2x2ZShyZXNvbHZlVmFsdWUpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXdhaXRpbmdQcm9taXNlKCkge1xuICByZXR1cm4gISFwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLmdldCh0aGlzKVxufVxuXG5jb25zdCB0cmlnZ2VyQ2xvc2VQb3B1cCA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgaWYgKCFwb3B1cCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoIWlubmVyUGFyYW1zIHx8IGRvbS5oYXNDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLnBvcHVwKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZG9tLnJlbW92ZUNsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5zaG93Q2xhc3MucG9wdXApXG4gIGRvbS5hZGRDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLnBvcHVwKVxuXG4gIGNvbnN0IGJhY2tkcm9wID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGRvbS5yZW1vdmVDbGFzcyhiYWNrZHJvcCwgaW5uZXJQYXJhbXMuc2hvd0NsYXNzLmJhY2tkcm9wKVxuICBkb20uYWRkQ2xhc3MoYmFja2Ryb3AsIGlubmVyUGFyYW1zLmhpZGVDbGFzcy5iYWNrZHJvcClcblxuICBoYW5kbGVQb3B1cEFuaW1hdGlvbihpbnN0YW5jZSwgcG9wdXAsIGlubmVyUGFyYW1zKVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWplY3RQcm9taXNlKGVycm9yKSB7XG4gIGNvbnN0IHJlamVjdFByb21pc2UgPSBwcml2YXRlTWV0aG9kcy5zd2FsUHJvbWlzZVJlamVjdC5nZXQodGhpcylcbiAgaGFuZGxlQXdhaXRpbmdQcm9taXNlKHRoaXMpXG4gIGlmIChyZWplY3RQcm9taXNlKSB7XG4gICAgLy8gUmVqZWN0IFN3YWwgcHJvbWlzZVxuICAgIHJlamVjdFByb21pc2UoZXJyb3IpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZUF3YWl0aW5nUHJvbWlzZSA9IChpbnN0YW5jZSkgPT4ge1xuICBpZiAoaW5zdGFuY2UuaXNBd2FpdGluZ1Byb21pc2UoKSkge1xuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2UuZGVsZXRlKGluc3RhbmNlKVxuICAgIC8vIFRoZSBpbnN0YW5jZSBtaWdodCBoYXZlIGJlZW4gcHJldmlvdXNseSBwYXJ0bHkgZGVzdHJveWVkLCB3ZSBtdXN0IHJlc3VtZSB0aGUgZGVzdHJveSBwcm9jZXNzIGluIHRoaXMgY2FzZSAjMjMzNVxuICAgIGlmICghcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSkpIHtcbiAgICAgIGluc3RhbmNlLl9kZXN0cm95KClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcHJlcGFyZVJlc29sdmVWYWx1ZSA9IChyZXNvbHZlVmFsdWUpID0+IHtcbiAgLy8gV2hlbiB1c2VyIGNhbGxzIFN3YWwuY2xvc2UoKVxuICBpZiAodHlwZW9mIHJlc29sdmVWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDb25maXJtZWQ6IGZhbHNlLFxuICAgICAgaXNEZW5pZWQ6IGZhbHNlLFxuICAgICAgaXNEaXNtaXNzZWQ6IHRydWUsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgaXNDb25maXJtZWQ6IGZhbHNlLFxuICAgICAgaXNEZW5pZWQ6IGZhbHNlLFxuICAgICAgaXNEaXNtaXNzZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgcmVzb2x2ZVZhbHVlXG4gIClcbn1cblxuY29uc3QgaGFuZGxlUG9wdXBBbmltYXRpb24gPSAoaW5zdGFuY2UsIHBvcHVwLCBpbm5lclBhcmFtcykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgLy8gSWYgYW5pbWF0aW9uIGlzIHN1cHBvcnRlZCwgYW5pbWF0ZVxuICBjb25zdCBhbmltYXRpb25Jc1N1cHBvcnRlZCA9IGRvbS5hbmltYXRpb25FbmRFdmVudCAmJiBkb20uaGFzQ3NzQW5pbWF0aW9uKHBvcHVwKVxuXG4gIGlmICh0eXBlb2YgaW5uZXJQYXJhbXMud2lsbENsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaW5uZXJQYXJhbXMud2lsbENsb3NlKHBvcHVwKVxuICB9XG5cbiAgaWYgKGFuaW1hdGlvbklzU3VwcG9ydGVkKSB7XG4gICAgYW5pbWF0ZVBvcHVwKGluc3RhbmNlLCBwb3B1cCwgY29udGFpbmVyLCBpbm5lclBhcmFtcy5yZXR1cm5Gb2N1cywgaW5uZXJQYXJhbXMuZGlkQ2xvc2UpXG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlLCByZW1vdmUgaW1tZWRpYXRlbHlcbiAgICByZW1vdmVQb3B1cEFuZFJlc2V0U3RhdGUoaW5zdGFuY2UsIGNvbnRhaW5lciwgaW5uZXJQYXJhbXMucmV0dXJuRm9jdXMsIGlubmVyUGFyYW1zLmRpZENsb3NlKVxuICB9XG59XG5cbmNvbnN0IGFuaW1hdGVQb3B1cCA9IChpbnN0YW5jZSwgcG9wdXAsIGNvbnRhaW5lciwgcmV0dXJuRm9jdXMsIGRpZENsb3NlKSA9PiB7XG4gIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjayA9IHJlbW92ZVBvcHVwQW5kUmVzZXRTdGF0ZS5iaW5kKFxuICAgIG51bGwsXG4gICAgaW5zdGFuY2UsXG4gICAgY29udGFpbmVyLFxuICAgIHJldHVybkZvY3VzLFxuICAgIGRpZENsb3NlXG4gIClcbiAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihkb20uYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cCkge1xuICAgICAgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrKClcbiAgICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2tcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UgPSAoaW5zdGFuY2UsIGRpZENsb3NlKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZGlkQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRpZENsb3NlLmJpbmQoaW5zdGFuY2UucGFyYW1zKSgpXG4gICAgfVxuICAgIGluc3RhbmNlLl9kZXN0cm95KClcbiAgfSlcbn1cblxuZXhwb3J0IHsgY2xvc2UgYXMgY2xvc2VQb3B1cCwgY2xvc2UgYXMgY2xvc2VNb2RhbCwgY2xvc2UgYXMgY2xvc2VUb2FzdCB9XG4iLCJpbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuZnVuY3Rpb24gc2V0QnV0dG9uc0Rpc2FibGVkKGluc3RhbmNlLCBidXR0b25zLCBkaXNhYmxlZCkge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQoaW5zdGFuY2UpXG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZG9tQ2FjaGVbYnV0dG9uXS5kaXNhYmxlZCA9IGRpc2FibGVkXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldElucHV0RGlzYWJsZWQoaW5wdXQsIGRpc2FibGVkKSB7XG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgIGNvbnN0IHJhZGlvc0NvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGUucGFyZW50Tm9kZVxuICAgIGNvbnN0IHJhZGlvcyA9IHJhZGlvc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJhZGlvc1tpXS5kaXNhYmxlZCA9IGRpc2FibGVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlucHV0LmRpc2FibGVkID0gZGlzYWJsZWRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQnV0dG9ucygpIHtcbiAgc2V0QnV0dG9uc0Rpc2FibGVkKHRoaXMsIFsnY29uZmlybUJ1dHRvbicsICdkZW55QnV0dG9uJywgJ2NhbmNlbEJ1dHRvbiddLCBmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVCdXR0b25zKCkge1xuICBzZXRCdXR0b25zRGlzYWJsZWQodGhpcywgWydjb25maXJtQnV0dG9uJywgJ2RlbnlCdXR0b24nLCAnY2FuY2VsQnV0dG9uJ10sIHRydWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVJbnB1dCgpIHtcbiAgcmV0dXJuIHNldElucHV0RGlzYWJsZWQodGhpcy5nZXRJbnB1dCgpLCBmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVJbnB1dCgpIHtcbiAgcmV0dXJuIHNldElucHV0RGlzYWJsZWQodGhpcy5nZXRJbnB1dCgpLCB0cnVlKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG4vLyBTaG93IGJsb2NrIHdpdGggdmFsaWRhdGlvbiBtZXNzYWdlXG5leHBvcnQgZnVuY3Rpb24gc2hvd1ZhbGlkYXRpb25NZXNzYWdlKGVycm9yKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICBjb25zdCBwYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KHRoaXMpXG4gIGRvbS5zZXRJbm5lckh0bWwoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UsIGVycm9yKVxuICBkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZS5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ11cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcyAmJiBwYXJhbXMuY3VzdG9tQ2xhc3MudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBkb20uYWRkQ2xhc3MoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UsIHBhcmFtcy5jdXN0b21DbGFzcy52YWxpZGF0aW9uTWVzc2FnZSlcbiAgfVxuICBkb20uc2hvdyhkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSlcblxuICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXQoKVxuICBpZiAoaW5wdXQpIHtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcsIHRydWUpXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jywgc3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddKVxuICAgIGRvbS5mb2N1c0lucHV0KGlucHV0KVxuICAgIGRvbS5hZGRDbGFzcyhpbnB1dCwgc3dhbENsYXNzZXMuaW5wdXRlcnJvcilcbiAgfVxufVxuXG4vLyBIaWRlIGJsb2NrIHdpdGggdmFsaWRhdGlvbiBtZXNzYWdlXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGlmIChkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGRvbS5oaWRlKGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlKVxuICB9XG5cbiAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0KClcbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWludmFsaWQnKVxuICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpXG4gICAgZG9tLnJlbW92ZUNsYXNzKGlucHV0LCBzd2FsQ2xhc3Nlcy5pbnB1dGVycm9yKVxuICB9XG59XG4iLCJpbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyZXNzU3RlcHMoKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICByZXR1cm4gZG9tQ2FjaGUucHJvZ3Jlc3NTdGVwc1xufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL3NyYy91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vLi4vc3JjL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgeyBpc1VwZGF0YWJsZVBhcmFtZXRlciB9IGZyb20gJy4uLy4uL3NyYy91dGlscy9wYXJhbXMuanMnXG5cbi8qKlxuICogVXBkYXRlcyBwb3B1cCBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHBhcmFtcykge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuXG4gIGlmICghcG9wdXAgfHwgZG9tLmhhc0NsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5oaWRlQ2xhc3MucG9wdXApKSB7XG4gICAgcmV0dXJuIHdhcm4oXG4gICAgICBgWW91J3JlIHRyeWluZyB0byB1cGRhdGUgdGhlIGNsb3NlZCBvciBjbG9zaW5nIHBvcHVwLCB0aGF0IHdvbid0IHdvcmsuIFVzZSB0aGUgdXBkYXRlKCkgbWV0aG9kIGluIHByZUNvbmZpcm0gcGFyYW1ldGVyIG9yIHNob3cgYSBuZXcgcG9wdXAuYFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbGlkVXBkYXRhYmxlUGFyYW1zID0gZmlsdGVyVmFsaWRQYXJhbXMocGFyYW1zKVxuXG4gIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBpbm5lclBhcmFtcywgdmFsaWRVcGRhdGFibGVQYXJhbXMpXG5cbiAgZG9tLnJlbmRlcih0aGlzLCB1cGRhdGVkUGFyYW1zKVxuXG4gIHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5zZXQodGhpcywgdXBkYXRlZFBhcmFtcylcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIHBhcmFtczoge1xuICAgICAgdmFsdWU6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFyYW1zLCBwYXJhbXMpLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9LFxuICB9KVxufVxuXG5jb25zdCBmaWx0ZXJWYWxpZFBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdmFsaWRVcGRhdGFibGVQYXJhbXMgPSB7fVxuICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgaWYgKGlzVXBkYXRhYmxlUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgICAgdmFsaWRVcGRhdGFibGVQYXJhbXNbcGFyYW1dID0gcGFyYW1zW3BhcmFtXVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgSW52YWxpZCBwYXJhbWV0ZXIgdG8gdXBkYXRlOiBcIiR7cGFyYW19XCIuIFVwZGF0YWJsZSBwYXJhbXMgYXJlIGxpc3RlZCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvYmxvYi9tYXN0ZXIvc3JjL3V0aWxzL3BhcmFtcy5qc1xcblxcbklmIHlvdSB0aGluayB0aGlzIHBhcmFtZXRlciBzaG91bGQgYmUgdXBkYXRhYmxlLCByZXF1ZXN0IGl0IGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvbmV3P3RlbXBsYXRlPTAyX2ZlYXR1cmVfcmVxdWVzdC5tZGBcbiAgICAgIClcbiAgICB9XG4gIH0pXG4gIHJldHVybiB2YWxpZFVwZGF0YWJsZVBhcmFtc1xufVxuIiwiaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgcHJpdmF0ZU1ldGhvZHMgZnJvbSAnLi4vcHJpdmF0ZU1ldGhvZHMuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuXG4gIGlmICghaW5uZXJQYXJhbXMpIHtcbiAgICBkaXNwb3NlV2Vha01hcHModGhpcykgLy8gVGhlIFdlYWtNYXBzIG1pZ2h0IGhhdmUgYmVlbiBwYXJ0bHkgZGVzdHJveWVkLCB3ZSBtdXN0IHJlY2FsbCBpdCB0byBkaXNwb3NlIGFueSByZW1haW5pbmcgV2Vha01hcHMgIzIzMzVcbiAgICByZXR1cm4gLy8gVGhpcyBpbnN0YW5jZSBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBTd2FsIGNsb3NpbmdcbiAgaWYgKGRvbUNhY2hlLnBvcHVwICYmIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjaykge1xuICAgIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjaygpXG4gICAgZGVsZXRlIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFja1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBzd2FsIGRpc3Bvc2FsIGRlZmVyIHRpbWVyXG4gIGlmIChnbG9iYWxTdGF0ZS5kZWZlckRpc3Bvc2FsVGltZXIpIHtcbiAgICBjbGVhclRpbWVvdXQoZ2xvYmFsU3RhdGUuZGVmZXJEaXNwb3NhbFRpbWVyKVxuICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS5kZWZlckRpc3Bvc2FsVGltZXJcbiAgfVxuXG4gIGlmICh0eXBlb2YgaW5uZXJQYXJhbXMuZGlkRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlubmVyUGFyYW1zLmRpZERlc3Ryb3koKVxuICB9XG4gIGRpc3Bvc2VTd2FsKHRoaXMpXG59XG5cbmNvbnN0IGRpc3Bvc2VTd2FsID0gKGluc3RhbmNlKSA9PiB7XG4gIGRpc3Bvc2VXZWFrTWFwcyhpbnN0YW5jZSlcbiAgLy8gVW5zZXQgdGhpcy5wYXJhbXMgc28gR0Mgd2lsbCBkaXNwb3NlIGl0ICgjMTU2OSlcbiAgZGVsZXRlIGluc3RhbmNlLnBhcmFtc1xuICAvLyBVbnNldCBnbG9iYWxTdGF0ZSBwcm9wcyBzbyBHQyB3aWxsIGRpc3Bvc2UgZ2xvYmFsU3RhdGUgKCMxNTY5KVxuICBkZWxldGUgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXJcbiAgZGVsZXRlIGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXRcbiAgLy8gVW5zZXQgY3VycmVudEluc3RhbmNlXG4gIGRlbGV0ZSBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2Vcbn1cblxuY29uc3QgZGlzcG9zZVdlYWtNYXBzID0gKGluc3RhbmNlKSA9PiB7XG4gIC8vIElmIHRoZSBjdXJyZW50IGluc3RhbmNlIGlzIGF3YWl0aW5nIGEgcHJvbWlzZSByZXN1bHQsIHdlIGtlZXAgdGhlIHByaXZhdGVNZXRob2RzIHRvIGNhbGwgdGhlbSBvbmNlIHRoZSBwcm9taXNlIHJlc3VsdCBpcyByZXRyaWV2ZWQgIzIzMzVcbiAgaWYgKGluc3RhbmNlLmlzQXdhaXRpbmdQcm9taXNlKCkpIHtcbiAgICB1bnNldFdlYWtNYXBzKHByaXZhdGVQcm9wcywgaW5zdGFuY2UpXG4gICAgcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5zZXQoaW5zdGFuY2UsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgdW5zZXRXZWFrTWFwcyhwcml2YXRlTWV0aG9kcywgaW5zdGFuY2UpXG4gICAgdW5zZXRXZWFrTWFwcyhwcml2YXRlUHJvcHMsIGluc3RhbmNlKVxuICB9XG59XG5cbmNvbnN0IHVuc2V0V2Vha01hcHMgPSAob2JqLCBpbnN0YW5jZSkgPT4ge1xuICBmb3IgKGNvbnN0IGkgaW4gb2JqKSB7XG4gICAgb2JqW2ldLmRlbGV0ZShpbnN0YW5jZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSAnLi91dGlscy9kb20vZG9tVXRpbHMuanMnXG5pbXBvcnQgeyBnZXRJbnB1dFZhbHVlIH0gZnJvbSAnLi91dGlscy9kb20vaW5wdXRVdGlscy5qcydcbmltcG9ydCB7IGdldERlbnlCdXR0b24sIGdldFZhbGlkYXRpb25NZXNzYWdlIH0gZnJvbSAnLi91dGlscy9kb20vZ2V0dGVycy5qcydcbmltcG9ydCB7IGFzUHJvbWlzZSwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLCBlcnJvciB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4vc3RhdGljTWV0aG9kcy9zaG93TG9hZGluZy5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHsgaGFuZGxlQXdhaXRpbmdQcm9taXNlIH0gZnJvbSAnLi9pbnN0YW5jZU1ldGhvZHMuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2sgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlQnV0dG9ucygpXG4gIGlmIChpbm5lclBhcmFtcy5pbnB1dCkge1xuICAgIGhhbmRsZUNvbmZpcm1PckRlbnlXaXRoSW5wdXQoaW5zdGFuY2UsICdjb25maXJtJylcbiAgfSBlbHNlIHtcbiAgICBjb25maXJtKGluc3RhbmNlLCB0cnVlKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVEZW55QnV0dG9uQ2xpY2sgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlQnV0dG9ucygpXG4gIGlmIChpbm5lclBhcmFtcy5yZXR1cm5JbnB1dFZhbHVlT25EZW55KSB7XG4gICAgaGFuZGxlQ29uZmlybU9yRGVueVdpdGhJbnB1dChpbnN0YW5jZSwgJ2RlbnknKVxuICB9IGVsc2Uge1xuICAgIGRlbnkoaW5zdGFuY2UsIGZhbHNlKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVDYW5jZWxCdXR0b25DbGljayA9IChpbnN0YW5jZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgaW5zdGFuY2UuZGlzYWJsZUJ1dHRvbnMoKVxuICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmNhbmNlbClcbn1cblxuY29uc3QgaGFuZGxlQ29uZmlybU9yRGVueVdpdGhJbnB1dCA9IChpbnN0YW5jZSwgdHlwZSAvKiAnY29uZmlybScgfCAnZGVueScgKi8pID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoIWlubmVyUGFyYW1zLmlucHV0KSB7XG4gICAgcmV0dXJuIGVycm9yKFxuICAgICAgYFRoZSBcImlucHV0XCIgcGFyYW1ldGVyIGlzIG5lZWRlZCB0byBiZSBzZXQgd2hlbiB1c2luZyByZXR1cm5JbnB1dFZhbHVlT24ke2NhcGl0YWxpemVGaXJzdExldHRlcih0eXBlKX1gXG4gICAgKVxuICB9XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBnZXRJbnB1dFZhbHVlKGluc3RhbmNlLCBpbm5lclBhcmFtcylcbiAgaWYgKGlubmVyUGFyYW1zLmlucHV0VmFsaWRhdG9yKSB7XG4gICAgaGFuZGxlSW5wdXRWYWxpZGF0b3IoaW5zdGFuY2UsIGlucHV0VmFsdWUsIHR5cGUpXG4gIH0gZWxzZSBpZiAoIWluc3RhbmNlLmdldElucHV0KCkuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgaW5zdGFuY2UuZW5hYmxlQnV0dG9ucygpXG4gICAgaW5zdGFuY2Uuc2hvd1ZhbGlkYXRpb25NZXNzYWdlKGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZW55Jykge1xuICAgIGRlbnkoaW5zdGFuY2UsIGlucHV0VmFsdWUpXG4gIH0gZWxzZSB7XG4gICAgY29uZmlybShpbnN0YW5jZSwgaW5wdXRWYWx1ZSlcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVJbnB1dFZhbGlkYXRvciA9IChpbnN0YW5jZSwgaW5wdXRWYWx1ZSwgdHlwZSAvKiAnY29uZmlybScgfCAnZGVueScgKi8pID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlSW5wdXQoKVxuICBjb25zdCB2YWxpZGF0aW9uUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT5cbiAgICBhc1Byb21pc2UoaW5uZXJQYXJhbXMuaW5wdXRWYWxpZGF0b3IoaW5wdXRWYWx1ZSwgaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpKVxuICApXG4gIHZhbGlkYXRpb25Qcm9taXNlLnRoZW4oKHZhbGlkYXRpb25NZXNzYWdlKSA9PiB7XG4gICAgaW5zdGFuY2UuZW5hYmxlQnV0dG9ucygpXG4gICAgaW5zdGFuY2UuZW5hYmxlSW5wdXQoKVxuICAgIGlmICh2YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgaW5zdGFuY2Uuc2hvd1ZhbGlkYXRpb25NZXNzYWdlKHZhbGlkYXRpb25NZXNzYWdlKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlbnknKSB7XG4gICAgICBkZW55KGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25maXJtKGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgZGVueSA9IChpbnN0YW5jZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG5cbiAgaWYgKGlubmVyUGFyYW1zLnNob3dMb2FkZXJPbkRlbnkpIHtcbiAgICBzaG93TG9hZGluZyhnZXREZW55QnV0dG9uKCkpXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMucHJlRGVueSkge1xuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2Uuc2V0KGluc3RhbmNlIHx8IHRoaXMsIHRydWUpIC8vIEZsYWdnaW5nIHRoZSBpbnN0YW5jZSBhcyBhd2FpdGluZyBhIHByb21pc2Ugc28gaXQncyBvd24gcHJvbWlzZSdzIHJlamVjdC9yZXNvbHZlIG1ldGhvZHMgZG9lc24ndCBnZXQgZGVzdHJveWVkIHVudGlsIHRoZSByZXN1bHQgZnJvbSB0aGlzIHByZURlbnkncyBwcm9taXNlIGlzIHJlY2VpdmVkXG4gICAgY29uc3QgcHJlRGVueVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+XG4gICAgICBhc1Byb21pc2UoaW5uZXJQYXJhbXMucHJlRGVueSh2YWx1ZSwgaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpKVxuICAgIClcbiAgICBwcmVEZW55UHJvbWlzZVxuICAgICAgLnRoZW4oKHByZURlbnlWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAocHJlRGVueVZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBoYW5kbGVBd2FpdGluZ1Byb21pc2UoaW5zdGFuY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzRGVuaWVkOiB0cnVlLCB2YWx1ZTogdHlwZW9mIHByZURlbnlWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IHByZURlbnlWYWx1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0V2l0aChpbnN0YW5jZSB8fCB0aGlzLCBlcnJvcikpXG4gIH0gZWxzZSB7XG4gICAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzRGVuaWVkOiB0cnVlLCB2YWx1ZSB9KVxuICB9XG59XG5cbmNvbnN0IHN1Y2NlZWRXaXRoID0gKGluc3RhbmNlLCB2YWx1ZSkgPT4ge1xuICBpbnN0YW5jZS5jbG9zZVBvcHVwKHsgaXNDb25maXJtZWQ6IHRydWUsIHZhbHVlIH0pXG59XG5cbmNvbnN0IHJlamVjdFdpdGggPSAoaW5zdGFuY2UsIGVycm9yKSA9PiB7XG4gIGluc3RhbmNlLnJlamVjdFByb21pc2UoZXJyb3IpXG59XG5cbmNvbnN0IGNvbmZpcm0gPSAoaW5zdGFuY2UsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuXG4gIGlmIChpbm5lclBhcmFtcy5zaG93TG9hZGVyT25Db25maXJtKSB7XG4gICAgc2hvd0xvYWRpbmcoKVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLnByZUNvbmZpcm0pIHtcbiAgICBpbnN0YW5jZS5yZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbiAgICBwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLnNldChpbnN0YW5jZSB8fCB0aGlzLCB0cnVlKSAvLyBGbGFnZ2luZyB0aGUgaW5zdGFuY2UgYXMgYXdhaXRpbmcgYSBwcm9taXNlIHNvIGl0J3Mgb3duIHByb21pc2UncyByZWplY3QvcmVzb2x2ZSBtZXRob2RzIGRvZXNuJ3QgZ2V0IGRlc3Ryb3llZCB1bnRpbCB0aGUgcmVzdWx0IGZyb20gdGhpcyBwcmVDb25maXJtJ3MgcHJvbWlzZSBpcyByZWNlaXZlZFxuICAgIGNvbnN0IHByZUNvbmZpcm1Qcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PlxuICAgICAgYXNQcm9taXNlKGlubmVyUGFyYW1zLnByZUNvbmZpcm0odmFsdWUsIGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKSlcbiAgICApXG4gICAgcHJlQ29uZmlybVByb21pc2VcbiAgICAgIC50aGVuKChwcmVDb25maXJtVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGlzVmlzaWJsZShnZXRWYWxpZGF0aW9uTWVzc2FnZSgpKSB8fCBwcmVDb25maXJtVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGhhbmRsZUF3YWl0aW5nUHJvbWlzZShpbnN0YW5jZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkV2l0aChpbnN0YW5jZSwgdHlwZW9mIHByZUNvbmZpcm1WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IHByZUNvbmZpcm1WYWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdFdpdGgoaW5zdGFuY2UgfHwgdGhpcywgZXJyb3IpKVxuICB9IGVsc2Uge1xuICAgIHN1Y2NlZWRXaXRoKGluc3RhbmNlLCB2YWx1ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2FsbElmRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgRGlzbWlzc1JlYXNvbiB9IGZyb20gJy4vdXRpbHMvRGlzbWlzc1JlYXNvbi5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi9wcml2YXRlUHJvcHMuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoaW5uZXJQYXJhbXMudG9hc3QpIHtcbiAgICBoYW5kbGVUb2FzdENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG4gIH0gZWxzZSB7XG4gICAgLy8gSWdub3JlIGNsaWNrIGV2ZW50cyB0aGF0IGhhZCBtb3VzZWRvd24gb24gdGhlIHBvcHVwIGJ1dCBtb3VzZXVwIG9uIHRoZSBjb250YWluZXJcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgdXNlciBkcmFncyBhIHNsaWRlclxuICAgIGhhbmRsZU1vZGFsTW91c2Vkb3duKGRvbUNhY2hlKVxuXG4gICAgLy8gSWdub3JlIGNsaWNrIGV2ZW50cyB0aGF0IGhhZCBtb3VzZWRvd24gb24gdGhlIGNvbnRhaW5lciBidXQgbW91c2V1cCBvbiB0aGUgcG9wdXBcbiAgICBoYW5kbGVDb250YWluZXJNb3VzZWRvd24oZG9tQ2FjaGUpXG5cbiAgICBoYW5kbGVNb2RhbENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlVG9hc3RDbGljayA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIC8vIENsb3NpbmcgdG9hc3QgYnkgaW50ZXJuYWwgY2xpY2tcbiAgZG9tQ2FjaGUucG9wdXAub25jbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gICAgaWYgKGlubmVyUGFyYW1zICYmIChpc0FueUJ1dHRvblNob3duKGlubmVyUGFyYW1zKSB8fCBpbm5lclBhcmFtcy50aW1lciB8fCBpbm5lclBhcmFtcy5pbnB1dCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmNsb3NlKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHsqfSBpbm5lclBhcmFtc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzQW55QnV0dG9uU2hvd24gPSAoaW5uZXJQYXJhbXMpID0+IHtcbiAgcmV0dXJuIChcbiAgICBpbm5lclBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiB8fFxuICAgIGlubmVyUGFyYW1zLnNob3dEZW55QnV0dG9uIHx8XG4gICAgaW5uZXJQYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbiB8fFxuICAgIGlubmVyUGFyYW1zLnNob3dDbG9zZUJ1dHRvblxuICApXG59XG5cbmxldCBpZ25vcmVPdXRzaWRlQ2xpY2sgPSBmYWxzZVxuXG5jb25zdCBoYW5kbGVNb2RhbE1vdXNlZG93biA9IChkb21DYWNoZSkgPT4ge1xuICBkb21DYWNoZS5wb3B1cC5vbm1vdXNlZG93biA9ICgpID0+IHtcbiAgICBkb21DYWNoZS5jb250YWluZXIub25tb3VzZXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRvbUNhY2hlLmNvbnRhaW5lci5vbm1vdXNldXAgPSB1bmRlZmluZWRcbiAgICAgIC8vIFdlIG9ubHkgY2hlY2sgaWYgdGhlIG1vdXNldXAgdGFyZ2V0IGlzIHRoZSBjb250YWluZXIgYmVjYXVzZSB1c3VhbGx5IGl0IGRvZXNuJ3RcbiAgICAgIC8vIGhhdmUgYW55IG90aGVyIGRpcmVjdCBjaGlsZHJlbiBhc2lkZSBvZiB0aGUgcG9wdXBcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9tQ2FjaGUuY29udGFpbmVyKSB7XG4gICAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlQ29udGFpbmVyTW91c2Vkb3duID0gKGRvbUNhY2hlKSA9PiB7XG4gIGRvbUNhY2hlLmNvbnRhaW5lci5vbm1vdXNlZG93biA9ICgpID0+IHtcbiAgICBkb21DYWNoZS5wb3B1cC5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZG9tQ2FjaGUucG9wdXAub25tb3VzZXVwID0gdW5kZWZpbmVkXG4gICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIG1vdXNldXAgdGFyZ2V0IGlzIGEgY2hpbGQgb2YgdGhlIHBvcHVwXG4gICAgICBpZiAoZS50YXJnZXQgPT09IGRvbUNhY2hlLnBvcHVwIHx8IGRvbUNhY2hlLnBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICBpZ25vcmVPdXRzaWRlQ2xpY2sgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBkb21DYWNoZS5jb250YWluZXIub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICAgIGlmIChpZ25vcmVPdXRzaWRlQ2xpY2spIHtcbiAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IGZhbHNlXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb21DYWNoZS5jb250YWluZXIgJiYgY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spKSB7XG4gICAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmJhY2tkcm9wKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZXJyb3IgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuY29uc3QgaXNKcXVlcnlFbGVtZW50ID0gKGVsZW0pID0+IHR5cGVvZiBlbGVtID09PSAnb2JqZWN0JyAmJiBlbGVtLmpxdWVyeVxuY29uc3QgaXNFbGVtZW50ID0gKGVsZW0pID0+IGVsZW0gaW5zdGFuY2VvZiBFbGVtZW50IHx8IGlzSnF1ZXJ5RWxlbWVudChlbGVtKVxuXG5leHBvcnQgY29uc3QgYXJnc1RvUGFyYW1zID0gKGFyZ3MpID0+IHtcbiAgY29uc3QgcGFyYW1zID0ge31cbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhaXNFbGVtZW50KGFyZ3NbMF0pKSB7XG4gICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGFyZ3NbMF0pXG4gIH0gZWxzZSB7XG4gICAgO1sndGl0bGUnLCAnaHRtbCcsICdpY29uJ10uZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGFyZyA9IGFyZ3NbaW5kZXhdXG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHwgaXNFbGVtZW50KGFyZykpIHtcbiAgICAgICAgcGFyYW1zW25hbWVdID0gYXJnXG4gICAgICB9IGVsc2UgaWYgKGFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVycm9yKGBVbmV4cGVjdGVkIHR5cGUgb2YgJHtuYW1lfSEgRXhwZWN0ZWQgXCJzdHJpbmdcIiBvciBcIkVsZW1lbnRcIiwgZ290ICR7dHlwZW9mIGFyZ31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHBhcmFtc1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGZpcmUoLi4uYXJncykge1xuICBjb25zdCBTd2FsID0gdGhpcyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gIHJldHVybiBuZXcgU3dhbCguLi5hcmdzKVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIGV4dGVuZGVkIHZlcnNpb24gb2YgYFN3YWxgIGNvbnRhaW5pbmcgYHBhcmFtc2AgYXMgZGVmYXVsdHMuXG4gKiBVc2VmdWwgZm9yIHJldXNpbmcgU3dhbCBjb25maWd1cmF0aW9uLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIEJlZm9yZTpcbiAqIGNvbnN0IHRleHRQcm9tcHRPcHRpb25zID0geyBpbnB1dDogJ3RleHQnLCBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlIH1cbiAqIGNvbnN0IHt2YWx1ZTogZmlyc3ROYW1lfSA9IGF3YWl0IFN3YWwuZmlyZSh7IC4uLnRleHRQcm9tcHRPcHRpb25zLCB0aXRsZTogJ1doYXQgaXMgeW91ciBmaXJzdCBuYW1lPycgfSlcbiAqIGNvbnN0IHt2YWx1ZTogbGFzdE5hbWV9ID0gYXdhaXQgU3dhbC5maXJlKHsgLi4udGV4dFByb21wdE9wdGlvbnMsIHRpdGxlOiAnV2hhdCBpcyB5b3VyIGxhc3QgbmFtZT8nIH0pXG4gKlxuICogQWZ0ZXI6XG4gKiBjb25zdCBUZXh0UHJvbXB0ID0gU3dhbC5taXhpbih7IGlucHV0OiAndGV4dCcsIHNob3dDYW5jZWxCdXR0b246IHRydWUgfSlcbiAqIGNvbnN0IHt2YWx1ZTogZmlyc3ROYW1lfSA9IGF3YWl0IFRleHRQcm9tcHQoJ1doYXQgaXMgeW91ciBmaXJzdCBuYW1lPycpXG4gKiBjb25zdCB7dmFsdWU6IGxhc3ROYW1lfSA9IGF3YWl0IFRleHRQcm9tcHQoJ1doYXQgaXMgeW91ciBsYXN0IG5hbWU/JylcbiAqXG4gKiBAcGFyYW0gbWl4aW5QYXJhbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluKG1peGluUGFyYW1zKSB7XG4gIGNsYXNzIE1peGluU3dhbCBleHRlbmRzIHRoaXMge1xuICAgIF9tYWluKHBhcmFtcywgcHJpb3JpdHlNaXhpblBhcmFtcykge1xuICAgICAgcmV0dXJuIHN1cGVyLl9tYWluKHBhcmFtcywgT2JqZWN0LmFzc2lnbih7fSwgbWl4aW5QYXJhbXMsIHByaW9yaXR5TWl4aW5QYXJhbXMpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNaXhpblN3YWxcbn1cbiIsImltcG9ydCB7IGFuaW1hdGVUaW1lclByb2dyZXNzQmFyLCBzdG9wVGltZXJQcm9ncmVzc0JhciB9IGZyb20gJy4uL3V0aWxzL2RvbS9kb21VdGlscy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcblxuLyoqXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpcyBzZXQsIHJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIE90aGVyd2lzZSwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaW1lckxlZnQgPSAoKSA9PiB7XG4gIHJldHVybiBnbG9iYWxTdGF0ZS50aW1lb3V0ICYmIGdsb2JhbFN0YXRlLnRpbWVvdXQuZ2V0VGltZXJMZWZ0KClcbn1cblxuLyoqXG4gKiBTdG9wIHRpbWVyLiBSZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgdGltZXIgcmVtYWluZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgIHN0b3BUaW1lclByb2dyZXNzQmFyKClcbiAgICByZXR1cm4gZ2xvYmFsU3RhdGUudGltZW91dC5zdG9wKClcbiAgfVxufVxuXG4vKipcbiAqIFJlc3VtZSB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHRpbWVyIHJlbWFpbmVkLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlc3VtZVRpbWVyID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGdsb2JhbFN0YXRlLnRpbWVvdXQuc3RhcnQoKVxuICAgIGFuaW1hdGVUaW1lclByb2dyZXNzQmFyKHJlbWFpbmluZylcbiAgICByZXR1cm4gcmVtYWluaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBSZXN1bWUgdGltZXIuIFJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVUaW1lciA9ICgpID0+IHtcbiAgY29uc3QgdGltZXIgPSBnbG9iYWxTdGF0ZS50aW1lb3V0XG4gIHJldHVybiB0aW1lciAmJiAodGltZXIucnVubmluZyA/IHN0b3BUaW1lcigpIDogcmVzdW1lVGltZXIoKSlcbn1cblxuLyoqXG4gKiBJbmNyZWFzZSB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIGFuIHVwZGF0ZWQgdGltZXIuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgaW5jcmVhc2VUaW1lciA9IChuKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gZ2xvYmFsU3RhdGUudGltZW91dC5pbmNyZWFzZShuKVxuICAgIGFuaW1hdGVUaW1lclByb2dyZXNzQmFyKHJlbWFpbmluZywgdHJ1ZSlcbiAgICByZXR1cm4gcmVtYWluaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aW1lciBpcyBydW5uaW5nLiBSZXR1cm5zIHRydWUgaWYgdGltZXIgaXMgcnVubmluZ1xuICogb3IgZmFsc2UgaWYgdGltZXIgaXMgcGF1c2VkIG9yIHN0b3BwZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBpc1RpbWVyUnVubmluZyA9ICgpID0+IHtcbiAgcmV0dXJuIGdsb2JhbFN0YXRlLnRpbWVvdXQgJiYgZ2xvYmFsU3RhdGUudGltZW91dC5pc1J1bm5pbmcoKVxufVxuIiwibGV0IGJvZHlDbGlja0xpc3RlbmVyQWRkZWQgPSBmYWxzZVxuY29uc3QgY2xpY2tIYW5kbGVycyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2xpY2tIYW5kbGVyKGF0dHIgPSAnZGF0YS1zd2FsLXRlbXBsYXRlJykge1xuICBjbGlja0hhbmRsZXJzW2F0dHJdID0gdGhpc1xuXG4gIGlmICghYm9keUNsaWNrTGlzdGVuZXJBZGRlZCkge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib2R5Q2xpY2tMaXN0ZW5lcilcbiAgICBib2R5Q2xpY2tMaXN0ZW5lckFkZGVkID0gdHJ1ZVxuICB9XG59XG5cbmNvbnN0IGJvZHlDbGlja0xpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gIGZvciAobGV0IGVsID0gZXZlbnQudGFyZ2V0OyBlbCAmJiBlbCAhPT0gZG9jdW1lbnQ7IGVsID0gZWwucGFyZW50Tm9kZSkge1xuICAgIGZvciAoY29uc3QgYXR0ciBpbiBjbGlja0hhbmRsZXJzKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGVsLmdldEF0dHJpYnV0ZShhdHRyKVxuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIGNsaWNrSGFuZGxlcnNbYXR0cl0uZmlyZSh7IHRlbXBsYXRlIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGRlZmF1bHRQYXJhbXMsIHsgc2hvd1dhcm5pbmdzRm9yUGFyYW1zIH0gZnJvbSAnLi91dGlscy9wYXJhbXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBjYWxsSWZGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBEaXNtaXNzUmVhc29uIH0gZnJvbSAnLi91dGlscy9EaXNtaXNzUmVhc29uLmpzJ1xuaW1wb3J0IHsgdW5zZXRBcmlhSGlkZGVuIH0gZnJvbSAnLi91dGlscy9hcmlhLmpzJ1xuaW1wb3J0IHsgZ2V0VGVtcGxhdGVQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldFRlbXBsYXRlUGFyYW1zLmpzJ1xuaW1wb3J0IHNldFBhcmFtZXRlcnMgZnJvbSAnLi91dGlscy9zZXRQYXJhbWV0ZXJzLmpzJ1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vdXRpbHMvVGltZXIuanMnXG5pbXBvcnQgeyBvcGVuUG9wdXAgfSBmcm9tICcuL3V0aWxzL29wZW5Qb3B1cC5qcydcbmltcG9ydCB7IGhhbmRsZUlucHV0T3B0aW9uc0FuZFZhbHVlIH0gZnJvbSAnLi91dGlscy9kb20vaW5wdXRVdGlscy5qcydcbmltcG9ydCB7IGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrLCBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2ssIGhhbmRsZURlbnlCdXR0b25DbGljayB9IGZyb20gJy4vYnV0dG9ucy1oYW5kbGVycy5qcydcbmltcG9ydCB7IGhhbmRsZVBvcHVwQ2xpY2sgfSBmcm9tICcuL3BvcHVwLWNsaWNrLWhhbmRsZXIuanMnXG5pbXBvcnQgeyBhZGRLZXlkb3duSGFuZGxlciwgc2V0Rm9jdXMgfSBmcm9tICcuL2tleWRvd24taGFuZGxlci5qcydcbmltcG9ydCAqIGFzIHN0YXRpY01ldGhvZHMgZnJvbSAnLi9zdGF0aWNNZXRob2RzLmpzJ1xuaW1wb3J0ICogYXMgaW5zdGFuY2VNZXRob2RzIGZyb20gJy4vaW5zdGFuY2VNZXRob2RzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCBwcml2YXRlTWV0aG9kcyBmcm9tICcuL3ByaXZhdGVNZXRob2RzLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4vZ2xvYmFsU3RhdGUuanMnXG5cbmxldCBjdXJyZW50SW5zdGFuY2VcblxuY2xhc3MgU3dlZXRBbGVydCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAvLyBQcmV2ZW50IHJ1biBpbiBOb2RlIGVudlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEluc3RhbmNlID0gdGhpc1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IG91dGVyUGFyYW1zID0gT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbnN0cnVjdG9yLmFyZ3NUb1BhcmFtcyhhcmdzKSlcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB2YWx1ZTogb3V0ZXJQYXJhbXMsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9tYWluKHRoaXMucGFyYW1zKVxuICAgIHByaXZhdGVQcm9wcy5wcm9taXNlLnNldCh0aGlzLCBwcm9taXNlKVxuICB9XG5cbiAgX21haW4odXNlclBhcmFtcywgbWl4aW5QYXJhbXMgPSB7fSkge1xuICAgIHNob3dXYXJuaW5nc0ZvclBhcmFtcyhPYmplY3QuYXNzaWduKHt9LCBtaXhpblBhcmFtcywgdXNlclBhcmFtcykpXG5cbiAgICBpZiAoZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlKSB7XG4gICAgICBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2UuX2Rlc3Ryb3koKVxuICAgICAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICAgICAgdW5zZXRBcmlhSGlkZGVuKClcbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlID0gdGhpc1xuXG4gICAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcmVwYXJlUGFyYW1zKHVzZXJQYXJhbXMsIG1peGluUGFyYW1zKVxuICAgIHNldFBhcmFtZXRlcnMoaW5uZXJQYXJhbXMpXG4gICAgT2JqZWN0LmZyZWV6ZShpbm5lclBhcmFtcylcblxuICAgIC8vIGNsZWFyIHRoZSBwcmV2aW91cyB0aW1lclxuICAgIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgICBnbG9iYWxTdGF0ZS50aW1lb3V0LnN0b3AoKVxuICAgICAgZGVsZXRlIGdsb2JhbFN0YXRlLnRpbWVvdXRcbiAgICB9XG5cbiAgICAvLyBjbGVhciB0aGUgcmVzdG9yZSBmb2N1cyB0aW1lb3V0XG4gICAgY2xlYXJUaW1lb3V0KGdsb2JhbFN0YXRlLnJlc3RvcmVGb2N1c1RpbWVvdXQpXG5cbiAgICBjb25zdCBkb21DYWNoZSA9IHBvcHVsYXRlRG9tQ2FjaGUodGhpcylcblxuICAgIGRvbS5yZW5kZXIodGhpcywgaW5uZXJQYXJhbXMpXG5cbiAgICBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuc2V0KHRoaXMsIGlubmVyUGFyYW1zKVxuXG4gICAgcmV0dXJuIHN3YWxQcm9taXNlKHRoaXMsIGRvbUNhY2hlLCBpbm5lclBhcmFtcylcbiAgfVxuXG4gIC8vIGBjYXRjaGAgY2Fubm90IGJlIHRoZSBuYW1lIG9mIGEgbW9kdWxlIGV4cG9ydCwgc28gd2UgZGVmaW5lIG91ciB0aGVuYWJsZSBtZXRob2RzIGhlcmUgaW5zdGVhZFxuICB0aGVuKG9uRnVsZmlsbGVkKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHByaXZhdGVQcm9wcy5wcm9taXNlLmdldCh0aGlzKVxuICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25GdWxmaWxsZWQpXG4gIH1cblxuICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBwcml2YXRlUHJvcHMucHJvbWlzZS5nZXQodGhpcylcbiAgICByZXR1cm4gcHJvbWlzZS5maW5hbGx5KG9uRmluYWxseSlcbiAgfVxufVxuXG5jb25zdCBzd2FsUHJvbWlzZSA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gZnVuY3Rpb25zIHRvIGhhbmRsZSBhbGwgY2xvc2luZ3MvZGlzbWlzc2Fsc1xuICAgIGNvbnN0IGRpc21pc3NXaXRoID0gKGRpc21pc3MpID0+IHtcbiAgICAgIGluc3RhbmNlLmNsb3NlUG9wdXAoeyBpc0Rpc21pc3NlZDogdHJ1ZSwgZGlzbWlzcyB9KVxuICAgIH1cblxuICAgIHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVzb2x2ZS5zZXQoaW5zdGFuY2UsIHJlc29sdmUpXG4gICAgcHJpdmF0ZU1ldGhvZHMuc3dhbFByb21pc2VSZWplY3Quc2V0KGluc3RhbmNlLCByZWplY3QpXG5cbiAgICBkb21DYWNoZS5jb25maXJtQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2soaW5zdGFuY2UpXG4gICAgZG9tQ2FjaGUuZGVueUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gaGFuZGxlRGVueUJ1dHRvbkNsaWNrKGluc3RhbmNlKVxuICAgIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2soaW5zdGFuY2UsIGRpc21pc3NXaXRoKVxuXG4gICAgZG9tQ2FjaGUuY2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uY2xvc2UpXG5cbiAgICBoYW5kbGVQb3B1cENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG5cbiAgICBhZGRLZXlkb3duSGFuZGxlcihpbnN0YW5jZSwgZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aClcblxuICAgIGhhbmRsZUlucHV0T3B0aW9uc0FuZFZhbHVlKGluc3RhbmNlLCBpbm5lclBhcmFtcylcblxuICAgIG9wZW5Qb3B1cChpbm5lclBhcmFtcylcblxuICAgIHNldHVwVGltZXIoZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aClcblxuICAgIGluaXRGb2N1cyhkb21DYWNoZSwgaW5uZXJQYXJhbXMpXG5cbiAgICAvLyBTY3JvbGwgY29udGFpbmVyIHRvIHRvcCBvbiBvcGVuICgjMTI0NywgIzE5NDYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb21DYWNoZS5jb250YWluZXIuc2Nyb2xsVG9wID0gMFxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IHByZXBhcmVQYXJhbXMgPSAodXNlclBhcmFtcywgbWl4aW5QYXJhbXMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGVQYXJhbXMgPSBnZXRUZW1wbGF0ZVBhcmFtcyh1c2VyUGFyYW1zKVxuICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyYW1zLCBtaXhpblBhcmFtcywgdGVtcGxhdGVQYXJhbXMsIHVzZXJQYXJhbXMpIC8vIHByZWNlZGVuY2UgaXMgZGVzY3JpYmVkIGluICMyMTMxXG4gIHBhcmFtcy5zaG93Q2xhc3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyYW1zLnNob3dDbGFzcywgcGFyYW1zLnNob3dDbGFzcylcbiAgcGFyYW1zLmhpZGVDbGFzcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJhbXMuaGlkZUNsYXNzLCBwYXJhbXMuaGlkZUNsYXNzKVxuICByZXR1cm4gcGFyYW1zXG59XG5cbmNvbnN0IHBvcHVsYXRlRG9tQ2FjaGUgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgZG9tQ2FjaGUgPSB7XG4gICAgcG9wdXA6IGRvbS5nZXRQb3B1cCgpLFxuICAgIGNvbnRhaW5lcjogZG9tLmdldENvbnRhaW5lcigpLFxuICAgIGFjdGlvbnM6IGRvbS5nZXRBY3Rpb25zKCksXG4gICAgY29uZmlybUJ1dHRvbjogZG9tLmdldENvbmZpcm1CdXR0b24oKSxcbiAgICBkZW55QnV0dG9uOiBkb20uZ2V0RGVueUJ1dHRvbigpLFxuICAgIGNhbmNlbEJ1dHRvbjogZG9tLmdldENhbmNlbEJ1dHRvbigpLFxuICAgIGxvYWRlcjogZG9tLmdldExvYWRlcigpLFxuICAgIGNsb3NlQnV0dG9uOiBkb20uZ2V0Q2xvc2VCdXR0b24oKSxcbiAgICB2YWxpZGF0aW9uTWVzc2FnZTogZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlKCksXG4gICAgcHJvZ3Jlc3NTdGVwczogZG9tLmdldFByb2dyZXNzU3RlcHMoKSxcbiAgfVxuICBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuc2V0KGluc3RhbmNlLCBkb21DYWNoZSlcblxuICByZXR1cm4gZG9tQ2FjaGVcbn1cblxuY29uc3Qgc2V0dXBUaW1lciA9IChnbG9iYWxTdGF0ZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBkb20uZ2V0VGltZXJQcm9ncmVzc0JhcigpXG4gIGRvbS5oaWRlKHRpbWVyUHJvZ3Jlc3NCYXIpXG4gIGlmIChpbm5lclBhcmFtcy50aW1lcikge1xuICAgIGdsb2JhbFN0YXRlLnRpbWVvdXQgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgZGlzbWlzc1dpdGgoJ3RpbWVyJylcbiAgICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS50aW1lb3V0XG4gICAgfSwgaW5uZXJQYXJhbXMudGltZXIpXG4gICAgaWYgKGlubmVyUGFyYW1zLnRpbWVyUHJvZ3Jlc3NCYXIpIHtcbiAgICAgIGRvbS5zaG93KHRpbWVyUHJvZ3Jlc3NCYXIpXG4gICAgICBkb20uYXBwbHlDdXN0b21DbGFzcyh0aW1lclByb2dyZXNzQmFyLCBpbm5lclBhcmFtcywgJ3RpbWVyUHJvZ3Jlc3NCYXInKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0ICYmIGdsb2JhbFN0YXRlLnRpbWVvdXQucnVubmluZykge1xuICAgICAgICAgIC8vIHRpbWVyIGNhbiBiZSBhbHJlYWR5IHN0b3BwZWQgb3IgdW5zZXQgYXQgdGhpcyBwb2ludFxuICAgICAgICAgIGRvbS5hbmltYXRlVGltZXJQcm9ncmVzc0Jhcihpbm5lclBhcmFtcy50aW1lcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaW5pdEZvY3VzID0gKGRvbUNhY2hlLCBpbm5lclBhcmFtcykgPT4ge1xuICBpZiAoaW5uZXJQYXJhbXMudG9hc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICghY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dFbnRlcktleSkpIHtcbiAgICByZXR1cm4gYmx1ckFjdGl2ZUVsZW1lbnQoKVxuICB9XG5cbiAgaWYgKCFmb2N1c0J1dHRvbihkb21DYWNoZSwgaW5uZXJQYXJhbXMpKSB7XG4gICAgc2V0Rm9jdXMoaW5uZXJQYXJhbXMsIC0xLCAxKVxuICB9XG59XG5cbmNvbnN0IGZvY3VzQnV0dG9uID0gKGRvbUNhY2hlLCBpbm5lclBhcmFtcykgPT4ge1xuICBpZiAoaW5uZXJQYXJhbXMuZm9jdXNEZW55ICYmIGRvbS5pc1Zpc2libGUoZG9tQ2FjaGUuZGVueUJ1dHRvbikpIHtcbiAgICBkb21DYWNoZS5kZW55QnV0dG9uLmZvY3VzKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLmZvY3VzQ2FuY2VsICYmIGRvbS5pc1Zpc2libGUoZG9tQ2FjaGUuY2FuY2VsQnV0dG9uKSkge1xuICAgIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5mb2N1cygpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5mb2N1c0NvbmZpcm0gJiYgZG9tLmlzVmlzaWJsZShkb21DYWNoZS5jb25maXJtQnV0dG9uKSkge1xuICAgIGRvbUNhY2hlLmNvbmZpcm1CdXR0b24uZm9jdXMoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3QgYmx1ckFjdGl2ZUVsZW1lbnQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdHlwZW9mIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gIH1cbn1cblxuLy8gQXNzaWduIGluc3RhbmNlIG1ldGhvZHMgZnJvbSBzcmMvaW5zdGFuY2VNZXRob2RzLyouanMgdG8gcHJvdG90eXBlXG5PYmplY3QuYXNzaWduKFN3ZWV0QWxlcnQucHJvdG90eXBlLCBpbnN0YW5jZU1ldGhvZHMpXG5cbi8vIEFzc2lnbiBzdGF0aWMgbWV0aG9kcyBmcm9tIHNyYy9zdGF0aWNNZXRob2RzLyouanMgdG8gY29uc3RydWN0b3Jcbk9iamVjdC5hc3NpZ24oU3dlZXRBbGVydCwgc3RhdGljTWV0aG9kcylcblxuLy8gUHJveHkgdG8gaW5zdGFuY2UgbWV0aG9kcyB0byBjb25zdHJ1Y3RvciwgZm9yIG5vdywgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5PYmplY3Qua2V5cyhpbnN0YW5jZU1ldGhvZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICBTd2VldEFsZXJ0W2tleV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGlmIChjdXJyZW50SW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5zdGFuY2Vba2V5XSguLi5hcmdzKVxuICAgIH1cbiAgfVxufSlcblxuU3dlZXRBbGVydC5EaXNtaXNzUmVhc29uID0gRGlzbWlzc1JlYXNvblxuXG5Td2VldEFsZXJ0LnZlcnNpb24gPSAnMTEuNC44J1xuXG5leHBvcnQgZGVmYXVsdCBTd2VldEFsZXJ0XG4iLCJpbXBvcnQgU3dlZXRBbGVydCBmcm9tICcuL1N3ZWV0QWxlcnQuanMnXG5cbmNvbnN0IFN3YWwgPSBTd2VldEFsZXJ0XG4vLyBAdHMtaWdub3JlXG5Td2FsLmRlZmF1bHQgPSBTd2FsXG5cbmV4cG9ydCBkZWZhdWx0IFN3YWxcbiIsImltcG9ydCBTd2FsIGZyb20gXCJzd2VldGFsZXJ0MlwiO1xuaW1wb3J0ICdzd2VldGFsZXJ0Mi9zcmMvc3dlZXRhbGVydDIuc2NzcydcbmltcG9ydCB7IGp1ZGdlRGxnQ29udGVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuaW1wb3J0ICcuL2RpYWxvZ3VlLnNjc3MnXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgU3dhbC5maXJlKHtcbiAgICAgICAgdGl0bGU6ICdFcnJvciEnLFxuICAgICAgICB0ZXh0OiAnRG8geW91IHdhbnQgdG8gY29udGludWUnLFxuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0Nvb2wnXG4gICAgfSlcbiAgICBjb25zb2xlLmRpcihTd2FsKVxufVxuXG4vLyBsZXQgc3dhbCA9IFN3YWwuZmlyZTtcbmxldCBEbGdJZCA9IDBcblxuZXhwb3J0IGNsYXNzIERpYWxvZ3Vle1xuICAgIGlkOiBudW1iZXJcbiAgICBpbnB1dFZhbHVlOiBBcnJheTxEYXRhPlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuaWQgPSBEbGdJZDtcbiAgICAgICAgRGxnSWQrKztcbiAgICB9XG4gICAgaW5wdXREbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGludCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCB2YWx1ZSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgaW5wdXRJZCA9IFwiZXpwc3ktZGxnLWlucHV0XCIgKyBudW1iZXI7XG4gICAgICAgIGxldCBkb20gPSBuZXcgQXJyYXkoKVxuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+i+k+WFpeWvueivnScpO1xuICAgICAgICBjb25zb2xlLmRpcihkbGdDb250ZW50KVxuICAgICAgICBpZihkbGdDb250ZW50LmlucHV0KXtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkbGdDb250ZW50LmlucHV0ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnQucHVzaChkbGdDb250ZW50LmlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaW50ID0gZGxnQ29udGVudC5pbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIHNldCBpbnB1dCBpbiB5b3VyIG9iamVjdCEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LnZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0eXBlb2YgZGxnQ29udGVudC52YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaChkbGdDb250ZW50LnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRsZ0NvbnRlbnQudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaCgnJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBpbnQubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0ICArIFwiPGRpdiBjbGFzcz0nZXpwc3ktZGxnLWlucHV0LXRpdGxlJz5cIiAraW50W2ldKyBcIjwvZGl2PlwiIFxuICAgICAgICAgICAgICAgICsgXCIgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPSdlenBzeS1kbGctaW5wdXQnIG5hbWU9ICdcIlxuICAgICAgICAgICAgICAgICsgaW5wdXRJZCArXCInIGlkPSdcIiArIGlucHV0SWQgKyBcIicgdmFsdWU9J1wiKyB2YWx1ZVtpXSArIFwiJyAvPjxicj5cIjtcbiAgICAgICAgICAgIG51bWJlcisrO1xuICAgICAgICAgICAgaW5wdXRJZCA9IFwiZXpwc3ktZGxnLWlucHV0XCIgKyBudW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kaXIodGV4dClcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIGh0bWw6IHRleHQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZUNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHRtbERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXpwc3ktZGxnLWlucHV0XCIraSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6IGludFtpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTElucHV0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWUgPSBkb207XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICByZXMoJ251bGwnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGVycm9yRGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+mUmeivr+WvueivnScsJ+mUmeivr+S/oeaBrycpO1xuICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ2Vycm9yJ1xuICAgICAgICB9KVxuICAgIH1cbiAgICBoZWxwRGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+W4ruWKqeWvueivnScsJ+W4ruWKqeS/oeaBrycpO1xuICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ2luZm8nXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGxpc3REbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn5YiX6KGo6YCJ5oup5a+56K+dJylcbiAgICAgICAgbGV0IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBkb20gPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgdGhhdCA9IHRoaXNcbiAgICAgICAgaWYoZGxnQ29udGVudC5Jc011bHRpKVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICAgICAgbGV0IGtleSA9IE9iamVjdC5rZXlzKGRsZ0NvbnRlbnQubGlzdCk7XG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBPYmplY3QudmFsdWVzKGRsZ0NvbnRlbnQubGlzdCk7XG4gICAgICAgICAgICB0ZXh0ICs9IFwiPGRpdiBjbGFzcz0nZXpwc3ktZGxnLU11bHRpRGl2Jz7mjInkvY9TaGlmdOaIlkNvbnRyb2zplK7ov5vooYzlpJrpgIk8L2Rpdj5cIlxuICAgICAgICAgICAgdGV4dCArPSBcIjxzZWxlY3QgaWQ9J2V6cHN5LWRsZy1zZWxlY3QwJyBjbGFzcz0nZXpwc3ktZGxnLW11bHRpU2VsZWN0IHN3YWwyLXNlbGVjdCcgc3R5bGU9J2Rpc3BsYXk6IGZsZXgnIG11bHRpcGxlPSd0cnVlJz5cXG5cIjtcbiAgICAgICAgICAgIC8vIHRleHQgKz0gXCIgICA8b3B0aW9uIHZhbHVlIGRpc2FibGVkPlNlbGVjdDwvb3B0aW9uPlxcblwiXG5cbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGtleS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKHZhbHVlW2ldIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGtleTAgPSBPYmplY3Qua2V5cyh2YWx1ZVtpXSlcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMCA9IE9iamVjdC52YWx1ZXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCIgICA8b3B0Z3JvdXAgbGFiZWw9J1wiKyBrZXlbaV0gK1wiJyA+XFxuXCJcbiAgICAgICAgICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwga2V5MC5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIiAgICAgICA8b3B0aW9uIHZhbHVlPSdcIisga2V5MFtqXSArXCInPlwiKyB2YWx1ZTBbal0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSAnPC9vcHRncm91cD4nXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCIgICA8b3B0aW9uIHZhbHVlPSdcIisga2V5W2ldICtcIic+XCIrIHZhbHVlW2ldICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGxldCBzZWxlY3RJZCA9IFwiZXpwc3ktZGxnLXNlbGVjdFwiICsgbnVtYmVyXG4gICAgICAgICAgICAgICAgLy8gbnVtYmVyKys7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCArPSBcIiAgIDxzZWxlY3QgaWQ9J1wiKyBzZWxlY3RJZCArXCInIGNsYXNzPSdzd2FsMi1zZWxlY3QnIHN0eWxlPSdkaXNwbGF5OiBmbGV4Jz5cXG5cIjtcbiAgICAgICAgICAgICAgICAvLyB0ZXh0ICs9IFwiICAgPG9wdGlvbiB2YWx1ZT0gJ2Rpc2FibGVkJz5cIisga2V5W2ldICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgLy8gaWYodmFsdWVbaV0gaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgICBsZXQga2V5MCA9IE9iamVjdC5rZXlzKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgIC8vICAgICBsZXQgdmFsdWUwID0gT2JqZWN0LnZhbHVlcyh2YWx1ZVtpXSlcbiAgICAgICAgICAgICAgICAvLyAgICAgZm9yKGxldCBqID0gMDtqIDwga2V5MC5sZW5ndGg7aisrKVxuICAgICAgICAgICAgICAgIC8vICAgICB7XG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB0ZXh0ICs9IFwiICAgICAgIDxvcHRpb24gdmFsdWU9J1wiKyBrZXkwW2pdICtcIic+XCIrIHZhbHVlMFtqXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIGVsc2V7XG4gICAgICAgICAgICAgICAgLy8gICAgIHRleHQgKz0gXCIgICAgICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleVtpXSArXCInPlwiKyB2YWx1ZVtpXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyB0ZXh0ICs9ICc8L3NlbGVjdD5cXG4nXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRleHQgKz0gXCI8L3NlbGVjdD5cIlxuXG4gICAgICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBodG1sOiB0ZXh0LFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY29uZmlybSxcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBkbGdDb250ZW50LmNhbmNlbCxcbiAgICAgICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bicsXG4gICAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcmVDb25maXJtOiAoKT0+e1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHRtbERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdlenBzeS1kbGctc2VsZWN0MCcpXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGh0bWxEb20pXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPCg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0Z3JvdXAgPSAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRncm91cCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTE9wdEdyb3VwRWxlbWVudD5vcHRncm91cCkubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0udmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb20ucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBsZXQgc2VsID0gT2JqZWN0LmtleXMoZGxnQ29udGVudC5saXN0KVxuICAgICAgICAgICAgICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2kgPCBzZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImV6cHN5LWRsZy1zZWxlY3RcIitpKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBkYXRhOiBEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRhdGFOYW1lOiBzZWxbaV0sXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGF0YTogKDxIVE1MSW5wdXRFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBkb20ucHVzaChkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWUgPSBkb207XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkb21cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBpbnB1dDogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsICBcbiAgICAgICAgICAgICAgICBpbnB1dE9wdGlvbnM6IGRsZ0NvbnRlbnQubGlzdCxcbiAgICAgICAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiAnU2VsZWN0JyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdlenBzeS1kbGctc2VsZWN0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJlQ29uZmlybTogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzd2FsMi1zZWxlY3QnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8KDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRncm91cCA9ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGdyb3VwIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTE9wdEdyb3VwRWxlbWVudD5vcHRncm91cCkubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlID0gZG9tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9tXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzKFwibnVsbFwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBxdWVzdERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfor6Lpl67lr7nor50nLCfor6Lpl67kv6Hmga8nKTtcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ3F1ZXN0aW9uJ1xuICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGUudmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICByZXMoZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIHdhcm5EbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn5biu5Yqp5a+56K+dJywn5biu5Yqp5L+h5oGvJyk7XG4gICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiAnd2FybmluZydcbiAgICAgICAgfSlcbiAgICB9XG4gICAgbXNnRGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBpZihkbGdDb250ZW50LmltZ1VybCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZGxnQ29udGVudC5pbWdVcmwgPSAnaHR0cHM6Ly91bnNwbGFzaC5pdC80MDAvMjAwJ1xuICAgICAgICBpZihkbGdDb250ZW50LmltZ1dpZHRoID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkbGdDb250ZW50LmltZ1dpZHRoID0gNDAwXG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuaW1nSGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkbGdDb250ZW50LmltZ0hlaWdodCA9IDIwMFxuICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIHdpZHRoOiAxLjIgKiBkbGdDb250ZW50LmltZ1dpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0QXV0bzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY29uZmlybSxcbiAgICAgICAgICAgIGltYWdlVXJsOiBkbGdDb250ZW50LmltZ1VybCxcbiAgICAgICAgICAgIGltYWdlV2lkdGg6IGRsZ0NvbnRlbnQuaW1nV2lkdGgsXG4gICAgICAgICAgICBpbWFnZUhlaWdodDogZGxnQ29udGVudC5pbWdIZWlnaHQsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGUudmFsdWUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbmludGVyZmFjZSBEYXRhe1xuICAgIGRhdGFOYW1lOiBzdHJpbmdcbiAgICBkYXRhOiBzdHJpbmdcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEbGdDb250ZW50e1xuICAgIHRpdGxlOiBzdHJpbmdcbiAgICBjb250ZW50Pzogc3RyaW5nXG4gICAgaW1nVXJsPzogc3RyaW5nXG4gICAgaW1nV2lkdGg/OiBudW1iZXJcbiAgICBpbWdIZWlnaHQ/OiBudW1iZXJcbiAgICBjb25maXJtPzogc3RyaW5nXG4gICAgY2FuY2VsPzogc3RyaW5nXG4gICAgaW5wdXQ/OiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nXG4gICAgdmFsdWU/OiBBcnJheTxzdHJpbmc+IHwgc3RyaW5nXG4gICAgbGlzdD86IE9iamVjdFxuICAgIElzTXVsdGk/OiBib29sZWFuXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEbGdJbml0KCl7XG4gICAgbGV0IGRsZyA9IG5ldyBEaWFsb2d1ZSgpO1xuICAgIHJldHVybiBkbGc7XG59IiwiaW1wb3J0ICogYXMgZXpVdGlscyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0ICogYXMgZXpDYW52YXMgZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpUaW1lIGZyb20gJy4vVGltZS90aW1lJ1xuaW1wb3J0ICogYXMgZXpUaW1lciBmcm9tICcuL1RpbWUvdGltZVBlcmZvcm1hbmNlJ1xuaW1wb3J0IHsgY2FudmFzU3R5bGUgfSBmcm9tICcuL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgKiBhcyBlelJlY3RhbmdsZSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vU3RvcmFnZS9zdG9yYWdlJ1xuaW1wb3J0IHsgVGV4dExpbmUsVGV4dHMgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbi8vIGltcG9ydCB7IEdyYXRPcHRzLHNpbkdyYXQgfSBmcm9tICcuL0dyYXBoaWMvc2luR3JhdCdcblxuXG5cbi8vIGV4cG9ydCB7IEFkam9pblJlY3QsUmVjdENlbnRlciB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgKiBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9jaXJjbGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvbGluZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9hcmMnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG5leHBvcnQgKiBmcm9tICcuL1RpbWUvdGltZSdcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MnXG4vLyBleHBvcnQgKiBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2dyYXRpbmcnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvc2luR3JhdCdcbmV4cG9ydCAqIGZyb20gJy4vVGltZS90aW1lUGVyZm9ybWFuY2UnXG5leHBvcnQgKiBmcm9tICcuL0tleXByZXNzL2tleXByZXNzMCdcbmV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUwJ1xuZXhwb3J0IHsgUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCB7IEdyb3VwIH0gZnJvbSAnLi9Hcm91cC9ncm91cCdcbmV4cG9ydCB7IENpcmNsZSB9IGZyb20gJy4vR3JhcGhpYy9jaXJjbGUnXG5leHBvcnQgeyBMaW5lIH0gZnJvbSAnLi9HcmFwaGljL2xpbmUnXG5leHBvcnQgeyBBcmMgfSBmcm9tICcuL0dyYXBoaWMvYXJjJ1xuZXhwb3J0IHsgRWxsaXBzZSB9IGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xuZXhwb3J0IHsgUG9seWdvbiB9IGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xuZXhwb3J0IHsgVGV4dHMgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCB7IEltZyB9IGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCB7IEtleXByZXNzIH0gZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzczAnXG4vLyBleHBvcnQgeyBUaW1lIH0gZnJvbSAnLi9UaW1lL3RpbWUnXG4vLyBleHBvcnQgeyBEaWFsb2d1ZV8wfSBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuZXhwb3J0IHsgR3JhdCB9IGZyb20gJy4vR3JhcGhpYy9ncmF0aW5nJ1xuZXhwb3J0IHsgVGltZSB9IGZyb20gJy4vVGltZS90aW1lUGVyZm9ybWFuY2UnXG5cbi8vIGV4cG9ydCB7IGFuaW1hdGUgfSBmcm9tICcuL0FuaW1hdGUvYW5pbWF0ZSdcbi8vIGV4cG9ydCB7IG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuIFxuLy8gbGV0IEV6cHN5TGlzdCA9IG5ldyBBcnJheSgpO1xuXG5jbGFzcyBFenBzeSB7XG4gICAgcmVhZG9ubHkgaWQ6IG51bWJlclxuICAgIGRvbTogSFRNTEVsZW1lbnRcbiAgICByZWFkb25seSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRFxuICAgIC8vIGN0eExpc3Q6IEFycmF5PENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRD5cbiAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICBjU3R5bGU/OiBjYW52YXNTdHlsZVxuXG4gICAgLy8gUmVjdGFuZ2xlOiBSZWN0YW5nbGVcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSl7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIHRoaXMuY1N0eWxlID0gY1N0eWxlO1xuICAgICAgICAvLyB0aGlzLmN0eExpc3QgPSBbXVxuICAgICAgICB0aGlzLmN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyhkb20sY1N0eWxlKTsgICAgLy/mraTlpITliJvlu7pjYW52YXPvvIzlj6/ku4XliJvlu7rkuIDkuKpjYW52YXPvvIzkvYbmmK/nm67liY3ml6Dms5Xku4XmuIXpmaTkuIDkuKrlm77lvaJcbiAgICAgICAgLy8gdGhpcy5jdHhMaXN0LnB1c2godGhpcy5jdHgpXG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuY3R4KVxuICAgIH1cblxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xuICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmN0eExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICBsZXQgYyA9IHRoaXMuY3R4TGlzdFtpXS5jYW52YXM7XG4gICAgICAgIC8vICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoXG4gICAgICAgIC8vICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHRcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZWwgPSB0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICAgICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgICAgICBjLnN0eWxlLnRvcCA9ICgoaC1jU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBjLnN0eWxlLmxlZnQgPSAoKHctY1N0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICB0aGlzLmNTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBjU3R5bGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNTdHlsZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpe1xuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0KVxuICAgICAgICAvLyB0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlRHJhdyh0aGlzLmN0eClcbiAgICB9XG5cbiAgICAvLyBzZXRBbmltYXRlQ2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMuY3R4TGlzdC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBsZXQgYyA9IHRoaXMuY3R4TGlzdFtpXS5jYW52YXM7XG4gICAgLy8gICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoXG4gICAgLy8gICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHRcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGFkZChlbDogRWxlbWVudHN8RWxlbWVudHNbXXxHcm91cCl7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBsZXQgc3QgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgbGV0IG5hbWUgPSBzdC5nZXRFbGVtZW50c05hbWUoZWwpXG4gICAgICAgIGxldCBpbmRleCA9IHN0LnNlYXJjaEVsZW1lbnRzTmFtZShuYW1lKVxuICAgICAgICBcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50c3x8ZWwgaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZWwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgZWwuY3R4ID0gY3R4O1xuICAgICAgICAgICAgICAgIGVsLnN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IGVsW2ldXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZSlcbiAgICAgICAgICAgICAgICAvLyBlbFtpXS5jdHggPSBjdHhcbiAgICAgICAgICAgICAgICAvLyBlbFtpXS5zdG9yYWdlID0gdGhpcy5zdG9yYWdlXG4gICAgICAgICAgICAgICAgLy8gZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWxbaV0sY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdfEdyb3VwKVxuICAgIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBjICA9IGN0eC5jYW52YXNcbiAgICAgICAgYy53aWR0aCA9IHRoaXMuY1N0eWxlLndpZHRoXG4gICAgICAgIGMuaGVpZ2h0ID0gdGhpcy5jU3R5bGUuaGVpZ2h0XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoZWwpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eCk7ICAgXG4gICAgfVxuXG4gICAgLy8gYWxpYXNpbmcoc3R5bGU6IHN0cmluZyl7XG4gICAgLy8gICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHN0eWxlXG4gICAgLy8gfVxuXG4gICAgYW5pbWF0ZShlbDogRWxlbWVudHMsZnVuYzogRnVuY3Rpb24sZGVsYXk6IG51bWJlcil7XG4gICAgICAgIC8vIGVsLmN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIGVsLnJlbW92ZSgpO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIC8vIGxldCBjdHggPSBlekNhbnZhcy5jcmVhdGVDYW52YXModGhpcy5kb20sdGhpcy5jU3R5bGUpOyBcbiAgICAgICAgLy8gdGhpcy5jdHhMaXN0LnB1c2goY3R4KTtcblxuICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2hpbGUoMSl7XG4gICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZShkZWxheSk7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB0aGF0LmFkZChlbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcblxuICAgICAgICAvLyB3aW5kb3cuc2V0SW50ZXJ2YWwoKCk9PntcbiAgICAgICAgLy8gICAgIC8vIGxldCBhID0gcGVyZm9ybWFuY2Uubm93KClcbiAgICAgICAgLy8gICAgIGZ1bmMoKTtcbiAgICAgICAgLy8gICAgIC8vIGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgLy8gICAgIGV6VGltZXIuc2xlZXAoZGVsYXkpLnRoZW4oKCk9PntcbiAgICAgICAgLy8gICAgICAgICBlbC5yZW1vdmUoKVxuICAgICAgICAvLyAgICAgICAgIHRoYXQuYWRkKGVsKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmRpcihwZXJmb3JtYW5jZS5ub3coKSAtIGEgLSAxMDApXG4gICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgXG4gICAgICAgIC8vIH0sMClcblxuXG4gICAgICAgIC8vIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgMTA7aSsrKVxuICAgICAgICAvLyAgICAge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAvLyAgICAgICAgIGF3YWl0IGZ1bmMoKTtcbiAgICAgICAgLy8gICAgICAgICAvLyBhd2FpdCBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgZXpUaW1lci5zbGVlcChkZWxheSlcbiAgICAgICAgLy8gICAgICAgICBhd2FpdCBlbC5yZW1vdmUoKVxuICAgICAgICAvLyAgICAgICAgIGF3YWl0IHRoYXQuYWRkKGVsKTtcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGF0LnN0b3JhZ2UucHVzaChlbClcbiAgICAgICAgLy8gICAgICAgICAvLyB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eClcbiAgICAgICAgLy8gICAgICAgICAvLyBlekp1ZGdlLmp1ZGdlQW5pbWF0ZShlbCxjdHgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGF3YWl0IHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAgICAgLy8gICAgICAgICAvLyBhd2FpdCBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH0pKClcbiAgICB9XG5cbiAgICAvLyBzaW5HcmF0UGxheShvcHRzOiBHcmF0T3B0cyl7XG4gICAgLy8gICAgIGxldCBzaW5HcmF0TGlzdCA9IG5ldyBBcnJheSgpO1xuICAgIC8vICAgICBsZXQgc2ggPSBvcHRzLnNoYXBlO1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBNYXRoLmZsb29yKDYwKnNoLmN5Y2xlKTtpKyspXG4gICAgLy8gICAgIHtcbiAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgbGV0IHNpbmdyYXQgPSBuZXcgc2luR3JhdCh7XG4gICAgLy8gICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgeDogc2gueCxcbiAgICAvLyAgICAgICAgICAgICAgICAgeTogc2gueSxcbiAgICAvLyAgICAgICAgICAgICAgICAgcjogc2gucixcbiAgICAvLyAgICAgICAgICAgICAgICAgcGl4ZWxzUGVyRGVncmVlOiBzaC5waXhlbHNQZXJEZWdyZWUsIFxuICAgIC8vICAgICAgICAgICAgICAgICBzcGF0aWFsRnJlcXVlbmN5OiBzaC5zcGF0aWFsRnJlcXVlbmN5LFxuICAgIC8vICAgICAgICAgICAgICAgICBhbmdsZTogc2guYW5nbGUsIFxuICAgIC8vICAgICAgICAgICAgICAgICBjb250cmFzdDogc2guY29udHJhc3QsIFxuICAgIC8vICAgICAgICAgICAgICAgICBwaGFzZTogc2gucGhhc2UgKyAyKmkqTWF0aC5QSS82MCxcbiAgICAvLyAgICAgICAgICAgICAgICAgY3ljbGU6IHNoLmN5Y2xlLFxuICAgIC8vICAgICAgICAgICAgICAgICBzcGVlZDogc2guc3BlZWRcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KTtcbiAgICAvLyAgICAgICAgIHNpbkdyYXRMaXN0LnB1c2goc2luZ3JhdCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgY29uc29sZS5kaXIoc2luR3JhdExpc3QpO1xuICAgIC8vICAgICAoYXN5bmMgKCk9PntcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHNpbkdyYXRMaXN0Lmxlbmd0aDtpKz1zaC5zcGVlZClcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICB0aGlzLmFkZChzaW5HcmF0TGlzdFtpXSlcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCBlelRpbWUuZGVsYXlfZnJhbWUoMSk7XG4gICAgLy8gICAgICAgICAgICAgaWYoaSE9PXNpbkdyYXRMaXN0Lmxlbmd0aC1zaC5zcGVlZClcbiAgICAvLyAgICAgICAgICAgICAgICAgc2luR3JhdExpc3RbaV0ucmVtb3ZlKCk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pKClcbiAgICAvLyB9XG5cbiAgICBzZXRUZXh0TGluZSh0ZXh0TGluZTogVGV4dExpbmUpXG4gICAge1xuICAgICAgICBsZXQgYyA9IHRoaXMuY3R4LmNhbnZhcztcbiAgICAgICAgYy53aWR0aCA9IHRoaXMuY1N0eWxlLndpZHRoXG4gICAgICAgIGMuaGVpZ2h0ID0gdGhpcy5jU3R5bGUuaGVpZ2h0XG4gICAgICAgIGxldCBzdCA9IHRoaXMuc3RvcmFnZVxuICAgICAgICBzdC50ZXh0TGluZSA9IHRleHRMaW5lXG4gICAgICAgIGlmKHRleHRMaW5lKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0ZXh0TGluZS50ZXh0QSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRleHRMaW5lLnRleHRBID0gdGV4dExpbmUudGV4dEFcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzdC5FbGVtZW50c0xpc3QubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHN0LkVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIFRleHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3QuRWxlbWVudHNMaXN0W2ldLnRleHRMaW5lLnRleHRBID0gdGV4dExpbmUudGV4dEFcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihzdC5FbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdC5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3RbdF0gaW5zdGFuY2VvZiBUZXh0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3RbdF0udGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRCKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dExpbmUudGV4dEIgPSB0ZXh0TGluZS50ZXh0QlxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0LkVsZW1lbnRzTGlzdC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdC5FbGVtZW50c0xpc3RbaV0udGV4dExpbmUudGV4dEIgPSB0ZXh0TGluZS50ZXh0QlxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LkVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XSBpbnN0YW5jZW9mIFRleHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XS50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN0LnJlRHJhdyh0aGlzLmN0eCk7XG4gICAgfVxuXG4gICAgY2xlYXIoKXtcbiAgICAgICAgLy8gbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAvLyB0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIC8vIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgIC8vICAgICBsZXQgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgIC8vICAgICB3aGlsZShjaGlsZCl7XG4gICAgICAgIC8vICAgICAgICAgdGhhdC5kb20ucmVtb3ZlQ2hpbGQoY2hpbGQpXG4gICAgICAgIC8vICAgICAgICAgY2hpbGQgPSB0aGF0LmRvbS5sYXN0RWxlbWVudENoaWxkXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vICAgICByZXNvbHZlKDApXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKCk7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICB9XG5cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHB1c2hFenBzeUxpc3QoZXo6IEV6cHN5KXtcbi8vICAgICBsZXQgbnVtID0gZXouaWQ7XG4vLyAgICAgRXpwc3lMaXN0W251bV0gPSBlejtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSkge1xuICAgIGxldCBleiA9IG5ldyBFenBzeShlelV0aWxzLkNvdW50KCksZG9tLGNTdHlsZSk7XG4gICAgLy8gcHVzaEV6cHN5TGlzdChleik7XG4gICAgLy8gY29uc29sZS5kaXIoRXpwc3lMaXN0KTtcbiAgICByZXR1cm4gZXo7XG59Il0sIm5hbWVzIjpbImV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZSIsImV6SnVkZ2UuanVkZ2VFbGVtZW50IiwiZXpUaW1lLmRlbGF5X2ZyYW1lIiwibmFtZUlkIiwiZXpKdWRnZS5qdWRnZVRSUyIsImV6U2luR3JhdC5zaW5HcmF0IiwiZ2V0UHJvZ3Jlc3NTdGVwcyIsImlzVmlzaWJsZSIsImdldElucHV0IiwicmVzZXRWYWxpZGF0aW9uTWVzc2FnZSIsImluaXQiLCJkb20uZ2V0QWN0aW9ucyIsImRvbS5nZXRMb2FkZXIiLCJkb20uaGlkZSIsImRvbS5zaG93IiwiZG9tLmFwcGx5Q3VzdG9tQ2xhc3MiLCJkb20uc2V0SW5uZXJIdG1sIiwiZG9tLmdldENvbmZpcm1CdXR0b24iLCJkb20uZ2V0RGVueUJ1dHRvbiIsImRvbS5nZXRDYW5jZWxCdXR0b24iLCJkb20ucmVtb3ZlQ2xhc3MiLCJkb20uYWRkQ2xhc3MiLCJkb20udG9nZ2xlIiwiZG9tLmdldENvbnRhaW5lciIsImRvbS5nZXRQb3B1cCIsImRvbS5nZXREaXJlY3RDaGlsZEJ5Q2xhc3MiLCJkb20uZm9jdXNJbnB1dCIsImRvbS5nZXRJbnB1dCIsImRvbS5nZXRIdG1sQ29udGFpbmVyIiwiZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyIiwiZG9tLmdldEZvb3RlciIsImRvbS5nZXRDbG9zZUJ1dHRvbiIsImRvbS5nZXRJY29uIiwiZG9tLnNldFN0eWxlIiwiZG9tLmdldEltYWdlIiwiZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUiLCJkb20uZ2V0UHJvZ3Jlc3NTdGVwcyIsImRvbS5nZXRUaXRsZSIsImRvbS5nZXRWYWxpZGF0aW9uTWVzc2FnZSIsImFkZENsYXNzZXMiLCJkb20uaXNWaXNpYmxlIiwiZG9tLmluaXQiLCJkb20uc3RhdGVzIiwiZG9tLm1lYXN1cmVTY3JvbGxiYXIiLCJkb20uaGFzQ2xhc3MiLCJkb20uaXNTY3JvbGxhYmxlIiwiZG9tLmlzTW9kYWwiLCJkb20uaXNUb2FzdCIsImRvbS5hbmltYXRpb25FbmRFdmVudCIsImRvbS5oYXNDc3NBbmltYXRpb24iLCJkb20uYWxsQnV0dG9uc0FyZUhpZGRlbiIsImRvbVV0aWxzLmlzVmlzaWJsZSIsImRvbS5nZXRGb2N1c2FibGVFbGVtZW50cyIsImRvbS5yZW5kZXIiLCJ0aGlzIiwiZG9tLmdldFRpbWVyUHJvZ3Jlc3NCYXIiLCJkb20uYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIiLCJlekNhbnZhcy5jcmVhdGVDYW52YXMiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O1NDRWdCLFlBQVksQ0FBQyxHQUFnQixFQUFDLE1BQW9CO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7O0lBS3hDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUM3QixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7SUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTs7SUFFMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7SUFDckQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7SUFDckQsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2QsT0FBTyxHQUFHLENBQUM7QUFDZjs7QUN2QkEsTUFBTSxJQUFJO0lBQ04sSUFBSSxDQUFRO0lBQ1osT0FBTyxDQUFRO0lBQ2YsT0FBTyxDQUFRO0lBQ2YsWUFBWSxDQUFRO0lBQ3BCO1FBQ0ksSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUMzQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQTtLQUM3QztDQUNKO01BRVksS0FBSztJQUNkLFNBQVMsQ0FBTTtJQUNmLFdBQVcsQ0FBYTtJQUN4QixTQUFTLENBQWE7SUFDdEIsSUFBSSxDQUFRO0lBQ1osU0FBUyxDQUFlO0lBQ3hCO1FBQ0ksSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUE7UUFDckIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO1FBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFBO0tBQ3RCO0lBQ0QsS0FBSztRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtLQUM5QjtJQUNELE1BQU07UUFDRixJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ2xCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtLQUNkO0NBQ0o7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO1NBRWdCLFNBQVMsQ0FBQyxLQUFhLEVBQUMsT0FBYTtJQUNqRCxPQUFPLElBQUksT0FBTyxDQUFDLFVBQVMsT0FBTyxFQUFDLE1BQU07UUFDdEMsVUFBVSxDQUFDOztZQUVQLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNkLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDYixDQUFDLENBQUE7QUFDTixDQUFDO1NBRWUsV0FBVyxDQUFDLElBQUk7SUFDNUIsSUFBSSxRQUFRLEdBQUMsQ0FBQyxDQUFDO0lBQ2YsT0FBTyxJQUFJLE9BQU8sQ0FBQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBQ3hDLENBQUMsU0FBUyxHQUFHO1lBQ1QsUUFBUSxFQUFFLENBQUM7WUFDWCxJQUFJLEVBQUUsR0FBRSxNQUFNLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDOUMsSUFBSSxRQUFRLEdBQUMsSUFBSSxFQUFDO2dCQUNkLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ2Q7U0FDSixFQUFFLEVBQUM7S0FDSCxDQUFDLENBQUE7QUFDTjs7TUN0R2EsUUFBUTtJQUNSLElBQUksQ0FBWTtJQUN6QixLQUFLLENBQVE7SUFDYixLQUFLLENBQVE7SUFDYixRQUFRLENBQVc7SUFDbkIsR0FBRyxDQUEyQjtJQUM5QixPQUFPLENBQVU7SUFDakIsS0FBSyxDQUFRO0lBQ2IsU0FBUyxDQUFZO0lBQ3JCLE1BQU0sQ0FBUztJQUNmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRztZQUNiLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDUCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRztZQUNULEtBQUssRUFBRSxDQUFDO1lBQ1IsTUFBTSxFQUFFLENBQUM7U0FDWixDQUFBO1FBQ0QsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7S0FDbEI7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQzVCO0lBQ0QsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7UUFRekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQzdCO0lBQ0QsY0FBYyxDQUFDLE1BQW1CO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDbEIsTUFBTSxHQUFHQSxnQkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7UUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTs7UUFFMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDckQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDckQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2RDLFlBQW9CLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQy9CO0lBQ0QsTUFBTTtRQUVGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFFbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBOztRQUVWLEdBQUcsQ0FBQyxTQUFTLEdBQUMsT0FBTyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLHdCQUF3QixHQUFDLGdCQUFnQixDQUFDO1FBQzlDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRXRCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNiLEdBQUcsQ0FBQyx3QkFBd0IsR0FBQyxhQUFhLENBQUE7UUFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0tBVTVCO0lBRUQsT0FBTyxDQUFDLElBQWMsRUFBQyxLQUFhOztRQUVoQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O1FBRWhCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7UUFJbkIsQ0FBQzs7O1lBSUcsT0FBTSxDQUFDLEVBQUM7O2dCQUVKLElBQUksRUFBRSxDQUFDO2dCQUNQLE1BQU1DLFdBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ2hDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQTtnQkFDYixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBc0JKLEdBQUcsQ0FBQTtLQUNQOzs7QUMzSEwsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO01BRUgsS0FBTSxTQUFRLFFBQVE7SUFDdEIsSUFBSSxHQUFlO1FBQ3hCLElBQUksRUFBRSxPQUFPLEdBQUcsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUNsQyxTQUFTLEVBQUUsT0FBTztLQUNyQixDQUFBO0lBQ0QsTUFBTSxDQUFROztJQUVkLFNBQVMsQ0FBMEI7SUFFbkMsWUFBWSxFQUE0QjtRQUVwQyxLQUFLLEVBQUUsQ0FBQTtRQUVQLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQTs7UUFFcEIsSUFBRyxFQUFFLFlBQVksS0FBSyxFQUN0QjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1NBQ2xCO2FBQ0c7WUFDQSxJQUFJLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztRQUVwQixPQUFPLEVBQUUsQ0FBQTtLQUNaOzs7QUNkTCxNQUFNLE1BQU07SUFDUixJQUFJLENBQVc7SUFDZixDQUFDLENBQVE7SUFDVCxDQUFDLENBQVE7SUFDVCxZQUFZLElBQWU7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDakIsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7S0FDakQ7Q0FDSjtBQUVELE1BQU0sSUFBSTtJQUNOLElBQUksQ0FBVztJQUNmLEtBQUssQ0FBUTtJQUNiLE1BQU0sQ0FBUTtJQUNkLFlBQVksSUFBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO1FBQzdCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUE7S0FDbEM7Q0FDSjtBQUVELE1BQU0sTUFBTTtJQUNSLENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNUO0tBRUM7Q0FDSjtNQUVZLFNBQVUsU0FBUSxLQUFLO0lBQ2hDLFdBQVcsQ0FBVztJQUN0QixZQUFZLElBQWUsRUFBQyxFQUFjO1FBQ3RDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNULElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO0tBQzNCO0NBQ0o7QUFFRCxJQUFJQyxRQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO01BRWEsU0FBVSxTQUFRLFFBQVE7SUFDMUIsSUFBSSxHQUFlO1FBQ3hCLElBQUksRUFBRSxNQUFNLEdBQUdBLFFBQU0sQ0FBQyxRQUFRLEVBQUU7UUFDaEMsU0FBUyxFQUFFQSxRQUFNO0tBQ3BCLENBQUE7SUFDRCxZQUFZLElBQW1CO1FBQzNCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztRQUNyQixJQUFHLElBQUksQ0FBQyxLQUFLLEVBQ2I7WUFDSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDM0I7YUFDRztZQUNBLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1QsSUFBSSxFQUFFLE1BQU07Z0JBQ1osTUFBTSxFQUFFLE1BQU07Z0JBQ2QsU0FBUyxFQUFFLENBQUM7YUFDZixDQUFBO1NBQ0o7UUFFREEsUUFBTSxFQUFFLENBQUE7S0FFWDtDQUNKO0FBRUQsTUFBTSxTQUFVLFNBQVEsU0FBUztJQUM3QixZQUFZLENBQVk7SUFDeEIsWUFBWSxDQUFZO0lBQ3hCLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQWdDLEVBQUMsWUFBdUIsRUFBQyxZQUF1QjtRQUN6RyxLQUFLLENBQUMsRUFBQyxLQUFLLEVBQUM7Z0JBQ1QsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osS0FBSyxFQUFFLEtBQUs7Z0JBQ1osTUFBTSxFQUFFLE1BQU07YUFDakIsRUFBQyxDQUFDLENBQUE7UUFDSCxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtRQUNoQyxJQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQTtLQUNuQztDQUNKO0FBRUQsTUFBTSxRQUFTLFNBQVEsU0FBUztJQUM1QixZQUFZLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFnQyxFQUFDLFlBQXVCLEVBQUMsWUFBdUI7UUFDekcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxLQUFLLEVBQUMsTUFBTSxDQUFDLEVBQUMsWUFBWSxFQUFDLFlBQVksQ0FBQyxDQUFBO0tBQ3REO0NBQ0o7QUFFRCxNQUFNLFNBQVUsU0FBUSxTQUFTO0lBQzdCLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQWdDLEVBQUMsWUFBdUIsRUFBQyxZQUF1QjtRQUN6RyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7S0FDdEQ7Q0FDSjtBQUVEO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7U0FFZ0IsYUFBYSxDQUFDLElBQWUsRUFBQyxHQUE2QjtJQUN2RSxJQUFJLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNWLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDZixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsS0FBSyxFQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2QyxVQUFVLENBQUMsSUFBSSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3JCLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNoQixHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDYixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO1NBRWUsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZSxFQUFDLFVBQTBCOztJQUV0RixJQUFJLE9BQU8sQ0FBQztJQUNaLElBQUcsQ0FBQyxVQUFVLEVBQ2Q7UUFDSSxVQUFVLEdBQUcsVUFBVSxDQUFBO0tBQzFCO0lBQ0QsSUFBSSxDQUFDLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFDOztJQUVwQyxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFDUCxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQzs7S0FFdkM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFDWixPQUFPLEdBQUcsUUFBUSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNaLE9BQU8sR0FBRyxVQUFVLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBQ1osT0FBTyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7U0FDRztRQUNBLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0NBQW9DLENBQUMsQ0FBQTtLQUNwRDtJQUdELE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxTQUFvQixFQUFDLElBQWU7SUFDbkQsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDeEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBRSxDQUFDO1lBQ3JFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFVBQVUsQ0FBQyxTQUFvQixFQUFDLElBQWU7SUFDcEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDeEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSztZQUM1QyxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBRSxDQUFDO1lBQ3JFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBQyxTQUFvQixFQUFDLElBQWU7SUFDbEQsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDeEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUUsQ0FBQztZQUNuRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQ3hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxTQUFvQixFQUFDLElBQWU7SUFDckQsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7UUFDeEIsS0FBSyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUUsQ0FBQztZQUNuRSxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNO1lBQzdDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUs7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTTtTQUM1QjtLQUNKLENBQUMsQ0FBQTtJQUNGLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxVQUFVLENBQUMsSUFBZTs7SUFFdEMsSUFBSSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxTQUFvQixFQUFDLElBQWUsRUFBQyxLQUFxQixFQUFDLEtBQXFCOztJQUV0RyxJQUFHLEtBQUssS0FBSyxTQUFTLEVBQUM7UUFDbkIsS0FBSyxHQUFHLENBQUMsQ0FBQTtRQUNULEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUNELElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBQztRQUNuQixLQUFLLEdBQUcsQ0FBQyxDQUFBO0tBQ1o7SUFFRCxJQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUNwRjtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMseURBQXlELENBQUMsQ0FBQTtRQUN0RSxPQUFPLElBQUksQ0FBQztLQUNmO1NBQ0c7UUFDQSxJQUFJLENBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLEVBQUMsS0FBSyxDQUFDLENBQUM7O1FBRXJDLElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1lBQ3hCLEtBQUssRUFBQztnQkFDRixDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNyQixJQUFHLEVBQUUsS0FBSyxDQUFDLEVBQ1g7WUFDSSxJQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUNuQztnQkFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7aUJBQ0c7Z0JBQ0EsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3RDO1NBQ0o7YUFDSSxJQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsRUFDNUI7WUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0QzthQUNHO1lBQ0EsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdEM7O1FBR0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN0QixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sT0FBTyxDQUFDO0tBQ2xCO0FBR0wsQ0FBQztBQUVELFNBQVMsT0FBTyxDQUFDLFNBQW9CLEVBQUMsSUFBZSxFQUFDLENBQVM7SUFDM0QsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLEVBQUUsQ0FBQTtJQUNwQixJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7SUFFbkMsSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNWO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxDQUFBO0tBQ3ZDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNmO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFDLENBQUMsQ0FBQTtLQUMzQztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFDZjtRQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUE7S0FDNUM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFBO0tBQzlEO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNmO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtLQUNoRTtTQUNHO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFBO0tBQzFEO0lBQ0QsT0FBTyxDQUFDLENBQUE7QUFDWixDQUFDO1NBRWUsVUFBVSxDQUFDLElBQWUsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQWtCOztJQUU3RCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1lBQ0osS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFlBQVksQ0FBQyxDQUFTLEVBQUMsQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFrQixFQUFDLFVBQXFCLEVBQUMsS0FBYzs7SUFFMUcsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUV2QixJQUFJLEdBQUcsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFBO0lBQzNCLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQzFCLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQzFCLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQTtJQUM1QyxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxPQUFPLENBQUE7O0lBRzlDLElBQUcsQ0FBQyxHQUFHLEdBQUcsRUFBQztRQUNQLENBQUMsR0FBRyxHQUFHLENBQUE7S0FDVjtJQUVELElBQUcsS0FBSyxLQUFLLFNBQVMsRUFDdEI7UUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO0tBQ2I7SUFFRCxJQUFHLEtBQUssR0FBRyxDQUFDLEVBQ1o7UUFDSSxLQUFLLEdBQUcsQ0FBQyxDQUFBO0tBQ1o7SUFFRCxJQUFHLEtBQUssS0FBSyxDQUFDLEVBQ2Q7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUM3QjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO2dCQUNJLElBQUcsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNsQjtvQkFDSSxJQUFJLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQzt3QkFDOUIsS0FBSyxFQUFFOzRCQUNILENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7NEJBQ2hCLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxHQUFHLENBQUM7NEJBQ2pCLEtBQUssRUFBRSxLQUFLOzRCQUNaLE1BQU0sRUFBRSxNQUFNO3lCQUNqQjtxQkFDSixDQUFDLENBQUE7aUJBQ0w7cUJBQ0c7b0JBQ0EsTUFBTTtpQkFDVDthQUVKO1NBQ0o7S0FDSjtTQUVEO1FBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFDN0I7WUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUM3QjtnQkFDSSxJQUFHLENBQUMsR0FBQyxPQUFPLEdBQUMsQ0FBQyxHQUFHLENBQUMsRUFDbEI7b0JBQ0ksSUFBSSxDQUFDLENBQUMsR0FBQyxPQUFPLEdBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxTQUFTLENBQUM7d0JBQzlCLEtBQUssRUFBRTs0QkFDSCxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQzs0QkFDakQsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQzs0QkFDakIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osTUFBTSxFQUFFLE1BQU07eUJBQ2pCO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDthQUNKO1NBQ0o7S0FDSjs7SUFNRCxJQUFJLFNBQVMsR0FBRyxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0MsT0FBTyxTQUFTLENBQUE7QUFDcEIsQ0FBQztTQUVlLFVBQVUsQ0FBQyxTQUFvQixFQUFDLElBQWU7O0lBRTNELElBQUksT0FBTyxHQUFHLFNBQVMsQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsaUJBQWlCLENBQUMsSUFBZSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBa0I7SUFDcEUsSUFBSSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3BDLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxTQUFTLENBQUMsSUFBZTs7SUFFckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7SUFDNUIsT0FBTyxLQUFLLENBQUE7QUFDaEIsQ0FBQztTQUVlLFVBQVUsQ0FBQyxJQUFlOztJQUV0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtJQUM5QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO1NBRWUsUUFBUSxDQUFDLElBQWU7O0lBRXBDLElBQUksSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3pCLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBRUE7QUFFQTtTQUVnQixRQUFRLENBQUMsS0FBZ0IsRUFBQyxLQUFnQjs7SUFFdEQsSUFBSSxPQUFPLEVBQUMsSUFBSSxDQUFBO0lBQ2hCLElBQUksR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ3BCLElBQUksR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDO0lBQ3BCLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFBO0lBQ1gsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQ3ZPO1FBQ0ksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdB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QUFJLEtBQUssRUFBRSxDQUFDO0lBQ3ZCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM5QjtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xCLElBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDWCxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ25COztJQUVELEtBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFBQztRQUNsQixJQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHO1lBQ1gsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBOztZQUV2QyxlQUFlLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFDLEtBQUssR0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs7S0FFckQ7SUFDRCxLQUFLLElBQUksQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsQ0FBQyxFQUFDLENBQUMsR0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLElBQUUsQ0FBQyxFQUFDLENBQUMsRUFBRSxFQUNqRDtRQUNJLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztLQUMzQjs7SUFFRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQ7QUFDQTtBQUNBLFNBQVMsUUFBUSxDQUFDLE1BQU07SUFDcEIsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQTtJQUN2QixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3ZCLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDNUIsSUFBSSxTQUFTLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUNsQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDOUI7UUFDSSxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBQyxDQUFDLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUMxQixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNsQixJQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ1gsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUNELEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUNqQztRQUNJLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRSxHQUFHLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDNUQsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQTtLQUN6Qjs7Ozs7OztJQU9ELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFFRDtBQUNBO0FBQ0EsU0FBUyxVQUFVLENBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLEtBQUs7SUFDakYsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN6QyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7SUFDM0IsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFBO0lBQzdCLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDNUIsSUFBSSxRQUFRLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQztJQUM1QixJQUFJLFNBQVMsR0FBRyxNQUFNLEdBQUcsUUFBUSxDQUFDO0lBQ2xDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztJQUN6RCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM1QyxJQUFJLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3hCLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzlCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElB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Q1YsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsSUFBSTtJQUNSLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxPQUFPO0lBQ1gsRUFBRSxFQUFFLFNBQVM7SUFDYixFQUFFLEVBQUUsUUFBUTtJQUNaLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lB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
