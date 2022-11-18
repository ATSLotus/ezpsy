import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface ArcShape extends Shape {
    x: number;
    y: number;
    r: number;
    ang_f: number;
    ang_e: number;
}
interface ArcOpts extends Opts {
    shape: ArcShape;
    style?: Style;
}
export declare class Arc extends Elements {
    readonly name?: nameStyle;
    constructor(opts: ArcOpts);
}
export declare function makeArc(arc: Arc, ctx: CanvasRenderingContext2D): Arc;
export declare function FrameArc(arc: Arc, lineWidth?: number, stroke?: string): Arc;
export declare function FillArc(arc: Arc, fill?: string): Arc;
export {};
