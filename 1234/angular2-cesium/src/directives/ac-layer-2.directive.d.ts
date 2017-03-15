import { Observable } from 'rxjs';
import { LayerService } from '../services/layer-service/layer-service.service';
import { TemplateRef, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
export declare class LayerData {
    entity: Object;
    $implicit: any;
    constructor(entity?: Object, $implicit?: any);
}
export declare class AcLayer2Directive {
    private templateRef;
    private viewContainerRef;
    private changeDetector;
    private layerService;
    private _observable;
    acLayer2Of: Observable<any>;
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, changeDetector: ChangeDetectorRef, layerService: LayerService);
}
