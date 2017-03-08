import { Component, OnInit, Input } from '@angular/core';

import { DataTableModule, SharedModule, ButtonModule, ToggleButtonModule } from 'primeng/primeng'; 
import { QueryService } from './query.service'; 
import { Globals } from './globals';

/*
 * Browse component 
 * show data of given dataverse and dataset
 */
@Component({
	moduleId: module.id,
	selector: 'browse-tab',
	templateUrl: 'browse.component.html',
	styles: [`
	`]
})

export class BrowseComponent implements OnInit, OnDestroy {
	/**
	 * If this variable is set to true
	 * ngInit do not call browse() function
	 */
	@Input()
	isForQueryTab: boolean;

	/**
	 * this component is also used in the query.component
	 * so, set this variable to true, when this component is used in query.component
	 */
	isLoadingForQueryTab: boolean;

	/**
	 * For toggler button ('Expnad All' / 'Collapse All')
	 * - It is to make toggler button to 'on' status
	 * - If you want to make it to 'off' status, change 'true' to 'false'
	 */
	toggler: boolean = true;

	/**
	 * data, cols will be injected to the table 
	 */
	data: any[];
	cols: any[] = [];

	// selected row (for row expansion function)
	selectedRow: any;

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }

	
	/**
	 * Default browse function for browse-tab 
	 * TODO: pagination using limit, offset 
	 */
	browse(): void {
		this.cols = [];

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		if (!dvName && !dsName) return;

		this.queryService
			.getAQL(
				`
					use dataverse ${dvName};
					for $ds in dataset ${dsName} 
					limit 100 offset 0
					return $ds;
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

	/**
	 * Browse function for query-tab
	 * TODO: pagination using limit, offset 
	 */
	browseForQueryTab(query: string): void {
		this.isLoadingForQueryTab = true;
		this.cols = [];
		this.queryService
			.getAQL(query)
			.then(result => {
				this.data = result;
				const labels = Object.keys(result[0]);
				for ( var i = 0; i < labels.length; i++ ) {
					this.cols.push(
						{ field: labels[i], header: labels[i] }
					);
				}
				this.isLoadingForQueryTab = false;
			});
	}

	/**
	 * function used in row expansion
	 */
	showDataInRow(d: any[]) {
		this.selectedRow = d;
	}

	/**
	 *  function for expansion button
	 */
	expandToggle(self){
		const btns = document.getElementsByClassName('ui-row-toggler');

		for (let btn of btns){
			btn.click();	
		}
	}

  /**
	 * call browse() when this component loaded
	 */
	ngOnInit(): void {
		if (!this.isForQueryTab) {
			this.browse();
		}
	}
}
