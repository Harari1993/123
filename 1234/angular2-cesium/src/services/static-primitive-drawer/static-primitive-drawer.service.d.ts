import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { CesiumService } from '../cesium/cesium.service';
export declare abstract class StaticPrimitiveDrawer extends SimpleDrawerService {
    private geometryType;
    constructor(geometryType: any, cesiumService: CesiumService);
    add(geometryProps: any, instanceProps: any, primitiveProps: any): any;
    update(primitive: any, geometryProps: any, instanceProps: any, primitiveProps: any): void;
}
