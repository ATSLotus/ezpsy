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
    statusValue: boolean    //按钮点击状态 true为选择是 false为选择否或取消
    constructor(domParent: HTMLElement,dStyle?: DivStyle){
        [this.dom,this.dStyle] = ezDiv.createDiv(domParent,dStyle)
        this.statusValue = false
        this.domParent = domParent
        this.id = id++
    }
    errordlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
        createDlg(this,conStyle,['20px','70px','130px','210px'],"X",'red');
    }
    helpdlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Help Dialogue','This is default help string!')
        createDlg(this,conStyle,['20px','70px','130px','210px'],"!",'orange');
    }
    msgbox(conStyle?: contentStyle,model?: string){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
        let [str,color] = ezJudge.judgeModel(model)
        createDlg(this,conStyle,['20px','70px','130px','210px'],str,color);
    }
    questdlg(conStyle?: contentStyle,str?: Array<string>){
        conStyle = ezJudge.judgeContentStyle(conStyle,"Quset Dialogue",'This is default error string!')
        createDlg(this,conStyle,['20px','70px','130px','210px'],"?",'grey',str);
    }
    remove(){
        let child = this.dom.lastElementChild
        while(child){
            this.dom.removeChild(child)
            child = this.dom.lastElementChild
        }
        this.dom.remove()
    }
}

export interface contentStyle{
    title?: string
    content?: string  
    img?: string
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

function createDlg(dlg: Dialogue,conStyle: contentStyle,top: Array<string>,imgStr?: string,imgColor?: string,str?: Array<string>){
    dlg.dom.style.visibility = 'visible'
    createDlgTitle(dlg,conStyle,top[0])
    createDlgContent(dlg,conStyle,top[1])
    if(top.length === 4)
    {
        if(!conStyle.img)
        {
            createDlgImg(dlg,conStyle,top[2],imgStr,imgColor)
        }
        else{
            createDlgImg0(dlg,conStyle,top[2],imgStr,imgColor)
        }
        // createDlgConfirm(dlg,conStyle,top[3],false)
        createDlgBtnDiv(dlg,conStyle,top[3],str)
    }
    else if(top.length === 3)
    {
        // createDlgConfirm(dlg,conStyle,top[2],false)
        createDlgBtnDiv(dlg,conStyle,top[2],str)
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
    title.dom.style.fontWeight = 'bold'
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

function createDlgImg0(dlg: Dialogue,conStyle: contentStyle,top: string,str: string,color: string){
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
    let img = document.createElement('img')
    img.width = 60
    img.height = 60
    img.src = conStyle.img
    imgDiv.dom.append(img)
}

function createDlgBtnDiv(dlg: Dialogue,conStyle: contentStyle,top: string,str?: Array<string>){
    let BtnDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    }
    let BtnDiv = new Content(dlg.dom,BtnDivStyle)
    BtnDiv.dom.style.top = top
    BtnDiv.dom.style.display = 'flex'
    if(!str)
    {
        str = ['OK']
    }
    if(str.length === 1)
    {
        BtnDiv.dom.style.justifyContent = 'center'
        createDlgBtn(dlg,BtnDiv,str[0],false,120)
    }
    else{
        BtnDiv.dom.style.justifyContent = 'space-evenly'
        let f = false
        for(let i = 0;i < str.length;i++)
        {
            if(i === 0)
            {
                f = true
            }
            else{
                f = false
            }
            createDlgBtn(dlg,BtnDiv,str[i],f,100)
        }
    }
}

function createDlgBtn(dlg: Dialogue,BtnDiv: Content,str: string,status: boolean,width: number){
    let btnStyle = {
        width: width,
        height: 35
    }
    let btn = new Content(BtnDiv.dom,btnStyle)
    btn.dom.style.position = 'relative'
    btn.dom.style.background = 'white'
    btn.dom.style.borderRadius = '10px'
    btn.dom.style.boxShadow = '2px 2px 20px #888888'
    btn.dom.innerText = str
    btn.dom.style.fontSize = '22px'
    btn.dom.onmousedown = function(){
        (async function(){
            btn.dom.style.background = '#eeeeee'
            btn.dom.style.boxShadow = '2px 2px 20px #008800'
            await delay_frame(10)
            dlg.remove()
            dlg.statusValue = status 
            await delay_frame(10)
            console.dir(dlg.statusValue)
		}())
    }
}

// function createDlgConfirm(dlg: Dialogue,conStyle: contentStyle,top: string,IsNeedStatus: boolean){
//     let confirmDivStyle = {
//         width: dlg.dStyle.width,
//         height: 35
//     }
//     let confirmDiv = new Content(dlg.dom,confirmDivStyle)
//     confirmDiv.dom.style.top = top
//     confirmDiv.dom.style.display = 'flex'
//     confirmDiv.dom.style.justifyContent = 'center'
//     let confirmStyle = {
//         width: 120,
//         height: 35
//     }
//     let confirm = new Content(confirmDiv.dom,confirmStyle)
//     confirm.dom.style.background = 'white'
//     confirm.dom.style.borderRadius = '10px'
//     confirm.dom.style.boxShadow = '2px 2px 20px #888888'
//     confirm.dom.innerText = 'OK'
//     confirm.dom.style.fontSize = '22px'
//     confirm.dom.onmousedown = function(){
//         (async function(){
//             confirm.dom.style.background = '#eeeeee'
//             confirm.dom.style.boxShadow = '2px 2px 20px #008800'
//             await delay_frame(10)
//             dlg.remove()
//             if(IsNeedStatus === true)
//             {
//                dlg.statusValue = true 
//             }
//             await delay_frame(10)
// 		}())
//     }
// }

