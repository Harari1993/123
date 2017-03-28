export var AcEntity = (function () {
    function AcEntity() {
    }
    AcEntity.create = function (json) {
        if (json) {
            return Object.assign(new AcEntity(), json);
        }
        return new AcEntity();
    };
    return AcEntity;
}());
//# sourceMappingURL=ac-entity.js.map