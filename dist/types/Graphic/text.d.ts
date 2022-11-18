import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
interface TextShape extends Shape {
    x: number;
    y: number;
    text: string;
    maxWidth?: number;
}
interface TextOpts extends Opts {
    shape: TextShape;
    style?: Style;
    textLine?: TextLine;
}
export interface TextLine {
    textA: CanvasTextAlign;
    textB: CanvasTextBaseline;
}
export declare class Texts extends Elements {
    readonly name?: nameStyle;
    constructor(opts: TextOpts);
    setTextLine(textLine: TextLine): void;
}
export declare function makeText(text: Texts, ctx: CanvasRenderingContext2D): Texts;
export declare function CatStr(strA: string[]): string;
export declare function StrPad(str: string, str0: string, num?: number): string;
export declare function streq(str0: string, str1: string): boolean;
export declare function Replace(str: string, str_o: string, str_r: string): string;
export {};
