import { Component } from '@angular/core';

import { Globals } from './globals';

/**
 * navbar component
 * shows selected dataverse & dataset
 */
@Component({
	moduleId: module.id,
	selector: 'navbar',
	template: `
		<nav>
			<a href="/"><img src="/resources/images/asterixdb_tm.png"></a>
			<strong  class="current-location">
				{{globals.selectedDataverse}} 
				<span *ngIf="globals.selectedDataset"> 
					<span>/</span> 
					<span style="color:red;">{{globals.selectedDataset}}</span>
				</span>
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
