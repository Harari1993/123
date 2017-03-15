import { OnInit, ElementRef } from '@angular/core';
import { CesiumService } from '../../services/cesium/cesium.service';
export declare class AcMapComponent implements OnInit {
    private _cesiumService;
    private _elemRef;
    private document;
    private static readonly DEFAULT_MINIMUM_ZOOM;
    private static readonly DEFAULT_MAXIMUM_ZOOM;
    private static readonly DEFAULT_TILT_ENABLE;
    minimumZoom: number;
    maximumZoom: number;
    enableTilt: boolean;
    constructor(_cesiumService: CesiumService, _elemRef: ElementRef, document: any);
    ngOnInit(): void;
}
