// import { WaitSecs } from "../ezpsy";

// export class animate{
//     delay: number
//     func: Function
//     constructor(){
//         if(!this.delay){
//             this.delay = 100;
//         }
//     }
//     when(delay: number){
//         this.delay = delay;
//     }
//     done(func: Function){
//         this.func = func
//     }
//     start(){
//         let delay = this.delay
//         let func = this.func
//         let that = this
//         new Promise((res,rej)=>{
//             setTimeout(func(),delay);
//         })
//     }
// }