import ezpsy from "../../dist/esm/index.js"
let dom = document.querySelector('#dom')
let ez = ezpsy.init(dom)
// let dlg = ezpsy.DlgInit(dom)
window.onresize = function(){
    location.reload();
}