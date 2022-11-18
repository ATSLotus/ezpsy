/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-10-11 20:13:52
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 21:34:26
 * @Description: 
 * @FilePath: /ezpsy/src/Functions.ts
 */
import { nameStyle, Options } from "./DataType/dataType";
import { Elements } from "./Element";
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
    elements: Array<Function>     //元素变量名
    private index: number
    constructor(options: Options){
        super();
        // console.dir(this.ez)
        this.elements = options.els;
        this.index = -1;
    }
    random(){
        this.index = Math.floor(Math.random()*this.elements.length);
        return this.index
    }
    // setttings(){
    //     // let object = `let ez = ${this.ez};\n`;
    //     // for(let i = 0;i < this.elements.length;i++)
    //     // {
    //     //     let el = {...this.elements[i]};
    //     //     object += `let e${i} = ${el};\n`
    //     // }
    //     // object += `switch(${this.index}){\n`
    //     // for(let i = 0;i < this.elements.length;i++)
    //     // {
    //     //     object += `\tcase ${i}: \n\t\tez.add(e${i});\n\t\tbreak;\n`
    //     // }
    //     // object += `\tdefault:\n\t\tconsole.dir('error');\n}\n`
    //     let object = `switch(${this.index}){\n`
    //     for(let i = 0;i < this.elements.length;i++)
    //     {
    //         object += `\tcase ${i}: \n\t\t${this.elements[i]}();\n\t\tbreak;\n`
    //     }
    //     object += `\tdefault:\n\t\tconsole.dir('error');\n}\n`
    //     return object;
    // }
    run(){
        let x = this.random()
        this.elements[x]()
        // let code = this.setttings()
        // console.dir(code)
        // // eval(code)
        // evals(code)
    }
    getIndex(){
        return this.index;
    }
}

function evals(str: string): Function{
    let F = Function;
    return new F(`"use strict";\n${str}`)();
}