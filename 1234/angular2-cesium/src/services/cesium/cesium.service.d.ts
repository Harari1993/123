import { NgZone } from '@angular/core';
import { ViewerFactory } from '../viewer-factory/viewer-factory.service';
export declare class CesiumService {
    private ngZone;
    private viewerFactory;
    private cesiumViewer;
    constructor(ngZone: NgZone, viewerFactory: ViewerFactory);
    init(mapContainer: HTMLElement): void;
    getViewer(): any;
    getScene(): any;
    getMinimumZoom(): number;
    setMinimumZoom(amount: number): void;
    getMaximumZoom(): number;
    setMaximumZoom(amount: number): void;
    setEnableTilt(isTilt: boolean): void;
    morphTo2D(duration?: number): void;
    morphTo3D(duration?: number): void;
    morphToColumbusView(duration?: number): void;
}
