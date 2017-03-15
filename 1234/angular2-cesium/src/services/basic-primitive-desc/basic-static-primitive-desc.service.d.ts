import { BasicDesc } from '../basic-desc/basic-desc.service';
import { LayerService } from '../layer-service/layer-service.service';
import { ComputationCache } from '../computation-cache/computation-cache.service';
import { CesiumProperties } from '../cesium-properties/cesium-properties.service';
import { StaticPrimitiveDrawer } from '../static-primitive-drawer/static-primitive-drawer.service';
import { AcEntity } from '../../models/ac-entity';
export declare class BasicStaticPrimitiveDesc extends BasicDesc {
    protected _staticPrimitiveDrawer: StaticPrimitiveDrawer;
    geometryProps: any;
    instanceProps: any;
    primitiveProps: any;
    private _geometryPropsEvaluator;
    private _instancePropsEvaluator;
    private _primitivePropsEvaluator;
    constructor(_staticPrimitiveDrawer: StaticPrimitiveDrawer, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
    ngOnInit(): void;
    draw(context: any, id: any, entity: AcEntity): any;
}
