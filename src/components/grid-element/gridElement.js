import css from "./gridElement.css";
import html from "./gridElement.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";

export class GridElement extends GComponent {
    constructor() {
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss] });
        this.x = this.getAttribute('x-pos');
        this.y = this.getAttribute('y-pos');

        this.regionName = this.getAttribute('region-name');
        let gridElementViewModel = ViewModelLocator
            .getInstance()
            .getGridElementViewModel(this.x, this.y, this.regionName);
        if(gridElementViewModel.isRock){
            this.root
                .querySelector('.base')
                .classList.add('rock');
        }
        this._bindVm(gridElementViewModel);
    }




    static register() {
        customElements.define("g-element", GridElement);
    }
}
