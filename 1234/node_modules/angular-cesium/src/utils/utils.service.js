export var UtilsService = (function () {
    function UtilsService() {
    }
    UtilsService.unique = function (array) {
        return array.reduce(function (accumulator, currentValue) {
            if (accumulator.indexOf(currentValue) < 0) {
                accumulator.push(currentValue);
            }
            return accumulator;
        }, []);
    };
    return UtilsService;
}());
//# sourceMappingURL=utils.service.js.map