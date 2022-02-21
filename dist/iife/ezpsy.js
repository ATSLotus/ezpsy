var ezpsy = (function () {
    'use strict';

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

    function KbCheck(key, Func) {
        document.onkeydown = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode === key) {
                Func();
            }
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
        KbCheck: KbCheck
    });

    return EZPSY;

})();