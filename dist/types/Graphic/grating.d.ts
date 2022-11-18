import { Elements } from "../Element";
import { nameStyle, Opts, Shape, Style } from "../DataType/dataType";
interface GratShape extends Shape {
    x: number;
    y: number;
    r: number;
    desity: number;
}
interface GratOpts extends Opts {
    shape: GratShape;
    style?: Style;
}
export declare class Grat extends Elements {
    readonly name?: nameStyle;
    constructor(opts: GratOpts);
    play(speed?: number, delay?: number): void;
}
export declare function makeGrat(grat: Grat, ctx: CanvasRenderingContext2D): Grat;
export {};
