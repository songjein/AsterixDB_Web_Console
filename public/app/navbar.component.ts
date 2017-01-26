import { Component } from '@angular/core';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'navbar',
	template: `
		<nav>
			<a href="/"><img src="/resources/images/asterixdb_tm.png"></a>
			<strong  class="current-location">
				{{globals.selectedDataverse}} 
				<span *ngIf="globals.selectedDataset">/</span> 
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
