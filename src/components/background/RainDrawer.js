export class RainDrawer {

    constructor(canvas) {
        this.rain(canvas)
    }
    rain(canvas) {
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let c = 0; c < particles.length; c++) {
                const p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {
            for (let b = 0; b < particles.length; b++) {
                const p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.x > w || p.y > h) {
                    p.x = Math.random() * w;
                    p.y = -20;
                }
            }
        }

        if (canvas.getContext) {
            var ctx = canvas.getContext('2d');
            var w = canvas.width;
            var h = canvas.height;
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';


            const init = [];
            const maxParts = 1000;
            for (let a = 0; a < maxParts; a++) {
                init.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random(),
                    xs: -4 + Math.random() * 4 + 2,
                    ys: Math.random() * 10 + 10
                })
            }

            var particles = [];
            for (var b = 0; b < maxParts; b++) {
                particles[b] = init[b];
            }


            setInterval(draw, 30);

        }
    }
}
