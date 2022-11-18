import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface EllipseShape extends Shape {
    x?: number;
    y?: number;
    ra?: number;
    rb?: number;
}
interface EllipseOpts extends Opts {
    shape: EllipseShape;
    style?: Style;
}
export declare class Ellipse extends Elements {
    readonly name?: nameStyle;
    constructor(opts: EllipseOpts);
}
export declare function makeEllipse(ellipse: Ellipse, ctx: CanvasRenderingContext2D): Ellipse;
export declare function FillOval(ellipse: Ellipse, fill?: string): Ellipse;
export declare function FrameOval(ellipse: Ellipse, lineWidth?: number, stroke?: string): Ellipse;
export {};
