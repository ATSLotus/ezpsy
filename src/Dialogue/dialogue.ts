// import { DivStyle } from '../Div/div'
// import * as ezDiv from '../Div/div'
// import * as ezJudge from '../Judge/judge'
// import { delay_frame } from '../Time/time'
// import { KbWait, KeypressInit } from '../ezpsy'

// let id = 0

// export class Dialogue_0{
//     id: number
//     dom: HTMLElement
//     domParent: HTMLElement
//     conT: Content
//     dStyle?: DivStyle
//     statusValue: boolean    //按钮点击状态 true为选择是 false为选择否或取消
//     intValue: Array<string>
//     selectValue: Array<string>
//     files: FileReader
//     constructor(domParent: HTMLElement,dStyle?: DivStyle){
//         [this.dom,this.dStyle] = ezDiv.createDiv(domParent,dStyle)
//         let conT = new Content(this.dom,this.dStyle)
//         this.conT = conT
//         this.statusValue = false
//         this.domParent = domParent
//         this.intValue = []
//         this.selectValue = []
//         this.id = id++
//     }
//     show(conStyle: contentStyle){
//         conStyle.seledStr = []
//         let that = this
//         this.statusValue = false
//         let topStr = ['20px','70px','130px','210px']
//         if(!conStyle)
//         {
//             conStyle = {
//                 type: 'none'
//             }
//         }
//         let [char,color,title,content] = ezJudge.judgeModel(conStyle.type)
//         conStyle = ezJudge.judgeContentStyle(conStyle,title,content)
//         if(conStyle.noIcon)
//         {
//             if(!conStyle.intStr)
//             {
//                 topStr = ['20px','90px','180px']
//             }
//         }
//         createDlg(this,conStyle,topStr,char,color,conStyle.btnStr)
        
//         let h = window.innerHeight;
//         this.dom.style.top = ((h-this.dom.scrollHeight)/2).toString() + 'px'

//         // let btn = that.conT.child[that.conT.child.length - 1].child[0]
//         let l = that.conT.child[that.conT.child.length - 1].child.length;
//         let int = new Array()
//         return new Promise(function(resolve,reject){
//             if(conStyle.intStr)
//             {
//                 for(let i = 0;i < conStyle.intStr.length;i++)
//                 {
//                     int[i] = document.getElementById(conStyle.intStr[i])
//                 }
//             }
//             let file = document.getElementById('file')
//             for(let i = 0;i < l;i++)
//             { 
//                 let btn = that.conT.child[that.conT.child.length - 1].child[i]
//                 let keypres = KeypressInit()
//                 let func = (async function (){
//                     btn.dom.style.background = '#ffffff'
//                     btn.dom.style.boxShadow = '2px 2px 20px #008800'
//                     btn.dom.style.color = 'blue'
//                     await delay_frame(10)
//                     if(i === conStyle.confirmPosition||conStyle.btnStr.length === 1)
//                     {
//                         if(conStyle.intStr)
//                         {
//                             for(let t = 0;t < conStyle.intStr.length;t++)
//                             {
//                                 that.intValue.push(conStyle.intStr[t])
//                                 that.intValue.push(int[t].value)
//                             }
//                         }
//                         else{
//                             if(conStyle.seledStr)
//                             {
//                                 for(let t = 0;t < conStyle.seledStr.length;t++)
//                                 {
//                                     if(conStyle.seledStr[t] !== undefined && conStyle.seledStr[t] !== '')
//                                     {
//                                         that.selectValue.push(conStyle.seledStr[t])
//                                     }
//                                 }
//                             }
//                         }
//                         if(conStyle.type === 'file')
//                         {
//                             // let f = file
//                             new Promise((resolve,reject)=>{
//                                 let file_Reader = new FileReader()
//                                 file_Reader.onload = result =>{
//                                     let fc = file_Reader.result;
//                                     console.dir(fc)
//                                     resolve(fc)
//                                 }
//                                 // file_Reader.readAsDataURL((<HTMLInputElement>file).files[0])
//                                 // file_Reader.readAsText((<HTMLInputElement>file).files[0])
//                                 file_Reader.readAsArrayBuffer((<HTMLInputElement>file).files[0])
//                                 that.files = file_Reader
//                             })
//                         }
//                         that.statusValue = true
//                     }
//                     await delay_frame(10)
//                     await that.remove()
//                     await delay_frame(10)
//                     resolve(that.statusValue)
//                 })
//                 // keypres.listen(13,func)
//                 btn.dom.onmousedown = function(){
//                     func();
//                 }  
//             }
//         })
//     }
//     setDlgStyle(dStyle: DivStyle){
//         dStyle = ezJudge.judgeDivStyle(dStyle)
//         let domS = this.dom.style
//         domS.width = dStyle.width.toString() + 'px'
//         domS.height = dStyle.height.toString() + 'px'
//         domS.border = dStyle.border
//         domS.borderRadius = dStyle.borderRadius
//     }
//     inputdlg(conStyle: contentStyle){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Input Dialogue','This is default input string!')
//         conStyle.type = 'input'
//         return this.show(conStyle)/*.then()*/
//     }
//     listdlg(conStyle: contentStyle){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Select Dialogue','This is default select string!')
//         conStyle.type = 'select'
//         conStyle.noInt = true
//         this.show(conStyle)
//     }
//     errordlg(conStyle: contentStyle){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
//         conStyle.type = 'error'
//         conStyle.noInt = true
//         conStyle.noSel = true
//         this.show(conStyle)
//     }
//     helpdlg(conStyle?: contentStyle){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Help Dialogue','This is default help string!')
//         conStyle.type = 'help'
//         conStyle.noSel = true
//         conStyle.noInt = true
//         this.show(conStyle)
//     }
//     msgbox(conStyle?: contentStyle,model?: string){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Error Dialogue','This is default error string!')
//         conStyle.noSel = true
//         conStyle.noInt = true
//         this.show(conStyle)
//     }
//     questdlg(conStyle?: contentStyle,str?: Array<string>){
//         conStyle = ezJudge.judgeContentStyle(conStyle,"Quset Dialogue",'This is default error string!')
//         conStyle.type = 'quest'
//         conStyle.noSel = true
//         conStyle.noInt = true
//         this.show(conStyle)
//     }
//     warndlg(conStyle?: contentStyle){
//         conStyle = ezJudge.judgeContentStyle(conStyle,'Warning Dialogue','This is default warning string!')
//         conStyle.type = 'warn'
//         conStyle.noSel = true
//         conStyle.noInt = true
//         this.show(conStyle)
//     }
//     remove(){
//         let that = this
//         return new Promise(function(resolve,reject){
//             let child = that.dom.lastElementChild
//             while(child){
//                 that.dom.removeChild(child)
//                 child = that.dom.lastElementChild
//             }
//             that.conT.child = []
//             // console.dir(that)
//             // that.dom.remove()
//             that.dom.style.visibility = 'hidden'
//             resolve(0)
//         })
        
//     }
// }

// export interface contentStyle{
//     //优先级: 输入框 > 选择框 > 其他
//     type?: string           //对话类型
//     title?: string          //对话标题
//     content?: string        //对话提示内容
//     img?: string            //自定义图片
//     btnStr?: Array<string>  //按钮字符
//     intStr?: Array<string>  //输入框提示
//     selStr?: Array<string>   //选择框内容
//     seledStr?: Array<string> //已选择内容
//     noIcon?: boolean        //设置是否有图标
//     noInt?: boolean         //设置是否有输入框
//     noSel?: boolean         //设置是否有选择框
//     confirmPosition?: number//设置确认键的位置，默认为0即从左往右的第一个
//     IsMultiple?: string     //是否多选
// }

// class Content{
//     dom: HTMLElement
//     parent: Content
//     child: Array<Content>
//     dStyle: DivStyle
//     constructor(conT: Content|HTMLElement,dStyle: DivStyle){
//         let child = new Array()
//         this.child = child
//         if(conT instanceof HTMLElement)
//         {
//             this.parent = undefined
//             this.dom = conT
//         }
//         else{
//             this.dom = document.createElement('div')
//             this.dom.style.width = dStyle.width.toString() + 'px'
//             this.dom.style.height = dStyle.height.toString() + 'px'
//             this.dom.style.position = 'absolute'
//             this.dom.style.lineHeight = dStyle.height.toString() + 'px'
//             this.dom.style.textAlign = 'center'
//             this.parent = conT
//             conT.child.push(this)
//             // // let h = this.domParent.clientHeight 
//             // this.dom.style.background = 'black'
//             conT.dom.append(this.dom)
//         }
        
//     }
// }

// export function DlgInit(dom: HTMLElement,dStyle?: DivStyle) {
//     let dlg = new Dialogue_0(dom,dStyle);
//     return dlg;
// }

// function createDlg(dlg: Dialogue_0,conStyle: contentStyle,top: Array<string>,imgStr?: string,imgColor?: string,str?: Array<string>){
//     // console.dir(dlg)
//     dlg.dom.style.visibility = 'visible'
//     createDlgTitle(dlg,conStyle,top[0])
//     createDlgContent(dlg,conStyle,top[1])
//     if(top.length === 4)
//     {
//         createDlgImgDiv(dlg,conStyle,top[2],imgStr,imgColor)
//         createDlgBtnDiv(dlg,conStyle,top[3],str)
//     }
//     else if(top.length === 3)
//     {
//         createDlgBtnDiv(dlg,conStyle,top[2],str)
//     }
    
// }

// function createDlgTitle(dlg: Dialogue_0,conStyle: contentStyle,top: string){
//     let titleStyle = {
//         width: dlg.dStyle.width,
//         height: 50
//     }
//     let title = new Content(dlg.conT,titleStyle)
//     // console.dir(title)
//     title.dom.innerText = conStyle.title
//     title.dom.style.fontSize = '26px'
//     title.dom.style.fontWeight = 'bold'
//     title.dom.style.top = top
// }

// function createDlgContent(dlg: Dialogue_0,conStyle: contentStyle,top: string){
//     let contentStyle = {
//         width: dlg.dStyle.width,
//         height: 50
//     }
//     let content = new Content(dlg.conT,contentStyle)
//     content.dom.innerText = conStyle.content
//     content.dom.style.fontSize = '20px'
//     content.dom.style.top = top
// }

// function createDlgImgDiv(dlg: Dialogue_0,conStyle: contentStyle,top: string,str: string,color: string)
// {
//     let imgDivStyle = {
//         width: dlg.dStyle.width,
//         height: 60
//     }
//     let imgDiv = new Content(dlg.conT,imgDivStyle)
//     imgDiv.dom.style.top = top
//     imgDiv.dom.style.display = 'flex'
//     imgDiv.dom.style.justifyContent = 'center'
//     if(!conStyle.intStr || conStyle.noInt || conStyle.type !== "input")
//     {
//         dlg.dom.style.height = dlg.dStyle.height.toString() + 'px'
//         if(!conStyle.selStr||conStyle.noSel)
//         {
//             if(!conStyle.img)
//             {
//                 if(conStyle.type === 'file')
//                 {
//                     createDlgFile(imgDiv,dlg)
//                 }
//                 else{
//                     createDlgImg(imgDiv,str,color)
//                 }
//             }
//             else{
//                 createDlgImg0(imgDiv,conStyle)
//             }
//         }
//         else{
//             createDlgSelect(imgDiv,conStyle)
//         }
//     }
//     else{
//         // console.dir(conStyle)
//         imgDiv.dom.style.height = (imgDivStyle.height * conStyle.intStr.length).toString() + 'px'
//         imgDiv.dom.style.flexDirection = 'column'
//         dlg.dom.style.height = (parseInt(dlg.dom.style.height) + imgDivStyle.height * (conStyle.intStr.length-1)).toString() + 'px'
//         // console.dir(conStyle)
//         for(let i = 0;i < conStyle.intStr.length;i++)
//         {
//             createDlgIntDiv(imgDiv,conStyle.intStr[i])
//         }
//     }
// }

// function createDlgIntDiv(imgDiv: Content,intStr: string)
// {
//     let intDivStyle = {
//         width: parseInt(imgDiv.dom.style.width),
//         height: 60
//     }
//     let intDiv = new Content(imgDiv,intDivStyle)
//     intDiv.dom.style.position = 'relative'
//     intDiv.dom.style.display = 'flex'
//     intDiv.dom.style.justifyContent = 'inherit'
//     createDlgInt(intDiv,intStr);
// }

// function createDlgImg(imgDiv: Content,str: string,color: string){
//     let imgStyle = {
//         width: 60,
//         height: 60
//     }
//     let img = new Content(imgDiv,imgStyle)
//     img.dom.id = 'img'
//     img.dom.innerText = str
//     img.dom.style.fontSize = '54px'
//     img.dom.style.color = 'white'
//     img.dom.style.background = color
//     // img.dom.style.border = '5px solid red'
//     img.dom.style.borderRadius = '50%'
// }

// function createDlgImg0(imgDiv: Content,conStyle: contentStyle){
//     let img = document.createElement('img')
//     img.width = 60
//     img.height = 60
//     img.src = conStyle.img
//     imgDiv.dom.append(img)
// }

// function createDlgInt(imgDiv: Content,intStr: string)
// {
//     let keyStyle = {
//         width: 100,
//         height: 60
//     }
//     let key = new Content(imgDiv,keyStyle)
//     key.dom.style.position = 'relative'
//     key.dom.style.fontSize = '20px'
//     key.dom.innerHTML = intStr + ':'
//     let int = document.createElement('input')
//     int.id = intStr
//     int.style.width = '200px'
//     int.style.height = '40px'
//     int.style.borderRadius = '10px'
//     int.style.marginTop = '10px'
//     imgDiv.dom.append(int)
// }

// function createDlgFile(imgDiv: Content,dlg: Dialogue_0){
//     let file = document.createElement('input')
//     // file.disabled = true
//     file.type = 'file'
//     file.id = 'file'
//     file.style.width = '160px'
//     file.style.lineHeight = '60px'
//     imgDiv.dom.append(file)
// }

// function createDlgSelect(imgDiv: Content,conStyle: contentStyle){
//     let selectStyle = {
//         width: 200,
//         height: 36
//     }
//     let index = false
//     let index0 = new Array()
//     let index1 = false
//     let count = 0
//     let selectStr = new Array();
//     let Str = '';
//     let color = '#3771e0'
//     let color0 = '#ffffff'
//     let select = new Content(imgDiv,selectStyle)
//     select.dom.style.border = '1px solid'
//     select.dom.style.borderRadius = '15px'
//     select.dom.style.marginTop = '12px'
//     select.dom.style.zIndex = '2020'
//     let selectText = new Content(select,{
//         width: 200,
//         height: 36
//     })
//     selectText.dom.innerText = '展开选择'
//     selectText.dom.style.zIndex = '2010'
//     selectText.dom.style.top = '0'
//     selectText.dom.style.transition = 'top 0.8s linear'
//     selectText.dom.style.borderRadius = '15px'
//     selectText.dom.style.color = color
//     let  selectDiv = new Content(select,{
//         width: 200,
//         height: 36
//     })
//     // selectDiv.dom.style.border = '1px solid'
//     selectDiv.dom.style.borderRadius = '15px'
//     selectDiv.dom.style.boxShadow = '2px 2px 20px #888888'
//     selectDiv.dom.style.zIndex = "2000"
//     // selectDiv.dom.style.visibility = 'hidden'
//     selectDiv.dom.style.background = color0
//     selectDiv.dom.style.transition = 'all 0.8s linear'
//     selectDiv.dom.style.top = '0px'
//     selectDiv.dom.style.opacity = '0'
//     selectDiv.dom.style.display = 'flex'
//     selectDiv.dom.style.flexDirection = 'column'
//     let selectContent = new Array()
//     for(let i = 0;i < conStyle.selStr.length;i++)
//     {
//         selectContent[i] = new Content(selectDiv,{
//             width: 200,
//             height: 36/(conStyle.selStr.length+2)
//         })
//         selectContent[i].dom.innerText = conStyle.selStr[i]
//         if(i === 0)
//         {
//             selectContent[i].dom.style.borderRadius = '15px 15px 0px 0px'
//         }
//         // selectContent[i].dom.style.borderRadius = '15px'
//         selectContent[i].dom.style.position = 'relative'
//         selectContent[i].dom.style.transition = 'all 0.8s linear'
//         selectContent[i].dom.style.lineHeight = (36/(conStyle.selStr.length+2)).toString() + "px" 
//         selectContent[i].dom.style.color = color
//     }
//     let selectAll = new Content(selectDiv,{
//         width: 200,
//         height: 36/(conStyle.selStr.length+2)
//     })
//     selectAll.dom.innerText = 'selectAll'
//     // selectAll.dom.style.borderRadius = '15px'
//     selectAll.dom.style.position = 'relative'
//     selectAll.dom.style.transition = 'all 0.8s linear'
//     selectAll.dom.style.lineHeight = (36/(conStyle.selStr.length+2)).toString() + "px" 
//     selectAll.dom.style.color = color
//     if(!conStyle.IsMultiple)
//     {
//         selectAll.dom.style.color = 'grey'
//         for(let i = 0;i < conStyle.selStr.length;i++)
//         {
//             selectContent[i].dom.onclick = e => {
//                 if(!index0[i]){
//                     selectStr[0] = conStyle.selStr[i]
//                     selectContent[i].dom.style.background = color
//                     selectContent[i].dom.style.color = color0
//                     for(let t = 0;t < conStyle.selStr.length;t++)
//                     {
//                         if(t !== i)
//                         {
//                             selectContent[t].dom.style.background = color0
//                             selectContent[t].dom.style.color = color
//                             index0[t] = false
//                         }
//                     }
//                     index0[i] = true
//                 }
//                 else{
//                     selectStr[0] = ''
//                     selectContent[i].dom.style.background = color0
//                     selectContent[i].dom.style.color = color
//                     index0[i] = false
//                 }
//             }
//         }
//     }
//     else{
//         for(let i = 0;i < conStyle.selStr.length;i++)
//         {
//             selectContent[i].dom.onclick = e => {
//                 if(!index0[i])
//                 {   
//                     selectStr[i] = conStyle.selStr[i]
//                     selectContent[i].dom.style.background = color
//                     selectContent[i].dom.style.color = color0
//                     index0[i] = true
//                     count++
//                     if(count === conStyle.selStr.length)
//                     {
//                         selectAll.dom.style.background = color
//                         selectAll.dom.style.color = color0
//                     }  
//                 }
//                 else{
//                     selectStr[i] = ''
//                     selectContent[i].dom.style.background = color0
//                     selectContent[i].dom.style.color = color
//                     selectAll.dom.style.background = color0
//                     selectAll.dom.style.color = color
//                     index1 = false
//                     index0[i] = false
//                     count--
//                 }     
//             }
//         }
//         selectAll.dom.onclick = e => {
//             if(!index1){
//                 selectAll.dom.style.background = color
//                 selectAll.dom.style.color  = color0
//                 for(let i = 0;i < conStyle.selStr.length;i++){
//                     selectContent[i].dom.style.background = color
//                     selectContent[i].dom.style.color = color0
//                     selectStr[i] = conStyle.selStr[i]
//                 }
//                 count = conStyle.selStr.length
//                 index1 = true
//             }
//             else{
//                 selectAll.dom.style.background = color0
//                 selectAll.dom.style.color  = color
//                 for(let i = 0;i < conStyle.selStr.length;i++){
//                     selectContent[i].dom.style.background = color0
//                     selectContent[i].dom.style.color = color
//                     selectStr[i] = ''
//                 }
//                 count = 0
//                 index1 = false
//             }
//         }
//     }
//     selectText.dom.onmousedown = e =>{
//         selectText.dom.style.background = color
//         selectText.dom.style.color = color0
//     }
//     selectText.dom.onmouseup = e =>{
//         selectText.dom.style.background = color0
//         selectText.dom.style.color = color
//     }
//     selectText.dom.onclick = e => {
//         if(!index)
//         {
//             selectDiv.dom.style.opacity = '1'
//             selectDiv.dom.style.zIndex = '2100'
//             selectDiv.dom.style.height = (36 * (conStyle.selStr.length + 2)).toString()
//             selectDiv.dom.style.top = ((-36) * (conStyle.selStr.length + 1)/2).toString() + 'px'
//             selectText.dom.style.top = (36 * (conStyle.selStr.length + 1)/2).toString() + 'px'
//             selectText.dom.style.zIndex = '2101'
//             selectText.dom.style.borderRadius = '0px 0px 15px 15px'
//             selectText.dom.innerText = 'Confirm'
//             for(let i = 0;i < conStyle.selStr.length;i++)
//             {
//                 selectContent[i].dom.style.height = '36'
//                 selectContent[i].dom.style.lineHeight = '36px'
//             }
//             selectAll.dom.style.height = '36'
//             selectAll.dom.style.lineHeight = '36px'
//             index = true
//         }
//         else{
//             selectDiv.dom.style.opacity = '0'
//             selectDiv.dom.style.zIndex = '2000'
//             selectDiv.dom.style.height = '36'
//             selectDiv.dom.style.top = '0'
//             for(let i = 0;i < conStyle.selStr.length;i++)
//             {
//                 selectContent[i].dom.style.height = (36/(conStyle.selStr.length+2)).toString()
//                 selectContent[i].dom.style.lineHeight = (36/(conStyle.selStr.length+2)).toString() + "px"
//             }
//             selectAll.dom.style.height = (36/(conStyle.selStr.length+2)).toString()
//             selectAll.dom.style.lineHeight = (36/(conStyle.selStr.length+2)).toString() + "px"
//             selectText.dom.style.top = '0'
//             selectText.dom.style.zIndex = '2010'
//             selectText.dom.style.borderRadius = '15px'
//             Str = ''
//             conStyle.seledStr = selectStr
//             for(let i = 0;i < selectStr.length;i++)
//             {
//                 if(selectStr[i]!==undefined&&selectStr[i]!=='')
//                 {
//                     Str += selectStr[i] + ','
//                 }
//             }
//             Str = Str.substring(0,Str.length - 1)
//             Str = cutString(Str,20)
//             if(Str === ''||Str === undefined)
//             {
//                 Str = '展开选择'
//             }
//             selectText.dom.innerText = Str
//             index = false
//         }
//     }
// }

// function createDlgBtnDiv(dlg: Dialogue_0,conStyle: contentStyle,top: string,str?: Array<string>){
//     let BtnDivStyle = {
//         width: dlg.dStyle.width,
//         height: 35
//     }
//     let BtnDiv = new Content(dlg.conT,BtnDivStyle)
//     let color = '#00d800'
//     if(conStyle.intStr&&!conStyle.noInt)
//     {
//         top = (parseInt(top) + 60*(conStyle.intStr.length-1)).toString() + 'px'
//     }
//     BtnDiv.dom.style.top = top
//     BtnDiv.dom.style.display = 'flex'
//     if(!str)
//     {
//         str = ['OK']
//     }
//     if(str.length === 1)
//     {
//         BtnDiv.dom.style.justifyContent = 'center'
//         createDlgBtn(BtnDiv,str[0],120,color)
//     }
//     else{
//         BtnDiv.dom.style.justifyContent = 'space-evenly'
//         for(let i = 0;i < str.length;i++)
//         {
//             if(i !== 0)
//             {
//                 color = '#dcdcdc'
//             }
//             createDlgBtn(BtnDiv,str[i],100,color)
//         }
//     }
// }

// function createDlgBtn(BtnDiv: Content,str: string,width: number,color: string){
//     let btnStyle = {
//         width: width,
//         height: 35
//     }
//     let btn = new Content(BtnDiv,btnStyle)
//     btn.dom.className = "Button"
//     btn.dom.style.position = 'relative'
//     btn.dom.style.background = color
//     btn.dom.style.color = 'white'
//     btn.dom.style.borderRadius = '14px'
//     btn.dom.style.boxShadow = '2px 2px 20px #888888'
//     btn.dom.innerHTML = str
//     btn.dom.style.fontSize = '22px'
// }

// function cutString(str: string,len: number): string{
//     let s
//     let s0,s1
//     let sarr = str.split(',')
//     let l = sarr.length
//     if(str.length <= len)
//     {
//         return str
//     }
//     else{
        
//         if((sarr[0].length + sarr[1].length) >= (len/2)-2)
//         {
//             s0 = str.substring(0,(len/2))
//         }
//         else{
//             s0 = sarr[0] + ',' + sarr[1] + ','
//         }
//         if((sarr[l-1].length + sarr[l-2].length) >= (len/2)-2)
//         {
//             if(sarr[l-2].length >= (len/2)-2)
//             {
//                 if(sarr[l-1].length >= (len/2)-2)
//                 {
//                     s1 = sarr[l-1].substring(0,(len/2)-2) + '..'
//                 }
//                 else{
//                     s1 = sarr[l-1]
//                 }
//             }
//             else{
//                 s1 = sarr[l-2] + ',' + sarr[l-1].substring(0,(len/2)-2-sarr[l-2].length) + '..'
//             }   
//         }
//         else{
//             s1 = sarr[l-2] + ',' + sarr[l-1]
//         }
//         // s1 = str.substring(str.length-8,str.length)
//         s = s0 + '....' + ',' + s1;
//         return s
//     }
// }

// // function createDlgConfirm(dlg: Dialogue,conStyle: contentStyle,top: string,IsNeedStatus: boolean){
// //     let confirmDivStyle = {
// //         width: dlg.dStyle.width,
// //         height: 35
// //     }
// //     let confirmDiv = new Content(dlg.dom,confirmDivStyle)
// //     confirmDiv.dom.style.top = top
// //     confirmDiv.dom.style.display = 'flex'
// //     confirmDiv.dom.style.justifyContent = 'center'
// //     let confirmStyle = {
// //         width: 120,
// //         height: 35
// //     }
// //     let confirm = new Content(confirmDiv.dom,confirmStyle)
// //     confirm.dom.style.background = 'white'
// //     confirm.dom.style.borderRadius = '10px'
// //     confirm.dom.style.boxShadow = '2px 2px 20px #888888'
// //     confirm.dom.innerText = 'OK'
// //     confirm.dom.style.fontSize = '22px'
// //     confirm.dom.onmousedown = function(){
// //         (async function(){
// //             confirm.dom.style.background = '#eeeeee'
// //             confirm.dom.style.boxShadow = '2px 2px 20px #008800'
// //             await delay_frame(10)
// //             dlg.remove()
// //             if(IsNeedStatus === true)
// //             {
// //                dlg.statusValue = true 
// //             }
// //             await delay_frame(10)
// // 		}())
// //     }
// // }

