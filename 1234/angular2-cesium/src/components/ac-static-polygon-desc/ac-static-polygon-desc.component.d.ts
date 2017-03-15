import { LayerService } from '../../services/layer-service/layer-service.service';
import { PolygonDrawerService } from '../../services/polygon-drawer/polygon-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export declare class AcStaticPolygonDescComponent extends BasicStaticPrimitiveDesc {
    constructor(polygonDrawer: PolygonDrawerService, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
}
