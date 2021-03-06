import { OnChanges, SimpleChanges } from '@angular/core';
import { BillboardDrawerService } from '../../services/billboard-drawer/billboard-drawer.service';
export declare class AcBillboardComponent implements OnChanges {
    private billboardDrawer;
    props: Object;
    private key;
    constructor(billboardDrawer: BillboardDrawerService);
    ngOnChanges(changes: SimpleChanges): void;
}
