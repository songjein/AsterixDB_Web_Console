import { Component, OnInit, OnDestroy } from '@angular/core';

import { DataTableModule, SharedModule } from 'primeng/primeng'; 
import { QueryService } from './query.service';

import { Globals } from './globals';

/**
 * Datatype-tab
 * show datatype of given dataverse and dataset
 */
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

	// needed for find the nested datatype
	MetadataDataset : any[];
	MetadataDatatype : any[];
	nestedDatatypes = [];
	nestedDatatypesDatas = [];

	// table data
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
				this.MetadataDataset = result;

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
				this.MetadataDatatype = result;

				for ( var i = 0; i < result.length; i++ ) {
					const tdatatype = result[i]["DatatypeName"];
					const tdataverse = result[i]["DataverseName"];
					if (tdataverse == dvName && tdatatype == this.datatype){
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
				

				/**
				 * Find nested Datatype
				 * Find nested Datatype
				 */
				for ( var k = 0 ; k < this.data.length; k++ ){
					// current table's fields
					const type = this.data[k]["FieldType"];
					
					// scan Metadata's Datatype
					for ( var l = 0 ; l < this.MetadataDatatype.length; l++){
						const tdvName = this.MetadataDatatype[l]["DataverseName"];
						const tdtName = this.MetadataDatatype[l]["DatatypeName"];
						if ( tdvName == dvName && tdtName == type ){
							this.nestedDatatypesDatas.push(this.MetadataDatatype[l]);
							this.nestedDatatypes.push(type);
						}
					}
				}
				console.log("nested datatype", this.nestedDatatypes);
				console.log("nested datatype data", this.nestedDatatypesDatas);
			});

	}

	ngOnInit(): void {
		this.browse();
	}

	ngOnDestroy(): void {
	}
}
