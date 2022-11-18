import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface PolygonShape extends Shape {
    xA: number[];
    yA: number[];
}
interface PolygonOpts extends Opts {
    shape: PolygonShape;
    style?: Style;
}
export declare class Polygon extends Elements {
    readonly name?: nameStyle;
    constructor(opts: PolygonOpts);
}
export declare function makePolygon(polygon: Polygon, ctx: CanvasRenderingContext2D): Polygon;
export declare function FramePoly(polygon: Polygon, lineWidth?: number, stroke?: string): Polygon;
export declare function FillPoly(polygon: Polygon, fill?: string): Polygon;
export {};
