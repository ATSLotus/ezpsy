import { Rectangle } from './Graphic/rectangle'
import { Shape,Style} from './DataType/dataType'

export class Elements{
    shape?: Shape
    style?: Style 
    ctx?: CanvasRenderingContext2D
    constructor(){

    }
    noFill(){
        this.style.fill = 'none';
    }
    noStroke(){
        this.style.lineWidth = 0;
        // if(this.style.fill !== 'none' && this.style.fill !== undefined){
        //     this.style.stroke = this.style.fill
        // }
        // else{
        //     this.style.stroke = "#fff";
        //     console.dir('Error!')
        // }
        this.style.stroke = 'none'
    }
    remove(){
        
    }
    // animate(){
    //     if(this.ctx)
    //     {
    //         this.animate.prototype.done = function(func: Function){
                 
    //         }
    //     }
    //     else{
    //         console.error();
    //     }
        
    // }
}