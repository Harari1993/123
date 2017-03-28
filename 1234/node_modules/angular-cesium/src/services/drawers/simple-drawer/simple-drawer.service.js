export var SimpleDrawerService = (function () {
    function SimpleDrawerService(drawerType, cesiumService) {
        this._showAll = true;
        this._cesiumCollection = new drawerType();
        cesiumService.getScene().primitives.add(this._cesiumCollection);
    }
    SimpleDrawerService.prototype.setPropsAssigner = function (assigner) {
        this._propsAssigner = assigner;
    };
    SimpleDrawerService.prototype.add = function (cesiumProps) {
        var moreProps = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            moreProps[_i - 1] = arguments[_i];
        }
        cesiumProps.show = this._showAll;
        return this._cesiumCollection.add(cesiumProps);
    };
    SimpleDrawerService.prototype.update = function (primitive, cesiumProps) {
        var moreProps = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            moreProps[_i - 2] = arguments[_i];
        }
        if (this._propsAssigner) {
            this._propsAssigner(primitive, cesiumProps);
        }
        else {
            Object.assign(primitive, cesiumProps);
        }
    };
    SimpleDrawerService.prototype.remove = function (primitive) {
        this._cesiumCollection.remove(primitive);
    };
    SimpleDrawerService.prototype.removeAll = function () {
        this._cesiumCollection.removeAll();
    };
    SimpleDrawerService.prototype.setShow = function (showValue) {
        this._showAll = showValue;
        for (var i = 0; i < this._cesiumCollection.length; i++) {
            var primitive = this._cesiumCollection.get(i);
            primitive.show = showValue;
        }
    };
    return SimpleDrawerService;
}());
//# sourceMappingURL=simple-drawer.service.js.map