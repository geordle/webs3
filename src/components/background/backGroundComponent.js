import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { createElementFromHTML } from "../../utils/htmlHelpers";
import { randomFill } from "crypto";
export class BackGroundComponent extends SopedComponent {

    constructor() {
        super(css, html, true);

        this.canv = this.root.querySelector('canvas');
        this.startCanvas();
    }




    static register() {
        customElements.define("g-background", BackGroundComponent);
    }

    startCanvas() {
        let context = this.canv.getContext('2d');
        this.fire();
    }

    rain() {
        if (this.canv.getContext) {
            var ctx = this.canv.getContext('2d');
            var w = this.canv.width;
            var h = this.canv.height;
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

    fire(){
        this.x = this.canv
        var CANVAS_WIDTH = 400;
        var CANVAS_HEIGHT = 200;
        var BASE_COLORS = 768; // 256 reds + 256 yellow/orange + 256 orange/whites
        var WHITES = 150; // Additional white colors to add intensity
        var MAX_COLORS = BASE_COLORS + WHITES;
        var CHUNK = 6; // The number of consecutive pixels of fire/no fire to draw in th gutter lines
        var GUTTER_LINES = 10; // The number of lines at the base of the fire that are required for the math, but don't display so nicely
        var colors = initColors();
        var canvas = initCanvas(this.x);
        var context = canvas.getContext("2d");
        var fireImage = context.createImageData(canvas.width, canvas.height);
        
        var numPixels = fireImage.width * fireImage.height;
        var buffers = [new Uint16Array(numPixels), new Uint16Array(numPixels)];
        var fireImageWidth = fireImage.width;
        var fireImageHeight = fireImage.height;
        var mainBuffer = 0;
        var backBuffer = 1;
        
        /**
         * Flip between the main buffer and the back buffer
         */
        function flipBuffers() {
            mainBuffer = 1 - mainBuffer;
            backBuffer = 1 - backBuffer;
        }
        
        function initCanvas(init) {
            var canvas = init;
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            return canvas;
        }
        
        function drawAnimationFrame() {
        
            for (var n = 0; n < canvas.width / CHUNK; n++) {
                var color = (Math.random() >= 0.4) ? (MAX_COLORS - 1) : 0;
                for (var c = 0; c < CHUNK; c++) {
                    buffers[backBuffer][numPixels - n * CHUNK - c] = color;
                }
            }
        
            for (var y = canvas.height - 1; y >= 1; y--) {
                for (var x = 1; x < canvas.width - 1; x++) {
                    var sum = 0;
                    var pixelIndex = y * canvas.width + x;
                    sum += buffers[backBuffer][pixelIndex];
                    sum += buffers[backBuffer][pixelIndex + canvas.width - 1];
                    sum += buffers[backBuffer][pixelIndex + canvas.width];
                    sum += buffers[backBuffer][pixelIndex + canvas.width + 1];
                    sum /= 4;
                    sum -= (1.0 - y / canvas.height) * 10.0; // attenuation
        
                    if (sum < 0) sum = 0;
                    if (sum >= MAX_COLORS) sum = MAX_COLORS - 1;
        
                    buffers[mainBuffer][pixelIndex] = sum;
                }
            }
        
            var skippedPixels = GUTTER_LINES * canvas.width;
            for (var i = 0; i < numPixels - skippedPixels; i++) {
                var baseTargetIndex = (skippedPixels + i) << 2;
                var baseSourceIndex = (buffers[mainBuffer][i]) << 2;
                fireImage.data[baseTargetIndex] = colors[baseSourceIndex];
                fireImage.data[baseTargetIndex + 1] = colors[baseSourceIndex + 1];
                fireImage.data[baseTargetIndex + 2] = colors[baseSourceIndex + 2];
                fireImage.data[baseTargetIndex + 3] = colors[baseSourceIndex + 3];
            }
        
            context.putImageData(fireImage, 0, 0);
        
            flipBuffers();
        
            window.requestAnimationFrame(drawAnimationFrame);
        }
        
        function initColors() {
        
            function setColor(colorArray, colorIndex, r, g, b) {
                var baseIndex = colorIndex << 2;
                colorArray[baseIndex] = r;
                colorArray[baseIndex + 1] = g;
                colorArray[baseIndex + 2] = b;
                colorArray[baseIndex + 3] = 0xff;
            }
        
            var colors = new Uint8ClampedArray(256 * 3 * 4); // RGBA
            for (var i = 0; i < 256; i++) {
                setColor(colors, i, i, 0, 0);
                setColor(colors, i + 256, 0xff, i, 0);
                setColor(colors, i + 512, 0xff, 0xff, i)
            }
        
            return colors;
        }
        window.requestAnimationFrame(drawAnimationFrame);
    }
}


