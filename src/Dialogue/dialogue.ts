import { DivStyle } from '../Div/div'
import * as ezDiv from '../Div/div'
import * as ezJudge from '../Judge/judge'
import { delay_frame } from '../Time/time'

let id = 0

export class Dialogue{
    id: number
    dom: HTMLElement
    domParent: HTMLElement
    conT: Content
    dStyle?: DivStyle
    statusValue: boolean    //按钮点击状态 true为选择是 false为选择否或取消
    constructor(domParent: HTMLElement,dStyle?: DivStyle){
        [this.dom,this.dStyle] = ezDiv.createDiv(domParent,dStyle)
        let conT = new Content(this.dom,this.dStyle)
        this.conT = conT
        this.statusValue = false
        this.domParent = domParent
        this.id = id++
    }
    // show(conStyle: contentStyle,func: Function){
    //     if(!conStyle)
    //     {
    //         conStyle = {
    //             type: 'help'
    //         }
    //     }
    //     let [char,color,title,content] = ezJudge.judgeModel(conStyle.type)
    //     conStyle = ezJudge.judgeContentStyle(conStyle,title,content)
    //     if(func === undefined || func instanceof Function)
    //     {
    //         func = function(){
    //             this.remove();
    //         }
    //     }
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],char,color,conStyle.btnStr)
    //     // conStyle = ezJudge.judgeContentStyle(conStyle,)
    // }
    show(conStyle: contentStyle){
        let that = this
        this.statusValue = false
        if(!conStyle)
        {
            conStyle = {
                type: 'help'
            }
        }
        else if(!conStyle.type)
        {
            conStyle.type = "help"
        }
        let [char,color,title,content] = ezJudge.judgeModel(conStyle.type)
        conStyle = ezJudge.judgeContentStyle(conStyle,title,content)
        createDlg(that,conStyle,['20px','70px','130px','210px'],char,color,conStyle.btnStr)
        // let btn = that.conT.child[that.conT.child.length - 1].child[0]
        return new Promise(function(resolve,reject){
            for(let i = 0;i < that.conT.child[that.conT.child.length - 1].child.length;i++)
            { 
                let btn = that.conT.child[that.conT.child.length - 1].child[i]
                btn.dom.onmousedown = function(){
                    (async function (){
                        btn.dom.style.background = '#ffffff'
                        btn.dom.style.boxShadow = '2px 2px 20px #008800'
                        await delay_frame(10)
                        that.remove()
                        // if(that.conT.child.le )
                        if(i === 0)
                        {
                            that.statusValue = true
                        }
                        resolve(that.statusValue)
                    })()
                    
                    // reject("err")
                }  
            }
        })
    }
    // errordlg(conStyle?: contentStyle){
    //     conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],"X",'red');
    // }
    // helpdlg(conStyle?: contentStyle){
    //     conStyle = ezJudge.judgeContentStyle(conStyle,'Help Dialogue','This is default help string!')
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],"!",'orange');
    // }
    // msgbox(conStyle?: contentStyle,model?: string){
    //     conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
    //     let [str,color] = ezJudge.judgeModel(model)
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],str,color);
    // }
    // questdlg(conStyle?: contentStyle,str?: Array<string>){
    //     conStyle = ezJudge.judgeContentStyle(conStyle,"Quset Dialogue",'This is default error string!')
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],"?",'grey',str);
    // }
    // warndlg(conStyle?: contentStyle){
    //     conStyle = ezJudge.judgeContentStyle(conStyle,'Warning Dialogue','This is default warning string!')
    //     createDlg(this,conStyle,['20px','70px','130px','210px'],"!",'orange');
    // }
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
    type?: string
    title?: string
    content?: string  
    img?: string
    btnStr?: Array<string>

}

class Content{
    dom: HTMLElement
    parent: Content
    child: Array<Content>
    dStyle: DivStyle
    constructor(conT: Content|HTMLElement,dStyle: DivStyle){
        this.dom = document.createElement('div')
        this.dom.style.width = dStyle.width.toString()
        this.dom.style.height = dStyle.height.toString()
        this.dom.style.position = 'absolute'
        this.dom.style.lineHeight = dStyle.height.toString() + 'px'
        this.dom.style.textAlign = 'center'
        let child = new Array()
        this.child = child
        if(conT instanceof HTMLElement)
        {
            this.parent = undefined
            conT.append(this.dom)
        }
        else{
            this.parent = conT
            conT.child.push(this)
            // // let h = this.domParent.clientHeight 
            // this.dom.style.background = 'black'
            conT.dom.append(this.dom)
        }
        
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
    let title = new Content(dlg.conT,titleStyle)
    // console.dir(title)
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
    let content = new Content(dlg.conT,contentStyle)
    content.dom.innerText = conStyle.content
    content.dom.style.fontSize = '20px'
    content.dom.style.top = top
}

function createDlgImg(dlg: Dialogue,conStyle: contentStyle,top: string,str: string,color: string){
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    }
    let imgDiv = new Content(dlg.conT,imgDivStyle)
    imgDiv.dom.style.top = top
    imgDiv.dom.style.display = 'flex'
    imgDiv.dom.style.justifyContent = 'center'
    let imgStyle = {
        width: 60,
        height: 60
    }
    let img = new Content(imgDiv,imgStyle)
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
    let imgDiv = new Content(dlg.conT,imgDivStyle)
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
    let BtnDiv = new Content(dlg.conT,BtnDivStyle)
    let color = '#00d800'
    BtnDiv.dom.style.top = top
    BtnDiv.dom.style.display = 'flex'
    if(!str)
    {
        str = ['OK']
    }
    if(str.length === 1)
    {
        BtnDiv.dom.style.justifyContent = 'center'
        createDlgBtn(BtnDiv,str[0],120,color)
    }
    else{
        BtnDiv.dom.style.justifyContent = 'space-evenly'
        for(let i = 0;i < str.length;i++)
        {
            if(i !== 0)
            {
                color = '#dcdcdc'
            }
            createDlgBtn(BtnDiv,str[i],100,color)
        }
    }
}

function createDlgBtn(BtnDiv: Content,str: string,width: number,color: string){
    let btnStyle = {
        width: width,
        height: 35
    }
    let btn = new Content(BtnDiv,btnStyle)
    btn.dom.className = "Button"
    btn.dom.style.position = 'relative'
    btn.dom.style.background = color
    btn.dom.style.borderRadius = '10px'
    btn.dom.style.boxShadow = '2px 2px 20px #888888'
    btn.dom.innerHTML = str
    btn.dom.style.fontSize = '22px'
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

