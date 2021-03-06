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
export var AcDynamicEllipseDescComponent = (function (_super) {
    __extends(AcDynamicEllipseDescComponent, _super);
    function AcDynamicEllipseDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties);
    }
    AcDynamicEllipseDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-dynamic-ellipse-desc',
                    template: '',
                },] },
    ];
    AcDynamicEllipseDescComponent.ctorParameters = function () { return [
        { type: DynamicEllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcDynamicEllipseDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-dynamic-ellipse-desc.component.js.map