export class Time{
    startTime: number
    timeStamp: Array<number>
    timeContinueValue: Array<number>
    timeIntervalValue: Array<number>
    constructor(){
        this.startTime = performance.now()
        this.timeStamp = []
        this.timeContinueValue = []
        this.timeIntervalValue = []
    }
    record(){
        this.timeStamp.push(performance.now())
    }
    getStamp(){
        return this.timeStamp
    }
    getContinueValue(){
        for(let i = 1;i < this.timeStamp.length;i++)
        {
            this.timeContinueValue.push(this.timeStamp[i] - this.timeStamp[i-1]);
        }
        return this.timeContinueValue;
    }
    getIntervalValue(){
        for(let i = 1;i < this.timeStamp.length;i+=2)
        {
            if(this.timeStamp)
                this.timeIntervalValue.push(this.timeStamp[i] - this.timeStamp[i-1]);
        }
        return this.timeIntervalValue;
    }
}

// export function sleep(delay: number): Promise<number>{
//     return new Promise((res,rej)=>{
//         var startTime = performance.now() + delay;
//         while(performance.now() < startTime) {}
//         res(1)
//     })
// }

export function sleep(delay: number){
    let time_num=0;     
    delay = Math.floor(delay/1000 * 60);
    return new Promise(function (resolve, reject) {
        (function raf(){
            time_num++;
            let id =window.requestAnimationFrame(raf);
        if( time_num>delay){
            window.cancelAnimationFrame(id);
            resolve(0);
        }
        }())    
    })
}

export function WaitSecs(delay: number): Promise<number>{
    return new Promise((res,rej)=>{
        var startTime = performance.now() + delay;
        while(performance.now() < startTime) {}
        res(1)
    })
}