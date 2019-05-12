export class ViewModel {
    notifyPropertyChanged(...properties) {
        if (this && properties.every(value => value)) {
            for (const property of properties) {
                const desciptor = Object.getOwnPropertyDescriptor(
                    this,
                    property
                );
                if (desciptor) {

                    const setter = Object.getOwnPropertyDescriptor(
                        this,
                        property
                    ).set;
                    if (setter) {
                        setter.call(this, this[property]);
                    }
                }
            }
        }
    }

    notifyAllPropertyChanged(...except) {
        let ownPropertyDescriptors = [...Object.keys(Object.getOwnPropertyDescriptors(this))]
            .filter(value => except.indexOf(value) === -1);
        this.notifyPropertyChanged(...ownPropertyDescriptors);
    }
}
