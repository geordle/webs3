import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { createElementFromHTML } from "../../utils/htmlHelpers";
export class BackGroundComponent extends SopedComponent{

    constructor(){
        super(css, html, true);

        this.canvas = this.root.querySelector('canvas');
        this.startCanvas();
    }




    static register(){
        customElements.define("g-background", BackGroundComponent);
    }


    startCanvas() {
        let context = this.canvas.getContext('2d');
        context.strokeRect(0,0,20, 20);
    }
}


