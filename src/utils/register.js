export function registerComponents(...classes) {
    classes.forEach(value => value.register());
}

export function activateModules(param) {
    param.forEach(el => {
       registerComponents(...el.components);
    });
}
