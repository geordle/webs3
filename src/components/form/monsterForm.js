import css from "./monsterForm.css";
import html from "./monsterForm.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import { ViewModelLocator } from "../viewModelLocator";
import { createElementFromHTML, setOptionsOfSelect } from "../../utils/htmlHelpers";


/**
 * @property {MonsterConfiguratorVM} _vm
 *
 */
export class MonsterForm extends GComponent {
    constructor() {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm: ViewModelLocator.getInstance().monsterConfigurator
        });

        this.observe("monsterConfigurator", () => {
            const element = this.root.querySelector("#fur");
            setOptionsOfSelect(element, this._vm.furTypes);
            this._vm.notifyPropertyChanged('fur');

        });

        this.observe("monsterConfigurator", () => {
            let element = this.root.querySelector("#color");
            setOptionsOfSelect(element, this._vm.colors);
            this._vm.notifyPropertyChanged('color');
        });



        this.observe("monsterConfigurator", () => {
            let element = this.root.querySelector("#arm-type");
            setOptionsOfSelect(element, this._vm.armTypes);
            this._vm.notifyPropertyChanged('armType');
        });
        this.triggerRefetch();
    }

    static register() {
        customElements.define("g-form", MonsterForm);
    }


}
