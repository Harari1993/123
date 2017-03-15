var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { BillboardDrawerService } from '../../services/billboard-drawer/billboard-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
export var AcBillboardDescComponent = (function (_super) {
    __extends(AcBillboardDescComponent, _super);
    function AcBillboardDescComponent(billboardDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, billboardDrawer, layerService, computationCache, cesiumProperties);
    }
    AcBillboardDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-billboard-desc',
                    template: ''
                },] },
    ];
    AcBillboardDescComponent.ctorParameters = function () { return [
        { type: BillboardDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcBillboardDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-billborad-desc.component.js.map