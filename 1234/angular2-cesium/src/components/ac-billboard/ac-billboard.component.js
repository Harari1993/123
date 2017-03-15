import { Component, Input } from '@angular/core';
import { BillboardDrawerService } from '../../services/billboard-drawer/billboard-drawer.service';
export var AcBillboardComponent = (function () {
    function AcBillboardComponent(billboardDrawer) {
        this.billboardDrawer = billboardDrawer;
        this.key = Symbol();
    }
    AcBillboardComponent.prototype.ngOnChanges = function (changes) {
        var props = changes['props'];
        if (props.currentValue !== props.previousValue) {
        }
    };
    AcBillboardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ac-billboard',
                    template: ''
                },] },
    ];
    AcBillboardComponent.ctorParameters = function () { return [
        { type: BillboardDrawerService, },
    ]; };
    AcBillboardComponent.propDecorators = {
        'props': [{ type: Input },],
    };
    return AcBillboardComponent;
}());
//# sourceMappingURL=ac-billboard.component.js.map