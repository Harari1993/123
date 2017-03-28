import { Injectable } from '@angular/core';
export var LayerService = (function () {
    function LayerService() {
        this.descriptions = [];
    }
    LayerService.prototype.registerDescription = function (descriptionComponent) {
        this.descriptions.push(descriptionComponent);
    };
    LayerService.prototype.getDescriptions = function () {
        return this.descriptions;
    };
    LayerService.decorators = [
        { type: Injectable },
    ];
    LayerService.ctorParameters = function () { return []; };
    return LayerService;
}());
//# sourceMappingURL=layer-service.service.js.map