import css from "./index.css";
import html from "./index.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import {ViewModelLocator} from "../viewModelLocator";

export class AppComponent extends SopedComponent{

    constructor(){
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss], vm : ViewModelLocator.getInstance().fieldViewModel  });
    }

    static register(){
        customElements.define("g-app", AppComponent);
    }


}


