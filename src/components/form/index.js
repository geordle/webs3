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
        this.observe('arms', this.sliderChange);
        this.arms = 3;
        this.maxArms = 4;
    }


    static register(){
        customElements.define("g-form", MonsterForm);
    }


    sliderChange(val){
        let element = this.root.querySelector('#arms');
        element.innerHTML = "";
        for (let i = 0; i < val; i++) {
            element.appendChild(createElementFromHTML('<input type="text" class="form-control mt-1"  placeholder="arms">'))
        }
    }



    submitted(event){
        this.username='awofeawef';
        event.preventDefault();
    }

}


