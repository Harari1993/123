var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { StaticPolylineDrawerService } from '../../services/static-polyline-drawer/static-polyline-drawer.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export var AcStaticPolylineDescComponent = (function (_super) {
    __extends(AcStaticPolylineDescComponent, _super);
    function AcStaticPolylineDescComponent(polylineDrawerService, layerService, computationCache, cesiumProperties) {
        _super.call(this, polylineDrawerService, layerService, computationCache, cesiumProperties);
    }
    AcStaticPolylineDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-static-polyline-desc',
                    template: ''
                },] },
    ];
    AcStaticPolylineDescComponent.ctorParameters = function () { return [
        { type: StaticPolylineDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticPolylineDescComponent;
}(BasicStaticPrimitiveDesc));
//# sourceMappingURL=ac-static-polyline-desc.component.js.map