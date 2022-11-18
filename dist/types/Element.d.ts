import { Shape, Style } from './DataType/dataType';
import { canvasStyle } from './Canvas/canvas';
import { nameStyle } from './DataType/dataType';
import { Storage } from './Storage/storage';
import { TextLine } from './Graphic/text';
export declare class Elements {
    readonly name?: nameStyle;
    shape?: Shape;
    style?: Style;
    textLine?: TextLine;
    ctx?: CanvasRenderingContext2D;
    storage?: Storage;
    scale?: Scale;
    translate?: Translate;
    rotate?: number;
    IsAnimation?: boolean;
    IsPause?: boolean;
    constructor();
    noFill(): void;
    noStroke(): void;
    setCanvasStyle(cStyle: canvasStyle): void;
    remove(): void;
    animate(func: Function, delay: number): void;
}
export interface Scale {
    width: number;
    height: number;
}
export interface Translate {
    x: number;
    y: number;
}
