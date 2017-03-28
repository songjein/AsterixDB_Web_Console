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
		table {
			width 100%;	
		}

		th {
			height: 30px;
			background: rgb(222,222,222);
			color: black;
		}

		table, th, td {
			border :1px solid black;	
			padding: 5px;
		}

		td:hover{
			background: yellow;	
		}

		.row:nth-child(odd) {background: rgb(245,245,245)}

		table {
			border-collapse : collapse;
		}
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
	expansions: any[] = Array(25); 
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
						this.cols.push(	labels[i]	);
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
	 * click cell
	 * row : selected row index
	 * col : selected col indexj
	 */
	clickCell(row:number, col:number):void{
		const clickedData = this.data[row];
		const clickedColumn = this.cols[col];
		console.log(clickedData, clickedColumn);
		this.expansions[row] = clickedData[clickedColumn];
	}

  /**
	 * call browse() when this component loaded
	 */
	ngOnInit(): void {
		this.isFirstDataFetched = false;
		this.browse(25, 0);
	}
}
