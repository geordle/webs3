import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
export class MonsterForm extends SopedComponent{

    constructor(){
        super(css, html, true, bootstrapCss);
    }


    static register(){
        customElements.define("g-form", MonsterForm);
    }

}


