import { Shape,Opts,Style,nameStyle } from '../DataType/dataType'
import { Elements } from '../Element';
// import * as SG from '../../static/pkg/singrat'
import * as TIME from '../Time/time'
import { getWasm } from "../setWasm"
import * as SG from '../setWasm'

interface GratingShape extends Shape{
    x: number,
    y: number,
    r: number,
    pixelsPerDegree?: number, 
    spatialFrequency?: number,
    angle?: number, 
    contrast?: number, 
    phase?: number,
    level?: number,
    gamma?: number
}

export interface GratingOpts extends Opts{
    shape: GratingShape,
    style?: Style,
    isNoise?: boolean
}

let nameId = 0;

export class sinGrating extends Elements{
    readonly name?: nameStyle = {
        name: "singrating" + nameId.toString(),
        graphicId: nameId
    }
    wasm: Object;
    param: Uint8Array;
    width: number;
    sinGrat: ImageData;        //光栅图片数据
    imgDataList: Array<ImageData>;    //用于储存参与动画的图片
    isNoise: boolean;
    constructor(opts: GratingOpts){
        super();
        // this.ctx = super.ctx;
        // this.wasm = opts.wasm;
        this.shape = opts.shape;
        let sh = this.shape;
        this.width = 2*(sh.r/2+sh.r)+1;
        this.sinGrat = new ImageData(this.width,this.width);
        this.imgDataList = new Array<ImageData>();
        this.isNoise = opts.isNoise;
        this.shape.pixelsPerDegree = !this.shape.pixelsPerDegree ? 57 : this.shape.pixelsPerDegree
        this.shape.spatialFrequency = !this.shape.spatialFrequency ?  2 : this.shape.spatialFrequency
        this.shape.angle = !this.shape.angle ?  0 : this.shape.angle
        this.shape.contrast = !this.shape.contrast ?  1 : this.shape.contrast
        this.shape.phase = !this.shape.phase ?  0 : this.shape.phase
        this.shape.level = !this.shape.level ?  0.5 : this.shape.level
        this.shape.gamma = !this.shape.gamma ?  1 : this.shape.gamma
        console.dir(this.shape)
        // console.dir(this.isNoise)
        
        nameId++;
    }
    async draw(){
        let sh = this.shape;
        let wasm = await getWasm()
        // console.dir(wasm)
        if(this.isNoise)
            this.param = SG.pre_noise_singrat(wasm,sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.level,sh.gamma);
        else
            this.param = SG.pre_singrat(wasm,sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.gamma);
        this.sinGrat.data.set(this.param);
        this.ctx.putImageData(this.sinGrat,sh.x-1.5*sh.r,sh.y-1.5*sh.r)
        // console.dir("success");
        
    }
    async play(timeFrequency:number = 1,time:number = 1000,fps:number = 60){
        let interval = 2*Math.PI*timeFrequency/fps;
        let fpsNum = Math.floor(time/1000 * fps);
        let index = 0;
        let sh = this.shape;
        let that = this;
        let wasm = await getWasm()
        console.dir(wasm);
        // SG.default(this.wasm)
        // .then(()=>{
        //     // let t0 = performance.now()
        //     // console.dir(t0)
        if(this.isNoise)
        {
            for(let i = 0;i < fps;i++)
            {
                let img = SG.pre_noise_singrat(wasm, sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+i*interval,sh.level,sh.gamma);
                let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                this.imgDataList.push(imgData)
            }
        }
        else{
            for(let i = 0;i < fps;i++)
            {
                let img = SG.pre_singrat(wasm, sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+i*interval,sh.gamma);
                let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                this.imgDataList.push(imgData)
            }
        }
        //     // let t1 = performance.now();
        //     // console.dir(t1);
        //     // console.dir(t1-t0);
        (async ()=>{
            for(let i = 0;i < fpsNum;i++)
            {
                index = i % fps;
                that.ctx.putImageData(that.imgDataList[index],sh.x-1.5*sh.r,sh.y-1.5*sh.r);
                await TIME.delay_frame(1);
                that.remove();
            }
        })()
        // })
    }
}

// function readWasm(wasm){
//     console.dir('suceess!');
//     return new Promise((res,rej)=>{
//         fetch(wasm).then(res =>
//             res.arrayBuffer()
//         ).then(bytes => 
//             WebAssembly.instantiate(bytes, {})
//         ).then(result =>{
//             console.dir(result);
//             let wasm = result.instance.exports;
//             res(wasm);
//         })
//     })
    
// }


// let cachegetInt32Memory0 = null;
// function getInt32Memory0(wasm) {
//     if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
//         cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
//     }
//     return cachegetInt32Memory0;
// }

// let cachegetUint8Memory0 = null;
// function getUint8Memory0(wasm) {
//     if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
//         cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
//     }
//     return cachegetUint8Memory0;
// }

// function getArrayU8FromWasm0(ptr, len, wasm) {
//     return getUint8Memory0(wasm).subarray(ptr / 1, ptr / 1 + len);
// }