var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { EllipseDrawerService } from '../../services/ellipse-drawer/ellipse-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export var AcStaticEllipseDescComponent = (function (_super) {
    __extends(AcStaticEllipseDescComponent, _super);
    function AcStaticEllipseDescComponent(ellipseDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, ellipseDrawer, layerService, computationCache, cesiumProperties);
    }
    AcStaticEllipseDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-static-ellipse-desc',
                    template: ''
                },] },
    ];
    AcStaticEllipseDescComponent.ctorParameters = function () { return [
        { type: EllipseDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticEllipseDescComponent;
}(BasicStaticPrimitiveDesc));
//# sourceMappingURL=ac-static-ellipse-desc.component.js.map