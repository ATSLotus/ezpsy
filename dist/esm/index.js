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
    IsAnimation;
    IsPause;
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
        this.IsAnimation = false;
        this.IsPause = false;
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
        this.IsAnimation = true;
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
            while (that.IsAnimation) {
                // console.dir(performance.now())
                if (that.IsPause) {
                    console.dir("The animation has paused !");
                    await delay_frame(delay);
                }
                else {
                    func();
                    await delay_frame(delay);
                    that.remove();
                    that.storage.push(that);
                    that.storage.reDraw(ctx);
                }
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
let nameId$b = 0;
// class TypeTest implements RectangleShape{
//     x: number
//     y: number
//     width: number
//     height: number
// }
class Rectangle extends Elements {
    name = {
        name: "rect" + nameId$b.toString(),
        graphicId: nameId$b
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
        nameId$b++;
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

let nameId$a = 0;
class Circle extends Elements {
    name = {
        name: "circle" + nameId$a.toString(),
        graphicId: nameId$a
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
        nameId$a++;
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

let nameId$9 = 0;
class Line extends Elements {
    name = {
        name: "line" + nameId$9.toString(),
        graphicId: nameId$9
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
        nameId$9++;
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

let nameId$8 = 0;
class Arc extends Elements {
    name = {
        name: "arc" + nameId$8.toString(),
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

let nameId$7 = 0;
class Ellipse extends Elements {
    name = {
        name: "ellipse" + nameId$7.toString(),
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

let nameId$6 = 0;
class Polygon extends Elements {
    name = {
        name: "polygon" + nameId$6.toString(),
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

let nameId$5 = 0;
class Texts extends Elements {
    name = {
        name: "text" + nameId$5.toString(),
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
        nameId$5++;
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

let nameId$4 = 0;
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
        name: "img" + nameId$4.toString(),
        graphicId: nameId$4
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
            I.crossOrigin = 'Anonymous';
            this.Img = I;
            console.dir(this.Img);
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
        nameId$4++;
    }
    init() {
        this.shape;
        let c = document.createElement('canvas');
        let ctx = c.getContext('2d');
        let that = this;
        c.width = screen.availWidth;
        c.height = screen.availHeight;
        console.dir(that.Img);
        // that.Img.onload = ()=>{
        ctx.drawImage(that.Img, 0, 0);
        that.ImgData = ctx.getImageData(0, 0, that.Img.width, that.Img.height);
        // console.dir(that.ImgData)
        // }
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

let nameId$3 = 0;
class Grat extends Elements {
    name = {
        name: "grat" + nameId$3.toString(),
        graphicId: nameId$3
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
        nameId$3++;
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

let wasm;
let cachegetInt32Memory0 = null;

function getInt32Memory0() {
  if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
    cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }

  return cachegetInt32Memory0;
}

let cachegetUint8Memory0 = null;

function getUint8Memory0() {
  if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
    cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }

  return cachegetUint8Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
  return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {number} radius
* @param {number} pixels_per_degree
* @param {number} spatial_frequency
* @param {number} angle
* @param {number} contrast
* @param {number} phase
* @param {number} gamma
* @returns {Uint8Array}
*/


function pre_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);

    wasm.pre_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, gamma);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();

    wasm.__wbindgen_free(r0, r1 * 1);

    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}
/**
* @param {number} radius
* @param {number} pixels_per_degree
* @param {number} spatial_frequency
* @param {number} angle
* @param {number} contrast
* @param {number} phase
* @param {number} level
* @param {number} gamma
* @returns {Uint8Array}
*/

function pre_noise_singrat(radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma) {
  try {
    const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);

    wasm.pre_noise_singrat(retptr, radius, pixels_per_degree, spatial_frequency, angle, contrast, phase, level, gamma);
    var r0 = getInt32Memory0()[retptr / 4 + 0];
    var r1 = getInt32Memory0()[retptr / 4 + 1];
    var v0 = getArrayU8FromWasm0(r0, r1).slice();

    wasm.__wbindgen_free(r0, r1 * 1);

    return v0;
  } finally {
    wasm.__wbindgen_add_to_stack_pointer(16);
  }
}

async function load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {
        instance,
        module
      };
    } else {
      return instance;
    }
  }
}

async function init$2(input) {
  if (typeof input === 'undefined') {
    input = new URL('singrat_bg.wasm', import.meta.url);
  }

  const imports = {};

  if (typeof input === 'string' || typeof Request === 'function' && input instanceof Request || typeof URL === 'function' && input instanceof URL) {
    input = fetch(input);
  }

  const {
    instance,
    module
  } = await load(await input, imports);
  wasm = instance.exports;
  init$2.__wbindgen_wasm_module = module;
  return wasm;
}

let nameId$2 = 0;
class sinGrating extends Elements {
    name = {
        name: "singrating" + nameId$2.toString(),
        graphicId: nameId$2
    };
    wasm;
    param;
    width;
    sinGrat; //光栅图片数据
    imgDataList; //用于储存参与动画的图片
    isNoise;
    constructor(opts) {
        super();
        this.ctx = super.ctx;
        this.wasm = opts.wasm;
        this.shape = opts.shape;
        let sh = this.shape;
        this.width = 2 * (sh.r / 2 + sh.r) + 1;
        this.sinGrat = new ImageData(this.width, this.width);
        this.imgDataList = new Array();
        this.isNoise = opts.isNoise;
        // console.dir(this.isNoise)
        nameId$2++;
    }
    draw() {
        let sh = this.shape;
        // readWasm(this.wasm).then(wasm => {
        //     console.dir(wasm);
        //     const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        //     wasm.pre_singrat(retptr, sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.gamma);
        //     var r0 = getInt32Memory0(wasm)[retptr / 4 + 0];
        //     var r1 = getInt32Memory0(wasm)[retptr / 4 + 1];
        //     var v0 = getArrayU8FromWasm0(r0, r1, wasm).slice();
        //     console.dir(v0)
        //     wasm.__wbindgen_free(r0, r1 * 1);
        //     this.param = v0;
        //     // if(this.isNoise)
        //     //     this.param = SG.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.level,sh.gamma);
        //     // else
        //     //     this.param = SG.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.gamma);
        //     this.sinGrat.data.set(this.param);
        //     this.ctx.putImageData(this.sinGrat,sh.x-1.5*sh.r,sh.y-1.5*sh.r)
        // });
        init$2(this.wasm)
            .then(() => {
            // let t0 = performance.now()
            // console.dir(t0)
            if (this.isNoise)
                this.param = pre_noise_singrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.level, sh.gamma);
            else
                this.param = pre_singrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.gamma);
            this.sinGrat.data.set(this.param);
            this.ctx.putImageData(this.sinGrat, sh.x - 1.5 * sh.r, sh.y - 1.5 * sh.r);
            console.dir("success");
            // let t1 = performance.now();
            // console.dir(t1);
            // console.dir(t1-t0);
        });
    }
    play(timeFrequency, time, fps) {
        if (!timeFrequency)
            timeFrequency = 1;
        if (!time)
            time = 1000;
        if (!fps)
            fps = 60;
        let interval = 2 * Math.PI * timeFrequency / fps;
        let fpsNum = Math.floor(time / 1000 * fps);
        let index = 0;
        let sh = this.shape;
        let that = this;
        init$2(this.wasm)
            .then(() => {
            // let t0 = performance.now()
            // console.dir(t0)
            if (this.isNoise) {
                for (let i = 0; i < fps; i++) {
                    let img = pre_noise_singrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase + i * interval, sh.level, sh.gamma);
                    let imgData = new ImageData(new Uint8ClampedArray(img), this.width, this.width);
                    this.imgDataList.push(imgData);
                }
            }
            else {
                for (let i = 0; i < fps; i++) {
                    let img = pre_singrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase + i * interval, sh.gamma);
                    let imgData = new ImageData(new Uint8ClampedArray(img), this.width, this.width);
                    this.imgDataList.push(imgData);
                }
            }
            // let t1 = performance.now();
            // console.dir(t1);
            // console.dir(t1-t0);
            (async () => {
                for (let i = 0; i < fpsNum; i++) {
                    index = i % fps;
                    that.ctx.putImageData(that.imgDataList[index], sh.x - 1.5 * sh.r, sh.y - 1.5 * sh.r);
                    await delay_frame(1);
                    that.remove();
                }
            })();
        });
    }
}
// function readWasm(wasm){
//     console.dir('suceess!');
//     return new Promise((res,rej)=>{
//         fetch(wasm).then(res =>
//             res.arrayBuffer()
//         ).then(bytes => 
//             WebAssembly.instantiate(bytes, {})
//         ).then(result =>{
//             console.dir(result);
//             let wasm = result.instance.exports;
//             res(wasm);
//         })
//     })
// }
// let cachegetInt32Memory0 = null;
// function getInt32Memory0(wasm) {
//     if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
//         cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
//     }
//     return cachegetInt32Memory0;
// }
// let cachegetUint8Memory0 = null;
// function getUint8Memory0(wasm) {
//     if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
//         cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
//     }
//     return cachegetUint8Memory0;
// }
// function getArrayU8FromWasm0(ptr, len, wasm) {
//     return getUint8Memory0(wasm).subarray(ptr / 1, ptr / 1 + len);
// }

let nameId$1 = 0;
class RandomDot extends Elements {
    name = {
        name: "randomDot" + nameId$1.toString(),
        graphicId: nameId$1
    };
    RandomDotArray;
    maskBand;
    translation;
    constructor(opts) {
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        if (!this.shape.maskBand)
            this.shape.maskBand = 8;
        if (!this.shape.number)
            this.shape.number = 10;
        if (!this.shape.maxSpeed)
            this.shape.maxSpeed = 5;
        if (!this.shape.minSpeed)
            this.shape.minSpeed = 0;
        // this.maskBand = new Array();
        this.RandomDotArray = randomisedPoint(this.shape.r, this.shape.maskBand, this.shape.number);
        this.maskBand = new Circle({
            shape: {
                x: this.shape.x,
                y: this.shape.y,
                r: this.shape.r
            },
            style: {
                fill: '#ffffff',
                stroke: "#888888",
                lineWidth: this.shape.maskBand
            }
        });
        // this.maskBand[1] = new Circle({
        //     shape: {
        //         x: this.shape.x,
        //         y: this.shape.y,
        //         r: this.shape.r+this.shape.maskBand/2
        //     },
        //     style: {
        //         stroke: "#888888",
        //         lineWidth: this.shape.maskBand
        //     }
        // })
        this.translation = getRandom(this.shape.maxSpeed, this.shape.minSpeed, this.shape.number);
        this.IsAnimation = true;
        nameId$1++;
    }
}
function playRandomDot(randomDot, ctx) {
    randomDot.ctx = ctx;
    let sh = randomDot.shape;
    // makeCircle(randomDot.maskBand[0],ctx);
    // makeCircle(randomDot.maskBand[1],ctx);
    let f = new Array();
    let trans = new Array();
    for (let i = 0; i < sh.number; i++) {
        f.push(1);
        trans.push({ x: randomDot.translation[i].x, y: randomDot.translation[i].y });
    }
    randomDot.maskBand.ctx = ctx;
    for (let i = 0; i < randomDot.RandomDotArray.length; i++)
        randomDot.RandomDotArray[i].ctx = ctx;
    (async () => {
        while (randomDot.IsAnimation) {
            randomAninmation(randomDot, sh, trans, f);
            await delay_frame(1);
            randomDot.remove();
            randomDot.storage.push(randomDot);
            judgeElement(randomDot.maskBand, ctx);
            for (let index = 0; index < randomDot.RandomDotArray.length; index++) {
                randomDot.RandomDotArray[index].ctx = ctx;
                judgeElement(randomDot.RandomDotArray[index], ctx);
            }
        }
    })();
    // randomDot.animate(()=>{
    //     for(let i = 0;i < sh.number;i++)
    //     {
    //         let x = randomDot.RandomDotArray[i].shape.x+trans[i].x;
    //         let y = randomDot.RandomDotArray[i].shape.y+trans[i].y;
    //         if((Math.pow(x-sh.x,2)+Math.pow(y-sh.y,2)) >= Math.pow(sh.r-sh.maskBand,2))
    //             f[i] *= (-1);
    //         randomDot.RandomDotArray[i].translate = {
    //             x: trans[i].x,
    //             y: trans[i].y
    //         }
    //         trans[i].x = trans[i].x + f[i]*randomDot.translation[i].x;
    //         trans[i].y = trans[i].y + f[i]*randomDot.translation[i].y;
    //     }
    // },1);
}
let randomAninmation = (randomDot, sh, trans, f) => {
    for (let i = 0; i < sh.number; i++) {
        let x = randomDot.RandomDotArray[i].shape.x + trans[i].x;
        let y = randomDot.RandomDotArray[i].shape.y + trans[i].y;
        if ((Math.pow(x - sh.x, 2) + Math.pow(y - sh.y, 2)) >= Math.pow(sh.r - sh.maskBand, 2))
            f[i] *= (-1);
        randomDot.RandomDotArray[i].translate = {
            x: trans[i].x,
            y: trans[i].y
        };
        trans[i].x = trans[i].x + f[i] * randomDot.translation[i].x;
        trans[i].y = trans[i].y + f[i] * randomDot.translation[i].y;
    }
};
// function randomAnimation(randomDot: RandomDot){
//     let sh = randomDot.shape;
//     let f = new Array();
//     let trans = new Array();
//     for(let i = 0;i < sh.number;i++)
//     {
//         f.push(1);
//         trans.push({x:randomDot.translation[i].x,y:randomDot.translation[i].y});
//     }
//     for(let i = 0;i < sh.number;i++)
//     {
//         let x = randomDot.RandomDotArray[i].shape.x+trans[i].x;
//         let y = randomDot.RandomDotArray[i].shape.y+trans[i].y;
//         if((Math.pow(x-sh.x,2)+Math.pow(y-sh.y,2)) >= Math.pow(sh.r-sh.maskBand,2))
//             f[i] *= (-1);
//         randomDot.RandomDotArray[i].translate = {
//             x: trans[i].x,
//             y: trans[i].y
//         }
//         // console.dir(f[i]*translateX[i])
//         trans[i].x = trans[i].x + f[i]*randomDot.translation[i].x;
//         trans[i].y = trans[i].y + f[i]*randomDot.translation[i].y;
//     }
// }
function randomisedPoint(radius, maskBand, number) {
    let arr = getNonRepetitiveRandom(radius - maskBand, radius, number);
    let dot = new Array();
    for (let i = 0; i < number; i++) {
        dot[i] = new Circle({
            shape: {
                x: arr[i].x,
                y: arr[i].y,
                r: 2
            },
            style: {
                fill: "#000000"
            }
        });
    }
    return dot;
}
function dotArea(r, radius) {
    let arr = new Array();
    for (let i = 0; i < 2 * r; i++) {
        for (let j = 0; j < 2 * r; j++) {
            let r2 = Math.pow(i - radius, 2) + Math.pow(j - radius, 2);
            if (r2 <= Math.pow(r, 2)) {
                arr.push({ x: i, y: j });
            }
        }
    }
    return arr;
}
function getNonRepetitiveRandom(r, radius, number) {
    let arr = new Array();
    let template = dotArea(r, radius);
    for (let i = 0; i < number; i++) {
        let index = Math.floor(Math.random() * template.length);
        arr.push(template[index]);
        template.splice(index, 1);
    }
    return arr;
}
function getRandom(maxSpeed, minSpeed, number) {
    let arr = new Array();
    for (let i = 0; i < number; i++) {
        let x = setRandom(maxSpeed, minSpeed);
        let y = setRandom(maxSpeed, minSpeed);
        arr.push({ x: x, y: y });
    }
    return arr;
}
function setRandom(maxSpeed, minSpeed) {
    let num = Math.random() * (maxSpeed - minSpeed) + minSpeed;
    let signF = Math.round(Math.random());
    let sign = 0;
    if (signF)
        sign = 1;
    else
        sign = -1;
    num *= sign;
    return num;
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
        nameId++;
    }
    //绘制方法, 参数ctx为canvas.getContext('2d')
    draw() {
        this.ctx.putImageData(this.sinGrat, this.shape.x - 2.5 * this.shape.r, this.shape.y - 2.5 * this.shape.r);
    }
    //给原有光栅加上噪声, 参数level为噪声等级
    imNoise(level) {
        let th = this.shape;
        this.isNoise = true;
        this.sinGrat = getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase, level);
        th.level = level;
    }
    //运动方法, 参数ctx为canvas.getContext('2d') 参数cycle为每秒运行光栅的周期数(默认为1)
    play(timeFrequency, time) {
        if (!timeFrequency)
            timeFrequency = 1;
        if (!time)
            time = 1000;
        let fps = 60;
        let fpsnum = Math.floor(time / 1000 * fps);
        let interval = 2 * Math.PI * timeFrequency / fps;
        let that = this;
        let ctx = this.ctx;
        // let num = Math.floor(60/timeFrequency);
        let th = this.shape;
        for (let i = 0; i < fps; i++) {
            if (this.isNoise)
                this.imgDataList.push(getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase + i * interval, this.shape.level));
            else
                this.imgDataList.push(getSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase + i * interval));
        }
        //异步函数
        (async function () {
            for (let i = 0; i < fpsnum; i++) {
                // i = i%fps;
                let index = i % fps;
                ctx.putImageData(that.imgDataList[index], that.shape.x - 2.5 * that.shape.r, that.shape.y - 2.5 * that.shape.r);
                // console.dir(that.storage)
                await delay_frame(1);
                that.clear(ctx);
            }
        })();
    }
    //清除光栅所在位置的矩形区域
    clear(ctx) {
        let width = 2 * (2.5 * this.shape.r) + 1;
        let height = 2 * (2.5 * this.shape.r) + 1;
        ctx.clearRect(this.shape.x - 2.5 * this.shape.r, this.shape.y - 2.5 * this.shape.r, width, height);
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
    else if (el instanceof sinGrating) {
        console.dir("Add Success!");
        // (<sinGrating>el).draw();
    }
    else if (el instanceof RandomDot) {
        playRandomDot(el, ctx);
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
                // index.sort();
                index.sort((a, b) => {
                    if (a > b)
                        return 1;
                    else if (a < b)
                        return -1;
                    else
                        return 0;
                });
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
            // if(el[i] instanceof RandomDot)
            // {
            //     let randomDot:RandomDot = <RandomDot>el[i];
            //     randomDot.maskBand.ctx = ctx;
            //     ezJudge.judgeElement(randomDot.maskBand,ctx);
            //     for(let index = 0;index < randomDot.RandomDotArray.length;index++)
            //     {
            //         randomDot.RandomDotArray[index].ctx = ctx;
            //         ezJudge.judgeElement(randomDot.RandomDotArray[index],ctx)
            //     }
            // }
            // else{
            judgeElement(el[i], ctx);
            // }
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
                    if (func.funcList) {
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
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 200
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
            });
            // .then(e=>{
            //     return new Promise((res,rej)=>{
            //         if(e.isConfirmed)
            //         {
            //             Swal.fire({
            //                 title: 'Success',
            //                 icon: 'success',
            //                 showConfirmButton: false,
            //                 timer: 200
            //             });
            //         }
            //         res(e.value);
            //     })
            // })
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
            });
            // .then(e=>{
            //     return new Promise((res,rej)=>{
            //         if(e.isConfirmed)
            //         {
            //             Swal.fire({
            //                 title: 'Success',
            //                 icon: 'success',
            //                 showConfirmButton: false,
            //                 timer: 200
            //             });
            //             res(e.value);
            //         }
            //         else{
            //             res("null");
            //         }
            //     })
            // })
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
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 200
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
    storage;
    cStyle;
    // Rectangle: Rectangle
    constructor(id, dom, cStyle) {
        this.id = id;
        this.dom = dom;
        this.storage = new Storage();
        cStyle = judgeCanvasStyle(cStyle);
        this.cStyle = cStyle;
        this.ctx = createCanvas(dom, cStyle); //此处创建canvas，可仅创建一个canvas，但是目前无法仅清除一个图形
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
        if (el instanceof Array) {
            for (let i = 0; i < el.length; i++) {
                el[i].IsAnimation = true;
                el[i].IsPause = true;
            }
        }
        else {
            el.IsAnimation = true;
        }
        // el.ctx = this.ctx;
        let that = this;
        // el.remove();
        this.ctx;
        let pause = false;
        // let ctx = ezCanvas.createCanvas(this.dom,this.cStyle); 
        // this.ctxList.push(ctx);
        (async function () {
            while (el.IsAnimation || el[0].IsAnimation) {
                if (el instanceof Elements)
                    pause = el.IsPause;
                else
                    pause = el[0].IsPause;
                if (pause) {
                    console.dir("The animation has paused !");
                    await delay_frame(delay);
                }
                else {
                    func();
                    await delay_frame(delay);
                    that.remove(el);
                    that.add(el);
                }
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
    sinGrating: sinGrating,
    Grat: Grat,
    Time: Time,
    RandomDot: RandomDot,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3N0YXRpYy9wa2cvc2luZ3JhdC5qcyIsIi4uLy4uL3NyYy9HcmFwaGljL3NpbkdyYXRpbmcudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9yYW5kb21Eb3QudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9zaW5HcmF0LnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL1N0b3JhZ2Uvc3RvcmFnZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzcy50cyIsIi4uLy4uL3NyYy9UaW1lL3RpbWVQZXJmb3JtYW5jZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzczAudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL3V0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9wYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2NsYXNzZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9nZXR0ZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vZG9tVXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2lzTm9kZUVudi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9nbG9iYWxTdGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2luaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9wYXJzZUh0bWxUb0NvbnRhaW5lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2FuaW1hdGlvbkVuZEV2ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vbWVhc3VyZVNjcm9sbGJhci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJBY3Rpb25zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNvbnRhaW5lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvcHJpdmF0ZVByb3BzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlcklucHV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNvbnRlbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyRm9vdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNsb3NlQnV0dG9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckljb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVySW1hZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyUHJvZ3Jlc3NTdGVwcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJUaXRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJQb3B1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL0Rpc21pc3NSZWFzb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2FyaWEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2dldFRlbXBsYXRlUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kZWZhdWx0SW5wdXRWYWxpZGF0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9zZXRQYXJhbWV0ZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9UaW1lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvc2Nyb2xsYmFyRml4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9pb3NGaXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL29wZW5Qb3B1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9zaG93TG9hZGluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2lucHV0VXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9oaWRlTG9hZGluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2dldElucHV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9wcml2YXRlTWV0aG9kcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9kb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2tleWRvd24taGFuZGxlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2Nsb3NlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvZW5hYmxlLWRpc2FibGUtZWxlbWVudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy92YWxpZGF0aW9uLW1lc3NhZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9wcm9ncmVzcy1zdGVwcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL3VwZGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL19kZXN0cm95LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9idXR0b25zLWhhbmRsZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9wb3B1cC1jbGljay1oYW5kbGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2FyZ3NUb1BhcmFtcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9maXJlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL21peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL3RpbWVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2JpbmRDbGlja0hhbmRsZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL1N3ZWV0QWxlcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N3ZWV0YWxlcnQyLmpzIiwiLi4vLi4vc3JjL0RpYWxvZ3VlL2RpYWxvZ3VlMC50cyIsIi4uLy4uL3NyYy9lenBzeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmxldCBpZFN0YXJ0ID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGlkU3RhcnQrKztcbn0iLCJpbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIGNhbnZhc1N0eWxle1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAvLyBsZXQgY1N0eWxlOiBjYW52YXNTdHlsZSA9IHtcbiAgICAvLyAgICAgd2lkdGg6IDEwMCxcbiAgICAvLyAgICAgaGVpZ2h0OiAxMDBcbiAgICAvLyB9XG4gICAgYy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgYy5zdHlsZS5sZWZ0ID0gKCh3LWNTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGRvbS5hcHBlbmQoYyk7XG4gICAgcmV0dXJuIGN0eDtcbn0iLCJcbmNsYXNzIHRpbWV7XG4gICAgaG91cjogbnVtYmVyXG4gICAgbWludXRlczogbnVtYmVyXG4gICAgc2Vjb25kczogbnVtYmVyXG4gICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgdGhpcy5ob3VyID0gZGF0ZS5nZXRIb3VycygpXG4gICAgICAgIHRoaXMubWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gICAgICAgIHRoaXMubWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRpbWUwe1xuICAgIHN0YXJ0VGltZTogdGltZVxuICAgIGluc3RhbnRUaW1lOiBBcnJheTx0aW1lPlxuICAgIHRpbWVTdGFtcDogQXJyYXk8dGltZT5cbiAgICBpdGVtOiBudW1iZXJcbiAgICB0aW1lVmFsdWU6IEFycmF5PG51bWJlcj5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLml0ZW0gPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICAgICAgdGhpcy5pbnN0YW50VGltZSA9IFtdXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUucHVzaCh0aGlzLnN0YXJ0VGltZSlcbiAgICAgICAgdGhpcy50aW1lVmFsdWUgPSBbXVxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IFtdXG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IHRpbWUoKVxuICAgIH1cbiAgICByZWNvcmQoKXtcbiAgICAgICAgbGV0IHQgPSBuZXcgdGltZSgpXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUucHVzaCh0KVxuICAgICAgICB0aGlzLml0ZW0rK1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIFRpYygpOiBUaW1lMHtcbi8vICAgICBsZXQgdCA9IG5ldyBUaW1lMCgpXG4vLyAgICAgdC5zdGFydCgpXG4vLyAgICAgcmV0dXJuIHQ7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZTApOiBudW1iZXJ7XG4vLyAgICAgbGV0IHQgPSAwO1xuLy8gICAgIGxldCB0cyA9IG5ldyBBcnJheSgpXG4vLyAgICAgdGltZS5yZWNvcmQoKVxuLy8gICAgIHRzWzBdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLmhvdXIgLSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbS0xXS5ob3VyXG4vLyAgICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbV0ubWludXRlcyAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLm1pbnV0ZXNcbi8vICAgICB0c1syXSA9IHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtXS5zZWNvbmRzIC0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW0tMV0uc2Vjb25kc1xuLy8gICAgIHRzWzNdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLm1pbGxpc2Vjb25kcyAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLm1pbGxpc2Vjb25kc1xuLy8gICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4vLyAgICAgLy8gdC50b0ZpeGVkKDMpXG4vLyAgICAgdGltZS50aW1lVmFsdWUucHVzaCh0KTtcbi8vICAgICByZXR1cm4gdDtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVUdGFtcChUOiBUaW1lMCl7XG4vLyAgICAgbGV0IHQgPSBuZXcgdGltZSgpO1xuLy8gICAgIFQudGltZVN0YW1wLnB1c2godCk7XG4vLyB9IFxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VG9jKHRpbWU6IFRpbWUwKTogQXJyYXk8bnVtYmVyPntcbi8vICAgICBsZXQgdEEgPSBuZXcgQXJyYXkoKTtcbi8vICAgICBsZXQgdHMgPSBuZXcgQXJyYXkoKTtcbi8vICAgICBsZXQgdCA9IHRpbWUudGltZVN0YW1wXG4vLyAgICAgZm9yKGxldCBpID0gMDtpIDwgTWF0aC5mbG9vcih0Lmxlbmd0aC8yKTtpKyspe1xuLy8gICAgICAgICBpZih0WzIqaSsxXSA9PT0gdW5kZWZpbmVkKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgdHNbMF0gPSB0WzIqaSsxXS5ob3VyIC0gdFsyKmldLmhvdXJcbi8vICAgICAgICAgICAgIHRzWzFdID0gdFsyKmkrMV0ubWludXRlcyAtIHRbMippXS5taW51dGVzXG4vLyAgICAgICAgICAgICB0c1syXSA9IHRbMippKzFdLnNlY29uZHMgLSB0WzIqaV0uc2Vjb25kc1xuLy8gICAgICAgICAgICAgdHNbM10gPSB0WzIqaSsxXS5taWxsaXNlY29uZHMgLSB0WzIqaV0ubWlsbGlzZWNvbmRzXG4vLyAgICAgICAgICAgICB0QVtpXSA9IDYwKjYwKnRzWzBdICsgNjAqdHNbMV0gKyB0c1syXSArIHRzWzNdLzEwMDBcbi8vICAgICAgICAgICAgIC8vIHRBW2ldID0gTWF0aC5yb3VuZCh0QVtpXSoxMDAwKS8xMDAwXG4vLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0QVtpXSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICByZXR1cm4gdEE7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBHZXRTZWNzKHRpbWU6IFRpbWUwKTogbnVtYmVye1xuLy8gICAgIGxldCB0ID0gVG9jKHRpbWUpXG4vLyAgICAgcmV0dXJuIHRcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzMChkZWxheTogbnVtYmVyLG1lc3NhZ2U/OiBhbnkpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICByZXNvbHZlKDEpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5X2ZyYW1lKG51bTEpe1xuICAgIGxldCB0aW1lX251bT0wOyAgICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgKGZ1bmN0aW9uIHJhZigpe1xuICAgICAgICAgICAgdGltZV9udW0rKztcbiAgICAgICAgICAgIGxldCBpZCA9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICBpZiggdGltZV9udW0+bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbiAgICB9KVxufTsiLCJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IG5hbWVTdHlsZSB9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vU3RvcmFnZS9zdG9yYWdlJztcbmltcG9ydCAqIGFzIGV6VGltZSBmcm9tIFwiLi9UaW1lL3RpbWVcIlxuaW1wb3J0ICogYXMgZXpUaW1lciBmcm9tIFwiLi9UaW1lL3RpbWVQZXJmb3JtYW5jZVwiXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBUZXh0TGluZSB9IGZyb20gJy4vR3JhcGhpYy90ZXh0JztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGVcbiAgICBzaGFwZT86IFNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZSBcbiAgICB0ZXh0TGluZT86IFRleHRMaW5lXG4gICAgY3R4PzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgc3RvcmFnZT86IFN0b3JhZ2VcbiAgICBzY2FsZT86IFNjYWxlXG4gICAgdHJhbnNsYXRlPzogVHJhbnNsYXRlXG4gICAgcm90YXRlPzogbnVtYmVyXG4gICAgSXNBbmltYXRpb24/OiBib29sZWFuXG4gICAgSXNQYXVzZT86IGJvb2xlYW5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwXG4gICAgICAgIHRoaXMuSXNBbmltYXRpb24gPSBmYWxzZVxuICAgICAgICB0aGlzLklzUGF1c2UgPSBmYWxzZVxuICAgIH1cbiAgICBub0ZpbGwoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ25vbmUnO1xuICAgIH1cbiAgICBub1N0cm9rZSgpe1xuICAgICAgICB0aGlzLnN0eWxlLmxpbmVXaWR0aCA9IDA7XG4gICAgICAgIC8vIGlmKHRoaXMuc3R5bGUuZmlsbCAhPT0gJ25vbmUnICYmIHRoaXMuc3R5bGUuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcignRXJyb3IhJylcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xuICAgIH1cbiAgICBzZXRDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgICAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGMuc3R5bGUubGVmdCA9ICgody1jU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGxldCBlbCA9IHRoaXM7XG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICB9XG4gICAgcmVtb3ZlKCl7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIFxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICBjdHguZmlsbFN0eWxlPVwid2hpdGVcIlx0XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsMSwxKVxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPVwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCwxLDEpO1xuICAgICAgICAvLyBjdHguY2xvc2VQYXRoKClcdFxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249J3NvdXJjZS1vdmVyJ1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTtcblxuXG4gICAgICAgIC8vIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICAvLyBsZXQgYyA9IGN0eC5jYW52YXM7XG4gICAgICAgIC8vIGMud2lkdGggPSBjLndpZHRoO1xuICAgICAgICAvLyBjLmhlaWdodCA9IGMuaGVpZ2h0O1xuXG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgYW5pbWF0ZShmdW5jOiBGdW5jdGlvbixkZWxheTogbnVtYmVyKXtcblxuICAgICAgICB0aGlzLklzQW5pbWF0aW9uID0gdHJ1ZVxuXG4gICAgICAgIC8vIGVsLmN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIGVsLnJlbW92ZSgpO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIC8vIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAvLyBsZXQgY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKHRoaXMuZG9tLHRoaXMuY1N0eWxlKTsgXG4gICAgICAgIC8vIHRoaXMuY3R4TGlzdC5wdXNoKGN0eCk7XG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPiBzdGFydClcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlKHRoYXQuSXNBbmltYXRpb24pe1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHBlcmZvcm1hbmNlLm5vdygpKVxuICAgICAgICAgICAgICAgIGlmKHRoYXQuSXNQYXVzZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKFwiVGhlIGFuaW1hdGlvbiBoYXMgcGF1c2VkICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZShkZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKGRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgICAgIC8vICAgICBhd2FpdCBlelRpbWVyLnNsZWVwKGRlbGF5KVxuICAgICAgICAgICAgLy8gICAgIHRoYXQucmVtb3ZlKClcbiAgICAgICAgICAgIC8vICAgICB0aGF0LnN0b3JhZ2UucHVzaCh0aGF0KVxuICAgICAgICAgICAgLy8gICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAgICAgLy8gICAgIC8vIGV6SnVkZ2UuanVkZ2VBbmltYXRlKHRoYXQsY3R4KTtcbiAgICAgICAgICAgIC8vICAgICAvLyBhd2FpdCB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gd2luZG93LnNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgICAgIC8vICAgICBlelRpbWVyLnNsZWVwKGRlbGF5KS50aGVuKCgpPT57XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoYXQucmVtb3ZlKClcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdClcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH0sMClcbiAgICAgICAgfSkoKVxuICAgIH1cblxuICAgIC8vIHJvdGF0ZShhbmdsZTogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIGxldCB4ID0gdGhpcy5zaGFwZS54XG4gICAgLy8gICAgIGxldCB5ID0gdGhpcy5zaGFwZS55XG4gICAgLy8gICAgIHRoaXMuc2hhcGUueCA9IDA7XG4gICAgLy8gICAgIHRoaXMuc2hhcGUueSA9IDA7XG4gICAgLy8gICAgIGN0eC50cmFuc2xhdGUoeCx5KTtcbiAgICAvLyAgICAgY3R4LnJvdGF0ZShhbmdsZSlcbiAgICAvLyAgICAgdGhpcy5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgLy8gfVxuXG4gICAgLy8gc2NhbGUoc2NhbGVXaWR0aDogbnVtYmVyLHNjYWxlSGVpZ2h0OiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgdGhpcy5yZW1vdmUoKVxuICAgIC8vICAgICBjdHguc2F2ZSgpXG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vICAgICBjdHguc2NhbGUoc2NhbGVXaWR0aCxzY2FsZUhlaWdodClcbiAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpXG4gICAgLy8gICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vICAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gfVxuICAgIC8vIHJvdGF0ZShhbmc6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yb3RhdGUoYW5nKVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eClcbiAgICAvLyAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyB9XG4gICAgLy8gdHJhbnNsYXRlKHg6IG51bWJlcix5OiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgdGhpcy5yZW1vdmUoKVxuICAgIC8vICAgICBjdHguc2F2ZSgpXG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vICAgICBjdHgudHJhbnNsYXRlKHgseSlcbiAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpO1xuICAgIC8vICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZXtcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXJcbn0iLCJpbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IG5hbWVTdHlsZSB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJztcblxubGV0IGdyb3VwSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImdyb3VwXCIgKyBncm91cElkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogZ3JvdXBJZFxuICAgIH1cbiAgICBsZW5ndGg6IG51bWJlclxuICAgIC8vIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgZ3JvdXBMaXN0OiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXBcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwKXtcblxuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gdGhpcy5pZCA9IGdyb3VwSWQ7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGVsO1xuXG4gICAgICAgIGdyb3VwSWQrKyBcbiAgICB9XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IGp1ZGdlQ2hhbmdlVHlwZSxqdWRnZVNpZGUsanVkZ2VTdHlsZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5cblxuaW50ZXJmYWNlIFJlY3RhbmdsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBSZWN0YW5nbGVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUmVjdGFuZ2xlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmNsYXNzIENlbnRlcntcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLnggPSByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy55ID0gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHQgLyAyO1xuICAgIH1cbn1cblxuY2xhc3MgU2l6ZXtcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxufVxuXG5jbGFzcyBTaWRlWFl7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RHcm91cCBleHRlbmRzIEdyb3VwIHtcbiAgICBQYXJlbnRzUmVjdDogUmVjdGFuZ2xlXG4gICAgY29uc3RydWN0b3IocmVjdDogUmVjdGFuZ2xlLGVsOiBFbGVtZW50c1tdKXtcbiAgICAgICAgc3VwZXIoZWwpXG4gICAgICAgIHRoaXMuUGFyZW50c1JlY3QgPSByZWN0O1xuICAgIH1cbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbi8vIGNsYXNzIFR5cGVUZXN0IGltcGxlbWVudHMgUmVjdGFuZ2xlU2hhcGV7XG4vLyAgICAgeDogbnVtYmVyXG4vLyAgICAgeTogbnVtYmVyXG4vLyAgICAgd2lkdGg6IG51bWJlclxuLy8gICAgIGhlaWdodDogbnVtYmVyXG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInJlY3RcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBSZWN0YW5nbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHg7XG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuXG4gICAgfVxufVxuXG5jbGFzcyBsb2dpY1JlY3QgZXh0ZW5kcyBSZWN0YW5nbGV7XG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XG4gICAgcmVjdFBhcmVudHMxOiBSZWN0YW5nbGU7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH19KVxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMSA9IHJlY3RQYXJlbnRzMVxuICAgIH1cbn1cblxuY2xhc3MgY2xpcFJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuY2xhc3MgdW5pb25SZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIGluc3RhbmNlb2ZSZWN0YW5nbGUoZTogYW55KTogZSBpcyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICByZXR1cm4gIGluIGU7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcbi8vICAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xuLy8gICAgIGxldCBzdCA9IHJlY3Quc3R5bGU7XG4vLyAgICAgbGV0IGYscztcbi8vICAgICAvLyBjb25zb2xlLmRpcihzdC5zdHJva2UpXG4vLyAgICAgW2N0eCxmLHNdID0ganVkZ2VTdHlsZShyZWN0LGN0eCk7XG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgICAgIGN0eC5zdHJva2VSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCA9PT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBjb25zb2xlLmRpcihcImVycm9yIUl0IGNhbid0IHBhaW50IGEgcmVjdGFuZ2xlIHdpdGhvdXQgZmlsbFN0eWxlIGFuZCBzdHJva2VTdHlsZVwiKVxuLy8gICAgIH1cbiAgICBcbi8vICAgICByZXR1cm4gcmVjdDtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBqdWRnZVRSUyhyZWN0KTtcbiAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbiAgICBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiByZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWRqb2luUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZml4ZWRTdHlsZT86IHN0cmluZ3xudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLmi7zmjqUgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmi7zmjqXnn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdDtcbiAgICBpZighZml4ZWRTdHlsZSlcbiAgICB7XG4gICAgICAgIGZpeGVkU3R5bGUgPSAnUkVDVExFRlQnXG4gICAgfVxuICAgIGxldCBmID0ganVkZ2VDaGFuZ2VUeXBlKGZpeGVkU3R5bGUpO1xuICAgIC8vIGNvbnNvbGUuZGlyKCdmPScrZik7XG4gICAgaWYoZiA9PT0gMSl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0xlZnQoZml4ZWRSZWN0LHJlY3QpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihuZXdSZWN0KVxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Ub3AoZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9SaWdodChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNCl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0JvdHRvbShmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgb3JkZXIhJylcbiAgICB9XG4gICAgXG4gICAgXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9MZWZ0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggLSByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfUmlnaHQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X1RvcChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfQm90dG9tKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdENlbnRlcihyZWN0OiBSZWN0YW5nbGUpOiBDZW50ZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLkuK3lv4NcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihyZWN0KTtcbiAgICByZXR1cm4gY2VudGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxzaWRlMD86IG51bWJlcnxzdHJpbmcsc2lkZTE/OiBudW1iZXJ8c3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5a+56b2QIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5a+56b2Q55+p5b2iIGZpeGVkU3R5bGUg5a+56b2Q5b2i5byPXG4gICAgaWYoc2lkZTAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUwID0gMFxuICAgICAgICBzaWRlMSA9IDBcbiAgICB9XG4gICAgaWYoc2lkZTEgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cblxuICAgIGlmKHJlY3Quc2hhcGUud2lkdGgqcmVjdC5zaGFwZS5oZWlnaHQgPiBmaXhlZFJlY3Quc2hhcGUud2lkdGgqZml4ZWRSZWN0LnNoYXBlLmhlaWdodCApXG4gICAge1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhVGhlIGFyZWEgb2YgZmlleGVkUmVjdCAgaXMgc21hbGxlciB0aGFuIHRoZSByZWN0IScpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBsZXQgW2YwLGYxXSA9IGp1ZGdlU2lkZShzaWRlMCxzaWRlMSk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGYwK1wiIFwiK2YxKTtcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgIHNoYXBlOntcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHMgPSBuZXcgU2lkZVhZKCk7XG4gICAgICAgIGlmKGYwID09PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMSB8fCBmMSA9PT0gMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGYwID09PSAxIHx8IGYwID09PSAzKVxuICAgICAgICB7XG4gICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kaXIocylcbiAgICAgICAgXG4gICAgICAgIG5ld1JlY3Quc2hhcGUueCA9IHMueDtcbiAgICAgICAgbmV3UmVjdC5zaGFwZS55ID0gcy55O1xuICAgICAgICByZXR1cm4gbmV3UmVjdDtcbiAgICB9XG4gICAgXG4gICAgXG59XG5cbmZ1bmN0aW9uIEFsaWduWFkoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGY6IG51bWJlcik6IFNpZGVYWXtcbiAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKVxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKGZpeGVkUmVjdCk7XG4gICAgLy8gY29uc29sZS5kaXIoY2VudGVyKVxuICAgIGlmKGYgPT09IDApXG4gICAgeyAgIFxuICAgICAgICBzLnggPSBjZW50ZXIueCAtIHJlY3Quc2hhcGUud2lkdGgvMlxuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAxKVxuICAgIHtcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yIC0gcmVjdC5zaGFwZS53aWR0aFxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDQpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMiAtIHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9mZnNldFJlY3QocmVjdDogUmVjdGFuZ2xlLFt4LHldOiBbbnVtYmVyLG51bWJlcl0pOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlubPnp7tcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFycmFuZ2VSZWN0cyhuOiBudW1iZXIsW3hOdW1iZXIseU51bWJlcl06IFtudW1iZXIsbnVtYmVyXSx3aW5kb3dSZWN0OiBSZWN0YW5nbGUsc3R5bGU/OiBudW1iZXIpOiBSZWN0R3JvdXB7XG4gICAgLy/liJvlu7rnn6nlvaLpmLXliJdcbiAgICBsZXQgcmVjdCA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGxldCBudW0gPSB4TnVtYmVyICogeU51bWJlclxuICAgIGxldCB4ID0gd2luZG93UmVjdC5zaGFwZS54XG4gICAgbGV0IHkgPSB3aW5kb3dSZWN0LnNoYXBlLnlcbiAgICBsZXQgd2lkdGggPSB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC8geE51bWJlclxuICAgIGxldCBoZWlnaHQgPSB3aW5kb3dSZWN0LnNoYXBlLmhlaWdodCAvIHlOdW1iZXJcbiAgICAvLyBjb25zb2xlLmRpcihbeCx5LHdpZHRoLGhlaWdodF0pXG5cbiAgICBpZihuID4gbnVtKXtcbiAgICAgICAgbiA9IG51bVxuICAgIH1cblxuICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDA7XG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPiAxKVxuICAgIHtcbiAgICAgICAgc3R5bGUgPSAwXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IDApXG4gICAge1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpZHRoICogaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2luZG93UmVjdC5zaGFwZS53aWR0aCAtIHdpZHRoIC0gd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG4gICAgLy8gY29uc29sZS5kaXIocmVjdClcblxuICAgIGxldCByZWN0R3JvdXAgPSBuZXcgUmVjdEdyb3VwKHdpbmRvd1JlY3QscmVjdCk7XG4gICAgcmV0dXJuIHJlY3RHcm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgLy/np7vliqjnn6nlvaLoh7Pmn5Dnn6nlvaLkuK3lv4MgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmk43kvZznn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdCA9IEFsaWduUmVjdChmaXhlZFJlY3QscmVjdCwwLDApO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0T25Qb2ludChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IE9mZnNldFJlY3QocmVjdCxbeCx5XSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFdpZHRoKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICAvL+iOt+WPluefqeW9ouWuveW6plxuICAgIGxldCB3aWR0aCA9IHJlY3Quc2hhcGUud2lkdGhcbiAgICByZXR1cm4gd2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RIZWlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i6auY5bqmXG4gICAgbGV0IGhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RTaXplKHJlY3Q6IFJlY3RhbmdsZSk6IFNpemV7XG4gICAgLy/ojrflj5bnn6nlvaLlrr3pq5hcbiAgICBsZXQgc2l6ZSA9IG5ldyBTaXplKHJlY3QpXG4gICAgcmV0dXJuIHNpemU7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcbi8vICAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xuLy8gICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3QwLnNoYXBlLngscmVjdDAuc2hhcGUueSxyZWN0MC5zaGFwZS53aWR0aCxyZWN0MC5zaGFwZS5oZWlnaHRdXG4vLyAgICAgbGV0IFt4MSx5MSx3MSxoMV0gPSBbcmVjdDEuc2hhcGUueCxyZWN0MS5zaGFwZS55LHJlY3QxLnNoYXBlLndpZHRoLHJlY3QxLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgUmVjdCx4bix5bix3bixobjtcbi8vICAgICBsZXQgYXJlYTAgPSB3MCAqIGgwO1xuLy8gICAgIGxldCBhcmVhMSA9IHcxICogaDE7XG4vLyAgICAgbGV0IHgseSx3LGhcbi8vICAgICBsZXQgeHQseXQsd3QsaHQscmVjdFxuLy8gICAgIGlmKGFyZWEwID49IGFyZWExKVxuLy8gICAgIHtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MCx5MCx3MCxoMF07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MDtcbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MSx5MSx3MSxoMV07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MTtcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5kaXIoW3gseSx3LGhdKTtcbi8vICAgICBjb25zb2xlLmRpcihbeHQseXQsd3QsaHRdKVxuLy8gICAgIGlmKCFJc0luUmVjdChbeCx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5K2hdLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHldLHJlY3QpICYmICFJc0luUmVjdChbeCx5K2hdLHJlY3QpKXtcbi8vICAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICB3biA9IE1hdGguYWJzKE1hdGgubWluKHgwICsgdzAgLHgxICsgdzEpIC0gTWF0aC5tYXgoeDAsIHgxKSlcbi8vICAgICAgICAgaG4gPSBNYXRoLmFicyhNYXRoLm1pbih5MCArIGgwLCB5MSArIGgxKSAtIE1hdGgubWF4KHkwLCB5MSkpXG4vLyAgICAgICAgIGlmKElzSW5SZWN0KFt4LHldLHJlY3QpKXtcbi8vICAgICAgICAgICAgIHhuID0geDtcbi8vICAgICAgICAgICAgIHluID0geTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4ID49IHh0ICYmIHg8PXh0K3d0KSAmJiAoeSA8IHl0IHx8IHkgPiB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZigoeCA8IHh0IHx8IHggPiB4dCt3dCkgJiYgKHkgPj0geXQgJiYgeSA8PSB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcbi8vICAgICAgICAgICAgIHluID0geVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobilcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICAgICAgUmVjdCA9IFt4bix5bix3bixobl07XG4gICAgICAgIFxuLy8gICAgIH1cblxuLy8gICAgIGxldCBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4vLyAgICAgcmV0dXJuIG5ld1JlY3Q7XG5cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4gICAgbGV0IG5ld1JlY3QsUmVjdFxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIGlmKElzSW5SZWN0KFt4bDAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4bDEseWIxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5YjFdLHJlY3QwKSlcbiAgICB7XG4gICAgICAgIHggPSBNYXRoLm1heCh4bDAseGwxKTtcbiAgICAgICAgeSA9IE1hdGgubWF4KHl0MCx5dDEpO1xuICAgICAgICB3ID0gTWF0aC5taW4oeHIwLHhyMSkgLSB4O1xuICAgICAgICBoID0gTWF0aC5taW4oeWIwLHliMSkgLSB5O1xuICAgICAgICBSZWN0ID0gW3gseSx3LGhdXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cbiAgICB9XG5cbiAgICBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Q7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzSW5SZWN0KFt4LHldOiBbbnVtYmVyLG51bWJlcl0scmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreeCueaYr+WQpuWcqOefqeW9ouWGhVxuICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3Quc2hhcGUueCxyZWN0LnNoYXBlLnkscmVjdC5zaGFwZS53aWR0aCxyZWN0LnNoYXBlLmhlaWdodF1cbiAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR3Jvd1JlY3QoZWw6IFJlY3RhbmdsZS8qfFJlY3RHcm91cHxHcm91cCovLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mraPmlL7otJ/nvKkgXG4gICAgLy8gaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgLy8ge1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6ZWwuc2hhcGUueCAtIGgsXG4gICAgICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCArIDIqaCxcbiAgICAgICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55IC0gdixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0ICsgMip2XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBuZXdSZWN0XG4gICAgICAgIFxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUmVjdEdyb3VwKVxuICAgIC8vIHtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgY29uc29sZS5kaXIoXCLnsbvlnovplJnor69cIilcbiAgICAvLyB9XG59ICAgICAgIFxuXG5leHBvcnQgZnVuY3Rpb24gSW5zZXRSZWN0KGVsOiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+e8qei0n+aUvlxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OmVsLnNoYXBlLnggKz0gaCxcbiAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggLT0gMipoLFxuICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSArPSB2LFxuICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCAtPSAyKnZcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjYWxlUmVjdChyZWN0OiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+avlOS+i+e8qeaUvlxuICAgIGxldCBoMCA9IHJlY3Quc2hhcGUud2lkdGggKiAoaC0xKSAvIDJcbiAgICBsZXQgdjAgPSByZWN0LnNoYXBlLmhlaWdodCAqICh2LTEpIC8gMlxuICAgIGNvbnNvbGUuZGlyKGgwKycgJyt2MClcbiAgICBsZXQgbmV3UmVjdCA9IEdyb3dSZWN0KHJlY3QsaDAsdjApXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzRW1wdHlSZWN0KHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XG4gICAgLy/liKTmlq3nn6npmLXmmK/lkKbkuLrnqbpcbiAgICBsZXQgYXJlYSA9IHJlY3Quc2hhcGUud2lkdGggKiByZWN0LnNoYXBlLmhlaWdodDtcbiAgICBpZihhcmVhID09PSAwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdE9mTWF0cml4KCl7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RMZWZ0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0UmlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0VG9wKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Qm90b20ocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5pb25SZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IHVuaW9uUmVjdHtcbiAgICBsZXQgbmV3UmVjdDtcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XG4gICAgbGV0IHgseSx3LGhcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcbiAgICB4ID0gTWF0aC5taW4oeGwwLHhsMSk7XG4gICAgeSA9IE1hdGgubWluKHl0MCx5dDEpO1xuICAgIHcgPSBNYXRoLm1heCh4cjAseHIxKSAtIHg7XG4gICAgaCA9IE1hdGgubWF4KHliMCx5YjEpIC0geTtcbiAgICBuZXdSZWN0ID0gbmV3IHVuaW9uUmVjdChbeCx5LHcsaF0scmVjdDAscmVjdDEpO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUmVjdChyZWN0OiBSZWN0YW5nbGUsZmlsbD86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUmVjdChyZWN0OiBSZWN0YW5nbGUsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBDaXJjbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImNpcmNsZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGRlY2xhcmUgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgY29uc3RydWN0b3Iob3B0czogQ2lyY2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDaXJjbGUoY2lyY2xlOiBDaXJjbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBDaXJjbGV7XG4gICAgbGV0IHNoID0gY2lyY2xlLnNoYXBlXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGp1ZGdlVFJTKGNpcmNsZSlcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICBqdWRnZVN0eWxlKGNpcmNsZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gY2lyY2xlO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdEb3RzKFt4LHkscl06IFtudW1iZXIsbnVtYmVyLG51bWJlcl0sY29sb3I6IHN0cmluZyk6IENpcmNsZXtcbiAgICBsZXQgY2lyY2xlID0gbmV3IENpcmNsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHI6IHJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlIDogJ25vbmUnXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjaXJjbGVcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgTGluZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB4RW5kOiBudW1iZXIsXG4gICAgeUVuZDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBMaW5lT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IExpbmVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJsaW5lXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogTGluZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xuLy8gICAgIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuLy8gICAgICAgICBsZXQgbCA9IHRoaXMubWFrZUxpbmUobGluZSxjdHgpO1xuLy8gICAgICAgICByZXR1cm4gbDtcbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcbiAgICBsZXQgc2ggPSBsaW5lLnNoYXBlO1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBqdWRnZVRSUyhsaW5lKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueEVuZCxzaC55RW5kKVxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBsaW5lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TGluZXMoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwKTogR3JvdXB7XG4gICAgLy/nu5jliLblpJrmnaHnur8gb3B0czrnur/mnaHlsZ7mgKdcbiAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAoZWwpXG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TWxpbmUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxnYXA/OiBudW1iZXJbXSxzdHlsZT86IGJvb2xlYW4sc3RpcHBsZT86IGJvb2xlYW4sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyBnYXDnur/kuYvpl7TnmoTpl7TpmpQgc3R5bGU9ZmFsc2XkuLrmsLTlubPlubPooYwsPXRydWXkuLrnq5bnm7TlubPooYwgc3RpcHBsZT1mYWxzZeS4uuWunue6vyw9dHJ1ZeS4uuiZmue6v1xuICAgIGlmKHdpZHRoR2FwID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHdpZHRoR2FwICE9PSAnbnVtYmVyJylcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gMTA7XG4gICAgICAgIGlmKHN0aXBwbGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3RpcHBsZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdGlwcGxlID09PSBmYWxzZVxuICAgICAgICAgICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3R5bGUgIT09ICdib29sZWFuJyl7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZihnYXAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IFsxMDAsMTAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsZXQgb3B0cyA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGlmKHN0aXBwbGUgPT09IGZhbHNlKVxuICAgIHtcbiAgICAgICAgb3B0c1swXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kK2dhcFtpLTFdKmlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSAoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgb3B0c1swXSA9IExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXSx3aWR0aEdhcCk7XG4gICAgICAgIGlmKHN0eWxlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4LHkrZ2FwW2ktMV0qaSx4RW5kLHlFbmQrZ2FwW2ktMV0qaV0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCtnYXBbaS0xXSppLHkseEVuZCtnYXBbaS0xXSppLHlFbmRdLHdpZHRoR2FwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICAgICBcbiAgICBcbiAgICBsZXQgZ3JvdXAgPSBEcmF3TGluZXMob3B0cyk7XG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW5lU3RpcHBsZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgd2lkdGhHYXDpl7TpmpQgXG4gICAgbGV0IGxpbmVsZW5ndGggPSBNYXRoLnNxcnQoTWF0aC5wb3coeEVuZC14LDIpK01hdGgucG93KHlFbmQteSwyKSlcbiAgICBpZih3aWR0aEdhcD5saW5lbGVuZ3RofHx3aWR0aEdhcD09PXVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gbGluZWxlbmd0aC8xMDtcbiAgICB9XG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IobGluZWxlbmd0aC93aWR0aEdhcClcbiAgICBsZXQgeGcgPSB3aWR0aEdhcCooeEVuZC14KS9saW5lbGVuZ3RoXG4gICAgbGV0IHlnID0gd2lkdGhHYXAqKHlFbmQteSkvbGluZWxlbmd0aFxuICAgIC8vIGNvbnNvbGUuZGlyKG51bSlcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxpbmUgPSBuZXcgQXJyYXkoKTtcbiAgICB3aGlsZShpPG51bSlcbiAgICB7XG4gICAgICAgIGxpbmVbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgreGcqaSxcbiAgICAgICAgICAgICAgICB5OiB5K3lnKmksXG4gICAgICAgICAgICAgICAgeEVuZDogeCt4ZyooaSsxKSxcbiAgICAgICAgICAgICAgICB5RW5kOiB5K3lnKihpKzEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGkrPTI7XG4gICAgfVxuICAgIGxldCBMaW5lU3RpcHBsZSA9IG5ldyBHcm91cChsaW5lKVxuICAgIHJldHVybiBMaW5lU3RpcHBsZVxufVxuXG4vLyBleHBvcnQgY2xhc3MgUG9seSBleHRlbmRzIEdyb3Vwe1xuLy8gICAgIHN0eWxlOiBTdHlsZVxuLy8gICAgIGNvbnN0cnVjdG9yKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCxzdHlsZT86IFN0eWxlKXtcbi8vICAgICAgICAgc3VwZXIoZWwpXG4vLyAgICAgICAgIGlmKHN0eWxlKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4vLyAgICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4vLyAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbi8vICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQXJjU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBhbmdfZjogbnVtYmVyLFxuICAgIGFuZ19lOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEFyY09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBBcmNTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBBcmMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImFyY1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEFyY09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQXJje1xuICAgIGxldCBzdCA9IGFyYy5zdHlsZVxuICAgIGlmKHN0LmZpbGwgPT09IHVuZGVmaW5lZCB8fCBzdC5maWxsID09PSAnbm9uZScgfHwgc3QuZmlsbCA9PT0gJyNmZmYnKVxuICAgIHtcbiAgICAgICAgbWFrZUZyYW1lQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBtYWtlRmlsbEFyYyhhcmMsY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIGFyYztcbn1cblxuZnVuY3Rpb24gbWFrZUZyYW1lQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAganVkZ2VUUlMoYXJjKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxufVxuXG5mdW5jdGlvbiBtYWtlRmlsbEFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2YpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZikpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZSksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19lKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZUFyYyhhcmM6IEFyYyxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogQXJje1xuICAgIC8v55S757KX57q/5bynIFxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgLy8ganVkZ2VTdHlsZV9lenN5KGFyYylcblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQXJjKGFyYzogQXJjLGZpbGw/OiBzdHJpbmcpOiBBcmN7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG5cbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogYXJjLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxuICAgICAgICAgICAgYW5nX2Y6IGFyYy5zaGFwZS5hbmdfZixcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJjMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgRWxsaXBzZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeD86IG51bWJlcixcbiAgICB5PzogbnVtYmVyLFxuICAgIHJhPzogbnVtYmVyLFxuICAgIHJiPzogbnVtYmVyXG4gICAgLy9yYeS4uuaoquWNiui9tOmVvyByYuS4uue6teWNiui9tOmVv1xufVxuXG5pbnRlcmZhY2UgRWxsaXBzZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBFbGxpcHNlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZWxsaXBzZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEVsbGlwc2VPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XG4gICAgLy9tYXjmmK/nrYnkuo4x6Zmk5Lul6ZW/6L205YC877yM5Y2zYeWSjGLkuK3nmoTovoPlpKfogIVcbiAgICAvL2nmr4/mrKHlvqrnjq/lop7liqAxL21heO+8jOihqOekuuW6puaVsOeahOWinuWKoFxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxuICAgIGxldCBzaCA9IGVsbGlwc2Uuc2hhcGVcbiAgICBsZXQgc3RlcCA9IChzaC5yYSA+IHNoLnJiKSA/IDEgLyBzaC5yYSA6IDEgLyBzaC5yYjtcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGp1ZGdlVFJTKGVsbGlwc2UpO1xuICAgIGN0eC5tb3ZlVG8oc2gueCArIHNoLnJhLCBzaC55KTsgLy/ku47mpK3lnIbnmoTlt6bnq6/ngrnlvIDlp4vnu5jliLZcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKiBNYXRoLlBJOyBpICs9IHN0ZXApXG4gICAge1xuICAgICAgICAvL+WPguaVsOaWueeoi+S4unggPSBhICogY29zKGkpLCB5ID0gYiAqIHNpbihpKe+8jFxuICAgICAgICAvL+WPguaVsOS4umnvvIzooajnpLrluqbmlbDvvIjlvKfluqbvvIlcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54ICsgc2gucmEgKiBNYXRoLmNvcyhpKSwgc2gueSArIHNoLnJiICogTWF0aC5zaW4oaSkpO1xuICAgIH1cbiAgICBqdWRnZVN0eWxlKGVsbGlwc2UsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBlbGxpcHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGZpbGw/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZU92YWwoZWxsaXBzZTogRWxsaXBzZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogRWxsaXBzZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlbGxpcHNlMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgUG9seWdvblNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4QTogbnVtYmVyW11cbiAgICB5QTogbnVtYmVyW11cbn1cblxuaW50ZXJmYWNlIFBvbHlnb25PcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUG9seWdvblNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInBvbHlnb25cIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBQb2x5Z29uT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQb2x5Z29uKHBvbHlnb246IFBvbHlnb24sY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBQb2x5Z29ue1xuICAgIGxldCBzaCA9IHBvbHlnb24uc2hhcGVcbiAgICBsZXQgbnVtID0gMDtcbiAgICBpZihzaC54QS5sZW5ndGggIT09IHNoLnlBLmxlbmd0aClcbiAgICB7XG4gICAgICAgIG51bSA9IE1hdGgubWluKHNoLnhBLmxlbmd0aCxzaC55QS5sZW5ndGgpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG51bSA9IHNoLnhBLmxlbmd0aFxuICAgIH1cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8ganVkZ2VUUlMocG9seWdvbikgXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKVxuICAgIHtcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcbiAgICB9XG4gICAgY3R4LmxpbmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gcG9seWdvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVQb2x5KHBvbHlnb246IFBvbHlnb24sbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFBvbHlnb257XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBvbHlnb24wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUG9seShwb2x5Z29uOiBQb2x5Z29uLGZpbGw/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlX3RleHQsIGp1ZGdlVGV4dFN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgVGV4dFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBtYXhXaWR0aD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgVGV4dE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBUZXh0U2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG4gICAgdGV4dExpbmU/OiBUZXh0TGluZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRMaW5le1xuICAgIHRleHRBOiBDYW52YXNUZXh0QWxpZ25cbiAgICB0ZXh0QjogQ2FudmFzVGV4dEJhc2VsaW5lXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgVGV4dHMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInRleHRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBUZXh0T3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdHMudGV4dExpbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGV4dExpbmUgPSBvcHRzLnRleHRMaW5lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnRleHRMaW5lID0ge1xuICAgICAgICAgICAgICAgIHRleHRBOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIHRleHRCOiAnYWxwaGFiZXRpYydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIHNldFRleHRMaW5lKHRleHRMaW5lOiBUZXh0TGluZSl7XG4gICAgICAgIGlmKHRleHRMaW5lKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0ZXh0TGluZS50ZXh0QSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRMaW5lLnRleHRBID0gdGV4dExpbmUudGV4dEFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRCKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dExpbmUudGV4dEIgPSB0ZXh0TGluZS50ZXh0QlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRleHQodGV4dDogVGV4dHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBUZXh0c3tcblxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcblxuICAgIC8vIGp1ZGdlVFJTKHRleHQpXG4gICAgY3R4LnRleHRBbGlnbiA9IHRleHQudGV4dExpbmUudGV4dEFcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gdGV4dC50ZXh0TGluZS50ZXh0QlxuXG4gICAganVkZ2VUZXh0U3R5bGUodGV4dCxjdHgpXG5cbiAgICBqdWRnZVN0eWxlX3RleHQodGV4dCxjdHgpXG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYXRTdHIoc3RyQTogc3RyaW5nW10pOiBzdHJpbmd7XG4gICAgbGV0IHRleHQgPSAnJ1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0ckEubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyQVtpXTtcbiAgICB9XG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFN0clBhZChzdHI6IHN0cmluZyxzdHIwOiBzdHJpbmcsbnVtPzogbnVtYmVyKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBcbiAgICBpZihudW0gPT09IHVuZGVmaW5lZCB8fCBudW0gPT09IDApXG4gICAge1xuICAgICAgICBudW0gPSAxO1xuICAgIH1cblxuICAgIGZvcihsZXQgaT0wO2k8bnVtO2krKylcbiAgICB7XG4gICAgICAgIHRleHQgKz0gc3RyMFxuICAgIH1cbiAgICB0ZXh0ICs9IHN0clxuXG4gICAgcmV0dXJuIHRleHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN0cmVxKHN0cjA6IHN0cmluZyxzdHIxOiBzdHJpbmcpOiBib29sZWFue1xuICAgIGxldCByZXN1bHQgPSBmYWxzZVxuICAgIHJlc3VsdCA9IHN0cjAuaW5jbHVkZXMoc3RyMSk7XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVwbGFjZShzdHI6IHN0cmluZyxzdHJfbzogc3RyaW5nLHN0cl9yOiBzdHJpbmcpOnN0cmluZ3tcbiAgICBsZXQgcmVzdWx0ID0gJydcblxuICAgIHJlc3VsdCA9IHN0ci5yZXBsYWNlKG5ldyBSZWdFeHAoc3RyX28sJ2cnKSxzdHJfcik7XG5cbiAgICByZXR1cm4gcmVzdWx0XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnO1xuaW1wb3J0IHsganVkZ2VJbWFnZVNoYXBlLCBqdWRnZVN0eWxlLGp1ZGdlSW1hZ2VTaGFwZV90cnVlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgSW1nU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICBpbWc6IHN0cmluZ1xuICAgIHg6IG51bWJlclxuICAgIHk6IG51bWJlclxuICAgIHdpZHRoPzogbnVtYmVyXG4gICAgaGVpZ2h0PzogbnVtYmVyXG4gICAgc3g/OiBudW1iZXJcbiAgICBzeT86IG51bWJlclxuICAgIHN3aWR0aD86IG51bWJlclxuICAgIHNoZWlnaHQ/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEltZ09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBJbWdTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbiAgICBJbWc/OiBhbnlcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5jbGFzcyBSR0JBIHtcbiAgICBSOiBudW1iZXJcbiAgICBHOiBudW1iZXJcbiAgICBCOiBudW1iZXJcbiAgICBBOiBudW1iZXJcbn1cblxuY2xhc3MgUkdCQV9BcnJheXtcbiAgICBSR0JBX0xpc3Q6IFJHQkFbXVxuICAgIHdpZHRoOiBudW1iZXJcbiAgICBoZWlnaHQ6IG51bWJlclxufVxuXG5leHBvcnQgY2xhc3MgSW1nIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJpbWdcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBJbWc/OiBhbnlcbiAgICBJbWdEYXRhPzogSW1hZ2VEYXRhXG4gICAgSXNDaGFuZ2U/OiBib29sZWFuXG4gICAgY29uc3RydWN0b3Iob3B0czogSW1nT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIGlmKG9wdHMuSW1nID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBJID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgIEkuc3JjID0gb3B0cy5zaGFwZS5pbWdcbiAgICAgICAgICAgIEkuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJzsgXG4gICAgICAgICAgICB0aGlzLkltZyA9IEk7XG4gICAgICAgICAgICBjb25zb2xlLmRpcih0aGlzLkltZylcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xuICAgICAgICAvLyAgICAgdGV4dHVyZTogW10sXG4gICAgICAgIC8vICAgICB3aWR0aDogMCxcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmKG9wdHMuSW1nRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcbiAgICAgICAgLy8gfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3ggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zd2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zd2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUud2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcblxuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLkltZ0RhdGEpXG4gICAgICAgIFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICAvLyBpZihvcHRzLnN0eWxlKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIGluaXQoKXtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxuICAgICAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gICAgICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBjLndpZHRoID0gc2NyZWVuLmF2YWlsV2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gc2NyZWVuLmF2YWlsSGVpZ2h0O1xuICAgICAgICBjb25zb2xlLmRpcih0aGF0LkltZylcbiAgICAgICAgLy8gdGhhdC5JbWcub25sb2FkID0gKCk9PntcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UodGhhdC5JbWcsMCwwKVxuICAgICAgICAgICAgdGhhdC5JbWdEYXRhID0gY3R4LmdldEltYWdlRGF0YSgwLDAsdGhhdC5JbWcud2lkdGgsdGhhdC5JbWcuaGVpZ2h0KTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQuSW1nRGF0YSlcbiAgICAgICAgLy8gfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLyB0aGlzLm1ha2VUZXh0dXJlcygpXG4gICAgfVxuICAgIHRvR3JheSgpe1xuICAgICAgICBsZXQgaW1nID0gbmV3IEltZyh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIGltZzogdGhpcy5zaGFwZS5pbWcsXG4gICAgICAgICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMuc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxuICAgICAgICAgICAgICAgIHN5OiB0aGlzLnNoYXBlLnN5LFxuICAgICAgICAgICAgICAgIHN3aWR0aDogdGhpcy5zaGFwZS5zd2lkdGgsXG4gICAgICAgICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBpbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgICAgIGxldCBnID0gMFxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGcgPSBNYXRoLmZsb29yKHRoaXMuSW1nRGF0YS5kYXRhWzQqaSswXSAqIDAuMjk5ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzFdICogMC41ODcgKyB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMl0gKiAwLjExNCk7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXSA9IGdcbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdID0gZ1xuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl0gPSBnXG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSszXSA9IHRoaXMuSW1nRGF0YS5kYXRhWzQqaSszXVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuICAgIHJlcGxhY2UoKXtcbiAgICAgICAgdGhpcy5Jc0NoYW5nZSA9IGZhbHNlXG4gICAgICAgIHRoaXMuaW5pdCgpXG4gICAgfVxuICAgIG1ha2VUZXh0dXJlcygpe1xuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0gbmV3IFRleHR1cmVzKHRoaXMpO1xuICAgICAgICBsZXQgaW1nID0gdGhpcy50b0dyYXkoKTtcbiAgICAgICAgbGV0IGRhdGEwID0gaW1nLkltZ0RhdGEuZGF0YTtcbiAgICAgICAgbGV0IGEgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgYXJyID0gJydcbiAgICAgICAgbGV0IG51bUFycjogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbGV0IG51bUFycjA6IG51bWJlcltdID0gW107XG4gICAgICAgIC8vIGxldCBkYXRhID0gdGhpcy5JbWdEYXRhLmRhdGFcbiAgICAgICAgbGV0IHcgPSB0aGlzLkltZ0RhdGEud2lkdGhcbiAgICAgICAgLy8gY29uc29sZS5kaXIodylcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZGF0YSlcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YTAubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAzO3QrKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGsgPSAwO2sgPCAzO2srKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRhdGEwWzQqaV0gPD0gZGF0YTBbNCooaSsodC0xKSp3K2stMSldIHx8IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhWzMqdCtrXSA9IDBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAxXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoMyp0K2sgIT09IDQpXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyciArPSBhWzMqdCtrXS50b1N0cmluZygpOyBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoaSsodC0xKSp3K2stMSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbnVtQXJyW2ldID0gcGFyc2VJbnQoYXJyLDIpXG4gICAgICAgICAgICBhcnIgPSAnJ1xuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IG51bUFyci5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSswXT1udW1BcnJbaV1cbiAgICAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzFdPW51bUFycltpXVxuICAgICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMl09bnVtQXJyW2ldXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlSW1nKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogSW1ne1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICAvLyBqdWRnZVRSUyhpbWcpXG4gICAgaWYoaW1nLklzQ2hhbmdlID09PSBmYWxzZSlcbiAgICB7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZShpbWcsY3R4KTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nLGN0eCk7XG4gICAgfVxuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gaW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbVJlYWQoaW1nOiBJbWcpOiBJbWFnZURhdGF7ICAgICAgICAgLy/or7vlj5blm77niYfnn6npmLVcbiAgICByZXR1cm4gaW1nLkltZ0RhdGE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBVbnBhY2tDb2xvckltYWdlKGltZzogSW1nKTogUkdCQV9BcnJheXtcbiAgICBsZXQgcmdiYSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGRhdGEgPSBpbWcuSW1nRGF0YS5kYXRhXG4gICAgXG4gICAgZm9yKGxldCBpID0gMDtpIDwgZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICByZ2JhW2ldID0gbmV3IFJHQkEoKVxuICAgICAgICBcbiAgICAgICAgcmdiYVtpXS5SID0gZGF0YVs0KmkrMF1cbiAgICAgICAgcmdiYVtpXS5HID0gZGF0YVs0KmkrMV1cbiAgICAgICAgcmdiYVtpXS5CID0gZGF0YVs0KmkrMl1cbiAgICAgICAgcmdiYVtpXS5BID0gZGF0YVs0KmkrM11cblxuICAgIH1cblxuICAgIGxldCByZ2JhX2FyciA9IG5ldyBSR0JBX0FycmF5KClcbiAgICByZ2JhX2Fyci5SR0JBX0xpc3QgPSByZ2JhO1xuICAgIHJnYmFfYXJyLndpZHRoID0gaW1nLkltZ0RhdGEud2lkdGhcbiAgICByZ2JhX2Fyci5oZWlnaHQgPSBpbWcuSW1nRGF0YS5oZWlnaHRcblxuICAgIHJldHVybiByZ2JhX2FyclxufVxuXG5leHBvcnQgZnVuY3Rpb24gUGFja0NvbG9ySW1hZ2UocmdiYV9hcnI6IFJHQkFfQXJyYXkpOiBJbWFnZURhdGF7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcblxuICAgIGxldCBpbWdkYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShyZ2JhX2Fyci53aWR0aCxyZ2JhX2Fyci5oZWlnaHQpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHJnYmFfYXJyLlJHQkFfTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSswXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5SXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMV0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uR1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzJdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSszXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5BXG4gICAgfVxuICAgIHJldHVybiBpbWdkYXRhXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VJbihpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAxO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9IGFscGhhSW5cbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBNYXNrSW1hZ2VPdXQoaW1nOiBJbWcsYWxwaGFJbjogbnVtYmVyKTogSW1ne1xuICAgIGlmKGFscGhhSW4+MSB8fCBhbHBoYUluPDApXG4gICAge1xuICAgICAgICBhbHBoYUluID0gMDtcbiAgICB9XG4gICAgbGV0IG5ld0ltZyA9IG5ldyBJbWcoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgaW1nOiBpbWcuc2hhcGUuaW1nLFxuICAgICAgICAgICAgeDogaW1nLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBpbWcuc2hhcGUueVxuICAgICAgICB9XG4gICAgfSlcbiAgICAvLyBjb25zb2xlLmRpcihpbWcuSW1nRGF0YSlcbiAgICAvLyBjb25zb2xlLmRpcihuZXdJbWcuSW1nRGF0YSlcbiAgICBuZXdJbWcuSXNDaGFuZ2UgPSB0cnVlXG4gICAgZm9yKGxldCBpID0gMDtpIDwgaW1nLkltZ0RhdGEuZGF0YS5sZW5ndGgvNDtpKyspXG4gICAge1xuICAgICAgICBuZXdJbWcuSW1nRGF0YS5kYXRhWzQqaSszXSAqPSAoMSAtIGFscGhhSW4pXG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gSW1nSW5pdChpbWc6IEltZ1tdfEdyb3VwKXtcbiAgICBsZXQgSTtcbiAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgSSA9IGltZ1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgSS5ncm91cExpc3RbaV0uaW5pdCgpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUHJlbG9hZFRleHR1cmVzKGltZzogSW1nKTogSW1ne1xuICAgIGxldCBuZXdJbWcgPSBpbWcubWFrZVRleHR1cmVzKCk7XG4gICAgcmV0dXJuIG5ld0ltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gRHJhd1RleHR1cmUoaW1nOiBJbWcpOiBJbWd7XG4gICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZXMoaW1nOiBJbWdbXXxHcm91cCk6IEdyb3Vwe1xuICAgIGxldCBJO1xuICAgIGxldCB0ZXh0dXJlOiBJbWdbXSA9IFtdXG4gICAgbGV0IFQ7XG4gICAgaWYoaW1nWzBdIGluc3RhbmNlb2YgSW1nKVxuICAgIHtcbiAgICAgICAgSSA9IG5ldyBHcm91cChpbWcpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIEkgPSBpbWdcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgSS5ncm91cExpc3QubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIHRleHR1cmVbaV0gPSBEcmF3VGV4dHVyZShJLmdyb3VwTGlzdFtpXSlcbiAgICB9XG4gICAgVCA9IG5ldyBHcm91cCh0ZXh0dXJlKVxuICAgIHJldHVybiBUO1xufSIsIlxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxbeDAseTAseDEseTFdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxudW06IG51bWJlcixzOiBudW1iZXIpOiBDYW52YXNHcmFkaWVudHtcbiAgICBsZXQgZmlsbCA9IGN0eC5jcmVhdGVMaW5lYXJHcmFkaWVudCh4MCx5MC1zLHgxLHkxLXMpXG4gICAgZmlsbC5hZGRDb2xvclN0b3AoMCwnI2ZmZicpXG4gICAgZm9yKGxldCBpID0gMTtpIDwgbnVtO2krKyl7XG4gICAgICAgIGlmKGklMiA9PT0gMSl7XG4gICAgICAgICAgICBmaWxsLmFkZENvbG9yU3RvcChpL251bSwnIzAwMCcpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCcjZmZmJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBmaWxsLmFkZENvbG9yU3RvcCgxLCcjZmZmJylcbiAgICByZXR1cm4gZmlsbFxufSIsImltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSBcIi4uL0VsZW1lbnRcIjtcbmltcG9ydCB7IGRlbGF5X2ZyYW1lLCBuYW1lU3R5bGUsIE9wdHMsIFNoYXBlLCBTdHlsZSB9IGZyb20gXCIuLi9lenBzeVwiO1xuaW1wb3J0IHsganVkZ2VFbGVtZW50LCBqdWRnZVN0eWxlIH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgY3JlYXRlR3JhdExpbmVhckdyYWRpZW50IH0gZnJvbSBcIi4uL0dyYWRpZW50L2dyYWRpZW50XCI7XG5cbmludGVyZmFjZSBHcmF0U2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBkZXNpdHk6IG51bWJlciAvL+WvhumbhuW6plxufVxuXG5pbnRlcmZhY2UgR3JhdE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBHcmF0U2hhcGUsXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMFxuXG5leHBvcnQgY2xhc3MgR3JhdCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZ3JhdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEdyYXRPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICBpZighb3B0cy5zaGFwZS5kZXNpdHkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIG9wdHMuc2hhcGUuZGVzaXR5ID0gMzVcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZVxuICAgICAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XG4gICAgICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgIGZpbGw6IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHgsW3NoLngtc2gucixzaC55LXNoLnIsc2gueC1zaC5yLHNoLnkrMypzaC5yXSxzaC5kZXNpdHksMCksXG4gICAgICAgICAgICBzdHJva2U6ICdub25lJyxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICB9XG4gICAgICAgIC8vIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIC8vIHtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGVsc2V7XG4gICAgICAgIC8vICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAvLyAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAvLyAgICAgICAgIHN0cm9rZTogXCJub25lXCIsXG4gICAgICAgIC8vICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgIC8vICAgICB9XG4gICAgICAgIC8vIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICBwbGF5KHNwZWVkPzogbnVtYmVyLGRlbGF5PzogbnVtYmVyKVxuICAgIHtcbiAgICAgICAgaWYoIWRlbGF5KXtcbiAgICAgICAgICAgIGRlbGF5ID0gNlxuICAgICAgICAgICAgaWYoIXNwZWVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gOFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgdGhpcy5hbmltYXRlKCgpPT57XG4gICAgICAgICAgICB0aGF0LnN0eWxlLmZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFt4MCx5MCx4MSx5MV0sdGhhdC5zaGFwZS5kZXNpdHksaW5kZXgqaSk7XG4gICAgICAgICAgICBpZihpbmRleCppID49IDIqdGhhdC5zaGFwZS5yKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0aGF0KVxuICAgICAgICAgICAgaSsrO1xuICAgICAgICB9LGRlbGF5KVxuICAgIH1cbiAgICAvLyBwbGF5KHNwZWVkPzogbnVtYmVyLGRlbGF5PzogbnVtYmVyKXtcbiAgICAvLyAgICAgaWYoIWRlbGF5KXtcbiAgICAvLyAgICAgICAgIGRlbGF5ID0gOFxuICAgIC8vICAgICAgICAgaWYoIXNwZWVkKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNwZWVkID0gOFxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgLy8gICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgIC8vICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDtpID4gLTE7aSsrKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGxldCBmaWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbeDAseTAseDEseTFdLHRoYXQuc2hhcGUuZGVzaXR5LGluZGV4KmkpO1xuICAgIC8vICAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBpID0gMFxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB1cGRhdGVHcmF0KHRoYXQsY3R4LGZpbGwpXG4gICAgLy8gICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoaSlcbiAgICAvLyAgICAgICAgICAgICAvLyB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoZGVsYXkpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pKClcbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpe1xuICAgIC8vICAgICBpZighZGVsYXkpe1xuICAgIC8vICAgICAgICAgZGVsYXkgPSA4XG4gICAgLy8gICAgICAgICBpZighc3BlZWQpXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIC8vIGNvbnNvbGUuZGlyKCdhJylcbiAgICAvLyAgICAgLy8gbGV0IFt4MCx5MCx4MSx5MV0gPSBbdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnktdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55KzMqdGhpcy5zaGFwZS5yXVxuICAgIC8vICAgICBsZXQgaW5kZXggPSBzcGVlZDtcbiAgICAvLyAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgIC8vICAgICAoYXN5bmMgZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA+IC0xO2krKylcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBpZihpbmRleCppID49IDIqdGhhdC5zaGFwZS5yKVxuICAgIC8vICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgaSA9IDBcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgdXBkYXRlR3JhdDAodGhhdCxjdHgsaW5kZXgqaSlcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihpKVxuICAgIC8vICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKGRlbGF5KVxuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KSgpXG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUdyYXQoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEdyYXR7XG4gICAgbGV0IHNoID0gZ3JhdC5zaGFwZTtcbiAgICAvLyBjb25zb2xlLmRpcihzaClcbiAgICAvLyBsZXQgbnVtID0gc2guZGVzaXR5O1xuICAgIC8vIGxldCBmaWxsID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHNoLngtc2gucixzaC55LXNoLnIsc2gueC1zaC5yLHNoLnkrc2gucilcbiAgICAvLyBmaWxsLmFkZENvbG9yU3RvcCgwLCd3aGl0ZScpXG4gICAgLy8gZm9yKGxldCBpID0gMTtpIDwgbnVtO2krKyl7XG4gICAgLy8gICAgIGlmKGklMiA9PT0gMSl7XG4gICAgLy8gICAgICAgICBmaWxsLmFkZENvbG9yU3RvcChpL251bSwnYmxhY2snKVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBmaWxsLmFkZENvbG9yU3RvcChpL251bSwnd2hpdGUnKVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vIGZpbGwuYWRkQ29sb3JTdG9wKDEsJ3doaXRlJylcbiAgICAvLyBsZXQgZmlsbCA9IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHgsW3NoLngtc2gucixzaC55LXNoLnIsc2gueC1zaC5yLHNoLnkrMypzaC5yXSxudW0sMClcbiAgICAvLyBsZXQgYyA9IGN0eC5jYW52YXNcbiAgICAvLyBjLnN0eWxlLmJvcmRlclJhZGl1cyA9ICc1MCUnO1xuICAgIC8vIGdyYXQuc3R5bGUuZmlsbCA9IGZpbGxcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgZXpKdWRnZS5qdWRnZVRSUyhncmF0KVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpXG4gICAgLy8gY3R4LnJlY3Qoc2gueC1zaC5yLHNoLnktc2gucixzaC54K3NoLnIsc2gueSszKnNoLnIpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gY3R4LnNhdmUoKVxuICAgIC8vIGN0eC5iZWdpblBhdGgoKTtcbiAgICAvLyBjdHgucmVjdChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngrc2gucixzaC55KzIqc2gucik7XG4gICAgLy8ganVkZ2VTdHlsZShncmF0LGN0eCk7XG4gICAgLy8gY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1pbidcbiAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICAvLyBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJ1xuICAgIC8vIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsMCwyKk1hdGguUEkpO1xuICAgIC8vIGN0eC5maWxsKClcbiAgICAvLyBjdHguY2xvc2VQYXRoKCk7XG4gICAgLy8gY3R4LnJlc3RvcmUoKVxuICAgIFxuICAgIHJldHVybiBncmF0O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVHcmF0KGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsZmlsbDogQ2FudmFzR3JhZGllbnQpe1xuICAgIGdyYXQucmVtb3ZlKClcbiAgICBncmF0LnN0eWxlLmZpbGwgPSBmaWxsXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LmFyYyhncmF0LnNoYXBlLngsZ3JhdC5zaGFwZS55LGdyYXQuc2hhcGUuciwwLDIqTWF0aC5QSSlcbiAgICBqdWRnZVN0eWxlKGdyYXQsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVHcmF0MChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELG51bTogbnVtYmVyKXtcbiAgICAvLyBjb25zb2xlLmRpcihncmF0KVxuICAgIGdyYXQucmVtb3ZlKClcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4LnRyYW5zbGF0ZSgwLC1udW0pXG4gICAgY3R4LnJlY3QoZ3JhdC5zaGFwZS54LWdyYXQuc2hhcGUucixncmF0LnNoYXBlLnktZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueCtncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS55KzMqZ3JhdC5zaGFwZS5yKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxufSIsIlxubGV0IHdhc207XG5cbmxldCBjYWNoZWdldEludDMyTWVtb3J5MCA9IG51bGw7XG5mdW5jdGlvbiBnZXRJbnQzMk1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZ2V0SW50MzJNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZ2V0SW50MzJNZW1vcnkwLmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0SW50MzJNZW1vcnkwID0gbmV3IEludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0SW50MzJNZW1vcnkwO1xufVxuXG5sZXQgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBudWxsO1xuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKCkge1xuICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4gICAgfVxuICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5MDtcbn1cblxuZnVuY3Rpb24gZ2V0QXJyYXlVOEZyb21XYXNtMChwdHIsIGxlbikge1xuICAgIHJldHVybiBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIgLyAxLCBwdHIgLyAxICsgbGVuKTtcbn1cbi8qKlxuKiBAcGFyYW0ge251bWJlcn0gcmFkaXVzXG4qIEBwYXJhbSB7bnVtYmVyfSBwaXhlbHNfcGVyX2RlZ3JlZVxuKiBAcGFyYW0ge251bWJlcn0gc3BhdGlhbF9mcmVxdWVuY3lcbiogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlXG4qIEBwYXJhbSB7bnVtYmVyfSBjb250cmFzdFxuKiBAcGFyYW0ge251bWJlcn0gcGhhc2VcbiogQHBhcmFtIHtudW1iZXJ9IGdhbW1hXG4qIEByZXR1cm5zIHtVaW50OEFycmF5fVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVfc2luZ3JhdChyYWRpdXMsIHBpeGVsc19wZXJfZGVncmVlLCBzcGF0aWFsX2ZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSwgZ2FtbWEpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcbiAgICAgICAgd2FzbS5wcmVfc2luZ3JhdChyZXRwdHIsIHJhZGl1cywgcGl4ZWxzX3Blcl9kZWdyZWUsIHNwYXRpYWxfZnJlcXVlbmN5LCBhbmdsZSwgY29udHJhc3QsIHBoYXNlLCBnYW1tYSk7XG4gICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcbiAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xuICAgICAgICB2YXIgdjAgPSBnZXRBcnJheVU4RnJvbVdhc20wKHIwLCByMSkuc2xpY2UoKTtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocjAsIHIxICogMSk7XG4gICAgICAgIHJldHVybiB2MDtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xuICAgIH1cbn1cblxuLyoqXG4qIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiogQHBhcmFtIHtudW1iZXJ9IHBpeGVsc19wZXJfZGVncmVlXG4qIEBwYXJhbSB7bnVtYmVyfSBzcGF0aWFsX2ZyZXF1ZW5jeVxuKiBAcGFyYW0ge251bWJlcn0gYW5nbGVcbiogQHBhcmFtIHtudW1iZXJ9IGNvbnRyYXN0XG4qIEBwYXJhbSB7bnVtYmVyfSBwaGFzZVxuKiBAcGFyYW0ge251bWJlcn0gbGV2ZWxcbiogQHBhcmFtIHtudW1iZXJ9IGdhbW1hXG4qIEByZXR1cm5zIHtVaW50OEFycmF5fVxuKi9cbmV4cG9ydCBmdW5jdGlvbiBwcmVfbm9pc2Vfc2luZ3JhdChyYWRpdXMsIHBpeGVsc19wZXJfZGVncmVlLCBzcGF0aWFsX2ZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSwgbGV2ZWwsIGdhbW1hKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XG4gICAgICAgIHdhc20ucHJlX25vaXNlX3NpbmdyYXQocmV0cHRyLCByYWRpdXMsIHBpeGVsc19wZXJfZGVncmVlLCBzcGF0aWFsX2ZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSwgbGV2ZWwsIGdhbW1hKTtcbiAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xuICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XG4gICAgICAgIHZhciB2MCA9IGdldEFycmF5VThGcm9tV2FzbTAocjAsIHIxKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShyMCwgcjEgKiAxKTtcbiAgICAgICAgcmV0dXJuIHYwO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBsb2FkKG1vZHVsZSwgaW1wb3J0cykge1xuICAgIGlmICh0eXBlb2YgUmVzcG9uc2UgPT09ICdmdW5jdGlvbicgJiYgbW9kdWxlIGluc3RhbmNlb2YgUmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcobW9kdWxlLCBpbXBvcnRzKTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAobW9kdWxlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSAhPSAnYXBwbGljYXRpb24vd2FzbScpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nYCBmYWlsZWQgYmVjYXVzZSB5b3VyIHNlcnZlciBkb2VzIG5vdCBzZXJ2ZSB3YXNtIHdpdGggYGFwcGxpY2F0aW9uL3dhc21gIE1JTUUgdHlwZS4gRmFsbGluZyBiYWNrIHRvIGBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZWAgd2hpY2ggaXMgc2xvd2VyLiBPcmlnaW5hbCBlcnJvcjpcXG5cIiwgZSk7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGJ5dGVzID0gYXdhaXQgbW9kdWxlLmFycmF5QnVmZmVyKCk7XG4gICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShieXRlcywgaW1wb3J0cyk7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgaW1wb3J0cyk7XG5cbiAgICAgICAgaWYgKGluc3RhbmNlIGluc3RhbmNlb2YgV2ViQXNzZW1ibHkuSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGluc3RhbmNlLCBtb2R1bGUgfTtcblxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0KGlucHV0KSB7XG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaW5wdXQgPSBuZXcgVVJMKCdzaW5ncmF0X2JnLndhc20nLCBpbXBvcnQubWV0YS51cmwpO1xuICAgIH1cbiAgICBjb25zdCBpbXBvcnRzID0ge307XG5cblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnIHx8ICh0eXBlb2YgUmVxdWVzdCA9PT0gJ2Z1bmN0aW9uJyAmJiBpbnB1dCBpbnN0YW5jZW9mIFJlcXVlc3QpIHx8ICh0eXBlb2YgVVJMID09PSAnZnVuY3Rpb24nICYmIGlucHV0IGluc3RhbmNlb2YgVVJMKSkge1xuICAgICAgICBpbnB1dCA9IGZldGNoKGlucHV0KTtcbiAgICB9XG5cblxuIFxuICAgIGNvbnN0IHsgaW5zdGFuY2UsIG1vZHVsZSB9ID0gYXdhaXQgbG9hZChhd2FpdCBpbnB1dCwgaW1wb3J0cyk7XG5cbiAgICB3YXNtID0gaW5zdGFuY2UuZXhwb3J0cztcbiAgICBpbml0Ll9fd2JpbmRnZW5fd2FzbV9tb2R1bGUgPSBtb2R1bGU7XG5cbiAgICByZXR1cm4gd2FzbTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgaW5pdDtcblxuIiwiaW1wb3J0IHsgU2hhcGUsT3B0cyxTdHlsZSxuYW1lU3R5bGUgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCc7XG5pbXBvcnQgKiBhcyBTRyBmcm9tICcuLi8uLi9zdGF0aWMvcGtnL3NpbmdyYXQnXG5pbXBvcnQgKiBhcyBUSU1FIGZyb20gJy4uL1RpbWUvdGltZSdcblxuaW50ZXJmYWNlIEdyYXRpbmdTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIHBpeGVsc1BlckRlZ3JlZT86IG51bWJlciwgXG4gICAgc3BhdGlhbEZyZXF1ZW5jeT86IG51bWJlcixcbiAgICBhbmdsZT86IG51bWJlciwgXG4gICAgY29udHJhc3Q/OiBudW1iZXIsIFxuICAgIHBoYXNlPzogbnVtYmVyLFxuICAgIGxldmVsPzogbnVtYmVyLFxuICAgIGdhbW1hPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JhdGluZ09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHdhc206IHN0cmluZyxcbiAgICBzaGFwZTogR3JhdGluZ1NoYXBlLFxuICAgIHN0eWxlPzogU3R5bGUsXG4gICAgaXNOb2lzZT86IGJvb2xlYW5cbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBzaW5HcmF0aW5nIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJzaW5ncmF0aW5nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgd2FzbTogc3RyaW5nO1xuICAgIHBhcmFtOiBVaW50OEFycmF5O1xuICAgIHdpZHRoOiBudW1iZXI7XG4gICAgc2luR3JhdDogSW1hZ2VEYXRhOyAgICAgICAgLy/lhYnmoIXlm77niYfmlbDmja5cbiAgICBpbWdEYXRhTGlzdDogQXJyYXk8SW1hZ2VEYXRhPjsgICAgLy/nlKjkuo7lgqjlrZjlj4LkuI7liqjnlLvnmoTlm77niYdcbiAgICBpc05vaXNlOiBib29sZWFuO1xuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEdyYXRpbmdPcHRzKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHg7XG4gICAgICAgIHRoaXMud2FzbSA9IG9wdHMud2FzbTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGU7XG4gICAgICAgIHRoaXMud2lkdGggPSAyKihzaC5yLzIrc2gucikrMTtcbiAgICAgICAgdGhpcy5zaW5HcmF0ID0gbmV3IEltYWdlRGF0YSh0aGlzLndpZHRoLHRoaXMud2lkdGgpO1xuICAgICAgICB0aGlzLmltZ0RhdGFMaXN0ID0gbmV3IEFycmF5PEltYWdlRGF0YT4oKTtcbiAgICAgICAgdGhpcy5pc05vaXNlID0gb3B0cy5pc05vaXNlO1xuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLmlzTm9pc2UpXG4gICAgICAgIFxuICAgICAgICBuYW1lSWQrKztcbiAgICB9XG4gICAgZHJhdygpe1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlO1xuICAgICAgICAvLyByZWFkV2FzbSh0aGlzLndhc20pLnRoZW4od2FzbSA9PiB7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcih3YXNtKTtcbiAgICAgICAgLy8gICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xuICAgICAgICAvLyAgICAgd2FzbS5wcmVfc2luZ3JhdChyZXRwdHIsIHNoLnIsIHNoLnBpeGVsc1BlckRlZ3JlZSwgc2guc3BhdGlhbEZyZXF1ZW5jeSwgc2guYW5nbGUsIHNoLmNvbnRyYXN0LCBzaC5waGFzZSwgc2guZ2FtbWEpO1xuICAgICAgICAvLyAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKHdhc20pW3JldHB0ciAvIDQgKyAwXTtcbiAgICAgICAgLy8gICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCh3YXNtKVtyZXRwdHIgLyA0ICsgMV07XG4gICAgICAgIC8vICAgICB2YXIgdjAgPSBnZXRBcnJheVU4RnJvbVdhc20wKHIwLCByMSwgd2FzbSkuc2xpY2UoKTtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKHYwKVxuICAgICAgICAvLyAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocjAsIHIxICogMSk7XG4gICAgICAgIC8vICAgICB0aGlzLnBhcmFtID0gdjA7XG4gICAgICAgIC8vICAgICAvLyBpZih0aGlzLmlzTm9pc2UpXG4gICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5wYXJhbSA9IFNHLnByZV9ub2lzZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2Usc2gubGV2ZWwsc2guZ2FtbWEpO1xuICAgICAgICAvLyAgICAgLy8gZWxzZVxuICAgICAgICAvLyAgICAgLy8gICAgIHRoaXMucGFyYW0gPSBTRy5wcmVfc2luZ3JhdChzaC5yLHNoLnBpeGVsc1BlckRlZ3JlZSxzaC5zcGF0aWFsRnJlcXVlbmN5LHNoLmFuZ2xlLHNoLmNvbnRyYXN0LHNoLnBoYXNlLHNoLmdhbW1hKTtcbiAgICAgICAgLy8gICAgIHRoaXMuc2luR3JhdC5kYXRhLnNldCh0aGlzLnBhcmFtKTtcbiAgICAgICAgLy8gICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLnNpbkdyYXQsc2gueC0xLjUqc2gucixzaC55LTEuNSpzaC5yKVxuICAgICAgICAvLyB9KTtcbiAgICAgICAgU0cuZGVmYXVsdCh0aGlzLndhc20pXG4gICAgICAgIC50aGVuKCgpPT57XG4gICAgICAgICAgICAvLyBsZXQgdDAgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodDApXG4gICAgICAgICAgICBpZih0aGlzLmlzTm9pc2UpXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbSA9IFNHLnByZV9ub2lzZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2Usc2gubGV2ZWwsc2guZ2FtbWEpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHRoaXMucGFyYW0gPSBTRy5wcmVfc2luZ3JhdChzaC5yLHNoLnBpeGVsc1BlckRlZ3JlZSxzaC5zcGF0aWFsRnJlcXVlbmN5LHNoLmFuZ2xlLHNoLmNvbnRyYXN0LHNoLnBoYXNlLHNoLmdhbW1hKTtcbiAgICAgICAgICAgIHRoaXMuc2luR3JhdC5kYXRhLnNldCh0aGlzLnBhcmFtKTtcbiAgICAgICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLnNpbkdyYXQsc2gueC0xLjUqc2gucixzaC55LTEuNSpzaC5yKVxuICAgICAgICAgICAgY29uc29sZS5kaXIoXCJzdWNjZXNzXCIpXG4gICAgICAgICAgICAvLyBsZXQgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHQxKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHQxLXQwKTtcbiAgICAgICAgfSlcbiAgICB9XG4gICAgcGxheSh0aW1lRnJlcXVlbmN5LHRpbWUsZnBzKXtcbiAgICAgICAgaWYoIXRpbWVGcmVxdWVuY3kpXG4gICAgICAgICAgICB0aW1lRnJlcXVlbmN5ID0gMTtcbiAgICAgICAgaWYoIXRpbWUpXG4gICAgICAgICAgICB0aW1lID0gMTAwMFxuICAgICAgICBpZighZnBzKVxuICAgICAgICAgICAgZnBzID0gNjA7XG4gICAgICAgIGxldCBpbnRlcnZhbCA9IDIqTWF0aC5QSSp0aW1lRnJlcXVlbmN5L2ZwcztcbiAgICAgICAgbGV0IGZwc051bSA9IE1hdGguZmxvb3IodGltZS8xMDAwICogZnBzKTtcbiAgICAgICAgbGV0IGluZGV4ID0gMDtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZTtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBTRy5kZWZhdWx0KHRoaXMud2FzbSlcbiAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0MClcbiAgICAgICAgICAgIGlmKHRoaXMuaXNOb2lzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBmcHM7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IFNHLnByZV9ub2lzZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2UraSppbnRlcnZhbCxzaC5sZXZlbCxzaC5nYW1tYSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWdEYXRhID0gbmV3IEltYWdlRGF0YShuZXcgVWludDhDbGFtcGVkQXJyYXkoaW1nKSx0aGlzLndpZHRoLHRoaXMud2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1nRGF0YUxpc3QucHVzaChpbWdEYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZnBzO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWcgPSBTRy5wcmVfc2luZ3JhdChzaC5yLHNoLnBpeGVsc1BlckRlZ3JlZSxzaC5zcGF0aWFsRnJlcXVlbmN5LHNoLmFuZ2xlLHNoLmNvbnRyYXN0LHNoLnBoYXNlK2kqaW50ZXJ2YWwsc2guZ2FtbWEpO1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nRGF0YSA9IG5ldyBJbWFnZURhdGEobmV3IFVpbnQ4Q2xhbXBlZEFycmF5KGltZyksdGhpcy53aWR0aCx0aGlzLndpZHRoKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmltZ0RhdGFMaXN0LnB1c2goaW1nRGF0YSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBsZXQgdDEgPSBwZXJmb3JtYW5jZS5ub3coKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHQxKTtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHQxLXQwKTtcbiAgICAgICAgICAgIChhc3luYyAoKT0+e1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGZwc051bTtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGkgJSBmcHM7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuY3R4LnB1dEltYWdlRGF0YSh0aGF0LmltZ0RhdGFMaXN0W2luZGV4XSxzaC54LTEuNSpzaC5yLHNoLnktMS41KnNoLnIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBUSU1FLmRlbGF5X2ZyYW1lKDEpO1xuICAgICAgICAgICAgICAgICAgICB0aGF0LnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKClcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIHJlYWRXYXNtKHdhc20pe1xuLy8gICAgIGNvbnNvbGUuZGlyKCdzdWNlZXNzIScpO1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9Pntcbi8vICAgICAgICAgZmV0Y2god2FzbSkudGhlbihyZXMgPT5cbi8vICAgICAgICAgICAgIHJlcy5hcnJheUJ1ZmZlcigpXG4vLyAgICAgICAgICkudGhlbihieXRlcyA9PiBcbi8vICAgICAgICAgICAgIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ5dGVzLCB7fSlcbi8vICAgICAgICAgKS50aGVuKHJlc3VsdCA9Pntcbi8vICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlc3VsdCk7XG4vLyAgICAgICAgICAgICBsZXQgd2FzbSA9IHJlc3VsdC5pbnN0YW5jZS5leHBvcnRzO1xuLy8gICAgICAgICAgICAgcmVzKHdhc20pO1xuLy8gICAgICAgICB9KVxuLy8gICAgIH0pXG4gICAgXG4vLyB9XG5cblxuLy8gbGV0IGNhY2hlZ2V0SW50MzJNZW1vcnkwID0gbnVsbDtcbi8vIGZ1bmN0aW9uIGdldEludDMyTWVtb3J5MCh3YXNtKSB7XG4vLyAgICAgaWYgKGNhY2hlZ2V0SW50MzJNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZ2V0SW50MzJNZW1vcnkwLmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4vLyAgICAgICAgIGNhY2hlZ2V0SW50MzJNZW1vcnkwID0gbmV3IEludDMyQXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbi8vICAgICB9XG4vLyAgICAgcmV0dXJuIGNhY2hlZ2V0SW50MzJNZW1vcnkwO1xuLy8gfVxuXG4vLyBsZXQgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBudWxsO1xuLy8gZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKHdhc20pIHtcbi8vICAgICBpZiAoY2FjaGVnZXRVaW50OE1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVnZXRVaW50OE1lbW9yeTAuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbi8vICAgICAgICAgY2FjaGVnZXRVaW50OE1lbW9yeTAgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gY2FjaGVnZXRVaW50OE1lbW9yeTA7XG4vLyB9XG5cbi8vIGZ1bmN0aW9uIGdldEFycmF5VThGcm9tV2FzbTAocHRyLCBsZW4sIHdhc20pIHtcbi8vICAgICByZXR1cm4gZ2V0VWludDhNZW1vcnkwKHdhc20pLnN1YmFycmF5KHB0ciAvIDEsIHB0ciAvIDEgKyBsZW4pO1xuLy8gfSIsImltcG9ydCB7IENpcmNsZSwgbWFrZUNpcmNsZSB9IGZyb20gJy4uL0dyYXBoaWMvY2lyY2xlJ1xuaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IGRlbGF5X2ZyYW1lIH0gZnJvbSAnLi4vVGltZS90aW1lJ1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIlxuXG5pbnRlcmZhY2UgUmFuZG9tRG90U2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBtYXNrQmFuZD86IG51bWJlcixcbiAgICBudW1iZXI/OiBudW1iZXIsXG4gICAgbWF4U3BlZWQ/OiBudW1iZXIsXG4gICAgbWluU3BlZWQ/OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyXG59XG5cbmludGVyZmFjZSBSYW5kb21Eb3RPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUmFuZG9tRG90U2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgUmFuZG9tRG90IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJyYW5kb21Eb3RcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBkZWNsYXJlIHNoYXBlPzogUmFuZG9tRG90U2hhcGVcbiAgICBSYW5kb21Eb3RBcnJheTogQXJyYXk8Q2lyY2xlPlxuICAgIG1hc2tCYW5kOiBDaXJjbGVcbiAgICB0cmFuc2xhdGlvbjogQXJyYXk8UG9pbnQ+XG4gICAgY29uc3RydWN0b3Iob3B0czogUmFuZG9tRG90T3B0cyl7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eDtcbiAgICAgICAgaWYoIXRoaXMuc2hhcGUubWFza0JhbmQpXG4gICAgICAgICAgICB0aGlzLnNoYXBlLm1hc2tCYW5kID0gODtcbiAgICAgICAgaWYoIXRoaXMuc2hhcGUubnVtYmVyKVxuICAgICAgICAgICAgdGhpcy5zaGFwZS5udW1iZXIgPSAxMDtcbiAgICAgICAgaWYoIXRoaXMuc2hhcGUubWF4U3BlZWQpXG4gICAgICAgICAgICB0aGlzLnNoYXBlLm1heFNwZWVkID0gNTtcbiAgICAgICAgaWYoIXRoaXMuc2hhcGUubWluU3BlZWQpXG4gICAgICAgICAgICB0aGlzLnNoYXBlLm1pblNwZWVkID0gMDtcblxuICAgICAgICAvLyB0aGlzLm1hc2tCYW5kID0gbmV3IEFycmF5KCk7XG5cbiAgICAgICAgdGhpcy5SYW5kb21Eb3RBcnJheSA9IHJhbmRvbWlzZWRQb2ludCh0aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS5tYXNrQmFuZCx0aGlzLnNoYXBlLm51bWJlcik7XG5cbiAgICAgICAgdGhpcy5tYXNrQmFuZCA9IG5ldyBDaXJjbGUoe1xuICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICB4OiB0aGlzLnNoYXBlLngsXG4gICAgICAgICAgICAgICAgeTogdGhpcy5zaGFwZS55LFxuICAgICAgICAgICAgICAgIHI6IHRoaXMuc2hhcGUuclxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogJyNmZmZmZmYnLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjODg4ODg4XCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiB0aGlzLnNoYXBlLm1hc2tCYW5kXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIC8vIHRoaXMubWFza0JhbmRbMV0gPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgLy8gICAgIHNoYXBlOiB7XG4gICAgICAgIC8vICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAvLyAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgLy8gICAgICAgICByOiB0aGlzLnNoYXBlLnIrdGhpcy5zaGFwZS5tYXNrQmFuZC8yXG4gICAgICAgIC8vICAgICB9LFxuICAgICAgICAvLyAgICAgc3R5bGU6IHtcbiAgICAgICAgLy8gICAgICAgICBzdHJva2U6IFwiIzg4ODg4OFwiLFxuICAgICAgICAvLyAgICAgICAgIGxpbmVXaWR0aDogdGhpcy5zaGFwZS5tYXNrQmFuZFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIHRoaXMudHJhbnNsYXRpb24gPSBnZXRSYW5kb20odGhpcy5zaGFwZS5tYXhTcGVlZCx0aGlzLnNoYXBlLm1pblNwZWVkLHRoaXMuc2hhcGUubnVtYmVyKTtcblxuICAgICAgICB0aGlzLklzQW5pbWF0aW9uID0gdHJ1ZTtcblxuICAgICAgICBuYW1lSWQrKztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwbGF5UmFuZG9tRG90KHJhbmRvbURvdDogUmFuZG9tRG90LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICByYW5kb21Eb3QuY3R4ID0gY3R4O1xuXG4gICAgbGV0IHNoID0gcmFuZG9tRG90LnNoYXBlO1xuXG4gICAgLy8gbWFrZUNpcmNsZShyYW5kb21Eb3QubWFza0JhbmRbMF0sY3R4KTtcbiAgICAvLyBtYWtlQ2lyY2xlKHJhbmRvbURvdC5tYXNrQmFuZFsxXSxjdHgpO1xuXG4gICAgbGV0IGY6QXJyYXk8bnVtYmVyPiA9IG5ldyBBcnJheSgpO1xuICAgIGxldCB0cmFuczpBcnJheTxQb2ludD4gPSBuZXcgQXJyYXkoKTtcblxuICAgIGZvcihsZXQgaSA9IDA7aSA8IHNoLm51bWJlcjtpKyspXG4gICAge1xuICAgICAgICBmLnB1c2goMSk7XG4gICAgICAgIHRyYW5zLnB1c2goe3g6cmFuZG9tRG90LnRyYW5zbGF0aW9uW2ldLngseTpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueX0pO1xuICAgIH1cblxuICAgIHJhbmRvbURvdC5tYXNrQmFuZC5jdHggPSBjdHg7XG5cbiAgICBmb3IobGV0IGkgPSAwO2kgPCByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXkubGVuZ3RoO2krKylcbiAgICAgICAgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLmN0eCA9IGN0eDtcblxuICAgIChhc3luYyAoKT0+e1xuICAgICAgICB3aGlsZShyYW5kb21Eb3QuSXNBbmltYXRpb24pe1xuICAgICAgICAgICAgcmFuZG9tQW5pbm1hdGlvbihyYW5kb21Eb3Qsc2gsdHJhbnMsZik7XG4gICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxKTtcbiAgICAgICAgICAgIHJhbmRvbURvdC5yZW1vdmUoKTtcbiAgICAgICAgICAgIHJhbmRvbURvdC5zdG9yYWdlLnB1c2gocmFuZG9tRG90KTtcbiAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHJhbmRvbURvdC5tYXNrQmFuZCxjdHgpO1xuICAgICAgICAgICAgZm9yKGxldCBpbmRleCA9IDA7aW5kZXggPCByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXkubGVuZ3RoO2luZGV4KyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2luZGV4XS5jdHggPSBjdHg7XG4gICAgICAgICAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQocmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2luZGV4XSxjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KSgpXG5cbiAgICAvLyByYW5kb21Eb3QuYW5pbWF0ZSgoKT0+e1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBzaC5udW1iZXI7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBsZXQgeCA9IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5zaGFwZS54K3RyYW5zW2ldLng7XG4gICAgLy8gICAgICAgICBsZXQgeSA9IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5zaGFwZS55K3RyYW5zW2ldLnk7XG5cbiAgICAvLyAgICAgICAgIGlmKChNYXRoLnBvdyh4LXNoLngsMikrTWF0aC5wb3coeS1zaC55LDIpKSA+PSBNYXRoLnBvdyhzaC5yLXNoLm1hc2tCYW5kLDIpKVxuICAgIC8vICAgICAgICAgICAgIGZbaV0gKj0gKC0xKTtcblxuICAgIC8vICAgICAgICAgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLnRyYW5zbGF0ZSA9IHtcbiAgICAvLyAgICAgICAgICAgICB4OiB0cmFuc1tpXS54LFxuICAgIC8vICAgICAgICAgICAgIHk6IHRyYW5zW2ldLnlcbiAgICAvLyAgICAgICAgIH1cblxuICAgIC8vICAgICAgICAgdHJhbnNbaV0ueCA9IHRyYW5zW2ldLnggKyBmW2ldKnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS54O1xuICAgIC8vICAgICAgICAgdHJhbnNbaV0ueSA9IHRyYW5zW2ldLnkgKyBmW2ldKnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS55O1xuXG4gICAgLy8gICAgIH1cbiAgICAvLyB9LDEpO1xuICAgIFxufVxuXG5sZXQgcmFuZG9tQW5pbm1hdGlvbiA9IChyYW5kb21Eb3Q6IFJhbmRvbURvdCxzaDogUmFuZG9tRG90U2hhcGUsdHJhbnM6IEFycmF5PFBvaW50PixmOkFycmF5PG51bWJlcj4pID0+e1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHNoLm51bWJlcjtpKyspXG4gICAge1xuICAgICAgICBsZXQgeCA9IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5zaGFwZS54K3RyYW5zW2ldLng7XG4gICAgICAgIGxldCB5ID0gcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLnNoYXBlLnkrdHJhbnNbaV0ueTtcblxuICAgICAgICBpZigoTWF0aC5wb3coeC1zaC54LDIpK01hdGgucG93KHktc2gueSwyKSkgPj0gTWF0aC5wb3coc2guci1zaC5tYXNrQmFuZCwyKSlcbiAgICAgICAgICAgIGZbaV0gKj0gKC0xKTtcblxuICAgICAgICByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0udHJhbnNsYXRlID0ge1xuICAgICAgICAgICAgeDogdHJhbnNbaV0ueCxcbiAgICAgICAgICAgIHk6IHRyYW5zW2ldLnlcbiAgICAgICAgfVxuXG4gICAgICAgIHRyYW5zW2ldLnggPSB0cmFuc1tpXS54ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueDtcbiAgICAgICAgdHJhbnNbaV0ueSA9IHRyYW5zW2ldLnkgKyBmW2ldKnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS55O1xuXG4gICAgfVxufVxuXG4vLyBmdW5jdGlvbiByYW5kb21BbmltYXRpb24ocmFuZG9tRG90OiBSYW5kb21Eb3Qpe1xuLy8gICAgIGxldCBzaCA9IHJhbmRvbURvdC5zaGFwZTtcblxuLy8gICAgIGxldCBmID0gbmV3IEFycmF5KCk7XG4vLyAgICAgbGV0IHRyYW5zID0gbmV3IEFycmF5KCk7XG5cbi8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBzaC5udW1iZXI7aSsrKVxuLy8gICAgIHtcbi8vICAgICAgICAgZi5wdXNoKDEpO1xuLy8gICAgICAgICB0cmFucy5wdXNoKHt4OnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS54LHk6cmFuZG9tRG90LnRyYW5zbGF0aW9uW2ldLnl9KTtcbi8vICAgICB9XG4gICAgXG4vLyAgICAgZm9yKGxldCBpID0gMDtpIDwgc2gubnVtYmVyO2krKylcbi8vICAgICB7XG4vLyAgICAgICAgIGxldCB4ID0gcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLnNoYXBlLngrdHJhbnNbaV0ueDtcbi8vICAgICAgICAgbGV0IHkgPSByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0uc2hhcGUueSt0cmFuc1tpXS55O1xuXG4vLyAgICAgICAgIGlmKChNYXRoLnBvdyh4LXNoLngsMikrTWF0aC5wb3coeS1zaC55LDIpKSA+PSBNYXRoLnBvdyhzaC5yLXNoLm1hc2tCYW5kLDIpKVxuLy8gICAgICAgICAgICAgZltpXSAqPSAoLTEpO1xuXG4vLyAgICAgICAgIHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS50cmFuc2xhdGUgPSB7XG4vLyAgICAgICAgICAgICB4OiB0cmFuc1tpXS54LFxuLy8gICAgICAgICAgICAgeTogdHJhbnNbaV0ueVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gY29uc29sZS5kaXIoZltpXSp0cmFuc2xhdGVYW2ldKVxuXG4vLyAgICAgICAgIHRyYW5zW2ldLnggPSB0cmFuc1tpXS54ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueDtcbi8vICAgICAgICAgdHJhbnNbaV0ueSA9IHRyYW5zW2ldLnkgKyBmW2ldKnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS55O1xuXG4vLyAgICAgfVxuLy8gfVxuXG5mdW5jdGlvbiByYW5kb21pc2VkUG9pbnQocmFkaXVzOm51bWJlcixtYXNrQmFuZDpudW1iZXIsbnVtYmVyOm51bWJlcik6QXJyYXk8Q2lyY2xlPntcbiAgICBsZXQgYXJyID0gZ2V0Tm9uUmVwZXRpdGl2ZVJhbmRvbShyYWRpdXMtbWFza0JhbmQscmFkaXVzLG51bWJlcik7XG4gICAgbGV0IGRvdCA9IG5ldyBBcnJheSgpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IG51bWJlcjtpKyspXG4gICAge1xuICAgICAgICBkb3RbaV0gPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogYXJyW2ldLngsXG4gICAgICAgICAgICAgICAgeTogYXJyW2ldLnksXG4gICAgICAgICAgICAgICAgcjogMlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCIjMDAwMDAwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG4gICAgcmV0dXJuIGRvdDtcbn1cblxuZnVuY3Rpb24gZG90QXJlYShyOm51bWJlcixyYWRpdXM6bnVtYmVyKTpBcnJheTxQb2ludD57XG4gICAgbGV0IGFycjpBcnJheTxQb2ludD4gPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCAyKnI7aSsrKVxuICAgIHtcbiAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgMipyO2orKylcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHIyID0gTWF0aC5wb3coaS1yYWRpdXMsMikgKyBNYXRoLnBvdyhqLXJhZGl1cywyKVxuICAgICAgICAgICAgaWYocjIgPD0gTWF0aC5wb3cociwyKSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhcnIucHVzaCh7eDppLHk6an0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uUmVwZXRpdGl2ZVJhbmRvbShyOm51bWJlcixyYWRpdXM6bnVtYmVyLG51bWJlcjpudW1iZXIpOkFycmF5PFBvaW50PntcbiAgICBsZXQgYXJyOkFycmF5PFBvaW50PiA9IG5ldyBBcnJheSgpO1xuXG4gICAgbGV0IHRlbXBsYXRlID0gZG90QXJlYShyLHJhZGl1cyk7XG5cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1iZXI7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IGluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnRlbXBsYXRlLmxlbmd0aCk7XG4gICAgICAgIGFyci5wdXNoKHRlbXBsYXRlW2luZGV4XSk7XG4gICAgICAgIHRlbXBsYXRlLnNwbGljZShpbmRleCwxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBnZXRSYW5kb20obWF4U3BlZWQ6bnVtYmVyLG1pblNwZWVkOm51bWJlcixudW1iZXI6bnVtYmVyKTpBcnJheTxQb2ludD57XG4gICAgbGV0IGFycjpBcnJheTxQb2ludD4gPSBuZXcgQXJyYXkoKTtcblxuICAgIGZvcihsZXQgaSA9IDA7aSA8IG51bWJlcjtpKyspXG4gICAge1xuICAgICAgICBsZXQgeCA9IHNldFJhbmRvbShtYXhTcGVlZCxtaW5TcGVlZCk7XG4gICAgICAgIGxldCB5ID0gc2V0UmFuZG9tKG1heFNwZWVkLG1pblNwZWVkKTtcbiAgICAgICAgYXJyLnB1c2goe3g6eCx5Onl9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyO1xufVxuXG5mdW5jdGlvbiBzZXRSYW5kb20obWF4U3BlZWQ6bnVtYmVyLG1pblNwZWVkOm51bWJlcik6bnVtYmVye1xuICAgIGxldCBudW0gPSBNYXRoLnJhbmRvbSgpKihtYXhTcGVlZC1taW5TcGVlZCkgKyBtaW5TcGVlZDtcbiAgICBsZXQgc2lnbkYgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpO1xuICAgIGxldCBzaWduID0gMDtcbiAgICBpZihzaWduRilcbiAgICAgICAgc2lnbiA9IDE7XG4gICAgZWxzZVxuICAgICAgICBzaWduID0gLTE7XG4gICAgbnVtICo9IHNpZ247XG4gICAgcmV0dXJuIG51bTtcbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBkZWxheV9mcmFtZSB9IGZyb20gXCIuLi9UaW1lL3RpbWVcIjtcbmltcG9ydCB7IFNoYXBlLE9wdHMsbmFtZVN0eWxlLFN0eWxlIH0gZnJvbSBcIi4uL0RhdGFUeXBlL2RhdGFUeXBlXCI7XG5cblxuaW50ZXJmYWNlIEdyYXRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIHBpeGVsc1BlckRlZ3JlZT86IG51bWJlciwgXG4gICAgc3BhdGlhbEZyZXF1ZW5jeT86IG51bWJlcixcbiAgICBhbmdsZT86IG51bWJlciwgXG4gICAgY29udHJhc3Q/OiBudW1iZXIsIFxuICAgIHBoYXNlPzogbnVtYmVyLFxuICAgIGxldmVsPzogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR3JhdE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBHcmF0U2hhcGUsXG4gICAgc3R5bGU/OiBTdHlsZSxcbiAgICBpc05vaXNlPzogYm9vbGVhblxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuLy/lhYnmoIVcbi8vcGl4ZWxzUGVyRGVncmVlPTU3LCBzcGF0aWFsRnJlcXVlbmN5PTEg5a+55bqU5LiA5bqm6KeG6KeSXG5leHBvcnQgY2xhc3Mgc2luR3JhdCBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwic2luZ3JhdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIHNpbkdyYXQ6IEltYWdlRGF0YTsgICAgICAgIC8v5YWJ5qCF5Zu+54mH5pWw5o2uXG4gICAgaW1nRGF0YUxpc3Q6IEFycmF5PEltYWdlRGF0YT47ICAgIC8v55So5LqO5YKo5a2Y5Y+C5LiO5Yqo55S755qE5Zu+54mHXG4gICAgaXNOb2lzZTogYm9vbGVhbjtcbiAgICAvLyBzaW5ncmF0UGFyYW07ICAgLy/nlKjkuo7lgqjlrZgg5bem5LiK6KeS5Z2Q5qCHLCDljYrlvoQsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwg6KeS5bqmLCDlr7nmr5TluqYsIOebuOS9jeetieS/oeaBr1xuICAgIC8vIGxldmVsOyAgICAgICAgICAvL+WZquWjsOetiee6pyjmraTnsbvlnovpu5jorqTkuLowKVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEdyYXRPcHRzKXtcbiAgICAgICAgLy94LHnkuLrlhYnmoIXnmoTlt6bkuIrop5LlnZDmoIcsIOWNiuW+hCwgcGl4ZWxzUGVyRGVncmVlLCBzcGF0aWFsRnJlcXVlbmN5LCDop5LluqYsIOWvueavlOW6piwg55u45L2NXG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlO1xuICAgICAgICBpZighb3B0cy5pc05vaXNlKVxuICAgICAgICAgICAgdGhpcy5pc05vaXNlID0gZmFsc2VcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5pc05vaXNlID0gb3B0cy5pc05vaXNlXG4gICAgICAgIFxuICAgICAgICBpZighdGhpcy5pc05vaXNlKVxuICAgICAgICAgICAgdGhpcy5zaW5HcmF0ID0gZ2V0U2luZ3JhdChzaC5yLCBzaC5waXhlbHNQZXJEZWdyZWUsIHNoLnNwYXRpYWxGcmVxdWVuY3ksIHNoLmFuZ2xlLCBzaC5jb250cmFzdCwgc2gucGhhc2UpXG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBpZighc2gubGV2ZWwpXG4gICAgICAgICAgICAgICAgc2gubGV2ZWwgPSAxXG4gICAgICAgICAgICB0aGlzLnNpbkdyYXQgPSBnZXROb2lzZVNpbmdyYXQoc2guciwgc2gucGl4ZWxzUGVyRGVncmVlLCBzaC5zcGF0aWFsRnJlcXVlbmN5LCBzaC5hbmdsZSwgc2guY29udHJhc3QsIHNoLnBoYXNlLCBzaC5sZXZlbCkgICAgXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbWdEYXRhTGlzdCA9IG5ldyBBcnJheTxJbWFnZURhdGE+KCk7XG4gICAgICAgIG5hbWVJZCsrO1xuICAgIH1cbiAgICAvL+e7mOWItuaWueazlSwg5Y+C5pWwY3R45Li6Y2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBkcmF3KCl7XG4gICAgICAgIHRoaXMuY3R4LnB1dEltYWdlRGF0YSh0aGlzLnNpbkdyYXQsdGhpcy5zaGFwZS54IC0gMi41ICogdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSAtIDIuNSAqIHRoaXMuc2hhcGUucilcbiAgICB9XG4gICAgLy/nu5nljp/mnInlhYnmoIXliqDkuIrlmarlo7AsIOWPguaVsGxldmVs5Li65Zmq5aOw562J57qnXG4gICAgaW1Ob2lzZShsZXZlbCl7XG4gICAgICAgIGxldCB0aCA9IHRoaXMuc2hhcGVcbiAgICAgICAgdGhpcy5pc05vaXNlID0gdHJ1ZVxuICAgICAgICB0aGlzLnNpbkdyYXQgPSBnZXROb2lzZVNpbmdyYXQodGguciwgdGgucGl4ZWxzUGVyRGVncmVlLCB0aC5zcGF0aWFsRnJlcXVlbmN5LCB0aC5hbmdsZSwgdGguY29udHJhc3QsIHRoLnBoYXNlLCBsZXZlbClcbiAgICAgICAgdGgubGV2ZWwgPSBsZXZlbDtcbiAgICB9XG4gICAgLy/ov5Dliqjmlrnms5UsIOWPguaVsGN0eOS4umNhbnZhcy5nZXRDb250ZXh0KCcyZCcpIOWPguaVsGN5Y2xl5Li65q+P56eS6L+Q6KGM5YWJ5qCF55qE5ZGo5pyf5pWwKOm7mOiupOS4ujEpXG4gICAgcGxheSh0aW1lRnJlcXVlbmN5LHRpbWUpe1xuICAgICAgICBpZighdGltZUZyZXF1ZW5jeSlcbiAgICAgICAgICAgIHRpbWVGcmVxdWVuY3kgPSAxO1xuICAgICAgICBpZighdGltZSlcbiAgICAgICAgICAgIHRpbWUgPSAxMDAwO1xuICAgICAgICBsZXQgZnBzID0gNjA7XG4gICAgICAgIGxldCBmcHNudW0gPSBNYXRoLmZsb29yKHRpbWUvMTAwMCAqIGZwcyk7XG4gICAgICAgIGxldCBpbnRlcnZhbCA9IDIqTWF0aC5QSSp0aW1lRnJlcXVlbmN5L2ZwcztcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIC8vIGxldCBudW0gPSBNYXRoLmZsb29yKDYwL3RpbWVGcmVxdWVuY3kpO1xuICAgICAgICBsZXQgdGggPSB0aGlzLnNoYXBlXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGZwcztpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNOb2lzZSlcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0RhdGFMaXN0LnB1c2goZ2V0Tm9pc2VTaW5ncmF0KHRoLnIsIHRoLnBpeGVsc1BlckRlZ3JlZSwgdGguc3BhdGlhbEZyZXF1ZW5jeSwgdGguYW5nbGUsIHRoLmNvbnRyYXN0LCB0aC5waGFzZStpKmludGVydmFsLCB0aGlzLnNoYXBlLmxldmVsKSlcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB0aGlzLmltZ0RhdGFMaXN0LnB1c2goZ2V0U2luZ3JhdCh0aC5yLCB0aC5waXhlbHNQZXJEZWdyZWUsIHRoLnNwYXRpYWxGcmVxdWVuY3ksIHRoLmFuZ2xlLCB0aC5jb250cmFzdCwgdGgucGhhc2UraSppbnRlcnZhbCkpXG4gICAgICAgIH1cbiAgICAgICAgLy/lvILmraXlh73mlbBcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBmcHNudW07aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGkgPSBpJWZwcztcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBpJWZwcztcbiAgICAgICAgICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKHRoYXQuaW1nRGF0YUxpc3RbaW5kZXhdLHRoYXQuc2hhcGUueCAtIDIuNSAqIHRoYXQuc2hhcGUucix0aGF0LnNoYXBlLnkgLSAyLjUgKiB0aGF0LnNoYXBlLnIpXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodGhhdC5zdG9yYWdlKVxuICAgICAgICAgICAgICAgIGF3YWl0IGRlbGF5X2ZyYW1lKDEpO1xuICAgICAgICAgICAgICAgIHRoYXQuY2xlYXIoY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpICAgIFxuICAgIH1cbiAgICAvL+a4hemZpOWFieagheaJgOWcqOS9jee9rueahOefqeW9ouWMuuWfn1xuICAgIGNsZWFyKGN0eClcbiAgICB7XG4gICAgICAgIGxldCB3aWR0aCA9IDIqKDIuNSp0aGlzLnNoYXBlLnIpKzFcbiAgICAgICAgbGV0IGhlaWdodCA9IDIqKDIuNSp0aGlzLnNoYXBlLnIpKzFcbiAgICAgICAgY3R4LmNsZWFyUmVjdCh0aGlzLnNoYXBlLnggLSAyLjUgKiB0aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55IC0gMi41ICogdGhpcy5zaGFwZS5yLHdpZHRoLGhlaWdodCk7XG4gICAgfVxufVxuXG4vL+eUn+aIkOWZquWjsOWFieaghSwg5Y+C5pWwOiDljYrlvoQsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwg6KeS5bqmLCDlr7nmr5TluqYsIOebuOS9jSwg5Zmq5aOw562J57qnXG4vL+i/lOWbnmltYWdlRGF0YeWbvueJh+S/oeaBr1xuZnVuY3Rpb24gZ2V0Tm9pc2VTaW5ncmF0KHJhZGl1cywgcGl4ZWxzUGVyRGVncmVlLCBzcGF0aWFsRnJlcXVlbmN5LCBhbmdsZSwgY29udHJhc3QsIHBoYXNlLCBsZXZlbClcbntcbiAgICBpZihsZXZlbCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICBsZXZlbCA9IDE7XG4gICAgbGV0IG1hc2tCYW5kID0gMS41ICogcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gsIHldID0gbWVzaGdyaWQoaW1hZ2VzaXplKTtcbiAgICBsZXQgbWFzayA9IG5ldyBBcnJheSgpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHgubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIGxldCBtID0gTWF0aC5wb3coeFtpXSwyKStNYXRoLnBvdyh5W2ldLDIpO1xuICAgICAgICBsZXQgbiA9IE1hdGgucG93KHJhZGl1cywyKTtcbiAgICAgICAgbWFzay5wdXNoKE1hdGguZXhwKC1tL24pKTtcbiAgICAgICAgbWFza1tpXSAqPSBNYXRoLkU7XG4gICAgICAgIGlmKG1hc2tbaV0gPj0gMSlcbiAgICAgICAgICAgIG1hc2tbaV0gPSAxO1xuICAgIH1cbiAgICBsZXQgdyA9IDIgKiBNYXRoLlBJICogc3BhdGlhbEZyZXF1ZW5jeSAvIHBpeGVsc1BlckRlZ3JlZTtcbiAgICBsZXQgYSA9IE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBiID0gTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwKSAqIHc7XG4gICAgbGV0IHBhcmFtID0gbmV3IEFycmF5KCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmFtW2ldID0gMC41ICsgMC41ICogbWFza1tpXSAqIGNvbnRyYXN0ICogTWF0aC5zaW4oYSAqIHhbaV0gKyBiICogeVtpXSArIHBoYXNlKTtcbiAgICB9XG4gICAgbGV0IG5vaXNlID0gZ2V0Tm9pc2UocmFkaXVzKTtcbiAgICBsZXQgbm9pc2VTaW5HcmF0ID0gR3JhdEFkZE5vaXNlKHBhcmFtLG5vaXNlLHJhZGl1cyxsZXZlbCk7XG4gICAgcmV0dXJuIG5vaXNlU2luR3JhdDtcbn1cblxuLy/lhYnmoIXliqDlmarlo7AsIOWPguaVsDog5YWJ5qCF54Gw5bqm5L+h5oGvLCDlmarlo7DngbDluqbkv6Hmga8sIOWNiuW+hCwg5Zmq5aOw562J57qnXG4vL+i/lOWbnmltYWdlRGF0YeWbvueJh+S/oeaBr1xuZnVuY3Rpb24gR3JhdEFkZE5vaXNlKHBhcmFtLG5vaXNlLHJhZGl1cyxsZXZlbCl7XG4gICAgbGV0IGMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICBjLndpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICBjLmhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIGxldCBjdHggPSBjLmdldENvbnRleHQoJzJkJylcbiAgICBsZXQgTm9pc2VHcmF0RGVncmVlID0gbmV3IEFycmF5KClcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IG1hc2tCYW5kID0gMS41ICogcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgTSA9IDIqaW1hZ2VzaXplKzE7XG4gICAgbGV0IE5vaXNlR3JhdCA9IGN0eC5jcmVhdGVJbWFnZURhdGEoTSxNKTtcbiAgICBsZXQgW3gsIHldID0gbWVzaGdyaWQoaW1hZ2VzaXplKTtcbiAgICBsZXQgbWFzayA9IG5ldyBBcnJheSgpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHgubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIGxldCBtID0gTWF0aC5wb3coeFtpXSwyKStNYXRoLnBvdyh5W2ldLDIpO1xuICAgICAgICBsZXQgbiA9IE1hdGgucG93KHJhZGl1cywyKTtcbiAgICAgICAgbWFzay5wdXNoKE1hdGguZXhwKC1tL24pKTtcbiAgICAgICAgbWFza1tpXSAqPSBNYXRoLkU7XG4gICAgICAgIGlmKG1hc2tbaV0gPj0gMSlcbiAgICAgICAgICAgIG1hc2tbaV0gPSAxO1xuICAgIH1cbiAgICAvL+ebuOWKoFxuICAgIGZvcihpID0gMDtpIDwgTSpNO2krKyl7XG4gICAgICAgIGlmKHBhcmFtW2ldPjAuNSlcbiAgICAgICAgICAgIE5vaXNlR3JhdERlZ3JlZVtpXSA9IDAuNStsZXZlbCpub2lzZVtpXVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBOb2lzZUdyYXREZWdyZWVbaV0gPSAocGFyYW1baV0rbGV2ZWwqbm9pc2VbaV0pXG4gICAgICAgICAgICAvLyBOb2lzZUdyYXREZWdyZWVbaV0gPSBOb2lzZUdyYXREZWdyZWVbaV0rMC41Km1hc2tbaV0gXG4gICAgfVxuICAgIGZvciAobGV0IGk9MCxqPTA7aTxOb2lzZUdyYXQuZGF0YS5sZW5ndGg7aSs9NCxqKyspXG4gICAge1xuICAgICAgICBOb2lzZUdyYXQuZGF0YVtpKzBdPU5vaXNlR3JhdERlZ3JlZVtqXSoyNTU7XG4gICAgICAgIE5vaXNlR3JhdC5kYXRhW2krMV09Tm9pc2VHcmF0RGVncmVlW2pdKjI1NTtcbiAgICAgICAgTm9pc2VHcmF0LmRhdGFbaSsyXT1Ob2lzZUdyYXREZWdyZWVbal0qMjU1O1xuICAgICAgICBOb2lzZUdyYXQuZGF0YVtpKzNdPTI1NTtcbiAgICB9XG4gICAgLy8gTm9pc2VHcmF0ID0gVG9DaXJjbGUoTm9pc2VHcmF0LHJhZGl1cylcbiAgICByZXR1cm4gTm9pc2VHcmF0O1xufVxuXG4vL+eUn+aIkOWZquWjsOWbvueJhywg5Y+C5pWwOiDljYrlvoRcbi8v6L+U5Zue5Zmq5aOw54Gw5bqm5pWw57uEXG5mdW5jdGlvbiBnZXROb2lzZShyYWRpdXMpe1xuICAgIGxldCBub2lzZSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgbWFza0JhbmQgPSAxLjUgKiByYWRpdXM7XG4gICAgbGV0IGltYWdlc2l6ZSA9IHJhZGl1cyArIG1hc2tCYW5kO1xuICAgIGxldCBbeCwgeV0gPSBtZXNoZ3JpZChpbWFnZXNpemUpO1xuICAgIGZvcihsZXQgaSA9IDA7aSA8IHgubGVuZ3RoO2krKylcbiAgICB7XG4gICAgICAgIGxldCBtID0gTWF0aC5wb3coeFtpXSwyKStNYXRoLnBvdyh5W2ldLDIpO1xuICAgICAgICBsZXQgbiA9IE1hdGgucG93KHJhZGl1cywyKTtcbiAgICAgICAgbWFzay5wdXNoKE1hdGguZXhwKC1tL24pKTtcbiAgICAgICAgbWFza1tpXSAqPSBNYXRoLkU7XG4gICAgICAgIGlmKG1hc2tbaV0gPj0gMSlcbiAgICAgICAgICAgIG1hc2tbaV0gPSAxO1xuICAgIH1cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBtYXNrLmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgZ3JleURlZ3JlZSA9IG1hc2tbaV0qTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKiAyNTYpLzI1NTtcbiAgICAgICAgbm9pc2UucHVzaChncmV5RGVncmVlKVxuICAgIH1cbiAgICAvLyBmb3IgKGxldCBpPTA7aSA8IDQqKGltYWdlc2l6ZSoyKzEpKihpbWFnZXNpemUqMisxKTtpKz00KVxuICAgIC8vIHtcbiAgICAvLyAgICAgbGV0IGdyZXlEZWdyZWUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqIDI1Nik7IFxuICAgIC8vICAgICBub2lzZS5wdXNoKGdyZXlEZWdyZWUvMjU1KTtcbiAgICAvLyB9XG4gICAgLy8gY29uc29sZS5kaXIobm9pc2UpXG4gICAgcmV0dXJuIG5vaXNlO1xufVxuXG4vL+eUn+aIkOWFieaghSDlj4LmlbA6IOWNiuW+hCwgcGl4ZWxzUGVyRGVncmVlLCBzcGF0aWFsRnJlcXVlbmN5LCDop5LluqYsIOWvueavlOW6piwg55u45L2NXG4vL+i/lOWbnmltYWdlRGF0YeWbvueJh+S/oeaBr1xuZnVuY3Rpb24gZ2V0U2luZ3JhdChyYWRpdXMsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSkge1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgbGV0IG1hc2tCYW5kID0gMS41ICogcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gsIHldID0gbWVzaGdyaWQoaW1hZ2VzaXplKTtcbiAgICBsZXQgdyA9IDIgKiBNYXRoLlBJICogc3BhdGlhbEZyZXF1ZW5jeSAvIHBpeGVsc1BlckRlZ3JlZTtcbiAgICBsZXQgYSA9IE1hdGguY29zKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBiID0gTWF0aC5zaW4oYW5nbGUgKiBNYXRoLlBJIC8gMTgwKSAqIHc7XG4gICAgbGV0IHBhcmFtID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgLy8gbGV0IG1hc2tTaGFkb3cgPSBtYXNrKHJhZGl1cyk7XG4gICAgLy8gY29uc29sZS5kaXIobWFza1NoYWRvdylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGFyYW1baV0gPSAwLjUgKyAwLjUgKiBjb250cmFzdCAqIG1hc2tbaV0gKiBNYXRoLnNpbihhICogeFtpXSArIGIgKiB5W2ldICsgcGhhc2UpO1xuICAgIH1cbiAgICAvLyBsZXQgbWFza1NoYWRvdyA9IG1hc2socmFkaXVzKVxuICAgIC8vIGZvcihsZXQgKVxuICAgIGxldCBpbWdEYXRhID0gY3R4LmNyZWF0ZUltYWdlRGF0YShpbWFnZXNpemUgKiAyICsgMSwgaW1hZ2VzaXplICogMiArIDEpO1xuICAgIGZvciAobGV0IGkgPSAwLCBqID0gMDsgaSA8IGltZ0RhdGEuZGF0YS5sZW5ndGg7IGkgKz0gNCwgaisrKSB7XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMF0gPSBwYXJhbVtqXSAqIDI1NTtcbiAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAxXSA9IHBhcmFtW2pdICogMjU1O1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDJdID0gcGFyYW1bal0gKiAyNTU7XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpICsgM10gPSAyNTU7XG4gICAgfVxuICAgIC8vIGltZ0RhdGEgPSBUb0NpcmNsZShpbWdEYXRhLHJhZGl1cy8yKVxuICAgIHJldHVybiBpbWdEYXRhO1xufVxuXG4vL+W8g+eUqCAgICAg5bCG55+p5b2i5YWJ5qCF5Yi25oiQ5ZyG5b2iXG5mdW5jdGlvbiBUb0NpcmNsZShpbWdEYXRhLHJhZGl1cyl7XG4gICAgLy8gbGV0IG0gPSAwO1xuICAgIC8vIGxldCBSID0gcmFkaXVzO1xuICAgIC8vIGZvcihsZXQgeSA9IDA7eSA8IGltZ0RhdGEuaGVpZ2h0O3krKylcbiAgICAvLyB7XG4gICAgLy8gICAgIGZvcihsZXQgeCA9IDA7eCA8IGltZ0RhdGEud2lkdGg7eCsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBtID0gTWF0aC5zcXJ0KE1hdGgucG93KHgtcmFkaXVzLDIpICsgTWF0aC5wb3coeS1yYWRpdXMsMikpO1xuICAgIC8vICAgICAgICAgaWYobSA+PSBSKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGltZ0RhdGEuZGF0YVs0KnkqaW1nRGF0YS53aWR0aCs0KngrM10gPSAwO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgY3R4LnB1dEltYWdlRGF0YShpbWdEYXRhLDAsMClcbiAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWF0b3AnXG4gICAgY3R4LmFyYyhyYWRpdXMrMC41LHJhZGl1cyswLjUscmFkaXVzLDAsMipNYXRoLlBJKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICBjdHguZmlsbCgpXG4gICAgaW1nRGF0YSA9IGN0eC5nZXRJbWFnZURhdGEoMCwwLDIqcmFkaXVzKzEsMipyYWRpdXMrMSlcblxuICAgIHJldHVybiBpbWdEYXRhO1xufVxuXG4vL+eUn+aIkOS6jOmYtumrmOaWr+WIhuW4gyDlj4LmlbA6IOWNiuW+hFxuLy/ov5Tlm57kuozpmLbliIbluIPlgLznmoTmlbDnu4RcbmZ1bmN0aW9uIG1hc2socmFkaXVzKXtcbiAgICBsZXQgbWFza0JhbmQgPSByYWRpdXM7XG4gICAgbGV0IGltYWdlc2l6ZSA9IHJhZGl1cyArIG1hc2tCYW5kO1xuICAgIGxldCBbeCx5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgcmV0dXJuIG1hc2s7XG59XG5cbi8v55Sf5oiQ572R5qC86YeH5qC354K5IOWPguaVsDog5Y2K5b6EXG4vL+i/lOWbnngsIHnkuKTkuKrph4fmoLfmlbDnu4RcbmZ1bmN0aW9uIG1lc2hncmlkKHJhZGl1cykge1xuICAgIGxldCB4ID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IHkgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IgKGxldCBpID0gLXJhZGl1czsgaSA8PSByYWRpdXM7IGkrKykge1xuICAgICAgICBmb3IgKGxldCBqID0gLXJhZGl1czsgaiA8PSByYWRpdXM7IGorKykge1xuICAgICAgICAgICAgeC5wdXNoKGkpO1xuICAgICAgICAgICAgeS5wdXNoKGopO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07XG59XG4iLCJpbXBvcnQge2NhbnZhc1N0eWxlfSBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0IHsgRGl2U3R5bGUgfSBmcm9tICcuLi9EaXYvZGl2J1xuaW1wb3J0IHsgUmVjdGFuZ2xlLG1ha2VSZWN0YW5nbGUgfSBmcm9tICcuLi9HcmFwaGljL3JlY3RhbmdsZSdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnIFxuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgQ2lyY2xlLG1ha2VDaXJjbGUgfSBmcm9tICcuLi9HcmFwaGljL2NpcmNsZSdcbmltcG9ydCB7IExpbmUsIG1ha2VMaW5lfSBmcm9tICcuLi9HcmFwaGljL2xpbmUnXG5pbXBvcnQgeyBBcmMsIG1ha2VBcmMgfSBmcm9tICcuLi9HcmFwaGljL2FyYydcbmltcG9ydCB7IEVsbGlwc2UsIG1ha2VFbGxpcHNlIH0gZnJvbSAnLi4vR3JhcGhpYy9lbGxpcHNlJ1xuaW1wb3J0IHsgbWFrZVBvbHlnb24sIFBvbHlnb24gfSBmcm9tICcuLi9HcmFwaGljL3BvbHlnb24nXG5pbXBvcnQgeyBtYWtlVGV4dCwgVGV4dHMgfSBmcm9tICcuLi9HcmFwaGljL3RleHQnXG5pbXBvcnQgeyBJbWcsIG1ha2VJbWcgfSBmcm9tICcuLi9HcmFwaGljL2ltYWdlJ1xuaW1wb3J0IHsgY29udGVudFN0eWxlIH0gZnJvbSAnLi4vRGlhbG9ndWUvZGlhbG9ndWUnXG5pbXBvcnQgeyBHcmF0LCBtYWtlR3JhdCB9IGZyb20gJy4uL0dyYXBoaWMvZ3JhdGluZydcbmltcG9ydCB7IHNpbkdyYXRpbmcgfSBmcm9tICcuLi9HcmFwaGljL3NpbkdyYXRpbmcnXG5pbXBvcnQgeyBwbGF5UmFuZG9tRG90LCBSYW5kb21Eb3QgfSBmcm9tICcuLi9HcmFwaGljL3JhbmRvbURvdCdcbmltcG9ydCAqIGFzIGV6U2luR3JhdCBmcm9tICcuLi9HcmFwaGljL3NpbkdyYXQnXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0IHsgRGxnQ29udGVudCB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlMCdcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSk6Y2FudmFzU3R5bGV7XG4gICAgaWYoIWNTdHlsZSkgXG4gICAge1xuICAgICAgICBjU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogNDAwLFxuICAgICAgICAgICAgaGVpZ2h0OiA0MDBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighY1N0eWxlLndpZHRoKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLndpZHRoID0gNDAwXG4gICAgfVxuICAgIGlmKCFjU3R5bGUuaGVpZ2h0KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmhlaWdodCA9IDQwMFxuICAgIH1cbiAgICByZXR1cm4gY1N0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VEaXZTdHlsZShkU3R5bGU6IERpdlN0eWxlKTogRGl2U3R5bGV7XG4gICAgaWYoIWRTdHlsZSkgXG4gICAge1xuICAgICAgICBkU3R5bGUgPSB7XG4gICAgICAgICAgICB3aWR0aDogNDAwLFxuICAgICAgICAgICAgaGVpZ2h0OiAyNjAsXG4gICAgICAgICAgICBib3JkZXI6ICdub25lJyxcbiAgICAgICAgICAgIGJvcmRlclJhZGl1czogJzIwcHgnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWRTdHlsZS53aWR0aClcbiAgICB7XG4gICAgICAgIGRTdHlsZS53aWR0aCA9IDQwMFxuICAgIH1cbiAgICBpZighZFN0eWxlLmhlaWdodClcbiAgICB7XG4gICAgICAgIGRTdHlsZS5oZWlnaHQgPSA0MDBcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5ib3JkZXIpXG4gICAge1xuICAgICAgICBkU3R5bGUuYm9yZGVyID0gJ25vbmUnXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuYm9yZGVyUmFkaXVzKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmJvcmRlclJhZGl1cyA9ICc1cHgnXG4gICAgfVxuICAgIHJldHVybiBkU3R5bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNvbnRlbnRTdHlsZShjU3R5bGU6IGNvbnRlbnRTdHlsZSx0aXRsZTogc3RyaW5nLGNvbnRlbnQ6IHN0cmluZyk6IGNvbnRlbnRTdHlsZXtcbiAgICBpZighY1N0eWxlKVxuICAgIHtcbiAgICAgICAgY1N0eWxlID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIGJ0blN0cjogWydPSyddLFxuICAgICAgICAgICAgbm9JY29uOiBmYWxzZSxcbiAgICAgICAgICAgIG5vSW50OiBmYWxzZSxcbiAgICAgICAgICAgIGNvbmZpcm1Qb3NpdGlvbjogMFxuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFjU3R5bGUudGl0bGUpXG4gICAge1xuICAgICAgICBjU3R5bGUudGl0bGUgPSB0aXRsZVxuICAgIH1cbiAgICBpZighY1N0eWxlLmNvbnRlbnQpXG4gICAge1xuICAgICAgICBjU3R5bGUuY29udGVudCA9IGNvbnRlbnRcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5idG5TdHIpe1xuICAgICAgICBjU3R5bGUuYnRuU3RyID0gWydPSyddXG4gICAgfVxuICAgIGlmKCFjU3R5bGUubm9JY29uKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLm5vSWNvbiA9IGZhbHNlXG4gICAgfVxuICAgIGlmKCFjU3R5bGUubm9JbnQpXG4gICAge1xuICAgICAgICBjU3R5bGUubm9JbnQgPSBmYWxzZVxuICAgIH1cbiAgICBpZighY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbilcbiAgICB7XG4gICAgICAgIGNTdHlsZS5jb25maXJtUG9zaXRpb24gPSAwO1xuICAgIH1cbiAgICBpZihjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAwICYmIGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDEgJiYgY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMil7XG4gICAgICAgIGNTdHlsZS5jb25maXJtUG9zaXRpb24gPSAwXG4gICAgfVxuICAgIHJldHVybiBjU3R5bGVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlTW9kZWwobW9kZWw6IHN0cmluZyk6IFtzdHJpbmcsc3RyaW5nLHN0cmluZyxzdHJpbmdde1xuICAgIGlmKG1vZGVsID09PSAnZXJyb3InKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIlhcIiwncmVkJywnRXJyb3IgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZXJyb3Igc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdoZWxwJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCIhXCIsJ29yYW5nZScsJ0hlbHAgRGlhbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgaGVscCBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3F1ZXN0JylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCI/XCIsJ2dyZXknLFwiUXVzZXQgRGlhbG9ndWVcIiwnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnd2FybicpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnLCdXYXJuaW5nIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IHdhcm5pbmcgc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdpbnB1dCcpXG4gICAge1xuICAgICAgICByZXR1cm4gWycnLCcnLFwiSW5wdXQgRGlhbG9ndWVcIixcIlRoaXMgaXMgZGVmYXVsdCBpbnB1dCBzdHJpbmdcIl1cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3NlbGVjdCcpe1xuICAgICAgICByZXR1cm4gWycnLCcnLFwiU2VsZWN0IERpYWxvZ3VlXCIsXCJUaGlzIGlzIGRlZmF1bHQgc2VsZWN0IHN0cmluZ1wiXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnZmlsZScpe1xuICAgICAgICByZXR1cm4gWycnLCcnLCdGaWxlIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGZpbGUgc3RyaW5nJ11cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmV0dXJuIFsn772eJywnZ3JlZW4nLCdEYWlsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBkYWlsb2d1ZSBzdHJpbmcnXVxuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGUoc3R5bGU6IFN0eWxlKXtcbi8vICAgICBpZighc3R5bGUpXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUVsZW1lbnQoZWw6IEVsZW1lbnRzfEdyb3VwfEVsZW1lbnRzW10sY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIC8vIGNvbnNvbGUuZGlyKFJlY3RhbmdsZSlcbiAgICAvLyBjb25zb2xlLmRpcihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSlcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XG4gICAgICAgIG1ha2VSZWN0YW5nbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIG1ha2VDaXJjbGUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBtYWtlTGluZShlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgbWFrZUFyYyhlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgRWxsaXBzZSlcbiAgICB7XG4gICAgICAgIG1ha2VFbGxpcHNlKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAge1xuICAgICAgICBtYWtlUG9seWdvbihlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBUZXh0cylcbiAgICB7XG4gICAgICAgIG1ha2VUZXh0KGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBHcmF0KVxuICAgIHtcbiAgICAgICAgbWFrZUdyYXQoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIG1ha2VJbWcoZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgZXpTaW5HcmF0LnNpbkdyYXQpXG4gICAge1xuICAgICAgICAoPGV6U2luR3JhdC5zaW5HcmF0PmVsKS5kcmF3KCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBzaW5HcmF0aW5nKXtcbiAgICAgICAgY29uc29sZS5kaXIoXCJBZGQgU3VjY2VzcyFcIik7XG4gICAgICAgIC8vICg8c2luR3JhdGluZz5lbCkuZHJhdygpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUmFuZG9tRG90KVxuICAgIHtcbiAgICAgICAgcGxheVJhbmRvbURvdChlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApe1xuICAgICAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAgICAgbGV0IGxpc3QgPSBlbC5ncm91cExpc3Q7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGxpc3RbMF0pXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpc3RbaV0uY3R4ID0gY3R4XG4gICAgICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcnJheSl7XG4gICAgLy8gICAgIGxldCBsaXN0ID0gZWw7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGp1ZGdlRWxlbWVudChsaXN0W2ldLGN0eCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8ganVkZ2VBbmltYXRlKGVsKTtcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgIHN0cm9rZTogJ1wiIzAwMDAwMFwiJyxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdCA9IGVsLnN0eWxlO1xuICAgIGlmKHN0LmxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgc3QubGluZVdpZHRoID0gMjtcbiAgICB9XG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LnN0cm9rZSA9ICdcIiMwMDAwMDBcIidcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYoIShzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCkpe1xuICAgIC8vICAgICAvLyBzdC5zdHJva2UgPSAnIzAwMCc7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgIC8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAvLyAgICAgfVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG4gICAgLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsKCk7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgXG4gICAgLy8gY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgIC8vIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gY3R4LmZpbGwoKTtcbiAgICAvLyBjdHguc3Ryb2tlKCk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlU3R5bGVfdGV4dChlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGlmKGVsLnN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBlbC5zdHlsZSA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihlbC5zaGFwZS5tYXhXaWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc2hhcGUubWF4V2lkdGggPSBjdHguY2FudmFzLndpZHRoO1xuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcblxuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGxUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUubWF4V2lkdGgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSBcIiMwMDBcIlxuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQoZWwuc2hhcGUudGV4dCxlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUubWF4V2lkdGgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VUZXh0U3R5bGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc3QgPSBlbC5zdHlsZVxuICAgIGxldCBmb250U3RyaW5nID0gJyc7XG4gICAgaWYoc3QgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHN0ID0ge1xuICAgICAgICAgICAgZm9udFNpemU6ICcxOHB4JyxcbiAgICAgICAgICAgIGZvbnRWYXJpYW50OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFN0eWxlOiAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTdHlsZSAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRTdHlsZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSA8IDMgJiYgc3QuZm9udFN0eWxlID49MClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09IDApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gMSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdpdGFsaWMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U3R5bGUgPSBzdC5mb250U3R5bGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTdHlsZSAhPT0gJ2l0YWxpYycgJiYgc3QuZm9udFN0eWxlICE9PSAnb2JsaXF1ZScgJiYgc3QuZm9udFN0eWxlICE9PSBcIm5vcm1hbFwiKXtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPT09ICcwJyl7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuZm9udFN0eWxlID09PSAnMScpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzInKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ29ibGlxdWUnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFZhcmlhbnQgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250VmFyaWFudCAhPT0gJ25vbmUnKVxuICAgIHtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnYm9vbGVhbicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRWYXJpYW50ID09PSBmYWxzZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFZhcmlhbnQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250VmFyaWFudCA9IHN0LmZvbnRWYXJpYW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCAhPT0gJ25vcm1hbCcgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdzbWFsbC1jYXBzJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gJ3RydWUnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnc21hbGwtY2FwcydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250V2VpZ2h0ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFdlaWdodCAhPT0gJ25vbmUnKXtcbiAgICAgICAgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gc3QuZm9udFdlaWdodC50b1N0cmluZygpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFdlaWdodCA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRXZWlnaHQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRXZWlnaHQgIT09ICdib2xkJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZGVyJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnbGlnaHRlcicpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRTaXplICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFNpemUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUudG9TdHJpbmcoKSArICdweCdcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKHR5cGVvZiBzdC5mb250U2l6ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHN0LmZvbnRTaXplLmluZGV4T2YoJ3B4JykgPT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTaXplID0gc3QuZm9udFNpemUgKyAncHgnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgc3QuZm9udFNpemUgPSAnMThweCdcbiAgICB9XG4gICAgZm9udFN0cmluZyA9IHN0LmZvbnRTdHlsZSArICcgJyArIHN0LmZvbnRWYXJpYW50ICsgJyAnICsgc3QuZm9udFdlaWdodCArICcgJyArIHN0LmZvbnRTaXplICsgJyAnICsgc3QuZm9udEZhbWlseTtcbiAgICBjdHguZm9udCA9IGZvbnRTdHJpbmc7XG4gICAgLy8gY29uc29sZS5kaXIoZm9udFN0cmluZylcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQ2hhbmdlVHlwZShlbDogbnVtYmVyfHN0cmluZyk6IG51bWJlcntcbiAgICBsZXQgeCA9IDE7XG4gICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgaWYodHlwZW9mIGVsID09PSBcInN0cmluZ1wiKVxuICAgIHtcbiAgICAgICAgZWwgPSBlbC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICBpZihlbCA9PT0gXCJDRU5URVJcIiB8fCBlbCA9PT0gJ0MnKVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVExFRlQnIHx8IGVsID09PSBcIkxFRlRcIiB8fCBlbCA9PT0gJ0wnKXtcbiAgICAgICAgICAgIHggPSAxO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFRPUCcgfHwgZWwgPT09IFwiVE9QXCIgfHwgZWwgPT09ICdUJyl7XG4gICAgICAgICAgICB4ID0gMjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGVsID09PSAnUkVDVFJJR0hUJyB8fCBlbCA9PT0gXCJSSUdIVFwiIHx8IGVsID09PSAnUicpe1xuICAgICAgICAgICAgeCA9IDM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RCT1RUT00nIHx8IGVsID09PSBcIkJPVFRPTVwiIHx8IGVsID09PSAnQicpe1xuICAgICAgICAgICAgeCA9IDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKHR5cGVvZiBlbCA9PT0gXCJudW1iZXJcIilcbiAgICB7XG4gICAgICAgIGlmKGVsPDUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHggPSBlbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZVxuICAgIHtcbiAgICAgICAgY29uc29sZS5kaXIoJ0Vycm9yIUl0IHdpbGwgdXNlIGRlZmF1bHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVNpZGUoc2lkZTA6IG51bWJlcnxzdHJpbmcsc2lkZTE6IG51bWJlcnxzdHJpbmcpOiBbbnVtYmVyLG51bWJlcl17XG4gICAgbGV0IGYwID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUwKTtcbiAgICBsZXQgZjEgPSBqdWRnZUNoYW5nZVR5cGUoc2lkZTEpO1xuICAgIGlmKGYwID09PSAyIHx8IGYwID09PSA0KXtcbiAgICAgICAgaWYoZjEgPT09IDIgfHwgZjEgPT09IDQpe1xuICAgICAgICAgICAgZjEgPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgdCA9IGYxO1xuICAgICAgICAgICAgZjEgPSBmMDtcbiAgICAgICAgICAgIGYwID0gdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihmMCA9PT0gMSB8fCBmMCA9PT0gMyl7XG4gICAgICAgIGlmKGYxID09PSAxIHx8IGYxID09PSAzKXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW2YwLGYxXVxufSAgIFxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55KVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzaC53aWR0aCA9PT0gdW5kZWZpbmVkIHx8IHNoLmhlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LGltZy5JbWcud2lkdGgsaW1nLkltZy5oZWlnaHQpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLkltZyxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodCxzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJbWFnZVNoYXBlX3RydWUoaW1nOiBJbWcsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIGxldCBzaCA9IGltZy5zaGFwZVxuICAgIGlmKHNoLnN4ID09PSB1bmRlZmluZWQgfHwgc2guc3kgPT09IHVuZGVmaW5lZCB8fCBzaC5zd2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5zaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnksc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQpXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VJc0luRWxlbWVudChbeCx5XTogW251bWJlcixudW1iZXJdLGVsOiBFbGVtZW50cyk6IGJvb2xlYW57XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBsZXQgW3gwLHkwLHcwLGgwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUud2lkdGgsZWwuc2hhcGUuaGVpZ2h0XVxuICAgICAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAscjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yXVxuICAgICAgICBsZXQgciA9IE1hdGguc3FydChNYXRoLnBvdyh4LXgwLDIpICsgTWF0aC5wb3coeS15MCwyKSlcbiAgICAgICAgaWYociA8PSByMClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHgxLHkxXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUueEVuZCxlbC5zaGFwZS55RW5kXVxuICAgICAgICBpZih4MSAhPT0geDApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB5dCA9ICh5MS15MCkvKHgxLXgwKSAqICh4IC0geDApICsgeTBcbiAgICAgICAgICAgIGlmKHkgPj0geXQtMTUgJiYgeSA8PSB5dCsxNSkgLy/mianlpKfojIPlm7Tku6Xkvr/mk43kvZxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHh0ID0gKHgxLXgwKS8oeTEteTApICogKHkgLSB5MCkgKyB4MFxuICAgICAgICAgICAgaWYoeSA+PSB4dC0xNSAmJiB5IDw9IHh0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJjKVxuICAgIHtcbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCxyYTAscmIwXSA9IFtlbC5zaGFwZS54LGVsLnNoYXBlLnksZWwuc2hhcGUucmEsZWwuc2hhcGUucmJdXG4gICAgICAgIGxldCB0ID0gTWF0aC5wb3coeC14MCwyKS9NYXRoLnBvdyhyYTAsMikgKyBNYXRoLnBvdyh5LXkwLDIpL01hdGgucG93KHJiMCwyKVxuICAgICAgICBpZih0IDw9IDEpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbGV0IGkgPSAwXG4gICAgICAgIGxldCBqID0gaSArIDFcbiAgICAgICAgbGV0IGluZGV4ID0gMFxuICAgICAgICBsZXQgeHQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgeXQgPSBuZXcgQXJyYXkoKVxuICAgICAgICBsZXQgW3gwLHkwXSA9IFtlbC5zaGFwZS54QSxlbC5zaGFwZS55QV1cbiAgICAgICAgZm9yKGkgPSAwO2k8ZWwuc2hhcGUueEEubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaSA9PT0gZWwuc2hhcGUueEEubGVuZ3RoLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaiA9IGkgKyAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih5MFtpXSAhPT0geTBbal0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgeHRbaW5kZXhdID0gKHgwW2ldLXgwW2pdKS8oeTBbaV0teTBbal0pICogKHkgLSB5MFtpXSkgKyB4MFtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB5dFtpbmRleF0gPSAoeTBbal0teTBbaV0pLyh4MFtqXS14MFtpXSkgKiAoeCAtIHgwW2ldKSArIHkwW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih4ID09PSB4dFtpbmRleF0pXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoeHRbaW5kZXhdID49IHgpe1xuICAgICAgICAgICAgICAgIGluZGV4KytcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihpbmRleCUyPT09MClcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAgLy8ge1xuICAgIC8vICAgICBsZXQgY1xuICAgIC8vICAgICBsZXQgaSxqXG4gICAgLy8gICAgIGxldCBsID0gZWwuc2hhcGUueUEubGVuZ3RoXG4gICAgLy8gICAgIGZvcihjID0gZmFsc2UsaSA9IC0xLGogPSBsIC0gMTsgKytpIDwgbDsgaiA9IGkpIFxuICAgIC8vICAgICAgICAgKCAoZWwuc2hhcGUueUFbaV0gPD0geSAmJiB5IDwgZWwuc2hhcGUueUFbal0pIHx8IChlbC5zaGFwZS55QVtqXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtpXSkgKSBcbiAgICAvLyAgICAgICAgICYmICh4IDwgKGVsLnNoYXBlLnhBW2pdIC0gZWwuc2hhcGUueEFbaV0pICogKHkgLSBlbC5zaGFwZS55QVtpXSkgLyAoZWwuc2hhcGUueUFbal0gLSBlbC5zaGFwZS55QVtpXSkgKyBlbC5zaGFwZS54QVtpXSkgXG4gICAgLy8gICAgICAgICAmJiAoYyA9ICFjKTsgXG4gICAgLy8gICAgIHJldHVybiBjOyBcbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUFuaW1hdGUoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAvLyBjb25zb2xlLmRpcignYScpXG5cbiAgICBlbC5yZW1vdmUoKVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgudHJhbnNsYXRlKGVsLnRyYW5zbGF0ZS54LGVsLnRyYW5zbGF0ZS55KVxuICAgIGN0eC5yb3RhdGUoZWwucm90YXRlKVxuICAgIGN0eC5zY2FsZShlbC5zY2FsZS53aWR0aCxlbC5zY2FsZS5oZWlnaHQpXG4gICAganVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVRSUyhlbDogRWxlbWVudHMpe1xuICAgIGxldCBjdHggPSBlbC5jdHhcblxuICAgIGxldCBbeCx5XSA9IGp1ZGdlRWxlbWVudHNDZW50ZXIoZWwpO1xuICAgIFxuICAgIGlmKGVsLnJvdGF0ZSlcbiAgICB7XG4gICAgICAgIGN0eC50cmFuc2xhdGUoeCx5KVxuICAgICAgICBjdHgucm90YXRlKGVsLnJvdGF0ZSpNYXRoLlBJLzE4MClcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSgteCwteSlcbiAgICB9XG4gICAgY3R4LnRyYW5zbGF0ZSh4LHkpXG4gICAgY3R4LnNjYWxlKGVsLnNjYWxlLndpZHRoLGVsLnNjYWxlLmhlaWdodClcbiAgICBjdHgudHJhbnNsYXRlKC14LC15KVxuXG4gICAgY3R4LnRyYW5zbGF0ZShlbC50cmFuc2xhdGUueCxlbC50cmFuc2xhdGUueSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlS2V5KGtleUNvZGU6IG51bWJlcixrZXlDb2RlRGljdGlvbmFyeTogT2JqZWN0KTogc3RyaW5ne1xuICAgIGxldCBrZXkgPSBrZXlDb2RlRGljdGlvbmFyeVtrZXlDb2RlXTtcbiAgICByZXR1cm4ga2V5O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQsdGl0bGU6IHN0cmluZyxjb250ZW50Pzogc3RyaW5nLG9rPzogc3RyaW5nLGNhbmNlbD86IHN0cmluZyk6IERsZ0NvbnRlbnR7XG4gICAgaWYob2sgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIG9rID0gJ09LJ1xuICAgIH1cbiAgICBpZihjYW5jZWwgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGNhbmNlbCA9ICdDYW5jZWwnXG4gICAgfVxuICAgIGlmKGRsZ0NvbnRlbnQgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHJldHVybiBkbGdDb250ZW50ID0ge1xuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgY29udGVudDogY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm06IG9rLFxuICAgICAgICAgICAgY2FuY2VsOiBjYW5jZWxcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihkbGdDb250ZW50LnRpdGxlID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgfVxuICAgICAgICBpZihjb250ZW50ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGRsZ0NvbnRlbnQuY29udGVudCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRsZ0NvbnRlbnQuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoZGxnQ29udGVudC5jb25maXJtID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuY29uZmlybSA9IG9rXG4gICAgICAgIH1cbiAgICAgICAgaWYoZGxnQ29udGVudC5jYW5jZWwgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBkbGdDb250ZW50LmNhbmNlbCA9IGNhbmNlbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGxnQ29udGVudDtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUVsZW1lbnRzQ2VudGVyKGVsOiBFbGVtZW50cyk6IFtudW1iZXIsbnVtYmVyXXtcbiAgICBsZXQgeCx5O1xuICAgIGlmKGVsIGluc3RhbmNlb2YgUmVjdGFuZ2xlKVxuICAgIHtcbiAgICAgICAgeCA9IGVsLnNoYXBlLnggKyBlbC5zaGFwZS53aWR0aC8yXG4gICAgICAgIHkgPSBlbC5zaGFwZS55ICsgZWwuc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIENpcmNsZSB8fCBlbCBpbnN0YW5jZW9mIEFyYyB8fCBlbCBpbnN0YW5jZW9mIEdyYXQgfHwgZWwgaW5zdGFuY2VvZiBFbGxpcHNlKVxuICAgIHtcbiAgICAgICAgeCA9IGVsLnNoYXBlLnhcbiAgICAgICAgeSA9IGVsLnNoYXBlLnlcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIExpbmUpXG4gICAge1xuICAgICAgICB4ID0gTWF0aC5hYnMoZWwuc2hhcGUueCAtIGVsLnNoYXBlLnhFbmQpLzJcbiAgICAgICAgeSA9IE1hdGguYWJzKGVsLnNoYXBlLnkgLSBlbC5zaGFwZS55RW5kKS8yXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBlelNpbkdyYXQuc2luR3JhdClcbiAgICB7XG4gICAgICAgIHggPSBNYXRoLmNlaWwoKDIqZWwuc2hhcGUucisxKS8yKVxuICAgICAgICB5ID0gTWF0aC5jZWlsKCgyKmVsLnNoYXBlLnIrMSkvMilcbiAgICB9XG5cbiAgICByZXR1cm4gW3gseV1cbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBuYW1lU3R5bGUgfSBmcm9tIFwiLi4vRGF0YVR5cGUvZGF0YVR5cGVcIjtcbmltcG9ydCB7IFRleHRMaW5lIH0gZnJvbSBcIi4uL0dyYXBoaWMvdGV4dFwiO1xuaW1wb3J0IHsgUmFuZG9tRG90IH0gZnJvbSBcIi4uL0dyYXBoaWMvcmFuZG9tRG90XCI7XG5pbXBvcnQgeyBHcm91cCB9IGZyb20gXCIuLi9Hcm91cC9ncm91cFwiO1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuXG5leHBvcnQgY2xhc3MgU3RvcmFnZXtcbiAgICBFbGVtZW50c0xpc3Q6IEFycmF5PEVsZW1lbnRzPlxuICAgIHRleHRMaW5lOiBUZXh0TGluZVxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuRWxlbWVudHNMaXN0ID0gW107XG4gICAgfVxuICAgIHB1c2goZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzIHx8IGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnB1c2goZWwpXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnB1c2goZWxbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbW92ZShlbDogRWxlbWVudHMgfCBBcnJheTxFbGVtZW50cz4gfCBHcm91cCl7XG4gICAgICAgIGxldCBuYW1lID0gdGhpcy5nZXRFbGVtZW50c05hbWUoZWwpO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnNlYXJjaEVsZW1lbnRzTmFtZShuYW1lKTtcbiAgICAgICAgaWYoaW5kZXggIT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaW5kZXggaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBpbmRleC5zb3J0KCk7XG4gICAgICAgICAgICAgICAgaW5kZXguc29ydCgoYSxiKT0+e1xuICAgICAgICAgICAgICAgICAgICBpZihhPmIpXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGE8YilcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSBpbmRleC5sZW5ndGgtMTtpID49IDA7aS0tKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5FbGVtZW50c0xpc3Quc3BsaWNlKGluZGV4W2ldLDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5FbGVtZW50c0xpc3Quc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGdldEVsZW1lbnRzTmFtZShlbDogRWxlbWVudHMgfCBBcnJheTxFbGVtZW50cz4gfCBHcm91cCl7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgRWxlbWVudHMgfHwgZWwgaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IG5hbWUgPSBlbC5uYW1lO1xuICAgICAgICAgICAgcmV0dXJuIG5hbWVcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gbmV3IEFycmF5KClcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZVtpXSA9IGVsW2ldLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBuYW1lXG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VhcmNoRWxlbWVudHNOYW1lKG5hbWU6IG5hbWVTdHlsZSB8IEFycmF5PG5hbWVTdHlsZT4pe1xuICAgICAgICBpZihuYW1lIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IG5ldyBBcnJheSgpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBuYW1lLmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgdGhpcy5FbGVtZW50c0xpc3QubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG5hbWVbaV0ubmFtZSA9PT0gdGhpcy5FbGVtZW50c0xpc3RbdF0ubmFtZS5uYW1lKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleFtpXSA9IHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRleFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IHRoaXMuRWxlbWVudHNMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYobmFtZS5uYW1lID09PSB0aGlzLkVsZW1lbnRzTGlzdFt0XS5uYW1lLm5hbWUpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IHQ7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBpbmRleDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZURyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgICAgICBsZXQgZWwgPSB0aGlzLkVsZW1lbnRzTGlzdCBcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZWxbaV0uY3R4ID0gY3R4XG4gICAgICAgICAgICAvLyBpZihlbFtpXSBpbnN0YW5jZW9mIFJhbmRvbURvdClcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgIC8vICAgICBsZXQgcmFuZG9tRG90OlJhbmRvbURvdCA9IDxSYW5kb21Eb3Q+ZWxbaV07XG4gICAgICAgICAgICAvLyAgICAgcmFuZG9tRG90Lm1hc2tCYW5kLmN0eCA9IGN0eDtcbiAgICAgICAgICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChyYW5kb21Eb3QubWFza0JhbmQsY3R4KTtcbiAgICAgICAgICAgIC8vICAgICBmb3IobGV0IGluZGV4ID0gMDtpbmRleCA8IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheS5sZW5ndGg7aW5kZXgrKylcbiAgICAgICAgICAgIC8vICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgIHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpbmRleF0uY3R4ID0gY3R4O1xuICAgICAgICAgICAgLy8gICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChyYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaW5kZXhdLGN0eClcbiAgICAgICAgICAgIC8vICAgICB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyBlbHNle1xuICAgICAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsW2ldLGN0eClcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgIH1cbn0iLCJpbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gXCIuLi9FbGVtZW50XCI7XG5pbXBvcnQgeyBqdWRnZUlzSW5FbGVtZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBLYldhaXQoa2V5OiBudW1iZXIsZnVuYz86IEZ1bmN0aW9uKTogUHJvbWlzZTxib29sZWFuPntcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0ZWQpPT57XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGV2ZW50ID0+e1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihmdW5jKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYygpO1xuICAgICAgICAgICAgICAgIH0gICBcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLYk5hbWUoa2V5OiBzdHJpbmd8bnVtYmVyKTpudW1iZXJ7XG4gICAgbGV0IHJlcztcblxuICAgIGlmKHR5cGVvZiBrZXkgPT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgcmVzID0ga2V5LmNoYXJDb2RlQXQoMClcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgcmVzID0gU3RyaW5nLmZyb21DaGFyQ29kZShrZXkpXG4gICAgfVxuICAgIC8vIGNvbnNvbGUuZGlyKHJlcykgXG4gICAgcmV0dXJuIHJlc1xufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JQcmVzc1dhaXQoa2V5OiBudW1iZXJ8QXJyYXk8bnVtYmVyPik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBsZXQga2V5QyA9IG5ldyBBcnJheSgpO1xuICAgICAgICBpZih0eXBlb2Yga2V5ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAga2V5QyA9IFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBrZXlDID0ga2V5O1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGV2ZW50ID0+e1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwga2V5Qy5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXlDW2ldKXtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShlLmtleUNvZGUpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JSZWxlYXNlV2FpdChrZXk6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleXVwID0gZXZlbnQgPT4ge1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgaWYoZSAmJiBlLmtleUNvZGUgPT09IGtleSl7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxufVxuXG5leHBvcnQgZnVuY3Rpb24gR2V0Q2xpY2soZWw6IEVsZW1lbnRzKTogUHJvbWlzZTxib29sZWFuPntcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUscmVqZWN0ZWQpPT57XG4gICAgICAgIGRvY3VtZW50Lm9ubW91c2Vkb3duID0gZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgICAgICAgbGV0IGUgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQgfHwgYXJndW1lbnRzLmNhbGxlZS5jYWxsZXIuYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgbGV0IHgseVxuICAgICAgICAgICAgaWYoZS5wYWdlWCB8fCBlLnBhZ2VZKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHggPSBlLnBhZ2VYXG4gICAgICAgICAgICAgICAgeSA9IGUucGFnZVlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHgpIFxuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoeSlcbiAgICAgICAgICAgIGxldCBmID0ganVkZ2VJc0luRWxlbWVudChbeCx5XSxlbClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGYpXG4gICAgICAgICAgICBpZihmID09PSB0cnVlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn0iLCJleHBvcnQgY2xhc3MgVGltZXtcbiAgICBzdGFydFRpbWU6IG51bWJlclxuICAgIHRpbWVTdGFtcDogQXJyYXk8bnVtYmVyPlxuICAgIHRpbWVDb250aW51ZVZhbHVlOiBBcnJheTxudW1iZXI+XG4gICAgdGltZUludGVydmFsVmFsdWU6IEFycmF5PG51bWJlcj5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgIHRoaXMudGltZVN0YW1wID0gW11cbiAgICAgICAgdGhpcy50aW1lQ29udGludWVWYWx1ZSA9IFtdXG4gICAgICAgIHRoaXMudGltZUludGVydmFsVmFsdWUgPSBbXVxuICAgIH1cbiAgICByZWNvcmQoKXtcbiAgICAgICAgdGhpcy50aW1lU3RhbXAucHVzaChwZXJmb3JtYW5jZS5ub3coKSlcbiAgICB9XG4gICAgZ2V0U3RhbXAoKXtcbiAgICAgICAgcmV0dXJuIHRoaXMudGltZVN0YW1wXG4gICAgfVxuICAgIGdldENvbnRpbnVlVmFsdWUoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy50aW1lU3RhbXAubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy50aW1lQ29udGludWVWYWx1ZS5wdXNoKHRoaXMudGltZVN0YW1wW2ldIC0gdGhpcy50aW1lU3RhbXBbaS0xXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMudGltZUNvbnRpbnVlVmFsdWU7XG4gICAgfVxuICAgIGdldEludGVydmFsVmFsdWUoKXtcbiAgICAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy50aW1lU3RhbXAubGVuZ3RoO2krPTIpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGltZVN0YW1wKVxuICAgICAgICAgICAgICAgIHRoaXMudGltZUludGVydmFsVmFsdWUucHVzaCh0aGlzLnRpbWVTdGFtcFtpXSAtIHRoaXMudGltZVN0YW1wW2ktMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlO1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKGRlbGF5OiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj57XG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuLy8gICAgICAgICB2YXIgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgKyBkZWxheTtcbi8vICAgICAgICAgd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPCBzdGFydFRpbWUpIHt9XG4vLyAgICAgICAgIHJlcygxKVxuLy8gICAgIH0pXG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBzbGVlcChkZWxheTogbnVtYmVyKXtcbiAgICBsZXQgdGltZV9udW09MDsgICAgIFxuICAgIGRlbGF5ID0gTWF0aC5mbG9vcihkZWxheS8xMDAwICogNjApO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIChmdW5jdGlvbiByYWYoKXtcbiAgICAgICAgICAgIHRpbWVfbnVtKys7XG4gICAgICAgICAgICBsZXQgaWQgPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgaWYoIHRpbWVfbnVtPmRlbGF5KXtcbiAgICAgICAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShpZCk7XG4gICAgICAgICAgICByZXNvbHZlKDApO1xuICAgICAgICB9XG4gICAgICAgIH0oKSkgICAgXG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzKGRlbGF5OiBudW1iZXIpOiBQcm9taXNlPG51bWJlcj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICB2YXIgc3RhcnRUaW1lID0gcGVyZm9ybWFuY2Uubm93KCkgKyBkZWxheTtcbiAgICAgICAgd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPCBzdGFydFRpbWUpIHt9XG4gICAgICAgIHJlcygxKVxuICAgIH0pXG59IiwiaW1wb3J0IHsganVkZ2VLZXkgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIlxuXG5cbmV4cG9ydCBjbGFzcyBLZXlwcmVzc3tcbiAgICBrZXlUeXBlOiBzdHJpbmdcbiAgICBrZXlFdmVudDogS2V5Ym9hcmRFdmVudFxuICAgIGtleTogQXJyYXk8YW55PlxuICAgIGtleUNvbWJpbmF0aW9uOiBBcnJheTxhbnk+XG4gICAgY29uc3RydWN0b3Ioa2V5VHlwZT86IHN0cmluZyl7XG4gICAgICAgIGlmKGtleVR5cGUpe1xuICAgICAgICAgICAgaWYoa2V5VHlwZSA9PT0gJ2tleWRvd24nIHx8IGtleVR5cGUgPT09ICdrZXl1cCcgfHwga2V5VHlwZSA9PT0gJ2tleXByZXNzJyl7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0ga2V5VHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLmtleVR5cGUgPSAna2V5ZG93bidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0gJ2tleWRvd24nXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5rZXkgPSBbXVxuICAgICAgICB0aGlzLmtleUV2ZW50ID0gbmV3IEtleWJvYXJkRXZlbnQodGhpcy5rZXlUeXBlKTtcbiAgICB9XG4gICAgbGlzdGVuKGtleTogc3RyaW5nIHwgbnVtYmVyIHwgQXJyYXk8c3RyaW5nPiB8IEFycmF5PG51bWJlcj4sZnVuPzogRnVuYyB8IEZ1bmN0aW9uLElzRGVzdHJveT86IGJvb2xlYW4pOiBQcm9taXNlPFJFUz57XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHBhcmFtKTtcbiAgICAgICAgbGV0IGZ1bmM6IEZ1bmM9e1xuICAgICAgICAgICAgZnVuY0xpc3Q6IFtdXG4gICAgICAgIH07XG4gICAgICAgIGlmKElzRGVzdHJveSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICB7XG4gICAgICAgICAgICBJc0Rlc3Ryb3kgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgIHRoaXMua2V5ID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICBpZihrZXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZnVuIGluc3RhbmNlb2YgRnVuY3Rpb24pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBmdW5jLmZ1bmNMaXN0ID0gW2Z1bl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMgPSBmdW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGtleSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkgPSBrZXlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXkucHVzaChrZXkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMua2V5Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZih0eXBlb2YgdGhpcy5rZXlbaV0gPT09ICdudW1iZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5rZXlbaV0gPSBqdWRnZUtleSh0aGlzLmtleVtpXSxrZXlDb2RlRGljdGlvbmFyeSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGZ1bmMpO1xuICAgICAgICAgICAgICAgIGxpc3Rlbih0aGlzLmtleSx0aGlzLmtleVR5cGUsZnVuYyxJc0Rlc3Ryb3kpXG4gICAgICAgICAgICAgICAgLnRoZW4oZT0+e1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihlKVxuICAgICAgICAgICAgICAgICAgICAvLyBpZihlLmluZGV4ID49IDApXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGZ1bmMuY29tcGxldGUpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZnVuYy5jb21wbGV0ZSgpXG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoZnVuYylcbiAgICAgICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgaWYoZnVuYy5mdW5jTGlzdFtlLmluZGV4XSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBmdW5jLmZ1bmNMaXN0W2UuaW5kZXhdKClcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmRpcihlLmtleSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdmdW5jWycrZSsnXSBpcyB1bmRlZmluZWQgIScpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKGUua2V5KVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgLy8gY29uc29sZS5lcnJvcihcImZ1bmMgaXMgdW5kZWZpbmRlXCIpO1xuICAgICAgICAgICAgICAgICAgICByZXMoZSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihcIllvdSBzaG91bGRuJ3QgdXNlIHRoaXMgZnVuY3Rpb24gd2l0aG91dCBQYXJhbWV0cmljIGtleSAhISFcIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtleXByZXNzSW5pdChrZXlUeXBlPzogc3RyaW5nKXtcbiAgICBsZXQga2V5cHJlc3MgPSBuZXcgS2V5cHJlc3MoKTtcbiAgICByZXR1cm4ga2V5cHJlc3Ncbn1cblxuZnVuY3Rpb24gbGlzdGVuKGtleTogQXJyYXk8c3RyaW5nPixrZXlUeXBlOiBzdHJpbmcsZnVuYzogRnVuYyxJc0Rlc3Ryb3k6IGJvb2xlYW4pOiBQcm9taXNlPFJFUz57XG4gICAgbGV0IHJlczpSRVM9e1xuICAgICAgICBpbmRleDogLTEsXG4gICAgICAgIGtleTogJ251bGwnXG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxSRVM+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihrZXlUeXBlLGxpbnN0ZW5uZXIpO1xuICAgICAgICAvLyBkZWJ1Z2dlcjtcbiAgICAgICAgZnVuY3Rpb24gbGluc3Rlbm5lcihlKXtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKCg8S2V5Ym9hcmRFdmVudD5lKS5rZXkpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBrZXkubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihrZXlbaV0gPT09ICg8S2V5Ym9hcmRFdmVudD5lKS5rZXkpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleTogKDxLZXlib2FyZEV2ZW50PmUpLmtleVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmKHJlcy5pbmRleCA+PSAwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmdW5jLmNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMuY29tcGxldGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihmdW5jLmZ1bmNMaXN0KVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihmdW5jLmZ1bmNMaXN0W3Jlcy5pbmRleF0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuYy5mdW5jTGlzdFtyZXMuaW5kZXhdKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihyZXMua2V5KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ2Z1bmNbJytlKyddIGlzIHVuZGVmaW5lZCAhJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzLmtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJmdW5jIGlzIHVuZGVmaW5kZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVzKGUpO1xuICAgICAgICAgICAgICAgICAgICBpZihJc0Rlc3Ryb3kpXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGtleVR5cGUsbGluc3Rlbm5lcik7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG59XG5cbmludGVyZmFjZSBGdW5je1xuICAgIGZ1bmNMaXN0PzogQXJyYXk8RnVuY3Rpb24+XG4gICAgY29tcGxldGU/OiBGdW5jdGlvblxufVxuaW50ZXJmYWNlIFJFU3tcbiAgICBpbmRleDogbnVtYmVyXG4gICAga2V5OiBzdHJpbmdcbn1cblxubGV0IGtleUNvZGVEaWN0aW9uYXJ5ID0ge1xuICAgIDg6ICdCYWNrc3BhY2UnLFxuICAgIDk6ICdUYWInLCBcbiAgICAxMjogJ0NsZWFyJyxcbiAgICAxMzogJ0VudGVyJywgXG4gICAgMTY6ICdTaGlmdCcsXG4gICAgMTc6ICdDb250cm9sJywgXG4gICAgMTg6ICdBbHQnLCBcbiAgICAxOTogJ1BhdXNlJyxcbiAgICAyMDogJ0NhcHNMb2NrJywgXG4gICAgMjc6ICdFc2NhcGUnLFxuICAgIDMyOiAnICcsIFxuICAgIDMzOiAnUHJpb3InLCBcbiAgICAzNDogJ05leHQnLFxuICAgIDM1OiAnRW5kJywgXG4gICAgMzY6ICdIb21lJywgXG4gICAgMzc6ICdMZWZ0JywgXG4gICAgMzg6ICdVcCcsIFxuICAgIDM5OiAnUmlnaHQnLCBcbiAgICA0MDogJ0Rvd24nLCBcbiAgICA0MTogJ1NlbGVjdCcsIFxuICAgIDQyOiAnUHJpbnQnLCBcbiAgICA0MzogJ0V4ZWN1dGUnLCBcbiAgICA0NTogJ0luc2VydCcsIFxuICAgIDQ2OiAnRGVsZXRlJywgXG4gICAgNDc6ICdIZWxwJywgXG4gICAgNDg6ICcwJywgXG4gICAgNDk6ICcxJyxcbiAgICA1MDogJzInLFxuICAgIDUxOiAnMycsXG4gICAgNTI6ICc0JywgXG4gICAgNTM6ICc1JyxcbiAgICA1NDogJzYnLFxuICAgIDU1OiAnNycsIFxuICAgIDU2OiAnOCcsIFxuICAgIDU3OiAnOScsIFxuICAgIDY1OiAnYScsIFxuICAgIDY2OiAnYicsIFxuICAgIDY3OiAnYycsIFxuICAgIDY4OiAnZCcsIFxuICAgIDY5OiAnZScsICBcbiAgICA3MDogJ2YnLCBcbiAgICA3MTogJ2cnLCBcbiAgICA3MjogJ2gnLCBcbiAgICA3MzogJ2knLCBcbiAgICA3NDogJ2onLCBcbiAgICA3NTogJ2snLCBcbiAgICA3NjogJ2wnLCBcbiAgICA3NzogJ20nLCBcbiAgICA3ODogJ24nLCBcbiAgICA3OTogJ28nLCBcbiAgICA4MDogJ3AnLCBcbiAgICA4MTogJ3EnLFxuICAgIDgyOiAncicsIFxuICAgIDgzOiAncycsIFxuICAgIDg0OiAndCcsIFxuICAgIDg1OiAndScsIFxuICAgIDg2OiAndicsIFxuICAgIDg3OiAndycsIFxuICAgIDg4OiAneCcsIFxuICAgIDg5OiAneScsIFxuICAgIDkwOiAneicsIFxuICAgIDk2OiAnS1BfMCcsIFxuICAgIDk3OiAnS1BfMScsIFxuICAgIDk4OiAnS1BfMicsIFxuICAgIDk5OiAnS1BfMycsIFxuICAgIDEwMDogJ0tQXzQnLCBcbiAgICAxMDE6ICdLUF81JywgXG4gICAgMTAyOiAnS1BfNicsIFxuICAgIDEwMzogJ0tQXzcnLCBcbiAgICAxMDQ6ICdLUF84JywgXG4gICAgMTA1OiAnS1BfOScsIFxuICAgIDEwNjogJ0tQX011bHRpcGx5JyxcbiAgICAxMDc6ICdLUF9BZGQnLCBcbiAgICAxMDg6ICdLUF9TZXBhcmF0b3InLFxuICAgIDEwOTogJ0tQX1N1YnRyYWN0JyxcbiAgICAxMTA6ICdLUF9EZWNpbWFsJyxcbiAgICAxMTE6ICdLUF9EaXZpZGUnLCBcbiAgICAxMTI6ICdGMScsIFxuICAgIDExMzogJ0YyJywgXG4gICAgMTE0OiAnRjMnLCBcbiAgICAxMTU6ICdGNCcsIFxuICAgIDExNjogJ0Y1JywgXG4gICAgMTE3OiAnRjYnLCBcbiAgICAxMTg6ICdGNycsIFxuICAgIDExOTogJ0Y4JywgXG4gICAgMTIwOiAnRjknLCBcbiAgICAxMjE6ICdGMTAnLCBcbiAgICAxMjI6ICdGMTEnLCBcbiAgICAxMjM6ICdGMTInLCBcbiAgICAxMjQ6ICdGMTMnLCBcbiAgICAxMjU6ICdGMTQnLCBcbiAgICAxMjY6ICdGMTUnLCBcbiAgICAxMjc6ICdGMTYnLCBcbiAgICAxMjg6ICdGMTcnLCBcbiAgICAxMjk6ICdGMTgnLCBcbiAgICAxMzA6ICdGMTknLCBcbiAgICAxMzE6ICdGMjAnLCBcbiAgICAxMzI6ICdGMjEnLCBcbiAgICAxMzM6ICdGMjInLCBcbiAgICAxMzQ6ICdGMjMnLCBcbiAgICAxMzU6ICdGMjQnLCBcbn0iLCJleHBvcnQgY29uc3QgY29uc29sZVByZWZpeCA9ICdTd2VldEFsZXJ0MjonXG5cbi8qKlxuICogRmlsdGVyIHRoZSB1bmlxdWUgdmFsdWVzIGludG8gYSBuZXcgYXJyYXlcbiAqIEBwYXJhbSBhcnJcbiAqL1xuZXhwb3J0IGNvbnN0IHVuaXF1ZUFycmF5ID0gKGFycikgPT4ge1xuICBjb25zdCByZXN1bHQgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChyZXN1bHQuaW5kZXhPZihhcnJbaV0pID09PSAtMSkge1xuICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQ2FwaXRhbGl6ZSB0aGUgZmlyc3QgbGV0dGVyIG9mIGEgc3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXG4gKiBAcmV0dXJucyB7c3RyaW5nfVxuICovXG5leHBvcnQgY29uc3QgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyID0gKHN0cikgPT4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpXG5cbi8qKlxuICogQHBhcmFtIHtOb2RlTGlzdCB8IEhUTUxDb2xsZWN0aW9uIHwgTmFtZWROb2RlTWFwfSBub2RlTGlzdFxuICogQHJldHVybnMge2FycmF5fVxuICovXG5leHBvcnQgY29uc3QgdG9BcnJheSA9IChub2RlTGlzdCkgPT4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwobm9kZUxpc3QpXG5cbi8qKlxuICogU3RhbmRhcmRpemUgY29uc29sZSB3YXJuaW5nc1xuICogQHBhcmFtIHtzdHJpbmcgfCBhcnJheX0gbWVzc2FnZVxuICovXG5leHBvcnQgY29uc3Qgd2FybiA9IChtZXNzYWdlKSA9PiB7XG4gIGNvbnNvbGUud2FybihgJHtjb25zb2xlUHJlZml4fSAke3R5cGVvZiBtZXNzYWdlID09PSAnb2JqZWN0JyA/IG1lc3NhZ2Uuam9pbignICcpIDogbWVzc2FnZX1gKVxufVxuXG4vKipcbiAqIFN0YW5kYXJkaXplIGNvbnNvbGUgZXJyb3JzXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICovXG5leHBvcnQgY29uc3QgZXJyb3IgPSAobWVzc2FnZSkgPT4ge1xuICBjb25zb2xlLmVycm9yKGAke2NvbnNvbGVQcmVmaXh9ICR7bWVzc2FnZX1gKVxufVxuXG4vKipcbiAqIFByaXZhdGUgZ2xvYmFsIHN0YXRlIGZvciBgd2Fybk9uY2VgXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBwcmV2aW91c1dhcm5PbmNlTWVzc2FnZXMgPSBbXVxuXG4vKipcbiAqIFNob3cgYSBjb25zb2xlIHdhcm5pbmcsIGJ1dCBvbmx5IGlmIGl0IGhhc24ndCBhbHJlYWR5IGJlZW4gc2hvd25cbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlXG4gKi9cbmV4cG9ydCBjb25zdCB3YXJuT25jZSA9IChtZXNzYWdlKSA9PiB7XG4gIGlmICghcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzLmluY2x1ZGVzKG1lc3NhZ2UpKSB7XG4gICAgcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzLnB1c2gobWVzc2FnZSlcbiAgICB3YXJuKG1lc3NhZ2UpXG4gIH1cbn1cblxuLyoqXG4gKiBTaG93IGEgb25lLXRpbWUgY29uc29sZSB3YXJuaW5nIGFib3V0IGRlcHJlY2F0ZWQgcGFyYW1zL21ldGhvZHNcbiAqL1xuZXhwb3J0IGNvbnN0IHdhcm5BYm91dERlcHJlY2F0aW9uID0gKGRlcHJlY2F0ZWRQYXJhbSwgdXNlSW5zdGVhZCkgPT4ge1xuICB3YXJuT25jZShcbiAgICBgXCIke2RlcHJlY2F0ZWRQYXJhbX1cIiBpcyBkZXByZWNhdGVkIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdGhlIG5leHQgbWFqb3IgcmVsZWFzZS4gUGxlYXNlIHVzZSBcIiR7dXNlSW5zdGVhZH1cIiBpbnN0ZWFkLmBcbiAgKVxufVxuXG4vKipcbiAqIElmIGBhcmdgIGlzIGEgZnVuY3Rpb24sIGNhbGwgaXQgKHdpdGggbm8gYXJndW1lbnRzIG9yIGNvbnRleHQpIGFuZCByZXR1cm4gdGhlIHJlc3VsdC5cbiAqIE90aGVyd2lzZSwganVzdCBwYXNzIHRoZSB2YWx1ZSB0aHJvdWdoXG4gKiBAcGFyYW0gYXJnXG4gKi9cbmV4cG9ydCBjb25zdCBjYWxsSWZGdW5jdGlvbiA9IChhcmcpID0+ICh0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nID8gYXJnKCkgOiBhcmcpXG5cbmV4cG9ydCBjb25zdCBoYXNUb1Byb21pc2VGbiA9IChhcmcpID0+IGFyZyAmJiB0eXBlb2YgYXJnLnRvUHJvbWlzZSA9PT0gJ2Z1bmN0aW9uJ1xuXG5leHBvcnQgY29uc3QgYXNQcm9taXNlID0gKGFyZykgPT4gKGhhc1RvUHJvbWlzZUZuKGFyZykgPyBhcmcudG9Qcm9taXNlKCkgOiBQcm9taXNlLnJlc29sdmUoYXJnKSlcblxuZXhwb3J0IGNvbnN0IGlzUHJvbWlzZSA9IChhcmcpID0+IGFyZyAmJiBQcm9taXNlLnJlc29sdmUoYXJnKSA9PT0gYXJnXG4iLCJpbXBvcnQgeyB3YXJuLCB3YXJuQWJvdXREZXByZWNhdGlvbiB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdFBhcmFtcyA9IHtcbiAgdGl0bGU6ICcnLFxuICB0aXRsZVRleHQ6ICcnLFxuICB0ZXh0OiAnJyxcbiAgaHRtbDogJycsXG4gIGZvb3RlcjogJycsXG4gIGljb246IHVuZGVmaW5lZCxcbiAgaWNvbkNvbG9yOiB1bmRlZmluZWQsXG4gIGljb25IdG1sOiB1bmRlZmluZWQsXG4gIHRlbXBsYXRlOiB1bmRlZmluZWQsXG4gIHRvYXN0OiBmYWxzZSxcbiAgc2hvd0NsYXNzOiB7XG4gICAgcG9wdXA6ICdzd2FsMi1zaG93JyxcbiAgICBiYWNrZHJvcDogJ3N3YWwyLWJhY2tkcm9wLXNob3cnLFxuICAgIGljb246ICdzd2FsMi1pY29uLXNob3cnLFxuICB9LFxuICBoaWRlQ2xhc3M6IHtcbiAgICBwb3B1cDogJ3N3YWwyLWhpZGUnLFxuICAgIGJhY2tkcm9wOiAnc3dhbDItYmFja2Ryb3AtaGlkZScsXG4gICAgaWNvbjogJ3N3YWwyLWljb24taGlkZScsXG4gIH0sXG4gIGN1c3RvbUNsYXNzOiB7fSxcbiAgdGFyZ2V0OiAnYm9keScsXG4gIGNvbG9yOiB1bmRlZmluZWQsXG4gIGJhY2tkcm9wOiB0cnVlLFxuICBoZWlnaHRBdXRvOiB0cnVlLFxuICBhbGxvd091dHNpZGVDbGljazogdHJ1ZSxcbiAgYWxsb3dFc2NhcGVLZXk6IHRydWUsXG4gIGFsbG93RW50ZXJLZXk6IHRydWUsXG4gIHN0b3BLZXlkb3duUHJvcGFnYXRpb246IHRydWUsXG4gIGtleWRvd25MaXN0ZW5lckNhcHR1cmU6IGZhbHNlLFxuICBzaG93Q29uZmlybUJ1dHRvbjogdHJ1ZSxcbiAgc2hvd0RlbnlCdXR0b246IGZhbHNlLFxuICBzaG93Q2FuY2VsQnV0dG9uOiBmYWxzZSxcbiAgcHJlQ29uZmlybTogdW5kZWZpbmVkLFxuICBwcmVEZW55OiB1bmRlZmluZWQsXG4gIGNvbmZpcm1CdXR0b25UZXh0OiAnT0snLFxuICBjb25maXJtQnV0dG9uQXJpYUxhYmVsOiAnJyxcbiAgY29uZmlybUJ1dHRvbkNvbG9yOiB1bmRlZmluZWQsXG4gIGRlbnlCdXR0b25UZXh0OiAnTm8nLFxuICBkZW55QnV0dG9uQXJpYUxhYmVsOiAnJyxcbiAgZGVueUJ1dHRvbkNvbG9yOiB1bmRlZmluZWQsXG4gIGNhbmNlbEJ1dHRvblRleHQ6ICdDYW5jZWwnLFxuICBjYW5jZWxCdXR0b25BcmlhTGFiZWw6ICcnLFxuICBjYW5jZWxCdXR0b25Db2xvcjogdW5kZWZpbmVkLFxuICBidXR0b25zU3R5bGluZzogdHJ1ZSxcbiAgcmV2ZXJzZUJ1dHRvbnM6IGZhbHNlLFxuICBmb2N1c0NvbmZpcm06IHRydWUsXG4gIGZvY3VzRGVueTogZmFsc2UsXG4gIGZvY3VzQ2FuY2VsOiBmYWxzZSxcbiAgcmV0dXJuRm9jdXM6IHRydWUsXG4gIHNob3dDbG9zZUJ1dHRvbjogZmFsc2UsXG4gIGNsb3NlQnV0dG9uSHRtbDogJyZ0aW1lczsnLFxuICBjbG9zZUJ1dHRvbkFyaWFMYWJlbDogJ0Nsb3NlIHRoaXMgZGlhbG9nJyxcbiAgbG9hZGVySHRtbDogJycsXG4gIHNob3dMb2FkZXJPbkNvbmZpcm06IGZhbHNlLFxuICBzaG93TG9hZGVyT25EZW55OiBmYWxzZSxcbiAgaW1hZ2VVcmw6IHVuZGVmaW5lZCxcbiAgaW1hZ2VXaWR0aDogdW5kZWZpbmVkLFxuICBpbWFnZUhlaWdodDogdW5kZWZpbmVkLFxuICBpbWFnZUFsdDogJycsXG4gIHRpbWVyOiB1bmRlZmluZWQsXG4gIHRpbWVyUHJvZ3Jlc3NCYXI6IGZhbHNlLFxuICB3aWR0aDogdW5kZWZpbmVkLFxuICBwYWRkaW5nOiB1bmRlZmluZWQsXG4gIGJhY2tncm91bmQ6IHVuZGVmaW5lZCxcbiAgaW5wdXQ6IHVuZGVmaW5lZCxcbiAgaW5wdXRQbGFjZWhvbGRlcjogJycsXG4gIGlucHV0TGFiZWw6ICcnLFxuICBpbnB1dFZhbHVlOiAnJyxcbiAgaW5wdXRPcHRpb25zOiB7fSxcbiAgaW5wdXRBdXRvVHJpbTogdHJ1ZSxcbiAgaW5wdXRBdHRyaWJ1dGVzOiB7fSxcbiAgaW5wdXRWYWxpZGF0b3I6IHVuZGVmaW5lZCxcbiAgcmV0dXJuSW5wdXRWYWx1ZU9uRGVueTogZmFsc2UsXG4gIHZhbGlkYXRpb25NZXNzYWdlOiB1bmRlZmluZWQsXG4gIGdyb3c6IGZhbHNlLFxuICBwb3NpdGlvbjogJ2NlbnRlcicsXG4gIHByb2dyZXNzU3RlcHM6IFtdLFxuICBjdXJyZW50UHJvZ3Jlc3NTdGVwOiB1bmRlZmluZWQsXG4gIHByb2dyZXNzU3RlcHNEaXN0YW5jZTogdW5kZWZpbmVkLFxuICB3aWxsT3BlbjogdW5kZWZpbmVkLFxuICBkaWRPcGVuOiB1bmRlZmluZWQsXG4gIGRpZFJlbmRlcjogdW5kZWZpbmVkLFxuICB3aWxsQ2xvc2U6IHVuZGVmaW5lZCxcbiAgZGlkQ2xvc2U6IHVuZGVmaW5lZCxcbiAgZGlkRGVzdHJveTogdW5kZWZpbmVkLFxuICBzY3JvbGxiYXJQYWRkaW5nOiB0cnVlLFxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRhYmxlUGFyYW1zID0gW1xuICAnYWxsb3dFc2NhcGVLZXknLFxuICAnYWxsb3dPdXRzaWRlQ2xpY2snLFxuICAnYmFja2dyb3VuZCcsXG4gICdidXR0b25zU3R5bGluZycsXG4gICdjYW5jZWxCdXR0b25BcmlhTGFiZWwnLFxuICAnY2FuY2VsQnV0dG9uQ29sb3InLFxuICAnY2FuY2VsQnV0dG9uVGV4dCcsXG4gICdjbG9zZUJ1dHRvbkFyaWFMYWJlbCcsXG4gICdjbG9zZUJ1dHRvbkh0bWwnLFxuICAnY29sb3InLFxuICAnY29uZmlybUJ1dHRvbkFyaWFMYWJlbCcsXG4gICdjb25maXJtQnV0dG9uQ29sb3InLFxuICAnY29uZmlybUJ1dHRvblRleHQnLFxuICAnY3VycmVudFByb2dyZXNzU3RlcCcsXG4gICdjdXN0b21DbGFzcycsXG4gICdkZW55QnV0dG9uQXJpYUxhYmVsJyxcbiAgJ2RlbnlCdXR0b25Db2xvcicsXG4gICdkZW55QnV0dG9uVGV4dCcsXG4gICdkaWRDbG9zZScsXG4gICdkaWREZXN0cm95JyxcbiAgJ2Zvb3RlcicsXG4gICdoaWRlQ2xhc3MnLFxuICAnaHRtbCcsXG4gICdpY29uJyxcbiAgJ2ljb25Db2xvcicsXG4gICdpY29uSHRtbCcsXG4gICdpbWFnZUFsdCcsXG4gICdpbWFnZUhlaWdodCcsXG4gICdpbWFnZVVybCcsXG4gICdpbWFnZVdpZHRoJyxcbiAgJ3ByZUNvbmZpcm0nLFxuICAncHJlRGVueScsXG4gICdwcm9ncmVzc1N0ZXBzJyxcbiAgJ3JldHVybkZvY3VzJyxcbiAgJ3JldmVyc2VCdXR0b25zJyxcbiAgJ3Nob3dDYW5jZWxCdXR0b24nLFxuICAnc2hvd0Nsb3NlQnV0dG9uJyxcbiAgJ3Nob3dDb25maXJtQnV0dG9uJyxcbiAgJ3Nob3dEZW55QnV0dG9uJyxcbiAgJ3RleHQnLFxuICAndGl0bGUnLFxuICAndGl0bGVUZXh0JyxcbiAgJ3dpbGxDbG9zZScsXG5dXG5cbmV4cG9ydCBjb25zdCBkZXByZWNhdGVkUGFyYW1zID0ge31cblxuY29uc3QgdG9hc3RJbmNvbXBhdGlibGVQYXJhbXMgPSBbXG4gICdhbGxvd091dHNpZGVDbGljaycsXG4gICdhbGxvd0VudGVyS2V5JyxcbiAgJ2JhY2tkcm9wJyxcbiAgJ2ZvY3VzQ29uZmlybScsXG4gICdmb2N1c0RlbnknLFxuICAnZm9jdXNDYW5jZWwnLFxuICAncmV0dXJuRm9jdXMnLFxuICAnaGVpZ2h0QXV0bycsXG4gICdrZXlkb3duTGlzdGVuZXJDYXB0dXJlJyxcbl1cblxuLyoqXG4gKiBJcyB2YWxpZCBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbU5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzVmFsaWRQYXJhbWV0ZXIgPSAocGFyYW1OYW1lKSA9PiB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZGVmYXVsdFBhcmFtcywgcGFyYW1OYW1lKVxufVxuXG4vKipcbiAqIElzIHZhbGlkIHBhcmFtZXRlciBmb3IgU3dhbC51cGRhdGUoKSBtZXRob2RcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbU5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzVXBkYXRhYmxlUGFyYW1ldGVyID0gKHBhcmFtTmFtZSkgPT4ge1xuICByZXR1cm4gdXBkYXRhYmxlUGFyYW1zLmluZGV4T2YocGFyYW1OYW1lKSAhPT0gLTFcbn1cblxuLyoqXG4gKiBJcyBkZXByZWNhdGVkIHBhcmFtZXRlclxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtTmFtZVxuICovXG5leHBvcnQgY29uc3QgaXNEZXByZWNhdGVkUGFyYW1ldGVyID0gKHBhcmFtTmFtZSkgPT4ge1xuICByZXR1cm4gZGVwcmVjYXRlZFBhcmFtc1twYXJhbU5hbWVdXG59XG5cbmNvbnN0IGNoZWNrSWZQYXJhbUlzVmFsaWQgPSAocGFyYW0pID0+IHtcbiAgaWYgKCFpc1ZhbGlkUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgIHdhcm4oYFVua25vd24gcGFyYW1ldGVyIFwiJHtwYXJhbX1cImApXG4gIH1cbn1cblxuY29uc3QgY2hlY2tJZlRvYXN0UGFyYW1Jc1ZhbGlkID0gKHBhcmFtKSA9PiB7XG4gIGlmICh0b2FzdEluY29tcGF0aWJsZVBhcmFtcy5pbmNsdWRlcyhwYXJhbSkpIHtcbiAgICB3YXJuKGBUaGUgcGFyYW1ldGVyIFwiJHtwYXJhbX1cIiBpcyBpbmNvbXBhdGlibGUgd2l0aCB0b2FzdHNgKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrSWZQYXJhbUlzRGVwcmVjYXRlZCA9IChwYXJhbSkgPT4ge1xuICBpZiAoaXNEZXByZWNhdGVkUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgIHdhcm5BYm91dERlcHJlY2F0aW9uKHBhcmFtLCBpc0RlcHJlY2F0ZWRQYXJhbWV0ZXIocGFyYW0pKVxuICB9XG59XG5cbi8qKlxuICogU2hvdyByZWxldmFudCB3YXJuaW5ncyBmb3IgZ2l2ZW4gcGFyYW1zXG4gKlxuICogQHBhcmFtIHBhcmFtc1xuICovXG5leHBvcnQgY29uc3Qgc2hvd1dhcm5pbmdzRm9yUGFyYW1zID0gKHBhcmFtcykgPT4ge1xuICBpZiAoIXBhcmFtcy5iYWNrZHJvcCAmJiBwYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spIHtcbiAgICB3YXJuKCdcImFsbG93T3V0c2lkZUNsaWNrXCIgcGFyYW1ldGVyIHJlcXVpcmVzIGBiYWNrZHJvcGAgcGFyYW1ldGVyIHRvIGJlIHNldCB0byBgdHJ1ZWAnKVxuICB9XG5cbiAgZm9yIChjb25zdCBwYXJhbSBpbiBwYXJhbXMpIHtcbiAgICBjaGVja0lmUGFyYW1Jc1ZhbGlkKHBhcmFtKVxuXG4gICAgaWYgKHBhcmFtcy50b2FzdCkge1xuICAgICAgY2hlY2tJZlRvYXN0UGFyYW1Jc1ZhbGlkKHBhcmFtKVxuICAgIH1cblxuICAgIGNoZWNrSWZQYXJhbUlzRGVwcmVjYXRlZChwYXJhbSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZhdWx0UGFyYW1zXG4iLCJleHBvcnQgY29uc3Qgc3dhbFByZWZpeCA9ICdzd2FsMi0nXG5cbmV4cG9ydCBjb25zdCBwcmVmaXggPSAoaXRlbXMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgZm9yIChjb25zdCBpIGluIGl0ZW1zKSB7XG4gICAgcmVzdWx0W2l0ZW1zW2ldXSA9IHN3YWxQcmVmaXggKyBpdGVtc1tpXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGNvbnN0IHN3YWxDbGFzc2VzID0gcHJlZml4KFtcbiAgJ2NvbnRhaW5lcicsXG4gICdzaG93bicsXG4gICdoZWlnaHQtYXV0bycsXG4gICdpb3NmaXgnLFxuICAncG9wdXAnLFxuICAnbW9kYWwnLFxuICAnbm8tYmFja2Ryb3AnLFxuICAnbm8tdHJhbnNpdGlvbicsXG4gICd0b2FzdCcsXG4gICd0b2FzdC1zaG93bicsXG4gICdzaG93JyxcbiAgJ2hpZGUnLFxuICAnY2xvc2UnLFxuICAndGl0bGUnLFxuICAnaHRtbC1jb250YWluZXInLFxuICAnYWN0aW9ucycsXG4gICdjb25maXJtJyxcbiAgJ2RlbnknLFxuICAnY2FuY2VsJyxcbiAgJ2RlZmF1bHQtb3V0bGluZScsXG4gICdmb290ZXInLFxuICAnaWNvbicsXG4gICdpY29uLWNvbnRlbnQnLFxuICAnaW1hZ2UnLFxuICAnaW5wdXQnLFxuICAnZmlsZScsXG4gICdyYW5nZScsXG4gICdzZWxlY3QnLFxuICAncmFkaW8nLFxuICAnY2hlY2tib3gnLFxuICAnbGFiZWwnLFxuICAndGV4dGFyZWEnLFxuICAnaW5wdXRlcnJvcicsXG4gICdpbnB1dC1sYWJlbCcsXG4gICd2YWxpZGF0aW9uLW1lc3NhZ2UnLFxuICAncHJvZ3Jlc3Mtc3RlcHMnLFxuICAnYWN0aXZlLXByb2dyZXNzLXN0ZXAnLFxuICAncHJvZ3Jlc3Mtc3RlcCcsXG4gICdwcm9ncmVzcy1zdGVwLWxpbmUnLFxuICAnbG9hZGVyJyxcbiAgJ2xvYWRpbmcnLFxuICAnc3R5bGVkJyxcbiAgJ3RvcCcsXG4gICd0b3Atc3RhcnQnLFxuICAndG9wLWVuZCcsXG4gICd0b3AtbGVmdCcsXG4gICd0b3AtcmlnaHQnLFxuICAnY2VudGVyJyxcbiAgJ2NlbnRlci1zdGFydCcsXG4gICdjZW50ZXItZW5kJyxcbiAgJ2NlbnRlci1sZWZ0JyxcbiAgJ2NlbnRlci1yaWdodCcsXG4gICdib3R0b20nLFxuICAnYm90dG9tLXN0YXJ0JyxcbiAgJ2JvdHRvbS1lbmQnLFxuICAnYm90dG9tLWxlZnQnLFxuICAnYm90dG9tLXJpZ2h0JyxcbiAgJ2dyb3ctcm93JyxcbiAgJ2dyb3ctY29sdW1uJyxcbiAgJ2dyb3ctZnVsbHNjcmVlbicsXG4gICdydGwnLFxuICAndGltZXItcHJvZ3Jlc3MtYmFyJyxcbiAgJ3RpbWVyLXByb2dyZXNzLWJhci1jb250YWluZXInLFxuICAnc2Nyb2xsYmFyLW1lYXN1cmUnLFxuICAnaWNvbi1zdWNjZXNzJyxcbiAgJ2ljb24td2FybmluZycsXG4gICdpY29uLWluZm8nLFxuICAnaWNvbi1xdWVzdGlvbicsXG4gICdpY29uLWVycm9yJyxcbl0pXG5cbmV4cG9ydCBjb25zdCBpY29uVHlwZXMgPSBwcmVmaXgoWydzdWNjZXNzJywgJ3dhcm5pbmcnLCAnaW5mbycsICdxdWVzdGlvbicsICdlcnJvciddKVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgdG9BcnJheSwgdW5pcXVlQXJyYXkgfSBmcm9tICcuLi91dGlscy5qcydcbmltcG9ydCB7IGhhc0NsYXNzLCBpc1Zpc2libGUgfSBmcm9tICcuL2RvbVV0aWxzLmpzJ1xuXG4vKipcbiAqIEdldHMgdGhlIHBvcHVwIGNvbnRhaW5lciB3aGljaCBjb250YWlucyB0aGUgYmFja2Ryb3AgYW5kIHRoZSBwb3B1cCBpdHNlbGYuXG4gKlxuICogQHJldHVybnMge0hUTUxFbGVtZW50IHwgbnVsbH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldENvbnRhaW5lciA9ICgpID0+IGRvY3VtZW50LmJvZHkucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMuY29udGFpbmVyfWApXG5cbmV4cG9ydCBjb25zdCBlbGVtZW50QnlTZWxlY3RvciA9IChzZWxlY3RvclN0cmluZykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBnZXRDb250YWluZXIoKVxuICByZXR1cm4gY29udGFpbmVyID8gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3JTdHJpbmcpIDogbnVsbFxufVxuXG5jb25zdCBlbGVtZW50QnlDbGFzcyA9IChjbGFzc05hbWUpID0+IHtcbiAgcmV0dXJuIGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtjbGFzc05hbWV9YClcbn1cblxuZXhwb3J0IGNvbnN0IGdldFBvcHVwID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMucG9wdXApXG5cbmV4cG9ydCBjb25zdCBnZXRJY29uID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuaWNvbilcblxuZXhwb3J0IGNvbnN0IGdldFRpdGxlID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMudGl0bGUpXG5cbmV4cG9ydCBjb25zdCBnZXRIdG1sQ29udGFpbmVyID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ2h0bWwtY29udGFpbmVyJ10pXG5cbmV4cG9ydCBjb25zdCBnZXRJbWFnZSA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmltYWdlKVxuXG5leHBvcnQgY29uc3QgZ2V0UHJvZ3Jlc3NTdGVwcyA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWydwcm9ncmVzcy1zdGVwcyddKVxuXG5leHBvcnQgY29uc3QgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ10pXG5cbmV4cG9ydCBjb25zdCBnZXRDb25maXJtQnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmFjdGlvbnN9IC4ke3N3YWxDbGFzc2VzLmNvbmZpcm19YClcblxuZXhwb3J0IGNvbnN0IGdldERlbnlCdXR0b24gPSAoKSA9PiBlbGVtZW50QnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMuYWN0aW9uc30gLiR7c3dhbENsYXNzZXMuZGVueX1gKVxuXG5leHBvcnQgY29uc3QgZ2V0SW5wdXRMYWJlbCA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWydpbnB1dC1sYWJlbCddKVxuXG5leHBvcnQgY29uc3QgZ2V0TG9hZGVyID0gKCkgPT4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmxvYWRlcn1gKVxuXG5leHBvcnQgY29uc3QgZ2V0Q2FuY2VsQnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmFjdGlvbnN9IC4ke3N3YWxDbGFzc2VzLmNhbmNlbH1gKVxuXG5leHBvcnQgY29uc3QgZ2V0QWN0aW9ucyA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmFjdGlvbnMpXG5cbmV4cG9ydCBjb25zdCBnZXRGb290ZXIgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5mb290ZXIpXG5cbmV4cG9ydCBjb25zdCBnZXRUaW1lclByb2dyZXNzQmFyID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ3RpbWVyLXByb2dyZXNzLWJhciddKVxuXG5leHBvcnQgY29uc3QgZ2V0Q2xvc2VCdXR0b24gPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5jbG9zZSlcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2prdXAvZm9jdXNhYmxlL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5jb25zdCBmb2N1c2FibGUgPSBgXG4gIGFbaHJlZl0sXG4gIGFyZWFbaHJlZl0sXG4gIGlucHV0Om5vdChbZGlzYWJsZWRdKSxcbiAgc2VsZWN0Om5vdChbZGlzYWJsZWRdKSxcbiAgdGV4dGFyZWE6bm90KFtkaXNhYmxlZF0pLFxuICBidXR0b246bm90KFtkaXNhYmxlZF0pLFxuICBpZnJhbWUsXG4gIG9iamVjdCxcbiAgZW1iZWQsXG4gIFt0YWJpbmRleD1cIjBcIl0sXG4gIFtjb250ZW50ZWRpdGFibGVdLFxuICBhdWRpb1tjb250cm9sc10sXG4gIHZpZGVvW2NvbnRyb2xzXSxcbiAgc3VtbWFyeVxuYFxuXG5leHBvcnQgY29uc3QgZ2V0Rm9jdXNhYmxlRWxlbWVudHMgPSAoKSA9PiB7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzV2l0aFRhYmluZGV4ID0gdG9BcnJheShcbiAgICBnZXRQb3B1cCgpLnF1ZXJ5U2VsZWN0b3JBbGwoJ1t0YWJpbmRleF06bm90KFt0YWJpbmRleD1cIi0xXCJdKTpub3QoW3RhYmluZGV4PVwiMFwiXSknKVxuICApXG4gICAgLy8gc29ydCBhY2NvcmRpbmcgdG8gdGFiaW5kZXhcbiAgICAuc29ydCgoYSwgYikgPT4ge1xuICAgICAgY29uc3QgdGFiaW5kZXhBID0gcGFyc2VJbnQoYS5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICBjb25zdCB0YWJpbmRleEIgPSBwYXJzZUludChiLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSlcbiAgICAgIGlmICh0YWJpbmRleEEgPiB0YWJpbmRleEIpIHtcbiAgICAgICAgcmV0dXJuIDFcbiAgICAgIH0gZWxzZSBpZiAodGFiaW5kZXhBIDwgdGFiaW5kZXhCKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgcmV0dXJuIDBcbiAgICB9KVxuXG4gIGNvbnN0IG90aGVyRm9jdXNhYmxlRWxlbWVudHMgPSB0b0FycmF5KGdldFBvcHVwKCkucXVlcnlTZWxlY3RvckFsbChmb2N1c2FibGUpKS5maWx0ZXIoXG4gICAgKGVsKSA9PiBlbC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykgIT09ICctMSdcbiAgKVxuXG4gIHJldHVybiB1bmlxdWVBcnJheShmb2N1c2FibGVFbGVtZW50c1dpdGhUYWJpbmRleC5jb25jYXQob3RoZXJGb2N1c2FibGVFbGVtZW50cykpLmZpbHRlcigoZWwpID0+IGlzVmlzaWJsZShlbCkpXG59XG5cbmV4cG9ydCBjb25zdCBpc01vZGFsID0gKCkgPT4ge1xuICByZXR1cm4gKFxuICAgIGhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLnNob3duKSAmJlxuICAgICFoYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXSkgJiZcbiAgICAhaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10pXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IGlzVG9hc3QgPSAoKSA9PiB7XG4gIHJldHVybiBnZXRQb3B1cCgpICYmIGhhc0NsYXNzKGdldFBvcHVwKCksIHN3YWxDbGFzc2VzLnRvYXN0KVxufVxuXG5leHBvcnQgY29uc3QgaXNMb2FkaW5nID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0UG9wdXAoKS5oYXNBdHRyaWJ1dGUoJ2RhdGEtbG9hZGluZycpXG59XG4iLCJpbXBvcnQgeyBnZXRDYW5jZWxCdXR0b24sIGdldENvbmZpcm1CdXR0b24sIGdldERlbnlCdXR0b24sIGdldFRpbWVyUHJvZ3Jlc3NCYXIgfSBmcm9tICcuL2dldHRlcnMuanMnXG5pbXBvcnQgeyBpY29uVHlwZXMsIHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHRvQXJyYXksIHdhcm4gfSBmcm9tICcuLi91dGlscy5qcydcblxuLy8gUmVtZW1iZXIgc3RhdGUgaW4gY2FzZXMgd2hlcmUgb3BlbmluZyBhbmQgaGFuZGxpbmcgYSBtb2RhbCB3aWxsIGZpZGRsZSB3aXRoIGl0LlxuZXhwb3J0IGNvbnN0IHN0YXRlcyA9IHtcbiAgcHJldmlvdXNCb2R5UGFkZGluZzogbnVsbCxcbn1cblxuLyoqXG4gKiBTZWN1cmVseSBzZXQgaW5uZXJIVE1MIG9mIGFuIGVsZW1lbnRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTkyNlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBodG1sXG4gKi9cbmV4cG9ydCBjb25zdCBzZXRJbm5lckh0bWwgPSAoZWxlbSwgaHRtbCkgPT4ge1xuICBlbGVtLnRleHRDb250ZW50ID0gJydcbiAgaWYgKGh0bWwpIHtcbiAgICBjb25zdCBwYXJzZXIgPSBuZXcgRE9NUGFyc2VyKClcbiAgICBjb25zdCBwYXJzZWQgPSBwYXJzZXIucGFyc2VGcm9tU3RyaW5nKGh0bWwsIGB0ZXh0L2h0bWxgKVxuICAgIHRvQXJyYXkocGFyc2VkLnF1ZXJ5U2VsZWN0b3IoJ2hlYWQnKS5jaGlsZE5vZGVzKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICAgIHRvQXJyYXkocGFyc2VkLnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jaGlsZE5vZGVzKS5mb3JFYWNoKChjaGlsZCkgPT4ge1xuICAgICAgZWxlbS5hcHBlbmRDaGlsZChjaGlsZClcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IGNsYXNzTmFtZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmV4cG9ydCBjb25zdCBoYXNDbGFzcyA9IChlbGVtLCBjbGFzc05hbWUpID0+IHtcbiAgaWYgKCFjbGFzc05hbWUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBjb25zdCBjbGFzc0xpc3QgPSBjbGFzc05hbWUuc3BsaXQoL1xccysvKVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIGlmICghZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NMaXN0W2ldKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHJlbW92ZUN1c3RvbUNsYXNzZXMgPSAoZWxlbSwgcGFyYW1zKSA9PiB7XG4gIHRvQXJyYXkoZWxlbS5jbGFzc0xpc3QpLmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgIGlmIChcbiAgICAgICFPYmplY3QudmFsdWVzKHN3YWxDbGFzc2VzKS5pbmNsdWRlcyhjbGFzc05hbWUpICYmXG4gICAgICAhT2JqZWN0LnZhbHVlcyhpY29uVHlwZXMpLmluY2x1ZGVzKGNsYXNzTmFtZSkgJiZcbiAgICAgICFPYmplY3QudmFsdWVzKHBhcmFtcy5zaG93Q2xhc3MpLmluY2x1ZGVzKGNsYXNzTmFtZSlcbiAgICApIHtcbiAgICAgIGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgfVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgYXBwbHlDdXN0b21DbGFzcyA9IChlbGVtLCBwYXJhbXMsIGNsYXNzTmFtZSkgPT4ge1xuICByZW1vdmVDdXN0b21DbGFzc2VzKGVsZW0sIHBhcmFtcylcblxuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzICYmIHBhcmFtcy5jdXN0b21DbGFzc1tjbGFzc05hbWVdKSB7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXSAhPT0gJ3N0cmluZycgJiYgIXBhcmFtcy5jdXN0b21DbGFzc1tjbGFzc05hbWVdLmZvckVhY2gpIHtcbiAgICAgIHJldHVybiB3YXJuKFxuICAgICAgICBgSW52YWxpZCB0eXBlIG9mIGN1c3RvbUNsYXNzLiR7Y2xhc3NOYW1lfSEgRXhwZWN0ZWQgc3RyaW5nIG9yIGl0ZXJhYmxlIG9iamVjdCwgZ290IFwiJHt0eXBlb2YgcGFyYW1zLmN1c3RvbUNsYXNzW1xuICAgICAgICAgIGNsYXNzTmFtZVxuICAgICAgICBdfVwiYFxuICAgICAgKVxuICAgIH1cblxuICAgIGFkZENsYXNzKGVsZW0sIHBhcmFtcy5jdXN0b21DbGFzc1tjbGFzc05hbWVdKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wdXBcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dFR5cGVcbiAqIEByZXR1cm5zIHtIVE1MSW5wdXRFbGVtZW50IHwgbnVsbH1cbiAqL1xuZXhwb3J0IGNvbnN0IGdldElucHV0ID0gKHBvcHVwLCBpbnB1dFR5cGUpID0+IHtcbiAgaWYgKCFpbnB1dFR5cGUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHN3aXRjaCAoaW5wdXRUeXBlKSB7XG4gICAgY2FzZSAnc2VsZWN0JzpcbiAgICBjYXNlICd0ZXh0YXJlYSc6XG4gICAgY2FzZSAnZmlsZSc6XG4gICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXNbaW5wdXRUeXBlXX1gKVxuICAgIGNhc2UgJ2NoZWNrYm94JzpcbiAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH0gaW5wdXRgKVxuICAgIGNhc2UgJ3JhZGlvJzpcbiAgICAgIHJldHVybiAoXG4gICAgICAgIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLnJhZGlvfSBpbnB1dDpjaGVja2VkYCkgfHxcbiAgICAgICAgcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMucmFkaW99IGlucHV0OmZpcnN0LWNoaWxkYClcbiAgICAgIClcbiAgICBjYXNlICdyYW5nZSc6XG4gICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMucmFuZ2V9IGlucHV0YClcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLmlucHV0fWApXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxJbnB1dEVsZW1lbnR9IGlucHV0XG4gKi9cbmV4cG9ydCBjb25zdCBmb2N1c0lucHV0ID0gKGlucHV0KSA9PiB7XG4gIGlucHV0LmZvY3VzKClcblxuICAvLyBwbGFjZSBjdXJzb3IgYXQgZW5kIG9mIHRleHQgaW4gdGV4dCBpbnB1dFxuICBpZiAoaW5wdXQudHlwZSAhPT0gJ2ZpbGUnKSB7XG4gICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjM0NTkxNVxuICAgIGNvbnN0IHZhbCA9IGlucHV0LnZhbHVlXG4gICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgIGlucHV0LnZhbHVlID0gdmFsXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGx9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gY2xhc3NMaXN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmRpdGlvblxuICovXG5leHBvcnQgY29uc3QgdG9nZ2xlQ2xhc3MgPSAodGFyZ2V0LCBjbGFzc0xpc3QsIGNvbmRpdGlvbikgPT4ge1xuICBpZiAoIXRhcmdldCB8fCAhY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHR5cGVvZiBjbGFzc0xpc3QgPT09ICdzdHJpbmcnKSB7XG4gICAgY2xhc3NMaXN0ID0gY2xhc3NMaXN0LnNwbGl0KC9cXHMrLykuZmlsdGVyKEJvb2xlYW4pXG4gIH1cbiAgY2xhc3NMaXN0LmZvckVhY2goKGNsYXNzTmFtZSkgPT4ge1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkpIHtcbiAgICAgIHRhcmdldC5mb3JFYWNoKChlbGVtKSA9PiB7XG4gICAgICAgIGNvbmRpdGlvbiA/IGVsZW0uY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpIDogZWxlbS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmRpdGlvbiA/IHRhcmdldC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSkgOiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudFtdIHwgbnVsbH0gdGFyZ2V0XG4gKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBjbGFzc0xpc3RcbiAqL1xuZXhwb3J0IGNvbnN0IGFkZENsYXNzID0gKHRhcmdldCwgY2xhc3NMaXN0KSA9PiB7XG4gIHRvZ2dsZUNsYXNzKHRhcmdldCwgY2xhc3NMaXN0LCB0cnVlKVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnQgfCBIVE1MRWxlbWVudFtdIHwgbnVsbH0gdGFyZ2V0XG4gKiBAcGFyYW0ge3N0cmluZyB8IHN0cmluZ1tdfSBjbGFzc0xpc3RcbiAqL1xuZXhwb3J0IGNvbnN0IHJlbW92ZUNsYXNzID0gKHRhcmdldCwgY2xhc3NMaXN0KSA9PiB7XG4gIHRvZ2dsZUNsYXNzKHRhcmdldCwgY2xhc3NMaXN0LCBmYWxzZSlcbn1cblxuLyoqXG4gKiBHZXQgZGlyZWN0IGNoaWxkIG9mIGFuIGVsZW1lbnQgYnkgY2xhc3MgbmFtZVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MgPSAoZWxlbSwgY2xhc3NOYW1lKSA9PiB7XG4gIGNvbnN0IGNoaWxkTm9kZXMgPSB0b0FycmF5KGVsZW0uY2hpbGROb2RlcylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKGhhc0NsYXNzKGNoaWxkTm9kZXNbaV0sIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBjaGlsZE5vZGVzW2ldXG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IHByb3BlcnR5XG4gKiBAcGFyYW0geyp9IHZhbHVlXG4gKi9cbmV4cG9ydCBjb25zdCBhcHBseU51bWVyaWNhbFN0eWxlID0gKGVsZW0sIHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICBpZiAodmFsdWUgPT09IGAke3BhcnNlSW50KHZhbHVlKX1gKSB7XG4gICAgdmFsdWUgPSBwYXJzZUludCh2YWx1ZSlcbiAgfVxuICBpZiAodmFsdWUgfHwgcGFyc2VJbnQodmFsdWUpID09PSAwKSB7XG4gICAgZWxlbS5zdHlsZVtwcm9wZXJ0eV0gPSB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInID8gYCR7dmFsdWV9cHhgIDogdmFsdWVcbiAgfSBlbHNlIHtcbiAgICBlbGVtLnN0eWxlLnJlbW92ZVByb3BlcnR5KHByb3BlcnR5KVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IGRpc3BsYXlcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3cgPSAoZWxlbSwgZGlzcGxheSA9ICdmbGV4JykgPT4ge1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICovXG5leHBvcnQgY29uc3QgaGlkZSA9IChlbGVtKSA9PiB7XG4gIGVsZW0uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuXG5leHBvcnQgY29uc3Qgc2V0U3R5bGUgPSAocGFyZW50LCBzZWxlY3RvciwgcHJvcGVydHksIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGVsID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gIGlmIChlbCkge1xuICAgIGVsLnN0eWxlW3Byb3BlcnR5XSA9IHZhbHVlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHRvZ2dsZSA9IChlbGVtLCBjb25kaXRpb24sIGRpc3BsYXkpID0+IHtcbiAgY29uZGl0aW9uID8gc2hvdyhlbGVtLCBkaXNwbGF5KSA6IGhpZGUoZWxlbSlcbn1cblxuLy8gYm9ycm93ZWQgZnJvbSBqcXVlcnkgJChlbGVtKS5pcygnOnZpc2libGUnKSBpbXBsZW1lbnRhdGlvblxuZXhwb3J0IGNvbnN0IGlzVmlzaWJsZSA9IChlbGVtKSA9PiAhIShlbGVtICYmIChlbGVtLm9mZnNldFdpZHRoIHx8IGVsZW0ub2Zmc2V0SGVpZ2h0IHx8IGVsZW0uZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpKVxuXG5leHBvcnQgY29uc3QgYWxsQnV0dG9uc0FyZUhpZGRlbiA9ICgpID0+XG4gICFpc1Zpc2libGUoZ2V0Q29uZmlybUJ1dHRvbigpKSAmJiAhaXNWaXNpYmxlKGdldERlbnlCdXR0b24oKSkgJiYgIWlzVmlzaWJsZShnZXRDYW5jZWxCdXR0b24oKSlcblxuZXhwb3J0IGNvbnN0IGlzU2Nyb2xsYWJsZSA9IChlbGVtKSA9PiAhIShlbGVtLnNjcm9sbEhlaWdodCA+IGVsZW0uY2xpZW50SGVpZ2h0KVxuXG4vLyBib3Jyb3dlZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vYS80NjM1MjExOVxuZXhwb3J0IGNvbnN0IGhhc0Nzc0FuaW1hdGlvbiA9IChlbGVtKSA9PiB7XG4gIGNvbnN0IHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbSlcblxuICBjb25zdCBhbmltRHVyYXRpb24gPSBwYXJzZUZsb2F0KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2FuaW1hdGlvbi1kdXJhdGlvbicpIHx8ICcwJylcbiAgY29uc3QgdHJhbnNEdXJhdGlvbiA9IHBhcnNlRmxvYXQoc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNpdGlvbi1kdXJhdGlvbicpIHx8ICcwJylcblxuICByZXR1cm4gYW5pbUR1cmF0aW9uID4gMCB8fCB0cmFuc0R1cmF0aW9uID4gMFxufVxuXG5leHBvcnQgY29uc3QgYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIgPSAodGltZXIsIHJlc2V0ID0gZmFsc2UpID0+IHtcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhciA9IGdldFRpbWVyUHJvZ3Jlc3NCYXIoKVxuICBpZiAoaXNWaXNpYmxlKHRpbWVyUHJvZ3Jlc3NCYXIpKSB7XG4gICAgaWYgKHJlc2V0KSB7XG4gICAgICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLnRyYW5zaXRpb24gPSAnbm9uZSdcbiAgICAgIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSAnMTAwJSdcbiAgICB9XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggJHt0aW1lciAvIDEwMDB9cyBsaW5lYXJgXG4gICAgICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzAlJ1xuICAgIH0sIDEwKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBzdG9wVGltZXJQcm9ncmVzc0JhciA9ICgpID0+IHtcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhciA9IGdldFRpbWVyUHJvZ3Jlc3NCYXIoKVxuICBjb25zdCB0aW1lclByb2dyZXNzQmFyV2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aW1lclByb2dyZXNzQmFyKS53aWR0aClcbiAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbicpXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSAnMTAwJSdcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhckZ1bGxXaWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRpbWVyUHJvZ3Jlc3NCYXIpLndpZHRoKVxuICBjb25zdCB0aW1lclByb2dyZXNzQmFyUGVyY2VudCA9ICh0aW1lclByb2dyZXNzQmFyV2lkdGggLyB0aW1lclByb2dyZXNzQmFyRnVsbFdpZHRoKSAqIDEwMFxuICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLnJlbW92ZVByb3BlcnR5KCd0cmFuc2l0aW9uJylcbiAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9IGAke3RpbWVyUHJvZ3Jlc3NCYXJQZXJjZW50fSVgXG59XG4iLCIvKipcbiAqIERldGVjdCBOb2RlIGVudlxuICpcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaXNOb2RlRW52ID0gKCkgPT4gdHlwZW9mIHdpbmRvdyA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJ1xuIiwiZXhwb3J0IGNvbnN0IFJFU1RPUkVfRk9DVVNfVElNRU9VVCA9IDEwMFxuIiwiaW1wb3J0IHsgUkVTVE9SRV9GT0NVU19USU1FT1VUIH0gZnJvbSAnLi9jb25zdGFudHMuanMnXG5cbmNvbnN0IGdsb2JhbFN0YXRlID0ge31cblxuZXhwb3J0IGRlZmF1bHQgZ2xvYmFsU3RhdGVcblxuY29uc3QgZm9jdXNQcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSAoKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgJiYgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKSB7XG4gICAgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50LmZvY3VzKClcbiAgICBnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBudWxsXG4gIH0gZWxzZSBpZiAoZG9jdW1lbnQuYm9keSkge1xuICAgIGRvY3VtZW50LmJvZHkuZm9jdXMoKVxuICB9XG59XG5cbi8vIFJlc3RvcmUgcHJldmlvdXMgYWN0aXZlIChmb2N1c2VkKSBlbGVtZW50XG5leHBvcnQgY29uc3QgcmVzdG9yZUFjdGl2ZUVsZW1lbnQgPSAocmV0dXJuRm9jdXMpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKCFyZXR1cm5Gb2N1cykge1xuICAgICAgcmV0dXJuIHJlc29sdmUoKVxuICAgIH1cbiAgICBjb25zdCB4ID0gd2luZG93LnNjcm9sbFhcbiAgICBjb25zdCB5ID0gd2luZG93LnNjcm9sbFlcblxuICAgIGdsb2JhbFN0YXRlLnJlc3RvcmVGb2N1c1RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGZvY3VzUHJldmlvdXNBY3RpdmVFbGVtZW50KClcbiAgICAgIHJlc29sdmUoKVxuICAgIH0sIFJFU1RPUkVfRk9DVVNfVElNRU9VVCkgLy8gaXNzdWVzLzkwMFxuXG4gICAgd2luZG93LnNjcm9sbFRvKHgsIHkpXG4gIH0pXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBnZXRDb250YWluZXIsIGdldFBvcHVwIH0gZnJvbSAnLi9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgYWRkQ2xhc3MsIGdldERpcmVjdENoaWxkQnlDbGFzcywgcmVtb3ZlQ2xhc3MsIHNldElubmVySHRtbCB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5pbXBvcnQgeyBpc05vZGVFbnYgfSBmcm9tICcuLi9pc05vZGVFbnYuanMnXG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJy4uL3V0aWxzLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4uLy4uL2dsb2JhbFN0YXRlLmpzJ1xuXG5jb25zdCBzd2VldEhUTUwgPSBgXG4gPGRpdiBhcmlhLWxhYmVsbGVkYnk9XCIke3N3YWxDbGFzc2VzLnRpdGxlfVwiIGFyaWEtZGVzY3JpYmVkYnk9XCIke3N3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddfVwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5wb3B1cH1cIiB0YWJpbmRleD1cIi0xXCI+XG4gICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY2xvc2V9XCI+PC9idXR0b24+XG4gICA8dWwgY2xhc3M9XCIke3N3YWxDbGFzc2VzWydwcm9ncmVzcy1zdGVwcyddfVwiPjwvdWw+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5pY29ufVwiPjwvZGl2PlxuICAgPGltZyBjbGFzcz1cIiR7c3dhbENsYXNzZXMuaW1hZ2V9XCIgLz5cbiAgIDxoMiBjbGFzcz1cIiR7c3dhbENsYXNzZXMudGl0bGV9XCIgaWQ9XCIke3N3YWxDbGFzc2VzLnRpdGxlfVwiPjwvaDI+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1snaHRtbC1jb250YWluZXInXX1cIiBpZD1cIiR7c3dhbENsYXNzZXNbJ2h0bWwtY29udGFpbmVyJ119XCI+PC9kaXY+XG4gICA8aW5wdXQgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmlucHV0fVwiIC8+XG4gICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuZmlsZX1cIiAvPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMucmFuZ2V9XCI+XG4gICAgIDxpbnB1dCB0eXBlPVwicmFuZ2VcIiAvPlxuICAgICA8b3V0cHV0Pjwvb3V0cHV0PlxuICAgPC9kaXY+XG4gICA8c2VsZWN0IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5zZWxlY3R9XCI+PC9zZWxlY3Q+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5yYWRpb31cIj48L2Rpdj5cbiAgIDxsYWJlbCBmb3I9XCIke3N3YWxDbGFzc2VzLmNoZWNrYm94fVwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH1cIj5cbiAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIC8+XG4gICAgIDxzcGFuIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5sYWJlbH1cIj48L3NwYW4+XG4gICA8L2xhYmVsPlxuICAgPHRleHRhcmVhIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy50ZXh0YXJlYX1cIj48L3RleHRhcmVhPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddfVwiIGlkPVwiJHtzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ119XCI+PC9kaXY+XG4gICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfVwiPlxuICAgICA8ZGl2IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5sb2FkZXJ9XCI+PC9kaXY+XG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5jb25maXJtfVwiPjwvYnV0dG9uPlxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuZGVueX1cIj48L2J1dHRvbj5cbiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmNhbmNlbH1cIj48L2J1dHRvbj5cbiAgIDwvZGl2PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuZm9vdGVyfVwiPjwvZGl2PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ3RpbWVyLXByb2dyZXNzLWJhci1jb250YWluZXInXX1cIj5cbiAgICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ3RpbWVyLXByb2dyZXNzLWJhciddfVwiPjwvZGl2PlxuICAgPC9kaXY+XG4gPC9kaXY+XG5gLnJlcGxhY2UoLyhefFxcbilcXHMqL2csICcnKVxuXG5jb25zdCByZXNldE9sZENvbnRhaW5lciA9ICgpID0+IHtcbiAgY29uc3Qgb2xkQ29udGFpbmVyID0gZ2V0Q29udGFpbmVyKClcbiAgaWYgKCFvbGRDb250YWluZXIpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIG9sZENvbnRhaW5lci5yZW1vdmUoKVxuICByZW1vdmVDbGFzcyhcbiAgICBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSxcbiAgICBbc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10sIHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddLCBzd2FsQ2xhc3Nlc1snaGFzLWNvbHVtbiddXVxuICApXG5cbiAgcmV0dXJuIHRydWVcbn1cblxuY29uc3QgcmVzZXRWYWxpZGF0aW9uTWVzc2FnZSA9ICgpID0+IHtcbiAgZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlLnJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxufVxuXG5jb25zdCBhZGRJbnB1dENoYW5nZUxpc3RlbmVycyA9ICgpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBnZXRQb3B1cCgpXG5cbiAgY29uc3QgaW5wdXQgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLmlucHV0KVxuICBjb25zdCBmaWxlID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5maWxlKVxuICBjb25zdCByYW5nZSA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnJhbmdlfSBpbnB1dGApXG4gIGNvbnN0IHJhbmdlT3V0cHV0ID0gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucmFuZ2V9IG91dHB1dGApXG4gIGNvbnN0IHNlbGVjdCA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuc2VsZWN0KVxuICBjb25zdCBjaGVja2JveCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmNoZWNrYm94fSBpbnB1dGApXG4gIGNvbnN0IHRleHRhcmVhID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy50ZXh0YXJlYSlcblxuICBpbnB1dC5vbmlucHV0ID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuICBmaWxlLm9uY2hhbmdlID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuICBzZWxlY3Qub25jaGFuZ2UgPSByZXNldFZhbGlkYXRpb25NZXNzYWdlXG4gIGNoZWNrYm94Lm9uY2hhbmdlID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuICB0ZXh0YXJlYS5vbmlucHV0ID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuXG4gIHJhbmdlLm9uaW5wdXQgPSAoKSA9PiB7XG4gICAgcmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgcmFuZ2VPdXRwdXQudmFsdWUgPSByYW5nZS52YWx1ZVxuICB9XG5cbiAgcmFuZ2Uub25jaGFuZ2UgPSAoKSA9PiB7XG4gICAgcmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpXG4gICAgcmFuZ2UubmV4dFNpYmxpbmcudmFsdWUgPSByYW5nZS52YWx1ZVxuICB9XG59XG5cbmNvbnN0IGdldFRhcmdldCA9ICh0YXJnZXQpID0+ICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KSA6IHRhcmdldClcblxuY29uc3Qgc2V0dXBBY2Nlc3NpYmlsaXR5ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBwb3B1cCA9IGdldFBvcHVwKClcblxuICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCBwYXJhbXMudG9hc3QgPyAnYWxlcnQnIDogJ2RpYWxvZycpXG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgnYXJpYS1saXZlJywgcGFyYW1zLnRvYXN0ID8gJ3BvbGl0ZScgOiAnYXNzZXJ0aXZlJylcbiAgaWYgKCFwYXJhbXMudG9hc3QpIHtcbiAgICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpXG4gIH1cbn1cblxuY29uc3Qgc2V0dXBSVEwgPSAodGFyZ2V0RWxlbWVudCkgPT4ge1xuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGFyZ2V0RWxlbWVudCkuZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgIGFkZENsYXNzKGdldENvbnRhaW5lcigpLCBzd2FsQ2xhc3Nlcy5ydGwpXG4gIH1cbn1cblxuLypcbiAqIEFkZCBtb2RhbCArIGJhY2tkcm9wIHRvIERPTVxuICovXG5leHBvcnQgY29uc3QgaW5pdCA9IChwYXJhbXMpID0+IHtcbiAgLy8gQ2xlYW4gdXAgdGhlIG9sZCBwb3B1cCBjb250YWluZXIgaWYgaXQgZXhpc3RzXG4gIGNvbnN0IG9sZENvbnRhaW5lckV4aXN0ZWQgPSByZXNldE9sZENvbnRhaW5lcigpXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc05vZGVFbnYoKSkge1xuICAgIGVycm9yKCdTd2VldEFsZXJ0MiByZXF1aXJlcyBkb2N1bWVudCB0byBpbml0aWFsaXplJylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGNvbnRhaW5lci5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlcy5jb250YWluZXJcbiAgaWYgKG9sZENvbnRhaW5lckV4aXN0ZWQpIHtcbiAgICBhZGRDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzWyduby10cmFuc2l0aW9uJ10pXG4gIH1cbiAgc2V0SW5uZXJIdG1sKGNvbnRhaW5lciwgc3dlZXRIVE1MKVxuXG4gIGNvbnN0IHRhcmdldEVsZW1lbnQgPSBnZXRUYXJnZXQocGFyYW1zLnRhcmdldClcbiAgdGFyZ2V0RWxlbWVudC5hcHBlbmRDaGlsZChjb250YWluZXIpXG5cbiAgc2V0dXBBY2Nlc3NpYmlsaXR5KHBhcmFtcylcbiAgc2V0dXBSVEwodGFyZ2V0RWxlbWVudClcbiAgYWRkSW5wdXRDaGFuZ2VMaXN0ZW5lcnMoKVxufVxuIiwiaW1wb3J0IHsgc2V0SW5uZXJIdG1sIH0gZnJvbSAnLi9kb21VdGlscy5qcydcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgb2JqZWN0IHwgc3RyaW5nfSBwYXJhbVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZUh0bWxUb0NvbnRhaW5lciA9IChwYXJhbSwgdGFyZ2V0KSA9PiB7XG4gIC8vIERPTSBlbGVtZW50XG4gIGlmIChwYXJhbSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50KSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKHBhcmFtKVxuICB9XG5cbiAgLy8gT2JqZWN0XG4gIGVsc2UgaWYgKHR5cGVvZiBwYXJhbSA9PT0gJ29iamVjdCcpIHtcbiAgICBoYW5kbGVPYmplY3QocGFyYW0sIHRhcmdldClcbiAgfVxuXG4gIC8vIFBsYWluIHN0cmluZ1xuICBlbHNlIGlmIChwYXJhbSkge1xuICAgIHNldElubmVySHRtbCh0YXJnZXQsIHBhcmFtKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtvYmplY3R9IHBhcmFtXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSB0YXJnZXRcbiAqL1xuY29uc3QgaGFuZGxlT2JqZWN0ID0gKHBhcmFtLCB0YXJnZXQpID0+IHtcbiAgLy8gSlF1ZXJ5IGVsZW1lbnQocylcbiAgaWYgKHBhcmFtLmpxdWVyeSkge1xuICAgIGhhbmRsZUpxdWVyeUVsZW0odGFyZ2V0LCBwYXJhbSlcbiAgfVxuXG4gIC8vIEZvciBvdGhlciBvYmplY3RzIHVzZSB0aGVpciBzdHJpbmcgcmVwcmVzZW50YXRpb25cbiAgZWxzZSB7XG4gICAgc2V0SW5uZXJIdG1sKHRhcmdldCwgcGFyYW0udG9TdHJpbmcoKSlcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVKcXVlcnlFbGVtID0gKHRhcmdldCwgZWxlbSkgPT4ge1xuICB0YXJnZXQudGV4dENvbnRlbnQgPSAnJ1xuICBpZiAoMCBpbiBlbGVtKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgaW4gZWxlbTsgaSsrKSB7XG4gICAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWxlbVtpXS5jbG9uZU5vZGUodHJ1ZSkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChlbGVtLmNsb25lTm9kZSh0cnVlKSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNOb2RlRW52IH0gZnJvbSAnLi4vaXNOb2RlRW52LmpzJ1xuXG5leHBvcnQgY29uc3QgYW5pbWF0aW9uRW5kRXZlbnQgPSAoKCkgPT4ge1xuICAvLyBQcmV2ZW50IHJ1biBpbiBOb2RlIGVudlxuICAvKiBpc3RhbmJ1bCBpZ25vcmUgaWYgKi9cbiAgaWYgKGlzTm9kZUVudigpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCB0ZXN0RWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb25zdCB0cmFuc0VuZEV2ZW50TmFtZXMgPSB7XG4gICAgV2Via2l0QW5pbWF0aW9uOiAnd2Via2l0QW5pbWF0aW9uRW5kJywgLy8gQ2hyb21lLCBTYWZhcmkgYW5kIE9wZXJhXG4gICAgYW5pbWF0aW9uOiAnYW5pbWF0aW9uZW5kJywgLy8gU3RhbmRhcmQgc3ludGF4XG4gIH1cbiAgZm9yIChjb25zdCBpIGluIHRyYW5zRW5kRXZlbnROYW1lcykge1xuICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodHJhbnNFbmRFdmVudE5hbWVzLCBpKSAmJiB0eXBlb2YgdGVzdEVsLnN0eWxlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuIHRyYW5zRW5kRXZlbnROYW1lc1tpXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufSkoKVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuXG4vLyBNZWFzdXJlIHNjcm9sbGJhciB3aWR0aCBmb3IgcGFkZGluZyBib2R5IGR1cmluZyBtb2RhbCBzaG93L2hpZGVcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9qcy9zcmMvbW9kYWwuanNcbmV4cG9ydCBjb25zdCBtZWFzdXJlU2Nyb2xsYmFyID0gKCkgPT4ge1xuICBjb25zdCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBzY3JvbGxEaXYuY2xhc3NOYW1lID0gc3dhbENsYXNzZXNbJ3Njcm9sbGJhci1tZWFzdXJlJ11cbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpXG4gIGNvbnN0IHNjcm9sbGJhcldpZHRoID0gc2Nyb2xsRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoIC0gc2Nyb2xsRGl2LmNsaWVudFdpZHRoXG4gIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoc2Nyb2xsRGl2KVxuICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgfSBmcm9tICcuLi8uLi91dGlscy5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckFjdGlvbnMgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBhY3Rpb25zID0gZG9tLmdldEFjdGlvbnMoKVxuICBjb25zdCBsb2FkZXIgPSBkb20uZ2V0TG9hZGVyKClcblxuICAvLyBBY3Rpb25zIChidXR0b25zKSB3cmFwcGVyXG4gIGlmICghcGFyYW1zLnNob3dDb25maXJtQnV0dG9uICYmICFwYXJhbXMuc2hvd0RlbnlCdXR0b24gJiYgIXBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uKSB7XG4gICAgZG9tLmhpZGUoYWN0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBkb20uc2hvdyhhY3Rpb25zKVxuICB9XG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGFjdGlvbnMsIHBhcmFtcywgJ2FjdGlvbnMnKVxuXG4gIC8vIFJlbmRlciBhbGwgdGhlIGJ1dHRvbnNcbiAgcmVuZGVyQnV0dG9ucyhhY3Rpb25zLCBsb2FkZXIsIHBhcmFtcylcblxuICAvLyBMb2FkZXJcbiAgZG9tLnNldElubmVySHRtbChsb2FkZXIsIHBhcmFtcy5sb2FkZXJIdG1sKVxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhsb2FkZXIsIHBhcmFtcywgJ2xvYWRlcicpXG59XG5cbmZ1bmN0aW9uIHJlbmRlckJ1dHRvbnMoYWN0aW9ucywgbG9hZGVyLCBwYXJhbXMpIHtcbiAgY29uc3QgY29uZmlybUJ1dHRvbiA9IGRvbS5nZXRDb25maXJtQnV0dG9uKClcbiAgY29uc3QgZGVueUJ1dHRvbiA9IGRvbS5nZXREZW55QnV0dG9uKClcbiAgY29uc3QgY2FuY2VsQnV0dG9uID0gZG9tLmdldENhbmNlbEJ1dHRvbigpXG5cbiAgLy8gUmVuZGVyIGJ1dHRvbnNcbiAgcmVuZGVyQnV0dG9uKGNvbmZpcm1CdXR0b24sICdjb25maXJtJywgcGFyYW1zKVxuICByZW5kZXJCdXR0b24oZGVueUJ1dHRvbiwgJ2RlbnknLCBwYXJhbXMpXG4gIHJlbmRlckJ1dHRvbihjYW5jZWxCdXR0b24sICdjYW5jZWwnLCBwYXJhbXMpXG4gIGhhbmRsZUJ1dHRvbnNTdHlsaW5nKGNvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbiwgcGFyYW1zKVxuXG4gIGlmIChwYXJhbXMucmV2ZXJzZUJ1dHRvbnMpIHtcbiAgICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShjYW5jZWxCdXR0b24sIGNvbmZpcm1CdXR0b24pXG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShkZW55QnV0dG9uLCBjb25maXJtQnV0dG9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShjYW5jZWxCdXR0b24sIGxvYWRlcilcbiAgICAgIGFjdGlvbnMuaW5zZXJ0QmVmb3JlKGRlbnlCdXR0b24sIGxvYWRlcilcbiAgICAgIGFjdGlvbnMuaW5zZXJ0QmVmb3JlKGNvbmZpcm1CdXR0b24sIGxvYWRlcilcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlQnV0dG9uc1N0eWxpbmcoY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uLCBwYXJhbXMpIHtcbiAgaWYgKCFwYXJhbXMuYnV0dG9uc1N0eWxpbmcpIHtcbiAgICByZXR1cm4gZG9tLnJlbW92ZUNsYXNzKFtjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b25dLCBzd2FsQ2xhc3Nlcy5zdHlsZWQpXG4gIH1cblxuICBkb20uYWRkQ2xhc3MoW2NvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbl0sIHN3YWxDbGFzc2VzLnN0eWxlZClcblxuICAvLyBCdXR0b25zIGJhY2tncm91bmQgY29sb3JzXG4gIGlmIChwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yKSB7XG4gICAgY29uZmlybUJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuY29uZmlybUJ1dHRvbkNvbG9yXG4gICAgZG9tLmFkZENsYXNzKGNvbmZpcm1CdXR0b24sIHN3YWxDbGFzc2VzWydkZWZhdWx0LW91dGxpbmUnXSlcbiAgfVxuICBpZiAocGFyYW1zLmRlbnlCdXR0b25Db2xvcikge1xuICAgIGRlbnlCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmRlbnlCdXR0b25Db2xvclxuICAgIGRvbS5hZGRDbGFzcyhkZW55QnV0dG9uLCBzd2FsQ2xhc3Nlc1snZGVmYXVsdC1vdXRsaW5lJ10pXG4gIH1cbiAgaWYgKHBhcmFtcy5jYW5jZWxCdXR0b25Db2xvcikge1xuICAgIGNhbmNlbEJ1dHRvbi5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwYXJhbXMuY2FuY2VsQnV0dG9uQ29sb3JcbiAgICBkb20uYWRkQ2xhc3MoY2FuY2VsQnV0dG9uLCBzd2FsQ2xhc3Nlc1snZGVmYXVsdC1vdXRsaW5lJ10pXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyQnV0dG9uKGJ1dHRvbiwgYnV0dG9uVHlwZSwgcGFyYW1zKSB7XG4gIGRvbS50b2dnbGUoYnV0dG9uLCBwYXJhbXNbYHNob3cke2NhcGl0YWxpemVGaXJzdExldHRlcihidXR0b25UeXBlKX1CdXR0b25gXSwgJ2lubGluZS1ibG9jaycpXG4gIGRvbS5zZXRJbm5lckh0bWwoYnV0dG9uLCBwYXJhbXNbYCR7YnV0dG9uVHlwZX1CdXR0b25UZXh0YF0pIC8vIFNldCBjYXB0aW9uIHRleHRcbiAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsIHBhcmFtc1tgJHtidXR0b25UeXBlfUJ1dHRvbkFyaWFMYWJlbGBdKSAvLyBBUklBIGxhYmVsXG5cbiAgLy8gQWRkIGJ1dHRvbnMgY3VzdG9tIGNsYXNzZXNcbiAgYnV0dG9uLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzW2J1dHRvblR5cGVdXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGJ1dHRvbiwgcGFyYW1zLCBgJHtidXR0b25UeXBlfUJ1dHRvbmApXG4gIGRvbS5hZGRDbGFzcyhidXR0b24sIHBhcmFtc1tgJHtidXR0b25UeXBlfUJ1dHRvbkNsYXNzYF0pXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5mdW5jdGlvbiBoYW5kbGVCYWNrZHJvcFBhcmFtKGNvbnRhaW5lciwgYmFja2Ryb3ApIHtcbiAgaWYgKHR5cGVvZiBiYWNrZHJvcCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb250YWluZXIuc3R5bGUuYmFja2dyb3VuZCA9IGJhY2tkcm9wXG4gIH0gZWxzZSBpZiAoIWJhY2tkcm9wKSB7XG4gICAgZG9tLmFkZENsYXNzKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLCBzd2FsQ2xhc3Nlc1snbm8tYmFja2Ryb3AnXSlcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVQb3NpdGlvblBhcmFtKGNvbnRhaW5lciwgcG9zaXRpb24pIHtcbiAgaWYgKHBvc2l0aW9uIGluIHN3YWxDbGFzc2VzKSB7XG4gICAgZG9tLmFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbcG9zaXRpb25dKVxuICB9IGVsc2Uge1xuICAgIHdhcm4oJ1RoZSBcInBvc2l0aW9uXCIgcGFyYW1ldGVyIGlzIG5vdCB2YWxpZCwgZGVmYXVsdGluZyB0byBcImNlbnRlclwiJylcbiAgICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlcy5jZW50ZXIpXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlR3Jvd1BhcmFtKGNvbnRhaW5lciwgZ3Jvdykge1xuICBpZiAoZ3JvdyAmJiB0eXBlb2YgZ3JvdyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBncm93Q2xhc3MgPSBgZ3Jvdy0ke2dyb3d9YFxuICAgIGlmIChncm93Q2xhc3MgaW4gc3dhbENsYXNzZXMpIHtcbiAgICAgIGRvbS5hZGRDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzW2dyb3dDbGFzc10pXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDb250YWluZXIgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcblxuICBpZiAoIWNvbnRhaW5lcikge1xuICAgIHJldHVyblxuICB9XG5cbiAgaGFuZGxlQmFja2Ryb3BQYXJhbShjb250YWluZXIsIHBhcmFtcy5iYWNrZHJvcClcblxuICBoYW5kbGVQb3NpdGlvblBhcmFtKGNvbnRhaW5lciwgcGFyYW1zLnBvc2l0aW9uKVxuICBoYW5kbGVHcm93UGFyYW0oY29udGFpbmVyLCBwYXJhbXMuZ3JvdylcblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoY29udGFpbmVyLCBwYXJhbXMsICdjb250YWluZXInKVxufVxuIiwiLyoqXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyBgV2Vha01hcGBzIGZvciBlYWNoIGVmZmVjdGl2ZWx5LVwicHJpdmF0ZSAgcHJvcGVydHlcIiB0aGF0IGEgYFN3YWxgIGhhcy5cbiAqIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHByaXZhdGUgcHJvcGVydHkgXCJmb29cIiBvZiBgdGhpc2AgdG8gXCJiYXJcIiwgeW91IGNhbiBgcHJpdmF0ZVByb3BzLmZvby5zZXQodGhpcywgJ2JhcicpYFxuICogVGhpcyBpcyB0aGUgYXBwcm9hY2ggdGhhdCBCYWJlbCB3aWxsIHByb2JhYmx5IHRha2UgdG8gaW1wbGVtZW50IHByaXZhdGUgbWV0aG9kcy9maWVsZHNcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJpdmF0ZS1tZXRob2RzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9wdWxsLzc1NTVcbiAqIE9uY2Ugd2UgaGF2ZSB0aGUgY2hhbmdlcyBmcm9tIHRoYXQgUFIgaW4gQmFiZWwsIGFuZCBvdXIgY29yZSBjbGFzcyBmaXRzIHJlYXNvbmFibGUgaW4gKm9uZSBtb2R1bGUqXG4gKiAgIHRoZW4gd2UgY2FuIHVzZSB0aGF0IGxhbmd1YWdlIGZlYXR1cmUuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBhd2FpdGluZ1Byb21pc2U6IG5ldyBXZWFrTWFwKCksXG4gIHByb21pc2U6IG5ldyBXZWFrTWFwKCksXG4gIGlubmVyUGFyYW1zOiBuZXcgV2Vha01hcCgpLFxuICBkb21DYWNoZTogbmV3IFdlYWtNYXAoKSxcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGVycm9yLCBpc1Byb21pc2UsIHdhcm4gfSBmcm9tICcuLi8uLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uLy4uLy4uL3ByaXZhdGVQcm9wcy5qcydcblxuY29uc3QgaW5wdXRUeXBlcyA9IFsnaW5wdXQnLCAnZmlsZScsICdyYW5nZScsICdzZWxlY3QnLCAncmFkaW8nLCAnY2hlY2tib3gnLCAndGV4dGFyZWEnXVxuXG5leHBvcnQgY29uc3QgcmVuZGVySW5wdXQgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgY29uc3QgcmVyZW5kZXIgPSAhaW5uZXJQYXJhbXMgfHwgcGFyYW1zLmlucHV0ICE9PSBpbm5lclBhcmFtcy5pbnB1dFxuXG4gIGlucHV0VHlwZXMuZm9yRWFjaCgoaW5wdXRUeXBlKSA9PiB7XG4gICAgY29uc3QgaW5wdXRDbGFzcyA9IHN3YWxDbGFzc2VzW2lucHV0VHlwZV1cbiAgICBjb25zdCBpbnB1dENvbnRhaW5lciA9IGRvbS5nZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIGlucHV0Q2xhc3MpXG5cbiAgICAvLyBzZXQgYXR0cmlidXRlc1xuICAgIHNldEF0dHJpYnV0ZXMoaW5wdXRUeXBlLCBwYXJhbXMuaW5wdXRBdHRyaWJ1dGVzKVxuXG4gICAgLy8gc2V0IGNsYXNzXG4gICAgaW5wdXRDb250YWluZXIuY2xhc3NOYW1lID0gaW5wdXRDbGFzc1xuXG4gICAgaWYgKHJlcmVuZGVyKSB7XG4gICAgICBkb20uaGlkZShpbnB1dENvbnRhaW5lcilcbiAgICB9XG4gIH0pXG5cbiAgaWYgKHBhcmFtcy5pbnB1dCkge1xuICAgIGlmIChyZXJlbmRlcikge1xuICAgICAgc2hvd0lucHV0KHBhcmFtcylcbiAgICB9XG4gICAgLy8gc2V0IGN1c3RvbSBjbGFzc1xuICAgIHNldEN1c3RvbUNsYXNzKHBhcmFtcylcbiAgfVxufVxuXG5jb25zdCBzaG93SW5wdXQgPSAocGFyYW1zKSA9PiB7XG4gIGlmICghcmVuZGVySW5wdXRUeXBlW3BhcmFtcy5pbnB1dF0pIHtcbiAgICByZXR1cm4gZXJyb3IoXG4gICAgICBgVW5leHBlY3RlZCB0eXBlIG9mIGlucHV0ISBFeHBlY3RlZCBcInRleHRcIiwgXCJlbWFpbFwiLCBcInBhc3N3b3JkXCIsIFwibnVtYmVyXCIsIFwidGVsXCIsIFwic2VsZWN0XCIsIFwicmFkaW9cIiwgXCJjaGVja2JveFwiLCBcInRleHRhcmVhXCIsIFwiZmlsZVwiIG9yIFwidXJsXCIsIGdvdCBcIiR7cGFyYW1zLmlucHV0fVwiYFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZ2V0SW5wdXRDb250YWluZXIocGFyYW1zLmlucHV0KVxuICBjb25zdCBpbnB1dCA9IHJlbmRlcklucHV0VHlwZVtwYXJhbXMuaW5wdXRdKGlucHV0Q29udGFpbmVyLCBwYXJhbXMpXG4gIGRvbS5zaG93KGlucHV0KVxuXG4gIC8vIGlucHV0IGF1dG9mb2N1c1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBkb20uZm9jdXNJbnB1dChpbnB1dClcbiAgfSlcbn1cblxuY29uc3QgcmVtb3ZlQXR0cmlidXRlcyA9IChpbnB1dCkgPT4ge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGlucHV0LmF0dHJpYnV0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBhdHRyTmFtZSA9IGlucHV0LmF0dHJpYnV0ZXNbaV0ubmFtZVxuICAgIGlmICghWyd0eXBlJywgJ3ZhbHVlJywgJ3N0eWxlJ10uaW5jbHVkZXMoYXR0ck5hbWUpKSB7XG4gICAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoYXR0ck5hbWUpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNldEF0dHJpYnV0ZXMgPSAoaW5wdXRUeXBlLCBpbnB1dEF0dHJpYnV0ZXMpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBkb20uZ2V0SW5wdXQoZG9tLmdldFBvcHVwKCksIGlucHV0VHlwZSlcbiAgaWYgKCFpbnB1dCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcmVtb3ZlQXR0cmlidXRlcyhpbnB1dClcblxuICBmb3IgKGNvbnN0IGF0dHIgaW4gaW5wdXRBdHRyaWJ1dGVzKSB7XG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKGF0dHIsIGlucHV0QXR0cmlidXRlc1thdHRyXSlcbiAgfVxufVxuXG5jb25zdCBzZXRDdXN0b21DbGFzcyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgaW5wdXRDb250YWluZXIgPSBnZXRJbnB1dENvbnRhaW5lcihwYXJhbXMuaW5wdXQpXG4gIGlmIChwYXJhbXMuY3VzdG9tQ2xhc3MpIHtcbiAgICBkb20uYWRkQ2xhc3MoaW5wdXRDb250YWluZXIsIHBhcmFtcy5jdXN0b21DbGFzcy5pbnB1dClcbiAgfVxufVxuXG5jb25zdCBzZXRJbnB1dFBsYWNlaG9sZGVyID0gKGlucHV0LCBwYXJhbXMpID0+IHtcbiAgaWYgKCFpbnB1dC5wbGFjZWhvbGRlciB8fCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcikge1xuICAgIGlucHV0LnBsYWNlaG9sZGVyID0gcGFyYW1zLmlucHV0UGxhY2Vob2xkZXJcbiAgfVxufVxuXG5jb25zdCBzZXRJbnB1dExhYmVsID0gKGlucHV0LCBwcmVwZW5kVG8sIHBhcmFtcykgPT4ge1xuICBpZiAocGFyYW1zLmlucHV0TGFiZWwpIHtcbiAgICBpbnB1dC5pZCA9IHN3YWxDbGFzc2VzLmlucHV0XG4gICAgY29uc3QgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgY29uc3QgbGFiZWxDbGFzcyA9IHN3YWxDbGFzc2VzWydpbnB1dC1sYWJlbCddXG4gICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBpbnB1dC5pZClcbiAgICBsYWJlbC5jbGFzc05hbWUgPSBsYWJlbENsYXNzXG4gICAgZG9tLmFkZENsYXNzKGxhYmVsLCBwYXJhbXMuY3VzdG9tQ2xhc3MuaW5wdXRMYWJlbClcbiAgICBsYWJlbC5pbm5lclRleHQgPSBwYXJhbXMuaW5wdXRMYWJlbFxuICAgIHByZXBlbmRUby5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWJlZ2luJywgbGFiZWwpXG4gIH1cbn1cblxuY29uc3QgZ2V0SW5wdXRDb250YWluZXIgPSAoaW5wdXRUeXBlKSA9PiB7XG4gIGNvbnN0IGlucHV0Q2xhc3MgPSBzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVdID8gc3dhbENsYXNzZXNbaW5wdXRUeXBlXSA6IHN3YWxDbGFzc2VzLmlucHV0XG4gIHJldHVybiBkb20uZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKGRvbS5nZXRQb3B1cCgpLCBpbnB1dENsYXNzKVxufVxuXG5jb25zdCByZW5kZXJJbnB1dFR5cGUgPSB7fVxuXG5yZW5kZXJJbnB1dFR5cGUudGV4dCA9XG4gIHJlbmRlcklucHV0VHlwZS5lbWFpbCA9XG4gIHJlbmRlcklucHV0VHlwZS5wYXNzd29yZCA9XG4gIHJlbmRlcklucHV0VHlwZS5udW1iZXIgPVxuICByZW5kZXJJbnB1dFR5cGUudGVsID1cbiAgcmVuZGVySW5wdXRUeXBlLnVybCA9XG4gICAgKGlucHV0LCBwYXJhbXMpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcGFyYW1zLmlucHV0VmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBwYXJhbXMuaW5wdXRWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZVxuICAgICAgfSBlbHNlIGlmICghaXNQcm9taXNlKHBhcmFtcy5pbnB1dFZhbHVlKSkge1xuICAgICAgICB3YXJuKFxuICAgICAgICAgIGBVbmV4cGVjdGVkIHR5cGUgb2YgaW5wdXRWYWx1ZSEgRXhwZWN0ZWQgXCJzdHJpbmdcIiwgXCJudW1iZXJcIiBvciBcIlByb21pc2VcIiwgZ290IFwiJHt0eXBlb2YgcGFyYW1zLmlucHV0VmFsdWV9XCJgXG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIHNldElucHV0TGFiZWwoaW5wdXQsIGlucHV0LCBwYXJhbXMpXG4gICAgICBzZXRJbnB1dFBsYWNlaG9sZGVyKGlucHV0LCBwYXJhbXMpXG4gICAgICBpbnB1dC50eXBlID0gcGFyYW1zLmlucHV0XG4gICAgICByZXR1cm4gaW5wdXRcbiAgICB9XG5cbnJlbmRlcklucHV0VHlwZS5maWxlID0gKGlucHV0LCBwYXJhbXMpID0+IHtcbiAgc2V0SW5wdXRMYWJlbChpbnB1dCwgaW5wdXQsIHBhcmFtcylcbiAgc2V0SW5wdXRQbGFjZWhvbGRlcihpbnB1dCwgcGFyYW1zKVxuICByZXR1cm4gaW5wdXRcbn1cblxucmVuZGVySW5wdXRUeXBlLnJhbmdlID0gKHJhbmdlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgcmFuZ2VJbnB1dCA9IHJhbmdlLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcbiAgY29uc3QgcmFuZ2VPdXRwdXQgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCdvdXRwdXQnKVxuICByYW5nZUlucHV0LnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgcmFuZ2VJbnB1dC50eXBlID0gcGFyYW1zLmlucHV0XG4gIHJhbmdlT3V0cHV0LnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgc2V0SW5wdXRMYWJlbChyYW5nZUlucHV0LCByYW5nZSwgcGFyYW1zKVxuICByZXR1cm4gcmFuZ2Vcbn1cblxucmVuZGVySW5wdXRUeXBlLnNlbGVjdCA9IChzZWxlY3QsIHBhcmFtcykgPT4ge1xuICBzZWxlY3QudGV4dENvbnRlbnQgPSAnJ1xuICBpZiAocGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgZG9tLnNldElubmVySHRtbChwbGFjZWhvbGRlciwgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpXG4gICAgcGxhY2Vob2xkZXIudmFsdWUgPSAnJ1xuICAgIHBsYWNlaG9sZGVyLmRpc2FibGVkID0gdHJ1ZVxuICAgIHBsYWNlaG9sZGVyLnNlbGVjdGVkID0gdHJ1ZVxuICAgIHNlbGVjdC5hcHBlbmRDaGlsZChwbGFjZWhvbGRlcilcbiAgfVxuICBzZXRJbnB1dExhYmVsKHNlbGVjdCwgc2VsZWN0LCBwYXJhbXMpXG4gIHJldHVybiBzZWxlY3Rcbn1cblxucmVuZGVySW5wdXRUeXBlLnJhZGlvID0gKHJhZGlvKSA9PiB7XG4gIHJhZGlvLnRleHRDb250ZW50ID0gJydcbiAgcmV0dXJuIHJhZGlvXG59XG5cbnJlbmRlcklucHV0VHlwZS5jaGVja2JveCA9IChjaGVja2JveENvbnRhaW5lciwgcGFyYW1zKSA9PiB7XG4gIC8qKiBAdHlwZSB7SFRNTElucHV0RWxlbWVudH0gKi9cbiAgY29uc3QgY2hlY2tib3ggPSBkb20uZ2V0SW5wdXQoZG9tLmdldFBvcHVwKCksICdjaGVja2JveCcpXG4gIGNoZWNrYm94LnZhbHVlID0gJzEnXG4gIGNoZWNrYm94LmlkID0gc3dhbENsYXNzZXMuY2hlY2tib3hcbiAgY2hlY2tib3guY2hlY2tlZCA9IEJvb2xlYW4ocGFyYW1zLmlucHV0VmFsdWUpXG4gIGNvbnN0IGxhYmVsID0gY2hlY2tib3hDb250YWluZXIucXVlcnlTZWxlY3Rvcignc3BhbicpXG4gIGRvbS5zZXRJbm5lckh0bWwobGFiZWwsIHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKVxuICByZXR1cm4gY2hlY2tib3hDb250YWluZXJcbn1cblxucmVuZGVySW5wdXRUeXBlLnRleHRhcmVhID0gKHRleHRhcmVhLCBwYXJhbXMpID0+IHtcbiAgdGV4dGFyZWEudmFsdWUgPSBwYXJhbXMuaW5wdXRWYWx1ZVxuICBzZXRJbnB1dFBsYWNlaG9sZGVyKHRleHRhcmVhLCBwYXJhbXMpXG4gIHNldElucHV0TGFiZWwodGV4dGFyZWEsIHRleHRhcmVhLCBwYXJhbXMpXG5cbiAgY29uc3QgZ2V0TWFyZ2luID0gKGVsKSA9PlxuICAgIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5tYXJnaW5MZWZ0KSArIHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsKS5tYXJnaW5SaWdodClcblxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzIyOTFcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xNjk5XG4gICAgaWYgKCdNdXRhdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpIHtcbiAgICAgIGNvbnN0IGluaXRpYWxQb3B1cFdpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9tLmdldFBvcHVwKCkpLndpZHRoKVxuICAgICAgY29uc3QgdGV4dGFyZWFSZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0YXJlYVdpZHRoID0gdGV4dGFyZWEub2Zmc2V0V2lkdGggKyBnZXRNYXJnaW4odGV4dGFyZWEpXG4gICAgICAgIGlmICh0ZXh0YXJlYVdpZHRoID4gaW5pdGlhbFBvcHVwV2lkdGgpIHtcbiAgICAgICAgICBkb20uZ2V0UG9wdXAoKS5zdHlsZS53aWR0aCA9IGAke3RleHRhcmVhV2lkdGh9cHhgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZG9tLmdldFBvcHVwKCkuc3R5bGUud2lkdGggPSBudWxsXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG5ldyBNdXRhdGlvbk9ic2VydmVyKHRleHRhcmVhUmVzaXplSGFuZGxlcikub2JzZXJ2ZSh0ZXh0YXJlYSwge1xuICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVGaWx0ZXI6IFsnc3R5bGUnXSxcbiAgICAgIH0pXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiB0ZXh0YXJlYVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHJlbmRlcklucHV0IH0gZnJvbSAnLi9yZW5kZXJJbnB1dC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNvbnRlbnQgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBodG1sQ29udGFpbmVyID0gZG9tLmdldEh0bWxDb250YWluZXIoKVxuXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGh0bWxDb250YWluZXIsIHBhcmFtcywgJ2h0bWxDb250YWluZXInKVxuXG4gIC8vIENvbnRlbnQgYXMgSFRNTFxuICBpZiAocGFyYW1zLmh0bWwpIHtcbiAgICBkb20ucGFyc2VIdG1sVG9Db250YWluZXIocGFyYW1zLmh0bWwsIGh0bWxDb250YWluZXIpXG4gICAgZG9tLnNob3coaHRtbENvbnRhaW5lciwgJ2Jsb2NrJylcbiAgfVxuXG4gIC8vIENvbnRlbnQgYXMgcGxhaW4gdGV4dFxuICBlbHNlIGlmIChwYXJhbXMudGV4dCkge1xuICAgIGh0bWxDb250YWluZXIudGV4dENvbnRlbnQgPSBwYXJhbXMudGV4dFxuICAgIGRvbS5zaG93KGh0bWxDb250YWluZXIsICdibG9jaycpXG4gIH1cblxuICAvLyBObyBjb250ZW50XG4gIGVsc2Uge1xuICAgIGRvbS5oaWRlKGh0bWxDb250YWluZXIpXG4gIH1cblxuICByZW5kZXJJbnB1dChpbnN0YW5jZSwgcGFyYW1zKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckZvb3RlciA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGZvb3RlciA9IGRvbS5nZXRGb290ZXIoKVxuXG4gIGRvbS50b2dnbGUoZm9vdGVyLCBwYXJhbXMuZm9vdGVyKVxuXG4gIGlmIChwYXJhbXMuZm9vdGVyKSB7XG4gICAgZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyKHBhcmFtcy5mb290ZXIsIGZvb3RlcilcbiAgfVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhmb290ZXIsIHBhcmFtcywgJ2Zvb3RlcicpXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQ2xvc2VCdXR0b24gPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBjbG9zZUJ1dHRvbiA9IGRvbS5nZXRDbG9zZUJ1dHRvbigpXG5cbiAgZG9tLnNldElubmVySHRtbChjbG9zZUJ1dHRvbiwgcGFyYW1zLmNsb3NlQnV0dG9uSHRtbClcblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoY2xvc2VCdXR0b24sIHBhcmFtcywgJ2Nsb3NlQnV0dG9uJylcblxuICBkb20udG9nZ2xlKGNsb3NlQnV0dG9uLCBwYXJhbXMuc2hvd0Nsb3NlQnV0dG9uKVxuICBjbG9zZUJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwYXJhbXMuY2xvc2VCdXR0b25BcmlhTGFiZWwpXG59XG4iLCJpbXBvcnQgeyBpY29uVHlwZXMsIHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi8uLi8uLi9wcml2YXRlUHJvcHMuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJJY29uID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBjb25zdCBpY29uID0gZG9tLmdldEljb24oKVxuXG4gIC8vIGlmIHRoZSBnaXZlbiBpY29uIGFscmVhZHkgcmVuZGVyZWQsIGFwcGx5IHRoZSBzdHlsaW5nIHdpdGhvdXQgcmUtcmVuZGVyaW5nIHRoZSBpY29uXG4gIGlmIChpbm5lclBhcmFtcyAmJiBwYXJhbXMuaWNvbiA9PT0gaW5uZXJQYXJhbXMuaWNvbikge1xuICAgIC8vIEN1c3RvbSBvciBkZWZhdWx0IGNvbnRlbnRcbiAgICBzZXRDb250ZW50KGljb24sIHBhcmFtcylcblxuICAgIGFwcGx5U3R5bGVzKGljb24sIHBhcmFtcylcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICghcGFyYW1zLmljb24gJiYgIXBhcmFtcy5pY29uSHRtbCkge1xuICAgIHJldHVybiBkb20uaGlkZShpY29uKVxuICB9XG5cbiAgaWYgKHBhcmFtcy5pY29uICYmIE9iamVjdC5rZXlzKGljb25UeXBlcykuaW5kZXhPZihwYXJhbXMuaWNvbikgPT09IC0xKSB7XG4gICAgZXJyb3IoYFVua25vd24gaWNvbiEgRXhwZWN0ZWQgXCJzdWNjZXNzXCIsIFwiZXJyb3JcIiwgXCJ3YXJuaW5nXCIsIFwiaW5mb1wiIG9yIFwicXVlc3Rpb25cIiwgZ290IFwiJHtwYXJhbXMuaWNvbn1cImApXG4gICAgcmV0dXJuIGRvbS5oaWRlKGljb24pXG4gIH1cblxuICBkb20uc2hvdyhpY29uKVxuXG4gIC8vIEN1c3RvbSBvciBkZWZhdWx0IGNvbnRlbnRcbiAgc2V0Q29udGVudChpY29uLCBwYXJhbXMpXG5cbiAgYXBwbHlTdHlsZXMoaWNvbiwgcGFyYW1zKVxuXG4gIC8vIEFuaW1hdGUgaWNvblxuICBkb20uYWRkQ2xhc3MoaWNvbiwgcGFyYW1zLnNob3dDbGFzcy5pY29uKVxufVxuXG5jb25zdCBhcHBseVN0eWxlcyA9IChpY29uLCBwYXJhbXMpID0+IHtcbiAgZm9yIChjb25zdCBpY29uVHlwZSBpbiBpY29uVHlwZXMpIHtcbiAgICBpZiAocGFyYW1zLmljb24gIT09IGljb25UeXBlKSB7XG4gICAgICBkb20ucmVtb3ZlQ2xhc3MoaWNvbiwgaWNvblR5cGVzW2ljb25UeXBlXSlcbiAgICB9XG4gIH1cbiAgZG9tLmFkZENsYXNzKGljb24sIGljb25UeXBlc1twYXJhbXMuaWNvbl0pXG5cbiAgLy8gSWNvbiBjb2xvclxuICBzZXRDb2xvcihpY29uLCBwYXJhbXMpXG5cbiAgLy8gU3VjY2VzcyBpY29uIGJhY2tncm91bmQgY29sb3JcbiAgYWRqdXN0U3VjY2Vzc0ljb25CYWNrZ3JvdW5kQ29sb3IoKVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhpY29uLCBwYXJhbXMsICdpY29uJylcbn1cblxuLy8gQWRqdXN0IHN1Y2Nlc3MgaWNvbiBiYWNrZ3JvdW5kIGNvbG9yIHRvIG1hdGNoIHRoZSBwb3B1cCBiYWNrZ3JvdW5kIGNvbG9yXG5jb25zdCBhZGp1c3RTdWNjZXNzSWNvbkJhY2tncm91bmRDb2xvciA9ICgpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBwb3B1cEJhY2tncm91bmRDb2xvciA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHBvcHVwKS5nZXRQcm9wZXJ0eVZhbHVlKCdiYWNrZ3JvdW5kLWNvbG9yJylcbiAgY29uc3Qgc3VjY2Vzc0ljb25QYXJ0cyA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzc149c3dhbDItc3VjY2Vzcy1jaXJjdWxhci1saW5lXSwgLnN3YWwyLXN1Y2Nlc3MtZml4JylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWNjZXNzSWNvblBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3VjY2Vzc0ljb25QYXJ0c1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBwb3B1cEJhY2tncm91bmRDb2xvclxuICB9XG59XG5cbmNvbnN0IHN1Y2Nlc3NJY29uSHRtbCA9IGBcbiAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZS1sZWZ0XCI+PC9kaXY+XG4gIDxzcGFuIGNsYXNzPVwic3dhbDItc3VjY2Vzcy1saW5lLXRpcFwiPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWxpbmUtbG9uZ1wiPjwvc3Bhbj5cbiAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtcmluZ1wiPjwvZGl2PiA8ZGl2IGNsYXNzPVwic3dhbDItc3VjY2Vzcy1maXhcIj48L2Rpdj5cbiAgPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZS1yaWdodFwiPjwvZGl2PlxuYFxuXG5jb25zdCBlcnJvckljb25IdG1sID0gYFxuICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFya1wiPlxuICAgIDxzcGFuIGNsYXNzPVwic3dhbDIteC1tYXJrLWxpbmUtbGVmdFwiPjwvc3Bhbj5cbiAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFyay1saW5lLXJpZ2h0XCI+PC9zcGFuPlxuICA8L3NwYW4+XG5gXG5cbmNvbnN0IHNldENvbnRlbnQgPSAoaWNvbiwgcGFyYW1zKSA9PiB7XG4gIGljb24udGV4dENvbnRlbnQgPSAnJ1xuXG4gIGlmIChwYXJhbXMuaWNvbkh0bWwpIHtcbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIGljb25Db250ZW50KHBhcmFtcy5pY29uSHRtbCkpXG4gIH0gZWxzZSBpZiAocGFyYW1zLmljb24gPT09ICdzdWNjZXNzJykge1xuICAgIGRvbS5zZXRJbm5lckh0bWwoaWNvbiwgc3VjY2Vzc0ljb25IdG1sKVxuICB9IGVsc2UgaWYgKHBhcmFtcy5pY29uID09PSAnZXJyb3InKSB7XG4gICAgZG9tLnNldElubmVySHRtbChpY29uLCBlcnJvckljb25IdG1sKVxuICB9IGVsc2Uge1xuICAgIGNvbnN0IGRlZmF1bHRJY29uSHRtbCA9IHtcbiAgICAgIHF1ZXN0aW9uOiAnPycsXG4gICAgICB3YXJuaW5nOiAnIScsXG4gICAgICBpbmZvOiAnaScsXG4gICAgfVxuICAgIGRvbS5zZXRJbm5lckh0bWwoaWNvbiwgaWNvbkNvbnRlbnQoZGVmYXVsdEljb25IdG1sW3BhcmFtcy5pY29uXSkpXG4gIH1cbn1cblxuY29uc3Qgc2V0Q29sb3IgPSAoaWNvbiwgcGFyYW1zKSA9PiB7XG4gIGlmICghcGFyYW1zLmljb25Db2xvcikge1xuICAgIHJldHVyblxuICB9XG4gIGljb24uc3R5bGUuY29sb3IgPSBwYXJhbXMuaWNvbkNvbG9yXG4gIGljb24uc3R5bGUuYm9yZGVyQ29sb3IgPSBwYXJhbXMuaWNvbkNvbG9yXG4gIGZvciAoY29uc3Qgc2VsIG9mIFtcbiAgICAnLnN3YWwyLXN1Y2Nlc3MtbGluZS10aXAnLFxuICAgICcuc3dhbDItc3VjY2Vzcy1saW5lLWxvbmcnLFxuICAgICcuc3dhbDIteC1tYXJrLWxpbmUtbGVmdCcsXG4gICAgJy5zd2FsMi14LW1hcmstbGluZS1yaWdodCcsXG4gIF0pIHtcbiAgICBkb20uc2V0U3R5bGUoaWNvbiwgc2VsLCAnYmFja2dyb3VuZENvbG9yJywgcGFyYW1zLmljb25Db2xvcilcbiAgfVxuICBkb20uc2V0U3R5bGUoaWNvbiwgJy5zd2FsMi1zdWNjZXNzLXJpbmcnLCAnYm9yZGVyQ29sb3InLCBwYXJhbXMuaWNvbkNvbG9yKVxufVxuXG5jb25zdCBpY29uQ29udGVudCA9IChjb250ZW50KSA9PiBgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ2ljb24tY29udGVudCddfVwiPiR7Y29udGVudH08L2Rpdj5gXG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVySW1hZ2UgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBpbWFnZSA9IGRvbS5nZXRJbWFnZSgpXG5cbiAgaWYgKCFwYXJhbXMuaW1hZ2VVcmwpIHtcbiAgICByZXR1cm4gZG9tLmhpZGUoaW1hZ2UpXG4gIH1cblxuICBkb20uc2hvdyhpbWFnZSwgJycpXG5cbiAgLy8gU3JjLCBhbHRcbiAgaW1hZ2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBwYXJhbXMuaW1hZ2VVcmwpXG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnYWx0JywgcGFyYW1zLmltYWdlQWx0KVxuXG4gIC8vIFdpZHRoLCBoZWlnaHRcbiAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUoaW1hZ2UsICd3aWR0aCcsIHBhcmFtcy5pbWFnZVdpZHRoKVxuICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShpbWFnZSwgJ2hlaWdodCcsIHBhcmFtcy5pbWFnZUhlaWdodClcblxuICAvLyBDbGFzc1xuICBpbWFnZS5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlcy5pbWFnZVxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhpbWFnZSwgcGFyYW1zLCAnaW1hZ2UnKVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuY29uc3QgY3JlYXRlU3RlcEVsZW1lbnQgPSAoc3RlcCkgPT4ge1xuICBjb25zdCBzdGVwRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gIGRvbS5hZGRDbGFzcyhzdGVwRWwsIHN3YWxDbGFzc2VzWydwcm9ncmVzcy1zdGVwJ10pXG4gIGRvbS5zZXRJbm5lckh0bWwoc3RlcEVsLCBzdGVwKVxuICByZXR1cm4gc3RlcEVsXG59XG5cbmNvbnN0IGNyZWF0ZUxpbmVFbGVtZW50ID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCBsaW5lRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpXG4gIGRvbS5hZGRDbGFzcyhsaW5lRWwsIHN3YWxDbGFzc2VzWydwcm9ncmVzcy1zdGVwLWxpbmUnXSlcbiAgaWYgKHBhcmFtcy5wcm9ncmVzc1N0ZXBzRGlzdGFuY2UpIHtcbiAgICBsaW5lRWwuc3R5bGUud2lkdGggPSBwYXJhbXMucHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlXG4gIH1cbiAgcmV0dXJuIGxpbmVFbFxufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyUHJvZ3Jlc3NTdGVwcyA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHByb2dyZXNzU3RlcHNDb250YWluZXIgPSBkb20uZ2V0UHJvZ3Jlc3NTdGVwcygpXG4gIGlmICghcGFyYW1zLnByb2dyZXNzU3RlcHMgfHwgcGFyYW1zLnByb2dyZXNzU3RlcHMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGRvbS5oaWRlKHByb2dyZXNzU3RlcHNDb250YWluZXIpXG4gIH1cblxuICBkb20uc2hvdyhwcm9ncmVzc1N0ZXBzQ29udGFpbmVyKVxuICBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyLnRleHRDb250ZW50ID0gJydcbiAgaWYgKHBhcmFtcy5jdXJyZW50UHJvZ3Jlc3NTdGVwID49IHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCkge1xuICAgIHdhcm4oXG4gICAgICAnSW52YWxpZCBjdXJyZW50UHJvZ3Jlc3NTdGVwIHBhcmFtZXRlciwgaXQgc2hvdWxkIGJlIGxlc3MgdGhhbiBwcm9ncmVzc1N0ZXBzLmxlbmd0aCAnICtcbiAgICAgICAgJyhjdXJyZW50UHJvZ3Jlc3NTdGVwIGxpa2UgSlMgYXJyYXlzIHN0YXJ0cyBmcm9tIDApJ1xuICAgIClcbiAgfVxuXG4gIHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmZvckVhY2goKHN0ZXAsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc3RlcEVsID0gY3JlYXRlU3RlcEVsZW1lbnQoc3RlcClcbiAgICBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKHN0ZXBFbClcbiAgICBpZiAoaW5kZXggPT09IHBhcmFtcy5jdXJyZW50UHJvZ3Jlc3NTdGVwKSB7XG4gICAgICBkb20uYWRkQ2xhc3Moc3RlcEVsLCBzd2FsQ2xhc3Nlc1snYWN0aXZlLXByb2dyZXNzLXN0ZXAnXSlcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggIT09IHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCAtIDEpIHtcbiAgICAgIGNvbnN0IGxpbmVFbCA9IGNyZWF0ZUxpbmVFbGVtZW50KHBhcmFtcylcbiAgICAgIHByb2dyZXNzU3RlcHNDb250YWluZXIuYXBwZW5kQ2hpbGQobGluZUVsKVxuICAgIH1cbiAgfSlcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJUaXRsZSA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHRpdGxlID0gZG9tLmdldFRpdGxlKClcblxuICBkb20udG9nZ2xlKHRpdGxlLCBwYXJhbXMudGl0bGUgfHwgcGFyYW1zLnRpdGxlVGV4dCwgJ2Jsb2NrJylcblxuICBpZiAocGFyYW1zLnRpdGxlKSB7XG4gICAgZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyKHBhcmFtcy50aXRsZSwgdGl0bGUpXG4gIH1cblxuICBpZiAocGFyYW1zLnRpdGxlVGV4dCkge1xuICAgIHRpdGxlLmlubmVyVGV4dCA9IHBhcmFtcy50aXRsZVRleHRcbiAgfVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyh0aXRsZSwgcGFyYW1zLCAndGl0bGUnKVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlclBvcHVwID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcblxuICAvLyBXaWR0aFxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzIxNzBcbiAgaWYgKHBhcmFtcy50b2FzdCkge1xuICAgIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKGNvbnRhaW5lciwgJ3dpZHRoJywgcGFyYW1zLndpZHRoKVxuICAgIHBvcHVwLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgcG9wdXAuaW5zZXJ0QmVmb3JlKGRvbS5nZXRMb2FkZXIoKSwgZG9tLmdldEljb24oKSlcbiAgfSBlbHNlIHtcbiAgICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShwb3B1cCwgJ3dpZHRoJywgcGFyYW1zLndpZHRoKVxuICB9XG5cbiAgLy8gUGFkZGluZ1xuICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShwb3B1cCwgJ3BhZGRpbmcnLCBwYXJhbXMucGFkZGluZylcblxuICAvLyBDb2xvclxuICBpZiAocGFyYW1zLmNvbG9yKSB7XG4gICAgcG9wdXAuc3R5bGUuY29sb3IgPSBwYXJhbXMuY29sb3JcbiAgfVxuXG4gIC8vIEJhY2tncm91bmRcbiAgaWYgKHBhcmFtcy5iYWNrZ3JvdW5kKSB7XG4gICAgcG9wdXAuc3R5bGUuYmFja2dyb3VuZCA9IHBhcmFtcy5iYWNrZ3JvdW5kXG4gIH1cblxuICBkb20uaGlkZShkb20uZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoKSlcblxuICAvLyBDbGFzc2VzXG4gIGFkZENsYXNzZXMocG9wdXAsIHBhcmFtcylcbn1cblxuY29uc3QgYWRkQ2xhc3NlcyA9IChwb3B1cCwgcGFyYW1zKSA9PiB7XG4gIC8vIERlZmF1bHQgQ2xhc3MgKyBzaG93Q2xhc3Mgd2hlbiB1cGRhdGluZyBTd2FsLnVwZGF0ZSh7fSlcbiAgcG9wdXAuY2xhc3NOYW1lID0gYCR7c3dhbENsYXNzZXMucG9wdXB9ICR7ZG9tLmlzVmlzaWJsZShwb3B1cCkgPyBwYXJhbXMuc2hvd0NsYXNzLnBvcHVwIDogJyd9YFxuXG4gIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICBkb20uYWRkQ2xhc3MoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sIHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddKVxuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMudG9hc3QpXG4gIH0gZWxzZSB7XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5tb2RhbClcbiAgfVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhwb3B1cCwgcGFyYW1zLCAncG9wdXAnKVxuICBpZiAodHlwZW9mIHBhcmFtcy5jdXN0b21DbGFzcyA9PT0gJ3N0cmluZycpIHtcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHBhcmFtcy5jdXN0b21DbGFzcylcbiAgfVxuXG4gIC8vIEljb24gY2xhc3MgKCMxODQyKVxuICBpZiAocGFyYW1zLmljb24pIHtcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzW2BpY29uLSR7cGFyYW1zLmljb259YF0pXG4gIH1cbn1cbiIsImltcG9ydCB7IGdldFBvcHVwIH0gZnJvbSAnLi4vZ2V0dGVycy5qcydcbmltcG9ydCB7IHJlbmRlckFjdGlvbnMgfSBmcm9tICcuL3JlbmRlckFjdGlvbnMuanMnXG5pbXBvcnQgeyByZW5kZXJDb250YWluZXIgfSBmcm9tICcuL3JlbmRlckNvbnRhaW5lci5qcydcbmltcG9ydCB7IHJlbmRlckNvbnRlbnQgfSBmcm9tICcuL3JlbmRlckNvbnRlbnQuanMnXG5pbXBvcnQgeyByZW5kZXJGb290ZXIgfSBmcm9tICcuL3JlbmRlckZvb3Rlci5qcydcbmltcG9ydCB7IHJlbmRlckNsb3NlQnV0dG9uIH0gZnJvbSAnLi9yZW5kZXJDbG9zZUJ1dHRvbi5qcydcbmltcG9ydCB7IHJlbmRlckljb24gfSBmcm9tICcuL3JlbmRlckljb24uanMnXG5pbXBvcnQgeyByZW5kZXJJbWFnZSB9IGZyb20gJy4vcmVuZGVySW1hZ2UuanMnXG5pbXBvcnQgeyByZW5kZXJQcm9ncmVzc1N0ZXBzIH0gZnJvbSAnLi9yZW5kZXJQcm9ncmVzc1N0ZXBzLmpzJ1xuaW1wb3J0IHsgcmVuZGVyVGl0bGUgfSBmcm9tICcuL3JlbmRlclRpdGxlLmpzJ1xuaW1wb3J0IHsgcmVuZGVyUG9wdXAgfSBmcm9tICcuL3JlbmRlclBvcHVwLmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgcmVuZGVyUG9wdXAoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyQ29udGFpbmVyKGluc3RhbmNlLCBwYXJhbXMpXG5cbiAgcmVuZGVyUHJvZ3Jlc3NTdGVwcyhpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJJY29uKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckltYWdlKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlclRpdGxlKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckNsb3NlQnV0dG9uKGluc3RhbmNlLCBwYXJhbXMpXG5cbiAgcmVuZGVyQ29udGVudChpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJBY3Rpb25zKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckZvb3RlcihpbnN0YW5jZSwgcGFyYW1zKVxuXG4gIGlmICh0eXBlb2YgcGFyYW1zLmRpZFJlbmRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHBhcmFtcy5kaWRSZW5kZXIoZ2V0UG9wdXAoKSlcbiAgfVxufVxuIiwiZXhwb3J0IGNvbnN0IERpc21pc3NSZWFzb24gPSBPYmplY3QuZnJlZXplKHtcbiAgY2FuY2VsOiAnY2FuY2VsJyxcbiAgYmFja2Ryb3A6ICdiYWNrZHJvcCcsXG4gIGNsb3NlOiAnY2xvc2UnLFxuICBlc2M6ICdlc2MnLFxuICB0aW1lcjogJ3RpbWVyJyxcbn0pXG4iLCJpbXBvcnQgeyBnZXRDb250YWluZXIgfSBmcm9tICcuL2RvbS9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgdG9BcnJheSB9IGZyb20gJy4vdXRpbHMuanMnXG5cbi8vIEZyb20gaHR0cHM6Ly9kZXZlbG9wZXIucGFjaWVsbG9ncm91cC5jb20vYmxvZy8yMDE4LzA2L3RoZS1jdXJyZW50LXN0YXRlLW9mLW1vZGFsLWRpYWxvZy1hY2Nlc3NpYmlsaXR5L1xuLy8gQWRkaW5nIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHRvIGVsZW1lbnRzIG91dHNpZGUgb2YgdGhlIGFjdGl2ZSBtb2RhbCBkaWFsb2cgZW5zdXJlcyB0aGF0XG4vLyBlbGVtZW50cyBub3Qgd2l0aGluIHRoZSBhY3RpdmUgbW9kYWwgZGlhbG9nIHdpbGwgbm90IGJlIHN1cmZhY2VkIGlmIGEgdXNlciBvcGVucyBhIHNjcmVlblxuLy8gcmVhZGVy4oCZcyBsaXN0IG9mIGVsZW1lbnRzIChoZWFkaW5ncywgZm9ybSBjb250cm9scywgbGFuZG1hcmtzLCBldGMuKSBpbiB0aGUgZG9jdW1lbnQuXG5cbmV4cG9ydCBjb25zdCBzZXRBcmlhSGlkZGVuID0gKCkgPT4ge1xuICBjb25zdCBib2R5Q2hpbGRyZW4gPSB0b0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pXG4gIGJvZHlDaGlsZHJlbi5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmIChlbCA9PT0gZ2V0Q29udGFpbmVyKCkgfHwgZWwuY29udGFpbnMoZ2V0Q29udGFpbmVyKCkpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoZWwuaGFzQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJldmlvdXMtYXJpYS1oaWRkZW4nLCBlbC5nZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJykpXG4gICAgfVxuICAgIGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpXG4gIH0pXG59XG5cbmV4cG9ydCBjb25zdCB1bnNldEFyaWFIaWRkZW4gPSAoKSA9PiB7XG4gIGNvbnN0IGJvZHlDaGlsZHJlbiA9IHRvQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbilcbiAgYm9keUNoaWxkcmVuLmZvckVhY2goKGVsKSA9PiB7XG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnZGF0YS1wcmV2aW91cy1hcmlhLWhpZGRlbicpKSB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJykpXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtcHJldmlvdXMtYXJpYS1oaWRkZW4nKVxuICAgIH0gZWxzZSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJylcbiAgICB9XG4gIH0pXG59XG4iLCJpbXBvcnQgZGVmYXVsdFBhcmFtcyBmcm9tICcuL3BhcmFtcy5qcydcbmltcG9ydCB7IGNhcGl0YWxpemVGaXJzdExldHRlciwgdG9BcnJheSwgd2FybiB9IGZyb20gJy4vdXRpbHMuanMnXG5cbmNvbnN0IHN3YWxTdHJpbmdQYXJhbXMgPSBbJ3N3YWwtdGl0bGUnLCAnc3dhbC1odG1sJywgJ3N3YWwtZm9vdGVyJ11cblxuZXhwb3J0IGNvbnN0IGdldFRlbXBsYXRlUGFyYW1zID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZSA9IHR5cGVvZiBwYXJhbXMudGVtcGxhdGUgPT09ICdzdHJpbmcnID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihwYXJhbXMudGVtcGxhdGUpIDogcGFyYW1zLnRlbXBsYXRlXG4gIGlmICghdGVtcGxhdGUpIHtcbiAgICByZXR1cm4ge31cbiAgfVxuICAvKiogQHR5cGUge0RvY3VtZW50RnJhZ21lbnR9ICovXG4gIGNvbnN0IHRlbXBsYXRlQ29udGVudCA9IHRlbXBsYXRlLmNvbnRlbnRcblxuICBzaG93V2FybmluZ3NGb3JFbGVtZW50cyh0ZW1wbGF0ZUNvbnRlbnQpXG5cbiAgY29uc3QgcmVzdWx0ID0gT2JqZWN0LmFzc2lnbihcbiAgICBnZXRTd2FsUGFyYW1zKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbEJ1dHRvbnModGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsSW1hZ2UodGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsSWNvbih0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxJbnB1dCh0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxTdHJpbmdQYXJhbXModGVtcGxhdGVDb250ZW50LCBzd2FsU3RyaW5nUGFyYW1zKVxuICApXG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBnZXRTd2FsUGFyYW1zID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICB0b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzd2FsLXBhcmFtJykpLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhwYXJhbSwgWyduYW1lJywgJ3ZhbHVlJ10pXG4gICAgY29uc3QgcGFyYW1OYW1lID0gcGFyYW0uZ2V0QXR0cmlidXRlKCduYW1lJylcbiAgICBjb25zdCB2YWx1ZSA9IHBhcmFtLmdldEF0dHJpYnV0ZSgndmFsdWUnKVxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFBhcmFtc1twYXJhbU5hbWVdID09PSAnYm9vbGVhbicgJiYgdmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgIHJlc3VsdFtwYXJhbU5hbWVdID0gZmFsc2VcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBkZWZhdWx0UGFyYW1zW3BhcmFtTmFtZV0gPT09ICdvYmplY3QnKSB7XG4gICAgICByZXN1bHRbcGFyYW1OYW1lXSA9IEpTT04ucGFyc2UodmFsdWUpXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbEJ1dHRvbnMgPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIHRvQXJyYXkodGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N3YWwtYnV0dG9uJykpLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMoYnV0dG9uLCBbJ3R5cGUnLCAnY29sb3InLCAnYXJpYS1sYWJlbCddKVxuICAgIGNvbnN0IHR5cGUgPSBidXR0b24uZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgICByZXN1bHRbYCR7dHlwZX1CdXR0b25UZXh0YF0gPSBidXR0b24uaW5uZXJIVE1MXG4gICAgcmVzdWx0W2BzaG93JHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIodHlwZSl9QnV0dG9uYF0gPSB0cnVlXG4gICAgaWYgKGJ1dHRvbi5oYXNBdHRyaWJ1dGUoJ2NvbG9yJykpIHtcbiAgICAgIHJlc3VsdFtgJHt0eXBlfUJ1dHRvbkNvbG9yYF0gPSBidXR0b24uZ2V0QXR0cmlidXRlKCdjb2xvcicpXG4gICAgfVxuICAgIGlmIChidXR0b24uaGFzQXR0cmlidXRlKCdhcmlhLWxhYmVsJykpIHtcbiAgICAgIHJlc3VsdFtgJHt0eXBlfUJ1dHRvbkFyaWFMYWJlbGBdID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpXG4gICAgfVxuICB9KVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbEltYWdlID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICBjb25zdCBpbWFnZSA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yKCdzd2FsLWltYWdlJylcbiAgaWYgKGltYWdlKSB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhpbWFnZSwgWydzcmMnLCAnd2lkdGgnLCAnaGVpZ2h0JywgJ2FsdCddKVxuICAgIGlmIChpbWFnZS5oYXNBdHRyaWJ1dGUoJ3NyYycpKSB7XG4gICAgICByZXN1bHQuaW1hZ2VVcmwgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ3NyYycpXG4gICAgfVxuICAgIGlmIChpbWFnZS5oYXNBdHRyaWJ1dGUoJ3dpZHRoJykpIHtcbiAgICAgIHJlc3VsdC5pbWFnZVdpZHRoID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCd3aWR0aCcpXG4gICAgfVxuICAgIGlmIChpbWFnZS5oYXNBdHRyaWJ1dGUoJ2hlaWdodCcpKSB7XG4gICAgICByZXN1bHQuaW1hZ2VIZWlnaHQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2hlaWdodCcpXG4gICAgfVxuICAgIGlmIChpbWFnZS5oYXNBdHRyaWJ1dGUoJ2FsdCcpKSB7XG4gICAgICByZXN1bHQuaW1hZ2VBbHQgPSBpbWFnZS5nZXRBdHRyaWJ1dGUoJ2FsdCcpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBnZXRTd2FsSWNvbiA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgY29uc3QgaWNvbiA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yKCdzd2FsLWljb24nKVxuICBpZiAoaWNvbikge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMoaWNvbiwgWyd0eXBlJywgJ2NvbG9yJ10pXG4gICAgaWYgKGljb24uaGFzQXR0cmlidXRlKCd0eXBlJykpIHtcbiAgICAgIHJlc3VsdC5pY29uID0gaWNvbi5nZXRBdHRyaWJ1dGUoJ3R5cGUnKVxuICAgIH1cbiAgICBpZiAoaWNvbi5oYXNBdHRyaWJ1dGUoJ2NvbG9yJykpIHtcbiAgICAgIHJlc3VsdC5pY29uQ29sb3IgPSBpY29uLmdldEF0dHJpYnV0ZSgnY29sb3InKVxuICAgIH1cbiAgICByZXN1bHQuaWNvbkh0bWwgPSBpY29uLmlubmVySFRNTFxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICovXG5jb25zdCBnZXRTd2FsSW5wdXQgPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG4gIGNvbnN0IGlucHV0ID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3IoJ3N3YWwtaW5wdXQnKVxuICBpZiAoaW5wdXQpIHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGlucHV0LCBbJ3R5cGUnLCAnbGFiZWwnLCAncGxhY2Vob2xkZXInLCAndmFsdWUnXSlcbiAgICByZXN1bHQuaW5wdXQgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3R5cGUnKSB8fCAndGV4dCdcbiAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCdsYWJlbCcpKSB7XG4gICAgICByZXN1bHQuaW5wdXRMYWJlbCA9IGlucHV0LmdldEF0dHJpYnV0ZSgnbGFiZWwnKVxuICAgIH1cbiAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCdwbGFjZWhvbGRlcicpKSB7XG4gICAgICByZXN1bHQuaW5wdXRQbGFjZWhvbGRlciA9IGlucHV0LmdldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInKVxuICAgIH1cbiAgICBpZiAoaW5wdXQuaGFzQXR0cmlidXRlKCd2YWx1ZScpKSB7XG4gICAgICByZXN1bHQuaW5wdXRWYWx1ZSA9IGlucHV0LmdldEF0dHJpYnV0ZSgndmFsdWUnKVxuICAgIH1cbiAgfVxuICBjb25zdCBpbnB1dE9wdGlvbnMgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc3dhbC1pbnB1dC1vcHRpb24nKVxuICBpZiAoaW5wdXRPcHRpb25zLmxlbmd0aCkge1xuICAgIHJlc3VsdC5pbnB1dE9wdGlvbnMgPSB7fVxuICAgIHRvQXJyYXkoaW5wdXRPcHRpb25zKS5mb3JFYWNoKChvcHRpb24pID0+IHtcbiAgICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMob3B0aW9uLCBbJ3ZhbHVlJ10pXG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IG9wdGlvbi5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICAgIGNvbnN0IG9wdGlvbk5hbWUgPSBvcHRpb24uaW5uZXJIVE1MXG4gICAgICByZXN1bHQuaW5wdXRPcHRpb25zW29wdGlvblZhbHVlXSA9IG9wdGlvbk5hbWVcbiAgICB9KVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0RvY3VtZW50RnJhZ21lbnR9IHRlbXBsYXRlQ29udGVudFxuICogQHBhcmFtIHtzdHJpbmdbXX0gcGFyYW1OYW1lc1xuICovXG5jb25zdCBnZXRTd2FsU3RyaW5nUGFyYW1zID0gKHRlbXBsYXRlQ29udGVudCwgcGFyYW1OYW1lcykgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICBmb3IgKGNvbnN0IGkgaW4gcGFyYW1OYW1lcykge1xuICAgIGNvbnN0IHBhcmFtTmFtZSA9IHBhcmFtTmFtZXNbaV1cbiAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICAgIGNvbnN0IHRhZyA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yKHBhcmFtTmFtZSlcbiAgICBpZiAodGFnKSB7XG4gICAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKHRhZywgW10pXG4gICAgICByZXN1bHRbcGFyYW1OYW1lLnJlcGxhY2UoL15zd2FsLS8sICcnKV0gPSB0YWcuaW5uZXJIVE1MLnRyaW0oKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3Qgc2hvd1dhcm5pbmdzRm9yRWxlbWVudHMgPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IGFsbG93ZWRFbGVtZW50cyA9IHN3YWxTdHJpbmdQYXJhbXMuY29uY2F0KFtcbiAgICAnc3dhbC1wYXJhbScsXG4gICAgJ3N3YWwtYnV0dG9uJyxcbiAgICAnc3dhbC1pbWFnZScsXG4gICAgJ3N3YWwtaWNvbicsXG4gICAgJ3N3YWwtaW5wdXQnLFxuICAgICdzd2FsLWlucHV0LW9wdGlvbicsXG4gIF0pXG4gIHRvQXJyYXkodGVtcGxhdGVDb250ZW50LmNoaWxkcmVuKS5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGNvbnN0IHRhZ05hbWUgPSBlbC50YWdOYW1lLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoYWxsb3dlZEVsZW1lbnRzLmluZGV4T2YodGFnTmFtZSkgPT09IC0xKSB7XG4gICAgICB3YXJuKGBVbnJlY29nbml6ZWQgZWxlbWVudCA8JHt0YWdOYW1lfT5gKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICogQHBhcmFtIHtzdHJpbmdbXX0gYWxsb3dlZEF0dHJpYnV0ZXNcbiAqL1xuY29uc3Qgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyA9IChlbCwgYWxsb3dlZEF0dHJpYnV0ZXMpID0+IHtcbiAgdG9BcnJheShlbC5hdHRyaWJ1dGVzKS5mb3JFYWNoKChhdHRyaWJ1dGUpID0+IHtcbiAgICBpZiAoYWxsb3dlZEF0dHJpYnV0ZXMuaW5kZXhPZihhdHRyaWJ1dGUubmFtZSkgPT09IC0xKSB7XG4gICAgICB3YXJuKFtcbiAgICAgICAgYFVucmVjb2duaXplZCBhdHRyaWJ1dGUgXCIke2F0dHJpYnV0ZS5uYW1lfVwiIG9uIDwke2VsLnRhZ05hbWUudG9Mb3dlckNhc2UoKX0+LmAsXG4gICAgICAgIGAke1xuICAgICAgICAgIGFsbG93ZWRBdHRyaWJ1dGVzLmxlbmd0aFxuICAgICAgICAgICAgPyBgQWxsb3dlZCBhdHRyaWJ1dGVzIGFyZTogJHthbGxvd2VkQXR0cmlidXRlcy5qb2luKCcsICcpfWBcbiAgICAgICAgICAgIDogJ1RvIHNldCB0aGUgdmFsdWUsIHVzZSBIVE1MIHdpdGhpbiB0aGUgZWxlbWVudC4nXG4gICAgICAgIH1gLFxuICAgICAgXSlcbiAgICB9XG4gIH0pXG59XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gIGVtYWlsOiAoc3RyaW5nLCB2YWxpZGF0aW9uTWVzc2FnZSkgPT4ge1xuICAgIHJldHVybiAvXlthLXpBLVowLTkuK18tXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aMC05LV17MiwyNH0kLy50ZXN0KHN0cmluZylcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbGlkYXRpb25NZXNzYWdlIHx8ICdJbnZhbGlkIGVtYWlsIGFkZHJlc3MnKVxuICB9LFxuICB1cmw6IChzdHJpbmcsIHZhbGlkYXRpb25NZXNzYWdlKSA9PiB7XG4gICAgLy8gdGFrZW4gZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMzgwOTQzNSB3aXRoIGEgc21hbGwgY2hhbmdlIGZyb20gIzEzMDYgYW5kICMyMDEzXG4gICAgcmV0dXJuIC9eaHR0cHM/OlxcL1xcLyh3d3dcXC4pP1stYS16QS1aMC05QDolLl8rfiM9XXsxLDI1Nn1cXC5bYS16XXsyLDYzfVxcYihbLWEtekEtWjAtOUA6JV8rLn4jPyYvPV0qKSQvLnRlc3Qoc3RyaW5nKVxuICAgICAgPyBQcm9taXNlLnJlc29sdmUoKVxuICAgICAgOiBQcm9taXNlLnJlc29sdmUodmFsaWRhdGlvbk1lc3NhZ2UgfHwgJ0ludmFsaWQgVVJMJylcbiAgfSxcbn1cbiIsImltcG9ydCB7IHdhcm4gfSBmcm9tICcuL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IGRlZmF1bHRJbnB1dFZhbGlkYXRvcnMgZnJvbSAnLi9kZWZhdWx0SW5wdXRWYWxpZGF0b3JzLmpzJ1xuXG5mdW5jdGlvbiBzZXREZWZhdWx0SW5wdXRWYWxpZGF0b3JzKHBhcmFtcykge1xuICAvLyBVc2UgZGVmYXVsdCBgaW5wdXRWYWxpZGF0b3JgIGZvciBzdXBwb3J0ZWQgaW5wdXQgdHlwZXMgaWYgbm90IHByb3ZpZGVkXG4gIGlmICghcGFyYW1zLmlucHV0VmFsaWRhdG9yKSB7XG4gICAgT2JqZWN0LmtleXMoZGVmYXVsdElucHV0VmFsaWRhdG9ycykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAocGFyYW1zLmlucHV0ID09PSBrZXkpIHtcbiAgICAgICAgcGFyYW1zLmlucHV0VmFsaWRhdG9yID0gZGVmYXVsdElucHV0VmFsaWRhdG9yc1trZXldXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZUN1c3RvbVRhcmdldEVsZW1lbnQocGFyYW1zKSB7XG4gIC8vIERldGVybWluZSBpZiB0aGUgY3VzdG9tIHRhcmdldCBlbGVtZW50IGlzIHZhbGlkXG4gIGlmIChcbiAgICAhcGFyYW1zLnRhcmdldCB8fFxuICAgICh0eXBlb2YgcGFyYW1zLnRhcmdldCA9PT0gJ3N0cmluZycgJiYgIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLnRhcmdldCkpIHx8XG4gICAgKHR5cGVvZiBwYXJhbXMudGFyZ2V0ICE9PSAnc3RyaW5nJyAmJiAhcGFyYW1zLnRhcmdldC5hcHBlbmRDaGlsZClcbiAgKSB7XG4gICAgd2FybignVGFyZ2V0IHBhcmFtZXRlciBpcyBub3QgdmFsaWQsIGRlZmF1bHRpbmcgdG8gXCJib2R5XCInKVxuICAgIHBhcmFtcy50YXJnZXQgPSAnYm9keSdcbiAgfVxufVxuXG4vKipcbiAqIFNldCB0eXBlLCB0ZXh0IGFuZCBhY3Rpb25zIG9uIHBvcHVwXG4gKlxuICogQHBhcmFtIHBhcmFtc1xuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzZXRQYXJhbWV0ZXJzKHBhcmFtcykge1xuICBzZXREZWZhdWx0SW5wdXRWYWxpZGF0b3JzKHBhcmFtcylcblxuICAvLyBzaG93TG9hZGVyT25Db25maXJtICYmIHByZUNvbmZpcm1cbiAgaWYgKHBhcmFtcy5zaG93TG9hZGVyT25Db25maXJtICYmICFwYXJhbXMucHJlQ29uZmlybSkge1xuICAgIHdhcm4oXG4gICAgICAnc2hvd0xvYWRlck9uQ29uZmlybSBpcyBzZXQgdG8gdHJ1ZSwgYnV0IHByZUNvbmZpcm0gaXMgbm90IGRlZmluZWQuXFxuJyArXG4gICAgICAgICdzaG93TG9hZGVyT25Db25maXJtIHNob3VsZCBiZSB1c2VkIHRvZ2V0aGVyIHdpdGggcHJlQ29uZmlybSwgc2VlIHVzYWdlIGV4YW1wbGU6XFxuJyArXG4gICAgICAgICdodHRwczovL3N3ZWV0YWxlcnQyLmdpdGh1Yi5pby8jYWpheC1yZXF1ZXN0J1xuICAgIClcbiAgfVxuXG4gIHZhbGlkYXRlQ3VzdG9tVGFyZ2V0RWxlbWVudChwYXJhbXMpXG5cbiAgLy8gUmVwbGFjZSBuZXdsaW5lcyB3aXRoIDxicj4gaW4gdGl0bGVcbiAgaWYgKHR5cGVvZiBwYXJhbXMudGl0bGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcGFyYW1zLnRpdGxlID0gcGFyYW1zLnRpdGxlLnNwbGl0KCdcXG4nKS5qb2luKCc8YnIgLz4nKVxuICB9XG5cbiAgZG9tLmluaXQocGFyYW1zKVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGltZXIge1xuICBjb25zdHJ1Y3RvcihjYWxsYmFjaywgZGVsYXkpIHtcbiAgICB0aGlzLmNhbGxiYWNrID0gY2FsbGJhY2tcbiAgICB0aGlzLnJlbWFpbmluZyA9IGRlbGF5XG4gICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcblxuICAgIHRoaXMuc3RhcnQoKVxuICB9XG5cbiAgc3RhcnQoKSB7XG4gICAgaWYgKCF0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IHRydWVcbiAgICAgIHRoaXMuc3RhcnRlZCA9IG5ldyBEYXRlKClcbiAgICAgIHRoaXMuaWQgPSBzZXRUaW1lb3V0KHRoaXMuY2FsbGJhY2ssIHRoaXMucmVtYWluaW5nKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdcbiAgfVxuXG4gIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5ydW5uaW5nID0gZmFsc2VcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLmlkKVxuICAgICAgdGhpcy5yZW1haW5pbmcgLT0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0aGlzLnN0YXJ0ZWQuZ2V0VGltZSgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1xuICB9XG5cbiAgaW5jcmVhc2Uobikge1xuICAgIGNvbnN0IHJ1bm5pbmcgPSB0aGlzLnJ1bm5pbmdcbiAgICBpZiAocnVubmluZykge1xuICAgICAgdGhpcy5zdG9wKClcbiAgICB9XG4gICAgdGhpcy5yZW1haW5pbmcgKz0gblxuICAgIGlmIChydW5uaW5nKSB7XG4gICAgICB0aGlzLnN0YXJ0KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBnZXRUaW1lckxlZnQoKSB7XG4gICAgaWYgKHRoaXMucnVubmluZykge1xuICAgICAgdGhpcy5zdG9wKClcbiAgICAgIHRoaXMuc3RhcnQoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdcbiAgfVxuXG4gIGlzUnVubmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5ydW5uaW5nXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IGZpeFNjcm9sbGJhciA9ICgpID0+IHtcbiAgLy8gZm9yIHF1ZXVlcywgZG8gbm90IGRvIHRoaXMgbW9yZSB0aGFuIG9uY2VcbiAgaWYgKGRvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyAhPT0gbnVsbCkge1xuICAgIHJldHVyblxuICB9XG4gIC8vIGlmIHRoZSBib2R5IGhhcyBvdmVyZmxvd1xuICBpZiAoZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAvLyBhZGQgcGFkZGluZyBzbyB0aGUgY29udGVudCBkb2Vzbid0IHNoaWZ0IGFmdGVyIHJlbW92YWwgb2Ygc2Nyb2xsYmFyXG4gICAgZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSkuZ2V0UHJvcGVydHlWYWx1ZSgncGFkZGluZy1yaWdodCcpKVxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7ZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nICsgZG9tLm1lYXN1cmVTY3JvbGxiYXIoKX1weGBcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgdW5kb1Njcm9sbGJhciA9ICgpID0+IHtcbiAgaWYgKGRvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyAhPT0gbnVsbCkge1xuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7ZG9tLnN0YXRlcy5wcmV2aW91c0JvZHlQYWRkaW5nfXB4YFxuICAgIGRvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyA9IG51bGxcbiAgfVxufVxuIiwiLyogaXN0YW5idWwgaWdub3JlIGZpbGUgKi9cbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcblxuLy8gRml4IGlPUyBzY3JvbGxpbmcgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3EvMzk2MjYzMDJcblxuZXhwb3J0IGNvbnN0IGlPU2ZpeCA9ICgpID0+IHtcbiAgY29uc3QgaU9TID1cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgKC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW0pIHx8XG4gICAgKG5hdmlnYXRvci5wbGF0Zm9ybSA9PT0gJ01hY0ludGVsJyAmJiBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKVxuICBpZiAoaU9TICYmICFkb20uaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KSkge1xuICAgIGNvbnN0IG9mZnNldCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSBgJHtvZmZzZXQgKiAtMX1weGBcbiAgICBkb20uYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXMuaW9zZml4KVxuICAgIGxvY2tCb2R5U2Nyb2xsKClcbiAgICBhZGRCb3R0b21QYWRkaW5nRm9yVGFsbFBvcHVwcygpXG4gIH1cbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE5NDhcbiAqL1xuY29uc3QgYWRkQm90dG9tUGFkZGluZ0ZvclRhbGxQb3B1cHMgPSAoKSA9PiB7XG4gIGNvbnN0IHVhID0gbmF2aWdhdG9yLnVzZXJBZ2VudFxuICBjb25zdCBpT1MgPSAhIXVhLm1hdGNoKC9pUGFkL2kpIHx8ICEhdWEubWF0Y2goL2lQaG9uZS9pKVxuICBjb25zdCB3ZWJraXQgPSAhIXVhLm1hdGNoKC9XZWJLaXQvaSlcbiAgY29uc3QgaU9TU2FmYXJpID0gaU9TICYmIHdlYmtpdCAmJiAhdWEubWF0Y2goL0NyaU9TL2kpXG4gIGlmIChpT1NTYWZhcmkpIHtcbiAgICBjb25zdCBib3R0b21QYW5lbEhlaWdodCA9IDQ0XG4gICAgaWYgKGRvbS5nZXRQb3B1cCgpLnNjcm9sbEhlaWdodCA+IHdpbmRvdy5pbm5lckhlaWdodCAtIGJvdHRvbVBhbmVsSGVpZ2h0KSB7XG4gICAgICBkb20uZ2V0Q29udGFpbmVyKCkuc3R5bGUucGFkZGluZ0JvdHRvbSA9IGAke2JvdHRvbVBhbmVsSGVpZ2h0fXB4YFxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTI0NlxuICovXG5jb25zdCBsb2NrQm9keVNjcm9sbCA9ICgpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGxldCBwcmV2ZW50VG91Y2hNb3ZlXG4gIGNvbnRhaW5lci5vbnRvdWNoc3RhcnQgPSAoZSkgPT4ge1xuICAgIHByZXZlbnRUb3VjaE1vdmUgPSBzaG91bGRQcmV2ZW50VG91Y2hNb3ZlKGUpXG4gIH1cbiAgY29udGFpbmVyLm9udG91Y2htb3ZlID0gKGUpID0+IHtcbiAgICBpZiAocHJldmVudFRvdWNoTW92ZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHNob3VsZFByZXZlbnRUb3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBpZiAoaXNTdHlsdXMoZXZlbnQpIHx8IGlzWm9vbShldmVudCkpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAodGFyZ2V0ID09PSBjb250YWluZXIpIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIGlmIChcbiAgICAhZG9tLmlzU2Nyb2xsYWJsZShjb250YWluZXIpICYmXG4gICAgdGFyZ2V0LnRhZ05hbWUgIT09ICdJTlBVVCcgJiYgLy8gIzE2MDNcbiAgICB0YXJnZXQudGFnTmFtZSAhPT0gJ1RFWFRBUkVBJyAmJiAvLyAjMjI2NlxuICAgICEoXG4gICAgICBkb20uaXNTY3JvbGxhYmxlKGRvbS5nZXRIdG1sQ29udGFpbmVyKCkpICYmIC8vICMxOTQ0XG4gICAgICBkb20uZ2V0SHRtbENvbnRhaW5lcigpLmNvbnRhaW5zKHRhcmdldClcbiAgICApXG4gICkge1xuICAgIHJldHVybiB0cnVlXG4gIH1cbiAgcmV0dXJuIGZhbHNlXG59XG5cbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xNzg2XG4gKlxuICogQHBhcmFtIHsqfSBldmVudFxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzU3R5bHVzID0gKGV2ZW50KSA9PiB7XG4gIHJldHVybiBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoICYmIGV2ZW50LnRvdWNoZXNbMF0udG91Y2hUeXBlID09PSAnc3R5bHVzJ1xufVxuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTg5MVxuICpcbiAqIEBwYXJhbSB7VG91Y2hFdmVudH0gZXZlbnRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1pvb20gPSAoZXZlbnQpID0+IHtcbiAgcmV0dXJuIGV2ZW50LnRvdWNoZXMgJiYgZXZlbnQudG91Y2hlcy5sZW5ndGggPiAxXG59XG5cbmV4cG9ydCBjb25zdCB1bmRvSU9TZml4ID0gKCkgPT4ge1xuICBpZiAoZG9tLmhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeCkpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBwYXJzZUludChkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCwgMTApXG4gICAgZG9tLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeClcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnRvcCA9ICcnXG4gICAgZG9jdW1lbnQuYm9keS5zY3JvbGxUb3AgPSBvZmZzZXQgKiAtMVxuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGZpeFNjcm9sbGJhciB9IGZyb20gJy4vc2Nyb2xsYmFyRml4LmpzJ1xuaW1wb3J0IHsgaU9TZml4IH0gZnJvbSAnLi9pb3NGaXguanMnXG5pbXBvcnQgeyBzZXRBcmlhSGlkZGVuIH0gZnJvbSAnLi9hcmlhLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuXG5leHBvcnQgY29uc3QgU0hPV19DTEFTU19USU1FT1VUID0gMTBcblxuLyoqXG4gKiBPcGVuIHBvcHVwLCBhZGQgbmVjZXNzYXJ5IGNsYXNzZXMgYW5kIHN0eWxlcywgZml4IHNjcm9sbGJhclxuICpcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IG9wZW5Qb3B1cCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcblxuICBpZiAodHlwZW9mIHBhcmFtcy53aWxsT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHBhcmFtcy53aWxsT3Blbihwb3B1cClcbiAgfVxuXG4gIGNvbnN0IGJvZHlTdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5ib2R5KVxuICBjb25zdCBpbml0aWFsQm9keU92ZXJmbG93ID0gYm9keVN0eWxlcy5vdmVyZmxvd1lcbiAgYWRkQ2xhc3Nlcyhjb250YWluZXIsIHBvcHVwLCBwYXJhbXMpXG5cbiAgLy8gc2Nyb2xsaW5nIGlzICdoaWRkZW4nIHVudGlsIGFuaW1hdGlvbiBpcyBkb25lLCBhZnRlciB0aGF0ICdhdXRvJ1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBzZXRTY3JvbGxpbmdWaXNpYmlsaXR5KGNvbnRhaW5lciwgcG9wdXApXG4gIH0sIFNIT1dfQ0xBU1NfVElNRU9VVClcblxuICBpZiAoZG9tLmlzTW9kYWwoKSkge1xuICAgIGZpeFNjcm9sbENvbnRhaW5lcihjb250YWluZXIsIHBhcmFtcy5zY3JvbGxiYXJQYWRkaW5nLCBpbml0aWFsQm9keU92ZXJmbG93KVxuICAgIHNldEFyaWFIaWRkZW4oKVxuICB9XG5cbiAgaWYgKCFkb20uaXNUb2FzdCgpICYmICFnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQpIHtcbiAgICBnbG9iYWxTdGF0ZS5wcmV2aW91c0FjdGl2ZUVsZW1lbnQgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50XG4gIH1cblxuICBpZiAodHlwZW9mIHBhcmFtcy5kaWRPcGVuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBwYXJhbXMuZGlkT3Blbihwb3B1cCkpXG4gIH1cblxuICBkb20ucmVtb3ZlQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1snbm8tdHJhbnNpdGlvbiddKVxufVxuXG5jb25zdCBzd2FsT3BlbkFuaW1hdGlvbkZpbmlzaGVkID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgaWYgKGV2ZW50LnRhcmdldCAhPT0gcG9wdXApIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgcG9wdXAucmVtb3ZlRXZlbnRMaXN0ZW5lcihkb20uYW5pbWF0aW9uRW5kRXZlbnQsIHN3YWxPcGVuQW5pbWF0aW9uRmluaXNoZWQpXG4gIGNvbnRhaW5lci5zdHlsZS5vdmVyZmxvd1kgPSAnYXV0bydcbn1cblxuY29uc3Qgc2V0U2Nyb2xsaW5nVmlzaWJpbGl0eSA9IChjb250YWluZXIsIHBvcHVwKSA9PiB7XG4gIGlmIChkb20uYW5pbWF0aW9uRW5kRXZlbnQgJiYgZG9tLmhhc0Nzc0FuaW1hdGlvbihwb3B1cCkpIHtcbiAgICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gJ2hpZGRlbidcbiAgICBwb3B1cC5hZGRFdmVudExpc3RlbmVyKGRvbS5hbmltYXRpb25FbmRFdmVudCwgc3dhbE9wZW5BbmltYXRpb25GaW5pc2hlZClcbiAgfSBlbHNlIHtcbiAgICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nXG4gIH1cbn1cblxuY29uc3QgZml4U2Nyb2xsQ29udGFpbmVyID0gKGNvbnRhaW5lciwgc2Nyb2xsYmFyUGFkZGluZywgaW5pdGlhbEJvZHlPdmVyZmxvdykgPT4ge1xuICBpT1NmaXgoKVxuXG4gIGlmIChzY3JvbGxiYXJQYWRkaW5nICYmIGluaXRpYWxCb2R5T3ZlcmZsb3cgIT09ICdoaWRkZW4nKSB7XG4gICAgZml4U2Nyb2xsYmFyKClcbiAgfVxuXG4gIC8vIHN3ZWV0YWxlcnQyL2lzc3Vlcy8xMjQ3XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGNvbnRhaW5lci5zY3JvbGxUb3AgPSAwXG4gIH0pXG59XG5cbmNvbnN0IGFkZENsYXNzZXMgPSAoY29udGFpbmVyLCBwb3B1cCwgcGFyYW1zKSA9PiB7XG4gIGRvbS5hZGRDbGFzcyhjb250YWluZXIsIHBhcmFtcy5zaG93Q2xhc3MuYmFja2Ryb3ApXG4gIC8vIHRoaXMgd29ya2Fyb3VuZCB3aXRoIG9wYWNpdHkgaXMgbmVlZGVkIGZvciBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzIwNTlcbiAgcG9wdXAuc3R5bGUuc2V0UHJvcGVydHkoJ29wYWNpdHknLCAnMCcsICdpbXBvcnRhbnQnKVxuICBkb20uc2hvdyhwb3B1cCwgJ2dyaWQnKVxuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAvLyBBbmltYXRlIHBvcHVwIHJpZ2h0IGFmdGVyIHNob3dpbmcgaXRcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHBhcmFtcy5zaG93Q2xhc3MucG9wdXApXG4gICAgLy8gYW5kIHJlbW92ZSB0aGUgb3BhY2l0eSB3b3JrYXJvdW5kXG4gICAgcG9wdXAuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ29wYWNpdHknKVxuICB9LCBTSE9XX0NMQVNTX1RJTUVPVVQpIC8vIDEwbXMgaW4gb3JkZXIgdG8gZml4ICMyMDYyXG5cbiAgZG9tLmFkZENsYXNzKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLCBzd2FsQ2xhc3Nlcy5zaG93bilcbiAgaWYgKHBhcmFtcy5oZWlnaHRBdXRvICYmIHBhcmFtcy5iYWNrZHJvcCAmJiAhcGFyYW1zLnRvYXN0KSB7XG4gICAgZG9tLmFkZENsYXNzKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLCBzd2FsQ2xhc3Nlc1snaGVpZ2h0LWF1dG8nXSlcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCBTd2FsIGZyb20gJy4uL3N3ZWV0YWxlcnQyLmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi91dGlscy9jbGFzc2VzLmpzJ1xuXG4vKipcbiAqIFNob3dzIGxvYWRlciAoc3Bpbm5lciksIHRoaXMgaXMgdXNlZnVsIHdpdGggQUpBWCByZXF1ZXN0cy5cbiAqIEJ5IGRlZmF1bHQgdGhlIGxvYWRlciBiZSBzaG93biBpbnN0ZWFkIG9mIHRoZSBcIkNvbmZpcm1cIiBidXR0b24uXG4gKi9cbmNvbnN0IHNob3dMb2FkaW5nID0gKGJ1dHRvblRvUmVwbGFjZSkgPT4ge1xuICBsZXQgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBpZiAoIXBvcHVwKSB7XG4gICAgbmV3IFN3YWwoKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLW5ld1xuICB9XG4gIHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgbG9hZGVyID0gZG9tLmdldExvYWRlcigpXG5cbiAgaWYgKGRvbS5pc1RvYXN0KCkpIHtcbiAgICBkb20uaGlkZShkb20uZ2V0SWNvbigpKVxuICB9IGVsc2Uge1xuICAgIHJlcGxhY2VCdXR0b24ocG9wdXAsIGJ1dHRvblRvUmVwbGFjZSlcbiAgfVxuICBkb20uc2hvdyhsb2FkZXIpXG5cbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnLCB0cnVlKVxuICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ2FyaWEtYnVzeScsIHRydWUpXG4gIHBvcHVwLmZvY3VzKClcbn1cblxuY29uc3QgcmVwbGFjZUJ1dHRvbiA9IChwb3B1cCwgYnV0dG9uVG9SZXBsYWNlKSA9PiB7XG4gIGNvbnN0IGFjdGlvbnMgPSBkb20uZ2V0QWN0aW9ucygpXG4gIGNvbnN0IGxvYWRlciA9IGRvbS5nZXRMb2FkZXIoKVxuXG4gIGlmICghYnV0dG9uVG9SZXBsYWNlICYmIGRvbS5pc1Zpc2libGUoZG9tLmdldENvbmZpcm1CdXR0b24oKSkpIHtcbiAgICBidXR0b25Ub1JlcGxhY2UgPSBkb20uZ2V0Q29uZmlybUJ1dHRvbigpXG4gIH1cblxuICBkb20uc2hvdyhhY3Rpb25zKVxuICBpZiAoYnV0dG9uVG9SZXBsYWNlKSB7XG4gICAgZG9tLmhpZGUoYnV0dG9uVG9SZXBsYWNlKVxuICAgIGxvYWRlci5zZXRBdHRyaWJ1dGUoJ2RhdGEtYnV0dG9uLXRvLXJlcGxhY2UnLCBidXR0b25Ub1JlcGxhY2UuY2xhc3NOYW1lKVxuICB9XG4gIGxvYWRlci5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsb2FkZXIsIGJ1dHRvblRvUmVwbGFjZSlcbiAgZG9tLmFkZENsYXNzKFtwb3B1cCwgYWN0aW9uc10sIHN3YWxDbGFzc2VzLmxvYWRpbmcpXG59XG5cbmV4cG9ydCB7IHNob3dMb2FkaW5nLCBzaG93TG9hZGluZyBhcyBlbmFibGVMb2FkaW5nIH1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzIH0gZnJvbSAnLi9kb21VdGlscy5qcydcbmltcG9ydCB7IGFzUHJvbWlzZSwgZXJyb3IsIGhhc1RvUHJvbWlzZUZuLCBpc1Byb21pc2UgfSBmcm9tICcuLi91dGlscy5qcydcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi4vLi4vc3RhdGljTWV0aG9kcy9zaG93TG9hZGluZy5qcydcblxuZXhwb3J0IGNvbnN0IGhhbmRsZUlucHV0T3B0aW9uc0FuZFZhbHVlID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgaWYgKHBhcmFtcy5pbnB1dCA9PT0gJ3NlbGVjdCcgfHwgcGFyYW1zLmlucHV0ID09PSAncmFkaW8nKSB7XG4gICAgaGFuZGxlSW5wdXRPcHRpb25zKGluc3RhbmNlLCBwYXJhbXMpXG4gIH0gZWxzZSBpZiAoXG4gICAgWyd0ZXh0JywgJ2VtYWlsJywgJ251bWJlcicsICd0ZWwnLCAndGV4dGFyZWEnXS5pbmNsdWRlcyhwYXJhbXMuaW5wdXQpICYmXG4gICAgKGhhc1RvUHJvbWlzZUZuKHBhcmFtcy5pbnB1dFZhbHVlKSB8fCBpc1Byb21pc2UocGFyYW1zLmlucHV0VmFsdWUpKVxuICApIHtcbiAgICBzaG93TG9hZGluZyhkb20uZ2V0Q29uZmlybUJ1dHRvbigpKVxuICAgIGhhbmRsZUlucHV0VmFsdWUoaW5zdGFuY2UsIHBhcmFtcylcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgZ2V0SW5wdXRWYWx1ZSA9IChpbnN0YW5jZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgY29uc3QgaW5wdXQgPSBpbnN0YW5jZS5nZXRJbnB1dCgpXG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHN3aXRjaCAoaW5uZXJQYXJhbXMuaW5wdXQpIHtcbiAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICByZXR1cm4gZ2V0Q2hlY2tib3hWYWx1ZShpbnB1dClcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gZ2V0UmFkaW9WYWx1ZShpbnB1dClcbiAgICBjYXNlICdmaWxlJzpcbiAgICAgIHJldHVybiBnZXRGaWxlVmFsdWUoaW5wdXQpXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBpbm5lclBhcmFtcy5pbnB1dEF1dG9UcmltID8gaW5wdXQudmFsdWUudHJpbSgpIDogaW5wdXQudmFsdWVcbiAgfVxufVxuXG5jb25zdCBnZXRDaGVja2JveFZhbHVlID0gKGlucHV0KSA9PiAoaW5wdXQuY2hlY2tlZCA/IDEgOiAwKVxuXG5jb25zdCBnZXRSYWRpb1ZhbHVlID0gKGlucHV0KSA9PiAoaW5wdXQuY2hlY2tlZCA/IGlucHV0LnZhbHVlIDogbnVsbClcblxuY29uc3QgZ2V0RmlsZVZhbHVlID0gKGlucHV0KSA9PlxuICBpbnB1dC5maWxlcy5sZW5ndGggPyAoaW5wdXQuZ2V0QXR0cmlidXRlKCdtdWx0aXBsZScpICE9PSBudWxsID8gaW5wdXQuZmlsZXMgOiBpbnB1dC5maWxlc1swXSkgOiBudWxsXG5cbmNvbnN0IGhhbmRsZUlucHV0T3B0aW9ucyA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgcHJvY2Vzc0lucHV0T3B0aW9ucyA9IChpbnB1dE9wdGlvbnMpID0+XG4gICAgcG9wdWxhdGVJbnB1dE9wdGlvbnNbcGFyYW1zLmlucHV0XShwb3B1cCwgZm9ybWF0SW5wdXRPcHRpb25zKGlucHV0T3B0aW9ucyksIHBhcmFtcylcbiAgaWYgKGhhc1RvUHJvbWlzZUZuKHBhcmFtcy5pbnB1dE9wdGlvbnMpIHx8IGlzUHJvbWlzZShwYXJhbXMuaW5wdXRPcHRpb25zKSkge1xuICAgIHNob3dMb2FkaW5nKGRvbS5nZXRDb25maXJtQnV0dG9uKCkpXG4gICAgYXNQcm9taXNlKHBhcmFtcy5pbnB1dE9wdGlvbnMpLnRoZW4oKGlucHV0T3B0aW9ucykgPT4ge1xuICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgICAgcHJvY2Vzc0lucHV0T3B0aW9ucyhpbnB1dE9wdGlvbnMpXG4gICAgfSlcbiAgfSBlbHNlIGlmICh0eXBlb2YgcGFyYW1zLmlucHV0T3B0aW9ucyA9PT0gJ29iamVjdCcpIHtcbiAgICBwcm9jZXNzSW5wdXRPcHRpb25zKHBhcmFtcy5pbnB1dE9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgZXJyb3IoYFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dE9wdGlvbnMhIEV4cGVjdGVkIG9iamVjdCwgTWFwIG9yIFByb21pc2UsIGdvdCAke3R5cGVvZiBwYXJhbXMuaW5wdXRPcHRpb25zfWApXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlSW5wdXRWYWx1ZSA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gaW5zdGFuY2UuZ2V0SW5wdXQoKVxuICBkb20uaGlkZShpbnB1dClcbiAgYXNQcm9taXNlKHBhcmFtcy5pbnB1dFZhbHVlKVxuICAgIC50aGVuKChpbnB1dFZhbHVlKSA9PiB7XG4gICAgICBpbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dCA9PT0gJ251bWJlcicgPyBwYXJzZUZsb2F0KGlucHV0VmFsdWUpIHx8IDAgOiBgJHtpbnB1dFZhbHVlfWBcbiAgICAgIGRvbS5zaG93KGlucHV0KVxuICAgICAgaW5wdXQuZm9jdXMoKVxuICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgIH0pXG4gICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgIGVycm9yKGBFcnJvciBpbiBpbnB1dFZhbHVlIHByb21pc2U6ICR7ZXJyfWApXG4gICAgICBpbnB1dC52YWx1ZSA9ICcnXG4gICAgICBkb20uc2hvdyhpbnB1dClcbiAgICAgIGlucHV0LmZvY3VzKClcbiAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICB9KVxufVxuXG5jb25zdCBwb3B1bGF0ZUlucHV0T3B0aW9ucyA9IHtcbiAgc2VsZWN0OiAocG9wdXAsIGlucHV0T3B0aW9ucywgcGFyYW1zKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0ID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5zZWxlY3QpXG4gICAgY29uc3QgcmVuZGVyT3B0aW9uID0gKHBhcmVudCwgb3B0aW9uTGFiZWwsIG9wdGlvblZhbHVlKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uVmFsdWVcbiAgICAgIGRvbS5zZXRJbm5lckh0bWwob3B0aW9uLCBvcHRpb25MYWJlbClcbiAgICAgIG9wdGlvbi5zZWxlY3RlZCA9IGlzU2VsZWN0ZWQob3B0aW9uVmFsdWUsIHBhcmFtcy5pbnB1dFZhbHVlKVxuICAgICAgcGFyZW50LmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICB9XG4gICAgaW5wdXRPcHRpb25zLmZvckVhY2goKGlucHV0T3B0aW9uKSA9PiB7XG4gICAgICBjb25zdCBvcHRpb25WYWx1ZSA9IGlucHV0T3B0aW9uWzBdXG4gICAgICBjb25zdCBvcHRpb25MYWJlbCA9IGlucHV0T3B0aW9uWzFdXG4gICAgICAvLyA8b3B0Z3JvdXA+IHNwZWM6XG4gICAgICAvLyBodHRwczovL3d3dy53My5vcmcvVFIvaHRtbDQwMS9pbnRlcmFjdC9mb3Jtcy5odG1sI2gtMTcuNlxuICAgICAgLy8gXCIuLi5hbGwgT1BUR1JPVVAgZWxlbWVudHMgbXVzdCBiZSBzcGVjaWZpZWQgZGlyZWN0bHkgd2l0aGluIGEgU0VMRUNUIGVsZW1lbnQgKGkuZS4sIGdyb3VwcyBtYXkgbm90IGJlIG5lc3RlZCkuLi5cIlxuICAgICAgLy8gY2hlY2sgd2hldGhlciB0aGlzIGlzIGEgPG9wdGdyb3VwPlxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uTGFiZWwpKSB7XG4gICAgICAgIC8vIGlmIGl0IGlzIGFuIGFycmF5LCB0aGVuIGl0IGlzIGFuIDxvcHRncm91cD5cbiAgICAgICAgY29uc3Qgb3B0Z3JvdXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRncm91cCcpXG4gICAgICAgIG9wdGdyb3VwLmxhYmVsID0gb3B0aW9uVmFsdWVcbiAgICAgICAgb3B0Z3JvdXAuZGlzYWJsZWQgPSBmYWxzZSAvLyBub3QgY29uZmlndXJhYmxlIGZvciBub3dcbiAgICAgICAgc2VsZWN0LmFwcGVuZENoaWxkKG9wdGdyb3VwKVxuICAgICAgICBvcHRpb25MYWJlbC5mb3JFYWNoKChvKSA9PiByZW5kZXJPcHRpb24ob3B0Z3JvdXAsIG9bMV0sIG9bMF0pKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gY2FzZSBvZiA8b3B0aW9uPlxuICAgICAgICByZW5kZXJPcHRpb24oc2VsZWN0LCBvcHRpb25MYWJlbCwgb3B0aW9uVmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICBzZWxlY3QuZm9jdXMoKVxuICB9LFxuXG4gIHJhZGlvOiAocG9wdXAsIGlucHV0T3B0aW9ucywgcGFyYW1zKSA9PiB7XG4gICAgY29uc3QgcmFkaW8gPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnJhZGlvKVxuICAgIGlucHV0T3B0aW9ucy5mb3JFYWNoKChpbnB1dE9wdGlvbikgPT4ge1xuICAgICAgY29uc3QgcmFkaW9WYWx1ZSA9IGlucHV0T3B0aW9uWzBdXG4gICAgICBjb25zdCByYWRpb0xhYmVsID0gaW5wdXRPcHRpb25bMV1cbiAgICAgIGNvbnN0IHJhZGlvSW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXG4gICAgICBjb25zdCByYWRpb0xhYmVsRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcbiAgICAgIHJhZGlvSW5wdXQudHlwZSA9ICdyYWRpbydcbiAgICAgIHJhZGlvSW5wdXQubmFtZSA9IHN3YWxDbGFzc2VzLnJhZGlvXG4gICAgICByYWRpb0lucHV0LnZhbHVlID0gcmFkaW9WYWx1ZVxuICAgICAgaWYgKGlzU2VsZWN0ZWQocmFkaW9WYWx1ZSwgcGFyYW1zLmlucHV0VmFsdWUpKSB7XG4gICAgICAgIHJhZGlvSW5wdXQuY2hlY2tlZCA9IHRydWVcbiAgICAgIH1cbiAgICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICBkb20uc2V0SW5uZXJIdG1sKGxhYmVsLCByYWRpb0xhYmVsKVxuICAgICAgbGFiZWwuY2xhc3NOYW1lID0gc3dhbENsYXNzZXMubGFiZWxcbiAgICAgIHJhZGlvTGFiZWxFbGVtZW50LmFwcGVuZENoaWxkKHJhZGlvSW5wdXQpXG4gICAgICByYWRpb0xhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChsYWJlbClcbiAgICAgIHJhZGlvLmFwcGVuZENoaWxkKHJhZGlvTGFiZWxFbGVtZW50KVxuICAgIH0pXG4gICAgY29uc3QgcmFkaW9zID0gcmFkaW8ucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKVxuICAgIGlmIChyYWRpb3MubGVuZ3RoKSB7XG4gICAgICByYWRpb3NbMF0uZm9jdXMoKVxuICAgIH1cbiAgfSxcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgaW5wdXRPcHRpb25zYCBpbnRvIGFuIGFycmF5IG9mIGBbdmFsdWUsIGxhYmVsXWBzXG4gKiBAcGFyYW0gaW5wdXRPcHRpb25zXG4gKi9cbmNvbnN0IGZvcm1hdElucHV0T3B0aW9ucyA9IChpbnB1dE9wdGlvbnMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgaWYgKHR5cGVvZiBNYXAgIT09ICd1bmRlZmluZWQnICYmIGlucHV0T3B0aW9ucyBpbnN0YW5jZW9mIE1hcCkge1xuICAgIGlucHV0T3B0aW9ucy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICBsZXQgdmFsdWVGb3JtYXR0ZWQgPSB2YWx1ZVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZUZvcm1hdHRlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gY2FzZSBvZiA8b3B0Z3JvdXA+XG4gICAgICAgIHZhbHVlRm9ybWF0dGVkID0gZm9ybWF0SW5wdXRPcHRpb25zKHZhbHVlRm9ybWF0dGVkKVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVGb3JtYXR0ZWRdKVxuICAgIH0pXG4gIH0gZWxzZSB7XG4gICAgT2JqZWN0LmtleXMoaW5wdXRPcHRpb25zKS5mb3JFYWNoKChrZXkpID0+IHtcbiAgICAgIGxldCB2YWx1ZUZvcm1hdHRlZCA9IGlucHV0T3B0aW9uc1trZXldXG4gICAgICBpZiAodHlwZW9mIHZhbHVlRm9ybWF0dGVkID09PSAnb2JqZWN0Jykge1xuICAgICAgICAvLyBjYXNlIG9mIDxvcHRncm91cD5cbiAgICAgICAgdmFsdWVGb3JtYXR0ZWQgPSBmb3JtYXRJbnB1dE9wdGlvbnModmFsdWVGb3JtYXR0ZWQpXG4gICAgICB9XG4gICAgICByZXN1bHQucHVzaChba2V5LCB2YWx1ZUZvcm1hdHRlZF0pXG4gICAgfSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGlzU2VsZWN0ZWQgPSAob3B0aW9uVmFsdWUsIGlucHV0VmFsdWUpID0+IHtcbiAgcmV0dXJuIGlucHV0VmFsdWUgJiYgaW5wdXRWYWx1ZS50b1N0cmluZygpID09PSBvcHRpb25WYWx1ZS50b1N0cmluZygpXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi91dGlscy9jbGFzc2VzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5cbi8qKlxuICogSGlkZXMgbG9hZGVyIGFuZCBzaG93cyBiYWNrIHRoZSBidXR0b24gd2hpY2ggd2FzIGhpZGRlbiBieSAuc2hvd0xvYWRpbmcoKVxuICovXG5mdW5jdGlvbiBoaWRlTG9hZGluZygpIHtcbiAgLy8gZG8gbm90aGluZyBpZiBwb3B1cCBpcyBjbG9zZWRcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KHRoaXMpXG4gIGlmICghaW5uZXJQYXJhbXMpIHtcbiAgICByZXR1cm5cbiAgfVxuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQodGhpcylcbiAgZG9tLmhpZGUoZG9tQ2FjaGUubG9hZGVyKVxuICBpZiAoZG9tLmlzVG9hc3QoKSkge1xuICAgIGlmIChpbm5lclBhcmFtcy5pY29uKSB7XG4gICAgICBkb20uc2hvdyhkb20uZ2V0SWNvbigpKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzaG93UmVsYXRlZEJ1dHRvbihkb21DYWNoZSlcbiAgfVxuICBkb20ucmVtb3ZlQ2xhc3MoW2RvbUNhY2hlLnBvcHVwLCBkb21DYWNoZS5hY3Rpb25zXSwgc3dhbENsYXNzZXMubG9hZGluZylcbiAgZG9tQ2FjaGUucG9wdXAucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWJ1c3knKVxuICBkb21DYWNoZS5wb3B1cC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtbG9hZGluZycpXG4gIGRvbUNhY2hlLmNvbmZpcm1CdXR0b24uZGlzYWJsZWQgPSBmYWxzZVxuICBkb21DYWNoZS5kZW55QnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgZG9tQ2FjaGUuY2FuY2VsQnV0dG9uLmRpc2FibGVkID0gZmFsc2Vcbn1cblxuY29uc3Qgc2hvd1JlbGF0ZWRCdXR0b24gPSAoZG9tQ2FjaGUpID0+IHtcbiAgY29uc3QgYnV0dG9uVG9SZXBsYWNlID0gZG9tQ2FjaGUucG9wdXAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShkb21DYWNoZS5sb2FkZXIuZ2V0QXR0cmlidXRlKCdkYXRhLWJ1dHRvbi10by1yZXBsYWNlJykpXG4gIGlmIChidXR0b25Ub1JlcGxhY2UubGVuZ3RoKSB7XG4gICAgZG9tLnNob3coYnV0dG9uVG9SZXBsYWNlWzBdLCAnaW5saW5lLWJsb2NrJylcbiAgfSBlbHNlIGlmIChkb20uYWxsQnV0dG9uc0FyZUhpZGRlbigpKSB7XG4gICAgZG9tLmhpZGUoZG9tQ2FjaGUuYWN0aW9ucylcbiAgfVxufVxuXG5leHBvcnQgeyBoaWRlTG9hZGluZywgaGlkZUxvYWRpbmcgYXMgZGlzYWJsZUxvYWRpbmcgfVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG4vKipcbiAqIEdldHMgdGhlIGlucHV0IERPTSBub2RlLCB0aGlzIG1ldGhvZCB3b3JrcyB3aXRoIGlucHV0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnB1dChpbnN0YW5jZSkge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UgfHwgdGhpcylcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG4gIGlmICghZG9tQ2FjaGUpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJldHVybiBkb20uZ2V0SW5wdXQoZG9tQ2FjaGUucG9wdXAsIGlubmVyUGFyYW1zLmlucHV0KVxufVxuIiwiLyoqXG4gKiBUaGlzIG1vZHVsZSBjb250YWlucyBgV2Vha01hcGBzIGZvciBlYWNoIGVmZmVjdGl2ZWx5LVwicHJpdmF0ZSAgcHJvcGVydHlcIiB0aGF0IGEgYFN3YWxgIGhhcy5cbiAqIEZvciBleGFtcGxlLCB0byBzZXQgdGhlIHByaXZhdGUgcHJvcGVydHkgXCJmb29cIiBvZiBgdGhpc2AgdG8gXCJiYXJcIiwgeW91IGNhbiBgcHJpdmF0ZVByb3BzLmZvby5zZXQodGhpcywgJ2JhcicpYFxuICogVGhpcyBpcyB0aGUgYXBwcm9hY2ggdGhhdCBCYWJlbCB3aWxsIHByb2JhYmx5IHRha2UgdG8gaW1wbGVtZW50IHByaXZhdGUgbWV0aG9kcy9maWVsZHNcbiAqICAgaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtcHJpdmF0ZS1tZXRob2RzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS9iYWJlbC9iYWJlbC9wdWxsLzc1NTVcbiAqIE9uY2Ugd2UgaGF2ZSB0aGUgY2hhbmdlcyBmcm9tIHRoYXQgUFIgaW4gQmFiZWwsIGFuZCBvdXIgY29yZSBjbGFzcyBmaXRzIHJlYXNvbmFibGUgaW4gKm9uZSBtb2R1bGUqXG4gKiAgIHRoZW4gd2UgY2FuIHVzZSB0aGF0IGxhbmd1YWdlIGZlYXR1cmUuXG4gKi9cblxuZXhwb3J0IGRlZmF1bHQge1xuICBzd2FsUHJvbWlzZVJlc29sdmU6IG5ldyBXZWFrTWFwKCksXG4gIHN3YWxQcm9taXNlUmVqZWN0OiBuZXcgV2Vha01hcCgpLFxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCAqIGFzIGRvbVV0aWxzIGZyb20gJy4uL3V0aWxzL2RvbS9kb21VdGlscy5qcydcblxuZXhwb3J0IHtcbiAgZ2V0Q29udGFpbmVyLFxuICBnZXRQb3B1cCxcbiAgZ2V0VGl0bGUsXG4gIGdldEh0bWxDb250YWluZXIsXG4gIGdldEltYWdlLFxuICBnZXRJY29uLFxuICBnZXRJbnB1dExhYmVsLFxuICBnZXRDbG9zZUJ1dHRvbixcbiAgZ2V0QWN0aW9ucyxcbiAgZ2V0Q29uZmlybUJ1dHRvbixcbiAgZ2V0RGVueUJ1dHRvbixcbiAgZ2V0Q2FuY2VsQnV0dG9uLFxuICBnZXRMb2FkZXIsXG4gIGdldEZvb3RlcixcbiAgZ2V0VGltZXJQcm9ncmVzc0JhcixcbiAgZ2V0Rm9jdXNhYmxlRWxlbWVudHMsXG4gIGdldFZhbGlkYXRpb25NZXNzYWdlLFxuICBpc0xvYWRpbmcsXG59IGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgU3dlZXRBbGVydDIgcG9wdXAgaXMgc2hvd25cbiAqL1xuZXhwb3J0IGNvbnN0IGlzVmlzaWJsZSA9ICgpID0+IHtcbiAgcmV0dXJuIGRvbVV0aWxzLmlzVmlzaWJsZShkb20uZ2V0UG9wdXAoKSlcbn1cblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBjbGljayAnQ29uZmlybScgYnV0dG9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGlja0NvbmZpcm0gPSAoKSA9PiBkb20uZ2V0Q29uZmlybUJ1dHRvbigpICYmIGRvbS5nZXRDb25maXJtQnV0dG9uKCkuY2xpY2soKVxuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGNsaWNrICdEZW55JyBidXR0b25cbiAqL1xuZXhwb3J0IGNvbnN0IGNsaWNrRGVueSA9ICgpID0+IGRvbS5nZXREZW55QnV0dG9uKCkgJiYgZG9tLmdldERlbnlCdXR0b24oKS5jbGljaygpXG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gY2xpY2sgJ0NhbmNlbCcgYnV0dG9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGlja0NhbmNlbCA9ICgpID0+IGRvbS5nZXRDYW5jZWxCdXR0b24oKSAmJiBkb20uZ2V0Q2FuY2VsQnV0dG9uKCkuY2xpY2soKVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgRGlzbWlzc1JlYXNvbiB9IGZyb20gJy4vdXRpbHMvRGlzbWlzc1JlYXNvbi5qcydcbmltcG9ydCB7IGNhbGxJZkZ1bmN0aW9uIH0gZnJvbSAnLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IGNsaWNrQ29uZmlybSB9IGZyb20gJy4vc3RhdGljTWV0aG9kcy9kb20uanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5leHBvcnQgY29uc3QgcmVtb3ZlS2V5ZG93bkhhbmRsZXIgPSAoZ2xvYmFsU3RhdGUpID0+IHtcbiAgaWYgKGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXQgJiYgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXJBZGRlZCkge1xuICAgIGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyLCB7XG4gICAgICBjYXB0dXJlOiBnbG9iYWxTdGF0ZS5rZXlkb3duTGlzdGVuZXJDYXB0dXJlLFxuICAgIH0pXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXJBZGRlZCA9IGZhbHNlXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGFkZEtleWRvd25IYW5kbGVyID0gKGluc3RhbmNlLCBnbG9iYWxTdGF0ZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKSA9PiB7XG4gIHJlbW92ZUtleWRvd25IYW5kbGVyKGdsb2JhbFN0YXRlKVxuICBpZiAoIWlubmVyUGFyYW1zLnRvYXN0KSB7XG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXIgPSAoZSkgPT4ga2V5ZG93bkhhbmRsZXIoaW5zdGFuY2UsIGUsIGRpc21pc3NXaXRoKVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXQgPSBpbm5lclBhcmFtcy5rZXlkb3duTGlzdGVuZXJDYXB0dXJlID8gd2luZG93IDogZG9tLmdldFBvcHVwKClcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duTGlzdGVuZXJDYXB0dXJlID0gaW5uZXJQYXJhbXMua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyLCB7XG4gICAgICBjYXB0dXJlOiBnbG9iYWxTdGF0ZS5rZXlkb3duTGlzdGVuZXJDYXB0dXJlLFxuICAgIH0pXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXJBZGRlZCA9IHRydWVcbiAgfVxufVxuXG4vLyBGb2N1cyBoYW5kbGluZ1xuZXhwb3J0IGNvbnN0IHNldEZvY3VzID0gKGlubmVyUGFyYW1zLCBpbmRleCwgaW5jcmVtZW50KSA9PiB7XG4gIGNvbnN0IGZvY3VzYWJsZUVsZW1lbnRzID0gZG9tLmdldEZvY3VzYWJsZUVsZW1lbnRzKClcbiAgLy8gc2VhcmNoIGZvciB2aXNpYmxlIGVsZW1lbnRzIGFuZCBzZWxlY3QgdGhlIG5leHQgcG9zc2libGUgbWF0Y2hcbiAgaWYgKGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgIGluZGV4ID0gaW5kZXggKyBpbmNyZW1lbnRcblxuICAgIC8vIHJvbGxvdmVyIHRvIGZpcnN0IGl0ZW1cbiAgICBpZiAoaW5kZXggPT09IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCkge1xuICAgICAgaW5kZXggPSAwXG5cbiAgICAgIC8vIGdvIHRvIGxhc3QgaXRlbVxuICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IC0xKSB7XG4gICAgICBpbmRleCA9IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aCAtIDFcbiAgICB9XG5cbiAgICByZXR1cm4gZm9jdXNhYmxlRWxlbWVudHNbaW5kZXhdLmZvY3VzKClcbiAgfVxuICAvLyBubyB2aXNpYmxlIGZvY3VzYWJsZSBlbGVtZW50cywgZm9jdXMgdGhlIHBvcHVwXG4gIGRvbS5nZXRQb3B1cCgpLmZvY3VzKClcbn1cblxuY29uc3QgYXJyb3dLZXlzTmV4dEJ1dHRvbiA9IFsnQXJyb3dSaWdodCcsICdBcnJvd0Rvd24nXVxuXG5jb25zdCBhcnJvd0tleXNQcmV2aW91c0J1dHRvbiA9IFsnQXJyb3dMZWZ0JywgJ0Fycm93VXAnXVxuXG5jb25zdCBrZXlkb3duSGFuZGxlciA9IChpbnN0YW5jZSwgZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuXG4gIGlmICghaW5uZXJQYXJhbXMpIHtcbiAgICByZXR1cm4gLy8gVGhpcyBpbnN0YW5jZSBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxuICB9XG5cbiAgLy8gSWdub3JlIGtleWRvd24gZHVyaW5nIElNRSBjb21wb3NpdGlvblxuICAvLyBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRG9jdW1lbnQva2V5ZG93bl9ldmVudCNpZ25vcmluZ19rZXlkb3duX2R1cmluZ19pbWVfY29tcG9zaXRpb25cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy83MjBcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yNDA2XG4gIGlmIChlLmlzQ29tcG9zaW5nIHx8IGUua2V5Q29kZSA9PT0gMjI5KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMuc3RvcEtleWRvd25Qcm9wYWdhdGlvbikge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgfVxuXG4gIC8vIEVOVEVSXG4gIGlmIChlLmtleSA9PT0gJ0VudGVyJykge1xuICAgIGhhbmRsZUVudGVyKGluc3RhbmNlLCBlLCBpbm5lclBhcmFtcylcbiAgfVxuXG4gIC8vIFRBQlxuICBlbHNlIGlmIChlLmtleSA9PT0gJ1RhYicpIHtcbiAgICBoYW5kbGVUYWIoZSwgaW5uZXJQYXJhbXMpXG4gIH1cblxuICAvLyBBUlJPV1MgLSBzd2l0Y2ggZm9jdXMgYmV0d2VlbiBidXR0b25zXG4gIGVsc2UgaWYgKFsuLi5hcnJvd0tleXNOZXh0QnV0dG9uLCAuLi5hcnJvd0tleXNQcmV2aW91c0J1dHRvbl0uaW5jbHVkZXMoZS5rZXkpKSB7XG4gICAgaGFuZGxlQXJyb3dzKGUua2V5KVxuICB9XG5cbiAgLy8gRVNDXG4gIGVsc2UgaWYgKGUua2V5ID09PSAnRXNjYXBlJykge1xuICAgIGhhbmRsZUVzYyhlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlRW50ZXIgPSAoaW5zdGFuY2UsIGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjM4NlxuICBpZiAoIWNhbGxJZkZ1bmN0aW9uKGlubmVyUGFyYW1zLmFsbG93RW50ZXJLZXkpKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoZS50YXJnZXQgJiYgaW5zdGFuY2UuZ2V0SW5wdXQoKSAmJiBlLnRhcmdldC5vdXRlckhUTUwgPT09IGluc3RhbmNlLmdldElucHV0KCkub3V0ZXJIVE1MKSB7XG4gICAgaWYgKFsndGV4dGFyZWEnLCAnZmlsZSddLmluY2x1ZGVzKGlubmVyUGFyYW1zLmlucHV0KSkge1xuICAgICAgcmV0dXJuIC8vIGRvIG5vdCBzdWJtaXRcbiAgICB9XG5cbiAgICBjbGlja0NvbmZpcm0oKVxuICAgIGUucHJldmVudERlZmF1bHQoKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZVRhYiA9IChlLCBpbm5lclBhcmFtcykgPT4ge1xuICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZS50YXJnZXRcblxuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IGRvbS5nZXRGb2N1c2FibGVFbGVtZW50cygpXG4gIGxldCBidG5JbmRleCA9IC0xXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZm9jdXNhYmxlRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodGFyZ2V0RWxlbWVudCA9PT0gZm9jdXNhYmxlRWxlbWVudHNbaV0pIHtcbiAgICAgIGJ0bkluZGV4ID0gaVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBDeWNsZSB0byB0aGUgbmV4dCBidXR0b25cbiAgaWYgKCFlLnNoaWZ0S2V5KSB7XG4gICAgc2V0Rm9jdXMoaW5uZXJQYXJhbXMsIGJ0bkluZGV4LCAxKVxuICB9XG5cbiAgLy8gQ3ljbGUgdG8gdGhlIHByZXYgYnV0dG9uXG4gIGVsc2Uge1xuICAgIHNldEZvY3VzKGlubmVyUGFyYW1zLCBidG5JbmRleCwgLTEpXG4gIH1cblxuICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gIGUucHJldmVudERlZmF1bHQoKVxufVxuXG5jb25zdCBoYW5kbGVBcnJvd3MgPSAoa2V5KSA9PiB7XG4gIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb20uZ2V0Q29uZmlybUJ1dHRvbigpXG4gIGNvbnN0IGRlbnlCdXR0b24gPSBkb20uZ2V0RGVueUJ1dHRvbigpXG4gIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvbS5nZXRDYW5jZWxCdXR0b24oKVxuICBpZiAoIVtjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b25dLmluY2x1ZGVzKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3Qgc2libGluZyA9IGFycm93S2V5c05leHRCdXR0b24uaW5jbHVkZXMoa2V5KSA/ICduZXh0RWxlbWVudFNpYmxpbmcnIDogJ3ByZXZpb3VzRWxlbWVudFNpYmxpbmcnXG4gIGxldCBidXR0b25Ub0ZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICBmb3IgKGxldCBpID0gMDsgaSA8IGRvbS5nZXRBY3Rpb25zKCkuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICBidXR0b25Ub0ZvY3VzID0gYnV0dG9uVG9Gb2N1c1tzaWJsaW5nXVxuICAgIGlmICghYnV0dG9uVG9Gb2N1cykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGlmIChkb20uaXNWaXNpYmxlKGJ1dHRvblRvRm9jdXMpICYmIGJ1dHRvblRvRm9jdXMgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgaWYgKGJ1dHRvblRvRm9jdXMgaW5zdGFuY2VvZiBIVE1MQnV0dG9uRWxlbWVudCkge1xuICAgIGJ1dHRvblRvRm9jdXMuZm9jdXMoKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUVzYyA9IChlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpID0+IHtcbiAgaWYgKGNhbGxJZkZ1bmN0aW9uKGlubmVyUGFyYW1zLmFsbG93RXNjYXBlS2V5KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgIGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uZXNjKVxuICB9XG59XG4iLCJpbXBvcnQgeyB1bmRvU2Nyb2xsYmFyIH0gZnJvbSAnLi4vdXRpbHMvc2Nyb2xsYmFyRml4LmpzJ1xuaW1wb3J0IHsgdW5kb0lPU2ZpeCB9IGZyb20gJy4uL3V0aWxzL2lvc0ZpeC5qcydcbmltcG9ydCB7IHVuc2V0QXJpYUhpZGRlbiB9IGZyb20gJy4uL3V0aWxzL2FyaWEuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi91dGlscy9jbGFzc2VzLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlLCB7IHJlc3RvcmVBY3RpdmVFbGVtZW50IH0gZnJvbSAnLi4vZ2xvYmFsU3RhdGUuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCBwcml2YXRlTWV0aG9kcyBmcm9tICcuLi9wcml2YXRlTWV0aG9kcy5qcydcbmltcG9ydCB7IHJlbW92ZUtleWRvd25IYW5kbGVyIH0gZnJvbSAnLi4va2V5ZG93bi1oYW5kbGVyLmpzJ1xuXG4vKlxuICogSW5zdGFuY2UgbWV0aG9kIHRvIGNsb3NlIHN3ZWV0QWxlcnRcbiAqL1xuXG5mdW5jdGlvbiByZW1vdmVQb3B1cEFuZFJlc2V0U3RhdGUoaW5zdGFuY2UsIGNvbnRhaW5lciwgcmV0dXJuRm9jdXMsIGRpZENsb3NlKSB7XG4gIGlmIChkb20uaXNUb2FzdCgpKSB7XG4gICAgdHJpZ2dlckRpZENsb3NlQW5kRGlzcG9zZShpbnN0YW5jZSwgZGlkQ2xvc2UpXG4gIH0gZWxzZSB7XG4gICAgcmVzdG9yZUFjdGl2ZUVsZW1lbnQocmV0dXJuRm9jdXMpLnRoZW4oKCkgPT4gdHJpZ2dlckRpZENsb3NlQW5kRGlzcG9zZShpbnN0YW5jZSwgZGlkQ2xvc2UpKVxuICAgIHJlbW92ZUtleWRvd25IYW5kbGVyKGdsb2JhbFN0YXRlKVxuICB9XG5cbiAgY29uc3QgaXNTYWZhcmkgPSAvXigoPyFjaHJvbWV8YW5kcm9pZCkuKSpzYWZhcmkvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpXG4gIC8vIHdvcmthcm91bmQgZm9yICMyMDg4XG4gIC8vIGZvciBzb21lIHJlYXNvbiByZW1vdmluZyB0aGUgY29udGFpbmVyIGluIFNhZmFyaSB3aWxsIHNjcm9sbCB0aGUgZG9jdW1lbnQgdG8gYm90dG9tXG4gIGlmIChpc1NhZmFyaSkge1xuICAgIGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ3N0eWxlJywgJ2Rpc3BsYXk6bm9uZSAhaW1wb3J0YW50JylcbiAgICBjb250YWluZXIucmVtb3ZlQXR0cmlidXRlKCdjbGFzcycpXG4gICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnXG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLnJlbW92ZSgpXG4gIH1cblxuICBpZiAoZG9tLmlzTW9kYWwoKSkge1xuICAgIHVuZG9TY3JvbGxiYXIoKVxuICAgIHVuZG9JT1NmaXgoKVxuICAgIHVuc2V0QXJpYUhpZGRlbigpXG4gIH1cblxuICByZW1vdmVCb2R5Q2xhc3NlcygpXG59XG5cbmZ1bmN0aW9uIHJlbW92ZUJvZHlDbGFzc2VzKCkge1xuICBkb20ucmVtb3ZlQ2xhc3MoXG4gICAgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sXG4gICAgW3N3YWxDbGFzc2VzLnNob3duLCBzd2FsQ2xhc3Nlc1snaGVpZ2h0LWF1dG8nXSwgc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10sIHN3YWxDbGFzc2VzWyd0b2FzdC1zaG93biddXVxuICApXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZShyZXNvbHZlVmFsdWUpIHtcbiAgcmVzb2x2ZVZhbHVlID0gcHJlcGFyZVJlc29sdmVWYWx1ZShyZXNvbHZlVmFsdWUpXG5cbiAgY29uc3Qgc3dhbFByb21pc2VSZXNvbHZlID0gcHJpdmF0ZU1ldGhvZHMuc3dhbFByb21pc2VSZXNvbHZlLmdldCh0aGlzKVxuXG4gIGNvbnN0IGRpZENsb3NlID0gdHJpZ2dlckNsb3NlUG9wdXAodGhpcylcblxuICBpZiAodGhpcy5pc0F3YWl0aW5nUHJvbWlzZSgpKSB7XG4gICAgLy8gQSBzd2FsIGF3YWl0aW5nIGZvciBhIHByb21pc2UgKGFmdGVyIGEgY2xpY2sgb24gQ29uZmlybSBvciBEZW55KSBjYW5ub3QgYmUgZGlzbWlzc2VkIGFueW1vcmUgIzIzMzVcbiAgICBpZiAoIXJlc29sdmVWYWx1ZS5pc0Rpc21pc3NlZCkge1xuICAgICAgaGFuZGxlQXdhaXRpbmdQcm9taXNlKHRoaXMpXG4gICAgICBzd2FsUHJvbWlzZVJlc29sdmUocmVzb2x2ZVZhbHVlKVxuICAgIH1cbiAgfSBlbHNlIGlmIChkaWRDbG9zZSkge1xuICAgIC8vIFJlc29sdmUgU3dhbCBwcm9taXNlXG4gICAgc3dhbFByb21pc2VSZXNvbHZlKHJlc29sdmVWYWx1ZSlcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNBd2FpdGluZ1Byb21pc2UoKSB7XG4gIHJldHVybiAhIXByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2UuZ2V0KHRoaXMpXG59XG5cbmNvbnN0IHRyaWdnZXJDbG9zZVBvcHVwID0gKGluc3RhbmNlKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcblxuICBpZiAoIXBvcHVwKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGlmICghaW5uZXJQYXJhbXMgfHwgZG9tLmhhc0NsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5oaWRlQ2xhc3MucG9wdXApKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBkb20ucmVtb3ZlQ2xhc3MocG9wdXAsIGlubmVyUGFyYW1zLnNob3dDbGFzcy5wb3B1cClcbiAgZG9tLmFkZENsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5oaWRlQ2xhc3MucG9wdXApXG5cbiAgY29uc3QgYmFja2Ryb3AgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgZG9tLnJlbW92ZUNsYXNzKGJhY2tkcm9wLCBpbm5lclBhcmFtcy5zaG93Q2xhc3MuYmFja2Ryb3ApXG4gIGRvbS5hZGRDbGFzcyhiYWNrZHJvcCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLmJhY2tkcm9wKVxuXG4gIGhhbmRsZVBvcHVwQW5pbWF0aW9uKGluc3RhbmNlLCBwb3B1cCwgaW5uZXJQYXJhbXMpXG5cbiAgcmV0dXJuIHRydWVcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlamVjdFByb21pc2UoZXJyb3IpIHtcbiAgY29uc3QgcmVqZWN0UHJvbWlzZSA9IHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVqZWN0LmdldCh0aGlzKVxuICBoYW5kbGVBd2FpdGluZ1Byb21pc2UodGhpcylcbiAgaWYgKHJlamVjdFByb21pc2UpIHtcbiAgICAvLyBSZWplY3QgU3dhbCBwcm9taXNlXG4gICAgcmVqZWN0UHJvbWlzZShlcnJvcilcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaGFuZGxlQXdhaXRpbmdQcm9taXNlID0gKGluc3RhbmNlKSA9PiB7XG4gIGlmIChpbnN0YW5jZS5pc0F3YWl0aW5nUHJvbWlzZSgpKSB7XG4gICAgcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5kZWxldGUoaW5zdGFuY2UpXG4gICAgLy8gVGhlIGluc3RhbmNlIG1pZ2h0IGhhdmUgYmVlbiBwcmV2aW91c2x5IHBhcnRseSBkZXN0cm95ZWQsIHdlIG11c3QgcmVzdW1lIHRoZSBkZXN0cm95IHByb2Nlc3MgaW4gdGhpcyBjYXNlICMyMzM1XG4gICAgaWYgKCFwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKSkge1xuICAgICAgaW5zdGFuY2UuX2Rlc3Ryb3koKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBwcmVwYXJlUmVzb2x2ZVZhbHVlID0gKHJlc29sdmVWYWx1ZSkgPT4ge1xuICAvLyBXaGVuIHVzZXIgY2FsbHMgU3dhbC5jbG9zZSgpXG4gIGlmICh0eXBlb2YgcmVzb2x2ZVZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiB7XG4gICAgICBpc0NvbmZpcm1lZDogZmFsc2UsXG4gICAgICBpc0RlbmllZDogZmFsc2UsXG4gICAgICBpc0Rpc21pc3NlZDogdHJ1ZSxcbiAgICB9XG4gIH1cblxuICByZXR1cm4gT2JqZWN0LmFzc2lnbihcbiAgICB7XG4gICAgICBpc0NvbmZpcm1lZDogZmFsc2UsXG4gICAgICBpc0RlbmllZDogZmFsc2UsXG4gICAgICBpc0Rpc21pc3NlZDogZmFsc2UsXG4gICAgfSxcbiAgICByZXNvbHZlVmFsdWVcbiAgKVxufVxuXG5jb25zdCBoYW5kbGVQb3B1cEFuaW1hdGlvbiA9IChpbnN0YW5jZSwgcG9wdXAsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICAvLyBJZiBhbmltYXRpb24gaXMgc3VwcG9ydGVkLCBhbmltYXRlXG4gIGNvbnN0IGFuaW1hdGlvbklzU3VwcG9ydGVkID0gZG9tLmFuaW1hdGlvbkVuZEV2ZW50ICYmIGRvbS5oYXNDc3NBbmltYXRpb24ocG9wdXApXG5cbiAgaWYgKHR5cGVvZiBpbm5lclBhcmFtcy53aWxsQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpbm5lclBhcmFtcy53aWxsQ2xvc2UocG9wdXApXG4gIH1cblxuICBpZiAoYW5pbWF0aW9uSXNTdXBwb3J0ZWQpIHtcbiAgICBhbmltYXRlUG9wdXAoaW5zdGFuY2UsIHBvcHVwLCBjb250YWluZXIsIGlubmVyUGFyYW1zLnJldHVybkZvY3VzLCBpbm5lclBhcmFtcy5kaWRDbG9zZSlcbiAgfSBlbHNlIHtcbiAgICAvLyBPdGhlcndpc2UsIHJlbW92ZSBpbW1lZGlhdGVseVxuICAgIHJlbW92ZVBvcHVwQW5kUmVzZXRTdGF0ZShpbnN0YW5jZSwgY29udGFpbmVyLCBpbm5lclBhcmFtcy5yZXR1cm5Gb2N1cywgaW5uZXJQYXJhbXMuZGlkQ2xvc2UpXG4gIH1cbn1cblxuY29uc3QgYW5pbWF0ZVBvcHVwID0gKGluc3RhbmNlLCBwb3B1cCwgY29udGFpbmVyLCByZXR1cm5Gb2N1cywgZGlkQ2xvc2UpID0+IHtcbiAgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrID0gcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlLmJpbmQoXG4gICAgbnVsbCxcbiAgICBpbnN0YW5jZSxcbiAgICBjb250YWluZXIsXG4gICAgcmV0dXJuRm9jdXMsXG4gICAgZGlkQ2xvc2VcbiAgKVxuICBwb3B1cC5hZGRFdmVudExpc3RlbmVyKGRvbS5hbmltYXRpb25FbmRFdmVudCwgZnVuY3Rpb24gKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IHBvcHVwKSB7XG4gICAgICBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2soKVxuICAgICAgZGVsZXRlIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFja1xuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgdHJpZ2dlckRpZENsb3NlQW5kRGlzcG9zZSA9IChpbnN0YW5jZSwgZGlkQ2xvc2UpID0+IHtcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkaWRDbG9zZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZGlkQ2xvc2UuYmluZChpbnN0YW5jZS5wYXJhbXMpKClcbiAgICB9XG4gICAgaW5zdGFuY2UuX2Rlc3Ryb3koKVxuICB9KVxufVxuXG5leHBvcnQgeyBjbG9zZSBhcyBjbG9zZVBvcHVwLCBjbG9zZSBhcyBjbG9zZU1vZGFsLCBjbG9zZSBhcyBjbG9zZVRvYXN0IH1cbiIsImltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5mdW5jdGlvbiBzZXRCdXR0b25zRGlzYWJsZWQoaW5zdGFuY2UsIGJ1dHRvbnMsIGRpc2FibGVkKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldChpbnN0YW5jZSlcbiAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBkb21DYWNoZVtidXR0b25dLmRpc2FibGVkID0gZGlzYWJsZWRcbiAgfSlcbn1cblxuZnVuY3Rpb24gc2V0SW5wdXREaXNhYmxlZChpbnB1dCwgZGlzYWJsZWQpIHtcbiAgaWYgKCFpbnB1dCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG4gIGlmIChpbnB1dC50eXBlID09PSAncmFkaW8nKSB7XG4gICAgY29uc3QgcmFkaW9zQ29udGFpbmVyID0gaW5wdXQucGFyZW50Tm9kZS5wYXJlbnROb2RlXG4gICAgY29uc3QgcmFkaW9zID0gcmFkaW9zQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJhZGlvcy5sZW5ndGg7IGkrKykge1xuICAgICAgcmFkaW9zW2ldLmRpc2FibGVkID0gZGlzYWJsZWRcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaW5wdXQuZGlzYWJsZWQgPSBkaXNhYmxlZFxuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVCdXR0b25zKCkge1xuICBzZXRCdXR0b25zRGlzYWJsZWQodGhpcywgWydjb25maXJtQnV0dG9uJywgJ2RlbnlCdXR0b24nLCAnY2FuY2VsQnV0dG9uJ10sIGZhbHNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUJ1dHRvbnMoKSB7XG4gIHNldEJ1dHRvbnNEaXNhYmxlZCh0aGlzLCBbJ2NvbmZpcm1CdXR0b24nLCAnZGVueUJ1dHRvbicsICdjYW5jZWxCdXR0b24nXSwgdHJ1ZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUlucHV0KCkge1xuICByZXR1cm4gc2V0SW5wdXREaXNhYmxlZCh0aGlzLmdldElucHV0KCksIGZhbHNlKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzYWJsZUlucHV0KCkge1xuICByZXR1cm4gc2V0SW5wdXREaXNhYmxlZCh0aGlzLmdldElucHV0KCksIHRydWUpXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vdXRpbHMvZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi91dGlscy9jbGFzc2VzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5cbi8vIFNob3cgYmxvY2sgd2l0aCB2YWxpZGF0aW9uIG1lc3NhZ2VcbmV4cG9ydCBmdW5jdGlvbiBzaG93VmFsaWRhdGlvbk1lc3NhZ2UoZXJyb3IpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGNvbnN0IHBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQodGhpcylcbiAgZG9tLnNldElubmVySHRtbChkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSwgZXJyb3IpXG4gIGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXVxuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzICYmIHBhcmFtcy5jdXN0b21DbGFzcy52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGRvbS5hZGRDbGFzcyhkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSwgcGFyYW1zLmN1c3RvbUNsYXNzLnZhbGlkYXRpb25NZXNzYWdlKVxuICB9XG4gIGRvbS5zaG93KGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlKVxuXG4gIGNvbnN0IGlucHV0ID0gdGhpcy5nZXRJbnB1dCgpXG4gIGlmIChpbnB1dCkge1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnYXJpYS1pbnZhbGlkJywgdHJ1ZSlcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZGVzY3JpYmVkYnknLCBzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ10pXG4gICAgZG9tLmZvY3VzSW5wdXQoaW5wdXQpXG4gICAgZG9tLmFkZENsYXNzKGlucHV0LCBzd2FsQ2xhc3Nlcy5pbnB1dGVycm9yKVxuICB9XG59XG5cbi8vIEhpZGUgYmxvY2sgd2l0aCB2YWxpZGF0aW9uIG1lc3NhZ2VcbmV4cG9ydCBmdW5jdGlvbiByZXNldFZhbGlkYXRpb25NZXNzYWdlKCkge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQodGhpcylcbiAgaWYgKGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgZG9tLmhpZGUoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UpXG4gIH1cblxuICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXQoKVxuICBpZiAoaW5wdXQpIHtcbiAgICBpbnB1dC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcpXG4gICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICBkb20ucmVtb3ZlQ2xhc3MoaW5wdXQsIHN3YWxDbGFzc2VzLmlucHV0ZXJyb3IpXG4gIH1cbn1cbiIsImltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvZ3Jlc3NTdGVwcygpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIHJldHVybiBkb21DYWNoZS5wcm9ncmVzc1N0ZXBzXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vc3JjL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi8uLi9zcmMvdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCB7IGlzVXBkYXRhYmxlUGFyYW1ldGVyIH0gZnJvbSAnLi4vLi4vc3JjL3V0aWxzL3BhcmFtcy5qcydcblxuLyoqXG4gKiBVcGRhdGVzIHBvcHVwIHBhcmFtZXRlcnMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGUocGFyYW1zKSB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KHRoaXMpXG5cbiAgaWYgKCFwb3B1cCB8fCBkb20uaGFzQ2xhc3MocG9wdXAsIGlubmVyUGFyYW1zLmhpZGVDbGFzcy5wb3B1cCkpIHtcbiAgICByZXR1cm4gd2FybihcbiAgICAgIGBZb3UncmUgdHJ5aW5nIHRvIHVwZGF0ZSB0aGUgY2xvc2VkIG9yIGNsb3NpbmcgcG9wdXAsIHRoYXQgd29uJ3Qgd29yay4gVXNlIHRoZSB1cGRhdGUoKSBtZXRob2QgaW4gcHJlQ29uZmlybSBwYXJhbWV0ZXIgb3Igc2hvdyBhIG5ldyBwb3B1cC5gXG4gICAgKVxuICB9XG5cbiAgY29uc3QgdmFsaWRVcGRhdGFibGVQYXJhbXMgPSBmaWx0ZXJWYWxpZFBhcmFtcyhwYXJhbXMpXG5cbiAgY29uc3QgdXBkYXRlZFBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGlubmVyUGFyYW1zLCB2YWxpZFVwZGF0YWJsZVBhcmFtcylcblxuICBkb20ucmVuZGVyKHRoaXMsIHVwZGF0ZWRQYXJhbXMpXG5cbiAgcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLnNldCh0aGlzLCB1cGRhdGVkUGFyYW1zKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7XG4gICAgcGFyYW1zOiB7XG4gICAgICB2YWx1ZTogT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wYXJhbXMsIHBhcmFtcyksXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIH0sXG4gIH0pXG59XG5cbmNvbnN0IGZpbHRlclZhbGlkUGFyYW1zID0gKHBhcmFtcykgPT4ge1xuICBjb25zdCB2YWxpZFVwZGF0YWJsZVBhcmFtcyA9IHt9XG4gIE9iamVjdC5rZXlzKHBhcmFtcykuZm9yRWFjaCgocGFyYW0pID0+IHtcbiAgICBpZiAoaXNVcGRhdGFibGVQYXJhbWV0ZXIocGFyYW0pKSB7XG4gICAgICB2YWxpZFVwZGF0YWJsZVBhcmFtc1twYXJhbV0gPSBwYXJhbXNbcGFyYW1dXG4gICAgfSBlbHNlIHtcbiAgICAgIHdhcm4oXG4gICAgICAgIGBJbnZhbGlkIHBhcmFtZXRlciB0byB1cGRhdGU6IFwiJHtwYXJhbX1cIi4gVXBkYXRhYmxlIHBhcmFtcyBhcmUgbGlzdGVkIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9ibG9iL21hc3Rlci9zcmMvdXRpbHMvcGFyYW1zLmpzXFxuXFxuSWYgeW91IHRoaW5rIHRoaXMgcGFyYW1ldGVyIHNob3VsZCBiZSB1cGRhdGFibGUsIHJlcXVlc3QgaXQgaGVyZTogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy9uZXc/dGVtcGxhdGU9MDJfZmVhdHVyZV9yZXF1ZXN0Lm1kYFxuICAgICAgKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHZhbGlkVXBkYXRhYmxlUGFyYW1zXG59XG4iLCJpbXBvcnQgZ2xvYmFsU3RhdGUgZnJvbSAnLi4vZ2xvYmFsU3RhdGUuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCBwcml2YXRlTWV0aG9kcyBmcm9tICcuLi9wcml2YXRlTWV0aG9kcy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIF9kZXN0cm95KCkge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQodGhpcylcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KHRoaXMpXG5cbiAgaWYgKCFpbm5lclBhcmFtcykge1xuICAgIGRpc3Bvc2VXZWFrTWFwcyh0aGlzKSAvLyBUaGUgV2Vha01hcHMgbWlnaHQgaGF2ZSBiZWVuIHBhcnRseSBkZXN0cm95ZWQsIHdlIG11c3QgcmVjYWxsIGl0IHRvIGRpc3Bvc2UgYW55IHJlbWFpbmluZyBXZWFrTWFwcyAjMjMzNVxuICAgIHJldHVybiAvLyBUaGlzIGluc3RhbmNlIGhhcyBhbHJlYWR5IGJlZW4gZGVzdHJveWVkXG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbm90aGVyIFN3YWwgY2xvc2luZ1xuICBpZiAoZG9tQ2FjaGUucG9wdXAgJiYgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrKSB7XG4gICAgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrKClcbiAgICBkZWxldGUgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrXG4gIH1cblxuICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIHN3YWwgZGlzcG9zYWwgZGVmZXIgdGltZXJcbiAgaWYgKGdsb2JhbFN0YXRlLmRlZmVyRGlzcG9zYWxUaW1lcikge1xuICAgIGNsZWFyVGltZW91dChnbG9iYWxTdGF0ZS5kZWZlckRpc3Bvc2FsVGltZXIpXG4gICAgZGVsZXRlIGdsb2JhbFN0YXRlLmRlZmVyRGlzcG9zYWxUaW1lclxuICB9XG5cbiAgaWYgKHR5cGVvZiBpbm5lclBhcmFtcy5kaWREZXN0cm95ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaW5uZXJQYXJhbXMuZGlkRGVzdHJveSgpXG4gIH1cbiAgZGlzcG9zZVN3YWwodGhpcylcbn1cblxuY29uc3QgZGlzcG9zZVN3YWwgPSAoaW5zdGFuY2UpID0+IHtcbiAgZGlzcG9zZVdlYWtNYXBzKGluc3RhbmNlKVxuICAvLyBVbnNldCB0aGlzLnBhcmFtcyBzbyBHQyB3aWxsIGRpc3Bvc2UgaXQgKCMxNTY5KVxuICBkZWxldGUgaW5zdGFuY2UucGFyYW1zXG4gIC8vIFVuc2V0IGdsb2JhbFN0YXRlIHByb3BzIHNvIEdDIHdpbGwgZGlzcG9zZSBnbG9iYWxTdGF0ZSAoIzE1NjkpXG4gIGRlbGV0ZSBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlclxuICBkZWxldGUgZ2xvYmFsU3RhdGUua2V5ZG93blRhcmdldFxuICAvLyBVbnNldCBjdXJyZW50SW5zdGFuY2VcbiAgZGVsZXRlIGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZVxufVxuXG5jb25zdCBkaXNwb3NlV2Vha01hcHMgPSAoaW5zdGFuY2UpID0+IHtcbiAgLy8gSWYgdGhlIGN1cnJlbnQgaW5zdGFuY2UgaXMgYXdhaXRpbmcgYSBwcm9taXNlIHJlc3VsdCwgd2Uga2VlcCB0aGUgcHJpdmF0ZU1ldGhvZHMgdG8gY2FsbCB0aGVtIG9uY2UgdGhlIHByb21pc2UgcmVzdWx0IGlzIHJldHJpZXZlZCAjMjMzNVxuICBpZiAoaW5zdGFuY2UuaXNBd2FpdGluZ1Byb21pc2UoKSkge1xuICAgIHVuc2V0V2Vha01hcHMocHJpdmF0ZVByb3BzLCBpbnN0YW5jZSlcbiAgICBwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLnNldChpbnN0YW5jZSwgdHJ1ZSlcbiAgfSBlbHNlIHtcbiAgICB1bnNldFdlYWtNYXBzKHByaXZhdGVNZXRob2RzLCBpbnN0YW5jZSlcbiAgICB1bnNldFdlYWtNYXBzKHByaXZhdGVQcm9wcywgaW5zdGFuY2UpXG4gIH1cbn1cblxuY29uc3QgdW5zZXRXZWFrTWFwcyA9IChvYmosIGluc3RhbmNlKSA9PiB7XG4gIGZvciAoY29uc3QgaSBpbiBvYmopIHtcbiAgICBvYmpbaV0uZGVsZXRlKGluc3RhbmNlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBpc1Zpc2libGUgfSBmcm9tICcuL3V0aWxzL2RvbS9kb21VdGlscy5qcydcbmltcG9ydCB7IGdldElucHV0VmFsdWUgfSBmcm9tICcuL3V0aWxzL2RvbS9pbnB1dFV0aWxzLmpzJ1xuaW1wb3J0IHsgZ2V0RGVueUJ1dHRvbiwgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UgfSBmcm9tICcuL3V0aWxzL2RvbS9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgYXNQcm9taXNlLCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIsIGVycm9yIH0gZnJvbSAnLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IHNob3dMb2FkaW5nIH0gZnJvbSAnLi9zdGF0aWNNZXRob2RzL3Nob3dMb2FkaW5nLmpzJ1xuaW1wb3J0IHsgRGlzbWlzc1JlYXNvbiB9IGZyb20gJy4vdXRpbHMvRGlzbWlzc1JlYXNvbi5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgeyBoYW5kbGVBd2FpdGluZ1Byb21pc2UgfSBmcm9tICcuL2luc3RhbmNlTWV0aG9kcy5qcydcblxuZXhwb3J0IGNvbnN0IGhhbmRsZUNvbmZpcm1CdXR0b25DbGljayA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGluc3RhbmNlLmRpc2FibGVCdXR0b25zKClcbiAgaWYgKGlubmVyUGFyYW1zLmlucHV0KSB7XG4gICAgaGFuZGxlQ29uZmlybU9yRGVueVdpdGhJbnB1dChpbnN0YW5jZSwgJ2NvbmZpcm0nKVxuICB9IGVsc2Uge1xuICAgIGNvbmZpcm0oaW5zdGFuY2UsIHRydWUpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZURlbnlCdXR0b25DbGljayA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGluc3RhbmNlLmRpc2FibGVCdXR0b25zKClcbiAgaWYgKGlubmVyUGFyYW1zLnJldHVybklucHV0VmFsdWVPbkRlbnkpIHtcbiAgICBoYW5kbGVDb25maXJtT3JEZW55V2l0aElucHV0KGluc3RhbmNlLCAnZGVueScpXG4gIH0gZWxzZSB7XG4gICAgZGVueShpbnN0YW5jZSwgZmFsc2UpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrID0gKGluc3RhbmNlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBpbnN0YW5jZS5kaXNhYmxlQnV0dG9ucygpXG4gIGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uY2FuY2VsKVxufVxuXG5jb25zdCBoYW5kbGVDb25maXJtT3JEZW55V2l0aElucHV0ID0gKGluc3RhbmNlLCB0eXBlIC8qICdjb25maXJtJyB8ICdkZW55JyAqLykgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGlmICghaW5uZXJQYXJhbXMuaW5wdXQpIHtcbiAgICByZXR1cm4gZXJyb3IoXG4gICAgICBgVGhlIFwiaW5wdXRcIiBwYXJhbWV0ZXIgaXMgbmVlZGVkIHRvIGJlIHNldCB3aGVuIHVzaW5nIHJldHVybklucHV0VmFsdWVPbiR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHR5cGUpfWBcbiAgICApXG4gIH1cbiAgY29uc3QgaW5wdXRWYWx1ZSA9IGdldElucHV0VmFsdWUoaW5zdGFuY2UsIGlubmVyUGFyYW1zKVxuICBpZiAoaW5uZXJQYXJhbXMuaW5wdXRWYWxpZGF0b3IpIHtcbiAgICBoYW5kbGVJbnB1dFZhbGlkYXRvcihpbnN0YW5jZSwgaW5wdXRWYWx1ZSwgdHlwZSlcbiAgfSBlbHNlIGlmICghaW5zdGFuY2UuZ2V0SW5wdXQoKS5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICBpbnN0YW5jZS5lbmFibGVCdXR0b25zKClcbiAgICBpbnN0YW5jZS5zaG93VmFsaWRhdGlvbk1lc3NhZ2UoaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlbnknKSB7XG4gICAgZGVueShpbnN0YW5jZSwgaW5wdXRWYWx1ZSlcbiAgfSBlbHNlIHtcbiAgICBjb25maXJtKGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUlucHV0VmFsaWRhdG9yID0gKGluc3RhbmNlLCBpbnB1dFZhbHVlLCB0eXBlIC8qICdjb25maXJtJyB8ICdkZW55JyAqLykgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGluc3RhbmNlLmRpc2FibGVJbnB1dCgpXG4gIGNvbnN0IHZhbGlkYXRpb25Qcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PlxuICAgIGFzUHJvbWlzZShpbm5lclBhcmFtcy5pbnB1dFZhbGlkYXRvcihpbnB1dFZhbHVlLCBpbm5lclBhcmFtcy52YWxpZGF0aW9uTWVzc2FnZSkpXG4gIClcbiAgdmFsaWRhdGlvblByb21pc2UudGhlbigodmFsaWRhdGlvbk1lc3NhZ2UpID0+IHtcbiAgICBpbnN0YW5jZS5lbmFibGVCdXR0b25zKClcbiAgICBpbnN0YW5jZS5lbmFibGVJbnB1dCgpXG4gICAgaWYgKHZhbGlkYXRpb25NZXNzYWdlKSB7XG4gICAgICBpbnN0YW5jZS5zaG93VmFsaWRhdGlvbk1lc3NhZ2UodmFsaWRhdGlvbk1lc3NhZ2UpXG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnZGVueScpIHtcbiAgICAgIGRlbnkoaW5zdGFuY2UsIGlucHV0VmFsdWUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbmZpcm0oaW5zdGFuY2UsIGlucHV0VmFsdWUpXG4gICAgfVxuICB9KVxufVxuXG5jb25zdCBkZW55ID0gKGluc3RhbmNlLCB2YWx1ZSkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UgfHwgdGhpcylcblxuICBpZiAoaW5uZXJQYXJhbXMuc2hvd0xvYWRlck9uRGVueSkge1xuICAgIHNob3dMb2FkaW5nKGdldERlbnlCdXR0b24oKSlcbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5wcmVEZW55KSB7XG4gICAgcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5zZXQoaW5zdGFuY2UgfHwgdGhpcywgdHJ1ZSkgLy8gRmxhZ2dpbmcgdGhlIGluc3RhbmNlIGFzIGF3YWl0aW5nIGEgcHJvbWlzZSBzbyBpdCdzIG93biBwcm9taXNlJ3MgcmVqZWN0L3Jlc29sdmUgbWV0aG9kcyBkb2Vzbid0IGdldCBkZXN0cm95ZWQgdW50aWwgdGhlIHJlc3VsdCBmcm9tIHRoaXMgcHJlRGVueSdzIHByb21pc2UgaXMgcmVjZWl2ZWRcbiAgICBjb25zdCBwcmVEZW55UHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT5cbiAgICAgIGFzUHJvbWlzZShpbm5lclBhcmFtcy5wcmVEZW55KHZhbHVlLCBpbm5lclBhcmFtcy52YWxpZGF0aW9uTWVzc2FnZSkpXG4gICAgKVxuICAgIHByZURlbnlQcm9taXNlXG4gICAgICAudGhlbigocHJlRGVueVZhbHVlKSA9PiB7XG4gICAgICAgIGlmIChwcmVEZW55VmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGhhbmRsZUF3YWl0aW5nUHJvbWlzZShpbnN0YW5jZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS5jbG9zZVBvcHVwKHsgaXNEZW5pZWQ6IHRydWUsIHZhbHVlOiB0eXBlb2YgcHJlRGVueVZhbHVlID09PSAndW5kZWZpbmVkJyA/IHZhbHVlIDogcHJlRGVueVZhbHVlIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuY2F0Y2goKGVycm9yKSA9PiByZWplY3RXaXRoKGluc3RhbmNlIHx8IHRoaXMsIGVycm9yKSlcbiAgfSBlbHNlIHtcbiAgICBpbnN0YW5jZS5jbG9zZVBvcHVwKHsgaXNEZW5pZWQ6IHRydWUsIHZhbHVlIH0pXG4gIH1cbn1cblxuY29uc3Qgc3VjY2VlZFdpdGggPSAoaW5zdGFuY2UsIHZhbHVlKSA9PiB7XG4gIGluc3RhbmNlLmNsb3NlUG9wdXAoeyBpc0NvbmZpcm1lZDogdHJ1ZSwgdmFsdWUgfSlcbn1cblxuY29uc3QgcmVqZWN0V2l0aCA9IChpbnN0YW5jZSwgZXJyb3IpID0+IHtcbiAgaW5zdGFuY2UucmVqZWN0UHJvbWlzZShlcnJvcilcbn1cblxuY29uc3QgY29uZmlybSA9IChpbnN0YW5jZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG5cbiAgaWYgKGlubmVyUGFyYW1zLnNob3dMb2FkZXJPbkNvbmZpcm0pIHtcbiAgICBzaG93TG9hZGluZygpXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMucHJlQ29uZmlybSkge1xuICAgIGluc3RhbmNlLnJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2Uuc2V0KGluc3RhbmNlIHx8IHRoaXMsIHRydWUpIC8vIEZsYWdnaW5nIHRoZSBpbnN0YW5jZSBhcyBhd2FpdGluZyBhIHByb21pc2Ugc28gaXQncyBvd24gcHJvbWlzZSdzIHJlamVjdC9yZXNvbHZlIG1ldGhvZHMgZG9lc24ndCBnZXQgZGVzdHJveWVkIHVudGlsIHRoZSByZXN1bHQgZnJvbSB0aGlzIHByZUNvbmZpcm0ncyBwcm9taXNlIGlzIHJlY2VpdmVkXG4gICAgY29uc3QgcHJlQ29uZmlybVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+XG4gICAgICBhc1Byb21pc2UoaW5uZXJQYXJhbXMucHJlQ29uZmlybSh2YWx1ZSwgaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpKVxuICAgIClcbiAgICBwcmVDb25maXJtUHJvbWlzZVxuICAgICAgLnRoZW4oKHByZUNvbmZpcm1WYWx1ZSkgPT4ge1xuICAgICAgICBpZiAoaXNWaXNpYmxlKGdldFZhbGlkYXRpb25NZXNzYWdlKCkpIHx8IHByZUNvbmZpcm1WYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgICAgICAgaGFuZGxlQXdhaXRpbmdQcm9taXNlKGluc3RhbmNlKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1Y2NlZWRXaXRoKGluc3RhbmNlLCB0eXBlb2YgcHJlQ29uZmlybVZhbHVlID09PSAndW5kZWZpbmVkJyA/IHZhbHVlIDogcHJlQ29uZmlybVZhbHVlKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0V2l0aChpbnN0YW5jZSB8fCB0aGlzLCBlcnJvcikpXG4gIH0gZWxzZSB7XG4gICAgc3VjY2VlZFdpdGgoaW5zdGFuY2UsIHZhbHVlKVxuICB9XG59XG4iLCJpbXBvcnQgeyBjYWxsSWZGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBEaXNtaXNzUmVhc29uIH0gZnJvbSAnLi91dGlscy9EaXNtaXNzUmVhc29uLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGNvbnN0IGhhbmRsZVBvcHVwQ2xpY2sgPSAoaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGlmIChpbm5lclBhcmFtcy50b2FzdCkge1xuICAgIGhhbmRsZVRvYXN0Q2xpY2soaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aClcbiAgfSBlbHNlIHtcbiAgICAvLyBJZ25vcmUgY2xpY2sgZXZlbnRzIHRoYXQgaGFkIG1vdXNlZG93biBvbiB0aGUgcG9wdXAgYnV0IG1vdXNldXAgb24gdGhlIGNvbnRhaW5lclxuICAgIC8vIFRoaXMgY2FuIGhhcHBlbiB3aGVuIHRoZSB1c2VyIGRyYWdzIGEgc2xpZGVyXG4gICAgaGFuZGxlTW9kYWxNb3VzZWRvd24oZG9tQ2FjaGUpXG5cbiAgICAvLyBJZ25vcmUgY2xpY2sgZXZlbnRzIHRoYXQgaGFkIG1vdXNlZG93biBvbiB0aGUgY29udGFpbmVyIGJ1dCBtb3VzZXVwIG9uIHRoZSBwb3B1cFxuICAgIGhhbmRsZUNvbnRhaW5lck1vdXNlZG93bihkb21DYWNoZSlcblxuICAgIGhhbmRsZU1vZGFsQ2xpY2soaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVUb2FzdENsaWNrID0gKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgLy8gQ2xvc2luZyB0b2FzdCBieSBpbnRlcm5hbCBjbGlja1xuICBkb21DYWNoZS5wb3B1cC5vbmNsaWNrID0gKCkgPT4ge1xuICAgIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgICBpZiAoaW5uZXJQYXJhbXMgJiYgKGlzQW55QnV0dG9uU2hvd24oaW5uZXJQYXJhbXMpIHx8IGlubmVyUGFyYW1zLnRpbWVyIHx8IGlubmVyUGFyYW1zLmlucHV0KSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uY2xvc2UpXG4gIH1cbn1cblxuLyoqXG4gKiBAcGFyYW0geyp9IGlubmVyUGFyYW1zXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNBbnlCdXR0b25TaG93biA9IChpbm5lclBhcmFtcykgPT4ge1xuICByZXR1cm4gKFxuICAgIGlubmVyUGFyYW1zLnNob3dDb25maXJtQnV0dG9uIHx8XG4gICAgaW5uZXJQYXJhbXMuc2hvd0RlbnlCdXR0b24gfHxcbiAgICBpbm5lclBhcmFtcy5zaG93Q2FuY2VsQnV0dG9uIHx8XG4gICAgaW5uZXJQYXJhbXMuc2hvd0Nsb3NlQnV0dG9uXG4gIClcbn1cblxubGV0IGlnbm9yZU91dHNpZGVDbGljayA9IGZhbHNlXG5cbmNvbnN0IGhhbmRsZU1vZGFsTW91c2Vkb3duID0gKGRvbUNhY2hlKSA9PiB7XG4gIGRvbUNhY2hlLnBvcHVwLm9ubW91c2Vkb3duID0gKCkgPT4ge1xuICAgIGRvbUNhY2hlLmNvbnRhaW5lci5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZG9tQ2FjaGUuY29udGFpbmVyLm9ubW91c2V1cCA9IHVuZGVmaW5lZFxuICAgICAgLy8gV2Ugb25seSBjaGVjayBpZiB0aGUgbW91c2V1cCB0YXJnZXQgaXMgdGhlIGNvbnRhaW5lciBiZWNhdXNlIHVzdWFsbHkgaXQgZG9lc24ndFxuICAgICAgLy8gaGF2ZSBhbnkgb3RoZXIgZGlyZWN0IGNoaWxkcmVuIGFzaWRlIG9mIHRoZSBwb3B1cFxuICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb21DYWNoZS5jb250YWluZXIpIHtcbiAgICAgICAgaWdub3JlT3V0c2lkZUNsaWNrID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBoYW5kbGVDb250YWluZXJNb3VzZWRvd24gPSAoZG9tQ2FjaGUpID0+IHtcbiAgZG9tQ2FjaGUuY29udGFpbmVyLm9ubW91c2Vkb3duID0gKCkgPT4ge1xuICAgIGRvbUNhY2hlLnBvcHVwLm9ubW91c2V1cCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICBkb21DYWNoZS5wb3B1cC5vbm1vdXNldXAgPSB1bmRlZmluZWRcbiAgICAgIC8vIFdlIGFsc28gbmVlZCB0byBjaGVjayBpZiB0aGUgbW91c2V1cCB0YXJnZXQgaXMgYSBjaGlsZCBvZiB0aGUgcG9wdXBcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9tQ2FjaGUucG9wdXAgfHwgZG9tQ2FjaGUucG9wdXAuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlTW9kYWxDbGljayA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGRvbUNhY2hlLmNvbnRhaW5lci5vbmNsaWNrID0gKGUpID0+IHtcbiAgICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gICAgaWYgKGlnbm9yZU91dHNpZGVDbGljaykge1xuICAgICAgaWdub3JlT3V0c2lkZUNsaWNrID0gZmFsc2VcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZS50YXJnZXQgPT09IGRvbUNhY2hlLmNvbnRhaW5lciAmJiBjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd091dHNpZGVDbGljaykpIHtcbiAgICAgIGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uYmFja2Ryb3ApXG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgeyBlcnJvciB9IGZyb20gJy4uL3V0aWxzL3V0aWxzLmpzJ1xuXG5jb25zdCBpc0pxdWVyeUVsZW1lbnQgPSAoZWxlbSkgPT4gdHlwZW9mIGVsZW0gPT09ICdvYmplY3QnICYmIGVsZW0uanF1ZXJ5XG5jb25zdCBpc0VsZW1lbnQgPSAoZWxlbSkgPT4gZWxlbSBpbnN0YW5jZW9mIEVsZW1lbnQgfHwgaXNKcXVlcnlFbGVtZW50KGVsZW0pXG5cbmV4cG9ydCBjb25zdCBhcmdzVG9QYXJhbXMgPSAoYXJncykgPT4ge1xuICBjb25zdCBwYXJhbXMgPSB7fVxuICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdvYmplY3QnICYmICFpc0VsZW1lbnQoYXJnc1swXSkpIHtcbiAgICBPYmplY3QuYXNzaWduKHBhcmFtcywgYXJnc1swXSlcbiAgfSBlbHNlIHtcbiAgICA7Wyd0aXRsZScsICdodG1sJywgJ2ljb24nXS5mb3JFYWNoKChuYW1lLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgYXJnID0gYXJnc1tpbmRleF1cbiAgICAgIGlmICh0eXBlb2YgYXJnID09PSAnc3RyaW5nJyB8fCBpc0VsZW1lbnQoYXJnKSkge1xuICAgICAgICBwYXJhbXNbbmFtZV0gPSBhcmdcbiAgICAgIH0gZWxzZSBpZiAoYXJnICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZXJyb3IoYFVuZXhwZWN0ZWQgdHlwZSBvZiAke25hbWV9ISBFeHBlY3RlZCBcInN0cmluZ1wiIG9yIFwiRWxlbWVudFwiLCBnb3QgJHt0eXBlb2YgYXJnfWApXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICByZXR1cm4gcGFyYW1zXG59XG4iLCJleHBvcnQgZnVuY3Rpb24gZmlyZSguLi5hcmdzKSB7XG4gIGNvbnN0IFN3YWwgPSB0aGlzIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcbiAgcmV0dXJuIG5ldyBTd2FsKC4uLmFyZ3MpXG59XG4iLCIvKipcbiAqIFJldHVybnMgYW4gZXh0ZW5kZWQgdmVyc2lvbiBvZiBgU3dhbGAgY29udGFpbmluZyBgcGFyYW1zYCBhcyBkZWZhdWx0cy5cbiAqIFVzZWZ1bCBmb3IgcmV1c2luZyBTd2FsIGNvbmZpZ3VyYXRpb24uXG4gKlxuICogRm9yIGV4YW1wbGU6XG4gKlxuICogQmVmb3JlOlxuICogY29uc3QgdGV4dFByb21wdE9wdGlvbnMgPSB7IGlucHV0OiAndGV4dCcsIHNob3dDYW5jZWxCdXR0b246IHRydWUgfVxuICogY29uc3Qge3ZhbHVlOiBmaXJzdE5hbWV9ID0gYXdhaXQgU3dhbC5maXJlKHsgLi4udGV4dFByb21wdE9wdGlvbnMsIHRpdGxlOiAnV2hhdCBpcyB5b3VyIGZpcnN0IG5hbWU/JyB9KVxuICogY29uc3Qge3ZhbHVlOiBsYXN0TmFtZX0gPSBhd2FpdCBTd2FsLmZpcmUoeyAuLi50ZXh0UHJvbXB0T3B0aW9ucywgdGl0bGU6ICdXaGF0IGlzIHlvdXIgbGFzdCBuYW1lPycgfSlcbiAqXG4gKiBBZnRlcjpcbiAqIGNvbnN0IFRleHRQcm9tcHQgPSBTd2FsLm1peGluKHsgaW5wdXQ6ICd0ZXh0Jywgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSB9KVxuICogY29uc3Qge3ZhbHVlOiBmaXJzdE5hbWV9ID0gYXdhaXQgVGV4dFByb21wdCgnV2hhdCBpcyB5b3VyIGZpcnN0IG5hbWU/JylcbiAqIGNvbnN0IHt2YWx1ZTogbGFzdE5hbWV9ID0gYXdhaXQgVGV4dFByb21wdCgnV2hhdCBpcyB5b3VyIGxhc3QgbmFtZT8nKVxuICpcbiAqIEBwYXJhbSBtaXhpblBhcmFtc1xuICovXG5leHBvcnQgZnVuY3Rpb24gbWl4aW4obWl4aW5QYXJhbXMpIHtcbiAgY2xhc3MgTWl4aW5Td2FsIGV4dGVuZHMgdGhpcyB7XG4gICAgX21haW4ocGFyYW1zLCBwcmlvcml0eU1peGluUGFyYW1zKSB7XG4gICAgICByZXR1cm4gc3VwZXIuX21haW4ocGFyYW1zLCBPYmplY3QuYXNzaWduKHt9LCBtaXhpblBhcmFtcywgcHJpb3JpdHlNaXhpblBhcmFtcykpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE1peGluU3dhbFxufVxuIiwiaW1wb3J0IHsgYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIsIHN0b3BUaW1lclByb2dyZXNzQmFyIH0gZnJvbSAnLi4vdXRpbHMvZG9tL2RvbVV0aWxzLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuXG4vKipcbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzIHNldCwgcmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHRpbWVyIHJlbWFpbmVkLlxuICogT3RoZXJ3aXNlLCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IGdldFRpbWVyTGVmdCA9ICgpID0+IHtcbiAgcmV0dXJuIGdsb2JhbFN0YXRlLnRpbWVvdXQgJiYgZ2xvYmFsU3RhdGUudGltZW91dC5nZXRUaW1lckxlZnQoKVxufVxuXG4vKipcbiAqIFN0b3AgdGltZXIuIFJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBzdG9wVGltZXIgPSAoKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgc3RvcFRpbWVyUHJvZ3Jlc3NCYXIoKVxuICAgIHJldHVybiBnbG9iYWxTdGF0ZS50aW1lb3V0LnN0b3AoKVxuICB9XG59XG5cbi8qKlxuICogUmVzdW1lIHRpbWVyLiBSZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgdGltZXIgcmVtYWluZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgcmVzdW1lVGltZXIgPSAoKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gZ2xvYmFsU3RhdGUudGltZW91dC5zdGFydCgpXG4gICAgYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIocmVtYWluaW5nKVxuICAgIHJldHVybiByZW1haW5pbmdcbiAgfVxufVxuXG4vKipcbiAqIFJlc3VtZSB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHRpbWVyIHJlbWFpbmVkLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZVRpbWVyID0gKCkgPT4ge1xuICBjb25zdCB0aW1lciA9IGdsb2JhbFN0YXRlLnRpbWVvdXRcbiAgcmV0dXJuIHRpbWVyICYmICh0aW1lci5ydW5uaW5nID8gc3RvcFRpbWVyKCkgOiByZXN1bWVUaW1lcigpKVxufVxuXG4vKipcbiAqIEluY3JlYXNlIHRpbWVyLiBSZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgYW4gdXBkYXRlZCB0aW1lci5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBpbmNyZWFzZVRpbWVyID0gKG4pID0+IHtcbiAgaWYgKGdsb2JhbFN0YXRlLnRpbWVvdXQpIHtcbiAgICBjb25zdCByZW1haW5pbmcgPSBnbG9iYWxTdGF0ZS50aW1lb3V0LmluY3JlYXNlKG4pXG4gICAgYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIocmVtYWluaW5nLCB0cnVlKVxuICAgIHJldHVybiByZW1haW5pbmdcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrIGlmIHRpbWVyIGlzIHJ1bm5pbmcuIFJldHVybnMgdHJ1ZSBpZiB0aW1lciBpcyBydW5uaW5nXG4gKiBvciBmYWxzZSBpZiB0aW1lciBpcyBwYXVzZWQgb3Igc3RvcHBlZC5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWRcbiAqL1xuZXhwb3J0IGNvbnN0IGlzVGltZXJSdW5uaW5nID0gKCkgPT4ge1xuICByZXR1cm4gZ2xvYmFsU3RhdGUudGltZW91dCAmJiBnbG9iYWxTdGF0ZS50aW1lb3V0LmlzUnVubmluZygpXG59XG4iLCJsZXQgYm9keUNsaWNrTGlzdGVuZXJBZGRlZCA9IGZhbHNlXG5jb25zdCBjbGlja0hhbmRsZXJzID0ge31cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmRDbGlja0hhbmRsZXIoYXR0ciA9ICdkYXRhLXN3YWwtdGVtcGxhdGUnKSB7XG4gIGNsaWNrSGFuZGxlcnNbYXR0cl0gPSB0aGlzXG5cbiAgaWYgKCFib2R5Q2xpY2tMaXN0ZW5lckFkZGVkKSB7XG4gICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJvZHlDbGlja0xpc3RlbmVyKVxuICAgIGJvZHlDbGlja0xpc3RlbmVyQWRkZWQgPSB0cnVlXG4gIH1cbn1cblxuY29uc3QgYm9keUNsaWNrTGlzdGVuZXIgPSAoZXZlbnQpID0+IHtcbiAgZm9yIChsZXQgZWwgPSBldmVudC50YXJnZXQ7IGVsICYmIGVsICE9PSBkb2N1bWVudDsgZWwgPSBlbC5wYXJlbnROb2RlKSB7XG4gICAgZm9yIChjb25zdCBhdHRyIGluIGNsaWNrSGFuZGxlcnMpIHtcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gZWwuZ2V0QXR0cmlidXRlKGF0dHIpXG4gICAgICBpZiAodGVtcGxhdGUpIHtcbiAgICAgICAgY2xpY2tIYW5kbGVyc1thdHRyXS5maXJlKHsgdGVtcGxhdGUgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgZGVmYXVsdFBhcmFtcywgeyBzaG93V2FybmluZ3NGb3JQYXJhbXMgfSBmcm9tICcuL3V0aWxzL3BhcmFtcy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IGNhbGxJZkZ1bmN0aW9uIH0gZnJvbSAnLi91dGlscy91dGlscy5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgeyB1bnNldEFyaWFIaWRkZW4gfSBmcm9tICcuL3V0aWxzL2FyaWEuanMnXG5pbXBvcnQgeyBnZXRUZW1wbGF0ZVBhcmFtcyB9IGZyb20gJy4vdXRpbHMvZ2V0VGVtcGxhdGVQYXJhbXMuanMnXG5pbXBvcnQgc2V0UGFyYW1ldGVycyBmcm9tICcuL3V0aWxzL3NldFBhcmFtZXRlcnMuanMnXG5pbXBvcnQgVGltZXIgZnJvbSAnLi91dGlscy9UaW1lci5qcydcbmltcG9ydCB7IG9wZW5Qb3B1cCB9IGZyb20gJy4vdXRpbHMvb3BlblBvcHVwLmpzJ1xuaW1wb3J0IHsgaGFuZGxlSW5wdXRPcHRpb25zQW5kVmFsdWUgfSBmcm9tICcuL3V0aWxzL2RvbS9pbnB1dFV0aWxzLmpzJ1xuaW1wb3J0IHsgaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2ssIGhhbmRsZUNvbmZpcm1CdXR0b25DbGljaywgaGFuZGxlRGVueUJ1dHRvbkNsaWNrIH0gZnJvbSAnLi9idXR0b25zLWhhbmRsZXJzLmpzJ1xuaW1wb3J0IHsgaGFuZGxlUG9wdXBDbGljayB9IGZyb20gJy4vcG9wdXAtY2xpY2staGFuZGxlci5qcydcbmltcG9ydCB7IGFkZEtleWRvd25IYW5kbGVyLCBzZXRGb2N1cyB9IGZyb20gJy4va2V5ZG93bi1oYW5kbGVyLmpzJ1xuaW1wb3J0ICogYXMgc3RhdGljTWV0aG9kcyBmcm9tICcuL3N0YXRpY01ldGhvZHMuanMnXG5pbXBvcnQgKiBhcyBpbnN0YW5jZU1ldGhvZHMgZnJvbSAnLi9pbnN0YW5jZU1ldGhvZHMuanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHByaXZhdGVNZXRob2RzIGZyb20gJy4vcHJpdmF0ZU1ldGhvZHMuanMnXG5pbXBvcnQgZ2xvYmFsU3RhdGUgZnJvbSAnLi9nbG9iYWxTdGF0ZS5qcydcblxubGV0IGN1cnJlbnRJbnN0YW5jZVxuXG5jbGFzcyBTd2VldEFsZXJ0IHtcbiAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgIC8vIFByZXZlbnQgcnVuIGluIE5vZGUgZW52XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjdXJyZW50SW5zdGFuY2UgPSB0aGlzXG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3Qgb3V0ZXJQYXJhbXMgPSBPYmplY3QuZnJlZXplKHRoaXMuY29uc3RydWN0b3IuYXJnc1RvUGFyYW1zKGFyZ3MpKVxuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgICAgcGFyYW1zOiB7XG4gICAgICAgIHZhbHVlOiBvdXRlclBhcmFtcyxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB9LFxuICAgIH0pXG5cbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuX21haW4odGhpcy5wYXJhbXMpXG4gICAgcHJpdmF0ZVByb3BzLnByb21pc2Uuc2V0KHRoaXMsIHByb21pc2UpXG4gIH1cblxuICBfbWFpbih1c2VyUGFyYW1zLCBtaXhpblBhcmFtcyA9IHt9KSB7XG4gICAgc2hvd1dhcm5pbmdzRm9yUGFyYW1zKE9iamVjdC5hc3NpZ24oe30sIG1peGluUGFyYW1zLCB1c2VyUGFyYW1zKSlcblxuICAgIGlmIChnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2UpIHtcbiAgICAgIGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZS5fZGVzdHJveSgpXG4gICAgICBpZiAoZG9tLmlzTW9kYWwoKSkge1xuICAgICAgICB1bnNldEFyaWFIaWRkZW4oKVxuICAgICAgfVxuICAgIH1cbiAgICBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2UgPSB0aGlzXG5cbiAgICBjb25zdCBpbm5lclBhcmFtcyA9IHByZXBhcmVQYXJhbXModXNlclBhcmFtcywgbWl4aW5QYXJhbXMpXG4gICAgc2V0UGFyYW1ldGVycyhpbm5lclBhcmFtcylcbiAgICBPYmplY3QuZnJlZXplKGlubmVyUGFyYW1zKVxuXG4gICAgLy8gY2xlYXIgdGhlIHByZXZpb3VzIHRpbWVyXG4gICAgaWYgKGdsb2JhbFN0YXRlLnRpbWVvdXQpIHtcbiAgICAgIGdsb2JhbFN0YXRlLnRpbWVvdXQuc3RvcCgpXG4gICAgICBkZWxldGUgZ2xvYmFsU3RhdGUudGltZW91dFxuICAgIH1cblxuICAgIC8vIGNsZWFyIHRoZSByZXN0b3JlIGZvY3VzIHRpbWVvdXRcbiAgICBjbGVhclRpbWVvdXQoZ2xvYmFsU3RhdGUucmVzdG9yZUZvY3VzVGltZW91dClcblxuICAgIGNvbnN0IGRvbUNhY2hlID0gcG9wdWxhdGVEb21DYWNoZSh0aGlzKVxuXG4gICAgZG9tLnJlbmRlcih0aGlzLCBpbm5lclBhcmFtcylcblxuICAgIHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5zZXQodGhpcywgaW5uZXJQYXJhbXMpXG5cbiAgICByZXR1cm4gc3dhbFByb21pc2UodGhpcywgZG9tQ2FjaGUsIGlubmVyUGFyYW1zKVxuICB9XG5cbiAgLy8gYGNhdGNoYCBjYW5ub3QgYmUgdGhlIG5hbWUgb2YgYSBtb2R1bGUgZXhwb3J0LCBzbyB3ZSBkZWZpbmUgb3VyIHRoZW5hYmxlIG1ldGhvZHMgaGVyZSBpbnN0ZWFkXG4gIHRoZW4ob25GdWxmaWxsZWQpIHtcbiAgICBjb25zdCBwcm9taXNlID0gcHJpdmF0ZVByb3BzLnByb21pc2UuZ2V0KHRoaXMpXG4gICAgcmV0dXJuIHByb21pc2UudGhlbihvbkZ1bGZpbGxlZClcbiAgfVxuXG4gIGZpbmFsbHkob25GaW5hbGx5KSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHByaXZhdGVQcm9wcy5wcm9taXNlLmdldCh0aGlzKVxuICAgIHJldHVybiBwcm9taXNlLmZpbmFsbHkob25GaW5hbGx5KVxuICB9XG59XG5cbmNvbnN0IHN3YWxQcm9taXNlID0gKGluc3RhbmNlLCBkb21DYWNoZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAvLyBmdW5jdGlvbnMgdG8gaGFuZGxlIGFsbCBjbG9zaW5ncy9kaXNtaXNzYWxzXG4gICAgY29uc3QgZGlzbWlzc1dpdGggPSAoZGlzbWlzcykgPT4ge1xuICAgICAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzRGlzbWlzc2VkOiB0cnVlLCBkaXNtaXNzIH0pXG4gICAgfVxuXG4gICAgcHJpdmF0ZU1ldGhvZHMuc3dhbFByb21pc2VSZXNvbHZlLnNldChpbnN0YW5jZSwgcmVzb2x2ZSlcbiAgICBwcml2YXRlTWV0aG9kcy5zd2FsUHJvbWlzZVJlamVjdC5zZXQoaW5zdGFuY2UsIHJlamVjdClcblxuICAgIGRvbUNhY2hlLmNvbmZpcm1CdXR0b24ub25jbGljayA9ICgpID0+IGhhbmRsZUNvbmZpcm1CdXR0b25DbGljayhpbnN0YW5jZSlcbiAgICBkb21DYWNoZS5kZW55QnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVEZW55QnV0dG9uQ2xpY2soaW5zdGFuY2UpXG4gICAgZG9tQ2FjaGUuY2FuY2VsQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVDYW5jZWxCdXR0b25DbGljayhpbnN0YW5jZSwgZGlzbWlzc1dpdGgpXG5cbiAgICBkb21DYWNoZS5jbG9zZUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gZGlzbWlzc1dpdGgoRGlzbWlzc1JlYXNvbi5jbG9zZSlcblxuICAgIGhhbmRsZVBvcHVwQ2xpY2soaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aClcblxuICAgIGFkZEtleWRvd25IYW5kbGVyKGluc3RhbmNlLCBnbG9iYWxTdGF0ZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKVxuXG4gICAgaGFuZGxlSW5wdXRPcHRpb25zQW5kVmFsdWUoaW5zdGFuY2UsIGlubmVyUGFyYW1zKVxuXG4gICAgb3BlblBvcHVwKGlubmVyUGFyYW1zKVxuXG4gICAgc2V0dXBUaW1lcihnbG9iYWxTdGF0ZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKVxuXG4gICAgaW5pdEZvY3VzKGRvbUNhY2hlLCBpbm5lclBhcmFtcylcblxuICAgIC8vIFNjcm9sbCBjb250YWluZXIgdG8gdG9wIG9uIG9wZW4gKCMxMjQ3LCAjMTk0NilcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGRvbUNhY2hlLmNvbnRhaW5lci5zY3JvbGxUb3AgPSAwXG4gICAgfSlcbiAgfSlcbn1cblxuY29uc3QgcHJlcGFyZVBhcmFtcyA9ICh1c2VyUGFyYW1zLCBtaXhpblBhcmFtcykgPT4ge1xuICBjb25zdCB0ZW1wbGF0ZVBhcmFtcyA9IGdldFRlbXBsYXRlUGFyYW1zKHVzZXJQYXJhbXMpXG4gIGNvbnN0IHBhcmFtcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJhbXMsIG1peGluUGFyYW1zLCB0ZW1wbGF0ZVBhcmFtcywgdXNlclBhcmFtcykgLy8gcHJlY2VkZW5jZSBpcyBkZXNjcmliZWQgaW4gIzIxMzFcbiAgcGFyYW1zLnNob3dDbGFzcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJhbXMuc2hvd0NsYXNzLCBwYXJhbXMuc2hvd0NsYXNzKVxuICBwYXJhbXMuaGlkZUNsYXNzID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdFBhcmFtcy5oaWRlQ2xhc3MsIHBhcmFtcy5oaWRlQ2xhc3MpXG4gIHJldHVybiBwYXJhbXNcbn1cblxuY29uc3QgcG9wdWxhdGVEb21DYWNoZSA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBkb21DYWNoZSA9IHtcbiAgICBwb3B1cDogZG9tLmdldFBvcHVwKCksXG4gICAgY29udGFpbmVyOiBkb20uZ2V0Q29udGFpbmVyKCksXG4gICAgYWN0aW9uczogZG9tLmdldEFjdGlvbnMoKSxcbiAgICBjb25maXJtQnV0dG9uOiBkb20uZ2V0Q29uZmlybUJ1dHRvbigpLFxuICAgIGRlbnlCdXR0b246IGRvbS5nZXREZW55QnV0dG9uKCksXG4gICAgY2FuY2VsQnV0dG9uOiBkb20uZ2V0Q2FuY2VsQnV0dG9uKCksXG4gICAgbG9hZGVyOiBkb20uZ2V0TG9hZGVyKCksXG4gICAgY2xvc2VCdXR0b246IGRvbS5nZXRDbG9zZUJ1dHRvbigpLFxuICAgIHZhbGlkYXRpb25NZXNzYWdlOiBkb20uZ2V0VmFsaWRhdGlvbk1lc3NhZ2UoKSxcbiAgICBwcm9ncmVzc1N0ZXBzOiBkb20uZ2V0UHJvZ3Jlc3NTdGVwcygpLFxuICB9XG4gIHByaXZhdGVQcm9wcy5kb21DYWNoZS5zZXQoaW5zdGFuY2UsIGRvbUNhY2hlKVxuXG4gIHJldHVybiBkb21DYWNoZVxufVxuXG5jb25zdCBzZXR1cFRpbWVyID0gKGdsb2JhbFN0YXRlLCBpbm5lclBhcmFtcywgZGlzbWlzc1dpdGgpID0+IHtcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhciA9IGRvbS5nZXRUaW1lclByb2dyZXNzQmFyKClcbiAgZG9tLmhpZGUodGltZXJQcm9ncmVzc0JhcilcbiAgaWYgKGlubmVyUGFyYW1zLnRpbWVyKSB7XG4gICAgZ2xvYmFsU3RhdGUudGltZW91dCA9IG5ldyBUaW1lcigoKSA9PiB7XG4gICAgICBkaXNtaXNzV2l0aCgndGltZXInKVxuICAgICAgZGVsZXRlIGdsb2JhbFN0YXRlLnRpbWVvdXRcbiAgICB9LCBpbm5lclBhcmFtcy50aW1lcilcbiAgICBpZiAoaW5uZXJQYXJhbXMudGltZXJQcm9ncmVzc0Jhcikge1xuICAgICAgZG9tLnNob3codGltZXJQcm9ncmVzc0JhcilcbiAgICAgIGRvbS5hcHBseUN1c3RvbUNsYXNzKHRpbWVyUHJvZ3Jlc3NCYXIsIGlubmVyUGFyYW1zLCAndGltZXJQcm9ncmVzc0JhcicpXG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKGdsb2JhbFN0YXRlLnRpbWVvdXQgJiYgZ2xvYmFsU3RhdGUudGltZW91dC5ydW5uaW5nKSB7XG4gICAgICAgICAgLy8gdGltZXIgY2FuIGJlIGFscmVhZHkgc3RvcHBlZCBvciB1bnNldCBhdCB0aGlzIHBvaW50XG4gICAgICAgICAgZG9tLmFuaW1hdGVUaW1lclByb2dyZXNzQmFyKGlubmVyUGFyYW1zLnRpbWVyKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBpbml0Rm9jdXMgPSAoZG9tQ2FjaGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGlmIChpbm5lclBhcmFtcy50b2FzdCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKCFjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd0VudGVyS2V5KSkge1xuICAgIHJldHVybiBibHVyQWN0aXZlRWxlbWVudCgpXG4gIH1cblxuICBpZiAoIWZvY3VzQnV0dG9uKGRvbUNhY2hlLCBpbm5lclBhcmFtcykpIHtcbiAgICBzZXRGb2N1cyhpbm5lclBhcmFtcywgLTEsIDEpXG4gIH1cbn1cblxuY29uc3QgZm9jdXNCdXR0b24gPSAoZG9tQ2FjaGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGlmIChpbm5lclBhcmFtcy5mb2N1c0RlbnkgJiYgZG9tLmlzVmlzaWJsZShkb21DYWNoZS5kZW55QnV0dG9uKSkge1xuICAgIGRvbUNhY2hlLmRlbnlCdXR0b24uZm9jdXMoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMuZm9jdXNDYW5jZWwgJiYgZG9tLmlzVmlzaWJsZShkb21DYWNoZS5jYW5jZWxCdXR0b24pKSB7XG4gICAgZG9tQ2FjaGUuY2FuY2VsQnV0dG9uLmZvY3VzKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLmZvY3VzQ29uZmlybSAmJiBkb20uaXNWaXNpYmxlKGRvbUNhY2hlLmNvbmZpcm1CdXR0b24pKSB7XG4gICAgZG9tQ2FjaGUuY29uZmlybUJ1dHRvbi5mb2N1cygpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBibHVyQWN0aXZlRWxlbWVudCA9ICgpID0+IHtcbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudCAmJiB0eXBlb2YgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKClcbiAgfVxufVxuXG4vLyBBc3NpZ24gaW5zdGFuY2UgbWV0aG9kcyBmcm9tIHNyYy9pbnN0YW5jZU1ldGhvZHMvKi5qcyB0byBwcm90b3R5cGVcbk9iamVjdC5hc3NpZ24oU3dlZXRBbGVydC5wcm90b3R5cGUsIGluc3RhbmNlTWV0aG9kcylcblxuLy8gQXNzaWduIHN0YXRpYyBtZXRob2RzIGZyb20gc3JjL3N0YXRpY01ldGhvZHMvKi5qcyB0byBjb25zdHJ1Y3RvclxuT2JqZWN0LmFzc2lnbihTd2VldEFsZXJ0LCBzdGF0aWNNZXRob2RzKVxuXG4vLyBQcm94eSB0byBpbnN0YW5jZSBtZXRob2RzIHRvIGNvbnN0cnVjdG9yLCBmb3Igbm93LCBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHlcbk9iamVjdC5rZXlzKGluc3RhbmNlTWV0aG9kcykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gIFN3ZWV0QWxlcnRba2V5XSA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgaWYgKGN1cnJlbnRJbnN0YW5jZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnRJbnN0YW5jZVtrZXldKC4uLmFyZ3MpXG4gICAgfVxuICB9XG59KVxuXG5Td2VldEFsZXJ0LkRpc21pc3NSZWFzb24gPSBEaXNtaXNzUmVhc29uXG5cblN3ZWV0QWxlcnQudmVyc2lvbiA9ICcxMS40LjgnXG5cbmV4cG9ydCBkZWZhdWx0IFN3ZWV0QWxlcnRcbiIsImltcG9ydCBTd2VldEFsZXJ0IGZyb20gJy4vU3dlZXRBbGVydC5qcydcblxuY29uc3QgU3dhbCA9IFN3ZWV0QWxlcnRcbi8vIEB0cy1pZ25vcmVcblN3YWwuZGVmYXVsdCA9IFN3YWxcblxuZXhwb3J0IGRlZmF1bHQgU3dhbFxuIiwiaW1wb3J0IFN3YWwgZnJvbSBcInN3ZWV0YWxlcnQyXCI7XG5pbXBvcnQgJ3N3ZWV0YWxlcnQyL3NyYy9zd2VldGFsZXJ0Mi5zY3NzJ1xuaW1wb3J0IHsganVkZ2VEbGdDb250ZW50IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCI7XG5pbXBvcnQgJy4vZGlhbG9ndWUuc2NzcydcblxuZXhwb3J0IGZ1bmN0aW9uIHRlc3QoKXtcbiAgICBTd2FsLmZpcmUoe1xuICAgICAgICB0aXRsZTogJ0Vycm9yIScsXG4gICAgICAgIHRleHQ6ICdEbyB5b3Ugd2FudCB0byBjb250aW51ZScsXG4gICAgICAgIGljb246ICdlcnJvcicsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiAnQ29vbCdcbiAgICB9KVxuICAgIGNvbnNvbGUuZGlyKFN3YWwpXG59XG5cbi8vIGxldCBzd2FsID0gU3dhbC5maXJlO1xubGV0IERsZ0lkID0gMFxuXG5leHBvcnQgY2xhc3MgRGlhbG9ndWV7XG4gICAgaWQ6IG51bWJlclxuICAgIGlucHV0VmFsdWU6IEFycmF5PERhdGE+XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5pZCA9IERsZ0lkO1xuICAgICAgICBEbGdJZCsrO1xuICAgIH1cbiAgICBpbnB1dERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICBsZXQgaW50ID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHZhbHVlID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IG51bWJlciA9IDA7XG4gICAgICAgIGxldCBpbnB1dElkID0gXCJlenBzeS1kbGctaW5wdXRcIiArIG51bWJlcjtcbiAgICAgICAgbGV0IGRvbSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn6L6T5YWl5a+56K+dJyk7XG4gICAgICAgIGNvbnNvbGUuZGlyKGRsZ0NvbnRlbnQpXG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuaW5wdXQpe1xuICAgICAgICAgICAgaWYodHlwZW9mIGRsZ0NvbnRlbnQuaW5wdXQgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGludC5wdXNoKGRsZ0NvbnRlbnQuaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBpbnQgPSBkbGdDb250ZW50LmlucHV0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdQbGVhc2Ugc2V0IGlucHV0IGluIHlvdXIgb2JqZWN0IScpO1xuICAgICAgICB9XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQudmFsdWUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkbGdDb250ZW50LnZhbHVlID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKGRsZ0NvbnRlbnQudmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHZhbHVlID0gZGxnQ29udGVudC52YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBpbnQubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZS5wdXNoKCcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGludC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih2YWx1ZVtpXSA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHZhbHVlW2ldID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgdGV4dCA9ICcnO1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBpbnQubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQgICsgXCI8ZGl2IGNsYXNzPSdlenBzeS1kbGctaW5wdXQtdGl0bGUnPlwiICtpbnRbaV0rIFwiPC9kaXY+XCIgXG4gICAgICAgICAgICAgICAgKyBcIiA8aW5wdXQgdHlwZT0ndGV4dCcgY2xhc3M9J2V6cHN5LWRsZy1pbnB1dCcgbmFtZT0gJ1wiXG4gICAgICAgICAgICAgICAgKyBpbnB1dElkICtcIicgaWQ9J1wiICsgaW5wdXRJZCArIFwiJyB2YWx1ZT0nXCIrIHZhbHVlW2ldICsgXCInIC8+PGJyPlwiO1xuICAgICAgICAgICAgbnVtYmVyKys7XG4gICAgICAgICAgICBpbnB1dElkID0gXCJlenBzeS1kbGctaW5wdXRcIiArIG51bWJlcjtcbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmRpcih0ZXh0KVxuICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgaHRtbDogdGV4dCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBkbGdDb250ZW50LmNhbmNlbCxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlQ29uZmlybTogKCk9PntcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBpbnQubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlenBzeS1kbGctaW5wdXRcIitpKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZTogaW50W2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MSW5wdXRFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRWYWx1ZSA9IGRvbTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZG9tXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZT0+e1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzKCdudWxsJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICBlcnJvckRsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfplJnor6/lr7nor50nLCfplJnor6/kv6Hmga8nKTtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICdlcnJvcidcbiAgICAgICAgfSlcbiAgICB9XG4gICAgaGVscERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfluK7liqnlr7nor50nLCfluK7liqnkv6Hmga8nKTtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICdpbmZvJ1xuICAgICAgICB9KVxuICAgIH1cbiAgICBsaXN0RGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+WIl+ihqOmAieaLqeWvueivnScpXG4gICAgICAgIGxldCBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgZG9tID0gbmV3IEFycmF5KClcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzXG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuSXNNdWx0aSlcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgICAgIGxldCBrZXkgPSBPYmplY3Qua2V5cyhkbGdDb250ZW50Lmxpc3QpO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0LnZhbHVlcyhkbGdDb250ZW50Lmxpc3QpO1xuICAgICAgICAgICAgdGV4dCArPSBcIjxkaXYgY2xhc3M9J2V6cHN5LWRsZy1NdWx0aURpdic+5oyJ5L2PU2hpZnTmiJZDb250cm9s6ZSu6L+b6KGM5aSa6YCJPC9kaXY+XCJcbiAgICAgICAgICAgIHRleHQgKz0gXCI8c2VsZWN0IGlkPSdlenBzeS1kbGctc2VsZWN0MCcgY2xhc3M9J2V6cHN5LWRsZy1tdWx0aVNlbGVjdCBzd2FsMi1zZWxlY3QnIHN0eWxlPSdkaXNwbGF5OiBmbGV4JyBtdWx0aXBsZT0ndHJ1ZSc+XFxuXCI7XG4gICAgICAgICAgICAvLyB0ZXh0ICs9IFwiICAgPG9wdGlvbiB2YWx1ZSBkaXNhYmxlZD5TZWxlY3Q8L29wdGlvbj5cXG5cIlxuXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBrZXkubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZih2YWx1ZVtpXSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBrZXkwID0gT2JqZWN0LmtleXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTAgPSBPYmplY3QudmFsdWVzKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgPG9wdGdyb3VwIGxhYmVsPSdcIisga2V5W2ldICtcIicgPlxcblwiXG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IGtleTAubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQgKz0gXCIgICAgICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleTBbal0gK1wiJz5cIisgdmFsdWUwW2pdICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgICAgIHRleHQgKz0gJzwvb3B0Z3JvdXA+J1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleVtpXSArXCInPlwiKyB2YWx1ZVtpXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBsZXQgc2VsZWN0SWQgPSBcImV6cHN5LWRsZy1zZWxlY3RcIiArIG51bWJlclxuICAgICAgICAgICAgICAgIC8vIG51bWJlcisrO1xuICAgICAgICAgICAgICAgIC8vIHRleHQgKz0gXCIgICA8c2VsZWN0IGlkPSdcIisgc2VsZWN0SWQgK1wiJyBjbGFzcz0nc3dhbDItc2VsZWN0JyBzdHlsZT0nZGlzcGxheTogZmxleCc+XFxuXCI7XG4gICAgICAgICAgICAgICAgLy8gdGV4dCArPSBcIiAgIDxvcHRpb24gdmFsdWU9ICdkaXNhYmxlZCc+XCIrIGtleVtpXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgIC8vIGlmKHZhbHVlW2ldIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGtleTAgPSBPYmplY3Qua2V5cyh2YWx1ZVtpXSlcbiAgICAgICAgICAgICAgICAvLyAgICAgbGV0IHZhbHVlMCA9IE9iamVjdC52YWx1ZXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgLy8gICAgIGZvcihsZXQgaiA9IDA7aiA8IGtleTAubGVuZ3RoO2orKylcbiAgICAgICAgICAgICAgICAvLyAgICAge1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgdGV4dCArPSBcIiAgICAgICA8b3B0aW9uIHZhbHVlPSdcIisga2V5MFtqXSArXCInPlwiKyB2YWx1ZTBbal0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAvLyBlbHNle1xuICAgICAgICAgICAgICAgIC8vICAgICB0ZXh0ICs9IFwiICAgICAgIDxvcHRpb24gdmFsdWU9J1wiKyBrZXlbaV0gK1wiJz5cIisgdmFsdWVbaV0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gdGV4dCArPSAnPC9zZWxlY3Q+XFxuJ1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0ICs9IFwiPC9zZWxlY3Q+XCJcblxuICAgICAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgaHRtbDogdGV4dCxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJlQ29uZmlybTogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZXpwc3ktZGxnLXNlbGVjdDAnKVxuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihodG1sRG9tKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpPTA7aTwoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5zZWxlY3RlZCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG9wdGdyb3VwID0gKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRhdGE6IERhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYob3B0Z3JvdXAgaW5zdGFuY2VvZiBIVE1MU2VsZWN0RWxlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxPcHRHcm91cEVsZW1lbnQ+b3B0Z3JvdXApLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gbGV0IHNlbCA9IE9iamVjdC5rZXlzKGRsZ0NvbnRlbnQubGlzdClcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yKGxldCBpID0gMDtpIDwgc2VsLmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlenBzeS1kbGctc2VsZWN0XCIraSk7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgZGF0YTogRGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkYXRhTmFtZTogc2VsW2ldLFxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGRhdGE6ICg8SFRNTElucHV0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlID0gZG9tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9tXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC50aGVuKGU9PntcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRpbWVyOiAyMDBcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgIC8vICAgICB9KVxuICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBpbnB1dDogJ3NlbGVjdCcsXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsICBcbiAgICAgICAgICAgICAgICBpbnB1dE9wdGlvbnM6IGRsZ0NvbnRlbnQubGlzdCxcbiAgICAgICAgICAgICAgICBpbnB1dFBsYWNlaG9sZGVyOiAnU2VsZWN0JyxcbiAgICAgICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgaW5wdXQ6ICdlenBzeS1kbGctc2VsZWN0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJlQ29uZmlybTogKCk9PntcbiAgICAgICAgICAgICAgICAgICAgbGV0IGh0bWxEb20gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzd2FsMi1zZWxlY3QnKVswXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8KDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRncm91cCA9ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGdyb3VwIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTE9wdEdyb3VwRWxlbWVudD5vcHRncm91cCkubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9tLnB1c2goZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdGhhdC5pbnB1dFZhbHVlID0gZG9tO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZG9tXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC8vIC50aGVuKGU9PntcbiAgICAgICAgICAgIC8vICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAvLyAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAvLyAgICAgICAgIHtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgc2hvd0NvbmZpcm1CdXR0b246IGZhbHNlLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRpbWVyOiAyMDBcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVzKGUudmFsdWUpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICByZXMoXCJudWxsXCIpO1xuICAgICAgICAgICAgLy8gICAgICAgICB9XG4gICAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgIC8vIH0pXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIHF1ZXN0RGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+ivoumXruWvueivnScsJ+ivoumXruS/oeaBrycpO1xuICAgICAgICByZXR1cm4gU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bicsXG4gICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiAncXVlc3Rpb24nXG4gICAgICAgIH0pLnRoZW4oZT0+e1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdTdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGljb246ICdzdWNjZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVyOiAyMDBcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbiAgICB3YXJuRGxnKGRsZ0NvbnRlbnQ6IERsZ0NvbnRlbnQpe1xuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+W4ruWKqeWvueivnScsJ+W4ruWKqeS/oeaBrycpO1xuICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ3dhcm5pbmcnXG4gICAgICAgIH0pXG4gICAgfVxuICAgIG1zZ0RsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbWdVcmwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuaW1nVXJsID0gJ2h0dHBzOi8vdW5zcGxhc2guaXQvNDAwLzIwMCdcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbWdXaWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZGxnQ29udGVudC5pbWdXaWR0aCA9IDQwMFxuICAgICAgICBpZihkbGdDb250ZW50LmltZ0hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgICAgICAgICAgZGxnQ29udGVudC5pbWdIZWlnaHQgPSAyMDBcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0ZXh0OiBkbGdDb250ZW50LmNvbnRlbnQsXG4gICAgICAgICAgICB3aWR0aDogMS4yICogZGxnQ29udGVudC5pbWdXaWR0aCxcbiAgICAgICAgICAgIGhlaWdodEF1dG86IHRydWUsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBkbGdDb250ZW50LmNvbmZpcm0sXG4gICAgICAgICAgICBpbWFnZVVybDogZGxnQ29udGVudC5pbWdVcmwsXG4gICAgICAgICAgICBpbWFnZVdpZHRoOiBkbGdDb250ZW50LmltZ1dpZHRoLFxuICAgICAgICAgICAgaW1hZ2VIZWlnaHQ6IGRsZ0NvbnRlbnQuaW1nSGVpZ2h0LFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkudGhlbihlPT57XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICAgICAgaWYoZS5pc0NvbmZpcm1lZClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhlLnZhbHVlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufVxuXG5pbnRlcmZhY2UgRGF0YXtcbiAgICBkYXRhTmFtZTogc3RyaW5nXG4gICAgZGF0YTogc3RyaW5nXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGxnQ29udGVudHtcbiAgICB0aXRsZTogc3RyaW5nXG4gICAgY29udGVudD86IHN0cmluZ1xuICAgIGltZ1VybD86IHN0cmluZ1xuICAgIGltZ1dpZHRoPzogbnVtYmVyXG4gICAgaW1nSGVpZ2h0PzogbnVtYmVyXG4gICAgY29uZmlybT86IHN0cmluZ1xuICAgIGNhbmNlbD86IHN0cmluZ1xuICAgIGlucHV0PzogQXJyYXk8c3RyaW5nPiB8IHN0cmluZ1xuICAgIHZhbHVlPzogQXJyYXk8c3RyaW5nPiB8IHN0cmluZ1xuICAgIGxpc3Q/OiBPYmplY3RcbiAgICBJc011bHRpPzogYm9vbGVhblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRGxnSW5pdCgpe1xuICAgIGxldCBkbGcgPSBuZXcgRGlhbG9ndWUoKTtcbiAgICByZXR1cm4gZGxnO1xufSIsImltcG9ydCAqIGFzIGV6VXRpbHMgZnJvbSAnLi91dGlscydcbmltcG9ydCAqIGFzIGV6Q2FudmFzIGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6VGltZSBmcm9tICcuL1RpbWUvdGltZSdcbmltcG9ydCB7IGNhbnZhc1N0eWxlIH0gZnJvbSAnLi9DYW52YXMvY2FudmFzJ1xuaW1wb3J0ICogYXMgZXpKdWRnZSBmcm9tICcuL0p1ZGdlL2p1ZGdlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5pbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSAnLi9TdG9yYWdlL3N0b3JhZ2UnXG5pbXBvcnQgeyBUZXh0TGluZSxUZXh0cyB9IGZyb20gJy4vR3JhcGhpYy90ZXh0J1xuLy8gaW1wb3J0IHsgR3JhdE9wdHMsc2luR3JhdCB9IGZyb20gJy4vR3JhcGhpYy9zaW5HcmF0J1xuXG5cblxuLy8gZXhwb3J0IHsgQWRqb2luUmVjdCxSZWN0Q2VudGVyIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2NpcmNsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9lbGxpcHNlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3BvbHlnb24nXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9pbWFnZSdcbmV4cG9ydCAqIGZyb20gJy4vVGltZS90aW1lJ1xuZXhwb3J0ICogZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzcydcbi8vIGV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZ3JhdGluZydcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9zaW5HcmF0J1xuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWVQZXJmb3JtYW5jZSdcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MwJ1xuZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZTAnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvc2luR3JhdGluZydcbmV4cG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0IHsgQXJjIH0gZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCB7IEVsbGlwc2UgfSBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCB7IFRleHRzIH0gZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG5leHBvcnQgeyBLZXlwcmVzcyB9IGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MwJ1xuLy8gZXhwb3J0IHsgVGltZSB9IGZyb20gJy4vVGltZS90aW1lJ1xuLy8gZXhwb3J0IHsgRGlhbG9ndWVfMH0gZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZSdcbmV4cG9ydCB7IHNpbkdyYXRpbmcgfSBmcm9tICcuL0dyYXBoaWMvc2luR3JhdGluZydcbmV4cG9ydCB7IEdyYXQgfSBmcm9tICcuL0dyYXBoaWMvZ3JhdGluZydcbmV4cG9ydCB7IFRpbWUgfSBmcm9tICcuL1RpbWUvdGltZVBlcmZvcm1hbmNlJ1xuZXhwb3J0IHsgUmFuZG9tRG90IH0gZnJvbSAnLi9HcmFwaGljL3JhbmRvbURvdCdcblxuLy8gZXhwb3J0IHsgYW5pbWF0ZSB9IGZyb20gJy4vQW5pbWF0ZS9hbmltYXRlJ1xuLy8gZXhwb3J0IHsgbWFrZVJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG4gXG4vLyBsZXQgRXpwc3lMaXN0ID0gbmV3IEFycmF5KCk7XG5cbmNsYXNzIEV6cHN5IHtcbiAgICByZWFkb25seSBpZDogbnVtYmVyXG4gICAgZG9tOiBIVE1MRWxlbWVudFxuICAgIHJlYWRvbmx5IGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgcHJpdmF0ZSBzdG9yYWdlOiBTdG9yYWdlXG4gICAgY1N0eWxlPzogY2FudmFzU3R5bGVcblxuICAgIC8vIFJlY3RhbmdsZTogUmVjdGFuZ2xlXG5cbiAgICBjb25zdHJ1Y3RvcihpZDogbnVtYmVyLGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpe1xuICAgICAgICB0aGlzLmlkID0gaWQ7XG4gICAgICAgIHRoaXMuZG9tID0gZG9tO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpXG4gICAgICAgIGNTdHlsZSA9IGV6SnVkZ2UuanVkZ2VDYW52YXNTdHlsZShjU3R5bGUpO1xuICAgICAgICB0aGlzLmNTdHlsZSA9IGNTdHlsZTtcbiAgICAgICAgdGhpcy5jdHggPSBlekNhbnZhcy5jcmVhdGVDYW52YXMoZG9tLGNTdHlsZSk7ICAgIC8v5q2k5aSE5Yib5bu6Y2FudmFz77yM5Y+v5LuF5Yib5bu65LiA5LiqY2FudmFz77yM5L2G5piv55uu5YmN5peg5rOV5LuF5riF6Zmk5LiA5Liq5Zu+5b2iXG4gICAgICAgIFxuICAgIH1cblxuICAgIHNldENhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpe1xuICAgICAgICAvLyBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmN0eExpc3QubGVuZ3RoO2krKyl7XG4gICAgICAgIC8vICAgICBsZXQgYyA9IHRoaXMuY3R4TGlzdFtpXS5jYW52YXM7XG4gICAgICAgIC8vICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoXG4gICAgICAgIC8vICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHRcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBsZXQgZWwgPSB0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGg7XG4gICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICAgICAgbGV0IHcgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgICBsZXQgaCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgICAgICBjLnN0eWxlLnRvcCA9ICgoaC1jU3R5bGUuaGVpZ2h0KS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICBjLnN0eWxlLmxlZnQgPSAoKHctY1N0eWxlLndpZHRoKS8yKS50b1N0cmluZygpICsgJ3B4J1xuICAgICAgICB0aGlzLmNTdHlsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiBjU3R5bGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNTdHlsZS5oZWlnaHRcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgfVxuXG4gICAgcmVmcmVzaCgpe1xuICAgICAgICAvLyBjb25zb2xlLmRpcih0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0KVxuICAgICAgICAvLyB0aGlzLnN0b3JhZ2UuRWxlbWVudHNMaXN0ID0gbmV3IEFycmF5KCk7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlRHJhdyh0aGlzLmN0eClcbiAgICB9XG5cbiAgICAvLyBzZXRBbmltYXRlQ2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMuY3R4TGlzdC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBsZXQgYyA9IHRoaXMuY3R4TGlzdFtpXS5jYW52YXM7XG4gICAgLy8gICAgICAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoXG4gICAgLy8gICAgICAgICBjLmhlaWdodCA9IGNTdHlsZS5oZWlnaHRcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cblxuICAgIGFkZChlbDogRWxlbWVudHN8RWxlbWVudHNbXXxHcm91cCl7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBsZXQgc3QgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgbGV0IG5hbWUgPSBzdC5nZXRFbGVtZW50c05hbWUoZWwpXG4gICAgICAgIGxldCBpbmRleCA9IHN0LnNlYXJjaEVsZW1lbnRzTmFtZShuYW1lKVxuICAgICAgICBcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50c3x8ZWwgaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoaW5kZXggIT09IC0xKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZWwpXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5zdG9yYWdlLnB1c2goZWwpXG4gICAgICAgICAgICAgICAgZWwuY3R4ID0gY3R4O1xuICAgICAgICAgICAgICAgIGVsLnN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbCxjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBsZXQgZSA9IGVsW2ldXG4gICAgICAgICAgICAgICAgdGhpcy5hZGQoZSlcbiAgICAgICAgICAgICAgICAvLyBlbFtpXS5jdHggPSBjdHhcbiAgICAgICAgICAgICAgICAvLyBlbFtpXS5zdG9yYWdlID0gdGhpcy5zdG9yYWdlXG4gICAgICAgICAgICAgICAgLy8gZXpKdWRnZS5qdWRnZUVsZW1lbnQoZWxbaV0sY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVtb3ZlKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdfEdyb3VwKVxuICAgIHtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBjICA9IGN0eC5jYW52YXNcbiAgICAgICAgYy53aWR0aCA9IHRoaXMuY1N0eWxlLndpZHRoXG4gICAgICAgIGMuaGVpZ2h0ID0gdGhpcy5jU3R5bGUuaGVpZ2h0XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUoZWwpO1xuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KGN0eCk7ICAgXG4gICAgfVxuXG4gICAgLy8gYWxpYXNpbmcoc3R5bGU6IHN0cmluZyl7XG4gICAgLy8gICAgIHRoaXMuY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9IHN0eWxlXG4gICAgLy8gfVxuXG4gICAgYW5pbWF0ZShlbDogRWxlbWVudHN8RWxlbWVudHNbXSxmdW5jOiBGdW5jdGlvbixkZWxheTogbnVtYmVyKXtcblxuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICBlbFtpXS5Jc0FuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgZWxbaV0uSXNQYXVzZSA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZWwuSXNBbmltYXRpb24gPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZWwuY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gZWwucmVtb3ZlKCk7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eDtcblxuICAgICAgICBsZXQgcGF1c2UgPSBmYWxzZTtcbiAgICAgICAgLy8gbGV0IGN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyh0aGlzLmRvbSx0aGlzLmNTdHlsZSk7IFxuICAgICAgICAvLyB0aGlzLmN0eExpc3QucHVzaChjdHgpO1xuXG4gICAgICAgIChhc3luYyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aGlsZSgoPEVsZW1lbnRzPmVsKS5Jc0FuaW1hdGlvbiB8fCAoPEFycmF5PEVsZW1lbnRzPj5lbClbMF0uSXNBbmltYXRpb24pe1xuICAgICAgICAgICAgICAgIGlmKGVsIGluc3RhbmNlb2YgRWxlbWVudHMpXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlID0gZWwuSXNQYXVzZVxuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgcGF1c2UgPSBlbFswXS5Jc1BhdXNlXG4gICAgICAgICAgICAgICAgaWYocGF1c2UpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmRpcihcIlRoZSBhbmltYXRpb24gaGFzIHBhdXNlZCAhXCIpO1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCBlelRpbWUuZGVsYXlfZnJhbWUoZGVsYXkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBmdW5jKCk7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZShkZWxheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVtb3ZlKGVsKVxuICAgICAgICAgICAgICAgICAgICB0aGF0LmFkZChlbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KSgpXG4gICAgICAgIFxuXG4gICAgICAgIC8vIHdpbmRvdy5zZXRJbnRlcnZhbCgoKT0+e1xuICAgICAgICAvLyAgICAgLy8gbGV0IGEgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAvLyAgICAgLy8gZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAvLyAgICAgZXpUaW1lci5zbGVlcChkZWxheSkudGhlbigoKT0+e1xuICAgICAgICAvLyAgICAgICAgIGVsLnJlbW92ZSgpXG4gICAgICAgIC8vICAgICAgICAgdGhhdC5hZGQoZWwpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHBlcmZvcm1hbmNlLm5vdygpIC0gYSAtIDEwMClcbiAgICAgICAgLy8gICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfSwwKVxuXG5cbiAgICAgICAgLy8gKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCAxMDtpKyspXG4gICAgICAgIC8vICAgICB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgZnVuYygpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgLy8gICAgICAgICBhd2FpdCBlelRpbWVyLnNsZWVwKGRlbGF5KVxuICAgICAgICAvLyAgICAgICAgIGF3YWl0IGVsLnJlbW92ZSgpXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgdGhhdC5hZGQoZWwpO1xuICAgICAgICAvLyAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5wdXNoKGVsKVxuICAgICAgICAvLyAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAvLyAgICAgICAgIC8vIGV6SnVkZ2UuanVkZ2VBbmltYXRlKGVsLGN0eCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gYXdhaXQgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpO1xuICAgICAgICAvLyAgICAgICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSkoKVxuICAgIH1cblxuICAgIC8vIHNpbkdyYXRQbGF5KG9wdHM6IEdyYXRPcHRzKXtcbiAgICAvLyAgICAgbGV0IHNpbkdyYXRMaXN0ID0gbmV3IEFycmF5KCk7XG4gICAgLy8gICAgIGxldCBzaCA9IG9wdHMuc2hhcGU7XG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IE1hdGguZmxvb3IoNjAqc2guY3ljbGUpO2krKylcbiAgICAvLyAgICAge1xuICAgICAgICAgICAgXG4gICAgLy8gICAgICAgICBsZXQgc2luZ3JhdCA9IG5ldyBzaW5HcmF0KHtcbiAgICAvLyAgICAgICAgICAgICBzaGFwZToge1xuICAgIC8vICAgICAgICAgICAgICAgICB4OiBzaC54LFxuICAgIC8vICAgICAgICAgICAgICAgICB5OiBzaC55LFxuICAgIC8vICAgICAgICAgICAgICAgICByOiBzaC5yLFxuICAgIC8vICAgICAgICAgICAgICAgICBwaXhlbHNQZXJEZWdyZWU6IHNoLnBpeGVsc1BlckRlZ3JlZSwgXG4gICAgLy8gICAgICAgICAgICAgICAgIHNwYXRpYWxGcmVxdWVuY3k6IHNoLnNwYXRpYWxGcmVxdWVuY3ksXG4gICAgLy8gICAgICAgICAgICAgICAgIGFuZ2xlOiBzaC5hbmdsZSwgXG4gICAgLy8gICAgICAgICAgICAgICAgIGNvbnRyYXN0OiBzaC5jb250cmFzdCwgXG4gICAgLy8gICAgICAgICAgICAgICAgIHBoYXNlOiBzaC5waGFzZSArIDIqaSpNYXRoLlBJLzYwLFxuICAgIC8vICAgICAgICAgICAgICAgICBjeWNsZTogc2guY3ljbGUsXG4gICAgLy8gICAgICAgICAgICAgICAgIHNwZWVkOiBzaC5zcGVlZFxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICAgICAgc2luR3JhdExpc3QucHVzaChzaW5ncmF0KTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBjb25zb2xlLmRpcihzaW5HcmF0TGlzdCk7XG4gICAgLy8gICAgIChhc3luYyAoKT0+e1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc2luR3JhdExpc3QubGVuZ3RoO2krPXNoLnNwZWVkKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHRoaXMuYWRkKHNpbkdyYXRMaXN0W2ldKVxuICAgIC8vICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZSgxKTtcbiAgICAvLyAgICAgICAgICAgICBpZihpIT09c2luR3JhdExpc3QubGVuZ3RoLXNoLnNwZWVkKVxuICAgIC8vICAgICAgICAgICAgICAgICBzaW5HcmF0TGlzdFtpXS5yZW1vdmUoKTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkoKVxuICAgIC8vIH1cblxuICAgIHNldFRleHRMaW5lKHRleHRMaW5lOiBUZXh0TGluZSlcbiAgICB7XG4gICAgICAgIGxldCBjID0gdGhpcy5jdHguY2FudmFzO1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgbGV0IHN0ID0gdGhpcy5zdG9yYWdlXG4gICAgICAgIHN0LnRleHRMaW5lID0gdGV4dExpbmVcbiAgICAgICAgaWYodGV4dExpbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRBKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHN0LkVsZW1lbnRzTGlzdC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdC5FbGVtZW50c0xpc3RbaV0udGV4dExpbmUudGV4dEEgPSB0ZXh0TGluZS50ZXh0QVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LkVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XSBpbnN0YW5jZW9mIFRleHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdFt0XS50ZXh0TGluZS50ZXh0QSA9IHRleHRMaW5lLnRleHRBXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGV4dExpbmUudGV4dEIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc3QuRWxlbWVudHNMaXN0Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihzdC5FbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBUZXh0cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0LkVsZW1lbnRzTGlzdFtpXS50ZXh0TGluZS50ZXh0QiA9IHRleHRMaW5lLnRleHRCXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8ICg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3QubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdLnRleHRMaW5lLnRleHRCID0gdGV4dExpbmUudGV4dEJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3QucmVEcmF3KHRoaXMuY3R4KTtcbiAgICB9XG5cbiAgICBjbGVhcigpe1xuICAgICAgICAvLyBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgLy8gcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUscmVqZWN0KXtcbiAgICAgICAgLy8gICAgIGxldCBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgLy8gICAgIHdoaWxlKGNoaWxkKXtcbiAgICAgICAgLy8gICAgICAgICB0aGF0LmRvbS5yZW1vdmVDaGlsZChjaGlsZClcbiAgICAgICAgLy8gICAgICAgICBjaGlsZCA9IHRoYXQuZG9tLmxhc3RFbGVtZW50Q2hpbGRcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gICAgIHJlc29sdmUoMClcbiAgICAgICAgLy8gfSlcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gbmV3IFN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGMud2lkdGggPSB0aGlzLmNTdHlsZS53aWR0aFxuICAgICAgICBjLmhlaWdodCA9IHRoaXMuY1N0eWxlLmhlaWdodFxuICAgIH1cblxufVxuXG4vLyBleHBvcnQgZnVuY3Rpb24gcHVzaEV6cHN5TGlzdChlejogRXpwc3kpe1xuLy8gICAgIGxldCBudW0gPSBlei5pZDtcbi8vICAgICBFenBzeUxpc3RbbnVtXSA9IGV6O1xuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKSB7XG4gICAgbGV0IGV6ID0gbmV3IEV6cHN5KGV6VXRpbHMuQ291bnQoKSxkb20sY1N0eWxlKTtcbiAgICAvLyBwdXNoRXpwc3lMaXN0KGV6KTtcbiAgICAvLyBjb25zb2xlLmRpcihFenBzeUxpc3QpO1xuICAgIHJldHVybiBlejtcbn0iXSwibmFtZXMiOlsiZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlIiwiZXpKdWRnZS5qdWRnZUVsZW1lbnQiLCJlelRpbWUuZGVsYXlfZnJhbWUiLCJuYW1lSWQiLCJlekp1ZGdlLmp1ZGdlVFJTIiwid2FzbSIsImNhY2hlZ2V0SW50MzJNZW1vcnkwIiwiZ2V0SW50MzJNZW1vcnkwIiwiYnVmZmVyIiwibWVtb3J5IiwiSW50MzJBcnJheSIsImNhY2hlZ2V0VWludDhNZW1vcnkwIiwiZ2V0VWludDhNZW1vcnkwIiwiVWludDhBcnJheSIsImdldEFycmF5VThGcm9tV2FzbTAiLCJwdHIiLCJsZW4iLCJzdWJhcnJheSIsInByZV9zaW5ncmF0IiwicmFkaXVzIiwicGl4ZWxzX3Blcl9kZWdyZWUiLCJzcGF0aWFsX2ZyZXF1ZW5jeSIsImFuZ2xlIiwiY29udHJhc3QiLCJwaGFzZSIsImdhbW1hIiwicmV0cHRyIiwiX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlciIsInIwIiwicjEiLCJ2MCIsInNsaWNlIiwiX193YmluZGdlbl9mcmVlIiwicHJlX25vaXNlX3NpbmdyYXQiLCJsZXZlbCIsImxvYWQiLCJtb2R1bGUiLCJpbXBvcnRzIiwiUmVzcG9uc2UiLCJXZWJBc3NlbWJseSIsImluc3RhbnRpYXRlU3RyZWFtaW5nIiwiZSIsImhlYWRlcnMiLCJnZXQiLCJjb25zb2xlIiwid2FybiIsImJ5dGVzIiwiYXJyYXlCdWZmZXIiLCJpbnN0YW50aWF0ZSIsImluc3RhbmNlIiwiSW5zdGFuY2UiLCJpbml0IiwiaW5wdXQiLCJVUkwiLCJpbXBvcnQiLCJtZXRhIiwidXJsIiwiUmVxdWVzdCIsImZldGNoIiwiZXhwb3J0cyIsIl9fd2JpbmRnZW5fd2FzbV9tb2R1bGUiLCJTRy5kZWZhdWx0IiwiU0cucHJlX25vaXNlX3NpbmdyYXQiLCJTRy5wcmVfc2luZ3JhdCIsIlRJTUUuZGVsYXlfZnJhbWUiLCJlelNpbkdyYXQuc2luR3JhdCIsImdldFByb2dyZXNzU3RlcHMiLCJpc1Zpc2libGUiLCJnZXRJbnB1dCIsInJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UiLCJkb20uZ2V0QWN0aW9ucyIsImRvbS5nZXRMb2FkZXIiLCJkb20uaGlkZSIsImRvbS5zaG93IiwiZG9tLmFwcGx5Q3VzdG9tQ2xhc3MiLCJkb20uc2V0SW5uZXJIdG1sIiwiZG9tLmdldENvbmZpcm1CdXR0b24iLCJkb20uZ2V0RGVueUJ1dHRvbiIsImRvbS5nZXRDYW5jZWxCdXR0b24iLCJkb20ucmVtb3ZlQ2xhc3MiLCJkb20uYWRkQ2xhc3MiLCJkb20udG9nZ2xlIiwiZG9tLmdldENvbnRhaW5lciIsImRvbS5nZXRQb3B1cCIsImRvbS5nZXREaXJlY3RDaGlsZEJ5Q2xhc3MiLCJkb20uZm9jdXNJbnB1dCIsImRvbS5nZXRJbnB1dCIsImRvbS5nZXRIdG1sQ29udGFpbmVyIiwiZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyIiwiZG9tLmdldEZvb3RlciIsImRvbS5nZXRDbG9zZUJ1dHRvbiIsImRvbS5nZXRJY29uIiwiZG9tLnNldFN0eWxlIiwiZG9tLmdldEltYWdlIiwiZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUiLCJkb20uZ2V0UHJvZ3Jlc3NTdGVwcyIsImRvbS5nZXRUaXRsZSIsImRvbS5nZXRWYWxpZGF0aW9uTWVzc2FnZSIsImFkZENsYXNzZXMiLCJkb20uaXNWaXNpYmxlIiwiZG9tLmluaXQiLCJkb20uc3RhdGVzIiwiZG9tLm1lYXN1cmVTY3JvbGxiYXIiLCJkb20uaGFzQ2xhc3MiLCJkb20uaXNTY3JvbGxhYmxlIiwiZG9tLmlzTW9kYWwiLCJkb20uaXNUb2FzdCIsImRvbS5hbmltYXRpb25FbmRFdmVudCIsImRvbS5oYXNDc3NBbmltYXRpb24iLCJkb20uYWxsQnV0dG9uc0FyZUhpZGRlbiIsImRvbVV0aWxzLmlzVmlzaWJsZSIsImRvbS5nZXRGb2N1c2FibGVFbGVtZW50cyIsImRvbS5yZW5kZXIiLCJ0aGlzIiwiZG9tLmdldFRpbWVyUHJvZ3Jlc3NCYXIiLCJkb20uYW5pbWF0ZVRpbWVyUHJvZ3Jlc3NCYXIiLCJlekNhbnZhcy5jcmVhdGVDYW52YXMiLCJlelV0aWxzLkNvdW50Il0sIm1hcHBpbmdzIjoiQUFDQSxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7U0FFQSxLQUFLO0lBQ2pCLE9BQU8sT0FBTyxFQUFFLENBQUM7QUFDckI7O1NDRWdCLFlBQVksQ0FBQyxHQUFnQixFQUFDLE1BQW9CO0lBQzlELElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUE7Ozs7O0lBS3hDLENBQUMsQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQTtJQUM3QixDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7SUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7SUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTs7SUFFMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMs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QVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN2RixJQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLEVBQ3ZPO1FBQ0ksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUN0QixDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEdB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LElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2pDLElBQUksSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7SUFDdkIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzlCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFDekQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxL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ZSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBQyxLQUFLLEdBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7O0tBRXJEO0lBQ0QsS0FBSyxJQUFJLENBQUMsR0FBQyxDQUFDLEVBQUMsQ0FBQyxHQUFDLENBQUMsRUFBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxJQUFFLENBQUMsRUFBQyxDQUFDLEVBQUUsRUFDakQ7UUFDSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQzNDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7S0FDM0I7O0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVEO0FBQ0E7QUFDQSxTQUFTLFFBQVEsQ0FBQyxNQUFNO0lBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7SUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN2QixJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQzVCLElBQUksU0FBUyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDbEMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzlCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbEIsSUFBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNYLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFDRCxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBQyxDQUFDLEVBQUUsRUFDakM7UUFDSSxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUUsR0FBRyxDQUFDLEdBQUMsR0FBRyxDQUFDO1FBQzVELEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUE7S0FDekI7Ozs7Ozs7SUFPRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQ7QUFDQTtBQUNBLFNBQVMsVUFBVSxDQUFDLE1BQU0sRUFBRSxlQUFlLEVBQUUsZ0JBQWdCLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLO0lBQ2pGLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFBO0lBQzNCLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtJQUM3QixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzVCLElBQUksUUFBUSxHQUFHLEdBQUcsR0FBRyxNQUFNLENBQUM7SUFDNUIsSUFBSSxTQUFTLEdBQUcsTUFBTSxHQUFHLFFBQVEsQ0FBQztJQUNsQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7SUFDekQsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDNUMsSUFBSSxLQUFLLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN4QixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBQ3ZCLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsRUFBRSxFQUM5QjtRQUNJLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxHQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FB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QUMxRSxJQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsRUFDL0M7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBRUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2RSxJQUFHLEVBQUUsS0FBSyxFQUFFLEVBQ1o7WUFDSSxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBQyxFQUFFLEtBQUcsRUFB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QUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxNQUFNO0lBQ1YsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxNQUFNO0lBQ1YsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFBTTtJQUNYLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLGFBQWE7SUFDbEIsR0FBRyxFQUFFLFFBQVE7SUFDYixHQUFHLEVBQUUsY0FBYztJQUNuQixHQUFHLEVBQUUsYUFBYTtJQUNsQixHQUFHLEVBQUUsWUFBWTtJQUNqQixHQUFHLEVBQUUsV0FBVztJQUNoQixHQUFHLEVBQUUsSUFBSTtJQUNULEdBQUcsRUFBRSxJQUFJO0lBQ1QsR0FBRyxF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LE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBQztBQUN0RixLQUFLO0FBQ0wsR0FBRyxFQUFDO0FBQ0osRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLFFBQVEsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEtBQUs7QUFDL0MsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxJQUFJLEVBQUM7QUFDdEMsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sRUFBRSxTQUFTLEtBQUs7QUFDbEQsRUFBRSxXQUFXLENBQUMsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUM7QUFDdkMsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTyxNQUFNLHFCQUFxQixHQUFHLENBQUMsSUFBSSxFQUFFLFNBQVMsS0FBSztBQUMxRCxFQUFFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFDO0FBQzdDLEVBQUUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDOUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLEVBQUU7QUFDNUMsTUFBTSxPQUFPLFVBQVUsQ0FBQyxDQUFDLENBQUM7QUFDMUIsS0FBSztBQUNMLEdBQUc7QUFDSCxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ08sTUFBTSxtQkFBbUIsR0FBRyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxLQUFLO0FBQzlELEVBQUUsSUFBSSxLQUFLLEtBQUssQ0FBQyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFD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
