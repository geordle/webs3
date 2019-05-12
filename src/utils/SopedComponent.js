import { changeElementContentAction } from "./htmlHelpers";

/**
 * @abstract
 */
export class SopedComponent extends HTMLElement {
    constructor({ css, html, isScoped = true, styleSheets = [], vm }) {
        super();
        this._vm = vm;
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
        if (this._vm) {
            this._bindEventHandlers(htmlDivElement);
            this._bindGModel(htmlDivElement);
            this._bindPropBinding(htmlDivElement);
        }
        this._bindHtmlProperties();
        root.appendChild(htmlDivElement);
        root.adoptedStyleSheets = [htmlStyleElement, ...styleSheets];
        this.root = root;
    }

    _bindEventHandlers(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-on]").forEach(value => {
            const [event, method] = value.getAttribute("g-on").split(":");
            value.addEventListener(event, arg => this._vm[method](arg));
        });
    }

    _bindGModel(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-model]").forEach(element => {
            const property = element.getAttribute("g-model");
            let elements = this._modelMap.get(property);
            const changeAction = changeElementContentAction(
                element,
                this._vm,
                property
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

    _bindPropBinding(htmlDivElement) {
        htmlDivElement.querySelectorAll("[g-bind]").forEach(value => {
            const [prop, boundField] = value.getAttribute("g-bind").split(":");

            this.observe(boundField, newValue => {
                value[prop] = newValue;
            });
        });
    }

    /**
     * @abstract
     */
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
