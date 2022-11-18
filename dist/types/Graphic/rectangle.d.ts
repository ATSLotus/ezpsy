import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Group } from '../Group/group';
import { Elements } from '../Element';
interface RectangleShape extends Shape {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface RectangleOpts extends Opts {
    shape: RectangleShape;
    style?: Style;
}
declare class Center {
    rect: Rectangle;
    x: number;
    y: number;
    constructor(rect: Rectangle);
}
declare class Size {
    rect: Rectangle;
    width: number;
    height: number;
    constructor(rect: Rectangle);
}
export declare class RectGroup extends Group {
    ParentsRect: Rectangle;
    constructor(rect: Rectangle, el: Elements[]);
}
export declare class Rectangle extends Elements {
    readonly name?: nameStyle;
    constructor(opts: RectangleOpts);
}
declare class logicRect extends Rectangle {
    rectParents0: Rectangle;
    rectParents1: Rectangle;
    constructor([x, y, width, height]: [number, number, number, number], rectParents0: Rectangle, rectParents1: Rectangle);
}
declare class clipRect extends logicRect {
    constructor([x, y, width, height]: [number, number, number, number], rectParents0: Rectangle, rectParents1: Rectangle);
}
declare class unionRect extends logicRect {
    constructor([x, y, width, height]: [number, number, number, number], rectParents0: Rectangle, rectParents1: Rectangle);
}
export declare function makeRectangle(rect: Rectangle, ctx: CanvasRenderingContext2D): Rectangle;
export declare function AdjoinRect(fixedRect: Rectangle, rect: Rectangle, fixedStyle?: string | number): Rectangle;
export declare function RectCenter(rect: Rectangle): Center;
export declare function AlignRect(fixedRect: Rectangle, rect: Rectangle, side0?: number | string, side1?: number | string): Rectangle;
export declare function OffsetRect(rect: Rectangle, [x, y]: [number, number]): Rectangle;
export declare function ArrangeRects(n: number, [xNumber, yNumber]: [number, number], windowRect: Rectangle, style?: number): RectGroup;
export declare function CenterRect(fixedRect: Rectangle, rect: Rectangle): Rectangle;
export declare function CenterRectOnPoint(rect: Rectangle, [x, y]: [number, number]): Rectangle;
export declare function RectWidth(rect: Rectangle): number;
export declare function RectHeight(rect: Rectangle): number;
export declare function RectSize(rect: Rectangle): Size;
export declare function ClipRect(rect0: Rectangle, rect1: Rectangle): clipRect;
export declare function IsInRect([x, y]: [number, number], rect: Rectangle): boolean;
export declare function GrowRect(el: Rectangle, h: number, v: number): Rectangle;
export declare function InsetRect(el: Rectangle, h: number, v: number): Rectangle;
export declare function ScaleRect(rect: Rectangle, h: number, v: number): Rectangle;
export declare function IsEmptyRect(rect: Rectangle): boolean;
export declare function RectOfMatrix(): void;
export declare function RectLeft(rect: Rectangle): number;
export declare function RectRight(rect: Rectangle): number;
export declare function RectTop(rect: Rectangle): number;
export declare function RectBotom(rect: Rectangle): number;
export declare function UnionRect(rect0: Rectangle, rect1: Rectangle): unionRect;
export declare function FillRect(rect: Rectangle, fill?: string): Rectangle;
export declare function FrameRect(rect: Rectangle, lineWidth?: number, stroke?: string): Rectangle;
export {};
