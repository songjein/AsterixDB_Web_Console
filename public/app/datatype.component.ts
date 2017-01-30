import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { QueryService } from './query.service';

import { Globals } from './globals';

@Component({
	moduleId: module.id, 
	selector: 'datatype-tab',
	templateUrl: 'datatype.component.html',
	styles: [`
	`]
})

export class DatatypeComponent implements OnInit, OnDestroy {

	datatype: string;
	isOpen : boolean;

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

		// first, find datatype
		// first, find datatype
		this.queryService
			.getAQL(
				`
					for $ds in dataset Metadata.Dataset return $ds;
				`
			)
			.then(result => {
				for ( var i = 0; i < result.length; i++ ) {
					const tdvName = result[i]["DataverseName"];
					const tdsName = result[i]["DatasetName"];
					if ( tdvName == dvName && tdsName == dsName){
						this.datatype = result[i]["DatatypeName"]
						break;
					}
				}
			});

		// next, find datatype in metadata
		// next, find datatype in metadata
		this.queryService
			.getAQL(
				`
					for $ds in dataset Metadata.Datatype return $ds;
				`
			)
			.then(result => {
				for ( var i = 0; i < result.length; i++ ) {
					const tdatatype = result[i]["DatatypeName"];
					if (tdatatype == this.datatype){
						const record = result[i]["Derived"]["Record"];
						this.isOpen = record["IsOpen"];
						this.data = record["Fields"];
						
						console.log("record", record["Fields"]);
						const labels = Object.keys(record["Fields"][0]);
						for (var j = 0 ; j < labels.length; j++){
							this.cols.push(
								{ field: labels[j], header: labels[j] }
							);	
						}
					}
				}
			});
	}

	ngOnInit(): void {
		this.browse();
	}

	ngOnDestroy(): void {
	}
}
