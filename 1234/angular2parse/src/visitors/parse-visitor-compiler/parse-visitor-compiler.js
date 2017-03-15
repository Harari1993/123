var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { RecursiveAstVisitor } from "../../angular/compiler";
import { compileToJSON } from "../../util/lang";
var ParseVisitorCompiler = (function (_super) {
    __extends(ParseVisitorCompiler, _super);
    function ParseVisitorCompiler() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ParseVisitorCompiler.prototype.visitBinary = function (ast) {
        var left = ast.left.visit(this);
        var right = ast.right.visit(this);
        return left + " " + ast.operation + " " + right;
    };
    // TODO
    ParseVisitorCompiler.prototype.visitChain = function (ast) {
        return compileToJSON(this.visitAll(ast.expressions));
    };
    ParseVisitorCompiler.prototype.visitConditional = function (ast) {
        var condition = ast.condition.visit(this);
        var trueExp = ast.trueExp.visit(this);
        var falseExp = ast.falseExp.visit(this);
        return condition + " ? " + trueExp + " : " + falseExp;
    };
    ParseVisitorCompiler.prototype.visitPipe = function (ast) {
        var pipe = ast.name;
        var args = this.visitAll(ast.args);
        var value = ast.exp.visit(this);
        args.unshift(value);
        return "pipesCache.get('" + pipe + "').transform.apply(null, " + compileToJSON(args) + ")";
    };
    // TODO
    ParseVisitorCompiler.prototype.visitFunctionCall = function (ast) {
        var target = ast.target.visit(this);
        var args = compileToJSON(this.visitAll(ast.args));
        return target + ".apply(null, " + args + ")";
    };
    ParseVisitorCompiler.prototype.visitImplicitReceiver = function (ast) {
        return "context";
    };
    ParseVisitorCompiler.prototype.visitInterpolation = function (ast) {
        return this.visitAll(ast.expressions)[0];
    };
    ParseVisitorCompiler.prototype.visitKeyedRead = function (ast) {
        var obj = ast.obj.visit(this);
        var key = ast.key.visit(this);
        return obj + "[" + key + "]";
    };
    ParseVisitorCompiler.prototype.visitKeyedWrite = function (ast) {
        return null;
    };
    ParseVisitorCompiler.prototype.visitLiteralArray = function (ast) {
        return compileToJSON(this.visitAll(ast.expressions));
    };
    ParseVisitorCompiler.prototype.visitLiteralMap = function (ast) {
        var result = {};
        var keys = ast.keys;
        var values = this.visitAll(ast.values);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            result[keys[i]] = values[i];
        }
        return compileToJSON(result);
    };
    ParseVisitorCompiler.prototype.visitLiteralPrimitive = function (ast) {
        return typeof ast.value === 'string' ? "" + ast.value : ast.value;
    };
    ParseVisitorCompiler.prototype.visitMethodCall = function (ast) {
        var methodName = ast.name;
        var receiver = ast.receiver.visit(this);
        var args = compileToJSON(this.visitAll(ast.args));
        return receiver + "['" + methodName + "'].apply(null, " + args + ")";
    };
    ParseVisitorCompiler.prototype.visitPrefixNot = function (ast) {
        return ast.expression.visit(this);
    };
    ParseVisitorCompiler.prototype.visitPropertyRead = function (ast) {
        var property = ast.name;
        var receiver = ast.receiver.visit(this);
        return receiver + "['" + property + "']";
    };
    ParseVisitorCompiler.prototype.visitPropertyWrite = function (ast) {
        return null;
    };
    ParseVisitorCompiler.prototype.visitSafePropertyRead = function (ast) {
        var property = ast.name;
        var receiver = ast.receiver.visit(this);
        return receiver + "['" + property + "']";
    };
    ParseVisitorCompiler.prototype.visitSafeMethodCall = function (ast) {
        var methodName = ast.name;
        var receiver = ast.receiver.visit(this);
        var args = compileToJSON(this.visitAll(ast.args));
        return receiver + "['" + methodName + "'].apply(null, " + args + ")";
    };
    ParseVisitorCompiler.prototype.visitAll = function (asts) {
        var _this = this;
        return asts.map(function (ast) { return ast.visit(_this); });
    };
    ParseVisitorCompiler.prototype.visitQuote = function (ast) {
        return null;
    };
    return ParseVisitorCompiler;
}(RecursiveAstVisitor));
export { ParseVisitorCompiler };
//# sourceMappingURL=parse-visitor-compiler.js.map