var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Input } from '@angular/core';
import { BasicDesc } from '../basic-desc/basic-desc.service';
export var BasicStaticPrimitiveDesc = (function (_super) {
    __extends(BasicStaticPrimitiveDesc, _super);
    function BasicStaticPrimitiveDesc(_staticPrimitiveDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, _staticPrimitiveDrawer, layerService, computationCache, cesiumProperties);
        this._staticPrimitiveDrawer = _staticPrimitiveDrawer;
    }
    BasicStaticPrimitiveDesc.prototype.ngOnInit = function () {
        this._layerService.registerDescription(this);
        this._geometryPropsEvaluator = this._cesiumProperties.createEvaluator(this.geometryProps);
        this._instancePropsEvaluator = this._cesiumProperties.createEvaluator(this.instanceProps);
        this._primitivePropsEvaluator = this._cesiumProperties.createEvaluator(this.primitiveProps);
    };
    BasicStaticPrimitiveDesc.prototype.draw = function (context, id, entity) {
        var geometryProps = this._geometryPropsEvaluator(this._computationCache, context);
        var instanceProps = this._instancePropsEvaluator(this._computationCache, context);
        var primitiveProps = this._primitivePropsEvaluator(this._computationCache, context);
        if (!this._primitiveMap.has(id)) {
            var primitive = this._staticPrimitiveDrawer.add(geometryProps, instanceProps, primitiveProps);
            primitive.acEntity = entity;
            this._primitiveMap.set(id, primitive);
        }
        else {
            var primitive = this._primitiveMap.get(id);
            this._staticPrimitiveDrawer.update(primitive, geometryProps, instanceProps, primitiveProps);
        }
    };
    BasicStaticPrimitiveDesc.propDecorators = {
        'geometryProps': [{ type: Input },],
        'instanceProps': [{ type: Input },],
        'primitiveProps': [{ type: Input },],
    };
    return BasicStaticPrimitiveDesc;
}(BasicDesc));
//# sourceMappingURL=basic-static-primitive-desc.service.js.map