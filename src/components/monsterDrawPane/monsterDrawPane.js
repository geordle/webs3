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
        this.triggerRefetch();
        this.createDrawableCanvas();
    }

    static register() {
        customElements.define("g-monster-draw", MonsterDrawPane);
    }

    createDrawableCanvas() {
        let htmlCanvasElement = this.root.querySelector("canvas");
        let paint;
        const self = this;
        const context = htmlCanvasElement.getContext("2d");
        const clicks = [];

        function addClick(x, y) {
            if (x && y) {
                clicks.push([x - this.offsetLeft - 40, y - this.offsetTop - 52]);
            } else {
                clicks.push([]);
            }
        }

        function redraw() {
            context.clearRect(
                0,
                0,
                context.canvas.width,
                context.canvas.height,
            );
            context.strokeStyle = "#070201";
            context.lineJoin = "round";
            context.lineWidth = 3;

            let prevPoint = clicks[0];
            for (const click of clicks) {
                context.beginPath();
                if (prevPoint.length === 0) {
                    context.moveTo(click[0], click[1]);
                } else {
                    context.moveTo(prevPoint[0], prevPoint[1]);
                }
                context.lineTo(click[0], click[1]);
                context.closePath();
                context.stroke();
                prevPoint = click;
            }
        }

        htmlCanvasElement.addEventListener("mousedown", function({
                                                                     pageX,
                                                                     pageY,
                                                                 }) {
            if (!self._vm.isEditing) {
                paint = true;
                addClick.call(this, pageX, pageY);
                redraw();
            }
        });
        htmlCanvasElement.addEventListener("mousemove", function({
                                                                     pageX,
                                                                     pageY,
                                                                 }) {
            if (paint) {
                addClick.call(this, pageX, pageY);
                redraw();
            }
        });

        function listener(_) {
            paint = false;
            addClick(null, null);
        };

        htmlCanvasElement.addEventListener("mouseup", listener);
        htmlCanvasElement.addEventListener("mouseleave", listener);
    }
}
