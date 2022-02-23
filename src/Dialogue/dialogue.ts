import { DivStyle } from '../Div/div'
import * as ezDiv from '../Div/div'
import * as ezJudge from '../Judge/judge'
import { delay_frame } from '../Time/time'

let id = 0

export class Dialogue{
    id: number
    dom: HTMLElement
    domParent: HTMLElement
    dStyle?: DivStyle
    constructor(domParent: HTMLElement,dStyle?: DivStyle){
        [this.dom,this.dStyle] = ezDiv.createDiv(domParent,dStyle)
        this.domParent = domParent
        this.id = id++
    }
    errordlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
        // conStyle.img = '../src/image/error.png'
        createDlg(this,conStyle,['20px','70px','130px','210px'],"X",'red');
    }
    helpdlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Help Dialogue','This is default help string!')
        createDlg(this,conStyle,['20px','70px','130px','210px'],"!",'orange');
    }

}

export interface contentStyle{
    title: string
    content: string  
}

class Content{
    dom: HTMLElement
    domParent: HTMLElement
    dStyle: DivStyle
    constructor(domParent: HTMLElement,dStyle: DivStyle){
        this.dom = document.createElement('div')
        this.domParent = domParent
        this.dom.style.width = dStyle.width.toString()
        this.dom.style.height = dStyle.height.toString()
        this.dom.style.position = 'absolute'
        this.dom.style.lineHeight = dStyle.height.toString() + 'px'
        this.dom.style.textAlign = 'center'
        // // let h = this.domParent.clientHeight 
        // this.dom.style.background = 'black'
        this.domParent.append(this.dom)
    }
}

export function DlgInit(dom: HTMLElement,dStyle?: DivStyle) {
    let dlg = new Dialogue(dom,dStyle);
    return dlg;
}

function createDlg(dlg: Dialogue,conStyle: contentStyle,top: Array<string>,imgStr?: string,imgColor?: string){
    dlg.dom.style.visibility = 'visible'
    createDlgTitle(dlg,conStyle,top[0])
    createDlgContent(dlg,conStyle,top[1])
    if(top.length === 4)
    {
        createDlgImg(dlg,conStyle,top[2],imgStr,imgColor)
        createDlgConfirm(dlg,conStyle,top[3])
    }
    else if(top.length === 3)
    {
        createDlgConfirm(dlg,conStyle,top[2])
    }
    
}

function createDlgTitle(dlg: Dialogue,conStyle: contentStyle,top: string){
    let titleStyle = {
        width: dlg.dStyle.width,
        height: 50
    }
    let title = new Content(dlg.dom,titleStyle)
    console.dir(title)
    title.dom.innerText = conStyle.title
    title.dom.style.fontSize = '26px'
    title.dom.style.top = top
}

function createDlgContent(dlg: Dialogue,conStyle: contentStyle,top: string){
    let contentStyle = {
        width: dlg.dStyle.width,
        height: 50
    }
    let content = new Content(dlg.dom,contentStyle)
    content.dom.innerText = conStyle.content
    content.dom.style.fontSize = '20px'
    content.dom.style.top = top
}

function createDlgImg(dlg: Dialogue,conStyle: contentStyle,top: string,str: string,color: string){
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    }
    let imgDiv = new Content(dlg.dom,imgDivStyle)
    imgDiv.dom.style.top = top
    imgDiv.dom.style.display = 'flex'
    imgDiv.dom.style.justifyContent = 'center'
    let imgStyle = {
        width: 60,
        height: 60
    }
    let img = new Content(imgDiv.dom,imgStyle)
    img.dom.id = 'img'
    img.dom.innerText = str
    img.dom.style.fontSize = '54px'
    img.dom.style.color = 'white'
    img.dom.style.background = color
    // img.dom.style.border = '5px solid red'
    img.dom.style.borderRadius = '50%'
}

function createDlgConfirm(dlg: Dialogue,conStyle: contentStyle,top: string){
    let confirmDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    }
    let confirmDiv = new Content(dlg.dom,confirmDivStyle)
    confirmDiv.dom.style.top = top
    confirmDiv.dom.style.display = 'flex'
    confirmDiv.dom.style.justifyContent = 'center'
    let confirmStyle = {
        width: 120,
        height: 35
    }
    let confirm = new Content(confirmDiv.dom,confirmStyle)
    confirm.dom.style.background = 'white'
    confirm.dom.style.borderRadius = '10px'
    confirm.dom.style.boxShadow = '2px 2px 20px #888888'
    confirm.dom.innerText = 'OK'
    confirm.dom.style.fontSize = '22px'
    confirm.dom.onmousedown = function(){
        (async function(){
            confirm.dom.style.background = '#eeeeee'
            confirm.dom.style.boxShadow = '2px 2px 20px #008800'
            await delay_frame(10)
            let child = dlg.dom.lastElementChild
            while(child){
                dlg.dom.removeChild(child)
                child = dlg.dom.lastElementChild
            }
            dlg.dom.remove()
            await delay_frame(10)
		}())
    }
}

