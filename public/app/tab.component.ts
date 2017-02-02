import { Component } from '@angular/core';

import { Globals } from './globals';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'tab-menu',
	template: `
		<p-tabMenu [model]="items" [activeItem]="activeItem"></p-tabMenu>
	`,
	styles: [`
	`]
})

export class TabMenuComponent {
	private items: MenuItem[];
	private activeItem: MenuItem;

	constructor(
		private globals: Globals
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

		this.activeItem = this.items[0];
	}
}
