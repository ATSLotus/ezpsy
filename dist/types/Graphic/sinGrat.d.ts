import { Elements } from "../Element";
import { Shape, Opts, nameStyle, Style } from "../DataType/dataType";
interface GratShape extends Shape {
    x: number;
    y: number;
    r: number;
    pixelsPerDegree?: number;
    spatialFrequency?: number;
    angle?: number;
    contrast?: number;
    phase?: number;
    level?: number;
}
export interface GratOpts extends Opts {
    shape: GratShape;
    style?: Style;
    isNoise?: boolean;
}
export declare class sinGrat extends Elements {
    readonly name?: nameStyle;
    sinGrat: ImageData;
    imgDataList: Array<ImageData>;
    isNoise: boolean;
    constructor(opts: GratOpts);
    draw(): void;
    imNoise(level: any): void;
    play(timeFrequency: any, time: any): void;
    clear(ctx: any): void;
}
export {};
