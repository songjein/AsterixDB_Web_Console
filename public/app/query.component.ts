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
	template: `
		<div style="width:95%; overflow-y:auto; padding: 10px; ">
			<strong>mode : </strong>
			<p-radioButton name="group1" value="sqlpp" label="SQL++" [(ngModel)]="querytype"></p-radioButton>,
			<p-radioButton name="group1" value="aql" label="AQL" [(ngModel)]="querytype"></p-radioButton>

			<div style="height:10px;"></div>

			<codemirror [(ngModel)]="query"
				[config]="config">
			</codemirror>

			<button id="sendQuery" (click)="onClick()">SendQuery</button>

			<div style="clear:both;"></div>
		</div>


		<p-dataTable #dt *ngIf="data" [value]="data" expandableRows="true" [rows]="25" 
			[paginator]="true" [pageLinks]="10" exportFilename="data" [resizableColumns]="true">

			<p-header>
				<div class="ui-helper-clearfix">
					<button type="button" pButton icon="fa-file-o" iconPos="left" label="CSV" (click)="dt.exportCSV()" style="float:right; margin-left: 5px;"></button>
					<p-toggleButton [(ngModel)]="toggler" onLabel="Expand All" offLabel="Collapse All" onIcon="fa-expand" offIcon="fa-compress" (onChange)="expandToggle($event)"></p-toggleButton>
				</div>
			</p-header>

			<p-column expander="true" [style]="{ width: '30px'}" styleClass="col-icon"></p-column>

			<p-column *ngFor="let col of cols" 
				[field]="col.field" [header]="col.header"></p-column>
			
			<template let-d pTemplate="rowexpansion">
				<div class="ui-grid ui-grid-responsive ui-fluid" style="font-size:16px; padding: 20px">
					<pre [innerHTML]=" d | prettyjson:3"></pre>
				</div>
			</template>
		</p-dataTable>
	`,
	styles: [`
		#sendQuery {
			float: right;
			font-family: Arial;
			background-color: #eee;
			padding: 5px 10px;
			border-radius: 4px;
			margin-top: 10px;
			margin-bottom: 20px;
		}
	`]
})

export class QueryComponent implements OnInit {

	@ViewChild(BrowseComponent) browseComponent: BrowseComponent
	
	// typed query
	query: string; 
	
	// query-type
	querytype: string = "sqlpp";

	/**
	 * data, cols will be injected to the table 
	 */
	data: any[];
	cols: any[];

	// selected row (for row expansion function)
	selectedRow: any;

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
	showQueryResult(query: string): void {
		this.data = undefined;
		this.cols = [];
		
		// aql mode
		if (this.querytype == "aql"){
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
				});
		}
		// sql ++ mode
		else { 
			this.queryService
				.getSQLpp(query)
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
	 * if click 'send query'
	 */
	onClick(){
		this.showQueryResult(this.query.replace(/\n/g, " "));
	}

	ngOnInit(): void {
		this.query = ""; 
	}

}
