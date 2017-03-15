var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
export var EllipseDrawerService = (function (_super) {
    __extends(EllipseDrawerService, _super);
    function EllipseDrawerService(cesiumService) {
        _super.call(this, Cesium.EllipseGeometry, cesiumService);
    }
    EllipseDrawerService.decorators = [
        { type: Injectable },
    ];
    EllipseDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return EllipseDrawerService;
}(StaticPrimitiveDrawer));
//# sourceMappingURL=ellipse-drawer.service.js.map