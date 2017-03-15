export function compileToJSON(json) {
    return JSON.stringify(json).replace(/"/g, '');
}
export function isPresent(obj) {
    return obj !== null && obj !== undefined;
}
export function isJsObject(obj) {
    return obj !== null && (typeof obj === 'function' || typeof obj === 'object');
}
export function isFunction(val) {
    return typeof val === 'function';
}

//# sourceMappingURL=lang.js.map
