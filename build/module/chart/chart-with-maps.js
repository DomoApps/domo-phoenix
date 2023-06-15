"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
var map_definitions_1 = require("./map-definitions");
var chart_1 = require("./chart");
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    function Chart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Chart.prototype._getMapDefinition = function (type) {
        return (0, map_definitions_1._getMapDefinition)(type);
    };
    return Chart;
}(chart_1.Chart));
exports.Chart = Chart;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtd2l0aC1tYXBzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NoYXJ0L2NoYXJ0LXdpdGgtbWFwcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxxREFBdUU7QUFDdkUsaUNBQTZDO0FBRzdDO0lBQTJCLHlCQUFTO0lBQXBDOztJQUlBLENBQUM7SUFIVyxpQ0FBaUIsR0FBM0IsVUFBNEIsSUFBZ0I7UUFDMUMsT0FBTyxJQUFBLG1DQUFhLEVBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUNILFlBQUM7QUFBRCxDQUFDLEFBSkQsQ0FBMkIsYUFBUyxHQUluQztBQUpZLHNCQUFLIn0=