
export function KbCheck(key: number,Func: Function){
    document.onkeydown=function(event){
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode === key){
            Func();
        }
    }
}