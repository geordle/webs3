import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { createElementFromHTML } from "../../utils/htmlHelpers";
export class BackGroundComponent extends SopedComponent{

    constructor(){
        super(css, html, true);
    }


    static register(){
        customElements.define("g-background", BackGroundComponent);
    }



}


