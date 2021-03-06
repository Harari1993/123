import { CesiumService } from '../cesium/cesium.service';
import { CesiumEvent } from './consts/cesium-event.enum';
import { Injectable } from '@angular/core';
import { CesiumPureEventObserver } from './cesium-pure-event-observer';
import { CesiumLongPressObserver } from './cesium-long-press-observer';
export var CesiumEventBuilder = (function () {
    function CesiumEventBuilder(cesiumService) {
        this.cesiumEventsObservables = new Map();
        this.eventsHandler = cesiumService.getViewer().screenSpaceEventHandler;
    }
    CesiumEventBuilder.prototype.get = function (event, modifier) {
        if (modifier === void 0) { modifier = undefined; }
        var eventName = CesiumEventBuilder.getEventFullName(event, modifier);
        if (this.cesiumEventsObservables.has(eventName)) {
            return this.cesiumEventsObservables.get(eventName);
        }
        else {
            var eventObserver = this.createCesiumEventObservable(event, modifier);
            this.cesiumEventsObservables.set(eventName, eventObserver);
            return eventObserver;
        }
    };
    CesiumEventBuilder.getEventFullName = function (event, modifier) {
        if (modifier) {
            return event + "_" + modifier;
        }
        else {
            return event.toString();
        }
    };
    CesiumEventBuilder.prototype.createCesiumEventObservable = function (event, modifier) {
        var cesiumEventObservable = undefined;
        if (CesiumEventBuilder.longPressEvents.has(event)) {
            cesiumEventObservable = this.createSpecialCesiumEventObservable(event, modifier);
        }
        else {
            cesiumEventObservable = new CesiumPureEventObserver(event, modifier).init(this.eventsHandler).publish();
        }
        cesiumEventObservable.connect();
        return cesiumEventObservable;
    };
    CesiumEventBuilder.prototype.createSpecialCesiumEventObservable = function (event, modifier) {
        return new CesiumLongPressObserver(event, modifier, this).init();
    };
    CesiumEventBuilder.longPressEvents = new Set([
        CesiumEvent.LONG_LEFT_PRESS,
        CesiumEvent.LONG_RIGHT_PRESS,
        CesiumEvent.LONG_MIDDLE_PRESS
    ]);
    CesiumEventBuilder.decorators = [
        { type: Injectable },
    ];
    CesiumEventBuilder.ctorParameters = function () { return [
        { type: CesiumService, },
    ]; };
    return CesiumEventBuilder;
}());
//# sourceMappingURL=cesium-event-builder.js.map