import { Component, OnInit, ViewChild } from '@angular/core';

import { QueryService } from './query.service';
import { BrowseComponent } from './browse.component';

import { Globals } from './globals';

/**
 * query component
 * has editor (codemirror) for writing some query
 */
@Component({
	moduleId: module.id,
	selector: 'query-tab',
	templateUrl:'query.component.html',
	styleUrls: ['query.component.css']
})

export class QueryComponent implements OnInit {

	// typed query
	query: string; 
	
	// query-type
	querytype: string = "sqlpp_query";

	/**
	 * data, cols will be injected to the table 
	 */
	data: any[];
	allData: any[];
	cols: any[];

	// query result message
	query_message: string;

	/**
	 * expansion status
	 */
	expansions: any[] = Array(25); // must be the same with the number of rows in a page
	expanded: boolean = false;
	firstFetched: boolean;

	limit: number = 25; // maximum rows in one page
	pages: number[] = []; // page numbers
	isLoading: boolean = false;

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { 
		// mode config, codemirror
		this.config = { mode: "asterix", lineNumbers: true}	;
	}

	/**
	 * Showing query result 
	 * TODO: pagination using limit, offset 
	 * (it looks like hard to insert [limit offset] to the user typed query)
	 */
	getQueryResult(query: string): void {
		this.data = undefined;
		this.cols = [];
		this.query_message = "";
		
		if (this.querytype == "aql_query"){
			this.isLoading = true;
			this.queryService
				.getAQL(query)
				.then(result => {
					this.processQueryResult(result);
				});
		}
		else if (this.querytype == "sqlpp_query"){ 
			this.isLoading = true;
			this.queryService
				.getSQLpp(query)
				.then(result => {
					this.processQueryResult(result);
				});
		}
		else if (this.querytype == "aql_ddl"){ 
			this.queryService
				.sendDDL_AQL(query)
				.then(result => {
					this.query_message = result;
				});
		}
		else if (this.querytype == "sqlpp_ddl"){ 
			this.queryService
				.sendDDL_SQL(query)
				.then(result => {
					this.query_message = result;
				});
		}
	}
	
	/**
	 * process query result
	 */
	processQueryResult(result: any): void{
		if ("error-code" in result){
			this.query_message = result["error-code"][1]
			return;	
		}
		this.allData = result;

		this.pages = [];
		// generate page numbers
		for (let i = 0 ; i < result.length / this.limit; i ++){
			this.pages.push(i + 1);
		}
		
		// make colums using first row
		const labels = Object.keys(result[0]);
		for ( var i = 0; i < labels.length; i++ ) {
			this.cols.push(labels[i]);
		}

		this.getPageData(1);

		this.isLoading = false;
	}

	/**
	 * when click the page number, slice this.allData into this.data
	 */
	getPageData(pageNum: number){
		this.data = []
		const offset = this.limit * (pageNum - 1);
		const limit = offset + this.limit;
		this.data = this.allData.slice(offset, limit);
	}

	/**
	 * click cell
	 * row : selected row index
	 * col : selected col indexj
	 */
	expandCell(row:number, col:number, off: boolean):void{
		if (off){
			this.expansions[row] = null; 
			return;
		}
		
		const clickedData = this.data[row];
		const clickedColumn = this.cols[col];

		// if user clicked same cell
		if (this.expansions[row] == clickedData[clickedColumn]) {
			this.expansions[row] = null; 
			return;
		}

		this.expansions[row] = clickedData[clickedColumn];
	}

	/**
	 * expand all
	 */
	expandAll(col: string): void{
		// if already expanded
		if (this.expanded){
			// make expansions array empty 	
			for (let i = 0 ; i < this.data.length; i++){
				this.expansions[i] = null;
			}
			this.expanded= false;
			return;	
		}

		// expand all
		this.expanded= true;
		for (let i = 0 ; i < this.data.length; i++){
			this.expansions[i] = this.data[i][col];
		}
	}



	/**
	 * if click 'send query'
	 */
	onClick(){
		this.getQueryResult(this.query.replace(/\n/g, " "));
	}

	ngOnInit(): void {
		this.query = ""; 
	}

}
