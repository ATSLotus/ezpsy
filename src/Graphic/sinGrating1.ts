import { Shape,Opts,Style,nameStyle } from '../DataType/dataType'
import { Elements } from '../Element';
// import * as SG from '../../static/pkg/singrat'
import * as TIME from '../Time/time'
import { getWasm } from "../setWasm"
// import * as SG from '../setWasm'
import * as SGW from "../initWasm"

interface GratingShape extends Shape{
    x: number
    y: number
    r: number
    pixelsPerDegree?: number 
    spatialFrequency?: number
    timeFrequency?: number
    angle?: number 
    contrast?: number 
    phase?: number
    level?: number
    gamma?: number
}

export interface GratingOpts extends Opts{
    shape: GratingShape
    style?: Style
    isNoise?: boolean
    time?: number
}

let nameId = 0;

function searchMap124(num: number) {
    const x = Math.floor(num / 7)
    const rgb = {
        r: x,
        g: x,
        b: x
    }
    switch(num % 7) {
        case 0:
            break
        case 1: 
            rgb.b += 1
            break
        case 2: 
            rgb.r += 1
            break
        case 3:
            rgb.b += 1
            rgb.r += 1
            break
        case 4:
            rgb.g += 1
            break
        case 5:
            rgb.b += 1
            rgb.g += 1
            break
        case 6:
            rgb.r += 1
            rgb.g += 1
            break
        default:
            throw Error("Unknown Error")
    }
    return rgb
}

// function randomNoise(num: number) {
//     const noise = (Math.floor(Math.random() * 1001) / 1000) - 0.5;

//     const noisyValue = num + noise + 0.5;
    
//     return Math.floor(noisyValue);
// }

// function noiseBit(num: number) {
//     let res = num
//     res = randomNoise(res)
//     // res = randomInt(res)
//     return res
// }

export class sinGrating1 extends Elements{
    readonly name?: nameStyle = {
        name: "singrating" + nameId.toString(),
        graphicId: nameId
    }
    param: Uint8Array;
    width: number;
    sinGrat: ImageData;        //光栅图片数据
    imgDataList: Array<ImageData>;    //用于储存参与动画的图片
    isNoise: boolean;
    fps: number;
    timeFrequency: number
    constructor(opts: GratingOpts){
        super();
        this.shape = opts.shape;
        let sh = this.shape;
        this.width = 2*(sh.r/2+sh.r)+1;
        this.sinGrat = new ImageData(this.width,this.width);
        this.imgDataList = new Array<ImageData>();
        this.isNoise = opts.isNoise;
        this.shape.pixelsPerDegree = !this.shape.pixelsPerDegree ? 57 : this.shape.pixelsPerDegree
        this.shape.spatialFrequency = !this.shape.spatialFrequency ?  2 : this.shape.spatialFrequency
        this.shape.angle = !this.shape.angle ?  0 : this.shape.angle
        this.shape.contrast = this.shape.contrast === undefined ?  1 : this.shape.contrast
        this.shape.phase = !this.shape.phase ?  0 : this.shape.phase
        this.shape.level = !this.shape.level ?  0.5 : this.shape.level
        this.shape.gamma = !this.shape.gamma ?  1 : this.shape.gamma
        const timeFrequency = opts.shape.timeFrequency || 0
        this.timeFrequency = timeFrequency
        this.fps = 60
        
        nameId++;
    }
    async pre_draw() {
        const timeFrequency = this.timeFrequency
        let sh = this.shape;
        let param = []
        if(!timeFrequency) {
            if(this.isNoise) {
                param = SGW.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.level,sh.gamma);
            }
            else
                param = SGW.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase,sh.gamma);
            for (let i = 0, j = 0; i < this.sinGrat.data.length; i += 4, j++) {
                const rgb = searchMap124(param[j])
                this.sinGrat.data[i + 0] = rgb.r;
                this.sinGrat.data[i + 1] = rgb.g;
                this.sinGrat.data[i + 2] = rgb.b;
                this.sinGrat.data[i + 3] = 255;
            }
        } else {
            let interval = 2*Math.PI*timeFrequency/this.fps;
            let sh = this.shape;
            const array = new Array(Math.ceil(this.fps)).fill(0);
            if(this.isNoise)
            {
                await Promise.all(array.map(async (item, index) => {
                    let param = SGW.pre_noise_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+index*interval,sh.level,sh.gamma);
                    const img = new Array()
                    for (let i = 0, j = 0; i < this.sinGrat.data.length; i += 4, j++) {
                        img[i + 0] = param[j];
                        img[i + 1] = param[j];
                        img[i + 2] = param[j];
                        img[i + 3] = 255;
                    }
                    let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                    this.imgDataList[index] = imgData
                }))
            }
            else{
                await Promise.all(array.map(async (item, index) => {
                    const wasm = await getWasm()
                    let param = SGW.pre_singrat(sh.r,sh.pixelsPerDegree,sh.spatialFrequency,sh.angle,sh.contrast,sh.phase+index*interval,sh.gamma);
                    const img = new Array()
                    for (let i = 0, j = 0; i < this.sinGrat.data.length; i += 4, j++) {
                        img[i + 0] = param[j];
                        img[i + 1] = param[j];
                        img[i + 2] = param[j];
                        img[i + 3] = 255;
                    }
                    let imgData = new ImageData(new Uint8ClampedArray(img),this.width,this.width)
                    this.imgDataList[index] = imgData
                }))
            }
        }
    }
    async draw(time: number = 1000){
        let sh = this.shape;
        if(!this.timeFrequency) {
            this.ctx.putImageData(this.sinGrat,sh.x-1.5*sh.r,sh.y-1.5*sh.r)
        } else {
            const fps = this.fps
            let fpsNum = Math.floor(time / 1000 * fps);
            let index = 0;
            let sh = this.shape;
            let that = this;
            console.log(that.imgDataList[0]);
            await (async ()=>{
                for(let i = 0;i < fpsNum;i++) {
                    index = i % fps;
                    that.ctx.putImageData(that.imgDataList[index],sh.x-1.5*sh.r,sh.y-1.5*sh.r);
                    await TIME.delay_frame(1);
                    that.remove();
                }
            })();
        }
    }
    play(time: number = 1000) {
        const fps = this.fps
        let fpsNum = Math.floor(time / 1000 * fps);
        let index = 0;
        let sh = this.shape;
        let that = this;
        (async ()=>{
            for(let i = 0;i < fpsNum;i++)
            {
                index = i % fps;
                that.ctx.putImageData(that.imgDataList[index],sh.x-1.5*sh.r,sh.y-1.5*sh.r);
                await TIME.delay_frame(1);
                that.remove();
            }
        })()
    }
}