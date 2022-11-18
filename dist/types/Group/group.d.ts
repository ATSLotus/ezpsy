import { Elements } from '../Element';
import { nameStyle } from '../DataType/dataType';
export declare class Group extends Elements {
    readonly name?: nameStyle;
    length: number;
    groupList: Elements[] | Group[] | Group;
    constructor(el: Elements[] | Group[] | Group);
}
