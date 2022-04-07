// import ezpsy from "../../dist/esm/index.js"

let eyeChartFun = function(){
    
    let text = new Array();

    text[0] = new ezpsy.Text({
        shape: {
            text: 'E',
            x: 168,
            y: 80
        },
        style: {
            fill: 'black',
            fontSize: '64px'
        }
    })

    let g = new ezpsy.Group(text);
    text[0].rotate = 180 * Math.PI/180
    // console.dir(text[0])
    
    ez.add(g);
    g.setCanvasStyle({
        width: 400,
        height: 760
    })
    
    

}