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
    intValue: Array<string>
    constructor(domParent: HTMLElement,dStyle?: DivStyle){
        [this.dom,this.dStyle] = ezDiv.createDiv(domParent,dStyle)
        let conT = new Content(this.dom,this.dStyle)
        this.conT = conT
        this.statusValue = false
        this.domParent = domParent
        this.intValue = []
        this.id = id++
    }
    show(conStyle: contentStyle){
        let that = this
        this.statusValue = false
        let topStr = ['20px','70px','130px','210px']
        if(!conStyle)
        {
            conStyle = {
                type: 'none'
            }
        }
        let [char,color,title,content] = ezJudge.judgeModel(conStyle.type)
        conStyle = ezJudge.judgeContentStyle(conStyle,title,content)
        if(conStyle.noIcon)
        {
            if(!conStyle.intStr)
            {
                topStr = ['20px','90px','180px']
            }
        }
        createDlg(this,conStyle,topStr,char,color,conStyle.btnStr)
        // let btn = that.conT.child[that.conT.child.length - 1].child[0]
        let l = that.conT.child[that.conT.child.length - 1].child.length;
        let int = new Array()
        return new Promise(function(resolve,reject){
            for(let i = 0;i < conStyle.intStr.length;i++)
            {
                int[i] = document.getElementById(conStyle.intStr[i])
            }
            for(let i = 0;i < l;i++)
            { 
                let btn = that.conT.child[that.conT.child.length - 1].child[i]
                btn.dom.onmousedown = function(){
                    (async function (){
                        btn.dom.style.background = '#ffffff'
                        btn.dom.style.boxShadow = '2px 2px 20px #008800'
                        await delay_frame(10)
                        that.remove().then(value=>{
                            if(i === conStyle.confirmPosition||conStyle.btnStr.length === 1)
                            {
                                for(let t = 0;t < conStyle.intStr.length;t++)
                                {
                                    that.intValue.push(conStyle.intStr[t])
                                    that.intValue.push(int[t].value)
                                }
                                that.statusValue = true
                            }
                            resolve(that.statusValue)
                        })
                        await delay_frame(10)
                        
                    })()
                    
                }  
            }
        })
    }
    setDlgStyle(dStyle: DivStyle){
        dStyle = ezJudge.judgeDivStyle(dStyle)
        let domS = this.dom.style
        domS.width = dStyle.width.toString() + 'px'
        domS.height = dStyle.height.toString() + 'px'
        domS.border = dStyle.border
        domS.borderRadius = dStyle.borderRadius
    }
    inputdlg(conStyle: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Input Dialogue','This is default input string!')
        conStyle.type = 'input'
        return this.show(conStyle)/*.then()*/
    }
    errordlg(conStyle: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
        conStyle.type = 'error'
        conStyle.noInt = true
        this.show(conStyle)
    }
    helpdlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Help Dialogue','This is default help string!')
        conStyle.type = 'help'
        conStyle.noInt = true
        this.show(conStyle)
    }
    msgbox(conStyle?: contentStyle,model?: string){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
        conStyle.noInt = true
        this.show(conStyle)
    }
    questdlg(conStyle?: contentStyle,str?: Array<string>){
        conStyle = ezJudge.judgeContentStyle(conStyle,"Quset Dialogue",'This is default error string!')
        conStyle.type = 'quest'
        conStyle.noInt = true
        this.show(conStyle)
    }
    warndlg(conStyle?: contentStyle){
        conStyle = ezJudge.judgeContentStyle(conStyle,'Warning Dialogue','This is default warning string!')
        conStyle.type = 'warn'
        conStyle.noInt = true
        this.show(conStyle)
    }
    remove(){
        let that = this
        return new Promise(function(resolve,reject){
            let child = that.dom.lastElementChild
            while(child){
                that.dom.removeChild(child)
                child = that.dom.lastElementChild
                console.dir('a')
            }
            that.conT.child = []
            // console.dir(that)
            // that.dom.remove()
            that.dom.style.visibility = 'hidden'
            resolve(0)
        })
        
    }
}

export interface contentStyle{
    type?: string           //对话类型
    title?: string          //对话标题
    content?: string        //对话提示内容
    img?: string            //自定义图片
    btnStr?: Array<string>  //按钮字符
    intStr?: Array<string>  //输入框提示
    noIcon?: boolean        //设置是否有图标
    noInt?: Boolean         //设置是否有输入框
    confirmPosition?: number//设置确认键的位置，默认为0即从左往右的第一个
}

class Content{
    dom: HTMLElement
    parent: Content
    child: Array<Content>
    dStyle: DivStyle
    constructor(conT: Content|HTMLElement,dStyle: DivStyle){
        let child = new Array()
        this.child = child
        if(conT instanceof HTMLElement)
        {
            this.parent = undefined
            this.dom = conT
        }
        else{
            this.dom = document.createElement('div')
            this.dom.style.width = dStyle.width.toString()
            this.dom.style.height = dStyle.height.toString()
            this.dom.style.position = 'absolute'
            this.dom.style.lineHeight = dStyle.height.toString() + 'px'
            this.dom.style.textAlign = 'center'
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
    // console.dir(dlg)
    dlg.dom.style.visibility = 'visible'
    createDlgTitle(dlg,conStyle,top[0])
    createDlgContent(dlg,conStyle,top[1])
    if(top.length === 4)
    {
        createDlgImgDiv(dlg,conStyle,top[2],imgStr,imgColor)
        createDlgBtnDiv(dlg,conStyle,top[3],str)
    }
    else if(top.length === 3)
    {
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

function createDlgImgDiv(dlg: Dialogue,conStyle: contentStyle,top: string,str: string,color: string)
{
    let imgDivStyle = {
        width: dlg.dStyle.width,
        height: 60
    }
    let imgDiv = new Content(dlg.conT,imgDivStyle)
    imgDiv.dom.style.top = top
    imgDiv.dom.style.display = 'flex'
    imgDiv.dom.style.justifyContent = 'center'
    if(!conStyle.intStr||conStyle.noInt)
    {
        dlg.dom.style.height = dlg.dStyle.height.toString() + 'px'
        if(!conStyle.img)
        {
            createDlgImg(imgDiv,str,color)
        }
        else{
            createDlgImg0(imgDiv,conStyle)
        }
    }
    else{
        imgDiv.dom.style.height = (imgDivStyle.height * conStyle.intStr.length).toString() + 'px'
        imgDiv.dom.style.flexDirection = 'column'
        dlg.dom.style.height = (parseInt(dlg.dom.style.height) + imgDivStyle.height * (conStyle.intStr.length-1)).toString() + 'px'
        // console.dir(conStyle)
        for(let i = 0;i < conStyle.intStr.length;i++)
        {
            createDlgIntDiv(imgDiv,conStyle.intStr[i])
        }
    }
}

function createDlgIntDiv(imgDiv: Content,intStr: string)
{
    let intDivStyle = {
        width: parseInt(imgDiv.dom.style.width),
        height: 60
    }
    let intDiv = new Content(imgDiv,intDivStyle)
    intDiv.dom.style.position = 'relative'
    intDiv.dom.style.display = 'flex'
    intDiv.dom.style.justifyContent = 'inherit'
    createDlgInt(intDiv,intStr);
}

function createDlgImg(imgDiv: Content,str: string,color: string){
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

function createDlgImg0(imgDiv: Content,conStyle: contentStyle){
    let img = document.createElement('img')
    img.width = 60
    img.height = 60
    img.src = conStyle.img
    imgDiv.dom.append(img)
}

function createDlgInt(imgDiv: Content,intStr: string)
{
    let keyStyle = {
        width: 100,
        height: 60
    }
    let key = new Content(imgDiv,keyStyle)
    key.dom.style.position = 'relative'
    key.dom.style.fontSize = '20px'
    key.dom.innerHTML = intStr + ':'
    let int = document.createElement('input')
    int.id = intStr
    int.style.width = '200px'
    int.style.height = '40px'
    int.style.borderRadius = '10px'
    int.style.marginTop = '10px'
    imgDiv.dom.append(int)
}

function createDlgBtnDiv(dlg: Dialogue,conStyle: contentStyle,top: string,str?: Array<string>){
    let BtnDivStyle = {
        width: dlg.dStyle.width,
        height: 35
    }
    let BtnDiv = new Content(dlg.conT,BtnDivStyle)
    let color = '#00d800'
    if(conStyle.intStr&&!conStyle.noInt)
    {
        top = (parseInt(top) + 60*(conStyle.intStr.length-1)).toString() + 'px'
    }
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

