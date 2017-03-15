import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export declare class DynamicEllipseDrawerService extends SimpleDrawerService {
    constructor(cesiumService: CesiumService);
    add(cesiumProps: any): any;
    update(ellipse: any, cesiumProps: any): any;
}
