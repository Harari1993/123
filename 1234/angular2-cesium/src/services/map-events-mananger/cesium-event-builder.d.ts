import { ConnectableObservable } from 'rxjs';
import { CesiumService } from '../cesium/cesium.service';
import { CesiumEvent } from './consts/cesium-event.enum';
import { CesiumEventModifier } from './consts/cesium-event-modifier.enum';
export declare class CesiumEventBuilder {
    static longPressEvents: Set<CesiumEvent>;
    private eventsHandler;
    private cesiumEventsObservables;
    constructor(cesiumService: CesiumService);
    get(event: CesiumEvent, modifier?: CesiumEventModifier): ConnectableObservable<any>;
    static getEventFullName(event: CesiumEvent, modifier?: CesiumEventModifier): string;
    private createCesiumEventObservable(event, modifier?);
    private createSpecialCesiumEventObservable(event, modifier);
}
