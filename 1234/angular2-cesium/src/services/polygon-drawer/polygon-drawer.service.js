var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
export var PolygonDrawerService = (function (_super) {
    __extends(PolygonDrawerService, _super);
    function PolygonDrawerService(cesiumService) {
        _super.call(this, Cesium.PolygonGeometry, cesiumService);
    }
    PolygonDrawerService.decorators = [
        { type: Injectable },
    ];
    PolygonDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return PolygonDrawerService;
}(StaticPrimitiveDrawer));
//# sourceMappingURL=polygon-drawer.service.js.map