export var Checker = (function () {
    function Checker() {
    }
    Checker.throwIfAnyNotPresent = function (values, propertyNames) {
        propertyNames.forEach(function (propertyName) { return Checker.throwIfNotPresent(values, propertyName); });
    };
    Checker.throwIfNotPresent = function (value, name) {
        if (!Checker.present(value[name])) {
            throw "Error: " + name + " was not given.";
        }
    };
    Checker.present = function (value) {
        return value !== undefined && value !== null;
    };
    return Checker;
}());
//# sourceMappingURL=checker.js.map