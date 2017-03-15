import { CesiumService } from '../cesium/cesium.service';
import { CesiumEventBuilder } from './cesium-event-builder';
import { EventRegistrationInput } from './event-registration-input';
import { DisposableObservable } from './disposable-observable';
import { PlonterService } from '../plonter/plonter.service';
export declare class MapEventsManagerService {
    private eventBuilder;
    private plonterService;
    private scene;
    private eventRegistrations;
    constructor(cesiumService: CesiumService, eventBuilder: CesiumEventBuilder, plonterService: PlonterService);
    register(input: EventRegistrationInput): DisposableObservable<EventResult>;
    private disposeObservable(eventRegistration, eventName);
    private sortRegistrationsByPriority(eventName);
    private createEventRegistration(event, modifier, entityType, pickOption, priority);
    private triggerPick(movement, pickOptions);
    private addEntities(picksAndMovement, entityType, pickOption);
    private plonter(entitiesAndMovement, pickOption);
}
export interface EventResult {
    movement: any;
    primitives: any[];
    entities: any[];
}
