import { BillboardDrawerService } from '../../services/billboard-drawer/billboard-drawer.service';
import { Component, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LayerService } from '../../services/layer-service/layer-service.service';
import { ActionType } from '../../models/action-type.enum';
import { ComputationCache } from '../../services/computation-cache/computation-cache.service';
import { LabelDrawerService } from '../../services/label-drawer/label-drawer.service';
import { StaticCircleDrawerService } from '../../services/static-circle-drawer/static-circle-drawer.service';
import { EllipseDrawerService } from '../../services/ellipse-drawer/ellipse-drawer.service';
import { DynamicEllipseDrawerService } from '../../services/ellipse-drawer/dynamic-ellipse-drawer.service';
import { DynamicPolylineDrawerService } from '../../services/dynamic-polyline-drawer/dynamic-polyline-drawer.service';
import { StaticPolylineDrawerService } from '../../services/static-polyline-drawer/static-polyline-drawer.service';
import { PolygonDrawerService } from '../../services/polygon-drawer/polygon-drawer.service';
import { ArcDrawerService } from '../../services/arc-drawer/arc-drawer.service';
export var AcLayerComponent = (function () {
    function AcLayerComponent(layerService, _computationCache, billboardDrawerService, labelDrawerService, ellipseDrawerService, dynamicEllipseDrawerService, dynamicPolylineDrawerService, staticCircleDrawerService, staticPolylineDrawerService, polygonDrawerService, arcDrawerService) {
        this.layerService = layerService;
        this._computationCache = _computationCache;
        this.show = true;
        this._drawerList = [];
        this._updateStream = new Subject();
        this._drawerList = Array.of(billboardDrawerService, labelDrawerService, ellipseDrawerService, dynamicEllipseDrawerService, dynamicPolylineDrawerService, staticCircleDrawerService, staticPolylineDrawerService, polygonDrawerService, arcDrawerService);
    }
    AcLayerComponent.prototype.init = function () {
        var _this = this;
        this.initValidParams();
        this.observable.merge(this._updateStream).subscribe(function (notification) {
            _this._computationCache.clear();
            _this.context[_this.entityName] = notification.entity;
            _this.layerService.getDescriptions().forEach(function (descriptionComponent) {
                switch (notification.actionType) {
                    case ActionType.ADD_UPDATE:
                        descriptionComponent.draw(_this.context, notification.id, notification.entity);
                        break;
                    case ActionType.DELETE:
                        descriptionComponent.remove(notification.id);
                        break;
                    default:
                        console.error('unknown action type: ' + notification.actionType);
                }
            });
        });
    };
    AcLayerComponent.prototype.initValidParams = function () {
        if (!this.context) {
            throw 'ac-layer: must initialize [context] ';
        }
        if (!AcLayerComponent.acForRgx.test(this.acFor)) {
            throw 'ac-layer: must initialize [acFor] with a valid syntax \' [acFor]=\"let item of observer$\" \' '
                + 'instead received: ' + this.acFor;
        }
        var acForArr = this.acFor.split(' ');
        this.observable = this.context[acForArr[3]];
        this.entityName = acForArr[1];
        if (!this.observable || !(this.observable instanceof Observable)) {
            throw 'ac-layer: must initailize [acFor] with rx observable, instead received: ' + this.observable;
        }
    };
    AcLayerComponent.prototype.ngAfterContentInit = function () {
        this.init();
    };
    AcLayerComponent.prototype.ngOnInit = function () {
    };
    AcLayerComponent.prototype.ngOnChanges = function (changes) {
        if (changes['show']) {
            var showValue_1 = changes['show'].currentValue;
            this._drawerList.forEach(function (drawer) { return drawer.setShow(showValue_1); });
        }
    };
    AcLayerComponent.prototype.removeAll = function () {
        this.layerService.getDescriptions().forEach(function (description) { return description.removeAll(); });
    };
    AcLayerComponent.prototype.remove = function (entityId) {
        this._updateStream.next({ id: entityId, actionType: ActionType.DELETE });
    };
    AcLayerComponent.prototype.update = function (notification) {
        this._updateStream.next(notification);
    };
    AcLayerComponent.prototype.refreshAll = function (collection) {
        var _this = this;
        Observable.from(collection).subscribe(function (entity) { return _this._updateStream.next(entity); });
    };
    AcLayerComponent.acForRgx = /^let\s+.+\s+of\s+.+$/;
    AcLayerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-layer',
                    template: '',
                    providers: [
                        LayerService, ComputationCache, BillboardDrawerService, LabelDrawerService, EllipseDrawerService,
                        DynamicEllipseDrawerService, DynamicPolylineDrawerService, StaticCircleDrawerService,
                        StaticPolylineDrawerService, PolygonDrawerService, ArcDrawerService
                    ]
                },] },
    ];
    AcLayerComponent.ctorParameters = function () { return [
        { type: LayerService, },
        { type: ComputationCache, },
        { type: BillboardDrawerService, },
        { type: LabelDrawerService, },
        { type: EllipseDrawerService, },
        { type: DynamicEllipseDrawerService, },
        { type: DynamicPolylineDrawerService, },
        { type: StaticCircleDrawerService, },
        { type: StaticPolylineDrawerService, },
        { type: PolygonDrawerService, },
        { type: ArcDrawerService, },
    ]; };
    AcLayerComponent.propDecorators = {
        'show': [{ type: Input },],
        'acFor': [{ type: Input },],
        'context': [{ type: Input },],
    };
    return AcLayerComponent;
}());
//# sourceMappingURL=ac-layer.component.js.map