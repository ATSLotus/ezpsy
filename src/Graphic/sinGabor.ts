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

        
        
    }
    draw() {
        this.ctx.putImageData(this.sinGabor, this.shape.x - 0.5 * this.shape.r, this.shape.y - 0.5 * this.shape.r)
    }
}
