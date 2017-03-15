var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export var DynamicPolylineDrawerService = (function (_super) {
    __extends(DynamicPolylineDrawerService, _super);
    function DynamicPolylineDrawerService(cesiumService) {
        _super.call(this, Cesium.PolylineCollection, cesiumService);
    }
    DynamicPolylineDrawerService.decorators = [
        { type: Injectable },
    ];
    DynamicPolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return DynamicPolylineDrawerService;
}(SimpleDrawerService));
//# sourceMappingURL=dynamic-polyline-drawer.service.js.map