import { Input } from '@angular/core';
export var BasicDesc = (function () {
    function BasicDesc(_drawer, _layerService, _computationCache, _cesiumProperties) {
        this._drawer = _drawer;
        this._layerService = _layerService;
        this._computationCache = _computationCache;
        this._cesiumProperties = _cesiumProperties;
        this._primitiveMap = new Map();
    }
    BasicDesc.prototype._propsEvaluator = function (context) {
        return this._propsEvaluateFn(this._computationCache, context);
    };
    BasicDesc.prototype.ngOnInit = function () {
        this._layerService.registerDescription(this);
        this._propsEvaluateFn = this._cesiumProperties.createEvaluator(this.props);
        this._drawer.setPropsAssigner(this._cesiumProperties.createAssigner(this.props));
    };
    BasicDesc.prototype.draw = function (context, id, entity) {
        var cesiumProps = this._propsEvaluator(context);
        if (!this._primitiveMap.has(id)) {
            var primitive = this._drawer.add(cesiumProps);
            primitive.acEntity = entity;
            this._primitiveMap.set(id, primitive);
        }
        else {
            var primitive = this._primitiveMap.get(id);
            this._drawer.update(primitive, cesiumProps);
        }
    };
    BasicDesc.prototype.remove = function (id) {
        var primitive = this._primitiveMap.get(id);
        this._drawer.remove(primitive);
        this._primitiveMap.delete(id);
    };
    BasicDesc.prototype.removeAll = function () {
        this._primitiveMap.clear();
        this._drawer.removeAll();
    };
    BasicDesc.propDecorators = {
        'props': [{ type: Input },],
    };
    return BasicDesc;
}());
//# sourceMappingURL=basic-desc.service.js.map