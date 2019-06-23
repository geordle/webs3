
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
        const descriptor = this.getPropertyDescriptionOnProto(_vm, prop);
        if (descriptor) {
            setter = descriptor.set;
            getter = descriptor.get;
        }
        Object.defineProperty(_vm, prop, {
            get: () => getter.call(_vm),
            set: newValue => {
                if (newValue !== undefined) {
                    val = newValue;
                    setter.call(_vm, newValue);
                }
                notifyAction();
            },
            configurable: false,
        });
        const notifyAction = this.getNotifyWatchersAction(_vm, prop, getter);
        const notifyForObserver = this.getNotifyObserverAction(_vm, prop, getter);
        _vm[`__Observable_${prop}`] = { events: [], notifyAction, notifyForObserver };
        if (_vm[`__Observable_${prop}`].events.length > 10) {
            _vm[`__Observable_${prop}`].events.shift();
        }
    }

    static getNotifyWatchersAction(_vm, prop, getter) {
        return () => {
            const actions = _vm[`__Observable_${prop}`]
                .events.flatMap(([key, val]) => val);
            if (actions) {
                for (const action of actions) {
                    action(getter.call(_vm));
                }
            }

        };
    }

    static getNotifyObserverAction(_vm, prop, getter) {
        return (observer) => {
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
    }

    /* recurse through proto chain until prop is found on proto or chain fully traversed*/
    static getPropertyDescriptionOnProto(obj, prop) {
        const descr = Object.getPrototypeOf(obj);
        if (!descr) return null;
        const propDesc = Object.getOwnPropertyDescriptor(descr, prop);
        if (propDesc) {
            return propDesc;
        } else {
            return this.getPropertyDescriptionOnProto(descr, prop);
        }
    }
}
