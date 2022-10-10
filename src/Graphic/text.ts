import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { judgeStyle_text, judgeTextStyle, judgeTRS } from '../Judge/judge'

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
    textLine?: TextLine
}

export interface TextLine{
    textA: CanvasTextAlign
    textB: CanvasTextBaseline
}

let nameId = 0;

export class Texts extends Elements{
    readonly name?: nameStyle = {
        name: "text" + nameId.toString(),
        graphicId: nameId
    }
    constructor(opts: TextOpts){
        super()
        this.shape = opts.shape;
        this.ctx = super.ctx
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

        if(opts.textLine)
        {
            this.textLine = opts.textLine;
        }
        else{
            this.textLine = {
                textA: 'start',
                textB: 'alphabetic'
            }
        }

        nameId++
    }
    setTextLine(textLine: TextLine){
        if(textLine)
        {
            if(textLine.textA)
            {
                this.textLine.textA = textLine.textA
            }
            if(textLine.textB)
            {
                this.textLine.textB = textLine.textB
            }
        }
    }
}

export function makeText(text: Texts,ctx: CanvasRenderingContext2D): Texts{

    ctx.save()
    ctx.beginPath()

    ctx.textAlign = text.textLine.textA
    ctx.textBaseline = text.textLine.textB

    judgeTextStyle(text,ctx)

    judgeTRS(text)

    judgeStyle_text(text,ctx)

    
    
    ctx.closePath()
    ctx.restore()
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