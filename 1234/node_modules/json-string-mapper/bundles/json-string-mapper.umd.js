(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.jsonStringMapper = global.jsonStringMapper || {})));
}(this, (function (exports) { 'use strict';

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

function isPresent(obj) {
    return obj != null;
}
function isBlank(obj) {
    return obj == null;
}


var NumberWrapper = (function () {
    function NumberWrapper() {
    }
    NumberWrapper.parseIntAutoRadix = function (text) {
        var result = parseInt(text);
        if (isNaN(result)) {
            throw new Error('Invalid integer literal when parsing ' + text);
        }
        return result;
    };
    NumberWrapper.isNumeric = function (value) { return !isNaN(value - parseFloat(value)); };
    return NumberWrapper;
}());
// JS has NaN !== NaN






function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ParserError = (function () {
    function ParserError(message, input, errLocation, ctxLocation) {
        this.input = input;
        this.errLocation = errLocation;
        this.ctxLocation = ctxLocation;
        this.message = "Parser Error: " + message + " " + errLocation + " [" + input + "] in " + ctxLocation;
    }
    return ParserError;
}());
var ParseSpan = (function () {
    function ParseSpan(start, end) {
        this.start = start;
        this.end = end;
    }
    return ParseSpan;
}());
var AST = (function () {
    function AST(span) {
        this.span = span;
    }
    AST.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return null;
    };
    AST.prototype.toString = function () { return 'AST'; };
    return AST;
}());
/**
 * Represents a quoted expression of the form:
 *
 * quote = prefix `:` uninterpretedExpression
 * prefix = identifier
 * uninterpretedExpression = arbitrary string
 *
 * A quoted expression is meant to be pre-processed by an AST transformer that
 * converts it into another AST that no longer contains quoted expressions.
 * It is meant to allow third-party developers to extend Angular template
 * expression language. The `uninterpretedExpression` part of the quote is
 * therefore not interpreted by the Angular's own expression parser.
 */
var Quote = (function (_super) {
    __extends(Quote, _super);
    function Quote(span, prefix, uninterpretedExpression, location) {
        var _this = _super.call(this, span) || this;
        _this.prefix = prefix;
        _this.uninterpretedExpression = uninterpretedExpression;
        _this.location = location;
        return _this;
    }
    Quote.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitQuote(this, context);
    };
    Quote.prototype.toString = function () { return 'Quote'; };
    return Quote;
}(AST));
var EmptyExpr = (function (_super) {
    __extends(EmptyExpr, _super);
    function EmptyExpr() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    EmptyExpr.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        // do nothing
    };
    return EmptyExpr;
}(AST));
var ImplicitReceiver = (function (_super) {
    __extends(ImplicitReceiver, _super);
    function ImplicitReceiver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ImplicitReceiver.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitImplicitReceiver(this, context);
    };
    return ImplicitReceiver;
}(AST));
/**
 * Multiple expressions separated by a semicolon.
 */
var Chain = (function (_super) {
    __extends(Chain, _super);
    function Chain(span, expressions) {
        var _this = _super.call(this, span) || this;
        _this.expressions = expressions;
        return _this;
    }
    Chain.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitChain(this, context);
    };
    return Chain;
}(AST));
var Conditional = (function (_super) {
    __extends(Conditional, _super);
    function Conditional(span, condition, trueExp, falseExp) {
        var _this = _super.call(this, span) || this;
        _this.condition = condition;
        _this.trueExp = trueExp;
        _this.falseExp = falseExp;
        return _this;
    }
    Conditional.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitConditional(this, context);
    };
    return Conditional;
}(AST));
var PropertyRead = (function (_super) {
    __extends(PropertyRead, _super);
    function PropertyRead(span, receiver, name) {
        var _this = _super.call(this, span) || this;
        _this.receiver = receiver;
        _this.name = name;
        return _this;
    }
    PropertyRead.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitPropertyRead(this, context);
    };
    return PropertyRead;
}(AST));
var PropertyWrite = (function (_super) {
    __extends(PropertyWrite, _super);
    function PropertyWrite(span, receiver, name, value) {
        var _this = _super.call(this, span) || this;
        _this.receiver = receiver;
        _this.name = name;
        _this.value = value;
        return _this;
    }
    PropertyWrite.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitPropertyWrite(this, context);
    };
    return PropertyWrite;
}(AST));
var SafePropertyRead = (function (_super) {
    __extends(SafePropertyRead, _super);
    function SafePropertyRead(span, receiver, name) {
        var _this = _super.call(this, span) || this;
        _this.receiver = receiver;
        _this.name = name;
        return _this;
    }
    SafePropertyRead.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitSafePropertyRead(this, context);
    };
    return SafePropertyRead;
}(AST));
var KeyedRead = (function (_super) {
    __extends(KeyedRead, _super);
    function KeyedRead(span, obj, key) {
        var _this = _super.call(this, span) || this;
        _this.obj = obj;
        _this.key = key;
        return _this;
    }
    KeyedRead.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitKeyedRead(this, context);
    };
    return KeyedRead;
}(AST));
var KeyedWrite = (function (_super) {
    __extends(KeyedWrite, _super);
    function KeyedWrite(span, obj, key, value) {
        var _this = _super.call(this, span) || this;
        _this.obj = obj;
        _this.key = key;
        _this.value = value;
        return _this;
    }
    KeyedWrite.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitKeyedWrite(this, context);
    };
    return KeyedWrite;
}(AST));
var BindingPipe = (function (_super) {
    __extends(BindingPipe, _super);
    function BindingPipe(span, exp, name, args) {
        var _this = _super.call(this, span) || this;
        _this.exp = exp;
        _this.name = name;
        _this.args = args;
        return _this;
    }
    BindingPipe.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitPipe(this, context);
    };
    return BindingPipe;
}(AST));
var LiteralPrimitive = (function (_super) {
    __extends(LiteralPrimitive, _super);
    function LiteralPrimitive(span, value) {
        var _this = _super.call(this, span) || this;
        _this.value = value;
        return _this;
    }
    LiteralPrimitive.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitLiteralPrimitive(this, context);
    };
    return LiteralPrimitive;
}(AST));
var LiteralArray = (function (_super) {
    __extends(LiteralArray, _super);
    function LiteralArray(span, expressions) {
        var _this = _super.call(this, span) || this;
        _this.expressions = expressions;
        return _this;
    }
    LiteralArray.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitLiteralArray(this, context);
    };
    return LiteralArray;
}(AST));
var LiteralMap = (function (_super) {
    __extends(LiteralMap, _super);
    function LiteralMap(span, keys, values) {
        var _this = _super.call(this, span) || this;
        _this.keys = keys;
        _this.values = values;
        return _this;
    }
    LiteralMap.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitLiteralMap(this, context);
    };
    return LiteralMap;
}(AST));
var Interpolation = (function (_super) {
    __extends(Interpolation, _super);
    function Interpolation(span, strings, expressions) {
        var _this = _super.call(this, span) || this;
        _this.strings = strings;
        _this.expressions = expressions;
        return _this;
    }
    Interpolation.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitInterpolation(this, context);
    };
    return Interpolation;
}(AST));
var Binary = (function (_super) {
    __extends(Binary, _super);
    function Binary(span, operation, left, right) {
        var _this = _super.call(this, span) || this;
        _this.operation = operation;
        _this.left = left;
        _this.right = right;
        return _this;
    }
    Binary.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitBinary(this, context);
    };
    return Binary;
}(AST));
var PrefixNot = (function (_super) {
    __extends(PrefixNot, _super);
    function PrefixNot(span, expression) {
        var _this = _super.call(this, span) || this;
        _this.expression = expression;
        return _this;
    }
    PrefixNot.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitPrefixNot(this, context);
    };
    return PrefixNot;
}(AST));
var MethodCall = (function (_super) {
    __extends(MethodCall, _super);
    function MethodCall(span, receiver, name, args) {
        var _this = _super.call(this, span) || this;
        _this.receiver = receiver;
        _this.name = name;
        _this.args = args;
        return _this;
    }
    MethodCall.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitMethodCall(this, context);
    };
    return MethodCall;
}(AST));
var SafeMethodCall = (function (_super) {
    __extends(SafeMethodCall, _super);
    function SafeMethodCall(span, receiver, name, args) {
        var _this = _super.call(this, span) || this;
        _this.receiver = receiver;
        _this.name = name;
        _this.args = args;
        return _this;
    }
    SafeMethodCall.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitSafeMethodCall(this, context);
    };
    return SafeMethodCall;
}(AST));
var FunctionCall = (function (_super) {
    __extends(FunctionCall, _super);
    function FunctionCall(span, target, args) {
        var _this = _super.call(this, span) || this;
        _this.target = target;
        _this.args = args;
        return _this;
    }
    FunctionCall.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return visitor.visitFunctionCall(this, context);
    };
    return FunctionCall;
}(AST));
var ASTWithSource = (function (_super) {
    __extends(ASTWithSource, _super);
    function ASTWithSource(ast, source, location, errors) {
        var _this = _super.call(this, new ParseSpan(0, isBlank(source) ? 0 : source.length)) || this;
        _this.ast = ast;
        _this.source = source;
        _this.location = location;
        _this.errors = errors;
        return _this;
    }
    ASTWithSource.prototype.visit = function (visitor, context) {
        if (context === void 0) { context = null; }
        return this.ast.visit(visitor, context);
    };
    ASTWithSource.prototype.toString = function () { return this.source + " in " + this.location; };
    return ASTWithSource;
}(AST));
var TemplateBinding = (function () {
    function TemplateBinding(span, key, keyIsVar, name, expression) {
        this.span = span;
        this.key = key;
        this.keyIsVar = keyIsVar;
        this.name = name;
        this.expression = expression;
    }
    return TemplateBinding;
}());
var RecursiveAstVisitor = (function () {
    function RecursiveAstVisitor() {
    }
    RecursiveAstVisitor.prototype.visitBinary = function (ast, context) {
        ast.left.visit(this);
        ast.right.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitChain = function (ast, context) { return this.visitAll(ast.expressions, context); };
    RecursiveAstVisitor.prototype.visitConditional = function (ast, context) {
        ast.condition.visit(this);
        ast.trueExp.visit(this);
        ast.falseExp.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitPipe = function (ast, context) {
        ast.exp.visit(this);
        this.visitAll(ast.args, context);
        return null;
    };
    RecursiveAstVisitor.prototype.visitFunctionCall = function (ast, context) {
        ast.target.visit(this);
        this.visitAll(ast.args, context);
        return null;
    };
    RecursiveAstVisitor.prototype.visitImplicitReceiver = function (ast, context) { return null; };
    RecursiveAstVisitor.prototype.visitInterpolation = function (ast, context) {
        return this.visitAll(ast.expressions, context);
    };
    RecursiveAstVisitor.prototype.visitKeyedRead = function (ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitKeyedWrite = function (ast, context) {
        ast.obj.visit(this);
        ast.key.visit(this);
        ast.value.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitLiteralArray = function (ast, context) {
        return this.visitAll(ast.expressions, context);
    };
    RecursiveAstVisitor.prototype.visitLiteralMap = function (ast, context) { return this.visitAll(ast.values, context); };
    RecursiveAstVisitor.prototype.visitLiteralPrimitive = function (ast, context) { return null; };
    RecursiveAstVisitor.prototype.visitMethodCall = function (ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    };
    RecursiveAstVisitor.prototype.visitPrefixNot = function (ast, context) {
        ast.expression.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitPropertyRead = function (ast, context) {
        ast.receiver.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitPropertyWrite = function (ast, context) {
        ast.receiver.visit(this);
        ast.value.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitSafePropertyRead = function (ast, context) {
        ast.receiver.visit(this);
        return null;
    };
    RecursiveAstVisitor.prototype.visitSafeMethodCall = function (ast, context) {
        ast.receiver.visit(this);
        return this.visitAll(ast.args, context);
    };
    RecursiveAstVisitor.prototype.visitAll = function (asts, context) {
        var _this = this;
        asts.forEach(function (ast) { return ast.visit(_this, context); });
        return null;
    };
    RecursiveAstVisitor.prototype.visitQuote = function (ast, context) { return null; };
    return RecursiveAstVisitor;
}());

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */ var $EOF = 0;
var $TAB = 9;
var $LF = 10;
var $VTAB = 11;
var $FF = 12;
var $CR = 13;
var $SPACE = 32;
var $BANG = 33;
var $DQ = 34;
var $HASH = 35;
var $$ = 36;
var $PERCENT = 37;
var $AMPERSAND = 38;
var $SQ = 39;
var $LPAREN = 40;
var $RPAREN = 41;
var $STAR = 42;
var $PLUS = 43;
var $COMMA = 44;
var $MINUS = 45;
var $PERIOD = 46;
var $SLASH = 47;
var $COLON = 58;
var $SEMICOLON = 59;
var $LT = 60;
var $EQ = 61;
var $GT = 62;
var $QUESTION = 63;
var $0 = 48;
var $9 = 57;
var $A = 65;
var $E = 69;


var $Z = 90;
var $LBRACKET = 91;
var $BACKSLASH = 92;
var $RBRACKET = 93;
var $CARET = 94;
var $_ = 95;
var $a = 97;
var $e = 101;
var $f = 102;
var $n = 110;
var $r = 114;
var $t = 116;
var $u = 117;
var $v = 118;

var $z = 122;
var $LBRACE = 123;
var $BAR = 124;
var $RBRACE = 125;
var $NBSP = 160;



var $BT = 96;
function isWhitespace(code) {
    return (code >= $TAB && code <= $SPACE) || (code == $NBSP);
}
function isDigit(code) {
    return $0 <= code && code <= $9;
}
function isAsciiLetter(code) {
    return code >= $a && code <= $z || code >= $A && code <= $Z;
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var isDevMode = function () { return false; };

var INTERPOLATION_BLACKLIST_REGEXPS = [
    /^\s*$/,
    /[<>]/,
    /^[{}]$/,
    /&(#|[a-z])/i,
    /^\/\//,
];
function assertInterpolationSymbols(identifier, value) {
    if (isPresent(value) && !(Array.isArray(value) && value.length == 2)) {
        throw new Error("Expected '" + identifier + "' to be an array, [start, end].");
    }
    else if (isDevMode() && !isBlank(value)) {
        var start_1 = value[0];
        var end_1 = value[1];
        // black list checking
        INTERPOLATION_BLACKLIST_REGEXPS.forEach(function (regexp) {
            if (regexp.test(start_1) || regexp.test(end_1)) {
                throw new Error("['" + start_1 + "', '" + end_1 + "'] contains unusable interpolation symbol.");
            }
        });
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var InterpolationConfig = (function () {
    function InterpolationConfig(start, end) {
        this.start = start;
        this.end = end;
    }
    InterpolationConfig.fromArray = function (markers) {
        if (!markers) {
            return DEFAULT_INTERPOLATION_CONFIG;
        }
        assertInterpolationSymbols('interpolation', markers);
        return new InterpolationConfig(markers[0], markers[1]);
    };
    
    return InterpolationConfig;
}());
var DEFAULT_INTERPOLATION_CONFIG = new InterpolationConfig('{{', '}}');

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var TokenType;
(function (TokenType) {
    TokenType[TokenType["Character"] = 0] = "Character";
    TokenType[TokenType["Identifier"] = 1] = "Identifier";
    TokenType[TokenType["Keyword"] = 2] = "Keyword";
    TokenType[TokenType["String"] = 3] = "String";
    TokenType[TokenType["Operator"] = 4] = "Operator";
    TokenType[TokenType["Number"] = 5] = "Number";
    TokenType[TokenType["Error"] = 6] = "Error";
})(TokenType || (TokenType = {}));
var KEYWORDS = ['var', 'let', 'null', 'undefined', 'true', 'false', 'if', 'else', 'this'];
var Lexer = (function () {
    function Lexer() {
    }
    Lexer.prototype.tokenize = function (text) {
        var scanner = new _Scanner(text);
        var tokens = [];
        var token = scanner.scanToken();
        while (token != null) {
            tokens.push(token);
            token = scanner.scanToken();
        }
        return tokens;
    };
    return Lexer;
}());
var Token = (function () {
    function Token(index, type, numValue, strValue) {
        this.index = index;
        this.type = type;
        this.numValue = numValue;
        this.strValue = strValue;
    }
    Token.prototype.isCharacter = function (code) {
        return this.type == TokenType.Character && this.numValue == code;
    };
    Token.prototype.isNumber = function () { return this.type == TokenType.Number; };
    Token.prototype.isString = function () { return this.type == TokenType.String; };
    Token.prototype.isOperator = function (operater) {
        return this.type == TokenType.Operator && this.strValue == operater;
    };
    Token.prototype.isIdentifier = function () { return this.type == TokenType.Identifier; };
    Token.prototype.isKeyword = function () { return this.type == TokenType.Keyword; };
    Token.prototype.isKeywordLet = function () { return this.type == TokenType.Keyword && this.strValue == 'let'; };
    Token.prototype.isKeywordNull = function () { return this.type == TokenType.Keyword && this.strValue == 'null'; };
    Token.prototype.isKeywordUndefined = function () {
        return this.type == TokenType.Keyword && this.strValue == 'undefined';
    };
    Token.prototype.isKeywordTrue = function () { return this.type == TokenType.Keyword && this.strValue == 'true'; };
    Token.prototype.isKeywordFalse = function () { return this.type == TokenType.Keyword && this.strValue == 'false'; };
    Token.prototype.isKeywordThis = function () { return this.type == TokenType.Keyword && this.strValue == 'this'; };
    Token.prototype.isError = function () { return this.type == TokenType.Error; };
    Token.prototype.toNumber = function () { return this.type == TokenType.Number ? this.numValue : -1; };
    Token.prototype.toString = function () {
        switch (this.type) {
            case TokenType.Character:
            case TokenType.Identifier:
            case TokenType.Keyword:
            case TokenType.Operator:
            case TokenType.String:
            case TokenType.Error:
                return this.strValue;
            case TokenType.Number:
                return this.numValue.toString();
            default:
                return null;
        }
    };
    return Token;
}());
function newCharacterToken(index, code) {
    return new Token(index, TokenType.Character, code, String.fromCharCode(code));
}
function newIdentifierToken(index, text) {
    return new Token(index, TokenType.Identifier, 0, text);
}
function newKeywordToken(index, text) {
    return new Token(index, TokenType.Keyword, 0, text);
}
function newOperatorToken(index, text) {
    return new Token(index, TokenType.Operator, 0, text);
}
function newStringToken(index, text) {
    return new Token(index, TokenType.String, 0, text);
}
function newNumberToken(index, n) {
    return new Token(index, TokenType.Number, n, '');
}
function newErrorToken(index, message) {
    return new Token(index, TokenType.Error, 0, message);
}
var EOF = new Token(-1, TokenType.Character, 0, '');
var _Scanner = (function () {
    function _Scanner(input) {
        this.input = input;
        this.peek = 0;
        this.index = -1;
        this.length = input.length;
        this.advance();
    }
    _Scanner.prototype.advance = function () {
        this.peek = ++this.index >= this.length ? $EOF : this.input.charCodeAt(this.index);
    };
    _Scanner.prototype.scanToken = function () {
        var input = this.input, length = this.length;
        var peek = this.peek, index = this.index;
        // Skip whitespace.
        while (peek <= $SPACE) {
            if (++index >= length) {
                peek = $EOF;
                break;
            }
            else {
                peek = input.charCodeAt(index);
            }
        }
        this.peek = peek;
        this.index = index;
        if (index >= length) {
            return null;
        }
        // Handle identifiers and numbers.
        if (isIdentifierStart(peek))
            return this.scanIdentifier();
        if (isDigit(peek))
            return this.scanNumber(index);
        var start = index;
        switch (peek) {
            case $PERIOD:
                this.advance();
                return isDigit(this.peek) ? this.scanNumber(start) :
                    newCharacterToken(start, $PERIOD);
            case $LPAREN:
            case $RPAREN:
            case $LBRACE:
            case $RBRACE:
            case $LBRACKET:
            case $RBRACKET:
            case $COMMA:
            case $COLON:
            case $SEMICOLON:
                return this.scanCharacter(start, peek);
            case $SQ:
            case $DQ:
                return this.scanString();
            case $HASH:
            case $PLUS:
            case $MINUS:
            case $STAR:
            case $SLASH:
            case $PERCENT:
            case $CARET:
                return this.scanOperator(start, String.fromCharCode(peek));
            case $QUESTION:
                return this.scanComplexOperator(start, '?', $PERIOD, '.');
            case $LT:
            case $GT:
                return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, '=');
            case $BANG:
            case $EQ:
                return this.scanComplexOperator(start, String.fromCharCode(peek), $EQ, '=', $EQ, '=');
            case $AMPERSAND:
                return this.scanComplexOperator(start, '&', $AMPERSAND, '&');
            case $BAR:
                return this.scanComplexOperator(start, '|', $BAR, '|');
            case $NBSP:
                while (isWhitespace(this.peek))
                    this.advance();
                return this.scanToken();
        }
        this.advance();
        return this.error("Unexpected character [" + String.fromCharCode(peek) + "]", 0);
    };
    _Scanner.prototype.scanCharacter = function (start, code) {
        this.advance();
        return newCharacterToken(start, code);
    };
    _Scanner.prototype.scanOperator = function (start, str) {
        this.advance();
        return newOperatorToken(start, str);
    };
    /**
     * Tokenize a 2/3 char long operator
     *
     * @param start start index in the expression
     * @param one first symbol (always part of the operator)
     * @param twoCode code point for the second symbol
     * @param two second symbol (part of the operator when the second code point matches)
     * @param threeCode code point for the third symbol
     * @param three third symbol (part of the operator when provided and matches source expression)
     * @returns {Token}
     */
    _Scanner.prototype.scanComplexOperator = function (start, one, twoCode, two, threeCode, three) {
        this.advance();
        var str = one;
        if (this.peek == twoCode) {
            this.advance();
            str += two;
        }
        if (threeCode != null && this.peek == threeCode) {
            this.advance();
            str += three;
        }
        return newOperatorToken(start, str);
    };
    _Scanner.prototype.scanIdentifier = function () {
        var start = this.index;
        this.advance();
        while (isIdentifierPart(this.peek))
            this.advance();
        var str = this.input.substring(start, this.index);
        return KEYWORDS.indexOf(str) > -1 ? newKeywordToken(start, str) :
            newIdentifierToken(start, str);
    };
    _Scanner.prototype.scanNumber = function (start) {
        var simple = (this.index === start);
        this.advance(); // Skip initial digit.
        while (true) {
            if (isDigit(this.peek)) {
                // Do nothing.
            }
            else if (this.peek == $PERIOD) {
                simple = false;
            }
            else if (isExponentStart(this.peek)) {
                this.advance();
                if (isExponentSign(this.peek))
                    this.advance();
                if (!isDigit(this.peek))
                    return this.error('Invalid exponent', -1);
                simple = false;
            }
            else {
                break;
            }
            this.advance();
        }
        var str = this.input.substring(start, this.index);
        var value = simple ? NumberWrapper.parseIntAutoRadix(str) : parseFloat(str);
        return newNumberToken(start, value);
    };
    _Scanner.prototype.scanString = function () {
        var start = this.index;
        var quote = this.peek;
        this.advance(); // Skip initial quote.
        var buffer = '';
        var marker = this.index;
        var input = this.input;
        while (this.peek != quote) {
            if (this.peek == $BACKSLASH) {
                buffer += input.substring(marker, this.index);
                this.advance();
                var unescapedCode = void 0;
                // Workaround for TS2.1-introduced type strictness
                this.peek = this.peek;
                if (this.peek == $u) {
                    // 4 character hex code for unicode character.
                    var hex = input.substring(this.index + 1, this.index + 5);
                    if (/^[0-9a-f]+$/i.test(hex)) {
                        unescapedCode = parseInt(hex, 16);
                    }
                    else {
                        return this.error("Invalid unicode escape [\\u" + hex + "]", 0);
                    }
                    for (var i = 0; i < 5; i++) {
                        this.advance();
                    }
                }
                else {
                    unescapedCode = unescape(this.peek);
                    this.advance();
                }
                buffer += String.fromCharCode(unescapedCode);
                marker = this.index;
            }
            else if (this.peek == $EOF) {
                return this.error('Unterminated quote', 0);
            }
            else {
                this.advance();
            }
        }
        var last = input.substring(marker, this.index);
        this.advance(); // Skip terminating quote.
        return newStringToken(start, buffer + last);
    };
    _Scanner.prototype.error = function (message, offset) {
        var position = this.index + offset;
        return newErrorToken(position, "Lexer Error: " + message + " at column " + position + " in expression [" + this.input + "]");
    };
    return _Scanner;
}());
function isIdentifierStart(code) {
    return ($a <= code && code <= $z) || ($A <= code && code <= $Z) ||
        (code == $_) || (code == $$);
}
function isIdentifier(input) {
    if (input.length == 0)
        return false;
    var scanner = new _Scanner(input);
    if (!isIdentifierStart(scanner.peek))
        return false;
    scanner.advance();
    while (scanner.peek !== $EOF) {
        if (!isIdentifierPart(scanner.peek))
            return false;
        scanner.advance();
    }
    return true;
}
function isIdentifierPart(code) {
    return isAsciiLetter(code) || isDigit(code) || (code == $_) ||
        (code == $$);
}
function isExponentStart(code) {
    return code == $e || code == $E;
}
function isExponentSign(code) {
    return code == $MINUS || code == $PLUS;
}
function isQuote(code) {
    return code === $SQ || code === $DQ || code === $BT;
}
function unescape(code) {
    switch (code) {
        case $n:
            return $LF;
        case $f:
            return $FF;
        case $r:
            return $CR;
        case $t:
            return $TAB;
        case $v:
            return $VTAB;
        default:
            return code;
    }
}

/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var SplitInterpolation = (function () {
    function SplitInterpolation(strings, expressions, offsets) {
        this.strings = strings;
        this.expressions = expressions;
        this.offsets = offsets;
    }
    return SplitInterpolation;
}());
var TemplateBindingParseResult = (function () {
    function TemplateBindingParseResult(templateBindings, warnings, errors) {
        this.templateBindings = templateBindings;
        this.warnings = warnings;
        this.errors = errors;
    }
    return TemplateBindingParseResult;
}());
function _createInterpolateRegExp(config) {
    var pattern = escapeRegExp(config.start) + '([\\s\\S]*?)' + escapeRegExp(config.end);
    return new RegExp(pattern, 'g');
}
var Parser = (function () {
    function Parser(_lexer) {
        this._lexer = _lexer;
        this.errors = [];
    }
    Parser.prototype.parseAction = function (input, location, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = DEFAULT_INTERPOLATION_CONFIG; }
        this._checkNoInterpolation(input, location, interpolationConfig);
        var sourceToLex = this._stripComments(input);
        var tokens = this._lexer.tokenize(this._stripComments(input));
        var ast = new _ParseAST(input, location, tokens, sourceToLex.length, true, this.errors, input.length - sourceToLex.length)
            .parseChain();
        return new ASTWithSource(ast, input, location, this.errors);
    };
    Parser.prototype.parseBinding = function (input, location, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = DEFAULT_INTERPOLATION_CONFIG; }
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        return new ASTWithSource(ast, input, location, this.errors);
    };
    Parser.prototype.parseSimpleBinding = function (input, location, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = DEFAULT_INTERPOLATION_CONFIG; }
        var ast = this._parseBindingAst(input, location, interpolationConfig);
        var errors = SimpleExpressionChecker.check(ast);
        if (errors.length > 0) {
            this._reportError("Host binding expression cannot contain " + errors.join(' '), input, location);
        }
        return new ASTWithSource(ast, input, location, this.errors);
    };
    Parser.prototype._reportError = function (message, input, errLocation, ctxLocation) {
        this.errors.push(new ParserError(message, input, errLocation, ctxLocation));
    };
    Parser.prototype._parseBindingAst = function (input, location, interpolationConfig) {
        // Quotes expressions use 3rd-party expression language. We don't want to use
        // our lexer or parser for that, so we check for that ahead of time.
        var quote = this._parseQuote(input, location);
        if (isPresent(quote)) {
            return quote;
        }
        this._checkNoInterpolation(input, location, interpolationConfig);
        var sourceToLex = this._stripComments(input);
        var tokens = this._lexer.tokenize(sourceToLex);
        return new _ParseAST(input, location, tokens, sourceToLex.length, false, this.errors, input.length - sourceToLex.length)
            .parseChain();
    };
    Parser.prototype._parseQuote = function (input, location) {
        if (isBlank(input))
            return null;
        var prefixSeparatorIndex = input.indexOf(':');
        if (prefixSeparatorIndex == -1)
            return null;
        var prefix = input.substring(0, prefixSeparatorIndex).trim();
        if (!isIdentifier(prefix))
            return null;
        var uninterpretedExpression = input.substring(prefixSeparatorIndex + 1);
        return new Quote(new ParseSpan(0, input.length), prefix, uninterpretedExpression, location);
    };
    Parser.prototype.parseTemplateBindings = function (prefixToken, input, location) {
        var tokens = this._lexer.tokenize(input);
        if (prefixToken) {
            // Prefix the tokens with the tokens from prefixToken but have them take no space (0 index).
            var prefixTokens = this._lexer.tokenize(prefixToken).map(function (t) {
                t.index = 0;
                return t;
            });
            tokens.unshift.apply(tokens, prefixTokens);
        }
        return new _ParseAST(input, location, tokens, input.length, false, this.errors, 0)
            .parseTemplateBindings();
    };
    Parser.prototype.parseInterpolation = function (input, location, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = DEFAULT_INTERPOLATION_CONFIG; }
        var split = this.splitInterpolation(input, location, interpolationConfig);
        if (split == null)
            return null;
        var expressions = [];
        for (var i = 0; i < split.expressions.length; ++i) {
            var expressionText = split.expressions[i];
            var sourceToLex = this._stripComments(expressionText);
            var tokens = this._lexer.tokenize(this._stripComments(split.expressions[i]));
            var ast = new _ParseAST(input, location, tokens, sourceToLex.length, false, this.errors, split.offsets[i] + (expressionText.length - sourceToLex.length))
                .parseChain();
            expressions.push(ast);
        }
        return new ASTWithSource(new Interpolation(new ParseSpan(0, isBlank(input) ? 0 : input.length), split.strings, expressions), input, location, this.errors);
    };
    Parser.prototype.splitInterpolation = function (input, location, interpolationConfig) {
        if (interpolationConfig === void 0) { interpolationConfig = DEFAULT_INTERPOLATION_CONFIG; }
        var regexp = _createInterpolateRegExp(interpolationConfig);
        var parts = input.split(regexp);
        if (parts.length <= 1) {
            return null;
        }
        var strings = [];
        var expressions = [];
        var offsets = [];
        var offset = 0;
        for (var i = 0; i < parts.length; i++) {
            var part = parts[i];
            if (i % 2 === 0) {
                // fixed string
                strings.push(part);
                offset += part.length;
            }
            else if (part.trim().length > 0) {
                offset += interpolationConfig.start.length;
                expressions.push(part);
                offsets.push(offset);
                offset += part.length + interpolationConfig.end.length;
            }
            else {
                this._reportError('Blank expressions are not allowed in interpolated strings', input, "at column " + this._findInterpolationErrorColumn(parts, i, interpolationConfig) + " in", location);
                expressions.push('$implict');
                offsets.push(offset);
            }
        }
        return new SplitInterpolation(strings, expressions, offsets);
    };
    Parser.prototype.wrapLiteralPrimitive = function (input, location) {
        return new ASTWithSource(new LiteralPrimitive(new ParseSpan(0, isBlank(input) ? 0 : input.length), input), input, location, this.errors);
    };
    Parser.prototype._stripComments = function (input) {
        var i = this._commentStart(input);
        return isPresent(i) ? input.substring(0, i).trim() : input;
    };
    Parser.prototype._commentStart = function (input) {
        var outerQuote = null;
        for (var i = 0; i < input.length - 1; i++) {
            var char = input.charCodeAt(i);
            var nextChar = input.charCodeAt(i + 1);
            if (char === $SLASH && nextChar == $SLASH && isBlank(outerQuote))
                return i;
            if (outerQuote === char) {
                outerQuote = null;
            }
            else if (isBlank(outerQuote) && isQuote(char)) {
                outerQuote = char;
            }
        }
        return null;
    };
    Parser.prototype._checkNoInterpolation = function (input, location, interpolationConfig) {
        var regexp = _createInterpolateRegExp(interpolationConfig);
        var parts = input.split(regexp);
        if (parts.length > 1) {
            this._reportError("Got interpolation (" + interpolationConfig.start + interpolationConfig.end + ") where expression was expected", input, "at column " + this._findInterpolationErrorColumn(parts, 1, interpolationConfig) + " in", location);
        }
    };
    Parser.prototype._findInterpolationErrorColumn = function (parts, partInErrIdx, interpolationConfig) {
        var errLocation = '';
        for (var j = 0; j < partInErrIdx; j++) {
            errLocation += j % 2 === 0 ?
                parts[j] :
                "" + interpolationConfig.start + parts[j] + interpolationConfig.end;
        }
        return errLocation.length;
    };
    return Parser;
}());
var _ParseAST = (function () {
    function _ParseAST(input, location, tokens, inputLength, parseAction, errors, offset) {
        this.input = input;
        this.location = location;
        this.tokens = tokens;
        this.inputLength = inputLength;
        this.parseAction = parseAction;
        this.errors = errors;
        this.offset = offset;
        this.rparensExpected = 0;
        this.rbracketsExpected = 0;
        this.rbracesExpected = 0;
        this.index = 0;
    }
    _ParseAST.prototype.peek = function (offset) {
        var i = this.index + offset;
        return i < this.tokens.length ? this.tokens[i] : EOF;
    };
    Object.defineProperty(_ParseAST.prototype, "next", {
        get: function () { return this.peek(0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(_ParseAST.prototype, "inputIndex", {
        get: function () {
            return (this.index < this.tokens.length) ? this.next.index + this.offset :
                this.inputLength + this.offset;
        },
        enumerable: true,
        configurable: true
    });
    _ParseAST.prototype.span = function (start) { return new ParseSpan(start, this.inputIndex); };
    _ParseAST.prototype.advance = function () { this.index++; };
    _ParseAST.prototype.optionalCharacter = function (code) {
        if (this.next.isCharacter(code)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    };
    _ParseAST.prototype.peekKeywordLet = function () { return this.next.isKeywordLet(); };
    _ParseAST.prototype.expectCharacter = function (code) {
        if (this.optionalCharacter(code))
            return;
        this.error("Missing expected " + String.fromCharCode(code));
    };
    _ParseAST.prototype.optionalOperator = function (op) {
        if (this.next.isOperator(op)) {
            this.advance();
            return true;
        }
        else {
            return false;
        }
    };
    _ParseAST.prototype.expectOperator = function (operator) {
        if (this.optionalOperator(operator))
            return;
        this.error("Missing expected operator " + operator);
    };
    _ParseAST.prototype.expectIdentifierOrKeyword = function () {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword()) {
            this.error("Unexpected token " + n + ", expected identifier or keyword");
            return '';
        }
        this.advance();
        return n.toString();
    };
    _ParseAST.prototype.expectIdentifierOrKeywordOrString = function () {
        var n = this.next;
        if (!n.isIdentifier() && !n.isKeyword() && !n.isString()) {
            this.error("Unexpected token " + n + ", expected identifier, keyword, or string");
            return '';
        }
        this.advance();
        return n.toString();
    };
    _ParseAST.prototype.parseChain = function () {
        var exprs = [];
        var start = this.inputIndex;
        while (this.index < this.tokens.length) {
            var expr = this.parsePipe();
            exprs.push(expr);
            if (this.optionalCharacter($SEMICOLON)) {
                if (!this.parseAction) {
                    this.error('Binding expression cannot contain chained expression');
                }
                while (this.optionalCharacter($SEMICOLON)) {
                } // read all semicolons
            }
            else if (this.index < this.tokens.length) {
                this.error("Unexpected token '" + this.next + "'");
            }
        }
        if (exprs.length == 0)
            return new EmptyExpr(this.span(start));
        if (exprs.length == 1)
            return exprs[0];
        return new Chain(this.span(start), exprs);
    };
    _ParseAST.prototype.parsePipe = function () {
        var result = this.parseExpression();
        if (this.optionalOperator('|')) {
            if (this.parseAction) {
                this.error('Cannot have a pipe in an action expression');
            }
            do {
                var name_1 = this.expectIdentifierOrKeyword();
                var args = [];
                while (this.optionalCharacter($COLON)) {
                    args.push(this.parseExpression());
                }
                result = new BindingPipe(this.span(result.span.start), result, name_1, args);
            } while (this.optionalOperator('|'));
        }
        return result;
    };
    _ParseAST.prototype.parseExpression = function () { return this.parseConditional(); };
    _ParseAST.prototype.parseConditional = function () {
        var start = this.inputIndex;
        var result = this.parseLogicalOr();
        if (this.optionalOperator('?')) {
            var yes = this.parsePipe();
            var no = void 0;
            if (!this.optionalCharacter($COLON)) {
                var end = this.inputIndex;
                var expression = this.input.substring(start, end);
                this.error("Conditional expression " + expression + " requires all 3 expressions");
                no = new EmptyExpr(this.span(start));
            }
            else {
                no = this.parsePipe();
            }
            return new Conditional(this.span(start), result, yes, no);
        }
        else {
            return result;
        }
    };
    _ParseAST.prototype.parseLogicalOr = function () {
        // '||'
        var result = this.parseLogicalAnd();
        while (this.optionalOperator('||')) {
            var right = this.parseLogicalAnd();
            result = new Binary(this.span(result.span.start), '||', result, right);
        }
        return result;
    };
    _ParseAST.prototype.parseLogicalAnd = function () {
        // '&&'
        var result = this.parseEquality();
        while (this.optionalOperator('&&')) {
            var right = this.parseEquality();
            result = new Binary(this.span(result.span.start), '&&', result, right);
        }
        return result;
    };
    _ParseAST.prototype.parseEquality = function () {
        // '==','!=','===','!=='
        var result = this.parseRelational();
        while (this.next.type == TokenType.Operator) {
            var operator = this.next.strValue;
            switch (operator) {
                case '==':
                case '===':
                case '!=':
                case '!==':
                    this.advance();
                    var right = this.parseRelational();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    };
    _ParseAST.prototype.parseRelational = function () {
        // '<', '>', '<=', '>='
        var result = this.parseAdditive();
        while (this.next.type == TokenType.Operator) {
            var operator = this.next.strValue;
            switch (operator) {
                case '<':
                case '>':
                case '<=':
                case '>=':
                    this.advance();
                    var right = this.parseAdditive();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    };
    _ParseAST.prototype.parseAdditive = function () {
        // '+', '-'
        var result = this.parseMultiplicative();
        while (this.next.type == TokenType.Operator) {
            var operator = this.next.strValue;
            switch (operator) {
                case '+':
                case '-':
                    this.advance();
                    var right = this.parseMultiplicative();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    };
    _ParseAST.prototype.parseMultiplicative = function () {
        // '*', '%', '/'
        var result = this.parsePrefix();
        while (this.next.type == TokenType.Operator) {
            var operator = this.next.strValue;
            switch (operator) {
                case '*':
                case '%':
                case '/':
                    this.advance();
                    var right = this.parsePrefix();
                    result = new Binary(this.span(result.span.start), operator, result, right);
                    continue;
            }
            break;
        }
        return result;
    };
    _ParseAST.prototype.parsePrefix = function () {
        if (this.next.type == TokenType.Operator) {
            var start = this.inputIndex;
            var operator = this.next.strValue;
            var result = void 0;
            switch (operator) {
                case '+':
                    this.advance();
                    return this.parsePrefix();
                case '-':
                    this.advance();
                    result = this.parsePrefix();
                    return new Binary(this.span(start), operator, new LiteralPrimitive(new ParseSpan(start, start), 0), result);
                case '!':
                    this.advance();
                    result = this.parsePrefix();
                    return new PrefixNot(this.span(start), result);
            }
        }
        return this.parseCallChain();
    };
    _ParseAST.prototype.parseCallChain = function () {
        var result = this.parsePrimary();
        while (true) {
            if (this.optionalCharacter($PERIOD)) {
                result = this.parseAccessMemberOrMethodCall(result, false);
            }
            else if (this.optionalOperator('?.')) {
                result = this.parseAccessMemberOrMethodCall(result, true);
            }
            else if (this.optionalCharacter($LBRACKET)) {
                this.rbracketsExpected++;
                var key = this.parsePipe();
                this.rbracketsExpected--;
                this.expectCharacter($RBRACKET);
                if (this.optionalOperator('=')) {
                    var value = this.parseConditional();
                    result = new KeyedWrite(this.span(result.span.start), result, key, value);
                }
                else {
                    result = new KeyedRead(this.span(result.span.start), result, key);
                }
            }
            else if (this.optionalCharacter($LPAREN)) {
                this.rparensExpected++;
                var args = this.parseCallArguments();
                this.rparensExpected--;
                this.expectCharacter($RPAREN);
                result = new FunctionCall(this.span(result.span.start), result, args);
            }
            else {
                return result;
            }
        }
    };
    _ParseAST.prototype.parsePrimary = function () {
        var start = this.inputIndex;
        if (this.optionalCharacter($LPAREN)) {
            this.rparensExpected++;
            var result = this.parsePipe();
            this.rparensExpected--;
            this.expectCharacter($RPAREN);
            return result;
        }
        else if (this.next.isKeywordNull()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), null);
        }
        else if (this.next.isKeywordUndefined()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), void 0);
        }
        else if (this.next.isKeywordTrue()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), true);
        }
        else if (this.next.isKeywordFalse()) {
            this.advance();
            return new LiteralPrimitive(this.span(start), false);
        }
        else if (this.next.isKeywordThis()) {
            this.advance();
            return new ImplicitReceiver(this.span(start));
        }
        else if (this.optionalCharacter($LBRACKET)) {
            this.rbracketsExpected++;
            var elements = this.parseExpressionList($RBRACKET);
            this.rbracketsExpected--;
            this.expectCharacter($RBRACKET);
            return new LiteralArray(this.span(start), elements);
        }
        else if (this.next.isCharacter($LBRACE)) {
            return this.parseLiteralMap();
        }
        else if (this.next.isIdentifier()) {
            return this.parseAccessMemberOrMethodCall(new ImplicitReceiver(this.span(start)), false);
        }
        else if (this.next.isNumber()) {
            var value = this.next.toNumber();
            this.advance();
            return new LiteralPrimitive(this.span(start), value);
        }
        else if (this.next.isString()) {
            var literalValue = this.next.toString();
            this.advance();
            return new LiteralPrimitive(this.span(start), literalValue);
        }
        else if (this.index >= this.tokens.length) {
            this.error("Unexpected end of expression: " + this.input);
            return new EmptyExpr(this.span(start));
        }
        else {
            this.error("Unexpected token " + this.next);
            return new EmptyExpr(this.span(start));
        }
    };
    _ParseAST.prototype.parseExpressionList = function (terminator) {
        var result = [];
        if (!this.next.isCharacter(terminator)) {
            do {
                result.push(this.parsePipe());
            } while (this.optionalCharacter($COMMA));
        }
        return result;
    };
    _ParseAST.prototype.parseLiteralMap = function () {
        var keys = [];
        var values = [];
        var start = this.inputIndex;
        this.expectCharacter($LBRACE);
        if (!this.optionalCharacter($RBRACE)) {
            this.rbracesExpected++;
            do {
                var key = this.expectIdentifierOrKeywordOrString();
                keys.push(key);
                this.expectCharacter($COLON);
                values.push(this.parsePipe());
            } while (this.optionalCharacter($COMMA));
            this.rbracesExpected--;
            this.expectCharacter($RBRACE);
        }
        return new LiteralMap(this.span(start), keys, values);
    };
    _ParseAST.prototype.parseAccessMemberOrMethodCall = function (receiver, isSafe) {
        if (isSafe === void 0) { isSafe = false; }
        var start = receiver.span.start;
        var id = this.expectIdentifierOrKeyword();
        if (this.optionalCharacter($LPAREN)) {
            this.rparensExpected++;
            var args = this.parseCallArguments();
            this.expectCharacter($RPAREN);
            this.rparensExpected--;
            var span = this.span(start);
            return isSafe ? new SafeMethodCall(span, receiver, id, args) :
                new MethodCall(span, receiver, id, args);
        }
        else {
            if (isSafe) {
                if (this.optionalOperator('=')) {
                    this.error('The \'?.\' operator cannot be used in the assignment');
                    return new EmptyExpr(this.span(start));
                }
                else {
                    return new SafePropertyRead(this.span(start), receiver, id);
                }
            }
            else {
                if (this.optionalOperator('=')) {
                    if (!this.parseAction) {
                        this.error('Bindings cannot contain assignments');
                        return new EmptyExpr(this.span(start));
                    }
                    var value = this.parseConditional();
                    return new PropertyWrite(this.span(start), receiver, id, value);
                }
                else {
                    return new PropertyRead(this.span(start), receiver, id);
                }
            }
        }
    };
    _ParseAST.prototype.parseCallArguments = function () {
        if (this.next.isCharacter($RPAREN))
            return [];
        var positionals = [];
        do {
            positionals.push(this.parsePipe());
        } while (this.optionalCharacter($COMMA));
        return positionals;
    };
    /**
     * An identifier, a keyword, a string with an optional `-` inbetween.
     */
    _ParseAST.prototype.expectTemplateBindingKey = function () {
        var result = '';
        var operatorFound = false;
        do {
            result += this.expectIdentifierOrKeywordOrString();
            operatorFound = this.optionalOperator('-');
            if (operatorFound) {
                result += '-';
            }
        } while (operatorFound);
        return result.toString();
    };
    _ParseAST.prototype.parseTemplateBindings = function () {
        var bindings = [];
        var prefix = null;
        var warnings = [];
        while (this.index < this.tokens.length) {
            var start = this.inputIndex;
            var keyIsVar = this.peekKeywordLet();
            if (keyIsVar) {
                this.advance();
            }
            var key = this.expectTemplateBindingKey();
            if (!keyIsVar) {
                if (prefix == null) {
                    prefix = key;
                }
                else {
                    key = prefix + key[0].toUpperCase() + key.substring(1);
                }
            }
            this.optionalCharacter($COLON);
            var name_2 = null;
            var expression = null;
            if (keyIsVar) {
                if (this.optionalOperator('=')) {
                    name_2 = this.expectTemplateBindingKey();
                }
                else {
                    name_2 = '\$implicit';
                }
            }
            else if (this.next !== EOF && !this.peekKeywordLet()) {
                var start_1 = this.inputIndex;
                var ast = this.parsePipe();
                var source = this.input.substring(start_1 - this.offset, this.inputIndex - this.offset);
                expression = new ASTWithSource(ast, source, this.location, this.errors);
            }
            bindings.push(new TemplateBinding(this.span(start), key, keyIsVar, name_2, expression));
            if (!this.optionalCharacter($SEMICOLON)) {
                this.optionalCharacter($COMMA);
            }
        }
        return new TemplateBindingParseResult(bindings, warnings, this.errors);
    };
    _ParseAST.prototype.error = function (message, index) {
        if (index === void 0) { index = null; }
        this.errors.push(new ParserError(message, this.input, this.locationText(index), this.location));
        this.skip();
    };
    _ParseAST.prototype.locationText = function (index) {
        if (index === void 0) { index = null; }
        if (isBlank(index))
            index = this.index;
        return (index < this.tokens.length) ? "at column " + (this.tokens[index].index + 1) + " in" :
            "at the end of the expression";
    };
    // Error recovery should skip tokens until it encounters a recovery point. skip() treats
    // the end of input and a ';' as unconditionally a recovery point. It also treats ')',
    // '}' and ']' as conditional recovery points if one of calling productions is expecting
    // one of these symbols. This allows skip() to recover from errors such as '(a.) + 1' allowing
    // more of the AST to be retained (it doesn't skip any tokens as the ')' is retained because
    // of the '(' begins an '(' <expr> ')' production). The recovery points of grouping symbols
    // must be conditional as they must be skipped if none of the calling productions are not
    // expecting the closing token else we will never make progress in the case of an
    // extraneous group closing symbol (such as a stray ')'). This is not the case for ';' because
    // parseChain() is always the root production and it expects a ';'.
    // If a production expects one of these token it increments the corresponding nesting count,
    // and then decrements it just prior to checking if the token is in the input.
    _ParseAST.prototype.skip = function () {
        var n = this.next;
        while (this.index < this.tokens.length && !n.isCharacter($SEMICOLON) &&
            (this.rparensExpected <= 0 || !n.isCharacter($RPAREN)) &&
            (this.rbracesExpected <= 0 || !n.isCharacter($RBRACE)) &&
            (this.rbracketsExpected <= 0 || !n.isCharacter($RBRACKET))) {
            if (this.next.isError()) {
                this.errors.push(new ParserError(this.next.toString(), this.input, this.locationText(), this.location));
            }
            this.advance();
            n = this.next;
        }
    };
    return _ParseAST;
}());
var SimpleExpressionChecker = (function () {
    function SimpleExpressionChecker() {
        this.errors = [];
    }
    SimpleExpressionChecker.check = function (ast) {
        var s = new SimpleExpressionChecker();
        ast.visit(s);
        return s.errors;
    };
    SimpleExpressionChecker.prototype.visitImplicitReceiver = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitInterpolation = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitLiteralPrimitive = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitPropertyRead = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitPropertyWrite = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitSafePropertyRead = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitMethodCall = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitSafeMethodCall = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitFunctionCall = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitLiteralArray = function (ast, context) { this.visitAll(ast.expressions); };
    SimpleExpressionChecker.prototype.visitLiteralMap = function (ast, context) { this.visitAll(ast.values); };
    SimpleExpressionChecker.prototype.visitBinary = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitPrefixNot = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitConditional = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitPipe = function (ast, context) { this.errors.push('pipes'); };
    SimpleExpressionChecker.prototype.visitKeyedRead = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitKeyedWrite = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitAll = function (asts) {
        var _this = this;
        return asts.map(function (node) { return node.visit(_this); });
    };
    SimpleExpressionChecker.prototype.visitChain = function (ast, context) { };
    SimpleExpressionChecker.prototype.visitQuote = function (ast, context) { };
    return SimpleExpressionChecker;
}());

function compileToJSON(json) {
    return JSON.stringify(json).replace(/"/g, '');
}

var __extends$1 = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var JsonStringMapperVisitor = (function (_super) {
    __extends$1(JsonStringMapperVisitor, _super);
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
        return compileToJSON(this.visitAll(ast.expressions));
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
        return compileToJSON(this.visitAll(ast.expressions));
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
        return compileToJSON(result);
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

exports.JsonStringMapper = JsonStringMapper;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=json-string-mapper.umd.js.map
