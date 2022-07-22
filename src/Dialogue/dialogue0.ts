import Swal from "sweetalert2";
import 'sweetalert2/src/sweetalert2.scss'
import { judgeDlgContent } from "../Judge/judge";
import './dialogue.scss'

export function test(){
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    console.dir(Swal)
}

// let swal = Swal.fire;
let DlgId = 0

export class Dialogue{
    id: number
    inputValue: Array<Data>
    constructor(){
        this.id = DlgId;
        DlgId++;
    }
    inputDlg(dlgContent: DlgContent){
        let that = this;
        let int = new Array()
        let value = new Array()
        let number = 0;
        let inputId = "ezpsy-dlg-input" + number;
        let dom = new Array()
        dlgContent = judgeDlgContent(dlgContent,'输入对话');
        console.dir(dlgContent)
        if(dlgContent.input){
            if(typeof dlgContent.input === 'string')
            {
                int.push(dlgContent.input);
            }
            else{
                int = dlgContent.input;
            }
        }
        else{
            console.error('Please set input in your object!');
        }
        if(dlgContent.value)
        {
            if(typeof dlgContent.value === 'string')
            {
                value.push(dlgContent.value)
            }
            else{
                value = dlgContent.value
            }
        }
        else{
            for(let i = 0;i < int.length;i++)
            {
                value.push('')
            }
        }
        for(let i = 0;i < int.length;i++)
        {
            if(value[i] === undefined)
            {
                value[i] = ''
            }
        }
        let text = '';
        for(let i = 0;i < int.length;i++)
        {
            text = text  + "<div class='ezpsy-dlg-input-title'>" +int[i]+ "</div>" 
                + " <input type='text' class='ezpsy-dlg-input' name= '"
                + inputId +"' id='" + inputId + "' value='"+ value[i] + "' /><br>";
            number++;
            inputId = "ezpsy-dlg-input" + number;
        }
        // console.dir(text)
        return Swal.fire({
            title: dlgContent.title,
            html: text,
            confirmButtonColor: '#4983d0',
            showCancelButton: true,
            confirmButtonText: dlgContent.confirm,
            cancelButtonText: dlgContent.cancel,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn',
                cancelButton: 'ezpsy-dlg-btn'
            },
            preConfirm: ()=>{
                for(let i = 0;i < int.length;i++)
                {
                    let htmlDom = document.getElementById("ezpsy-dlg-input"+i);
                    let data: Data = {
                        dataName: int[i],
                        data: (<HTMLInputElement>htmlDom).value
                    }
                    dom.push(data);
                }
                that.inputValue = dom;
                return dom
            }
        }).then(e=>{
            return new Promise((res,rej)=>{
                if(e.isConfirmed)
                {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 200
                    });
                    res(e.value);
                }
                else{
                    res('null')
                }
                
            })
        })
    }
    errorDlg(dlgContent: DlgContent){
        dlgContent = judgeDlgContent(dlgContent,'错误对话','错误信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'error'
        })
    }
    helpDlg(dlgContent: DlgContent){
        dlgContent = judgeDlgContent(dlgContent,'帮助对话','帮助信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'info'
        })
    }
    listDlg(dlgContent: DlgContent){
        dlgContent = judgeDlgContent(dlgContent,'列表选择对话')
        let number = 0;
        let dom = new Array()
        let that = this
        if(dlgContent.IsMulti)
        {
            let text = '';
            let key = Object.keys(dlgContent.list);
            let value = Object.values(dlgContent.list);
            text += "<div class='ezpsy-dlg-MultiDiv'>按住Shift或Control键进行多选</div>"
            text += "<select id='ezpsy-dlg-select0' class='ezpsy-dlg-multiSelect swal2-select' style='display: flex' multiple='true'>\n";
            // text += "   <option value disabled>Select</option>\n"

            for(let i = 0;i < key.length;i++)
            {
                if(value[i] instanceof Object)
                {
                    let key0 = Object.keys(value[i])
                    let value0 = Object.values(value[i])
                    text += "   <optgroup label='"+ key[i] +"' >\n"
                    for(let j = 0;j < key0.length;j++)
                        text += "       <option value='"+ key0[j] +"'>"+ value0[j] +"</option>\n"
                    text += '</optgroup>'
                }
                else{
                    text += "   <option value='"+ key[i] +"'>"+ value[i] +"</option>\n"
                }
                // let selectId = "ezpsy-dlg-select" + number
                // number++;
                // text += "   <select id='"+ selectId +"' class='swal2-select' style='display: flex'>\n";
                // text += "   <option value= 'disabled'>"+ key[i] +"</option>\n"
                // if(value[i] instanceof Object)
                // {
                //     let key0 = Object.keys(value[i])
                //     let value0 = Object.values(value[i])
                //     for(let j = 0;j < key0.length;j++)
                //     {
                //         text += "       <option value='"+ key0[j] +"'>"+ value0[j] +"</option>\n"
                //     }
                // }
                // else{
                //     text += "       <option value='"+ key[i] +"'>"+ value[i] +"</option>\n"
                // }
                // text += '</select>\n'
            }

            text += "</select>"

            return Swal.fire({
                title: dlgContent.title,
                html: text,
                confirmButtonColor: '#4983d0',
                showCancelButton: true,
                confirmButtonText: dlgContent.confirm,
                cancelButtonText: dlgContent.cancel,
                customClass: {
                    confirmButton: 'ezpsy-dlg-btn',
                    cancelButton: 'ezpsy-dlg-btn'
                },
                preConfirm: ()=>{
                    let htmlDom = document.getElementById('ezpsy-dlg-select0')
                    // console.dir(htmlDom)
                    for (let i=0;i<(<HTMLSelectElement>htmlDom).length;i++){
                        if ((<HTMLSelectElement>htmlDom).options[i].selected){
                            let optgroup = (<HTMLSelectElement>htmlDom).options[i].parentElement;
                            let data: Data;
                            if(optgroup instanceof HTMLSelectElement)
                            {
                                data = {
                                    dataName: (<HTMLSelectElement>htmlDom).options[i].label,
                                    data: (<HTMLSelectElement>htmlDom).options[i].value
                                }
                            }
                            else{
                                data = {
                                    dataName: (<HTMLOptGroupElement>optgroup).label,
                                    data: (<HTMLSelectElement>htmlDom).options[i].value
                                }
                            }
                            dom.push(data);
                        }
                    }
                    // let sel = Object.keys(dlgContent.list)
                    // for(let i = 0;i < sel.length;i++)
                    // {
                    //     let htmlDom = document.getElementById("ezpsy-dlg-select"+i);
                    //     let data: Data = {
                    //         dataName: sel[i],
                    //         data: (<HTMLInputElement>htmlDom).value
                    //     }
                    //     dom.push(data);
                    // }
                    that.inputValue = dom;
                    return dom
                }
            })
            // .then(e=>{
            //     return new Promise((res,rej)=>{
            //         if(e.isConfirmed)
            //         {
            //             Swal.fire({
            //                 title: 'Success',
            //                 icon: 'success',
            //                 showConfirmButton: false,
            //                 timer: 200
            //             });
            //         }
            //         res(e.value);
            //     })
            // })

        }
        else{
            return Swal.fire({
                title: dlgContent.title,
                input: 'select',
                confirmButtonColor: '#4983d0',  
                inputOptions: dlgContent.list,
                inputPlaceholder: 'Select',
                showCancelButton: true,
                confirmButtonText: dlgContent.confirm,
                cancelButtonText: dlgContent.cancel,
                customClass: {
                    confirmButton: 'ezpsy-dlg-btn',
                    cancelButton: 'ezpsy-dlg-btn',
                    input: 'ezpsy-dlg-select'
                },
                preConfirm: ()=>{
                    let htmlDom = document.getElementsByClassName('swal2-select')[0];
                    for (let i=0;i<(<HTMLSelectElement>htmlDom).length;i++){
                        if ((<HTMLSelectElement>htmlDom).options[i].selected){
                            let optgroup = (<HTMLSelectElement>htmlDom).options[i].parentElement;
                            let data: Data;
                            if(optgroup instanceof HTMLSelectElement)
                            {
                                data = {
                                    dataName: (<HTMLSelectElement>htmlDom).options[i].label,
                                    data: (<HTMLSelectElement>htmlDom).value
                                }
                            }
                            else{
                                data = {
                                    dataName: (<HTMLOptGroupElement>optgroup).label,
                                    data: (<HTMLSelectElement>htmlDom).value
                                }
                            }
                            dom.push(data);
                            break;
                        }
                    }
                    that.inputValue = dom;
                    return dom
                }
            })
            // .then(e=>{
            //     return new Promise((res,rej)=>{
            //         if(e.isConfirmed)
            //         {
            //             Swal.fire({
            //                 title: 'Success',
            //                 icon: 'success',
            //                 showConfirmButton: false,
            //                 timer: 200
            //             });
            //             res(e.value);
            //         }
            //         else{
            //             res("null");
            //         }
            //     })
            // })
        }
        
    }
    questDlg(dlgContent: DlgContent){
        dlgContent = judgeDlgContent(dlgContent,'询问对话','询问信息');
        return Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            showCancelButton: true,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn',
                cancelButton: 'ezpsy-dlg-btn'
            },
            icon: 'question'
        }).then(e=>{
            return new Promise((res,rej)=>{
                if(e.isConfirmed)
                {
                    Swal.fire({
                        title: 'Success',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 200
                    });
                    res(e.value);
                }
                else{
                    res(false);
                }
            })
        })
    }
    warnDlg(dlgContent: DlgContent){
        dlgContent = judgeDlgContent(dlgContent,'帮助对话','帮助信息');
        Swal.fire({
            title: dlgContent.title,
            text: dlgContent.content,
            confirmButtonColor: '#4983d0',
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            },
            icon: 'warning'
        })
    }
    msgDlg(dlgContent: DlgContent){
        if(dlgContent.imgUrl === undefined)
            dlgContent.imgUrl = 'https://unsplash.it/400/200'
        if(dlgContent.imgWidth === undefined)
            dlgContent.imgWidth = 400
        if(dlgContent.imgHeight === undefined)
            dlgContent.imgHeight = 200
        return Swal.fire({
            text: dlgContent.content,
            width: 1.2 * dlgContent.imgWidth,
            heightAuto: true,
            confirmButtonColor: '#4983d0',
            confirmButtonText: dlgContent.confirm,
            imageUrl: dlgContent.imgUrl,
            imageWidth: dlgContent.imgWidth,
            imageHeight: dlgContent.imgHeight,
            customClass: {
                confirmButton: 'ezpsy-dlg-btn'
            }
        }).then(e=>{
            return new Promise((res,rej)=>{
                if(e.isConfirmed)
                {
                    res(e.value)
                }
            })
        })
    }
}

interface Data{
    dataName: string
    data: string
}

export interface DlgContent{
    title: string
    content?: string
    imgUrl?: string
    imgWidth?: number
    imgHeight?: number
    confirm?: string
    cancel?: string
    input?: Array<string> | string
    value?: Array<string> | string
    list?: Object
    IsMulti?: boolean
}

export function DlgInit(){
    let dlg = new Dialogue();
    return dlg;
}