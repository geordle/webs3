import css from "./gridComponent.css";
import html from "./gridComponent.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import field from "../../domain/field";
import { createElementFromHTML } from "../../utils/htmlHelpers";

export class GridComponent extends GComponent {
    constructor() {
        super({ css, html, isScoped: true, styleSheets: [bootstrapCss] });
        this.regionName = this.getAttribute("region");
        this.generateSquares();
        this.root.querySelector(".base").classList.toggle(this.regionName.toLowerCase());
    }

    static register() {
        customElements.define("g-grid", GridComponent);
    }


    generateSquares() {
        const { grid, name } = field.find(({ name }) => name === this.regionName);
        grid.forEach((row, rowIndex) => {
            row.Columns.forEach((el, columnIndex) => {
                let node = createElementFromHTML(`<g-element ${el === "1" ? "is-rock" : ""}   x-pos="${row.name}" y-pos="${columnIndex}" region-name="${name}"></g-element>`);
                node.style.left = `${columnIndex * 10}%`;
                node.style.top = `${rowIndex * 10}%`;
                this.root.querySelector(".base").appendChild(node);
            });

        });

    }
}
