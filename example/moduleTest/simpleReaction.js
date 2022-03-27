// import ezpsy from "../../dist/esm/index.js"
// let dom_0 = document.getElementById('dom')
// let dom_1 = document.getElementById('dom1')
// let ez = ezpsy.init(dom_0)
// let dlg = ezpsy.DlgInit(dom_1)

let SReactionFun = function(){

    deleteChild(dom_0)

    let color = ['red','yellow','green','blue']

    let tip0 = new ezpsy.Text({
        shape: {
            x: 170,
            y: 200,
            text: '预备'
        },
        style: {
            fill: 'black',
            fontSize: '30px'
        }
    })

    let text = new ezpsy.Text({
        shape: {
            text: '请按Enter键开始实验',
            x: 58,
            y: 200
        },
        style: {
            fill: 'red',
            fontSize: '30px',
            fontWeight: '800'
        }
    })
    let text0 = new ezpsy.Text({
        shape: {
            text: '请看到圆形后立即按下空格键',
            x: 40,
            y: 50,
        },
        style: {
            fill: 'orange',
            fontSize: '24px'
        }
    })

    
    let tA = new Array();

    ez.add(text0)
    ez.add(text)

    let press = (async function(){
        // console.dir('a')
        let time = new ezpsy.Time()
        text.remove();
        for(let i = 0;i < 10;i++)
        {
            let item = Math.floor(Math.random() * 4);
            let t = Math.floor(Math.random() * 400);
            tA[i] = new Object()
            tA[i].color = color[item];
            let circle = new ezpsy.Circle({
                shape: {
                    x: 200,
                    y: 200,
                    r: 100
                },
                style: {
                    fill: color[item]
                }
            })
            ez.add(tip0)
            await ezpsy.WaitSecs(1800+t).then(res=>{
                tip0.remove()
                ez.add(circle)
                ezpsy.setTimeTtamp(time);
            })
            await ezpsy.KbPressWait(32).then(e=>{
                circle.remove()
                ezpsy.setTimeTtamp(time)
            })
        }
        tip0.remove();
        ez.add(text)
        let t = ezpsy.getToc(time)
        for(let i = 0;i < t.length;i++)
        {
            tA[i].time = t[i];
        }
        let tA0 = new Array()
        let tA1 = new Array()
        let tA2 = new Array()
        let tA3 = new Array()
        let tx = new Array()
        for(let i = 0;i < tA.length;i++)
        {
            if(tA[i].color === 'red')
            {
                tA0.push(tA[i].time);
            }
            else if(tA[i].color === 'yellow')
            {
                tA1.push(tA[i].time);
            }
            else if(tA[i].color === 'green')
            {
                tA2.push(tA[i].time);
            }
            else if(tA[i].color === 'blue')
            {
                tA3.push(tA[i].time);
            }
        }
        tx[0] = avg(tA0)
        tx[1] = avg(tA1)
        tx[2] = avg(tA2)
        tx[3] = avg(tA3)
        console.dir(tA)
        console.dir(tx)

        ezpsy.KbWait(13,press)
    })

    let avg = function(arr){
        let l = arr.length;
        let sum = 0;
        for(let i = 0;i < l;i++)
        {
            sum += arr[i]
        }
        return (sum/l).toFixed(3);
    }

    ezpsy.KbWait(13,press)
    

}