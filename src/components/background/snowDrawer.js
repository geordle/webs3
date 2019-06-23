export class SnowDrawer {

    constructor(canvas) {

        this.ctx = canvas.getContext('2d');
        this.w = canvas.width;
        this.h = canvas.height;
        this.angle = 0;

        this.p = 300;
        this.particles = [];
        for (var i = 0; i < this.p; i++) {
            this.particles.push({
                x: Math.random() * this.w, //x-coordinate
                y: Math.random() * this.h, //y-coordinate
                r: Math.random() * 4 + 1, //radius
                d: Math.random() * this.p
            })
        }


    }
    draw() {
        this.ctx.clearRect(0, 0, this.w, this.h);
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        this.ctx.beginPath();
        for (var i = 0; i < this.p; i++) {
            var p = this.particles[i];
            this.ctx.moveTo(p.x, p.y);
            this.ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        this.ctx.fill();
        this.update();
    }
    update() {
        this.angle += 0.01;
        for (var i = 0; i < this.p; i++) {
            var p = this.particles[i];
            p.y += Math.cos(this.angle + p.d) + 1 + p.r / 2;
            p.x += Math.sin(this.angle) * 2;
            if (p.x > this.w + 5 || p.x < -5 || p.y > this.h) {
                if (i % 3 > 0) 
                {
                    this.particles[i] = { x: Math.random() * this.w, y: -10, r: p.r, d: p.d };
                }
                else {
                    if (Math.sin(this.angle) > 0) {
                        this.particles[i] = { x: -5, y: Math.random() * this.h, r: p.r, d: p.d };
                    }
                    else {
                        this.particles[i] = { x: W + 5, y: Math.random() * this.h, r: p.r, d: p.d };
                    }
                }
            }
        }
    }
}


