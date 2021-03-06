var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { DynamicPolylineDrawerService } from '../../services/dynamic-polyline-drawer/dynamic-polyline-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
export var AcDynamicPolylineDescComponent = (function (_super) {
    __extends(AcDynamicPolylineDescComponent, _super);
    function AcDynamicPolylineDescComponent(dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties) {
        _super.call(this, dynamicPolylineDrawerService, layerService, computationCache, cesiumProperties);
    }
    AcDynamicPolylineDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-dynamic-polyline-desc',
                    template: ''
                },] },
    ];
    AcDynamicPolylineDescComponent.ctorParameters = function () { return [
        { type: DynamicPolylineDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicPolylineDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-dynamic-polyline-desc.component.js.map