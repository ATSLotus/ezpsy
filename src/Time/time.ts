
class time {
    hour: number
    minutes: number
    seconds: number
    milliseconds: number
    constructor() {
        let date = new Date()
        this.hour = date.getHours()
        this.minutes = date.getMinutes()
        this.seconds = date.getSeconds()
        this.milliseconds = date.getMilliseconds()
    }
}

export class Time0 {
    startTime: time
    instantTime: Array<time>
    timeStamp: Array<time>
    item: number
    timeValue: Array<number>
    constructor() {
        this.item = 0;
        this.startTime = new time()
        this.instantTime = []
        this.instantTime.push(this.startTime)
        this.timeValue = []
        this.timeStamp = []
    }
    start() {
        this.startTime = new time()
    }
    record() {
        let t = new time()
        this.instantTime.push(t)
        this.item++
    }
}

// export function Tic(): Time0{
//     let t = new Time0()
//     t.start()
//     return t;
// }

// export function Toc(time: Time0): number{
//     let t = 0;
//     let ts = new Array()
//     time.record()
//     ts[0] = time.instantTime[time.item].hour - time.instantTime[time.item-1].hour
//     ts[1] = time.instantTime[time.item].minutes - time.instantTime[time.item-1].minutes
//     ts[2] = time.instantTime[time.item].seconds - time.instantTime[time.item-1].seconds
//     ts[3] = time.instantTime[time.item].milliseconds - time.instantTime[time.item-1].milliseconds
//     t = 60*60*ts[0] + 60*ts[1] + ts[2] + ts[3]/1000
//     // t.toFixed(3)
//     time.timeValue.push(t);
//     return t;
// }

// export function setTimeTtamp(T: Time0){
//     let t = new time();
//     T.timeStamp.push(t);
// } 

// export function getToc(time: Time0): Array<number>{
//     let tA = new Array();
//     let ts = new Array();
//     let t = time.timeStamp
//     for(let i = 0;i < Math.floor(t.length/2);i++){
//         if(t[2*i+1] === undefined)
//         {
//             break;
//         }
//         else{
//             ts[0] = t[2*i+1].hour - t[2*i].hour
//             ts[1] = t[2*i+1].minutes - t[2*i].minutes
//             ts[2] = t[2*i+1].seconds - t[2*i].seconds
//             ts[3] = t[2*i+1].milliseconds - t[2*i].milliseconds
//             tA[i] = 60*60*ts[0] + 60*ts[1] + ts[2] + ts[3]/1000
//             // tA[i] = Math.round(tA[i]*1000)/1000
//             // console.dir(tA[i])
//         }
//     }
//     return tA;
// }

// export function GetSecs(time: Time0): number{
//     let t = Toc(time)
//     return t
// }

export function delay_ms(delay: number) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve(true);
        }, delay);
    })
}

export function delay_frame(delay: number) {
    let count = 0;
    return new Promise(function (resolve, reject) {
        (function raf() {
            count++;
            let id = window.requestAnimationFrame(raf);
            if (count > delay) {
                window.cancelAnimationFrame(id);
                resolve(true);
            }
        }())
    })
};