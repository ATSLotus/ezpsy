import { Shape,Style,nameStyle,Opts } from '../DataType/dataType'
import { Elements } from '../Element'
import { Group } from '../Group/group';
import { judgeImageShape, judgeStyle,judgeImageShape_true, judgeTRS } from '../Judge/judge'

interface ImgShape extends Shape{
    img: string
    x: number
    y: number
    width?: number
    height?: number
    sx?: number
    sy?: number
    swidth?: number
    sheight?: number
}

interface ImgOpts extends Opts{
    shape: ImgShape
    style?: Style
    Img?: any
    ImgData?: ImageData
}

let nameId = 0;

class RGBA {
    R: number
    G: number
    B: number
    A: number
}

class RGBA_Array{
    RGBA_List: RGBA[]
    width: number
    height: number
}

export class Img extends Elements{
    readonly name?: nameStyle = {
        name: "img" + nameId.toString(),
        graphicId: nameId
    }
    Img?: any
    ImgData?: ImageData
    IsChange?: boolean
    greyImgData?: ImageData
    constructor(opts: ImgOpts){
        super()
        this.shape = opts.shape;
        // this.ctx = super.ctx
        if(opts.Img === undefined)
        {
            let I = new Image()
            I.src = opts.shape.img
            I.crossOrigin = 'Anonymous'; 
            this.Img = I;
            console.dir(this.Img)
        }
        else{
            this.Img = opts.Img
        }
        this.IsChange = false
        // this.textures = {
        //     texture: [],
        //     width: 0,
        //     height: 0
        // }
        // if(opts.ImgData !== undefined)
        // {
        //     this.ImgData = opts.ImgData
        // }
        if(opts.shape.sx === undefined)
        {
            this.shape.sx = 0;
        }
        if(opts.shape.sy === undefined)
        {
            this.shape.sy = 0;
        }
        if(opts.shape.swidth === undefined)
        {
            this.shape.swidth = this.Img.width;
        }
        if(opts.shape.sheight === undefined)
        {
            this.shape.sheight = this.Img.height;
        }
        if(opts.shape.width === undefined)
        {
            this.shape.width = this.Img.width;
        }
        if(opts.shape.height === undefined)
        {
            this.shape.height = this.Img.height
        }
        let that = this;
        this.init().then(async imageData=>{
            console.dir(imageData);
            that.ImgData =  <ImageData>imageData;
        })

        nameId++
    }
    init(){
        let that = this;
        return new Promise(function(resolve, reject) {
            if (that.Img.src == null) return reject();
            let canvas = document.createElement('canvas'),
                context = canvas.getContext('2d'),
                image = new Image();
            image.addEventListener('load', function() {
                canvas.width = image.width;
                canvas.height = image.height;
                context.drawImage(image, 0, 0, that.Img.width, that.Img.height);
                resolve(context.getImageData(0, 0, that.Img.width, that.Img.height));
            }, false);
            image.crossOrigin = "Anonymous"
            image.src = that.Img.src;
        });
    }
    toGray(){
        // let img = new Img({
        //     shape: {
        //         img: this.shape.img,
        //         x: this.shape.x,
        //         y: this.shape.y,
        //         width: this.shape.width,
        //         height: this.shape.height,
        //         sx: this.shape.sx,
        //         sy: this.shape.sy,
        //         swidth: this.shape.swidth,
        //         sheight: this.shape.sheight,
        //     }
        // })
        // this.IsChange = true
        this.IsChange = true
        let g = 0
        this.greyImgData = new ImageData(this.Img.width,this.Img.height);
        for(let i = 0;i < this.ImgData.data.length/4;i++)
        {
            g = Math.floor(this.ImgData.data[4*i+0] * 0.299 + this.ImgData.data[4*i+1] * 0.587 + this.ImgData.data[4*i+2] * 0.114);
            // img.ImgData.data[4*i+0] = g
            // img.ImgData.data[4*i+1] = g
            // img.ImgData.data[4*i+2] = g
            // img.ImgData.data[4*i+3] = this.ImgData.data[4*i+3]
            this.greyImgData.data[4*i+0] = g
            this.greyImgData.data[4*i+1] = g
            this.greyImgData.data[4*i+2] = g
            this.greyImgData.data[4*i+3] = this.ImgData.data[4*i+3]
        }
        // return img;
    }
    replace(){
        this.IsChange = false
        this.init()
    }
    // makeTextures(){
    //     // this.textures = new Textures(this);
    //     let img = this.toGray();
    //     let data0 = img.ImgData.data;
    //     let a = new Array()
    //     let arr = ''
    //     let numArr: number[] = [];
    //     let numArr0: number[] = [];
    //     // let data = this.ImgData.data
    //     let w = this.ImgData.width
    //     // console.dir(w)
    //     // console.dir(data)
    //     for(let i = 0;i < data0.length/4;i++)
    //     {
    //         for(let t = 0;t < 3;t++)
    //         {
    //             for(let k = 0;k < 3;k++)
    //             {
    //                 if(data0[4*i] <= data0[4*(i+(t-1)*w+k-1)] || data0[4*(i+(t-1)*w+k-1)] === undefined)
    //                 {
    //                     a[3*t+k] = 0
    //                 }
    //                 else{
    //                     a[3*t+k] = 1
    //                 }
    //                 if(3*t+k !== 4)
    //                 {
    //                     arr += a[3*t+k].toString(); 
    //                 }
    //                 // console.dir((i+(t-1)*w+k-1))
    //             }
                
    //         }
    //         numArr[i] = parseInt(arr,2)
    //         arr = ''
    //     }
    //     for(let i = 0;i < numArr.length;i++)
    //     {
    //         img.ImgData.data[4*i+0]=numArr[i]
    //         img.ImgData.data[4*i+1]=numArr[i]
    //         img.ImgData.data[4*i+2]=numArr[i]
    //     }
    //     return img;
    // }
}

export function makeImg(img: Img,ctx: CanvasRenderingContext2D): Img{
    ctx.save()
    ctx.beginPath()
    // judgeTRS(img)
    if(img.IsChange === false)
    {
        judgeImageShape(img,ctx);
    }
    else{
        judgeImageShape_true(img,ctx);
    }
    
    ctx.closePath()
    ctx.restore()
    return img
}

export function imRead(img: Img): ImageData{         //读取图片矩阵
    return img.ImgData;
}

export function UnpackColorImage(img: Img): RGBA_Array{
    let rgba = new Array()
    let data = img.ImgData.data
    
    for(let i = 0;i < data.length/4;i++)
    {
        rgba[i] = new RGBA()
        
        rgba[i].R = data[4*i+0]
        rgba[i].G = data[4*i+1]
        rgba[i].B = data[4*i+2]
        rgba[i].A = data[4*i+3]

    }

    let rgba_arr = new RGBA_Array()
    rgba_arr.RGBA_List = rgba;
    rgba_arr.width = img.ImgData.width
    rgba_arr.height = img.ImgData.height

    return rgba_arr
}

export function PackColorImage(rgba_arr: RGBA_Array): ImageData{
    let c = document.createElement('canvas')
    let ctx = c.getContext('2d')
    let imgdata = ctx.createImageData(rgba_arr.width,rgba_arr.height);
    for(let i = 0;i < rgba_arr.RGBA_List.length;i++)
    {
        imgdata.data[4*i+0] = rgba_arr.RGBA_List[i].R
        imgdata.data[4*i+1] = rgba_arr.RGBA_List[i].G
        imgdata.data[4*i+2] = rgba_arr.RGBA_List[i].B
        imgdata.data[4*i+3] = rgba_arr.RGBA_List[i].A
    }
    return imgdata
}

export function MaskImageIn(img: Img,alphaIn: number): Img{
    if(alphaIn>1 || alphaIn<0)
    {
        alphaIn = 1;
    }
    let newImg = new Img({
        shape: {
            img: img.shape.img,
            x: img.shape.x,
            y: img.shape.y
        }
    })
    // console.dir(img.ImgData)
    // console.dir(newImg.ImgData)
    newImg.IsChange = true
    for(let i = 0;i < img.ImgData.data.length/4;i++)
    {
        newImg.ImgData.data[4*i+3] *= alphaIn
    }
    

    return newImg
}

export function MaskImageOut(img: Img,alphaIn: number): Img{
    if(alphaIn>1 || alphaIn<0)
    {
        alphaIn = 0;
    }
    let newImg = new Img({
        shape: {
            img: img.shape.img,
            x: img.shape.x,
            y: img.shape.y
        }
    })
    // console.dir(img.ImgData)
    // console.dir(newImg.ImgData)
    newImg.IsChange = true
    for(let i = 0;i < img.ImgData.data.length/4;i++)
    {
        newImg.ImgData.data[4*i+3] *= (1 - alphaIn)
    }
    

    return newImg
}

export function ImgInit(img: Img[]|Group){
    let I;
    if(img[0] instanceof Img)
    {
        I = new Group(img)
    }
    else{
        I = img
    }
    for(let i = 0;i < I.groupList.length;i++)
    {
        I.groupList[i].init()
    }
}

// export function PreloadTextures(img: Img): Img{
//     let newImg = img.makeTextures();
//     return newImg
// }

// export function DrawTexture(img: Img): Img{
//     let newImg = img.makeTextures();
//     return newImg
// }

// export function DrawTextures(img: Img[]|Group): Group{
//     let I;
//     let texture: Img[] = []
//     let T;
//     if(img[0] instanceof Img)
//     {
//         I = new Group(img)
//     }
//     else{
//         I = img
//     }
//     for(let i = 0;i < I.groupList.length;i++)
//     {
//         texture[i] = DrawTexture(I.groupList[i])
//     }
//     T = new Group(texture)
//     return T;
// }