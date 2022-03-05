import { Class } from 'estree';
import { judgeElement } from '../Judge/judge'
import { Elements } from '../Element'

let groupId = 0;

export class Group extends Elements{
    id: number
    length: number
    // ctx: CanvasRenderingContext2D
    groupList: Elements[]|Group[]|Group
    
    constructor(el: Elements[]|Group[]|Group){

        super()

        this.ctx = super.ctx
        this.id = groupId;
        if(el instanceof Group)
        {
            this.length = 1
        }
        else{
            this.length = el.length;
        }
        this.groupList = el;

        groupId++ 
    }
}