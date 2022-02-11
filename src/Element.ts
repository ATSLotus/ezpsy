import { Rectangle } from './Graphic/rectangle'
import { Shape,Style} from './DataType/dataType'

export class Elements{
    shape: Shape
    style?: Style 
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
}