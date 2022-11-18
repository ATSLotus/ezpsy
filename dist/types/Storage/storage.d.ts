import { Elements } from "../Element";
import { nameStyle } from "../DataType/dataType";
import { TextLine } from "../Graphic/text";
import { Group } from "../Group/group";
export declare class Storage {
    ElementsList: Array<Elements>;
    textLine: TextLine;
    constructor();
    push(el: Elements | Array<Elements> | Group): void;
    remove(el: Elements | Array<Elements> | Group): void;
    getElementsName(el: Elements | Array<Elements> | Group): any[] | nameStyle;
    searchElementsName(name: nameStyle | Array<nameStyle>): number | any[];
    reDraw(ctx: CanvasRenderingContext2D): void;
}
