/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 17:36:15
 * @Description: 
 * @FilePath: /ezpsy/src/Group/group.ts
 */
import { Class } from 'estree';
import { judgeElement } from '../Judge/judge'
import { Elements } from '../Element'
import { nameStyle } from '../DataType/dataType';

let groupId = 0;

export class Group extends Elements{
    readonly name?: nameStyle = {
        name: "group" + groupId.toString(),
        graphicId: groupId
    }
    length: number
    // ctx: CanvasRenderingContext2D
    groupList: Elements[]|Group[]|Group
    
    constructor(el: Elements[]|Group[]|Group){

        super()

        // this.ctx = super.ctx
        // this.id = groupId;
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