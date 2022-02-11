import { Class } from 'estree';
import { judgeElement } from '../Judge/judge'
import { Elements } from '../Element'

let groupId = 0;

export class Group{
    id: number
    length: number
    groupList: Elements[]|Group[]|Group
    
    constructor(el: Elements[]|Group[]|Group){

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