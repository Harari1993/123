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
import { RecursiveAstVisitor } from '../../angular/compiler/ast';
import * as util from "../../util/lang";
var JsonStringMapperVisitor = (function (_super) {
    __extends(JsonStringMapperVisitor, _super);
    function JsonStringMapperVisitor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JsonStringMapperVisitor.prototype._handleMethodArgs = function (args) {
        if (!args) {
            return "";
        }
        var result = "";
        for (var i = 0, length_1 = args.length; i < length_1; i++) {
            if (i === (length_1 - 1)) {
                result += "" + args[i];
            }
            else {
                result += args[i] + ", ";
            }
        }
        return result;
    };
    JsonStringMapperVisitor.prototype._handlePipeArgs = function (args) {
        if (!args) {
            return "";
        }
        var result = "";
        for (var _i = 0, args_1 = args; _i < args_1.length; _i++) {
            var arg = args_1[_i];
            result += " : " + arg;
        }
        return result;
    };
    JsonStringMapperVisitor.prototype.visitBinary = function (ast) {
        var left = ast.left.visit(this);
        var right = ast.right.visit(this);
        return left + " " + ast.operation + " " + right;
    };
    // TODO
    JsonStringMapperVisitor.prototype.visitChain = function (ast) {
        return util.compileToJSON(this.visitAll(ast.expressions));
    };
    JsonStringMapperVisitor.prototype.visitConditional = function (ast) {
        var condition = ast.condition.visit(this);
        var trueExp = ast.trueExp.visit(this);
        var falseExp = ast.falseExp.visit(this);
        return condition + " ? " + trueExp + " : " + falseExp;
    };
    JsonStringMapperVisitor.prototype.visitPipe = function (ast) {
        var pipe = ast.name;
        var value = ast.exp.visit(this);
        var args = this._handlePipeArgs(this.visitAll(ast.args));
        return value + " | " + pipe + args;
    };
    // TODO
    JsonStringMapperVisitor.prototype.visitFunctionCall = function (ast) {
        var target = ast.target.visit(this);
        var args = this._handleMethodArgs(this.visitAll(ast.args));
        return target + "(" + args + ")";
    };
    JsonStringMapperVisitor.prototype.visitImplicitReceiver = function (ast) {
        return "";
    };
    JsonStringMapperVisitor.prototype.visitInterpolation = function (ast) {
        return "{{" + this.visitAll(ast.expressions)[0] + "}}";
    };
    JsonStringMapperVisitor.prototype.visitKeyedRead = function (ast) {
        var obj = ast.obj.visit(this);
        var key = ast.key.visit(this);
        return obj + "[" + key + "]";
    };
    JsonStringMapperVisitor.prototype.visitKeyedWrite = function (ast) {
        return null;
    };
    JsonStringMapperVisitor.prototype.visitLiteralArray = function (ast) {
        return util.compileToJSON(this.visitAll(ast.expressions));
    };
    JsonStringMapperVisitor.prototype.visitLiteralMap = function (ast, firstCall) {
        var result = {};
        var keys = ast.keys;
        var values = this.visitAll(ast.values);
        for (var i = 0, length_2 = keys.length; i < length_2; i++) {
            var value = values[i];
            if (typeof value !== 'string' && firstCall) {
                value = "" + value;
            }
            result[keys[i]] = value;
        }
        if (firstCall) {
            return result;
        }
        return util.compileToJSON(result);
    };
    JsonStringMapperVisitor.prototype.visitLiteralPrimitive = function (ast) {
        return typeof ast.value === 'string' ? "'" + ast.value + "'" : ast.value;
    };
    JsonStringMapperVisitor.prototype.visitMethodCall = function (ast) {
        var methodName = ast.name;
        var receiver = ast.receiver.visit(this);
        var args = this._handleMethodArgs(this.visitAll(ast.args));
        return "" + (receiver ? receiver + '.' : receiver) + methodName + "(" + args + ")";
    };
    JsonStringMapperVisitor.prototype.visitPrefixNot = function (ast) {
        return ast.expression.visit(this);
    };
    JsonStringMapperVisitor.prototype.visitPropertyRead = function (ast) {
        var property = ast.name;
        var receiver = ast.receiver.visit(this);
        return "" + (receiver ? receiver + '.' : receiver) + property;
    };
    JsonStringMapperVisitor.prototype.visitPropertyWrite = function (ast) {
        return null;
    };
    JsonStringMapperVisitor.prototype.visitSafePropertyRead = function (ast) {
        var property = ast.name;
        var receiver = ast.receiver.visit(this);
        return "" + (receiver ? receiver + '.' : receiver) + property;
    };
    JsonStringMapperVisitor.prototype.visitSafeMethodCall = function (ast) {
        var methodName = ast.name;
        var receiver = ast.receiver.visit(this);
        var args = this._handleMethodArgs(this.visitAll(ast.args));
        return "" + (receiver ? receiver + '.' : receiver) + methodName + "(" + args + ")";
    };
    JsonStringMapperVisitor.prototype.visitAll = function (asts) {
        var _this = this;
        return asts.map(function (ast) { return ast.visit(_this); });
    };
    JsonStringMapperVisitor.prototype.visitQuote = function (ast) {
        return null;
    };
    return JsonStringMapperVisitor;
}(RecursiveAstVisitor));
export { JsonStringMapperVisitor };

//# sourceMappingURL=json-string-mapper-visitor.js.map
