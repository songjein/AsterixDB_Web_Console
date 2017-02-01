import { Component, OnInit } from '@angular/core';

import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'query-tab',
	template: `
		<div style="width:80%; overflow-y:auto; padding: 10px; ">
			<form>
				<strong>mode : </strong>
				<input type="radio" name="mode" value="SQL++" disabled>SQL++,  
				<input type="radio" name="mode" value="AQL" checked>AQL<br>
			</form>

			<div style="height:10px;"></div>

			<codemirror [(ngModel)]="query"
				[config]="config"
				(focus)="onFocus()"
				(blur)="onBlur()">
			</codemirror>

			<pre>{{query}}</pre>

			<!--<h1>Query Result</h1>-->
		</div>
	`,
	styles: [`
	`]
})

export class QueryComponent implements OnInit {

	query: string; 

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { 
		this.config = { mode: "asterix-aql", lineNumbers: true}	;
	}

	
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
		this.query = ""; 

		/*
		this.query = `use dataverse ;
		for $d in dataset 
		where
		return $d;` 

		if (this.globals.selectedDataverse) {
			this.query = `use dataverse ${this.globals.selectedDataverse};	
				for $d in dataset ${this.globals.selectedDataset} ;
				where 
				return $d`;
		}
		*/
	}

	onFocus(){
	
	}
	onBlur(){
	
	}
}
