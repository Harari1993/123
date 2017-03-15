import { Injectable } from '@angular/core';
export var ViewerFactory = (function () {
    function ViewerFactory() {
        this.cesium = Cesium;
    }
    ViewerFactory.prototype.createViewer = function (mapContainer, options) {
        window['CESIUM_BASE_URL'] = '/node_modules/cesium/Build/Cesium';
        if (options) {
            return new this.cesium.Viewer(mapContainer, options);
        }
        else {
            return new this.cesium.Viewer(mapContainer, {
                imageryProvider: Cesium.createTileMapServiceImageryProvider({
                    url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
                }),
                baseLayerPicker: false,
                geocoder: false
            });
        }
    };
    ViewerFactory.decorators = [
        { type: Injectable },
    ];
    ViewerFactory.ctorParameters = function () { return []; };
    return ViewerFactory;
}());
//# sourceMappingURL=viewer-factory.service.js.map