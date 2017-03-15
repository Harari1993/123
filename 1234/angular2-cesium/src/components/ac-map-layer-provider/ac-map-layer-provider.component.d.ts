import { OnInit } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
import { MapLayerProviderOptions } from '../../models/map-layer-provider-options.enum';
export declare class AcMapLayerProviderComponent implements OnInit {
    private cesiumService;
    options: {
        url?: string;
    };
    provider: MapLayerProviderOptions;
    index: Number;
    constructor(cesiumService: CesiumService);
    ngOnInit(): void;
    static createWebMapServiceProvider(options: any): any;
    static createWebMapTileServiceProvider(options: any): any;
    static createArcGisMapServerProvider(options: any): any;
    static createOfflineMapProvider(): any;
}
