export class Observable {
    static bindProp(_vm, prop, ...events) {
        if (!_vm) {
            throw new Error("vm not entered");
        }
        let ObservableElement = _vm[`__Observable_${prop}`];
        if (!ObservableElement) {
            this.defineObservable(ObservableElement, _vm, prop);
        }
        _vm[`__Observable_${prop}`].events.push(...(events || []));
    }

    static defineObservable(ObservableElement, _vm, prop) {
        let val = _vm[prop];
        let getter = () => val;
        let setter = arg => (val = arg);
        const descriptor = Object.getOwnPropertyDescriptors(Object.getPrototypeOf(_vm))[prop];
        if (descriptor) {
            setter = descriptor.set;
            getter = descriptor.get;
        }
        const notifyAction = () => {
            for (const action of _vm[`__Observable_${prop}`].events) {
                action(getter.call(_vm));
            }
        };
        Object.defineProperty(_vm, prop, {
            get: () => {
                return getter.call(_vm);
            },
            set: newValue => {
                if (newValue !== undefined) {
                    val = newValue;
                    setter.call(_vm, newValue);
                }
                notifyAction();
            },
            configurable: false,
        });
        _vm[`__Observable_${prop}`] = { events: [], notifyAction };
        if(_vm[`__Observable_${prop}`].events.length > 10){
            _vm[`__Observable_${prop}`].events.shift();
        }
    }
}
