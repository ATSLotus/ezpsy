
class time{
    hour: number
    minutes: number
    seconds: number
    milliseconds: number
    constructor(){
        let date = new Date()
        this.hour = date.getHours()
        this.minutes = date.getMinutes()
        this.seconds = date.getSeconds()
        this.milliseconds = date.getMilliseconds()
    }
}

export class Time{
    startTime: time
    instantTime: time
    transientTime: time[]
    timeValue: number
    constructor(){

    }
    start(){
        this.startTime = new time()
    }
    record(){
        this.instantTime = new time()
    }
}

export function Tic(): Time{
    let t = new Time()
    t.start()
    return t;
}

export function Toc(time: Time): number{
    let t = 0;
    let ts = new Array()
    time.record()
    ts[0] = time.instantTime.hour - time.startTime.hour
    ts[1] = time.instantTime.minutes - time.startTime.minutes
    ts[2] = time.instantTime.seconds - time.startTime.seconds
    ts[3] = time.instantTime.milliseconds - time.startTime.milliseconds
    t = 60*60*ts[0] + 60*ts[1] + ts[2] + ts[3]/1000
    time.timeValue = t;
    return t;
}

export function GetSecs(time: Time): number{
    let t = Toc(time)
    return t
}

export function WaitSecs(delay: number,message?: any){
    return new Promise(function(resolve,reject){
        setTimeout(function () {
            // console.log(message);
            resolve(0);
        }, delay);
    })
}

export function delay_frame(num1){
    let time_num=0;     
    return new Promise(function (resolve, reject) {
        (function raf(){
            time_num++;
            let id =window.requestAnimationFrame(raf);
        if( time_num==num1){
            window.cancelAnimationFrame(id);
            resolve(0);
        }
    }())
})};