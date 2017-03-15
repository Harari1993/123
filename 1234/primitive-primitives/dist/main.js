(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

"use strict";
"use strict";
function to2D(frameState, points) {
    var unpacked = [];
    var repacked = [];
    Cesium.Cartesian3.unpackArray(points, unpacked);
    Cesium.Cartesian3.packArray(unpacked.map(function (p) { return Cesium.SceneTransforms.computeActualWgs84Position(frameState, p); }), repacked);
    return repacked;
}
exports.to2D = to2D;
function createSimpleIndicesArray(size) {
    var indicesArray = [];
    for (var i = 0; i < size; i++) {
        indicesArray.push(i);
    }
    return new Uint16Array(indicesArray);
}
exports.createSimpleIndicesArray = createSimpleIndicesArray;
function isTranslucent(color) {
    return color[3] < 1.0;
}
exports.isTranslucent = isTranslucent;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var EllipsePrimitive_1 = __webpack_require__(2);
exports.EllipsePrimitive = EllipsePrimitive_1.EllipsePrimitive;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Util_1 = __webpack_require__(0);
var Primitive_1 = __webpack_require__(3);
var defaultVs = __webpack_require__(5);
var defaultFs = __webpack_require__(4);
/**
 * EllipsePrimitive is implemented to be as minimal as possible.
 * Both border and fill are ON by default and you will need to disable them.
 * Both color and border color are just an array of 4 floats from 0 to 1 in the RGBA format, currently we do not support materials.
 */
var EllipsePrimitive = (function (_super) {
    __extends(EllipsePrimitive, _super);
    /**
     * The ellipse constructor requires an ellipse center point a semiMinor and semiMajor, these are used to calculate the ellipses position and thus mandatory.
     * @param options The ellipses options.
     * @param options.center The ellipses center point in 3D space.
     * @param options.semiMajorAxis The ellipses big radius.
     * @param options.semiMinorAxis The ellipses small radius.
     * @param options.rotation The ellipses rotation, defaults to 0.
     * @param options.border an Object containing show:a boolean and style: a string that indicates the border style(solid/dashed) default: {show:true, style:solid}
     * @param options.fill Defines whether we should render the fill, defaults to true.
     * @param options.show Defines whether we should render the ellipse, defaults to true.
     * @param options.granularity The angular distance between points on the ellipse in radians, smaller values for smooter ellipses, bigger values for better performence, defaults to 0.3.
     */
    function EllipsePrimitive(options) {
        _super.call(this, options);
        this._center = Cesium.Cartesian3.clone(options.center);
        this._semiMajor = options.semiMajorAxis;
        this._semiMinor = options.semiMinorAxis;
        this._rotation = options.rotation || 0;
        this._border = Cesium.defaultValue(options.border, { show: true, style: 'solid' });
        this._showFill = Cesium.defaultValue(options.fill, true);
        this._borderColor = options.borderColor || [0.0, 0.0, 0.0, 1.0];
        this._granularity = options.granularity || 0.3;
        this._borderDrawCommand = new Cesium.DrawCommand({ owner: this });
        this.calculatePoints();
    }
    Object.defineProperty(EllipsePrimitive.prototype, "center", {
        /**
         * @returns {Cesium.Cartesian3} - Cesium.Cartesian3
         */
        get: function () {
            return this._center;
        },
        /**
         * @param value a Cesium.Cartesian3 value.
         */
        set: function (value) {
            if (this._center !== value) {
                this._center = value;
                this._dirty = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "borderColor", {
        get: function () {
            return this._borderColor;
        },
        set: function (value) {
            this._borderColor = value;
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            this._show = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "border", {
        get: function () {
            return this._border;
        },
        set: function (value) {
            this._border = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "showFill", {
        get: function () {
            return this._showFill;
        },
        set: function (value) {
            this._showFill = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EllipsePrimitive.prototype, "points", {
        set: function (value) {
            if (!this._borderIndicesArray || (this._points && this._points.outerPositions && this._points.outerPositions.length !== value.outerPositions.length)) {
                this._borderIndicesArray = EllipsePrimitive.createBorderIndicesArray(value.outerPositions.length / 3);
            }
            if (!this._indicesArray || (this._points && this._points.positions && this._points.positions.length !== value.positions.length)) {
                this._indicesArray = EllipsePrimitive.createIndicesArray(value.innerPoints.length / 3);
            }
            this._points = value;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This will update the location of the ellipse for the next render, If any parameter is not defined in the data param it will default to the allready defined value.
     *
     * @param data
     */
    EllipsePrimitive.prototype.updateLocationData = function (data) {
        this.center = data.center || this._center;
        this.calculatePoints();
        this.createBoundingVolume();
    };
    /**
     * This is a Cesium only function it is called once each tick of the render engine, do NOT call it!
     * @param frameState
     */
    EllipsePrimitive.prototype.update = function (frameState) {
        if (!this.shouldRender()) {
            return;
        }
        if (frameState.mode !== this._lastMode) {
            this._dirty = true;
        }
        var context = frameState.context;
        this.setupRenderState();
        this.setupShaderProgram(context);
        if (this._border) {
            this._borderVertexArray = (this._dirty || !this._borderVertexArray) ? this.createBorderVertexArray(context, frameState) : this._borderVertexArray;
            this.setupDrawCommand(this._borderDrawCommand, this._borderVertexArray, EllipsePrimitive.borderStyleToPrimitiveType[this._border.style], Util_1.isTranslucent(this._borderColor));
            frameState.commandList.push(this._borderDrawCommand);
        }
        if (this._showFill) {
            this._vertexArray = (this._dirty || !this._vertexArray) ? this.createVertexArray(context, frameState) : this._vertexArray;
            this.setupDrawCommand(this._drawCommand, this._vertexArray, Cesium.PrimitiveType.TRIANGLE_FAN, this.isTranslucent());
            frameState.commandList.push(this._drawCommand);
        }
        this._dirty = false;
        this._lastMode = frameState.mode;
    };
    /**
     * This is a cesium only function, cesium calles it when the user removes the primitive from a primitive collection.
     */
    EllipsePrimitive.prototype.destroy = function () {
        this._shaderProgram.destroy();
        this._vertexArray.destroy();
        this._borderVertexArray.destroy();
    };
    EllipsePrimitive.prototype.shouldRender = function () {
        return _super.prototype.shouldRender.call(this) && (this._showFill || this._border.show);
    };
    EllipsePrimitive.prototype.createBorderVertexArray = function (context, frameState) {
        var points = frameState.mode === Cesium.SceneMode.SCENE_3D ? this._points.outerPositions : Util_1.to2D(frameState, this._points.outerPositions);
        var vertexBuffer = Cesium.Buffer.createVertexBuffer({
            context: context,
            typedArray: new Float32Array(points),
            usage: Cesium.BufferUsage.STATIC_DRAW
        });
        var attributes = [
            {
                index: 0,
                enabled: true,
                vertexBuffer: vertexBuffer,
                componentsPerAttribute: 3,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: false,
                offsetInBytes: 0,
                strideInBytes: 0
            },
            {
                index: 1,
                enabled: true,
                value: this._borderColor,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: false,
                offsetInBytes: 0,
                strideInBytes: 0
            }
        ];
        return new Cesium.VertexArray({
            context: context,
            attributes: attributes,
            indexBuffer: this.createBorderIndexBuffer(context)
        });
    };
    EllipsePrimitive.prototype.createVertexArray = function (context, frameState) {
        var points = frameState.mode === Cesium.SceneMode.SCENE_3D ? this._points.innerPoints : Util_1.to2D(frameState, this._points.innerPoints);
        var vertexBuffer = Cesium.Buffer.createVertexBuffer({
            context: context,
            typedArray: new Float32Array(points),
            usage: Cesium.BufferUsage.STATIC_DRAW
        });
        var attributes = [
            {
                index: 0,
                enabled: true,
                vertexBuffer: vertexBuffer,
                componentsPerAttribute: 3,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: false,
                offsetInBytes: 0,
                strideInBytes: 0
            },
            {
                index: 1,
                enabled: true,
                value: this._color,
                componentsPerAttribute: 4,
                componentDatatype: Cesium.ComponentDatatype.FLOAT,
                normalize: false,
                offsetInBytes: 0,
                strideInBytes: 0
            }
        ];
        return new Cesium.VertexArray({
            context: context,
            attributes: attributes,
            indexBuffer: this.createIndexBuffer(context)
        });
    };
    EllipsePrimitive.prototype.setupShaderProgram = function (context) {
        this._shaderProgram = this._shaderProgram || Cesium.ShaderProgram.replaceCache({
            context: context,
            shaderProgram: this._shaderProgram,
            vertexShaderSource: defaultVs,
            fragmentShaderSource: defaultFs
        });
    };
    EllipsePrimitive.prototype.setupRenderState = function () {
        this._renderState = Cesium.RenderState.fromCache({
            cull: {
                enabled: true,
                face: Cesium.CullFace.BACK
            },
            depthTest: {
                enabled: false
            },
            depthMask: true,
            blending: this.isTranslucent() || Util_1.isTranslucent(this._borderColor) ? { enabled: true } : undefined
        });
    };
    EllipsePrimitive.prototype.calculatePoints = function () {
        var points = Cesium.EllipseGeometryLibrary.computeEllipsePositions({
            center: this._center,
            rotation: this._rotation,
            semiMajorAxis: this._semiMajor,
            semiMinorAxis: this._semiMinor,
            granularity: this._granularity
        }, false, true);
        points.innerPoints = Cesium.Cartesian3.pack(this._center, []).concat(points.outerPositions);
        this.points = points;
    };
    EllipsePrimitive.prototype.createBorderIndexBuffer = function (context) {
        return Cesium.Buffer.createIndexBuffer({
            context: context,
            typedArray: this._borderIndicesArray,
            usage: Cesium.BufferUsage.STATIC_DRAW,
            indexDatatype: Cesium.IndexDatatype.UNSIGNED_SHORT
        });
    };
    EllipsePrimitive.prototype.createBoundingVolume = function () {
        this._boundingVolume = new Cesium.BoundingSphere(this._center, this._semiMajor);
    };
    EllipsePrimitive.prototype.createIndexBuffer = function (context) {
        return Cesium.Buffer.createIndexBuffer({
            context: context,
            typedArray: new Uint16Array(this._indicesArray),
            usage: Cesium.BufferUsage.STATIC_DRAW,
            indexDatatype: Cesium.IndexDatatype.UNSIGNED_SHORT
        });
    };
    EllipsePrimitive.createBorderIndicesArray = function (size) {
        return Util_1.createSimpleIndicesArray(size);
    };
    EllipsePrimitive.createIndicesArray = function (length) {
        var indices = [];
        for (var i = 2; i < length; i++) {
            indices.push(0, i - 1, i);
        }
        indices.push(0, length - 1, 1);
        return indices;
    };
    EllipsePrimitive.borderStyleToPrimitiveType = {
        solid: Cesium.PrimitiveType.LINE_LOOP,
        dashed: Cesium.PrimitiveType.LINES
    };
    return EllipsePrimitive;
}(Primitive_1.Primitive));
exports.EllipsePrimitive = EllipsePrimitive;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Util_1 = __webpack_require__(0);
/**
 * This is the default implementation of a primitive, all primitives extend this class.
 */
var Primitive = (function () {
    function Primitive(options) {
        this._dirty = true;
        this._show = Cesium.defaultValue(options.show, true);
        this._color = options.color || [0.0, 0.0, 0.0, 1.0];
        this._modelMatrix = Cesium.Matrix4.clone(Cesium.Matrix4.IDENTITY);
        this._drawCommand = new Cesium.DrawCommand({ owner: this });
    }
    Object.defineProperty(Primitive.prototype, "color", {
        get: function () {
            return this._color;
        },
        set: function (value) {
            this._color = value;
            this._dirty = true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Primitive.prototype, "show", {
        get: function () {
            return this._show;
        },
        set: function (value) {
            this._show = value;
        },
        enumerable: true,
        configurable: true
    });
    Primitive.prototype.isTranslucent = function () {
        return Util_1.isTranslucent(this._color);
    };
    Primitive.prototype.shouldRender = function () {
        return this._show;
    };
    Primitive.prototype.setupDrawCommand = function (drawCommand, vertexArray, primitiveType, translucent, debugShowBoundingVolume) {
        if (translucent === void 0) { translucent = false; }
        if (debugShowBoundingVolume === void 0) { debugShowBoundingVolume = false; }
        drawCommand.modelMatrix = this._modelMatrix;
        drawCommand.renderState = this._renderState;
        drawCommand.shaderProgram = this._shaderProgram;
        drawCommand.boundingVolume = this._boundingVolume;
        drawCommand.pass = translucent ? Cesium.Pass.TRANSLUCENT : Cesium.Pass.OPAQUE;
        drawCommand.debugShowBoundingVolume = debugShowBoundingVolume;
        drawCommand.primitiveType = primitiveType;
        drawCommand.vertexArray = vertexArray;
    };
    return Primitive;
}());
exports.Primitive = Primitive;


/***/ },
/* 4 */
/***/ function(module, exports) {

module.exports = "varying vec4 v_color;\r\nvoid main()\r\n{\r\n    gl_FragColor = v_color;\r\n}\r\n"

/***/ },
/* 5 */
/***/ function(module, exports) {

module.exports = "attribute vec3 position;\r\nattribute vec4 color;\r\nvarying vec4 v_color;\r\n\r\nvoid main() {\r\n    gl_Position = czm_modelViewProjection * vec4(position, 1.0);\r\n    v_color = color;\r\n}"

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__(1));


/***/ }
/******/ ])
});
;
//# sourceMappingURL=main.js.map