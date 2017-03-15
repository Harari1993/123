var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
export var StaticPolylineDrawerService = (function (_super) {
    __extends(StaticPolylineDrawerService, _super);
    function StaticPolylineDrawerService(cesiumService) {
        _super.call(this, Cesium.PolylineGeometry, cesiumService);
    }
    StaticPolylineDrawerService.prototype.update = function (primitive, geometryProps, instanceProps, primitiveProps) {
        var color = instanceProps.attributes.color.value;
        if (primitive.ready) {
            primitive.getGeometryInstanceAttributes().color = color;
        }
        else {
            Cesium.when(primitive.readyPromise).then(function (readyPrimitive) {
                readyPrimitive.getGeometryInstanceAttributes().color.value = color;
            });
        }
        return primitive;
    };
    StaticPolylineDrawerService.decorators = [
        { type: Injectable },
    ];
    StaticPolylineDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return StaticPolylineDrawerService;
}(StaticPrimitiveDrawer));
//# sourceMappingURL=static-polyline-drawer.service.js.map