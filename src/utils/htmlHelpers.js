import { equalsAny } from "./logicHelpers";

export function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

export function changeElementContentAction(element) {
    return newValue => {
        if (
            equalsAny(element.type, "text", "textarea", "select-one", "range")
        ) {
            element.value = newValue;
        } else if (!element.type) {
            element.innerHTML = newValue;
        }
    };
}
