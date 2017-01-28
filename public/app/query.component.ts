import { Component, OnInit } from '@angular/core';

import { QueryService } from './query.service';

import { ContenteditableDirective } from './contenteditable.directive'

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

			<textarea [(ngModel)]="query">
			</textarea>

			<div id="editor" contenteditable [(contenteditableModel)]="query" spellcheck="false">
				hi
			</div>

			<h3 style="color:red">ToDo.. (auto-complete, code-hilight, query-latency history)</h3>
			<h1>Query Result</h1>
		</div>
	`,
	styles: [`
		textarea{
			width: 600px;	
			min-height: 300px;
		}

		#editor {
			width: 600px;	
			min-height: 300px;
			border: 1px solid gray;
			background: rgb(240,240,240);
		}
	`]
})

export class QueryComponent implements OnInit {

	query: string; 

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
		this.query = `use dataverse ;

for $d in dataset 
where
return $d
		` 

		if (this.globals.selectedDataverse) {
this.query = `use dataverse ${this.globals.selectedDataverse};	

for $d in dataset ${this.globals.selectedDataset} ;
where 
return $d
`;
		}
	}
}
