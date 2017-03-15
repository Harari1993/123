var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { SimpleDrawerService } from '../simple-drawer/simple-drawer.service';
export var StaticPrimitiveDrawer = (function (_super) {
    __extends(StaticPrimitiveDrawer, _super);
    function StaticPrimitiveDrawer(geometryType, cesiumService) {
        _super.call(this, Cesium.PrimitiveCollection, cesiumService);
        this.geometryType = geometryType;
    }
    StaticPrimitiveDrawer.prototype.add = function (geometryProps, instanceProps, primitiveProps) {
        instanceProps.geometry = new this.geometryType(geometryProps);
        primitiveProps.geometryInstances = new Cesium.GeometryInstance(instanceProps);
        return _super.prototype.add.call(this, new Cesium.Primitive(primitiveProps));
    };
    StaticPrimitiveDrawer.prototype.update = function (primitive, geometryProps, instanceProps, primitiveProps) {
    };
    return StaticPrimitiveDrawer;
}(SimpleDrawerService));
//# sourceMappingURL=static-primitive-drawer.service.js.map