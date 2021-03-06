var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Observable } from 'rxjs';
export var DisposableObservable = (function (_super) {
    __extends(DisposableObservable, _super);
    function DisposableObservable() {
        _super.apply(this, arguments);
    }
    return DisposableObservable;
}(Observable));
//# sourceMappingURL=disposable-observable.js.map