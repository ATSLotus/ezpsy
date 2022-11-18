export interface canvasStyle {
    width?: number;
    height?: number;
}
export declare function createCanvas(dom: HTMLElement, cStyle?: canvasStyle): CanvasRenderingContext2D;
