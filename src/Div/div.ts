import * as ezJudge from '../Judge/judge'

export interface DivStyle{
    width?: number;
    height?: number;
    border?: string;
    borderRadius?: string;
}

export function createDiv(dom: HTMLElement,dStyle: DivStyle): [HTMLElement,DivStyle]{
    let div = document.createElement('div')
    dStyle = ezJudge.judgeDivStyle(dStyle);
    div.style.width = dStyle.width.toString()
    div.style.height = dStyle.height.toString()
    div.style.border = dStyle.border
    div.style.borderRadius = dStyle.borderRadius
    div.style.visibility = 'hidden'
    div.style.boxShadow = '20px 10px 40px #888888'
    div.style.position = 'absolute'
    div.style.zIndex = '1000'
    div.style.background = 'white'
    // div.style.top = '0px'
    let w = window.innerWidth
    let h = window.innerHeight
    // console.dir(w)
    div.style.top = ((h-dStyle.height)/2).toString() + 'px'
    div.style.left = ((w-dStyle.width)/2).toString() + 'px'
    dom.append(div);
    return [div,dStyle]
}