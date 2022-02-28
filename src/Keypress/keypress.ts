import { Elements } from "../Element";
import { judgeIsInElement } from "../Judge/judge";

export function KbWait(key: number,Func: Function){
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode === key){
            Func();
        }
    }
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

export function KbPressWait(key: number,Func: Function){
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode === key){
            Func();
        }
    }
}

export function KbReleaseWait(key: number,Func: Function){
    document.onkeyup=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode === key){
            Func();
        }
    }
}

export function GetClick(el: Elements,Func: Function){
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
            Func()
        }
    }
}

