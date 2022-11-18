import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface CircleShape extends Shape {
    x: number;
    y: number;
    r: number;
}
interface CircleOpts extends Opts {
    shape: CircleShape;
    style?: Style;
}
export declare class Circle extends Elements {
    readonly name?: nameStyle;
    shape: CircleShape;
    constructor(opts: CircleOpts);
}
export declare function makeCircle(circle: Circle, ctx: CanvasRenderingContext2D): Circle;
export declare function DrawDots([x, y, r]: [number, number, number], color: string): Circle;
export {};
