export class FireDrawer {

    constructor(canvas) {
        const CANVAS_WIDTH = window.innerWidth / 3;
        const CANVAS_HEIGHT = window.innerHeight / 3;
        this.canvas = canvas;
        canvas.width = CANVAS_WIDTH;
        canvas.height = CANVAS_HEIGHT;

        const BASE_COLORS = 768; // 256 reds + 256 yellow/orange + 256 orange/whites
        const WHITES = 150; // Additional white colors to add intensity
        this.MAX_COLORS = BASE_COLORS + WHITES;
        this.CHUNK = 6; // The number of consecutive pixels of fire/no fire to draw in th gutter lines
        this.GUTTER_LINES = 10; // The number of lines at the base of the fire that are required for the math, but don't display so nicely
        this.colors = this.initColors();
        this.context = this.canvas.getContext("2d");
        this.fireImage = this.context.createImageData(this.canvas.width, this.canvas.height);

        this.numPixels = this.fireImage.width * this.fireImage.height;
        this.buffers = [new Uint16Array(this.numPixels), new Uint16Array(this.numPixels)];
        const fireImageWidth = this.fireImage.width;
        const fireImageHeight = this.fireImage.height;
        this.mainBuffer = 0;
        this.backBuffer = 1;



    }

    flipBuffers() {
        this.mainBuffer = 1 - this.mainBuffer;
        this.backBuffer = 1 - this.backBuffer;
    }

    draw() {

        for (let n = 0; n < this.canvas.width / this.CHUNK; n++) {
            const color = (Math.random() >= 0.4) ? (this.MAX_COLORS - 1) : 0;
            for (let c = 0; c < this.CHUNK; c++) {
                this.buffers[this.backBuffer][this.numPixels - n * this.CHUNK - c] = color;
            }
        }

        for (let y = this.canvas.height - 1; y >= 1; y--) {
            for (let x = 1; x < this.canvas.width - 1; x++) {
                let sum = 0;
                const pixelIndex = y * this.canvas.width + x;
                sum += this.buffers[this.backBuffer][pixelIndex];
                sum += this.buffers[this.backBuffer][pixelIndex + this.canvas.width - 1];
                sum += this.buffers[this.backBuffer][pixelIndex + this.canvas.width];
                sum += this.buffers[this.backBuffer][pixelIndex + this.canvas.width + 1];
                sum /= 4;
                sum -= (1.0 - y / this.canvas.height) * 10.0; // attenuation

                if (sum < 0) sum = 0;
                if (sum >= this.MAX_COLORS) sum = this.MAX_COLORS - 1;

                this.buffers[this.mainBuffer][pixelIndex] = sum;
            }
        }

        const skippedPixels = this.GUTTER_LINES * this.canvas.width;
        for (let i = 0; i < this.numPixels - skippedPixels; i++) {
            const baseTargetIndex = (skippedPixels + i) << 2;
            const baseSourceIndex = (this.buffers[this.mainBuffer][i]) << 2;
            this.fireImage.data[baseTargetIndex] = this.colors[baseSourceIndex];
            this.fireImage.data[baseTargetIndex + 1] = this.colors[baseSourceIndex + 1];
            this.fireImage.data[baseTargetIndex + 2] = this.colors [baseSourceIndex + 2];
            this.fireImage.data[baseTargetIndex + 3] = this.colors [baseSourceIndex + 3];
        }

        this.context.putImageData(this.fireImage, 0, 0);

        this.flipBuffers();

    }

    initColors() {

        function setColor(colorArray, colorIndex, r, g, b) {
            const baseIndex = colorIndex << 2;
            colorArray[baseIndex] = r;
            colorArray[baseIndex + 1] = g;
            colorArray[baseIndex + 2] = b;
            colorArray[baseIndex + 3] = 0xff;
        }

        const colors = new Uint8ClampedArray(256 * 3 * 4); // RGBA
        for (let i = 0; i < 256; i++) {
            setColor(colors, i, i, 0, 0);
            setColor(colors, i + 256, 0xff, i, 0);
            setColor(colors, i + 512, 0xff, 0xff, i);
        }

        return colors;
    }
}
