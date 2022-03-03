import { canvasStyle } from "./Canvas/canvas";

let canvasStorageId = 0
// let Storage = new Array()

export class canvasStorage{
    id: number
    private ctx: CanvasRenderingContext2D

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
        canvasStorageId++
    }
}

export function setCanvasStorage(ctx: CanvasRenderingContext2D){
    let cStorage = new canvasStorage(ctx)
    // Storage.push(cStorage);
}