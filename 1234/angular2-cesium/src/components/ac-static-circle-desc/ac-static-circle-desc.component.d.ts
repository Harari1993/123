import { LayerService } from '../../services/layer-service/layer-service.service';
import { StaticCircleDrawerService } from '../../services/static-circle-drawer/static-circle-drawer.service';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { CesiumProperties } from '../../services/cesium-properties/cesium-properties.service';
import { BasicStaticPrimitiveDesc } from '../../services/basic-primitive-desc/basic-static-primitive-desc.service';
export declare class AcStaticCircleDescComponent extends BasicStaticPrimitiveDesc {
    constructor(staticCircleDrawer: StaticCircleDrawerService, layerService: LayerService, computationCache: ComputationCache, cesiumProperties: CesiumProperties);
}
