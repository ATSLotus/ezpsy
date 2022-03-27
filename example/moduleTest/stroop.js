// import ezpsy from "../../dist/esm/index.js"

stroopFun = function()
{
    
    deleteChild(dom_0)
    // let dom_0 = document.getElementById('dom')
    // let ez = ezpsy.init(dom_0)
    // let dlg = ezpsy.DlgInit(dom_0)

    let stroop = {
        str: ['红','黄','蓝','绿'],
        color: ['red','yellow','blue','green']
    }

    let getStroop = function(stroop){
        let i = Math.floor(Math.random() * 4)
        let j = Math.floor(Math.random() * 4)
        while(1){
            if(j === i)
            {
                j = Math.floor(Math.random() * 4)
            }
            else{
                break;
            }
        }
        let stp = new Object();
        stp.str = stroop.str[i];
        stp.color = stroop.color[j];
        return [stp,j]
    }

    let tip = new ezpsy.Text({
        shape: {
            text: '请根据字体的颜色按下相应按键',
            x: 26,
            y: 80,
        },
        style: {
            fill: 'orange',
            fontSize: '24px'
        }
    })

    let tip00 = new ezpsy.Text({
        shape: {
            text: 'A: 红色',
            x: 52,
            y: 40,
        },
        style: {
            // fill: 'red',
            fill: 'black',
            fontSize: '28px',
            fontWeight: '700'
        }
    })

    let tip01 = new ezpsy.Text({
        shape: {
            text: 'S: 蓝色',
            x: 152,
            y: 40,
        },
        style: {
            // fill: 'blue'
            fill: 'black',
            fontSize: '28px',
            fontWeight: '700'
        }
    })

    let tip02 = new ezpsy.Text({
        shape: {
            text: 'D: 绿色',
            x: 252,
            y: 40,
        },
        style: {
            // fill: 'green
            fill: 'black',
            fontSize: '28px',
            fontWeight: '700'
        }
    })

    let text = new ezpsy.Text({
        shape: {
            text: '请按Enter键开始实验',
            x: 58,
            y: 200
        },
        style: {
            fill: '#ff9900',
            fontSize: '30px',
            fontWeight: '800'
        }
    })
    let text0 = new ezpsy.Text({
        shape: {
            text: '按空格键结束实验',
            x: 104,
            y: 80,
        },
        style: {
            fill: 'orange',
            fontSize: '24px'
        }
    }) 
        
    ez.add([tip00,tip01,tip02])
    ez.add([tip,text])

    let count_total = 0;
    let count = 0;
    let f = 1;
    let A = ezpsy.KbName('A');
    let S = ezpsy.KbName('S');
    let D = ezpsy.KbName('D');
    let F = ezpsy.KbName('F');

    let press = (async function(){
        f = 1;
        text.remove()
        ez.add(text0);
        let time = new ezpsy.Time()
        while(f)
        {
            await ezpsy.WaitSecs(200);
            let [stp,t] = getStroop(stroop);
            let text_l = getChar(stp)
            ez.add(text_l);
            
            await ezpsy.KbPressWait([A,S,D,F,32]).then(res=>{
                if(res)
                {   
                    count_total++;
                    text_l.remove()
                }
                if(res === A)
                {
                    count_total++;
                    if(t === 0)
                    {
                        count++
                    }
                }
                if(res === S)
                {
                    count_total++;
                    if(t === 1)
                    {
                        count++
                    }
                }
                if(res === D)
                {
                    count_total++;
                    if(t === 2)
                    {
                        count++
                    }
                }
                if(res === F)
                {
                    count_total++;
                    if(t === 3)
                    {
                        count++
                    }
                }
                if(res === 32)
                {
                    f = 0;
                    text_l.remove();
                    let cent = (count/count_total * 100).toFixed(2);
                    ezpsy.KbWait(32,press);
                    dlg.show({
                        title: '实验结果',
                        content: '准确率为'+ cent.toString() + '%',
                    }).then(res=>{
                        if(res)
                        {
                            text0.remove();
                            ez.add(text);
                            count_total = 0;
                            count = 0;
                            console.dir(time)
                        }
                    })
                }
            })
            ezpsy.Toc(time);
            await ezpsy.WaitSecs(200);
            ezpsy.KbWait(13,press) 
        }
    })

    ezpsy.KbWait(13,press) 

    let getChar = function(stp){
        let textL = new ezpsy.Text({
            shape: {
                x: 150,
                y: 240,
                text: stp.str
            },
            style: {
                fill: stp.color,
                fontSize: '100px',
                fontWeight: '900'
            }
        })
        return textL
    }
}