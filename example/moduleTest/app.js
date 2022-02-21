import ezpsy from "../../dist/esm/index.js"
console.log(ezpsy);
// let canvasStyle = {
//     backgroundColor: "black",
//     width: "60"
// }
// let test = ezPsy.hello
// test()
let dom1 = document.querySelector('#dom1')
let dom2 = ezpsy.init(dom1)

console.log(dom2);
// // console.log(ezPsy.hello);