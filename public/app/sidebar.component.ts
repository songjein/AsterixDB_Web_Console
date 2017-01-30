import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PanelMenuModule,MenuItem } from 'primeng/primeng';

import { QueryService } from './query.service'; 
import { Globals } from './globals';

@Component({
	moduleId: module.id,
	selector: 'sidebar', 
	templateUrl: 'sidebar.component.html',
	styles:[`
	`]
})

export class SidebarComponent implements OnInit{
	
	items: MenuItem[] = [];

	constructor(
		private router: Router,
		private globals: Globals,
		private queryService: QueryService	
	){}
	
	getDataverse(): void {
		this.queryService
			.getAQL("for $ds in dataset Metadata.Dataverse return $ds;")
			.then(result => {
				for (var i = 0; i < result.length; i++){
					this.items.push(
						{ 
							label: result[i]["DataverseName"], 
							icon: '', 
							items: [],
							command: (e) => {
								this.globals.selectedDataverse = e.item.label;	
							}
						}
					);
				}

				this.getDataset(); 
			});
	}

	getDataset(): void {
		this.queryService
			.getAQL("for $ds in dataset Metadata.Dataset return $ds;")
			.then(result => {
				for (var i = 0; i < result.length; i++){
					const dvName = result[i]["DataverseName"];
					const dsName = result[i]["DatasetName"];

					const idx = this.items.findIndex(x => x["label"] == dvName);

					this.items[idx]["items"].push(
						{ 
							label: dsName, 
							icon: '', 
							command: (e) => {
								this.globals.selectedDataverse = dvName;	
								this.globals.selectedDataset = e.item.label;

								// navigate through the proxy component
								// for the component in router-outlet refreshing
								this.router.navigate(['/proxy/browse']);
							}
						}
					);
				}

			});
	}

	ngOnInit(): void {
		this.getDataverse();
	}

}
