import { Elements } from "../Element";
import { nameStyle } from "../DataType/dataType";
import { TextLine } from "../Graphic/text";
import { RandomDot } from "../Graphic/randomDot";
import { Group } from "../Group/group";
import * as ezJudge from '../Judge/judge'


export class Storage{
    // ElementsList: Array<Elements>
    ElementList: Map<nameStyle, Elements>
    textLine: TextLine
    constructor(){
        // this.ElementsList = [];
        this.ElementList = new Map<nameStyle, Elements>()
    }
    push(el: Elements | Array<Elements> | Group){
        if(el instanceof Elements || el instanceof Group)
        {
            // this.ElementsList.push(el)
            this.ElementList.set(el.name, el)
        }
        else
        {
            for(let i = 0;i < el.length;i++)
            {
                // this.ElementsList.push(el[i]);
                this.push(el[i])
            }
        }
    }
    remove(el: Elements | Array<Elements> | Group){
        // let name = this.getElementsName(el);
        // let index = this.searchElementsName(name);
        // if(index !== undefined)
        // {
        //     if(index instanceof Array)
        //     {
        //         // index.sort();
        //         index.sort((a,b)=>{
        //             if(a>b)
        //               return 1;
        //             else if (a<b)
        //               return -1;
        //             else 
        //               return 0;
        //         })
        //         for(let i = index.length-1;i >= 0;i--)
        //         {
        //             this.ElementsList.splice(index[i],1);
        //         }
        //     }
        //     else{
        //         this.ElementsList.splice(index,1);
        //     }
        // }
        if(el instanceof Array) {
            for(let i = 0; i < el.length; i++) {
                this.remove(el[i])
            }
        } else {
            this.ElementList.delete(el.name)
        }
    }
    // getElementsName(el: Elements | Array<Elements> | Group){
    //     if(el instanceof Elements || el instanceof Group)
    //     {
    //         let name = el.name;
    //         return name
    //     }
    //     else
    //     {
    //         let name = new Array()
    //         for(let i = 0;i < el.length;i++)
    //         {
    //             name[i] = el[i].name
    //         }
    //         return name
    //     }
    // }
    // searchElementsName(name: nameStyle | Array<nameStyle>){
    //     if(name instanceof Array)
    //     {
    //         let index = new Array()
    //         for(let i = 0;i < name.length;i++)
    //         {
    //             for(let t = 0;t < this.ElementsList.length;t++)
    //             {
    //                 if(name[i].name === this.ElementsList[t].name.name)
    //                 {
    //                     index[i] = t;
    //                     break;
    //                 }
    //             }
    //         }
    //         return index
    //     }
    //     else{
    //         let index = -1;
    //         for(let t = 0;t < this.ElementsList.length;t++)
    //         {
    //             if(name.name === this.ElementsList[t].name.name)
    //             {
    //                 index = t;
    //                 break;
    //             }
    //         }
    //         return index;
    //     }
    // }
    reDraw(ctx: CanvasRenderingContext2D){
        // let el = this.ElementsList 
        // for(let i = 0;i < el.length;i++)
        // {
        //     el[i].ctx = ctx
        //     // if(el[i] instanceof RandomDot)
        //     // {
        //     //     let randomDot:RandomDot = <RandomDot>el[i];
        //     //     randomDot.maskBand.ctx = ctx;
        //     //     ezJudge.judgeElement(randomDot.maskBand,ctx);
        //     //     for(let index = 0;index < randomDot.RandomDotArray.length;index++)
        //     //     {
        //     //         randomDot.RandomDotArray[index].ctx = ctx;
        //     //         ezJudge.judgeElement(randomDot.RandomDotArray[index],ctx)
        //     //     }
        //     // }
        //     // else{
        //         ezJudge.judgeElement(el[i],ctx)
        //     // }
        // }
        this.ElementList.forEach((value, _key) => {
            value.ctx = ctx
            ezJudge.judgeElement(value, ctx)
        })
    }
}