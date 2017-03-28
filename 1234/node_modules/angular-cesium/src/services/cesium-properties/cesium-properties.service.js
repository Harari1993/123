import { Injectable } from '@angular/core';
import { JsonMapper } from '../json-mapper/json-mapper.service';
import { Parse } from 'angular2parse';
export var CesiumProperties = (function () {
    function CesiumProperties(_parser, _jsonMapper) {
        this._parser = _parser;
        this._jsonMapper = _jsonMapper;
        this._assignersCache = new Map();
        this._evaluatorsCache = new Map();
    }
    CesiumProperties.prototype._compile = function (expression) {
        var _this = this;
        var cesiumDesc = {};
        var propsMap = new Map();
        var resultMap = this._jsonMapper.map(expression);
        resultMap.forEach(function (resultExpression, prop) { return propsMap.set(prop, {
            expression: resultExpression,
            get: _this._parser.eval(resultExpression)
        }); });
        var fnBody = 'const cesiumDesc={};for (let [propName, cesiumProp] of propsMap)cesiumDesc[propName ? ' +
            'propName : \'undefined\'] = cache.get(cesiumProp.expression.toString(), ' +
            '()=>propsMap.get(propName).get(context));return cesiumDesc;';
        var getFn = new Function('propsMap', 'cache', 'context', fnBody);
        return function evaluateCesiumProps(cache, context) {
            return getFn(propsMap, cache, context);
        };
    };
    CesiumProperties.prototype._build = function (expression) {
        var fnBody = "";
        var resultMap = this._jsonMapper.map(expression);
        resultMap.forEach(function (value, prop) { return fnBody += "dst['" + prop + "'] = src['" + prop + "'];"; });
        fnBody += "return dst;";
        var assignFn = new Function('dst', 'src', "" + fnBody);
        return function assignCesiumProps(oldVal, newVal) {
            return assignFn(oldVal, newVal);
        };
    };
    CesiumProperties.prototype.createEvaluator = function (expression) {
        if (this._evaluatorsCache.has(expression)) {
            return this._evaluatorsCache.get(expression);
        }
        var evaluatorFn = this._compile(expression);
        this._evaluatorsCache.set(expression, evaluatorFn);
        return evaluatorFn;
    };
    CesiumProperties.prototype.createAssigner = function (expression) {
        if (this._assignersCache.has(expression)) {
            return this._assignersCache.get(expression);
        }
        var assignFn = this._build(expression);
        this._assignersCache.set(expression, assignFn);
        return assignFn;
    };
    CesiumProperties.prototype.stringifyExpression = function (expression) {
        if (expression[0] === '\'' && expression[expression.length - 1] === '\'') {
            return "`" + expression + "`";
        }
        else {
            return "'" + expression + "'";
        }
    };
    CesiumProperties.decorators = [
        { type: Injectable },
    ];
    CesiumProperties.ctorParameters = function () { return [
        { type: Parse, },
        { type: JsonMapper, },
    ]; };
    return CesiumProperties;
}());
//# sourceMappingURL=cesium-properties.service.js.map