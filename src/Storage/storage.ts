import { Elements } from "../Element";
import { nameStyle } from "../ezpsy";
import { Group } from "../Group/group";
import * as ezJudge from '../Judge/judge'


export class Storage{
    ElementsList: Array<Elements>
    constructor(){
        this.ElementsList = [];
    }
    push(el: Elements | Array<Elements> | Group){
        if(el instanceof Elements || el instanceof Group)
        {
            this.ElementsList.push(el)
        }
        else
        {
            for(let i = 0;i < el.length;i++)
            {
                this.ElementsList.push(el[i]);
            }
        }
    }
    remove(el: Elements | Array<Elements> | Group){
        let name = this.getElementsName(el);
        let index = this.searchElementsName(name);
        if(index instanceof Array)
        {
            for(let i = 0;i < index.length;i++)
            {
                this.ElementsList.splice(index[i],1);
            }
        }
        else{
            this.ElementsList.splice(index,1);
        }
    }
    getElementsName(el: Elements | Array<Elements> | Group){
        if(el instanceof Elements || el instanceof Group)
        {
            let name = el.name;
            return name
        }
        else
        {
            let name = new Array()
            for(let i = 0;i < el.length;i++)
            {
                name[i] = el[i].name
            }
            return name
        }
    }
    searchElementsName(name: nameStyle | Array<nameStyle>){
        if(name instanceof Array)
        {
            let index = new Array()
            for(let i = 0;i < name.length;i++)
            {
                for(let t = 0;t < this.ElementsList.length;t++)
                {
                    if(name[i].name === this.ElementsList[t].name.name)
                    {
                        index[i] = t;
                        break;
                    }
                }
            }
            return index
        }
        else{
            let index = 0;
            for(let t = 0;t < this.ElementsList.length;t++)
            {
                if(name.name === this.ElementsList[t].name.name)
                {
                    index = t;
                    break;
                }
            }
            return index;
        }
    }
    reDraw(ctx: CanvasRenderingContext2D){
        let el = this.ElementsList
        for(let i = 0;i < el.length;i++)
        {
            el[i].ctx = ctx
            ezJudge.judgeElement(el[i],ctx)
        }
    }
}