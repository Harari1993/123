import { UpdateablePrimitive } from './UpdateablePrimitive';
import { Primitive } from './Primitive';
/**
 * EllipsePrimitive is implemented to be as minimal as possible.
 * Both border and fill are ON by default and you will need to disable them.
 * Both color and border color are just an array of 4 floats from 0 to 1 in the RGBA format, currently we do not support materials.
 */
export declare class EllipsePrimitive extends Primitive implements UpdateablePrimitive {
    private _center;
    private _semiMajor;
    private _semiMinor;
    private _rotation;
    private _granularity;
    private _showBorder;
    private _showFill;
    private _borderDrawCommand;
    private _borderIndicesArray;
    private _borderColor;
    private _borderVertexArray;
    /**
     * The ellipse constructor requires an ellipse center point a semiMinor and semiMajor, these are used to calculate the ellipses position and thus mandatory.
     * @param options The ellipses options.
     * @param options.center The ellipses center point in 3D space.
     * @param options.semiMajorAxis The ellipses big radius.
     * @param options.semiMinorAxis The ellipses small radius.
     * @param options.rotation The ellipses rotation, defaults to 0.
     * @param options.border Defines whether we should render the border, defaults to true.
     * @param options.fill Defines whether we should render the fill, defaults to true.
     * @param options.show Defines whether we should render the ellipse, defaults to true.
     * @param options.granularity The angular distance between points on the ellipse in radians, smaller values for smooter ellipses, bigger values for better performence, defaults to 0.3.
     */
    constructor(options: {
        center: any;
        semiMajorAxis: number;
        semiMinorAxis: number;
        rotation?: number;
        border?: boolean;
        fill?: boolean;
        show?: boolean;
        color?: number[];
        borderColor?: number[];
        granularity?: number;
    });
    /**
     * @returns {Cesium.Cartesian3} - Cesium.Cartesian3
     */
    /**
     * @param value a Cesium.Cartesian3 value.
     */
    center: any;
    color: number[];
    borderColor: number[];
    show: boolean;
    showBorder: boolean;
    showFill: boolean;
    private points;
    /**
     * This will update the location of the ellipse for the next render, If any parameter is not defined in the data param it will default to the allready defined value.
     *
     * @param data
     */
    updateLocationData(data: {
        center?;
        semiMajorAxis?: number;
        semiMinorAxis?: number;
        rotation?: number;
    }): void;
    /**
     * This is a Cesium only function it is called once each tick of the render engine, do NOT call it!
     * @param frameState
     */
    update(frameState: any): void;
    /**
     * This is a cesium only function, cesium calles it when the user removes the primitive from a primitive collection.
     */
    destroy(): void;
    protected shouldRender(): boolean;
    private createBorderVertexArray(context, frameState);
    private createVertexArray(context, frameState);
    private setupShaderProgram(context);
    private setupRenderState();
    private calculatePoints();
    private createBorderIndexBuffer(context);
    private createBoundingVolume();
    private createIndexBuffer(context);
    private static createBorderIndicesArray(size);
    private static createIndicesArray(length);
}
