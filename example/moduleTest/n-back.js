// import ezpsy from "../../dist/esm/index.js"

let nBackFun = function(){

    deleteChild(dom_0)

    let text0 = new ezpsy.Texts({
        shape: {
            text: '实验开始后系统将会显示一个数值N',
            x: 40,
            y: 35,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let text1 = new ezpsy.Texts({
        shape: {
            text: '请根据数值N来完成实验',
            x: 90,
            y: 70,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let text2 = new ezpsy.Texts({
        shape: {
            text: '看到的每一个字母',
            x: 120,
            y: 105,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let text3 = new ezpsy.Texts({
        shape: {
            text: '请回忆该字母前第N个字母是否与之相同',
            x: 20,
            y: 140,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let text4 = new ezpsy.Texts({
        shape: {
            // text: '若N为0，则与O比较',
            text: '若N为0，则与8比较',
            x: 110,
            y: 175,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let text5 = new ezpsy.Texts({
        shape: {
            text: '若相同，则按D，否则按J',
            x: 80,
            y: 210,
        },
        style: {
            fill: 'black',
            fontSize: '20px'
        }
    })

    let tip = new ezpsy.Texts({
        shape: {
            text: '请按 Enter 键开始',
            x: 80,
            y: 260,
        },
        style: {
            fill: 'red',
            fontSize: '28px'
        }
    })

    let tip1 = new ezpsy.Texts({
        shape: {
            text: '请按 Enter 键提升难度',
            x: 60,
            y: 200,
        },
        style: {
            fill: 'red',
            fontSize: '28px'
        }
    })

    let text = new ezpsy.Group([text0,text1,text2,text3,text4,text5]);
    console.dir(text)
    ez.add(text);
    ez.add(tip);

    let N = 0;
    let num = 0;
    let arrA = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    let char = '';
    let arr = new Array();
    let res = new Array();
    let result = new Array();
    let f = 1;
    let charT;
    let D = ezpsy.KbName('D');
    let J = ezpsy.KbName('J');

    let getChar = function(){
        num = Math.floor(Math.random() * 9);
        char = arrA[num];
        // char = num;
        arr.push(char);
        let charText = new ezpsy.Texts({
            shape: {
                text: char,
                x: 180,
                y: 210
            },
            style: {
                fill: 'red',
                fontSize: '60px'
            }
        })
        return charText;
    }

    let judge = function(){
        if(N === 0)
        {
            console.dir('aa')
            for(let i =0;i < arr.length;i++)
            {
                if(arr[i] === 'O')
                // if(arr[i] === 8)
                {
                    if(res[i] === 'D')
                    {
                        result.push(1);
                    }
                    else{
                        result.push(0);
                    }
                }
                else{
                    if(res[i] === 'J')
                    {
                        result.push(1);
                    }
                    else{
                        result.push(0);
                    }
                }
            }
        }
        else{
            for(let i = 0;i < arr.length;i++){
                if(i < N)
                {
                    if(res[i] === 'J')
                    {
                        result.push(1);
                    }
                    else{
                        result.push(0);
                    }
                }
                else{
                    if(arr[i] === arr[i-N])
                    {
                        if(res[i] === 'D')
                        {
                            result.push(1);
                        }
                        else{
                            result.push(0);
                        }
                    }
                    else{
                        if(res[i] === 'J')
                        {
                            result.push(1);
                        }
                        else{
                            result.push(0);
                        }
                        
                    }
                }
            }
        }
    }
    N = 6;
    let press = (async function(){
        f = 1;
        text.remove()
        tip.remove()
        console.dir(tip);
        // N = Math.floor(Math.random() * 6);
        
        let tip0 = new ezpsy.Texts({
            shape: {
                text: 'N = ' + N.toString(),
                x: 160,
                y: 50
            },
            style: {
                fill: 'red',
                fontSize: '30px'
            }
        })
        ez.add(tip0);

        while(f){
            await ezpsy.WaitSecs(500).then(e=>{
                charT = getChar();
                ez.add(charT);
            })
            await ezpsy.KbPressWait([D,J,32]).then(e=>{
                if(e)
                {
                    charT.remove();
                }
                if(e === D)
                {
                    res.push('D');
                    // console.dir('aaa');
                }
                else if(e === J)
                {
                    res.push('J');
                }
                else if(e === 32)
                {
                    f = 0;
                    arr.pop();
                }
            })
            // await ezpsy.WaitSecs(1000).then(e=>{
            //     charT.remove();
            //     res.push(" ");
            // })
        }
        await judge();
        console.dir(arr);
        console.dir(res);
        console.dir(result);

        tip0.remove()
        tip.shape = {
            text: '请按 Enter 键提升难度',
            x: 60,
            y: 200, 
        }
        ez.add(tip);

        N++;

        await ezpsy.KbWait(13,press);

    })

    ezpsy.KbWait(13,press);

}