import { BasicDesc } from '../../services/basic-desc/basic-desc.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { DynamicPolylineDrawerService } from '../../services/dynamic-polyline-drawer/dynamic-polyline-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
export declare class AcDynamicPolylineDescComponent extends BasicDesc {
    constructor(dynamicPolylineDrawerService: DynamicPolylineDrawerService, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
}
