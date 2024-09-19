import {canvasStyle} from '../Canvas/canvas'
import { DivStyle } from '../Div/div'
import { Rectangle,makeRectangle } from '../Graphic/rectangle'
import { Group } from '../Group/group' 
import { Elements } from '../Element'
import { Circle,makeCircle } from '../Graphic/circle'
import { Line, makeLine} from '../Graphic/line'
import { Arc, makeArc } from '../Graphic/arc'
import { Ellipse, makeEllipse } from '../Graphic/ellipse'
import { makePolygon, Polygon } from '../Graphic/polygon'
import { makeText, Texts } from '../Graphic/text'
import { Img, makeImg } from '../Graphic/image'
// import { contentStyle } from '../Dialogue/dialogue'
import { Grat, makeGrat } from '../Graphic/grating'
import { sinGrating } from '../Graphic/sinGrating'
import { sinGrating1 } from '../Graphic/sinGrating1'
import { sinGrating2 } from '../Graphic/sinGrating2'
import { sinGratBG } from '../Graphic/sinGratBG'
import { playRandomDot, RandomDot } from '../Graphic/randomDot'
import * as ezSinGrat from '../Graphic/sinGrat'
import * as ezSinGrat0 from '../Graphic/sinGrat0'
import * as ezSinGrat1 from '../Graphic/sinGrat1'
import * as ezSinGrat2 from '../Graphic/sinGrat2'
import * as ezCanvas from '../Canvas/canvas'
import { DlgContent } from '../Dialogue/dialogue0'
import { sinGabor, wasmSinGrating } from '../ezpsy'

export function judgeCanvasStyle(cStyle: canvasStyle):canvasStyle{
    if(!cStyle) 
    {
        cStyle = {
            width: 400,
            height: 400
        }
    }
    if(!cStyle.width)
    {
        cStyle.width = 400
    }
    if(!cStyle.height)
    {
        cStyle.height = 400
    }
    if(!cStyle.backColor) {
        cStyle.backColor = "#FFFFFF"
    }
    return cStyle;
}

export function judgeDivStyle(dStyle: DivStyle): DivStyle{
    if(!dStyle) 
    {
        dStyle = {
            width: 400,
            height: 260,
            border: 'none',
            borderRadius: '20px'
        }
    }
    if(!dStyle.width)
    {
        dStyle.width = 400
    }
    if(!dStyle.height)
    {
        dStyle.height = 400
    }
    if(!dStyle.border)
    {
        dStyle.border = 'none'
    }
    if(!dStyle.borderRadius)
    {
        dStyle.borderRadius = '5px'
    }
    return dStyle;
}

// export function judgeContentStyle(cStyle: contentStyle,title: string,content: string): contentStyle{
//     if(!cStyle)
//     {
//         cStyle = {
//             title: title,
//             content: content,
//             btnStr: ['OK'],
//             noIcon: false,
//             noInt: false,
//             confirmPosition: 0
//         }
//     }
//     if(!cStyle.title)
//     {
//         cStyle.title = title
//     }
//     if(!cStyle.content)
//     {
//         cStyle.content = content
//     }
//     if(!cStyle.btnStr){
//         cStyle.btnStr = ['OK']
//     }
//     if(!cStyle.noIcon)
//     {
//         cStyle.noIcon = false
//     }
//     if(!cStyle.noInt)
//     {
//         cStyle.noInt = false
//     }
//     if(!cStyle.confirmPosition)
//     {
//         cStyle.confirmPosition = 0;
//     }
//     if(cStyle.confirmPosition !== 0 && cStyle.confirmPosition !== 1 && cStyle.confirmPosition !== 2){
//         cStyle.confirmPosition = 0
//     }
//     return cStyle
// }

export function judgeModel(model: string): [string,string,string,string]{
    if(model === 'error')
    {
        return ["X",'red','Error Dialogue','This is default error string!']
    }
    else if(model === 'help')
    {
        return ["!",'orange','Help Dialogue','This is default help string!']
    }
    else if(model === 'quest')
    {
        return ["?",'grey',"Quset Dialogue",'This is default error string!']
    }
    else if(model === 'warn')
    {
        return ["!",'orange','Warning Dialogue','This is default warning string!']
    }
    else if(model === 'input')
    {
        return ['','',"Input Dialogue","This is default input string"]
    }
    else if(model === 'select'){
        return ['','',"Select Dialogue","This is default select string"]
    }
    else if(model === 'file'){
        return ['','','File Dialogue','This is default file string']
    }
    else{
        return ['～','green','Dailogue','This is default dailogue string']
    }
}

// export function judgeStyle(style: Style){
//     if(!style)
// }

export async function judgeElement(el: Elements|Group|Elements[],ctx: CanvasRenderingContext2D){
    // console.dir(el)
    // console.dir(Rectangle)
    // console.dir(el instanceof Rectangle)
    if(el instanceof Rectangle){
        makeRectangle(el,ctx);
    }
    else if(el instanceof Circle)
    {
        makeCircle(el,ctx);
    }
    else if(el instanceof Line)
    {
        makeLine(el,ctx);
    }
    else if(el instanceof Arc)
    {
        makeArc(el,ctx);
    }
    else if(el instanceof Ellipse)
    {
        makeEllipse(el,ctx)
    }
    else if(el instanceof Polygon)
    {
        makePolygon(el,ctx)
    }
    else if(el instanceof Texts)
    {
        makeText(el,ctx);
    }
    else if(el instanceof Grat)
    {
        makeGrat(el,ctx);
    }
    else if(el instanceof Img)
    {
        makeImg(el,ctx)
    }
    else if(el instanceof ezSinGrat.sinGrat)
    {
        await (<ezSinGrat.sinGrat>el).pre_draw();
    }
    else if(el instanceof ezSinGrat0.sinGrat0)
    {
        await (<ezSinGrat0.sinGrat0>el).pre_draw();
    }
    else if(el instanceof ezSinGrat1.sinGrat1)
    {
        await (<ezSinGrat1.sinGrat1>el).pre_draw();
    }
    else if(el instanceof ezSinGrat2.sinGrat2)
    {
        await (<ezSinGrat2.sinGrat2>el).pre_draw();
    }
    else if(el instanceof sinGrating){
        // console.dir("Add Success!");
        await (<sinGrating>el).pre_draw();
    }
    else if(el instanceof sinGrating1){
        // console.dir("Add Success!");
        await (<sinGrating1>el).pre_draw();
    }
    else if(el instanceof sinGrating2){
        // console.dir("Add Success!");
        await (<sinGrating2>el).pre_draw();
    }
    else if(el instanceof sinGratBG){
        // console.dir("Add Success!");
        (<sinGratBG>el).draw();
    }
    else if(el instanceof sinGabor){
        // console.dir("Add Success!");
        (<sinGabor>el).count();
    }
    else if(el instanceof wasmSinGrating){
        // console.dir("Add Success!");
        (<wasmSinGrating>el).pre_draw();
    }
    else if(el instanceof RandomDot)
    {
        playRandomDot(el,ctx);
    }
    else if(el instanceof Group){
        // console.dir(el)
        let list = el.groupList;
        // console.dir(list[0])
        for(let i = 0;i < el.length;i++)
        {
            list[i].ctx = ctx
            judgeElement(list[i],ctx);
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

export function judgeStyle(el: Elements,ctx: CanvasRenderingContext2D){
    // judgeAnimate(el);
    if(el.style === undefined)
    {
        el.style = {
            fill: "none",
            stroke: '"#000000"',
            lineWidth: 2
        }
    }
    let st = el.style;
    if(st.lineWidth === undefined){
        st.lineWidth = 2;
    }
    if(st.fill !== 'none' && st.fill !== undefined){
        ctx.fillStyle = st.fill;
        ctx.fill();
        if(st.stroke !== 'none' && st.stroke !== undefined){
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = st.lineWidth;
            ctx.stroke();
        }
    }
    else{
        if(st.stroke !== 'none' && st.stroke !== undefined){
            ctx.strokeStyle = st.stroke;
            ctx.lineWidth = st.lineWidth;
            ctx.stroke();
        }
        else{
            st.stroke = '"#000000"'
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


export function judgeStyle_text(el: Elements,ctx: CanvasRenderingContext2D){
    if(el.style === undefined)
    {
        el.style = {
            fontSize: '18px',
            fontVariant: 'normal',
            fontWeight: 'normal',
            fontStyle: 'normal'
        }
    }
    if(el.shape.maxWidth === undefined)
    {
        el.shape.maxWidth = ctx.canvas.width / el.dpr;
    }
    let st = el.style;
    if(st.fill !== 'none' && st.fill !== undefined){
        ctx.fillStyle = st.fill;
        ctx.fillText(el.shape.text,el.shape.x/el.dpr,el.shape.y/el.dpr,el.shape.maxWidth);
    }
    else{
        if(st.stroke !== 'none' && st.stroke !== undefined){
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text,el.shape.x/el.dpr,el.shape.y/el.dpr,el.shape.maxWidth);
        }
        else{
            st.stroke = "#000"
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text,el.shape.x/el.dpr,el.shape.y/el.dpr,el.shape.maxWidth);
        }
    }
}

export function judgeTextStyle(el: Elements,ctx: CanvasRenderingContext2D){
    let st = el.style
    let fontString = '';
    if(st === undefined)
    {
        st = {
            fontSize: '18px',
            fontVariant: 'normal',
            fontWeight: 'normal',
            fontStyle: 'normal'
        }
    }
    if(st.fontStyle !== undefined && st.fontStyle !== 'none')
    {
        if(typeof st.fontStyle === 'number')
        {
            if(st.fontStyle < 3 && st.fontStyle >=0)
            {
                if(st.fontStyle === 0)
                {
                    st.fontStyle = 'normal'
                }
                else if(st.fontStyle === 1)
                {
                    st.fontStyle = 'italic'
                }
                else
                {
                    st.fontStyle = 'oblique'
                }
            }
            else{
                st.fontStyle = 'normal'
            }
        }
        else if(typeof st.fontStyle === 'string')
        {
            st.fontStyle = st.fontStyle.toLowerCase();
            if(st.fontStyle !== 'italic' && st.fontStyle !== 'oblique' && st.fontStyle !== "normal"){
                if(st.fontStyle === '0'){
                    st.fontStyle = 'normal'
                }
                else if(st.fontStyle === '1')
                {
                    st.fontStyle = 'italic'
                }
                else if(st.fontStyle === '2')
                {
                    st.fontStyle = 'oblique'
                }
                else{
                    st.fontStyle = 'normal'
                }
            }
        }
    }
    else{
        st.fontStyle = 'normal'
    }

    if(st.fontVariant !== undefined && st.fontVariant !== 'none')
    {
        if(typeof st.fontVariant === 'boolean')
        {
            if(st.fontVariant === false)
            {
                st.fontVariant = 'normal'
            }
            else{
                st.fontVariant = 'small-caps'
            }
        }
        else if(typeof st.fontVariant === 'string')
        {
            st.fontVariant = st.fontVariant.toLowerCase();
            if(st.fontVariant !== 'normal' && st.fontVariant !== 'small-caps')
            {
                if(st.fontVariant === 'true')
                {
                    st.fontVariant = 'small-caps'
                }
                else{
                    st.fontVariant = 'normal'
                }
            }
        }
        else{
            st.fontVariant = 'normal'
        }
    }
    else{
        st.fontVariant = 'normal'
    }

    if(st.fontWeight !== undefined && st.fontWeight !== 'none'){
        if(typeof st.fontWeight === 'number')
        {
            st.fontWeight = st.fontWeight.toString()
        }
        else if(typeof st.fontWeight === 'string')
        {
            if(st.fontWeight !== 'normal' && st.fontWeight !== 'bold' && st.fontWeight !== 'bolder' && st.fontWeight !== 'lighter')
            {
                st.fontWeight = 'normal'
            }
        }
        else{
            st.fontWeight = 'normal'
        }
    }
    else{
        st.fontWeight = 'normal'
    }

    if(st.fontSize !== undefined && st.fontSize !== 'none')
    {
        if(typeof st.fontSize === 'number')
        {
            st.fontSize = st.fontSize.toString() + 'px'
        }
        else if(typeof st.fontSize === 'string')
        {
            if(st.fontSize.indexOf('px') === -1)
            {
                st.fontSize = st.fontSize + 'px'
            }
        }
        else{
            st.fontSize = '18px'
        }
    }
    else{
        st.fontSize = '18px'
    }
    if(st.fontFamily === undefined) {
        st.fontFamily = "Arial"
    }
    fontString = st.fontStyle + ' ' + st.fontVariant + ' ' + st.fontWeight + ' ' + st.fontSize + ' ' + st.fontFamily;
    ctx.font = fontString;
    // console.dir(fontString)
}

export function judgeChangeType(el: number|string): number{
    let x = 1;
    // console.dir(el)
    if(typeof el === "string")
    {
        el = el.toUpperCase();
        if(el === "CENTER" || el === 'C')
        {
            x = 0;
        }
        else if(el === 'RECTLEFT' || el === "LEFT" || el === 'L'){
            x = 1;
        }
        
        else if(el === 'RECTTOP' || el === "TOP" || el === 'T'){
            x = 2;
        }
        else if(el === 'RECTRIGHT' || el === "RIGHT" || el === 'R'){
            x = 3;
        }
        else if(el === 'RECTBOTTOM' || el === "BOTTOM" || el === 'B'){
            x = 4;
        }
        else{
            console.dir('Error! Please use the right instruction!')
        }
    }
    else if(typeof el === "number")
    {
        if(el<5)
        {
            x = el;
        }
        else
        {
            console.dir('Error!It will use default instruction!')
        }
    }
    else
    {
        console.dir('Error!It will use default instruction!')
    }
    return x;
}

export function judgeSide(side0: number|string,side1: number|string): [number,number]{
    let f0 = judgeChangeType(side0);
    let f1 = judgeChangeType(side1);
    if(f0 === 2 || f0 === 4){
        if(f1 === 2 || f1 === 4){
            f1 = 0;
        }
        else{
            let t = f1;
            f1 = f0;
            f0 = t;
        }
    }
    if(f0 === 1 || f0 === 3){
        if(f1 === 1 || f1 === 3){
            f1 = 0;
        }
    }
    return [f0,f1]
}   

export function judgeImageShape(img: Img,ctx: CanvasRenderingContext2D){
    // let sh = img.shape
    console.dir(img.ImgData)
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
    let sh = img.shape
    if(sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined)
    {
        // console.dir(777)
        ctx.putImageData(img.ImgData,sh.x,sh.y)
    }
    else{
        // console.dir(77)
        ctx.putImageData(img.ImgData,sh.x,sh.y,sh.sx,sh.sy,sh.swidth,sh.sheight)
    }
}

export function judgeImageShape_true(img: Img,ctx: CanvasRenderingContext2D){
    let sh = img.shape
    if(sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined)
    {
        // ctx.putImageData(img.ImgData,sh.x,sh.y)
        ctx.putImageData(img.greyImgData,sh.x,sh.y)
    }
    else{
        // ctx.putImageData(img.ImgData,sh.x,sh.y,sh.sx,sh.sy,sh.swidth,sh.sheight)
        ctx.putImageData(img.greyImgData,sh.x,sh.y,sh.sx,sh.sy,sh.swidth,sh.sheight)
    }
}

export function judgeIsInElement([x,y]: [number,number],el: Elements): boolean{
    if(el instanceof Rectangle){
        let [x0,y0,w0,h0] = [el.shape.x,el.shape.y,el.shape.width,el.shape.height]
        if(x >= x0 && x<=x0+w0 && y >= y0 && y <= y0+h0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    else if(el instanceof Circle)
    {
        let [x0,y0,r0] = [el.shape.x,el.shape.y,el.shape.r]
        let r = Math.sqrt(Math.pow(x-x0,2) + Math.pow(y-y0,2))
        if(r <= r0)
        {
            return true
        }
        else{
            return false
        }
    }
    else if(el instanceof Line)
    {
        let [x0,y0,x1,y1] = [el.shape.x,el.shape.y,el.shape.xEnd,el.shape.yEnd]
        if(x1 !== x0)
        {
            let yt = (y1-y0)/(x1-x0) * (x - x0) + y0
            if(y >= yt-15 && y <= yt+15) //扩大范围以便操作
            {
                return true
            }
            else{
                return false
            }
        }
        else{
            let xt = (x1-x0)/(y1-y0) * (y - y0) + x0
            if(y >= xt-15 && y <= xt+15) //扩大范围以便操作
            {
                return true
            }
            else{
                return false
            }
        }
        
    }
    else if(el instanceof Arc)
    {
        
    }
    else if(el instanceof Ellipse)
    {
        let [x0,y0,ra0,rb0] = [el.shape.x,el.shape.y,el.shape.ra,el.shape.rb]
        let t = Math.pow(x-x0,2)/Math.pow(ra0,2) + Math.pow(y-y0,2)/Math.pow(rb0,2)
        if(t <= 1)
        {
            return true
        }
        else{
            return false
        }
    }
    else if(el instanceof Polygon)
    {
        let i = 0
        let j = i + 1
        let index = 0
        let xt = new Array()
        let yt = new Array()
        let [x0,y0] = [el.shape.xA,el.shape.yA]
        for(i = 0;i<el.shape.xA.length;i++)
        {
            if(i === el.shape.xA.length-1)
            {
                j = 0
            }
            else{
                j = i + 1
            }
            if(y0[i] !== y0[j])
            {
                xt[index] = (x0[i]-x0[j])/(y0[i]-y0[j]) * (y - y0[i]) + x0[i]
            }
            else{
                yt[index] = (y0[j]-y0[i])/(x0[j]-x0[i]) * (x - x0[i]) + y0[i]
            }
            if(x === xt[index])
            {
                return true
            }
            else if(xt[index] >= x){
                index++
            }
        }
        if(index%2===0)
        {
            return false
        }
        else{
            return true
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

export function judgeAnimate(el: Elements,ctx: CanvasRenderingContext2D){
    // console.dir('a')

    el.remove()
    ctx.save()
    ctx.beginPath()
    ctx.translate(el.translate.x,el.translate.y)
    ctx.rotate(el.rotate)
    ctx.scale(el.scale.width,el.scale.height)
    judgeElement(el,ctx)
    ctx.closePath()
    ctx.restore()
}

export function judgeTRS(el: Elements){
    let ctx = el.ctx

    let [x,y] = judgeElementsCenter(el);
    
    if(el.rotate)
    {
        ctx.translate(x,y)
        ctx.rotate(el.rotate*Math.PI/180)
        ctx.translate(-x,-y)
    }
    ctx.translate(x,y)
    ctx.scale(el.scale.width,el.scale.height)
    ctx.translate(-x,-y)

    ctx.translate(el.translate.x,el.translate.y)
}

export function judgeKey(keyCode: number,keyCodeDictionary: Object): string{
    let key = keyCodeDictionary[keyCode];
    return key;
}

export function judgeDlgContent(dlgContent: DlgContent,title: string,content?: string,ok?: string,cancel?: string): DlgContent{
    if(ok === undefined){
        ok = 'OK'
    }
    if(cancel === undefined)
    {
        cancel = 'Cancel'
    }
    if(dlgContent === undefined)
    {
        return dlgContent = {
            title: title,
            content: content,
            confirm: ok,
            cancel: cancel
        }
    }
    else{
        if(dlgContent.title === undefined)
        {
            dlgContent.title = title;
        }
        if(content !== undefined)
        {
            if(dlgContent.content === undefined)
            {
                dlgContent.content = content;
            }
        }
        if(dlgContent.confirm === undefined)
        {
            dlgContent.confirm = ok
        }
        if(dlgContent.cancel === undefined){
            dlgContent.cancel = cancel;
        }
        return dlgContent;
    }
}

export function judgeElementsCenter(el: Elements): [number,number]{
    let x,y;
    if(el instanceof Rectangle)
    {
        x = el.shape.x + el.shape.width/2
        y = el.shape.y + el.shape.height/2
    }
    else if(el instanceof Circle || el instanceof Arc || el instanceof Grat || el instanceof Ellipse)
    {
        x = el.shape.x
        y = el.shape.y
    }
    else if(el instanceof Line)
    {
        x = Math.abs(el.shape.x - el.shape.xEnd)/2
        y = Math.abs(el.shape.y - el.shape.yEnd)/2
    }
    else if(el instanceof ezSinGrat.sinGrat)
    {
        x = Math.ceil((2*el.shape.r+1)/2)
        y = Math.ceil((2*el.shape.r+1)/2)
    }
    else if(el instanceof Texts)
    {
        x = el.shape.x;
        y = el.shape.y;
    }
    

    return [x,y]
}