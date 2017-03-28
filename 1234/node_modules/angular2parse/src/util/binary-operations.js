export var BinaryOperations = new Map([
    ['==', function (left, right) { return left == right; }],
    ['===', function (left, right) { return left === right; }],
    ['!=', function (left, right) { return left != right; }],
    ['!==', function (left, right) { return left !== right; }],
    ['&&', function (left, right) { return left && right; }],
    ['||', function (left, right) { return left || right; }],
    ['+', function (left, right) { return left + right; }],
    ['-', function (left, right) { return left - right; }],
    ['/', function (left, right) { return left / right; }],
    ['*', function (left, right) { return left * right; }],
    ['%', function (left, right) { return left % right; }],
    ['<', function (left, right) { return left < right; }],
    ['<=', function (left, right) { return left <= right; }],
    ['>', function (left, right) { return left > right; }],
    ['>=', function (left, right) { return left >= right; }],
]);
//# sourceMappingURL=binary-operations.js.map