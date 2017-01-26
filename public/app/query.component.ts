import { Component, OnInit } from '@angular/core';

import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'query-tab',
	template: `
		<div style="width:80%; overflow-y:auto; padding: 10px; ">
			<form>
				<input type="radio" name="mode" value="SQL++" disabled>SQL++,  
				<input type="radio" name="mode" value="AQL" checked>AQL<br>
			</form>
		</div>
	`,
	styles: [`
	`]
})

export class QueryComponent implements OnInit {

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }

	
	browse(): void {

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		this.queryService
			.getAQL(
				`
					use dataverse ${dvName};
					for $ds in dataset ${dsName} return $ds;
				`
			)
			.then(result => {
			});
	}

	ngOnInit(): void {
	}
}
