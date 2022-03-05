
export function createGratLinearGradient(ctx: CanvasRenderingContext2D,[x0,y0,x1,y1]: [number,number,number,number],num: number,s: number): CanvasGradient{
    let fill = ctx.createLinearGradient(x0,y0-s,x1,y1-s)
    fill.addColorStop(0,'#fff')
    for(let i = 1;i < num;i++){
        if(i%2 === 1){
            fill.addColorStop(i/num,'#000')
        }
        else{
            fill.addColorStop(i/num,'#fff')
        }
    }
    fill.addColorStop(1,'#fff')
    return fill
}