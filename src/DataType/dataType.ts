
export interface Shape{  
    x?: number     //postion x
    y?: number
    xEnd?: number
    yEnd?: number
    width?: number
    height?: number
    r?: number
    ang_f?: number
    ang_e?: number
    ra?: number
    rb?: number
    xA?: number[]
    yA?: number[]
    text?: string
    maxWidth?: number
    img?: string
    sx?: number
    sy?: number
    swidth?: number
    sheight?: number
}
 
export interface Style {
    fill?: string 
    stroke?: string
    lineWidth?: number
    fontSize?: number|string
    fontStyle?: number|string
    fontWeight?: number|string
    fontVariant?: boolean|string
    fontFamily?: string
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