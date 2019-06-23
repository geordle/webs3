import css from "./index.css";
import html from "./index.html";
import { ViewModelLocator } from "../viewModelLocator";
import { GComponent } from "../../utils/GComponent";
import { RainDrawer } from "./RainDrawer";
import { WindDrawer } from "./windDrawer";
import { SnowDrawer } from "./snowDrawer";
import { ClearDrawer } from "./clearDrawer";

export class BackGroundComponent extends GComponent {

    constructor() {
        super({ css, html, isScoped: true,vm : ViewModelLocator.getInstance().fieldViewModel });

       this.canv = this.root.querySelector('#background');
        this.observe("fieldType", () => {
            this.startCanvas(this._vm.fieldType);
        });

        window.requestAnimationFrame(time => {
            this.drawBackground();
        })
    }

    drawBackground(){
        if (this.canvaDrawer) {
            this.canvaDrawer.draw();
        }
        window.requestAnimationFrame(() => this.drawBackground());
    }

    static register() {
        customElements.define("g-background", BackGroundComponent);
    }

    startCanvas(type) {
            switch(type){
                case "Snow":
                    this.canvaDrawer = new SnowDrawer(this.canv);
                    break;
                case "Rain":
                    this.canvaDrawer = new RainDrawer(this.canv);
                    break;
                case "Mist":
                    this.canvaDrawer = new WindDrawer(this.canv);
                    break;
                case "Clear":
                    this.canvaDrawer = new ClearDrawer(this.canv);
                    break;
                default:
                    this.canvaDrawer =null;
            }
    }
}


