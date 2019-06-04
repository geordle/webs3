import css from "./index.css";
import html from "./index.html";
import { ViewModelLocator } from "../viewModelLocator";
import { GComponent } from "../../utils/GComponent";
import { FireDrawer } from "./fireDrawer";

export class BackGroundComponent extends GComponent {

    constructor() {
        super({ css, html, isScoped: true, vm: ViewModelLocator.getInstance().fieldViewModel });

       this.canv = this.root.querySelector('#background');
        this.observe("fieldtype", () => {
            this.startCanvas(this._vm.fieldtype); 
        });

        window.requestAnimationFrame(time => {
            this.drawBackground();
        })
    }

    drawBackground(){
        console.log(this.canvaDrawer);
        if (this.canvaDrawer) {
            this.canvaDrawer.draw();
        }
        window.requestAnimationFrame(() => this.drawBackground());
    }

    static register() {
        customElements.define("g-background", BackGroundComponent);
    }

    startCanvas(type) {
            switch(type){
                case "fire":
                    this.canvaDrawer = new FireDrawer(this.canv);
                    break;
                default:
                    this.canvaDrawer =null;
            }
    }

    rain() {
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

        if (this.canv1.getContext) {
            var ctx = this.canv1.getContext('2d');
            var w = this.canv1.width;
            var h = this.canv1.height;
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';


            const init = [];
            const maxParts = 1000;
            for (let a = 0; a < maxParts; a++) {
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


            setInterval(draw, 30);

        }
    }

    wind() {
        function draw() {
            ctx.clearRect(0, 0, w, h);
            for (let c = 0; c < particles.length; c++) {
                const p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.r, p.l);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {

            for (let b = 0; b < particles.length; b++) {
                const p = particles[b];
                p.x += p.xs;
                if (p.x > w || p.y > h) {
                    p.x = Math.random() * w - 100;
                }
            }
        }

        if (this.canv4.getContext) {
            var ctx = this.canv4.getContext('2d');
            var w = this.canv4.width;
            var h = this.canv4.height;
            ctx.strokeStyle = 'rgba(174,194,224,0.5)';
            ctx.lineWidth = 1;
            ctx.lineCap = 'round';


            const init = [];
            const maxParts = 1000;
            for (let a = 0; a < maxParts; a++) {
                init.push({
                    x: Math.random() * w,
                    y: Math.random() * h,
                    l: Math.random() * 1,
                    xs: Math.random() * 4,
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




    earth() {
        const canvas = this.canv2;
        const ctx = canvas.getContext("2d");

        //full with height
        const W = window.innerWidth;
        const H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        let length, divergence, reduction, line_width, start_points = [];

        init();

        function init() {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, W, H);


            length = window.innerHeight / 4;
            divergence = 10 + Math.round(Math.random() * 50);

            reduction = Math.round(50 + Math.random() * 20) / 100;
            line_width = 10;

            const trunk = { x: W / 2, y: length + 50, angle: 90 };
            start_points = [];
            start_points.push(trunk);

            ctx.beginPath();
            ctx.moveTo(trunk.x, H - 50);
            ctx.lineTo(trunk.x, H - trunk.y);
            ctx.strokeStyle = "brown";
            ctx.lineWidth = line_width;
            ctx.stroke();

            branches();
        }

        function branches() {
            length = length * reduction;
            line_width = line_width * reduction;
            ctx.lineWidth = line_width;

            const new_start_points = [];
            ctx.beginPath();
            for (let i = 0; i < start_points.length; i++) {
                const sp = start_points[i];

                const ep1 = get_endpoint(sp.x, sp.y, sp.angle + divergence, length);
                const ep2 = get_endpoint(sp.x, sp.y, sp.angle - divergence, length);

                ctx.moveTo(sp.x, H - sp.y);
                ctx.lineTo(ep1.x, H - ep1.y);
                ctx.moveTo(sp.x, H - sp.y);
                ctx.lineTo(ep2.x, H - ep2.y);

                ep1.angle = sp.angle + divergence;
                ep2.angle = sp.angle - divergence;

                new_start_points.push(ep1);
                new_start_points.push(ep2);
            }
            if (length < 10) ctx.strokeStyle = "green";
            else ctx.strokeStyle = "brown";
            ctx.stroke();
            start_points = new_start_points;
            if (length > 2) setTimeout(branches, 50);
            else setTimeout(init, 500);
        }

        function get_endpoint(x, y, a, length) {
            const epx = x + length * Math.cos(a * Math.PI / 180);
            const epy = y + length * Math.sin(a * Math.PI / 180);
            return { x: epx, y: epy };
        }


    }
}


