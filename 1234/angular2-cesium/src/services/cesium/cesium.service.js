import { Injectable, NgZone } from '@angular/core';
import { ViewerFactory } from '../viewer-factory/viewer-factory.service';
export var CesiumService = (function () {
    function CesiumService(ngZone, viewerFactory) {
        this.ngZone = ngZone;
        this.viewerFactory = viewerFactory;
    }
    CesiumService.prototype.init = function (mapContainer) {
        var _this = this;
        this.ngZone.runOutsideAngular(function () {
            _this.cesiumViewer = _this.viewerFactory.createViewer(mapContainer);
        });
    };
    CesiumService.prototype.getViewer = function () {
        return this.cesiumViewer;
    };
    CesiumService.prototype.getScene = function () {
        return this.cesiumViewer.scene;
    };
    CesiumService.prototype.getMinimumZoom = function () {
        return this.getScene().screenSpaceCameraController.minimumZoomDistance;
    };
    CesiumService.prototype.setMinimumZoom = function (amount) {
        this.getScene().screenSpaceCameraController.minimumZoomDistance = amount;
    };
    CesiumService.prototype.getMaximumZoom = function () {
        return this.getScene().screenSpaceCameraController.maximumZoomDistance;
    };
    CesiumService.prototype.setMaximumZoom = function (amount) {
        this.getScene().screenSpaceCameraController.maximumZoomDistance = amount;
    };
    CesiumService.prototype.setEnableTilt = function (isTilt) {
        this.getScene().screenSpaceCameraController.enableTilt = isTilt;
    };
    CesiumService.prototype.morphTo2D = function (duration) {
        if (duration === void 0) { duration = 2.0; }
        this.getScene().morphTo2D(duration);
    };
    CesiumService.prototype.morphTo3D = function (duration) {
        if (duration === void 0) { duration = 2.0; }
        this.getScene().morphTo3D(duration);
    };
    CesiumService.prototype.morphToColumbusView = function (duration) {
        if (duration === void 0) { duration = 2.0; }
        this.getScene().morphToColumbusView(duration);
    };
    CesiumService.decorators = [
        { type: Injectable },
    ];
    CesiumService.ctorParameters = function () { return [
        { type: NgZone, },
        { type: ViewerFactory, },
    ]; };
    return CesiumService;
}());
//# sourceMappingURL=cesium.service.js.map