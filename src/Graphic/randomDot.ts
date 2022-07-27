import { Circle, makeCircle } from '../Graphic/circle'
import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'

interface RandomDotShape extends Shape{
    x: number,
    y: number,
    r: number,
    maskBand?: number,
    number?: number,
    maxSpeed?: number,
    minSpeed?: number
}

interface Point {
    x: number,
    y: number
}

interface RandomDotOpts extends Opts{
    shape: RandomDotShape
    style?: Style
}

let nameId = 0;

export class RandomDot extends Elements{
    readonly name?: nameStyle = {
        name: "randomDot" + nameId.toString(),
        graphicId: nameId
    }
    declare shape?: RandomDotShape
    RandomDotArray: Array<Circle>
    maskBand: Array<Circle>
    translation: Array<Point>
    constructor(opts: RandomDotOpts){
        super();
        this.shape = opts.shape;
        this.ctx = super.ctx;
        if(!this.shape.maskBand)
            this.shape.maskBand = 8;
        if(!this.shape.number)
            this.shape.number = 10;
        if(!this.shape.maxSpeed)
            this.shape.maxSpeed = 5;
        if(!this.shape.minSpeed)
            this.shape.minSpeed = 0;

        this.maskBand = new Array();

        this.RandomDotArray = randomisedPoint(this.shape.r,this.shape.maskBand,this.shape.number);

        this.maskBand[0] = new Circle({
            shape: {
                x: this.shape.x,
                y: this.shape.y,
                r: this.shape.r
            },
            style: {
                fill: 'white'
            }
        })
        this.maskBand[1] = new Circle({
            shape: {
                x: this.shape.x,
                y: this.shape.y,
                r: this.shape.r+this.shape.maskBand/2
            },
            style: {
                stroke: "#888888",
                lineWidth: this.shape.maskBand
            }
        })

        this.translation = getRandom(this.shape.maxSpeed,this.shape.minSpeed,this.shape.number);

        nameId++;
    }
}

export function playRandomDot(randomDot: RandomDot,ctx: CanvasRenderingContext2D){
    randomDot.ctx = ctx;

    let sh = randomDot.shape;

    // makeCircle(randomDot.maskBand[0],ctx);
    // makeCircle(randomDot.maskBand[1],ctx);

    let f = new Array();
    let trans = new Array();

    for(let i = 0;i < sh.number;i++)
    {
        f.push(1);
        trans.push({x:randomDot.translation[i].x,y:randomDot.translation[i].y});
    }

    randomDot.animate(()=>{
        for(let i = 0;i < sh.number;i++)
        {
            let x = randomDot.RandomDotArray[i].shape.x+trans[i].x;
            let y = randomDot.RandomDotArray[i].shape.y+trans[i].y;

            if((Math.pow(x-sh.x,2)+Math.pow(y-sh.y,2)) >= Math.pow(sh.r-sh.maskBand,2))
                f[i] *= (-1);

            randomDot.RandomDotArray[i].translate = {
                x: trans[i].x,
                y: trans[i].y
            }

            trans[i].x = trans[i].x + f[i]*randomDot.translation[i].x;
            trans[i].y = trans[i].y + f[i]*randomDot.translation[i].y;

        }
    },1);
    
}

function randomAnimation(randomDot: RandomDot){
    let sh = randomDot.shape;

    let f = new Array();
    let trans = new Array();

    for(let i = 0;i < sh.number;i++)
    {
        f.push(1);
        trans.push({x:randomDot.translation[i].x,y:randomDot.translation[i].y});
    }
    
    for(let i = 0;i < sh.number;i++)
    {
        let x = randomDot.RandomDotArray[i].shape.x+trans[i].x;
        let y = randomDot.RandomDotArray[i].shape.y+trans[i].y;

        if((Math.pow(x-sh.x,2)+Math.pow(y-sh.y,2)) >= Math.pow(sh.r-sh.maskBand,2))
            f[i] *= (-1);

        randomDot.RandomDotArray[i].translate = {
            x: trans[i].x,
            y: trans[i].y
        }

        // console.dir(f[i]*translateX[i])

        trans[i].x = trans[i].x + f[i]*randomDot.translation[i].x;
        trans[i].y = trans[i].y + f[i]*randomDot.translation[i].y;

    }
}

function randomisedPoint(radius:number,maskBand:number,number:number):Array<Circle>{
    let arr = getNonRepetitiveRandom(radius-maskBand,radius,number);
    let dot = new Array();
    for(let i = 0;i < number;i++)
    {
        dot[i] = new Circle({
            shape: {
                x: arr[i].x,
                y: arr[i].y,
                r: 2
            },
            style: {
                fill: "#000000"
            }
        })
    }
    return dot;
}

function dotArea(r:number,radius:number):Array<Point>{
    let arr:Array<Point> = new Array();
    for(let i = 0;i < 2*r;i++)
    {
        for(let j = 0;j < 2*r;j++)
        {
            let r2 = Math.pow(i-radius,2) + Math.pow(j-radius,2)
            if(r2 <= Math.pow(r,2))
            {
                arr.push({x:i,y:j})
            }
        }
    }
    return arr;
}

function getNonRepetitiveRandom(r:number,radius:number,number:number):Array<Point>{
    let arr:Array<Point> = new Array();

    let template = dotArea(r,radius);

    for(let i = 0;i < number;i++)
    {
        let index = Math.floor(Math.random()*template.length);
        arr.push(template[index]);
        template.splice(index,1);
    }

    return arr;
}

function getRandom(maxSpeed:number,minSpeed:number,number:number):Array<Point>{
    let arr:Array<Point> = new Array();

    for(let i = 0;i < number;i++)
    {
        let x = setRandom(maxSpeed,minSpeed);
        let y = setRandom(maxSpeed,minSpeed);
        arr.push({x:x,y:y});
    }

    return arr;
}

function setRandom(maxSpeed:number,minSpeed:number):number{
    let num = Math.random()*(maxSpeed-minSpeed) + minSpeed;
    let signF = Math.round(Math.random());
    let sign = 0;
    if(signF)
        sign = 1;
    else
        sign = -1;
    num *= sign;
    return num;
}