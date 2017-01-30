// http://stackoverflow.com/questions/36158848/what-is-the-best-way-to-declare-a-global-variable-in-angular-2-typescript
/**
*
* global variables..
*
*/

import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	selectedDataverse = "";
	selectedDataset = "";
}
