import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { createElementFromHTML } from "../../utils/htmlHelpers";
import { randomFill } from "crypto";
export class BackGroundComponent extends SopedComponent {

    constructor() {
        super(css, html, true);

        this.canvas = this.root.querySelector('canvas');
        this.startCanvas();
    }




    static register() {
        customElements.define("g-background", BackGroundComponent);
    }

    startCanvas() {
        let context = this.canvas.getContext('2d');
        this.rain();
    }

    rain() {
        if (this.canvas.getContext) {
            var ctx = this.canvas.getContext('2d');
            var w = this.canvas.width;
            var h = this.canvas.height;
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';


            var init = [];
            var maxParts = 1000;
            for (var a = 0; a < maxParts; a++) {
                init.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random() * 1,
                    xs: -4 + Math.random() * 4 + 2,
                    ys: Math.random() * 10 + 10
                })
            }

            var particles = [];
            for (var b = 0; b < maxParts; b++) {
                particles[b] = init[b];
            }

            function draw() {
                ctx.clearRect(0, 0, w, h);
                for (var c = 0; c < particles.length; c++) {
                    var p = particles[c];
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                    ctx.stroke();
                }
                move();
            }

            function move() {
                for (var b = 0; b < particles.length; b++) {
                    var p = particles[b];
                    p.x += p.xs;
                    p.y += p.ys;
                    if (p.x > w || p.y > h) {
                        p.x = Math.random() * w;
                        p.y = -20;
                    }
                }
            }

            setInterval(draw, 30);

        }
    }
}


