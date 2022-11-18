import { Shape, Opts, Style, nameStyle } from '../DataType/dataType';
import { Elements } from '../Element';
interface GratingShape extends Shape {
    x: number;
    y: number;
    r: number;
    pixelsPerDegree?: number;
    spatialFrequency?: number;
    angle?: number;
    contrast?: number;
    phase?: number;
    level?: number;
    gamma?: number;
}
export interface GratingOpts extends Opts {
    shape: GratingShape;
    style?: Style;
    isNoise?: boolean;
}
export declare class sinGrating extends Elements {
    readonly name?: nameStyle;
    wasm: Object;
    param: Uint8Array;
    width: number;
    sinGrat: ImageData;
    imgDataList: Array<ImageData>;
    isNoise: boolean;
    constructor(opts: GratingOpts);
    draw(): Promise<void>;
    play(timeFrequency: any, time: any, fps: any): Promise<void>;
}
export {};
