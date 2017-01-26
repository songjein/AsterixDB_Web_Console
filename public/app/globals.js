// http://stackoverflow.com/questions/36158848/what-is-the-best-way-to-declare-a-global-variable-in-angular-2-typescript
/**
*
* global variables..
*
*/
"use strict";
var core_1 = require('@angular/core');
core_1.Injectable();
var Globals = (function () {
    function Globals() {
        this.selectedDataverse = "";
        this.selectedDataset = "";
        this.isTableDrawed = false;
    }
    return Globals;
}());
exports.Globals = Globals;
//# sourceMappingURL=globals.js.map