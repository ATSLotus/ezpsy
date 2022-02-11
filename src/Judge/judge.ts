import { Style } from 'util'
import {canvasStyle} from '../Canvas/canvas'
import { Rectangle,makeRectangle } from '../Graphic/rectangle'
import { Class } from 'estree'
import { Group } from '../Group/group' 
import { Elements } from '../Element'
import { Circle,makeCircle } from '../Graphic/circle'
import { Line, makeLine} from '../Graphic/line'
import { Opts } from '../DataType/dataType'
import { Arc, makeArc } from '../Graphic/arc'
import { Ellipse, makeEllipse } from '../Graphic/ellipse'
import { makePolygon, Polygon } from '../Graphic/polygon'
import { makeText, Text } from '../Graphic/text'
import { Img, makeImg } from '../Graphic/image'

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
    return cStyle;
}

// export function judgeStyle(style: Style){
//     if(!style)
// }

export function judgeElement(el: Elements,ctx: CanvasRenderingContext2D){
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
    else if(el instanceof Text)
    {
        makeText(el,ctx);
    }
    else if(el instanceof Img)
    {
        makeImg(el,ctx)
    }
    else if(el instanceof Group){
        // console.dir(el)
        let list = el.groupList;
        // console.dir(list[0])
        for(let i = 0;i < el.length;i++)
        {
            judgeElement(list[i],ctx);
        }
    }
}

export function judgeStyle(el: Elements,ctx: CanvasRenderingContext2D){
    if(el.style === undefined)
    {
        el.style = {
            fill: "none",
            stroke: "#000",
            lineWidth: 1
        }
    }
    let st = el.style;
    if(st.lineWidth === undefined){
        st.lineWidth = 1;
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
            st.stroke = "#000"
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
    let st = el.style;
    if(st.fill !== 'none' && st.fill !== undefined){

        ctx.fillStyle = st.fill;
        ctx.fillText(el.shape.text,el.shape.x,el.shape.y);
    }
    else{
        if(st.stroke !== 'none' && st.stroke !== undefined){
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text,el.shape.x,el.shape.y);
        }
        else{
            st.stroke = "#000"
            ctx.strokeStyle = st.stroke;
            ctx.strokeText(el.shape.text,el.shape.x,el.shape.y);
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
    fontString = st.fontStyle + ' ' + st.fontVariant + ' ' + st.fontWeight + ' ' + st.fontSize + ' ' + st.fontFamily;
    ctx.font = fontString;
    console.dir(fontString)
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
    let sh = img.shape
    if(sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined)
    {
        if(sh.width === undefined || sh.height === undefined)
        {
            ctx.drawImage(img.Img,sh.x,sh.y)
        }
        else{
            ctx.drawImage(img.Img,sh.x,sh.y,sh.width,sh.height)
        }
    }
    else{
        if(sh.width === undefined || sh.height === undefined)
        {
            ctx.drawImage(img.Img,sh.sx,sh.sy,sh.swidth,sh.sheight,sh.x,sh.y,img.Img.width,img.Img.height)
        }
        else{
            ctx.drawImage(img.Img,sh.sx,sh.sy,sh.swidth,sh.sheight,sh.x,sh.y,sh.width,sh.height)
        }
    }
}

export function judgeImageShape_true(img: Img,ctx: CanvasRenderingContext2D){
    let sh = img.shape
    if(sh.sx === undefined || sh.sy === undefined || sh.swidth === undefined || sh.sheight === undefined)
    {
        ctx.putImageData(img.ImgData,sh.x,sh.y)
    }
    else{
        ctx.putImageData(img.ImgData,sh.x,sh.y,sh.sx,sh.sy,sh.swidth,sh.sheight)
    }
}