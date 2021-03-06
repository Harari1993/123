import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export declare class ArcDrawerService extends SimpleDrawerService {
    constructor(cesiumService: CesiumService);
    add(cesiumProps: any): any;
    private generatePositions(cesiumProps);
}
