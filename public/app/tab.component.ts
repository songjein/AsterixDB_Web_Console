import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router } from '@angular/router';

import { Globals } from './globals';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

/**
 * tab component
 */
@Component({
	moduleId: module.id,
	selector: 'tab-menu',
	template: `
		<p-tabMenu [model]="items" [activeItem]="activeItem"></p-tabMenu>
	`,
	styles: [`
	`]
})

export class TabMenuComponent implements OnInit, OnDestroy {
	private items: MenuItem[];
	private activeItem: MenuItem;

	intervalId: any;

	constructor(
		private globals: Globals,
		private router: Router,
	){}

	ngOnInit() {
		this.items = [
			{ 
				label: 'Browse', 
				icon: 'fa-table',  
				routerLink: ['/proxy/browse'],
				command: (e) => {
					this.globals.selectedTab = "browse"
				}
			},
			{ 
				label: 'DataType', 
				icon: 'fa-info-circle',
				routerLink: ['/proxy/datatype'],
				command: (e) => {
					this.globals.selectedTab = "datatype"
				}
			},
			{ 
				label: 'Query', 
				icon: 'fa-terminal',
				routerLink: ['/proxy/query'],
				command: (e) => {
					this.globals.selectedTab = "query"
				}
			}
		];

		// temporal trick.. :'(
		// for sync between active-tab and routed component
		this.intervalId = setInterval(() => {
			if (this.router.url == "/browse")
				this.activeItem = this.items[0] 
			else if (this.router.url == "/datatype")
				this.activeItem = this.items[1] 
			else if (this.router.url == "/query")
				this.activeItem = this.items[2] 
		}, 300)
	}

	ngOnDestroy(): void {
		clearInterval(this.intervalId);
	}

}
