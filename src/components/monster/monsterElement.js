import css from "./monster.css";
import html from "./monster.html";
import { GComponent } from "../../utils/GComponent";
import { bootstrapCss } from "../../externalStyles/bootstrap";
import Two from "two.js";
import { redraw } from "../../utils/CanvasUtils";
import Chart from "chart.js";
import ApexCharts from "apexcharts";


export class MonsterElement extends GComponent {

    constructor(vm) {
        super({
            css,
            html,
            isScoped: true,
            styleSheets: [bootstrapCss],
            vm,
        });

        this.two = new Two({
            width: 100,
            height: 100,
            autostart: true,
        }).appendTo(this.root.querySelector(".monster"));


        this.observe("shouldPerformAction", (should) => {
            if (should) {
                this.root.querySelector(".monster").click();
            }
        });
        this.prepareMonsterCanvas();
        this.triggerRefetch();
        this.chart = new ApexCharts(this.root.querySelector(".chart"), this.getChartOptions());
    }

    async afterRender() {
        try {
            await this.chart.render();
        } catch (e) {
            console.log(e);
        }
    }

    prepareMonsterCanvas() {
        this.rect = this.two.makeRectangle(this.two.width / 2, this.two.height / 2, 50, 50);
        let htmlCanvasElement = document.createElement("canvas");
        htmlCanvasElement.height = this.two.height / 2;
        htmlCanvasElement.width = this.two.width / 2;
        let context = htmlCanvasElement.getContext("2d");
        const { color } = this._vm;
        redraw(context, this._vm.image, color);
        this.rect.fill = new Two.Texture(htmlCanvasElement.toDataURL());
        this.root.querySelector(".monster").addEventListener("click", () => {
            this.isJiggeling = true;
        });
        this.two.bind("update", this.jiggle());
    }

    jiggle() {
        let rotation = 0;
        let jiggleCount = 0;
        let direction = 0.1;
        return frameCount => {
            if (!this.isJiggeling) {
                return;
            }

            if (jiggleCount < 3 || (rotation >= 0)) {
                if (rotation > 0.5) {
                    jiggleCount++;
                    direction = -direction;
                } else if (rotation < -0.5) {
                    direction = -direction;
                    jiggleCount++;
                }
                rotation += direction;
                this.rect.rotation = rotation;
            } else {
                this.rect.rotation = 0;
                rotation = 0;
                jiggleCount = 0;
                this.isJiggeling = false;
            }
        };
    }

    getChartOptions() {
        return  {
            chart: {
                type: "radialBar",
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: "97%",
                        margin: 5, // margin is in pixels
                        shadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: "#999",
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        name: {
                            show: true,
                            offsetY: 15,

                        },
                        value: {
                            fontSize: "22px",
                            formatter: function (val) {
                                return val /10;
                            },
                            show:true
                        }
                    }
                }
            },
            fill: {
                colors: [function({ value, seriesIndex, w }) {
                    if(value < 55) {
                        return "#7E36AF";
                    } else if (value >= 55 && value < 80) {
                        return "#164666";
                    } else {
                        return "#D9534F";
                    }
                }]
            },
            series: [this._vm.actualPower * 10],
            labels: [this._vm.powerName]
        };

    }

    static register() {
        customElements.define("g-monster", MonsterElement);
    }
}
