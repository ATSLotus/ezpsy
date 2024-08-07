import { Elements } from "../Element";
import { Shape, Opts, Style } from "../DataType/dataType";

interface GratBGShape extends Shape {

}

interface GratBGStyle extends Style {
    luminance: number
}

interface GratBGOpts extends Opts {
    shape?: GratBGShape,
    style: GratBGStyle
}

function randomNoise(num: number) {
    const noise = (Math.floor(Math.random() * 1001) / 1000) - 0.5;

    const noisyValue = num + noise + 0.5;
    
    return Math.floor(noisyValue);
}

function noiseBit(num: number) {
    let res = num
    res = randomNoise(res)
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

function searchMap127(num: number) {
    const x = Math.floor(num / 10)
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

function calculatePixels(luminance: number) {
    const pixels = 2550 * luminance
    return searchMap127(noiseBit(pixels))
}

export class sinGratBG extends Elements {
    pixelsList: ImageData;
    luminance: number;
    constructor(opts: GratBGOpts) {
        super()
        if(opts.style.luminance < 0) {
            opts.style.luminance = -opts.style.luminance 
        }
        if(opts.style.luminance <= 1) {
            this.luminance = opts.style.luminance
        } else if(opts.style.luminance <= 255) {
            this.luminance = opts.style.luminance / 255
        } else {
            this.luminance = (opts.style.luminance % 255) / 255
        }
    }
    draw() {
        const ctx = this.ctx
        const canvas = ctx.canvas
        const w = canvas.width
        const h = canvas.height
        this.pixelsList = ctx.createImageData(w, h)
        for (let i = 0; i < this.pixelsList.data.length; i+=4) {
            const rgb = calculatePixels(this.luminance)
            this.pixelsList.data[i + 0] = rgb.r
            this.pixelsList.data[i + 1] = rgb.g
            this.pixelsList.data[i + 2] = rgb.b
            this.pixelsList.data[i + 3] = 255
        }
        this.ctx.putImageData(this.pixelsList, 0, 0)
    }
}