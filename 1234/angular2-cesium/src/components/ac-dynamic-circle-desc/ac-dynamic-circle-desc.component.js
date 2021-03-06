var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { DynamicEllipseDrawerService } from '../../services/ellipse-drawer/dynamic-ellipse-drawer.service';
export var AcDynamicCircleDescComponent = (function (_super) {
    __extends(AcDynamicCircleDescComponent, _super);
    function AcDynamicCircleDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties);
    }
    AcDynamicCircleDescComponent.prototype._propsEvaluator = function (context) {
        var cesiumProps = _super.prototype._propsEvaluator.call(this, context);
        cesiumProps.semiMajorAxis = cesiumProps.radius;
        cesiumProps.semiMinorAxis = cesiumProps.radius;
        return cesiumProps;
    };
    AcDynamicCircleDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-dynamic-circle-desc',
                    template: ''
                },] },
    ];
    AcDynamicCircleDescComponent.ctorParameters = function () { return [
        { type: DynamicEllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicCircleDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-dynamic-circle-desc.component.js.map