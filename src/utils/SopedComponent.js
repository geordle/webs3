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
        htmlDivElement.querySelectorAll("[g-on]").forEach(value => {
            const [event, method] = value.getAttribute("g-on").split(":");
            value.addEventListener(event, arg => this[method](arg));
        });
        let listOf = htmlDivElement.querySelectorAll("[g-model]");
        listOf.forEach(value => {
            const property = value.getAttribute("g-model");
            let val;
            !this.hasOwnProperty(property) &&
                Object.defineProperty(this, property, {
                    get: () => {
                        return val;
                    },
                    set: newValue => {
                        val = newValue;
                        [...listOf.values()]
                            .filter(
                                element =>
                                    element.getAttribute("g-model") === property
                            )
                            .forEach(value1 => {
                                if (
                                    value1.type &&
                                    (value1.type === "text" ||
                                        value1.type === "textarea" || value1.type === "select-one" || value1.type === "range")
                                ) {
                                    value1.value = newValue;
                                } else if (!value1.type) {
                                    value1.innerHTML = newValue;
                                }
                            });
                    },
                });
            value.addEventListener("input", () => {
                this[property] = value.value;
            });
        });

        root.appendChild(htmlDivElement);
        root.adoptedStyleSheets = [htmlStyleElement, ...styleSheets];
        this.root = root;
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
