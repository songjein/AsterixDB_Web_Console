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

			<button id="sendQuery" (click)="onClick()">SendQuery</button>

			<div style="clear:both;"></div>

			<browse-tab [isForQueryTab]="true"></browse-tab>
		</div>
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

	query: string; 

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { 
		this.config = { mode: "asterix-aql", lineNumbers: true}	;
	}
	
	onClick(){
		this.browseComponent.browseForQueryTab(this.query.replace(/\n/g, " "));
	}

	ngOnInit(): void {
		this.query = ""; 
	}

	onFocus(){
	
	}
	onBlur(){
	
	}
}
