import {
    Ball
} from './ball.js';

import {
    Block
} from './block.js';

class App {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        document.body.appendChild(this.canvas);

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;

        // add window's resize event
        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        // block > width, height, position x, position y
        this.block = new Block(700, 30, 300, 450);

        // ball > position x, position y, radius, speed
        this.ball = new Ball(this.stageWidth, this.stageHeight, 60, 15, this.block);

        // set animation
        window.requestAnimationFrame(this.animate.bind(this));        
    }
    
    resize() {
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
    }
    
    animate(t) {
        window.requestAnimationFrame(this.animate.bind(this));

        // prev position clear
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

        // draw block
        this.block.draw(this.ctx);

        // draw ball
        this.ball.draw(this.ctx, this.stageWidth, this.stageHeight, this.block)
    }
}

window.onload = () => {
    new App();
}