export interface Shape {
    x?: number;
    y?: number;
    xEnd?: number;
    yEnd?: number;
    width?: number;
    height?: number;
    r?: number;
    ang_f?: number;
    ang_e?: number;
    ra?: number;
    rb?: number;
    xA?: number[];
    yA?: number[];
    text?: string;
    maxWidth?: number;
    img?: string;
    sx?: number;
    sy?: number;
    swidth?: number;
    sheight?: number;
    desity?: number;
    pixelsPerDegree?: number;
    spatialFrequency?: number;
    angle?: number;
    contrast?: number;
    phase?: number;
    level?: number;
    gamma?: number;
}
export interface Style {
    fill?: string | CanvasGradient;
    stroke?: string | CanvasGradient;
    lineWidth?: number;
    fontSize?: number | string;
    fontStyle?: number | string;
    fontWeight?: number | string;
    fontVariant?: boolean | string;
    fontFamily?: string;
}
export interface nameStyle {
    name: string;
    graphicId: number;
}
export interface Opts {
    shape?: Shape;
    style?: Style;
}
export interface Options {
    els: Array<string>;
}
