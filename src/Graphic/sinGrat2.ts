import { Elements } from "../Element";
import { delay_frame } from "../Time/time";
import { Shape,Opts,nameStyle,Style } from "../DataType/dataType";


interface GratShape extends Shape{
    x: number,
    y: number,
    r: number,
    pixelsPerDegree?: number, 
    spatialFrequency?: number,
    angle?: number, 
    contrast?: number, 
    phase?: number,
    level?: number
}

export interface GratOpts extends Opts{
    shape: GratShape,
    style?: Style,
    isNoise?: boolean
}

let nameId = 0;

//光栅
//pixelsPerDegree=57, spatialFrequency=1 对应一度视角
export class sinGrat2 extends Elements{
    readonly name?: nameStyle = {
        name: "singrat" + nameId.toString(),
        graphicId: nameId
    }
    sinGrat: ImageData;        //光栅图片数据
    imgDataList: Array<ImageData>;    //用于储存参与动画的图片
    isNoise: boolean;
    // singratParam;   //用于储存 左上角坐标, 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位等信息
    // level;          //噪声等级(此类型默认为0)
    constructor(opts: GratOpts){
        //x,y为光栅的左上角坐标, 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位
        super();
        this.shape = opts.shape;
        // let sh = this.shape;
        if(!opts.isNoise)
            this.isNoise = false
        else
            this.isNoise = opts.isNoise
        
        this.imgDataList = new Array<ImageData>();
        nameId++;
    }
    count() {
        let sh = this.shape;
        if(!this.isNoise)
            this.sinGrat = getSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.gamma)
        else{
            this.sinGrat = getNoiseSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.level, sh.gamma)    
        }
    }
    async pre_draw() {
        let sh = this.shape;
        if(!this.isNoise)
            this.sinGrat = getSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.gamma)
        else{
            if(!sh.level)
                sh.level = 1
            this.sinGrat = getNoiseSingrat(sh.r, sh.pixelsPerDegree, sh.spatialFrequency, sh.angle, sh.contrast, sh.phase, sh.level, sh.gamma)    
        }
    }
    //绘制方法, 参数ctx为canvas.getContext('2d')
    draw(){
        let sh = this.shape;
        this.ctx.putImageData(this.sinGrat,this.shape.x - 1.5 * this.shape.r,this.shape.y - 1.5 * this.shape.r)
    }
    //给原有光栅加上噪声, 参数level为噪声等级
    imNoise(level){
        let th = this.shape
        this.isNoise = true
        this.sinGrat = getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase, level, th.gamma)
        th.level = level;
    }
    //运动方法, 参数ctx为canvas.getContext('2d') 参数cycle为每秒运行光栅的周期数(默认为1)
    play(timeFrequency,time){
        if(!timeFrequency)
            timeFrequency = 1;
        if(!time)
            time = 1000;
        let fps = 60;
        let fpsnum = Math.floor(time/1000 * fps);
        let interval = 2*Math.PI*timeFrequency/fps;
        let that = this;
        let ctx = this.ctx;
        // let num = Math.floor(60/timeFrequency);
        let th = this.shape
        for(let i = 0;i < fps;i++)
        {
            if(this.isNoise)
                this.imgDataList.push(getNoiseSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase+i*interval, this.shape.level, this.shape.gamma))
            else
                this.imgDataList.push(getSingrat(th.r, th.pixelsPerDegree, th.spatialFrequency, th.angle, th.contrast, th.phase+i*interval, this.shape.gamma))
        }
        //异步函数
        (async function(){
            for(let i = 0;i < fpsnum;i++)
            {
                // i = i%fps;
                let index = i%fps;
                ctx.putImageData(that.imgDataList[index],that.shape.x - 1.5 * that.shape.r,that.shape.y - 1.5 * that.shape.r)
                // console.dir(that.storage)
                await delay_frame(1);
                that.clear()
            }
        })()    
    }
    //清除光栅所在位置的矩形区域
    clear()
    {
        const ctx = this.ctx
        let width = 2*(1.5*this.shape.r)+1
        let height = 2*(1.5*this.shape.r)+1
        ctx.clearRect(this.shape.x - 1.5 * this.shape.r,this.shape.y - 1.5 * this.shape.r,width,height);
    }
}

//生成噪声光栅, 参数: 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位, 噪声等级
//返回imageData图片信息
function getNoiseSingrat(radius, pixelsPerDegree, spatialFrequency, angle, contrast, phase, level, gamma)
{
    let c = document.createElement('canvas');
    c.width = window.innerWidth
    c.height = window.innerHeight
    let ctx = c.getContext('2d')
    if(level === undefined)
        level = 1;
    if(level > 1)
        level = 1
    let maskBand = 0.5 * radius;
    let imagesize = radius + maskBand;
    let width = 2 * imagesize + 1
    let [x, y] = meshgrid(imagesize);
    let mask = new Array();
    for(let i = 0;i < width * width;i++)
    {
        let m = Math.pow(x[i],2)+Math.pow(y[i],2);
        let n = Math.pow(radius,2);
        mask[i] = Math.exp(-m/n * 4) * Math.exp(4);
        if(mask[i] >= 1)
            mask[i] = 1;
    }
    let w = 2 * Math.PI * spatialFrequency / pixelsPerDegree;
    let a = Math.cos(angle * Math.PI / 180) * w;
    let b = Math.sin(angle * Math.PI / 180) * w;
    let noise = get_noise(width);
    const NoiseGratDegree = new Array()
    const noiseSinGrat = ctx.createImageData(width, width)
    for (let i = 0; i < mask.length; i++) {
        let p = (1 - level)*(0.5 + 0.5 * contrast * mask[i] * Math.sin(a * x[i] + b * y[i] + phase)) + level * (0.5 + 0.5 * mask[i] * noise[i] / 255)
        p = Math.pow(p, 1/gamma)
        p = 255 * p
        NoiseGratDegree[i] = Math.min(Math.floor(p), 255)
    }
    for (let i=0,j=0;i<noiseSinGrat.data.length;i+=4,j++) {
        noiseSinGrat.data[i + 0] = NoiseGratDegree[j];
        noiseSinGrat.data[i + 1] = NoiseGratDegree[j];
        noiseSinGrat.data[i + 2] = NoiseGratDegree[j];
        noiseSinGrat.data[i+3] = 255;
    }
    return noiseSinGrat;
}

//光栅加噪声, 参数: 光栅灰度信息, 噪声灰度信息, 半径, 噪声等级
//返回imageData图片信息
function GratAddNoise(param,noise,radius,level){
    let c = document.createElement('canvas');
    c.width = window.innerWidth
    c.height = window.innerHeight
    let ctx = c.getContext('2d')
    let NoiseGratDegree = new Array()
    let i = 0;
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let M = 2*imagesize+1;
    let NoiseGrat = ctx.createImageData(M,M);
    let [x, y] = meshgrid(imagesize);
    let mask = new Array();
    for(let i = 0;i < x.length;i++)
    {
        let m = Math.pow(x[i],2)+Math.pow(y[i],2);
        let n = Math.pow(radius,2);
        mask.push(Math.exp(-m/n));
        mask[i] *= Math.E;
        if(mask[i] >= 1)
            mask[i] = 1;
    }
    //相加
    for(i = 0;i < M*M;i++){
        if(param[i]>0.5)
            NoiseGratDegree[i] = 0.5+level*noise[i]
        else
            NoiseGratDegree[i] = (param[i]+level*noise[i])
            // NoiseGratDegree[i] = NoiseGratDegree[i]+0.5*mask[i] 
    }
    for (let i=0,j=0;i<NoiseGrat.data.length;i+=4,j++)
    {
        NoiseGrat.data[i+0]=NoiseGratDegree[j]*255;
        NoiseGrat.data[i+1]=NoiseGratDegree[j]*255;
        NoiseGrat.data[i+2]=NoiseGratDegree[j]*255;
        NoiseGrat.data[i+3]=255;
    }
    // NoiseGrat = ToCircle(NoiseGrat,radius)
    return NoiseGrat;
}

//生成噪声图片, 参数: 半径
//返回噪声灰度数组
function getNoise(radius){
    let noise = new Array()
    let mask = new Array();
    let maskBand = 1.5 * radius;
    let imagesize = radius + maskBand;
    let [x, y] = meshgrid(imagesize);
    for(let i = 0;i < x.length;i++)
    {
        let m = Math.pow(x[i],2)+Math.pow(y[i],2);
        let n = Math.pow(radius,2);
        mask.push(Math.exp(-m/n));
        mask[i] *= Math.E;
        if(mask[i] >= 1)
            mask[i] = 1;
    }
    for(let i = 0;i < mask.length;i++)
    {
        let greyDegree = mask[i] * Math.floor(Math.random() * 256) / 255;
        noise.push(greyDegree)
    }
    return noise;
}

function get_noise(width) {
    const greyDegree = new Array()
    for(let i = 0; i < width * width; i++) {
        greyDegree[i] = Math.random() * 256
    }
    return greyDegree
}

function randomInt(num: number) {
    const random = num - Math.floor(num)
    let res = num
    if(Math.random() <= random)
        res = Math.ceil(num)
    else
        res = Math.floor(num)
    return res
}

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

function searchMap112(num: number) {
    const x = Math.floor(num / 7)
    const rgb = {
        r: x,
        g: x,
        b: x
    }
    const random = Math.floor(Math.random() * 2)
    switch(num % 4) {
        case 0:
            break
        case 1: 
            if(random)
                rgb.b += 1
            else
                rgb.r += 1
            break
        case 2: 
            rgb.g += 1
            break
        case 3:
            if(random)
                rgb.b += 1
            else
                rgb.r += 1
            rgb.g += 1
            break
        default:
            throw Error("Unknown Error")
    }
    return rgb
}

function searchMap136(num: number) {
    const x = Math.floor(num / 10)
    const rgb = {
        r: x,
        g: x,
        b: x
    }
    switch(num % 10) {
        case 0:
            break
        case 1: 
            rgb.b += 1
            break
        case 2: 
            rgb.r += 1
            rgb.b -= 1
            break
        case 3:
            rgb.r += 1
            break
        case 4:
            rgb.b += 1
            rgb.r -= 1
            rgb.g += 1
            break
        case 5:
            rgb.b -= 1
            rgb.g += 1
            break
        case 6:
            rgb.g += 1
            break
        case 7:
            rgb.b += 1
            rgb.g += 1
            break
        case 8:
            rgb.b -= 1
            rgb.r += 1
            rgb.g += 1
            break
        case 9:
            rgb.r += 1
            rgb.g += 1
            break
        default:
            throw Error("Unknown Error")
    }
    return rgb
}

function searchMap127(num: number) {
    const x = Math.floor(num / 10)
    const rgb = {
        r: x,
        g: x,
        b: x
    }
    switch(num % 10) {
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
            rgb.b -= 1
            rgb.r -= 1
            rgb.g += 1
            break
        case 5:
            rgb.r -= 1
            rgb.g += 1
            break
        case 6:
            rgb.b -= 1
            rgb.g += 1
            break
        case 7:
            rgb.g += 1
            break
        case 8:
            rgb.b += 1
            rgb.g += 1
            break
        case 9:
            rgb.r += 1
            rgb.g += 1
            break
        default:
            throw Error("Unknown Error")
    }
    return rgb
}

function jitter(value) {
    return Math.max(0, Math.min(255, value + Math.floor(Math.random() * 5) - 2));
}

function randomNoise(num: number) {
    const noise = (Math.floor(Math.random() * 1001) / 1000) - 0.5;

    const noisyValue = num + noise + 0.5;
    
    return Math.floor(noisyValue);
}

function noiseBit(num: number) {
    let res = num
    res = randomNoise(res)
    // res = randomInt(res)
    return res
}

//生成光栅 参数: 半径, pixelsPerDegree, spatialFrequency, 角度, 对比度, 相位
//返回imageData图片信息
function getSingrat(radius, pixelsPerDegree, spatialFrequency, angle, contrast, phase, gamma) {
    let c = document.createElement('canvas');
    c.width = window.innerWidth
    c.height = window.innerHeight
    let ctx = c.getContext('2d')
    let maskBand = 0.5 * radius;
    let imagesize = radius + maskBand;
    let [x, y] = meshgrid(imagesize);
    let w = 2 * Math.PI * spatialFrequency / pixelsPerDegree;
    let a = Math.cos(angle * Math.PI / 180) * w;
    let b = Math.sin(angle * Math.PI / 180) * w;
    const width = 2 * imagesize + 1
    let mask = new Array();
    for(let i = 0;i < width * width;i++)
    {
        let m = Math.pow(x[i],2)+Math.pow(y[i],2);
        let n = Math.pow(radius,2);
        mask[i] = Math.exp(-m/n * 4)*Math.exp(4);
        if(mask[i] >= 1)
            mask[i] = 1;
    }
    const gratDegree = new Array()
    for (let i = 0; i < mask.length; i++) {
        let p = 0.5 + 0.5 * contrast * mask[i] * Math.sin(a * x[i] + b * y[i] + phase);
        p = Math.pow(p, 1/gamma)
        p = 1785 * p
        // p = 2550 * p
        // p = 255 * p
        gratDegree[i] = p
    }
    let imgData = ctx.createImageData(imagesize * 2 + 1, imagesize * 2 + 1);
    for (let i = 0, j = 0; i < imgData.data.length; i += 4, j++) {
        const rgb = searchMap124(noiseBit(gratDegree[j]))
        // imgData.data[i + 0] = noiseBit(gratDegree[j]);
        // imgData.data[i + 1] = noiseBit(gratDegree[j]);
        // imgData.data[i + 2] = noiseBit(gratDegree[j]);
        imgData.data[i + 0] = rgb.r;
        imgData.data[i + 1] = rgb.g;
        imgData.data[i + 2] = rgb.b;
        // imgData.data[i + 0] = gratDegree[j];
        // imgData.data[i + 1] = gratDegree[j];
        // imgData.data[i + 2] = gratDegree[j];
        imgData.data[i + 3] = 255;
    }
    return imgData;
}

//弃用     将矩形光栅制成圆形
function ToCircle(imgData,radius){
    // let m = 0;
    // let R = radius;
    // for(let y = 0;y < imgData.height;y++)
    // {
    //     for(let x = 0;x < imgData.width;x++)
    //     {
    //         m = Math.sqrt(Math.pow(x-radius,2) + Math.pow(y-radius,2));
    //         if(m >= R)
    //         {
    //             imgData.data[4*y*imgData.width+4*x+3] = 0;
    //         }
    //     }
    // }
    let c = document.createElement('canvas');
    c.width = window.innerWidth
    c.height = window.innerHeight
    let ctx = c.getContext('2d')
    ctx.putImageData(imgData,0,0)
    ctx.globalCompositeOperation = 'destination-atop'
    ctx.arc(radius+0.5,radius+0.5,radius,0,2*Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill()
    imgData = ctx.getImageData(0,0,2*radius+1,2*radius+1)

    return imgData;
}

//生成二阶高斯分布 参数: 半径
//返回二阶分布值的数组
function mask(radius){
    let maskBand = radius;
    let imagesize = radius + maskBand;
    let [x,y] = meshgrid(imagesize);
    let mask = new Array();
    for(let i = 0;i < x.length;i++)
    {
        let m = Math.pow(x[i],2)+Math.pow(y[i],2);
        let n = Math.pow(radius,2);
        mask.push(Math.exp(-m/n));
        mask[i] *= Math.E;
        if(mask[i] >= 1)
            mask[i] = 1;
    }
    return mask;
}

//生成网格采样点 参数: 半径
//返回x, y两个采样数组
function meshgrid(radius) {
    let x = new Array();
    let y = new Array();
    for (let i = -radius, k = 0; i <= radius; i++, k++) {
        for (let j = -radius, t = 0; j <= radius; j++, t++) {
            x[(2*radius+1)*k + t] = i;
            y[(2*radius+1)*k + t] = j;
        }
    }
    return [x, y];
}