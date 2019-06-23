import { changeElementContentAction } from "./htmlHelpers";
import { Observable } from "./Observable";

/**
 * @abstract
 */
export class GComponent extends HTMLElement {
    constructor({ css, html, isScoped = true, styleSheets = [], vm }) {
        super();
        this._modelMap = new Map();
        let root = this;
        if (isScoped) {
            root = this.attachShadow({ mode: "closed" });
        }
        let htmlStyleElement = new CSSStyleSheet();
        htmlStyleElement.replace(css);
        let htmlDivElement = document.createElement("div");
        htmlDivElement.innerHTML = html;
        htmlDivElement.classList.add("base");
        this._bindHtmlProperties();
        root.appendChild(htmlDivElement);
        root.adoptedStyleSheets = [htmlStyleElement, ...styleSheets];
        this.root = root;
        if (vm) {
            this._bindVm(vm);
        }
    }

    _bindVm(vm) {
        this._vm = vm;
        let htmlDivElement = this.root.querySelector(".base");
        this._bindEventHandlers(htmlDivElement);
        this._bindGModel(htmlDivElement);
        this._bindPropBinding(htmlDivElement);
        [...this._modelMap.entries()].forEach(([prop, events]) => {
            Observable.bindProp(this._vm,this,  prop, ...events);
        });
    }

    _bindEventHandlers(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-on]").forEach(value => {
            value.getAttribute("g-on").split(",").forEach(value1 => {
                const [event, method] = value1.split(":");
                value.addEventListener(event, arg => this._vm[method](arg));
            });

        });
    }

    _bindPropBinding(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-bind]").forEach(value => {
            value.getAttribute("g-bind").split(",").forEach((binding) => {
                const [prop, boundField] = binding.split(":");

                this.observe(boundField, newValue => {
                    if (newValue || Number.isInteger(newValue)) {
                        value[prop] = newValue;
                    } else {
                        delete value.removeAttribute(prop);
                    }
                });

            });
        });
    }

    _bindGModel(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-model]").forEach(element => {
            const property = element.getAttribute("g-model");
            let elements = this._modelMap.get(property);
            const changeAction = changeElementContentAction(
                element,
                this._vm,
                property,
            );
            element.addEventListener("input", () => {
                this._vm[property] = element.value;
            });
            this._modelMap.set(property, [changeAction, ...(elements || [])]);
        });
    }


    observe(property, callback) {
        Observable.bindProp(this._vm, this, property,() => {
            callback.call(this, this._vm[property]);
        });
    }


    /**
     * @abstract
     */
    static register() {
        throw new Error(
            "Component not registered\n" +
            " Example:   static register(){\n" +
            "        customElements.define(\"monsterConfigurator-form\", MonsterForm);\n" +
            "    }" +
            "" +
            "",
        );
    }

    _bindHtmlProperties() {
        for (const key of this._modelMap.keys()) {
            this[key] = this.getAttribute(key);
        }
    }

    afterRender() {
    }

    triggerRefetch() {
        this._vm.notifyForObserver(this);
    }
}
