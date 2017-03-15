import { EventEmitter } from '@angular/core';
import { AcEntity } from '../../models/ac-entity';
import { Subject } from 'rxjs';
import { EventResult } from '../map-events-mananger/map-events-manager';
export declare class PlonterService {
    private _plonterShown;
    private _entitesToPlonter;
    private _plonterObserver;
    private _eventResult;
    private _plonterChangeNotifier;
    constructor();
    readonly plonterChangeNotifier: EventEmitter<any>;
    readonly plonterShown: boolean;
    readonly entitesToPlonter: AcEntity[];
    plonterIt(eventResult: EventResult): Subject<EventResult>;
    resolvePlonter(entity: AcEntity): void;
}
