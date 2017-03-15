var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { StaticCircleDrawerService } from '../../services/static-circle-drawer/static-circle-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export var AcStaticCircleDescComponent = (function (_super) {
    __extends(AcStaticCircleDescComponent, _super);
    function AcStaticCircleDescComponent(staticCircleDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, staticCircleDrawer, layerService, computationCache, cesiumProperties);
    }
    AcStaticCircleDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-static-circle',
                    template: ''
                },] },
    ];
    AcStaticCircleDescComponent.ctorParameters = function () { return [
        { type: StaticCircleDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcStaticCircleDescComponent;
}(BasicStaticPrimitiveDesc));
//# sourceMappingURL=ac-static-circle-desc.component.js.map