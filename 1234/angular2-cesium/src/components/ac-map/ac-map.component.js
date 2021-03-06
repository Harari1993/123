import { Component, ElementRef, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CesiumService } from '../../services/cesium/cesium.service';
import { BillboardDrawerService } from '../../services/billboard-drawer/billboard-drawer.service';
import { MapEventsManagerService } from '../../services/map-events-mananger/map-events-manager';
import { CesiumEventBuilder } from '../../services/map-events-mananger/cesium-event-builder';
import { PlonterService } from '../../services/plonter/plonter.service';
export var AcMapComponent = (function () {
    function AcMapComponent(_cesiumService, _elemRef, document) {
        this._cesiumService = _cesiumService;
        this._elemRef = _elemRef;
        this.document = document;
        this.minimumZoom = AcMapComponent.DEFAULT_MINIMUM_ZOOM;
        this.maximumZoom = AcMapComponent.DEFAULT_MAXIMUM_ZOOM;
        this.enableTilt = AcMapComponent.DEFAULT_TILT_ENABLE;
        var mapContainer = this.document.createElement('div');
        this._elemRef.nativeElement.appendChild(mapContainer);
        this._cesiumService.init(mapContainer);
    }
    AcMapComponent.prototype.ngOnInit = function () {
        this._cesiumService.setMinimumZoom(this.minimumZoom);
        this._cesiumService.setMaximumZoom(this.maximumZoom);
        this._cesiumService.setEnableTilt(this.enableTilt);
    };
    AcMapComponent.DEFAULT_MINIMUM_ZOOM = 1.0;
    AcMapComponent.DEFAULT_MAXIMUM_ZOOM = Number.POSITIVE_INFINITY;
    AcMapComponent.DEFAULT_TILT_ENABLE = true;
    AcMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-map',
                    template: '<ng-content></ng-content>',
                    providers: [CesiumService, BillboardDrawerService, CesiumEventBuilder, MapEventsManagerService, PlonterService]
                },] },
    ];
    AcMapComponent.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    ]; };
    AcMapComponent.propDecorators = {
        'minimumZoom': [{ type: Input },],
        'maximumZoom': [{ type: Input },],
        'enableTilt': [{ type: Input },],
    };
    return AcMapComponent;
}());
//# sourceMappingURL=ac-map.component.js.map