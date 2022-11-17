var ezpsy = (function () {
    'use strict';

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
    let nameId$c = 0;
    // class TypeTest implements RectangleShape{
    //     x: number
    //     y: number
    //     width: number
    //     height: number
    // }
    class Rectangle extends Elements {
        name = {
            name: "rect" + nameId$c.toString(),
            graphicId: nameId$c
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
            nameId$c++;
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

    let nameId$b = 0;
    class Circle extends Elements {
        name = {
            name: "circle" + nameId$b.toString(),
            graphicId: nameId$b
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
            nameId$b++;
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

    let nameId$a = 0;
    class Line extends Elements {
        name = {
            name: "line" + nameId$a.toString(),
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

    let nameId$9 = 0;
    class Arc extends Elements {
        name = {
            name: "arc" + nameId$9.toString(),
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

    let nameId$8 = 0;
    class Ellipse extends Elements {
        name = {
            name: "ellipse" + nameId$8.toString(),
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

    let nameId$7 = 0;
    class Polygon extends Elements {
        name = {
            name: "polygon" + nameId$7.toString(),
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

    let nameId$6 = 0;
    class Texts extends Elements {
        name = {
            name: "text" + nameId$6.toString(),
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
            nameId$6++;
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

    let nameId$5 = 0;
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
            name: "img" + nameId$5.toString(),
            graphicId: nameId$5
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
            nameId$5++;
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

    let nameId$4 = 0;
    class Grat extends Elements {
        name = {
            name: "grat" + nameId$4.toString(),
            graphicId: nameId$4
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
            nameId$4++;
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
        input = new URL('singrat_bg.wasm', (document.currentScript && document.currentScript.src || new URL('ezpsy.js', document.baseURI).href));
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

    let nameId$3 = 0;
    class sinGrating extends Elements {
        name = {
            name: "singrating" + nameId$3.toString(),
            graphicId: nameId$3
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
            nameId$3++;
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

    let nameId$2 = 0;
    class RandomDot extends Elements {
        name = {
            name: "randomDot" + nameId$2.toString(),
            graphicId: nameId$2
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
            nameId$2++;
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

    let nameId$1 = 0;
    //光栅
    //pixelsPerDegree=57, spatialFrequency=1 对应一度视角
    class sinGrat extends Elements {
        name = {
            name: "singrat" + nameId$1.toString(),
            graphicId: nameId$1
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
            nameId$1++;
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
        let keypress = new Keypress(keyType);
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

    let nameId = 0;
    class Functions {
        name;
        constructor() {
            this.name = {
                name: "Funtion" + nameId.toString(),
                graphicId: nameId
            };
            nameId++;
        }
    }
    class RandomFunctions extends Functions {
        elements; //元素变量名
        constructor(options) {
            super();
            this.elements = options.els;
        }
        random() {
            return Math.floor(Math.random() * this.elements.length);
        }
        setttings(strArg) {
            let object = `switch(${strArg}){\n`;
            for (let i = 0; i < this.elements.length; i++) {
                object += `\tcase ${i}: \n\t\tez.add(${this.elements[i]});\n\t\tbreak;\n`;
            }
            object += `\tdefault:\n\t\tconsole.dir('error');\n}\n`;
            return object;
        }
        run() {
            let x = this.random();
            let code = this.setttings('x');
            console.dir(code);
            eval(code);
            // eval(this.setttings());
            return x;
        }
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
        RandomFunctions: RandomFunctions,
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

    return EZPSY;

})();
