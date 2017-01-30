import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'browse-tab',
	templateUrl: 'browse.component.html',
	styles: [`
	`]
})

export class BrowseComponent implements OnInit, OnDestroy {
	private intervalId: any;
	data: any[];
	cols: any[] = [];

	selectedRow: any;

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

	showDataInRow(d: any) {
		this.selectedRow = d;
	}

	ngOnInit(): void {
		this.browse();
	}

	ngOnDestroy(): void {
		console.log('browse destroy');
	}
}
