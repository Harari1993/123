var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { ArcDrawerService } from '../../services/arc-drawer/arc-drawer.service';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
export var AcArcDescComponent = (function (_super) {
    __extends(AcArcDescComponent, _super);
    function AcArcDescComponent(arcDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, arcDrawer, layerService, computationCache, cesiumProperties);
    }
    AcArcDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-arc-desc',
                    template: ''
                },] },
    ];
    AcArcDescComponent.ctorParameters = function () { return [
        { type: ArcDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcArcDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-arc-desc.component.js.map