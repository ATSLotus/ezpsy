import { Shape,Opts,Style,nameStyle } from '../DataType/dataType'
import { Elements } from '../Element';
import * as SG from '../../static/pkg/singrat'
import * as TIME from '../Time/time'

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
    wasm: string,
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
    wasm: string;
    param: Uint8Array;
    width: number;
    sinGrat: ImageData;        //光栅图片数据
    imgDataList: Array<ImageData>;    //用于储存参与动画的图片
    isNoise: boolean;
    constructor(opts: GratingOpts){
        super();
        this.ctx = super.ctx;
        this.wasm = opts.wasm;
        this.shape = opts.shape;
        let sh = this.shape;
        this.width = 2*(sh.r/2+sh.r)+1;
        this.sinGrat = new ImageData(this.width,this.width);
        this.imgDataList = new Array<ImageData>();
        this.isNoise = opts.isNoise;
        // console.dir(this.isNoise)
        
        nameId++;
    }
    draw(){
        let sh = this.shape;
        // readWasm(this.wasm).then(wasm => {
        //     console.dir(wasm);
        //     const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        //     wasm.pre_singrat(retptr, sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.gamma);
        //     var r0 = getInt32Memory0(wasm)[retptr / 4 + 0];
        //     var r1 = getInt32Memory0(wasm)[retptr / 4 + 1];
        //     var v0 = getArrayU8FromWasm0(r0, r1, wasm).slice();
        //     console.dir(v0)
        //     wasm.__wbindgen_free(r0, r1 * 1);
        //     this.param = v0;
        //     // if(this.isNoise)
        //     //     this.param = SG.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.level,sh.gamma);
        //     // else
        //     //     this.param = SG.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.gamma);
        //     this.sinGrat.data.set(this.param);
        //     this.ctx.putImageData(this.sinGrat,sh.x-1.5*sh.r,sh.y-1.5*sh.r)
        // });
        SG.default(this.wasm)
        .then(()=>{
            // let t0 = performance.now()
            // console.dir(t0)
            if(this.isNoise)
                this.param = SG.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.level,sh.gamma);
            else
                this.param = SG.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.gamma);
            this.sinGrat.data.set(this.param);
            this.ctx.putImageData(this.sinGrat,sh.x-1.5*sh.r,sh.y-1.5*sh.r)
            console.dir("success")
            // let t1 = performance.now();
            // console.dir(t1);
            // console.dir(t1-t0);
        })
    }
    play(timeFrequency,time,fps){
        if(!timeFrequency)
            timeFrequency = 1;
        if(!time)
            time = 1000
        if(!fps)
            fps = 60;
        let interval = 2*Math.PI*timeFrequency/fps;
        let fpsNum = Math.floor(time/1000 * fps);
        let index = 0;
        let sh = this.shape;
        let that = this;
        SG.default(this.wasm)
        .then(()=>{
            // let t0 = performance.now()
            // console.dir(t0)
            if(this.isNoise)
            {
                for(let i = 0;i < fps;i++)
                {
                    let img = SG.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+i*interval,sh.level,sh.gamma);
                    let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                    this.imgDataList.push(imgData)
                }
            }
            else{
                for(let i = 0;i < fps;i++)
                {
                    let img = SG.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+i*interval,sh.gamma);
                    let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                    this.imgDataList.push(imgData)
                }
            }
            // let t1 = performance.now();
            // console.dir(t1);
            // console.dir(t1-t0);
            (async ()=>{
                for(let i = 0;i < fpsNum;i++)
                {
                    index = i % fps;
                    that.ctx.putImageData(that.imgDataList[index],sh.x-1.5*sh.r,sh.y-1.5*sh.r);
                    await TIME.delay_frame(1);
                    that.remove();
                }
            })()
        })
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