import { OnInit } from '@angular/core';
import { LayerService } from '../layer-service/layer-service.service';
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
import { ComputationCache } from '../computation-cache/computation-cache.service';
import { CesiumProperties } from '../cesium-properties/cesium-properties.service';
import { AcEntity } from '../../models/ac-entity';
export declare class BasicDesc implements OnInit {
    protected _drawer: SimpleDrawerService;
    protected _layerService: LayerService;
    protected _computationCache: ComputationCache;
    protected _cesiumProperties: CesiumProperties;
    props: any;
    protected _primitiveMap: Map<any, any>;
    private _propsEvaluateFn;
    constructor(_drawer: SimpleDrawerService, _layerService: LayerService, _computationCache: ComputationCache, _cesiumProperties: CesiumProperties);
    protected _propsEvaluator(context: Object): any;
    ngOnInit(): void;
    draw(context: any, id: number, entity: AcEntity): any;
    remove(id: any): void;
    removeAll(): void;
}
