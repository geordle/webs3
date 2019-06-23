export class ViewModel {
    notifyPropertyChanged(...properties) {
        if (this && properties.every(value => value)) {
            for (const property of properties) {
                const observerProp = this[`__Observable_${property}`];
                if (observerProp) {
                    observerProp.notifyAction();
                }
            }
        }
    }

    notifyAllPropertyChanged(...except) {
        this.observableProps(except).forEach(value => value.notifyAction());
    }


    observableProps(...except) {
        return Object.keys(Object.getOwnPropertyDescriptors(this))
            .filter(value => except.indexOf(value) === -1)
            .filter(value => value.match(/^__Observable/))
            .map(value => this[value]);

    }

    notifyForObserver(observer) {
        this.observableProps().forEach(value => value.notifyForObserver(observer));
    }
}
