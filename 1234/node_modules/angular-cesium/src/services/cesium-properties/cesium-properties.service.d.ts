import { JsonMapper } from '../json-mapper/json-mapper.service';
import { Parse } from 'angular2parse';
export declare class CesiumProperties {
    private _parser;
    private _jsonMapper;
    private _assignersCache;
    private _evaluatorsCache;
    constructor(_parser: Parse, _jsonMapper: JsonMapper);
    _compile(expression: string): Function;
    _build(expression: string): Function;
    createEvaluator(expression: string): Function;
    createAssigner(expression: string): Function;
    stringifyExpression(expression: string): string;
}
