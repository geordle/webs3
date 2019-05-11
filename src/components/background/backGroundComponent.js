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
        this.earth();
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

    earth(){
       this.canv
        var canvas = this.canv;
        var ctx = canvas.getContext("2d");
        //Lets resize the canvas to occupy the full page
        var W = window.innerWidth;
        var H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;
        
        //Some variables
        var length, divergence, reduction, line_width, start_points = [];
        
        init();
        
        function init()
        {
            //filling the canvas white
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, W, H);
            
            //Lets draw the trunk of the tree
            //lets randomise the variables
            //length of the trunk - 100-150
            length = 100 + Math.round(Math.random()*50);
            //angle at which branches will diverge - 10-60
            divergence = 10 + Math.round(Math.random()*50);
            //Every branch will be 0.75times of the previous one - 0.5-0.75
            //with 2 decimal points
            reduction = Math.round(50 + Math.random()*20)/100;
            //width of the branch/trunk
            line_width = 10;
            
            //This is the end point of the trunk, from where branches will diverge
            var trunk = {x: W/2, y: length+50, angle: 90};
            //It becomes the start point for branches
            start_points = []; //empty the start points on every init();
            start_points.push(trunk);
            
            //Y coordinates go positive downwards, hence they are inverted by deducting it
            //from the canvas height = H
            ctx.beginPath();
            ctx.moveTo(trunk.x, H-50);
            ctx.lineTo(trunk.x, H-trunk.y);
            ctx.strokeStyle = "brown";
            ctx.lineWidth = line_width;
            ctx.stroke();
            
            branches();
        }
        
        //Lets draw the branches now
        function branches()
        {
            //reducing line_width and length
            length = length * reduction;
            line_width = line_width * reduction;
            ctx.lineWidth = line_width;
            
            var new_start_points = [];
            ctx.beginPath();
            for(var i = 0; i < start_points.length; i++)
            {
                var sp = start_points[i];
                //2 branches will come out of every start point. Hence there will be
                //2 end points. There is a difference in the divergence.
                var ep1 = get_endpoint(sp.x, sp.y, sp.angle+divergence, length);
                var ep2 = get_endpoint(sp.x, sp.y, sp.angle-divergence, length);
                
                //drawing the branches now
                ctx.moveTo(sp.x, H-sp.y);
                ctx.lineTo(ep1.x, H-ep1.y);
                ctx.moveTo(sp.x, H-sp.y);
                ctx.lineTo(ep2.x, H-ep2.y);
                
                //Time to make this function recursive to draw more branches
                ep1.angle = sp.angle+divergence;
                ep2.angle = sp.angle-divergence;
                
                new_start_points.push(ep1);
                new_start_points.push(ep2);
            }
            //Lets add some more color
            if(length < 10) ctx.strokeStyle = "green";
            else ctx.strokeStyle = "brown";
            ctx.stroke();
            start_points = new_start_points;
            //recursive call - only if length is more than 2.
            //Else it will fall in an long loop
            if(length > 2) setTimeout(branches, 50);
            else setTimeout(init, 500);
        }
        
        function get_endpoint(x, y, a, length)
        {
            //This function will calculate the end points based on simple vectors
            //http://physics.about.com/od/mathematics/a/VectorMath.htm
            //You can read about basic vectors from this link
            var epx = x + length * Math.cos(a*Math.PI/180);
            var epy = y + length * Math.sin(a*Math.PI/180);
            return {x: epx, y: epy};
        }
        
        
    }
}


