import { nameStyle, Options } from "./DataType/dataType";
declare class Functions {
    readonly name: nameStyle;
    constructor();
}
export declare class RandomFunctions extends Functions {
    elements: Array<string>;
    constructor(options: Options);
    random(): number;
    setttings(strArg: any): string;
    run(): number;
}
export {};
