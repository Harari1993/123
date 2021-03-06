import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CesiumService } from '../cesium/cesium.service';
import { CesiumEventBuilder } from './cesium-event-builder';
import { PickOptions } from './consts/pickOptions.enum';
import { UtilsService } from '../../utils/utils.service';
import { PlonterService } from '../plonter/plonter.service';
export var MapEventsManagerService = (function () {
    function MapEventsManagerService(cesiumService, eventBuilder, plonterService) {
        this.eventBuilder = eventBuilder;
        this.plonterService = plonterService;
        this.eventRegistrations = new Map();
        this.scene = cesiumService.getScene();
    }
    MapEventsManagerService.prototype.register = function (input) {
        var _this = this;
        if (this.scene === undefined) {
            throw 'CesiumService has not been initialized yet - MapEventsManagerService must be injected  under ac-map';
        }
        input.pick = input.pick || PickOptions.NO_PICK;
        input.priority = input.priority || 0;
        if (input.entityType && input.pick === PickOptions.NO_PICK) {
            throw 'MapEventsManagerService: can\'t register an event with entityType and PickOptions.NO_PICK - It doesn\'t make sense ';
        }
        var eventName = CesiumEventBuilder.getEventFullName(input.event, input.modifier);
        if (!this.eventRegistrations.has(eventName)) {
            this.eventRegistrations.set(eventName, []);
        }
        var eventRegistration = this.createEventRegistration(input.event, input.modifier, input.entityType, input.pick, input.priority);
        var registrationObservable = eventRegistration.observable;
        registrationObservable.dispose = function () { return _this.disposeObservable(eventRegistration, eventName); };
        this.eventRegistrations.get(eventName).push(eventRegistration);
        this.sortRegistrationsByPriority(eventName);
        return registrationObservable;
    };
    MapEventsManagerService.prototype.disposeObservable = function (eventRegistration, eventName) {
        eventRegistration.stopper.next(1);
        var registrations = this.eventRegistrations.get(eventName);
        var index = registrations.indexOf(eventRegistration);
        if (index !== -1) {
            registrations.splice(index, 1);
        }
        this.sortRegistrationsByPriority(eventName);
    };
    MapEventsManagerService.prototype.sortRegistrationsByPriority = function (eventName) {
        var registrations = this.eventRegistrations.get(eventName);
        registrations.sort(function (a, b) { return b.priority - a.priority; });
        if (registrations.length === 0) {
            return;
        }
        var currentPriority = registrations[0].priority;
        registrations.forEach(function (registration) {
            registration.isPaused = registration.priority < currentPriority;
        });
    };
    MapEventsManagerService.prototype.createEventRegistration = function (event, modifier, entityType, pickOption, priority) {
        var _this = this;
        var cesiumEventObservable = this.eventBuilder.get(event, modifier);
        var stopper = new Subject();
        var registration = new Registration(undefined, stopper, priority, false);
        var observable;
        observable = cesiumEventObservable
            .filter(function () { return !registration.isPaused; })
            .map(function (movement) { return _this.triggerPick(movement, pickOption); })
            .filter(function (result) { return result.primitives !== null; })
            .map(function (picksAndMovement) { return _this.addEntities(picksAndMovement, entityType, pickOption); })
            .filter(function (result) { return result.entities !== null; })
            .switchMap(function (entitiesAndMovement) { return _this.plonter(entitiesAndMovement, pickOption); })
            .takeUntil(stopper);
        registration.observable = observable;
        return registration;
    };
    MapEventsManagerService.prototype.triggerPick = function (movement, pickOptions) {
        var picks = [];
        switch (pickOptions) {
            case PickOptions.PICK_ONE:
            case PickOptions.PICK_ALL:
                picks = this.scene.drillPick(movement.endPosition);
                picks = picks.length === 0 ? null : picks;
                break;
            case PickOptions.PICK_FIRST:
                var pick = this.scene.pick(movement.endPosition);
                picks = pick === undefined ? null : [pick];
                break;
            case PickOptions.NO_PICK:
                break;
            default:
                break;
        }
        return { movement: movement, primitives: picks };
    };
    MapEventsManagerService.prototype.addEntities = function (picksAndMovement, entityType, pickOption) {
        var entities = [];
        if (pickOption !== PickOptions.NO_PICK) {
            if (entityType) {
                entities = picksAndMovement.primitives.map(function (pick) { return pick.primitive.acEntity; }).filter(function (acEntity) {
                    return acEntity && acEntity instanceof entityType;
                });
            }
            else {
                entities = picksAndMovement.primitives.map(function (pick) { return pick.primitive.acEntity; });
            }
            entities = UtilsService.unique(entities);
            if (entities.length === 0) {
                entities = null;
            }
        }
        return Object.assign(picksAndMovement, { entities: entities });
    };
    MapEventsManagerService.prototype.plonter = function (entitiesAndMovement, pickOption) {
        if (pickOption === PickOptions.PICK_ONE && entitiesAndMovement.entities.length > 1) {
            return this.plonterService.plonterIt(entitiesAndMovement);
        }
        else {
            return Observable.of(entitiesAndMovement);
        }
    };
    MapEventsManagerService.decorators = [
        { type: Injectable },
    ];
    MapEventsManagerService.ctorParameters = function () { return [
        { type: CesiumService, },
        { type: CesiumEventBuilder, },
        { type: PlonterService, },
    ]; };
    return MapEventsManagerService;
}());
var Registration = (function () {
    function Registration(observable, stopper, priority, isPaused) {
        this.observable = observable;
        this.stopper = stopper;
        this.priority = priority;
        this.isPaused = isPaused;
    }
    return Registration;
}());
//# sourceMappingURL=map-events-manager.js.map