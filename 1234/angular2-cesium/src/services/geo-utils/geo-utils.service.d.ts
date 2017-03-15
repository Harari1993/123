import { CesiumService } from '../cesium/cesium.service';
export declare class GeoUtilsService {
    private cesiumService;
    constructor(cesiumService: CesiumService);
    pointByLocationDistanceAndAzimuth(currentLocation: any, meterDistance: any, radianAzimuth: any, isInputCartesian?: boolean): any;
    screenPositionToCartesian3(screenPos: {
        x: number;
        y: number;
    }): any;
}
