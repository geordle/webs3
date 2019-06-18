import css from "./monster.css";
import html from "./monster.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import Two from "two.js";

function colorToRgba(color) {
    switch (color) {
        case "Blue":  return  "rgba(0,0,255,0)"
    }
}

export class MonsterElement extends GComponent {


    constructor(vm) {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm,
        });
        this.triggerRefetch();

        var two = new Two({
            width: 100,
            height: 100,
            autostart: true,
        }).appendTo(this.root.querySelector(".monster"));

        const {color} = this._vm;

        this.observe('shouldPerformAction', (should) => {
            console.log(this._vm);
           if (should){
               this.jiggle(two, rect);
               this._vm.shouldPerformAction = false;
           }
        });

        const rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
        rect.fill = color;

        this.root.querySelector(".monster").addEventListener("click", () => {
            this.jiggle(two, rect);
        });

    }


    jiggle(two, rect) {
        let rotation = 0;
        let jiggleCount = 0;
        let direction = 0.1;
        two.bind("update", function(frameCount) {
            if (jiggleCount < 3 || (rotation >= 0)) {
                if (rotation > 0.5) {
                    jiggleCount++;
                    direction = -direction;
                } else if (rotation < -0.5) {
                    direction = -direction;
                    jiggleCount++;
                }
                rotation += direction;
                rect.rotation = rotation;
            } else {
                rect.rotation = 0;
            }
        });
    }

    static register() {
        customElements.define("g-monster", MonsterElement);
    }
}
