// for wave
export class Point{
    constructor(index, x, y){
        this.x = x;
        this.y = y;
        this.fixedY = y;
        this.speed = 0.1;
        this.cur = index;

        // amount to move
        this.max = Math.random() *100 + 150;
    }

    // if you call this function, the point moved up-and-down
    update(){
        this.cur += this.speed;
        this.y = this.fixedY + (Math.sin(this.cur) * this.max);
    }
}