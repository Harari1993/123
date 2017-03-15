var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Compiler } from "@angular/core";
import { Parser, Lexer } from "../angular/compiler";
import { ParseVisitorResolver, ParseVisitorCompiler } from "../visitors";
var Parse = (function () {
    /**
     * Used to dependency inject the Angular 2 parser.
     */
    function Parse(_compiler) {
        var _this = this;
        this._compiler = _compiler;
        this._parser = new Parser(new Lexer());
        this._pipesCache = new Map();
        this._evalCache = new Map();
        this._calcCache = new Map();
        var compiler = this._compiler;
        var pipeCache = compiler._delegate._metadataResolver._pipeCache;
        pipeCache.forEach(function (pipeMetadata, pipe) { return _this._pipesCache.set(pipeMetadata.name, new pipe()); });
    }
    Parse.prototype.eval = function (expression) {
        var ast = null;
        var visitor = new ParseVisitorCompiler();
        if (this._evalCache.has(expression)) {
            ast = this._evalCache.get(expression);
        }
        else {
            ast = this._parser.parseInterpolation(expression, 'Parse');
            if (!ast) {
                ast = this._parser.parseBinding(expression, 'Parse');
            }
            this._evalCache.set(expression, ast);
        }
        var fnBody = ast.visit(visitor);
        var pipesCache = this._pipesCache;
        var getFn = new Function('context', 'pipesCache', "return " + fnBody + ";");
        return function evalParse(context) {
            return getFn(context, pipesCache);
        };
    };
    Parse.prototype.calc = function (expression) {
        var ast = null;
        var visitor = new ParseVisitorResolver(this._pipesCache);
        if (this._calcCache.has(expression)) {
            ast = this._calcCache.get(expression);
        }
        else {
            ast = this._parser.parseInterpolation(expression, 'Parse');
            if (!ast) {
                ast = this._parser.parseBinding(expression, 'Parse');
            }
            this._calcCache.set(expression, ast);
        }
        return function calcParse(context) {
            return ast.visit(visitor, context);
        };
    };
    return Parse;
}());
Parse = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Compiler])
], Parse);
export { Parse };
//# sourceMappingURL=parse.js.map