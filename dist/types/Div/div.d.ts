export interface DivStyle {
    width?: number;
    height?: number;
    border?: string;
    borderRadius?: string;
}
export declare function createDiv(dom: HTMLElement, dStyle: DivStyle): [HTMLElement, DivStyle];
