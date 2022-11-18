import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
import { Group } from '../Group/group';
interface LineShape extends Shape {
    x: number;
    y: number;
    xEnd: number;
    yEnd: number;
}
interface LineOpts extends Opts {
    shape: LineShape;
    style?: Style;
}
export declare class Line extends Elements {
    readonly name?: nameStyle;
    constructor(opts: LineOpts);
}
export declare function makeLine(line: Line, ctx: CanvasRenderingContext2D): Line;
export declare function DrawLines(el: Line[] | Group[] | Group): Group;
export declare function DrawMline([x, y, xEnd, yEnd]: [number, number, number, number], gap?: number[], style?: boolean, stipple?: boolean, widthGap?: number): Group;
export declare function LineStipple([x, y, xEnd, yEnd]: [number, number, number, number], widthGap?: number): Group;
export {};
