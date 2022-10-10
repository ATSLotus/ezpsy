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
    ctx.textAlign = text.textLine.textA;
    ctx.textBaseline = text.textLine.textB;
    judgeTextStyle(text, ctx);
    judgeTRS(text);
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
    greyImgData;
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
        let that = this;
        this.init().then(async (imageData) => {
            console.dir(imageData);
            that.ImgData = imageData;
        });
        nameId$4++;
    }
    init() {
        let that = this;
        return new Promise(function (resolve, reject) {
            if (that.Img.src == null)
                return reject();
            let canvas = document.createElement('canvas'), context = canvas.getContext('2d'), image = new Image();
            image.addEventListener('load', function () {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, that.Img.width, that.Img.height);
                resolve(context.getImageData(0, 0, that.Img.width, that.Img.height));
            }, false);
            image.crossOrigin = "Anonymous";
            image.src = that.Img.src;
        });
    }
    toGray() {
        // let img = new Img({
        //     shape: {
        //         img: this.shape.img,
        //         x: this.shape.x,
        //         y: this.shape.y,
        //         width: this.shape.width,
        //         height: this.shape.height,
        //         sx: this.shape.sx,
        //         sy: this.shape.sy,
        //         swidth: this.shape.swidth,
        //         sheight: this.shape.sheight,
        //     }
        // })
        // this.IsChange = true
        this.IsChange = true;
        let g = 0;
        this.greyImgData = new ImageData(this.Img.width, this.Img.height);
        for (let i = 0; i < this.ImgData.data.length / 4; i++) {
            g = Math.floor(this.ImgData.data[4 * i + 0] * 0.299 + this.ImgData.data[4 * i + 1] * 0.587 + this.ImgData.data[4 * i + 2] * 0.114);
            // img.ImgData.data[4*i+0] = g
            // img.ImgData.data[4*i+1] = g
            // img.ImgData.data[4*i+2] = g
            // img.ImgData.data[4*i+3] = this.ImgData.data[4*i+3]
            this.greyImgData.data[4 * i + 0] = g;
            this.greyImgData.data[4 * i + 1] = g;
            this.greyImgData.data[4 * i + 2] = g;
            this.greyImgData.data[4 * i + 3] = this.ImgData.data[4 * i + 3];
        }
        // return img;
    }
    replace() {
        this.IsChange = false;
        this.init();
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
// export function PreloadTextures(img: Img): Img{
//     let newImg = img.makeTextures();
//     return newImg
// }
// export function DrawTexture(img: Img): Img{
//     let newImg = img.makeTextures();
//     return newImg
// }
// export function DrawTextures(img: Img[]|Group): Group{
//     let I;
//     let texture: Img[] = []
//     let T;
//     if(img[0] instanceof Img)
//     {
//         I = new Group(img)
//     }
//     else{
//         I = img
//     }
//     for(let i = 0;i < I.groupList.length;i++)
//     {
//         texture[i] = DrawTexture(I.groupList[i])
//     }
//     T = new Group(texture)
//     return T;
// }

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
        this.RandomDotArray = randomisedPoint(this.shape.x, this.shape.y, this.shape.r, this.shape.maskBand, this.shape.number);
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
function randomisedPoint(x, y, radius, maskBand, number) {
    let arr = getNonRepetitiveRandom(radius - maskBand, radius, number);
    let dot = new Array();
    for (let i = 0; i < number; i++) {
        dot[i] = new Circle({
            shape: {
                x: x - radius + arr[i].x,
                y: y - radius + arr[i].y,
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
    // let sh = img.shape
    console.dir(img.ImgData);
    // if(sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined)
    // {
    //     if(sh.width === undefined || sh.height === undefined)
    //     {
    //         ctx.drawImage(img.Img,sh.x,sh.y)
    //     }
    //     else{
    //         ctx.drawImage(img.Img,sh.x,sh.y,sh.width,sh.height)
    //     }
    // }
    // else{
    //     if(sh.width === undefined || sh.height === undefined)
    //     {
    //         ctx.drawImage(img.Img,sh.sx,sh.sy,sh.swidth,sh.sheight,sh.x,sh.y,img.Img.width,img.Img.height)
    //     }
    //     else{
    //         ctx.drawImage(img.Img,sh.sx,sh.sy,sh.swidth,sh.sheight,sh.x,sh.y,sh.width,sh.height)
    //     }
    // }
    let sh = img.shape;
    if (sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined) {
        // console.dir(777)
        ctx.putImageData(img.ImgData, sh.x, sh.y);
    }
    else {
        // console.dir(77)
        ctx.putImageData(img.ImgData, sh.x, sh.y, sh.sx, sh.sy, sh.swidth, sh.sheight);
    }
}
function judgeImageShape_true(img, ctx) {
    let sh = img.shape;
    if (sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined) {
        // ctx.putImageData(img.ImgData,sh.x,sh.y)
        ctx.putImageData(img.greyImgData, sh.x, sh.y);
    }
    else {
        // ctx.putImageData(img.ImgData,sh.x,sh.y,sh.sx,sh.sy,sh.swidth,sh.sheight)
        ctx.putImageData(img.greyImgData, sh.x, sh.y, sh.sx, sh.sy, sh.swidth, sh.sheight);
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
    else if (el instanceof Texts) {
        x = el.shape.x;
        y = el.shape.y;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy50cyIsIi4uLy4uL3NyYy9DYW52YXMvY2FudmFzLnRzIiwiLi4vLi4vc3JjL1RpbWUvdGltZS50cyIsIi4uLy4uL3NyYy9FbGVtZW50LnRzIiwiLi4vLi4vc3JjL0dyb3VwL2dyb3VwLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvcmVjdGFuZ2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvY2lyY2xlLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvbGluZS50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2FyYy50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2VsbGlwc2UudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9wb2x5Z29uLnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvdGV4dC50cyIsIi4uLy4uL3NyYy9HcmFwaGljL2ltYWdlLnRzIiwiLi4vLi4vc3JjL0dyYWRpZW50L2dyYWRpZW50LnRzIiwiLi4vLi4vc3JjL0dyYXBoaWMvZ3JhdGluZy50cyIsIi4uLy4uL3N0YXRpYy9wa2cvc2luZ3JhdC5qcyIsIi4uLy4uL3NyYy9HcmFwaGljL3NpbkdyYXRpbmcudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9yYW5kb21Eb3QudHMiLCIuLi8uLi9zcmMvR3JhcGhpYy9zaW5HcmF0LnRzIiwiLi4vLi4vc3JjL0p1ZGdlL2p1ZGdlLnRzIiwiLi4vLi4vc3JjL1N0b3JhZ2Uvc3RvcmFnZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzcy50cyIsIi4uLy4uL3NyYy9UaW1lL3RpbWVQZXJmb3JtYW5jZS50cyIsIi4uLy4uL3NyYy9LZXlwcmVzcy9rZXlwcmVzczAudHMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL3V0aWxzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9wYXJhbXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2NsYXNzZXMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9nZXR0ZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vZG9tVXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2lzTm9kZUVudi5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvY29uc3RhbnRzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9nbG9iYWxTdGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2luaXQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9wYXJzZUh0bWxUb0NvbnRhaW5lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2FuaW1hdGlvbkVuZEV2ZW50LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vbWVhc3VyZVNjcm9sbGJhci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJBY3Rpb25zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNvbnRhaW5lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvcHJpdmF0ZVByb3BzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlcklucHV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNvbnRlbnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyRm9vdGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckNsb3NlQnV0dG9uLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kb20vcmVuZGVyZXJzL3JlbmRlckljb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVySW1hZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2RvbS9yZW5kZXJlcnMvcmVuZGVyUHJvZ3Jlc3NTdGVwcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJUaXRsZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXJQb3B1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL3JlbmRlcmVycy9yZW5kZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL0Rpc21pc3NSZWFzb24uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2FyaWEuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL2dldFRlbXBsYXRlUGFyYW1zLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9kZWZhdWx0SW5wdXRWYWxpZGF0b3JzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9zZXRQYXJhbWV0ZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9UaW1lci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvc2Nyb2xsYmFyRml4LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy91dGlscy9pb3NGaXguanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3V0aWxzL29wZW5Qb3B1cC5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9zaG93TG9hZGluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvdXRpbHMvZG9tL2lucHV0VXRpbHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9oaWRlTG9hZGluZy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2dldElucHV0LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9wcml2YXRlTWV0aG9kcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9kb20uanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2tleWRvd24taGFuZGxlci5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL2Nsb3NlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9pbnN0YW5jZU1ldGhvZHMvZW5hYmxlLWRpc2FibGUtZWxlbWVudHMuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy92YWxpZGF0aW9uLW1lc3NhZ2UuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL2luc3RhbmNlTWV0aG9kcy9wcm9ncmVzcy1zdGVwcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL3VwZGF0ZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvaW5zdGFuY2VNZXRob2RzL19kZXN0cm95LmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9idXR0b25zLWhhbmRsZXJzLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9wb3B1cC1jbGljay1oYW5kbGVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2FyZ3NUb1BhcmFtcy5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9zd2VldGFsZXJ0Mi9zcmMvc3RhdGljTWV0aG9kcy9maXJlLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL21peGluLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL3RpbWVyLmpzIiwiLi4vLi4vbm9kZV9tb2R1bGVzL3N3ZWV0YWxlcnQyL3NyYy9zdGF0aWNNZXRob2RzL2JpbmRDbGlja0hhbmRsZXIuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL1N3ZWV0QWxlcnQuanMiLCIuLi8uLi9ub2RlX21vZHVsZXMvc3dlZXRhbGVydDIvc3JjL3N3ZWV0YWxlcnQyLmpzIiwiLi4vLi4vc3JjL0RpYWxvZ3VlL2RpYWxvZ3VlMC50cyIsIi4uLy4uL3NyYy9lenBzeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJcbmxldCBpZFN0YXJ0ID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIENvdW50KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIGlkU3RhcnQrKztcbn0iLCJpbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5leHBvcnQgaW50ZXJmYWNlIGNhbnZhc1N0eWxle1xuICAgIHdpZHRoPzogbnVtYmVyO1xuICAgIGhlaWdodD86IG51bWJlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUNhbnZhcyhkb206IEhUTUxFbGVtZW50LGNTdHlsZT86IGNhbnZhc1N0eWxlKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICAvLyBsZXQgY1N0eWxlOiBjYW52YXNTdHlsZSA9IHtcbiAgICAvLyAgICAgd2lkdGg6IDEwMCxcbiAgICAvLyAgICAgaGVpZ2h0OiAxMDBcbiAgICAvLyB9XG4gICAgYy5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSdcbiAgICBjLndpZHRoID0gY1N0eWxlLndpZHRoO1xuICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodDtcbiAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgbGV0IGggPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAvLyBjb25zb2xlLmRpcih3KVxuICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgYy5zdHlsZS5sZWZ0ID0gKCh3LWNTdHlsZS53aWR0aCkvMikudG9TdHJpbmcoKSArICdweCdcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGRvbS5hcHBlbmQoYyk7XG4gICAgcmV0dXJuIGN0eDtcbn0iLCJcbmNsYXNzIHRpbWV7XG4gICAgaG91cjogbnVtYmVyXG4gICAgbWludXRlczogbnVtYmVyXG4gICAgc2Vjb25kczogbnVtYmVyXG4gICAgbWlsbGlzZWNvbmRzOiBudW1iZXJcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgICAgdGhpcy5ob3VyID0gZGF0ZS5nZXRIb3VycygpXG4gICAgICAgIHRoaXMubWludXRlcyA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIHRoaXMuc2Vjb25kcyA9IGRhdGUuZ2V0U2Vjb25kcygpXG4gICAgICAgIHRoaXMubWlsbGlzZWNvbmRzID0gZGF0ZS5nZXRNaWxsaXNlY29uZHMoKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRpbWUwe1xuICAgIHN0YXJ0VGltZTogdGltZVxuICAgIGluc3RhbnRUaW1lOiBBcnJheTx0aW1lPlxuICAgIHRpbWVTdGFtcDogQXJyYXk8dGltZT5cbiAgICBpdGVtOiBudW1iZXJcbiAgICB0aW1lVmFsdWU6IEFycmF5PG51bWJlcj5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLml0ZW0gPSAwO1xuICAgICAgICB0aGlzLnN0YXJ0VGltZSA9IG5ldyB0aW1lKClcbiAgICAgICAgdGhpcy5pbnN0YW50VGltZSA9IFtdXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUucHVzaCh0aGlzLnN0YXJ0VGltZSlcbiAgICAgICAgdGhpcy50aW1lVmFsdWUgPSBbXVxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IFtdXG4gICAgfVxuICAgIHN0YXJ0KCl7XG4gICAgICAgIHRoaXMuc3RhcnRUaW1lID0gbmV3IHRpbWUoKVxuICAgIH1cbiAgICByZWNvcmQoKXtcbiAgICAgICAgbGV0IHQgPSBuZXcgdGltZSgpXG4gICAgICAgIHRoaXMuaW5zdGFudFRpbWUucHVzaCh0KVxuICAgICAgICB0aGlzLml0ZW0rK1xuICAgIH1cbn1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIFRpYygpOiBUaW1lMHtcbi8vICAgICBsZXQgdCA9IG5ldyBUaW1lMCgpXG4vLyAgICAgdC5zdGFydCgpXG4vLyAgICAgcmV0dXJuIHQ7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBUb2ModGltZTogVGltZTApOiBudW1iZXJ7XG4vLyAgICAgbGV0IHQgPSAwO1xuLy8gICAgIGxldCB0cyA9IG5ldyBBcnJheSgpXG4vLyAgICAgdGltZS5yZWNvcmQoKVxuLy8gICAgIHRzWzBdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLmhvdXIgLSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbS0xXS5ob3VyXG4vLyAgICAgdHNbMV0gPSB0aW1lLmluc3RhbnRUaW1lW3RpbWUuaXRlbV0ubWludXRlcyAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLm1pbnV0ZXNcbi8vICAgICB0c1syXSA9IHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtXS5zZWNvbmRzIC0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW0tMV0uc2Vjb25kc1xuLy8gICAgIHRzWzNdID0gdGltZS5pbnN0YW50VGltZVt0aW1lLml0ZW1dLm1pbGxpc2Vjb25kcyAtIHRpbWUuaW5zdGFudFRpbWVbdGltZS5pdGVtLTFdLm1pbGxpc2Vjb25kc1xuLy8gICAgIHQgPSA2MCo2MCp0c1swXSArIDYwKnRzWzFdICsgdHNbMl0gKyB0c1szXS8xMDAwXG4vLyAgICAgLy8gdC50b0ZpeGVkKDMpXG4vLyAgICAgdGltZS50aW1lVmFsdWUucHVzaCh0KTtcbi8vICAgICByZXR1cm4gdDtcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIHNldFRpbWVUdGFtcChUOiBUaW1lMCl7XG4vLyAgICAgbGV0IHQgPSBuZXcgdGltZSgpO1xuLy8gICAgIFQudGltZVN0YW1wLnB1c2godCk7XG4vLyB9IFxuXG4vLyBleHBvcnQgZnVuY3Rpb24gZ2V0VG9jKHRpbWU6IFRpbWUwKTogQXJyYXk8bnVtYmVyPntcbi8vICAgICBsZXQgdEEgPSBuZXcgQXJyYXkoKTtcbi8vICAgICBsZXQgdHMgPSBuZXcgQXJyYXkoKTtcbi8vICAgICBsZXQgdCA9IHRpbWUudGltZVN0YW1wXG4vLyAgICAgZm9yKGxldCBpID0gMDtpIDwgTWF0aC5mbG9vcih0Lmxlbmd0aC8yKTtpKyspe1xuLy8gICAgICAgICBpZih0WzIqaSsxXSA9PT0gdW5kZWZpbmVkKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNle1xuLy8gICAgICAgICAgICAgdHNbMF0gPSB0WzIqaSsxXS5ob3VyIC0gdFsyKmldLmhvdXJcbi8vICAgICAgICAgICAgIHRzWzFdID0gdFsyKmkrMV0ubWludXRlcyAtIHRbMippXS5taW51dGVzXG4vLyAgICAgICAgICAgICB0c1syXSA9IHRbMippKzFdLnNlY29uZHMgLSB0WzIqaV0uc2Vjb25kc1xuLy8gICAgICAgICAgICAgdHNbM10gPSB0WzIqaSsxXS5taWxsaXNlY29uZHMgLSB0WzIqaV0ubWlsbGlzZWNvbmRzXG4vLyAgICAgICAgICAgICB0QVtpXSA9IDYwKjYwKnRzWzBdICsgNjAqdHNbMV0gKyB0c1syXSArIHRzWzNdLzEwMDBcbi8vICAgICAgICAgICAgIC8vIHRBW2ldID0gTWF0aC5yb3VuZCh0QVtpXSoxMDAwKS8xMDAwXG4vLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0QVtpXSlcbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vICAgICByZXR1cm4gdEE7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBHZXRTZWNzKHRpbWU6IFRpbWUwKTogbnVtYmVye1xuLy8gICAgIGxldCB0ID0gVG9jKHRpbWUpXG4vLyAgICAgcmV0dXJuIHRcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIFdhaXRTZWNzMChkZWxheTogbnVtYmVyLG1lc3NhZ2U/OiBhbnkpe1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLHJlamVjdCl7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgICAgICByZXNvbHZlKDEpO1xuICAgICAgICB9LCBkZWxheSk7XG4gICAgfSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGF5X2ZyYW1lKG51bTEpe1xuICAgIGxldCB0aW1lX251bT0wOyAgICAgXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgKGZ1bmN0aW9uIHJhZigpe1xuICAgICAgICAgICAgdGltZV9udW0rKztcbiAgICAgICAgICAgIGxldCBpZCA9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShyYWYpO1xuICAgICAgICBpZiggdGltZV9udW0+bnVtMSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgIH0oKSlcbiAgICB9KVxufTsiLCJpbXBvcnQgeyBSZWN0YW5nbGUgfSBmcm9tICcuL0dyYXBoaWMvcmVjdGFuZ2xlJ1xuaW1wb3J0IHsgU2hhcGUsU3R5bGV9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IG5hbWVTdHlsZSB9IGZyb20gJy4vRGF0YVR5cGUvZGF0YVR5cGUnO1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vU3RvcmFnZS9zdG9yYWdlJztcbmltcG9ydCAqIGFzIGV6VGltZSBmcm9tIFwiLi9UaW1lL3RpbWVcIlxuaW1wb3J0ICogYXMgZXpUaW1lciBmcm9tIFwiLi9UaW1lL3RpbWVQZXJmb3JtYW5jZVwiXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gJy4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBUZXh0TGluZSB9IGZyb20gJy4vR3JhcGhpYy90ZXh0JztcblxuZXhwb3J0IGNsYXNzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGVcbiAgICBzaGFwZT86IFNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZSBcbiAgICB0ZXh0TGluZT86IFRleHRMaW5lXG4gICAgY3R4PzogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgc3RvcmFnZT86IFN0b3JhZ2VcbiAgICBzY2FsZT86IFNjYWxlXG4gICAgdHJhbnNsYXRlPzogVHJhbnNsYXRlXG4gICAgcm90YXRlPzogbnVtYmVyXG4gICAgSXNBbmltYXRpb24/OiBib29sZWFuXG4gICAgSXNQYXVzZT86IGJvb2xlYW5cbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zY2FsZSA9IHtcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgICAgaGVpZ2h0OiAxXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yb3RhdGUgPSAwXG4gICAgICAgIHRoaXMuSXNBbmltYXRpb24gPSBmYWxzZVxuICAgICAgICB0aGlzLklzUGF1c2UgPSBmYWxzZVxuICAgIH1cbiAgICBub0ZpbGwoKXtcbiAgICAgICAgdGhpcy5zdHlsZS5maWxsID0gJ25vbmUnO1xuICAgIH1cbiAgICBub1N0cm9rZSgpe1xuICAgICAgICB0aGlzLnN0eWxlLmxpbmVXaWR0aCA9IDA7XG4gICAgICAgIC8vIGlmKHRoaXMuc3R5bGUuZmlsbCAhPT0gJ25vbmUnICYmIHRoaXMuc3R5bGUuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gdGhpcy5zdHlsZS5maWxsXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUuc3Ryb2tlID0gXCIjZmZmXCI7XG4gICAgICAgIC8vICAgICBjb25zb2xlLmRpcignRXJyb3IhJylcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnN0eWxlLnN0cm9rZSA9ICdub25lJ1xuICAgIH1cbiAgICBzZXRDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgICAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGMuc3R5bGUubGVmdCA9ICgody1jU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGxldCBlbCA9IHRoaXM7XG4gICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICB9XG4gICAgcmVtb3ZlKCl7XG5cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIFxuICAgICAgICBjdHguc2F2ZSgpXG4gICAgICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgICAgICBjdHguZmlsbFN0eWxlPVwid2hpdGVcIlx0XG4gICAgICAgIGN0eC5maWxsUmVjdCgwLDAsMSwxKVxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uPVwiZGVzdGluYXRpb24taW5cIjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KDAsMCwxLDEpO1xuICAgICAgICAvLyBjdHguY2xvc2VQYXRoKClcdFxuICAgICAgICBjdHgucmVzdG9yZSgpXG4gICAgICAgIGN0eC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb249J3NvdXJjZS1vdmVyJ1xuXG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZW1vdmUodGhpcyk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTtcblxuXG4gICAgICAgIC8vIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICAvLyBsZXQgYyA9IGN0eC5jYW52YXM7XG4gICAgICAgIC8vIGMud2lkdGggPSBjLndpZHRoO1xuICAgICAgICAvLyBjLmhlaWdodCA9IGMuaGVpZ2h0O1xuXG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgYW5pbWF0ZShmdW5jOiBGdW5jdGlvbixkZWxheTogbnVtYmVyKXtcblxuICAgICAgICB0aGlzLklzQW5pbWF0aW9uID0gdHJ1ZVxuXG4gICAgICAgIC8vIGVsLmN0eCA9IHRoaXMuY3R4O1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIC8vIGVsLnJlbW92ZSgpO1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHg7XG4gICAgICAgIC8vIGxldCBzdGFydCA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAvLyBsZXQgY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKHRoaXMuZG9tLHRoaXMuY1N0eWxlKTsgXG4gICAgICAgIC8vIHRoaXMuY3R4TGlzdC5wdXNoKGN0eCk7XG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgLy8gd2hpbGUocGVyZm9ybWFuY2Uubm93KCkgPiBzdGFydClcbiAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHdoaWxlKHRoYXQuSXNBbmltYXRpb24pe1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHBlcmZvcm1hbmNlLm5vdygpKVxuICAgICAgICAgICAgICAgIGlmKHRoYXQuSXNQYXVzZSl7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKFwiVGhlIGFuaW1hdGlvbiBoYXMgcGF1c2VkICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZShkZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKGRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdCk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgICAgIC8vICAgICBhd2FpdCBlelRpbWVyLnNsZWVwKGRlbGF5KVxuICAgICAgICAgICAgLy8gICAgIHRoYXQucmVtb3ZlKClcbiAgICAgICAgICAgIC8vICAgICB0aGF0LnN0b3JhZ2UucHVzaCh0aGF0KVxuICAgICAgICAgICAgLy8gICAgIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KVxuICAgICAgICAgICAgLy8gICAgIC8vIGV6SnVkZ2UuanVkZ2VBbmltYXRlKHRoYXQsY3R4KTtcbiAgICAgICAgICAgIC8vICAgICAvLyBhd2FpdCB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgICAgICAgICAvLyAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gd2luZG93LnNldEludGVydmFsKCgpPT57XG4gICAgICAgICAgICAvLyAgICAgZnVuYygpO1xuICAgICAgICAgICAgLy8gICAgIC8vIGF3YWl0IGV6VGltZS5XYWl0U2VjczAoZGVsYXkvMilcbiAgICAgICAgICAgIC8vICAgICBlelRpbWVyLnNsZWVwKGRlbGF5KS50aGVuKCgpPT57XG4gICAgICAgICAgICAvLyAgICAgICAgIHRoYXQucmVtb3ZlKClcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhhdC5zdG9yYWdlLnB1c2godGhhdClcbiAgICAgICAgICAgIC8vICAgICAgICAgdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIH0sMClcbiAgICAgICAgfSkoKVxuICAgIH1cblxuICAgIC8vIHJvdGF0ZShhbmdsZTogbnVtYmVyKXtcbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIGxldCB4ID0gdGhpcy5zaGFwZS54XG4gICAgLy8gICAgIGxldCB5ID0gdGhpcy5zaGFwZS55XG4gICAgLy8gICAgIHRoaXMuc2hhcGUueCA9IDA7XG4gICAgLy8gICAgIHRoaXMuc2hhcGUueSA9IDA7XG4gICAgLy8gICAgIGN0eC50cmFuc2xhdGUoeCx5KTtcbiAgICAvLyAgICAgY3R4LnJvdGF0ZShhbmdsZSlcbiAgICAvLyAgICAgdGhpcy5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgLy8gfVxuXG4gICAgLy8gc2NhbGUoc2NhbGVXaWR0aDogbnVtYmVyLHNjYWxlSGVpZ2h0OiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgdGhpcy5yZW1vdmUoKVxuICAgIC8vICAgICBjdHguc2F2ZSgpXG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vICAgICBjdHguc2NhbGUoc2NhbGVXaWR0aCxzY2FsZUhlaWdodClcbiAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpXG4gICAgLy8gICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIC8vICAgICBjdHgucmVzdG9yZSgpXG4gICAgLy8gfVxuICAgIC8vIHJvdGF0ZShhbmc6IG51bWJlcil7XG4gICAgLy8gICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgIC8vICAgICB0aGlzLnJlbW92ZSgpXG4gICAgLy8gICAgIGN0eC5zYXZlKClcbiAgICAvLyAgICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yb3RhdGUoYW5nKVxuICAgIC8vICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudCh0aGlzLGN0eClcbiAgICAvLyAgICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgLy8gICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyB9XG4gICAgLy8gdHJhbnNsYXRlKHg6IG51bWJlcix5OiBudW1iZXIpe1xuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgdGhpcy5yZW1vdmUoKVxuICAgIC8vICAgICBjdHguc2F2ZSgpXG4gICAgLy8gICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vICAgICBjdHgudHJhbnNsYXRlKHgseSlcbiAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQodGhpcyxjdHgpO1xuICAgIC8vICAgICBjdHguY2xvc2VQYXRoKClcbiAgICAvLyAgICAgY3R4LnJlc3RvcmUoKVxuICAgIC8vIH1cbn1cblxuZXhwb3J0IGludGVyZmFjZSBTY2FsZXtcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJhbnNsYXRle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXJcbn0iLCJpbXBvcnQgeyBDbGFzcyB9IGZyb20gJ2VzdHJlZSc7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IG5hbWVTdHlsZSB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJztcblxubGV0IGdyb3VwSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgR3JvdXAgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImdyb3VwXCIgKyBncm91cElkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogZ3JvdXBJZFxuICAgIH1cbiAgICBsZW5ndGg6IG51bWJlclxuICAgIC8vIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEXG4gICAgZ3JvdXBMaXN0OiBFbGVtZW50c1tdfEdyb3VwW118R3JvdXBcbiAgICBcbiAgICBjb25zdHJ1Y3RvcihlbDogRWxlbWVudHNbXXxHcm91cFtdfEdyb3VwKXtcblxuICAgICAgICBzdXBlcigpXG5cbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gdGhpcy5pZCA9IGdyb3VwSWQ7XG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMubGVuZ3RoID0gMVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLmxlbmd0aCA9IGVsLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmdyb3VwTGlzdCA9IGVsO1xuXG4gICAgICAgIGdyb3VwSWQrKyBcbiAgICB9XG59IiwiaW1wb3J0IHsgU2hhcGUsU3R5bGUsbmFtZVN0eWxlLE9wdHMgfSBmcm9tICcuLi9EYXRhVHlwZS9kYXRhVHlwZSdcbmltcG9ydCB7IGp1ZGdlQ2hhbmdlVHlwZSxqdWRnZVNpZGUsanVkZ2VTdHlsZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEdyb3VwIH0gZnJvbSAnLi4vR3JvdXAvZ3JvdXAnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5cblxuaW50ZXJmYWNlIFJlY3RhbmdsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB3aWR0aDogbnVtYmVyLFxuICAgIGhlaWdodDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBSZWN0YW5nbGVPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUmVjdGFuZ2xlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmNsYXNzIENlbnRlcntcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLnggPSByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoIC8gMjtcbiAgICAgICAgdGhpcy55ID0gcmVjdC5zaGFwZS55ICsgcmVjdC5zaGFwZS5oZWlnaHQgLyAyO1xuICAgIH1cbn1cblxuY2xhc3MgU2l6ZXtcbiAgICByZWN0OiBSZWN0YW5nbGVcbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbiAgICBjb25zdHJ1Y3RvcihyZWN0OiBSZWN0YW5nbGUpe1xuICAgICAgICB0aGlzLnJlY3QgPSByZWN0O1xuICAgICAgICB0aGlzLndpZHRoID0gcmVjdC5zaGFwZS53aWR0aFxuICAgICAgICB0aGlzLmhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxufVxuXG5jbGFzcyBTaWRlWFl7XG4gICAgeDogbnVtYmVyXG4gICAgeTogbnVtYmVyXG4gICAgY29uc3RydWN0b3IoKXtcblxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFJlY3RHcm91cCBleHRlbmRzIEdyb3VwIHtcbiAgICBQYXJlbnRzUmVjdDogUmVjdGFuZ2xlXG4gICAgY29uc3RydWN0b3IocmVjdDogUmVjdGFuZ2xlLGVsOiBFbGVtZW50c1tdKXtcbiAgICAgICAgc3VwZXIoZWwpXG4gICAgICAgIHRoaXMuUGFyZW50c1JlY3QgPSByZWN0O1xuICAgIH1cbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbi8vIGNsYXNzIFR5cGVUZXN0IGltcGxlbWVudHMgUmVjdGFuZ2xlU2hhcGV7XG4vLyAgICAgeDogbnVtYmVyXG4vLyAgICAgeTogbnVtYmVyXG4vLyAgICAgd2lkdGg6IG51bWJlclxuLy8gICAgIGhlaWdodDogbnVtYmVyXG4vLyB9XG5cbmV4cG9ydCBjbGFzcyBSZWN0YW5nbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInJlY3RcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBSZWN0YW5nbGVPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHg7XG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuXG4gICAgfVxufVxuXG5jbGFzcyBsb2dpY1JlY3QgZXh0ZW5kcyBSZWN0YW5nbGV7XG4gICAgcmVjdFBhcmVudHMwOiBSZWN0YW5nbGU7XG4gICAgcmVjdFBhcmVudHMxOiBSZWN0YW5nbGU7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKHtzaGFwZTp7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogaGVpZ2h0XG4gICAgICAgIH19KVxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMCA9IHJlY3RQYXJlbnRzMFxuICAgICAgICB0aGlzLnJlY3RQYXJlbnRzMSA9IHJlY3RQYXJlbnRzMVxuICAgIH1cbn1cblxuY2xhc3MgY2xpcFJlY3QgZXh0ZW5kcyBsb2dpY1JlY3R7XG4gICAgY29uc3RydWN0b3IoW3gseSx3aWR0aCxoZWlnaHRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxyZWN0UGFyZW50czA6IFJlY3RhbmdsZSxyZWN0UGFyZW50czE6IFJlY3RhbmdsZSl7XG4gICAgICAgIHN1cGVyKFt4LHksd2lkdGgsaGVpZ2h0XSxyZWN0UGFyZW50czAscmVjdFBhcmVudHMxKVxuICAgIH1cbn1cblxuY2xhc3MgdW5pb25SZWN0IGV4dGVuZHMgbG9naWNSZWN0e1xuICAgIGNvbnN0cnVjdG9yKFt4LHksd2lkdGgsaGVpZ2h0XTogW251bWJlcixudW1iZXIsbnVtYmVyLG51bWJlcl0scmVjdFBhcmVudHMwOiBSZWN0YW5nbGUscmVjdFBhcmVudHMxOiBSZWN0YW5nbGUpe1xuICAgICAgICBzdXBlcihbeCx5LHdpZHRoLGhlaWdodF0scmVjdFBhcmVudHMwLHJlY3RQYXJlbnRzMSlcbiAgICB9XG59XG5cbi8vIGZ1bmN0aW9uIGluc3RhbmNlb2ZSZWN0YW5nbGUoZTogYW55KTogZSBpcyBSZWN0YW5nbGVTaGFwZXtcbi8vICAgICByZXR1cm4gIGluIGU7XG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBtYWtlUmVjdGFuZ2xlKHJlY3Q6IFJlY3RhbmdsZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IFJlY3RhbmdsZXtcbi8vICAgICBsZXQgc2ggPSByZWN0LnNoYXBlO1xuLy8gICAgIGxldCBzdCA9IHJlY3Quc3R5bGU7XG4vLyAgICAgbGV0IGYscztcbi8vICAgICAvLyBjb25zb2xlLmRpcihzdC5zdHJva2UpXG4vLyAgICAgW2N0eCxmLHNdID0ganVkZ2VTdHlsZShyZWN0LGN0eCk7XG4vLyAgICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPSAnbm9uZScpe1xuLy8gICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgICAgIGN0eC5zdHJva2VSZWN0KHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpO1xuLy8gICAgIH1cbi8vICAgICBlbHNlIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5zdHJva2UgPT09ICdub25lJyl7XG4vLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuLy8gICAgICAgICBjdHguZmlsbFJlY3Qoc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodCk7XG4vLyAgICAgfVxuLy8gICAgIGVsc2UgaWYoc3QuZmlsbCA9PT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gJ25vbmUnKXtcbi8vICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuLy8gICAgICAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbi8vICAgICAgICAgY3R4LnN0cm9rZSgpO1xuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICBjb25zb2xlLmRpcihcImVycm9yIUl0IGNhbid0IHBhaW50IGEgcmVjdGFuZ2xlIHdpdGhvdXQgZmlsbFN0eWxlIGFuZCBzdHJva2VTdHlsZVwiKVxuLy8gICAgIH1cbiAgICBcbi8vICAgICByZXR1cm4gcmVjdDtcbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VSZWN0YW5nbGUocmVjdDogUmVjdGFuZ2xlLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogUmVjdGFuZ2xle1xuICAgIGxldCBzaCA9IHJlY3Quc2hhcGU7XG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBqdWRnZVRSUyhyZWN0KTtcbiAgICBjdHgucmVjdChzaC54LHNoLnksc2gud2lkdGgsc2guaGVpZ2h0KTtcbiAgICBqdWRnZVN0eWxlKHJlY3QsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiByZWN0O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWRqb2luUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUsZml4ZWRTdHlsZT86IHN0cmluZ3xudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLmi7zmjqUgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmi7zmjqXnn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdDtcbiAgICBpZighZml4ZWRTdHlsZSlcbiAgICB7XG4gICAgICAgIGZpeGVkU3R5bGUgPSAnUkVDVExFRlQnXG4gICAgfVxuICAgIGxldCBmID0ganVkZ2VDaGFuZ2VUeXBlKGZpeGVkU3R5bGUpO1xuICAgIC8vIGNvbnNvbGUuZGlyKCdmPScrZik7XG4gICAgaWYoZiA9PT0gMSl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0xlZnQoZml4ZWRSZWN0LHJlY3QpO1xuICAgICAgICAvLyBjb25zb2xlLmRpcihuZXdSZWN0KVxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9Ub3AoZml4ZWRSZWN0LHJlY3QpO1xuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpe1xuICAgICAgICBuZXdSZWN0ID0gUmVjdF9SaWdodChmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZiA9PT0gNCl7XG4gICAgICAgIG5ld1JlY3QgPSBSZWN0X0JvdHRvbShmaXhlZFJlY3QscmVjdCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgb3JkZXIhJylcbiAgICB9XG4gICAgXG4gICAgXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZnVuY3Rpb24gUmVjdF9MZWZ0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6UmVjdGFuZ2xlIHtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggLSByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgeTogZml4ZWRSZWN0LnNoYXBlLnkgKyAoZml4ZWRSZWN0LnNoYXBlLmhlaWdodCAtIHJlY3Quc2hhcGUuaGVpZ2h0KS8yLFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfUmlnaHQoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlKTpSZWN0YW5nbGUge1xuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBmaXhlZFJlY3Quc2hhcGUueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgKGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQgLSByZWN0LnNoYXBlLmhlaWdodCkvMixcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5mdW5jdGlvbiBSZWN0X1RvcChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGZpeGVkUmVjdC5zaGFwZS54ICsgKGZpeGVkUmVjdC5zaGFwZS53aWR0aCAtIHJlY3Quc2hhcGUud2lkdGgpLzIsXG4gICAgICAgICAgICB5OiBmaXhlZFJlY3Quc2hhcGUueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHJlY3Quc2hhcGUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmZ1bmN0aW9uIFJlY3RfQm90dG9tKGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogZml4ZWRSZWN0LnNoYXBlLnggKyAoZml4ZWRSZWN0LnNoYXBlLndpZHRoIC0gcmVjdC5zaGFwZS53aWR0aCkvMixcbiAgICAgICAgICAgIHk6IGZpeGVkUmVjdC5zaGFwZS55ICsgZml4ZWRSZWN0LnNoYXBlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdENlbnRlcihyZWN0OiBSZWN0YW5nbGUpOiBDZW50ZXJ7XG4gICAgLy/ojrflj5bnn6nlvaLkuK3lv4NcbiAgICBsZXQgY2VudGVyID0gbmV3IENlbnRlcihyZWN0KTtcbiAgICByZXR1cm4gY2VudGVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQWxpZ25SZWN0KGZpeGVkUmVjdDogUmVjdGFuZ2xlLHJlY3Q6IFJlY3RhbmdsZSxzaWRlMD86IG51bWJlcnxzdHJpbmcsc2lkZTE/OiBudW1iZXJ8c3RyaW5nKTogUmVjdGFuZ2xle1xuICAgIC8v55+p5b2i5a+56b2QIGZpeGVkUmVjdOWfuuWHhuefqeW9oiByZWN05b6F5a+56b2Q55+p5b2iIGZpeGVkU3R5bGUg5a+56b2Q5b2i5byPXG4gICAgaWYoc2lkZTAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUwID0gMFxuICAgICAgICBzaWRlMSA9IDBcbiAgICB9XG4gICAgaWYoc2lkZTEgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHNpZGUxID0gMFxuICAgIH1cblxuICAgIGlmKHJlY3Quc2hhcGUud2lkdGgqcmVjdC5zaGFwZS5oZWlnaHQgPiBmaXhlZFJlY3Quc2hhcGUud2lkdGgqZml4ZWRSZWN0LnNoYXBlLmhlaWdodCApXG4gICAge1xuICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhVGhlIGFyZWEgb2YgZmlleGVkUmVjdCAgaXMgc21hbGxlciB0aGFuIHRoZSByZWN0IScpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBsZXQgW2YwLGYxXSA9IGp1ZGdlU2lkZShzaWRlMCxzaWRlMSk7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKGYwK1wiIFwiK2YxKTtcbiAgICAgICAgbGV0IG5ld1JlY3QgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgIHNoYXBlOntcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDEwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHMgPSBuZXcgU2lkZVhZKCk7XG4gICAgICAgIGlmKGYwID09PSAwKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMSB8fCBmMSA9PT0gMylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYxKS54O1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjApLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHMueSA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLnk7XG4gICAgICAgICAgICAgICAgcy54ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmKGYwID09PSAxIHx8IGYwID09PSAzKVxuICAgICAgICB7XG4gICAgICAgICAgICBzLnggPSBBbGlnblhZKGZpeGVkUmVjdCxyZWN0LGYwKS54O1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMSkueTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcy55ID0gQWxpZ25YWShmaXhlZFJlY3QscmVjdCxmMCkueTtcbiAgICAgICAgICAgIHMueCA9IEFsaWduWFkoZml4ZWRSZWN0LHJlY3QsZjEpLng7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kaXIocylcbiAgICAgICAgXG4gICAgICAgIG5ld1JlY3Quc2hhcGUueCA9IHMueDtcbiAgICAgICAgbmV3UmVjdC5zaGFwZS55ID0gcy55O1xuICAgICAgICByZXR1cm4gbmV3UmVjdDtcbiAgICB9XG4gICAgXG4gICAgXG59XG5cbmZ1bmN0aW9uIEFsaWduWFkoZml4ZWRSZWN0OiBSZWN0YW5nbGUscmVjdDogUmVjdGFuZ2xlLGY6IG51bWJlcik6IFNpZGVYWXtcbiAgICBsZXQgcyA9IG5ldyBTaWRlWFkoKVxuICAgIGxldCBjZW50ZXIgPSBuZXcgQ2VudGVyKGZpeGVkUmVjdCk7XG4gICAgLy8gY29uc29sZS5kaXIoY2VudGVyKVxuICAgIGlmKGYgPT09IDApXG4gICAgeyAgIFxuICAgICAgICBzLnggPSBjZW50ZXIueCAtIHJlY3Quc2hhcGUud2lkdGgvMlxuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIHJlY3Quc2hhcGUuaGVpZ2h0LzJcbiAgICB9XG4gICAgZWxzZSBpZihmID09PSAxKVxuICAgIHtcbiAgICAgICAgcy54ID0gY2VudGVyLnggLSBmaXhlZFJlY3Quc2hhcGUud2lkdGgvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDIpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSAtIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDMpXG4gICAge1xuICAgICAgICBzLnggPSBjZW50ZXIueCArIGZpeGVkUmVjdC5zaGFwZS53aWR0aC8yIC0gcmVjdC5zaGFwZS53aWR0aFxuICAgIH1cbiAgICBlbHNlIGlmKGYgPT09IDQpXG4gICAge1xuICAgICAgICBzLnkgPSBjZW50ZXIueSArIGZpeGVkUmVjdC5zaGFwZS5oZWlnaHQvMiAtIHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciEgUGxlYXNlIHVzZSB0aGUgcmlnaHQgaW5zdHJ1Y3Rpb24hJylcbiAgICB9XG4gICAgcmV0dXJuIHNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE9mZnNldFJlY3QocmVjdDogUmVjdGFuZ2xlLFt4LHldOiBbbnVtYmVyLG51bWJlcl0pOiBSZWN0YW5nbGV7XG4gICAgLy/nn6nlvaLlubPnp7tcbiAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgIHk6IHksXG4gICAgICAgICAgICB3aWR0aDogcmVjdC5zaGFwZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogcmVjdC5zaGFwZS5oZWlnaHRcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEFycmFuZ2VSZWN0cyhuOiBudW1iZXIsW3hOdW1iZXIseU51bWJlcl06IFtudW1iZXIsbnVtYmVyXSx3aW5kb3dSZWN0OiBSZWN0YW5nbGUsc3R5bGU/OiBudW1iZXIpOiBSZWN0R3JvdXB7XG4gICAgLy/liJvlu7rnn6nlvaLpmLXliJdcbiAgICBsZXQgcmVjdCA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGxldCBudW0gPSB4TnVtYmVyICogeU51bWJlclxuICAgIGxldCB4ID0gd2luZG93UmVjdC5zaGFwZS54XG4gICAgbGV0IHkgPSB3aW5kb3dSZWN0LnNoYXBlLnlcbiAgICBsZXQgd2lkdGggPSB3aW5kb3dSZWN0LnNoYXBlLndpZHRoIC8geE51bWJlclxuICAgIGxldCBoZWlnaHQgPSB3aW5kb3dSZWN0LnNoYXBlLmhlaWdodCAvIHlOdW1iZXJcbiAgICAvLyBjb25zb2xlLmRpcihbeCx5LHdpZHRoLGhlaWdodF0pXG5cbiAgICBpZihuID4gbnVtKXtcbiAgICAgICAgbiA9IG51bVxuICAgIH1cblxuICAgIGlmKHN0eWxlID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdHlsZSA9IDA7XG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPiAxKVxuICAgIHtcbiAgICAgICAgc3R5bGUgPSAwXG4gICAgfVxuXG4gICAgaWYoc3R5bGUgPT09IDApXG4gICAge1xuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB4TnVtYmVyO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBqID0gMDtqIDwgeU51bWJlcjtqKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoaSp4TnVtYmVyK2ogPCBuKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFtpKnhOdW1iZXIral0gPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogeCArIHdpZHRoICogaixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiB5ICsgaGVpZ2h0ICogaSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aWR0aDogd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBoZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IHhOdW1iZXI7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCB5TnVtYmVyO2orKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihpKnhOdW1iZXIraiA8IG4pXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZWN0W2kqeE51bWJlcitqXSA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB4OiB4ICsgd2luZG93UmVjdC5zaGFwZS53aWR0aCAtIHdpZHRoIC0gd2lkdGggKiBqLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkgKyBoZWlnaHQgKiBpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIFxuXG4gICAgLy8gY29uc29sZS5kaXIocmVjdClcblxuICAgIGxldCByZWN0R3JvdXAgPSBuZXcgUmVjdEdyb3VwKHdpbmRvd1JlY3QscmVjdCk7XG4gICAgcmV0dXJuIHJlY3RHcm91cFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2VudGVyUmVjdChmaXhlZFJlY3Q6IFJlY3RhbmdsZSxyZWN0OiBSZWN0YW5nbGUpOiBSZWN0YW5nbGV7XG4gICAgLy/np7vliqjnn6nlvaLoh7Pmn5Dnn6nlvaLkuK3lv4MgZml4ZWRSZWN05Z+65YeG55+p5b2iIHJlY3TlvoXmk43kvZznn6nlvaIgZml4ZWRTdHlsZSDmi7zmjqXlvaLlvI9cbiAgICBsZXQgbmV3UmVjdCA9IEFsaWduUmVjdChmaXhlZFJlY3QscmVjdCwwLDApO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDZW50ZXJSZWN0T25Qb2ludChyZWN0OiBSZWN0YW5nbGUsW3gseV06IFtudW1iZXIsbnVtYmVyXSk6IFJlY3RhbmdsZXtcbiAgICBsZXQgbmV3UmVjdCA9IE9mZnNldFJlY3QocmVjdCxbeCx5XSlcbiAgICByZXR1cm4gbmV3UmVjdFxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdFdpZHRoKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICAvL+iOt+WPluefqeW9ouWuveW6plxuICAgIGxldCB3aWR0aCA9IHJlY3Quc2hhcGUud2lkdGhcbiAgICByZXR1cm4gd2lkdGhcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RIZWlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIC8v6I635Y+W55+p5b2i6auY5bqmXG4gICAgbGV0IGhlaWdodCA9IHJlY3Quc2hhcGUuaGVpZ2h0XG4gICAgcmV0dXJuIGhlaWdodDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RTaXplKHJlY3Q6IFJlY3RhbmdsZSk6IFNpemV7XG4gICAgLy/ojrflj5bnn6nlvaLlrr3pq5hcbiAgICBsZXQgc2l6ZSA9IG5ldyBTaXplKHJlY3QpXG4gICAgcmV0dXJuIHNpemU7XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBDbGlwUmVjdChyZWN0MDogUmVjdGFuZ2xlLHJlY3QxOiBSZWN0YW5nbGUpOiBjbGlwUmVjdHtcbi8vICAgICAvL+efqeW9oumHjeWPoOWMuuWfn1xuLy8gICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3QwLnNoYXBlLngscmVjdDAuc2hhcGUueSxyZWN0MC5zaGFwZS53aWR0aCxyZWN0MC5zaGFwZS5oZWlnaHRdXG4vLyAgICAgbGV0IFt4MSx5MSx3MSxoMV0gPSBbcmVjdDEuc2hhcGUueCxyZWN0MS5zaGFwZS55LHJlY3QxLnNoYXBlLndpZHRoLHJlY3QxLnNoYXBlLmhlaWdodF1cbi8vICAgICBsZXQgUmVjdCx4bix5bix3bixobjtcbi8vICAgICBsZXQgYXJlYTAgPSB3MCAqIGgwO1xuLy8gICAgIGxldCBhcmVhMSA9IHcxICogaDE7XG4vLyAgICAgbGV0IHgseSx3LGhcbi8vICAgICBsZXQgeHQseXQsd3QsaHQscmVjdFxuLy8gICAgIGlmKGFyZWEwID49IGFyZWExKVxuLy8gICAgIHtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gxLHkxLHcxLGgxXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MCx5MCx3MCxoMF07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MDtcbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgW3gseSx3LGhdID0gW3gwLHkwLHcwLGgwXTtcbi8vICAgICAgICAgW3h0LHl0LHd0LGh0XSA9IFt4MSx5MSx3MSxoMV07XG4vLyAgICAgICAgIHJlY3QgPSByZWN0MTtcbi8vICAgICB9XG4vLyAgICAgY29uc29sZS5kaXIoW3gseSx3LGhdKTtcbi8vICAgICBjb25zb2xlLmRpcihbeHQseXQsd3QsaHRdKVxuLy8gICAgIGlmKCFJc0luUmVjdChbeCx5XSxyZWN0KSAmJiAhSXNJblJlY3QoW3grdyx5K2hdLHJlY3QpICYmICFJc0luUmVjdChbeCt3LHldLHJlY3QpICYmICFJc0luUmVjdChbeCx5K2hdLHJlY3QpKXtcbi8vICAgICAgICAgUmVjdCA9IFswLDAsMCwwXVxuLy8gICAgIH1cbi8vICAgICBlbHNle1xuLy8gICAgICAgICB3biA9IE1hdGguYWJzKE1hdGgubWluKHgwICsgdzAgLHgxICsgdzEpIC0gTWF0aC5tYXgoeDAsIHgxKSlcbi8vICAgICAgICAgaG4gPSBNYXRoLmFicyhNYXRoLm1pbih5MCArIGgwLCB5MSArIGgxKSAtIE1hdGgubWF4KHkwLCB5MSkpXG4vLyAgICAgICAgIGlmKElzSW5SZWN0KFt4LHldLHJlY3QpKXtcbi8vICAgICAgICAgICAgIHhuID0geDtcbi8vICAgICAgICAgICAgIHluID0geTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBlbHNlIGlmKCh4ID49IHh0ICYmIHg8PXh0K3d0KSAmJiAoeSA8IHl0IHx8IHkgPiB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4O1xuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobik7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZSBpZigoeCA8IHh0IHx8IHggPiB4dCt3dCkgJiYgKHkgPj0geXQgJiYgeSA8PSB5dCtodCkpe1xuLy8gICAgICAgICAgICAgeG4gPSB4ICsgKHcgLSB3bilcbi8vICAgICAgICAgICAgIHluID0geVxuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGVsc2V7XG4vLyAgICAgICAgICAgICB4biA9IHggKyAodyAtIHduKVxuLy8gICAgICAgICAgICAgeW4gPSB5ICsgKGggLSBobilcbi8vICAgICAgICAgfVxuICAgICAgICBcbi8vICAgICAgICAgUmVjdCA9IFt4bix5bix3bixobl07XG4gICAgICAgIFxuLy8gICAgIH1cblxuLy8gICAgIGxldCBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4vLyAgICAgcmV0dXJuIG5ld1JlY3Q7XG5cbi8vIH1cblxuZXhwb3J0IGZ1bmN0aW9uIENsaXBSZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IGNsaXBSZWN0e1xuICAgIC8v55+p5b2i6YeN5Y+g5Yy65Z+fXG4gICAgbGV0IG5ld1JlY3QsUmVjdFxuICAgIGxldCB4bDAseHIwLHl0MCx5YjA7XG4gICAgbGV0IHhsMSx4cjEseXQxLHliMTtcbiAgICBsZXQgeCx5LHcsaFxuICAgIFt4bDAseHIwLHl0MCx5YjBdID0gW1JlY3RMZWZ0KHJlY3QwKSxSZWN0UmlnaHQocmVjdDApLFJlY3RUb3AocmVjdDApLFJlY3RCb3RvbShyZWN0MCldO1xuICAgIFt4bDEseHIxLHl0MSx5YjFdID0gW1JlY3RMZWZ0KHJlY3QxKSxSZWN0UmlnaHQocmVjdDEpLFJlY3RUb3AocmVjdDEpLFJlY3RCb3RvbShyZWN0MSldO1xuICAgIGlmKElzSW5SZWN0KFt4bDAseXQwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hyMCx5dDBdLHJlY3QxKSB8fCBJc0luUmVjdChbeGwwLHliMF0scmVjdDEpIHx8IElzSW5SZWN0KFt4cjAseWIwXSxyZWN0MSkgfHwgSXNJblJlY3QoW3hsMSx5dDFdLHJlY3QwKSB8fCBJc0luUmVjdChbeHIxLHl0MV0scmVjdDApIHx8IElzSW5SZWN0KFt4bDEseWIxXSxyZWN0MCkgfHwgSXNJblJlY3QoW3hyMSx5YjFdLHJlY3QwKSlcbiAgICB7XG4gICAgICAgIHggPSBNYXRoLm1heCh4bDAseGwxKTtcbiAgICAgICAgeSA9IE1hdGgubWF4KHl0MCx5dDEpO1xuICAgICAgICB3ID0gTWF0aC5taW4oeHIwLHhyMSkgLSB4O1xuICAgICAgICBoID0gTWF0aC5taW4oeWIwLHliMSkgLSB5O1xuICAgICAgICBSZWN0ID0gW3gseSx3LGhdXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIFJlY3QgPSBbMCwwLDAsMF1cbiAgICB9XG5cbiAgICBuZXdSZWN0ID0gbmV3IGNsaXBSZWN0KFJlY3QscmVjdDAscmVjdDEpO1xuXG4gICAgcmV0dXJuIG5ld1JlY3Q7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzSW5SZWN0KFt4LHldOiBbbnVtYmVyLG51bWJlcl0scmVjdDogUmVjdGFuZ2xlKTogYm9vbGVhbntcbiAgICAvL+WIpOaWreeCueaYr+WQpuWcqOefqeW9ouWGhVxuICAgIGxldCBbeDAseTAsdzAsaDBdID0gW3JlY3Quc2hhcGUueCxyZWN0LnNoYXBlLnkscmVjdC5zaGFwZS53aWR0aCxyZWN0LnNoYXBlLmhlaWdodF1cbiAgICBpZih4ID49IHgwICYmIHg8PXgwK3cwICYmIHkgPj0geTAgJiYgeSA8PSB5MCtoMClcbiAgICB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gR3Jvd1JlY3QoZWw6IFJlY3RhbmdsZS8qfFJlY3RHcm91cHxHcm91cCovLGg6IG51bWJlcix2OiBudW1iZXIpOiBSZWN0YW5nbGV7XG4gICAgLy/mraPmlL7otJ/nvKkgXG4gICAgLy8gaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgLy8ge1xuICAgICAgICBsZXQgbmV3UmVjdCA9IG5ldyBSZWN0YW5nbGUoe1xuICAgICAgICAgICAgc2hhcGU6e1xuICAgICAgICAgICAgICAgIHg6ZWwuc2hhcGUueCAtIGgsXG4gICAgICAgICAgICAgICAgeTplbC5zaGFwZS53aWR0aCArIDIqaCxcbiAgICAgICAgICAgICAgICB3aWR0aDplbC5zaGFwZS55IC0gdixcbiAgICAgICAgICAgICAgICBoZWlnaHQ6ZWwuc2hhcGUuaGVpZ2h0ICsgMip2XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIHJldHVybiBuZXdSZWN0XG4gICAgICAgIFxuICAgIC8vIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUmVjdEdyb3VwKVxuICAgIC8vIHtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUueCAtPSBoO1xuICAgIC8vICAgICBlbC5QYXJlbnRzUmVjdC5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgIGVsLlBhcmVudHNSZWN0LnNoYXBlLnkgLT0gdjtcbiAgICAvLyAgICAgZWwuUGFyZW50c1JlY3Quc2hhcGUuaGVpZ2h0ICs9IDIqdjtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLnggLT0gaDtcbiAgICAvLyAgICAgICAgIGVsLmdyb3VwTGlzdFtpXS5zaGFwZS53aWR0aCArPSAyKmg7XG4gICAgLy8gICAgICAgICBlbC5ncm91cExpc3RbaV0uc2hhcGUueSAtPSB2O1xuICAgIC8vICAgICAgICAgZWwuZ3JvdXBMaXN0W2ldLnNoYXBlLmhlaWdodCArPSAyKnY7XG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgY29uc29sZS5kaXIoXCLnsbvlnovplJnor69cIilcbiAgICAvLyB9XG59ICAgICAgIFxuXG5leHBvcnQgZnVuY3Rpb24gSW5zZXRSZWN0KGVsOiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+ato+e8qei0n+aUvlxuICAgIGxldCBuZXdSZWN0ID0gbmV3IFJlY3RhbmdsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OmVsLnNoYXBlLnggKz0gaCxcbiAgICAgICAgICAgIHk6ZWwuc2hhcGUud2lkdGggLT0gMipoLFxuICAgICAgICAgICAgd2lkdGg6ZWwuc2hhcGUueSArPSB2LFxuICAgICAgICAgICAgaGVpZ2h0OmVsLnNoYXBlLmhlaWdodCAtPSAyKnZcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFNjYWxlUmVjdChyZWN0OiBSZWN0YW5nbGUsaDogbnVtYmVyLHY6IG51bWJlcik6IFJlY3RhbmdsZXtcbiAgICAvL+avlOS+i+e8qeaUvlxuICAgIGxldCBoMCA9IHJlY3Quc2hhcGUud2lkdGggKiAoaC0xKSAvIDJcbiAgICBsZXQgdjAgPSByZWN0LnNoYXBlLmhlaWdodCAqICh2LTEpIC8gMlxuICAgIGNvbnNvbGUuZGlyKGgwKycgJyt2MClcbiAgICBsZXQgbmV3UmVjdCA9IEdyb3dSZWN0KHJlY3QsaDAsdjApXG4gICAgcmV0dXJuIG5ld1JlY3Rcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIElzRW1wdHlSZWN0KHJlY3Q6IFJlY3RhbmdsZSk6IGJvb2xlYW57XG4gICAgLy/liKTmlq3nn6npmLXmmK/lkKbkuLrnqbpcbiAgICBsZXQgYXJlYSA9IHJlY3Quc2hhcGUud2lkdGggKiByZWN0LnNoYXBlLmhlaWdodDtcbiAgICBpZihhcmVhID09PSAwKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gUmVjdE9mTWF0cml4KCl7XG5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlY3RMZWZ0KHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS54XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0UmlnaHQocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnggKyByZWN0LnNoYXBlLndpZHRoXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0VG9wKHJlY3Q6IFJlY3RhbmdsZSk6IG51bWJlcntcbiAgICByZXR1cm4gcmVjdC5zaGFwZS55XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZWN0Qm90b20ocmVjdDogUmVjdGFuZ2xlKTogbnVtYmVye1xuICAgIHJldHVybiByZWN0LnNoYXBlLnkgKyByZWN0LnNoYXBlLmhlaWdodFxufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5pb25SZWN0KHJlY3QwOiBSZWN0YW5nbGUscmVjdDE6IFJlY3RhbmdsZSk6IHVuaW9uUmVjdHtcbiAgICBsZXQgbmV3UmVjdDtcbiAgICBsZXQgeGwwLHhyMCx5dDAseWIwO1xuICAgIGxldCB4bDEseHIxLHl0MSx5YjE7XG4gICAgbGV0IHgseSx3LGhcbiAgICBbeGwwLHhyMCx5dDAseWIwXSA9IFtSZWN0TGVmdChyZWN0MCksUmVjdFJpZ2h0KHJlY3QwKSxSZWN0VG9wKHJlY3QwKSxSZWN0Qm90b20ocmVjdDApXTtcbiAgICBbeGwxLHhyMSx5dDEseWIxXSA9IFtSZWN0TGVmdChyZWN0MSksUmVjdFJpZ2h0KHJlY3QxKSxSZWN0VG9wKHJlY3QxKSxSZWN0Qm90b20ocmVjdDEpXTtcbiAgICB4ID0gTWF0aC5taW4oeGwwLHhsMSk7XG4gICAgeSA9IE1hdGgubWluKHl0MCx5dDEpO1xuICAgIHcgPSBNYXRoLm1heCh4cjAseHIxKSAtIHg7XG4gICAgaCA9IE1hdGgubWF4KHliMCx5YjEpIC0geTtcbiAgICBuZXdSZWN0ID0gbmV3IHVuaW9uUmVjdChbeCx5LHcsaF0scmVjdDAscmVjdDEpO1xuICAgIHJldHVybiBuZXdSZWN0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUmVjdChyZWN0OiBSZWN0YW5nbGUsZmlsbD86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihmaWxsID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGZpbGwgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgZmlsbCA9ICcjMDAwJ1xuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgZmlsbDogZmlsbFxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEZyYW1lUmVjdChyZWN0OiBSZWN0YW5nbGUsbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFJlY3RhbmdsZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgcmVjdDAgPSBuZXcgUmVjdGFuZ2xlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IHJlY3Quc2hhcGUueCxcbiAgICAgICAgICAgIHk6IHJlY3Quc2hhcGUueSxcbiAgICAgICAgICAgIHdpZHRoOiByZWN0LnNoYXBlLndpZHRoLFxuICAgICAgICAgICAgaGVpZ2h0OiByZWN0LnNoYXBlLmhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gcmVjdDBcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsganVkZ2VTdHlsZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIENpcmNsZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIENpcmNsZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBDaXJjbGVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBDaXJjbGUgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImNpcmNsZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGRlY2xhcmUgc2hhcGU6IENpcmNsZVNoYXBlXG4gICAgY29uc3RydWN0b3Iob3B0czogQ2lyY2xlT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VDaXJjbGUoY2lyY2xlOiBDaXJjbGUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBDaXJjbGV7XG4gICAgbGV0IHNoID0gY2lyY2xlLnNoYXBlXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGp1ZGdlVFJTKGNpcmNsZSlcbiAgICBjdHguYXJjKHNoLngsc2gueSxzaC5yLDAsMipNYXRoLlBJKTtcbiAgICBqdWRnZVN0eWxlKGNpcmNsZSxjdHgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gY2lyY2xlO1xufSBcblxuZXhwb3J0IGZ1bmN0aW9uIERyYXdEb3RzKFt4LHkscl06IFtudW1iZXIsbnVtYmVyLG51bWJlcl0sY29sb3I6IHN0cmluZyk6IENpcmNsZXtcbiAgICBsZXQgY2lyY2xlID0gbmV3IENpcmNsZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiB4LFxuICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgIHI6IHJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlIDogJ25vbmUnXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBjaXJjbGVcbn0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgTGluZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICB4RW5kOiBudW1iZXIsXG4gICAgeUVuZDogbnVtYmVyXG59XG5cbmludGVyZmFjZSBMaW5lT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IExpbmVTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBMaW5lIGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJsaW5lXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogTGluZU9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBjbGFzcyBsaW5le1xuLy8gICAgIG1ha2VMaW5lKGxpbmU6IExpbmUsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBMaW5le1xuLy8gICAgICAgICBsZXQgbCA9IHRoaXMubWFrZUxpbmUobGluZSxjdHgpO1xuLy8gICAgICAgICByZXR1cm4gbDtcbi8vICAgICB9XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlTGluZShsaW5lOiBMaW5lLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogTGluZXtcbiAgICBsZXQgc2ggPSBsaW5lLnNoYXBlO1xuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBqdWRnZVRSUyhsaW5lKVxuICAgIGN0eC5tb3ZlVG8oc2gueCxzaC55KVxuICAgIGN0eC5saW5lVG8oc2gueEVuZCxzaC55RW5kKVxuICAgIGp1ZGdlU3R5bGUobGluZSxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBsaW5lXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TGluZXMoZWw6IExpbmVbXXxHcm91cFtdfEdyb3VwKTogR3JvdXB7XG4gICAgLy/nu5jliLblpJrmnaHnur8gb3B0czrnur/mnaHlsZ7mgKdcbiAgICBsZXQgZ3JvdXAgPSBuZXcgR3JvdXAoZWwpXG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBEcmF3TWxpbmUoW3gseSx4RW5kLHlFbmRdOiBbbnVtYmVyLG51bWJlcixudW1iZXIsbnVtYmVyXSxnYXA/OiBudW1iZXJbXSxzdHlsZT86IGJvb2xlYW4sc3RpcHBsZT86IGJvb2xlYW4sd2lkdGhHYXA/OiBudW1iZXIpOkdyb3Vwe1xuICAgIC8v57uY5Yi25bmz6KGM57q/IFt4LHkseEVuZCx5RW5kXeWIneWni+e6v+eahOS4pOerr+WdkOaghyBnYXDnur/kuYvpl7TnmoTpl7TpmpQgc3R5bGU9ZmFsc2XkuLrmsLTlubPlubPooYwsPXRydWXkuLrnq5bnm7TlubPooYwgc3RpcHBsZT1mYWxzZeS4uuWunue6vyw9dHJ1ZeS4uuiZmue6v1xuICAgIGlmKHdpZHRoR2FwID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHdpZHRoR2FwICE9PSAnbnVtYmVyJylcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gMTA7XG4gICAgICAgIGlmKHN0aXBwbGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3RpcHBsZSAhPT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdGlwcGxlID09PSBmYWxzZVxuICAgICAgICAgICAgaWYoc3R5bGUgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3R5bGUgIT09ICdib29sZWFuJyl7XG4gICAgICAgICAgICAgICAgc3R5bGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZihnYXAgPT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICAgICAgICAgIGdhcCA9IFsxMDAsMTAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBsZXQgb3B0cyA9IG5ldyBBcnJheSgpO1xuICAgIFxuICAgIGlmKHN0aXBwbGUgPT09IGZhbHNlKVxuICAgIHtcbiAgICAgICAgb3B0c1swXSA9IG5ldyBMaW5lICh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICB4RW5kOiB4RW5kLFxuICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgaWYoc3R5bGUgPT09IGZhbHNlKVxuICAgICAgICB7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAxO2kgPCBnYXAubGVuZ3RoKzE7aSsrKXtcbiAgICAgICAgICAgICAgICBvcHRzW2ldID0gbmV3IExpbmUoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHk6IHkrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQsXG4gICAgICAgICAgICAgICAgICAgICAgICB5RW5kOiB5RW5kK2dhcFtpLTFdKmlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IGdhcC5sZW5ndGgrMTtpKyspe1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBuZXcgTGluZSAoe1xuICAgICAgICAgICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDogeCtnYXBbaS0xXSppLFxuICAgICAgICAgICAgICAgICAgICAgICAgeTogeSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHhFbmQ6IHhFbmQrZ2FwW2ktMV0qaSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHlFbmQ6IHlFbmRcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgb3B0c1swXSA9IExpbmVTdGlwcGxlKFt4LHkseEVuZCx5RW5kXSx3aWR0aEdhcCk7XG4gICAgICAgIGlmKHN0eWxlID09PSBmYWxzZSlcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMTtpPGdhcC5sZW5ndGgrMTtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgb3B0c1tpXSA9IExpbmVTdGlwcGxlKFt4LHkrZ2FwW2ktMV0qaSx4RW5kLHlFbmQrZ2FwW2ktMV0qaV0sd2lkdGhHYXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDE7aTxnYXAubGVuZ3RoKzE7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG9wdHNbaV0gPSBMaW5lU3RpcHBsZShbeCtnYXBbaS0xXSppLHkseEVuZCtnYXBbaS0xXSppLHlFbmRdLHdpZHRoR2FwKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgICAgICBcbiAgICBcbiAgICBsZXQgZ3JvdXAgPSBEcmF3TGluZXMob3B0cyk7XG4gICAgcmV0dXJuIGdyb3VwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBMaW5lU3RpcHBsZShbeCx5LHhFbmQseUVuZF06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLHdpZHRoR2FwPzogbnVtYmVyKTpHcm91cHtcbiAgICAvL+e7mOWItuW5s+ihjOe6vyBbeCx5LHhFbmQseUVuZF3liJ3lp4vnur/nmoTkuKTnq6/lnZDmoIcgd2lkdGhHYXDpl7TpmpQgXG4gICAgbGV0IGxpbmVsZW5ndGggPSBNYXRoLnNxcnQoTWF0aC5wb3coeEVuZC14LDIpK01hdGgucG93KHlFbmQteSwyKSlcbiAgICBpZih3aWR0aEdhcD5saW5lbGVuZ3RofHx3aWR0aEdhcD09PXVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIHdpZHRoR2FwID0gbGluZWxlbmd0aC8xMDtcbiAgICB9XG4gICAgbGV0IG51bSA9IE1hdGguZmxvb3IobGluZWxlbmd0aC93aWR0aEdhcClcbiAgICBsZXQgeGcgPSB3aWR0aEdhcCooeEVuZC14KS9saW5lbGVuZ3RoXG4gICAgbGV0IHlnID0gd2lkdGhHYXAqKHlFbmQteSkvbGluZWxlbmd0aFxuICAgIC8vIGNvbnNvbGUuZGlyKG51bSlcbiAgICBsZXQgaSA9IDA7XG4gICAgbGV0IGxpbmUgPSBuZXcgQXJyYXkoKTtcbiAgICB3aGlsZShpPG51bSlcbiAgICB7XG4gICAgICAgIGxpbmVbaV0gPSBuZXcgTGluZSh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgreGcqaSxcbiAgICAgICAgICAgICAgICB5OiB5K3lnKmksXG4gICAgICAgICAgICAgICAgeEVuZDogeCt4ZyooaSsxKSxcbiAgICAgICAgICAgICAgICB5RW5kOiB5K3lnKihpKzEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGkrPTI7XG4gICAgfVxuICAgIGxldCBMaW5lU3RpcHBsZSA9IG5ldyBHcm91cChsaW5lKVxuICAgIHJldHVybiBMaW5lU3RpcHBsZVxufVxuXG4vLyBleHBvcnQgY2xhc3MgUG9seSBleHRlbmRzIEdyb3Vwe1xuLy8gICAgIHN0eWxlOiBTdHlsZVxuLy8gICAgIGNvbnN0cnVjdG9yKGVsOiBMaW5lW118R3JvdXBbXXxHcm91cCxzdHlsZT86IFN0eWxlKXtcbi8vICAgICAgICAgc3VwZXIoZWwpXG4vLyAgICAgICAgIGlmKHN0eWxlKVxuLy8gICAgICAgICB7XG4vLyAgICAgICAgICAgICB0aGlzLnN0eWxlID0gc3R5bGU7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgZWxzZXtcbi8vICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4vLyAgICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4vLyAgICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbi8vICAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDFcbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfVxuLy8gICAgIH1cbi8vIH0iLCJpbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuLi9Hcm91cC9ncm91cCc7XG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgQXJjU2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBhbmdfZjogbnVtYmVyLFxuICAgIGFuZ19lOiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIEFyY09wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBBcmNTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBBcmMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcImFyY1wiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEFyY09wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eFxuICAgICAgICAvLyBjb25zb2xlLmRpcihvcHRzLnN0eWxlKVxuICAgICAgICBpZihvcHRzLnN0eWxlKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb3B0cy5zdHlsZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBcIm5vbmVcIixcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzAwMFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogMlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbmFtZUlkKytcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogQXJje1xuICAgIGxldCBzdCA9IGFyYy5zdHlsZVxuICAgIGlmKHN0LmZpbGwgPT09IHVuZGVmaW5lZCB8fCBzdC5maWxsID09PSAnbm9uZScgfHwgc3QuZmlsbCA9PT0gJyNmZmYnKVxuICAgIHtcbiAgICAgICAgbWFrZUZyYW1lQXJjKGFyYyxjdHgpO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBtYWtlRmlsbEFyYyhhcmMsY3R4KTtcbiAgICB9XG4gICAgcmV0dXJuIGFyYztcbn1cblxuZnVuY3Rpb24gbWFrZUZyYW1lQXJjKGFyYzogQXJjLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBhcmMuc2hhcGVcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAganVkZ2VUUlMoYXJjKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIGN0eC5jbG9zZVBhdGgoKVxufVxuXG5mdW5jdGlvbiBtYWtlRmlsbEFyYyhhcmM6IEFyYyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHNoID0gYXJjLnNoYXBlXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgY3R4Lm1vdmVUbyhzaC54LHNoLnkpXG4gICAgY3R4LmxpbmVUbyhzaC54K3NoLnIqTWF0aC5jb3Moc2guYW5nX2YpLHNoLnkrc2gucipNYXRoLnNpbihzaC5hbmdfZikpO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IFwiI2ZmZlwiXG4gICAgY3R4LnN0cm9rZSgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG5cbiAgICAvLyBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgubW92ZVRvKHNoLngsc2gueSlcbiAgICBjdHgubGluZVRvKHNoLngrc2gucipNYXRoLmNvcyhzaC5hbmdfZSksc2gueStzaC5yKk1hdGguc2luKHNoLmFuZ19lKSk7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gXCIjZmZmXCJcbiAgICBjdHguc3Ryb2tlKClcbiAgICBjdHguY2xvc2VQYXRoKClcblxuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC5hcmMoc2gueCxzaC55LHNoLnIsc2guYW5nX2Ysc2guYW5nX2UpO1xuICAgIGp1ZGdlU3R5bGUoYXJjLGN0eCk7XG4gICAgXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZUFyYyhhcmM6IEFyYyxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogQXJje1xuICAgIC8v55S757KX57q/5bynIFxuICAgIGlmKHN0cm9rZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBzdHJva2UgIT09ICdzdHJpbmcnKVxuICAgIHtcbiAgICAgICAgc3Ryb2tlID0gJyMwMDAnXG4gICAgICAgIGlmKGxpbmVXaWR0aCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBsaW5lV2lkdGggIT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaW5lV2lkdGggPSA1O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgLy8ganVkZ2VTdHlsZV9lenN5KGFyYylcblxuICAgIGxldCBhcmMwID0gbmV3IEFyYyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBhcmMuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGFyYy5zaGFwZS55LFxuICAgICAgICAgICAgcjogYXJjLnNoYXBlLnIsXG4gICAgICAgICAgICBhbmdfZjogYXJjLnNoYXBlLmFuZ19mLFxuICAgICAgICAgICAgYW5nX2U6IGFyYy5zaGFwZS5hbmdfZVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgbGluZVdpZHRoOiBsaW5lV2lkdGgsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZVxuICAgICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBhcmMwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsQXJjKGFyYzogQXJjLGZpbGw/OiBzdHJpbmcpOiBBcmN7XG4gICAgaWYoZmlsbCA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiBmaWxsICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIGZpbGwgPSAnIzAwMCdcbiAgICB9XG5cbiAgICBsZXQgYXJjMCA9IG5ldyBBcmMoe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeDogYXJjLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBhcmMuc2hhcGUueSxcbiAgICAgICAgICAgIHI6IGFyYy5zaGFwZS5yLFxuICAgICAgICAgICAgYW5nX2Y6IGFyYy5zaGFwZS5hbmdfZixcbiAgICAgICAgICAgIGFuZ19lOiBhcmMuc2hhcGUuYW5nX2VcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gYXJjMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgRWxsaXBzZVNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeD86IG51bWJlcixcbiAgICB5PzogbnVtYmVyLFxuICAgIHJhPzogbnVtYmVyLFxuICAgIHJiPzogbnVtYmVyXG4gICAgLy9yYeS4uuaoquWNiui9tOmVvyByYuS4uue6teWNiui9tOmVv1xufVxuXG5pbnRlcmZhY2UgRWxsaXBzZU9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBFbGxpcHNlU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgRWxsaXBzZSBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiZWxsaXBzZVwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKG9wdHM6IEVsbGlwc2VPcHRzKXtcbiAgICAgICAgc3VwZXIoKVxuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgdGhpcy5jdHggPSBzdXBlci5jdHhcbiAgICAgICAgLy8gY29uc29sZS5kaXIob3B0cy5zdHlsZSlcbiAgICAgICAgaWYob3B0cy5zdHlsZSlcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBcIiMwMDBcIixcbiAgICAgICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUVsbGlwc2UoZWxsaXBzZTogRWxsaXBzZSxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEVsbGlwc2V7XG4gICAgLy9tYXjmmK/nrYnkuo4x6Zmk5Lul6ZW/6L205YC877yM5Y2zYeWSjGLkuK3nmoTovoPlpKfogIVcbiAgICAvL2nmr4/mrKHlvqrnjq/lop7liqAxL21heO+8jOihqOekuuW6puaVsOeahOWinuWKoFxuICAgIC8v6L+Z5qC35Y+v5Lul5L2/5b6X5q+P5qyh5b6q546v5omA57uY5Yi255qE6Lev5b6E77yI5byn57q/77yJ5o6l6L+RMeWDj+e0oFxuICAgIGxldCBzaCA9IGVsbGlwc2Uuc2hhcGVcbiAgICBsZXQgc3RlcCA9IChzaC5yYSA+IHNoLnJiKSA/IDEgLyBzaC5yYSA6IDEgLyBzaC5yYjtcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGp1ZGdlVFJTKGVsbGlwc2UpO1xuICAgIGN0eC5tb3ZlVG8oc2gueCArIHNoLnJhLCBzaC55KTsgLy/ku47mpK3lnIbnmoTlt6bnq6/ngrnlvIDlp4vnu5jliLZcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDIgKiBNYXRoLlBJOyBpICs9IHN0ZXApXG4gICAge1xuICAgICAgICAvL+WPguaVsOaWueeoi+S4unggPSBhICogY29zKGkpLCB5ID0gYiAqIHNpbihpKe+8jFxuICAgICAgICAvL+WPguaVsOS4umnvvIzooajnpLrluqbmlbDvvIjlvKfluqbvvIlcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54ICsgc2gucmEgKiBNYXRoLmNvcyhpKSwgc2gueSArIHNoLnJiICogTWF0aC5zaW4oaSkpO1xuICAgIH1cbiAgICBqdWRnZVN0eWxlKGVsbGlwc2UsY3R4KTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgY3R4LnJlc3RvcmUoKVxuICAgIHJldHVybiBlbGxpcHNlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsT3ZhbChlbGxpcHNlOiBFbGxpcHNlLGZpbGw/OiBzdHJpbmcpOiBFbGxpcHNle1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBlbGxpcHNlMCA9IG5ldyBFbGxpcHNlKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHg6IGVsbGlwc2Uuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGVsbGlwc2Uuc2hhcGUueSxcbiAgICAgICAgICAgIHJhOiBlbGxpcHNlLnNoYXBlLnJhLFxuICAgICAgICAgICAgcmI6IGVsbGlwc2Uuc2hhcGUucmJcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGVsbGlwc2UwXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGcmFtZU92YWwoZWxsaXBzZTogRWxsaXBzZSxsaW5lV2lkdGg/OiBudW1iZXIsc3Ryb2tlPzogc3RyaW5nKTogRWxsaXBzZXtcbiAgICBpZihzdHJva2UgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2Ygc3Ryb2tlICE9PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHN0cm9rZSA9ICcjMDAwJ1xuICAgICAgICBpZihsaW5lV2lkdGggPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgbGluZVdpZHRoICE9PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgbGluZVdpZHRoID0gNTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZWxsaXBzZTAgPSBuZXcgRWxsaXBzZSh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICB4OiBlbGxpcHNlLnNoYXBlLngsXG4gICAgICAgICAgICB5OiBlbGxpcHNlLnNoYXBlLnksXG4gICAgICAgICAgICByYTogZWxsaXBzZS5zaGFwZS5yYSxcbiAgICAgICAgICAgIHJiOiBlbGxpcHNlLnNoYXBlLnJiXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBsaW5lV2lkdGg6IGxpbmVXaWR0aCxcbiAgICAgICAgICAgIHN0cm9rZTogc3Ryb2tlXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBlbGxpcHNlMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgUG9seWdvblNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4QTogbnVtYmVyW11cbiAgICB5QTogbnVtYmVyW11cbn1cblxuaW50ZXJmYWNlIFBvbHlnb25PcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogUG9seWdvblNoYXBlXG4gICAgc3R5bGU/OiBTdHlsZVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIFBvbHlnb24gZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInBvbHlnb25cIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBQb2x5Z29uT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwibm9uZVwiLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogXCIjMDAwXCIsXG4gICAgICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VQb2x5Z29uKHBvbHlnb246IFBvbHlnb24sY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBQb2x5Z29ue1xuICAgIGxldCBzaCA9IHBvbHlnb24uc2hhcGVcbiAgICBsZXQgbnVtID0gMDtcbiAgICBpZihzaC54QS5sZW5ndGggIT09IHNoLnlBLmxlbmd0aClcbiAgICB7XG4gICAgICAgIG51bSA9IE1hdGgubWluKHNoLnhBLmxlbmd0aCxzaC55QS5sZW5ndGgpXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIG51bSA9IHNoLnhBLmxlbmd0aFxuICAgIH1cbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8ganVkZ2VUUlMocG9seWdvbikgXG4gICAgY3R4Lm1vdmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKVxuICAgIHtcbiAgICAgICAgY3R4LmxpbmVUbyhzaC54QVtpXSxzaC55QVtpXSlcbiAgICB9XG4gICAgY3R4LmxpbmVUbyhzaC54QVswXSxzaC55QVswXSlcbiAgICBqdWRnZVN0eWxlKHBvbHlnb24sY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gcG9seWdvblxufVxuXG5leHBvcnQgZnVuY3Rpb24gRnJhbWVQb2x5KHBvbHlnb246IFBvbHlnb24sbGluZVdpZHRoPzogbnVtYmVyLHN0cm9rZT86IHN0cmluZyk6IFBvbHlnb257XG4gICAgaWYoc3Ryb2tlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHN0cm9rZSAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBzdHJva2UgPSAnIzAwMCdcbiAgICAgICAgaWYobGluZVdpZHRoID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIGxpbmVXaWR0aCAhPT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHBvbHlnb24wID0gbmV3IFBvbHlnb24oe1xuICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgeEE6IHBvbHlnb24uc2hhcGUueEEsXG4gICAgICAgICAgICB5QTogcG9seWdvbi5zaGFwZS55QSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIGxpbmVXaWR0aDogbGluZVdpZHRoLFxuICAgICAgICAgICAgc3Ryb2tlOiBzdHJva2VcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHBvbHlnb24wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBGaWxsUG9seShwb2x5Z29uOiBQb2x5Z29uLGZpbGw/OiBzdHJpbmcpOiBQb2x5Z29ue1xuICAgIGlmKGZpbGwgPT09IHVuZGVmaW5lZCB8fCB0eXBlb2YgZmlsbCAhPT0gJ3N0cmluZycpXG4gICAge1xuICAgICAgICBmaWxsID0gJyMwMDAnXG4gICAgfVxuICAgIGxldCBwb2x5Z29uMCA9IG5ldyBQb2x5Z29uKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHhBOiBwb2x5Z29uLnNoYXBlLnhBLFxuICAgICAgICAgICAgeUE6IHBvbHlnb24uc2hhcGUueUEsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICBmaWxsOiBmaWxsXG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBwb2x5Z29uMFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBqdWRnZVN0eWxlX3RleHQsIGp1ZGdlVGV4dFN0eWxlLCBqdWRnZVRSUyB9IGZyb20gJy4uL0p1ZGdlL2p1ZGdlJ1xuXG5pbnRlcmZhY2UgVGV4dFNoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgLy/pobrml7bpkojloavlhpnlnZDmoIfmiJbpobrnu5jliLbot6/nur/loavlhpnlnZDmoIdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB0ZXh0OiBzdHJpbmdcbiAgICBtYXhXaWR0aD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgVGV4dE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBUZXh0U2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG4gICAgdGV4dExpbmU/OiBUZXh0TGluZVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRleHRMaW5le1xuICAgIHRleHRBOiBDYW52YXNUZXh0QWxpZ25cbiAgICB0ZXh0QjogQ2FudmFzVGV4dEJhc2VsaW5lXG59XG5cbmxldCBuYW1lSWQgPSAwO1xuXG5leHBvcnQgY2xhc3MgVGV4dHMgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInRleHRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBUZXh0T3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKG9wdHMuc3R5bGUpXG4gICAgICAgIGlmKG9wdHMuc3R5bGUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUgPSBvcHRzLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9wdHMudGV4dExpbmUpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGV4dExpbmUgPSBvcHRzLnRleHRMaW5lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICB0aGlzLnRleHRMaW5lID0ge1xuICAgICAgICAgICAgICAgIHRleHRBOiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgIHRleHRCOiAnYWxwaGFiZXRpYydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIHNldFRleHRMaW5lKHRleHRMaW5lOiBUZXh0TGluZSl7XG4gICAgICAgIGlmKHRleHRMaW5lKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0ZXh0TGluZS50ZXh0QSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRMaW5lLnRleHRBID0gdGV4dExpbmUudGV4dEFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHRleHRMaW5lLnRleHRCKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dExpbmUudGV4dEIgPSB0ZXh0TGluZS50ZXh0QlxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRleHQodGV4dDogVGV4dHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiBUZXh0c3tcblxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcblxuICAgIGN0eC50ZXh0QWxpZ24gPSB0ZXh0LnRleHRMaW5lLnRleHRBXG4gICAgY3R4LnRleHRCYXNlbGluZSA9IHRleHQudGV4dExpbmUudGV4dEJcblxuICAgIGp1ZGdlVGV4dFN0eWxlKHRleHQsY3R4KVxuXG4gICAganVkZ2VUUlModGV4dClcblxuICAgIGp1ZGdlU3R5bGVfdGV4dCh0ZXh0LGN0eClcblxuICAgIFxuICAgIFxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICByZXR1cm4gdGV4dFxufVxuXG5leHBvcnQgZnVuY3Rpb24gQ2F0U3RyKHN0ckE6IHN0cmluZ1tdKTogc3RyaW5ne1xuICAgIGxldCB0ZXh0ID0gJydcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBzdHJBLmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0ckFbaV07XG4gICAgfVxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBTdHJQYWQoc3RyOiBzdHJpbmcsc3RyMDogc3RyaW5nLG51bT86IG51bWJlcik6IHN0cmluZ3tcbiAgICBsZXQgdGV4dCA9ICcnXG4gICAgXG4gICAgaWYobnVtID09PSB1bmRlZmluZWQgfHwgbnVtID09PSAwKVxuICAgIHtcbiAgICAgICAgbnVtID0gMTtcbiAgICB9XG5cbiAgICBmb3IobGV0IGk9MDtpPG51bTtpKyspXG4gICAge1xuICAgICAgICB0ZXh0ICs9IHN0cjBcbiAgICB9XG4gICAgdGV4dCArPSBzdHJcblxuICAgIHJldHVybiB0ZXh0XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJlcShzdHIwOiBzdHJpbmcsc3RyMTogc3RyaW5nKTogYm9vbGVhbntcbiAgICBsZXQgcmVzdWx0ID0gZmFsc2VcbiAgICByZXN1bHQgPSBzdHIwLmluY2x1ZGVzKHN0cjEpO1xuICAgIHJldHVybiByZXN1bHRcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlcGxhY2Uoc3RyOiBzdHJpbmcsc3RyX286IHN0cmluZyxzdHJfcjogc3RyaW5nKTpzdHJpbmd7XG4gICAgbGV0IHJlc3VsdCA9ICcnXG5cbiAgICByZXN1bHQgPSBzdHIucmVwbGFjZShuZXcgUmVnRXhwKHN0cl9vLCdnJyksc3RyX3IpO1xuXG4gICAgcmV0dXJuIHJlc3VsdFxufSIsImltcG9ydCB7IFNoYXBlLFN0eWxlLG5hbWVTdHlsZSxPcHRzIH0gZnJvbSAnLi4vRGF0YVR5cGUvZGF0YVR5cGUnXG5pbXBvcnQgeyBFbGVtZW50cyB9IGZyb20gJy4uL0VsZW1lbnQnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJztcbmltcG9ydCB7IGp1ZGdlSW1hZ2VTaGFwZSwganVkZ2VTdHlsZSxqdWRnZUltYWdlU2hhcGVfdHJ1ZSwganVkZ2VUUlMgfSBmcm9tICcuLi9KdWRnZS9qdWRnZSdcblxuaW50ZXJmYWNlIEltZ1NoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgaW1nOiBzdHJpbmdcbiAgICB4OiBudW1iZXJcbiAgICB5OiBudW1iZXJcbiAgICB3aWR0aD86IG51bWJlclxuICAgIGhlaWdodD86IG51bWJlclxuICAgIHN4PzogbnVtYmVyXG4gICAgc3k/OiBudW1iZXJcbiAgICBzd2lkdGg/OiBudW1iZXJcbiAgICBzaGVpZ2h0PzogbnVtYmVyXG59XG5cbmludGVyZmFjZSBJbWdPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogSW1nU2hhcGVcbiAgICBzdHlsZT86IFN0eWxlXG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuY2xhc3MgUkdCQSB7XG4gICAgUjogbnVtYmVyXG4gICAgRzogbnVtYmVyXG4gICAgQjogbnVtYmVyXG4gICAgQTogbnVtYmVyXG59XG5cbmNsYXNzIFJHQkFfQXJyYXl7XG4gICAgUkdCQV9MaXN0OiBSR0JBW11cbiAgICB3aWR0aDogbnVtYmVyXG4gICAgaGVpZ2h0OiBudW1iZXJcbn1cblxuZXhwb3J0IGNsYXNzIEltZyBleHRlbmRzIEVsZW1lbnRze1xuICAgIHJlYWRvbmx5IG5hbWU/OiBuYW1lU3R5bGUgPSB7XG4gICAgICAgIG5hbWU6IFwiaW1nXCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgSW1nPzogYW55XG4gICAgSW1nRGF0YT86IEltYWdlRGF0YVxuICAgIElzQ2hhbmdlPzogYm9vbGVhblxuICAgIGdyZXlJbWdEYXRhPzogSW1hZ2VEYXRhXG4gICAgY29uc3RydWN0b3Iob3B0czogSW1nT3B0cyl7XG4gICAgICAgIHN1cGVyKClcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4XG4gICAgICAgIGlmKG9wdHMuSW1nID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBJID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgIEkuc3JjID0gb3B0cy5zaGFwZS5pbWdcbiAgICAgICAgICAgIEkuY3Jvc3NPcmlnaW4gPSAnQW5vbnltb3VzJzsgXG4gICAgICAgICAgICB0aGlzLkltZyA9IEk7XG4gICAgICAgICAgICBjb25zb2xlLmRpcih0aGlzLkltZylcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgdGhpcy5JbWcgPSBvcHRzLkltZ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICAvLyB0aGlzLnRleHR1cmVzID0ge1xuICAgICAgICAvLyAgICAgdGV4dHVyZTogW10sXG4gICAgICAgIC8vICAgICB3aWR0aDogMCxcbiAgICAgICAgLy8gICAgIGhlaWdodDogMFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGlmKG9wdHMuSW1nRGF0YSAhPT0gdW5kZWZpbmVkKVxuICAgICAgICAvLyB7XG4gICAgICAgIC8vICAgICB0aGlzLkltZ0RhdGEgPSBvcHRzLkltZ0RhdGFcbiAgICAgICAgLy8gfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnN4ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuc3ggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuc3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zeSA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYob3B0cy5zaGFwZS5zd2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zd2lkdGggPSB0aGlzLkltZy53aWR0aDtcbiAgICAgICAgfVxuICAgICAgICBpZihvcHRzLnNoYXBlLnNoZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS5zaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUud2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5zaGFwZS53aWR0aCA9IHRoaXMuSW1nLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmKG9wdHMuc2hhcGUuaGVpZ2h0ID09PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMuc2hhcGUuaGVpZ2h0ID0gdGhpcy5JbWcuaGVpZ2h0XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmluaXQoKS50aGVuKGFzeW5jIGltYWdlRGF0YT0+e1xuICAgICAgICAgICAgY29uc29sZS5kaXIoaW1hZ2VEYXRhKTtcbiAgICAgICAgICAgIHRoYXQuSW1nRGF0YSA9ICA8SW1hZ2VEYXRhPmltYWdlRGF0YTtcbiAgICAgICAgfSlcblxuICAgICAgICBuYW1lSWQrK1xuICAgIH1cbiAgICBpbml0KCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgICAgaWYgKHRoYXQuSW1nLnNyYyA9PSBudWxsKSByZXR1cm4gcmVqZWN0KCk7XG4gICAgICAgICAgICBsZXQgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyksXG4gICAgICAgICAgICAgICAgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpLFxuICAgICAgICAgICAgICAgIGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgICAgICAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY2FudmFzLndpZHRoID0gaW1hZ2Uud2lkdGg7XG4gICAgICAgICAgICAgICAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWFnZSwgMCwgMCwgdGhhdC5JbWcud2lkdGgsIHRoYXQuSW1nLmhlaWdodCk7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZShjb250ZXh0LmdldEltYWdlRGF0YSgwLCAwLCB0aGF0LkltZy53aWR0aCwgdGhhdC5JbWcuaGVpZ2h0KSk7XG4gICAgICAgICAgICB9LCBmYWxzZSk7XG4gICAgICAgICAgICBpbWFnZS5jcm9zc09yaWdpbiA9IFwiQW5vbnltb3VzXCJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IHRoYXQuSW1nLnNyYztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHRvR3JheSgpe1xuICAgICAgICAvLyBsZXQgaW1nID0gbmV3IEltZyh7XG4gICAgICAgIC8vICAgICBzaGFwZToge1xuICAgICAgICAvLyAgICAgICAgIGltZzogdGhpcy5zaGFwZS5pbWcsXG4gICAgICAgIC8vICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAvLyAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgLy8gICAgICAgICB3aWR0aDogdGhpcy5zaGFwZS53aWR0aCxcbiAgICAgICAgLy8gICAgICAgICBoZWlnaHQ6IHRoaXMuc2hhcGUuaGVpZ2h0LFxuICAgICAgICAvLyAgICAgICAgIHN4OiB0aGlzLnNoYXBlLnN4LFxuICAgICAgICAvLyAgICAgICAgIHN5OiB0aGlzLnNoYXBlLnN5LFxuICAgICAgICAvLyAgICAgICAgIHN3aWR0aDogdGhpcy5zaGFwZS5zd2lkdGgsXG4gICAgICAgIC8vICAgICAgICAgc2hlaWdodDogdGhpcy5zaGFwZS5zaGVpZ2h0LFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KVxuICAgICAgICAvLyB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICB0aGlzLklzQ2hhbmdlID0gdHJ1ZVxuICAgICAgICBsZXQgZyA9IDBcbiAgICAgICAgdGhpcy5ncmV5SW1nRGF0YSA9IG5ldyBJbWFnZURhdGEodGhpcy5JbWcud2lkdGgsdGhpcy5JbWcuaGVpZ2h0KTtcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgdGhpcy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBnID0gTWF0aC5mbG9vcih0aGlzLkltZ0RhdGEuZGF0YVs0KmkrMF0gKiAwLjI5OSArIHRoaXMuSW1nRGF0YS5kYXRhWzQqaSsxXSAqIDAuNTg3ICsgdGhpcy5JbWdEYXRhLmRhdGFbNCppKzJdICogMC4xMTQpO1xuICAgICAgICAgICAgLy8gaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF0gPSBnXG4gICAgICAgICAgICAvLyBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXSA9IGdcbiAgICAgICAgICAgIC8vIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdID0gZ1xuICAgICAgICAgICAgLy8gaW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gPSB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrM11cbiAgICAgICAgICAgIHRoaXMuZ3JleUltZ0RhdGEuZGF0YVs0KmkrMF0gPSBnXG4gICAgICAgICAgICB0aGlzLmdyZXlJbWdEYXRhLmRhdGFbNCppKzFdID0gZ1xuICAgICAgICAgICAgdGhpcy5ncmV5SW1nRGF0YS5kYXRhWzQqaSsyXSA9IGdcbiAgICAgICAgICAgIHRoaXMuZ3JleUltZ0RhdGEuZGF0YVs0KmkrM10gPSB0aGlzLkltZ0RhdGEuZGF0YVs0KmkrM11cbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gaW1nO1xuICAgIH1cbiAgICByZXBsYWNlKCl7XG4gICAgICAgIHRoaXMuSXNDaGFuZ2UgPSBmYWxzZVxuICAgICAgICB0aGlzLmluaXQoKVxuICAgIH1cbiAgICAvLyBtYWtlVGV4dHVyZXMoKXtcbiAgICAvLyAgICAgLy8gdGhpcy50ZXh0dXJlcyA9IG5ldyBUZXh0dXJlcyh0aGlzKTtcbiAgICAvLyAgICAgbGV0IGltZyA9IHRoaXMudG9HcmF5KCk7XG4gICAgLy8gICAgIGxldCBkYXRhMCA9IGltZy5JbWdEYXRhLmRhdGE7XG4gICAgLy8gICAgIGxldCBhID0gbmV3IEFycmF5KClcbiAgICAvLyAgICAgbGV0IGFyciA9ICcnXG4gICAgLy8gICAgIGxldCBudW1BcnI6IG51bWJlcltdID0gW107XG4gICAgLy8gICAgIGxldCBudW1BcnIwOiBudW1iZXJbXSA9IFtdO1xuICAgIC8vICAgICAvLyBsZXQgZGF0YSA9IHRoaXMuSW1nRGF0YS5kYXRhXG4gICAgLy8gICAgIGxldCB3ID0gdGhpcy5JbWdEYXRhLndpZHRoXG4gICAgLy8gICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgLy8gICAgIC8vIGNvbnNvbGUuZGlyKGRhdGEpXG4gICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEwLmxlbmd0aC80O2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgMzt0KyspXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgZm9yKGxldCBrID0gMDtrIDwgMztrKyspXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBpZihkYXRhMFs0KmldIDw9IGRhdGEwWzQqKGkrKHQtMSkqdytrLTEpXSB8fCBkYXRhMFs0KihpKyh0LTEpKncray0xKV0gPT09IHVuZGVmaW5lZClcbiAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgYVszKnQra10gPSAwXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFbMyp0K2tdID0gMVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgICAgIGlmKDMqdCtrICE9PSA0KVxuICAgIC8vICAgICAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBhcnIgKz0gYVszKnQra10udG9TdHJpbmcoKTsgXG4gICAgLy8gICAgICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoKGkrKHQtMSkqdytrLTEpKVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIG51bUFycltpXSA9IHBhcnNlSW50KGFyciwyKVxuICAgIC8vICAgICAgICAgYXJyID0gJydcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1BcnIubGVuZ3RoO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgaW1nLkltZ0RhdGEuZGF0YVs0KmkrMF09bnVtQXJyW2ldXG4gICAgLy8gICAgICAgICBpbWcuSW1nRGF0YS5kYXRhWzQqaSsxXT1udW1BcnJbaV1cbiAgICAvLyAgICAgICAgIGltZy5JbWdEYXRhLmRhdGFbNCppKzJdPW51bUFycltpXVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIHJldHVybiBpbWc7XG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUltZyhpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IEltZ3tcbiAgICBjdHguc2F2ZSgpXG4gICAgY3R4LmJlZ2luUGF0aCgpXG4gICAgLy8ganVkZ2VUUlMoaW1nKVxuICAgIGlmKGltZy5Jc0NoYW5nZSA9PT0gZmFsc2UpXG4gICAge1xuICAgICAgICBqdWRnZUltYWdlU2hhcGUoaW1nLGN0eCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZyxjdHgpO1xuICAgIH1cbiAgICBcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG4gICAgcmV0dXJuIGltZ1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW1SZWFkKGltZzogSW1nKTogSW1hZ2VEYXRheyAgICAgICAgIC8v6K+75Y+W5Zu+54mH55+p6Zi1XG4gICAgcmV0dXJuIGltZy5JbWdEYXRhO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gVW5wYWNrQ29sb3JJbWFnZShpbWc6IEltZyk6IFJHQkFfQXJyYXl7XG4gICAgbGV0IHJnYmEgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBkYXRhID0gaW1nLkltZ0RhdGEuZGF0YVxuICAgIFxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgcmdiYVtpXSA9IG5ldyBSR0JBKClcbiAgICAgICAgXG4gICAgICAgIHJnYmFbaV0uUiA9IGRhdGFbNCppKzBdXG4gICAgICAgIHJnYmFbaV0uRyA9IGRhdGFbNCppKzFdXG4gICAgICAgIHJnYmFbaV0uQiA9IGRhdGFbNCppKzJdXG4gICAgICAgIHJnYmFbaV0uQSA9IGRhdGFbNCppKzNdXG5cbiAgICB9XG5cbiAgICBsZXQgcmdiYV9hcnIgPSBuZXcgUkdCQV9BcnJheSgpXG4gICAgcmdiYV9hcnIuUkdCQV9MaXN0ID0gcmdiYTtcbiAgICByZ2JhX2Fyci53aWR0aCA9IGltZy5JbWdEYXRhLndpZHRoXG4gICAgcmdiYV9hcnIuaGVpZ2h0ID0gaW1nLkltZ0RhdGEuaGVpZ2h0XG5cbiAgICByZXR1cm4gcmdiYV9hcnJcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFBhY2tDb2xvckltYWdlKHJnYmFfYXJyOiBSR0JBX0FycmF5KTogSW1hZ2VEYXRhe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJylcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgbGV0IGltZ2RhdGEgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKHJnYmFfYXJyLndpZHRoLHJnYmFfYXJyLmhlaWdodCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmdiYV9hcnIuUkdCQV9MaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzBdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLlJcbiAgICAgICAgaW1nZGF0YS5kYXRhWzQqaSsxXSA9IHJnYmFfYXJyLlJHQkFfTGlzdFtpXS5HXG4gICAgICAgIGltZ2RhdGEuZGF0YVs0KmkrMl0gPSByZ2JhX2Fyci5SR0JBX0xpc3RbaV0uQlxuICAgICAgICBpbWdkYXRhLmRhdGFbNCppKzNdID0gcmdiYV9hcnIuUkdCQV9MaXN0W2ldLkFcbiAgICB9XG4gICAgcmV0dXJuIGltZ2RhdGFcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZUluKGltZzogSW1nLGFscGhhSW46IG51bWJlcik6IEltZ3tcbiAgICBpZihhbHBoYUluPjEgfHwgYWxwaGFJbjwwKVxuICAgIHtcbiAgICAgICAgYWxwaGFJbiA9IDE7XG4gICAgfVxuICAgIGxldCBuZXdJbWcgPSBuZXcgSW1nKHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIGltZzogaW1nLnNoYXBlLmltZyxcbiAgICAgICAgICAgIHg6IGltZy5zaGFwZS54LFxuICAgICAgICAgICAgeTogaW1nLnNoYXBlLnlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgLy8gY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gY29uc29sZS5kaXIobmV3SW1nLkltZ0RhdGEpXG4gICAgbmV3SW1nLklzQ2hhbmdlID0gdHJ1ZVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IGltZy5JbWdEYXRhLmRhdGEubGVuZ3RoLzQ7aSsrKVxuICAgIHtcbiAgICAgICAgbmV3SW1nLkltZ0RhdGEuZGF0YVs0KmkrM10gKj0gYWxwaGFJblxuICAgIH1cbiAgICBcblxuICAgIHJldHVybiBuZXdJbWdcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE1hc2tJbWFnZU91dChpbWc6IEltZyxhbHBoYUluOiBudW1iZXIpOiBJbWd7XG4gICAgaWYoYWxwaGFJbj4xIHx8IGFscGhhSW48MClcbiAgICB7XG4gICAgICAgIGFscGhhSW4gPSAwO1xuICAgIH1cbiAgICBsZXQgbmV3SW1nID0gbmV3IEltZyh7XG4gICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICBpbWc6IGltZy5zaGFwZS5pbWcsXG4gICAgICAgICAgICB4OiBpbWcuc2hhcGUueCxcbiAgICAgICAgICAgIHk6IGltZy5zaGFwZS55XG4gICAgICAgIH1cbiAgICB9KVxuICAgIC8vIGNvbnNvbGUuZGlyKGltZy5JbWdEYXRhKVxuICAgIC8vIGNvbnNvbGUuZGlyKG5ld0ltZy5JbWdEYXRhKVxuICAgIG5ld0ltZy5Jc0NoYW5nZSA9IHRydWVcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBpbWcuSW1nRGF0YS5kYXRhLmxlbmd0aC80O2krKylcbiAgICB7XG4gICAgICAgIG5ld0ltZy5JbWdEYXRhLmRhdGFbNCppKzNdICo9ICgxIC0gYWxwaGFJbilcbiAgICB9XG4gICAgXG5cbiAgICByZXR1cm4gbmV3SW1nXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBJbWdJbml0KGltZzogSW1nW118R3JvdXApe1xuICAgIGxldCBJO1xuICAgIGlmKGltZ1swXSBpbnN0YW5jZW9mIEltZylcbiAgICB7XG4gICAgICAgIEkgPSBuZXcgR3JvdXAoaW1nKVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBJID0gaW1nXG4gICAgfVxuICAgIGZvcihsZXQgaSA9IDA7aSA8IEkuZ3JvdXBMaXN0Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBJLmdyb3VwTGlzdFtpXS5pbml0KClcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBQcmVsb2FkVGV4dHVyZXMoaW1nOiBJbWcpOiBJbWd7XG4vLyAgICAgbGV0IG5ld0ltZyA9IGltZy5tYWtlVGV4dHVyZXMoKTtcbi8vICAgICByZXR1cm4gbmV3SW1nXG4vLyB9XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBEcmF3VGV4dHVyZShpbWc6IEltZyk6IEltZ3tcbi8vICAgICBsZXQgbmV3SW1nID0gaW1nLm1ha2VUZXh0dXJlcygpO1xuLy8gICAgIHJldHVybiBuZXdJbWdcbi8vIH1cblxuLy8gZXhwb3J0IGZ1bmN0aW9uIERyYXdUZXh0dXJlcyhpbWc6IEltZ1tdfEdyb3VwKTogR3JvdXB7XG4vLyAgICAgbGV0IEk7XG4vLyAgICAgbGV0IHRleHR1cmU6IEltZ1tdID0gW11cbi8vICAgICBsZXQgVDtcbi8vICAgICBpZihpbWdbMF0gaW5zdGFuY2VvZiBJbWcpXG4vLyAgICAge1xuLy8gICAgICAgICBJID0gbmV3IEdyb3VwKGltZylcbi8vICAgICB9XG4vLyAgICAgZWxzZXtcbi8vICAgICAgICAgSSA9IGltZ1xuLy8gICAgIH1cbi8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBJLmdyb3VwTGlzdC5sZW5ndGg7aSsrKVxuLy8gICAgIHtcbi8vICAgICAgICAgdGV4dHVyZVtpXSA9IERyYXdUZXh0dXJlKEkuZ3JvdXBMaXN0W2ldKVxuLy8gICAgIH1cbi8vICAgICBUID0gbmV3IEdyb3VwKHRleHR1cmUpXG4vLyAgICAgcmV0dXJuIFQ7XG4vLyB9IiwiXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFt4MCx5MCx4MSx5MV06IFtudW1iZXIsbnVtYmVyLG51bWJlcixudW1iZXJdLG51bTogbnVtYmVyLHM6IG51bWJlcik6IENhbnZhc0dyYWRpZW50e1xuICAgIGxldCBmaWxsID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHgwLHkwLXMseDEseTEtcylcbiAgICBmaWxsLmFkZENvbG9yU3RvcCgwLCcjZmZmJylcbiAgICBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAgICAgaWYoaSUyID09PSAxKXtcbiAgICAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCcjMDAwJylcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZmlsbC5hZGRDb2xvclN0b3AoaS9udW0sJyNmZmYnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGZpbGwuYWRkQ29sb3JTdG9wKDEsJyNmZmYnKVxuICAgIHJldHVybiBmaWxsXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUsIG5hbWVTdHlsZSwgT3B0cywgU2hhcGUsIFN0eWxlIH0gZnJvbSBcIi4uL2V6cHN5XCI7XG5pbXBvcnQgeyBqdWRnZUVsZW1lbnQsIGp1ZGdlU3R5bGUgfSBmcm9tIFwiLi4vSnVkZ2UvanVkZ2VcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5pbXBvcnQgeyBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQgfSBmcm9tIFwiLi4vR3JhZGllbnQvZ3JhZGllbnRcIjtcblxuaW50ZXJmYWNlIEdyYXRTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIGRlc2l0eTogbnVtYmVyIC8v5a+G6ZuG5bqmXG59XG5cbmludGVyZmFjZSBHcmF0T3B0cyBleHRlbmRzIE9wdHN7XG4gICAgc2hhcGU6IEdyYXRTaGFwZSxcbiAgICBzdHlsZT86IFN0eWxlXG59XG5cbmxldCBuYW1lSWQgPSAwXG5cbmV4cG9ydCBjbGFzcyBHcmF0IGV4dGVuZHMgRWxlbWVudHN7XG4gICAgcmVhZG9ubHkgbmFtZT86IG5hbWVTdHlsZSA9IHtcbiAgICAgICAgbmFtZTogXCJncmF0XCIgKyBuYW1lSWQudG9TdHJpbmcoKSxcbiAgICAgICAgZ3JhcGhpY0lkOiBuYW1lSWRcbiAgICB9XG4gICAgY29uc3RydWN0b3Iob3B0czogR3JhdE9wdHMpe1xuICAgICAgICBzdXBlcigpXG4gICAgICAgIGlmKCFvcHRzLnNoYXBlLmRlc2l0eSlcbiAgICAgICAge1xuICAgICAgICAgICAgb3B0cy5zaGFwZS5kZXNpdHkgPSAzNVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2hhcGUgPSBvcHRzLnNoYXBlO1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlXG4gICAgICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcbiAgICAgICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dChcIjJkXCIpO1xuICAgICAgICB0aGlzLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueSszKnNoLnJdLHNoLmRlc2l0eSwwKSxcbiAgICAgICAgICAgIHN0cm9rZTogJ25vbmUnLFxuICAgICAgICAgICAgbGluZVdpZHRoOiAyXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYob3B0cy5zdHlsZSlcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgICAgdGhpcy5zdHlsZSA9IG9wdHMuc3R5bGU7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgLy8gICAgIHRoaXMuc3R5bGUgPSB7XG4gICAgICAgIC8vICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgIC8vICAgICAgICAgc3Ryb2tlOiBcIm5vbmVcIixcbiAgICAgICAgLy8gICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfVxuXG4gICAgICAgIG5hbWVJZCsrXG4gICAgfVxuICAgIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpXG4gICAge1xuICAgICAgICBpZighZGVsYXkpe1xuICAgICAgICAgICAgZGVsYXkgPSA2XG4gICAgICAgICAgICBpZighc3BlZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICB0aGlzLmFuaW1hdGUoKCk9PntcbiAgICAgICAgICAgIHRoYXQuc3R5bGUuZmlsbCA9IGNyZWF0ZUdyYXRMaW5lYXJHcmFkaWVudChjdHgsW3gwLHkwLHgxLHkxXSx0aGF0LnNoYXBlLmRlc2l0eSxpbmRleCppKTtcbiAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaSA9IDBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQpXG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH0sZGVsYXkpXG4gICAgfVxuICAgIC8vIHBsYXkoc3BlZWQ/OiBudW1iZXIsZGVsYXk/OiBudW1iZXIpe1xuICAgIC8vICAgICBpZighZGVsYXkpe1xuICAgIC8vICAgICAgICAgZGVsYXkgPSA4XG4gICAgLy8gICAgICAgICBpZighc3BlZWQpXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3BlZWQgPSA4XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgLy8gICAgIGxldCBbeDAseTAseDEseTFdID0gW3RoaXMuc2hhcGUueC10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS55LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSszKnRoaXMuc2hhcGUucl1cbiAgICAvLyAgICAgbGV0IGluZGV4ID0gc3BlZWQ7XG4gICAgLy8gICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAvLyAgICAgKGFzeW5jIGZ1bmN0aW9uKCl7XG4gICAgLy8gICAgICAgICBmb3IobGV0IGkgPSAwO2kgPiAtMTtpKyspXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgbGV0IGZpbGwgPSBjcmVhdGVHcmF0TGluZWFyR3JhZGllbnQoY3R4LFt4MCx5MCx4MSx5MV0sdGhhdC5zaGFwZS5kZXNpdHksaW5kZXgqaSk7XG4gICAgLy8gICAgICAgICAgICAgaWYoaW5kZXgqaSA+PSAyKnRoYXQuc2hhcGUucilcbiAgICAvLyAgICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgICAgIGkgPSAwXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIHVwZGF0ZUdyYXQodGhhdCxjdHgsZmlsbClcbiAgICAvLyAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihpKVxuICAgIC8vICAgICAgICAgICAgIC8vIHRoYXQuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICAvLyAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZShkZWxheSlcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfSkoKVxuICAgICAgICBcbiAgICAvLyB9XG4gICAgLy8gcGxheShzcGVlZD86IG51bWJlcixkZWxheT86IG51bWJlcil7XG4gICAgLy8gICAgIGlmKCFkZWxheSl7XG4gICAgLy8gICAgICAgICBkZWxheSA9IDhcbiAgICAvLyAgICAgICAgIGlmKCFzcGVlZClcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBzcGVlZCA9IDhcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAvLyAgICAgLy8gY29uc29sZS5kaXIoJ2EnKVxuICAgIC8vICAgICAvLyBsZXQgW3gwLHkwLHgxLHkxXSA9IFt0aGlzLnNoYXBlLngtdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueS10aGlzLnNoYXBlLnIsdGhpcy5zaGFwZS54LXRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkrMyp0aGlzLnNoYXBlLnJdXG4gICAgLy8gICAgIGxldCBpbmRleCA9IHNwZWVkO1xuICAgIC8vICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgLy8gICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgIC8vICAgICAgICAgZm9yKGxldCBpID0gMDtpID4gLTE7aSsrKVxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIGlmKGluZGV4KmkgPj0gMip0aGF0LnNoYXBlLnIpXG4gICAgLy8gICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICBpID0gMFxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgICAgICB1cGRhdGVHcmF0MCh0aGF0LGN0eCxpbmRleCppKVxuICAgIC8vICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGkpXG4gICAgLy8gICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoZGVsYXkpXG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH0pKClcbiAgICAvLyB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtYWtlR3JhdChncmF0OiBHcmF0LGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogR3JhdHtcbiAgICBsZXQgc2ggPSBncmF0LnNoYXBlO1xuICAgIC8vIGNvbnNvbGUuZGlyKHNoKVxuICAgIC8vIGxldCBudW0gPSBzaC5kZXNpdHk7XG4gICAgLy8gbGV0IGZpbGwgPSBjdHguY3JlYXRlTGluZWFyR3JhZGllbnQoc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueStzaC5yKVxuICAgIC8vIGZpbGwuYWRkQ29sb3JTdG9wKDAsJ3doaXRlJylcbiAgICAvLyBmb3IobGV0IGkgPSAxO2kgPCBudW07aSsrKXtcbiAgICAvLyAgICAgaWYoaSUyID09PSAxKXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCdibGFjaycpXG4gICAgLy8gICAgIH1cbiAgICAvLyAgICAgZWxzZXtcbiAgICAvLyAgICAgICAgIGZpbGwuYWRkQ29sb3JTdG9wKGkvbnVtLCd3aGl0ZScpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZmlsbC5hZGRDb2xvclN0b3AoMSwnd2hpdGUnKVxuICAgIC8vIGxldCBmaWxsID0gY3JlYXRlR3JhdExpbmVhckdyYWRpZW50KGN0eCxbc2gueC1zaC5yLHNoLnktc2gucixzaC54LXNoLnIsc2gueSszKnNoLnJdLG51bSwwKVxuICAgIC8vIGxldCBjID0gY3R4LmNhbnZhc1xuICAgIC8vIGMuc3R5bGUuYm9yZGVyUmFkaXVzID0gJzUwJSc7XG4gICAgLy8gZ3JhdC5zdHlsZS5maWxsID0gZmlsbFxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBlekp1ZGdlLmp1ZGdlVFJTKGdyYXQpXG4gICAgY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSlcbiAgICAvLyBjdHgucmVjdChzaC54LXNoLnIsc2gueS1zaC5yLHNoLngrc2gucixzaC55KzMqc2gucilcbiAgICBqdWRnZVN0eWxlKGdyYXQsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbiAgICAvLyBjdHguc2F2ZSgpXG4gICAgLy8gY3R4LmJlZ2luUGF0aCgpO1xuICAgIC8vIGN0eC5yZWN0KHNoLngtc2gucixzaC55LXNoLnIsc2gueCtzaC5yLHNoLnkrMipzaC5yKTtcbiAgICAvLyBqdWRnZVN0eWxlKGdyYXQsY3R4KTtcbiAgICAvLyBjdHguY2xvc2VQYXRoKClcbiAgICAvLyBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2Rlc3RpbmF0aW9uLWluJ1xuICAgIC8vIGN0eC5iZWdpblBhdGgoKVxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snXG4gICAgLy8gY3R4LmFyYyhzaC54LHNoLnksc2guciwwLDIqTWF0aC5QSSk7XG4gICAgLy8gY3R4LmZpbGwoKVxuICAgIC8vIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAvLyBjdHgucmVzdG9yZSgpXG4gICAgXG4gICAgcmV0dXJuIGdyYXQ7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQoZ3JhdDogR3JhdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxmaWxsOiBDYW52YXNHcmFkaWVudCl7XG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGdyYXQuc3R5bGUuZmlsbCA9IGZpbGxcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHguYXJjKGdyYXQuc2hhcGUueCxncmF0LnNoYXBlLnksZ3JhdC5zaGFwZS5yLDAsMipNYXRoLlBJKVxuICAgIGp1ZGdlU3R5bGUoZ3JhdCxjdHgpXG4gICAgY3R4LmNsb3NlUGF0aCgpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUdyYXQwKGdyYXQ6IEdyYXQsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsbnVtOiBudW1iZXIpe1xuICAgIC8vIGNvbnNvbGUuZGlyKGdyYXQpXG4gICAgZ3JhdC5yZW1vdmUoKVxuICAgIGN0eC5zYXZlKClcbiAgICBjdHguYmVnaW5QYXRoKClcbiAgICBjdHgudHJhbnNsYXRlKDAsLW51bSlcbiAgICBjdHgucmVjdChncmF0LnNoYXBlLngtZ3JhdC5zaGFwZS5yLGdyYXQuc2hhcGUueS1ncmF0LnNoYXBlLnIsZ3JhdC5zaGFwZS54K2dyYXQuc2hhcGUucixncmF0LnNoYXBlLnkrMypncmF0LnNoYXBlLnIpXG4gICAganVkZ2VTdHlsZShncmF0LGN0eClcbiAgICBjdHguY2xvc2VQYXRoKClcbiAgICBjdHgucmVzdG9yZSgpXG59IiwiXG5sZXQgd2FzbTtcblxubGV0IGNhY2hlZ2V0SW50MzJNZW1vcnkwID0gbnVsbDtcbmZ1bmN0aW9uIGdldEludDMyTWVtb3J5MCgpIHtcbiAgICBpZiAoY2FjaGVnZXRJbnQzMk1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVnZXRJbnQzMk1lbW9yeTAuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbiAgICAgICAgY2FjaGVnZXRJbnQzMk1lbW9yeTAgPSBuZXcgSW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY2FjaGVnZXRJbnQzMk1lbW9yeTA7XG59XG5cbmxldCBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG51bGw7XG5mdW5jdGlvbiBnZXRVaW50OE1lbW9yeTAoKSB7XG4gICAgaWYgKGNhY2hlZ2V0VWludDhNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZ2V0VWludDhNZW1vcnkwLmJ1ZmZlciAhPT0gd2FzbS5tZW1vcnkuYnVmZmVyKSB7XG4gICAgICAgIGNhY2hlZ2V0VWludDhNZW1vcnkwID0gbmV3IFVpbnQ4QXJyYXkod2FzbS5tZW1vcnkuYnVmZmVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhY2hlZ2V0VWludDhNZW1vcnkwO1xufVxuXG5mdW5jdGlvbiBnZXRBcnJheVU4RnJvbVdhc20wKHB0ciwgbGVuKSB7XG4gICAgcmV0dXJuIGdldFVpbnQ4TWVtb3J5MCgpLnN1YmFycmF5KHB0ciAvIDEsIHB0ciAvIDEgKyBsZW4pO1xufVxuLyoqXG4qIEBwYXJhbSB7bnVtYmVyfSByYWRpdXNcbiogQHBhcmFtIHtudW1iZXJ9IHBpeGVsc19wZXJfZGVncmVlXG4qIEBwYXJhbSB7bnVtYmVyfSBzcGF0aWFsX2ZyZXF1ZW5jeVxuKiBAcGFyYW0ge251bWJlcn0gYW5nbGVcbiogQHBhcmFtIHtudW1iZXJ9IGNvbnRyYXN0XG4qIEBwYXJhbSB7bnVtYmVyfSBwaGFzZVxuKiBAcGFyYW0ge251bWJlcn0gZ2FtbWFcbiogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHByZV9zaW5ncmF0KHJhZGl1cywgcGl4ZWxzX3Blcl9kZWdyZWUsIHNwYXRpYWxfZnJlcXVlbmN5LCBhbmdsZSwgY29udHJhc3QsIHBoYXNlLCBnYW1tYSkge1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xuICAgICAgICB3YXNtLnByZV9zaW5ncmF0KHJldHB0ciwgcmFkaXVzLCBwaXhlbHNfcGVyX2RlZ3JlZSwgc3BhdGlhbF9mcmVxdWVuY3ksIGFuZ2xlLCBjb250cmFzdCwgcGhhc2UsIGdhbW1hKTtcbiAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xuICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XG4gICAgICAgIHZhciB2MCA9IGdldEFycmF5VThGcm9tV2FzbTAocjAsIHIxKS5zbGljZSgpO1xuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShyMCwgcjEgKiAxKTtcbiAgICAgICAgcmV0dXJuIHYwO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XG4gICAgfVxufVxuXG4vKipcbiogQHBhcmFtIHtudW1iZXJ9IHJhZGl1c1xuKiBAcGFyYW0ge251bWJlcn0gcGl4ZWxzX3Blcl9kZWdyZWVcbiogQHBhcmFtIHtudW1iZXJ9IHNwYXRpYWxfZnJlcXVlbmN5XG4qIEBwYXJhbSB7bnVtYmVyfSBhbmdsZVxuKiBAcGFyYW0ge251bWJlcn0gY29udHJhc3RcbiogQHBhcmFtIHtudW1iZXJ9IHBoYXNlXG4qIEBwYXJhbSB7bnVtYmVyfSBsZXZlbFxuKiBAcGFyYW0ge251bWJlcn0gZ2FtbWFcbiogQHJldHVybnMge1VpbnQ4QXJyYXl9XG4qL1xuZXhwb3J0IGZ1bmN0aW9uIHByZV9ub2lzZV9zaW5ncmF0KHJhZGl1cywgcGl4ZWxzX3Blcl9kZWdyZWUsIHNwYXRpYWxfZnJlcXVlbmN5LCBhbmdsZSwgY29udHJhc3QsIHBoYXNlLCBsZXZlbCwgZ2FtbWEpIHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcbiAgICAgICAgd2FzbS5wcmVfbm9pc2Vfc2luZ3JhdChyZXRwdHIsIHJhZGl1cywgcGl4ZWxzX3Blcl9kZWdyZWUsIHNwYXRpYWxfZnJlcXVlbmN5LCBhbmdsZSwgY29udHJhc3QsIHBoYXNlLCBsZXZlbCwgZ2FtbWEpO1xuICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XG4gICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcbiAgICAgICAgdmFyIHYwID0gZ2V0QXJyYXlVOEZyb21XYXNtMChyMCwgcjEpLnNsaWNlKCk7XG4gICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKHIwLCByMSAqIDEpO1xuICAgICAgICByZXR1cm4gdjA7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGxvYWQobW9kdWxlLCBpbXBvcnRzKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGUgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhtb2R1bGUsIGltcG9ydHMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChtb2R1bGUuaGVhZGVycy5nZXQoJ0NvbnRlbnQtVHlwZScpICE9ICdhcHBsaWNhdGlvbi93YXNtJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmdgIGZhaWxlZCBiZWNhdXNlIHlvdXIgc2VydmVyIGRvZXMgbm90IHNlcnZlIHdhc20gd2l0aCBgYXBwbGljYXRpb24vd2FzbWAgTUlNRSB0eXBlLiBGYWxsaW5nIGJhY2sgdG8gYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlYCB3aGljaCBpcyBzbG93ZXIuIE9yaWdpbmFsIGVycm9yOlxcblwiLCBlKTtcblxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgYnl0ZXMgPSBhd2FpdCBtb2R1bGUuYXJyYXlCdWZmZXIoKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKGJ5dGVzLCBpbXBvcnRzKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGluc3RhbmNlID0gYXdhaXQgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUobW9kdWxlLCBpbXBvcnRzKTtcblxuICAgICAgICBpZiAoaW5zdGFuY2UgaW5zdGFuY2VvZiBXZWJBc3NlbWJseS5JbnN0YW5jZSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgaW5zdGFuY2UsIG1vZHVsZSB9O1xuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluaXQoaW5wdXQpIHtcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpbnB1dCA9IG5ldyBVUkwoJ3NpbmdyYXRfYmcud2FzbScsIGltcG9ydC5tZXRhLnVybCk7XG4gICAgfVxuICAgIGNvbnN0IGltcG9ydHMgPSB7fTtcblxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkgfHwgKHR5cGVvZiBVUkwgPT09ICdmdW5jdGlvbicgJiYgaW5wdXQgaW5zdGFuY2VvZiBVUkwpKSB7XG4gICAgICAgIGlucHV0ID0gZmV0Y2goaW5wdXQpO1xuICAgIH1cblxuXG4gXG4gICAgY29uc3QgeyBpbnN0YW5jZSwgbW9kdWxlIH0gPSBhd2FpdCBsb2FkKGF3YWl0IGlucHV0LCBpbXBvcnRzKTtcblxuICAgIHdhc20gPSBpbnN0YW5jZS5leHBvcnRzO1xuICAgIGluaXQuX193YmluZGdlbl93YXNtX21vZHVsZSA9IG1vZHVsZTtcblxuICAgIHJldHVybiB3YXNtO1xufVxuXG5leHBvcnQgZGVmYXVsdCBpbml0O1xuXG4iLCJpbXBvcnQgeyBTaGFwZSxPcHRzLFN0eWxlLG5hbWVTdHlsZSB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50JztcbmltcG9ydCAqIGFzIFNHIGZyb20gJy4uLy4uL3N0YXRpYy9wa2cvc2luZ3JhdCdcbmltcG9ydCAqIGFzIFRJTUUgZnJvbSAnLi4vVGltZS90aW1lJ1xuXG5pbnRlcmZhY2UgR3JhdGluZ1NoYXBlIGV4dGVuZHMgU2hhcGV7XG4gICAgeDogbnVtYmVyLFxuICAgIHk6IG51bWJlcixcbiAgICByOiBudW1iZXIsXG4gICAgcGl4ZWxzUGVyRGVncmVlPzogbnVtYmVyLCBcbiAgICBzcGF0aWFsRnJlcXVlbmN5PzogbnVtYmVyLFxuICAgIGFuZ2xlPzogbnVtYmVyLCBcbiAgICBjb250cmFzdD86IG51bWJlciwgXG4gICAgcGhhc2U/OiBudW1iZXIsXG4gICAgbGV2ZWw/OiBudW1iZXIsXG4gICAgZ2FtbWE/OiBudW1iZXJcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHcmF0aW5nT3B0cyBleHRlbmRzIE9wdHN7XG4gICAgd2FzbTogc3RyaW5nLFxuICAgIHNoYXBlOiBHcmF0aW5nU2hhcGUsXG4gICAgc3R5bGU/OiBTdHlsZSxcbiAgICBpc05vaXNlPzogYm9vbGVhblxufVxuXG5sZXQgbmFtZUlkID0gMDtcblxuZXhwb3J0IGNsYXNzIHNpbkdyYXRpbmcgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInNpbmdyYXRpbmdcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICB3YXNtOiBzdHJpbmc7XG4gICAgcGFyYW06IFVpbnQ4QXJyYXk7XG4gICAgd2lkdGg6IG51bWJlcjtcbiAgICBzaW5HcmF0OiBJbWFnZURhdGE7ICAgICAgICAvL+WFieagheWbvueJh+aVsOaNrlxuICAgIGltZ0RhdGFMaXN0OiBBcnJheTxJbWFnZURhdGE+OyAgICAvL+eUqOS6juWCqOWtmOWPguS4juWKqOeUu+eahOWbvueJh1xuICAgIGlzTm9pc2U6IGJvb2xlYW47XG4gICAgY29uc3RydWN0b3Iob3B0czogR3JhdGluZ09wdHMpe1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmN0eCA9IHN1cGVyLmN0eDtcbiAgICAgICAgdGhpcy53YXNtID0gb3B0cy53YXNtO1xuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZTtcbiAgICAgICAgdGhpcy53aWR0aCA9IDIqKHNoLnIvMitzaC5yKSsxO1xuICAgICAgICB0aGlzLnNpbkdyYXQgPSBuZXcgSW1hZ2VEYXRhKHRoaXMud2lkdGgsdGhpcy53aWR0aCk7XG4gICAgICAgIHRoaXMuaW1nRGF0YUxpc3QgPSBuZXcgQXJyYXk8SW1hZ2VEYXRhPigpO1xuICAgICAgICB0aGlzLmlzTm9pc2UgPSBvcHRzLmlzTm9pc2U7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuaXNOb2lzZSlcbiAgICAgICAgXG4gICAgICAgIG5hbWVJZCsrO1xuICAgIH1cbiAgICBkcmF3KCl7XG4gICAgICAgIGxldCBzaCA9IHRoaXMuc2hhcGU7XG4gICAgICAgIC8vIHJlYWRXYXNtKHRoaXMud2FzbSkudGhlbih3YXNtID0+IHtcbiAgICAgICAgLy8gICAgIGNvbnNvbGUuZGlyKHdhc20pO1xuICAgICAgICAvLyAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XG4gICAgICAgIC8vICAgICB3YXNtLnByZV9zaW5ncmF0KHJldHB0ciwgc2guciwgc2gucGl4ZWxzUGVyRGVncmVlLCBzaC5zcGF0aWFsRnJlcXVlbmN5LCBzaC5hbmdsZSwgc2guY29udHJhc3QsIHNoLnBoYXNlLCBzaC5nYW1tYSk7XG4gICAgICAgIC8vICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAod2FzbSlbcmV0cHRyIC8gNCArIDBdO1xuICAgICAgICAvLyAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKHdhc20pW3JldHB0ciAvIDQgKyAxXTtcbiAgICAgICAgLy8gICAgIHZhciB2MCA9IGdldEFycmF5VThGcm9tV2FzbTAocjAsIHIxLCB3YXNtKS5zbGljZSgpO1xuICAgICAgICAvLyAgICAgY29uc29sZS5kaXIodjApXG4gICAgICAgIC8vICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShyMCwgcjEgKiAxKTtcbiAgICAgICAgLy8gICAgIHRoaXMucGFyYW0gPSB2MDtcbiAgICAgICAgLy8gICAgIC8vIGlmKHRoaXMuaXNOb2lzZSlcbiAgICAgICAgLy8gICAgIC8vICAgICB0aGlzLnBhcmFtID0gU0cucHJlX25vaXNlX3NpbmdyYXQoc2gucixzaC5waXhlbHNQZXJEZWdyZWUsc2guc3BhdGlhbEZyZXF1ZW5jeSxzaC5hbmdsZSxzaC5jb250cmFzdCxzaC5waGFzZSxzaC5sZXZlbCxzaC5nYW1tYSk7XG4gICAgICAgIC8vICAgICAvLyBlbHNlXG4gICAgICAgIC8vICAgICAvLyAgICAgdGhpcy5wYXJhbSA9IFNHLnByZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2Usc2guZ2FtbWEpO1xuICAgICAgICAvLyAgICAgdGhpcy5zaW5HcmF0LmRhdGEuc2V0KHRoaXMucGFyYW0pO1xuICAgICAgICAvLyAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMuc2luR3JhdCxzaC54LTEuNSpzaC5yLHNoLnktMS41KnNoLnIpXG4gICAgICAgIC8vIH0pO1xuICAgICAgICBTRy5kZWZhdWx0KHRoaXMud2FzbSlcbiAgICAgICAgLnRoZW4oKCk9PntcbiAgICAgICAgICAgIC8vIGxldCB0MCA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih0MClcbiAgICAgICAgICAgIGlmKHRoaXMuaXNOb2lzZSlcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmFtID0gU0cucHJlX25vaXNlX3NpbmdyYXQoc2gucixzaC5waXhlbHNQZXJEZWdyZWUsc2guc3BhdGlhbEZyZXF1ZW5jeSxzaC5hbmdsZSxzaC5jb250cmFzdCxzaC5waGFzZSxzaC5sZXZlbCxzaC5nYW1tYSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5wYXJhbSA9IFNHLnByZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2Usc2guZ2FtbWEpO1xuICAgICAgICAgICAgdGhpcy5zaW5HcmF0LmRhdGEuc2V0KHRoaXMucGFyYW0pO1xuICAgICAgICAgICAgdGhpcy5jdHgucHV0SW1hZ2VEYXRhKHRoaXMuc2luR3JhdCxzaC54LTEuNSpzaC5yLHNoLnktMS41KnNoLnIpXG4gICAgICAgICAgICBjb25zb2xlLmRpcihcInN1Y2Nlc3NcIilcbiAgICAgICAgICAgIC8vIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodDEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodDEtdDApO1xuICAgICAgICB9KVxuICAgIH1cbiAgICBwbGF5KHRpbWVGcmVxdWVuY3ksdGltZSxmcHMpe1xuICAgICAgICBpZighdGltZUZyZXF1ZW5jeSlcbiAgICAgICAgICAgIHRpbWVGcmVxdWVuY3kgPSAxO1xuICAgICAgICBpZighdGltZSlcbiAgICAgICAgICAgIHRpbWUgPSAxMDAwXG4gICAgICAgIGlmKCFmcHMpXG4gICAgICAgICAgICBmcHMgPSA2MDtcbiAgICAgICAgbGV0IGludGVydmFsID0gMipNYXRoLlBJKnRpbWVGcmVxdWVuY3kvZnBzO1xuICAgICAgICBsZXQgZnBzTnVtID0gTWF0aC5mbG9vcih0aW1lLzEwMDAgKiBmcHMpO1xuICAgICAgICBsZXQgaW5kZXggPSAwO1xuICAgICAgICBsZXQgc2ggPSB0aGlzLnNoYXBlO1xuICAgICAgICBsZXQgdGhhdCA9IHRoaXM7XG4gICAgICAgIFNHLmRlZmF1bHQodGhpcy53YXNtKVxuICAgICAgICAudGhlbigoKT0+e1xuICAgICAgICAgICAgLy8gbGV0IHQwID0gcGVyZm9ybWFuY2Uubm93KClcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHQwKVxuICAgICAgICAgICAgaWYodGhpcy5pc05vaXNlKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGZwcztpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaW1nID0gU0cucHJlX25vaXNlX3NpbmdyYXQoc2gucixzaC5waXhlbHNQZXJEZWdyZWUsc2guc3BhdGlhbEZyZXF1ZW5jeSxzaC5hbmdsZSxzaC5jb250cmFzdCxzaC5waGFzZStpKmludGVydmFsLHNoLmxldmVsLHNoLmdhbW1hKTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZ0RhdGEgPSBuZXcgSW1hZ2VEYXRhKG5ldyBVaW50OENsYW1wZWRBcnJheShpbWcpLHRoaXMud2lkdGgsdGhpcy53aWR0aClcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbWdEYXRhTGlzdC5wdXNoKGltZ0RhdGEpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBmcHM7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGltZyA9IFNHLnByZV9zaW5ncmF0KHNoLnIsc2gucGl4ZWxzUGVyRGVncmVlLHNoLnNwYXRpYWxGcmVxdWVuY3ksc2guYW5nbGUsc2guY29udHJhc3Qsc2gucGhhc2UraSppbnRlcnZhbCxzaC5nYW1tYSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbWdEYXRhID0gbmV3IEltYWdlRGF0YShuZXcgVWludDhDbGFtcGVkQXJyYXkoaW1nKSx0aGlzLndpZHRoLHRoaXMud2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW1nRGF0YUxpc3QucHVzaChpbWdEYXRhKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGxldCB0MSA9IHBlcmZvcm1hbmNlLm5vdygpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodDEpO1xuICAgICAgICAgICAgLy8gY29uc29sZS5kaXIodDEtdDApO1xuICAgICAgICAgICAgKGFzeW5jICgpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZnBzTnVtO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaSAlIGZwcztcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5jdHgucHV0SW1hZ2VEYXRhKHRoYXQuaW1nRGF0YUxpc3RbaW5kZXhdLHNoLngtMS41KnNoLnIsc2gueS0xLjUqc2gucik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IFRJTUUuZGVsYXlfZnJhbWUoMSk7XG4gICAgICAgICAgICAgICAgICAgIHRoYXQucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gcmVhZFdhc20od2FzbSl7XG4vLyAgICAgY29uc29sZS5kaXIoJ3N1Y2Vlc3MhJyk7XG4vLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuLy8gICAgICAgICBmZXRjaCh3YXNtKS50aGVuKHJlcyA9PlxuLy8gICAgICAgICAgICAgcmVzLmFycmF5QnVmZmVyKClcbi8vICAgICAgICAgKS50aGVuKGJ5dGVzID0+IFxuLy8gICAgICAgICAgICAgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGUoYnl0ZXMsIHt9KVxuLy8gICAgICAgICApLnRoZW4ocmVzdWx0ID0+e1xuLy8gICAgICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcbi8vICAgICAgICAgICAgIGxldCB3YXNtID0gcmVzdWx0Lmluc3RhbmNlLmV4cG9ydHM7XG4vLyAgICAgICAgICAgICByZXMod2FzbSk7XG4vLyAgICAgICAgIH0pXG4vLyAgICAgfSlcbiAgICBcbi8vIH1cblxuXG4vLyBsZXQgY2FjaGVnZXRJbnQzMk1lbW9yeTAgPSBudWxsO1xuLy8gZnVuY3Rpb24gZ2V0SW50MzJNZW1vcnkwKHdhc20pIHtcbi8vICAgICBpZiAoY2FjaGVnZXRJbnQzMk1lbW9yeTAgPT09IG51bGwgfHwgY2FjaGVnZXRJbnQzMk1lbW9yeTAuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcbi8vICAgICAgICAgY2FjaGVnZXRJbnQzMk1lbW9yeTAgPSBuZXcgSW50MzJBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xuLy8gICAgIH1cbi8vICAgICByZXR1cm4gY2FjaGVnZXRJbnQzMk1lbW9yeTA7XG4vLyB9XG5cbi8vIGxldCBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG51bGw7XG4vLyBmdW5jdGlvbiBnZXRVaW50OE1lbW9yeTAod2FzbSkge1xuLy8gICAgIGlmIChjYWNoZWdldFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWdldFVpbnQ4TWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xuLy8gICAgICAgICBjYWNoZWdldFVpbnQ4TWVtb3J5MCA9IG5ldyBVaW50OEFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XG4vLyAgICAgfVxuLy8gICAgIHJldHVybiBjYWNoZWdldFVpbnQ4TWVtb3J5MDtcbi8vIH1cblxuLy8gZnVuY3Rpb24gZ2V0QXJyYXlVOEZyb21XYXNtMChwdHIsIGxlbiwgd2FzbSkge1xuLy8gICAgIHJldHVybiBnZXRVaW50OE1lbW9yeTAod2FzbSkuc3ViYXJyYXkocHRyIC8gMSwgcHRyIC8gMSArIGxlbik7XG4vLyB9IiwiaW1wb3J0IHsgQ2lyY2xlLCBtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXG5pbXBvcnQgeyBTaGFwZSxTdHlsZSxuYW1lU3R5bGUsT3B0cyB9IGZyb20gJy4uL0RhdGFUeXBlL2RhdGFUeXBlJ1xuaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tICcuLi9FbGVtZW50J1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUgfSBmcm9tICcuLi9UaW1lL3RpbWUnXG5pbXBvcnQgKiBhcyBlekp1ZGdlIGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiXG5cbmludGVyZmFjZSBSYW5kb21Eb3RTaGFwZSBleHRlbmRzIFNoYXBle1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXIsXG4gICAgcjogbnVtYmVyLFxuICAgIG1hc2tCYW5kPzogbnVtYmVyLFxuICAgIG51bWJlcj86IG51bWJlcixcbiAgICBtYXhTcGVlZD86IG51bWJlcixcbiAgICBtaW5TcGVlZD86IG51bWJlclxufVxuXG5pbnRlcmZhY2UgUG9pbnQge1xuICAgIHg6IG51bWJlcixcbiAgICB5OiBudW1iZXJcbn1cblxuaW50ZXJmYWNlIFJhbmRvbURvdE9wdHMgZXh0ZW5kcyBPcHRze1xuICAgIHNoYXBlOiBSYW5kb21Eb3RTaGFwZVxuICAgIHN0eWxlPzogU3R5bGVcbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbmV4cG9ydCBjbGFzcyBSYW5kb21Eb3QgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInJhbmRvbURvdFwiICsgbmFtZUlkLnRvU3RyaW5nKCksXG4gICAgICAgIGdyYXBoaWNJZDogbmFtZUlkXG4gICAgfVxuICAgIGRlY2xhcmUgc2hhcGU/OiBSYW5kb21Eb3RTaGFwZVxuICAgIFJhbmRvbURvdEFycmF5OiBBcnJheTxDaXJjbGU+XG4gICAgbWFza0JhbmQ6IENpcmNsZVxuICAgIHRyYW5zbGF0aW9uOiBBcnJheTxQb2ludD5cbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBSYW5kb21Eb3RPcHRzKXtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IG9wdHMuc2hhcGU7XG4gICAgICAgIHRoaXMuY3R4ID0gc3VwZXIuY3R4O1xuICAgICAgICBpZighdGhpcy5zaGFwZS5tYXNrQmFuZClcbiAgICAgICAgICAgIHRoaXMuc2hhcGUubWFza0JhbmQgPSA4O1xuICAgICAgICBpZighdGhpcy5zaGFwZS5udW1iZXIpXG4gICAgICAgICAgICB0aGlzLnNoYXBlLm51bWJlciA9IDEwO1xuICAgICAgICBpZighdGhpcy5zaGFwZS5tYXhTcGVlZClcbiAgICAgICAgICAgIHRoaXMuc2hhcGUubWF4U3BlZWQgPSA1O1xuICAgICAgICBpZighdGhpcy5zaGFwZS5taW5TcGVlZClcbiAgICAgICAgICAgIHRoaXMuc2hhcGUubWluU3BlZWQgPSAwO1xuXG4gICAgICAgIC8vIHRoaXMubWFza0JhbmQgPSBuZXcgQXJyYXkoKTtcblxuICAgICAgICB0aGlzLlJhbmRvbURvdEFycmF5ID0gcmFuZG9taXNlZFBvaW50KHRoaXMuc2hhcGUueCx0aGlzLnNoYXBlLnksdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUubWFza0JhbmQsdGhpcy5zaGFwZS5udW1iZXIpO1xuXG4gICAgICAgIHRoaXMubWFza0JhbmQgPSBuZXcgQ2lyY2xlKHtcbiAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgICAgICAgICAgICAgeDogdGhpcy5zaGFwZS54LFxuICAgICAgICAgICAgICAgIHk6IHRoaXMuc2hhcGUueSxcbiAgICAgICAgICAgICAgICByOiB0aGlzLnNoYXBlLnJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICAgICBzdHJva2U6IFwiIzg4ODg4OFwiLFxuICAgICAgICAgICAgICAgIGxpbmVXaWR0aDogdGhpcy5zaGFwZS5tYXNrQmFuZFxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAvLyB0aGlzLm1hc2tCYW5kWzFdID0gbmV3IENpcmNsZSh7XG4gICAgICAgIC8vICAgICBzaGFwZToge1xuICAgICAgICAvLyAgICAgICAgIHg6IHRoaXMuc2hhcGUueCxcbiAgICAgICAgLy8gICAgICAgICB5OiB0aGlzLnNoYXBlLnksXG4gICAgICAgIC8vICAgICAgICAgcjogdGhpcy5zaGFwZS5yK3RoaXMuc2hhcGUubWFza0JhbmQvMlxuICAgICAgICAvLyAgICAgfSxcbiAgICAgICAgLy8gICAgIHN0eWxlOiB7XG4gICAgICAgIC8vICAgICAgICAgc3Ryb2tlOiBcIiM4ODg4ODhcIixcbiAgICAgICAgLy8gICAgICAgICBsaW5lV2lkdGg6IHRoaXMuc2hhcGUubWFza0JhbmRcbiAgICAgICAgLy8gICAgIH1cbiAgICAgICAgLy8gfSlcblxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uID0gZ2V0UmFuZG9tKHRoaXMuc2hhcGUubWF4U3BlZWQsdGhpcy5zaGFwZS5taW5TcGVlZCx0aGlzLnNoYXBlLm51bWJlcik7XG5cbiAgICAgICAgdGhpcy5Jc0FuaW1hdGlvbiA9IHRydWU7XG5cbiAgICAgICAgbmFtZUlkKys7XG4gICAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcGxheVJhbmRvbURvdChyYW5kb21Eb3Q6IFJhbmRvbURvdCxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgcmFuZG9tRG90LmN0eCA9IGN0eDtcblxuICAgIGxldCBzaCA9IHJhbmRvbURvdC5zaGFwZTtcblxuICAgIC8vIG1ha2VDaXJjbGUocmFuZG9tRG90Lm1hc2tCYW5kWzBdLGN0eCk7XG4gICAgLy8gbWFrZUNpcmNsZShyYW5kb21Eb3QubWFza0JhbmRbMV0sY3R4KTtcblxuICAgIGxldCBmOkFycmF5PG51bWJlcj4gPSBuZXcgQXJyYXkoKTtcbiAgICBsZXQgdHJhbnM6QXJyYXk8UG9pbnQ+ID0gbmV3IEFycmF5KCk7XG5cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBzaC5udW1iZXI7aSsrKVxuICAgIHtcbiAgICAgICAgZi5wdXNoKDEpO1xuICAgICAgICB0cmFucy5wdXNoKHt4OnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS54LHk6cmFuZG9tRG90LnRyYW5zbGF0aW9uW2ldLnl9KTtcbiAgICB9XG5cbiAgICByYW5kb21Eb3QubWFza0JhbmQuY3R4ID0gY3R4O1xuXG4gICAgZm9yKGxldCBpID0gMDtpIDwgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5Lmxlbmd0aDtpKyspXG4gICAgICAgIHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5jdHggPSBjdHg7XG5cbiAgICAoYXN5bmMgKCk9PntcbiAgICAgICAgd2hpbGUocmFuZG9tRG90LklzQW5pbWF0aW9uKXtcbiAgICAgICAgICAgIHJhbmRvbUFuaW5tYXRpb24ocmFuZG9tRG90LHNoLHRyYW5zLGYpO1xuICAgICAgICAgICAgYXdhaXQgZGVsYXlfZnJhbWUoMSk7XG4gICAgICAgICAgICByYW5kb21Eb3QucmVtb3ZlKCk7XG4gICAgICAgICAgICByYW5kb21Eb3Quc3RvcmFnZS5wdXNoKHJhbmRvbURvdCk7XG4gICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChyYW5kb21Eb3QubWFza0JhbmQsY3R4KTtcbiAgICAgICAgICAgIGZvcihsZXQgaW5kZXggPSAwO2luZGV4IDwgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5Lmxlbmd0aDtpbmRleCsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpbmRleF0uY3R4ID0gY3R4O1xuICAgICAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpbmRleF0sY3R4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSkoKVxuXG4gICAgLy8gcmFuZG9tRG90LmFuaW1hdGUoKCk9PntcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgc2gubnVtYmVyO2krKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgbGV0IHggPSByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0uc2hhcGUueCt0cmFuc1tpXS54O1xuICAgIC8vICAgICAgICAgbGV0IHkgPSByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0uc2hhcGUueSt0cmFuc1tpXS55O1xuXG4gICAgLy8gICAgICAgICBpZigoTWF0aC5wb3coeC1zaC54LDIpK01hdGgucG93KHktc2gueSwyKSkgPj0gTWF0aC5wb3coc2guci1zaC5tYXNrQmFuZCwyKSlcbiAgICAvLyAgICAgICAgICAgICBmW2ldICo9ICgtMSk7XG5cbiAgICAvLyAgICAgICAgIHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS50cmFuc2xhdGUgPSB7XG4gICAgLy8gICAgICAgICAgICAgeDogdHJhbnNbaV0ueCxcbiAgICAvLyAgICAgICAgICAgICB5OiB0cmFuc1tpXS55XG4gICAgLy8gICAgICAgICB9XG5cbiAgICAvLyAgICAgICAgIHRyYW5zW2ldLnggPSB0cmFuc1tpXS54ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueDtcbiAgICAvLyAgICAgICAgIHRyYW5zW2ldLnkgPSB0cmFuc1tpXS55ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueTtcblxuICAgIC8vICAgICB9XG4gICAgLy8gfSwxKTtcbiAgICBcbn1cblxubGV0IHJhbmRvbUFuaW5tYXRpb24gPSAocmFuZG9tRG90OiBSYW5kb21Eb3Qsc2g6IFJhbmRvbURvdFNoYXBlLHRyYW5zOiBBcnJheTxQb2ludD4sZjpBcnJheTxudW1iZXI+KSA9PntcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBzaC5udW1iZXI7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IHggPSByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0uc2hhcGUueCt0cmFuc1tpXS54O1xuICAgICAgICBsZXQgeSA9IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5zaGFwZS55K3RyYW5zW2ldLnk7XG5cbiAgICAgICAgaWYoKE1hdGgucG93KHgtc2gueCwyKStNYXRoLnBvdyh5LXNoLnksMikpID49IE1hdGgucG93KHNoLnItc2gubWFza0JhbmQsMikpXG4gICAgICAgICAgICBmW2ldICo9ICgtMSk7XG5cbiAgICAgICAgcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLnRyYW5zbGF0ZSA9IHtcbiAgICAgICAgICAgIHg6IHRyYW5zW2ldLngsXG4gICAgICAgICAgICB5OiB0cmFuc1tpXS55XG4gICAgICAgIH1cblxuICAgICAgICB0cmFuc1tpXS54ID0gdHJhbnNbaV0ueCArIGZbaV0qcmFuZG9tRG90LnRyYW5zbGF0aW9uW2ldLng7XG4gICAgICAgIHRyYW5zW2ldLnkgPSB0cmFuc1tpXS55ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueTtcblxuICAgIH1cbn1cblxuLy8gZnVuY3Rpb24gcmFuZG9tQW5pbWF0aW9uKHJhbmRvbURvdDogUmFuZG9tRG90KXtcbi8vICAgICBsZXQgc2ggPSByYW5kb21Eb3Quc2hhcGU7XG5cbi8vICAgICBsZXQgZiA9IG5ldyBBcnJheSgpO1xuLy8gICAgIGxldCB0cmFucyA9IG5ldyBBcnJheSgpO1xuXG4vLyAgICAgZm9yKGxldCBpID0gMDtpIDwgc2gubnVtYmVyO2krKylcbi8vICAgICB7XG4vLyAgICAgICAgIGYucHVzaCgxKTtcbi8vICAgICAgICAgdHJhbnMucHVzaCh7eDpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueCx5OnJhbmRvbURvdC50cmFuc2xhdGlvbltpXS55fSk7XG4vLyAgICAgfVxuICAgIFxuLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IHNoLm51bWJlcjtpKyspXG4vLyAgICAge1xuLy8gICAgICAgICBsZXQgeCA9IHJhbmRvbURvdC5SYW5kb21Eb3RBcnJheVtpXS5zaGFwZS54K3RyYW5zW2ldLng7XG4vLyAgICAgICAgIGxldCB5ID0gcmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2ldLnNoYXBlLnkrdHJhbnNbaV0ueTtcblxuLy8gICAgICAgICBpZigoTWF0aC5wb3coeC1zaC54LDIpK01hdGgucG93KHktc2gueSwyKSkgPj0gTWF0aC5wb3coc2guci1zaC5tYXNrQmFuZCwyKSlcbi8vICAgICAgICAgICAgIGZbaV0gKj0gKC0xKTtcblxuLy8gICAgICAgICByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaV0udHJhbnNsYXRlID0ge1xuLy8gICAgICAgICAgICAgeDogdHJhbnNbaV0ueCxcbi8vICAgICAgICAgICAgIHk6IHRyYW5zW2ldLnlcbi8vICAgICAgICAgfVxuXG4vLyAgICAgICAgIC8vIGNvbnNvbGUuZGlyKGZbaV0qdHJhbnNsYXRlWFtpXSlcblxuLy8gICAgICAgICB0cmFuc1tpXS54ID0gdHJhbnNbaV0ueCArIGZbaV0qcmFuZG9tRG90LnRyYW5zbGF0aW9uW2ldLng7XG4vLyAgICAgICAgIHRyYW5zW2ldLnkgPSB0cmFuc1tpXS55ICsgZltpXSpyYW5kb21Eb3QudHJhbnNsYXRpb25baV0ueTtcblxuLy8gICAgIH1cbi8vIH1cblxuZnVuY3Rpb24gcmFuZG9taXNlZFBvaW50KHg6bnVtYmVyLHk6bnVtYmVyLHJhZGl1czpudW1iZXIsbWFza0JhbmQ6bnVtYmVyLG51bWJlcjpudW1iZXIpOkFycmF5PENpcmNsZT57XG4gICAgbGV0IGFyciA9IGdldE5vblJlcGV0aXRpdmVSYW5kb20ocmFkaXVzLW1hc2tCYW5kLHJhZGl1cyxudW1iZXIpO1xuICAgIGxldCBkb3QgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1iZXI7aSsrKVxuICAgIHtcbiAgICAgICAgZG90W2ldID0gbmV3IENpcmNsZSh7XG4gICAgICAgICAgICBzaGFwZToge1xuICAgICAgICAgICAgICAgIHg6IHgtcmFkaXVzK2FycltpXS54LFxuICAgICAgICAgICAgICAgIHk6IHktcmFkaXVzK2FycltpXS55LFxuICAgICAgICAgICAgICAgIHI6IDJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzdHlsZToge1xuICAgICAgICAgICAgICAgIGZpbGw6IFwiIzAwMDAwMFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJldHVybiBkb3Q7XG59XG5cbmZ1bmN0aW9uIGRvdEFyZWEocjpudW1iZXIscmFkaXVzOm51bWJlcik6QXJyYXk8UG9pbnQ+e1xuICAgIGxldCBhcnI6QXJyYXk8UG9pbnQ+ID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgMipyO2krKylcbiAgICB7XG4gICAgICAgIGZvcihsZXQgaiA9IDA7aiA8IDIqcjtqKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCByMiA9IE1hdGgucG93KGktcmFkaXVzLDIpICsgTWF0aC5wb3coai1yYWRpdXMsMilcbiAgICAgICAgICAgIGlmKHIyIDw9IE1hdGgucG93KHIsMikpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYXJyLnB1c2goe3g6aSx5Omp9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGdldE5vblJlcGV0aXRpdmVSYW5kb20ocjpudW1iZXIscmFkaXVzOm51bWJlcixudW1iZXI6bnVtYmVyKTpBcnJheTxQb2ludD57XG4gICAgbGV0IGFycjpBcnJheTxQb2ludD4gPSBuZXcgQXJyYXkoKTtcblxuICAgIGxldCB0ZW1wbGF0ZSA9IGRvdEFyZWEocixyYWRpdXMpO1xuXG4gICAgZm9yKGxldCBpID0gMDtpIDwgbnVtYmVyO2krKylcbiAgICB7XG4gICAgICAgIGxldCBpbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp0ZW1wbGF0ZS5sZW5ndGgpO1xuICAgICAgICBhcnIucHVzaCh0ZW1wbGF0ZVtpbmRleF0pO1xuICAgICAgICB0ZW1wbGF0ZS5zcGxpY2UoaW5kZXgsMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gZ2V0UmFuZG9tKG1heFNwZWVkOm51bWJlcixtaW5TcGVlZDpudW1iZXIsbnVtYmVyOm51bWJlcik6QXJyYXk8UG9pbnQ+e1xuICAgIGxldCBhcnI6QXJyYXk8UG9pbnQ+ID0gbmV3IEFycmF5KCk7XG5cbiAgICBmb3IobGV0IGkgPSAwO2kgPCBudW1iZXI7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IHggPSBzZXRSYW5kb20obWF4U3BlZWQsbWluU3BlZWQpO1xuICAgICAgICBsZXQgeSA9IHNldFJhbmRvbShtYXhTcGVlZCxtaW5TcGVlZCk7XG4gICAgICAgIGFyci5wdXNoKHt4OngseTp5fSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbn1cblxuZnVuY3Rpb24gc2V0UmFuZG9tKG1heFNwZWVkOm51bWJlcixtaW5TcGVlZDpudW1iZXIpOm51bWJlcntcbiAgICBsZXQgbnVtID0gTWF0aC5yYW5kb20oKSoobWF4U3BlZWQtbWluU3BlZWQpICsgbWluU3BlZWQ7XG4gICAgbGV0IHNpZ25GID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpKTtcbiAgICBsZXQgc2lnbiA9IDA7XG4gICAgaWYoc2lnbkYpXG4gICAgICAgIHNpZ24gPSAxO1xuICAgIGVsc2VcbiAgICAgICAgc2lnbiA9IC0xO1xuICAgIG51bSAqPSBzaWduO1xuICAgIHJldHVybiBudW07XG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgZGVsYXlfZnJhbWUgfSBmcm9tIFwiLi4vVGltZS90aW1lXCI7XG5pbXBvcnQgeyBTaGFwZSxPcHRzLG5hbWVTdHlsZSxTdHlsZSB9IGZyb20gXCIuLi9EYXRhVHlwZS9kYXRhVHlwZVwiO1xuXG5cbmludGVyZmFjZSBHcmF0U2hhcGUgZXh0ZW5kcyBTaGFwZXtcbiAgICB4OiBudW1iZXIsXG4gICAgeTogbnVtYmVyLFxuICAgIHI6IG51bWJlcixcbiAgICBwaXhlbHNQZXJEZWdyZWU/OiBudW1iZXIsIFxuICAgIHNwYXRpYWxGcmVxdWVuY3k/OiBudW1iZXIsXG4gICAgYW5nbGU/OiBudW1iZXIsIFxuICAgIGNvbnRyYXN0PzogbnVtYmVyLCBcbiAgICBwaGFzZT86IG51bWJlcixcbiAgICBsZXZlbD86IG51bWJlclxufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdyYXRPcHRzIGV4dGVuZHMgT3B0c3tcbiAgICBzaGFwZTogR3JhdFNoYXBlLFxuICAgIHN0eWxlPzogU3R5bGUsXG4gICAgaXNOb2lzZT86IGJvb2xlYW5cbn1cblxubGV0IG5hbWVJZCA9IDA7XG5cbi8v5YWJ5qCFXG4vL3BpeGVsc1BlckRlZ3JlZT01Nywgc3BhdGlhbEZyZXF1ZW5jeT0xIOWvueW6lOS4gOW6puinhuinklxuZXhwb3J0IGNsYXNzIHNpbkdyYXQgZXh0ZW5kcyBFbGVtZW50c3tcbiAgICByZWFkb25seSBuYW1lPzogbmFtZVN0eWxlID0ge1xuICAgICAgICBuYW1lOiBcInNpbmdyYXRcIiArIG5hbWVJZC50b1N0cmluZygpLFxuICAgICAgICBncmFwaGljSWQ6IG5hbWVJZFxuICAgIH1cbiAgICBzaW5HcmF0OiBJbWFnZURhdGE7ICAgICAgICAvL+WFieagheWbvueJh+aVsOaNrlxuICAgIGltZ0RhdGFMaXN0OiBBcnJheTxJbWFnZURhdGE+OyAgICAvL+eUqOS6juWCqOWtmOWPguS4juWKqOeUu+eahOWbvueJh1xuICAgIGlzTm9pc2U6IGJvb2xlYW47XG4gICAgLy8gc2luZ3JhdFBhcmFtOyAgIC8v55So5LqO5YKo5a2YIOW3puS4iuinkuWdkOaghywg5Y2K5b6ELCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIOinkuW6piwg5a+55q+U5bqmLCDnm7jkvY3nrYnkv6Hmga9cbiAgICAvLyBsZXZlbDsgICAgICAgICAgLy/lmarlo7DnrYnnuqco5q2k57G75Z6L6buY6K6k5Li6MClcbiAgICBjb25zdHJ1Y3RvcihvcHRzOiBHcmF0T3B0cyl7XG4gICAgICAgIC8veCx55Li65YWJ5qCF55qE5bem5LiK6KeS5Z2Q5qCHLCDljYrlvoQsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwg6KeS5bqmLCDlr7nmr5TluqYsIOebuOS9jVxuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnNoYXBlID0gb3B0cy5zaGFwZTtcbiAgICAgICAgbGV0IHNoID0gdGhpcy5zaGFwZTtcbiAgICAgICAgaWYoIW9wdHMuaXNOb2lzZSlcbiAgICAgICAgICAgIHRoaXMuaXNOb2lzZSA9IGZhbHNlXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuaXNOb2lzZSA9IG9wdHMuaXNOb2lzZVxuICAgICAgICBcbiAgICAgICAgaWYoIXRoaXMuaXNOb2lzZSlcbiAgICAgICAgICAgIHRoaXMuc2luR3JhdCA9IGdldFNpbmdyYXQoc2guciwgc2gucGl4ZWxzUGVyRGVncmVlLCBzaC5zcGF0aWFsRnJlcXVlbmN5LCBzaC5hbmdsZSwgc2guY29udHJhc3QsIHNoLnBoYXNlKVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgaWYoIXNoLmxldmVsKVxuICAgICAgICAgICAgICAgIHNoLmxldmVsID0gMVxuICAgICAgICAgICAgdGhpcy5zaW5HcmF0ID0gZ2V0Tm9pc2VTaW5ncmF0KHNoLnIsIHNoLnBpeGVsc1BlckRlZ3JlZSwgc2guc3BhdGlhbEZyZXF1ZW5jeSwgc2guYW5nbGUsIHNoLmNvbnRyYXN0LCBzaC5waGFzZSwgc2gubGV2ZWwpICAgIFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW1nRGF0YUxpc3QgPSBuZXcgQXJyYXk8SW1hZ2VEYXRhPigpO1xuICAgICAgICBuYW1lSWQrKztcbiAgICB9XG4gICAgLy/nu5jliLbmlrnms5UsIOWPguaVsGN0eOS4umNhbnZhcy5nZXRDb250ZXh0KCcyZCcpXG4gICAgZHJhdygpe1xuICAgICAgICB0aGlzLmN0eC5wdXRJbWFnZURhdGEodGhpcy5zaW5HcmF0LHRoaXMuc2hhcGUueCAtIDIuNSAqIHRoaXMuc2hhcGUucix0aGlzLnNoYXBlLnkgLSAyLjUgKiB0aGlzLnNoYXBlLnIpXG4gICAgfVxuICAgIC8v57uZ5Y6f5pyJ5YWJ5qCF5Yqg5LiK5Zmq5aOwLCDlj4LmlbBsZXZlbOS4uuWZquWjsOetiee6p1xuICAgIGltTm9pc2UobGV2ZWwpe1xuICAgICAgICBsZXQgdGggPSB0aGlzLnNoYXBlXG4gICAgICAgIHRoaXMuaXNOb2lzZSA9IHRydWVcbiAgICAgICAgdGhpcy5zaW5HcmF0ID0gZ2V0Tm9pc2VTaW5ncmF0KHRoLnIsIHRoLnBpeGVsc1BlckRlZ3JlZSwgdGguc3BhdGlhbEZyZXF1ZW5jeSwgdGguYW5nbGUsIHRoLmNvbnRyYXN0LCB0aC5waGFzZSwgbGV2ZWwpXG4gICAgICAgIHRoLmxldmVsID0gbGV2ZWw7XG4gICAgfVxuICAgIC8v6L+Q5Yqo5pa55rOVLCDlj4LmlbBjdHjkuLpjYW52YXMuZ2V0Q29udGV4dCgnMmQnKSDlj4LmlbBjeWNsZeS4uuavj+enkui/kOihjOWFieagheeahOWRqOacn+aVsCjpu5jorqTkuLoxKVxuICAgIHBsYXkodGltZUZyZXF1ZW5jeSx0aW1lKXtcbiAgICAgICAgaWYoIXRpbWVGcmVxdWVuY3kpXG4gICAgICAgICAgICB0aW1lRnJlcXVlbmN5ID0gMTtcbiAgICAgICAgaWYoIXRpbWUpXG4gICAgICAgICAgICB0aW1lID0gMTAwMDtcbiAgICAgICAgbGV0IGZwcyA9IDYwO1xuICAgICAgICBsZXQgZnBzbnVtID0gTWF0aC5mbG9vcih0aW1lLzEwMDAgKiBmcHMpO1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAyKk1hdGguUEkqdGltZUZyZXF1ZW5jeS9mcHM7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICAvLyBsZXQgbnVtID0gTWF0aC5mbG9vcig2MC90aW1lRnJlcXVlbmN5KTtcbiAgICAgICAgbGV0IHRoID0gdGhpcy5zaGFwZVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBmcHM7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLmlzTm9pc2UpXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdEYXRhTGlzdC5wdXNoKGdldE5vaXNlU2luZ3JhdCh0aC5yLCB0aC5waXhlbHNQZXJEZWdyZWUsIHRoLnNwYXRpYWxGcmVxdWVuY3ksIHRoLmFuZ2xlLCB0aC5jb250cmFzdCwgdGgucGhhc2UraSppbnRlcnZhbCwgdGhpcy5zaGFwZS5sZXZlbCkpXG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5pbWdEYXRhTGlzdC5wdXNoKGdldFNpbmdyYXQodGguciwgdGgucGl4ZWxzUGVyRGVncmVlLCB0aC5zcGF0aWFsRnJlcXVlbmN5LCB0aC5hbmdsZSwgdGguY29udHJhc3QsIHRoLnBoYXNlK2kqaW50ZXJ2YWwpKVxuICAgICAgICB9XG4gICAgICAgIC8v5byC5q2l5Ye95pWwXG4gICAgICAgIChhc3luYyBmdW5jdGlvbigpe1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZnBzbnVtO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBpID0gaSVmcHM7XG4gICAgICAgICAgICAgICAgbGV0IGluZGV4ID0gaSVmcHM7XG4gICAgICAgICAgICAgICAgY3R4LnB1dEltYWdlRGF0YSh0aGF0LmltZ0RhdGFMaXN0W2luZGV4XSx0aGF0LnNoYXBlLnggLSAyLjUgKiB0aGF0LnNoYXBlLnIsdGhhdC5zaGFwZS55IC0gMi41ICogdGhhdC5zaGFwZS5yKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoYXQuc3RvcmFnZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBkZWxheV9mcmFtZSgxKTtcbiAgICAgICAgICAgICAgICB0aGF0LmNsZWFyKGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSkoKSAgICBcbiAgICB9XG4gICAgLy/muIXpmaTlhYnmoIXmiYDlnKjkvY3nva7nmoTnn6nlvaLljLrln59cbiAgICBjbGVhcihjdHgpXG4gICAge1xuICAgICAgICBsZXQgd2lkdGggPSAyKigyLjUqdGhpcy5zaGFwZS5yKSsxXG4gICAgICAgIGxldCBoZWlnaHQgPSAyKigyLjUqdGhpcy5zaGFwZS5yKSsxXG4gICAgICAgIGN0eC5jbGVhclJlY3QodGhpcy5zaGFwZS54IC0gMi41ICogdGhpcy5zaGFwZS5yLHRoaXMuc2hhcGUueSAtIDIuNSAqIHRoaXMuc2hhcGUucix3aWR0aCxoZWlnaHQpO1xuICAgIH1cbn1cblxuLy/nlJ/miJDlmarlo7DlhYnmoIUsIOWPguaVsDog5Y2K5b6ELCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIOinkuW6piwg5a+55q+U5bqmLCDnm7jkvY0sIOWZquWjsOetiee6p1xuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIGdldE5vaXNlU2luZ3JhdChyYWRpdXMsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwgYW5nbGUsIGNvbnRyYXN0LCBwaGFzZSwgbGV2ZWwpXG57XG4gICAgaWYobGV2ZWwgPT09IHVuZGVmaW5lZClcbiAgICAgICAgbGV2ZWwgPSAxO1xuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgbGV0IHcgPSAyICogTWF0aC5QSSAqIHNwYXRpYWxGcmVxdWVuY3kgLyBwaXhlbHNQZXJEZWdyZWU7XG4gICAgbGV0IGEgPSBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApICogdztcbiAgICBsZXQgYiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBwYXJhbSA9IG5ldyBBcnJheSgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgeC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwYXJhbVtpXSA9IDAuNSArIDAuNSAqIG1hc2tbaV0gKiBjb250cmFzdCAqIE1hdGguc2luKGEgKiB4W2ldICsgYiAqIHlbaV0gKyBwaGFzZSk7XG4gICAgfVxuICAgIGxldCBub2lzZSA9IGdldE5vaXNlKHJhZGl1cyk7XG4gICAgbGV0IG5vaXNlU2luR3JhdCA9IEdyYXRBZGROb2lzZShwYXJhbSxub2lzZSxyYWRpdXMsbGV2ZWwpO1xuICAgIHJldHVybiBub2lzZVNpbkdyYXQ7XG59XG5cbi8v5YWJ5qCF5Yqg5Zmq5aOwLCDlj4LmlbA6IOWFieagheeBsOW6puS/oeaBrywg5Zmq5aOw54Gw5bqm5L+h5oGvLCDljYrlvoQsIOWZquWjsOetiee6p1xuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIEdyYXRBZGROb2lzZShwYXJhbSxub2lzZSxyYWRpdXMsbGV2ZWwpe1xuICAgIGxldCBjID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgYy53aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgYy5oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICBsZXQgY3R4ID0gYy5nZXRDb250ZXh0KCcyZCcpXG4gICAgbGV0IE5vaXNlR3JhdERlZ3JlZSA9IG5ldyBBcnJheSgpXG4gICAgbGV0IGkgPSAwO1xuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IE0gPSAyKmltYWdlc2l6ZSsxO1xuICAgIGxldCBOb2lzZUdyYXQgPSBjdHguY3JlYXRlSW1hZ2VEYXRhKE0sTSk7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IG1hc2sgPSBuZXcgQXJyYXkoKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgLy/nm7jliqBcbiAgICBmb3IoaSA9IDA7aSA8IE0qTTtpKyspe1xuICAgICAgICBpZihwYXJhbVtpXT4wLjUpXG4gICAgICAgICAgICBOb2lzZUdyYXREZWdyZWVbaV0gPSAwLjUrbGV2ZWwqbm9pc2VbaV1cbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgTm9pc2VHcmF0RGVncmVlW2ldID0gKHBhcmFtW2ldK2xldmVsKm5vaXNlW2ldKVxuICAgICAgICAgICAgLy8gTm9pc2VHcmF0RGVncmVlW2ldID0gTm9pc2VHcmF0RGVncmVlW2ldKzAuNSptYXNrW2ldIFxuICAgIH1cbiAgICBmb3IgKGxldCBpPTAsaj0wO2k8Tm9pc2VHcmF0LmRhdGEubGVuZ3RoO2krPTQsaisrKVxuICAgIHtcbiAgICAgICAgTm9pc2VHcmF0LmRhdGFbaSswXT1Ob2lzZUdyYXREZWdyZWVbal0qMjU1O1xuICAgICAgICBOb2lzZUdyYXQuZGF0YVtpKzFdPU5vaXNlR3JhdERlZ3JlZVtqXSoyNTU7XG4gICAgICAgIE5vaXNlR3JhdC5kYXRhW2krMl09Tm9pc2VHcmF0RGVncmVlW2pdKjI1NTtcbiAgICAgICAgTm9pc2VHcmF0LmRhdGFbaSszXT0yNTU7XG4gICAgfVxuICAgIC8vIE5vaXNlR3JhdCA9IFRvQ2lyY2xlKE5vaXNlR3JhdCxyYWRpdXMpXG4gICAgcmV0dXJuIE5vaXNlR3JhdDtcbn1cblxuLy/nlJ/miJDlmarlo7Dlm77niYcsIOWPguaVsDog5Y2K5b6EXG4vL+i/lOWbnuWZquWjsOeBsOW6puaVsOe7hFxuZnVuY3Rpb24gZ2V0Tm9pc2UocmFkaXVzKXtcbiAgICBsZXQgbm9pc2UgPSBuZXcgQXJyYXkoKVxuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgbGV0IG1hc2tCYW5kID0gMS41ICogcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gsIHldID0gbWVzaGdyaWQoaW1hZ2VzaXplKTtcbiAgICBmb3IobGV0IGkgPSAwO2kgPCB4Lmxlbmd0aDtpKyspXG4gICAge1xuICAgICAgICBsZXQgbSA9IE1hdGgucG93KHhbaV0sMikrTWF0aC5wb3coeVtpXSwyKTtcbiAgICAgICAgbGV0IG4gPSBNYXRoLnBvdyhyYWRpdXMsMik7XG4gICAgICAgIG1hc2sucHVzaChNYXRoLmV4cCgtbS9uKSk7XG4gICAgICAgIG1hc2tbaV0gKj0gTWF0aC5FO1xuICAgICAgICBpZihtYXNrW2ldID49IDEpXG4gICAgICAgICAgICBtYXNrW2ldID0gMTtcbiAgICB9XG4gICAgZm9yKGxldCBpID0gMDtpIDwgbWFzay5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IGdyZXlEZWdyZWUgPSBtYXNrW2ldKk1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSogMjU2KS8yNTU7XG4gICAgICAgIG5vaXNlLnB1c2goZ3JleURlZ3JlZSlcbiAgICB9XG4gICAgLy8gZm9yIChsZXQgaT0wO2kgPCA0KihpbWFnZXNpemUqMisxKSooaW1hZ2VzaXplKjIrMSk7aSs9NClcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBncmV5RGVncmVlID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKiAyNTYpOyBcbiAgICAvLyAgICAgbm9pc2UucHVzaChncmV5RGVncmVlLzI1NSk7XG4gICAgLy8gfVxuICAgIC8vIGNvbnNvbGUuZGlyKG5vaXNlKVxuICAgIHJldHVybiBub2lzZTtcbn1cblxuLy/nlJ/miJDlhYnmoIUg5Y+C5pWwOiDljYrlvoQsIHBpeGVsc1BlckRlZ3JlZSwgc3BhdGlhbEZyZXF1ZW5jeSwg6KeS5bqmLCDlr7nmr5TluqYsIOebuOS9jVxuLy/ov5Tlm55pbWFnZURhdGHlm77niYfkv6Hmga9cbmZ1bmN0aW9uIGdldFNpbmdyYXQocmFkaXVzLCBwaXhlbHNQZXJEZWdyZWUsIHNwYXRpYWxGcmVxdWVuY3ksIGFuZ2xlLCBjb250cmFzdCwgcGhhc2UpIHtcbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGxldCBtYXNrQmFuZCA9IDEuNSAqIHJhZGl1cztcbiAgICBsZXQgaW1hZ2VzaXplID0gcmFkaXVzICsgbWFza0JhbmQ7XG4gICAgbGV0IFt4LCB5XSA9IG1lc2hncmlkKGltYWdlc2l6ZSk7XG4gICAgbGV0IHcgPSAyICogTWF0aC5QSSAqIHNwYXRpYWxGcmVxdWVuY3kgLyBwaXhlbHNQZXJEZWdyZWU7XG4gICAgbGV0IGEgPSBNYXRoLmNvcyhhbmdsZSAqIE1hdGguUEkgLyAxODApICogdztcbiAgICBsZXQgYiA9IE1hdGguc2luKGFuZ2xlICogTWF0aC5QSSAvIDE4MCkgKiB3O1xuICAgIGxldCBwYXJhbSA9IG5ldyBBcnJheSgpO1xuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgeC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnBvdyh4W2ldLDIpK01hdGgucG93KHlbaV0sMik7XG4gICAgICAgIGxldCBuID0gTWF0aC5wb3cocmFkaXVzLDIpO1xuICAgICAgICBtYXNrLnB1c2goTWF0aC5leHAoLW0vbikpO1xuICAgICAgICBtYXNrW2ldICo9IE1hdGguRTtcbiAgICAgICAgaWYobWFza1tpXSA+PSAxKVxuICAgICAgICAgICAgbWFza1tpXSA9IDE7XG4gICAgfVxuICAgIC8vIGxldCBtYXNrU2hhZG93ID0gbWFzayhyYWRpdXMpO1xuICAgIC8vIGNvbnNvbGUuZGlyKG1hc2tTaGFkb3cpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB4Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHBhcmFtW2ldID0gMC41ICsgMC41ICogY29udHJhc3QgKiBtYXNrW2ldICogTWF0aC5zaW4oYSAqIHhbaV0gKyBiICogeVtpXSArIHBoYXNlKTtcbiAgICB9XG4gICAgLy8gbGV0IG1hc2tTaGFkb3cgPSBtYXNrKHJhZGl1cylcbiAgICAvLyBmb3IobGV0IClcbiAgICBsZXQgaW1nRGF0YSA9IGN0eC5jcmVhdGVJbWFnZURhdGEoaW1hZ2VzaXplICogMiArIDEsIGltYWdlc2l6ZSAqIDIgKyAxKTtcbiAgICBmb3IgKGxldCBpID0gMCwgaiA9IDA7IGkgPCBpbWdEYXRhLmRhdGEubGVuZ3RoOyBpICs9IDQsIGorKykge1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDBdID0gcGFyYW1bal0gKiAyNTU7XG4gICAgICAgIGltZ0RhdGEuZGF0YVtpICsgMV0gPSBwYXJhbVtqXSAqIDI1NTtcbiAgICAgICAgaW1nRGF0YS5kYXRhW2kgKyAyXSA9IHBhcmFtW2pdICogMjU1O1xuICAgICAgICBpbWdEYXRhLmRhdGFbaSArIDNdID0gMjU1O1xuICAgIH1cbiAgICAvLyBpbWdEYXRhID0gVG9DaXJjbGUoaW1nRGF0YSxyYWRpdXMvMilcbiAgICByZXR1cm4gaW1nRGF0YTtcbn1cblxuLy/lvIPnlKggICAgIOWwhuefqeW9ouWFieagheWItuaIkOWchuW9olxuZnVuY3Rpb24gVG9DaXJjbGUoaW1nRGF0YSxyYWRpdXMpe1xuICAgIC8vIGxldCBtID0gMDtcbiAgICAvLyBsZXQgUiA9IHJhZGl1cztcbiAgICAvLyBmb3IobGV0IHkgPSAwO3kgPCBpbWdEYXRhLmhlaWdodDt5KyspXG4gICAgLy8ge1xuICAgIC8vICAgICBmb3IobGV0IHggPSAwO3ggPCBpbWdEYXRhLndpZHRoO3grKylcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgbSA9IE1hdGguc3FydChNYXRoLnBvdyh4LXJhZGl1cywyKSArIE1hdGgucG93KHktcmFkaXVzLDIpKTtcbiAgICAvLyAgICAgICAgIGlmKG0gPj0gUilcbiAgICAvLyAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICBpbWdEYXRhLmRhdGFbNCp5KmltZ0RhdGEud2lkdGgrNCp4KzNdID0gMDtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBsZXQgYyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGMud2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIGMuaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgbGV0IGN0eCA9IGMuZ2V0Q29udGV4dCgnMmQnKVxuICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nRGF0YSwwLDApXG4gICAgY3R4Lmdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiA9ICdkZXN0aW5hdGlvbi1hdG9wJ1xuICAgIGN0eC5hcmMocmFkaXVzKzAuNSxyYWRpdXMrMC41LHJhZGl1cywwLDIqTWF0aC5QSSk7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICdibGFjayc7XG4gICAgY3R4LmZpbGwoKVxuICAgIGltZ0RhdGEgPSBjdHguZ2V0SW1hZ2VEYXRhKDAsMCwyKnJhZGl1cysxLDIqcmFkaXVzKzEpXG5cbiAgICByZXR1cm4gaW1nRGF0YTtcbn1cblxuLy/nlJ/miJDkuozpmLbpq5jmlq/liIbluIMg5Y+C5pWwOiDljYrlvoRcbi8v6L+U5Zue5LqM6Zi25YiG5biD5YC855qE5pWw57uEXG5mdW5jdGlvbiBtYXNrKHJhZGl1cyl7XG4gICAgbGV0IG1hc2tCYW5kID0gcmFkaXVzO1xuICAgIGxldCBpbWFnZXNpemUgPSByYWRpdXMgKyBtYXNrQmFuZDtcbiAgICBsZXQgW3gseV0gPSBtZXNoZ3JpZChpbWFnZXNpemUpO1xuICAgIGxldCBtYXNrID0gbmV3IEFycmF5KCk7XG4gICAgZm9yKGxldCBpID0gMDtpIDwgeC5sZW5ndGg7aSsrKVxuICAgIHtcbiAgICAgICAgbGV0IG0gPSBNYXRoLnBvdyh4W2ldLDIpK01hdGgucG93KHlbaV0sMik7XG4gICAgICAgIGxldCBuID0gTWF0aC5wb3cocmFkaXVzLDIpO1xuICAgICAgICBtYXNrLnB1c2goTWF0aC5leHAoLW0vbikpO1xuICAgICAgICBtYXNrW2ldICo9IE1hdGguRTtcbiAgICAgICAgaWYobWFza1tpXSA+PSAxKVxuICAgICAgICAgICAgbWFza1tpXSA9IDE7XG4gICAgfVxuICAgIHJldHVybiBtYXNrO1xufVxuXG4vL+eUn+aIkOe9keagvOmHh+agt+eCuSDlj4LmlbA6IOWNiuW+hFxuLy/ov5Tlm554LCB55Lik5Liq6YeH5qC35pWw57uEXG5mdW5jdGlvbiBtZXNoZ3JpZChyYWRpdXMpIHtcbiAgICBsZXQgeCA9IG5ldyBBcnJheSgpO1xuICAgIGxldCB5ID0gbmV3IEFycmF5KCk7XG4gICAgZm9yIChsZXQgaSA9IC1yYWRpdXM7IGkgPD0gcmFkaXVzOyBpKyspIHtcbiAgICAgICAgZm9yIChsZXQgaiA9IC1yYWRpdXM7IGogPD0gcmFkaXVzOyBqKyspIHtcbiAgICAgICAgICAgIHgucHVzaChpKTtcbiAgICAgICAgICAgIHkucHVzaChqKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gW3gsIHldO1xufVxuIiwiaW1wb3J0IHtjYW52YXNTdHlsZX0gZnJvbSAnLi4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IERpdlN0eWxlIH0gZnJvbSAnLi4vRGl2L2RpdidcbmltcG9ydCB7IFJlY3RhbmdsZSxtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9yZWN0YW5nbGUnXG5pbXBvcnQgeyBHcm91cCB9IGZyb20gJy4uL0dyb3VwL2dyb3VwJyBcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi4vRWxlbWVudCdcbmltcG9ydCB7IENpcmNsZSxtYWtlQ2lyY2xlIH0gZnJvbSAnLi4vR3JhcGhpYy9jaXJjbGUnXG5pbXBvcnQgeyBMaW5lLCBtYWtlTGluZX0gZnJvbSAnLi4vR3JhcGhpYy9saW5lJ1xuaW1wb3J0IHsgQXJjLCBtYWtlQXJjIH0gZnJvbSAnLi4vR3JhcGhpYy9hcmMnXG5pbXBvcnQgeyBFbGxpcHNlLCBtYWtlRWxsaXBzZSB9IGZyb20gJy4uL0dyYXBoaWMvZWxsaXBzZSdcbmltcG9ydCB7IG1ha2VQb2x5Z29uLCBQb2x5Z29uIH0gZnJvbSAnLi4vR3JhcGhpYy9wb2x5Z29uJ1xuaW1wb3J0IHsgbWFrZVRleHQsIFRleHRzIH0gZnJvbSAnLi4vR3JhcGhpYy90ZXh0J1xuaW1wb3J0IHsgSW1nLCBtYWtlSW1nIH0gZnJvbSAnLi4vR3JhcGhpYy9pbWFnZSdcbmltcG9ydCB7IGNvbnRlbnRTdHlsZSB9IGZyb20gJy4uL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuaW1wb3J0IHsgR3JhdCwgbWFrZUdyYXQgfSBmcm9tICcuLi9HcmFwaGljL2dyYXRpbmcnXG5pbXBvcnQgeyBzaW5HcmF0aW5nIH0gZnJvbSAnLi4vR3JhcGhpYy9zaW5HcmF0aW5nJ1xuaW1wb3J0IHsgcGxheVJhbmRvbURvdCwgUmFuZG9tRG90IH0gZnJvbSAnLi4vR3JhcGhpYy9yYW5kb21Eb3QnXG5pbXBvcnQgKiBhcyBlelNpbkdyYXQgZnJvbSAnLi4vR3JhcGhpYy9zaW5HcmF0J1xuaW1wb3J0ICogYXMgZXpDYW52YXMgZnJvbSAnLi4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCB7IERsZ0NvbnRlbnQgfSBmcm9tICcuLi9EaWFsb2d1ZS9kaWFsb2d1ZTAnXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNhbnZhc1N0eWxlKGNTdHlsZTogY2FudmFzU3R5bGUpOmNhbnZhc1N0eWxle1xuICAgIGlmKCFjU3R5bGUpIFxuICAgIHtcbiAgICAgICAgY1N0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogNDAwXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoIWNTdHlsZS53aWR0aClcbiAgICB7XG4gICAgICAgIGNTdHlsZS53aWR0aCA9IDQwMFxuICAgIH1cbiAgICBpZighY1N0eWxlLmhlaWdodClcbiAgICB7XG4gICAgICAgIGNTdHlsZS5oZWlnaHQgPSA0MDBcbiAgICB9XG4gICAgcmV0dXJuIGNTdHlsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRGl2U3R5bGUoZFN0eWxlOiBEaXZTdHlsZSk6IERpdlN0eWxle1xuICAgIGlmKCFkU3R5bGUpIFxuICAgIHtcbiAgICAgICAgZFN0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IDQwMCxcbiAgICAgICAgICAgIGhlaWdodDogMjYwLFxuICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICBib3JkZXJSYWRpdXM6ICcyMHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmKCFkU3R5bGUud2lkdGgpXG4gICAge1xuICAgICAgICBkU3R5bGUud2lkdGggPSA0MDBcbiAgICB9XG4gICAgaWYoIWRTdHlsZS5oZWlnaHQpXG4gICAge1xuICAgICAgICBkU3R5bGUuaGVpZ2h0ID0gNDAwXG4gICAgfVxuICAgIGlmKCFkU3R5bGUuYm9yZGVyKVxuICAgIHtcbiAgICAgICAgZFN0eWxlLmJvcmRlciA9ICdub25lJ1xuICAgIH1cbiAgICBpZighZFN0eWxlLmJvcmRlclJhZGl1cylcbiAgICB7XG4gICAgICAgIGRTdHlsZS5ib3JkZXJSYWRpdXMgPSAnNXB4J1xuICAgIH1cbiAgICByZXR1cm4gZFN0eWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VDb250ZW50U3R5bGUoY1N0eWxlOiBjb250ZW50U3R5bGUsdGl0bGU6IHN0cmluZyxjb250ZW50OiBzdHJpbmcpOiBjb250ZW50U3R5bGV7XG4gICAgaWYoIWNTdHlsZSlcbiAgICB7XG4gICAgICAgIGNTdHlsZSA9IHtcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGNvbnRlbnQsXG4gICAgICAgICAgICBidG5TdHI6IFsnT0snXSxcbiAgICAgICAgICAgIG5vSWNvbjogZmFsc2UsXG4gICAgICAgICAgICBub0ludDogZmFsc2UsXG4gICAgICAgICAgICBjb25maXJtUG9zaXRpb246IDBcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZighY1N0eWxlLnRpdGxlKVxuICAgIHtcbiAgICAgICAgY1N0eWxlLnRpdGxlID0gdGl0bGVcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb250ZW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLmNvbnRlbnQgPSBjb250ZW50XG4gICAgfVxuICAgIGlmKCFjU3R5bGUuYnRuU3RyKXtcbiAgICAgICAgY1N0eWxlLmJ0blN0ciA9IFsnT0snXVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSWNvbilcbiAgICB7XG4gICAgICAgIGNTdHlsZS5ub0ljb24gPSBmYWxzZVxuICAgIH1cbiAgICBpZighY1N0eWxlLm5vSW50KVxuICAgIHtcbiAgICAgICAgY1N0eWxlLm5vSW50ID0gZmFsc2VcbiAgICB9XG4gICAgaWYoIWNTdHlsZS5jb25maXJtUG9zaXRpb24pXG4gICAge1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMDtcbiAgICB9XG4gICAgaWYoY1N0eWxlLmNvbmZpcm1Qb3NpdGlvbiAhPT0gMCAmJiBjU3R5bGUuY29uZmlybVBvc2l0aW9uICE9PSAxICYmIGNTdHlsZS5jb25maXJtUG9zaXRpb24gIT09IDIpe1xuICAgICAgICBjU3R5bGUuY29uZmlybVBvc2l0aW9uID0gMFxuICAgIH1cbiAgICByZXR1cm4gY1N0eWxlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZU1vZGVsKG1vZGVsOiBzdHJpbmcpOiBbc3RyaW5nLHN0cmluZyxzdHJpbmcsc3RyaW5nXXtcbiAgICBpZihtb2RlbCA9PT0gJ2Vycm9yJylcbiAgICB7XG4gICAgICAgIHJldHVybiBbXCJYXCIsJ3JlZCcsJ0Vycm9yIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGVycm9yIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaGVscCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiIVwiLCdvcmFuZ2UnLCdIZWxwIERpYWxvZ3VlJywnVGhpcyBpcyBkZWZhdWx0IGhlbHAgc3RyaW5nISddXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdxdWVzdCcpXG4gICAge1xuICAgICAgICByZXR1cm4gW1wiP1wiLCdncmV5JyxcIlF1c2V0IERpYWxvZ3VlXCIsJ1RoaXMgaXMgZGVmYXVsdCBlcnJvciBzdHJpbmchJ11cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ3dhcm4nKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFtcIiFcIiwnb3JhbmdlJywnV2FybmluZyBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCB3YXJuaW5nIHN0cmluZyEnXVxuICAgIH1cbiAgICBlbHNlIGlmKG1vZGVsID09PSAnaW5wdXQnKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIklucHV0IERpYWxvZ3VlXCIsXCJUaGlzIGlzIGRlZmF1bHQgaW5wdXQgc3RyaW5nXCJdXG4gICAgfVxuICAgIGVsc2UgaWYobW9kZWwgPT09ICdzZWxlY3QnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJyxcIlNlbGVjdCBEaWFsb2d1ZVwiLFwiVGhpcyBpcyBkZWZhdWx0IHNlbGVjdCBzdHJpbmdcIl1cbiAgICB9XG4gICAgZWxzZSBpZihtb2RlbCA9PT0gJ2ZpbGUnKXtcbiAgICAgICAgcmV0dXJuIFsnJywnJywnRmlsZSBEaWFsb2d1ZScsJ1RoaXMgaXMgZGVmYXVsdCBmaWxlIHN0cmluZyddXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJldHVybiBbJ++9nicsJ2dyZWVuJywnRGFpbG9ndWUnLCdUaGlzIGlzIGRlZmF1bHQgZGFpbG9ndWUgc3RyaW5nJ11cbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlKHN0eWxlOiBTdHlsZSl7XG4vLyAgICAgaWYoIXN0eWxlKVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VFbGVtZW50KGVsOiBFbGVtZW50c3xHcm91cHxFbGVtZW50c1tdLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAvLyBjb25zb2xlLmRpcihlbClcbiAgICAvLyBjb25zb2xlLmRpcihSZWN0YW5nbGUpXG4gICAgLy8gY29uc29sZS5kaXIoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpe1xuICAgICAgICBtYWtlUmVjdGFuZ2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBDaXJjbGUpXG4gICAge1xuICAgICAgICBtYWtlQ2lyY2xlKGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBMaW5lKVxuICAgIHtcbiAgICAgICAgbWFrZUxpbmUoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEFyYylcbiAgICB7XG4gICAgICAgIG1ha2VBcmMoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICBtYWtlRWxsaXBzZShlbCxjdHgpXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBQb2x5Z29uKVxuICAgIHtcbiAgICAgICAgbWFrZVBvbHlnb24oZWwsY3R4KVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgVGV4dHMpXG4gICAge1xuICAgICAgICBtYWtlVGV4dChlbCxjdHgpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgR3JhdClcbiAgICB7XG4gICAgICAgIG1ha2VHcmF0KGVsLGN0eCk7XG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBJbWcpXG4gICAge1xuICAgICAgICBtYWtlSW1nKGVsLGN0eClcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIGV6U2luR3JhdC5zaW5HcmF0KVxuICAgIHtcbiAgICAgICAgKDxlelNpbkdyYXQuc2luR3JhdD5lbCkuZHJhdygpO1xuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2Ygc2luR3JhdGluZyl7XG4gICAgICAgIGNvbnNvbGUuZGlyKFwiQWRkIFN1Y2Nlc3MhXCIpO1xuICAgICAgICAvLyAoPHNpbkdyYXRpbmc+ZWwpLmRyYXcoKTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFJhbmRvbURvdClcbiAgICB7XG4gICAgICAgIHBsYXlSYW5kb21Eb3QoZWwsY3R4KTtcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEdyb3VwKXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoZWwpXG4gICAgICAgIGxldCBsaXN0ID0gZWwuZ3JvdXBMaXN0O1xuICAgICAgICAvLyBjb25zb2xlLmRpcihsaXN0WzBdKVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBsaXN0W2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAganVkZ2VFbGVtZW50KGxpc3RbaV0sY3R4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQXJyYXkpe1xuICAgIC8vICAgICBsZXQgbGlzdCA9IGVsO1xuICAgIC8vICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgICBqdWRnZUVsZW1lbnQobGlzdFtpXSxjdHgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTdHlsZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGp1ZGdlQW5pbWF0ZShlbCk7XG4gICAgaWYoZWwuc3R5bGUgPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnN0eWxlID0ge1xuICAgICAgICAgICAgZmlsbDogXCJub25lXCIsXG4gICAgICAgICAgICBzdHJva2U6ICdcIiMwMDAwMDBcIicsXG4gICAgICAgICAgICBsaW5lV2lkdGg6IDJcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3QgPSBlbC5zdHlsZTtcbiAgICBpZihzdC5saW5lV2lkdGggPT09IHVuZGVmaW5lZCl7XG4gICAgICAgIHN0LmxpbmVXaWR0aCA9IDI7XG4gICAgfVxuICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gc3QuZmlsbDtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAgICAgaWYoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpe1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Quc3Ryb2tlO1xuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IHN0LmxpbmVXaWR0aDtcbiAgICAgICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBpZihzdC5zdHJva2UgIT09ICdub25lJyAmJiBzdC5zdHJva2UgIT09IHVuZGVmaW5lZCl7XG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5zdHJva2UgPSAnXCIjMDAwMDAwXCInXG4gICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdC5zdHJva2U7XG4gICAgICAgICAgICBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgICAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGlmKCEoc3Quc3Ryb2tlICE9PSAnbm9uZScgJiYgc3Quc3Ryb2tlICE9PSB1bmRlZmluZWQpKXtcbiAgICAvLyAgICAgLy8gc3Quc3Ryb2tlID0gJyMwMDAnO1xuICAgIC8vICAgICBpZihzdC5maWxsICE9PSAnbm9uZScgJiYgc3QuZmlsbCAhPT0gdW5kZWZpbmVkKXtcbiAgICAvLyAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vICAgICAgICAgY3R4LmZpbGwoKTtcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAvLyAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyAgICAgICAgIGN0eC5saW5lV2lkdGggPSBzdC5saW5lV2lkdGg7XG4gICAgLy8gICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfVxuICAgIC8vIGVsc2V7XG4gICAgLy8gICAgIGlmKHN0LmZpbGwgIT09ICdub25lJyAmJiBzdC5maWxsICE9PSB1bmRlZmluZWQpe1xuICAgIC8vICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgLy8gICAgICAgICBjdHguZmlsbCgpO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIFxuICAgIC8vIGN0eC5maWxsU3R5bGUgPSBzdC5maWxsO1xuICAgIC8vIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAvLyBjdHgubGluZVdpZHRoID0gc3QubGluZVdpZHRoO1xuICAgIC8vIGN0eC5maWxsKCk7XG4gICAgLy8gY3R4LnN0cm9rZSgpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZVN0eWxlX3RleHQoZWw6IEVsZW1lbnRzLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBpZihlbC5zdHlsZSA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgZWwuc3R5bGUgPSB7XG4gICAgICAgICAgICBmb250U2l6ZTogJzE4cHgnLFxuICAgICAgICAgICAgZm9udFZhcmlhbnQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U3R5bGU6ICdub3JtYWwnXG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZWwuc2hhcGUubWF4V2lkdGggPT09IHVuZGVmaW5lZClcbiAgICB7XG4gICAgICAgIGVsLnNoYXBlLm1heFdpZHRoID0gY3R4LmNhbnZhcy53aWR0aDtcbiAgICB9XG4gICAgbGV0IHN0ID0gZWwuc3R5bGU7XG4gICAgaWYoc3QuZmlsbCAhPT0gJ25vbmUnICYmIHN0LmZpbGwgIT09IHVuZGVmaW5lZCl7XG5cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0LmZpbGw7XG4gICAgICAgIGN0eC5maWxsVGV4dChlbC5zaGFwZS50ZXh0LGVsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5tYXhXaWR0aCk7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKHN0LnN0cm9rZSAhPT0gJ25vbmUnICYmIHN0LnN0cm9rZSAhPT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgc3Quc3Ryb2tlID0gXCIjMDAwXCJcbiAgICAgICAgICAgIGN0eC5zdHJva2VTdHlsZSA9IHN0LnN0cm9rZTtcbiAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KGVsLnNoYXBlLnRleHQsZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlVGV4dFN0eWxlKGVsOiBFbGVtZW50cyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgbGV0IHN0ID0gZWwuc3R5bGVcbiAgICBsZXQgZm9udFN0cmluZyA9ICcnO1xuICAgIGlmKHN0ID09PSB1bmRlZmluZWQpXG4gICAge1xuICAgICAgICBzdCA9IHtcbiAgICAgICAgICAgIGZvbnRTaXplOiAnMThweCcsXG4gICAgICAgICAgICBmb250VmFyaWFudDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGZvbnRTdHlsZTogJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZihzdC5mb250U3R5bGUgIT09IHVuZGVmaW5lZCAmJiBzdC5mb250U3R5bGUgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250U3R5bGUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgPCAzICYmIHN0LmZvbnRTdHlsZSA+PTApXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAwKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09IDEpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnaXRhbGljJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnb2JsaXF1ZSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdub3JtYWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFN0eWxlID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gc3QuZm9udFN0eWxlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihzdC5mb250U3R5bGUgIT09ICdpdGFsaWMnICYmIHN0LmZvbnRTdHlsZSAhPT0gJ29ibGlxdWUnICYmIHN0LmZvbnRTdHlsZSAhPT0gXCJub3JtYWxcIil7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFN0eWxlID09PSAnMCcpe1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKHN0LmZvbnRTdHlsZSA9PT0gJzEnKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgc3QuZm9udFN0eWxlID0gJ2l0YWxpYydcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZihzdC5mb250U3R5bGUgPT09ICcyJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRTdHlsZSA9ICdvYmxpcXVlJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250U3R5bGUgPSAnbm9ybWFsJ1xuICAgIH1cblxuICAgIGlmKHN0LmZvbnRWYXJpYW50ICE9PSB1bmRlZmluZWQgJiYgc3QuZm9udFZhcmlhbnQgIT09ICdub25lJylcbiAgICB7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250VmFyaWFudCA9PT0gJ2Jvb2xlYW4nKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250VmFyaWFudCA9PT0gZmFsc2UpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBzdC5mb250VmFyaWFudCA9ICdzbWFsbC1jYXBzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRWYXJpYW50ID09PSAnc3RyaW5nJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFZhcmlhbnQgPSBzdC5mb250VmFyaWFudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgIT09ICdub3JtYWwnICYmIHN0LmZvbnRWYXJpYW50ICE9PSAnc21hbGwtY2FwcycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoc3QuZm9udFZhcmlhbnQgPT09ICd0cnVlJylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ3NtYWxsLWNhcHMnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHN0LmZvbnRWYXJpYW50ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250VmFyaWFudCA9ICdub3JtYWwnXG4gICAgfVxuXG4gICAgaWYoc3QuZm9udFdlaWdodCAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRXZWlnaHQgIT09ICdub25lJyl7XG4gICAgICAgIGlmKHR5cGVvZiBzdC5mb250V2VpZ2h0ID09PSAnbnVtYmVyJylcbiAgICAgICAge1xuICAgICAgICAgICAgc3QuZm9udFdlaWdodCA9IHN0LmZvbnRXZWlnaHQudG9TdHJpbmcoKVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodHlwZW9mIHN0LmZvbnRXZWlnaHQgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250V2VpZ2h0ICE9PSAnbm9ybWFsJyAmJiBzdC5mb250V2VpZ2h0ICE9PSAnYm9sZCcgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2JvbGRlcicgJiYgc3QuZm9udFdlaWdodCAhPT0gJ2xpZ2h0ZXInKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0LmZvbnRXZWlnaHQgPSAnbm9ybWFsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNle1xuICAgICAgICBzdC5mb250V2VpZ2h0ID0gJ25vcm1hbCdcbiAgICB9XG5cbiAgICBpZihzdC5mb250U2l6ZSAhPT0gdW5kZWZpbmVkICYmIHN0LmZvbnRTaXplICE9PSAnbm9uZScpXG4gICAge1xuICAgICAgICBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdudW1iZXInKVxuICAgICAgICB7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZih0eXBlb2Ygc3QuZm9udFNpemUgPT09ICdzdHJpbmcnKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihzdC5mb250U2l6ZS5pbmRleE9mKCdweCcpID09PSAtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzdC5mb250U2l6ZSA9IHN0LmZvbnRTaXplICsgJ3B4J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBzdC5mb250U2l6ZSA9ICcxOHB4J1xuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHN0LmZvbnRTaXplID0gJzE4cHgnXG4gICAgfVxuICAgIGZvbnRTdHJpbmcgPSBzdC5mb250U3R5bGUgKyAnICcgKyBzdC5mb250VmFyaWFudCArICcgJyArIHN0LmZvbnRXZWlnaHQgKyAnICcgKyBzdC5mb250U2l6ZSArICcgJyArIHN0LmZvbnRGYW1pbHk7XG4gICAgY3R4LmZvbnQgPSBmb250U3RyaW5nO1xuICAgIC8vIGNvbnNvbGUuZGlyKGZvbnRTdHJpbmcpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUNoYW5nZVR5cGUoZWw6IG51bWJlcnxzdHJpbmcpOiBudW1iZXJ7XG4gICAgbGV0IHggPSAxO1xuICAgIC8vIGNvbnNvbGUuZGlyKGVsKVxuICAgIGlmKHR5cGVvZiBlbCA9PT0gXCJzdHJpbmdcIilcbiAgICB7XG4gICAgICAgIGVsID0gZWwudG9VcHBlckNhc2UoKTtcbiAgICAgICAgaWYoZWwgPT09IFwiQ0VOVEVSXCIgfHwgZWwgPT09ICdDJylcbiAgICAgICAge1xuICAgICAgICAgICAgeCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RMRUZUJyB8fCBlbCA9PT0gXCJMRUZUXCIgfHwgZWwgPT09ICdMJyl7XG4gICAgICAgICAgICB4ID0gMTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RUT1AnIHx8IGVsID09PSBcIlRPUFwiIHx8IGVsID09PSAnVCcpe1xuICAgICAgICAgICAgeCA9IDI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZihlbCA9PT0gJ1JFQ1RSSUdIVCcgfHwgZWwgPT09IFwiUklHSFRcIiB8fCBlbCA9PT0gJ1InKXtcbiAgICAgICAgICAgIHggPSAzO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoZWwgPT09ICdSRUNUQk9UVE9NJyB8fCBlbCA9PT0gXCJCT1RUT01cIiB8fCBlbCA9PT0gJ0InKXtcbiAgICAgICAgICAgIHggPSA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhIFBsZWFzZSB1c2UgdGhlIHJpZ2h0IGluc3RydWN0aW9uIScpXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZih0eXBlb2YgZWwgPT09IFwibnVtYmVyXCIpXG4gICAge1xuICAgICAgICBpZihlbDw1KVxuICAgICAgICB7XG4gICAgICAgICAgICB4ID0gZWw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBjb25zb2xlLmRpcignRXJyb3IhSXQgd2lsbCB1c2UgZGVmYXVsdCBpbnN0cnVjdGlvbiEnKVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAgIGNvbnNvbGUuZGlyKCdFcnJvciFJdCB3aWxsIHVzZSBkZWZhdWx0IGluc3RydWN0aW9uIScpXG4gICAgfVxuICAgIHJldHVybiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VTaWRlKHNpZGUwOiBudW1iZXJ8c3RyaW5nLHNpZGUxOiBudW1iZXJ8c3RyaW5nKTogW251bWJlcixudW1iZXJde1xuICAgIGxldCBmMCA9IGp1ZGdlQ2hhbmdlVHlwZShzaWRlMCk7XG4gICAgbGV0IGYxID0ganVkZ2VDaGFuZ2VUeXBlKHNpZGUxKTtcbiAgICBpZihmMCA9PT0gMiB8fCBmMCA9PT0gNCl7XG4gICAgICAgIGlmKGYxID09PSAyIHx8IGYxID09PSA0KXtcbiAgICAgICAgICAgIGYxID0gMDtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IHQgPSBmMTtcbiAgICAgICAgICAgIGYxID0gZjA7XG4gICAgICAgICAgICBmMCA9IHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoZjAgPT09IDEgfHwgZjAgPT09IDMpe1xuICAgICAgICBpZihmMSA9PT0gMSB8fCBmMSA9PT0gMyl7XG4gICAgICAgICAgICBmMSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtmMCxmMV1cbn0gICBcblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZShpbWc6IEltZyxjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCl7XG4gICAgLy8gbGV0IHNoID0gaW1nLnNoYXBlXG4gICAgY29uc29sZS5kaXIoaW1nLkltZ0RhdGEpXG4gICAgLy8gaWYoc2guc3ggPT09IHVuZGVmaW5lZCB8fCBzaC5zeSA9PT0gdW5kZWZpbmVkIHx8IHNoLnN3aWR0aCA9PT0gdW5kZWZpbmVkKVxuICAgIC8vIHtcbiAgICAvLyAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSlcbiAgICAvLyAgICAgfVxuICAgIC8vICAgICBlbHNle1xuICAgIC8vICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLngsc2gueSxzaC53aWR0aCxzaC5oZWlnaHQpXG4gICAgLy8gICAgIH1cbiAgICAvLyB9XG4gICAgLy8gZWxzZXtcbiAgICAvLyAgICAgaWYoc2gud2lkdGggPT09IHVuZGVmaW5lZCB8fCBzaC5oZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgICAgY3R4LmRyYXdJbWFnZShpbWcuSW1nLHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0LHNoLngsc2gueSxpbWcuSW1nLndpZHRoLGltZy5JbWcuaGVpZ2h0KVxuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGVsc2V7XG4gICAgLy8gICAgICAgICBjdHguZHJhd0ltYWdlKGltZy5JbWcsc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQsc2gueCxzaC55LHNoLndpZHRoLHNoLmhlaWdodClcbiAgICAvLyAgICAgfVxuICAgIC8vIH1cbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoNzc3KVxuICAgICAgICBjdHgucHV0SW1hZ2VEYXRhKGltZy5JbWdEYXRhLHNoLngsc2gueSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgLy8gY29uc29sZS5kaXIoNzcpXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLkltZ0RhdGEsc2gueCxzaC55LHNoLnN4LHNoLnN5LHNoLnN3aWR0aCxzaC5zaGVpZ2h0KVxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlSW1hZ2VTaGFwZV90cnVlKGltZzogSW1nLGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICBsZXQgc2ggPSBpbWcuc2hhcGVcbiAgICBpZihzaC5zeCA9PT0gdW5kZWZpbmVkIHx8IHNoLnN5ID09PSB1bmRlZmluZWQgfHwgc2guc3dpZHRoID09PSB1bmRlZmluZWQgfHwgc2guc2hlaWdodCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgLy8gY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnkpXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLmdyZXlJbWdEYXRhLHNoLngsc2gueSlcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgICAgLy8gY3R4LnB1dEltYWdlRGF0YShpbWcuSW1nRGF0YSxzaC54LHNoLnksc2guc3gsc2guc3ksc2guc3dpZHRoLHNoLnNoZWlnaHQpXG4gICAgICAgIGN0eC5wdXRJbWFnZURhdGEoaW1nLmdyZXlJbWdEYXRhLHNoLngsc2gueSxzaC5zeCxzaC5zeSxzaC5zd2lkdGgsc2guc2hlaWdodClcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZUlzSW5FbGVtZW50KFt4LHldOiBbbnVtYmVyLG51bWJlcl0sZWw6IEVsZW1lbnRzKTogYm9vbGVhbntcbiAgICBpZihlbCBpbnN0YW5jZW9mIFJlY3RhbmdsZSl7XG4gICAgICAgIGxldCBbeDAseTAsdzAsaDBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS53aWR0aCxlbC5zaGFwZS5oZWlnaHRdXG4gICAgICAgIGlmKHggPj0geDAgJiYgeDw9eDArdzAgJiYgeSA+PSB5MCAmJiB5IDw9IHkwK2gwKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlKVxuICAgIHtcbiAgICAgICAgbGV0IFt4MCx5MCxyMF0gPSBbZWwuc2hhcGUueCxlbC5zaGFwZS55LGVsLnNoYXBlLnJdXG4gICAgICAgIGxldCByID0gTWF0aC5zcXJ0KE1hdGgucG93KHgteDAsMikgKyBNYXRoLnBvdyh5LXkwLDIpKVxuICAgICAgICBpZihyIDw9IHIwKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgTGluZSlcbiAgICB7XG4gICAgICAgIGxldCBbeDAseTAseDEseTFdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS54RW5kLGVsLnNoYXBlLnlFbmRdXG4gICAgICAgIGlmKHgxICE9PSB4MClcbiAgICAgICAge1xuICAgICAgICAgICAgbGV0IHl0ID0gKHkxLXkwKS8oeDEteDApICogKHggLSB4MCkgKyB5MFxuICAgICAgICAgICAgaWYoeSA+PSB5dC0xNSAmJiB5IDw9IHl0KzE1KSAvL+aJqeWkp+iMg+WbtOS7peS+v+aTjeS9nFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBsZXQgeHQgPSAoeDEteDApLyh5MS15MCkgKiAoeSAtIHkwKSArIHgwXG4gICAgICAgICAgICBpZih5ID49IHh0LTE1ICYmIHkgPD0geHQrMTUpIC8v5omp5aSn6IyD5Zu05Lul5L6/5pON5L2cXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfVxuICAgIGVsc2UgaWYoZWwgaW5zdGFuY2VvZiBBcmMpXG4gICAge1xuICAgICAgICBcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICBsZXQgW3gwLHkwLHJhMCxyYjBdID0gW2VsLnNoYXBlLngsZWwuc2hhcGUueSxlbC5zaGFwZS5yYSxlbC5zaGFwZS5yYl1cbiAgICAgICAgbGV0IHQgPSBNYXRoLnBvdyh4LXgwLDIpL01hdGgucG93KHJhMCwyKSArIE1hdGgucG93KHkteTAsMikvTWF0aC5wb3cocmIwLDIpXG4gICAgICAgIGlmKHQgPD0gMSlcbiAgICAgICAge1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIFBvbHlnb24pXG4gICAge1xuICAgICAgICBsZXQgaSA9IDBcbiAgICAgICAgbGV0IGogPSBpICsgMVxuICAgICAgICBsZXQgaW5kZXggPSAwXG4gICAgICAgIGxldCB4dCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCB5dCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBbeDAseTBdID0gW2VsLnNoYXBlLnhBLGVsLnNoYXBlLnlBXVxuICAgICAgICBmb3IoaSA9IDA7aTxlbC5zaGFwZS54QS5sZW5ndGg7aSsrKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpID09PSBlbC5zaGFwZS54QS5sZW5ndGgtMSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBqID0gMFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBqID0gaSArIDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHkwW2ldICE9PSB5MFtqXSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4dFtpbmRleF0gPSAoeDBbaV0teDBbal0pLyh5MFtpXS15MFtqXSkgKiAoeSAtIHkwW2ldKSArIHgwW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHl0W2luZGV4XSA9ICh5MFtqXS15MFtpXSkvKHgwW2pdLXgwW2ldKSAqICh4IC0geDBbaV0pICsgeTBbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHggPT09IHh0W2luZGV4XSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZih4dFtpbmRleF0gPj0geCl7XG4gICAgICAgICAgICAgICAgaW5kZXgrK1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmKGluZGV4JTI9PT0wKVxuICAgICAgICB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBlbHNlIGlmKGVsIGluc3RhbmNlb2YgUG9seWdvbilcbiAgICAvLyB7XG4gICAgLy8gICAgIGxldCBjXG4gICAgLy8gICAgIGxldCBpLGpcbiAgICAvLyAgICAgbGV0IGwgPSBlbC5zaGFwZS55QS5sZW5ndGhcbiAgICAvLyAgICAgZm9yKGMgPSBmYWxzZSxpID0gLTEsaiA9IGwgLSAxOyArK2kgPCBsOyBqID0gaSkgXG4gICAgLy8gICAgICAgICAoIChlbC5zaGFwZS55QVtpXSA8PSB5ICYmIHkgPCBlbC5zaGFwZS55QVtqXSkgfHwgKGVsLnNoYXBlLnlBW2pdIDw9IHkgJiYgeSA8IGVsLnNoYXBlLnlBW2ldKSApIFxuICAgIC8vICAgICAgICAgJiYgKHggPCAoZWwuc2hhcGUueEFbal0gLSBlbC5zaGFwZS54QVtpXSkgKiAoeSAtIGVsLnNoYXBlLnlBW2ldKSAvIChlbC5zaGFwZS55QVtqXSAtIGVsLnNoYXBlLnlBW2ldKSArIGVsLnNoYXBlLnhBW2ldKSBcbiAgICAvLyAgICAgICAgICYmIChjID0gIWMpOyBcbiAgICAvLyAgICAgcmV0dXJuIGM7IFxuICAgIC8vIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlQW5pbWF0ZShlbDogRWxlbWVudHMsY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpe1xuICAgIC8vIGNvbnNvbGUuZGlyKCdhJylcblxuICAgIGVsLnJlbW92ZSgpXG4gICAgY3R4LnNhdmUoKVxuICAgIGN0eC5iZWdpblBhdGgoKVxuICAgIGN0eC50cmFuc2xhdGUoZWwudHJhbnNsYXRlLngsZWwudHJhbnNsYXRlLnkpXG4gICAgY3R4LnJvdGF0ZShlbC5yb3RhdGUpXG4gICAgY3R4LnNjYWxlKGVsLnNjYWxlLndpZHRoLGVsLnNjYWxlLmhlaWdodClcbiAgICBqdWRnZUVsZW1lbnQoZWwsY3R4KVxuICAgIGN0eC5jbG9zZVBhdGgoKVxuICAgIGN0eC5yZXN0b3JlKClcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlVFJTKGVsOiBFbGVtZW50cyl7XG4gICAgbGV0IGN0eCA9IGVsLmN0eFxuXG4gICAgbGV0IFt4LHldID0ganVkZ2VFbGVtZW50c0NlbnRlcihlbCk7XG4gICAgXG4gICAgaWYoZWwucm90YXRlKVxuICAgIHtcbiAgICAgICAgY3R4LnRyYW5zbGF0ZSh4LHkpXG4gICAgICAgIGN0eC5yb3RhdGUoZWwucm90YXRlKk1hdGguUEkvMTgwKVxuICAgICAgICBjdHgudHJhbnNsYXRlKC14LC15KVxuICAgIH1cbiAgICBjdHgudHJhbnNsYXRlKHgseSlcbiAgICBjdHguc2NhbGUoZWwuc2NhbGUud2lkdGgsZWwuc2NhbGUuaGVpZ2h0KVxuICAgIGN0eC50cmFuc2xhdGUoLXgsLXkpXG5cbiAgICBjdHgudHJhbnNsYXRlKGVsLnRyYW5zbGF0ZS54LGVsLnRyYW5zbGF0ZS55KVxufVxuXG5leHBvcnQgZnVuY3Rpb24ganVkZ2VLZXkoa2V5Q29kZTogbnVtYmVyLGtleUNvZGVEaWN0aW9uYXJ5OiBPYmplY3QpOiBzdHJpbmd7XG4gICAgbGV0IGtleSA9IGtleUNvZGVEaWN0aW9uYXJ5W2tleUNvZGVdO1xuICAgIHJldHVybiBrZXk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudDogRGxnQ29udGVudCx0aXRsZTogc3RyaW5nLGNvbnRlbnQ/OiBzdHJpbmcsb2s/OiBzdHJpbmcsY2FuY2VsPzogc3RyaW5nKTogRGxnQ29udGVudHtcbiAgICBpZihvayA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgb2sgPSAnT0snXG4gICAgfVxuICAgIGlmKGNhbmNlbCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgY2FuY2VsID0gJ0NhbmNlbCdcbiAgICB9XG4gICAgaWYoZGxnQ29udGVudCA9PT0gdW5kZWZpbmVkKVxuICAgIHtcbiAgICAgICAgcmV0dXJuIGRsZ0NvbnRlbnQgPSB7XG4gICAgICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgICAgICBjb250ZW50OiBjb250ZW50LFxuICAgICAgICAgICAgY29uZmlybTogb2ssXG4gICAgICAgICAgICBjYW5jZWw6IGNhbmNlbFxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQudGl0bGUgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgZGxnQ29udGVudC50aXRsZSA9IHRpdGxlO1xuICAgICAgICB9XG4gICAgICAgIGlmKGNvbnRlbnQgIT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgaWYoZGxnQ29udGVudC5jb250ZW50ID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGxnQ29udGVudC5jb250ZW50ID0gY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LmNvbmZpcm0gPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgZGxnQ29udGVudC5jb25maXJtID0gb2tcbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LmNhbmNlbCA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuY2FuY2VsID0gY2FuY2VsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkbGdDb250ZW50O1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGp1ZGdlRWxlbWVudHNDZW50ZXIoZWw6IEVsZW1lbnRzKTogW251bWJlcixudW1iZXJde1xuICAgIGxldCB4LHk7XG4gICAgaWYoZWwgaW5zdGFuY2VvZiBSZWN0YW5nbGUpXG4gICAge1xuICAgICAgICB4ID0gZWwuc2hhcGUueCArIGVsLnNoYXBlLndpZHRoLzJcbiAgICAgICAgeSA9IGVsLnNoYXBlLnkgKyBlbC5zaGFwZS5oZWlnaHQvMlxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgQ2lyY2xlIHx8IGVsIGluc3RhbmNlb2YgQXJjIHx8IGVsIGluc3RhbmNlb2YgR3JhdCB8fCBlbCBpbnN0YW5jZW9mIEVsbGlwc2UpXG4gICAge1xuICAgICAgICB4ID0gZWwuc2hhcGUueFxuICAgICAgICB5ID0gZWwuc2hhcGUueVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgTGluZSlcbiAgICB7XG4gICAgICAgIHggPSBNYXRoLmFicyhlbC5zaGFwZS54IC0gZWwuc2hhcGUueEVuZCkvMlxuICAgICAgICB5ID0gTWF0aC5hYnMoZWwuc2hhcGUueSAtIGVsLnNoYXBlLnlFbmQpLzJcbiAgICB9XG4gICAgZWxzZSBpZihlbCBpbnN0YW5jZW9mIGV6U2luR3JhdC5zaW5HcmF0KVxuICAgIHtcbiAgICAgICAgeCA9IE1hdGguY2VpbCgoMiplbC5zaGFwZS5yKzEpLzIpXG4gICAgICAgIHkgPSBNYXRoLmNlaWwoKDIqZWwuc2hhcGUucisxKS8yKVxuICAgIH1cbiAgICBlbHNlIGlmKGVsIGluc3RhbmNlb2YgVGV4dHMpXG4gICAge1xuICAgICAgICB4ID0gZWwuc2hhcGUueDtcbiAgICAgICAgeSA9IGVsLnNoYXBlLnk7XG4gICAgfVxuICAgIFxuXG4gICAgcmV0dXJuIFt4LHldXG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsgbmFtZVN0eWxlIH0gZnJvbSBcIi4uL0RhdGFUeXBlL2RhdGFUeXBlXCI7XG5pbXBvcnQgeyBUZXh0TGluZSB9IGZyb20gXCIuLi9HcmFwaGljL3RleHRcIjtcbmltcG9ydCB7IFJhbmRvbURvdCB9IGZyb20gXCIuLi9HcmFwaGljL3JhbmRvbURvdFwiO1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tIFwiLi4vR3JvdXAvZ3JvdXBcIjtcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi4vSnVkZ2UvanVkZ2UnXG5cblxuZXhwb3J0IGNsYXNzIFN0b3JhZ2V7XG4gICAgRWxlbWVudHNMaXN0OiBBcnJheTxFbGVtZW50cz5cbiAgICB0ZXh0TGluZTogVGV4dExpbmVcbiAgICBjb25zdHJ1Y3Rvcigpe1xuICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdCA9IFtdO1xuICAgIH1cbiAgICBwdXNoKGVsOiBFbGVtZW50cyB8IEFycmF5PEVsZW1lbnRzPiB8IEdyb3VwKXtcbiAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50cyB8fCBlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5wdXNoKGVsKVxuICAgICAgICB9XG4gICAgICAgIGVsc2VcbiAgICAgICAge1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgZWwubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0aGlzLkVsZW1lbnRzTGlzdC5wdXNoKGVsW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW1vdmUoZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBsZXQgbmFtZSA9IHRoaXMuZ2V0RWxlbWVudHNOYW1lKGVsKTtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zZWFyY2hFbGVtZW50c05hbWUobmFtZSk7XG4gICAgICAgIGlmKGluZGV4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlmKGluZGV4IGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gaW5kZXguc29ydCgpO1xuICAgICAgICAgICAgICAgIGluZGV4LnNvcnQoKGEsYik9PntcbiAgICAgICAgICAgICAgICAgICAgaWYoYT5iKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhPGIpXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIFxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gaW5kZXgubGVuZ3RoLTE7aSA+PSAwO2ktLSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnNwbGljZShpbmRleFtpXSwxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIHRoaXMuRWxlbWVudHNMaXN0LnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBnZXRFbGVtZW50c05hbWUoZWw6IEVsZW1lbnRzIHwgQXJyYXk8RWxlbWVudHM+IHwgR3JvdXApe1xuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzIHx8IGVsIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCBuYW1lID0gZWwubmFtZTtcbiAgICAgICAgICAgIHJldHVybiBuYW1lXG4gICAgICAgIH1cbiAgICAgICAgZWxzZVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgbmFtZSA9IG5ldyBBcnJheSgpXG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWVbaV0gPSBlbFtpXS5uYW1lXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmFtZVxuICAgICAgICB9XG4gICAgfVxuICAgIHNlYXJjaEVsZW1lbnRzTmFtZShuYW1lOiBuYW1lU3R5bGUgfCBBcnJheTxuYW1lU3R5bGU+KXtcbiAgICAgICAgaWYobmFtZSBpbnN0YW5jZW9mIEFycmF5KVxuICAgICAgICB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSBuZXcgQXJyYXkoKVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgbmFtZS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8IHRoaXMuRWxlbWVudHNMaXN0Lmxlbmd0aDt0KyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihuYW1lW2ldLm5hbWUgPT09IHRoaXMuRWxlbWVudHNMaXN0W3RdLm5hbWUubmFtZSlcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXhbaV0gPSB0O1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgICAgICBmb3IobGV0IHQgPSAwO3QgPCB0aGlzLkVsZW1lbnRzTGlzdC5sZW5ndGg7dCsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKG5hbWUubmFtZSA9PT0gdGhpcy5FbGVtZW50c0xpc3RbdF0ubmFtZS5uYW1lKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVEcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKXtcbiAgICAgICAgbGV0IGVsID0gdGhpcy5FbGVtZW50c0xpc3QgXG4gICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIGVsW2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAgLy8gaWYoZWxbaV0gaW5zdGFuY2VvZiBSYW5kb21Eb3QpXG4gICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAvLyAgICAgbGV0IHJhbmRvbURvdDpSYW5kb21Eb3QgPSA8UmFuZG9tRG90PmVsW2ldO1xuICAgICAgICAgICAgLy8gICAgIHJhbmRvbURvdC5tYXNrQmFuZC5jdHggPSBjdHg7XG4gICAgICAgICAgICAvLyAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQocmFuZG9tRG90Lm1hc2tCYW5kLGN0eCk7XG4gICAgICAgICAgICAvLyAgICAgZm9yKGxldCBpbmRleCA9IDA7aW5kZXggPCByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXkubGVuZ3RoO2luZGV4KyspXG4gICAgICAgICAgICAvLyAgICAge1xuICAgICAgICAgICAgLy8gICAgICAgICByYW5kb21Eb3QuUmFuZG9tRG90QXJyYXlbaW5kZXhdLmN0eCA9IGN0eDtcbiAgICAgICAgICAgIC8vICAgICAgICAgZXpKdWRnZS5qdWRnZUVsZW1lbnQocmFuZG9tRG90LlJhbmRvbURvdEFycmF5W2luZGV4XSxjdHgpXG4gICAgICAgICAgICAvLyAgICAgfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgICAgICBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbFtpXSxjdHgpXG4gICAgICAgICAgICAvLyB9XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHsgRWxlbWVudHMgfSBmcm9tIFwiLi4vRWxlbWVudFwiO1xuaW1wb3J0IHsganVkZ2VJc0luRWxlbWVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuXG5leHBvcnQgZnVuY3Rpb24gS2JXYWl0KGtleTogbnVtYmVyLGZ1bmM/OiBGdW5jdGlvbik6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoZnVuYylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh0cnVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVqZWN0ZWQoZmFsc2UpXG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5leHBvcnQgZnVuY3Rpb24gS2JOYW1lKGtleTogc3RyaW5nfG51bWJlcik6bnVtYmVye1xuICAgIGxldCByZXM7XG5cbiAgICBpZih0eXBlb2Yga2V5ID09PSAnc3RyaW5nJylcbiAgICB7XG4gICAgICAgIHJlcyA9IGtleS5jaGFyQ29kZUF0KDApXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIHJlcyA9IFN0cmluZy5mcm9tQ2hhckNvZGUoa2V5KVxuICAgIH1cbiAgICAvLyBjb25zb2xlLmRpcihyZXMpIFxuICAgIHJldHVybiByZXNcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUHJlc3NXYWl0KGtleTogbnVtYmVyfEFycmF5PG51bWJlcj4pOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgbGV0IGtleUMgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgaWYodHlwZW9mIGtleSA9PT0gJ251bWJlcicpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGtleUMgPSBba2V5XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAga2V5QyA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5vbmtleWRvd24gPSBldmVudCA9PntcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGtleUMubGVuZ3RoO2krKylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZihlICYmIGUua2V5Q29kZSA9PT0ga2V5Q1tpXSl7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZS5rZXlDb2RlKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEtiUmVsZWFzZVdhaXQoa2V5OiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSxyZWplY3RlZCk9PntcbiAgICAgICAgZG9jdW1lbnQub25rZXl1cCA9IGV2ZW50ID0+IHtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGlmKGUgJiYgZS5rZXlDb2RlID09PSBrZXkpe1xuICAgICAgICAgICAgICAgIHJlc29sdmUodHJ1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlamVjdGVkKGZhbHNlKVxuICAgICAgICB9XG4gICAgfSlcbiAgICBcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEdldENsaWNrKGVsOiBFbGVtZW50cyk6IFByb21pc2U8Ym9vbGVhbj57XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLHJlamVjdGVkKT0+e1xuICAgICAgICBkb2N1bWVudC5vbm1vdXNlZG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgICAgICAgIGxldCBlID0gZXZlbnQgfHwgd2luZG93LmV2ZW50IHx8IGFyZ3VtZW50cy5jYWxsZWUuY2FsbGVyLmFyZ3VtZW50c1swXTtcbiAgICAgICAgICAgIGxldCB4LHlcbiAgICAgICAgICAgIGlmKGUucGFnZVggfHwgZS5wYWdlWSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB4ID0gZS5wYWdlWFxuICAgICAgICAgICAgICAgIHkgPSBlLnBhZ2VZXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcih4KSBcbiAgICAgICAgICAgIC8vIGNvbnNvbGUuZGlyKHkpXG4gICAgICAgICAgICBsZXQgZiA9IGp1ZGdlSXNJbkVsZW1lbnQoW3gseV0sZWwpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmKVxuICAgICAgICAgICAgaWYoZiA9PT0gdHJ1ZSlcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZWplY3RlZChmYWxzZSlcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG59IiwiZXhwb3J0IGNsYXNzIFRpbWV7XG4gICAgc3RhcnRUaW1lOiBudW1iZXJcbiAgICB0aW1lU3RhbXA6IEFycmF5PG51bWJlcj5cbiAgICB0aW1lQ29udGludWVWYWx1ZTogQXJyYXk8bnVtYmVyPlxuICAgIHRpbWVJbnRlcnZhbFZhbHVlOiBBcnJheTxudW1iZXI+XG4gICAgY29uc3RydWN0b3IoKXtcbiAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBwZXJmb3JtYW5jZS5ub3coKVxuICAgICAgICB0aGlzLnRpbWVTdGFtcCA9IFtdXG4gICAgICAgIHRoaXMudGltZUNvbnRpbnVlVmFsdWUgPSBbXVxuICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlID0gW11cbiAgICB9XG4gICAgcmVjb3JkKCl7XG4gICAgICAgIHRoaXMudGltZVN0YW1wLnB1c2gocGVyZm9ybWFuY2Uubm93KCkpXG4gICAgfVxuICAgIGdldFN0YW1wKCl7XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVTdGFtcFxuICAgIH1cbiAgICBnZXRDb250aW51ZVZhbHVlKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMudGltZVN0YW1wLmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRoaXMudGltZUNvbnRpbnVlVmFsdWUucHVzaCh0aGlzLnRpbWVTdGFtcFtpXSAtIHRoaXMudGltZVN0YW1wW2ktMV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRpbWVDb250aW51ZVZhbHVlO1xuICAgIH1cbiAgICBnZXRJbnRlcnZhbFZhbHVlKCl7XG4gICAgICAgIGZvcihsZXQgaSA9IDE7aSA8IHRoaXMudGltZVN0YW1wLmxlbmd0aDtpKz0yKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0aGlzLnRpbWVTdGFtcClcbiAgICAgICAgICAgICAgICB0aGlzLnRpbWVJbnRlcnZhbFZhbHVlLnB1c2godGhpcy50aW1lU3RhbXBbaV0gLSB0aGlzLnRpbWVTdGFtcFtpLTFdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy50aW1lSW50ZXJ2YWxWYWx1ZTtcbiAgICB9XG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBzbGVlcChkZWxheTogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+e1xuLy8gICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9Pntcbi8vICAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICsgZGVsYXk7XG4vLyAgICAgICAgIHdoaWxlKHBlcmZvcm1hbmNlLm5vdygpIDwgc3RhcnRUaW1lKSB7fVxuLy8gICAgICAgICByZXMoMSlcbi8vICAgICB9KVxuLy8gfVxuXG5leHBvcnQgZnVuY3Rpb24gc2xlZXAoZGVsYXk6IG51bWJlcil7XG4gICAgbGV0IHRpbWVfbnVtPTA7ICAgICBcbiAgICBkZWxheSA9IE1hdGguZmxvb3IoZGVsYXkvMTAwMCAqIDYwKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAoZnVuY3Rpb24gcmFmKCl7XG4gICAgICAgICAgICB0aW1lX251bSsrO1xuICAgICAgICAgICAgbGV0IGlkID13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgICAgIGlmKCB0aW1lX251bT5kZWxheSl7XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgwKTtcbiAgICAgICAgfVxuICAgICAgICB9KCkpICAgIFxuICAgIH0pXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBXYWl0U2VjcyhkZWxheTogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+e1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgdmFyIHN0YXJ0VGltZSA9IHBlcmZvcm1hbmNlLm5vdygpICsgZGVsYXk7XG4gICAgICAgIHdoaWxlKHBlcmZvcm1hbmNlLm5vdygpIDwgc3RhcnRUaW1lKSB7fVxuICAgICAgICByZXMoMSlcbiAgICB9KVxufSIsImltcG9ydCB7IGp1ZGdlS2V5IH0gZnJvbSBcIi4uL0p1ZGdlL2p1ZGdlXCJcblxuXG5leHBvcnQgY2xhc3MgS2V5cHJlc3N7XG4gICAga2V5VHlwZTogc3RyaW5nXG4gICAga2V5RXZlbnQ6IEtleWJvYXJkRXZlbnRcbiAgICBrZXk6IEFycmF5PGFueT5cbiAgICBrZXlDb21iaW5hdGlvbjogQXJyYXk8YW55PlxuICAgIGNvbnN0cnVjdG9yKGtleVR5cGU/OiBzdHJpbmcpe1xuICAgICAgICBpZihrZXlUeXBlKXtcbiAgICAgICAgICAgIGlmKGtleVR5cGUgPT09ICdrZXlkb3duJyB8fCBrZXlUeXBlID09PSAna2V5dXAnIHx8IGtleVR5cGUgPT09ICdrZXlwcmVzcycpe1xuICAgICAgICAgICAgICAgIHRoaXMua2V5VHlwZSA9IGtleVR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlUeXBlID0gJ2tleWRvd24nXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHRoaXMua2V5VHlwZSA9ICdrZXlkb3duJ1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5ID0gW11cbiAgICAgICAgdGhpcy5rZXlFdmVudCA9IG5ldyBLZXlib2FyZEV2ZW50KHRoaXMua2V5VHlwZSk7XG4gICAgfVxuICAgIGxpc3RlbihrZXk6IHN0cmluZyB8IG51bWJlciB8IEFycmF5PHN0cmluZz4gfCBBcnJheTxudW1iZXI+LGZ1bj86IEZ1bmMgfCBGdW5jdGlvbixJc0Rlc3Ryb3k/OiBib29sZWFuKTogUHJvbWlzZTxSRVM+e1xuICAgICAgICAvLyBjb25zb2xlLmRpcihwYXJhbSk7XG4gICAgICAgIGxldCBmdW5jOiBGdW5jPXtcbiAgICAgICAgICAgIGZ1bmNMaXN0OiBbXVxuICAgICAgICB9O1xuICAgICAgICBpZihJc0Rlc3Ryb3kgPT09IHVuZGVmaW5lZClcbiAgICAgICAge1xuICAgICAgICAgICAgSXNEZXN0cm95ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlcyxyZWopPT57XG4gICAgICAgICAgICB0aGlzLmtleSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgaWYoa2V5KVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlmKGZ1biBpbnN0YW5jZW9mIEZ1bmN0aW9uKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZnVuYy5mdW5jTGlzdCA9IFtmdW5dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICBmdW5jID0gZnVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihrZXkgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5ID0ga2V5XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMua2V5LnB1c2goa2V5KVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCB0aGlzLmtleS5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIHRoaXMua2V5W2ldID09PSAnbnVtYmVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMua2V5W2ldID0ganVkZ2VLZXkodGhpcy5rZXlbaV0sa2V5Q29kZURpY3Rpb25hcnkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmRpcihmdW5jKTtcbiAgICAgICAgICAgICAgICBsaXN0ZW4odGhpcy5rZXksdGhpcy5rZXlUeXBlLGZ1bmMsSXNEZXN0cm95KVxuICAgICAgICAgICAgICAgIC50aGVuKGU9PntcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoZSlcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYoZS5pbmRleCA+PSAwKVxuICAgICAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBpZihmdW5jLmNvbXBsZXRlKVxuICAgICAgICAgICAgICAgICAgICAvLyAgICAgICAgIGZ1bmMuY29tcGxldGUoKVxuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmKGZ1bmMpXG4gICAgICAgICAgICAgICAgICAgIC8vIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGlmKGZ1bmMuZnVuY0xpc3RbZS5pbmRleF0pXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZnVuYy5mdW5jTGlzdFtlLmluZGV4XSgpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5kaXIoZS5rZXkpXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5lcnJvcignZnVuY1snK2UrJ10gaXMgdW5kZWZpbmVkICEnKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICAvLyBlbHNlXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBjb25zb2xlLmRpcihlLmtleSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIGNvbnNvbGUuZXJyb3IoXCJmdW5jIGlzIHVuZGVmaW5kZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgcmVzKGUpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJZb3Ugc2hvdWxkbid0IHVzZSB0aGlzIGZ1bmN0aW9uIHdpdGhvdXQgUGFyYW1ldHJpYyBrZXkgISEhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICBcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBLZXlwcmVzc0luaXQoa2V5VHlwZT86IHN0cmluZyl7XG4gICAgbGV0IGtleXByZXNzID0gbmV3IEtleXByZXNzKCk7XG4gICAgcmV0dXJuIGtleXByZXNzXG59XG5cbmZ1bmN0aW9uIGxpc3RlbihrZXk6IEFycmF5PHN0cmluZz4sa2V5VHlwZTogc3RyaW5nLGZ1bmM6IEZ1bmMsSXNEZXN0cm95OiBib29sZWFuKTogUHJvbWlzZTxSRVM+e1xuICAgIGxldCByZXM6UkVTPXtcbiAgICAgICAgaW5kZXg6IC0xLFxuICAgICAgICBrZXk6ICdudWxsJ1xuICAgIH1cbiAgICByZXR1cm4gbmV3IFByb21pc2U8UkVTPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoa2V5VHlwZSxsaW5zdGVubmVyKTtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIGZ1bmN0aW9uIGxpbnN0ZW5uZXIoZSl7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmRpcigoPEtleWJvYXJkRXZlbnQ+ZSkua2V5KVxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwga2V5Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYoa2V5W2ldID09PSAoPEtleWJvYXJkRXZlbnQ+ZSkua2V5KVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXk6ICg8S2V5Ym9hcmRFdmVudD5lKS5rZXlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZihyZXMuaW5kZXggPj0gMClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnVuYy5jb21wbGV0ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jLmNvbXBsZXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYoZnVuYy5mdW5jTGlzdClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZnVuYy5mdW5jTGlzdFtyZXMuaW5kZXhdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmMuZnVuY0xpc3RbcmVzLmluZGV4XSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5kaXIocmVzLmtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCdmdW5jWycrZSsnXSBpcyB1bmRlZmluZWQgIScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKHJlcy5rZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKFwiZnVuYyBpcyB1bmRlZmluZGVcIik7XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlcyhlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoSXNEZXN0cm95KVxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihrZXlUeXBlLGxpbnN0ZW5uZXIpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlcylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KVxufVxuXG5pbnRlcmZhY2UgRnVuY3tcbiAgICBmdW5jTGlzdD86IEFycmF5PEZ1bmN0aW9uPlxuICAgIGNvbXBsZXRlPzogRnVuY3Rpb25cbn1cbmludGVyZmFjZSBSRVN7XG4gICAgaW5kZXg6IG51bWJlclxuICAgIGtleTogc3RyaW5nXG59XG5cbmxldCBrZXlDb2RlRGljdGlvbmFyeSA9IHtcbiAgICA4OiAnQmFja3NwYWNlJyxcbiAgICA5OiAnVGFiJywgXG4gICAgMTI6ICdDbGVhcicsXG4gICAgMTM6ICdFbnRlcicsIFxuICAgIDE2OiAnU2hpZnQnLFxuICAgIDE3OiAnQ29udHJvbCcsIFxuICAgIDE4OiAnQWx0JywgXG4gICAgMTk6ICdQYXVzZScsXG4gICAgMjA6ICdDYXBzTG9jaycsIFxuICAgIDI3OiAnRXNjYXBlJyxcbiAgICAzMjogJyAnLCBcbiAgICAzMzogJ1ByaW9yJywgXG4gICAgMzQ6ICdOZXh0JyxcbiAgICAzNTogJ0VuZCcsIFxuICAgIDM2OiAnSG9tZScsIFxuICAgIDM3OiAnTGVmdCcsIFxuICAgIDM4OiAnVXAnLCBcbiAgICAzOTogJ1JpZ2h0JywgXG4gICAgNDA6ICdEb3duJywgXG4gICAgNDE6ICdTZWxlY3QnLCBcbiAgICA0MjogJ1ByaW50JywgXG4gICAgNDM6ICdFeGVjdXRlJywgXG4gICAgNDU6ICdJbnNlcnQnLCBcbiAgICA0NjogJ0RlbGV0ZScsIFxuICAgIDQ3OiAnSGVscCcsIFxuICAgIDQ4OiAnMCcsIFxuICAgIDQ5OiAnMScsXG4gICAgNTA6ICcyJyxcbiAgICA1MTogJzMnLFxuICAgIDUyOiAnNCcsIFxuICAgIDUzOiAnNScsXG4gICAgNTQ6ICc2JyxcbiAgICA1NTogJzcnLCBcbiAgICA1NjogJzgnLCBcbiAgICA1NzogJzknLCBcbiAgICA2NTogJ2EnLCBcbiAgICA2NjogJ2InLCBcbiAgICA2NzogJ2MnLCBcbiAgICA2ODogJ2QnLCBcbiAgICA2OTogJ2UnLCAgXG4gICAgNzA6ICdmJywgXG4gICAgNzE6ICdnJywgXG4gICAgNzI6ICdoJywgXG4gICAgNzM6ICdpJywgXG4gICAgNzQ6ICdqJywgXG4gICAgNzU6ICdrJywgXG4gICAgNzY6ICdsJywgXG4gICAgNzc6ICdtJywgXG4gICAgNzg6ICduJywgXG4gICAgNzk6ICdvJywgXG4gICAgODA6ICdwJywgXG4gICAgODE6ICdxJyxcbiAgICA4MjogJ3InLCBcbiAgICA4MzogJ3MnLCBcbiAgICA4NDogJ3QnLCBcbiAgICA4NTogJ3UnLCBcbiAgICA4NjogJ3YnLCBcbiAgICA4NzogJ3cnLCBcbiAgICA4ODogJ3gnLCBcbiAgICA4OTogJ3knLCBcbiAgICA5MDogJ3onLCBcbiAgICA5NjogJ0tQXzAnLCBcbiAgICA5NzogJ0tQXzEnLCBcbiAgICA5ODogJ0tQXzInLCBcbiAgICA5OTogJ0tQXzMnLCBcbiAgICAxMDA6ICdLUF80JywgXG4gICAgMTAxOiAnS1BfNScsIFxuICAgIDEwMjogJ0tQXzYnLCBcbiAgICAxMDM6ICdLUF83JywgXG4gICAgMTA0OiAnS1BfOCcsIFxuICAgIDEwNTogJ0tQXzknLCBcbiAgICAxMDY6ICdLUF9NdWx0aXBseScsXG4gICAgMTA3OiAnS1BfQWRkJywgXG4gICAgMTA4OiAnS1BfU2VwYXJhdG9yJyxcbiAgICAxMDk6ICdLUF9TdWJ0cmFjdCcsXG4gICAgMTEwOiAnS1BfRGVjaW1hbCcsXG4gICAgMTExOiAnS1BfRGl2aWRlJywgXG4gICAgMTEyOiAnRjEnLCBcbiAgICAxMTM6ICdGMicsIFxuICAgIDExNDogJ0YzJywgXG4gICAgMTE1OiAnRjQnLCBcbiAgICAxMTY6ICdGNScsIFxuICAgIDExNzogJ0Y2JywgXG4gICAgMTE4OiAnRjcnLCBcbiAgICAxMTk6ICdGOCcsIFxuICAgIDEyMDogJ0Y5JywgXG4gICAgMTIxOiAnRjEwJywgXG4gICAgMTIyOiAnRjExJywgXG4gICAgMTIzOiAnRjEyJywgXG4gICAgMTI0OiAnRjEzJywgXG4gICAgMTI1OiAnRjE0JywgXG4gICAgMTI2OiAnRjE1JywgXG4gICAgMTI3OiAnRjE2JywgXG4gICAgMTI4OiAnRjE3JywgXG4gICAgMTI5OiAnRjE4JywgXG4gICAgMTMwOiAnRjE5JywgXG4gICAgMTMxOiAnRjIwJywgXG4gICAgMTMyOiAnRjIxJywgXG4gICAgMTMzOiAnRjIyJywgXG4gICAgMTM0OiAnRjIzJywgXG4gICAgMTM1OiAnRjI0JywgXG59IiwiZXhwb3J0IGNvbnN0IGNvbnNvbGVQcmVmaXggPSAnU3dlZXRBbGVydDI6J1xuXG4vKipcbiAqIEZpbHRlciB0aGUgdW5pcXVlIHZhbHVlcyBpbnRvIGEgbmV3IGFycmF5XG4gKiBAcGFyYW0gYXJyXG4gKi9cbmV4cG9ydCBjb25zdCB1bmlxdWVBcnJheSA9IChhcnIpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAocmVzdWx0LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGFycltpXSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIENhcGl0YWxpemUgdGhlIGZpcnN0IGxldHRlciBvZiBhIHN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICogQHJldHVybnMge3N0cmluZ31cbiAqL1xuZXhwb3J0IGNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9IChzdHIpID0+IHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKVxuXG4vKipcbiAqIEBwYXJhbSB7Tm9kZUxpc3QgfCBIVE1MQ29sbGVjdGlvbiB8IE5hbWVkTm9kZU1hcH0gbm9kZUxpc3RcbiAqIEByZXR1cm5zIHthcnJheX1cbiAqL1xuZXhwb3J0IGNvbnN0IHRvQXJyYXkgPSAobm9kZUxpc3QpID0+IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKG5vZGVMaXN0KVxuXG4vKipcbiAqIFN0YW5kYXJkaXplIGNvbnNvbGUgd2FybmluZ3NcbiAqIEBwYXJhbSB7c3RyaW5nIHwgYXJyYXl9IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IHdhcm4gPSAobWVzc2FnZSkgPT4ge1xuICBjb25zb2xlLndhcm4oYCR7Y29uc29sZVByZWZpeH0gJHt0eXBlb2YgbWVzc2FnZSA9PT0gJ29iamVjdCcgPyBtZXNzYWdlLmpvaW4oJyAnKSA6IG1lc3NhZ2V9YClcbn1cblxuLyoqXG4gKiBTdGFuZGFyZGl6ZSBjb25zb2xlIGVycm9yc1xuICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAqL1xuZXhwb3J0IGNvbnN0IGVycm9yID0gKG1lc3NhZ2UpID0+IHtcbiAgY29uc29sZS5lcnJvcihgJHtjb25zb2xlUHJlZml4fSAke21lc3NhZ2V9YClcbn1cblxuLyoqXG4gKiBQcml2YXRlIGdsb2JhbCBzdGF0ZSBmb3IgYHdhcm5PbmNlYFxuICogQHR5cGUge0FycmF5fVxuICogQHByaXZhdGVcbiAqL1xuY29uc3QgcHJldmlvdXNXYXJuT25jZU1lc3NhZ2VzID0gW11cblxuLyoqXG4gKiBTaG93IGEgY29uc29sZSB3YXJuaW5nLCBidXQgb25seSBpZiBpdCBoYXNuJ3QgYWxyZWFkeSBiZWVuIHNob3duXG4gKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICovXG5leHBvcnQgY29uc3Qgd2Fybk9uY2UgPSAobWVzc2FnZSkgPT4ge1xuICBpZiAoIXByZXZpb3VzV2Fybk9uY2VNZXNzYWdlcy5pbmNsdWRlcyhtZXNzYWdlKSkge1xuICAgIHByZXZpb3VzV2Fybk9uY2VNZXNzYWdlcy5wdXNoKG1lc3NhZ2UpXG4gICAgd2FybihtZXNzYWdlKVxuICB9XG59XG5cbi8qKlxuICogU2hvdyBhIG9uZS10aW1lIGNvbnNvbGUgd2FybmluZyBhYm91dCBkZXByZWNhdGVkIHBhcmFtcy9tZXRob2RzXG4gKi9cbmV4cG9ydCBjb25zdCB3YXJuQWJvdXREZXByZWNhdGlvbiA9IChkZXByZWNhdGVkUGFyYW0sIHVzZUluc3RlYWQpID0+IHtcbiAgd2Fybk9uY2UoXG4gICAgYFwiJHtkZXByZWNhdGVkUGFyYW19XCIgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZW1vdmVkIGluIHRoZSBuZXh0IG1ham9yIHJlbGVhc2UuIFBsZWFzZSB1c2UgXCIke3VzZUluc3RlYWR9XCIgaW5zdGVhZC5gXG4gIClcbn1cblxuLyoqXG4gKiBJZiBgYXJnYCBpcyBhIGZ1bmN0aW9uLCBjYWxsIGl0ICh3aXRoIG5vIGFyZ3VtZW50cyBvciBjb250ZXh0KSBhbmQgcmV0dXJuIHRoZSByZXN1bHQuXG4gKiBPdGhlcndpc2UsIGp1c3QgcGFzcyB0aGUgdmFsdWUgdGhyb3VnaFxuICogQHBhcmFtIGFyZ1xuICovXG5leHBvcnQgY29uc3QgY2FsbElmRnVuY3Rpb24gPSAoYXJnKSA9PiAodHlwZW9mIGFyZyA9PT0gJ2Z1bmN0aW9uJyA/IGFyZygpIDogYXJnKVxuXG5leHBvcnQgY29uc3QgaGFzVG9Qcm9taXNlRm4gPSAoYXJnKSA9PiBhcmcgJiYgdHlwZW9mIGFyZy50b1Byb21pc2UgPT09ICdmdW5jdGlvbidcblxuZXhwb3J0IGNvbnN0IGFzUHJvbWlzZSA9IChhcmcpID0+IChoYXNUb1Byb21pc2VGbihhcmcpID8gYXJnLnRvUHJvbWlzZSgpIDogUHJvbWlzZS5yZXNvbHZlKGFyZykpXG5cbmV4cG9ydCBjb25zdCBpc1Byb21pc2UgPSAoYXJnKSA9PiBhcmcgJiYgUHJvbWlzZS5yZXNvbHZlKGFyZykgPT09IGFyZ1xuIiwiaW1wb3J0IHsgd2Fybiwgd2FybkFib3V0RGVwcmVjYXRpb24gfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuZXhwb3J0IGNvbnN0IGRlZmF1bHRQYXJhbXMgPSB7XG4gIHRpdGxlOiAnJyxcbiAgdGl0bGVUZXh0OiAnJyxcbiAgdGV4dDogJycsXG4gIGh0bWw6ICcnLFxuICBmb290ZXI6ICcnLFxuICBpY29uOiB1bmRlZmluZWQsXG4gIGljb25Db2xvcjogdW5kZWZpbmVkLFxuICBpY29uSHRtbDogdW5kZWZpbmVkLFxuICB0ZW1wbGF0ZTogdW5kZWZpbmVkLFxuICB0b2FzdDogZmFsc2UsXG4gIHNob3dDbGFzczoge1xuICAgIHBvcHVwOiAnc3dhbDItc2hvdycsXG4gICAgYmFja2Ryb3A6ICdzd2FsMi1iYWNrZHJvcC1zaG93JyxcbiAgICBpY29uOiAnc3dhbDItaWNvbi1zaG93JyxcbiAgfSxcbiAgaGlkZUNsYXNzOiB7XG4gICAgcG9wdXA6ICdzd2FsMi1oaWRlJyxcbiAgICBiYWNrZHJvcDogJ3N3YWwyLWJhY2tkcm9wLWhpZGUnLFxuICAgIGljb246ICdzd2FsMi1pY29uLWhpZGUnLFxuICB9LFxuICBjdXN0b21DbGFzczoge30sXG4gIHRhcmdldDogJ2JvZHknLFxuICBjb2xvcjogdW5kZWZpbmVkLFxuICBiYWNrZHJvcDogdHJ1ZSxcbiAgaGVpZ2h0QXV0bzogdHJ1ZSxcbiAgYWxsb3dPdXRzaWRlQ2xpY2s6IHRydWUsXG4gIGFsbG93RXNjYXBlS2V5OiB0cnVlLFxuICBhbGxvd0VudGVyS2V5OiB0cnVlLFxuICBzdG9wS2V5ZG93blByb3BhZ2F0aW9uOiB0cnVlLFxuICBrZXlkb3duTGlzdGVuZXJDYXB0dXJlOiBmYWxzZSxcbiAgc2hvd0NvbmZpcm1CdXR0b246IHRydWUsXG4gIHNob3dEZW55QnV0dG9uOiBmYWxzZSxcbiAgc2hvd0NhbmNlbEJ1dHRvbjogZmFsc2UsXG4gIHByZUNvbmZpcm06IHVuZGVmaW5lZCxcbiAgcHJlRGVueTogdW5kZWZpbmVkLFxuICBjb25maXJtQnV0dG9uVGV4dDogJ09LJyxcbiAgY29uZmlybUJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGNvbmZpcm1CdXR0b25Db2xvcjogdW5kZWZpbmVkLFxuICBkZW55QnV0dG9uVGV4dDogJ05vJyxcbiAgZGVueUJ1dHRvbkFyaWFMYWJlbDogJycsXG4gIGRlbnlCdXR0b25Db2xvcjogdW5kZWZpbmVkLFxuICBjYW5jZWxCdXR0b25UZXh0OiAnQ2FuY2VsJyxcbiAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnJyxcbiAgY2FuY2VsQnV0dG9uQ29sb3I6IHVuZGVmaW5lZCxcbiAgYnV0dG9uc1N0eWxpbmc6IHRydWUsXG4gIHJldmVyc2VCdXR0b25zOiBmYWxzZSxcbiAgZm9jdXNDb25maXJtOiB0cnVlLFxuICBmb2N1c0Rlbnk6IGZhbHNlLFxuICBmb2N1c0NhbmNlbDogZmFsc2UsXG4gIHJldHVybkZvY3VzOiB0cnVlLFxuICBzaG93Q2xvc2VCdXR0b246IGZhbHNlLFxuICBjbG9zZUJ1dHRvbkh0bWw6ICcmdGltZXM7JyxcbiAgY2xvc2VCdXR0b25BcmlhTGFiZWw6ICdDbG9zZSB0aGlzIGRpYWxvZycsXG4gIGxvYWRlckh0bWw6ICcnLFxuICBzaG93TG9hZGVyT25Db25maXJtOiBmYWxzZSxcbiAgc2hvd0xvYWRlck9uRGVueTogZmFsc2UsXG4gIGltYWdlVXJsOiB1bmRlZmluZWQsXG4gIGltYWdlV2lkdGg6IHVuZGVmaW5lZCxcbiAgaW1hZ2VIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgaW1hZ2VBbHQ6ICcnLFxuICB0aW1lcjogdW5kZWZpbmVkLFxuICB0aW1lclByb2dyZXNzQmFyOiBmYWxzZSxcbiAgd2lkdGg6IHVuZGVmaW5lZCxcbiAgcGFkZGluZzogdW5kZWZpbmVkLFxuICBiYWNrZ3JvdW5kOiB1bmRlZmluZWQsXG4gIGlucHV0OiB1bmRlZmluZWQsXG4gIGlucHV0UGxhY2Vob2xkZXI6ICcnLFxuICBpbnB1dExhYmVsOiAnJyxcbiAgaW5wdXRWYWx1ZTogJycsXG4gIGlucHV0T3B0aW9uczoge30sXG4gIGlucHV0QXV0b1RyaW06IHRydWUsXG4gIGlucHV0QXR0cmlidXRlczoge30sXG4gIGlucHV0VmFsaWRhdG9yOiB1bmRlZmluZWQsXG4gIHJldHVybklucHV0VmFsdWVPbkRlbnk6IGZhbHNlLFxuICB2YWxpZGF0aW9uTWVzc2FnZTogdW5kZWZpbmVkLFxuICBncm93OiBmYWxzZSxcbiAgcG9zaXRpb246ICdjZW50ZXInLFxuICBwcm9ncmVzc1N0ZXBzOiBbXSxcbiAgY3VycmVudFByb2dyZXNzU3RlcDogdW5kZWZpbmVkLFxuICBwcm9ncmVzc1N0ZXBzRGlzdGFuY2U6IHVuZGVmaW5lZCxcbiAgd2lsbE9wZW46IHVuZGVmaW5lZCxcbiAgZGlkT3BlbjogdW5kZWZpbmVkLFxuICBkaWRSZW5kZXI6IHVuZGVmaW5lZCxcbiAgd2lsbENsb3NlOiB1bmRlZmluZWQsXG4gIGRpZENsb3NlOiB1bmRlZmluZWQsXG4gIGRpZERlc3Ryb3k6IHVuZGVmaW5lZCxcbiAgc2Nyb2xsYmFyUGFkZGluZzogdHJ1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IHVwZGF0YWJsZVBhcmFtcyA9IFtcbiAgJ2FsbG93RXNjYXBlS2V5JyxcbiAgJ2FsbG93T3V0c2lkZUNsaWNrJyxcbiAgJ2JhY2tncm91bmQnLFxuICAnYnV0dG9uc1N0eWxpbmcnLFxuICAnY2FuY2VsQnV0dG9uQXJpYUxhYmVsJyxcbiAgJ2NhbmNlbEJ1dHRvbkNvbG9yJyxcbiAgJ2NhbmNlbEJ1dHRvblRleHQnLFxuICAnY2xvc2VCdXR0b25BcmlhTGFiZWwnLFxuICAnY2xvc2VCdXR0b25IdG1sJyxcbiAgJ2NvbG9yJyxcbiAgJ2NvbmZpcm1CdXR0b25BcmlhTGFiZWwnLFxuICAnY29uZmlybUJ1dHRvbkNvbG9yJyxcbiAgJ2NvbmZpcm1CdXR0b25UZXh0JyxcbiAgJ2N1cnJlbnRQcm9ncmVzc1N0ZXAnLFxuICAnY3VzdG9tQ2xhc3MnLFxuICAnZGVueUJ1dHRvbkFyaWFMYWJlbCcsXG4gICdkZW55QnV0dG9uQ29sb3InLFxuICAnZGVueUJ1dHRvblRleHQnLFxuICAnZGlkQ2xvc2UnLFxuICAnZGlkRGVzdHJveScsXG4gICdmb290ZXInLFxuICAnaGlkZUNsYXNzJyxcbiAgJ2h0bWwnLFxuICAnaWNvbicsXG4gICdpY29uQ29sb3InLFxuICAnaWNvbkh0bWwnLFxuICAnaW1hZ2VBbHQnLFxuICAnaW1hZ2VIZWlnaHQnLFxuICAnaW1hZ2VVcmwnLFxuICAnaW1hZ2VXaWR0aCcsXG4gICdwcmVDb25maXJtJyxcbiAgJ3ByZURlbnknLFxuICAncHJvZ3Jlc3NTdGVwcycsXG4gICdyZXR1cm5Gb2N1cycsXG4gICdyZXZlcnNlQnV0dG9ucycsXG4gICdzaG93Q2FuY2VsQnV0dG9uJyxcbiAgJ3Nob3dDbG9zZUJ1dHRvbicsXG4gICdzaG93Q29uZmlybUJ1dHRvbicsXG4gICdzaG93RGVueUJ1dHRvbicsXG4gICd0ZXh0JyxcbiAgJ3RpdGxlJyxcbiAgJ3RpdGxlVGV4dCcsXG4gICd3aWxsQ2xvc2UnLFxuXVxuXG5leHBvcnQgY29uc3QgZGVwcmVjYXRlZFBhcmFtcyA9IHt9XG5cbmNvbnN0IHRvYXN0SW5jb21wYXRpYmxlUGFyYW1zID0gW1xuICAnYWxsb3dPdXRzaWRlQ2xpY2snLFxuICAnYWxsb3dFbnRlcktleScsXG4gICdiYWNrZHJvcCcsXG4gICdmb2N1c0NvbmZpcm0nLFxuICAnZm9jdXNEZW55JyxcbiAgJ2ZvY3VzQ2FuY2VsJyxcbiAgJ3JldHVybkZvY3VzJyxcbiAgJ2hlaWdodEF1dG8nLFxuICAna2V5ZG93bkxpc3RlbmVyQ2FwdHVyZScsXG5dXG5cbi8qKlxuICogSXMgdmFsaWQgcGFyYW1ldGVyXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc1ZhbGlkUGFyYW1ldGVyID0gKHBhcmFtTmFtZSkgPT4ge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGRlZmF1bHRQYXJhbXMsIHBhcmFtTmFtZSlcbn1cblxuLyoqXG4gKiBJcyB2YWxpZCBwYXJhbWV0ZXIgZm9yIFN3YWwudXBkYXRlKCkgbWV0aG9kXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1OYW1lXG4gKi9cbmV4cG9ydCBjb25zdCBpc1VwZGF0YWJsZVBhcmFtZXRlciA9IChwYXJhbU5hbWUpID0+IHtcbiAgcmV0dXJuIHVwZGF0YWJsZVBhcmFtcy5pbmRleE9mKHBhcmFtTmFtZSkgIT09IC0xXG59XG5cbi8qKlxuICogSXMgZGVwcmVjYXRlZCBwYXJhbWV0ZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbU5hbWVcbiAqL1xuZXhwb3J0IGNvbnN0IGlzRGVwcmVjYXRlZFBhcmFtZXRlciA9IChwYXJhbU5hbWUpID0+IHtcbiAgcmV0dXJuIGRlcHJlY2F0ZWRQYXJhbXNbcGFyYW1OYW1lXVxufVxuXG5jb25zdCBjaGVja0lmUGFyYW1Jc1ZhbGlkID0gKHBhcmFtKSA9PiB7XG4gIGlmICghaXNWYWxpZFBhcmFtZXRlcihwYXJhbSkpIHtcbiAgICB3YXJuKGBVbmtub3duIHBhcmFtZXRlciBcIiR7cGFyYW19XCJgKVxuICB9XG59XG5cbmNvbnN0IGNoZWNrSWZUb2FzdFBhcmFtSXNWYWxpZCA9IChwYXJhbSkgPT4ge1xuICBpZiAodG9hc3RJbmNvbXBhdGlibGVQYXJhbXMuaW5jbHVkZXMocGFyYW0pKSB7XG4gICAgd2FybihgVGhlIHBhcmFtZXRlciBcIiR7cGFyYW19XCIgaXMgaW5jb21wYXRpYmxlIHdpdGggdG9hc3RzYClcbiAgfVxufVxuXG5jb25zdCBjaGVja0lmUGFyYW1Jc0RlcHJlY2F0ZWQgPSAocGFyYW0pID0+IHtcbiAgaWYgKGlzRGVwcmVjYXRlZFBhcmFtZXRlcihwYXJhbSkpIHtcbiAgICB3YXJuQWJvdXREZXByZWNhdGlvbihwYXJhbSwgaXNEZXByZWNhdGVkUGFyYW1ldGVyKHBhcmFtKSlcbiAgfVxufVxuXG4vKipcbiAqIFNob3cgcmVsZXZhbnQgd2FybmluZ3MgZm9yIGdpdmVuIHBhcmFtc1xuICpcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGNvbnN0IHNob3dXYXJuaW5nc0ZvclBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgaWYgKCFwYXJhbXMuYmFja2Ryb3AgJiYgcGFyYW1zLmFsbG93T3V0c2lkZUNsaWNrKSB7XG4gICAgd2FybignXCJhbGxvd091dHNpZGVDbGlja1wiIHBhcmFtZXRlciByZXF1aXJlcyBgYmFja2Ryb3BgIHBhcmFtZXRlciB0byBiZSBzZXQgdG8gYHRydWVgJylcbiAgfVxuXG4gIGZvciAoY29uc3QgcGFyYW0gaW4gcGFyYW1zKSB7XG4gICAgY2hlY2tJZlBhcmFtSXNWYWxpZChwYXJhbSlcblxuICAgIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICAgIGNoZWNrSWZUb2FzdFBhcmFtSXNWYWxpZChwYXJhbSlcbiAgICB9XG5cbiAgICBjaGVja0lmUGFyYW1Jc0RlcHJlY2F0ZWQocGFyYW0pXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmYXVsdFBhcmFtc1xuIiwiZXhwb3J0IGNvbnN0IHN3YWxQcmVmaXggPSAnc3dhbDItJ1xuXG5leHBvcnQgY29uc3QgcHJlZml4ID0gKGl0ZW1zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIGZvciAoY29uc3QgaSBpbiBpdGVtcykge1xuICAgIHJlc3VsdFtpdGVtc1tpXV0gPSBzd2FsUHJlZml4ICsgaXRlbXNbaV1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBjb25zdCBzd2FsQ2xhc3NlcyA9IHByZWZpeChbXG4gICdjb250YWluZXInLFxuICAnc2hvd24nLFxuICAnaGVpZ2h0LWF1dG8nLFxuICAnaW9zZml4JyxcbiAgJ3BvcHVwJyxcbiAgJ21vZGFsJyxcbiAgJ25vLWJhY2tkcm9wJyxcbiAgJ25vLXRyYW5zaXRpb24nLFxuICAndG9hc3QnLFxuICAndG9hc3Qtc2hvd24nLFxuICAnc2hvdycsXG4gICdoaWRlJyxcbiAgJ2Nsb3NlJyxcbiAgJ3RpdGxlJyxcbiAgJ2h0bWwtY29udGFpbmVyJyxcbiAgJ2FjdGlvbnMnLFxuICAnY29uZmlybScsXG4gICdkZW55JyxcbiAgJ2NhbmNlbCcsXG4gICdkZWZhdWx0LW91dGxpbmUnLFxuICAnZm9vdGVyJyxcbiAgJ2ljb24nLFxuICAnaWNvbi1jb250ZW50JyxcbiAgJ2ltYWdlJyxcbiAgJ2lucHV0JyxcbiAgJ2ZpbGUnLFxuICAncmFuZ2UnLFxuICAnc2VsZWN0JyxcbiAgJ3JhZGlvJyxcbiAgJ2NoZWNrYm94JyxcbiAgJ2xhYmVsJyxcbiAgJ3RleHRhcmVhJyxcbiAgJ2lucHV0ZXJyb3InLFxuICAnaW5wdXQtbGFiZWwnLFxuICAndmFsaWRhdGlvbi1tZXNzYWdlJyxcbiAgJ3Byb2dyZXNzLXN0ZXBzJyxcbiAgJ2FjdGl2ZS1wcm9ncmVzcy1zdGVwJyxcbiAgJ3Byb2dyZXNzLXN0ZXAnLFxuICAncHJvZ3Jlc3Mtc3RlcC1saW5lJyxcbiAgJ2xvYWRlcicsXG4gICdsb2FkaW5nJyxcbiAgJ3N0eWxlZCcsXG4gICd0b3AnLFxuICAndG9wLXN0YXJ0JyxcbiAgJ3RvcC1lbmQnLFxuICAndG9wLWxlZnQnLFxuICAndG9wLXJpZ2h0JyxcbiAgJ2NlbnRlcicsXG4gICdjZW50ZXItc3RhcnQnLFxuICAnY2VudGVyLWVuZCcsXG4gICdjZW50ZXItbGVmdCcsXG4gICdjZW50ZXItcmlnaHQnLFxuICAnYm90dG9tJyxcbiAgJ2JvdHRvbS1zdGFydCcsXG4gICdib3R0b20tZW5kJyxcbiAgJ2JvdHRvbS1sZWZ0JyxcbiAgJ2JvdHRvbS1yaWdodCcsXG4gICdncm93LXJvdycsXG4gICdncm93LWNvbHVtbicsXG4gICdncm93LWZ1bGxzY3JlZW4nLFxuICAncnRsJyxcbiAgJ3RpbWVyLXByb2dyZXNzLWJhcicsXG4gICd0aW1lci1wcm9ncmVzcy1iYXItY29udGFpbmVyJyxcbiAgJ3Njcm9sbGJhci1tZWFzdXJlJyxcbiAgJ2ljb24tc3VjY2VzcycsXG4gICdpY29uLXdhcm5pbmcnLFxuICAnaWNvbi1pbmZvJyxcbiAgJ2ljb24tcXVlc3Rpb24nLFxuICAnaWNvbi1lcnJvcicsXG5dKVxuXG5leHBvcnQgY29uc3QgaWNvblR5cGVzID0gcHJlZml4KFsnc3VjY2VzcycsICd3YXJuaW5nJywgJ2luZm8nLCAncXVlc3Rpb24nLCAnZXJyb3InXSlcbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHRvQXJyYXksIHVuaXF1ZUFycmF5IH0gZnJvbSAnLi4vdXRpbHMuanMnXG5pbXBvcnQgeyBoYXNDbGFzcywgaXNWaXNpYmxlIH0gZnJvbSAnLi9kb21VdGlscy5qcydcblxuLyoqXG4gKiBHZXRzIHRoZSBwb3B1cCBjb250YWluZXIgd2hpY2ggY29udGFpbnMgdGhlIGJhY2tkcm9wIGFuZCB0aGUgcG9wdXAgaXRzZWxmLlxuICpcbiAqIEByZXR1cm5zIHtIVE1MRWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb250YWluZXIgPSAoKSA9PiBkb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmNvbnRhaW5lcn1gKVxuXG5leHBvcnQgY29uc3QgZWxlbWVudEJ5U2VsZWN0b3IgPSAoc2VsZWN0b3JTdHJpbmcpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZ2V0Q29udGFpbmVyKClcbiAgcmV0dXJuIGNvbnRhaW5lciA/IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yU3RyaW5nKSA6IG51bGxcbn1cblxuY29uc3QgZWxlbWVudEJ5Q2xhc3MgPSAoY2xhc3NOYW1lKSA9PiB7XG4gIHJldHVybiBlbGVtZW50QnlTZWxlY3RvcihgLiR7Y2xhc3NOYW1lfWApXG59XG5cbmV4cG9ydCBjb25zdCBnZXRQb3B1cCA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLnBvcHVwKVxuXG5leHBvcnQgY29uc3QgZ2V0SWNvbiA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLmljb24pXG5cbmV4cG9ydCBjb25zdCBnZXRUaXRsZSA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzLnRpdGxlKVxuXG5leHBvcnQgY29uc3QgZ2V0SHRtbENvbnRhaW5lciA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddKVxuXG5leHBvcnQgY29uc3QgZ2V0SW1hZ2UgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5pbWFnZSlcblxuZXhwb3J0IGNvbnN0IGdldFByb2dyZXNzU3RlcHMgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcHMnXSlcblxuZXhwb3J0IGNvbnN0IGdldFZhbGlkYXRpb25NZXNzYWdlID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddKVxuXG5leHBvcnQgY29uc3QgZ2V0Q29uZmlybUJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfSAuJHtzd2FsQ2xhc3Nlcy5jb25maXJtfWApXG5cbmV4cG9ydCBjb25zdCBnZXREZW55QnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLmFjdGlvbnN9IC4ke3N3YWxDbGFzc2VzLmRlbnl9YClcblxuZXhwb3J0IGNvbnN0IGdldElucHV0TGFiZWwgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlc1snaW5wdXQtbGFiZWwnXSlcblxuZXhwb3J0IGNvbnN0IGdldExvYWRlciA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5sb2FkZXJ9YClcblxuZXhwb3J0IGNvbnN0IGdldENhbmNlbEJ1dHRvbiA9ICgpID0+IGVsZW1lbnRCeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5hY3Rpb25zfSAuJHtzd2FsQ2xhc3Nlcy5jYW5jZWx9YClcblxuZXhwb3J0IGNvbnN0IGdldEFjdGlvbnMgPSAoKSA9PiBlbGVtZW50QnlDbGFzcyhzd2FsQ2xhc3Nlcy5hY3Rpb25zKVxuXG5leHBvcnQgY29uc3QgZ2V0Rm9vdGVyID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuZm9vdGVyKVxuXG5leHBvcnQgY29uc3QgZ2V0VGltZXJQcm9ncmVzc0JhciA9ICgpID0+IGVsZW1lbnRCeUNsYXNzKHN3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXInXSlcblxuZXhwb3J0IGNvbnN0IGdldENsb3NlQnV0dG9uID0gKCkgPT4gZWxlbWVudEJ5Q2xhc3Moc3dhbENsYXNzZXMuY2xvc2UpXG5cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9qa3VwL2ZvY3VzYWJsZS9ibG9iL21hc3Rlci9pbmRleC5qc1xuY29uc3QgZm9jdXNhYmxlID0gYFxuICBhW2hyZWZdLFxuICBhcmVhW2hyZWZdLFxuICBpbnB1dDpub3QoW2Rpc2FibGVkXSksXG4gIHNlbGVjdDpub3QoW2Rpc2FibGVkXSksXG4gIHRleHRhcmVhOm5vdChbZGlzYWJsZWRdKSxcbiAgYnV0dG9uOm5vdChbZGlzYWJsZWRdKSxcbiAgaWZyYW1lLFxuICBvYmplY3QsXG4gIGVtYmVkLFxuICBbdGFiaW5kZXg9XCIwXCJdLFxuICBbY29udGVudGVkaXRhYmxlXSxcbiAgYXVkaW9bY29udHJvbHNdLFxuICB2aWRlb1tjb250cm9sc10sXG4gIHN1bW1hcnlcbmBcblxuZXhwb3J0IGNvbnN0IGdldEZvY3VzYWJsZUVsZW1lbnRzID0gKCkgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50c1dpdGhUYWJpbmRleCA9IHRvQXJyYXkoXG4gICAgZ2V0UG9wdXAoKS5xdWVyeVNlbGVjdG9yQWxsKCdbdGFiaW5kZXhdOm5vdChbdGFiaW5kZXg9XCItMVwiXSk6bm90KFt0YWJpbmRleD1cIjBcIl0pJylcbiAgKVxuICAgIC8vIHNvcnQgYWNjb3JkaW5nIHRvIHRhYmluZGV4XG4gICAgLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgIGNvbnN0IHRhYmluZGV4QSA9IHBhcnNlSW50KGEuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpKVxuICAgICAgY29uc3QgdGFiaW5kZXhCID0gcGFyc2VJbnQoYi5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykpXG4gICAgICBpZiAodGFiaW5kZXhBID4gdGFiaW5kZXhCKSB7XG4gICAgICAgIHJldHVybiAxXG4gICAgICB9IGVsc2UgaWYgKHRhYmluZGV4QSA8IHRhYmluZGV4Qikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIHJldHVybiAwXG4gICAgfSlcblxuICBjb25zdCBvdGhlckZvY3VzYWJsZUVsZW1lbnRzID0gdG9BcnJheShnZXRQb3B1cCgpLnF1ZXJ5U2VsZWN0b3JBbGwoZm9jdXNhYmxlKSkuZmlsdGVyKFxuICAgIChlbCkgPT4gZWwuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpICE9PSAnLTEnXG4gIClcblxuICByZXR1cm4gdW5pcXVlQXJyYXkoZm9jdXNhYmxlRWxlbWVudHNXaXRoVGFiaW5kZXguY29uY2F0KG90aGVyRm9jdXNhYmxlRWxlbWVudHMpKS5maWx0ZXIoKGVsKSA9PiBpc1Zpc2libGUoZWwpKVxufVxuXG5leHBvcnQgY29uc3QgaXNNb2RhbCA9ICgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBoYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5zaG93bikgJiZcbiAgICAhaGFzQ2xhc3MoZG9jdW1lbnQuYm9keSwgc3dhbENsYXNzZXNbJ3RvYXN0LXNob3duJ10pICYmXG4gICAgIWhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddKVxuICApXG59XG5cbmV4cG9ydCBjb25zdCBpc1RvYXN0ID0gKCkgPT4ge1xuICByZXR1cm4gZ2V0UG9wdXAoKSAmJiBoYXNDbGFzcyhnZXRQb3B1cCgpLCBzd2FsQ2xhc3Nlcy50b2FzdClcbn1cblxuZXhwb3J0IGNvbnN0IGlzTG9hZGluZyA9ICgpID0+IHtcbiAgcmV0dXJuIGdldFBvcHVwKCkuaGFzQXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnKVxufVxuIiwiaW1wb3J0IHsgZ2V0Q2FuY2VsQnV0dG9uLCBnZXRDb25maXJtQnV0dG9uLCBnZXREZW55QnV0dG9uLCBnZXRUaW1lclByb2dyZXNzQmFyIH0gZnJvbSAnLi9nZXR0ZXJzLmpzJ1xuaW1wb3J0IHsgaWNvblR5cGVzLCBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyB0b0FycmF5LCB3YXJuIH0gZnJvbSAnLi4vdXRpbHMuanMnXG5cbi8vIFJlbWVtYmVyIHN0YXRlIGluIGNhc2VzIHdoZXJlIG9wZW5pbmcgYW5kIGhhbmRsaW5nIGEgbW9kYWwgd2lsbCBmaWRkbGUgd2l0aCBpdC5cbmV4cG9ydCBjb25zdCBzdGF0ZXMgPSB7XG4gIHByZXZpb3VzQm9keVBhZGRpbmc6IG51bGwsXG59XG5cbi8qKlxuICogU2VjdXJlbHkgc2V0IGlubmVySFRNTCBvZiBhbiBlbGVtZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE5MjZcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gaHRtbFxuICovXG5leHBvcnQgY29uc3Qgc2V0SW5uZXJIdG1sID0gKGVsZW0sIGh0bWwpID0+IHtcbiAgZWxlbS50ZXh0Q29udGVudCA9ICcnXG4gIGlmIChodG1sKSB7XG4gICAgY29uc3QgcGFyc2VyID0gbmV3IERPTVBhcnNlcigpXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyhodG1sLCBgdGV4dC9odG1sYClcbiAgICB0b0FycmF5KHBhcnNlZC5xdWVyeVNlbGVjdG9yKCdoZWFkJykuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgICB0b0FycmF5KHBhcnNlZC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2hpbGROb2RlcykuZm9yRWFjaCgoY2hpbGQpID0+IHtcbiAgICAgIGVsZW0uYXBwZW5kQ2hpbGQoY2hpbGQpXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBjbGFzc05hbWVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5leHBvcnQgY29uc3QgaGFzQ2xhc3MgPSAoZWxlbSwgY2xhc3NOYW1lKSA9PiB7XG4gIGlmICghY2xhc3NOYW1lKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgY29uc3QgY2xhc3NMaXN0ID0gY2xhc3NOYW1lLnNwbGl0KC9cXHMrLylcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0xpc3QubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoIWVsZW0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTGlzdFtpXSkpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCByZW1vdmVDdXN0b21DbGFzc2VzID0gKGVsZW0sIHBhcmFtcykgPT4ge1xuICB0b0FycmF5KGVsZW0uY2xhc3NMaXN0KS5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICBpZiAoXG4gICAgICAhT2JqZWN0LnZhbHVlcyhzd2FsQ2xhc3NlcykuaW5jbHVkZXMoY2xhc3NOYW1lKSAmJlxuICAgICAgIU9iamVjdC52YWx1ZXMoaWNvblR5cGVzKS5pbmNsdWRlcyhjbGFzc05hbWUpICYmXG4gICAgICAhT2JqZWN0LnZhbHVlcyhwYXJhbXMuc2hvd0NsYXNzKS5pbmNsdWRlcyhjbGFzc05hbWUpXG4gICAgKSB7XG4gICAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIH1cbiAgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGFwcGx5Q3VzdG9tQ2xhc3MgPSAoZWxlbSwgcGFyYW1zLCBjbGFzc05hbWUpID0+IHtcbiAgcmVtb3ZlQ3VzdG9tQ2xhc3NlcyhlbGVtLCBwYXJhbXMpXG5cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcyAmJiBwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXSkge1xuICAgIGlmICh0eXBlb2YgcGFyYW1zLmN1c3RvbUNsYXNzW2NsYXNzTmFtZV0gIT09ICdzdHJpbmcnICYmICFwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXS5mb3JFYWNoKSB7XG4gICAgICByZXR1cm4gd2FybihcbiAgICAgICAgYEludmFsaWQgdHlwZSBvZiBjdXN0b21DbGFzcy4ke2NsYXNzTmFtZX0hIEV4cGVjdGVkIHN0cmluZyBvciBpdGVyYWJsZSBvYmplY3QsIGdvdCBcIiR7dHlwZW9mIHBhcmFtcy5jdXN0b21DbGFzc1tcbiAgICAgICAgICBjbGFzc05hbWVcbiAgICAgICAgXX1cImBcbiAgICAgIClcbiAgICB9XG5cbiAgICBhZGRDbGFzcyhlbGVtLCBwYXJhbXMuY3VzdG9tQ2xhc3NbY2xhc3NOYW1lXSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBvcHVwXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRUeXBlXG4gKiBAcmV0dXJucyB7SFRNTElucHV0RWxlbWVudCB8IG51bGx9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRJbnB1dCA9IChwb3B1cCwgaW5wdXRUeXBlKSA9PiB7XG4gIGlmICghaW5wdXRUeXBlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBzd2l0Y2ggKGlucHV0VHlwZSkge1xuICAgIGNhc2UgJ3NlbGVjdCc6XG4gICAgY2FzZSAndGV4dGFyZWEnOlxuICAgIGNhc2UgJ2ZpbGUnOlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzW2lucHV0VHlwZV19YClcbiAgICBjYXNlICdjaGVja2JveCc6XG4gICAgICByZXR1cm4gcG9wdXAucXVlcnlTZWxlY3RvcihgLiR7c3dhbENsYXNzZXMucG9wdXB9ID4gLiR7c3dhbENsYXNzZXMuY2hlY2tib3h9IGlucHV0YClcbiAgICBjYXNlICdyYWRpbyc6XG4gICAgICByZXR1cm4gKFxuICAgICAgICBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5yYWRpb30gaW5wdXQ6Y2hlY2tlZGApIHx8XG4gICAgICAgIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLnJhZGlvfSBpbnB1dDpmaXJzdC1jaGlsZGApXG4gICAgICApXG4gICAgY2FzZSAncmFuZ2UnOlxuICAgICAgcmV0dXJuIHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnBvcHVwfSA+IC4ke3N3YWxDbGFzc2VzLnJhbmdlfSBpbnB1dGApXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5wb3B1cH0gPiAuJHtzd2FsQ2xhc3Nlcy5pbnB1dH1gKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MSW5wdXRFbGVtZW50fSBpbnB1dFxuICovXG5leHBvcnQgY29uc3QgZm9jdXNJbnB1dCA9IChpbnB1dCkgPT4ge1xuICBpbnB1dC5mb2N1cygpXG5cbiAgLy8gcGxhY2UgY3Vyc29yIGF0IGVuZCBvZiB0ZXh0IGluIHRleHQgaW5wdXRcbiAgaWYgKGlucHV0LnR5cGUgIT09ICdmaWxlJykge1xuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIzNDU5MTVcbiAgICBjb25zdCB2YWwgPSBpbnB1dC52YWx1ZVxuICAgIGlucHV0LnZhbHVlID0gJydcbiAgICBpbnB1dC52YWx1ZSA9IHZhbFxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IEhUTUxFbGVtZW50W10gfCBudWxsfSB0YXJnZXRcbiAqIEBwYXJhbSB7c3RyaW5nIHwgc3RyaW5nW119IGNsYXNzTGlzdFxuICogQHBhcmFtIHtib29sZWFufSBjb25kaXRpb25cbiAqL1xuZXhwb3J0IGNvbnN0IHRvZ2dsZUNsYXNzID0gKHRhcmdldCwgY2xhc3NMaXN0LCBjb25kaXRpb24pID0+IHtcbiAgaWYgKCF0YXJnZXQgfHwgIWNsYXNzTGlzdCkge1xuICAgIHJldHVyblxuICB9XG4gIGlmICh0eXBlb2YgY2xhc3NMaXN0ID09PSAnc3RyaW5nJykge1xuICAgIGNsYXNzTGlzdCA9IGNsYXNzTGlzdC5zcGxpdCgvXFxzKy8pLmZpbHRlcihCb29sZWFuKVxuICB9XG4gIGNsYXNzTGlzdC5mb3JFYWNoKChjbGFzc05hbWUpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICB0YXJnZXQuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgICAgICBjb25kaXRpb24gPyBlbGVtLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKSA6IGVsZW0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25kaXRpb24gPyB0YXJnZXQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpIDogdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGx9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gY2xhc3NMaXN0XG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDbGFzcyA9ICh0YXJnZXQsIGNsYXNzTGlzdCkgPT4ge1xuICB0b2dnbGVDbGFzcyh0YXJnZXQsIGNsYXNzTGlzdCwgdHJ1ZSlcbn1cblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50IHwgSFRNTEVsZW1lbnRbXSB8IG51bGx9IHRhcmdldFxuICogQHBhcmFtIHtzdHJpbmcgfCBzdHJpbmdbXX0gY2xhc3NMaXN0XG4gKi9cbmV4cG9ydCBjb25zdCByZW1vdmVDbGFzcyA9ICh0YXJnZXQsIGNsYXNzTGlzdCkgPT4ge1xuICB0b2dnbGVDbGFzcyh0YXJnZXQsIGNsYXNzTGlzdCwgZmFsc2UpXG59XG5cbi8qKlxuICogR2V0IGRpcmVjdCBjaGlsZCBvZiBhbiBlbGVtZW50IGJ5IGNsYXNzIG5hbWVcbiAqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge3N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgY29uc3QgZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzID0gKGVsZW0sIGNsYXNzTmFtZSkgPT4ge1xuICBjb25zdCBjaGlsZE5vZGVzID0gdG9BcnJheShlbGVtLmNoaWxkTm9kZXMpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGlmIChoYXNDbGFzcyhjaGlsZE5vZGVzW2ldLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gY2hpbGROb2Rlc1tpXVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICogQHBhcmFtIHsqfSB2YWx1ZVxuICovXG5leHBvcnQgY29uc3QgYXBwbHlOdW1lcmljYWxTdHlsZSA9IChlbGVtLCBwcm9wZXJ0eSwgdmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlID09PSBgJHtwYXJzZUludCh2YWx1ZSl9YCkge1xuICAgIHZhbHVlID0gcGFyc2VJbnQodmFsdWUpXG4gIH1cbiAgaWYgKHZhbHVlIHx8IHBhcnNlSW50KHZhbHVlKSA9PT0gMCkge1xuICAgIGVsZW0uc3R5bGVbcHJvcGVydHldID0gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyA/IGAke3ZhbHVlfXB4YCA6IHZhbHVlXG4gIH0gZWxzZSB7XG4gICAgZWxlbS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShwcm9wZXJ0eSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7c3RyaW5nfSBkaXNwbGF5XG4gKi9cbmV4cG9ydCBjb25zdCBzaG93ID0gKGVsZW0sIGRpc3BsYXkgPSAnZmxleCcpID0+IHtcbiAgZWxlbS5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheVxufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1cbiAqL1xuZXhwb3J0IGNvbnN0IGhpZGUgPSAoZWxlbSkgPT4ge1xuICBlbGVtLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cblxuZXhwb3J0IGNvbnN0IHNldFN0eWxlID0gKHBhcmVudCwgc2VsZWN0b3IsIHByb3BlcnR5LCB2YWx1ZSkgPT4ge1xuICBjb25zdCBlbCA9IHBhcmVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICBpZiAoZWwpIHtcbiAgICBlbC5zdHlsZVtwcm9wZXJ0eV0gPSB2YWx1ZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCB0b2dnbGUgPSAoZWxlbSwgY29uZGl0aW9uLCBkaXNwbGF5KSA9PiB7XG4gIGNvbmRpdGlvbiA/IHNob3coZWxlbSwgZGlzcGxheSkgOiBoaWRlKGVsZW0pXG59XG5cbi8vIGJvcnJvd2VkIGZyb20ganF1ZXJ5ICQoZWxlbSkuaXMoJzp2aXNpYmxlJykgaW1wbGVtZW50YXRpb25cbmV4cG9ydCBjb25zdCBpc1Zpc2libGUgPSAoZWxlbSkgPT4gISEoZWxlbSAmJiAoZWxlbS5vZmZzZXRXaWR0aCB8fCBlbGVtLm9mZnNldEhlaWdodCB8fCBlbGVtLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKSlcblxuZXhwb3J0IGNvbnN0IGFsbEJ1dHRvbnNBcmVIaWRkZW4gPSAoKSA9PlxuICAhaXNWaXNpYmxlKGdldENvbmZpcm1CdXR0b24oKSkgJiYgIWlzVmlzaWJsZShnZXREZW55QnV0dG9uKCkpICYmICFpc1Zpc2libGUoZ2V0Q2FuY2VsQnV0dG9uKCkpXG5cbmV4cG9ydCBjb25zdCBpc1Njcm9sbGFibGUgPSAoZWxlbSkgPT4gISEoZWxlbS5zY3JvbGxIZWlnaHQgPiBlbGVtLmNsaWVudEhlaWdodClcblxuLy8gYm9ycm93ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNDYzNTIxMTlcbmV4cG9ydCBjb25zdCBoYXNDc3NBbmltYXRpb24gPSAoZWxlbSkgPT4ge1xuICBjb25zdCBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pXG5cbiAgY29uc3QgYW5pbUR1cmF0aW9uID0gcGFyc2VGbG9hdChzdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdhbmltYXRpb24tZHVyYXRpb24nKSB8fCAnMCcpXG4gIGNvbnN0IHRyYW5zRHVyYXRpb24gPSBwYXJzZUZsb2F0KHN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zaXRpb24tZHVyYXRpb24nKSB8fCAnMCcpXG5cbiAgcmV0dXJuIGFuaW1EdXJhdGlvbiA+IDAgfHwgdHJhbnNEdXJhdGlvbiA+IDBcbn1cblxuZXhwb3J0IGNvbnN0IGFuaW1hdGVUaW1lclByb2dyZXNzQmFyID0gKHRpbWVyLCByZXNldCA9IGZhbHNlKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBnZXRUaW1lclByb2dyZXNzQmFyKClcbiAgaWYgKGlzVmlzaWJsZSh0aW1lclByb2dyZXNzQmFyKSkge1xuICAgIGlmIChyZXNldCkge1xuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS50cmFuc2l0aW9uID0gJ25vbmUnXG4gICAgICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gICAgfVxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoICR7dGltZXIgLyAxMDAwfXMgbGluZWFyYFxuICAgICAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS53aWR0aCA9ICcwJSdcbiAgICB9LCAxMClcbiAgfVxufVxuXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyUHJvZ3Jlc3NCYXIgPSAoKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBnZXRUaW1lclByb2dyZXNzQmFyKClcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhcldpZHRoID0gcGFyc2VJbnQod2luZG93LmdldENvbXB1dGVkU3R5bGUodGltZXJQcm9ncmVzc0Jhcikud2lkdGgpXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ3RyYW5zaXRpb24nKVxuICB0aW1lclByb2dyZXNzQmFyLnN0eWxlLndpZHRoID0gJzEwMCUnXG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXJGdWxsV2lkdGggPSBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aW1lclByb2dyZXNzQmFyKS53aWR0aClcbiAgY29uc3QgdGltZXJQcm9ncmVzc0JhclBlcmNlbnQgPSAodGltZXJQcm9ncmVzc0JhcldpZHRoIC8gdGltZXJQcm9ncmVzc0JhckZ1bGxXaWR0aCkgKiAxMDBcbiAgdGltZXJQcm9ncmVzc0Jhci5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgndHJhbnNpdGlvbicpXG4gIHRpbWVyUHJvZ3Jlc3NCYXIuc3R5bGUud2lkdGggPSBgJHt0aW1lclByb2dyZXNzQmFyUGVyY2VudH0lYFxufVxuIiwiLyoqXG4gKiBEZXRlY3QgTm9kZSBlbnZcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZXhwb3J0IGNvbnN0IGlzTm9kZUVudiA9ICgpID0+IHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBkb2N1bWVudCA9PT0gJ3VuZGVmaW5lZCdcbiIsImV4cG9ydCBjb25zdCBSRVNUT1JFX0ZPQ1VTX1RJTUVPVVQgPSAxMDBcbiIsImltcG9ydCB7IFJFU1RPUkVfRk9DVVNfVElNRU9VVCB9IGZyb20gJy4vY29uc3RhbnRzLmpzJ1xuXG5jb25zdCBnbG9iYWxTdGF0ZSA9IHt9XG5cbmV4cG9ydCBkZWZhdWx0IGdsb2JhbFN0YXRlXG5cbmNvbnN0IGZvY3VzUHJldmlvdXNBY3RpdmVFbGVtZW50ID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ICYmIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cykge1xuICAgIGdsb2JhbFN0YXRlLnByZXZpb3VzQWN0aXZlRWxlbWVudC5mb2N1cygpXG4gICAgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gbnVsbFxuICB9IGVsc2UgaWYgKGRvY3VtZW50LmJvZHkpIHtcbiAgICBkb2N1bWVudC5ib2R5LmZvY3VzKClcbiAgfVxufVxuXG4vLyBSZXN0b3JlIHByZXZpb3VzIGFjdGl2ZSAoZm9jdXNlZCkgZWxlbWVudFxuZXhwb3J0IGNvbnN0IHJlc3RvcmVBY3RpdmVFbGVtZW50ID0gKHJldHVybkZvY3VzKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgIGlmICghcmV0dXJuRm9jdXMpIHtcbiAgICAgIHJldHVybiByZXNvbHZlKClcbiAgICB9XG4gICAgY29uc3QgeCA9IHdpbmRvdy5zY3JvbGxYXG4gICAgY29uc3QgeSA9IHdpbmRvdy5zY3JvbGxZXG5cbiAgICBnbG9iYWxTdGF0ZS5yZXN0b3JlRm9jdXNUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBmb2N1c1ByZXZpb3VzQWN0aXZlRWxlbWVudCgpXG4gICAgICByZXNvbHZlKClcbiAgICB9LCBSRVNUT1JFX0ZPQ1VTX1RJTUVPVVQpIC8vIGlzc3Vlcy85MDBcblxuICAgIHdpbmRvdy5zY3JvbGxUbyh4LCB5KVxuICB9KVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgZ2V0Q29udGFpbmVyLCBnZXRQb3B1cCB9IGZyb20gJy4vZ2V0dGVycy5qcydcbmltcG9ydCB7IGFkZENsYXNzLCBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MsIHJlbW92ZUNsYXNzLCBzZXRJbm5lckh0bWwgfSBmcm9tICcuL2RvbVV0aWxzLmpzJ1xuaW1wb3J0IHsgaXNOb2RlRW52IH0gZnJvbSAnLi4vaXNOb2RlRW52LmpzJ1xuaW1wb3J0IHsgZXJyb3IgfSBmcm9tICcuLi91dGlscy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi8uLi9nbG9iYWxTdGF0ZS5qcydcblxuY29uc3Qgc3dlZXRIVE1MID0gYFxuIDxkaXYgYXJpYS1sYWJlbGxlZGJ5PVwiJHtzd2FsQ2xhc3Nlcy50aXRsZX1cIiBhcmlhLWRlc2NyaWJlZGJ5PVwiJHtzd2FsQ2xhc3Nlc1snaHRtbC1jb250YWluZXInXX1cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMucG9wdXB9XCIgdGFiaW5kZXg9XCItMVwiPlxuICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmNsb3NlfVwiPjwvYnV0dG9uPlxuICAgPHVsIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcHMnXX1cIj48L3VsPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuaWNvbn1cIj48L2Rpdj5cbiAgIDxpbWcgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmltYWdlfVwiIC8+XG4gICA8aDIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnRpdGxlfVwiIGlkPVwiJHtzd2FsQ2xhc3Nlcy50aXRsZX1cIj48L2gyPlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXNbJ2h0bWwtY29udGFpbmVyJ119XCIgaWQ9XCIke3N3YWxDbGFzc2VzWydodG1sLWNvbnRhaW5lciddfVwiPjwvZGl2PlxuICAgPGlucHV0IGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5pbnB1dH1cIiAvPlxuICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmZpbGV9XCIgLz5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLnJhbmdlfVwiPlxuICAgICA8aW5wdXQgdHlwZT1cInJhbmdlXCIgLz5cbiAgICAgPG91dHB1dD48L291dHB1dD5cbiAgIDwvZGl2PlxuICAgPHNlbGVjdCBjbGFzcz1cIiR7c3dhbENsYXNzZXMuc2VsZWN0fVwiPjwvc2VsZWN0PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMucmFkaW99XCI+PC9kaXY+XG4gICA8bGFiZWwgZm9yPVwiJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH1cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY2hlY2tib3h9XCI+XG4gICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiAvPlxuICAgICA8c3BhbiBjbGFzcz1cIiR7c3dhbENsYXNzZXMubGFiZWx9XCI+PC9zcGFuPlxuICAgPC9sYWJlbD5cbiAgIDx0ZXh0YXJlYSBjbGFzcz1cIiR7c3dhbENsYXNzZXMudGV4dGFyZWF9XCI+PC90ZXh0YXJlYT5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd2YWxpZGF0aW9uLW1lc3NhZ2UnXX1cIiBpZD1cIiR7c3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddfVwiPjwvZGl2PlxuICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuYWN0aW9uc31cIj5cbiAgICAgPGRpdiBjbGFzcz1cIiR7c3dhbENsYXNzZXMubG9hZGVyfVwiPjwvZGl2PlxuICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIiR7c3dhbENsYXNzZXMuY29uZmlybX1cIj48L2J1dHRvbj5cbiAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmRlbnl9XCI+PC9idXR0b24+XG4gICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiJHtzd2FsQ2xhc3Nlcy5jYW5jZWx9XCI+PC9idXR0b24+XG4gICA8L2Rpdj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzLmZvb3Rlcn1cIj48L2Rpdj5cbiAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXItY29udGFpbmVyJ119XCI+XG4gICAgIDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWyd0aW1lci1wcm9ncmVzcy1iYXInXX1cIj48L2Rpdj5cbiAgIDwvZGl2PlxuIDwvZGl2PlxuYC5yZXBsYWNlKC8oXnxcXG4pXFxzKi9nLCAnJylcblxuY29uc3QgcmVzZXRPbGRDb250YWluZXIgPSAoKSA9PiB7XG4gIGNvbnN0IG9sZENvbnRhaW5lciA9IGdldENvbnRhaW5lcigpXG4gIGlmICghb2xkQ29udGFpbmVyKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICBvbGRDb250YWluZXIucmVtb3ZlKClcbiAgcmVtb3ZlQ2xhc3MoXG4gICAgW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0sXG4gICAgW3N3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXSwgc3dhbENsYXNzZXNbJ2hhcy1jb2x1bW4nXV1cbiAgKVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UgPSAoKSA9PiB7XG4gIGdsb2JhbFN0YXRlLmN1cnJlbnRJbnN0YW5jZS5yZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbn1cblxuY29uc3QgYWRkSW5wdXRDaGFuZ2VMaXN0ZW5lcnMgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZ2V0UG9wdXAoKVxuXG4gIGNvbnN0IGlucHV0ID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5pbnB1dClcbiAgY29uc3QgZmlsZSA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuZmlsZSlcbiAgY29uc3QgcmFuZ2UgPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5yYW5nZX0gaW5wdXRgKVxuICBjb25zdCByYW5nZU91dHB1dCA9IHBvcHVwLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3YWxDbGFzc2VzLnJhbmdlfSBvdXRwdXRgKVxuICBjb25zdCBzZWxlY3QgPSBnZXREaXJlY3RDaGlsZEJ5Q2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnNlbGVjdClcbiAgY29uc3QgY2hlY2tib3ggPSBwb3B1cC5xdWVyeVNlbGVjdG9yKGAuJHtzd2FsQ2xhc3Nlcy5jaGVja2JveH0gaW5wdXRgKVxuICBjb25zdCB0ZXh0YXJlYSA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMudGV4dGFyZWEpXG5cbiAgaW5wdXQub25pbnB1dCA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgZmlsZS5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgc2VsZWN0Lm9uY2hhbmdlID0gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZVxuICBjaGVja2JveC5vbmNoYW5nZSA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcbiAgdGV4dGFyZWEub25pbnB1dCA9IHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2VcblxuICByYW5nZS5vbmlucHV0ID0gKCkgPT4ge1xuICAgIHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxuICAgIHJhbmdlT3V0cHV0LnZhbHVlID0gcmFuZ2UudmFsdWVcbiAgfVxuXG4gIHJhbmdlLm9uY2hhbmdlID0gKCkgPT4ge1xuICAgIHJlc2V0VmFsaWRhdGlvbk1lc3NhZ2UoKVxuICAgIHJhbmdlLm5leHRTaWJsaW5nLnZhbHVlID0gcmFuZ2UudmFsdWVcbiAgfVxufVxuXG5jb25zdCBnZXRUYXJnZXQgPSAodGFyZ2V0KSA9PiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCkgOiB0YXJnZXQpXG5cbmNvbnN0IHNldHVwQWNjZXNzaWJpbGl0eSA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBnZXRQb3B1cCgpXG5cbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdyb2xlJywgcGFyYW1zLnRvYXN0ID8gJ2FsZXJ0JyA6ICdkaWFsb2cnKVxuICBwb3B1cC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGl2ZScsIHBhcmFtcy50b2FzdCA/ICdwb2xpdGUnIDogJ2Fzc2VydGl2ZScpXG4gIGlmICghcGFyYW1zLnRvYXN0KSB7XG4gICAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKVxuICB9XG59XG5cbmNvbnN0IHNldHVwUlRMID0gKHRhcmdldEVsZW1lbnQpID0+IHtcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRhcmdldEVsZW1lbnQpLmRpcmVjdGlvbiA9PT0gJ3J0bCcpIHtcbiAgICBhZGRDbGFzcyhnZXRDb250YWluZXIoKSwgc3dhbENsYXNzZXMucnRsKVxuICB9XG59XG5cbi8qXG4gKiBBZGQgbW9kYWwgKyBiYWNrZHJvcCB0byBET01cbiAqL1xuZXhwb3J0IGNvbnN0IGluaXQgPSAocGFyYW1zKSA9PiB7XG4gIC8vIENsZWFuIHVwIHRoZSBvbGQgcG9wdXAgY29udGFpbmVyIGlmIGl0IGV4aXN0c1xuICBjb25zdCBvbGRDb250YWluZXJFeGlzdGVkID0gcmVzZXRPbGRDb250YWluZXIoKVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAqL1xuICBpZiAoaXNOb2RlRW52KCkpIHtcbiAgICBlcnJvcignU3dlZXRBbGVydDIgcmVxdWlyZXMgZG9jdW1lbnQgdG8gaW5pdGlhbGl6ZScpXG4gICAgcmV0dXJuXG4gIH1cblxuICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICBjb250YWluZXIuY2xhc3NOYW1lID0gc3dhbENsYXNzZXMuY29udGFpbmVyXG4gIGlmIChvbGRDb250YWluZXJFeGlzdGVkKSB7XG4gICAgYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1snbm8tdHJhbnNpdGlvbiddKVxuICB9XG4gIHNldElubmVySHRtbChjb250YWluZXIsIHN3ZWV0SFRNTClcblxuICBjb25zdCB0YXJnZXRFbGVtZW50ID0gZ2V0VGFyZ2V0KHBhcmFtcy50YXJnZXQpXG4gIHRhcmdldEVsZW1lbnQuYXBwZW5kQ2hpbGQoY29udGFpbmVyKVxuXG4gIHNldHVwQWNjZXNzaWJpbGl0eShwYXJhbXMpXG4gIHNldHVwUlRMKHRhcmdldEVsZW1lbnQpXG4gIGFkZElucHV0Q2hhbmdlTGlzdGVuZXJzKClcbn1cbiIsImltcG9ydCB7IHNldElubmVySHRtbCB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudCB8IG9iamVjdCB8IHN0cmluZ30gcGFyYW1cbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHRhcmdldFxuICovXG5leHBvcnQgY29uc3QgcGFyc2VIdG1sVG9Db250YWluZXIgPSAocGFyYW0sIHRhcmdldCkgPT4ge1xuICAvLyBET00gZWxlbWVudFxuICBpZiAocGFyYW0gaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChwYXJhbSlcbiAgfVxuXG4gIC8vIE9iamVjdFxuICBlbHNlIGlmICh0eXBlb2YgcGFyYW0gPT09ICdvYmplY3QnKSB7XG4gICAgaGFuZGxlT2JqZWN0KHBhcmFtLCB0YXJnZXQpXG4gIH1cblxuICAvLyBQbGFpbiBzdHJpbmdcbiAgZWxzZSBpZiAocGFyYW0pIHtcbiAgICBzZXRJbm5lckh0bWwodGFyZ2V0LCBwYXJhbSlcbiAgfVxufVxuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBwYXJhbVxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gdGFyZ2V0XG4gKi9cbmNvbnN0IGhhbmRsZU9iamVjdCA9IChwYXJhbSwgdGFyZ2V0KSA9PiB7XG4gIC8vIEpRdWVyeSBlbGVtZW50KHMpXG4gIGlmIChwYXJhbS5qcXVlcnkpIHtcbiAgICBoYW5kbGVKcXVlcnlFbGVtKHRhcmdldCwgcGFyYW0pXG4gIH1cblxuICAvLyBGb3Igb3RoZXIgb2JqZWN0cyB1c2UgdGhlaXIgc3RyaW5nIHJlcHJlc2VudGF0aW9uXG4gIGVsc2Uge1xuICAgIHNldElubmVySHRtbCh0YXJnZXQsIHBhcmFtLnRvU3RyaW5nKCkpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlSnF1ZXJ5RWxlbSA9ICh0YXJnZXQsIGVsZW0pID0+IHtcbiAgdGFyZ2V0LnRleHRDb250ZW50ID0gJydcbiAgaWYgKDAgaW4gZWxlbSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIGluIGVsZW07IGkrKykge1xuICAgICAgdGFyZ2V0LmFwcGVuZENoaWxkKGVsZW1baV0uY2xvbmVOb2RlKHRydWUpKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoZWxlbS5jbG9uZU5vZGUodHJ1ZSkpXG4gIH1cbn1cbiIsImltcG9ydCB7IGlzTm9kZUVudiB9IGZyb20gJy4uL2lzTm9kZUVudi5qcydcblxuZXhwb3J0IGNvbnN0IGFuaW1hdGlvbkVuZEV2ZW50ID0gKCgpID0+IHtcbiAgLy8gUHJldmVudCBydW4gaW4gTm9kZSBlbnZcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICovXG4gIGlmIChpc05vZGVFbnYoKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgdGVzdEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgY29uc3QgdHJhbnNFbmRFdmVudE5hbWVzID0ge1xuICAgIFdlYmtpdEFuaW1hdGlvbjogJ3dlYmtpdEFuaW1hdGlvbkVuZCcsIC8vIENocm9tZSwgU2FmYXJpIGFuZCBPcGVyYVxuICAgIGFuaW1hdGlvbjogJ2FuaW1hdGlvbmVuZCcsIC8vIFN0YW5kYXJkIHN5bnRheFxuICB9XG4gIGZvciAoY29uc3QgaSBpbiB0cmFuc0VuZEV2ZW50TmFtZXMpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRyYW5zRW5kRXZlbnROYW1lcywgaSkgJiYgdHlwZW9mIHRlc3RFbC5zdHlsZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0cmFuc0VuZEV2ZW50TmFtZXNbaV1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn0pKClcbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcblxuLy8gTWVhc3VyZSBzY3JvbGxiYXIgd2lkdGggZm9yIHBhZGRpbmcgYm9keSBkdXJpbmcgbW9kYWwgc2hvdy9oaWRlXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvanMvc3JjL21vZGFsLmpzXG5leHBvcnQgY29uc3QgbWVhc3VyZVNjcm9sbGJhciA9ICgpID0+IHtcbiAgY29uc3Qgc2Nyb2xsRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgc2Nyb2xsRGl2LmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzWydzY3JvbGxiYXItbWVhc3VyZSddXG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsRGl2KVxuICBjb25zdCBzY3JvbGxiYXJXaWR0aCA9IHNjcm9sbERpdi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCAtIHNjcm9sbERpdi5jbGllbnRXaWR0aFxuICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgcmV0dXJuIHNjcm9sbGJhcldpZHRoXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJBY3Rpb25zID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgYWN0aW9ucyA9IGRvbS5nZXRBY3Rpb25zKClcbiAgY29uc3QgbG9hZGVyID0gZG9tLmdldExvYWRlcigpXG5cbiAgLy8gQWN0aW9ucyAoYnV0dG9ucykgd3JhcHBlclxuICBpZiAoIXBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiAmJiAhcGFyYW1zLnNob3dEZW55QnV0dG9uICYmICFwYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbikge1xuICAgIGRvbS5oaWRlKGFjdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgZG9tLnNob3coYWN0aW9ucylcbiAgfVxuXG4gIC8vIEN1c3RvbSBjbGFzc1xuICBkb20uYXBwbHlDdXN0b21DbGFzcyhhY3Rpb25zLCBwYXJhbXMsICdhY3Rpb25zJylcblxuICAvLyBSZW5kZXIgYWxsIHRoZSBidXR0b25zXG4gIHJlbmRlckJ1dHRvbnMoYWN0aW9ucywgbG9hZGVyLCBwYXJhbXMpXG5cbiAgLy8gTG9hZGVyXG4gIGRvbS5zZXRJbm5lckh0bWwobG9hZGVyLCBwYXJhbXMubG9hZGVySHRtbClcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MobG9hZGVyLCBwYXJhbXMsICdsb2FkZXInKVxufVxuXG5mdW5jdGlvbiByZW5kZXJCdXR0b25zKGFjdGlvbnMsIGxvYWRlciwgcGFyYW1zKSB7XG4gIGNvbnN0IGNvbmZpcm1CdXR0b24gPSBkb20uZ2V0Q29uZmlybUJ1dHRvbigpXG4gIGNvbnN0IGRlbnlCdXR0b24gPSBkb20uZ2V0RGVueUJ1dHRvbigpXG4gIGNvbnN0IGNhbmNlbEJ1dHRvbiA9IGRvbS5nZXRDYW5jZWxCdXR0b24oKVxuXG4gIC8vIFJlbmRlciBidXR0b25zXG4gIHJlbmRlckJ1dHRvbihjb25maXJtQnV0dG9uLCAnY29uZmlybScsIHBhcmFtcylcbiAgcmVuZGVyQnV0dG9uKGRlbnlCdXR0b24sICdkZW55JywgcGFyYW1zKVxuICByZW5kZXJCdXR0b24oY2FuY2VsQnV0dG9uLCAnY2FuY2VsJywgcGFyYW1zKVxuICBoYW5kbGVCdXR0b25zU3R5bGluZyhjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b24sIHBhcmFtcylcblxuICBpZiAocGFyYW1zLnJldmVyc2VCdXR0b25zKSB7XG4gICAgaWYgKHBhcmFtcy50b2FzdCkge1xuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoY2FuY2VsQnV0dG9uLCBjb25maXJtQnV0dG9uKVxuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoZGVueUJ1dHRvbiwgY29uZmlybUJ1dHRvbilcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aW9ucy5pbnNlcnRCZWZvcmUoY2FuY2VsQnV0dG9uLCBsb2FkZXIpXG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShkZW55QnV0dG9uLCBsb2FkZXIpXG4gICAgICBhY3Rpb25zLmluc2VydEJlZm9yZShjb25maXJtQnV0dG9uLCBsb2FkZXIpXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUJ1dHRvbnNTdHlsaW5nKGNvbmZpcm1CdXR0b24sIGRlbnlCdXR0b24sIGNhbmNlbEJ1dHRvbiwgcGFyYW1zKSB7XG4gIGlmICghcGFyYW1zLmJ1dHRvbnNTdHlsaW5nKSB7XG4gICAgcmV0dXJuIGRvbS5yZW1vdmVDbGFzcyhbY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uXSwgc3dhbENsYXNzZXMuc3R5bGVkKVxuICB9XG5cbiAgZG9tLmFkZENsYXNzKFtjb25maXJtQnV0dG9uLCBkZW55QnV0dG9uLCBjYW5jZWxCdXR0b25dLCBzd2FsQ2xhc3Nlcy5zdHlsZWQpXG5cbiAgLy8gQnV0dG9ucyBiYWNrZ3JvdW5kIGNvbG9yc1xuICBpZiAocGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvcikge1xuICAgIGNvbmZpcm1CdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNvbmZpcm1CdXR0b25Db2xvclxuICAgIGRvbS5hZGRDbGFzcyhjb25maXJtQnV0dG9uLCBzd2FsQ2xhc3Nlc1snZGVmYXVsdC1vdXRsaW5lJ10pXG4gIH1cbiAgaWYgKHBhcmFtcy5kZW55QnV0dG9uQ29sb3IpIHtcbiAgICBkZW55QnV0dG9uLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHBhcmFtcy5kZW55QnV0dG9uQ29sb3JcbiAgICBkb20uYWRkQ2xhc3MoZGVueUJ1dHRvbiwgc3dhbENsYXNzZXNbJ2RlZmF1bHQtb3V0bGluZSddKVxuICB9XG4gIGlmIChwYXJhbXMuY2FuY2VsQnV0dG9uQ29sb3IpIHtcbiAgICBjYW5jZWxCdXR0b24uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcGFyYW1zLmNhbmNlbEJ1dHRvbkNvbG9yXG4gICAgZG9tLmFkZENsYXNzKGNhbmNlbEJ1dHRvbiwgc3dhbENsYXNzZXNbJ2RlZmF1bHQtb3V0bGluZSddKVxuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckJ1dHRvbihidXR0b24sIGJ1dHRvblR5cGUsIHBhcmFtcykge1xuICBkb20udG9nZ2xlKGJ1dHRvbiwgcGFyYW1zW2BzaG93JHtjYXBpdGFsaXplRmlyc3RMZXR0ZXIoYnV0dG9uVHlwZSl9QnV0dG9uYF0sICdpbmxpbmUtYmxvY2snKVxuICBkb20uc2V0SW5uZXJIdG1sKGJ1dHRvbiwgcGFyYW1zW2Ake2J1dHRvblR5cGV9QnV0dG9uVGV4dGBdKSAvLyBTZXQgY2FwdGlvbiB0ZXh0XG4gIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCBwYXJhbXNbYCR7YnV0dG9uVHlwZX1CdXR0b25BcmlhTGFiZWxgXSkgLy8gQVJJQSBsYWJlbFxuXG4gIC8vIEFkZCBidXR0b25zIGN1c3RvbSBjbGFzc2VzXG4gIGJ1dHRvbi5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlc1tidXR0b25UeXBlXVxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhidXR0b24sIHBhcmFtcywgYCR7YnV0dG9uVHlwZX1CdXR0b25gKVxuICBkb20uYWRkQ2xhc3MoYnV0dG9uLCBwYXJhbXNbYCR7YnV0dG9uVHlwZX1CdXR0b25DbGFzc2BdKVxufVxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0IHsgd2FybiB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZnVuY3Rpb24gaGFuZGxlQmFja2Ryb3BQYXJhbShjb250YWluZXIsIGJhY2tkcm9wKSB7XG4gIGlmICh0eXBlb2YgYmFja2Ryb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSBiYWNrZHJvcFxuICB9IGVsc2UgaWYgKCFiYWNrZHJvcCkge1xuICAgIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXNbJ25vLWJhY2tkcm9wJ10pXG4gIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlUG9zaXRpb25QYXJhbShjb250YWluZXIsIHBvc2l0aW9uKSB7XG4gIGlmIChwb3NpdGlvbiBpbiBzd2FsQ2xhc3Nlcykge1xuICAgIGRvbS5hZGRDbGFzcyhjb250YWluZXIsIHN3YWxDbGFzc2VzW3Bvc2l0aW9uXSlcbiAgfSBlbHNlIHtcbiAgICB3YXJuKCdUaGUgXCJwb3NpdGlvblwiIHBhcmFtZXRlciBpcyBub3QgdmFsaWQsIGRlZmF1bHRpbmcgdG8gXCJjZW50ZXJcIicpXG4gICAgZG9tLmFkZENsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXMuY2VudGVyKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUdyb3dQYXJhbShjb250YWluZXIsIGdyb3cpIHtcbiAgaWYgKGdyb3cgJiYgdHlwZW9mIGdyb3cgPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgZ3Jvd0NsYXNzID0gYGdyb3ctJHtncm93fWBcbiAgICBpZiAoZ3Jvd0NsYXNzIGluIHN3YWxDbGFzc2VzKSB7XG4gICAgICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBzd2FsQ2xhc3Nlc1tncm93Q2xhc3NdKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcmVuZGVyQ29udGFpbmVyID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG5cbiAgaWYgKCFjb250YWluZXIpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGhhbmRsZUJhY2tkcm9wUGFyYW0oY29udGFpbmVyLCBwYXJhbXMuYmFja2Ryb3ApXG5cbiAgaGFuZGxlUG9zaXRpb25QYXJhbShjb250YWluZXIsIHBhcmFtcy5wb3NpdGlvbilcbiAgaGFuZGxlR3Jvd1BhcmFtKGNvbnRhaW5lciwgcGFyYW1zLmdyb3cpXG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGNvbnRhaW5lciwgcGFyYW1zLCAnY29udGFpbmVyJylcbn1cbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgYFdlYWtNYXBgcyBmb3IgZWFjaCBlZmZlY3RpdmVseS1cInByaXZhdGUgIHByb3BlcnR5XCIgdGhhdCBhIGBTd2FsYCBoYXMuXG4gKiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBwcml2YXRlIHByb3BlcnR5IFwiZm9vXCIgb2YgYHRoaXNgIHRvIFwiYmFyXCIsIHlvdSBjYW4gYHByaXZhdGVQcm9wcy5mb28uc2V0KHRoaXMsICdiYXInKWBcbiAqIFRoaXMgaXMgdGhlIGFwcHJvYWNoIHRoYXQgQmFiZWwgd2lsbCBwcm9iYWJseSB0YWtlIHRvIGltcGxlbWVudCBwcml2YXRlIG1ldGhvZHMvZmllbGRzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByaXZhdGUtbWV0aG9kc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvcHVsbC83NTU1XG4gKiBPbmNlIHdlIGhhdmUgdGhlIGNoYW5nZXMgZnJvbSB0aGF0IFBSIGluIEJhYmVsLCBhbmQgb3VyIGNvcmUgY2xhc3MgZml0cyByZWFzb25hYmxlIGluICpvbmUgbW9kdWxlKlxuICogICB0aGVuIHdlIGNhbiB1c2UgdGhhdCBsYW5ndWFnZSBmZWF0dXJlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgYXdhaXRpbmdQcm9taXNlOiBuZXcgV2Vha01hcCgpLFxuICBwcm9taXNlOiBuZXcgV2Vha01hcCgpLFxuICBpbm5lclBhcmFtczogbmV3IFdlYWtNYXAoKSxcbiAgZG9tQ2FjaGU6IG5ldyBXZWFrTWFwKCksXG59XG4iLCJpbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBlcnJvciwgaXNQcm9taXNlLCB3YXJuIH0gZnJvbSAnLi4vLi4vdXRpbHMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi8uLi8uLi9wcml2YXRlUHJvcHMuanMnXG5cbmNvbnN0IGlucHV0VHlwZXMgPSBbJ2lucHV0JywgJ2ZpbGUnLCAncmFuZ2UnLCAnc2VsZWN0JywgJ3JhZGlvJywgJ2NoZWNrYm94JywgJ3RleHRhcmVhJ11cblxuZXhwb3J0IGNvbnN0IHJlbmRlcklucHV0ID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgcG9wdXAgPSBkb20uZ2V0UG9wdXAoKVxuICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gIGNvbnN0IHJlcmVuZGVyID0gIWlubmVyUGFyYW1zIHx8IHBhcmFtcy5pbnB1dCAhPT0gaW5uZXJQYXJhbXMuaW5wdXRcblxuICBpbnB1dFR5cGVzLmZvckVhY2goKGlucHV0VHlwZSkgPT4ge1xuICAgIGNvbnN0IGlucHV0Q2xhc3MgPSBzd2FsQ2xhc3Nlc1tpbnB1dFR5cGVdXG4gICAgY29uc3QgaW5wdXRDb250YWluZXIgPSBkb20uZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBpbnB1dENsYXNzKVxuXG4gICAgLy8gc2V0IGF0dHJpYnV0ZXNcbiAgICBzZXRBdHRyaWJ1dGVzKGlucHV0VHlwZSwgcGFyYW1zLmlucHV0QXR0cmlidXRlcylcblxuICAgIC8vIHNldCBjbGFzc1xuICAgIGlucHV0Q29udGFpbmVyLmNsYXNzTmFtZSA9IGlucHV0Q2xhc3NcblxuICAgIGlmIChyZXJlbmRlcikge1xuICAgICAgZG9tLmhpZGUoaW5wdXRDb250YWluZXIpXG4gICAgfVxuICB9KVxuXG4gIGlmIChwYXJhbXMuaW5wdXQpIHtcbiAgICBpZiAocmVyZW5kZXIpIHtcbiAgICAgIHNob3dJbnB1dChwYXJhbXMpXG4gICAgfVxuICAgIC8vIHNldCBjdXN0b20gY2xhc3NcbiAgICBzZXRDdXN0b21DbGFzcyhwYXJhbXMpXG4gIH1cbn1cblxuY29uc3Qgc2hvd0lucHV0ID0gKHBhcmFtcykgPT4ge1xuICBpZiAoIXJlbmRlcklucHV0VHlwZVtwYXJhbXMuaW5wdXRdKSB7XG4gICAgcmV0dXJuIGVycm9yKFxuICAgICAgYFVuZXhwZWN0ZWQgdHlwZSBvZiBpbnB1dCEgRXhwZWN0ZWQgXCJ0ZXh0XCIsIFwiZW1haWxcIiwgXCJwYXNzd29yZFwiLCBcIm51bWJlclwiLCBcInRlbFwiLCBcInNlbGVjdFwiLCBcInJhZGlvXCIsIFwiY2hlY2tib3hcIiwgXCJ0ZXh0YXJlYVwiLCBcImZpbGVcIiBvciBcInVybFwiLCBnb3QgXCIke3BhcmFtcy5pbnB1dH1cImBcbiAgICApXG4gIH1cblxuICBjb25zdCBpbnB1dENvbnRhaW5lciA9IGdldElucHV0Q29udGFpbmVyKHBhcmFtcy5pbnB1dClcbiAgY29uc3QgaW5wdXQgPSByZW5kZXJJbnB1dFR5cGVbcGFyYW1zLmlucHV0XShpbnB1dENvbnRhaW5lciwgcGFyYW1zKVxuICBkb20uc2hvdyhpbnB1dClcblxuICAvLyBpbnB1dCBhdXRvZm9jdXNcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgZG9tLmZvY3VzSW5wdXQoaW5wdXQpXG4gIH0pXG59XG5cbmNvbnN0IHJlbW92ZUF0dHJpYnV0ZXMgPSAoaW5wdXQpID0+IHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnB1dC5hdHRyaWJ1dGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgYXR0ck5hbWUgPSBpbnB1dC5hdHRyaWJ1dGVzW2ldLm5hbWVcbiAgICBpZiAoIVsndHlwZScsICd2YWx1ZScsICdzdHlsZSddLmluY2x1ZGVzKGF0dHJOYW1lKSkge1xuICAgICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKGF0dHJOYW1lKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzZXRBdHRyaWJ1dGVzID0gKGlucHV0VHlwZSwgaW5wdXRBdHRyaWJ1dGVzKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gZG9tLmdldElucHV0KGRvbS5nZXRQb3B1cCgpLCBpbnB1dFR5cGUpXG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHJlbW92ZUF0dHJpYnV0ZXMoaW5wdXQpXG5cbiAgZm9yIChjb25zdCBhdHRyIGluIGlucHV0QXR0cmlidXRlcykge1xuICAgIGlucHV0LnNldEF0dHJpYnV0ZShhdHRyLCBpbnB1dEF0dHJpYnV0ZXNbYXR0cl0pXG4gIH1cbn1cblxuY29uc3Qgc2V0Q3VzdG9tQ2xhc3MgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlucHV0Q29udGFpbmVyID0gZ2V0SW5wdXRDb250YWluZXIocGFyYW1zLmlucHV0KVxuICBpZiAocGFyYW1zLmN1c3RvbUNsYXNzKSB7XG4gICAgZG9tLmFkZENsYXNzKGlucHV0Q29udGFpbmVyLCBwYXJhbXMuY3VzdG9tQ2xhc3MuaW5wdXQpXG4gIH1cbn1cblxuY29uc3Qgc2V0SW5wdXRQbGFjZWhvbGRlciA9IChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gIGlmICghaW5wdXQucGxhY2Vob2xkZXIgfHwgcGFyYW1zLmlucHV0UGxhY2Vob2xkZXIpIHtcbiAgICBpbnB1dC5wbGFjZWhvbGRlciA9IHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyXG4gIH1cbn1cblxuY29uc3Qgc2V0SW5wdXRMYWJlbCA9IChpbnB1dCwgcHJlcGVuZFRvLCBwYXJhbXMpID0+IHtcbiAgaWYgKHBhcmFtcy5pbnB1dExhYmVsKSB7XG4gICAgaW5wdXQuaWQgPSBzd2FsQ2xhc3Nlcy5pbnB1dFxuICAgIGNvbnN0IGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxuICAgIGNvbnN0IGxhYmVsQ2xhc3MgPSBzd2FsQ2xhc3Nlc1snaW5wdXQtbGFiZWwnXVxuICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgaW5wdXQuaWQpXG4gICAgbGFiZWwuY2xhc3NOYW1lID0gbGFiZWxDbGFzc1xuICAgIGRvbS5hZGRDbGFzcyhsYWJlbCwgcGFyYW1zLmN1c3RvbUNsYXNzLmlucHV0TGFiZWwpXG4gICAgbGFiZWwuaW5uZXJUZXh0ID0gcGFyYW1zLmlucHV0TGFiZWxcbiAgICBwcmVwZW5kVG8uaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmViZWdpbicsIGxhYmVsKVxuICB9XG59XG5cbmNvbnN0IGdldElucHV0Q29udGFpbmVyID0gKGlucHV0VHlwZSkgPT4ge1xuICBjb25zdCBpbnB1dENsYXNzID0gc3dhbENsYXNzZXNbaW5wdXRUeXBlXSA/IHN3YWxDbGFzc2VzW2lucHV0VHlwZV0gOiBzd2FsQ2xhc3Nlcy5pbnB1dFxuICByZXR1cm4gZG9tLmdldERpcmVjdENoaWxkQnlDbGFzcyhkb20uZ2V0UG9wdXAoKSwgaW5wdXRDbGFzcylcbn1cblxuY29uc3QgcmVuZGVySW5wdXRUeXBlID0ge31cblxucmVuZGVySW5wdXRUeXBlLnRleHQgPVxuICByZW5kZXJJbnB1dFR5cGUuZW1haWwgPVxuICByZW5kZXJJbnB1dFR5cGUucGFzc3dvcmQgPVxuICByZW5kZXJJbnB1dFR5cGUubnVtYmVyID1cbiAgcmVuZGVySW5wdXRUeXBlLnRlbCA9XG4gIHJlbmRlcklucHV0VHlwZS51cmwgPVxuICAgIChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHBhcmFtcy5pbnB1dFZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgcGFyYW1zLmlucHV0VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGlucHV0LnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgICAgIH0gZWxzZSBpZiAoIWlzUHJvbWlzZShwYXJhbXMuaW5wdXRWYWx1ZSkpIHtcbiAgICAgICAgd2FybihcbiAgICAgICAgICBgVW5leHBlY3RlZCB0eXBlIG9mIGlucHV0VmFsdWUhIEV4cGVjdGVkIFwic3RyaW5nXCIsIFwibnVtYmVyXCIgb3IgXCJQcm9taXNlXCIsIGdvdCBcIiR7dHlwZW9mIHBhcmFtcy5pbnB1dFZhbHVlfVwiYFxuICAgICAgICApXG4gICAgICB9XG4gICAgICBzZXRJbnB1dExhYmVsKGlucHV0LCBpbnB1dCwgcGFyYW1zKVxuICAgICAgc2V0SW5wdXRQbGFjZWhvbGRlcihpbnB1dCwgcGFyYW1zKVxuICAgICAgaW5wdXQudHlwZSA9IHBhcmFtcy5pbnB1dFxuICAgICAgcmV0dXJuIGlucHV0XG4gICAgfVxuXG5yZW5kZXJJbnB1dFR5cGUuZmlsZSA9IChpbnB1dCwgcGFyYW1zKSA9PiB7XG4gIHNldElucHV0TGFiZWwoaW5wdXQsIGlucHV0LCBwYXJhbXMpXG4gIHNldElucHV0UGxhY2Vob2xkZXIoaW5wdXQsIHBhcmFtcylcbiAgcmV0dXJuIGlucHV0XG59XG5cbnJlbmRlcklucHV0VHlwZS5yYW5nZSA9IChyYW5nZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IHJhbmdlSW5wdXQgPSByYW5nZS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpXG4gIGNvbnN0IHJhbmdlT3V0cHV0ID0gcmFuZ2UucXVlcnlTZWxlY3Rvcignb3V0cHV0JylcbiAgcmFuZ2VJbnB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gIHJhbmdlSW5wdXQudHlwZSA9IHBhcmFtcy5pbnB1dFxuICByYW5nZU91dHB1dC52YWx1ZSA9IHBhcmFtcy5pbnB1dFZhbHVlXG4gIHNldElucHV0TGFiZWwocmFuZ2VJbnB1dCwgcmFuZ2UsIHBhcmFtcylcbiAgcmV0dXJuIHJhbmdlXG59XG5cbnJlbmRlcklucHV0VHlwZS5zZWxlY3QgPSAoc2VsZWN0LCBwYXJhbXMpID0+IHtcbiAgc2VsZWN0LnRleHRDb250ZW50ID0gJydcbiAgaWYgKHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKSB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgIGRvbS5zZXRJbm5lckh0bWwocGxhY2Vob2xkZXIsIHBhcmFtcy5pbnB1dFBsYWNlaG9sZGVyKVxuICAgIHBsYWNlaG9sZGVyLnZhbHVlID0gJydcbiAgICBwbGFjZWhvbGRlci5kaXNhYmxlZCA9IHRydWVcbiAgICBwbGFjZWhvbGRlci5zZWxlY3RlZCA9IHRydWVcbiAgICBzZWxlY3QuYXBwZW5kQ2hpbGQocGxhY2Vob2xkZXIpXG4gIH1cbiAgc2V0SW5wdXRMYWJlbChzZWxlY3QsIHNlbGVjdCwgcGFyYW1zKVxuICByZXR1cm4gc2VsZWN0XG59XG5cbnJlbmRlcklucHV0VHlwZS5yYWRpbyA9IChyYWRpbykgPT4ge1xuICByYWRpby50ZXh0Q29udGVudCA9ICcnXG4gIHJldHVybiByYWRpb1xufVxuXG5yZW5kZXJJbnB1dFR5cGUuY2hlY2tib3ggPSAoY2hlY2tib3hDb250YWluZXIsIHBhcmFtcykgPT4ge1xuICAvKiogQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9ICovXG4gIGNvbnN0IGNoZWNrYm94ID0gZG9tLmdldElucHV0KGRvbS5nZXRQb3B1cCgpLCAnY2hlY2tib3gnKVxuICBjaGVja2JveC52YWx1ZSA9ICcxJ1xuICBjaGVja2JveC5pZCA9IHN3YWxDbGFzc2VzLmNoZWNrYm94XG4gIGNoZWNrYm94LmNoZWNrZWQgPSBCb29sZWFuKHBhcmFtcy5pbnB1dFZhbHVlKVxuICBjb25zdCBsYWJlbCA9IGNoZWNrYm94Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ3NwYW4nKVxuICBkb20uc2V0SW5uZXJIdG1sKGxhYmVsLCBwYXJhbXMuaW5wdXRQbGFjZWhvbGRlcilcbiAgcmV0dXJuIGNoZWNrYm94Q29udGFpbmVyXG59XG5cbnJlbmRlcklucHV0VHlwZS50ZXh0YXJlYSA9ICh0ZXh0YXJlYSwgcGFyYW1zKSA9PiB7XG4gIHRleHRhcmVhLnZhbHVlID0gcGFyYW1zLmlucHV0VmFsdWVcbiAgc2V0SW5wdXRQbGFjZWhvbGRlcih0ZXh0YXJlYSwgcGFyYW1zKVxuICBzZXRJbnB1dExhYmVsKHRleHRhcmVhLCB0ZXh0YXJlYSwgcGFyYW1zKVxuXG4gIGNvbnN0IGdldE1hcmdpbiA9IChlbCkgPT5cbiAgICBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkubWFyZ2luTGVmdCkgKyBwYXJzZUludCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCkubWFyZ2luUmlnaHQpXG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMjkxXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTY5OVxuICAgIGlmICgnTXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgICBjb25zdCBpbml0aWFsUG9wdXBXaWR0aCA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvbS5nZXRQb3B1cCgpKS53aWR0aClcbiAgICAgIGNvbnN0IHRleHRhcmVhUmVzaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dGFyZWFXaWR0aCA9IHRleHRhcmVhLm9mZnNldFdpZHRoICsgZ2V0TWFyZ2luKHRleHRhcmVhKVxuICAgICAgICBpZiAodGV4dGFyZWFXaWR0aCA+IGluaXRpYWxQb3B1cFdpZHRoKSB7XG4gICAgICAgICAgZG9tLmdldFBvcHVwKCkuc3R5bGUud2lkdGggPSBgJHt0ZXh0YXJlYVdpZHRofXB4YFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvbS5nZXRQb3B1cCgpLnN0eWxlLndpZHRoID0gbnVsbFxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBuZXcgTXV0YXRpb25PYnNlcnZlcih0ZXh0YXJlYVJlc2l6ZUhhbmRsZXIpLm9ic2VydmUodGV4dGFyZWEsIHtcbiAgICAgICAgYXR0cmlidXRlczogdHJ1ZSxcbiAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ3N0eWxlJ10sXG4gICAgICB9KVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gdGV4dGFyZWFcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyByZW5kZXJJbnB1dCB9IGZyb20gJy4vcmVuZGVySW5wdXQuanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJDb250ZW50ID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaHRtbENvbnRhaW5lciA9IGRvbS5nZXRIdG1sQ29udGFpbmVyKClcblxuICBkb20uYXBwbHlDdXN0b21DbGFzcyhodG1sQ29udGFpbmVyLCBwYXJhbXMsICdodG1sQ29udGFpbmVyJylcblxuICAvLyBDb250ZW50IGFzIEhUTUxcbiAgaWYgKHBhcmFtcy5odG1sKSB7XG4gICAgZG9tLnBhcnNlSHRtbFRvQ29udGFpbmVyKHBhcmFtcy5odG1sLCBodG1sQ29udGFpbmVyKVxuICAgIGRvbS5zaG93KGh0bWxDb250YWluZXIsICdibG9jaycpXG4gIH1cblxuICAvLyBDb250ZW50IGFzIHBsYWluIHRleHRcbiAgZWxzZSBpZiAocGFyYW1zLnRleHQpIHtcbiAgICBodG1sQ29udGFpbmVyLnRleHRDb250ZW50ID0gcGFyYW1zLnRleHRcbiAgICBkb20uc2hvdyhodG1sQ29udGFpbmVyLCAnYmxvY2snKVxuICB9XG5cbiAgLy8gTm8gY29udGVudFxuICBlbHNlIHtcbiAgICBkb20uaGlkZShodG1sQ29udGFpbmVyKVxuICB9XG5cbiAgcmVuZGVySW5wdXQoaW5zdGFuY2UsIHBhcmFtcylcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJGb290ZXIgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBmb290ZXIgPSBkb20uZ2V0Rm9vdGVyKClcblxuICBkb20udG9nZ2xlKGZvb3RlciwgcGFyYW1zLmZvb3RlcilcblxuICBpZiAocGFyYW1zLmZvb3Rlcikge1xuICAgIGRvbS5wYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMuZm9vdGVyLCBmb290ZXIpXG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoZm9vdGVyLCBwYXJhbXMsICdmb290ZXInKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckNsb3NlQnV0dG9uID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgY2xvc2VCdXR0b24gPSBkb20uZ2V0Q2xvc2VCdXR0b24oKVxuXG4gIGRvbS5zZXRJbm5lckh0bWwoY2xvc2VCdXR0b24sIHBhcmFtcy5jbG9zZUJ1dHRvbkh0bWwpXG5cbiAgLy8gQ3VzdG9tIGNsYXNzXG4gIGRvbS5hcHBseUN1c3RvbUNsYXNzKGNsb3NlQnV0dG9uLCBwYXJhbXMsICdjbG9zZUJ1dHRvbicpXG5cbiAgZG9tLnRvZ2dsZShjbG9zZUJ1dHRvbiwgcGFyYW1zLnNob3dDbG9zZUJ1dHRvbilcbiAgY2xvc2VCdXR0b24uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywgcGFyYW1zLmNsb3NlQnV0dG9uQXJpYUxhYmVsKVxufVxuIiwiaW1wb3J0IHsgaWNvblR5cGVzLCBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uLy4uL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBlcnJvciB9IGZyb20gJy4uLy4uL3V0aWxzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vLi4vLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVySWNvbiA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcbiAgY29uc3QgaWNvbiA9IGRvbS5nZXRJY29uKClcblxuICAvLyBpZiB0aGUgZ2l2ZW4gaWNvbiBhbHJlYWR5IHJlbmRlcmVkLCBhcHBseSB0aGUgc3R5bGluZyB3aXRob3V0IHJlLXJlbmRlcmluZyB0aGUgaWNvblxuICBpZiAoaW5uZXJQYXJhbXMgJiYgcGFyYW1zLmljb24gPT09IGlubmVyUGFyYW1zLmljb24pIHtcbiAgICAvLyBDdXN0b20gb3IgZGVmYXVsdCBjb250ZW50XG4gICAgc2V0Q29udGVudChpY29uLCBwYXJhbXMpXG5cbiAgICBhcHBseVN0eWxlcyhpY29uLCBwYXJhbXMpXG4gICAgcmV0dXJuXG4gIH1cblxuICBpZiAoIXBhcmFtcy5pY29uICYmICFwYXJhbXMuaWNvbkh0bWwpIHtcbiAgICByZXR1cm4gZG9tLmhpZGUoaWNvbilcbiAgfVxuXG4gIGlmIChwYXJhbXMuaWNvbiAmJiBPYmplY3Qua2V5cyhpY29uVHlwZXMpLmluZGV4T2YocGFyYW1zLmljb24pID09PSAtMSkge1xuICAgIGVycm9yKGBVbmtub3duIGljb24hIEV4cGVjdGVkIFwic3VjY2Vzc1wiLCBcImVycm9yXCIsIFwid2FybmluZ1wiLCBcImluZm9cIiBvciBcInF1ZXN0aW9uXCIsIGdvdCBcIiR7cGFyYW1zLmljb259XCJgKVxuICAgIHJldHVybiBkb20uaGlkZShpY29uKVxuICB9XG5cbiAgZG9tLnNob3coaWNvbilcblxuICAvLyBDdXN0b20gb3IgZGVmYXVsdCBjb250ZW50XG4gIHNldENvbnRlbnQoaWNvbiwgcGFyYW1zKVxuXG4gIGFwcGx5U3R5bGVzKGljb24sIHBhcmFtcylcblxuICAvLyBBbmltYXRlIGljb25cbiAgZG9tLmFkZENsYXNzKGljb24sIHBhcmFtcy5zaG93Q2xhc3MuaWNvbilcbn1cblxuY29uc3QgYXBwbHlTdHlsZXMgPSAoaWNvbiwgcGFyYW1zKSA9PiB7XG4gIGZvciAoY29uc3QgaWNvblR5cGUgaW4gaWNvblR5cGVzKSB7XG4gICAgaWYgKHBhcmFtcy5pY29uICE9PSBpY29uVHlwZSkge1xuICAgICAgZG9tLnJlbW92ZUNsYXNzKGljb24sIGljb25UeXBlc1tpY29uVHlwZV0pXG4gICAgfVxuICB9XG4gIGRvbS5hZGRDbGFzcyhpY29uLCBpY29uVHlwZXNbcGFyYW1zLmljb25dKVxuXG4gIC8vIEljb24gY29sb3JcbiAgc2V0Q29sb3IoaWNvbiwgcGFyYW1zKVxuXG4gIC8vIFN1Y2Nlc3MgaWNvbiBiYWNrZ3JvdW5kIGNvbG9yXG4gIGFkanVzdFN1Y2Nlc3NJY29uQmFja2dyb3VuZENvbG9yKClcblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoaWNvbiwgcGFyYW1zLCAnaWNvbicpXG59XG5cbi8vIEFkanVzdCBzdWNjZXNzIGljb24gYmFja2dyb3VuZCBjb2xvciB0byBtYXRjaCB0aGUgcG9wdXAgYmFja2dyb3VuZCBjb2xvclxuY29uc3QgYWRqdXN0U3VjY2Vzc0ljb25CYWNrZ3JvdW5kQ29sb3IgPSAoKSA9PiB7XG4gIGNvbnN0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgY29uc3QgcG9wdXBCYWNrZ3JvdW5kQ29sb3IgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShwb3B1cCkuZ2V0UHJvcGVydHlWYWx1ZSgnYmFja2dyb3VuZC1jb2xvcicpXG4gIGNvbnN0IHN1Y2Nlc3NJY29uUGFydHMgPSBwb3B1cC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3NePXN3YWwyLXN1Y2Nlc3MtY2lyY3VsYXItbGluZV0sIC5zd2FsMi1zdWNjZXNzLWZpeCcpXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3VjY2Vzc0ljb25QYXJ0cy5sZW5ndGg7IGkrKykge1xuICAgIHN1Y2Nlc3NJY29uUGFydHNbaV0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gcG9wdXBCYWNrZ3JvdW5kQ29sb3JcbiAgfVxufVxuXG5jb25zdCBzdWNjZXNzSWNvbkh0bWwgPSBgXG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtbGVmdFwiPjwvZGl2PlxuICA8c3BhbiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtbGluZS10aXBcIj48L3NwYW4+IDxzcGFuIGNsYXNzPVwic3dhbDItc3VjY2Vzcy1saW5lLWxvbmdcIj48L3NwYW4+XG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLXJpbmdcIj48L2Rpdj4gPGRpdiBjbGFzcz1cInN3YWwyLXN1Y2Nlc3MtZml4XCI+PC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJzd2FsMi1zdWNjZXNzLWNpcmN1bGFyLWxpbmUtcmlnaHRcIj48L2Rpdj5cbmBcblxuY29uc3QgZXJyb3JJY29uSHRtbCA9IGBcbiAgPHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmtcIj5cbiAgICA8c3BhbiBjbGFzcz1cInN3YWwyLXgtbWFyay1saW5lLWxlZnRcIj48L3NwYW4+XG4gICAgPHNwYW4gY2xhc3M9XCJzd2FsMi14LW1hcmstbGluZS1yaWdodFwiPjwvc3Bhbj5cbiAgPC9zcGFuPlxuYFxuXG5jb25zdCBzZXRDb250ZW50ID0gKGljb24sIHBhcmFtcykgPT4ge1xuICBpY29uLnRleHRDb250ZW50ID0gJydcblxuICBpZiAocGFyYW1zLmljb25IdG1sKSB7XG4gICAgZG9tLnNldElubmVySHRtbChpY29uLCBpY29uQ29udGVudChwYXJhbXMuaWNvbkh0bWwpKVxuICB9IGVsc2UgaWYgKHBhcmFtcy5pY29uID09PSAnc3VjY2VzcycpIHtcbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIHN1Y2Nlc3NJY29uSHRtbClcbiAgfSBlbHNlIGlmIChwYXJhbXMuaWNvbiA9PT0gJ2Vycm9yJykge1xuICAgIGRvbS5zZXRJbm5lckh0bWwoaWNvbiwgZXJyb3JJY29uSHRtbClcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBkZWZhdWx0SWNvbkh0bWwgPSB7XG4gICAgICBxdWVzdGlvbjogJz8nLFxuICAgICAgd2FybmluZzogJyEnLFxuICAgICAgaW5mbzogJ2knLFxuICAgIH1cbiAgICBkb20uc2V0SW5uZXJIdG1sKGljb24sIGljb25Db250ZW50KGRlZmF1bHRJY29uSHRtbFtwYXJhbXMuaWNvbl0pKVxuICB9XG59XG5cbmNvbnN0IHNldENvbG9yID0gKGljb24sIHBhcmFtcykgPT4ge1xuICBpZiAoIXBhcmFtcy5pY29uQ29sb3IpIHtcbiAgICByZXR1cm5cbiAgfVxuICBpY29uLnN0eWxlLmNvbG9yID0gcGFyYW1zLmljb25Db2xvclxuICBpY29uLnN0eWxlLmJvcmRlckNvbG9yID0gcGFyYW1zLmljb25Db2xvclxuICBmb3IgKGNvbnN0IHNlbCBvZiBbXG4gICAgJy5zd2FsMi1zdWNjZXNzLWxpbmUtdGlwJyxcbiAgICAnLnN3YWwyLXN1Y2Nlc3MtbGluZS1sb25nJyxcbiAgICAnLnN3YWwyLXgtbWFyay1saW5lLWxlZnQnLFxuICAgICcuc3dhbDIteC1tYXJrLWxpbmUtcmlnaHQnLFxuICBdKSB7XG4gICAgZG9tLnNldFN0eWxlKGljb24sIHNlbCwgJ2JhY2tncm91bmRDb2xvcicsIHBhcmFtcy5pY29uQ29sb3IpXG4gIH1cbiAgZG9tLnNldFN0eWxlKGljb24sICcuc3dhbDItc3VjY2Vzcy1yaW5nJywgJ2JvcmRlckNvbG9yJywgcGFyYW1zLmljb25Db2xvcilcbn1cblxuY29uc3QgaWNvbkNvbnRlbnQgPSAoY29udGVudCkgPT4gYDxkaXYgY2xhc3M9XCIke3N3YWxDbGFzc2VzWydpY29uLWNvbnRlbnQnXX1cIj4ke2NvbnRlbnR9PC9kaXY+YFxuIiwiaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuLi8uLi9jbGFzc2VzLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL2RvbS9pbmRleC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlckltYWdlID0gKGluc3RhbmNlLCBwYXJhbXMpID0+IHtcbiAgY29uc3QgaW1hZ2UgPSBkb20uZ2V0SW1hZ2UoKVxuXG4gIGlmICghcGFyYW1zLmltYWdlVXJsKSB7XG4gICAgcmV0dXJuIGRvbS5oaWRlKGltYWdlKVxuICB9XG5cbiAgZG9tLnNob3coaW1hZ2UsICcnKVxuXG4gIC8vIFNyYywgYWx0XG4gIGltYWdlLnNldEF0dHJpYnV0ZSgnc3JjJywgcGFyYW1zLmltYWdlVXJsKVxuICBpbWFnZS5zZXRBdHRyaWJ1dGUoJ2FsdCcsIHBhcmFtcy5pbWFnZUFsdClcblxuICAvLyBXaWR0aCwgaGVpZ2h0XG4gIGRvbS5hcHBseU51bWVyaWNhbFN0eWxlKGltYWdlLCAnd2lkdGgnLCBwYXJhbXMuaW1hZ2VXaWR0aClcbiAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUoaW1hZ2UsICdoZWlnaHQnLCBwYXJhbXMuaW1hZ2VIZWlnaHQpXG5cbiAgLy8gQ2xhc3NcbiAgaW1hZ2UuY2xhc3NOYW1lID0gc3dhbENsYXNzZXMuaW1hZ2VcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MoaW1hZ2UsIHBhcmFtcywgJ2ltYWdlJylcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IHdhcm4gfSBmcm9tICcuLi8uLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmNvbnN0IGNyZWF0ZVN0ZXBFbGVtZW50ID0gKHN0ZXApID0+IHtcbiAgY29uc3Qgc3RlcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICBkb20uYWRkQ2xhc3Moc3RlcEVsLCBzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcCddKVxuICBkb20uc2V0SW5uZXJIdG1sKHN0ZXBFbCwgc3RlcClcbiAgcmV0dXJuIHN0ZXBFbFxufVxuXG5jb25zdCBjcmVhdGVMaW5lRWxlbWVudCA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgbGluZUVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuICBkb20uYWRkQ2xhc3MobGluZUVsLCBzd2FsQ2xhc3Nlc1sncHJvZ3Jlc3Mtc3RlcC1saW5lJ10pXG4gIGlmIChwYXJhbXMucHJvZ3Jlc3NTdGVwc0Rpc3RhbmNlKSB7XG4gICAgbGluZUVsLnN0eWxlLndpZHRoID0gcGFyYW1zLnByb2dyZXNzU3RlcHNEaXN0YW5jZVxuICB9XG4gIHJldHVybiBsaW5lRWxcbn1cblxuZXhwb3J0IGNvbnN0IHJlbmRlclByb2dyZXNzU3RlcHMgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyID0gZG9tLmdldFByb2dyZXNzU3RlcHMoKVxuICBpZiAoIXBhcmFtcy5wcm9ncmVzc1N0ZXBzIHx8IHBhcmFtcy5wcm9ncmVzc1N0ZXBzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBkb20uaGlkZShwcm9ncmVzc1N0ZXBzQ29udGFpbmVyKVxuICB9XG5cbiAgZG9tLnNob3cocHJvZ3Jlc3NTdGVwc0NvbnRhaW5lcilcbiAgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lci50ZXh0Q29udGVudCA9ICcnXG4gIGlmIChwYXJhbXMuY3VycmVudFByb2dyZXNzU3RlcCA+PSBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5sZW5ndGgpIHtcbiAgICB3YXJuKFxuICAgICAgJ0ludmFsaWQgY3VycmVudFByb2dyZXNzU3RlcCBwYXJhbWV0ZXIsIGl0IHNob3VsZCBiZSBsZXNzIHRoYW4gcHJvZ3Jlc3NTdGVwcy5sZW5ndGggJyArXG4gICAgICAgICcoY3VycmVudFByb2dyZXNzU3RlcCBsaWtlIEpTIGFycmF5cyBzdGFydHMgZnJvbSAwKSdcbiAgICApXG4gIH1cblxuICBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5mb3JFYWNoKChzdGVwLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHN0ZXBFbCA9IGNyZWF0ZVN0ZXBFbGVtZW50KHN0ZXApXG4gICAgcHJvZ3Jlc3NTdGVwc0NvbnRhaW5lci5hcHBlbmRDaGlsZChzdGVwRWwpXG4gICAgaWYgKGluZGV4ID09PSBwYXJhbXMuY3VycmVudFByb2dyZXNzU3RlcCkge1xuICAgICAgZG9tLmFkZENsYXNzKHN0ZXBFbCwgc3dhbENsYXNzZXNbJ2FjdGl2ZS1wcm9ncmVzcy1zdGVwJ10pXG4gICAgfVxuXG4gICAgaWYgKGluZGV4ICE9PSBwYXJhbXMucHJvZ3Jlc3NTdGVwcy5sZW5ndGggLSAxKSB7XG4gICAgICBjb25zdCBsaW5lRWwgPSBjcmVhdGVMaW5lRWxlbWVudChwYXJhbXMpXG4gICAgICBwcm9ncmVzc1N0ZXBzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpbmVFbClcbiAgICB9XG4gIH0pXG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi4vLi4vZG9tL2luZGV4LmpzJ1xuXG5leHBvcnQgY29uc3QgcmVuZGVyVGl0bGUgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCB0aXRsZSA9IGRvbS5nZXRUaXRsZSgpXG5cbiAgZG9tLnRvZ2dsZSh0aXRsZSwgcGFyYW1zLnRpdGxlIHx8IHBhcmFtcy50aXRsZVRleHQsICdibG9jaycpXG5cbiAgaWYgKHBhcmFtcy50aXRsZSkge1xuICAgIGRvbS5wYXJzZUh0bWxUb0NvbnRhaW5lcihwYXJhbXMudGl0bGUsIHRpdGxlKVxuICB9XG5cbiAgaWYgKHBhcmFtcy50aXRsZVRleHQpIHtcbiAgICB0aXRsZS5pbm5lclRleHQgPSBwYXJhbXMudGl0bGVUZXh0XG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3ModGl0bGUsIHBhcmFtcywgJ3RpdGxlJylcbn1cbiIsImltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vLi4vY2xhc3Nlcy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi8uLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCByZW5kZXJQb3B1cCA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgLy8gV2lkdGhcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMTcwXG4gIGlmIChwYXJhbXMudG9hc3QpIHtcbiAgICBkb20uYXBwbHlOdW1lcmljYWxTdHlsZShjb250YWluZXIsICd3aWR0aCcsIHBhcmFtcy53aWR0aClcbiAgICBwb3B1cC5zdHlsZS53aWR0aCA9ICcxMDAlJ1xuICAgIHBvcHVwLmluc2VydEJlZm9yZShkb20uZ2V0TG9hZGVyKCksIGRvbS5nZXRJY29uKCkpXG4gIH0gZWxzZSB7XG4gICAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUocG9wdXAsICd3aWR0aCcsIHBhcmFtcy53aWR0aClcbiAgfVxuXG4gIC8vIFBhZGRpbmdcbiAgZG9tLmFwcGx5TnVtZXJpY2FsU3R5bGUocG9wdXAsICdwYWRkaW5nJywgcGFyYW1zLnBhZGRpbmcpXG5cbiAgLy8gQ29sb3JcbiAgaWYgKHBhcmFtcy5jb2xvcikge1xuICAgIHBvcHVwLnN0eWxlLmNvbG9yID0gcGFyYW1zLmNvbG9yXG4gIH1cblxuICAvLyBCYWNrZ3JvdW5kXG4gIGlmIChwYXJhbXMuYmFja2dyb3VuZCkge1xuICAgIHBvcHVwLnN0eWxlLmJhY2tncm91bmQgPSBwYXJhbXMuYmFja2dyb3VuZFxuICB9XG5cbiAgZG9tLmhpZGUoZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlKCkpXG5cbiAgLy8gQ2xhc3Nlc1xuICBhZGRDbGFzc2VzKHBvcHVwLCBwYXJhbXMpXG59XG5cbmNvbnN0IGFkZENsYXNzZXMgPSAocG9wdXAsIHBhcmFtcykgPT4ge1xuICAvLyBEZWZhdWx0IENsYXNzICsgc2hvd0NsYXNzIHdoZW4gdXBkYXRpbmcgU3dhbC51cGRhdGUoe30pXG4gIHBvcHVwLmNsYXNzTmFtZSA9IGAke3N3YWxDbGFzc2VzLnBvcHVwfSAke2RvbS5pc1Zpc2libGUocG9wdXApID8gcGFyYW1zLnNob3dDbGFzcy5wb3B1cCA6ICcnfWBcblxuICBpZiAocGFyYW1zLnRvYXN0KSB7XG4gICAgZG9tLmFkZENsYXNzKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXSlcbiAgICBkb20uYWRkQ2xhc3MocG9wdXAsIHN3YWxDbGFzc2VzLnRvYXN0KVxuICB9IGVsc2Uge1xuICAgIGRvbS5hZGRDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMubW9kYWwpXG4gIH1cblxuICAvLyBDdXN0b20gY2xhc3NcbiAgZG9tLmFwcGx5Q3VzdG9tQ2xhc3MocG9wdXAsIHBhcmFtcywgJ3BvcHVwJylcbiAgaWYgKHR5cGVvZiBwYXJhbXMuY3VzdG9tQ2xhc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBwYXJhbXMuY3VzdG9tQ2xhc3MpXG4gIH1cblxuICAvLyBJY29uIGNsYXNzICgjMTg0MilcbiAgaWYgKHBhcmFtcy5pY29uKSB7XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlc1tgaWNvbi0ke3BhcmFtcy5pY29ufWBdKVxuICB9XG59XG4iLCJpbXBvcnQgeyBnZXRQb3B1cCB9IGZyb20gJy4uL2dldHRlcnMuanMnXG5pbXBvcnQgeyByZW5kZXJBY3Rpb25zIH0gZnJvbSAnLi9yZW5kZXJBY3Rpb25zLmpzJ1xuaW1wb3J0IHsgcmVuZGVyQ29udGFpbmVyIH0gZnJvbSAnLi9yZW5kZXJDb250YWluZXIuanMnXG5pbXBvcnQgeyByZW5kZXJDb250ZW50IH0gZnJvbSAnLi9yZW5kZXJDb250ZW50LmpzJ1xuaW1wb3J0IHsgcmVuZGVyRm9vdGVyIH0gZnJvbSAnLi9yZW5kZXJGb290ZXIuanMnXG5pbXBvcnQgeyByZW5kZXJDbG9zZUJ1dHRvbiB9IGZyb20gJy4vcmVuZGVyQ2xvc2VCdXR0b24uanMnXG5pbXBvcnQgeyByZW5kZXJJY29uIH0gZnJvbSAnLi9yZW5kZXJJY29uLmpzJ1xuaW1wb3J0IHsgcmVuZGVySW1hZ2UgfSBmcm9tICcuL3JlbmRlckltYWdlLmpzJ1xuaW1wb3J0IHsgcmVuZGVyUHJvZ3Jlc3NTdGVwcyB9IGZyb20gJy4vcmVuZGVyUHJvZ3Jlc3NTdGVwcy5qcydcbmltcG9ydCB7IHJlbmRlclRpdGxlIH0gZnJvbSAnLi9yZW5kZXJUaXRsZS5qcydcbmltcG9ydCB7IHJlbmRlclBvcHVwIH0gZnJvbSAnLi9yZW5kZXJQb3B1cC5qcydcblxuZXhwb3J0IGNvbnN0IHJlbmRlciA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIHJlbmRlclBvcHVwKGluc3RhbmNlLCBwYXJhbXMpXG4gIHJlbmRlckNvbnRhaW5lcihpbnN0YW5jZSwgcGFyYW1zKVxuXG4gIHJlbmRlclByb2dyZXNzU3RlcHMoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVySWNvbihpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJJbWFnZShpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJUaXRsZShpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJDbG9zZUJ1dHRvbihpbnN0YW5jZSwgcGFyYW1zKVxuXG4gIHJlbmRlckNvbnRlbnQoaW5zdGFuY2UsIHBhcmFtcylcbiAgcmVuZGVyQWN0aW9ucyhpbnN0YW5jZSwgcGFyYW1zKVxuICByZW5kZXJGb290ZXIoaW5zdGFuY2UsIHBhcmFtcylcblxuICBpZiAodHlwZW9mIHBhcmFtcy5kaWRSZW5kZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBwYXJhbXMuZGlkUmVuZGVyKGdldFBvcHVwKCkpXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCBEaXNtaXNzUmVhc29uID0gT2JqZWN0LmZyZWV6ZSh7XG4gIGNhbmNlbDogJ2NhbmNlbCcsXG4gIGJhY2tkcm9wOiAnYmFja2Ryb3AnLFxuICBjbG9zZTogJ2Nsb3NlJyxcbiAgZXNjOiAnZXNjJyxcbiAgdGltZXI6ICd0aW1lcicsXG59KVxuIiwiaW1wb3J0IHsgZ2V0Q29udGFpbmVyIH0gZnJvbSAnLi9kb20vZ2V0dGVycy5qcydcbmltcG9ydCB7IHRvQXJyYXkgfSBmcm9tICcuL3V0aWxzLmpzJ1xuXG4vLyBGcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLnBhY2llbGxvZ3JvdXAuY29tL2Jsb2cvMjAxOC8wNi90aGUtY3VycmVudC1zdGF0ZS1vZi1tb2RhbC1kaWFsb2ctYWNjZXNzaWJpbGl0eS9cbi8vIEFkZGluZyBhcmlhLWhpZGRlbj1cInRydWVcIiB0byBlbGVtZW50cyBvdXRzaWRlIG9mIHRoZSBhY3RpdmUgbW9kYWwgZGlhbG9nIGVuc3VyZXMgdGhhdFxuLy8gZWxlbWVudHMgbm90IHdpdGhpbiB0aGUgYWN0aXZlIG1vZGFsIGRpYWxvZyB3aWxsIG5vdCBiZSBzdXJmYWNlZCBpZiBhIHVzZXIgb3BlbnMgYSBzY3JlZW5cbi8vIHJlYWRlcuKAmXMgbGlzdCBvZiBlbGVtZW50cyAoaGVhZGluZ3MsIGZvcm0gY29udHJvbHMsIGxhbmRtYXJrcywgZXRjLikgaW4gdGhlIGRvY3VtZW50LlxuXG5leHBvcnQgY29uc3Qgc2V0QXJpYUhpZGRlbiA9ICgpID0+IHtcbiAgY29uc3QgYm9keUNoaWxkcmVuID0gdG9BcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKVxuICBib2R5Q2hpbGRyZW4uZm9yRWFjaCgoZWwpID0+IHtcbiAgICBpZiAoZWwgPT09IGdldENvbnRhaW5lcigpIHx8IGVsLmNvbnRhaW5zKGdldENvbnRhaW5lcigpKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGVsLmhhc0F0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJywgZWwuZ2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicpKVxuICAgIH1cbiAgICBlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKVxuICB9KVxufVxuXG5leHBvcnQgY29uc3QgdW5zZXRBcmlhSGlkZGVuID0gKCkgPT4ge1xuICBjb25zdCBib2R5Q2hpbGRyZW4gPSB0b0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pXG4gIGJvZHlDaGlsZHJlbi5mb3JFYWNoKChlbCkgPT4ge1xuICAgIGlmIChlbC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcHJldmlvdXMtYXJpYS1oaWRkZW4nKSkge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1wcmV2aW91cy1hcmlhLWhpZGRlbicpKVxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXByZXZpb3VzLWFyaWEtaGlkZGVuJylcbiAgICB9IGVsc2Uge1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgfVxuICB9KVxufVxuIiwiaW1wb3J0IGRlZmF1bHRQYXJhbXMgZnJvbSAnLi9wYXJhbXMuanMnXG5pbXBvcnQgeyBjYXBpdGFsaXplRmlyc3RMZXR0ZXIsIHRvQXJyYXksIHdhcm4gfSBmcm9tICcuL3V0aWxzLmpzJ1xuXG5jb25zdCBzd2FsU3RyaW5nUGFyYW1zID0gWydzd2FsLXRpdGxlJywgJ3N3YWwtaHRtbCcsICdzd2FsLWZvb3RlciddXG5cbmV4cG9ydCBjb25zdCBnZXRUZW1wbGF0ZVBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGUgPSB0eXBlb2YgcGFyYW1zLnRlbXBsYXRlID09PSAnc3RyaW5nJyA/IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IocGFyYW1zLnRlbXBsYXRlKSA6IHBhcmFtcy50ZW1wbGF0ZVxuICBpZiAoIXRlbXBsYXRlKSB7XG4gICAgcmV0dXJuIHt9XG4gIH1cbiAgLyoqIEB0eXBlIHtEb2N1bWVudEZyYWdtZW50fSAqL1xuICBjb25zdCB0ZW1wbGF0ZUNvbnRlbnQgPSB0ZW1wbGF0ZS5jb250ZW50XG5cbiAgc2hvd1dhcm5pbmdzRm9yRWxlbWVudHModGVtcGxhdGVDb250ZW50KVxuXG4gIGNvbnN0IHJlc3VsdCA9IE9iamVjdC5hc3NpZ24oXG4gICAgZ2V0U3dhbFBhcmFtcyh0ZW1wbGF0ZUNvbnRlbnQpLFxuICAgIGdldFN3YWxCdXR0b25zKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbEltYWdlKHRlbXBsYXRlQ29udGVudCksXG4gICAgZ2V0U3dhbEljb24odGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsSW5wdXQodGVtcGxhdGVDb250ZW50KSxcbiAgICBnZXRTd2FsU3RyaW5nUGFyYW1zKHRlbXBsYXRlQ29udGVudCwgc3dhbFN0cmluZ1BhcmFtcylcbiAgKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbFBhcmFtcyA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgdG9BcnJheSh0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvckFsbCgnc3dhbC1wYXJhbScpKS5mb3JFYWNoKChwYXJhbSkgPT4ge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMocGFyYW0sIFsnbmFtZScsICd2YWx1ZSddKVxuICAgIGNvbnN0IHBhcmFtTmFtZSA9IHBhcmFtLmdldEF0dHJpYnV0ZSgnbmFtZScpXG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICBpZiAodHlwZW9mIGRlZmF1bHRQYXJhbXNbcGFyYW1OYW1lXSA9PT0gJ2Jvb2xlYW4nICYmIHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICByZXN1bHRbcGFyYW1OYW1lXSA9IGZhbHNlXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGVmYXVsdFBhcmFtc1twYXJhbU5hbWVdID09PSAnb2JqZWN0Jykge1xuICAgICAgcmVzdWx0W3BhcmFtTmFtZV0gPSBKU09OLnBhcnNlKHZhbHVlKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxCdXR0b25zID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICB0b0FycmF5KHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yQWxsKCdzd2FsLWJ1dHRvbicpKS5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGJ1dHRvbiwgWyd0eXBlJywgJ2NvbG9yJywgJ2FyaWEtbGFiZWwnXSlcbiAgICBjb25zdCB0eXBlID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgndHlwZScpXG4gICAgcmVzdWx0W2Ake3R5cGV9QnV0dG9uVGV4dGBdID0gYnV0dG9uLmlubmVySFRNTFxuICAgIHJlc3VsdFtgc2hvdyR7Y2FwaXRhbGl6ZUZpcnN0TGV0dGVyKHR5cGUpfUJ1dHRvbmBdID0gdHJ1ZVxuICAgIGlmIChidXR0b24uaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICByZXN1bHRbYCR7dHlwZX1CdXR0b25Db2xvcmBdID0gYnV0dG9uLmdldEF0dHJpYnV0ZSgnY29sb3InKVxuICAgIH1cbiAgICBpZiAoYnV0dG9uLmhhc0F0dHJpYnV0ZSgnYXJpYS1sYWJlbCcpKSB7XG4gICAgICByZXN1bHRbYCR7dHlwZX1CdXR0b25BcmlhTGFiZWxgXSA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnKVxuICAgIH1cbiAgfSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IGdldFN3YWxJbWFnZSA9ICh0ZW1wbGF0ZUNvbnRlbnQpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgY29uc3QgaW1hZ2UgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3dhbC1pbWFnZScpXG4gIGlmIChpbWFnZSkge1xuICAgIHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMoaW1hZ2UsIFsnc3JjJywgJ3dpZHRoJywgJ2hlaWdodCcsICdhbHQnXSlcbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdzcmMnKSkge1xuICAgICAgcmVzdWx0LmltYWdlVXJsID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdzcmMnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCd3aWR0aCcpKSB7XG4gICAgICByZXN1bHQuaW1hZ2VXaWR0aCA9IGltYWdlLmdldEF0dHJpYnV0ZSgnd2lkdGgnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdoZWlnaHQnKSkge1xuICAgICAgcmVzdWx0LmltYWdlSGVpZ2h0ID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdoZWlnaHQnKVxuICAgIH1cbiAgICBpZiAoaW1hZ2UuaGFzQXR0cmlidXRlKCdhbHQnKSkge1xuICAgICAgcmVzdWx0LmltYWdlQWx0ID0gaW1hZ2UuZ2V0QXR0cmlidXRlKCdhbHQnKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbEljb24gPSAodGVtcGxhdGVDb250ZW50KSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHt9XG4gIC8qKiBAdHlwZSB7SFRNTEVsZW1lbnR9ICovXG4gIGNvbnN0IGljb24gPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3Rvcignc3dhbC1pY29uJylcbiAgaWYgKGljb24pIHtcbiAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKGljb24sIFsndHlwZScsICdjb2xvciddKVxuICAgIGlmIChpY29uLmhhc0F0dHJpYnV0ZSgndHlwZScpKSB7XG4gICAgICByZXN1bHQuaWNvbiA9IGljb24uZ2V0QXR0cmlidXRlKCd0eXBlJylcbiAgICB9XG4gICAgaWYgKGljb24uaGFzQXR0cmlidXRlKCdjb2xvcicpKSB7XG4gICAgICByZXN1bHQuaWNvbkNvbG9yID0gaWNvbi5nZXRBdHRyaWJ1dGUoJ2NvbG9yJylcbiAgICB9XG4gICAgcmVzdWx0Lmljb25IdG1sID0gaWNvbi5pbm5lckhUTUxcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqL1xuY29uc3QgZ2V0U3dhbElucHV0ID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCByZXN1bHQgPSB7fVxuICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICBjb25zdCBpbnB1dCA9IHRlbXBsYXRlQ29udGVudC5xdWVyeVNlbGVjdG9yKCdzd2FsLWlucHV0JylcbiAgaWYgKGlucHV0KSB7XG4gICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyhpbnB1dCwgWyd0eXBlJywgJ2xhYmVsJywgJ3BsYWNlaG9sZGVyJywgJ3ZhbHVlJ10pXG4gICAgcmVzdWx0LmlucHV0ID0gaW5wdXQuZ2V0QXR0cmlidXRlKCd0eXBlJykgfHwgJ3RleHQnXG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgnbGFiZWwnKSkge1xuICAgICAgcmVzdWx0LmlucHV0TGFiZWwgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ2xhYmVsJylcbiAgICB9XG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgncGxhY2Vob2xkZXInKSkge1xuICAgICAgcmVzdWx0LmlucHV0UGxhY2Vob2xkZXIgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJylcbiAgICB9XG4gICAgaWYgKGlucHV0Lmhhc0F0dHJpYnV0ZSgndmFsdWUnKSkge1xuICAgICAgcmVzdWx0LmlucHV0VmFsdWUgPSBpbnB1dC5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJylcbiAgICB9XG4gIH1cbiAgY29uc3QgaW5wdXRPcHRpb25zID0gdGVtcGxhdGVDb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3N3YWwtaW5wdXQtb3B0aW9uJylcbiAgaWYgKGlucHV0T3B0aW9ucy5sZW5ndGgpIHtcbiAgICByZXN1bHQuaW5wdXRPcHRpb25zID0ge31cbiAgICB0b0FycmF5KGlucHV0T3B0aW9ucykuZm9yRWFjaCgob3B0aW9uKSA9PiB7XG4gICAgICBzaG93V2FybmluZ3NGb3JBdHRyaWJ1dGVzKG9wdGlvbiwgWyd2YWx1ZSddKVxuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBvcHRpb24uZ2V0QXR0cmlidXRlKCd2YWx1ZScpXG4gICAgICBjb25zdCBvcHRpb25OYW1lID0gb3B0aW9uLmlubmVySFRNTFxuICAgICAgcmVzdWx0LmlucHV0T3B0aW9uc1tvcHRpb25WYWx1ZV0gPSBvcHRpb25OYW1lXG4gICAgfSlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8qKlxuICogQHBhcmFtIHtEb2N1bWVudEZyYWdtZW50fSB0ZW1wbGF0ZUNvbnRlbnRcbiAqIEBwYXJhbSB7c3RyaW5nW119IHBhcmFtTmFtZXNcbiAqL1xuY29uc3QgZ2V0U3dhbFN0cmluZ1BhcmFtcyA9ICh0ZW1wbGF0ZUNvbnRlbnQsIHBhcmFtTmFtZXMpID0+IHtcbiAgY29uc3QgcmVzdWx0ID0ge31cbiAgZm9yIChjb25zdCBpIGluIHBhcmFtTmFtZXMpIHtcbiAgICBjb25zdCBwYXJhbU5hbWUgPSBwYXJhbU5hbWVzW2ldXG4gICAgLyoqIEB0eXBlIHtIVE1MRWxlbWVudH0gKi9cbiAgICBjb25zdCB0YWcgPSB0ZW1wbGF0ZUNvbnRlbnQucXVlcnlTZWxlY3RvcihwYXJhbU5hbWUpXG4gICAgaWYgKHRhZykge1xuICAgICAgc2hvd1dhcm5pbmdzRm9yQXR0cmlidXRlcyh0YWcsIFtdKVxuICAgICAgcmVzdWx0W3BhcmFtTmFtZS5yZXBsYWNlKC9ec3dhbC0vLCAnJyldID0gdGFnLmlubmVySFRNTC50cmltKClcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKipcbiAqIEBwYXJhbSB7RG9jdW1lbnRGcmFnbWVudH0gdGVtcGxhdGVDb250ZW50XG4gKi9cbmNvbnN0IHNob3dXYXJuaW5nc0ZvckVsZW1lbnRzID0gKHRlbXBsYXRlQ29udGVudCkgPT4ge1xuICBjb25zdCBhbGxvd2VkRWxlbWVudHMgPSBzd2FsU3RyaW5nUGFyYW1zLmNvbmNhdChbXG4gICAgJ3N3YWwtcGFyYW0nLFxuICAgICdzd2FsLWJ1dHRvbicsXG4gICAgJ3N3YWwtaW1hZ2UnLFxuICAgICdzd2FsLWljb24nLFxuICAgICdzd2FsLWlucHV0JyxcbiAgICAnc3dhbC1pbnB1dC1vcHRpb24nLFxuICBdKVxuICB0b0FycmF5KHRlbXBsYXRlQ29udGVudC5jaGlsZHJlbikuZm9yRWFjaCgoZWwpID0+IHtcbiAgICBjb25zdCB0YWdOYW1lID0gZWwudGFnTmFtZS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGFsbG93ZWRFbGVtZW50cy5pbmRleE9mKHRhZ05hbWUpID09PSAtMSkge1xuICAgICAgd2FybihgVW5yZWNvZ25pemVkIGVsZW1lbnQgPCR7dGFnTmFtZX0+YClcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxcbiAqIEBwYXJhbSB7c3RyaW5nW119IGFsbG93ZWRBdHRyaWJ1dGVzXG4gKi9cbmNvbnN0IHNob3dXYXJuaW5nc0ZvckF0dHJpYnV0ZXMgPSAoZWwsIGFsbG93ZWRBdHRyaWJ1dGVzKSA9PiB7XG4gIHRvQXJyYXkoZWwuYXR0cmlidXRlcykuZm9yRWFjaCgoYXR0cmlidXRlKSA9PiB7XG4gICAgaWYgKGFsbG93ZWRBdHRyaWJ1dGVzLmluZGV4T2YoYXR0cmlidXRlLm5hbWUpID09PSAtMSkge1xuICAgICAgd2FybihbXG4gICAgICAgIGBVbnJlY29nbml6ZWQgYXR0cmlidXRlIFwiJHthdHRyaWJ1dGUubmFtZX1cIiBvbiA8JHtlbC50YWdOYW1lLnRvTG93ZXJDYXNlKCl9Pi5gLFxuICAgICAgICBgJHtcbiAgICAgICAgICBhbGxvd2VkQXR0cmlidXRlcy5sZW5ndGhcbiAgICAgICAgICAgID8gYEFsbG93ZWQgYXR0cmlidXRlcyBhcmU6ICR7YWxsb3dlZEF0dHJpYnV0ZXMuam9pbignLCAnKX1gXG4gICAgICAgICAgICA6ICdUbyBzZXQgdGhlIHZhbHVlLCB1c2UgSFRNTCB3aXRoaW4gdGhlIGVsZW1lbnQuJ1xuICAgICAgICB9YCxcbiAgICAgIF0pXG4gICAgfVxuICB9KVxufVxuIiwiZXhwb3J0IGRlZmF1bHQge1xuICBlbWFpbDogKHN0cmluZywgdmFsaWRhdGlvbk1lc3NhZ2UpID0+IHtcbiAgICByZXR1cm4gL15bYS16QS1aMC05LitfLV0rQFthLXpBLVowLTkuLV0rXFwuW2EtekEtWjAtOS1dezIsMjR9JC8udGVzdChzdHJpbmcpXG4gICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICA6IFByb21pc2UucmVzb2x2ZSh2YWxpZGF0aW9uTWVzc2FnZSB8fCAnSW52YWxpZCBlbWFpbCBhZGRyZXNzJylcbiAgfSxcbiAgdXJsOiAoc3RyaW5nLCB2YWxpZGF0aW9uTWVzc2FnZSkgPT4ge1xuICAgIC8vIHRha2VuIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM4MDk0MzUgd2l0aCBhIHNtYWxsIGNoYW5nZSBmcm9tICMxMzA2IGFuZCAjMjAxM1xuICAgIHJldHVybiAvXmh0dHBzPzpcXC9cXC8od3d3XFwuKT9bLWEtekEtWjAtOUA6JS5fK34jPV17MSwyNTZ9XFwuW2Etel17Miw2M31cXGIoWy1hLXpBLVowLTlAOiVfKy5+Iz8mLz1dKikkLy50ZXN0KHN0cmluZylcbiAgICAgID8gUHJvbWlzZS5yZXNvbHZlKClcbiAgICAgIDogUHJvbWlzZS5yZXNvbHZlKHZhbGlkYXRpb25NZXNzYWdlIHx8ICdJbnZhbGlkIFVSTCcpXG4gIH0sXG59XG4iLCJpbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi91dGlscy5qcydcbmltcG9ydCAqIGFzIGRvbSBmcm9tICcuL2RvbS9pbmRleC5qcydcbmltcG9ydCBkZWZhdWx0SW5wdXRWYWxpZGF0b3JzIGZyb20gJy4vZGVmYXVsdElucHV0VmFsaWRhdG9ycy5qcydcblxuZnVuY3Rpb24gc2V0RGVmYXVsdElucHV0VmFsaWRhdG9ycyhwYXJhbXMpIHtcbiAgLy8gVXNlIGRlZmF1bHQgYGlucHV0VmFsaWRhdG9yYCBmb3Igc3VwcG9ydGVkIGlucHV0IHR5cGVzIGlmIG5vdCBwcm92aWRlZFxuICBpZiAoIXBhcmFtcy5pbnB1dFZhbGlkYXRvcikge1xuICAgIE9iamVjdC5rZXlzKGRlZmF1bHRJbnB1dFZhbGlkYXRvcnMpLmZvckVhY2goKGtleSkgPT4ge1xuICAgICAgaWYgKHBhcmFtcy5pbnB1dCA9PT0ga2V5KSB7XG4gICAgICAgIHBhcmFtcy5pbnB1dFZhbGlkYXRvciA9IGRlZmF1bHRJbnB1dFZhbGlkYXRvcnNba2V5XVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVDdXN0b21UYXJnZXRFbGVtZW50KHBhcmFtcykge1xuICAvLyBEZXRlcm1pbmUgaWYgdGhlIGN1c3RvbSB0YXJnZXQgZWxlbWVudCBpcyB2YWxpZFxuICBpZiAoXG4gICAgIXBhcmFtcy50YXJnZXQgfHxcbiAgICAodHlwZW9mIHBhcmFtcy50YXJnZXQgPT09ICdzdHJpbmcnICYmICFkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhcmFtcy50YXJnZXQpKSB8fFxuICAgICh0eXBlb2YgcGFyYW1zLnRhcmdldCAhPT0gJ3N0cmluZycgJiYgIXBhcmFtcy50YXJnZXQuYXBwZW5kQ2hpbGQpXG4gICkge1xuICAgIHdhcm4oJ1RhcmdldCBwYXJhbWV0ZXIgaXMgbm90IHZhbGlkLCBkZWZhdWx0aW5nIHRvIFwiYm9keVwiJylcbiAgICBwYXJhbXMudGFyZ2V0ID0gJ2JvZHknXG4gIH1cbn1cblxuLyoqXG4gKiBTZXQgdHlwZSwgdGV4dCBhbmQgYWN0aW9ucyBvbiBwb3B1cFxuICpcbiAqIEBwYXJhbSBwYXJhbXNcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc2V0UGFyYW1ldGVycyhwYXJhbXMpIHtcbiAgc2V0RGVmYXVsdElucHV0VmFsaWRhdG9ycyhwYXJhbXMpXG5cbiAgLy8gc2hvd0xvYWRlck9uQ29uZmlybSAmJiBwcmVDb25maXJtXG4gIGlmIChwYXJhbXMuc2hvd0xvYWRlck9uQ29uZmlybSAmJiAhcGFyYW1zLnByZUNvbmZpcm0pIHtcbiAgICB3YXJuKFxuICAgICAgJ3Nob3dMb2FkZXJPbkNvbmZpcm0gaXMgc2V0IHRvIHRydWUsIGJ1dCBwcmVDb25maXJtIGlzIG5vdCBkZWZpbmVkLlxcbicgK1xuICAgICAgICAnc2hvd0xvYWRlck9uQ29uZmlybSBzaG91bGQgYmUgdXNlZCB0b2dldGhlciB3aXRoIHByZUNvbmZpcm0sIHNlZSB1c2FnZSBleGFtcGxlOlxcbicgK1xuICAgICAgICAnaHR0cHM6Ly9zd2VldGFsZXJ0Mi5naXRodWIuaW8vI2FqYXgtcmVxdWVzdCdcbiAgICApXG4gIH1cblxuICB2YWxpZGF0ZUN1c3RvbVRhcmdldEVsZW1lbnQocGFyYW1zKVxuXG4gIC8vIFJlcGxhY2UgbmV3bGluZXMgd2l0aCA8YnI+IGluIHRpdGxlXG4gIGlmICh0eXBlb2YgcGFyYW1zLnRpdGxlID09PSAnc3RyaW5nJykge1xuICAgIHBhcmFtcy50aXRsZSA9IHBhcmFtcy50aXRsZS5zcGxpdCgnXFxuJykuam9pbignPGJyIC8+JylcbiAgfVxuXG4gIGRvbS5pbml0KHBhcmFtcylcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFRpbWVyIHtcbiAgY29uc3RydWN0b3IoY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrXG4gICAgdGhpcy5yZW1haW5pbmcgPSBkZWxheVxuICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG5cbiAgICB0aGlzLnN0YXJ0KClcbiAgfVxuXG4gIHN0YXJ0KCkge1xuICAgIGlmICghdGhpcy5ydW5uaW5nKSB7XG4gICAgICB0aGlzLnJ1bm5pbmcgPSB0cnVlXG4gICAgICB0aGlzLnN0YXJ0ZWQgPSBuZXcgRGF0ZSgpXG4gICAgICB0aGlzLmlkID0gc2V0VGltZW91dCh0aGlzLmNhbGxiYWNrLCB0aGlzLnJlbWFpbmluZylcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBzdG9wKCkge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMucnVubmluZyA9IGZhbHNlXG4gICAgICBjbGVhclRpbWVvdXQodGhpcy5pZClcbiAgICAgIHRoaXMucmVtYWluaW5nIC09IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdGhpcy5zdGFydGVkLmdldFRpbWUoKVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5yZW1haW5pbmdcbiAgfVxuXG4gIGluY3JlYXNlKG4pIHtcbiAgICBjb25zdCBydW5uaW5nID0gdGhpcy5ydW5uaW5nXG4gICAgaWYgKHJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpXG4gICAgfVxuICAgIHRoaXMucmVtYWluaW5nICs9IG5cbiAgICBpZiAocnVubmluZykge1xuICAgICAgdGhpcy5zdGFydCgpXG4gICAgfVxuICAgIHJldHVybiB0aGlzLnJlbWFpbmluZ1xuICB9XG5cbiAgZ2V0VGltZXJMZWZ0KCkge1xuICAgIGlmICh0aGlzLnJ1bm5pbmcpIHtcbiAgICAgIHRoaXMuc3RvcCgpXG4gICAgICB0aGlzLnN0YXJ0KClcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucmVtYWluaW5nXG4gIH1cblxuICBpc1J1bm5pbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMucnVubmluZ1xuICB9XG59XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5cbmV4cG9ydCBjb25zdCBmaXhTY3JvbGxiYXIgPSAoKSA9PiB7XG4gIC8vIGZvciBxdWV1ZXMsIGRvIG5vdCBkbyB0aGlzIG1vcmUgdGhhbiBvbmNlXG4gIGlmIChkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICByZXR1cm5cbiAgfVxuICAvLyBpZiB0aGUgYm9keSBoYXMgb3ZlcmZsb3dcbiAgaWYgKGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0ID4gd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgLy8gYWRkIHBhZGRpbmcgc28gdGhlIGNvbnRlbnQgZG9lc24ndCBzaGlmdCBhZnRlciByZW1vdmFsIG9mIHNjcm9sbGJhclxuICAgIGRvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyA9IHBhcnNlSW50KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSlcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2RvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZyArIGRvbS5tZWFzdXJlU2Nyb2xsYmFyKCl9cHhgXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHVuZG9TY3JvbGxiYXIgPSAoKSA9PiB7XG4gIGlmIChkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgIT09IG51bGwpIHtcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IGAke2RvbS5zdGF0ZXMucHJldmlvdXNCb2R5UGFkZGluZ31weGBcbiAgICBkb20uc3RhdGVzLnByZXZpb3VzQm9keVBhZGRpbmcgPSBudWxsXG4gIH1cbn1cbiIsIi8qIGlzdGFuYnVsIGlnbm9yZSBmaWxlICovXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBzd2FsQ2xhc3NlcyB9IGZyb20gJy4uL3V0aWxzL2NsYXNzZXMuanMnXG5cbi8vIEZpeCBpT1Mgc2Nyb2xsaW5nIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xLzM5NjI2MzAyXG5cbmV4cG9ydCBjb25zdCBpT1NmaXggPSAoKSA9PiB7XG4gIGNvbnN0IGlPUyA9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgICgvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhd2luZG93Lk1TU3RyZWFtKSB8fFxuICAgIChuYXZpZ2F0b3IucGxhdGZvcm0gPT09ICdNYWNJbnRlbCcgJiYgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSlcbiAgaWYgKGlPUyAmJiAhZG9tLmhhc0NsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeCkpIHtcbiAgICBjb25zdCBvZmZzZXQgPSBkb2N1bWVudC5ib2R5LnNjcm9sbFRvcFxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUudG9wID0gYCR7b2Zmc2V0ICogLTF9cHhgXG4gICAgZG9tLmFkZENsYXNzKGRvY3VtZW50LmJvZHksIHN3YWxDbGFzc2VzLmlvc2ZpeClcbiAgICBsb2NrQm9keVNjcm9sbCgpXG4gICAgYWRkQm90dG9tUGFkZGluZ0ZvclRhbGxQb3B1cHMoKVxuICB9XG59XG5cbi8qKlxuICogaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8xOTQ4XG4gKi9cbmNvbnN0IGFkZEJvdHRvbVBhZGRpbmdGb3JUYWxsUG9wdXBzID0gKCkgPT4ge1xuICBjb25zdCB1YSA9IG5hdmlnYXRvci51c2VyQWdlbnRcbiAgY29uc3QgaU9TID0gISF1YS5tYXRjaCgvaVBhZC9pKSB8fCAhIXVhLm1hdGNoKC9pUGhvbmUvaSlcbiAgY29uc3Qgd2Via2l0ID0gISF1YS5tYXRjaCgvV2ViS2l0L2kpXG4gIGNvbnN0IGlPU1NhZmFyaSA9IGlPUyAmJiB3ZWJraXQgJiYgIXVhLm1hdGNoKC9DcmlPUy9pKVxuICBpZiAoaU9TU2FmYXJpKSB7XG4gICAgY29uc3QgYm90dG9tUGFuZWxIZWlnaHQgPSA0NFxuICAgIGlmIChkb20uZ2V0UG9wdXAoKS5zY3JvbGxIZWlnaHQgPiB3aW5kb3cuaW5uZXJIZWlnaHQgLSBib3R0b21QYW5lbEhlaWdodCkge1xuICAgICAgZG9tLmdldENvbnRhaW5lcigpLnN0eWxlLnBhZGRpbmdCb3R0b20gPSBgJHtib3R0b21QYW5lbEhlaWdodH1weGBcbiAgICB9XG4gIH1cbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzEyNDZcbiAqL1xuY29uc3QgbG9ja0JvZHlTY3JvbGwgPSAoKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBsZXQgcHJldmVudFRvdWNoTW92ZVxuICBjb250YWluZXIub250b3VjaHN0YXJ0ID0gKGUpID0+IHtcbiAgICBwcmV2ZW50VG91Y2hNb3ZlID0gc2hvdWxkUHJldmVudFRvdWNoTW92ZShlKVxuICB9XG4gIGNvbnRhaW5lci5vbnRvdWNobW92ZSA9IChlKSA9PiB7XG4gICAgaWYgKHByZXZlbnRUb3VjaE1vdmUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBzaG91bGRQcmV2ZW50VG91Y2hNb3ZlID0gKGV2ZW50KSA9PiB7XG4gIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldFxuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgaWYgKGlzU3R5bHVzKGV2ZW50KSB8fCBpc1pvb20oZXZlbnQpKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbiAgaWYgKHRhcmdldCA9PT0gY29udGFpbmVyKSB7XG4gICAgcmV0dXJuIHRydWVcbiAgfVxuICBpZiAoXG4gICAgIWRvbS5pc1Njcm9sbGFibGUoY29udGFpbmVyKSAmJlxuICAgIHRhcmdldC50YWdOYW1lICE9PSAnSU5QVVQnICYmIC8vICMxNjAzXG4gICAgdGFyZ2V0LnRhZ05hbWUgIT09ICdURVhUQVJFQScgJiYgLy8gIzIyNjZcbiAgICAhKFxuICAgICAgZG9tLmlzU2Nyb2xsYWJsZShkb20uZ2V0SHRtbENvbnRhaW5lcigpKSAmJiAvLyAjMTk0NFxuICAgICAgZG9tLmdldEh0bWxDb250YWluZXIoKS5jb250YWlucyh0YXJnZXQpXG4gICAgKVxuICApIHtcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG4gIHJldHVybiBmYWxzZVxufVxuXG4vKipcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMTc4NlxuICpcbiAqIEBwYXJhbSB7Kn0gZXZlbnRcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc1N0eWx1cyA9IChldmVudCkgPT4ge1xuICByZXR1cm4gZXZlbnQudG91Y2hlcyAmJiBldmVudC50b3VjaGVzLmxlbmd0aCAmJiBldmVudC50b3VjaGVzWzBdLnRvdWNoVHlwZSA9PT0gJ3N0eWx1cydcbn1cblxuLyoqXG4gKiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzE4OTFcbiAqXG4gKiBAcGFyYW0ge1RvdWNoRXZlbnR9IGV2ZW50XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuY29uc3QgaXNab29tID0gKGV2ZW50KSA9PiB7XG4gIHJldHVybiBldmVudC50b3VjaGVzICYmIGV2ZW50LnRvdWNoZXMubGVuZ3RoID4gMVxufVxuXG5leHBvcnQgY29uc3QgdW5kb0lPU2ZpeCA9ICgpID0+IHtcbiAgaWYgKGRvbS5oYXNDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gcGFyc2VJbnQoZG9jdW1lbnQuYm9keS5zdHlsZS50b3AsIDEwKVxuICAgIGRvbS5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCBzd2FsQ2xhc3Nlcy5pb3NmaXgpXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS50b3AgPSAnJ1xuICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gb2Zmc2V0ICogLTFcbiAgfVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4vZG9tL2luZGV4LmpzJ1xuaW1wb3J0IHsgc3dhbENsYXNzZXMgfSBmcm9tICcuL2NsYXNzZXMuanMnXG5pbXBvcnQgeyBmaXhTY3JvbGxiYXIgfSBmcm9tICcuL3Njcm9sbGJhckZpeC5qcydcbmltcG9ydCB7IGlPU2ZpeCB9IGZyb20gJy4vaW9zRml4LmpzJ1xuaW1wb3J0IHsgc2V0QXJpYUhpZGRlbiB9IGZyb20gJy4vYXJpYS5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcblxuZXhwb3J0IGNvbnN0IFNIT1dfQ0xBU1NfVElNRU9VVCA9IDEwXG5cbi8qKlxuICogT3BlbiBwb3B1cCwgYWRkIG5lY2Vzc2FyeSBjbGFzc2VzIGFuZCBzdHlsZXMsIGZpeCBzY3JvbGxiYXJcbiAqXG4gKiBAcGFyYW0gcGFyYW1zXG4gKi9cbmV4cG9ydCBjb25zdCBvcGVuUG9wdXAgPSAocGFyYW1zKSA9PiB7XG4gIGNvbnN0IGNvbnRhaW5lciA9IGRvbS5nZXRDb250YWluZXIoKVxuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMud2lsbE9wZW4gPT09ICdmdW5jdGlvbicpIHtcbiAgICBwYXJhbXMud2lsbE9wZW4ocG9wdXApXG4gIH1cblxuICBjb25zdCBib2R5U3R5bGVzID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQuYm9keSlcbiAgY29uc3QgaW5pdGlhbEJvZHlPdmVyZmxvdyA9IGJvZHlTdHlsZXMub3ZlcmZsb3dZXG4gIGFkZENsYXNzZXMoY29udGFpbmVyLCBwb3B1cCwgcGFyYW1zKVxuXG4gIC8vIHNjcm9sbGluZyBpcyAnaGlkZGVuJyB1bnRpbCBhbmltYXRpb24gaXMgZG9uZSwgYWZ0ZXIgdGhhdCAnYXV0bydcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgc2V0U2Nyb2xsaW5nVmlzaWJpbGl0eShjb250YWluZXIsIHBvcHVwKVxuICB9LCBTSE9XX0NMQVNTX1RJTUVPVVQpXG5cbiAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICBmaXhTY3JvbGxDb250YWluZXIoY29udGFpbmVyLCBwYXJhbXMuc2Nyb2xsYmFyUGFkZGluZywgaW5pdGlhbEJvZHlPdmVyZmxvdylcbiAgICBzZXRBcmlhSGlkZGVuKClcbiAgfVxuXG4gIGlmICghZG9tLmlzVG9hc3QoKSAmJiAhZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50KSB7XG4gICAgZ2xvYmFsU3RhdGUucHJldmlvdXNBY3RpdmVFbGVtZW50ID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudFxuICB9XG5cbiAgaWYgKHR5cGVvZiBwYXJhbXMuZGlkT3BlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gcGFyYW1zLmRpZE9wZW4ocG9wdXApKVxuICB9XG5cbiAgZG9tLnJlbW92ZUNsYXNzKGNvbnRhaW5lciwgc3dhbENsYXNzZXNbJ25vLXRyYW5zaXRpb24nXSlcbn1cblxuY29uc3Qgc3dhbE9wZW5BbmltYXRpb25GaW5pc2hlZCA9IChldmVudCkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGlmIChldmVudC50YXJnZXQgIT09IHBvcHVwKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgY29udGFpbmVyID0gZG9tLmdldENvbnRhaW5lcigpXG4gIHBvcHVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoZG9tLmFuaW1hdGlvbkVuZEV2ZW50LCBzd2FsT3BlbkFuaW1hdGlvbkZpbmlzaGVkKVxuICBjb250YWluZXIuc3R5bGUub3ZlcmZsb3dZID0gJ2F1dG8nXG59XG5cbmNvbnN0IHNldFNjcm9sbGluZ1Zpc2liaWxpdHkgPSAoY29udGFpbmVyLCBwb3B1cCkgPT4ge1xuICBpZiAoZG9tLmFuaW1hdGlvbkVuZEV2ZW50ICYmIGRvbS5oYXNDc3NBbmltYXRpb24ocG9wdXApKSB7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdoaWRkZW4nXG4gICAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihkb20uYW5pbWF0aW9uRW5kRXZlbnQsIHN3YWxPcGVuQW5pbWF0aW9uRmluaXNoZWQpXG4gIH0gZWxzZSB7XG4gICAgY29udGFpbmVyLnN0eWxlLm92ZXJmbG93WSA9ICdhdXRvJ1xuICB9XG59XG5cbmNvbnN0IGZpeFNjcm9sbENvbnRhaW5lciA9IChjb250YWluZXIsIHNjcm9sbGJhclBhZGRpbmcsIGluaXRpYWxCb2R5T3ZlcmZsb3cpID0+IHtcbiAgaU9TZml4KClcblxuICBpZiAoc2Nyb2xsYmFyUGFkZGluZyAmJiBpbml0aWFsQm9keU92ZXJmbG93ICE9PSAnaGlkZGVuJykge1xuICAgIGZpeFNjcm9sbGJhcigpXG4gIH1cblxuICAvLyBzd2VldGFsZXJ0Mi9pc3N1ZXMvMTI0N1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBjb250YWluZXIuc2Nyb2xsVG9wID0gMFxuICB9KVxufVxuXG5jb25zdCBhZGRDbGFzc2VzID0gKGNvbnRhaW5lciwgcG9wdXAsIHBhcmFtcykgPT4ge1xuICBkb20uYWRkQ2xhc3MoY29udGFpbmVyLCBwYXJhbXMuc2hvd0NsYXNzLmJhY2tkcm9wKVxuICAvLyB0aGlzIHdvcmthcm91bmQgd2l0aCBvcGFjaXR5IGlzIG5lZWRlZCBmb3IgaHR0cHM6Ly9naXRodWIuY29tL3N3ZWV0YWxlcnQyL3N3ZWV0YWxlcnQyL2lzc3Vlcy8yMDU5XG4gIHBvcHVwLnN0eWxlLnNldFByb3BlcnR5KCdvcGFjaXR5JywgJzAnLCAnaW1wb3J0YW50JylcbiAgZG9tLnNob3cocG9wdXAsICdncmlkJylcbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgLy8gQW5pbWF0ZSBwb3B1cCByaWdodCBhZnRlciBzaG93aW5nIGl0XG4gICAgZG9tLmFkZENsYXNzKHBvcHVwLCBwYXJhbXMuc2hvd0NsYXNzLnBvcHVwKVxuICAgIC8vIGFuZCByZW1vdmUgdGhlIG9wYWNpdHkgd29ya2Fyb3VuZFxuICAgIHBvcHVwLnN0eWxlLnJlbW92ZVByb3BlcnR5KCdvcGFjaXR5JylcbiAgfSwgU0hPV19DTEFTU19USU1FT1VUKSAvLyAxMG1zIGluIG9yZGVyIHRvIGZpeCAjMjA2MlxuXG4gIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXMuc2hvd24pXG4gIGlmIChwYXJhbXMuaGVpZ2h0QXV0byAmJiBwYXJhbXMuYmFja2Ryb3AgJiYgIXBhcmFtcy50b2FzdCkge1xuICAgIGRvbS5hZGRDbGFzcyhbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBkb2N1bWVudC5ib2R5XSwgc3dhbENsYXNzZXNbJ2hlaWdodC1hdXRvJ10pXG4gIH1cbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgU3dhbCBmcm9tICcuLi9zd2VldGFsZXJ0Mi5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcblxuLyoqXG4gKiBTaG93cyBsb2FkZXIgKHNwaW5uZXIpLCB0aGlzIGlzIHVzZWZ1bCB3aXRoIEFKQVggcmVxdWVzdHMuXG4gKiBCeSBkZWZhdWx0IHRoZSBsb2FkZXIgYmUgc2hvd24gaW5zdGVhZCBvZiB0aGUgXCJDb25maXJtXCIgYnV0dG9uLlxuICovXG5jb25zdCBzaG93TG9hZGluZyA9IChidXR0b25Ub1JlcGxhY2UpID0+IHtcbiAgbGV0IHBvcHVwID0gZG9tLmdldFBvcHVwKClcbiAgaWYgKCFwb3B1cCkge1xuICAgIG5ldyBTd2FsKCkgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1uZXdcbiAgfVxuICBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IGxvYWRlciA9IGRvbS5nZXRMb2FkZXIoKVxuXG4gIGlmIChkb20uaXNUb2FzdCgpKSB7XG4gICAgZG9tLmhpZGUoZG9tLmdldEljb24oKSlcbiAgfSBlbHNlIHtcbiAgICByZXBsYWNlQnV0dG9uKHBvcHVwLCBidXR0b25Ub1JlcGxhY2UpXG4gIH1cbiAgZG9tLnNob3cobG9hZGVyKVxuXG4gIHBvcHVwLnNldEF0dHJpYnV0ZSgnZGF0YS1sb2FkaW5nJywgdHJ1ZSlcbiAgcG9wdXAuc2V0QXR0cmlidXRlKCdhcmlhLWJ1c3knLCB0cnVlKVxuICBwb3B1cC5mb2N1cygpXG59XG5cbmNvbnN0IHJlcGxhY2VCdXR0b24gPSAocG9wdXAsIGJ1dHRvblRvUmVwbGFjZSkgPT4ge1xuICBjb25zdCBhY3Rpb25zID0gZG9tLmdldEFjdGlvbnMoKVxuICBjb25zdCBsb2FkZXIgPSBkb20uZ2V0TG9hZGVyKClcblxuICBpZiAoIWJ1dHRvblRvUmVwbGFjZSAmJiBkb20uaXNWaXNpYmxlKGRvbS5nZXRDb25maXJtQnV0dG9uKCkpKSB7XG4gICAgYnV0dG9uVG9SZXBsYWNlID0gZG9tLmdldENvbmZpcm1CdXR0b24oKVxuICB9XG5cbiAgZG9tLnNob3coYWN0aW9ucylcbiAgaWYgKGJ1dHRvblRvUmVwbGFjZSkge1xuICAgIGRvbS5oaWRlKGJ1dHRvblRvUmVwbGFjZSlcbiAgICBsb2FkZXIuc2V0QXR0cmlidXRlKCdkYXRhLWJ1dHRvbi10by1yZXBsYWNlJywgYnV0dG9uVG9SZXBsYWNlLmNsYXNzTmFtZSlcbiAgfVxuICBsb2FkZXIucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobG9hZGVyLCBidXR0b25Ub1JlcGxhY2UpXG4gIGRvbS5hZGRDbGFzcyhbcG9wdXAsIGFjdGlvbnNdLCBzd2FsQ2xhc3Nlcy5sb2FkaW5nKVxufVxuXG5leHBvcnQgeyBzaG93TG9hZGluZywgc2hvd0xvYWRpbmcgYXMgZW5hYmxlTG9hZGluZyB9XG4iLCJpbXBvcnQgKiBhcyBkb20gZnJvbSAnLi9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vY2xhc3Nlcy5qcydcbmltcG9ydCB7IGdldERpcmVjdENoaWxkQnlDbGFzcyB9IGZyb20gJy4vZG9tVXRpbHMuanMnXG5pbXBvcnQgeyBhc1Byb21pc2UsIGVycm9yLCBoYXNUb1Byb21pc2VGbiwgaXNQcm9taXNlIH0gZnJvbSAnLi4vdXRpbHMuanMnXG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4uLy4uL3N0YXRpY01ldGhvZHMvc2hvd0xvYWRpbmcuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVJbnB1dE9wdGlvbnNBbmRWYWx1ZSA9IChpbnN0YW5jZSwgcGFyYW1zKSA9PiB7XG4gIGlmIChwYXJhbXMuaW5wdXQgPT09ICdzZWxlY3QnIHx8IHBhcmFtcy5pbnB1dCA9PT0gJ3JhZGlvJykge1xuICAgIGhhbmRsZUlucHV0T3B0aW9ucyhpbnN0YW5jZSwgcGFyYW1zKVxuICB9IGVsc2UgaWYgKFxuICAgIFsndGV4dCcsICdlbWFpbCcsICdudW1iZXInLCAndGVsJywgJ3RleHRhcmVhJ10uaW5jbHVkZXMocGFyYW1zLmlucHV0KSAmJlxuICAgIChoYXNUb1Byb21pc2VGbihwYXJhbXMuaW5wdXRWYWx1ZSkgfHwgaXNQcm9taXNlKHBhcmFtcy5pbnB1dFZhbHVlKSlcbiAgKSB7XG4gICAgc2hvd0xvYWRpbmcoZG9tLmdldENvbmZpcm1CdXR0b24oKSlcbiAgICBoYW5kbGVJbnB1dFZhbHVlKGluc3RhbmNlLCBwYXJhbXMpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGdldElucHV0VmFsdWUgPSAoaW5zdGFuY2UsIGlubmVyUGFyYW1zKSA9PiB7XG4gIGNvbnN0IGlucHV0ID0gaW5zdGFuY2UuZ2V0SW5wdXQoKVxuICBpZiAoIWlucHV0KSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICBzd2l0Y2ggKGlubmVyUGFyYW1zLmlucHV0KSB7XG4gICAgY2FzZSAnY2hlY2tib3gnOlxuICAgICAgcmV0dXJuIGdldENoZWNrYm94VmFsdWUoaW5wdXQpXG4gICAgY2FzZSAncmFkaW8nOlxuICAgICAgcmV0dXJuIGdldFJhZGlvVmFsdWUoaW5wdXQpXG4gICAgY2FzZSAnZmlsZSc6XG4gICAgICByZXR1cm4gZ2V0RmlsZVZhbHVlKGlucHV0KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gaW5uZXJQYXJhbXMuaW5wdXRBdXRvVHJpbSA/IGlucHV0LnZhbHVlLnRyaW0oKSA6IGlucHV0LnZhbHVlXG4gIH1cbn1cblxuY29uc3QgZ2V0Q2hlY2tib3hWYWx1ZSA9IChpbnB1dCkgPT4gKGlucHV0LmNoZWNrZWQgPyAxIDogMClcblxuY29uc3QgZ2V0UmFkaW9WYWx1ZSA9IChpbnB1dCkgPT4gKGlucHV0LmNoZWNrZWQgPyBpbnB1dC52YWx1ZSA6IG51bGwpXG5cbmNvbnN0IGdldEZpbGVWYWx1ZSA9IChpbnB1dCkgPT5cbiAgaW5wdXQuZmlsZXMubGVuZ3RoID8gKGlucHV0LmdldEF0dHJpYnV0ZSgnbXVsdGlwbGUnKSAhPT0gbnVsbCA/IGlucHV0LmZpbGVzIDogaW5wdXQuZmlsZXNbMF0pIDogbnVsbFxuXG5jb25zdCBoYW5kbGVJbnB1dE9wdGlvbnMgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IHByb2Nlc3NJbnB1dE9wdGlvbnMgPSAoaW5wdXRPcHRpb25zKSA9PlxuICAgIHBvcHVsYXRlSW5wdXRPcHRpb25zW3BhcmFtcy5pbnB1dF0ocG9wdXAsIGZvcm1hdElucHV0T3B0aW9ucyhpbnB1dE9wdGlvbnMpLCBwYXJhbXMpXG4gIGlmIChoYXNUb1Byb21pc2VGbihwYXJhbXMuaW5wdXRPcHRpb25zKSB8fCBpc1Byb21pc2UocGFyYW1zLmlucHV0T3B0aW9ucykpIHtcbiAgICBzaG93TG9hZGluZyhkb20uZ2V0Q29uZmlybUJ1dHRvbigpKVxuICAgIGFzUHJvbWlzZShwYXJhbXMuaW5wdXRPcHRpb25zKS50aGVuKChpbnB1dE9wdGlvbnMpID0+IHtcbiAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICAgIHByb2Nlc3NJbnB1dE9wdGlvbnMoaW5wdXRPcHRpb25zKVxuICAgIH0pXG4gIH0gZWxzZSBpZiAodHlwZW9mIHBhcmFtcy5pbnB1dE9wdGlvbnMgPT09ICdvYmplY3QnKSB7XG4gICAgcHJvY2Vzc0lucHV0T3B0aW9ucyhwYXJhbXMuaW5wdXRPcHRpb25zKVxuICB9IGVsc2Uge1xuICAgIGVycm9yKGBVbmV4cGVjdGVkIHR5cGUgb2YgaW5wdXRPcHRpb25zISBFeHBlY3RlZCBvYmplY3QsIE1hcCBvciBQcm9taXNlLCBnb3QgJHt0eXBlb2YgcGFyYW1zLmlucHV0T3B0aW9uc31gKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUlucHV0VmFsdWUgPSAoaW5zdGFuY2UsIHBhcmFtcykgPT4ge1xuICBjb25zdCBpbnB1dCA9IGluc3RhbmNlLmdldElucHV0KClcbiAgZG9tLmhpZGUoaW5wdXQpXG4gIGFzUHJvbWlzZShwYXJhbXMuaW5wdXRWYWx1ZSlcbiAgICAudGhlbigoaW5wdXRWYWx1ZSkgPT4ge1xuICAgICAgaW5wdXQudmFsdWUgPSBwYXJhbXMuaW5wdXQgPT09ICdudW1iZXInID8gcGFyc2VGbG9hdChpbnB1dFZhbHVlKSB8fCAwIDogYCR7aW5wdXRWYWx1ZX1gXG4gICAgICBkb20uc2hvdyhpbnB1dClcbiAgICAgIGlucHV0LmZvY3VzKClcbiAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICB9KVxuICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICBlcnJvcihgRXJyb3IgaW4gaW5wdXRWYWx1ZSBwcm9taXNlOiAke2Vycn1gKVxuICAgICAgaW5wdXQudmFsdWUgPSAnJ1xuICAgICAgZG9tLnNob3coaW5wdXQpXG4gICAgICBpbnB1dC5mb2N1cygpXG4gICAgICBpbnN0YW5jZS5oaWRlTG9hZGluZygpXG4gICAgfSlcbn1cblxuY29uc3QgcG9wdWxhdGVJbnB1dE9wdGlvbnMgPSB7XG4gIHNlbGVjdDogKHBvcHVwLCBpbnB1dE9wdGlvbnMsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHNlbGVjdCA9IGdldERpcmVjdENoaWxkQnlDbGFzcyhwb3B1cCwgc3dhbENsYXNzZXMuc2VsZWN0KVxuICAgIGNvbnN0IHJlbmRlck9wdGlvbiA9IChwYXJlbnQsIG9wdGlvbkxhYmVsLCBvcHRpb25WYWx1ZSkgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvblZhbHVlXG4gICAgICBkb20uc2V0SW5uZXJIdG1sKG9wdGlvbiwgb3B0aW9uTGFiZWwpXG4gICAgICBvcHRpb24uc2VsZWN0ZWQgPSBpc1NlbGVjdGVkKG9wdGlvblZhbHVlLCBwYXJhbXMuaW5wdXRWYWx1ZSlcbiAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgfVxuICAgIGlucHV0T3B0aW9ucy5mb3JFYWNoKChpbnB1dE9wdGlvbikgPT4ge1xuICAgICAgY29uc3Qgb3B0aW9uVmFsdWUgPSBpbnB1dE9wdGlvblswXVxuICAgICAgY29uc3Qgb3B0aW9uTGFiZWwgPSBpbnB1dE9wdGlvblsxXVxuICAgICAgLy8gPG9wdGdyb3VwPiBzcGVjOlxuICAgICAgLy8gaHR0cHM6Ly93d3cudzMub3JnL1RSL2h0bWw0MDEvaW50ZXJhY3QvZm9ybXMuaHRtbCNoLTE3LjZcbiAgICAgIC8vIFwiLi4uYWxsIE9QVEdST1VQIGVsZW1lbnRzIG11c3QgYmUgc3BlY2lmaWVkIGRpcmVjdGx5IHdpdGhpbiBhIFNFTEVDVCBlbGVtZW50IChpLmUuLCBncm91cHMgbWF5IG5vdCBiZSBuZXN0ZWQpLi4uXCJcbiAgICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhpcyBpcyBhIDxvcHRncm91cD5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbkxhYmVsKSkge1xuICAgICAgICAvLyBpZiBpdCBpcyBhbiBhcnJheSwgdGhlbiBpdCBpcyBhbiA8b3B0Z3JvdXA+XG4gICAgICAgIGNvbnN0IG9wdGdyb3VwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0Z3JvdXAnKVxuICAgICAgICBvcHRncm91cC5sYWJlbCA9IG9wdGlvblZhbHVlXG4gICAgICAgIG9wdGdyb3VwLmRpc2FibGVkID0gZmFsc2UgLy8gbm90IGNvbmZpZ3VyYWJsZSBmb3Igbm93XG4gICAgICAgIHNlbGVjdC5hcHBlbmRDaGlsZChvcHRncm91cClcbiAgICAgICAgb3B0aW9uTGFiZWwuZm9yRWFjaCgobykgPT4gcmVuZGVyT3B0aW9uKG9wdGdyb3VwLCBvWzFdLCBvWzBdKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGNhc2Ugb2YgPG9wdGlvbj5cbiAgICAgICAgcmVuZGVyT3B0aW9uKHNlbGVjdCwgb3B0aW9uTGFiZWwsIG9wdGlvblZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgc2VsZWN0LmZvY3VzKClcbiAgfSxcblxuICByYWRpbzogKHBvcHVwLCBpbnB1dE9wdGlvbnMsIHBhcmFtcykgPT4ge1xuICAgIGNvbnN0IHJhZGlvID0gZ2V0RGlyZWN0Q2hpbGRCeUNsYXNzKHBvcHVwLCBzd2FsQ2xhc3Nlcy5yYWRpbylcbiAgICBpbnB1dE9wdGlvbnMuZm9yRWFjaCgoaW5wdXRPcHRpb24pID0+IHtcbiAgICAgIGNvbnN0IHJhZGlvVmFsdWUgPSBpbnB1dE9wdGlvblswXVxuICAgICAgY29uc3QgcmFkaW9MYWJlbCA9IGlucHV0T3B0aW9uWzFdXG4gICAgICBjb25zdCByYWRpb0lucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxuICAgICAgY29uc3QgcmFkaW9MYWJlbEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXG4gICAgICByYWRpb0lucHV0LnR5cGUgPSAncmFkaW8nXG4gICAgICByYWRpb0lucHV0Lm5hbWUgPSBzd2FsQ2xhc3Nlcy5yYWRpb1xuICAgICAgcmFkaW9JbnB1dC52YWx1ZSA9IHJhZGlvVmFsdWVcbiAgICAgIGlmIChpc1NlbGVjdGVkKHJhZGlvVmFsdWUsIHBhcmFtcy5pbnB1dFZhbHVlKSkge1xuICAgICAgICByYWRpb0lucHV0LmNoZWNrZWQgPSB0cnVlXG4gICAgICB9XG4gICAgICBjb25zdCBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgZG9tLnNldElubmVySHRtbChsYWJlbCwgcmFkaW9MYWJlbClcbiAgICAgIGxhYmVsLmNsYXNzTmFtZSA9IHN3YWxDbGFzc2VzLmxhYmVsXG4gICAgICByYWRpb0xhYmVsRWxlbWVudC5hcHBlbmRDaGlsZChyYWRpb0lucHV0KVxuICAgICAgcmFkaW9MYWJlbEVsZW1lbnQuYXBwZW5kQ2hpbGQobGFiZWwpXG4gICAgICByYWRpby5hcHBlbmRDaGlsZChyYWRpb0xhYmVsRWxlbWVudClcbiAgICB9KVxuICAgIGNvbnN0IHJhZGlvcyA9IHJhZGlvLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICBpZiAocmFkaW9zLmxlbmd0aCkge1xuICAgICAgcmFkaW9zWzBdLmZvY3VzKClcbiAgICB9XG4gIH0sXG59XG5cbi8qKlxuICogQ29udmVydHMgYGlucHV0T3B0aW9uc2AgaW50byBhbiBhcnJheSBvZiBgW3ZhbHVlLCBsYWJlbF1gc1xuICogQHBhcmFtIGlucHV0T3B0aW9uc1xuICovXG5jb25zdCBmb3JtYXRJbnB1dE9wdGlvbnMgPSAoaW5wdXRPcHRpb25zKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IFtdXG4gIGlmICh0eXBlb2YgTWFwICE9PSAndW5kZWZpbmVkJyAmJiBpbnB1dE9wdGlvbnMgaW5zdGFuY2VvZiBNYXApIHtcbiAgICBpbnB1dE9wdGlvbnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgbGV0IHZhbHVlRm9ybWF0dGVkID0gdmFsdWVcbiAgICAgIGlmICh0eXBlb2YgdmFsdWVGb3JtYXR0ZWQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIC8vIGNhc2Ugb2YgPG9wdGdyb3VwPlxuICAgICAgICB2YWx1ZUZvcm1hdHRlZCA9IGZvcm1hdElucHV0T3B0aW9ucyh2YWx1ZUZvcm1hdHRlZClcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5wdXNoKFtrZXksIHZhbHVlRm9ybWF0dGVkXSlcbiAgICB9KVxuICB9IGVsc2Uge1xuICAgIE9iamVjdC5rZXlzKGlucHV0T3B0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBsZXQgdmFsdWVGb3JtYXR0ZWQgPSBpbnB1dE9wdGlvbnNba2V5XVxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZUZvcm1hdHRlZCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgLy8gY2FzZSBvZiA8b3B0Z3JvdXA+XG4gICAgICAgIHZhbHVlRm9ybWF0dGVkID0gZm9ybWF0SW5wdXRPcHRpb25zKHZhbHVlRm9ybWF0dGVkKVxuICAgICAgfVxuICAgICAgcmVzdWx0LnB1c2goW2tleSwgdmFsdWVGb3JtYXR0ZWRdKVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBpc1NlbGVjdGVkID0gKG9wdGlvblZhbHVlLCBpbnB1dFZhbHVlKSA9PiB7XG4gIHJldHVybiBpbnB1dFZhbHVlICYmIGlucHV0VmFsdWUudG9TdHJpbmcoKSA9PT0gb3B0aW9uVmFsdWUudG9TdHJpbmcoKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG4vKipcbiAqIEhpZGVzIGxvYWRlciBhbmQgc2hvd3MgYmFjayB0aGUgYnV0dG9uIHdoaWNoIHdhcyBoaWRkZW4gYnkgLnNob3dMb2FkaW5nKClcbiAqL1xuZnVuY3Rpb24gaGlkZUxvYWRpbmcoKSB7XG4gIC8vIGRvIG5vdGhpbmcgaWYgcG9wdXAgaXMgY2xvc2VkXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuICBpZiAoIWlubmVyUGFyYW1zKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGRvbS5oaWRlKGRvbUNhY2hlLmxvYWRlcilcbiAgaWYgKGRvbS5pc1RvYXN0KCkpIHtcbiAgICBpZiAoaW5uZXJQYXJhbXMuaWNvbikge1xuICAgICAgZG9tLnNob3coZG9tLmdldEljb24oKSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc2hvd1JlbGF0ZWRCdXR0b24oZG9tQ2FjaGUpXG4gIH1cbiAgZG9tLnJlbW92ZUNsYXNzKFtkb21DYWNoZS5wb3B1cCwgZG9tQ2FjaGUuYWN0aW9uc10sIHN3YWxDbGFzc2VzLmxvYWRpbmcpXG4gIGRvbUNhY2hlLnBvcHVwLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1idXN5JylcbiAgZG9tQ2FjaGUucG9wdXAucmVtb3ZlQXR0cmlidXRlKCdkYXRhLWxvYWRpbmcnKVxuICBkb21DYWNoZS5jb25maXJtQnV0dG9uLmRpc2FibGVkID0gZmFsc2VcbiAgZG9tQ2FjaGUuZGVueUJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG4gIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5kaXNhYmxlZCA9IGZhbHNlXG59XG5cbmNvbnN0IHNob3dSZWxhdGVkQnV0dG9uID0gKGRvbUNhY2hlKSA9PiB7XG4gIGNvbnN0IGJ1dHRvblRvUmVwbGFjZSA9IGRvbUNhY2hlLnBvcHVwLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoZG9tQ2FjaGUubG9hZGVyLmdldEF0dHJpYnV0ZSgnZGF0YS1idXR0b24tdG8tcmVwbGFjZScpKVxuICBpZiAoYnV0dG9uVG9SZXBsYWNlLmxlbmd0aCkge1xuICAgIGRvbS5zaG93KGJ1dHRvblRvUmVwbGFjZVswXSwgJ2lubGluZS1ibG9jaycpXG4gIH0gZWxzZSBpZiAoZG9tLmFsbEJ1dHRvbnNBcmVIaWRkZW4oKSkge1xuICAgIGRvbS5oaWRlKGRvbUNhY2hlLmFjdGlvbnMpXG4gIH1cbn1cblxuZXhwb3J0IHsgaGlkZUxvYWRpbmcsIGhpZGVMb2FkaW5nIGFzIGRpc2FibGVMb2FkaW5nIH1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuLyoqXG4gKiBHZXRzIHRoZSBpbnB1dCBET00gbm9kZSwgdGhpcyBtZXRob2Qgd29ya3Mgd2l0aCBpbnB1dCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7SFRNTEVsZW1lbnQgfCBudWxsfVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5wdXQoaW5zdGFuY2UpIHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuICBpZiAoIWRvbUNhY2hlKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICByZXR1cm4gZG9tLmdldElucHV0KGRvbUNhY2hlLnBvcHVwLCBpbm5lclBhcmFtcy5pbnB1dClcbn1cbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgY29udGFpbnMgYFdlYWtNYXBgcyBmb3IgZWFjaCBlZmZlY3RpdmVseS1cInByaXZhdGUgIHByb3BlcnR5XCIgdGhhdCBhIGBTd2FsYCBoYXMuXG4gKiBGb3IgZXhhbXBsZSwgdG8gc2V0IHRoZSBwcml2YXRlIHByb3BlcnR5IFwiZm9vXCIgb2YgYHRoaXNgIHRvIFwiYmFyXCIsIHlvdSBjYW4gYHByaXZhdGVQcm9wcy5mb28uc2V0KHRoaXMsICdiYXInKWBcbiAqIFRoaXMgaXMgdGhlIGFwcHJvYWNoIHRoYXQgQmFiZWwgd2lsbCBwcm9iYWJseSB0YWtlIHRvIGltcGxlbWVudCBwcml2YXRlIG1ldGhvZHMvZmllbGRzXG4gKiAgIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXByaXZhdGUtbWV0aG9kc1xuICogICBodHRwczovL2dpdGh1Yi5jb20vYmFiZWwvYmFiZWwvcHVsbC83NTU1XG4gKiBPbmNlIHdlIGhhdmUgdGhlIGNoYW5nZXMgZnJvbSB0aGF0IFBSIGluIEJhYmVsLCBhbmQgb3VyIGNvcmUgY2xhc3MgZml0cyByZWFzb25hYmxlIGluICpvbmUgbW9kdWxlKlxuICogICB0aGVuIHdlIGNhbiB1c2UgdGhhdCBsYW5ndWFnZSBmZWF0dXJlLlxuICovXG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3dhbFByb21pc2VSZXNvbHZlOiBuZXcgV2Vha01hcCgpLFxuICBzd2FsUHJvbWlzZVJlamVjdDogbmV3IFdlYWtNYXAoKSxcbn1cbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgKiBhcyBkb21VdGlscyBmcm9tICcuLi91dGlscy9kb20vZG9tVXRpbHMuanMnXG5cbmV4cG9ydCB7XG4gIGdldENvbnRhaW5lcixcbiAgZ2V0UG9wdXAsXG4gIGdldFRpdGxlLFxuICBnZXRIdG1sQ29udGFpbmVyLFxuICBnZXRJbWFnZSxcbiAgZ2V0SWNvbixcbiAgZ2V0SW5wdXRMYWJlbCxcbiAgZ2V0Q2xvc2VCdXR0b24sXG4gIGdldEFjdGlvbnMsXG4gIGdldENvbmZpcm1CdXR0b24sXG4gIGdldERlbnlCdXR0b24sXG4gIGdldENhbmNlbEJ1dHRvbixcbiAgZ2V0TG9hZGVyLFxuICBnZXRGb290ZXIsXG4gIGdldFRpbWVyUHJvZ3Jlc3NCYXIsXG4gIGdldEZvY3VzYWJsZUVsZW1lbnRzLFxuICBnZXRWYWxpZGF0aW9uTWVzc2FnZSxcbiAgaXNMb2FkaW5nLFxufSBmcm9tICcuLi91dGlscy9kb20vaW5kZXguanMnXG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIFN3ZWV0QWxlcnQyIHBvcHVwIGlzIHNob3duXG4gKi9cbmV4cG9ydCBjb25zdCBpc1Zpc2libGUgPSAoKSA9PiB7XG4gIHJldHVybiBkb21VdGlscy5pc1Zpc2libGUoZG9tLmdldFBvcHVwKCkpXG59XG5cbi8qXG4gKiBHbG9iYWwgZnVuY3Rpb24gdG8gY2xpY2sgJ0NvbmZpcm0nIGJ1dHRvblxuICovXG5leHBvcnQgY29uc3QgY2xpY2tDb25maXJtID0gKCkgPT4gZG9tLmdldENvbmZpcm1CdXR0b24oKSAmJiBkb20uZ2V0Q29uZmlybUJ1dHRvbigpLmNsaWNrKClcblxuLypcbiAqIEdsb2JhbCBmdW5jdGlvbiB0byBjbGljayAnRGVueScgYnV0dG9uXG4gKi9cbmV4cG9ydCBjb25zdCBjbGlja0RlbnkgPSAoKSA9PiBkb20uZ2V0RGVueUJ1dHRvbigpICYmIGRvbS5nZXREZW55QnV0dG9uKCkuY2xpY2soKVxuXG4vKlxuICogR2xvYmFsIGZ1bmN0aW9uIHRvIGNsaWNrICdDYW5jZWwnIGJ1dHRvblxuICovXG5leHBvcnQgY29uc3QgY2xpY2tDYW5jZWwgPSAoKSA9PiBkb20uZ2V0Q2FuY2VsQnV0dG9uKCkgJiYgZG9tLmdldENhbmNlbEJ1dHRvbigpLmNsaWNrKClcbiIsImltcG9ydCAqIGFzIGRvbSBmcm9tICcuL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgeyBjYWxsSWZGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBjbGlja0NvbmZpcm0gfSBmcm9tICcuL3N0YXRpY01ldGhvZHMvZG9tLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGNvbnN0IHJlbW92ZUtleWRvd25IYW5kbGVyID0gKGdsb2JhbFN0YXRlKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0ICYmIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQpIHtcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlciwge1xuICAgICAgY2FwdHVyZTogZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSxcbiAgICB9KVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQgPSBmYWxzZVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhZGRLZXlkb3duSGFuZGxlciA9IChpbnN0YW5jZSwgZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aCkgPT4ge1xuICByZW1vdmVLZXlkb3duSGFuZGxlcihnbG9iYWxTdGF0ZSlcbiAgaWYgKCFpbm5lclBhcmFtcy50b2FzdCkge1xuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyID0gKGUpID0+IGtleWRvd25IYW5kbGVyKGluc3RhbmNlLCBlLCBkaXNtaXNzV2l0aClcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0ID0gaW5uZXJQYXJhbXMua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSA/IHdpbmRvdyA6IGRvbS5nZXRQb3B1cCgpXG4gICAgZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSA9IGlubmVyUGFyYW1zLmtleWRvd25MaXN0ZW5lckNhcHR1cmVcbiAgICBnbG9iYWxTdGF0ZS5rZXlkb3duVGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBnbG9iYWxTdGF0ZS5rZXlkb3duSGFuZGxlciwge1xuICAgICAgY2FwdHVyZTogZ2xvYmFsU3RhdGUua2V5ZG93bkxpc3RlbmVyQ2FwdHVyZSxcbiAgICB9KVxuICAgIGdsb2JhbFN0YXRlLmtleWRvd25IYW5kbGVyQWRkZWQgPSB0cnVlXG4gIH1cbn1cblxuLy8gRm9jdXMgaGFuZGxpbmdcbmV4cG9ydCBjb25zdCBzZXRGb2N1cyA9IChpbm5lclBhcmFtcywgaW5kZXgsIGluY3JlbWVudCkgPT4ge1xuICBjb25zdCBmb2N1c2FibGVFbGVtZW50cyA9IGRvbS5nZXRGb2N1c2FibGVFbGVtZW50cygpXG4gIC8vIHNlYXJjaCBmb3IgdmlzaWJsZSBlbGVtZW50cyBhbmQgc2VsZWN0IHRoZSBuZXh0IHBvc3NpYmxlIG1hdGNoXG4gIGlmIChmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICBpbmRleCA9IGluZGV4ICsgaW5jcmVtZW50XG5cbiAgICAvLyByb2xsb3ZlciB0byBmaXJzdCBpdGVtXG4gICAgaWYgKGluZGV4ID09PSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGgpIHtcbiAgICAgIGluZGV4ID0gMFxuXG4gICAgICAvLyBnbyB0byBsYXN0IGl0ZW1cbiAgICB9IGVsc2UgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgaW5kZXggPSBmb2N1c2FibGVFbGVtZW50cy5sZW5ndGggLSAxXG4gICAgfVxuXG4gICAgcmV0dXJuIGZvY3VzYWJsZUVsZW1lbnRzW2luZGV4XS5mb2N1cygpXG4gIH1cbiAgLy8gbm8gdmlzaWJsZSBmb2N1c2FibGUgZWxlbWVudHMsIGZvY3VzIHRoZSBwb3B1cFxuICBkb20uZ2V0UG9wdXAoKS5mb2N1cygpXG59XG5cbmNvbnN0IGFycm93S2V5c05leHRCdXR0b24gPSBbJ0Fycm93UmlnaHQnLCAnQXJyb3dEb3duJ11cblxuY29uc3QgYXJyb3dLZXlzUHJldmlvdXNCdXR0b24gPSBbJ0Fycm93TGVmdCcsICdBcnJvd1VwJ11cblxuY29uc3Qga2V5ZG93bkhhbmRsZXIgPSAoaW5zdGFuY2UsIGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSlcblxuICBpZiAoIWlubmVyUGFyYW1zKSB7XG4gICAgcmV0dXJuIC8vIFRoaXMgaW5zdGFuY2UgaGFzIGFscmVhZHkgYmVlbiBkZXN0cm95ZWRcbiAgfVxuXG4gIC8vIElnbm9yZSBrZXlkb3duIGR1cmluZyBJTUUgY29tcG9zaXRpb25cbiAgLy8gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0RvY3VtZW50L2tleWRvd25fZXZlbnQjaWdub3Jpbmdfa2V5ZG93bl9kdXJpbmdfaW1lX2NvbXBvc2l0aW9uXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvNzIwXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvMjQwNlxuICBpZiAoZS5pc0NvbXBvc2luZyB8fCBlLmtleUNvZGUgPT09IDIyOSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLnN0b3BLZXlkb3duUHJvcGFnYXRpb24pIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gIH1cblxuICAvLyBFTlRFUlxuICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICBoYW5kbGVFbnRlcihpbnN0YW5jZSwgZSwgaW5uZXJQYXJhbXMpXG4gIH1cblxuICAvLyBUQUJcbiAgZWxzZSBpZiAoZS5rZXkgPT09ICdUYWInKSB7XG4gICAgaGFuZGxlVGFiKGUsIGlubmVyUGFyYW1zKVxuICB9XG5cbiAgLy8gQVJST1dTIC0gc3dpdGNoIGZvY3VzIGJldHdlZW4gYnV0dG9uc1xuICBlbHNlIGlmIChbLi4uYXJyb3dLZXlzTmV4dEJ1dHRvbiwgLi4uYXJyb3dLZXlzUHJldmlvdXNCdXR0b25dLmluY2x1ZGVzKGUua2V5KSkge1xuICAgIGhhbmRsZUFycm93cyhlLmtleSlcbiAgfVxuXG4gIC8vIEVTQ1xuICBlbHNlIGlmIChlLmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICBoYW5kbGVFc2MoZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZUVudGVyID0gKGluc3RhbmNlLCBlLCBpbm5lclBhcmFtcykgPT4ge1xuICAvLyBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvaXNzdWVzLzIzODZcbiAgaWYgKCFjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd0VudGVyS2V5KSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgaWYgKGUudGFyZ2V0ICYmIGluc3RhbmNlLmdldElucHV0KCkgJiYgZS50YXJnZXQub3V0ZXJIVE1MID09PSBpbnN0YW5jZS5nZXRJbnB1dCgpLm91dGVySFRNTCkge1xuICAgIGlmIChbJ3RleHRhcmVhJywgJ2ZpbGUnXS5pbmNsdWRlcyhpbm5lclBhcmFtcy5pbnB1dCkpIHtcbiAgICAgIHJldHVybiAvLyBkbyBub3Qgc3VibWl0XG4gICAgfVxuXG4gICAgY2xpY2tDb25maXJtKClcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVUYWIgPSAoZSwgaW5uZXJQYXJhbXMpID0+IHtcbiAgY29uc3QgdGFyZ2V0RWxlbWVudCA9IGUudGFyZ2V0XG5cbiAgY29uc3QgZm9jdXNhYmxlRWxlbWVudHMgPSBkb20uZ2V0Rm9jdXNhYmxlRWxlbWVudHMoKVxuICBsZXQgYnRuSW5kZXggPSAtMVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZvY3VzYWJsZUVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHRhcmdldEVsZW1lbnQgPT09IGZvY3VzYWJsZUVsZW1lbnRzW2ldKSB7XG4gICAgICBidG5JbmRleCA9IGlcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gQ3ljbGUgdG8gdGhlIG5leHQgYnV0dG9uXG4gIGlmICghZS5zaGlmdEtleSkge1xuICAgIHNldEZvY3VzKGlubmVyUGFyYW1zLCBidG5JbmRleCwgMSlcbiAgfVxuXG4gIC8vIEN5Y2xlIHRvIHRoZSBwcmV2IGJ1dHRvblxuICBlbHNlIHtcbiAgICBzZXRGb2N1cyhpbm5lclBhcmFtcywgYnRuSW5kZXgsIC0xKVxuICB9XG5cbiAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICBlLnByZXZlbnREZWZhdWx0KClcbn1cblxuY29uc3QgaGFuZGxlQXJyb3dzID0gKGtleSkgPT4ge1xuICBjb25zdCBjb25maXJtQnV0dG9uID0gZG9tLmdldENvbmZpcm1CdXR0b24oKVxuICBjb25zdCBkZW55QnV0dG9uID0gZG9tLmdldERlbnlCdXR0b24oKVxuICBjb25zdCBjYW5jZWxCdXR0b24gPSBkb20uZ2V0Q2FuY2VsQnV0dG9uKClcbiAgaWYgKCFbY29uZmlybUJ1dHRvbiwgZGVueUJ1dHRvbiwgY2FuY2VsQnV0dG9uXS5pbmNsdWRlcyhkb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xuICAgIHJldHVyblxuICB9XG4gIGNvbnN0IHNpYmxpbmcgPSBhcnJvd0tleXNOZXh0QnV0dG9uLmluY2x1ZGVzKGtleSkgPyAnbmV4dEVsZW1lbnRTaWJsaW5nJyA6ICdwcmV2aW91c0VsZW1lbnRTaWJsaW5nJ1xuICBsZXQgYnV0dG9uVG9Gb2N1cyA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBkb20uZ2V0QWN0aW9ucygpLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgYnV0dG9uVG9Gb2N1cyA9IGJ1dHRvblRvRm9jdXNbc2libGluZ11cbiAgICBpZiAoIWJ1dHRvblRvRm9jdXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBpZiAoZG9tLmlzVmlzaWJsZShidXR0b25Ub0ZvY3VzKSAmJiBidXR0b25Ub0ZvY3VzIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIGlmIChidXR0b25Ub0ZvY3VzIGluc3RhbmNlb2YgSFRNTEJ1dHRvbkVsZW1lbnQpIHtcbiAgICBidXR0b25Ub0ZvY3VzLmZvY3VzKClcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVFc2MgPSAoZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGlmIChjYWxsSWZGdW5jdGlvbihpbm5lclBhcmFtcy5hbGxvd0VzY2FwZUtleSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmVzYylcbiAgfVxufVxuIiwiaW1wb3J0IHsgdW5kb1Njcm9sbGJhciB9IGZyb20gJy4uL3V0aWxzL3Njcm9sbGJhckZpeC5qcydcbmltcG9ydCB7IHVuZG9JT1NmaXggfSBmcm9tICcuLi91dGlscy9pb3NGaXguanMnXG5pbXBvcnQgeyB1bnNldEFyaWFIaWRkZW4gfSBmcm9tICcuLi91dGlscy9hcmlhLmpzJ1xuaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSwgeyByZXN0b3JlQWN0aXZlRWxlbWVudCB9IGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgcHJpdmF0ZU1ldGhvZHMgZnJvbSAnLi4vcHJpdmF0ZU1ldGhvZHMuanMnXG5pbXBvcnQgeyByZW1vdmVLZXlkb3duSGFuZGxlciB9IGZyb20gJy4uL2tleWRvd24taGFuZGxlci5qcydcblxuLypcbiAqIEluc3RhbmNlIG1ldGhvZCB0byBjbG9zZSBzd2VldEFsZXJ0XG4gKi9cblxuZnVuY3Rpb24gcmVtb3ZlUG9wdXBBbmRSZXNldFN0YXRlKGluc3RhbmNlLCBjb250YWluZXIsIHJldHVybkZvY3VzLCBkaWRDbG9zZSkge1xuICBpZiAoZG9tLmlzVG9hc3QoKSkge1xuICAgIHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UoaW5zdGFuY2UsIGRpZENsb3NlKVxuICB9IGVsc2Uge1xuICAgIHJlc3RvcmVBY3RpdmVFbGVtZW50KHJldHVybkZvY3VzKS50aGVuKCgpID0+IHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UoaW5zdGFuY2UsIGRpZENsb3NlKSlcbiAgICByZW1vdmVLZXlkb3duSGFuZGxlcihnbG9iYWxTdGF0ZSlcbiAgfVxuXG4gIGNvbnN0IGlzU2FmYXJpID0gL14oKD8hY2hyb21lfGFuZHJvaWQpLikqc2FmYXJpL2kudGVzdChuYXZpZ2F0b3IudXNlckFnZW50KVxuICAvLyB3b3JrYXJvdW5kIGZvciAjMjA4OFxuICAvLyBmb3Igc29tZSByZWFzb24gcmVtb3ZpbmcgdGhlIGNvbnRhaW5lciBpbiBTYWZhcmkgd2lsbCBzY3JvbGwgdGhlIGRvY3VtZW50IHRvIGJvdHRvbVxuICBpZiAoaXNTYWZhcmkpIHtcbiAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsICdkaXNwbGF5Om5vbmUgIWltcG9ydGFudCcpXG4gICAgY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZSgnY2xhc3MnKVxuICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJ1xuICB9IGVsc2Uge1xuICAgIGNvbnRhaW5lci5yZW1vdmUoKVxuICB9XG5cbiAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICB1bmRvU2Nyb2xsYmFyKClcbiAgICB1bmRvSU9TZml4KClcbiAgICB1bnNldEFyaWFIaWRkZW4oKVxuICB9XG5cbiAgcmVtb3ZlQm9keUNsYXNzZXMoKVxufVxuXG5mdW5jdGlvbiByZW1vdmVCb2R5Q2xhc3NlcygpIHtcbiAgZG9tLnJlbW92ZUNsYXNzKFxuICAgIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldLFxuICAgIFtzd2FsQ2xhc3Nlcy5zaG93biwgc3dhbENsYXNzZXNbJ2hlaWdodC1hdXRvJ10sIHN3YWxDbGFzc2VzWyduby1iYWNrZHJvcCddLCBzd2FsQ2xhc3Nlc1sndG9hc3Qtc2hvd24nXV1cbiAgKVxufVxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2UocmVzb2x2ZVZhbHVlKSB7XG4gIHJlc29sdmVWYWx1ZSA9IHByZXBhcmVSZXNvbHZlVmFsdWUocmVzb2x2ZVZhbHVlKVxuXG4gIGNvbnN0IHN3YWxQcm9taXNlUmVzb2x2ZSA9IHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVzb2x2ZS5nZXQodGhpcylcblxuICBjb25zdCBkaWRDbG9zZSA9IHRyaWdnZXJDbG9zZVBvcHVwKHRoaXMpXG5cbiAgaWYgKHRoaXMuaXNBd2FpdGluZ1Byb21pc2UoKSkge1xuICAgIC8vIEEgc3dhbCBhd2FpdGluZyBmb3IgYSBwcm9taXNlIChhZnRlciBhIGNsaWNrIG9uIENvbmZpcm0gb3IgRGVueSkgY2Fubm90IGJlIGRpc21pc3NlZCBhbnltb3JlICMyMzM1XG4gICAgaWYgKCFyZXNvbHZlVmFsdWUuaXNEaXNtaXNzZWQpIHtcbiAgICAgIGhhbmRsZUF3YWl0aW5nUHJvbWlzZSh0aGlzKVxuICAgICAgc3dhbFByb21pc2VSZXNvbHZlKHJlc29sdmVWYWx1ZSlcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGlkQ2xvc2UpIHtcbiAgICAvLyBSZXNvbHZlIFN3YWwgcHJvbWlzZVxuICAgIHN3YWxQcm9taXNlUmVzb2x2ZShyZXNvbHZlVmFsdWUpXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQXdhaXRpbmdQcm9taXNlKCkge1xuICByZXR1cm4gISFwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLmdldCh0aGlzKVxufVxuXG5jb25zdCB0cmlnZ2VyQ2xvc2VQb3B1cCA9IChpbnN0YW5jZSkgPT4ge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG5cbiAgaWYgKCFwb3B1cCkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoIWlubmVyUGFyYW1zIHx8IGRvbS5oYXNDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLnBvcHVwKSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgZG9tLnJlbW92ZUNsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5zaG93Q2xhc3MucG9wdXApXG4gIGRvbS5hZGRDbGFzcyhwb3B1cCwgaW5uZXJQYXJhbXMuaGlkZUNsYXNzLnBvcHVwKVxuXG4gIGNvbnN0IGJhY2tkcm9wID0gZG9tLmdldENvbnRhaW5lcigpXG4gIGRvbS5yZW1vdmVDbGFzcyhiYWNrZHJvcCwgaW5uZXJQYXJhbXMuc2hvd0NsYXNzLmJhY2tkcm9wKVxuICBkb20uYWRkQ2xhc3MoYmFja2Ryb3AsIGlubmVyUGFyYW1zLmhpZGVDbGFzcy5iYWNrZHJvcClcblxuICBoYW5kbGVQb3B1cEFuaW1hdGlvbihpbnN0YW5jZSwgcG9wdXAsIGlubmVyUGFyYW1zKVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZWplY3RQcm9taXNlKGVycm9yKSB7XG4gIGNvbnN0IHJlamVjdFByb21pc2UgPSBwcml2YXRlTWV0aG9kcy5zd2FsUHJvbWlzZVJlamVjdC5nZXQodGhpcylcbiAgaGFuZGxlQXdhaXRpbmdQcm9taXNlKHRoaXMpXG4gIGlmIChyZWplY3RQcm9taXNlKSB7XG4gICAgLy8gUmVqZWN0IFN3YWwgcHJvbWlzZVxuICAgIHJlamVjdFByb21pc2UoZXJyb3IpXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IGhhbmRsZUF3YWl0aW5nUHJvbWlzZSA9IChpbnN0YW5jZSkgPT4ge1xuICBpZiAoaW5zdGFuY2UuaXNBd2FpdGluZ1Byb21pc2UoKSkge1xuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2UuZGVsZXRlKGluc3RhbmNlKVxuICAgIC8vIFRoZSBpbnN0YW5jZSBtaWdodCBoYXZlIGJlZW4gcHJldmlvdXNseSBwYXJ0bHkgZGVzdHJveWVkLCB3ZSBtdXN0IHJlc3VtZSB0aGUgZGVzdHJveSBwcm9jZXNzIGluIHRoaXMgY2FzZSAjMjMzNVxuICAgIGlmICghcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSkpIHtcbiAgICAgIGluc3RhbmNlLl9kZXN0cm95KClcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgcHJlcGFyZVJlc29sdmVWYWx1ZSA9IChyZXNvbHZlVmFsdWUpID0+IHtcbiAgLy8gV2hlbiB1c2VyIGNhbGxzIFN3YWwuY2xvc2UoKVxuICBpZiAodHlwZW9mIHJlc29sdmVWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNDb25maXJtZWQ6IGZhbHNlLFxuICAgICAgaXNEZW5pZWQ6IGZhbHNlLFxuICAgICAgaXNEaXNtaXNzZWQ6IHRydWUsXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE9iamVjdC5hc3NpZ24oXG4gICAge1xuICAgICAgaXNDb25maXJtZWQ6IGZhbHNlLFxuICAgICAgaXNEZW5pZWQ6IGZhbHNlLFxuICAgICAgaXNEaXNtaXNzZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAgcmVzb2x2ZVZhbHVlXG4gIClcbn1cblxuY29uc3QgaGFuZGxlUG9wdXBBbmltYXRpb24gPSAoaW5zdGFuY2UsIHBvcHVwLCBpbm5lclBhcmFtcykgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBkb20uZ2V0Q29udGFpbmVyKClcbiAgLy8gSWYgYW5pbWF0aW9uIGlzIHN1cHBvcnRlZCwgYW5pbWF0ZVxuICBjb25zdCBhbmltYXRpb25Jc1N1cHBvcnRlZCA9IGRvbS5hbmltYXRpb25FbmRFdmVudCAmJiBkb20uaGFzQ3NzQW5pbWF0aW9uKHBvcHVwKVxuXG4gIGlmICh0eXBlb2YgaW5uZXJQYXJhbXMud2lsbENsb3NlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaW5uZXJQYXJhbXMud2lsbENsb3NlKHBvcHVwKVxuICB9XG5cbiAgaWYgKGFuaW1hdGlvbklzU3VwcG9ydGVkKSB7XG4gICAgYW5pbWF0ZVBvcHVwKGluc3RhbmNlLCBwb3B1cCwgY29udGFpbmVyLCBpbm5lclBhcmFtcy5yZXR1cm5Gb2N1cywgaW5uZXJQYXJhbXMuZGlkQ2xvc2UpXG4gIH0gZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlLCByZW1vdmUgaW1tZWRpYXRlbHlcbiAgICByZW1vdmVQb3B1cEFuZFJlc2V0U3RhdGUoaW5zdGFuY2UsIGNvbnRhaW5lciwgaW5uZXJQYXJhbXMucmV0dXJuRm9jdXMsIGlubmVyUGFyYW1zLmRpZENsb3NlKVxuICB9XG59XG5cbmNvbnN0IGFuaW1hdGVQb3B1cCA9IChpbnN0YW5jZSwgcG9wdXAsIGNvbnRhaW5lciwgcmV0dXJuRm9jdXMsIGRpZENsb3NlKSA9PiB7XG4gIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjayA9IHJlbW92ZVBvcHVwQW5kUmVzZXRTdGF0ZS5iaW5kKFxuICAgIG51bGwsXG4gICAgaW5zdGFuY2UsXG4gICAgY29udGFpbmVyLFxuICAgIHJldHVybkZvY3VzLFxuICAgIGRpZENsb3NlXG4gIClcbiAgcG9wdXAuYWRkRXZlbnRMaXN0ZW5lcihkb20uYW5pbWF0aW9uRW5kRXZlbnQsIGZ1bmN0aW9uIChlKSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBwb3B1cCkge1xuICAgICAgZ2xvYmFsU3RhdGUuc3dhbENsb3NlRXZlbnRGaW5pc2hlZENhbGxiYWNrKClcbiAgICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS5zd2FsQ2xvc2VFdmVudEZpbmlzaGVkQ2FsbGJhY2tcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IHRyaWdnZXJEaWRDbG9zZUFuZERpc3Bvc2UgPSAoaW5zdGFuY2UsIGRpZENsb3NlKSA9PiB7XG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICh0eXBlb2YgZGlkQ2xvc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGRpZENsb3NlLmJpbmQoaW5zdGFuY2UucGFyYW1zKSgpXG4gICAgfVxuICAgIGluc3RhbmNlLl9kZXN0cm95KClcbiAgfSlcbn1cblxuZXhwb3J0IHsgY2xvc2UgYXMgY2xvc2VQb3B1cCwgY2xvc2UgYXMgY2xvc2VNb2RhbCwgY2xvc2UgYXMgY2xvc2VUb2FzdCB9XG4iLCJpbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuZnVuY3Rpb24gc2V0QnV0dG9uc0Rpc2FibGVkKGluc3RhbmNlLCBidXR0b25zLCBkaXNhYmxlZCkge1xuICBjb25zdCBkb21DYWNoZSA9IHByaXZhdGVQcm9wcy5kb21DYWNoZS5nZXQoaW5zdGFuY2UpXG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgZG9tQ2FjaGVbYnV0dG9uXS5kaXNhYmxlZCA9IGRpc2FibGVkXG4gIH0pXG59XG5cbmZ1bmN0aW9uIHNldElucHV0RGlzYWJsZWQoaW5wdXQsIGRpc2FibGVkKSB7XG4gIGlmICghaW5wdXQpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuICBpZiAoaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgIGNvbnN0IHJhZGlvc0NvbnRhaW5lciA9IGlucHV0LnBhcmVudE5vZGUucGFyZW50Tm9kZVxuICAgIGNvbnN0IHJhZGlvcyA9IHJhZGlvc0NvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCByYWRpb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIHJhZGlvc1tpXS5kaXNhYmxlZCA9IGRpc2FibGVkXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlucHV0LmRpc2FibGVkID0gZGlzYWJsZWRcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlQnV0dG9ucygpIHtcbiAgc2V0QnV0dG9uc0Rpc2FibGVkKHRoaXMsIFsnY29uZmlybUJ1dHRvbicsICdkZW55QnV0dG9uJywgJ2NhbmNlbEJ1dHRvbiddLCBmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVCdXR0b25zKCkge1xuICBzZXRCdXR0b25zRGlzYWJsZWQodGhpcywgWydjb25maXJtQnV0dG9uJywgJ2RlbnlCdXR0b24nLCAnY2FuY2VsQnV0dG9uJ10sIHRydWUpXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbmFibGVJbnB1dCgpIHtcbiAgcmV0dXJuIHNldElucHV0RGlzYWJsZWQodGhpcy5nZXRJbnB1dCgpLCBmYWxzZSlcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc2FibGVJbnB1dCgpIHtcbiAgcmV0dXJuIHNldElucHV0RGlzYWJsZWQodGhpcy5nZXRJbnB1dCgpLCB0cnVlKVxufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uL3V0aWxzL2RvbS9pbmRleC5qcydcbmltcG9ydCB7IHN3YWxDbGFzc2VzIH0gZnJvbSAnLi4vdXRpbHMvY2xhc3Nlcy5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi4vcHJpdmF0ZVByb3BzLmpzJ1xuXG4vLyBTaG93IGJsb2NrIHdpdGggdmFsaWRhdGlvbiBtZXNzYWdlXG5leHBvcnQgZnVuY3Rpb24gc2hvd1ZhbGlkYXRpb25NZXNzYWdlKGVycm9yKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICBjb25zdCBwYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KHRoaXMpXG4gIGRvbS5zZXRJbm5lckh0bWwoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UsIGVycm9yKVxuICBkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZS5jbGFzc05hbWUgPSBzd2FsQ2xhc3Nlc1sndmFsaWRhdGlvbi1tZXNzYWdlJ11cbiAgaWYgKHBhcmFtcy5jdXN0b21DbGFzcyAmJiBwYXJhbXMuY3VzdG9tQ2xhc3MudmFsaWRhdGlvbk1lc3NhZ2UpIHtcbiAgICBkb20uYWRkQ2xhc3MoZG9tQ2FjaGUudmFsaWRhdGlvbk1lc3NhZ2UsIHBhcmFtcy5jdXN0b21DbGFzcy52YWxpZGF0aW9uTWVzc2FnZSlcbiAgfVxuICBkb20uc2hvdyhkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSlcblxuICBjb25zdCBpbnB1dCA9IHRoaXMuZ2V0SW5wdXQoKVxuICBpZiAoaW5wdXQpIHtcbiAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaW52YWxpZCcsIHRydWUpXG4gICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5Jywgc3dhbENsYXNzZXNbJ3ZhbGlkYXRpb24tbWVzc2FnZSddKVxuICAgIGRvbS5mb2N1c0lucHV0KGlucHV0KVxuICAgIGRvbS5hZGRDbGFzcyhpbnB1dCwgc3dhbENsYXNzZXMuaW5wdXRlcnJvcilcbiAgfVxufVxuXG4vLyBIaWRlIGJsb2NrIHdpdGggdmFsaWRhdGlvbiBtZXNzYWdlXG5leHBvcnQgZnVuY3Rpb24gcmVzZXRWYWxpZGF0aW9uTWVzc2FnZSgpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGlmIChkb21DYWNoZS52YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgIGRvbS5oaWRlKGRvbUNhY2hlLnZhbGlkYXRpb25NZXNzYWdlKVxuICB9XG5cbiAgY29uc3QgaW5wdXQgPSB0aGlzLmdldElucHV0KClcbiAgaWYgKGlucHV0KSB7XG4gICAgaW5wdXQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWludmFsaWQnKVxuICAgIGlucHV0LnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScpXG4gICAgZG9tLnJlbW92ZUNsYXNzKGlucHV0LCBzd2FsQ2xhc3Nlcy5pbnB1dGVycm9yKVxuICB9XG59XG4iLCJpbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4uL3ByaXZhdGVQcm9wcy5qcydcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2dyZXNzU3RlcHMoKSB7XG4gIGNvbnN0IGRvbUNhY2hlID0gcHJpdmF0ZVByb3BzLmRvbUNhY2hlLmdldCh0aGlzKVxuICByZXR1cm4gZG9tQ2FjaGUucHJvZ3Jlc3NTdGVwc1xufVxuIiwiaW1wb3J0ICogYXMgZG9tIGZyb20gJy4uLy4uL3NyYy91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyB3YXJuIH0gZnJvbSAnLi4vLi4vc3JjL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgeyBpc1VwZGF0YWJsZVBhcmFtZXRlciB9IGZyb20gJy4uLy4uL3NyYy91dGlscy9wYXJhbXMuanMnXG5cbi8qKlxuICogVXBkYXRlcyBwb3B1cCBwYXJhbWV0ZXJzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlKHBhcmFtcykge1xuICBjb25zdCBwb3B1cCA9IGRvbS5nZXRQb3B1cCgpXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuXG4gIGlmICghcG9wdXAgfHwgZG9tLmhhc0NsYXNzKHBvcHVwLCBpbm5lclBhcmFtcy5oaWRlQ2xhc3MucG9wdXApKSB7XG4gICAgcmV0dXJuIHdhcm4oXG4gICAgICBgWW91J3JlIHRyeWluZyB0byB1cGRhdGUgdGhlIGNsb3NlZCBvciBjbG9zaW5nIHBvcHVwLCB0aGF0IHdvbid0IHdvcmsuIFVzZSB0aGUgdXBkYXRlKCkgbWV0aG9kIGluIHByZUNvbmZpcm0gcGFyYW1ldGVyIG9yIHNob3cgYSBuZXcgcG9wdXAuYFxuICAgIClcbiAgfVxuXG4gIGNvbnN0IHZhbGlkVXBkYXRhYmxlUGFyYW1zID0gZmlsdGVyVmFsaWRQYXJhbXMocGFyYW1zKVxuXG4gIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBpbm5lclBhcmFtcywgdmFsaWRVcGRhdGFibGVQYXJhbXMpXG5cbiAgZG9tLnJlbmRlcih0aGlzLCB1cGRhdGVkUGFyYW1zKVxuXG4gIHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5zZXQodGhpcywgdXBkYXRlZFBhcmFtcylcbiAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge1xuICAgIHBhcmFtczoge1xuICAgICAgdmFsdWU6IE9iamVjdC5hc3NpZ24oe30sIHRoaXMucGFyYW1zLCBwYXJhbXMpLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICB9LFxuICB9KVxufVxuXG5jb25zdCBmaWx0ZXJWYWxpZFBhcmFtcyA9IChwYXJhbXMpID0+IHtcbiAgY29uc3QgdmFsaWRVcGRhdGFibGVQYXJhbXMgPSB7fVxuICBPYmplY3Qua2V5cyhwYXJhbXMpLmZvckVhY2goKHBhcmFtKSA9PiB7XG4gICAgaWYgKGlzVXBkYXRhYmxlUGFyYW1ldGVyKHBhcmFtKSkge1xuICAgICAgdmFsaWRVcGRhdGFibGVQYXJhbXNbcGFyYW1dID0gcGFyYW1zW3BhcmFtXVxuICAgIH0gZWxzZSB7XG4gICAgICB3YXJuKFxuICAgICAgICBgSW52YWxpZCBwYXJhbWV0ZXIgdG8gdXBkYXRlOiBcIiR7cGFyYW19XCIuIFVwZGF0YWJsZSBwYXJhbXMgYXJlIGxpc3RlZCBoZXJlOiBodHRwczovL2dpdGh1Yi5jb20vc3dlZXRhbGVydDIvc3dlZXRhbGVydDIvYmxvYi9tYXN0ZXIvc3JjL3V0aWxzL3BhcmFtcy5qc1xcblxcbklmIHlvdSB0aGluayB0aGlzIHBhcmFtZXRlciBzaG91bGQgYmUgdXBkYXRhYmxlLCByZXF1ZXN0IGl0IGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9zd2VldGFsZXJ0Mi9zd2VldGFsZXJ0Mi9pc3N1ZXMvbmV3P3RlbXBsYXRlPTAyX2ZlYXR1cmVfcmVxdWVzdC5tZGBcbiAgICAgIClcbiAgICB9XG4gIH0pXG4gIHJldHVybiB2YWxpZFVwZGF0YWJsZVBhcmFtc1xufVxuIiwiaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4uL2dsb2JhbFN0YXRlLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuLi9wcml2YXRlUHJvcHMuanMnXG5pbXBvcnQgcHJpdmF0ZU1ldGhvZHMgZnJvbSAnLi4vcHJpdmF0ZU1ldGhvZHMuanMnXG5cbmV4cG9ydCBmdW5jdGlvbiBfZGVzdHJveSgpIHtcbiAgY29uc3QgZG9tQ2FjaGUgPSBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuZ2V0KHRoaXMpXG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldCh0aGlzKVxuXG4gIGlmICghaW5uZXJQYXJhbXMpIHtcbiAgICBkaXNwb3NlV2Vha01hcHModGhpcykgLy8gVGhlIFdlYWtNYXBzIG1pZ2h0IGhhdmUgYmVlbiBwYXJ0bHkgZGVzdHJveWVkLCB3ZSBtdXN0IHJlY2FsbCBpdCB0byBkaXNwb3NlIGFueSByZW1haW5pbmcgV2Vha01hcHMgIzIzMzVcbiAgICByZXR1cm4gLy8gVGhpcyBpbnN0YW5jZSBoYXMgYWxyZWFkeSBiZWVuIGRlc3Ryb3llZFxuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYW5vdGhlciBTd2FsIGNsb3NpbmdcbiAgaWYgKGRvbUNhY2hlLnBvcHVwICYmIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjaykge1xuICAgIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFjaygpXG4gICAgZGVsZXRlIGdsb2JhbFN0YXRlLnN3YWxDbG9zZUV2ZW50RmluaXNoZWRDYWxsYmFja1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYSBzd2FsIGRpc3Bvc2FsIGRlZmVyIHRpbWVyXG4gIGlmIChnbG9iYWxTdGF0ZS5kZWZlckRpc3Bvc2FsVGltZXIpIHtcbiAgICBjbGVhclRpbWVvdXQoZ2xvYmFsU3RhdGUuZGVmZXJEaXNwb3NhbFRpbWVyKVxuICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS5kZWZlckRpc3Bvc2FsVGltZXJcbiAgfVxuXG4gIGlmICh0eXBlb2YgaW5uZXJQYXJhbXMuZGlkRGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlubmVyUGFyYW1zLmRpZERlc3Ryb3koKVxuICB9XG4gIGRpc3Bvc2VTd2FsKHRoaXMpXG59XG5cbmNvbnN0IGRpc3Bvc2VTd2FsID0gKGluc3RhbmNlKSA9PiB7XG4gIGRpc3Bvc2VXZWFrTWFwcyhpbnN0YW5jZSlcbiAgLy8gVW5zZXQgdGhpcy5wYXJhbXMgc28gR0Mgd2lsbCBkaXNwb3NlIGl0ICgjMTU2OSlcbiAgZGVsZXRlIGluc3RhbmNlLnBhcmFtc1xuICAvLyBVbnNldCBnbG9iYWxTdGF0ZSBwcm9wcyBzbyBHQyB3aWxsIGRpc3Bvc2UgZ2xvYmFsU3RhdGUgKCMxNTY5KVxuICBkZWxldGUgZ2xvYmFsU3RhdGUua2V5ZG93bkhhbmRsZXJcbiAgZGVsZXRlIGdsb2JhbFN0YXRlLmtleWRvd25UYXJnZXRcbiAgLy8gVW5zZXQgY3VycmVudEluc3RhbmNlXG4gIGRlbGV0ZSBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2Vcbn1cblxuY29uc3QgZGlzcG9zZVdlYWtNYXBzID0gKGluc3RhbmNlKSA9PiB7XG4gIC8vIElmIHRoZSBjdXJyZW50IGluc3RhbmNlIGlzIGF3YWl0aW5nIGEgcHJvbWlzZSByZXN1bHQsIHdlIGtlZXAgdGhlIHByaXZhdGVNZXRob2RzIHRvIGNhbGwgdGhlbSBvbmNlIHRoZSBwcm9taXNlIHJlc3VsdCBpcyByZXRyaWV2ZWQgIzIzMzVcbiAgaWYgKGluc3RhbmNlLmlzQXdhaXRpbmdQcm9taXNlKCkpIHtcbiAgICB1bnNldFdlYWtNYXBzKHByaXZhdGVQcm9wcywgaW5zdGFuY2UpXG4gICAgcHJpdmF0ZVByb3BzLmF3YWl0aW5nUHJvbWlzZS5zZXQoaW5zdGFuY2UsIHRydWUpXG4gIH0gZWxzZSB7XG4gICAgdW5zZXRXZWFrTWFwcyhwcml2YXRlTWV0aG9kcywgaW5zdGFuY2UpXG4gICAgdW5zZXRXZWFrTWFwcyhwcml2YXRlUHJvcHMsIGluc3RhbmNlKVxuICB9XG59XG5cbmNvbnN0IHVuc2V0V2Vha01hcHMgPSAob2JqLCBpbnN0YW5jZSkgPT4ge1xuICBmb3IgKGNvbnN0IGkgaW4gb2JqKSB7XG4gICAgb2JqW2ldLmRlbGV0ZShpbnN0YW5jZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgaXNWaXNpYmxlIH0gZnJvbSAnLi91dGlscy9kb20vZG9tVXRpbHMuanMnXG5pbXBvcnQgeyBnZXRJbnB1dFZhbHVlIH0gZnJvbSAnLi91dGlscy9kb20vaW5wdXRVdGlscy5qcydcbmltcG9ydCB7IGdldERlbnlCdXR0b24sIGdldFZhbGlkYXRpb25NZXNzYWdlIH0gZnJvbSAnLi91dGlscy9kb20vZ2V0dGVycy5qcydcbmltcG9ydCB7IGFzUHJvbWlzZSwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLCBlcnJvciB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBzaG93TG9hZGluZyB9IGZyb20gJy4vc3RhdGljTWV0aG9kcy9zaG93TG9hZGluZy5qcydcbmltcG9ydCB7IERpc21pc3NSZWFzb24gfSBmcm9tICcuL3V0aWxzL0Rpc21pc3NSZWFzb24uanMnXG5pbXBvcnQgcHJpdmF0ZVByb3BzIGZyb20gJy4vcHJpdmF0ZVByb3BzLmpzJ1xuaW1wb3J0IHsgaGFuZGxlQXdhaXRpbmdQcm9taXNlIH0gZnJvbSAnLi9pbnN0YW5jZU1ldGhvZHMuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2sgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlQnV0dG9ucygpXG4gIGlmIChpbm5lclBhcmFtcy5pbnB1dCkge1xuICAgIGhhbmRsZUNvbmZpcm1PckRlbnlXaXRoSW5wdXQoaW5zdGFuY2UsICdjb25maXJtJylcbiAgfSBlbHNlIHtcbiAgICBjb25maXJtKGluc3RhbmNlLCB0cnVlKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVEZW55QnV0dG9uQ2xpY2sgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlQnV0dG9ucygpXG4gIGlmIChpbm5lclBhcmFtcy5yZXR1cm5JbnB1dFZhbHVlT25EZW55KSB7XG4gICAgaGFuZGxlQ29uZmlybU9yRGVueVdpdGhJbnB1dChpbnN0YW5jZSwgJ2RlbnknKVxuICB9IGVsc2Uge1xuICAgIGRlbnkoaW5zdGFuY2UsIGZhbHNlKVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBoYW5kbGVDYW5jZWxCdXR0b25DbGljayA9IChpbnN0YW5jZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgaW5zdGFuY2UuZGlzYWJsZUJ1dHRvbnMoKVxuICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmNhbmNlbClcbn1cblxuY29uc3QgaGFuZGxlQ29uZmlybU9yRGVueVdpdGhJbnB1dCA9IChpbnN0YW5jZSwgdHlwZSAvKiAnY29uZmlybScgfCAnZGVueScgKi8pID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoIWlubmVyUGFyYW1zLmlucHV0KSB7XG4gICAgcmV0dXJuIGVycm9yKFxuICAgICAgYFRoZSBcImlucHV0XCIgcGFyYW1ldGVyIGlzIG5lZWRlZCB0byBiZSBzZXQgd2hlbiB1c2luZyByZXR1cm5JbnB1dFZhbHVlT24ke2NhcGl0YWxpemVGaXJzdExldHRlcih0eXBlKX1gXG4gICAgKVxuICB9XG4gIGNvbnN0IGlucHV0VmFsdWUgPSBnZXRJbnB1dFZhbHVlKGluc3RhbmNlLCBpbm5lclBhcmFtcylcbiAgaWYgKGlubmVyUGFyYW1zLmlucHV0VmFsaWRhdG9yKSB7XG4gICAgaGFuZGxlSW5wdXRWYWxpZGF0b3IoaW5zdGFuY2UsIGlucHV0VmFsdWUsIHR5cGUpXG4gIH0gZWxzZSBpZiAoIWluc3RhbmNlLmdldElucHV0KCkuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgaW5zdGFuY2UuZW5hYmxlQnV0dG9ucygpXG4gICAgaW5zdGFuY2Uuc2hvd1ZhbGlkYXRpb25NZXNzYWdlKGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdkZW55Jykge1xuICAgIGRlbnkoaW5zdGFuY2UsIGlucHV0VmFsdWUpXG4gIH0gZWxzZSB7XG4gICAgY29uZmlybShpbnN0YW5jZSwgaW5wdXRWYWx1ZSlcbiAgfVxufVxuXG5jb25zdCBoYW5kbGVJbnB1dFZhbGlkYXRvciA9IChpbnN0YW5jZSwgaW5wdXRWYWx1ZSwgdHlwZSAvKiAnY29uZmlybScgfCAnZGVueScgKi8pID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpbnN0YW5jZS5kaXNhYmxlSW5wdXQoKVxuICBjb25zdCB2YWxpZGF0aW9uUHJvbWlzZSA9IFByb21pc2UucmVzb2x2ZSgpLnRoZW4oKCkgPT5cbiAgICBhc1Byb21pc2UoaW5uZXJQYXJhbXMuaW5wdXRWYWxpZGF0b3IoaW5wdXRWYWx1ZSwgaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpKVxuICApXG4gIHZhbGlkYXRpb25Qcm9taXNlLnRoZW4oKHZhbGlkYXRpb25NZXNzYWdlKSA9PiB7XG4gICAgaW5zdGFuY2UuZW5hYmxlQnV0dG9ucygpXG4gICAgaW5zdGFuY2UuZW5hYmxlSW5wdXQoKVxuICAgIGlmICh2YWxpZGF0aW9uTWVzc2FnZSkge1xuICAgICAgaW5zdGFuY2Uuc2hvd1ZhbGlkYXRpb25NZXNzYWdlKHZhbGlkYXRpb25NZXNzYWdlKVxuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2RlbnknKSB7XG4gICAgICBkZW55KGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb25maXJtKGluc3RhbmNlLCBpbnB1dFZhbHVlKVxuICAgIH1cbiAgfSlcbn1cblxuY29uc3QgZGVueSA9IChpbnN0YW5jZSwgdmFsdWUpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlIHx8IHRoaXMpXG5cbiAgaWYgKGlubmVyUGFyYW1zLnNob3dMb2FkZXJPbkRlbnkpIHtcbiAgICBzaG93TG9hZGluZyhnZXREZW55QnV0dG9uKCkpXG4gIH1cblxuICBpZiAoaW5uZXJQYXJhbXMucHJlRGVueSkge1xuICAgIHByaXZhdGVQcm9wcy5hd2FpdGluZ1Byb21pc2Uuc2V0KGluc3RhbmNlIHx8IHRoaXMsIHRydWUpIC8vIEZsYWdnaW5nIHRoZSBpbnN0YW5jZSBhcyBhd2FpdGluZyBhIHByb21pc2Ugc28gaXQncyBvd24gcHJvbWlzZSdzIHJlamVjdC9yZXNvbHZlIG1ldGhvZHMgZG9lc24ndCBnZXQgZGVzdHJveWVkIHVudGlsIHRoZSByZXN1bHQgZnJvbSB0aGlzIHByZURlbnkncyBwcm9taXNlIGlzIHJlY2VpdmVkXG4gICAgY29uc3QgcHJlRGVueVByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoKS50aGVuKCgpID0+XG4gICAgICBhc1Byb21pc2UoaW5uZXJQYXJhbXMucHJlRGVueSh2YWx1ZSwgaW5uZXJQYXJhbXMudmFsaWRhdGlvbk1lc3NhZ2UpKVxuICAgIClcbiAgICBwcmVEZW55UHJvbWlzZVxuICAgICAgLnRoZW4oKHByZURlbnlWYWx1ZSkgPT4ge1xuICAgICAgICBpZiAocHJlRGVueVZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgIGluc3RhbmNlLmhpZGVMb2FkaW5nKClcbiAgICAgICAgICBoYW5kbGVBd2FpdGluZ1Byb21pc2UoaW5zdGFuY2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzRGVuaWVkOiB0cnVlLCB2YWx1ZTogdHlwZW9mIHByZURlbnlWYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IHByZURlbnlWYWx1ZSB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmNhdGNoKChlcnJvcikgPT4gcmVqZWN0V2l0aChpbnN0YW5jZSB8fCB0aGlzLCBlcnJvcikpXG4gIH0gZWxzZSB7XG4gICAgaW5zdGFuY2UuY2xvc2VQb3B1cCh7IGlzRGVuaWVkOiB0cnVlLCB2YWx1ZSB9KVxuICB9XG59XG5cbmNvbnN0IHN1Y2NlZWRXaXRoID0gKGluc3RhbmNlLCB2YWx1ZSkgPT4ge1xuICBpbnN0YW5jZS5jbG9zZVBvcHVwKHsgaXNDb25maXJtZWQ6IHRydWUsIHZhbHVlIH0pXG59XG5cbmNvbnN0IHJlamVjdFdpdGggPSAoaW5zdGFuY2UsIGVycm9yKSA9PiB7XG4gIGluc3RhbmNlLnJlamVjdFByb21pc2UoZXJyb3IpXG59XG5cbmNvbnN0IGNvbmZpcm0gPSAoaW5zdGFuY2UsIHZhbHVlKSA9PiB7XG4gIGNvbnN0IGlubmVyUGFyYW1zID0gcHJpdmF0ZVByb3BzLmlubmVyUGFyYW1zLmdldChpbnN0YW5jZSB8fCB0aGlzKVxuXG4gIGlmIChpbm5lclBhcmFtcy5zaG93TG9hZGVyT25Db25maXJtKSB7XG4gICAgc2hvd0xvYWRpbmcoKVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLnByZUNvbmZpcm0pIHtcbiAgICBpbnN0YW5jZS5yZXNldFZhbGlkYXRpb25NZXNzYWdlKClcbiAgICBwcml2YXRlUHJvcHMuYXdhaXRpbmdQcm9taXNlLnNldChpbnN0YW5jZSB8fCB0aGlzLCB0cnVlKSAvLyBGbGFnZ2luZyB0aGUgaW5zdGFuY2UgYXMgYXdhaXRpbmcgYSBwcm9taXNlIHNvIGl0J3Mgb3duIHByb21pc2UncyByZWplY3QvcmVzb2x2ZSBtZXRob2RzIGRvZXNuJ3QgZ2V0IGRlc3Ryb3llZCB1bnRpbCB0aGUgcmVzdWx0IGZyb20gdGhpcyBwcmVDb25maXJtJ3MgcHJvbWlzZSBpcyByZWNlaXZlZFxuICAgIGNvbnN0IHByZUNvbmZpcm1Qcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PlxuICAgICAgYXNQcm9taXNlKGlubmVyUGFyYW1zLnByZUNvbmZpcm0odmFsdWUsIGlubmVyUGFyYW1zLnZhbGlkYXRpb25NZXNzYWdlKSlcbiAgICApXG4gICAgcHJlQ29uZmlybVByb21pc2VcbiAgICAgIC50aGVuKChwcmVDb25maXJtVmFsdWUpID0+IHtcbiAgICAgICAgaWYgKGlzVmlzaWJsZShnZXRWYWxpZGF0aW9uTWVzc2FnZSgpKSB8fCBwcmVDb25maXJtVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgaW5zdGFuY2UuaGlkZUxvYWRpbmcoKVxuICAgICAgICAgIGhhbmRsZUF3YWl0aW5nUHJvbWlzZShpbnN0YW5jZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdWNjZWVkV2l0aChpbnN0YW5jZSwgdHlwZW9mIHByZUNvbmZpcm1WYWx1ZSA9PT0gJ3VuZGVmaW5lZCcgPyB2YWx1ZSA6IHByZUNvbmZpcm1WYWx1ZSlcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyb3IpID0+IHJlamVjdFdpdGgoaW5zdGFuY2UgfHwgdGhpcywgZXJyb3IpKVxuICB9IGVsc2Uge1xuICAgIHN1Y2NlZWRXaXRoKGluc3RhbmNlLCB2YWx1ZSlcbiAgfVxufVxuIiwiaW1wb3J0IHsgY2FsbElmRnVuY3Rpb24gfSBmcm9tICcuL3V0aWxzL3V0aWxzLmpzJ1xuaW1wb3J0IHsgRGlzbWlzc1JlYXNvbiB9IGZyb20gJy4vdXRpbHMvRGlzbWlzc1JlYXNvbi5qcydcbmltcG9ydCBwcml2YXRlUHJvcHMgZnJvbSAnLi9wcml2YXRlUHJvcHMuanMnXG5cbmV4cG9ydCBjb25zdCBoYW5kbGVQb3B1cENsaWNrID0gKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpID0+IHtcbiAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICBpZiAoaW5uZXJQYXJhbXMudG9hc3QpIHtcbiAgICBoYW5kbGVUb2FzdENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG4gIH0gZWxzZSB7XG4gICAgLy8gSWdub3JlIGNsaWNrIGV2ZW50cyB0aGF0IGhhZCBtb3VzZWRvd24gb24gdGhlIHBvcHVwIGJ1dCBtb3VzZXVwIG9uIHRoZSBjb250YWluZXJcbiAgICAvLyBUaGlzIGNhbiBoYXBwZW4gd2hlbiB0aGUgdXNlciBkcmFncyBhIHNsaWRlclxuICAgIGhhbmRsZU1vZGFsTW91c2Vkb3duKGRvbUNhY2hlKVxuXG4gICAgLy8gSWdub3JlIGNsaWNrIGV2ZW50cyB0aGF0IGhhZCBtb3VzZWRvd24gb24gdGhlIGNvbnRhaW5lciBidXQgbW91c2V1cCBvbiB0aGUgcG9wdXBcbiAgICBoYW5kbGVDb250YWluZXJNb3VzZWRvd24oZG9tQ2FjaGUpXG5cbiAgICBoYW5kbGVNb2RhbENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG4gIH1cbn1cblxuY29uc3QgaGFuZGxlVG9hc3RDbGljayA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGRpc21pc3NXaXRoKSA9PiB7XG4gIC8vIENsb3NpbmcgdG9hc3QgYnkgaW50ZXJuYWwgY2xpY2tcbiAgZG9tQ2FjaGUucG9wdXAub25jbGljayA9ICgpID0+IHtcbiAgICBjb25zdCBpbm5lclBhcmFtcyA9IHByaXZhdGVQcm9wcy5pbm5lclBhcmFtcy5nZXQoaW5zdGFuY2UpXG4gICAgaWYgKGlubmVyUGFyYW1zICYmIChpc0FueUJ1dHRvblNob3duKGlubmVyUGFyYW1zKSB8fCBpbm5lclBhcmFtcy50aW1lciB8fCBpbm5lclBhcmFtcy5pbnB1dCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmNsb3NlKVxuICB9XG59XG5cbi8qKlxuICogQHBhcmFtIHsqfSBpbm5lclBhcmFtc1xuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmNvbnN0IGlzQW55QnV0dG9uU2hvd24gPSAoaW5uZXJQYXJhbXMpID0+IHtcbiAgcmV0dXJuIChcbiAgICBpbm5lclBhcmFtcy5zaG93Q29uZmlybUJ1dHRvbiB8fFxuICAgIGlubmVyUGFyYW1zLnNob3dEZW55QnV0dG9uIHx8XG4gICAgaW5uZXJQYXJhbXMuc2hvd0NhbmNlbEJ1dHRvbiB8fFxuICAgIGlubmVyUGFyYW1zLnNob3dDbG9zZUJ1dHRvblxuICApXG59XG5cbmxldCBpZ25vcmVPdXRzaWRlQ2xpY2sgPSBmYWxzZVxuXG5jb25zdCBoYW5kbGVNb2RhbE1vdXNlZG93biA9IChkb21DYWNoZSkgPT4ge1xuICBkb21DYWNoZS5wb3B1cC5vbm1vdXNlZG93biA9ICgpID0+IHtcbiAgICBkb21DYWNoZS5jb250YWluZXIub25tb3VzZXVwID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgIGRvbUNhY2hlLmNvbnRhaW5lci5vbm1vdXNldXAgPSB1bmRlZmluZWRcbiAgICAgIC8vIFdlIG9ubHkgY2hlY2sgaWYgdGhlIG1vdXNldXAgdGFyZ2V0IGlzIHRoZSBjb250YWluZXIgYmVjYXVzZSB1c3VhbGx5IGl0IGRvZXNuJ3RcbiAgICAgIC8vIGhhdmUgYW55IG90aGVyIGRpcmVjdCBjaGlsZHJlbiBhc2lkZSBvZiB0aGUgcG9wdXBcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9tQ2FjaGUuY29udGFpbmVyKSB7XG4gICAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IHRydWVcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaGFuZGxlQ29udGFpbmVyTW91c2Vkb3duID0gKGRvbUNhY2hlKSA9PiB7XG4gIGRvbUNhY2hlLmNvbnRhaW5lci5vbm1vdXNlZG93biA9ICgpID0+IHtcbiAgICBkb21DYWNoZS5wb3B1cC5vbm1vdXNldXAgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgZG9tQ2FjaGUucG9wdXAub25tb3VzZXVwID0gdW5kZWZpbmVkXG4gICAgICAvLyBXZSBhbHNvIG5lZWQgdG8gY2hlY2sgaWYgdGhlIG1vdXNldXAgdGFyZ2V0IGlzIGEgY2hpbGQgb2YgdGhlIHBvcHVwXG4gICAgICBpZiAoZS50YXJnZXQgPT09IGRvbUNhY2hlLnBvcHVwIHx8IGRvbUNhY2hlLnBvcHVwLmNvbnRhaW5zKGUudGFyZ2V0KSkge1xuICAgICAgICBpZ25vcmVPdXRzaWRlQ2xpY2sgPSB0cnVlXG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IGhhbmRsZU1vZGFsQ2xpY2sgPSAoaW5zdGFuY2UsIGRvbUNhY2hlLCBkaXNtaXNzV2l0aCkgPT4ge1xuICBkb21DYWNoZS5jb250YWluZXIub25jbGljayA9IChlKSA9PiB7XG4gICAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuZ2V0KGluc3RhbmNlKVxuICAgIGlmIChpZ25vcmVPdXRzaWRlQ2xpY2spIHtcbiAgICAgIGlnbm9yZU91dHNpZGVDbGljayA9IGZhbHNlXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb21DYWNoZS5jb250YWluZXIgJiYgY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dPdXRzaWRlQ2xpY2spKSB7XG4gICAgICBkaXNtaXNzV2l0aChEaXNtaXNzUmVhc29uLmJhY2tkcm9wKVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgZXJyb3IgfSBmcm9tICcuLi91dGlscy91dGlscy5qcydcblxuY29uc3QgaXNKcXVlcnlFbGVtZW50ID0gKGVsZW0pID0+IHR5cGVvZiBlbGVtID09PSAnb2JqZWN0JyAmJiBlbGVtLmpxdWVyeVxuY29uc3QgaXNFbGVtZW50ID0gKGVsZW0pID0+IGVsZW0gaW5zdGFuY2VvZiBFbGVtZW50IHx8IGlzSnF1ZXJ5RWxlbWVudChlbGVtKVxuXG5leHBvcnQgY29uc3QgYXJnc1RvUGFyYW1zID0gKGFyZ3MpID0+IHtcbiAgY29uc3QgcGFyYW1zID0ge31cbiAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnb2JqZWN0JyAmJiAhaXNFbGVtZW50KGFyZ3NbMF0pKSB7XG4gICAgT2JqZWN0LmFzc2lnbihwYXJhbXMsIGFyZ3NbMF0pXG4gIH0gZWxzZSB7XG4gICAgO1sndGl0bGUnLCAnaHRtbCcsICdpY29uJ10uZm9yRWFjaCgobmFtZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGFyZyA9IGFyZ3NbaW5kZXhdXG4gICAgICBpZiAodHlwZW9mIGFyZyA9PT0gJ3N0cmluZycgfHwgaXNFbGVtZW50KGFyZykpIHtcbiAgICAgICAgcGFyYW1zW25hbWVdID0gYXJnXG4gICAgICB9IGVsc2UgaWYgKGFyZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGVycm9yKGBVbmV4cGVjdGVkIHR5cGUgb2YgJHtuYW1lfSEgRXhwZWN0ZWQgXCJzdHJpbmdcIiBvciBcIkVsZW1lbnRcIiwgZ290ICR7dHlwZW9mIGFyZ31gKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbiAgcmV0dXJuIHBhcmFtc1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGZpcmUoLi4uYXJncykge1xuICBjb25zdCBTd2FsID0gdGhpcyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby10aGlzLWFsaWFzXG4gIHJldHVybiBuZXcgU3dhbCguLi5hcmdzKVxufVxuIiwiLyoqXG4gKiBSZXR1cm5zIGFuIGV4dGVuZGVkIHZlcnNpb24gb2YgYFN3YWxgIGNvbnRhaW5pbmcgYHBhcmFtc2AgYXMgZGVmYXVsdHMuXG4gKiBVc2VmdWwgZm9yIHJldXNpbmcgU3dhbCBjb25maWd1cmF0aW9uLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIEJlZm9yZTpcbiAqIGNvbnN0IHRleHRQcm9tcHRPcHRpb25zID0geyBpbnB1dDogJ3RleHQnLCBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlIH1cbiAqIGNvbnN0IHt2YWx1ZTogZmlyc3ROYW1lfSA9IGF3YWl0IFN3YWwuZmlyZSh7IC4uLnRleHRQcm9tcHRPcHRpb25zLCB0aXRsZTogJ1doYXQgaXMgeW91ciBmaXJzdCBuYW1lPycgfSlcbiAqIGNvbnN0IHt2YWx1ZTogbGFzdE5hbWV9ID0gYXdhaXQgU3dhbC5maXJlKHsgLi4udGV4dFByb21wdE9wdGlvbnMsIHRpdGxlOiAnV2hhdCBpcyB5b3VyIGxhc3QgbmFtZT8nIH0pXG4gKlxuICogQWZ0ZXI6XG4gKiBjb25zdCBUZXh0UHJvbXB0ID0gU3dhbC5taXhpbih7IGlucHV0OiAndGV4dCcsIHNob3dDYW5jZWxCdXR0b246IHRydWUgfSlcbiAqIGNvbnN0IHt2YWx1ZTogZmlyc3ROYW1lfSA9IGF3YWl0IFRleHRQcm9tcHQoJ1doYXQgaXMgeW91ciBmaXJzdCBuYW1lPycpXG4gKiBjb25zdCB7dmFsdWU6IGxhc3ROYW1lfSA9IGF3YWl0IFRleHRQcm9tcHQoJ1doYXQgaXMgeW91ciBsYXN0IG5hbWU/JylcbiAqXG4gKiBAcGFyYW0gbWl4aW5QYXJhbXNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1peGluKG1peGluUGFyYW1zKSB7XG4gIGNsYXNzIE1peGluU3dhbCBleHRlbmRzIHRoaXMge1xuICAgIF9tYWluKHBhcmFtcywgcHJpb3JpdHlNaXhpblBhcmFtcykge1xuICAgICAgcmV0dXJuIHN1cGVyLl9tYWluKHBhcmFtcywgT2JqZWN0LmFzc2lnbih7fSwgbWl4aW5QYXJhbXMsIHByaW9yaXR5TWl4aW5QYXJhbXMpKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBNaXhpblN3YWxcbn1cbiIsImltcG9ydCB7IGFuaW1hdGVUaW1lclByb2dyZXNzQmFyLCBzdG9wVGltZXJQcm9ncmVzc0JhciB9IGZyb20gJy4uL3V0aWxzL2RvbS9kb21VdGlscy5qcydcbmltcG9ydCBnbG9iYWxTdGF0ZSBmcm9tICcuLi9nbG9iYWxTdGF0ZS5qcydcblxuLyoqXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpcyBzZXQsIHJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIE90aGVyd2lzZSwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUaW1lckxlZnQgPSAoKSA9PiB7XG4gIHJldHVybiBnbG9iYWxTdGF0ZS50aW1lb3V0ICYmIGdsb2JhbFN0YXRlLnRpbWVvdXQuZ2V0VGltZXJMZWZ0KClcbn1cblxuLyoqXG4gKiBTdG9wIHRpbWVyLiBSZXR1cm5zIG51bWJlciBvZiBtaWxsaXNlY29uZHMgb2YgdGltZXIgcmVtYWluZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3Qgc3RvcFRpbWVyID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgIHN0b3BUaW1lclByb2dyZXNzQmFyKClcbiAgICByZXR1cm4gZ2xvYmFsU3RhdGUudGltZW91dC5zdG9wKClcbiAgfVxufVxuXG4vKipcbiAqIFJlc3VtZSB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIHRpbWVyIHJlbWFpbmVkLlxuICogSWYgYHRpbWVyYCBwYXJhbWV0ZXIgaXNuJ3Qgc2V0LCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqL1xuZXhwb3J0IGNvbnN0IHJlc3VtZVRpbWVyID0gKCkgPT4ge1xuICBpZiAoZ2xvYmFsU3RhdGUudGltZW91dCkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGdsb2JhbFN0YXRlLnRpbWVvdXQuc3RhcnQoKVxuICAgIGFuaW1hdGVUaW1lclByb2dyZXNzQmFyKHJlbWFpbmluZylcbiAgICByZXR1cm4gcmVtYWluaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBSZXN1bWUgdGltZXIuIFJldHVybnMgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBvZiB0aW1lciByZW1haW5lZC5cbiAqIElmIGB0aW1lcmAgcGFyYW1ldGVyIGlzbid0IHNldCwgcmV0dXJucyB1bmRlZmluZWQuXG4gKi9cbmV4cG9ydCBjb25zdCB0b2dnbGVUaW1lciA9ICgpID0+IHtcbiAgY29uc3QgdGltZXIgPSBnbG9iYWxTdGF0ZS50aW1lb3V0XG4gIHJldHVybiB0aW1lciAmJiAodGltZXIucnVubmluZyA/IHN0b3BUaW1lcigpIDogcmVzdW1lVGltZXIoKSlcbn1cblxuLyoqXG4gKiBJbmNyZWFzZSB0aW1lci4gUmV0dXJucyBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIG9mIGFuIHVwZGF0ZWQgdGltZXIuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkLlxuICovXG5leHBvcnQgY29uc3QgaW5jcmVhc2VUaW1lciA9IChuKSA9PiB7XG4gIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgY29uc3QgcmVtYWluaW5nID0gZ2xvYmFsU3RhdGUudGltZW91dC5pbmNyZWFzZShuKVxuICAgIGFuaW1hdGVUaW1lclByb2dyZXNzQmFyKHJlbWFpbmluZywgdHJ1ZSlcbiAgICByZXR1cm4gcmVtYWluaW5nXG4gIH1cbn1cblxuLyoqXG4gKiBDaGVjayBpZiB0aW1lciBpcyBydW5uaW5nLiBSZXR1cm5zIHRydWUgaWYgdGltZXIgaXMgcnVubmluZ1xuICogb3IgZmFsc2UgaWYgdGltZXIgaXMgcGF1c2VkIG9yIHN0b3BwZWQuXG4gKiBJZiBgdGltZXJgIHBhcmFtZXRlciBpc24ndCBzZXQsIHJldHVybnMgdW5kZWZpbmVkXG4gKi9cbmV4cG9ydCBjb25zdCBpc1RpbWVyUnVubmluZyA9ICgpID0+IHtcbiAgcmV0dXJuIGdsb2JhbFN0YXRlLnRpbWVvdXQgJiYgZ2xvYmFsU3RhdGUudGltZW91dC5pc1J1bm5pbmcoKVxufVxuIiwibGV0IGJvZHlDbGlja0xpc3RlbmVyQWRkZWQgPSBmYWxzZVxuY29uc3QgY2xpY2tIYW5kbGVycyA9IHt9XG5cbmV4cG9ydCBmdW5jdGlvbiBiaW5kQ2xpY2tIYW5kbGVyKGF0dHIgPSAnZGF0YS1zd2FsLXRlbXBsYXRlJykge1xuICBjbGlja0hhbmRsZXJzW2F0dHJdID0gdGhpc1xuXG4gIGlmICghYm9keUNsaWNrTGlzdGVuZXJBZGRlZCkge1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib2R5Q2xpY2tMaXN0ZW5lcilcbiAgICBib2R5Q2xpY2tMaXN0ZW5lckFkZGVkID0gdHJ1ZVxuICB9XG59XG5cbmNvbnN0IGJvZHlDbGlja0xpc3RlbmVyID0gKGV2ZW50KSA9PiB7XG4gIGZvciAobGV0IGVsID0gZXZlbnQudGFyZ2V0OyBlbCAmJiBlbCAhPT0gZG9jdW1lbnQ7IGVsID0gZWwucGFyZW50Tm9kZSkge1xuICAgIGZvciAoY29uc3QgYXR0ciBpbiBjbGlja0hhbmRsZXJzKSB7XG4gICAgICBjb25zdCB0ZW1wbGF0ZSA9IGVsLmdldEF0dHJpYnV0ZShhdHRyKVxuICAgICAgaWYgKHRlbXBsYXRlKSB7XG4gICAgICAgIGNsaWNrSGFuZGxlcnNbYXR0cl0uZmlyZSh7IHRlbXBsYXRlIH0pXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IGRlZmF1bHRQYXJhbXMsIHsgc2hvd1dhcm5pbmdzRm9yUGFyYW1zIH0gZnJvbSAnLi91dGlscy9wYXJhbXMuanMnXG5pbXBvcnQgKiBhcyBkb20gZnJvbSAnLi91dGlscy9kb20vaW5kZXguanMnXG5pbXBvcnQgeyBjYWxsSWZGdW5jdGlvbiB9IGZyb20gJy4vdXRpbHMvdXRpbHMuanMnXG5pbXBvcnQgeyBEaXNtaXNzUmVhc29uIH0gZnJvbSAnLi91dGlscy9EaXNtaXNzUmVhc29uLmpzJ1xuaW1wb3J0IHsgdW5zZXRBcmlhSGlkZGVuIH0gZnJvbSAnLi91dGlscy9hcmlhLmpzJ1xuaW1wb3J0IHsgZ2V0VGVtcGxhdGVQYXJhbXMgfSBmcm9tICcuL3V0aWxzL2dldFRlbXBsYXRlUGFyYW1zLmpzJ1xuaW1wb3J0IHNldFBhcmFtZXRlcnMgZnJvbSAnLi91dGlscy9zZXRQYXJhbWV0ZXJzLmpzJ1xuaW1wb3J0IFRpbWVyIGZyb20gJy4vdXRpbHMvVGltZXIuanMnXG5pbXBvcnQgeyBvcGVuUG9wdXAgfSBmcm9tICcuL3V0aWxzL29wZW5Qb3B1cC5qcydcbmltcG9ydCB7IGhhbmRsZUlucHV0T3B0aW9uc0FuZFZhbHVlIH0gZnJvbSAnLi91dGlscy9kb20vaW5wdXRVdGlscy5qcydcbmltcG9ydCB7IGhhbmRsZUNhbmNlbEJ1dHRvbkNsaWNrLCBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2ssIGhhbmRsZURlbnlCdXR0b25DbGljayB9IGZyb20gJy4vYnV0dG9ucy1oYW5kbGVycy5qcydcbmltcG9ydCB7IGhhbmRsZVBvcHVwQ2xpY2sgfSBmcm9tICcuL3BvcHVwLWNsaWNrLWhhbmRsZXIuanMnXG5pbXBvcnQgeyBhZGRLZXlkb3duSGFuZGxlciwgc2V0Rm9jdXMgfSBmcm9tICcuL2tleWRvd24taGFuZGxlci5qcydcbmltcG9ydCAqIGFzIHN0YXRpY01ldGhvZHMgZnJvbSAnLi9zdGF0aWNNZXRob2RzLmpzJ1xuaW1wb3J0ICogYXMgaW5zdGFuY2VNZXRob2RzIGZyb20gJy4vaW5zdGFuY2VNZXRob2RzLmpzJ1xuaW1wb3J0IHByaXZhdGVQcm9wcyBmcm9tICcuL3ByaXZhdGVQcm9wcy5qcydcbmltcG9ydCBwcml2YXRlTWV0aG9kcyBmcm9tICcuL3ByaXZhdGVNZXRob2RzLmpzJ1xuaW1wb3J0IGdsb2JhbFN0YXRlIGZyb20gJy4vZ2xvYmFsU3RhdGUuanMnXG5cbmxldCBjdXJyZW50SW5zdGFuY2VcblxuY2xhc3MgU3dlZXRBbGVydCB7XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAvLyBQcmV2ZW50IHJ1biBpbiBOb2RlIGVudlxuICAgIGlmICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY3VycmVudEluc3RhbmNlID0gdGhpc1xuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IG91dGVyUGFyYW1zID0gT2JqZWN0LmZyZWV6ZSh0aGlzLmNvbnN0cnVjdG9yLmFyZ3NUb1BhcmFtcyhhcmdzKSlcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHRoaXMsIHtcbiAgICAgIHBhcmFtczoge1xuICAgICAgICB2YWx1ZTogb3V0ZXJQYXJhbXMsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHByb21pc2UgPSB0aGlzLl9tYWluKHRoaXMucGFyYW1zKVxuICAgIHByaXZhdGVQcm9wcy5wcm9taXNlLnNldCh0aGlzLCBwcm9taXNlKVxuICB9XG5cbiAgX21haW4odXNlclBhcmFtcywgbWl4aW5QYXJhbXMgPSB7fSkge1xuICAgIHNob3dXYXJuaW5nc0ZvclBhcmFtcyhPYmplY3QuYXNzaWduKHt9LCBtaXhpblBhcmFtcywgdXNlclBhcmFtcykpXG5cbiAgICBpZiAoZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlKSB7XG4gICAgICBnbG9iYWxTdGF0ZS5jdXJyZW50SW5zdGFuY2UuX2Rlc3Ryb3koKVxuICAgICAgaWYgKGRvbS5pc01vZGFsKCkpIHtcbiAgICAgICAgdW5zZXRBcmlhSGlkZGVuKClcbiAgICAgIH1cbiAgICB9XG4gICAgZ2xvYmFsU3RhdGUuY3VycmVudEluc3RhbmNlID0gdGhpc1xuXG4gICAgY29uc3QgaW5uZXJQYXJhbXMgPSBwcmVwYXJlUGFyYW1zKHVzZXJQYXJhbXMsIG1peGluUGFyYW1zKVxuICAgIHNldFBhcmFtZXRlcnMoaW5uZXJQYXJhbXMpXG4gICAgT2JqZWN0LmZyZWV6ZShpbm5lclBhcmFtcylcblxuICAgIC8vIGNsZWFyIHRoZSBwcmV2aW91cyB0aW1lclxuICAgIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0KSB7XG4gICAgICBnbG9iYWxTdGF0ZS50aW1lb3V0LnN0b3AoKVxuICAgICAgZGVsZXRlIGdsb2JhbFN0YXRlLnRpbWVvdXRcbiAgICB9XG5cbiAgICAvLyBjbGVhciB0aGUgcmVzdG9yZSBmb2N1cyB0aW1lb3V0XG4gICAgY2xlYXJUaW1lb3V0KGdsb2JhbFN0YXRlLnJlc3RvcmVGb2N1c1RpbWVvdXQpXG5cbiAgICBjb25zdCBkb21DYWNoZSA9IHBvcHVsYXRlRG9tQ2FjaGUodGhpcylcblxuICAgIGRvbS5yZW5kZXIodGhpcywgaW5uZXJQYXJhbXMpXG5cbiAgICBwcml2YXRlUHJvcHMuaW5uZXJQYXJhbXMuc2V0KHRoaXMsIGlubmVyUGFyYW1zKVxuXG4gICAgcmV0dXJuIHN3YWxQcm9taXNlKHRoaXMsIGRvbUNhY2hlLCBpbm5lclBhcmFtcylcbiAgfVxuXG4gIC8vIGBjYXRjaGAgY2Fubm90IGJlIHRoZSBuYW1lIG9mIGEgbW9kdWxlIGV4cG9ydCwgc28gd2UgZGVmaW5lIG91ciB0aGVuYWJsZSBtZXRob2RzIGhlcmUgaW5zdGVhZFxuICB0aGVuKG9uRnVsZmlsbGVkKSB7XG4gICAgY29uc3QgcHJvbWlzZSA9IHByaXZhdGVQcm9wcy5wcm9taXNlLmdldCh0aGlzKVxuICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25GdWxmaWxsZWQpXG4gIH1cblxuICBmaW5hbGx5KG9uRmluYWxseSkge1xuICAgIGNvbnN0IHByb21pc2UgPSBwcml2YXRlUHJvcHMucHJvbWlzZS5nZXQodGhpcylcbiAgICByZXR1cm4gcHJvbWlzZS5maW5hbGx5KG9uRmluYWxseSlcbiAgfVxufVxuXG5jb25zdCBzd2FsUHJvbWlzZSA9IChpbnN0YW5jZSwgZG9tQ2FjaGUsIGlubmVyUGFyYW1zKSA9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgLy8gZnVuY3Rpb25zIHRvIGhhbmRsZSBhbGwgY2xvc2luZ3MvZGlzbWlzc2Fsc1xuICAgIGNvbnN0IGRpc21pc3NXaXRoID0gKGRpc21pc3MpID0+IHtcbiAgICAgIGluc3RhbmNlLmNsb3NlUG9wdXAoeyBpc0Rpc21pc3NlZDogdHJ1ZSwgZGlzbWlzcyB9KVxuICAgIH1cblxuICAgIHByaXZhdGVNZXRob2RzLnN3YWxQcm9taXNlUmVzb2x2ZS5zZXQoaW5zdGFuY2UsIHJlc29sdmUpXG4gICAgcHJpdmF0ZU1ldGhvZHMuc3dhbFByb21pc2VSZWplY3Quc2V0KGluc3RhbmNlLCByZWplY3QpXG5cbiAgICBkb21DYWNoZS5jb25maXJtQnV0dG9uLm9uY2xpY2sgPSAoKSA9PiBoYW5kbGVDb25maXJtQnV0dG9uQ2xpY2soaW5zdGFuY2UpXG4gICAgZG9tQ2FjaGUuZGVueUJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gaGFuZGxlRGVueUJ1dHRvbkNsaWNrKGluc3RhbmNlKVxuICAgIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5vbmNsaWNrID0gKCkgPT4gaGFuZGxlQ2FuY2VsQnV0dG9uQ2xpY2soaW5zdGFuY2UsIGRpc21pc3NXaXRoKVxuXG4gICAgZG9tQ2FjaGUuY2xvc2VCdXR0b24ub25jbGljayA9ICgpID0+IGRpc21pc3NXaXRoKERpc21pc3NSZWFzb24uY2xvc2UpXG5cbiAgICBoYW5kbGVQb3B1cENsaWNrKGluc3RhbmNlLCBkb21DYWNoZSwgZGlzbWlzc1dpdGgpXG5cbiAgICBhZGRLZXlkb3duSGFuZGxlcihpbnN0YW5jZSwgZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aClcblxuICAgIGhhbmRsZUlucHV0T3B0aW9uc0FuZFZhbHVlKGluc3RhbmNlLCBpbm5lclBhcmFtcylcblxuICAgIG9wZW5Qb3B1cChpbm5lclBhcmFtcylcblxuICAgIHNldHVwVGltZXIoZ2xvYmFsU3RhdGUsIGlubmVyUGFyYW1zLCBkaXNtaXNzV2l0aClcblxuICAgIGluaXRGb2N1cyhkb21DYWNoZSwgaW5uZXJQYXJhbXMpXG5cbiAgICAvLyBTY3JvbGwgY29udGFpbmVyIHRvIHRvcCBvbiBvcGVuICgjMTI0NywgIzE5NDYpXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBkb21DYWNoZS5jb250YWluZXIuc2Nyb2xsVG9wID0gMFxuICAgIH0pXG4gIH0pXG59XG5cbmNvbnN0IHByZXBhcmVQYXJhbXMgPSAodXNlclBhcmFtcywgbWl4aW5QYXJhbXMpID0+IHtcbiAgY29uc3QgdGVtcGxhdGVQYXJhbXMgPSBnZXRUZW1wbGF0ZVBhcmFtcyh1c2VyUGFyYW1zKVxuICBjb25zdCBwYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyYW1zLCBtaXhpblBhcmFtcywgdGVtcGxhdGVQYXJhbXMsIHVzZXJQYXJhbXMpIC8vIHByZWNlZGVuY2UgaXMgZGVzY3JpYmVkIGluICMyMTMxXG4gIHBhcmFtcy5zaG93Q2xhc3MgPSBPYmplY3QuYXNzaWduKHt9LCBkZWZhdWx0UGFyYW1zLnNob3dDbGFzcywgcGFyYW1zLnNob3dDbGFzcylcbiAgcGFyYW1zLmhpZGVDbGFzcyA9IE9iamVjdC5hc3NpZ24oe30sIGRlZmF1bHRQYXJhbXMuaGlkZUNsYXNzLCBwYXJhbXMuaGlkZUNsYXNzKVxuICByZXR1cm4gcGFyYW1zXG59XG5cbmNvbnN0IHBvcHVsYXRlRG9tQ2FjaGUgPSAoaW5zdGFuY2UpID0+IHtcbiAgY29uc3QgZG9tQ2FjaGUgPSB7XG4gICAgcG9wdXA6IGRvbS5nZXRQb3B1cCgpLFxuICAgIGNvbnRhaW5lcjogZG9tLmdldENvbnRhaW5lcigpLFxuICAgIGFjdGlvbnM6IGRvbS5nZXRBY3Rpb25zKCksXG4gICAgY29uZmlybUJ1dHRvbjogZG9tLmdldENvbmZpcm1CdXR0b24oKSxcbiAgICBkZW55QnV0dG9uOiBkb20uZ2V0RGVueUJ1dHRvbigpLFxuICAgIGNhbmNlbEJ1dHRvbjogZG9tLmdldENhbmNlbEJ1dHRvbigpLFxuICAgIGxvYWRlcjogZG9tLmdldExvYWRlcigpLFxuICAgIGNsb3NlQnV0dG9uOiBkb20uZ2V0Q2xvc2VCdXR0b24oKSxcbiAgICB2YWxpZGF0aW9uTWVzc2FnZTogZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlKCksXG4gICAgcHJvZ3Jlc3NTdGVwczogZG9tLmdldFByb2dyZXNzU3RlcHMoKSxcbiAgfVxuICBwcml2YXRlUHJvcHMuZG9tQ2FjaGUuc2V0KGluc3RhbmNlLCBkb21DYWNoZSlcblxuICByZXR1cm4gZG9tQ2FjaGVcbn1cblxuY29uc3Qgc2V0dXBUaW1lciA9IChnbG9iYWxTdGF0ZSwgaW5uZXJQYXJhbXMsIGRpc21pc3NXaXRoKSA9PiB7XG4gIGNvbnN0IHRpbWVyUHJvZ3Jlc3NCYXIgPSBkb20uZ2V0VGltZXJQcm9ncmVzc0JhcigpXG4gIGRvbS5oaWRlKHRpbWVyUHJvZ3Jlc3NCYXIpXG4gIGlmIChpbm5lclBhcmFtcy50aW1lcikge1xuICAgIGdsb2JhbFN0YXRlLnRpbWVvdXQgPSBuZXcgVGltZXIoKCkgPT4ge1xuICAgICAgZGlzbWlzc1dpdGgoJ3RpbWVyJylcbiAgICAgIGRlbGV0ZSBnbG9iYWxTdGF0ZS50aW1lb3V0XG4gICAgfSwgaW5uZXJQYXJhbXMudGltZXIpXG4gICAgaWYgKGlubmVyUGFyYW1zLnRpbWVyUHJvZ3Jlc3NCYXIpIHtcbiAgICAgIGRvbS5zaG93KHRpbWVyUHJvZ3Jlc3NCYXIpXG4gICAgICBkb20uYXBwbHlDdXN0b21DbGFzcyh0aW1lclByb2dyZXNzQmFyLCBpbm5lclBhcmFtcywgJ3RpbWVyUHJvZ3Jlc3NCYXInKVxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmIChnbG9iYWxTdGF0ZS50aW1lb3V0ICYmIGdsb2JhbFN0YXRlLnRpbWVvdXQucnVubmluZykge1xuICAgICAgICAgIC8vIHRpbWVyIGNhbiBiZSBhbHJlYWR5IHN0b3BwZWQgb3IgdW5zZXQgYXQgdGhpcyBwb2ludFxuICAgICAgICAgIGRvbS5hbmltYXRlVGltZXJQcm9ncmVzc0Jhcihpbm5lclBhcmFtcy50aW1lcilcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgaW5pdEZvY3VzID0gKGRvbUNhY2hlLCBpbm5lclBhcmFtcykgPT4ge1xuICBpZiAoaW5uZXJQYXJhbXMudG9hc3QpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIGlmICghY2FsbElmRnVuY3Rpb24oaW5uZXJQYXJhbXMuYWxsb3dFbnRlcktleSkpIHtcbiAgICByZXR1cm4gYmx1ckFjdGl2ZUVsZW1lbnQoKVxuICB9XG5cbiAgaWYgKCFmb2N1c0J1dHRvbihkb21DYWNoZSwgaW5uZXJQYXJhbXMpKSB7XG4gICAgc2V0Rm9jdXMoaW5uZXJQYXJhbXMsIC0xLCAxKVxuICB9XG59XG5cbmNvbnN0IGZvY3VzQnV0dG9uID0gKGRvbUNhY2hlLCBpbm5lclBhcmFtcykgPT4ge1xuICBpZiAoaW5uZXJQYXJhbXMuZm9jdXNEZW55ICYmIGRvbS5pc1Zpc2libGUoZG9tQ2FjaGUuZGVueUJ1dHRvbikpIHtcbiAgICBkb21DYWNoZS5kZW55QnV0dG9uLmZvY3VzKClcbiAgICByZXR1cm4gdHJ1ZVxuICB9XG5cbiAgaWYgKGlubmVyUGFyYW1zLmZvY3VzQ2FuY2VsICYmIGRvbS5pc1Zpc2libGUoZG9tQ2FjaGUuY2FuY2VsQnV0dG9uKSkge1xuICAgIGRvbUNhY2hlLmNhbmNlbEJ1dHRvbi5mb2N1cygpXG4gICAgcmV0dXJuIHRydWVcbiAgfVxuXG4gIGlmIChpbm5lclBhcmFtcy5mb2N1c0NvbmZpcm0gJiYgZG9tLmlzVmlzaWJsZShkb21DYWNoZS5jb25maXJtQnV0dG9uKSkge1xuICAgIGRvbUNhY2hlLmNvbmZpcm1CdXR0b24uZm9jdXMoKVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3QgYmx1ckFjdGl2ZUVsZW1lbnQgPSAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgJiYgdHlwZW9mIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1ciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpXG4gIH1cbn1cblxuLy8gQXNzaWduIGluc3RhbmNlIG1ldGhvZHMgZnJvbSBzcmMvaW5zdGFuY2VNZXRob2RzLyouanMgdG8gcHJvdG90eXBlXG5PYmplY3QuYXNzaWduKFN3ZWV0QWxlcnQucHJvdG90eXBlLCBpbnN0YW5jZU1ldGhvZHMpXG5cbi8vIEFzc2lnbiBzdGF0aWMgbWV0aG9kcyBmcm9tIHNyYy9zdGF0aWNNZXRob2RzLyouanMgdG8gY29uc3RydWN0b3Jcbk9iamVjdC5hc3NpZ24oU3dlZXRBbGVydCwgc3RhdGljTWV0aG9kcylcblxuLy8gUHJveHkgdG8gaW5zdGFuY2UgbWV0aG9kcyB0byBjb25zdHJ1Y3RvciwgZm9yIG5vdywgZm9yIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5XG5PYmplY3Qua2V5cyhpbnN0YW5jZU1ldGhvZHMpLmZvckVhY2goKGtleSkgPT4ge1xuICBTd2VldEFsZXJ0W2tleV0gPSBmdW5jdGlvbiAoLi4uYXJncykge1xuICAgIGlmIChjdXJyZW50SW5zdGFuY2UpIHtcbiAgICAgIHJldHVybiBjdXJyZW50SW5zdGFuY2Vba2V5XSguLi5hcmdzKVxuICAgIH1cbiAgfVxufSlcblxuU3dlZXRBbGVydC5EaXNtaXNzUmVhc29uID0gRGlzbWlzc1JlYXNvblxuXG5Td2VldEFsZXJ0LnZlcnNpb24gPSAnMTEuNC44J1xuXG5leHBvcnQgZGVmYXVsdCBTd2VldEFsZXJ0XG4iLCJpbXBvcnQgU3dlZXRBbGVydCBmcm9tICcuL1N3ZWV0QWxlcnQuanMnXG5cbmNvbnN0IFN3YWwgPSBTd2VldEFsZXJ0XG4vLyBAdHMtaWdub3JlXG5Td2FsLmRlZmF1bHQgPSBTd2FsXG5cbmV4cG9ydCBkZWZhdWx0IFN3YWxcbiIsImltcG9ydCBTd2FsIGZyb20gXCJzd2VldGFsZXJ0MlwiO1xuaW1wb3J0ICdzd2VldGFsZXJ0Mi9zcmMvc3dlZXRhbGVydDIuc2NzcydcbmltcG9ydCB7IGp1ZGdlRGxnQ29udGVudCB9IGZyb20gXCIuLi9KdWRnZS9qdWRnZVwiO1xuaW1wb3J0ICcuL2RpYWxvZ3VlLnNjc3MnXG5cbmV4cG9ydCBmdW5jdGlvbiB0ZXN0KCl7XG4gICAgU3dhbC5maXJlKHtcbiAgICAgICAgdGl0bGU6ICdFcnJvciEnLFxuICAgICAgICB0ZXh0OiAnRG8geW91IHdhbnQgdG8gY29udGludWUnLFxuICAgICAgICBpY29uOiAnZXJyb3InLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogJ0Nvb2wnXG4gICAgfSlcbiAgICBjb25zb2xlLmRpcihTd2FsKVxufVxuXG4vLyBsZXQgc3dhbCA9IFN3YWwuZmlyZTtcbmxldCBEbGdJZCA9IDBcblxuZXhwb3J0IGNsYXNzIERpYWxvZ3Vle1xuICAgIGlkOiBudW1iZXJcbiAgICBpbnB1dFZhbHVlOiBBcnJheTxEYXRhPlxuICAgIGNvbnN0cnVjdG9yKCl7XG4gICAgICAgIHRoaXMuaWQgPSBEbGdJZDtcbiAgICAgICAgRGxnSWQrKztcbiAgICB9XG4gICAgaW5wdXREbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgbGV0IGludCA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCB2YWx1ZSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCBudW1iZXIgPSAwO1xuICAgICAgICBsZXQgaW5wdXRJZCA9IFwiZXpwc3ktZGxnLWlucHV0XCIgKyBudW1iZXI7XG4gICAgICAgIGxldCBkb20gPSBuZXcgQXJyYXkoKVxuICAgICAgICBkbGdDb250ZW50ID0ganVkZ2VEbGdDb250ZW50KGRsZ0NvbnRlbnQsJ+i+k+WFpeWvueivnScpO1xuICAgICAgICBjb25zb2xlLmRpcihkbGdDb250ZW50KVxuICAgICAgICBpZihkbGdDb250ZW50LmlucHV0KXtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBkbGdDb250ZW50LmlucHV0ID09PSAnc3RyaW5nJylcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpbnQucHVzaChkbGdDb250ZW50LmlucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgaW50ID0gZGxnQ29udGVudC5pbnB1dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignUGxlYXNlIHNldCBpbnB1dCBpbiB5b3VyIG9iamVjdCEnKTtcbiAgICAgICAgfVxuICAgICAgICBpZihkbGdDb250ZW50LnZhbHVlKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZih0eXBlb2YgZGxnQ29udGVudC52YWx1ZSA9PT0gJ3N0cmluZycpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaChkbGdDb250ZW50LnZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGRsZ0NvbnRlbnQudmFsdWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmFsdWUucHVzaCgnJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBpbnQubGVuZ3RoO2krKylcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodmFsdWVbaV0gPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2YWx1ZVtpXSA9ICcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRleHQgPSAnJztcbiAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0ICArIFwiPGRpdiBjbGFzcz0nZXpwc3ktZGxnLWlucHV0LXRpdGxlJz5cIiAraW50W2ldKyBcIjwvZGl2PlwiIFxuICAgICAgICAgICAgICAgICsgXCIgPGlucHV0IHR5cGU9J3RleHQnIGNsYXNzPSdlenBzeS1kbGctaW5wdXQnIG5hbWU9ICdcIlxuICAgICAgICAgICAgICAgICsgaW5wdXRJZCArXCInIGlkPSdcIiArIGlucHV0SWQgKyBcIicgdmFsdWU9J1wiKyB2YWx1ZVtpXSArIFwiJyAvPjxicj5cIjtcbiAgICAgICAgICAgIG51bWJlcisrO1xuICAgICAgICAgICAgaW5wdXRJZCA9IFwiZXpwc3ktZGxnLWlucHV0XCIgKyBudW1iZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gY29uc29sZS5kaXIodGV4dClcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIGh0bWw6IHRleHQsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uQ29sb3I6ICcjNDk4M2QwJyxcbiAgICAgICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgY2FuY2VsQnV0dG9uVGV4dDogZGxnQ29udGVudC5jYW5jZWwsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICBjYW5jZWxCdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZUNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgaW50Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQgaHRtbERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXpwc3ktZGxnLWlucHV0XCIraSk7XG4gICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBEYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6IGludFtpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTElucHV0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGF0LmlucHV0VmFsdWUgPSBkb207XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgICAgICAgfVxuICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXMoZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlcygnbnVsbCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgZXJyb3JEbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn6ZSZ6K+v5a+56K+dJywn6ZSZ6K+v5L+h5oGvJyk7XG4gICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiAnZXJyb3InXG4gICAgICAgIH0pXG4gICAgfVxuICAgIGhlbHBEbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGRsZ0NvbnRlbnQgPSBqdWRnZURsZ0NvbnRlbnQoZGxnQ29udGVudCwn5biu5Yqp5a+56K+dJywn5biu5Yqp5L+h5oGvJyk7XG4gICAgICAgIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgY3VzdG9tQ2xhc3M6IHtcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpY29uOiAnaW5mbydcbiAgICAgICAgfSlcbiAgICB9XG4gICAgbGlzdERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfliJfooajpgInmi6nlr7nor50nKVxuICAgICAgICBsZXQgbnVtYmVyID0gMDtcbiAgICAgICAgbGV0IGRvbSA9IG5ldyBBcnJheSgpXG4gICAgICAgIGxldCB0aGF0ID0gdGhpc1xuICAgICAgICBpZihkbGdDb250ZW50LklzTXVsdGkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gJyc7XG4gICAgICAgICAgICBsZXQga2V5ID0gT2JqZWN0LmtleXMoZGxnQ29udGVudC5saXN0KTtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE9iamVjdC52YWx1ZXMoZGxnQ29udGVudC5saXN0KTtcbiAgICAgICAgICAgIHRleHQgKz0gXCI8ZGl2IGNsYXNzPSdlenBzeS1kbGctTXVsdGlEaXYnPuaMieS9j1NoaWZ05oiWQ29udHJvbOmUrui/m+ihjOWkmumAiTwvZGl2PlwiXG4gICAgICAgICAgICB0ZXh0ICs9IFwiPHNlbGVjdCBpZD0nZXpwc3ktZGxnLXNlbGVjdDAnIGNsYXNzPSdlenBzeS1kbGctbXVsdGlTZWxlY3Qgc3dhbDItc2VsZWN0JyBzdHlsZT0nZGlzcGxheTogZmxleCcgbXVsdGlwbGU9J3RydWUnPlxcblwiO1xuICAgICAgICAgICAgLy8gdGV4dCArPSBcIiAgIDxvcHRpb24gdmFsdWUgZGlzYWJsZWQ+U2VsZWN0PC9vcHRpb24+XFxuXCJcblxuICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwga2V5Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWYodmFsdWVbaV0gaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBsZXQga2V5MCA9IE9iamVjdC5rZXlzKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsdWUwID0gT2JqZWN0LnZhbHVlcyh2YWx1ZVtpXSlcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIiAgIDxvcHRncm91cCBsYWJlbD0nXCIrIGtleVtpXSArXCInID5cXG5cIlxuICAgICAgICAgICAgICAgICAgICBmb3IobGV0IGogPSAwO2ogPCBrZXkwLmxlbmd0aDtqKyspXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9IFwiICAgICAgIDxvcHRpb24gdmFsdWU9J1wiKyBrZXkwW2pdICtcIic+XCIrIHZhbHVlMFtqXSArXCI8L29wdGlvbj5cXG5cIlxuICAgICAgICAgICAgICAgICAgICB0ZXh0ICs9ICc8L29wdGdyb3VwPidcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgdGV4dCArPSBcIiAgIDxvcHRpb24gdmFsdWU9J1wiKyBrZXlbaV0gK1wiJz5cIisgdmFsdWVbaV0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbGV0IHNlbGVjdElkID0gXCJlenBzeS1kbGctc2VsZWN0XCIgKyBudW1iZXJcbiAgICAgICAgICAgICAgICAvLyBudW1iZXIrKztcbiAgICAgICAgICAgICAgICAvLyB0ZXh0ICs9IFwiICAgPHNlbGVjdCBpZD0nXCIrIHNlbGVjdElkICtcIicgY2xhc3M9J3N3YWwyLXNlbGVjdCcgc3R5bGU9J2Rpc3BsYXk6IGZsZXgnPlxcblwiO1xuICAgICAgICAgICAgICAgIC8vIHRleHQgKz0gXCIgICA8b3B0aW9uIHZhbHVlPSAnZGlzYWJsZWQnPlwiKyBrZXlbaV0gK1wiPC9vcHRpb24+XFxuXCJcbiAgICAgICAgICAgICAgICAvLyBpZih2YWx1ZVtpXSBpbnN0YW5jZW9mIE9iamVjdClcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCBrZXkwID0gT2JqZWN0LmtleXModmFsdWVbaV0pXG4gICAgICAgICAgICAgICAgLy8gICAgIGxldCB2YWx1ZTAgPSBPYmplY3QudmFsdWVzKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgIC8vICAgICBmb3IobGV0IGogPSAwO2ogPCBrZXkwLmxlbmd0aDtqKyspXG4gICAgICAgICAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHRleHQgKz0gXCIgICAgICAgPG9wdGlvbiB2YWx1ZT0nXCIrIGtleTBbal0gK1wiJz5cIisgdmFsdWUwW2pdICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgLy8gZWxzZXtcbiAgICAgICAgICAgICAgICAvLyAgICAgdGV4dCArPSBcIiAgICAgICA8b3B0aW9uIHZhbHVlPSdcIisga2V5W2ldICtcIic+XCIrIHZhbHVlW2ldICtcIjwvb3B0aW9uPlxcblwiXG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIC8vIHRleHQgKz0gJzwvc2VsZWN0PlxcbidcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGV4dCArPSBcIjwvc2VsZWN0PlwiXG5cbiAgICAgICAgICAgIHJldHVybiBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgICAgIGh0bWw6IHRleHQsXG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY2FuY2VsLFxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bidcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByZUNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2V6cHN5LWRsZy1zZWxlY3QwJylcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5kaXIoaHRtbERvbSlcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaT0wO2k8KDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0uc2VsZWN0ZWQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvcHRncm91cCA9ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkYXRhOiBEYXRhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9wdGdyb3VwIGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YU5hbWU6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhTmFtZTogKDxIVE1MT3B0R3JvdXBFbGVtZW50Pm9wdGdyb3VwKS5sYWJlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6ICg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkub3B0aW9uc1tpXS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vIGxldCBzZWwgPSBPYmplY3Qua2V5cyhkbGdDb250ZW50Lmxpc3QpXG4gICAgICAgICAgICAgICAgICAgIC8vIGZvcihsZXQgaSA9IDA7aSA8IHNlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBsZXQgaHRtbERvbSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZXpwc3ktZGxnLXNlbGVjdFwiK2kpO1xuICAgICAgICAgICAgICAgICAgICAvLyAgICAgbGV0IGRhdGE6IERhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGF0YU5hbWU6IHNlbFtpXSxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBkYXRhOiAoPEhUTUxJbnB1dEVsZW1lbnQ+aHRtbERvbSkudmFsdWVcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRWYWx1ZSA9IGRvbTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAudGhlbihlPT57XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgLy8gICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0aW1lcjogMjAwXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICByZXMoZS52YWx1ZSk7XG4gICAgICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgfVxuICAgICAgICBlbHNle1xuICAgICAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICAgICAgdGl0bGU6IGRsZ0NvbnRlbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgaW5wdXQ6ICdzZWxlY3QnLFxuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLCAgXG4gICAgICAgICAgICAgICAgaW5wdXRPcHRpb25zOiBkbGdDb250ZW50Lmxpc3QsXG4gICAgICAgICAgICAgICAgaW5wdXRQbGFjZWhvbGRlcjogJ1NlbGVjdCcsXG4gICAgICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IGRsZ0NvbnRlbnQuY2FuY2VsLFxuICAgICAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJyxcbiAgICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uOiAnZXpwc3ktZGxnLWJ0bicsXG4gICAgICAgICAgICAgICAgICAgIGlucHV0OiAnZXpwc3ktZGxnLXNlbGVjdCdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByZUNvbmZpcm06ICgpPT57XG4gICAgICAgICAgICAgICAgICAgIGxldCBodG1sRG9tID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc3dhbDItc2VsZWN0JylbMF07XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGk9MDtpPCg8SFRNTFNlbGVjdEVsZW1lbnQ+aHRtbERvbSkubGVuZ3RoO2krKyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS5vcHRpb25zW2ldLnNlbGVjdGVkKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgb3B0Z3JvdXAgPSAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGF0YTogRGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihvcHRncm91cCBpbnN0YW5jZW9mIEhUTUxTZWxlY3RFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLm9wdGlvbnNbaV0ubGFiZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiAoPEhUTUxTZWxlY3RFbGVtZW50Pmh0bWxEb20pLnZhbHVlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFOYW1lOiAoPEhUTUxPcHRHcm91cEVsZW1lbnQ+b3B0Z3JvdXApLmxhYmVsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogKDxIVE1MU2VsZWN0RWxlbWVudD5odG1sRG9tKS52YWx1ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXQuaW5wdXRWYWx1ZSA9IGRvbTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGRvbVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAvLyAudGhlbihlPT57XG4gICAgICAgICAgICAvLyAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgLy8gICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgLy8gICAgICAgICB7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgaWNvbjogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIHNob3dDb25maXJtQnV0dG9uOiBmYWxzZSxcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICB0aW1lcjogMjAwXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIHJlcyhlLnZhbHVlKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgICAgICBlbHNle1xuICAgICAgICAgICAgLy8gICAgICAgICAgICAgcmVzKFwibnVsbFwiKTtcbiAgICAgICAgICAgIC8vICAgICAgICAgfVxuICAgICAgICAgICAgLy8gICAgIH0pXG4gICAgICAgICAgICAvLyB9KVxuICAgICAgICB9XG4gICAgICAgIFxuICAgIH1cbiAgICBxdWVzdERsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfor6Lpl67lr7nor50nLCfor6Lpl67kv6Hmga8nKTtcbiAgICAgICAgcmV0dXJuIFN3YWwuZmlyZSh7XG4gICAgICAgICAgICB0aXRsZTogZGxnQ29udGVudC50aXRsZSxcbiAgICAgICAgICAgIHRleHQ6IGRsZ0NvbnRlbnQuY29udGVudCxcbiAgICAgICAgICAgIGNvbmZpcm1CdXR0b25Db2xvcjogJyM0OTgzZDAnLFxuICAgICAgICAgICAgc2hvd0NhbmNlbEJ1dHRvbjogdHJ1ZSxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nLFxuICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaWNvbjogJ3F1ZXN0aW9uJ1xuICAgICAgICB9KS50aGVuKGU9PntcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzLHJlaik9PntcbiAgICAgICAgICAgICAgICBpZihlLmlzQ29uZmlybWVkKVxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnU3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBpY29uOiAnc3VjY2VzcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93Q29uZmlybUJ1dHRvbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lcjogMjAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXMoZS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIHJlcyhmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG4gICAgd2FybkRsZyhkbGdDb250ZW50OiBEbGdDb250ZW50KXtcbiAgICAgICAgZGxnQ29udGVudCA9IGp1ZGdlRGxnQ29udGVudChkbGdDb250ZW50LCfluK7liqnlr7nor50nLCfluK7liqnkv6Hmga8nKTtcbiAgICAgICAgU3dhbC5maXJlKHtcbiAgICAgICAgICAgIHRpdGxlOiBkbGdDb250ZW50LnRpdGxlLFxuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjdXN0b21DbGFzczoge1xuICAgICAgICAgICAgICAgIGNvbmZpcm1CdXR0b246ICdlenBzeS1kbGctYnRuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGljb246ICd3YXJuaW5nJ1xuICAgICAgICB9KVxuICAgIH1cbiAgICBtc2dEbGcoZGxnQ29udGVudDogRGxnQ29udGVudCl7XG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuaW1nVXJsID09PSB1bmRlZmluZWQpXG4gICAgICAgICAgICBkbGdDb250ZW50LmltZ1VybCA9ICdodHRwczovL3Vuc3BsYXNoLml0LzQwMC8yMDAnXG4gICAgICAgIGlmKGRsZ0NvbnRlbnQuaW1nV2lkdGggPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuaW1nV2lkdGggPSA0MDBcbiAgICAgICAgaWYoZGxnQ29udGVudC5pbWdIZWlnaHQgPT09IHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRsZ0NvbnRlbnQuaW1nSGVpZ2h0ID0gMjAwXG4gICAgICAgIHJldHVybiBTd2FsLmZpcmUoe1xuICAgICAgICAgICAgdGV4dDogZGxnQ29udGVudC5jb250ZW50LFxuICAgICAgICAgICAgd2lkdGg6IDEuMiAqIGRsZ0NvbnRlbnQuaW1nV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHRBdXRvOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlybUJ1dHRvbkNvbG9yOiAnIzQ5ODNkMCcsXG4gICAgICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogZGxnQ29udGVudC5jb25maXJtLFxuICAgICAgICAgICAgaW1hZ2VVcmw6IGRsZ0NvbnRlbnQuaW1nVXJsLFxuICAgICAgICAgICAgaW1hZ2VXaWR0aDogZGxnQ29udGVudC5pbWdXaWR0aCxcbiAgICAgICAgICAgIGltYWdlSGVpZ2h0OiBkbGdDb250ZW50LmltZ0hlaWdodCxcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiB7XG4gICAgICAgICAgICAgICAgY29uZmlybUJ1dHRvbjogJ2V6cHN5LWRsZy1idG4nXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLnRoZW4oZT0+e1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXMscmVqKT0+e1xuICAgICAgICAgICAgICAgIGlmKGUuaXNDb25maXJtZWQpXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICByZXMoZS52YWx1ZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn1cblxuaW50ZXJmYWNlIERhdGF7XG4gICAgZGF0YU5hbWU6IHN0cmluZ1xuICAgIGRhdGE6IHN0cmluZ1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERsZ0NvbnRlbnR7XG4gICAgdGl0bGU6IHN0cmluZ1xuICAgIGNvbnRlbnQ/OiBzdHJpbmdcbiAgICBpbWdVcmw/OiBzdHJpbmdcbiAgICBpbWdXaWR0aD86IG51bWJlclxuICAgIGltZ0hlaWdodD86IG51bWJlclxuICAgIGNvbmZpcm0/OiBzdHJpbmdcbiAgICBjYW5jZWw/OiBzdHJpbmdcbiAgICBpbnB1dD86IEFycmF5PHN0cmluZz4gfCBzdHJpbmdcbiAgICB2YWx1ZT86IEFycmF5PHN0cmluZz4gfCBzdHJpbmdcbiAgICBsaXN0PzogT2JqZWN0XG4gICAgSXNNdWx0aT86IGJvb2xlYW5cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIERsZ0luaXQoKXtcbiAgICBsZXQgZGxnID0gbmV3IERpYWxvZ3VlKCk7XG4gICAgcmV0dXJuIGRsZztcbn0iLCJpbXBvcnQgKiBhcyBlelV0aWxzIGZyb20gJy4vdXRpbHMnXG5pbXBvcnQgKiBhcyBlekNhbnZhcyBmcm9tICcuL0NhbnZhcy9jYW52YXMnXG5pbXBvcnQgKiBhcyBlelRpbWUgZnJvbSAnLi9UaW1lL3RpbWUnXG5pbXBvcnQgeyBjYW52YXNTdHlsZSB9IGZyb20gJy4vQ2FudmFzL2NhbnZhcydcbmltcG9ydCAqIGFzIGV6SnVkZ2UgZnJvbSAnLi9KdWRnZS9qdWRnZSdcbmltcG9ydCB7IEVsZW1lbnRzIH0gZnJvbSAnLi9FbGVtZW50J1xuaW1wb3J0IHsgR3JvdXAgfSBmcm9tICcuL0dyb3VwL2dyb3VwJ1xuaW1wb3J0IHsgU3RvcmFnZSB9IGZyb20gJy4vU3RvcmFnZS9zdG9yYWdlJ1xuaW1wb3J0IHsgVGV4dExpbmUsVGV4dHMgfSBmcm9tICcuL0dyYXBoaWMvdGV4dCdcbi8vIGltcG9ydCB7IEdyYXRPcHRzLHNpbkdyYXQgfSBmcm9tICcuL0dyYXBoaWMvc2luR3JhdCdcblxuXG5cbi8vIGV4cG9ydCB7IEFkam9pblJlY3QsUmVjdENlbnRlciB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgKiBmcm9tICcuL0RhdGFUeXBlL2RhdGFUeXBlJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9jaXJjbGUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvbGluZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9hcmMnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9wb2x5Z29uJ1xuZXhwb3J0ICogZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG4vLyBleHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvaW1hZ2VDVidcbmV4cG9ydCAqIGZyb20gJy4vVGltZS90aW1lJ1xuZXhwb3J0ICogZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzcydcbi8vIGV4cG9ydCAqIGZyb20gJy4vRGlhbG9ndWUvZGlhbG9ndWUnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvZ3JhdGluZydcbmV4cG9ydCAqIGZyb20gJy4vR3JhcGhpYy9zaW5HcmF0J1xuZXhwb3J0ICogZnJvbSAnLi9UaW1lL3RpbWVQZXJmb3JtYW5jZSdcbmV4cG9ydCAqIGZyb20gJy4vS2V5cHJlc3Mva2V5cHJlc3MwJ1xuZXhwb3J0ICogZnJvbSAnLi9EaWFsb2d1ZS9kaWFsb2d1ZTAnXG5leHBvcnQgKiBmcm9tICcuL0dyYXBoaWMvc2luR3JhdGluZydcbmV4cG9ydCB7IFJlY3RhbmdsZSB9IGZyb20gJy4vR3JhcGhpYy9yZWN0YW5nbGUnXG5leHBvcnQgeyBHcm91cCB9IGZyb20gJy4vR3JvdXAvZ3JvdXAnXG5leHBvcnQgeyBDaXJjbGUgfSBmcm9tICcuL0dyYXBoaWMvY2lyY2xlJ1xuZXhwb3J0IHsgTGluZSB9IGZyb20gJy4vR3JhcGhpYy9saW5lJ1xuZXhwb3J0IHsgQXJjIH0gZnJvbSAnLi9HcmFwaGljL2FyYydcbmV4cG9ydCB7IEVsbGlwc2UgfSBmcm9tICcuL0dyYXBoaWMvZWxsaXBzZSdcbmV4cG9ydCB7IFBvbHlnb24gfSBmcm9tICcuL0dyYXBoaWMvcG9seWdvbidcbmV4cG9ydCB7IFRleHRzIH0gZnJvbSAnLi9HcmFwaGljL3RleHQnXG5leHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2UnXG4vLyBleHBvcnQgeyBJbWcgfSBmcm9tICcuL0dyYXBoaWMvaW1hZ2VDVidcbmV4cG9ydCB7IEtleXByZXNzIH0gZnJvbSAnLi9LZXlwcmVzcy9rZXlwcmVzczAnXG4vLyBleHBvcnQgeyBUaW1lIH0gZnJvbSAnLi9UaW1lL3RpbWUnXG4vLyBleHBvcnQgeyBEaWFsb2d1ZV8wfSBmcm9tICcuL0RpYWxvZ3VlL2RpYWxvZ3VlJ1xuZXhwb3J0IHsgc2luR3JhdGluZyB9IGZyb20gJy4vR3JhcGhpYy9zaW5HcmF0aW5nJ1xuZXhwb3J0IHsgR3JhdCB9IGZyb20gJy4vR3JhcGhpYy9ncmF0aW5nJ1xuZXhwb3J0IHsgVGltZSB9IGZyb20gJy4vVGltZS90aW1lUGVyZm9ybWFuY2UnXG5leHBvcnQgeyBSYW5kb21Eb3QgfSBmcm9tICcuL0dyYXBoaWMvcmFuZG9tRG90J1xuXG4vLyBleHBvcnQgeyBhbmltYXRlIH0gZnJvbSAnLi9BbmltYXRlL2FuaW1hdGUnXG4vLyBleHBvcnQgeyBtYWtlUmVjdGFuZ2xlIH0gZnJvbSAnLi9HcmFwaGljL3JlY3RhbmdsZSdcbiBcbi8vIGxldCBFenBzeUxpc3QgPSBuZXcgQXJyYXkoKTtcblxuY2xhc3MgRXpwc3kge1xuICAgIHJlYWRvbmx5IGlkOiBudW1iZXJcbiAgICBkb206IEhUTUxFbGVtZW50XG4gICAgcmVhZG9ubHkgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkRcbiAgICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2VcbiAgICBjU3R5bGU/OiBjYW52YXNTdHlsZVxuXG4gICAgLy8gUmVjdGFuZ2xlOiBSZWN0YW5nbGVcblxuICAgIGNvbnN0cnVjdG9yKGlkOiBudW1iZXIsZG9tOiBIVE1MRWxlbWVudCxjU3R5bGU/OiBjYW52YXNTdHlsZSl7XG4gICAgICAgIHRoaXMuaWQgPSBpZDtcbiAgICAgICAgdGhpcy5kb20gPSBkb207XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IG5ldyBTdG9yYWdlKClcbiAgICAgICAgY1N0eWxlID0gZXpKdWRnZS5qdWRnZUNhbnZhc1N0eWxlKGNTdHlsZSk7XG4gICAgICAgIHRoaXMuY1N0eWxlID0gY1N0eWxlO1xuICAgICAgICB0aGlzLmN0eCA9IGV6Q2FudmFzLmNyZWF0ZUNhbnZhcyhkb20sY1N0eWxlKTsgICAgLy/mraTlpITliJvlu7pjYW52YXPvvIzlj6/ku4XliJvlu7rkuIDkuKpjYW52YXPvvIzkvYbmmK/nm67liY3ml6Dms5Xku4XmuIXpmaTkuIDkuKrlm77lvaJcbiAgICAgICAgXG4gICAgfVxuXG4gICAgc2V0Q2FudmFzU3R5bGUoY1N0eWxlOiBjYW52YXNTdHlsZSl7XG4gICAgICAgIC8vIGZvcihsZXQgaSA9IDA7aSA8IHRoaXMuY3R4TGlzdC5sZW5ndGg7aSsrKXtcbiAgICAgICAgLy8gICAgIGxldCBjID0gdGhpcy5jdHhMaXN0W2ldLmNhbnZhcztcbiAgICAgICAgLy8gICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGhcbiAgICAgICAgLy8gICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodFxuICAgICAgICAvLyB9XG4gICAgICAgIC8vIGxldCBlbCA9IHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3RcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGxldCBjdHggPSB0aGlzLmN0eFxuICAgICAgICBjU3R5bGUgPSBlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUoY1N0eWxlKTtcbiAgICAgICAgYy53aWR0aCA9IGNTdHlsZS53aWR0aDtcbiAgICAgICAgYy5oZWlnaHQgPSBjU3R5bGUuaGVpZ2h0O1xuICAgICAgICBsZXQgdyA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICAgIGxldCBoID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHcpXG4gICAgICAgIGMuc3R5bGUudG9wID0gKChoLWNTdHlsZS5oZWlnaHQpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIGMuc3R5bGUubGVmdCA9ICgody1jU3R5bGUud2lkdGgpLzIpLnRvU3RyaW5nKCkgKyAncHgnXG4gICAgICAgIHRoaXMuY1N0eWxlID0ge1xuICAgICAgICAgICAgd2lkdGg6IGNTdHlsZS53aWR0aCxcbiAgICAgICAgICAgIGhlaWdodDogY1N0eWxlLmhlaWdodFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTtcbiAgICB9XG5cbiAgICByZWZyZXNoKCl7XG4gICAgICAgIC8vIGNvbnNvbGUuZGlyKHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QpXG4gICAgICAgIC8vIHRoaXMuc3RvcmFnZS5FbGVtZW50c0xpc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGMud2lkdGggPSB0aGlzLmNTdHlsZS53aWR0aFxuICAgICAgICBjLmhlaWdodCA9IHRoaXMuY1N0eWxlLmhlaWdodFxuICAgICAgICB0aGlzLnN0b3JhZ2UucmVEcmF3KHRoaXMuY3R4KVxuICAgIH1cblxuICAgIC8vIHNldEFuaW1hdGVDYW52YXNTdHlsZShjU3R5bGU6IGNhbnZhc1N0eWxlKXtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMTtpIDwgdGhpcy5jdHhMaXN0Lmxlbmd0aDtpKyspXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICAgIGxldCBjID0gdGhpcy5jdHhMaXN0W2ldLmNhbnZhcztcbiAgICAvLyAgICAgICAgIGMud2lkdGggPSBjU3R5bGUud2lkdGhcbiAgICAvLyAgICAgICAgIGMuaGVpZ2h0ID0gY1N0eWxlLmhlaWdodFxuICAgIC8vICAgICB9XG4gICAgLy8gfVxuXG4gICAgYWRkKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdfEdyb3VwKXtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4XG4gICAgICAgIGxldCBzdCA9IHRoaXMuc3RvcmFnZVxuICAgICAgICBsZXQgbmFtZSA9IHN0LmdldEVsZW1lbnRzTmFtZShlbClcbiAgICAgICAgbGV0IGluZGV4ID0gc3Quc2VhcmNoRWxlbWVudHNOYW1lKG5hbWUpXG4gICAgICAgIFxuICAgICAgICBpZihlbCBpbnN0YW5jZW9mIEVsZW1lbnRzfHxlbCBpbnN0YW5jZW9mIEdyb3VwKVxuICAgICAgICB7XG4gICAgICAgICAgICBpZihpbmRleCAhPT0gLTEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgICAgICAgICB0aGlzLmFkZChlbClcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2goKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UucHVzaChlbClcbiAgICAgICAgICAgICAgICBlbC5jdHggPSBjdHg7XG4gICAgICAgICAgICAgICAgZWwuc3RvcmFnZSA9IHRoaXMuc3RvcmFnZVxuICAgICAgICAgICAgICAgIGV6SnVkZ2UuanVkZ2VFbGVtZW50KGVsLGN0eClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBlbC5sZW5ndGg7aSsrKVxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGxldCBlID0gZWxbaV1cbiAgICAgICAgICAgICAgICB0aGlzLmFkZChlKVxuICAgICAgICAgICAgICAgIC8vIGVsW2ldLmN0eCA9IGN0eFxuICAgICAgICAgICAgICAgIC8vIGVsW2ldLnN0b3JhZ2UgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgICAgICAgICAvLyBlekp1ZGdlLmp1ZGdlRWxlbWVudChlbFtpXSxjdHgpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW1vdmUoZWw6IEVsZW1lbnRzfEVsZW1lbnRzW118R3JvdXApXG4gICAge1xuICAgICAgICBsZXQgY3R4ID0gdGhpcy5jdHhcbiAgICAgICAgbGV0IGMgID0gY3R4LmNhbnZhc1xuICAgICAgICBjLndpZHRoID0gdGhpcy5jU3R5bGUud2lkdGhcbiAgICAgICAgYy5oZWlnaHQgPSB0aGlzLmNTdHlsZS5oZWlnaHRcbiAgICAgICAgdGhpcy5zdG9yYWdlLnJlbW92ZShlbCk7XG4gICAgICAgIHRoaXMuc3RvcmFnZS5yZURyYXcoY3R4KTsgICBcbiAgICB9XG5cbiAgICAvLyBhbGlhc2luZyhzdHlsZTogc3RyaW5nKXtcbiAgICAvLyAgICAgdGhpcy5jdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gc3R5bGVcbiAgICAvLyB9XG5cbiAgICBhbmltYXRlKGVsOiBFbGVtZW50c3xFbGVtZW50c1tdLGZ1bmM6IEZ1bmN0aW9uLGRlbGF5OiBudW1iZXIpe1xuXG4gICAgICAgIGlmKGVsIGluc3RhbmNlb2YgQXJyYXkpXG4gICAgICAgIHtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7aSA8IGVsLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIGVsW2ldLklzQW5pbWF0aW9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlbFtpXS5Jc1BhdXNlID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBlbC5Jc0FuaW1hdGlvbiA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBlbC5jdHggPSB0aGlzLmN0eDtcbiAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuICAgICAgICAvLyBlbC5yZW1vdmUoKTtcbiAgICAgICAgbGV0IGN0eCA9IHRoaXMuY3R4O1xuXG4gICAgICAgIGxldCBwYXVzZSA9IGZhbHNlO1xuICAgICAgICAvLyBsZXQgY3R4ID0gZXpDYW52YXMuY3JlYXRlQ2FudmFzKHRoaXMuZG9tLHRoaXMuY1N0eWxlKTsgXG4gICAgICAgIC8vIHRoaXMuY3R4TGlzdC5wdXNoKGN0eCk7XG5cbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdoaWxlKCg8RWxlbWVudHM+ZWwpLklzQW5pbWF0aW9uIHx8ICg8QXJyYXk8RWxlbWVudHM+PmVsKVswXS5Jc0FuaW1hdGlvbil7XG4gICAgICAgICAgICAgICAgaWYoZWwgaW5zdGFuY2VvZiBFbGVtZW50cylcbiAgICAgICAgICAgICAgICAgICAgcGF1c2UgPSBlbC5Jc1BhdXNlXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBwYXVzZSA9IGVsWzBdLklzUGF1c2VcbiAgICAgICAgICAgICAgICBpZihwYXVzZSlcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZGlyKFwiVGhlIGFuaW1hdGlvbiBoYXMgcGF1c2VkICFcIik7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGV6VGltZS5kZWxheV9mcmFtZShkZWxheSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGZ1bmMoKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKGRlbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhhdC5yZW1vdmUoZWwpXG4gICAgICAgICAgICAgICAgICAgIHRoYXQuYWRkKGVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKClcbiAgICAgICAgXG5cbiAgICAgICAgLy8gd2luZG93LnNldEludGVydmFsKCgpPT57XG4gICAgICAgIC8vICAgICAvLyBsZXQgYSA9IHBlcmZvcm1hbmNlLm5vdygpXG4gICAgICAgIC8vICAgICBmdW5jKCk7XG4gICAgICAgIC8vICAgICAvLyBlelRpbWUuV2FpdFNlY3MwKGRlbGF5LzIpXG4gICAgICAgIC8vICAgICBlelRpbWVyLnNsZWVwKGRlbGF5KS50aGVuKCgpPT57XG4gICAgICAgIC8vICAgICAgICAgZWwucmVtb3ZlKClcbiAgICAgICAgLy8gICAgICAgICB0aGF0LmFkZChlbCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gY29uc29sZS5kaXIocGVyZm9ybWFuY2Uubm93KCkgLSBhIC0gMTAwKVxuICAgICAgICAvLyAgICAgfSlcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB9LDApXG5cblxuICAgICAgICAvLyAoYXN5bmMgZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gICAgIGZvcihsZXQgaSA9IDA7aSA8IDEwO2krKylcbiAgICAgICAgLy8gICAgIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgLy8gICAgICAgICBhd2FpdCBmdW5jKCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAvLyAgICAgICAgIGF3YWl0IGV6VGltZXIuc2xlZXAoZGVsYXkpXG4gICAgICAgIC8vICAgICAgICAgYXdhaXQgZWwucmVtb3ZlKClcbiAgICAgICAgLy8gICAgICAgICBhd2FpdCB0aGF0LmFkZChlbCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gdGhhdC5zdG9yYWdlLnB1c2goZWwpXG4gICAgICAgIC8vICAgICAgICAgLy8gdGhhdC5zdG9yYWdlLnJlRHJhdyhjdHgpXG4gICAgICAgIC8vICAgICAgICAgLy8gZXpKdWRnZS5qdWRnZUFuaW1hdGUoZWwsY3R4KTtcbiAgICAgICAgLy8gICAgICAgICAvLyBhd2FpdCB0aGF0LnN0b3JhZ2UucmVEcmF3KGN0eCk7XG4gICAgICAgIC8vICAgICAgICAgLy8gYXdhaXQgZXpUaW1lLldhaXRTZWNzMChkZWxheS8yKVxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyB9KSgpXG4gICAgfVxuXG4gICAgLy8gc2luR3JhdFBsYXkob3B0czogR3JhdE9wdHMpe1xuICAgIC8vICAgICBsZXQgc2luR3JhdExpc3QgPSBuZXcgQXJyYXkoKTtcbiAgICAvLyAgICAgbGV0IHNoID0gb3B0cy5zaGFwZTtcbiAgICAvLyAgICAgZm9yKGxldCBpID0gMDtpIDwgTWF0aC5mbG9vcig2MCpzaC5jeWNsZSk7aSsrKVxuICAgIC8vICAgICB7XG4gICAgICAgICAgICBcbiAgICAvLyAgICAgICAgIGxldCBzaW5ncmF0ID0gbmV3IHNpbkdyYXQoe1xuICAgIC8vICAgICAgICAgICAgIHNoYXBlOiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHg6IHNoLngsXG4gICAgLy8gICAgICAgICAgICAgICAgIHk6IHNoLnksXG4gICAgLy8gICAgICAgICAgICAgICAgIHI6IHNoLnIsXG4gICAgLy8gICAgICAgICAgICAgICAgIHBpeGVsc1BlckRlZ3JlZTogc2gucGl4ZWxzUGVyRGVncmVlLCBcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BhdGlhbEZyZXF1ZW5jeTogc2guc3BhdGlhbEZyZXF1ZW5jeSxcbiAgICAvLyAgICAgICAgICAgICAgICAgYW5nbGU6IHNoLmFuZ2xlLCBcbiAgICAvLyAgICAgICAgICAgICAgICAgY29udHJhc3Q6IHNoLmNvbnRyYXN0LCBcbiAgICAvLyAgICAgICAgICAgICAgICAgcGhhc2U6IHNoLnBoYXNlICsgMippKk1hdGguUEkvNjAsXG4gICAgLy8gICAgICAgICAgICAgICAgIGN5Y2xlOiBzaC5jeWNsZSxcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BlZWQ6IHNoLnNwZWVkXG4gICAgLy8gICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgfSk7XG4gICAgLy8gICAgICAgICBzaW5HcmF0TGlzdC5wdXNoKHNpbmdyYXQpO1xuICAgIC8vICAgICB9XG4gICAgLy8gICAgIGNvbnNvbGUuZGlyKHNpbkdyYXRMaXN0KTtcbiAgICAvLyAgICAgKGFzeW5jICgpPT57XG4gICAgLy8gICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzaW5HcmF0TGlzdC5sZW5ndGg7aSs9c2guc3BlZWQpXG4gICAgLy8gICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgdGhpcy5hZGQoc2luR3JhdExpc3RbaV0pXG4gICAgLy8gICAgICAgICAgICAgYXdhaXQgZXpUaW1lLmRlbGF5X2ZyYW1lKDEpO1xuICAgIC8vICAgICAgICAgICAgIGlmKGkhPT1zaW5HcmF0TGlzdC5sZW5ndGgtc2guc3BlZWQpXG4gICAgLy8gICAgICAgICAgICAgICAgIHNpbkdyYXRMaXN0W2ldLnJlbW92ZSgpO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9KSgpXG4gICAgLy8gfVxuXG4gICAgc2V0VGV4dExpbmUodGV4dExpbmU6IFRleHRMaW5lKVxuICAgIHtcbiAgICAgICAgbGV0IGMgPSB0aGlzLmN0eC5jYW52YXM7XG4gICAgICAgIGMud2lkdGggPSB0aGlzLmNTdHlsZS53aWR0aFxuICAgICAgICBjLmhlaWdodCA9IHRoaXMuY1N0eWxlLmhlaWdodFxuICAgICAgICBsZXQgc3QgPSB0aGlzLnN0b3JhZ2VcbiAgICAgICAgc3QudGV4dExpbmUgPSB0ZXh0TGluZVxuICAgICAgICBpZih0ZXh0TGluZSlcbiAgICAgICAge1xuICAgICAgICAgICAgaWYodGV4dExpbmUudGV4dEEpXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50ZXh0TGluZS50ZXh0QSA9IHRleHRMaW5lLnRleHRBXG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDtpIDwgc3QuRWxlbWVudHNMaXN0Lmxlbmd0aDtpKyspXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZihzdC5FbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBUZXh0cylcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0LkVsZW1lbnRzTGlzdFtpXS50ZXh0TGluZS50ZXh0QSA9IHRleHRMaW5lLnRleHRBXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoc3QuRWxlbWVudHNMaXN0W2ldIGluc3RhbmNlb2YgR3JvdXApXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgdCA9IDA7dCA8ICg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3QubGVuZ3RoO3QrKylcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZigoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdIGluc3RhbmNlb2YgVGV4dHMpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoPEdyb3VwPnN0LkVsZW1lbnRzTGlzdFtpXSkuZ3JvdXBMaXN0W3RdLnRleHRMaW5lLnRleHRBID0gdGV4dExpbmUudGV4dEFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZih0ZXh0TGluZS50ZXh0QilcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRleHRMaW5lLnRleHRCID0gdGV4dExpbmUudGV4dEJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwO2kgPCBzdC5FbGVtZW50c0xpc3QubGVuZ3RoO2krKylcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHN0LkVsZW1lbnRzTGlzdFtpXSBpbnN0YW5jZW9mIFRleHRzKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3QuRWxlbWVudHNMaXN0W2ldLnRleHRMaW5lLnRleHRCID0gdGV4dExpbmUudGV4dEJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihzdC5FbGVtZW50c0xpc3RbaV0gaW5zdGFuY2VvZiBHcm91cClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGxldCB0ID0gMDt0IDwgKDxHcm91cD5zdC5FbGVtZW50c0xpc3RbaV0pLmdyb3VwTGlzdC5sZW5ndGg7dCsrKVxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3RbdF0gaW5zdGFuY2VvZiBUZXh0cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICg8R3JvdXA+c3QuRWxlbWVudHNMaXN0W2ldKS5ncm91cExpc3RbdF0udGV4dExpbmUudGV4dEIgPSB0ZXh0TGluZS50ZXh0QlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdC5yZURyYXcodGhpcy5jdHgpO1xuICAgIH1cblxuICAgIGNsZWFyKCl7XG4gICAgICAgIC8vIGxldCB0aGF0ID0gdGhpcztcbiAgICAgICAgLy8gdGhpcy5zdG9yYWdlLkVsZW1lbnRzTGlzdCA9IG5ldyBBcnJheSgpO1xuICAgICAgICAvLyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSxyZWplY3Qpe1xuICAgICAgICAvLyAgICAgbGV0IGNoaWxkID0gdGhhdC5kb20ubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgICAvLyAgICAgd2hpbGUoY2hpbGQpe1xuICAgICAgICAvLyAgICAgICAgIHRoYXQuZG9tLnJlbW92ZUNoaWxkKGNoaWxkKVxuICAgICAgICAvLyAgICAgICAgIGNoaWxkID0gdGhhdC5kb20ubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgICAvLyAgICAgfVxuICAgICAgICAvLyAgICAgcmVzb2x2ZSgwKVxuICAgICAgICAvLyB9KVxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBuZXcgU3RvcmFnZSgpO1xuICAgICAgICBsZXQgYyA9IHRoaXMuY3R4LmNhbnZhcztcbiAgICAgICAgYy53aWR0aCA9IHRoaXMuY1N0eWxlLndpZHRoXG4gICAgICAgIGMuaGVpZ2h0ID0gdGhpcy5jU3R5bGUuaGVpZ2h0XG4gICAgfVxuXG59XG5cbi8vIGV4cG9ydCBmdW5jdGlvbiBwdXNoRXpwc3lMaXN0KGV6OiBFenBzeSl7XG4vLyAgICAgbGV0IG51bSA9IGV6LmlkO1xuLy8gICAgIEV6cHN5TGlzdFtudW1dID0gZXo7XG4vLyB9XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KGRvbTogSFRNTEVsZW1lbnQsY1N0eWxlPzogY2FudmFzU3R5bGUpIHtcbiAgICBsZXQgZXogPSBuZXcgRXpwc3koZXpVdGlscy5Db3VudCgpLGRvbSxjU3R5bGUpO1xuICAgIC8vIHB1c2hFenBzeUxpc3QoZXopO1xuICAgIC8vIGNvbnNvbGUuZGlyKEV6cHN5TGlzdCk7XG4gICAgcmV0dXJuIGV6O1xufSJdLCJuYW1lcyI6WyJlekp1ZGdlLmp1ZGdlQ2FudmFzU3R5bGUiLCJlekp1ZGdlLmp1ZGdlRWxlbWVudCIsImV6VGltZS5kZWxheV9mcmFtZSIsIm5hbWVJZCIsImV6SnVkZ2UuanVkZ2VUUlMiLCJ3YXNtIiwiY2FjaGVnZXRJbnQzMk1lbW9yeTAiLCJnZXRJbnQzMk1lbW9yeTAiLCJidWZmZXIiLCJtZW1vcnkiLCJJbnQzMkFycmF5IiwiY2FjaGVnZXRVaW50OE1lbW9yeTAiLCJnZXRVaW50OE1lbW9yeTAiLCJVaW50OEFycmF5IiwiZ2V0QXJyYXlVOEZyb21XYXNtMCIsInB0ciIsImxlbiIsInN1YmFycmF5IiwicHJlX3NpbmdyYXQiLCJyYWRpdXMiLCJwaXhlbHNfcGVyX2RlZ3JlZSIsInNwYXRpYWxfZnJlcXVlbmN5IiwiYW5nbGUiLCJjb250cmFzdCIsInBoYXNlIiwiZ2FtbWEiLCJyZXRwdHIiLCJfX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyIiwicjAiLCJyMSIsInYwIiwic2xpY2UiLCJfX3diaW5kZ2VuX2ZyZWUiLCJwcmVfbm9pc2Vfc2luZ3JhdCIsImxldmVsIiwibG9hZCIsIm1vZHVsZSIsImltcG9ydHMiLCJSZXNwb25zZSIsIldlYkFzc2VtYmx5IiwiaW5zdGFudGlhdGVTdHJlYW1pbmciLCJlIiwiaGVhZGVycyIsImdldCIsImNvbnNvbGUiLCJ3YXJuIiwiYnl0ZXMiLCJhcnJheUJ1ZmZlciIsImluc3RhbnRpYXRlIiwiaW5zdGFuY2UiLCJJbnN0YW5jZSIsImluaXQiLCJpbnB1dCIsIlVSTCIsImltcG9ydCIsIm1ldGEiLCJ1cmwiLCJSZXF1ZXN0IiwiZmV0Y2giLCJleHBvcnRzIiwiX193YmluZGdlbl93YXNtX21vZHVsZSIsIlNHLmRlZmF1bHQiLCJTRy5wcmVfbm9pc2Vfc2luZ3JhdCIsIlNHLnByZV9zaW5ncmF0IiwiVElNRS5kZWxheV9mcmFtZSIsImV6U2luR3JhdC5zaW5HcmF0IiwiZ2V0UHJvZ3Jlc3NTdGVwcyIsImlzVmlzaWJsZSIsImdldElucHV0IiwicmVzZXRWYWxpZGF0aW9uTWVzc2FnZSIsImRvbS5nZXRBY3Rpb25zIiwiZG9tLmdldExvYWRlciIsImRvbS5oaWRlIiwiZG9tLnNob3ciLCJkb20uYXBwbHlDdXN0b21DbGFzcyIsImRvbS5zZXRJbm5lckh0bWwiLCJkb20uZ2V0Q29uZmlybUJ1dHRvbiIsImRvbS5nZXREZW55QnV0dG9uIiwiZG9tLmdldENhbmNlbEJ1dHRvbiIsImRvbS5yZW1vdmVDbGFzcyIsImRvbS5hZGRDbGFzcyIsImRvbS50b2dnbGUiLCJkb20uZ2V0Q29udGFpbmVyIiwiZG9tLmdldFBvcHVwIiwiZG9tLmdldERpcmVjdENoaWxkQnlDbGFzcyIsImRvbS5mb2N1c0lucHV0IiwiZG9tLmdldElucHV0IiwiZG9tLmdldEh0bWxDb250YWluZXIiLCJkb20ucGFyc2VIdG1sVG9Db250YWluZXIiLCJkb20uZ2V0Rm9vdGVyIiwiZG9tLmdldENsb3NlQnV0dG9uIiwiZG9tLmdldEljb24iLCJkb20uc2V0U3R5bGUiLCJkb20uZ2V0SW1hZ2UiLCJkb20uYXBwbHlOdW1lcmljYWxTdHlsZSIsImRvbS5nZXRQcm9ncmVzc1N0ZXBzIiwiZG9tLmdldFRpdGxlIiwiZG9tLmdldFZhbGlkYXRpb25NZXNzYWdlIiwiYWRkQ2xhc3NlcyIsImRvbS5pc1Zpc2libGUiLCJkb20uaW5pdCIsImRvbS5zdGF0ZXMiLCJkb20ubWVhc3VyZVNjcm9sbGJhciIsImRvbS5oYXNDbGFzcyIsImRvbS5pc1Njcm9sbGFibGUiLCJkb20uaXNNb2RhbCIsImRvbS5pc1RvYXN0IiwiZG9tLmFuaW1hdGlvbkVuZEV2ZW50IiwiZG9tLmhhc0Nzc0FuaW1hdGlvbiIsImRvbS5hbGxCdXR0b25zQXJlSGlkZGVuIiwiZG9tVXRpbHMuaXNWaXNpYmxlIiwiZG9tLmdldEZvY3VzYWJsZUVsZW1lbnRzIiwiZG9tLnJlbmRlciIsInRoaXMiLCJkb20uZ2V0VGltZXJQcm9ncmVzc0JhciIsImRvbS5hbmltYXRlVGltZXJQcm9ncmVzc0JhciIsImV6Q2FudmFzLmNyZWF0ZUNhbnZhcyIsImV6VXRpbHMuQ291bnQiXSwibWFwcGluZ3MiOiJBQUNBLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztTQUVBLEtBQUs7SUFDakIsT0FBTyxPQUFPLEVBQUUsQ0FBQztBQUNyQjs7U0NFZ0IsWUFBWSxDQUFDLEdBQWdCLEVBQUMsTUFBb0I7SUFDOUQsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTs7Ozs7SUFLeEMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBQzdCLENBQUMsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUN2QixDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtJQUN6QixJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsV0FBVyxDQUFBOztJQUUxQixDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtJQUNyRCxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUUsQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLElBQUksQ0FBQTtJQUNyRCxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdCLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDZCxPQUFPLEdBQUcsQ0FBQztBQUNmOztBQ3ZCQSxNQUFNLElBQUk7SUFDTixJQUFJLENBQVE7SUFDWixPQUFPLENBQVE7SUFDZixPQUFPLENBQVE7SUFDZixZQUFZLENBQVE7SUFDcEI7UUFDSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFBO0tBQzdDO0NBQ0o7TUFFWSxLQUFLO0lBQ2QsU0FBUyxDQUFNO0lBQ2YsV0FBVyxDQUFhO0lBQ3hCLFNBQVMsQ0FBYTtJQUN0QixJQUFJLENBQVE7SUFDWixTQUFTLENBQWU7SUFDeEI7UUFDSSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNkLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQTtRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQTtRQUNyQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDckMsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7UUFDbkIsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUE7S0FDdEI7SUFDRCxLQUFLO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFBO0tBQzlCO0lBQ0QsTUFBTTtRQUNGLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUE7UUFDbEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDeEIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0tBQ2Q7Q0FDSjtBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7U0FFZ0IsU0FBUyxDQUFDLEtBQWEsRUFBQyxPQUFhO0lBQ2pELE9BQU8sSUFBSSxPQUFPLENBQUMsVUFBUyxPQUFPLEVBQUMsTUFBTTtRQUN0QyxVQUFVLENBQUM7O1lBRVAsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2QsRUFBRSxLQUFLLENBQUMsQ0FBQztLQUNiLENBQUMsQ0FBQTtBQUNOLENBQUM7U0FFZSxXQUFXLENBQUMsSUFBSTtJQUM1QixJQUFJLFFBQVEsR0FBQyxDQUFDLENBQUM7SUFDZixPQUFPLElBQUksT0FBTyxDQUFDLFVBQVUsT0FBTyxFQUFFLE1BQU07UUFDeEMsQ0FBQyxTQUFTLEdBQUc7WUFDVCxRQUFRLEVBQUUsQ0FBQztZQUNYLElBQUksRUFBRSxHQUFFLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxJQUFJLFFBQVEsR0FBQyxJQUFJLEVBQUM7Z0JBQ2QsTUFBTSxDQUFDLG9CQUFvQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUNoQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDZDtTQUNKLEVBQUUsRUFBQztLQUNILENBQUMsQ0FBQTtBQUNOOztNQ3RHYSxRQUFRO0lBQ1IsSUFBSSxDQUFZO0lBQ3pCLEtBQUssQ0FBUTtJQUNiLEtBQUssQ0FBUTtJQUNiLFFBQVEsQ0FBVztJQUNuQixHQUFHLENBQTJCO0lBQzlCLE9BQU8sQ0FBVTtJQUNqQixLQUFLLENBQVE7SUFDYixTQUFTLENBQVk7SUFDckIsTUFBTSxDQUFTO0lBQ2YsV0FBVyxDQUFVO0lBQ3JCLE9BQU8sQ0FBVTtJQUNqQjtRQUNJLElBQUksQ0FBQyxTQUFTLEdBQUc7WUFDYixDQUFDLEVBQUUsQ0FBQztZQUNKLENBQUMsRUFBRSxDQUFDO1NBQ1AsQ0FBQTtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUc7WUFDVCxLQUFLLEVBQUUsQ0FBQztZQUNSLE1BQU0sRUFBRSxDQUFDO1NBQ1osQ0FBQTtRQUNELElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUE7UUFDeEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUE7S0FDdkI7SUFDRCxNQUFNO1FBQ0YsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDO0tBQzVCO0lBQ0QsUUFBUTtRQUNKLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQzs7Ozs7Ozs7UUFRekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO0tBQzdCO0lBQ0QsY0FBYyxDQUFDLE1BQW1CO1FBQzlCLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDO1FBQ3hCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFDbEIsTUFBTSxHQUFHQSxnQkFBd0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDdkIsQ0FBQyxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7UUFDekIsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTs7UUFFMUIsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsTUFBTSxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDckQsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBQyxNQUFNLENBQUMsS0FBSyxJQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDckQsSUFBSSxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ2RDLFlBQW9CLENBQUMsRUFBRSxFQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQy9CO0lBQ0QsTUFBTTtRQUVGLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUE7UUFFbEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBOztRQUVWLEdBQUcsQ0FBQyxTQUFTLEdBQUMsT0FBTyxDQUFBO1FBQ3JCLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckIsR0FBRyxDQUFDLHdCQUF3QixHQUFDLGdCQUFnQixDQUFDO1FBQzlDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7O1FBRXRCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNiLEdBQUcsQ0FBQyx3QkFBd0IsR0FBQyxhQUFhLENBQUE7UUFFMUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Ozs7O0tBVTVCO0lBRUQsT0FBTyxDQUFDLElBQWMsRUFBQyxLQUFhO1FBRWhDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFBOztRQUd2QixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7O1FBRWhCLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Ozs7UUFJbkIsQ0FBQzs7O1lBSUcsT0FBTSxJQUFJLENBQUMsV0FBVyxFQUFDOztnQkFFbkIsSUFBRyxJQUFJLENBQUMsT0FBTyxFQUFDO29CQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLENBQUMsQ0FBQztvQkFDMUMsTUFBTUMsV0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDbkM7cUJBQ0c7b0JBQ0EsSUFBSSxFQUFFLENBQUM7b0JBQ1AsTUFBTUEsV0FBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO29CQUNkLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDNUI7YUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQkosR0FBRyxDQUFBO0tBQ1A7OztBQ3hJTCxJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7TUFFSCxLQUFNLFNBQVEsUUFBUTtJQUN0QixJQUFJLEdBQWU7UUFDeEIsSUFBSSxFQUFFLE9BQU8sR0FBRyxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQ2xDLFNBQVMsRUFBRSxPQUFPO0tBQ3JCLENBQUE7SUFDRCxNQUFNLENBQVE7O0lBRWQsU0FBUyxDQUEwQjtJQUVuQyxZQUFZLEVBQTRCO1FBRXBDLEtBQUssRUFBRSxDQUFBO1FBRVAsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFBOztRQUVwQixJQUFHLEVBQUUsWUFBWSxLQUFLLEVBQ3RCO1lBQ0ksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUE7U0FDbEI7YUFDRztZQUNBLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUMzQjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXBCLE9BQU8sRUFBRSxDQUFBO0tBQ1o7OztBQ2RMLE1BQU0sTUFBTTtJQUNSLElBQUksQ0FBVztJQUNmLENBQUMsQ0FBUTtJQUNULENBQUMsQ0FBUTtJQUNULFlBQVksSUFBZTtRQUN2QixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztLQUNqRDtDQUNKO0FBRUQsTUFBTSxJQUFJO0lBQ04sSUFBSSxDQUFXO0lBQ2YsS0FBSyxDQUFRO0lBQ2IsTUFBTSxDQUFRO0lBQ2QsWUFBWSxJQUFlO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7UUFDN0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQTtLQUNsQztDQUNKO0FBRUQsTUFBTSxNQUFNO0lBQ1IsQ0FBQyxDQUFRO0lBQ1QsQ0FBQyxDQUFRO0lBQ1Q7S0FFQztDQUNKO01BRVksU0FBVSxTQUFRLEtBQUs7SUFDaEMsV0FBVyxDQUFXO0lBQ3RCLFlBQVksSUFBZSxFQUFDLEVBQWM7UUFDdEMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ1QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7S0FDM0I7Q0FDSjtBQUVELElBQUlDLFFBQU0sR0FBRyxDQUFDLENBQUM7QUFFZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7TUFFYSxTQUFVLFNBQVEsUUFBUTtJQUMxQixJQUFJLEdBQWU7UUFDeEIsSUFBSSxFQUFFLE1BQU0sR0FBR0EsUUFBTSxDQUFDLFFBQVEsRUFBRTtRQUNoQyxTQUFTLEVBQUVBLFFBQU07S0FDcEIsQ0FBQTtJQUNELFlBQVksSUFBbUI7UUFDM0IsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDO1FBQ3JCLElBQUcsSUFBSSxDQUFDLEtBQUssRUFDYjtZQUNJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztTQUMzQjthQUNHO1lBQ0EsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDVCxJQUFJLEVBQUUsTUFBTTtnQkFDWixNQUFNLEVBQUUsTUFBTTtnQkFDZCxTQUFTLEVBQUUsQ0FBQzthQUNmLENBQUE7U0FDSjtRQUVEQSxRQUFNLEVBQUUsQ0FBQTtLQUVYO0NBQ0o7QUFFRCxNQUFNLFNBQVUsU0FBUSxTQUFTO0lBQzdCLFlBQVksQ0FBWTtJQUN4QixZQUFZLENBQVk7SUFDeEIsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxFQUFDLEtBQUssRUFBQztnQkFDVCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsS0FBSztnQkFDWixNQUFNLEVBQUUsTUFBTTthQUNqQixFQUFDLENBQUMsQ0FBQTtRQUNILElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO1FBQ2hDLElBQUksQ0FBQyxZQUFZLEdBQUcsWUFBWSxDQUFBO0tBQ25DO0NBQ0o7QUFFRCxNQUFNLFFBQVMsU0FBUSxTQUFTO0lBQzVCLFlBQVksQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQWdDLEVBQUMsWUFBdUIsRUFBQyxZQUF1QjtRQUN6RyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLEtBQUssRUFBQyxNQUFNLENBQUMsRUFBQyxZQUFZLEVBQUMsWUFBWSxDQUFDLENBQUE7S0FDdEQ7Q0FDSjtBQUVELE1BQU0sU0FBVSxTQUFRLFNBQVM7SUFDN0IsWUFBWSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBZ0MsRUFBQyxZQUF1QixFQUFDLFlBQXVCO1FBQ3pHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsS0FBSyxFQUFDLE1BQU0sQ0FBQyxFQUFDLFlBQVksRUFBQyxZQUFZLENBQUMsQ0FBQTtLQUN0RDtDQUNKO0FBRUQ7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtTQUVnQixhQUFhLENBQUMsSUFBZSxFQUFDLEdBQTZCO0lBQ3ZFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7SUFDcEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ1YsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3ZDLFVBQVUsQ0FBQyxJQUFJLEVBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hCLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNiLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7U0FFZSxVQUFVLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsVUFBMEI7O0lBRXRGLElBQUksT0FBTyxDQUFDO0lBQ1osSUFBRyxDQUFDLFVBQVUsRUFDZDtRQUNJLFVBQVUsR0FBRyxVQUFVLENBQUE7S0FDMUI7SUFDRCxJQUFJLENBQUMsR0FBRyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7O0lBRXBDLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNQLE9BQU8sR0FBRyxTQUFTLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDOztLQUV2QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFBQztRQUNaLE9BQU8sR0FBRyxRQUFRLENBQUMsU0FBUyxFQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUFDO1FBQ1osT0FBTyxHQUFHLFVBQVUsQ0FBQyxTQUFTLEVBQUMsSUFBSSxDQUFDLENBQUM7S0FDeEM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQUM7UUFDWixPQUFPLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUMsQ0FBQztLQUN6QztTQUNHO1FBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFBO0tBQ3BEO0lBR0QsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNuRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNwRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQzVDLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUM7WUFDckUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsUUFBUSxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNsRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztBQUVELFNBQVMsV0FBVyxDQUFDLFNBQW9CLEVBQUMsSUFBZTtJQUNyRCxJQUFJLE9BQU8sR0FBRyxJQUFJLFNBQVMsQ0FBQztRQUN4QixLQUFLLEVBQUU7WUFDSCxDQUFDLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBRSxDQUFDO1lBQ25FLENBQUMsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU07WUFDN0MsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztZQUN2QixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNO1NBQzVCO0tBQ0osQ0FBQyxDQUFBO0lBQ0YsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFVBQVUsQ0FBQyxJQUFlOztJQUV0QyxJQUFJLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixPQUFPLE1BQU0sQ0FBQztBQUNsQixDQUFDO1NBRWUsU0FBUyxDQUFDLFNBQW9CLEVBQUMsSUFBZSxFQUFDLEtBQXFCLEVBQUMsS0FBcUI7O0lBRXRHLElBQUcsS0FBSyxLQUFLLFNBQVMsRUFBQztRQUNuQixLQUFLLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsS0FBSyxHQUFHLENBQUMsQ0FBQTtLQUNaO0lBQ0QsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUFDO1FBQ25CLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3BGO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsQ0FBQyxDQUFBO1FBQ3RFLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7U0FDRztRQUNBLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQzs7UUFFckMsSUFBSSxPQUFPLEdBQUcsSUFBSSxTQUFTLENBQUM7WUFDeEIsS0FBSyxFQUFDO2dCQUNGLENBQUMsRUFBRSxDQUFDO2dCQUNKLENBQUMsRUFBRSxDQUFDO2dCQUNKLEtBQUssRUFBRSxHQUFHO2dCQUNWLE1BQU0sRUFBRSxHQUFHO2FBQ2Q7U0FDSixDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLElBQUcsRUFBRSxLQUFLLENBQUMsRUFDWDtZQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQ25DO2dCQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN0QztpQkFDRztnQkFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbkMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsU0FBUyxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDdEM7U0FDSjthQUNJLElBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUM1QjtZQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsT0FBTyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQ0c7WUFDQSxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUN0Qzs7UUFHRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RCLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsT0FBTyxPQUFPLENBQUM7S0FDbEI7QUFHTCxDQUFDO0FBRUQsU0FBUyxPQUFPLENBQUMsU0FBb0IsRUFBQyxJQUFlLEVBQUMsQ0FBUztJQUMzRCxJQUFJLENBQUMsR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFBO0lBQ3BCLElBQUksTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDOztJQUVuQyxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ1Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO1FBQ25DLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLENBQUE7S0FDdkM7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUMsQ0FBQyxDQUFBO0tBQzNDO1NBQ0ksSUFBRyxDQUFDLEtBQUssQ0FBQyxFQUNmO1FBQ0ksQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQTtLQUM1QztTQUNJLElBQUcsQ0FBQyxLQUFLLENBQUMsRUFDZjtRQUNJLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUE7S0FDOUQ7U0FDSSxJQUFHLENBQUMsS0FBSyxDQUFDLEVBQ2Y7UUFDSSxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0tBQ2hFO1NBQ0c7UUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLDBDQUEwQyxDQUFDLENBQUE7S0FDMUQ7SUFDRCxPQUFPLENBQUMsQ0FBQTtBQUNaLENBQUM7U0FFZSxVQUFVLENBQUMsSUFBZSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBa0I7O0lBRTdELElBQUksT0FBTyxHQUFHLElBQUksU0FBUyxDQUFDO1FBQ3hCLEtBQUssRUFBRTtZQUNILENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7WUFDSixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07U0FDNUI7S0FDSixDQUFDLENBQUM7SUFFSCxPQUFPLE9BQU8sQ0FBQTtBQUNsQixDQUFDO1NBRWUsWUFBWSxDQUFDLENBQVMsRUFBQyxDQUFDLE9BQU8sRUFBQyxPQUFPLENBQWtCLEVBQUMsVUFBcUIsRUFBQyxLQUFjOztJQUUxRyxJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO0lBRXZCLElBQUksR0FBRyxHQUFHLE9BQU8sR0FBRyxPQUFPLENBQUE7SUFDM0IsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDMUIsSUFBSSxLQUFLLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFBO0lBQzVDLElBQUksTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQTs7SUFHOUMsSUFBRyxDQUFDLEdBQUcsR0FBRyxFQUFDO1FBQ1AsQ0FBQyxHQUFHLEdBQUcsQ0FBQTtLQUNWO0lBRUQsSUFBRyxLQUFLLEtBQUssU0FBUyxFQUN0QjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUM7S0FDYjtJQUVELElBQUcsS0FBSyxHQUFHLENBQUMsRUFDWjtRQUNJLEtBQUssR0FBRyxDQUFDLENBQUE7S0FDWjtJQUVELElBQUcsS0FBSyxLQUFLLENBQUMsRUFDZDtRQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO1lBQ0ksS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLE9BQU8sRUFBQyxDQUFDLEVBQUUsRUFDN0I7Z0JBQ0ksSUFBRyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsR0FBRyxDQUFDLEVBQ2xCO29CQUNJLElBQUksQ0FBQyxDQUFDLEdBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksU0FBUyxDQUFDO3dCQUM5QixLQUFLLEVBQUU7NEJBQ0gsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQzs0QkFDaEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQzs0QkFDakIsS0FBSyxFQUFFLEtBQUs7NEJBQ1osTUFBTSxFQUFFLE1BQU07eUJBQ2pCO3FCQUNKLENBQUMsQ0FBQTtpQkFDTDtxQkFDRztvQkFDQSxNQUFNO2lCQUNUO2FBRUo7U0FDSjtLQUNKO1NBRUQ7UUFDSSxLQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBQyxDQUFDLEdBQUcsT0FBTyxFQUFDLENBQUMsRUFBRSxFQUM3QjtZQUNJLEtBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLENBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQyxFQUFFLEVBQzdCO2dCQUNJLElBQUcsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUNsQjtvQkFDSSxJQUFJLENBQUMsQ0FBQyxHQUFDLE9BQU8sR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLFNBQVMsQ0FBQzt3QkFDOUIsS0FBSyxFQUFFOzRCQUNILENBQUMsRUFBRSxDQUFDLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFHLEtBQUssR0FBRyxDQUFDOzRCQUNqRCxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDOzRCQUNqQixLQUFLLEVBQUUsS0FBSzs0QkFDWixNQUFNLEVBQUUsTUFBTTt5QkFDakI7cUJBQ0osQ0FBQyxDQUFBO2lCQUNMO2FBQ0o7U0FDSjtLQUNKOztJQU1ELElBQUksU0FBUyxHQUFHLElBQUksU0FBUyxDQUFDLFVBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxPQUFPLFNBQVMsQ0FBQTtBQUNwQixDQUFDO1NBRWUsVUFBVSxDQUFDLFNBQW9CLEVBQUMsSUFBZTs7SUFFM0QsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLFNBQVMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVDLE9BQU8sT0FBTyxDQUFBO0FBQ2xCLENBQUM7U0FFZSxpQkFBaUIsQ0FBQyxJQUFlLEVBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFrQjtJQUNwRSxJQUFJLE9BQU8sR0FBRyxVQUFVLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDcEMsT0FBTyxPQUFPLENBQUE7QUFDbEIsQ0FBQztTQUVlLFNBQVMsQ0FBQyxJQUFlOztJQUVyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQTtJQUM1QixPQUFPLEtBQUssQ0FBQTtBQUNoQixDQUFDO1NBRWUsVUFBVSxDQUFDLElBQWU7O0lBRXRDLElBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFBO0lBQzlCLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUM7U0FFZSxRQUFRLENBQUMsSUFBZTs7SUFFcEMsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDekIsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUVBO0FBRUE7QUFFQTtBQUVBO1NBRWdCLFFBQVEsQ0FBQyxLQUFnQixFQUFDLEtBQWdCOztJQUV0RCxJQUFJLE9BQU8sRUFBQyxJQUFJLENBQUE7SUFDaEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUM7SUFDcEIsSUFBSSxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUE7SUFDWCxDQUFDLEdBQUcsRUFBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDdkYsQ0FBQyxHQUFHLEVBQUMsR0FBRyxFQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLElBQUcsUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLEVBQUMsS0FBSyxDQUFDLElBQUksUUFBUSxDQUFDLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsQ0FBQyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsRUFDdk87UUFDSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUMsR0FBRyxDQUFDLENBQUM7UUFDdEIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDMUIsQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxQixJQUFJLEdBQUcsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQTtLQUNuQjtTQUNHO1FBQ0EsSUFBSSxHQUFHLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUE7S0FDbkI7SUFFRCxPQUFPLEdBQUcsSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQztJQUV6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QUFDLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLEdBQUcsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFdkQsSUFBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUMsRUFBRSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFakIsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEdBQUc7WUFDcEMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ2hCLENBQUE7UUFFRCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFD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Q0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxHQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7UUFDM0MsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEdBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQztRQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBQyxDQUFDLENBQUMsR0FBQyxHQUFHLENBQUM7S0FDM0I7O0lBRUQsT0FBTyxTQUFTLENBQUM7QUFDckIsQ0FBQztBQUVEO0FBQ0E7QUFDQSxTQUFTLFFBQVEsQ0FBQyxNQUFNO0lBQ3BCLElBQUksS0FBSyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUE7SUFDdkIsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztJQUN2QixJQUFJLFFBQVEsR0FBRyxHQUFHLEdBQUcsTUFBTSxDQUFDO0lBQzVCLElBQUksU0FBUyxHQUFHLE1BQU0sR0FBRyxRQUFRLENBQUM7SUFDbEMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDakMsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxFQUFFLEVBQzlCO1FBQ0ksSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEdBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDMUIs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RSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDMUM7U0FDRzs7UUFFQSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMzRTtBQUNMLENBQUM7U0FFZSxvQkFBb0IsQ0FBQyxHQUFRLEVBQUMsR0FBNkI7SUFDdkUsSUFBSSxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQTtJQUNsQixJQUFHLEVBQUUsQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEtBQUssU0FBUyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUNwRzs7UUFFSSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDOUM7U0FDRzs7UUFFQSxHQUFHLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUMsRUFBRSxDQUFDLENBQUMsRUFBQyxFQUFFLENBQUMsQ0FBQyxFQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsRUFBQyxFQUFFLENBQUMsTUFBTSxFQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtLQUMvRTtBQUNMLENBQUM7U0FFZSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQWtCLEVBQUMsRUFBWTtJQUNoRSxJQUFHLEVBQUUsWUFBWSxTQUFTLEVBQUM7UUFDdkIsSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUMxRSxJQUFHLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFFLEVBQUUsR0FBQyxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxHQUFDLEVBQUUsRUFDL0M7WUFDSSxPQUFPLElBQUksQ0FBQztTQUNmO2FBRUQ7WUFDSSxPQUFPLEtBQUssQ0FBQztTQUNoQjtLQUNKO1NBQ0ksSUFBRyxFQUFFLFlBQVksTUFBTSxFQUM1QjtRQUNJLElBQUksQ0FBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuRCxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFDLEVBQUUsRUFBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN0RCxJQUFHLENBQUMsSUFBSSxFQUFFLEVBQ1Y7WUFDSSxPQUFPLElBQUksQ0FBQTtTQUNkO2FBQ0c7WUFDQSxPQUFPLEtBQUssQ0FBQTtTQUNmO0tBQ0o7U0FDSSxJQUFHLEVBQUUsWUFBWSxJQUFJLEVBQzFCO1FBQ0ksSUFBSSxDQUFDLEVBQUUsRUFBQyxFQUFFLEVBQUMsRUFBRSxFQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUMsRUFB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UTtJQUNaLEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsR0FBRztJQUNQLEVBQUUsRUFBRSxHQUFHO0lBQ1AsRUFBRSxFQUFFLEdBQUc7SUFDUCxFQUFFLEVBQUUsTUFBTTtJQUNWLEVBQUUsRUFBRSxNQUFNO0lBQ1YsRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsTUFBTTtJQUNWLEdBQUcsRUFBRSxNQUFNO0lBQ1gsR0FBRyxFQUFFLE1BQU07SUFDWCxHQUFHLEVBQUUsTUFB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
