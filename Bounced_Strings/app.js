import {
    BounceStrings
} from './bouncestrings.js';

import {
    Ball
} from './ball.js';

class App{
    constructor(){
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.body.appendChild(this.canvas);

        this.pixelRatio = (window.devicePixelRatio > 1) ? 2 : 1;
        
        this.strings = [];
        // below code is mouse event
        // this.moveX = -5000;
        // this.moveY = -5000;
        // this.isDown = false;

        window.addEventListener('resize', this.resize.bind(this), false);
        this.resize();

        this.ball = new Ball(this.stageWidth, this.stageHeight, 70, 6, '#ffa45b');

        // below code is mouse event
        // document.addEventListener('pointerdown', this.onDown.bind(this), false);
        // document.addEventListener('pointermove', this.onMove.bind(this), false);
        // document.addEventListener('pointerup', this.onUp.bind(this), false);

        window.requestAnimationFrame(this.animate.bind(this));
    }

    resize(){
        this.stageWidth = document.body.clientWidth;
        this.stageHeight = document.body.clientHeight;
        
        this.canvas.width = this.stageWidth * this.pixelRatio;
        this.canvas.height = this.stageHeight * this.pixelRatio;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);

        const xGap = 20;
        const yGap = 20;
        const x1 = xGap;
        const x2 = this.stageWidth - xGap;
        const total = Math.floor((this.stageHeight - yGap) / yGap);

        this.strings = [];

        for(let i = 0; i < total; i++){
            this.strings[i] = new BounceStrings(
                {
                    x1: x1,
                    y1: i * yGap + yGap,
                    x2: x2,
                    y2: i * yGap + yGap,
                },
                '#aee6e6'
            )
        }
    }

    animate(t){
        this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
        window.requestAnimationFrame(this.animate.bind(this));

        if(this.strings.length > 0){
            for(let i = 0; i<this.strings.length; i++){
                // below code is mouse event
                // this.strings[i].animate(this.ctx, this.moveX, this.moveY);
                this.strings[i].animate(this.ctx, this.ball.x, this.ball.y, this.ball.radius);
            }
        }

        this.ball.animate(this.ctx, this.stageWidth, this.stageHeight);
    }

    // below code is mouse event
    // onDown(e){
    //     this.isDown = true;
    //     this.moveX = e.clientX;
    //     this.moveY = e.clientY;
    // }

    // onMove(e){
    //     if(this.isDown){
    //         this.moveX = e.clientX;
    //         this.moveY = e.clientY;
    //     }
    // }

    // onUp(e){
    //     this.isDown = false;

    //     this.moveX = -5000;
    //     this.moveY = -5000;
    // }
}

window.onload = () => {
    new App();
}