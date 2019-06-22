import css from "./incinarator.css";
import html from "./incinarator.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import Two from "two.js";

export class Incinarator extends GComponent {
    constructor() {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm: ViewModelLocator.getInstance().incinaratorVm
        });
        let rect;
        let rotationSpeed = 0.01;
        var two = new Two({
            width: 200,
            height: 200,
        }).appendTo(this.root.querySelector("#garbage-container"));
        two.bind("update", function() {
            if (rect && rotationSpeed < 0.3) {
                rotationSpeed += 0.004;
                rect.rotation += rotationSpeed;
            } else if (rect) {
                two.remove(rect);
            }
        });
        two.play();

        this.observe("dropped", (isDropped) => {
            if (isDropped) {
                this._vm.dropped = false;
                rect = two.makeRectangle(two.width / 2, two.height / 2, 50, 50);
                rotationSpeed = 0.01;
            }

        });



    }


    static register() {
        customElements.define("g-incinarator", Incinarator);
    }
}
