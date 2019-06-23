
export class Observable {
    static bindProp(_vm, origin, prop, ...events) {
        if (!_vm) {
            throw new Error("vm not entered");
        }
        let ObservableElement = _vm[`__Observable_${prop}`];
        if (!ObservableElement) {
            this.defineObservable(ObservableElement, _vm, prop);
        }
        _vm[`__Observable_${prop}`].events.push([origin, (events || [])]);
    }

    static defineObservable(ObservableElement, _vm, prop) {
        let val = _vm[prop];
        let getter = () => val;
        let setter = arg => (val = arg);
        let prototypeOf = Object.getPrototypeOf(_vm);

        const descriptor = this.unwrapRecursive(_vm, prop);

        if (descriptor) {

            setter = descriptor.set;
            getter = descriptor.get;
        }
        const notifyAction = () => {
            const actions = _vm[`__Observable_${prop}`]
                .events.flatMap(([key, val]) => val);
            if (actions) {
                for (const action of actions) {
                    action(getter.call(_vm));
                }
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
        const notifyForObserver = (observer) => {
            const actions = _vm[`__Observable_${prop}`]
                .events
                .filter(([key]) => key === observer)
                .flatMap(([key, value]) => value);
            if (actions) {
                for (const action of actions) {
                    action(getter.call(_vm));
                }
            }
        };
        _vm[`__Observable_${prop}`] = { events: [], notifyAction, notifyForObserver };
        if (_vm[`__Observable_${prop}`].events.length > 10) {
            _vm[`__Observable_${prop}`].events.shift();
        }
    }

    /* allows to recurse trhough proto chain untill prop is found*/
    static unwrapRecursive(obj, prop) {
        const descr = Object.getPrototypeOf(obj);
        if (!descr) return null;
        const propDesc = Object.getOwnPropertyDescriptor(descr, prop);
        if (propDesc) {
            return propDesc;
        } else {
            return this.unwrapRecursive(descr, prop);
        }
    }
}
