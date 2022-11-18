/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-10-11 20:13:52
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 20:22:14
 * @Description: 
 * @FilePath: /ezpsy/src/Functions.ts
 */
import { nameStyle, Options } from "./DataType/dataType";
// import { Elements } from "./Element";

let nameId = 0;
class Functions{
    readonly name: nameStyle
    constructor(){
        this.name = {
            name: "Funtion"+nameId.toString(),
            graphicId: nameId
        }
        nameId++;
    }
}

export class RandomFunctions extends Functions{
    elements: Array<string>     //元素变量名
    private index: number
    constructor(options: Options){
        super();
        this.elements = options.els
        this.index = -1;
    }
    random(){
        this.index = Math.floor(Math.random()*this.elements.length);
    }
    setttings(){
        let object = `switch(${this.index}){\n`;
        for(let i = 0;i < this.elements.length;i++)
        {
            object += `\tcase ${i}: \n\t\tez.add(${this.elements[i]});\n\t\tbreak;\n`
        }
        object += `\tdefault:\n\t\tconsole.dir('error');\n}\n`
        return object;
    }
    run(){
        this.random()
        let code = this.setttings()
        console.dir(code)
        // eval(code)
        evals(code)
    }
    getIndex(){
        return this.index;
    }
}

function evals(str: string): Function{
    let F = Function;
    return new F(`"use strict";\n${str}`)();
}