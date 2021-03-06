import { Component, Input } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
import { MapLayerProviderOptions } from '../../models/map-layer-provider-options.enum';
import { Checker } from '../../utils/checker';
export var AcMapLayerProviderComponent = (function () {
    function AcMapLayerProviderComponent(cesiumService) {
        this.cesiumService = cesiumService;
        this.options = {};
        this.provider = MapLayerProviderOptions.OFFLINE;
    }
    AcMapLayerProviderComponent.prototype.ngOnInit = function () {
        if (!Checker.present(this.options.url) && this.provider !== MapLayerProviderOptions.OFFLINE) {
            throw 'options must have a url';
        }
        var provider;
        switch (this.provider) {
            case MapLayerProviderOptions.WebMapService:
                provider = AcMapLayerProviderComponent.createWebMapServiceProvider(this.options);
                break;
            case MapLayerProviderOptions.WebMapTileService:
                provider = AcMapLayerProviderComponent.createWebMapTileServiceProvider(this.options);
                break;
            case MapLayerProviderOptions.ArcGisMapServer:
                provider = AcMapLayerProviderComponent.createArcGisMapServerProvider(this.options);
                break;
            case MapLayerProviderOptions.OFFLINE:
                break;
            default:
                provider = AcMapLayerProviderComponent.createOfflineMapProvider();
                break;
        }
        this.cesiumService.getScene().imageryLayers.addImageryProvider(provider, this.index);
    };
    AcMapLayerProviderComponent.createWebMapServiceProvider = function (options) {
        return new Cesium.WebMapServiceImageryProvider(options);
    };
    AcMapLayerProviderComponent.createWebMapTileServiceProvider = function (options) {
        return new Cesium.WebMapTileServiceImageryProvider(options);
    };
    AcMapLayerProviderComponent.createArcGisMapServerProvider = function (options) {
        return new Cesium.ArcGisMapServerImageryProvider(options);
    };
    AcMapLayerProviderComponent.createOfflineMapProvider = function () {
        return Cesium.createTileMapServiceImageryProvider({
            url: Cesium.buildModuleUrl('Assets/Textures/NaturalEarthII')
        });
    };
    AcMapLayerProviderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-map-layer-provider',
                    template: '',
                },] },
    ];
    AcMapLayerProviderComponent.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    AcMapLayerProviderComponent.propDecorators = {
        'options': [{ type: Input },],
        'provider': [{ type: Input },],
        'index': [{ type: Input },],
    };
    return AcMapLayerProviderComponent;
}());
//# sourceMappingURL=ac-map-layer-provider.component.js.map