import { Component } from '@angular/core';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	template: `
		<nav>
			<img src="/resources/images/asterixdb_tm.png">
			<strong  class="current-location">
				{{globals.selectedDataverse}} 
				<span *ngIf="globals.selectedDataset" style="color:red">/</span> 
				{{globals.selectedDataset}}
			</strong>
		</nav>

	`,
	styleUrls: ['navbar.component.css']
})

export class NavbarComponent {

	constructor(
		private globals: Globals		
	){}
}
