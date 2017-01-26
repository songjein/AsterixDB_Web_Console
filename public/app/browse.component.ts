import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'browse-tab',
	template: `
		<div style="width:80%; overflow-y:auto; padding: 10px; ">
			<p-dataTable [value]="data" [rows]="10" [paginator]="true" [pageLinks]="3" [responsive]="true" >
				<p-column *ngFor="let col of cols" 
								[field]="col.field" [header]="col.header"></p-column>
			</p-dataTable>
		</div>
	`,
	styles: [`
		p-dataTable{ 
			float:left;		
		}	
	`]
})

export class BrowseComponent implements OnInit, OnDestroy {
	private intervalId: any;
	data: any[];
	cols: any[] = [];

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }

	
	browse(): void {
		this.cols = [];

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		if (!dvName && !dsName) return;

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
		console.log('browse init');

		this.intervalId = setInterval(() => {
			if (this.globals.isTableDrawed) return;
			this.browse();
			this.globals.isTableDrawed = true;
		}, 100);
	}

	ngOnDestroy(): void {
		console.log('browse destroy');

		if (this.intervalId)
			clearInterval(this.intervalId);
	}
}
