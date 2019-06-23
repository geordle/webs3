export class ClearDrawer {

    constructor(canvas) {

        this.ctx = canvas.getContext('2d');
        this.w = canvas.width;
        this.h = canvas.height;
        this.ctx.strokeStyle = 'rgba(255,220,0,0.5)';
        this.ctx.lineWidth = 10;
        this.ctx.lineCap = 'square';


        this.init = [];
        this.maxParts = 30;
        for (let a = 0; a < this.maxParts; a++) {
            this.init.push({
                x:  this.w,
                y:  0,
                l: Math.random(),
                xs: Math.random() * 3,
                ys: Math.random() * 3,
            })
        }

        this.particles = [];
        for (var b = 0; b < this.maxParts; b++) {
            this.particles[b] = this.init[b];
        }

        
    }

    move() {

        for (let b = 0; b < this.particles.length; b++) {
            const p =this. particles[b];
            p.x -= p.xs;
            p.y += p.ys;
            if (p.x > this.w || p.y > this.h) {
                p.x = this.w;
                p.y = 0;
            }
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255,220,0,1)';

        this.ctx.arc(this.w,0,200, 0, 360);
        this.ctx.fill();
            for (let c = 0; c < this.particles.length; c++) {
                const p =this. particles[c];
                this.ctx.beginPath();
                this.ctx.moveTo(p.x, p.y);
                this.ctx.lineTo(p.x + p.xs * 30, p.y - +p.ys * 30);
                this.ctx.stroke();
            }
            this.move();
    }
}
