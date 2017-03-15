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
import * as util from "../../util/lang";
import { BinaryOperations } from "../../util/binary-operations";
var ParseVisitorResolver = (function (_super) {
    __extends(ParseVisitorResolver, _super);
    function ParseVisitorResolver(pipes) {
        var _this = _super.call(this) || this;
        _this.pipes = pipes;
        return _this;
    }
    ;
    ParseVisitorResolver.prototype.visitBinary = function (ast, context) {
        var execFn = BinaryOperations.get(ast.operation);
        if (!execFn) {
            throw new Error("Parse ERROR: on visitBinary, unknown operator " + ast.operation);
        }
        return execFn(ast.left.visit(this, context), ast.right.visit(this, context));
    };
    // TODO
    ParseVisitorResolver.prototype.visitChain = function (ast, context) {
        return this.visitAll(ast.expressions, context);
    };
    ParseVisitorResolver.prototype.visitConditional = function (ast, context) {
        if (ast.condition.visit(this, context)) {
            return ast.trueExp.visit(this, context);
        }
        else if (util.isPresent(ast.falseExp)) {
            return ast.falseExp.visit(this, context);
        }
        return null;
    };
    ParseVisitorResolver.prototype.visitPipe = function (ast, context) {
        var pipe = this.pipes.get(ast.name);
        if (!pipe) {
            throw new Error("pipe " + ast.name + " not found.");
        }
        if (!pipe.transform) {
            throw new Error("Parse ERROR: on visitPipe, transform method doesn't exist on pipe " + ast.name + ".");
        }
        var value = ast.exp.visit(this, context);
        var pipeArgs = this.visitAll(ast.args, context);
        pipeArgs.unshift(value);
        return pipe.transform.apply(null, pipeArgs);
    };
    // TODO
    ParseVisitorResolver.prototype.visitFunctionCall = function (ast, context) {
        var target = ast.target.visit(this, context);
        if (!util.isFunction(target)) {
            throw new Error("Parse ERROR: on visitFunctionCall, target is not a function.");
        }
        var args = this.visitAll(ast.args, context);
        return target.apply(null, args);
    };
    ParseVisitorResolver.prototype.visitImplicitReceiver = function (ast, context) {
        return context;
    };
    ParseVisitorResolver.prototype.visitInterpolation = function (ast, context) {
        return this.visitAll(ast.expressions, context)[0];
    };
    ParseVisitorResolver.prototype.visitKeyedRead = function (ast, context) {
        var obj = ast.obj.visit(this, context);
        var key = ast.key.visit(this, context);
        return obj[key];
    };
    ParseVisitorResolver.prototype.visitKeyedWrite = function (ast, context) {
        var obj = ast.obj.visit(this, context);
        var key = ast.key.visit(this, context);
        var value = ast.value.visit(this, context);
        obj[key] = value;
        return null;
    };
    ParseVisitorResolver.prototype.visitLiteralArray = function (ast, context) {
        return this.visitAll(ast.expressions, context);
    };
    ParseVisitorResolver.prototype.visitLiteralMap = function (ast, context) {
        var result = {};
        var keys = ast.keys;
        var values = this.visitAll(ast.values, context);
        for (var i = 0, length_1 = keys.length; i < length_1; i++) {
            result[keys[i]] = values[i];
        }
        return result;
    };
    ParseVisitorResolver.prototype.visitLiteralPrimitive = function (ast, context) {
        return ast.value;
    };
    ParseVisitorResolver.prototype.visitMethodCall = function (ast, context) {
        var receiver = ast.receiver.visit(this, context);
        if (!util.isJsObject(receiver)) {
            throw new Error("Parse ERROR: on visitMethodCall, invalid method receiver.");
        }
        var method = receiver[ast.name];
        if (!util.isFunction(method)) {
            throw new Error("Parse ERROR: on visitMethodCall, method " + ast.name + " doesn't exist on receiver.");
        }
        var args = this.visitAll(ast.args, context);
        return method.apply(receiver, args);
    };
    ParseVisitorResolver.prototype.visitPrefixNot = function (ast, context) {
        return ast.expression.visit(this, context);
    };
    ParseVisitorResolver.prototype.visitPropertyRead = function (ast, context) {
        var receiver = ast.receiver.visit(this, context);
        if (!util.isJsObject(receiver)) {
            throw new Error("Parse ERROR: on visitPropertyRead, invalid property receiver.");
        }
        return receiver[ast.name];
    };
    ParseVisitorResolver.prototype.visitPropertyWrite = function (ast, context) {
        var receiver = ast.receiver.visit(this, context);
        if (!util.isJsObject(receiver)) {
            throw new Error("Parse ERROR: on visitPropertyRead, invalid property receiver.");
        }
        receiver[ast.name] = ast.value.visit(this, context);
        return null;
    };
    ParseVisitorResolver.prototype.visitSafePropertyRead = function (ast, context) {
        var receiver = ast.receiver.visit(this, context);
        if (!util.isJsObject(receiver)) {
            throw new Error("Parse ERROR: on visitSafePropertyRead, invalid property receiver.");
        }
        return receiver[ast.name];
    };
    ParseVisitorResolver.prototype.visitSafeMethodCall = function (ast, context) {
        var receiver = ast.receiver.visit(this, context);
        if (!util.isJsObject(receiver)) {
            throw new Error("Parse ERROR: on visitSafeMethodCall, invalid method receiver.");
        }
        var method = receiver[ast.name];
        if (!util.isFunction(method)) {
            throw new Error("Parse ERROR: on visitSafeMethodCall, method " + ast.name + " doesn't exist on receiver.");
        }
        var args = this.visitAll(ast.args, context);
        return method.apply(receiver, args);
    };
    ParseVisitorResolver.prototype.visitAll = function (asts, context) {
        var _this = this;
        return asts.map(function (ast) { return ast.visit(_this, context); });
    };
    ParseVisitorResolver.prototype.visitQuote = function (ast, context) {
        throw new Error("Parse ERROR: on visitQuote, quote expression not allowed.");
    };
    return ParseVisitorResolver;
}(RecursiveAstVisitor));
export { ParseVisitorResolver };
//# sourceMappingURL=parse-visitor-resolver.js.map