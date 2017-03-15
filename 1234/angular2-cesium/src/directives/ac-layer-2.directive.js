import { LayerService } from '../services/layer-service/layer-service.service';
import { Directive, TemplateRef, ViewContainerRef, ChangeDetectorRef, Input } from '@angular/core';
export var LayerData = (function () {
    function LayerData(entity, $implicit) {
        if (entity === void 0) { entity = null; }
        if ($implicit === void 0) { $implicit = null; }
        this.entity = entity;
        this.$implicit = $implicit;
    }
    return LayerData;
}());
export var AcLayer2Directive = (function () {
    function AcLayer2Directive(templateRef, viewContainerRef, changeDetector, layerService) {
        this.templateRef = templateRef;
        this.viewContainerRef = viewContainerRef;
        this.changeDetector = changeDetector;
        this.layerService = layerService;
    }
    Object.defineProperty(AcLayer2Directive.prototype, "acLayer2Of", {
        set: function (observable) {
            var _this = this;
            if (this._observable) {
                return;
            }
            var view = null;
            this._observable = observable;
            var context = new LayerData();
            observable.subscribe(function (data) {
                if (!view) {
                    view = _this.viewContainerRef.createEmbeddedView(_this.templateRef, context);
                }
                context.$implicit = data;
                context.entity = data.entity;
                _this.changeDetector.detectChanges();
            });
        },
        enumerable: true,
        configurable: true
    });
    AcLayer2Directive.decorators = [
        { type: Directive, args: [{
                    selector: '[acLayer2]'
                },] },
    ];
    AcLayer2Directive.ctorParameters = function () { return [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
        { type: ChangeDetectorRef, },
        { type: LayerService, },
    ]; };
    AcLayer2Directive.propDecorators = {
        'acLayer2Of': [{ type: Input },],
    };
    return AcLayer2Directive;
}());
//# sourceMappingURL=ac-layer-2.directive.js.map