var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
import { Checker } from '../../utils/checker';
import { EllipsePrimitive } from 'primitive-primitives';
export var DynamicEllipseDrawerService = (function (_super) {
    __extends(DynamicEllipseDrawerService, _super);
    function DynamicEllipseDrawerService(cesiumService) {
        _super.call(this, Cesium.PrimitiveCollection, cesiumService);
    }
    DynamicEllipseDrawerService.prototype.add = function (cesiumProps) {
        Checker.throwIfAnyNotPresent(cesiumProps, ['center', 'semiMajorAxis', 'semiMinorAxis', 'rotation']);
        return _super.prototype.add.call(this, new EllipsePrimitive(cesiumProps));
    };
    DynamicEllipseDrawerService.prototype.update = function (ellipse, cesiumProps) {
        ellipse.updateLocationData(cesiumProps);
        return ellipse;
    };
    DynamicEllipseDrawerService.decorators = [
        { type: Injectable },
    ];
    DynamicEllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return DynamicEllipseDrawerService;
}(SimpleDrawerService));
//# sourceMappingURL=dynamic-ellipse-drawer.service.js.map