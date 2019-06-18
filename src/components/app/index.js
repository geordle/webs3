import css from "./index.css";
import html from "./index.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModel } from "../../utils/viewModel";
import { ViewModelLocator } from "../viewModelLocator";



export class AppComponent extends GComponent{

    constructor(){
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss], vm: ViewModelLocator.getInstance().fieldViewModel });
        this.observe('region', (region)=> {
            this.root.querySelector('#grid-holder').innerHTML= `<g-grid region="${region}"></g-grid>`;
        })
    }

    static register(){
        customElements.define("g-app", AppComponent);
    }


}




