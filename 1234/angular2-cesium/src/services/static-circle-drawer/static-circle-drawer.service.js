var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
export var StaticCircleDrawerService = (function (_super) {
    __extends(StaticCircleDrawerService, _super);
    function StaticCircleDrawerService(cesiumService) {
        _super.call(this, Cesium.CircleGeometry, cesiumService);
    }
    StaticCircleDrawerService.decorators = [
        { type: Injectable },
    ];
    StaticCircleDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticCircleDrawerService;
}(StaticPrimitiveDrawer));
//# sourceMappingURL=static-circle-drawer.service.js.map