/*
 * @Author: ATSLotus/时桐
 * @Date: 2022-02-24 22:05:19
 * @LastEditors: ATSLotus/时桐
 * @LastEditTime: 2022-11-18 21:24:19
 * @Description: 
 * @FilePath: /ezpsy/src/DataType/dataType.ts
 */
// import { Elements, Scale, Translate } from "../Element"
import { Elements } from "../Element"

export interface Shape{  
    x?: number     //position x
    y?: number     //position y
    xEnd?: number  //line's final position x
    yEnd?: number  //line's final position y
    width?: number 
    height?: number
    r?: number     //arc's radius
    ang_f?: number //arc's first angle
    ang_e?: number //arc's ended angle
    ra?: number    //the horizontal axis of the ellipse long
    rb?: number    //the vertical axis of the ellipse long
    xA?: number[]  //polygon's position x(array)
    yA?: number[]  //polygon's position y(array)
    text?: string  //text's contant
    maxWidth?: number //text's maximum length
    img?: string   //img's src
    sx?: number    //The x-coordinate position at which the cut began
    sy?: number    //The y-coordinate position at which the cut began
    swidth?: number //The width of the image being clipped
    sheight?: number//The height of the image being clipped
    desity?: number //The Grating‘s desity
    pixelsPerDegree?: number, 
    spatialFrequency?: number,
    angle?: number, 
    contrast?: number, 
    phase?: number,
    level?: number,
    gamma?: number
}
 
export interface Style {
    fill?: string|CanvasGradient   //graphic's fill color
    stroke?: string|CanvasGradient //graphic's stroke color
    lineWidth?: number  //graphic stroke width
    fontSize?: number|string  //text's size
    fontStyle?: number|string //text's style
    fontWeight?: number|string//text's weight
    fontVariant?: boolean|string //text's variant
    fontFamily?: string //text's family
}

export interface nameStyle{
    // ezpsyId: number
    name: string
    graphicId: number
}

export interface Opts{
    shape?: Shape
    style?: Style
}

export interface Options{
    els: Array<any>  //元素变量名
}