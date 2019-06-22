import css from "./index.css";
import html from "./index.html";
import { ViewModelLocator } from "../viewModelLocator";
import { GComponent } from "../../utils/GComponent";
import { FireDrawer } from "./fireDrawer";
import { EarthDrawer } from "./earthDrawer";
import { RainDrawer } from "./RainDrawer";
import { WindDrawer } from "./windDrawer";


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
                    this.canvaDrawer = new FireDrawer(this.canv);
                    break;
                case "Rain":
                    this.canvaDrawer = new RainDrawer(this.canv);
                    break;
                case "Clear":
                    this.canvaDrawer = new EarthDrawer(this.canv);
                    break;
                case "Mist":
                    this.canvaDrawer = new WindDrawer(this.canv);
                    break;
                default:
                    this.canvaDrawer =null;
            }
    }
}


