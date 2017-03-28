import { Parser, Lexer } from '../angular/compiler';
import { LiteralMap } from '../angular/compiler';
import { JsonStringMapperVisitor } from "../visitors/json-string-mapper-visitor/json-string-mapper-visitor";
var JsonStringMapper = (function () {
    function JsonStringMapper() {
        this._parser = new Parser(new Lexer());
        this._cache = new Map();
    }
    JsonStringMapper.prototype.map = function (expression) {
        var ast = null;
        var visitor = new JsonStringMapperVisitor();
        if (this._cache.has(expression)) {
            ast = this._cache.get(expression);
        }
        else {
            ast = this._parser.parseInterpolation(expression, 'JsonMapper');
            if (ast) {
                throw new Error("JsonMapperVisitor ERROR: given expression must be json expression.");
            }
            else {
                ast = this._parser.parseBinding(expression, 'Parse');
            }
            if (!(ast.ast instanceof LiteralMap)) {
                throw new Error("JsonMapper ERROR: given expression must be json expression.");
            }
            this._cache.set(expression, ast);
        }
        var jsonMap = new Map();
        var resultObj = ast.visit(visitor, true);
        var keys = Object.keys(resultObj);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            jsonMap.set(keys[i], resultObj[keys[i]]);
        }
        return jsonMap;
    };
    return JsonStringMapper;
}());
export { JsonStringMapper };

//# sourceMappingURL=json-string-mapper.js.map
