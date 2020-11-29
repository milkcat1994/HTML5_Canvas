export class Ball{
    constructor(stageWidth, stageHeight, radius, speed, block){
        this.radius = radius;
        this.vx = speed;
        this.vy = speed;

        const diameter = this.radius * 2;
        // set random Position
        do{
            this.x = diameter + (Math.random() * (stageWidth - diameter*2));
            this.y = diameter + (Math.random() * (stageHeight - diameter*2));
        }while(this.isInBlock(this, block));
    }

    // def draw function
    draw(ctx, stageWidth, stageHeight, block){
        // change position
        this.x += this.vx;
        this.y += this.vy;

        this.bounceWindow(stageWidth, stageHeight);

        this.bounceBlock(block);

        // ball's color, draw
        ctx.fillStyle = '#fdd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
    }

    bounceWindow(stageWidth, stageHeight){
        const minX = this.radius;
        const maxX = stageWidth - this.radius;
        const minY = this.radius;
        const maxY = stageHeight - this.radius;

        if(this.x <= minX || this.x >= maxX){
            this.vx *= -1;
            this.x += this.vx;
        }
        else if(this.y <= minY || this.y >= maxY){
            this.vy *= -1;
            this.y += this.vy;
        }
    }

    bounceBlock(block){
        const minX = block.x - this.radius;
        const maxX = block.maxX + this.radius;
        const minY = block.y - this.radius;
        const maxY = block.maxY + this.radius;

        // conflict
        if(this.x > minX &&  this.x < maxX && this.y > minY && this.y < maxY){
            // x axis distance
            const x1 = Math.abs(minX - this.x);
            const x2 = Math.abs(this.x - maxX);
            
            // y axis distance
            const y1 = Math.abs(minY - this.y);
            const y2 = Math.abs(this.y - maxY);

            // get small distance
            const min1 = Math.min(x1, x2);
            const min2 = Math.min(y1, y2);
            const min = Math.min(min1, min2);

            // conflict left-right
            if(min == min1){
                this.vx *= -1;
                this.x += this.vx;
            }
            // conflict up-down
            else if(min == min2){
                this.vy *= -1;
                this.y += this.vy;
            }
        }
    }

    // when the ball is created at the block position
    isInBlock(ball, block){
        const minX = block.x - ball.radius;
        const maxX = block.maxX + ball.radius;
        const minY = block.y - ball.radius;
        const maxY = block.maxY + ball.radius;

        if(this.x > minX &&  this.x < maxX && this.y > minY && this.y < maxY){
            return true;
        }

        return false;
    }
}
