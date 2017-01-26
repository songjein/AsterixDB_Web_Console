import { Component, OnInit } from '@angular/core';

import { QueryService } from './query.service';

@Component({
	moduleId: module.id,
	selector: 'sidebar',
	templateUrl: 'sidebar.component.html'
})

export class SidebarComponent implements OnInit {

	dataset: string;

	constructor(
		private queryService: QueryService	
	){}
	
	getQueryResult(): void {
		this.queryService
			.getAQL("for $ds in dataset Metadata.Dataset return $ds;")
			.then(result => this.dataset = result);
	}

	ngOnInit(): void {
		this.getQueryResult();
	}

}
