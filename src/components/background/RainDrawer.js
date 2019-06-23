export class RainDrawer {

    constructor(canvas) {

        this.ctx = canvas.getContext("2d");
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx.strokeStyle = "rgba(174,194,224,0.5)";
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = "round";


        this.init();


    }

    init(){
        this.init = [];
        this.maxParts = 1000;
        for (let a = 0; a < this.maxParts; a++) {
            this.init.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                l: Math.random(),
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10,
            });
        }

        this.particles = [];
        for (var b = 0; b < this.maxParts; b++) {
            this.particles[b] = this.init[b];
        }
    }

    
    draw() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        for (let c = 0; c < this.particles.length; c++) {
            const p = this.particles[c];
            this.ctx.beginPath();
            this.ctx.moveTo(p.x, p.y);
            this.ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
            this.ctx.stroke();
        }
        this.move();
    }


    move() {
        for (let b = 0; b < this.particles.length; b++) {
            const p = this.particles[b];
            p.x += p.xs;
            p.y += p.ys;
            if (p.x > this.w || p.y > this.h) {
                p.x = Math.random() * this.w;
                p.y = -20;
            }
        }
    }
}
