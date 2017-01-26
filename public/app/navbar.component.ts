import { Component } from '@angular/core';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	template: `
		{{globals.selectedDataverse}}/{{globals.selectedDataset}}
	` 
})

export class NavbarComponent {

	constructor(
		private globals: Globals		
	){}
}
