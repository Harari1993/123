import { Injectable } from '@angular/core';
import { CesiumService } from '../cesium/cesium.service';
export var GeoUtilsService = (function () {
    function GeoUtilsService(cesiumService) {
        this.cesiumService = cesiumService;
    }
    GeoUtilsService.prototype.pointByLocationDistanceAndAzimuth = function (currentLocation, meterDistance, radianAzimuth, isInputCartesian) {
        if (isInputCartesian === void 0) { isInputCartesian = false; }
        var distance = meterDistance / Cesium.Ellipsoid.WGS84.maximumRadius;
        var curLat = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).latitude : currentLocation.latitude;
        var curLon = isInputCartesian ? Cesium.Cartographic.fromCartesian(currentLocation).longitude : currentLocation.longitude;
        var destinationLat = Math.asin(Math.sin(curLat) * Math.cos(distance) +
            Math.cos(curLat) * Math.sin(distance) * Math.cos(radianAzimuth));
        var destinationLon = curLon + Math.atan2(Math.sin(radianAzimuth) * Math.sin(distance) * Math.cos(curLat), Math.cos(distance) - Math.sin(curLat) * Math.sin(destinationLat));
        destinationLon = (destinationLon + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        return Cesium.Cartesian3.fromRadians(destinationLon, destinationLat);
    };
    GeoUtilsService.prototype.screenPositionToCartesian3 = function (screenPos) {
        var camera = this.cesiumService.getViewer().camera;
        return camera.pickEllipsoid(screenPos);
    };
    GeoUtilsService.decorators = [
        { type: Injectable },
    ];
    GeoUtilsService.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return GeoUtilsService;
}());
//# sourceMappingURL=geo-utils.service.js.map