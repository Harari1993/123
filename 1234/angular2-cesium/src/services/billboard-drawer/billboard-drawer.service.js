var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export var BillboardDrawerService = (function (_super) {
    __extends(BillboardDrawerService, _super);
    function BillboardDrawerService(cesiumService) {
        _super.call(this, Cesium.BillboardCollection, cesiumService);
    }
    BillboardDrawerService.decorators = [
        { type: Injectable },
    ];
    BillboardDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return BillboardDrawerService;
}(SimpleDrawerService));
//# sourceMappingURL=billboard-drawer.service.js.map