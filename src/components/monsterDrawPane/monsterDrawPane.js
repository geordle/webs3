import css from "./monsterDrawPane.css";
import html from "./monsterDrawPane.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import { redraw } from "../../utils/CanvasUtils";

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
        const { width, height } = htmlCanvasElement;

        function addClick(x, y) {
            if (x && y) {
                self._vm.image.push([(x - this.offsetLeft - 40) / width, (y - this.offsetTop - 52) / height]);
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

        const stopDraw = _ => {
            paint = false;
            addClick(null, null);
        };
        htmlCanvasElement.addEventListener("mouseup", () => stopDraw());
        htmlCanvasElement.addEventListener("mouseleave", () => stopDraw());
        this.redraw();

    }

    redraw() {
        redraw(this.context, this._vm.image);
    }
}
