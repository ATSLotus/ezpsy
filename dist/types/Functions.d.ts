import { nameStyle, Options } from "./DataType/dataType";
declare class Functions {
    readonly name: nameStyle;
    constructor();
}
export declare class RandomFunctions extends Functions {
    elements: Array<string>;
    private index;
    constructor(options: Options);
    random(): void;
    setttings(): string;
    run(): void;
    getIndex(): number;
}
export {};
