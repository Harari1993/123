import { CesiumService } from '../cesium/cesium.service';
export declare abstract class SimpleDrawerService {
    protected _showAll: boolean;
    private _cesiumCollection;
    private _propsAssigner;
    constructor(drawerType: any, cesiumService: CesiumService);
    setPropsAssigner(assigner: Function): void;
    add(cesiumProps: any, ...moreProps: any[]): any;
    update(primitive: any, cesiumProps: Object, ...moreProps: any[]): void;
    remove(primitive: any): void;
    removeAll(): void;
    setShow(showValue: boolean): void;
}
