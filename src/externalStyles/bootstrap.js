import css from "!!raw-loader!bootstrap/dist/css/bootstrap.min.css";

const bootstrapCss = new CSSStyleSheet();
bootstrapCss.replace(css);
export {bootstrapCss};
