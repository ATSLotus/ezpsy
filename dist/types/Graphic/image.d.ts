import { Shape, Style, nameStyle, Opts } from '../DataType/dataType';
import { Elements } from '../Element';
import { Group } from '../Group/group';
interface ImgShape extends Shape {
    img: string;
    x: number;
    y: number;
    width?: number;
    height?: number;
    sx?: number;
    sy?: number;
    swidth?: number;
    sheight?: number;
}
interface ImgOpts extends Opts {
    shape: ImgShape;
    style?: Style;
    Img?: any;
    ImgData?: ImageData;
}
declare class RGBA {
    R: number;
    G: number;
    B: number;
    A: number;
}
declare class RGBA_Array {
    RGBA_List: RGBA[];
    width: number;
    height: number;
}
export declare class Img extends Elements {
    readonly name?: nameStyle;
    Img?: any;
    ImgData?: ImageData;
    IsChange?: boolean;
    greyImgData?: ImageData;
    constructor(opts: ImgOpts);
    init(): Promise<unknown>;
    toGray(): void;
    replace(): void;
}
export declare function makeImg(img: Img, ctx: CanvasRenderingContext2D): Img;
export declare function imRead(img: Img): ImageData;
export declare function UnpackColorImage(img: Img): RGBA_Array;
export declare function PackColorImage(rgba_arr: RGBA_Array): ImageData;
export declare function MaskImageIn(img: Img, alphaIn: number): Img;
export declare function MaskImageOut(img: Img, alphaIn: number): Img;
export declare function ImgInit(img: Img[] | Group): void;
export {};
