var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Injectable } from '@angular/core';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export var ArcDrawerService = (function (_super) {
    __extends(ArcDrawerService, _super);
    function ArcDrawerService(cesiumService) {
        _super.call(this, Cesium.PrimitiveCollection, cesiumService);
    }
    ArcDrawerService.prototype.add = function (cesiumProps) {
        var arcPositions = this.generatePositions(cesiumProps);
        var colorMaterial = Cesium.Material.fromType('Color');
        colorMaterial.uniforms.color = cesiumProps.color || Cesium.Color.WHITE;
        return _super.prototype.add.call(this, new Cesium.Primitive({
            geometryInstances: new Cesium.GeometryInstance({
                geometry: new Cesium.PolylineGeometry({
                    positions: arcPositions
                })
            }),
            appearance: new Cesium.PolylineMaterialAppearance({
                material: colorMaterial
            })
        }));
    };
    ArcDrawerService.prototype.generatePositions = function (cesiumProps) {
        var arcPositions = [];
        var defaultGranularity = 0.004;
        var numOfSamples = 1 / (cesiumProps.granularity || defaultGranularity);
        for (var i = 0; i < numOfSamples + 1; i++) {
            var currentAngle = cesiumProps.angle + cesiumProps.delta * i / numOfSamples;
            var distance = cesiumProps.radius / Cesium.Ellipsoid.WGS84.maximumRadius;
            var curLat = Cesium.Cartographic.fromCartesian(cesiumProps.center).latitude;
            var curLon = Cesium.Cartographic.fromCartesian(cesiumProps.center).longitude;
            var destinationLat = Math.asin(Math.sin(curLat) * Math.cos(distance) +
                Math.cos(curLat) * Math.sin(distance) * Math.cos(currentAngle));
            var destinationLon = curLon + Math.atan2(Math.sin(currentAngle) * Math.sin(distance) * Math.cos(curLat), Math.cos(distance) - Math.sin(curLat) * Math.sin(destinationLat));
            destinationLon = (destinationLon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
            arcPositions.push(Cesium.Cartesian3.fromRadians(destinationLon, destinationLat));
        }
        return arcPositions;
    };
    ArcDrawerService.decorators = [
        { type: Injectable },
    ];
    ArcDrawerService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return ArcDrawerService;
}(SimpleDrawerService));
//# sourceMappingURL=arc-drawer.service.js.map