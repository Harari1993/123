import { StaticPolylineDrawerService } from '../../services/static-polyline-drawer/static-polyline-drawer.service';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export declare class AcStaticPolylineDescComponent extends BasicStaticPrimitiveDesc {
    constructor(polylineDrawerService: StaticPolylineDrawerService, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
}
