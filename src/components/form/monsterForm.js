import css from "./monsterForm.css";
import html from "./monsterForm.html";
import { SopedComponent } from "../../utils/SopedComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import { createElementFromHTML } from "../../utils/htmlHelpers";


/**
 * @property {MonsterConfiguratorVM} _vm
 *
 */
export class MonsterForm extends SopedComponent {
    constructor() {
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss],  vm: ViewModelLocator.getInstance().monsterConfigurator});
        this.observe("arms", this.armsChange);
        this.observe("monster", this.furTypesChange);
        this.observe("monster", this.colorsChange);
        this.triggerRefetch();
    }

    static register() {
        customElements.define("g-form", MonsterForm);
    }

    armsChange() {
        let element = this.root.querySelector("#arms");
        element.innerHTML = "";
        for (let i = 0; i < this._vm.arms; i++) {
            element.appendChild(
                createElementFromHTML(
                    '<input type="text" class="form-control mt-1"  placeholder="arms">'
                )
            );
        }
    }


    furTypesChange() {
        let element = this.root.querySelector("#fur");
        element.innerHTML="";
        for (const furType of this._vm.furTypes) {
            element.appendChild(createElementFromHTML(`<option>${furType}</option>`))
        }
    }

    colorsChange() {
        let element = this.root.querySelector("#color");
        element.innerHTML="";
        for (const furType of this._vm.colors) {
            element.appendChild(createElementFromHTML(`<option>${furType}</option>`))
        }
    }


}
