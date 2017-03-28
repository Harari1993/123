import { Compiler } from "@angular/core";
export declare class Parse {
    private _compiler;
    private _parser;
    private _pipesCache;
    private _evalCache;
    private _calcCache;
    /**
     * Used to dependency inject the Angular 2 parser.
     */
    constructor(_compiler: Compiler);
    eval(expression: string): Function;
    calc(expression: string): Function;
}
