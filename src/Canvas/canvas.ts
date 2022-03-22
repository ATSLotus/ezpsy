import * as ezJudge from '../Judge/judge'

export interface canvasStyle{
    width?: number;
    height?: number;
}

export function createCanvas(dom: HTMLElement,cStyle?: canvasStyle): CanvasRenderingContext2D{
    let c = document.createElement('canvas')
    // let cStyle: canvasStyle = {
    //     width: 100,
    //     height: 100
    // }
    c.style.position = 'absolute'
    c.width = cStyle.width;
    c.height = cStyle.height;
    let w = window.innerWidth
    let h = window.innerHeight
    // console.dir(w)
    c.style.top = ((h-cStyle.height)/2).toString() + 'px'
    c.style.left = ((w-cStyle.width)/2).toString() + 'px'
    let ctx = c.getContext('2d');
    dom.append(c);
    return ctx;
}