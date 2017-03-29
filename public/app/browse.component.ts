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
		#browse-container{
			width: 100%; height: 700px; overflow-x:auto;
		}
		th {
			height: 30px;
			background: rgb(222,222,222);
			color: black;
		}

		table, th, td {
			border :1px solid black;	
			padding: 2px 5px;
			cursor: pointer;
		}

		th:hover{
			background: orange;	
		}

		td:hover{
			background: yellow;	
		}

		.row:nth-child(odd) {background: rgb(245,245,245)}

		table {
			border-collapse : collapse;
		}

		.page-label{
			float:left;
			color: black;	
			padding: 2px 3px;
			margin: 0 3px;
			cursor: pointer;
			font-size: 1em;
			background: orange;
			border: 1px solid black;
		}

		.page{
			float:left;
			color: black;	
			padding: 2px 3px;
			margin: 0 3px;
			cursor: pointer;
			font-size: 1em;
			background: yellow;
			border: 1px solid black;
		}
	`]
})

export class BrowseComponent implements OnInit, OnDestroy {

	/**
	 * data, cols will be injected to the table 
	 */
	allData: any[];
	data: any[];
	cols: any[] = [];

	/**
	 * expansion status
	 */
	expansions: any[] = Array(25); // must be the same with the number of rows in a page
	expanded: boolean = false;
	firstFetched: boolean;

	/**
	 * data fetch offset
	 */
	offset: number = 0;
	limit: number = 25;
	fetchPageNum: number = 10; // size of fetching data = limit * fetchPageNum
	currentPageNum: number = 1;
	pages: number[] = [];
	chunkNum: number = 1;
	isLoading: boolean = false;

	constructor(
		private globals: Globals,
		private queryService: QueryService
	) { }
	
	/**
	 * get chunk from the database 
	 */
	getChunk(offset: number): void {
		if (!this.firstFetched) this.cols = [];

		const dvName = this.globals.selectedDataverse;
		const dsName = this.globals.selectedDataset;

		if (!dvName && !dsName) return;

		this.isLoading = true;

		this.queryService
			.getAQL(
				`
					use dataverse ${dvName};
					for $ds in dataset ${dsName} 
					limit ${this.limit * this.fetchPageNum} offset ${offset} 
					return $ds;
				`
			)
			.then(result => {
				this.allData = [];
				this.allData = result;

				// look up the number/2 of rows data and build columns
				// make maximum length column 
				if (!this.firstFetched){
					for (let i = 0 ; i < result.length / 2; i++){
						const keys = Object.keys(result[i]);	
						for (let j = 0 ; j < keys.length; j++){
							if (!this.cols.includes(keys[j])) this.cols.push(keys[j]);	
						}
					}
				}
				// make empty key (null value) for nullable data 
				for (let i = 0 ; i < this.allData.length; i++){
					for (let j = 0 ; j < this.cols.length; j++){
						if (!(this.cols[j] in this.allData[i])){
							this.allData[i][this.cols[j]] = "";	
						}
					}	
				}

				// data for the first page
				this.data = this.allData.slice(0, this.limit);
				
				// generate page number
				this.pages = [];
				for (let i = 0 ; i < this.fetchPageNum; i++){
					this.pages.push(i + 1 + ((this.chunkNum-1) * this.fetchPageNum));
				}

				// will be removed
				if (!this.firstFetched) this.firstFetched = true;

				this.isLoading = false;
			});
	}

	/**
	 * when click the page number, slice this.allData into this.data
	 */
	getPageData(pageNum: number){
		this.data = []
		pageNum = pageNum - ((this.chunkNum - 1) * this.fetchPageNum);
		const offset = this.limit * (pageNum - 1);
		const limit = offset + this.limit;
		this.data = this.allData.slice(offset, limit);
	}

	/**
	 * when click the next page button, get the next chunk from the database
	 */
	getNextChunk(){
		this.getChunk(this.limit * this.chunkNum * this.fetchPageNum);
		this.chunkNum ++;
	}

	/**
	 * when click the prev page button, get the previous chunk from the database
	 */
	getPrevChunk(){
		this.getChunk(this.limit * (this.chunkNum - 2) * this.fetchPageNum;
		this.chunkNum --;
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
	 * call getChunk() when this component loaded
	 */
	ngOnInit(): void {
		this.firstFetched = false;
		this.getChunk(this.offset);
	}
}
