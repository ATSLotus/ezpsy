/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 19:19:16
 * @Description: 
 * @FilePath: /ezpsy/src/Keypress/keypress.ts
 */
// import { Elements } from "../Element";
// import { judgeIsInElement } from "../Judge/judge";

// export function KbWait(key: number,func?: Function): Promise<boolean>{
//     return new Promise((resolve,rejected)=>{
//         document.onkeydown = event =>{
//             let e = event || window.event || arguments.callee.caller.arguments[0];
//             if(e && e.keyCode === key)
//             {
//                 if(func)
//                 {
//                     func();
//                 }   
//                 resolve(true)
//             }
//             rejected(false)
//         }
//     })
// }

// export function KbName(key: string|number):number{
//     let res;

//     if(typeof key === 'string')
//     {
//         res = key.charCodeAt(0)
//     }
//     else{
//         res = String.fromCharCode(key)
//     }
//     // console.dir(res) 
//     return res
// }

// export function KbPressWait(key: number|Array<number>): Promise<boolean>{
//     return new Promise((resolve,rejected)=>{
//         let keyC = new Array();
//         if(typeof key === 'number')
//         {
//             keyC = [key];
//         }
//         else{
//             keyC = key;
//         }
//         document.onkeydown = event =>{
//             let e = event || window.event || arguments.callee.caller.arguments[0];
//             for(let i = 0;i < keyC.length;i++)
//             {
//                 if(e && e.keyCode === keyC[i]){
//                     resolve(e.keyCode)
//                 }
//             }
//             rejected(false)
//         }
//     })
    
// }

// export function KbReleaseWait(key: number): Promise<boolean>{
//     return new Promise((resolve,rejected)=>{
//         document.onkeyup = event => {
//             let e = event || window.event || arguments.callee.caller.arguments[0];
//             if(e && e.keyCode === key){
//                 resolve(true)
//             }
//             rejected(false)
//         }
//     })
    
// }

// export function GetClick(el: Elements): Promise<boolean>{
//     return new Promise((resolve,rejected)=>{
//         document.onmousedown = function(event){
//             let e = event || window.event || arguments.callee.caller.arguments[0];
//             let x,y
//             if(e.pageX || e.pageY)
//             {
//                 x = e.pageX
//                 y = e.pageY
//             }
//             // console.dir(x) 
//             // console.dir(y)
//             let f = judgeIsInElement([x,y],el)
//             // console.dir(f)
//             if(f === true)
//             {
//                 resolve(true)
//             }
//             rejected(false)
//         }
//     })
    
// }