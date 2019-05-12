import { equalsAny } from "./logicHelpers";

export function createElementFromHTML(htmlString) {
    var div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

export function changeElementContentAction(element, vm, property) {
    return () => {
        const value = vm[property];
        if (
            equalsAny(element.type, "text", "textarea", "select-one", "range")
        ) {
            element.value = value;
        } else if (!element.type) {
            element.innerHTML = value;
        }
    };
}
