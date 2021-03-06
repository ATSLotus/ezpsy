// import ezpsy from "../../dist/esm/index.js"

let rememberFun = function()
{   

    deleteChild(dom_0)

    let getArr = function(){
        var arr = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var k;
        var Arr = new Array();
        var arr0 = new Array();
        var n = 12;
        var x = 0;
        var i = 0;
        while(i < n){
            k = Math.floor(Math.random() * 26);
            if(Arr.indexOf(k) == -1){
                Arr.push(k);
                x = Arr[i];
                arr0[i] = arr[x];
                i++;
            }
        }
        return arr0;
    }

    let arr = [];

    let group;
    let text0 = new Array();

    // let ez = ezpsy.init(document.getElementById("dom"))

    let text = new ezpsy.Texts({
        shape: {
            text: '请按Enter键开始实验',
            x: 90,
            y: 200,
            maxWidth: 200
        },
        style: {
            fill: 'red',
            fontSize: '24px',
            fontWeight: 'bold'
        }
    })

    let text_t = new ezpsy.Texts({
        shape: {
            text: '实验开始后您将有1秒的时间去记忆屏幕所出现的字母',
            x: 0,
            y: 100,
            // maxWidth: 200
        },
        style: {
            fill: 'black',
            fontSize: '24px'
        }
    })

    let text1 = new ezpsy.Texts({
        shape: {
            text: '预备',
            x: 180,
            y: 200,
            maxWidth: 200
        },
        style: {
            fill: 'black',
            fontSize: '24px'
        }
    })

    // let dlg = new ezpsy.DlgInit(document.getElementById("dom"))


    // console.dir(text)


    let removeRecur = function(t){
        t = t.replace(/[^a-zA-Z]*/g, '')
        let a = ''
        let item = 0;
        for(let i = 0;i < t.length;i++)
        {
            a = t[i]
            while(1)
            {
                item = t.lastIndexOf(a)
                if(item === -1 || item === i)
                {
                    break;
                }
                else
                {
                    t = Array.from(t);
                    t.splice(item,1)
                    t = t.join("");
                }
            }
        }
        return t.toUpperCase();
    }
    
    ez.add(text)
    ez.add(text_t)

    let test = function(){
        text_t.remove()
        text.remove()
        ezpsy.WaitSecs(100)
        .then(e=>{
            if(e)
            {
                return new Promise((res,rej)=>{
                    ez.add(text1)
                    res(true)
                })
            }
        })
        .then(e=>{
            if(e){
                return new Promise((res,rej)=>{
                    ezpsy.WaitSecs(1000).then(e=>{
                        res(true)
                    })
                    
                })
            }
        })
        .then(e=>{
            if(e)
            {
                return new Promise((res,rej)=>{
                    arr = getArr();
                    let t = 0;
                    let k = 0;
                    // console.dir(arr)
                    for(let i = 0;i < 12;i++)
                    {
                        if(i % 4 == 0){
                            t++;
                            k = 0;
                        }
                        text0[i] = new ezpsy.Texts({
                            shape: {
                                text: arr[i],
                                x: 35+100*k,
                                y: 0+100*t,
                                maxWidth: 200
                            },
                            style: {
                                fill: 'black',
                                fontSize: '24px'
                            }
                        })
                        k++;
                    }
                    text1.remove()
                    group = new ezpsy.Group(text0);
                    ez.add(group);
                    res(true)
                })
            }
        })
        .then(e=>{
            if(e){
                return new Promise((res,rej)=>{
                    ezpsy.WaitSecs(1000).then(e=>{
                        res(true)
                    })
                    
                })
            }
        })
        .then(e=>{
            if(e){
                group.remove();
                return dlg.show({
                    title: '请输入字母',
                    content: '请输入所记住的字母',
                    intStr: ['字母'],
                    type: 'input'
                }) 
            }
        })
        .then(e=>{
            if(e)
            {
                let a = arr.toString();
                let num = 0;
                let t = dlg.intValue[1]
                t = removeRecur(t);
                console.dir(t)
                for(let i = 0;i < t.length;i++)
                {
                    for(let j = 0;j < a.length;j++){
                        if(t[i]===a[j])
                        {
                            num++
                            break;
                        }
                    }
                }
                return dlg.show({
                    title: '结果',
                    content: '共记住'+ num +'个字母',
                })
            }
                
        })
        .then(e=>{
            if(e){
                ez.add(text)
                ez.add(text_t)
            }
        })
    }
    
    ezpsy.KbWait(13,test)

}