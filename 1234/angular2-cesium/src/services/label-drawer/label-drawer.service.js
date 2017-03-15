var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
export var LabelDrawerService = (function (_super) {
    __extends(LabelDrawerService, _super);
    function LabelDrawerService(cesiumService) {
        _super.call(this, Cesium.LabelCollection, cesiumService);
    }
    LabelDrawerService.decorators = [
        { type: Injectable },
    ];
    LabelDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return LabelDrawerService;
}(SimpleDrawerService));
//# sourceMappingURL=label-drawer.service.js.map