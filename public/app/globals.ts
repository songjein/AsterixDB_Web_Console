/**
*
* global variables..
* these will be shared by components as a service
*
* ref) http://stackoverflow.com/questions/36158848/what-is-the-best-way-to-declare-a-global-variable-in-angular-2-typescript
*/

import { Injectable } from '@angular/core';

Injectable()
export class Globals{
	selectedDataverse: string; 
	selectedDataset: string;
	selectedTab: string;
}
