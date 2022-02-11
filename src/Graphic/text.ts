import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { judgeStyle_text, judgeTextStyle } from '../Judge/judge'

interface TextShape extends Shape{
    //顺时针填写坐标或顺绘制路线填写坐标
    x: number
    y: number
    text: string
    maxWidth?: number
}

interface TextOpts extends Opts{
    shape: TextShape
    style?: Style
}

let nameId = 0;

export class Text extends Elements{
    private name?: nameStyle = {
        name: "text" + nameId.toString(),
        graphicId: nameId
    }
    constructor(opts: TextOpts){
        super()
        this.shape = opts.shape;
        // console.dir(opts.style)
        if(opts.style)
        {
            this.style = opts.style;
        }
        else{
            this.style = {
                fontSize: '18px',
                fontVariant: 'normal',
                fontWeight: 'normal',
                fontStyle: 'normal'
            }
        }

        nameId++
    }
}

export function makeText(text: Text,ctx: CanvasRenderingContext2D): Text{

    ctx.beginPath()

    judgeTextStyle(text,ctx)

    judgeStyle_text(text,ctx)
    
    ctx.closePath()

    return text
}

export function CatStr(strA: string[]): string{
    let text = ''
    for(let i = 0;i < strA.length;i++)
    {
        text += strA[i];
    }
    return text
}

export function StrPad(str: string,str0: string,num?: number): string{
    let text = ''
    
    if(num === undefined || num === 0)
    {
        num = 1;
    }

    for(let i=0;i<num;i++)
    {
        text += str0
    }
    text += str

    return text
}

export function streq(str0: string,str1: string): boolean{
    let result = false
    result = str0.includes(str1);
    return result
}

export function Replace(str: string,str_o: string,str_r: string):string{
    let result = ''

    result = str.replace(new RegExp(str_o,'g'),str_r);

    return result
}