import css from "./gridElement.css";
import html from "./gridElement.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import { MonsterElement } from "../monster/monsterElement";

export class GridElement extends GComponent {
    constructor() {
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss] });
        this.x = this.getAttribute("x-pos");
        this.y = this.getAttribute("y-pos");
        this.regionName = this.getAttribute("region-name");
        let gridElementViewModel = ViewModelLocator
            .getInstance()
            .getGridElementViewModel(this.x, this.y, this.regionName);
        if (gridElementViewModel.isRock) {
            this.root
                .querySelector(".base")
                .classList.add("rock");
        }
        this._bindVm(gridElementViewModel);
        this.observe("containsMonster", (value) => {
            return this.updateMonster(value);
        });


        this.observe("isDraggingOver", (val) => {
            if (val) {
                this.root.querySelector(".base").classList.add("monster-over");
            } else {
                this.root.querySelector(".base").classList.remove("monster-over");
            }
        });
        this.updateMonster(this._vm.containsMonster);
        this.triggerRefetch();
    }

    updateMonster(containsMonster) {
        const gridElement = this.root.querySelector(".grid-element");
        gridElement.innerHTML = "";
        if (containsMonster) {
            let monsterElement = gridElement.appendChild(new MonsterElement(this._vm));
            monsterElement.afterRender();
        }
    };


    static register() {
        customElements.define("g-element", GridElement);
    }
}
