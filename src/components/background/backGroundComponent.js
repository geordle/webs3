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
        this.observe("fieldtype", () => {
            this.startCanvas(this._vm.fieldtype); 
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
                case "fire":
                    this.canvaDrawer = new FireDrawer(this.canv);
                    break;
                case "rain":
                    this.canvaDrawer = new RainDrawer(this.canv);
                    break;
                case "earth":
                    this.canvaDrawer = new EarthDrawer(this.canv);
                    break;
                case "wind":
                    this.canvaDrawer = new WindDrawer(this.canv);
                    break;
                default:
                    this.canvaDrawer =null;
            }
    }
}


