import css from "./monsterDrawPane.css";
import html from "./monsterDrawPane.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";

/**
 * @property {MonsterConfiguratorVM} _vm
 *
 */
export class MonsterDrawPane extends GComponent {
    constructor() {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm: ViewModelLocator.getInstance().monsterConfigurator,
        });
        this.createDrawableCanvas();
        this.observe("reset", (isReset) => {
            if (isReset) {
                let htmlCanvasElement = this.root.querySelector("canvas");
                htmlCanvasElement.getContext("2d").clearRect(0, 0, htmlCanvasElement.width, htmlCanvasElement.height);
                this._vm.reset = false;
            }
        });
        this.observe("image", _ => {
            this.redraw();
        });
        this.triggerRefetch();
    }

    static register() {
        customElements.define("g-monster-draw", MonsterDrawPane);
    }

    createDrawableCanvas() {
        const htmlCanvasElement = this.root.querySelector("canvas");
        let paint;
        const self = this;
        this.context = htmlCanvasElement.getContext("2d");

        function addClick(x, y) {
            if (x && y) {
                self._vm.image.push([x - this.offsetLeft - 40, y - this.offsetTop - 52]);
            } else {
                self._vm.image.push([]);
            }
        }


        htmlCanvasElement.addEventListener("mousedown", ({
                                                             pageX,
                                                             pageY,
                                                         }) => {
            if (!self._vm.isEditing) {
                paint = true;
                addClick.call(this, pageX, pageY);
                this.redraw();
            }
        });
        htmlCanvasElement.addEventListener("mousemove", ({
                                                             pageX,
                                                             pageY,
                                                         }) => {
            if (paint) {
                addClick.call(this, pageX, pageY);
                this.redraw();
            }
        });

        function stopDraw(_) {
            paint = false;
            addClick(null, null);
        };

        htmlCanvasElement.addEventListener("mouseup", () => stopDraw());
        htmlCanvasElement.addEventListener("mouseleave", () => stopDraw());
        this.redraw();

    }

    redraw() {
        this.context.clearRect(
            0,
            0,
            this.context.canvas.width,
            this.context.canvas.height,
        );
        this.context.strokeStyle = "#070201";
        this.context.lineJoin = "round";
        this.context.lineWidth = 3;

        let prevPoint = this._vm.image[0];
        for (const click of this._vm.image) {
            this.context.beginPath();
            if (prevPoint.length === 0) {
                this.context.moveTo(click[0], click[1]);
            } else {
                this.context.moveTo(prevPoint[0], prevPoint[1]);
            }
            this.context.lineTo(click[0], click[1]);
            this.context.closePath();
            this.context.stroke();
            prevPoint = click;
        }
    }
}
