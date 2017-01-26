import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Globals } from './globals';

import { TabMenuModule, MenuItem } from 'primeng/primeng';

@Component({
	moduleId: module.id,
	selector: 'tab-menu',
	template: `
		<p-tabMenu [model]="items" [activeItem]="activeItem"></p-tabMenu>
	`,
	styles: [`
		p-tabMenu{
			float:left;		
		}
	`]
})

export class TabMenuComponent {
	private items: MenuItem[];
	private activeItem: MenuItem;

	constructor(
		private router: Router,
		private globals: Globals
	){}

	ngOnInit() {
		this.items = [
			{ 
				label: 'Browse', 
				icon: 'fa-table',  
				command: (e) => {
					this.globals.isTableDrawed = false;
					this.router.navigate(['/browse']);
				}
			},
			{ 
				label: 'Query', 
				icon: 'fa-terminal',
				command: (e) => {
					this.router.navigate(['/query']);
				}
			}
		];

		this.activeItem = this.items[0];
	}
}
