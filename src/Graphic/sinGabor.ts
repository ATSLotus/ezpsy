import { Opts, Shape, Style, nameStyle } from "../DataType/dataType";
import { Elements } from "../Element";

interface sinGaborShape extends Shape{
    x: number
    y: number
    r: number
    pixelsPerDegree?: number 
    spatialFrequency?: number
    angle?: number 
    contrast?: number 
    phase?: number
    gamma?: number
    sigma?: number
}

export interface sinGaborOpts extends Opts{
    shape: sinGaborShape,
    style?: Style
}

let nameId = 0;

export class sinGabor extends Elements {
    readonly name?: nameStyle = {
        name: "singrat" + nameId.toString(),
        graphicId: nameId
    }
    sinGabor: ImageData
    shape: sinGaborShape = {
        x: 0,
        y: 0,
        r: 300,
        pixelsPerDegree: 57, 
        spatialFrequency: 2,
        angle: 0, 
        contrast: 1, 
        phase: 0,
        gamma: 0,
        sigma: 20,
    };
    constructor(opts: sinGaborOpts) {
        super()
        this.shape = opts.shape;
    }
    count() {
        let sh = this.shape;
        this.sinGabor = this.ctx.createImageData(sh.r, sh.r)
        const f = sh.spatialFrequency / this.ctx.canvas.width
        const sigma = sh.sigma
        const contrast = sh.contrast
        const bias = Math.PI

        for (let x = 0; x < sh.r; x++) {
            for (let y = 0; y < sh.r; y++) {
                const x0 = x - sh.r / 2;
                const y0 = y - sh.r / 2;
                const value = gabor(x0, y0, f, sigma, contrast, bias);
                const gray = Math.floor((value + 1) * 127.5); 
                const index = (y * sh.r + x) * 4;
                this.sinGabor.data[index] = gray; 
                this.sinGabor.data[index + 1] = gray; 
                this.sinGabor.data[index + 2] = gray;
                this.sinGabor.data[index + 3] = 255; 
            }
        }
        
    }
    draw() {
        this.ctx.putImageData(this.sinGabor, this.shape.x - 0.5 * this.shape.r, this.shape.y - 0.5 * this.shape.r)
    }
}

function gabor(x: number, y: number, f: number, sigma: number, contrast: number, bias: number) {
    const expPart = Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
    const sinusoid = Math.cos(2 * Math.PI * f * x + bias);
    return contrast * expPart * sinusoid;
}
