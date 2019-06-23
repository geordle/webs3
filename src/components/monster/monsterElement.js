import css from "./monster.css";
import html from "./monster.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import Two from "two.js";
import Chart from "chart.js";

export class MonsterElement extends GComponent {

    constructor(vm) {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm
        });

        this.two = new Two({
            width: 100,
            height: 100,
            autostart: true,
        }).appendTo(this.root.querySelector(".monster"));

        const { color } = this._vm;

        this.observe("shouldPerformAction", (should) => {
            if (should) {
                this.root.querySelector('.monster').click();
            }
        });
        this.rect = this.two.makeRectangle(this.two.width / 2, this.two.height / 2, 50, 50);
        this.rect.fill = color;
        this.root.querySelector(".monster").addEventListener("click", () => {
            this.isJiggeling = true;

        });
        this.two.bind('update', this.jiggle());
        this.triggerRefetch();
        this.gauge();
    }

    gauge(){
    }


    jiggle() {
        let rotation = 0;
        let jiggleCount = 0;
        let direction = 0.1;
        return  frameCount => {
            if (!this.isJiggeling) {
                return;
            }

            if (jiggleCount < 3 || (rotation >= 0)) {
                if (rotation > 0.5) {
                    jiggleCount++;
                    direction = -direction;
                } else if (rotation < -0.5) {
                    direction = -direction;
                    jiggleCount++;
                }
                rotation += direction;
                this.rect.rotation = rotation;
            } else {
                this.rect.rotation = 0;
                rotation = 0;
                jiggleCount = 0;
                this.isJiggeling = false;
            }
        };
    }

    static register() {
        customElements.define("g-monster", MonsterElement);
    }
}
