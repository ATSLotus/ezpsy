import { Circle } from '../Graphic/circle';
import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface RandomDotShape extends Shape {
    x: number;
    y: number;
    r: number;
    maskBand?: number;
    number?: number;
    maxSpeed?: number;
    minSpeed?: number;
}
interface Point {
    x: number;
    y: number;
}
interface RandomDotOpts extends Opts {
    shape: RandomDotShape;
    style?: Style;
}
export declare class RandomDot extends Elements {
    readonly name?: nameStyle;
    shape?: RandomDotShape;
    RandomDotArray: Array<Circle>;
    maskBand: Circle;
    translation: Array<Point>;
    constructor(opts: RandomDotOpts);
}
export declare function playRandomDot(randomDot: RandomDot, ctx: CanvasRenderingContext2D): void;
export {};
