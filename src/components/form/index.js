import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { createElementFromHTML } from "../../utils/htmlHelpers";
export class MonsterForm extends SopedComponent{

    constructor(){
        super(css, html, true, bootstrapCss);
        this.username = "geordi";
        this.color = "Green";
    }


    static register(){
        customElements.define("g-form", MonsterForm);
    }


    sliderChange({target:{value}}){
        let element = this.root.querySelector('#arms');
        element.innerHTML = "";
        for (let i = 0; i < value; i++) {
            element.appendChild(createElementFromHTML('<input type="text" class="form-control mt-1"  placeholder="arms">'))
        }
    }

    submitted(event){
        event.preventDefault();
    }

}


