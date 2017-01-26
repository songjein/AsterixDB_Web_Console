import { Component, OnInit } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng';

import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'browse-tab',
	template: `
		<p-dataTable [value]="data" [rows]="10" [paginator]="true" [pageLinks]="3" [responsive]="true" >
			<p-column *ngFor="let col of cols" 
							[field]="col.field" [header]="col.header"></p-column>
		</p-dataTable>
	`,
	styles: [`
		p-dataTable{ 
			float:left;		
		}	
	`]
})

export class BrowseComponent implements OnInit {
	data: any[];
	cols: any[] = [];

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }

	
	browse(): void {
		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		console.log(dvName, dsName);

		this.queryService
			.getAQL(
				`
					use dataverse ${dvName};
					for $ds in dataset ${dsName} return $ds;
				`
			)
			.then(result => {
				this.data = result;

				const labels = Object.keys(result[0]);

				for ( var i = 0; i < labels.length; i++ ) {
					this.cols.push(
						{ field: labels[i], header: labels[i] }
					);
				}
			});
	}

	ngOnInit(): void {
		this.browse();
	}
}
