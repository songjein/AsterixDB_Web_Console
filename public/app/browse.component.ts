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
	isFirstDataFetched: boolean;

	// selected row (for row expansion function)
	selectedRow: any;

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }
	
	/**
	 * Default browse function for browse-tab 
	 */
	browse(limit: number, offset: number): void {
		if (!this.isFirstDataFetched) this.cols = [];

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		if (!dvName && !dsName) return;

		this.queryService
			.getAQL(
				`
					use dataverse ${dvName};
					for $ds in dataset ${dsName} 
					limit ${limit} offset ${offset} 
					return $ds;
				`
			)
			.then(result => {
				this.data = result;

				// look up the first row data and build columns
				const labels = Object.keys(result[0]);
				if (!this.isFirstDataFetched){
					for ( var i = 0; i < labels.length; i++ ) {
						this.cols.push(
							{ field: labels[i], header: labels[i] }
						);
					}
				}
				if (!this.isFirstDataFetched) this.isFirstDataFetched = true;
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
	 * lazy load (get small chunk of data from database) 
	 */
	loadData(event){
		this.browse(event.rows, event.first);
	}

  /**
	 * call browse() when this component loaded
	 */
	ngOnInit(): void {
		this.isFirstDataFetched = false;
		this.browse(25, 0);
	}
}
