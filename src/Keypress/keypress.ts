import { Elements } from "../Element";
import { judgeIsInElement } from "../Judge/judge";

export function KbWait(key: number): Promise<boolean>{
    return new Promise((resolve,rejected)=>{
        document.onkeydown = event =>{
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode === key)
            {
                resolve(true)
            }
            rejected(false)
        }
    })
}

export function KbName(key: string|number):number{
    let res;

    if(typeof key === 'string')
    {
        res = key.charCodeAt(0)
    }
    else{
        res = String.fromCharCode(key)
    }
    console.dir(res) 
    return res
}

export function KbPressWait(key: number): Promise<boolean>{
    return new Promise((resolve,rejected)=>{
        document.onkeydown = event =>{
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode === key){
                resolve(true)
            }
            rejected(false)
        }
    })
    
}

export function KbReleaseWait(key: number): Promise<boolean>{
    return new Promise((resolve,rejected)=>{
        document.onkeyup = event => {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if(e && e.keyCode === key){
                resolve(true)
            }
            rejected(false)
        }
    })
    
}

export function GetClick(el: Elements): Promise<boolean>{
    return new Promise((resolve,rejected)=>{
        document.onmousedown = function(event){
            let e = event || window.event || arguments.callee.caller.arguments[0];
            let x,y
            if(e.pageX || e.pageY)
            {
                x = e.pageX
                y = e.pageY
            }
            // console.dir(x) 
            // console.dir(y)
            let f = judgeIsInElement([x,y],el)
            // console.dir(f)
            if(f === true)
            {
                resolve(true)
            }
            rejected(false)
        }
    })
    
}

