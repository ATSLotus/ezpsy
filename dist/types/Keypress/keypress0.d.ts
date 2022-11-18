export declare class Keypress {
    keyType: string;
    keyEvent: KeyboardEvent;
    key: Array<any>;
    keyCombination: Array<any>;
    constructor(keyType?: string);
    listen(key: string | number | Array<string> | Array<number>, fun?: Func | Function, IsDestroy?: boolean): Promise<RES>;
}
export declare function KeypressInit(keyType?: string): Keypress;
interface Func {
    funcList?: Array<Function>;
    complete?: Function;
}
interface RES {
    index: number;
    key: string;
}
export {};
