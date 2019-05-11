

export function equalsAny(val, ...testValue) {
    return  testValue.some(value => value === val);
}
