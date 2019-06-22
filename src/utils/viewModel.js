export class ViewModel {
    notifyPropertyChanged(...properties) {
        if (this && properties.every(value => value)) {
            for (const property of properties) {
                const observerProp = this[`__Observable_${property}`];
                if(observerProp){
                    observerProp.notifyAction();
                } else {
                    console.log(this);
                }
            }
        }
    }

    notifyAllPropertyChanged(...except) {
        let ownPropertyDescriptors = Object.keys(Object.getOwnPropertyDescriptors(this))
            .filter(value => except.indexOf(value) === -1)
            .filter(value => !value.includes("__"))
        ;
        this.notifyPropertyChanged(...ownPropertyDescriptors);
    }
}
