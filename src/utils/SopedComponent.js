import { equalsAny } from "./logicHelpers";
import { changeElementContentAction } from "./htmlHelpers";



export class SopedComponent extends HTMLElement {
    constructor(css, html, isScoped = true, ...styleSheets) {
        super();
        let root = this;
        if (isScoped) {
            root = this.attachShadow({ mode: "closed" });
        }
        let htmlStyleElement = new CSSStyleSheet();
        htmlStyleElement.replace(css);
        let htmlDivElement = document.createElement("div");
        htmlDivElement.innerHTML = html;
        htmlDivElement.classList.add("base");

        this._bindEventHandlers(htmlDivElement);
        this._bindGModel(htmlDivElement);
        this._bindPropBinding(htmlDivElement);
        root.appendChild(htmlDivElement);
        root.adoptedStyleSheets = [htmlStyleElement, ...styleSheets];
        this.root = root;
    }

    _bindEventHandlers(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-on]").forEach(value => {
            const [event, method] = value
                .getAttribute("g-on")
                .split(":");
            value.addEventListener(event, arg => this[method](arg));
        });
    }

    _bindGModel(htmlDivElement) {
        this._modelMap = new Map();

        htmlDivElement.querySelectorAll("[g-model]").forEach(element => {
            const property = element.getAttribute("g-model");
            let elements = this._modelMap.get(property);
            const changeAction = changeElementContentAction(element);
            element.addEventListener("input", () => {
                this[property] = element.value;
            });
            this._modelMap.set(property, [changeAction, ...(elements || [])]);
        });

        for (const key of this._modelMap.keys()) {
            this._bindField(key);
        }
    }

    _bindField(fieldName){
        let val;
        Object.defineProperty(this, fieldName, {
            get: () => {
                return val;
            },
            set: newValue => {
                val = newValue;
                for (const action of this._modelMap.get(fieldName)) {
                    action.call(this, newValue);
                }
            },
        });
    }


    observe(property, callback){
        let value = this._modelMap.get(property);
        if(!value){
            this._bindField(property);
            value = [];
        }
        this._modelMap.set(property, [callback, ...value])
    }

    _bindPropBinding(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-bind]").forEach(value => {
            const [prop, boundField] = value
                .getAttribute("g-bind")
                .split(":");
            this.observe(boundField, (newValue) => {
                value[prop] = newValue;
            });
        });
    }

    static register() {
        throw new Error(
            "Component not registered\n" +
                " Example:   static register(){\n" +
                '        customElements.define("monster-form", MonsterForm);\n' +
                "    }" +
                "" +
                ""
        );
    }

}
