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
		th {
			height: 30px;
			background: rgb(222,222,222);
			color: black;
		}

		table, th, td {
			border :1px solid black;	
		}

		td {
			min-width: 250px;	
			padding: 5px 10px;
			cursor: pointer;
		}

		tr:hover td{
			background: yellow;	
		}

		.row:nth-child(odd) {background: rgb(245,245,245)}

		table {
			border-collapse : collapse;
		}
	`]
})

export class DatatypeComponent implements OnInit, OnDestroy {

	datatype: string;
	isOpen : boolean;

	/**
	 * needed for find the nested datatype
	 */
	MetadataDataset : any[];
	MetadataDatatype : any[];
	nestedDatatypes = [];
	nestedDatatypesDatas = [];

	nestedFieldTypeList: string[] = [];

	/**
	 * table data
	 */
	data: any[];
	cols: any[] = [];

	/**
	 * tables' data for nested datatype 
	 */
	nestedData: any[] = [];
	nestedCols: any[] = [];
	selectedNestedDatatype: string = "";

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }
	

	/**
	 * this function called in getData()
	 * query result contains 
	 * => DataverseName, DatasetName, DataverseName, DatatypeName 
	 * 
	 * try to find a row that contains selected dataverse & dataset 
	 * and get the datatypeName 
	 * finally, store it as this.datatype
	 */
	getDatatypes(): void {
		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		this.queryService
			.getAQL(
				`
					for $ds in dataset Metadata.Dataset return $ds;
				`
			)
			.then(result => {
				this.MetadataDataset = result;

				for ( var i = 0; i < result.length; i++ ) {
					const _dvName = result[i]["DataverseName"];
					const _dsName = result[i]["DatasetName"];
					if ( _dvName == dvName && _dsName == dsName){
						this.datatype = result[i]["DatatypeName"]
						break;
					}
				}

				// next, find datatype in metadata
				this.getDatatypeDetail();
			});
	}
	
	/**
	 * this function is called in getDatatypeDetail()
	 * to process special case nested datatype
	 * like {{}}, [] (UN)ORDEREDLIST
	 */
	processSpecialCase(): void{
		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		for (let j = 0 ; j < this.nestedFieldTypeList.length; j++){
			const nestedType = this.nestedFieldTypeList[j];
			
			// find nested type's detail and update special case's FieldType 
			for (let k = 0 ; k < this.MetadataDatatype.length; k ++){
				const mtdt = this.MetadataDatatype[k];
				if (mtdt["DataverseName"] == dvName && mtdt["DatatypeName"] == nestedType["FieldType"]){
					const tag = mtdt["Derived"]["Tag"];
					let updatedValue = "";
					let specialCase = false;
					
					if (tag == "UNORDEREDLIST"){
						updatedValue = `{{ ${mtdt["Derived"]["UnorderedList"]} }}`;		
						specialCase = true;
					}
					if (tag == "ORDEREDLIST"){
						updatedValue = `[ ${mtdt["Derived"]["OrderedList"]} ]`;		
						specialCase = true;
					}

					// update FieldType of this.data (table data)
					for (let l = 0 ; l < this.data.length ; l++){
						// update special case 
						if (specialCase && this.data[l]["FieldType"] == nestedType["FieldType"]){
							this.data[l]["FieldType"] = updatedValue;	
							break;
						}
					}
				}
			}
		}
	}	
	
	/**
	 * this function is called in getDatatypeDetail()
	 * to make nested data type's table 
	 */
	makeNestedDatatypeTable(): void{
		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		if (!this.data) return;

		for ( var i = 0 ; i < this.data.length; i++ ){
			// current table's fields
			const type = this.data[i]["FieldType"];
			
			// scan Metadata's Datatype
			for ( var j = 0 ; j < this.MetadataDatatype.length; j++){
				const _dvName = this.MetadataDatatype[j]["DataverseName"];
				const _dtName = this.MetadataDatatype[j]["DatatypeName"];
				if ( _dvName == dvName && _dtName == type ){
					this.nestedDatatypesDatas.push(this.MetadataDatatype[j]);
				}
			}
		}
		
		for ( let i = 0 ; i < this.nestedDatatypesDatas.length; i++){
			const record = this.nestedDatatypesDatas[i]["Derived"]["Record"];	
			const data = record["Fields"];
			
			// make cols
			let cols = [];
			const labels = Object.keys(record["Fields"][0]);
			for (var j = 0 ; j < labels.length; j++){
				cols.push(labels[j]);
			}
			this.nestedData.push(data); 
			this.nestedCols.push(cols); 
		}
	}
	
	/**
	 * Now, we got the selected dataset's datatype's name
	 * So, try to get its detail (Fields information)
	 * 
	 * query result contains
	 * DataverseName, DatatypeName, "Derived": {"TAG", "isAnonymous", "Record":{"isOpen", "Fields"}}
	 *
	 * for precessing nested data...
	 * if "_" + fieldName is included in fieldType 
	 * ex) hashtags & type_tweet_hashtags, user_mentions & type_tweet_user_mentiosn
	 * => we think of that as a nested datatype
	 *
	 * special case : ORDEREDLIST => [], UNORDEREDLIST => {{}}
	 * we found that predefined datatype like ORDEREDLIST, and UNORDEREDLIST 
	 * Like following examples
	 * 
	 * { "DataverseName": "twitter", "DatatypeName": "type_tweet_hashtags", 
	 *   "Derived": { "Tag": "UNORDEREDLIST", "IsAnonymous": true, "UnorderedList": "string" }, 
	 *   "Timestamp": "Tue Feb 28 13:27:26 KST 2017" 
	 * }
	 * { "DataverseName": "TinySocial", "DatatypeName": "GleambookUserType_employment", 
	 *   "Derived": { "Tag": "ORDEREDLIST", "IsAnonymous": true, "OrderedList": "EmploymentType" }, 
	 *   "Timestamp": "Fri Feb 10 23:53:38 KST 2017" 
	 * }
	 *
	 */
	getDatatypeDetail(): void {

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		this.queryService
			.getAQL(
				`
					for $ds in dataset Metadata.Datatype return $ds;
				`
			)
			.then(result => {
				this.MetadataDatatype = result;

				// making a table
				for ( var i = 0; i < result.length; i++ ) {
					const _datatype = result[i]["DatatypeName"];
					const _dataverse = result[i]["DataverseName"];
							
					if (_dataverse == dvName && _datatype == this.datatype){
						const record = result[i]["Derived"]["Record"];

						this.data = record["Fields"];
						this.isOpen = record["IsOpen"];

						// find nested fieldType ("_FieldName" in FieldType)
						for (let j = 0 ; j < this.data.length; j++){
							// the nested type!
							if (this.data[j]["FieldType"].includes("_" + this.data[j]["FieldName"])){
								this.nestedFieldTypeList.push(this.data[j]);
							}
						}

						// process special case , [], {{}}
						this.processSpecialCase();
						
						// predict columns name using first row's columns
						const labels = Object.keys(record["Fields"][0]);
						for (var j = 0 ; j < labels.length; j++){
							this.cols.push(labels[j]);
						}
					}
				}
				this.makeNestedDatatypeTable();
			});
	}
	
	/**
	 *  send query and get datatype information 
	 */
	getData(): void {
		this.cols = [];

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		// if one of selected dataverse & dataset doesn't exist
		if (!dvName || !dsName) return;

		// first, find datatype
		this.getDatatypes();

	}

	/**
	 * when user click nested data type
	 */
	selectNestedType(datatype:string):void{
		this.selectedNestedDatatype = datatype;
	}	

	/**
	 * call getData() when this component loaded
	 */
	ngOnInit(): void {
		this.getData();
	}

	ngOnDestroy(): void {
	}
}
