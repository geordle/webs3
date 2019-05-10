

export class SopedComponent extends HTMLElement {
    constructor(css, html,isScoped = true, ...styleSheets) {
        super();
        let root = this;
        if (isScoped){
            root = this.attachShadow({ mode: "open" });
        }
        let htmlStyleElement = new CSSStyleSheet();
        htmlStyleElement.replace(css);
        let htmlDivElement = document.createElement('div');
        htmlDivElement.innerHTML = html;
        root.appendChild(htmlDivElement);
        root.adoptedStyleSheets = [htmlStyleElement, ...styleSheets];
    }


    static register(){
        throw new Error('Component not registered\n' +
            ' Example:   static register(){\n' +
            '        customElements.define("monster-form", MonsterForm);\n' +
            '    }' +
            '' +
    '');
    }

}
