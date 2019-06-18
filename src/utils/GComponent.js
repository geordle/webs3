import { changeElementContentAction } from "./htmlHelpers";

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

        for (const key of this._modelMap.keys()) {
            this._bindField(key);
        }
    }

    _bindField(fieldName) {
        let val = this._vm[fieldName];
        let getter = () => val;
        let setter = arg => (val = arg);
        if (this._vm) {
            getter = this._vm.__lookupGetter__(fieldName) || getter;
            setter = this._vm.__lookupSetter__(fieldName) || setter;
        }
        Object.defineProperty(this._vm, fieldName, {
            get: () => {
                return getter.call(this._vm);
            },
            set: newValue => {
                if (newValue !== undefined) {
                    setter.call(this._vm, newValue);
                }

                for (const action of this._modelMap.get(fieldName)) {
                    action(getter.call(this._vm));
                }
            },
            configurable: true,
        });
    }

    observe(property, callback) {
        let value = this._modelMap.get(property);
        if (!value) {
            this._bindField(property);
            value = [];
        }
        this._modelMap.set(property, [
            () => {
                callback.call(this, this._vm[property]);
            },
            ...value,
        ]);
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

    triggerRefetch() {
        for (const entry of this._modelMap.values()) {
            entry.forEach(action => action.call(this._vm));
        }
    }
}
