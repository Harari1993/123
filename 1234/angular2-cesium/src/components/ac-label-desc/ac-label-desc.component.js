var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component } from '@angular/core';
import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { LabelDrawerService } from '../../services/label-drawer/label-drawer.service';
export var AcLabelDescComponent = (function (_super) {
    __extends(AcLabelDescComponent, _super);
    function AcLabelDescComponent(labelDrawer, layerService, computationCache, cesiumProperties) {
        _super.call(this, labelDrawer, layerService, computationCache, cesiumProperties);
    }
    AcLabelDescComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-label-desc',
                    template: '',
                },] },
    ];
    AcLabelDescComponent.ctorParameters = function () { return [
        { type: LabelDrawerService, },
        { type: LayerService, },
        { type: ComputationCache, },
        { type: CesiumProperties, },
    ]; };
    return AcLabelDescComponent;
}(BasicDesc));
//# sourceMappingURL=ac-label-desc.component.js.map