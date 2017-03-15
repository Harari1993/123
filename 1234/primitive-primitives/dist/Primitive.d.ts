/**
 * This is the default implementation of a primitive, all primitives extend this class.
 */
export declare abstract class Primitive {
    protected _show: boolean;
    protected _modelMatrix: any;
    protected _renderState: any;
    protected _drawCommand: any;
    protected _points: any;
    protected _indicesArray: number[];
    protected _boundingVolume: any;
    protected _dirty: boolean;
    protected _lastMode: any;
    protected _color: number[];
    protected _vertexArray: any;
    protected _shaderProgram: any;
    constructor(options: {
        show?: boolean;
        color?: number[];
    });
    color: number[];
    show: boolean;
    isTranslucent(): boolean;
    protected shouldRender(): boolean;
    protected setupDrawCommand(drawCommand: any, vertexArray: any, primitiveType: any, translucent?: boolean, debugShowBoundingVolume?: boolean): void;
}
