var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { PolygonDrawerService } from '../../services/polygon-drawer/polygon-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export var AcStaticPolygonDescComponent = (function (_super) {
    __extends(AcStaticPolygonDescComponent, _super);
    function AcStaticPolygonDescComponent(polygonDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, polygonDrawer, layerService, computationCache, cesiumProperties);
    }
    AcStaticPolygonDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-static-polygon-desc',
                    template: '',
                },] },
    ];
    AcStaticPolygonDescComponent.ctorParameters = function () { return [
        { type: PolygonDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticPolygonDescComponent;
}(BasicStaticPrimitiveDesc));
//# sourceMappingURL=ac-static-polygon-desc.component.js.map